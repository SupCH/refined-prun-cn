import { subscribe } from './subscribe-async-generator.js';
import { $$, $, _$$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp, FragmentAppScope } from './vue-fragment-app.js';
import { applyCssRule } from './refined-prun-css.js';
import tiles from './tiles.js';
import xit from './xit-registry.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
import $style from './inv-custom-item-sorting.module.css.js';
import { getPlanetBurn } from './burn2.js';
import { storagesStore } from './storage.js';
import _sfc_main$3 from './CategoryHeader.vue.js';
import _sfc_main$2 from './InventorySortControls.vue.js';
import { materialsStore } from './materials.js';
import _sfc_main$4 from './GridMaterialIcon.vue.js';
import _sfc_main from './SORT.vue.js';
import { showBuffer } from './buffers.js';
import { sortMaterials, sortByMaterial } from './sort-materials.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import _sfc_main$1 from './SortCriteria.vue.js';
import { getSortingData } from './user-data-sorting.js';
import { getInvStore } from './store-id.js';
import { reactive, toRef } from './reactivity.esm-bundler.js';
import { isEmpty } from './is-empty.js';
import { computed } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.InventoryView.container), container =>
    applyCustomSorting(tile, container),
  );
}
async function applyCustomSorting(tile, container) {
  const parameter = tile.parameter;
  if (!parameter) {
    return;
  }
  const store = getInvStore(parameter);
  const sortingData = getSortingData(parameter);
  const catSort = computed({
    get: () => sortingData.cat ?? true,
    set: value => (sortingData.cat = value ? void 0 : false),
  });
  const reverseSort = computed({
    get: () => sortingData.reverse ?? false,
    set: value => (sortingData.reverse = value ? true : void 0),
  });
  const sortOptions = await $(container, C.InventorySortControls.controls);
  const inventory = await $(container, C.InventoryView.grid);
  const criterion = Array.from(sortOptions.children);
  for (let i = 1; i < criterion.length; i++) {
    const option = criterion[i];
    option.addEventListener('click', () => {
      sortingData.active = void 0;
      catSort.value = false;
    });
    const isCategorySort = i === 2;
    if (!isCategorySort) {
      continue;
    }
    createFragmentApp(
      _sfc_main$1,
      reactive({
        label: option.textContent ?? 'CAT',
        active: catSort,
        reverse: reverseSort,
        onClick: () => {
          if (catSort.value) {
            reverseSort.value = !reverseSort.value;
          } else {
            sortingData.active = void 0;
            catSort.value = true;
            reverseSort.value = false;
          }
        },
      }),
    ).after(option);
    option.style.display = 'none';
  }
  const burn = computed(() => getPlanetBurn(storagesStore.getById(parameter)?.addressableId));
  const modes = computed(() => {
    const modes2 = sortingData.modes.slice();
    if (burn.value) {
      modes2.push(burnSortingMode);
    }
    return modes2;
  });
  watchEffectWhileNodeAlive(sortOptions, () => {
    if (sortingData.active || catSort.value) {
      sortOptions.classList.add($style.custom);
    } else {
      sortOptions.classList.remove($style.custom);
    }
  });
  createFragmentApp(
    _sfc_main$2,
    reactive({
      sorting: modes,
      activeSort: toRef(() => sortingData.active),
      reverse: reverseSort,
      onModeClick: mode => {
        if (sortingData.active === mode) {
          reverseSort.value = !reverseSort.value;
        } else {
          sortingData.active = mode;
          catSort.value = false;
          reverseSort.value = false;
        }
      },
      onAddClick: () => showBuffer(`XIT SORT ${store?.id.substring(0, 8) ?? parameter}`),
    }),
  ).appendTo(sortOptions);
  const activeMode = computed(() => modes.value.find(x => x.label === sortingData.active));
  const scope = new FragmentAppScope();
  const runSort = () => {
    observer.disconnect();
    scope.begin();
    sortInventory(
      inventory,
      catSort.value ? categorySortingMode : activeMode.value,
      burn.value?.burn,
      reverseSort.value,
    );
    scope.end();
    setTimeout(() => observer.observe(inventory, { childList: true, subtree: true }), 0);
  };
  const observer = new MutationObserver(runSort);
  let first = true;
  watchEffectWhileNodeAlive(inventory, () => {
    [sortingData.reverse, sortingData.active, sortingData.cat, burn.value];
    if (first) {
      first = false;
      runSort();
      return;
    }
    setTimeout(runSort, 50);
  });
}
function sortInventory(inventory, sorting, burn, reverse) {
  if (!sorting) {
    return;
  }
  const gridItems = _$$(inventory, C.GridItemView.container).map(div => ({
    div,
    ticker: _$(div, C.ColoredIcon.label)?.textContent,
  }));
  const categories = sorting.categories.slice();
  if (sorting.burn && burn) {
    const tickers = Object.keys(burn);
    const inputs = new Set(tickers.filter(x => burn[x].type === 'input'));
    const outputs = new Set(tickers.filter(x => burn[x].type === 'output' && !inputs.has(x)));
    const workforce = tickers.filter(
      x => burn[x].type === 'workforce' && !inputs.has(x) && !outputs.has(x),
    );
    categories.push({
      name: 'Consumables',
      materials: workforce,
    });
    categories.push({
      name: 'Inputs',
      materials: [...inputs],
    });
    categories.push({
      name: 'Outputs',
      materials: [...outputs],
    });
  }
  const addedItems = /* @__PURE__ */ new Set();
  const remainingItems = new Set(gridItems);
  if (reverse) {
    categories.reverse();
  }
  for (const category of categories) {
    let materials = category.materials
      .filter(x => !addedItems.has(x))
      .map(x => materialsStore.getByTicker(x))
      .filter(x => x !== void 0);
    if (isEmpty(materials)) {
      continue;
    }
    createFragmentApp(_sfc_main$3, { label: category.name }).appendTo(inventory);
    materials = sortMaterials(materials);
    if (reverse) {
      materials.reverse();
    }
    for (const material of materials) {
      const gridItem = gridItems.find(x => x.ticker === material.ticker);
      if (gridItem) {
        inventory.appendChild(gridItem.div);
        remainingItems.delete(gridItem);
      } else if (sorting.zero) {
        createFragmentApp(_sfc_main$4, {
          ticker: material.ticker,
          amount: 0,
          warning: true,
        }).appendTo(inventory);
      }
      addedItems.add(material.ticker);
    }
  }
  if (remainingItems.size === 0) {
    return;
  }
  if (addedItems.size > 0) {
    createFragmentApp(_sfc_main$3, { label: 'Other' }).appendTo(inventory);
  }
  let otherItems = [...remainingItems].map(x => ({
    div: x.div,
    material: materialsStore.getByTicker(x.ticker),
  }));
  otherItems = sortByMaterial(otherItems, x => x.material);
  if (reverse) {
    otherItems.reverse();
  }
  for (const item of otherItems) {
    inventory.appendChild(item.div);
  }
}
const categorySortingMode = {
  categories: [],
  burn: false,
  zero: false,
};
const burnSortingMode = {
  label: 'BRN',
  categories: [],
  burn: true,
  zero: true,
};
function init() {
  applyCssRule(`.${$style.custom} .${C.InventorySortControls.order} > div`, css.hidden);
  tiles.observe(['INV', 'SHPI'], onTileReady);
  xit.add({
    command: 'SORT',
    name: 'SORTING MODES',
    description: 'Sorting mode editor.',
    mandatoryParameters: 'Inventory Identifier',
    component: () => _sfc_main,
  });
}
features.add(import.meta.url, init, 'INV/SHPI: Adds custom sorting modes to inventories.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW52LWN1c3RvbS1pdGVtLXNvcnRpbmcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9pbnYtY3VzdG9tLWl0ZW0tc29ydGluZy9pbnYtY3VzdG9tLWl0ZW0tc29ydGluZy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuaW1wb3J0ICRzdHlsZSBmcm9tICcuL2ludi1jdXN0b20taXRlbS1zb3J0aW5nLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgQnVyblZhbHVlcywgZ2V0UGxhbmV0QnVybiB9IGZyb20gJ0BzcmMvY29yZS9idXJuJztcbmltcG9ydCB7IHN0b3JhZ2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc3RvcmFnZSc7XG5pbXBvcnQgQ2F0ZWdvcnlIZWFkZXIgZnJvbSAnLi9DYXRlZ29yeUhlYWRlci52dWUnO1xuaW1wb3J0IEludmVudG9yeVNvcnRDb250cm9scyBmcm9tICcuL0ludmVudG9yeVNvcnRDb250cm9scy52dWUnO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcbmltcG9ydCBHcmlkTWF0ZXJpYWxJY29uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9HcmlkTWF0ZXJpYWxJY29uLnZ1ZSc7XG5pbXBvcnQgU09SVCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9TT1JUL1NPUlQudnVlJztcbmltcG9ydCB7IEZyYWdtZW50QXBwU2NvcGUgfSBmcm9tICdAc3JjL3V0aWxzL3Z1ZS1mcmFnbWVudC1hcHAnO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCB7IHNvcnRCeU1hdGVyaWFsLCBzb3J0TWF0ZXJpYWxzIH0gZnJvbSAnQHNyYy9jb3JlL3NvcnQtbWF0ZXJpYWxzJztcbmltcG9ydCB7IHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUgfSBmcm9tICdAc3JjL3V0aWxzL3dhdGNoJztcbmltcG9ydCB7IGlzRW1wdHkgfSBmcm9tICd0cy1leHRyYXMnO1xuaW1wb3J0IFNvcnRDcml0ZXJpYSBmcm9tICdAc3JjL2ZlYXR1cmVzL2Jhc2ljL2ludi1jdXN0b20taXRlbS1zb3J0aW5nL1NvcnRDcml0ZXJpYS52dWUnO1xuaW1wb3J0IHsgZ2V0U29ydGluZ0RhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YS1zb3J0aW5nJztcbmltcG9ydCB7IGdldEludlN0b3JlIH0gZnJvbSAnQHNyYy9jb3JlL3N0b3JlLWlkJztcblxuZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLkludmVudG9yeVZpZXcuY29udGFpbmVyKSwgY29udGFpbmVyID0+XG4gICAgYXBwbHlDdXN0b21Tb3J0aW5nKHRpbGUsIGNvbnRhaW5lciksXG4gICk7XG59XG5cbmFzeW5jIGZ1bmN0aW9uIGFwcGx5Q3VzdG9tU29ydGluZyh0aWxlOiBQcnVuVGlsZSwgY29udGFpbmVyOiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBwYXJhbWV0ZXIgPSB0aWxlLnBhcmFtZXRlcjtcbiAgaWYgKCFwYXJhbWV0ZXIpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBzdG9yZSA9IGdldEludlN0b3JlKHBhcmFtZXRlcik7XG4gIGNvbnN0IHNvcnRpbmdEYXRhID0gZ2V0U29ydGluZ0RhdGEocGFyYW1ldGVyKTtcbiAgY29uc3QgY2F0U29ydCA9IGNvbXB1dGVkKHtcbiAgICBnZXQ6ICgpID0+IHNvcnRpbmdEYXRhLmNhdCA/PyB0cnVlLFxuICAgIHNldDogdmFsdWUgPT4gKHNvcnRpbmdEYXRhLmNhdCA9IHZhbHVlID8gdW5kZWZpbmVkIDogZmFsc2UpLFxuICB9KTtcbiAgY29uc3QgcmV2ZXJzZVNvcnQgPSBjb21wdXRlZCh7XG4gICAgZ2V0OiAoKSA9PiBzb3J0aW5nRGF0YS5yZXZlcnNlID8/IGZhbHNlLFxuICAgIHNldDogdmFsdWUgPT4gKHNvcnRpbmdEYXRhLnJldmVyc2UgPSB2YWx1ZSA/IHRydWUgOiB1bmRlZmluZWQpLFxuICB9KTtcbiAgY29uc3Qgc29ydE9wdGlvbnMgPSBhd2FpdCAkKGNvbnRhaW5lciwgQy5JbnZlbnRvcnlTb3J0Q29udHJvbHMuY29udHJvbHMpO1xuICBjb25zdCBpbnZlbnRvcnkgPSBhd2FpdCAkKGNvbnRhaW5lciwgQy5JbnZlbnRvcnlWaWV3LmdyaWQpO1xuXG4gIC8vIEVudW1lcmF0ZSBjaGlsZHJlbiBpbiBhZHZhbmNlIGJlY2F1c2Ugd2Ugd2lsbCBtb2RpZnkgdGhlIGNvbGxlY3Rpb24gaW4gdGhlIGxvb3AuXG4gIGNvbnN0IGNyaXRlcmlvbiA9IEFycmF5LmZyb20oc29ydE9wdGlvbnMuY2hpbGRyZW4pO1xuXG4gIC8vIFNraXAgdGhlIGZpcnN0IHNvcnRpbmcgb3B0aW9uIGJlY2F1c2UgaXQgaXMgdGhlIGdyaWQvbGlzdCB2aWV3IHN3aXRjaC5cbiAgZm9yIChsZXQgaSA9IDE7IGkgPCBjcml0ZXJpb24ubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBvcHRpb24gPSBjcml0ZXJpb25baV0gYXMgSFRNTEVsZW1lbnQ7XG4gICAgb3B0aW9uLmFkZEV2ZW50TGlzdGVuZXIoJ2NsaWNrJywgKCkgPT4ge1xuICAgICAgc29ydGluZ0RhdGEuYWN0aXZlID0gdW5kZWZpbmVkO1xuICAgICAgY2F0U29ydC52YWx1ZSA9IGZhbHNlO1xuICAgIH0pO1xuICAgIGNvbnN0IGlzQ2F0ZWdvcnlTb3J0ID0gaSA9PT0gMjtcbiAgICBpZiAoIWlzQ2F0ZWdvcnlTb3J0KSB7XG4gICAgICBjb250aW51ZTtcbiAgICB9XG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoXG4gICAgICBTb3J0Q3JpdGVyaWEsXG4gICAgICByZWFjdGl2ZSh7XG4gICAgICAgIGxhYmVsOiBvcHRpb24udGV4dENvbnRlbnQgPz8gJ0NBVCcsXG4gICAgICAgIGFjdGl2ZTogY2F0U29ydCxcbiAgICAgICAgcmV2ZXJzZTogcmV2ZXJzZVNvcnQsXG4gICAgICAgIG9uQ2xpY2s6ICgpID0+IHtcbiAgICAgICAgICBpZiAoY2F0U29ydC52YWx1ZSkge1xuICAgICAgICAgICAgcmV2ZXJzZVNvcnQudmFsdWUgPSAhcmV2ZXJzZVNvcnQudmFsdWU7XG4gICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIHNvcnRpbmdEYXRhLmFjdGl2ZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgICAgIGNhdFNvcnQudmFsdWUgPSB0cnVlO1xuICAgICAgICAgICAgcmV2ZXJzZVNvcnQudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICB9KSxcbiAgICApLmFmdGVyKG9wdGlvbik7XG4gICAgb3B0aW9uLnN0eWxlLmRpc3BsYXkgPSAnbm9uZSc7XG4gIH1cblxuICBjb25zdCBidXJuID0gY29tcHV0ZWQoKCkgPT4gZ2V0UGxhbmV0QnVybihzdG9yYWdlc1N0b3JlLmdldEJ5SWQocGFyYW1ldGVyKT8uYWRkcmVzc2FibGVJZCkpO1xuXG4gIGNvbnN0IG1vZGVzID0gY29tcHV0ZWQoKCkgPT4ge1xuICAgIGNvbnN0IG1vZGVzID0gc29ydGluZ0RhdGEubW9kZXMuc2xpY2UoKTtcbiAgICBpZiAoYnVybi52YWx1ZSkge1xuICAgICAgbW9kZXMucHVzaChidXJuU29ydGluZ01vZGUpO1xuICAgIH1cbiAgICByZXR1cm4gbW9kZXM7XG4gIH0pO1xuXG4gIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUoc29ydE9wdGlvbnMsICgpID0+IHtcbiAgICBpZiAoc29ydGluZ0RhdGEuYWN0aXZlIHx8IGNhdFNvcnQudmFsdWUpIHtcbiAgICAgIHNvcnRPcHRpb25zLmNsYXNzTGlzdC5hZGQoJHN0eWxlLmN1c3RvbSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHNvcnRPcHRpb25zLmNsYXNzTGlzdC5yZW1vdmUoJHN0eWxlLmN1c3RvbSk7XG4gICAgfVxuICB9KTtcblxuICBjcmVhdGVGcmFnbWVudEFwcChcbiAgICBJbnZlbnRvcnlTb3J0Q29udHJvbHMsXG4gICAgcmVhY3RpdmUoe1xuICAgICAgc29ydGluZzogbW9kZXMsXG4gICAgICBhY3RpdmVTb3J0OiB0b1JlZigoKSA9PiBzb3J0aW5nRGF0YS5hY3RpdmUpLFxuICAgICAgcmV2ZXJzZTogcmV2ZXJzZVNvcnQsXG4gICAgICBvbk1vZGVDbGljazogKG1vZGU6IHN0cmluZykgPT4ge1xuICAgICAgICBpZiAoc29ydGluZ0RhdGEuYWN0aXZlID09PSBtb2RlKSB7XG4gICAgICAgICAgcmV2ZXJzZVNvcnQudmFsdWUgPSAhcmV2ZXJzZVNvcnQudmFsdWU7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgc29ydGluZ0RhdGEuYWN0aXZlID0gbW9kZTtcbiAgICAgICAgICBjYXRTb3J0LnZhbHVlID0gZmFsc2U7XG4gICAgICAgICAgcmV2ZXJzZVNvcnQudmFsdWUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgfSxcbiAgICAgIG9uQWRkQ2xpY2s6ICgpID0+IHNob3dCdWZmZXIoYFhJVCBTT1JUICR7c3RvcmU/LmlkLnN1YnN0cmluZygwLCA4KSA/PyBwYXJhbWV0ZXJ9YCksXG4gICAgfSksXG4gICkuYXBwZW5kVG8oc29ydE9wdGlvbnMpO1xuXG4gIGNvbnN0IGFjdGl2ZU1vZGUgPSBjb21wdXRlZCgoKSA9PiBtb2Rlcy52YWx1ZS5maW5kKHggPT4geC5sYWJlbCA9PT0gc29ydGluZ0RhdGEuYWN0aXZlKSk7XG5cbiAgY29uc3Qgc2NvcGUgPSBuZXcgRnJhZ21lbnRBcHBTY29wZSgpO1xuICBjb25zdCBydW5Tb3J0ID0gKCkgPT4ge1xuICAgIG9ic2VydmVyLmRpc2Nvbm5lY3QoKTtcbiAgICBzY29wZS5iZWdpbigpO1xuICAgIHNvcnRJbnZlbnRvcnkoXG4gICAgICBpbnZlbnRvcnksXG4gICAgICBjYXRTb3J0LnZhbHVlID8gY2F0ZWdvcnlTb3J0aW5nTW9kZSA6IGFjdGl2ZU1vZGUudmFsdWUsXG4gICAgICBidXJuLnZhbHVlPy5idXJuLFxuICAgICAgcmV2ZXJzZVNvcnQudmFsdWUsXG4gICAgKTtcbiAgICBzY29wZS5lbmQoKTtcbiAgICBzZXRUaW1lb3V0KCgpID0+IG9ic2VydmVyLm9ic2VydmUoaW52ZW50b3J5LCB7IGNoaWxkTGlzdDogdHJ1ZSwgc3VidHJlZTogdHJ1ZSB9KSwgMCk7XG4gIH07XG4gIGNvbnN0IG9ic2VydmVyID0gbmV3IE11dGF0aW9uT2JzZXJ2ZXIocnVuU29ydCk7XG4gIGxldCBmaXJzdCA9IHRydWU7XG4gIHdhdGNoRWZmZWN0V2hpbGVOb2RlQWxpdmUoaW52ZW50b3J5LCAoKSA9PiB7XG4gICAgLy8gVG91Y2ggcmVhY3RpdmUgdmFsdWVzLlxuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW51c2VkLXZhcnNcbiAgICBjb25zdCBfID0gW3NvcnRpbmdEYXRhLnJldmVyc2UsIHNvcnRpbmdEYXRhLmFjdGl2ZSwgc29ydGluZ0RhdGEuY2F0LCBidXJuLnZhbHVlXTtcbiAgICBpZiAoZmlyc3QpIHtcbiAgICAgIGZpcnN0ID0gZmFsc2U7XG4gICAgICBydW5Tb3J0KCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIHNldFRpbWVvdXQocnVuU29ydCwgNTApO1xuICB9KTtcbn1cblxuZnVuY3Rpb24gc29ydEludmVudG9yeShcbiAgaW52ZW50b3J5OiBFbGVtZW50LFxuICBzb3J0aW5nOiBVc2VyRGF0YS5Tb3J0aW5nTW9kZSB8IHVuZGVmaW5lZCxcbiAgYnVybjogQnVyblZhbHVlcyB8IHVuZGVmaW5lZCxcbiAgcmV2ZXJzZTogYm9vbGVhbixcbikge1xuICBpZiAoIXNvcnRpbmcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBncmlkSXRlbXMgPSBfJCQoaW52ZW50b3J5LCBDLkdyaWRJdGVtVmlldy5jb250YWluZXIpLm1hcChkaXYgPT4gKHtcbiAgICBkaXYsXG4gICAgdGlja2VyOiBfJChkaXYsIEMuQ29sb3JlZEljb24ubGFiZWwpPy50ZXh0Q29udGVudCxcbiAgfSkpO1xuICBjb25zdCBjYXRlZ29yaWVzID0gc29ydGluZy5jYXRlZ29yaWVzLnNsaWNlKCk7XG5cbiAgaWYgKHNvcnRpbmcuYnVybiAmJiBidXJuKSB7XG4gICAgY29uc3QgdGlja2VycyA9IE9iamVjdC5rZXlzKGJ1cm4pO1xuICAgIGNvbnN0IGlucHV0cyA9IG5ldyBTZXQodGlja2Vycy5maWx0ZXIoeCA9PiBidXJuW3hdLnR5cGUgPT09ICdpbnB1dCcpKTtcbiAgICBjb25zdCBvdXRwdXRzID0gbmV3IFNldCh0aWNrZXJzLmZpbHRlcih4ID0+IGJ1cm5beF0udHlwZSA9PT0gJ291dHB1dCcgJiYgIWlucHV0cy5oYXMoeCkpKTtcbiAgICBjb25zdCB3b3JrZm9yY2UgPSB0aWNrZXJzLmZpbHRlcihcbiAgICAgIHggPT4gYnVyblt4XS50eXBlID09PSAnd29ya2ZvcmNlJyAmJiAhaW5wdXRzLmhhcyh4KSAmJiAhb3V0cHV0cy5oYXMoeCksXG4gICAgKTtcblxuICAgIGNhdGVnb3JpZXMucHVzaCh7XG4gICAgICBuYW1lOiAnQ29uc3VtYWJsZXMnLFxuICAgICAgbWF0ZXJpYWxzOiB3b3JrZm9yY2UsXG4gICAgfSk7XG4gICAgY2F0ZWdvcmllcy5wdXNoKHtcbiAgICAgIG5hbWU6ICdJbnB1dHMnLFxuICAgICAgbWF0ZXJpYWxzOiBbLi4uaW5wdXRzXSxcbiAgICB9KTtcbiAgICBjYXRlZ29yaWVzLnB1c2goe1xuICAgICAgbmFtZTogJ091dHB1dHMnLFxuICAgICAgbWF0ZXJpYWxzOiBbLi4ub3V0cHV0c10sXG4gICAgfSk7XG4gIH1cblxuICBjb25zdCBhZGRlZEl0ZW1zID0gbmV3IFNldDxzdHJpbmc+KCk7XG4gIGNvbnN0IHJlbWFpbmluZ0l0ZW1zID0gbmV3IFNldChncmlkSXRlbXMpO1xuXG4gIGlmIChyZXZlcnNlKSB7XG4gICAgY2F0ZWdvcmllcy5yZXZlcnNlKCk7XG4gIH1cblxuICBmb3IgKGNvbnN0IGNhdGVnb3J5IG9mIGNhdGVnb3JpZXMpIHtcbiAgICBsZXQgbWF0ZXJpYWxzID0gY2F0ZWdvcnkubWF0ZXJpYWxzXG4gICAgICAuZmlsdGVyKHggPT4gIWFkZGVkSXRlbXMuaGFzKHgpKVxuICAgICAgLm1hcCh4ID0+IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHgpKVxuICAgICAgLmZpbHRlcih4ID0+IHggIT09IHVuZGVmaW5lZCk7XG4gICAgaWYgKGlzRW1wdHkobWF0ZXJpYWxzKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgY3JlYXRlRnJhZ21lbnRBcHAoQ2F0ZWdvcnlIZWFkZXIsIHsgbGFiZWw6IGNhdGVnb3J5Lm5hbWUgfSkuYXBwZW5kVG8oaW52ZW50b3J5KTtcbiAgICBtYXRlcmlhbHMgPSBzb3J0TWF0ZXJpYWxzKG1hdGVyaWFscyk7XG4gICAgaWYgKHJldmVyc2UpIHtcbiAgICAgIG1hdGVyaWFscy5yZXZlcnNlKCk7XG4gICAgfVxuICAgIGZvciAoY29uc3QgbWF0ZXJpYWwgb2YgbWF0ZXJpYWxzKSB7XG4gICAgICBjb25zdCBncmlkSXRlbSA9IGdyaWRJdGVtcy5maW5kKHggPT4geC50aWNrZXIgPT09IG1hdGVyaWFsLnRpY2tlcik7XG4gICAgICBpZiAoZ3JpZEl0ZW0pIHtcbiAgICAgICAgaW52ZW50b3J5LmFwcGVuZENoaWxkKGdyaWRJdGVtLmRpdik7XG4gICAgICAgIHJlbWFpbmluZ0l0ZW1zLmRlbGV0ZShncmlkSXRlbSk7XG4gICAgICB9IGVsc2UgaWYgKHNvcnRpbmcuemVybykge1xuICAgICAgICBjcmVhdGVGcmFnbWVudEFwcChHcmlkTWF0ZXJpYWxJY29uLCB7XG4gICAgICAgICAgdGlja2VyOiBtYXRlcmlhbC50aWNrZXIsXG4gICAgICAgICAgYW1vdW50OiAwLFxuICAgICAgICAgIHdhcm5pbmc6IHRydWUsXG4gICAgICAgIH0pLmFwcGVuZFRvKGludmVudG9yeSk7XG4gICAgICB9XG4gICAgICBhZGRlZEl0ZW1zLmFkZChtYXRlcmlhbC50aWNrZXIpO1xuICAgIH1cbiAgfVxuXG4gIGlmIChyZW1haW5pbmdJdGVtcy5zaXplID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGFkZGVkSXRlbXMuc2l6ZSA+IDApIHtcbiAgICBjcmVhdGVGcmFnbWVudEFwcChDYXRlZ29yeUhlYWRlciwgeyBsYWJlbDogJ090aGVyJyB9KS5hcHBlbmRUbyhpbnZlbnRvcnkpO1xuICB9XG4gIGxldCBvdGhlckl0ZW1zID0gWy4uLnJlbWFpbmluZ0l0ZW1zXS5tYXAoeCA9PiAoe1xuICAgIGRpdjogeC5kaXYsXG4gICAgbWF0ZXJpYWw6IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHgudGlja2VyKSxcbiAgfSkpO1xuICBvdGhlckl0ZW1zID0gc29ydEJ5TWF0ZXJpYWwob3RoZXJJdGVtcywgeCA9PiB4Lm1hdGVyaWFsKTtcbiAgaWYgKHJldmVyc2UpIHtcbiAgICBvdGhlckl0ZW1zLnJldmVyc2UoKTtcbiAgfVxuICBmb3IgKGNvbnN0IGl0ZW0gb2Ygb3RoZXJJdGVtcykge1xuICAgIGludmVudG9yeS5hcHBlbmRDaGlsZChpdGVtLmRpdik7XG4gIH1cbn1cblxuY29uc3QgY2F0ZWdvcnlTb3J0aW5nTW9kZSA9IHtcbiAgbGFiZWw6ICdDQVQnLFxuICBjYXRlZ29yaWVzOiBbXSxcbiAgYnVybjogZmFsc2UsXG4gIHplcm86IGZhbHNlLFxufTtcblxuY29uc3QgYnVyblNvcnRpbmdNb2RlID0ge1xuICBsYWJlbDogJ0JSTicsXG4gIGNhdGVnb3JpZXM6IFtdLFxuICBidXJuOiB0cnVlLFxuICB6ZXJvOiB0cnVlLFxufTtcblxuZnVuY3Rpb24gaW5pdCgpIHtcbiAgYXBwbHlDc3NSdWxlKGAuJHskc3R5bGUuY3VzdG9tfSAuJHtDLkludmVudG9yeVNvcnRDb250cm9scy5vcmRlcn0gPiBkaXZgLCBjc3MuaGlkZGVuKTtcbiAgdGlsZXMub2JzZXJ2ZShbJ0lOVicsICdTSFBJJ10sIG9uVGlsZVJlYWR5KTtcbiAgeGl0LmFkZCh7XG4gICAgY29tbWFuZDogJ1NPUlQnLFxuICAgIG5hbWU6ICdTT1JUSU5HIE1PREVTJyxcbiAgICBkZXNjcmlwdGlvbjogJ1NvcnRpbmcgbW9kZSBlZGl0b3IuJyxcbiAgICBtYW5kYXRvcnlQYXJhbWV0ZXJzOiAnSW52ZW50b3J5IElkZW50aWZpZXInLFxuICAgIGNvbXBvbmVudDogKCkgPT4gU09SVCxcbiAgfSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdJTlYvU0hQSTogQWRkcyBjdXN0b20gc29ydGluZyBtb2RlcyB0byBpbnZlbnRvcmllcy4nKTtcbiJdLCJuYW1lcyI6WyJTb3J0Q3JpdGVyaWEiLCJJbnZlbnRvcnlTb3J0Q29udHJvbHMiLCJDYXRlZ29yeUhlYWRlciIsIkdyaWRNYXRlcmlhbEljb24iLCJTT1JUIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWtCQSxTQUFBLFlBQUEsTUFBQTtBQUNFO0FBQUEsSUFBQSxHQUFBLEtBQUEsUUFBQSxFQUFBLGNBQUEsU0FBQTtBQUFBLElBQW1ELENBQUEsY0FBQSxtQkFBQSxNQUFBLFNBQUE7QUFBQSxFQUNmO0FBRXRDO0FBRUEsZUFBQSxtQkFBQSxNQUFBLFdBQUE7QUFDRSxRQUFBLFlBQUEsS0FBQTtBQUNBLE1BQUEsQ0FBQSxXQUFBO0FBQ0U7QUFBQSxFQUFBO0FBR0YsUUFBQSxRQUFBLFlBQUEsU0FBQTtBQUNBLFFBQUEsY0FBQSxlQUFBLFNBQUE7QUFDQSxRQUFBLFVBQUEsU0FBQTtBQUFBLElBQXlCLEtBQUEsTUFBQSxZQUFBLE9BQUE7QUFBQSxJQUNPLEtBQUEsQ0FBQSxVQUFBLFlBQUEsTUFBQSxRQUFBLFNBQUE7QUFBQSxFQUN1QixDQUFBO0FBRXZELFFBQUEsY0FBQSxTQUFBO0FBQUEsSUFBNkIsS0FBQSxNQUFBLFlBQUEsV0FBQTtBQUFBLElBQ08sS0FBQSxDQUFBLFVBQUEsWUFBQSxVQUFBLFFBQUEsT0FBQTtBQUFBLEVBQ2tC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
