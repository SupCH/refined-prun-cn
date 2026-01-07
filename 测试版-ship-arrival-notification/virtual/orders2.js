import { sumMaterialAmountPrice } from './cx.js';
import { timestampEachMinute } from './dayjs.js';
import { clamp } from './clamp.js';
import { getEntityNameFromAddress } from './addresses.js';
import { sumMapValues } from './utils.js';
import { sitesStore } from './sites.js';
import { productionStore } from './production.js';
import { computed } from './runtime-core.esm-bundler.js';
const orderValue = computed(() => {
  const sites = sitesStore.all.value;
  if (!sites) {
    return void 0;
  }
  const orders = [];
  for (const site of sites) {
    const lines = productionStore.getBySiteId(site.siteId);
    if (!lines) {
      return void 0;
    }
    for (const line of lines) {
      for (const order of line.orders.filter(x => x.started)) {
        const inputs = sumMaterialAmountPrice(order.inputs);
        const outputs = sumMaterialAmountPrice(order.outputs);
        if (inputs === void 0 || outputs === void 0) {
          return void 0;
        }
        orders.push({
          location: getEntityNameFromAddress(site.address),
          order,
          inputs: inputs + order.productionFee.amount,
          outputs,
        });
      }
    }
  }
  return orders;
});
const workInProgressByLocation = computed(() => {
  if (!orderValue.value) {
    return void 0;
  }
  const now = timestampEachMinute.value;
  const orders = /* @__PURE__ */ new Map();
  for (const entry of orderValue.value) {
    const duration = entry.order.duration?.millis ?? Infinity;
    const elapsed = now - entry.order.started.timestamp;
    const t = clamp(elapsed / duration, 0, 1);
    const value = entry.inputs * (1 - t) + entry.outputs * t;
    orders.set(entry.location, (orders.get(entry.location) ?? 0) + value);
  }
  return orders;
});
const workInProgress = computed(() => sumMapValues(workInProgressByLocation.value));
export { workInProgress, workInProgressByLocation };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3JkZXJzMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvcmUvYmFsYW5jZS9vcmRlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3VtTWF0ZXJpYWxBbW91bnRQcmljZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvZmlvL2N4JztcbmltcG9ydCB7IHRpbWVzdGFtcEVhY2hNaW51dGUgfSBmcm9tICdAc3JjL3V0aWxzL2RheWpzJztcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSAnQHNyYy91dGlscy9jbGFtcCc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcbmltcG9ydCB7IHN1bU1hcFZhbHVlcyB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL3V0aWxzJztcbmltcG9ydCB7IHNpdGVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2l0ZXMnO1xuaW1wb3J0IHsgcHJvZHVjdGlvblN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3Byb2R1Y3Rpb24nO1xuXG5pbnRlcmZhY2UgRW50cnkge1xuICBsb2NhdGlvbjogc3RyaW5nO1xuICBvcmRlcjogUHJ1bkFwaS5Qcm9kdWN0aW9uT3JkZXI7XG4gIGlucHV0czogbnVtYmVyO1xuICBvdXRwdXRzOiBudW1iZXI7XG59XG5cbmNvbnN0IG9yZGVyVmFsdWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHNpdGVzID0gc2l0ZXNTdG9yZS5hbGwudmFsdWU7XG4gIGlmICghc2l0ZXMpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IG9yZGVyczogRW50cnlbXSA9IFtdO1xuICBmb3IgKGNvbnN0IHNpdGUgb2Ygc2l0ZXMpIHtcbiAgICBjb25zdCBsaW5lcyA9IHByb2R1Y3Rpb25TdG9yZS5nZXRCeVNpdGVJZChzaXRlLnNpdGVJZCk7XG4gICAgaWYgKCFsaW5lcykge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG4gICAgZm9yIChjb25zdCBsaW5lIG9mIGxpbmVzKSB7XG4gICAgICBmb3IgKGNvbnN0IG9yZGVyIG9mIGxpbmUub3JkZXJzLmZpbHRlcih4ID0+IHguc3RhcnRlZCkpIHtcbiAgICAgICAgY29uc3QgaW5wdXRzID0gc3VtTWF0ZXJpYWxBbW91bnRQcmljZShvcmRlci5pbnB1dHMpO1xuICAgICAgICBjb25zdCBvdXRwdXRzID0gc3VtTWF0ZXJpYWxBbW91bnRQcmljZShvcmRlci5vdXRwdXRzKTtcbiAgICAgICAgaWYgKGlucHV0cyA9PT0gdW5kZWZpbmVkIHx8IG91dHB1dHMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgICAgIH1cbiAgICAgICAgb3JkZXJzLnB1c2goe1xuICAgICAgICAgIGxvY2F0aW9uOiBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3Moc2l0ZS5hZGRyZXNzKSEsXG4gICAgICAgICAgb3JkZXIsXG4gICAgICAgICAgaW5wdXRzOiBpbnB1dHMgKyBvcmRlci5wcm9kdWN0aW9uRmVlLmFtb3VudCxcbiAgICAgICAgICBvdXRwdXRzLFxuICAgICAgICB9KTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIG9yZGVycztcbn0pO1xuXG5leHBvcnQgY29uc3Qgd29ya0luUHJvZ3Jlc3NCeUxvY2F0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIW9yZGVyVmFsdWUudmFsdWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IG5vdyA9IHRpbWVzdGFtcEVhY2hNaW51dGUudmFsdWU7XG4gIGNvbnN0IG9yZGVycyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gIGZvciAoY29uc3QgZW50cnkgb2Ygb3JkZXJWYWx1ZS52YWx1ZSkge1xuICAgIGNvbnN0IGR1cmF0aW9uID0gZW50cnkub3JkZXIuZHVyYXRpb24/Lm1pbGxpcyA/PyBJbmZpbml0eTtcbiAgICBjb25zdCBlbGFwc2VkID0gbm93IC0gZW50cnkub3JkZXIuc3RhcnRlZCEudGltZXN0YW1wO1xuICAgIGNvbnN0IHQgPSBjbGFtcChlbGFwc2VkIC8gZHVyYXRpb24sIDAsIDEpO1xuICAgIGNvbnN0IHZhbHVlID0gZW50cnkuaW5wdXRzICogKDEgLSB0KSArIGVudHJ5Lm91dHB1dHMgKiB0O1xuICAgIG9yZGVycy5zZXQoZW50cnkubG9jYXRpb24sIChvcmRlcnMuZ2V0KGVudHJ5LmxvY2F0aW9uKSA/PyAwKSArIHZhbHVlKTtcbiAgfVxuICByZXR1cm4gb3JkZXJzO1xufSk7XG5cbmV4cG9ydCBjb25zdCB3b3JrSW5Qcm9ncmVzcyA9IGNvbXB1dGVkKCgpID0+IHN1bU1hcFZhbHVlcyh3b3JrSW5Qcm9ncmVzc0J5TG9jYXRpb24udmFsdWUpKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQWVBLE1BQUEsYUFBQSxTQUFBLE1BQUE7QUFDRSxRQUFBLFFBQUEsV0FBQSxJQUFBO0FBQ0EsTUFBQSxDQUFBLE9BQUE7QUFDRSxXQUFBO0FBQUEsRUFBTztBQUVULFFBQUEsU0FBQSxDQUFBO0FBQ0EsYUFBQSxRQUFBLE9BQUE7QUFDRSxVQUFBLFFBQUEsZ0JBQUEsWUFBQSxLQUFBLE1BQUE7QUFDQSxRQUFBLENBQUEsT0FBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBRVQsZUFBQSxRQUFBLE9BQUE7QUFDRSxpQkFBQSxTQUFBLEtBQUEsT0FBQSxPQUFBLENBQUEsTUFBQSxFQUFBLE9BQUEsR0FBQTtBQUNFLGNBQUEsU0FBQSx1QkFBQSxNQUFBLE1BQUE7QUFDQSxjQUFBLFVBQUEsdUJBQUEsTUFBQSxPQUFBO0FBQ0EsWUFBQSxXQUFBLFVBQUEsWUFBQSxRQUFBO0FBQ0UsaUJBQUE7QUFBQSxRQUFPO0FBRVQsZUFBQSxLQUFBO0FBQUEsVUFBWSxVQUFBLHlCQUFBLEtBQUEsT0FBQTtBQUFBLFVBQ3FDO0FBQUEsVUFDL0MsUUFBQSxTQUFBLE1BQUEsY0FBQTtBQUFBLFVBQ3FDO0FBQUEsUUFDckMsQ0FBQTtBQUFBLE1BQ0Q7QUFBQSxJQUNIO0FBQUEsRUFDRjtBQUVGLFNBQUE7QUFDRixDQUFBO0FBRU8sTUFBQSwyQkFBQSxTQUFBLE1BQUE7QUFDTCxNQUFBLENBQUEsV0FBQSxPQUFBO0FBQ0UsV0FBQTtBQUFBLEVBQU87QUFFVCxRQUFBLE1BQUEsb0JBQUE7QUFDQSxRQUFBLFNBQUEsb0JBQUEsSUFBQTtBQUNBLGFBQUEsU0FBQSxXQUFBLE9BQUE7QUFDRSxVQUFBLFdBQUEsTUFBQSxNQUFBLFVBQUEsVUFBQTtBQUNBLFVBQUEsVUFBQSxNQUFBLE1BQUEsTUFBQSxRQUFBO0FBQ0EsVUFBQSxJQUFBLE1BQUEsVUFBQSxVQUFBLEdBQUEsQ0FBQTtBQUNBLFVBQUEsUUFBQSxNQUFBLFVBQUEsSUFBQSxLQUFBLE1BQUEsVUFBQTtBQUNBLFdBQUEsSUFBQSxNQUFBLFdBQUEsT0FBQSxJQUFBLE1BQUEsUUFBQSxLQUFBLEtBQUEsS0FBQTtBQUFBLEVBQW9FO0FBRXRFLFNBQUE7QUFDRixDQUFBO0FBRU8sTUFBQSxpQkFBQSxTQUFBLE1BQUEsYUFBQSx5QkFBQSxLQUFBLENBQUE7In0=
