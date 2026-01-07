import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './hide-item-names.module.css.js';
function init() {
  applyCssRule(`.${C.GridItemView.name}`, css.hidden);
  applyCssRule(`.${C.GridItemView.container}`, $style.gridItem);
}
features.add(
  import.meta.url,
  init,
  'Hides item names and removes item grid gaps in all inventories.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS1pdGVtLW5hbWVzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvaGlkZS1pdGVtLW5hbWVzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjc3MgZnJvbSAnQHNyYy91dGlscy9jc3MtdXRpbHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgJHN0eWxlIGZyb20gJy4vaGlkZS1pdGVtLW5hbWVzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoYC4ke0MuR3JpZEl0ZW1WaWV3Lm5hbWV9YCwgY3NzLmhpZGRlbik7XG4gIC8vIFJlbW92ZSBnYXBzIGJldHdlZW4gaXRlbXMgaW4gR3JpZFZpZXdcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLkdyaWRJdGVtVmlldy5jb250YWluZXJ9YCwgJHN0eWxlLmdyaWRJdGVtKTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdIaWRlcyBpdGVtIG5hbWVzIGFuZCByZW1vdmVzIGl0ZW0gZ3JpZCBnYXBzIGluIGFsbCBpbnZlbnRvcmllcy4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUdBLFNBQUEsT0FBQTtBQUNFLGVBQUEsSUFBQSxFQUFBLGFBQUEsSUFBQSxJQUFBLElBQUEsTUFBQTtBQUVBLGVBQUEsSUFBQSxFQUFBLGFBQUEsU0FBQSxJQUFBLE9BQUEsUUFBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
