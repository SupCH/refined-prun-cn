import { C } from './prun-css.js';
import MaterialIcon from './MaterialIcon.vue.js';
import _sfc_main$1 from './DaysCell.vue.js';
import { fixed0, fixed1, fixed2 } from './format.js';
import { useTileState } from './tile-state5.js';
import _sfc_main$2 from './PrunButton.vue.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  createCommentVNode,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'MaterialRow',
  props: {
    alwaysVisible: { type: Boolean },
    burn: {},
    material: {},
  },
  setup(__props) {
    const production = computed(() => __props.burn.dailyAmount);
    const invAmount = computed(() => __props.burn.inventory ?? 0);
    const isInf = computed(() => production.value >= 0);
    const days = computed(() => (isInf.value ? 1e3 : __props.burn.daysLeft));
    const isRed = computed(() => days.value <= userData.settings.burn.red);
    const isYellow = computed(() => days.value <= userData.settings.burn.yellow);
    const isGreen = computed(() => days.value > userData.settings.burn.yellow);
    const red = useTileState('red');
    const yellow = useTileState('yellow');
    const green = useTileState('green');
    const inf = useTileState('inf');
    const isVisible = computed(() => {
      if (__props.alwaysVisible) {
        return true;
      }
      if (isInf.value) {
        return inf.value;
      }
      return (
        (isRed.value && red.value) ||
        (isYellow.value && yellow.value) ||
        (isGreen.value && green.value)
      );
    });
    const changeText = computed(() => {
      const abs = Math.abs(production.value);
      const fixed = abs >= 1e3 ? fixed0(abs) : abs >= 100 ? fixed1(abs) : fixed2(abs);
      return production.value > 0 ? '+' + fixed : production.value < 0 ? '-' + fixed : 0;
    });
    const changeClass = computed(() => ({
      [C.ColoredValue.positive]: production.value > 0,
    }));
    const needAmt = computed(() => {
      const resupply = userData.settings.burn.resupply;
      if (days.value > resupply || production.value > 0) {
        return 0;
      }
      let need = Math.ceil((days.value - resupply) * production.value);
      need = need === 0 ? 0 : need;
      return need;
    });
    return (_ctx, _cache) => {
      return unref(isVisible)
        ? (openBlock(),
          createElementBlock('tr', _hoisted_1, [
            createBaseVNode(
              'td',
              {
                class: normalizeClass(_ctx.$style.materialContainer),
              },
              [
                createVNode(
                  MaterialIcon,
                  {
                    size: 'inline-table',
                    ticker: _ctx.material.ticker,
                  },
                  null,
                  8,
                  ['ticker'],
                ),
              ],
              2,
            ),
            createBaseVNode('td', null, [
              createBaseVNode('span', null, toDisplayString(unref(fixed0)(unref(invAmount))), 1),
            ]),
            createBaseVNode('td', null, [
              createBaseVNode(
                'span',
                {
                  class: normalizeClass(unref(changeClass)),
                },
                toDisplayString(unref(changeText)),
                3,
              ),
            ]),
            createBaseVNode('td', null, [
              createBaseVNode(
                'span',
                null,
                toDisplayString(isNaN(unref(needAmt)) ? '0' : unref(fixed0)(unref(needAmt))),
                1,
              ),
            ]),
            createVNode(_sfc_main$1, { days: unref(days) }, null, 8, ['days']),
            createBaseVNode('td', null, [
              createVNode(
                _sfc_main$2,
                {
                  dark: '',
                  inline: '',
                  onClick:
                    _cache[0] ||
                    (_cache[0] = $event => unref(showBuffer)(`CXM ${_ctx.material.ticker}`)),
                },
                {
                  default: withCtx(() => [
                    ...(_cache[1] || (_cache[1] = [createTextVNode('CXM', -1)])),
                  ]),
                  _: 1,
                },
              ),
            ]),
          ]))
        : createCommentVNode('', true);
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTWF0ZXJpYWxSb3cudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9CVVJOL01hdGVyaWFsUm93LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgTWF0ZXJpYWxCdXJuIH0gZnJvbSAnQHNyYy9jb3JlL2J1cm4nO1xuaW1wb3J0IE1hdGVyaWFsSWNvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvTWF0ZXJpYWxJY29uLnZ1ZSc7XG5pbXBvcnQgRGF5c0NlbGwgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvQlVSTi9EYXlzQ2VsbC52dWUnO1xuaW1wb3J0IHsgZml4ZWQwLCBmaXhlZDEsIGZpeGVkMiB9IGZyb20gJ0BzcmMvdXRpbHMvZm9ybWF0JztcbmltcG9ydCB7IHVzZVRpbGVTdGF0ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0JVUk4vdGlsZS1zdGF0ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzJztcbmltcG9ydCB7IHVzZXJEYXRhIH0gZnJvbSAnQHNyYy9zdG9yZS91c2VyLWRhdGEnO1xuXG5jb25zdCB7IGFsd2F5c1Zpc2libGUsIGJ1cm4sIG1hdGVyaWFsIH0gPSBkZWZpbmVQcm9wczx7XG4gIGFsd2F5c1Zpc2libGU/OiBib29sZWFuO1xuICBidXJuOiBNYXRlcmlhbEJ1cm47XG4gIG1hdGVyaWFsOiBQcnVuQXBpLk1hdGVyaWFsO1xufT4oKTtcblxuY29uc3QgcHJvZHVjdGlvbiA9IGNvbXB1dGVkKCgpID0+IGJ1cm4uZGFpbHlBbW91bnQpO1xuY29uc3QgaW52QW1vdW50ID0gY29tcHV0ZWQoKCkgPT4gYnVybi5pbnZlbnRvcnkgPz8gMCk7XG5jb25zdCBpc0luZiA9IGNvbXB1dGVkKCgpID0+IHByb2R1Y3Rpb24udmFsdWUgPj0gMCk7XG5jb25zdCBkYXlzID0gY29tcHV0ZWQoKCkgPT4gKGlzSW5mLnZhbHVlID8gMTAwMCA6IGJ1cm4uZGF5c0xlZnQpKTtcblxuY29uc3QgaXNSZWQgPSBjb21wdXRlZCgoKSA9PiBkYXlzLnZhbHVlIDw9IHVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ucmVkKTtcbmNvbnN0IGlzWWVsbG93ID0gY29tcHV0ZWQoKCkgPT4gZGF5cy52YWx1ZSA8PSB1c2VyRGF0YS5zZXR0aW5ncy5idXJuLnllbGxvdyk7XG5jb25zdCBpc0dyZWVuID0gY29tcHV0ZWQoKCkgPT4gZGF5cy52YWx1ZSA+IHVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ueWVsbG93KTtcblxuY29uc3QgcmVkID0gdXNlVGlsZVN0YXRlKCdyZWQnKTtcbmNvbnN0IHllbGxvdyA9IHVzZVRpbGVTdGF0ZSgneWVsbG93Jyk7XG5jb25zdCBncmVlbiA9IHVzZVRpbGVTdGF0ZSgnZ3JlZW4nKTtcbmNvbnN0IGluZiA9IHVzZVRpbGVTdGF0ZSgnaW5mJyk7XG5cbmNvbnN0IGlzVmlzaWJsZSA9IGNvbXB1dGVkKCgpID0+IHtcbiAgaWYgKGFsd2F5c1Zpc2libGUpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAoaXNJbmYudmFsdWUpIHtcbiAgICByZXR1cm4gaW5mLnZhbHVlO1xuICB9XG4gIHJldHVybiAoXG4gICAgKGlzUmVkLnZhbHVlICYmIHJlZC52YWx1ZSkgfHwgKGlzWWVsbG93LnZhbHVlICYmIHllbGxvdy52YWx1ZSkgfHwgKGlzR3JlZW4udmFsdWUgJiYgZ3JlZW4udmFsdWUpXG4gICk7XG59KTtcblxuY29uc3QgY2hhbmdlVGV4dCA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgYWJzID0gTWF0aC5hYnMocHJvZHVjdGlvbi52YWx1ZSk7XG4gIGNvbnN0IGZpeGVkID0gYWJzID49IDEwMDAgPyBmaXhlZDAoYWJzKSA6IGFicyA+PSAxMDAgPyBmaXhlZDEoYWJzKSA6IGZpeGVkMihhYnMpO1xuICByZXR1cm4gcHJvZHVjdGlvbi52YWx1ZSA+IDAgPyAnKycgKyBmaXhlZCA6IHByb2R1Y3Rpb24udmFsdWUgPCAwID8gJy0nICsgZml4ZWQgOiAwO1xufSk7XG5cbmNvbnN0IGNoYW5nZUNsYXNzID0gY29tcHV0ZWQoKCkgPT4gKHtcbiAgW0MuQ29sb3JlZFZhbHVlLnBvc2l0aXZlXTogcHJvZHVjdGlvbi52YWx1ZSA+IDAsXG59KSk7XG5cbmNvbnN0IG5lZWRBbXQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGNvbnN0IHJlc3VwcGx5ID0gdXNlckRhdGEuc2V0dGluZ3MuYnVybi5yZXN1cHBseTtcbiAgaWYgKGRheXMudmFsdWUgPiByZXN1cHBseSB8fCBwcm9kdWN0aW9uLnZhbHVlID4gMCkge1xuICAgIHJldHVybiAwO1xuICB9XG4gIGxldCBuZWVkID0gTWF0aC5jZWlsKChkYXlzLnZhbHVlIC0gcmVzdXBwbHkpICogcHJvZHVjdGlvbi52YWx1ZSk7XG4gIC8vIFRoaXMgY2hlY2sgaXMgbmVlZGVkIHRvIHByZXZlbnQgYSBcIi0wXCIgdmFsdWUgdGhhdCBjYW4gaGFwcGVuXG4gIC8vIGluIHNpdHVhdGlvbnMgbGlrZTogMCAqIC0wLjI1ID0+IC0wLlxuICBuZWVkID0gbmVlZCA9PT0gMCA/IDAgOiBuZWVkO1xuICByZXR1cm4gbmVlZDtcbn0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHRyIHYtaWY9XCJpc1Zpc2libGVcIj5cbiAgICA8dGQgOmNsYXNzPVwiJHN0eWxlLm1hdGVyaWFsQ29udGFpbmVyXCI+XG4gICAgICA8TWF0ZXJpYWxJY29uIHNpemU9XCJpbmxpbmUtdGFibGVcIiA6dGlja2VyPVwibWF0ZXJpYWwudGlja2VyXCIgLz5cbiAgICA8L3RkPlxuICAgIDx0ZD5cbiAgICAgIDxzcGFuPnt7IGZpeGVkMChpbnZBbW91bnQpIH19PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPHNwYW4gOmNsYXNzPVwiY2hhbmdlQ2xhc3NcIj57eyBjaGFuZ2VUZXh0IH19PC9zcGFuPlxuICAgIDwvdGQ+XG4gICAgPHRkPlxuICAgICAgPHNwYW4+e3sgaXNOYU4obmVlZEFtdCkgPyAnMCcgOiBmaXhlZDAobmVlZEFtdCkgfX08L3NwYW4+XG4gICAgPC90ZD5cbiAgICA8RGF5c0NlbGwgOmRheXM9XCJkYXlzXCIgLz5cbiAgICA8dGQ+XG4gICAgICA8UHJ1bkJ1dHRvbiBkYXJrIGlubGluZSBAY2xpY2s9XCJzaG93QnVmZmVyKGBDWE0gJHttYXRlcmlhbC50aWNrZXJ9YClcIj5DWE08L1BydW5CdXR0b24+XG4gICAgPC90ZD5cbiAgPC90cj5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4ubWF0ZXJpYWxDb250YWluZXIge1xuICB3aWR0aDogMzJweDtcbiAgcGFkZGluZzogMDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9ub3JtYWxpemVDbGFzcyIsIl90b0Rpc3BsYXlTdHJpbmciLCJfdW5yZWYiLCJfY3JlYXRlVk5vZGUiLCJQcnVuQnV0dG9uIiwiX2NyZWF0ZVRleHRWTm9kZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFnQkEsVUFBQSxhQUFBLFNBQUEsTUFBQSxRQUFBLEtBQUEsV0FBQTtBQUNBLFVBQUEsWUFBQSxTQUFBLE1BQUEsUUFBQSxLQUFBLGFBQUEsQ0FBQTtBQUNBLFVBQUEsUUFBQSxTQUFBLE1BQUEsV0FBQSxTQUFBLENBQUE7QUFDQSxVQUFBLE9BQUEsU0FBQSxNQUFBLE1BQUEsUUFBQSxNQUFBLFFBQUEsS0FBQSxRQUFBO0FBRUEsVUFBQSxRQUFBLFNBQUEsTUFBQSxLQUFBLFNBQUEsU0FBQSxTQUFBLEtBQUEsR0FBQTtBQUNBLFVBQUEsV0FBQSxTQUFBLE1BQUEsS0FBQSxTQUFBLFNBQUEsU0FBQSxLQUFBLE1BQUE7QUFDQSxVQUFBLFVBQUEsU0FBQSxNQUFBLEtBQUEsUUFBQSxTQUFBLFNBQUEsS0FBQSxNQUFBO0FBRUEsVUFBQSxNQUFBLGFBQUEs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
