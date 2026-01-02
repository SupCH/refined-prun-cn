import { screensStore } from './screens.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
function syncState() {
  const sorted = screensStore.sorted.value;
  if (!sorted) {
    return;
  }
  const order = userData.tabs.order;
  const hidden = userData.tabs.hidden;
  const tracked = /* @__PURE__ */ new Set([...order, ...hidden]);
  for (const tab of sorted) {
    if (!tracked.has(tab.id)) {
      order.push(tab.id);
    }
  }
  const existing = new Set(sorted.map(x => x.id));
  for (const id of order) {
    if (!existing.has(id)) {
      removeArrayElement(order, id);
    }
  }
  for (const id of hidden) {
    if (!existing.has(id)) {
      removeArrayElement(hidden, id);
    }
  }
}
export { syncState };
