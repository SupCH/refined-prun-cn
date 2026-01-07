import { subscribe } from './subscribe-async-generator.js';
import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ComExPlaceOrderForm.form), form => {
    const parts = tile.parameter.split('.');
    void replaceRowValue(form.children[0], parts[1]);
    void replaceRowValue(form.children[1], parts[0]);
  });
}
async function replaceRowValue(row, value) {
  const label = await $(row, C.StaticInput.static);
  label.textContent = value;
}
function init() {
  tiles.observe('CXPO', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'CXPO: Replaces values of "Exchange" and "Material" fields with corresponding tickers.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hwby1zaG9ydGVuLWZpZWxkcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2N4cG8tc2hvcnRlbi1maWVsZHMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkNvbUV4UGxhY2VPcmRlckZvcm0uZm9ybSksIGZvcm0gPT4ge1xuICAgIGNvbnN0IHBhcnRzID0gdGlsZS5wYXJhbWV0ZXIhLnNwbGl0KCcuJyk7XG4gICAgdm9pZCByZXBsYWNlUm93VmFsdWUoZm9ybS5jaGlsZHJlblswXSwgcGFydHNbMV0pO1xuICAgIHZvaWQgcmVwbGFjZVJvd1ZhbHVlKGZvcm0uY2hpbGRyZW5bMV0sIHBhcnRzWzBdKTtcbiAgfSk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIHJlcGxhY2VSb3dWYWx1ZShyb3c6IEVsZW1lbnQsIHZhbHVlOiBzdHJpbmcpIHtcbiAgY29uc3QgbGFiZWwgPSBhd2FpdCAkKHJvdywgQy5TdGF0aWNJbnB1dC5zdGF0aWMpO1xuICBsYWJlbC50ZXh0Q29udGVudCA9IHZhbHVlO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICB0aWxlcy5vYnNlcnZlKCdDWFBPJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoXG4gIGltcG9ydC5tZXRhLnVybCxcbiAgaW5pdCxcbiAgJ0NYUE86IFJlcGxhY2VzIHZhbHVlcyBvZiBcIkV4Y2hhbmdlXCIgYW5kIFwiTWF0ZXJpYWxcIiBmaWVsZHMgd2l0aCBjb3JyZXNwb25kaW5nIHRpY2tlcnMuJyxcbik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFBQSxTQUFBLFlBQUEsTUFBQTtBQUNFLFlBQUEsR0FBQSxLQUFBLFFBQUEsRUFBQSxvQkFBQSxJQUFBLEdBQUEsQ0FBQSxTQUFBO0FBQ0UsVUFBQSxRQUFBLEtBQUEsVUFBQSxNQUFBLEdBQUE7QUFDQSxTQUFBLGdCQUFBLEtBQUEsU0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLENBQUE7QUFDQSxTQUFBLGdCQUFBLEtBQUEsU0FBQSxDQUFBLEdBQUEsTUFBQSxDQUFBLENBQUE7QUFBQSxFQUErQyxDQUFBO0FBRW5EO0FBRUEsZUFBQSxnQkFBQSxLQUFBLE9BQUE7QUFDRSxRQUFBLFFBQUEsTUFBQSxFQUFBLEtBQUEsRUFBQSxZQUFBLE1BQUE7QUFDQSxRQUFBLGNBQUE7QUFDRjtBQUVBLFNBQUEsT0FBQTtBQUNFLFFBQUEsUUFBQSxRQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUE7QUFBQSxFQUFTLFlBQUE7QUFBQSxFQUNLO0FBQUEsRUFDWjtBQUVGOyJ9
