import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import _sfc_main from './ShipCondition.vue.js';
import { reactive } from './reactivity.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, 'tr'), row => {
    createFragmentApp(
      _sfc_main,
      reactive({
        id: refPrunId(row),
      }),
    ).appendTo(row.children[1]);
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(import.meta.url, init, 'FLT: Adds a ship condition label to the "Name" column.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx0LXNoaXAtY29uZGl0aW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvZmx0LXNoaXAtY29uZGl0aW9uL2ZsdC1zaGlwLWNvbmRpdGlvbi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWZQcnVuSWQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYXR0cmlidXRlcyc7XG5pbXBvcnQgU2hpcENvbmRpdGlvbiBmcm9tICcuL1NoaXBDb25kaXRpb24udnVlJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCAndHInKSwgcm93ID0+IHtcbiAgICBjcmVhdGVGcmFnbWVudEFwcChcbiAgICAgIFNoaXBDb25kaXRpb24sXG4gICAgICByZWFjdGl2ZSh7XG4gICAgICAgIGlkOiByZWZQcnVuSWQocm93KSxcbiAgICAgIH0pLFxuICAgICkuYXBwZW5kVG8ocm93LmNoaWxkcmVuWzFdKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydGTFQnLCAnRkxUUycsICdGTFRQJ10sIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0ZMVDogQWRkcyBhIHNoaXAgY29uZGl0aW9uIGxhYmVsIHRvIHRoZSBcIk5hbWVcIiBjb2x1bW4uJyk7XG4iXSwibmFtZXMiOlsiU2hpcENvbmRpdGlvbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFHQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsSUFBQSxHQUFBLENBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQUE7QUFBQUEsTUFDRSxTQUFBO0FBQUEsUUFDUyxJQUFBLFVBQUEsR0FBQTtBQUFBLE1BQ1UsQ0FBQTtBQUFBLElBQ2xCLEVBQUEsU0FBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQUEsRUFDdUIsQ0FBQTtBQUU5QjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxDQUFBLE9BQUEsUUFBQSxNQUFBLEdBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLHdEQUFBOyJ9
