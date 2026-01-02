import { Pie } from './index15.js';
import {
  Chart,
  PieController,
  ArcElement,
  Tooltip as plugin_tooltip,
  Legend as plugin_legend,
  CategoryScale,
} from './chart.js';
import plugin from './chartjs-plugin-datalabels.esm.js';
import { sumBy } from './sum-by.js';
import { percent2 } from './format.js';
import { defineComponent, computed, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PieChart',
  props: {
    labelData: {},
    numericalData: {},
  },
  setup(__props) {
    Chart.register(PieController, ArcElement, plugin_tooltip, plugin_legend, CategoryScale);
    const DefaultColors = [
      '#004564',
      '#005b76',
      '#007079',
      '#00846c',
      '#009552',
      '#67a22e',
      '#ada900',
      '#f7a600',
    ];
    const colorScheme = computed(() => {
      let colorScheme2 = [...DefaultColors];
      for (let i = 0; i < __props.labelData.length / 8; i++) {
        colorScheme2 = colorScheme2.concat(DefaultColors);
      }
      return colorScheme2;
    });
    const truncatedLabelData = computed(() => {
      let truncatedLabelData2 = [...__props.labelData];
      for (let i = 20; i < truncatedLabelData2.length; i++) {
        truncatedLabelData2[i] = 'Other';
      }
      return truncatedLabelData2;
    });
    const chartData = computed(() => ({
      labels: truncatedLabelData.value,
      datasets: [
        {
          data: __props.numericalData,
          backgroundColor: colorScheme.value,
          hoverOffset: 4,
          borderWidth: 0,
        },
      ],
    }));
    const chartOptions = computed(() => ({
      responsive: false,
      maintainAspectRatio: false,
      plugins: {
        legend: {
          display: false,
        },
        tooltip: {
          callbacks: {
            label(context) {
              const label = context.label || '';
              const value = context.raw;
              const total = sumBy(__props.numericalData, x => x);
              const percentage = percent2(value / total);
              return `${label}: ${percentage}`;
            },
          },
        },
        datalabels: {
          color: '#cccccc',
          display: 'auto',
          formatter(value, context) {
            return context.chart.data.labels[context.dataIndex];
          },
          anchor: 'end',
          align: 'end',
          textAlign: 'center',
          font: {
            weight: 'normal',
            size: 11,
          },
        },
      },
      layout: {
        padding: {
          left: 60,
          top: 0,
          right: 60,
          bottom: 0,
        },
      },
    }));
    const chartPlugins = [plugin];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          unref(Pie),
          {
            options: unref(chartOptions),
            data: unref(chartData),
            plugins: chartPlugins,
          },
          null,
          8,
          ['options', 'data'],
        )
      );
    };
  },
});
export { _sfc_main as default };
