import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { storagesStore } from './storage.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, 'tr'), row => {
    const id = refPrunId(row);
    const name = computed(() => {
      const storage = storagesStore.getById(id.value);
      switch (storage?.type) {
        case 'STORE':
          return 'Base';
        case 'WAREHOUSE_STORE':
          return 'WAR';
        case 'SHIP_STORE':
          return 'Ship';
        case 'STL_FUEL_STORE':
          return 'STL';
        case 'FTL_FUEL_STORE':
          return 'FTL';
        default:
          return void 0;
      }
    });
    watchEffectWhileNodeAlive(row, () => {
      const typeLabel = row.firstChild?.firstChild;
      if (typeLabel && name.value !== void 0) {
        typeLabel.textContent = name.value;
      }
    });
  });
}
function init() {
  tiles.observe('INV', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'INV: Shortens storage type names in the first column of the main INV command.',
);
