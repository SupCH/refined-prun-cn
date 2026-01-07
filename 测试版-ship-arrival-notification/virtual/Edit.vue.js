import _sfc_main$1 from './Active.vue.js';
import _sfc_main$3 from './Commands.vue.js';
import _sfc_main$2 from './PrunButton.vue.js';
import SelectInput from './SelectInput.vue.js';
import _sfc_main$4 from './RadioItem.vue.js';
import { showTileOverlay } from './tile-overlay.js';
import _sfc_main$5 from './EditPriceLimits.vue.js';
import { materialsStore } from './materials.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef, reactive } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    action: {},
    pkg: {},
  },
  setup(__props, { expose: __expose }) {
    const materialGroups = computed(() => __props.pkg.groups.map(x => x.name).filter(x => x));
    const materialGroup = ref(__props.action.group ?? materialGroups.value[0]);
    const exchanges = ['AI1', 'CI1', 'IC1', 'NC1', 'CI2', 'NC2'];
    const exchange = ref(__props.action.exchange ?? exchanges[0]);
    const priceLimits = ref(getPriceLimits());
    function getPriceLimits() {
      const priceLimits2 = __props.action.priceLimits ?? {};
      return Object.keys(priceLimits2).map(x => [x, priceLimits2[x]]);
    }
    const buyPartial = ref(__props.action.buyPartial ?? false);
    const allowUnfilled = ref(__props.action.allowUnfilled ?? false);
    const useCXInv = ref(__props.action.useCXInv ?? true);
    function onEditPriceLimitsClick(e) {
      showTileOverlay(e, _sfc_main$5, reactive({ priceLimits }));
    }
    function validate() {
      return true;
    }
    function save() {
      __props.action.group = materialGroup.value;
      __props.action.exchange = exchange.value;
      __props.action.priceLimits = {};
      for (let [ticker, price] of priceLimits.value) {
        const material = materialsStore.getByTicker(ticker);
        if (!material || price === 0 || !isFinite(price)) {
          continue;
        }
        __props.action.priceLimits[material.ticker] = price;
      }
      __props.action.buyPartial = buyPartial.value;
      __props.action.allowUnfilled = allowUnfilled.value;
      __props.action.useCXInv = useCXInv.value;
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
              { label: 'Material Group' },
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
            ),
            createVNode(
              _sfc_main$1,
              { label: 'Exchange' },
              {
                default: withCtx(() => [
                  createVNode(
                    SelectInput,
                    {
                      modelValue: unref(exchange),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event =>
                          isRef(exchange) ? (exchange.value = $event) : null),
                      options: exchanges,
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
              _sfc_main$3,
              { label: 'Price Limits' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$2,
                    {
                      primary: '',
                      onClick: onEditPriceLimitsClick,
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[5] || (_cache[5] = [createTextVNode('EDIT', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Buy Partial',
                tooltip: 'Whether the action will be taken if there is not enough stock on the CX.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(buyPartial),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event =>
                          isRef(buyPartial) ? (buyPartial.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[6] || (_cache[6] = [createTextVNode('buy partial', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Allow Unfilled',
                tooltip: 'Create a full bid order even if there is not enough stock on the CX.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(allowUnfilled),
                      'onUpdate:modelValue':
                        _cache[3] ||
                        (_cache[3] = $event =>
                          isRef(allowUnfilled) ? (allowUnfilled.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[7] || (_cache[7] = [createTextVNode('allow unfilled', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
            createVNode(
              _sfc_main$1,
              {
                label: 'Use CX Inventory',
                tooltip:
                  'Whether to use stock in the CX warehouse when calculating how much needs to be bought.',
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      modelValue: unref(useCXInv),
                      'onUpdate:modelValue':
                        _cache[4] ||
                        (_cache[4] = $event =>
                          isRef(useCXInv) ? (useCXInv.value = $event) : null),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[8] || (_cache[8] = [createTextVNode('use cx inventory', -1)])),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL2FjdGlvbnMvY3gtYnV5L0VkaXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgUmFkaW9JdGVtIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9SYWRpb0l0ZW0udnVlJztcbmltcG9ydCB7IHNob3dUaWxlT3ZlcmxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS90aWxlLW92ZXJsYXknO1xuaW1wb3J0IEVkaXRQcmljZUxpbWl0cyBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9jeC1idXkvRWRpdFByaWNlTGltaXRzLnZ1ZSc7XG5pbXBvcnQgeyBtYXRlcmlhbHNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9tYXRlcmlhbHMnO1xuXG5jb25zdCB7IGFjdGlvbiwgcGtnIH0gPSBkZWZpbmVQcm9wczx7XG4gIGFjdGlvbjogVXNlckRhdGEuQWN0aW9uRGF0YTtcbiAgcGtnOiBVc2VyRGF0YS5BY3Rpb25QYWNrYWdlRGF0YTtcbn0+KCk7XG5cbmNvbnN0IG1hdGVyaWFsR3JvdXBzID0gY29tcHV0ZWQoKCkgPT4gcGtnLmdyb3Vwcy5tYXAoeCA9PiB4Lm5hbWUhKS5maWx0ZXIoeCA9PiB4KSk7XG5jb25zdCBtYXRlcmlhbEdyb3VwID0gcmVmKGFjdGlvbi5ncm91cCA/PyBtYXRlcmlhbEdyb3Vwcy52YWx1ZVswXSk7XG5cbmNvbnN0IGV4Y2hhbmdlcyA9IFsnQUkxJywgJ0NJMScsICdJQzEnLCAnTkMxJywgJ0NJMicsICdOQzInXTtcbmNvbnN0IGV4Y2hhbmdlID0gcmVmKGFjdGlvbi5leGNoYW5nZSA/PyBleGNoYW5nZXNbMF0pO1xuXG5jb25zdCBwcmljZUxpbWl0cyA9IHJlZihnZXRQcmljZUxpbWl0cygpKTtcblxuZnVuY3Rpb24gZ2V0UHJpY2VMaW1pdHMoKSB7XG4gIGNvbnN0IHByaWNlTGltaXRzID0gYWN0aW9uLnByaWNlTGltaXRzID8/IHt9O1xuICByZXR1cm4gT2JqZWN0LmtleXMocHJpY2VMaW1pdHMpLm1hcCh4ID0+IFt4LCBwcmljZUxpbWl0c1t4XV0pIGFzIFtzdHJpbmcsIG51bWJlcl1bXTtcbn1cblxuY29uc3QgYnV5UGFydGlhbCA9IHJlZihhY3Rpb24uYnV5UGFydGlhbCA/PyBmYWxzZSk7XG5cbmNvbnN0IGFsbG93VW5maWxsZWQgPSByZWYoYWN0aW9uLmFsbG93VW5maWxsZWQgPz8gZmFsc2UpO1xuY29uc3QgdXNlQ1hJbnYgPSByZWYoYWN0aW9uLnVzZUNYSW52ID8/IHRydWUpO1xuXG5mdW5jdGlvbiBvbkVkaXRQcmljZUxpbWl0c0NsaWNrKGU6IEV2ZW50KSB7XG4gIHNob3dUaWxlT3ZlcmxheShlLCBFZGl0UHJpY2VMaW1pdHMsIHJlYWN0aXZlKHsgcHJpY2VMaW1pdHMgfSkpO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNhdmUoKSB7XG4gIGFjdGlvbi5ncm91cCA9IG1hdGVyaWFsR3JvdXAudmFsdWU7XG4gIGFjdGlvbi5leGNoYW5nZSA9IGV4Y2hhbmdlLnZhbHVlO1xuICBhY3Rpb24ucHJpY2VMaW1pdHMgPSB7fTtcbiAgZm9yIChsZXQgW3RpY2tlciwgcHJpY2VdIG9mIHByaWNlTGltaXRzLnZhbHVlKSB7XG4gICAgY29uc3QgbWF0ZXJpYWwgPSBtYXRlcmlhbHNTdG9yZS5nZXRCeVRpY2tlcih0aWNrZXIpO1xuICAgIGlmICghbWF0ZXJpYWwgfHwgcHJpY2UgPT09IDAgfHwgIWlzRmluaXRlKHByaWNlKSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGFjdGlvbi5wcmljZUxpbWl0c1ttYXRlcmlhbC50aWNrZXJdID0gcHJpY2U7XG4gIH1cbiAgYWN0aW9uLmJ1eVBhcnRpYWwgPSBidXlQYXJ0aWFsLnZhbHVlO1xuICBhY3Rpb24uYWxsb3dVbmZpbGxlZCA9IGFsbG93VW5maWxsZWQudmFsdWU7XG4gIGFjdGlvbi51c2VDWEludiA9IHVzZUNYSW52LnZhbHVlO1xufVxuXG5kZWZpbmVFeHBvc2UoeyB2YWxpZGF0ZSwgc2F2ZSB9KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxBY3RpdmUgbGFiZWw9XCJNYXRlcmlhbCBHcm91cFwiPlxuICAgIDxTZWxlY3RJbnB1dCB2LW1vZGVsPVwibWF0ZXJpYWxHcm91cFwiIDpvcHRpb25zPVwibWF0ZXJpYWxHcm91cHNcIiAvPlxuICA8L0FjdGl2ZT5cbiAgPEFjdGl2ZSBsYWJlbD1cIkV4Y2hhbmdlXCI+XG4gICAgPFNlbGVjdElucHV0IHYtbW9kZWw9XCJleGNoYW5nZVwiIDpvcHRpb25zPVwiZXhjaGFuZ2VzXCIgLz5cbiAgPC9BY3RpdmU+XG4gIDxDb21tYW5kcyBsYWJlbD1cIlByaWNlIExpbWl0c1wiPlxuICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25FZGl0UHJpY2VMaW1pdHNDbGlja1wiPkVESVQ8L1BydW5CdXR0b24+XG4gIDwvQ29tbWFuZHM+XG4gIDxBY3RpdmVcbiAgICBsYWJlbD1cIkJ1eSBQYXJ0aWFsXCJcbiAgICB0b29sdGlwPVwiV2hldGhlciB0aGUgYWN0aW9uIHdpbGwgYmUgdGFrZW4gaWYgdGhlcmUgaXMgbm90IGVub3VnaCBzdG9jayBvbiB0aGUgQ1guXCI+XG4gICAgPFJhZGlvSXRlbSB2LW1vZGVsPVwiYnV5UGFydGlhbFwiPmJ1eSBwYXJ0aWFsPC9SYWRpb0l0ZW0+XG4gIDwvQWN0aXZlPlxuICA8QWN0aXZlXG4gICAgbGFiZWw9XCJBbGxvdyBVbmZpbGxlZFwiXG4gICAgdG9vbHRpcD1cIkNyZWF0ZSBhIGZ1bGwgYmlkIG9yZGVyIGV2ZW4gaWYgdGhlcmUgaXMgbm90IGVub3VnaCBzdG9jayBvbiB0aGUgQ1guXCI+XG4gICAgPFJhZGlvSXRlbSB2LW1vZGVsPVwiYWxsb3dVbmZpbGxlZFwiPmFsbG93IHVuZmlsbGVkPC9SYWRpb0l0ZW0+XG4gIDwvQWN0aXZlPlxuICA8QWN0aXZlXG4gICAgbGFiZWw9XCJVc2UgQ1ggSW52ZW50b3J5XCJcbiAgICB0b29sdGlwPVwiV2hldGhlciB0byB1c2Ugc3RvY2sgaW4gdGhlIENYIHdhcmVob3VzZSB3aGVuIGNhbGN1bGF0aW5nIGhvdyBtdWNoIG5lZWRzIHRvIGJlIGJvdWdodC5cIj5cbiAgICA8UmFkaW9JdGVtIHYtbW9kZWw9XCJ1c2VDWEludlwiPnVzZSBjeCBpbnZlbnRvcnk8L1JhZGlvSXRlbT5cbiAgPC9BY3RpdmU+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIkVkaXRQcmljZUxpbWl0cyIsIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiX3VucmVmIiwiX2lzUmVmIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJSYWRpb0l0ZW0iXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBZUEsVUFBQSxpQkFBQSxTQUFBLE1BQUEsUUFBQSxJQUFBLE9BQUEsSUFBQSxDQUFBLE1BQUEsRUFBQSxJQUFBLEVBQUEsT0FBQSxDQUFBLE1BQUEsQ0FBQSxDQUFBO0FBQ0EsVUFBQSxnQkFBQSxJQUFBLFFBQUEsT0FBQSxTQUFBLGVBQUEsTUFBQSxDQUFBLENBQUE7QUFFQSxVQUFBLFlBQUEsQ0FBQSxPQUFBLE9BQUEsT0FBQSxPQUFBLE9BQUEsS0FBQTtBQUNBLFVBQUEsV0FBQSxJQUFBLFFBQUEsT0FBQSxZQUFBLFVBQUEs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
