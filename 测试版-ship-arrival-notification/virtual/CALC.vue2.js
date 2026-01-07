import LoadingSpinner from './LoadingSpinner.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createBlock,
  createCommentVNode,
  createElementVNode as createBaseVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CALC',
  setup(__props) {
    const loading = ref(true);
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            unref(loading)
              ? (openBlock(),
                createBlock(
                  LoadingSpinner,
                  {
                    key: 0,
                    class: normalizeClass(_ctx.$style.loading),
                  },
                  null,
                  8,
                  ['class'],
                ))
              : createCommentVNode('', true),
            createBaseVNode(
              'iframe',
              {
                src: 'https://refined-prun.github.io/xit-calc/',
                width: '100%',
                height: '100%',
                class: normalizeClass(_ctx.$style.calc),
                onLoad: _cache[0] || (_cache[0] = $event => (loading.value = false)),
              },
              null,
              34,
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ0FMQy52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0NBTEMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyLnZ1ZSc7XG5cbmNvbnN0IGxvYWRpbmcgPSByZWYodHJ1ZSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8TG9hZGluZ1NwaW5uZXIgdi1pZj1cImxvYWRpbmdcIiA6Y2xhc3M9XCIkc3R5bGUubG9hZGluZ1wiIC8+XG4gIDxpZnJhbWVcbiAgICBzcmM9XCJodHRwczovL3JlZmluZWQtcHJ1bi5naXRodWIuaW8veGl0LWNhbGMvXCJcbiAgICB3aWR0aD1cIjEwMCVcIlxuICAgIGhlaWdodD1cIjEwMCVcIlxuICAgIDpjbGFzcz1cIiRzdHlsZS5jYWxjXCJcbiAgICBAbG9hZD1cImxvYWRpbmcgPSBmYWxzZVwiIC8+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmxvYWRpbmcge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiAxMDAlO1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIHRvcDogMDtcbiAgbGVmdDogMDtcbn1cblxuLmNhbGMge1xuICBib3JkZXItd2lkdGg6IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IGNhbGMoMTAwJSAtIDZweCk7XG4gIHBhZGRpbmctbGVmdDogNnB4O1xuICBwYWRkaW5nLXRvcDogNnB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlQ29tbWVudFZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBR0EsVUFBQSxVQUFBLElBQUEsSUFBQTs7OztVQUkyRCxLQUFBO0FBQUE7UUFBSixHQUFBLE1BQUEsR0FBQSxDQUFBLE9BQUEsQ0FBQSxLQUFBQSxtQkFBQSxJQUFBLElBQUE7QUFBQTtVQU16QixLQUFBO0FBQUEsVUFKdEIsT0FBQTtBQUFBLFVBQ0UsUUFBQTtBQUFBLFVBQ0MsT0FBQUMsZUFBQSxLQUFBLE9BQUEsSUFBQTtBQUFBLFVBQ1ksUUFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsUUFBQSxRQUFBO0FBQUEsUUFDTCxHQUFBLE1BQUEsRUFBQTtBQUFBOzs7OyJ9
