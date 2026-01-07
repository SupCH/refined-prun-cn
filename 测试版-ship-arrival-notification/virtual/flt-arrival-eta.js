import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { shipsStore } from './ships.js';
import { flightsStore } from './flights.js';
import { formatEta } from './format.js';
import { timestampEachMinute } from './dayjs.js';
import { refPrunId } from './attributes.js';
import { createReactiveSpan } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tr'), onRowReady);
}
function onRowReady(row) {
  const id = refPrunId(row);
  const arrival = computed(() => {
    const ship = shipsStore.getById(id.value);
    const flight = flightsStore.getById(ship?.flightId);
    return flight?.arrival.timestamp;
  });
  const eta = computed(() =>
    arrival.value !== void 0 ? ` (${formatEta(timestampEachMinute.value, arrival.value)})` : void 0,
  );
  const span = createReactiveSpan(row, eta);
  keepLast(row, () => row.children[7], span);
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(import.meta.url, init, 'FLT: Adds an arrival date to the "ETA" column.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx0LWFycml2YWwtZXRhLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvZmx0LWFycml2YWwtZXRhLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHNoaXBzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2hpcHMnO1xuaW1wb3J0IHsgZmxpZ2h0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2ZsaWdodHMnO1xuaW1wb3J0IHsgZm9ybWF0RXRhIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgdGltZXN0YW1wRWFjaE1pbnV0ZSB9IGZyb20gJ0BzcmMvdXRpbHMvZGF5anMnO1xuaW1wb3J0IHsgcmVmUHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgY3JlYXRlUmVhY3RpdmVTcGFuIH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1lbGVtZW50JztcbmltcG9ydCB7IGtlZXBMYXN0IH0gZnJvbSAnQHNyYy91dGlscy9rZWVwLWxhc3QnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsICd0cicpLCBvblJvd1JlYWR5KTtcbn1cblxuZnVuY3Rpb24gb25Sb3dSZWFkeShyb3c6IEhUTUxUYWJsZVJvd0VsZW1lbnQpIHtcbiAgY29uc3QgaWQgPSByZWZQcnVuSWQocm93KTtcbiAgY29uc3QgYXJyaXZhbCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgICBjb25zdCBzaGlwID0gc2hpcHNTdG9yZS5nZXRCeUlkKGlkLnZhbHVlKTtcbiAgICBjb25zdCBmbGlnaHQgPSBmbGlnaHRzU3RvcmUuZ2V0QnlJZChzaGlwPy5mbGlnaHRJZCk7XG4gICAgcmV0dXJuIGZsaWdodD8uYXJyaXZhbC50aW1lc3RhbXA7XG4gIH0pO1xuICBjb25zdCBldGEgPSBjb21wdXRlZCgoKSA9PlxuICAgIGFycml2YWwudmFsdWUgIT09IHVuZGVmaW5lZFxuICAgICAgPyBgICgke2Zvcm1hdEV0YSh0aW1lc3RhbXBFYWNoTWludXRlLnZhbHVlLCBhcnJpdmFsLnZhbHVlKX0pYFxuICAgICAgOiB1bmRlZmluZWQsXG4gICk7XG4gIGNvbnN0IHNwYW4gPSBjcmVhdGVSZWFjdGl2ZVNwYW4ocm93LCBldGEpO1xuICBrZWVwTGFzdChyb3csICgpID0+IHJvdy5jaGlsZHJlbls3XSwgc3Bhbik7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydGTFQnLCAnRkxUUycsICdGTFRQJ10sIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0ZMVDogQWRkcyBhbiBhcnJpdmFsIGRhdGUgdG8gdGhlIFwiRVRBXCIgY29sdW1uLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxJQUFBLEdBQUEsVUFBQTtBQUNGO0FBRUEsU0FBQSxXQUFBLEtBQUE7QUFDRSxRQUFBLEtBQUEsVUFBQSxHQUFBO0FBQ0EsUUFBQSxVQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsT0FBQSxXQUFBLFFBQUEsR0FBQSxLQUFBO0FBQ0EsVUFBQSxTQUFBLGFBQUEsUUFBQSxNQUFBLFFBQUE7QUFDQSxXQUFBLFFBQUEsUUFBQTtBQUFBLEVBQXVCLENBQUE7QUFFekIsUUFBQSxNQUFBO0FBQUEsSUFBWSxNQUFBLFFBQUEsVUFBQSxTQUFBLEtBQUEsVUFBQSxvQkFBQSxPQUFBLFFBQUEsS0FBQSxDQUFBLE1BQUE7QUFBQSxFQUdOO0FBRU4sUUFBQSxPQUFBLG1CQUFBLEtBQUEsR0FBQTtBQUNBLFdBQUEsS0FBQSxNQUFBLElBQUEsU0FBQSxDQUFBLEdBQUEsSUFBQTtBQUNGO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLENBQUEsT0FBQSxRQUFBLE1BQUEsR0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsZ0RBQUE7In0=
