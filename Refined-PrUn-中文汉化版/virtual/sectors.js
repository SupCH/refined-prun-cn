import { onApiMessage } from './api-messages.js';
import { createEntityStore } from './create-entity-store.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  WORLD_SECTORS(data) {
    store.setAll(data.sectors);
    store.setFetched();
  },
});
const sectorsStore = {
  ...state,
};
export { sectorsStore };
