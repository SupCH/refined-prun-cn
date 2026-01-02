import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refTextContent } from './reactive-dom.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { observeDescendantListChanged } from './mutation-observer.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.LiquidAssetsPanel.row), row => {
    const currency = refTextContent(row.children[0]);
    watchEffectWhileNodeAlive(row, () => {
      row.style.display = currency.value === 'ECD' ? 'none' : '';
    });
  });
  subscribe($$(tile.anchor, 'tbody'), tbody => {
    observeDescendantListChanged(tbody, () => {
      const rows = _$$(tbody, 'tr');
      for (const row of rows) {
        const currency = row.children[0].textContent;
        if (currency !== 'ECD') {
          continue;
        }
        if (row !== tbody.lastChild) {
          tbody.appendChild(row);
        }
        return;
      }
    });
  });
}
function init() {
  tiles.observe('FINLA', onTileReady);
}
features.add(import.meta.url, init, 'FINLA: Hides the ECD row.');
