import config from './config.js';
import _sfc_main$1 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storageSort, serializeStorage, deserializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import { getRefuelOrigins } from './utils6.js';
import {
  defineComponent,
  computed,
  watchEffect,
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
    const originStorages = computed(() => getRefuelOrigins().sort(storageSort));
    const originOptions = computed(() => getOptions(originStorages.value));
    if (
      __props.data.origin === configurableValue &&
      !__props.config.origin &&
      originStorages.value.length > 0
    ) {
      __props.config.origin = serializeStorage(originStorages.value[0]);
    }
    watchEffect(() => {
      if (__props.data.origin === configurableValue) {
        if (__props.config.origin) {
          const origin = deserializeStorage(__props.config.origin);
          if (!origin || !originStorages.value.includes(origin)) {
            __props.config.origin = void 0;
          }
        }
        if (!__props.config.origin && originStorages.value.length === 1) {
          __props.config.origin = serializeStorage(originStorages.value[0]);
        }
      }
    });
    function getOptions(storages) {
      const options = storages.map(serializeStorage).map(x => ({ label: x, value: x }));
      if (options.length === 0) {
        options.push({ label: 'No locations available', value: void 0 });
      }
      return options;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('form', null, [
          createVNode(
            _sfc_main$1,
            { label: 'From' },
            {
              default: withCtx(() => [
                createVNode(
                  SelectInput,
                  {
                    modelValue: ('config' in _ctx ? _ctx.config : unref(config)).origin,
                    'onUpdate:modelValue':
                      _cache[0] ||
                      (_cache[0] = $event =>
                        (('config' in _ctx ? _ctx.config : unref(config)).origin = $event)),
                    options: unref(originOptions),
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
