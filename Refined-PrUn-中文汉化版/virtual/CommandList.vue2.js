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
