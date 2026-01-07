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
