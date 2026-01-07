import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('CXOS', 'tr > :first-child', css.hidden);
}
features.add(import.meta.url, init, 'CXOS: Hides the "Exchange" column.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hvcy1oaWRlLWV4Y2hhbmdlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvY3hvcy1oaWRlLWV4Y2hhbmdlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjc3MgZnJvbSAnQHNyYy91dGlscy9jc3MtdXRpbHMubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZSgnQ1hPUycsICd0ciA+IDpmaXJzdC1jaGlsZCcsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQ1hPUzogSGlkZXMgdGhlIFwiRXhjaGFuZ2VcIiBjb2x1bW4uJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxRQUFBLHFCQUFBLElBQUEsTUFBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLG9DQUFBOyJ9
