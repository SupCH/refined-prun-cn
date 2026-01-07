import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { shipsStore } from './ships.js';
import { flightsStore } from './flights.js';
import { isEmpty } from './is-empty.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tr'), row => {
    const id = refPrunId(row);
    const ship = computed(() => shipsStore.getById(id.value));
    const flight = computed(() => flightsStore.getById(ship.value?.flightId));
    const labels = {
      TAKE_OFF: '↑',
      DEPARTURE: '↗',
      CHARGE: '±',
      JUMP: '⟿',
      TRANSIT: '⟶',
      APPROACH: '↘',
      LANDING: '↓',
    };
    const statusLabel = computed(() => {
      if (!ship.value) {
        return void 0;
      }
      if (!flight.value) {
        return '⦁';
      }
      const segment = flight.value.segments[flight.value.currentSegmentIndex];
      if (segment === void 0) {
        return void 0;
      }
      return labels[segment.type] ?? void 0;
    });
    function replaceStatus() {
      if (statusLabel.value === void 0) {
        return;
      }
      const statusCell = row.children[3];
      if (statusCell === void 0) {
        return;
      }
      const nodes = Array.from(statusCell.childNodes).filter(
        x => x.nodeType === Node.TEXT_NODE || x.nodeType === Node.ELEMENT_NODE,
      );
      if (isEmpty(nodes)) {
        return;
      }
      if (statusCell.style.textAlign !== 'center') {
        statusCell.style.textAlign = 'center';
      }
      if (nodes[0].textContent !== statusLabel.value) {
        nodes[0].textContent = statusLabel.value;
      }
      for (const node of nodes.slice(1)) {
        if (node.textContent) {
          node.textContent = '';
        }
      }
    }
    replaceStatus();
    const observer = new MutationObserver(replaceStatus);
    observer.observe(row, { childList: true, subtree: true, characterData: true });
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(import.meta.url, init, 'FLT: Replaces the flight status text with arrow icons.');
