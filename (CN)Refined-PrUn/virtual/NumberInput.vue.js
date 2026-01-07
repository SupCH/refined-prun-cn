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
