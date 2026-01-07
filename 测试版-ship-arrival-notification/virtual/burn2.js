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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVybjIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb3JlL2J1cm4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcHJvZHVjdGlvblN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3Byb2R1Y3Rpb24nO1xuaW1wb3J0IHsgd29ya2ZvcmNlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3dvcmtmb3JjZXMnO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IHNpdGVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2l0ZXMnO1xuaW1wb3J0IHtcbiAgZ2V0RW50aXR5TmFtZUZyb21BZGRyZXNzLFxuICBnZXRFbnRpdHlOYXR1cmFsSWRGcm9tQWRkcmVzcyxcbn0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2FkZHJlc3Nlcyc7XG5pbXBvcnQgeyBzdW1CeSB9IGZyb20gJ0BzcmMvdXRpbHMvc3VtLWJ5JztcbmltcG9ydCB7IGdldFJlY3VycmluZ09yZGVycyB9IGZyb20gJ0BzcmMvY29yZS9vcmRlcnMnO1xuXG5leHBvcnQgaW50ZXJmYWNlIE1hdGVyaWFsQnVybiB7XG4gIGlucHV0OiBudW1iZXI7XG4gIG91dHB1dDogbnVtYmVyO1xuICB3b3JrZm9yY2U6IG51bWJlcjtcbiAgZGFpbHlBbW91bnQ6IG51bWJlcjtcbiAgaW52ZW50b3J5OiBudW1iZXI7XG4gIGRheXNMZWZ0OiBudW1iZXI7XG4gIHR5cGU6ICdpbnB1dCcgfCAnb3V0cHV0JyB8ICd3b3JrZm9yY2UnO1xufVxuXG5leHBvcnQgaW50ZXJmYWNlIEJ1cm5WYWx1ZXMge1xuICBbdGlja2VyOiBzdHJpbmddOiBNYXRlcmlhbEJ1cm47XG59XG5cbmV4cG9ydCBpbnRlcmZhY2UgUGxhbmV0QnVybiB7XG4gIHN0b3JlSWQ6IHN0cmluZztcbiAgcGxhbmV0TmFtZTogc3RyaW5nO1xuICBuYXR1cmFsSWQ6IHN0cmluZztcbiAgYnVybjogQnVyblZhbHVlcztcbn1cblxuY29uc3QgYnVybkJ5U2l0ZUlkID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIXNpdGVzU3RvcmUuYWxsLnZhbHVlKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIGNvbnN0IGJ5U2l0ZUlkID0gbmV3IE1hcDxzdHJpbmcsIFJlZjxQbGFuZXRCdXJuIHwgdW5kZWZpbmVkPj4oKTtcbiAgZm9yIChjb25zdCBzaXRlIG9mIHNpdGVzU3RvcmUuYWxsLnZhbHVlKSB7XG4gICAgYnlTaXRlSWQuc2V0KFxuICAgICAgc2l0ZS5zaXRlSWQsXG4gICAgICBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IGlkID0gc2l0ZS5zaXRlSWQ7XG4gICAgICAgIGNvbnN0IHdvcmtmb3JjZSA9IHdvcmtmb3JjZXNTdG9yZS5nZXRCeUlkKGlkKT8ud29ya2ZvcmNlcztcbiAgICAgICAgY29uc3QgcHJvZHVjdGlvbiA9IHByb2R1Y3Rpb25TdG9yZS5nZXRCeVNpdGVJZChpZCk7XG4gICAgICAgIGNvbnN0IHN0b3JhZ2UgPSBzdG9yYWdlc1N0b3JlLmdldEJ5QWRkcmVzc2FibGVJZChpZCk7XG4gICAgICAgIGlmICghd29ya2ZvcmNlIHx8ICFwcm9kdWN0aW9uKSB7XG4gICAgICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICAgICAgfVxuXG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgc3RvcmVJZDogc3RvcmFnZT8uWzBdPy5pZCxcbiAgICAgICAgICBwbGFuZXROYW1lOiBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3Moc2l0ZS5hZGRyZXNzKSxcbiAgICAgICAgICBuYXR1cmFsSWQ6IGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzKHNpdGUuYWRkcmVzcyksXG4gICAgICAgICAgYnVybjogY2FsY3VsYXRlUGxhbmV0QnVybihwcm9kdWN0aW9uLCB3b3JrZm9yY2UsIHN0b3JhZ2UgPz8gW10pLFxuICAgICAgICB9IGFzIFBsYW5ldEJ1cm47XG4gICAgICB9KSxcbiAgICApO1xuICB9XG4gIHJldHVybiBieVNpdGVJZDtcbn0pO1xuXG5leHBvcnQgZnVuY3Rpb24gZ2V0UGxhbmV0QnVybihzaXRlT3JJZD86IFBydW5BcGkuU2l0ZSB8IHN0cmluZyB8IG51bGwpIHtcbiAgY29uc3Qgc2l0ZSA9IHR5cGVvZiBzaXRlT3JJZCA9PT0gJ3N0cmluZycgPyBzaXRlc1N0b3JlLmdldEJ5SWQoc2l0ZU9ySWQpIDogc2l0ZU9ySWQ7XG4gIGlmICghc2l0ZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICByZXR1cm4gYnVybkJ5U2l0ZUlkLnZhbHVlPy5nZXQoc2l0ZS5zaXRlSWQpPy52YWx1ZTtcbn1cblxuZXhwb3J0IGZ1bmN0aW9uIGNhbGN1bGF0ZVBsYW5ldEJ1cm4oXG4gIHByb2R1Y3Rpb246IFBydW5BcGkuUHJvZHVjdGlvbkxpbmVbXSB8IHVuZGVmaW5lZCxcbiAgd29ya2ZvcmNlczogUHJ1bkFwaS5Xb3JrZm9yY2VbXSB8IHVuZGVmaW5lZCxcbiAgc3RvcmFnZTogUHJ1bkFwaS5TdG9yZVtdIHwgdW5kZWZpbmVkLFxuKSB7XG4gIGNvbnN0IGJ1cm5WYWx1ZXM6IEJ1cm5WYWx1ZXMgPSB7fTtcblxuICBmdW5jdGlvbiBnZXRCdXJuVmFsdWUodGlja2VyOiBzdHJpbmcpIHtcbiAgICBpZiAoYnVyblZhbHVlc1t0aWNrZXJdID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGJ1cm5WYWx1ZXNbdGlja2VyXSA9IHtcbiAgICAgICAgaW5wdXQ6IDAsXG4gICAgICAgIG91dHB1dDogMCxcbiAgICAgICAgd29ya2ZvcmNlOiAwLFxuICAgICAgICBkYWlseUFtb3VudDogMCxcbiAgICAgICAgaW52ZW50b3J5OiAwLFxuICAgICAgICBkYXlzTGVmdDogMCxcbiAgICAgICAgdHlwZTogJ291dHB1dCcsXG4gICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gYnVyblZhbHVlc1t0aWNrZXJdO1xuICB9XG5cbiAgaWYgKHByb2R1Y3Rpb24pIHtcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcHJvZHVjdGlvbikge1xuICAgICAgY29uc3QgY2FwYWNpdHkgPSBsaW5lLmNhcGFjaXR5O1xuICAgICAgY29uc3QgYnVybk9yZGVycyA9IGdldFJlY3VycmluZ09yZGVycyhsaW5lKTtcbiAgICAgIGxldCB0b3RhbER1cmF0aW9uID0gc3VtQnkoYnVybk9yZGVycywgeCA9PiB4LmR1cmF0aW9uPy5taWxsaXMgPz8gSW5maW5pdHkpO1xuICAgICAgLy8gQ29udmVydCB0byBkYXlzXG4gICAgICB0b3RhbER1cmF0aW9uIC89IDg2NDAwMDAwO1xuXG4gICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIGJ1cm5PcmRlcnMpIHtcbiAgICAgICAgZm9yIChjb25zdCBtYXQgb2Ygb3JkZXIub3V0cHV0cykge1xuICAgICAgICAgIGNvbnN0IG1hdGVyaWFsQnVybiA9IGdldEJ1cm5WYWx1ZShtYXQubWF0ZXJpYWwudGlja2VyKTtcbiAgICAgICAgICBtYXRlcmlhbEJ1cm4ub3V0cHV0ICs9IChtYXQuYW1vdW50ICogY2FwYWNpdHkpIC8gdG90YWxEdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgICBmb3IgKGNvbnN0IG1hdCBvZiBvcmRlci5pbnB1dHMpIHtcbiAgICAgICAgICBjb25zdCBtYXRlcmlhbEJ1cm4gPSBnZXRCdXJuVmFsdWUobWF0Lm1hdGVyaWFsLnRpY2tlcik7XG4gICAgICAgICAgbWF0ZXJpYWxCdXJuLmlucHV0ICs9IChtYXQuYW1vdW50ICogY2FwYWNpdHkpIC8gdG90YWxEdXJhdGlvbjtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGlmICh3b3JrZm9yY2VzKSB7XG4gICAgZm9yIChjb25zdCB0aWVyIG9mIHdvcmtmb3JjZXMpIHtcbiAgICAgIGlmICh0aWVyLnBvcHVsYXRpb24gPD0gMSkge1xuICAgICAgICAvLyBEb24ndCBjb3VudCB0aGUgYnVnZ2VkIHdvcmtmb3JjZSB3aXRoIG9uZSBwb3B1bGF0aW9uLlxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGlmICh0aWVyLmNhcGFjaXR5ID09PSAwKSB7XG4gICAgICAgIC8vIEFmdGVyIGRlbW9saXNoaW5nIGhvdXNpbmcsIHlvdSBjYW4gZ2V0IGhvbWVsZXNzIHBvcHMgdGhhdCBkb24ndCBjb25zdW1lIGdvb2RzLlxuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGZvciAoY29uc3QgbmVlZCBvZiB0aWVyLm5lZWRzKSB7XG4gICAgICAgIGNvbnN0IG1hdGVyaWFsQnVybiA9IGdldEJ1cm5WYWx1ZShuZWVkLm1hdGVyaWFsLnRpY2tlcik7XG4gICAgICAgIG1hdGVyaWFsQnVybi53b3JrZm9yY2UgKz0gbmVlZC51bml0c1BlckludGVydmFsO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgdGlja2VyIG9mIE9iamVjdC5rZXlzKGJ1cm5WYWx1ZXMpKSB7XG4gICAgY29uc3QgYnVyblZhbHVlID0gYnVyblZhbHVlc1t0aWNrZXJdO1xuICAgIGJ1cm5WYWx1ZS5kYWlseUFtb3VudCA9IGJ1cm5WYWx1ZS5vdXRwdXQ7XG4gICAgYnVyblZhbHVlLnR5cGUgPSAnb3V0cHV0JztcbiAgICBidXJuVmFsdWUuZGFpbHlBbW91bnQgLT0gYnVyblZhbHVlLndvcmtmb3JjZTtcbiAgICBpZiAoYnVyblZhbHVlLndvcmtmb3JjZSA+IDAgJiYgYnVyblZhbHVlLmRhaWx5QW1vdW50IDw9IDApIHtcbiAgICAgIGJ1cm5WYWx1ZS50eXBlID0gJ3dvcmtmb3JjZSc7XG4gICAgfVxuICAgIGJ1cm5WYWx1ZS5kYWlseUFtb3VudCAtPSBidXJuVmFsdWUuaW5wdXQ7XG4gICAgaWYgKGJ1cm5WYWx1ZS5pbnB1dCA+IDAgJiYgYnVyblZhbHVlLmRhaWx5QW1vdW50IDw9IDApIHtcbiAgICAgIGJ1cm5WYWx1ZS50eXBlID0gJ2lucHV0JztcbiAgICB9XG4gIH1cblxuICBpZiAoc3RvcmFnZSkge1xuICAgIGZvciAoY29uc3QgaW52ZW50b3J5IG9mIHN0b3JhZ2UpIHtcbiAgICAgIGZvciAoY29uc3QgaXRlbSBvZiBpbnZlbnRvcnkuaXRlbXMpIHtcbiAgICAgICAgY29uc3QgcXVhbnRpdHkgPSBpdGVtLnF1YW50aXR5O1xuICAgICAgICBpZiAoIXF1YW50aXR5KSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxCdXJuID0gYnVyblZhbHVlc1txdWFudGl0eS5tYXRlcmlhbC50aWNrZXJdO1xuICAgICAgICBpZiAobWF0ZXJpYWxCdXJuID09PSB1bmRlZmluZWQpIHtcbiAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBtYXRlcmlhbEJ1cm4uaW52ZW50b3J5ICs9IHF1YW50aXR5LmFtb3VudDtcbiAgICAgICAgaWYgKHF1YW50aXR5LmFtb3VudCAhPSAwKSB7XG4gICAgICAgICAgbWF0ZXJpYWxCdXJuLmRheXNMZWZ0ID1cbiAgICAgICAgICAgIG1hdGVyaWFsQnVybi5kYWlseUFtb3VudCA+IDBcbiAgICAgICAgICAgICAgPyAxMDAwXG4gICAgICAgICAgICAgIDogTWF0aC5mbG9vcigtbWF0ZXJpYWxCdXJuLmludmVudG9yeSAvIG1hdGVyaWFsQnVybi5kYWlseUFtb3VudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH1cblxuICByZXR1cm4gYnVyblZhbHVlcztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWdDQSxNQUFBLGVBQUEsU0FBQSxNQUFBO0FBQ0UsTUFBQSxDQUFBLFdBQUEsSUFBQSxPQUFBO0FBQ0UsV0FBQTtBQUFBLEVBQU87QUFHVCxRQUFBLFdBQUEsb0JBQUEsSUFBQTtBQUNBLGFBQUEsUUFBQSxXQUFBLElBQUEsT0FBQTtBQUNFLGFBQUE7QUFB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
