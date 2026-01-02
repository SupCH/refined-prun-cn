import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import BuildingCountSection from './BuildingCountSection.vue.js';
function onTileReady(tile) {
  const naturalId = tile.parameter;
  if (!naturalId) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.container), container => {
    createFragmentApp(BuildingCountSection, { naturalId }).appendTo(container);
  });
}
function init() {
  tiles.observe('BS', onTileReady);
}
features.add(import.meta.url, init, 'BS: Adds a building summary list.');
