import { C, prunStyleUpdated } from './prun-css.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import { canAcceptContract } from './utils4.js';
import { contractsStore } from './contracts.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  withDirectives,
  openBlock,
  createElementBlock,
  Fragment,
  renderList,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = ['onClick'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SidebarButtons',
  props: {
    comPulse: { type: Boolean },
  },
  setup(__props) {
    const pendingContracts = computed(
      () => contractsStore.all.value?.filter(canAcceptContract).length ?? 0,
    );
    const hasPendingContracts = computed(() => pendingContracts.value > 0);
    const activeIndicator = [
      C.Frame.toggleIndicator,
      C.Frame.toggleIndicatorPulseActive,
      C.effects.shadowPulseSuccess,
    ];
    const inactiveIndicator = [C.Frame.toggleIndicator, C.Frame.toggleIndicatorSecondary];
    function indicatorClass(command) {
      if (command === 'COM' && __props.comPulse) {
        return activeIndicator;
      }
      if (['CONTS', 'XIT CONTS'].includes(command) && hasPendingContracts.value) {
        return activeIndicator;
      }
      if (command === 'XIT DEV' && prunStyleUpdated.value) {
        return activeIndicator;
      }
      return inactiveIndicator;
    }
    return (_ctx, _cache) => {
      return withDirectives(
        (openBlock(),
        createElementBlock('div', null, [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(unref(userData).settings.sidebar, button => {
              return (
                openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: unref(objectId)(button),
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Frame.toggle),
                    onClick: () => unref(showBuffer)(button[1]),
                  },
                  [
                    createBaseVNode(
                      'span',
                      {
                        class: normalizeClass([
                          ('C' in _ctx ? _ctx.C : unref(C)).Frame.toggleLabel,
                          ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                          ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                        ]),
                      },
                      toDisplayString(button[0]),
                      3,
                    ),
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(indicatorClass(button[1])),
                      },
                      null,
                      2,
                    ),
                  ],
                  10,
                  _hoisted_1,
                )
              );
            }),
            128,
          )),
        ])),
        [[unref(so), [unref(userData).settings.sidebar, { animation: 150 }]]],
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2lkZWJhckJ1dHRvbnMudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvY3VzdG9tLWxlZnQtc2lkZWJhci9TaWRlYmFyQnV0dG9ucy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGNhbkFjY2VwdENvbnRyYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVFMvdXRpbHMnO1xuaW1wb3J0IHsgY29udHJhY3RzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29udHJhY3RzJztcbmltcG9ydCB7IHZEcmFnZ2FibGUgfSBmcm9tICd2dWUtZHJhZ2dhYmxlLXBsdXMnO1xuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5pbXBvcnQgeyBwcnVuU3R5bGVVcGRhdGVkIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3BydW4tY3NzJztcblxuY29uc3QgeyBjb21QdWxzZSB9ID0gZGVmaW5lUHJvcHM8eyBjb21QdWxzZT86IGJvb2xlYW4gfT4oKTtcblxuY29uc3QgcGVuZGluZ0NvbnRyYWN0cyA9IGNvbXB1dGVkKFxuICAoKSA9PiBjb250cmFjdHNTdG9yZS5hbGwudmFsdWU/LmZpbHRlcihjYW5BY2NlcHRDb250cmFjdCkubGVuZ3RoID8/IDAsXG4pO1xuY29uc3QgaGFzUGVuZGluZ0NvbnRyYWN0cyA9IGNvbXB1dGVkKCgpID0+IHBlbmRpbmdDb250cmFjdHMudmFsdWUgPiAwKTtcblxuY29uc3QgYWN0aXZlSW5kaWNhdG9yID0gW1xuICBDLkZyYW1lLnRvZ2dsZUluZGljYXRvcixcbiAgQy5GcmFtZS50b2dnbGVJbmRpY2F0b3JQdWxzZUFjdGl2ZSxcbiAgQy5lZmZlY3RzLnNoYWRvd1B1bHNlU3VjY2Vzcyxcbl07XG5jb25zdCBpbmFjdGl2ZUluZGljYXRvciA9IFtDLkZyYW1lLnRvZ2dsZUluZGljYXRvciwgQy5GcmFtZS50b2dnbGVJbmRpY2F0b3JTZWNvbmRhcnldO1xuXG5mdW5jdGlvbiBpbmRpY2F0b3JDbGFzcyhjb21tYW5kOiBzdHJpbmcpIHtcbiAgaWYgKGNvbW1hbmQgPT09ICdDT00nICYmIGNvbVB1bHNlKSB7XG4gICAgcmV0dXJuIGFjdGl2ZUluZGljYXRvcjtcbiAgfVxuICBpZiAoWydDT05UUycsICdYSVQgQ09OVFMnXS5pbmNsdWRlcyhjb21tYW5kKSAmJiBoYXNQZW5kaW5nQ29udHJhY3RzLnZhbHVlKSB7XG4gICAgcmV0dXJuIGFjdGl2ZUluZGljYXRvcjtcbiAgfVxuICBpZiAoY29tbWFuZCA9PT0gJ1hJVCBERVYnICYmIHBydW5TdHlsZVVwZGF0ZWQudmFsdWUpIHtcbiAgICByZXR1cm4gYWN0aXZlSW5kaWNhdG9yO1xuICB9XG4gIHJldHVybiBpbmFjdGl2ZUluZGljYXRvcjtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgdi1kcmFnZ2FibGU9XCJbdXNlckRhdGEuc2V0dGluZ3Muc2lkZWJhciwgeyBhbmltYXRpb246IDE1MCB9XVwiPlxuICAgIDxkaXZcbiAgICAgIHYtZm9yPVwiYnV0dG9uIGluIHVzZXJEYXRhLnNldHRpbmdzLnNpZGViYXJcIlxuICAgICAgOmtleT1cIm9iamVjdElkKGJ1dHRvbilcIlxuICAgICAgOmNsYXNzPVwiQy5GcmFtZS50b2dnbGVcIlxuICAgICAgQGNsaWNrPVwiKCkgPT4gc2hvd0J1ZmZlcihidXR0b25bMV0pXCI+XG4gICAgICA8c3BhbiA6Y2xhc3M9XCJbQy5GcmFtZS50b2dnbGVMYWJlbCwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVSZWd1bGFyXVwiPlxuICAgICAgICB7eyBidXR0b25bMF0gfX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxkaXYgOmNsYXNzPVwiaW5kaWNhdG9yQ2xhc3MoYnV0dG9uWzFdKVwiIC8+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX3VucmVmIiwiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlRWxlbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQVdBLFVBQUEsbUJBQUE7QUFBQSxNQUF5QixNQUFBLGVBQUEsSUFBQSxPQUFBLE9BQUEsaUJBQUEsRUFBQSxVQUFBO0FBQUEsSUFDNkM7QUFFdEUsVUFBQSxzQkFBQSxTQUFBLE1BQUEsaUJBQUEsUUFBQSxDQUFBO0FBRUEsVUFBQSxrQkFBQTtBQUFBLE1BQXdCLEVBQUEsTUFBQTtBQUFBLE1BQ2QsRUFBQSxNQUFBO0FBQUEsTUFDQSxFQUFBLFFBQUE7QUFBQSxJQUNFO0FBRVosVUFBQSxvQkFBQSxDQUFBLEVBQUEsTUFBQSxpQkFBQSxFQUFBLE1BQUEsd0JBQUE7QUFFQSxhQUFBLGVBQUEsU0FBQTtBQUNFLFVBQUEsWUFBQSxTQUFBLFFBQUEsVUFBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsVUFBQSxDQUFBLFNBQUEsV0FBQSxFQUFBLFNBQUEsT0FBQSxLQUFBLG9CQUFBLE9BQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULFVBQUEsWUFBQSxhQUFBLGlCQUFBLE9BQUE7QUFDRSxlQUFBO0FBQUEsTUFBTztBQUVULGFBQUE7QUFBQSxJQUFPOzs7U0FnQkRBLFVBQUEsSUFBQSxHQUFBQyxtQkFBQUMsVUFBQSxNQUFBQyxXQUFBQyxNQUFBLFFBQUEsRUFBQSxTQUFBLFNBQUEsQ0FBQSxXQUFBOztZQURFLEtBQUFBLE1BQUEsUUFBQSxFQUFBLE1BQUE7QUFBQSxZQVBpQixPQUFBQyxnQkFDYkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsTUFBQUE7QUFBQUEsWUFBYyxTQUFBLE1BQUFGLE1BQUEsVUFBQSxFQUFBLE9BQUEsQ0FBQSxDQUFBO0FBQUEsVUFDUyxHQUFBO0FBQUE7Y0FHeEIsT0FBQUMsZUFBQSxFQUZRQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSx1QkFBcUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLE1BQUFBLGNBQXFCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtZQUFrQixHQUFBQyxnQkFBQSxPQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxZQUNoRUMsZ0JBQUEsT0FBQTtBQUFBLGNBRStCLE9BQUFILGVBQUEsZUFBQSxPQUFBLENBQUEsQ0FBQSxDQUFBO0FBQUEsWUFBUixHQUFBLE1BQUEsQ0FBQTtBQUFBOzs7O01BVE0sQ0FBQTtBQUFBOzs7In0=
