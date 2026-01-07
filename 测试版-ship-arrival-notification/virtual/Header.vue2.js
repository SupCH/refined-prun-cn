import { vModelText, withKeys } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  useTemplateRef,
  createElementBlock,
  openBlock,
  renderSlot,
  Fragment,
  createCommentVNode,
  withDirectives,
  nextTick,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Header',
  props: /* @__PURE__ */ mergeModels(
    {
      editable: { type: Boolean, default: false },
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const inputRef = useTemplateRef('input');
    const inputValue = ref('');
    const isEditing = ref(false);
    function onHeaderClick() {
      isEditing.value = true;
      inputValue.value = model.value ?? '';
      nextTick(() => inputRef.value?.focus());
    }
    function onEnterPress() {
      if (inputValue.value.length > 0) {
        model.value = inputValue.value;
      }
      inputRef.value?.blur();
    }
    function onBlur() {
      isEditing.value = false;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              _ctx.$style.heading,
              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontHeaders,
              ('C' in _ctx ? _ctx.C : unref(C)).type.typeVeryLarge,
            ]),
          },
          [
            _ctx.editable
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    !unref(isEditing)
                      ? (openBlock(),
                        createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: normalizeClass(_ctx.$style.editable),
                            onClick: onHeaderClick,
                          },
                          toDisplayString(model.value),
                          3,
                        ))
                      : createCommentVNode('', true),
                    unref(isEditing)
                      ? withDirectives(
                          (openBlock(),
                          createElementBlock(
                            'input',
                            {
                              key: 1,
                              ref: 'input',
                              'onUpdate:modelValue':
                                _cache[0] ||
                                (_cache[0] = $event =>
                                  isRef(inputValue) ? (inputValue.value = $event) : null),
                              class: normalizeClass(_ctx.$style.input),
                              autocomplete: 'off',
                              type: 'text',
                              placeholder: '',
                              onKeyup: withKeys(onEnterPress, ['enter']),
                              onBlur,
                            },
                            null,
                            34,
                          )),
                          [[vModelText, unref(inputValue)]],
                        )
                      : createCommentVNode('', true),
                  ],
                  64,
                ))
              : renderSlot(_ctx.$slots, 'default', { key: 1 }),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSGVhZGVyLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0hlYWRlci52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmNvbnN0IG1vZGVsID0gZGVmaW5lTW9kZWw8c3RyaW5nPigpO1xuXG5jb25zdCB7IGVkaXRhYmxlID0gZmFsc2UgfSA9IGRlZmluZVByb3BzPHsgZWRpdGFibGU/OiBib29sZWFuIH0+KCk7XG5cbmNvbnN0IGlucHV0UmVmID0gdXNlVGVtcGxhdGVSZWY8SFRNTElucHV0RWxlbWVudD4oJ2lucHV0Jyk7XG5jb25zdCBpbnB1dFZhbHVlID0gcmVmKCcnKTtcbmNvbnN0IGlzRWRpdGluZyA9IHJlZihmYWxzZSk7XG5cbmZ1bmN0aW9uIG9uSGVhZGVyQ2xpY2soKSB7XG4gIGlzRWRpdGluZy52YWx1ZSA9IHRydWU7XG4gIGlucHV0VmFsdWUudmFsdWUgPSBtb2RlbC52YWx1ZSA/PyAnJztcbiAgbmV4dFRpY2soKCkgPT4gaW5wdXRSZWYudmFsdWU/LmZvY3VzKCkpO1xufVxuXG5mdW5jdGlvbiBvbkVudGVyUHJlc3MoKSB7XG4gIGlmIChpbnB1dFZhbHVlLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgICBtb2RlbC52YWx1ZSA9IGlucHV0VmFsdWUudmFsdWU7XG4gIH1cbiAgaW5wdXRSZWYudmFsdWU/LmJsdXIoKTtcbn1cblxuZnVuY3Rpb24gb25CbHVyKCkge1xuICBpc0VkaXRpbmcudmFsdWUgPSBmYWxzZTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiWyRzdHlsZS5oZWFkaW5nLCBDLmZvbnRzLmZvbnRIZWFkZXJzLCBDLnR5cGUudHlwZVZlcnlMYXJnZV1cIj5cbiAgICA8dGVtcGxhdGUgdi1pZj1cImVkaXRhYmxlXCI+XG4gICAgICA8c3BhbiB2LWlmPVwiIWlzRWRpdGluZ1wiIDpjbGFzcz1cIiRzdHlsZS5lZGl0YWJsZVwiIEBjbGljaz1cIm9uSGVhZGVyQ2xpY2tcIj5cbiAgICAgICAge3sgbW9kZWwgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxpbnB1dFxuICAgICAgICB2LWlmPVwiaXNFZGl0aW5nXCJcbiAgICAgICAgcmVmPVwiaW5wdXRcIlxuICAgICAgICB2LW1vZGVsPVwiaW5wdXRWYWx1ZVwiXG4gICAgICAgIDpjbGFzcz1cIiRzdHlsZS5pbnB1dFwiXG4gICAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICAgIHR5cGU9XCJ0ZXh0XCJcbiAgICAgICAgcGxhY2Vob2xkZXI9XCJcIlxuICAgICAgICBAa2V5dXAuZW50ZXI9XCJvbkVudGVyUHJlc3NcIlxuICAgICAgICBAYmx1cj1cIm9uQmx1clwiIC8+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgPHNsb3QgLz5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uaGVhZGluZyB7XG4gIG1hcmdpbjogMDtcbiAgZm9udC13ZWlnaHQ6IG5vcm1hbDtcbn1cblxuLmVkaXRhYmxlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uaW5wdXQge1xuICB3aWR0aDogMTYwcHg7XG4gIHBhZGRpbmc6IDFweCA0cHggMnB4O1xuICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB0ZXh0LXRyYW5zZm9ybTogbm9uZTtcbiAgYm9yZGVyOiAwO1xuICBib3JkZXItYm90dG9tOiAxcHggc29saWQgIzhkNjQxMTtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzQyMzYxZDtcbiAgY29sb3I6ICNiYmI7XG4gIG91dGxpbmU6IG5vbmU7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91c2VNb2RlbCIsIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX2lzUmVmIiwiX3dpdGhLZXlzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFDQSxVQUFBLFFBQUFBLFNBQUEsU0FBQSxZQUFBO0FBSUEsVUFBQSxXQUFBLGVBQUEsT0FBQTtBQUNBLFVBQUEsYUFBQSxJQUFBLEVBQUE7QUFDQSxVQUFBLFlBQUEsSUFBQSxLQUFBO0FBRUEsYUFBQSxnQkFBQTtBQUNFLGdCQUFBLFFBQUE7QUFDQSxpQkFBQSxRQUFBLE1BQUEsU0FBQTtBQUNBLGVBQUEsTUFBQSxTQUFBLE9BQUEsTUFBQSxDQUFBO0FBQUEsSUFBc0M7QUFHeEMsYUFBQSxlQUFBO0FBQ0UsVUFBQSxXQUFBLE1BQUEsU0FBQSxHQUFBO0FBQ0UsY0FBQSxRQUFBLFdBQUE7QUFBQSxNQUF5QjtBQUUzQixlQUFBLE9BQUEsS0FBQTtBQUFBLElBQXFCO0FBR3ZCLGFBQUEsU0FBQTtBQUNFLGdCQUFBLFFBQUE7QUFBQSxJQUFrQjs7O1FBd0JaLE9BQUFDLGVBQUEsQ0FBQSxLQUFBLE9BQUEsVUFuQndCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSx1QkFBcUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEtBQUFBLGFBQUFBLENBQUFBO0FBQUFBLE1BQW9CLEdBQUE7QUFBQTtVQWUxRCxDQUFBQyxNQUFBLFNBQUEsS0FBQUMsVUFBQSxHQUFBQyxtQkFBQSxRQUFBO0FBQUEsWUFYRixLQUFBO0FBQUE7WUFGd0MsU0FBQTtBQUFBLFVBQVUsR0FBQUMsZ0JBQUEsTUFBQSxLQUFBLEdBQUEsQ0FBQSxLQUFBQyxtQkFBQSxJQUFBLElBQUE7QUFBQTtZQVl0QyxLQUFBO0FBQUE7WUFQYix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFDLE1BQUEsVUFBQSxJQUFBLFdBQUEsUUFBQSxTQUFBO0FBQUEsWUFDZSxPQUFBUCxlQUFBLEtBQUEsT0FBQSxLQUFBO0FBQUEsWUFDQyxjQUFBO0FBQUEsWUFDUCxNQUFBO0FBQUEsWUFDUixhQUFBO0FBQUEsWUFDTyxTQUFBUSxTQUFBLGNBQUEsQ0FBQSxPQUFBLENBQUE7QUFBQSxZQUNjO0FBQUEsVUFDekIsR0FBQSxNQUFBLEVBQUEsSUFBQTtBQUFBO1VBTmtCLENBQUEsSUFBQUYsbUJBQUEsSUFBQSxJQUFBO0FBQUE7TUFTYixHQUFBLENBQUE7QUFBQTs7OyJ9
