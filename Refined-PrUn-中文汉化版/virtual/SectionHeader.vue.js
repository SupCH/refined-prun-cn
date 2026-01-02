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
      'div',
      {
        class: normalizeClass([
          ('C' in _ctx ? _ctx.C : unref(C)).SectionHeader.container,
          ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
        ]),
      },
      [renderSlot(_ctx.$slots, 'default')],
      2,
    )
  );
}
const SectionHeader = /* @__PURE__ */ _export_sfc(_sfc_main, [['render', _sfc_render]]);
export { SectionHeader as default };
