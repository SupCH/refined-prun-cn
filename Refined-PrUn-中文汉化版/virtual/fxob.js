import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  FOREX_BROKER_DATA(data) {
    store.setOne(data);
    store.setFetched();
  },
});
const getByTicker = createMapGetter(state.all, x => x.ticker);
const fxobStore = {
  ...state,
  getByTicker,
};
export { fxobStore };
