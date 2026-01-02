import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import LMMaterialIcon from './LMMaterialIcon.vue.js';
import LMShipmentIcon from './LMShipmentIcon.vue.js';
import { getPrunId } from './attributes.js';
import { localAdsStore } from './local-ads.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.CommodityAd.container), onContainerReady);
}
async function onContainerReady(container) {
  const text = await $(container, C.CommodityAd.text);
  const id = getPrunId(container);
  const ad = localAdsStore.getById(id);
  if (!ad) {
    return;
  }
  const type = ad.type;
  const quantity = ad.quantity;
  if (type === 'COMMODITY_SHIPPING') {
    createFragmentApp(LMShipmentIcon).prependTo(container);
  }
  if ((type === 'COMMODITY_BUYING' || type === 'COMMODITY_SELLING') && quantity) {
    const ticker = quantity.material.ticker;
    text.childNodes[1].textContent = text.childNodes[1].textContent.replace(`(${ticker})`, '');
    createFragmentApp(LMMaterialIcon, { ticker }).prependTo(container);
  }
}
function init() {
  tiles.observe('LM', onTileReady);
}
features.add(import.meta.url, init, 'LM: Adds material and shipment icons to ads.');
