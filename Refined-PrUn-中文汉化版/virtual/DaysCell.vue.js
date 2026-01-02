import { C } from './prun-css.js';
import { userData } from './user-data.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { position: 'relative' } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DaysCell',
  props: {
    days: {},
  },
  setup(__props) {
    const flooredDays = computed(() => Math.floor(__props.days));
    const burnClass = computed(() => ({
      [C.Workforces.daysMissing]: flooredDays.value <= userData.settings.burn.red,
      [C.Workforces.daysWarning]: flooredDays.value <= userData.settings.burn.yellow,
      [C.Workforces.daysSupplied]: flooredDays.value > userData.settings.burn.yellow,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('td', _hoisted_1, [
          createBaseVNode(
            'div',
            {
              style: { position: 'absolute', left: 0, top: 0, width: '100%', height: '100%' },
              class: normalizeClass(unref(burnClass)),
            },
            null,
            2,
          ),
          createBaseVNode(
            'span',
            null,
            toDisplayString(unref(flooredDays) < 500 ? unref(flooredDays) : '∞'),
            1,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
