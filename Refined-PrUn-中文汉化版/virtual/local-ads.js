import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { castArray } from './cast-array.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  DATA_DATA(data) {
    if (data.path[0] !== 'localmarkets' || data.path[2] !== 'ads') {
      return;
    }
    store.setMany(castArray(data.body));
    store.setFetched();
  },
  DATA_DATA_REMOVED(data) {
    const id = data.path[3];
    if (data.path[0] !== 'localmarkets' || data.path[2] !== 'ads' || id === void 0) {
      return;
    }
    store.removeOne(id);
  },
});
const localAdsStore = {
  ...state,
};
export { localAdsStore };
