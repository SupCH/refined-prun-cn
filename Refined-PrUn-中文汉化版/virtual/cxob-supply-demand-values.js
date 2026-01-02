import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './cxob-supply-demand-values.module.css.js';
import SupplyDemandValues from './SupplyDemandValues.vue.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExOrderBookPanel.spread), async spread => {
    createFragmentApp(SupplyDemandValues, { ticker: tile.parameter }).prependTo(spread);
  });
}
function init() {
  applyCssRule(`.${C.ComExOrderBookPanel.spread}`, $style.spread);
  tiles.observe('CXOB', onTileReady);
}
features.add(import.meta.url, init, 'CXOB: Adds supply and demand value labels.');
