import { C } from './prun-css.js';
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
  __name: 'HeadItem',
  props: {
    active: { type: Boolean },
    label: {},
  },
  setup(__props) {
    const classes = computed(() => ({
      [C.HeadItem.indicator]: true,
      [C.HeadItem.indicatorPrimary]: true,
      [C.HeadItem.indicatorPrimaryActive]: __props.active,
      [C.effects.shadowPrimary]: __props.active,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).HeadItem.container,
              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
              ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
              ('C' in _ctx ? _ctx.C : unref(C)).HeadItem.link,
            ]),
          },
          [
            createBaseVNode(
              'span',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).HeadItem.label),
              },
              toDisplayString(_ctx.label),
              3,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(unref(classes)),
              },
              null,
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
