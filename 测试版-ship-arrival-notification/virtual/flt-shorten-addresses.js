import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { extractPlanetName } from './util.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.Link.link), link => {
    if (link.textContent) {
      link.textContent = extractPlanetName(link.textContent);
    }
  });
}
function init() {
  tiles.observe(['FLT', 'FLTS', 'FLTP'], onTileReady);
}
features.add(import.meta.url, init, 'FLT: Shortens addresses in "Location" and "Destination".');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx0LXNob3J0ZW4tYWRkcmVzc2VzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvZmx0LXNob3J0ZW4tYWRkcmVzc2VzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4dHJhY3RQbGFuZXROYW1lIH0gZnJvbSAnQHNyYy91dGlsJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkxpbmsubGluayksIGxpbmsgPT4ge1xuICAgIGlmIChsaW5rLnRleHRDb250ZW50KSB7XG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gZXh0cmFjdFBsYW5ldE5hbWUobGluay50ZXh0Q29udGVudCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZShbJ0ZMVCcsICdGTFRTJywgJ0ZMVFAnXSwgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnRkxUOiBTaG9ydGVucyBhZGRyZXNzZXMgaW4gXCJMb2NhdGlvblwiIGFuZCBcIkRlc3RpbmF0aW9uXCIuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBRUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsS0FBQSxJQUFBLEdBQUEsQ0FBQSxTQUFBO0FBQ0UsUUFBQSxLQUFBLGFBQUE7QUFDRSxXQUFBLGNBQUEsa0JBQUEsS0FBQSxXQUFBO0FBQUEsSUFBcUQ7QUFBQSxFQUN2RCxDQUFBO0FBRUo7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsQ0FBQSxPQUFBLFFBQUEsTUFBQSxHQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwwREFBQTsifQ==
