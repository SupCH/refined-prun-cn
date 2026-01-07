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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG0taXRlbS1pY29ucy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2xtLWl0ZW0taWNvbnMvbG0taXRlbS1pY29ucy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTE1NYXRlcmlhbEljb24gZnJvbSAnLi9MTU1hdGVyaWFsSWNvbi52dWUnO1xuaW1wb3J0IExNU2hpcG1lbnRJY29uIGZyb20gJy4vTE1TaGlwbWVudEljb24udnVlJztcbmltcG9ydCB7IGdldFBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IGxvY2FsQWRzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbG9jYWwtYWRzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNvbW1vZGl0eUFkLmNvbnRhaW5lciksIG9uQ29udGFpbmVyUmVhZHkpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvbkNvbnRhaW5lclJlYWR5KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgdGV4dCA9IGF3YWl0ICQoY29udGFpbmVyLCBDLkNvbW1vZGl0eUFkLnRleHQpO1xuICBjb25zdCBpZCA9IGdldFBydW5JZChjb250YWluZXIpO1xuICBjb25zdCBhZCA9IGxvY2FsQWRzU3RvcmUuZ2V0QnlJZChpZCk7XG4gIGlmICghYWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0eXBlID0gYWQudHlwZTtcbiAgY29uc3QgcXVhbnRpdHkgPSBhZC5xdWFudGl0eTtcbiAgaWYgKHR5cGUgPT09ICdDT01NT0RJVFlfU0hJUFBJTkcnKSB7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoTE1TaGlwbWVudEljb24pLnByZXBlbmRUbyhjb250YWluZXIpO1xuICB9XG4gIGlmICgodHlwZSA9PT0gJ0NPTU1PRElUWV9CVVlJTkcnIHx8IHR5cGUgPT09ICdDT01NT0RJVFlfU0VMTElORycpICYmIHF1YW50aXR5KSB7XG4gICAgY29uc3QgdGlja2VyID0gcXVhbnRpdHkubWF0ZXJpYWwudGlja2VyO1xuICAgIHRleHQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudCA9IHRleHQuY2hpbGROb2Rlc1sxXS50ZXh0Q29udGVudCEucmVwbGFjZShgKCR7dGlja2VyfSlgLCAnJyk7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoTE1NYXRlcmlhbEljb24sIHsgdGlja2VyIH0pLnByZXBlbmRUbyhjb250YWluZXIpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0xNJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnTE06IEFkZHMgbWF0ZXJpYWwgYW5kIHNoaXBtZW50IGljb25zIHRvIGFkcy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxTQUFBLEdBQUEsZ0JBQUE7QUFDRjtBQUVBLGVBQUEsaUJBQUEsV0FBQTtBQUNFLFFBQUEsT0FBQSxNQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsSUFBQTtBQUNBLFFBQUEsS0FBQSxVQUFBLFNBQUE7QUFDQSxRQUFBLEtBQUEsY0FBQSxRQUFBLEVBQUE7QUFDQSxNQUFBLENBQUEsSUFBQTtBQUNFO0FBQUEsRUFBQTtBQUdGLFFBQUEsT0FBQSxHQUFBO0FBQ0EsUUFBQSxXQUFBLEdBQUE7QUFDQSxNQUFBLFNBQUEsc0JBQUE7QUFDRSxzQkFBQSxjQUFBLEVBQUEsVUFBQSxTQUFBO0FBQUEsRUFBcUQ7QUFFdkQsT0FBQSxTQUFBLHNCQUFBLFNBQUEsd0JBQUEsVUFBQTtBQUNFLFVBQUEsU0FBQSxTQUFBLFNBQUE7QUFDQSxTQUFBLFdBQUEsQ0FBQSxFQUFBLGNBQUEsS0FBQSxXQUFBLENBQUEsRUFBQSxZQUFBLFFBQUEsSUFBQSxNQUFBLEtBQUEsRUFBQTtBQUNBLHNCQUFBLGdCQUFBLEVBQUEsT0FBQSxDQUFBLEVBQUEsVUFBQSxTQUFBO0FBQUEsRUFBaUU7QUFFckU7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsTUFBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsOENBQUE7In0=
