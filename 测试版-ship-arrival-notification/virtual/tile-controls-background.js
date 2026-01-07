import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './tile-controls-background.module.css.js';
function init() {
  applyCssRule(`.${C.TileFrame.controls}`, $style.controls);
}
features.add(
  import.meta.url,
  init,
  'Adds a solid color background to the top-right tile controls.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlsZS1jb250cm9scy1iYWNrZ3JvdW5kLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvdGlsZS1jb250cm9scy1iYWNrZ3JvdW5kLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi90aWxlLWNvbnRyb2xzLWJhY2tncm91bmQubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5UaWxlRnJhbWUuY29udHJvbHN9YCwgJHN0eWxlLmNvbnRyb2xzKTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdBZGRzIGEgc29saWQgY29sb3IgYmFja2dyb3VuZCB0byB0aGUgdG9wLXJpZ2h0IHRpbGUgY29udHJvbHMuJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLFNBQUEsT0FBQTtBQUNFLGVBQUEsSUFBQSxFQUFBLFVBQUEsUUFBQSxJQUFBLE9BQUEsUUFBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
