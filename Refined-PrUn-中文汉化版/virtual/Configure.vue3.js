import config from './config.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$1 from './Active.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import { comparePlanets } from './util.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Configure',
  props: {
    data: {},
    config: {},
  },
  setup(__props) {
    const planets = computed(() =>
      (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets),
    );
    if (!__props.config.planet) {
      __props.config.planet = planets.value[0];
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('form', null, [
          createVNode(
            _sfc_main$1,
            { label: 'Planet' },
            {
              default: withCtx(() => [
                createVNode(
                  SelectInput,
                  {
                    modelValue: ('config' in _ctx ? _ctx.config : unref(config)).planet,
                    'onUpdate:modelValue':
                      _cache[0] ||
                      (_cache[0] = $event =>
                        (('config' in _ctx ? _ctx.config : unref(config)).planet = $event)),
                    options: unref(planets),
                  },
                  null,
                  8,
                  ['modelValue', 'options'],
                ),
              ]),
              _: 1,
            },
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
