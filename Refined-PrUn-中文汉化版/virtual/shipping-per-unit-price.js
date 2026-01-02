import { subscribe } from './subscribe-async-generator.js';
import { $$, $, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import _sfc_main from './PpuLabel.vue.js';
import { refValue } from './reactive-dom.js';
import { fixed2 } from './format.js';
import { getPrunId } from './attributes.js';
import { localAdsStore } from './local-ads.js';
import { reactive } from './reactivity.esm-bundler.js';
function onLMTileReady(tile) {
  subscribe($$(tile.anchor, C.CommodityAd.container), onAdContainerReady);
}
async function onAdContainerReady(container) {
  const text = await $(container, C.CommodityAd.text);
  const id = getPrunId(container);
  const ad = localAdsStore.getById(id);
  if (!ad || ad.type !== 'COMMODITY_SHIPPING') {
    return;
  }
  const weight = ad.cargoWeight ?? 0;
  const volume = ad.cargoVolume ?? 0;
  if (weight === 0 && volume === 0) {
    return;
  }
  const unit = weight > volume ? 't' : 'm³';
  const amount = weight > volume ? weight : volume;
  const total = ad.price.amount;
  for (let i = 0; i < text.childNodes.length; i++) {
    const child = text.childNodes[i];
    if (child.nodeValue && child.nodeValue.includes(ad.price.currency)) {
      const span = document.createElement('span');
      span.textContent = ` (${fixed2(total / amount)}/${unit})`;
      child.after(span);
      break;
    }
  }
}
function onLMPTileReady(tile) {
  subscribe($$(tile.anchor, C.LocalMarketPost.form), onFormReady);
}
function onFormReady(form) {
  const type = _$$(form, C.StaticInput.static);
  if (!type.find(x => x.textContent === 'SHIPPING')) {
    return;
  }
  function selectInput(query) {
    return document.evaluate(query, form, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null)
      .singleNodeValue;
  }
  const commodityInput = selectInput("div[label/span[text()='Commodity']]//input");
  const amountInput = selectInput("div[label/span[text()='Amount']]//input");
  const totalPriceInput = selectInput("div[label/span[text()='Total price']]//input");
  createFragmentApp(
    _sfc_main,
    reactive({
      materialName: refValue(commodityInput),
      amountInput: refValue(amountInput),
      totalPriceInput: refValue(totalPriceInput),
    }),
  ).before(totalPriceInput.parentElement);
}
function init() {
  tiles.observe(['LM', 'LMA'], onLMTileReady);
  tiles.observe('LMP', onLMPTileReady);
}
features.add(import.meta.url, init, 'Adds a per-unit price label to ads in LM, LMA, and LMP.');
