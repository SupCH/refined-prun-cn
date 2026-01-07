import { C } from './prun-css.js';
import _sfc_main$1 from './Tooltip.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createBlock,
  createCommentVNode,
  renderSlot,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Passive',
  props: {
    label: {},
    tooltip: {},
    tooltipPosition: {},
  },
  setup(__props) {
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
            createBaseVNode('label', null, [
              createBaseVNode('span', null, toDisplayString(_ctx.label), 1),
              _ctx.tooltip
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 0,
                      position: _ctx.tooltipPosition,
                      tooltip: _ctx.tooltip,
                    },
                    null,
                    8,
                    ['position', 'tooltip'],
                  ))
                : createCommentVNode('', true),
            ]),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).FormComponent.input,
                  ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                ]),
              },
              [
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass([
                      ('C' in _ctx ? _ctx.C : unref(C)).StaticInput.static,
                      ('C' in _ctx ? _ctx.C : unref(C)).forms.static,
                    ]),
                  },
                  [renderSlot(_ctx.$slots, 'default')],
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
