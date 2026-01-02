import { withModifiers } from './runtime-dom.esm-bundler.js';
import _sfc_main$2 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$1 from './NumberInput.vue.js';
import _sfc_main$3 from './PrunButton.vue.js';
import { userData } from './user-data.js';
import {
  getShipStorages,
  serializeShipStorage,
  createQuickPurchasePackage,
  addAndNavigateToPackage,
} from './quick-purchase-utils.js';
import { materialsStore } from './materials.js';
import { fixed0 } from './format.js';
import { showBuffer } from './buffers.js';
import dayjs from './dayjs.min.js';
import { t } from './index13.js';
import {
  defineComponent,
  onMounted,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
  withCtx,
  Fragment,
  renderList,
  createBlock,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = ['onClick'];
const _hoisted_2 = ['checked'];
const _hoisted_3 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'QuickPurchaseDialog',
  props: {
    materials: {},
    packageNamePrefix: {},
    rawBurnData: {},
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
    const selectedExchange = ref('UNIVERSE');
    const selectedShip = ref(void 0);
    const shipStorages = ref([]);
    const selectedSites = ref([]);
    const resupplyDays = ref(userData.settings.burn.resupply);
    const consumableCategories = [
      'food and luxury consumables',
      'consumables (basic)',
      'medical supplies',
      'ship parts',
      'ship engines',
      'ship shields',
    ];
    onMounted(async () => {
      shipStorages.value = await getShipStorages();
      if (shipStorages.value.length > 0) {
        selectedShip.value = shipStorages.value[0].addressableId;
      }
      if (props.rawBurnData) {
        selectedSites.value = props.rawBurnData
          .filter(burn => burn.naturalId !== '')
          .map(burn => burn.naturalId);
      }
    });
    const computedMaterials = computed(() => {
      if (props.rawBurnData) {
        const materials = {};
        for (const burn of props.rawBurnData) {
          if (burn.naturalId === '' || !selectedSites.value.includes(burn.naturalId)) continue;
          for (const [ticker, burnData] of Object.entries(burn.burn)) {
            if (burnData.dailyAmount >= 0) continue;
            const need = Math.max(
              0,
              resupplyDays.value * -burnData.dailyAmount - burnData.inventory,
            );
            if (need > 0) {
              materials[ticker] = (materials[ticker] || 0) + need;
            }
          }
        }
        return materials;
      }
      return props.materials || {};
    });
    const shipOptions = computed(() =>
      shipStorages.value.map(ship => ({
        value: ship.addressableId,
        label: serializeShipStorage(ship),
      })),
    );
    const materialList = computed(() => {
      const allMaterials = Object.entries(computedMaterials.value)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([ticker, amount]) => {
          const material = materialsStore.getByTicker(ticker);
          return {
            ticker,
            name: material?.name || ticker,
            amount,
            category: material?.category || '',
          };
        });
      const consumables = allMaterials.filter(m =>
        consumableCategories.some(cat => m.category.toLowerCase().includes(cat)),
      );
      const rawMaterials = allMaterials.filter(
        m => !consumableCategories.some(cat => m.category.toLowerCase().includes(cat)),
      );
      return { consumables, rawMaterials, all: allMaterials };
    });
    function toggleSite(naturalId) {
      const index = selectedSites.value.indexOf(naturalId);
      if (index > -1) {
        selectedSites.value.splice(index, 1);
      } else {
        selectedSites.value.push(naturalId);
      }
    }
    function onConfirm() {
      if (!selectedShip.value) {
        return;
      }
      const shipStorage = shipStorages.value.find(s => s.addressableId === selectedShip.value);
      if (!shipStorage) {
        return;
      }
      const timestamp = dayjs().format('YYYY-MM-DD_HHmm');
      const safePrefix = props.packageNamePrefix.replace(/[^a-zA-Z0-9]/g, '_');
      const packageName = `${safePrefix}_${timestamp}`;
      const pkg = createQuickPurchasePackage(
        packageName,
        computedMaterials.value,
        selectedExchange.value,
        shipStorage,
      );
      const pkgName = addAndNavigateToPackage(pkg);
      showBuffer(`XIT ACT_EDIT_${pkgName}`);
      emit('close');
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
            createBaseVNode('h2', null, toDisplayString(unref(t)('quickPurchase.title')), 1),
            _ctx.rawBurnData && _ctx.rawBurnData.length > 0
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 0,
                    class: normalizeClass(_ctx.$style.section),
                  },
                  [
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(_ctx.$style.flexRow),
                      },
                      [
                        createVNode(
                          _sfc_main$2,
                          {
                            label: unref(t)('quickPurchase.resupplyDays'),
                          },
                          {
                            default: withCtx(() => [
                              createVNode(
                                _sfc_main$1,
                                {
                                  modelValue: unref(resupplyDays),
                                  'onUpdate:modelValue':
                                    _cache[0] ||
                                    (_cache[0] = $event =>
                                      isRef(resupplyDays) ? (resupplyDays.value = $event) : null),
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
                        ),
                      ],
                      2,
                    ),
                    createBaseVNode(
                      'h3',
                      null,
                      toDisplayString(unref(t)('quickPurchase.selectSites')),
                      1,
                    ),
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(_ctx.$style.siteGrid),
                      },
                      [
                        (openBlock(true),
                        createElementBlock(
                          Fragment,
                          null,
                          renderList(
                            _ctx.rawBurnData.filter(s => s.naturalId !== ''),
                            site => {
                              return (
                                openBlock(),
                                createElementBlock(
                                  'div',
                                  {
                                    key: site.naturalId,
                                    class: normalizeClass(_ctx.$style.siteItem),
                                    onClick: $event => toggleSite(site.naturalId),
                                  },
                                  [
                                    createBaseVNode(
                                      'input',
                                      {
                                        type: 'checkbox',
                                        checked: unref(selectedSites).includes(site.naturalId),
                                        onClick:
                                          _cache[1] ||
                                          (_cache[1] = withModifiers(() => {}, ['stop'])),
                                      },
                                      null,
                                      8,
                                      _hoisted_2,
                                    ),
                                    createBaseVNode(
                                      'span',
                                      null,
                                      toDisplayString(site.planetName) +
                                        ' (' +
                                        toDisplayString(site.naturalId) +
                                        ')',
                                      1,
                                    ),
                                  ],
                                  10,
                                  _hoisted_1,
                                )
                              );
                            },
                          ),
                          128,
                        )),
                      ],
                      2,
                    ),
                  ],
                  2,
                ))
              : createCommentVNode('', true),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.section),
              },
              [
                createBaseVNode(
                  'h3',
                  null,
                  toDisplayString(unref(t)('quickPurchase.materialList')),
                  1,
                ),
                unref(materialList).consumables.length > 0
                  ? (openBlock(),
                    createElementBlock('div', _hoisted_3, [
                      createBaseVNode(
                        'h4',
                        {
                          class: normalizeClass(_ctx.$style.categoryTitle),
                        },
                        toDisplayString(unref(t)('quickPurchase.consumables')),
                        3,
                      ),
                      createBaseVNode(
                        'div',
                        {
                          class: normalizeClass(_ctx.$style.scrollTable),
                        },
                        [
                          createBaseVNode(
                            'table',
                            {
                              class: normalizeClass(_ctx.$style.materialTable),
                            },
                            [
                              createBaseVNode('thead', null, [
                                createBaseVNode('tr', null, [
                                  createBaseVNode(
                                    'th',
                                    null,
                                    toDisplayString(unref(t)('quickPurchase.material')),
                                    1,
                                  ),
                                  createBaseVNode(
                                    'th',
                                    null,
                                    toDisplayString(unref(t)('quickPurchase.amount')),
                                    1,
                                  ),
                                ]),
                              ]),
                              createBaseVNode('tbody', null, [
                                (openBlock(true),
                                createElementBlock(
                                  Fragment,
                                  null,
                                  renderList(unref(materialList).consumables, item => {
                                    return (
                                      openBlock(),
                                      createElementBlock(
                                        'tr',
                                        {
                                          key: item.ticker,
                                        },
                                        [
                                          createBaseVNode(
                                            'td',
                                            null,
                                            toDisplayString(item.ticker),
                                            1,
                                          ),
                                          createBaseVNode(
                                            'td',
                                            null,
                                            toDisplayString(unref(fixed0)(item.amount)),
                                            1,
                                          ),
                                        ],
                                      )
                                    );
                                  }),
                                  128,
                                )),
                              ]),
                            ],
                            2,
                          ),
                        ],
                        2,
                      ),
                    ]))
                  : createCommentVNode('', true),
                unref(materialList).rawMaterials.length > 0
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: 1,
                        class: normalizeClass(_ctx.$style.rawMaterialsSection),
                      },
                      [
                        createBaseVNode(
                          'h4',
                          {
                            class: normalizeClass(_ctx.$style.categoryTitle),
                          },
                          toDisplayString(unref(t)('quickPurchase.rawMaterials')),
                          3,
                        ),
                        createBaseVNode(
                          'div',
                          {
                            class: normalizeClass(_ctx.$style.scrollTable),
                          },
                          [
                            createBaseVNode(
                              'table',
                              {
                                class: normalizeClass(_ctx.$style.materialTable),
                              },
                              [
                                createBaseVNode('thead', null, [
                                  createBaseVNode('tr', null, [
                                    createBaseVNode(
                                      'th',
                                      null,
                                      toDisplayString(unref(t)('quickPurchase.material')),
                                      1,
                                    ),
                                    createBaseVNode(
                                      'th',
                                      null,
                                      toDisplayString(unref(t)('quickPurchase.amount')),
                                      1,
                                    ),
                                  ]),
                                ]),
                                createBaseVNode('tbody', null, [
                                  (openBlock(true),
                                  createElementBlock(
                                    Fragment,
                                    null,
                                    renderList(unref(materialList).rawMaterials, item => {
                                      return (
                                        openBlock(),
                                        createElementBlock(
                                          'tr',
                                          {
                                            key: item.ticker,
                                          },
                                          [
                                            createBaseVNode(
                                              'td',
                                              null,
                                              toDisplayString(item.ticker),
                                              1,
                                            ),
                                            createBaseVNode(
                                              'td',
                                              null,
                                              toDisplayString(unref(fixed0)(item.amount)),
                                              1,
                                            ),
                                          ],
                                        )
                                      );
                                    }),
                                    128,
                                  )),
                                ]),
                              ],
                              2,
                            ),
                          ],
                          2,
                        ),
                      ],
                      2,
                    ))
                  : createCommentVNode('', true),
                unref(materialList).all.length === 0
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: 2,
                        class: normalizeClass(_ctx.$style.empty),
                      },
                      toDisplayString(unref(t)('quickPurchase.noMaterials')),
                      3,
                    ))
                  : createCommentVNode('', true),
              ],
              2,
            ),
            createBaseVNode(
              'form',
              {
                class: normalizeClass(_ctx.$style.form),
              },
              [
                createVNode(
                  _sfc_main$2,
                  {
                    label: unref(t)('quickPurchase.selectExchange'),
                  },
                  {
                    default: withCtx(() => [
                      createVNode(
                        SelectInput,
                        {
                          modelValue: unref(selectedExchange),
                          'onUpdate:modelValue':
                            _cache[2] ||
                            (_cache[2] = $event =>
                              isRef(selectedExchange) ? (selectedExchange.value = $event) : null),
                          options: exchanges,
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
                ),
                createVNode(
                  _sfc_main$2,
                  {
                    label: unref(t)('quickPurchase.selectShip'),
                  },
                  {
                    default: withCtx(() => [
                      unref(shipOptions).length > 0
                        ? (openBlock(),
                          createBlock(
                            SelectInput,
                            {
                              key: 0,
                              modelValue: unref(selectedShip),
                              'onUpdate:modelValue':
                                _cache[3] ||
                                (_cache[3] = $event =>
                                  isRef(selectedShip) ? (selectedShip.value = $event) : null),
                              options: unref(shipOptions),
                            },
                            null,
                            8,
                            ['modelValue', 'options'],
                          ))
                        : (openBlock(),
                          createElementBlock(
                            'div',
                            {
                              key: 1,
                              class: normalizeClass(_ctx.$style.error),
                            },
                            toDisplayString(unref(t)('quickPurchase.noShips')),
                            3,
                          )),
                    ]),
                    _: 1,
                  },
                  8,
                  ['label'],
                ),
              ],
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.buttons),
              },
              [
                createVNode(
                  _sfc_main$3,
                  {
                    primary: '',
                    disabled: !unref(selectedShip) || unref(materialList).all.length === 0,
                    onClick: onConfirm,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)('quickPurchase.confirm')), 1),
                    ]),
                    _: 1,
                  },
                  8,
                  ['disabled'],
                ),
                createVNode(
                  _sfc_main$3,
                  {
                    onClick: _cache[4] || (_cache[4] = $event => emit('close')),
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(toDisplayString(unref(t)('quickPurchase.cancel')), 1),
                    ]),
                    _: 1,
                  },
                ),
              ],
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
