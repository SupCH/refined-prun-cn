import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { extractPlanetName } from './util.js';
function onTileReady(tile) {
  if (tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Link.link), link => {
    if (link.textContent) {
      link.textContent = extractPlanetName(link.textContent);
    }
  });
}
function init() {
  tiles.observe('INV', onTileReady);
}
features.add(import.meta.url, init, 'INV: Shortens addresses in the main INV command.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LXNob3J0ZW4tYWRkcmVzc2VzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvaW52LXNob3J0ZW4tYWRkcmVzc2VzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGV4dHJhY3RQbGFuZXROYW1lIH0gZnJvbSAnQHNyYy91dGlsJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgLy8gT25seSBzaG9ydGVuIG5hbWVzIGluIHRoZSBtYWluIElOViB0aWxlXG4gIGlmICh0aWxlLnBhcmFtZXRlcikge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5MaW5rLmxpbmspLCBsaW5rID0+IHtcbiAgICBpZiAobGluay50ZXh0Q29udGVudCkge1xuICAgICAgbGluay50ZXh0Q29udGVudCA9IGV4dHJhY3RQbGFuZXROYW1lKGxpbmsudGV4dENvbnRlbnQpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0lOVicsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0lOVjogU2hvcnRlbnMgYWRkcmVzc2VzIGluIHRoZSBtYWluIElOViBjb21tYW5kLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUVBLFNBQUEsWUFBQSxNQUFBO0FBRUUsTUFBQSxLQUFBLFdBQUE7QUFDRTtBQUFBLEVBQUE7QUFHRixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsS0FBQSxJQUFBLEdBQUEsQ0FBQSxTQUFBO0FBQ0UsUUFBQSxLQUFBLGFBQUE7QUFDRSxXQUFBLGNBQUEsa0JBQUEsS0FBQSxXQUFBO0FBQUEsSUFBcUQ7QUFBQSxFQUN2RCxDQUFBO0FBRUo7QUFFQSxTQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsT0FBQSxXQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsa0RBQUE7In0=
