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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hpcHBpbmctcGVyLXVuaXQtcHJpY2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9zaGlwcGluZy1wZXItdW5pdC1wcmljZS9zaGlwcGluZy1wZXItdW5pdC1wcmljZS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgUHB1TGFiZWwgZnJvbSAnLi9QcHVMYWJlbC52dWUnO1xuaW1wb3J0IHsgcmVmVmFsdWUgfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWRvbSc7XG5pbXBvcnQgeyBmaXhlZDIgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyBnZXRQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBsb2NhbEFkc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2xvY2FsLWFkcyc7XG5cbmZ1bmN0aW9uIG9uTE1UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNvbW1vZGl0eUFkLmNvbnRhaW5lciksIG9uQWRDb250YWluZXJSZWFkeSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9uQWRDb250YWluZXJSZWFkeShjb250YWluZXI6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IHRleHQgPSBhd2FpdCAkKGNvbnRhaW5lciwgQy5Db21tb2RpdHlBZC50ZXh0KTtcbiAgY29uc3QgaWQgPSBnZXRQcnVuSWQoY29udGFpbmVyKTtcbiAgY29uc3QgYWQgPSBsb2NhbEFkc1N0b3JlLmdldEJ5SWQoaWQpO1xuICBpZiAoIWFkIHx8IGFkLnR5cGUgIT09ICdDT01NT0RJVFlfU0hJUFBJTkcnKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgd2VpZ2h0ID0gYWQuY2FyZ29XZWlnaHQgPz8gMDtcbiAgY29uc3Qgdm9sdW1lID0gYWQuY2FyZ29Wb2x1bWUgPz8gMDtcbiAgaWYgKHdlaWdodCA9PT0gMCAmJiB2b2x1bWUgPT09IDApIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgdW5pdCA9IHdlaWdodCA+IHZvbHVtZSA/ICd0JyA6ICdtwrMnO1xuICBjb25zdCBhbW91bnQgPSB3ZWlnaHQgPiB2b2x1bWUgPyB3ZWlnaHQgOiB2b2x1bWU7XG4gIGNvbnN0IHRvdGFsID0gYWQucHJpY2UuYW1vdW50O1xuICBmb3IgKGxldCBpID0gMDsgaSA8IHRleHQuY2hpbGROb2Rlcy5sZW5ndGg7IGkrKykge1xuICAgIGNvbnN0IGNoaWxkID0gdGV4dC5jaGlsZE5vZGVzW2ldO1xuICAgIGlmIChjaGlsZC5ub2RlVmFsdWUgJiYgY2hpbGQubm9kZVZhbHVlLmluY2x1ZGVzKGFkLnByaWNlLmN1cnJlbmN5KSkge1xuICAgICAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgICAgIHNwYW4udGV4dENvbnRlbnQgPSBgICgke2ZpeGVkMih0b3RhbCAvIGFtb3VudCl9LyR7dW5pdH0pYDtcbiAgICAgIGNoaWxkLmFmdGVyKHNwYW4pO1xuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG59XG5cbmZ1bmN0aW9uIG9uTE1QVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5Mb2NhbE1hcmtldFBvc3QuZm9ybSksIG9uRm9ybVJlYWR5KTtcbn1cblxuZnVuY3Rpb24gb25Gb3JtUmVhZHkoZm9ybTogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgdHlwZSA9IF8kJChmb3JtLCBDLlN0YXRpY0lucHV0LnN0YXRpYyk7XG4gIGlmICghdHlwZS5maW5kKHggPT4geC50ZXh0Q29udGVudCA9PT0gJ1NISVBQSU5HJykpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBmdW5jdGlvbiBzZWxlY3RJbnB1dChxdWVyeTogc3RyaW5nKSB7XG4gICAgcmV0dXJuIGRvY3VtZW50LmV2YWx1YXRlKHF1ZXJ5LCBmb3JtLCBudWxsLCBYUGF0aFJlc3VsdC5GSVJTVF9PUkRFUkVEX05PREVfVFlQRSwgbnVsbClcbiAgICAgIC5zaW5nbGVOb2RlVmFsdWUgYXMgSFRNTElucHV0RWxlbWVudDtcbiAgfVxuXG4gIGNvbnN0IGNvbW1vZGl0eUlucHV0ID0gc2VsZWN0SW5wdXQoXCJkaXZbbGFiZWwvc3Bhblt0ZXh0KCk9J0NvbW1vZGl0eSddXS8vaW5wdXRcIik7XG4gIGNvbnN0IGFtb3VudElucHV0ID0gc2VsZWN0SW5wdXQoXCJkaXZbbGFiZWwvc3Bhblt0ZXh0KCk9J0Ftb3VudCddXS8vaW5wdXRcIik7XG4gIGNvbnN0IHRvdGFsUHJpY2VJbnB1dCA9IHNlbGVjdElucHV0KFwiZGl2W2xhYmVsL3NwYW5bdGV4dCgpPSdUb3RhbCBwcmljZSddXS8vaW5wdXRcIik7XG5cbiAgY3JlYXRlRnJhZ21lbnRBcHAoXG4gICAgUHB1TGFiZWwsXG4gICAgcmVhY3RpdmUoe1xuICAgICAgbWF0ZXJpYWxOYW1lOiByZWZWYWx1ZShjb21tb2RpdHlJbnB1dCksXG4gICAgICBhbW91bnRJbnB1dDogcmVmVmFsdWUoYW1vdW50SW5wdXQpLFxuICAgICAgdG90YWxQcmljZUlucHV0OiByZWZWYWx1ZSh0b3RhbFByaWNlSW5wdXQpLFxuICAgIH0pLFxuICApLmJlZm9yZSh0b3RhbFByaWNlSW5wdXQucGFyZW50RWxlbWVudCEpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKFsnTE0nLCAnTE1BJ10sIG9uTE1UaWxlUmVhZHkpO1xuICB0aWxlcy5vYnNlcnZlKCdMTVAnLCBvbkxNUFRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdBZGRzIGEgcGVyLXVuaXQgcHJpY2UgbGFiZWwgdG8gYWRzIGluIExNLCBMTUEsIGFuZCBMTVAuJyk7XG4iXSwibmFtZXMiOlsiUHB1TGFiZWwiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU1BLFNBQUEsY0FBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFlBQUEsU0FBQSxHQUFBLGtCQUFBO0FBQ0Y7QUFFQSxlQUFBLG1CQUFBLFdBQUE7QUFDRSxRQUFBLE9BQUEsTUFBQSxFQUFBLFdBQUEsRUFBQSxZQUFBLElBQUE7QUFDQSxRQUFBLEtBQUEsVUFBQSxTQUFBO0FBQ0EsUUFBQSxLQUFBLGNBQUEsUUFBQSxFQUFBO0FBQ0EsTUFBQSxDQUFBLE1BQUEsR0FBQSxTQUFBLHNCQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxTQUFBLEdBQUEsZUFBQTtBQUNBLFFBQUEsU0FBQSxHQUFBLGVBQUE7QUFDQSxNQUFBLFdBQUEsS0FBQSxXQUFBLEdBQUE7QUFDRTtBQUFBLEVBQUE7QUFFRixRQUFBLE9BQUEsU0FBQSxTQUFBLE1BQUE7QUFDQSxRQUFBLFNBQUEsU0FBQSxTQUFBLFNBQUE7QUFDQSxRQUFBLFFBQUEsR0FBQSxNQUFBO0FBQ0EsV0FBQSxJQUFBLEdBQUEsSUFBQSxLQUFBLFdBQUEsUUFBQSxLQUFBO0FBQ0UsVUFBQSxRQUFBLEtBQUEsV0FBQSxDQUFBO0FBQ0EsUUFBQSxNQUFBLGFBQUEsTUFBQSxVQUFBLFNBQUEsR0FBQSxNQUFBLFFBQUEsR0FBQTtBQUNFLFlBQUEsT0FBQSxTQUFBLGNBQUEsTUFBQTtBQUNBLFdBQUEsY0FBQSxLQUFBLE9BQUEsUUFBQSxNQUFBLENBQUEsSUFBQSxJQUFBO0FBQ0EsWUFBQSxNQUFBLElBQUE7QUFDQTtBQUFBLElBQUE7QUFBQSxFQUNGO0FBRUo7QUFFQSxTQUFBLGVBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxnQkFBQSxJQUFBLEdBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLE9BQUEsSUFBQSxNQUFBLEVBQUEsWUFBQSxNQUFBO0FBQ0EsTUFBQSxDQUFBLEtBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxnQkFBQSxVQUFBLEdBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixXQUFBLFlBQUEsT0FBQTtBQUNFLFdBQUEsU0FBQSxTQUFBLE9BQUEsTUFBQSxNQUFBLFlBQUEseUJBQUEsSUFBQSxFQUFBO0FBQUEsRUFDRztBQUdMLFFBQUEsaUJBQUEsWUFBQSw0Q0FBQTtBQUNBLFFBQUEsY0FBQSxZQUFBLHlDQUFBO0FBQ0EsUUFBQSxrQkFBQSxZQUFBLDhDQUFBO0FBRUE7QUFBQSxJQUFBQTtBQUFBQSxJQUNFLFNBQUE7QUFBQSxNQUNTLGNBQUEsU0FBQSxjQUFBO0FBQUEsTUFDOEIsYUFBQSxTQUFBLFdBQUE7QUFBQSxNQUNKLGlCQUFBLFNBQUEsZUFBQTtBQUFBLElBQ1EsQ0FBQTtBQUFBLEVBQzFDLEVBQUEsT0FBQSxnQkFBQSxhQUFBO0FBRUw7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsQ0FBQSxNQUFBLEtBQUEsR0FBQSxhQUFBO0FBQ0EsUUFBQSxRQUFBLE9BQUEsY0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLHlEQUFBOyJ9
