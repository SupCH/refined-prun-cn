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
