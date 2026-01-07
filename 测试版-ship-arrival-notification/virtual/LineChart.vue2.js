import { Line } from './index15.js';
import {
  Chart,
  LineController,
  LineElement,
  PointElement,
  LinearScale,
  Title as plugin_title,
  Tooltip as plugin_tooltip,
  CategoryScale,
  TimeScale,
} from './chart.js';
import plugin from './chartjs-plugin-zoom.esm.js';
import { formatCurrency, hhmm, ddmmyyyy, fixed0, ddmm } from './format.js';
import {
  defineComponent,
  computed,
  useTemplateRef,
  onMounted,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass, normalizeStyle } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'LineChart',
  props: {
    averageFactor: { default: 0.2 },
    maintainAspectRatio: { type: Boolean },
    pan: { type: Boolean },
    xdata: {},
    ydata: {},
    zoom: { type: Boolean },
  },
  setup(__props) {
    Chart.register(
      LineController,
      LineElement,
      PointElement,
      LinearScale,
      plugin_title,
      plugin_tooltip,
      CategoryScale,
      TimeScale,
    );
    const sortedYData = computed(() => __props.ydata.slice().sort((a, b) => a - b));
    function calculateMovingAverage(data, factor) {
      factor = Math.min(Math.max(factor, 0), 1);
      const windowSize = Math.max(Math.floor(factor * data.length), 1);
      if (windowSize === 1) {
        return data;
      }
      const halfWindow = Math.floor(windowSize / 2);
      const movingAverage = [];
      movingAverage.push(data[0]);
      let sum = data[0];
      let start = 0;
      let end = 0;
      for (let i = 1; i < data.length; i++) {
        let chunkStart = i - halfWindow;
        let chunkEnd = i + halfWindow;
        if (chunkStart < 0) {
          chunkEnd += chunkStart;
          chunkStart = 0;
        } else if (chunkEnd >= data.length) {
          chunkStart += chunkEnd - data.length + 1;
          chunkEnd = data.length - 1;
          if (chunkStart === chunkEnd) {
            chunkStart = chunkEnd - 1;
          }
        }
        while (chunkStart > start) {
          sum -= data[start++];
        }
        while (chunkEnd > end) {
          sum += data[++end];
        }
        movingAverage.push(sum / (end - start + 1));
      }
      return movingAverage;
    }
    const chartData = computed(() => ({
      labels: __props.xdata,
      datasets: [
        {
          label: 'Equity',
          data: __props.ydata,
          borderColor: '#f7a600',
          fill: false,
          pointRadius: 0.25,
          pointBackgroundColor: '#f7a600',
          showLine: false,
        },
        {
          label: void 0,
          data: calculateMovingAverage(__props.ydata, __props.averageFactor),
          borderColor: '#f7a600',
          fill: false,
          pointRadius: 0,
          pointHitRadius: 0,
        },
      ],
    }));
    const chartOptions = computed(() => ({
      maintainAspectRatio: __props.maintainAspectRatio,
      scales: {
        x: {
          type: 'time',
          title: {
            display: true,
            text: 'Date',
            color: '#eeeeee',
            font: {
              family: '"Droid Sans", sans-serif',
            },
          },
          grid: {
            color: '#505050',
          },
          ticks: {
            color: '#999',
            callback(value) {
              return ddmm(Number(value));
            },
          },
        },
        y: {
          type: 'linear',
          title: {
            display: true,
            text: 'Equity',
            color: '#eeeeee',
            font: {
              family: '"Droid Sans", sans-serif',
            },
          },
          grid: {
            color: '#505050',
          },
          ticks: {
            color: '#999',
            callback(value) {
              if (typeof value === 'number') {
                return `${fixed0(value / 1e6)}M`;
              }
              return value;
            },
          },
        },
      },
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          mode: 'nearest',
          axis: 'x',
          intersect: false,
          callbacks: {
            title(items) {
              const item = items[0];
              const timestamp = item?.parsed?.x;
              if (timestamp === void 0) {
                return;
              }
              return `${hhmm(timestamp)} ${ddmmyyyy(timestamp)}`;
            },
            label(item) {
              let label = item.dataset.label || '';
              if (label) {
                label += ': ';
              }
              label += formatCurrency(item.parsed.y);
              return label;
            },
          },
          filter: tooltip => tooltip.datasetIndex === 0,
        },
        zoom: {
          limits: {
            x: { min: __props.xdata[0], max: __props.xdata[__props.xdata.length - 1] },
            y: {
              min: 0,
              max: sortedYData.value[sortedYData.value.length - 1] + sortedYData.value[0],
            },
          },
          pan: {
            enabled: __props.pan,
            mode: 'xy',
            threshold: 5,
          },
          zoom: {
            wheel: {
              enabled: __props.zoom,
            },
            pinch: {
              enabled: __props.zoom,
            },
            mode: 'xy',
          },
        },
      },
      elements: {
        point: {
          radius: 0,
        },
      },
    }));
    const outerContainer = useTemplateRef('outer-container');
    const chartWidth = ref(400);
    const chartHeight = ref(200);
    onMounted(() => {
      const container = outerContainer.value;
      const resizeObserver = new ResizeObserver(() => {
        chartWidth.value = container.clientWidth;
        chartHeight.value = __props.maintainAspectRatio
          ? container.clientWidth / 2
          : container.clientHeight;
      });
      resizeObserver.observe(container);
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            ref: 'outer-container',
            class: normalizeClass(_ctx.$style.outer),
          },
          [
            createBaseVNode(
              'div',
              {
                style: normalizeStyle({
                  position: 'relative',
                  width: `${unref(chartWidth)}px`,
                  height: `${unref(chartHeight)}px`,
                }),
              },
              [
                createVNode(
                  unref(Line),
                  {
                    options: unref(chartOptions),
                    data: unref(chartData),
                    plugins: [unref(plugin)],
                  },
                  null,
                  8,
                  ['options', 'data', 'plugins'],
                ),
              ],
              4,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTGluZUNoYXJ0LnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvRklOQ0gvTGluZUNoYXJ0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgTGluZSB9IGZyb20gJ3Z1ZS1jaGFydGpzJztcbmltcG9ydCB7XG4gIENhdGVnb3J5U2NhbGUsXG4gIENoYXJ0LFxuICBDaGFydERhdGEsXG4gIENoYXJ0T3B0aW9ucyxcbiAgTGluZWFyU2NhbGUsXG4gIExpbmVDb250cm9sbGVyLFxuICBMaW5lRWxlbWVudCxcbiAgUG9pbnRFbGVtZW50LFxuICBUaW1lU2NhbGUsXG4gIFRpdGxlLFxuICBUb29sdGlwLFxufSBmcm9tICdjaGFydC5qcyc7XG5pbXBvcnQgem9vbVBsdWdpbiBmcm9tICdjaGFydGpzLXBsdWdpbi16b29tJztcbmltcG9ydCB7IGZpeGVkMCwgaGhtbSwgZGRtbSwgZGRtbXl5eXksIGZvcm1hdEN1cnJlbmN5IH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuXG5DaGFydC5yZWdpc3RlcihcbiAgTGluZUNvbnRyb2xsZXIsXG4gIExpbmVFbGVtZW50LFxuICBQb2ludEVsZW1lbnQsXG4gIExpbmVhclNjYWxlLFxuICBUaXRsZSxcbiAgVG9vbHRpcCxcbiAgQ2F0ZWdvcnlTY2FsZSxcbiAgVGltZVNjYWxlLFxuKTtcblxuY29uc3Qge1xuICBhdmVyYWdlRmFjdG9yID0gMC4yLFxuICBtYWludGFpbkFzcGVjdFJhdGlvLFxuICBwYW4sXG4gIHhkYXRhLFxuICB5ZGF0YSxcbiAgem9vbSxcbn0gPSBkZWZpbmVQcm9wczx7XG4gIGF2ZXJhZ2VGYWN0b3I/OiBudW1iZXI7XG4gIG1haW50YWluQXNwZWN0UmF0aW8/OiBib29sZWFuO1xuICBwYW4/OiBib29sZWFuO1xuICB4ZGF0YTogbnVtYmVyW107XG4gIHlkYXRhOiBudW1iZXJbXTtcbiAgem9vbT86IGJvb2xlYW47XG59PigpO1xuXG5jb25zdCBzb3J0ZWRZRGF0YSA9IGNvbXB1dGVkKCgpID0+IHlkYXRhLnNsaWNlKCkuc29ydCgoYSwgYikgPT4gYSAtIGIpKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlTW92aW5nQXZlcmFnZShkYXRhOiBudW1iZXJbXSwgZmFjdG9yOiBudW1iZXIpIHtcbiAgZmFjdG9yID0gTWF0aC5taW4oTWF0aC5tYXgoZmFjdG9yLCAwKSwgMSk7XG4gIGNvbnN0IHdpbmRvd1NpemUgPSBNYXRoLm1heChNYXRoLmZsb29yKGZhY3RvciAqIGRhdGEubGVuZ3RoKSwgMSk7XG4gIGlmICh3aW5kb3dTaXplID09PSAxKSB7XG4gICAgcmV0dXJuIGRhdGE7XG4gIH1cblxuICBjb25zdCBoYWxmV2luZG93ID0gTWF0aC5mbG9vcih3aW5kb3dTaXplIC8gMik7XG4gIGNvbnN0IG1vdmluZ0F2ZXJhZ2U6IG51bWJlcltdID0gW107XG5cbiAgbW92aW5nQXZlcmFnZS5wdXNoKGRhdGFbMF0pO1xuXG4gIGxldCBzdW0gPSBkYXRhWzBdO1xuICBsZXQgc3RhcnQgPSAwO1xuICBsZXQgZW5kID0gMDtcblxuICBmb3IgKGxldCBpID0gMTsgaSA8IGRhdGEubGVuZ3RoOyBpKyspIHtcbiAgICBsZXQgY2h1bmtTdGFydCA9IGkgLSBoYWxmV2luZG93O1xuICAgIGxldCBjaHVua0VuZCA9IGkgKyBoYWxmV2luZG93O1xuXG4gICAgaWYgKGNodW5rU3RhcnQgPCAwKSB7XG4gICAgICBjaHVua0VuZCArPSBjaHVua1N0YXJ0O1xuICAgICAgY2h1bmtTdGFydCA9IDA7XG4gICAgfSBlbHNlIGlmIChjaHVua0VuZCA+PSBkYXRhLmxlbmd0aCkge1xuICAgICAgY2h1bmtTdGFydCArPSBjaHVua0VuZCAtIGRhdGEubGVuZ3RoICsgMTtcbiAgICAgIGNodW5rRW5kID0gZGF0YS5sZW5ndGggLSAxO1xuICAgICAgaWYgKGNodW5rU3RhcnQgPT09IGNodW5rRW5kKSB7XG4gICAgICAgIGNodW5rU3RhcnQgPSBjaHVua0VuZCAtIDE7XG4gICAgICB9XG4gICAgfVxuXG4gICAgd2hpbGUgKGNodW5rU3RhcnQgPiBzdGFydCkge1xuICAgICAgc3VtIC09IGRhdGFbc3RhcnQrK107XG4gICAgfVxuXG4gICAgd2hpbGUgKGNodW5rRW5kID4gZW5kKSB7XG4gICAgICBzdW0gKz0gZGF0YVsrK2VuZF07XG4gICAgfVxuXG4gICAgbW92aW5nQXZlcmFnZS5wdXNoKHN1bSAvIChlbmQgLSBzdGFydCArIDEpKTtcbiAgfVxuXG4gIHJldHVybiBtb3ZpbmdBdmVyYWdlO1xufVxuXG5jb25zdCBjaGFydERhdGEgPSBjb21wdXRlZDxDaGFydERhdGE8J2xpbmUnLCBudW1iZXJbXSwgbnVtYmVyIHwgc3RyaW5nIHwgRGF0ZT4+KCgpID0+ICh7XG4gIGxhYmVsczogeGRhdGEsXG4gIGRhdGFzZXRzOiBbXG4gICAge1xuICAgICAgbGFiZWw6ICdFcXVpdHknLFxuICAgICAgZGF0YTogeWRhdGEsXG4gICAgICBib3JkZXJDb2xvcjogJyNmN2E2MDAnLFxuICAgICAgZmlsbDogZmFsc2UsXG4gICAgICBwb2ludFJhZGl1czogMC4yNSxcbiAgICAgIHBvaW50QmFja2dyb3VuZENvbG9yOiAnI2Y3YTYwMCcsXG4gICAgICBzaG93TGluZTogZmFsc2UsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogdW5kZWZpbmVkLFxuICAgICAgZGF0YTogY2FsY3VsYXRlTW92aW5nQXZlcmFnZSh5ZGF0YSwgYXZlcmFnZUZhY3RvciksXG4gICAgICBib3JkZXJDb2xvcjogJyNmN2E2MDAnLFxuICAgICAgZmlsbDogZmFsc2UsXG4gICAgICBwb2ludFJhZGl1czogMCxcbiAgICAgIHBvaW50SGl0UmFkaXVzOiAwLFxuICAgIH0sXG4gIF0sXG59KSk7XG5cbmNvbnN0IGNoYXJ0T3B0aW9ucyA9IGNvbXB1dGVkPENoYXJ0T3B0aW9uczwnbGluZSc+PigoKSA9PiAoe1xuICBtYWludGFpbkFzcGVjdFJhdGlvOiBtYWludGFpbkFzcGVjdFJhdGlvLFxuICBzY2FsZXM6IHtcbiAgICB4OiB7XG4gICAgICB0eXBlOiAndGltZScsXG4gICAgICB0aXRsZToge1xuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICB0ZXh0OiAnRGF0ZScsXG4gICAgICAgIGNvbG9yOiAnI2VlZWVlZScsXG4gICAgICAgIGZvbnQ6IHtcbiAgICAgICAgICBmYW1pbHk6ICdcIkRyb2lkIFNhbnNcIiwgc2Fucy1zZXJpZicsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZ3JpZDoge1xuICAgICAgICBjb2xvcjogJyM1MDUwNTAnLFxuICAgICAgfSxcbiAgICAgIHRpY2tzOiB7XG4gICAgICAgIGNvbG9yOiAnIzk5OScsXG4gICAgICAgIGNhbGxiYWNrKHZhbHVlOiBzdHJpbmcgfCBudW1iZXIpIHtcbiAgICAgICAgICByZXR1cm4gZGRtbShOdW1iZXIodmFsdWUpKTtcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSxcbiAgICB5OiB7XG4gICAgICB0eXBlOiAnbGluZWFyJyxcbiAgICAgIHRpdGxlOiB7XG4gICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgIHRleHQ6ICdFcXVpdHknLFxuICAgICAgICBjb2xvcjogJyNlZWVlZWUnLFxuICAgICAgICBmb250OiB7XG4gICAgICAgICAgZmFtaWx5OiAnXCJEcm9pZCBTYW5zXCIsIHNhbnMtc2VyaWYnLFxuICAgICAgICB9LFxuICAgICAgfSxcbiAgICAgIGdyaWQ6IHtcbiAgICAgICAgY29sb3I6ICcjNTA1MDUwJyxcbiAgICAgIH0sXG4gICAgICB0aWNrczoge1xuICAgICAgICBjb2xvcjogJyM5OTknLFxuICAgICAgICBjYWxsYmFjayh2YWx1ZTogc3RyaW5nIHwgbnVtYmVyKSB7XG4gICAgICAgICAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ251bWJlcicpIHtcbiAgICAgICAgICAgIHJldHVybiBgJHtmaXhlZDAodmFsdWUgLyAxXzAwMF8wMDApfU1gO1xuICAgICAgICAgIH1cbiAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIHBsdWdpbnM6IHtcbiAgICBsZWdlbmQ6IHtcbiAgICAgIGRpc3BsYXk6IGZhbHNlLFxuICAgIH0sXG4gICAgdG9vbHRpcDoge1xuICAgICAgbW9kZTogJ25lYXJlc3QnLFxuICAgICAgYXhpczogJ3gnLFxuICAgICAgaW50ZXJzZWN0OiBmYWxzZSxcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICB0aXRsZShpdGVtcyk6IHN0cmluZyB8IHZvaWQge1xuICAgICAgICAgIGNvbnN0IGl0ZW0gPSBpdGVtc1swXTtcbiAgICAgICAgICBjb25zdCB0aW1lc3RhbXAgPSBpdGVtPy5wYXJzZWQ/Lng7XG4gICAgICAgICAgaWYgKHRpbWVzdGFtcCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgICAgICAgICByZXR1cm47XG4gICAgICAgICAgfVxuICAgICAgICAgIHJldHVybiBgJHtoaG1tKHRpbWVzdGFtcCl9ICR7ZGRtbXl5eXkodGltZXN0YW1wKX1gO1xuICAgICAgICB9LFxuICAgICAgICBsYWJlbChpdGVtKTogc3RyaW5nIHwgdm9pZCB7XG4gICAgICAgICAgbGV0IGxhYmVsID0gaXRlbS5kYXRhc2V0LmxhYmVsIHx8ICcnO1xuXG4gICAgICAgICAgaWYgKGxhYmVsKSB7XG4gICAgICAgICAgICBsYWJlbCArPSAnOiAnO1xuICAgICAgICAgIH1cbiAgICAgICAgICBsYWJlbCArPSBmb3JtYXRDdXJyZW5jeShpdGVtLnBhcnNlZC55KTtcbiAgICAgICAgICByZXR1cm4gbGFiZWw7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgICAgZmlsdGVyOiB0b29sdGlwID0+IHRvb2x0aXAuZGF0YXNldEluZGV4ID09PSAwLFxuICAgIH0sXG4gICAgem9vbToge1xuICAgICAgbGltaXRzOiB7XG4gICAgICAgIHg6IHsgbWluOiB4ZGF0YVswXSwgbWF4OiB4ZGF0YVt4ZGF0YS5sZW5ndGggLSAxXSB9LFxuICAgICAgICB5OiB7IG1pbjogMCwgbWF4OiBzb3J0ZWRZRGF0YS52YWx1ZVtzb3J0ZWRZRGF0YS52YWx1ZS5sZW5ndGggLSAxXSArIHNvcnRlZFlEYXRhLnZhbHVlWzBdIH0sXG4gICAgICB9LFxuICAgICAgcGFuOiB7XG4gICAgICAgIGVuYWJsZWQ6IHBhbixcbiAgICAgICAgbW9kZTogJ3h5JyxcbiAgICAgICAgdGhyZXNob2xkOiA1LFxuICAgICAgfSxcbiAgICAgIHpvb206IHtcbiAgICAgICAgd2hlZWw6IHtcbiAgICAgICAgICBlbmFibGVkOiB6b29tLFxuICAgICAgICB9LFxuICAgICAgICBwaW5jaDoge1xuICAgICAgICAgIGVuYWJsZWQ6IHpvb20sXG4gICAgICAgIH0sXG4gICAgICAgIG1vZGU6ICd4eScsXG4gICAgICB9LFxuICAgIH0sXG4gIH0sXG4gIGVsZW1lbnRzOiB7XG4gICAgcG9pbnQ6IHtcbiAgICAgIHJhZGl1czogMCxcbiAgICB9LFxuICB9LFxufSkpO1xuXG5jb25zdCBvdXRlckNvbnRhaW5lciA9IHVzZVRlbXBsYXRlUmVmPEhUTUxEaXZFbGVtZW50Pignb3V0ZXItY29udGFpbmVyJyk7XG5jb25zdCBjaGFydFdpZHRoID0gcmVmKDQwMCk7XG5jb25zdCBjaGFydEhlaWdodCA9IHJlZigyMDApO1xuXG5vbk1vdW50ZWQoKCkgPT4ge1xuICBjb25zdCBjb250YWluZXIgPSBvdXRlckNvbnRhaW5lci52YWx1ZSE7XG4gIGNvbnN0IHJlc2l6ZU9ic2VydmVyID0gbmV3IFJlc2l6ZU9ic2VydmVyKCgpID0+IHtcbiAgICBjaGFydFdpZHRoLnZhbHVlID0gY29udGFpbmVyLmNsaWVudFdpZHRoO1xuICAgIGNoYXJ0SGVpZ2h0LnZhbHVlID0gbWFpbnRhaW5Bc3BlY3RSYXRpbyA/IGNvbnRhaW5lci5jbGllbnRXaWR0aCAvIDIgOiBjb250YWluZXIuY2xpZW50SGVpZ2h0O1xuICB9KTtcblxuICByZXNpemVPYnNlcnZlci5vYnNlcnZlKGNvbnRhaW5lcik7XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgcmVmPVwib3V0ZXItY29udGFpbmVyXCIgOmNsYXNzPVwiJHN0eWxlLm91dGVyXCI+XG4gICAgPGRpdiA6c3R5bGU9XCJ7IHBvc2l0aW9uOiAncmVsYXRpdmUnLCB3aWR0aDogYCR7Y2hhcnRXaWR0aH1weGAsIGhlaWdodDogYCR7Y2hhcnRIZWlnaHR9cHhgIH1cIj5cbiAgICAgIDxMaW5lIDpvcHRpb25zPVwiY2hhcnRPcHRpb25zXCIgOmRhdGE9XCJjaGFydERhdGFcIiA6cGx1Z2lucz1cIlt6b29tUGx1Z2luXVwiIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5vdXRlciB7XG4gIGZsZXgtZ3JvdzogMTtcbiAgb3ZlcmZsb3c6IGhpZGRlbjtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiVGl0bGUiLCJUb29sdGlwIiwiX25vcm1hbGl6ZUNsYXNzIiwiX25vcm1hbGl6ZVN0eWxlIiwiX3VucmVmIiwiem9vbVBsdWdpbiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBa0JBLFVBQUE7QUFBQSxNQUFNO0FBQUEsTUFDSjtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQUE7QUFBQUEsTUFDQUM7QUFBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxJQUNBO0FBbUJGLFVBQUEsY0FBQSxTQUFBLE1BQUEsUUFBQSxNQUFBLE1BQUEsRUFBQSxLQUFBLENBQUEsR0FBQSxNQUFBLElBQUEsQ0FBQSxDQUFBO0FBRUEsYUFBQSx1QkFBQSxNQUFBLFFBQUE7QUFDRSxlQUFBLEtBQUEsSUFBQSxLQUFBLElBQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUNBLFlBQUEsYUFBQSxLQUFBLElBQUEsS0FBQSxNQUFBLFNBQUEsS0FBQSxNQUFBLEdBQUEsQ0FBQTtBQUNBLFVBQUEsZUFBQSxHQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFHVCxZQUFBLGFBQUEsS0FBQSxNQUFBLGFBQUEsQ0FBQTtBQUNBLFlBQUEsZ0JBQUEsQ0FBQTtBQUVB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
