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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRGF0ZVJvdy52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NYVFMvRGF0ZVJvdy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGZpeGVkMCwgZGRtbXl5eXkgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5cbmNvbnN0IHsgdG90YWxzIH0gPSBkZWZpbmVQcm9wczx7XG4gIGRhdGU6IG51bWJlcjtcbiAgaGlkZVRvdGFscz86IGJvb2xlYW47XG4gIHRvdGFsczogeyBbY3VycmVuY3k6IHN0cmluZ106IHsgcHVyY2hhc2VzOiBudW1iZXI7IHNhbGVzOiBudW1iZXIgfSB9O1xufT4oKTtcblxuY29uc3QgdG90YWxzTGFiZWxzID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gT2JqZWN0LmtleXModG90YWxzKVxuICAgIC5zb3J0KClcbiAgICAubWFwKHggPT4gKHtcbiAgICAgIGN1cnJlbmN5OiB4LFxuICAgICAgcHVyY2hhc2VzOiB0b3RhbHNbeF0ucHVyY2hhc2VzLFxuICAgICAgc2FsZXM6IHRvdGFsc1t4XS5zYWxlcyxcbiAgICAgIHRvdGFsOiB0b3RhbHNbeF0uc2FsZXMgLSB0b3RhbHNbeF0ucHVyY2hhc2VzLFxuICAgIH0pKTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHRyPlxuICAgIDx0ZCBjb2xzcGFuPVwiMlwiIDpjbGFzcz1cIiRzdHlsZS5jb2x1bW5cIj5cbiAgICAgIDxzcGFuPnt7IGRkbW15eXl5KGRhdGUpIH19PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPCEtLSBUaGlzIDx0cj4gaXMgbmVlZGVkIHNvIGJvdGggb3RoZXIgPHRyPnMgYXJlIHRoZSBzYW1lIGNvbG9yIC0tPlxuICAgIDx0ZCA6c3R5bGU9XCJ7IGRpc3BsYXk6ICdub25lJyB9XCIgLz5cbiAgICA8dGQgY29sc3Bhbj1cIjVcIiA6Y2xhc3M9XCIkc3R5bGUuY29sdW1uXCI+XG4gICAgICA8ZGl2IHYtaWY9XCIhaGlkZVRvdGFsc1wiIDpjbGFzcz1cIiRzdHlsZS50b3RhbHNcIj5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUudG90YWxzQ29sdW1uXCI+XG4gICAgICAgICAgPHNwYW4gdi1mb3I9XCJ0b3RhbCBpbiB0b3RhbHNMYWJlbHNcIiA6a2V5PVwidG90YWwuY3VycmVuY3lcIj57eyBmaXhlZDAodG90YWwuc2FsZXMpIH19PC9zcGFuPlxuICAgICAgICA8L2Rpdj5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCJbJHN0eWxlLnRvdGFsc0NvbHVtbiwgJHN0eWxlLnRvdGFsc1NlcGFyYXRvcl1cIj5cbiAgICAgICAgICA8c3BhbiB2LWZvcj1cImkgaW4gdG90YWxzTGFiZWxzLmxlbmd0aFwiIDprZXk9XCJpXCI+LTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLnRvdGFsc0NvbHVtblwiPlxuICAgICAgICAgIDxzcGFuIHYtZm9yPVwidG90YWwgaW4gdG90YWxzTGFiZWxzXCIgOmtleT1cInRvdGFsLmN1cnJlbmN5XCI+XG4gICAgICAgICAgICB7eyBmaXhlZDAodG90YWwucHVyY2hhc2VzKSB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgOmNsYXNzPVwiWyRzdHlsZS50b3RhbHNDb2x1bW4sICRzdHlsZS50b3RhbHNTZXBhcmF0b3JdXCI+XG4gICAgICAgICAgPHNwYW4gdi1mb3I9XCJpIGluIHRvdGFsc0xhYmVscy5sZW5ndGhcIiA6a2V5PVwiaVwiPj08L3NwYW4+XG4gICAgICAgIDwvZGl2PlxuICAgICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS50b3RhbHNDb2x1bW5cIj5cbiAgICAgICAgICA8c3BhbiB2LWZvcj1cInRvdGFsIGluIHRvdGFsc0xhYmVsc1wiIDprZXk9XCJ0b3RhbC5jdXJyZW5jeVwiPlxuICAgICAgICAgICAge3sgZml4ZWQwKHRvdGFsLnRvdGFsKSB9fSB7eyB0b3RhbC5jdXJyZW5jeSB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L3RkPlxuICA8L3RyPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jb2x1bW4ge1xuICBib3JkZXItbGVmdDogbm9uZTtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkICMyYjQ4NWE7XG4gIGJvcmRlci10b3A6IDFweCBzb2xpZCAjMmI0ODVhO1xufVxuXG4udG90YWxzIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IHJvdztcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG5cbi50b3RhbHNDb2x1bW4ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBmbGV4LWRpcmVjdGlvbjogY29sdW1uO1xufVxuXG4udG90YWxzU2VwYXJhdG9yIHtcbiAgbWFyZ2luLWxlZnQ6IDEwcHg7XG4gIG1hcmdpbi1yaWdodDogMTBweDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVNBLFVBQUEsZUFBQSxTQUFBLE1BQUE7QUFDRSxhQUFBLE9BQUEsS0FBQSxRQUFBLE1BQUEsRUFBQSxLQUFBLEVBQUEsSUFBQSxDQUFBLE9BQUE7QUFBQSxRQUVhLFVBQUE7QUFBQSxRQUNDLFdBQUEsUUFBQSxPQUFBLENBQUEsRUFBQTtBQUFBLFFBQ1csT0FBQSxRQUFBLE9BQUEsQ0FBQSxFQUFBO0FBQUEsUUFDSixPQUFBLFFBQUEsT0FBQSxDQUFBLEVBQUEsUUFBQSxRQUFBLE9BQUEsQ0FBQSxFQUFBO0FBQUEsTUFDa0IsRUFBQTtBQUFBLElBQ25DLENBQUE7OztRQWtDQ0EsZ0JBQUEsTUFBQTtBQUFBLFVBMUJFLFNBQUE7QUFBQSxVQUZPLE9BQUFDLGVBQUEsS0FBQSxPQUFBLE1BQUE7QUFBQSxRQUF5QixHQUFBO0FBQUE7UUFDYixHQUFBLENBQUE7QUFBQTtRQUdPRCxnQkFBQSxNQUFBO0FBQUEsVUF1QjFCLFNBQUE7QUFBQSxVQXRCTyxPQUFBQyxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsUUFBeUIsR0FBQTtBQUFBO1lBcUI3QixLQUFBO0FBQUE7VUFwQnVDLEdBQUE7QUFBQTtjQUdyQyxPQUFBQSxlQUFBLEtBQUEsT0FBQSxZQUFBO0FBQUEsWUFGMEIsR0FBQTtBQUFBOztrQkFDNEQsS0FBQSxNQUFBO0FBQUEsZ0JBQTFDLEdBQUFDLGdCQUFBQyxNQUFBLE1BQUEsRUFBQSxNQUFBLEtBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxjQUErQixDQUFBLEdBQUEsR0FBQTtBQUFBOztjQUkzRSxPQUFBRixlQUFBLENBQUEsS0FBQSxPQUFBLGNBQUEsS0FBQSxPQUFBLGVBQUEsQ0FBQTtBQUFBLFlBRm1ELEdBQUE7QUFBQTtBQUN2RCx1QkFBQUcsVUFBQSxHQUFBQyxtQkFBQSxRQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUEsR0FBQTtBQUFBLGNBQWlELENBQUEsR0FBQSxHQUFBO0FBQUE7O2NBTTdDLE9BQUFKLGVBQUEsS0FBQSxPQUFBLFlBQUE7QUFBQSxZQUowQixHQUFBO0FBQUE7O2tCQUd2QixLQUFBLE1BQUE7QUFBQSxnQkFGeUMsR0FBQUMsZ0JBQUFDLE1BQUEsTUFBQSxFQUFBLE1BQUEsU0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLGNBQ3JCLENBQUEsR0FBQSxHQUFBO0FBQUE7O2NBS3ZCLE9BQUFGLGVBQUEsQ0FBQSxLQUFBLE9BQUEsY0FBQSxLQUFBLE9BQUEsZUFBQSxDQUFBO0FBQUEsWUFGbUQsR0FBQTtBQUFBO0FBQ3ZELHVCQUFBRyxVQUFBLEdBQUFDLG1CQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQSxHQUFBO0FBQUEsY0FBaUQsQ0FBQSxHQUFBLEdBQUE7QUFBQTs7Y0FNN0MsT0FBQUosZUFBQSxLQUFBLE9BQUEsWUFBQTtBQUFBLFlBSjBCLEdBQUE7QUFBQTs7a0JBR3ZCLEtBQUEsTUFBQTtBQUFBLGdCQUZ5QyxHQUFBQyxnQkFBQUMsTUFBQSxNQUFBLEVBQUEsTUFBQSxLQUFBLENBQUEsSUFBQSxNQUFBRCxnQkFBQSxNQUFBLFFBQUEsR0FBQSxDQUFBO0FBQUEsY0FDSCxDQUFBLEdBQUEsR0FBQTtBQUFBOzs7Ozs7OyJ9
