import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { isRepairableBuilding } from './buildings.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const siteId = tile.parameter;
  const site = computed(() => sitesStore.getById(siteId));
  subscribe($$(tile.anchor, C.SectionList.section), section => {
    const id = refPrunId(section);
    const building = computed(() => site.value?.platforms.find(p => p.id == id.value));
    subscribe($$(tile.anchor, C.SectionList.button), buttons => {
      const repair = buttons.children[0];
      if (repair === void 0) {
        return;
      }
      watchEffectWhileNodeAlive(repair, () => {
        if (!building.value || !isRepairableBuilding(building.value)) {
          return;
        }
        if (building.value.condition > 0.98) {
          repair.classList.add(C.Button.danger);
        } else {
          repair.classList.remove(C.Button.danger);
        }
      });
    });
  });
}
function init() {
  tiles.observe('BBL', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BBL: Applies the "danger" style to the "Repair" button if the building condition is >98%.',
);
