import { C } from './prun-css.js';
import { shipsStore } from './ships.js';
import { percent0 } from './format.js';
import coloredValue from './colored-value.module.css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createCommentVNode,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ShipCondition',
  props: {
    id: {},
  },
  setup(__props) {
    const ship = computed(() => shipsStore.getById(__props.id));
    const condition = computed(() => Math.floor((ship.value?.condition ?? 1) * 100) / 100);
    const labelClass = computed(() => {
      if (condition.value <= 0.8) {
        return C.ColoredValue.negative;
      }
      if (condition.value <= 0.85) {
        return coloredValue.warning;
      }
      return C.ColoredValue.positive;
    });
    return (_ctx, _cache) => {
      return unref(ship)
        ? (openBlock(),
          createElementBlock(
            'span',
            {
              key: 0,
              class: normalizeClass(unref(labelClass)),
            },
            ' ' + toDisplayString(unref(percent0)(unref(condition))),
            3,
          ))
        : createCommentVNode('', true);
    };
  },
});
export { _sfc_main as default };
