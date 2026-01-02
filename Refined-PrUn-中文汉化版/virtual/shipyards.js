import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { request } from './request-hooks2.js';
import { castArray } from './cast-array.js';
import { isEmpty } from './is-empty.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  DATA_DATA(data) {
    if (isEmpty(data.path) || data.path[0] !== 'shipyards') {
      return;
    }
    store.setMany(castArray(data.body));
    store.setFetched();
  },
});
const getById = id => {
  const result = state.getById(id);
  if (!result) {
    request.shipyards();
  }
  return result;
};
const shipyardsStore = {
  ...state,
  getById,
};
export { shipyardsStore };
