import { materialCategoriesStore } from './material-categories.js';
import { watch } from './runtime-core.esm-bundler.js';
function sortMaterials(materials) {
  return sortByMaterial(materials, x => x);
}
function sortMaterialAmounts(materials) {
  return sortByMaterial(materials, x => x.material);
}
function sortByMaterial(items, selector) {
  return items.slice().sort((a, b) => compareMaterials(selector(a), selector(b)));
}
const categoryNameMap = /* @__PURE__ */ new Map();
const categorySortOrder = /* @__PURE__ */ new Map();
watch(materialCategoriesStore.all, categories => {
  categoryNameMap.clear();
  categorySortOrder.clear();
  if (!categories) {
    return;
  }
  categories = categories.slice().sort((a, b) => a.name.localeCompare(b.name));
  for (let i = 0; i < categories.length; i++) {
    const category = categories[i];
    categorySortOrder.set(category.id, i);
    categoryNameMap.set(category.id, category.name);
  }
});
function compareMaterials(materialA, materialB) {
  if (materialA === materialB) {
    return 0;
  }
  if (!materialA) {
    return 1;
  }
  if (!materialB) {
    return -1;
  }
  const categoryAPosition = categorySortOrder.get(materialA.category);
  const categoryBPosition = categorySortOrder.get(materialB.category);
  if (categoryAPosition !== categoryBPosition) {
    return (
      (categoryAPosition ?? Number.POSITIVE_INFINITY) -
      (categoryBPosition ?? Number.POSITIVE_INFINITY)
    );
  }
  const categoryAName = categoryNameMap.get(materialA.category) ?? '';
  const intraCategoryOrder = sortOrder[categoryAName];
  if (intraCategoryOrder) {
    const indexA = intraCategoryOrder.get(materialA.ticker);
    const indexB = intraCategoryOrder.get(materialB.ticker);
    if (indexA !== void 0 && indexB === void 0) {
      return -1;
    }
    if (indexA === void 0 && indexB !== void 0) {
      return 1;
    }
    return indexA - indexB;
  }
  return materialA.ticker.localeCompare(materialB.ticker);
}
const sortOrder = {
  'consumables (luxury)': makeSortOrderMap([
    'COF',
    'PWO',
    'KOM',
    'REP',
    'ALE',
    'SC',
    'GIN',
    'VG',
    'WIN',
    'NST',
  ]),
  'consumables (basic)': makeSortOrderMap([
    'DW',
    'RAT',
    'OVE',
    'EXO',
    'PT',
    'MED',
    'HMS',
    'SCN',
    'FIM',
    'HSS',
    'PDA',
    'MEA',
    'LC',
    'WS',
  ]),
  'consumable bundles': makeSortOrderMap(['PBU', 'SBU', 'TBU', 'EBU', 'CBU']),
  'construction prefabs': makeSortOrderMap([
    'BBH',
    'BDE',
    'BSE',
    'BTA',
    'LBH',
    'LDE',
    'LSE',
    'LTA',
    'RBH',
    'RDE',
    'RSE',
    'RTA',
    'ABH',
    'ADE',
    'ASE',
    'ATA',
    'HSE',
  ]),
  drones: makeSortOrderMap(['DRF', 'DCH']),
  fuels: makeSortOrderMap(['SF', 'FF']),
  'ship kits': makeSortOrderMap([
    'TCB',
    'VSC',
    'SCB',
    'MCB',
    'LCB',
    'WCB',
    'VCB',
    'HCB',
    'SSL',
    'MSL',
    'LSL',
    'SFL',
    'MFL',
    'LFL',
  ]),
};
function makeSortOrderMap(materials) {
  const map = /* @__PURE__ */ new Map();
  for (let i = 0; i < materials.length; i++) {
    map.set(materials[i], i);
  }
  return map;
}
function mergeMaterialAmounts(amounts) {
  const result = [];
  const added = /* @__PURE__ */ new Map();
  for (const amount of amounts) {
    const existing = added.get(amount.material.ticker);
    if (existing) {
      existing.amount += amount.amount;
    } else {
      const copy = { ...amount };
      result.push(copy);
      added.set(amount.material.ticker, copy);
    }
  }
  return result;
}
export {
  compareMaterials,
  mergeMaterialAmounts,
  sortByMaterial,
  sortMaterialAmounts,
  sortMaterials,
};
