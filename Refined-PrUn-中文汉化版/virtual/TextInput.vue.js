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
