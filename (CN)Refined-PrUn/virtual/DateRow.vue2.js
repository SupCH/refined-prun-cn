import { ddmmyyyy, fixed0 } from './format.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DateRow',
  props: {
    date: {},
    hideTotals: { type: Boolean },
    totals: {},
  },
  setup(__props) {
    const totalsLabels = computed(() => {
      return Object.keys(__props.totals)
        .sort()
        .map(x => ({
          currency: x,
          purchases: __props.totals[x].purchases,
          sales: __props.totals[x].sales,
          total: __props.totals[x].sales - __props.totals[x].purchases,
        }));
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tr', null, [
          createBaseVNode(
            'td',
            {
              colspan: '2',
              class: normalizeClass(_ctx.$style.column),
            },
            [createBaseVNode('span', null, toDisplayString(unref(ddmmyyyy)(_ctx.date)), 1)],
            2,
          ),
          _cache[0] ||
            (_cache[0] = createBaseVNode('td', { style: { display: 'none' } }, null, -1)),
          createBaseVNode(
            'td',
            {
              colspan: '5',
              class: normalizeClass(_ctx.$style.column),
            },
            [
              !_ctx.hideTotals
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      class: normalizeClass(_ctx.$style.totals),
                    },
                    [
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass(_ctx.$style.totalsColumn),
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(totalsLabels), total => {
                              return (
                                openBlock(),
                                createElementBlock(
                                  'span',
                                  {
                                    key: total.currency,
                                  },
                                  toDisplayString(unref(fixed0)(total.sales)),
                                  1,
                                )
                              );
                            }),
                            128,
                          )),
                        ],
                        2,
                      ),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass([
                            _ctx.$style.totalsColumn,
                            _ctx.$style.totalsSeparator,
                          ]),
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(totalsLabels).length, i => {
                              return (openBlock(), createElementBlock('span', { key: i }, '-'));
                            }),
                            128,
                          )),
                        ],
                        2,
                      ),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass(_ctx.$style.totalsColumn),
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(totalsLabels), total => {
                              return (
                                openBlock(),
                                createElementBlock(
                                  'span',
                                  {
                                    key: total.currency,
                                  },
                                  toDisplayString(unref(fixed0)(total.purchases)),
                                  1,
                                )
                              );
                            }),
                            128,
                          )),
                        ],
                        2,
                      ),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass([
                            _ctx.$style.totalsColumn,
                            _ctx.$style.totalsSeparator,
                          ]),
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(totalsLabels).length, i => {
                              return (openBlock(), createElementBlock('span', { key: i }, '='));
                            }),
                            128,
                          )),
                        ],
                        2,
                      ),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass(_ctx.$style.totalsColumn),
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(unref(totalsLabels), total => {
                              return (
                                openBlock(),
                                createElementBlock(
                                  'span',
                                  {
                                    key: total.currency,
                                  },
                                  toDisplayString(unref(fixed0)(total.total)) +
                                    ' ' +
                                    toDisplayString(total.currency),
                                  1,
                                )
                              );
                            }),
                            128,
                          )),
                        ],
                        2,
                      ),
                    ],
                    2,
                  ))
                : createCommentVNode('', true),
            ],
            2,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
