import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ScrollView.view), scroll => {
    subscribe($$(scroll, 'table'), async table => {
      const spread = await $(table, C.ComExOrderBookPanel.spread);
      const spreadRect = spread.getBoundingClientRect();
      scroll.scrollTop = Math.max(
        spread.offsetTop - scroll.clientHeight / 2 + spreadRect.height / 2,
        0,
      );
    });
  });
}
function init() {
  tiles.observe('CXOB', onTileReady);
}
features.add(import.meta.url, init, 'CXOB: Centers the order book on open.');
