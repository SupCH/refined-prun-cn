import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import $style from './cxob-supply-demand-values.module.css.js';
import SupplyDemandValues from './SupplyDemandValues.vue.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExOrderBookPanel.spread), async spread => {
    createFragmentApp(SupplyDemandValues, { ticker: tile.parameter }).prependTo(spread);
  });
}
function init() {
  applyCssRule(`.${C.ComExOrderBookPanel.spread}`, $style.spread);
  tiles.observe('CXOB', onTileReady);
}
features.add(import.meta.url, init, 'CXOB: Adds supply and demand value labels.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hvYi1zdXBwbHktZGVtYW5kLXZhbHVlcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4b2Itc3VwcGx5LWRlbWFuZC12YWx1ZXMvY3hvYi1zdXBwbHktZGVtYW5kLXZhbHVlcy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgJHN0eWxlIGZyb20gJy4vY3hvYi1zdXBwbHktZGVtYW5kLXZhbHVlcy5tb2R1bGUuY3NzJztcbmltcG9ydCBTdXBwbHlEZW1hbmRWYWx1ZXMgZnJvbSAnLi9TdXBwbHlEZW1hbmRWYWx1ZXMudnVlJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNvbUV4T3JkZXJCb29rUGFuZWwuc3ByZWFkKSwgYXN5bmMgc3ByZWFkID0+IHtcbiAgICBjcmVhdGVGcmFnbWVudEFwcChTdXBwbHlEZW1hbmRWYWx1ZXMsIHsgdGlja2VyOiB0aWxlLnBhcmFtZXRlciB9KS5wcmVwZW5kVG8oc3ByZWFkKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5Db21FeE9yZGVyQm9va1BhbmVsLnNwcmVhZH1gLCAkc3R5bGUuc3ByZWFkKTtcbiAgdGlsZXMub2JzZXJ2ZSgnQ1hPQicsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0NYT0I6IEFkZHMgc3VwcGx5IGFuZCBkZW1hbmQgdmFsdWUgbGFiZWxzLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUdBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLG9CQUFBLE1BQUEsR0FBQSxPQUFBLFdBQUE7QUFDRSxzQkFBQSxvQkFBQSxFQUFBLFFBQUEsS0FBQSxXQUFBLEVBQUEsVUFBQSxNQUFBO0FBQUEsRUFBa0YsQ0FBQTtBQUV0RjtBQUVBLFNBQUEsT0FBQTtBQUNFLGVBQUEsSUFBQSxFQUFBLG9CQUFBLE1BQUEsSUFBQSxPQUFBLE1BQUE7QUFDQSxRQUFBLFFBQUEsUUFBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsNENBQUE7In0=
