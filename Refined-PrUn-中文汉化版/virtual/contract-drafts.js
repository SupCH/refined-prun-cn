import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  CONTRACT_DRAFTS_DRAFTS(data) {
    store.setAll(data.drafts);
    store.setFetched();
  },
  CONTRACT_DRAFTS_DRAFT(data) {
    store.setOne(data);
  },
});
const getByNaturalId = createMapGetter(state.all, x => x.naturalId);
const contractDraftsStore = {
  ...state,
  getByNaturalId,
};
export { contractDraftsStore };
