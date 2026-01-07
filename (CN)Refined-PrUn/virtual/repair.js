import './config.js';
import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue5.js';
import _sfc_main from './Configure.vue3.js';
import { sitesStore, getBuildingLastRepair } from './sites.js';
import { isRepairableBuilding } from './buildings.js';
import { configurableValue } from './shared-types.js';
act.addMaterialGroup({
  type: 'Repair',
  description: data => {
    if (!data.planet) {
      return '--';
    }
    const days = data.days;
    const daysPart = days !== void 0 ? `older than ${days} day${days == 1 ? '' : 's'}` : '';
    const advanceDays = data.advanceDays ?? 0;
    return `Repair buildings on ${data.planet} ${daysPart} in ${advanceDays} day${advanceDays == 1 ? '' : 's'}`;
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => data.planet === configurableValue,
  isValidConfig: (data, config) => data.planet !== configurableValue || config.planet !== void 0,
  generateMaterialBill: async ({ data, config, log }) => {
    if (!data.planet) {
      log.error('Resupply planet is not configured');
      return void 0;
    }
    const planet = data.planet === configurableValue ? config.planet : data.planet;
    const site = sitesStore.getByPlanetNaturalIdOrName(planet);
    if (!site?.platforms) {
      log.error('Missing data on repair planet');
      return void 0;
    }
    const days = typeof data.days === 'number' ? data.days : parseFloat(data.days);
    let advanceDays =
      typeof data.advanceDays === 'number' ? data.advanceDays : parseFloat(data.advanceDays);
    const threshold = isNaN(days) ? 0 : days;
    advanceDays = isNaN(advanceDays) ? 0 : advanceDays;
    const parsedGroup = {};
    for (const building of site.platforms) {
      if (!isRepairableBuilding(building)) {
        continue;
      }
      const lastRepair = getBuildingLastRepair(building);
      const date = (/* @__PURE__ */ new Date().getTime() - lastRepair) / 864e5;
      if (date + advanceDays < threshold) {
        continue;
      }
      const buildingMaterials = {};
      for (const mat of building.reclaimableMaterials) {
        const amount = mat.amount;
        const ticker = mat.material.ticker;
        if (buildingMaterials[ticker]) {
          buildingMaterials[ticker] += amount;
        } else {
          buildingMaterials[ticker] = amount;
        }
      }
      for (const mat of building.repairMaterials) {
        const amount = mat.amount;
        const ticker = mat.material.ticker;
        if (buildingMaterials[ticker]) {
          buildingMaterials[ticker] += amount;
        } else {
          buildingMaterials[ticker] = amount;
        }
      }
      const adjustedDate = date + advanceDays;
      for (const ticker of Object.keys(buildingMaterials)) {
        const amount =
          adjustedDate > 180
            ? buildingMaterials[ticker]
            : // This isn't quite right, but will be off by only 1 MCG at most
              Math.ceil((buildingMaterials[ticker] * adjustedDate) / 180);
        if (parsedGroup[ticker]) {
          parsedGroup[ticker] += amount;
        } else {
          parsedGroup[ticker] = amount;
        }
      }
    }
    return parsedGroup;
  },
});
