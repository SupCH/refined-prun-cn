import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import link from './link.module.css.js';
import $style from './highlight-own-exchange-orders.module.css.js';
import { companyStore } from './company.js';
import { refPrunId } from './attributes.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { cxobStore } from './cxob.js';
import { showBuffer } from './buffers.js';
import { fxobStore } from './fxob.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile, getOwnOrders, orderCommand) {
  const ownOrders = computed(() => {
    const ownOrders2 = /* @__PURE__ */ new Map();
    const orders = getOwnOrders(tile.parameter);
    if (!orders) {
      return ownOrders2;
    }
    for (const order of orders) {
      ownOrders2.set(order.id, order);
    }
    return ownOrders2;
  });
  subscribe($$(tile.anchor, 'tr'), tr => {
    const id = refPrunId(tr);
    const ownOrder = computed(() => ownOrders.value.get(id.value ?? ''));
    const amountColumn = tr.children[1];
    if (amountColumn === void 0) {
      return;
    }
    amountColumn.addEventListener('click', () => {
      if (ownOrder.value) {
        void showBuffer(`${orderCommand} ${ownOrder.value.id.substring(0, 8)}`);
      }
    });
    watchEffectWhileNodeAlive(tr, () => {
      const isOwnOrder = ownOrder.value !== void 0;
      tr.classList.toggle($style.ownOrder, isOwnOrder);
      amountColumn.classList.toggle(link.link, isOwnOrder);
    });
  });
}
function getOwnComexOrders(parameter) {
  const orderBook = cxobStore.getByTicker(parameter);
  if (!orderBook) {
    return void 0;
  }
  return [...orderBook.sellingOrders, ...orderBook.buyingOrders].filter(
    x => x.trader.id === companyStore.value?.id,
  );
}
function getOwnForexOrders(parameter) {
  const orderBook = fxobStore.getByTicker(parameter);
  if (!orderBook) {
    return void 0;
  }
  return [...orderBook.sellingOrders, ...orderBook.buyingOrders].filter(
    x => x.trader.id === companyStore.value?.id,
  );
}
function init() {
  tiles.observe('CXOB', x => onTileReady(x, getOwnComexOrders, 'CXO'));
  tiles.observe('FXOB', x => onTileReady(x, getOwnForexOrders, 'FXO'));
}
features.add(import.meta.url, init, 'Highlights own orders in CXOB and FXOB.');
