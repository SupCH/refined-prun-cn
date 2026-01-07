import { storagesStore } from './storage.js';
import { sitesStore } from './sites.js';
import { warehousesStore } from './warehouses.js';
import { shipsStore } from './ships.js';
function getInvStore(invParameter) {
  if (!invParameter) {
    return void 0;
  }
  invParameter = invParameter.toLowerCase().trim();
  const stores = storagesStore.all.value ?? [];
  let store = stores.find(x => x.id.startsWith(invParameter));
  if (!store) {
    const site = sitesStore.getByPlanetNaturalId(invParameter);
    store = stores.find(x => x.addressableId === site?.siteId);
  }
  if (!store) {
    const warehouse = warehousesStore.getByEntityNaturalId(invParameter);
    store = stores.find(x => x.id === warehouse?.storeId);
  }
  if (!store) {
    const ship = shipsStore.getByRegistration(invParameter);
    store = stores.find(x => x.id === ship?.idShipStore);
  }
  return store;
}
export { getInvStore };
