import { $, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import { act } from './act-registry.js';
import { t } from './index5.js';
import { fixed0, fixed02 } from './format.js';
import { changeInputValue, clickElement } from './util.js';
import { fillAmount } from './utils2.js';
import { storagesStore } from './storage.js';
import { warehousesStore } from './warehouses.js';
import { watchWhile } from './watch.js';
import { materialsStore } from './materials.js';
import { computed, watchEffect } from './runtime-core.esm-bundler.js';
const CXPO_BUY = act.addActionStep({
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
      let description2 = t('act.bidDescription', fixed0(data.amount), ticker, exchange);
      if (isFinite(priceLimit)) {
        description2 += ' ' + t('act.atPrice', fixed02(data.priceLimit));
        description2 += ' (' + t('act.totalCost', fixed0(data.amount * data.priceLimit)) + ')';
      }
      return description2;
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
    const assert = ctx.assert;
    const { amount, ticker, exchange, priceLimit } = data;
    const cxTicker = `${ticker}.${exchange}`;
    const cxWarehouse = computed(() => {
      const warehouse = warehousesStore.getByEntityNaturalIdOrName(exchange);
      return storagesStore.getById(warehouse?.storeId);
    });
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
    assert(quantityInput !== void 0, 'Missing quantity input');
    const priceInput = inputs[1];
    assert(priceInput !== void 0, 'Missing price input');
    let shouldUnwatch = false;
    let hasWarnedAboutMissingData = false;
    const unwatch = watchEffect(() => {
      if (shouldUnwatch) {
        unwatch();
        return;
      }
      const filled = fillAmount(cxTicker, amount, priceLimit);
      if (!filled) {
        if (!hasWarnedAboutMissingData) {
          log.warning(
            `等待 ${cxTicker} 订单簿数据加载... (Waiting for ${cxTicker} order book data to load...)`,
          );
          hasWarnedAboutMissingData = true;
        }
        return;
      }
      hasWarnedAboutMissingData = false;
      if (filled.amount < amount && !data.allowUnfilled) {
        if (!data.buyPartial) {
          let message2 = `Not enough materials on ${exchange} to buy ${fixed0(amount)} ${ticker}`;
          if (isFinite(priceLimit)) {
            message2 += ` with price limit ${fixed02(priceLimit)}/u`;
          }
          shouldUnwatch = true;
          fail(message2);
          return;
        }
        const leftover = amount - filled.amount;
        let message = `${fixed0(leftover)} ${ticker} will not be bought on ${exchange} (${fixed0(filled.amount)} of ${fixed0(amount)} available`;
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
      ctx.cacheDescription();
    });
    await waitAct();
    unwatch();
    const warehouseAmount = computed(() => {
      return (
        cxWarehouse.value?.items
          .map(x => x.quantity ?? void 0)
          .filter(x => x !== void 0)
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
      const timeoutPromise = new Promise(resolve => setTimeout(resolve, 5e3));
      await Promise.race([storageUpdatePromise, timeoutPromise]);
    } else {
      setStatus('Bid order created');
    }
    complete();
  },
});
export { CXPO_BUY };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ1hQT19CVVkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbi1zdGVwcy9DWFBPX0JVWS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcbmltcG9ydCB7IHQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL2kxOG4nO1xuaW1wb3J0IHsgZml4ZWQwLCBmaXhlZDAyIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgY2hhbmdlSW5wdXRWYWx1ZSwgY2xpY2tFbGVtZW50IH0gZnJvbSAnQHNyYy91dGlsJztcbmltcG9ydCB7IGZpbGxBbW91bnQgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9jeC1idXkvdXRpbHMnO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IGV4Y2hhbmdlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2V4Y2hhbmdlcyc7XG5pbXBvcnQgeyB3YXJlaG91c2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvd2FyZWhvdXNlcyc7XG5pbXBvcnQgeyB3YXRjaFdoaWxlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5pbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3QgfSBmcm9tICd2dWUnO1xuaW1wb3J0IHsgQXNzZXJ0Rm4gfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcblxuaW50ZXJmYWNlIERhdGEge1xuICBleGNoYW5nZTogc3RyaW5nO1xuICB0aWNrZXI6IHN0cmluZztcbiAgYW1vdW50OiBudW1iZXI7XG4gIHByaWNlTGltaXQ6IG51bWJlcjtcbiAgYnV5UGFydGlhbDogYm9vbGVhbjtcbiAgYWxsb3dVbmZpbGxlZDogYm9vbGVhbjtcbn1cblxuZXhwb3J0IGNvbnN0IENYUE9fQlVZID0gYWN0LmFkZEFjdGlvblN0ZXA8RGF0YT4oe1xuICB0eXBlOiAnQ1hQT19CVVknLFxuICBwcmVQcm9jZXNzRGF0YTogZGF0YSA9PiAoeyAuLi5kYXRhLCB0aWNrZXI6IGRhdGEudGlja2VyLnRvVXBwZXJDYXNlKCkgfSksXG4gIGRlc2NyaXB0aW9uOiBkYXRhID0+IHtcbiAgICBjb25zdCB7IHRpY2tlciwgZXhjaGFuZ2UgfSA9IGRhdGE7XG4gICAgY29uc3QgY3hUaWNrZXIgPSBgJHt0aWNrZXJ9LiR7ZXhjaGFuZ2V9YDtcbiAgICBjb25zdCBmaWxsZWQgPSBmaWxsQW1vdW50KGN4VGlja2VyLCBkYXRhLmFtb3VudCwgZGF0YS5wcmljZUxpbWl0KTtcbiAgICBjb25zdCBhbW91bnQgPSBmaWxsZWQ/LmFtb3VudCA/PyBkYXRhLmFtb3VudDtcbiAgICBjb25zdCBwcmljZUxpbWl0ID0gZmlsbGVkPy5wcmljZUxpbWl0ID8/IGRhdGEucHJpY2VMaW1pdDtcbiAgICBjb25zdCBhbGxvd1VuZmlsbGVkID0gZGF0YS5hbGxvd1VuZmlsbGVkID8/IGZhbHNlO1xuICAgIGNvbnN0IHdpbGxGaWxsQ29tcGxldGVseSA9IGZpbGxlZCAmJiBmaWxsZWQuYW1vdW50ID09PSBkYXRhLmFtb3VudDtcblxuICAgIGlmICghd2lsbEZpbGxDb21wbGV0ZWx5ICYmIGFsbG93VW5maWxsZWQpIHtcbiAgICAgIGxldCBkZXNjcmlwdGlvbiA9IHQoJ2FjdC5iaWREZXNjcmlwdGlvbicsIGZpeGVkMChkYXRhLmFtb3VudCksIHRpY2tlciwgZXhjaGFuZ2UpO1xuICAgICAgaWYgKGlzRmluaXRlKHByaWNlTGltaXQpKSB7XG4gICAgICAgIGRlc2NyaXB0aW9uICs9ICcgJyArIHQoJ2FjdC5hdFByaWNlJywgZml4ZWQwMihkYXRhLnByaWNlTGltaXQpKTtcbiAgICAgICAgZGVzY3JpcHRpb24gKz0gJyAoJyArIHQoJ2FjdC50b3RhbENvc3QnLCBmaXhlZDAoZGF0YS5hbW91bnQgKiBkYXRhLnByaWNlTGltaXQpKSArICcpJztcbiAgICAgIH1cbiAgICAgIHJldHVybiBkZXNjcmlwdGlvbjtcbiAgICB9XG5cbiAgICBsZXQgZGVzY3JpcHRpb24gPSB0KCdhY3QuYnV5RGVzY3JpcHRpb24nLCBmaXhlZDAoYW1vdW50KSwgdGlja2VyLCBleGNoYW5nZSk7XG4gICAgaWYgKGlzRmluaXRlKHByaWNlTGltaXQpKSB7XG4gICAgICBkZXNjcmlwdGlvbiArPSAnICcgKyB0KCdhY3QuYnV5V2l0aExpbWl0JywgZml4ZWQwMihwcmljZUxpbWl0KSk7XG4gICAgfVxuICAgIGlmIChmaWxsZWQpIHtcbiAgICAgIGRlc2NyaXB0aW9uICs9ICcgKCcgKyB0KCdhY3QudG90YWxDb3N0JywgZml4ZWQwKGZpbGxlZC5jb3N0KSkgKyAnKSc7XG4gICAgfSBlbHNlIHtcbiAgICAgIGRlc2NyaXB0aW9uICs9ICcgKCcgKyB0KCdhY3Qubm9QcmljZURhdGEnKSArICcpJztcbiAgICB9XG4gICAgcmV0dXJuIGRlc2NyaXB0aW9uO1xuICB9LFxuICBleGVjdXRlOiBhc3luYyBjdHggPT4ge1xuICAgIGNvbnN0IHsgZGF0YSwgbG9nLCBzZXRTdGF0dXMsIHJlcXVlc3RUaWxlLCB3YWl0QWN0LCB3YWl0QWN0aW9uRmVlZGJhY2ssIGNvbXBsZXRlLCBza2lwLCBmYWlsIH0gPVxuICAgICAgY3R4O1xuICAgIGNvbnN0IGFzc2VydDogQXNzZXJ0Rm4gPSBjdHguYXNzZXJ0O1xuICAgIGNvbnN0IHsgYW1vdW50LCB0aWNrZXIsIGV4Y2hhbmdlLCBwcmljZUxpbWl0IH0gPSBkYXRhO1xuICAgIGNvbnN0IGN4VGlja2VyID0gYCR7dGlja2VyfS4ke2V4Y2hhbmdlfWA7XG4gICAgY29uc3QgY3hXYXJlaG91c2UgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAvLyBVc2UgZXhjaGFuZ2UgY29kZSBkaXJlY3RseSB0byBmaW5kIHdhcmVob3VzZSAoZS5nLiAnSUMxJylcbiAgICAgIGNvbnN0IHdhcmVob3VzZSA9IHdhcmVob3VzZXNTdG9yZS5nZXRCeUVudGl0eU5hdHVyYWxJZE9yTmFtZShleGNoYW5nZSk7XG4gICAgICByZXR1cm4gc3RvcmFnZXNTdG9yZS5nZXRCeUlkKHdhcmVob3VzZT8uc3RvcmVJZCk7XG4gICAgfSk7XG5cbiAgICAvLyBJZiB3YXJlaG91c2UgZGF0YSBpcyBub3QgbG9hZGVkIChwbGF5ZXIgaGFzbid0IHZpc2l0ZWQgZXhjaGFuZ2UpLCBza2lwIGNhcGFjaXR5IGNoZWNrXG4gICAgaWYgKCFjeFdhcmVob3VzZS52YWx1ZSkge1xuICAgICAgbG9nLndhcm5pbmcodCgnYWN0LndhcmVob3VzZU5vdExvYWRlZCcsIGV4Y2hhbmdlKSk7XG4gICAgfVxuXG4gICAgaWYgKGFtb3VudCA8PSAwKSB7XG4gICAgICBsb2cud2FybmluZyhgTm8gJHt0aWNrZXJ9IHdhcyBib3VnaHQgKHRhcmdldCBhbW91bnQgaXMgMClgKTtcbiAgICAgIHNraXAoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHRpY2tlcik7XG4gICAgYXNzZXJ0KG1hdGVyaWFsLCBgVW5rbm93biBtYXRlcmlhbCAke3RpY2tlcn1gKTtcblxuICAgIC8vIE9ubHkgY2hlY2sgY2FwYWNpdHkgaWYgd2FyZWhvdXNlIGRhdGEgaXMgYXZhaWxhYmxlXG4gICAgaWYgKGN4V2FyZWhvdXNlLnZhbHVlKSB7XG4gICAgICBjb25zdCBjYW5GaXRXZWlnaHQgPVxuICAgICAgICBtYXRlcmlhbC53ZWlnaHQgKiBhbW91bnQgPD0gY3hXYXJlaG91c2UudmFsdWUud2VpZ2h0Q2FwYWNpdHkgLSBjeFdhcmVob3VzZS52YWx1ZS53ZWlnaHRMb2FkO1xuICAgICAgY29uc3QgY2FuRml0Vm9sdW1lID1cbiAgICAgICAgbWF0ZXJpYWwudm9sdW1lICogYW1vdW50IDw9IGN4V2FyZWhvdXNlLnZhbHVlLnZvbHVtZUNhcGFjaXR5IC0gY3hXYXJlaG91c2UudmFsdWUudm9sdW1lTG9hZDtcbiAgICAgIGFzc2VydChcbiAgICAgICAgY2FuRml0V2VpZ2h0ICYmIGNhbkZpdFZvbHVtZSxcbiAgICAgICAgYENhbm5vdCBub3QgYnV5ICR7Zml4ZWQwKGFtb3VudCl9ICR7dGlja2VyfSAod2lsbCBub3QgZml0IGluIHRoZSB3YXJlaG91c2UpYCxcbiAgICAgICk7XG4gICAgfVxuXG4gICAgY29uc3QgdGlsZSA9IGF3YWl0IHJlcXVlc3RUaWxlKGBDWFBPICR7Y3hUaWNrZXJ9YCk7XG4gICAgaWYgKCF0aWxlKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgc2V0U3RhdHVzKCdTZXR0aW5nIHVwIENYUE8gYnVmZmVyLi4uJyk7XG5cbiAgICBjb25zdCBidXlCdXR0b24gPSBhd2FpdCAkKHRpbGUuYW5jaG9yLCBDLkJ1dHRvbi5zdWNjZXNzKTtcbiAgICBjb25zdCBmb3JtID0gYXdhaXQgJCh0aWxlLmFuY2hvciwgQy5Db21FeFBsYWNlT3JkZXJGb3JtLmZvcm0pO1xuICAgIGNvbnN0IGlucHV0cyA9IF8kJChmb3JtLCAnaW5wdXQnKTtcbiAgICBjb25zdCBxdWFudGl0eUlucHV0ID0gaW5wdXRzWzBdO1xuICAgIGFzc2VydChxdWFudGl0eUlucHV0ICE9PSB1bmRlZmluZWQsICdNaXNzaW5nIHF1YW50aXR5IGlucHV0Jyk7XG4gICAgY29uc3QgcHJpY2VJbnB1dCA9IGlucHV0c1sxXTtcbiAgICBhc3NlcnQocHJpY2VJbnB1dCAhPT0gdW5kZWZpbmVkLCAnTWlzc2luZyBwcmljZSBpbnB1dCcpO1xuXG4gICAgbGV0IHNob3VsZFVud2F0Y2ggPSBmYWxzZTtcbiAgICBsZXQgaGFzV2FybmVkQWJvdXRNaXNzaW5nRGF0YSA9IGZhbHNlO1xuICAgIGNvbnN0IHVud2F0Y2ggPSB3YXRjaEVmZmVjdCgoKSA9PiB7XG4gICAgICBpZiAoc2hvdWxkVW53YXRjaCkge1xuICAgICAgICB1bndhdGNoKCk7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgY29uc3QgZmlsbGVkID0gZmlsbEFtb3VudChjeFRpY2tlciwgYW1vdW50LCBwcmljZUxpbWl0KTtcblxuICAgICAgaWYgKCFmaWxsZWQpIHtcbiAgICAgICAgLy8gSW5zdGVhZCBvZiBmYWlsaW5nIGltbWVkaWF0ZWx5LCB3YWl0IGZvciBvcmRlciBib29rIGRhdGEgdG8gbG9hZFxuICAgICAgICBpZiAoIWhhc1dhcm5lZEFib3V0TWlzc2luZ0RhdGEpIHtcbiAgICAgICAgICBsb2cud2FybmluZyhcbiAgICAgICAgICAgIGDnrYnlvoUgJHtjeFRpY2tlcn0g6K6i5Y2V57C/5pWw5o2u5Yqg6L29Li4uIChXYWl0aW5nIGZvciAke2N4VGlja2VyfSBvcmRlciBib29rIGRhdGEgdG8gbG9hZC4uLilgLFxuICAgICAgICAgICk7XG4gICAgICAgICAgaGFzV2FybmVkQWJvdXRNaXNzaW5nRGF0YSA9IHRydWU7XG4gICAgICAgIH1cbiAgICAgICAgLy8gS2VlcCB3YXRjaGluZywgZG9uJ3QgZmFpbCB5ZXRcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICAvLyBSZXNldCB3YXJuaW5nIGZsYWcgb25jZSBkYXRhIGlzIGF2YWlsYWJsZVxuICAgICAgaGFzV2FybmVkQWJvdXRNaXNzaW5nRGF0YSA9IGZhbHNlO1xuXG4gICAgICBpZiAoZmlsbGVkLmFtb3VudCA8IGFtb3VudCAmJiAhZGF0YS5hbGxvd1VuZmlsbGVkKSB7XG4gICAgICAgIGlmICghZGF0YS5idXlQYXJ0aWFsKSB7XG4gICAgICAgICAgbGV0IG1lc3NhZ2UgPSBgTm90IGVub3VnaCBtYXRlcmlhbHMgb24gJHtleGNoYW5nZX0gdG8gYnV5ICR7Zml4ZWQwKGFtb3VudCl9ICR7dGlja2VyfWA7XG4gICAgICAgICAgaWYgKGlzRmluaXRlKHByaWNlTGltaXQpKSB7XG4gICAgICAgICAgICBtZXNzYWdlICs9IGAgd2l0aCBwcmljZSBsaW1pdCAke2ZpeGVkMDIocHJpY2VMaW1pdCl9L3VgO1xuICAgICAgICAgIH1cbiAgICAgICAgICBzaG91bGRVbndhdGNoID0gdHJ1ZTtcbiAgICAgICAgICBmYWlsKG1lc3NhZ2UpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuXG4gICAgICAgIGNvbnN0IGxlZnRvdmVyID0gYW1vdW50IC0gZmlsbGVkLmFtb3VudDtcbiAgICAgICAgbGV0IG1lc3NhZ2UgPVxuICAgICAgICAgIGAke2ZpeGVkMChsZWZ0b3Zlcil9ICR7dGlja2VyfSB3aWxsIG5vdCBiZSBib3VnaHQgb24gJHtleGNoYW5nZX0gYCArXG4gICAgICAgICAgYCgke2ZpeGVkMChmaWxsZWQuYW1vdW50KX0gb2YgJHtmaXhlZDAoYW1vdW50KX0gYXZhaWxhYmxlYDtcbiAgICAgICAgaWYgKGlzRmluaXRlKHByaWNlTGltaXQpKSB7XG4gICAgICAgICAgbWVzc2FnZSArPSBgIHdpdGggcHJpY2UgbGltaXQgJHtmaXhlZDAyKHByaWNlTGltaXQpfS91YDtcbiAgICAgICAgfVxuICAgICAgICBtZXNzYWdlICs9ICcpJztcbiAgICAgICAgbG9nLndhcm5pbmcobWVzc2FnZSk7XG4gICAgICAgIGlmIChmaWxsZWQuYW1vdW50ID09PSAwKSB7XG4gICAgICAgICAgc2hvdWxkVW53YXRjaCA9IHRydWU7XG4gICAgICAgICAgc2tpcCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgfVxuXG4gICAgICBpZiAoZGF0YS5hbGxvd1VuZmlsbGVkKSB7XG4gICAgICAgIGNoYW5nZUlucHV0VmFsdWUocXVhbnRpdHlJbnB1dCwgZGF0YS5hbW91bnQudG9TdHJpbmcoKSk7XG4gICAgICAgIGNoYW5nZUlucHV0VmFsdWUocHJpY2VJbnB1dCwgZml4ZWQwMihkYXRhLnByaWNlTGltaXQpKTtcbiAgICAgIH0gZWxzZSB7XG4gICAgICAgIGNoYW5nZUlucHV0VmFsdWUocXVhbnRpdHlJbnB1dCwgZmlsbGVkLmFtb3VudC50b1N0cmluZygpKTtcbiAgICAgICAgY2hhbmdlSW5wdXRWYWx1ZShwcmljZUlucHV0LCBmaXhlZDAyKGZpbGxlZC5wcmljZUxpbWl0KSk7XG4gICAgICB9XG5cbiAgICAgIC8vIENhY2hlIGRlc2NyaXB0aW9uIGJlZm9yZSBjbGlja2luZyB0aGUgYnV5IGJ1dHRvbiBiZWNhdXNlXG4gICAgICAvLyBvcmRlciBib29rIGRhdGEgd2lsbCBjaGFuZ2UgYWZ0ZXIgdGhhdC5cbiAgICAgIGN0eC5jYWNoZURlc2NyaXB0aW9uKCk7XG4gICAgfSk7XG5cbiAgICBhd2FpdCB3YWl0QWN0KCk7XG4gICAgdW53YXRjaCgpO1xuXG4gICAgY29uc3Qgd2FyZWhvdXNlQW1vdW50ID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIChcbiAgICAgICAgY3hXYXJlaG91c2UudmFsdWU/Lml0ZW1zXG4gICAgICAgICAgLm1hcCh4ID0+IHgucXVhbnRpdHkgPz8gdW5kZWZpbmVkKVxuICAgICAgICAgIC5maWx0ZXIoeCA9PiB4ICE9PSB1bmRlZmluZWQpXG4gICAgICAgICAgLmZpbmQoeCA9PiB4Lm1hdGVyaWFsLnRpY2tlciA9PT0gdGlja2VyKT8uYW1vdW50ID8/IDBcbiAgICAgICk7XG4gICAgfSk7XG4gICAgY29uc3QgY3VycmVudEFtb3VudCA9IHdhcmVob3VzZUFtb3VudC52YWx1ZTtcbiAgICBjb25zdCBhbW91bnRUb0ZpbGwgPSBmaWxsQW1vdW50KGN4VGlja2VyLCBhbW91bnQsIHByaWNlTGltaXQpPy5hbW91bnQgPz8gMDtcbiAgICBjb25zdCBzaG91bGRXYWl0Rm9yVXBkYXRlID0gYW1vdW50VG9GaWxsID4gMDtcblxuICAgIGF3YWl0IGNsaWNrRWxlbWVudChidXlCdXR0b24pO1xuICAgIGF3YWl0IHdhaXRBY3Rpb25GZWVkYmFjayh0aWxlKTtcblxuICAgIGlmIChzaG91bGRXYWl0Rm9yVXBkYXRlICYmIGN4V2FyZWhvdXNlLnZhbHVlKSB7XG4gICAgICBzZXRTdGF0dXMoJ1dhaXRpbmcgZm9yIHN0b3JhZ2UgdXBkYXRlLi4uJyk7XG4gICAgICBjb25zdCBzdG9yYWdlVXBkYXRlUHJvbWlzZSA9IHdhdGNoV2hpbGUoKCkgPT4gd2FyZWhvdXNlQW1vdW50LnZhbHVlID09PSBjdXJyZW50QW1vdW50KTtcbiAgICAgIGNvbnN0IHRpbWVvdXRQcm9taXNlID0gbmV3IFByb21pc2UocmVzb2x2ZSA9PiBzZXRUaW1lb3V0KHJlc29sdmUsIDUwMDApKTtcbiAgICAgIGF3YWl0IFByb21pc2UucmFjZShbc3RvcmFnZVVwZGF0ZVByb21pc2UsIHRpbWVvdXRQcm9taXNlXSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNldFN0YXR1cygnQmlkIG9yZGVyIGNyZWF0ZWQnKTtcbiAgICB9XG5cbiAgICBjb21wbGV0ZSgpO1xuICB9LFxufSk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBc0JPLE1BQUEsV0FBQSxJQUFBLGNBQUE7QUFBQSxFQUF5QyxNQUFBO0FBQUEsRUFDeEMsZ0JBQUEsQ0FBQSxVQUFBLEVBQUEsR0FBQSxNQUFBLFFBQUEsS0FBQSxPQUFBLFlBQUE7RUFDZ0UsYUFBQSxDQUFBLFNBQUE7QUFFcEUsVUFBQSxFQUFBLFFBQUEsU0FBQSxJQUFBO0FBQ0EsVUFBQSxXQUFBLEdBQUEsTUFBQSxJQUFBLFFBQUE7QUFDQSxVQUFBLFNBQUEsV0FBQSxVQUFBLEtBQUEsUUFBQSxLQUFBLFVBQUE7QUFDQSxVQUFBLFNBQUEsUUFBQSxVQUFBLEtBQUE7QUFDQSxVQUFBLGFBQUEsUUFBQSxjQUFBLEtBQUE7QUFDQSxVQUFBLGdCQUFBLEtBQUEsaUJBQUE7QUFDQSxVQUFBLHFCQUFBLFVBQUEsT0FBQSxXQUFBLEtBQUE7QUFFQSxRQUFBLENBQUEsc0JBQUEsZUFBQTtBQUNFLFVBQUEsZUFBQSxFQUFBLHNCQUFBLE9BQUEsS0FBQSxNQUFBLEdBQUEsUUFBQSxRQUFBO0FBQ0EsVUFBQSxT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
