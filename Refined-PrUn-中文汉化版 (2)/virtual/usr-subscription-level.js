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
