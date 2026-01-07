import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { storagesStore } from './storage.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, 'tr'), row => {
    const id = refPrunId(row);
    const name = computed(() => {
      const storage = storagesStore.getById(id.value);
      switch (storage?.type) {
        case 'STORE':
          return 'Base';
        case 'WAREHOUSE_STORE':
          return 'WAR';
        case 'SHIP_STORE':
          return 'Ship';
        case 'STL_FUEL_STORE':
          return 'STL';
        case 'FTL_FUEL_STORE':
          return 'FTL';
        default:
          return void 0;
      }
    });
    watchEffectWhileNodeAlive(row, () => {
      const typeLabel = row.firstChild?.firstChild;
      if (typeLabel && name.value !== void 0) {
        typeLabel.textContent = name.value;
      }
    });
  });
}
function init() {
  tiles.observe('INV', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'INV: Shortens storage type names in the first column of the main INV command.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LXNob3J0ZW4tc3RvcmFnZS10eXBlcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2ludi1zaG9ydGVuLXN0b3JhZ2UtdHlwZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmUHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgLy8gT25seSBzaG9ydGVuIG5hbWVzIGluIHRoZSBtYWluIElOViB0aWxlXG4gIGlmICh0aWxlLnBhcmFtZXRlcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIFNob3J0ZW4gc3RvcmFnZSB0eXBlc1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsICd0cicpLCByb3cgPT4ge1xuICAgIGNvbnN0IGlkID0gcmVmUHJ1bklkKHJvdyk7XG4gICAgY29uc3QgbmFtZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICAgIGNvbnN0IHN0b3JhZ2UgPSBzdG9yYWdlc1N0b3JlLmdldEJ5SWQoaWQudmFsdWUpO1xuICAgICAgc3dpdGNoIChzdG9yYWdlPy50eXBlKSB7XG4gICAgICAgIGNhc2UgJ1NUT1JFJzpcbiAgICAgICAgICByZXR1cm4gJ0Jhc2UnO1xuICAgICAgICBjYXNlICdXQVJFSE9VU0VfU1RPUkUnOlxuICAgICAgICAgIHJldHVybiAnV0FSJztcbiAgICAgICAgY2FzZSAnU0hJUF9TVE9SRSc6XG4gICAgICAgICAgcmV0dXJuICdTaGlwJztcbiAgICAgICAgY2FzZSAnU1RMX0ZVRUxfU1RPUkUnOlxuICAgICAgICAgIHJldHVybiAnU1RMJztcbiAgICAgICAgY2FzZSAnRlRMX0ZVRUxfU1RPUkUnOlxuICAgICAgICAgIHJldHVybiAnRlRMJztcbiAgICAgICAgZGVmYXVsdDpcbiAgICAgICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH0pO1xuICAgIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUocm93LCAoKSA9PiB7XG4gICAgICAvLyB0ciAtPiB0ZCAtPiBzcGFuXG4gICAgICBjb25zdCB0eXBlTGFiZWwgPSByb3cuZmlyc3RDaGlsZD8uZmlyc3RDaGlsZDtcbiAgICAgIGlmICh0eXBlTGFiZWwgJiYgbmFtZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgICAgIHR5cGVMYWJlbC50ZXh0Q29udGVudCA9IG5hbWUudmFsdWU7XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdJTlYnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnSU5WOiBTaG9ydGVucyBzdG9yYWdlIHR5cGUgbmFtZXMgaW4gdGhlIGZpcnN0IGNvbHVtbiBvZiB0aGUgbWFpbiBJTlYgY29tbWFuZC4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLFNBQUEsWUFBQSxNQUFBO0FBRUUsTUFBQSxLQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFJRixZQUFBLEdBQUEsS0FBQSxRQUFBLElBQUEsR0FBQSxDQUFBLFFBQUE7QUFDRSxVQUFBLEtBQUEsVUFBQSxHQUFBO0FBQ0EsVUFBQSxPQUFBLFNBQUEsTUFBQTtBQUNFLFlBQUEsVUFBQSxjQUFBLFFBQUEsR0FBQSxLQUFBO0FBQ0EsY0FBQSxTQUFBLE1BQUE7QUFBQSxRQUF1QixLQUFBO0FBRW5CLGlCQUFBO0FBQUEsUUFBTyxLQUFBO0FBRVAsaUJBQUE7QUFBQSxRQUFPLEtBQUE7QUFFUCxpQkFBQTtBQUFBLFFBQU8sS0FBQTtBQUVQLGlCQUFBO0FBQUEsUUFBTyxLQUFBO0FBRVAsaUJBQUE7QUFBQSxRQUFPO0FBRVAsaUJBQUE7QUFBQSxNQUFPO0FBQUEsSUFDWCxDQUFBO0FBRUYsOEJBQUEsS0FBQSxNQUFBO0FBRUUsWUFBQSxZQUFBLElBQUEsWUFBQTtBQUNBLFVBQUEsYUFBQSxLQUFBLFVBQUEsUUFBQTtBQUNFLGtCQUFBLGNBQUEsS0FBQTtBQUFBLE1BQTZCO0FBQUEsSUFDL0IsQ0FBQTtBQUFBLEVBQ0QsQ0FBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLE9BQUEsV0FBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
