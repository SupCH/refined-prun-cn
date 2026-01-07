import xit from './xit-registry.js';
import { t } from './index5.js';
import { castArray } from './cast-array.js';
import PrunLink from './PrunLink.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CMDS',
  setup(__props) {
    const sorted = xit.registry.sort((a, b) => {
      const commandA = castArray(a.command)[0];
      const commandB = castArray(b.command)[0];
      return commandA.localeCompare(commandB);
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('table', null, [
          createBaseVNode('thead', null, [
            createBaseVNode('tr', null, [
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.command')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.description')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.mandatory')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.optional')),
                1,
              ),
            ]),
          ]),
          createBaseVNode('tbody', null, [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(sorted), command => {
                return (
                  openBlock(),
                  createElementBlock(
                    'tr',
                    {
                      key: unref(objectId)(command),
                    },
                    [
                      createBaseVNode('td', null, [
                        createVNode(
                          PrunLink,
                          {
                            command: 'XIT ' + unref(castArray)(command.command)[0],
                            'auto-submit': !command.mandatoryParameters,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(unref(castArray)(command.command)[0]),
                                1,
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['command', 'auto-submit'],
                        ),
                      ]),
                      createBaseVNode(
                        'td',
                        null,
                        toDisplayString(
                          ('t' in _ctx ? _ctx.t : unref(t))(
                            'commands.' + unref(castArray)(command.command)[0],
                          ),
                        ),
                        1,
                      ),
                      createBaseVNode('td', null, toDisplayString(command.mandatoryParameters), 1),
                      createBaseVNode('td', null, toDisplayString(command.optionalParameters), 1),
                    ],
                  )
                );
              }),
              128,
            )),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ01EUy52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ01EUy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IGNhc3RBcnJheSB9IGZyb20gJ0BzcmMvdXRpbHMvY2FzdC1hcnJheSc7XG5pbXBvcnQgUHJ1bkxpbmsgZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5MaW5rLnZ1ZSc7XG5pbXBvcnQgeyBvYmplY3RJZCB9IGZyb20gJ0BzcmMvdXRpbHMvb2JqZWN0LWlkJztcblxuY29uc3Qgc29ydGVkID0geGl0LnJlZ2lzdHJ5LnNvcnQoKGEsIGIpID0+IHtcbiAgY29uc3QgY29tbWFuZEEgPSBjYXN0QXJyYXkoYS5jb21tYW5kKVswXTtcbiAgY29uc3QgY29tbWFuZEIgPSBjYXN0QXJyYXkoYi5jb21tYW5kKVswXTtcbiAgcmV0dXJuIGNvbW1hbmRBLmxvY2FsZUNvbXBhcmUoY29tbWFuZEIpO1xufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8dGFibGU+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+e3sgdCgnY21kcy5jb21tYW5kJykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgnY21kcy5kZXNjcmlwdGlvbicpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2NtZHMubWFuZGF0b3J5JykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgnY21kcy5vcHRpb25hbCcpIH19PC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICA8dHIgdi1mb3I9XCJjb21tYW5kIGluIHNvcnRlZFwiIDprZXk9XCJvYmplY3RJZChjb21tYW5kKVwiPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPFBydW5MaW5rXG4gICAgICAgICAgICA6Y29tbWFuZD1cIidYSVQgJyArIGNhc3RBcnJheShjb21tYW5kLmNvbW1hbmQpWzBdXCJcbiAgICAgICAgICAgIDphdXRvLXN1Ym1pdD1cIiFjb21tYW5kLm1hbmRhdG9yeVBhcmFtZXRlcnNcIj5cbiAgICAgICAgICAgIHt7IGNhc3RBcnJheShjb21tYW5kLmNvbW1hbmQpWzBdIH19XG4gICAgICAgICAgPC9QcnVuTGluaz5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPnt7IHQoJ2NvbW1hbmRzLicgKyBjYXN0QXJyYXkoY29tbWFuZC5jb21tYW5kKVswXSkgfX08L3RkPlxuICAgICAgICA8dGQ+e3sgY29tbWFuZC5tYW5kYXRvcnlQYXJhbWV0ZXJzIH19PC90ZD5cbiAgICAgICAgPHRkPnt7IGNvbW1hbmQub3B0aW9uYWxQYXJhbWV0ZXJzIH19PC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBzY29wZWQ+PC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyIsInQiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX3VucmVmIiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFLQSxVQUFBLFNBQUEsSUFBQSxTQUFBLEtBQUEsQ0FBQSxHQUFBLE1BQUE7QUFDRSxZQUFBLFdBQUEsVUFBQSxFQUFBLE9BQUEsRUFBQSxDQUFBO0FBQ0EsWUFBQSxXQUFBLFVBQUEsRUFBQSxPQUFBLEVBQUEsQ0FBQTtBQUNBLGFBQUEsU0FBQSxjQUFBLFFBQUE7QUFBQSxJQUFzQyxDQUFBOzs7UUE0QjlCQSxnQkFBQSxTQUFBLE1BQUE7QUFBQSxVQWZFQSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxZQUREQSxnQkFBQSxNQUFBLE1BQUFDLGlCQUpJQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxjQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxZQUFDRixnQkFBQSxNQUFBLE1BQUFDLGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxrQkFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsWUFBQ0YsZ0JBQUEsTUFBQSxNQUFBQyxpQkFDREMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsZ0JBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFlBQUNGLGdCQUFBLE1BQUEsTUFBQUMsaUJBQ0RDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGVBQUFBLENBQUFBLEdBQUFBLENBQUFBO0FBQUFBLFVBQUMsQ0FBQTtBQUFBOztXQWdCSkMsVUFBQSxJQUFBLEdBQUFDLG1CQUFBQyxVQUFBLE1BQUFDLFdBQUFDLE1BQUEsTUFBQSxHQUFBLENBQUEsWUFBQTs7Y0FERCxLQUFBQSxNQUFBLFFBQUEsRUFBQSxPQUFBO0FBQUEsWUFYK0MsR0FBQTtBQUFBO2dCQU83Q0MsWUFBQSxVQUFBO0FBQUEsa0JBRFEsU0FBQSxTQUFBRCxNQUFBLFNBQUEsRUFBQSxRQUFBLE9BQUEsRUFBQSxDQUFBO0FBQUEsa0JBSG1DLGVBQUEsQ0FBQSxRQUFBO0FBQUEsZ0JBQ3JCLEdBQUE7QUFBQTtvQkFDWUUsZ0JBQUFSLGdCQUFBTSxNQUFBLFNBQUEsRUFBQSxRQUFBLE9BQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsa0JBQVAsQ0FBQTtBQUFBOzs7MkRBR3pCTCxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtjQUF5Q0YsZ0JBQUEsTUFBQSxNQUFBQyxnQkFBQSxRQUFBLG1CQUFBLEdBQUEsQ0FBQTtBQUFBLGNBQ2RELGdCQUFBLE1BQUEsTUFBQUMsZ0JBQUEsUUFBQSxrQkFBQSxHQUFBLENBQUE7QUFBQSxZQUNELENBQUE7QUFBQTs7Ozs7OyJ9
