import { onApiMessage } from './api-messages.js';
import { createEntityStore } from './create-entity-store.js';
import { createRequestStore, request } from './request-hooks2.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  SHIPYARD_PROJECTS(data) {
    store.setAll(data.projects);
    store.setFetched();
  },
  SHIPYARD_PROJECT(data) {
    store.setOne(data);
  },
});
const getByShortId = createMapGetter(state.all, x => x.id.substring(0, 8));
const getById = value => state.getById(value) ?? getByShortId(value);
const shipyardProjectsStore = createRequestStore(request.shipyardProjects, {
  ...state,
  getById,
});
export { shipyardProjectsStore };
