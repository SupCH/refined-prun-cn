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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZGl0aW9uTGlzdC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ09OVFMvQ29uZGl0aW9uTGlzdC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBDb25kaXRpb25JdGVtIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0NPTlRTL0NvbmRpdGlvbkl0ZW0udnVlJztcblxuY29uc3QgeyBjb25kaXRpb25zLCBjb250cmFjdCB9ID0gZGVmaW5lUHJvcHM8e1xuICBjb25kaXRpb25zOiBQcnVuQXBpLkNvbnRyYWN0Q29uZGl0aW9uW107XG4gIGNvbnRyYWN0OiBQcnVuQXBpLkNvbnRyYWN0O1xufT4oKTtcblxuY29uc3QgZmlsdGVyZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBjb25kaXRpb25zXG4gICAgLnNsaWNlKClcbiAgICAuc29ydCgoYSwgYikgPT4gYS5pbmRleCAtIGIuaW5kZXgpXG4gICAgLmZpbHRlcih4ID0+IHgudHlwZSAhPT0gJ0xPQU5fSU5TVEFMTE1FTlQnKTtcbn0pO1xuY29uc3QgbG9hbkluc3RhbGxtZW50cyA9IGNvbXB1dGVkKCgpID0+IGNvbmRpdGlvbnMuZmlsdGVyKHggPT4geC50eXBlID09PSAnTE9BTl9JTlNUQUxMTUVOVCcpKTtcbmNvbnN0IGxvYW5Ub3RhbCA9IGNvbXB1dGVkKCgpID0+IGxvYW5JbnN0YWxsbWVudHMudmFsdWUubGVuZ3RoKTtcbmNvbnN0IGxvYW5GaWxsZWQgPSBjb21wdXRlZChcbiAgKCkgPT4gbG9hbkluc3RhbGxtZW50cy52YWx1ZS5maWx0ZXIoeCA9PiB4LnN0YXR1cyA9PT0gJ0ZVTEZJTExFRCcpLmxlbmd0aCxcbik7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8Q29uZGl0aW9uSXRlbVxuICAgIHYtZm9yPVwiY29uZGl0aW9uIGluIGZpbHRlcmVkXCJcbiAgICA6a2V5PVwiY29uZGl0aW9uLmlkXCJcbiAgICA6Y29uZGl0aW9uPVwiY29uZGl0aW9uXCJcbiAgICA6Y29udHJhY3Q9XCJjb250cmFjdFwiIC8+XG4gIDxkaXYgdi1pZj1cImxvYW5Ub3RhbCAhPT0gMFwiPnt7IGxvYW5GaWxsZWQgfX0ve3sgbG9hblRvdGFsIH19IExvYW4gSW5zdGFsbG1lbnQ8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiY29udHJhY3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQVFBLFVBQUEsV0FBQSxTQUFBLE1BQUE7QUFDRSxhQUFBLFFBQUEsV0FBQSxNQUFBLEVBQUEsS0FBQSxDQUFBLEdBQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxLQUFBLEVBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxTQUFBLGtCQUFBO0FBQUEsSUFHNEMsQ0FBQTtBQUU5QyxVQUFBLG1CQUFBLFNBQUEsTUFBQSxRQUFBLFdBQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxTQUFBLGtCQUFBLENBQUE7QUFDQSxVQUFBLFlBQUEsU0FBQSxNQUFBLGlCQUFBLE1BQUEsTUFBQTtBQUNBLFVBQUEsYUFBQTtBQUFBLE1BQW1CLE1BQUEsaUJBQUEsTUFBQSxPQUFBLENBQUEsTUFBQSxFQUFBLFdBQUEsV0FBQSxFQUFBO0FBQUEsSUFDa0Q7Ozs7O1lBUzFDLEtBQUEsVUFBQTtBQUFBLFlBRlA7QUFBQSxZQUNmLFVBQUEsS0FBQTtBQUFBLFVBQ1VBLEdBQUFBLE1BQUFBLEdBQUFBLENBQUFBLGFBQUFBLFVBQUFBLENBQUFBO0FBQUFBOzs7Ozs7In0=
