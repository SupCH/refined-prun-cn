import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import BuildingCountSection from './BuildingCountSection.vue.js';
function onTileReady(tile) {
  const naturalId = tile.parameter;
  if (!naturalId) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.container), container => {
    createFragmentApp(BuildingCountSection, { naturalId }).appendTo(container);
  });
}
function init() {
  tiles.observe('BS', onTileReady);
}
features.add(import.meta.url, init, 'BS: Adds a building summary list.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnMtYnVpbGRpbmctbGlzdC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2JzLWJ1aWxkaW5nLWxpc3QvYnMtYnVpbGRpbmctbGlzdC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQnVpbGRpbmdDb3VudFNlY3Rpb24gZnJvbSAnLi9CdWlsZGluZ0NvdW50U2VjdGlvbi52dWUnO1xuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBjb25zdCBuYXR1cmFsSWQgPSB0aWxlLnBhcmFtZXRlcjtcbiAgaWYgKCFuYXR1cmFsSWQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuU2l0ZS5jb250YWluZXIpLCBjb250YWluZXIgPT4ge1xuICAgIGNyZWF0ZUZyYWdtZW50QXBwKEJ1aWxkaW5nQ291bnRTZWN0aW9uLCB7IG5hdHVyYWxJZCB9KS5hcHBlbmRUbyhjb250YWluZXIpO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnQlMnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdCUzogQWRkcyBhIGJ1aWxkaW5nIHN1bW1hcnkgbGlzdC4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBRUEsU0FBQSxZQUFBLE1BQUE7QUFDRSxRQUFBLFlBQUEsS0FBQTtBQUNBLE1BQUEsQ0FBQSxXQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsWUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLEtBQUEsU0FBQSxHQUFBLENBQUEsY0FBQTtBQUNFLHNCQUFBLHNCQUFBLEVBQUEsVUFBQSxDQUFBLEVBQUEsU0FBQSxTQUFBO0FBQUEsRUFBeUUsQ0FBQTtBQUU3RTtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxNQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxtQ0FBQTsifQ==
