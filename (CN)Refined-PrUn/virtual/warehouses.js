import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
import { getEntityNaturalIdFromAddress, getEntityNameFromAddress } from './addresses.js';
const store = createEntityStore(x => x.warehouseId);
const state = store.state;
onApiMessage({
  WAREHOUSE_STORAGES(data) {
    store.setAll(data.storages);
    store.setFetched();
  },
  WAREHOUSE_STORAGE(data) {
    store.setOne(data);
  },
  WAREHOUSE_STORAGE_REMOVED(data) {
    store.removeOne(data.warehouseId);
  },
});
const getByEntityNaturalId = createMapGetter(state.all, x =>
  getEntityNaturalIdFromAddress(x.address),
);
const getByEntityName = createMapGetter(state.all, x => getEntityNameFromAddress(x.address));
const getByEntityNaturalIdOrName = value => getByEntityNaturalId(value) ?? getByEntityName(value);
const warehousesStore = {
  ...state,
  getByEntityNaturalId,
  getByEntityName,
  getByEntityNaturalIdOrName,
};
export { warehousesStore };
