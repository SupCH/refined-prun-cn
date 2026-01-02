import { sitesStore, getBuildingLastRepair } from './sites.js';
import { sumMapValues } from './utils.js';
import { getEntityNameFromAddress } from './addresses.js';
import { timestampEachMinute } from './dayjs.js';
import { calcBuildingMarketValue, calcBuildingCondition } from './buildings.js';
import { diffDays } from './time-diff.js';
import { sumBy } from './sum-by.js';
import { computed } from './runtime-core.esm-bundler.js';
const buildingsMarketValue = computed(() => {
  const sites = sitesStore.all.value;
  if (!sites) {
    return void 0;
  }
  const buildings2 = [];
  for (const site of sites) {
    const location = getEntityNameFromAddress(site.address);
    const calculatedValues = /* @__PURE__ */ new Map();
    for (const building of site.platforms) {
      const ticker = building.module.reactorTicker;
      let value = calculatedValues.get(ticker);
      if (value === void 0) {
        value = calcBuildingMarketValue(building, site);
        if (value === void 0) {
          return void 0;
        }
        calculatedValues.set(ticker, value);
      }
      buildings2.push({
        location,
        building,
        value,
      });
    }
  }
  return buildings2;
});
const accumulatedDepreciationByBuilding = computed(() => {
  if (!buildingsMarketValue.value) {
    return void 0;
  }
  const now = timestampEachMinute.value;
  const buildings2 = /* @__PURE__ */ new Map();
  for (const building of buildingsMarketValue.value) {
    const lastRepair = getBuildingLastRepair(building.building);
    const age = diffDays(lastRepair, now, true);
    const value = building.value * (1 - calcBuildingCondition(age));
    buildings2.set(building.building.id, value);
  }
  return buildings2;
});
const buildingsNetValueByLocation = computed(() => {
  if (!buildingsMarketValue.value || !accumulatedDepreciationByBuilding.value) {
    return void 0;
  }
  const buildings2 = /* @__PURE__ */ new Map();
  for (const building of buildingsMarketValue.value) {
    const depreciation = accumulatedDepreciationByBuilding.value.get(building.building.id);
    if (depreciation === void 0) {
      return void 0;
    }
    const value = building.value - depreciation;
    buildings2.set(building.location, (buildings2.get(building.location) ?? 0) + value);
  }
  return buildings2;
});
const buildings = {
  marketValue: computed(() => sumBy(buildingsMarketValue.value, x => x.value)),
  infrastructure: computed(() => sumBuildingsMarketValueByType(['CORE', 'STORAGE', 'HABITATION'])),
  resourceExtraction: computed(() => sumBuildingsMarketValueByType(['RESOURCES'])),
  production: computed(() => sumBuildingsMarketValueByType(['PRODUCTION'])),
  accumulatedDepreciation: computed(() => sumMapValues(accumulatedDepreciationByBuilding.value)),
};
function sumBuildingsMarketValueByType(types) {
  if (!buildingsMarketValue.value) {
    return void 0;
  }
  let sum = 0;
  for (const type of types) {
    const buildingsByType = buildingsMarketValue.value.filter(x => x.building.module.type === type);
    for (const entry of buildingsByType) {
      sum += entry.value;
    }
  }
  return sum;
}
export { buildings, buildingsNetValueByLocation };
