import { subscribe } from './subscribe-async-generator.js';
import { $, _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'input'), async input => {
    if (input.type !== 'text') {
      return;
    }
    const transfer = await $(tile.anchor, C.Button.btn);
    input.addEventListener('keydown', async e => {
      if (e.key !== 'Enter') {
        return;
      }
      transfer.click();
      if (tile.docked) {
        return;
      }
      await Promise.any([
        $(tile.frame, C.ActionFeedback.success),
        $(tile.frame, C.ActionFeedback.error),
      ]);
      await $(tile.frame, C.ActionFeedback.success);
      const window = tile.frame.closest(`.${C.Window.window}`);
      const close = _$$(window, C.Window.button).at(-1);
      close?.click();
    });
  });
}
function init() {
  tiles.observe('MTRA', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'MTRA: Triggers transfer on Enter and closes the buffer on success.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXRyYS10cmFuc2Zlci1vbi1lbnRlci5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL210cmEtdHJhbnNmZXItb24tZW50ZXIudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAnaW5wdXQnKSwgYXN5bmMgaW5wdXQgPT4ge1xuICAgIGlmIChpbnB1dC50eXBlICE9PSAndGV4dCcpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHJhbnNmZXIgPSAoYXdhaXQgJCh0aWxlLmFuY2hvciwgQy5CdXR0b24uYnRuKSkgYXMgSFRNTEJ1dHRvbkVsZW1lbnQ7XG4gICAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcigna2V5ZG93bicsIGFzeW5jIGUgPT4ge1xuICAgICAgaWYgKGUua2V5ICE9PSAnRW50ZXInKSB7XG4gICAgICAgIHJldHVybjtcbiAgICAgIH1cbiAgICAgIHRyYW5zZmVyLmNsaWNrKCk7XG4gICAgICBpZiAodGlsZS5kb2NrZWQpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgYXdhaXQgUHJvbWlzZS5hbnkoW1xuICAgICAgICAkKHRpbGUuZnJhbWUsIEMuQWN0aW9uRmVlZGJhY2suc3VjY2VzcyksXG4gICAgICAgICQodGlsZS5mcmFtZSwgQy5BY3Rpb25GZWVkYmFjay5lcnJvciksXG4gICAgICBdKTtcbiAgICAgIGF3YWl0ICQodGlsZS5mcmFtZSwgQy5BY3Rpb25GZWVkYmFjay5zdWNjZXNzKTtcbiAgICAgIGNvbnN0IHdpbmRvdyA9IHRpbGUuZnJhbWUuY2xvc2VzdChgLiR7Qy5XaW5kb3cud2luZG93fWApIGFzIEhUTUxFbGVtZW50O1xuICAgICAgY29uc3QgY2xvc2UgPSBfJCQod2luZG93LCBDLldpbmRvdy5idXR0b24pLmF0KC0xKTtcbiAgICAgIGNsb3NlPy5jbGljaygpO1xuICAgIH0pO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnTVRSQScsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdNVFJBOiBUcmlnZ2VycyB0cmFuc2ZlciBvbiBFbnRlciBhbmQgY2xvc2VzIHRoZSBidWZmZXIgb24gc3VjY2Vzcy4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxPQUFBLEdBQUEsT0FBQSxVQUFBO0FBQ0UsUUFBQSxNQUFBLFNBQUEsUUFBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFVBQUEsV0FBQSxNQUFBLEVBQUEsS0FBQSxRQUFBLEVBQUEsT0FBQSxHQUFBO0FBQ0EsVUFBQSxpQkFBQSxXQUFBLE9BQUEsTUFBQTtBQUNFLFVBQUEsRUFBQSxRQUFBLFNBQUE7QUFDRTtBQUFBLE1BQUE7QUFFRixlQUFBLE1BQUE7QUFDQSxVQUFBLEtBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLFlBQUEsUUFBQSxJQUFBO0FBQUEsUUFBa0IsRUFBQSxLQUFBLE9BQUEsRUFBQSxlQUFBLE9BQUE7QUFBQSxRQUNzQixFQUFBLEtBQUEsT0FBQSxFQUFBLGVBQUEsS0FBQTtBQUFBLE1BQ0YsQ0FBQTtBQUV0QyxZQUFBLEVBQUEsS0FBQSxPQUFBLEVBQUEsZUFBQSxPQUFBO0FBQ0EsWUFBQSxTQUFBLEtBQUEsTUFBQSxRQUFBLElBQUEsRUFBQSxPQUFBLE1BQUEsRUFBQTtBQUNBLFlBQUEsUUFBQSxJQUFBLFFBQUEsRUFBQSxPQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxhQUFBLE1BQUE7QUFBQSxJQUFhLENBQUE7QUFBQSxFQUNkLENBQUE7QUFFTDtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
