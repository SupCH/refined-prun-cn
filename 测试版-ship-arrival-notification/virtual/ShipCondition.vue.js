import { C } from './prun-css.js';
import { shipsStore } from './ships.js';
import { percent0 } from './format.js';
import coloredValue from './colored-value.module.css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createCommentVNode,
  openBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ShipCondition',
  props: {
    id: {},
  },
  setup(__props) {
    const ship = computed(() => shipsStore.getById(__props.id));
    const condition = computed(() => Math.floor((ship.value?.condition ?? 1) * 100) / 100);
    const labelClass = computed(() => {
      if (condition.value <= 0.8) {
        return C.ColoredValue.negative;
      }
      if (condition.value <= 0.85) {
        return coloredValue.warning;
      }
      return C.ColoredValue.positive;
    });
    return (_ctx, _cache) => {
      return unref(ship)
        ? (openBlock(),
          createElementBlock(
            'span',
            {
              key: 0,
              class: normalizeClass(unref(labelClass)),
            },
            ' ' + toDisplayString(unref(percent0)(unref(condition))),
            3,
          ))
        : createCommentVNode('', true);
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2hpcENvbmRpdGlvbi52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9mbHQtc2hpcC1jb25kaXRpb24vU2hpcENvbmRpdGlvbi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCB7IHNoaXBzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc2hpcHMnO1xuaW1wb3J0IHsgcGVyY2VudDAgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgY29sb3JlZFZhbHVlIGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9jc3MvY29sb3JlZC12YWx1ZS5tb2R1bGUuY3NzJztcblxuY29uc3QgeyBpZCB9ID0gZGVmaW5lUHJvcHM8eyBpZD86IHN0cmluZyB8IG51bGwgfT4oKTtcblxuY29uc3Qgc2hpcCA9IGNvbXB1dGVkKCgpID0+IHNoaXBzU3RvcmUuZ2V0QnlJZChpZCkpO1xuXG5jb25zdCBjb25kaXRpb24gPSBjb21wdXRlZCgoKSA9PiBNYXRoLmZsb29yKChzaGlwLnZhbHVlPy5jb25kaXRpb24gPz8gMSkgKiAxMDApIC8gMTAwKTtcblxuY29uc3QgbGFiZWxDbGFzcyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKGNvbmRpdGlvbi52YWx1ZSA8PSAwLjgpIHtcbiAgICByZXR1cm4gQy5Db2xvcmVkVmFsdWUubmVnYXRpdmU7XG4gIH1cbiAgaWYgKGNvbmRpdGlvbi52YWx1ZSA8PSAwLjg1KSB7XG4gICAgcmV0dXJuIGNvbG9yZWRWYWx1ZS53YXJuaW5nO1xuICB9XG4gIHJldHVybiBDLkNvbG9yZWRWYWx1ZS5wb3NpdGl2ZTtcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHNwYW4gdi1pZj1cInNoaXBcIiA6Y2xhc3M9XCJsYWJlbENsYXNzXCI+Jm5ic3A7e3sgcGVyY2VudDAoY29uZGl0aW9uKSB9fTwvc3Bhbj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3RvRGlzcGxheVN0cmluZyIsIl91bnJlZiIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFPQSxVQUFBLE9BQUEsU0FBQSxNQUFBLFdBQUEsUUFBQSxRQUFBLEVBQUEsQ0FBQTtBQUVBLFVBQUEsWUFBQSxTQUFBLE1BQUEsS0FBQSxPQUFBLEtBQUEsT0FBQSxhQUFBLEtBQUEsR0FBQSxJQUFBLEdBQUE7QUFFQSxVQUFBLGFBQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxVQUFBLFNBQUEsS0FBQTtBQUNFLGVBQUEsRUFBQSxhQUFBO0FBQUEsTUFBc0I7QUFFeEIsVUFBQSxVQUFBLFNBQUEsTUFBQTtBQUNFLGVBQUEsYUFBQTtBQUFBLE1BQW9CO0FBRXRCLGFBQUEsRUFBQSxhQUFBO0FBQUEsSUFBc0IsQ0FBQTs7O1FBS3NELEtBQUE7QUFBQTtNQUF4QyxHQUFBLE1BQUFBLGdCQUFBQyxNQUFBLFFBQUEsRUFBQUEsTUFBQSxTQUFBLENBQUEsQ0FBQSxHQUFBLENBQUEsS0FBQUMsbUJBQUEsSUFBQSxJQUFBO0FBQUE7OzsifQ==
