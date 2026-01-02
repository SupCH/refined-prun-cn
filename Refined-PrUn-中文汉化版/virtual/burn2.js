import { productionStore } from './production.js';
import { workforcesStore } from './workforces.js';
import { storagesStore } from './storage.js';
import { sitesStore } from './sites.js';
import { getEntityNaturalIdFromAddress, getEntityNameFromAddress } from './addresses.js';
import { sumBy } from './sum-by.js';
import { getRecurringOrders } from './orders.js';
import { computed } from './runtime-core.esm-bundler.js';
const burnBySiteId = computed(() => {
  if (!sitesStore.all.value) {
    return void 0;
  }
  const bySiteId = /* @__PURE__ */ new Map();
  for (const site of sitesStore.all.value) {
    bySiteId.set(
      site.siteId,
      computed(() => {
        const id = site.siteId;
        const workforce = workforcesStore.getById(id)?.workforces;
        const production = productionStore.getBySiteId(id);
        const storage = storagesStore.getByAddressableId(id);
        if (!workforce || !production) {
          return void 0;
        }
        return {
          storeId: storage?.[0]?.id,
          planetName: getEntityNameFromAddress(site.address),
          naturalId: getEntityNaturalIdFromAddress(site.address),
          burn: calculatePlanetBurn(production, workforce, storage ?? []),
        };
      }),
    );
  }
  return bySiteId;
});
function getPlanetBurn(siteOrId) {
  const site = typeof siteOrId === 'string' ? sitesStore.getById(siteOrId) : siteOrId;
  if (!site) {
    return void 0;
  }
  return burnBySiteId.value?.get(site.siteId)?.value;
}
function calculatePlanetBurn(production, workforces, storage) {
  const burnValues = {};
  function getBurnValue(ticker) {
    if (burnValues[ticker] === void 0) {
      burnValues[ticker] = {
        input: 0,
        output: 0,
        workforce: 0,
        dailyAmount: 0,
        inventory: 0,
        daysLeft: 0,
        type: 'output',
      };
    }
    return burnValues[ticker];
  }
  if (production) {
    for (const line of production) {
      const capacity = line.capacity;
      const burnOrders = getRecurringOrders(line);
      let totalDuration = sumBy(burnOrders, x => x.duration?.millis ?? Infinity);
      totalDuration /= 864e5;
      for (const order of burnOrders) {
        for (const mat of order.outputs) {
          const materialBurn = getBurnValue(mat.material.ticker);
          materialBurn.output += (mat.amount * capacity) / totalDuration;
        }
        for (const mat of order.inputs) {
          const materialBurn = getBurnValue(mat.material.ticker);
          materialBurn.input += (mat.amount * capacity) / totalDuration;
        }
      }
    }
  }
  if (workforces) {
    for (const tier of workforces) {
      if (tier.population <= 1) {
        continue;
      }
      if (tier.capacity === 0) {
        continue;
      }
      for (const need of tier.needs) {
        const materialBurn = getBurnValue(need.material.ticker);
        materialBurn.workforce += need.unitsPerInterval;
      }
    }
  }
  for (const ticker of Object.keys(burnValues)) {
    const burnValue = burnValues[ticker];
    burnValue.dailyAmount = burnValue.output;
    burnValue.type = 'output';
    burnValue.dailyAmount -= burnValue.workforce;
    if (burnValue.workforce > 0 && burnValue.dailyAmount <= 0) {
      burnValue.type = 'workforce';
    }
    burnValue.dailyAmount -= burnValue.input;
    if (burnValue.input > 0 && burnValue.dailyAmount <= 0) {
      burnValue.type = 'input';
    }
  }
  if (storage) {
    for (const inventory of storage) {
      for (const item of inventory.items) {
        const quantity = item.quantity;
        if (!quantity) {
          continue;
        }
        const materialBurn = burnValues[quantity.material.ticker];
        if (materialBurn === void 0) {
          continue;
        }
        materialBurn.inventory += quantity.amount;
        if (quantity.amount != 0) {
          materialBurn.daysLeft =
            materialBurn.dailyAmount > 0
              ? 1e3
              : Math.floor(-materialBurn.inventory / materialBurn.dailyAmount);
        }
      }
    }
  }
  return burnValues;
}
export { calculatePlanetBurn, getPlanetBurn };
