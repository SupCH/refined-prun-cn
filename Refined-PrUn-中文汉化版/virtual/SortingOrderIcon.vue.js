import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { display: 'block' } };
const _hoisted_2 = {
  'aria-hidden': 'true',
  width: '10',
  height: '10',
  role: 'img',
  fill: 'currentcolor',
  preserveAspectRatio: 'xMidYMid meet',
  viewBox: '0 0 24 24',
  style: { 'vertical-align': 'middle' },
};
const _hoisted_3 = {
  key: 0,
  d: 'M25.422964 22.120933l-12.13774-21.02318L.88681 22.11324z',
};
const _hoisted_4 = {
  key: 1,
  d: 'M.88681 1.097752l12.13774 21.02318L25.422964 1.105446z',
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SortingOrderIcon',
  props: {
    reverse: { type: Boolean },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).InventorySortControls.order),
            style: { display: 'inline' },
          },
          [
            createBaseVNode('div', _hoisted_1, [
              (openBlock(),
              createElementBlock('svg', _hoisted_2, [
                createBaseVNode('g', null, [
                  _ctx.reverse
                    ? (openBlock(), createElementBlock('path', _hoisted_3))
                    : (openBlock(), createElementBlock('path', _hoisted_4)),
                ]),
              ])),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
