import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './always-visible-tile-controls.module.css.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.${C.TileControls.container} > .${C.TileControls.icon}`, css.hidden);
  applyCssRule(`.${C.TileControls.container} > .${C.TileControls.controls}`, $style.show);
}
features.add(import.meta.url, init, 'Makes top-right tile controls always visible.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWx3YXlzLXZpc2libGUtdGlsZS1jb250cm9scy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2Fsd2F5cy12aXNpYmxlLXRpbGUtY29udHJvbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL2Fsd2F5cy12aXNpYmxlLXRpbGUtY29udHJvbHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoYC4ke0MuVGlsZUNvbnRyb2xzLmNvbnRhaW5lcn0gPiAuJHtDLlRpbGVDb250cm9scy5pY29ufWAsIGNzcy5oaWRkZW4pO1xuICBhcHBseUNzc1J1bGUoYC4ke0MuVGlsZUNvbnRyb2xzLmNvbnRhaW5lcn0gPiAuJHtDLlRpbGVDb250cm9scy5jb250cm9sc31gLCAkc3R5bGUuc2hvdyk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdNYWtlcyB0b3AtcmlnaHQgdGlsZSBjb250cm9scyBhbHdheXMgdmlzaWJsZS4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLFNBQUEsT0FBQTtBQUNFLGVBQUEsSUFBQSxFQUFBLGFBQUEsU0FBQSxPQUFBLEVBQUEsYUFBQSxJQUFBLElBQUEsSUFBQSxNQUFBO0FBQ0EsZUFBQSxJQUFBLEVBQUEsYUFBQSxTQUFBLE9BQUEsRUFBQSxhQUFBLFFBQUEsSUFBQSxPQUFBLElBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwrQ0FBQTsifQ==
