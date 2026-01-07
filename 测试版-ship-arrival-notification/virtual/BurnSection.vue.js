import PlanetHeader from './PlanetHeader.vue.js';
import _sfc_main$1 from './MaterialList.vue.js';
import { useTileState } from './tile-state5.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BurnSection',
  props: {
    burn: {},
    canMinimize: { type: Boolean },
  },
  setup(__props) {
    const expand = useTileState('expand');
    const naturalId = computed(() => __props.burn.naturalId);
    const isMinimized = computed(
      () => __props.canMinimize && !expand.value.includes(naturalId.value),
    );
    const onHeaderClick = () => {
      if (!__props.canMinimize) {
        return;
      }
      if (isMinimized.value) {
        expand.value = [...expand.value, naturalId.value];
      } else {
        expand.value = expand.value.filter(x => x !== naturalId.value);
      }
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('tbody', null, [
              createVNode(
                PlanetHeader,
                {
                  'has-minimize': _ctx.canMinimize,
                  burn: _ctx.burn,
                  minimized: unref(isMinimized),
                  'on-click': onHeaderClick,
                },
                null,
                8,
                ['has-minimize', 'burn', 'minimized'],
              ),
            ]),
            !unref(isMinimized)
              ? (openBlock(),
                createElementBlock('tbody', _hoisted_1, [
                  createVNode(_sfc_main$1, { burn: _ctx.burn }, null, 8, ['burn']),
                ]))
              : createCommentVNode('', true),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQnVyblNlY3Rpb24udnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0JVUk4vQnVyblNlY3Rpb24udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBQbGFuZXRCdXJuIH0gZnJvbSAnQHNyYy9jb3JlL2J1cm4nO1xuaW1wb3J0IFBsYW5ldEhlYWRlciBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9CVVJOL1BsYW5ldEhlYWRlci52dWUnO1xuaW1wb3J0IE1hdGVyaWFsTGlzdCBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9CVVJOL01hdGVyaWFsTGlzdC52dWUnO1xuaW1wb3J0IHsgdXNlVGlsZVN0YXRlIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQlVSTi90aWxlLXN0YXRlJztcblxuY29uc3QgeyBidXJuLCBjYW5NaW5pbWl6ZSB9ID0gZGVmaW5lUHJvcHM8eyBidXJuOiBQbGFuZXRCdXJuOyBjYW5NaW5pbWl6ZT86IGJvb2xlYW4gfT4oKTtcblxuY29uc3QgZXhwYW5kID0gdXNlVGlsZVN0YXRlKCdleHBhbmQnKTtcblxuY29uc3QgbmF0dXJhbElkID0gY29tcHV0ZWQoKCkgPT4gYnVybi5uYXR1cmFsSWQpO1xuY29uc3QgaXNNaW5pbWl6ZWQgPSBjb21wdXRlZCgoKSA9PiBjYW5NaW5pbWl6ZSAmJiAhZXhwYW5kLnZhbHVlLmluY2x1ZGVzKG5hdHVyYWxJZC52YWx1ZSkpO1xuXG5jb25zdCBvbkhlYWRlckNsaWNrID0gKCkgPT4ge1xuICBpZiAoIWNhbk1pbmltaXplKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChpc01pbmltaXplZC52YWx1ZSkge1xuICAgIGV4cGFuZC52YWx1ZSA9IFsuLi5leHBhbmQudmFsdWUsIG5hdHVyYWxJZC52YWx1ZV07XG4gIH0gZWxzZSB7XG4gICAgZXhwYW5kLnZhbHVlID0gZXhwYW5kLnZhbHVlLmZpbHRlcih4ID0+IHggIT09IG5hdHVyYWxJZC52YWx1ZSk7XG4gIH1cbn07XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8dGJvZHk+XG4gICAgPFBsYW5ldEhlYWRlclxuICAgICAgOmhhcy1taW5pbWl6ZT1cImNhbk1pbmltaXplXCJcbiAgICAgIDpidXJuPVwiYnVyblwiXG4gICAgICA6bWluaW1pemVkPVwiaXNNaW5pbWl6ZWRcIlxuICAgICAgOm9uLWNsaWNrPVwib25IZWFkZXJDbGlja1wiIC8+XG4gIDwvdGJvZHk+XG4gIDx0Ym9keSB2LWlmPVwiIWlzTWluaW1pemVkXCI+XG4gICAgPE1hdGVyaWFsTGlzdCA6YnVybj1cImJ1cm5cIiAvPlxuICA8L3Rib2R5PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlVk5vZGUiLCJjYW5NaW5pbWl6ZSIsImJ1cm4iLCJNYXRlcmlhbExpc3QiLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7O0FBUUEsVUFBQSxTQUFBLGFBQUEsUUFBQTtBQUVBLFVBQUEsWUFBQSxTQUFBLE1BQUEsUUFBQSxLQUFBLFNBQUE7QUFDQSxVQUFBLGNBQUEsU0FBQSxNQUFBLFFBQUEsZUFBQSxDQUFBLE9BQUEsTUFBQSxTQUFBLFVBQUEsS0FBQSxDQUFBO0FBRUEsVUFBQSxnQkFBQSxNQUFBO0FBQ0UsVUFBQSxDQUFBLFFBQUEsYUFBQTtBQUNFO0FBQUEsTUFBQTtBQUVGLFVBQUEsWUFBQSxPQUFBO0FBQ0UsZUFBQSxRQUFBLENBQUEsR0FBQSxPQUFBLE9BQUEsVUFBQSxLQUFBO0FBQUEsTUFBZ0QsT0FBQTtBQUVoRCxlQUFBLFFBQUEsT0FBQSxNQUFBLE9BQUEsQ0FBQSxNQUFBLE1BQUEsVUFBQSxLQUFBO0FBQUEsTUFBNkQ7QUFBQSxJQUMvRDs7OztVQVdRQSxZQUFBLGNBQUE7QUFBQSxZQUR3QixnQkFBQSxLQUFBO0FBQUEsWUFIYkMsTUFBQUEsS0FBQUE7QUFBQUEsWUFDUkMsV0FBQUEsTUFBQUEsV0FBQUE7QUFBQUEsWUFDSyxZQUFBO0FBQUEsVUFDRCxHQUFBLE1BQUEsR0FBQSxDQUFBLGdCQUFBLFFBQUEsV0FBQSxDQUFBO0FBQUE7O1VBSVBGLFlBQUFHLGFBQUEsRUFBQSxNQUFBLEtBQUEsS0FBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLE1BQUEsQ0FBQTtBQUFBLFFBRG1CLENBQUEsS0FBQUMsbUJBQUEsSUFBQSxJQUFBO0FBQUE7Ozs7In0=
