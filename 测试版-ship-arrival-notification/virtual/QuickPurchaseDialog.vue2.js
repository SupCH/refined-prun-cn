import { withModifiers, vModelCheckbox } from './runtime-dom.esm-bundler.js';
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
  withDirectives,
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
    const includePriceFetch = ref(true);
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
        includePriceFetch.value,
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
                                    _cache[7] ||
                                      (_cache[7] = createBaseVNode(
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
                    label: unref(t)('quickPurchase.includePriceFetch'),
                    tooltip: unref(t)('quickPurchase.includePriceFetchTooltip'),
                  },
                  {
                    default: withCtx(() => [
                      withDirectives(
                        createBaseVNode(
                          'input',
                          {
                            type: 'checkbox',
                            'onUpdate:modelValue':
                              _cache[2] ||
                              (_cache[2] = $event =>
                                isRef(includePriceFetch)
                                  ? (includePriceFetch.value = $event)
                                  : null),
                          },
                          null,
                          512,
                        ),
                        [[vModelCheckbox, unref(includePriceFetch)]],
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ['label', 'tooltip'],
                ),
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
                            _cache[3] ||
                            (_cache[3] = $event =>
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
                                _cache[4] ||
                                (_cache[4] = $event =>
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
                    onClick: _cache[5] || (_cache[5] = $event => emit('close')),
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUXVpY2tQdXJjaGFzZURpYWxvZy52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL3NoYXJlZC9RdWlja1B1cmNoYXNlRGlhbG9nLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgTnVtYmVySW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL051bWJlcklucHV0LnZ1ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQge1xuICBnZXRTaGlwU3RvcmFnZXMsXG4gIHNlcmlhbGl6ZVNoaXBTdG9yYWdlLFxuICBjcmVhdGVRdWlja1B1cmNoYXNlUGFja2FnZSxcbiAgY3JlYXRlUHJpY2VGZXRjaFBhY2thZ2UsXG4gIGFkZEFuZE5hdmlnYXRlVG9QYWNrYWdlLFxuICBnZW5lcmF0ZVBhY2thZ2VOYW1lLFxufSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9zaGFyZWQvcXVpY2stcHVyY2hhc2UtdXRpbHMnO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcbmltcG9ydCB7IG1hdGVyaWFsQ2F0ZWdvcmllc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFsLWNhdGVnb3JpZXMnO1xuaW1wb3J0IHsgY3hvYlN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2N4b2InO1xuaW1wb3J0IHsgZml4ZWQwLCBmaXhlZDAyIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgeyB0IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9pMThuJztcblxuaW1wb3J0IHsgUGxhbmV0QnVybiB9IGZyb20gJ0BzcmMvY29yZS9idXJuJztcblxuY29uc3QgcHJvcHMgPSBkZWZpbmVQcm9wczx7XG4gIG1hdGVyaWFscz86IFJlY29yZDxzdHJpbmcsIG51bWJlcj47XG4gIHBhY2thZ2VOYW1lUHJlZml4OiBzdHJpbmc7XG4gIHJhd0J1cm5EYXRhPzogUGxhbmV0QnVybltdO1xufT4oKTtcblxuY29uc3QgZW1pdCA9IGRlZmluZUVtaXRzPChlOiAnY2xvc2UnKSA9PiB2b2lkPigpO1xuXG5jb25zdCBleGNoYW5nZXMgPSBbJ0FJMScsICdDSTEnLCAnSUMxJywgJ05DMScsICdDSTInLCAnTkMyJ107XG5jb25zdCBzZWxlY3RlZEV4Y2hhbmdlID0gcmVmPHN0cmluZz4oJ0FJMScpO1xuY29uc3Qgc2VsZWN0ZWRTaGlwID0gcmVmPHN0cmluZyB8IHVuZGVmaW5lZD4odW5kZWZpbmVkKTtcbmNvbnN0IHNoaXBTdG9yYWdlcyA9IHJlZjxhbnlbXT4oW10pO1xuY29uc3Qgc2VsZWN0ZWRTaXRlcyA9IHJlZjxzdHJpbmdbXT4oW10pO1xuY29uc3QgcmVzdXBwbHlEYXlzID0gcmVmPG51bWJlcj4odXNlckRhdGEuc2V0dGluZ3MuYnVybi5yZXN1cHBseSk7XG5jb25zdCBpbmNsdWRlUHJpY2VGZXRjaCA9IHJlZjxib29sZWFuPih0cnVlKTtcblxuLy8gTWF0ZXJpYWwgc2VsZWN0aW9uIHN0YXRlXG5jb25zdCBzZWxlY3RlZE1hdGVyaWFscyA9IHJlZjxTZXQ8c3RyaW5nPj4obmV3IFNldCgpKTtcblxuY29uc3QgY29uc3VtYWJsZUNhdGVnb3JpZXMgPSBbXG4gICdmb29kJyxcbiAgJ2JldmVyYWdlJyxcbiAgJ2RyaW5rJyxcbiAgJ2x1eHVyeScsXG4gICdjb25zdW1hYmxlJyxcbiAgJ21lZGljYWwnLFxuICAnYXBwYXJlbCcsXG4gICdjbG90aGluZycsXG4gICd3ZWFyJyxcbiAgJ3RleHRpbGUnLFxuICAncHJvdmlzaW9uJyxcbiAgJ3dvcmtmb3JjZScsXG4gICdvdmVyYWxsJyxcbiAgJ3NoaXAgcGFydCcsXG4gICdzaGlwIGVuZ2luZScsXG4gICdzaGlwIHNoaWVsZCcsXG4gICdmdWVsJyxcbl07XG5cbm9uTW91bnRlZChhc3luYyAoKSA9PiB7XG4gIHNoaXBTdG9yYWdlcy52YWx1ZSA9IGF3YWl0IGdldFNoaXBTdG9yYWdlcygpO1xuICBzZWxlY3RlZFNoaXAudmFsdWUgPSAnbG9jYWwnO1xuXG4gIGlmIChwcm9wcy5yYXdCdXJuRGF0YSkge1xuICAgIHNlbGVjdGVkU2l0ZXMudmFsdWUgPSBwcm9wcy5yYXdCdXJuRGF0YVxuICAgICAgLmZpbHRlcihidXJuID0+IGJ1cm4ubmF0dXJhbElkICE9PSAnJylcbiAgICAgIC5tYXAoYnVybiA9PiBidXJuLm5hdHVyYWxJZCk7XG4gIH1cbn0pO1xuXG5jb25zdCBjb21wdXRlZE1hdGVyaWFscyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKHByb3BzLnJhd0J1cm5EYXRhKSB7XG4gICAgY29uc3QgbWF0ZXJpYWxzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gICAgZm9yIChjb25zdCBidXJuIG9mIHByb3BzLnJhd0J1cm5EYXRhKSB7XG4gICAgICBpZiAoYnVybi5uYXR1cmFsSWQgPT09ICcnIHx8ICFzZWxlY3RlZFNpdGVzLnZhbHVlLmluY2x1ZGVzKGJ1cm4ubmF0dXJhbElkKSkgY29udGludWU7XG5cbiAgICAgIGZvciAoY29uc3QgW3RpY2tlciwgYnVybkRhdGFdIG9mIE9iamVjdC5lbnRyaWVzKGJ1cm4uYnVybikpIHtcbiAgICAgICAgaWYgKGJ1cm5EYXRhLmRhaWx5QW1vdW50ID49IDApIGNvbnRpbnVlO1xuICAgICAgICBjb25zdCBuZWVkID0gTWF0aC5tYXgoMCwgcmVzdXBwbHlEYXlzLnZhbHVlICogLWJ1cm5EYXRhLmRhaWx5QW1vdW50IC0gYnVybkRhdGEuaW52ZW50b3J5KTtcbiAgICAgICAgaWYgKG5lZWQgPiAwKSB7XG4gICAgICAgICAgbWF0ZXJpYWxzW3RpY2tlcl0gPSAobWF0ZXJpYWxzW3RpY2tlcl0gfHwgMCkgKyBuZWVkO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgfVxuICAgIHJldHVybiBtYXRlcmlhbHM7XG4gIH1cbiAgcmV0dXJuIHByb3BzLm1hdGVyaWFscyB8fCB7fTtcbn0pO1xuXG4vLyBBdXRvLXNlbGVjdCBhbGwgbWF0ZXJpYWxzIHdoZW4gdGhleSBjaGFuZ2VcbndhdGNoKFxuICBjb21wdXRlZE1hdGVyaWFscyxcbiAgbmV3TWF0ZXJpYWxzID0+IHtcbiAgICBPYmplY3Qua2V5cyhuZXdNYXRlcmlhbHMpLmZvckVhY2godGlja2VyID0+IHNlbGVjdGVkTWF0ZXJpYWxzLnZhbHVlLmFkZCh0aWNrZXIpKTtcbiAgfSxcbiAgeyBpbW1lZGlhdGU6IHRydWUgfSxcbik7XG5cbmNvbnN0IHNoaXBPcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCBvcHRpb25zID0gc2hpcFN0b3JhZ2VzLnZhbHVlLm1hcChzaGlwID0+ICh7XG4gICAgdmFsdWU6IHNoaXAuYWRkcmVzc2FibGVJZCxcbiAgICBsYWJlbDogc2VyaWFsaXplU2hpcFN0b3JhZ2Uoc2hpcCksXG4gIH0pKTtcblxuICBvcHRpb25zLnVuc2hpZnQoe1xuICAgIHZhbHVlOiAnbG9jYWwnLFxuICAgIGxhYmVsOiB0KCdxdWlja1B1cmNoYXNlLmxvY2FsV2FyZWhvdXNlJyksXG4gIH0pO1xuXG4gIHJldHVybiBvcHRpb25zO1xufSk7XG5cbmNvbnN0IG1hdGVyaWFsTGlzdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgYWxsTWF0ZXJpYWxzID0gT2JqZWN0LmVudHJpZXMoY29tcHV0ZWRNYXRlcmlhbHMudmFsdWUpXG4gICAgLnNvcnQoKGEsIGIpID0+IGFbMF0ubG9jYWxlQ29tcGFyZShiWzBdKSlcbiAgICAubWFwKChbdGlja2VyLCBhbW91bnRdKSA9PiB7XG4gICAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHRpY2tlcik7XG4gICAgICBjb25zdCBjeFRpY2tlciA9IGAke3RpY2tlcn0uJHtzZWxlY3RlZEV4Y2hhbmdlLnZhbHVlfWA7XG4gICAgICBjb25zdCBvcmRlckJvb2sgPSBjeG9iU3RvcmUuZ2V0QnlUaWNrZXIoY3hUaWNrZXIpO1xuICAgICAgbGV0IHVuaXRQcmljZTogbnVtYmVyIHwgdW5kZWZpbmVkID0gdW5kZWZpbmVkO1xuICAgICAgaWYgKG9yZGVyQm9vayAmJiBvcmRlckJvb2suc2VsbGluZ09yZGVycy5sZW5ndGggPiAwKSB7XG4gICAgICAgIC8vIEdldCBsb3dlc3QgYXNrIHByaWNlXG4gICAgICAgIGNvbnN0IHNvcnRlZE9yZGVycyA9IG9yZGVyQm9vay5zZWxsaW5nT3JkZXJzXG4gICAgICAgICAgLnNsaWNlKClcbiAgICAgICAgICAuc29ydCgoYSwgYikgPT4gYS5saW1pdC5hbW91bnQgLSBiLmxpbWl0LmFtb3VudCk7XG4gICAgICAgIHVuaXRQcmljZSA9IHNvcnRlZE9yZGVyc1swXT8ubGltaXQuYW1vdW50O1xuICAgICAgfVxuICAgICAgcmV0dXJuIHtcbiAgICAgICAgdGlja2VyLFxuICAgICAgICBuYW1lOiBtYXRlcmlhbD8ubmFtZSB8fCB0aWNrZXIsXG4gICAgICAgIGFtb3VudCxcbiAgICAgICAgY2F0ZWdvcnk6IG1hdGVyaWFsQ2F0ZWdvcmllc1N0b3JlLmdldEJ5SWQobWF0ZXJpYWw/LmNhdGVnb3J5KT8ubmFtZSB8fCAnJyxcbiAgICAgICAgdW5pdFByaWNlLFxuICAgICAgICB0b3RhbFByaWNlOiB1bml0UHJpY2UgPyB1bml0UHJpY2UgKiBhbW91bnQgOiB1bmRlZmluZWQsXG4gICAgICB9O1xuICAgIH0pO1xuXG4gIGNvbnN0IGNvbnN1bWFibGVzID0gYWxsTWF0ZXJpYWxzLmZpbHRlcihtID0+XG4gICAgY29uc3VtYWJsZUNhdGVnb3JpZXMuc29tZShjYXQgPT4gbS5jYXRlZ29yeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNhdCkpLFxuICApO1xuXG4gIGNvbnN0IHJhd01hdGVyaWFscyA9IGFsbE1hdGVyaWFscy5maWx0ZXIoXG4gICAgbSA9PiAhY29uc3VtYWJsZUNhdGVnb3JpZXMuc29tZShjYXQgPT4gbS5jYXRlZ29yeS50b0xvd2VyQ2FzZSgpLmluY2x1ZGVzKGNhdCkpLFxuICApO1xuXG4gIHJldHVybiB7IGNvbnN1bWFibGVzLCByYXdNYXRlcmlhbHMsIGFsbDogYWxsTWF0ZXJpYWxzIH07XG59KTtcblxuZnVuY3Rpb24gdG9nZ2xlU2l0ZShuYXR1cmFsSWQ6IHN0cmluZykge1xuICBjb25zdCBpbmRleCA9IHNlbGVjdGVkU2l0ZXMudmFsdWUuaW5kZXhPZihuYXR1cmFsSWQpO1xuICBpZiAoaW5kZXggPiAtMSkge1xuICAgIHNlbGVjdGVkU2l0ZXMudmFsdWUuc3BsaWNlKGluZGV4LCAxKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3RlZFNpdGVzLnZhbHVlLnB1c2gobmF0dXJhbElkKTtcbiAgfVxufVxuXG4vLyBNYXRlcmlhbCBzZWxlY3Rpb24gZnVuY3Rpb25zXG5mdW5jdGlvbiB0b2dnbGVNYXRlcmlhbCh0aWNrZXI6IHN0cmluZykge1xuICBpZiAoc2VsZWN0ZWRNYXRlcmlhbHMudmFsdWUuaGFzKHRpY2tlcikpIHtcbiAgICBzZWxlY3RlZE1hdGVyaWFscy52YWx1ZS5kZWxldGUodGlja2VyKTtcbiAgfSBlbHNlIHtcbiAgICBzZWxlY3RlZE1hdGVyaWFscy52YWx1ZS5hZGQodGlja2VyKTtcbiAgfVxufVxuXG5jb25zdCBpc0FsbENvbnN1bWFibGVzU2VsZWN0ZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IGNvbnN1bWFibGVzID0gbWF0ZXJpYWxMaXN0LnZhbHVlLmNvbnN1bWFibGVzO1xuICByZXR1cm4gY29uc3VtYWJsZXMubGVuZ3RoID4gMCAmJiBjb25zdW1hYmxlcy5ldmVyeShtID0+IHNlbGVjdGVkTWF0ZXJpYWxzLnZhbHVlLmhhcyhtLnRpY2tlcikpO1xufSk7XG5cbmZ1bmN0aW9uIHRvZ2dsZUFsbENvbnN1bWFibGVzKCkge1xuICBpZiAoaXNBbGxDb25zdW1hYmxlc1NlbGVjdGVkLnZhbHVlKSB7XG4gICAgbWF0ZXJpYWxMaXN0LnZhbHVlLmNvbnN1bWFibGVzLmZvckVhY2gobSA9PiBzZWxlY3RlZE1hdGVyaWFscy52YWx1ZS5kZWxldGUobS50aWNrZXIpKTtcbiAgfSBlbHNlIHtcbiAgICBtYXRlcmlhbExpc3QudmFsdWUuY29uc3VtYWJsZXMuZm9yRWFjaChtID0+IHNlbGVjdGVkTWF0ZXJpYWxzLnZhbHVlLmFkZChtLnRpY2tlcikpO1xuICB9XG59XG5cbmNvbnN0IGlzQWxsUmF3U2VsZWN0ZWQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJhdyA9IG1hdGVyaWFsTGlzdC52YWx1ZS5yYXdNYXRlcmlhbHM7XG4gIHJldHVybiByYXcubGVuZ3RoID4gMCAmJiByYXcuZXZlcnkobSA9PiBzZWxlY3RlZE1hdGVyaWFscy52YWx1ZS5oYXMobS50aWNrZXIpKTtcbn0pO1xuXG5mdW5jdGlvbiB0b2dnbGVBbGxSYXdNYXRlcmlhbHMoKSB7XG4gIGlmIChpc0FsbFJhd1NlbGVjdGVkLnZhbHVlKSB7XG4gICAgbWF0ZXJpYWxMaXN0LnZhbHVlLnJhd01hdGVyaWFscy5mb3JFYWNoKG0gPT4gc2VsZWN0ZWRNYXRlcmlhbHMudmFsdWUuZGVsZXRlKG0udGlja2VyKSk7XG4gIH0gZWxzZSB7XG4gICAgbWF0ZXJpYWxMaXN0LnZhbHVlLnJhd01hdGVyaWFscy5mb3JFYWNoKG0gPT4gc2VsZWN0ZWRNYXRlcmlhbHMudmFsdWUuYWRkKG0udGlja2VyKSk7XG4gIH1cbn1cblxuZnVuY3Rpb24gY2xlYXJBbGxTZWxlY3Rpb25zKCkge1xuICBzZWxlY3RlZE1hdGVyaWFscy52YWx1ZS5jbGVhcigpO1xufVxuXG4vLyBDYWxjdWxhdGUgdG90YWwgZXN0aW1hdGVkIGNvc3QgZm9yIHNlbGVjdGVkIG1hdGVyaWFsc1xuY29uc3QgdG90YWxFc3RpbWF0ZWRDb3N0ID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgdG90YWwgPSAwO1xuICBsZXQgaGFzQWxsUHJpY2VzID0gdHJ1ZTtcbiAgZm9yIChjb25zdCBpdGVtIG9mIG1hdGVyaWFsTGlzdC52YWx1ZS5hbGwpIHtcbiAgICBpZiAoc2VsZWN0ZWRNYXRlcmlhbHMudmFsdWUuaGFzKGl0ZW0udGlja2VyKSkge1xuICAgICAgaWYgKGl0ZW0udG90YWxQcmljZSkge1xuICAgICAgICB0b3RhbCArPSBpdGVtLnRvdGFsUHJpY2U7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBoYXNBbGxQcmljZXMgPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgcmV0dXJuIHsgdG90YWwsIGhhc0FsbFByaWNlcyB9O1xufSk7XG5cbmZ1bmN0aW9uIG9uQ29uZmlybSgpIHtcbiAgaWYgKCFzZWxlY3RlZFNoaXAudmFsdWUpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBsZXQgc2hpcFN0b3JhZ2U6IGFueSA9IHVuZGVmaW5lZDtcbiAgaWYgKHNlbGVjdGVkU2hpcC52YWx1ZSAhPT0gJ2xvY2FsJykge1xuICAgIHNoaXBTdG9yYWdlID0gc2hpcFN0b3JhZ2VzLnZhbHVlLmZpbmQocyA9PiBzLmFkZHJlc3NhYmxlSWQgPT09IHNlbGVjdGVkU2hpcC52YWx1ZSk7XG4gICAgaWYgKCFzaGlwU3RvcmFnZSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIC8vIENoZWNrIGlmIGFueSBtYXRlcmlhbHMgYXJlIHNlbGVjdGVkXG4gIGlmIChzZWxlY3RlZE1hdGVyaWFscy52YWx1ZS5zaXplID09PSAwKSB7XG4gICAgYWxlcnQodCgncXVpY2tQdXJjaGFzZS5ub01hdGVyaWFsc1NlbGVjdGVkJykpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIC8vIEZpbHRlciBtYXRlcmlhbHMgYnkgc2VsZWN0aW9uXG4gIGNvbnN0IGZpbHRlcmVkTWF0ZXJpYWxzOiBSZWNvcmQ8c3RyaW5nLCBudW1iZXI+ID0ge307XG4gIGZvciAoY29uc3QgW3RpY2tlciwgYW1vdW50XSBvZiBPYmplY3QuZW50cmllcyhjb21wdXRlZE1hdGVyaWFscy52YWx1ZSkpIHtcbiAgICBpZiAoc2VsZWN0ZWRNYXRlcmlhbHMudmFsdWUuaGFzKHRpY2tlcikpIHtcbiAgICAgIGZpbHRlcmVkTWF0ZXJpYWxzW3RpY2tlcl0gPSBhbW91bnQ7XG4gICAgfVxuICB9XG5cbiAgLy8gVXNlIHNwYWNlLWJhc2VkIG5hbWUgZm9yIHN0b3JhZ2UgKHByb2plY3QgY29udmVudGlvbiksIGJ1dCBOTyBjb2xvbnMgb3Igc3BlY2lhbCBjaGFyc1xuICBjb25zdCB0aW1lc3RhbXAgPSBkYXlqcygpLmZvcm1hdCgnWVlZWS1NTS1ERCBISG1tJyk7XG4gIGNvbnN0IHBhY2thZ2VOYW1lID0gYCR7cHJvcHMucGFja2FnZU5hbWVQcmVmaXh9ICR7dGltZXN0YW1wfWA7XG4gIGNvbnN0IHBrZyA9IGNyZWF0ZVF1aWNrUHVyY2hhc2VQYWNrYWdlKFxuICAgIHBhY2thZ2VOYW1lLFxuICAgIGZpbHRlcmVkTWF0ZXJpYWxzLFxuICAgIHNlbGVjdGVkRXhjaGFuZ2UudmFsdWUsXG4gICAgc2hpcFN0b3JhZ2UsXG4gICAgaW5jbHVkZVByaWNlRmV0Y2gudmFsdWUsXG4gICk7XG5cbiAgY29uc3QgcGtnTmFtZSA9IGFkZEFuZE5hdmlnYXRlVG9QYWNrYWdlKHBrZyk7XG4gIC8vIE5hdmlnYXRpb24gY29tbWFuZCBNVVNUIHVzZSB1bmRlcnNjb3JlcyBpbnN0ZWFkIG9mIHNwYWNlc1xuICBzaG93QnVmZmVyKGBYSVQgQUNUX0VESVRfJHtwa2dOYW1lLnNwbGl0KCcgJykuam9pbignXycpfWApO1xuICBlbWl0KCdjbG9zZScpO1xufVxuXG5mdW5jdGlvbiBvcGVuUHJpY2UodGlja2VyOiBzdHJpbmcpIHtcbiAgc2hvd0J1ZmZlcihgQ1hQTyAke3RpY2tlcn0uJHtzZWxlY3RlZEV4Y2hhbmdlLnZhbHVlfWApO1xufVxuXG5mdW5jdGlvbiBvbkNyZWF0ZVByaWNlRmV0Y2goKSB7XG4gIGNvbnN0IHRpY2tlcnM6IHN0cmluZ1tdID0gW107XG4gIGZvciAoY29uc3QgaXRlbSBvZiBtYXRlcmlhbExpc3QudmFsdWUuYWxsKSB7XG4gICAgaWYgKHNlbGVjdGVkTWF0ZXJpYWxzLnZhbHVlLmhhcyhpdGVtLnRpY2tlcikpIHtcbiAgICAgIHRpY2tlcnMucHVzaChpdGVtLnRpY2tlcik7XG4gICAgfVxuICB9XG5cbiAgaWYgKHRpY2tlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgYWxlcnQodCgncXVpY2tQdXJjaGFzZS5ub01hdGVyaWFsc1NlbGVjdGVkJykpO1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGNvbnN0IHRpbWVzdGFtcCA9IGRheWpzKCkuZm9ybWF0KCdZWVlZLU1NLUREIEhIbW0nKTtcbiAgY29uc3QgcGFja2FnZU5hbWUgPSBgRkVUQ0ggJHtzZWxlY3RlZEV4Y2hhbmdlLnZhbHVlfSAke3RpbWVzdGFtcH1gO1xuICBjb25zdCBwa2cgPSBjcmVhdGVQcmljZUZldGNoUGFja2FnZShwYWNrYWdlTmFtZSwgdGlja2Vycywgc2VsZWN0ZWRFeGNoYW5nZS52YWx1ZSk7XG4gIGNvbnN0IHBrZ05hbWUgPSBhZGRBbmROYXZpZ2F0ZVRvUGFja2FnZShwa2cpO1xuICBzaG93QnVmZmVyKGBYSVQgQUNUX0VESVRfJHtwa2dOYW1lLnNwbGl0KCcgJykuam9pbignXycpfWApO1xuICBlbWl0KCdjbG9zZScpO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuY29udGFpbmVyXCI+XG4gICAgPGgyPnt7IHQoJ3F1aWNrUHVyY2hhc2UudGl0bGUnKSB9fTwvaDI+XG5cbiAgICA8ZGl2IHYtaWY9XCJyYXdCdXJuRGF0YSAmJiByYXdCdXJuRGF0YS5sZW5ndGggPiAwXCIgOmNsYXNzPVwiJHN0eWxlLnNlY3Rpb25cIj5cbiAgICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLmZsZXhSb3dcIj5cbiAgICAgICAgPEFjdGl2ZSA6bGFiZWw9XCJ0KCdxdWlja1B1cmNoYXNlLnJlc3VwcGx5RGF5cycpXCI+XG4gICAgICAgICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJyZXN1cHBseURheXNcIiAvPlxuICAgICAgICA8L0FjdGl2ZT5cbiAgICAgIDwvZGl2PlxuICAgICAgPGgzPnt7IHQoJ3F1aWNrUHVyY2hhc2Uuc2VsZWN0U2l0ZXMnKSB9fTwvaDM+XG4gICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5zaXRlR3JpZFwiPlxuICAgICAgICA8ZGl2XG4gICAgICAgICAgdi1mb3I9XCJzaXRlIGluIHJhd0J1cm5EYXRhLmZpbHRlcihzID0+IHMubmF0dXJhbElkICE9PSAnJylcIlxuICAgICAgICAgIDprZXk9XCJzaXRlLm5hdHVyYWxJZFwiXG4gICAgICAgICAgOmNsYXNzPVwiJHN0eWxlLnNpdGVJdGVtXCJcbiAgICAgICAgICBAY2xpY2s9XCJ0b2dnbGVTaXRlKHNpdGUubmF0dXJhbElkKVwiPlxuICAgICAgICAgIDxpbnB1dCB0eXBlPVwiY2hlY2tib3hcIiA6Y2hlY2tlZD1cInNlbGVjdGVkU2l0ZXMuaW5jbHVkZXMoc2l0ZS5uYXR1cmFsSWQpXCIgQGNsaWNrLnN0b3AgLz5cbiAgICAgICAgICA8c3Bhbj57eyBzaXRlLnBsYW5ldE5hbWUgfX0gKHt7IHNpdGUubmF0dXJhbElkIH19KTwvc3Bhbj5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cbiAgICA8L2Rpdj5cblxuICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLnNlY3Rpb25cIj5cbiAgICAgIDxoMz57eyB0KCdxdWlja1B1cmNoYXNlLm1hdGVyaWFsTGlzdCcpIH19PC9oMz5cblxuICAgICAgPCEtLSBTZWxlY3Rpb24gQnV0dG9ucyAtLT5cbiAgICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLnNlbGVjdGlvbkJ1dHRvbnNcIj5cbiAgICAgICAgPFBydW5CdXR0b25cbiAgICAgICAgICA6cHJpbWFyeT1cIiFpc0FsbENvbnN1bWFibGVzU2VsZWN0ZWRcIlxuICAgICAgICAgIDpkYW5nZXI9XCJpc0FsbENvbnN1bWFibGVzU2VsZWN0ZWRcIlxuICAgICAgICAgIEBjbGljaz1cInRvZ2dsZUFsbENvbnN1bWFibGVzXCI+XG4gICAgICAgICAge3tcbiAgICAgICAgICAgIGlzQWxsQ29uc3VtYWJsZXNTZWxlY3RlZFxuICAgICAgICAgICAgICA/IHQoJ3F1aWNrUHVyY2hhc2UuZGVzZWxlY3RBbGxDb25zdW1hYmxlcycpXG4gICAgICAgICAgICAgIDogdCgncXVpY2tQdXJjaGFzZS5zZWxlY3RBbGxDb25zdW1hYmxlcycpXG4gICAgICAgICAgfX1cbiAgICAgICAgPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvblxuICAgICAgICAgIDpwcmltYXJ5PVwiIWlzQWxsUmF3U2VsZWN0ZWRcIlxuICAgICAgICAgIDpkYW5nZXI9XCJpc0FsbFJhd1NlbGVjdGVkXCJcbiAgICAgICAgICBAY2xpY2s9XCJ0b2dnbGVBbGxSYXdNYXRlcmlhbHNcIj5cbiAgICAgICAgICB7e1xuICAgICAgICAgICAgaXNBbGxSYXdTZWxlY3RlZFxuICAgICAgICAgICAgICA/IHQoJ3F1aWNrUHVyY2hhc2UuZGVzZWxlY3RBbGxSYXdNYXRlcmlhbHMnKVxuICAgICAgICAgICAgICA6IHQoJ3F1aWNrUHVyY2hhc2Uuc2VsZWN0QWxsUmF3TWF0ZXJpYWxzJylcbiAgICAgICAgICB9fVxuICAgICAgICA8L1BydW5CdXR0b24+XG4gICAgICAgIDxQcnVuQnV0dG9uIGRhcmsgQGNsaWNrPVwiY2xlYXJBbGxTZWxlY3Rpb25zXCI+e3tcbiAgICAgICAgICB0KCdxdWlja1B1cmNoYXNlLmNsZWFyU2VsZWN0aW9ucycpXG4gICAgICAgIH19PC9QcnVuQnV0dG9uPlxuICAgICAgICA8c3BhbiA6Y2xhc3M9XCIkc3R5bGUuc2VsZWN0ZWRDb3VudFwiXG4gICAgICAgICAgPnt7IHQoJ3F1aWNrUHVyY2hhc2Uuc2VsZWN0ZWQnKSB9fToge3sgc2VsZWN0ZWRNYXRlcmlhbHMuc2l6ZSB9fTwvc3BhblxuICAgICAgICA+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBDb25zdW1hYmxlcyBTZWN0aW9uIC0tPlxuICAgICAgPGRpdiB2LWlmPVwibWF0ZXJpYWxMaXN0LmNvbnN1bWFibGVzLmxlbmd0aCA+IDBcIj5cbiAgICAgICAgPGg0IDpjbGFzcz1cIiRzdHlsZS5jYXRlZ29yeVRpdGxlXCI+e3sgdCgncXVpY2tQdXJjaGFzZS5jb25zdW1hYmxlcycpIH19PC9oND5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuc2Nyb2xsVGFibGVcIj5cbiAgICAgICAgICA8dGFibGUgOmNsYXNzPVwiJHN0eWxlLm1hdGVyaWFsVGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cIndpZHRoOiA0MHB4XCI+PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+e3sgdCgncXVpY2tQdXJjaGFzZS5tYXRlcmlhbCcpIH19PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+e3sgdCgncXVpY2tQdXJjaGFzZS5hbW91bnQnKSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPnt7IHQoJ3F1aWNrUHVyY2hhc2UudW5pdFByaWNlJykgfX08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57eyB0KCdxdWlja1B1cmNoYXNlLnRvdGFsQ29zdCcpIH19PC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIHYtZm9yPVwiaXRlbSBpbiBtYXRlcmlhbExpc3QuY29uc3VtYWJsZXNcIlxuICAgICAgICAgICAgICAgIDprZXk9XCJpdGVtLnRpY2tlclwiXG4gICAgICAgICAgICAgICAgQGNsaWNrPVwidG9nZ2xlTWF0ZXJpYWwoaXRlbS50aWNrZXIpXCJcbiAgICAgICAgICAgICAgICA6Y2xhc3M9XCIkc3R5bGUuY2xpY2thYmxlUm93XCI+XG4gICAgICAgICAgICAgICAgPHRkPlxuICAgICAgICAgICAgICAgICAgPGlucHV0XG4gICAgICAgICAgICAgICAgICAgIHR5cGU9XCJjaGVja2JveFwiXG4gICAgICAgICAgICAgICAgICAgIDpjaGVja2VkPVwic2VsZWN0ZWRNYXRlcmlhbHMuaGFzKGl0ZW0udGlja2VyKVwiXG4gICAgICAgICAgICAgICAgICAgIEBjbGljay5zdG9wPVwidG9nZ2xlTWF0ZXJpYWwoaXRlbS50aWNrZXIpXCIgLz5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57eyBpdGVtLnRpY2tlciB9fTwvdGQ+XG4gICAgICAgICAgICAgICAgPHRkPnt7IGZpeGVkMChpdGVtLmFtb3VudCkgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCA6Y2xhc3M9XCJ7IFskc3R5bGUubm9EYXRhXTogIWl0ZW0udW5pdFByaWNlIH1cIj5cbiAgICAgICAgICAgICAgICAgIDxzcGFuIHYtaWY9XCJpdGVtLnVuaXRQcmljZVwiPnt7IGZpeGVkMDIoaXRlbS51bml0UHJpY2UpIH19PC9zcGFuPlxuICAgICAgICAgICAgICAgICAgPHNwYW4gdi1lbHNlIEBjbGljay5zdG9wPVwib3BlblByaWNlKGl0ZW0udGlja2VyKVwiIDpjbGFzcz1cIiRzdHlsZS5sb2FkTGlua1wiPnt7XG4gICAgICAgICAgICAgICAgICAgIHQoJ3F1aWNrUHVyY2hhc2UubG9hZCcpXG4gICAgICAgICAgICAgICAgICB9fTwvc3Bhbj5cbiAgICAgICAgICAgICAgICA8L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCA6Y2xhc3M9XCJ7IFskc3R5bGUubm9EYXRhXTogIWl0ZW0udG90YWxQcmljZSB9XCI+e3tcbiAgICAgICAgICAgICAgICAgIGl0ZW0udG90YWxQcmljZSA/IGZpeGVkMChpdGVtLnRvdGFsUHJpY2UpIDogJy0tJ1xuICAgICAgICAgICAgICAgIH19PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBSYXcgTWF0ZXJpYWxzIFNlY3Rpb24gLS0+XG4gICAgICA8ZGl2IHYtaWY9XCJtYXRlcmlhbExpc3QucmF3TWF0ZXJpYWxzLmxlbmd0aCA+IDBcIiA6Y2xhc3M9XCIkc3R5bGUucmF3TWF0ZXJpYWxzU2VjdGlvblwiPlxuICAgICAgICA8aDQgOmNsYXNzPVwiJHN0eWxlLmNhdGVnb3J5VGl0bGVcIj57eyB0KCdxdWlja1B1cmNoYXNlLnJhd01hdGVyaWFscycpIH19PC9oND5cbiAgICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuc2Nyb2xsVGFibGVcIj5cbiAgICAgICAgICA8dGFibGUgOmNsYXNzPVwiJHN0eWxlLm1hdGVyaWFsVGFibGVcIj5cbiAgICAgICAgICAgIDx0aGVhZD5cbiAgICAgICAgICAgICAgPHRyPlxuICAgICAgICAgICAgICAgIDx0aCBzdHlsZT1cIndpZHRoOiA0MHB4XCI+PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+e3sgdCgncXVpY2tQdXJjaGFzZS5tYXRlcmlhbCcpIH19PC90aD5cbiAgICAgICAgICAgICAgICA8dGg+e3sgdCgncXVpY2tQdXJjaGFzZS5hbW91bnQnKSB9fTwvdGg+XG4gICAgICAgICAgICAgICAgPHRoPnt7IHQoJ3F1aWNrUHVyY2hhc2UudW5pdFByaWNlJykgfX08L3RoPlxuICAgICAgICAgICAgICAgIDx0aD57eyB0KCdxdWlja1B1cmNoYXNlLnRvdGFsQ29zdCcpIH19PC90aD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGhlYWQ+XG4gICAgICAgICAgICA8dGJvZHk+XG4gICAgICAgICAgICAgIDx0clxuICAgICAgICAgICAgICAgIHYtZm9yPVwiaXRlbSBpbiBtYXRlcmlhbExpc3QucmF3TWF0ZXJpYWxzXCJcbiAgICAgICAgICAgICAgICA6a2V5PVwiaXRlbS50aWNrZXJcIlxuICAgICAgICAgICAgICAgIEBjbGljaz1cInRvZ2dsZU1hdGVyaWFsKGl0ZW0udGlja2VyKVwiXG4gICAgICAgICAgICAgICAgOmNsYXNzPVwiJHN0eWxlLmNsaWNrYWJsZVJvd1wiPlxuICAgICAgICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgICAgICAgIDxpbnB1dFxuICAgICAgICAgICAgICAgICAgICB0eXBlPVwiY2hlY2tib3hcIlxuICAgICAgICAgICAgICAgICAgICA6Y2hlY2tlZD1cInNlbGVjdGVkTWF0ZXJpYWxzLmhhcyhpdGVtLnRpY2tlcilcIlxuICAgICAgICAgICAgICAgICAgICBAY2xpY2suc3RvcD1cInRvZ2dsZU1hdGVyaWFsKGl0ZW0udGlja2VyKVwiIC8+XG4gICAgICAgICAgICAgICAgPC90ZD5cbiAgICAgICAgICAgICAgICA8dGQ+e3sgaXRlbS50aWNrZXIgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZD57eyBmaXhlZDAoaXRlbS5hbW91bnQpIH19PC90ZD5cbiAgICAgICAgICAgICAgICA8dGQgOmNsYXNzPVwieyBbJHN0eWxlLm5vRGF0YV06ICFpdGVtLnVuaXRQcmljZSB9XCI+e3tcbiAgICAgICAgICAgICAgICAgIGl0ZW0udW5pdFByaWNlID8gZml4ZWQwMihpdGVtLnVuaXRQcmljZSkgOiAnLS0nXG4gICAgICAgICAgICAgICAgfX08L3RkPlxuICAgICAgICAgICAgICAgIDx0ZCA6Y2xhc3M9XCJ7IFskc3R5bGUubm9EYXRhXTogIWl0ZW0udG90YWxQcmljZSB9XCI+e3tcbiAgICAgICAgICAgICAgICAgIGl0ZW0udG90YWxQcmljZSA/IGZpeGVkMChpdGVtLnRvdGFsUHJpY2UpIDogJy0tJ1xuICAgICAgICAgICAgICAgIH19PC90ZD5cbiAgICAgICAgICAgICAgPC90cj5cbiAgICAgICAgICAgIDwvdGJvZHk+XG4gICAgICAgICAgPC90YWJsZT5cbiAgICAgICAgPC9kaXY+XG4gICAgICA8L2Rpdj5cblxuICAgICAgPCEtLSBFbXB0eSBTdGF0ZSAtLT5cbiAgICAgIDxkaXYgdi1pZj1cIm1hdGVyaWFsTGlzdC5hbGwubGVuZ3RoID09PSAwXCIgOmNsYXNzPVwiJHN0eWxlLmVtcHR5XCI+XG4gICAgICAgIHt7IHQoJ3F1aWNrUHVyY2hhc2Uubm9NYXRlcmlhbHMnKSB9fVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG5cbiAgICA8Zm9ybSA6Y2xhc3M9XCIkc3R5bGUuZm9ybVwiPlxuICAgICAgPEFjdGl2ZVxuICAgICAgICA6bGFiZWw9XCJ0KCdxdWlja1B1cmNoYXNlLmluY2x1ZGVQcmljZUZldGNoJylcIlxuICAgICAgICA6dG9vbHRpcD1cInQoJ3F1aWNrUHVyY2hhc2UuaW5jbHVkZVByaWNlRmV0Y2hUb29sdGlwJylcIj5cbiAgICAgICAgPGlucHV0IHR5cGU9XCJjaGVja2JveFwiIHYtbW9kZWw9XCJpbmNsdWRlUHJpY2VGZXRjaFwiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxBY3RpdmUgOmxhYmVsPVwidCgncXVpY2tQdXJjaGFzZS5zZWxlY3RFeGNoYW5nZScpXCI+XG4gICAgICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwic2VsZWN0ZWRFeGNoYW5nZVwiIDpvcHRpb25zPVwiZXhjaGFuZ2VzXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPEFjdGl2ZSA6bGFiZWw9XCJ0KCdxdWlja1B1cmNoYXNlLnNlbGVjdFNoaXAnKVwiPlxuICAgICAgICA8U2VsZWN0SW5wdXQgdi1pZj1cInNoaXBPcHRpb25zLmxlbmd0aCA+IDBcIiB2LW1vZGVsPVwic2VsZWN0ZWRTaGlwXCIgOm9wdGlvbnM9XCJzaGlwT3B0aW9uc1wiIC8+XG4gICAgICAgIDxkaXYgdi1lbHNlIDpjbGFzcz1cIiRzdHlsZS5lcnJvclwiPnt7IHQoJ3F1aWNrUHVyY2hhc2Uubm9TaGlwcycpIH19PC9kaXY+XG4gICAgICA8L0FjdGl2ZT5cbiAgICA8L2Zvcm0+XG5cbiAgICA8IS0tIFRvdGFsIENvc3QgU3VtbWFyeSAtLT5cbiAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS50b3RhbENvc3RTZWN0aW9uXCIgdi1pZj1cInNlbGVjdGVkTWF0ZXJpYWxzLnNpemUgPiAwXCI+XG4gICAgICA8c3Bhbj57eyB0KCdxdWlja1B1cmNoYXNlLmVzdGltYXRlZFRvdGFsJykgfX06IDwvc3Bhbj5cbiAgICAgIDxzdHJvbmcgdi1pZj1cInRvdGFsRXN0aW1hdGVkQ29zdC5oYXNBbGxQcmljZXNcIj57eyBmaXhlZDAodG90YWxFc3RpbWF0ZWRDb3N0LnRvdGFsKSB9fTwvc3Ryb25nPlxuICAgICAgPHNwYW4gdi1lbHNlIDpjbGFzcz1cIiRzdHlsZS5ub0RhdGFcIlxuICAgICAgICA+e3sgZml4ZWQwKHRvdGFsRXN0aW1hdGVkQ29zdC50b3RhbCkgfX0rICh7eyB0KCdxdWlja1B1cmNoYXNlLm1pc3NpbmdQcmljZXMnKSB9fSk8L3NwYW5cbiAgICAgID5cbiAgICA8L2Rpdj5cblxuICAgIDwhLS0gUHJpY2UgRmV0Y2ggSGVscGVyIC0tPlxuICAgIDxkaXZcbiAgICAgIDpjbGFzcz1cIiRzdHlsZS5mZXRjaFNlY3Rpb25cIlxuICAgICAgdi1pZj1cIiF0b3RhbEVzdGltYXRlZENvc3QuaGFzQWxsUHJpY2VzICYmIHNlbGVjdGVkTWF0ZXJpYWxzLnNpemUgPiAwXCI+XG4gICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5mZXRjaEluZm9cIj5cbiAgICAgICAge3sgdCgncXVpY2tQdXJjaGFzZS5jcmVhdGVQcmljZUZldGNoRGVzYycpIH19XG4gICAgICA8L2Rpdj5cbiAgICAgIDxQcnVuQnV0dG9uIEBjbGljaz1cIm9uQ3JlYXRlUHJpY2VGZXRjaFwiIDpjbGFzcz1cIiRzdHlsZS5mZXRjaEJ1dHRvblwiIHByaW1hcnk+XG4gICAgICAgIHt7IHQoJ3F1aWNrUHVyY2hhc2UuY3JlYXRlUHJpY2VGZXRjaCcpIH19XG4gICAgICA8L1BydW5CdXR0b24+XG4gICAgPC9kaXY+XG5cbiAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5idXR0b25zXCI+XG4gICAgICA8UHJ1bkJ1dHRvblxuICAgICAgICBwcmltYXJ5XG4gICAgICAgIDpkaXNhYmxlZD1cIiFzZWxlY3RlZFNoaXAgfHwgbWF0ZXJpYWxMaXN0LmFsbC5sZW5ndGggPT09IDBcIlxuICAgICAgICBAY2xpY2s9XCJvbkNvbmZpcm1cIj5cbiAgICAgICAge3sgdCgncXVpY2tQdXJjaGFzZS5jb25maXJtJykgfX1cbiAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwiZW1pdCgnY2xvc2UnKVwiPlxuICAgICAgICB7eyB0KCdxdWlja1B1cmNoYXNlLmNhbmNlbCcpIH19XG4gICAgICA8L1BydW5CdXR0b24+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jb250YWluZXIge1xuICBwYWRkaW5nOiAxNnB4O1xuICBtaW4td2lkdGg6IDQwMHB4O1xufVxuXG4uc2VjdGlvbiB7XG4gIG1hcmdpbjogMTZweCAwO1xufVxuXG4uY2F0ZWdvcnlUaXRsZSB7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgZm9udC13ZWlnaHQ6IDYwMDtcbiAgbWFyZ2luOiAxMnB4IDAgOHB4IDA7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0KTtcbn1cblxuLnJhd01hdGVyaWFsc1NlY3Rpb24ge1xuICBtYXJnaW4tdG9wOiAxNnB4O1xufVxuXG4ubWF0ZXJpYWxUYWJsZSB7XG4gIHdpZHRoOiAxMDAlO1xuICBib3JkZXItY29sbGFwc2U6IGNvbGxhcHNlO1xufVxuXG4ubWF0ZXJpYWxUYWJsZSB0aCxcbi5tYXRlcmlhbFRhYmxlIHRkIHtcbiAgcGFkZGluZzogNHB4IDhweDtcbiAgdGV4dC1hbGlnbjogbGVmdDtcbiAgYm9yZGVyLWJvdHRvbTogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlcik7XG59XG5cbi5tYXRlcmlhbFRhYmxlIHRoIHtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5mb3JtIHtcbiAgbWFyZ2luOiAxNnB4IDA7XG59XG5cbi5mbGV4Um93IHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiAxNnB4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBtYXJnaW4tYm90dG9tOiA4cHg7XG59XG5cbi5zaXRlR3JpZCB7XG4gIGRpc3BsYXk6IGdyaWQ7XG4gIGdyaWQtdGVtcGxhdGUtY29sdW1uczogcmVwZWF0KGF1dG8tZmlsbCwgbWlubWF4KDE4MHB4LCAxZnIpKTtcbiAgZ2FwOiA4cHg7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgbWF4LWhlaWdodDogMTIwcHg7XG4gIG92ZXJmbG93LXk6IGF1dG87XG4gIHBhZGRpbmc6IDhweDtcbiAgYmFja2dyb3VuZDogdmFyKC0tY29sb3ItYmFja2dyb3VuZC1saWdodCk7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlcik7XG59XG5cbi5zaXRlSXRlbSB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIGdhcDogOHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHBhZGRpbmc6IDRweDtcbiAgYm9yZGVyLXJhZGl1czogNHB4O1xufVxuXG4uc2l0ZUl0ZW06aG92ZXIge1xuICBiYWNrZ3JvdW5kOiB2YXIoLS1jb2xvci1iYWNrZ3JvdW5kLWxpZ2h0ZXIpO1xufVxuXG4uc2Nyb2xsVGFibGUge1xuICBtYXgtaGVpZ2h0OiAyMDBweDtcbiAgb3ZlcmZsb3cteTogYXV0bztcbiAgYm9yZGVyOiAxcHggc29saWQgdmFyKC0tY29sb3ItYm9yZGVyKTtcbn1cblxuLmVtcHR5IHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBwYWRkaW5nOiAxNnB4O1xuICBjb2xvcjogdmFyKC0tY29sb3ItdGV4dC1tdXRlZCk7XG59XG5cbi5idXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG4gIG1hcmdpbi10b3A6IDE2cHg7XG59XG5cbi5lcnJvciB7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci1lcnJvcik7XG59XG5cbi5zZWxlY3Rpb25CdXR0b25zIHtcbiAgZGlzcGxheTogZmxleDtcbiAgZ2FwOiA4cHg7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG4gIG1hcmdpbi1ib3R0b206IDEycHg7XG4gIGZsZXgtd3JhcDogd3JhcDtcbn1cblxuLnNlbGVjdGVkQ291bnQge1xuICBtYXJnaW4tbGVmdDogYXV0bztcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG4gIGNvbG9yOiB2YXIoLS1jb2xvci10ZXh0KTtcbn1cblxuLmNsaWNrYWJsZVJvdyB7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLmNsaWNrYWJsZVJvdzpob3ZlciB7XG4gIGJhY2tncm91bmQ6IHZhcigtLWNvbG9yLWJhY2tncm91bmQtbGlnaHRlcik7XG59XG5cbi5ub0RhdGEge1xuICBjb2xvcjogdmFyKC0tY29sb3ItdGV4dC1tdXRlZCk7XG4gIGZvbnQtc3R5bGU6IGl0YWxpYztcbn1cblxuLmxvYWRMaW5rIHtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXByaW1hcnkpO1xuICB0ZXh0LWRlY29yYXRpb246IHVuZGVybGluZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4ubG9hZExpbms6aG92ZXIge1xuICBmaWx0ZXI6IGJyaWdodG5lc3MoMS4yKTtcbn1cblxuLmZldGNoU2VjdGlvbiB7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgcGFkZGluZzogOHB4O1xuICBiYWNrZ3JvdW5kOiByZ2JhKDAsIDAsIDAsIDAuMik7XG4gIGJvcmRlcjogMXB4IHNvbGlkIHZhcigtLWNvbG9yLWJvcmRlcik7XG4gIGJvcmRlci1yYWRpdXM6IDRweDtcbiAgZGlzcGxheTogZmxleDtcbiAgYWxpZ24taXRlbXM6IGNlbnRlcjtcbiAganVzdGlmeS1jb250ZW50OiBzcGFjZS1iZXR3ZWVuO1xufVxuXG4uZmV0Y2hJbmZvIHtcbiAgZm9udC1zaXplOiAwLjllbTtcbiAgY29sb3I6IHZhcigtLWNvbG9yLXRleHQtc3VidGxlKTtcbiAgbWFyZ2luLXJpZ2h0OiAxMnB4O1xuICBmbGV4OiAxO1xufVxuXG4uZmV0Y2hCdXR0b24ge1xuICB3aGl0ZS1zcGFjZTogbm93cmFwO1xuICBmb250LXNpemU6IDAuOWVtO1xuICBwYWRkaW5nOiA0cHggOHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl91bnJlZiIsIl9jcmVhdGVWTm9kZSIsIk51bWJlcklucHV0IiwiX2lzUmVmIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl93aXRoTW9kaWZpZXJzIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfd2l0aERpcmVjdGl2ZXMiLCJfY3JlYXRlQmxvY2siLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUF3QkEsVUFBQSxRQUFBO0FBTUEsVUFBQSxPQUFBO0FBRUEsVUFBQSxZQUFBLENBQUEsT0FBQSxPQUFBLE9BQUEsT0FBQSxPQUFBLEtBQUE7QUFDQSxVQUFBLG1CQUFBLElBQUEsS0FBQTtBQUNBLFVBQUEsZUFBQSxJQUFBLE1BQUE7QUFDQSxVQUFBLGVBQUEsSUFBQSxFQUFBO0FBQ0EsVUFBQSxnQkFBQSxJQUFBLEVBQUE7QUFDQSxVQUFBLGVBQUEsSUFBQSxTQUFBLFNBQUEsS0FBQSxRQUFBO0FBQ0EsVUFBQSxvQkFBQSxJQUFBLElBQUE7QUFHQSxVQUFBLG9CQUFBLElBQUEsb0JBQUEsS0FBQTtBQUVBLFVBQUEsdUJBQUE7QUFBQSxNQUE2QjtBQUFBLE1B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
