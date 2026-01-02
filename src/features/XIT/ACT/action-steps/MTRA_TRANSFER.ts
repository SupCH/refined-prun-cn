import { act } from '@src/features/XIT/ACT/act-registry';
import { serializeStorage } from '@src/features/XIT/ACT/actions/utils';
import { fixed0 } from '@src/utils/format';
import { changeInputValue, clickElement, focusElement } from '@src/util';
import { materialsStore } from '@src/infrastructure/prun-api/data/materials';
import { watchWhile } from '@src/utils/watch';
import { storagesStore } from '@src/infrastructure/prun-api/data/storage';
import { AssertFn } from '@src/features/XIT/ACT/shared-types';
import { t } from '@src/infrastructure/i18n';

interface Data {
  from: string;
  to: string;
  ticker: string;
  amount: number;
}

export const MTRA_TRANSFER = act.addActionStep<Data>({
  type: 'MTRA_TRANSFER',
  preProcessData: data => ({ ...data, ticker: data.ticker.toUpperCase() }),
  description: data => {
    const from = storagesStore.getById(data.from);
    const to = storagesStore.getById(data.to);
    const fromName = from ? serializeStorage(from) : t('act.notFound');
    const toName = to ? serializeStorage(to) : t('act.notFound');
    return t('act.transferDescription', fixed0(data.amount), data.ticker, fromName, toName);
  },
  execute: async ctx => {
    const { data, log, setStatus, requestTile, waitAct, waitActionFeedback, complete, skip, fail } =
      ctx;
    const assert: AssertFn = ctx.assert;
    const { ticker, amount } = data;
    const from = storagesStore.getById(data.from);
    assert(from, 'Origin inventory not found');
    const to = storagesStore.getById(data.to);
    assert(to, 'Destination inventory not found');

    if (!from.items.find(x => x.quantity?.material.ticker === ticker)) {
      log.warning(t('act.notPresentInOrigin', ticker));
      skip();
      return;
    }

    if (amount <= 0) {
      log.warning(`No ${ticker} was transferred (target amount is 0)`);
      skip();
      return;
    }

    const material = materialsStore.getByTicker(ticker);
    assert(material, `Unknown material ${ticker}`);

    // Check if we can fit a single unit. MTRA will be unusable otherwise.
    const epsilon = 0.000001;
    const canFitWeight = to.weightCapacity - to.weightLoad - material.weight + epsilon >= 0;
    const canFitVolume = to.volumeCapacity - to.volumeLoad - material.volume + epsilon >= 0;
    if (!canFitWeight || !canFitVolume) {
      log.warning(`No ${ticker} was transferred (no space)`);
      skip();
      return;
    }

    const tile = await requestTile(
      `MTRA from-${from.id.substring(0, 8)} to-${to.id.substring(0, 8)}`,
    );
    if (!tile) {
      return;
    }

    setStatus('Setting up MTRA buffer...');
    const timeout = (ms: number) =>
      new Promise<any>((_, reject) =>
        setTimeout(() => reject(new Error(t('act.timeoutRetry'))), ms),
      );

    const container = await Promise.race([
      $(tile.anchor, C.MaterialSelector.container),
      timeout(10000),
    ]);
    const input = await Promise.race([$(container, 'input'), timeout(5000)]);

    const suggestionsContainer = await Promise.race([
      $(container, C.MaterialSelector.suggestionsContainer),
      timeout(5000),
    ]);
    focusElement(input);
    changeInputValue(input, ticker);

    const suggestionsList = await Promise.race([
      $(container, C.MaterialSelector.suggestionsList),
      timeout(5000),
    ]);
    suggestionsContainer.style.display = 'none';
    const match = _$$(suggestionsList, C.MaterialSelector.suggestionEntry).find(
      x => _$(x, C.ColoredIcon.label)?.textContent === ticker,
    );

    if (!match) {
      suggestionsContainer.style.display = '';
      fail(`Ticker ${ticker} not found in the material selector`);
      return;
    }

    await clickElement(match);
    suggestionsContainer.style.display = '';

    const sliderNumbers = _$$(tile.anchor, 'rc-slider-mark-text').map(x =>
      Number(x.textContent ?? 0),
    );
    const maxAmount = Math.max(...sliderNumbers);
    const allInputs = _$$(tile.anchor, 'input');
    const amountInput = allInputs[1];
    assert(amountInput !== undefined, 'Amount input not found');
    if (amount > maxAmount) {
      const leftover = amount - maxAmount;
      log.warning(
        `${fixed0(leftover)} ${ticker} not transferred ` +
          `(${fixed0(maxAmount)} of ${fixed0(amount)} transferred)`,
      );
      if (maxAmount === 0) {
        skip();
        return;
      }
    }
    changeInputValue(amountInput, Math.min(amount, maxAmount).toString());

    const transferButton = await $(tile.anchor, C.Button.btn);

    await waitAct();
    const destinationAmount = computed(() => {
      const store = storagesStore.getById(data.to);
      return (
        store?.items
          .map(x => x.quantity ?? undefined)
          .filter(x => x !== undefined)
          .find(x => x.material.ticker === ticker)?.amount ?? 0
      );
    });
    const currentAmount = destinationAmount.value;
    await clickElement(transferButton);
    await waitActionFeedback(tile);
    setStatus('Waiting for storage update...');
    // Wait for storage update with a 5 second timeout to prevent hanging
    const storageUpdatePromise = watchWhile(() => destinationAmount.value === currentAmount);
    const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5000));
    await Promise.race([storageUpdatePromise, timeoutPromise]);

    complete();
  },
});
