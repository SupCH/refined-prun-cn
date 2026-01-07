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
  console.log(`(zh-cn)refined-prun ${config.version}`);
  initializeUserData();
  features.init();
  xit.init();
}
void main();
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL21haW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgaW5pdGlhbGl6ZUFwaSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGknO1xuaW1wb3J0IHsgaW5pdGlhbGl6ZVVJIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpJztcbmltcG9ydCB7IGluaXRpYWxpemVVc2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUnO1xuaW1wb3J0IHsgaW5pdEF1ZGlvSW50ZXJjZXB0b3IgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXVkaW8taW50ZXJjZXB0b3InO1xuaW1wb3J0IFBtbWdNaWdyYXRpb25HdWlkZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvUG1tZ01pZ3JhdGlvbkd1aWRlLnZ1ZSc7XG5cbmFzeW5jIGZ1bmN0aW9uIG1haW4oKSB7XG4gIGluaXRBdWRpb0ludGVyY2VwdG9yKCk7XG4gIGF3YWl0IGluaXRpYWxpemVBcGkoKTtcbiAgYXdhaXQgaW5pdGlhbGl6ZVVJKCk7XG5cbiAgaWYgKHdpbmRvd1snUE1NR19DT0xMRUNUT1JfSEFTX1JVTiddKSB7XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoUG1tZ01pZ3JhdGlvbkd1aWRlKS5iZWZvcmUoYXdhaXQgJChkb2N1bWVudCwgQy5BcHAuY29udGFpbmVyKSk7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc29sZS5sb2coYCh6aC1jbilyZWZpbmVkLXBydW4gJHtjb25maWcudmVyc2lvbn1gKTtcbiAgaW5pdGlhbGl6ZVVzZXJEYXRhKCk7XG4gIGZlYXR1cmVzLmluaXQoKTtcbiAgeGl0LmluaXQoKTtcbn1cblxudm9pZCBtYWluKCk7XG4iXSwibmFtZXMiOlsiUG1tZ01pZ3JhdGlvbkd1aWRlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQU1BLGVBQUEsT0FBQTtBQUNFLHVCQUFBO0FBQ0EsUUFBQSxjQUFBO0FBQ0EsUUFBQSxhQUFBO0FBRUEsTUFBQSxPQUFBLHdCQUFBLEdBQUE7QUFDRSxzQkFBQUEsU0FBQSxFQUFBLE9BQUEsTUFBQSxFQUFBLFVBQUEsRUFBQSxJQUFBLFNBQUEsQ0FBQTtBQUNBO0FBQUEsRUFBQTtBQUdGLFVBQUEsSUFBQSx1QkFBQSxPQUFBLE9BQUEsRUFBQTtBQUNBLHFCQUFBO0FBQ0EsV0FBQSxLQUFBO0FBQ0EsTUFBQSxLQUFBO0FBQ0Y7QUFFQSxLQUFBLEtBQUE7In0=
