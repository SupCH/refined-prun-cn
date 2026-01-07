import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refAnimationFrame } from './reactive-dom.js';
import { isEmpty } from './is-empty.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.workforces), workforces => {
    subscribe($$(workforces, 'tr'), row => {
      const cells = _$$(row, 'td');
      if (isEmpty(cells)) {
        return;
      }
      const bar = cells[4].getElementsByTagName('div')[0];
      bar.style.display = 'flex';
      bar.style.flexDirection = 'row';
      bar.style.justifyContent = 'left';
      const progress = bar.getElementsByTagName('progress')[0];
      const progressTitle = refAnimationFrame(progress, x => x.title);
      createFragmentApp(() => createVNode('span', null, [progressTitle.value])).appendTo(bar);
    });
  });
}
function init() {
  tiles.observe('BS', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BS: Adds a workforce satisfaction percentage label to the satisfaction progress bar.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtc2F0aXNmYWN0aW9uLXBlcmNlbnRhZ2UuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9icy1zYXRpc2ZhY3Rpb24tcGVyY2VudGFnZS50c3giXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmQW5pbWF0aW9uRnJhbWUgfSBmcm9tICdAc3JjL3V0aWxzL3JlYWN0aXZlLWRvbSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAndHMtZXh0cmFzJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgLy8gT25seSBwcm9jZXNzIEJTIHRpbGVzIHdpdGggcGFyYW1ldGVyXG4gIGlmICghdGlsZS5wYXJhbWV0ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2l0ZS53b3JrZm9yY2VzKSwgd29ya2ZvcmNlcyA9PiB7XG4gICAgc3Vic2NyaWJlKCQkKHdvcmtmb3JjZXMsICd0cicpLCByb3cgPT4ge1xuICAgICAgY29uc3QgY2VsbHMgPSBfJCQocm93LCAndGQnKTtcbiAgICAgIGlmIChpc0VtcHR5KGNlbGxzKSkge1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGJhciA9IGNlbGxzWzRdLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdkaXYnKVswXTtcbiAgICAgIGJhci5zdHlsZS5kaXNwbGF5ID0gJ2ZsZXgnO1xuICAgICAgYmFyLnN0eWxlLmZsZXhEaXJlY3Rpb24gPSAncm93JztcbiAgICAgIGJhci5zdHlsZS5qdXN0aWZ5Q29udGVudCA9ICdsZWZ0JztcbiAgICAgIGNvbnN0IHByb2dyZXNzID0gYmFyLmdldEVsZW1lbnRzQnlUYWdOYW1lKCdwcm9ncmVzcycpWzBdO1xuICAgICAgY29uc3QgcHJvZ3Jlc3NUaXRsZSA9IHJlZkFuaW1hdGlvbkZyYW1lKHByb2dyZXNzLCB4ID0+IHgudGl0bGUpO1xuICAgICAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT4gPHNwYW4+e3Byb2dyZXNzVGl0bGUudmFsdWV9PC9zcGFuPikuYXBwZW5kVG8oYmFyKTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0JTJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0JTOiBBZGRzIGEgd29ya2ZvcmNlIHNhdGlzZmFjdGlvbiBwZXJjZW50YWdlIGxhYmVsIHRvIHRoZSBzYXRpc2ZhY3Rpb24gcHJvZ3Jlc3MgYmFyLicsXG4pO1xuIl0sIm5hbWVzIjpbInN1YnNjcmliZSIsImJhciIsImNyZWF0ZUZyYWdtZW50QXBwIiwidGlsZXMiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsU0FBQSxZQUFBLE1BQUE7QUFFRSxNQUFBLENBQUEsS0FBQSxXQUFBO0FBQ0U7QUFBQSxFQUNGO0FBRUFBLFlBQUFBLEdBQUFBLEtBQUFBLFFBQUFBLEVBQUFBLEtBQUFBLFVBQUFBLEdBQUFBLGdCQUFBQTs7QUFFSSxZQUFBLFFBQUEsSUFBQSxLQUFBLElBQUE7QUFDQSxVQUFBLFFBQUEsS0FBQSxHQUFBO0FBQ0U7QUFBQSxNQUNGO0FBRUEsWUFBQSxNQUFBLE1BQUEsQ0FBQSxFQUFBLHFCQUFBLEtBQUEsRUFBQSxDQUFBO0FBQ0FDLFVBQUFBLE1BQUFBLFVBQUFBO0FBQ0FBLFVBQUFBLE1BQUFBLGdCQUFBQTtBQUNBQSxVQUFBQSxNQUFBQSxpQkFBQUE7OztBQUdBQyx3QkFBQUEsTUFBQUEsWUFBQUEsUUFBQUEsTUFBQUEsQ0FBQUEsY0FBQUEsS0FBQUEsQ0FBQUEsQ0FBQUEsRUFBQUEsU0FBQUEsR0FBQUE7QUFBQUEsSUFDRixDQUFBO0FBQUEsRUFDRixDQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsUUFBQUEsTUFBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxzRkFBQUE7In0=
