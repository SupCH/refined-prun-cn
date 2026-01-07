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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTUFUUy52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvTUFUUy52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IG1hdGVyaWFsc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFscyc7XG5pbXBvcnQgR3JpZE1hdGVyaWFsSWNvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvR3JpZE1hdGVyaWFsSWNvbi52dWUnO1xuaW1wb3J0IHsgdXNlWGl0UGFyYW1ldGVycyB9IGZyb20gJ0BzcmMvaG9va3MvdXNlLXhpdC1wYXJhbWV0ZXJzJztcbmltcG9ydCB7IG1hdGVyaWFsQ2F0ZWdvcmllc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFsLWNhdGVnb3JpZXMnO1xuaW1wb3J0IHsgaXNFbXB0eSB9IGZyb20gJ3RzLWV4dHJhcyc7XG5pbXBvcnQgeyBzb3J0TWF0ZXJpYWxzIH0gZnJvbSAnQHNyYy9jb3JlL3NvcnQtbWF0ZXJpYWxzJztcblxuY29uc3QgcGFyYW1ldGVycyA9IHVzZVhpdFBhcmFtZXRlcnMoKTtcbmNvbnN0IG1hdGVyaWFscyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKGlzRW1wdHkocGFyYW1ldGVycykpIHtcbiAgICByZXR1cm4gbWF0ZXJpYWxzU3RvcmUuYWxsLnZhbHVlO1xuICB9XG5cbiAgY29uc3QgbWF0ZXJpYWxzOiBQcnVuQXBpLk1hdGVyaWFsW10gPSBbXTtcbiAgbGV0IGNvbWJvID0gJyc7XG4gIGZvciAoY29uc3QgcGFyYW1ldGVyIG9mIHBhcmFtZXRlcnMpIHtcbiAgICBjb25zdCBtYXRlcmlhbCA9IG1hdGVyaWFsc1N0b3JlLmdldEJ5VGlja2VyKHBhcmFtZXRlcik7XG4gICAgaWYgKG1hdGVyaWFsKSB7XG4gICAgICBtYXRlcmlhbHMucHVzaChtYXRlcmlhbCk7XG4gICAgICBjb21ibyA9ICcnO1xuICAgICAgY29udGludWU7XG4gICAgfVxuXG4gICAgbGV0IGNhdGVnb3J5OiBQcnVuQXBpLk1hdGVyaWFsQ2F0ZWdvcnkgfCB1bmRlZmluZWQgPSB1bmRlZmluZWQ7XG4gICAgaWYgKGNvbWJvKSB7XG4gICAgICBjb21ibyArPSAnICcgKyBwYXJhbWV0ZXI7XG4gICAgfSBlbHNlIHtcbiAgICAgIGNvbWJvID0gcGFyYW1ldGVyO1xuICAgIH1cblxuICAgIGNhdGVnb3J5ID0gbWF0ZXJpYWxDYXRlZ29yaWVzU3RvcmUuZ2V0QnlTZXJpYWxpemFibGVOYW1lKGNvbWJvKTtcbiAgICBpZiAoY2F0ZWdvcnkpIHtcbiAgICAgIG1hdGVyaWFscy5wdXNoKC4uLmNhdGVnb3J5Lm1hdGVyaWFscyk7XG4gICAgICBjb21ibyA9ICcnO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBtYXRlcmlhbHM7XG59KTtcblxuY29uc3Qgc29ydGVkID0gY29tcHV0ZWQoKCkgPT4gc29ydE1hdGVyaWFscyhtYXRlcmlhbHMudmFsdWUgPz8gW10pKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5JbnZlbnRvcnlWaWV3LmdyaWRcIj5cbiAgICA8R3JpZE1hdGVyaWFsSWNvbiB2LWZvcj1cIm1hdCBpbiBzb3J0ZWRcIiA6a2V5PVwibWF0LmlkXCIgOnRpY2tlcj1cIm1hdC50aWNrZXJcIiAvPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVFBLFVBQUEsYUFBQSxpQkFBQTtBQUNBLFVBQUEsWUFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLFFBQUEsVUFBQSxHQUFBO0FBQ0UsZUFBQSxlQUFBLElBQUE7QUFBQSxNQUEwQjtBQUc1QixZQUFBLGFBQUEsQ0FBQTtBQUNBLFVBQUEsUUFBQTtBQUNBLGlCQUFBLGFBQUEsWUFBQTtBQUNFLGNBQUEsV0FBQSxlQUFBLFlBQUEsU0FBQTtBQUNBLFlBQUEsVUFBQTtBQUNFLHFCQUFBLEtBQUEsUUFBQTtBQUNBLGtCQUFBO0FBQ0E7QUFBQSxRQUFBO0FBR0YsWUFBQSxXQUFBO0FBQ0EsWUFBQSxPQUFBO0FBQ0UsbUJBQUEsTUFBQTtBQUFBLFFBQWUsT0FBQTtBQUVmLGtCQUFBO0FBQUEsUUFBUTtBQUdWLG1CQUFBLHdCQUFBLHNCQUFBLEtBQUE7QUFDQSxZQUFBLFVBQUE7QUFDRSxxQkFBQSxLQUFBLEdBQUEsU0FBQSxTQUFBO0FBQ0Esa0JBQUE7QUFBQSxRQUFRO0FBQUEsTUFDVjtBQUdGLGFBQUE7QUFBQSxJQUFPLENBQUE7QUFHVCxVQUFBLFNBQUEsU0FBQSxNQUFBLGNBQUEsVUFBQSxTQUFBLENBQUEsQ0FBQSxDQUFBOzs7UUFNUSxPQUFBQSxnQkFGT0MsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsY0FBQUEsSUFBQUE7QUFBQUEsTUFBb0IsR0FBQTtBQUFBOztZQUM4QyxLQUFBLElBQUE7QUFBQSxZQUEzQixRQUFBLElBQUE7QUFBQSxVQUFpQixHQUFBLE1BQUEsR0FBQSxDQUFBLFFBQUEsQ0FBQTtBQUFBOzs7OzsifQ==
