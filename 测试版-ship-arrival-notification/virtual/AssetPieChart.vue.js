import _sfc_main$1 from './PieChart.vue.js';
import { liveBalanceSummary } from './balance-sheet-live.js';
import { defineComponent, createBlock, openBlock } from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AssetPieChart',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          {
            'label-data': ['Current', 'Non-Current'],
            'numerical-data': [
              unref(liveBalanceSummary).currentAssets ?? 0,
              unref(liveBalanceSummary).nonCurrentAssets ?? 0,
            ],
          },
          null,
          8,
          ['numerical-data'],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXNzZXRQaWVDaGFydC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvRklOQ0gvQXNzZXRQaWVDaGFydC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBQaWVDaGFydCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9GSU5DSC9QaWVDaGFydC52dWUnO1xuaW1wb3J0IHsgbGl2ZUJhbGFuY2VTdW1tYXJ5IH0gZnJvbSAnQHNyYy9jb3JlL2JhbGFuY2UvYmFsYW5jZS1zaGVldC1saXZlJztcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxQaWVDaGFydFxuICAgIDpsYWJlbC1kYXRhPVwiWydDdXJyZW50JywgJ05vbi1DdXJyZW50J11cIlxuICAgIDpudW1lcmljYWwtZGF0YT1cIltcbiAgICAgIGxpdmVCYWxhbmNlU3VtbWFyeS5jdXJyZW50QXNzZXRzID8/IDAsXG4gICAgICBsaXZlQmFsYW5jZVN1bW1hcnkubm9uQ3VycmVudEFzc2V0cyA/PyAwLFxuICAgIF1cIiAvPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQmxvY2siLCJQaWVDaGFydCIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7MEJBTUVBLFlBS09DLGFBQUE7QUFBQSxRQUpKLGNBQVksQ0FBQSxXQUFBLGFBQUE7QUFBQSxRQUNaLGtCQUFjO0FBQUEsVUFBVUMsTUFBQSxrQkFBQSxFQUFtQixpQkFBYTtBQUFBLFVBQWFBLE1BQUEsa0JBQUEsRUFBbUIsb0JBQWdCO0FBQUEsUUFBQTtBQUFBOzs7OyJ9
