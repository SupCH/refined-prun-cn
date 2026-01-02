import { C } from './prun-css.js';
import { $ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { matchBufferSize } from './buffer-sizes.js';
import { setBufferSize } from './buffers.js';
const pastWindows = /* @__PURE__ */ new WeakSet();
async function onTileReady(tile) {
  if (tile.docked) {
    return;
  }
  if (!pastWindows.has(tile.container)) {
    pastWindows.add(tile.container);
    return;
  }
  const size = matchBufferSize(tile.fullCommand) ?? [450, 300];
  const buffer = tile.frame.closest(`.${C.Window.window}`);
  if (!buffer) {
    return;
  }
  const body = await $(buffer, C.Window.body);
  const width = parseInt(body.style.width.replace('px', ''), 10);
  const height = parseInt(body.style.height.replace('px', ''), 10);
  setBufferSize(tile.id, Math.max(size[0], width), Math.max(size[1], height));
}
function init() {
  tiles.observeAll(onTileReady);
}
features.add(import.meta.url, init, 'Automatically resizes the buffer size on command change.');
