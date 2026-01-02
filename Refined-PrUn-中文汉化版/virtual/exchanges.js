import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
import { createMapGetter } from './create-map-getter.js';
import { castArray } from './cast-array.js';
import { defaultExchanges } from './exchanges.default.js';
import { getEntityNaturalIdFromAddress } from './addresses.js';
import { isEmpty } from './is-empty.js';
const store = createEntityStore(x => x.id, { preserveOnConnectionOpen: true });
const state = store.state;
onApiMessage({
  CLIENT_CONNECTION_OPENED() {
    store.setAll(defaultExchanges);
    store.setFetched();
  },
  DATA_DATA(data) {
    if (isEmpty(data.path) || data.path[0] !== 'commodityexchanges') {
      return;
    }
    store.setMany(castArray(data.body));
  },
});
const getByNaturalId = createMapGetter(state.all, x => getEntityNaturalIdFromAddress(x.address));
const getByCode = createMapGetter(state.all, x => x.code);
const getByName = createMapGetter(state.all, x => x.name);
const getNaturalIdFromCode = code => getEntityNaturalIdFromAddress(getByCode(code)?.address);
const exchangesStore = {
  ...state,
  getByNaturalId,
  getByCode,
  getByName,
  getNaturalIdFromCode,
};
export { exchangesStore };
