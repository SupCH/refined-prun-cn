import { C } from './prun-css.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import { ddmm, hhmm } from './format.js';
import { useXitParameters } from './use-xit-parameters.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  watchEffect,
  createElementBlock,
  createBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = {
  key: 2,
  style: { height: '100%', flexGrow: 1, paddingTop: '4px' },
};
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CHAT',
  setup(__props) {
    const parameters = useXitParameters();
    const parameter = parameters[0];
    const isLoaded = ref(false);
    const messages = ref([]);
    watchEffect(() => {
      if (!parameter) {
        return;
      }
      fetch(`https://rest.fnar.net/chat/display/${parameter}`)
        .then(response => response.json())
        .then(data => {
          isLoaded.value = true;
          messages.value = data;
        });
    });
    return (_ctx, _cache) => {
      return !unref(parameter)
        ? (openBlock(), createElementBlock('div', _hoisted_1, 'Error! Not Enough Parameters!'))
        : !unref(isLoaded)
          ? (openBlock(), createBlock(LoadingSpinner, { key: 1 }))
          : (openBlock(),
            createElementBlock('div', _hoisted_2, [
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_ctx.$style.title),
                },
                toDisplayString(unref(parameter)) + ' Global Site Owners',
                3,
              ),
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(unref(messages), message => {
                  return (
                    openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: unref(objectId)(message),
                        class: normalizeClass([
                          ('C' in _ctx ? _ctx.C : unref(C)).Message.message,
                          ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                          ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                        ]),
                      },
                      [
                        createBaseVNode(
                          'div',
                          {
                            class: normalizeClass(
                              ('C' in _ctx ? _ctx.C : unref(C)).Message.timestamp,
                            ),
                          },
                          [
                            createBaseVNode(
                              'div',
                              {
                                class: normalizeClass(
                                  ('C' in _ctx ? _ctx.C : unref(C)).Message.date,
                                ),
                              },
                              toDisplayString(unref(ddmm)(message.MessageTimestamp)),
                              3,
                            ),
                            createBaseVNode(
                              'div',
                              {
                                class: normalizeClass(
                                  ('C' in _ctx ? _ctx.C : unref(C)).Message.time,
                                ),
                                style: { color: '#999999' },
                              },
                              toDisplayString(unref(hhmm)(message.MessageTimestamp)),
                              3,
                            ),
                          ],
                          2,
                        ),
                        message.MessageType === 'CHAT'
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 0 },
                              [
                                createBaseVNode(
                                  'div',
                                  {
                                    class: normalizeClass(
                                      ('C' in _ctx ? _ctx.C : unref(C)).Message.name,
                                    ),
                                  },
                                  [
                                    createBaseVNode(
                                      'div',
                                      {
                                        class: normalizeClass([
                                          ('C' in _ctx ? _ctx.C : unref(C)).Sender.container,
                                          ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                                          ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                                        ]),
                                      },
                                      [
                                        createBaseVNode(
                                          'div',
                                          {
                                            class: normalizeClass([
                                              ('C' in _ctx ? _ctx.C : unref(C)).Sender.name,
                                              _ctx.$style.name,
                                            ]),
                                          },
                                          toDisplayString(message.UserName),
                                          3,
                                        ),
                                      ],
                                      2,
                                    ),
                                  ],
                                  2,
                                ),
                                createBaseVNode(
                                  'div',
                                  {
                                    class: normalizeClass(
                                      ('C' in _ctx ? _ctx.C : unref(C)).Message.controlsAndText,
                                    ),
                                  },
                                  [
                                    createBaseVNode(
                                      'div',
                                      {
                                        class: normalizeClass(
                                          ('C' in _ctx ? _ctx.C : unref(C)).Message.text,
                                        ),
                                      },
                                      toDisplayString(message.MessageText),
                                      3,
                                    ),
                                  ],
                                  2,
                                ),
                              ],
                              64,
                            ))
                          : createCommentVNode('', true),
                        message.MessageType === 'JOINED'
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 1 },
                              [
                                createBaseVNode(
                                  'div',
                                  {
                                    class: normalizeClass(
                                      ('C' in _ctx ? _ctx.C : unref(C)).Message.name,
                                    ),
                                  },
                                  null,
                                  2,
                                ),
                                createBaseVNode(
                                  'div',
                                  {
                                    class: normalizeClass(
                                      ('C' in _ctx ? _ctx.C : unref(C)).Message.controlsAndText,
                                    ),
                                  },
                                  [
                                    createBaseVNode(
                                      'div',
                                      {
                                        class: normalizeClass([
                                          ('C' in _ctx ? _ctx.C : unref(C)).Message.text,
                                          ('C' in _ctx ? _ctx.C : unref(C)).Message.system,
                                        ]),
                                      },
                                      toDisplayString(message.UserName) + ' joined.',
                                      3,
                                    ),
                                  ],
                                  2,
                                ),
                              ],
                              64,
                            ))
                          : createCommentVNode('', true),
                        message.MessageType === 'LEFT'
                          ? (openBlock(),
                            createElementBlock(
                              Fragment,
                              { key: 2 },
                              [
                                createBaseVNode(
                                  'div',
                                  {
                                    class: normalizeClass(
                                      ('C' in _ctx ? _ctx.C : unref(C)).Message.name,
                                    ),
                                  },
                                  null,
                                  2,
                                ),
                                createBaseVNode(
                                  'div',
                                  {
                                    class: normalizeClass(
                                      ('C' in _ctx ? _ctx.C : unref(C)).Message.controlsAndText,
                                    ),
                                  },
                                  [
                                    createBaseVNode(
                                      'div',
                                      {
                                        class: normalizeClass([
                                          ('C' in _ctx ? _ctx.C : unref(C)).Message.text,
                                          ('C' in _ctx ? _ctx.C : unref(C)).Message.system,
                                        ]),
                                      },
                                      toDisplayString(message.UserName) + ' left.',
                                      3,
                                    ),
                                  ],
                                  2,
                                ),
                              ],
                              64,
                            ))
                          : createCommentVNode('', true),
                      ],
                      2,
                    )
                  );
                }),
                128,
              )),
            ]));
    };
  },
});
export { _sfc_main as default };
