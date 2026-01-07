import { storagesStore } from './storage.js';
import { sumMapValues, getStoreLocationName } from './utils.js';
import { shipyardProjectsStore } from './shipyard-projects.js';
import { shipyardsStore } from './shipyards.js';
import { getEntityNameFromAddress, getEntityNaturalIdFromAddress } from './addresses.js';
import { calcMaterialAmountPrice, sumMaterialAmountPrice } from './cx.js';
import { cxosStore } from './cxos.js';
import { warehousesStore } from './warehouses.js';
import { sumBy } from './sum-by.js';
import { sum } from './sum.js';
import {
  sumShipmentDeliveries,
  sumMaterialsPickup,
  sumDeliveries,
  partnerCurrentConditions,
  selfCurrentConditions,
} from './contract-conditions.js';
import { sitesStore } from './sites.js';
import { getPlanetBurn } from './burn2.js';
import { mergeMaterialAmounts } from './sort-materials.js';
import { workInProgress } from './orders2.js';
import { userData } from './user-data.js';
import { isPresent } from './is-present.js';
import { computed } from './runtime-core.esm-bundler.js';
function sumValue(materials) {
  return sumBy(materials, x => x.value);
}
function isPlanetAddress(address) {
  return address?.lines[1]?.type === 'PLANET';
}
function isStationAddress(address) {
  return address?.lines[1]?.type === 'STATION';
}
const inventoryMarketValue = computed(() => {
  const storages = storagesStore.all.value;
  if (!storages) {
    return void 0;
  }
  const inventories = /* @__PURE__ */ new Map();
  for (const storage of storages) {
    const materials = [];
    for (const item of storage.items) {
      if (!item.quantity) {
        continue;
      }
      const value = calcMaterialAmountPrice(item.quantity);
      if (value === void 0) {
        return void 0;
      }
      materials.push({
        material: item.quantity.material,
        amount: item.quantity.amount,
        value,
      });
    }
    inventories.set(storage.id, materials);
  }
  return inventories;
});
function sumStoresValue(stores) {
  const marketValue = inventoryMarketValue.value;
  if (!marketValue || !stores) {
    return void 0;
  }
  let total = 0;
  for (const store of stores) {
    const value = sumValue(marketValue.get(store.id));
    if (value === void 0) {
      return void 0;
    }
    total += value;
  }
  return total;
}
const shipyardInventoryByLocation = computed(() => {
  const projects = shipyardProjectsStore.all.value;
  if (!projects) {
    return void 0;
  }
  const inventories = /* @__PURE__ */ new Map();
  for (const project of projects.filter(x => x.status === 'CREATED')) {
    const value = sumMaterialAmountPrice(project.inventory.items);
    if (value === void 0) {
      return void 0;
    }
    const shipyard = shipyardsStore.getById(project.shipyardId);
    if (!shipyard) {
      continue;
    }
    const name = getEntityNameFromAddress(shipyard.address);
    inventories.set(name, (inventories.get(name) ?? 0) + value);
  }
  return inventories;
});
const shipyardInventory = computed(() => sumMapValues(shipyardInventoryByLocation.value));
const byLocation = computed(() => {
  const marketValue = inventoryMarketValue.value;
  const storages = storagesStore.all.value;
  const shipyards = shipyardInventoryByLocation.value;
  if (!marketValue || !storages || !shipyards) {
    return void 0;
  }
  const inventories = /* @__PURE__ */ new Map();
  for (const store of storages) {
    const totalValue = sumValue(marketValue.get(store.id));
    if (totalValue === void 0) {
      return void 0;
    }
    const name = getStoreLocationName(store);
    inventories.set(name, (inventories.get(name) ?? 0) + totalValue);
  }
  for (const location of shipyards.keys()) {
    const value = shipyards.get(location);
    inventories.set(location, (inventories.get(location) ?? 0) + value);
  }
  return inventories;
});
const cxListedMaterials = computed(() => {
  const sellOrders = cxosStore.all.value?.filter(
    x => x.type === 'SELLING' && x.status !== 'FILLED',
  );
  return sumMaterialAmountPrice(sellOrders);
});
const cxStores = computed(() => storagesStore.all.value?.filter(isCXStore));
function isCXStore(store) {
  if (store.type !== 'WAREHOUSE_STORE') {
    return false;
  }
  const warehouse = warehousesStore.getById(store.addressableId);
  return isStationAddress(warehouse?.address);
}
const mmMaterials = computed(() => new Set(userData.settings.financial.mmMaterials.split(',')));
const cxInventory = computed(() => {
  if (!cxStores.value) {
    return void 0;
  }
  const mmMaterialsTotal2 = /* @__PURE__ */ new Map();
  let otherMaterialsTotal = 0;
  for (const store of cxStores.value) {
    const marketValue = inventoryMarketValue.value?.get(store.id);
    if (!marketValue) {
      return void 0;
    }
    let mmTotal = 0;
    for (const materialValue of marketValue) {
      if (mmMaterials.value.has(materialValue.material.ticker)) {
        mmTotal += materialValue.value;
      } else {
        otherMaterialsTotal += materialValue.value;
      }
    }
    const warehouse = warehousesStore.getById(store.addressableId);
    const naturalId = getEntityNaturalIdFromAddress(warehouse?.address);
    const currencies = {
      ANT: 'AIC',
      BEN: 'CIS',
      MOR: 'NCC',
      HRT: 'ICA',
      HUB: 'NCC',
      ARC: 'CIS',
    };
    const currency = currencies[naturalId];
    mmMaterialsTotal2.set(currency, (mmMaterialsTotal2.get(currency) ?? 0) + mmTotal);
  }
  return {
    mmMaterialsTotal: mmMaterialsTotal2,
    otherMaterialsTotal,
  };
});
const mmMaterialsTotal = computed(() => sumMapValues(cxInventory.value?.mmMaterialsTotal));
const cxInventoryTotal = computed(() => cxInventory.value?.otherMaterialsTotal);
const baseInventory = computed(() => {
  const marketValue = inventoryMarketValue.value;
  const sites = sitesStore.all.value;
  if (!marketValue || !sites) {
    return void 0;
  }
  let finishedGoods2 = 0;
  let rawMaterials2 = 0;
  let workforceConsumables2 = 0;
  let otherItems2 = 0;
  sites.map(getPlanetBurn);
  for (const site of sites) {
    let stores = storagesStore.getByAddressableId(site.siteId);
    const burn = getPlanetBurn(site);
    if (!stores || !burn) {
      return void 0;
    }
    const naturalId = getEntityNaturalIdFromAddress(site.address);
    const warehouse = warehousesStore.getByEntityNaturalId(naturalId);
    const warehouseStore = storagesStore.getById(warehouse?.storeId);
    if (warehouseStore) {
      stores = stores.slice();
      stores.push(warehouseStore);
    }
    const amounts = mergeMaterialAmounts(
      stores.flatMap(x => x.items.map(y => y.quantity).filter(isPresent)),
    );
    for (const amount of amounts) {
      const value = calcMaterialAmountPrice(amount);
      if (value === void 0) {
        return void 0;
      }
      const burnEntry = burn.burn[amount.material.ticker];
      switch (burnEntry?.type) {
        case 'input':
          rawMaterials2 += value;
          break;
        case 'output':
          finishedGoods2 += value;
          break;
        case 'workforce':
          workforceConsumables2 += value;
          break;
        default:
          otherItems2 += value;
          break;
      }
    }
  }
  return {
    finishedGoods: finishedGoods2,
    rawMaterials: rawMaterials2,
    workforceConsumables: workforceConsumables2,
    otherItems: otherItems2,
  };
});
const finishedGoods = computed(() => baseInventory.value?.finishedGoods);
const rawMaterials = computed(() => baseInventory.value?.rawMaterials);
const workforceConsumables = computed(() => baseInventory.value?.workforceConsumables);
const siteNaturalIds = computed(() => {
  const sites = sitesStore.all.value;
  if (!sites) {
    return void 0;
  }
  const naturalIds = /* @__PURE__ */ new Set();
  for (const site of sites) {
    const naturalId = getEntityNaturalIdFromAddress(site.address);
    if (naturalId !== void 0) {
      naturalIds.add(naturalId);
    }
  }
  return naturalIds;
});
const unboundWarehouseStores = computed(() => {
  const naturalIds = siteNaturalIds.value;
  const stores = storagesStore.all.value;
  if (!naturalIds || !stores) {
    return void 0;
  }
  return stores.filter(x => isUnboundWarehouseStore(x, naturalIds));
});
function isUnboundWarehouseStore(store, siteNaturalIds2) {
  if (store.type !== 'WAREHOUSE_STORE') {
    return false;
  }
  const warehouse = warehousesStore.getById(store.addressableId);
  if (!warehouse) {
    return true;
  }
  const address = warehouse.address;
  if (isStationAddress(address)) {
    return false;
  }
  if (!isPlanetAddress(address)) {
    return true;
  }
  const naturalId = getEntityNaturalIdFromAddress(address);
  return naturalId === void 0 || !siteNaturalIds2.has(naturalId);
}
const unboundInventory = computed(() => sumStoresValue(unboundWarehouseStores.value));
const otherItems = computed(() =>
  sum(baseInventory.value?.otherItems, shipyardInventory.value, unboundInventory.value),
);
const fuelStores = computed(() => storagesStore.all.value?.filter(isFuelStore));
function isFuelStore(store) {
  return store.type === 'STL_FUEL_STORE' || store.type === 'FTL_FUEL_STORE';
}
const fuelTanks = computed(() => sumStoresValue(fuelStores.value));
const shipStores = computed(() => storagesStore.all.value?.filter(isShipStore));
function isShipStore(store) {
  return store.type === 'SHIP_STORE';
}
const shipInventory = computed(() => sumStoresValue(shipStores.value));
const materialsInTransit = computed(() =>
  sum(shipInventory.value, sumShipmentDeliveries(partnerCurrentConditions)),
);
const materialsReceivable = computed(() =>
  sum(sumDeliveries(partnerCurrentConditions), sumMaterialsPickup(selfCurrentConditions)),
);
const inventory = {
  byLocation,
  cxListedMaterials,
  cxInventory,
  mmMaterialsTotal,
  cxInventoryTotal,
  materialsInTransit,
  finishedGoods,
  workInProgress,
  rawMaterials,
  workforceConsumables,
  otherItems,
  fuelTanks,
  materialsReceivable,
};
export { inventory };
