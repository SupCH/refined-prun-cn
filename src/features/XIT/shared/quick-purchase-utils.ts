import { storagesStore } from '@src/infrastructure/prun-api/data/storage';
import { warehousesStore } from '@src/infrastructure/prun-api/data/warehouses';
import { serializeStorage } from '@src/features/XIT/ACT/actions/utils';
import { configurableValue } from '@src/features/XIT/ACT/shared-types';
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
  const timestamp = dayjs().format('YYYY-MM-DD HHmm');
  return `${prefix} ${timestamp}`;
}

/**
 * Create a quick purchase action package
 * @param name - Package name
 * @param materials - Record of material ticker to amount needed
 * @param exchange - Exchange code (e.g., 'IC1')
 * @param shipStorage - Target ship storage object (optional)
 * @returns ActionPackageData ready to be added to userData
 */
export function createQuickPurchasePackage(
  name: string,
  materials: Record<string, number>,
  exchange: string,
  shipStorage?: PrunApi.Store,
): UserData.ActionPackageData {
  // Round up all material quantities to integers (you can't buy fractional amounts)
  const roundedMaterials: Record<string, number> = {};
  for (const [ticker, amount] of Object.entries(materials)) {
    roundedMaterials[ticker] = Math.ceil(amount);
  }

  // Create material group
  const materialGroup: UserData.MaterialGroupData = {
    type: 'Manual',
    name: 'Materials',
    materials: roundedMaterials,
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

  const actions: UserData.ActionData[] = [buyAction];

  // Only create transfer action if a valid ship storage is provided
  if (shipStorage) {
    // Use configurableValue for origin - let user select warehouse at execution time
    // This is safer because warehouse data may not be loaded at package creation time
    const transferAction: UserData.ActionData = {
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

/**
 * Create a price fetch action package
 * @param name - Package name
 * @param materials - List of tickers
 * @param exchange - Exchange code
 * @returns ActionPackageData
 */
export function createPriceFetchPackage(
  name: string,
  materials: string[],
  exchange: string,
): UserData.ActionPackageData {
  const fetchAction: UserData.ActionData = {
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

/**
 * Add action package to user data and return its name
 * @param pkg - Action package to add
 * @returns The package name for navigation
 * @returns The package name for navigation
 */
export function addAndNavigateToPackage(pkg: UserData.ActionPackageData): string {
  userData.actionPackages.push(pkg);
  return pkg.global.name;
}
