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
        message: `Are you sure you want to delete the material group "${group.name || '--'}"?`,
        confirmLabel: 'DELETE',
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
        message: `Are you sure you want to delete the action "${action.name || '--'}"?`,
        confirmLabel: 'DELETE',
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
              default: withCtx(() => [
                ...(_cache[1] || (_cache[1] = [createTextVNode('Material Groups', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              _cache[4] ||
                (_cache[4] = createBaseVNode(
                  'thead',
                  null,
                  [
                    createBaseVNode('tr', null, [
                      createBaseVNode('th', null, 'Type'),
                      createBaseVNode('th', null, 'Name'),
                      createBaseVNode('th', null, 'Content'),
                      createBaseVNode('th'),
                    ]),
                  ],
                  -1,
                )),
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
                        'No groups yet.',
                        2,
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
                                      ...(_cache[2] ||
                                        (_cache[2] = [createTextVNode(' edit ', -1)])),
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
                                      ...(_cache[3] ||
                                        (_cache[3] = [createTextVNode(' delete ', -1)])),
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
                          ...(_cache[5] || (_cache[5] = [createTextVNode('ADD', -1)])),
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
                ...(_cache[6] || (_cache[6] = [createTextVNode('Actions', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              _cache[9] ||
                (_cache[9] = createBaseVNode(
                  'thead',
                  null,
                  [
                    createBaseVNode('tr', null, [
                      createBaseVNode('th', null, 'Type'),
                      createBaseVNode('th', null, 'Name'),
                      createBaseVNode('th', null, 'Content'),
                      createBaseVNode('th'),
                    ]),
                  ],
                  -1,
                )),
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
                        'No actions yet.',
                        2,
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
                                      ...(_cache[7] || (_cache[7] = [createTextVNode('edit', -1)])),
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
                                      ...(_cache[8] ||
                                        (_cache[8] = [createTextVNode('delete', -1)])),
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
                          ...(_cache[10] || (_cache[10] = [createTextVNode('ADD', -1)])),
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
                ...(_cache[11] || (_cache[11] = [createTextVNode('Commands', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'Remame' },
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
                          ...(_cache[12] || (_cache[12] = [createTextVNode('RENAME', -1)])),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'Execute' },
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
                          ...(_cache[13] || (_cache[13] = [createTextVNode('EXECUTE', -1)])),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'Export' },
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
                          ...(_cache[14] || (_cache[14] = [createTextVNode('EXPORT', -1)])),
                        ]),
                        _: 1,
                      },
                    ),
                  ]),
                  _: 1,
                },
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
