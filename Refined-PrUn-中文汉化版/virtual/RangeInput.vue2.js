import { vModelText } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = ['min', 'max', 'step'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RangeInput',
  props: /* @__PURE__ */ mergeModels(
    {
      max: { default: 100 },
      min: { default: 0 },
      step: { default: 1 },
      onChange: { type: Function },
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
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
                class: normalizeClass(_ctx.$style.input),
                type: 'range',
                min: _ctx.min,
                max: _ctx.max,
                step: _ctx.step,
                onChange:
                  _cache[1] ||
                  (_cache[1] = //@ts-ignore
                    (...args) => _ctx.onChange && _ctx.onChange(...args)),
              },
              null,
              42,
              _hoisted_1,
            ),
            [[vModelText, model.value]],
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
