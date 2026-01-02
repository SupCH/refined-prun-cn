import { onApiMessage } from './api-messages.js';
import { createEntityStore } from './create-entity-store.js';
import { shallowReactive, ref } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
const store = createEntityStore();
const state = store.state;
const removed = shallowReactive([]);
onApiMessage({
  UI_DATA(data) {
    store.setAll(data.screens);
    removed.length = 0;
    removed.push(...data.removedScreens);
    store.setFetched();
  },
  UI_SCREENS_ADD(data) {
    store.addOne(data);
  },
  UI_SCREENS_RENAME(data) {
    const screen = state.getById(data.id);
    if (screen !== void 0) {
      store.setOne({
        ...screen,
        name: data.name,
      });
    }
  },
  UI_SCREENS_DELETE(data) {
    const screen = state.getById(data.id);
    if (!screen) {
      return;
    }
    store.removeOne(data.id);
    removed.unshift(screen);
  },
  UI_SCREENS_UNDELETE() {
    const screen = removed.shift();
    if (!screen) {
      return;
    }
    store.addOne(screen);
  },
});
const screenHash = ref(void 0);
const context = ref(void 0);
function updateCurrent() {
  screenHash.value = location.hash.match(/screen=([^&]*)/)?.[1];
  context.value = location.hash.match(/context=([^&]*)/)?.[1];
}
updateCurrent();
window.addEventListener('locationchange', updateCurrent);
window.addEventListener('hashchange', updateCurrent);
const sorted = computed(() =>
  state.all.value
    ?.filter(x => !x.hidden)
    .sort((a, b) => (a.name === b.name ? 0 : a.name < b.name ? -1 : 1)),
);
const current = computed(
  () => sorted.value?.find(x => x.id === screenHash.value) ?? sorted.value?.[0],
);
const screensStore = {
  ...state,
  sorted,
  current,
};
export { context, screenHash, screensStore };
