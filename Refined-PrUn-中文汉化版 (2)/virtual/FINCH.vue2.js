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
