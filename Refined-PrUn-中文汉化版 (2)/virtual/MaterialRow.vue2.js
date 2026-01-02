import { C } from './prun-css.js';
import MaterialIcon from './MaterialIcon.vue.js';
import _sfc_main$1 from './DaysCell.vue.js';
import { fixed0, fixed1, fixed2 } from './format.js';
import { useTileState } from './tile-state5.js';
import _sfc_main$2 from './PrunButton.vue.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createCommentVNode,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MaterialRow',
  props: {
    alwaysVisible: { type: Boolean },
    burn: {},
    material: {},
  },
  setup(__props) {
    const production = computed(() => __props.burn.dailyAmount);
    const invAmount = computed(() => __props.burn.inventory ?? 0);
    const isInf = computed(() => production.value >= 0);
    const days = computed(() => (isInf.value ? 1e3 : __props.burn.daysLeft));
    const isRed = computed(() => days.value <= userData.settings.burn.red);
    const isYellow = computed(() => days.value <= userData.settings.burn.yellow);
    const isGreen = computed(() => days.value > userData.settings.burn.yellow);
    const red = useTileState('red');
    const yellow = useTileState('yellow');
    const green = useTileState('green');
    const inf = useTileState('inf');
    const isVisible = computed(() => {
      if (__props.alwaysVisible) {
        return true;
      }
      if (isInf.value) {
        return inf.value;
      }
      return (
        (isRed.value && red.value) ||
        (isYellow.value && yellow.value) ||
        (isGreen.value && green.value)
      );
    });
    const changeText = computed(() => {
      const abs = Math.abs(production.value);
      const fixed = abs >= 1e3 ? fixed0(abs) : abs >= 100 ? fixed1(abs) : fixed2(abs);
      return production.value > 0 ? '+' + fixed : production.value < 0 ? '-' + fixed : 0;
    });
    const changeClass = computed(() => ({
      [C.ColoredValue.positive]: production.value > 0,
    }));
    const needAmt = computed(() => {
      const resupply = userData.settings.burn.resupply;
      if (days.value > resupply || production.value > 0) {
        return 0;
      }
      let need = Math.ceil((days.value - resupply) * production.value);
      need = need === 0 ? 0 : need;
      return need;
    });
    return (_ctx, _cache) => {
      return unref(isVisible)
        ? (openBlock(),
          createElementBlock('tr', _hoisted_1, [
            createBaseVNode(
              'td',
              {
                class: normalizeClass(_ctx.$style.materialContainer),
              },
              [
                createVNode(
                  MaterialIcon,
                  {
                    size: 'inline-table',
                    ticker: _ctx.material.ticker,
                  },
                  null,
                  8,
                  ['ticker'],
                ),
              ],
              2,
            ),
            createBaseVNode('td', null, [
              createBaseVNode('span', null, toDisplayString(unref(fixed0)(unref(invAmount))), 1),
            ]),
            createBaseVNode('td', null, [
              createBaseVNode(
                'span',
                {
                  class: normalizeClass(unref(changeClass)),
                },
                toDisplayString(unref(changeText)),
                3,
              ),
            ]),
            createBaseVNode('td', null, [
              createBaseVNode(
                'span',
                null,
                toDisplayString(isNaN(unref(needAmt)) ? '0' : unref(fixed0)(unref(needAmt))),
                1,
              ),
            ]),
            createVNode(_sfc_main$1, { days: unref(days) }, null, 8, ['days']),
            createBaseVNode('td', null, [
              createVNode(
                _sfc_main$2,
                {
                  dark: '',
                  inline: '',
                  onClick:
                    _cache[0] ||
                    (_cache[0] = $event => unref(showBuffer)(`CXM ${_ctx.material.ticker}`)),
                },
                {
                  default: withCtx(() => [
                    ...(_cache[1] || (_cache[1] = [createTextVNode('CXM', -1)])),
                  ]),
                  _: 1,
                },
              ),
            ]),
          ]))
        : createCommentVNode('', true);
    };
  },
});
export { _sfc_main as default };
