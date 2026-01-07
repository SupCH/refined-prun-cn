import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './bigger-item-count-font.module.css.js';
function init() {
  applyCssRule(`.${C.MaterialIcon.typeVerySmall}`, $style.indicator);
}
features.add(import.meta.url, init, 'Makes the item count label font bigger.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmlnZ2VyLWl0ZW0tY291bnQtZm9udC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2JpZ2dlci1pdGVtLWNvdW50LWZvbnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL2JpZ2dlci1pdGVtLWNvdW50LWZvbnQubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5NYXRlcmlhbEljb24udHlwZVZlcnlTbWFsbH1gLCAkc3R5bGUuaW5kaWNhdG9yKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ01ha2VzIHRoZSBpdGVtIGNvdW50IGxhYmVsIGZvbnQgYmlnZ2VyLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxTQUFBLE9BQUE7QUFDRSxlQUFBLElBQUEsRUFBQSxhQUFBLGFBQUEsSUFBQSxPQUFBLFNBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSx5Q0FBQTsifQ==
