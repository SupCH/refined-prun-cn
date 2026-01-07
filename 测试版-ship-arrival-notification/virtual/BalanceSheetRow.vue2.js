import { formatChange, formatAmount } from './utils7.js';
import RowExpandButton from './RowExpandButton.vue.js';
import _sfc_main$1 from './Tooltip.vue.js';
import {
  defineComponent,
  resolveComponent,
  createElementBlock,
  openBlock,
  Fragment,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
  createTextVNode,
  createBlock,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BalanceSheetRow',
  props: {
    current: {},
    indent: {},
    last: {},
    previous: {},
    row: {},
  },
  setup(__props) {
    const expanded = ref(false);
    function formatRowAmount(sheet, row) {
      const amount = calculate(sheet, row.value);
      if (amount === void 0) {
        return '--';
      }
      const formatted = formatAmount(amount);
      return row.less ? `(${formatted})` : formatted;
    }
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
    return (_ctx, _cache) => {
      const _component_BalanceSheetRow = resolveComponent('BalanceSheetRow', true);
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('tr', null, [
              createBaseVNode('td', null, [
                _ctx.indent > 0
                  ? (openBlock(true),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      renderList(_ctx.indent, i => {
                        return (
                          openBlock(),
                          createBlock(
                            RowExpandButton,
                            {
                              key: i,
                              class: normalizeClass(_ctx.$style.hidden),
                            },
                            null,
                            8,
                            ['class'],
                          )
                        );
                      }),
                      128,
                    ))
                  : createCommentVNode('', true),
                createVNode(
                  RowExpandButton,
                  {
                    modelValue: unref(expanded),
                    'onUpdate:modelValue':
                      _cache[0] ||
                      (_cache[0] = $event => (isRef(expanded) ? (expanded.value = $event) : null)),
                    class: normalizeClass(!_ctx.row.children ? _ctx.$style.hidden : null),
                  },
                  null,
                  8,
                  ['modelValue', 'class'],
                ),
                _ctx.row.less
                  ? (openBlock(),
                    createElementBlock(Fragment, { key: 1 }, [createTextVNode(' Less:')], 64))
                  : createCommentVNode('', true),
                createTextVNode(' ' + toDisplayString(_ctx.row.name) + ' ', 1),
                _ctx.row.tooltip
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$1,
                      {
                        key: 2,
                        tooltip: _ctx.row.tooltip,
                        class: normalizeClass(_ctx.$style.tooltip),
                      },
                      null,
                      8,
                      ['tooltip', 'class'],
                    ))
                  : createCommentVNode('', true),
              ]),
              createBaseVNode(
                'td',
                null,
                toDisplayString(formatRowAmount(_ctx.current, _ctx.row)),
                1,
              ),
              createBaseVNode('td', null, toDisplayString(formatRowAmount(_ctx.last, _ctx.row)), 1),
              createBaseVNode(
                'td',
                null,
                toDisplayString(formatRowAmount(_ctx.previous, _ctx.row)),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(formatChange)(calculateChange(_ctx.row.value))),
                1,
              ),
            ]),
            _ctx.row.children && unref(expanded)
              ? (openBlock(true),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  renderList(_ctx.row.children, child => {
                    return (
                      openBlock(),
                      createBlock(
                        _component_BalanceSheetRow,
                        {
                          key: child.name,
                          current: _ctx.current,
                          last: _ctx.last,
                          previous: _ctx.previous,
                          row: child,
                          indent: _ctx.indent + 1,
                        },
                        null,
                        8,
                        ['current', 'last', 'previous', 'row', 'indent'],
                      )
                    );
                  }),
                  128,
                ))
              : createCommentVNode('', true),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQmFsYW5jZVNoZWV0Um93LnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvRklOQlMvQmFsYW5jZVNoZWV0Um93LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgUGFydGlhbEJhbGFuY2VTaGVldCB9IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL2JhbGFuY2Utc2hlZXQnO1xuaW1wb3J0IHsgUm93RGF0YSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkJTL2JhbGFuY2Utc2VjdGlvbic7XG5pbXBvcnQgeyBmb3JtYXRBbW91bnQsIGZvcm1hdENoYW5nZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0ZJTkJTL3V0aWxzJztcbmltcG9ydCBSb3dFeHBhbmRCdXR0b24gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvRklOQlMvUm93RXhwYW5kQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgVG9vbHRpcCBmcm9tICdAc3JjL2NvbXBvbmVudHMvVG9vbHRpcC52dWUnO1xuXG5jb25zdCB7IGxhc3QsIHByZXZpb3VzIH0gPSBkZWZpbmVQcm9wczx7XG4gIGN1cnJlbnQ6IFBhcnRpYWxCYWxhbmNlU2hlZXQ7XG4gIGluZGVudDogbnVtYmVyO1xuICBsYXN0PzogUGFydGlhbEJhbGFuY2VTaGVldDtcbiAgcHJldmlvdXM/OiBQYXJ0aWFsQmFsYW5jZVNoZWV0O1xuICByb3c6IFJvd0RhdGE7XG59PigpO1xuXG5jb25zdCBleHBhbmRlZCA9IHJlZihmYWxzZSk7XG5cbmZ1bmN0aW9uIGZvcm1hdFJvd0Ftb3VudChzaGVldDogUGFydGlhbEJhbGFuY2VTaGVldCB8IHVuZGVmaW5lZCwgcm93OiBSb3dEYXRhKSB7XG4gIGNvbnN0IGFtb3VudCA9IGNhbGN1bGF0ZShzaGVldCwgcm93LnZhbHVlKTtcbiAgaWYgKGFtb3VudCA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuICctLSc7XG4gIH1cbiAgY29uc3QgZm9ybWF0dGVkID0gZm9ybWF0QW1vdW50KGFtb3VudCk7XG4gIHJldHVybiByb3cubGVzcyA/IGAoJHtmb3JtYXR0ZWR9KWAgOiBmb3JtYXR0ZWQ7XG59XG5cbmZ1bmN0aW9uIGNhbGN1bGF0ZShcbiAgc2hlZXQ6IFBhcnRpYWxCYWxhbmNlU2hlZXQgfCB1bmRlZmluZWQsXG4gIHNlbGVjdG9yOiAoeDogUGFydGlhbEJhbGFuY2VTaGVldCkgPT4gbnVtYmVyIHwgdW5kZWZpbmVkLFxuKSB7XG4gIHJldHVybiBzaGVldCAhPT0gdW5kZWZpbmVkID8gc2VsZWN0b3Ioc2hlZXQpIDogdW5kZWZpbmVkO1xufVxuXG5mdW5jdGlvbiBjYWxjdWxhdGVDaGFuZ2Uoc2VsZWN0b3I6ICh4OiBQYXJ0aWFsQmFsYW5jZVNoZWV0KSA9PiBudW1iZXIgfCB1bmRlZmluZWQpIHtcbiAgY29uc3QgZnJvbUxhc3QgPSBjYWxjdWxhdGUobGFzdCwgc2VsZWN0b3IpO1xuICBjb25zdCBmcm9tUHJldmlvdXMgPSBjYWxjdWxhdGUocHJldmlvdXMsIHNlbGVjdG9yKTtcbiAgaWYgKGZyb21MYXN0ID09PSB1bmRlZmluZWQgfHwgZnJvbVByZXZpb3VzID09PSB1bmRlZmluZWQgfHwgZnJvbVByZXZpb3VzID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICByZXR1cm4gKGZyb21MYXN0IC0gZnJvbVByZXZpb3VzKSAvIGZyb21QcmV2aW91cztcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0cj5cbiAgICA8dGQ+XG4gICAgICA8dGVtcGxhdGUgdi1pZj1cImluZGVudCA+IDBcIj5cbiAgICAgICAgPFJvd0V4cGFuZEJ1dHRvbiB2LWZvcj1cImkgaW4gaW5kZW50XCIgOmtleT1cImlcIiA6Y2xhc3M9XCIkc3R5bGUuaGlkZGVuXCIgLz5cbiAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8Um93RXhwYW5kQnV0dG9uIHYtbW9kZWw9XCJleHBhbmRlZFwiIDpjbGFzcz1cIiFyb3cuY2hpbGRyZW4gPyAkc3R5bGUuaGlkZGVuIDogbnVsbFwiIC8+XG4gICAgICA8dGVtcGxhdGUgdi1pZj1cInJvdy5sZXNzXCI+IExlc3M6PC90ZW1wbGF0ZT5cbiAgICAgIHt7IHJvdy5uYW1lIH19XG4gICAgICA8VG9vbHRpcCB2LWlmPVwicm93LnRvb2x0aXBcIiA6dG9vbHRpcD1cInJvdy50b29sdGlwXCIgOmNsYXNzPVwiJHN0eWxlLnRvb2x0aXBcIiAvPlxuICAgIDwvdGQ+XG4gICAgPHRkPnt7IGZvcm1hdFJvd0Ftb3VudChjdXJyZW50LCByb3cpIH19PC90ZD5cbiAgICA8dGQ+e3sgZm9ybWF0Um93QW1vdW50KGxhc3QsIHJvdykgfX08L3RkPlxuICAgIDx0ZD57eyBmb3JtYXRSb3dBbW91bnQocHJldmlvdXMsIHJvdykgfX08L3RkPlxuICAgIDx0ZD57eyBmb3JtYXRDaGFuZ2UoY2FsY3VsYXRlQ2hhbmdlKHJvdy52YWx1ZSkpIH19PC90ZD5cbiAgPC90cj5cbiAgPHRlbXBsYXRlIHYtaWY9XCJyb3cuY2hpbGRyZW4gJiYgZXhwYW5kZWRcIj5cbiAgICA8QmFsYW5jZVNoZWV0Um93XG4gICAgICB2LWZvcj1cImNoaWxkIGluIHJvdy5jaGlsZHJlblwiXG4gICAgICA6a2V5PVwiY2hpbGQubmFtZVwiXG4gICAgICA6Y3VycmVudD1cImN1cnJlbnRcIlxuICAgICAgOmxhc3Q9XCJsYXN0XCJcbiAgICAgIDpwcmV2aW91cz1cInByZXZpb3VzXCJcbiAgICAgIDpyb3c9XCJjaGlsZFwiXG4gICAgICA6aW5kZW50PVwiaW5kZW50ICsgMVwiIC8+XG4gIDwvdGVtcGxhdGU+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmhpZGRlbiB7XG4gIHZpc2liaWxpdHk6IGhpZGRlbjtcbn1cblxuLnRvb2x0aXAge1xuICBwYWRkaW5nOiAwO1xufVxuPC9zdHlsZT5cblxuPHN0eWxlIHNjb3BlZD5cbnRib2R5IHRyID4gOm5vdCg6Zmlyc3QtY2hpbGQpIHtcbiAgdGV4dC1hbGlnbjogcmlnaHQ7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX25vcm1hbGl6ZUNsYXNzIiwiX3VucmVmIiwiX2lzUmVmIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfY3JlYXRlQmxvY2siLCJUb29sdGlwIiwiX3RvRGlzcGxheVN0cmluZyIsImN1cnJlbnQiLCJsYXN0IiwicHJldmlvdXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxVQUFBLFdBQUEsSUFBQSxLQUFBO0FBRUEsYUFBQSxnQkFBQSxPQUFBLEtBQUE7QUFDRSxZQUFBLFNBQUEsVUFBQSxPQUFBLElBQUEsS0FBQTtBQUNBLFVBQUEsV0FBQSxRQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFFVCxZQUFBLFlBQUEsYUFBQSxNQUFBO0FBQ0EsYUFBQSxJQUFBLE9BQUEsSUFBQSxTQUFBLE1BQUE7QUFBQSxJQUFxQztBQUd2QyxhQUFBLFVBQUEsT0FBQSxVQUFBO0FBSUUsYUFBQSxVQUFBLFNBQUEsU0FBQSxLQUFBLElBQUE7QUFBQSxJQUErQztBQUdqRCxhQUFBLGdCQUFBLFVBQUE7QUFDRSxZQUFBLFdBQUEsVUFBQSxRQUFBLE1BQUEsUUFBQTtBQUNBLFlBQUEsZUFBQSxVQUFBLFFBQUEsVUFBQSxRQUFBO0FBQ0EsVUFBQSxhQUFBLFVBQUEsaUJBQUEsVUFBQSxpQkFBQSxHQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFFVCxjQUFBLFdBQUEsZ0JBQUE7QUFBQSxJQUFtQzs7Ozs7VUFtQjlCQSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxZQUxFLEtBQUEsU0FBQSxLQUFBQyxVQUFBLElBQUEsR0FBQUMsbUJBQUFDLFVBQUEsRUFBQSxLQUFBLEVBQUEsR0FBQUMsV0FBQSxLQUFBLFFBQUEsQ0FBQSxNQUFBOztnQkFOc0UsS0FBQTtBQUFBLGdCQUE1QixPQUFBQyxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsY0FBd0IsR0FBQSxNQUFBLEdBQUEsQ0FBQSxPQUFBLENBQUE7QUFBQTs7Y0FFZSxZQUFBQyxNQUFBLFFBQUE7QUFBQSxjQUExRCx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFDLE1BQUEsUUFBQSxJQUFBLFNBQUEsUUFBQSxTQUFBO0FBQUEsY0FBUSxPQUFBRixlQUFBLENBQUEsS0FBQSxJQUFBLFdBQUEsS0FBQSxPQUFBLFNBQUEsSUFBQTtBQUFBLFlBQXVDLEdBQUEsTUFBQSxHQUFBLENBQUEsY0FBQSxPQUFBLENBQUE7QUFBQTtjQUM5QkcsZ0JBQUEsUUFBQTtBQUFBLFlBQVgsR0FBQSxFQUFBLEtBQUFDLG1CQUFBLElBQUEsSUFBQTtBQUFBO1lBRWhDLEtBQUEsSUFBQSxXQUFBUixVQUFBLEdBQUFTLFlBQUFDLGFBQUE7QUFBQSxjQUE2RSxLQUFBO0FBQUE7Y0FBbkMsT0FBQU4sZUFBQSxLQUFBLE9BQUEsT0FBQTtBQUFBLFlBQStCLEdBQUEsTUFBQSxHQUFBLENBQUEsV0FBQSxPQUFBLENBQUEsS0FBQUksbUJBQUEsSUFBQSxJQUFBO0FBQUE7O1VBRXhDVCxnQkFBQSxNQUFBLE1BQUFZLGdCQUFBLGdCQUFBLEtBQUEsTUFBQSxLQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxVQUNIWixnQkFBQSxNQUFBLE1BQUFZLGdCQUFBLGdCQUFBLEtBQUEsVUFBQSxLQUFBLEdBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxVQUNJWixnQkFBQSxNQUFBLE1BQUFZLGdCQUFBTixNQUFBLFlBQUEsRUFBQSxnQkFBQSxLQUFBLElBQUEsS0FBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsUUFDUyxDQUFBO0FBQUE7O1lBVXBCLEtBQUEsTUFBQTtBQUFBLFlBTFgsU0FBQSxLQUFBO0FBQUEsWUFDRk8sTUFBQUEsS0FBQUE7QUFBQUEsWUFDSEMsVUFBQUEsS0FBQUE7QUFBQUEsWUFDSUMsS0FBQUE7QUFBQUEsWUFDTCxRQUFBLEtBQUEsU0FBQTtBQUFBLFVBQ1MsR0FBQSxNQUFBLEdBQUEsQ0FBQSxXQUFBLFFBQUEsWUFBQSxPQUFBLFFBQUEsQ0FBQTtBQUFBOzs7OzsifQ==
