import config from './config.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$2 from './Passive.vue.js';
import SelectInput from './SelectInput.vue.js';
import { storagesStore } from './storage.js';
import { deserializeStorage, atSameLocation, storageSort, serializeStorage } from './utils3.js';
import { configurableValue } from './shared-types.js';
import {
  defineComponent,
  computed,
  watchEffect,
  createElementBlock,
  openBlock,
  createBlock,
  withCtx,
  createVNode,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Configure',
  props: {
    data: {},
    config: {},
  },
  setup(__props) {
    const allStorages = computed(() => {
      return (storagesStore.all.value ?? []).filter(
        x => x.type !== 'STL_FUEL_STORE' && x.type !== 'FTL_FUEL_STORE',
      );
    });
    const originStorages = computed(() => {
      let storages = [...allStorages.value];
      if (__props.data.dest !== configurableValue) {
        const destination = deserializeStorage(__props.data.dest);
        if (destination) {
          storages = storages.filter(x => atSameLocation(x, destination) && x !== destination);
        }
      }
      return storages.sort(storageSort);
    });
    const originOptions = computed(() => {
      return getOptions(originStorages.value);
    });
    if (
      __props.data.origin === configurableValue &&
      !__props.config.origin &&
      originStorages.value.length > 0
    ) {
      __props.config.origin = serializeStorage(originStorages.value[0]);
    }
    const destinationStorages = computed(() => {
      let storages = [...allStorages.value];
      if (__props.data.origin !== configurableValue) {
        const origin = deserializeStorage(__props.data.origin);
        if (origin) {
          storages = storages.filter(x => atSameLocation(x, origin) && x !== origin);
        }
      }
      return storages.sort(storageSort);
    });
    const destinationOptions = computed(() => {
      return getOptions(destinationStorages.value);
    });
    if (
      __props.data.dest === configurableValue &&
      !__props.config.destination &&
      destinationStorages.value.length > 0
    ) {
      __props.config.destination = serializeStorage(destinationStorages.value[0]);
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
      if (__props.data.dest === configurableValue) {
        if (__props.config.destination) {
          const destination = deserializeStorage(__props.config.destination);
          if (!destination || !destinationStorages.value.includes(destination)) {
            __props.config.destination = void 0;
          }
        }
        if (!__props.config.destination && destinationStorages.value.length === 1) {
          __props.config.destination = serializeStorage(destinationStorages.value[0]);
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
          _ctx.data.origin === unref(configurableValue)
            ? (openBlock(),
              createBlock(
                _sfc_main$1,
                {
                  key: 0,
                  label: 'From',
                },
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
              ))
            : (openBlock(),
              createBlock(
                _sfc_main$2,
                {
                  key: 1,
                  label: 'From',
                },
                {
                  default: withCtx(() => [
                    createBaseVNode('span', null, toDisplayString(_ctx.data.origin), 1),
                  ]),
                  _: 1,
                },
              )),
          _ctx.data.dest === unref(configurableValue)
            ? (openBlock(),
              createBlock(
                _sfc_main$1,
                {
                  key: 2,
                  label: 'To',
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: ('config' in _ctx ? _ctx.config : unref(config)).destination,
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event =>
                            (('config' in _ctx ? _ctx.config : unref(config)).destination =
                              $event)),
                        options: unref(destinationOptions),
                      },
                      null,
                      8,
                      ['modelValue', 'options'],
                    ),
                  ]),
                  _: 1,
                },
              ))
            : (openBlock(),
              createBlock(
                _sfc_main$2,
                {
                  key: 3,
                  label: 'To',
                },
                {
                  default: withCtx(() => [
                    createBaseVNode('span', null, toDisplayString(_ctx.data.dest), 1),
                  ]),
                  _: 1,
                },
              )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29uZmlndXJlLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9tdHJhL0NvbmZpZ3VyZS52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFBhc3NpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1Bhc3NpdmUudnVlJztcbmltcG9ydCBTZWxlY3RJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvU2VsZWN0SW5wdXQudnVlJztcbmltcG9ydCB7IENvbmZpZyB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL210cmEvY29uZmlnJztcbmltcG9ydCB7IHN0b3JhZ2VzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvc3RvcmFnZSc7XG5pbXBvcnQge1xuICBhdFNhbWVMb2NhdGlvbixcbiAgZGVzZXJpYWxpemVTdG9yYWdlLFxuICBzZXJpYWxpemVTdG9yYWdlLFxuICBzdG9yYWdlU29ydCxcbn0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvdXRpbHMnO1xuaW1wb3J0IHsgY29uZmlndXJhYmxlVmFsdWUgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1Qvc2hhcmVkLXR5cGVzJztcblxuY29uc3QgeyBkYXRhLCBjb25maWcgfSA9IGRlZmluZVByb3BzPHsgZGF0YTogVXNlckRhdGEuQWN0aW9uRGF0YTsgY29uZmlnOiBDb25maWcgfT4oKTtcblxuY29uc3QgYWxsU3RvcmFnZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiAoc3RvcmFnZXNTdG9yZS5hbGwudmFsdWUgPz8gW10pLmZpbHRlcihcbiAgICB4ID0+IHgudHlwZSAhPT0gJ1NUTF9GVUVMX1NUT1JFJyAmJiB4LnR5cGUgIT09ICdGVExfRlVFTF9TVE9SRScsXG4gICk7XG59KTtcblxuY29uc3Qgb3JpZ2luU3RvcmFnZXMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGxldCBzdG9yYWdlcyA9IFsuLi5hbGxTdG9yYWdlcy52YWx1ZV07XG4gIGlmIChkYXRhLmRlc3QgIT09IGNvbmZpZ3VyYWJsZVZhbHVlKSB7XG4gICAgY29uc3QgZGVzdGluYXRpb24gPSBkZXNlcmlhbGl6ZVN0b3JhZ2UoZGF0YS5kZXN0KTtcbiAgICBpZiAoZGVzdGluYXRpb24pIHtcbiAgICAgIHN0b3JhZ2VzID0gc3RvcmFnZXMuZmlsdGVyKHggPT4gYXRTYW1lTG9jYXRpb24oeCwgZGVzdGluYXRpb24pICYmIHggIT09IGRlc3RpbmF0aW9uKTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIHN0b3JhZ2VzLnNvcnQoc3RvcmFnZVNvcnQpO1xufSk7XG5cbmNvbnN0IG9yaWdpbk9wdGlvbnMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBnZXRPcHRpb25zKG9yaWdpblN0b3JhZ2VzLnZhbHVlKTtcbn0pO1xuXG5pZiAoZGF0YS5vcmlnaW4gPT09IGNvbmZpZ3VyYWJsZVZhbHVlICYmICFjb25maWcub3JpZ2luICYmIG9yaWdpblN0b3JhZ2VzLnZhbHVlLmxlbmd0aCA+IDApIHtcbiAgY29uZmlnLm9yaWdpbiA9IHNlcmlhbGl6ZVN0b3JhZ2Uob3JpZ2luU3RvcmFnZXMudmFsdWVbMF0pO1xufVxuXG5jb25zdCBkZXN0aW5hdGlvblN0b3JhZ2VzID0gY29tcHV0ZWQoKCkgPT4ge1xuICBsZXQgc3RvcmFnZXMgPSBbLi4uYWxsU3RvcmFnZXMudmFsdWVdO1xuICBpZiAoZGF0YS5vcmlnaW4gIT09IGNvbmZpZ3VyYWJsZVZhbHVlKSB7XG4gICAgY29uc3Qgb3JpZ2luID0gZGVzZXJpYWxpemVTdG9yYWdlKGRhdGEub3JpZ2luKTtcbiAgICBpZiAob3JpZ2luKSB7XG4gICAgICBzdG9yYWdlcyA9IHN0b3JhZ2VzLmZpbHRlcih4ID0+IGF0U2FtZUxvY2F0aW9uKHgsIG9yaWdpbikgJiYgeCAhPT0gb3JpZ2luKTtcbiAgICB9XG4gIH1cblxuICByZXR1cm4gc3RvcmFnZXMuc29ydChzdG9yYWdlU29ydCk7XG59KTtcblxuY29uc3QgZGVzdGluYXRpb25PcHRpb25zID0gY29tcHV0ZWQoKCkgPT4ge1xuICByZXR1cm4gZ2V0T3B0aW9ucyhkZXN0aW5hdGlvblN0b3JhZ2VzLnZhbHVlKTtcbn0pO1xuXG5pZiAoXG4gIGRhdGEuZGVzdCA9PT0gY29uZmlndXJhYmxlVmFsdWUgJiZcbiAgIWNvbmZpZy5kZXN0aW5hdGlvbiAmJlxuICBkZXN0aW5hdGlvblN0b3JhZ2VzLnZhbHVlLmxlbmd0aCA+IDBcbikge1xuICBjb25maWcuZGVzdGluYXRpb24gPSBzZXJpYWxpemVTdG9yYWdlKGRlc3RpbmF0aW9uU3RvcmFnZXMudmFsdWVbMF0pO1xufVxuXG4vLyBBdXRvZmlsbCBhbmQgYXV0b2ZpeCBzZWxlY3Rpb25zIG9uIHN0b3JhZ2UgbGlzdCBjaGFuZ2UuXG53YXRjaEVmZmVjdCgoKSA9PiB7XG4gIGlmIChkYXRhLm9yaWdpbiA9PT0gY29uZmlndXJhYmxlVmFsdWUpIHtcbiAgICBpZiAoY29uZmlnLm9yaWdpbikge1xuICAgICAgY29uc3Qgb3JpZ2luID0gZGVzZXJpYWxpemVTdG9yYWdlKGNvbmZpZy5vcmlnaW4pO1xuICAgICAgaWYgKCFvcmlnaW4gfHwgIW9yaWdpblN0b3JhZ2VzLnZhbHVlLmluY2x1ZGVzKG9yaWdpbikpIHtcbiAgICAgICAgY29uZmlnLm9yaWdpbiA9IHVuZGVmaW5lZDtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoIWNvbmZpZy5vcmlnaW4gJiYgb3JpZ2luU3RvcmFnZXMudmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25maWcub3JpZ2luID0gc2VyaWFsaXplU3RvcmFnZShvcmlnaW5TdG9yYWdlcy52YWx1ZVswXSk7XG4gICAgfVxuICB9XG5cbiAgaWYgKGRhdGEuZGVzdCA9PT0gY29uZmlndXJhYmxlVmFsdWUpIHtcbiAgICBpZiAoY29uZmlnLmRlc3RpbmF0aW9uKSB7XG4gICAgICBjb25zdCBkZXN0aW5hdGlvbiA9IGRlc2VyaWFsaXplU3RvcmFnZShjb25maWcuZGVzdGluYXRpb24pO1xuICAgICAgaWYgKCFkZXN0aW5hdGlvbiB8fCAhZGVzdGluYXRpb25TdG9yYWdlcy52YWx1ZS5pbmNsdWRlcyhkZXN0aW5hdGlvbikpIHtcbiAgICAgICAgY29uZmlnLmRlc3RpbmF0aW9uID0gdW5kZWZpbmVkO1xuICAgICAgfVxuICAgIH1cblxuICAgIGlmICghY29uZmlnLmRlc3RpbmF0aW9uICYmIGRlc3RpbmF0aW9uU3RvcmFnZXMudmFsdWUubGVuZ3RoID09PSAxKSB7XG4gICAgICBjb25maWcuZGVzdGluYXRpb24gPSBzZXJpYWxpemVTdG9yYWdlKGRlc3RpbmF0aW9uU3RvcmFnZXMudmFsdWVbMF0pO1xuICAgIH1cbiAgfVxufSk7XG5cbmZ1bmN0aW9uIGdldE9wdGlvbnMoc3RvcmFnZXM6IFBydW5BcGkuU3RvcmVbXSkge1xuICBjb25zdCBvcHRpb25zID0gc3RvcmFnZXMubWFwKHNlcmlhbGl6ZVN0b3JhZ2UpLm1hcCh4ID0+ICh7IGxhYmVsOiB4LCB2YWx1ZTogeCB9KSk7XG4gIGlmIChvcHRpb25zLmxlbmd0aCA9PT0gMCkge1xuICAgIG9wdGlvbnMucHVzaCh7IGxhYmVsOiAnTm8gbG9jYXRpb25zIGF2YWlsYWJsZScsIHZhbHVlOiB1bmRlZmluZWQhIH0pO1xuICB9XG4gIHJldHVybiBvcHRpb25zO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGZvcm0+XG4gICAgPEFjdGl2ZSB2LWlmPVwiZGF0YS5vcmlnaW4gPT09IGNvbmZpZ3VyYWJsZVZhbHVlXCIgbGFiZWw9XCJGcm9tXCI+XG4gICAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cImNvbmZpZy5vcmlnaW5cIiA6b3B0aW9ucz1cIm9yaWdpbk9wdGlvbnNcIiAvPlxuICAgIDwvQWN0aXZlPlxuICAgIDxQYXNzaXZlIHYtZWxzZSBsYWJlbD1cIkZyb21cIj5cbiAgICAgIDxzcGFuPnt7IGRhdGEub3JpZ2luIH19PC9zcGFuPlxuICAgIDwvUGFzc2l2ZT5cbiAgICA8QWN0aXZlIHYtaWY9XCJkYXRhLmRlc3QgPT09IGNvbmZpZ3VyYWJsZVZhbHVlXCIgbGFiZWw9XCJUb1wiPlxuICAgICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJjb25maWcuZGVzdGluYXRpb25cIiA6b3B0aW9ucz1cImRlc3RpbmF0aW9uT3B0aW9uc1wiIC8+XG4gICAgPC9BY3RpdmU+XG4gICAgPFBhc3NpdmUgdi1lbHNlIGxhYmVsPVwiVG9cIj5cbiAgICAgIDxzcGFuPnt7IGRhdGEuZGVzdCB9fTwvc3Bhbj5cbiAgICA8L1Bhc3NpdmU+XG4gIDwvZm9ybT5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIkFjdGl2ZSIsIl9jcmVhdGVWTm9kZSIsImNvbmZpZyIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWdCQSxVQUFBLGNBQUEsU0FBQSxNQUFBO0FBQ0UsY0FBQSxjQUFBLElBQUEsU0FBQSxDQUFBLEdBQUE7QUFBQSxRQUF1QyxDQUFBLE1BQUEsRUFBQSxTQUFBLG9CQUFBLEVBQUEsU0FBQTtBQUFBLE1BQ1U7QUFBQSxJQUNqRCxDQUFBO0FBR0YsVUFBQSxpQkFBQSxTQUFBLE1BQUE7QUFDRSxVQUFBLFdBQUEsQ0FBQSxHQUFBLFlBQUEsS0FBQTtBQUNBLFVBQUEsUUFBQSxLQUFBLFNBQUEsbUJBQUE7QUFDRSxjQUFBLGNBQUEsbUJBQUEsUUFBQSxLQUFBLElBQUE7QUFDQSxZQUFBLGFBQUE7QUFDRSxxQkFBQSxTQUFBLE9BQUEsQ0FBQSxNQUFBLGVBQUEsR0FBQSxXQUFBLEtBQUEsTUFBQSxXQUFBO0FBQUEsUUFBbUY7QUFBQSxNQUNyRjtBQUVGLGFBQUEsU0FBQSxLQUFBLFdBQUE7QUFBQSxJ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
