import _sfc_main$1 from './Active.vue.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$2 from './NumberInput.vue.js';
import { comparePlanets } from './util.js';
import { configurableValue } from './shared-types.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    group: {},
  },
  setup(__props, { expose: __expose }) {
    const planets = computed(() => {
      const planets2 = (sitesStore.all.value ?? [])
        .map(x => getEntityNameFromAddress(x.address))
        .filter(x => x !== void 0)
        .sort(comparePlanets);
      planets2.unshift(configurableValue);
      return planets2;
    });
    const planet = ref(__props.group.planet ?? planets.value[0]);
    const planetError = ref(false);
    const days = ref(
      typeof __props.group.days === 'string'
        ? parseInt(__props.group.days || '0')
        : __props.group.days,
    );
    const advanceDays = ref(
      typeof __props.group.advanceDays === 'string'
        ? parseInt(__props.group.advanceDays || '0')
        : (__props.group.advanceDays ?? 0),
    );
    const advanceDaysError = ref(false);
    function validate() {
      let isValid = true;
      planetError.value = !planet.value;
      isValid &&= !planetError.value;
      advanceDaysError.value = advanceDays.value < 0;
      isValid &&= !advanceDaysError.value;
      return isValid;
    }
    function save() {
      __props.group.planet = planet.value;
      __props.group.days = days.value;
      __props.group.advanceDays = advanceDays.value;
    }
    __expose({ validate, save });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              _sfc_main$1,
              {
                label: 'Planet',
                error: unref(planetError),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(planet),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event => (isRef(planet) ? (planet.value = $event) : null)),
                      options: unref(planets),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['error'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Day Threshold',
                tooltip:
                  'All buildings older than this threshold will be repaired.\n     If no number is provided all buildings are repaired.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(days),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event => (isRef(days) ? (days.value = $event) : null)),
                      optional: '',
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Time Offset',
                tooltip: 'The number of days in the future this repair will be conducted.',
                error: unref(advanceDaysError),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      modelValue: unref(advanceDays),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(advanceDays) ? (advanceDays.value = $event) : null),
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['error'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
