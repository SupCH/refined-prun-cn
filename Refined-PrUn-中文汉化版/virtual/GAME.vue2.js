import { t } from './index13.js';
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
