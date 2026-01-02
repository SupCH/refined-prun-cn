import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import link from './link.module.css.js';
import { showBuffer } from './buffers.js';
import { isPresent } from './is-present.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tbody'), tbody => {
    subscribe($$(tbody, 'tr'), tr => {
      const commandColumn = tr.children[0];
      const command = commandColumn?.textContent;
      const mandatoryParameters = tr.children[2];
      if (!isPresent(command) || mandatoryParameters === void 0) {
        return;
      }
      commandColumn.classList.add(link.link);
      commandColumn.addEventListener('click', () => {
        void showBuffer(command, { autoSubmit: (mandatoryParameters.textContent ?? '') === '' });
      });
    });
  });
}
function init() {
  tiles.observe('CMDS', onTileReady);
}
features.add(import.meta.url, init, 'CMDS: Makes commands clickable.');
