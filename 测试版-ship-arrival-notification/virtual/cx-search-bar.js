import { subscribe } from './subscribe-async-generator.js';
import { $$, $, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { getMaterialName } from './i18n.js';
import $style from './cx-search-bar.module.css.js';
import { materialsStore } from './materials.js';
import css from './css-utils.module.css.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import _sfc_main from './TextInput.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import fa from './font-awesome.module.css.js';
import { refValue } from './reactive-dom.js';
import { ref, triggerRef } from './reactivity.esm-bundler.js';
import { watch, createVNode, createTextVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExPanel.input), onComExPanelReady);
}
async function onComExPanelReady(comExPanel) {
  const actionBar = await $(comExPanel, C.ActionBar.container);
  const select = await $(actionBar, 'select');
  const selectValue = refValue(select);
  const searchText = ref('');
  const categoryOptions = /* @__PURE__ */ new Map();
  for (const option of Array.from(select.options)) {
    categoryOptions.set(option.value, option);
  }
  const materialRows = /* @__PURE__ */ new Map();
  async function loadMaterialRows() {
    const tbody = await $(comExPanel, 'tbody');
    for (const row of _$$(tbody, 'tr')) {
      const labelText = await $(row, C.ColoredIcon.label);
      materialRows.set(labelText.innerText, row);
    }
    triggerRef(searchText);
  }
  subscribe($$(comExPanel, 'tbody'), loadMaterialRows);
  watch(selectValue, loadMaterialRows);
  const resetMatches = value => {
    if (value.isConnected) {
      value.classList.toggle(css.hidden, searchText.value.length !== 0);
    }
  };
  watchEffectWhileNodeAlive(comExPanel, () => {
    const searchTerm = searchText.value.toUpperCase();
    categoryOptions.forEach(resetMatches);
    materialRows.forEach(resetMatches);
    const materials = materialsStore.all.value;
    if (searchTerm.length === 0 || !materials) {
      return;
    }
    for (const material of materials) {
      if (
        material.ticker.includes(searchTerm) ||
        getMaterialName(material)?.toUpperCase().includes(searchTerm)
      ) {
        const optionElement = categoryOptions.get(material.category);
        if (optionElement) {
          optionElement.classList.remove(css.hidden);
        }
        const rowElement = materialRows.get(material.ticker);
        if (rowElement?.isConnected) {
          rowElement.classList.remove(css.hidden);
        }
      }
    }
  });
  createFragmentApp(() =>
    createVNode(
      'div',
      {
        class: [C.ActionBar.element, $style.container],
      },
      [
        createTextVNode('Search: '),
        createVNode(
          _sfc_main,
          {
            modelValue: searchText.value,
            'onUpdate:modelValue': $event => (searchText.value = $event),
          },
          null,
        ),
        createVNode(
          _sfc_main$1,
          {
            dark: true,
            class: [$style.button, fa.solid],
            onClick: () => (searchText.value = ''),
          },
          {
            default: () => [''],
          },
        ),
      ],
    ),
  ).prependTo(actionBar);
}
function init() {
  tiles.observe('CX', onTileReady);
}
features.add(import.meta.url, init, 'CX: Adds a search bar for materials.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3gtc2VhcmNoLWJhci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4LXNlYXJjaC1iYXIudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGdldE1hdGVyaWFsTmFtZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9pMThuJztcbmltcG9ydCAkc3R5bGUgZnJvbSAnLi9jeC1zZWFyY2gtYmFyLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcbmltcG9ydCBjc3MgZnJvbSAnQHNyYy91dGlscy9jc3MtdXRpbHMubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlIH0gZnJvbSAnQHNyYy91dGlscy93YXRjaCc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgZmEgZnJvbSAnQHNyYy91dGlscy9mb250LWF3ZXNvbWUubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyByZWZWYWx1ZSB9IGZyb20gJ0BzcmMvdXRpbHMvcmVhY3RpdmUtZG9tJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNvbUV4UGFuZWwuaW5wdXQpLCBvbkNvbUV4UGFuZWxSZWFkeSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIG9uQ29tRXhQYW5lbFJlYWR5KGNvbUV4UGFuZWw6IEhUTUxFbGVtZW50KSB7XG4gIGNvbnN0IGFjdGlvbkJhciA9IGF3YWl0ICQoY29tRXhQYW5lbCwgQy5BY3Rpb25CYXIuY29udGFpbmVyKTtcbiAgY29uc3Qgc2VsZWN0ID0gYXdhaXQgJChhY3Rpb25CYXIsICdzZWxlY3QnKTtcbiAgY29uc3Qgc2VsZWN0VmFsdWUgPSByZWZWYWx1ZShzZWxlY3QpO1xuICBjb25zdCBzZWFyY2hUZXh0ID0gcmVmKCcnKTtcblxuICBjb25zdCBjYXRlZ29yeU9wdGlvbnMgPSBuZXcgTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+KCk7XG4gIGZvciAoY29uc3Qgb3B0aW9uIG9mIEFycmF5LmZyb20oc2VsZWN0Lm9wdGlvbnMpKSB7XG4gICAgY2F0ZWdvcnlPcHRpb25zLnNldChvcHRpb24udmFsdWUsIG9wdGlvbik7XG4gIH1cblxuICBjb25zdCBtYXRlcmlhbFJvd3MgPSBuZXcgTWFwPHN0cmluZywgSFRNTEVsZW1lbnQ+KCk7XG5cbiAgYXN5bmMgZnVuY3Rpb24gbG9hZE1hdGVyaWFsUm93cygpIHtcbiAgICBjb25zdCB0Ym9keSA9IGF3YWl0ICQoY29tRXhQYW5lbCwgJ3Rib2R5Jyk7XG4gICAgZm9yIChjb25zdCByb3cgb2YgXyQkKHRib2R5LCAndHInKSkge1xuICAgICAgY29uc3QgbGFiZWxUZXh0ID0gYXdhaXQgJChyb3csIEMuQ29sb3JlZEljb24ubGFiZWwpO1xuICAgICAgbWF0ZXJpYWxSb3dzLnNldChsYWJlbFRleHQuaW5uZXJUZXh0LCByb3cpO1xuICAgIH1cbiAgICB0cmlnZ2VyUmVmKHNlYXJjaFRleHQpO1xuICB9XG5cbiAgLy8gSWYgQ1ggbG9hZHMgYSBjYXRlZ29yeSBpdCBoYXNuJ3QgZmV0Y2hlZCBmcm9tIHRoZSBzZXJ2ZXIgeWV0LCBhIG5ldyB0Ym9keSB3aWxsIGJlIGdlbmVyYXRlZC5cbiAgc3Vic2NyaWJlKCQkKGNvbUV4UGFuZWwsICd0Ym9keScpLCBsb2FkTWF0ZXJpYWxSb3dzKTtcblxuICAvLyBJZiBDWCBsb2FkcyBhIGNhdGVnb3J5IGl0J3MgYWxyZWFkeSBzZWVuLCBpdCBsb2FkcyB0aGUgZGF0YSBmcm9tIG1lbW9yeSBhbmQgb25seSB0cidzIHdpbGwgYmUgY2hhbmdlZC5cbiAgd2F0Y2goc2VsZWN0VmFsdWUsIGxvYWRNYXRlcmlhbFJvd3MpO1xuXG4gIGNvbnN0IHJlc2V0TWF0Y2hlcyA9ICh2YWx1ZTogSFRNTEVsZW1lbnQpID0+IHtcbiAgICBpZiAodmFsdWUuaXNDb25uZWN0ZWQpIHtcbiAgICAgIHZhbHVlLmNsYXNzTGlzdC50b2dnbGUoY3NzLmhpZGRlbiwgc2VhcmNoVGV4dC52YWx1ZS5sZW5ndGggIT09IDApO1xuICAgIH1cbiAgfTtcblxuICAvLyBNYWluIHNlYXJjaCBsb29wLlxuICB3YXRjaEVmZmVjdFdoaWxlTm9kZUFsaXZlKGNvbUV4UGFuZWwsICgpID0+IHtcbiAgICBjb25zdCBzZWFyY2hUZXJtID0gc2VhcmNoVGV4dC52YWx1ZS50b1VwcGVyQ2FzZSgpO1xuXG4gICAgY2F0ZWdvcnlPcHRpb25zLmZvckVhY2gocmVzZXRNYXRjaGVzKTtcbiAgICBtYXRlcmlhbFJvd3MuZm9yRWFjaChyZXNldE1hdGNoZXMpO1xuXG4gICAgY29uc3QgbWF0ZXJpYWxzID0gbWF0ZXJpYWxzU3RvcmUuYWxsLnZhbHVlO1xuICAgIGlmIChzZWFyY2hUZXJtLmxlbmd0aCA9PT0gMCB8fCAhbWF0ZXJpYWxzKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGZvciAoY29uc3QgbWF0ZXJpYWwgb2YgbWF0ZXJpYWxzKSB7XG4gICAgICBpZiAoXG4gICAgICAgIG1hdGVyaWFsLnRpY2tlci5pbmNsdWRlcyhzZWFyY2hUZXJtKSB8fFxuICAgICAgICBnZXRNYXRlcmlhbE5hbWUobWF0ZXJpYWwpPy50b1VwcGVyQ2FzZSgpLmluY2x1ZGVzKHNlYXJjaFRlcm0pXG4gICAgICApIHtcbiAgICAgICAgY29uc3Qgb3B0aW9uRWxlbWVudCA9IGNhdGVnb3J5T3B0aW9ucy5nZXQobWF0ZXJpYWwuY2F0ZWdvcnkpO1xuICAgICAgICBpZiAob3B0aW9uRWxlbWVudCkge1xuICAgICAgICAgIG9wdGlvbkVsZW1lbnQuY2xhc3NMaXN0LnJlbW92ZShjc3MuaGlkZGVuKTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCByb3dFbGVtZW50ID0gbWF0ZXJpYWxSb3dzLmdldChtYXRlcmlhbC50aWNrZXIpO1xuICAgICAgICBpZiAocm93RWxlbWVudD8uaXNDb25uZWN0ZWQpIHtcbiAgICAgICAgICByb3dFbGVtZW50LmNsYXNzTGlzdC5yZW1vdmUoY3NzLmhpZGRlbik7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xuXG4gIGNyZWF0ZUZyYWdtZW50QXBwKCgpID0+IChcbiAgICA8ZGl2IGNsYXNzPXtbQy5BY3Rpb25CYXIuZWxlbWVudCwgJHN0eWxlLmNvbnRhaW5lcl19PlxuICAgICAgU2VhcmNoOiZuYnNwO1xuICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPXtzZWFyY2hUZXh0LnZhbHVlfSAvPlxuICAgICAgPFBydW5CdXR0b24gZGFyayBjbGFzcz17WyRzdHlsZS5idXR0b24sIGZhLnNvbGlkXX0gb25DbGljaz17KCkgPT4gKHNlYXJjaFRleHQudmFsdWUgPSAnJyl9PlxuICAgICAgICB7J1xcdWYwMGQnfVxuICAgICAgPC9QcnVuQnV0dG9uPlxuICAgIDwvZGl2PlxuICApKS5wcmVwZW5kVG8oYWN0aW9uQmFyKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQ1gnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdDWDogQWRkcyBhIHNlYXJjaCBiYXIgZm9yIG1hdGVyaWFscy4nKTtcbiJdLCJuYW1lcyI6WyJzdWJzY3JpYmUiLCJ3YXRjaCIsInZhbHVlIiwiY2F0ZWdvcnlPcHRpb25zIiwibWF0ZXJpYWxSb3dzIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIlRleHRJbnB1dCIsInRpbGVzIiwiZmVhdHVyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBVUEsU0FBQSxZQUFBLE1BQUE7QUFDRUEsWUFBQUEsR0FBQUEsS0FBQUEsUUFBQUEsRUFBQUEsV0FBQUEsS0FBQUEsR0FBQUEsaUJBQUFBO0FBQ0Y7QUFFQSxlQUFBLGtCQUFBLFlBQUE7QUFDRSxRQUFBLFlBQUEsTUFBQSxFQUFBLFlBQUEsRUFBQSxVQUFBLFNBQUE7O0FBRUEsUUFBQSxjQUFBLFNBQUEsTUFBQTtBQUNBLFFBQUEsYUFBQSxJQUFBLEVBQUE7QUFFQSxRQUFBLGtCQUFBLG9CQUFBLElBQUE7OztFQUdBO0FBRUEsUUFBQSxlQUFBLG9CQUFBLElBQUE7Ozs7QUFLSSxZQUFBLFlBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxZQUFBLEtBQUE7O0lBRUY7O0VBRUY7O0FBTUFDLFFBQUFBLGFBQUFBLGdCQUFBQTs7O0FBSUlDLFlBQUFBLFVBQUFBLE9BQUFBLElBQUFBLFFBQUFBLFdBQUFBLE1BQUFBLFdBQUFBLENBQUFBO0FBQUFBLElBQ0Y7QUFBQTs7O0FBT0FDLG9CQUFBQSxRQUFBQSxZQUFBQTtBQUNBQyxpQkFBQUEsUUFBQUEsWUFBQUE7QUFFQSxVQUFBLFlBQUEsZUFBQSxJQUFBOztBQUVFO0FBQUEsSUFDRjtBQUNBLGVBQUEsWUFBQSxXQUFBOzs7QUFNSSxZQUFBLGVBQUE7O1FBRUE7Ozs7UUFJQTtBQUFBLE1BQ0Y7QUFBQSxJQUNGO0FBQUEsRUFDRixDQUFBOzs7RUFHcUQsR0FBQSxDQUFBQyxnQkFBQSxVQUFBLEdBQUFDLFlBQUFDLFdBQUE7QUFBQTtJQUViLHVCQUFBLFlBQUEsV0FBQSxRQUFBO0FBQUE7SUFBQSxRQUFBO0FBQUE7SUFDYSxXQUFBLE1BQUEsV0FBQSxRQUFBO0FBQUEsRUFBd0MsR0FBQTtBQUFBO0VBQzlFLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxVQUFBLFNBQUE7QUFJakI7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsUUFBQUEsTUFBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxzQ0FBQUE7In0=
