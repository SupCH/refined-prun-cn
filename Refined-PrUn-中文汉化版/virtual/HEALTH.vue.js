import { C } from './prun-css.js';
import { sitesStore } from './sites.js';
import { getEntityNameFromAddress } from './addresses.js';
import { workforcesStore } from './workforces.js';
import { productionStore } from './production.js';
import { storagesStore } from './storage.js';
import { warehousesStore } from './warehouses.js';
import { contractsStore } from './contracts.js';
import { cxosStore } from './cxos.js';
import { fxosStore } from './fxos.js';
import { balancesStore } from './balances.js';
import { cxStore } from './cx.js';
import { dayjsEachSecond } from './dayjs.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { paddingTop: '4px' } };
const _hoisted_2 = { style: { tableLayout: 'fixed' } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'HEALTH',
  setup(__props) {
    const bases = computed(() => {
      return (
        sitesStore.all.value?.map(site => ({
          name: getEntityNameFromAddress(site.address),
          workforce: !!workforcesStore.getById(site.siteId),
          production: !!productionStore.getBySiteId(site.siteId),
          storage: !!storagesStore.getByAddressableId(site.siteId),
        })) ?? []
      );
    });
    const otherData = computed(() => [
      ['Base Sites', sitesStore.all.value?.length],
      ['Warehouse Sites', warehousesStore.all.value?.length],
      ['Base Stores', storagesStore.all.value?.filter(x => x.type === 'STORE').length],
      [
        'Warehouse Stores',
        storagesStore.all.value?.filter(x => x.type === 'WAREHOUSE_STORE').length,
      ],
      ['Ship Stores', storagesStore.all.value?.filter(x => x.type === 'SHIP_STORE').length],
      ['Workforces', workforcesStore.all.value?.length],
      ['Production Sites', productionStore.all.value?.length],
      ['Contracts', contractsStore.all.value?.length],
      ['CXOS', cxosStore.all.value?.length],
      ['FXOS', fxosStore.all.value?.length],
      ['Currency', (balancesStore.all.value?.length ?? 0) > 0],
      [
        'Last CX Price Update',
        cxStore.fetched ? `${dayjsEachSecond.value.to(cxStore.age)}` : false,
      ],
    ]);
    const positive = C.ColoredValue.positive;
    const negative = C.ColoredValue.negative;
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          _cache[2] || (_cache[2] = createBaseVNode('span', { class: 'title' }, 'Bases', -1)),
          createBaseVNode('table', null, [
            _cache[0] ||
              (_cache[0] = createBaseVNode(
                'thead',
                null,
                [
                  createBaseVNode('tr', null, [
                    createBaseVNode('th', null, 'Planet'),
                    createBaseVNode('th', null, 'Workforce'),
                    createBaseVNode('th', null, 'Production'),
                    createBaseVNode('th', null, 'Storage'),
                  ]),
                ],
                -1,
              )),
            createBaseVNode('tbody', null, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(unref(bases), base => {
                  return (
                    openBlock(),
                    createElementBlock(
                      'tr',
                      {
                        key: base.name,
                      },
                      [
                        createBaseVNode('td', null, toDisplayString(base.name), 1),
                        base.workforce
                          ? (openBlock(),
                            createElementBlock(
                              'td',
                              {
                                key: 0,
                                class: normalizeClass(unref(positive)),
                              },
                              '✓',
                              2,
                            ))
                          : (openBlock(),
                            createElementBlock(
                              'td',
                              {
                                key: 1,
                                class: normalizeClass(unref(negative)),
                              },
                              '✗',
                              2,
                            )),
                        base.production
                          ? (openBlock(),
                            createElementBlock(
                              'td',
                              {
                                key: 2,
                                class: normalizeClass(unref(positive)),
                              },
                              '✓',
                              2,
                            ))
                          : (openBlock(),
                            createElementBlock(
                              'td',
                              {
                                key: 3,
                                class: normalizeClass(unref(negative)),
                              },
                              '✗',
                              2,
                            )),
                        base.storage
                          ? (openBlock(),
                            createElementBlock(
                              'td',
                              {
                                key: 4,
                                class: normalizeClass(unref(positive)),
                              },
                              '✓',
                              2,
                            ))
                          : (openBlock(),
                            createElementBlock(
                              'td',
                              {
                                key: 5,
                                class: normalizeClass(unref(negative)),
                              },
                              '✗',
                              2,
                            )),
                      ],
                    )
                  );
                }),
                128,
              )),
            ]),
          ]),
          _cache[3] ||
            (_cache[3] = createBaseVNode(
              'span',
              {
                class: 'title',
                style: { 'padding-top': '10px' },
              },
              'Other Data',
              -1,
            )),
          createBaseVNode('table', _hoisted_2, [
            _cache[1] ||
              (_cache[1] = createBaseVNode(
                'thead',
                null,
                [
                  createBaseVNode('tr', null, [
                    createBaseVNode('th', null, 'Parameter'),
                    createBaseVNode('th', null, 'Value'),
                  ]),
                ],
                -1,
              )),
            createBaseVNode('tbody', null, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(unref(otherData), other => {
                  return (
                    openBlock(),
                    createElementBlock(
                      'tr',
                      {
                        key: unref(objectId)(other),
                      },
                      [
                        createBaseVNode('td', null, toDisplayString(other[0]), 1),
                        createBaseVNode('td', null, [
                          other[1] === true
                            ? (openBlock(),
                              createElementBlock(
                                'span',
                                {
                                  key: 0,
                                  class: normalizeClass(unref(positive)),
                                },
                                '✓',
                                2,
                              ))
                            : other[1] === false || other[1] === void 0
                              ? (openBlock(),
                                createElementBlock(
                                  'span',
                                  {
                                    key: 1,
                                    class: normalizeClass(unref(negative)),
                                  },
                                  ' ✗ ',
                                  2,
                                ))
                              : (openBlock(),
                                createElementBlock(
                                  Fragment,
                                  { key: 2 },
                                  [createTextVNode(toDisplayString(other[1]), 1)],
                                  64,
                                )),
                        ]),
                      ],
                    )
                  );
                }),
                128,
              )),
            ]),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
