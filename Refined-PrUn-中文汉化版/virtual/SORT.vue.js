import { storagesStore } from './storage.js';
import _sfc_main$1 from './PrunButton.vue.js';
import _sfc_main$2 from './ActionBar.vue.js';
import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import _sfc_main$3 from './SortingModeEditor.vue.js';
import { useXitParameters } from './use-xit-parameters.js';
import { objectId } from './object-id.js';
import { getSortingData } from './user-data-sorting.js';
import removeArrayElement from './remove-array-element.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _hoisted_3 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SORT',
  setup(__props) {
    const parameters = useXitParameters();
    const storeId = parameters[0];
    const storage = computed(() => storagesStore.getById(storeId));
    const sortingData = computed(() => getSortingData(storeId));
    function createSortingMode(ev) {
      showTileOverlay(ev, _sfc_main$3, {
        storeId,
        onSave: sorting => sortingData.value.modes.push(sorting),
      });
    }
    function editSortingMode(ev, sorting) {
      showTileOverlay(ev, _sfc_main$3, {
        storeId,
        sorting,
        onSave: saved => Object.assign(sorting, saved),
      });
    }
    function deleteSortingMode(ev, sorting) {
      showConfirmationOverlay(
        ev,
        () => {
          removeArrayElement(sortingData.value.modes, sorting);
        },
        {
          message: `Are you sure you want to delete ${sorting.label}?`,
        },
      );
    }
    async function copySortingMode(sorting) {
      const json = JSON.stringify(sorting);
      await navigator.clipboard.writeText(json);
    }
    async function pasteSortingMode(ev) {
      const clipText = await navigator.clipboard.readText();
      const sorting = JSON.parse(clipText);
      showTileOverlay(ev, _sfc_main$3, {
        storeId,
        sorting,
        onSave: sorting2 => sortingData.value.modes.push(sorting2),
      });
    }
    return (_ctx, _cache) => {
      return !unref(storage)
        ? (openBlock(), createElementBlock('div', _hoisted_1, 'Invalid inventory ID'))
        : (openBlock(),
          createElementBlock(
            Fragment,
            { key: 1 },
            [
              createVNode(_sfc_main$2, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      primary: '',
                      onClick: createSortingMode,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[0] || (_cache[0] = [createTextVNode('CREATE NEW', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$1,
                    {
                      primary: '',
                      onClick: pasteSortingMode,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[1] || (_cache[1] = [createTextVNode('PASTE', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
              createBaseVNode('table', null, [
                _cache[6] ||
                  (_cache[6] = createBaseVNode(
                    'thead',
                    null,
                    [
                      createBaseVNode('tr', null, [
                        createBaseVNode('th', null, 'Name'),
                        createBaseVNode('th', null, 'Categories'),
                        createBaseVNode('th'),
                      ]),
                    ],
                    -1,
                  )),
                !unref(isEmpty)(unref(sortingData).modes)
                  ? (openBlock(),
                    createElementBlock('tbody', _hoisted_2, [
                      (openBlock(true),
                      createElementBlock(
                        Fragment,
                        null,
                        renderList(unref(sortingData).modes, mode => {
                          return (
                            openBlock(),
                            createElementBlock(
                              'tr',
                              {
                                key: unref(objectId)(mode),
                              },
                              [
                                createBaseVNode('td', null, toDisplayString(mode.label), 1),
                                createBaseVNode(
                                  'td',
                                  null,
                                  toDisplayString(mode.categories.map(x => x.name).join(', ')),
                                  1,
                                ),
                                createBaseVNode('td', null, [
                                  createVNode(
                                    _sfc_main$1,
                                    {
                                      primary: '',
                                      onClick: $event => editSortingMode($event, mode),
                                    },
                                    {
                                      default: withCtx(() => [
                                        ...(_cache[2] ||
                                          (_cache[2] = [createTextVNode('edit', -1)])),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['onClick'],
                                  ),
                                  createVNode(
                                    _sfc_main$1,
                                    {
                                      primary: '',
                                      onClick: $event => copySortingMode(mode),
                                    },
                                    {
                                      default: withCtx(() => [
                                        ...(_cache[3] ||
                                          (_cache[3] = [createTextVNode('copy', -1)])),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['onClick'],
                                  ),
                                  createVNode(
                                    _sfc_main$1,
                                    {
                                      danger: '',
                                      onClick: $event => deleteSortingMode($event, mode),
                                    },
                                    {
                                      default: withCtx(() => [
                                        ...(_cache[4] ||
                                          (_cache[4] = [createTextVNode('delete', -1)])),
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
                    ]))
                  : (openBlock(),
                    createElementBlock('tbody', _hoisted_3, [
                      ...(_cache[5] ||
                        (_cache[5] = [
                          createBaseVNode(
                            'tr',
                            null,
                            [createBaseVNode('td', { colspan: '3' }, 'No Sorting Options')],
                            -1,
                          ),
                        ])),
                    ])),
              ]),
            ],
            64,
          ));
    };
  },
});
export { _sfc_main as default };
