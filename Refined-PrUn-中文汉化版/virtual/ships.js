import { onApiMessage } from './api-messages.js';
import { createEntityStore } from './create-entity-store.js';
import { createMapGetter } from './create-map-getter.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  SHIP_SHIPS(data) {
    store.setAll(data.ships);
    store.setFetched();
  },
  SHIP_DATA(data) {
    store.setOne(data);
  },
});
const getByRegistration = createMapGetter(state.all, x => x.registration);
const getByName = createMapGetter(state.all, x => x.name);
const getShipLastRepair = ship =>
  ship.lastRepair ? ship.lastRepair.timestamp : ship.commissioningTime.timestamp;
const shipsStore = {
  ...state,
  getByRegistration,
  getByName,
};
export { getShipLastRepair, shipsStore };
