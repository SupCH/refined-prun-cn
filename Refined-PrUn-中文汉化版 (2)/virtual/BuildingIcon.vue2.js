import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['title'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BuildingIcon',
  props: {
    amount: {},
    ticker: {},
  },
  setup(__props) {
    const amountClasses = [
      C.MaterialIcon.indicator,
      C.MaterialIcon.neutral,
      C.MaterialIcon.typeVerySmall,
    ];
    function onClick() {
      showBuffer(`BUI ${__props.ticker}`);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).BuildingIcon.container,
              _ctx.$style.container,
            ]),
            title: _ctx.ticker,
            onClick,
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(
                  ('C' in _ctx ? _ctx.C : unref(C)).BuildingIcon.tickerContainer,
                ),
              },
              [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).BuildingIcon.ticker),
                  },
                  toDisplayString(_ctx.ticker),
                  3,
                ),
              ],
              2,
            ),
            _ctx.amount
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).MaterialIcon.indicatorContainer,
                    ]),
                  },
                  [
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(amountClasses),
                      },
                      toDisplayString(_ctx.amount),
                      1,
                    ),
                  ],
                  2,
                ))
              : createCommentVNode('', true),
          ],
          10,
          _hoisted_1,
        )
      );
    };
  },
});
export { _sfc_main as default };
