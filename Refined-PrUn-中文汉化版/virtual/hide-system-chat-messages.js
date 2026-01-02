import { subscribe } from './subscribe-async-generator.js';
import { $$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import $style from './hide-system-chat-messages.module.css.js';
import css from './css-utils.module.css.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { observeDescendantListChanged } from './mutation-observer.js';
import _sfc_main from './SelectButton.vue.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const state = computed(() =>
    userData.systemMessages.find(x => x.chat.toUpperCase() === tile.fullCommand.toUpperCase()),
  );
  const hideJoined = computed(() => state.value?.hideJoined ?? true);
  const hideDeleted = computed(() => state.value?.hideDeleted ?? true);
  function setState(set) {
    let newState = state.value;
    if (!newState) {
      newState = {
        chat: tile.fullCommand,
        hideJoined: true,
        hideDeleted: true,
      };
    }
    set(newState);
    const shouldSave = !newState.hideJoined || !newState.hideDeleted;
    if (shouldSave && !state.value) {
      userData.systemMessages.push(newState);
    }
    if (!shouldSave && state.value) {
      removeArrayElement(userData.systemMessages, state.value);
    }
  }
  subscribe($$(tile.anchor, C.Channel.controls), controls => {
    createFragmentApp(
      _sfc_main,
      reactive({
        label: 'hide joined',
        selected: hideJoined,
        set: value => setState(state2 => (state2.hideJoined = value)),
      }),
    ).appendTo(controls);
    createFragmentApp(
      _sfc_main,
      reactive({
        label: 'hide deleted',
        selected: hideDeleted,
        set: value => setState(state2 => (state2.hideDeleted = value)),
      }),
    ).appendTo(controls);
  });
  subscribe($$(tile.anchor, C.MessageList.messages), messages => {
    watchEffectWhileNodeAlive(messages, () => {
      messages.classList.remove($style.hideJoined, $style.hideDeleted);
      if (hideJoined.value) {
        messages.classList.add($style.hideJoined);
      }
      if (hideDeleted.value) {
        messages.classList.add($style.hideDeleted);
      }
    });
    subscribe($$(messages, C.Message.message), processMessage);
  });
}
function processMessage(message) {
  observeDescendantListChanged(message, () => {
    const system = _$(message, C.Message.system);
    const name = _$(message, C.Message.name);
    if (!system || !name) {
      return;
    }
    if (name.children.length > 0) {
      message.classList.add($style.deleted);
    } else {
      message.classList.add($style.joined);
    }
  });
}
function init() {
  tiles.observe(['COMG', 'COMP', 'COMU'], onTileReady);
  applyCssRule(`.${$style.hideJoined} .${$style.joined}`, css.hidden);
  applyCssRule(`.${$style.hideDeleted} .${$style.deleted}`, css.hidden);
}
features.add(import.meta.url, init, 'Hides system messages in chats.');
