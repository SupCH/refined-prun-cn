import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.Button.darkInline), button => {
    button.textContent = 'vote';
  });
  subscribe($$(tile.anchor, C.Link.link), link => {
    if (link.textContent) {
      link.textContent = link.textContent
        .replace('Advertising Campaign: ', '')
        .replace('Education Events: ', '');
    }
  });
}
function init() {
  tiles.observe('COGCPEX', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'COGCPEX: Hides "Advertising Campaign:" and "Education Events:" parts of the campaign labels.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29nY3BleC1jbGVhbi1sYWJlbHMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9jb2djcGV4LWNsZWFuLWxhYmVscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJmdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICAvLyBSZXBsYWNlICd2aWV3IGRldGFpbHMvdm90ZScgd2l0aCAndm90ZSdcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkJ1dHRvbi5kYXJrSW5saW5lKSwgYnV0dG9uID0+IHtcbiAgICBidXR0b24udGV4dENvbnRlbnQgPSAndm90ZSc7XG4gIH0pO1xuXG4gIC8vIFJlbW92ZSByZWR1bmRhbnQgdGl0bGUgcGFydHNcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkxpbmsubGluayksIGxpbmsgPT4ge1xuICAgIGlmIChsaW5rLnRleHRDb250ZW50KSB7XG4gICAgICBsaW5rLnRleHRDb250ZW50ID0gbGlua1xuICAgICAgICAudGV4dENvbnRlbnQhLnJlcGxhY2UoJ0FkdmVydGlzaW5nIENhbXBhaWduOiAnLCAnJylcbiAgICAgICAgLnJlcGxhY2UoJ0VkdWNhdGlvbiBFdmVudHM6ICcsICcnKTtcbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdDT0dDUEVYJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0NPR0NQRVg6IEhpZGVzIFwiQWR2ZXJ0aXNpbmcgQ2FtcGFpZ246XCIgYW5kIFwiRWR1Y2F0aW9uIEV2ZW50czpcIiBwYXJ0cyBvZiB0aGUgY2FtcGFpZ24gbGFiZWxzLicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7O0FBQUEsU0FBQSxZQUFBLE1BQUE7QUFFRSxZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsT0FBQSxVQUFBLEdBQUEsQ0FBQSxXQUFBO0FBQ0UsV0FBQSxjQUFBO0FBQUEsRUFBcUIsQ0FBQTtBQUl2QixZQUFBLEdBQUEsS0FBQSxRQUFBLEVBQUEsS0FBQSxJQUFBLEdBQUEsQ0FBQSxTQUFBO0FBQ0UsUUFBQSxLQUFBLGFBQUE7QUFDRSxXQUFBLGNBQUEsS0FBQSxZQUFBLFFBQUEsMEJBQUEsRUFBQSxFQUFBLFFBQUEsc0JBQUEsRUFBQTtBQUFBLElBRW1DO0FBQUEsRUFDckMsQ0FBQTtBQUVKO0FBRUEsU0FBQSxPQUFBO0FBQ0UsUUFBQSxRQUFBLFdBQUEsV0FBQTtBQUNGO0FBRUEsU0FBQTtBQUFBLEVBQVMsWUFBQTtBQUFBLEVBQ0s7QUFBQSxFQUNaO0FBRUY7In0=
