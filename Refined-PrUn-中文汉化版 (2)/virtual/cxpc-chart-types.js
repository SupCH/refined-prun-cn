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
import { getTileState } from './tile-state3.js';
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
