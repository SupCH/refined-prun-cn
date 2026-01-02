import { C } from './prun-css.js';
import _export_sfc from './plugin-vue_export-helper.js';
import { createElementBlock, openBlock, renderSlot } from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = {};
function _sfc_render(_ctx, _cache) {
  return (
    openBlock(),
    createElementBlock(
      'span',
      {
        class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).InlineFlex.inlineFlex),
      },
      [renderSlot(_ctx.$slots, 'default')],
      2,
    )
  );
}
const InlineFlex = /* @__PURE__ */ _export_sfc(_sfc_main, [['render', _sfc_render]]);
export { InlineFlex as default };
