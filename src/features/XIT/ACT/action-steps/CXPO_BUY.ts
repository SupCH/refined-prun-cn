import { act } from '@src/features/XIT/ACT/act-registry';
import { t } from '@src/infrastructure/i18n';
import { fixed0, fixed02 } from '@src/utils/format';
import { changeInputValue, clickElement } from '@src/util';
import { fillAmount } from '@src/features/XIT/ACT/actions/cx-buy/utils';
import { storagesStore } from '@src/infrastructure/prun-api/data/storage';
import { exchangesStore } from '@src/infrastructure/prun-api/data/exchanges';
import { warehousesStore } from '@src/infrastructure/prun-api/data/warehouses';
import { watchWhile } from '@src/utils/watch';
import { materialsStore } from '@src/infrastructure/prun-api/data/materials';
import { watchEffect } from 'vue';
import { AssertFn } from '@src/features/XIT/ACT/shared-types';

interface Data {
  exchange: string;
  ticker: string;
  amount: number;
  priceLimit: number;
  buyPartial: boolean;
  allowUnfilled: boolean;
}

export const CXPO_BUY = act.addActionStep<Data>({
  type: 'CXPO_BUY',
  preProcessData: data => ({ ...data, ticker: data.ticker.toUpperCase() }),
  description: data => {
    const { ticker, exchange } = data;
    const cxTicker = `${ticker}.${exchange}`;
    const filled = fillAmount(cxTicker, data.amount, data.priceLimit);
    const amount = filled?.amount ?? data.amount;
    const priceLimit = filled?.priceLimit ?? data.priceLimit;
    const allowUnfilled = data.allowUnfilled ?? false;
    const willFillCompletely = filled && filled.amount === data.amount;

    if (!willFillCompletely && allowUnfilled) {
      let description = t('act.bidDescription', fixed0(data.amount), ticker, exchange);
      if (isFinite(priceLimit)) {
        description += ' ' + t('act.atPrice', fixed02(data.priceLimit));
        description += ' (' + t('act.totalCost', fixed0(data.amount * data.priceLimit)) + ')';
      }
      return description;
    }

    let description = t('act.buyDescription', fixed0(amount), ticker, exchange);
    if (isFinite(priceLimit)) {
      description += ' ' + t('act.buyWithLimit', fixed02(priceLimit));
    }
    if (filled) {
      description += ' (' + t('act.totalCost', fixed0(filled.cost)) + ')';
    } else {
      description += ' (' + t('act.noPriceData') + ')';
    }
    return description;
  },
  execute: async ctx => {
    const { data, log, setStatus, requestTile, waitAct, waitActionFeedback, complete, skip, fail } =
      ctx;
    const assert: AssertFn = ctx.assert;
    const { amount, ticker, exchange, priceLimit } = data;
    const cxTicker = `${ticker}.${exchange}`;
    const cxWarehouse = computed(() => {
      // Use exchange code directly to find warehouse (e.g. 'IC1')
      const warehouse = warehousesStore.getByEntityNaturalIdOrName(exchange);
      return storagesStore.getById(warehouse?.storeId);
    });

    // If warehouse data is not loaded (player hasn't visited exchange), skip capacity check
    if (!cxWarehouse.value) {
      log.warning(t('act.warehouseNotLoaded', exchange));
    }

    if (amount <= 0) {
      log.warning(`No ${ticker} was bought (target amount is 0)`);
      skip();
      return;
    }

    const material = materialsStore.getByTicker(ticker);
    assert(material, `Unknown material ${ticker}`);

    // Only check capacity if warehouse data is available
    if (cxWarehouse.value) {
      const canFitWeight =
        material.weight * amount <= cxWarehouse.value.weightCapacity - cxWarehouse.value.weightLoad;
      const canFitVolume =
        material.volume * amount <= cxWarehouse.value.volumeCapacity - cxWarehouse.value.volumeLoad;
      assert(
        canFitWeight && canFitVolume,
        `Cannot not buy ${fixed0(amount)} ${ticker} (will not fit in the warehouse)`,
      );
    }

    const tile = await requestTile(`CXPO ${cxTicker}`);
    if (!tile) {
      return;
    }

    setStatus('Setting up CXPO buffer...');

    const buyButton = await $(tile.anchor, C.Button.success);
    const form = await $(tile.anchor, C.ComExPlaceOrderForm.form);
    const inputs = _$$(form, 'input');
    const quantityInput = inputs[0];
    assert(quantityInput !== undefined, 'Missing quantity input');
    const priceInput = inputs[1];
    assert(priceInput !== undefined, 'Missing price input');

    let shouldUnwatch = false;
    const unwatch = watchEffect(() => {
      if (shouldUnwatch) {
        unwatch();
        return;
      }

      const filled = fillAmount(cxTicker, amount, priceLimit);

      if (!filled) {
        shouldUnwatch = true;
        fail(`Missing ${cxTicker} order book data`);
        return;
      }

      if (filled.amount < amount && !data.allowUnfilled) {
        if (!data.buyPartial) {
          let message = `Not enough materials on ${exchange} to buy ${fixed0(amount)} ${ticker}`;
          if (isFinite(priceLimit)) {
            message += ` with price limit ${fixed02(priceLimit)}/u`;
          }
          shouldUnwatch = true;
          fail(message);
          return;
        }

        const leftover = amount - filled.amount;
        let message =
          `${fixed0(leftover)} ${ticker} will not be bought on ${exchange} ` +
          `(${fixed0(filled.amount)} of ${fixed0(amount)} available`;
        if (isFinite(priceLimit)) {
          message += ` with price limit ${fixed02(priceLimit)}/u`;
        }
        message += ')';
        log.warning(message);
        if (filled.amount === 0) {
          shouldUnwatch = true;
          skip();
          return;
        }
      }

      if (data.allowUnfilled) {
        changeInputValue(quantityInput, data.amount.toString());
        changeInputValue(priceInput, fixed02(data.priceLimit));
      } else {
        changeInputValue(quantityInput, filled.amount.toString());
        changeInputValue(priceInput, fixed02(filled.priceLimit));
      }

      // Cache description before clicking the buy button because
      // order book data will change after that.
      ctx.cacheDescription();
    });

    await waitAct();
    unwatch();

    const warehouseAmount = computed(() => {
      return (
        cxWarehouse.value?.items
          .map(x => x.quantity ?? undefined)
          .filter(x => x !== undefined)
          .find(x => x.material.ticker === ticker)?.amount ?? 0
      );
    });
    const currentAmount = warehouseAmount.value;
    const amountToFill = fillAmount(cxTicker, amount, priceLimit)?.amount ?? 0;
    const shouldWaitForUpdate = amountToFill > 0;

    await clickElement(buyButton);
    await waitActionFeedback(tile);

    if (shouldWaitForUpdate && cxWarehouse.value) {
      setStatus('Waiting for storage update...');
      const storageUpdatePromise = watchWhile(() => warehouseAmount.value === currentAmount);
      const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));
      await Promise.race([storageUpdatePromise, timeoutPromise]);
    } else {
      setStatus('Bid order created');
    }

    complete();
  },
});
