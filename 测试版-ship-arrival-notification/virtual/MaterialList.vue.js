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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWxMaXN0LnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9CVVJOL01hdGVyaWFsTGlzdC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IG1hdGVyaWFsc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFscyc7XG5pbXBvcnQgeyBQbGFuZXRCdXJuIH0gZnJvbSAnQHNyYy9jb3JlL2J1cm4nO1xuaW1wb3J0IE1hdGVyaWFsUm93IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0JVUk4vTWF0ZXJpYWxSb3cudnVlJztcbmltcG9ydCB7IHNvcnRNYXRlcmlhbHMgfSBmcm9tICdAc3JjL2NvcmUvc29ydC1tYXRlcmlhbHMnO1xuXG5jb25zdCB7IGJ1cm4gfSA9IGRlZmluZVByb3BzPHsgYnVybjogUGxhbmV0QnVybiB9PigpO1xuXG5jb25zdCBtYXRlcmlhbHMgPSBjb21wdXRlZCgoKSA9PiBPYmplY3Qua2V5cyhidXJuLmJ1cm4pLm1hcChtYXRlcmlhbHNTdG9yZS5nZXRCeVRpY2tlcikpO1xuY29uc3Qgc29ydGVkID0gY29tcHV0ZWQoKCkgPT4gc29ydE1hdGVyaWFscyhtYXRlcmlhbHMudmFsdWUuZmlsdGVyKHggPT4geCAhPT0gdW5kZWZpbmVkKSkpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPE1hdGVyaWFsUm93XG4gICAgdi1mb3I9XCJtYXRlcmlhbCBpbiBzb3J0ZWRcIlxuICAgIDprZXk9XCJtYXRlcmlhbC5pZFwiXG4gICAgOmJ1cm49XCJidXJuLmJ1cm5bbWF0ZXJpYWwudGlja2VyXVwiXG4gICAgOm1hdGVyaWFsPVwibWF0ZXJpYWxcIiAvPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7OztBQVFBLFVBQUEsWUFBQSxTQUFBLE1BQUEsT0FBQSxLQUFBLFFBQUEsS0FBQSxJQUFBLEVBQUEsSUFBQSxlQUFBLFdBQUEsQ0FBQTtBQUNBLFVBQUEsU0FBQSxTQUFBLE1BQUEsY0FBQSxVQUFBLE1BQUEsT0FBQSxDQUFBLE1BQUEsTUFBQSxNQUFBLENBQUEsQ0FBQTs7OztVQVEyQixLQUFBLFNBQUE7QUFBQSxVQUZSLE1BQUEsS0FBQSxLQUFBLEtBQUEsU0FBQSxNQUFBO0FBQUEsVUFDaUI7QUFBQSxRQUMvQixHQUFBLE1BQUEsR0FBQSxDQUFBLFFBQUEsVUFBQSxDQUFBO0FBQUE7Ozs7In0=
