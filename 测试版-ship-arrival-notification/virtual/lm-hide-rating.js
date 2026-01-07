import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './lm-hide-rating.module.css.js';
function init() {
  applyCssRule('LM', `.${C.RatingIcon.container}`, css.hidden);
  applyCssRule('LM', `.${C.CommodityAd.text}`, $style.text);
}
features.add(import.meta.url, init, 'LM: Hides rating icon from ads.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG0taGlkZS1yYXRpbmcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9sbS1oaWRlLXJhdGluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuaW1wb3J0ICRzdHlsZSBmcm9tICcuL2xtLWhpZGUtcmF0aW5nLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoJ0xNJywgYC4ke0MuUmF0aW5nSWNvbi5jb250YWluZXJ9YCwgY3NzLmhpZGRlbik7XG4gIGFwcGx5Q3NzUnVsZSgnTE0nLCBgLiR7Qy5Db21tb2RpdHlBZC50ZXh0fWAsICRzdHlsZS50ZXh0KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0xNOiBIaWRlcyByYXRpbmcgaWNvbiBmcm9tIGFkcy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLFNBQUEsT0FBQTtBQUNFLGVBQUEsTUFBQSxJQUFBLEVBQUEsV0FBQSxTQUFBLElBQUEsSUFBQSxNQUFBO0FBQ0EsZUFBQSxNQUFBLElBQUEsRUFBQSxZQUFBLElBQUEsSUFBQSxPQUFBLElBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxpQ0FBQTsifQ==
