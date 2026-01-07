import { vShow } from './runtime-dom.esm-bundler.js';
import _sfc_main$1 from './HeadItem.vue.js';
import { screensStore } from './screens.js';
import { userData } from './user-data.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import { syncState } from './sync.js';
import {
  defineComponent,
  watchEffect,
  computed,
  useTemplateRef,
  onMounted,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  withDirectives,
  Fragment,
  renderList,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['href'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TabBar',
  setup(__props) {
    watchEffect(syncState);
    const current = computed(() => screensStore.current.value);
    function getScreen(id) {
      return screensStore.getById(id);
    }
    const container = useTemplateRef('container');
    onMounted(() => {
      container.value?.addEventListener(
        'wheel',
        e => {
          e.preventDefault();
          container.value?.scrollBy({ left: e.deltaY, behavior: 'smooth' });
        },
        { passive: false },
      );
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.spacer),
              },
              null,
              2,
            ),
            withDirectives(
              (openBlock(),
              createElementBlock(
                'div',
                {
                  ref_key: 'container',
                  ref: container,
                  class: normalizeClass(_ctx.$style.container),
                },
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(userData).tabs.order, id => {
                      return withDirectives(
                        (openBlock(),
                        createElementBlock(
                          'a',
                          {
                            key: id,
                            href: `#screen=${id}`,
                            class: normalizeClass(_ctx.$style.item),
                          },
                          [
                            createVNode(
                              _sfc_main$1,
                              {
                                label: getScreen(id).name,
                                active: unref(current) === getScreen(id),
                              },
                              null,
                              8,
                              ['label', 'active'],
                            ),
                          ],
                          10,
                          _hoisted_1,
                        )),
                        [[vShow, !unref(userData).tabs.hidden.includes(id)]],
                      );
                    }),
                    128,
                  )),
                ],
                2,
              )),
              [[unref(so), [unref(userData).tabs.order, { animation: 150 }]]],
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.spacer),
              },
              null,
              2,
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFiQmFyLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9zY3JlZW4tdGFiLWJhci9UYWJCYXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgSGVhZEl0ZW0gZnJvbSAnLi9IZWFkSXRlbS52dWUnO1xuaW1wb3J0IHsgc2NyZWVuc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL3NjcmVlbnMnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyB2RHJhZ2dhYmxlIH0gZnJvbSAndnVlLWRyYWdnYWJsZS1wbHVzJztcbmltcG9ydCB7IHN5bmNTdGF0ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvYmFzaWMvc2NyZWVuLXRhYi1iYXIvc3luYyc7XG5pbXBvcnQgeyB1c2VUZW1wbGF0ZVJlZiB9IGZyb20gJ3Z1ZSc7XG5cbndhdGNoRWZmZWN0KHN5bmNTdGF0ZSk7XG5cbmNvbnN0IGN1cnJlbnQgPSBjb21wdXRlZCgoKSA9PiBzY3JlZW5zU3RvcmUuY3VycmVudC52YWx1ZSk7XG5cbmZ1bmN0aW9uIGdldFNjcmVlbihpZDogc3RyaW5nKSB7XG4gIHJldHVybiBzY3JlZW5zU3RvcmUuZ2V0QnlJZChpZCk7XG59XG5cbmNvbnN0IGNvbnRhaW5lciA9IHVzZVRlbXBsYXRlUmVmKCdjb250YWluZXInKTtcblxub25Nb3VudGVkKCgpID0+IHtcbiAgY29udGFpbmVyLnZhbHVlPy5hZGRFdmVudExpc3RlbmVyKFxuICAgICd3aGVlbCcsXG4gICAgZSA9PiB7XG4gICAgICBlLnByZXZlbnREZWZhdWx0KCk7XG4gICAgICBjb250YWluZXIudmFsdWU/LnNjcm9sbEJ5KHsgbGVmdDogZS5kZWx0YVksIGJlaGF2aW9yOiAnc21vb3RoJyB9KTtcbiAgICB9LFxuICAgIHsgcGFzc2l2ZTogZmFsc2UgfSxcbiAgKTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuc3BhY2VyXCIgLz5cbiAgPGRpdlxuICAgIHJlZj1cImNvbnRhaW5lclwiXG4gICAgdi1kcmFnZ2FibGU9XCJbdXNlckRhdGEudGFicy5vcmRlciwgeyBhbmltYXRpb246IDE1MCB9XVwiXG4gICAgOmNsYXNzPVwiJHN0eWxlLmNvbnRhaW5lclwiPlxuICAgIDx0ZW1wbGF0ZSB2LWZvcj1cImlkIGluIHVzZXJEYXRhLnRhYnMub3JkZXJcIiA6a2V5PVwiaWRcIj5cbiAgICAgIDxhIHYtc2hvdz1cIiF1c2VyRGF0YS50YWJzLmhpZGRlbi5pbmNsdWRlcyhpZClcIiA6aHJlZj1cImAjc2NyZWVuPSR7aWR9YFwiIDpjbGFzcz1cIiRzdHlsZS5pdGVtXCI+XG4gICAgICAgIDxIZWFkSXRlbSA6bGFiZWw9XCJnZXRTY3JlZW4oaWQpLm5hbWVcIiA6YWN0aXZlPVwiY3VycmVudCA9PT0gZ2V0U2NyZWVuKGlkKVwiIC8+XG4gICAgICA8L2E+XG4gICAgPC90ZW1wbGF0ZT5cbiAgPC9kaXY+XG4gIDxkaXYgOmNsYXNzPVwiJHN0eWxlLnNwYWNlclwiIC8+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLnNwYWNlciB7XG4gIGRpc3BsYXk6IGlubGluZS1ibG9jaztcbiAgd2lkdGg6IDVweDtcbn1cblxuLmNvbnRhaW5lciB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXg6IDEgMSBhdXRvO1xuICBtaW4td2lkdGg6IDUwcHg7XG4gIGNvbnRhaW46IGlubGluZS1zaXplO1xuICBvdmVyZmxvdzogaGlkZGVuO1xuXG4gID4gLml0ZW0ge1xuICAgIGZsZXgtc2hyaW5rOiAwO1xuICB9XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIl91bnJlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVFBLGdCQUFBLFNBQUE7QUFFQSxVQUFBLFVBQUEsU0FBQSxNQUFBLGFBQUEsUUFBQSxLQUFBO0FBRUEsYUFBQSxVQUFBLElBQUE7QUFDRSxhQUFBLGFBQUEsUUFBQSxFQUFBO0FBQUEsSUFBOEI7QUFHaEMsVUFBQSxZQUFBLGVBQUEsV0FBQTtBQUVBLGNBQUEsTUFBQTtBQUNFLGdCQUFBLE9BQUE7QUFBQSxRQUFpQjtBQUFBLFFBQ2YsQ0FBQSxNQUFBO0FBRUUsWUFBQSxlQUFBO0FBQ0Esb0JBQUEsT0FBQSxTQUFBLEVBQUEsTUFBQSxFQUFBLFFBQUEsVUFBQSxVQUFBO0FBQUEsUUFBZ0U7QUFBQSxRQUNsRSxFQUFBLFNBQUEsTUFBQTtBQUFBLE1BQ2lCO0FBQUEsSUFDbkIsQ0FBQTs7OztVQUs4QixPQUFBQSxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsUUFBSixHQUFBLE1BQUEsQ0FBQTtBQUFBO1VBVXBCLFNBQUE7QUFBQSxVQVJBLEtBQUE7QUFBQSxVQUFBLE9BQUFBLGVBQUEsS0FBQSxPQUFBLFNBQUE7QUFBQSxRQUVvQixHQUFBO0FBQUE7O2NBSWxCLEtBQUE7QUFBQSxjQUg0QyxNQUFBLFdBQUEsRUFBQTtBQUFBLGNBQ21CLE9BQUFBLGVBQUEsS0FBQSxPQUFBLElBQUE7QUFBQSxZQUF1QixHQUFBO0FBQUE7Z0JBQ1osT0FBQSxVQUFBLEVBQUEsRUFBQTtBQUFBLGdCQUE1QyxRQUFBQyxNQUFBLE9BQUEsTUFBQSxVQUFBLEVBQUE7QUFBQSxjQUF1QyxHQUFBLE1BQUEsR0FBQSxDQUFBLFNBQUEsUUFBQSxDQUFBO0FBQUE7O1lBRDdCLENBQUE7QUFBQTs7O1FBSGIsQ0FBQTtBQUFBO1VBUUwsT0FBQUQsZUFBQSxLQUFBLE9BQUEsTUFBQTtBQUFBLFFBQUosR0FBQSxNQUFBLENBQUE7QUFBQTs7OzsifQ==
