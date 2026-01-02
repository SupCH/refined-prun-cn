import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  WORLD_MATERIAL_CATEGORIES(data) {
    store.setAll(data.categories);
    store.setFetched();
  },
});
const toSerializableCategoryName = name =>
  name.replaceAll('(', '').replaceAll(')', '').toUpperCase();
const getBySerializableName = createMapGetter(state.all, x => x.name, toSerializableCategoryName);
const materialCategoriesStore = {
  ...state,
  getBySerializableName,
};
export { materialCategoriesStore, toSerializableCategoryName };
