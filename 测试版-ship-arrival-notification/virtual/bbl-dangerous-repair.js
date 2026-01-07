import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { isRepairableBuilding } from './buildings.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const siteId = tile.parameter;
  const site = computed(() => sitesStore.getById(siteId));
  subscribe($$(tile.anchor, C.SectionList.section), section => {
    const id = refPrunId(section);
    const building = computed(() => site.value?.platforms.find(p => p.id == id.value));
    subscribe($$(tile.anchor, C.SectionList.button), buttons => {
      const repair = buttons.children[0];
      if (repair === void 0) {
        return;
      }
      watchEffectWhileNodeAlive(repair, () => {
        if (!building.value || !isRepairableBuilding(building.value)) {
          return;
        }
        if (building.value.condition > 0.98) {
          repair.classList.add(C.Button.danger);
        } else {
          repair.classList.remove(C.Button.danger);
        }
      });
    });
  });
}
function init() {
  tiles.observe('BBL', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BBL: Applies the "danger" style to the "Repair" button if the building condition is >98%.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLWRhbmdlcm91cy1yZXBhaXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9iYmwtZGFuZ2Vyb3VzLXJlcGFpci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IGlzUmVwYWlyYWJsZUJ1aWxkaW5nIH0gZnJvbSAnQHNyYy9jb3JlL2J1aWxkaW5ncyc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIGNvbnN0IHNpdGVJZCA9IHRpbGUucGFyYW1ldGVyO1xuICBjb25zdCBzaXRlID0gY29tcHV0ZWQoKCkgPT4gc2l0ZXNTdG9yZS5nZXRCeUlkKHNpdGVJZCkpO1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2VjdGlvbkxpc3Quc2VjdGlvbiksIHNlY3Rpb24gPT4ge1xuICAgIGNvbnN0IGlkID0gcmVmUHJ1bklkKHNlY3Rpb24pO1xuICAgIGNvbnN0IGJ1aWxkaW5nID0gY29tcHV0ZWQoKCkgPT4gc2l0ZS52YWx1ZT8ucGxhdGZvcm1zLmZpbmQocCA9PiBwLmlkID09IGlkLnZhbHVlKSk7XG4gICAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlNlY3Rpb25MaXN0LmJ1dHRvbiksIGJ1dHRvbnMgPT4ge1xuICAgICAgY29uc3QgcmVwYWlyID0gYnV0dG9ucy5jaGlsZHJlblswXTtcbiAgICAgIGlmIChyZXBhaXIgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKHJlcGFpciwgKCkgPT4ge1xuICAgICAgICBpZiAoIWJ1aWxkaW5nLnZhbHVlIHx8ICFpc1JlcGFpcmFibGVCdWlsZGluZyhidWlsZGluZy52YWx1ZSkpIHtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cblxuICAgICAgICBpZiAoYnVpbGRpbmcudmFsdWUuY29uZGl0aW9uID4gMC45OCkge1xuICAgICAgICAgIHJlcGFpci5jbGFzc0xpc3QuYWRkKEMuQnV0dG9uLmRhbmdlcik7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgcmVwYWlyLmNsYXNzTGlzdC5yZW1vdmUoQy5CdXR0b24uZGFuZ2VyKTtcbiAgICAgICAgfVxuICAgICAgfSk7XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdCQkwnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnQkJMOiBBcHBsaWVzIHRoZSBcImRhbmdlclwiIHN0eWxlIHRvIHRoZSBcIlJlcGFpclwiIGJ1dHRvbiBpZiB0aGUgYnVpbGRpbmcgY29uZGl0aW9uIGlzID45OCUuJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUtBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsUUFBQSxTQUFBLEtBQUE7QUFDQSxRQUFBLE9BQUEsU0FBQSxNQUFBLFdBQUEsUUFBQSxNQUFBLENBQUE7QUFDQSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxPQUFBLEdBQUEsQ0FBQSxZQUFBO0FBQ0UsVUFBQSxLQUFBLFVBQUEsT0FBQTtBQUNBLFVBQUEsV0FBQSxTQUFBLE1BQUEsS0FBQSxPQUFBLFVBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLEdBQUEsS0FBQSxDQUFBO0FBQ0EsY0FBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFlBQUEsTUFBQSxHQUFBLENBQUEsWUFBQTtBQUNFLFlBQUEsU0FBQSxRQUFBLFNBQUEsQ0FBQTtBQUNBLFVBQUEsV0FBQSxRQUFBO0FBQ0U7QUFBQSxNQUFBO0FBRUYsZ0NBQUEsUUFBQSxNQUFBO0FBQ0UsWUFBQSxDQUFBLFNBQUEsU0FBQSxDQUFBLHFCQUFBLFNBQUEsS0FBQSxHQUFBO0FBQ0U7QUFBQSxRQUFBO0FBR0YsWUFBQSxTQUFBLE1BQUEsWUFBQSxNQUFBO0FBQ0UsaUJBQUEsVUFBQSxJQUFBLEVBQUEsT0FBQSxNQUFBO0FBQUEsUUFBb0MsT0FBQTtBQUVwQyxpQkFBQSxVQUFBLE9BQUEsRUFBQSxPQUFBLE1BQUE7QUFBQSxRQUF1QztBQUFBLE1BQ3pDLENBQUE7QUFBQSxJQUNELENBQUE7QUFBQSxFQUNGLENBQUE7QUFFTDtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxPQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
