import _sfc_main$2 from './RadioGroupContainer.vue.js';
import _sfc_main$1 from './RadioItem.vue.js';
import { userData } from './user-data.js';
import {
  defineComponent,
  createBlock,
  openBlock,
  withCtx,
  createVNode,
  createTextVNode,
  computed,
} from './runtime-core.esm-bundler.js';
import { isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SettingsGroup',
  props: {
    chartType: {},
    onChange: { type: Function },
  },
  setup(__props) {
    function createToggleModel(type) {
      return computed({
        get: () => (__props.chartType ?? userData.settings.defaultChartType) === type,
        set: value => {
          if (value) {
            __props.onChange(type);
          }
        },
      });
    }
    const smooth = createToggleModel('SMOOTH');
    const aligned = createToggleModel('ALIGNED');
    const raw = createToggleModel('RAW');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$2,
          { horizontal: '' },
          {
            default: withCtx(() => [
              createVNode(
                _sfc_main$1,
                {
                  modelValue: unref(smooth),
                  'onUpdate:modelValue':
                    _cache[0] ||
                    (_cache[0] = $event => (isRef(smooth) ? (smooth.value = $event) : null)),
                  horizontal: '',
                },
                {
                  default: withCtx(() => [
                    ...(_cache[3] || (_cache[3] = [createTextVNode('smooth', -1)])),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  modelValue: unref(aligned),
                  'onUpdate:modelValue':
                    _cache[1] ||
                    (_cache[1] = $event => (isRef(aligned) ? (aligned.value = $event) : null)),
                  horizontal: '',
                },
                {
                  default: withCtx(() => [
                    ...(_cache[4] || (_cache[4] = [createTextVNode('aligned', -1)])),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  modelValue: unref(raw),
                  'onUpdate:modelValue':
                    _cache[2] || (_cache[2] = $event => (isRef(raw) ? (raw.value = $event) : null)),
                  horizontal: '',
                },
                {
                  default: withCtx(() => [
                    ...(_cache[5] || (_cache[5] = [createTextVNode('raw', -1)])),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
            ]),
            _: 1,
          },
        )
      );
    };
  },
});
export { _sfc_main as default };
