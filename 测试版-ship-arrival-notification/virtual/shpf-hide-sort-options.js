import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('SHPF', `.${C.InventorySortControls.controls}`, css.hidden);
}
features.add(import.meta.url, init, 'SHPF: Hides inventory sort options.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hwZi1oaWRlLXNvcnQtb3B0aW9ucy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL3NocGYtaGlkZS1zb3J0LW9wdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKCdTSFBGJywgYC4ke0MuSW52ZW50b3J5U29ydENvbnRyb2xzLmNvbnRyb2xzfWAsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnU0hQRjogSGlkZXMgaW52ZW50b3J5IHNvcnQgb3B0aW9ucy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxRQUFBLElBQUEsRUFBQSxzQkFBQSxRQUFBLElBQUEsSUFBQSxNQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEscUNBQUE7In0=
