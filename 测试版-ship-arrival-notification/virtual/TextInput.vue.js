import { vModelText } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  useTemplateRef,
  onMounted,
  nextTick,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TextInput',
  props: /* @__PURE__ */ mergeModels(
    {
      focusOnMount: { type: Boolean, default: false },
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const input = useTemplateRef('input');
    onMounted(() => {
      if (__props.focusOnMount) {
        nextTick(() => input.value?.focus());
      }
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          withDirectives(
            createBaseVNode(
              'input',
              {
                ref_key: 'input',
                ref: input,
                'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (model.value = $event)),
                type: 'text',
                autocomplete: 'off',
                'data-1p-ignore': 'true',
                'data-lpignore': 'true',
              },
              null,
              512,
            ),
            [[vModelText, model.value]],
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGV4dElucHV0LnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuY29uc3QgbW9kZWwgPSBkZWZpbmVNb2RlbDxzdHJpbmc+KCk7XG5cbmNvbnN0IHsgZm9jdXNPbk1vdW50ID0gZmFsc2UgfSA9IGRlZmluZVByb3BzPHsgZm9jdXNPbk1vdW50PzogYm9vbGVhbiB9PigpO1xuXG5jb25zdCBpbnB1dCA9IHVzZVRlbXBsYXRlUmVmPEhUTUxJbnB1dEVsZW1lbnQ+KCdpbnB1dCcpO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBpZiAoZm9jdXNPbk1vdW50KSB7XG4gICAgbmV4dFRpY2soKCkgPT4gaW5wdXQudmFsdWU/LmZvY3VzKCkpO1xuICB9XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGlucHV0XG4gICAgICByZWY9XCJpbnB1dFwiXG4gICAgICB2LW1vZGVsPVwibW9kZWxcIlxuICAgICAgdHlwZT1cInRleHRcIlxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgIGRhdGEtMXAtaWdub3JlPVwidHJ1ZVwiXG4gICAgICBkYXRhLWxwaWdub3JlPVwidHJ1ZVwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfd2l0aERpcmVjdGl2ZXMiLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFDQSxVQUFBLFFBQUFBLFNBQUEsU0FBQSxZQUFBO0FBSUEsVUFBQSxRQUFBLGVBQUEsT0FBQTtBQUVBLGNBQUEsTUFBQTtBQUNFLFVBQUEsUUFBQSxjQUFBO0FBQ0UsaUJBQUEsTUFBQSxNQUFBLE9BQUEsTUFBQSxDQUFBO0FBQUEsTUFBbUM7QUFBQSxJQUNyQyxDQUFBOzs7UUFhTUMsZUFBQUMsZ0JBQUEsU0FBQTtBQUFBLFVBRHFCLFNBQUE7QUFBQSxVQUxuQixLQUFBO0FBQUEsVUFBQSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsTUFBQSxRQUFBO0FBQUEsVUFDVSxNQUFBO0FBQUEsVUFDVCxjQUFBO0FBQUEsVUFDUSxrQkFBQTtBQUFBLFVBQ0UsaUJBQUE7QUFBQSxRQUNELEdBQUEsTUFBQSxHQUFBLEdBQUE7QUFBQTtRQUpBLENBQUE7QUFBQTs7OzsifQ==
