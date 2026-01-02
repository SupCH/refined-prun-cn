import { C } from './prun-css.js';
import { formatChange } from './utils7.js';
import BalanceSheetRow from './BalanceSheetRow.vue.js';
import { formatCurrency } from './format.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { colspan: '5' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BalanceSheetSection',
  props: {
    current: {},
    last: {},
    previous: {},
    section: {},
  },
  setup(__props) {
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
    const totalClass = computed(() => {
      if (!__props.section.coloredTotal) {
        return void 0;
      }
      const change = calculateChange(__props.section.total);
      if (change === void 0) {
        return void 0;
      }
      return {
        [C.ColoredValue.positive]: change > 0,
        [C.ColoredValue.negative]: change < 0,
      };
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('tbody', null, [
          createBaseVNode('tr', null, [
            createBaseVNode('th', _hoisted_1, toDisplayString(_ctx.section.name), 1),
          ]),
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(_ctx.section.children, row => {
              return (
                openBlock(),
                createBlock(
                  BalanceSheetRow,
                  {
                    key: row.name,
                    current: _ctx.current,
                    last: _ctx.last,
                    previous: _ctx.previous,
                    row,
                    indent: 0,
                  },
                  null,
                  8,
                  ['current', 'last', 'previous', 'row'],
                )
              );
            }),
            128,
          )),
          createBaseVNode(
            'tr',
            {
              class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).IncomeStatementPanel.totals),
            },
            [
              createBaseVNode(
                'td',
                {
                  class: normalizeClass(
                    ('C' in _ctx ? _ctx.C : unref(C)).IncomeStatementPanel.number,
                  ),
                },
                'Total',
                2,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(formatCurrency)(calculate(_ctx.current, _ctx.section.total))),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(unref(formatCurrency)(calculate(_ctx.last, _ctx.section.total))),
                1,
              ),
              createBaseVNode(
                'td',
                null,
                toDisplayString(
                  unref(formatCurrency)(calculate(_ctx.previous, _ctx.section.total)),
                ),
                1,
              ),
              createBaseVNode(
                'td',
                {
                  class: normalizeClass(unref(totalClass)),
                },
                toDisplayString(unref(formatChange)(calculateChange(_ctx.section.total))),
                3,
              ),
            ],
            2,
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
