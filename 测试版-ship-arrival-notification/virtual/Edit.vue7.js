import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import { objectId } from './object-id.js';
import _sfc_main$5 from './Commands.vue.js';
import _sfc_main$4 from './PrunButton.vue.js';
import _sfc_main$3 from './NumberInput.vue.js';
import { materialsStore } from './materials.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  Fragment,
  renderList,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Edit',
  props: {
    group: {},
  },
  setup(__props, { expose: __expose }) {
    const materials = ref(getMaterials());
    function getMaterials() {
      const materials2 = __props.group.materials ?? {};
      return Object.keys(materials2).map(x => [x, materials2[x]]);
    }
    function onAddClick() {
      materials.value.push(['', 0]);
    }
    function validate() {
      return true;
    }
    function save() {
      __props.group.materials = {};
      for (let [ticker, amount] of materials.value) {
        const material = materialsStore.getByTicker(ticker);
        if (!material || amount === 0 || !isFinite(amount)) {
          continue;
        }
        __props.group.materials[material.ticker] = amount;
      }
    }
    __expose({ validate, save });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(materials), (pair, i) => {
                return (
                  openBlock(),
                  createElementBlock(
                    Fragment,
                    {
                      key: unref(objectId)(pair),
                    },
                    [
                      createVNode(
                        _sfc_main$2,
                        {
                          label: `Material Ticker #${i + 1}`,
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$1,
                              {
                                modelValue: pair[0],
                                'onUpdate:modelValue': $event => (pair[0] = $event),
                              },
                              null,
                              8,
                              ['modelValue', 'onUpdate:modelValue'],
                            ),
                          ]),
                          _: 2,
                        },
                        1032,
                        ['label'],
                      ),
                      createVNode(
                        _sfc_main$2,
                        {
                          label: `Material Amount #${i + 1}`,
                        },
                        {
                          default: withCtx(() => [
                            createVNode(
                              _sfc_main$3,
                              {
                                modelValue: pair[1],
                                'onUpdate:modelValue': $event => (pair[1] = $event),
                              },
                              null,
                              8,
                              ['modelValue', 'onUpdate:modelValue'],
                            ),
                          ]),
                          _: 2,
                        },
                        1032,
                        ['label'],
                      ),
                    ],
                    64,
                  )
                );
              }),
              128,
            )),
            createVNode(_sfc_main$5, null, {
              default: withCtx(() => [
                createVNode(
                  _sfc_main$4,
                  {
                    primary: '',
                    onClick: onAddClick,
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[0] || (_cache[0] = [createTextVNode('ADD MATERIAL', -1)])),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdC52dWU3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9tYXRlcmlhbC1ncm91cHMvbWFudWFsL0VkaXQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBUZXh0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1RleHRJbnB1dC52dWUnO1xuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IE51bWJlcklucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9OdW1iZXJJbnB1dC52dWUnO1xuaW1wb3J0IHsgbWF0ZXJpYWxzU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvbWF0ZXJpYWxzJztcblxuY29uc3QgeyBncm91cCB9ID0gZGVmaW5lUHJvcHM8eyBncm91cDogVXNlckRhdGEuTWF0ZXJpYWxHcm91cERhdGEgfT4oKTtcblxuY29uc3QgbWF0ZXJpYWxzID0gcmVmKGdldE1hdGVyaWFscygpKTtcblxuZnVuY3Rpb24gZ2V0TWF0ZXJpYWxzKCkge1xuICBjb25zdCBtYXRlcmlhbHMgPSBncm91cC5tYXRlcmlhbHMgPz8ge307XG4gIHJldHVybiBPYmplY3Qua2V5cyhtYXRlcmlhbHMpLm1hcCh4ID0+IFt4LCBtYXRlcmlhbHNbeF1dKSBhcyBbc3RyaW5nLCBudW1iZXJdW107XG59XG5cbmZ1bmN0aW9uIG9uQWRkQ2xpY2soKSB7XG4gIG1hdGVyaWFscy52YWx1ZS5wdXNoKFsnJywgMF0pO1xufVxuXG5mdW5jdGlvbiB2YWxpZGF0ZSgpIHtcbiAgcmV0dXJuIHRydWU7XG59XG5cbmZ1bmN0aW9uIHNhdmUoKSB7XG4gIGdyb3VwLm1hdGVyaWFscyA9IHt9O1xuICBmb3IgKGxldCBbdGlja2VyLCBhbW91bnRdIG9mIG1hdGVyaWFscy52YWx1ZSkge1xuICAgIGNvbnN0IG1hdGVyaWFsID0gbWF0ZXJpYWxzU3RvcmUuZ2V0QnlUaWNrZXIodGlja2VyKTtcbiAgICBpZiAoIW1hdGVyaWFsIHx8IGFtb3VudCA9PT0gMCB8fCAhaXNGaW5pdGUoYW1vdW50KSkge1xuICAgICAgY29udGludWU7XG4gICAgfVxuICAgIGdyb3VwLm1hdGVyaWFsc1ttYXRlcmlhbC50aWNrZXJdID0gYW1vdW50O1xuICB9XG59XG5cbmRlZmluZUV4cG9zZSh7IHZhbGlkYXRlLCBzYXZlIH0pO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPHRlbXBsYXRlIHYtZm9yPVwiKHBhaXIsIGkpIGluIG1hdGVyaWFsc1wiIDprZXk9XCJvYmplY3RJZChwYWlyKVwiPlxuICAgIDxBY3RpdmUgOmxhYmVsPVwiYE1hdGVyaWFsIFRpY2tlciAjJHtpICsgMX1gXCI+XG4gICAgICA8VGV4dElucHV0IHYtbW9kZWw9XCJwYWlyWzBdXCIgLz5cbiAgICA8L0FjdGl2ZT5cbiAgICA8QWN0aXZlIDpsYWJlbD1cImBNYXRlcmlhbCBBbW91bnQgIyR7aSArIDF9YFwiPlxuICAgICAgPE51bWJlcklucHV0IHYtbW9kZWw9XCJwYWlyWzFdXCIgLz5cbiAgICA8L0FjdGl2ZT5cbiAgPC90ZW1wbGF0ZT5cbiAgPENvbW1hbmRzPlxuICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgQGNsaWNrPVwib25BZGRDbGlja1wiPkFERCBNQVRFUklBTDwvUHJ1bkJ1dHRvbj5cbiAgPC9Db21tYW5kcz5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX2NyZWF0ZVZOb2RlIiwiVGV4dElucHV0IiwiTnVtYmVySW5wdXQiLCJfd2l0aEN0eCIsIlBydW5CdXR0b24iLCJfY3JlYXRlVGV4dFZOb2RlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7QUFXQSxVQUFBLFlBQUEsSUFBQSxjQUFBO0FBRUEsYUFBQSxlQUFBO0FBQ0UsWUFBQSxhQUFBLFFBQUEsTUFBQSxhQUFBLENBQUE7QUFDQSxhQUFBLE9BQUEsS0FBQSxVQUFBLEVBQUEsSUFBQSxDQUFBLE1BQUEsQ0FBQSxHQUFBLFdBQUEsQ0FBQSxDQUFBLENBQUE7QUFBQSxJQUF3RDtBQUcxRCxhQUFBLGFBQUE7QUFDRSxnQkFBQSxNQUFBLEtBQUEsQ0FBQSxJQUFBLENBQUEsQ0FBQTtBQUFBLElBQTRCO0FBRzlCLGFBQUEsV0FBQTtBQUNFLGFBQUE7QUFBQSxJQUFPO0FBR1QsYUFBQSxPQUFBO0FBQ0UsY0FBQSxNQUFBLFlBQUEsQ0FBQTtBQUNBLGVBQUEsQ0FBQSxRQUFBLE1BQUEsS0FBQSxVQUFBLE9BQUE7QUFDRSxjQUFBLFdBQUEsZUFBQSxZQUFBLE1BQUE7QUFDQSxZQUFBLENBQUEsWUFBQSxXQUFBLEtBQUEsQ0FBQSxTQUFBLE1BQUEsR0FBQTtBQUNFO0FBQUEsUUFBQTtBQUVGLGdCQUFBLE1BQUEsVUFBQSxTQUFBLE1BQUEsSUFBQTtBQUFBLE1BQW1DO0FBQUEsSUFDckM7QUFHRixhQUFBLEVBQUEsVUFBQSxNQUFBOzs7Ozs7VUFJOEQsR0FBQTtBQUFBO2NBR2pELE9BQUEsb0JBQUEsSUFBQSxDQUFBO0FBQUEsWUFGNEIsR0FBQTtBQUFBO2dCQUNKQSxZQUFBQyxhQUFBO0FBQUEsa0JBQUEsWUFBQSxLQUFBLENBQUE7QUFBQSxrQkFBUCx1QkFBQSxDQUFBLFdBQUEsS0FBQSxDQUFBLElBQUE7QUFBQSxnQkFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEscUJBQUEsQ0FBQTtBQUFBOzs7O2NBSWpCLE9BQUEsb0JBQUEsSUFBQSxDQUFBO0FBQUEsWUFGNEIsR0FBQTtBQUFBO2dCQUNGRCxZQUFBRSxhQUFBO0FBQUEsa0JBQUEsWUFBQSxLQUFBLENBQUE7QUFBQSxrQkFBUCx1QkFBQSxDQUFBLFdBQUEsS0FBQSxDQUFBLElBQUE7QUFBQSxnQkFBQSxHQUFBLE1BQUEsR0FBQSxDQUFBLGNBQUEscUJBQUEsQ0FBQTtBQUFBOzs7Ozs7VUFLbkIsU0FBQUMsUUFBQSxNQUFBO0FBQUEsWUFEd0RILFlBQUFJLGFBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFyRCxTQUFBO0FBQUEsWUFBZ0IsR0FBQTtBQUFBO2dCQUF3QkMsZ0JBQUEsZ0JBQUEsRUFBQTtBQUFBLGNBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7Ozs7OzsifQ==
