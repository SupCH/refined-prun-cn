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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmJsLWNvbGxhcHNpYmxlLWNhdGVnb3JpZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9iYmwtY29sbGFwc2libGUtY2F0ZWdvcmllcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGNzcyBmcm9tICdAc3JjL3V0aWxzL2Nzcy11dGlscy5tb2R1bGUuY3NzJztcbmltcG9ydCAkc3R5bGUgZnJvbSAnLi9iYmwtY29sbGFwc2libGUtY2F0ZWdvcmllcy5tb2R1bGUuY3NzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlNlY3Rpb25MaXN0LmNvbnRhaW5lciksIGNvbnRhaW5lciA9PiB7XG4gICAgZm9yIChjb25zdCBkaXZpZGVyIG9mIF8kJChjb250YWluZXIsIEMuU2VjdGlvbkxpc3QuZGl2aWRlcikpIHtcbiAgICAgIC8vIEhpZGUgSW5mcmFzdHJ1Y3R1cmUgKHdoaWNoIGlzIHRoZSBmaXJzdCBjYXRlZ29yeSkgYnkgZGVmYXVsdFxuICAgICAgY29uc3QgZW5hYmxlZCA9IHJlZihjb250YWluZXIuZmlyc3RDaGlsZCAhPT0gZGl2aWRlcik7XG4gICAgICBkaXZpZGVyLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4gKGVuYWJsZWQudmFsdWUgPSAhZW5hYmxlZC52YWx1ZSkpO1xuICAgICAgY29uc3QgaW5kaWNhdG9yQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoe1xuICAgICAgICBbQy5SYWRpb0l0ZW0uaW5kaWNhdG9yXTogdHJ1ZSxcbiAgICAgICAgW0MuUmFkaW9JdGVtLmFjdGl2ZV06IGVuYWJsZWQudmFsdWUsXG4gICAgICAgIFtDLmVmZmVjdHMuc2hhZG93UHJpbWFyeV06IGVuYWJsZWQudmFsdWUsXG4gICAgICB9KSk7XG4gICAgICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiA8ZGl2IGNsYXNzPXtpbmRpY2F0b3JDbGFzcy52YWx1ZX0gLz4pLnByZXBlbmRUbyhkaXZpZGVyKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoXG4gICAgJ0JCTCcsXG4gICAgYC4ke0MuU2VjdGlvbkxpc3QuZGl2aWRlcn06bm90KDpoYXMoLiR7Qy5SYWRpb0l0ZW0uYWN0aXZlfSkpICsgZGl2YCxcbiAgICBjc3MuaGlkZGVuLFxuICApO1xuICBhcHBseUNzc1J1bGUoJ0JCTCcsIGAuJHtDLlNlY3Rpb25MaXN0LmRpdmlkZXJ9YCwgJHN0eWxlLmRpdmlkZXIpO1xuICB0aWxlcy5vYnNlcnZlKCdCQkwnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnQkJMOiBNYWtlcyBjYXRlZ29yaWVzIGNvbGxhcHNpYmxlIGFuZCBjb2xsYXBzZXMgdGhlIFwiSW5mcmFzdHJ1Y3R1cmVcIiBjYXRlZ29yeSBieSBkZWZhdWx0LicsXG4pO1xuIl0sIm5hbWVzIjpbInN1YnNjcmliZSIsImRpdmlkZXIiLCJhcHBseUNzc1J1bGUiLCJ0aWxlcyIsImZlYXR1cmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLFNBQUEsWUFBQSxNQUFBO0FBQ0VBLFlBQUFBLEdBQUFBLEtBQUFBLFFBQUFBLEVBQUFBLFlBQUFBLFNBQUFBLEdBQUFBLGVBQUFBO0FBQ0UsZUFBQSxXQUFBLElBQUEsV0FBQSxFQUFBLFlBQUEsT0FBQSxHQUFBOztBQUdFQyxjQUFBQSxpQkFBQUEsU0FBQUEsTUFBQUEsUUFBQUEsUUFBQUEsQ0FBQUEsUUFBQUEsS0FBQUE7QUFDQSxZQUFBLGlCQUFBLFNBQUEsT0FBQTtBQUFBLFFBQ0UsQ0FBQSxFQUFBLFVBQUEsU0FBQSxHQUFBO0FBQUE7UUFFQSxDQUFBLEVBQUEsUUFBQSxhQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ0YsRUFBQTs7UUFDa0IsU0FBQSxlQUFBO0FBQUEsTUFBc0MsR0FBQSxJQUFBLENBQUEsRUFBQSxVQUFBLE9BQUE7QUFBQSxJQUMxRDtBQUFBLEVBQ0YsQ0FBQTtBQUNGO0FBRUEsU0FBQSxPQUFBOztBQU1FQyxlQUFBQSxPQUFBQSxJQUFBQSxFQUFBQSxZQUFBQSxPQUFBQSxJQUFBQSxPQUFBQSxPQUFBQTtBQUNBQyxRQUFBQSxRQUFBQSxPQUFBQSxXQUFBQTtBQUNGO0FBRUFDLFNBQUFBLElBQUFBLFlBQUFBLEtBQUFBLE1BQUFBLDJGQUFBQTsifQ==
