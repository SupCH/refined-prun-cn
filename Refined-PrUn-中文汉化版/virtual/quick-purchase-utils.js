import { storagesStore } from './storage.js';
import { userData } from './user-data.js';
import dayjs from './dayjs.min.js';
function getShipStorages() {
  const allStorages = storagesStore.all.value ?? [];
  return allStorages.filter(x => x.type === 'SHIP_STORE' && x.name !== null && x.name !== void 0);
}
function serializeShipStorage(storage) {
  return `${storage.name} (${storage.addressableId})`;
}
function generatePackageName(prefix) {
  const timestamp = dayjs().format('YYYY-MM-DD_HHmm');
  return `${prefix.replace(/\s+/g, '_')}_${timestamp}`;
}
function createQuickPurchasePackage(name, materials, exchange, shipStorage) {
  const materialGroup = {
    type: 'Manual',
    name: 'Materials',
    materials: { ...materials },
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
  const transferAction = {
    type: 'MTRA',
    name: 'Transfer to Ship',
    group: 'Materials',
    origin: `${exchange}.WAREHOUSE`,
    dest: shipStorage.addressableId,
  };
  return {
    global: {
      name,
    },
    groups: [materialGroup],
    actions: [buyAction, transferAction],
  };
}
function addAndNavigateToPackage(pkg) {
  userData.actionPackages.push(pkg);
  return pkg.global.name;
}
export {
  addAndNavigateToPackage,
  createQuickPurchasePackage,
  generatePackageName,
  getShipStorages,
  serializeShipStorage,
};
