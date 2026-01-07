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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZml0YWJpbGl0eS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvcHJvZml0YWJpbGl0eS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBwcm9kdWN0aW9uU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvcHJvZHVjdGlvbic7XG5pbXBvcnQgeyB3b3JrZm9yY2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvd29ya2ZvcmNlcyc7XG5pbXBvcnQgeyBzdW1NYXRlcmlhbEFtb3VudFByaWNlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9maW8vY3gnO1xuaW1wb3J0IHsgc3VtQnkgfSBmcm9tICdAc3JjL3V0aWxzL3N1bS1ieSc7XG5pbXBvcnQgeyBtZXJnZU1hdGVyaWFsQW1vdW50cyB9IGZyb20gJ0BzcmMvY29yZS9zb3J0LW1hdGVyaWFscyc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcbmltcG9ydCB7IGNhbGNCdWlsZGluZ01hcmtldFZhbHVlLCBpc1JlcGFpcmFibGVCdWlsZGluZyB9IGZyb20gJ0BzcmMvY29yZS9idWlsZGluZ3MnO1xuaW1wb3J0IHsgZ2V0UmVjdXJyaW5nT3JkZXJzIH0gZnJvbSAnQHNyYy9jb3JlL29yZGVycyc7XG5cbmV4cG9ydCBpbnRlcmZhY2UgUHJvZml0YWJpbGl0eUVudHJ5IHtcbiAgbmFtZTogc3RyaW5nO1xuICBjb3N0OiBudW1iZXI7XG4gIHJlcGFpcnM6IG51bWJlcjtcbiAgcmV2ZW51ZTogbnVtYmVyO1xuICBwcm9maXQ6IG51bWJlcjtcbiAgbWFyZ2luOiBudW1iZXI7XG59XG5cbmV4cG9ydCBmdW5jdGlvbiBjYWxjdWxhdGVTaXRlUHJvZml0YWJpbGl0eShzaXRlOiBQcnVuQXBpLlNpdGUpOiBQcm9maXRhYmlsaXR5RW50cnkgfCB1bmRlZmluZWQge1xuICBjb25zdCBwcm9kdWN0aW9uID0gcHJvZHVjdGlvblN0b3JlLmdldEJ5U2l0ZUlkKHNpdGUuc2l0ZUlkKTtcbiAgY29uc3Qgd29ya2ZvcmNlID0gd29ya2ZvcmNlc1N0b3JlLmdldEJ5SWQoc2l0ZS5zaXRlSWQpO1xuICBjb25zdCBpbnB1dHM6IFBydW5BcGkuTWF0ZXJpYWxBbW91bnRbXSA9IFtdO1xuICBjb25zdCBvdXRwdXRzOiBQcnVuQXBpLk1hdGVyaWFsQW1vdW50W10gPSBbXTtcblxuICBpZiAoIXdvcmtmb3JjZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBmb3IgKGNvbnN0IG5lZWQgb2Ygd29ya2ZvcmNlLndvcmtmb3JjZXMuZmxhdE1hcCh4ID0+IHgubmVlZHMpKSB7XG4gICAgaW5wdXRzLnB1c2goe1xuICAgICAgbWF0ZXJpYWw6IG5lZWQubWF0ZXJpYWwsXG4gICAgICBhbW91bnQ6IG5lZWQudW5pdHNQZXJJbnRlcnZhbCxcbiAgICB9KTtcbiAgfVxuXG4gIGNvbnN0IG1zSW5BRGF5ID0gODY0MDAwMDA7XG5cbiAgaWYgKHByb2R1Y3Rpb24pIHtcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgcHJvZHVjdGlvbikge1xuICAgICAgY29uc3QgcXVldWVkT3JkZXJzID0gZ2V0UmVjdXJyaW5nT3JkZXJzKGxpbmUpO1xuICAgICAgY29uc3QgdG90YWxEdXJhdGlvbiA9IHN1bUJ5KHF1ZXVlZE9yZGVycywgeCA9PiB4LmR1cmF0aW9uPy5taWxsaXMgPz8gSW5maW5pdHkpO1xuXG4gICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIHF1ZXVlZE9yZGVycykge1xuICAgICAgICBmb3IgKGNvbnN0IG1hdCBvZiBvcmRlci5pbnB1dHMpIHtcbiAgICAgICAgICBpbnB1dHMucHVzaCh7XG4gICAgICAgICAgICBtYXRlcmlhbDogbWF0Lm1hdGVyaWFsLFxuICAgICAgICAgICAgYW1vdW50OiAobWF0LmFtb3VudCAqIGxpbmUuY2FwYWNpdHkgKiBtc0luQURheSkgLyB0b3RhbER1cmF0aW9uLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG5cbiAgICAgICAgZm9yIChjb25zdCBtYXQgb2Ygb3JkZXIub3V0cHV0cykge1xuICAgICAgICAgIG91dHB1dHMucHVzaCh7XG4gICAgICAgICAgICBtYXRlcmlhbDogbWF0Lm1hdGVyaWFsLFxuICAgICAgICAgICAgYW1vdW50OiAobWF0LmFtb3VudCAqIGxpbmUuY2FwYWNpdHkgKiBtc0luQURheSkgLyB0b3RhbER1cmF0aW9uLFxuICAgICAgICAgIH0pO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgY29uc3QgY29zdCA9IHN1bU1hdGVyaWFsQW1vdW50UHJpY2UobWVyZ2VNYXRlcmlhbEFtb3VudHMoaW5wdXRzKSk7XG4gIGNvbnN0IHJldmVudWUgPSBzdW1NYXRlcmlhbEFtb3VudFByaWNlKG1lcmdlTWF0ZXJpYWxBbW91bnRzKG91dHB1dHMpKTtcblxuICBpZiAocmV2ZW51ZSA9PT0gdW5kZWZpbmVkIHx8IGNvc3QgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBsZXQgcmVwYWlycyA9IDA7XG4gIGNvbnN0IG9uZURheURlZ3JhZGF0aW9uID0gMSAvIDE4MDtcbiAgY29uc3QgY2FsY3VsYXRlZE1hcmtldFZhbHVlID0gbmV3IE1hcDxzdHJpbmcsIG51bWJlcj4oKTtcbiAgZm9yIChjb25zdCBidWlsZGluZyBvZiBzaXRlLnBsYXRmb3Jtcykge1xuICAgIGlmICghaXNSZXBhaXJhYmxlQnVpbGRpbmcoYnVpbGRpbmcpIHx8IGJ1aWxkaW5nLmNvbmRpdGlvbiA9PT0gMCkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY29uc3QgdGlja2VyID0gYnVpbGRpbmcubW9kdWxlLnJlYWN0b3JUaWNrZXI7XG4gICAgbGV0IG1hcmtldFZhbHVlID0gY2FsY3VsYXRlZE1hcmtldFZhbHVlLmdldCh0aWNrZXIpO1xuICAgIGlmIChtYXJrZXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBtYXJrZXRWYWx1ZSA9IGNhbGNCdWlsZGluZ01hcmtldFZhbHVlKGJ1aWxkaW5nLCBzaXRlKTtcbiAgICAgIGlmIChtYXJrZXRWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICB9XG4gICAgICBjYWxjdWxhdGVkTWFya2V0VmFsdWUuc2V0KHRpY2tlciwgbWFya2V0VmFsdWUpO1xuICAgIH1cbiAgICByZXBhaXJzICs9IG1hcmtldFZhbHVlICogb25lRGF5RGVncmFkYXRpb247XG4gIH1cblxuICBjb25zdCBwcm9maXQgPSByZXZlbnVlIC0gY29zdCAtIHJlcGFpcnM7XG4gIGNvbnN0IG1hcmdpbiA9IHJldmVudWUgIT09IDAgPyBwcm9maXQgLyByZXZlbnVlIDogMDtcbiAgcmV0dXJuIHtcbiAgICBuYW1lOiBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3Moc2l0ZS5hZGRyZXNzKSEsXG4gICAgY29zdCxcbiAgICByZXBhaXJzLFxuICAgIHJldmVudWUsXG4gICAgcHJvZml0LFxuICAgIG1hcmdpbixcbiAgfTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWtCTyxTQUFTLDJCQUEyQixNQUFvRDtBQUM3RixRQUFNLGFBQWEsZ0JBQWdCLFlBQVksS0FBSyxNQUFNO0FBQzFELFFBQU0sWUFBWSxnQkFBZ0IsUUFBUSxLQUFLLE1BQU07QUFDckQsUUFBTSxTQUFtQyxDQUFBO0FBQ3pDLFFBQU0sVUFBb0MsQ0FBQTtBQUUxQyxNQUFJLENBQUMsV0FBVztBQUNkLFdBQU87QUFBQSxFQUNUO0FBRUEsYUFBVyxRQUFRLFVBQVUsV0FBVyxRQUFRLENBQUEsTUFBSyxFQUFFLEtBQUssR0FBRztBQUM3RCxXQUFPLEtBQUs7QUFBQSxNQUNWLFVBQVUsS0FBSztBQUFBLE1BQ2YsUUFBUSxLQUFLO0FBQUEsSUFBQSxDQUNkO0FBQUEsRUFDSDtBQUVBLFFBQU0sV0FBVztBQUVqQixNQUFJLFlBQVk7QUFDZCxlQUFXLFFBQVEsWUFBWTtBQUM3QixZQUFNLGVBQWUsbUJBQW1CLElBQUk7QUFDNUMsWUFBTSxnQkFBZ0IsTUFBTSxjQUFjLE9BQUssRUFBRSxVQUFVLFVBQVUsUUFBUTtBQUU3RSxpQkFBVyxTQUFTLGNBQWM7QUFDaEMsbUJBQVcsT0FBTyxNQUFNLFFBQVE7QUFDOUIsaUJBQU8sS0FBSztBQUFBLFlBQ1YsVUFBVSxJQUFJO0FBQUEsWUFDZCxRQUFTLElBQUksU0FBUyxLQUFLLFdBQVcsV0FBWTtBQUFBLFVBQUEsQ0FDbkQ7QUFBQSxRQUNIO0FBRUEsbUJBQVcsT0FBTyxNQUFNLFNBQVM7QUFDL0Isa0JBQVEsS0FBSztBQUFBLFlBQ1gsVUFBVSxJQUFJO0FBQUEsWUFDZCxRQUFTLElBQUksU0FBUyxLQUFLLFdBQVcsV0FBWTtBQUFBLFVBQUEsQ0FDbkQ7QUFBQSxRQUNIO0FBQUEsTUFDRjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsUUFBTSxPQUFPLHVCQUF1QixxQkFBcUIsTUFBTSxDQUFDO0FBQ2hFLFFBQU0sVUFBVSx1QkFBdUIscUJBQXFCLE9BQU8sQ0FBQztBQUVwRSxNQUFJLFlBQVksVUFBYSxTQUFTLFFBQVc7QUFDL0MsV0FBTztBQUFBLEVBQ1Q7QUFFQSxNQUFJLFVBQVU7QUFDZCxRQUFNLG9CQUFvQixJQUFJO0FBQzlCLFFBQU0sNENBQTRCLElBQUE7QUFDbEMsYUFBVyxZQUFZLEtBQUssV0FBVztBQUNyQyxRQUFJLENBQUMscUJBQXFCLFFBQVEsS0FBSyxTQUFTLGNBQWMsR0FBRztBQUMvRDtBQUFBLElBQ0Y7QUFFQSxVQUFNLFNBQVMsU0FBUyxPQUFPO0FBQy9CLFFBQUksY0FBYyxzQkFBc0IsSUFBSSxNQUFNO0FBQ2xELFFBQUksZ0JBQWdCLFFBQVc7QUFDN0Isb0JBQWMsd0JBQXdCLFVBQVUsSUFBSTtBQUNwRCxVQUFJLGdCQUFnQixRQUFXO0FBQzdCLGVBQU87QUFBQSxNQUNUO0FBQ0EsNEJBQXNCLElBQUksUUFBUSxXQUFXO0FBQUEsSUFDL0M7QUFDQSxlQUFXLGNBQWM7QUFBQSxFQUMzQjtBQUVBLFFBQU0sU0FBUyxVQUFVLE9BQU87QUFDaEMsUUFBTSxTQUFTLFlBQVksSUFBSSxTQUFTLFVBQVU7QUFDbEQsU0FBTztBQUFBLElBQ0wsTUFBTSx5QkFBeUIsS0FBSyxPQUFPO0FBQUEsSUFDM0M7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFBQTtBQUVKOyJ9
