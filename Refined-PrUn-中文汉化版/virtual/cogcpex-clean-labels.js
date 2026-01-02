import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.Button.darkInline), button => {
    button.textContent = 'vote';
  });
  subscribe($$(tile.anchor, C.Link.link), link => {
    if (link.textContent) {
      link.textContent = link.textContent
        .replace('Advertising Campaign: ', '')
        .replace('Education Events: ', '');
    }
  });
}
function init() {
  tiles.observe('COGCPEX', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'COGCPEX: Hides "Advertising Campaign:" and "Education Events:" parts of the campaign labels.',
);
