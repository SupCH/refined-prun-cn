import MaterialIcon from './MaterialIcon.vue.js';
import {
  defineComponent,
  createBlock,
  createCommentVNode,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LMMaterialIcon',
  props: {
    amount: {},
    ticker: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return _ctx.ticker
        ? (openBlock(),
          createBlock(
            MaterialIcon,
            {
              key: 0,
              ticker: _ctx.ticker,
              amount: _ctx.amount,
              size: 'inline',
              class: normalizeClass(_ctx.$style.icon),
            },
            null,
            8,
            ['ticker', 'amount', 'class'],
          ))
        : createCommentVNode('', true);
    };
  },
});
export { _sfc_main as default };
