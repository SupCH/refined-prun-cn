import PrunLink from './PrunLink.vue.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AddressLink',
  props: {
    address: {},
  },
  setup(__props) {
    const body = computed(() => __props.address.lines[1]);
    const isPlanet = computed(() => body.value.type === 'PLANET');
    const naturalId = computed(() => body.value.entity.naturalId);
    const name = computed(() => body.value.entity.name);
    return (_ctx, _cache) => {
      return unref(isPlanet)
        ? (openBlock(),
          createBlock(
            PrunLink,
            {
              key: 0,
              inline: '',
              command: `PLI ${unref(naturalId)}`,
            },
            {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(name)), 1)]),
              _: 1,
            },
            8,
            ['command'],
          ))
        : (openBlock(),
          createBlock(
            PrunLink,
            {
              key: 1,
              inline: '',
              command: `STNS ${unref(naturalId)}`,
            },
            {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(name)), 1)]),
              _: 1,
            },
            8,
            ['command'],
          ));
    };
  },
});
export { _sfc_main as default };
