import { subscribe } from './subscribe-async-generator.js';
import { $, _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getPrunId } from './attributes.js';
import { localAdsStore } from './local-ads.js';
import { extractPlanetName } from './util.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.CommodityAd.container), async container => {
    const text = await $(container, C.CommodityAd.text);
    const id = getPrunId(container);
    const ad = localAdsStore.getById(id);
    if (!ad) {
      return;
    }
    const type = ad.type;
    const quantity = ad.quantity;
    if (type === 'COMMODITY_SHIPPING') {
      const links = _$$(text, C.Link.link);
      if (links.length === 2) {
        links[0].textContent = extractPlanetName(links[0].textContent);
        links[0].previousSibling.textContent = ' ';
        links[0].nextSibling.textContent = ' → ';
        links[1].textContent = extractPlanetName(links[1].textContent);
      }
    }
    if ((type === 'COMMODITY_BUYING' || type === 'COMMODITY_SELLING') && quantity) {
      const amount = quantity.amount;
      text.childNodes[1].textContent = ` ${amount} @ `;
    }
    for (const node of Array.from(text.childNodes)) {
      if (!node.textContent) {
        continue;
      }
      if (node.textContent.endsWith('.00')) {
        node.textContent = node.textContent.replace('.00', '');
      }
      if (node.textContent.endsWith(',00')) {
        node.textContent = node.textContent.replace(',00', '');
      }
      node.textContent = node.textContent
        .replace(' for ', '')
        .replace('delivery', '')
        .replace('collection', '')
        .replace(' within ', ' in ')
        .replace('for delivery within', 'in');
      node.textContent = node.textContent.replace(/(\d+)\s+days*/i, '$1d');
    }
    cleanContractType(text, ad);
  });
}
function cleanContractType(text, ad) {
  if (!text.firstChild) {
    return;
  }
  switch (ad.type) {
    case 'COMMODITY_SHIPPING':
      text.firstChild.textContent = '';
      break;
    case 'COMMODITY_BUYING':
      text.firstChild.textContent = 'BUY';
      break;
    case 'COMMODITY_SELLING':
      text.firstChild.textContent = 'SELL';
      break;
  }
}
function init() {
  tiles.observe('LM', onTileReady);
}
features.add(import.meta.url, init, 'LM: Hides redundant information from ads.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG0tY2xlYW4tYWRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvbG0tY2xlYW4tYWRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldFBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcbmltcG9ydCB7IGxvY2FsQWRzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbG9jYWwtYWRzJztcbmltcG9ydCB7IGV4dHJhY3RQbGFuZXROYW1lIH0gZnJvbSAnQHNyYy91dGlsJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNvbW1vZGl0eUFkLmNvbnRhaW5lciksIGFzeW5jIGNvbnRhaW5lciA9PiB7XG4gICAgY29uc3QgdGV4dCA9IGF3YWl0ICQoY29udGFpbmVyLCBDLkNvbW1vZGl0eUFkLnRleHQpO1xuICAgIGNvbnN0IGlkID0gZ2V0UHJ1bklkKGNvbnRhaW5lcik7XG4gICAgY29uc3QgYWQgPSBsb2NhbEFkc1N0b3JlLmdldEJ5SWQoaWQpO1xuICAgIGlmICghYWQpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB0eXBlID0gYWQudHlwZTtcbiAgICBjb25zdCBxdWFudGl0eSA9IGFkLnF1YW50aXR5O1xuXG4gICAgaWYgKHR5cGUgPT09ICdDT01NT0RJVFlfU0hJUFBJTkcnKSB7XG4gICAgICAvLyBTaG9ydGVuIHBsYW5ldCBuYW1lc1xuICAgICAgY29uc3QgbGlua3MgPSBfJCQodGV4dCwgQy5MaW5rLmxpbmspO1xuICAgICAgaWYgKGxpbmtzLmxlbmd0aCA9PT0gMikge1xuICAgICAgICBsaW5rc1swXS50ZXh0Q29udGVudCA9IGV4dHJhY3RQbGFuZXROYW1lKGxpbmtzWzBdLnRleHRDb250ZW50KTtcbiAgICAgICAgbGlua3NbMF0ucHJldmlvdXNTaWJsaW5nIS50ZXh0Q29udGVudCA9ICcgJztcbiAgICAgICAgbGlua3NbMF0ubmV4dFNpYmxpbmchLnRleHRDb250ZW50ID0gJyDihpIgJztcbiAgICAgICAgbGlua3NbMV0udGV4dENvbnRlbnQgPSBleHRyYWN0UGxhbmV0TmFtZShsaW5rc1sxXS50ZXh0Q29udGVudCk7XG4gICAgICB9XG4gICAgfVxuICAgIGlmICgodHlwZSA9PT0gJ0NPTU1PRElUWV9CVVlJTkcnIHx8IHR5cGUgPT09ICdDT01NT0RJVFlfU0VMTElORycpICYmIHF1YW50aXR5KSB7XG4gICAgICBjb25zdCBhbW91bnQgPSBxdWFudGl0eS5hbW91bnQ7XG4gICAgICB0ZXh0LmNoaWxkTm9kZXNbMV0udGV4dENvbnRlbnQgPSBgICR7YW1vdW50fSBAIGA7XG4gICAgfVxuXG4gICAgZm9yIChjb25zdCBub2RlIG9mIEFycmF5LmZyb20odGV4dC5jaGlsZE5vZGVzKSkge1xuICAgICAgaWYgKCFub2RlLnRleHRDb250ZW50KSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS50ZXh0Q29udGVudC5lbmRzV2l0aCgnLjAwJykpIHtcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnQucmVwbGFjZSgnLjAwJywgJycpO1xuICAgICAgfVxuXG4gICAgICBpZiAobm9kZS50ZXh0Q29udGVudC5lbmRzV2l0aCgnLDAwJykpIHtcbiAgICAgICAgbm9kZS50ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnQucmVwbGFjZSgnLDAwJywgJycpO1xuICAgICAgfVxuICAgICAgbm9kZS50ZXh0Q29udGVudCA9IG5vZGUudGV4dENvbnRlbnRcbiAgICAgICAgLnJlcGxhY2UoJyBmb3IgJywgJycpXG4gICAgICAgIC5yZXBsYWNlKCdkZWxpdmVyeScsICcnKVxuICAgICAgICAucmVwbGFjZSgnY29sbGVjdGlvbicsICcnKVxuICAgICAgICAucmVwbGFjZSgnIHdpdGhpbiAnLCAnIGluICcpXG4gICAgICAgIC5yZXBsYWNlKCdmb3IgZGVsaXZlcnkgd2l0aGluJywgJ2luJyk7XG4gICAgICBub2RlLnRleHRDb250ZW50ID0gbm9kZS50ZXh0Q29udGVudC5yZXBsYWNlKC8oXFxkKylcXHMrZGF5cyovaSwgJyQxZCcpO1xuICAgIH1cbiAgICBjbGVhbkNvbnRyYWN0VHlwZSh0ZXh0LCBhZCk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBjbGVhbkNvbnRyYWN0VHlwZSh0ZXh0OiBIVE1MRWxlbWVudCwgYWQ6IFBydW5BcGkuTG9jYWxBZCkge1xuICBpZiAoIXRleHQuZmlyc3RDaGlsZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBzd2l0Y2ggKGFkLnR5cGUpIHtcbiAgICBjYXNlICdDT01NT0RJVFlfU0hJUFBJTkcnOlxuICAgICAgdGV4dC5maXJzdENoaWxkLnRleHRDb250ZW50ID0gJyc7XG4gICAgICBicmVhaztcbiAgICBjYXNlICdDT01NT0RJVFlfQlVZSU5HJzpcbiAgICAgIHRleHQuZmlyc3RDaGlsZC50ZXh0Q29udGVudCA9ICdCVVknO1xuICAgICAgYnJlYWs7XG4gICAgY2FzZSAnQ09NTU9ESVRZX1NFTExJTkcnOlxuICAgICAgdGV4dC5maXJzdENoaWxkLnRleHRDb250ZW50ID0gJ1NFTEwnO1xuICAgICAgYnJlYWs7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnTE0nLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdMTTogSGlkZXMgcmVkdW5kYW50IGluZm9ybWF0aW9uIGZyb20gYWRzLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxTQUFBLEdBQUEsT0FBQSxjQUFBO0FBQ0UsVUFBQSxPQUFBLE1BQUEsRUFBQSxXQUFBLEVBQUEsWUFBQSxJQUFBO0FBQ0EsVUFBQSxLQUFBLFVBQUEsU0FBQTtBQUNBLFVBQUEsS0FBQSxjQUFBLFFBQUEsRUFBQTtBQUNBLFFBQUEsQ0FBQSxJQUFBO0FBQ0U7QUFBQSxJQUFBO0FBR0YsVUFBQSxPQUFBLEdBQUE7QUFDQSxVQUFBLFdBQUEsR0FBQTtBQUVBLFFBQUEsU0FBQSxzQkFBQTtBQUVFLFlBQUEsUUFBQSxJQUFBLE1BQUEsRUFBQSxLQUFBLElBQUE7QUFDQSxVQUFBLE1BQUEsV0FBQSxHQUFBO0FBQ0UsY0FBQSxDQUFBLEVBQUEsY0FBQSxrQkFBQSxNQUFBLENBQUEsRUFBQSxXQUFBO0FBQ0EsY0FBQSxDQUFBLEVBQUEsZ0JBQUEsY0FBQTtBQUNBLGNBQUEsQ0FBQSxFQUFBLFlBQUEsY0FBQTtBQUNBLGNBQUEsQ0FBQSxFQUFBLGNBQUEsa0JBQUEsTUFBQSxDQUFBLEVBQUEsV0FBQTtBQUFBLE1BQTZEO0FBQUEsSUFDL0Q7QUFFRixTQUFBLFNBQUEsc0JBQUEsU0FBQSx3QkFBQSxVQUFBO0FBQ0UsWUFBQSxTQUFBLFNBQUE7QUFDQSxXQUFBLFdBQUEsQ0FBQSxFQUFBLGNBQUEsSUFBQSxNQUFBO0FBQUEsSUFBMkM7QUFHN0MsZUFBQSxRQUFBLE1BQUEsS0FBQSxLQUFBLFVBQUEsR0FBQTtBQUNFLFVBQUEsQ0FBQSxLQUFBLGFBQUE7QUFDRTtBQUFBLE1BQUE7QUFHRixVQUFBLEtBQUEsWUFBQSxTQUFBLEtBQUEsR0FBQTtBQUNFLGFBQUEsY0FBQSxLQUFBLFlBQUEsUUFBQSxPQUFBLEVBQUE7QUFBQSxNQUFxRDtBQUd2RCxVQUFBLEtBQUEsWUFBQSxTQUFBLEtBQUEsR0FBQTtBQUNFLGFBQUEsY0FBQSxLQUFBLFlBQUEsUUFBQSxPQUFBLEVBQUE7QUFBQSxNQUFxRDtBQUV2RCxXQUFBLGNBQUEsS0FBQSxZQUFBLFFBQUEsU0FBQSxFQUFBLEVBQUEsUUFBQSxZQUFBLEVBQUEsRUFBQSxRQUFBLGNBQUEsRUFBQSxFQUFBLFFBQUEsWUFBQSxNQUFBLEVBQUEsUUFBQSx1QkFBQSxJQUFBO0FBTUEsV0FBQSxjQUFBLEtBQUEsWUFBQSxRQUFBLGtCQUFBLEtBQUE7QUFBQSxJQUFtRTtBQUVyRSxzQkFBQSxNQUFBLEVBQUE7QUFBQSxFQUEwQixDQUFBO0FBRTlCO0FBRUEsU0FBQSxrQkFBQSxNQUFBLElBQUE7QUFDRSxNQUFBLENBQUEsS0FBQSxZQUFBO0FBQ0U7QUFBQSxFQUFBO0FBRUYsVUFBQSxHQUFBLE1BQUE7QUFBQSxJQUFpQixLQUFBO0FBRWIsV0FBQSxXQUFBLGNBQUE7QUFDQTtBQUFBLElBQUEsS0FBQTtBQUVBLFdBQUEsV0FBQSxjQUFBO0FBQ0E7QUFBQSxJQUFBLEtBQUE7QUFFQSxXQUFBLFdBQUEsY0FBQTtBQUNBO0FBQUEsRUFBQTtBQUVOO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLE1BQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLDJDQUFBOyJ9
