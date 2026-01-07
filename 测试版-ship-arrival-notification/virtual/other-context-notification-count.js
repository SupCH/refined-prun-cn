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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoib3RoZXItY29udGV4dC1ub3RpZmljYXRpb24tY291bnQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9vdGhlci1jb250ZXh0LW5vdGlmaWNhdGlvbi1jb3VudC50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL290aGVyLWNvbnRleHQtbm90aWZpY2F0aW9uLWNvdW50Lm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgYWxlcnRzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWxlcnRzJztcbmltcG9ydCB7IGNvbXBhbnlTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jb21wYW55JztcbmltcG9ydCB7IGNyZWF0ZVJlYWN0aXZlU3BhbiB9IGZyb20gJ0BzcmMvdXRpbHMvcmVhY3RpdmUtZWxlbWVudCc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIC8vIFRoZXJlIGlzIGEgYnVnIGluIHRoZSBiYXNlIGdhbWUgd2hlcmUgc29tZSBub3RpZmljYXRpb25zXG4gIC8vIGFyZSBiZWluZyBzZW50IHRvIHRoZSB3cm9uZyBjb250ZXh0LiBXZSBuZWVkIHRvIGlnbm9yZSB0aGVtLlxuICBjb25zdCBidWdneU5vdGlmaWNhdGlvblR5cGVzID0gbmV3IFNldChbXG4gICAgLy8gaHR0cHM6Ly9jb20ucHJvc3Blcm91c3VuaXZlcnNlLmNvbS90L2NvcnBvcmF0aW9uLWludml0ZS1ub3RpZmljYXRpb25zLWFyZS1iZWluZy1zZW50LXRvLWEtd3JvbmctY29udGV4dC83MDc4XG4gICAgJ0NPUlBPUkFUSU9OX01BTkFHRVJfSU5WSVRFX0FDQ0VQVEVEJyxcbiAgICAnQ09SUE9SQVRJT05fTUFOQUdFUl9JTlZJVEVfUkVKRUNURUQnLFxuXG4gICAgLy8gaHR0cHM6Ly9kaXNjb3JkLmNvbS9jaGFubmVscy8zNTAxNzEyODc3ODU3MDEzODgvNTM1NDI2NDI1NDk1MzU1NDAyLzE0NTE5NDE0MDI2OTQxMjc2NzhcbiAgICAvLyAoaW4gdGhlICNiZWhpbmQtdGhlLXNjZW5lcyBjaGFubmVsKVxuICAgICdJTkZSQVNUUlVDVFVSRV9VUEdSQURFX0NPTVBMRVRFRCcsXG4gIF0pO1xuICBjb25zdCBjb3VudExhYmVsID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IGNvbXBhbnlJZCA9IGNvbXBhbnlTdG9yZS52YWx1ZT8uaWQ7XG4gICAgY29uc3QgYWxlcnRzID0gYWxlcnRzU3RvcmUuYWxsLnZhbHVlO1xuICAgIGlmICghY29tcGFueUlkIHx8ICFhbGVydHMpIHtcbiAgICAgIHJldHVybiB1bmRlZmluZWQ7XG4gICAgfVxuICAgIGxldCBjb3VudCA9IDA7XG4gICAgZm9yIChjb25zdCBhbGVydCBvZiBhbGVydHMpIHtcbiAgICAgIGlmIChhbGVydC5zZWVuKSB7XG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuICAgICAgaWYgKGFsZXJ0LmNvbnRleHRJZCAhPT0gY29tcGFueUlkICYmICFidWdneU5vdGlmaWNhdGlvblR5cGVzLmhhcyhhbGVydC50eXBlKSkge1xuICAgICAgICBjb3VudCsrO1xuICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gY291bnQgPiAwID8gYCAoJHtjb3VudH0pYCA6IHVuZGVmaW5lZDtcbiAgfSk7XG4gIHN1YnNjcmliZSgkJChkb2N1bWVudCwgQy5BbGVydHNIZWFkSXRlbS5jb3VudCksIGNvdW50ID0+IHtcbiAgICBjb25zdCBvdGhlckNvdW50ID0gY3JlYXRlUmVhY3RpdmVTcGFuKGNvdW50LCBjb3VudExhYmVsKTtcbiAgICBvdGhlckNvdW50LmNsYXNzTGlzdC5hZGQoJHN0eWxlLmNvdW50KTtcbiAgICBjb3VudC5hZnRlcihvdGhlckNvdW50KTtcbiAgfSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnQWRkcyBhIGNvdW50ZXIgZm9yIG5vdGlmaWNhdGlvbnMgZnJvbSBvdGhlciBjb250ZXh0cyBpbiB0aGUgTk9UUyBoZWFkZXIgbGFiZWwuJyxcbik7XG4iXSwibmFtZXMiOlsiY291bnQiLCJzdWJzY3JpYmUiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBS0EsU0FBQSxPQUFBO0FBR0UsUUFBQSx5QkFBQSxvQkFBQSxJQUFBO0FBQUE7QUFBQSxJQUVFO0FBQUEsSUFBQTtBQUFBO0FBQUE7QUFBQSxJQUtBO0FBQUEsRUFBQSxDQUFBO0FBRUYsUUFBQSxhQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsWUFBQSxhQUFBLE9BQUE7QUFDQSxVQUFBLFNBQUEsWUFBQSxJQUFBO0FBQ0EsUUFBQSxDQUFBLGFBQUEsQ0FBQSxRQUFBO0FBQ0UsYUFBQTtBQUFBLElBQ0Y7O0FBRUEsZUFBQSxTQUFBLFFBQUE7O0FBRUk7QUFBQSxNQUNGO0FBQ0EsVUFBQSxNQUFBLGNBQUEsYUFBQSxDQUFBLHVCQUFBLElBQUEsTUFBQSxJQUFBLEdBQUE7QUFDRUE7QUFBQUEsTUFDRjtBQUFBLElBQ0Y7O0VBRUYsQ0FBQTtBQUNBQyxZQUFBQSxHQUFBQSxVQUFBQSxFQUFBQSxlQUFBQSxLQUFBQSxHQUFBQSxXQUFBQTtBQUNFLFVBQUEsYUFBQSxtQkFBQSxPQUFBLFVBQUE7O0FBRUFELFVBQUFBLE1BQUFBLFVBQUFBO0FBQUFBLEVBQ0YsQ0FBQTtBQUNGO0FBRUFFLFNBQUFBLElBQUFBLFlBQUFBLEtBQUFBLE1BQUFBLGdGQUFBQTsifQ==
