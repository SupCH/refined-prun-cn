import { fixed0 } from './format.js';
import { getMaterialByName } from './i18n.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PpuLabel',
  props: {
    amountInput: {},
    materialName: {},
    totalPriceInput: {},
  },
  setup(__props) {
    const material = computed(() => getMaterialByName(__props.materialName));
    const unit = computed(() => {
      if (!material.value) {
        return void 0;
      }
      const weight = material.value.weight;
      const volume = material.value.volume;
      return weight >= volume ? { symbol: 't', size: weight } : { symbol: 'm³', size: volume };
    });
    const amount = computed(() => {
      const amount2 = parseInt(__props.amountInput, 10);
      return isFinite(amount2) ? amount2 : void 0;
    });
    const totalSize = computed(() => {
      if (unit.value && amount.value !== void 0) {
        return fixed0(amount.value * unit.value.size);
      }
      return `-- `;
    });
    const totalPrice = computed(() => {
      const totalPrice2 = parseInt(__props.totalPriceInput, 10);
      return isFinite(totalPrice2) ? totalPrice2 : void 0;
    });
    const perUnit = computed(() => {
      if (unit.value && amount.value !== void 0 && totalPrice.value !== void 0) {
        return fixed0(totalPrice.value / (amount.value * unit.value.size));
      }
      return '--';
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('span', null, [
          unref(material)
            ? (openBlock(),
              createElementBlock(
                Fragment,
                { key: 0 },
                [
                  createTextVNode(
                    toDisplayString(unref(totalSize)) +
                      ' ' +
                      toDisplayString(unref(unit)?.symbol) +
                      ' | ' +
                      toDisplayString(unref(perUnit)) +
                      '/' +
                      toDisplayString(unref(unit)?.symbol),
                    1,
                  ),
                ],
                64,
              ))
            : (openBlock(), createElementBlock(Fragment, { key: 1 }, [createTextVNode('--')], 64)),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUHB1TGFiZWwudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvc2hpcHBpbmctcGVyLXVuaXQtcHJpY2UvUHB1TGFiZWwudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBmaXhlZDAgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyBnZXRNYXRlcmlhbEJ5TmFtZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9pMThuJztcblxuY29uc3QgeyBhbW91bnRJbnB1dCwgbWF0ZXJpYWxOYW1lLCB0b3RhbFByaWNlSW5wdXQgfSA9IGRlZmluZVByb3BzPHtcbiAgYW1vdW50SW5wdXQ6IHN0cmluZztcbiAgbWF0ZXJpYWxOYW1lOiBzdHJpbmc7XG4gIHRvdGFsUHJpY2VJbnB1dDogc3RyaW5nO1xufT4oKTtcblxuY29uc3QgbWF0ZXJpYWwgPSBjb21wdXRlZCgoKSA9PiBnZXRNYXRlcmlhbEJ5TmFtZShtYXRlcmlhbE5hbWUpKTtcblxuY29uc3QgdW5pdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKCFtYXRlcmlhbC52YWx1ZSkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3Qgd2VpZ2h0ID0gbWF0ZXJpYWwudmFsdWUud2VpZ2h0O1xuICBjb25zdCB2b2x1bWUgPSBtYXRlcmlhbC52YWx1ZS52b2x1bWU7XG4gIHJldHVybiB3ZWlnaHQgPj0gdm9sdW1lID8geyBzeW1ib2w6ICd0Jywgc2l6ZTogd2VpZ2h0IH0gOiB7IHN5bWJvbDogJ23CsycsIHNpemU6IHZvbHVtZSB9O1xufSk7XG5cbmNvbnN0IGFtb3VudCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgYW1vdW50ID0gcGFyc2VJbnQoYW1vdW50SW5wdXQsIDEwKTtcbiAgcmV0dXJuIGlzRmluaXRlKGFtb3VudCkgPyBhbW91bnQgOiB1bmRlZmluZWQ7XG59KTtcblxuY29uc3QgdG90YWxTaXplID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAodW5pdC52YWx1ZSAmJiBhbW91bnQudmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiBmaXhlZDAoYW1vdW50LnZhbHVlICogdW5pdC52YWx1ZS5zaXplKTtcbiAgfVxuXG4gIHJldHVybiBgLS0gYDtcbn0pO1xuXG5jb25zdCB0b3RhbFByaWNlID0gY29tcHV0ZWQoKCkgPT4ge1xuICBjb25zdCB0b3RhbFByaWNlID0gcGFyc2VJbnQodG90YWxQcmljZUlucHV0LCAxMCk7XG4gIHJldHVybiBpc0Zpbml0ZSh0b3RhbFByaWNlKSA/IHRvdGFsUHJpY2UgOiB1bmRlZmluZWQ7XG59KTtcblxuY29uc3QgcGVyVW5pdCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKHVuaXQudmFsdWUgJiYgYW1vdW50LnZhbHVlICE9PSB1bmRlZmluZWQgJiYgdG90YWxQcmljZS52YWx1ZSAhPT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIGZpeGVkMCh0b3RhbFByaWNlLnZhbHVlIC8gKGFtb3VudC52YWx1ZSAqIHVuaXQudmFsdWUuc2l6ZSkpO1xuICB9XG5cbiAgcmV0dXJuICctLSc7XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxzcGFuPlxuICAgIDx0ZW1wbGF0ZSB2LWlmPVwibWF0ZXJpYWxcIj5cbiAgICAgIHt7IHRvdGFsU2l6ZSB9fSB7eyB1bml0Py5zeW1ib2wgfX0gfCB7eyBwZXJVbml0IH19L3t7IHVuaXQ/LnN5bWJvbCB9fVxuICAgIDwvdGVtcGxhdGU+XG4gICAgPHRlbXBsYXRlIHYtZWxzZT4tLTwvdGVtcGxhdGU+XG4gIDwvc3Bhbj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfY3JlYXRlVGV4dFZOb2RlIiwiX3RvRGlzcGxheVN0cmluZyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7OztBQVVBLFVBQUEsV0FBQSxTQUFBLE1BQUEsa0JBQUEsUUFBQSxZQUFBLENBQUE7QUFFQSxVQUFBLE9BQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxDQUFBLFNBQUEsT0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBRVQsWUFBQSxTQUFBLFNBQUEsTUFBQTtBQUNBLFlBQUEsU0FBQSxTQUFBLE1BQUE7QUFDQSxhQUFBLFVBQUEsU0FBQSxFQUFBLFFBQUEsS0FBQSxNQUFBLE9BQUEsSUFBQSxFQUFBLFFBQUEsTUFBQSxNQUFBLE9BQUE7QUFBQSxJQUF1RixDQUFBO0FBR3pGLFVBQUEsU0FBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLFVBQUEsU0FBQSxRQUFBLGFBQUEsRUFBQTtBQUNBLGFBQUEsU0FBQSxPQUFBLElBQUEsVUFBQTtBQUFBLElBQW1DLENBQUE7QUFHckMsVUFBQSxZQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsS0FBQSxTQUFBLE9BQUEsVUFBQSxRQUFBO0FBQ0UsZUFBQSxPQUFBLE9BQUEsUUFBQSxLQUFBLE1BQUEsSUFBQTtBQUFBLE1BQTRDO0FBRzlDLGFBQUE7QUFBQSxJQUFPLENBQUE7QUFHVCxVQUFBLGFBQUEsU0FBQSxNQUFBO0FBQ0UsWUFBQSxjQUFBLFNBQUEsUUFBQSxpQkFBQSxFQUFBO0FBQ0EsYUFBQSxTQUFBLFdBQUEsSUFBQSxjQUFBO0FBQUEsSUFBMkMsQ0FBQTtBQUc3QyxVQUFBLFVBQUEsU0FBQSxNQUFBO0FBQ0UsVUFBQSxLQUFBLFNBQUEsT0FBQSxVQUFBLFVBQUEsV0FBQSxVQUFBLFFBQUE7QUFDRSxlQUFBLE9BQUEsV0FBQSxTQUFBLE9BQUEsUUFBQSxLQUFBLE1BQUEsS0FBQTtBQUFBLE1BQWlFO0FBR25FLGFBQUE7QUFBQSxJQUFPLENBQUE7OztRQVVBQSxNQUFBLFFBQUEsS0FBQUMsVUFBQSxHQUFBQyxtQkFBQUMsVUFBQSxFQUFBLEtBQUEsS0FBQTtBQUFBLFVBRk1DLGdCQUFBQyxnQkFBQUwsTUFBQSxTQUFBLENBQUEsSUFBQSxNQUFBSyxnQkFBQUwsTUFBQSxJQUFBLEdBQUEsTUFBQSxJQUFBLFFBQUFLLGdCQUFBTCxNQUFBLE9BQUEsQ0FBQSxJQUFBLE1BQUFLLGdCQUFBTCxNQUFBLElBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQTtBQUFBLFFBRHlELEdBQUEsRUFBQSxNQUFBQyxhQUFBQyxtQkFBQUMsVUFBQSxFQUFBLEtBQUEsS0FBQTtBQUFBLFVBRXRDQyxnQkFBQSxJQUFBO0FBQUEsUUFBWCxHQUFBLEVBQUE7QUFBQTs7OzsifQ==
