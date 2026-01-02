import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import _sfc_main from './ShipCondition.vue.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tr'), row => {
    createFragmentApp(
      _sfc_main,
      reactive({
        id: refPrunId(row),
      }),
    ).appendTo(row.children[1]);
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(import.meta.url, init, 'FLT: Adds a ship condition label to the "Name" column.');
