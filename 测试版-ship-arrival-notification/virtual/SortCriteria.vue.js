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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU29ydENyaXRlcmlhLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2ludi1jdXN0b20taXRlbS1zb3J0aW5nL1NvcnRDcml0ZXJpYS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBTb3J0aW5nT3JkZXJJY29uIGZyb20gJy4vU29ydGluZ09yZGVySWNvbi52dWUnO1xuXG5kZWZpbmVQcm9wczx7XG4gIGFjdGl2ZT86IGJvb2xlYW47XG4gIGxhYmVsOiBzdHJpbmc7XG4gIHJldmVyc2U/OiBib29sZWFuO1xufT4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5JbnZlbnRvcnlTb3J0Q29udHJvbHMuY3JpdGVyaWFcIj5cbiAgICA8ZGl2Pnt7IGxhYmVsIH19PC9kaXY+XG4gICAgPFNvcnRpbmdPcmRlckljb24gdi1pZj1cImFjdGl2ZVwiIDpyZXZlcnNlPVwicmV2ZXJzZVwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIlNvcnRpbmdPcmRlckljb24iLCJyZXZlcnNlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7UUFjUSxPQUFBQSxnQkFIT0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsc0JBQUFBLFFBQUFBO0FBQUFBLE1BQWdDLEdBQUE7QUFBQTtRQUM5QixLQUFBLFVBQUFDLGFBQUFDLFlBQUFDLGFBQUE7QUFBQSxVQUN3QyxLQUFBO0FBQUE7UUFBWEMsR0FBQUEsTUFBQUEsR0FBQUEsQ0FBQUEsU0FBQUEsQ0FBQUEsS0FBQUEsbUJBQUFBLElBQUFBLElBQUFBO0FBQUFBOzs7OyJ9
