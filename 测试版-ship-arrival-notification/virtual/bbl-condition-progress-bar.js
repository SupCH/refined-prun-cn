import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { sitesStore } from './sites.js';
import { refPrunId } from './attributes.js';
import { isRepairableBuilding } from './buildings.js';
import ProgressBar from './ProgressBar.vue.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const siteId = tile.parameter;
  const site = computed(() => sitesStore.getById(siteId));
  subscribe($$(tile.anchor, C.SectionList.section), section => {
    const id = refPrunId(section);
    const building = computed(() => site.value?.platforms.find(p => p.id == id.value));
    if (!building.value || !isRepairableBuilding(building.value)) {
      return;
    }
    const rows = _$$(section, 'tr');
    const condition = computed(() => building.value?.condition ?? 0);
    const good = computed(() => condition.value > 0.9);
    const warning = computed(() => !good.value && condition.value > 0.8);
    const danger = computed(() => condition.value <= 0.8);
    createFragmentApp(
      ProgressBar,
      reactive({
        value: condition,
        max: 1,
        good,
        warning,
        danger,
      }),
    ).prependTo(rows[5].children[1]);
  });
}
function init() {
  tiles.observe('BBL', onTileReady);
}
features.add(import.meta.url, init, 'BBL: Adds a progress bar to the building condition row.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLWNvbmRpdGlvbi1wcm9ncmVzcy1iYXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9iYmwtY29uZGl0aW9uLXByb2dyZXNzLWJhci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IHJlZlBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IGlzUmVwYWlyYWJsZUJ1aWxkaW5nIH0gZnJvbSAnQHNyYy9jb3JlL2J1aWxkaW5ncyc7XG5pbXBvcnQgUHJvZ3Jlc3NCYXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1Byb2dyZXNzQmFyLnZ1ZSc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIGNvbnN0IHNpdGVJZCA9IHRpbGUucGFyYW1ldGVyO1xuICBjb25zdCBzaXRlID0gY29tcHV0ZWQoKCkgPT4gc2l0ZXNTdG9yZS5nZXRCeUlkKHNpdGVJZCkpO1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2VjdGlvbkxpc3Quc2VjdGlvbiksIHNlY3Rpb24gPT4ge1xuICAgIGNvbnN0IGlkID0gcmVmUHJ1bklkKHNlY3Rpb24pO1xuICAgIGNvbnN0IGJ1aWxkaW5nID0gY29tcHV0ZWQoKCkgPT4gc2l0ZS52YWx1ZT8ucGxhdGZvcm1zLmZpbmQocCA9PiBwLmlkID09IGlkLnZhbHVlKSk7XG4gICAgaWYgKCFidWlsZGluZy52YWx1ZSB8fCAhaXNSZXBhaXJhYmxlQnVpbGRpbmcoYnVpbGRpbmcudmFsdWUpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHJvd3MgPSBfJCQoc2VjdGlvbiwgJ3RyJyk7XG4gICAgY29uc3QgY29uZGl0aW9uID0gY29tcHV0ZWQoKCkgPT4gYnVpbGRpbmcudmFsdWU/LmNvbmRpdGlvbiA/PyAwKTtcbiAgICBjb25zdCBnb29kID0gY29tcHV0ZWQoKCkgPT4gY29uZGl0aW9uLnZhbHVlID4gMC45KTtcbiAgICBjb25zdCB3YXJuaW5nID0gY29tcHV0ZWQoKCkgPT4gIWdvb2QudmFsdWUgJiYgY29uZGl0aW9uLnZhbHVlID4gMC44KTtcbiAgICBjb25zdCBkYW5nZXIgPSBjb21wdXRlZCgoKSA9PiBjb25kaXRpb24udmFsdWUgPD0gMC44KTtcbiAgICBjcmVhdGVGcmFnbWVudEFwcChcbiAgICAgIFByb2dyZXNzQmFyLFxuICAgICAgcmVhY3RpdmUoe1xuICAgICAgICB2YWx1ZTogY29uZGl0aW9uLFxuICAgICAgICBtYXg6IDEsXG4gICAgICAgIGdvb2QsXG4gICAgICAgIHdhcm5pbmcsXG4gICAgICAgIGRhbmdlcixcbiAgICAgIH0pLFxuICAgICkucHJlcGVuZFRvKHJvd3NbNV0uY2hpbGRyZW5bMV0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQkJMJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQkJMOiBBZGRzIGEgcHJvZ3Jlc3MgYmFyIHRvIHRoZSBidWlsZGluZyBjb25kaXRpb24gcm93LicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUtBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsUUFBQSxTQUFBLEtBQUE7QUFDQSxRQUFBLE9BQUEsU0FBQSxNQUFBLFdBQUEsUUFBQSxNQUFBLENBQUE7QUFDQSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxPQUFBLEdBQUEsQ0FBQSxZQUFBO0FBQ0UsVUFBQSxLQUFBLFVBQUEsT0FBQTtBQUNBLFVBQUEsV0FBQSxTQUFBLE1BQUEsS0FBQSxPQUFBLFVBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxNQUFBLEdBQUEsS0FBQSxDQUFBO0FBQ0EsUUFBQSxDQUFBLFNBQUEsU0FBQSxDQUFBLHFCQUFBLFNBQUEsS0FBQSxHQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsVUFBQSxPQUFBLElBQUEsU0FBQSxJQUFBO0FBQ0EsVUFBQSxZQUFBLFNBQUEsTUFBQSxTQUFBLE9BQUEsYUFBQSxDQUFBO0FBQ0EsVUFBQSxPQUFBLFNBQUEsTUFBQSxVQUFBLFFBQUEsR0FBQTtBQUNBLFVBQUEsVUFBQSxTQUFBLE1BQUEsQ0FBQSxLQUFBLFNBQUEsVUFBQSxRQUFBLEdBQUE7QUFDQSxVQUFBLFNBQUEsU0FBQSxNQUFBLFVBQUEsU0FBQSxHQUFBO0FBQ0E7QUFBQSxNQUFBO0FBQUEsTUFDRSxTQUFBO0FBQUEsUUFDUyxPQUFBO0FBQUEsUUFDQSxLQUFBO0FBQUEsUUFDRjtBQUFBLFFBQ0w7QUFBQSxRQUNBO0FBQUEsTUFDQSxDQUFBO0FBQUEsSUFDRCxFQUFBLFVBQUEsS0FBQSxDQUFBLEVBQUEsU0FBQSxDQUFBLENBQUE7QUFBQSxFQUM0QixDQUFBO0FBRW5DO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLE9BQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLHlEQUFBOyJ9
