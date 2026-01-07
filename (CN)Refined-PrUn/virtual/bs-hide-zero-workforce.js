import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refPrunId } from './attributes.js';
import { sitesStore } from './sites.js';
import { workforcesStore } from './workforces.js';
import { PrunI18N } from './i18n.js';
import { isEmpty } from './is-empty.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.container), () => {
    subscribe($$(tile.anchor, 'tr'), row => {
      if (isEmpty(_$$(row, 'td'))) {
        return;
      }
      const levelId = refPrunId(row);
      const shouldHideRow = computed(() => {
        const site = sitesStore.getByPlanetNaturalId(tile.parameter);
        const workforce = workforcesStore
          .getById(site?.siteId)
          ?.workforces.find(x => x.level === levelId.value);
        return (
          workforce && workforce.capacity < 1 && workforce.required < 1 && workforce.population < 1
        );
      });
      watchEffectWhileNodeAlive(row, () => (row.style.display = shouldHideRow.value ? 'none' : ''));
    });
  });
}
function init() {
  const localized = PrunI18N['SiteWorkforces.table.currentWorkforce']?.[0];
  if (localized) {
    localized.value = localized.value.replace('Current Workforce', 'Current');
  }
  tiles.observe('BS', onTileReady);
}
features.add(import.meta.url, init, 'BS: Hides workforce rows with zero current workforce.');
