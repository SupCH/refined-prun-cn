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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpbGRpbmdzMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYmFsYW5jZS9idWlsZGluZ3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0QnVpbGRpbmdMYXN0UmVwYWlyLCBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IHN1bU1hcFZhbHVlcyB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL3V0aWxzJztcbmltcG9ydCB7IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuaW1wb3J0IHsgdGltZXN0YW1wRWFjaE1pbnV0ZSB9IGZyb20gJ0BzcmMvdXRpbHMvZGF5anMnO1xuaW1wb3J0IHsgY2FsY0J1aWxkaW5nQ29uZGl0aW9uLCBjYWxjQnVpbGRpbmdNYXJrZXRWYWx1ZSB9IGZyb20gJ0BzcmMvY29yZS9idWlsZGluZ3MnO1xuaW1wb3J0IHsgZGlmZkRheXMgfSBmcm9tICdAc3JjL3V0aWxzL3RpbWUtZGlmZic7XG5pbXBvcnQgeyBzdW1CeSB9IGZyb20gJ0BzcmMvdXRpbHMvc3VtLWJ5JztcblxuaW50ZXJmYWNlIEVudHJ5IHtcbiAgbG9jYXRpb246IHN0cmluZztcbiAgYnVpbGRpbmc6IFBydW5BcGkuUGxhdGZvcm07XG4gIHZhbHVlOiBudW1iZXI7XG59XG5cbmNvbnN0IGJ1aWxkaW5nc01hcmtldFZhbHVlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBzaXRlcyA9IHNpdGVzU3RvcmUuYWxsLnZhbHVlO1xuICBpZiAoIXNpdGVzKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBidWlsZGluZ3M6IEVudHJ5W10gPSBbXTtcbiAgZm9yIChjb25zdCBzaXRlIG9mIHNpdGVzKSB7XG4gICAgY29uc3QgbG9jYXRpb24gPSBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3Moc2l0ZS5hZGRyZXNzKSE7XG4gICAgY29uc3QgY2FsY3VsYXRlZFZhbHVlcyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgZm9yIChjb25zdCBidWlsZGluZyBvZiBzaXRlLnBsYXRmb3Jtcykge1xuICAgICAgY29uc3QgdGlja2VyID0gYnVpbGRpbmcubW9kdWxlLnJlYWN0b3JUaWNrZXI7XG4gICAgICBsZXQgdmFsdWUgPSBjYWxjdWxhdGVkVmFsdWVzLmdldCh0aWNrZXIpO1xuICAgICAgaWYgKHZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgdmFsdWUgPSBjYWxjQnVpbGRpbmdNYXJrZXRWYWx1ZShidWlsZGluZywgc2l0ZSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuICAgICAgICBjYWxjdWxhdGVkVmFsdWVzLnNldCh0aWNrZXIsIHZhbHVlKTtcbiAgICAgIH1cbiAgICAgIGJ1aWxkaW5ncy5wdXNoKHtcbiAgICAgICAgbG9jYXRpb24sXG4gICAgICAgIGJ1aWxkaW5nLFxuICAgICAgICB2YWx1ZSxcbiAgICAgIH0pO1xuICAgIH1cbiAgfVxuICByZXR1cm4gYnVpbGRpbmdzO1xufSk7XG5cbmNvbnN0IGFjY3VtdWxhdGVkRGVwcmVjaWF0aW9uQnlCdWlsZGluZyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFidWlsZGluZ3NNYXJrZXRWYWx1ZS52YWx1ZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBub3cgPSB0aW1lc3RhbXBFYWNoTWludXRlLnZhbHVlO1xuICBjb25zdCBidWlsZGluZ3MgPSBuZXcgTWFwPHN0cmluZywgbnVtYmVyPigpO1xuICBmb3IgKGNvbnN0IGJ1aWxkaW5nIG9mIGJ1aWxkaW5nc01hcmtldFZhbHVlLnZhbHVlKSB7XG4gICAgY29uc3QgbGFzdFJlcGFpciA9IGdldEJ1aWxkaW5nTGFzdFJlcGFpcihidWlsZGluZy5idWlsZGluZyk7XG4gICAgY29uc3QgYWdlID0gZGlmZkRheXMobGFzdFJlcGFpciwgbm93LCB0cnVlKTtcbiAgICBjb25zdCB2YWx1ZSA9IGJ1aWxkaW5nLnZhbHVlICogKDEgLSBjYWxjQnVpbGRpbmdDb25kaXRpb24oYWdlKSk7XG4gICAgYnVpbGRpbmdzLnNldChidWlsZGluZy5idWlsZGluZy5pZCwgdmFsdWUpO1xuICB9XG4gIHJldHVybiBidWlsZGluZ3M7XG59KTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkaW5nc05ldFZhbHVlQnlMb2NhdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFidWlsZGluZ3NNYXJrZXRWYWx1ZS52YWx1ZSB8fCAhYWNjdW11bGF0ZWREZXByZWNpYXRpb25CeUJ1aWxkaW5nLnZhbHVlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGJ1aWxkaW5ncyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIGZvciAoY29uc3QgYnVpbGRpbmcgb2YgYnVpbGRpbmdzTWFya2V0VmFsdWUudmFsdWUpIHtcbiAgICBjb25zdCBkZXByZWNpYXRpb24gPSBhY2N1bXVsYXRlZERlcHJlY2lhdGlvbkJ5QnVpbGRpbmcudmFsdWUuZ2V0KGJ1aWxkaW5nLmJ1aWxkaW5nLmlkKTtcbiAgICBpZiAoZGVwcmVjaWF0aW9uID09PSB1bmRlZmluZWQpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IHZhbHVlID0gYnVpbGRpbmcudmFsdWUgLSBkZXByZWNpYXRpb247XG4gICAgYnVpbGRpbmdzLnNldChidWlsZGluZy5sb2NhdGlvbiwgKGJ1aWxkaW5ncy5nZXQoYnVpbGRpbmcubG9jYXRpb24pID8/IDApICsgdmFsdWUpO1xuICB9XG4gIHJldHVybiBidWlsZGluZ3M7XG59KTtcblxuZXhwb3J0IGNvbnN0IGJ1aWxkaW5ncyA9IHtcbiAgbWFya2V0VmFsdWU6IGNvbXB1dGVkKCgpID0+IHN1bUJ5KGJ1aWxkaW5nc01hcmtldFZhbHVlLnZhbHVlLCB4ID0+IHgudmFsdWUpKSxcbiAgaW5mcmFzdHJ1Y3R1cmU6IGNvbXB1dGVkKCgpID0+IHN1bUJ1aWxkaW5nc01hcmtldFZhbHVlQnlUeXBlKFsnQ09SRScsICdTVE9SQUdFJywgJ0hBQklUQVRJT04nXSkpLFxuICByZXNvdXJjZUV4dHJhY3Rpb246IGNvbXB1dGVkKCgpID0+IHN1bUJ1aWxkaW5nc01hcmtldFZhbHVlQnlUeXBlKFsnUkVTT1VSQ0VTJ10pKSxcbiAgcHJvZHVjdGlvbjogY29tcHV0ZWQoKCkgPT4gc3VtQnVpbGRpbmdzTWFya2V0VmFsdWVCeVR5cGUoWydQUk9EVUNUSU9OJ10pKSxcbiAgYWNjdW11bGF0ZWREZXByZWNpYXRpb246IGNvbXB1dGVkKCgpID0+IHN1bU1hcFZhbHVlcyhhY2N1bXVsYXRlZERlcHJlY2lhdGlvbkJ5QnVpbGRpbmcudmFsdWUpKSxcbn07XG5cbmZ1bmN0aW9uIHN1bUJ1aWxkaW5nc01hcmtldFZhbHVlQnlUeXBlKHR5cGVzOiBQcnVuQXBpLlBsYXRmb3JtTW9kdWxlVHlwZVtdKSB7XG4gIGlmICghYnVpbGRpbmdzTWFya2V0VmFsdWUudmFsdWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGV0IHN1bSA9IDA7XG4gIGZvciAoY29uc3QgdHlwZSBvZiB0eXBlcykge1xuICAgIGNvbnN0IGJ1aWxkaW5nc0J5VHlwZSA9IGJ1aWxkaW5nc01hcmtldFZhbHVlLnZhbHVlLmZpbHRlcih4ID0+IHguYnVpbGRpbmcubW9kdWxlLnR5cGUgPT09IHR5cGUpO1xuICAgIGZvciAoY29uc3QgZW50cnkgb2YgYnVpbGRpbmdzQnlUeXBlKSB7XG4gICAgICBzdW0gKz0gZW50cnkudmFsdWU7XG4gICAgfVxuICB9XG4gIHJldHVybiBzdW07XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFjQSxNQUFBLHVCQUFBLFNBQUEsTUFBQTtBQUNFLFFBQUEsUUFB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
