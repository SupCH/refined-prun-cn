import { C } from './prun-css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'HeadItem',
  props: {
    active: { type: Boolean },
    label: {},
  },
  setup(__props) {
    const classes = computed(() => ({
      [C.HeadItem.indicator]: true,
      [C.HeadItem.indicatorPrimary]: true,
      [C.HeadItem.indicatorPrimaryActive]: __props.active,
      [C.effects.shadowPrimary]: __props.active,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).HeadItem.container,
              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
              ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
              ('C' in _ctx ? _ctx.C : unref(C)).HeadItem.link,
            ]),
          },
          [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).HeadItem.label),
              },
              toDisplayString(_ctx.label),
              3,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(unref(classes)),
              },
              null,
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZEl0ZW0udnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvc2NyZWVuLXRhYi1iYXIvSGVhZEl0ZW0udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCB7IGFjdGl2ZSB9ID0gZGVmaW5lUHJvcHM8eyBhY3RpdmU/OiBib29sZWFuOyBsYWJlbDogc3RyaW5nIH0+KCk7XG5cbmNvbnN0IGNsYXNzZXMgPSBjb21wdXRlZCgoKSA9PiAoe1xuICBbQy5IZWFkSXRlbS5pbmRpY2F0b3JdOiB0cnVlLFxuICBbQy5IZWFkSXRlbS5pbmRpY2F0b3JQcmltYXJ5XTogdHJ1ZSxcbiAgW0MuSGVhZEl0ZW0uaW5kaWNhdG9yUHJpbWFyeUFjdGl2ZV06IGFjdGl2ZSxcbiAgW0MuZWZmZWN0cy5zaGFkb3dQcmltYXJ5XTogYWN0aXZlLFxufSkpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJbQy5IZWFkSXRlbS5jb250YWluZXIsIEMuZm9udHMuZm9udFJlZ3VsYXIsIEMudHlwZS50eXBlUmVndWxhciwgQy5IZWFkSXRlbS5saW5rXVwiPlxuICAgIDxzcGFuIDpjbGFzcz1cIkMuSGVhZEl0ZW0ubGFiZWxcIj57eyBsYWJlbCB9fTwvc3Bhbj5cbiAgICA8ZGl2IDpjbGFzcz1cImNsYXNzZXNcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQUdBLFVBQUEsVUFBQSxTQUFBLE9BQUE7QUFBQSxNQUFnQyxDQUFBLEVBQUEsU0FBQSxTQUFBLEdBQUE7QUFBQSxNQUNOLENBQUEsRUFBQSxTQUFBLGdCQUFBLEdBQUE7QUFBQSxNQUNPLENBQUEsRUFBQSxTQUFBLHNCQUFBLEdBQUEsUUFBQTtBQUFBLE1BQ00sQ0FBQSxFQUFBLFFBQUEsYUFBQSxHQUFBLFFBQUE7QUFBQSxJQUNWLEVBQUE7OztRQVFyQixPQUFBQSxlQUFBLHdEQUg4QkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsY0FBcUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHNCQUFvQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsU0FBQUEsSUFBQUEsQ0FBQUE7QUFBQUEsTUFBZSxHQUFBO0FBQUE7VUFDeEMsT0FBQUQsZ0JBQXBDQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxTQUFBQSxLQUFBQTtBQUFBQSxRQUFnQixHQUFBQyxnQkFBQSxLQUFBLEtBQUEsR0FBQSxDQUFBO0FBQUEsUUFBVUMsZ0JBQUEsT0FBQTtBQUFBLFVBQ2hCLE9BQUFILGVBQUFJLE1BQUEsT0FBQSxDQUFBO0FBQUEsUUFBSixHQUFBLE1BQUEsQ0FBQTtBQUFBOzs7OyJ9
