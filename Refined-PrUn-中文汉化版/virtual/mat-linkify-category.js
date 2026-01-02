import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { materialsStore } from './materials.js';
import { materialCategoriesStore, toSerializableCategoryName } from './material-categories.js';
import { showBuffer } from './buffers.js';
function onTileReady(tile) {
  const parameter = tile.parameter;
  const material = materialsStore.getByTicker(parameter);
  const category = materialCategoriesStore.getById(material?.category);
  if (!category) {
    return;
  }
  subscribe($$(tile.anchor, C.MaterialInformation.container), async container => {
    const fields = _$$(container, C.StaticInput.static);
    const categoryField = fields[1];
    if (categoryField === void 0) {
      return;
    }
    categoryField.classList.add(C.Link.link);
    categoryField.addEventListener('click', () => {
      showBuffer('XIT MATS ' + toSerializableCategoryName(category.name));
    });
  });
}
function init() {
  tiles.observe('MAT', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'MAT: Makes material category clickable and leading to XIT MATS with the material category.',
);
