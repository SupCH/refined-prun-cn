import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  ALERTS_ALERTS(data) {
    store.setMany(data.alerts);
    store.setFetched();
  },
  ALERTS_ALERT(data) {
    store.setOne(data);
  },
});
const alertsStore = {
  ...state,
};
export { alertsStore };
