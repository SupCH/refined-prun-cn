import config from './config.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$2 from './Passive.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storagesStore } from './storage.js';
import { deserializeStorage, atSameLocation, storageSort, serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import {
  defineComponent,
  computed,
  watchEffect,
  createElementBlock,
  openBlock,
  createBlock,
  withCtx,
  createVNode,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Configure',
  props: {
    data: {},
    config: {},
  },
  setup(__props) {
    const allStorages = computed(() => {
      return (storagesStore.all.value ?? []).filter(
        x => x.type !== 'STL_FUEL_STORE' && x.type !== 'FTL_FUEL_STORE',
      );
    });
    const originStorages = computed(() => {
      let storages = [...allStorages.value];
      if (__props.data.dest !== configurableValue) {
        const destination = deserializeStorage(__props.data.dest);
        if (destination) {
          storages = storages.filter(x => atSameLocation(x, destination) && x !== destination);
        }
      }
      return storages.sort(storageSort);
    });
    const originOptions = computed(() => {
      return getOptions(originStorages.value);
    });
    if (
      __props.data.origin === configurableValue &&
      !__props.config.origin &&
      originStorages.value.length > 0
    ) {
      __props.config.origin = serializeStorage(originStorages.value[0]);
    }
    const destinationStorages = computed(() => {
      let storages = [...allStorages.value];
      if (__props.data.origin !== configurableValue) {
        const origin = deserializeStorage(__props.data.origin);
        if (origin) {
          storages = storages.filter(x => atSameLocation(x, origin) && x !== origin);
        }
      }
      return storages.sort(storageSort);
    });
    const destinationOptions = computed(() => {
      return getOptions(destinationStorages.value);
    });
    if (
      __props.data.dest === configurableValue &&
      !__props.config.destination &&
      destinationStorages.value.length > 0
    ) {
      __props.config.destination = serializeStorage(destinationStorages.value[0]);
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
      if (__props.data.dest === configurableValue) {
        if (__props.config.destination) {
          const destination = deserializeStorage(__props.config.destination);
          if (!destination || !destinationStorages.value.includes(destination)) {
            __props.config.destination = void 0;
          }
        }
        if (!__props.config.destination && destinationStorages.value.length === 1) {
          __props.config.destination = serializeStorage(destinationStorages.value[0]);
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
          _ctx.data.origin === unref(configurableValue)
            ? (openBlock(),
              createBlock(
                _sfc_main$1,
                {
                  key: 0,
                  label: 'From',
                },
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
              ))
            : (openBlock(),
              createBlock(
                _sfc_main$2,
                {
                  key: 1,
                  label: 'From',
                },
                {
                  default: withCtx(() => [
                    createBaseVNode('span', null, toDisplayString(_ctx.data.origin), 1),
                  ]),
                  _: 1,
                },
              )),
          _ctx.data.dest === unref(configurableValue)
            ? (openBlock(),
              createBlock(
                _sfc_main$1,
                {
                  key: 2,
                  label: 'To',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: ('config' in _ctx ? _ctx.config : unref(config)).destination,
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event =>
                            (('config' in _ctx ? _ctx.config : unref(config)).destination =
                              $event)),
                        options: unref(destinationOptions),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
              ))
            : (openBlock(),
              createBlock(
                _sfc_main$2,
                {
                  key: 3,
                  label: 'To',
                },
                {
                  default: withCtx(() => [
                    createBaseVNode('span', null, toDisplayString(_ctx.data.dest), 1),
                  ]),
                  _: 1,
                },
              )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
