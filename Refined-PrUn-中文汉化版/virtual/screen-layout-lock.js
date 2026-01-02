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
