import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { sitesStore } from './sites.js';
import { refPrunId } from './attributes.js';
import { isRepairableBuilding } from './buildings.js';
import ProgressBar from './ProgressBar.vue.js';
import { computed } from './runtime-core.esm-bundler.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  const siteId = tile.parameter;
  const site = computed(() => sitesStore.getById(siteId));
  subscribe($$(tile.anchor, C.SectionList.section), section => {
    const id = refPrunId(section);
    const building = computed(() => site.value?.platforms.find(p => p.id == id.value));
    if (!building.value || !isRepairableBuilding(building.value)) {
      return;
    }
    const rows = _$$(section, 'tr');
    const condition = computed(() => building.value?.condition ?? 0);
    const good = computed(() => condition.value > 0.9);
    const warning = computed(() => !good.value && condition.value > 0.8);
    const danger = computed(() => condition.value <= 0.8);
    createFragmentApp(
      ProgressBar,
      reactive({
        value: condition,
        max: 1,
        good,
        warning,
        danger,
      }),
    ).prependTo(rows[5].children[1]);
  });
}
function init() {
  tiles.observe('BBL', onTileReady);
}
features.add(import.meta.url, init, 'BBL: Adds a progress bar to the building condition row.');
