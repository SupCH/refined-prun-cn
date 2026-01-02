import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter, createGroupMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  STORAGE_STORAGES(data) {
    store.setMany(data.stores);
    store.setFetched();
  },
  STORAGE_CHANGE(data) {
    store.setMany(data.stores);
  },
  STORAGE_REMOVED(data) {
    for (const id of data.storeIds) {
      store.removeOne(id);
    }
  },
});
const getByShortId = createMapGetter(state.all, x => x.id.substring(0, 8));
const getById = value => state.getById(value) ?? getByShortId(value);
const getByAddressableId = createGroupMapGetter(state.all, x => x.addressableId);
const getByName = createGroupMapGetter(state.all, x => x.name ?? '');
const storagesStore = {
  ...state,
  getById,
  getByAddressableId,
  getByName,
};
export { storagesStore };
