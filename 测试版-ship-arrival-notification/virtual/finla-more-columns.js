import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './finla-more-columns.module.css.js';
import css from './css-utils.module.css.js';
import { refTextContent } from './reactive-dom.js';
import { fixed0 } from './format.js';
import { currentAssets } from './current-assets.js';
import { createVNode, createTextVNode, computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'thead'), onTableHeadReady);
  subscribe($$(tile.anchor, 'tbody'), onTableBodyReady);
}
function onTableHeadReady(thead) {
  subscribe($$(thead, 'tr'), row => {
    createFragmentApp(() =>
      createVNode(
        'th',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.cxDepositsTotal)],
        },
        [createTextVNode('CX Deposits')],
      ),
    ).appendTo(row);
    createFragmentApp(() =>
      createVNode(
        'th',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.fxDepositsTotal)],
        },
        [createTextVNode('FX Deposits')],
      ),
    ).appendTo(row);
    createFragmentApp(() =>
      createVNode(
        'th',
        {
          class: [
            C.LiquidAssetsPanel.number,
            hiddenIfZero(currentAssets.inventory.mmMaterialsTotal),
          ],
        },
        [createTextVNode('MM Materials')],
      ),
    ).appendTo(row);
  });
}
function onTableBodyReady(tbody) {
  subscribe($$(tbody, 'tr'), row => {
    const currencyCell = row.children[0];
    if (currencyCell === void 0) {
      return;
    }
    const currency = refTextContent(currencyCell);
    createFragmentApp(() =>
      createVNode(
        'td',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.cxDepositsTotal)],
        },
        [fixed0(currency.value ? (currentAssets.cxDeposits.value?.get(currency.value) ?? 0) : 0)],
      ),
    ).appendTo(row);
    createFragmentApp(() =>
      createVNode(
        'td',
        {
          class: [C.LiquidAssetsPanel.number, hiddenIfZero(currentAssets.fxDepositsTotal)],
        },
        [fixed0(currency.value ? (currentAssets.fxDeposits.value?.get(currency.value) ?? 0) : 0)],
      ),
    ).appendTo(row);
    const mmMaterials = computed(() => {
      return currency.value
        ? (currentAssets.inventory.cxInventory.value?.mmMaterialsTotal.get(currency.value) ?? 0)
        : 0;
    });
    createFragmentApp(() =>
      createVNode(
        'td',
        {
          class: [
            C.LiquidAssetsPanel.number,
            hiddenIfZero(currentAssets.inventory.mmMaterialsTotal),
          ],
        },
        [fixed0(mmMaterials.value)],
      ),
    ).appendTo(row);
  });
}
function hiddenIfZero(total) {
  return (total.value ?? 0) === 0 ? css.hidden : void 0;
}
function init() {
  applyCssRule(`.${C.LiquidAssetsPanel.row}`, $style.row);
  tiles.observe('FINLA', onTileReady);
}
features.add(import.meta.url, init, 'FINLA: Adds columns for additional liquid asset types.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlubGEtbW9yZS1jb2x1bW5zLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvZmlubGEtbW9yZS1jb2x1bW5zLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vZmlubGEtbW9yZS1jb2x1bW5zLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IHJlZlRleHRDb250ZW50IH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1kb20nO1xuaW1wb3J0IHsgZml4ZWQwIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgY3VycmVudEFzc2V0cyB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL2N1cnJlbnQtYXNzZXRzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndGhlYWQnKSwgb25UYWJsZUhlYWRSZWFkeSk7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgJ3Rib2R5JyksIG9uVGFibGVCb2R5UmVhZHkpO1xufVxuXG5mdW5jdGlvbiBvblRhYmxlSGVhZFJlYWR5KHRoZWFkOiBIVE1MVGFibGVTZWN0aW9uRWxlbWVudCkge1xuICBzdWJzY3JpYmUoJCQodGhlYWQsICd0cicpLCByb3cgPT4ge1xuICAgIGNyZWF0ZUZyYWdtZW50QXBwKCgpID0+IChcbiAgICAgIDx0aCBjbGFzcz17W0MuTGlxdWlkQXNzZXRzUGFuZWwubnVtYmVyLCBoaWRkZW5JZlplcm8oY3VycmVudEFzc2V0cy5jeERlcG9zaXRzVG90YWwpXX0+XG4gICAgICAgIENYIERlcG9zaXRzXG4gICAgICA8L3RoPlxuICAgICkpLmFwcGVuZFRvKHJvdyk7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT4gKFxuICAgICAgPHRoIGNsYXNzPXtbQy5MaXF1aWRBc3NldHNQYW5lbC5udW1iZXIsIGhpZGRlbklmWmVybyhjdXJyZW50QXNzZXRzLmZ4RGVwb3NpdHNUb3RhbCldfT5cbiAgICAgICAgRlggRGVwb3NpdHNcbiAgICAgIDwvdGg+XG4gICAgKSkuYXBwZW5kVG8ocm93KTtcbiAgICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgICA8dGhcbiAgICAgICAgY2xhc3M9e1tcbiAgICAgICAgICBDLkxpcXVpZEFzc2V0c1BhbmVsLm51bWJlcixcbiAgICAgICAgICBoaWRkZW5JZlplcm8oY3VycmVudEFzc2V0cy5pbnZlbnRvcnkubW1NYXRlcmlhbHNUb3RhbCksXG4gICAgICAgIF19PlxuICAgICAgICBNTSBNYXRlcmlhbHNcbiAgICAgIDwvdGg+XG4gICAgKSkuYXBwZW5kVG8ocm93KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uVGFibGVCb2R5UmVhZHkodGJvZHk6IEhUTUxUYWJsZVNlY3Rpb25FbGVtZW50KSB7XG4gIHN1YnNjcmliZSgkJCh0Ym9keSwgJ3RyJyksIHJvdyA9PiB7XG4gICAgY29uc3QgY3VycmVuY3lDZWxsID0gcm93LmNoaWxkcmVuWzBdO1xuICAgIGlmIChjdXJyZW5jeUNlbGwgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBjb25zdCBjdXJyZW5jeSA9IHJlZlRleHRDb250ZW50KGN1cnJlbmN5Q2VsbCk7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT4gKFxuICAgICAgPHRkIGNsYXNzPXtbQy5MaXF1aWRBc3NldHNQYW5lbC5udW1iZXIsIGhpZGRlbklmWmVybyhjdXJyZW50QXNzZXRzLmN4RGVwb3NpdHNUb3RhbCldfT5cbiAgICAgICAge2ZpeGVkMChjdXJyZW5jeS52YWx1ZSA/IChjdXJyZW50QXNzZXRzLmN4RGVwb3NpdHMudmFsdWU/LmdldChjdXJyZW5jeS52YWx1ZSkgPz8gMCkgOiAwKX1cbiAgICAgIDwvdGQ+XG4gICAgKSkuYXBwZW5kVG8ocm93KTtcbiAgICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgICA8dGQgY2xhc3M9e1tDLkxpcXVpZEFzc2V0c1BhbmVsLm51bWJlciwgaGlkZGVuSWZaZXJvKGN1cnJlbnRBc3NldHMuZnhEZXBvc2l0c1RvdGFsKV19PlxuICAgICAgICB7Zml4ZWQwKGN1cnJlbmN5LnZhbHVlID8gKGN1cnJlbnRBc3NldHMuZnhEZXBvc2l0cy52YWx1ZT8uZ2V0KGN1cnJlbmN5LnZhbHVlKSA/PyAwKSA6IDApfVxuICAgICAgPC90ZD5cbiAgICApKS5hcHBlbmRUbyhyb3cpO1xuICAgIGNvbnN0IG1tTWF0ZXJpYWxzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgICAgcmV0dXJuIGN1cnJlbmN5LnZhbHVlXG4gICAgICAgID8gKGN1cnJlbnRBc3NldHMuaW52ZW50b3J5LmN4SW52ZW50b3J5LnZhbHVlPy5tbU1hdGVyaWFsc1RvdGFsLmdldChjdXJyZW5jeS52YWx1ZSkgPz8gMClcbiAgICAgICAgOiAwO1xuICAgIH0pO1xuICAgIGNyZWF0ZUZyYWdtZW50QXBwKCgpID0+IChcbiAgICAgIDx0ZFxuICAgICAgICBjbGFzcz17W1xuICAgICAgICAgIEMuTGlxdWlkQXNzZXRzUGFuZWwubnVtYmVyLFxuICAgICAgICAgIGhpZGRlbklmWmVybyhjdXJyZW50QXNzZXRzLmludmVudG9yeS5tbU1hdGVyaWFsc1RvdGFsKSxcbiAgICAgICAgXX0+XG4gICAgICAgIHtmaXhlZDAobW1NYXRlcmlhbHMudmFsdWUpfVxuICAgICAgPC90ZD5cbiAgICApKS5hcHBlbmRUbyhyb3cpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaGlkZGVuSWZaZXJvKHRvdGFsOiBSZWY8bnVtYmVyIHwgdW5kZWZpbmVkPikge1xuICByZXR1cm4gKHRvdGFsLnZhbHVlID8/IDApID09PSAwID8gY3NzLmhpZGRlbiA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLkxpcXVpZEFzc2V0c1BhbmVsLnJvd31gLCAkc3R5bGUucm93KTtcbiAgdGlsZXMub2JzZXJ2ZSgnRklOTEEnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdGSU5MQTogQWRkcyBjb2x1bW5zIGZvciBhZGRpdGlvbmFsIGxpcXVpZCBhc3NldCB0eXBlcy4nKTtcbiJdLCJuYW1lcyI6WyJfY3JlYXRlVGV4dFZOb2RlIiwiYXBwbHlDc3NSdWxlIiwidGlsZXMiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQU1BLFNBQUEsWUFBQSxNQUFBOzs7QUFHQTtBQUVBLFNBQUEsaUJBQUEsT0FBQTs7O01BRXNCLFNBQUEsQ0FBQSxFQUFBLGtCQUFBLFFBQUEsYUFBQSxjQUFBLGVBQUEsQ0FBQTtBQUFBLElBQ29FLEdBQUEsQ0FBQUEsZ0JBQUEsYUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLFNBQUEsR0FBQTs7TUFJcEUsU0FBQSxDQUFBLEVBQUEsa0JBQUEsUUFBQSxhQUFBLGNBQUEsZUFBQSxDQUFBO0FBQUEsSUFDb0UsR0FBQSxDQUFBQSxnQkFBQSxhQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsU0FBQSxHQUFBOztNQUlwRSxTQUFBLENBQUEsRUFBQSxrQkFBQSxRQUFBLGFBQUEsY0FBQSxVQUFBLGdCQUFBLENBQUE7QUFBQSxJQUtiLEdBQUEsQ0FBQUEsZ0JBQUEsY0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLFNBQUEsR0FBQTtBQUFBLEVBSVAsQ0FBQTtBQUNGO0FBRUEsU0FBQSxpQkFBQSxPQUFBOztBQUVJLFVBQUEsZUFBQSxJQUFBLFNBQUEsQ0FBQTs7QUFFRTtBQUFBLElBQ0Y7QUFDQSxVQUFBLFdBQUEsZUFBQSxZQUFBOztNQUNrQixTQUFBLENBQUEsRUFBQSxrQkFBQSxRQUFBLGFBQUEsY0FBQSxlQUFBLENBQUE7QUFBQSxJQUNvRSxHQUFBLENBQUEsT0FBQSxTQUFBLFFBQUEsY0FBQSxXQUFBLE9BQUEsSUFBQSxTQUFBLEtBQUEsS0FBQSxJQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxTQUFBLEdBQUE7O01BSXBFLFNBQUEsQ0FBQSxFQUFBLGtCQUFBLFFBQUEsYUFBQSxjQUFBLGVBQUEsQ0FBQTtBQUFBLElBQ29FLEdBQUEsQ0FBQSxPQUFBLFNBQUEsUUFBQSxjQUFBLFdBQUEsT0FBQSxJQUFBLFNBQUEsS0FBQSxLQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLFNBQUEsR0FBQTtBQUl0RixVQUFBLGNBQUEsU0FBQSxNQUFBOztJQUlBLENBQUE7O01BQ2tCLFNBQUEsQ0FBQSxFQUFBLGtCQUFBLFFBQUEsYUFBQSxjQUFBLFVBQUEsZ0JBQUEsQ0FBQTtBQUFBLElBS2IsR0FBQSxDQUFBLE9BQUEsWUFBQSxLQUFBLENBQUEsQ0FBQSxDQUFBLEVBQUEsU0FBQSxHQUFBO0FBQUEsRUFJUCxDQUFBO0FBQ0Y7QUFFQSxTQUFBLGFBQUEsT0FBQTtBQUNFLFVBQUEsTUFBQSxTQUFBLE9BQUEsSUFBQSxJQUFBLFNBQUE7QUFDRjtBQUVBLFNBQUEsT0FBQTtBQUNFQyxlQUFBQSxJQUFBQSxFQUFBQSxrQkFBQUEsR0FBQUEsSUFBQUEsT0FBQUEsR0FBQUE7QUFDQUMsUUFBQUEsUUFBQUEsU0FBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSx3REFBQUE7In0=
