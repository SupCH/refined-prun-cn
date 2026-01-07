import config from './config.js';
import _sfc_main$1 from './Active.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storageSort, serializeStorage, deserializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import { getRefuelOrigins } from './utils6.js';
import {
  defineComponent,
  computed,
  watchEffect,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Configure',
  props: {
    data: {},
    config: {},
  },
  setup(__props) {
    const originStorages = computed(() => getRefuelOrigins().sort(storageSort));
    const originOptions = computed(() => getOptions(originStorages.value));
    if (
      __props.data.origin === configurableValue &&
      !__props.config.origin &&
      originStorages.value.length > 0
    ) {
      __props.config.origin = serializeStorage(originStorages.value[0]);
    }
    watchEffect(() => {
      if (__props.data.origin === configurableValue) {
        if (__props.config.origin) {
          const origin = deserializeStorage(__props.config.origin);
          if (!origin || !originStorages.value.includes(origin)) {
            __props.config.origin = void 0;
          }
        }
        if (!__props.config.origin && originStorages.value.length === 1) {
          __props.config.origin = serializeStorage(originStorages.value[0]);
        }
      }
    });
    function getOptions(storages) {
      const options = storages.map(serializeStorage).map(x => ({ label: x, value: x }));
      if (options.length === 0) {
        options.push({ label: 'No locations available', value: void 0 });
      }
      return options;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('form', null, [
          createVNode(
            _sfc_main$1,
            { label: 'From' },
            {
              default: withCtx(() => [
                createVNode(
                  SelectInput,
                  {
                    modelValue: ('config' in _ctx ? _ctx.config : unref(config)).origin,
                    'onUpdate:modelValue':
                      _cache[0] ||
                      (_cache[0] = $event =>
                        (('config' in _ctx ? _ctx.config : unref(config)).origin = $event)),
                    options: unref(originOptions),
                  },
                  null,
                  8,
                  ['modelValue', 'options'],
                ),
              ]),
              _: 1,
            },
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJlLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvcmVmdWVsL0NvbmZpZ3VyZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFNlbGVjdElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9TZWxlY3RJbnB1dC52dWUnO1xuaW1wb3J0IHsgQ29uZmlnIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvbXRyYS9jb25maWcnO1xuaW1wb3J0IHtcbiAgZGVzZXJpYWxpemVTdG9yYWdlLFxuICBzZXJpYWxpemVTdG9yYWdlLFxuICBzdG9yYWdlU29ydCxcbn0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhYmxlVmFsdWUgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcbmltcG9ydCB7IGdldFJlZnVlbE9yaWdpbnMgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9yZWZ1ZWwvdXRpbHMnO1xuXG5jb25zdCB7IGRhdGEsIGNvbmZpZyB9ID0gZGVmaW5lUHJvcHM8eyBkYXRhOiBVc2VyRGF0YS5BY3Rpb25EYXRhOyBjb25maWc6IENvbmZpZyB9PigpO1xuXG5jb25zdCBvcmlnaW5TdG9yYWdlcyA9IGNvbXB1dGVkKCgpID0+IGdldFJlZnVlbE9yaWdpbnMoKS5zb3J0KHN0b3JhZ2VTb3J0KSk7XG5cbmNvbnN0IG9yaWdpbk9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiBnZXRPcHRpb25zKG9yaWdpblN0b3JhZ2VzLnZhbHVlKSk7XG5cbmlmIChkYXRhLm9yaWdpbiA9PT0gY29uZmlndXJhYmxlVmFsdWUgJiYgIWNvbmZpZy5vcmlnaW4gJiYgb3JpZ2luU3RvcmFnZXMudmFsdWUubGVuZ3RoID4gMCkge1xuICBjb25maWcub3JpZ2luID0gc2VyaWFsaXplU3RvcmFnZShvcmlnaW5TdG9yYWdlcy52YWx1ZVswXSk7XG59XG5cbi8vIEF1dG9maWxsIGFuZCBhdXRvZml4IHNlbGVjdGlvbnMgb24gc3RvcmFnZSBsaXN0IGNoYW5nZS5cbndhdGNoRWZmZWN0KCgpID0+IHtcbiAgaWYgKGRhdGEub3JpZ2luID09PSBjb25maWd1cmFibGVWYWx1ZSkge1xuICAgIGlmIChjb25maWcub3JpZ2luKSB7XG4gICAgICBjb25zdCBvcmlnaW4gPSBkZXNlcmlhbGl6ZVN0b3JhZ2UoY29uZmlnLm9yaWdpbik7XG4gICAgICBpZiAoIW9yaWdpbiB8fCAhb3JpZ2luU3RvcmFnZXMudmFsdWUuaW5jbHVkZXMob3JpZ2luKSkge1xuICAgICAgICBjb25maWcub3JpZ2luID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLm9yaWdpbiAmJiBvcmlnaW5TdG9yYWdlcy52YWx1ZS5sZW5ndGggPT09IDEpIHtcbiAgICAgIGNvbmZpZy5vcmlnaW4gPSBzZXJpYWxpemVTdG9yYWdlKG9yaWdpblN0b3JhZ2VzLnZhbHVlWzBdKTtcbiAgICB9XG4gIH1cbn0pO1xuXG5mdW5jdGlvbiBnZXRPcHRpb25zKHN0b3JhZ2VzOiBQcnVuQXBpLlN0b3JlW10pIHtcbiAgY29uc3Qgb3B0aW9ucyA9IHN0b3JhZ2VzLm1hcChzZXJpYWxpemVTdG9yYWdlKS5tYXAoeCA9PiAoeyBsYWJlbDogeCwgdmFsdWU6IHggfSkpO1xuICBpZiAob3B0aW9ucy5sZW5ndGggPT09IDApIHtcbiAgICBvcHRpb25zLnB1c2goeyBsYWJlbDogJ05vIGxvY2F0aW9ucyBhdmFpbGFibGUnLCB2YWx1ZTogdW5kZWZpbmVkISB9KTtcbiAgfVxuICByZXR1cm4gb3B0aW9ucztcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxmb3JtPlxuICAgIDxBY3RpdmUgbGFiZWw9XCJGcm9tXCI+XG4gICAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cImNvbmZpZy5vcmlnaW5cIiA6b3B0aW9ucz1cIm9yaWdpbk9wdGlvbnNcIiAvPlxuICAgIDwvQWN0aXZlPlxuICA8L2Zvcm0+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9jcmVhdGVWTm9kZSIsIkFjdGl2ZSIsIl93aXRoQ3R4IiwiY29uZmlnIiwiX3VucmVmIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFjQSxVQUFBLGlCQUFBLFNBQUEsTUFBQSxpQkFBQSxFQUFBLEtBQUEsV0FBQSxDQUFBO0FBRUEsVUFBQSxnQkFBQSxTQUFBLE1BQUEsV0FBQSxlQUFBLEtBQUEsQ0FBQTtBQUVBLFFBQUEsUUFBQSxLQUFBLFdBQUEscUJBQUEsQ0FBQSxRQUFBLE9BQUEsVUFBQSxlQUFBLE1BQUEsU0FBQSxHQUFBO0FBQ0UsY0FBQSxPQUFBLFNBQUEsaUJBQUEsZUFBQSxNQUFBLENBQUEsQ0FBQTtBQUFBLElBQXdEO0FBSTFELGdCQUFBLE1BQUE7QUFDRSxVQUFBLFFBQUEsS0FBQSxXQUFBLG1CQUFBO0FBQ0UsWUFBQSxRQUFBLE9BQUEsUUFBQTtBQUNFLGdCQUFBLFNBQUEsbUJBQUEsUUFBQSxPQUFBLE1BQUE7QUFDQSxjQUFBLENBQUEsVUFBQSxDQUFBLGVBQUEsTUFBQSxTQUFBLE1BQUEsR0FBQTtBQUNFLG9CQUFBLE9BQUEsU0FBQTtBQUFBLFVBQWdCO0FBQUEsUUFDbEI7QUFHRixZQUFBLENBQUEsUUFBQSxPQUFBLFVBQUEsZUFBQSxNQUFBLFdBQUEsR0FBQTtBQUNFLGtCQUFBLE9BQUEsU0FBQSxpQkFBQSxlQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQUEsUUFBd0Q7QUFBQSxNQUMxRDtBQUFBLElBQ0YsQ0FBQTtBQUdGLGFBQUEsV0FBQSxVQUFBO0FBQ0UsWUFBQSxVQUFBLFNBQUEsSUFBQSxnQkFBQSxFQUFBLElBQUEsQ0FBQSxPQUFBLEVBQUEsT0FBQSxHQUFBLE9BQUEsRUFBQSxFQUFBO0FBQ0EsVUFBQSxRQUFBLFdBQUEsR0FBQTtBQUNFLGdCQUFBLEtBQUEsRUFBQSxPQUFBLDBCQUFBLE9BQUEsUUFBQTtBQUFBLE1BQW1FO0FBRXJFLGFBQUE7QUFBQSxJQUFPOzs7UUFTQUEsWUFBQUMsYUFBQSxFQUFBLE9BQUEsT0FBQSxHQUFBO0FBQUEsVUFIZSxTQUFBQyxRQUFBLE1BQUE7QUFBQSxZQUM4Q0YsWUFBQSxhQUFBO0FBQUEsY0FBQSxhQUExQ0csWUFBQUEsT0FBQUEsS0FBQUEsU0FBQUEsTUFBQUEsTUFBQUEsR0FBQUE7QUFBQUEsY0FBTyx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFlBQVBBLFlBQUFBLE9BQUFBLEtBQUFBLFNBQUFBLE1BQUFBLE1BQUFBLEdBQUFBLFNBQUFBO0FBQUFBLGNBQWEsU0FBQUMsTUFBQSxhQUFBO0FBQUEsWUFBWSxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEsU0FBQSxDQUFBO0FBQUE7Ozs7Ozs7In0=
