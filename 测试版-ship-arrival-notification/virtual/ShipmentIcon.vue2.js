import { C } from './prun-css.js';
import ColoredIcon from './ColoredIcon.vue.js';
import { contractsStore } from './contracts.js';
import { showBuffer } from './buffers.js';
import { getDestinationFullName, getDestinationName } from './addresses.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const background = 'linear-gradient(135deg, #030303, #181818)';
const color = '#7f7f7f';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ShipmentIcon',
  props: {
    shipmentId: {},
    size: { default: 'large' },
  },
  setup(__props) {
    const resolvedDestination = computed(() => {
      const destination = contractsStore.getDestinationByShipmentId(__props.shipmentId);
      return __props.size === 'large'
        ? getDestinationFullName(destination)
        : getDestinationName(destination);
    });
    const onClick = () => {
      const contract = contractsStore.getByShipmentId(__props.shipmentId);
      if (contract) {
        showBuffer(`CONT ${contract.localId}`);
      }
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).MaterialIcon.container,
              _ctx.$style.container,
            ]),
          },
          [
            createVNode(
              ColoredIcon,
              {
                'data-prun-id': _ctx.shipmentId,
                label: 'SHPT',
                title: 'Shipment',
                'sub-label': unref(resolvedDestination),
                background,
                color,
                size: _ctx.size,
                class: normalizeClass(_ctx.$style.icon),
                onClick,
              },
              null,
              8,
              ['data-prun-id', 'sub-label', 'size', 'class'],
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpcG1lbnRJY29uLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1NoaXBtZW50SWNvbi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBDb2xvcmVkSWNvbiwgeyBDb2xvcmVkSWNvblNpemUgfSBmcm9tICdAc3JjL2NvbXBvbmVudHMvQ29sb3JlZEljb24udnVlJztcbmltcG9ydCB7IGNvbnRyYWN0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NvbnRyYWN0cyc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHtcbiAgZ2V0RGVzdGluYXRpb25GdWxsTmFtZSxcbiAgZ2V0RGVzdGluYXRpb25OYW1lLFxufSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvYWRkcmVzc2VzJztcblxuY29uc3QgeyBzaGlwbWVudElkLCBzaXplID0gJ2xhcmdlJyB9ID0gZGVmaW5lUHJvcHM8e1xuICBzaGlwbWVudElkPzogc3RyaW5nO1xuICBzaXplPzogQ29sb3JlZEljb25TaXplO1xufT4oKTtcblxuY29uc3QgcmVzb2x2ZWREZXN0aW5hdGlvbiA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgZGVzdGluYXRpb24gPSBjb250cmFjdHNTdG9yZS5nZXREZXN0aW5hdGlvbkJ5U2hpcG1lbnRJZChzaGlwbWVudElkKTtcbiAgcmV0dXJuIHNpemUgPT09ICdsYXJnZScgPyBnZXREZXN0aW5hdGlvbkZ1bGxOYW1lKGRlc3RpbmF0aW9uKSA6IGdldERlc3RpbmF0aW9uTmFtZShkZXN0aW5hdGlvbik7XG59KTtcblxuY29uc3QgYmFja2dyb3VuZCA9ICdsaW5lYXItZ3JhZGllbnQoMTM1ZGVnLCAjMDMwMzAzLCAjMTgxODE4KSc7XG5jb25zdCBjb2xvciA9ICcjN2Y3ZjdmJztcblxuY29uc3Qgb25DbGljayA9ICgpID0+IHtcbiAgY29uc3QgY29udHJhY3QgPSBjb250cmFjdHNTdG9yZS5nZXRCeVNoaXBtZW50SWQoc2hpcG1lbnRJZCk7XG4gIGlmIChjb250cmFjdCkge1xuICAgIHNob3dCdWZmZXIoYENPTlQgJHtjb250cmFjdC5sb2NhbElkfWApO1xuICB9XG59O1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJbQy5NYXRlcmlhbEljb24uY29udGFpbmVyLCAkc3R5bGUuY29udGFpbmVyXVwiPlxuICAgIDxDb2xvcmVkSWNvblxuICAgICAgOmRhdGEtcHJ1bi1pZD1cInNoaXBtZW50SWRcIlxuICAgICAgbGFiZWw9XCJTSFBUXCJcbiAgICAgIHRpdGxlPVwiU2hpcG1lbnRcIlxuICAgICAgOnN1Yi1sYWJlbD1cInJlc29sdmVkRGVzdGluYXRpb25cIlxuICAgICAgOmJhY2tncm91bmQ9XCJiYWNrZ3JvdW5kXCJcbiAgICAgIDpjb2xvcj1cImNvbG9yXCJcbiAgICAgIDpzaXplPVwic2l6ZVwiXG4gICAgICA6Y2xhc3M9XCIkc3R5bGUuaWNvblwiXG4gICAgICBAY2xpY2s9XCJvbkNsaWNrXCIgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmNvbnRhaW5lciB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsInNoaXBtZW50SWQiLCJfdW5yZWYiLCJzaXplIl0sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQW1CQSxNQUFBLGFBQUE7QUFDQSxNQUFBLFFBQUE7Ozs7Ozs7O0FBTkEsVUFBQSxzQkFBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLGNBQUEsZUFBQSwyQkFBQSxRQUFBLFVBQUE7QUFDQSxhQUFBLFFBQUEsU0FBQSxVQUFBLHVCQUFBLFdBQUEsSUFBQSxtQkFBQSxXQUFBO0FBQUEsSUFBOEYsQ0FBQTtBQU1oRyxVQUFBLFVBQUEsTUFBQTtBQUNFLFlBQUEsV0FBQSxlQUFBLGdCQUFBLFFBQUEsVUFBQTtBQUNBLFVBQUEsVUFBQTtBQUNFLG1CQUFBLFFBQUEsU0FBQSxPQUFBLEVBQUE7QUFBQSxNQUFxQztBQUFBLElBQ3ZDOzs7UUFnQk0sT0FBQUEsZUFBQSxFQVhRQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtNQUEwQyxHQUFBO0FBQUE7VUFVakMsZ0JBQUEsS0FBQTtBQUFBLFVBUkpDLE9BQUFBO0FBQUFBLFVBQ1QsT0FBQTtBQUFBLFVBQ0EsYUFBQUMsTUFBQSxtQkFBQTtBQUFBLFVBQ007QUFBQSxVQUNYO0FBQUEsVUFDQSxNQUFBLEtBQUE7QUFBQSxVQUNNQyxPQUFBQSxlQUFBQSxLQUFBQSxPQUFBQSxJQUFBQTtBQUFBQSxVQUNZO0FBQUEsUUFDbEIsR0FBQSxNQUFBLEdBQUEsQ0FBQSxnQkFBQSxhQUFBLFFBQUEsT0FBQSxDQUFBO0FBQUE7Ozs7In0=
