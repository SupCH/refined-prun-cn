import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { localAdsStore } from './local-ads.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.CommodityAd.container), onAdContainerReady);
}
async function onAdContainerReady(container) {
  const element = await $(container, C.CommodityAd.text);
  const id = getPrunId(container);
  const ad = localAdsStore.getById(id);
  if (!ad || (ad.type !== 'COMMODITY_BUYING' && ad.type !== 'COMMODITY_SELLING')) {
    return;
  }
  if (ad.type !== 'COMMODITY_BUYING' && ad.type !== 'COMMODITY_SELLING') {
    return;
  }
  const type = element.firstChild?.nodeValue ?? null;
  const span = document.createElement('span');
  span.className =
    ad.type === 'COMMODITY_BUYING' ? C.OrderTypeLabel.BUYING : C.OrderTypeLabel.SELLING;
  span.textContent = type;
  element.replaceChild(span, element.firstChild);
}
function init() {
  tiles.observe(['LM', 'LMA'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'LM: Colors the BUYING and SELLING in green and red respectively.',
);
