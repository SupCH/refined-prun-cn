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
