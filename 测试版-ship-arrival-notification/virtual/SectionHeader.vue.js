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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2VjdGlvbkhlYWRlci52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJbQy5TZWN0aW9uSGVhZGVyLmNvbnRhaW5lciwgQy5mb250cy5mb250UmVndWxhcl1cIj48c2xvdCAvPjwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfX3VuaW1wb3J0X3VucmVmXyIsIl9fdW5pbXBvcnRfQyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7NEJBQ2dCLE9BQUEsT0FBQSxLQUFBLElBQUFBLE1BQUFDLENBQUEsNkJBQTJCLE9BQUEsT0FBQSxLQUFBLElBQUFELE1BQUFDLENBQUEsR0FBQyxNQUFBLFdBQUEsQ0FBQTtBQUFBOzs7OzsifQ==
