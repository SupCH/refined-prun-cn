import { C } from './prun-css.js';
import _sfc_main$1 from './SortingOrderIcon.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createBlock,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SortCriteria',
  props: {
    active: { type: Boolean },
    label: {},
    reverse: { type: Boolean },
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).InventorySortControls.criteria),
          },
          [
            createBaseVNode('div', null, toDisplayString(_ctx.label), 1),
            _ctx.active
              ? (openBlock(),
                createBlock(
                  _sfc_main$1,
                  {
                    key: 0,
                    reverse: _ctx.reverse,
                  },
                  null,
                  8,
                  ['reverse'],
                ))
              : createCommentVNode('', true),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
