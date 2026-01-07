import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import TileControlsButton from './TileControlsButton.vue.js';
import { computedTileState, getTileState as getTileState$1 } from './user-data-tiles.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import css from './css-utils.module.css.js';
import fa from './font-awesome.module.css.js';
import { createVNode, Fragment, computed } from './runtime-core.esm-bundler.js';
function getTileState(tile) {
  return computed(() => getTileState$1(tile));
}
async function onTileReady(tile) {
  const tileContextControls = await $(tile.frame, C.ContextControls.container);
  const isMinimized = computedTileState(getTileState(tile), 'minimizeContextControls', false);
  watchEffectWhileNodeAlive(tile.anchor, () => {
    tileContextControls.classList.toggle(css.hidden, isMinimized.value);
  });
  const tileControls = await $(tile.frame, C.TileFrame.controls);
  createFragmentApp(() =>
    isMinimized.value
      ? createVNode(
          TileControlsButton,
          {
            icon: '',
            marginTop: 4,
            onClick: () => (isMinimized.value = false),
          },
          null,
        )
      : null,
  ).prependTo(tileControls);
  createFragmentApp(() =>
    createVNode(Fragment, null, [
      createVNode(
        'div',
        {
          class: [C.ContextControls.item, C.fonts.fontRegular, C.type.typeSmall],
          onClick: () => {
            isMinimized.value = true;
          },
        },
        [
          createVNode(
            'i',
            {
              class: [fa.solid],
            },
            [''],
          ),
        ],
      ),
      createVNode(
        'div',
        {
          style: {
            flexGrow: '1',
          },
        },
        null,
      ),
    ]),
  ).prependTo(tileContextControls);
}
function init() {
  tiles.observeAll(onTileReady);
}
features.add(
  import.meta.url,
  init,
  'Adds buttons to hide and show context controls for tiles containing them.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVhZGVyLWhpZGUtY29udHJvbHMtYnV0dG9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaGVhZGVyLWhpZGUtY29udHJvbHMtYnV0dG9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgVGlsZUNvbnRyb2xzQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9UaWxlQ29udHJvbHNCdXR0b24udnVlJztcbmltcG9ydCB7IGNvbXB1dGVkVGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtdGlsZXMnO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcbmltcG9ydCB7IGdldFRpbGVTdGF0ZSBhcyBnZXRCYXNlVGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtdGlsZXMnO1xuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuXG5pbnRlcmZhY2UgVGlsZVN0YXRlIGV4dGVuZHMgVXNlckRhdGEuVGlsZVN0YXRlIHtcbiAgbWluaW1pemVDb250ZXh0Q29udHJvbHM6IGJvb2xlYW47XG59XG5cbmZ1bmN0aW9uIGdldFRpbGVTdGF0ZSh0aWxlOiBQcnVuVGlsZSkge1xuICByZXR1cm4gY29tcHV0ZWQoKCkgPT4gZ2V0QmFzZVRpbGVTdGF0ZSh0aWxlKSBhcyBUaWxlU3RhdGUpO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCB0aWxlQ29udGV4dENvbnRyb2xzID0gYXdhaXQgJCh0aWxlLmZyYW1lLCBDLkNvbnRleHRDb250cm9scy5jb250YWluZXIpO1xuXG4gIGNvbnN0IGlzTWluaW1pemVkID0gY29tcHV0ZWRUaWxlU3RhdGUoZ2V0VGlsZVN0YXRlKHRpbGUpLCAnbWluaW1pemVDb250ZXh0Q29udHJvbHMnLCBmYWxzZSk7XG4gIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUodGlsZS5hbmNob3IsICgpID0+IHtcbiAgICB0aWxlQ29udGV4dENvbnRyb2xzLmNsYXNzTGlzdC50b2dnbGUoY3NzLmhpZGRlbiwgaXNNaW5pbWl6ZWQudmFsdWUpO1xuICB9KTtcblxuICBjb25zdCB0aWxlQ29udHJvbHMgPSBhd2FpdCAkKHRpbGUuZnJhbWUsIEMuVGlsZUZyYW1lLmNvbnRyb2xzKTtcbiAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT5cbiAgICBpc01pbmltaXplZC52YWx1ZSA/IChcbiAgICAgIDxUaWxlQ29udHJvbHNCdXR0b25cbiAgICAgICAgaWNvbj17J1xcdWYwYzknfVxuICAgICAgICBtYXJnaW5Ub3A9ezR9XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IChpc01pbmltaXplZC52YWx1ZSA9IGZhbHNlKX1cbiAgICAgIC8+XG4gICAgKSA6IG51bGwsXG4gICkucHJlcGVuZFRvKHRpbGVDb250cm9scyk7XG5cbiAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT4gKFxuICAgIDw+XG4gICAgICA8ZGl2XG4gICAgICAgIGNsYXNzPXtbQy5Db250ZXh0Q29udHJvbHMuaXRlbSwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVTbWFsbF19XG4gICAgICAgIG9uQ2xpY2s9eygpID0+IHtcbiAgICAgICAgICBpc01pbmltaXplZC52YWx1ZSA9IHRydWU7XG4gICAgICAgIH19PlxuICAgICAgICA8aSBjbGFzcz17W2ZhLnNvbGlkXX0+eydcXHVmMDcwJ308L2k+XG4gICAgICA8L2Rpdj5cbiAgICAgIDxkaXYgc3R5bGU9e3sgZmxleEdyb3c6ICcxJyB9fSAvPlxuICAgIDwvPlxuICApKS5wcmVwZW5kVG8odGlsZUNvbnRleHRDb250cm9scyk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmVBbGwob25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0FkZHMgYnV0dG9ucyB0byBoaWRlIGFuZCBzaG93IGNvbnRleHQgY29udHJvbHMgZm9yIHRpbGVzIGNvbnRhaW5pbmcgdGhlbS4nLFxuKTtcbiJdLCJuYW1lcyI6WyJnZXRCYXNlVGlsZVN0YXRlIiwid2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSIsInRpbGVDb250ZXh0Q29udHJvbHMiLCJjcmVhdGVGcmFnbWVudEFwcCIsIl9jcmVhdGVWTm9kZSIsImZsZXhHcm93IiwidGlsZXMiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFXQSxTQUFBLGFBQUEsTUFBQTtBQUNFLFNBQUEsU0FBQSxNQUFBQSxlQUFBLElBQUEsQ0FBQTtBQUNGO0FBRUEsZUFBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLHNCQUFBLE1BQUEsRUFBQSxLQUFBLE9BQUEsRUFBQSxnQkFBQSxTQUFBO0FBRUEsUUFBQSxjQUFBLGtCQUFBLGFBQUEsSUFBQSxHQUFBLDJCQUFBLEtBQUE7QUFDQUMsNEJBQUFBLEtBQUFBLFFBQUFBLE1BQUFBO0FBQ0VDLHdCQUFBQSxVQUFBQSxPQUFBQSxJQUFBQSxRQUFBQSxZQUFBQSxLQUFBQTtBQUFBQSxFQUNGLENBQUE7QUFFQSxRQUFBLGVBQUEsTUFBQSxFQUFBLEtBQUEsT0FBQSxFQUFBLFVBQUEsUUFBQTs7SUFFbUIsUUFBQTtBQUFBLElBRUMsYUFBQTtBQUFBLElBQ0YsV0FBQSxNQUFBLFlBQUEsUUFBQTtBQUFBLEVBQzhCLEdBQUEsSUFBQSxJQUFBLElBQUEsRUFBQSxVQUFBLFlBQUE7QUFLaERDLG9CQUFBQSxNQUFBQSxZQUFBQSxVQUFBQSxNQUFBQSxDQUFBQSxZQUFBQSxPQUFBQTtBQUFBQSxJQUFrQixTQUFBLENBQUEsRUFBQSxnQkFBQSxNQUFBLEVBQUEsTUFBQSxhQUFBLEVBQUEsS0FBQSxTQUFBO0FBQUEsSUFHMEQsV0FBQSxNQUFBOztJQUd0RTtBQUFBLEVBQUMsR0FBQSxDQUFBQyxZQUFBLEtBQUE7QUFBQTs7O01BR1dDLFVBQUFBO0FBQUFBLElBQWM7QUFBQSxFQUFDLEdBQUEsSUFBQSxDQUFBLENBQUEsQ0FBQSxFQUFBLFVBQUEsbUJBQUE7QUFHbkM7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsV0FBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSwyRUFBQUE7In0=
