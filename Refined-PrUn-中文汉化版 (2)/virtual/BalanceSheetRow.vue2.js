import { formatChange, formatAmount } from './utils7.js';
import RowExpandButton from './RowExpandButton.vue.js';
import _sfc_main$1 from './Tooltip.vue.js';
import {
  defineComponent,
  resolveComponent,
  createElementBlock,
  openBlock,
  Fragment,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
  createTextVNode,
  createBlock,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BalanceSheetRow',
  props: {
    current: {},
    indent: {},
    last: {},
    previous: {},
    row: {},
  },
  setup(__props) {
    const expanded = ref(false);
    function formatRowAmount(sheet, row) {
      const amount = calculate(sheet, row.value);
      if (amount === void 0) {
        return '--';
      }
      const formatted = formatAmount(amount);
      return row.less ? `(${formatted})` : formatted;
    }
    function calculate(sheet, selector) {
      return sheet !== void 0 ? selector(sheet) : void 0;
    }
    function calculateChange(selector) {
      const fromLast = calculate(__props.last, selector);
      const fromPrevious = calculate(__props.previous, selector);
      if (fromLast === void 0 || fromPrevious === void 0 || fromPrevious === 0) {
        return void 0;
      }
      return (fromLast - fromPrevious) / fromPrevious;
    }
    return (_ctx, _cache) => {
      const _component_BalanceSheetRow = resolveComponent('BalanceSheetRow', true);
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('tr', null, [
              createBaseVNode('td', null, [
                _ctx.indent > 0
                  ? (openBlock(true),
                    createElementBlock(
                      Fragment,
                      { key: 0 },
                      renderList(_ctx.indent, i => {
                        return (
                          openBlock(),
                          createBlock(
                            RowExpandButton,
                            {
                              key: i,
                              class: normalizeClass(_ctx.$style.hidden),
                            },
                            null,
                            8,
                            ['class'],
                          )
                        );
                      }),
                      128,
                    ))
                  : createCommentVNode('', true),
                createVNode(
                  RowExpandButton,
                  {
                    modelValue: unref(expanded),
                    'onUpdate:modelValue':
                      _cache[0] ||
                      (_cache[0] = $event => (isRef(expanded) ? (expanded.value = $event) : null)),
                    class: normalizeClass(!_ctx.row.children ? _ctx.$style.hidden : null),
                  },
                  null,
                  8,
                  ['modelValue', 'class'],
                ),
                _ctx.row.less
                  ? (openBlock(),
                    createElementBlock(Fragment, { key: 1 }, [createTextVNode(' Less:')], 64))
                  : createCommentVNode('', true),
                createTextVNode(' ' + toDisplayString(_ctx.row.name) + ' ', 1),
                _ctx.row.tooltip
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$1,
                      {
                        key: 2,
                        tooltip: _ctx.row.tooltip,
                        class: normalizeClass(_ctx.$style.tooltip),
                      },
                      null,
                      8,
                      ['tooltip', 'class'],
                    ))
                  : createCommentVNode('', true),
              ]),
              createBaseVNode(
                'td',
                null,
                toDisplayString(formatRowAmount(_ctx.current, _ctx.row)),
                1,
              ),
              createBaseVNode('td', null, toDisplayString(formatRowAmount(_ctx.last, _ctx.row)), 1),
              createBaseVNode(
                'td',
                null,
                toDisplayString(formatRowAmount(_ctx.previous, _ctx.row)),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(formatChange)(calculateChange(_ctx.row.value))),
                1,
              ),
            ]),
            _ctx.row.children && unref(expanded)
              ? (openBlock(true),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  renderList(_ctx.row.children, child => {
                    return (
                      openBlock(),
                      createBlock(
                        _component_BalanceSheetRow,
                        {
                          key: child.name,
                          current: _ctx.current,
                          last: _ctx.last,
                          previous: _ctx.previous,
                          row: child,
                          indent: _ctx.indent + 1,
                        },
                        null,
                        8,
                        ['current', 'last', 'previous', 'row', 'indent'],
                      )
                    );
                  }),
                  128,
                ))
              : createCommentVNode('', true),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
