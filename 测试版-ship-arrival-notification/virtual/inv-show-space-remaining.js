import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { fixed02 } from './format.js';
import { getInvStore } from './store-id.js';
import { createReactiveSpan } from './reactive-element.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const store = computed(() => getInvStore(tile.parameter));
  const [weightIndex, volumeIndex] = tile.command === 'SHPI' ? [0, 1] : [1, 2];
  subscribe($$(tile.anchor, C.StoreView.column), column => {
    const capacities = _$$(column, C.StoreView.capacity);
    if (capacities.length < 2) {
      return;
    }
    const weightText = computed(() =>
      store.value ? ` (${fixed02(store.value.weightCapacity - store.value.weightLoad)}t)` : void 0,
    );
    const weightSpan = createReactiveSpan(capacities[weightIndex], weightText);
    weightSpan.style.whiteSpace = 'pre';
    capacities[weightIndex].appendChild(weightSpan);
    const volumeText = computed(() =>
      store.value ? ` (${fixed02(store.value.volumeCapacity - store.value.volumeLoad)}m³)` : void 0,
    );
    const volumeSpan = createReactiveSpan(capacities[volumeIndex], volumeText);
    volumeSpan.style.whiteSpace = 'pre';
    capacities[volumeIndex].appendChild(volumeSpan);
  });
}
function init() {
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'INV/SHPI: Shows the remaining weight and volume capacity of the selected store in INV and SHPI',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LXNob3ctc3BhY2UtcmVtYWluaW5nLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaW52LXNob3ctc3BhY2UtcmVtYWluaW5nLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZpeGVkMDIgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyBnZXRJbnZTdG9yZSB9IGZyb20gJ0BzcmMvY29yZS9zdG9yZS1pZCc7XG5pbXBvcnQgeyBjcmVhdGVSZWFjdGl2ZVNwYW4gfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWVsZW1lbnQnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBzdG9yZSA9IGNvbXB1dGVkKCgpID0+IGdldEludlN0b3JlKHRpbGUucGFyYW1ldGVyKSk7XG4gIGNvbnN0IFt3ZWlnaHRJbmRleCwgdm9sdW1lSW5kZXhdID0gdGlsZS5jb21tYW5kID09PSAnU0hQSScgPyBbMCwgMV0gOiBbMSwgMl07XG5cbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlN0b3JlVmlldy5jb2x1bW4pLCBjb2x1bW4gPT4ge1xuICAgIGNvbnN0IGNhcGFjaXRpZXMgPSBfJCQoY29sdW1uLCBDLlN0b3JlVmlldy5jYXBhY2l0eSk7XG4gICAgaWYgKGNhcGFjaXRpZXMubGVuZ3RoIDwgMikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHdlaWdodFRleHQgPSBjb21wdXRlZCgoKSA9PlxuICAgICAgc3RvcmUudmFsdWVcbiAgICAgICAgPyBgICgke2ZpeGVkMDIoc3RvcmUudmFsdWUud2VpZ2h0Q2FwYWNpdHkgLSBzdG9yZS52YWx1ZS53ZWlnaHRMb2FkKX10KWBcbiAgICAgICAgOiB1bmRlZmluZWQsXG4gICAgKTtcblxuICAgIGNvbnN0IHdlaWdodFNwYW4gPSBjcmVhdGVSZWFjdGl2ZVNwYW4oY2FwYWNpdGllc1t3ZWlnaHRJbmRleF0sIHdlaWdodFRleHQpO1xuICAgIHdlaWdodFNwYW4uc3R5bGUud2hpdGVTcGFjZSA9ICdwcmUnO1xuICAgIGNhcGFjaXRpZXNbd2VpZ2h0SW5kZXhdLmFwcGVuZENoaWxkKHdlaWdodFNwYW4pO1xuXG4gICAgY29uc3Qgdm9sdW1lVGV4dCA9IGNvbXB1dGVkKCgpID0+XG4gICAgICBzdG9yZS52YWx1ZVxuICAgICAgICA/IGAgKCR7Zml4ZWQwMihzdG9yZS52YWx1ZS52b2x1bWVDYXBhY2l0eSAtIHN0b3JlLnZhbHVlLnZvbHVtZUxvYWQpfW3CsylgXG4gICAgICAgIDogdW5kZWZpbmVkLFxuICAgICk7XG5cbiAgICBjb25zdCB2b2x1bWVTcGFuID0gY3JlYXRlUmVhY3RpdmVTcGFuKGNhcGFjaXRpZXNbdm9sdW1lSW5kZXhdLCB2b2x1bWVUZXh0KTtcbiAgICB2b2x1bWVTcGFuLnN0eWxlLndoaXRlU3BhY2UgPSAncHJlJztcbiAgICBjYXBhY2l0aWVzW3ZvbHVtZUluZGV4XS5hcHBlbmRDaGlsZCh2b2x1bWVTcGFuKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydJTlYnLCAnU0hQSSddLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnSU5WL1NIUEk6IFNob3dzIHRoZSByZW1haW5pbmcgd2VpZ2h0IGFuZCB2b2x1bWUgY2FwYWNpdHkgb2YgdGhlIHNlbGVjdGVkIHN0b3JlIGluIElOViBhbmQgU0hQSScsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUlBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsUUFBQSxRQUFBLFNBQUEsTUFBQSxZQUFBLEtBQUEsU0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLGFBQUEsV0FBQSxJQUFBLEtBQUEsWUFBQSxTQUFBLENBQUEsR0FBQSxDQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFFQSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsVUFBQSxNQUFBLEdBQUEsQ0FBQSxXQUFBO0FBQ0UsVUFBQSxhQUFBLElBQUEsUUFBQSxFQUFBLFVBQUEsUUFBQTtBQUNBLFFBQUEsV0FBQSxTQUFBLEdBQUE7QUFDRTtBQUFBLElBQUE7QUFHRixVQUFBLGFBQUE7QUFBQSxNQUFtQixNQUFBLE1BQUEsUUFBQSxLQUFBLFFBQUEsTUFBQSxNQUFBLGlCQUFBLE1BQUEsTUFBQSxVQUFBLENBQUEsT0FBQTtBQUFBLElBR2I7QUFHTixVQUFBLGFBQUEsbUJBQUEsV0FBQSxXQUFBLEdBQUEsVUFBQTtBQUNBLGVBQUEsTUFBQSxhQUFBO0FBQ0EsZUFBQSxXQUFBLEVBQUEsWUFBQSxVQUFBO0FBRUEsVUFBQSxhQUFBO0FBQUEsTUFBbUIsTUFBQSxNQUFBLFFBQUEsS0FBQSxRQUFBLE1BQUEsTUFBQSxpQkFBQSxNQUFBLE1BQUEsVUFBQSxDQUFBLFFBQUE7QUFBQSxJQUdiO0FBR04sVUFBQSxhQUFBLG1CQUFBLFdBQUEsV0FBQSxHQUFBLFVBQUE7QUFDQSxlQUFBLE1BQUEsYUFBQTtBQUNBLGVBQUEsV0FBQSxFQUFBLFlBQUEsVUFBQTtBQUFBLEVBQThDLENBQUE7QUFFbEQ7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsQ0FBQSxPQUFBLE1BQUEsR0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
