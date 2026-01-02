import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ShipStore.store), div => {
    const label = div.children[2];
    if (label !== void 0) {
      label.textContent = (label.textContent || '')
        .replace(/(t|m³)/g, '')
        .replace(/(\d+)([,.]?000)/g, (_, x) => `${x}k`);
    }
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'FLT: Removes "t" and "m³" and converts cargo capacity label to k-notation.',
);
