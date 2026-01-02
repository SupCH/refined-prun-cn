import { loadPrunCss } from './prun-css.js';
import { loadRefinedPrunCss } from './refined-prun-css.js';
import { loadPrunI18N } from './i18n.js';
import { trackItemTickers } from './item-tracker.js';
import { initTileDataExport } from './tile-data-export.js';
async function initializeUI() {
  await loadPrunCss();
  loadPrunI18N();
  loadRefinedPrunCss();
  trackItemTickers();
  initTileDataExport();
}
export { initializeUI };
