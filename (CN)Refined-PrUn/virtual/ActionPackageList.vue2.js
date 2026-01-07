import { t } from './index5.js';
import _sfc_main$2 from './ActionBar.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { showBuffer } from './buffers.js';
import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import _sfc_main$3 from './CreateActionPackage.vue.js';
import _sfc_main$4 from './ImportActionPackage.vue.js';
import Quickstart from './Quickstart.vue.js';
import { userData } from './user-data.js';
import PrunLink from './PrunLink.vue.js';
import removeArrayElement from './remove-array-element.js';
import { objectId } from './object-id.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createCommentVNode,
  createBlock,
  createTextVNode,
  withDirectives,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { colspan: '5' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ActionPackageList',
  setup(__props) {
    const actionPackages = computed(() => userData.actionPackages);
    const showQuickstart = computed(() => userData.actionPackages.length === 0);
    const dragging = ref(false);
    const draggableOptions = {
      animation: 150,
      handle: `.${grip.grip}`,
      onStart: () => (dragging.value = true),
      onEnd: () => (dragging.value = false),
    };
    function onQuickstartClick(ev) {
      showTileOverlay(ev, Quickstart);
    }
    function onCreateClick(ev) {
      showTileOverlay(ev, _sfc_main$3, {
        onCreate: name => {
          userData.actionPackages.push({
            global: { name },
            groups: [],
            actions: [],
          });
          showBuffer('XIT ACT_EDIT_' + name.split(' ').join('_'));
        },
      });
    }
    function onImportClick(ev) {
      showTileOverlay(ev, _sfc_main$4, {
        onImport: json => {
          const existing = userData.actionPackages.find(x => x.global.name === json.global.name);
          if (existing) {
            const index = userData.actionPackages.indexOf(existing);
            userData.actionPackages[index] = json;
          } else {
            userData.actionPackages.push(json);
          }
        },
      });
    }
    function onDeleteClick(ev, pkg) {
      showConfirmationOverlay(ev, () => removeArrayElement(userData.actionPackages, pkg), {
        message: t('act.deleteConfirm', pkg.global.name),
        confirmLabel: t('act.delete'),
      });
    }
    function friendlyName(pkg) {
      return pkg.global.name.split('_').join(' ');
    }
    function paramName(pkg) {
      return pkg.global.name.split(' ').join('_');
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(_sfc_main$2, null, {
              default: withCtx(() => [
                unref(showQuickstart)
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: normalizeClass(_ctx.$style.quickstartLabel),
                      },
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.quickstartHelp')),
                      3,
                    ))
                  : createCommentVNode('', true),
                unref(showQuickstart)
                  ? (openBlock(), createElementBlock('div', _hoisted_1, '→'))
                  : createCommentVNode('', true),
                unref(showQuickstart)
                  ? (openBlock(),
                    createBlock(
                      _sfc_main$1,
                      {
                        key: 2,
                        primary: '',
                        onClick: onQuickstartClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.quickstart')),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                    ))
                  : createCommentVNode('', true),
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    onClick: onCreateClick,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.createPackage')),
                        1,
                      ),
                    ]),
                    _: 1,
                  },
                ),
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    onClick: onImportClick,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.import')),
                        1,
                      ),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode(
                    'th',
                    {
                      class: normalizeClass(_ctx.$style.dragHeaderCell),
                    },
                    null,
                    2,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.name')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.execute')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.edit')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.delete')),
                    1,
                  ),
                ]),
              ]),
              unref(userData).actionPackages.length === 0
                ? (openBlock(),
                  createElementBlock('tbody', _hoisted_2, [
                    createBaseVNode('tr', null, [
                      createBaseVNode(
                        'td',
                        _hoisted_3,
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('act.noPackages')),
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
                        class: normalizeClass(unref(dragging) ? _ctx.$style.dragging : null),
                      },
                      [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(unref(actionPackages), pkg => {
                            return (
                              openBlock(),
                              createElementBlock(
                                'tr',
                                {
                                  key: unref(objectId)(pkg),
                                },
                                [
                                  createBaseVNode(
                                    'td',
                                    {
                                      class: normalizeClass(_ctx.$style.dragCell),
                                    },
                                    [
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
                                    ],
                                    2,
                                  ),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      PrunLink,
                                      {
                                        inline: '',
                                        command: `XIT ACT_${paramName(pkg)}`,
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(toDisplayString(friendlyName(pkg)), 1),
                                        ]),
                                        _: 2,
                                      },
                                      1032,
                                      ['command'],
                                    ),
                                  ]),
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$1,
                                      {
                                        primary: '',
                                        onClick: $event =>
                                          unref(showBuffer)(`XIT ACT_${paramName(pkg)}`),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('act.execute'),
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
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$1,
                                      {
                                        primary: '',
                                        onClick: $event =>
                                          unref(showBuffer)(`XIT ACT_EDIT_${paramName(pkg)}`),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('act.edit'),
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
                                  createBaseVNode('td', null, [
                                    createVNode(
                                      _sfc_main$1,
                                      {
                                        dark: '',
                                        inline: '',
                                        onClick: $event => onDeleteClick($event, pkg),
                                      },
                                      {
                                        default: withCtx(() => [
                                          createTextVNode(
                                            toDisplayString(
                                              ('t' in _ctx ? _ctx.t : unref(t))('act.delete'),
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
                    [[unref(so), [unref(actionPackages), draggableOptions]]],
                  ),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
