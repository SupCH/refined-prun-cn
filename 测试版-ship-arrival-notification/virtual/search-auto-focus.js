import { $ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
async function focusSearchBar(tile) {
  if (tile.parameter) {
    return;
  }
  if (tile.docked) {
    return;
  }
  const input = await $(tile.anchor, 'input');
  input.focus();
}
function init() {
  tiles.observe(['PLI', 'SYSI'], focusSearchBar);
}
features.add(import.meta.url, init, 'Auto-focuses the search bar in PLI and SYSI.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VhcmNoLWF1dG8tZm9jdXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9zZWFyY2gtYXV0by1mb2N1cy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJhc3luYyBmdW5jdGlvbiBmb2N1c1NlYXJjaEJhcih0aWxlOiBQcnVuVGlsZSkge1xuICAvLyBPbmx5IHBhcmFtZXRlci1sZXNzIGNvbW1hbmRzIGhhdmUgdGhlIHNlYXJjaCBiYXIuXG4gIGlmICh0aWxlLnBhcmFtZXRlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAodGlsZS5kb2NrZWQpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgaW5wdXQgPSBhd2FpdCAkKHRpbGUuYW5jaG9yLCAnaW5wdXQnKTtcbiAgaW5wdXQuZm9jdXMoKTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZShbJ1BMSScsICdTWVNJJ10sIGZvY3VzU2VhcmNoQmFyKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0F1dG8tZm9jdXNlcyB0aGUgc2VhcmNoIGJhciBpbiBQTEkgYW5kIFNZU0kuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsZUFBQSxlQUFBLE1BQUE7QUFFRSxNQUFBLEtBQUEsV0FBQTtBQUNFO0FBQUEsRUFBQTtBQUVGLE1BQUEsS0FBQSxRQUFBO0FBQ0U7QUFBQSxFQUFBO0FBRUYsUUFBQSxRQUFBLE1BQUEsRUFBQSxLQUFBLFFBQUEsT0FBQTtBQUNBLFFBQUEsTUFBQTtBQUNGO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLENBQUEsT0FBQSxNQUFBLEdBQUEsY0FBQTtBQUNGO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLDhDQUFBOyJ9
