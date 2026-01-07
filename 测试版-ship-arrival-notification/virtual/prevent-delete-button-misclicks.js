import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.Message.controls), async controls => {
    const button = await $(controls, C.Button.btn);
    button.addEventListener('click', e => {
      if (e.shiftKey) {
        return;
      }
      button.setAttribute(
        'data-tooltip',
        'Please hold shift when clicking this button (misclick prevention)',
      );
      button.setAttribute('data-tooltip-position', 'top');
      e.preventDefault();
      e.stopPropagation();
    });
  });
}
function init() {
  tiles.observe(['COMG', 'COMP', 'COMU'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'Makes the "delete" button in chats work only when shift is held down.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJldmVudC1kZWxldGUtYnV0dG9uLW1pc2NsaWNrcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL3ByZXZlbnQtZGVsZXRlLWJ1dHRvbi1taXNjbGlja3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLk1lc3NhZ2UuY29udHJvbHMpLCBhc3luYyBjb250cm9scyA9PiB7XG4gICAgY29uc3QgYnV0dG9uID0gYXdhaXQgJChjb250cm9scywgQy5CdXR0b24uYnRuKTtcbiAgICBidXR0b24uYWRkRXZlbnRMaXN0ZW5lcignY2xpY2snLCBlID0+IHtcbiAgICAgIGlmIChlLnNoaWZ0S2V5KSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cblxuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZShcbiAgICAgICAgJ2RhdGEtdG9vbHRpcCcsXG4gICAgICAgICdQbGVhc2UgaG9sZCBzaGlmdCB3aGVuIGNsaWNraW5nIHRoaXMgYnV0dG9uIChtaXNjbGljayBwcmV2ZW50aW9uKScsXG4gICAgICApO1xuICAgICAgYnV0dG9uLnNldEF0dHJpYnV0ZSgnZGF0YS10b29sdGlwLXBvc2l0aW9uJywgJ3RvcCcpO1xuICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgZS5zdG9wUHJvcGFnYXRpb24oKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydDT01HJywgJ0NPTVAnLCAnQ09NVSddLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnTWFrZXMgdGhlIFwiZGVsZXRlXCIgYnV0dG9uIGluIGNoYXRzIHdvcmsgb25seSB3aGVuIHNoaWZ0IGlzIGhlbGQgZG93bi4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLFFBQUEsUUFBQSxHQUFBLE9BQUEsYUFBQTtBQUNFLFVBQUEsU0FBQSxNQUFBLEVBQUEsVUFBQSxFQUFBLE9BQUEsR0FBQTtBQUNBLFdBQUEsaUJBQUEsU0FBQSxDQUFBLE1BQUE7QUFDRSxVQUFBLEVBQUEsVUFBQTtBQUNFO0FBQUEsTUFBQTtBQUdGLGFBQUE7QUFBQSxRQUFPO0FBQUEsUUFDTDtBQUFBLE1BQ0E7QUFFRixhQUFBLGFBQUEseUJBQUEsS0FBQTtBQUNBLFFBQUEsZUFBQTtBQUNBLFFBQUEsZ0JBQUE7QUFBQSxJQUFrQixDQUFBO0FBQUEsRUFDbkIsQ0FBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLENBQUEsUUFBQSxRQUFBLE1BQUEsR0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
