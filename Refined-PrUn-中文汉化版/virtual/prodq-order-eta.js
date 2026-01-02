import { subscribe } from './subscribe-async-generator.js';
import { $$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { productionStore } from './production.js';
import { formatEta } from './format.js';
import { timestampEachMinute } from './dayjs.js';
import { createReactiveDiv } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import $style from './prodq-order-eta.module.css.js';
import { calcCompletionDate } from './production-line.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ProductionQueue.table), table => {
    subscribe($$(table, 'tr'), order => {
      if (_$(order, 'th')) {
        return;
      }
      onOrderSlotReady(order.children[5], order, tile.parameter);
    });
  });
}
function onOrderSlotReady(slot, order, siteId) {
  const orderId = refPrunId(order);
  const completion = computed(() => {
    const line = productionStore.getById(siteId);
    for (const order2 of line?.orders ?? []) {
      if (order2.id === orderId.value) {
        return calcCompletionDate(line, order2);
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
  keepLast(slot, () => slot, div);
}
function init() {
  applyCssRule('PRODQ', `.${C.ProductionQueue.table}`, $style.table);
  tiles.observe('PRODQ', onTileReady);
}
features.add(import.meta.url, init, 'PRODQ: Adds a finish ETA label to orders.');
