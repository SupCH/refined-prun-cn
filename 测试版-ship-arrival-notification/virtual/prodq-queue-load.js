import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { sumBy } from './sum-by.js';
import { percent2 } from './format.js';
import { productionStore } from './production.js';
import { refPrunId } from './attributes.js';
import { createReactiveDiv } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const parameter = tile.parameter;
  if (!parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.ProductionQueue.table), table => {
    subscribe($$(table, 'tr'), x => onRowReady(x, parameter));
  });
}
function onRowReady(row, lineId) {
  const orderId = refPrunId(row);
  const load = computed(() => {
    const line = productionStore.getById(lineId);
    const queue = line?.orders.filter(x => !x.started && !!x.duration);
    if (!queue) {
      return void 0;
    }
    const order = queue.find(o => o.id === orderId.value);
    if (!order) {
      return void 0;
    }
    const totalQueueDuration = sumBy(queue, x => x.duration.millis);
    return percent2(order.duration.millis / totalQueueDuration);
  });
  const div = createReactiveDiv(row, load);
  keepLast(row, () => row.children[6], div);
}
function init() {
  tiles.observe('PRODQ', onTileReady);
}
features.add(import.meta.url, init, 'PRODQ: Adds a daily load percentage label to queued orders.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHEtcXVldWUtbG9hZC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL3Byb2RxLXF1ZXVlLWxvYWQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3VtQnkgfSBmcm9tICdAc3JjL3V0aWxzL3N1bS1ieSc7XG5pbXBvcnQgeyBwZXJjZW50MiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IHByb2R1Y3Rpb25TdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9wcm9kdWN0aW9uJztcbmltcG9ydCB7IHJlZlBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IGNyZWF0ZVJlYWN0aXZlRGl2IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1lbGVtZW50JztcbmltcG9ydCB7IGtlZXBMYXN0IH0gZnJvbSAnQHNyYy91dGlscy9rZWVwLWxhc3QnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBwYXJhbWV0ZXIgPSB0aWxlLnBhcmFtZXRlcjtcbiAgaWYgKCFwYXJhbWV0ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlByb2R1Y3Rpb25RdWV1ZS50YWJsZSksIHRhYmxlID0+IHtcbiAgICBzdWJzY3JpYmUoJCQodGFibGUsICd0cicpLCB4ID0+IG9uUm93UmVhZHkoeCwgcGFyYW1ldGVyKSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvblJvd1JlYWR5KHJvdzogSFRNTFRhYmxlUm93RWxlbWVudCwgbGluZUlkOiBzdHJpbmcpIHtcbiAgY29uc3Qgb3JkZXJJZCA9IHJlZlBydW5JZChyb3cpO1xuICBjb25zdCBsb2FkID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGxpbmUgPSBwcm9kdWN0aW9uU3RvcmUuZ2V0QnlJZChsaW5lSWQpO1xuICAgIGNvbnN0IHF1ZXVlID0gbGluZT8ub3JkZXJzLmZpbHRlcih4ID0+ICF4LnN0YXJ0ZWQgJiYgISF4LmR1cmF0aW9uKTtcbiAgICBpZiAoIXF1ZXVlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBjb25zdCBvcmRlciA9IHF1ZXVlLmZpbmQobyA9PiBvLmlkID09PSBvcmRlcklkLnZhbHVlKTtcbiAgICBpZiAoIW9yZGVyKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IHRvdGFsUXVldWVEdXJhdGlvbiA9IHN1bUJ5KHF1ZXVlLCB4ID0+IHguZHVyYXRpb24hLm1pbGxpcyk7XG4gICAgcmV0dXJuIHBlcmNlbnQyKG9yZGVyLmR1cmF0aW9uIS5taWxsaXMgLyB0b3RhbFF1ZXVlRHVyYXRpb24pO1xuICB9KTtcbiAgY29uc3QgZGl2ID0gY3JlYXRlUmVhY3RpdmVEaXYocm93LCBsb2FkKTtcbiAga2VlcExhc3Qocm93LCAoKSA9PiByb3cuY2hpbGRyZW5bNl0sIGRpdik7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ1BST0RRJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnUFJPRFE6IEFkZHMgYSBkYWlseSBsb2FkIHBlcmNlbnRhZ2UgbGFiZWwgdG8gcXVldWVkIG9yZGVycy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFPQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFFBQUEsWUFBQSxLQUFBO0FBQ0EsTUFBQSxDQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFFRixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsZ0JBQUEsS0FBQSxHQUFBLENBQUEsVUFBQTtBQUNFLGNBQUEsR0FBQSxPQUFBLElBQUEsR0FBQSxDQUFBLE1BQUEsV0FBQSxHQUFBLFNBQUEsQ0FBQTtBQUFBLEVBQXdELENBQUE7QUFFNUQ7QUFFQSxTQUFBLFdBQUEsS0FBQSxRQUFBO0FBQ0UsUUFBQSxVQUFBLFVBQUEsR0FBQTtBQUNBLFFBQUEsT0FBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLE9BQUEsZ0JBQUEsUUFBQSxNQUFBO0FBQ0EsVUFBQSxRQUFBLE1BQUEsT0FBQSxPQUFBLENBQUEsTUFBQSxDQUFBLEVBQUEsV0FBQSxDQUFBLENBQUEsRUFBQSxRQUFBO0FBQ0EsUUFBQSxDQUFBLE9BQUE7QUFDRSxhQUFBO0FBQUEsSUFBTztBQUVULFVBQUEsUUFBQSxNQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsT0FBQSxRQUFBLEtBQUE7QUFDQSxRQUFBLENBQUEsT0FBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBR1QsVUFBQSxxQkFBQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxNQUFBO0FBQ0EsV0FBQSxTQUFBLE1BQUEsU0FBQSxTQUFBLGtCQUFBO0FBQUEsRUFBMkQsQ0FBQTtBQUU3RCxRQUFBLE1BQUEsa0JBQUEsS0FBQSxJQUFBO0FBQ0EsV0FBQSxLQUFBLE1BQUEsSUFBQSxTQUFBLENBQUEsR0FBQSxHQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsU0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsNkRBQUE7In0=
