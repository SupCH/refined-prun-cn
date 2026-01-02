import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import { warehousesStore } from './warehouses.js';
function sumMapValues(map) {
  if (map === void 0) {
    return void 0;
  }
  let sum = 0;
  for (const value of map.values()) {
    sum += value;
  }
  return sum;
}
function getStoreLocationName(store) {
  let name = void 0;
  switch (store.type) {
    case 'STORE': {
      const site = sitesStore.getById(store.addressableId);
      name = getEntityNameFromAddress(site?.address);
      break;
    }
    case 'WAREHOUSE_STORE': {
      const warehouse = warehousesStore.getById(store.addressableId);
      name = getEntityNameFromAddress(warehouse?.address);
      break;
    }
  }
  return name ?? store.name;
}
export { getStoreLocationName, sumMapValues };
