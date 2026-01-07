import { subscribe } from './subscribe-async-generator.js';
import { $$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { productionStore } from './production.js';
import { formatEta } from './format.js';
import { timestampEachMinute } from './dayjs.js';
import { createReactiveDiv } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import $style from './prodq-order-eta.module.css.js';
import { calcCompletionDate } from './production-line.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ProductionQueue.table), table => {
    subscribe($$(table, 'tr'), order => {
      if (_$(order, 'th')) {
        return;
      }
      onOrderSlotReady(order.children[5], order, tile.parameter);
    });
  });
}
function onOrderSlotReady(slot, order, siteId) {
  const orderId = refPrunId(order);
  const completion = computed(() => {
    const line = productionStore.getById(siteId);
    for (const order2 of line?.orders ?? []) {
      if (order2.id === orderId.value) {
        return calcCompletionDate(line, order2);
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
  keepLast(slot, () => slot, div);
}
function init() {
  applyCssRule('PRODQ', `.${C.ProductionQueue.table}`, $style.table);
  tiles.observe('PRODQ', onTileReady);
}
features.add(import.meta.url, init, 'PRODQ: Adds a finish ETA label to orders.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHEtb3JkZXItZXRhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvcHJvZHEtb3JkZXItZXRhLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHJlZlBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IHByb2R1Y3Rpb25TdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9wcm9kdWN0aW9uJztcbmltcG9ydCB7IGZvcm1hdEV0YSB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IHRpbWVzdGFtcEVhY2hNaW51dGUgfSBmcm9tICdAc3JjL3V0aWxzL2RheWpzJztcbmltcG9ydCB7IGNyZWF0ZVJlYWN0aXZlRGl2IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1lbGVtZW50JztcbmltcG9ydCB7IGtlZXBMYXN0IH0gZnJvbSAnQHNyYy91dGlscy9rZWVwLWxhc3QnO1xuaW1wb3J0ICRzdHlsZSBmcm9tICcuL3Byb2RxLW9yZGVyLWV0YS5tb2R1bGUuY3NzJztcbmltcG9ydCB7IGNhbGNDb21wbGV0aW9uRGF0ZSB9IGZyb20gJ0BzcmMvY29yZS9wcm9kdWN0aW9uLWxpbmUnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuUHJvZHVjdGlvblF1ZXVlLnRhYmxlKSwgdGFibGUgPT4ge1xuICAgIHN1YnNjcmliZSgkJCh0YWJsZSwgJ3RyJyksIG9yZGVyID0+IHtcbiAgICAgIGlmIChfJChvcmRlciwgJ3RoJykpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgb25PcmRlclNsb3RSZWFkeShvcmRlci5jaGlsZHJlbls1XSBhcyBIVE1MRWxlbWVudCwgb3JkZXIsIHRpbGUucGFyYW1ldGVyISk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbk9yZGVyU2xvdFJlYWR5KHNsb3Q6IEhUTUxFbGVtZW50LCBvcmRlcjogSFRNTEVsZW1lbnQsIHNpdGVJZDogc3RyaW5nKSB7XG4gIGNvbnN0IG9yZGVySWQgPSByZWZQcnVuSWQob3JkZXIpO1xuICBjb25zdCBjb21wbGV0aW9uID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGxpbmUgPSBwcm9kdWN0aW9uU3RvcmUuZ2V0QnlJZChzaXRlSWQpO1xuICAgIGZvciAoY29uc3Qgb3JkZXIgb2YgbGluZT8ub3JkZXJzID8/IFtdKSB7XG4gICAgICBpZiAob3JkZXIuaWQgPT09IG9yZGVySWQudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuIGNhbGNDb21wbGV0aW9uRGF0ZShsaW5lISwgb3JkZXIpO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9KTtcbiAgY29uc3QgZXRhID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIHJldHVybiBjb21wbGV0aW9uLnZhbHVlICE9PSB1bmRlZmluZWRcbiAgICAgID8gYCgke2Zvcm1hdEV0YSh0aW1lc3RhbXBFYWNoTWludXRlLnZhbHVlLCBjb21wbGV0aW9uLnZhbHVlKX0pYFxuICAgICAgOiB1bmRlZmluZWQ7XG4gIH0pO1xuICBjb25zdCBkaXYgPSBjcmVhdGVSZWFjdGl2ZURpdihzbG90LCBldGEpO1xuICBrZWVwTGFzdChzbG90LCAoKSA9PiBzbG90LCBkaXYpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoJ1BST0RRJywgYC4ke0MuUHJvZHVjdGlvblF1ZXVlLnRhYmxlfWAsICRzdHlsZS50YWJsZSk7XG4gIHRpbGVzLm9ic2VydmUoJ1BST0RRJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnUFJPRFE6IEFkZHMgYSBmaW5pc2ggRVRBIGxhYmVsIHRvIG9yZGVycy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFTQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxnQkFBQSxLQUFBLEdBQUEsQ0FBQSxVQUFBO0FBQ0UsY0FBQSxHQUFBLE9BQUEsSUFBQSxHQUFBLENBQUEsVUFBQTtBQUNFLFVBQUEsR0FBQSxPQUFBLElBQUEsR0FBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLHVCQUFBLE1BQUEsU0FBQSxDQUFBLEdBQUEsT0FBQSxLQUFBLFNBQUE7QUFBQSxJQUF5RSxDQUFBO0FBQUEsRUFDMUUsQ0FBQTtBQUVMO0FBRUEsU0FBQSxpQkFBQSxNQUFBLE9BQUEsUUFBQTtBQUNFLFFBQUEsVUFBQSxVQUFBLEtBQUE7QUFDQSxRQUFBLGFBQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxPQUFBLGdCQUFBLFFBQUEsTUFBQTtBQUNBLGVBQUEsVUFBQSxNQUFBLFVBQUEsQ0FBQSxHQUFBO0FBQ0UsVUFBQSxPQUFBLE9BQUEsUUFBQSxPQUFBO0FBQ0UsZUFBQSxtQkFBQSxNQUFBLE1BQUE7QUFBQSxNQUFzQztBQUFBLElBQ3hDO0FBRUYsV0FBQTtBQUFBLEVBQU8sQ0FBQTtBQUVULFFBQUEsTUFBQSxTQUFBLE1BQUE7QUFDRSxXQUFBLFdBQUEsVUFBQSxTQUFBLElBQUEsVUFBQSxvQkFBQSxPQUFBLFdBQUEsS0FBQSxDQUFBLE1BQUE7QUFBQSxFQUVJLENBQUE7QUFFTixRQUFBLE1BQUEsa0JBQUEsTUFBQSxHQUFBO0FBQ0EsV0FBQSxNQUFBLE1BQUEsTUFBQSxHQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRSxlQUFBLFNBQUEsSUFBQSxFQUFBLGdCQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUE7QUFDQSxRQUFBLFFBQUEsU0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsMkNBQUE7In0=
