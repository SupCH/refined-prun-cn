import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import features from './feature-registry.js';
import { contractsStore } from './contracts.js';
import { getDestinationFullName } from './addresses.js';
import { refPrunId } from './attributes.js';
import { watchUntil } from './watch.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function init() {
  subscribe($$(document, C.ColoredIcon.container), async container => {
    const label = await $(container, C.ColoredIcon.label);
    if (label.textContent !== 'BLCK') {
      return;
    }
    const id = refPrunId(container);
    await watchUntil(() => !!id.value);
    const destination = contractsStore.getDestinationByShipmentId(id.value);
    const name = getDestinationFullName(destination);
    if (name) {
      createFragmentApp(() =>
        createVNode(
          'span',
          {
            class: [C.ColoredIcon.subLabel, C.type.typeVerySmall],
          },
          [name],
        ),
      ).after(label);
    }
  });
}
features.add(import.meta.url, init, 'Adds a destination address to BLCK items.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmxjay1pdGVtLWRlc3RpbmF0aW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvYmxjay1pdGVtLWRlc3RpbmF0aW9uLnRzeCJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjb250cmFjdHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jb250cmFjdHMnO1xuaW1wb3J0IHsgZ2V0RGVzdGluYXRpb25GdWxsTmFtZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuaW1wb3J0IHsgcmVmUHJ1bklkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2F0dHJpYnV0ZXMnO1xuaW1wb3J0IHsgd2F0Y2hVbnRpbCB9IGZyb20gJ0BzcmMvdXRpbHMvd2F0Y2gnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBzdWJzY3JpYmUoJCQoZG9jdW1lbnQsIEMuQ29sb3JlZEljb24uY29udGFpbmVyKSwgYXN5bmMgY29udGFpbmVyID0+IHtcbiAgICBjb25zdCBsYWJlbCA9IGF3YWl0ICQoY29udGFpbmVyLCBDLkNvbG9yZWRJY29uLmxhYmVsKTtcbiAgICBpZiAobGFiZWwudGV4dENvbnRlbnQgIT09ICdCTENLJykge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGNvbnN0IGlkID0gcmVmUHJ1bklkKGNvbnRhaW5lcik7XG4gICAgYXdhaXQgd2F0Y2hVbnRpbCgoKSA9PiAhIWlkLnZhbHVlKTtcblxuICAgIGNvbnN0IGRlc3RpbmF0aW9uID0gY29udHJhY3RzU3RvcmUuZ2V0RGVzdGluYXRpb25CeVNoaXBtZW50SWQoaWQudmFsdWUpO1xuICAgIGNvbnN0IG5hbWUgPSBnZXREZXN0aW5hdGlvbkZ1bGxOYW1lKGRlc3RpbmF0aW9uKTtcbiAgICBpZiAobmFtZSkge1xuICAgICAgY3JlYXRlRnJhZ21lbnRBcHAoKCkgPT4gKFxuICAgICAgICA8c3BhbiBjbGFzcz17W0MuQ29sb3JlZEljb24uc3ViTGFiZWwsIEMudHlwZS50eXBlVmVyeVNtYWxsXX0+e25hbWV9PC9zcGFuPlxuICAgICAgKSkuYWZ0ZXIobGFiZWwpO1xuICAgIH1cbiAgfSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdBZGRzIGEgZGVzdGluYXRpb24gYWRkcmVzcyB0byBCTENLIGl0ZW1zLicpO1xuIl0sIm5hbWVzIjpbInN1YnNjcmliZSIsImZlYXR1cmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBS0EsU0FBQSxPQUFBO0FBQ0VBLFlBQUFBLEdBQUFBLFVBQUFBLEVBQUFBLFlBQUFBLFNBQUFBLEdBQUFBLE9BQUFBLGNBQUFBO0FBQ0UsVUFBQSxRQUFBLE1BQUEsRUFBQSxXQUFBLEVBQUEsWUFBQSxLQUFBO0FBQ0EsUUFBQSxNQUFBLGdCQUFBLFFBQUE7QUFDRTtBQUFBLElBQ0Y7QUFFQSxVQUFBLEtBQUEsVUFBQSxTQUFBOzs7QUFJQSxVQUFBLE9BQUEsdUJBQUEsV0FBQTtBQUNBLFFBQUEsTUFBQTs7O01BRStELEdBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQSxFQUFBLE1BQUEsS0FBQTtBQUFBLElBRS9EO0FBQUEsRUFDRixDQUFBO0FBQ0Y7QUFFQUMsU0FBQUEsSUFBQUEsWUFBQUEsS0FBQUEsTUFBQUEsMkNBQUFBOyJ9
