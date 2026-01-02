import { storagesStore } from './storage.js';
import { serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import { userData } from './user-data.js';
import './dayjs.min.js';
function getShipStorages() {
  const allStorages = storagesStore.all.value ?? [];
  return allStorages.filter(x => x.type === 'SHIP_STORE' && x.name !== null && x.name !== void 0);
}
function serializeShipStorage(storage) {
  return `${storage.name} (${storage.addressableId})`;
}
function createQuickPurchasePackage(name, materials, exchange, shipStorage) {
  const roundedMaterials = {};
  for (const [ticker, amount] of Object.entries(materials)) {
    roundedMaterials[ticker] = Math.ceil(amount);
  }
  const materialGroup = {
    type: 'Manual',
    name: 'Materials',
    materials: roundedMaterials,
  };
  const buyAction = {
    type: 'CX Buy',
    name: 'Buy Materials',
    group: 'Materials',
    exchange,
    useCXInv: true,
    buyPartial: false,
    allowUnfilled: false,
  };
  const actions = [buyAction];
  if (shipStorage) {
    const transferAction = {
      type: 'MTRA',
      name: 'Transfer to Ship',
      group: 'Materials',
      origin: configurableValue,
      dest: serializeStorage(shipStorage),
    };
    actions.push(transferAction);
  }
  return {
    global: {
      name,
    },
    groups: [materialGroup],
    actions,
  };
}
function createPriceFetchPackage(name, materials, exchange) {
  const fetchAction = {
    type: 'CX Fetch',
    name: 'Fetch Prices',
    exchange,
    tickers: materials,
  };
  return {
    global: {
      name,
    },
    groups: [],
    actions: [fetchAction],
  };
}
function addAndNavigateToPackage(pkg) {
  userData.actionPackages.push(pkg);
  return pkg.global.name;
}
export {
  addAndNavigateToPackage,
  createPriceFetchPackage,
  createQuickPurchasePackage,
  getShipStorages,
  serializeShipStorage,
};
