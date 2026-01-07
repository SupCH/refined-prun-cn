import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(
    'BBL',
    `.${C.SectionList.section} .${C.SectionList.table} tr:nth-child(5)`,
    css.hidden,
  );
}
features.add(import.meta.url, init, 'BBL: Hides the "Book value" row.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLWhpZGUtYm9vay12YWx1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2JibC1oaWRlLWJvb2stdmFsdWUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKFxuICAgICdCQkwnLFxuICAgIGAuJHtDLlNlY3Rpb25MaXN0LnNlY3Rpb259IC4ke0MuU2VjdGlvbkxpc3QudGFibGV9IHRyOm50aC1jaGlsZCg1KWAsXG4gICAgY3NzLmhpZGRlbixcbiAgKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0JCTDogSGlkZXMgdGhlIFwiQm9vayB2YWx1ZVwiIHJvdy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0U7QUFBQSxJQUFBO0FBQUEsSUFDRSxJQUFBLEVBQUEsWUFBQSxPQUFBLEtBQUEsRUFBQSxZQUFBLEtBQUE7QUFBQSxJQUNpRCxJQUFBO0FBQUEsRUFDN0M7QUFFUjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxrQ0FBQTsifQ==
