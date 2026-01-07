import { subscribe } from './subscribe-async-generator.js';
import { $, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { PrunI18N } from './i18n.js';
import _sfc_main from './Passive.vue.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  const basesText = PrunI18N['CompanyPanel.data.bases']?.[0]?.value;
  subscribe($$(tile.anchor, C.FormComponent.containerPassive), async container => {
    const label = await $(container, 'label');
    if (label.textContent !== basesText) {
      return;
    }
    const bases = await $(container, C.StaticInput.static);
    createFragmentApp(() =>
      createVNode(
        _sfc_main,
        {
          label: 'Base Count',
        },
        {
          default: () => [createVNode('span', null, [bases.childElementCount])],
        },
      ),
    ).before(container);
  });
}
function init() {
  tiles.observe('CO', onTileReady);
}
features.add(import.meta.url, init, 'CO: Adds a "Base Count" row.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY28tYmFzZS1jb3VudC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2NvLWJhc2UtY291bnQudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IFBydW5JMThOIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2kxOG4nO1xuaW1wb3J0IFBhc3NpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1Bhc3NpdmUudnVlJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgY29uc3QgYmFzZXNUZXh0ID0gUHJ1bkkxOE5bJ0NvbXBhbnlQYW5lbC5kYXRhLmJhc2VzJ10/LlswXT8udmFsdWU7XG4gIHN1YnNjcmliZSgkJCh0aWxlLmFuY2hvciwgQy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lclBhc3NpdmUpLCBhc3luYyBjb250YWluZXIgPT4ge1xuICAgIGNvbnN0IGxhYmVsID0gYXdhaXQgJChjb250YWluZXIsICdsYWJlbCcpO1xuICAgIGlmIChsYWJlbC50ZXh0Q29udGVudCAhPT0gYmFzZXNUZXh0KSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGJhc2VzID0gYXdhaXQgJChjb250YWluZXIsIEMuU3RhdGljSW5wdXQuc3RhdGljKTtcbiAgICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgICA8UGFzc2l2ZSBsYWJlbD1cIkJhc2UgQ291bnRcIj5cbiAgICAgICAgPHNwYW4+e2Jhc2VzLmNoaWxkRWxlbWVudENvdW50fTwvc3Bhbj5cbiAgICAgIDwvUGFzc2l2ZT5cbiAgICApKS5iZWZvcmUoY29udGFpbmVyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0NPJywgb25UaWxlUmVhZHkpO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQ086IEFkZHMgYSBcIkJhc2UgQ291bnRcIiByb3cuJyk7XG4iXSwibmFtZXMiOlsic3Vic2NyaWJlIiwiY3JlYXRlRnJhZ21lbnRBcHAiLCJkZWZhdWx0IiwidGlsZXMiLCJmZWF0dXJlcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7O0FBR0EsU0FBQSxZQUFBLE1BQUE7O0FBRUVBLFlBQUFBLEdBQUFBLEtBQUFBLFFBQUFBLEVBQUFBLGNBQUFBLGdCQUFBQSxHQUFBQSxPQUFBQSxjQUFBQTs7QUFFRSxRQUFBLE1BQUEsZ0JBQUEsV0FBQTtBQUNFO0FBQUEsSUFDRjtBQUNBLFVBQUEsUUFBQSxNQUFBLEVBQUEsV0FBQSxFQUFBLFlBQUEsTUFBQTtBQUNBQyxzQkFBQUEsTUFBQUEsWUFBQUEsV0FBQUE7QUFBQUEsTUFBa0IsU0FBQTtBQUFBLElBQUEsR0FBQTtBQUFBLE1BQUFDLFNBQUFBLE1BQUFBLENBQUFBLFlBQUFBLFFBQUFBLE1BQUFBLENBQUFBLE1BQUFBLGlCQUFBQSxDQUFBQSxDQUFBQTtBQUFBQSxJQUVnQixDQUFBLENBQUEsRUFBQSxPQUFBLFNBQUE7QUFBQSxFQUdwQyxDQUFBO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsUUFBQUEsTUFBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSw4QkFBQUE7In0=
