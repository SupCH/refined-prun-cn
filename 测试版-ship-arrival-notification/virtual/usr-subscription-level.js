import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { usersStore } from './users.js';
import _sfc_main from './Passive.vue.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const username = tile.parameter;
  subscribe($$(tile.anchor, C.ActionBar.container), async container => {
    const children = Array.from(container.parentElement?.children ?? []);
    const actionBarIndex = children.indexOf(container);
    if (actionBarIndex === -1) {
      return;
    }
    const usernameIndex = actionBarIndex + 1;
    const usernameElement = children[usernameIndex];
    if (usernameElement === void 0) {
      return;
    }
    const user = usersStore.getByUsername(username);
    if (!user) {
      return;
    }
    createFragmentApp(() =>
      createVNode(
        _sfc_main,
        {
          label: 'License',
        },
        {
          default: () => [user.subscriptionLevel],
        },
      ),
    ).after(usernameElement);
  });
}
function init() {
  tiles.observe('USR', onTileReady);
}
features.add(import.meta.url, init, 'USR: Adds user license info.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXNyLXN1YnNjcmlwdGlvbi1sZXZlbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL3Vzci1zdWJzY3JpcHRpb24tbGV2ZWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHVzZXJzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvdXNlcnMnO1xuaW1wb3J0IFBhc3NpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1Bhc3NpdmUudnVlJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgY29uc3QgdXNlcm5hbWUgPSB0aWxlLnBhcmFtZXRlcjtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkFjdGlvbkJhci5jb250YWluZXIpLCBhc3luYyBjb250YWluZXIgPT4ge1xuICAgIGNvbnN0IGNoaWxkcmVuID0gQXJyYXkuZnJvbShjb250YWluZXIucGFyZW50RWxlbWVudD8uY2hpbGRyZW4gPz8gW10pO1xuICAgIGNvbnN0IGFjdGlvbkJhckluZGV4ID0gY2hpbGRyZW4uaW5kZXhPZihjb250YWluZXIpO1xuICAgIGlmIChhY3Rpb25CYXJJbmRleCA9PT0gLTEpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCB1c2VybmFtZUluZGV4ID0gYWN0aW9uQmFySW5kZXggKyAxO1xuICAgIGNvbnN0IHVzZXJuYW1lRWxlbWVudCA9IGNoaWxkcmVuW3VzZXJuYW1lSW5kZXhdO1xuICAgIGlmICh1c2VybmFtZUVsZW1lbnQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IHVzZXIgPSB1c2Vyc1N0b3JlLmdldEJ5VXNlcm5hbWUodXNlcm5hbWUpO1xuICAgIGlmICghdXNlcikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNyZWF0ZUZyYWdtZW50QXBwKCgpID0+IDxQYXNzaXZlIGxhYmVsPVwiTGljZW5zZVwiPnt1c2VyLnN1YnNjcmlwdGlvbkxldmVsfTwvUGFzc2l2ZT4pLmFmdGVyKFxuICAgICAgdXNlcm5hbWVFbGVtZW50LFxuICAgICk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdVU1InLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdVU1I6IEFkZHMgdXNlciBsaWNlbnNlIGluZm8uJyk7XG4iXSwibmFtZXMiOlsic3Vic2NyaWJlIiwiY3JlYXRlRnJhZ21lbnRBcHAiLCJkZWZhdWx0IiwidGlsZXMiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsU0FBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLFdBQUEsS0FBQTtBQUNBQSxZQUFBQSxHQUFBQSxLQUFBQSxRQUFBQSxFQUFBQSxVQUFBQSxTQUFBQSxHQUFBQSxPQUFBQSxjQUFBQTtBQUNFLFVBQUEsV0FBQSxNQUFBLEtBQUEsVUFBQSxlQUFBLFlBQUEsRUFBQTtBQUNBLFVBQUEsaUJBQUEsU0FBQSxRQUFBLFNBQUE7QUFDQSxRQUFBLG1CQUFBLElBQUE7QUFDRTtBQUFBLElBQ0Y7QUFFQSxVQUFBLGdCQUFBLGlCQUFBO0FBQ0EsVUFBQSxrQkFBQSxTQUFBLGFBQUE7O0FBRUU7QUFBQSxJQUNGO0FBRUEsVUFBQSxPQUFBLFdBQUEsY0FBQSxRQUFBOztBQUVFO0FBQUEsSUFDRjtBQUVBQyxzQkFBQUEsTUFBQUEsWUFBQUEsV0FBQUE7QUFBQUEsTUFBa0IsU0FBQTtBQUFBLElBQUEsR0FBQTtBQUFBLE1BQUFDLFNBQUFBLE1BQUFBLENBQUFBLEtBQUFBLGlCQUFBQTtBQUFBQSxJQUFzRCxDQUFBLENBQUEsRUFBQSxNQUFBLGVBQUE7QUFBQSxFQUcxRSxDQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsUUFBQUEsT0FBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSw4QkFBQUE7In0=
