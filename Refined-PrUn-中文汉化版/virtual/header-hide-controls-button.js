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
