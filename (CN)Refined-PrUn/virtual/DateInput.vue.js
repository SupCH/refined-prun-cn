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
