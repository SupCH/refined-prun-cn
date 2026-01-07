import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
  },
  setup(__props) {
    const displayTickers = computed(() => (__props.action.tickers || []).join(', '));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              _sfc_main$2,
              { label: 'Exchange' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: _ctx.action.exchange,
                      'onUpdate:modelValue':
                        _cache[0] || (_cache[0] = $event => (_ctx.action.exchange = $event)),
                      disabled: '',
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$2,
              { label: 'Tickers' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      'model-value': unref(displayTickers),
                      disabled: '',
                    },
                    null,
                    8,
                    ['model-value'],
                  ),
                ]),
                _: 1,
              },
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
