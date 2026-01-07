import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.SectionList.button), buttons => {
    const demolish = buttons.children[1];
    demolish?.classList.add(C.Button.danger);
  });
}
function init() {
  tiles.observe('BBL', onTileReady);
}
features.add(import.meta.url, init, 'BBL: Applies the "danger" style to the "Demolish" button.');
