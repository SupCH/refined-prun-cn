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
  createPriceFetchPackage,
} from './quick-purchase-utils.js';
import { materialsStore } from './materials.js';
import { materialCategoriesStore } from './material-categories.js';
import { cxobStore } from './cxob.js';
import { fixed0, fixed02 } from './format.js';
import { showBuffer } from './buffers.js';
import dayjs from './dayjs.min.js';
import { t } from './index5.js';
import {
  defineComponent,
  onMounted,
  computed,
  watch,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
  withCtx,
  Fragment,
  renderList,
  createTextVNode,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = ['onClick'];
const _hoisted_2 = ['checked'];
const _hoisted_3 = { key: 0 };
const _hoisted_4 = ['onClick'];
const _hoisted_5 = ['checked', 'onClick'];
const _hoisted_6 = { key: 0 };
const _hoisted_7 = ['onClick'];
const _hoisted_8 = ['onClick'];
const _hoisted_9 = ['checked', 'onClick'];
const _hoisted_10 = { key: 0 };
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
    const selectedExchange = ref('AI1');
    const selectedShip = ref(void 0);
    const shipStorages = ref([]);
    const selectedSites = ref([]);
    const resupplyDays = ref(userData.settings.burn.resupply);
    const selectedMaterials = ref(/* @__PURE__ */ new Set());
    const consumableCategories = [
      'food',
      'beverage',
      'drink',
      'luxury',
      'consumable',
      'medical',
      'apparel',
      'clothing',
      'wear',
      'textile',
      'provision',
      'workforce',
      'overall',
      'ship part',
      'ship engine',
      'ship shield',
      'fuel',
    ];
    onMounted(async () => {
      shipStorages.value = await getShipStorages();
      selectedShip.value = 'local';
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
    watch(
      computedMaterials,
      newMaterials => {
        Object.keys(newMaterials).forEach(ticker => selectedMaterials.value.add(ticker));
      },
      { immediate: true },
    );
    const shipOptions = computed(() => {
      const options = shipStorages.value.map(ship => ({
        value: ship.addressableId,
        label: serializeShipStorage(ship),
      }));
      options.unshift({
        value: 'local',
        label: t('quickPurchase.localWarehouse'),
      });
      return options;
    });
    const materialList = computed(() => {
      const allMaterials = Object.entries(computedMaterials.value)
        .sort((a, b) => a[0].localeCompare(b[0]))
        .map(([ticker, amount]) => {
          const material = materialsStore.getByTicker(ticker);
          const cxTicker = `${ticker}.${selectedExchange.value}`;
          const orderBook = cxobStore.getByTicker(cxTicker);
          let unitPrice = void 0;
          if (orderBook && orderBook.sellingOrders.length > 0) {
            const sortedOrders = orderBook.sellingOrders
              .slice()
              .sort((a, b) => a.limit.amount - b.limit.amount);
            unitPrice = sortedOrders[0]?.limit.amount;
          }
          return {
            ticker,
            name: material?.name || ticker,
            amount,
            category: materialCategoriesStore.getById(material?.category)?.name || '',
            unitPrice,
            totalPrice: unitPrice ? unitPrice * amount : void 0,
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
    function toggleMaterial(ticker) {
      if (selectedMaterials.value.has(ticker)) {
        selectedMaterials.value.delete(ticker);
      } else {
        selectedMaterials.value.add(ticker);
      }
    }
    const isAllConsumablesSelected = computed(() => {
      const consumables = materialList.value.consumables;
      return (
        consumables.length > 0 && consumables.every(m => selectedMaterials.value.has(m.ticker))
      );
    });
    function toggleAllConsumables() {
      if (isAllConsumablesSelected.value) {
        materialList.value.consumables.forEach(m => selectedMaterials.value.delete(m.ticker));
      } else {
        materialList.value.consumables.forEach(m => selectedMaterials.value.add(m.ticker));
      }
    }
    const isAllRawSelected = computed(() => {
      const raw = materialList.value.rawMaterials;
      return raw.length > 0 && raw.every(m => selectedMaterials.value.has(m.ticker));
    });
    function toggleAllRawMaterials() {
      if (isAllRawSelected.value) {
        materialList.value.rawMaterials.forEach(m => selectedMaterials.value.delete(m.ticker));
      } else {
        materialList.value.rawMaterials.forEach(m => selectedMaterials.value.add(m.ticker));
      }
    }
    function clearAllSelections() {
      selectedMaterials.value.clear();
    }
    const totalEstimatedCost = computed(() => {
      let total = 0;
      let hasAllPrices = true;
      for (const item of materialList.value.all) {
        if (selectedMaterials.value.has(item.ticker)) {
          if (item.totalPrice) {
            total += item.totalPrice;
          } else {
            hasAllPrices = false;
          }
        }
      }
      return { total, hasAllPrices };
    });
    function onConfirm() {
      if (!selectedShip.value) {
        return;
      }
      let shipStorage = void 0;
      if (selectedShip.value !== 'local') {
        shipStorage = shipStorages.value.find(s => s.addressableId === selectedShip.value);
        if (!shipStorage) {
          return;
        }
      }
      if (selectedMaterials.value.size === 0) {
        alert(t('quickPurchase.noMaterialsSelected'));
        return;
      }
      const filteredMaterials = {};
      for (const [ticker, amount] of Object.entries(computedMaterials.value)) {
        if (selectedMaterials.value.has(ticker)) {
          filteredMaterials[ticker] = amount;
        }
      }
      const timestamp = dayjs().format('YYYY-MM-DD HHmm');
      const packageName = `${props.packageNamePrefix} ${timestamp}`;
      const pkg = createQuickPurchasePackage(
        packageName,
        filteredMaterials,
        selectedExchange.value,
        shipStorage,
      );
      const pkgName = addAndNavigateToPackage(pkg);
      showBuffer(`XIT ACT_EDIT_${pkgName.split(' ').join('_')}`);
      emit('close');
    }
    function openPrice(ticker) {
      showBuffer(`CXPO ${ticker}.${selectedExchange.value}`);
    }
    function onCreatePriceFetch() {
      const tickers = [];
      for (const item of materialList.value.all) {
        if (selectedMaterials.value.has(item.ticker)) {
          tickers.push(item.ticker);
        }
      }
      if (tickers.length === 0) {
        alert(t('quickPurchase.noMaterialsSelected'));
        return;
      }
      const timestamp = dayjs().format('YYYY-MM-DD HHmm');
      const packageName = `FETCH ${selectedExchange.value} ${timestamp}`;
      const pkg = createPriceFetchPackage(packageName, tickers, selectedExchange.value);
      const pkgName = addAndNavigateToPackage(pkg);
      showBuffer(`XIT ACT_EDIT_${pkgName.split(' ').join('_')}`);
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
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass(_ctx.$style.selectionButtons),
                  },
                  [
                    createVNode(
                      _sfc_main$3,
                      {
                        primary: !unref(isAllConsumablesSelected),
                        danger: unref(isAllConsumablesSelected),
                        onClick: toggleAllConsumables,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(
                              unref(isAllConsumablesSelected)
                                ? unref(t)('quickPurchase.deselectAllConsumables')
                                : unref(t)('quickPurchase.selectAllConsumables'),
                            ),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['primary', 'danger'],
                    ),
                    createVNode(
                      _sfc_main$3,
                      {
                        primary: !unref(isAllRawSelected),
                        danger: unref(isAllRawSelected),
                        onClick: toggleAllRawMaterials,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(
                              unref(isAllRawSelected)
                                ? unref(t)('quickPurchase.deselectAllRawMaterials')
                                : unref(t)('quickPurchase.selectAllRawMaterials'),
                            ),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['primary', 'danger'],
                    ),
                    createVNode(
                      _sfc_main$3,
                      {
                        dark: '',
                        onClick: clearAllSelections,
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(unref(t)('quickPurchase.clearSelections')),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                    ),
                    createBaseVNode(
                      'span',
                      {
                        class: normalizeClass(_ctx.$style.selectedCount),
                      },
                      toDisplayString(unref(t)('quickPurchase.selected')) +
                        ': ' +
                        toDisplayString(unref(selectedMaterials).size),
                      3,
                    ),
                  ],
                  2,
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
                                  _cache[5] ||
                                    (_cache[5] = createBaseVNode(
                                      'th',
                                      { style: { width: '40px' } },
                                      null,
                                      -1,
                                    )),
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
                                  createBaseVNode(
                                    'th',
                                    null,
                                    toDisplayString(unref(t)('quickPurchase.unitPrice')),
                                    1,
                                  ),
                                  createBaseVNode(
                                    'th',
                                    null,
                                    toDisplayString(unref(t)('quickPurchase.totalCost')),
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
                                          onClick: $event => toggleMaterial(item.ticker),
                                          class: normalizeClass(_ctx.$style.clickableRow),
                                        },
                                        [
                                          createBaseVNode('td', null, [
                                            createBaseVNode(
                                              'input',
                                              {
                                                type: 'checkbox',
                                                checked: unref(selectedMaterials).has(item.ticker),
                                                onClick: withModifiers(
                                                  $event => toggleMaterial(item.ticker),
                                                  ['stop'],
                                                ),
                                              },
                                              null,
                                              8,
                                              _hoisted_5,
                                            ),
                                          ]),
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
                                          createBaseVNode(
                                            'td',
                                            {
                                              class: normalizeClass({
                                                [_ctx.$style.noData]: !item.unitPrice,
                                              }),
                                            },
                                            [
                                              item.unitPrice
                                                ? (openBlock(),
                                                  createElementBlock(
                                                    'span',
                                                    _hoisted_6,
                                                    toDisplayString(unref(fixed02)(item.unitPrice)),
                                                    1,
                                                  ))
                                                : (openBlock(),
                                                  createElementBlock(
                                                    'span',
                                                    {
                                                      key: 1,
                                                      onClick: withModifiers(
                                                        $event => openPrice(item.ticker),
                                                        ['stop'],
                                                      ),
                                                      class: normalizeClass(_ctx.$style.loadLink),
                                                    },
                                                    toDisplayString(unref(t)('quickPurchase.load')),
                                                    11,
                                                    _hoisted_7,
                                                  )),
                                            ],
                                            2,
                                          ),
                                          createBaseVNode(
                                            'td',
                                            {
                                              class: normalizeClass({
                                                [_ctx.$style.noData]: !item.totalPrice,
                                              }),
                                            },
                                            toDisplayString(
                                              item.totalPrice
                                                ? unref(fixed0)(item.totalPrice)
                                                : '--',
                                            ),
                                            3,
                                          ),
                                        ],
                                        10,
                                        _hoisted_4,
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
                                    _cache[6] ||
                                      (_cache[6] = createBaseVNode(
                                        'th',
                                        { style: { width: '40px' } },
                                        null,
                                        -1,
                                      )),
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
                                    createBaseVNode(
                                      'th',
                                      null,
                                      toDisplayString(unref(t)('quickPurchase.unitPrice')),
                                      1,
                                    ),
                                    createBaseVNode(
                                      'th',
                                      null,
                                      toDisplayString(unref(t)('quickPurchase.totalCost')),
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
                                            onClick: $event => toggleMaterial(item.ticker),
                                            class: normalizeClass(_ctx.$style.clickableRow),
                                          },
                                          [
                                            createBaseVNode('td', null, [
                                              createBaseVNode(
                                                'input',
                                                {
                                                  type: 'checkbox',
                                                  checked: unref(selectedMaterials).has(
                                                    item.ticker,
                                                  ),
                                                  onClick: withModifiers(
                                                    $event => toggleMaterial(item.ticker),
                                                    ['stop'],
                                                  ),
                                                },
                                                null,
                                                8,
                                                _hoisted_9,
                                              ),
                                            ]),
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
                                            createBaseVNode(
                                              'td',
                                              {
                                                class: normalizeClass({
                                                  [_ctx.$style.noData]: !item.unitPrice,
                                                }),
                                              },
                                              toDisplayString(
                                                item.unitPrice
                                                  ? unref(fixed02)(item.unitPrice)
                                                  : '--',
                                              ),
                                              3,
                                            ),
                                            createBaseVNode(
                                              'td',
                                              {
                                                class: normalizeClass({
                                                  [_ctx.$style.noData]: !item.totalPrice,
                                                }),
                                              },
                                              toDisplayString(
                                                item.totalPrice
                                                  ? unref(fixed0)(item.totalPrice)
                                                  : '--',
                                              ),
                                              3,
                                            ),
                                          ],
                                          10,
                                          _hoisted_8,
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
            unref(selectedMaterials).size > 0
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 1,
                    class: normalizeClass(_ctx.$style.totalCostSection),
                  },
                  [
                    createBaseVNode(
                      'span',
                      null,
                      toDisplayString(unref(t)('quickPurchase.estimatedTotal')) + ': ',
                      1,
                    ),
                    unref(totalEstimatedCost).hasAllPrices
                      ? (openBlock(),
                        createElementBlock(
                          'strong',
                          _hoisted_10,
                          toDisplayString(unref(fixed0)(unref(totalEstimatedCost).total)),
                          1,
                        ))
                      : (openBlock(),
                        createElementBlock(
                          'span',
                          {
                            key: 1,
                            class: normalizeClass(_ctx.$style.noData),
                          },
                          toDisplayString(unref(fixed0)(unref(totalEstimatedCost).total)) +
                            '+ (' +
                            toDisplayString(unref(t)('quickPurchase.missingPrices')) +
                            ')',
                          3,
                        )),
                  ],
                  2,
                ))
              : createCommentVNode('', true),
            !unref(totalEstimatedCost).hasAllPrices && unref(selectedMaterials).size > 0
              ? (openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: 2,
                    class: normalizeClass(_ctx.$style.fetchSection),
                  },
                  [
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(_ctx.$style.fetchInfo),
                      },
                      toDisplayString(unref(t)('quickPurchase.createPriceFetchDesc')),
                      3,
                    ),
                    createVNode(
                      _sfc_main$3,
                      {
                        onClick: onCreatePriceFetch,
                        class: normalizeClass(_ctx.$style.fetchButton),
                        primary: '',
                      },
                      {
                        default: withCtx(() => [
                          createTextVNode(
                            toDisplayString(unref(t)('quickPurchase.createPriceFetch')),
                            1,
                          ),
                        ]),
                        _: 1,
                      },
                      8,
                      ['class'],
                    ),
                  ],
                  2,
                ))
              : createCommentVNode('', true),
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
                    primary: '',
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
