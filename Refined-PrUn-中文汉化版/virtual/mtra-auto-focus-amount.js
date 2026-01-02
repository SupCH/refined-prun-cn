import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  if (tile.docked) {
    return;
  }
  subscribe($$(tile.anchor, 'input'), input => {
    if (input.type === 'text') {
      input.focus();
      input.select();
    }
  });
}
function init() {
  tiles.observe('MTRA', onTileReady);
}
features.add(import.meta.url, init, 'MTRA: Automatically focuses the amount input on buffer open.');
