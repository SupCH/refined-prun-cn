import { t } from './index5.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import { contractsStore } from './contracts.js';
import _sfc_main$1 from './ContractRow.vue.js';
import { canAcceptContract } from './utils4.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { colspan: '4' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CONTS',
  setup(__props) {
    const filtered = computed(() =>
      contractsStore.all.value.filter(shouldShowContract).sort(compareContracts),
    );
    function shouldShowContract(contract) {
      switch (contract.status) {
        case 'OPEN':
        case 'CLOSED':
        case 'PARTIALLY_FULFILLED':
        case 'DEADLINE_EXCEEDED': {
          return true;
        }
        default: {
          return false;
        }
      }
    }
    function compareContracts(a, b) {
      if (canAcceptContract(a) && !canAcceptContract(b)) {
        return -1;
      }
      if (canAcceptContract(b) && !canAcceptContract(a)) {
        return 1;
      }
      return (b.date?.timestamp ?? 0) - (a.date?.timestamp ?? 0);
    }
    return (_ctx, _cache) => {
      return !unref(contractsStore).fetched
        ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
        : (openBlock(),
          createElementBlock('table', _hoisted_1, [
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.contract')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.item')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.partner')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.self')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(filtered))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_2, [
                    createBaseVNode(
                      'td',
                      _hoisted_3,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.noActive')),
                      1,
                    ),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(filtered), contract => {
                      return (
                        openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: contract.id,
                            contract,
                          },
                          null,
                          8,
                          ['contract'],
                        )
                      );
                    }),
                    128,
                  )),
            ]),
          ]));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ09OVFMudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NPTlRTL0NPTlRTLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lci52dWUnO1xuaW1wb3J0IHsgY29udHJhY3RzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29udHJhY3RzJztcbmltcG9ydCBDb250cmFjdFJvdyBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9DT05UUy9Db250cmFjdFJvdy52dWUnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyBjYW5BY2NlcHRDb250cmFjdCB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0NPTlRTL3V0aWxzJztcblxuY29uc3QgZmlsdGVyZWQgPSBjb21wdXRlZCgoKSA9PlxuICBjb250cmFjdHNTdG9yZS5hbGwudmFsdWUhLmZpbHRlcihzaG91bGRTaG93Q29udHJhY3QpLnNvcnQoY29tcGFyZUNvbnRyYWN0cyksXG4pO1xuXG5mdW5jdGlvbiBzaG91bGRTaG93Q29udHJhY3QoY29udHJhY3Q6IFBydW5BcGkuQ29udHJhY3QpIHtcbiAgc3dpdGNoIChjb250cmFjdC5zdGF0dXMpIHtcbiAgICBjYXNlICdPUEVOJzpcbiAgICBjYXNlICdDTE9TRUQnOlxuICAgIGNhc2UgJ1BBUlRJQUxMWV9GVUxGSUxMRUQnOlxuICAgIGNhc2UgJ0RFQURMSU5FX0VYQ0VFREVEJzoge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGRlZmF1bHQ6IHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gY29tcGFyZUNvbnRyYWN0cyhhOiBQcnVuQXBpLkNvbnRyYWN0LCBiOiBQcnVuQXBpLkNvbnRyYWN0KSB7XG4gIGlmIChjYW5BY2NlcHRDb250cmFjdChhKSAmJiAhY2FuQWNjZXB0Q29udHJhY3QoYikpIHtcbiAgICByZXR1cm4gLTE7XG4gIH1cbiAgaWYgKGNhbkFjY2VwdENvbnRyYWN0KGIpICYmICFjYW5BY2NlcHRDb250cmFjdChhKSkge1xuICAgIHJldHVybiAxO1xuICB9XG4gIHJldHVybiAoYi5kYXRlPy50aW1lc3RhbXAgPz8gMCkgLSAoYS5kYXRlPy50aW1lc3RhbXAgPz8gMCk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8TG9hZGluZ1NwaW5uZXIgdi1pZj1cIiFjb250cmFjdHNTdG9yZS5mZXRjaGVkXCIgLz5cbiAgPHRhYmxlIHYtZWxzZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD57eyB0KCdjb250cy5jb250cmFjdCcpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2NvbnRzLml0ZW0nKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdjb250cy5wYXJ0bmVyJykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgnY29udHMuc2VsZicpIH19PC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICA8dHIgdi1pZj1cImlzRW1wdHkoZmlsdGVyZWQpXCI+XG4gICAgICAgIDx0ZCBjb2xzcGFuPVwiNFwiPnt7IHQoJ2NvbnRzLm5vQWN0aXZlJykgfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgIDxDb250cmFjdFJvdyB2LWZvcj1cImNvbnRyYWN0IGluIGZpbHRlcmVkXCIgOmtleT1cImNvbnRyYWN0LmlkXCIgOmNvbnRyYWN0PVwiY29udHJhY3RcIiAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0Il0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFPQSxVQUFBLFdBQUE7QUFBQSxNQUFpQixNQUFBLGVBQUEsSUFBQSxNQUFBLE9BQUEsa0JBQUEsRUFBQSxLQUFBLGdCQUFBO0FBQUEsSUFDMkQ7QUFHNUUsYUFBQSxtQkFBQSxVQUFBO0FBQ0UsY0FBQSxTQUFBLFFBQUE7QUFBQSxRQUF5QixLQUFBO0FBQUEsUUFDbEIsS0FBQTtBQUFBLFFBQ0EsS0FBQTtBQUFBLFFBQ0EsS0FBQSxxQkFBQTtBQUVILGlCQUFBO0FBQUEsUUFBTztBQUFBLFFBQ1QsU0FBQTtBQUVFLGlCQUFBO0FBQUEsUUFBTztBQUFBLE1BQ1Q7QUFBQSxJQUNGO0FBR0YsYUFBQSxpQkFBQSxHQUFBLEdBQUE7QUFDRSxVQUFBLGtCQUFBLENBQUEsS0FBQSxDQUFBLGtCQUFBLENBQUEsR0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsVUFBQSxrQkFBQSxDQUFBLEtBQUEsQ0FBQSxrQkFBQSxDQUFBLEdBQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULGNBQUEsRUFBQSxNQUFBLGFBQUEsTUFBQSxFQUFBLE1BQUEsYUFBQTtBQUFBLElBQXdEOztBQUtqQyxhQUFBLENBQUFBLE1BQUEsY0FBQSxFQUFBLFdBQUFDLFVBQUEsR0FBQUMsWUFBQSxnQkFBQSxFQUFBLEtBQUEsRUFBQSxDQUFBLE1BQUFELFVBQUEsR0FBQUUsbUJBQUEsU0FBQSxZQUFBO0FBQUEsUUFrQmZDLGdCQUFBLFNBQUEsTUFBQTtBQUFBLFVBVEVBLGdCQUFBLE1BQUEsTUFBQTtBQUFBLFlBRERBLGdCQUFBLE1BQUEsTUFBQUMsaUJBSklDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGdCQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDRixnQkFBQSxNQUFBLE1BQUFDLGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxZQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDRixnQkFBQSxNQUFBLE1BQUFDLGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxlQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDRixnQkFBQSxNQUFBLE1BQUFDLGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxZQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxVQUFDLENBQUE7QUFBQTs7VUFVSk4sTUFBQSxPQUFBLEVBQUFBLE1BQUEsUUFBQSxDQUFBLEtBQUFDLGFBQUFFLG1CQUFBLE1BQUEsWUFBQTtBQUFBLFlBSkRDLGdCQUFBLE1BQUEsWUFBQUMsaUJBRGdCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxnQkFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsVUFBQyxDQUFBLE1BQUFMLFVBQUEsSUFBQSxHQUFBRSxtQkFBQUksVUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBQyxXQUFBUixNQUFBLFFBQUEsR0FBQSxDQUFBLGFBQUE7O2NBR2dFLEtBQUEsU0FBQTtBQUFBLGNBQTNCO0FBQUEsWUFBSyxHQUFBLE1BQUEsR0FBQSxDQUFBLFVBQUEsQ0FBQTtBQUFBOzs7Ozs7In0=
