import LineChart from './LineChart.vue.js';
import { percent0 } from './format.js';
import { calcEquity } from './balance-sheet-summary.js';
import { balanceHistory } from './user-data-balance.js';
import { useTileState } from './user-data-tiles.js';
import dayjs from './dayjs.min.js';
import RangeInput from './RangeInput.vue.js';
import {
  defineComponent,
  watch,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'EquityHistoryChart',
  props: {
    maintainAspectRatio: { type: Boolean },
    onChartClick: { type: Function },
    pan: { type: Boolean },
    zoom: { type: Boolean },
  },
  setup(__props) {
    const averageFactor = useTileState('averageFactor', 0.1);
    const averageFactorText = ref(averageFactor.value);
    watch(averageFactorText, x => {
      const parsed = typeof x === 'number' ? x : parseFloat(x);
      if (isFinite(parsed)) {
        averageFactor.value = parsed;
      }
    });
    const lineChartData = computed(() => {
      const date = [];
      const equityValues = [];
      for (const entry of balanceHistory.value) {
        const equity = calcEquity(entry);
        if (equity === void 0) {
          continue;
        }
        const previousDay = date[date.length - 1];
        if (previousDay !== void 0 && dayjs(previousDay).isSame(entry.timestamp, 'day')) {
          date[date.length - 1] = entry.timestamp;
          equityValues[equityValues.length - 1] = equity;
        } else {
          date.push(entry.timestamp);
          equityValues.push(equity);
        }
      }
      return {
        date,
        equity: equityValues,
      };
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.wide),
              },
              'Smoothing: ' + toDisplayString(unref(percent0)(unref(averageFactor))),
              3,
            ),
            createVNode(
              RangeInput,
              {
                modelValue: unref(averageFactorText),
                'onUpdate:modelValue':
                  _cache[0] ||
                  (_cache[0] = $event =>
                    isRef(averageFactorText) ? (averageFactorText.value = $event) : null),
                class: normalizeClass(_ctx.$style.wide),
                min: 0,
                max: 1,
                step: 0.01,
              },
              null,
              8,
              ['modelValue', 'class'],
            ),
            createVNode(
              LineChart,
              {
                'maintain-aspect-ratio': _ctx.maintainAspectRatio,
                'average-factor': unref(averageFactor),
                ydata: unref(lineChartData).equity,
                xdata: unref(lineChartData).date,
                pan: _ctx.pan,
                zoom: _ctx.zoom,
                onClick: _ctx.onChartClick,
              },
              null,
              8,
              [
                'maintain-aspect-ratio',
                'average-factor',
                'ydata',
                'xdata',
                'pan',
                'zoom',
                'onClick',
              ],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
