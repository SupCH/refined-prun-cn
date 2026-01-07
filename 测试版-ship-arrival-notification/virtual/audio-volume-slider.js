import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import { setAudioVolume } from './audio-interceptor.js';
import { userData } from './user-data.js';
import { createFragmentApp } from './vue-fragment-app.js';
import AudioVolume from './AudioVolume.vue.js';
import { watchEffect, createVNode } from './runtime-core.esm-bundler.js';
function init() {
  watchEffect(() => {
    setAudioVolume(userData.settings.audioVolume);
  });
  subscribe($$(document, C.MenuHeadItem.menu), async menu => {
    const audioToggle = await $(menu, C.RadioItem.container);
    createFragmentApp(() => createVNode(AudioVolume, null, null)).after(audioToggle);
  });
}
features.add(
  import.meta.url,
  init,
  'Adds a volume slider to the game settings in the top-right corner of the screen.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYXVkaW8tdm9sdW1lLXNsaWRlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2F1ZGlvLXZvbHVtZS1zbGlkZXIvYXVkaW8tdm9sdW1lLXNsaWRlci50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgc2V0QXVkaW9Wb2x1bWUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXVkaW8taW50ZXJjZXB0b3InO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBjcmVhdGVGcmFnbWVudEFwcCB9IGZyb20gJ0BzcmMvdXRpbHMvdnVlLWZyYWdtZW50LWFwcCc7XG5pbXBvcnQgQXVkaW9Wb2x1bWUgZnJvbSAnQHNyYy9mZWF0dXJlcy9iYXNpYy9hdWRpby12b2x1bWUtc2xpZGVyL0F1ZGlvVm9sdW1lLnZ1ZSc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHdhdGNoRWZmZWN0KCgpID0+IHtcbiAgICBzZXRBdWRpb1ZvbHVtZSh1c2VyRGF0YS5zZXR0aW5ncy5hdWRpb1ZvbHVtZSk7XG4gIH0pO1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsIEMuTWVudUhlYWRJdGVtLm1lbnUpLCBhc3luYyBtZW51ID0+IHtcbiAgICBjb25zdCBhdWRpb1RvZ2dsZSA9IGF3YWl0ICQobWVudSwgQy5SYWRpb0l0ZW0uY29udGFpbmVyKTtcbiAgICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiA8QXVkaW9Wb2x1bWUgLz4pLmFmdGVyKGF1ZGlvVG9nZ2xlKTtcbiAgfSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnQWRkcyBhIHZvbHVtZSBzbGlkZXIgdG8gdGhlIGdhbWUgc2V0dGluZ3MgaW4gdGhlIHRvcC1yaWdodCBjb3JuZXIgb2YgdGhlIHNjcmVlbi4nLFxuKTtcbiJdLCJuYW1lcyI6WyJ3YXRjaEVmZmVjdCIsInNldEF1ZGlvVm9sdW1lIiwic3Vic2NyaWJlIiwiZmVhdHVyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUtBLFNBQUEsT0FBQTtBQUNFQSxjQUFBQSxNQUFBQTtBQUNFQyxtQkFBQUEsU0FBQUEsU0FBQUEsV0FBQUE7QUFBQUEsRUFDRixDQUFBO0FBQ0FDLFlBQUFBLEdBQUFBLFVBQUFBLEVBQUFBLGFBQUFBLElBQUFBLEdBQUFBLE9BQUFBLFNBQUFBO0FBQ0UsVUFBQSxjQUFBLE1BQUEsRUFBQSxNQUFBLEVBQUEsVUFBQSxTQUFBOztFQUVGLENBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxrRkFBQUE7In0=
