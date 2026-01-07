import { t } from './index5.js';
import _sfc_main$5 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Tooltip.vue.js';
import _sfc_main$3 from './TextInput.vue.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$4 from './NumberInput.vue.js';
import _sfc_main$6 from './Commands.vue.js';
import { showConfirmationOverlay } from './tile-overlay.js';
import { userData, initialUserData } from './user-data.js';
import {
  exportUserData,
  downloadBackup,
  importUserData,
  saveUserData,
  restoreBackup,
  resetUserData,
} from './user-data-serializer.js';
import SelectInput from './SelectInput.vue.js';
import { objectId } from './object-id.js';
import { getUserDataBackups, deleteUserDataBackup } from './user-data-backup.js';
import { hhForXitSet, ddmmyyyy, hhmm } from './format.js';
import dayjs from './dayjs.min.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  withCtx,
  createTextVNode,
  createBlock,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'GAME',
  setup(__props) {
    const isDefault24 = computed(() => {
      return hhForXitSet.value(dayjs.duration(12, 'hours').asMilliseconds()) === '13';
    });
    const timeFormats = computed(() => {
      return [
        {
          label: isDefault24.value ? t('game.formats.default24') : t('game.formats.default12'),
          value: 'DEFAULT',
        },
        {
          label: t('game.formats.h24'),
          value: '24H',
        },
        {
          label: t('game.formats.h12'),
          value: '12H',
        },
      ];
    });
    const exchangeChartTypes = computed(() => [
      {
        label: t('game.formats.smooth'),
        value: 'SMOOTH',
      },
      {
        label: t('game.formats.aligned'),
        value: 'ALIGNED',
      },
      {
        label: t('game.formats.raw'),
        value: 'RAW',
      },
    ]);
    const currencySettings = computed(() => userData.settings.currency);
    const currencyPresets = computed(() => [
      {
        label: t('game.formats.default'),
        value: 'DEFAULT',
      },
      {
        label: '₳',
        value: 'AIC',
      },
      {
        label: '₡',
        value: 'CIS',
      },
      {
        label: 'ǂ',
        value: 'ICA',
      },
      {
        label: '₦',
        value: 'NCC',
      },
      {
        label: t('game.formats.custom'),
        value: 'CUSTOM',
      },
    ]);
    const currencyPosition = computed(() => [
      {
        label: t('game.formats.after'),
        value: 'AFTER',
      },
      {
        label: t('game.formats.before'),
        value: 'BEFORE',
      },
    ]);
    const currencySpacing = computed(() => [
      {
        label: t('game.formats.hasSpace'),
        value: 'HAS_SPACE',
      },
      {
        label: t('game.formats.noSpace'),
        value: 'NO_SPACE',
      },
    ]);
    const backups = computed(() => getUserDataBackups());
    function addSidebarButton() {
      userData.settings.sidebar.push(['SET', 'XIT SET']);
    }
    function deleteSidebarButton(index) {
      userData.settings.sidebar.splice(index, 1);
    }
    function confirmResetSidebar(ev) {
      showConfirmationOverlay(ev, () => {
        userData.settings.sidebar = structuredClone(initialUserData.settings.sidebar);
      });
    }
    function importUserDataAndReload() {
      importUserData(async () => {
        await saveUserData();
        window.location.reload();
      });
    }
    async function restoreBackupAndReload(ev, backup) {
      showConfirmationOverlay(
        ev,
        async () => {
          restoreBackup(backup);
          await saveUserData();
          window.location.reload();
        },
        {
          message:
            'Are you sure you want to restore this backup? This will overwrite your current data.',
        },
      );
    }
    function confirmDeleteBackup(ev, backup) {
      showConfirmationOverlay(ev, () => deleteUserDataBackup(backup));
    }
    function confirmResetAllData(ev) {
      showConfirmationOverlay(ev, async () => {
        resetUserData();
        await saveUserData();
        window.location.reload();
      });
    }
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
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.appearance')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$1,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('game.timeFormat'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(userData).settings.time,
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (unref(userData).settings.time = $event)),
                        options: unref(timeFormats),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('game.defaultChartType'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(userData).settings.defaultChartType,
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event =>
                            (unref(userData).settings.defaultChartType = $event)),
                        options: unref(exchangeChartTypes),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
            ]),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.currencySymbol')) + ' ',
                  1,
                ),
                createVNode(
                  _sfc_main$2,
                  {
                    class: normalizeClass(_ctx.$style.tooltip),
                    tooltip: ('t' in _ctx ? _ctx.t : unref(t))('game.currencyTooltip'),
                  },
                  null,
                  8,
                  ['class', 'tooltip'],
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$1,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('game.symbol'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(currencySettings).preset,
                        'onUpdate:modelValue':
                          _cache[2] ||
                          (_cache[2] = $event => (unref(currencySettings).preset = $event)),
                        options: unref(currencyPresets),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label'],
              ),
              unref(currencySettings).preset === 'CUSTOM'
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 0,
                      label: ('t' in _ctx ? _ctx.t : unref(t))('game.customSymbol'),
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _sfc_main$3,
                          {
                            modelValue: unref(currencySettings).custom,
                            'onUpdate:modelValue':
                              _cache[3] ||
                              (_cache[3] = $event => (unref(currencySettings).custom = $event)),
                          },
                          null,
                          8,
                          ['modelValue'],
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['label'],
                  ))
                : createCommentVNode('', true),
              unref(currencySettings).preset !== 'DEFAULT'
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 1,
                      label: ('t' in _ctx ? _ctx.t : unref(t))('game.position'),
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          SelectInput,
                          {
                            modelValue: unref(currencySettings).position,
                            'onUpdate:modelValue':
                              _cache[4] ||
                              (_cache[4] = $event => (unref(currencySettings).position = $event)),
                            options: unref(currencyPosition),
                          },
                          null,
                          8,
                          ['modelValue', 'options'],
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['label'],
                  ))
                : createCommentVNode('', true),
              unref(currencySettings).preset !== 'DEFAULT'
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 2,
                      label: ('t' in _ctx ? _ctx.t : unref(t))('game.spacing'),
                      tooltip: ('t' in _ctx ? _ctx.t : unref(t))('game.spacingTooltip'),
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          SelectInput,
                          {
                            modelValue: unref(currencySettings).spacing,
                            'onUpdate:modelValue':
                              _cache[5] ||
                              (_cache[5] = $event => (unref(currencySettings).spacing = $event)),
                            options: unref(currencySpacing),
                          },
                          null,
                          8,
                          ['modelValue', 'options'],
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['label', 'tooltip'],
                  ))
                : createCommentVNode('', true),
            ]),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.burnSettings')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$1,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('game.redLabel'),
                  tooltip: ('t' in _ctx ? _ctx.t : unref(t))('game.redTooltip'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$4,
                      {
                        modelValue: unref(userData).settings.burn.red,
                        'onUpdate:modelValue':
                          _cache[6] ||
                          (_cache[6] = $event => (unref(userData).settings.burn.red = $event)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label', 'tooltip'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('game.yellowLabel'),
                  tooltip: ('t' in _ctx ? _ctx.t : unref(t))('game.yellowTooltip'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$4,
                      {
                        modelValue: unref(userData).settings.burn.yellow,
                        'onUpdate:modelValue':
                          _cache[7] ||
                          (_cache[7] = $event => (unref(userData).settings.burn.yellow = $event)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label', 'tooltip'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  label: ('t' in _ctx ? _ctx.t : unref(t))('game.resupplyLabel'),
                  tooltip: ('t' in _ctx ? _ctx.t : unref(t))('game.resupplyTooltip'),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$4,
                      {
                        modelValue: unref(userData).settings.burn.resupply,
                        'onUpdate:modelValue':
                          _cache[8] ||
                          (_cache[8] = $event => (unref(userData).settings.burn.resupply = $event)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label', 'tooltip'],
              ),
            ]),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.sidebarButtons')) + ' ',
                  1,
                ),
                createVNode(
                  _sfc_main$2,
                  {
                    class: normalizeClass(_ctx.$style.tooltip),
                    tooltip: ('t' in _ctx ? _ctx.t : unref(t))('game.sidebarTooltip'),
                  },
                  null,
                  8,
                  ['class', 'tooltip'],
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(unref(userData).settings.sidebar, (button, i) => {
                  return (
                    openBlock(),
                    createBlock(
                      _sfc_main$1,
                      {
                        key: unref(objectId)(button),
                        label: ('t' in _ctx ? _ctx.t : unref(t))('game.buttonLabel', i + 1),
                      },
                      {
                        default: withCtx(() => [
                          createBaseVNode(
                            'div',
                            {
                              class: normalizeClass(_ctx.$style.sidebarInputPair),
                            },
                            [
                              createVNode(
                                _sfc_main$3,
                                {
                                  modelValue: button[0],
                                  'onUpdate:modelValue': $event => (button[0] = $event),
                                  class: normalizeClass(_ctx.$style.sidebarInput),
                                },
                                null,
                                8,
                                ['modelValue', 'onUpdate:modelValue', 'class'],
                              ),
                              createVNode(
                                _sfc_main$3,
                                {
                                  modelValue: button[1],
                                  'onUpdate:modelValue': $event => (button[1] = $event),
                                  class: normalizeClass(_ctx.$style.sidebarInput),
                                },
                                null,
                                8,
                                ['modelValue', 'onUpdate:modelValue', 'class'],
                              ),
                              createVNode(
                                _sfc_main$5,
                                {
                                  danger: '',
                                  onClick: $event => deleteSidebarButton(i),
                                },
                                {
                                  default: withCtx(() => [
                                    ...(_cache[9] || (_cache[9] = [createTextVNode('x', -1)])),
                                  ]),
                                  _: 2,
                                },
                                1032,
                                ['onClick'],
                              ),
                            ],
                            2,
                          ),
                        ]),
                        _: 2,
                      },
                      1032,
                      ['label'],
                    )
                  );
                }),
                128,
              )),
              createVNode(_sfc_main$6, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$5,
                    {
                      primary: '',
                      onClick: confirmResetSidebar,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.resetSidebar')),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$5,
                    {
                      primary: '',
                      onClick: addSidebarButton,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.addNew')),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.importExport')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(_sfc_main$6, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$5,
                    {
                      primary: '',
                      onClick: importUserDataAndReload,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.importData')),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$5,
                    {
                      primary: '',
                      onClick: unref(exportUserData),
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.exportData')),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['onClick'],
                  ),
                ]),
                _: 1,
              }),
            ]),
            unref(backups).length > 0
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    createVNode(SectionHeader, null, {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.backups')),
                          1,
                        ),
                      ]),
                      _: 1,
                    }),
                    createBaseVNode('form', null, [
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(unref(backups), backup => {
                          return (
                            openBlock(),
                            createBlock(
                              _sfc_main$6,
                              {
                                key: backup.timestamp,
                                label:
                                  unref(ddmmyyyy)(backup.timestamp) +
                                  ' ' +
                                  unref(hhmm)(backup.timestamp),
                              },
                              {
                                default: withCtx(() => [
                                  createVNode(
                                    _sfc_main$5,
                                    {
                                      primary: '',
                                      onClick: $event =>
                                        unref(downloadBackup)(backup.data, backup.timestamp),
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          toDisplayString(
                                            ('t' in _ctx ? _ctx.t : unref(t))('game.export'),
                                          ),
                                          1,
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['onClick'],
                                  ),
                                  createVNode(
                                    _sfc_main$5,
                                    {
                                      primary: '',
                                      onClick: $event =>
                                        restoreBackupAndReload($event, backup.data),
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          toDisplayString(
                                            ('t' in _ctx ? _ctx.t : unref(t))('game.restore'),
                                          ),
                                          1,
                                        ),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['onClick'],
                                  ),
                                  createVNode(
                                    _sfc_main$5,
                                    {
                                      danger: '',
                                      onClick: $event => confirmDeleteBackup($event, backup),
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(
                                          toDisplayString(
                                            ('t' in _ctx ? _ctx.t : unref(t))('game.delete'),
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
                                _: 2,
                              },
                              1032,
                              ['label'],
                            )
                          );
                        }),
                        128,
                      )),
                    ]),
                  ],
                  64,
                ))
              : createCommentVNode('', true),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.dangerZone')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(_sfc_main$6, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$5,
                    {
                      danger: '',
                      onClick: confirmResetAllData,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('game.resetAllData')),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiR0FNRS52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1NFVC9HQU1FLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgVG9vbHRpcCBmcm9tICdAc3JjL2NvbXBvbmVudHMvVG9vbHRpcC52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvTnVtYmVySW5wdXQudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCB7IHNob3dDb25maXJtYXRpb25PdmVybGF5IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3RpbGUtb3ZlcmxheSc7XG5pbXBvcnQgeyBpbml0aWFsVXNlckRhdGEsIHVzZXJEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEnO1xuaW1wb3J0IHtcbiAgZG93bmxvYWRCYWNrdXAsXG4gIGV4cG9ydFVzZXJEYXRhLFxuICBpbXBvcnRVc2VyRGF0YSxcbiAgcmVzZXRVc2VyRGF0YSxcbiAgcmVzdG9yZUJhY2t1cCxcbiAgc2F2ZVVzZXJEYXRhLFxufSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3N0b3JhZ2UvdXNlci1kYXRhLXNlcmlhbGl6ZXInO1xuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9TZWxlY3RJbnB1dC52dWUnO1xuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5pbXBvcnQge1xuICBkZWxldGVVc2VyRGF0YUJhY2t1cCxcbiAgZ2V0VXNlckRhdGFCYWNrdXBzLFxuICBVc2VyRGF0YUJhY2t1cCxcbn0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9zdG9yYWdlL3VzZXItZGF0YS1iYWNrdXAnO1xuaW1wb3J0IHsgZGRtbXl5eXksIGhoRm9yWGl0U2V0LCBoaG1tIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IGRheWpzIGZyb20gJ2RheWpzJztcblxuY29uc3QgaXNEZWZhdWx0MjQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBoaEZvclhpdFNldC52YWx1ZShkYXlqcy5kdXJhdGlvbigxMiwgJ2hvdXJzJykuYXNNaWxsaXNlY29uZHMoKSkgPT09ICcxMyc7XG59KTtcblxuY29uc3QgdGltZUZvcm1hdHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBbXG4gICAge1xuICAgICAgbGFiZWw6IGlzRGVmYXVsdDI0LnZhbHVlID8gdCgnZ2FtZS5mb3JtYXRzLmRlZmF1bHQyNCcpIDogdCgnZ2FtZS5mb3JtYXRzLmRlZmF1bHQxMicpLFxuICAgICAgdmFsdWU6ICdERUZBVUxUJyxcbiAgICB9LFxuICAgIHtcbiAgICAgIGxhYmVsOiB0KCdnYW1lLmZvcm1hdHMuaDI0JyksXG4gICAgICB2YWx1ZTogJzI0SCcsXG4gICAgfSxcbiAgICB7XG4gICAgICBsYWJlbDogdCgnZ2FtZS5mb3JtYXRzLmgxMicpLFxuICAgICAgdmFsdWU6ICcxMkgnLFxuICAgIH0sXG4gIF0gYXMgeyBsYWJlbDogc3RyaW5nOyB2YWx1ZTogVXNlckRhdGEuVGltZUZvcm1hdCB9W107XG59KTtcblxuY29uc3QgZXhjaGFuZ2VDaGFydFR5cGVzID0gY29tcHV0ZWQoKCkgPT4gW1xuICB7XG4gICAgbGFiZWw6IHQoJ2dhbWUuZm9ybWF0cy5zbW9vdGgnKSxcbiAgICB2YWx1ZTogJ1NNT09USCcsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogdCgnZ2FtZS5mb3JtYXRzLmFsaWduZWQnKSxcbiAgICB2YWx1ZTogJ0FMSUdORUQnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IHQoJ2dhbWUuZm9ybWF0cy5yYXcnKSxcbiAgICB2YWx1ZTogJ1JBVycsXG4gIH0sXG5dKSBhcyBDb21wdXRlZFJlZjx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBVc2VyRGF0YS5FeGNoYW5nZUNoYXJ0VHlwZSB9W10+O1xuXG5jb25zdCBjdXJyZW5jeVNldHRpbmdzID0gY29tcHV0ZWQoKCkgPT4gdXNlckRhdGEuc2V0dGluZ3MuY3VycmVuY3kpO1xuXG5jb25zdCBjdXJyZW5jeVByZXNldHMgPSBjb21wdXRlZCgoKSA9PiBbXG4gIHtcbiAgICBsYWJlbDogdCgnZ2FtZS5mb3JtYXRzLmRlZmF1bHQnKSxcbiAgICB2YWx1ZTogJ0RFRkFVTFQnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6ICfigrMnLFxuICAgIHZhbHVlOiAnQUlDJyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAn4oKhJyxcbiAgICB2YWx1ZTogJ0NJUycsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ8eCJyxcbiAgICB2YWx1ZTogJ0lDQScsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogJ+KCpicsXG4gICAgdmFsdWU6ICdOQ0MnLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IHQoJ2dhbWUuZm9ybWF0cy5jdXN0b20nKSxcbiAgICB2YWx1ZTogJ0NVU1RPTScsXG4gIH0sXG5dKSBhcyBDb21wdXRlZFJlZjx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBVc2VyRGF0YS5DdXJyZW5jeVByZXNldCB9W10+O1xuXG5jb25zdCBjdXJyZW5jeVBvc2l0aW9uID0gY29tcHV0ZWQoKCkgPT4gW1xuICB7XG4gICAgbGFiZWw6IHQoJ2dhbWUuZm9ybWF0cy5hZnRlcicpLFxuICAgIHZhbHVlOiAnQUZURVInLFxuICB9LFxuICB7XG4gICAgbGFiZWw6IHQoJ2dhbWUuZm9ybWF0cy5iZWZvcmUnKSxcbiAgICB2YWx1ZTogJ0JFRk9SRScsXG4gIH0sXG5dKSBhcyBDb21wdXRlZFJlZjx7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBVc2VyRGF0YS5DdXJyZW5jeVBvc2l0aW9uIH1bXT47XG5cbmNvbnN0IGN1cnJlbmN5U3BhY2luZyA9IGNvbXB1dGVkKCgpID0+IFtcbiAge1xuICAgIGxhYmVsOiB0KCdnYW1lLmZvcm1hdHMuaGFzU3BhY2UnKSxcbiAgICB2YWx1ZTogJ0hBU19TUEFDRScsXG4gIH0sXG4gIHtcbiAgICBsYWJlbDogdCgnZ2FtZS5mb3JtYXRzLm5vU3BhY2UnKSxcbiAgICB2YWx1ZTogJ05PX1NQQUNFJyxcbiAgfSxcbl0pIGFzIENvbXB1dGVkUmVmPHsgbGFiZWw6IHN0cmluZzsgdmFsdWU6IFVzZXJEYXRhLkN1cnJlbmN5U3BhY2luZyB9W10+O1xuXG5jb25zdCBiYWNrdXBzID0gY29tcHV0ZWQoKCkgPT4gZ2V0VXNlckRhdGFCYWNrdXBzKCkpO1xuXG5mdW5jdGlvbiBhZGRTaWRlYmFyQnV0dG9uKCkge1xuICB1c2VyRGF0YS5zZXR0aW5ncy5zaWRlYmFyLnB1c2goWydTRVQnLCAnWElUIFNFVCddKTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlU2lkZWJhckJ1dHRvbihpbmRleDogbnVtYmVyKSB7XG4gIHVzZXJEYXRhLnNldHRpbmdzLnNpZGViYXIuc3BsaWNlKGluZGV4LCAxKTtcbn1cblxuZnVuY3Rpb24gY29uZmlybVJlc2V0U2lkZWJhcihldjogRXZlbnQpIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoZXYsICgpID0+IHtcbiAgICB1c2VyRGF0YS5zZXR0aW5ncy5zaWRlYmFyID0gc3RydWN0dXJlZENsb25lKGluaXRpYWxVc2VyRGF0YS5zZXR0aW5ncy5zaWRlYmFyKTtcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGltcG9ydFVzZXJEYXRhQW5kUmVsb2FkKCkge1xuICBpbXBvcnRVc2VyRGF0YShhc3luYyAoKSA9PiB7XG4gICAgYXdhaXQgc2F2ZVVzZXJEYXRhKCk7XG4gICAgd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpO1xuICB9KTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcmVzdG9yZUJhY2t1cEFuZFJlbG9hZChldjogRXZlbnQsIGJhY2t1cDogVXNlckRhdGFCYWNrdXApIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoXG4gICAgZXYsXG4gICAgYXN5bmMgKCkgPT4ge1xuICAgICAgcmVzdG9yZUJhY2t1cChiYWNrdXApO1xuICAgICAgYXdhaXQgc2F2ZVVzZXJEYXRhKCk7XG4gICAgICB3aW5kb3cubG9jYXRpb24ucmVsb2FkKCk7XG4gICAgfSxcbiAgICB7XG4gICAgICBtZXNzYWdlOlxuICAgICAgICAnQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIHJlc3RvcmUgdGhpcyBiYWNrdXA/IFRoaXMgd2lsbCBvdmVyd3JpdGUgeW91ciBjdXJyZW50IGRhdGEuJyxcbiAgICB9LFxuICApO1xufVxuXG5mdW5jdGlvbiBjb25maXJtRGVsZXRlQmFja3VwKGV2OiBFdmVudCwgYmFja3VwOiBVc2VyRGF0YUJhY2t1cCkge1xuICBzaG93Q29uZmlybWF0aW9uT3ZlcmxheShldiwgKCkgPT4gZGVsZXRlVXNlckRhdGFCYWNrdXAoYmFja3VwKSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm1SZXNldEFsbERhdGEoZXY6IEV2ZW50KSB7XG4gIHNob3dDb25maXJtYXRpb25PdmVybGF5KGV2LCBhc3luYyAoKSA9PiB7XG4gICAgcmVzZXRVc2VyRGF0YSgpO1xuICAgIGF3YWl0IHNhdmVVc2VyRGF0YSgpO1xuICAgIHdpbmRvdy5sb2NhdGlvbi5yZWxvYWQoKTtcbiAgfSk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8U2VjdGlvbkhlYWRlcj57eyB0KCdnYW1lLmFwcGVhcmFuY2UnKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgPGZvcm0+XG4gICAgPEFjdGl2ZSA6bGFiZWw9XCJ0KCdnYW1lLnRpbWVGb3JtYXQnKVwiPlxuICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJ1c2VyRGF0YS5zZXR0aW5ncy50aW1lXCIgOm9wdGlvbnM9XCJ0aW1lRm9ybWF0c1wiIC8+XG4gICAgPC9BY3RpdmU+XG4gICAgPEFjdGl2ZSA6bGFiZWw9XCJ0KCdnYW1lLmRlZmF1bHRDaGFydFR5cGUnKVwiPlxuICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJ1c2VyRGF0YS5zZXR0aW5ncy5kZWZhdWx0Q2hhcnRUeXBlXCIgOm9wdGlvbnM9XCJleGNoYW5nZUNoYXJ0VHlwZXNcIiAvPlxuICAgIDwvQWN0aXZlPlxuICA8L2Zvcm0+XG4gIDxTZWN0aW9uSGVhZGVyPlxuICAgIHt7IHQoJ2dhbWUuY3VycmVuY3lTeW1ib2wnKSB9fVxuICAgIDxUb29sdGlwIDpjbGFzcz1cIiRzdHlsZS50b29sdGlwXCIgOnRvb2x0aXA9XCJ0KCdnYW1lLmN1cnJlbmN5VG9vbHRpcCcpXCIgLz5cbiAgPC9TZWN0aW9uSGVhZGVyPlxuICA8Zm9ybT5cbiAgICA8QWN0aXZlIDpsYWJlbD1cInQoJ2dhbWUuc3ltYm9sJylcIj5cbiAgICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwiY3VycmVuY3lTZXR0aW5ncy5wcmVzZXRcIiA6b3B0aW9ucz1cImN1cnJlbmN5UHJlc2V0c1wiIC8+XG4gICAgPC9BY3RpdmU+XG4gICAgPEFjdGl2ZSB2LWlmPVwiY3VycmVuY3lTZXR0aW5ncy5wcmVzZXQgPT09ICdDVVNUT00nXCIgOmxhYmVsPVwidCgnZ2FtZS5jdXN0b21TeW1ib2wnKVwiPlxuICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwiY3VycmVuY3lTZXR0aW5ncy5jdXN0b21cIiAvPlxuICAgIDwvQWN0aXZlPlxuICAgIDxBY3RpdmUgdi1pZj1cImN1cnJlbmN5U2V0dGluZ3MucHJlc2V0ICE9PSAnREVGQVVMVCdcIiA6bGFiZWw9XCJ0KCdnYW1lLnBvc2l0aW9uJylcIj5cbiAgICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwiY3VycmVuY3lTZXR0aW5ncy5wb3NpdGlvblwiIDpvcHRpb25zPVwiY3VycmVuY3lQb3NpdGlvblwiIC8+XG4gICAgPC9BY3RpdmU+XG4gICAgPEFjdGl2ZVxuICAgICAgdi1pZj1cImN1cnJlbmN5U2V0dGluZ3MucHJlc2V0ICE9PSAnREVGQVVMVCdcIlxuICAgICAgOmxhYmVsPVwidCgnZ2FtZS5zcGFjaW5nJylcIlxuICAgICAgOnRvb2x0aXA9XCJ0KCdnYW1lLnNwYWNpbmdUb29sdGlwJylcIj5cbiAgICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwiY3VycmVuY3lTZXR0aW5ncy5zcGFjaW5nXCIgOm9wdGlvbnM9XCJjdXJyZW5jeVNwYWNpbmdcIiAvPlxuICAgIDwvQWN0aXZlPlxuICA8L2Zvcm0+XG4gIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ2dhbWUuYnVyblNldHRpbmdzJykgfX08L1NlY3Rpb25IZWFkZXI+XG4gIDxmb3JtPlxuICAgIDxBY3RpdmUgOmxhYmVsPVwidCgnZ2FtZS5yZWRMYWJlbCcpXCIgOnRvb2x0aXA9XCJ0KCdnYW1lLnJlZFRvb2x0aXAnKVwiPlxuICAgICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJ1c2VyRGF0YS5zZXR0aW5ncy5idXJuLnJlZFwiIC8+XG4gICAgPC9BY3RpdmU+XG4gICAgPEFjdGl2ZSA6bGFiZWw9XCJ0KCdnYW1lLnllbGxvd0xhYmVsJylcIiA6dG9vbHRpcD1cInQoJ2dhbWUueWVsbG93VG9vbHRpcCcpXCI+XG4gICAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cInVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ueWVsbG93XCIgLz5cbiAgICA8L0FjdGl2ZT5cbiAgICA8QWN0aXZlIDpsYWJlbD1cInQoJ2dhbWUucmVzdXBwbHlMYWJlbCcpXCIgOnRvb2x0aXA9XCJ0KCdnYW1lLnJlc3VwcGx5VG9vbHRpcCcpXCI+XG4gICAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cInVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ucmVzdXBwbHlcIiAvPlxuICAgIDwvQWN0aXZlPlxuICA8L2Zvcm0+XG4gIDxTZWN0aW9uSGVhZGVyPlxuICAgIHt7IHQoJ2dhbWUuc2lkZWJhckJ1dHRvbnMnKSB9fVxuICAgIDxUb29sdGlwIDpjbGFzcz1cIiRzdHlsZS50b29sdGlwXCIgOnRvb2x0aXA9XCJ0KCdnYW1lLnNpZGViYXJUb29sdGlwJylcIiAvPlxuICA8L1NlY3Rpb25IZWFkZXI+XG4gIDxmb3JtPlxuICAgIDxBY3RpdmVcbiAgICAgIHYtZm9yPVwiKGJ1dHRvbiwgaSkgaW4gdXNlckRhdGEuc2V0dGluZ3Muc2lkZWJhclwiXG4gICAgICA6a2V5PVwib2JqZWN0SWQoYnV0dG9uKVwiXG4gICAgICA6bGFiZWw9XCJ0KCdnYW1lLmJ1dHRvbkxhYmVsJywgaSArIDEpXCI+XG4gICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5zaWRlYmFySW5wdXRQYWlyXCI+XG4gICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cImJ1dHRvblswXVwiIDpjbGFzcz1cIiRzdHlsZS5zaWRlYmFySW5wdXRcIiAvPlxuICAgICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJidXR0b25bMV1cIiA6Y2xhc3M9XCIkc3R5bGUuc2lkZWJhcklucHV0XCIgLz5cbiAgICAgICAgPFBydW5CdXR0b24gZGFuZ2VyIEBjbGljaz1cImRlbGV0ZVNpZGViYXJCdXR0b24oaSlcIj54PC9QcnVuQnV0dG9uPlxuICAgICAgPC9kaXY+XG4gICAgPC9BY3RpdmU+XG4gICAgPENvbW1hbmRzPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJjb25maXJtUmVzZXRTaWRlYmFyXCI+e3sgdCgnZ2FtZS5yZXNldFNpZGViYXInKSB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwiYWRkU2lkZWJhckJ1dHRvblwiPnt7IHQoJ2dhbWUuYWRkTmV3JykgfX08L1BydW5CdXR0b24+XG4gICAgPC9Db21tYW5kcz5cbiAgPC9mb3JtPlxuICA8U2VjdGlvbkhlYWRlcj57eyB0KCdnYW1lLmltcG9ydEV4cG9ydCcpIH19PC9TZWN0aW9uSGVhZGVyPlxuICA8Zm9ybT5cbiAgICA8Q29tbWFuZHM+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImltcG9ydFVzZXJEYXRhQW5kUmVsb2FkXCI+e3sgdCgnZ2FtZS5pbXBvcnREYXRhJykgfX08L1BydW5CdXR0b24+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImV4cG9ydFVzZXJEYXRhXCI+e3sgdCgnZ2FtZS5leHBvcnREYXRhJykgfX08L1BydW5CdXR0b24+XG4gICAgPC9Db21tYW5kcz5cbiAgPC9mb3JtPlxuICA8dGVtcGxhdGUgdi1pZj1cImJhY2t1cHMubGVuZ3RoID4gMFwiPlxuICAgIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ2dhbWUuYmFja3VwcycpIH19PC9TZWN0aW9uSGVhZGVyPlxuICAgIDxmb3JtPlxuICAgICAgPENvbW1hbmRzXG4gICAgICAgIHYtZm9yPVwiYmFja3VwIGluIGJhY2t1cHNcIlxuICAgICAgICA6a2V5PVwiYmFja3VwLnRpbWVzdGFtcFwiXG4gICAgICAgIDpsYWJlbD1cImRkbW15eXl5KGJhY2t1cC50aW1lc3RhbXApICsgJyAnICsgaGhtbShiYWNrdXAudGltZXN0YW1wKVwiPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cImRvd25sb2FkQmFja3VwKGJhY2t1cC5kYXRhLCBiYWNrdXAudGltZXN0YW1wKVwiPlxuICAgICAgICAgIHt7IHQoJ2dhbWUuZXhwb3J0JykgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cInJlc3RvcmVCYWNrdXBBbmRSZWxvYWQoJGV2ZW50LCBiYWNrdXAuZGF0YSlcIj5cbiAgICAgICAgICB7eyB0KCdnYW1lLnJlc3RvcmUnKSB9fVxuICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICAgIDxQcnVuQnV0dG9uIGRhbmdlciBAY2xpY2s9XCJjb25maXJtRGVsZXRlQmFja3VwKCRldmVudCwgYmFja3VwKVwiPnt7XG4gICAgICAgICAgdCgnZ2FtZS5kZWxldGUnKVxuICAgICAgICB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvQ29tbWFuZHM+XG4gICAgPC9mb3JtPlxuICA8L3RlbXBsYXRlPlxuICA8U2VjdGlvbkhlYWRlcj57eyB0KCdnYW1lLmRhbmdlclpvbmUnKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgPGZvcm0+XG4gICAgPENvbW1hbmRzPlxuICAgICAgPFBydW5CdXR0b24gZGFuZ2VyIEBjbGljaz1cImNvbmZpcm1SZXNldEFsbERhdGFcIj57eyB0KCdnYW1lLnJlc2V0QWxsRGF0YScpIH19PC9QcnVuQnV0dG9uPlxuICAgIDwvQ29tbWFuZHM+XG4gIDwvZm9ybT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4udG9vbHRpcCB7XG4gIGZsb2F0OiByZXZlcnQ7XG4gIGZvbnQtc2l6ZTogMTJweDtcbiAgbWFyZ2luLXRvcDogLTRweDtcbn1cblxuLnNpZGViYXJJbnB1dFBhaXIge1xuICBkaXNwbGF5OiBmbGV4O1xuICBqdXN0aWZ5LWNvbnRlbnQ6IGZsZXgtZW5kO1xuICBjb2x1bW4tZ2FwOiAxMHB4O1xufVxuXG4uc2lkZWJhcklucHV0IHtcbiAgd2lkdGg6IDQwJTtcbn1cblxuLnNpZGViYXJJbnB1dCBpbnB1dCB7XG4gIHdpZHRoOiAxMDAlO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9jcmVhdGVWTm9kZSIsIkFjdGl2ZSIsIl91bnJlZiIsIlRvb2x0aXAiLCJfbm9ybWFsaXplQ2xhc3MiLCJUZXh0SW5wdXQiLCJOdW1iZXJJbnB1dCIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiUHJ1bkJ1dHRvbiIsIkNv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
