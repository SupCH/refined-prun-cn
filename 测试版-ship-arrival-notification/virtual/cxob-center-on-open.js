import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ScrollView.view), scroll => {
    subscribe($$(scroll, 'table'), async table => {
      const spread = await $(table, C.ComExOrderBookPanel.spread);
      const spreadRect = spread.getBoundingClientRect();
      scroll.scrollTop = Math.max(
        spread.offsetTop - scroll.clientHeight / 2 + spreadRect.height / 2,
        0,
      );
    });
  });
}
function init() {
  tiles.observe('CXOB', onTileReady);
}
features.add(import.meta.url, init, 'CXOB: Centers the order book on open.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hvYi1jZW50ZXItb24tb3Blbi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4b2ItY2VudGVyLW9uLW9wZW4udHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlNjcm9sbFZpZXcudmlldyksIHNjcm9sbCA9PiB7XG4gICAgc3Vic2NyaWJlKCQkKHNjcm9sbCwgJ3RhYmxlJyksIGFzeW5jIHRhYmxlID0+IHtcbiAgICAgIGNvbnN0IHNwcmVhZCA9IGF3YWl0ICQodGFibGUsIEMuQ29tRXhPcmRlckJvb2tQYW5lbC5zcHJlYWQpO1xuICAgICAgY29uc3Qgc3ByZWFkUmVjdCA9IHNwcmVhZC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgIHNjcm9sbC5zY3JvbGxUb3AgPSBNYXRoLm1heChcbiAgICAgICAgc3ByZWFkLm9mZnNldFRvcCAtIHNjcm9sbC5jbGllbnRIZWlnaHQgLyAyICsgc3ByZWFkUmVjdC5oZWlnaHQgLyAyLFxuICAgICAgICAwLFxuICAgICAgKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0NYT0InLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdDWE9COiBDZW50ZXJzIHRoZSBvcmRlciBib29rIG9uIG9wZW4uJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxXQUFBLElBQUEsR0FBQSxDQUFBLFdBQUE7QUFDRSxjQUFBLEdBQUEsUUFBQSxPQUFBLEdBQUEsT0FBQSxVQUFBO0FBQ0UsWUFBQSxTQUFBLE1BQUEsRUFBQSxPQUFBLEVBQUEsb0JBQUEsTUFBQTtBQUNBLFlBQUEsYUFBQSxPQUFBLHNCQUFBO0FBQ0EsYUFBQSxZQUFBLEtBQUE7QUFBQSxRQUF3QixPQUFBLFlBQUEsT0FBQSxlQUFBLElBQUEsV0FBQSxTQUFBO0FBQUEsUUFDMkM7QUFBQSxNQUNqRTtBQUFBLElBQ0YsQ0FBQTtBQUFBLEVBQ0QsQ0FBQTtBQUVMO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLFFBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLHVDQUFBOyJ9
