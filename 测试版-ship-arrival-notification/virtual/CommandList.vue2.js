import { C } from './prun-css.js';
import _sfc_main$2 from './ActionBar.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { createId } from './create-id.js';
import PrunLink from './PrunLink.vue.js';
import _sfc_main$3 from './TextInput.vue.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  Fragment,
  renderList,
  withCtx,
  createTextVNode,
  withDirectives,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CommandList',
  props: {
    list: {},
  },
  setup(__props) {
    const edit = ref(false);
    function addCommand() {
      __props.list.commands.push({
        id: createId(),
        label: 'Help',
        command: 'XIT HELP',
      });
    }
    function deleteCommand(command) {
      __props.list.commands = __props.list.commands.filter(x => x !== command);
    }
    const dragging = ref(false);
    const draggableOptions = {
      animation: 150,
      handle: `.${grip.grip}`,
      onStart: () => (dragging.value = true),
      onEnd: () => (dragging.value = false),
    };
    return (_ctx, _cache) => {
      return !unref(edit)
        ? (openBlock(),
          createElementBlock(
            Fragment,
            { key: 0 },
            [
              createBaseVNode('table', null, [
                _cache[3] ||
                  (_cache[3] = createBaseVNode(
                    'thead',
                    null,
                    [createBaseVNode('tr', null, [createBaseVNode('th', null, 'Commands')])],
                    -1,
                  )),
                createBaseVNode('tbody', null, [
                  _ctx.list.commands.length === 0
                    ? (openBlock(),
                      createElementBlock('tr', _hoisted_1, [
                        ...(_cache[2] ||
                          (_cache[2] = [createBaseVNode('td', null, 'No commands.', -1)])),
                      ]))
                    : (openBlock(true),
                      createElementBlock(
                        Fragment,
                        { key: 1 },
                        renderList(_ctx.list.commands, command => {
                          return (
                            openBlock(),
                            createElementBlock(
                              'tr',
                              {
                                key: command.id,
                              },
                              [
                                createBaseVNode('td', null, [
                                  createVNode(
                                    PrunLink,
                                    {
                                      command: command.command,
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(command.label), 1),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['command'],
                                  ),
                                ]),
                              ],
                            )
                          );
                        }),
                        128,
                      )),
                ]),
              ]),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      primary: '',
                      onClick: _cache[0] || (_cache[0] = $event => (edit.value = true)),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[4] || (_cache[4] = [createTextVNode('EDIT', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ],
            64,
          ))
        : (openBlock(),
          createElementBlock(
            Fragment,
            { key: 1 },
            [
              createBaseVNode('table', null, [
                _cache[7] ||
                  (_cache[7] = createBaseVNode(
                    'thead',
                    null,
                    [
                      createBaseVNode('tr', null, [
                        createBaseVNode('th', null, 'Label'),
                        createBaseVNode('th', null, 'Command'),
                        createBaseVNode('th'),
                      ]),
                    ],
                    -1,
                  )),
                _ctx.list.commands.length === 0
                  ? (openBlock(),
                    createElementBlock('tbody', _hoisted_2, [
                      ...(_cache[5] ||
                        (_cache[5] = [
                          createBaseVNode(
                            'tr',
                            null,
                            [createBaseVNode('td', null, 'No commands.')],
                            -1,
                          ),
                        ])),
                    ]))
                  : withDirectives(
                      (openBlock(),
                      createElementBlock(
                        'tbody',
                        {
                          key: 1,
                          class: normalizeClass(unref(dragging) ? _ctx.$style.dragging : null),
                        },
                        [
                          (openBlock(true),
                          createElementBlock(
                            Fragment,
                            null,
                            renderList(_ctx.list.commands, command => {
                              return (
                                openBlock(),
                                createElementBlock(
                                  'tr',
                                  {
                                    key: command.id,
                                  },
                                  [
                                    createBaseVNode('td', null, [
                                      createBaseVNode(
                                        'span',
                                        {
                                          class: normalizeClass([
                                            unref(grip).grip,
                                            unref(fa).solid,
                                            _ctx.$style.grip,
                                          ]),
                                        },
                                        toDisplayString(''),
                                        2,
                                      ),
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass([
                                            ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                                            _ctx.$style.inline,
                                          ]),
                                        },
                                        [
                                          createVNode(
                                            _sfc_main$3,
                                            {
                                              modelValue: command.label,
                                              'onUpdate:modelValue': $event =>
                                                (command.label = $event),
                                            },
                                            null,
                                            8,
                                            ['modelValue', 'onUpdate:modelValue'],
                                          ),
                                        ],
                                        2,
                                      ),
                                    ]),
                                    createBaseVNode('td', null, [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass(
                                            ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                                          ),
                                        },
                                        [
                                          createVNode(
                                            _sfc_main$3,
                                            {
                                              modelValue: command.command,
                                              'onUpdate:modelValue': $event =>
                                                (command.command = $event),
                                            },
                                            null,
                                            8,
                                            ['modelValue', 'onUpdate:modelValue'],
                                          ),
                                        ],
                                        2,
                                      ),
                                    ]),
                                    createBaseVNode('td', null, [
                                      createVNode(
                                        _sfc_main$1,
                                        {
                                          danger: '',
                                          onClick: $event => deleteCommand(command),
                                        },
                                        {
                                          default: withCtx(() => [
                                            ...(_cache[6] ||
                                              (_cache[6] = [createTextVNode('DELETE', -1)])),
                                          ]),
                                          _: 2,
                                        },
                                        1032,
                                        ['onClick'],
                                      ),
                                    ]),
                                  ],
                                )
                              );
                            }),
                            128,
                          )),
                        ],
                        2,
                      )),
                      [[unref(so), [_ctx.list.commands, draggableOptions]]],
                    ),
              ]),
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      primary: '',
                      onClick: addCommand,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[8] || (_cache[8] = [createTextVNode('ADD COMMAND', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$1,
                    {
                      primary: '',
                      onClick: _cache[1] || (_cache[1] = $event => (edit.value = false)),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[9] || (_cache[9] = [createTextVNode('DONE', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ],
            64,
          ));
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZExpc3QudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9DTURML0NvbW1hbmRMaXN0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IEFjdGlvbkJhciBmcm9tICdAc3JjL2NvbXBvbmVudHMvQWN0aW9uQmFyLnZ1ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IHsgY3JlYXRlSWQgfSBmcm9tICdAc3JjL3N0b3JlL2NyZWF0ZS1pZCc7XG5pbXBvcnQgUHJ1bkxpbmsgZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5MaW5rLnZ1ZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCB7IHZEcmFnZ2FibGUgfSBmcm9tICd2dWUtZHJhZ2dhYmxlLXBsdXMnO1xuaW1wb3J0IGdyaXAgZnJvbSAnQHNyYy91dGlscy9ncmlwLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuXG5jb25zdCB7IGxpc3QgfSA9IGRlZmluZVByb3BzPHsgbGlzdDogVXNlckRhdGEuQ29tbWFuZExpc3QgfT4oKTtcblxuY29uc3QgZWRpdCA9IHJlZihmYWxzZSk7XG5cbmZ1bmN0aW9uIGFkZENvbW1hbmQoKSB7XG4gIGxpc3QuY29tbWFuZHMucHVzaCh7XG4gICAgaWQ6IGNyZWF0ZUlkKCksXG4gICAgbGFiZWw6ICdIZWxwJyxcbiAgICBjb21tYW5kOiAnWElUIEhFTFAnLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlQ29tbWFuZChjb21tYW5kOiBVc2VyRGF0YS5Db21tYW5kKSB7XG4gIGxpc3QuY29tbWFuZHMgPSBsaXN0LmNvbW1hbmRzLmZpbHRlcih4ID0+IHggIT09IGNvbW1hbmQpO1xufVxuXG5jb25zdCBkcmFnZ2luZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGRyYWdnYWJsZU9wdGlvbnMgPSB7XG4gIGFuaW1hdGlvbjogMTUwLFxuICBoYW5kbGU6IGAuJHtncmlwLmdyaXB9YCxcbiAgb25TdGFydDogKCkgPT4gKGRyYWdnaW5nLnZhbHVlID0gdHJ1ZSksXG4gIG9uRW5kOiAoKSA9PiAoZHJhZ2dpbmcudmFsdWUgPSBmYWxzZSksXG59O1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtaWY9XCIhZWRpdFwiPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0aD5Db21tYW5kczwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICA8dHIgdi1pZj1cImxpc3QuY29tbWFuZHMubGVuZ3RoID09PSAwXCI+XG4gICAgICAgICAgPHRkPk5vIGNvbW1hbmRzLjwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgICAgICAgPHRyIHYtZm9yPVwiY29tbWFuZCBpbiBsaXN0LmNvbW1hbmRzXCIgOmtleT1cImNvbW1hbmQuaWRcIj5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgPFBydW5MaW5rIDpjb21tYW5kPVwiY29tbWFuZC5jb21tYW5kXCI+e3sgY29tbWFuZC5sYWJlbCB9fTwvUHJ1bkxpbms+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGVtcGxhdGU+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gICAgPEFjdGlvbkJhcj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwiZWRpdCA9IHRydWVcIj5FRElUPC9QcnVuQnV0dG9uPlxuICAgIDwvQWN0aW9uQmFyPlxuICA8L3RlbXBsYXRlPlxuICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgIDx0YWJsZT5cbiAgICAgIDx0aGVhZD5cbiAgICAgICAgPHRyPlxuICAgICAgICAgIDx0aD5MYWJlbDwvdGg+XG4gICAgICAgICAgPHRoPkNvbW1hbmQ8L3RoPlxuICAgICAgICAgIDx0aCAvPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwibGlzdC5jb21tYW5kcy5sZW5ndGggPT09IDBcIj5cbiAgICAgICAgPHRib2R5PlxuICAgICAgICAgIDx0cj5cbiAgICAgICAgICAgIDx0ZD5ObyBjb21tYW5kcy48L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgICAgPHRib2R5XG4gICAgICAgICAgdi1kcmFnZ2FibGU9XCJbbGlzdC5jb21tYW5kcywgZHJhZ2dhYmxlT3B0aW9uc11cIlxuICAgICAgICAgIDpjbGFzcz1cImRyYWdnaW5nID8gJHN0eWxlLmRyYWdnaW5nIDogbnVsbFwiPlxuICAgICAgICAgIDx0ciB2LWZvcj1cImNvbW1hbmQgaW4gbGlzdC5jb21tYW5kc1wiIDprZXk9XCJjb21tYW5kLmlkXCI+XG4gICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgIDxzcGFuIDpjbGFzcz1cIltncmlwLmdyaXAsIGZhLnNvbGlkLCAkc3R5bGUuZ3JpcF1cIj5cbiAgICAgICAgICAgICAgICB7eyAnXFx1ZjU4ZScgfX1cbiAgICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIltDLmZvcm1zLmlucHV0LCAkc3R5bGUuaW5saW5lXVwiPlxuICAgICAgICAgICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cImNvbW1hbmQubGFiZWxcIiAvPlxuICAgICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgICA8dGQ+XG4gICAgICAgICAgICAgIDxkaXYgOmNsYXNzPVwiQy5mb3Jtcy5pbnB1dFwiPlxuICAgICAgICAgICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cImNvbW1hbmQuY29tbWFuZFwiIC8+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgPFBydW5CdXR0b24gZGFuZ2VyIEBjbGljaz1cImRlbGV0ZUNvbW1hbmQoY29tbWFuZClcIj5ERUxFVEU8L1BydW5CdXR0b24+XG4gICAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDwvdHI+XG4gICAgICAgIDwvdGJvZHk+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgIDwvdGFibGU+XG4gICAgPEFjdGlvbkJhcj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwiYWRkQ29tbWFuZFwiPkFERCBDT01NQU5EPC9QcnVuQnV0dG9uPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJlZGl0ID0gZmFsc2VcIj5ET05FPC9QcnVuQnV0dG9uPlxuICAgIDwvQWN0aW9uQmFyPlxuICA8L3RlbXBsYXRlPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5pbmxpbmUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5ncmlwIHtcbiAgY3Vyc29yOiBtb3ZlO1xuICB0cmFuc2l0aW9uOiBvcGFjaXR5IDAuMnMgZWFzZS1pbi1vdXQ7XG4gIG9wYWNpdHk6IDA7XG4gIG1hcmdpbi1yaWdodDogNXB4O1xufVxuXG50cjpob3ZlciAuZ3JpcCB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5kcmFnZ2luZyB0ZCAuZ3JpcCB7XG4gIG9wYWNpdHk6IDA7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZVZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfd2l0aEN0eCIsIlBydW5CdXR0b24iLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiLCJDIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQVlBLFVBQUEsT0FBQSxJQUFBLEtBQUE7QUFFQSxhQUFBLGFBQUE7QUFDRSxjQUFBLEtBQUEsU0FBQSxLQUFBO0FBQUEsUUFBbUIsSUFBQSxTQUFBO0FBQUEsUUFDSixPQUFBO0FBQUEsUUFDTixTQUFBO0FBQUEsTUFDRSxDQUFBO0FBQUEsSUFDVjtBQUdILGFBQUEsY0FBQSxTQUFBO0FBQ0UsY0FBQSxLQUFBLFdBQUEsUUFBQSxLQUFBLFNBQUEsT0FBQSxDQUFBLE1BQUEsTUFBQSxPQUFBO0FBQUEsSUFBdUQ7QUFHekQsVUFBQSxXQUFBLElBQUEsS0FBQTtBQUVBLFVBQUEsbUJBQUE7QUFBQSxNQUF5QixXQUFBO0FBQUEsTUFDWixRQUFBLElBQUEsS0FBQSxJQUFBO0FBQUEsTUFDVSxTQUFBLE1BQUEsU0FBQSxRQUFBO0FBQUEsTUFDWSxPQUFBLE1BQUEsU0FBQSxRQUFBO0FBQUEsSUFDRjs7O1FBNEJwQkEsZ0JBQUEsU0FBQSxNQUFBO0FBQUEsVUFKRCxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUEsZ0JBQUEsU0FBQSxNQUFBO0FBQUEsWUFiRUEsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsY0FEREEsZ0JBQUEsTUFBQSxNQUFBLFVBQUE7QUFBQSxZQURTLENBQUE7QUFBQTs7WUFjUixLQUFBLEtBQUEsU0FBQSxXQUFBLEtBQUFDLFVBQUEsR0FBQUMsbUJBQUEsTUFBQSxZQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLGNBUkRGLGdCQUFBLE1BQUEsTUFBQSxnQkFBQSxFQUFBO0FBQUEsWUFEYSxFQUFBLENBQUEsTUFBQUMsVUFBQSxJQUFBLEdBQUFDLG1CQUFBQyxVQUFBLEVBQUEsS0FBQSxFQUFBLEdBQUFDLFdBQUEsS0FB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
