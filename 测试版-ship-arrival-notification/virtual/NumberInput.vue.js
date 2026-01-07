import { vModelText } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  computed,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref, isRef } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'NumberInput',
  props: /* @__PURE__ */ mergeModels(
    {
      optional: { type: Boolean },
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const inputModel = computed({
      get: () => model.value,
      set: value => {
        if (value !== '') {
          model.value = parseInt(value, 10);
          return;
        }
        if (__props.optional) {
          model.value = void 0;
          return;
        }
        model.value = 0;
      },
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          withDirectives(
            createBaseVNode(
              'input',
              {
                'onUpdate:modelValue':
                  _cache[0] ||
                  (_cache[0] = $event => (isRef(inputModel) ? (inputModel.value = $event) : null)),
                type: 'number',
                autocomplete: 'off',
                'data-1p-ignore': 'true',
                'data-lpignore': 'true',
              },
              null,
              512,
            ),
            [[vModelText, unref(inputModel)]],
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTnVtYmVySW5wdXQudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9mb3Jtcy9OdW1iZXJJbnB1dC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmNvbnN0IHsgb3B0aW9uYWwgfSA9IGRlZmluZVByb3BzPHsgb3B0aW9uYWw/OiBib29sZWFuIH0+KCk7XG5cbmNvbnN0IG1vZGVsID0gZGVmaW5lTW9kZWw8bnVtYmVyIHwgdW5kZWZpbmVkPigpO1xuXG5jb25zdCBpbnB1dE1vZGVsID0gY29tcHV0ZWQoe1xuICBnZXQ6ICgpID0+IG1vZGVsLnZhbHVlLFxuICBzZXQ6ICh2YWx1ZTogc3RyaW5nKSA9PiB7XG4gICAgaWYgKHZhbHVlICE9PSAnJykge1xuICAgICAgbW9kZWwudmFsdWUgPSBwYXJzZUludCh2YWx1ZSwgMTApO1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBpZiAob3B0aW9uYWwpIHtcbiAgICAgIG1vZGVsLnZhbHVlID0gdW5kZWZpbmVkO1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIG1vZGVsLnZhbHVlID0gMDtcbiAgfSxcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdj5cbiAgICA8aW5wdXRcbiAgICAgIHYtbW9kZWw9XCJpbnB1dE1vZGVsXCJcbiAgICAgIHR5cGU9XCJudW1iZXJcIlxuICAgICAgYXV0b2NvbXBsZXRlPVwib2ZmXCJcbiAgICAgIGRhdGEtMXAtaWdub3JlPVwidHJ1ZVwiXG4gICAgICBkYXRhLWxwaWdub3JlPVwidHJ1ZVwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdXNlTW9kZWwiLCJfd2l0aERpcmVjdGl2ZXMiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2lzUmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBR0EsVUFBQSxRQUFBQSxTQUFBLFNBQUEsWUFBQTtBQUVBLFVBQUEsYUFBQSxTQUFBO0FBQUEsTUFBNEIsS0FBQSxNQUFBLE1BQUE7QUFBQSxNQUNULEtBQUEsQ0FBQSxVQUFBO0FBRWYsWUFBQSxVQUFBLElBQUE7QUFDRSxnQkFBQSxRQUFBLFNBQUEsT0FBQSxFQUFBO0FBQ0E7QUFBQSxRQUFBO0FBRUYsWUFBQSxRQUFBLFVBQUE7QUFDRSxnQkFBQSxRQUFBO0FBQ0E7QUFBQSxRQUFBO0FBR0YsY0FBQSxRQUFBO0FBQUEsTUFBYztBQUFBLElBQ2hCLENBQUE7OztRQVlNQyxlQUFBQyxnQkFBQSxTQUFBO0FBQUEsVUFEcUIsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBQyxNQUFBLFVBQUEsSUFBQSxXQUFBLFFBQUEsU0FBQTtBQUFBLFVBSkosTUFBQTtBQUFBLFVBQ2QsY0FBQTtBQUFBLFVBQ1Esa0JBQUE7QUFBQSxVQUNFLGlCQUFBO0FBQUEsUUFDRCxHQUFBLE1BQUEsR0FBQSxHQUFBO0FBQUE7UUFKSyxDQUFBO0FBQUE7Ozs7In0=
