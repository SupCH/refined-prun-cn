import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createRequestGetter, request } from './request-hooks2.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore(x => x.siteId);
const state = store.state;
onApiMessage({
  WORKFORCE_WORKFORCES(data) {
    store.setOne(data);
    store.setFetched();
  },
  WORKFORCE_WORKFORCES_UPDATED(data) {
    store.setOne(data);
  },
});
const getByShortId = createMapGetter(state.all, x => x.siteId.substring(0, 8));
const getByAnyId = value => state.getById(value) ?? getByShortId(value);
const getById = createRequestGetter(getByAnyId, x => request.workforce(x));
const workforcesStore = {
  ...state,
  getById,
};
export { workforcesStore };
