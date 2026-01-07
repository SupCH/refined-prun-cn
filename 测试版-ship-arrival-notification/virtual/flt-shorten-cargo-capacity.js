import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ShipStore.store), div => {
    const label = div.children[2];
    if (label !== void 0) {
      label.textContent = (label.textContent || '')
        .replace(/(t|m³)/g, '')
        .replace(/(\d+)([,.]?000)/g, (_, x) => `${x}k`);
    }
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(
  import.meta.url,
  init,
  'FLT: Removes "t" and "m³" and converts cargo capacity label to k-notation.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx0LXNob3J0ZW4tY2FyZ28tY2FwYWNpdHkuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9mbHQtc2hvcnRlbi1jYXJnby1jYXBhY2l0eS50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2hpcFN0b3JlLnN0b3JlKSwgZGl2ID0+IHtcbiAgICAvLyBkaXYgLT4gZGl2XG4gICAgY29uc3QgbGFiZWwgPSBkaXYuY2hpbGRyZW5bMl07XG4gICAgaWYgKGxhYmVsICE9PSB1bmRlZmluZWQpIHtcbiAgICAgIGxhYmVsLnRleHRDb250ZW50ID0gKGxhYmVsLnRleHRDb250ZW50IHx8ICcnKVxuICAgICAgICAucmVwbGFjZSgvKHR8bcKzKS9nLCAnJylcbiAgICAgICAgLnJlcGxhY2UoLyhcXGQrKShbLC5dPzAwMCkvZywgKF8sIHgpID0+IGAke3h9a2ApO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydGTFQnLCAnRkxUUycsICdGTFRQJ10sIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdGTFQ6IFJlbW92ZXMgXCJ0XCIgYW5kIFwibcKzXCIgYW5kIGNvbnZlcnRzIGNhcmdvIGNhcGFjaXR5IGxhYmVsIHRvIGstbm90YXRpb24uJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxVQUFBLEtBQUEsR0FBQSxDQUFBLFFBQUE7QUFFRSxVQUFBLFFBQUEsSUFBQSxTQUFBLENBQUE7QUFDQSxRQUFBLFVBQUEsUUFBQTtBQUNFLFlBQUEsZUFBQSxNQUFBLGVBQUEsSUFBQSxRQUFBLFdBQUEsRUFBQSxFQUFBLFFBQUEsb0JBQUEsQ0FBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLEdBQUE7QUFBQSxJQUVnRDtBQUFBLEVBQ2xELENBQUE7QUFFSjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxDQUFBLE9BQUEsUUFBQSxNQUFBLEdBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
