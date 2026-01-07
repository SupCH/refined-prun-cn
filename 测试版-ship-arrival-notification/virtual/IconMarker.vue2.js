import { withModifiers } from './runtime-dom.esm-bundler.js';
import fa from './font-awesome.module.css.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeStyle, normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'IconMarker',
  props: {
    color: {},
    marker: {},
    onNext: { type: Function },
    onPrevious: { type: Function },
  },
  setup(__props) {
    const boxStyle = computed(() => ({
      display: __props.marker !== void 0 ? 'block' : void 0,
    }));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.container),
            onClick:
              _cache[0] ||
              (_cache[0] = withModifiers(
                //@ts-ignore
                (...args) => _ctx.onNext && _ctx.onNext(...args),
                ['left', 'prevent', 'stop'],
              )),
            onContextmenu:
              _cache[1] ||
              (_cache[1] = withModifiers(
                //@ts-ignore
                (...args) => _ctx.onPrevious && _ctx.onPrevious(...args),
                ['right', 'prevent', 'stop'],
              )),
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.box),
                style: normalizeStyle(unref(boxStyle)),
              },
              [
                _ctx.marker
                  ? (openBlock(),
                    createElementBlock(
                      'div',
                      {
                        key: 0,
                        class: normalizeClass([unref(fa).solid, _ctx.$style.icon]),
                        style: normalizeStyle({ color: _ctx.color }),
                      },
                      toDisplayString(_ctx.marker),
                      7,
                    ))
                  : createCommentVNode('', true),
              ],
              6,
            ),
          ],
          34,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSWNvbk1hcmtlci52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaW52LWl0ZW0tbWFya2Vycy9JY29uTWFya2VyLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuXG5jb25zdCB7IG1hcmtlciB9ID0gZGVmaW5lUHJvcHM8e1xuICBjb2xvcj86IHN0cmluZztcbiAgbWFya2VyPzogc3RyaW5nO1xuICBvbk5leHQ6ICgpID0+IHZvaWQ7XG4gIG9uUHJldmlvdXM6ICgpID0+IHZvaWQ7XG59PigpO1xuXG5jb25zdCBib3hTdHlsZSA9IGNvbXB1dGVkKCgpID0+ICh7XG4gIGRpc3BsYXk6IG1hcmtlciAhPT0gdW5kZWZpbmVkID8gJ2Jsb2NrJyA6IHVuZGVmaW5lZCxcbn0pKTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXZcbiAgICA6Y2xhc3M9XCIkc3R5bGUuY29udGFpbmVyXCJcbiAgICBAY2xpY2subGVmdC5wcmV2ZW50LnN0b3A9XCJvbk5leHRcIlxuICAgIEBjbGljay5yaWdodC5wcmV2ZW50LnN0b3A9XCJvblByZXZpb3VzXCI+XG4gICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUuYm94XCIgOnN0eWxlPVwiYm94U3R5bGVcIj5cbiAgICAgIDxkaXYgdi1pZj1cIm1hcmtlclwiIDpjbGFzcz1cIltmYS5zb2xpZCwgJHN0eWxlLmljb25dXCIgOnN0eWxlPVwieyBjb2xvciB9XCI+e3sgbWFya2VyIH19PC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi5jb250YWluZXIge1xuICB3aWR0aDogMTVweDtcbiAgaGVpZ2h0OiAxNXB4O1xuICBwb3NpdGlvbjogYWJzb2x1dGU7XG4gIGJvdHRvbTogMDtcbiAgdXNlci1zZWxlY3Q6IG5vbmU7XG59XG5cbi5ib3gge1xuICBiYWNrZ3JvdW5kOiAjMjkzNTNmO1xuICBib3JkZXItY29sb3I6ICMzMTRiNWY7XG4gIGJvcmRlci1zdHlsZTogc29saWQ7XG4gIGJvcmRlci13aWR0aDogMXB4O1xuICBib3JkZXItcmFkaXVzOiA0cHggNHB4IDRweCAwO1xuICBoZWlnaHQ6IDEwMCU7XG4gIHdpZHRoOiAxMDAlO1xuICBkaXNwbGF5OiBub25lO1xuXG4gIC5jb250YWluZXI6aG92ZXIgPiAmIHtcbiAgICBkaXNwbGF5OiBibG9jaztcbiAgfVxufVxuXG4uaWNvbiB7XG4gIG1hcmdpbjogMXB4O1xuICBmb250LXNpemU6IDEwcHg7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogY2VudGVyO1xuICBhbGlnbi1pdGVtczogY2VudGVyO1xuICB0ZXh0LXNoYWRvdzogMXB4IDFweCAjMjIyO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJfd2l0aE1vZGlmaWVycyIsIl9ub3JtYWxpemVTdHlsZSIsIl91bnJlZiIsIl90b0Rpc3BsYXlTdHJpbmciLCJfY3JlYXRlQ29tbWVudFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQVVBLFVBQUEsV0FBQSxTQUFBLE9BQUE7QUFBQSxNQUFpQyxTQUFBLFFBQUEsV0FBQSxTQUFBLFVBQUE7QUFBQSxJQUNXLEVBQUE7OztRQVlwQyxPQUFBQSxlQUFBLEtBQUEsT0FBQSxTQUFBO0FBQUEsUUFOb0IsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUM7QUFBQUE7QUFBQUEsVUFDbEIsSUFBQSxTQUFBLEtBQUEsVUFBQSxLQUFBLE9BQUEsR0FBQSxJQUFBO0FBQUEsVUFBb0IsQ0FBQSxRQUFBLFdBQUEsTUFBQTtBQUFBLFFBQU07QUFBQSxRQUFBLGVBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFBO0FBQUFBO0FBQUFBO1VBQ0wsQ0FBQSxTQUFBLFdBQUEsTUFBQTtBQUFBLFFBQVU7QUFBQSxNQUFBLEdBQUE7QUFBQTtVQUcvQixPQUFBRCxlQUFBLEtBQUEsT0FBQSxHQUFBO0FBQUEsVUFGaUIsT0FBQUUsZUFBQUMsTUFBQSxRQUFBLENBQUE7QUFBQSxRQUFrQixHQUFBO0FBQUE7WUFDa0QsS0FBQTtBQUFBO1lBQXhDLE9BQUFELGVBQUEsRUFBQSxPQUFBLEtBQUEsTUFBQSxDQUFBO0FBQUEsVUFBa0IsR0FBQUUsZ0JBQUEsS0FBQSxNQUFBLEdBQUEsQ0FBQSxLQUFBQyxtQkFBQSxJQUFBLElBQUE7QUFBQTs7Ozs7In0=
