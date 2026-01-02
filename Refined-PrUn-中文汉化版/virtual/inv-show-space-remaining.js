import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { fixed02 } from './format.js';
import { getInvStore } from './store-id.js';
import { createReactiveSpan } from './reactive-element.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const store = computed(() => getInvStore(tile.parameter));
  const [weightIndex, volumeIndex] = tile.command === 'SHPI' ? [0, 1] : [1, 2];
  subscribe($$(tile.anchor, C.StoreView.column), column => {
    const capacities = _$$(column, C.StoreView.capacity);
    if (capacities.length < 2) {
      return;
    }
    const weightText = computed(() =>
      store.value ? ` (${fixed02(store.value.weightCapacity - store.value.weightLoad)}t)` : void 0,
    );
    const weightSpan = createReactiveSpan(capacities[weightIndex], weightText);
    weightSpan.style.whiteSpace = 'pre';
    capacities[weightIndex].appendChild(weightSpan);
    const volumeText = computed(() =>
      store.value ? ` (${fixed02(store.value.volumeCapacity - store.value.volumeLoad)}m³)` : void 0,
    );
    const volumeSpan = createReactiveSpan(capacities[volumeIndex], volumeText);
    volumeSpan.style.whiteSpace = 'pre';
    capacities[volumeIndex].appendChild(volumeSpan);
  });
}
function init() {
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'INV/SHPI: Shows the remaining weight and volume capacity of the selected store in INV and SHPI',
);
