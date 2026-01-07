import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './bbl-sticky-dividers.module.css.js';
function init() {
  applyCssRule('BBL', `.${C.SectionList.divider}`, $style.divider);
}
features.add(import.meta.url, init, 'BBL: Makes building category dividers sticky.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLXN0aWNreS1kaXZpZGVycy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2JibC1zdGlja3ktZGl2aWRlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL2JibC1zdGlja3ktZGl2aWRlcnMubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZSgnQkJMJywgYC4ke0MuU2VjdGlvbkxpc3QuZGl2aWRlcn1gLCAkc3R5bGUuZGl2aWRlcik7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdCQkw6IE1ha2VzIGJ1aWxkaW5nIGNhdGVnb3J5IGRpdmlkZXJzIHN0aWNreS4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxPQUFBLElBQUEsRUFBQSxZQUFBLE9BQUEsSUFBQSxPQUFBLE9BQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwrQ0FBQTsifQ==
