import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import $style from './cxpc-chart-types.module.css.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { cxobStore } from './cxob.js';
import { cxpcStore } from './cxpc.js';
import { COMEX_BROKER_PRICES } from './client-messages.js';
import { dispatchClientPrunMessage } from './prun-api-listener.js';
import { userData } from './user-data.js';
import _sfc_main from './SettingsGroup.vue.js';
import { computedTileState } from './user-data-tiles.js';
import { getTileState } from './tile-state.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const ticker = tile.parameter;
  const broker = computed(() => cxobStore.getByTicker(ticker));
  const cxpc = computed(() => cxpcStore.getById(broker.value?.id));
  const chartType = computedTileState(getTileState(tile), 'chartType', void 0);
  if (chartType.value === void 0) {
    chartType.value = userData.settings.defaultChartType;
  }
  subscribe($$(tile.anchor, C.ChartContainer.container), container => {
    watchEffectWhileNodeAlive(container, () => {
      if (!cxpc.value) {
        return;
      }
      switch (chartType.value) {
        case 'SMOOTH': {
          smooth(cxpc.value);
          break;
        }
        case 'ALIGNED': {
          aligned(cxpc.value);
          break;
        }
        case 'RAW': {
          raw(cxpc.value);
          break;
        }
      }
    });
  });
  subscribe($$(tile.anchor, C.ChartContainer.settings), settings => {
    createFragmentApp(
      _sfc_main,
      reactive({
        chartType,
        onChange: type => {
          chartType.value = type;
        },
      }),
    ).appendTo(settings);
  });
}
function smooth(data) {
  const payload = { ...data, prices: [] };
  for (const interval of data.prices) {
    const intervalCopy = { ...interval };
    payload.prices.push(intervalCopy);
    if (interval.prices.length < 2) {
      continue;
    }
    const ha = [];
    interval.prices.forEach((c, i) => {
      const haClose = (c.open + c.high + c.low + c.close) / 4;
      const haOpen = i === 0 ? (c.open + c.close) / 2 : (ha[i - 1].open + ha[i - 1].close) / 2;
      const haHigh = Math.max(c.high, haOpen, haClose);
      const haLow = Math.min(c.low, haOpen, haClose);
      ha.push({ ...c, open: haOpen, high: haHigh, low: haLow, close: haClose });
    });
    intervalCopy.prices = ha;
  }
  const messsage = COMEX_BROKER_PRICES(payload);
  dispatchClientPrunMessage(messsage);
}
function aligned(data) {
  const payload = { ...data, prices: [] };
  data = structuredClone(data);
  for (const interval of data.prices) {
    const intervalCopy = { ...interval };
    payload.prices.push(intervalCopy);
    if (interval.prices.length < 2) {
      continue;
    }
    const vwap = [];
    vwap.push({ ...interval.prices[0] });
    let previous = vwap[0];
    for (let i = 1; i < interval.prices.length; i++) {
      const current = { ...interval.prices[i] };
      vwap.push(current);
      const average =
        (current.open * current.volume + previous.close * previous.volume) /
        (current.volume + previous.volume);
      previous.close = average;
      current.open = average;
      previous = current;
    }
    intervalCopy.prices = vwap;
  }
  const messsage = COMEX_BROKER_PRICES(payload);
  dispatchClientPrunMessage(messsage);
}
function raw(data) {
  const messsage = COMEX_BROKER_PRICES(data);
  dispatchClientPrunMessage(messsage);
}
function init() {
  tiles.observe('CXPC', onTileReady);
  applyCssRule('CXPC', `.${C.ChartContainer.settings}`, $style.settings);
}
features.add(import.meta.url, init, 'CXPC: Adds "Smooth" and "Aligned" chart types.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hwYy1jaGFydC10eXBlcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4cGMtY2hhcnQtdHlwZXMvY3hwYy1jaGFydC10eXBlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vY3hwYy1jaGFydC10eXBlcy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IGN4b2JTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeG9iJztcbmltcG9ydCB7IGN4cGNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeHBjJztcbmltcG9ydCB7IENPTUVYX0JST0tFUl9QUklDRVMgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2NsaWVudC1tZXNzYWdlcyc7XG5pbXBvcnQgeyBkaXNwYXRjaENsaWVudFBydW5NZXNzYWdlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9wcnVuLWFwaS1saXN0ZW5lcic7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCBTZXR0aW5nc0dyb3VwIGZyb20gJ0BzcmMvZmVhdHVyZXMvYmFzaWMvY3hwYy1jaGFydC10eXBlcy9TZXR0aW5nc0dyb3VwLnZ1ZSc7XG5pbXBvcnQgeyBjb21wdXRlZFRpbGVTdGF0ZSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhLXRpbGVzJztcbmltcG9ydCB7IGdldFRpbGVTdGF0ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvYmFzaWMvY3hwYy1jaGFydC10eXBlcy90aWxlLXN0YXRlJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgY29uc3QgdGlja2VyID0gdGlsZS5wYXJhbWV0ZXIhO1xuICBjb25zdCBicm9rZXIgPSBjb21wdXRlZCgoKSA9PiBjeG9iU3RvcmUuZ2V0QnlUaWNrZXIodGlja2VyKSk7XG4gIGNvbnN0IGN4cGMgPSBjb21wdXRlZCgoKSA9PiBjeHBjU3RvcmUuZ2V0QnlJZChicm9rZXIudmFsdWU/LmlkKSk7XG4gIGNvbnN0IGNoYXJ0VHlwZSA9IGNvbXB1dGVkVGlsZVN0YXRlKGdldFRpbGVTdGF0ZSh0aWxlKSwgJ2NoYXJ0VHlwZScsIHVuZGVmaW5lZCk7XG4gIGlmIChjaGFydFR5cGUudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIGNoYXJ0VHlwZS52YWx1ZSA9IHVzZXJEYXRhLnNldHRpbmdzLmRlZmF1bHRDaGFydFR5cGU7XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQ2hhcnRDb250YWluZXIuY29udGFpbmVyKSwgY29udGFpbmVyID0+IHtcbiAgICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKGNvbnRhaW5lciwgKCkgPT4ge1xuICAgICAgaWYgKCFjeHBjLnZhbHVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc3dpdGNoIChjaGFydFR5cGUudmFsdWUpIHtcbiAgICAgICAgY2FzZSAnU01PT1RIJzoge1xuICAgICAgICAgIHNtb290aChjeHBjLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgICBjYXNlICdBTElHTkVEJzoge1xuICAgICAgICAgIGFsaWduZWQoY3hwYy52YWx1ZSk7XG4gICAgICAgICAgYnJlYWs7XG4gICAgICAgIH1cbiAgICAgICAgY2FzZSAnUkFXJzoge1xuICAgICAgICAgIHJhdyhjeHBjLnZhbHVlKTtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQ2hhcnRDb250YWluZXIuc2V0dGluZ3MpLCBzZXR0aW5ncyA9PiB7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoXG4gICAgICBTZXR0aW5nc0dyb3VwLFxuICAgICAgcmVhY3RpdmUoe1xuICAgICAgICBjaGFydFR5cGUsXG4gICAgICAgIG9uQ2hhbmdlOiAodHlwZTogVXNlckRhdGEuRXhjaGFuZ2VDaGFydFR5cGUpID0+IHtcbiAgICAgICAgICBjaGFydFR5cGUudmFsdWUgPSB0eXBlO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKS5hcHBlbmRUbyhzZXR0aW5ncyk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBzbW9vdGgoZGF0YTogUHJ1bkFwaS5DWEJyb2tlclByaWNlcykge1xuICBjb25zdCBwYXlsb2FkID0geyAuLi5kYXRhLCBwcmljZXM6IFtdIGFzIFBydW5BcGkuQ1hJbnRlcnZhbFByaWNlc1tdIH07XG4gIGZvciAoY29uc3QgaW50ZXJ2YWwgb2YgZGF0YS5wcmljZXMpIHtcbiAgICBjb25zdCBpbnRlcnZhbENvcHkgPSB7IC4uLmludGVydmFsIH07XG4gICAgcGF5bG9hZC5wcmljZXMucHVzaChpbnRlcnZhbENvcHkpO1xuICAgIGlmIChpbnRlcnZhbC5wcmljZXMubGVuZ3RoIDwgMikge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgLy8gUGVyZm9ybSB0aGUgSGVpa2luLUFzaGkgdHJhbnNmb3JtYXRpb24uXG4gICAgY29uc3QgaGEgPSBbXSBhcyB0eXBlb2YgaW50ZXJ2YWwucHJpY2VzO1xuICAgIGludGVydmFsLnByaWNlcy5mb3JFYWNoKChjLCBpKSA9PiB7XG4gICAgICAvLyAxLiBIQS1DbG9zZTogbWVhbiBvZiByYXcgT0hMQy5cbiAgICAgIGNvbnN0IGhhQ2xvc2UgPSAoYy5vcGVuICsgYy5oaWdoICsgYy5sb3cgKyBjLmNsb3NlKSAvIDQ7XG5cbiAgICAgIC8vIDIuIEhBLU9wZW46IG1lYW4gb2YgcHJldmlvdXMgSEEgb3BlbiAmIGNsb3NlIChzZWVkZWQgb24gZmlyc3QgYmFyKS5cbiAgICAgIGNvbnN0IGhhT3BlbiA9IGkgPT09IDAgPyAoYy5vcGVuICsgYy5jbG9zZSkgLyAyIDogKGhhW2kgLSAxXS5vcGVuICsgaGFbaSAtIDFdLmNsb3NlKSAvIDI7XG5cbiAgICAgIC8vIDMuIEhBLUhpZ2ggLyBIQS1Mb3c6IGV4dHJlbWVzIGFtb25nIGhpZ2gsIG9wZW4sIGNsb3NlLlxuICAgICAgY29uc3QgaGFIaWdoID0gTWF0aC5tYXgoYy5oaWdoLCBoYU9wZW4sIGhhQ2xvc2UpO1xuICAgICAgY29uc3QgaGFMb3cgPSBNYXRoLm1pbihjLmxvdywgaGFPcGVuLCBoYUNsb3NlKTtcblxuICAgICAgaGEucHVzaCh7IC4uLmMsIG9wZW46IGhhT3BlbiwgaGlnaDogaGFIaWdoLCBsb3c6IGhhTG93LCBjbG9zZTogaGFDbG9zZSB9KTtcbiAgICB9KTtcbiAgICBpbnRlcnZhbENvcHkucHJpY2VzID0gaGE7XG4gIH1cbiAgY29uc3QgbWVzc3NhZ2UgPSBDT01FWF9CUk9LRVJfUFJJQ0VTKHBheWxvYWQpO1xuICBkaXNwYXRjaENsaWVudFBydW5NZXNzYWdlKG1lc3NzYWdlKTtcbn1cblxuZnVuY3Rpb24gYWxpZ25lZChkYXRhOiBQcnVuQXBpLkNYQnJva2VyUHJpY2VzKSB7XG4gIGNvbnN0IHBheWxvYWQgPSB7IC4uLmRhdGEsIHByaWNlczogW10gYXMgUHJ1bkFwaS5DWEludGVydmFsUHJpY2VzW10gfTtcbiAgZGF0YSA9IHN0cnVjdHVyZWRDbG9uZShkYXRhKTtcbiAgZm9yIChjb25zdCBpbnRlcnZhbCBvZiBkYXRhLnByaWNlcykge1xuICAgIGNvbnN0IGludGVydmFsQ29weSA9IHsgLi4uaW50ZXJ2YWwgfTtcbiAgICBwYXlsb2FkLnByaWNlcy5wdXNoKGludGVydmFsQ29weSk7XG4gICAgaWYgKGludGVydmFsLnByaWNlcy5sZW5ndGggPCAyKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICAvLyBQZXJmb3JtIGEgdm9sdW1lLXdlaWdodGVkIG9wZW4vY2xvc2UgcHJpY2UgdHJhbnNmb3JtYXRpb24uXG4gICAgY29uc3QgdndhcCA9IFtdIGFzIHR5cGVvZiBpbnRlcnZhbC5wcmljZXM7XG4gICAgdndhcC5wdXNoKHsgLi4uaW50ZXJ2YWwucHJpY2VzWzBdIH0pO1xuICAgIGxldCBwcmV2aW91cyA9IHZ3YXBbMF07XG4gICAgZm9yIChsZXQgaSA9IDE7IGkgPCBpbnRlcnZhbC5wcmljZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgIGNvbnN0IGN1cnJlbnQgPSB7IC4uLmludGVydmFsLnByaWNlc1tpXSB9O1xuICAgICAgdndhcC5wdXNoKGN1cnJlbnQpO1xuICAgICAgY29uc3QgYXZlcmFnZSA9XG4gICAgICAgIChjdXJyZW50Lm9wZW4gKiBjdXJyZW50LnZvbHVtZSArIHByZXZpb3VzLmNsb3NlICogcHJldmlvdXMudm9sdW1lKSAvXG4gICAgICAgIChjdXJyZW50LnZvbHVtZSArIHByZXZpb3VzLnZvbHVtZSk7XG4gICAgICBwcmV2aW91cy5jbG9zZSA9IGF2ZXJhZ2U7XG4gICAgICBjdXJyZW50Lm9wZW4gPSBhdmVyYWdlO1xuICAgICAgcHJldmlvdXMgPSBjdXJyZW50O1xuICAgIH1cbiAgICBpbnRlcnZhbENvcHkucHJpY2VzID0gdndhcDtcbiAgfVxuICBjb25zdCBtZXNzc2FnZSA9IENPTUVYX0JST0tFUl9QUklDRVMocGF5bG9hZCk7XG4gIGRpc3BhdGNoQ2xpZW50UHJ1bk1lc3NhZ2UobWVzc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiByYXcoZGF0YTogUHJ1bkFwaS5DWEJyb2tlclByaWNlcykge1xuICBjb25zdCBtZXNzc2FnZSA9IENPTUVYX0JST0tFUl9QUklDRVMoZGF0YSk7XG4gIGRpc3BhdGNoQ2xpZW50UHJ1bk1lc3NhZ2UobWVzc3NhZ2UpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdDWFBDJywgb25UaWxlUmVhZHkpO1xuICBhcHBseUNzc1J1bGUoJ0NYUEMnLCBgLiR7Qy5DaGFydENvbnRhaW5lci5zZXR0aW5nc31gLCAkc3R5bGUuc2V0dGluZ3MpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQ1hQQzogQWRkcyBcIlNtb290aFwiIGFuZCBcIkFsaWduZWRcIiBjaGFydCB0eXBlcy4nKTtcbiJdLCJuYW1lcyI6WyJTZXR0aW5nc0dyb3VwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBV0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLFNBQUEsS0FBQTtBQUNBLFFBQUEsU0FBQSxTQUFBLE1BQUEsVUFBQSxZQUFBLE1BQUEsQ0FBQTtBQUNBLFFBQUEsT0FBQSxTQUFBLE1BQUEsVUFBQSxRQUFBLE9BQUEsT0FBQSxFQUFBLENBQUE7QUFDQSxRQUFBLFlBQUEsa0JBQUEsYUFBQSxJQUFBLEdBQUEsYUFBQSxNQUFBO0FBQ0EsTUFBQSxVQUFBLFVBQUEsUUFBQTtBQUNFLGNBQUEsUUFBQSxTQUFBLFNBQUE7QUFBQSxFQUFvQztBQUd0QyxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsZUFBQSxTQUFBLEdBQUEsQ0FBQSxjQUFBO0FBQ0UsOEJBQUEsV0FBQSxNQUFBO0FBQ0UsVUFBQSxDQUFBLEtBQUEsT0FBQTtBQUNFO0FBQUEsTUFBQTtBQUdGLGNBQUEsVUFBQSxPQUFBO0FBQUEsUUFBeUIsS0FBQSxVQUFBO0FBRXJCLGlCQUFBLEtBQUEsS0FBQTtBQUNBO0FBQUEsUUFBQTtBQUFBLFFBQ0YsS0FBQSxXQUFBO0FBRUUsa0JBQUEsS0FBQSxLQUFBO0FBQ0E7QUFBQSxRQUFBO0FBQUEsUUFDRixLQUFBLE9BQUE7QUFFRSxjQUFBLEtBQUEsS0FBQTtBQUNBO0FBQUEsUUFBQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGLENBQUE7QUFBQSxFQUNELENBQUE7QUFHSCxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsZUFBQSxRQUFBLEdBQUEsQ0FBQSxhQUFBO0FBQ0U7QUFBQSxNQUFBQTtBQUFBQSxNQUNFLFNBQUE7QUFBQSxRQUNTO0FBQUEsUUFDUCxVQUFBLENBQUEsU0FBQTtBQUVFLG9CQUFBLFFBQUE7QUFBQSxRQUFr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
