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
