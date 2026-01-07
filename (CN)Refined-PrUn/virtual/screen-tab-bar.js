import { subscribe } from './subscribe-async-generator.js';
import { $$, $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import $style from './screen-tab-bar.module.css.js';
import TabBar from './TabBar.vue.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { syncState } from './sync.js';
import { watchEffect, computed, createVNode } from './runtime-core.esm-bundler.js';
function onListReady(list) {
  subscribe($$(list, C.ScreenControls.screen), onScreenItemReady);
  watchEffect(() => {
    syncState();
    sortScreenList(list);
  });
}
function sortScreenList(list) {
  const screens = _$$(list, C.ScreenControls.screen).map(screen => {
    const name = _$(screen, C.ScreenControls.name);
    const id = extractScreenId(name.href);
    const index = id ? userData.tabs.order.indexOf(id) : -1;
    return {
      el: screen,
      index,
    };
  });
  screens.sort((a, b) => a.index - b.index);
  for (const screen of screens) {
    list.appendChild(screen.el);
  }
  list.appendChild(_$(list, C.ScreenControls.undo));
}
async function onScreenItemReady(item) {
  const name = await $(item, C.ScreenControls.name);
  const id = extractScreenId(name.href);
  if (id === void 0) {
    return;
  }
  const copy = await $(item, C.ScreenControls.copy);
  const hidden = computed(() => userData.tabs.hidden.includes(id));
  watchEffectWhileNodeAlive(name, () => {
    if (hidden.value) {
      name.classList.add($style.hiddenName);
    } else {
      name.classList.remove($style.hiddenName);
    }
  });
  function onClick(e) {
    if (hidden.value) {
      removeArrayElement(userData.tabs.hidden, id);
    } else {
      userData.tabs.hidden.push(id);
    }
    e.stopPropagation();
    e.preventDefault();
  }
  createFragmentApp(() =>
    createVNode(
      'div',
      {
        class: [C.ScreenControls.delete, C.type.typeSmall, $style.hideButton],
        onClick: onClick,
      },
      [hidden.value ? 'shw' : 'hide'],
    ),
  ).before(copy);
}
function extractScreenId(url) {
  return url?.match(/screen=([\w-]+)/)?.[1] ?? void 0;
}
function init() {
  subscribe($$(document, C.ScreenControls.container), container => {
    createFragmentApp(TabBar).appendTo(container);
  });
  subscribe($$(document, C.ScreenControls.screens), onListReady);
  applyCssRule(`.${C.Head.contextAndScreens}`, $style.contextAndScreens);
  applyCssRule(`.${C.ScreenControls.container}`, $style.screenControls);
}
features.add(import.meta.url, init, 'Adds a tab bar for user screens.');
