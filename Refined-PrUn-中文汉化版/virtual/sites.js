import { getEntityNaturalIdFromAddress, getEntityNameFromAddress } from './addresses.js';
import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore(x => x.siteId);
const state = store.state;
onApiMessage({
  SITE_SITES(data) {
    store.setAll(data.sites);
    store.setFetched();
  },
  SITE_SITE(data) {
    store.setOne(data);
  },
  SITE_PLATFORM_BUILT(data) {
    const site = state.getById(data.siteId);
    if (site !== void 0 && !site.platforms.some(x => x.id === data.id)) {
      store.setOne({
        ...site,
        platforms: [...site.platforms, data],
      });
    }
  },
  SITE_PLATFORM_UPDATED(data) {
    const site = state.getById(data.siteId);
    if (site !== void 0) {
      store.setOne({
        ...site,
        platforms: site.platforms.map(x => (x.id === data.id ? { ...x, ...data } : x)),
      });
    }
  },
  SITE_PLATFORM_REMOVED(data) {
    const site = state.getById(data.siteId);
    if (site !== void 0) {
      store.setOne({
        ...site,
        platforms: site.platforms.filter(x => x.id !== data.platformId),
      });
    }
  },
});
const getByShortId = createMapGetter(state.all, x => x.siteId.substring(0, 8));
const getById = value => state.getById(value) ?? getByShortId(value);
const getByPlanetNaturalId = createMapGetter(state.all, x =>
  getEntityNaturalIdFromAddress(x.address),
);
const getByPlanetName = createMapGetter(state.all, x => getEntityNameFromAddress(x.address));
const getByPlanetNaturalIdOrName = value => getByPlanetNaturalId(value) ?? getByPlanetName(value);
const getBuildingLastRepair = building =>
  building.lastRepair?.timestamp ?? building.creationTime.timestamp;
const sitesStore = {
  ...state,
  getById,
  getByPlanetNaturalId,
  getByPlanetName,
  getByPlanetNaturalIdOrName,
};
export { getBuildingLastRepair, sitesStore };
