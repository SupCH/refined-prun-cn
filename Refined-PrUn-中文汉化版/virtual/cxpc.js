import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
const store = createEntityStore(x => x.brokerId);
const state = store.state;
onApiMessage({
  COMEX_BROKER_PRICES(data) {
    store.setOne(data);
    store.setFetched();
    for (const callback of pricesReceivedCallbacks) {
      callback(data);
    }
  },
});
const pricesReceivedCallbacks = [];
const cxpcStore = {
  ...state,
  onPricesReceived(callback) {
    pricesReceivedCallbacks.push(callback);
  },
  offPricesReceived(callback) {
    pricesReceivedCallbacks.splice(pricesReceivedCallbacks.indexOf(callback), 1);
  },
};
export { cxpcStore };
