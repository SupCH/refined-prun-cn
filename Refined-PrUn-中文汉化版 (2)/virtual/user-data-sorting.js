import { userData } from './user-data.js';
import { getInvStore } from './store-id.js';
import { reactive } from './reactivity.esm-bundler.js';
import { watch } from './runtime-core.esm-bundler.js';
const cache = /* @__PURE__ */ new Map();
function getSortingData(storeId) {
  const store = getInvStore(storeId);
  if (!store) {
    return {
      modes: [],
    };
  }
  if (cache.has(store.id)) {
    return cache.get(store.id);
  }
  let data = userData.sorting[store.id];
  let added = data !== void 0;
  data ??= reactive({
    modes: [],
  });
  watch(
    data,
    () => {
      const isEmpty =
        data.modes.length === 0 &&
        data.cat === void 0 &&
        data.reverse === void 0 &&
        data.active === void 0;
      if (isEmpty && added) {
        delete userData.sorting[store.id];
        added = false;
      }
      if (!isEmpty && !added) {
        userData.sorting[store.id] = data;
        added = true;
      }
    },
    { deep: true },
  );
  cache.set(store.id, data);
  return data;
}
export { getSortingData };
