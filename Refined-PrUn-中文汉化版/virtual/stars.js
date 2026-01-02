import { onApiMessage } from './api-messages.js';
import { createEntityStore } from './create-entity-store.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore(x => x.systemId);
const state = store.state;
onApiMessage({
  SYSTEM_STARS_DATA(data) {
    store.setAll(data.stars);
    store.setFetched();
  },
});
function getStarNaturalId(star) {
  return star.address.lines[0].entity.naturalId;
}
function getStarName(star) {
  return star.address.lines[0].entity.name;
}
const getByNaturalId = createMapGetter(state.all, getStarNaturalId);
const getByName = createMapGetter(state.all, getStarName);
const find = naturalIdOrName => getByNaturalId(naturalIdOrName) ?? getByName(naturalIdOrName);
const getByPlanetNaturalId = id => getByNaturalId(id?.slice(0, -1));
const starsStore = {
  ...state,
  getByNaturalId,
  getByName,
  find,
  getByPlanetNaturalId,
};
export { getStarName, getStarNaturalId, starsStore };
