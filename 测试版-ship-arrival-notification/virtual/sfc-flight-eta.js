import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refTextContent } from './reactive-dom.js';
import { shipsStore } from './ships.js';
import { flightsStore } from './flights.js';
import { formatEta } from './format.js';
import { timestampEachMinute } from './dayjs.js';
import { createReactiveSpan } from './reactive-element.js';
import { keepLast } from './keep-last.js';
import { refPrunId } from './attributes.js';
import { flightPlansStore } from './flight-plans.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const ship = computed(() => shipsStore.getByRegistration(tile.parameter));
  subscribe($$(tile.anchor, C.MissionPlan.table), x => onTableReady(x, ship));
}
function onTableReady(table, ship) {
  const planId = refPrunId(table);
  subscribe($$(table, 'tr'), x => onRowReady(x, ship, planId));
}
function onRowReady(row, ship, planId) {
  const firstColumn = refTextContent(row.children[0]);
  const arrival = computed(() =>
    getFlightSegmentArrival(ship.value, firstColumn.value, planId.value),
  );
  const eta = computed(() =>
    arrival.value !== void 0 ? ` (${formatEta(timestampEachMinute.value, arrival.value)})` : void 0,
  );
  const span = createReactiveSpan(row, eta);
  keepLast(row, () => row.children[3], span);
}
function getFlightSegmentArrival(ship, index, planId) {
  if (!ship || index === null) {
    return void 0;
  }
  let segments;
  if (ship.flightId) {
    const flight = flightsStore.getById(ship.flightId);
    if (!flight) {
      return void 0;
    }
    segments = flight.segments;
  } else {
    const plan = flightPlansStore.getById(planId);
    if (!plan) {
      return void 0;
    }
    segments = plan.segments;
  }
  const segmentId = index !== '' ? parseInt(index, 10) : segments.length - 1;
  if (isFinite(segmentId) && segmentId < segments.length) {
    return segments[segmentId].arrival.timestamp;
  }
  return void 0;
}
function init() {
  tiles.observe('SFC', onTileReady);
}
features.add(import.meta.url, init, 'SFC: Adds an arrival date to the "Duration" column.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2ZjLWZsaWdodC1ldGEuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9zZmMtZmxpZ2h0LWV0YS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWZUZXh0Q29udGVudCB9IGZyb20gJ0BzcmMvdXRpbHMvcmVhY3RpdmUtZG9tJztcbmltcG9ydCB7IHNoaXBzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2hpcHMnO1xuaW1wb3J0IHsgZmxpZ2h0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2ZsaWdodHMnO1xuaW1wb3J0IHsgZm9ybWF0RXRhIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgdGltZXN0YW1wRWFjaE1pbnV0ZSB9IGZyb20gJ0BzcmMvdXRpbHMvZGF5anMnO1xuaW1wb3J0IHsgY3JlYXRlUmVhY3RpdmVTcGFuIH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1lbGVtZW50JztcbmltcG9ydCB7IGtlZXBMYXN0IH0gZnJvbSAnQHNyYy91dGlscy9rZWVwLWxhc3QnO1xuaW1wb3J0IHsgcmVmUHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgZmxpZ2h0UGxhbnNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9mbGlnaHQtcGxhbnMnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBzaGlwID0gY29tcHV0ZWQoKCkgPT4gc2hpcHNTdG9yZS5nZXRCeVJlZ2lzdHJhdGlvbih0aWxlLnBhcmFtZXRlcikpO1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuTWlzc2lvblBsYW4udGFibGUpLCB4ID0+IG9uVGFibGVSZWFkeSh4LCBzaGlwKSk7XG59XG5cbmZ1bmN0aW9uIG9uVGFibGVSZWFkeSh0YWJsZTogSFRNTEVsZW1lbnQsIHNoaXA6IFJlZjxQcnVuQXBpLlNoaXAgfCB1bmRlZmluZWQ+KSB7XG4gIGNvbnN0IHBsYW5JZCA9IHJlZlBydW5JZCh0YWJsZSk7XG4gIHN1YnNjcmliZSgkJCh0YWJsZSwgJ3RyJyksIHggPT4gb25Sb3dSZWFkeSh4LCBzaGlwLCBwbGFuSWQpKTtcbn1cblxuZnVuY3Rpb24gb25Sb3dSZWFkeShcbiAgcm93OiBIVE1MRWxlbWVudCxcbiAgc2hpcDogUmVmPFBydW5BcGkuU2hpcCB8IHVuZGVmaW5lZD4sXG4gIHBsYW5JZDogUmVmPHN0cmluZyB8IG51bGw+LFxuKSB7XG4gIGNvbnN0IGZpcnN0Q29sdW1uID0gcmVmVGV4dENvbnRlbnQocm93LmNoaWxkcmVuWzBdKTtcbiAgY29uc3QgYXJyaXZhbCA9IGNvbXB1dGVkKCgpID0+XG4gICAgZ2V0RmxpZ2h0U2VnbWVudEFycml2YWwoc2hpcC52YWx1ZSwgZmlyc3RDb2x1bW4udmFsdWUsIHBsYW5JZC52YWx1ZSksXG4gICk7XG4gIGNvbnN0IGV0YSA9IGNvbXB1dGVkKCgpID0+XG4gICAgYXJyaXZhbC52YWx1ZSAhPT0gdW5kZWZpbmVkXG4gICAgICA/IGAgKCR7Zm9ybWF0RXRhKHRpbWVzdGFtcEVhY2hNaW51dGUudmFsdWUsIGFycml2YWwudmFsdWUpfSlgXG4gICAgICA6IHVuZGVmaW5lZCxcbiAgKTtcbiAgY29uc3Qgc3BhbiA9IGNyZWF0ZVJlYWN0aXZlU3Bhbihyb3csIGV0YSk7XG4gIGtlZXBMYXN0KHJvdywgKCkgPT4gcm93LmNoaWxkcmVuWzNdLCBzcGFuKTtcbn1cblxuZnVuY3Rpb24gZ2V0RmxpZ2h0U2VnbWVudEFycml2YWwoXG4gIHNoaXA6IFBydW5BcGkuU2hpcCB8IHVuZGVmaW5lZCxcbiAgaW5kZXg6IHN0cmluZyB8IG51bGwsXG4gIHBsYW5JZDogc3RyaW5nIHwgbnVsbCxcbikge1xuICBpZiAoIXNoaXAgfHwgaW5kZXggPT09IG51bGwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgbGV0IHNlZ21lbnRzOiBQcnVuQXBpLkZsaWdodFNlZ21lbnRbXTtcblxuICBpZiAoc2hpcC5mbGlnaHRJZCkge1xuICAgIGNvbnN0IGZsaWdodCA9IGZsaWdodHNTdG9yZS5nZXRCeUlkKHNoaXAuZmxpZ2h0SWQpO1xuICAgIGlmICghZmxpZ2h0KSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cblxuICAgIHNlZ21lbnRzID0gZmxpZ2h0LnNlZ21lbnRzO1xuICB9IGVsc2Uge1xuICAgIGNvbnN0IHBsYW4gPSBmbGlnaHRQbGFuc1N0b3JlLmdldEJ5SWQocGxhbklkKTtcbiAgICBpZiAoIXBsYW4pIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuXG4gICAgc2VnbWVudHMgPSBwbGFuLnNlZ21lbnRzO1xuICB9XG5cbiAgY29uc3Qgc2VnbWVudElkID0gaW5kZXggIT09ICcnID8gcGFyc2VJbnQoaW5kZXgsIDEwKSA6IHNlZ21lbnRzLmxlbmd0aCAtIDE7XG4gIGlmIChpc0Zpbml0ZShzZWdtZW50SWQpICYmIHNlZ21lbnRJZCA8IHNlZ21lbnRzLmxlbmd0aCkge1xuICAgIHJldHVybiBzZWdtZW50c1tzZWdtZW50SWRdLmFycml2YWwudGltZXN0YW1wO1xuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnU0ZDJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnU0ZDOiBBZGRzIGFuIGFycml2YWwgZGF0ZSB0byB0aGUgXCJEdXJhdGlvblwiIGNvbHVtbi4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFVQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFFBQUEsT0FBQSxTQUFBLE1BQUEsV0FBQSxrQkFBQSxLQUFBLFNBQUEsQ0FBQTtBQUNBLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxZQUFBLEtBQUEsR0FBQSxDQUFBLE1BQUEsYUFBQSxHQUFBLElBQUEsQ0FBQTtBQUNGO0FBRUEsU0FBQSxhQUFBLE9BQUEsTUFBQTtBQUNFLFFBQUEsU0FBQSxVQUFBLEtBQUE7QUFDQSxZQUFBLEdBQUEsT0FBQSxJQUFBLEdBQUEsQ0FBQSxNQUFBLFdBQUEsR0FBQSxNQUFBLE1BQUEsQ0FBQTtBQUNGO0FBRUEsU0FBQSxXQUFBLEtBQUEsTUFBQSxRQUFBO0FBS0UsUUFBQSxjQUFBLGVBQUEsSUFBQSxTQUFBLENBQUEsQ0FBQTtBQUNBLFFBQUEsVUFBQTtBQUFBLElBQWdCLE1BQUEsd0JBQUEsS0FBQSxPQUFBLFlBQUEsT0FBQSxPQUFBLEtBQUE7QUFBQSxFQUNxRDtBQUVyRSxRQUFBLE1BQUE7QUFBQSxJQUFZLE1BQUEsUUFBQSxVQUFBLFNBQUEsS0FBQSxVQUFBLG9CQUFBLE9BQUEsUUFBQSxLQUFBLENBQUEsTUFBQTtBQUFBLEVBR047QUFFTixRQUFBLE9BQUEsbUJBQUEsS0FBQSxHQUFBO0FBQ0EsV0FBQSxLQUFBLE1BQUEsSUFBQSxTQUFBLENBQUEsR0FBQSxJQUFBO0FBQ0Y7QUFFQSxTQUFBLHdCQUFBLE1BQUEsT0FBQSxRQUFBO0FBS0UsTUFBQSxDQUFBLFFBQUEsVUFBQSxNQUFBO0FBQ0UsV0FBQTtBQUFBLEVBQU87QUFHVCxNQUFBO0FBRUEsTUFBQSxLQUFBLFVBQUE7QUFDRSxVQUFBLFNBQUEsYUFBQSxRQUFBLEtBQUEsUUFBQTtBQUNBLFFBQUEsQ0FBQSxRQUFBO0FBQ0UsYUFBQTtBQUFBLElBQU87QUFHVCxlQUFBLE9BQUE7QUFBQSxFQUFrQixPQUFBO0FBRWxCLFVBQUEsT0FBQSxpQkFBQSxRQUFBLE1BQUE7QUFDQSxRQUFBLENBQUEsTUFBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBR1QsZUFBQSxLQUFBO0FBQUEsRUFBZ0I7QUFHbEIsUUFBQSxZQUFBLFVBQUEsS0FBQSxTQUFBLE9BQUEsRUFBQSxJQUFBLFNBQUEsU0FBQTtBQUNBLE1BQUEsU0FBQSxTQUFBLEtBQUEsWUFBQSxTQUFBLFFBQUE7QUFDRSxXQUFBLFNBQUEsU0FBQSxFQUFBLFFBQUE7QUFBQSxFQUFtQztBQUdyQyxTQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsT0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEscURBQUE7In0=
