import { C } from './prun-css.js';
import _sfc_main$1 from './PrunButton.vue.js';
import {
  defineComponent,
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
  __name: 'ActionConfirmationOverlay',
  props: {
    confirmLabel: { default: 'Confirm' },
    message: {},
    onClose: { type: Function },
    onConfirm: { type: Function },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.container,
              ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.overlay,
            ]),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.message,
                  ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.message,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeLarger,
                ]),
              },
              [
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.message,
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.message,
                      ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                      ('C' in _ctx ? _ctx.C : unref(C)).type.typeLarger,
                    ]),
                  },
                  'Confirmation required',
                  2,
                ),
                createBaseVNode(
                  'span',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.text,
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionFeedback.text,
                      ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                      ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                    ]),
                  },
                  toDisplayString(_ctx.message),
                  3,
                ),
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).ActionConfirmationOverlay.buttons,
                    ]),
                  },
                  [
                    createVNode(
                      _sfc_main$1,
                      {
                        neutral: '',
                        onClick: _ctx.onClose,
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[0] || (_cache[0] = [createTextVNode('Cancel', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                    createVNode(
                      _sfc_main$1,
                      {
                        danger: '',
                        onClick: _ctx.onConfirm,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(_ctx.confirmLabel), 1),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ],
                  2,
                ),
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
