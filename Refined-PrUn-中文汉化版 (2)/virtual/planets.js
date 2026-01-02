import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore(x => x.naturalId.toLowerCase(), {
  preserveOnConnectionOpen: true,
});
const state = store.state;
onApiMessage({
  FIO_PLANET_DATA(data) {
    store.setAll(data.planets);
    store.setFetched();
  },
});
const getByNaturalId = createMapGetter(state.all, x => x.naturalId);
const getByName = createMapGetter(state.all, x => x.name);
const find = naturalIdOrName => getByNaturalId(naturalIdOrName) ?? getByName(naturalIdOrName);
const planetsStore = {
  ...state,
  getByNaturalId,
  getByName,
  find,
};
export { planetsStore };
