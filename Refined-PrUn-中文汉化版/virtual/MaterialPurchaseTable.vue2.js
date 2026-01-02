import { formatCurrency, fixed2, fixed0 } from './format.js';
import MaterialIcon from './MaterialIcon.vue.js';
import { calcMaterialAmountPrice } from './cx.js';
import { sortMaterialAmounts } from './sort-materials.js';
import { sumBy } from './sum-by.js';
import { showBuffer } from './buffers.js';
import _sfc_main$1 from './PrunButton.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
  withCtx,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MaterialPurchaseTable',
  props: {
    collapsedByDefault: { type: Boolean },
    collapsible: { type: Boolean },
    materials: {},
  },
  setup(__props) {
    const collapsed = ref(__props.collapsible && __props.collapsedByDefault);
    const sorted = computed(() => sortMaterialAmounts(__props.materials));
    function calculateWeight(amount) {
      return (amount.material?.weight ?? 0) * amount.amount;
    }
    function calculateVolume(amount) {
      return (amount.material?.volume ?? 0) * amount.amount;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('table', null, [
          _cache[4] ||
            (_cache[4] = createBaseVNode(
              'thead',
              null,
              [
                createBaseVNode('tr', null, [
                  createBaseVNode('th'),
                  createBaseVNode('th', null, 'Count'),
                  createBaseVNode('th', null, 'Cost'),
                  createBaseVNode('th', null, 'Weight'),
                  createBaseVNode('th', null, 'Volume'),
                  createBaseVNode('th', null, 'Actions'),
                ]),
              ],
              -1,
            )),
          createBaseVNode('tbody', null, [
            createBaseVNode('tr', null, [
              _ctx.collapsible
                ? (openBlock(),
                  createElementBlock(
                    'td',
                    {
                      key: 0,
                      class: normalizeClass(_ctx.$style.expand),
                      onClick:
                        _cache[0] || (_cache[0] = $event => (collapsed.value = !unref(collapsed))),
                    },
                    toDisplayString(unref(collapsed) ? '+' : '-'),
                    3,
                  ))
                : (openBlock(), createElementBlock('td', _hoisted_1)),
              createBaseVNode(
                'td',
                {
                  class: normalizeClass(_ctx.$style.total),
                },
                'Total',
                2,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(
                  unref(formatCurrency)(
                    unref(sumBy)(unref(sorted), unref(calcMaterialAmountPrice)),
                  ),
                ),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(fixed2)(unref(sumBy)(unref(sorted), calculateWeight))) + 't',
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(fixed2)(unref(sumBy)(unref(sorted), calculateVolume))) + 'm³',
                1,
              ),
              _cache[1] || (_cache[1] = createBaseVNode('td', null, null, -1)),
            ]),
          ]),
          createBaseVNode(
            'tbody',
            {
              class: normalizeClass(_ctx.$style.fakeRow),
            },
            [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'td',
                  {
                    class: normalizeClass(_ctx.$style.materialCell),
                  },
                  [
                    createVNode(MaterialIcon, {
                      size: 'inline-table',
                      ticker: 'MCG',
                    }),
                  ],
                  2,
                ),
                createBaseVNode('td', null, toDisplayString(unref(fixed0)(1e5)), 1),
                createBaseVNode('td', null, toDisplayString(unref(formatCurrency)(1e6)), 1),
                createBaseVNode('td', null, toDisplayString(unref(fixed2)(1000.01)) + 't', 1),
                createBaseVNode('td', null, toDisplayString(unref(fixed2)(1000.01)) + 'm³', 1),
                createBaseVNode('td', null, [
                  createVNode(
                    _sfc_main$1,
                    {
                      dark: '',
                      inline: '',
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[2] || (_cache[2] = [createTextVNode('CXM', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
              ]),
            ],
            2,
          ),
          !unref(collapsed)
            ? (openBlock(),
              createElementBlock('tbody', _hoisted_2, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(sorted), material => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'tr',
                        {
                          key: material.material.ticker,
                        },
                        [
                          createBaseVNode(
                            'td',
                            {
                              class: normalizeClass(_ctx.$style.materialCell),
                            },
                            [
                              createVNode(
                                MaterialIcon,
                                {
                                  size: 'inline-table',
                                  ticker: material.material.ticker,
                                },
                                null,
                                8,
                                ['ticker'],
                              ),
                            ],
                            2,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(fixed0)(material.amount)),
                            1,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(
                              unref(formatCurrency)(unref(calcMaterialAmountPrice)(material)),
                            ),
                            1,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(fixed2)(calculateWeight(material))) + 't',
                            1,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(fixed2)(calculateVolume(material))) + 'm³',
                            1,
                          ),
                          createBaseVNode('td', null, [
                            createVNode(
                              _sfc_main$1,
                              {
                                dark: '',
                                inline: '',
                                onClick: $event =>
                                  unref(showBuffer)(`CXM ${material.material.ticker}`),
                              },
                              {
                                default: withCtx(() => [
                                  ...(_cache[3] || (_cache[3] = [createTextVNode(' CXM ', -1)])),
                                ]),
                                _: 2,
                              },
                              1032,
                              ['onClick'],
                            ),
                          ]),
                        ],
                      )
                    );
                  }),
                  128,
                )),
              ]))
            : createCommentVNode('', true),
        ])
      );
    };
  },
});
export { _sfc_main as default };
