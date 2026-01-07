import _sfc_main$1 from './DaysCell.vue.js';
import { showBuffer } from './buffers.js';
import _sfc_main$2 from './PrunButton.vue.js';
import { countDays } from './utils5.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  createCommentVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PlanetHeader',
  props: {
    burn: {},
    hasMinimize: { type: Boolean },
    minimized: { type: Boolean },
    onClick: { type: Function },
  },
  setup(__props) {
    const days = computed(() => countDays(__props.burn.burn));
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'tr',
          {
            class: normalizeClass(_ctx.$style.row),
          },
          [
            createBaseVNode(
              'td',
              {
                colspan: '4',
                class: normalizeClass(_ctx.$style.cell),
                onClick:
                  _cache[0] ||
                  (_cache[0] = //@ts-ignore
                    (...args) => _ctx.onClick && _ctx.onClick(...args)),
              },
              [
                _ctx.hasMinimize
                  ? (openBlock(),
                    createElementBlock(
                      'span',
                      {
                        key: 0,
                        class: normalizeClass(_ctx.$style.minimize),
                      },
                      toDisplayString(_ctx.minimized ? '+' : '-'),
                      3,
                    ))
                  : createCommentVNode('', true),
                createBaseVNode('span', null, toDisplayString(_ctx.burn.planetName), 1),
              ],
              2,
            ),
            createVNode(_sfc_main$1, { days: unref(days) }, null, 8, ['days']),
            createBaseVNode('td', null, [
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_ctx.$style.buttons),
                },
                [
                  createVNode(
                    _sfc_main$2,
                    {
                      dark: '',
                      inline: '',
                      onClick:
                        _cache[1] ||
                        (_cache[1] = $event => unref(showBuffer)(`BS ${_ctx.burn.naturalId}`)),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[3] || (_cache[3] = [createTextVNode('BS', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                  createVNode(
                    _sfc_main$2,
                    {
                      dark: '',
                      inline: '',
                      onClick:
                        _cache[2] ||
                        (_cache[2] = $event =>
                          unref(showBuffer)(`INV ${_ctx.burn.storeId.substring(0, 8)}`)),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[4] || (_cache[4] = [createTextVNode(' INV ', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ],
                2,
              ),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUGxhbmV0SGVhZGVyLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQlVSTi9QbGFuZXRIZWFkZXIudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgRGF5c0NlbGwgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQlVSTi9EYXlzQ2VsbC52dWUnO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgeyBQbGFuZXRCdXJuIH0gZnJvbSAnQHNyYy9jb3JlL2J1cm4nO1xuaW1wb3J0IHsgY291bnREYXlzIH0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQlVSTi91dGlscyc7XG5cbmNvbnN0IHsgYnVybiB9ID0gZGVmaW5lUHJvcHM8e1xuICBidXJuOiBQbGFuZXRCdXJuO1xuICBoYXNNaW5pbWl6ZT86IGJvb2xlYW47XG4gIG1pbmltaXplZD86IGJvb2xlYW47XG4gIG9uQ2xpY2s6ICgpID0+IHZvaWQ7XG59PigpO1xuXG5jb25zdCBkYXlzID0gY29tcHV0ZWQoKCkgPT4gY291bnREYXlzKGJ1cm4uYnVybikpO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHRyIDpjbGFzcz1cIiRzdHlsZS5yb3dcIj5cbiAgICA8dGQgY29sc3Bhbj1cIjRcIiA6Y2xhc3M9XCIkc3R5bGUuY2VsbFwiIEBjbGljaz1cIm9uQ2xpY2tcIj5cbiAgICAgIDxzcGFuIHYtaWY9XCJoYXNNaW5pbWl6ZVwiIDpjbGFzcz1cIiRzdHlsZS5taW5pbWl6ZVwiPlxuICAgICAgICB7eyBtaW5pbWl6ZWQgPyAnKycgOiAnLScgfX1cbiAgICAgIDwvc3Bhbj5cbiAgICAgIDxzcGFuPnt7IGJ1cm4ucGxhbmV0TmFtZSB9fTwvc3Bhbj5cbiAgICA8L3RkPlxuICAgIDxEYXlzQ2VsbCA6ZGF5cz1cImRheXNcIiAvPlxuICAgIDx0ZD5cbiAgICAgIDxkaXYgOmNsYXNzPVwiJHN0eWxlLmJ1dHRvbnNcIj5cbiAgICAgICAgPFBydW5CdXR0b24gZGFyayBpbmxpbmUgQGNsaWNrPVwic2hvd0J1ZmZlcihgQlMgJHtidXJuLm5hdHVyYWxJZH1gKVwiPkJTPC9QcnVuQnV0dG9uPlxuICAgICAgICA8UHJ1bkJ1dHRvbiBkYXJrIGlubGluZSBAY2xpY2s9XCJzaG93QnVmZmVyKGBJTlYgJHtidXJuLnN0b3JlSWQuc3Vic3RyaW5nKDAsIDgpfWApXCI+XG4gICAgICAgICAgSU5WXG4gICAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvZGl2PlxuICAgIDwvdGQ+XG4gIDwvdHI+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLnJvdyB7XG4gIGJvcmRlci1ib3R0b206IDFweCBzb2xpZCAjMmI0ODVhO1xufVxuXG4uY2VsbCB7XG4gIGZvbnQtd2VpZ2h0OiBib2xkO1xuICBmb250LXNpemU6IDEycHg7XG4gIGN1cnNvcjogcG9pbnRlcjtcbn1cblxuLm1pbmltaXplIHtcbiAgZGlzcGxheTogaW5saW5lLWJsb2NrO1xuICB3aWR0aDogMjZweDtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xufVxuXG4uYnV0dG9ucyB7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGZsZXgtZGlyZWN0aW9uOiByb3c7XG4gIGZsZXgtd3JhcDogd3JhcDtcbiAgY29sdW1uLWdhcDogMC4yNXJlbTtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX3RvRGlzcGxheVN0cmluZyIsIl9jcmVhdGVDb21tZW50Vk5vZGUiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX3VucmVmIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7OztBQWNBLFVBQUEsT0FBQSxTQUFBLE1BQUEsVUFBQSxRQUFBLEtBQUEsSUFBQSxDQUFBOzs7UUFvQk8sT0FBQUEsZUFBQSxLQUFBLE9BQUEsR0FBQTtBQUFBLE1BaEJpQixHQUFBO0FBQUE7VUFNZixTQUFBO0FBQUEsVUFMTyxPQUFBQSxlQUFBLEtBQUEsT0FBQSxJQUFBO0FBQUEsVUFBdUIsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUE7QUFBQSxVQUFRLElBQUEsU0FBQSxLQUFBLFdBQUEsS0FBQSxRQUFBLEdBQUEsSUFBQTtBQUFBLFFBQUUsR0FBQTtBQUFBO1lBR3BDLEtBQUE7QUFBQTtVQUZ5QyxHQUFBQyxnQkFBQSxLQUFBLFlBQUEsTUFBQSxHQUFBLEdBQUEsQ0FBQSxLQUFBQyxtQkFBQSxJQUFBLElBQUE7QUFBQTtRQUd4QixHQUFBLENBQUE7QUFBQTtRQUVMQyxnQkFBQSxNQUFBLE1BQUE7QUFBQSxVQVFoQkEsZ0JBQUEsT0FBQTtBQUFBLFlBREcsT0FBQUgsZUFBQSxLQUFBLE9BQUEsT0FBQTtBQUFBLFVBTHFCLEdBQUE7QUFBQTtjQUMwRCxNQUFBO0FBQUEsY0FBdkUsUUFBQTtBQUFBLGNBQUssU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUFJLE1BQUEsVUFBQSxFQUFBLE1BQUEsS0FBQSxLQUFBLFNBQUEsRUFBQTtBQUFBLFlBQThDLEdBQUE7QUFBQTtnQkFBT0MsZ0JBQUEsTUFBQSxFQUFBO0FBQUEsY0FBQSxFQUFBLENBQUE7QUFBQTs7O2NBR3pELE1BQUE7QUFBQSxjQUZELFFBQUE7QUFBQSxjQUFLLFNBQUEsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUEsQ0FBQSxXQUFBRCxNQUFBLFVBQUEsRUFBQSxPQUFBLEtBQUEsS0FBQSxRQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQTtBQUFBLFlBQXVELEdBQUE7QUFBQTtnQkFFeEVDLGdCQUFBLFNBQUEsRUFBQTtBQUFBLGNBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7Ozs7OyJ9
