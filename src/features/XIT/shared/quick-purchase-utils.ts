import { storagesStore } from '@src/infrastructure/prun-api/data/storage';
import { userData } from '@src/store/user-data';
import dayjs from 'dayjs';

/**
 * Get all ship storages available for material transfer
 */
export function getShipStorages() {
  const allStorages = storagesStore.all.value ?? [];
  return allStorages.filter(
    x => x.type === 'SHIP_STORE' && x.name !== null && x.name !== undefined,
  );
}

/**
 * Serialize storage for display in dropdown
 */
export function serializeShipStorage(storage: PrunApi.Store): string {
  return `${storage.name} (${storage.addressableId})`;
}

/**
 * Create a unique action package name with timestamp
 * Package names use underscores instead of spaces to avoid command parsing issues
 */
export function generatePackageName(prefix: string): string {
  const timestamp = dayjs().format('YYYY-MM-DD_HHmm');
  return `${prefix.replace(/\s+/g, '_')}_${timestamp}`;
}

/**
 * Create a quick purchase action package
 * @param name - Package name
 * @param materials - Record of material ticker to amount needed
 * @param exchange - Exchange code (e.g., 'IC1')
 * @param shipStorage - Target ship storage object
 * @returns ActionPackageData ready to be added to userData
 */
export function createQuickPurchasePackage(
  name: string,
  materials: Record<string, number>,
  exchange: string,
  shipStorage: PrunApi.Store,
): UserData.ActionPackageData {
  // Create material group
  const materialGroup: UserData.MaterialGroupData = {
    type: 'Manual',
    name: 'Materials',
    materials: { ...materials },
  };

  // Create CX Buy action
  const buyAction: UserData.ActionData = {
    type: 'CX Buy',
    name: 'Buy Materials',
    group: 'Materials',
    exchange,
    useCXInv: true,
    buyPartial: false,
    allowUnfilled: false,
  };

  // Create MTRA (transfer) action from CX warehouse to ship
  const transferAction: UserData.ActionData = {
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

/**
 * Add action package to user data and return its name
 * @param pkg - Action package to add
 * @returns The package name for navigation
 */
export function addAndNavigateToPackage(pkg: UserData.ActionPackageData): string {
  userData.actionPackages.push(pkg);
  return pkg.global.name;
}
