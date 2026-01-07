import { createEntityStore } from './create-entity-store.js';
import { onApiMessage } from './api-messages.js';
const store = createEntityStore(x => x.missionId);
const state = store.state;
onApiMessage({
  SHIP_FLIGHT_MISSION(data) {
    store.setOne(data);
    store.setFetched();
  },
});
const flightPlansStore = {
  ...state,
};
export { flightPlansStore };
