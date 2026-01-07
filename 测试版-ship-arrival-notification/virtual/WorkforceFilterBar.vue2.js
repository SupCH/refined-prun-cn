import _sfc_main$1 from './RadioItem.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'WorkforceFilterBar',
  props: {
    filters: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.bar),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.filters, filter => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: filter.workforce,
                      modelValue: filter.value,
                      'onUpdate:modelValue': $event => (filter.value = $event),
                      horizontal: '',
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(filter.workforce.substring(0, 3)), 1),
                      ]),
                      _: 2,
                    },
                    1032,
                    ['modelValue', 'onUpdate:modelValue'],
                  )
                );
              }),
              128,
            )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiV29ya2ZvcmNlRmlsdGVyQmFyLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC93Zi13b3JrZm9yY2UtZmlsdGVycy9Xb3JrZm9yY2VGaWx0ZXJCYXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUmFkaW9JdGVtIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9SYWRpb0l0ZW0udnVlJztcbmltcG9ydCB7IFdvcmtmb3JjZUZpbHRlciB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvYWR2YW5jZWQvd2Ytd29ya2ZvcmNlLWZpbHRlcnMvdGlsZS1zdGF0ZSc7XG5cbmNvbnN0IHsgZmlsdGVycyB9ID0gZGVmaW5lUHJvcHM8eyBmaWx0ZXJzOiBXb3JrZm9yY2VGaWx0ZXJbXSB9PigpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuYmFyXCI+XG4gICAgPFJhZGlvSXRlbSB2LWZvcj1cImZpbHRlciBpbiBmaWx0ZXJzXCIgOmtleT1cImZpbHRlci53b3JrZm9yY2VcIiB2LW1vZGVsPVwiZmlsdGVyLnZhbHVlXCIgaG9yaXpvbnRhbD5cbiAgICAgIHt7IGZpbHRlci53b3JrZm9yY2Uuc3Vic3RyaW5nKDAsIDMpIH19XG4gICAgPC9SYWRpb0l0ZW0+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5iYXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBjb2x1bW4tZ2FwOiAzcHg7XG4gIHBhZGRpbmc6IDRweCAwIDAgNnB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX25vcm1hbGl6ZUNsYXNzIiwiJHN0eWxlIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJmaWx0ZXJzIiwiX2NyZWF0ZUJsb2NrIiwiUmFkaW9JdGVtIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OzBCQVFFQSxtQkFJTSxPQUFBO0FBQUEsUUFKQSxPQUFLQyxlQUFFQyxLQUFBQSxPQUFPLEdBQUc7QUFBQSxNQUFBOzBCQUNyQkYsbUJBRVlHLFVBQUEsTUFBQUMsV0FGZ0JDLEtBQUFBLFNBQU8sQ0FBakIsV0FBTTs4QkFBeEJDLFlBRVlDLGFBQUE7QUFBQSxZQUYwQixLQUFLLE9BQU87QUFBQSxZQUFvQixZQUFBLE9BQU87QUFBQSxZQUFQLHVCQUFBLENBQUEsV0FBQSxPQUFPLFFBQUs7QUFBQSxZQUFFLFlBQUE7QUFBQSxVQUFBOzZCQUNsRixNQUFzQztBQUFBLDhDQUFuQyxPQUFPLFVBQVUsVUFBUyxHQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxZQUFBOzs7Ozs7OzsifQ==
