import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { isRepairableBuilding } from './buildings.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const siteId = tile.parameter;
  const site = computed(() => sitesStore.getById(siteId));
  subscribe($$(tile.anchor, C.SectionList.section), section => {
    const id = refPrunId(section);
    const building = computed(() => site.value?.platforms.find(p => p.id == id.value));
    watchEffectWhileNodeAlive(section, () => {
      if (!building.value) {
        return;
      }
      setAttribute(section, 'data-rp-established', building.value.lastRepair === null);
      setAttribute(section, 'data-rp-repaired', building.value.lastRepair !== null);
      setAttribute(section, 'data-rp-infrastructure', !isRepairableBuilding(building.value));
    });
  });
}
function setAttribute(element, attribute, value) {
  if (value) {
    element.setAttribute(attribute, '');
  } else {
    element.removeAttribute(attribute);
  }
}
function init() {
  applyCssRule(
    'BBL',
    `.${C.SectionList.section}[data-rp-established] .${C.SectionList.table} tr:nth-child(2)`,
    css.hidden,
  );
  applyCssRule(
    'BBL',
    `.${C.SectionList.section}[data-rp-repaired] .${C.SectionList.table} tr:nth-child(1)`,
    css.hidden,
  );
  applyCssRule(
    'BBL',
    `.${C.SectionList.section}[data-rp-infrastructure] .${C.SectionList.table} tr:nth-child(3)`,
    css.hidden,
  );
  tiles.observe('BBL', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BBL: Hides "Last repair", "Established", and "Repair costs" rows if they are empty or irrelevant to repairs.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLWNsZWFuLXJlcGFpci1pbmZvLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvYmJsLWNsZWFuLXJlcGFpci1pbmZvLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjc3MgZnJvbSAnQHNyYy91dGlscy9jc3MtdXRpbHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5pbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IGlzUmVwYWlyYWJsZUJ1aWxkaW5nIH0gZnJvbSAnQHNyYy9jb3JlL2J1aWxkaW5ncyc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIGNvbnN0IHNpdGVJZCA9IHRpbGUucGFyYW1ldGVyO1xuICBjb25zdCBzaXRlID0gY29tcHV0ZWQoKCkgPT4gc2l0ZXNTdG9yZS5nZXRCeUlkKHNpdGVJZCkpO1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2VjdGlvbkxpc3Quc2VjdGlvbiksIHNlY3Rpb24gPT4ge1xuICAgIGNvbnN0IGlkID0gcmVmUHJ1bklkKHNlY3Rpb24pO1xuICAgIGNvbnN0IGJ1aWxkaW5nID0gY29tcHV0ZWQoKCkgPT4gc2l0ZS52YWx1ZT8ucGxhdGZvcm1zLmZpbmQocCA9PiBwLmlkID09IGlkLnZhbHVlKSk7XG4gICAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShzZWN0aW9uLCAoKSA9PiB7XG4gICAgICBpZiAoIWJ1aWxkaW5nLnZhbHVlKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgc2V0QXR0cmlidXRlKHNlY3Rpb24sICdkYXRhLXJwLWVzdGFibGlzaGVkJywgYnVpbGRpbmcudmFsdWUubGFzdFJlcGFpciA9PT0gbnVsbCk7XG4gICAgICBzZXRBdHRyaWJ1dGUoc2VjdGlvbiwgJ2RhdGEtcnAtcmVwYWlyZWQnLCBidWlsZGluZy52YWx1ZS5sYXN0UmVwYWlyICE9PSBudWxsKTtcbiAgICAgIHNldEF0dHJpYnV0ZShzZWN0aW9uLCAnZGF0YS1ycC1pbmZyYXN0cnVjdHVyZScsICFpc1JlcGFpcmFibGVCdWlsZGluZyhidWlsZGluZy52YWx1ZSkpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc2V0QXR0cmlidXRlKGVsZW1lbnQ6IEhUTUxFbGVtZW50LCBhdHRyaWJ1dGU6IHN0cmluZywgdmFsdWU6IGJvb2xlYW4pIHtcbiAgaWYgKHZhbHVlKSB7XG4gICAgZWxlbWVudC5zZXRBdHRyaWJ1dGUoYXR0cmlidXRlLCAnJyk7XG4gIH0gZWxzZSB7XG4gICAgZWxlbWVudC5yZW1vdmVBdHRyaWJ1dGUoYXR0cmlidXRlKTtcbiAgfVxufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICAvLyBIaWRlICdMYXN0IHJlcGFpcidcbiAgYXBwbHlDc3NSdWxlKFxuICAgICdCQkwnLFxuICAgIGAuJHtDLlNlY3Rpb25MaXN0LnNlY3Rpb259W2RhdGEtcnAtZXN0YWJsaXNoZWRdIC4ke0MuU2VjdGlvbkxpc3QudGFibGV9IHRyOm50aC1jaGlsZCgyKWAsXG4gICAgY3NzLmhpZGRlbixcbiAgKTtcbiAgLy8gSGlkZSAnRXN0YWJsaXNoZWQnXG4gIGFwcGx5Q3NzUnVsZShcbiAgICAnQkJMJyxcbiAgICBgLiR7Qy5TZWN0aW9uTGlzdC5zZWN0aW9ufVtkYXRhLXJwLXJlcGFpcmVkXSAuJHtDLlNlY3Rpb25MaXN0LnRhYmxlfSB0cjpudGgtY2hpbGQoMSlgLFxuICAgIGNzcy5oaWRkZW4sXG4gICk7XG4gIC8vIEhpZGUgJ1JlcGFpciBjb3N0cydcbiAgYXBwbHlDc3NSdWxlKFxuICAgICdCQkwnLFxuICAgIGAuJHtDLlNlY3Rpb25MaXN0LnNlY3Rpb259W2RhdGEtcnAtaW5mcmFzdHJ1Y3R1cmVdIC4ke0MuU2VjdGlvbkxpc3QudGFibGV9IHRyOm50aC1jaGlsZCgzKWAsXG4gICAgY3NzLmhpZGRlbixcbiAgKTtcbiAgdGlsZXMub2JzZXJ2ZSgnQkJMJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0JCTDogSGlkZXMgXCJMYXN0IHJlcGFpclwiLCBcIkVzdGFibGlzaGVkXCIsIGFuZCBcIlJlcGFpciBjb3N0c1wiIHJvd3MgJyArXG4gICAgJ2lmIHRoZXkgYXJlIGVtcHR5IG9yIGlycmVsZXZhbnQgdG8gcmVwYWlycy4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFNQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFFBQUEsU0FBQSxLQUFBO0FBQ0EsUUFBQSxPQUFBLFNBQUEsTUFBQSxXQUFBLFFBQUEsTUFBQSxDQUFBO0FBQ0EsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFlBQUEsT0FBQSxHQUFBLENBQUEsWUFBQTtBQUNFLFVBQUEsS0FBQSxVQUFBLE9BQUE7QUFDQSxVQUFBLFdBQUEsU0FBQSxNQUFBLEtBQUEsT0FBQSxVQUFBLEtBQUEsQ0FBQSxNQUFBLEVBQUEsTUFBQSxHQUFBLEtBQUEsQ0FBQTtBQUNBLDhCQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsQ0FBQSxTQUFBLE9BQUE7QUFDRTtBQUFBLE1BQUE7QUFHRixtQkFBQSxTQUFBLHVCQUFBLFNBQUEsTUFBQSxlQUFBLElBQUE7QUFDQSxtQkFBQSxTQUFBLG9CQUFBLFNBQUEsTUFBQSxlQUFBLElBQUE7QUFDQSxtQkFBQSxTQUFBLDBCQUFBLENBQUEscUJBQUEsU0FBQSxLQUFBLENBQUE7QUFBQSxJQUFxRixDQUFBO0FBQUEsRUFDdEYsQ0FBQTtBQUVMO0FBRUEsU0FBQSxhQUFBLFNBQUEsV0FBQSxPQUFBO0FBQ0UsTUFBQSxPQUFBO0FBQ0UsWUFBQSxhQUFBLFdBQUEsRUFBQTtBQUFBLEVBQWtDLE9BQUE7QUFFbEMsWUFBQSxnQkFBQSxTQUFBO0FBQUEsRUFBaUM7QUFFckM7QUFFQSxTQUFBLE9BQUE7QUFFRTtBQUFBLElBQUE7QUFBQSxJQUNFLElBQUEsRUFBQSxZQUFBLE9BQUEsMEJBQUEsRUFBQSxZQUFBLEtBQUE7QUFBQSxJQUNzRSxJQUFBO0FBQUEsRUFDbEU7QUFHTjtBQUFBLElBQUE7QUFBQSxJQUNFLElBQUEsRUFBQSxZQUFBLE9BQUEsdUJBQUEsRUFBQSxZQUFBLEtBQUE7QUFBQSxJQUNtRSxJQUFBO0FBQUEsRUFDL0Q7QUFHTjtBQUFBLElBQUE7QUFBQSxJQUNFLElBQUEsRUFBQSxZQUFBLE9BQUEsNkJBQUEsRUFBQSxZQUFBLEtBQUE7QUFBQSxJQUN5RSxJQUFBO0FBQUEsRUFDckU7QUFFTixRQUFBLFFBQUEsT0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFHRjsifQ==
