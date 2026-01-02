import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { UI_WINDOWS_REQUEST_FOCUS } from './client-messages.js';
import { dispatchClientPrunMessage } from './prun-api-listener.js';
async function onTileReady(tile) {
  if (tile.docked) {
    return;
  }
  if (tile.command === 'HQ') {
    return;
  }
  const tileWindow = tile.frame.closest(`.${C.Window.window}`);
  tileWindow?.addEventListener('mousedown', () => {
    const command = UI_WINDOWS_REQUEST_FOCUS(tile.id);
    dispatchClientPrunMessage(command);
  });
}
function init() {
  tiles.observeAll(onTileReady);
}
features.add(import.meta.url, init, 'Focuses buffers on click anywhere, not just the header.');
