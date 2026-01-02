import { vModelSelect } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = ['value'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SelectInput',
  props: /* @__PURE__ */ mergeModels(
    {
      options: {},
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const value = option => (typeof option === 'string' ? option : option.value);
    const label = option => (typeof option === 'string' ? option : option.label);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.container),
          },
          [
            withDirectives(
              createBaseVNode(
                'select',
                {
                  'onUpdate:modelValue':
                    _cache[0] || (_cache[0] = $event => (model.value = $event)),
                  class: normalizeClass(_ctx.$style.select),
                },
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(_ctx.options, option => {
                      return (
                        openBlock(),
                        createElementBlock(
                          'option',
                          {
                            key: value(option),
                            value: value(option),
                          },
                          toDisplayString(label(option)),
                          9,
                          _hoisted_1,
                        )
                      );
                    }),
                    128,
                  )),
                ],
                2,
              ),
              [[vModelSelect, model.value]],
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
