import { t } from './index5.js';
import { selfCurrentConditions, selfNonCurrentConditions } from './contract-conditions.js';
import { contractsStore } from './contracts.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import _sfc_main$1 from './ConditionRow.vue.js';
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
const _hoisted_2 = { colspan: '3' };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { colspan: '3' };
const _hoisted_5 = { colspan: '3' };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { colspan: '3' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CONTC',
  setup(__props) {
    const current = computed(() =>
      selfCurrentConditions.value.filter(x =>
        x.dependencies.every(x2 => x2.status === 'FULFILLED'),
      ),
    );
    const nonCurrent = computed(() =>
      selfNonCurrentConditions.value.filter(x =>
        x.dependencies.every(x2 => x2.status === 'FULFILLED'),
      ),
    );
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
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.deadline')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.condition')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  _hoisted_2,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.currentConditions')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(current))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_3, [
                    createBaseVNode(
                      'td',
                      _hoisted_4,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.noPending')),
                      1,
                    ),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(current), x => {
                      return (
                        openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: x.condition.id,
                            contract: x.contract,
                            condition: x.condition,
                            deadline: x.deadline,
                          },
                          null,
                          8,
                          ['contract', 'condition', 'deadline'],
                        )
                      );
                    }),
                    128,
                  )),
            ]),
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  _hoisted_5,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.nonCurrentConditions')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(nonCurrent))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_6, [
                    createBaseVNode(
                      'td',
                      _hoisted_7,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.noPending')),
                      1,
                    ),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(nonCurrent), x => {
                      return (
                        openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: x.condition.id,
                            contract: x.contract,
                            condition: x.condition,
                            deadline: x.deadline,
                          },
                          null,
                          8,
                          ['contract', 'condition', 'deadline'],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ09OVEMudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NPTlRDL0NPTlRDLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHtcbiAgc2VsZkN1cnJlbnRDb25kaXRpb25zLFxuICBzZWxmTm9uQ3VycmVudENvbmRpdGlvbnMsXG59IGZyb20gJ0BzcmMvY29yZS9iYWxhbmNlL2NvbnRyYWN0LWNvbmRpdGlvbnMnO1xuaW1wb3J0IHsgY29udHJhY3RzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29udHJhY3RzJztcbmltcG9ydCBMb2FkaW5nU3Bpbm5lciBmcm9tICdAc3JjL2NvbXBvbmVudHMvTG9hZGluZ1NwaW5uZXIudnVlJztcbmltcG9ydCBDb25kaXRpb25Sb3cgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQ09OVEMvQ29uZGl0aW9uUm93LnZ1ZSc7XG5pbXBvcnQgeyBpc0VtcHR5IH0gZnJvbSAndHMtZXh0cmFzJztcblxuY29uc3QgY3VycmVudCA9IGNvbXB1dGVkKCgpID0+XG4gIHNlbGZDdXJyZW50Q29uZGl0aW9ucy52YWx1ZSEuZmlsdGVyKHggPT4geC5kZXBlbmRlbmNpZXMuZXZlcnkoeCA9PiB4LnN0YXR1cyA9PT0gJ0ZVTEZJTExFRCcpKSxcbik7XG5cbmNvbnN0IG5vbkN1cnJlbnQgPSBjb21wdXRlZCgoKSA9PlxuICBzZWxmTm9uQ3VycmVudENvbmRpdGlvbnMudmFsdWUhLmZpbHRlcih4ID0+IHguZGVwZW5kZW5jaWVzLmV2ZXJ5KHggPT4geC5zdGF0dXMgPT09ICdGVUxGSUxMRUQnKSksXG4pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPExvYWRpbmdTcGlubmVyIHYtaWY9XCIhY29udHJhY3RzU3RvcmUuZmV0Y2hlZFwiIC8+XG4gIDx0YWJsZSB2LWVsc2U+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+e3sgdCgnY29udHMuY29udHJhY3QnKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdjb250Yy5kZWFkbGluZScpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2NvbnRjLmNvbmRpdGlvbicpIH19PC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aCBjb2xzcGFuPVwiM1wiPnt7IHQoJ2NvbnRjLmN1cnJlbnRDb25kaXRpb25zJykgfX08L3RoPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keT5cbiAgICAgIDx0ciB2LWlmPVwiaXNFbXB0eShjdXJyZW50KVwiPlxuICAgICAgICA8dGQgY29sc3Bhbj1cIjNcIj57eyB0KCdjb250Yy5ub1BlbmRpbmcnKSB9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgPENvbmRpdGlvblJvd1xuICAgICAgICAgIHYtZm9yPVwieCBpbiBjdXJyZW50XCJcbiAgICAgICAgICA6a2V5PVwieC5jb25kaXRpb24uaWRcIlxuICAgICAgICAgIDpjb250cmFjdD1cInguY29udHJhY3RcIlxuICAgICAgICAgIDpjb25kaXRpb249XCJ4LmNvbmRpdGlvblwiXG4gICAgICAgICAgOmRlYWRsaW5lPVwieC5kZWFkbGluZVwiIC8+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvdGJvZHk+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGggY29sc3Bhbj1cIjNcIj57eyB0KCdjb250Yy5ub25DdXJyZW50Q29uZGl0aW9ucycpIH19PC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICA8dHIgdi1pZj1cImlzRW1wdHkobm9uQ3VycmVudClcIj5cbiAgICAgICAgPHRkIGNvbHNwYW49XCIzXCI+e3sgdCgnY29udGMubm9QZW5kaW5nJykgfX08L3RkPlxuICAgICAgPC90cj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgIDxDb25kaXRpb25Sb3dcbiAgICAgICAgICB2LWZvcj1cInggaW4gbm9uQ3VycmVudFwiXG4gICAgICAgICAgOmtleT1cInguY29uZGl0aW9uLmlkXCJcbiAgICAgICAgICA6Y29udHJhY3Q9XCJ4LmNvbnRyYWN0XCJcbiAgICAgICAgICA6Y29uZGl0aW9uPVwieC5jb25kaXRpb25cIlxuICAgICAgICAgIDpkZWFkbGluZT1cInguZGVhZGxpbmVcIiAvPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIHNjb3BlZD48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91bnJlZiIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJ0IiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFVQSxVQUFBLFVBQUE7QUFBQSxNQUFnQixNQUFBLHNCQUFBLE1BQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxhQUFBLE1BQUEsQ0FBQSxPQUFBLEdBQUEsV0FBQSxXQUFBLENBQUE7QUFBQSxJQUM4RTtBQUc5RixVQUFBLGFBQUE7QUFBQSxNQUFtQixNQUFBLHlCQUFBLE1BQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxhQUFBLE1BQUEsQ0FBQSxPQUFBLEdBQUEsV0FBQSxXQUFBLENBQUE7QUFBQSxJQUM4RTs7QUFLeEUsYUFBQSxDQUFBQSxNQUFBLGNBQUEsRUFBQSxXQUFBQyxVQUFBLEdBQUFDLFlBQUEsZ0JBQUEsRUFBQSxLQUFBLEVBQUEsQ0FBQSxNQUFBRCxVQUFBLEdBQUFFLG1CQUFBLFNBQUEsWUFBQTtBQUFBLFFBNkNmQyxnQkFBQSxTQUFBLE1BQUE7QUFBQSxVQXJDRUEsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsWUFEREEsZ0JBQUEsTUFBQSxNQUFBQyxpQkFISUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsZ0JBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQUMsaUJBQ0RDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGdCQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDRixnQkFBQSxNQUFBLE1BQUFDLGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxpQkFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsVUFBQyxDQUFBO0FBQUE7O1VBT0pGLGdCQUFBLE1BQUEsTUFBQTtBQUFBLFlBRERBLGdCQUFBLE1BQUEsWUFBQUMsaUJBRGdCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSx5QkFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsVUFBQyxDQUFBO0FBQUE7O1VBZWhCTixNQUFBLE9BQUEsRUFBQUEsTUFBQSxPQUFBLENBQUEsS0FBQUMsYUFBQUUsbUJBQUEsTUFBQSxZQUFBO0FBQUEsWUFUREMsZ0JBQUEsTUFBQSxZQUFBQyxpQkFEZ0JDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGlCQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxVQUFDLENBQUEsTUFBQUwsVUFBQSxJQUFBLEdBQUFFLG1CQUFBSSxVQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUFDLFdBQUFSLE1BQUEsT0FBQSxHQUFBLENBQUEsTUFBQTs7Y0FRTyxLQUFBLEVBQUEsVUFBQTtBQUFBLGNBSFAsVUFBQSxFQUFBO0FBQUEsY0FDTCxXQUFBLEVBQUE7QUFBQSxjQUNDLFVBQUEsRUFBQTtBQUFBLFlBQ0QsR0FBQSxNQUFBLEdBQUEsQ0FBQSxZQUFBLGFBQUEsVUFBQSxDQUFBO0FBQUE7OztVQU9YSSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxZQUREQSxnQkFBQSxNQUFBLFlBQUFDLGlCQURnQkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsNEJBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFVBQUMsQ0FBQTtBQUFBOztVQWVoQk4sTUFBQSxPQUFBLEVBQUFBLE1BQUEsVUFBQSxDQUFBLEtBQUFDLGFBQUFFLG1CQUFBLE1BQUEsWUFBQTtBQUFBLFlBVERDLGdCQUFBLE1BQUEsWUFBQUMsaUJBRGdCQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxpQkFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsVUFBQyxDQUFBLE1BQUFMLFVBQUEsSUFBQSxHQUFBRSxtQkFBQUksVUFBQSxFQUFBLEtBQUEsRUFBQSxHQUFBQyxXQUFBUixNQUFBLFVBQUEsR0FBQSxDQUFBLE1BQUE7O2NBUU8sS0FBQSxFQUFBLFVBQUE7QUFBQSxjQUhQLFVBQUEsRUFBQTtBQUFBLGNBQ0wsV0FBQSxFQUFBO0FBQUEsY0FDQyxVQUFBLEVBQUE7QUFBQSxZQUNELEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxhQUFBLFVBQUEsQ0FBQTtBQUFBOzs7Ozs7In0=
