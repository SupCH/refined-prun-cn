import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { cxpcStore } from './cxpc.js';
import { cxobStore } from './cxob.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ChartContainer.settings), async settings => {
    await waitInitialCxpcResponse(tile.parameter);
    const radioGroups = _$$(settings, C.RadioGroup.container);
    if (radioGroups.length === 0) {
      return;
    }
    const timeRangeGroup = radioGroups[0];
    const rangeButtons = _$$(timeRangeGroup, C.RadioItem.container);
    if (rangeButtons.length === 0) {
      return;
    }
    const yearButton = rangeButtons[rangeButtons.length - 1];
    yearButton?.click();
  });
}
async function waitInitialCxpcResponse(ticker) {
  const broker = computed(() => cxobStore.getByTicker(ticker));
  await new Promise(resolve => {
    const check = data => {
      if (data.brokerId === broker.value?.id) {
        resolve();
        cxpcStore.offPricesReceived(check);
      }
    };
    cxpcStore.onPricesReceived(check);
  });
}
function init() {
  tiles.observe('CXPC', onTileReady);
}
features.add(import.meta.url, init, 'CXPC: Selects the 1y chart on open.');
