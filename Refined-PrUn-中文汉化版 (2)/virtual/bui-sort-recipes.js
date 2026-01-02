import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$, _$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { compareMaterials } from './sort-materials.js';
import { materialsStore } from './materials.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.BuildingInformation.recipeList), recipeList => {
    const recipes = _$$(recipeList, C.BuildingInformation.recipe);
    const parsed = recipes.map(parseRecipe);
    parsed.sort(compareRecipes);
    for (const recipe of parsed) {
      recipeList.appendChild(recipe.element);
      if (recipe.inputsContainer) {
        for (const input of recipe.inputs ?? []) {
          recipe.inputsContainer.appendChild(input.element);
        }
      }
      if (recipe.outputsContainer) {
        for (const output of recipe.outputs ?? []) {
          recipe.outputsContainer.appendChild(output.element);
        }
      }
    }
  });
}
function parseRecipe(element) {
  const inputsContainer = _$(element, C.BuildingInformation.inputs);
  if (!inputsContainer) {
    return {
      element,
    };
  }
  const allMaterials = _$$(element, C.MaterialIcon.container);
  const inputMaterials = _$$(inputsContainer, C.MaterialIcon.container);
  const outputMaterials = allMaterials.filter(x => !inputMaterials.includes(x));
  const outputsContainer = outputMaterials[0]?.parentElement ?? void 0;
  return {
    element,
    inputsContainer,
    inputs: inputMaterials
      .map(parseMaterialAmount)
      .sort((a, b) => compareMaterials(a.material, b.material)),
    outputsContainer,
    outputs: outputMaterials
      .map(parseMaterialAmount)
      .sort((a, b) => compareMaterials(a.material, b.material)),
  };
}
function parseMaterialAmount(element) {
  const material = materialsStore.getByTicker(_$(element, C.ColoredIcon.label)?.textContent);
  const amount = Number(_$(element, C.MaterialIcon.indicator)?.textContent ?? 0);
  return { element, material, amount };
}
function compareRecipes(a, b) {
  if (!a.outputs && !b.outputs) {
    return 0;
  }
  if (!a.outputs) {
    return 1;
  }
  if (!b.outputs) {
    return -1;
  }
  const result = compareMaterialList(a.outputs, b.outputs);
  if (result !== 0) {
    return result;
  }
  return compareMaterialList(a.inputs ?? [], b.inputs ?? []);
}
function compareMaterialList(a, b) {
  const length = Math.min(a.length, b.length);
  for (let i = 0; i < length; i++) {
    if (a.length <= i) {
      return -1;
    }
    if (b.length <= i) {
      return 1;
    }
    const result = compareMaterials(a[i].material, b[i].material);
    if (result !== 0) {
      return result;
    }
    if (a[i].amount < b[i].amount) {
      return -1;
    }
    if (a[i].amount > b[i].amount) {
      return 1;
    }
  }
  return 0;
}
function init() {
  tiles.observe('BUI', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BUI: Sorts the recipes and materials by category/ticker/amount sort order.',
);
