import { vModelText } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  useModel,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DateInput',
  props: {
    modelValue: {},
    modelModifiers: {},
  },
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          withDirectives(
            createBaseVNode(
              'input',
              {
                'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (model.value = $event)),
                type: 'date',
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZUlucHV0LnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvZm9ybXMvRGF0ZUlucHV0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuY29uc3QgbW9kZWwgPSBkZWZpbmVNb2RlbDxzdHJpbmc+KCk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2PlxuICAgIDxpbnB1dFxuICAgICAgdi1tb2RlbD1cIm1vZGVsXCJcbiAgICAgIHR5cGU9XCJkYXRlXCJcbiAgICAgIGF1dG9jb21wbGV0ZT1cIm9mZlwiXG4gICAgICBkYXRhLTFwLWlnbm9yZT1cInRydWVcIlxuICAgICAgZGF0YS1scGlnbm9yZT1cInRydWVcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3VzZU1vZGVsIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7QUFDQSxVQUFNLFFBQVFBLFNBQW1CLFNBQUEsWUFBQzs7MEJBSWhDQyxtQkFPTSxPQUFBLE1BQUE7QUFBQSx1QkFOSkMsZ0JBS3lCLFNBQUE7QUFBQSx1RUFKZCxNQUFLLFFBQUE7QUFBQSxVQUNkLE1BQUs7QUFBQSxVQUNMLGNBQWE7QUFBQSxVQUNiLGtCQUFlO0FBQUEsVUFDZixpQkFBYztBQUFBLFFBQUE7dUJBSkwsTUFBQSxLQUFLO0FBQUEsUUFBQTs7Ozs7In0=
