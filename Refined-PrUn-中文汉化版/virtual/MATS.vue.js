import { C } from './prun-css.js';
import { materialsStore } from './materials.js';
import _sfc_main$1 from './GridMaterialIcon.vue.js';
import { useXitParameters } from './use-xit-parameters.js';
import { materialCategoriesStore } from './material-categories.js';
import { sortMaterials } from './sort-materials.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MATS',
  setup(__props) {
    const parameters = useXitParameters();
    const materials = computed(() => {
      if (isEmpty(parameters)) {
        return materialsStore.all.value;
      }
      const materials2 = [];
      let combo = '';
      for (const parameter of parameters) {
        const material = materialsStore.getByTicker(parameter);
        if (material) {
          materials2.push(material);
          combo = '';
          continue;
        }
        let category = void 0;
        if (combo) {
          combo += ' ' + parameter;
        } else {
          combo = parameter;
        }
        category = materialCategoriesStore.getBySerializableName(combo);
        if (category) {
          materials2.push(...category.materials);
          combo = '';
        }
      }
      return materials2;
    });
    const sorted = computed(() => sortMaterials(materials.value ?? []));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).InventoryView.grid),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(sorted), mat => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: mat.id,
                      ticker: mat.ticker,
                    },
                    null,
                    8,
                    ['ticker'],
                  )
                );
              }),
              128,
            )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
