import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(`.${C.StoreView.name}`, css.hidden);
}
features.add(import.meta.url, init, 'Hides "Weight" and "Volume" labels in all inventories.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS13ZWlnaHQtdm9sdW1lLWxhYmVscy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2hpZGUtd2VpZ2h0LXZvbHVtZS1sYWJlbHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLlN0b3JlVmlldy5uYW1lfWAsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnSGlkZXMgXCJXZWlnaHRcIiBhbmQgXCJWb2x1bWVcIiBsYWJlbHMgaW4gYWxsIGludmVudG9yaWVzLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxTQUFBLE9BQUE7QUFDRSxlQUFBLElBQUEsRUFBQSxVQUFBLElBQUEsSUFBQSxJQUFBLE1BQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSx3REFBQTsifQ==
