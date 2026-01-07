import { C } from './prun-css.js';
import { formatChange } from './utils7.js';
import BalanceSheetRow from './BalanceSheetRow.vue.js';
import { formatCurrency } from './format.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { colspan: '5' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BalanceSheetSection',
  props: {
    current: {},
    last: {},
    previous: {},
    section: {},
  },
  setup(__props) {
    function calculate(sheet, selector) {
      return sheet !== void 0 ? selector(sheet) : void 0;
    }
    function calculateChange(selector) {
      const fromLast = calculate(__props.last, selector);
      const fromPrevious = calculate(__props.previous, selector);
      if (fromLast === void 0 || fromPrevious === void 0 || fromPrevious === 0) {
        return void 0;
      }
      return (fromLast - fromPrevious) / fromPrevious;
    }
    const totalClass = computed(() => {
      if (!__props.section.coloredTotal) {
        return void 0;
      }
      const change = calculateChange(__props.section.total);
      if (change === void 0) {
        return void 0;
      }
      return {
        [C.ColoredValue.positive]: change > 0,
        [C.ColoredValue.negative]: change < 0,
      };
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tbody', null, [
          createBaseVNode('tr', null, [
            createBaseVNode('th', _hoisted_1, toDisplayString(_ctx.section.name), 1),
          ]),
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(_ctx.section.children, row => {
              return (
                openBlock(),
                createBlock(
                  BalanceSheetRow,
                  {
                    key: row.name,
                    current: _ctx.current,
                    last: _ctx.last,
                    previous: _ctx.previous,
                    row,
                    indent: 0,
                  },
                  null,
                  8,
                  ['current', 'last', 'previous', 'row'],
                )
              );
            }),
            128,
          )),
          createBaseVNode(
            'tr',
            {
              class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).IncomeStatementPanel.totals),
            },
            [
              createBaseVNode(
                'td',
                {
                  class: normalizeClass(
                    ('C' in _ctx ? _ctx.C : unref(C)).IncomeStatementPanel.number,
                  ),
                },
                'Total',
                2,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(formatCurrency)(calculate(_ctx.current, _ctx.section.total))),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(formatCurrency)(calculate(_ctx.last, _ctx.section.total))),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(
                  unref(formatCurrency)(calculate(_ctx.previous, _ctx.section.total)),
                ),
                1,
              ),
              createBaseVNode(
                'td',
                {
                  class: normalizeClass(unref(totalClass)),
                },
                toDisplayString(unref(formatChange)(calculateChange(_ctx.section.total))),
                3,
              ),
            ],
            2,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFsYW5jZVNoZWV0U2VjdGlvbi52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0ZJTkJTL0JhbGFuY2VTaGVldFNlY3Rpb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBmb3JtYXRDaGFuZ2UgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9GSU5CUy91dGlscyc7XG5pbXBvcnQgeyBTZWN0aW9uRGF0YSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkJTL2JhbGFuY2Utc2VjdGlvbic7XG5pbXBvcnQgeyBQYXJ0aWFsQmFsYW5jZVNoZWV0IH0gZnJvbSAnQHNyYy9jb3JlL2JhbGFuY2UvYmFsYW5jZS1zaGVldCc7XG5pbXBvcnQgQmFsYW5jZVNoZWV0Um93IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkJTL0JhbGFuY2VTaGVldFJvdy52dWUnO1xuaW1wb3J0IHsgZm9ybWF0Q3VycmVuY3kgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5cbmNvbnN0IHsgY3VycmVudCwgbGFzdCwgcHJldmlvdXMsIHNlY3Rpb24gfSA9IGRlZmluZVByb3BzPHtcbiAgY3VycmVudDogUGFydGlhbEJhbGFuY2VTaGVldDtcbiAgbGFzdD86IFBhcnRpYWxCYWxhbmNlU2hlZXQ7XG4gIHByZXZpb3VzPzogUGFydGlhbEJhbGFuY2VTaGVldDtcbiAgc2VjdGlvbjogU2VjdGlvbkRhdGE7XG59PigpO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGUoXG4gIHNoZWV0OiBQYXJ0aWFsQmFsYW5jZVNoZWV0IHwgdW5kZWZpbmVkLFxuICBzZWxlY3RvcjogKHg6IFBhcnRpYWxCYWxhbmNlU2hlZXQpID0+IG51bWJlciB8IHVuZGVmaW5lZCxcbikge1xuICByZXR1cm4gc2hlZXQgIT09IHVuZGVmaW5lZCA/IHNlbGVjdG9yKHNoZWV0KSA6IHVuZGVmaW5lZDtcbn1cblxuZnVuY3Rpb24gY2FsY3VsYXRlQ2hhbmdlKHNlbGVjdG9yOiAoeDogUGFydGlhbEJhbGFuY2VTaGVldCkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkKSB7XG4gIGNvbnN0IGZyb21MYXN0ID0gY2FsY3VsYXRlKGxhc3QsIHNlbGVjdG9yKTtcbiAgY29uc3QgZnJvbVByZXZpb3VzID0gY2FsY3VsYXRlKHByZXZpb3VzLCBzZWxlY3Rvcik7XG4gIGlmIChmcm9tTGFzdCA9PT0gdW5kZWZpbmVkIHx8IGZyb21QcmV2aW91cyA9PT0gdW5kZWZpbmVkIHx8IGZyb21QcmV2aW91cyA9PT0gMCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgcmV0dXJuIChmcm9tTGFzdCAtIGZyb21QcmV2aW91cykgLyBmcm9tUHJldmlvdXM7XG59XG5cbmNvbnN0IHRvdGFsQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghc2VjdGlvbi5jb2xvcmVkVG90YWwpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IGNoYW5nZSA9IGNhbGN1bGF0ZUNoYW5nZShzZWN0aW9uLnRvdGFsKTtcbiAgaWYgKGNoYW5nZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgW0MuQ29sb3JlZFZhbHVlLnBvc2l0aXZlXTogY2hhbmdlID4gMCxcbiAgICBbQy5Db2xvcmVkVmFsdWUubmVnYXRpdmVdOiBjaGFuZ2UgPCAwLFxuICB9O1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8dGJvZHk+XG4gICAgPHRyPlxuICAgICAgPHRoIGNvbHNwYW49XCI1XCI+e3sgc2VjdGlvbi5uYW1lIH19PC90aD5cbiAgICA8L3RyPlxuICAgIDxCYWxhbmNlU2hlZXRSb3dcbiAgICAgIHYtZm9yPVwicm93IGluIHNlY3Rpb24uY2hpbGRyZW5cIlxuICAgICAgOmtleT1cInJvdy5uYW1lXCJcbiAgICAgIDpjdXJyZW50PVwiY3VycmVudFwiXG4gICAgICA6bGFzdD1cImxhc3RcIlxuICAgICAgOnByZXZpb3VzPVwicHJldmlvdXNcIlxuICAgICAgOnJvdz1cInJvd1wiXG4gICAgICA6aW5kZW50PVwiMFwiIC8+XG4gICAgPHRyIDpjbGFzcz1cIkMuSW5jb21lU3RhdGVtZW50UGFuZWwudG90YWxzXCI+XG4gICAgICA8dGQgOmNsYXNzPVwiQy5JbmNvbWVTdGF0ZW1lbnRQYW5lbC5udW1iZXJcIj5Ub3RhbDwvdGQ+XG4gICAgICA8dGQ+e3sgZm9ybWF0Q3VycmVuY3koY2FsY3VsYXRlKGN1cnJlbnQsIHNlY3Rpb24udG90YWwpKSB9fTwvdGQ+XG4gICAgICA8dGQ+e3sgZm9ybWF0Q3VycmVuY3koY2FsY3VsYXRlKGxhc3QsIHNlY3Rpb24udG90YWwpKSB9fTwvdGQ+XG4gICAgICA8dGQ+e3sgZm9ybWF0Q3VycmVuY3koY2FsY3VsYXRlKHByZXZpb3VzLCBzZWN0aW9uLnRvdGFsKSkgfX08L3RkPlxuICAgICAgPHRkIDpjbGFzcz1cInRvdGFsQ2xhc3NcIj57eyBmb3JtYXRDaGFuZ2UoY2FsY3VsYXRlQ2hhbmdlKHNlY3Rpb24udG90YWwpKSB9fTwvdGQ+XG4gICAgPC90cj5cbiAgPC90Ym9keT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+XG50Ym9keSB0ciA+IDpub3QoOmZpcnN0LWNoaWxkKSB7XG4gIHRleHQtYWxpZ246IHJpZ2h0O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsImN1cnJlbnQiLCJsYXN0IiwicHJldmlvdXMiLCJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLGFBQUEsVUFBQSxPQUFBLFVBQUE7QUFJRSxhQUFBLFVBQUEsU0FBQSxTQUFBLEtBQUEsSUFBQTtBQUFBLElBQStDO0FBR2pELGFBQUEsZ0JBQUEsVUFBQTtBQUNFLFlBQUEsV0FBQSxVQUFBLFFBQUEsTUFBQSxRQUFBO0FBQ0EsWUFBQSxlQUFBLFVBQUEsUUFBQSxVQUFBLFFBQUE7QUFDQSxVQUFBLGFBQUEsVUFBQSxpQkFBQSxVQUFBLGlCQUFBLEdBQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULGNBQUEsV0FBQSxnQkFBQTtBQUFBLElBQW1DO0FBR3JDLFVBQUEsYUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLENBQUEsUUFBQSxRQUFBLGNBQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULFlBQUEsU0FBQSxnQkFBQSxRQUFBLFFBQUEsS0FBQTtBQUNBLFVBQUEsV0FBQSxRQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFHVCxhQUFBO0FBQUEsUUFBTyxDQUFBLEVBQUEsYUFBQSxRQUFBLEdBQUEsU0FBQTtBQUFBLFFBQytCLENBQUEsRUFBQSxhQUFBLFFBQUEsR0FBQSxTQUFBO0FBQUEsTUFDQTtBQUFBLElBQ3RDLENBQUE7OztRQXdCUUEsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsVUFoQkRBLGdCQUFBLE1BQUEsWUFBQUMsZ0JBQUEsS0FBQSxRQUFBLElBQUEsR0FBQSxDQUFBO0FBQUEsUUFENEIsQ0FBQTtBQUFBOztZQVNqQixLQUFBLElBQUE7QUFBQSxZQUxKLFNBQUEsS0FBQTtBQUFBLFlBQ0FDLE1BQUFBLEtBQUFBO0FBQUFBLFlBQ0hDLFVBQUFBLEtBQUFBO0FBQUFBLFlBQ0lDO0FBQUFBLFlBQ1YsUUFBQTtBQUFBLFVBQ1EsR0FBQSxNQUFBLEdBQUEsQ0FBQSxXQUFBLFFBQUEsWUFBQSxLQUFBLENBQUE7QUFBQTs7VUFPTixPQUFBQyxnQkFOT0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEscUJBQUFBLE1BQUFBO0FBQUFBLFFBQTZCLEdBQUE7QUFBQTtZQUNjLE9BQUFELGdCQUF6Q0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEscUJBQUFBLE1BQUFBO0FBQUFBLFVBQTZCLEdBQUEsU0FBQSxDQUFBO0FBQUEsVUFBT04sZ0JBQUEsTUFBQSxNQUFBQyxnQkFBQU0sTUFBQSxjQUFBLEVBQUEsVUFBQSxLQUFBLFNBQUEsS0FBQSxRQUFBLEtBQUEsQ0FBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLFVBQ01QLGdCQUFBLE1BQUEsTUFBQUMsZ0JBQUFNLE1BQUEsY0FBQSxFQUFBLFVBQUEsS0FBQSxNQUFBLEtBQUEsUUFBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxVQUNIUCxnQkFBQSxNQUFBLE1BQUFDLGdCQUFBTSxNQUFBLGNBQUEsRUFBQSxVQUFBLEtBQUEsVUFBQSxLQUFBLFFBQUEsS0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsVUFDSVAsZ0JBQUEsTUFBQTtBQUFBLFlBQ3dCLE9BQUFLLGVBQUFFLE1BQUEsVUFBQSxDQUFBO0FBQUEsVUFBekQsR0FBQU4sZ0JBQUFNLE1BQUEsWUFBQSxFQUFBLGdCQUFBLEtBQUEsUUFBQSxLQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUErQyxHQUFBLENBQUE7QUFBQTs7OzsifQ==
