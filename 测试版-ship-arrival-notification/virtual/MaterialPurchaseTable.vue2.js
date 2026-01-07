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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWxQdXJjaGFzZVRhYmxlLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL01hdGVyaWFsUHVyY2hhc2VUYWJsZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGZpeGVkMCwgZml4ZWQyLCBmb3JtYXRDdXJyZW5jeSB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCBNYXRlcmlhbEljb24gZnJvbSAnQHNyYy9jb21wb25lbnRzL01hdGVyaWFsSWNvbi52dWUnO1xuaW1wb3J0IHsgY2FsY01hdGVyaWFsQW1vdW50UHJpY2UgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL2Zpby9jeCc7XG5pbXBvcnQgeyBzb3J0TWF0ZXJpYWxBbW91bnRzIH0gZnJvbSAnQHNyYy9jb3JlL3NvcnQtbWF0ZXJpYWxzJztcbmltcG9ydCB7IHN1bUJ5IH0gZnJvbSAnQHNyYy91dGlscy9zdW0tYnknO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5cbmNvbnN0IHsgY29sbGFwc2VkQnlEZWZhdWx0LCBjb2xsYXBzaWJsZSwgbWF0ZXJpYWxzIH0gPSBkZWZpbmVQcm9wczx7XG4gIGNvbGxhcHNlZEJ5RGVmYXVsdD86IGJvb2xlYW47XG4gIGNvbGxhcHNpYmxlPzogYm9vbGVhbjtcbiAgbWF0ZXJpYWxzOiBQcnVuQXBpLk1hdGVyaWFsQW1vdW50W107XG59PigpO1xuXG5jb25zdCBjb2xsYXBzZWQgPSByZWYoY29sbGFwc2libGUgJiYgY29sbGFwc2VkQnlEZWZhdWx0KTtcblxuY29uc3Qgc29ydGVkID0gY29tcHV0ZWQoKCkgPT4gc29ydE1hdGVyaWFsQW1vdW50cyhtYXRlcmlhbHMpKTtcblxuZnVuY3Rpb24gY2FsY3VsYXRlV2VpZ2h0KGFtb3VudDogUHJ1bkFwaS5NYXRlcmlhbEFtb3VudCkge1xuICByZXR1cm4gKGFtb3VudC5tYXRlcmlhbD8ud2VpZ2h0ID8/IDApICogYW1vdW50LmFtb3VudDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlVm9sdW1lKGFtb3VudDogUHJ1bkFwaS5NYXRlcmlhbEFtb3VudCkge1xuICByZXR1cm4gKGFtb3VudC5tYXRlcmlhbD8udm9sdW1lID8/IDApICogYW1vdW50LmFtb3VudDtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aCAvPlxuICAgICAgICA8dGg+Q291bnQ8L3RoPlxuICAgICAgICA8dGg+Q29zdDwvdGg+XG4gICAgICAgIDx0aD5XZWlnaHQ8L3RoPlxuICAgICAgICA8dGg+Vm9sdW1lPC90aD5cbiAgICAgICAgPHRoPkFjdGlvbnM8L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIHYtaWY9XCJjb2xsYXBzaWJsZVwiIDpjbGFzcz1cIiRzdHlsZS5leHBhbmRcIiBAY2xpY2s9XCJjb2xsYXBzZWQgPSAhY29sbGFwc2VkXCI+XG4gICAgICAgICAge3sgY29sbGFwc2VkID8gJysnIDogJy0nIH19XG4gICAgICAgIDwvdGQ+XG4gICAgICAgIDx0ZCB2LWVsc2UgLz5cbiAgICAgICAgPHRkIDpjbGFzcz1cIiRzdHlsZS50b3RhbFwiPlRvdGFsPC90ZD5cbiAgICAgICAgPHRkPnt7IGZvcm1hdEN1cnJlbmN5KHN1bUJ5KHNvcnRlZCwgY2FsY01hdGVyaWFsQW1vdW50UHJpY2UpKSB9fTwvdGQ+XG4gICAgICAgIDx0ZD57eyBmaXhlZDIoc3VtQnkoc29ydGVkLCBjYWxjdWxhdGVXZWlnaHQpKSB9fXQ8L3RkPlxuICAgICAgICA8dGQ+e3sgZml4ZWQyKHN1bUJ5KHNvcnRlZCwgY2FsY3VsYXRlVm9sdW1lKSkgfX1twrM8L3RkPlxuICAgICAgICA8dGQgLz5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgICA8dGJvZHkgOmNsYXNzPVwiJHN0eWxlLmZha2VSb3dcIj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIDpjbGFzcz1cIiRzdHlsZS5tYXRlcmlhbENlbGxcIj5cbiAgICAgICAgICA8TWF0ZXJpYWxJY29uIHNpemU9XCJpbmxpbmUtdGFibGVcIiB0aWNrZXI9XCJNQ0dcIiAvPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+e3sgZml4ZWQwKDEwMDAwMCkgfX08L3RkPlxuICAgICAgICA8dGQ+e3sgZm9ybWF0Q3VycmVuY3koMTAwMDAwMCkgfX08L3RkPlxuICAgICAgICA8dGQ+e3sgZml4ZWQyKDEwMDAuMDEpIH19dDwvdGQ+XG4gICAgICAgIDx0ZD57eyBmaXhlZDIoMTAwMC4wMSkgfX1twrM8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5CdXR0b24gZGFyayBpbmxpbmU+Q1hNPC9QcnVuQnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICAgIDx0Ym9keSB2LWlmPVwiIWNvbGxhcHNlZFwiPlxuICAgICAgPHRyIHYtZm9yPVwibWF0ZXJpYWwgaW4gc29ydGVkXCIgOmtleT1cIm1hdGVyaWFsLm1hdGVyaWFsLnRpY2tlclwiPlxuICAgICAgICA8dGQgOmNsYXNzPVwiJHN0eWxlLm1hdGVyaWFsQ2VsbFwiPlxuICAgICAgICAgIDxNYXRlcmlhbEljb24gc2l6ZT1cImlubGluZS10YWJsZVwiIDp0aWNrZXI9XCJtYXRlcmlhbC5tYXRlcmlhbC50aWNrZXJcIiAvPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+e3sgZml4ZWQwKG1hdGVyaWFsLmFtb3VudCkgfX08L3RkPlxuICAgICAgICA8dGQ+e3sgZm9ybWF0Q3VycmVuY3koY2FsY01hdGVyaWFsQW1vdW50UHJpY2UobWF0ZXJpYWwpKSB9fTwvdGQ+XG4gICAgICAgIDx0ZD57eyBmaXhlZDIoY2FsY3VsYXRlV2VpZ2h0KG1hdGVyaWFsKSkgfX10PC90ZD5cbiAgICAgICAgPHRkPnt7IGZpeGVkMihjYWxjdWxhdGVWb2x1bWUobWF0ZXJpYWwpKSB9fW3CszwvdGQ+XG4gICAgICAgIDx0ZD5cbiAgICAgICAgICA8UHJ1bkJ1dHRvbiBkYXJrIGlubGluZSBAY2xpY2s9XCJzaG93QnVmZmVyKGBDWE0gJHttYXRlcmlhbC5tYXRlcmlhbC50aWNrZXJ9YClcIj5cbiAgICAgICAgICAgIENYTVxuICAgICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uZXhwYW5kIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xufVxuXG4udG90YWwge1xuICB0ZXh0LWFsaWduOiByaWdodDtcbn1cblxuLm1hdGVyaWFsQ2VsbCB7XG4gIHdpZHRoOiAwO1xuICBwYWRkaW5nOiAwO1xufVxuXG4uZmFrZVJvdyB7XG4gIHZpc2liaWxpdHk6IGNvbGxhcHNlO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfdW5yZWYiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX25vcm1hbGl6ZUNsYXNzIiwiX2NyZWF0ZVZOb2RlIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxVQUFBLFlBQUEsSUFBQSxRQUFBLGVBQUEsUUFBQSxrQkFBQTtBQUVBLFVBQUEsU0FBQSxTQUFBLE1BQUEsb0JBQUEsUUFBQSxTQUFBLENBQUE7QUFFQSxhQUFBLGdCQUFB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
