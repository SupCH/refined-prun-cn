import { materialsStore } from './materials.js';
import MaterialRow from './MaterialRow.vue.js';
import { sortMaterials } from './sort-materials.js';
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
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MaterialList',
  props: {
    burn: {},
  },
  setup(__props) {
    const materials = computed(() =>
      Object.keys(__props.burn.burn).map(materialsStore.getByTicker),
    );
    const sorted = computed(() => sortMaterials(materials.value.filter(x => x !== void 0)));
    return (_ctx, _cache) => {
      return (
        openBlock(true),
        createElementBlock(
          Fragment,
          null,
          renderList(unref(sorted), material => {
            return (
              openBlock(),
              createBlock(
                MaterialRow,
                {
                  key: material.id,
                  burn: _ctx.burn.burn[material.ticker],
                  material,
                },
                null,
                8,
                ['burn', 'material'],
              )
            );
          }),
          128,
        )
      );
    };
  },
});
export { _sfc_main as default };
