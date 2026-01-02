import { t } from './index13.js';
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
