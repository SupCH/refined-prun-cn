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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdEFjdGlvblBhY2thZ2UudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvRWRpdEFjdGlvblBhY2thZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9IZWFkZXIudnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IHsgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXksIHNob3dUaWxlT3ZlcmxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS90aWxlLW92ZXJsYXknO1xuaW1wb3J0IHJlbW92ZUFycmF5RWxlbWVudCBmcm9tICdAc3JjL3V0aWxzL3JlbW92ZS1hcnJheS1lbGVtZW50JztcbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuaW1wb3J0IHsgYWN0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdC1yZWdpc3RyeSc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IEVkaXRNYXRlcmlhbEdyb3VwIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9FZGl0TWF0ZXJpYWxHcm91cC52dWUnO1xuaW1wb3J0IEVkaXRBY3Rpb24gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL0VkaXRBY3Rpb24udnVlJztcbmltcG9ydCB7IGRvd25sb2FkSnNvbiB9IGZyb20gJ0BzcmMvdXRpbHMvanNvbi1maWxlJztcbmltcG9ydCB7IGRlZXBUb1JhdyB9IGZyb20gJ0BzcmMvdXRpbHMvZGVlcC10by1yYXcnO1xuaW1wb3J0IFJlbmFtZUFjdGlvblBhY2thZ2UgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL1JlbmFtZUFjdGlvblBhY2thZ2UudnVlJztcblxuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmNvbnN0IHsgcGtnIH0gPSBkZWZpbmVQcm9wczx7IHBrZzogVXNlckRhdGEuQWN0aW9uUGFja2FnZURhdGEgfT4oKTtcblxuZnVuY3Rpb24gb25BZGRNYXRlcmlhbEdyb3VwQ2xpY2soZTogRXZlbnQpIHtcbiAgY29uc3QgZ3JvdXA6IFVzZXJEYXRhLk1hdGVyaWFsR3JvdXBEYXRhID0ge1xuICAgIG5hbWU6ICcnLFxuICAgIHR5cGU6ICdSZXN1cHBseScsXG4gIH07XG4gIHNob3dUaWxlT3ZlcmxheShlLCBFZGl0TWF0ZXJpYWxHcm91cCwge1xuICAgIGFkZDogdHJ1ZSxcbiAgICBncm91cCxcbiAgICBvblNhdmU6ICgpID0+IHBrZy5ncm91cHMucHVzaChncm91cCksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBvbkVkaXRNYXRlcmlhbEdyb3VwQ2xpY2soZTogRXZlbnQsIGdyb3VwOiBVc2VyRGF0YS5NYXRlcmlhbEdyb3VwRGF0YSkge1xuICBzaG93VGlsZU92ZXJsYXkoZSwgRWRpdE1hdGVyaWFsR3JvdXAsIHsgZ3JvdXAgfSk7XG59XG5cbmZ1bmN0aW9uIG9uRGVsZXRlTWF0ZXJpYWxHcm91cENsaWNrKGU6IEV2ZW50LCBncm91cDogVXNlckRhdGEuTWF0ZXJpYWxHcm91cERhdGEpIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoZSwgKCkgPT4gcmVtb3ZlQXJyYXlFbGVtZW50KHBrZy5ncm91cHMsIGdyb3VwKSwge1xuICAgIG1lc3NhZ2U6IHQoJ2FjdC5kZWxldGVHcm91cENvbmZpcm0nLCBncm91cC5uYW1lIHx8ICctLScpLFxuICAgIGNvbmZpcm1MYWJlbDogdCgnYWN0LmRlbGV0ZScpLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gb25BZGRBY3Rpb25DbGljayhlOiBFdmVudCkge1xuICBjb25zdCBhY3Rpb246IFVzZXJEYXRhLkFjdGlvbkRhdGEgPSB7XG4gICAgbmFtZTogJycsXG4gICAgdHlwZTogJ01UUkEnLFxuICB9O1xuICBzaG93VGlsZU92ZXJsYXkoZSwgRWRpdEFjdGlvbiwge1xuICAgIGFkZDogdHJ1ZSxcbiAgICBhY3Rpb24sXG4gICAgcGtnLFxuICAgIG9uU2F2ZTogKCkgPT4gcGtnLmFjdGlvbnMucHVzaChhY3Rpb24pLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gb25FZGl0QWN0aW9uQ2xpY2soZTogRXZlbnQsIGFjdGlvbjogVXNlckRhdGEuQWN0aW9uRGF0YSkge1xuICBzaG93VGlsZU92ZXJsYXkoZSwgRWRpdEFjdGlvbiwgeyBhY3Rpb24sIHBrZyB9KTtcbn1cblxuZnVuY3Rpb24gb25EZWxldGVBY3Rpb25DbGljayhlOiBFdmVudCwgYWN0aW9uOiBVc2VyRGF0YS5BY3Rpb25EYXRhKSB7XG4gIHNob3dDb25maXJtYXRpb25PdmVybGF5KGUsICgpID0+IHJlbW92ZUFycmF5RWxlbWVudChwa2cuYWN0aW9ucywgYWN0aW9uKSwge1xuICAgIG1lc3NhZ2U6IHQoJ2FjdC5kZWxldGVBY3Rpb25Db25maXJtJywgYWN0aW9uLm5hbWUgfHwgJy0tJyksXG4gICAgY29uZmlybUxhYmVsOiB0KCdhY3QuZGVsZXRlJyksXG4gIH0pO1xufVxuXG5mdW5jdGlvbiBnZXRNYXRlcmlhbEdyb3VwRGVzY3JpcHRpb24oZ3JvdXA6IFVzZXJEYXRhLk1hdGVyaWFsR3JvdXBEYXRhKSB7XG4gIGNvbnN0IGluZm8gPSBhY3QuZ2V0TWF0ZXJpYWxHcm91cEluZm8oZ3JvdXAudHlwZSk7XG4gIHJldHVybiBpbmZvID8gaW5mby5kZXNjcmlwdGlvbihncm91cCkgOiAnLS0nO1xufVxuXG5mdW5jdGlvbiBnZXRBY3Rpb25EZXNjcmlwdGlvbihhY3Rpb246IFVzZXJEYXRhLkFjdGlvbkRhdGEpIHtcbiAgY29uc3QgaW5mbyA9IGFjdC5nZXRBY3Rpb25JbmZvKGFjdGlvbi50eXBlKTtcbiAgcmV0dXJuIGluZm8gPyBpbmZvLmRlc2NyaXB0aW9uKGFjdGlvbikgOiAnLS0nO1xufVxuXG5mdW5jdGlvbiBvblJlbmFtZUNsaWNrKGV2OiBFdmVudCkge1xuICBzaG93VGlsZU92ZXJsYXkoZXYsIFJlbmFtZUFjdGlvblBhY2thZ2UsIHtcbiAgICBuYW1lOiBwa2cuZ2xvYmFsLm5hbWUsXG4gICAgb25SZW5hbWU6IG5hbWUgPT4gKHBrZy5nbG9iYWwubmFtZSA9IG5hbWUpLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gb25FeGVjdXRlQ2xpY2soKSB7XG4gIHNob3dCdWZmZXIoYFhJVCBBQ1RfJHtwa2cuZ2xvYmFsLm5hbWUucmVwbGFjZSgnICcsICdfJyl9YCk7XG59XG5cbmZ1bmN0aW9uIG9uRXhwb3J0Q2xpY2soKSB7XG4gIGNvbnN0IGpzb24gPSBkZWVwVG9SYXcocGtnKTtcbiAgZG93bmxvYWRKc29uKGpzb24sIGAke3BrZy5nbG9iYWwubmFtZS5yZXBsYWNlKCcgJywgJ18nKX0tJHtEYXRlLm5vdygpfS5qc29uYCk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8SGVhZGVyIHYtbW9kZWw9XCJwa2cuZ2xvYmFsLm5hbWVcIiBlZGl0YWJsZSA6Y2xhc3M9XCIkc3R5bGUuaGVhZGVyXCIgLz5cbiAgPFNlY3Rpb25IZWFkZXI+e3sgdCgnYWN0Lmdyb3VwJykgfX08L1NlY3Rpb25IZWFkZXI+XG4gIDx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD57eyB0KCdhY3QudHlwZUxhYmVsJykgfX08L3RoPlxuICAgICAgICA8dGg+e3sgdCgnYWN0Lm5hbWUnKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdhY3QuY29udGVudCcpIH19PC90aD5cbiAgICAgICAgPHRoIC8+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5IHYtaWY9XCJwa2cuZ3JvdXBzLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQgY29sc3Bhbj1cIjRcIiA6Y2xhc3M9XCIkc3R5bGUuZW1wdHlSb3dcIj57eyB0KCdhY3Qubm9Hcm91cHMnKSB9fTwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gICAgPHRib2R5IHYtZWxzZT5cbiAgICAgIDx0ciB2LWZvcj1cImdyb3VwIGluIHBrZy5ncm91cHNcIiA6a2V5PVwib2JqZWN0SWQoZ3JvdXApXCI+XG4gICAgICAgIDx0ZD57eyBncm91cC50eXBlIH19PC90ZD5cbiAgICAgICAgPHRkPnt7IGdyb3VwLm5hbWUgfHwgJy0tJyB9fTwvdGQ+XG4gICAgICAgIDx0ZD57eyBnZXRNYXRlcmlhbEdyb3VwRGVzY3JpcHRpb24oZ3JvdXApIH19PC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuQnV0dG9uIGRhcmsgaW5saW5lIEBjbGljaz1cIm9uRWRpdE1hdGVyaWFsR3JvdXBDbGljaygkZXZlbnQsIGdyb3VwKVwiPlxuICAgICAgICAgICAge3sgdCgnYWN0LmVkaXQnKSB9fVxuICAgICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgICA8UHJ1bkJ1dHRvbiBkYXJrIGlubGluZSBAY2xpY2s9XCJvbkRlbGV0ZU1hdGVyaWFsR3JvdXBDbGljaygkZXZlbnQsIGdyb3VwKVwiPlxuICAgICAgICAgICAge3sgdCgnYWN0LmRlbGV0ZScpIH19XG4gICAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuICA8Zm9ybSA6Y2xhc3M9XCIkc3R5bGUuc2VjdGlvbkNvbW1hbmRzXCI+XG4gICAgPENvbW1hbmRzPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvbkFkZE1hdGVyaWFsR3JvdXBDbGlja1wiPnt7IHQoJ2FjdC5hZGQnKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgICA8L0NvbW1hbmRzPlxuICA8L2Zvcm0+XG4gIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ2FjdC5hY3Rpb24nKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgPHRhYmxlPlxuICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoPnt7IHQoJ2FjdC50eXBlTGFiZWwnKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdhY3QubmFtZScpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2FjdC5jb250ZW50JykgfX08L3RoPlxuICAgICAgICA8dGggLz5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHkgdi1pZj1cInBrZy5hY3Rpb25zLmxlbmd0aCA9PT0gMFwiPlxuICAgICAgPHRyPlxuICAgICAgICA8dGQgY29sc3Bhbj1cIjRcIiA6Y2xhc3M9XCIkc3R5bGUuZW1wdHlSb3dcIj57eyB0KCdhY3Qubm9BY3Rpb25zJykgfX08L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICAgIDx0Ym9keSB2LWVsc2U+XG4gICAgICA8dHIgdi1mb3I9XCJhY3Rpb24gaW4gcGtnLmFjdGlvbnNcIiA6a2V5PVwib2JqZWN0SWQoYWN0aW9uKVwiPlxuICAgICAgICA8dGQ+e3sgYWN0aW9uLnR5cGUgfX08L3RkPlxuICAgICAgICA8dGQ+e3sgYWN0aW9uLm5hbWUgfHwgJy0tJyB9fTwvdGQ+XG4gICAgICAgIDx0ZD57eyBnZXRBY3Rpb25EZXNjcmlwdGlvbihhY3Rpb24pIH19PC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuQnV0dG9uIGRhcmsgaW5saW5lIEBjbGljaz1cIm9uRWRpdEFjdGlvbkNsaWNrKCRldmVudCwgYWN0aW9uKVwiPlxuICAgICAgICAgICAge3sgdCgnYWN0LmVkaXQnKSB9fVxuICAgICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgICA8UHJ1bkJ1dHRvbiBkYXJrIGlubGluZSBAY2xpY2s9XCJvbkRlbGV0ZUFjdGlvbkNsaWNrKCRldmVudCwgYWN0aW9uKVwiPlxuICAgICAgICAgICAge3sgdCgnYWN0LmRlbGV0ZScpIH19XG4gICAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8L3RkPlxuICAgICAgPC90cj5cbiAgICA8L3Rib2R5PlxuICA8L3RhYmxlPlxuICA8Zm9ybSA6Y2xhc3M9XCIkc3R5bGUuc2VjdGlvbkNvbW1hbmRzXCI+XG4gICAgPENvbW1hbmRzPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvbkFkZEFjdGlvbkNsaWNrXCI+e3sgdCgnYWN0LmFkZCcpIH19PC9QcnVuQnV0dG9uPlxuICAgIDwvQ29tbWFuZHM+XG4gIDwvZm9ybT5cbiAgPFNlY3Rpb25IZWFkZXI+e3sgdCgnYWN0LmNvbW1hbmRzJykgfX08L1NlY3Rpb25IZWFkZXI+XG4gIDxmb3JtPlxuICAgIDxDb21tYW5kcyA6bGFiZWw9XCJ0KCdhY3QucmVuYW1lJylcIj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25SZW5hbWVDbGlja1wiPnt7IHQoJ2FjdC5yZW5hbWUnKS50b1VwcGVyQ2FzZSgpIH19PC9QcnVuQnV0dG9uPlxuICAgIDwvQ29tbWFuZHM+XG4gICAgPENvbW1hbmRzIDpsYWJlbD1cInQoJ2FjdC5leGVjdXRlJylcIj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25FeGVjdXRlQ2xpY2tcIj57eyB0KCdhY3QuZXhlY3V0ZScpLnRvVXBwZXJDYXNlKCkgfX08L1BydW5CdXR0b24+XG4gICAgPC9Db21tYW5kcz5cbiAgICA8Q29tbWFuZHMgOmxhYmVsPVwidCgnYWN0LmV4cG9ydCcpXCI+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cIm9uRXhwb3J0Q2xpY2tcIj57eyB0KCdhY3QuZXhwb3J0JykudG9VcHBlckNhc2UoKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgICA8L0NvbW1hbmRzPlxuICA8L2Zvcm0+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmhlYWRlciB7XG4gIG1hcmdpbi1sZWZ0OiA0cHg7XG59XG5cbi5lbXB0eVJvdyB7XG4gIHRleHQtYWxpZ246IGNlbnRlcjtcbn1cblxuLnNlY3Rpb25Db21tYW5kcyB7XG4gIG1hcmdpbi10b3A6IDAuNzVyZW07XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIkVkaXRNYXRlcmlhbEdyb3VwIiwiRWRpdEFjdGlvbiIsIl9jcmVhdGVWTm9kZSIsInBrZyIsIl9ub3JtYWxpemVDbGFzcyIsIiRzdHlsZSIsIl91bnJlZiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX29wZW5CbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX3RvRGlzcGxheVN0cmluZyIsIlBydW5CdXR0b24iLCJDb21tYW5kcyIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFvQkEsYUFBUyx3QkFBd0IsR0FBVTtBQUN6QyxZQUFNLFFBQW9DO0FBQUEsUUFDeEMsTUFBTTtBQUFBLFFBQ04sTUFBTTtBQUFBLE1BQUE7QUFFUixzQkFBZ0IsR0FBR0EsYUFBbUI7QUFBQSxRQUNwQyxLQUFLO0FBQUEsUUFDTDtBQUFBLFFBQ0EsUUFBUSxNQUFNLFFBQUEsSUFBSSxPQUFPLEtBQUssS0FBSztBQUFBLE1BQUEsQ0FDcEM7QUFBQSxJQUNIO0FBRUEsYUFBUyx5QkFBeUIsR0FBVSxPQUFtQztBQUM3RSxzQkFBZ0IsR0FBR0EsYUFBbUIsRUFBRSxNQUFBLENBQU87QUFBQSxJQUNqRDtBQUVBLGFBQVMsMkJBQTJCLEdBQVUsT0FBbUM7QUFDL0UsOEJBQXdCLEdBQUcsTUFBTSxtQkFBbUIsUUFBQSxJQUFJLFFBQVEsS0FBSyxHQUFHO0FBQUEsUUFDdEUsU0FBUyxFQUFFLDBCQUEwQixNQUFNLFFBQVEsSUFBSTtBQUFBLFFBQ3ZELGNBQWMsRUFBRSxZQUFZO0FBQUEsTUFBQSxD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
