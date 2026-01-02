import { $ } from './select-dom.js';
import features from './feature-registry.js';
import { screensStore } from './screens.js';
import { alertsStore } from './alerts.js';
import { refTextContent } from './reactive-dom.js';
import { computed, watchEffect } from './runtime-core.esm-bundler.js';
async function init() {
  const title = await $(document, 'title');
  const titleText = refTextContent(title);
  const newTitleText = computed(() => {
    const screenName = screensStore.current.value?.name;
    const notificationCount = alertsStore.all.value?.filter(x => !x.seen).length ?? 0;
    let title2 = 'Prosperous Universe';
    if (screenName !== void 0) {
      title2 = `${screenName} - ${title2}`;
    }
    if (notificationCount > 0) {
      title2 = `(${notificationCount}) ${title2}`;
    }
    return title2;
  });
  watchEffect(() => {
    if (titleText.value !== newTitleText.value) {
      title.textContent = newTitleText.value;
    }
  });
}
features.add(import.meta.url, init, 'Renames browser tab based on the current screen');
