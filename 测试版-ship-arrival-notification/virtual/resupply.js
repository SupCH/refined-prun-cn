import './config.js';
import { act } from './act-registry.js';
import _sfc_main$1 from './Edit.vue6.js';
import _sfc_main from './Configure.vue4.js';
import { sitesStore } from './sites.js';
import { workforcesStore } from './workforces.js';
import { productionStore } from './production.js';
import { storagesStore } from './storage.js';
import { configurableValue } from './shared-types.js';
import { calculatePlanetBurn } from './burn2.js';
import { watchWhile } from './watch.js';
import { getEntityNameFromAddress, getEntityNaturalIdFromAddress } from './addresses.js';
import { computed } from './runtime-core.esm-bundler.js';
import { toRef } from './reactivity.esm-bundler.js';
act.addMaterialGroup({
  type: 'Resupply',
  description: data => {
    if (!data.planet || data.days === void 0) {
      return '--';
    }
    return `Resupply ${data.planet} with ${data.days} day${data.days == 1 ? '' : 's'} of supplies`;
  },
  editComponent: _sfc_main$1,
  configureComponent: _sfc_main,
  needsConfigure: data => data.planet === configurableValue,
  isValidConfig: (data, config) => data.planet !== configurableValue || config.planet !== void 0,
  generateMaterialBill: async ({ data, config, log, setStatus }) => {
    if (!data.planet) {
      log.error('Missing resupply planet');
    }
    if (data.days === void 0) {
      log.error('Missing resupply days');
    }
    const exclusions = data.exclusions ?? [];
    const planet = data.planet === configurableValue ? config.planet : data.planet;
    const site = sitesStore.getByPlanetNaturalIdOrName(planet);
    if (!site) {
      log.error(`Base is not present on ${data.planet}`);
    }
    if (!site || data.days === void 0) {
      return void 0;
    }
    const workforce = computed(() => workforcesStore.getById(site?.siteId)?.workforces);
    const production = computed(() => productionStore.getBySiteId(site.siteId));
    if (workforce.value === void 0 || production.value === void 0) {
      const name =
        getEntityNameFromAddress(site.address) ?? getEntityNaturalIdFromAddress(site.address);
      setStatus(`Loading ${name} burn data...`);
      await watchWhile(toRef(() => workforce.value === void 0 || production.value === void 0));
    }
    const stores = storagesStore.getByAddressableId(site.siteId);
    const planetBurn = calculatePlanetBurn(
      data.consumablesOnly ? void 0 : production.value,
      workforce.value,
      (data.useBaseInv ?? true) ? stores : void 0,
    );
    const parsedGroup = {};
    for (const ticker of Object.keys(planetBurn)) {
      if (exclusions.includes(ticker)) {
        continue;
      }
      const matBurn = planetBurn[ticker];
      if (matBurn.dailyAmount >= 0) {
        continue;
      }
      const days = typeof data.days === 'number' ? data.days : parseFloat(data.days);
      const need = Math.ceil((matBurn.daysLeft - days) * matBurn.dailyAmount);
      if (need > 0) {
        parsedGroup[ticker] = need;
      }
    }
    return parsedGroup;
  },
});
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVzdXBwbHkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL21hdGVyaWFsLWdyb3Vwcy9yZXN1cHBseS9yZXN1cHBseS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBhY3QgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0LXJlZ2lzdHJ5JztcbmltcG9ydCBFZGl0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvcmVzdXBwbHkvRWRpdC52dWUnO1xuaW1wb3J0IENvbmZpZ3VyZSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvbWF0ZXJpYWwtZ3JvdXBzL3Jlc3VwcGx5L0NvbmZpZ3VyZS52dWUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL21hdGVyaWFsLWdyb3Vwcy9yZXN1cHBseS9jb25maWcnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQgeyB3b3JrZm9yY2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvd29ya2ZvcmNlcyc7XG5pbXBvcnQgeyBwcm9kdWN0aW9uU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvcHJvZHVjdGlvbic7XG5pbXBvcnQgeyBzdG9yYWdlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3N0b3JhZ2UnO1xuaW1wb3J0IHsgY29uZmlndXJhYmxlVmFsdWUgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGNhbGN1bGF0ZVBsYW5ldEJ1cm4gfSBmcm9tICdAc3JjL2NvcmUvYnVybic7XG5pbXBvcnQgeyB3YXRjaFdoaWxlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5pbXBvcnQge1xuICBnZXRFbnRpdHlOYW1lRnJvbUFkZHJlc3MsXG4gIGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzLFxufSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcblxuYWN0LmFkZE1hdGVyaWFsR3JvdXA8Q29uZmlnPih7XG4gIHR5cGU6ICdSZXN1cHBseScsXG4gIGRlc2NyaXB0aW9uOiBkYXRhID0+IHtcbiAgICBpZiAoIWRhdGEucGxhbmV0IHx8IGRhdGEuZGF5cyA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICByZXR1cm4gJy0tJztcbiAgICB9XG5cbiAgICByZXR1cm4gYFJlc3VwcGx5ICR7ZGF0YS5wbGFuZXR9IHdpdGggJHtkYXRhLmRheXN9IGRheSR7ZGF0YS5kYXlzID09IDEgPyAnJyA6ICdzJ30gb2Ygc3VwcGxpZXNgO1xuICB9LFxuICBlZGl0Q29tcG9uZW50OiBFZGl0LFxuICBjb25maWd1cmVDb21wb25lbnQ6IENvbmZpZ3VyZSxcbiAgbmVlZHNDb25maWd1cmU6IGRhdGEgPT4gZGF0YS5wbGFuZXQgPT09IGNvbmZpZ3VyYWJsZVZhbHVlLFxuICBpc1ZhbGlkQ29uZmlnOiAoZGF0YSwgY29uZmlnKSA9PiBkYXRhLnBsYW5ldCAhPT0gY29uZmlndXJhYmxlVmFsdWUgfHwgY29uZmlnLnBsYW5ldCAhPT0gdW5kZWZpbmVkLFxuICBnZW5lcmF0ZU1hdGVyaWFsQmlsbDogYXN5bmMgKHsgZGF0YSwgY29uZmlnLCBsb2csIHNldFN0YXR1cyB9KSA9PiB7XG4gICAgaWYgKCFkYXRhLnBsYW5ldCkge1xuICAgICAgbG9nLmVycm9yKCdNaXNzaW5nIHJlc3VwcGx5IHBsYW5ldCcpO1xuICAgIH1cbiAgICBpZiAoZGF0YS5kYXlzID09PSB1bmRlZmluZWQpIHtcbiAgICAgIGxvZy5lcnJvcignTWlzc2luZyByZXN1cHBseSBkYXlzJyk7XG4gICAgfVxuXG4gICAgY29uc3QgZXhjbHVzaW9ucyA9IGRhdGEuZXhjbHVzaW9ucyA/PyBbXTtcbiAgICBjb25zdCBwbGFuZXQgPSBkYXRhLnBsYW5ldCA9PT0gY29uZmlndXJhYmxlVmFsdWUgPyBjb25maWcucGxhbmV0IDogZGF0YS5wbGFuZXQ7XG4gICAgY29uc3Qgc2l0ZSA9IHNpdGVzU3RvcmUuZ2V0QnlQbGFuZXROYXR1cmFsSWRPck5hbWUocGxhbmV0KTtcbiAgICBpZiAoIXNpdGUpIHtcbiAgICAgIGxvZy5lcnJvcihgQmFzZSBpcyBub3QgcHJlc2VudCBvbiAke2RhdGEucGxhbmV0fWApO1xuICAgIH1cblxuICAgIGlmICghc2l0ZSB8fCBkYXRhLmRheXMgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgICB9XG5cbiAgICBjb25zdCB3b3JrZm9yY2UgPSBjb21wdXRlZCgoKSA9PiB3b3JrZm9yY2VzU3RvcmUuZ2V0QnlJZChzaXRlPy5zaXRlSWQpPy53b3JrZm9yY2VzKTtcbiAgICBjb25zdCBwcm9kdWN0aW9uID0gY29tcHV0ZWQoKCkgPT4gcHJvZHVjdGlvblN0b3JlLmdldEJ5U2l0ZUlkKHNpdGUuc2l0ZUlkKSk7XG4gICAgaWYgKHdvcmtmb3JjZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHByb2R1Y3Rpb24udmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgY29uc3QgbmFtZSA9XG4gICAgICAgIGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyhzaXRlLmFkZHJlc3MpID8/IGdldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzKHNpdGUuYWRkcmVzcyk7XG4gICAgICBzZXRTdGF0dXMoYExvYWRpbmcgJHtuYW1lfSBidXJuIGRhdGEuLi5gKTtcbiAgICAgIGF3YWl0IHdhdGNoV2hpbGUoXG4gICAgICAgIHRvUmVmKCgpID0+IHdvcmtmb3JjZS52YWx1ZSA9PT0gdW5kZWZpbmVkIHx8IHByb2R1Y3Rpb24udmFsdWUgPT09IHVuZGVmaW5lZCksXG4gICAgICApO1xuICAgIH1cbiAgICBjb25zdCBzdG9yZXMgPSBzdG9yYWdlc1N0b3JlLmdldEJ5QWRkcmVzc2FibGVJZChzaXRlLnNpdGVJZCk7XG5cbiAgICBjb25zdCBwbGFuZXRCdXJuID0gY2FsY3VsYXRlUGxhbmV0QnVybihcbiAgICAgIGRhdGEuY29uc3VtYWJsZXNPbmx5ID8gdW5kZWZpbmVkIDogcHJvZHVjdGlvbi52YWx1ZSxcbiAgICAgIHdvcmtmb3JjZS52YWx1ZSxcbiAgICAgIChkYXRhLnVzZUJhc2VJbnYgPz8gdHJ1ZSkgPyBzdG9yZXMgOiB1bmRlZmluZWQsXG4gICAgKTtcblxuICAgIGNvbnN0IHBhcnNlZEdyb3VwID0ge307XG4gICAgZm9yIChjb25zdCB0aWNrZXIgb2YgT2JqZWN0LmtleXMocGxhbmV0QnVybikpIHtcbiAgICAgIGlmIChleGNsdXNpb25zLmluY2x1ZGVzKHRpY2tlcikpIHtcbiAgICAgICAgY29udGludWU7XG4gICAgICB9XG4gICAgICBjb25zdCBtYXRCdXJuID0gcGxhbmV0QnVyblt0aWNrZXJdO1xuICAgICAgaWYgKG1hdEJ1cm4uZGFpbHlBbW91bnQgPj0gMCkge1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cbiAgICAgIGNvbnN0IGRheXMgPSB0eXBlb2YgZGF0YS5kYXlzID09PSAnbnVtYmVyJyA/IGRhdGEuZGF5cyA6IHBhcnNlRmxvYXQoZGF0YS5kYXlzKTtcbiAgICAgIGNvbnN0IG5lZWQgPSBNYXRoLmNlaWwoKG1hdEJ1cm4uZGF5c0xlZnQgLSBkYXlzKSAqIG1hdEJ1cm4uZGFpbHlBbW91bnQpO1xuICAgICAgaWYgKG5lZWQgPiAwKSB7XG4gICAgICAgIHBhcnNlZEdyb3VwW3RpY2tlcl0gPSBuZWVkO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcGFyc2VkR3JvdXA7XG4gIH0sXG59KTtcbiJdLCJuYW1lcyI6WyJFZGl0IiwiQ29uZmlndXJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQWdCQSxJQUFBLGlCQUFBO0FBQUEsRUFBNkIsTUFBQTtBQUFBLEVBQ3JCLGFBQUEsQ0FBQSxTQUFBO0FBRUosUUFBQSxDQUFBLEtBQUEsVUFBQSxLQUFBLFNBQUEsUUFBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBR1QsV0FBQSxZQUFBLEtBQUEsTUFBQSxTQUFBLEtBQUEsSUFBQSxPQUFBLEtBQUEsUUFBQSxJQUFBLEtBQUEsR0FBQTtBQUFBLEVBQWdGO0FBQUEsRUFDbEYsZUFBQUE7QUFBQUEsRUFDZSxvQkFBQUM7QUFBQUEsRUFDSyxnQkFBQSxDQUFBLFNBQUEsS0FBQSxXQUFBO0FBQUEsRUFDb0IsZUFBQSxDQUFBLE1BQUEsV0FBQSxLQUFBLFdBQUEscUJBQUEsT0FBQSxXQUFBO0FBQUEsRUFDZ0Qsc0JBQUEsT0FBQSxFQUFBLE1BQUEsUUFBQSxLQUFBLFVBQUEsTUFBQTtBQUV0RixRQUFBLENBQUEsS0FBQSxRQUFBO0FBQ0UsVUFBQSxNQUFBLHlCQUFBO0FBQUEsSUFBbUM7QUFFckMsUUFBQSxLQUFBLFNBQUEsUUFBQTtBQUNFLFVBQUEsTUFBQSx1QkFBQTtBQUFBLElBQWlDO0FBR25DLFVBQUEsYUFBQSxLQUFBLGNBQUEsQ0FBQTtBQUNBLFVBQUEsU0FBQSxLQUFBLFdBQUEsb0JBQUEsT0FBQSxTQUFBLEtBQUE7QUFDQSxVQUFBLE9BQUEsV0FBQSwyQkFBQSxNQUFBO0FBQ0EsUUFBQSxDQUFBLE1BQUE7QUFDRSxVQUFBLE1BQUEsMEJBQUEsS0FBQSxNQUFBLEVBQUE7QUFBQSxJQUFpRDtBQUduRCxRQUFBLENBQUEsUUFBQSxLQUFBLFNBQUEsUUFBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBR1QsVUFBQSxZQUFBLFNBQUEsTUFBQSxnQkFBQSxRQUFBLE1BQUEsTUFBQSxHQUFBLFVBQUE7QUFDQSxVQUFBLGFBQUEsU0FBQSxNQUFBLGdCQUFBLFlBQUEsS0FBQSxNQUFBLENBQUE7QUFDQSxRQUFBLFVBQUEsVUFBQSxVQUFBLFdBQUEsVUFBQSxRQUFBO0FBQ0UsWUFBQSxPQUFBLHlCQUFBLEtBQUEsT0FBQSxLQUFBLDhCQUFBLEtBQUEsT0FBQTtBQUVBLGdCQUFBLFdBQUEsSUFBQSxlQUFBO0FBQ0EsWUFBQTtBQUFBLFFBQU0sTUFBQSxNQUFBLFVBQUEsVUFBQSxVQUFBLFdBQUEsVUFBQSxNQUFBO0FBQUEsTUFDdUU7QUFBQSxJQUM3RTtBQUVGLFVBQUEsU0FBQSxjQUFBLG1CQUFBLEtBQUEsTUFBQTtBQUVBLFVBQUEsYUFBQTtBQUFBLE1BQW1CLEtBQUEsa0JBQUEsU0FBQSxXQUFBO0FBQUEsTUFDNkIsVUFBQTtBQUFBLE1BQ3BDLEtBQUEsY0FBQSxPQUFBLFNBQUE7QUFBQSxJQUMyQjtBQUd2QyxVQUFBLGNBQUEsQ0FBQTtBQUNBLGVBQUEsVUFBQSxPQUFBLEtBQUEsVUFBQSxHQUFBO0FBQ0UsVUFBQSxXQUFBLFNBQUEsTUFBQSxHQUFBO0FBQ0U7QUFBQSxNQUFBO0FBRUYsWUFBQSxVQUFBLFdBQUEsTUFBQTtBQUNBLFVBQUEsUUFBQSxlQUFBLEdBQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixZQUFBLE9BQUEsT0FBQSxLQUFBLFNBQUEsV0FBQSxLQUFBLE9BQUEsV0FBQSxLQUFBLElBQUE7QUFDQSxZQUFBLE9BQUEsS0FBQSxNQUFBLFFBQUEsV0FBQSxRQUFBLFFBQUEsV0FBQTtBQUNBLFVBQUEsT0FBQSxHQUFBO0FBQ0Usb0JBQUEsTUFBQSxJQUFBO0FBQUEsTUFBc0I7QUFBQSxJQUN4QjtBQUVGLFdBQUE7QUFBQSxFQUFPO0FBRVgsQ0FBQTsifQ==
