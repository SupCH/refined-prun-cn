import { C } from './prun-css.js';
import RangeInput from './RangeInput.vue.js';
import { percent0 } from './format.js';
import { userData } from './user-data.js';
import { playAudio } from './audio-interceptor.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import {
  defineComponent,
  watch,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'AudioVolume',
  setup(__props) {
    const inputText = ref(userData.settings.audioVolume);
    watch(inputText, x => {
      const parsed = typeof x === 'number' ? x : parseFloat(x);
      if (isFinite(parsed)) {
        userData.settings.audioVolume = parsed;
      }
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
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).RadioItem.value,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                  ('C' in _ctx ? _ctx.C : unref(C)).type.typeSmall,
                  _ctx.$style.label,
                ]),
              },
              ' Audio Volume: ' +
                toDisplayString(unref(percent0)(unref(userData).settings.audioVolume)),
              3,
            ),
            createVNode(
              RangeInput,
              {
                modelValue: unref(inputText),
                'onUpdate:modelValue':
                  _cache[0] ||
                  (_cache[0] = $event => (isRef(inputText) ? (inputText.value = $event) : null)),
                class: normalizeClass(_ctx.$style.slider),
                min: 0,
                max: 1,
                step: 0.01,
                'on-change': unref(playAudio),
                onClick: unref(playAudio),
              },
              null,
              8,
              ['modelValue', 'class', 'on-change', 'onClick'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQXVkaW9Wb2x1bWUudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2F1ZGlvLXZvbHVtZS1zbGlkZXIvQXVkaW9Wb2x1bWUudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUmFuZ2VJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvUmFuZ2VJbnB1dC52dWUnO1xuaW1wb3J0IHsgcGVyY2VudDAgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IHBsYXlBdWRpbyB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9hdWRpby1pbnRlcmNlcHRvcic7XG5cbmNvbnN0IGlucHV0VGV4dCA9IHJlZih1c2VyRGF0YS5zZXR0aW5ncy5hdWRpb1ZvbHVtZSk7XG53YXRjaChpbnB1dFRleHQsIHggPT4ge1xuICBjb25zdCBwYXJzZWQgPSB0eXBlb2YgeCA9PT0gJ251bWJlcicgPyB4IDogcGFyc2VGbG9hdCh4KTtcbiAgaWYgKGlzRmluaXRlKHBhcnNlZCkpIHtcbiAgICB1c2VyRGF0YS5zZXR0aW5ncy5hdWRpb1ZvbHVtZSA9IHBhcnNlZDtcbiAgfVxufSk7XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8ZGl2IDpjbGFzcz1cIltDLlJhZGlvSXRlbS52YWx1ZSwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVTbWFsbCwgJHN0eWxlLmxhYmVsXVwiPlxuICAgIEF1ZGlvIFZvbHVtZToge3sgcGVyY2VudDAodXNlckRhdGEuc2V0dGluZ3MuYXVkaW9Wb2x1bWUpIH19XG4gIDwvZGl2PlxuICA8UmFuZ2VJbnB1dFxuICAgIHYtbW9kZWw9XCJpbnB1dFRleHRcIlxuICAgIDpjbGFzcz1cIiRzdHlsZS5zbGlkZXJcIlxuICAgIDptaW49XCIwXCJcbiAgICA6bWF4PVwiMVwiXG4gICAgOnN0ZXA9XCIwLjAxXCJcbiAgICA6b24tY2hhbmdlPVwicGxheUF1ZGlvXCJcbiAgICBAY2xpY2s9XCJwbGF5QXVkaW9cIiAvPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5sYWJlbCB7XG4gIG1hcmdpbi10b3A6IDhweDtcbiAgcG9pbnRlci1ldmVudHM6IG5vbmU7XG59XG5cbi5zbGlkZXIge1xuICBtYXJnaW4tdG9wOiAtNnB4O1xuICBtYXJnaW4tYm90dG9tOiAtMTBweDtcbiAgcGFkZGluZy1yaWdodDogNnB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX3RvRGlzcGxheVN0cmluZyIsIl91bnJlZiIsIl9jcmVhdGVWTm9kZSIsIl9pc1JlZiJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7QUFNQSxVQUFBLFlBQUEsSUFBQSxTQUFBLFNBQUEsV0FBQTtBQUNBLFVBQUEsV0FBQSxDQUFBLE1BQUE7QUFDRSxZQUFBLFNBQUEsT0FBQSxNQUFBLFdBQUEsSUFBQSxXQUFBLENBQUE7QUFDQSxVQUFBLFNBQUEsTUFBQSxHQUFBO0FBQ0UsaUJBQUEsU0FBQSxjQUFBO0FBQUEsTUFBZ0M7QUFBQSxJQUNsQyxDQUFBOzs7O1VBT00sT0FBQUEsZUFBQSxFQUZRQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxxQkFBbUJBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHVCQUFxQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7UUFBOEIsR0FBQSxvQkFBQUMsZ0JBQUFDLE1BQUEsUUFBQSxFQUFBQSxNQUFBLFFBQUEsRUFBQSxTQUFBLFdBQUEsQ0FBQSxHQUFBLENBQUE7QUFBQSxRQUMzQkMsWUFBQSxZQUFBO0FBQUEsVUFTbEMsWUFBQUQsTUFBQSxTQUFBO0FBQUEsVUFOWix1QkFBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFFLE1BQUEsU0FBQSxJQUFBLFVBQUEsUUFBQSxTQUFBO0FBQUEsVUFBUyxPQUFBTCxlQUFBLEtBQUEsT0FBQSxNQUFBO0FBQUEsVUFDRyxLQUFBO0FBQUEsVUFDZixLQUFBO0FBQUEsVUFDQSxNQUFBO0FBQUEsVUFDQyxhQUFBRyxNQUFBLFNBQUE7QUFBQSxVQUNLLFNBQUFBLE1BQUEsU0FBQTtBQUFBLFFBQ0osR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLFNBQUEsYUFBQSxTQUFBLENBQUE7QUFBQTs7OzsifQ==
