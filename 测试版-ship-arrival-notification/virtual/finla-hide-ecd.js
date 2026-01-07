import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refTextContent } from './reactive-dom.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { observeDescendantListChanged } from './mutation-observer.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.LiquidAssetsPanel.row), row => {
    const currency = refTextContent(row.children[0]);
    watchEffectWhileNodeAlive(row, () => {
      row.style.display = currency.value === 'ECD' ? 'none' : '';
    });
  });
  subscribe($$(tile.anchor, 'tbody'), tbody => {
    observeDescendantListChanged(tbody, () => {
      const rows = _$$(tbody, 'tr');
      for (const row of rows) {
        const currency = row.children[0].textContent;
        if (currency !== 'ECD') {
          continue;
        }
        if (row !== tbody.lastChild) {
          tbody.appendChild(row);
        }
        return;
      }
    });
  });
}
function init() {
  tiles.observe('FINLA', onTileReady);
}
features.add(import.meta.url, init, 'FINLA: Hides the ECD row.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlubGEtaGlkZS1lY2QuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9maW5sYS1oaWRlLWVjZC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyByZWZUZXh0Q29udGVudCB9IGZyb20gJ0BzcmMvdXRpbHMvcmVhY3RpdmUtZG9tJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IG9ic2VydmVEZXNjZW5kYW50TGlzdENoYW5nZWQgfSBmcm9tICdAc3JjL3V0aWxzL211dGF0aW9uLW9ic2VydmVyJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkxpcXVpZEFzc2V0c1BhbmVsLnJvdyksIHJvdyA9PiB7XG4gICAgY29uc3QgY3VycmVuY3kgPSByZWZUZXh0Q29udGVudChyb3cuY2hpbGRyZW5bMF0pO1xuICAgIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUocm93LCAoKSA9PiB7XG4gICAgICByb3cuc3R5bGUuZGlzcGxheSA9IGN1cnJlbmN5LnZhbHVlID09PSAnRUNEJyA/ICdub25lJyA6ICcnO1xuICAgIH0pO1xuICB9KTtcbiAgLy8gTW92ZSB0aGUgRUNEIGNvbHVtbiB0byB0aGUgZW5kIHRvIGF2b2lkIGJyZWFraW5nXG4gIC8vIHRoZSBhbHRlcm5hdGluZyB0YWJsZSByb3cgY29sb3JzLlxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsICd0Ym9keScpLCB0Ym9keSA9PiB7XG4gICAgb2JzZXJ2ZURlc2NlbmRhbnRMaXN0Q2hhbmdlZCh0Ym9keSwgKCkgPT4ge1xuICAgICAgY29uc3Qgcm93cyA9IF8kJCh0Ym9keSwgJ3RyJyk7XG4gICAgICBmb3IgKGNvbnN0IHJvdyBvZiByb3dzKSB7XG4gICAgICAgIGNvbnN0IGN1cnJlbmN5ID0gcm93LmNoaWxkcmVuWzBdLnRleHRDb250ZW50O1xuICAgICAgICBpZiAoY3VycmVuY3kgIT09ICdFQ0QnKSB7XG4gICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHJvdyAhPT0gdGJvZHkubGFzdENoaWxkKSB7XG4gICAgICAgICAgdGJvZHkuYXBwZW5kQ2hpbGQocm93KTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdGSU5MQScsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0ZJTkxBOiBIaWRlcyB0aGUgRUNEIHJvdy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLFNBQUEsWUFBQSxNQUFBO0FBQ0UsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLGtCQUFBLEdBQUEsR0FBQSxDQUFBLFFBQUE7QUFDRSxVQUFBLFdBQUEsZUFBQSxJQUFBLFNBQUEsQ0FBQSxDQUFBO0FBQ0EsOEJBQUEsS0FBQSxNQUFBO0FBQ0UsVUFBQSxNQUFBLFVBQUEsU0FBQSxVQUFBLFFBQUEsU0FBQTtBQUFBLElBQXdELENBQUE7QUFBQSxFQUN6RCxDQUFBO0FBSUgsWUFBQSxHQUFBLEtBQUEsUUFBQSxPQUFBLEdBQUEsQ0FBQSxVQUFBO0FBQ0UsaUNBQUEsT0FBQSxNQUFBO0FBQ0UsWUFBQSxPQUFBLElBQUEsT0FBQSxJQUFBO0FBQ0EsaUJBQUEsT0FBQSxNQUFBO0FBQ0UsY0FBQSxXQUFBLElBQUEsU0FBQSxDQUFBLEVBQUE7QUFDQSxZQUFBLGFBQUEsT0FBQTtBQUNFO0FBQUEsUUFBQTtBQUVGLFlBQUEsUUFBQSxNQUFBLFdBQUE7QUFDRSxnQkFBQSxZQUFBLEdBQUE7QUFBQSxRQUFxQjtBQUV2QjtBQUFBLE1BQUE7QUFBQSxJQUNGLENBQUE7QUFBQSxFQUNELENBQUE7QUFFTDtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxTQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwyQkFBQTsifQ==
