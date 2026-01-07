import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import { refPrunId } from './attributes.js';
import { contractsStore } from './contracts.js';
import { getDestinationName } from './addresses.js';
import { watchUntil } from './watch.js';
function init() {
  subscribe($$(document, C.ColoredIcon.container), async container => {
    const label = await $(container, C.ColoredIcon.label);
    const subLabel = await $(container, C.ColoredIcon.subLabel);
    if (label.textContent !== 'SHPT' && label.textContent !== 'BLCK') {
      return;
    }
    const id = refPrunId(container);
    await watchUntil(() => !!id.value);
    const destination = contractsStore.getDestinationByShipmentId(id.value);
    const name = getDestinationName(destination);
    if (!name) {
      return;
    }
    subLabel.textContent = name;
  });
}
features.add(import.meta.url, init, 'Shortens addresses in SHPT and BLCK items.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2hvcnRlbi1zaHB0LWJsY2stYWRkcmVzcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL3Nob3J0ZW4tc2hwdC1ibGNrLWFkZHJlc3MudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVmUHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgY29udHJhY3RzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29udHJhY3RzJztcbmltcG9ydCB7IGdldERlc3RpbmF0aW9uTmFtZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuaW1wb3J0IHsgd2F0Y2hVbnRpbCB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsIEMuQ29sb3JlZEljb24uY29udGFpbmVyKSwgYXN5bmMgY29udGFpbmVyID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGF3YWl0ICQoY29udGFpbmVyLCBDLkNvbG9yZWRJY29uLmxhYmVsKTtcbiAgICBjb25zdCBzdWJMYWJlbCA9IGF3YWl0ICQoY29udGFpbmVyLCBDLkNvbG9yZWRJY29uLnN1YkxhYmVsKTtcblxuICAgIGlmIChsYWJlbC50ZXh0Q29udGVudCAhPT0gJ1NIUFQnICYmIGxhYmVsLnRleHRDb250ZW50ICE9PSAnQkxDSycpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBjb25zdCBpZCA9IHJlZlBydW5JZChjb250YWluZXIpO1xuICAgIGF3YWl0IHdhdGNoVW50aWwoKCkgPT4gISFpZC52YWx1ZSk7XG5cbiAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGNvbnRyYWN0c1N0b3JlLmdldERlc3RpbmF0aW9uQnlTaGlwbWVudElkKGlkLnZhbHVlKTtcbiAgICBjb25zdCBuYW1lID0gZ2V0RGVzdGluYXRpb25OYW1lKGRlc3RpbmF0aW9uKTtcbiAgICBpZiAoIW5hbWUpIHtcbiAgICAgIHJldHVybjtcbiAgICB9XG5cbiAgICBzdWJMYWJlbC50ZXh0Q29udGVudCA9IG5hbWU7XG4gIH0pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnU2hvcnRlbnMgYWRkcmVzc2VzIGluIFNIUFQgYW5kIEJMQ0sgaXRlbXMuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7QUFLQSxTQUFBLE9BQUE7QUFDRSxZQUFBLEdBQUEsVUFBQSxFQUFBLFlBQUEsU0FBQSxHQUFBLE9BQUEsY0FBQTtBQUNFLFVBQUEsUUFBQSxNQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsS0FBQTtBQUNBLFVBQUEsV0FBQSxNQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsUUFBQTtBQUVBLFFBQUEsTUFBQSxnQkFBQSxVQUFBLE1BQUEsZ0JBQUEsUUFBQTtBQUNFO0FBQUEsSUFBQTtBQUdGLFVBQUEsS0FBQSxVQUFBLFNBQUE7QUFDQSxVQUFBLFdBQUEsTUFBQSxDQUFBLENBQUEsR0FBQSxLQUFBO0FBRUEsVUFBQSxjQUFBLGVBQUEsMkJBQUEsR0FBQSxLQUFBO0FBQ0EsVUFBQSxPQUFBLG1CQUFBLFdBQUE7QUFDQSxRQUFBLENBQUEsTUFBQTtBQUNFO0FBQUEsSUFBQTtBQUdGLGFBQUEsY0FBQTtBQUFBLEVBQXVCLENBQUE7QUFFM0I7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsNENBQUE7In0=
