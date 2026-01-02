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
