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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnVpLXNvcnQtcmVjaXBlcy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2J1aS1zb3J0LXJlY2lwZXMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgY29tcGFyZU1hdGVyaWFscyB9IGZyb20gJ0BzcmMvY29yZS9zb3J0LW1hdGVyaWFscyc7XG5pbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuXG5pbnRlcmZhY2UgUmVjaXBlIHtcbiAgZWxlbWVudDogSFRNTEVsZW1lbnQ7XG4gIGlucHV0c0NvbnRhaW5lcj86IEhUTUxFbGVtZW50O1xuICBpbnB1dHM/OiBNYXRlcmlhbEFtb3VudFtdO1xuICBvdXRwdXRzQ29udGFpbmVyPzogSFRNTEVsZW1lbnQ7XG4gIG91dHB1dHM/OiBNYXRlcmlhbEFtb3VudFtdO1xufVxuXG5pbnRlcmZhY2UgTWF0ZXJpYWxBbW91bnQge1xuICBlbGVtZW50OiBIVE1MRWxlbWVudDtcbiAgbWF0ZXJpYWw6IFBydW5BcGkuTWF0ZXJpYWwgfCB1bmRlZmluZWQ7XG4gIGFtb3VudDogbnVtYmVyO1xufVxuXG5mdW5jdGlvbiBvblRpbGVSZWFkeSh0aWxlOiBQcnVuVGlsZSkge1xuICBzdWJzY3JpYmUoJCQodGlsZS5hbmNob3IsIEMuQnVpbGRpbmdJbmZvcm1hdGlvbi5yZWNpcGVMaXN0KSwgcmVjaXBlTGlzdCA9PiB7XG4gICAgY29uc3QgcmVjaXBlcyA9IF8kJChyZWNpcGVMaXN0LCBDLkJ1aWxkaW5nSW5mb3JtYXRpb24ucmVjaXBlKTtcbiAgICBjb25zdCBwYXJzZWQgPSByZWNpcGVzLm1hcChwYXJzZVJlY2lwZSk7XG4gICAgcGFyc2VkLnNvcnQoY29tcGFyZVJlY2lwZXMpO1xuICAgIGZvciAoY29uc3QgcmVjaXBlIG9mIHBhcnNlZCkge1xuICAgICAgcmVjaXBlTGlzdC5hcHBlbmRDaGlsZChyZWNpcGUuZWxlbWVudCk7XG4gICAgICBpZiAocmVjaXBlLmlucHV0c0NvbnRhaW5lcikge1xuICAgICAgICBmb3IgKGNvbnN0IGlucHV0IG9mIHJlY2lwZS5pbnB1dHMgPz8gW10pIHtcbiAgICAgICAgICByZWNpcGUuaW5wdXRzQ29udGFpbmVyLmFwcGVuZENoaWxkKGlucHV0LmVsZW1lbnQpO1xuICAgICAgICB9XG4gICAgICB9XG4gICAgICBpZiAocmVjaXBlLm91dHB1dHNDb250YWluZXIpIHtcbiAgICAgICAgZm9yIChjb25zdCBvdXRwdXQgb2YgcmVjaXBlLm91dHB1dHMgPz8gW10pIHtcbiAgICAgICAgICByZWNpcGUub3V0cHV0c0NvbnRhaW5lci5hcHBlbmRDaGlsZChvdXRwdXQuZWxlbWVudCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwYXJzZVJlY2lwZShlbGVtZW50OiBIVE1MRWxlbWVudCk6IFJlY2lwZSB7XG4gIGNvbnN0IGlucHV0c0NvbnRhaW5lciA9IF8kKGVsZW1lbnQsIEMuQnVpbGRpbmdJbmZvcm1hdGlvbi5pbnB1dHMpO1xuICBpZiAoIWlucHV0c0NvbnRhaW5lcikge1xuICAgIHJldHVybiB7XG4gICAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgIH07XG4gIH1cblxuICBjb25zdCBhbGxNYXRlcmlhbHMgPSBfJCQoZWxlbWVudCwgQy5NYXRlcmlhbEljb24uY29udGFpbmVyKTtcbiAgY29uc3QgaW5wdXRNYXRlcmlhbHMgPSBfJCQoaW5wdXRzQ29udGFpbmVyLCBDLk1hdGVyaWFsSWNvbi5jb250YWluZXIpO1xuICBjb25zdCBvdXRwdXRNYXRlcmlhbHMgPSBhbGxNYXRlcmlhbHMuZmlsdGVyKHggPT4gIWlucHV0TWF0ZXJpYWxzLmluY2x1ZGVzKHgpKTtcbiAgY29uc3Qgb3V0cHV0c0NvbnRhaW5lciA9IG91dHB1dE1hdGVyaWFsc1swXT8ucGFyZW50RWxlbWVudCA/PyB1bmRlZmluZWQ7XG5cbiAgcmV0dXJuIHtcbiAgICBlbGVtZW50OiBlbGVtZW50LFxuICAgIGlucHV0c0NvbnRhaW5lcixcbiAgICBpbnB1dHM6IGlucHV0TWF0ZXJpYWxzXG4gICAgICAubWFwKHBhcnNlTWF0ZXJpYWxBbW91bnQpXG4gICAgICAuc29ydCgoYSwgYikgPT4gY29tcGFyZU1hdGVyaWFscyhhLm1hdGVyaWFsLCBiLm1hdGVyaWFsKSksXG4gICAgb3V0cHV0c0NvbnRhaW5lcixcbiAgICBvdXRwdXRzOiBvdXRwdXRNYXRlcmlhbHNcbiAgICAgIC5tYXAocGFyc2VNYXRlcmlhbEFtb3VudClcbiAgICAgIC5zb3J0KChhLCBiKSA9PiBjb21wYXJlTWF0ZXJpYWxzKGEubWF0ZXJpYWwsIGIubWF0ZXJpYWwpKSxcbiAgfTtcbn1cblxuZnVuY3Rpb24gcGFyc2VNYXRlcmlhbEFtb3VudChlbGVtZW50OiBIVE1MRWxlbWVudCk6IE1hdGVyaWFsQW1vdW50IHtcbiAgY29uc3QgbWF0ZXJpYWwgPSBtYXRlcmlhbHNTdG9yZS5nZXRCeVRpY2tlcihfJChlbGVtZW50LCBDLkNvbG9yZWRJY29uLmxhYmVsKT8udGV4dENvbnRlbnQpO1xuICBjb25zdCBhbW91bnQgPSBOdW1iZXIoXyQoZWxlbWVudCwgQy5NYXRlcmlhbEljb24uaW5kaWNhdG9yKT8udGV4dENvbnRlbnQgPz8gMCk7XG4gIHJldHVybiB7IGVsZW1lbnQsIG1hdGVyaWFsLCBhbW91bnQgfTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZVJlY2lwZXMoYTogUmVjaXBlLCBiOiBSZWNpcGUpIHtcbiAgaWYgKCFhLm91dHB1dHMgJiYgIWIub3V0cHV0cykge1xuICAgIHJldHVybiAwO1xuICB9XG5cbiAgaWYgKCFhLm91dHB1dHMpIHtcbiAgICByZXR1cm4gMTtcbiAgfVxuXG4gIGlmICghYi5vdXRwdXRzKSB7XG4gICAgcmV0dXJuIC0xO1xuICB9XG5cbiAgY29uc3QgcmVzdWx0ID0gY29tcGFyZU1hdGVyaWFsTGlzdChhLm91dHB1dHMsIGIub3V0cHV0cyk7XG4gIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9XG5cbiAgcmV0dXJuIGNvbXBhcmVNYXRlcmlhbExpc3QoYS5pbnB1dHMgPz8gW10sIGIuaW5wdXRzID8/IFtdKTtcbn1cblxuZnVuY3Rpb24gY29tcGFyZU1hdGVyaWFsTGlzdChhOiBNYXRlcmlhbEFtb3VudFtdLCBiOiBNYXRlcmlhbEFtb3VudFtdKSB7XG4gIGNvbnN0IGxlbmd0aCA9IE1hdGgubWluKGEubGVuZ3RoLCBiLmxlbmd0aCk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgbGVuZ3RoOyBpKyspIHtcbiAgICBpZiAoYS5sZW5ndGggPD0gaSkge1xuICAgICAgcmV0dXJuIC0xO1xuICAgIH1cblxuICAgIGlmIChiLmxlbmd0aCA8PSBpKSB7XG4gICAgICByZXR1cm4gMTtcbiAgICB9XG5cbiAgICBjb25zdCByZXN1bHQgPSBjb21wYXJlTWF0ZXJpYWxzKGFbaV0ubWF0ZXJpYWwsIGJbaV0ubWF0ZXJpYWwpO1xuICAgIGlmIChyZXN1bHQgIT09IDApIHtcbiAgICAgIHJldHVybiByZXN1bHQ7XG4gICAgfVxuXG4gICAgaWYgKGFbaV0uYW1vdW50IDwgYltpXS5hbW91bnQpIHtcbiAgICAgIHJldHVybiAtMTtcbiAgICB9XG5cbiAgICBpZiAoYVtpXS5hbW91bnQgPiBiW2ldLmFtb3VudCkge1xuICAgICAgcmV0dXJuIDE7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIDA7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoJ0JVSScsIG9uVGlsZVJlYWR5KTtcbn1cblxuZmVhdHVyZXMuYWRkKFxuICBpbXBvcnQubWV0YS51cmwsXG4gIGluaXQsXG4gICdCVUk6IFNvcnRzIHRoZSByZWNpcGVzIGFuZCBtYXRlcmlhbHMgYnkgY2F0ZWdvcnkvdGlja2VyL2Ftb3VudCBzb3J0IG9yZGVyLicsXG4pO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFpQkEsU0FBQSxZQUFBLE1BQUE7QUFDRSxZQUFBLEdBQUEs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
