import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './cxob-depth-bars.module.css.js';
import tableAlternatingColors from './table-rows-alternating-colors.module.css.js';
import { cxobStore } from './cxob.js';
import { clamp } from './clamp.js';
import { isFiniteOrder } from './orders.js';
import { refPrunId } from './attributes.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const orderDepths = computed(() => {
    const orderBook = cxobStore.getByTicker(tile.parameter);
    if (!orderBook) {
      return void 0;
    }
    const maxDepth = Math.max(
      calculateDepth(orderBook.sellingOrders),
      calculateDepth(orderBook.buyingOrders),
    );
    const depths = /* @__PURE__ */ new Map();
    fillOrderDepths(depths, orderBook.sellingOrders, maxDepth);
    fillOrderDepths(depths, orderBook.buyingOrders, maxDepth);
    return depths;
  });
  subscribe($$(tile.anchor, C.ScrollView.view), scroll => {
    subscribe($$(scroll, 'table'), async table => {
      const tbodies = _$$(table, 'tbody');
      const askSection = tbodies[0];
      const bidSection = tbodies[2];
      if (askSection === void 0 || bidSection === void 0) {
        return;
      }
      table.classList.add(tableAlternatingColors.optOut);
      askSection.classList.add($style.tbody, $style.asks);
      bidSection.classList.add($style.tbody, $style.bids);
      subscribe($$(table, 'tr'), row => {
        const id = refPrunId(row);
        watchEffectWhileNodeAlive(row, () => {
          const depth = orderDepths.value?.get(id.value ?? '') ?? 0;
          row.style.setProperty('--rp-market-depth', `${depth}%`);
        });
      });
    });
  });
}
function calculateDepth(orders) {
  let depth = 0;
  for (const order of orders) {
    if (!isFiniteOrder(order)) {
      break;
    }
    depth += order.amount;
  }
  return depth;
}
function fillOrderDepths(depths, orders, maxDepth) {
  let accumulated = 0;
  let hitMM = false;
  for (const order of orders) {
    if (!isFiniteOrder(order)) {
      hitMM = true;
      depths.set(order.id, 0);
      continue;
    }
    if (hitMM) {
      depths.set(order.id, 0);
      continue;
    }
    accumulated += order.amount;
    depths.set(order.id, clamp((accumulated / maxDepth) * 100, 0, 100));
  }
}
function init() {
  tiles.observe('CXOB', onTileReady);
}
features.add(import.meta.url, init, 'CXOB: Adds market depth bars.');
