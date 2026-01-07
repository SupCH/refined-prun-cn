import { subscribe } from './subscribe-async-generator.js';
import { _$$, _$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import { workforcesStore } from './workforces.js';
import WorkforceFilterBar from './WorkforceFilterBar.vue.js';
import { computedTileState } from './user-data-tiles.js';
import { getTileState } from './tile-state4.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
const workforceTypes = ['PIONEER', 'SETTLER', 'TECHNICIAN', 'ENGINEER', 'SCIENTIST'];
function onTileReady(tile) {
  const workforces = computed(() => workforcesStore.getById(tile.parameter));
  const filters = computedTileState(getTileState(tile), 'hideWorkforce', []);
  const visibleMaterials = computed(() => {
    if (!workforces.value) {
      return void 0;
    }
    const materials = /* @__PURE__ */ new Set();
    for (const wf of workforces.value.workforces) {
      const filter = filters.value.find(x => x.workforce === wf.level);
      if (filter && !filter.value) {
        continue;
      }
      for (const need of wf.needs) {
        materials.add(need.material.ticker);
      }
    }
    return [...materials];
  });
  subscribe($$(tile.anchor, C.Workforces.table), async table => {
    createFragmentApp(
      WorkforceFilterBar,
      reactive({
        filters,
      }),
    ).before(table);
    watchEffectWhileNodeAlive(table, () => {
      if (!workforces.value) {
        return;
      }
      if (filters.value.length === 0) {
        filters.value = workforceTypes.map(x => ({
          workforce: x,
          value: (workforces.value?.workforces.find(y => y.level === x)?.capacity ?? 0) > 0,
        }));
        if (filters.value.every(x => !x.value)) {
          for (const filter of filters.value) {
            filter.value = true;
          }
        }
      }
      const rows = _$$(table, 'tr');
      for (const row of rows) {
        const isHeader = _$(row, 'th') !== void 0;
        const startingColumn = isHeader ? 5 : 6;
        for (let i = 0; i < workforceTypes.length; i++) {
          const workforceType = workforceTypes[i];
          const column = row.children[startingColumn + i];
          const isVisible = filters.value.find(x => x.workforce === workforceType)?.value ?? true;
          column.classList.toggle(css.hidden, !isVisible);
        }
        const materialLabel = _$(row, C.ColoredIcon.label);
        if (materialLabel) {
          const isHidden = !(visibleMaterials.value?.includes(materialLabel.textContent) ?? true);
          row.classList.toggle(css.hidden, isHidden);
        }
      }
    });
  });
}
function init() {
  tiles.observe('WF', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'WF: Adds filters to hide zero workforce types and consumables.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoid2Ytd29ya2ZvcmNlLWZpbHRlcnMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC93Zi13b3JrZm9yY2UtZmlsdGVycy93Zi13b3JrZm9yY2UtZmlsdGVycy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IHdvcmtmb3JjZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS93b3JrZm9yY2VzJztcbmltcG9ydCBXb3JrZm9yY2VGaWx0ZXJCYXIgZnJvbSAnQHNyYy9mZWF0dXJlcy9hZHZhbmNlZC93Zi13b3JrZm9yY2UtZmlsdGVycy9Xb3JrZm9yY2VGaWx0ZXJCYXIudnVlJztcbmltcG9ydCB7IGNvbXB1dGVkVGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtdGlsZXMnO1xuaW1wb3J0IHsgZ2V0VGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9hZHZhbmNlZC93Zi13b3JrZm9yY2UtZmlsdGVycy90aWxlLXN0YXRlJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcblxuY29uc3Qgd29ya2ZvcmNlVHlwZXMgPSBbJ1BJT05FRVInLCAnU0VUVExFUicsICdURUNITklDSUFOJywgJ0VOR0lORUVSJywgJ1NDSUVOVElTVCddO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCB3b3JrZm9yY2VzID0gY29tcHV0ZWQoKCkgPT4gd29ya2ZvcmNlc1N0b3JlLmdldEJ5SWQodGlsZS5wYXJhbWV0ZXIpKTtcbiAgY29uc3QgZmlsdGVycyA9IGNvbXB1dGVkVGlsZVN0YXRlKGdldFRpbGVTdGF0ZSh0aWxlKSwgJ2hpZGVXb3JrZm9yY2UnLCBbXSk7XG4gIGNvbnN0IHZpc2libGVNYXRlcmlhbHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gICAgaWYgKCF3b3JrZm9yY2VzLnZhbHVlKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIGNvbnN0IG1hdGVyaWFscyA9IG5ldyBTZXQ8c3RyaW5nPigpO1xuICAgIGZvciAoY29uc3Qgd2Ygb2Ygd29ya2ZvcmNlcy52YWx1ZS53b3JrZm9yY2VzKSB7XG4gICAgICBjb25zdCBmaWx0ZXIgPSBmaWx0ZXJzLnZhbHVlLmZpbmQoeCA9PiB4Lndvcmtmb3JjZSA9PT0gd2YubGV2ZWwpO1xuICAgICAgaWYgKGZpbHRlciAmJiAhZmlsdGVyLnZhbHVlKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgZm9yIChjb25zdCBuZWVkIG9mIHdmLm5lZWRzKSB7XG4gICAgICAgIG1hdGVyaWFscy5hZGQobmVlZC5tYXRlcmlhbC50aWNrZXIpO1xuICAgICAgfVxuICAgIH1cblxuICAgIHJldHVybiBbLi4ubWF0ZXJpYWxzXTtcbiAgfSk7XG5cbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLldvcmtmb3JjZXMudGFibGUpLCBhc3luYyB0YWJsZSA9PiB7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoV29ya2ZvcmNlRmlsdGVyQmFyLCByZWFjdGl2ZSh7IGZpbHRlcnMgfSkpLmJlZm9yZSh0YWJsZSk7XG5cbiAgICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKHRhYmxlLCAoKSA9PiB7XG4gICAgICBpZiAoIXdvcmtmb3JjZXMudmFsdWUpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuXG4gICAgICBpZiAoZmlsdGVycy52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICAgICAgZmlsdGVycy52YWx1ZSA9IHdvcmtmb3JjZVR5cGVzLm1hcCh4ID0+ICh7XG4gICAgICAgICAgd29ya2ZvcmNlOiB4LFxuICAgICAgICAgIHZhbHVlOiAod29ya2ZvcmNlcy52YWx1ZT8ud29ya2ZvcmNlcy5maW5kKHkgPT4geS5sZXZlbCA9PT0geCk/LmNhcGFjaXR5ID8/IDApID4gMCxcbiAgICAgICAgfSkpO1xuICAgICAgICBpZiAoZmlsdGVycy52YWx1ZS5ldmVyeSh4ID0+ICF4LnZhbHVlKSkge1xuICAgICAgICAgIGZvciAoY29uc3QgZmlsdGVyIG9mIGZpbHRlcnMudmFsdWUpIHtcbiAgICAgICAgICAgIGZpbHRlci52YWx1ZSA9IHRydWU7XG4gICAgICAgICAgfVxuICAgICAgICB9XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHJvd3MgPSBfJCQodGFibGUsICd0cicpO1xuICAgICAgZm9yIChjb25zdCByb3cgb2Ygcm93cykge1xuICAgICAgICBjb25zdCBpc0hlYWRlciA9IF8kKHJvdywgJ3RoJykgIT09IHVuZGVmaW5lZDtcbiAgICAgICAgLy8gVGhlIGZpcnN0IHJvdyBoYXMgYSA8dGg+IHdpdGggY29sc3Bhbj0yIHRoYXQgbWVzc2VzIHVwIHRoZSBlbGVtZW50IGluZGV4LlxuICAgICAgICBjb25zdCBzdGFydGluZ0NvbHVtbiA9IGlzSGVhZGVyID8gNSA6IDY7XG4gICAgICAgIGZvciAobGV0IGkgPSAwOyBpIDwgd29ya2ZvcmNlVHlwZXMubGVuZ3RoOyBpKyspIHtcbiAgICAgICAgICBjb25zdCB3b3JrZm9yY2VUeXBlID0gd29ya2ZvcmNlVHlwZXNbaV07XG4gICAgICAgICAgY29uc3QgY29sdW1uID0gcm93LmNoaWxkcmVuW3N0YXJ0aW5nQ29sdW1uICsgaV07XG4gICAgICAgICAgY29uc3QgaXNWaXNpYmxlID0gZmlsdGVycy52YWx1ZS5maW5kKHggPT4geC53b3JrZm9yY2UgPT09IHdvcmtmb3JjZVR5cGUpPy52YWx1ZSA/PyB0cnVlO1xuICAgICAgICAgIGNvbHVtbi5jbGFzc0xpc3QudG9nZ2xlKGNzcy5oaWRkZW4sICFpc1Zpc2libGUpO1xuICAgICAgICB9XG5cbiAgICAgICAgY29uc3QgbWF0ZXJpYWxMYWJlbCA9IF8kKHJvdywgQy5Db2xvcmVkSWNvbi5sYWJlbCk7XG4gICAgICAgIGlmIChtYXRlcmlhbExhYmVsKSB7XG4gICAgICAgICAgY29uc3QgaXNIaWRkZW4gPSAhKHZpc2libGVNYXRlcmlhbHMudmFsdWU/LmluY2x1ZGVzKG1hdGVyaWFsTGFiZWwudGV4dENvbnRlbnQhKSA/PyB0cnVlKTtcbiAgICAgICAgICByb3cuY2xhc3NMaXN0LnRvZ2dsZShjc3MuaGlkZGVuLCBpc0hpZGRlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ1dGJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ1dGOiBBZGRzIGZpbHRlcnMgdG8gaGlkZSB6ZXJvIHdvcmtmb3JjZSB0eXBlcyBhbmQgY29uc3VtYWJsZXMuJyxcbik7XG4iXSwibmFtZXMiOlsic3Vic2NyaWJlIiwiY3JlYXRlRnJhZ21lbnRBcHAiLCJmaWx0ZXJzIiwid29ya2ZvcmNlIiwidGlsZXMiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFPQSxNQUFBLGlCQUFBLENBQUEsV0FBQSxXQUFBLGNBQUEsWUFBQSxXQUFBO0FBRUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLGFBQUEsU0FBQSxNQUFBLGdCQUFBLFFBQUEsS0FBQSxTQUFBLENBQUE7QUFDQSxRQUFBLFVBQUEsa0JBQUEsYUFBQSxJQUFBLEdBQUEsaUJBQUEsRUFBQTtBQUNBLFFBQUEsbUJBQUEsU0FBQSxNQUFBO0FBQ0UsUUFBQSxDQUFBLFdBQUEsT0FBQTtBQUNFLGFBQUE7QUFBQSxJQUNGO0FBRUEsVUFBQSxZQUFBLG9CQUFBLElBQUE7O0FBRUUsWUFBQSxTQUFBLFFBQUEsTUFBQSxLQUFBLE9BQUEsRUFBQSxjQUFBLEdBQUEsS0FBQTtBQUNBLFVBQUEsVUFBQSxDQUFBLE9BQUEsT0FBQTtBQUNFO0FBQUEsTUFDRjtBQUNBLGlCQUFBLFFBQUEsR0FBQSxPQUFBOztNQUVBO0FBQUEsSUFDRjs7RUFHRixDQUFBO0FBRUFBLFlBQUFBLEdBQUFBLEtBQUFBLFFBQUFBLEVBQUFBLFdBQUFBLEtBQUFBLEdBQUFBLE9BQUFBLFVBQUFBO0FBQ0VDLHNCQUFBQSxvQkFBQUEsU0FBQUE7QUFBQUEsTUFBaURDO0FBQUFBLElBQVEsQ0FBQSxDQUFBLEVBQUEsT0FBQSxLQUFBOztBQUd2RCxVQUFBLENBQUEsV0FBQSxPQUFBO0FBQ0U7QUFBQSxNQUNGO0FBRUEsVUFBQSxRQUFBLE1BQUEsV0FBQSxHQUFBOztVQUVJQyxXQUFBQTtBQUFBQTtRQUVGLEVBQUE7QUFDQSxZQUFBLFFBQUEsTUFBQSxNQUFBLE9BQUEsQ0FBQSxFQUFBLEtBQUEsR0FBQTtBQUNFLHFCQUFBLFVBQUEsUUFBQSxPQUFBOztVQUVBO0FBQUEsUUFDRjtBQUFBLE1BQ0Y7QUFFQSxZQUFBLE9BQUEsSUFBQSxPQUFBLElBQUE7QUFDQSxpQkFBQSxPQUFBLE1BQUE7O0FBR0UsY0FBQSxpQkFBQSxXQUFBLElBQUE7QUFDQSxpQkFBQSxJQUFBLEdBQUEsSUFBQSxlQUFBLFFBQUEsS0FBQTtBQUNFLGdCQUFBLGdCQUFBLGVBQUEsQ0FBQTs7QUFFQSxnQkFBQSxZQUFBLFFBQUEsTUFBQSxLQUFBLE9BQUEsRUFBQSxjQUFBLGFBQUEsR0FBQSxTQUFBOztRQUVGOztBQUdBLFlBQUEsZUFBQTtBQUNFLGdCQUFBLFdBQUEsRUFBQSxpQkFBQSxPQUFBLFNBQUEsY0FBQSxXQUFBLEtBQUE7O1FBRUY7QUFBQSxNQUNGO0FBQUEsSUFDRixDQUFBO0FBQUEsRUFDRixDQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsUUFBQUEsTUFBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxnRUFBQUE7In0=
