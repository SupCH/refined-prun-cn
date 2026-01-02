import { C } from './prun-css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GridItemView',
  props: {
    name: {},
  },
  setup(__props) {
    const textElementClass = [C.GridItemView.name, C.fonts.fontRegular, C.type.typeRegular];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).GridItemView.container),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).GridItemView.image),
              },
              [renderSlot(_ctx.$slots, 'default')],
              2,
            ),
            createBaseVNode(
              'span',
              {
                class: normalizeClass(textElementClass),
              },
              toDisplayString(_ctx.name),
              1,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
