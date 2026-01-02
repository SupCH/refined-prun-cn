import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './other-context-notification-count.module.css.js';
import { alertsStore } from './alerts.js';
import { companyStore } from './company.js';
import { createReactiveSpan } from './reactive-element.js';
import { computed } from './runtime-core.esm-bundler.js';
function init() {
  const buggyNotificationTypes = /* @__PURE__ */ new Set([
    // https://com.prosperousuniverse.com/t/corporation-invite-notifications-are-being-sent-to-a-wrong-context/7078
    'CORPORATION_MANAGER_INVITE_ACCEPTED',
    'CORPORATION_MANAGER_INVITE_REJECTED',
    // https://discord.com/channels/350171287785701388/535426425495355402/1451941402694127678
    // (in the #behind-the-scenes channel)
    'INFRASTRUCTURE_UPGRADE_COMPLETED',
  ]);
  const countLabel = computed(() => {
    const companyId = companyStore.value?.id;
    const alerts = alertsStore.all.value;
    if (!companyId || !alerts) {
      return void 0;
    }
    let count = 0;
    for (const alert of alerts) {
      if (alert.seen) {
        continue;
      }
      if (alert.contextId !== companyId && !buggyNotificationTypes.has(alert.type)) {
        count++;
      }
    }
    return count > 0 ? ` (${count})` : void 0;
  });
  subscribe($$(document, C.AlertsHeadItem.count), count => {
    const otherCount = createReactiveSpan(count, countLabel);
    otherCount.classList.add($style.count);
    count.after(otherCount);
  });
}
features.add(
  import.meta.url,
  init,
  'Adds a counter for notifications from other contexts in the NOTS header label.',
);
