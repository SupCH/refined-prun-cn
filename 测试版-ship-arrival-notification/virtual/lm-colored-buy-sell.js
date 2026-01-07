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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG0tY29sb3JlZC1idXktc2VsbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2xtLWNvbG9yZWQtYnV5LXNlbGwudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZ2V0UHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgbG9jYWxBZHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9sb2NhbC1hZHMnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQ29tbW9kaXR5QWQuY29udGFpbmVyKSwgb25BZENvbnRhaW5lclJlYWR5KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb25BZENvbnRhaW5lclJlYWR5KGNvbnRhaW5lcjogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgZWxlbWVudCA9IGF3YWl0ICQoY29udGFpbmVyLCBDLkNvbW1vZGl0eUFkLnRleHQpO1xuICBjb25zdCBpZCA9IGdldFBydW5JZChjb250YWluZXIpO1xuICBjb25zdCBhZCA9IGxvY2FsQWRzU3RvcmUuZ2V0QnlJZChpZCk7XG4gIGlmICghYWQgfHwgKGFkLnR5cGUgIT09ICdDT01NT0RJVFlfQlVZSU5HJyAmJiBhZC50eXBlICE9PSAnQ09NTU9ESVRZX1NFTExJTkcnKSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoYWQudHlwZSAhPT0gJ0NPTU1PRElUWV9CVVlJTkcnICYmIGFkLnR5cGUgIT09ICdDT01NT0RJVFlfU0VMTElORycpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCB0eXBlID0gZWxlbWVudC5maXJzdENoaWxkPy5ub2RlVmFsdWUgPz8gbnVsbDtcbiAgY29uc3Qgc3BhbiA9IGRvY3VtZW50LmNyZWF0ZUVsZW1lbnQoJ3NwYW4nKTtcbiAgc3Bhbi5jbGFzc05hbWUgPVxuICAgIGFkLnR5cGUgPT09ICdDT01NT0RJVFlfQlVZSU5HJyA/IEMuT3JkZXJUeXBlTGFiZWwuQlVZSU5HIDogQy5PcmRlclR5cGVMYWJlbC5TRUxMSU5HO1xuICBzcGFuLnRleHRDb250ZW50ID0gdHlwZTtcbiAgZWxlbWVudC5yZXBsYWNlQ2hpbGQoc3BhbiwgZWxlbWVudC5maXJzdENoaWxkISk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydMTScsICdMTUEnXSwgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0xNOiBDb2xvcnMgdGhlIEJVWUlORyBhbmQgU0VMTElORyBpbiBncmVlbiBhbmQgcmVkIHJlc3BlY3RpdmVseS4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxTQUFBLEdBQUEsa0JBQUE7QUFDRjtBQUVBLGVBQUEsbUJBQUEsV0FBQTtBQUNFLFFBQUEsVUFBQSxNQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsSUFBQTtBQUNBLFFBQUEsS0FBQSxVQUFBLFNBQUE7QUFDQSxRQUFBLEtBQUEsY0FBQSxRQUFBLEVBQUE7QUFDQSxNQUFBLENBQUEsTUFBQSxHQUFBLFNBQUEsc0JBQUEsR0FBQSxTQUFBLHFCQUFBO0FBQ0U7QUFBQSxFQUFBO0FBRUYsTUFBQSxHQUFBLFNBQUEsc0JBQUEsR0FBQSxTQUFBLHFCQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxPQUFBLFFBQUEsWUFBQSxhQUFBO0FBQ0EsUUFBQSxPQUFBLFNBQUEsY0FBQSxNQUFBO0FBQ0EsT0FBQSxZQUFBLEdBQUEsU0FBQSxxQkFBQSxFQUFBLGVBQUEsU0FBQSxFQUFBLGVBQUE7QUFFQSxPQUFBLGNBQUE7QUFDQSxVQUFBLGFBQUEsTUFBQSxRQUFBLFVBQUE7QUFDRjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxDQUFBLE1BQUEsS0FBQSxHQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
