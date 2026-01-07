import { C } from './prun-css.js';
import fa from './font-awesome.module.css.js';
import { toDisplayString, normalizeStyle, normalizeClass } from './shared.esm-bundler.js';
import { defineComponent, createElementBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TileControlsButton',
  props: {
    icon: {},
    marginTop: { default: 3 },
    onClick: { type: Function, default: () => {} },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'button',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).TileControls.control,
              unref(fa).solid,
              _ctx.$style.button,
            ]),
            style: normalizeStyle({ marginTop: _ctx.marginTop + 'px' }),
            onClick:
              _cache[0] ||
              (_cache[0] = //@ts-ignore
                (...args) => _ctx.onClick && _ctx.onClick(...args)),
          },
          toDisplayString(_ctx.icon),
          7,
        )
      );
    };
  },
});
export { _sfc_main as default };
