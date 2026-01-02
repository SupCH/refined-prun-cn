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
