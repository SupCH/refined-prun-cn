import { C } from './prun-css.js';
import { defineComponent, createElementBlock, openBlock } from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['data-tooltip', 'data-tooltip-position'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Tooltip',
  props: {
    position: { default: 'right' },
    tooltip: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'span',
          {
            'data-tooltip': _ctx.tooltip,
            'data-tooltip-position': _ctx.position,
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tooltip.container),
          },
          'ⓘ',
          10,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
