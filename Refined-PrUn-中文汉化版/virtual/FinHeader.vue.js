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
