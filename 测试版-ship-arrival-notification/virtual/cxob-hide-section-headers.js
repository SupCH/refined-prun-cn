import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('CXOB', 'tbody:nth-child(2) > tr:first-child', css.hidden);
  applyCssRule('CXOB', 'tbody:nth-child(4) > tr:first-child', css.hidden);
}
features.add(import.meta.url, init, 'CXOB: Hides "Offers" and "Requests" headers.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hvYi1oaWRlLXNlY3Rpb24taGVhZGVycy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2N4b2ItaGlkZS1zZWN0aW9uLWhlYWRlcnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKCdDWE9CJywgJ3Rib2R5Om50aC1jaGlsZCgyKSA+IHRyOmZpcnN0LWNoaWxkJywgY3NzLmhpZGRlbik7XG4gIGFwcGx5Q3NzUnVsZSgnQ1hPQicsICd0Ym9keTpudGgtY2hpbGQoNCkgPiB0cjpmaXJzdC1jaGlsZCcsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQ1hPQjogSGlkZXMgXCJPZmZlcnNcIiBhbmQgXCJSZXF1ZXN0c1wiIGhlYWRlcnMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxRQUFBLHVDQUFBLElBQUEsTUFBQTtBQUNBLGVBQUEsUUFBQSx1Q0FBQSxJQUFBLE1BQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSw4Q0FBQTsifQ==
