import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  if (tile.docked) {
    return;
  }
  subscribe($$(tile.anchor, 'input'), input => {
    if (input.type === 'text') {
      input.focus();
      input.select();
    }
  });
}
function init() {
  tiles.observe('MTRA', onTileReady);
}
features.add(import.meta.url, init, 'MTRA: Automatically focuses the amount input on buffer open.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXRyYS1hdXRvLWZvY3VzLWFtb3VudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL210cmEtYXV0by1mb2N1cy1hbW91bnQudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgaWYgKHRpbGUuZG9ja2VkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgJ2lucHV0JyksIGlucHV0ID0+IHtcbiAgICBpZiAoaW5wdXQudHlwZSA9PT0gJ3RleHQnKSB7XG4gICAgICBpbnB1dC5mb2N1cygpO1xuICAgICAgaW5wdXQuc2VsZWN0KCk7XG4gICAgfVxuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnTVRSQScsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ01UUkE6IEF1dG9tYXRpY2FsbHkgZm9jdXNlcyB0aGUgYW1vdW50IGlucHV0IG9uIGJ1ZmZlciBvcGVuLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFBQSxTQUFBLFlBQUEsTUFBQTtBQUNFLE1BQUEsS0FBQSxRQUFBO0FBQ0U7QUFBQSxFQUFBO0FBRUYsWUFBQSxHQUFBLEtBQUEsUUFBQSxPQUFBLEdBQUEsQ0FBQSxVQUFBO0FBQ0UsUUFBQSxNQUFBLFNBQUEsUUFBQTtBQUNFLFlBQUEsTUFBQTtBQUNBLFlBQUEsT0FBQTtBQUFBLElBQWE7QUFBQSxFQUNmLENBQUE7QUFFSjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSw4REFBQTsifQ==
