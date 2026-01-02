import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './bbl-collapsible-categories.module.css.js';
import { ref } from './reactivity.esm-bundler.js';
import { computed, createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.SectionList.container), container => {
    for (const divider of _$$(container, C.SectionList.divider)) {
      const enabled = ref(container.firstChild !== divider);
      divider.addEventListener('click', () => (enabled.value = !enabled.value));
      const indicatorClass = computed(() => ({
        [C.RadioItem.indicator]: true,
        [C.RadioItem.active]: enabled.value,
        [C.effects.shadowPrimary]: enabled.value,
      }));
      createFragmentApp(() =>
        createVNode(
          'div',
          {
            class: indicatorClass.value,
          },
          null,
        ),
      ).prependTo(divider);
    }
  });
}
function init() {
  applyCssRule(
    'BBL',
    `.${C.SectionList.divider}:not(:has(.${C.RadioItem.active})) + div`,
    css.hidden,
  );
  applyCssRule('BBL', `.${C.SectionList.divider}`, $style.divider);
  tiles.observe('BBL', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BBL: Makes categories collapsible and collapses the "Infrastructure" category by default.',
);
