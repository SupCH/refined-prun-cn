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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG0taGlnaGxpZ2h0LW93bi1hZHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9sbS1oaWdobGlnaHQtb3duLWFkcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vbG0taGlnaGxpZ2h0LW93bi1hZHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBjb21wYW55U3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29tcGFueSc7XG5pbXBvcnQgeyBnZXRQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgeyBsb2NhbEFkc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2xvY2FsLWFkcyc7XG5cbmZ1bmN0aW9uIG9uVGlsZVJlYWR5KHRpbGU6IFBydW5UaWxlKSB7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5Mb2NhbE1hcmtldC5pdGVtKSwgYXN5bmMgaXRlbSA9PiB7XG4gICAgY29uc3QgY29udGFpbmVyID0gYXdhaXQgJChpdGVtLCBDLkNvbW1vZGl0eUFkLmNvbnRhaW5lcik7XG4gICAgY29uc3QgaWQgPSBnZXRQcnVuSWQoY29udGFpbmVyKTtcbiAgICBjb25zdCBhZCA9IGxvY2FsQWRzU3RvcmUuZ2V0QnlJZChpZCk7XG4gICAgaWYgKGFkPy5jcmVhdG9yLmlkID09PSBjb21wYW55U3RvcmUudmFsdWU/LmlkKSB7XG4gICAgICBpdGVtLmNsYXNzTGlzdC5hZGQoJHN0eWxlLm93bkFkKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdMTScsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0xNOiBIaWdobGlnaHRzIG93biBhZHMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsWUFBQSxJQUFBLEdBQUEsT0FBQSxTQUFBO0FBQ0UsVUFBQSxZQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsWUFBQSxTQUFBO0FBQ0EsVUFBQSxLQUFBLFVBQUEsU0FBQTtBQUNBLFVBQUEsS0FBQSxjQUFBLFFBQUEsRUFBQTtBQUNBLFFBQUEsSUFBQSxRQUFBLE9BQUEsYUFBQSxPQUFBLElBQUE7QUFDRSxXQUFBLFVBQUEsSUFBQSxPQUFBLEtBQUE7QUFBQSxJQUErQjtBQUFBLEVBQ2pDLENBQUE7QUFFSjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxNQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSx5QkFBQTsifQ==
