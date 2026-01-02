import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  DATA_DATA(data) {
    if (data.path[0] !== 'users') {
      return;
    }
    store.setOne(data.body);
    store.setFetched();
  },
});
const getByUsername = createMapGetter(state.all, x => x.username);
const usersStore = {
  ...state,
  getByUsername,
};
export { usersStore };
