import { subscribe } from './subscribe-async-generator.js';
import { $$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { productionStore } from './production.js';
import { formatEta } from './format.js';
import { timestampEachMinute } from './dayjs.js';
import { createReactiveDiv } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import { calcCompletionDate } from './production-line.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.OrderSlot.container), x => onOrderSlotReady(x, tile.parameter));
}
function onOrderSlotReady(slot, siteId) {
  const orderId = refPrunId(slot);
  const completion = computed(() => {
    const site = sitesStore.getById(siteId);
    const lines = productionStore.getBySiteId(site?.siteId) ?? [];
    for (const line of lines) {
      for (const order of line.orders) {
        if (order.id === orderId.value) {
          return calcCompletionDate(line, order);
        }
      }
    }
    return void 0;
  });
  const eta = computed(() => {
    return completion.value !== void 0
      ? `(${formatEta(timestampEachMinute.value, completion.value)})`
      : void 0;
  });
  const div = createReactiveDiv(slot, eta);
  keepLast(slot, () => _$(slot, C.OrderSlot.info), div);
}
function init() {
  tiles.observe('PROD', onTileReady);
}
features.add(import.meta.url, init, 'PROD: Adds a finish ETA label to orders.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZC1vcmRlci1ldGEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9wcm9kLW9yZGVyLWV0YS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IHByb2R1Y3Rpb25TdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9wcm9kdWN0aW9uJztcbmltcG9ydCB7IGZvcm1hdEV0YSB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IHRpbWVzdGFtcEVhY2hNaW51dGUgfSBmcm9tICdAc3JjL3V0aWxzL2RheWpzJztcbmltcG9ydCB7IGNyZWF0ZVJlYWN0aXZlRGl2IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1lbGVtZW50JztcbmltcG9ydCB7IGtlZXBMYXN0IH0gZnJvbSAnQHNyYy91dGlscy9rZWVwLWxhc3QnO1xuaW1wb3J0IHsgY2FsY0NvbXBsZXRpb25EYXRlIH0gZnJvbSAnQHNyYy9jb3JlL3Byb2R1Y3Rpb24tbGluZSc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIGlmICghdGlsZS5wYXJhbWV0ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuT3JkZXJTbG90LmNvbnRhaW5lciksIHggPT4gb25PcmRlclNsb3RSZWFkeSh4LCB0aWxlLnBhcmFtZXRlciEpKTtcbn1cblxuZnVuY3Rpb24gb25PcmRlclNsb3RSZWFkeShzbG90OiBIVE1MRWxlbWVudCwgc2l0ZUlkOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3JkZXJJZCA9IHJlZlBydW5JZChzbG90KTtcbiAgY29uc3QgY29tcGxldGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBzaXRlID0gc2l0ZXNTdG9yZS5nZXRCeUlkKHNpdGVJZCk7XG4gICAgY29uc3QgbGluZXMgPSBwcm9kdWN0aW9uU3RvcmUuZ2V0QnlTaXRlSWQoc2l0ZT8uc2l0ZUlkKSA/PyBbXTtcbiAgICBmb3IgKGNvbnN0IGxpbmUgb2YgbGluZXMpIHtcbiAgICAgIGZvciAoY29uc3Qgb3JkZXIgb2YgbGluZS5vcmRlcnMpIHtcbiAgICAgICAgaWYgKG9yZGVyLmlkID09PSBvcmRlcklkLnZhbHVlKSB7XG4gICAgICAgICAgcmV0dXJuIGNhbGNDb21wbGV0aW9uRGF0ZShsaW5lLCBvcmRlcik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfSk7XG4gIGNvbnN0IGV0YSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICByZXR1cm4gY29tcGxldGlvbi52YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGAoJHtmb3JtYXRFdGEodGltZXN0YW1wRWFjaE1pbnV0ZS52YWx1ZSwgY29tcGxldGlvbi52YWx1ZSl9KWBcbiAgICAgIDogdW5kZWZpbmVkO1xuICB9KTtcbiAgY29uc3QgZGl2ID0gY3JlYXRlUmVhY3RpdmVEaXYoc2xvdCwgZXRhKTtcbiAga2VlcExhc3Qoc2xvdCwgKCkgPT4gXyQoc2xvdCwgQy5PcmRlclNsb3QuaW5mbyksIGRpdik7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ1BST0QnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdQUk9EOiBBZGRzIGEgZmluaXNoIEVUQSBsYWJlbCB0byBvcmRlcnMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFTQSxTQUFBLFlBQUEsTUFBQTtBQUNFLE1BQUEsQ0FBQSxLQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsVUFBQSxTQUFBLEdBQUEsQ0FBQSxNQUFBLGlCQUFBLEdBQUEsS0FBQSxTQUFBLENBQUE7QUFDRjtBQUVBLFNBQUEsaUJBQUEsTUFBQSxRQUFBO0FBQ0UsUUFBQSxVQUFBLFVBQUEsSUFBQTtBQUNBLFFBQUEsYUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLE9BQUEsV0FBQSxRQUFBLE1BQUE7QUFDQSxVQUFBLFFBQUEsZ0JBQUEsWUFBQSxNQUFBLE1BQUEsS0FBQSxDQUFBO0FBQ0EsZUFBQSxRQUFBLE9BQUE7QUFDRSxpQkFBQSxTQUFBLEtBQUEsUUFBQTtBQUNFLFlBQUEsTUFBQSxPQUFBLFFBQUEsT0FBQTtBQUNFLGlCQUFBLG1CQUFBLE1BQUEsS0FBQTtBQUFBLFFBQXFDO0FBQUEsTUFDdkM7QUFBQSxJQUNGO0FBRUYsV0FBQTtBQUFBLEVBQU8sQ0FBQTtBQUVULFFBQUEsTUFBQSxTQUFBLE1BQUE7QUFDRSxXQUFBLFdBQUEsVUFBQSxTQUFBLElBQUEsVUFBQSxvQkFBQSxPQUFBLFdBQUEsS0FBQSxDQUFBLE1BQUE7QUFBQSxFQUVJLENBQUE7QUFFTixRQUFBLE1BQUEsa0JBQUEsTUFBQSxHQUFBO0FBQ0EsV0FBQSxNQUFBLE1BQUEsR0FBQSxNQUFBLEVBQUEsVUFBQSxJQUFBLEdBQUEsR0FBQTtBQUNGO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLFFBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLDBDQUFBOyJ9
