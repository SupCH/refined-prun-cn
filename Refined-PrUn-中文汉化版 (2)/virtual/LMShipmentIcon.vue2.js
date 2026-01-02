import ShipmentIcon from './ShipmentIcon.vue.js';
import { defineComponent, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LMShipmentIcon',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          ShipmentIcon,
          {
            size: 'inline',
            class: normalizeClass(_ctx.$style.icon),
          },
          null,
          8,
          ['class'],
        )
      );
    };
  },
});
export { _sfc_main as default };
