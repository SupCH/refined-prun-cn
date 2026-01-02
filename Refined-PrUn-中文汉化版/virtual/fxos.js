import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { request } from './request-hooks2.js';
import { computed } from './runtime-core.esm-bundler.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  FOREX_TRADER_ORDERS(data) {
    store.setAll(data.orders);
    store.setFetched();
  },
  FOREX_TRADER_ORDER_ADDED(data) {
    store.addOne(data);
  },
  FOREX_TRADER_ORDER_UPDATED(data) {
    store.updateOne(data);
  },
  FOREX_TRADER_ORDER_REMOVED(data) {
    store.removeOne(data.orderId);
  },
});
const all = (() => {
  const all2 = state.all;
  return computed(() => {
    if (!state.fetched.value) {
      request.fxos();
    }
    return all2.value;
  });
})();
const active = computed(() => all.value?.filter(x => x.status !== 'FILLED'));
const fxosStore = {
  ...state,
  all,
  active,
};
export { fxosStore };
