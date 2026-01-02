import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
const store = createEntityStore();
const state = store.state;
onApiMessage({
  SHIP_FLIGHT_FLIGHTS(data) {
    store.setAll(data.flights);
    store.setFetched();
  },
  SHIP_FLIGHT_FLIGHT(data) {
    store.setOne(data);
  },
  SHIP_FLIGHT_FLIGHT_ENDED(data) {
    store.removeOne(data.id);
  },
});
const flightsStore = {
  ...state,
};
export { flightsStore };
