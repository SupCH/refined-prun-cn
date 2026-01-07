import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { workforcesStore } from './workforces.js';
import { PrunI18N } from './i18n.js';
import { isEmpty } from './is-empty.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.container), () => {
    subscribe($$(tile.anchor, 'tr'), row => {
      if (isEmpty(_$$(row, 'td'))) {
        return;
      }
      const levelId = refPrunId(row);
      const shouldHideRow = computed(() => {
        const site = sitesStore.getByPlanetNaturalId(tile.parameter);
        const workforce = workforcesStore
          .getById(site?.siteId)
          ?.workforces.find(x => x.level === levelId.value);
        return (
          workforce && workforce.capacity < 1 && workforce.required < 1 && workforce.population < 1
        );
      });
      watchEffectWhileNodeAlive(row, () => (row.style.display = shouldHideRow.value ? 'none' : ''));
    });
  });
}
function init() {
  const localized = PrunI18N['SiteWorkforces.table.currentWorkforce']?.[0];
  if (localized) {
    localized.value = localized.value.replace('Current Workforce', 'Current');
  }
  tiles.observe('BS', onTileReady);
}
features.add(import.meta.url, init, 'BS: Hides workforce rows with zero current workforce.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtaGlkZS16ZXJvLXdvcmtmb3JjZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2JzLWhpZGUtemVyby13b3JrZm9yY2UudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgcmVmUHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQgeyB3b3JrZm9yY2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvd29ya2ZvcmNlcyc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAndHMtZXh0cmFzJztcbmltcG9ydCB7IFBydW5JMThOIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2kxOG4nO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICAvLyBPbmx5IHByb2Nlc3MgQlMge2Jhc2V9IHRpbGVzXG4gIGlmICghdGlsZS5wYXJhbWV0ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2l0ZS5jb250YWluZXIpLCAoKSA9PiB7XG4gICAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndHInKSwgcm93ID0+IHtcbiAgICAgIGlmIChpc0VtcHR5KF8kJChyb3csICd0ZCcpKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGxldmVsSWQgPSByZWZQcnVuSWQocm93KTtcbiAgICAgIGNvbnN0IHNob3VsZEhpZGVSb3cgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgICAgIGNvbnN0IHNpdGUgPSBzaXRlc1N0b3JlLmdldEJ5UGxhbmV0TmF0dXJhbElkKHRpbGUucGFyYW1ldGVyKTtcbiAgICAgICAgY29uc3Qgd29ya2ZvcmNlID0gd29ya2ZvcmNlc1N0b3JlXG4gICAgICAgICAgLmdldEJ5SWQoc2l0ZT8uc2l0ZUlkKVxuICAgICAgICAgID8ud29ya2ZvcmNlcy5maW5kKHggPT4geC5sZXZlbCA9PT0gbGV2ZWxJZC52YWx1ZSk7XG4gICAgICAgIHJldHVybiAoXG4gICAgICAgICAgd29ya2ZvcmNlICYmIHdvcmtmb3JjZS5jYXBhY2l0eSA8IDEgJiYgd29ya2ZvcmNlLnJlcXVpcmVkIDwgMSAmJiB3b3JrZm9yY2UucG9wdWxhdGlvbiA8IDFcbiAgICAgICAgKTtcbiAgICAgIH0pO1xuICAgICAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShyb3csICgpID0+IChyb3cuc3R5bGUuZGlzcGxheSA9IHNob3VsZEhpZGVSb3cudmFsdWUgPyAnbm9uZScgOiAnJykpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgY29uc3QgbG9jYWxpemVkID0gUHJ1bkkxOE5bJ1NpdGVXb3JrZm9yY2VzLnRhYmxlLmN1cnJlbnRXb3JrZm9yY2UnXT8uWzBdO1xuICBpZiAobG9jYWxpemVkKSB7XG4gICAgbG9jYWxpemVkLnZhbHVlID0gbG9jYWxpemVkLnZhbHVlLnJlcGxhY2UoJ0N1cnJlbnQgV29ya2ZvcmNlJywgJ0N1cnJlbnQnKTtcbiAgfVxuICB0aWxlcy5vYnNlcnZlKCdCUycsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0JTOiBIaWRlcyB3b3JrZm9yY2Ugcm93cyB3aXRoIHplcm8gY3VycmVudCB3b3JrZm9yY2UuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBT0EsU0FBQSxZQUFBLE1BQUE7QUFFRSxNQUFBLENBQUEsS0FBQSxXQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLEtBQUEsU0FBQSxHQUFBLE1BQUE7QUFDRSxjQUFBLEdBQUEsS0FBQSxRQUFBLElBQUEsR0FBQSxDQUFBLFFBQUE7QUFDRSxVQUFBLFFBQUEsSUFBQSxLQUFBLElBQUEsQ0FBQSxHQUFBO0FBQ0U7QUFBQSxNQUFBO0FBR0YsWUFBQSxVQUFBLFVBQUEsR0FBQTtBQUNBLFlBQUEsZ0JBQUEsU0FBQSxNQUFBO0FBQ0UsY0FBQSxPQUFBLFdBQUEscUJBQUEsS0FBQSxTQUFBO0FBQ0EsY0FBQSxZQUFBLGdCQUFBLFFBQUEsTUFBQSxNQUFBLEdBQUEsV0FBQSxLQUFBLENBQUEsTUFBQSxFQUFBLFVBQUEsUUFBQSxLQUFBO0FBR0EsZUFBQSxhQUFBLFVBQUEsV0FBQSxLQUFBLFVBQUEsV0FBQSxLQUFBLFVBQUEsYUFBQTtBQUFBLE1BQzBGLENBQUE7QUFHNUYsZ0NBQUEsS0FBQSxNQUFBLElBQUEsTUFBQSxVQUFBLGNBQUEsUUFBQSxTQUFBLEVBQUE7QUFBQSxJQUE0RixDQUFBO0FBQUEsRUFDN0YsQ0FBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxZQUFBLFNBQUEsdUNBQUEsSUFBQSxDQUFBO0FBQ0EsTUFBQSxXQUFBO0FBQ0UsY0FBQSxRQUFBLFVBQUEsTUFBQSxRQUFBLHFCQUFBLFNBQUE7QUFBQSxFQUF3RTtBQUUxRSxRQUFBLFFBQUEsTUFBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsdURBQUE7In0=
