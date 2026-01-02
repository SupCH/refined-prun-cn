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
