import { createFragmentApp } from './vue-fragment-app.js';
import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import config from './config.js';
import features from './feature-registry.js';
import xit from './xit-registry.js';
import { initializeApi } from './index2.js';
import { initializeUI } from './index3.js';
import { initializeUserData } from './index4.js';
import { initAudioInterceptor } from './audio-interceptor.js';
import _sfc_main from './PmmgMigrationGuide.vue.js';
async function main() {
  initAudioInterceptor();
  await initializeApi();
  await initializeUI();
  if (window['PMMG_COLLECTOR_HAS_RUN']) {
    createFragmentApp(_sfc_main).before(await $(document, C.App.container));
    return;
  }
  console.log(`Refined PrUn ${config.version}`);
  initializeUserData();
  features.init();
  xit.init();
}
void main();
