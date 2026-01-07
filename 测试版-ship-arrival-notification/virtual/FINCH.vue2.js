import _sfc_main$1 from './FinHeader.vue.js';
import EquityHistoryChart from './EquityHistoryChart.vue.js';
import _sfc_main$2 from './AssetPieChart.vue.js';
import _sfc_main$3 from './LocationsPieChart.vue.js';
import { showBuffer } from './buffers.js';
import { useXitParameters } from './use-xit-parameters.js';
import SectionHeader from './SectionHeader.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { style: { marginTop: '5px' } };
const _hoisted_2 = { key: 3 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FINCH',
  setup(__props) {
    const parameters = useXitParameters();
    const parameter = parameters[0]?.toUpperCase();
    const finch = ref(Math.random() < 0.01);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.root),
          },
          [
            unref(finch)
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    createVNode(SectionHeader, null, {
                      default: withCtx(() => [
                        ...(_cache[3] || (_cache[3] = [createTextVNode('Finch', -1)])),
                      ]),
                      _: 1,
                    }),
                    createBaseVNode(
                      'img',
                      {
                        src: 'https://refined-prun.github.io/assets/finch.jpeg',
                        alt: 'Finch',
                        class: normalizeClass(_ctx.$style.clickable),
                        onClick: _cache[0] || (_cache[0] = $event => (finch.value = false)),
                      },
                      null,
                      2,
                    ),
                  ],
                  64,
                ))
              : !unref(parameter)
                ? (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    [
                      createVNode(_sfc_main$1, null, {
                        default: withCtx(() => [
                          ...(_cache[4] || (_cache[4] = [createTextVNode('Equity History', -1)])),
                        ]),
                        _: 1,
                      }),
                      createBaseVNode(
                        'div',
                        {
                          style: { marginTop: '5px' },
                          class: normalizeClass(_ctx.$style.clickable),
                        },
                        [
                          createVNode(
                            EquityHistoryChart,
                            {
                              'maintain-aspect-ratio': '',
                              'on-chart-click': () => unref(showBuffer)('XIT FINCH EQUITY'),
                            },
                            null,
                            8,
                            ['on-chart-click'],
                          ),
                        ],
                        2,
                      ),
                      createVNode(_sfc_main$1, null, {
                        default: withCtx(() => [
                          ...(_cache[5] || (_cache[5] = [createTextVNode('Asset Breakdown', -1)])),
                        ]),
                        _: 1,
                      }),
                      createBaseVNode('div', _hoisted_1, [
                        createVNode(
                          _sfc_main$2,
                          {
                            class: normalizeClass(_ctx.$style.clickable),
                            onClick:
                              _cache[1] ||
                              (_cache[1] = () => unref(showBuffer)('XIT FINCH ASSETS')),
                          },
                          null,
                          8,
                          ['class'],
                        ),
                        createVNode(
                          _sfc_main$3,
                          {
                            class: normalizeClass(_ctx.$style.clickable),
                            onClick:
                              _cache[2] ||
                              (_cache[2] = () => unref(showBuffer)('XIT FINCH LOCATIONS')),
                          },
                          null,
                          8,
                          ['class'],
                        ),
                      ]),
                    ],
                    64,
                  ))
                : (openBlock(),
                  createElementBlock(
                    Fragment,
                    { key: 2 },
                    [
                      unref(parameter) === 'EQUITY'
                        ? (openBlock(),
                          createBlock(EquityHistoryChart, {
                            key: 0,
                            pan: '',
                            zoom: '',
                          }))
                        : unref(parameter) === 'ASSETS'
                          ? (openBlock(), createBlock(_sfc_main$2, { key: 1 }))
                          : unref(parameter) === 'LOCATIONS'
                            ? (openBlock(), createBlock(_sfc_main$3, { key: 2 }))
                            : (openBlock(),
                              createElementBlock(
                                'span',
                                _hoisted_2,
                                'Error: Not a valid chart type',
                              )),
                    ],
                    64,
                  )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRklOQ0gudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9GSU5DSC9GSU5DSC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBGaW5IZWFkZXIgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOL0ZpbkhlYWRlci52dWUnO1xuaW1wb3J0IEVxdWl0eUhpc3RvcnlDaGFydCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9GSU5DSC9FcXVpdHlIaXN0b3J5Q2hhcnQudnVlJztcbmltcG9ydCBBc3NldFBpZUNoYXJ0IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkNIL0Fzc2V0UGllQ2hhcnQudnVlJztcbmltcG9ydCBMb2NhdGlvbnNQaWVDaGFydCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9GSU5DSC9Mb2NhdGlvbnNQaWVDaGFydC52dWUnO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCB7IHVzZVhpdFBhcmFtZXRlcnMgfSBmcm9tICdAc3JjL2hvb2tzL3VzZS14aXQtcGFyYW1ldGVycyc7XG5pbXBvcnQgU2VjdGlvbkhlYWRlciBmcm9tICdAc3JjL2NvbXBvbmVudHMvU2VjdGlvbkhlYWRlci52dWUnO1xuXG5jb25zdCBwYXJhbWV0ZXJzID0gdXNlWGl0UGFyYW1ldGVycygpO1xuY29uc3QgcGFyYW1ldGVyID0gcGFyYW1ldGVyc1swXT8udG9VcHBlckNhc2UoKTtcblxuY29uc3QgZmluY2ggPSByZWYoTWF0aC5yYW5kb20oKSA8IDAuMDEpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUucm9vdFwiPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwiZmluY2hcIj5cbiAgICAgIDxTZWN0aW9uSGVhZGVyPkZpbmNoPC9TZWN0aW9uSGVhZGVyPlxuICAgICAgPGltZ1xuICAgICAgICBzcmM9XCJodHRwczovL3JlZmluZWQtcHJ1bi5naXRodWIuaW8vYXNzZXRzL2ZpbmNoLmpwZWdcIlxuICAgICAgICBhbHQ9XCJGaW5jaFwiXG4gICAgICAgIDpjbGFzcz1cIiRzdHlsZS5jbGlja2FibGVcIlxuICAgICAgICBAY2xpY2s9XCJmaW5jaCA9IGZhbHNlXCIgLz5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2UtaWY9XCIhcGFyYW1ldGVyXCI+XG4gICAgICA8RmluSGVhZGVyPkVxdWl0eSBIaXN0b3J5PC9GaW5IZWFkZXI+XG4gICAgICA8ZGl2IDpzdHlsZT1cInsgbWFyZ2luVG9wOiAnNXB4JyB9XCIgOmNsYXNzPVwiJHN0eWxlLmNsaWNrYWJsZVwiPlxuICAgICAgICA8RXF1aXR5SGlzdG9yeUNoYXJ0XG4gICAgICAgICAgbWFpbnRhaW4tYXNwZWN0LXJhdGlvXG4gICAgICAgICAgOm9uLWNoYXJ0LWNsaWNrPVwiKCkgPT4gc2hvd0J1ZmZlcignWElUIEZJTkNIIEVRVUlUWScpXCIgLz5cbiAgICAgIDwvZGl2PlxuICAgICAgPEZpbkhlYWRlcj5Bc3NldCBCcmVha2Rvd248L0ZpbkhlYWRlcj5cbiAgICAgIDxkaXYgOnN0eWxlPVwieyBtYXJnaW5Ub3A6ICc1cHgnIH1cIj5cbiAgICAgICAgPEFzc2V0UGllQ2hhcnQgOmNsYXNzPVwiJHN0eWxlLmNsaWNrYWJsZVwiIEBjbGljaz1cIigpID0+IHNob3dCdWZmZXIoJ1hJVCBGSU5DSCBBU1NFVFMnKVwiIC8+XG4gICAgICAgIDxMb2NhdGlvbnNQaWVDaGFydFxuICAgICAgICAgIDpjbGFzcz1cIiRzdHlsZS5jbGlja2FibGVcIlxuICAgICAgICAgIEBjbGljaz1cIigpID0+IHNob3dCdWZmZXIoJ1hJVCBGSU5DSCBMT0NBVElPTlMnKVwiIC8+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RlbXBsYXRlPlxuICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICA8RXF1aXR5SGlzdG9yeUNoYXJ0IHYtaWY9XCJwYXJhbWV0ZXIgPT09ICdFUVVJVFknXCIgcGFuIHpvb20gLz5cbiAgICAgIDxBc3NldFBpZUNoYXJ0IHYtZWxzZS1pZj1cInBhcmFtZXRlciA9PT0gJ0FTU0VUUydcIiAvPlxuICAgICAgPExvY2F0aW9uc1BpZUNoYXJ0IHYtZWxzZS1pZj1cInBhcmFtZXRlciA9PT0gJ0xPQ0FUSU9OUydcIiAvPlxuICAgICAgPHNwYW4gdi1lbHNlPkVycm9yOiBOb3QgYSB2YWxpZCBjaGFydCB0eXBlPC9zcGFuPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5yb290IHtcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICBsZWZ0OiAwO1xuICByaWdodDogMDtcbiAgdG9wOiAwO1xuICBib3R0b206IDA7XG4gIG1hcmdpbjogNXB4O1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4uY2xpY2thYmxlIHtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJfY3JlYXRlVk5vZGUiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJGaW5IZWFkZXIiLCJfdW5yZWYiLCJBc3NldFBpZUNoYXJ0IiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIkxvY2F0aW9uc1BpZUNoYXJ0IiwiX2NyZWF0ZUVsZW1lbnRCbG9jayJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7O0FBU0EsVUFBQSxhQUFBLGlCQUFBO0FBQ0EsVUFBQSxZQUFBLFdBQUEsQ0FBQSxHQUFBLFlBQUE7QUFFQSxVQUFBLFFBQUEsSUFBQSxLQUFBLE9BQUEsSUFBQSxJQUFBOzs7UUFrQ1EsT0FBQUEsZUFBQSxLQUFBLE9BQUEsSUFBQTtBQUFBLE1BOUJrQixHQUFBO0FBQUE7VUFRWEMsWUFBQSxlQUFBLE1BQUE7QUFBQSxZQU4yQixTQUFBQyxRQUFBLE1BQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsY0FBaEJDLGdCQUFBLFNBQUEsRUFBQTtBQUFBLFlBQUEsRUFBQSxDQUFBO0FBQUE7OztZQUtPLEtBQUE7QUFBQSxZQUhyQixLQUFBO0FBQUEsWUFDQSxPQUFBSCxlQUFBLEtBQUEsT0FBQSxTQUFBO0FBQUEsWUFDb0IsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsTUFBQSxRQUFBO0FBQUEsVUFDWCxHQUFBLE1BQUEsQ0FBQTtBQUFBO1VBZ0JOQyxZQUFBRyxhQUFBLE1BQUE7QUFBQSxZQWI0QixTQUFBRixRQUFBLE1BQUEsQ0FBQSxHQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBO0FBQUEsY0FBWkMsZ0JBQUEsa0JBQUEsRUFBQTtBQUFBLFlBQUEsRUFBQSxDQUFBO0FBQUE7OztZQUtuQixPQUFBLEVBQUEsV0FBQSxNQUFBO0FBQUEsWUFKTyxPQUFBSCxlQUFBLEtBQUEsT0FBQSxTQUFBO0FBQUEsVUFBOEMsR0FBQTtBQUFBO2NBR0UseUJBQUE7QUFBQSxjQUR6RCxrQkFBQSxNQUFBSyxNQUFBLFVBQUEsRUFBQSxrQkFBQTtBQUFBLFlBQ2lDLEdBQUEsTUFBQSxHQUFBLENBQUEsZ0JBQUEsQ0FBQTtBQUFBOztZQUVDLFNBQUFILFFBQUEsTUFBQSxDQUFBLEdBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUE7QUFBQSxjQUFaQyxnQkFBQSxtQkFBQSxFQUFBO0FBQUEsWUFBQSxFQUFBLENBQUE7QUFBQTs7O1lBTXBCRixZQUFBSyxhQUFBO0FBQUEsY0FKcUYsT0FBQU4sZUFBQSxLQUFBLE9BQUEsU0FBQTtBQUFBLGNBQWxELFNBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsTUFBQUssTUFBQSxVQUFBLEVBQUEsa0JBQUE7QUFBQSxZQUEwQixHQUFBLE1BQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQTtBQUFBO2NBR1osT0FBQUwsZUFBQSxLQUFBLE9BQUEsU0FBQTtBQUFBLGNBRDNCLFNBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsTUFBQUssTUFBQSxVQUFBLEVBQUEscUJBQUE7QUFBQSxZQUNBLEdBQUEsTUFBQSxHQUFBLENBQUEsT0FBQSxDQUFBO0FBQUE7O1VBUW5CQSxNQUFBLFNBQUEsTUFBQSxZQUFBRSxVQUFBLEdBQUFDLFlBQUEsb0JBQUE7QUFBQSxZQUpvRCxLQUFBO0FBQUE7WUFBWCxNQUFBO0FBQUEsVUFBSSxDQUFBLEtBQUFILE1BQUEsU0FBQSxNQUFBLFlBQUFFLFVBQUEsR0FBQUMsWUFBQUYsYUFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLEtBQUFELE1BQUEsU0FBQSxNQUFBLGVBQUFFLFVBQUEsR0FBQUMsWUFBQUMsYUFBQSxFQUFBLEtBQUEsR0FBQSxNQUFBRixVQUFBLEdBQUFHLG1CQUFBLFFBQUEsWUFBQSwrQkFBQTtBQUFBLFFBR1osR0FBQSxFQUFBO0FBQUE7Ozs7In0=
