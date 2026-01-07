import { t } from './index5.js';
import PrunLink from './PrunLink.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { userData } from './user-data.js';
import { saveUserData } from './user-data-serializer.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createTextVNode,
  createVNode,
  Fragment,
  withCtx,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'START',
  setup(__props) {
    const needsToChoose = ref(userData.settings.mode === void 0);
    function onBasicClick() {
      needsToChoose.value = false;
      userData.settings.mode = 'BASIC';
    }
    async function onFullClick() {
      needsToChoose.value = false;
      userData.settings.mode = 'FULL';
      await saveUserData();
      window.location.reload();
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.container),
          },
          [
            createBaseVNode(
              'h1',
              {
                class: normalizeClass(_ctx.$style.title),
              },
              toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('start.welcome')),
              3,
            ),
            createBaseVNode('p', null, [
              createTextVNode(
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('start.listCommands')) + ' ',
                1,
              ),
              createVNode(PrunLink, {
                inline: '',
                command: 'XIT CMDS',
              }),
            ]),
            createBaseVNode('p', null, [
              createTextVNode(
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('start.changeSettings')) + ' ',
                1,
              ),
              createVNode(PrunLink, {
                inline: '',
                command: 'XIT SET',
              }),
            ]),
            createBaseVNode('p', null, [
              createTextVNode(
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('start.additionalHelp')) + ' ',
                1,
              ),
              createVNode(PrunLink, {
                inline: '',
                command: 'XIT HELP',
              }),
            ]),
            unref(needsToChoose)
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    createBaseVNode('p', null, [
                      createTextVNode(
                        toDisplayString(
                          ('t' in _ctx ? _ctx.t : unref(t))(
                            'start.selectFeatureSet',
                            'XIT SET FEAT',
                          ),
                        ) + ' ',
                        1,
                      ),
                      createVNode(PrunLink, {
                        inline: '',
                        command: 'XIT SET FEAT',
                      }),
                      _cache[0] || (_cache[0] = createTextVNode(' ) ', -1)),
                    ]),
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(_ctx.$style.features),
                      },
                      [
                        createVNode(
                          _sfc_main$1,
                          {
                            primary: '',
                            class: normalizeClass(_ctx.$style.feature),
                            onClick: onBasicClick,
                          },
                          {
                            default: withCtx(() => [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(_ctx.$style.featureTitle),
                                },
                                [
                                  createBaseVNode(
                                    'div',
                                    {
                                      class: normalizeClass(_ctx.$style.title),
                                    },
                                    toDisplayString(
                                      ('t' in _ctx ? _ctx.t : unref(t))('start.basicTitle'),
                                    ),
                                    3,
                                  ),
                                ],
                                2,
                              ),
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(_ctx.$style.featureDescription),
                                },
                                toDisplayString(
                                  ('t' in _ctx ? _ctx.t : unref(t))('start.basicDesc'),
                                ),
                                3,
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                        createVNode(
                          _sfc_main$1,
                          {
                            primary: '',
                            class: normalizeClass(_ctx.$style.feature),
                            onClick: onFullClick,
                          },
                          {
                            default: withCtx(() => [
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(_ctx.$style.featureTitle),
                                },
                                [
                                  createBaseVNode(
                                    'div',
                                    {
                                      class: normalizeClass(_ctx.$style.title),
                                    },
                                    toDisplayString(
                                      ('t' in _ctx ? _ctx.t : unref(t))('start.fullTitle'),
                                    ),
                                    3,
                                  ),
                                  createBaseVNode(
                                    'div',
                                    null,
                                    toDisplayString(
                                      ('t' in _ctx ? _ctx.t : unref(t))('start.fullRestart'),
                                    ),
                                    1,
                                  ),
                                ],
                                2,
                              ),
                              createBaseVNode(
                                'div',
                                {
                                  class: normalizeClass(_ctx.$style.featureDescription),
                                },
                                toDisplayString(
                                  ('t' in _ctx ? _ctx.t : unref(t))('start.fullDesc'),
                                ),
                                3,
                              ),
                            ]),
                            _: 1,
                          },
                          8,
                          ['class'],
                        ),
                      ],
                      2,
                    ),
                  ],
                  64,
                ))
              : (openBlock(),
                createElementBlock('p', _hoisted_1, [
                  createTextVNode(
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('start.changeAnytime')) + ' ',
                    1,
                  ),
                  createVNode(PrunLink, {
                    inline: '',
                    command: 'XIT SET FEAT',
                  }),
                ])),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU1RBUlQudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9TVEFSVC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IHNhdmVVc2VyRGF0YSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvc3RvcmFnZS91c2VyLWRhdGEtc2VyaWFsaXplcic7XG5cbmNvbnN0IG5lZWRzVG9DaG9vc2UgPSByZWYodXNlckRhdGEuc2V0dGluZ3MubW9kZSA9PT0gdW5kZWZpbmVkKTtcblxuZnVuY3Rpb24gb25CYXNpY0NsaWNrKCkge1xuICBuZWVkc1RvQ2hvb3NlLnZhbHVlID0gZmFsc2U7XG4gIHVzZXJEYXRhLnNldHRpbmdzLm1vZGUgPSAnQkFTSUMnO1xufVxuXG5hc3luYyBmdW5jdGlvbiBvbkZ1bGxDbGljaygpIHtcbiAgbmVlZHNUb0Nob29zZS52YWx1ZSA9IGZhbHNlO1xuICB1c2VyRGF0YS5zZXR0aW5ncy5tb2RlID0gJ0ZVTEwnO1xuICBhd2FpdCBzYXZlVXNlckRhdGEoKTtcbiAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuY29udGFpbmVyXCI+XG4gICAgPGgxIDpjbGFzcz1cIiRzdHlsZS50aXRsZVwiPnt7IHQoJ3N0YXJ0LndlbGNvbWUnKSB9fTwvaDE+XG4gICAgPHA+XG4gICAgICB7eyB0KCdzdGFydC5saXN0Q29tbWFuZHMnKSB9fVxuICAgICAgPFBydW5MaW5rIGlubGluZSBjb21tYW5kPVwiWElUIENNRFNcIiAvPlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgIHt7IHQoJ3N0YXJ0LmNoYW5nZVNldHRpbmdzJykgfX1cbiAgICAgIDxQcnVuTGluayBpbmxpbmUgY29tbWFuZD1cIlhJVCBTRVRcIiAvPlxuICAgIDwvcD5cbiAgICA8cD5cbiAgICAgIHt7IHQoJ3N0YXJ0LmFkZGl0aW9uYWxIZWxwJykgfX1cbiAgICAgIDxQcnVuTGluayBpbmxpbmUgY29tbWFuZD1cIlhJVCBIRUxQXCIgLz5cbiAgICA8L3A+XG4gICAgPHRlbXBsYXRlIHYtaWY9XCJuZWVkc1RvQ2hvb3NlXCI+XG4gICAgICA8cD5cbiAgICAgICAge3sgdCgnc3RhcnQuc2VsZWN0RmVhdHVyZVNldCcsICdYSVQgU0VUIEZFQVQnKSB9fVxuICAgICAgICA8UHJ1bkxpbmsgaW5saW5lIGNvbW1hbmQ9XCJYSVQgU0VUIEZFQVRcIiAvPlxuICAgICAgICApXG4gICAgICA8L3A+XG4gICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5mZWF0dXJlc1wiPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IDpjbGFzcz1cIiRzdHlsZS5mZWF0dXJlXCIgQGNsaWNrPVwib25CYXNpY0NsaWNrXCI+XG4gICAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuZmVhdHVyZVRpdGxlXCI+XG4gICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS50aXRsZVwiPnt7IHQoJ3N0YXJ0LmJhc2ljVGl0bGUnKSB9fTwvZGl2PlxuICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLmZlYXR1cmVEZXNjcmlwdGlvblwiPnt7IHQoJ3N0YXJ0LmJhc2ljRGVzYycpIH19PC9kaXY+XG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSA6Y2xhc3M9XCIkc3R5bGUuZmVhdHVyZVwiIEBjbGljaz1cIm9uRnVsbENsaWNrXCI+XG4gICAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuZmVhdHVyZVRpdGxlXCI+XG4gICAgICAgICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS50aXRsZVwiPnt7IHQoJ3N0YXJ0LmZ1bGxUaXRsZScpIH19PC9kaXY+XG4gICAgICAgICAgICA8ZGl2Pnt7IHQoJ3N0YXJ0LmZ1bGxSZXN0YXJ0JykgfX08L2Rpdj5cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5mZWF0dXJlRGVzY3JpcHRpb25cIj5cbiAgICAgICAgICAgIHt7IHQoJ3N0YXJ0LmZ1bGxEZXNjJykgfX1cbiAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8cCB2LWVsc2U+XG4gICAgICB7eyB0KCdzdGFydC5jaGFuZ2VBbnl0aW1lJykgfX1cbiAgICAgIDxQcnVuTGluayBpbmxpbmUgY29tbWFuZD1cIlhJVCBTRVQgRkVBVFwiIC8+XG4gICAgPC9wPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY29udGFpbmVyIHtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBwYWRkaW5nLWxlZnQ6IDRweDtcbn1cblxuLnRpdGxlIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGRpc3BsYXk6IGJsb2NrO1xuICBmb250LXNpemU6IDE2cHg7XG59XG5cbi5mZWF0dXJlcyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGp1c3RpZnktY29udGVudDogc3BhY2UtYXJvdW5kO1xufVxuXG4uZmVhdHVyZSB7XG4gIHdpZHRoOiA0OSU7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiBjb2x1bW47XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBwYWRkaW5nOiA0cHg7XG4gIHRleHQtdHJhbnNmb3JtOiBub25lO1xufVxuXG4uZmVhdHVyZVRpdGxlIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZmxleC1kaXJlY3Rpb246IGNvbHVtbjtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uZmVhdHVyZURlc2NyaXB0aW9uIHtcbiAgcGFkZGluZy10b3A6IDRweDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX3RvRGlzcGxheVN0cmluZyIsInQiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7O0FBTUEsVUFBQSxnQkFBQSxJQUFBLFNBQUEsU0FBQSxTQUFBLE1BQUE7QUFFQSxhQUFBLGVBQUE7QUFDRSxvQkFBQSxRQUFBO0FBQ0EsZUFBQSxTQUFBLE9BQUE7QUFBQSxJQUF5QjtBQUczQixtQkFBQSxjQUFBO0FBQ0Usb0JBQUEsUUFBQTtBQUNBLGVBQUEsU0FBQSxPQUFBO0FBQ0EsWUFBQSxhQUFBO0FBQ0EsYUFBQSxTQUFBLE9BQUE7QUFBQSxJQUF1Qjs7O1FBK0NqQixPQUFBQSxlQUFBLEtBQUEsT0FBQSxTQUFBO0FBQUEsTUExQ3VCLEdBQUE7QUFBQTtVQUM0QixPQUFBQSxlQUFBLEtBQUEsT0FBQSxLQUFBO0FBQUEsUUFBL0IsR0FBQUMsaUJBQUtDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO1FBQUNDLGdCQUFBLEtBQUEsTUFBQTtBQUFBLFVBSTFCQyxnQkFBQUgsaUJBRkNDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLG9CQUFBQSxDQUFBQSxJQUFBQSxLQUFBQSxDQUFBQTtBQUFBQSxVQUNIRyxZQUFBLFVBQUE7QUFBQSxZQUFzQyxRQUFBO0FBQUEsWUFBNUIsU0FBQTtBQUFBLFVBQWUsQ0FBQTtBQUFBOztVQUt2QkQsZ0JBQUFILGlCQUZDQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxzQkFBQUEsQ0FB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
