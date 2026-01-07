import { useCssModule } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import link from './link.module.css.js';
import { companyStore } from './company.js';
import { fixed0, fixed2 } from './format.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'OrderRow',
  props: {
    order: {},
    request: { type: Boolean },
    highlightAmount: { type: Boolean },
    highlightPrice: { type: Boolean },
    onHover: { type: Function },
    onClick: { type: Function },
  },
  setup(__props) {
    const $style = useCssModule();
    const isOwnOrder = computed(
      () => (__props.order.amount ?? 0) > 0 && __props.order.trader.id === companyStore.value?.id,
    );
    const amount = computed(() =>
      (__props.order.amount ?? 0) > 0 ? fixed0(__props.order.amount) : '∞',
    );
    const amountClass = computed(() => ({
      [$style.value]: true,
      [$style.valueHighlight]: __props.highlightAmount,
      [link.link]: isOwnOrder.value,
    }));
    const price = computed(() => fixed2(__props.order.limit.amount));
    const priceClass = computed(() => [
      __props.request ? C.ComExOrderBookPanel.requestPrice : C.ComExOrderBookPanel.offerPrice,
      {
        [$style.valueHighlight]: __props.highlightPrice,
      },
    ]);
    function onAmountMouseEnter() {
      if (isOwnOrder.value) {
        return;
      }
      __props.onHover({ order: __props.order, cumulative: true });
    }
    function onPriceMouseEnter() {
      __props.onHover({ order: __props.order, cumulative: false });
    }
    function onValueMouseLeave() {
      __props.onHover(null);
    }
    function onAmountClick() {
      if (isOwnOrder.value) {
        showBuffer(`CXO ${__props.order.id.substring(0, 8)}`);
      } else {
        __props.onClick({ order: __props.order, cumulative: true });
      }
    }
    function onPriceClick() {
      __props.onClick({ order: __props.order, cumulative: false });
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tr', null, [
          createBaseVNode(
            'td',
            {
              class: normalizeClass([
                ('C' in _ctx ? _ctx.C : unref(C)).ComExOrderBookPanel.amount,
                unref(amountClass),
              ]),
              onMouseenter: onAmountMouseEnter,
              onMouseleave: onValueMouseLeave,
              onClick: onAmountClick,
            },
            [createBaseVNode('div', null, toDisplayString(unref(amount)), 1)],
            34,
          ),
          createBaseVNode(
            'td',
            {
              class: normalizeClass([unref(priceClass), unref($style).value, unref($style).price]),
              onMouseenter: onPriceMouseEnter,
              onMouseleave: onValueMouseLeave,
              onClick: onPriceClick,
            },
            [createBaseVNode('div', null, toDisplayString(unref(price)), 1)],
            34,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiT3JkZXJSb3cudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4cG8tb3JkZXItYm9vay9PcmRlclJvdy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBsaW5rIGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9jc3MvbGluay5tb2R1bGUuY3NzJztcbmltcG9ydCB7IGNvbXBhbnlTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9jb21wYW55JztcbmltcG9ydCB7IGZpeGVkMCwgZml4ZWQyIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgT3JkZXJIb3ZlckRhdGEgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4cG8tb3JkZXItYm9vay9vcmRlci1ob3Zlci1kYXRhJztcbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5cbmNvbnN0IHsgb3JkZXIsIHJlcXVlc3QsIGhpZ2hsaWdodEFtb3VudCwgaGlnaGxpZ2h0UHJpY2UsIG9uSG92ZXIsIG9uQ2xpY2sgfSA9IGRlZmluZVByb3BzPHtcbiAgb3JkZXI6IFBydW5BcGkuQ1hCcm9rZXJPcmRlcjtcbiAgcmVxdWVzdD86IGJvb2xlYW47XG4gIGhpZ2hsaWdodEFtb3VudDogYm9vbGVhbjtcbiAgaGlnaGxpZ2h0UHJpY2U6IGJvb2xlYW47XG4gIG9uSG92ZXI6IChkYXRhOiBPcmRlckhvdmVyRGF0YSB8IG51bGwpID0+IHZvaWQ7XG4gIG9uQ2xpY2s6IChkYXRhOiBPcmRlckhvdmVyRGF0YSkgPT4gdm9pZDtcbn0+KCk7XG5cbmNvbnN0ICRzdHlsZSA9IHVzZUNzc01vZHVsZSgpO1xuXG5jb25zdCBpc093bk9yZGVyID0gY29tcHV0ZWQoXG4gICgpID0+IChvcmRlci5hbW91bnQgPz8gMCkgPiAwICYmIG9yZGVyLnRyYWRlci5pZCA9PT0gY29tcGFueVN0b3JlLnZhbHVlPy5pZCxcbik7XG5jb25zdCBhbW91bnQgPSBjb21wdXRlZCgoKSA9PiAoKG9yZGVyLmFtb3VudCA/PyAwKSA+IDAgPyBmaXhlZDAob3JkZXIuYW1vdW50ISkgOiAn4oieJykpO1xuY29uc3QgYW1vdW50Q2xhc3MgPSBjb21wdXRlZCgoKSA9PiAoe1xuICBbJHN0eWxlLnZhbHVlXTogdHJ1ZSxcbiAgWyRzdHlsZS52YWx1ZUhpZ2hsaWdodF06IGhpZ2hsaWdodEFtb3VudCxcbiAgW2xpbmsubGlua106IGlzT3duT3JkZXIudmFsdWUsXG59KSk7XG5jb25zdCBwcmljZSA9IGNvbXB1dGVkKCgpID0+IGZpeGVkMihvcmRlci5saW1pdC5hbW91bnQpKTtcbmNvbnN0IHByaWNlQ2xhc3MgPSBjb21wdXRlZCgoKSA9PiBbXG4gIHJlcXVlc3QgPyBDLkNvbUV4T3JkZXJCb29rUGFuZWwucmVxdWVzdFByaWNlIDogQy5Db21FeE9yZGVyQm9va1BhbmVsLm9mZmVyUHJpY2UsXG4gIHtcbiAgICBbJHN0eWxlLnZhbHVlSGlnaGxpZ2h0XTogaGlnaGxpZ2h0UHJpY2UsXG4gIH0sXG5dKTtcblxuZnVuY3Rpb24gb25BbW91bnRNb3VzZUVudGVyKCkge1xuICBpZiAoaXNPd25PcmRlci52YWx1ZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBvbkhvdmVyKHsgb3JkZXIsIGN1bXVsYXRpdmU6IHRydWUgfSk7XG59XG5cbmZ1bmN0aW9uIG9uUHJpY2VNb3VzZUVudGVyKCkge1xuICBvbkhvdmVyKHsgb3JkZXIsIGN1bXVsYXRpdmU6IGZhbHNlIH0pO1xufVxuXG5mdW5jdGlvbiBvblZhbHVlTW91c2VMZWF2ZSgpIHtcbiAgb25Ib3ZlcihudWxsKTtcbn1cblxuZnVuY3Rpb24gb25BbW91bnRDbGljaygpIHtcbiAgaWYgKGlzT3duT3JkZXIudmFsdWUpIHtcbiAgICBzaG93QnVmZmVyKGBDWE8gJHtvcmRlci5pZC5zdWJzdHJpbmcoMCwgOCl9YCk7XG4gIH0gZWxzZSB7XG4gICAgb25DbGljayh7IG9yZGVyLCBjdW11bGF0aXZlOiB0cnVlIH0pO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uUHJpY2VDbGljaygpIHtcbiAgb25DbGljayh7IG9yZGVyLCBjdW11bGF0aXZlOiBmYWxzZSB9KTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDx0cj5cbiAgICA8dGRcbiAgICAgIDpjbGFzcz1cIltDLkNvbUV4T3JkZXJCb29rUGFuZWwuYW1vdW50LCBhbW91bnRDbGFzc11cIlxuICAgICAgQG1vdXNlZW50ZXI9XCJvbkFtb3VudE1vdXNlRW50ZXJcIlxuICAgICAgQG1vdXNlbGVhdmU9XCJvblZhbHVlTW91c2VMZWF2ZVwiXG4gICAgICBAY2xpY2s9XCJvbkFtb3VudENsaWNrXCI+XG4gICAgICA8ZGl2PlxuICAgICAgICB7eyBhbW91bnQgfX1cbiAgICAgIDwvZGl2PlxuICAgIDwvdGQ+XG4gICAgPHRkXG4gICAgICA6Y2xhc3M9XCJbcHJpY2VDbGFzcywgJHN0eWxlLnZhbHVlLCAkc3R5bGUucHJpY2VdXCJcbiAgICAgIEBtb3VzZWVudGVyPVwib25QcmljZU1vdXNlRW50ZXJcIlxuICAgICAgQG1vdXNlbGVhdmU9XCJvblZhbHVlTW91c2VMZWF2ZVwiXG4gICAgICBAY2xpY2s9XCJvblByaWNlQ2xpY2tcIj5cbiAgICAgIDxkaXY+XG4gICAgICAgIHt7IHByaWNlIH19XG4gICAgICA8L2Rpdj5cbiAgICA8L3RkPlxuICA8L3RyPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi8qXG4gIE92ZXJyaWRlIGxlZnQvcmlnaHQgcGFkZGluZyBmcm9tIHZhbmlsbGEgY2xhc3NcbiovXG4ucHJpY2Uge1xuICB0YWJsZSB0Ym9keSB0ZCYge1xuICAgIHBhZGRpbmc6IDJweDtcbiAgfVxufVxuXG4udmFsdWUge1xuICBjdXJzb3I6IHBvaW50ZXI7XG59XG5cbi52YWx1ZUhpZ2hsaWdodCB7XG4gIGNvbG9yOiAjZjdhNjAwO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsVUFBQSxTQUFBLGFBQUE7QUFFQSxVQUFBLGFBQUE7QUFBQSxNQUFtQixPQUFBLFFBQUEsTUFBQSxVQUFBLEtBQUEsS0FBQSxRQUFBLE1BQUEsT0FBQSxPQUFBLGFBQUEsT0FBQTtBQUFBLElBQ3dEO0FBRTNFLFVBQUEsU0FBQSxTQUFBLE9BQUEsUUFBQSxNQUFBLFVBQUEsS0FBQSxJQUFBLE9BQUEsUUFBQSxNQUFBLE1BQUEsSUFBQSxHQUFBO0FBQ0EsVUFBQSxjQUFBLFNBQUEsT0FBQTtBQUFBLE1BQW9DLENBQUEsT0FBQSxLQUFBLEdBQUE7QUFBQSxNQUNsQixDQUFBLE9BQUEsY0FBQSxHQUFBLFFBQUE7QUFBQSxNQUNTLENBQUEsS0FBQSxJQUFBLEdBQUEsV0FBQTtBQUFBLElBQ0QsRUFBQTtBQUUxQixVQUFBLFFBQUEsU0FBQSxNQUFBLE9BQUEsUUFBQSxNQUFBLE1BQUEsTUFBQSxDQUFBO0FBQ0EsVUFBQSxhQUFBLFNBQUEsTUFBQTtBQUFBLE1BQWtDLFFBQUEsVUFBQSxFQUFBLG9CQUFBLGVBQUEsRUFBQSxvQkFBQTtBQUFBLE1BQ3FDO0FBQUEsUUFDckUsQ0FBQSxPQUFBLGNBQUEsR0FBQSxRQUFBO0FBQUEsTUFDMkI7QUFBQSxJQUMzQixDQUFBO0FBR0YsYUFBQSxxQkFBQTtBQUNFLFVBQUEsV0FBQSxPQUFBO0FBQ0U7QUFBQSxNQUFBO0FBRUYsY0FBQSxRQUFBLEVBQUEsT0FBQSxRQUFBLE9BQUEsWUFBQSxNQUFBO0FBQUEsSUFBbUM7QUFHckMsYUFBQSxvQkFBQTtBQUNFLGNBQUEsUUFBQSxFQUFBLE9BQUEsUUFBQSxPQUFBLFlBQUEsT0FBQTtBQUFBLElBQW9DO0FBR3RDLGFBQUEsb0JBQUE7QUFDRSxjQUFBLFFBQUEsSUFBQTtBQUFBLElBQVk7QUFHZCxhQUFBLGdCQUFBO0FBQ0UsVUFBQSxXQUFBLE9BQUE7QUFDRSxtQkFBQSxPQUFBLFFBQUEsTUFBQSxHQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQTtBQUFBLE1BQTRDLE9BQUE7QUFFNUMsZ0JBQUEsUUFBQSxFQUFBLE9BQUEsUUFBQSxPQUFBLFlBQUEsTUFBQTtBQUFBLE1BQW1DO0FBQUEsSUFDckM7QUFHRixhQUFBLGVBQUE7QUFDRSxjQUFBLFFBQUEsRUFBQSxPQUFBLFFBQUEsT0FBQSxZQUFBLE9BQUE7QUFBQSxJQUFvQzs7O1FBd0IvQkEsZ0JBQUEsTUFBQTtBQUFBLFVBVkUsT0FBQUMsZUFBQSxFQVBNQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxvQkFBQUEsUUFBQUEsTUFBQUEsV0FBQUEsQ0FBQUEsQ0FBQUE7QUFBQUEsVUFBeUMsY0FBQTtBQUFBLFVBQ3JDLGNBQUE7QUFBQSxVQUNBLFNBQUE7QUFBQSxRQUNMLEdBQUE7QUFBQTtRQUVHLEdBQUEsRUFBQTtBQUFBO1VBV1IsT0FBQUQsZUFBQSxDQUFBRSxNQUFBLFVBQUEsR0FBQUEsTUFBQSxNQUFBLEVBQUEsT0FBQUEsTUFBQSxNQUFBLEVBQUEsS0FBQSxDQUFBO0FBQUEsVUFQNEMsY0FBQTtBQUFBLFVBQ2xDLGNBQUE7QUFBQSxVQUNBLFNBQUE7QUFBQSxRQUNMLEdBQUE7QUFBQTtRQUVFLEdBQUEsRUFBQTtBQUFBOzs7OyJ9
