import { C } from './prun-css.js';
import _sfc_main$1 from './RadioItem.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SelectButton',
  props: {
    label: {},
    selected: { type: Boolean },
    set: { type: Function },
  },
  setup(__props) {
    const model = computed({
      get: () => __props.selected,
      set: value => __props.set(value),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).SelectButton.container),
          },
          [
            createVNode(
              _sfc_main$1,
              {
                modelValue: unref(model),
                'onUpdate:modelValue':
                  _cache[0] ||
                  (_cache[0] = $event => (isRef(model) ? (model.value = $event) : null)),
              },
              {
                default: withCtx(() => [createTextVNode(toDisplayString(_ctx.label), 1)]),
                _: 1,
              },
              8,
              ['modelValue'],
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VsZWN0QnV0dG9uLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2FkdmFuY2VkL2hpZGUtc3lzdGVtLWNoYXQtbWVzc2FnZXMvU2VsZWN0QnV0dG9uLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFJhZGlvSXRlbSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvUmFkaW9JdGVtLnZ1ZSc7XG5cbmNvbnN0IHsgc2VsZWN0ZWQsIHNldCB9ID0gZGVmaW5lUHJvcHM8e1xuICBsYWJlbDogc3RyaW5nO1xuICBzZWxlY3RlZD86IGJvb2xlYW47XG4gIHNldDogKHZhbHVlOiBib29sZWFuKSA9PiB2b2lkO1xufT4oKTtcblxuY29uc3QgbW9kZWwgPSBjb21wdXRlZCh7XG4gIGdldDogKCkgPT4gc2VsZWN0ZWQsXG4gIHNldDogdmFsdWUgPT4gc2V0KHZhbHVlKSxcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLlNlbGVjdEJ1dHRvbi5jb250YWluZXJcIj5cbiAgICA8UmFkaW9JdGVtIHYtbW9kZWw9XCJtb2RlbFwiPlxuICAgICAge3sgbGFiZWwgfX1cbiAgICA8L1JhZGlvSXRlbT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfdW5yZWYiLCJfaXNSZWYiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsUUFBQSxTQUFBO0FBQUEsTUFBdUIsS0FBQSxNQUFBLFFBQUE7QUFBQSxNQUNWLEtBQUEsQ0FBQSxVQUFBLFFBQUEsSUFBQSxLQUFBO0FBQUEsSUFDWSxDQUFBOzs7UUFTakIsT0FBQUEsZ0JBSk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGFBQUFBLFNBQUFBO0FBQUFBLE1BQXdCLEdBQUE7QUFBQTtVQUd2QixZQUFBQyxNQUFBLEtBQUE7QUFBQSxVQUZRLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUMsTUFBQSxLQUFBLElBQUEsTUFBQSxRQUFBLFNBQUE7QUFBQSxRQUFLLEdBQUE7QUFBQTtZQUNaQyxnQkFBQUMsZ0JBQUEsS0FBQSxLQUFBLEdBQUEsQ0FBQTtBQUFBLFVBQUgsQ0FBQTtBQUFBOzs7Ozs7In0=
