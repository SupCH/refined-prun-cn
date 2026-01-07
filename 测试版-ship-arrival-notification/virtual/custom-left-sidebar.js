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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3VzdG9tLWxlZnQtc2lkZWJhci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N1c3RvbS1sZWZ0LXNpZGViYXIvY3VzdG9tLWxlZnQtc2lkZWJhci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuaW1wb3J0IFNpZGViYXJCdXR0b25zIGZyb20gJy4vU2lkZWJhckJ1dHRvbnMudnVlJztcbmltcG9ydCB7IHJlZkF0dHJpYnV0ZVZhbHVlIH0gZnJvbSAnQHNyYy91dGlscy9yZWFjdGl2ZS1kb20nO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoJyNUT1VSX1RBUkdFVF9TSURFQkFSX0xFRlRfMDInLCBjc3MuaGlkZGVuKTtcbiAgc3Vic2NyaWJlKCQkKGRvY3VtZW50LCBDLkZyYW1lLnNpZGViYXIpLCBzaWRlYmFyID0+IHtcbiAgICBjb25zdCBjb20gPSBfJCQoc2lkZWJhciwgQy5GcmFtZS50b2dnbGUpLmZpbmQoeCA9PiB4LnRleHRDb250ZW50ID09PSAnQ09NJyk7XG4gICAgY29uc3QgY29tSW5kaWNhdG9yID0gY29tID8gXyQoY29tLCBDLkZyYW1lLnRvZ2dsZUluZGljYXRvcikgOiB1bmRlZmluZWQ7XG4gICAgY29uc3QgY29tQ2xhc3MgPSBjb21JbmRpY2F0b3IgPyByZWZBdHRyaWJ1dGVWYWx1ZShjb21JbmRpY2F0b3IsICdjbGFzcycpIDogcmVmKHVuZGVmaW5lZCk7XG4gICAgY29uc3QgY29tUHVsc2UgPSBjb21wdXRlZCgoKSA9PiBjb21DbGFzcy52YWx1ZT8uaW5jbHVkZXMoQy5GcmFtZS50b2dnbGVJbmRpY2F0b3JQdWxzZUFjdGl2ZSkpO1xuICAgIGNyZWF0ZUZyYWdtZW50QXBwKFNpZGViYXJCdXR0b25zLCByZWFjdGl2ZSh7IGNvbVB1bHNlIH0pKS5hcHBlbmRUbyhzaWRlYmFyKTtcbiAgfSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdNYWtlcyB0aGUgc2lkZWJhciBvbiB0aGUgbGVmdCBjdXN0b21pemFibGUgdmlhIHNldHRpbmdzLicpO1xuIl0sIm5hbWVzIjpbIlNpZGViYXJCdXR0b25zIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUlBLFNBQUEsT0FBQTtBQUNFLGVBQUEsZ0NBQUEsSUFBQSxNQUFBO0FBQ0EsWUFBQSxHQUFBLFVBQUEsRUFBQSxNQUFBLE9BQUEsR0FBQSxDQUFBLFlBQUE7QUFDRSxVQUFBLE1BQUEsSUFBQSxTQUFBLEVBQUEsTUFBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLE1BQUEsRUFBQSxnQkFBQSxLQUFBO0FBQ0EsVUFBQSxlQUFBLE1BQUEsR0FBQSxLQUFBLEVBQUEsTUFBQSxlQUFBLElBQUE7QUFDQSxVQUFBLFdBQUEsZUFBQSxrQkFBQSxjQUFBLE9BQUEsSUFBQSxJQUFBLE1BQUE7QUFDQSxVQUFBLFdBQUEsU0FBQSxNQUFBLFNBQUEsT0FBQSxTQUFBLEVBQUEsTUFBQSwwQkFBQSxDQUFBO0FBQ0Esc0JBQUFBLFdBQUEsU0FBQSxFQUFBLFNBQUEsQ0FBQSxDQUFBLEVBQUEsU0FBQSxPQUFBO0FBQUEsRUFBMEUsQ0FBQTtBQUU5RTtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwwREFBQTsifQ==
