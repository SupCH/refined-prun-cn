import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  WORLD_MATERIAL_CATEGORIES(data) {
    const materials = data.categories.flatMap(x => x.materials);
    store.setAll(materials);
    store.setFetched();
  },
});
const getByName = createMapGetter(state.all, x => x.name);
const getByTicker = (() => {
  const getter = createMapGetter(state.all, x => x.ticker);
  return value => {
    if (!value) {
      return void 0;
    }
    const dotIndex = value.indexOf('.');
    if (dotIndex >= 0) {
      return getter(value.substring(0, dotIndex));
    }
    return getter(value);
  };
})();
const materialsStore = {
  ...state,
  getByTicker,
  getByName,
};
export { materialsStore };
