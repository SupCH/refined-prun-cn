import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { sumBy } from './sum-by.js';
import { percent2 } from './format.js';
import { productionStore } from './production.js';
import { refPrunId } from './attributes.js';
import { createReactiveDiv } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const parameter = tile.parameter;
  if (!parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.ProductionQueue.table), table => {
    subscribe($$(table, 'tr'), x => onRowReady(x, parameter));
  });
}
function onRowReady(row, lineId) {
  const orderId = refPrunId(row);
  const load = computed(() => {
    const line = productionStore.getById(lineId);
    const queue = line?.orders.filter(x => !x.started && !!x.duration);
    if (!queue) {
      return void 0;
    }
    const order = queue.find(o => o.id === orderId.value);
    if (!order) {
      return void 0;
    }
    const totalQueueDuration = sumBy(queue, x => x.duration.millis);
    return percent2(order.duration.millis / totalQueueDuration);
  });
  const div = createReactiveDiv(row, load);
  keepLast(row, () => row.children[6], div);
}
function init() {
  tiles.observe('PRODQ', onTileReady);
}
features.add(import.meta.url, init, 'PRODQ: Adds a daily load percentage label to queued orders.');
