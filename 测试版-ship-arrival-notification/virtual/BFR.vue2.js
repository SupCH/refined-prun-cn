import { useCssModule } from './runtime-dom.esm-bundler.js';
import { $, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { t } from './index5.js';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQkZSLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvU0VUL0JGUi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBBY3Rpb25CYXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL0FjdGlvbkJhci52dWUnO1xuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCByZW1vdmVBcnJheUVsZW1lbnQgZnJvbSAnQHNyYy91dGlscy9yZW1vdmUtYXJyYXktZWxlbWVudCc7XG5pbXBvcnQgeyB2RHJhZ2dhYmxlIH0gZnJvbSAndnVlLWRyYWdnYWJsZS1wbHVzJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuaW1wb3J0IGdyaXAgZnJvbSAnQHNyYy91dGlscy9ncmlwLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuaW1wb3J0IFRvb2x0aXAgZnJvbSAnQHNyYy9jb21wb25lbnRzL1Rvb2x0aXAudnVlJztcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvTnVtYmVySW5wdXQudnVlJztcbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuaW1wb3J0IElubGluZUZsZXggZnJvbSAnQHNyYy9jb21wb25lbnRzL0lubGluZUZsZXgudnVlJztcblxuY29uc3QgJHN0eWxlID0gdXNlQ3NzTW9kdWxlKCk7XG5cbmNvbnN0IHBpY2tpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBvdmVybGF5ID0gdXNlVGVtcGxhdGVSZWY8SFRNTEVsZW1lbnQ+KCdvdmVybGF5Jyk7XG5cbmNvbnN0IHBpY2tlZEJ1ZmZlciA9IHJlZihudWxsIGFzIEVsZW1lbnQgfCBudWxsIHwgdW5kZWZpbmVkKTtcblxuY29uc3Qgb3ZlcmxheUN1cnNvciA9IGNvbXB1dGVkKCgpID0+IChwaWNrZWRCdWZmZXIudmFsdWUgPyAncG9pbnRlcicgOiAnZGVmYXVsdCcpKTtcblxuZnVuY3Rpb24gb25PdmVybGF5TW91c2VNb3ZlKGU6IE1vdXNlRXZlbnQpIHtcbiAgaWYgKCFwaWNraW5nLnZhbHVlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3QgbGFzdFBpY2tlZEJ1ZmZlciA9IHBpY2tlZEJ1ZmZlci52YWx1ZTtcbiAgcGlja2VkQnVmZmVyLnZhbHVlID0gZ2V0QnVmZmVyVW5kZXJDdXJzb3IoZSk7XG4gIGxhc3RQaWNrZWRCdWZmZXI/LmNsYXNzTGlzdC5yZW1vdmUoJHN0eWxlLmhpZ2hsaWdodCk7XG4gIHBpY2tlZEJ1ZmZlci52YWx1ZT8uY2xhc3NMaXN0LmFkZCgkc3R5bGUuaGlnaGxpZ2h0KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gb25PdmVybGF5TW91c2VDbGljayhlOiBNb3VzZUV2ZW50KSB7XG4gIGNvbnN0IGJ1ZmZlciA9IGdldEJ1ZmZlclVuZGVyQ3Vyc29yKGUpO1xuICBwaWNrZWRCdWZmZXIudmFsdWU/LmNsYXNzTGlzdC5yZW1vdmUoJHN0eWxlLmhpZ2hsaWdodCk7XG4gIHBpY2tlZEJ1ZmZlci52YWx1ZSA9IG51bGw7XG4gIHBpY2tpbmcudmFsdWUgPSBmYWxzZTtcbiAgaWYgKCFidWZmZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBjbWQgPSBhd2FpdCAkKGJ1ZmZlciwgQy5UaWxlRnJhbWUuY21kKTtcbiAgaWYgKCFjbWQudGV4dENvbnRlbnQpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBib2R5ID0gYXdhaXQgJChidWZmZXIsIEMuV2luZG93LmJvZHkpO1xuICBjb25zdCB3aWR0aCA9IHBhcnNlSW50KGJvZHkuc3R5bGUud2lkdGgucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgY29uc3QgaGVpZ2h0ID0gcGFyc2VJbnQoYm9keS5zdHlsZS5oZWlnaHQucmVwbGFjZSgncHgnLCAnJyksIDEwKTtcbiAgdXNlckRhdGEuc2V0dGluZ3MuYnVmZmVycy51bnNoaWZ0KFtjbWQudGV4dENvbnRlbnQsIHdpZHRoLCBoZWlnaHRdKTtcbn1cblxuZnVuY3Rpb24gZ2V0QnVmZmVyVW5kZXJDdXJzb3IoZTogTW91c2VFdmVudCkge1xuICBjb25zdCBlbGVtZW50ID0gZ2V0RWxlbWVudFVuZGVyQ3Vyc29yKGUpO1xuICBpZiAoIWVsZW1lbnQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IHdpbmRvdyA9IGVsZW1lbnQuY2xvc2VzdChgLiR7Qy5XaW5kb3cud2luZG93fWApO1xuICBpZiAoIXdpbmRvdykge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBjbWQgPSBfJCh3aW5kb3csIEMuVGlsZUZyYW1lLmNtZCk7XG4gIGlmICghY21kKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuXG4gIHJldHVybiB3aW5kb3c7XG59XG5cbmZ1bmN0aW9uIGdldEVsZW1lbnRVbmRlckN1cnNvcihlOiBNb3VzZUV2ZW50KSB7XG4gIG92ZXJsYXkudmFsdWUhLnN0eWxlLnBvaW50ZXJFdmVudHMgPSAnbm9uZSc7XG4gIGNvbnN0IGVsZW1lbnQgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGUuY2xpZW50WCwgZS5jbGllbnRZKTtcbiAgb3ZlcmxheS52YWx1ZSEuc3R5bGUucG9pbnRlckV2ZW50cyA9ICdhbGwnO1xuICByZXR1cm4gZWxlbWVudDtcbn1cblxuZnVuY3Rpb24gYWRkTmV3UnVsZSgpIHtcbiAgdXNlckRhdGEuc2V0dGluZ3MuYnVmZmVycy51bnNoaWZ0KFsnJywgNDUwLCAzMDBdKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlUnVsZShydWxlOiBbc3RyaW5nLCBudW1iZXIsIG51bWJlcl0pIHtcbiAgcmVtb3ZlQXJyYXlFbGVtZW50KHVzZXJEYXRhLnNldHRpbmdzLmJ1ZmZlcnMsIHJ1bGUpO1xufVxuXG5jb25zdCBkcmFnZ2luZyA9IHJlZihmYWxzZSk7XG5cbmNvbnN0IGRyYWdnYWJsZU9wdGlvbnMgPSB7XG4gIGFuaW1hdGlvbjogMTUwLFxuICBoYW5kbGU6IGAuJHtncmlwLmdyaXB9YCxcbiAgb25TdGFydDogKCkgPT4gKGRyYWdnaW5nLnZhbHVlID0gdHJ1ZSksXG4gIG9uRW5kOiAoKSA9PiAoZHJhZ2dpbmcudmFsdWUgPSBmYWxzZSksXG59O1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPFNlY3Rpb25IZWFkZXI+XG4gICAge3sgdCgnYmZyLnRpdGxlJykgfX1cbiAgICA8VG9vbHRpcCBwb3NpdGlvbj1cImJvdHRvbVwiIDpjbGFzcz1cIiRzdHlsZS50b29sdGlwXCIgOnRvb2x0aXA9XCJ0KCdiZnIudG9vbHRpcCcpXCIgLz5cbiAgPC9TZWN0aW9uSGVhZGVyPlxuICA8QWN0aW9uQmFyPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwicGlja2luZ1wiPlxuICAgICAgPFBydW5CdXR0b24gbmV1dHJhbD5cbiAgICAgICAge3sgcGlja2VkQnVmZmVyID8gdCgnYmZyLmNsaWNrVG9QaWNrJykgOiB0KCdiZnIuY2xpY2tUb0NhbmNlbCcpIH19XG4gICAgICA8L1BydW5CdXR0b24+XG4gICAgPC90ZW1wbGF0ZT5cbiAgICA8dGVtcGxhdGUgdi1lbHNlPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJwaWNraW5nID0gdHJ1ZVwiPnt7IHQoJ2Jmci5waWNrQnVmZmVyJykgfX08L1BydW5CdXR0b24+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImFkZE5ld1J1bGVcIj57eyB0KCdiZnIuYWRkTmV3UnVsZScpIH19PC9QcnVuQnV0dG9uPlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvQWN0aW9uQmFyPlxuICA8dGFibGU+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGggLz5cbiAgICAgICAgPHRoPlxuICAgICAgICAgIDxJbmxpbmVGbGV4PlxuICAgICAgICAgICAge3sgdCgnYmZyLmNvbW1hbmQnKSB9fVxuICAgICAgICAgICAgPFRvb2x0aXAgcG9zaXRpb249XCJyaWdodFwiIDp0b29sdGlwPVwidCgnYmZyLmNvbW1hbmRUb29sdGlwJylcIiAvPlxuICAgICAgICAgIDwvSW5saW5lRmxleD5cbiAgICAgICAgPC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2Jmci53aWR0aCcpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2Jmci5oZWlnaHQnKSB9fTwvdGg+XG4gICAgICAgIDx0aCAvPlxuICAgICAgPC90cj5cbiAgICA8L3RoZWFkPlxuICAgIDx0Ym9keSB2LWlmPVwidXNlckRhdGEuc2V0dGluZ3MuYnVmZmVycy5sZW5ndGggPT09IDBcIj5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRkIGNvbHNwYW49XCI1XCI+e3sgdCgnYmZyLm5vdGhpbmdZZXQnKSB9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gICAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICAgIDx0Ym9keVxuICAgICAgICB2LWRyYWdnYWJsZT1cIlt1c2VyRGF0YS5zZXR0aW5ncy5idWZmZXJzLCBkcmFnZ2FibGVPcHRpb25zXVwiXG4gICAgICAgIDpjbGFzcz1cImRyYWdnaW5nID8gJHN0eWxlLmRyYWdnaW5nIDogbnVsbFwiPlxuICAgICAgICA8dHIgdi1mb3I9XCJydWxlIGluIHVzZXJEYXRhLnNldHRpbmdzLmJ1ZmZlcnNcIiA6a2V5PVwib2JqZWN0SWQocnVsZSlcIj5cbiAgICAgICAgICA8dGQgOmNsYXNzPVwiJHN0eWxlLmdyaXBDZWxsXCI+XG4gICAgICAgICAgICA8c3BhbiA6Y2xhc3M9XCJbZ3JpcC5ncmlwLCBmYS5zb2xpZCwgJHN0eWxlLmdyaXBdXCI+XG4gICAgICAgICAgICAgIHt7ICdcXHVmNThlJyB9fVxuICAgICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgICAgPHRkIDpjbGFzcz1cIiRzdHlsZS5jb21tYW5kQ2VsbFwiPlxuICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCJbQy5mb3Jtcy5pbnB1dCwgJHN0eWxlLmlubGluZV1cIj5cbiAgICAgICAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwicnVsZVswXVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZCA6Y2xhc3M9XCIkc3R5bGUuc2l6ZUNlbGxcIj5cbiAgICAgICAgICAgIDxkaXYgOmNsYXNzPVwiW0MuZm9ybXMuaW5wdXQsICRzdHlsZS5pbmxpbmVdXCI+XG4gICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCB2LW1vZGVsPVwicnVsZVsxXVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZCA6Y2xhc3M9XCIkc3R5bGUuc2l6ZUNlbGxcIj5cbiAgICAgICAgICAgIDxkaXYgOmNsYXNzPVwiW0MuZm9ybXMuaW5wdXQsICRzdHlsZS5pbmxpbmVdXCI+XG4gICAgICAgICAgICAgIDxOdW1iZXJJbnB1dCB2LW1vZGVsPVwicnVsZVsyXVwiIC8+XG4gICAgICAgICAgICA8L2Rpdj5cbiAgICAgICAgICA8L3RkPlxuICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgIDxQcnVuQnV0dG9uIGRhbmdlciBAY2xpY2s9XCJkZWxldGVSdWxlKHJ1bGUpXCI+e3sgdCgnYmZyLmRlbGV0ZScpIH19PC9QcnVuQnV0dG9uPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGVtcGxhdGU+XG4gIDwvdGFibGU+XG4gIDxUZWxlcG9ydCB0bz1cImJvZHlcIj5cbiAgICA8ZGl2XG4gICAgICB2LWlmPVwicGlja2luZ1wiXG4gICAgICByZWY9XCJvdmVybGF5XCJcbiAgICAgIDpjbGFzcz1cIiRzdHlsZS5vdmVybGF5XCJcbiAgICAgIDpzdHlsZT1cInsgY3Vyc29yOiBvdmVybGF5Q3Vyc29yIH1cIlxuICAgICAgQGNsaWNrPVwib25PdmVybGF5TW91c2VDbGlja1wiXG4gICAgICBAbW91c2Vtb3ZlPVwib25PdmVybGF5TW91c2VNb3ZlXCIgLz5cbiAgPC9UZWxlcG9ydD5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4ub3ZlcmxheSB7XG4gIHBvc2l0aW9uOiBmaXhlZDtcbiAgdG9wOiAwO1xuICBsZWZ0OiAwO1xuICB3aWR0aDogMTAwdnc7XG4gIGhlaWdodDogMTAwdmg7XG4gIGJhY2tncm91bmQ6IHJnYmEoMCwgMCwgMCwgMC4yKTtcbiAgei1pbmRleDogOTk5OTk5O1xufVxuXG4uaGlnaGxpZ2h0IHtcbiAgei1pbmRleDogOTk5OTk4ICFpbXBvcnRhbnQ7XG59XG5cbi5oaWdobGlnaHQ6YWZ0ZXIge1xuICBjb250ZW50OiAnJztcbiAgcG9zaXRpb246IGFic29sdXRlO1xuICB0b3A6IDA7XG4gIGxlZnQ6IDA7XG4gIGJvdHRvbTogMDtcbiAgcmlnaHQ6IDA7XG4gIGJhY2tncm91bmQtY29sb3I6IHJnYmEoNjMsIDE2MiwgMjIyLCAwLjMpO1xuICB6LWluZGV4OiA5OTk5OTg7XG59XG5cbi5pbmxpbmUge1xuICBkaXNwbGF5OiBpbmxpbmUtYmxvY2s7XG59XG5cbi5ncmlwQ2VsbCB7XG4gIHdpZHRoOiAxMHB4O1xuICBwYWRkaW5nLWxlZnQ6IDVweDtcbiAgcGFkZGluZy1yaWdodDogNXB4O1xufVxuXG4uZ3JpcCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2UtaW4tb3V0O1xuICBvcGFjaXR5OiAwO1xufVxuXG50cjpob3ZlciAuZ3JpcCB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5kcmFnZ2luZyB0ZCAuZ3JpcCB7XG4gIG9wYWNpdHk6IDA7XG59XG5cbi5jb21tYW5kQ2VsbCAqIHtcbiAgd2lkdGg6IDEwMCU7XG59XG5cbi5zaXplQ2VsbCB7XG4gIHdpZHRoOiA2MHB4O1xuXG4gIGlucHV0IHtcbiAgICB3aWR0aDogNjBweDtcbiAgICB0ZXh0LWFsaWduOiBsZWZ0O1xuICB9XG59XG5cbi50b29sdGlwIHtcbiAgZmxvYXQ6IHJldmVydDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBtYXJnaW4tdG9wOiAtNHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9jcmVhdGVWTm9kZSIsIlRvb2x0aXAiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUJsb2NrIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJDIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9ub3JtYWxpemVTdHlsZSIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFlQSxVQUFBLFNBQUEsYUFBQTtBQUVBLFVBQUEsVUFBQSxJQUFBLEtBQUE7QUFFQSxVQUFBLFVBQUEsZUFBQSxTQUFBO0FBRUEsVUFBQSxlQUFBLElBQUEsSUFBQTtBQUVBLFVBQUEsZ0JBQUEsU0FBQSxNQUFBLGFBQUEsUUFBQSxZQUFBLFNBQUE7QUFFQSxhQUFBLG1CQUFBLEdBQUE7QUFDRSxVQUFBLENBQUEsUUFBQSxPQUFBO0FBQ0U7QUFBQSxNQUFBO0FBR0YsWUFBQSxtQkFBQSxhQUFBO0FBQ0EsbUJBQUEsUUFBQSxxQkFBQSxDQUFBO0FBQ0Esd0JBQUEsVUFBQSxPQUFBLE9BQUEsU0FBQTtBQUNBLG1CQUFBLE9BQUEsVUFBQSxJQUFBLE9BQUEsU0FBQTtBQUFBLElBQWtEO0FBR3BELG1CQUFBLG9CQUFBLEdBQUE7QUFDRSxZQUFBLFNBQUEscUJBQUEsQ0FBQTtBQUNBLG1CQUFBLE9BQUEsVUFBQSxPQUFBLE9BQUEsU0FBQTtBQUNBLG1CQUFBLFFBQUE7QUFDQSxjQUFBLFFBQUE7QUFDQSxVQUFBLENBQUEsUUFBQTtBQUNFO0FBQUEsTUFBQTtBQUdGLFlBQUEsTUFBQSxNQUFBLEVBQUEsUUFBQSxFQUFBLFVBQUEsR0FBQTtBQUNBLFVBQUEsQ0FBQSxJQUFBLGFBQUE7QUFDRTtBQUFBLE1BQUE7QUFHRixZQUFBLE9BQUEsTUFBQSxFQUFBLFFBQUEsRUFBQSxPQUFBLElBQUE7QUFDQSxZQUFBLFFBQUEsU0FBQSxLQUFBLE1BQUEsTUFBQSxRQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxZQUFBLFNBQUEsU0FBQSxLQUFBLE1BQUEsT0FBQSxRQUFBLE1BQUEsRUFBQSxHQUFBLEVBQUE7QUFDQSxlQUFBLFNBQUEsUUFBQSxRQUFBLENBQUEsSUFBQSxhQUFBLE9BQUEsTUFBQSxDQUFBO0FBQUEsSUFBa0U7QUFHcEUsYUFBQSxxQkFBQSxHQUFBO0FBQ0UsWUFBQSxVQUFBLHNCQUFBLENBQUE7QUFDQSxVQUFBLENBQUEsU0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsWUFBQSxTQUFBLFFBQUEsUUFBQSxJQUFBLEVBQUEsT0FBQSxNQUFBLEVBQUE7QUFDQSxVQUFBLENBQUEsUUFBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBR1QsWUFBQSxNQUFBLEdBQUEsUUFBQSxFQUFBLFVBQUEsR0FBQTtBQUNBLFVBQUEsQ0FBQSxLQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFHVCxhQUFBO0FBQUEsSUFBTztBQUdULGFBQUEsc0JBQUEsR0FBQTtBQUNFLGNBQUEsTUFBQSxNQUFBLGdCQUFBO0FBQ0EsWUFBQSxVQUFBLFNBQUEsaUJBQUEsRUFBQSxTQUFBLEVBQUEsT0FBQTtBQUNBLGNBQUEsTUFBQSxNQUFBLGdCQUFBO0FBQ0EsYUFBQTtBQUFBLElBQU87QUFHVCxhQUFBLGFBQUE7QUFDRSxlQUFBLFNBQUEsUUFBQSxRQUFBLENBQUEsSUFBQSxLQUFBLEdBQUEs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
