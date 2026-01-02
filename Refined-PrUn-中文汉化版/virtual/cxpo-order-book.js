import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import OrderBook from './OrderBook.vue.js';
import { changeInputValue } from './util.js';
import { increaseDefaultBufferSize } from './buffer-sizes.js';
import { fixed02, fixed0 } from './format.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.ComExPlaceOrderForm.form), form => {
    const formParent = form.parentElement;
    formParent.style.display = 'flex';
    form.style.flex = '1';
    for (const label of _$$(form, C.FormComponent.label)) {
      label.style.minWidth = '120px';
    }
    for (const span of _$$(form, C.Tooltip.container)) {
      span.setAttribute('data-tooltip-position', 'right');
    }
    const dynamicInputs = _$$(form, 'input');
    function onOrderClick(price, quantity) {
      changeInputValue(dynamicInputs[1], fixed02(price));
      if (quantity !== void 0 && quantity > 0) {
        changeInputValue(dynamicInputs[0], fixed0(quantity));
      }
    }
    createFragmentApp(OrderBook, { ticker: tile.parameter, onOrderClick }).appendTo(formParent);
  });
}
function init() {
  increaseDefaultBufferSize('CXPO', { width: 60 });
  tiles.observe('CXPO', onTileReady);
}
features.add(import.meta.url, init, 'CXPO: Adds a compact order book.');
