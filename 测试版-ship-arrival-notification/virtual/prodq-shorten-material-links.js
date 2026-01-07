import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { productionStore } from './production.js';
import PrunLink from './PrunLink.vue.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refPrunId } from './attributes.js';
import { createVNode, isVNode } from './runtime-core.esm-bundler.js';
function _isSlot(s) {
  return (
    typeof s === 'function' ||
    (Object.prototype.toString.call(s) === '[object Object]' && !isVNode(s))
  );
}
async function onTileReady(tile) {
  subscribe($$(tile.anchor, C.ProductionQueue.table), table => {
    subscribe($$(table, 'tr'), order => {
      const prunId = refPrunId(order);
      watchEffectWhileNodeAlive(order, () => {
        const line = productionStore.getById(tile.parameter);
        const productionOrder = line?.orders.find(order2 => order2.id === prunId.value);
        if (productionOrder) {
          linkifyMaterialNames(order.children[3].children, productionOrder.inputs);
          linkifyMaterialNames(order.children[4].children, productionOrder.outputs);
        }
      });
    });
  });
}
function linkifyMaterialNames(elements, resources) {
  for (let i = 0; i < elements.length; i++) {
    const children = Array.from(elements[i].children);
    const materialName = children.length === 2 ? children[1] : children[0];
    materialName.innerText = '';
    const material = resources[i].material.ticker;
    createFragmentApp(() =>
      createVNode(
        PrunLink,
        {
          inline: true,
          command: `MAT ${material}`,
        },
        _isSlot(material)
          ? material
          : {
              default: () => [material],
            },
      ),
    ).appendTo(materialName);
  }
}
function init() {
  tiles.observe('PRODQ', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'PRODQ: Shortens material full names into their ticker with a link.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHEtc2hvcnRlbi1tYXRlcmlhbC1saW5rcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL3Byb2RxLXNob3J0ZW4tbWF0ZXJpYWwtbGlua3MudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IHByb2R1Y3Rpb25TdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9wcm9kdWN0aW9uJztcbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IHJlZlBydW5JZCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdHRyaWJ1dGVzJztcblxuYXN5bmMgZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLlByb2R1Y3Rpb25RdWV1ZS50YWJsZSksIHRhYmxlID0+IHtcbiAgICBzdWJzY3JpYmUoJCQodGFibGUsICd0cicpLCBvcmRlciA9PiB7XG4gICAgICBjb25zdCBwcnVuSWQgPSByZWZQcnVuSWQob3JkZXIpO1xuICAgICAgd2F0Y2hFZmZlY3RXaGlsZU5vZGVBbGl2ZShvcmRlciwgKCkgPT4ge1xuICAgICAgICBjb25zdCBsaW5lID0gcHJvZHVjdGlvblN0b3JlLmdldEJ5SWQodGlsZS5wYXJhbWV0ZXIpO1xuICAgICAgICBjb25zdCBwcm9kdWN0aW9uT3JkZXIgPSBsaW5lPy5vcmRlcnMuZmluZChvcmRlciA9PiBvcmRlci5pZCA9PT0gcHJ1bklkLnZhbHVlKTtcbiAgICAgICAgaWYgKHByb2R1Y3Rpb25PcmRlcikge1xuICAgICAgICAgIGxpbmtpZnlNYXRlcmlhbE5hbWVzKG9yZGVyLmNoaWxkcmVuWzNdLmNoaWxkcmVuLCBwcm9kdWN0aW9uT3JkZXIuaW5wdXRzKTtcbiAgICAgICAgICBsaW5raWZ5TWF0ZXJpYWxOYW1lcyhvcmRlci5jaGlsZHJlbls0XS5jaGlsZHJlbiwgcHJvZHVjdGlvbk9yZGVyLm91dHB1dHMpO1xuICAgICAgICB9XG4gICAgICB9KTtcbiAgICB9KTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGxpbmtpZnlNYXRlcmlhbE5hbWVzKGVsZW1lbnRzOiBIVE1MQ29sbGVjdGlvbiwgcmVzb3VyY2VzOiBQcnVuQXBpLk1hdGVyaWFsQW1vdW50VmFsdWVbXSkge1xuICBmb3IgKGxldCBpID0gMDsgaSA8IGVsZW1lbnRzLmxlbmd0aDsgaSsrKSB7XG4gICAgY29uc3QgY2hpbGRyZW4gPSBBcnJheS5mcm9tKGVsZW1lbnRzW2ldLmNoaWxkcmVuKSBhcyBIVE1MU3BhbkVsZW1lbnRbXTtcbiAgICAvLyBJbi1wcm9ncmVzcyBvcmRlcnMgaGF2ZSBvbmx5IG9uZSBjaGlsZCwgd2hpbGUgcXVldWVkIG9uZXMgaGF2ZSB0d28uXG4gICAgY29uc3QgbWF0ZXJpYWxOYW1lID0gY2hpbGRyZW4ubGVuZ3RoID09PSAyID8gY2hpbGRyZW5bMV0gOiBjaGlsZHJlblswXTtcbiAgICBtYXRlcmlhbE5hbWUuaW5uZXJUZXh0ID0gJyc7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSByZXNvdXJjZXNbaV0ubWF0ZXJpYWwudGlja2VyO1xuICAgIGNyZWF0ZUZyYWdtZW50QXBwKCgpID0+IChcbiAgICAgIDxQcnVuTGluayBpbmxpbmUgY29tbWFuZD17YE1BVCAke21hdGVyaWFsfWB9PlxuICAgICAgICB7bWF0ZXJpYWx9XG4gICAgICA8L1BydW5MaW5rPlxuICAgICkpLmFwcGVuZFRvKG1hdGVyaWFsTmFtZSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgdGlsZXMub2JzZXJ2ZSgnUFJPRFEnLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnUFJPRFE6IFNob3J0ZW5zIG1hdGVyaWFsIGZ1bGwgbmFtZXMgaW50byB0aGVpciB0aWNrZXIgd2l0aCBhIGxpbmsuJyxcbik7XG4iXSwibmFtZXMiOlsiX2lzVk5vZGUiLCJzdWJzY3JpYmUiLCJvcmRlciIsImxpbmtpZnlNYXRlcmlhbE5hbWVzIiwiY3JlYXRlRnJhZ21lbnRBcHAiLCJ0aWxlcyIsImZlYXR1cmVzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdtRSxTQUFBLFFBQUEsR0FBQTtBQUFBLFNBQUEsT0FBQSxNQUFBLGNBQUEsT0FBQSxVQUFBLFNBQUEsS0FBQSxDQUFBLE1BQUEscUJBQUEsQ0FBQUEsUUFBQSxDQUFBO0FBQUE7QUFFbkUsZUFBQSxZQUFBLE1BQUE7QUFDRUMsWUFBQUEsR0FBQUEsS0FBQUEsUUFBQUEsRUFBQUEsZ0JBQUFBLEtBQUFBLEdBQUFBLFdBQUFBOztBQUVJLFlBQUEsU0FBQSxVQUFBLEtBQUE7OztBQUdFLGNBQUEsa0JBQUEsTUFBQSxPQUFBLEtBQUEsQ0FBQUMsV0FBQUEsT0FBQSxPQUFBLE9BQUEsS0FBQTtBQUNBLFlBQUEsaUJBQUE7QUFDRUMsK0JBQUFBLE1BQUFBLFNBQUFBLENBQUFBLEVBQUFBLFVBQUFBLGdCQUFBQSxNQUFBQTtBQUNBQSwrQkFBQUEsTUFBQUEsU0FBQUEsQ0FBQUEsRUFBQUEsVUFBQUEsZ0JBQUFBLE9BQUFBO0FBQUFBLFFBQ0Y7QUFBQSxNQUNGLENBQUE7QUFBQSxJQUNGLENBQUE7QUFBQSxFQUNGLENBQUE7QUFDRjtBQUVBLFNBQUEscUJBQUEsVUFBQSxXQUFBO0FBQ0UsV0FBQSxJQUFBLEdBQUEsSUFBQSxTQUFBLFFBQUEsS0FBQTtBQUNFLFVBQUEsV0FBQSxNQUFBLEtBQUEsU0FBQSxDQUFBLEVBQUEsUUFBQTtBQUVBLFVBQUEsZUFBQSxTQUFBLFdBQUEsSUFBQSxTQUFBLENBQUEsSUFBQSxTQUFBLENBQUE7OztBQUdBQyxzQkFBQUEsTUFBQUEsWUFBQUEsVUFBQUE7QUFBQUEsTUFBa0IsVUFBQTtBQUFBLE1BQUEsV0FBQSxPQUFBLFFBQUE7QUFBQSxJQUMyQixHQUFBLFFBQUEsUUFBQSxJQUFBLFdBQUE7QUFBQTtJQUNoQyxDQUFBLENBQUEsRUFBQSxTQUFBLFlBQUE7QUFBQSxFQUdmO0FBQ0Y7QUFFQSxTQUFBLE9BQUE7QUFDRUMsUUFBQUEsUUFBQUEsU0FBQUEsV0FBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSxvRUFBQUE7In0=
