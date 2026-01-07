import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.${C.ContextControls.item}:hover .${C.ContextControls.label}`, css.hidden);
}
features.add(
  import.meta.url,
  init,
  'Prevents the context controls from displaying description while hovering over.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGV4dC1jb250cm9scy1uby1ob3Zlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2NvbnRleHQtY29udHJvbHMtbm8taG92ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLkNvbnRleHRDb250cm9scy5pdGVtfTpob3ZlciAuJHtDLkNvbnRleHRDb250cm9scy5sYWJlbH1gLCBjc3MuaGlkZGVuKTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdQcmV2ZW50cyB0aGUgY29udGV4dCBjb250cm9scyBmcm9tIGRpc3BsYXlpbmcgZGVzY3JpcHRpb24gd2hpbGUgaG92ZXJpbmcgb3Zlci4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxJQUFBLEVBQUEsZ0JBQUEsSUFBQSxXQUFBLEVBQUEsZ0JBQUEsS0FBQSxJQUFBLElBQUEsTUFBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
