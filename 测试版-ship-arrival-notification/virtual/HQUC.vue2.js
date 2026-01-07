import { calculateHQUpgradeMaterials } from './hq.js';
import { companyStore } from './company.js';
import MaterialPurchaseTable from './MaterialPurchaseTable.vue.js';
import { useTileState } from './user-data-tiles.js';
import _sfc_main$3 from './PrunButton.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import _sfc_main$1 from './NumberInput.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'HQUC',
  setup(__props) {
    const from = useTileState('from', companyStore.value?.headquarters.level ?? 1);
    const to = useTileState('to', from.value + 1);
    const materials = computed(() => calculateHQUpgradeMaterials(from.value, to.value));
    function reset() {
      from.value = companyStore.value?.headquarters.level ?? 1;
      to.value = from.value + 1;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'From' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(from),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(from) ? (from.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'To' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(to),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event => (isRef(to) ? (to.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      onClick: reset,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[2] || (_cache[2] = [createTextVNode('RESET', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
            createVNode(MaterialPurchaseTable, { materials: unref(materials) }, null, 8, [
              'materials',
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSFFVQy52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0hRVUMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBjYWxjdWxhdGVIUVVwZ3JhZGVNYXRlcmlhbHMgfSBmcm9tICdAc3JjL2NvcmUvaHEnO1xuaW1wb3J0IHsgY29tcGFueVN0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL2NvbXBhbnknO1xuaW1wb3J0IE1hdGVyaWFsUHVyY2hhc2VUYWJsZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvTWF0ZXJpYWxQdXJjaGFzZVRhYmxlLnZ1ZSc7XG5pbXBvcnQgeyB1c2VUaWxlU3RhdGUgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YS10aWxlcyc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5pbXBvcnQgTnVtYmVySW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL051bWJlcklucHV0LnZ1ZSc7XG5cbmNvbnN0IGZyb20gPSB1c2VUaWxlU3RhdGUoJ2Zyb20nLCBjb21wYW55U3RvcmUudmFsdWU/LmhlYWRxdWFydGVycy5sZXZlbCA/PyAxKTtcbmNvbnN0IHRvID0gdXNlVGlsZVN0YXRlKCd0bycsIGZyb20udmFsdWUgKyAxKTtcblxuY29uc3QgbWF0ZXJpYWxzID0gY29tcHV0ZWQoKCkgPT4gY2FsY3VsYXRlSFFVcGdyYWRlTWF0ZXJpYWxzKGZyb20udmFsdWUsIHRvLnZhbHVlKSk7XG5cbmZ1bmN0aW9uIHJlc2V0KCkge1xuICBmcm9tLnZhbHVlID0gY29tcGFueVN0b3JlLnZhbHVlPy5oZWFkcXVhcnRlcnMubGV2ZWwgPz8gMTtcbiAgdG8udmFsdWUgPSBmcm9tLnZhbHVlICsgMTtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxmb3JtPlxuICAgIDxBY3RpdmUgbGFiZWw9XCJGcm9tXCI+XG4gICAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cImZyb21cIiAvPlxuICAgIDwvQWN0aXZlPlxuICAgIDxBY3RpdmUgbGFiZWw9XCJUb1wiPlxuICAgICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJ0b1wiIC8+XG4gICAgPC9BY3RpdmU+XG4gICAgPENvbW1hbmRzPlxuICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJyZXNldFwiPlJFU0VUPC9QcnVuQnV0dG9uPlxuICAgIDwvQ29tbWFuZHM+XG4gIDwvZm9ybT5cbiAgPE1hdGVyaWFsUHVyY2hhc2VUYWJsZSA6bWF0ZXJpYWxzPVwibWF0ZXJpYWxzXCIgLz5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uY29udGFpbmVyIHtcbiAgcGFkZGluZy10b3A6IDRweDtcbn1cblxuLnNlbGVjdG9ycyB7XG4gIHBhZGRpbmctbGVmdDogNHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfY3JlYXRlVk5vZGUiLCJBY3RpdmUiLCJfd2l0aEN0eCIsIk51bWJlcklucHV0IiwiX3VucmVmIiwiX2lzUmVmIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7QUFVQSxVQUFBLE9BQUEsYUFBQSxRQUFBLGFBQUEsT0FBQSxhQUFBLFNBQUEsQ0FBQTtBQUNBLFVBQUEsS0FBQSxhQUFBLE1BQUEsS0FBQSxRQUFBLENBQUE7QUFFQSxVQUFBLFlBQUEsU0FBQSxNQUFBLDRCQUFBLEtBQUEsT0FBQSxHQUFBLEtBQUEsQ0FBQTtBQUVBLGFBQUEsUUFBQTtBQUNFLFdBQUEsUUFBQSxhQUFBLE9BQUEsYUFBQSxTQUFBO0FBQ0EsU0FBQSxRQUFBLEtBQUEsUUFBQTtBQUFBLElBQXdCOzs7O1VBZWpCQSxZQUFBQyxhQUFBLEVBQUEsT0FBQSxPQUFBLEdBQUE7QUFBQSxZQVRlLFNBQUFDLFFBQUEsTUFBQTtBQUFBLGNBQ1lGLFlBQUFHLGFBQUE7QUFBQSxnQkFBQSxZQUFBQyxNQUFBLElBQUE7QUFBQSxnQkFBUix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFDLE1BQUEsSUFBQSxJQUFBLEtBQUEsUUFBQSxTQUFBO0FBQUEsY0FBSSxHQUFBLE1BQUEsR0FBQSxDQUFBLFlBQUEsQ0FBQTtBQUFBOzs7O1lBRVYsU0FBQUgsUUFBQSxNQUFBO0FBQUEsY0FDWUYsWUFBQUcsYUFBQTtBQUFBLGdCQUFBLFlBQUFDLE1BQUEsRUFBQTtBQUFBLGdCQUFOLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUMsTUFBQSxFQUFBLElBQUEsR0FBQSxRQUFBLFNBQUE7QUFBQSxjQUFFLEdBQUEsTUFBQSxHQUFBLENBQUEsWUFBQSxDQUFBO0FBQUE7Ozs7WUFJZixTQUFBSCxRQUFBLE1BQUE7QUFBQSxjQUQ0Q0YsWUFBQU0sYUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBekMsU0FBQTtBQUFBLGNBQWdCLEdBQUE7QUFBQTtrQkFBWUMsZ0JBQUEsU0FBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7Ozs7TUFHQSxHQUFBLEVBQUE7QUFBQTs7OyJ9
