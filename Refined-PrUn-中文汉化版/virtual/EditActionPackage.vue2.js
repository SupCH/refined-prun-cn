import Header from './Header.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Commands.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import removeArrayElement from './remove-array-element.js';
import { objectId } from './object-id.js';
import { act } from './act-registry.js';
import { showBuffer } from './buffers.js';
import _sfc_main$3 from './EditMaterialGroup.vue.js';
import _sfc_main$4 from './EditAction.vue.js';
import { downloadJson } from './json-file.js';
import { deepToRaw } from './deep-to-raw.js';
import RenameActionPackage from './RenameActionPackage.vue.js';
import { t } from './index5.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 1 };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'EditActionPackage',
  props: {
    pkg: {},
  },
  setup(__props) {
    function onAddMaterialGroupClick(e) {
      const group = {
        name: '',
        type: 'Resupply',
      };
      showTileOverlay(e, _sfc_main$3, {
        add: true,
        group,
        onSave: () => __props.pkg.groups.push(group),
      });
    }
    function onEditMaterialGroupClick(e, group) {
      showTileOverlay(e, _sfc_main$3, { group });
    }
    function onDeleteMaterialGroupClick(e, group) {
      showConfirmationOverlay(e, () => removeArrayElement(__props.pkg.groups, group), {
        message: t('act.deleteGroupConfirm', group.name || '--'),
        confirmLabel: t('act.delete'),
      });
    }
    function onAddActionClick(e) {
      const action = {
        name: '',
        type: 'MTRA',
      };
      showTileOverlay(e, _sfc_main$4, {
        add: true,
        action,
        pkg: __props.pkg,
        onSave: () => __props.pkg.actions.push(action),
      });
    }
    function onEditActionClick(e, action) {
      showTileOverlay(e, _sfc_main$4, { action, pkg: __props.pkg });
    }
    function onDeleteActionClick(e, action) {
      showConfirmationOverlay(e, () => removeArrayElement(__props.pkg.actions, action), {
        message: t('act.deleteActionConfirm', action.name || '--'),
        confirmLabel: t('act.delete'),
      });
    }
    function getMaterialGroupDescription(group) {
      const info = act.getMaterialGroupInfo(group.type);
      return info ? info.description(group) : '--';
    }
    function getActionDescription(action) {
      const info = act.getActionInfo(action.type);
      return info ? info.description(action) : '--';
    }
    function onRenameClick(ev) {
      showTileOverlay(ev, RenameActionPackage, {
        name: __props.pkg.global.name,
        onRename: name => (__props.pkg.global.name = name),
      });
    }
    function onExecuteClick() {
      showBuffer(`XIT ACT_${__props.pkg.global.name.replace(' ', '_')}`);
    }
    function onExportClick() {
      const json = deepToRaw(__props.pkg);
      downloadJson(json, `${__props.pkg.global.name.replace(' ', '_')}-${Date.now()}.json`);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              Header,
              {
                modelValue: _ctx.pkg.global.name,
                'onUpdate:modelValue':
                  _cache[0] || (_cache[0] = $event => (_ctx.pkg.global.name = $event)),
                editable: '',
                class: normalizeClass(_ctx.$style.header),
              },
              null,
              8,
              ['modelValue', 'class'],
            ),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(t)('act.group')), 1)]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode('th', null, toDisplayString(unref(t)('act.typeLabel')), 1),
                  createBaseVNode('th', null, toDisplayString(unref(t)('act.name')), 1),
                  createBaseVNode('th', null, toDisplayString(unref(t)('act.content')), 1),
                  _cache[1] || (_cache[1] = createBaseVNode('th', null, null, -1)),
                ]),
              ]),
              _ctx.pkg.groups.length === 0
                ? (openBlock(),
                  createElementBlock('tbody', _hoisted_1, [
                    createBaseVNode('tr', null, [
                      createBaseVNode(
                        'td',
                        {
                          colspan: '4',
                          class: normalizeClass(_ctx.$style.emptyRow),
                        },
                        toDisplayString(unref(t)('act.noGroups')),
                        3,
                      ),
                    ]),
                  ]))
                : (openBlock(),
                  createElementBlock('tbody', _hoisted_2, [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(_ctx.pkg.groups, group => {
                        return (
                          openBlock(),
                          createElementBlock(
                            'tr',
                            {
                              key: unref(objectId)(group),
                            },
                            [
                              createBaseVNode('td', null, toDisplayString(group.type), 1),
                              createBaseVNode('td', null, toDisplayString(group.name || '--'), 1),
                              createBaseVNode(
                                'td',
                                null,
                                toDisplayString(getMaterialGroupDescription(group)),
                                1,
                              ),
                              createBaseVNode('td', null, [
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    dark: '',
                                    inline: '',
                                    onClick: $event => onEditMaterialGroupClick($event, group),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)('act.edit')), 1),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['onClick'],
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    dark: '',
                                    inline: '',
                                    onClick: $event => onDeleteMaterialGroupClick($event, group),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)('act.delete')), 1),
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
                  ])),
            ]),
            createBaseVNode(
              'form',
              {
                class: normalizeClass(_ctx.$style.sectionCommands),
              },
              [
                createVNode(_sfc_main$2, null, {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: onAddMaterialGroupClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)('act.add')), 1),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                }),
              ],
              2,
            ),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [createTextVNode(toDisplayString(unref(t)('act.action')), 1)]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode('th', null, toDisplayString(unref(t)('act.typeLabel')), 1),
                  createBaseVNode('th', null, toDisplayString(unref(t)('act.name')), 1),
                  createBaseVNode('th', null, toDisplayString(unref(t)('act.content')), 1),
                  _cache[2] || (_cache[2] = createBaseVNode('th', null, null, -1)),
                ]),
              ]),
              _ctx.pkg.actions.length === 0
                ? (openBlock(),
                  createElementBlock('tbody', _hoisted_3, [
                    createBaseVNode('tr', null, [
                      createBaseVNode(
                        'td',
                        {
                          colspan: '4',
                          class: normalizeClass(_ctx.$style.emptyRow),
                        },
                        toDisplayString(unref(t)('act.noActions')),
                        3,
                      ),
                    ]),
                  ]))
                : (openBlock(),
                  createElementBlock('tbody', _hoisted_4, [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(_ctx.pkg.actions, action => {
                        return (
                          openBlock(),
                          createElementBlock(
                            'tr',
                            {
                              key: unref(objectId)(action),
                            },
                            [
                              createBaseVNode('td', null, toDisplayString(action.type), 1),
                              createBaseVNode('td', null, toDisplayString(action.name || '--'), 1),
                              createBaseVNode(
                                'td',
                                null,
                                toDisplayString(getActionDescription(action)),
                                1,
                              ),
                              createBaseVNode('td', null, [
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    dark: '',
                                    inline: '',
                                    onClick: $event => onEditActionClick($event, action),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)('act.edit')), 1),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['onClick'],
                                ),
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    dark: '',
                                    inline: '',
                                    onClick: $event => onDeleteActionClick($event, action),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(unref(t)('act.delete')), 1),
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
                  ])),
            ]),
            createBaseVNode(
              'form',
              {
                class: normalizeClass(_ctx.$style.sectionCommands),
              },
              [
                createVNode(_sfc_main$2, null, {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: onAddActionClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)('act.add')), 1),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                }),
              ],
              2,
            ),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(toDisplayString(unref(t)('act.commands')), 1),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                {
                  label: unref(t)('act.rename'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: onRenameClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)('act.rename').toUpperCase()), 1),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
              createVNode(
                _sfc_main$2,
                {
                  label: unref(t)('act.execute'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: onExecuteClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(unref(t)('act.execute').toUpperCase()),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
              createVNode(
                _sfc_main$2,
                {
                  label: unref(t)('act.export'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: onExportClick,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)('act.export').toUpperCase()), 1),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
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
