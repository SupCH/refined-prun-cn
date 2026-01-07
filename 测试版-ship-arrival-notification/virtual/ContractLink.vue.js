import PrunLink from './PrunLink.vue.js';
import { canAcceptContract, canPartnerAcceptContract, isFactionContract } from './utils4.js';
import fa from './font-awesome.module.css.js';
import coloredValue from './colored-value.module.css.js';
import {
  defineComponent,
  computed,
  createBlock,
  openBlock,
  withCtx,
  createTextVNode,
  createElementBlock,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContractLink',
  props: {
    contract: {},
  },
  setup(__props) {
    const canAccept = computed(() => canAcceptContract(__props.contract));
    const canPartnerAccept = computed(() => canPartnerAcceptContract(__props.contract));
    const linkStyle = computed(() => ({
      display: isFactionContract(__props.contract) ? 'inline' : 'block',
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          PrunLink,
          {
            command: `CONT ${_ctx.contract.localId}`,
            style: normalizeStyle(unref(linkStyle)),
          },
          {
            default: withCtx(() => [
              createTextVNode(
                toDisplayString(_ctx.contract.name || _ctx.contract.localId) + ' ',
                1,
              ),
              unref(canAccept)
                ? (openBlock(),
                  createElementBlock(
                    'span',
                    {
                      key: 0,
                      class: normalizeClass([unref(fa).solid, unref(coloredValue).warning]),
                    },
                    toDisplayString(''),
                    2,
                  ))
                : createCommentVNode('', true),
              unref(canPartnerAccept)
                ? (openBlock(),
                  createElementBlock(
                    'span',
                    {
                      key: 1,
                      class: normalizeClass([unref(fa).solid, unref(coloredValue).warning]),
                    },
                    toDisplayString(''),
                    2,
                  ))
                : createCommentVNode('', true),
            ]),
            _: 1,
          },
          8,
          ['command', 'style'],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udHJhY3RMaW5rLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9DT05UUy9Db250cmFjdExpbmsudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkxpbmsgZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5MaW5rLnZ1ZSc7XG5pbXBvcnQge1xuICBjYW5BY2NlcHRDb250cmFjdCxcbiAgY2FuUGFydG5lckFjY2VwdENvbnRyYWN0LFxuICBpc0ZhY3Rpb25Db250cmFjdCxcbn0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvdXRpbHMnO1xuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGNvbG9yZWRWYWx1ZSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvY3NzL2NvbG9yZWQtdmFsdWUubW9kdWxlLmNzcyc7XG5cbmNvbnN0IHsgY29udHJhY3QgfSA9IGRlZmluZVByb3BzPHsgY29udHJhY3Q6IFBydW5BcGkuQ29udHJhY3QgfT4oKTtcblxuY29uc3QgY2FuQWNjZXB0ID0gY29tcHV0ZWQoKCkgPT4gY2FuQWNjZXB0Q29udHJhY3QoY29udHJhY3QpKTtcblxuY29uc3QgY2FuUGFydG5lckFjY2VwdCA9IGNvbXB1dGVkKCgpID0+IGNhblBhcnRuZXJBY2NlcHRDb250cmFjdChjb250cmFjdCkpO1xuXG5jb25zdCBsaW5rU3R5bGUgPSBjb21wdXRlZCgoKSA9PiAoe1xuICBkaXNwbGF5OiBpc0ZhY3Rpb25Db250cmFjdChjb250cmFjdCkgPyAnaW5saW5lJyA6ICdibG9jaycsXG59KSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8UHJ1bkxpbmsgOmNvbW1hbmQ9XCJgQ09OVCAke2NvbnRyYWN0LmxvY2FsSWR9YFwiIDpzdHlsZT1cImxpbmtTdHlsZVwiPlxuICAgIHt7IGNvbnRyYWN0Lm5hbWUgfHwgY29udHJhY3QubG9jYWxJZCB9fVxuICAgIDxzcGFuIHYtaWY9XCJjYW5BY2NlcHRcIiA6Y2xhc3M9XCJbZmEuc29saWQsIGNvbG9yZWRWYWx1ZS53YXJuaW5nXVwiPnt7ICdcXHVmMGUwJyB9fTwvc3Bhbj5cbiAgICA8c3BhbiB2LWlmPVwiY2FuUGFydG5lckFjY2VwdFwiIDpjbGFzcz1cIltmYS5zb2xpZCwgY29sb3JlZFZhbHVlLndhcm5pbmddXCI+e3sgJ1xcdWYxZDgnIH19PC9zcGFuPlxuICA8L1BydW5MaW5rPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplU3R5bGUiLCJfdW5yZWYiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUNvbW1lbnRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVlBLFVBQUEsWUFBQSxTQUFBLE1BQUEsa0JBQUEsUUFBQSxRQUFBLENBQUE7QUFFQSxVQUFBLG1CQUFBLFNBQUEsTUFBQSx5QkFBQSxRQUFBLFFBQUEsQ0FBQTtBQUVBLFVBQUEsWUFBQSxTQUFBLE9BQUE7QUFBQSxNQUFrQyxTQUFBLGtCQUFBLFFBQUEsUUFBQSxJQUFBLFdBQUE7QUFBQSxJQUNrQixFQUFBOzs7UUFTdkMsU0FBQSxRQUFBLEtBQUEsU0FBQSxPQUFBO0FBQUEsUUFKaUMsT0FBQUEsZUFBQUMsTUFBQSxTQUFBLENBQUE7QUFBQSxNQUFxQixHQUFBO0FBQUE7VUFDeEJDLGdCQUFBQyxnQkFBQSxLQUFBLFNBQUEsUUFBQSxLQUFBLFNBQUEsT0FBQSxJQUFBLEtBQUEsQ0FBQTtBQUFBLFVBQ3ZDRixNQUFBLFNBQUEsS0FBQUcsVUFBQSxHQUFBQyxtQkFBQSxRQUFBO0FBQUEsWUFBc0YsS0FBQTtBQUFBO1VBQXhCLEdBQUFGLGdCQUFBLEdBQUEsR0FBQSxDQUFBLEtBQUFHLG1CQUFBLElBQUEsSUFBQTtBQUFBO1lBQytCLEtBQUE7QUFBQTtVQUF4QixHQUFBSCxnQkFBQSxHQUFBLEdBQUEsQ0FBQSxLQUFBRyxtQkFBQSxJQUFBLElBQUE7QUFBQTs7Ozs7OyJ9
