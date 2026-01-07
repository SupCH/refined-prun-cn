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
