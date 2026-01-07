import { subscribe } from './subscribe-async-generator.js';
import { $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import MinimizeRow from './MinimizeRow.vue.js';
import { streamHtmlCollection } from './stream-html-collection.js';
import { computedTileState } from './user-data-tiles.js';
import { getTileState } from './tile-state3.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const isMinimized = computedTileState(getTileState(tile), 'minimizeHeader', true);
  subscribe(streamHtmlCollection(tile.anchor, tile.anchor.children), async child => {
    const header = await $(child, C.FormComponent.containerPassive);
    setHeaders(tile, isMinimized.value);
    createFragmentApp(
      MinimizeRow,
      reactive({
        isMinimized,
        onClick: () => {
          isMinimized.value = !isMinimized.value;
          setHeaders(tile, isMinimized.value);
        },
      }),
    ).before(header);
  });
}
function setHeaders(tile, isMinimized) {
  for (const header of _$$(tile.anchor, C.FormComponent.containerPassive)) {
    const label = _$(header, C.FormComponent.label);
    if (label?.textContent === 'Minimize') {
      continue;
    }
    if (label?.textContent === 'Termination request') {
      const value = _$(header, C.FormComponent.input);
      if (value?.textContent !== '--') {
        continue;
      }
    }
    header.style.display = isMinimized ? 'none' : 'flex';
  }
}
function init() {
  tiles.observe(['CX', 'CONT', 'LM', 'SYSI'], onTileReady);
}
features.add(import.meta.url, init, 'Minimizes headers in CX, CONT, LM, and SYSI.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWluaW1pemUtaGVhZGVycy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL21pbmltaXplLWhlYWRlcnMvbWluaW1pemUtaGVhZGVycy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgTWluaW1pemVSb3cgZnJvbSAnLi9NaW5pbWl6ZVJvdy52dWUnO1xuaW1wb3J0IHsgc3RyZWFtSHRtbENvbGxlY3Rpb24gfSBmcm9tICdAc3JjL3V0aWxzL3N0cmVhbS1odG1sLWNvbGxlY3Rpb24nO1xuaW1wb3J0IHsgY29tcHV0ZWRUaWxlU3RhdGUgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YS10aWxlcyc7XG5pbXBvcnQgeyBnZXRUaWxlU3RhdGUgfSBmcm9tICcuL3RpbGUtc3RhdGUnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBpc01pbmltaXplZCA9IGNvbXB1dGVkVGlsZVN0YXRlKGdldFRpbGVTdGF0ZSh0aWxlKSwgJ21pbmltaXplSGVhZGVyJywgdHJ1ZSk7XG5cbiAgc3Vic2NyaWJlKHN0cmVhbUh0bWxDb2xsZWN0aW9uKHRpbGUuYW5jaG9yLCB0aWxlLmFuY2hvci5jaGlsZHJlbiksIGFzeW5jIGNoaWxkID0+IHtcbiAgICBjb25zdCBoZWFkZXIgPSBhd2FpdCAkKGNoaWxkLCBDLkZvcm1Db21wb25lbnQuY29udGFpbmVyUGFzc2l2ZSk7XG4gICAgc2V0SGVhZGVycyh0aWxlLCBpc01pbmltaXplZC52YWx1ZSk7XG5cbiAgICBjcmVhdGVGcmFnbWVudEFwcChcbiAgICAgIE1pbmltaXplUm93LFxuICAgICAgcmVhY3RpdmUoe1xuICAgICAgICBpc01pbmltaXplZCxcbiAgICAgICAgb25DbGljazogKCkgPT4ge1xuICAgICAgICAgIGlzTWluaW1pemVkLnZhbHVlID0gIWlzTWluaW1pemVkLnZhbHVlO1xuICAgICAgICAgIHNldEhlYWRlcnModGlsZSwgaXNNaW5pbWl6ZWQudmFsdWUpO1xuICAgICAgICB9LFxuICAgICAgfSksXG4gICAgKS5iZWZvcmUoaGVhZGVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIHNldEhlYWRlcnModGlsZTogUHJ1blRpbGUsIGlzTWluaW1pemVkOiBib29sZWFuKSB7XG4gIGZvciAoY29uc3QgaGVhZGVyIG9mIF8kJCh0aWxlLmFuY2hvciwgQy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lclBhc3NpdmUpKSB7XG4gICAgY29uc3QgbGFiZWwgPSBfJChoZWFkZXIsIEMuRm9ybUNvbXBvbmVudC5sYWJlbCk7XG4gICAgaWYgKGxhYmVsPy50ZXh0Q29udGVudCA9PT0gJ01pbmltaXplJykge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGlmIChsYWJlbD8udGV4dENvbnRlbnQgPT09ICdUZXJtaW5hdGlvbiByZXF1ZXN0Jykge1xuICAgICAgY29uc3QgdmFsdWUgPSBfJChoZWFkZXIsIEMuRm9ybUNvbXBvbmVudC5pbnB1dCk7XG4gICAgICBpZiAodmFsdWU/LnRleHRDb250ZW50ICE9PSAnLS0nKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgIH1cbiAgICBoZWFkZXIuc3R5bGUuZGlzcGxheSA9IGlzTWluaW1pemVkID8gJ25vbmUnIDogJ2ZsZXgnO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydDWCcsICdDT05UJywgJ0xNJywgJ1NZU0knXSwgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnTWluaW1pemVzIGhlYWRlcnMgaW4gQ1gsIENPTlQsIExNLCBhbmQgU1lTSS4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUtBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsUUFBQSxjQUFBLGtCQUFBLGFBQUEsSUFBQSxHQUFBLGtCQUFBLElBQUE7QUFFQSxZQUFBLHFCQUFBLEtBQUEsUUFBQSxLQUFBLE9BQUEsUUFBQSxHQUFBLE9BQUEsVUFBQTtBQUNFLFVBQUEsU0FBQSxNQUFBLEVBQUEsT0FBQSxFQUFBLGNBQUEsZ0JBQUE7QUFDQSxlQUFBLE1BQUEsWUFBQSxLQUFBO0FBRUE7QUFBQSxNQUFBO0FBQUEsTUFDRSxTQUFBO0FBQUEsUUFDUztBQUFBLFFBQ1AsU0FBQSxNQUFBO0FBRUUsc0JBQUEsUUFBQSxDQUFBLFlBQUE7QUFDQSxxQkFBQSxNQUFBLFlBQUEsS0FBQTtBQUFBLFFBQWtDO0FBQUEsTUFDcEMsQ0FBQTtBQUFBLElBQ0QsRUFBQSxPQUFBLE1BQUE7QUFBQSxFQUNZLENBQUE7QUFFbkI7QUFFQSxTQUFBLFdBQUEsTUFBQSxhQUFBO0FBQ0UsYUFBQSxVQUFBLElBQUEsS0FBQSxRQUFBLEVBQUEsY0FBQSxnQkFBQSxHQUFBO0FBQ0UsVUFBQSxRQUFBLEdBQUEsUUFBQSxFQUFBLGNBQUEsS0FBQTtBQUNBLFFBQUEsT0FBQSxnQkFBQSxZQUFBO0FBQ0U7QUFBQSxJQUFBO0FBRUYsUUFBQSxPQUFBLGdCQUFBLHVCQUFBO0FBQ0UsWUFBQSxRQUFBLEdBQUEsUUFBQSxFQUFBLGNBQUEsS0FBQTtBQUNBLFVBQUEsT0FBQSxnQkFBQSxNQUFBO0FBQ0U7QUFBQSxNQUFBO0FBQUEsSUFDRjtBQUVGLFdBQUEsTUFBQSxVQUFBLGNBQUEsU0FBQTtBQUFBLEVBQThDO0FBRWxEO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLENBQUEsTUFBQSxRQUFBLE1BQUEsTUFBQSxHQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSw4Q0FBQTsifQ==
