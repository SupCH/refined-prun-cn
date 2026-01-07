import _sfc_main$1 from './GridItemView.vue.js';
import MaterialIcon from './MaterialIcon.vue.js';
import { getMaterialNameByTicker } from './util.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GridMaterialIcon',
  props: {
    amount: {},
    text: {},
    ticker: {},
    warning: { type: Boolean },
  },
  setup(__props) {
    const name = computed(() => {
      if (__props.text !== void 0) {
        return __props.text;
      }
      if (__props.ticker === 'SHPT') {
        return 'Shipment';
      }
      return getMaterialNameByTicker(__props.ticker) ?? '???';
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$1,
          { name: unref(name) },
          {
            default: withCtx(() => [
              createVNode(
                MaterialIcon,
                {
                  ticker: _ctx.ticker,
                  amount: _ctx.amount,
                  warning: _ctx.warning,
                },
                null,
                8,
                ['ticker', 'amount', 'warning'],
              ),
            ]),
            _: 1,
          },
          8,
          ['name'],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR3JpZE1hdGVyaWFsSWNvbi52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0dyaWRNYXRlcmlhbEljb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgR3JpZEl0ZW1WaWV3IGZyb20gJ0BzcmMvY29tcG9uZW50cy9HcmlkSXRlbVZpZXcudnVlJztcbmltcG9ydCBNYXRlcmlhbEljb24gZnJvbSAnQHNyYy9jb21wb25lbnRzL01hdGVyaWFsSWNvbi52dWUnO1xuaW1wb3J0IHsgZ2V0TWF0ZXJpYWxOYW1lQnlUaWNrZXIgfSBmcm9tICdAc3JjL3V0aWwnO1xuXG5jb25zdCB7IHRleHQsIHRpY2tlciB9ID0gZGVmaW5lUHJvcHM8e1xuICBhbW91bnQ/OiBudW1iZXI7XG4gIHRleHQ/OiBzdHJpbmc7XG4gIHRpY2tlcjogc3RyaW5nO1xuICB3YXJuaW5nPzogYm9vbGVhbjtcbn0+KCk7XG5cbmNvbnN0IG5hbWUgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICh0ZXh0ICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdGV4dDtcbiAgfVxuICBpZiAodGlja2VyID09PSAnU0hQVCcpIHtcbiAgICByZXR1cm4gJ1NoaXBtZW50JztcbiAgfVxuICByZXR1cm4gZ2V0TWF0ZXJpYWxOYW1lQnlUaWNrZXIodGlja2VyKSA/PyAnPz8/Jztcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPEdyaWRJdGVtVmlldyA6bmFtZT1cIm5hbWVcIj5cbiAgICA8TWF0ZXJpYWxJY29uIDp0aWNrZXI9XCJ0aWNrZXJcIiA6YW1vdW50PVwiYW1vdW50XCIgOndhcm5pbmc9XCJ3YXJuaW5nXCIgLz5cbiAgPC9HcmlkSXRlbVZpZXc+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwidGlja2VyIiwiYW1vdW50Iiwid2FybmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7QUFZQSxVQUFBLE9BQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxRQUFBLFNBQUEsUUFBQTtBQUNFLGVBQUEsUUFBQTtBQUFBLE1BQU87QUFFVCxVQUFBLFFBQUEsV0FBQSxRQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFFVCxhQUFBLHdCQUFBLFFBQUEsTUFBQSxLQUFBO0FBQUEsSUFBMEMsQ0FBQTs7O1FBS2pCLFNBQUFBLFFBQUEsTUFBQTtBQUFBLFVBQzhDQyxZQUFBLGNBQUE7QUFBQSxZQUFBLFFBQUEsS0FBQTtBQUFBLFlBQTlDQyxRQUFBQSxLQUFBQTtBQUFBQSxZQUFpQkMsU0FBQUEsS0FBQUE7QUFBQUEsVUFBa0JDLEdBQUFBLE1BQUFBLEdBQUFBLENBQUFBLFVBQUFBLFVBQUFBLFNBQUFBLENBQUFBO0FBQUFBOzs7Ozs7In0=
