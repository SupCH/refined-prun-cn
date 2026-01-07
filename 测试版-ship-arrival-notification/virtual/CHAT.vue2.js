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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0hBVC52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NIQVQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyLnZ1ZSc7XG5pbXBvcnQgeyBkZG1tLCBoaG1tIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgdXNlWGl0UGFyYW1ldGVycyB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1wYXJhbWV0ZXJzJztcbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuXG5pbnRlcmZhY2UgRmlvQ2hhdE1lc3NhZ2Uge1xuICBNZXNzYWdlVGltZXN0YW1wOiBudW1iZXI7XG4gIE1lc3NhZ2VUeXBlOiAnQ0hBVCcgfCAnSk9JTkVEJyB8ICdMRUZUJztcbiAgVXNlck5hbWU6IHN0cmluZztcbiAgTWVzc2FnZVRleHQ6IHN0cmluZztcbn1cblxuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IHBhcmFtZXRlciA9IHBhcmFtZXRlcnNbMF07XG5cbmNvbnN0IGlzTG9hZGVkID0gcmVmKGZhbHNlKTtcbmNvbnN0IG1lc3NhZ2VzID0gcmVmKFtdIGFzIEZpb0NoYXRNZXNzYWdlW10pO1xud2F0Y2hFZmZlY3QoKCkgPT4ge1xuICBpZiAoIXBhcmFtZXRlcikge1xuICAgIHJldHVybjtcbiAgfVxuICBmZXRjaChgaHR0cHM6Ly9yZXN0LmZuYXIubmV0L2NoYXQvZGlzcGxheS8ke3BhcmFtZXRlcn1gKVxuICAgIC50aGVuKHJlc3BvbnNlID0+IHJlc3BvbnNlLmpzb24oKSlcbiAgICAudGhlbihkYXRhID0+IHtcbiAgICAgIGlzTG9hZGVkLnZhbHVlID0gdHJ1ZTtcbiAgICAgIG1lc3NhZ2VzLnZhbHVlID0gZGF0YTtcbiAgICB9KTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiB2LWlmPVwiIXBhcmFtZXRlclwiPkVycm9yISBOb3QgRW5vdWdoIFBhcmFtZXRlcnMhPC9kaXY+XG4gIDxMb2FkaW5nU3Bpbm5lciB2LWVsc2UtaWY9XCIhaXNMb2FkZWRcIiAvPlxuICA8ZGl2IHYtZWxzZSA6c3R5bGU9XCJ7IGhlaWdodDogJzEwMCUnLCBmbGV4R3JvdzogMSwgcGFkZGluZ1RvcDogJzRweCcgfVwiPlxuICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLnRpdGxlXCI+e3sgcGFyYW1ldGVyIH19IEdsb2JhbCBTaXRlIE93bmVyczwvZGl2PlxuICAgIDxkaXZcbiAgICAgIHYtZm9yPVwibWVzc2FnZSBpbiBtZXNzYWdlc1wiXG4gICAgICA6a2V5PVwib2JqZWN0SWQobWVzc2FnZSlcIlxuICAgICAgOmNsYXNzPVwiW0MuTWVzc2FnZS5tZXNzYWdlLCBDLnR5cGUudHlwZVJlZ3VsYXIsIEMuZm9udHMuZm9udFJlZ3VsYXJdXCI+XG4gICAgICA8ZGl2IDpjbGFzcz1cIkMuTWVzc2FnZS50aW1lc3RhbXBcIj5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCJDLk1lc3NhZ2UuZGF0ZVwiPnt7IGRkbW0obWVzc2FnZS5NZXNzYWdlVGltZXN0YW1wKSB9fTwvZGl2PlxuICAgICAgICA8ZGl2IDpjbGFzcz1cIkMuTWVzc2FnZS50aW1lXCIgOnN0eWxlPVwieyBjb2xvcjogJyM5OTk5OTknIH1cIj5cbiAgICAgICAgICB7eyBoaG1tKG1lc3NhZ2UuTWVzc2FnZVRpbWVzdGFtcCkgfX1cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwibWVzc2FnZS5NZXNzYWdlVHlwZSA9PT0gJ0NIQVQnXCI+XG4gICAgICAgIDxkaXYgOmNsYXNzPVwiQy5NZXNzYWdlLm5hbWVcIj5cbiAgICAgICAgICA8ZGl2IDpjbGFzcz1cIltDLlNlbmRlci5jb250YWluZXIsIEMudHlwZS50eXBlUmVndWxhciwgQy5mb250cy5mb250UmVndWxhcl1cIj5cbiAgICAgICAgICAgIDxkaXYgOmNsYXNzPVwiW0MuU2VuZGVyLm5hbWUsICRzdHlsZS5uYW1lXVwiPlxuICAgICAgICAgICAgICB7eyBtZXNzYWdlLlVzZXJOYW1lIH19XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICAgIDxkaXYgOmNsYXNzPVwiQy5NZXNzYWdlLmNvbnRyb2xzQW5kVGV4dFwiPlxuICAgICAgICAgIDxkaXYgOmNsYXNzPVwiQy5NZXNzYWdlLnRleHRcIj5cbiAgICAgICAgICAgIHt7IG1lc3NhZ2UuTWVzc2FnZVRleHQgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L3RlbXBsYXRlPlxuICAgICAgPHRlbXBsYXRlIHYtaWY9XCJtZXNzYWdlLk1lc3NhZ2VUeXBlID09PSAnSk9JTkVEJ1wiPlxuICAgICAgICA8ZGl2IDpjbGFzcz1cIkMuTWVzc2FnZS5uYW1lXCIgLz5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCJDLk1lc3NhZ2UuY29udHJvbHNBbmRUZXh0XCI+XG4gICAgICAgICAgPGRpdiA6Y2xhc3M9XCJbQy5NZXNzYWdlLnRleHQsIEMuTWVzc2FnZS5zeXN0ZW1dXCI+e3sgbWVzc2FnZS5Vc2VyTmFtZSB9fSBqb2luZWQuPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWlmPVwibWVzc2FnZS5NZXNzYWdlVHlwZSA9PT0gJ0xFRlQnXCI+XG4gICAgICAgIDxkaXYgOmNsYXNzPVwiQy5NZXNzYWdlLm5hbWVcIiAvPlxuICAgICAgICA8ZGl2IDpjbGFzcz1cIkMuTWVzc2FnZS5jb250cm9sc0FuZFRleHRcIj5cbiAgICAgICAgICA8ZGl2IDpjbGFzcz1cIltDLk1lc3NhZ2UudGV4dCwgQy5NZXNzYWdlLnN5c3RlbV1cIj57eyBtZXNzYWdlLlVzZXJOYW1lIH19IGxlZnQuPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICA8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE2cHg7XG4gIHBhZGRpbmctbGVmdDogNXB4O1xufVxuXG4ubmFtZSB7XG4gIGN1cnNvcjogdGV4dDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiQyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLFVBQUEsYUFBQSxpQkFBQTtBQUNBLFVBQUEsWUFBQSxXQUFBLENBQUE7QUFFQSxVQUFBLFdBQUEsSUFBQSxLQUFBO0FBQ0EsVUFBQSxXQUFBLElBQUEsRUFBQTtBQUNBLGdCQUFBLE1BQUE7QUFDRSxVQUFBLENBQUEsV0FBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLFlBQUEsc0NBQUEsU0FBQSxFQUFBLEVBQUEsS0FBQSxDQUFBLGFBQUEsU0FBQSxLQUFBLENBQUEsRUFBQSxLQUFBLENBQUEsU0FBQTtBQUdJLGlCQUFBLFFBQUE7QUFDQSxpQkFBQSxRQUFBO0FBQUEsTUFBaUIsQ0FBQTtBQUFBLElBQ2xCLENBQUE7OztRQThDR0EsZ0JBQUEsT0FBQTtBQUFBLFVBdEMrRCxPQUFBQyxlQUFBLEtBQUEsT0FBQSxLQUFBO0FBQUEsUUFBMUMsR0FBQUMsZ0JBQUFDLE1BQUEsU0FBQSxDQUFBLElBQUEsdUJBQUEsQ0FBQTtBQUFBLFNBQW9DQyxVQUFBLElBQUEsR0FBQUMsbUJBQUFDLFVBQUEsTUFBQUMsV0FBQUosTUFBQSxRQUFBLEdBQUEsQ0FBQSxZQUFBOztZQXFDdkQsS0FBQUEsTUFBQSxRQUFBLEVBQUEsT0FBQTtBQUFBLFlBbENrQixPQUFBRixlQUFBLEVBQ2JPLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHFCQUFtQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsS0FBQUEsY0FBb0JBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO1VBQW1CLEdBQUE7QUFBQTtjQU03RCxPQUFBUCxnQkFMT08sT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsUUFBQUEsU0FBQUE7QUFBQUEsWUFBbUIsR0FBQTtBQUFBO2dCQUN5QyxPQUFBUCxnQkFBMURPLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLElBQUFBO0FBQUFBLGNBQWMsR0FBQU4sZ0JBQUFDLE1BQUEsSUFBQSxFQUFBLFFBQUEsZ0JBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxjQUFrQ0gsZ0JBQUEsT0FBQTtBQUFBLGdCQUd2RCxPQUFBQyxnQkFGT08sT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsUUFBQUEsSUFBQUE7QUFBQUEsZ0JBQWMsT0FBQSxFQUFBLE9BQUEsVUFBQTtBQUFBLGNBQVUsR0FBQU4sZ0JBQUFDLE1BQUEsSUFBQSxFQUFBLFFBQUEsZ0JBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxZQUNILEdBQUEsQ0FBQTtBQUFBO2NBZ0J6QkgsZ0JBQUEsT0FBQTtBQUFBLGdCQU5ILE9BQUFDLGdCQU5PTyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxRQUFBQSxJQUFBQTtBQUFBQSxjQUFjLEdBQUE7QUFBQTtrQkFLbkIsT0FBQVAsZUFBQSxFQUpRTyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxzQkFBb0JBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEtBQUFBLGNBQW9CQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtnQkFBbUIsR0FBQTtBQUFBO29CQUdqRSxPQUFBUCxlQUFBLEVBRlFPLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO2tCQUEwQixHQUFBTixnQkFBQSxRQUFBLFFBQUEsR0FBQSxDQUFBO0FBQUEsZ0JBQ25CLEdBQUEsQ0FBQTtBQUFBOztnQkFRbkIsT0FBQUQsZ0JBSk9PLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLGVBQUFBO0FBQUFBLGNBQXlCLEdBQUE7QUFBQTtrQkFHOUIsT0FBQVAsZ0JBRk9PLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLElBQUFBO0FBQUFBLGdCQUFjLEdBQUFOLGdCQUFBLFFBQUEsV0FBQSxHQUFBLENBQUE7QUFBQSxjQUNILEdBQUEsQ0FBQTtBQUFBOztjQVNqQkYsZ0JBQUEsT0FBQTtBQUFBLGdCQUpzQixPQUFBQyxnQkFBbEJPLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLElBQUFBO0FBQUFBLGNBQWMsR0FBQSxNQUFBLENBQUE7QUFBQTtnQkFHckIsT0FBQVAsZ0JBRk9PLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLGVBQUFBO0FBQUFBLGNBQXlCLEdBQUE7QUFBQTtrQkFDaUQsT0FBQVAsZUFBQSxFQUF2RU8sT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsa0JBQWdCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxRQUFBQSxNQUFBQSxDQUFBQTtBQUFBQSxnQkFBZ0IsR0FBQU4sZ0JBQUEsUUFBQSxRQUFBLElBQUEsWUFBQSxDQUFBO0FBQUEsY0FBaUMsR0FBQSxDQUFBO0FBQUE7O2NBUXhFRixnQkFBQSxPQUFBO0FBQUEsZ0JBSnNCLE9BQUFDLGdCQUFsQk8sT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsUUFBQUEsSUFBQUE7QUFBQUEsY0FBYyxHQUFBLE1BQUEsQ0FBQTtBQUFBO2dCQUdyQixPQUFBUCxnQkFGT08sT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsUUFBQUEsZUFBQUE7QUFBQUEsY0FBeUIsR0FBQTtBQUFBO2tCQUMrQyxPQUFBUCxlQUFBLEVBQXJFTyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxrQkFBZ0JBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFFBQUFBLE1BQUFBLENBQUFBO0FBQUFBLGdCQUFnQixHQUFBTixnQkFBQSxRQUFBLFFBQUEsSUFBQSxVQUFBLENBQUE7QUFBQSxjQUErQixHQUFBLENBQUE7QUFBQTs7Ozs7OzsifQ==
