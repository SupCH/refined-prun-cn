import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createRequestStore, request } from './request-hooks2.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  BLUEPRINT_BLUEPRINTS(data) {
    store.setAll(data.blueprints);
    store.setFetched();
  },
  BLUEPRINT_BLUEPRINT(data) {
    store.setOne(data);
  },
});
const getByNaturalId = createMapGetter(state.all, x => x.naturalId);
const blueprintsStore = createRequestStore(request.blueprints, {
  ...state,
  getByNaturalId,
});
export { blueprintsStore };
