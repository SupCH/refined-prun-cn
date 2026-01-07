import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { materialsStore } from './materials.js';
import { materialCategoriesStore, toSerializableCategoryName } from './material-categories.js';
import { showBuffer } from './buffers.js';
function onTileReady(tile) {
  const parameter = tile.parameter;
  const material = materialsStore.getByTicker(parameter);
  const category = materialCategoriesStore.getById(material?.category);
  if (!category) {
    return;
  }
  subscribe($$(tile.anchor, C.MaterialInformation.container), async container => {
    const fields = _$$(container, C.StaticInput.static);
    const categoryField = fields[1];
    if (categoryField === void 0) {
      return;
    }
    categoryField.classList.add(C.Link.link);
    categoryField.addEventListener('click', () => {
      showBuffer('XIT MATS ' + toSerializableCategoryName(category.name));
    });
  });
}
function init() {
  tiles.observe('MAT', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'MAT: Makes material category clickable and leading to XIT MATS with the material category.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWxpbmtpZnktY2F0ZWdvcnkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9tYXQtbGlua2lmeS1jYXRlZ29yeS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuaW1wb3J0IHtcbiAgbWF0ZXJpYWxDYXRlZ29yaWVzU3RvcmUsXG4gIHRvU2VyaWFsaXphYmxlQ2F0ZWdvcnlOYW1lLFxufSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWwtY2F0ZWdvcmllcyc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBwYXJhbWV0ZXIgPSB0aWxlLnBhcmFtZXRlcjtcbiAgY29uc3QgbWF0ZXJpYWwgPSBtYXRlcmlhbHNTdG9yZS5nZXRCeVRpY2tlcihwYXJhbWV0ZXIpO1xuICBjb25zdCBjYXRlZ29yeSA9IG1hdGVyaWFsQ2F0ZWdvcmllc1N0b3JlLmdldEJ5SWQobWF0ZXJpYWw/LmNhdGVnb3J5KTtcbiAgaWYgKCFjYXRlZ29yeSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5NYXRlcmlhbEluZm9ybWF0aW9uLmNvbnRhaW5lciksIGFzeW5jIGNvbnRhaW5lciA9PiB7XG4gICAgY29uc3QgZmllbGRzID0gXyQkKGNvbnRhaW5lciwgQy5TdGF0aWNJbnB1dC5zdGF0aWMpO1xuICAgIGNvbnN0IGNhdGVnb3J5RmllbGQgPSBmaWVsZHNbMV07XG4gICAgaWYgKGNhdGVnb3J5RmllbGQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNhdGVnb3J5RmllbGQuY2xhc3NMaXN0LmFkZChDLkxpbmsubGluayk7XG4gICAgY2F0ZWdvcnlGaWVsZC5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHtcbiAgICAgIHNob3dCdWZmZXIoJ1hJVCBNQVRTICcgKyB0b1NlcmlhbGl6YWJsZUNhdGVnb3J5TmFtZShjYXRlZ29yeS5uYW1lKSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdNQVQnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnTUFUOiBNYWtlcyBtYXRlcmlhbCBjYXRlZ29yeSBjbGlja2FibGUgYW5kIGxlYWRpbmcgdG8gWElUIE1BVFMgd2l0aCB0aGUgbWF0ZXJpYWwgY2F0ZWdvcnkuJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFPQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFFBQUEsWUFBQSxLQUFBO0FBQ0EsUUFBQSxXQUFBLGVBQUEsWUFBQSxTQUFBO0FBQ0EsUUFBQSxXQUFBLHdCQUFBLFFBQUEsVUFBQSxRQUFBO0FBQ0EsTUFBQSxDQUFBLFVBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsb0JBQUEsU0FBQSxHQUFBLE9BQUEsY0FBQTtBQUNFLFVBQUEsU0FBQSxJQUFBLFdBQUEsRUFBQSxZQUFBLE1BQUE7QUFDQSxVQUFBLGdCQUFBLE9BQUEsQ0FBQTtBQUNBLFFBQUEsa0JBQUEsUUFBQTtBQUNFO0FBQUEsSUFBQTtBQUdGLGtCQUFBLFVBQUEsSUFBQSxFQUFBLEtBQUEsSUFBQTtBQUNBLGtCQUFBLGlCQUFBLFNBQUEsTUFBQTtBQUNFLGlCQUFBLGNBQUEsMkJBQUEsU0FBQSxJQUFBLENBQUE7QUFBQSxJQUFrRSxDQUFBO0FBQUEsRUFDbkUsQ0FBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLE9BQUEsV0FBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
