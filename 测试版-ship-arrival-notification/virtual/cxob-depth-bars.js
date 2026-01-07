import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './cxob-depth-bars.module.css.js';
import tableAlternatingColors from './table-rows-alternating-colors.module.css.js';
import { cxobStore } from './cxob.js';
import { clamp } from './clamp.js';
import { isFiniteOrder } from './orders.js';
import { refPrunId } from './attributes.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const orderDepths = computed(() => {
    const orderBook = cxobStore.getByTicker(tile.parameter);
    if (!orderBook) {
      return void 0;
    }
    const maxDepth = Math.max(
      calculateDepth(orderBook.sellingOrders),
      calculateDepth(orderBook.buyingOrders),
    );
    const depths = /* @__PURE__ */ new Map();
    fillOrderDepths(depths, orderBook.sellingOrders, maxDepth);
    fillOrderDepths(depths, orderBook.buyingOrders, maxDepth);
    return depths;
  });
  subscribe($$(tile.anchor, C.ScrollView.view), scroll => {
    subscribe($$(scroll, 'table'), async table => {
      const tbodies = _$$(table, 'tbody');
      const askSection = tbodies[0];
      const bidSection = tbodies[2];
      if (askSection === void 0 || bidSection === void 0) {
        return;
      }
      table.classList.add(tableAlternatingColors.optOut);
      askSection.classList.add($style.tbody, $style.asks);
      bidSection.classList.add($style.tbody, $style.bids);
      subscribe($$(table, 'tr'), row => {
        const id = refPrunId(row);
        watchEffectWhileNodeAlive(row, () => {
          const depth = orderDepths.value?.get(id.value ?? '') ?? 0;
          row.style.setProperty('--rp-market-depth', `${depth}%`);
        });
      });
    });
  });
}
function calculateDepth(orders) {
  let depth = 0;
  for (const order of orders) {
    if (!isFiniteOrder(order)) {
      break;
    }
    depth += order.amount;
  }
  return depth;
}
function fillOrderDepths(depths, orders, maxDepth) {
  let accumulated = 0;
  let hitMM = false;
  for (const order of orders) {
    if (!isFiniteOrder(order)) {
      hitMM = true;
      depths.set(order.id, 0);
      continue;
    }
    if (hitMM) {
      depths.set(order.id, 0);
      continue;
    }
    accumulated += order.amount;
    depths.set(order.id, clamp((accumulated / maxDepth) * 100, 0, 100));
  }
}
function init() {
  tiles.observe('CXOB', onTileReady);
}
features.add(import.meta.url, init, 'CXOB: Adds market depth bars.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hvYi1kZXB0aC1iYXJzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvY3hvYi1kZXB0aC1iYXJzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9jeG9iLWRlcHRoLWJhcnMubW9kdWxlLmNzcyc7XG5pbXBvcnQgdGFibGVBbHRlcm5hdGluZ0NvbG9ycyBmcm9tICcuLi9iYXNpYy90YWJsZS1yb3dzLWFsdGVybmF0aW5nLWNvbG9ycy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IGN4b2JTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jeG9iJztcbmltcG9ydCB7IGNsYW1wIH0gZnJvbSAnQHNyYy91dGlscy9jbGFtcCc7XG5pbXBvcnQgeyBpc0Zpbml0ZU9yZGVyIH0gZnJvbSAnQHNyYy9jb3JlL29yZGVycyc7XG5pbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIGNvbnN0IG9yZGVyRGVwdGhzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG9yZGVyQm9vayA9IGN4b2JTdG9yZS5nZXRCeVRpY2tlcih0aWxlLnBhcmFtZXRlcik7XG4gICAgaWYgKCFvcmRlckJvb2spIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGNvbnN0IG1heERlcHRoID0gTWF0aC5tYXgoXG4gICAgICBjYWxjdWxhdGVEZXB0aChvcmRlckJvb2suc2VsbGluZ09yZGVycyksXG4gICAgICBjYWxjdWxhdGVEZXB0aChvcmRlckJvb2suYnV5aW5nT3JkZXJzKSxcbiAgICApO1xuICAgIGNvbnN0IGRlcHRocyA9IG5ldyBNYXA8c3RyaW5nLCBudW1iZXI+KCk7XG4gICAgZmlsbE9yZGVyRGVwdGhzKGRlcHRocywgb3JkZXJCb29rLnNlbGxpbmdPcmRlcnMsIG1heERlcHRoKTtcbiAgICBmaWxsT3JkZXJEZXB0aHMoZGVwdGhzLCBvcmRlckJvb2suYnV5aW5nT3JkZXJzLCBtYXhEZXB0aCk7XG4gICAgcmV0dXJuIGRlcHRocztcbiAgfSk7XG5cbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlNjcm9sbFZpZXcudmlldyksIHNjcm9sbCA9PiB7XG4gICAgc3Vic2NyaWJlKCQkKHNjcm9sbCwgJ3RhYmxlJyksIGFzeW5jIHRhYmxlID0+IHtcbiAgICAgIGNvbnN0IHRib2RpZXMgPSBfJCQodGFibGUsICd0Ym9keScpO1xuICAgICAgY29uc3QgYXNrU2VjdGlvbiA9IHRib2RpZXNbMF07XG4gICAgICBjb25zdCBiaWRTZWN0aW9uID0gdGJvZGllc1syXTtcbiAgICAgIGlmIChhc2tTZWN0aW9uID09PSB1bmRlZmluZWQgfHwgYmlkU2VjdGlvbiA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRhYmxlLmNsYXNzTGlzdC5hZGQodGFibGVBbHRlcm5hdGluZ0NvbG9ycy5vcHRPdXQpO1xuICAgICAgYXNrU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCRzdHlsZS50Ym9keSwgJHN0eWxlLmFza3MpO1xuICAgICAgYmlkU2VjdGlvbi5jbGFzc0xpc3QuYWRkKCRzdHlsZS50Ym9keSwgJHN0eWxlLmJpZHMpO1xuXG4gICAgICBzdWJzY3JpYmUoJCQodGFibGUsICd0cicpLCByb3cgPT4ge1xuICAgICAgICBjb25zdCBpZCA9IHJlZlBydW5JZChyb3cpO1xuICAgICAgICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKHJvdywgKCkgPT4ge1xuICAgICAgICAgIGNvbnN0IGRlcHRoID0gb3JkZXJEZXB0aHMudmFsdWU/LmdldChpZC52YWx1ZSA/PyAnJykgPz8gMDtcbiAgICAgICAgICByb3cuc3R5bGUuc2V0UHJvcGVydHkoJy0tcnAtbWFya2V0LWRlcHRoJywgYCR7ZGVwdGh9JWApO1xuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlRGVwdGgob3JkZXJzOiBQcnVuQXBpLkNYQnJva2VyT3JkZXJbXSkge1xuICBsZXQgZGVwdGggPSAwO1xuICBmb3IgKGNvbnN0IG9yZGVyIG9mIG9yZGVycykge1xuICAgIGlmICghaXNGaW5pdGVPcmRlcihvcmRlcikpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBkZXB0aCArPSBvcmRlci5hbW91bnQ7XG4gIH1cbiAgcmV0dXJuIGRlcHRoO1xufVxuXG5mdW5jdGlvbiBmaWxsT3JkZXJEZXB0aHMoXG4gIGRlcHRoczogTWFwPHN0cmluZywgbnVtYmVyPixcbiAgb3JkZXJzOiBQcnVuQXBpLkNYQnJva2VyT3JkZXJbXSxcbiAgbWF4RGVwdGg6IG51bWJlcixcbikge1xuICBsZXQgYWNjdW11bGF0ZWQgPSAwO1xuICBsZXQgaGl0TU0gPSBmYWxzZTtcbiAgZm9yIChjb25zdCBvcmRlciBvZiBvcmRlcnMpIHtcbiAgICBpZiAoIWlzRmluaXRlT3JkZXIob3JkZXIpKSB7XG4gICAgICBoaXRNTSA9IHRydWU7XG4gICAgICBkZXB0aHMuc2V0KG9yZGVyLmlkLCAwKTtcbiAgICAgIGNvbnRpbnVlO1xuICAgIH1cbiAgICBpZiAoaGl0TU0pIHtcbiAgICAgIGRlcHRocy5zZXQob3JkZXIuaWQsIDApO1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGFjY3VtdWxhdGVkICs9IG9yZGVyLmFtb3VudDtcbiAgICBkZXB0aHMuc2V0KG9yZGVyLmlkLCBjbGFtcCgoYWNjdW11bGF0ZWQgLyBtYXhEZXB0aCkgKiAxMDAsIDAsIDEwMCkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0NYT0InLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdDWE9COiBBZGRzIG1hcmtldCBkZXB0aCBiYXJzLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFRQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFFBQUEsY0FBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLFlBQUEsVUFBQSxZQUFBLEtBQUEsU0FBQTtBQUNBLFFBQUEsQ0FBQSxXQUFBO0FBQ0UsYUFBQTtBQUFBLElBQU87QUFFVCxVQUFBLFdBQUEsS0FBQTtBQUFBLE1BQXNCLGVBQUEsVUFBQSxhQUFBO0FBQUEsTUFDa0IsZUFBQSxVQUFBLFlBQUE7QUFBQSxJQUNEO0FBRXZDLFVBQUEsU0FBQSxvQkFBQSxJQUFBO0FBQ0Esb0JBQUEsUUFBQSxVQUFBLGVBQUEsUUFBQTtBQUNBLG9CQUFBLFFBQUEsVUFBQSxjQUFBLFFBQUE7QUFDQSxXQUFBO0FBQUEsRUFBTyxDQUFBO0FBR1QsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFdBQUEsSUFBQSxHQUFBLENBQUEsV0FBQTtBQUNFLGNBQUEsR0FBQSxRQUFBLE9BQUEsR0FBQSxPQUFBLFVBQUE7QUFDRSxZQUFBLFVBQUEsSUFBQSxPQUFBLE9BQUE7QUFDQSxZQUFBLGFBQUEsUUFBQSxDQUFBO0FBQ0EsWUFBQSxhQUFBLFFBQUEsQ0FBQTtBQUNBLFVBQUEsZUFBQSxVQUFBLGVBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLFlBQUEsVUFBQSxJQUFBLHVCQUFBLE1BQUE7QUFDQSxpQkFBQSxVQUFBLElBQUEsT0FBQSxPQUFBLE9BQUEsSUFBQTtBQUNBLGlCQUFBLFVBQUEsSUFBQSxPQUFBLE9BQUEsT0FBQSxJQUFBO0FBRUEsZ0JBQUEsR0FBQSxPQUFBLElBQUEsR0FBQSxDQUFBLFFBQUE7QUFDRSxjQUFBLEtBQUEsVUFBQSxHQUFBO0FBQ0Esa0NBQUEsS0FBQSxNQUFBO0FBQ0UsZ0JBQUEsUUFBQSxZQUFBLE9BQUEsSUFBQSxHQUFBLFNBQUEsRUFBQSxLQUFBO0FBQ0EsY0FBQSxNQUFBLFlBQUEscUJBQUEsR0FBQSxLQUFBLEdBQUE7QUFBQSxRQUFzRCxDQUFBO0FBQUEsTUFDdkQsQ0FBQTtBQUFBLElBQ0YsQ0FBQTtBQUFBLEVBQ0YsQ0FBQTtBQUVMO0FBRUEsU0FBQSxlQUFBLFFBQUE7QUFDRSxNQUFBLFFBQUE7QUFDQSxhQUFBLFNBQUEsUUFBQTtBQUNFLFFBQUEsQ0FBQSxjQUFBLEtBQUEsR0FBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLGFBQUEsTUFBQTtBQUFBLEVBQWU7QUFFakIsU0FBQTtBQUNGO0FBRUEsU0FBQSxnQkFBQSxRQUFBLFFBQUEsVUFBQTtBQUtFLE1BQUEsY0FBQTtBQUNBLE1BQUEsUUFBQTtBQUNBLGFBQUEsU0FBQSxRQUFBO0FBQ0UsUUFBQSxDQUFBLGNBQUEsS0FBQSxHQUFBO0FBQ0UsY0FBQTtBQUNBLGFBQUEsSUFBQSxNQUFBLElBQUEsQ0FBQTtBQUNBO0FBQUEsSUFBQTtBQUVGLFFBQUEsT0FBQTtBQUNFLGFBQUEsSUFBQSxNQUFBLElBQUEsQ0FBQTtBQUNBO0FBQUEsSUFBQTtBQUVGLG1CQUFBLE1BQUE7QUFDQSxXQUFBLElBQUEsTUFBQSxJQUFBLE1BQUEsY0FBQSxXQUFBLEtBQUEsR0FBQSxHQUFBLENBQUE7QUFBQSxFQUFrRTtBQUV0RTtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwrQkFBQTsifQ==
