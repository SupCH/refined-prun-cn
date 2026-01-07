import _sfc_main$2 from './RadioGroupContainer.vue.js';
import _sfc_main$1 from './RadioItem.vue.js';
import { userData } from './user-data.js';
import {
  defineComponent,
  createBlock,
  openBlock,
  withCtx,
  createVNode,
  createTextVNode,
  computed,
} from './runtime-core.esm-bundler.js';
import { isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SettingsGroup',
  props: {
    chartType: {},
    onChange: { type: Function },
  },
  setup(__props) {
    function createToggleModel(type) {
      return computed({
        get: () => (__props.chartType ?? userData.settings.defaultChartType) === type,
        set: value => {
          if (value) {
            __props.onChange(type);
          }
        },
      });
    }
    const smooth = createToggleModel('SMOOTH');
    const aligned = createToggleModel('ALIGNED');
    const raw = createToggleModel('RAW');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createBlock(
          _sfc_main$2,
          { horizontal: '' },
          {
            default: withCtx(() => [
              createVNode(
                _sfc_main$1,
                {
                  modelValue: unref(smooth),
                  'onUpdate:modelValue':
                    _cache[0] ||
                    (_cache[0] = $event => (isRef(smooth) ? (smooth.value = $event) : null)),
                  horizontal: '',
                },
                {
                  default: withCtx(() => [
                    ...(_cache[3] || (_cache[3] = [createTextVNode('smooth', -1)])),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  modelValue: unref(aligned),
                  'onUpdate:modelValue':
                    _cache[1] ||
                    (_cache[1] = $event => (isRef(aligned) ? (aligned.value = $event) : null)),
                  horizontal: '',
                },
                {
                  default: withCtx(() => [
                    ...(_cache[4] || (_cache[4] = [createTextVNode('aligned', -1)])),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
              createVNode(
                _sfc_main$1,
                {
                  modelValue: unref(raw),
                  'onUpdate:modelValue':
                    _cache[2] || (_cache[2] = $event => (isRef(raw) ? (raw.value = $event) : null)),
                  horizontal: '',
                },
                {
                  default: withCtx(() => [
                    ...(_cache[5] || (_cache[5] = [createTextVNode('raw', -1)])),
                  ]),
                  _: 1,
                },
                8,
                ['modelValue'],
              ),
            ]),
            _: 1,
          },
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiU2V0dGluZ3NHcm91cC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9jeHBjLWNoYXJ0LXR5cGVzL1NldHRpbmdzR3JvdXAudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUmFkaW9Hcm91cENvbnRhaW5lciBmcm9tICdAc3JjL2NvbXBvbmVudHMvUmFkaW9Hcm91cENvbnRhaW5lci52dWUnO1xuaW1wb3J0IFJhZGlvSXRlbSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvUmFkaW9JdGVtLnZ1ZSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcblxuY29uc3QgeyBjaGFydFR5cGUsIG9uQ2hhbmdlIH0gPSBkZWZpbmVQcm9wczx7XG4gIGNoYXJ0VHlwZTogVXNlckRhdGEuRXhjaGFuZ2VDaGFydFR5cGUgfCB1bmRlZmluZWQ7XG4gIG9uQ2hhbmdlOiAodHlwZTogVXNlckRhdGEuRXhjaGFuZ2VDaGFydFR5cGUpID0+IHZvaWQ7XG59PigpO1xuXG5mdW5jdGlvbiBjcmVhdGVUb2dnbGVNb2RlbCh0eXBlOiBVc2VyRGF0YS5FeGNoYW5nZUNoYXJ0VHlwZSkge1xuICByZXR1cm4gY29tcHV0ZWQoe1xuICAgIGdldDogKCkgPT4gKGNoYXJ0VHlwZSA/PyB1c2VyRGF0YS5zZXR0aW5ncy5kZWZhdWx0Q2hhcnRUeXBlKSA9PT0gdHlwZSxcbiAgICBzZXQ6IHZhbHVlID0+IHtcbiAgICAgIGlmICh2YWx1ZSkge1xuICAgICAgICBvbkNoYW5nZSh0eXBlKTtcbiAgICAgIH1cbiAgICB9LFxuICB9KTtcbn1cblxuY29uc3Qgc21vb3RoID0gY3JlYXRlVG9nZ2xlTW9kZWwoJ1NNT09USCcpO1xuY29uc3QgYWxpZ25lZCA9IGNyZWF0ZVRvZ2dsZU1vZGVsKCdBTElHTkVEJyk7XG5jb25zdCByYXcgPSBjcmVhdGVUb2dnbGVNb2RlbCgnUkFXJyk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8UmFkaW9Hcm91cENvbnRhaW5lciBob3Jpem9udGFsPlxuICAgIDxSYWRpb0l0ZW0gdi1tb2RlbD1cInNtb290aFwiIGhvcml6b250YWw+c21vb3RoPC9SYWRpb0l0ZW0+XG4gICAgPFJhZGlvSXRlbSB2LW1vZGVsPVwiYWxpZ25lZFwiIGhvcml6b250YWw+YWxpZ25lZDwvUmFkaW9JdGVtPlxuICAgIDxSYWRpb0l0ZW0gdi1tb2RlbD1cInJhd1wiIGhvcml6b250YWw+cmF3PC9SYWRpb0l0ZW0+XG4gIDwvUmFkaW9Hcm91cENvbnRhaW5lcj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX3dpdGhDdHgiLCJfY3JlYXRlVk5vZGUiLCJSYWRpb0l0ZW0iLCJfdW5yZWYiLCJfaXNSZWYiLCJfY3JlYXRlVGV4dFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFVQSxhQUFBLGtCQUFBLE1BQUE7QUFDRSxhQUFBLFNBQUE7QUFBQSxRQUFnQixLQUFBLE9BQUEsUUFBQSxhQUFBLFNBQUEsU0FBQSxzQkFBQTtBQUFBLFFBQ21ELEtBQUEsQ0FBQSxVQUFBO0FBRS9ELGNBQUEsT0FBQTtBQUNFLG9CQUFBLFNBQUEsSUFBQTtBQUFBLFVBQWE7QUFBQSxRQUNmO0FBQUEsTUFDRixDQUFBO0FBQUEsSUFDRDtBQUdILFVBQUEsU0FBQSxrQkFBQSxRQUFBO0FBQ0EsVUFBQSxVQUFBLGtCQUFBLFNBQUE7QUFDQSxVQUFBLE1BQUEsa0JBQUEsS0FBQTs7O1FBSWlDLFNBQUFBLFFBQUEsTUFBQTtBQUFBLFVBQzRCQyxZQUFBQyxhQUFBO0FBQUEsWUFBQSxZQUFBQyxNQUFBLE1BQUE7QUFBQSxZQUFyQyx1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFDLE1BQUEsTUFBQSxJQUFBLE9BQUEsUUFBQSxTQUFBO0FBQUEsWUFBTSxZQUFBO0FBQUEsVUFBRSxHQUFBO0FBQUE7Y0FBaUJDLGdCQUFBLFVBQUEsRUFBQTtBQUFBLFlBQUEsRUFBQSxDQUFBO0FBQUE7OztZQUNjLFlBQUFGLE1BQUEsT0FBQTtBQUFBLFlBQXZDLHVCQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUMsTUFBQSxPQUFBLElBQUEsUUFBQSxRQUFBLFNBQUE7QUFBQSxZQUFPLFlBQUE7QUFBQSxVQUFFLEdBQUE7QUFBQTtjQUFrQkMsZ0JBQUEsV0FBQSxFQUFBO0FBQUEsWUFBQSxFQUFBLENBQUE7QUFBQTs7O1lBQ0ksWUFBQUYsTUFBQSxHQUFBO0FBQUEsWUFBL0IsdUJBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBQyxNQUFBLEdBQUEsSUFBQSxJQUFBLFFBQUEsU0FBQTtBQUFBLFlBQUcsWUFBQTtBQUFBLFVBQUUsR0FBQTtBQUFBO2NBQWNDLGdCQUFBLE9BQUEsRUFBQTtBQUFBLFlBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7Ozs7OyJ9
