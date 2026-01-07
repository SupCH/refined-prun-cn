import { startRelay } from './relay.js';
import { listenPrunApi } from './prun-api-listener.js';
import { preloadFioResponses, loadFallbackPlanetData } from './fio-api.js';
import { watchUntil } from './watch.js';
import { companyStore } from './company.js';
import { alertsStore } from './alerts.js';
import { materialsStore } from './materials.js';
import { uiDataStore } from './ui-data.js';
import { balancesStore } from './balances.js';
import { flightsStore } from './flights.js';
import { shipsStore } from './ships.js';
import { starsStore } from './stars.js';
import { sitesStore } from './sites.js';
import { storagesStore } from './storage.js';
import { warehousesStore } from './warehouses.js';
import { contractsStore } from './contracts.js';
import { fetchPrices } from './cx.js';
async function initializeApi() {
  startRelay();
  void fetchPrices();
  preloadFioResponses();
  listenPrunApi();
  const startupStores = [
    alertsStore,
    balancesStore,
    contractsStore,
    flightsStore,
    materialsStore,
    shipsStore,
    sitesStore,
    starsStore,
    storagesStore,
    warehousesStore,
  ];
  await watchUntil(
    () =>
      uiDataStore.screens !== void 0 &&
      companyStore.value !== void 0 &&
      startupStores.every(x => x.fetched.value),
  );
  await loadFallbackPlanetData();
}
export { initializeApi };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXgyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvaW5kZXgudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc3RhcnRSZWxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvcmVsYXknO1xuaW1wb3J0IHsgbGlzdGVuUHJ1bkFwaSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvcHJ1bi1hcGktbGlzdGVuZXInO1xuaW1wb3J0IHsgbG9hZEZhbGxiYWNrUGxhbmV0RGF0YSwgcHJlbG9hZEZpb1Jlc3BvbnNlcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvZmlvL2Zpby1hcGknO1xuaW1wb3J0IHsgd2F0Y2hVbnRpbCB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgY29tcGFueVN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NvbXBhbnknO1xuaW1wb3J0IHsgYWxlcnRzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWxlcnRzJztcbmltcG9ydCB7IG1hdGVyaWFsc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFscyc7XG5pbXBvcnQgeyB1aURhdGFTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS91aS1kYXRhJztcbmltcG9ydCB7IGJhbGFuY2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYmFsYW5jZXMnO1xuaW1wb3J0IHsgZmxpZ2h0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2ZsaWdodHMnO1xuaW1wb3J0IHsgc2hpcHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaGlwcyc7XG5pbXBvcnQgeyBzdGFyc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3N0YXJzJztcbmltcG9ydCB7IHNpdGVzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2l0ZXMnO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IHdhcmVob3VzZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS93YXJlaG91c2VzJztcbmltcG9ydCB7IGNvbnRyYWN0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NvbnRyYWN0cyc7XG5pbXBvcnQgeyBmZXRjaFByaWNlcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvZmlvL2N4JztcblxuZXhwb3J0IGFzeW5jIGZ1bmN0aW9uIGluaXRpYWxpemVBcGkoKSB7XG4gIHN0YXJ0UmVsYXkoKTtcbiAgdm9pZCBmZXRjaFByaWNlcygpO1xuICBwcmVsb2FkRmlvUmVzcG9uc2VzKCk7XG4gIGxpc3RlblBydW5BcGkoKTtcbiAgY29uc3Qgc3RhcnR1cFN0b3JlcyA9IFtcbiAgICBhbGVydHNTdG9yZSxcbiAgICBiYWxhbmNlc1N0b3JlLFxuICAgIGNvbnRyYWN0c1N0b3JlLFxuICAgIGZsaWdodHNTdG9yZSxcbiAgICBtYXRlcmlhbHNTdG9yZSxcbiAgICBzaGlwc1N0b3JlLFxuICAgIHNpdGVzU3RvcmUsXG4gICAgc3RhcnNTdG9yZSxcbiAgICBzdG9yYWdlc1N0b3JlLFxuICAgIHdhcmVob3VzZXNTdG9yZSxcbiAgXTtcbiAgYXdhaXQgd2F0Y2hVbnRpbChcbiAgICAoKSA9PlxuICAgICAgdWlEYXRhU3RvcmUuc2NyZWVucyAhPT0gdW5kZWZpbmVkICYmXG4gICAgICBjb21wYW55U3RvcmUudmFsdWUgIT09IHVuZGVmaW5lZCAmJlxuICAgICAgc3RhcnR1cFN0b3Jlcy5ldmVyeSh4ID0+IHguZmV0Y2hlZC52YWx1ZSksXG4gICk7XG4gIGF3YWl0IGxvYWRGYWxsYmFja1BsYW5ldERhdGEoKTtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxlQUFzQixnQkFBZ0I7QUFDcEMsYUFBQTtBQUNBLE9BQUssWUFBQTtBQUNMLHNCQUFBO0FBQ0EsZ0JBQUE7QUFDQSxRQUFNLGdCQUFnQjtBQUFBLElBQ3BCO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsSUFDQTtBQUFBLElBQ0E7QUFBQSxJQUNBO0FBQUEsRUFBQTtBQUVGLFFBQU07QUFBQSxJQUNKLE1BQ0UsWUFBWSxZQUFZLFVBQ3hCLGFBQWEsVUFBVSxVQUN2QixjQUFjLE1BQU0sQ0FBQSxNQUFLLEVBQUUsUUFBUSxLQUFLO0FBQUEsRUFBQTtBQUU1QyxRQUFNLHVCQUFBO0FBQ1I7In0=
