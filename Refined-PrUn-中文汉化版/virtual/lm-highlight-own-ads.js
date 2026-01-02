import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './lm-highlight-own-ads.module.css.js';
import { companyStore } from './company.js';
import { getPrunId } from './attributes.js';
import { localAdsStore } from './local-ads.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.LocalMarket.item), async item => {
    const container = await $(item, C.CommodityAd.container);
    const id = getPrunId(container);
    const ad = localAdsStore.getById(id);
    if (ad?.creator.id === companyStore.value?.id) {
      item.classList.add($style.ownAd);
    }
  });
}
function init() {
  tiles.observe('LM', onTileReady);
}
features.add(import.meta.url, init, 'LM: Highlights own ads.');
