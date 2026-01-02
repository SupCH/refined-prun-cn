import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { request } from './request-hooks2.js';
import { computed } from './runtime-core.esm-bundler.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  COMEX_TRADER_ORDERS(data) {
    store.setAll(data.orders);
    store.setFetched();
  },
  COMEX_TRADER_ORDER_ADDED(data) {
    store.addOne(data);
  },
  COMEX_TRADER_ORDER_UPDATED(data) {
    store.updateOne(data);
  },
  COMEX_TRADER_ORDER_REMOVED(data) {
    store.removeOne(data.orderId);
  },
});
const all = (() => {
  const all2 = state.all;
  return computed(() => {
    if (!state.fetched.value) {
      request.cxos();
    }
    return all2.value;
  });
})();
const active = computed(() => all.value?.filter(x => x.status !== 'FILLED'));
const cxosStore = {
  ...state,
  all,
  active,
};
export { cxosStore };
