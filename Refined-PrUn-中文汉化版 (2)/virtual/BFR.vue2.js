import { useCssModule } from './runtime-dom.esm-bundler.js';
import { $, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { t } from './index13.js';
import _sfc_main$3 from './ActionBar.vue.js';
import _sfc_main$2 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import { userData } from './user-data.js';
import removeArrayElement from './remove-array-element.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import _sfc_main$4 from './TextInput.vue.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import _sfc_main$1 from './Tooltip.vue.js';
import _sfc_main$5 from './NumberInput.vue.js';
import { objectId } from './object-id.js';
import InlineFlex from './InlineFlex.vue.js';
import {
  defineComponent,
  useTemplateRef,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  createBlock,
  withCtx,
  createTextVNode,
  Fragment,
  withDirectives,
  renderList,
  createCommentVNode,
  Teleport,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass, normalizeStyle } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { colspan: '5' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BFR',
  setup(__props) {
    const $style = useCssModule();
    const picking = ref(false);
    const overlay = useTemplateRef('overlay');
    const pickedBuffer = ref(null);
    const overlayCursor = computed(() => (pickedBuffer.value ? 'pointer' : 'default'));
    function onOverlayMouseMove(e) {
      if (!picking.value) {
        return;
      }
      const lastPickedBuffer = pickedBuffer.value;
      pickedBuffer.value = getBufferUnderCursor(e);
      lastPickedBuffer?.classList.remove($style.highlight);
      pickedBuffer.value?.classList.add($style.highlight);
    }
    async function onOverlayMouseClick(e) {
      const buffer = getBufferUnderCursor(e);
      pickedBuffer.value?.classList.remove($style.highlight);
      pickedBuffer.value = null;
      picking.value = false;
      if (!buffer) {
        return;
      }
      const cmd = await $(buffer, C.TileFrame.cmd);
      if (!cmd.textContent) {
        return;
      }
      const body = await $(buffer, C.Window.body);
      const width = parseInt(body.style.width.replace('px', ''), 10);
      const height = parseInt(body.style.height.replace('px', ''), 10);
      userData.settings.buffers.unshift([cmd.textContent, width, height]);
    }
    function getBufferUnderCursor(e) {
      const element = getElementUnderCursor(e);
      if (!element) {
        return void 0;
      }
      const window = element.closest(`.${C.Window.window}`);
      if (!window) {
        return void 0;
      }
      const cmd = _$(window, C.TileFrame.cmd);
      if (!cmd) {
        return void 0;
      }
      return window;
    }
    function getElementUnderCursor(e) {
      overlay.value.style.pointerEvents = 'none';
      const element = document.elementFromPoint(e.clientX, e.clientY);
      overlay.value.style.pointerEvents = 'all';
      return element;
    }
    function addNewRule() {
      userData.settings.buffers.unshift(['', 450, 300]);
    }
    function deleteRule(rule) {
      removeArrayElement(userData.settings.buffers, rule);
    }
    const dragging = ref(false);
    const draggableOptions = {
      animation: 150,
      handle: `.${grip.grip}`,
      onStart: () => (dragging.value = true),
      onEnd: () => (dragging.value = false),
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('bfr.title')) + ' ',
                  1,
                ),
                createVNode(
                  _sfc_main$1,
                  {
                    position: 'bottom',
                    class: normalizeClass(unref($style).tooltip),
                    tooltip: ('t' in _ctx ? _ctx.t : unref(t))('bfr.tooltip'),
                  },
                  null,
                  8,
                  ['class', 'tooltip'],
                ),
              ]),
              _: 1,
            }),
            createVNode(_sfc_main$3, null, {
              default: withCtx(() => [
                unref(picking)
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$2,
                      {
                        key: 0,
                        neutral: '',
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(
                              unref(pickedBuffer)
                                ? ('t' in _ctx ? _ctx.t : unref(t))('bfr.clickToPick')
                                : ('t' in _ctx ? _ctx.t : unref(t))('bfr.clickToCancel'),
                            ),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                    ))
                  : (openBlock(),
                    createElementBlock(
                      Fragment,
                      { key: 1 },
                      [
                        createVNode(
                          _sfc_main$2,
                          {
                            primary: '',
                            onClick: _cache[0] || (_cache[0] = $event => (picking.value = true)),
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(
                                  ('t' in _ctx ? _ctx.t : unref(t))('bfr.pickBuffer'),
                                ),
                                1,
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                        createVNode(
                          _sfc_main$2,
                          {
                            primary: '',
                            onClick: addNewRule,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(
                                  ('t' in _ctx ? _ctx.t : unref(t))('bfr.addNewRule'),
                                ),
                                1,
                              ),
                            ]),
                            _: 1,
                          },
                        ),
                      ],
                      64,
                    )),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  _cache[1] || (_cache[1] = createBaseVNode('th', null, null, -1)),
                  createBaseVNode('th', null, [
                    createVNode(InlineFlex, null, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('bfr.command')) + ' ',
                          1,
                        ),
                        createVNode(
                          _sfc_main$1,
                          {
                            position: 'right',
                            tooltip: ('t' in _ctx ? _ctx.t : unref(t))('bfr.commandTooltip'),
                          },
                          null,
                          8,
                          ['tooltip'],
                        ),
                      ]),
                      _: 1,
                    }),
                  ]),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('bfr.width')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('bfr.height')),
                    1,
                  ),
                  _cache[2] || (_cache[2] = createBaseVNode('th', null, null, -1)),
                ]),
              ]),
              unref(userData).settings.buffers.length === 0
                ? (openBlock(),
                  createElementBlock('tbody', _hoisted_1, [
                    createBaseVNode('tr', null, [
                      createBaseVNode(
                        'td',
                        _hoisted_2,
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('bfr.nothingYet')),
                        1,
                      ),
                    ]),
                  ]))
                : withDirectives(
                    (openBlock(),
                    createElementBlock(
                      'tbody',
                      {
                        key: 1,
                        class: normalizeClass(unref(dragging) ? unref($style).dragging : null),
                      },
                      [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(userData).settings.buffers, rule => {
                            return (
                              openBlock(),
                              createElementBlock(
                                'tr',
                                {
                                  key: unref(objectId)(rule),
                                },
                                [
                                  createBaseVNode(
                                    'td',
                                    {
                                      class: normalizeClass(unref($style).gripCell),
                                    },
                                    [
                                      createBaseVNode(
                                        'span',
                                        {
                                          class: normalizeClass([
                                            unref(grip).grip,
                                            unref(fa).solid,
                                            unref($style).grip,
                                          ]),
                                        },
                                        toDisplayString(''),
                                        2,
                                      ),
                                    ],
                                    2,
                                  ),
                                  createBaseVNode(
                                    'td',
                                    {
                                      class: normalizeClass(unref($style).commandCell),
                                    },
                                    [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass([
                                            ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                                            unref($style).inline,
                                          ]),
                                        },
                                        [
                                          createVNode(
                                            _sfc_main$4,
                                            {
                                              modelValue: rule[0],
                                              'onUpdate:modelValue': $event => (rule[0] = $event),
                                            },
                                            null,
                                            8,
                                            ['modelValue', 'onUpdate:modelValue'],
                                          ),
                                        ],
                                        2,
                                      ),
                                    ],
                                    2,
                                  ),
                                  createBaseVNode(
                                    'td',
                                    {
                                      class: normalizeClass(unref($style).sizeCell),
                                    },
                                    [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass([
                                            ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                                            unref($style).inline,
                                          ]),
                                        },
                                        [
                                          createVNode(
                                            _sfc_main$5,
                                            {
                                              modelValue: rule[1],
                                              'onUpdate:modelValue': $event => (rule[1] = $event),
                                            },
                                            null,
                                            8,
                                            ['modelValue', 'onUpdate:modelValue'],
                                          ),
                                        ],
                                        2,
                                      ),
                                    ],
                                    2,
                                  ),
                                  createBaseVNode(
                                    'td',
                                    {
                                      class: normalizeClass(unref($style).sizeCell),
                                    },
                                    [
                                      createBaseVNode(
                                        'div',
                                        {
                                          class: normalizeClass([
                                            ('C' in _ctx ? _ctx.C : unref(C)).forms.input,
                                            unref($style).inline,
                                          ]),
                                        },
                                        [
                                          createVNode(
                                            _sfc_main$5,
                                            {
                                              modelValue: rule[2],
                                              'onUpdate:modelValue': $event => (rule[2] = $event),
                                            },
                                            null,
                                            8,
                                            ['modelValue', 'onUpdate:modelValue'],
                                          ),
                                        ],
                                        2,
                                      ),
                                    ],
                                    2,
                                  ),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$2,
                                      {
                                        danger: '',
                                        onClick: $event => deleteRule(rule),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('bfr.delete'),
                                            ),
                                            1,
                                          ),
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
                    [[unref(so), [unref(userData).settings.buffers, draggableOptions]]],
                  ),
            ]),
            (openBlock(),
            createBlock(Teleport, { to: 'body' }, [
              unref(picking)
                ? (openBlock(),
                  createElementBlock(
                    'div',
                    {
                      key: 0,
                      ref_key: 'overlay',
                      ref: overlay,
                      class: normalizeClass(unref($style).overlay),
                      style: normalizeStyle({ cursor: unref(overlayCursor) }),
                      onClick: onOverlayMouseClick,
                      onMousemove: onOverlayMouseMove,
                    },
                    null,
                    38,
                  ))
                : createCommentVNode('', true),
            ])),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
