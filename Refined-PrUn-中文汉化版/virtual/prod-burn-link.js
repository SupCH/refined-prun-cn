import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import _sfc_main from './ContextControlsItem.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNaturalIdFromAddress } from './addresses.js';
async function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  const site = sitesStore.getById(tile.parameter);
  if (!site) {
    return;
  }
  const contextBar = await $(tile.frame, C.ContextControls.container);
  createFragmentApp(_sfc_main, {
    cmd: `XIT BURN ${getEntityNaturalIdFromAddress(site.address)}`,
  }).prependTo(contextBar);
}
function init() {
  tiles.observe('PROD', onTileReady);
}
features.add(import.meta.url, init, 'PROD: Adds a XIT BURN link to the context bar.');
