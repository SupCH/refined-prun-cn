import { subscribe } from './subscribe-async-generator.js';
import { _$$, _$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import { workforcesStore } from './workforces.js';
import WorkforceFilterBar from './WorkforceFilterBar.vue.js';
import { computedTileState } from './user-data-tiles.js';
import { getTileState } from './tile-state2.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
const workforceTypes = ['PIONEER', 'SETTLER', 'TECHNICIAN', 'ENGINEER', 'SCIENTIST'];
function onTileReady(tile) {
  const workforces = computed(() => workforcesStore.getById(tile.parameter));
  const filters = computedTileState(getTileState(tile), 'hideWorkforce', []);
  const visibleMaterials = computed(() => {
    if (!workforces.value) {
      return void 0;
    }
    const materials = /* @__PURE__ */ new Set();
    for (const wf of workforces.value.workforces) {
      const filter = filters.value.find(x => x.workforce === wf.level);
      if (filter && !filter.value) {
        continue;
      }
      for (const need of wf.needs) {
        materials.add(need.material.ticker);
      }
    }
    return [...materials];
  });
  subscribe($$(tile.anchor, C.Workforces.table), async table => {
    createFragmentApp(
      WorkforceFilterBar,
      reactive({
        filters,
      }),
    ).before(table);
    watchEffectWhileNodeAlive(table, () => {
      if (!workforces.value) {
        return;
      }
      if (filters.value.length === 0) {
        filters.value = workforceTypes.map(x => ({
          workforce: x,
          value: (workforces.value?.workforces.find(y => y.level === x)?.capacity ?? 0) > 0,
        }));
        if (filters.value.every(x => !x.value)) {
          for (const filter of filters.value) {
            filter.value = true;
          }
        }
      }
      const rows = _$$(table, 'tr');
      for (const row of rows) {
        const isHeader = _$(row, 'th') !== void 0;
        const startingColumn = isHeader ? 5 : 6;
        for (let i = 0; i < workforceTypes.length; i++) {
          const workforceType = workforceTypes[i];
          const column = row.children[startingColumn + i];
          const isVisible = filters.value.find(x => x.workforce === workforceType)?.value ?? true;
          column.classList.toggle(css.hidden, !isVisible);
        }
        const materialLabel = _$(row, C.ColoredIcon.label);
        if (materialLabel) {
          const isHidden = !(visibleMaterials.value?.includes(materialLabel.textContent) ?? true);
          row.classList.toggle(css.hidden, isHidden);
        }
      }
    });
  });
}
function init() {
  tiles.observe('WF', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'WF: Adds filters to hide zero workforce types and consumables.',
);
