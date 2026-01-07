import { vModelText } from './runtime-dom.esm-bundler.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  createElementBlock,
  openBlock,
  withDirectives,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = ['min', 'max', 'step'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RangeInput',
  props: /* @__PURE__ */ mergeModels(
    {
      max: { default: 100 },
      min: { default: 0 },
      step: { default: 1 },
      onChange: { type: Function },
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          withDirectives(
            createBaseVNode(
              'input',
              {
                'onUpdate:modelValue': _cache[0] || (_cache[0] = $event => (model.value = $event)),
                class: normalizeClass(_ctx.$style.input),
                type: 'range',
                min: _ctx.min,
                max: _ctx.max,
                step: _ctx.step,
                onChange:
                  _cache[1] ||
                  (_cache[1] = //@ts-ignore
                    (...args) => _ctx.onChange && _ctx.onChange(...args)),
              },
              null,
              42,
              _hoisted_1,
            ),
            [[vModelText, model.value]],
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUmFuZ2VJbnB1dC52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29tcG9uZW50cy9mb3Jtcy9SYW5nZUlucHV0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuY29uc3Qge1xuICBtYXggPSAxMDAsXG4gIG1pbiA9IDAsXG4gIHN0ZXAgPSAxLFxufSA9IGRlZmluZVByb3BzPHsgbWF4PzogbnVtYmVyOyBtaW4/OiBudW1iZXI7IHN0ZXA/OiBudW1iZXI7IG9uQ2hhbmdlPzogKCkgPT4gdm9pZCB9PigpO1xuXG5jb25zdCBtb2RlbCA9IGRlZmluZU1vZGVsPG51bWJlcj4oKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPGlucHV0XG4gICAgICB2LW1vZGVsPVwibW9kZWxcIlxuICAgICAgOmNsYXNzPVwiJHN0eWxlLmlucHV0XCJcbiAgICAgIHR5cGU9XCJyYW5nZVwiXG4gICAgICA6bWluPVwibWluXCJcbiAgICAgIDptYXg9XCJtYXhcIlxuICAgICAgOnN0ZXA9XCJzdGVwXCJcbiAgICAgIEBjaGFuZ2U9XCJvbkNoYW5nZVwiIC8+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5pbnB1dCB7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbiAgbWFyZ2luOiAxOHB4IDA7XG4gIHdpZHRoOiAxMDAlO1xuICBiYWNrZ3JvdW5kOiB0cmFuc3BhcmVudDtcbn1cblxuLmlucHV0OmZvY3VzIHtcbiAgb3V0bGluZTogbm9uZTtcbn1cblxuLmlucHV0Ojotd2Via2l0LXNsaWRlci1ydW5uYWJsZS10cmFjayB7XG4gIHdpZHRoOiAxMDAlO1xuICBoZWlnaHQ6IDZweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBiYWNrZ3JvdW5kLWNvbG9yOiAjMjgzNzQzO1xufVxuXG4uaW5wdXQ6Oi1tb3otcmFuZ2UtdHJhY2sge1xuICB3aWR0aDogMTAwJTtcbiAgaGVpZ2h0OiA2cHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI4Mzc0Mztcbn1cblxuLmlucHV0Ojotd2Via2l0LXNsaWRlci10aHVtYiB7XG4gIG1hcmdpbi1sZWZ0OiAwO1xuICBtYXJnaW4tdG9wOiAtNHB4O1xuICB3aWR0aDogMTRweDtcbiAgaGVpZ2h0OiAxNHB4O1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIGJvcmRlci1yYWRpdXM6IDUwJTtcbiAgYm9yZGVyOiBzb2xpZCAycHggI2ZiZDM4MDtcbiAgYmFja2dyb3VuZC1jb2xvcjogIzI2MjYyNjtcbiAgei1pbmRleDogMjtcbiAgYXBwZWFyYW5jZTogbm9uZTtcbiAgLXdlYmtpdC1hcHBlYXJhbmNlOiBub25lO1xufVxuXG4uaW5wdXQ6Oi1tb3otcmFuZ2UtdGh1bWIge1xuICBtYXJnaW4tbGVmdDogMDtcbiAgbWFyZ2luLXRvcDogLTRweDtcbiAgd2lkdGg6IDE0cHg7XG4gIGhlaWdodDogMTRweDtcbiAgY3Vyc29yOiBwb2ludGVyO1xuICBib3JkZXItcmFkaXVzOiA1MCU7XG4gIGJvcmRlcjogc29saWQgMnB4ICNmYmQzODA7XG4gIGJhY2tncm91bmQtY29sb3I6ICMyNjI2MjY7XG4gIHotaW5kZXg6IDI7XG4gIGFwcGVhcmFuY2U6IG5vbmU7XG4gIC13ZWJraXQtYXBwZWFyYW5jZTogbm9uZTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VzZU1vZGVsIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCIkc3R5bGUiLCJtaW4iLCJtYXgiLCJzdGVwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQU9BLFVBQU0sUUFBUUEsU0FBbUIsU0FBQSxZQUFDOzswQkFJaENDLG1CQVNNLE9BQUEsTUFBQTtBQUFBLHVCQVJKQyxnQkFPdUIsU0FBQTtBQUFBLHVFQU5aLE1BQUssUUFBQTtBQUFBLFVBQ2IsT0FBS0MsZUFBRUMsS0FBQUEsT0FBTyxLQUFLO0FBQUEsVUFDcEIsTUFBSztBQUFBLFVBQ0osS0FBS0MsS0FBQUE7QUFBQUEsVUFDTCxLQUFLQyxLQUFBQTtBQUFBQSxVQUNMLE1BQU1DLEtBQUFBO0FBQUFBLFVBQ04sVUFBTSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUE7QUFBQSx1QkFBRSxLQUFBLFlBQUEsS0FBQSxTQUFBLEdBQUEsSUFBQTtBQUFBLFFBQUE7dUJBTkEsTUFBQSxLQUFLO0FBQUEsUUFBQTs7Ozs7In0=
