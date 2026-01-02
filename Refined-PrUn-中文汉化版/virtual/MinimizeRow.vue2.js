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
  __name: 'MinimizeRow',
  props: {
    isMinimized: { type: Boolean },
    onClick: { type: Function },
  },
  setup(__props) {
    const symbol = computed(() => (__props.isMinimized ? '+' : '-'));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.containerPassive,
              ('C' in _ctx ? _ctx.C : unref(C)).forms.passive,
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
              'Minimize',
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
              [
                createBaseVNode('div', null, [
                  createBaseVNode(
                    'div',
                    {
                      class: normalizeClass(_ctx.$style.minimize),
                      onClick:
                        _cache[0] ||
                        (_cache[0] = //@ts-ignore
                          (...args) => _ctx.onClick && _ctx.onClick(...args)),
                    },
                    toDisplayString(unref(symbol)),
                    3,
                  ),
                ]),
              ],
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
