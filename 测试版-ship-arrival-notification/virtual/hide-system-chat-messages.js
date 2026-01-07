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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGlkZS1zeXN0ZW0tY2hhdC1tZXNzYWdlcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2hpZGUtc3lzdGVtLWNoYXQtbWVzc2FnZXMvaGlkZS1zeXN0ZW0tY2hhdC1tZXNzYWdlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vaGlkZS1zeXN0ZW0tY2hhdC1tZXNzYWdlcy5tb2R1bGUuY3NzJztcbmltcG9ydCBjc3MgZnJvbSAnQHNyYy91dGlscy9jc3MtdXRpbHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5pbXBvcnQgeyBvYnNlcnZlRGVzY2VuZGFudExpc3RDaGFuZ2VkIH0gZnJvbSAnQHNyYy91dGlscy9tdXRhdGlvbi1vYnNlcnZlcic7XG5pbXBvcnQgU2VsZWN0QnV0dG9uIGZyb20gJ0BzcmMvZmVhdHVyZXMvYWR2YW5jZWQvaGlkZS1zeXN0ZW0tY2hhdC1tZXNzYWdlcy9TZWxlY3RCdXR0b24udnVlJztcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEnO1xuaW1wb3J0IHJlbW92ZUFycmF5RWxlbWVudCBmcm9tICdAc3JjL3V0aWxzL3JlbW92ZS1hcnJheS1lbGVtZW50JztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgY29uc3Qgc3RhdGUgPSBjb21wdXRlZCgoKSA9PlxuICAgIHVzZXJEYXRhLnN5c3RlbU1lc3NhZ2VzLmZpbmQoeCA9PiB4LmNoYXQudG9VcHBlckNhc2UoKSA9PT0gdGlsZS5mdWxsQ29tbWFuZC50b1VwcGVyQ2FzZSgpKSxcbiAgKTtcbiAgY29uc3QgaGlkZUpvaW5lZCA9IGNvbXB1dGVkKCgpID0+IHN0YXRlLnZhbHVlPy5oaWRlSm9pbmVkID8/IHRydWUpO1xuICBjb25zdCBoaWRlRGVsZXRlZCA9IGNvbXB1dGVkKCgpID0+IHN0YXRlLnZhbHVlPy5oaWRlRGVsZXRlZCA/PyB0cnVlKTtcblxuICBmdW5jdGlvbiBzZXRTdGF0ZShzZXQ6IChzdGF0ZTogVXNlckRhdGEuU3lzdGVtTWVzc2FnZXMpID0+IHZvaWQpIHtcbiAgICBsZXQgbmV3U3RhdGUgPSBzdGF0ZS52YWx1ZTtcbiAgICBpZiAoIW5ld1N0YXRlKSB7XG4gICAgICBuZXdTdGF0ZSA9IHtcbiAgICAgICAgY2hhdDogdGlsZS5mdWxsQ29tbWFuZCxcbiAgICAgICAgaGlkZUpvaW5lZDogdHJ1ZSxcbiAgICAgICAgaGlkZURlbGV0ZWQ6IHRydWUsXG4gICAgICB9O1xuICAgIH1cbiAgICBzZXQobmV3U3RhdGUpO1xuICAgIGNvbnN0IHNob3VsZFNhdmUgPSAhbmV3U3RhdGUuaGlkZUpvaW5lZCB8fCAhbmV3U3RhdGUuaGlkZURlbGV0ZWQ7XG4gICAgaWYgKHNob3VsZFNhdmUgJiYgIXN0YXRlLnZhbHVlKSB7XG4gICAgICB1c2VyRGF0YS5zeXN0ZW1NZXNzYWdlcy5wdXNoKG5ld1N0YXRlKTtcbiAgICB9XG4gICAgaWYgKCFzaG91bGRTYXZlICYmIHN0YXRlLnZhbHVlKSB7XG4gICAgICByZW1vdmVBcnJheUVsZW1lbnQodXNlckRhdGEuc3lzdGVtTWVzc2FnZXMsIHN0YXRlLnZhbHVlKTtcbiAgICB9XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQ2hhbm5lbC5jb250cm9scyksIGNvbnRyb2xzID0+IHtcbiAgICBjcmVhdGVGcmFnbWVudEFwcChcbiAgICAgIFNlbGVjdEJ1dHRvbixcbiAgICAgIHJlYWN0aXZlKHtcbiAgICAgICAgbGFiZWw6ICdoaWRlIGpvaW5lZCcsXG4gICAgICAgIHNlbGVjdGVkOiBoaWRlSm9pbmVkLFxuICAgICAgICBzZXQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gc2V0U3RhdGUoc3RhdGUgPT4gKHN0YXRlLmhpZGVKb2luZWQgPSB2YWx1ZSkpLFxuICAgICAgfSksXG4gICAgKS5hcHBlbmRUbyhjb250cm9scyk7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoXG4gICAgICBTZWxlY3RCdXR0b24sXG4gICAgICByZWFjdGl2ZSh7XG4gICAgICAgIGxhYmVsOiAnaGlkZSBkZWxldGVkJyxcbiAgICAgICAgc2VsZWN0ZWQ6IGhpZGVEZWxldGVkLFxuICAgICAgICBzZXQ6ICh2YWx1ZTogYm9vbGVhbikgPT4gc2V0U3RhdGUoc3RhdGUgPT4gKHN0YXRlLmhpZGVEZWxldGVkID0gdmFsdWUpKSxcbiAgICAgIH0pLFxuICAgICkuYXBwZW5kVG8oY29udHJvbHMpO1xuICB9KTtcblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuTWVzc2FnZUxpc3QubWVzc2FnZXMpLCBtZXNzYWdlcyA9PiB7XG4gICAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShtZXNzYWdlcywgKCkgPT4ge1xuICAgICAgbWVzc2FnZXMuY2xhc3NMaXN0LnJlbW92ZSgkc3R5bGUuaGlkZUpvaW5lZCwgJHN0eWxlLmhpZGVEZWxldGVkKTtcbiAgICAgIGlmIChoaWRlSm9pbmVkLnZhbHVlKSB7XG4gICAgICAgIG1lc3NhZ2VzLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmhpZGVKb2luZWQpO1xuICAgICAgfVxuICAgICAgaWYgKGhpZGVEZWxldGVkLnZhbHVlKSB7XG4gICAgICAgIG1lc3NhZ2VzLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmhpZGVEZWxldGVkKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBzdWJzY3JpYmUoJCQobWVzc2FnZXMsIEMuTWVzc2FnZS5tZXNzYWdlKSwgcHJvY2Vzc01lc3NhZ2UpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gcHJvY2Vzc01lc3NhZ2UobWVzc2FnZTogSFRNTEVsZW1lbnQpIHtcbiAgb2JzZXJ2ZURlc2NlbmRhbnRMaXN0Q2hhbmdlZChtZXNzYWdlLCAoKSA9PiB7XG4gICAgY29uc3Qgc3lzdGVtID0gXyQobWVzc2FnZSwgQy5NZXNzYWdlLnN5c3RlbSk7XG4gICAgY29uc3QgbmFtZSA9IF8kKG1lc3NhZ2UsIEMuTWVzc2FnZS5uYW1lKTtcbiAgICBpZiAoIXN5c3RlbSB8fCAhbmFtZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAobmFtZS5jaGlsZHJlbi5sZW5ndGggPiAwKSB7XG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmRlbGV0ZWQpO1xuICAgIH0gZWxzZSB7XG4gICAgICBtZXNzYWdlLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmpvaW5lZCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZShbJ0NPTUcnLCAnQ09NUCcsICdDT01VJ10sIG9uVGlsZVJlYWR5KTtcbiAgYXBwbHlDc3NSdWxlKGAuJHskc3R5bGUuaGlkZUpvaW5lZH0gLiR7JHN0eWxlLmpvaW5lZH1gLCBjc3MuaGlkZGVuKTtcbiAgYXBwbHlDc3NSdWxlKGAuJHskc3R5bGUuaGlkZURlbGV0ZWR9IC4keyRzdHlsZS5kZWxldGVkfWAsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnSGlkZXMgc3lzdGVtIG1lc3NhZ2VzIGluIGNoYXRzLicpO1xuIl0sIm5hbWVzIjpbIlNlbGVjdEJ1dHRvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQVFBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsUUFBQSxRQUFBO0FBQUEsSUFBYyxNQUFBLFNBQUEsZUFBQSxLQUFBLENBQUEsTUFBQSxFQUFBLEtBQUEsWUFBQSxNQUFBLEtBQUEsWUFBQSxZQUFBLENBQUE7QUFBQSxFQUM2RTtBQUUzRixRQUFBLGFBQUEsU0FBQSxNQUFBLE1BQUEsT0FBQSxjQUFBLElBQUE7QUFDQSxRQUFBLGNBQUEsU0FBQSxNQUFBLE1BQUEsT0FBQSxlQUFBLElBQUE7QUFFQSxXQUFBLFNBQUEsS0FBQTtBQUNFLFFBQUEsV0FBQSxNQUFBO0FBQ0EsUUFBQSxDQUFBLFVBQUE7QUFDRSxpQkFBQTtBQUFBLFFBQVcs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
