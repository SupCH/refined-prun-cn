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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRXF1aXR5SGlzdG9yeUNoYXJ0LnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvRklOQ0gvRXF1aXR5SGlzdG9yeUNoYXJ0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IExpbmVDaGFydCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9GSU5DSC9MaW5lQ2hhcnQudnVlJztcbmltcG9ydCB7IHBlcmNlbnQwIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgY2FsY0VxdWl0eSB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL2JhbGFuY2Utc2hlZXQtc3VtbWFyeSc7XG5pbXBvcnQgeyBiYWxhbmNlSGlzdG9yeSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhLWJhbGFuY2UnO1xuaW1wb3J0IHsgdXNlVGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtdGlsZXMnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcbmltcG9ydCBSYW5nZUlucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9SYW5nZUlucHV0LnZ1ZSc7XG5cbmRlZmluZVByb3BzPHtcbiAgbWFpbnRhaW5Bc3BlY3RSYXRpbz86IGJvb2xlYW47XG4gIG9uQ2hhcnRDbGljaz86ICgpID0+IHZvaWQ7XG4gIHBhbj86IGJvb2xlYW47XG4gIHpvb20/OiBib29sZWFuO1xufT4oKTtcblxuY29uc3QgYXZlcmFnZUZhY3RvciA9IHVzZVRpbGVTdGF0ZSgnYXZlcmFnZUZhY3RvcicsIDAuMSk7XG5jb25zdCBhdmVyYWdlRmFjdG9yVGV4dCA9IHJlZihhdmVyYWdlRmFjdG9yLnZhbHVlKTtcbndhdGNoKGF2ZXJhZ2VGYWN0b3JUZXh0LCB4ID0+IHtcbiAgY29uc3QgcGFyc2VkID0gdHlwZW9mIHggPT09ICdudW1iZXInID8geCA6IHBhcnNlRmxvYXQoeCk7XG4gIGlmIChpc0Zpbml0ZShwYXJzZWQpKSB7XG4gICAgYXZlcmFnZUZhY3Rvci52YWx1ZSA9IHBhcnNlZDtcbiAgfVxufSk7XG5cbmNvbnN0IGxpbmVDaGFydERhdGEgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGRhdGU6IG51bWJlcltdID0gW107XG4gIGNvbnN0IGVxdWl0eVZhbHVlczogbnVtYmVyW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IGVudHJ5IG9mIGJhbGFuY2VIaXN0b3J5LnZhbHVlKSB7XG4gICAgY29uc3QgZXF1aXR5ID0gY2FsY0VxdWl0eShlbnRyeSk7XG4gICAgaWYgKGVxdWl0eSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG5cbiAgICBjb25zdCBwcmV2aW91c0RheSA9IGRhdGVbZGF0ZS5sZW5ndGggLSAxXTtcbiAgICBpZiAocHJldmlvdXNEYXkgIT09IHVuZGVmaW5lZCAmJiBkYXlqcyhwcmV2aW91c0RheSkuaXNTYW1lKGVudHJ5LnRpbWVzdGFtcCwgJ2RheScpKSB7XG4gICAgICBkYXRlW2RhdGUubGVuZ3RoIC0gMV0gPSBlbnRyeS50aW1lc3RhbXA7XG4gICAgICBlcXVpdHlWYWx1ZXNbZXF1aXR5VmFsdWVzLmxlbmd0aCAtIDFdID0gZXF1aXR5O1xuICAgIH0gZWxzZSB7XG4gICAgICBkYXRlLnB1c2goZW50cnkudGltZXN0YW1wKTtcbiAgICAgIGVxdWl0eVZhbHVlcy5wdXNoKGVxdWl0eSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBkYXRlLFxuICAgIGVxdWl0eTogZXF1aXR5VmFsdWVzLFxuICB9O1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS53aWRlXCI+U21vb3RoaW5nOiB7eyBwZXJjZW50MChhdmVyYWdlRmFjdG9yKSB9fTwvZGl2PlxuICA8UmFuZ2VJbnB1dCB2LW1vZGVsPVwiYXZlcmFnZUZhY3RvclRleHRcIiA6Y2xhc3M9XCIkc3R5bGUud2lkZVwiIDptaW49XCIwXCIgOm1heD1cIjFcIiA6c3RlcD1cIjAuMDFcIiAvPlxuICA8TGluZUNoYXJ0XG4gICAgOm1haW50YWluLWFzcGVjdC1yYXRpbz1cIm1haW50YWluQXNwZWN0UmF0aW9cIlxuICAgIDphdmVyYWdlLWZhY3Rvcj1cImF2ZXJhZ2VGYWN0b3JcIlxuICAgIDp5ZGF0YT1cImxpbmVDaGFydERhdGEuZXF1aXR5XCJcbiAgICA6eGRhdGE9XCJsaW5lQ2hhcnREYXRhLmRhdGVcIlxuICAgIDpwYW49XCJwYW5cIlxuICAgIDp6b29tPVwiem9vbVwiXG4gICAgQGNsaWNrPVwib25DaGFydENsaWNrXCIgLz5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4ud2lkZSB7XG4gIHdpZHRoOiAxMDAlO1xuICB0ZXh0LWFsaWduOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiLCJfY3JlYXRlVk5vZGUiLCJfaXNSZWYiLCJtYWludGFpbkFzcGVjdFJhdGlvIiwicGFuIiwiem9vbSIsIm9uQ2hhcnRDbGljayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxVQUFBLGdCQUFBLGFBQUEsaUJBQUEsR0FBQTtBQUNBLFVBQUEsb0JBQUEsSUFBQSxjQUFBLEtBQUE7QUFDQSxVQUFBLG1CQUFBLENBQUEsTUFBQTtBQUNFLFlBQUEsU0FBQSxPQUFBLE1BQUEsV0FBQSxJQUFBLFdBQUEsQ0FBQTtBQUNBLFVBQUEsU0FBQSxNQUFBLEdBQUE7QUFDRSxzQkFBQSxRQUFBO0FBQUEsTUFBc0I7QUFBQSxJQUN4QixDQUFBO0FBR0YsVUFBQSxnQkFBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLE9BQUEsQ0FBQTtBQUNBLFlBQUEsZUFBQSxDQUFBO0FBRUEsaUJBQUEsU0FBQSxlQUFBLE9BQUE7QUFDRSxjQUFBLFNBQUEsV0FBQSxLQUFBO0FBQ0EsWUFBQSxXQUFBLFFBQUE7QUFDRTtBQUFBLFFBQUE7QUFHRixjQUFBLGNBQUEsS0FBQSxLQUFBLFNBQUEsQ0FBQTtBQUNBLFlBQUEsZ0JBQUEsVUFBQSxNQUFBLFdBQUEsRUFBQSxPQUFBLE1BQUEsV0FBQSxLQUFBLEdBQUE7QUFDRSxlQUFBLEtBQUEsU0FBQSxDQUFBLElBQUEsTUFBQTtBQUNBLHVCQUFBLGFBQUEsU0FBQSxDQUFBLElBQUE7QUFBQSxRQUF3QyxPQUFBO0FBRXhDLGVBQUEsS0FBQSxNQUFBLFNBQUE7QUFDQSx1QkFBQSxLQUFBLE1BQUE7QUFBQSxRQUF3QjtBQUFBLE1BQzFCO0FBR0YsYUFBQTtBQUFBLFFBQU87QUFBQSxRQUNMLFFBQUE7QUFBQSxNQUNRO0FBQUEsSUFDVixDQUFBOzs7O1VBS3dFLE9BQUFBLGVBQUEsS0FBQSxPQUFBLElBQUE7QUFBQSxRQUFoRCxHQUFBLGdCQUFBQyxnQkFBQUMsTUFBQSxRQUFBLEVBQUFBLE1BQUEsYUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsUUFBc0NDLFlBQUEsWUFBQTtBQUFBLFVBQ2dDLFlBQUFELE1BQUEsaUJBQUE7QUFBQSxVQUF6RSx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFFLE1BQUEsaUJBQUEsSUFBQSxrQkFBQSxRQUFBLFNBQUE7QUFBQSxVQUFpQixPQUFBSixlQUFBLEtBQUEsT0FBQSxJQUFBO0FBQUEsVUFBcUIsS0FBQTtBQUFBLFVBQVEsS0FBQTtBQUFBLFVBQVMsTUFBQTtBQUFBLFFBQVUsR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLE9BQUEsQ0FBQTtBQUFBO1VBUTVELHlCQUFBLEtBQUE7QUFBQSxVQU5BSyxrQkFBQUEsTUFBQUEsYUFBQUE7QUFBQUEsVUFDUCxPQUFBSCxNQUFBLGFBQUEsRUFBQTtBQUFBLFVBQ0ssT0FBQUEsTUFBQSxhQUFBLEVBQUE7QUFBQSxVQUNBLEtBQUEsS0FBQTtBQUFBLFVBQ2hCSSxNQUFBQSxLQUFBQTtBQUFBQSxVQUNDQyxTQUFBQSxLQUFBQTtBQUFBQSxRQUNDQyxHQUFBQSxNQUFBQSxHQUFBQSxDQUFBQSx5QkFBQUEsa0JBQUFBLFNBQUFBLFNBQUFBLE9BQUFBLFFBQUFBLFNBQUFBLENBQUFBO0FBQUFBOzs7OyJ9
