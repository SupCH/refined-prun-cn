import ConditionItem from './ConditionItem.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  createCommentVNode,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConditionList',
  props: {
    conditions: {},
    contract: {},
  },
  setup(__props) {
    const filtered = computed(() => {
      return __props.conditions
        .slice()
        .sort((a, b) => a.index - b.index)
        .filter(x => x.type !== 'LOAN_INSTALLMENT');
    });
    const loanInstallments = computed(() =>
      __props.conditions.filter(x => x.type === 'LOAN_INSTALLMENT'),
    );
    const loanTotal = computed(() => loanInstallments.value.length);
    const loanFilled = computed(
      () => loanInstallments.value.filter(x => x.status === 'FULFILLED').length,
    );
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(filtered), condition => {
                return (
                  openBlock(),
                  createBlock(
                    ConditionItem,
                    {
                      key: condition.id,
                      condition,
                      contract: _ctx.contract,
                    },
                    null,
                    8,
                    ['condition', 'contract'],
                  )
                );
              }),
              128,
            )),
            unref(loanTotal) !== 0
              ? (openBlock(),
                createElementBlock(
                  'div',
                  _hoisted_1,
                  toDisplayString(unref(loanFilled)) +
                    '/' +
                    toDisplayString(unref(loanTotal)) +
                    ' Loan Installment',
                  1,
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
