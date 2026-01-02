import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { isRepairableBuilding } from './buildings.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const siteId = tile.parameter;
  const site = computed(() => sitesStore.getById(siteId));
  subscribe($$(tile.anchor, C.SectionList.section), section => {
    const id = refPrunId(section);
    const building = computed(() => site.value?.platforms.find(p => p.id == id.value));
    watchEffectWhileNodeAlive(section, () => {
      if (!building.value) {
        return;
      }
      setAttribute(section, 'data-rp-established', building.value.lastRepair === null);
      setAttribute(section, 'data-rp-repaired', building.value.lastRepair !== null);
      setAttribute(section, 'data-rp-infrastructure', !isRepairableBuilding(building.value));
    });
  });
}
function setAttribute(element, attribute, value) {
  if (value) {
    element.setAttribute(attribute, '');
  } else {
    element.removeAttribute(attribute);
  }
}
function init() {
  applyCssRule(
    'BBL',
    `.${C.SectionList.section}[data-rp-established] .${C.SectionList.table} tr:nth-child(2)`,
    css.hidden,
  );
  applyCssRule(
    'BBL',
    `.${C.SectionList.section}[data-rp-repaired] .${C.SectionList.table} tr:nth-child(1)`,
    css.hidden,
  );
  applyCssRule(
    'BBL',
    `.${C.SectionList.section}[data-rp-infrastructure] .${C.SectionList.table} tr:nth-child(3)`,
    css.hidden,
  );
  tiles.observe('BBL', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BBL: Hides "Last repair", "Established", and "Repair costs" rows if they are empty or irrelevant to repairs.',
);
