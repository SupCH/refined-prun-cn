import { sitesStore } from './sites.js';
import {
  getEntityNameFromAddress,
  isSameAddress,
  getLocationLineFromAddress,
} from './addresses.js';
import { warehousesStore } from './warehouses.js';
import { storagesStore } from './storage.js';
import { shipsStore } from './ships.js';
function serializeStorage(storage) {
  switch (storage.type) {
    case 'STL_FUEL_STORE':
      return storage.name + ' STL Store';
    case 'FTL_FUEL_STORE':
      return storage.name + ' FTL Store';
    case 'SHIP_STORE':
      return storage.name + ' Cargo';
    case 'STORE': {
      const site = sitesStore.getById(storage.addressableId);
      return getEntityNameFromAddress(site?.address) + ' Base';
    }
    case 'WAREHOUSE_STORE': {
      const warehouse = warehousesStore.getById(storage.addressableId);
      return getEntityNameFromAddress(warehouse?.address) + ' Warehouse';
    }
  }
  return 'Error, unable to serialize';
}
function deserializeStorage(serializedName) {
  if (!serializedName) {
    return void 0;
  }
  let name;
  name = extractName(serializedName, 'Base');
  if (name) {
    const site = sitesStore.getByPlanetNaturalIdOrName(name);
    return storagesStore.getByAddressableId(site?.siteId)?.find(x => x.type === 'STORE');
  }
  name = extractName(serializedName, 'Warehouse');
  if (name) {
    const warehouse = warehousesStore.getByEntityNaturalIdOrName(name);
    return storagesStore
      .getByAddressableId(warehouse?.warehouseId)
      ?.find(x => x.type === 'WAREHOUSE_STORE');
  }
  name = extractName(serializedName, 'Cargo');
  if (name) {
    return storagesStore.getByName(name)?.find(x => x.type === 'SHIP_STORE');
  }
  name = extractName(serializedName, 'FTL Store');
  if (name) {
    return storagesStore.getByName(name)?.find(x => x.type === 'FTL_FUEL_STORE');
  }
  name = extractName(serializedName, 'STL Store');
  if (name) {
    return storagesStore.getByName(name)?.find(x => x.type === 'STL_FUEL_STORE');
  }
  return void 0;
}
function extractName(name, suffix) {
  return name.endsWith(suffix) ? name.replace(' ' + suffix, '') : void 0;
}
function storageSort(a, b) {
  const storagePriorityMap = {
    FTL_FUEL_STORE: 5,
    STL_FUEL_STORE: 4,
    SHIP_STORE: 3,
    STORE: 1,
    WAREHOUSE_STORE: 2,
  };
  const priorityA = isCXWarehouse(a) ? 0 : (storagePriorityMap[a.type] ?? 6);
  const priorityB = isCXWarehouse(b) ? 0 : (storagePriorityMap[b.type] ?? 6);
  if (priorityA !== priorityB) {
    return priorityA - priorityB;
  }
  return serializeStorage(a).localeCompare(serializeStorage(b));
}
function isCXWarehouse(storage) {
  if (storage.type !== 'WAREHOUSE_STORE') {
    return false;
  }
  const warehouse = warehousesStore.getById(storage.addressableId);
  const location = getLocationLineFromAddress(warehouse?.address);
  return location?.type === 'STATION';
}
function atSameLocation(storageA, storageB) {
  if (storageA === storageB) {
    return false;
  }
  const addressA = getStoreAddress(storageA);
  const addressB = getStoreAddress(storageB);
  return isSameAddress(addressA, addressB);
}
function getStoreAddress(store) {
  switch (store.type) {
    case 'STORE': {
      const site = sitesStore.getById(store.addressableId);
      return site?.address;
    }
    case 'WAREHOUSE_STORE': {
      const warehouse = warehousesStore.getById(store.addressableId);
      return warehouse?.address;
    }
    case 'SHIP_STORE':
    case 'STL_FUEL_STORE':
    case 'FTL_FUEL_STORE': {
      const ship = shipsStore.getById(store.addressableId);
      return ship?.address;
    }
    default:
      return void 0;
  }
}
export { atSameLocation, deserializeStorage, isCXWarehouse, serializeStorage, storageSort };
