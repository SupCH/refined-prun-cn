import { $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import _sfc_main from './ContextControlsItem.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNaturalIdFromAddress } from './addresses.js';
async function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  const site = sitesStore.getById(tile.parameter);
  if (!site) {
    return;
  }
  const contextBar = await $(tile.frame, C.ContextControls.container);
  createFragmentApp(_sfc_main, {
    cmd: `XIT BURN ${getEntityNaturalIdFromAddress(site.address)}`,
  }).prependTo(contextBar);
}
function init() {
  tiles.observe('PROD', onTileReady);
}
features.add(import.meta.url, init, 'PROD: Adds a XIT BURN link to the context bar.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZC1idXJuLWxpbmsuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9wcm9kLWJ1cm4tbGluay50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgQ29udGV4dENvbnRyb2xzSXRlbSBmcm9tICdAc3JjL2NvbXBvbmVudHMvQ29udGV4dENvbnRyb2xzSXRlbS52dWUnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQgeyBnZXRFbnRpdHlOYXR1cmFsSWRGcm9tQWRkcmVzcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuXG5hc3luYyBmdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBpZiAoIXRpbGUucGFyYW1ldGVyKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc2l0ZSA9IHNpdGVzU3RvcmUuZ2V0QnlJZCh0aWxlLnBhcmFtZXRlcik7XG4gIGlmICghc2l0ZSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IGNvbnRleHRCYXIgPSBhd2FpdCAkKHRpbGUuZnJhbWUsIEMuQ29udGV4dENvbnRyb2xzLmNvbnRhaW5lcik7XG4gIGNyZWF0ZUZyYWdtZW50QXBwKENvbnRleHRDb250cm9sc0l0ZW0sIHtcbiAgICBjbWQ6IGBYSVQgQlVSTiAke2dldEVudGl0eU5hdHVyYWxJZEZyb21BZGRyZXNzKHNpdGUuYWRkcmVzcyl9YCxcbiAgfSkucHJlcGVuZFRvKGNvbnRleHRCYXIpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdQUk9EJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnUFJPRDogQWRkcyBhIFhJVCBCVVJOIGxpbmsgdG8gdGhlIGNvbnRleHQgYmFyLicpO1xuIl0sIm5hbWVzIjpbIkNvbnRleHRDb250cm9sc0l0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7O0FBSUEsZUFBQSxZQUFBLE1BQUE7QUFDRSxNQUFBLENBQUEsS0FBQSxXQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxPQUFBLFdBQUEsUUFBQSxLQUFBLFNBQUE7QUFDQSxNQUFBLENBQUEsTUFBQTtBQUNFO0FBQUEsRUFBQTtBQUdGLFFBQUEsYUFBQSxNQUFBLEVBQUEsS0FBQSxPQUFBLEVBQUEsZ0JBQUEsU0FBQTtBQUNBLG9CQUFBQSxXQUFBO0FBQUEsSUFBdUMsS0FBQSxZQUFBLDhCQUFBLEtBQUEsT0FBQSxDQUFBO0FBQUEsRUFDdUIsQ0FBQSxFQUFBLFVBQUEsVUFBQTtBQUVoRTtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxnREFBQTsifQ==
