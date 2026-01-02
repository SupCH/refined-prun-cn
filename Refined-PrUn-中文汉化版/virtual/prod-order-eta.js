import { subscribe } from './subscribe-async-generator.js';
import { $$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { productionStore } from './production.js';
import { formatEta } from './format.js';
import { timestampEachMinute } from './dayjs.js';
import { createReactiveDiv } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import { calcCompletionDate } from './production-line.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.OrderSlot.container), x => onOrderSlotReady(x, tile.parameter));
}
function onOrderSlotReady(slot, siteId) {
  const orderId = refPrunId(slot);
  const completion = computed(() => {
    const site = sitesStore.getById(siteId);
    const lines = productionStore.getBySiteId(site?.siteId) ?? [];
    for (const line of lines) {
      for (const order of line.orders) {
        if (order.id === orderId.value) {
          return calcCompletionDate(line, order);
        }
      }
    }
    return void 0;
  });
  const eta = computed(() => {
    return completion.value !== void 0
      ? `(${formatEta(timestampEachMinute.value, completion.value)})`
      : void 0;
  });
  const div = createReactiveDiv(slot, eta);
  keepLast(slot, () => _$(slot, C.OrderSlot.info), div);
}
function init() {
  tiles.observe('PROD', onTileReady);
}
features.add(import.meta.url, init, 'PROD: Adds a finish ETA label to orders.');
