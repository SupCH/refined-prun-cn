import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { showBuffer } from './buffers.js';
import TileControlsButton from './TileControlsButton.vue.js';
async function onTileReady(tile) {
  const splitControls = await $(tile.frame, C.TileControls.splitControls);
  createFragmentApp(TileControlsButton, {
    icon: '',
    onClick: () => showBuffer(tile.fullCommand, { force: true }),
  }).before(splitControls);
}
function init() {
  tiles.observeAll(onTileReady);
}
features.add(import.meta.url, init, 'Adds a tile duplicate button to the buffer header.');
