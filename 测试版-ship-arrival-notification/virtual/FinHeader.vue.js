import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FinHeader',
  setup(__props) {
    const classes = [C.FinanceOverviewPanel.header, C.ui.header2, C.fonts.fontRegular];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'h2',
          {
            class: normalizeClass(classes),
          },
          [renderSlot(_ctx.$slots, 'default')],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRmluSGVhZGVyLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9GSU4vRmluSGVhZGVyLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuY29uc3QgY2xhc3NlcyA9IFtDLkZpbmFuY2VPdmVydmlld1BhbmVsLmhlYWRlciwgQy51aS5oZWFkZXIyLCBDLmZvbnRzLmZvbnRSZWd1bGFyXTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxoMiA6Y2xhc3M9XCJjbGFzc2VzXCI+PHNsb3QgLz48L2gyPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiXSwibWFwcGluZ3MiOiI7Ozs7OztBQUNBLFVBQUEsVUFBQSxDQUFBLEVBQUEscUJBQUEsUUFBQSxFQUFBLEdBQUEsU0FBQSxFQUFBLE1BQUEsV0FBQTs7O1FBSW9DLE9BQUFBLGVBQUEsT0FBQTtBQUFBLE1BQWYsR0FBQTtBQUFBO01BQVUsQ0FBQTtBQUFBOzs7In0=
