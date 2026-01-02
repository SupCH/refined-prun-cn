import { productionStore } from './production.js';
import { userDataStore } from './user-data2.js';
import { computed } from './runtime-core.esm-bundler.js';
function isFiniteOrder(order) {
  return order.amount !== null;
}
const hasRecurringOrders = computed(() => {
  if (userDataStore.subscriptionLevel !== 'PRO') {
    return false;
  }
  return productionStore.all.value?.some(line => line.orders.some(x => x.recurring)) ?? false;
});
function getRecurringOrders(line) {
  return hasRecurringOrders.value
    ? line.orders.filter(x => !x.started && x.recurring)
    : line.orders.filter(x => !x.started);
}
export { getRecurringOrders, isFiniteOrder };
