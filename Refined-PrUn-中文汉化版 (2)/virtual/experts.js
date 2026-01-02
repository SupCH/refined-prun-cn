import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore(x => x.siteId);
const state = store.state;
onApiMessage({
  EXPERTS_EXPERTS(data) {
    store.setOne(data);
    store.setFetched();
  },
});
const getBySiteId = createMapGetter(state.all, x => x.siteId);
const expertsStore = {
  ...state,
  getBySiteId,
};
export { expertsStore };
