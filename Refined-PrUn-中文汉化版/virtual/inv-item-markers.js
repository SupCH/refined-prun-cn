import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import IconMarker from './IconMarker.vue.js';
import { computedTileState } from './user-data-tiles.js';
import { refTextContent } from './reactive-dom.js';
import { getTileState } from './tile-state4.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.StoreView.container), container => {
    subscribe($$(container, C.GridItemView.image), item => {
      if (item.children[1] === void 0) {
        void addMarker(item, tile);
      }
    });
  });
}
const icons = [
  { character: '', color: '#CC220E' },
  { character: '', color: '#F7A601' },
  { character: '', color: '#088DBF' },
  { character: '', color: '#C9C9C9' },
  { character: '', color: '#3A8018' },
];
async function addMarker(mat, tile) {
  const matTickerElem = await $(mat, C.ColoredIcon.label);
  const ticker = refTextContent(matTickerElem);
  const state = computedTileState(getTileState(tile), 'markers', {});
  const markerId = computed({
    get: () => (ticker.value !== null ? state.value[ticker.value] : 0) ?? 0,
    set: id => {
      if (ticker.value === null) {
        return;
      }
      const result = { ...state.value };
      if (id === 0) {
        delete result[ticker.value];
      } else {
        result[ticker.value] = id;
      }
      state.value = result;
    },
  });
  const wrapStatus = value => {
    if (value < 0) {
      return icons.length;
    }
    if (value > icons.length) {
      return 0;
    }
    return value;
  };
  mat.style.position = 'relative';
  createFragmentApp(
    IconMarker,
    reactive({
      marker: computed(() => icons[markerId.value - 1]?.character),
      color: computed(() => icons[markerId.value - 1]?.color),
      onNext: () => (markerId.value = wrapStatus(markerId.value + 1)),
      onPrevious: () => (markerId.value = wrapStatus(markerId.value - 1)),
    }),
  ).appendTo(mat);
}
function init() {
  tiles.observe(['INV', 'SHPI'], onTileReady);
}
features.add(import.meta.url, init, 'INV/SHPI: Adds bottom-left item markers.');
