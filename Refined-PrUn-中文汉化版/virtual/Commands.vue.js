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
  __name: 'Commands',
  props: {
    label: { default: 'CMD' },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.containerCommand,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.cmd,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.formComponent,
            ]),
          },
          [
            createBaseVNode(
              'label',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.label,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                ]),
              },
              [createBaseVNode('span', null, toDisplayString(_ctx.label), 1)],
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.input,
                  ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                ]),
              },
              [renderSlot(_ctx.$slots, 'default')],
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
