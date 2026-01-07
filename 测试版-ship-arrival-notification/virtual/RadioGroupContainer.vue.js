import { C } from './prun-css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RadioGroupContainer',
  props: {
    horizontal: { type: Boolean, default: false },
  },
  setup(__props) {
    const classes = computed(() => ({
      [C.RadioGroup.container]: true,
      [C.RadioGroup.horizontal]: __props.horizontal,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(unref(classes)),
          },
          [renderSlot(_ctx.$slots, 'default')],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFkaW9Hcm91cENvbnRhaW5lci52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1JhZGlvR3JvdXBDb250YWluZXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5jb25zdCB7IGhvcml6b250YWwgPSBmYWxzZSB9ID0gZGVmaW5lUHJvcHM8eyBob3Jpem9udGFsPzogYm9vbGVhbiB9PigpO1xuXG5jb25zdCBjbGFzc2VzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgW0MuUmFkaW9Hcm91cC5jb250YWluZXJdOiB0cnVlLFxuICBbQy5SYWRpb0dyb3VwLmhvcml6b250YWxdOiBob3Jpem9udGFsLFxufSkpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJjbGFzc2VzXCI+XG4gICAgPHNsb3QgLz5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUdBLFVBQUEsVUFBQSxTQUFBLE9BQUE7QUFBQSxNQUFnQyxDQUFBLEVBQUEsV0FBQSxTQUFBLEdBQUE7QUFBQSxNQUNKLENBQUEsRUFBQSxXQUFBLFVBQUEsR0FBQSxRQUFBO0FBQUEsSUFDQyxFQUFBOzs7UUFPckIsT0FBQUEsZUFBQUMsTUFBQSxPQUFBLENBQUE7QUFBQSxNQUZjLEdBQUE7QUFBQTtNQUNWLEdBQUEsQ0FBQTtBQUFBOzs7In0=
