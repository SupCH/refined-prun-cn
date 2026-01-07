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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU09SVC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvU09SVC9TT1JULnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9BY3Rpb25CYXIudnVlJztcbmltcG9ydCB7IHNob3dDb25maXJtYXRpb25PdmVybGF5LCBzaG93VGlsZU92ZXJsYXkgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvdGlsZS1vdmVybGF5JztcbmltcG9ydCBTb3J0aW5nTW9kZUVkaXRvciBmcm9tICcuL1NvcnRpbmdNb2RlRWRpdG9yLnZ1ZSc7XG5pbXBvcnQgeyB1c2VYaXRQYXJhbWV0ZXJzIH0gZnJvbSAnQHNyYy9ob29rcy91c2UteGl0LXBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyBvYmplY3RJZCB9IGZyb20gJ0BzcmMvdXRpbHMvb2JqZWN0LWlkJztcbmltcG9ydCB7IGdldFNvcnRpbmdEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEtc29ydGluZyc7XG5pbXBvcnQgcmVtb3ZlQXJyYXlFbGVtZW50IGZyb20gJ0BzcmMvdXRpbHMvcmVtb3ZlLWFycmF5LWVsZW1lbnQnO1xuXG5jb25zdCBwYXJhbWV0ZXJzID0gdXNlWGl0UGFyYW1ldGVycygpO1xuY29uc3Qgc3RvcmVJZCA9IHBhcmFtZXRlcnNbMF07XG5cbmNvbnN0IHN0b3JhZ2UgPSBjb21wdXRlZCgoKSA9PiBzdG9yYWdlc1N0b3JlLmdldEJ5SWQoc3RvcmVJZCkpO1xuY29uc3Qgc29ydGluZ0RhdGEgPSBjb21wdXRlZCgoKSA9PiBnZXRTb3J0aW5nRGF0YShzdG9yZUlkKSk7XG5cbmZ1bmN0aW9uIGNyZWF0ZVNvcnRpbmdNb2RlKGV2OiBFdmVudCkge1xuICBzaG93VGlsZU92ZXJsYXkoZXYsIFNvcnRpbmdNb2RlRWRpdG9yLCB7XG4gICAgc3RvcmVJZCxcbiAgICBvblNhdmU6IHNvcnRpbmcgPT4gc29ydGluZ0RhdGEudmFsdWUubW9kZXMucHVzaChzb3J0aW5nKSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGVkaXRTb3J0aW5nTW9kZShldjogRXZlbnQsIHNvcnRpbmc6IFVzZXJEYXRhLlNvcnRpbmdNb2RlKSB7XG4gIHNob3dUaWxlT3ZlcmxheShldiwgU29ydGluZ01vZGVFZGl0b3IsIHtcbiAgICBzdG9yZUlkLFxuICAgIHNvcnRpbmcsXG4gICAgb25TYXZlOiBzYXZlZCA9PiBPYmplY3QuYXNzaWduKHNvcnRpbmcsIHNhdmVkKSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGRlbGV0ZVNvcnRpbmdNb2RlKGV2OiBFdmVudCwgc29ydGluZzogVXNlckRhdGEuU29ydGluZ01vZGUpIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoXG4gICAgZXYsXG4gICAgKCkgPT4ge1xuICAgICAgcmVtb3ZlQXJyYXlFbGVtZW50KHNvcnRpbmdEYXRhLnZhbHVlLm1vZGVzLCBzb3J0aW5nKTtcbiAgICB9LFxuICAgIHtcbiAgICAgIG1lc3NhZ2U6IGBBcmUgeW91IHN1cmUgeW91IHdhbnQgdG8gZGVsZXRlICR7c29ydGluZy5sYWJlbH0/YCxcbiAgICB9LFxuICApO1xufVxuXG5hc3luYyBmdW5jdGlvbiBjb3B5U29ydGluZ01vZGUoc29ydGluZzogVXNlckRhdGEuU29ydGluZ01vZGUpIHtcbiAgY29uc3QganNvbiA9IEpTT04uc3RyaW5naWZ5KHNvcnRpbmcpO1xuICBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLndyaXRlVGV4dChqc29uKTtcbn1cblxuYXN5bmMgZnVuY3Rpb24gcGFzdGVTb3J0aW5nTW9kZShldjogRXZlbnQpIHtcbiAgY29uc3QgY2xpcFRleHQgPSBhd2FpdCBuYXZpZ2F0b3IuY2xpcGJvYXJkLnJlYWRUZXh0KCk7XG4gIGNvbnN0IHNvcnRpbmcgPSBKU09OLnBhcnNlKGNsaXBUZXh0KTtcblxuICBzaG93VGlsZU92ZXJsYXkoZXYsIFNvcnRpbmdNb2RlRWRpdG9yLCB7XG4gICAgc3RvcmVJZCxcbiAgICBzb3J0aW5nLFxuICAgIG9uU2F2ZTogc29ydGluZyA9PiBzb3J0aW5nRGF0YS52YWx1ZS5tb2Rlcy5wdXNoKHNvcnRpbmcpLFxuICB9KTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgdi1pZj1cIiFzdG9yYWdlXCI+SW52YWxpZCBpbnZlbnRvcnkgSUQ8L2Rpdj5cbiAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICA8QWN0aW9uQmFyPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJjcmVhdGVTb3J0aW5nTW9kZVwiPkNSRUFURSBORVc8L1BydW5CdXR0b24+XG4gICAgICA8UHJ1bkJ1dHRvbiBwcmltYXJ5IEBjbGljaz1cInBhc3RlU29ydGluZ01vZGVcIj5QQVNURTwvUHJ1bkJ1dHRvbj5cbiAgICA8L0FjdGlvbkJhcj5cbiAgICA8dGFibGU+XG4gICAgICA8dGhlYWQ+XG4gICAgICAgIDx0cj5cbiAgICAgICAgICA8dGg+TmFtZTwvdGg+XG4gICAgICAgICAgPHRoPkNhdGVnb3JpZXM8L3RoPlxuICAgICAgICAgIDx0aCAvPlxuICAgICAgICA8L3RyPlxuICAgICAgPC90aGVhZD5cbiAgICAgIDx0Ym9keSB2LWlmPVwiIWlzRW1wdHkoc29ydGluZ0RhdGEubW9kZXMpXCI+XG4gICAgICAgIDx0ciB2LWZvcj1cIm1vZGUgaW4gc29ydGluZ0RhdGEubW9kZXNcIiA6a2V5PVwib2JqZWN0SWQobW9kZSlcIj5cbiAgICAgICAgICA8dGQ+e3sgbW9kZS5sYWJlbCB9fTwvdGQ+XG4gICAgICAgICAgPHRkPnt7IG1vZGUuY2F0ZWdvcmllcy5tYXAoeCA9PiB4Lm5hbWUpLmpvaW4oJywgJykgfX08L3RkPlxuICAgICAgICAgIDx0ZD5cbiAgICAgICAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwiZWRpdFNvcnRpbmdNb2RlKCRldmVudCwgbW9kZSlcIj5lZGl0PC9QcnVuQnV0dG9uPlxuICAgICAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJjb3B5U29ydGluZ01vZGUobW9kZSlcIj5jb3B5PC9QcnVuQnV0dG9uPlxuICAgICAgICAgICAgPFBydW5CdXR0b24gZGFuZ2VyIEBjbGljaz1cImRlbGV0ZVNvcnRpbmdNb2RlKCRldmVudCwgbW9kZSlcIj5kZWxldGU8L1BydW5CdXR0b24+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgICA8dGJvZHkgdi1lbHNlPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRkIGNvbHNwYW49XCIzXCI+Tm8gU29ydGluZyBPcHRpb25zPC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC90ZW1wbGF0ZT5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiU29ydGluZ01vZGVFZGl0b3IiLCJfY3JlYXRlVk5vZGUiLCJBY3Rpb25CYXIiLCJfd2l0aEN0eCIsIlBydW5CdXR0b24iLCJfY3JlYXRlVGV4dFZOb2RlIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9vcGVuQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX3JlbmRlckxpc3QiLCJfdW5yZWYiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsVUFBQSxhQUFBLGlCQUFBO0FBQ0EsVUFBQSxVQUFBLFdBQUEsQ0FBQTtBQUVBLFVBQUEsVUFBQSxTQUFBLE1BQUEsY0FBQSxRQUFBLE9BQUEsQ0FBQTtBQUNBLFVB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
