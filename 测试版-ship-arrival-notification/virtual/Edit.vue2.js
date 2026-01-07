import _sfc_main$1 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storagesStore } from './storage.js';
import { storageSort, serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import { t } from './index5.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
    pkg: {},
  },
  setup(__props, { expose: __expose }) {
    const materialGroups = computed(() => __props.pkg.groups.map(x => x.name).filter(x => x));
    const materialGroup = ref(__props.action.group ?? materialGroups.value[0]);
    const storages = computed(() => {
      const storages2 = [...(storagesStore.all.value ?? [])]
        .filter(x => x.type !== 'STL_FUEL_STORE' && x.type !== 'FTL_FUEL_STORE')
        .sort(storageSort)
        .map(serializeStorage);
      storages2.unshift(configurableValue);
      return storages2;
    });
    const origin = ref(__props.action.origin ?? storages.value[0]);
    const destination = ref(__props.action.dest ?? storages.value[0]);
    function validate() {
      return true;
    }
    function save() {
      __props.action.group = materialGroup.value;
      __props.action.origin = origin.value;
      __props.action.dest = destination.value;
    }
    __expose({ validate, save });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.materialGroup'),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(materialGroup),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event =>
                          isRef(materialGroup) ? (materialGroup.value = $event) : null),
                      options: unref(materialGroups),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.origin'),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(origin),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event => (isRef(origin) ? (origin.value = $event) : null)),
                      options: unref(storages),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ),
            createVNode(
              _sfc_main$1,
              {
                label: unref(t)('act.destination'),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(destination),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(destination) ? (destination.value = $event) : null),
                      options: unref(storages),
                    },
                    null,
                    8,
                    ['modelValue', 'options'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL210cmEvRWRpdC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9TZWxlY3RJbnB1dC52dWUnO1xuaW1wb3J0IHsgc3RvcmFnZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zdG9yYWdlJztcbmltcG9ydCB7IHNlcmlhbGl6ZVN0b3JhZ2UsIHN0b3JhZ2VTb3J0IH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhYmxlVmFsdWUgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcblxuaW1wb3J0IHsgdCB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bic7XG5cbmNvbnN0IHsgYWN0aW9uLCBwa2cgfSA9IGRlZmluZVByb3BzPHtcbiAgYWN0aW9uOiBVc2VyRGF0YS5BY3Rpb25EYXRhO1xuICBwa2c6IFVzZXJEYXRhLkFjdGlvblBhY2thZ2VEYXRhO1xufT4oKTtcblxuY29uc3QgbWF0ZXJpYWxHcm91cHMgPSBjb21wdXRlZCgoKSA9PiBwa2cuZ3JvdXBzLm1hcCh4ID0+IHgubmFtZSEpLmZpbHRlcih4ID0+IHgpKTtcbmNvbnN0IG1hdGVyaWFsR3JvdXAgPSByZWYoYWN0aW9uLmdyb3VwID8/IG1hdGVyaWFsR3JvdXBzLnZhbHVlWzBdKTtcblxuY29uc3Qgc3RvcmFnZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHN0b3JhZ2VzID0gWy4uLihzdG9yYWdlc1N0b3JlLmFsbC52YWx1ZSA/PyBbXSldXG4gICAgLmZpbHRlcih4ID0+IHgudHlwZSAhPT0gJ1NUTF9GVUVMX1NUT1JFJyAmJiB4LnR5cGUgIT09ICdGVExfRlVFTF9TVE9SRScpXG4gICAgLnNvcnQoc3RvcmFnZVNvcnQpXG4gICAgLm1hcChzZXJpYWxpemVTdG9yYWdlKTtcbiAgc3RvcmFnZXMudW5zaGlmdChjb25maWd1cmFibGVWYWx1ZSk7XG4gIHJldHVybiBzdG9yYWdlcztcbn0pO1xuXG5jb25zdCBvcmlnaW4gPSByZWYoYWN0aW9uLm9yaWdpbiA/PyBzdG9yYWdlcy52YWx1ZVswXSk7XG5jb25zdCBkZXN0aW5hdGlvbiA9IHJlZihhY3Rpb24uZGVzdCA/PyBzdG9yYWdlcy52YWx1ZVswXSk7XG5cbmZ1bmN0aW9uIHZhbGlkYXRlKCkge1xuICByZXR1cm4gdHJ1ZTtcbn1cblxuZnVuY3Rpb24gc2F2ZSgpIHtcbiAgYWN0aW9uLmdyb3VwID0gbWF0ZXJpYWxHcm91cC52YWx1ZTtcbiAgYWN0aW9uLm9yaWdpbiA9IG9yaWdpbi52YWx1ZTtcbiAgYWN0aW9uLmRlc3QgPSBkZXN0aW5hdGlvbi52YWx1ZTtcbn1cblxuZGVmaW5lRXhwb3NlKHsgdmFsaWRhdGUsIHNhdmUgfSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8QWN0aXZlIDpsYWJlbD1cInQoJ2FjdC5tYXRlcmlhbEdyb3VwJylcIj5cbiAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cIm1hdGVyaWFsR3JvdXBcIiA6b3B0aW9ucz1cIm1hdGVyaWFsR3JvdXBzXCIgLz5cbiAgPC9BY3RpdmU+XG4gIDxBY3RpdmUgOmxhYmVsPVwidCgnYWN0Lm9yaWdpbicpXCI+XG4gICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJvcmlnaW5cIiA6b3B0aW9ucz1cInN0b3JhZ2VzXCIgLz5cbiAgPC9BY3RpdmU+XG4gIDxBY3RpdmUgOmxhYmVsPVwidCgnYWN0LmRlc3RpbmF0aW9uJylcIj5cbiAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cImRlc3RpbmF0aW9uXCIgOm9wdGlvbnM9XCJzdG9yYWdlc1wiIC8+XG4gIDwvQWN0aXZlPlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfdW5yZWYiLCJfY3JlYXRlVk5vZGUiLCJfaXNSZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7OztBQWNBLFVBQUEsaUJBQUEsU0FBQSxNQUFBLFFBQUEsSUFBQSxPQUFBLElBQUEsQ0FBQSxNQUFBLEVBQUEsSUFBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLENBQUEsQ0FBQTtBQUNBLFVBQUEsZ0JBQUEsSUFBQSxRQUFBLE9BQUEsU0FBQSxlQUFBLE1BQUEsQ0FBQSxDQUFBO0FBRUEsVUFBQSxXQUFBLFNBQUEsTUFBQTtBQUNFLFlBQUEsWUFBQSxDQUFBLEdBQUEsY0FBQSxJQUFBLFNBQUEsRUFBQSxFQUFBLE9BQUEsQ0FBQSxNQUFBLEVBQUEsU0FBQSxvQkFBQSxFQUFBLFNBQUEsZ0JBQUEsRUFBQSxLQUFBLFdBQUEsRUFBQSxJQUFBLGdCQUFBO0FBSUEsZ0JBQUEsUUFBQSxpQkFBQTtBQUNBLGFBQUE7QUFBQSxJQUFPLENBQUE7QUFHVCxVQUFBLFNBQUEsSUFBQSxRQUFBLE9BQUEsVUFBQSxTQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQ0EsVUFBQSxjQUFBLElBQUEsUUFBQSxPQUFBLFFBQUEsU0FBQSxNQUFBLENBQUEsQ0FBQTtBQUVBLGFBQUEsV0FBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBR1QsYUFBQSxPQUFBO0FBQ0UsY0FBQSxPQUFBLFFBQUEsY0FBQTtBQUNBLGNBQUEsT0FBQSxTQUFBLE9BQUE7QUFDQSxjQUFBLE9BQUEsT0FBQSxZQUFBO0FBQUEsSUFBMEI7QUFHNUIsYUFBQSxFQUFBLFVBQUEsTUFBQTs7OztVQU1XLE9BQUFBLE1BQUEsQ0FBQSxFQUFBLG1CQUFBO0FBQUEsUUFGUSxHQUFBO0FBQUE7WUFDa0RDLFlBQUEsYUFBQTtBQUFBLGNBQUEsWUFBQUQsTUFBQSxhQUFBO0FBQUEsY0FBM0MsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBRSxNQUFBLGFBQUEsSUFBQSxjQUFBLFFBQUEsU0FBQTtBQUFBLGNBQWEsU0FBQUYsTUFBQSxjQUFBO0FBQUEsWUFBWSxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEsU0FBQSxDQUFBO0FBQUE7Ozs7VUFJeEMsT0FBQUEsTUFBQSxDQUFBLEVBQUEsWUFBQTtBQUFBLFFBRlEsR0FBQTtBQUFBO1lBQ3FDQyxZQUFBLGFBQUE7QUFBQSxjQUFBLFlBQUFELE1BQUEsTUFBQTtBQUFBLGNBQTlCLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUUsTUFBQSxNQUFBLElBQUEsT0FBQSxRQUFBLFNBQUE7QUFBQSxjQUFNLFNBQUFGLE1BQUEsUUFBQTtBQUFBLFlBQVksR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLFNBQUEsQ0FBQTtBQUFBOzs7O1VBSWpDLE9BQUFBLE1BQUEsQ0FBQSxFQUFBLGlCQUFBO0FBQUEsUUFGUSxHQUFBO0FBQUE7WUFDMENDLFlBQUEsYUFBQTtBQUFBLGNBQUEsWUFBQUQsTUFBQSxXQUFBO0FBQUEsY0FBbkMsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBRSxNQUFBLFdBQUEsSUFBQSxZQUFBLFFBQUEsU0FBQTtBQUFBLGNBQVcsU0FBQUYsTUFBQSxRQUFBO0FBQUEsWUFBWSxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEsU0FBQSxDQUFBO0FBQUE7Ozs7Ozs7In0=
