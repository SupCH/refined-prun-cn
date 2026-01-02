import { startRelay } from './relay.js';
import { listenPrunApi } from './prun-api-listener.js';
import { preloadFioResponses, loadFallbackPlanetData } from './fio-api.js';
import { watchUntil } from './watch.js';
import { companyStore } from './company.js';
import { alertsStore } from './alerts.js';
import { materialsStore } from './materials.js';
import { uiDataStore } from './ui-data.js';
import { balancesStore } from './balances.js';
import { flightsStore } from './flights.js';
import { shipsStore } from './ships.js';
import { starsStore } from './stars.js';
import { sitesStore } from './sites.js';
import { storagesStore } from './storage.js';
import { warehousesStore } from './warehouses.js';
import { contractsStore } from './contracts.js';
import { fetchPrices } from './cx.js';
async function initializeApi() {
  startRelay();
  void fetchPrices();
  preloadFioResponses();
  listenPrunApi();
  const startupStores = [
    alertsStore,
    balancesStore,
    contractsStore,
    flightsStore,
    materialsStore,
    shipsStore,
    sitesStore,
    starsStore,
    storagesStore,
    warehousesStore,
  ];
  await watchUntil(
    () =>
      uiDataStore.screens !== void 0 &&
      companyStore.value !== void 0 &&
      startupStores.every(x => x.fetched.value),
  );
  await loadFallbackPlanetData();
}
export { initializeApi };
