import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import $style from './screen-layout-lock.module.css.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { screensStore } from './screens.js';
import { computed, createVNode } from './runtime-core.esm-bundler.js';
function onListReady(list) {
  subscribe($$(list, C.ScreenControls.screen), onScreenItemReady);
}
async function onScreenItemReady(item) {
  const name = await $(item, C.ScreenControls.name);
  const id = extractScreenId(name.href);
  if (id === void 0) {
    return;
  }
  const copy = await $(item, C.ScreenControls.copy);
  const locked = computed(() => userData.tabs.locked.includes(id));
  function onClick(e) {
    if (locked.value) {
      removeArrayElement(userData.tabs.locked, id);
    } else {
      userData.tabs.locked.push(id);
    }
    e.stopPropagation();
    e.preventDefault();
  }
  createFragmentApp(() =>
    createVNode(
      'div',
      {
        class: [C.ScreenControls.delete, C.type.typeSmall, $style.lockButton],
        onClick: onClick,
      },
      [locked.value ? 'unlk' : 'lock'],
    ),
  ).before(copy);
}
function extractScreenId(url) {
  return url?.match(/screen=([\w-]+)/)?.[1] ?? void 0;
}
function onFrameReady(frame) {
  watchEffectWhileNodeAlive(frame, () => {
    frame.classList.toggle(
      $style.lockedScreen,
      userData.tabs.locked.includes(screensStore.current.value?.id ?? ''),
    );
  });
}
const tileControlsSymbols = ['–', '|', 'x', ':'];
async function onControlsReady(controls) {
  subscribe($$(controls, C.TileControls.control), control => {
    if (tileControlsSymbols.includes(control.textContent)) {
      control.classList.add($style.tileControl);
    }
  });
}
function init() {
  subscribe($$(document, C.ScreenControls.screens), onListReady);
  subscribe($$(document, C.Frame.main), onFrameReady);
  subscribe($$(document, C.TileControls.controls), onControlsReady);
  applyCssRule(`.${C.TileDivider.handle}`, $style.handle);
}
features.add(import.meta.url, init, 'Adds screen locking.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2NyZWVuLWxheW91dC1sb2NrLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvc2NyZWVuLWxheW91dC1sb2NrLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vc2NyZWVuLWxheW91dC1sb2NrLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgcmVtb3ZlQXJyYXlFbGVtZW50IGZyb20gJ0BzcmMvdXRpbHMvcmVtb3ZlLWFycmF5LWVsZW1lbnQnO1xuaW1wb3J0IHsgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZSB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuaW1wb3J0IHsgc2NyZWVuc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NjcmVlbnMnO1xuXG5mdW5jdGlvbiBvbkxpc3RSZWFkeShsaXN0OiBIVE1MRWxlbWVudCkge1xuICBzdWJzY3JpYmUoJCQobGlzdCwgQy5TY3JlZW5Db250cm9scy5zY3JlZW4pLCBvblNjcmVlbkl0ZW1SZWFkeSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9uU2NyZWVuSXRlbVJlYWR5KGl0ZW06IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IG5hbWUgPSAoYXdhaXQgJChpdGVtLCBDLlNjcmVlbkNvbnRyb2xzLm5hbWUpKSBhcyBIVE1MQW5jaG9yRWxlbWVudDtcbiAgY29uc3QgaWQgPSBleHRyYWN0U2NyZWVuSWQobmFtZS5ocmVmKSE7XG4gIGlmIChpZCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IGNvcHkgPSBhd2FpdCAkKGl0ZW0sIEMuU2NyZWVuQ29udHJvbHMuY29weSk7XG4gIGNvbnN0IGxvY2tlZCA9IGNvbXB1dGVkKCgpID0+IHVzZXJEYXRhLnRhYnMubG9ja2VkLmluY2x1ZGVzKGlkKSk7XG5cbiAgZnVuY3Rpb24gb25DbGljayhlOiBFdmVudCkge1xuICAgIGlmIChsb2NrZWQudmFsdWUpIHtcbiAgICAgIHJlbW92ZUFycmF5RWxlbWVudCh1c2VyRGF0YS50YWJzLmxvY2tlZCwgaWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICB1c2VyRGF0YS50YWJzLmxvY2tlZC5wdXNoKGlkKTtcbiAgICB9XG4gICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gIH1cblxuICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgPGRpdiBjbGFzcz17W0MuU2NyZWVuQ29udHJvbHMuZGVsZXRlLCBDLnR5cGUudHlwZVNtYWxsLCAkc3R5bGUubG9ja0J1dHRvbl19IG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAge2xvY2tlZC52YWx1ZSA/ICd1bmxrJyA6ICdsb2NrJ31cbiAgICA8L2Rpdj5cbiAgKSkuYmVmb3JlKGNvcHkpO1xufVxuXG5mdW5jdGlvbiBleHRyYWN0U2NyZWVuSWQodXJsPzogc3RyaW5nKSB7XG4gIHJldHVybiB1cmw/Lm1hdGNoKC9zY3JlZW49KFtcXHctXSspLyk/LlsxXSA/PyB1bmRlZmluZWQ7XG59XG5cbmZ1bmN0aW9uIG9uRnJhbWVSZWFkeShmcmFtZTogSFRNTEVsZW1lbnQpIHtcbiAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShmcmFtZSwgKCkgPT4ge1xuICAgIGZyYW1lLmNsYXNzTGlzdC50b2dnbGUoXG4gICAgICAkc3R5bGUubG9ja2VkU2NyZWVuLFxuICAgICAgdXNlckRhdGEudGFicy5sb2NrZWQuaW5jbHVkZXMoc2NyZWVuc1N0b3JlLmN1cnJlbnQudmFsdWU/LmlkID8/ICcnKSxcbiAgICApO1xuICB9KTtcbn1cblxuY29uc3QgdGlsZUNvbnRyb2xzU3ltYm9scyA9IFsn4oCTJywgJ3wnLCAneCcsICc6J107XG5cbmFzeW5jIGZ1bmN0aW9uIG9uQ29udHJvbHNSZWFkeShjb250cm9sczogSFRNTEVsZW1lbnQpIHtcbiAgc3Vic2NyaWJlKCQkKGNvbnRyb2xzLCBDLlRpbGVDb250cm9scy5jb250cm9sKSwgY29udHJvbCA9PiB7XG4gICAgaWYgKHRpbGVDb250cm9sc1N5bWJvbHMuaW5jbHVkZXMoY29udHJvbC50ZXh0Q29udGVudCEpKSB7XG4gICAgICBjb250cm9sLmNsYXNzTGlzdC5hZGQoJHN0eWxlLnRpbGVDb250cm9sKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsIEMuU2NyZWVuQ29udHJvbHMuc2NyZWVucyksIG9uTGlzdFJlYWR5KTtcbiAgc3Vic2NyaWJlKCQkKGRvY3VtZW50LCBDLkZyYW1lLm1haW4pLCBvbkZyYW1lUmVhZHkpO1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsIEMuVGlsZUNvbnRyb2xzLmNvbnRyb2xzKSwgb25Db250cm9sc1JlYWR5KTtcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLlRpbGVEaXZpZGVyLmhhbmRsZX1gLCAkc3R5bGUuaGFuZGxlKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0FkZHMgc2NyZWVuIGxvY2tpbmcuJyk7XG4iXSwibmFtZXMiOlsic3Vic2NyaWJlIiwiYXBwbHlDc3NSdWxlIiwiZmVhdHVyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQU1BLFNBQUEsWUFBQSxNQUFBO0FBQ0VBLFlBQUFBLEdBQUFBLE1BQUFBLEVBQUFBLGVBQUFBLE1BQUFBLEdBQUFBLGlCQUFBQTtBQUNGO0FBRUEsZUFBQSxrQkFBQSxNQUFBO0FBQ0UsUUFBQSxPQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsZUFBQSxJQUFBO0FBQ0EsUUFBQSxLQUFBLGdCQUFBLEtBQUEsSUFBQTs7QUFFRTtBQUFBLEVBQ0Y7QUFDQSxRQUFBLE9BQUEsTUFBQSxFQUFBLE1BQUEsRUFBQSxlQUFBLElBQUE7QUFDQSxRQUFBLFNBQUEsU0FBQSxNQUFBLFNBQUEsS0FBQSxPQUFBLFNBQUEsRUFBQSxDQUFBOzs7O0lBS0UsT0FBQTs7SUFFQTs7O0VBR0Y7O0lBRWtCLFNBQUEsQ0FBQSxFQUFBLGVBQUEsUUFBQSxFQUFBLEtBQUEsV0FBQSxPQUFBLFVBQUE7QUFBQTtFQUM0RSxHQUFBLENBQUEsT0FBQSxRQUFBLFNBQUEsTUFBQSxDQUFBLENBQUEsRUFBQSxPQUFBLElBQUE7QUFJaEc7QUFFQSxTQUFBLGdCQUFBLEtBQUE7O0FBRUE7QUFFQSxTQUFBLGFBQUEsT0FBQTs7O0VBTUUsQ0FBQTtBQUNGO0FBRUEsTUFBQSxzQkFBQSxDQUFBLEtBQUEsS0FBQSxLQUFBLEdBQUE7QUFFQSxlQUFBLGdCQUFBLFVBQUE7QUFDRUEsWUFBQUEsR0FBQUEsVUFBQUEsRUFBQUEsYUFBQUEsT0FBQUEsR0FBQUEsYUFBQUE7OztJQUdFO0FBQUEsRUFDRixDQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRUEsWUFBQUEsR0FBQUEsVUFBQUEsRUFBQUEsZUFBQUEsT0FBQUEsR0FBQUEsV0FBQUE7QUFDQUEsWUFBQUEsR0FBQUEsVUFBQUEsRUFBQUEsTUFBQUEsSUFBQUEsR0FBQUEsWUFBQUE7QUFDQUEsWUFBQUEsR0FBQUEsVUFBQUEsRUFBQUEsYUFBQUEsUUFBQUEsR0FBQUEsZUFBQUE7QUFDQUMsZUFBQUEsSUFBQUEsRUFBQUEsWUFBQUEsTUFBQUEsSUFBQUEsT0FBQUEsTUFBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxzQkFBQUE7In0=
