import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GridItemView',
  props: {
    name: {},
  },
  setup(__props) {
    const textElementClass = [C.GridItemView.name, C.fonts.fontRegular, C.type.typeRegular];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).GridItemView.container),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).GridItemView.image),
              },
              [renderSlot(_ctx.$slots, 'default')],
              2,
            ),
            createBaseVNode(
              'span',
              {
                class: normalizeClass(textElementClass),
              },
              toDisplayString(_ctx.name),
              1,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZEl0ZW1WaWV3LnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvR3JpZEl0ZW1WaWV3LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuZGVmaW5lUHJvcHM8eyBuYW1lPzogc3RyaW5nIH0+KCk7XG5cbmNvbnN0IHRleHRFbGVtZW50Q2xhc3MgPSBbQy5HcmlkSXRlbVZpZXcubmFtZSwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVSZWd1bGFyXTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5HcmlkSXRlbVZpZXcuY29udGFpbmVyXCI+XG4gICAgPGRpdiA6Y2xhc3M9XCJDLkdyaWRJdGVtVmlldy5pbWFnZVwiPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L2Rpdj5cbiAgICA8c3BhbiA6Y2xhc3M9XCJ0ZXh0RWxlbWVudENsYXNzXCI+e3sgbmFtZSB9fTwvc3Bhbj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7O0FBR0EsVUFBQSxtQkFBQSxDQUFBLEVBQUEsYUFBQSxNQUFBLEVBQUEsTUFBQSxhQUFBLEVBQUEsS0FBQSxXQUFBOzs7UUFTUSxPQUFBQSxnQkFMT0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsYUFBQUEsU0FBQUE7QUFBQUEsTUFBd0IsR0FBQTtBQUFBO1VBRzdCLE9BQUFELGdCQUZPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxhQUFBQSxLQUFBQTtBQUFBQSxRQUFvQixHQUFBO0FBQUE7UUFDdkIsR0FBQSxDQUFBO0FBQUE7VUFFdUMsT0FBQUQsZUFBQSxnQkFBQTtBQUFBLFFBQW5CLEdBQUFFLGdCQUFBLEtBQUEsSUFBQSxHQUFBLENBQUE7QUFBQSxNQUFTLEdBQUEsQ0FBQTtBQUFBOzs7In0=
