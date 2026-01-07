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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGllQ2hhcnQudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0ZJTkNIL1BpZUNoYXJ0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgUGllIH0gZnJvbSAndnVlLWNoYXJ0anMnO1xuaW1wb3J0IHtcbiAgQXJjRWxlbWVudCxcbiAgQ2F0ZWdvcnlTY2FsZSxcbiAgQ2hhcnQsXG4gIENoYXJ0RGF0YSxcbiAgQ2hhcnRPcHRpb25zLFxuICBMZWdlbmQsXG4gIFBpZUNvbnRyb2xsZXIsXG4gIFRvb2x0aXAsXG59IGZyb20gJ2NoYXJ0LmpzJztcbmltcG9ydCBDaGFydERhdGFMYWJlbHMgZnJvbSAnY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscyc7XG5pbXBvcnQgeyBzdW1CeSB9IGZyb20gJ0BzcmMvdXRpbHMvc3VtLWJ5JztcbmltcG9ydCB7IHBlcmNlbnQyIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuXG5DaGFydC5yZWdpc3RlcihQaWVDb250cm9sbGVyLCBBcmNFbGVtZW50LCBUb29sdGlwLCBMZWdlbmQsIENhdGVnb3J5U2NhbGUpO1xuXG5jb25zdCB7IGxhYmVsRGF0YSwgbnVtZXJpY2FsRGF0YSB9ID0gZGVmaW5lUHJvcHM8e1xuICBsYWJlbERhdGE6IHN0cmluZ1tdO1xuICBudW1lcmljYWxEYXRhOiBudW1iZXJbXTtcbn0+KCk7XG5cbmNvbnN0IERlZmF1bHRDb2xvcnMgPSBbXG4gICcjMDA0NTY0JyxcbiAgJyMwMDViNzYnLFxuICAnIzAwNzA3OScsXG4gICcjMDA4NDZjJyxcbiAgJyMwMDk1NTInLFxuICAnIzY3YTIyZScsXG4gICcjYWRhOTAwJyxcbiAgJyNmN2E2MDAnLFxuXTtcblxuY29uc3QgY29sb3JTY2hlbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCBjb2xvclNjaGVtZSA9IFsuLi5EZWZhdWx0Q29sb3JzXTtcblxuICBmb3IgKGxldCBpID0gMDsgaSA8IGxhYmVsRGF0YS5sZW5ndGggLyA4OyBpKyspIHtcbiAgICBjb2xvclNjaGVtZSA9IGNvbG9yU2NoZW1lLmNvbmNhdChEZWZhdWx0Q29sb3JzKTtcbiAgfVxuXG4gIHJldHVybiBjb2xvclNjaGVtZTtcbn0pO1xuXG5jb25zdCB0cnVuY2F0ZWRMYWJlbERhdGEgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCB0cnVuY2F0ZWRMYWJlbERhdGEgPSBbLi4ubGFiZWxEYXRhXTtcblxuICBmb3IgKGxldCBpID0gMjA7IGkgPCB0cnVuY2F0ZWRMYWJlbERhdGEubGVuZ3RoOyBpKyspIHtcbiAgICB0cnVuY2F0ZWRMYWJlbERhdGFbaV0gPSAnT3RoZXInO1xuICB9XG5cbiAgcmV0dXJuIHRydW5jYXRlZExhYmVsRGF0YTtcbn0pO1xuXG5jb25zdCBjaGFydERhdGEgPSBjb21wdXRlZDxDaGFydERhdGE8J3BpZScsIG51bWJlcltdLCBzdHJpbmc+PigoKSA9PiAoe1xuICBsYWJlbHM6IHRydW5jYXRlZExhYmVsRGF0YS52YWx1ZSxcbiAgZGF0YXNldHM6IFtcbiAgICB7XG4gICAgICBkYXRhOiBudW1lcmljYWxEYXRhLFxuICAgICAgYmFja2dyb3VuZENvbG9yOiBjb2xvclNjaGVtZS52YWx1ZSxcbiAgICAgIGhvdmVyT2Zmc2V0OiA0LFxuICAgICAgYm9yZGVyV2lkdGg6IDAsXG4gICAgfSxcbiAgXSxcbn0pKTtcblxuY29uc3QgY2hhcnRPcHRpb25zID0gY29tcHV0ZWQ8Q2hhcnRPcHRpb25zPCdwaWUnPj4oKCkgPT4gKHtcbiAgcmVzcG9uc2l2ZTogZmFsc2UsXG4gIG1haW50YWluQXNwZWN0UmF0aW86IGZhbHNlLFxuICBwbHVnaW5zOiB7XG4gICAgbGVnZW5kOiB7XG4gICAgICBkaXNwbGF5OiBmYWxzZSxcbiAgICB9LFxuICAgIHRvb2x0aXA6IHtcbiAgICAgIGNhbGxiYWNrczoge1xuICAgICAgICBsYWJlbChjb250ZXh0KSB7XG4gICAgICAgICAgY29uc3QgbGFiZWwgPSBjb250ZXh0LmxhYmVsIHx8ICcnO1xuICAgICAgICAgIGNvbnN0IHZhbHVlID0gY29udGV4dC5yYXcgYXMgbnVtYmVyO1xuICAgICAgICAgIGNvbnN0IHRvdGFsID0gc3VtQnkobnVtZXJpY2FsRGF0YSwgeCA9PiB4KTtcbiAgICAgICAgICBjb25zdCBwZXJjZW50YWdlID0gcGVyY2VudDIodmFsdWUgLyB0b3RhbCk7XG4gICAgICAgICAgcmV0dXJuIGAke2xhYmVsfTogJHtwZXJjZW50YWdlfWA7XG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0sXG4gICAgZGF0YWxhYmVsczoge1xuICAgICAgY29sb3I6ICcjY2NjY2NjJyxcbiAgICAgIGRpc3BsYXk6ICdhdXRvJyxcbiAgICAgIGZvcm1hdHRlcih2YWx1ZSwgY29udGV4dCkge1xuICAgICAgICByZXR1cm4gY29udGV4dC5jaGFydC5kYXRhLmxhYmVscyFbY29udGV4dC5kYXRhSW5kZXhdO1xuICAgICAgfSxcbiAgICAgIGFuY2hvcjogJ2VuZCcsXG4gICAgICBhbGlnbjogJ2VuZCcsXG4gICAgICB0ZXh0QWxpZ246ICdjZW50ZXInLFxuICAgICAgZm9udDoge1xuICAgICAgICB3ZWlnaHQ6ICdub3JtYWwnLFxuICAgICAgICBzaXplOiAxMSxcbiAgICAgIH0sXG4gICAgfSxcbiAgfSxcbiAgbGF5b3V0OiB7XG4gICAgcGFkZGluZzoge1xuICAgICAgbGVmdDogNjAsXG4gICAgICB0b3A6IDAsXG4gICAgICByaWdodDogNjAsXG4gICAgICBib3R0b206IDAsXG4gICAgfSxcbiAgfSxcbn0pKTtcblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmNvbnN0IGNoYXJ0UGx1Z2lucyA9IFtDaGFydERhdGFMYWJlbHMgYXMgYW55XTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxQaWUgOm9wdGlvbnM9XCJjaGFydE9wdGlvbnNcIiA6ZGF0YT1cImNoYXJ0RGF0YVwiIDpwbHVnaW5zPVwiY2hhcnRQbHVnaW5zXCIgLz5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiVG9vbHRpcCIsIkxlZ2VuZCIsIkNoYXJ0RGF0YUxhYmVscyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsVUFBQSxTQUFBLGVBQUEsWUFBQUEsZ0JBQUFDLGVBQUEsYUFBQTtBQU9BLFVBQUEsZ0JBQUE7QUFBQSxNQUFzQjtBQUFBLE1BQ3BCO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsTUFDQTtBQUFBLE1BQ0E7QUFBQSxNQUNBO0FBQUEsSUFDQTtBQUdGLFVBQUEsY0FBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLGVBQUEsQ0FBQSxHQUFBLGFBQUE7QUFFQSxlQUFBLElBQUEsR0FBQSxJQUFBLFFBQUEsVUFBQSxTQUFBLEdBQUEsS0FBQTtBQUNFLHVCQUFBLGFBQUEsT0FBQSxhQUFBO0FBQUEsTUFBOEM7QUFHaEQsYUFBQTtBQUFBLElBQU8sQ0FBQTtBQUdULFVBQUEscUJBQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxzQkFBQSxDQUFBLEdBQUEsUUFBQSxTQUFBO0FBRUEsZUFBQSxJQUFBLElBQUEsSUFBQSxvQkFBQSxRQUFBLEtBQUE7QUFDRSw0QkFBQSxDQUFBLElBQUE7QUFBQSxNQUF3QjtBQUcxQixhQUFBO0FBQUEsSUFBTyxDQUFBO0FBR1QsVUFBQSxZQUFBLFNBQUEsT0FBQTtBQUFBLE1BQXNFLFFBQUEsbUJBQUE7QUFBQSxNQUN6QyxVQUFBO0FBQUEsUUFDakI7QUFBQSxVQUNSLE1BQUEsUUFBQTtBQUFBLFVBQ1EsaUJBQUEsWUFBQTtBQUFBLFVBQ3VCLGFBQUE7QUFBQSxVQUNoQixhQUFBO0FBQUEsUUFDQTtBQUFBLE1BQ2Y7QUFBQSxJQUNGLEVBQUE7QUFHRixVQUFBLGVBQUEsU0FBQSxPQUFBO0FBQUEsTUFBMEQsWUFBQTtBQUFBLE1BQzVDLHFCQUFBO0FBQUEsTUFDUyxTQUFBO0FBQUEsUUFDWixRQUFBO0FBQUEsVUFDQyxTQUFBO0FBQUEsUUFDRztBQUFBLFFBQ1gsU0FBQTtBQUFBLFVBQ1MsV0FBQTtBQUFBLFlBQ0ksTUFBQSxTQUFBO0FBRVAsb0JBQUEsUUFBQSxRQUFBLFNBQUE7QUFDQSxvQkFBQSxRQUFBLFFBQUE7QUFDQSxvQkFBQSxRQUFBLE1BQUEsUUFBQSxlQUFBLENBQUEsTUFBQSxDQUFBO0FBQ0Esb0JBQUEsYUFBQSxTQUFBLFFBQUEsS0FBQTtBQUNBLHFCQUFBLEdBQUEsS0FBQSxLQUFBLFVBQUE7QUFBQSxZQUE4QjtBQUFBLFVBQ2hDO0FBQUEsUUFDRjtBQUFBLFFBQ0YsWUFBQTtBQUFBLFVBQ1ksT0FBQTtBQUFBLFVBQ0gsU0FBQTtBQUFBLFVBQ0UsVUFBQSxPQUFBLFNBQUE7QUFFUCxtQkFBQSxRQUFBLE1BQUEsS0FBQSxPQUFBLFFBQUEsU0FBQTtBQUFBLFVBQW1EO0FBQUEsVUFDckQsUUFBQTtBQUFBLFVBQ1EsT0FBQTtBQUFBLFVBQ0QsV0FBQTtBQUFBLFVBQ0ksTUFBQTtBQUFBLFlBQ0wsUUFBQTtBQUFBLFlBQ0ksTUFBQTtBQUFBLFVBQ0Y7QUFBQSxRQUNSO0FBQUEsTUFDRjtBQUFBLE1BQ0YsUUFBQTtBQUFBLFFBQ1EsU0FBQTtBQUFBLFVBQ0csTUFBQTtBQUFBLFVBQ0QsS0FBQTtBQUFBLFVBQ0QsT0FBQTtBQUFBLFVBQ0UsUUFBQTtBQUFBLFFBQ0M7QUFBQSxNQUNWO0FBQUEsSUFDRixFQUFBO0FBSUYsVUFBQSxlQUFBLENBQUFDLE1BQUE7OztRQUkyRSxTQUFBQyxNQUFBLFlBQUE7QUFBQSxRQUExRCxNQUFBQSxNQUFBLFNBQUE7QUFBQSxRQUFxQixTQUFBO0FBQUEsTUFBcUIsR0FBQSxNQUFBLEdBQUEsQ0FBQSxXQUFBLE1BQUEsQ0FBQTtBQUFBOzs7In0=
