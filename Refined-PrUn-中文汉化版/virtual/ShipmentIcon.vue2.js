import { C } from './prun-css.js';
import ColoredIcon from './ColoredIcon.vue.js';
import { contractsStore } from './contracts.js';
import { showBuffer } from './buffers.js';
import { getDestinationFullName, getDestinationName } from './addresses.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const background = 'linear-gradient(135deg, #030303, #181818)';
const color = '#7f7f7f';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ShipmentIcon',
  props: {
    shipmentId: {},
    size: { default: 'large' },
  },
  setup(__props) {
    const resolvedDestination = computed(() => {
      const destination = contractsStore.getDestinationByShipmentId(__props.shipmentId);
      return __props.size === 'large'
        ? getDestinationFullName(destination)
        : getDestinationName(destination);
    });
    const onClick = () => {
      const contract = contractsStore.getByShipmentId(__props.shipmentId);
      if (contract) {
        showBuffer(`CONT ${contract.localId}`);
      }
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).MaterialIcon.container,
              _ctx.$style.container,
            ]),
          },
          [
            createVNode(
              ColoredIcon,
              {
                'data-prun-id': _ctx.shipmentId,
                label: 'SHPT',
                title: 'Shipment',
                'sub-label': unref(resolvedDestination),
                background,
                color,
                size: _ctx.size,
                class: normalizeClass(_ctx.$style.icon),
                onClick,
              },
              null,
              8,
              ['data-prun-id', 'sub-label', 'size', 'class'],
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
