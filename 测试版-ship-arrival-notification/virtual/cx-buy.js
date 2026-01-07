import { act } from './act-registry.js';
import _sfc_main from './Edit.vue.js';
import { CXPO_BUY } from './CXPO_BUY.js';
import { fixed0, fixed02 } from './format.js';
import { fillAmount } from './utils2.js';
import { t } from './index5.js';
act.addAction({
  type: 'CX Buy',
  description: action => {
    if (!action.group || !action.exchange) {
      return '--';
    }
    return t('act.buyingGroup', action.group, action.exchange);
  },
  editComponent: _sfc_main,
  generateSteps: async ctx => {
    const { data, state, log, fail, getMaterialGroup, emitStep } = ctx;
    const assert = ctx.assert;
    const allowUnfilled = data.allowUnfilled ?? false;
    const buyPartial = data.buyPartial ?? false;
    const materials = await getMaterialGroup(data.group);
    assert(materials, 'Invalid material group');
    if (!materials) {
      fail(`Material group "${data.group}" not found or returned no materials`);
      return;
    }
    const exchange = data.exchange;
    assert(exchange, 'Missing exchange');
    if ((data.useCXInv ?? true) && data.exchange) {
      if (!state.WAR[data.exchange]) {
        log.warning(
          `No warehouse data found for exchange ${data.exchange}, skipping CX inventory allocation`,
        );
      } else {
        for (const mat of Object.keys(materials)) {
          for (const CXMat of Object.keys(state.WAR[data.exchange])) {
            if (CXMat === mat) {
              const used = Math.min(materials[mat], state.WAR[data.exchange][CXMat]);
              materials[mat] -= used;
              state.WAR[data.exchange][CXMat] -= used;
              if (state.WAR[data.exchange][mat] <= 0) {
                delete state.WAR[data.exchange][CXMat];
              }
            }
          }
          if (materials[mat] <= 0) {
            delete materials[mat];
          }
        }
      }
    }
    for (const ticker of Object.keys(materials)) {
      const amount = materials[ticker];
      const priceLimit = data.priceLimits?.[ticker] ?? Infinity;
      if (isNaN(priceLimit)) {
        log.error('Non-numerical price limit on ' + ticker);
        continue;
      }
      const cxTicker = `${ticker}.${data.exchange}`;
      const filled = fillAmount(cxTicker, amount, priceLimit);
      let bidAmount = amount;
      if (filled && filled.amount < amount && !allowUnfilled) {
        if (!buyPartial) {
          let message2 = `Not enough materials on ${exchange} to buy ${fixed0(amount)} ${ticker}`;
          if (isFinite(priceLimit)) {
            message2 += ` with price limit ${fixed02(priceLimit)}/u`;
          }
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
          continue;
        }
        bidAmount = filled.amount;
      }
      emitStep(
        CXPO_BUY({
          exchange,
          ticker,
          amount: bidAmount,
          priceLimit,
          buyPartial,
          allowUnfilled,
        }),
      );
    }
  },
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3gtYnV5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL2N4LWJ1eS9jeC1idXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgRWRpdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9jeC1idXkvRWRpdC52dWUnO1xuaW1wb3J0IHsgQ1hQT19CVVkgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9uLXN0ZXBzL0NYUE9fQlVZJztcbmltcG9ydCB7IGZpeGVkMCwgZml4ZWQwMiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IGZpbGxBbW91bnQgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9jeC1idXkvdXRpbHMnO1xuaW1wb3J0IHsgQXNzZXJ0Rm4gfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IHQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL2kxOG4nO1xuXG5hY3QuYWRkQWN0aW9uKHtcbiAgdHlwZTogJ0NYIEJ1eScsXG4gIGRlc2NyaXB0aW9uOiBhY3Rpb24gPT4ge1xuICAgIGlmICghYWN0aW9uLmdyb3VwIHx8ICFhY3Rpb24uZXhjaGFuZ2UpIHtcbiAgICAgIHJldHVybiAnLS0nO1xuICAgIH1cblxuICAgIHJldHVybiB0KCdhY3QuYnV5aW5nR3JvdXAnLCBhY3Rpb24uZ3JvdXAsIGFjdGlvbi5leGNoYW5nZSk7XG4gIH0sXG4gIGVkaXRDb21wb25lbnQ6IEVkaXQsXG4gIGdlbmVyYXRlU3RlcHM6IGFzeW5jIGN0eCA9PiB7XG4gICAgY29uc3QgeyBkYXRhLCBzdGF0ZSwgbG9nLCBmYWlsLCBnZXRNYXRlcmlhbEdyb3VwLCBlbWl0U3RlcCB9ID0gY3R4O1xuICAgIGNvbnN0IGFzc2VydDogQXNzZXJ0Rm4gPSBjdHguYXNzZXJ0O1xuICAgIGNvbnN0IGFsbG93VW5maWxsZWQgPSBkYXRhLmFsbG93VW5maWxsZWQgPz8gZmFsc2U7XG4gICAgY29uc3QgYnV5UGFydGlhbCA9IGRhdGEuYnV5UGFydGlhbCA/PyBmYWxzZTtcblxuICAgIGNvbnN0IG1hdGVyaWFscyA9IGF3YWl0IGdldE1hdGVyaWFsR3JvdXAoZGF0YS5ncm91cCk7XG4gICAgYXNzZXJ0KG1hdGVyaWFscywgJ0ludmFsaWQgbWF0ZXJpYWwgZ3JvdXAnKTtcblxuICAgIC8vIERlZmVuc2l2ZSBjaGVjazogaWYgbWF0ZXJpYWxzIGlzIHN0aWxsIHVuZGVmaW5lZC9udWxsIGFmdGVyIGFzc2VydCwgZmFpbCBlYXJseVxuICAgIGlmICghbWF0ZXJpYWxzKSB7XG4gICAgICBmYWlsKGBNYXRlcmlhbCBncm91cCBcIiR7ZGF0YS5ncm91cH1cIiBub3QgZm91bmQgb3IgcmV0dXJuZWQgbm8gbWF0ZXJpYWxzYCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgY29uc3QgZXhjaGFuZ2UgPSBkYXRhLmV4Y2hhbmdlO1xuICAgIGFzc2VydChleGNoYW5nZSwgJ01pc3NpbmcgZXhjaGFuZ2UnKTtcblxuICAgIC8vIFRha2Ugb3V0IG1hdGVyaWFscyBpbiBDWCBpbnZlbnRvcnkgaWYgcmVxdWVzdGVkXG4gICAgaWYgKChkYXRhLnVzZUNYSW52ID8/IHRydWUpICYmIGRhdGEuZXhjaGFuZ2UpIHtcbiAgICAgIC8vIERlZmVuc2l2ZSBjaGVjazogZW5zdXJlIGV4Y2hhbmdlIHdhcmVob3VzZSBkYXRhIGV4aXN0c1xuICAgICAgaWYgKCFzdGF0ZS5XQVJbZGF0YS5leGNoYW5nZV0pIHtcbiAgICAgICAgbG9nLndhcm5pbmcoXG4gICAgICAgICAgYE5vIHdhcmVob3VzZSBkYXRhIGZvdW5kIGZvciBleGNoYW5nZSAke2RhdGEuZXhjaGFuZ2V9LCBza2lwcGluZyBDWCBpbnZlbnRvcnkgYWxsb2NhdGlvbmAsXG4gICAgICAgICk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBmb3IgKGNvbnN0IG1hdCBvZiBPYmplY3Qua2V5cyhtYXRlcmlhbHMpKSB7XG4gICAgICAgICAgZm9yIChjb25zdCBDWE1hdCBvZiBPYmplY3Qua2V5cyhzdGF0ZS5XQVJbZGF0YS5leGNoYW5nZV0pKSB7XG4gICAgICAgICAgICBpZiAoQ1hNYXQgPT09IG1hdCkge1xuICAgICAgICAgICAgICAvLyBBbW91bnQgb2YgbWF0ZXJpYWwgdXNlZCAobWluaW11bSBvZiBuZWVkZWQgYW5kIGhhZCBvbiBoYW5kKVxuICAgICAgICAgICAgICBjb25zdCB1c2VkID0gTWF0aC5taW4obWF0ZXJpYWxzW21hdF0sIHN0YXRlLldBUltkYXRhLmV4Y2hhbmdlXVtDWE1hdF0pO1xuICAgICAgICAgICAgICBtYXRlcmlhbHNbbWF0XSAtPSB1c2VkO1xuICAgICAgICAgICAgICBzdGF0ZS5XQVJbZGF0YS5leGNoYW5nZV1bQ1hNYXRdIC09IHVzZWQ7XG4gICAgICAgICAgICAgIGlmIChzdGF0ZS5XQVJbZGF0YS5leGNoYW5nZV1bbWF0XSA8PSAwKSB7XG4gICAgICAgICAgICAgICAgLy8gUmVtb3ZlIG1hdGVyaWFsIGZyb20gQ1ggSW52IGlzIGFscmVhZHkgYWxsb2NhdGVkXG4gICAgICAgICAgICAgICAgZGVsZXRlIHN0YXRlLldBUltkYXRhLmV4Y2hhbmdlXVtDWE1hdF07XG4gICAgICAgICAgICAgIH1cbiAgICAgICAgICAgIH1cbiAgICAgICAgICB9XG4gICAgICAgICAgaWYgKG1hdGVyaWFsc1ttYXRdIDw9IDApIHtcbiAgICAgICAgICAgIC8vIFJlbW92ZSBtYXRlcmlhbCBmcm9tIGxpc3QgaWYgeW91IGFscmVhZHkgaGF2ZSBlbm91Z2ggb24gdGhlIENYXG4gICAgICAgICAgICBkZWxldGUgbWF0ZXJpYWxzW21hdF07XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCB0aWNrZXIgb2YgT2JqZWN0LmtleXMobWF0ZXJpYWxzKSkge1xuICAgICAgY29uc3QgYW1vdW50ID0gbWF0ZXJpYWxzW3RpY2tlcl07XG4gICAgICBjb25zdCBwcmljZUxpbWl0ID0gZGF0YS5wcmljZUxpbWl0cz8uW3RpY2tlcl0gPz8gSW5maW5pdHk7XG4gICAgICBpZiAoaXNOYU4ocHJpY2VMaW1pdCkpIHtcbiAgICAgICAgbG9nLmVycm9yKCdOb24tbnVtZXJpY2FsIHByaWNlIGxpbWl0IG9uICcgKyB0aWNrZXIpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgY3hUaWNrZXIgPSBgJHt0aWNrZXJ9LiR7ZGF0YS5leGNoYW5nZX1gO1xuICAgICAgY29uc3QgZmlsbGVkID0gZmlsbEFtb3VudChjeFRpY2tlciwgYW1vdW50LCBwcmljZUxpbWl0KTtcbiAgICAgIGxldCBiaWRBbW91bnQgPSBhbW91bnQ7XG5cbiAgICAgIGlmIChmaWxsZWQgJiYgZmlsbGVkLmFtb3VudCA8IGFtb3VudCAmJiAhYWxsb3dVbmZpbGxlZCkge1xuICAgICAgICBpZiAoIWJ1eVBhcnRpYWwpIHtcbiAgICAgICAgICBsZXQgbWVzc2FnZSA9IGBOb3QgZW5vdWdoIG1hdGVyaWFscyBvbiAke2V4Y2hhbmdlfSB0byBidXkgJHtmaXhlZDAoYW1vdW50KX0gJHt0aWNrZXJ9YDtcbiAgICAgICAgICBpZiAoaXNGaW5pdGUocHJpY2VMaW1pdCkpIHtcbiAgICAgICAgICAgIG1lc3NhZ2UgKz0gYCB3aXRoIHByaWNlIGxpbWl0ICR7Zml4ZWQwMihwcmljZUxpbWl0KX0vdWA7XG4gICAgICAgICAgfVxuICAgICAgICAgIGZhaWwobWVzc2FnZSk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbGVmdG92ZXIgPSBhbW91bnQgLSBmaWxsZWQuYW1vdW50O1xuICAgICAgICBsZXQgbWVzc2FnZSA9XG4gICAgICAgICAgYCR7Zml4ZWQwKGxlZnRvdmVyKX0gJHt0aWNrZXJ9IHdpbGwgbm90IGJlIGJvdWdodCBvbiAke2V4Y2hhbmdlfSBgICtcbiAgICAgICAgICBgKCR7Zml4ZWQwKGZpbGxlZC5hbW91bnQpfSBvZiAke2ZpeGVkMChhbW91bnQpfSBhdmFpbGFibGVgO1xuICAgICAgICBpZiAoaXNGaW5pdGUocHJpY2VMaW1pdCkpIHtcbiAgICAgICAgICBtZXNzYWdlICs9IGAgd2l0aCBwcmljZSBsaW1pdCAke2ZpeGVkMDIocHJpY2VMaW1pdCl9L3VgO1xuICAgICAgICB9XG4gICAgICAgIG1lc3NhZ2UgKz0gJyknO1xuICAgICAgICBsb2cud2FybmluZyhtZXNzYWdlKTtcbiAgICAgICAgaWYgKGZpbGxlZC5hbW91bnQgPT09IDApIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuXG4gICAgICAgIGJpZEFtb3VudCA9IGZpbGxlZC5hbW91bnQ7XG4gICAgICB9XG5cbiAgICAgIGVtaXRTdGVwKFxuICAgICAgICBDWFBPX0JVWSh7XG4gICAgICAgICAgZXhjaGFuZ2UsXG4gICAgICAgICAgdGlja2VyLFxuICAgICAgICAgIGFtb3VudDogYmlkQW1vdW50LFxuICAgICAgICAgIHByaWNlTGltaXQ6IHByaWNlTGltaXQsXG4gICAgICAgICAgYnV5UGFydGlhbDogYnV5UGFydGlhbCxcbiAgICAgICAgICBhbGxvd1VuZmlsbGVkOiBhbGxvd1VuZmlsbGVkLFxuICAgICAgICB9KSxcbiAgICAgICk7XG4gICAgfVxuICB9LFxufSk7XG4iXSwibmFtZXMiOlsiRWRpdCIsIm1lc3NhZ2UiXSwibWFwcGluZ3MiOiI7Ozs7OztBQVFBLElBQUksVUFBVTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sYUFBYSxDQUFBLFdBQVU7QUFDckIsUUFBSSxDQUFDLE9BQU8sU0FBUyxDQUFDLE9BQU8sVUFBVTtBQUNyQyxhQUFPO0FBQUEsSUFDVDtBQUVBLFdBQU8sRUFBRSxtQkFBbUIsT0FBTyxPQUFPLE9BQU8sUUFBUTtBQUFBLEVBQzNEO0FBQUEsRUFDQSxlQUFlQTtBQUFBQSxFQUNmLGVBQWUsT0FB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
