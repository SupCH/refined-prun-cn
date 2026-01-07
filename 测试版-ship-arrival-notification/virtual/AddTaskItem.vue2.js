import fa from './font-awesome.module.css.js';
import { showTileOverlay } from './tile-overlay.js';
import _sfc_main$1 from './EditTask.vue.js';
import { createId } from './create-id.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AddTaskItem',
  props: {
    list: {},
  },
  setup(__props) {
    function onAddClick(ev) {
      const task = {
        id: createId(),
        type: 'Text',
      };
      showTileOverlay(ev, _sfc_main$1, {
        task,
        onSave: () => __props.list.tasks.push(task),
      });
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.item),
            onClick: onAddClick,
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass([unref(fa).solid, _ctx.$style.checkmark]),
              },
              [
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass(_ctx.$style.plus),
                  },
                  '+',
                  2,
                ),
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass(_ctx.$style.plusHover),
                  },
                  toDisplayString(''),
                  2,
                ),
              ],
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass([_ctx.$style.content]),
              },
              'Add task',
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQWRkVGFza0l0ZW0udnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL0FkZFRhc2tJdGVtLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuaW1wb3J0IHsgc2hvd1RpbGVPdmVybGF5IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3RpbGUtb3ZlcmxheSc7XG5pbXBvcnQgVGFza0VkaXRvciBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9UT0RPL0VkaXRUYXNrLnZ1ZSc7XG5pbXBvcnQgeyBjcmVhdGVJZCB9IGZyb20gJ0BzcmMvc3RvcmUvY3JlYXRlLWlkJztcblxuY29uc3QgeyBsaXN0IH0gPSBkZWZpbmVQcm9wczx7IGxpc3Q6IFVzZXJEYXRhLlRhc2tMaXN0IH0+KCk7XG5cbmZ1bmN0aW9uIG9uQWRkQ2xpY2soZXY6IEV2ZW50KSB7XG4gIGNvbnN0IHRhc2s6IFVzZXJEYXRhLlRhc2sgPSB7XG4gICAgaWQ6IGNyZWF0ZUlkKCksXG4gICAgdHlwZTogJ1RleHQnLFxuICB9O1xuICBzaG93VGlsZU92ZXJsYXkoZXYsIFRhc2tFZGl0b3IsIHtcbiAgICB0YXNrLFxuICAgIG9uU2F2ZTogKCkgPT4gbGlzdC50YXNrcy5wdXNoKHRhc2spLFxuICB9KTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiJHN0eWxlLml0ZW1cIiBAY2xpY2s9XCJvbkFkZENsaWNrXCI+XG4gICAgPGRpdiA6Y2xhc3M9XCJbZmEuc29saWQsICRzdHlsZS5jaGVja21hcmtdXCI+XG4gICAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5wbHVzXCI+KzwvZGl2PlxuICAgICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUucGx1c0hvdmVyXCI+e3sgJ1xcdWYwNTUnIH19PC9kaXY+XG4gICAgPC9kaXY+XG4gICAgPGRpdiA6Y2xhc3M9XCJbJHN0eWxlLmNvbnRlbnRdXCI+QWRkIHRhc2s8L2Rpdj5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLml0ZW0ge1xuICBkaXNwbGF5OiBmbGV4O1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICBqdXN0aWZ5LWNvbnRlbnQ6IHNwYWNlLWJldHdlZW47XG4gIGJvcmRlci1ib3R0b206IHNvbGlkIDFweCAjMzMzO1xuICB1c2VyLXNlbGVjdDogbm9uZTtcbiAgY3Vyc29yOiBwb2ludGVyO1xufVxuXG4uY2hlY2ttYXJrIHtcbiAgZGlzcGxheTogZ3JpZDtcbiAgZm9udC1zaXplOiAxM3B4O1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxuLnBsdXMge1xuICBncmlkLWFyZWE6IDEgLyAxO1xuICBmb250LXNpemU6IDhweDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBjZW50ZXI7XG4gIGFsaWduLWl0ZW1zOiBjZW50ZXI7XG59XG5cbi5pdGVtOmhvdmVyIC5wbHVzIHtcbiAgb3BhY2l0eTogMDtcbn1cblxuLnBsdXNIb3ZlciB7XG4gIGdyaWQtYXJlYTogMSAvIDE7XG4gIGZvbnQtc2l6ZTogMTRweDtcbiAgb3BhY2l0eTogMDtcbn1cblxuLml0ZW06aG92ZXIgLnBsdXNIb3ZlciB7XG4gIG9wYWNpdHk6IDE7XG59XG5cbi5jb250ZW50IHtcbiAgZmxleDogMTtcbiAgcGFkZGluZy10b3A6IDZweDtcbiAgcGFkZGluZy1ib3R0b206IDZweDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiVGFza0VkaXRvciIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfbm9ybWFsaXplQ2xhc3MiLCIkc3R5bGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUEsYUFBUyxXQUFXLElBQVc7QUFDN0IsWUFBTSxPQUFzQjtBQUFBLFFBQzFCLElBQUksU0FBQTtBQUFBLFFBQ0osTUFBTTtBQUFBLE1BQUE7QUFFUixzQkFBZ0IsSUFBSUEsYUFBWTtBQUFBLFFBQzlCO0FBQUEsUUFDQSxRQUFRLE1BQU0sUUFBQSxLQUFLLE1BQU0sS0FBSyxJQUFJO0FBQUEsTUFBQSxDQUNuQztBQUFBLElBQ0g7OzBCQUlFQyxtQkFNTSxPQUFBO0FBQUEsUUFOQSxPQUFLQyxlQUFFQyxLQUFBQSxPQUFPLElBQUk7QUFBQSxRQUFHLFNBQU87QUFBQSxNQUFBO1FBQ2hDQyxnQkFHTSxPQUFBO0FBQUEsVUFIQSx1QkFBUUMsTUFBQSxFQUFBLEVBQUcsT0FBT0YsS0FBQUEsT0FBTyxTQUFTLENBQUE7QUFBQSxRQUFBO1VBQ3RDQyxnQkFBaUMsT0FBQTtBQUFBLFlBQTNCLE9BQUtGLGVBQUVDLEtBQUFBLE9BQU8sSUFBSTtBQUFBLFVBQUEsR0FBRSxLQUFDLENBQUE7QUFBQSxVQUMzQkMsZ0JBQW1ELE9BQUE7QUFBQSxZQUE3QyxPQUFLRixlQUFFQyxLQUFBQSxPQUFPLFNBQVM7QUFBQSxVQUFBLG1CQUFLLEdBQVEsR0FBQSxDQUFBO0FBQUEsUUFBQTtRQUU1Q0MsZ0JBQTZDLE9BQUE7QUFBQSxVQUF2QyxPQUFLRixlQUFBLENBQUdDLEtBQUFBLE9BQU8sT0FBTyxDQUFBO0FBQUEsUUFBQSxHQUFHLFlBQVEsQ0FBQTtBQUFBLE1BQUE7Ozs7In0=
