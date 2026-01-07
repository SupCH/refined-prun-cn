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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSEVBTFRILnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9IRUFMVEgudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBzaXRlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NpdGVzJztcbmltcG9ydCB7IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9hZGRyZXNzZXMnO1xuaW1wb3J0IHsgd29ya2ZvcmNlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3dvcmtmb3JjZXMnO1xuaW1wb3J0IHsgcHJvZHVjdGlvblN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3Byb2R1Y3Rpb24nO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IHdhcmVob3VzZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS93YXJlaG91c2VzJztcbmltcG9ydCB7IGNvbnRyYWN0c1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NvbnRyYWN0cyc7XG5pbXBvcnQgeyBjeG9zU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY3hvcyc7XG5pbXBvcnQgeyBmeG9zU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvZnhvcyc7XG5pbXBvcnQgeyBiYWxhbmNlc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2JhbGFuY2VzJztcbmltcG9ydCB7IGN4U3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL2Zpby9jeCc7XG5pbXBvcnQgeyBkYXlqc0VhY2hTZWNvbmQgfSBmcm9tICdAc3JjL3V0aWxzL2RheWpzJztcbmltcG9ydCB7IG9iamVjdElkIH0gZnJvbSAnQHNyYy91dGlscy9vYmplY3QtaWQnO1xuXG5jb25zdCBiYXNlcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgcmV0dXJuIChcbiAgICBzaXRlc1N0b3JlLmFsbC52YWx1ZT8ubWFwKHNpdGUgPT4gKHtcbiAgICAgIG5hbWU6IGdldEVudGl0eU5hbWVGcm9tQWRkcmVzcyhzaXRlLmFkZHJlc3MpISxcbiAgICAgIHdvcmtmb3JjZTogISF3b3JrZm9yY2VzU3RvcmUuZ2V0QnlJZChzaXRlLnNpdGVJZCksXG4gICAgICBwcm9kdWN0aW9uOiAhIXByb2R1Y3Rpb25TdG9yZS5nZXRCeVNpdGVJZChzaXRlLnNpdGVJZCksXG4gICAgICBzdG9yYWdlOiAhIXN0b3JhZ2VzU3RvcmUuZ2V0QnlBZGRyZXNzYWJsZUlkKHNpdGUuc2l0ZUlkKSxcbiAgICB9KSkgPz8gW11cbiAgKTtcbn0pO1xuXG5jb25zdCBvdGhlckRhdGEgPSBjb21wdXRlZCgoKSA9PiBbXG4gIFsnQmFzZSBTaXRlcycsIHNpdGVzU3RvcmUuYWxsLnZhbHVlPy5sZW5ndGhdLFxuICBbJ1dhcmVob3VzZSBTaXRlcycsIHdhcmVob3VzZXNTdG9yZS5hbGwudmFsdWU/Lmxlbmd0aF0sXG4gIFsnQmFzZSBTdG9yZXMnLCBzdG9yYWdlc1N0b3JlLmFsbC52YWx1ZT8uZmlsdGVyKHggPT4geC50eXBlID09PSAnU1RPUkUnKS5sZW5ndGhdLFxuICBbJ1dhcmVob3VzZSBTdG9yZXMnLCBzdG9yYWdlc1N0b3JlLmFsbC52YWx1ZT8uZmlsdGVyKHggPT4geC50eXBlID09PSAnV0FSRUhPVVNFX1NUT1JFJykubGVuZ3RoXSxcbiAgWydTaGlwIFN0b3JlcycsIHN0b3JhZ2VzU3RvcmUuYWxsLnZhbHVlPy5maWx0ZXIoeCA9PiB4LnR5cGUgPT09ICdTSElQX1NUT1JFJykubGVuZ3RoXSxcbiAgWydXb3JrZm9yY2VzJywgd29ya2ZvcmNlc1N0b3JlLmFsbC52YWx1ZT8ubGVuZ3RoXSxcbiAgWydQcm9kdWN0aW9uIFNpdGVzJywgcHJvZHVjdGlvblN0b3JlLmFsbC52YWx1ZT8ubGVuZ3RoXSxcbiAgWydDb250cmFjdHMnLCBjb250cmFjdHNTdG9yZS5hbGwudmFsdWU/Lmxlbmd0aF0sXG4gIFsnQ1hPUycsIGN4b3NTdG9yZS5hbGwudmFsdWU/Lmxlbmd0aF0sXG4gIFsnRlhPUycsIGZ4b3NTdG9yZS5hbGwudmFsdWU/Lmxlbmd0aF0sXG4gIFsnQ3VycmVuY3knLCAoYmFsYW5jZXNTdG9yZS5hbGwudmFsdWU/Lmxlbmd0aCA/PyAwKSA+IDBdLFxuICBbJ0xhc3QgQ1ggUHJpY2UgVXBkYXRlJywgY3hTdG9yZS5mZXRjaGVkID8gYCR7ZGF5anNFYWNoU2Vjb25kLnZhbHVlLnRvKGN4U3RvcmUuYWdlKX1gIDogZmFsc2VdLFxuXSk7XG5cbmNvbnN0IHBvc2l0aXZlID0gQy5Db2xvcmVkVmFsdWUucG9zaXRpdmU7XG5jb25zdCBuZWdhdGl2ZSA9IEMuQ29sb3JlZFZhbHVlLm5lZ2F0aXZlO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6c3R5bGU9XCJ7IHBhZGRpbmdUb3A6ICc0cHgnIH1cIj5cbiAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCI+QmFzZXM8L3NwYW4+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPlBsYW5ldDwvdGg+XG4gICAgICAgICAgPHRoPldvcmtmb3JjZTwvdGg+XG4gICAgICAgICAgPHRoPlByb2R1Y3Rpb248L3RoPlxuICAgICAgICAgIDx0aD5TdG9yYWdlPC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0ciB2LWZvcj1cImJhc2UgaW4gYmFzZXNcIiA6a2V5PVwiYmFzZS5uYW1lXCI+XG4gICAgICAgICAgPHRkPnt7IGJhc2UubmFtZSB9fTwvdGQ+XG4gICAgICAgICAgPHRkIHYtaWY9XCJiYXNlLndvcmtmb3JjZVwiIDpjbGFzcz1cInBvc2l0aXZlXCI+4pyTPC90ZD5cbiAgICAgICAgICA8dGQgdi1lbHNlIDpjbGFzcz1cIm5lZ2F0aXZlXCI+4pyXPC90ZD5cbiAgICAgICAgICA8dGQgdi1pZj1cImJhc2UucHJvZHVjdGlvblwiIDpjbGFzcz1cInBvc2l0aXZlXCI+4pyTPC90ZD5cbiAgICAgICAgICA8dGQgdi1lbHNlIDpjbGFzcz1cIm5lZ2F0aXZlXCI+4pyXPC90ZD5cbiAgICAgICAgICA8dGQgdi1pZj1cImJhc2Uuc3RvcmFnZVwiIDpjbGFzcz1cInBvc2l0aXZlXCI+4pyTPC90ZD5cbiAgICAgICAgICA8dGQgdi1lbHNlIDpjbGFzcz1cIm5lZ2F0aXZlXCI+4pyXPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgICA8c3BhbiBjbGFzcz1cInRpdGxlXCIgc3R5bGU9XCJwYWRkaW5nLXRvcDogMTBweFwiPk90aGVyIERhdGE8L3NwYW4+XG4gICAgPHRhYmxlIDpzdHlsZT1cInsgdGFibGVMYXlvdXQ6ICdmaXhlZCcgfVwiPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPlBhcmFtZXRlcjwvdGg+XG4gICAgICAgICAgPHRoPlZhbHVlPC90aD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGhlYWQ+XG4gICAgICA8dGJvZHk+XG4gICAgICAgIDx0ciB2LWZvcj1cIm90aGVyIGluIG90aGVyRGF0YVwiIDprZXk9XCJvYmplY3RJZChvdGhlcilcIj5cbiAgICAgICAgICA8dGQ+e3sgb3RoZXJbMF0gfX08L3RkPlxuICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgIDxzcGFuIHYtaWY9XCJvdGhlclsxXSA9PT0gdHJ1ZVwiIDpjbGFzcz1cInBvc2l0aXZlXCI+4pyTPC9zcGFuPlxuICAgICAgICAgICAgPHNwYW4gdi1lbHNlLWlmPVwib3RoZXJbMV0gPT09IGZhbHNlIHx8IG90aGVyWzFdID09PSB1bmRlZmluZWRcIiA6Y2xhc3M9XCJuZWdhdGl2ZVwiPlxuICAgICAgICAgICAgICDinJdcbiAgICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICAgIDx0ZW1wbGF0ZSB2LWVsc2U+e3sgb3RoZXJbMV0gfX08L3RlbXBsYXRlPlxuICAgICAgICAgIDwvdGQ+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3Rib2R5PlxuICAgIDwvdGFibGU+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl91bnJlZiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsVUFBQSxRQUFBLFNBQUEsTUFBQTtBQUNFLGFBQUEsV0FBQSxJQUFBLE9BQUEsSUFBQSxDQUFBLFVBQUE7QUFBQSxRQUNxQyxNQUFBLHlCQUFBLEtBQUEsT0FBQTtBQUFBLFFBQ1UsV0FBQSxDQUFBLENBQUEsZ0JBQUEsUUFBQSxLQUFBLE1BQUE7QUFBQSxRQUNLLFlBQUEsQ0FBQSxDQUFBLGdCQUFBLFlBQUEsS0FBQSxNQUFBO0FBQUEsUUFDSyxTQUFBLENBQUEsQ0FBQSxjQUFBLG1CQUFBLEtBQUEsTUFBQTtBQUFBLE1BQ0UsRUFBQSxLQUFBLENBQUE7QUFBQSxJQUNqRCxDQUFBO0FBSVosVUFBQSxZQUFBLFNBQUEsTUFBQTtBQUFBLE1BQWlDLENBQUEsY0FBQSxXQUFBLElBQUEsT0FBQSxNQUFBO0FBQUEsTUFDWSxDQUFBLG1CQUFBLGdCQUFBLElBQUEsT0FBQSxNQUFBO0FBQUEsTUFDVSxDQUFBLGVBQUEsY0FBQSxJQUFBLE9BQUEsT0FBQSxDQUFBLE1BQUEsRUFBQSxTQUFBLE9B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
