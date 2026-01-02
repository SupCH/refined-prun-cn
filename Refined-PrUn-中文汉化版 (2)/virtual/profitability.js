import { productionStore } from './production.js';
import { workforcesStore } from './workforces.js';
import { sumMaterialAmountPrice } from './cx.js';
import { sumBy } from './sum-by.js';
import { mergeMaterialAmounts } from './sort-materials.js';
import { getEntityNameFromAddress } from './addresses.js';
import { isRepairableBuilding, calcBuildingMarketValue } from './buildings.js';
import { getRecurringOrders } from './orders.js';
function calculateSiteProfitability(site) {
  const production = productionStore.getBySiteId(site.siteId);
  const workforce = workforcesStore.getById(site.siteId);
  const inputs = [];
  const outputs = [];
  if (!workforce) {
    return void 0;
  }
  for (const need of workforce.workforces.flatMap(x => x.needs)) {
    inputs.push({
      material: need.material,
      amount: need.unitsPerInterval,
    });
  }
  const msInADay = 864e5;
  if (production) {
    for (const line of production) {
      const queuedOrders = getRecurringOrders(line);
      const totalDuration = sumBy(queuedOrders, x => x.duration?.millis ?? Infinity);
      for (const order of queuedOrders) {
        for (const mat of order.inputs) {
          inputs.push({
            material: mat.material,
            amount: (mat.amount * line.capacity * msInADay) / totalDuration,
          });
        }
        for (const mat of order.outputs) {
          outputs.push({
            material: mat.material,
            amount: (mat.amount * line.capacity * msInADay) / totalDuration,
          });
        }
      }
    }
  }
  const cost = sumMaterialAmountPrice(mergeMaterialAmounts(inputs));
  const revenue = sumMaterialAmountPrice(mergeMaterialAmounts(outputs));
  if (revenue === void 0 || cost === void 0) {
    return void 0;
  }
  let repairs = 0;
  const oneDayDegradation = 1 / 180;
  const calculatedMarketValue = /* @__PURE__ */ new Map();
  for (const building of site.platforms) {
    if (!isRepairableBuilding(building) || building.condition === 0) {
      continue;
    }
    const ticker = building.module.reactorTicker;
    let marketValue = calculatedMarketValue.get(ticker);
    if (marketValue === void 0) {
      marketValue = calcBuildingMarketValue(building, site);
      if (marketValue === void 0) {
        return void 0;
      }
      calculatedMarketValue.set(ticker, marketValue);
    }
    repairs += marketValue * oneDayDegradation;
  }
  const profit = revenue - cost - repairs;
  const margin = revenue !== 0 ? profit / revenue : 0;
  return {
    name: getEntityNameFromAddress(site.address),
    cost,
    repairs,
    revenue,
    profit,
    margin,
  };
}
export { calculateSiteProfitability };
