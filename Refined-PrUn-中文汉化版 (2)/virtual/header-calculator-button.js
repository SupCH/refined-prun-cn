import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { showBuffer } from './buffers.js';
import TileControlsButton from './TileControlsButton.vue.js';
async function onTileReady(tile) {
  const tileControls = await $(tile.frame, C.TileFrame.controls);
  createFragmentApp(TileControlsButton, {
    icon: '',
    onClick: () => showBuffer('XIT CALC'),
    marginTop: 4,
  }).prependTo(tileControls);
  return;
}
function init() {
  tiles.observe(['LM', 'CX', 'XIT'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'Adds a calculator button to the buffer header of LM, CX and XIT commands.',
);
