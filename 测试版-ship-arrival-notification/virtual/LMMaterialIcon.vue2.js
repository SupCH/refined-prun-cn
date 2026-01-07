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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTE1NYXRlcmlhbEljb24udnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2xtLWl0ZW0taWNvbnMvTE1NYXRlcmlhbEljb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgTWF0ZXJpYWxJY29uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9NYXRlcmlhbEljb24udnVlJztcblxuZGVmaW5lUHJvcHM8eyBhbW91bnQ/OiBudW1iZXI7IHRpY2tlcj86IHN0cmluZyB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPE1hdGVyaWFsSWNvblxuICAgIHYtaWY9XCJ0aWNrZXJcIlxuICAgIDp0aWNrZXI9XCJ0aWNrZXJcIlxuICAgIDphbW91bnQ9XCJhbW91bnRcIlxuICAgIHNpemU9XCJpbmxpbmVcIlxuICAgIDpjbGFzcz1cIiRzdHlsZS5pY29uXCIgLz5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uaWNvbiB7XG4gIGZsZXgtc2hyaW5rOiAwO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJ0aWNrZXIiLCJfY3JlYXRlQmxvY2siLCJhbW91bnQiLCJfbm9ybWFsaXplQ2xhc3MiLCIkc3R5bGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7O2FBUVVBLEtBQUFBLHVCQURSQyxZQUt5QixjQUFBO0FBQUE7UUFIdEIsUUFBUUQsS0FBQUE7QUFBQUEsUUFDUixRQUFRRSxLQUFBQTtBQUFBQSxRQUNULE1BQUs7QUFBQSxRQUNKLE9BQUtDLGVBQUVDLEtBQUFBLE9BQU8sSUFBSTtBQUFBLE1BQUE7Ozs7In0=
