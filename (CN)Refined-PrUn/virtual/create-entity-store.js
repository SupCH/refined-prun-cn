import { onApiMessage } from './api-messages.js';
import { shallowReactive, ref } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
function createEntityStore(selectId, options) {
  selectId = selectId ?? (model => model.id);
  let entities = shallowReactive({});
  const fetched = ref(false);
  if (!options?.preserveOnConnectionOpen) {
    onApiMessage({
      CLIENT_CONNECTION_OPENED() {
        fetched.value = false;
        entities = shallowReactive({});
      },
    });
  }
  return {
    state: {
      fetched,
      entities: computed(() => {
        return fetched.value ? entities : void 0;
      }),
      all: computed(() => (fetched.value ? Object.values(entities) : void 0)),
      getById: id => (fetched.value && id ? entities[id] : void 0),
    },
    setAll(items) {
      for (const key in entities) {
        delete entities[key];
      }
      for (const item of items) {
        entities[selectId(item)] = item;
      }
    },
    setOne(item) {
      entities[selectId(item)] = item;
    },
    setMany(items) {
      for (const item of items) {
        entities[selectId(item)] = item;
      }
    },
    addOne(item) {
      const id = selectId(item);
      if (!entities[id]) {
        entities[id] = item;
      }
    },
    updateOne(item) {
      const id = selectId(item);
      if (entities[id]) {
        entities[id] = {
          ...entities[id],
          ...item,
        };
      }
    },
    removeOne(id) {
      delete entities[id];
    },
    setFetched() {
      fetched.value = true;
    },
  };
}
export { createEntityStore };
