import { applyCssRule } from './refined-prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import { _$$, _$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import _sfc_main from './SidebarButtons.vue.js';
import { refAttributeValue } from './reactive-dom.js';
import { ref, reactive } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
function init() {
  applyCssRule('#TOUR_TARGET_SIDEBAR_LEFT_02', css.hidden);
  subscribe($$(document, C.Frame.sidebar), sidebar => {
    const com = _$$(sidebar, C.Frame.toggle).find(x => x.textContent === 'COM');
    const comIndicator = com ? _$(com, C.Frame.toggleIndicator) : void 0;
    const comClass = comIndicator ? refAttributeValue(comIndicator, 'class') : ref(void 0);
    const comPulse = computed(() => comClass.value?.includes(C.Frame.toggleIndicatorPulseActive));
    createFragmentApp(_sfc_main, reactive({ comPulse })).appendTo(sidebar);
  });
}
features.add(import.meta.url, init, 'Makes the sidebar on the left customizable via settings.');
