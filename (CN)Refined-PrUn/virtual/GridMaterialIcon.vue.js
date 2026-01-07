import _sfc_main$1 from './GridItemView.vue.js';
import MaterialIcon from './MaterialIcon.vue.js';
import { getMaterialNameByTicker } from './util.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GridMaterialIcon',
  props: {
    amount: {},
    text: {},
    ticker: {},
    warning: { type: Boolean },
  },
  setup(__props) {
    const name = computed(() => {
      if (__props.text !== void 0) {
        return __props.text;
      }
      if (__props.ticker === 'SHPT') {
        return 'Shipment';
      }
      return getMaterialNameByTicker(__props.ticker) ?? '???';
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          { name: unref(name) },
          {
            default: withCtx(() => [
              createVNode(
                MaterialIcon,
                {
                  ticker: _ctx.ticker,
                  amount: _ctx.amount,
                  warning: _ctx.warning,
                },
                null,
                8,
                ['ticker', 'amount', 'warning'],
              ),
            ]),
            _: 1,
          },
          8,
          ['name'],
        )
      );
    };
  },
});
export { _sfc_main as default };
