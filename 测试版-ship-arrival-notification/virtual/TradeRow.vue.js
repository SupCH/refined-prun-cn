import { C } from './prun-css.js';
import PrunLink from './PrunLink.vue.js';
import { fixed0, fixed2, hhmm } from './format.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TradeRow',
  props: {
    date: {},
    order: {},
    trade: {},
  },
  setup(__props) {
    const total = computed(() => {
      const total2 =
        __props.trade.price.amount *
        __props.trade.amount *
        (__props.order.type === 'SELLING' ? 1 : -1);
      return fixed0(total2);
    });
    const price = computed(() => fixed2(__props.trade.price.amount));
    const currency = computed(() => __props.trade.price.currency);
    const typeClass = computed(() =>
      __props.order.type === 'SELLING' ? C.OrderTypeLabel.SELLING : C.OrderTypeLabel.BUYING,
    );
    const fullTicker = computed(
      () => `${__props.order.material.ticker}.${__props.order.exchange.code}`,
    );
    const onTimeClick = () => showBuffer(`CXO ${__props.order.id.substring(0, 8)}`);
    const onTickerClick = () => showBuffer(`CXOB ${fullTicker.value}`);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tr', null, [
          createBaseVNode('td', null, [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Link.link),
                onClick: onTimeClick,
              },
              toDisplayString(unref(hhmm)(_ctx.date)),
              3,
            ),
          ]),
          createBaseVNode('td', null, [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(unref(typeClass)),
              },
              toDisplayString(_ctx.order.type === 'SELLING' ? 'SELL' : 'BUY'),
              3,
            ),
          ]),
          createBaseVNode('td', null, [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Link.link),
                onClick: onTickerClick,
              },
              toDisplayString(unref(fullTicker)),
              3,
            ),
          ]),
          createBaseVNode('td', null, [
            createVNode(
              PrunLink,
              {
                command: `CO ${_ctx.trade.partner.code}`,
              },
              {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.trade.partner.name), 1),
                ]),
                _: 1,
              },
              8,
              ['command'],
            ),
          ]),
          createBaseVNode(
            'td',
            {
              class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ComExOrdersTable.number),
            },
            toDisplayString(unref(fixed0)(_ctx.trade.amount)),
            3,
          ),
          createBaseVNode(
            'td',
            {
              class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ComExOrdersTable.number),
            },
            toDisplayString(unref(price)) + ' ' + toDisplayString(unref(currency)),
            3,
          ),
          createBaseVNode(
            'td',
            {
              class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ComExOrdersTable.number),
            },
            toDisplayString(unref(total)) + ' ' + toDisplayString(unref(currency)),
            3,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVHJhZGVSb3cudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NYVFMvVHJhZGVSb3cudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkxpbmsgZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5MaW5rLnZ1ZSc7XG5pbXBvcnQgeyBmaXhlZDAsIGZpeGVkMiwgaGhtbSB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5cbmNvbnN0IHsgZGF0ZSwgb3JkZXIsIHRyYWRlIH0gPSBkZWZpbmVQcm9wczx7XG4gIGRhdGU6IG51bWJlcjtcbiAgb3JkZXI6IFBydW5BcGkuQ1hPcmRlcjtcbiAgdHJhZGU6IFBydW5BcGkuQ1hUcmFkZTtcbn0+KCk7XG5cbmNvbnN0IHRvdGFsID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCB0b3RhbCA9IHRyYWRlLnByaWNlLmFtb3VudCAqIHRyYWRlLmFtb3VudCAqIChvcmRlci50eXBlID09PSAnU0VMTElORycgPyAxIDogLTEpO1xuICByZXR1cm4gZml4ZWQwKHRvdGFsKTtcbn0pO1xuXG5jb25zdCBwcmljZSA9IGNvbXB1dGVkKCgpID0+IGZpeGVkMih0cmFkZS5wcmljZS5hbW91bnQpKTtcbmNvbnN0IGN1cnJlbmN5ID0gY29tcHV0ZWQoKCkgPT4gdHJhZGUucHJpY2UuY3VycmVuY3kpO1xuXG5jb25zdCB0eXBlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PlxuICBvcmRlci50eXBlID09PSAnU0VMTElORycgPyBDLk9yZGVyVHlwZUxhYmVsLlNFTExJTkcgOiBDLk9yZGVyVHlwZUxhYmVsLkJVWUlORyxcbik7XG5jb25zdCBmdWxsVGlja2VyID0gY29tcHV0ZWQoKCkgPT4gYCR7b3JkZXIubWF0ZXJpYWwudGlja2VyfS4ke29yZGVyLmV4Y2hhbmdlLmNvZGV9YCk7XG5cbmNvbnN0IG9uVGltZUNsaWNrID0gKCkgPT4gc2hvd0J1ZmZlcihgQ1hPICR7b3JkZXIuaWQuc3Vic3RyaW5nKDAsIDgpfWApO1xuY29uc3Qgb25UaWNrZXJDbGljayA9ICgpID0+IHNob3dCdWZmZXIoYENYT0IgJHtmdWxsVGlja2VyLnZhbHVlfWApO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHRyPlxuICAgIDx0ZD5cbiAgICAgIDxzcGFuIDpjbGFzcz1cIkMuTGluay5saW5rXCIgQGNsaWNrPVwib25UaW1lQ2xpY2tcIj5cbiAgICAgICAge3sgaGhtbShkYXRlKSB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPHNwYW4gOmNsYXNzPVwidHlwZUNsYXNzXCI+e3sgb3JkZXIudHlwZSA9PT0gJ1NFTExJTkcnID8gJ1NFTEwnIDogJ0JVWScgfX08L3NwYW4+XG4gICAgPC90ZD5cbiAgICA8dGQ+XG4gICAgICA8c3BhbiA6Y2xhc3M9XCJDLkxpbmsubGlua1wiIEBjbGljaz1cIm9uVGlja2VyQ2xpY2tcIj5cbiAgICAgICAge3sgZnVsbFRpY2tlciB9fVxuICAgICAgPC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPFBydW5MaW5rIDpjb21tYW5kPVwiYENPICR7dHJhZGUucGFydG5lci5jb2RlfWBcIj57eyB0cmFkZS5wYXJ0bmVyLm5hbWUgfX08L1BydW5MaW5rPlxuICAgIDwvdGQ+XG4gICAgPHRkIDpjbGFzcz1cIkMuQ29tRXhPcmRlcnNUYWJsZS5udW1iZXJcIj57eyBmaXhlZDAodHJhZGUuYW1vdW50KSB9fTwvdGQ+XG4gICAgPHRkIDpjbGFzcz1cIkMuQ29tRXhPcmRlcnNUYWJsZS5udW1iZXJcIj57eyBwcmljZSB9fSB7eyBjdXJyZW5jeSB9fTwvdGQ+XG4gICAgPHRkIDpjbGFzcz1cIkMuQ29tRXhPcmRlcnNUYWJsZS5udW1iZXJcIj57eyB0b3RhbCB9fSB7eyBjdXJyZW5jeSB9fTwvdGQ+XG4gIDwvdHI+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX3RvRGlzcGxheVN0cmluZyIsIl91bnJlZiIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQVdBLFVBQUEsUUFBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLFNBQUEsUUFBQSxNQUFBLE1BQUEsU0FBQSxRQUFBLE1BQUEsVUFBQSxRQUFBLE1BQUEsU0FBQSxZQUFBLElBQUE7QUFDQSxhQUFBLE9BQUEsTUFBQTtBQUFBLElBQW1CLENBQUE7QUFHckIsVUFBQSxRQUFBLFNBQUEsTUFBQSxPQUFBLFFBQUEsTUFBQSxNQUFBLE1BQUEsQ0FBQTtBQUNBLFVBQUEsV0FBQSxTQUFBLE1BQUEsUUFBQSxNQUFBLE1BQUEsUUFBQTtBQUVBLFVBQUEsWUFBQTtBQUFBLE1BQWtCLE1BQUEsUUFBQSxNQUFBLFNBQUEsWUFBQSxFQUFBLGVBQUEsVUFBQSxFQUFBLGVBQUE7QUFBQSxJQUN1RDtBQUV6RSxVQUFBLGFBQUEsU0FBQSxNQUFBLEdBQUEsUUFBQSxNQUFBLFNBQUEsTUFBQSxJQUFBLFFBQUEsTUFBQSxTQUFBLElBQUEsRUFBQTtBQUVBLFVBQUEsY0FBQSxNQUFBLFdBQUEsT0FBQSxRQUFBLE1BQUEsR0FBQSxVQUFBLEdBQUEsQ0FBQSxDQUFBLEVBQUE7QUFDQSxVQUFBLGdCQUFBLE1BQUEsV0FBQSxRQUFBLFdBQUEsS0FBQSxFQUFBOzs7UUF3Qk9BLGdCQUFBLE1BQUEsTUFBQTtBQUFBLFVBZkVBLGdCQUFBLFFBQUE7QUFBQSxZQURJLE9BQUFDLGdCQUZPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxJQUFBQTtBQUFBQSxZQUFXLFNBQUE7QUFBQSxVQUFVLEdBQUFDLGdCQUFBQyxNQUFBLElBQUEsRUFBQSxLQUFBLElBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUNyQixDQUFBO0FBQUE7VUFLWEosZ0JBQUEsUUFBQTtBQUFBLFlBRDRFLE9BQUFDLGVBQUFHLE1BQUEsU0FBQSxDQUFBO0FBQUEsVUFBeEQsR0FBQUQsZ0JBQUEsS0FBQSxNQUFBLFNBQUEsWUFBQSxTQUFBLEtBQUEsR0FBQSxDQUFBO0FBQUEsUUFBZSxDQUFBO0FBQUE7VUFNbkNILGdCQUFBLFFBQUE7QUFBQSxZQURJLE9BQUFDLGdCQUZPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxJQUFBQTtBQUFBQSxZQUFXLFNBQUE7QUFBQSxVQUFVLEdBQUFDLGdCQUFBQyxNQUFBLFVBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUNwQixDQUFBO0FBQUE7VUFLWkMsWUFBQSxVQUFBO0FBQUEsWUFEZ0YsU0FBQSxNQUFBLEtBQUEsTUFBQSxRQUFBLElBQUE7QUFBQSxVQUF2QyxHQUFBO0FBQUE7Y0FBNEJDLGdCQUFBSCxnQkFBQSxLQUFBLE1BQUEsUUFBQSxJQUFBLEdBQUEsQ0FBQTtBQUFBLFlBQUgsQ0FBQTtBQUFBOzs7O1VBRUQsT0FBQUYsZ0JBQTFEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxpQkFBQUEsTUFBQUE7QUFBQUEsUUFBeUIsR0FBQUMsZ0JBQUFDLE1BQUEsTUFBQSxFQUFBLEtBQUEsTUFBQSxNQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsUUFBd0JKLGdCQUFBLE1BQUE7QUFBQSxVQUNTLE9BQUFDLGdCQUExREMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsaUJBQUFBLE1BQUFBO0FBQUFBLFFBQXlCLEdBQUFDLGdCQUFBQyxNQUFBLEtBQUEsQ0FBQSxJQUFBLE1BQUFELGdCQUFBQyxNQUFBLFFBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUF5QkosZ0JBQUEsTUFBQTtBQUFBLFVBQ1EsT0FBQUMsZ0JBQTFEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxpQkFBQUEsTUFBQUE7QUFBQUEsUUFBeUIsR0FBQUMsZ0JBQUFDLE1BQUEsS0FBQSxDQUFBLElBQUEsTUFBQUQsZ0JBQUFDLE1BQUEsUUFBQSxDQUFBLEdBQUEsQ0FBQTtBQUFBLE1BQXlCLENBQUE7QUFBQTs7OyJ9
