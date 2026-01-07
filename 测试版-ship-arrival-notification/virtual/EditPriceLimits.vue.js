import { C } from './prun-css.js';
import { objectId } from './object-id.js';
import _sfc_main$3 from './NumberInput.vue.js';
import _sfc_main$4 from './PrunButton.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$5 from './Commands.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'EditPriceLimits',
  props: {
    priceLimits: {},
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    function onAddClick() {
      __props.priceLimits.push(['', 0]);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).DraftConditionEditor.form),
          },
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                ...(_cache[1] || (_cache[1] = [createTextVNode('Edit Price Limits', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              (openBlock(true),
              createElementBlock(
                Fragment,
                null,
                renderList(_ctx.priceLimits, (pair, i) => {
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
                            label: `Price Limit #${i + 1}`,
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
                        ...(_cache[2] || (_cache[2] = [createTextVNode('ADD', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
              createVNode(_sfc_main$5, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$4,
                    {
                      primary: '',
                      onClick: _cache[0] || (_cache[0] = $event => emit('close')),
                    },
                    {
                      default: withCtx(() => [
                        ...(_cache[3] || (_cache[3] = [createTextVNode('CLOSE', -1)])),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRWRpdFByaWNlTGltaXRzLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9BQ1QvYWN0aW9ucy9jeC1idXkvRWRpdFByaWNlTGltaXRzLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5pbXBvcnQgTnVtYmVySW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL051bWJlcklucHV0LnZ1ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IEFjdGl2ZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQWN0aXZlLnZ1ZSc7XG5pbXBvcnQgVGV4dElucHV0IGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9UZXh0SW5wdXQudnVlJztcbmltcG9ydCBDb21tYW5kcyBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvQ29tbWFuZHMudnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5cbmNvbnN0IHsgcHJpY2VMaW1pdHMgfSA9IGRlZmluZVByb3BzPHtcbiAgcHJpY2VMaW1pdHM6IFtzdHJpbmcsIG51bWJlcl1bXTtcbn0+KCk7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0czx7IChlOiAnY2xvc2UnKTogdm9pZCB9PigpO1xuXG5mdW5jdGlvbiBvbkFkZENsaWNrKCkge1xuICBwcmljZUxpbWl0cy5wdXNoKFsnJywgMF0pO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLkRyYWZ0Q29uZGl0aW9uRWRpdG9yLmZvcm1cIj5cbiAgICA8U2VjdGlvbkhlYWRlcj5FZGl0IFByaWNlIExpbWl0czwvU2VjdGlvbkhlYWRlcj5cbiAgICA8Zm9ybT5cbiAgICAgIDx0ZW1wbGF0ZSB2LWZvcj1cIihwYWlyLCBpKSBpbiBwcmljZUxpbWl0c1wiIDprZXk9XCJvYmplY3RJZChwYWlyKVwiPlxuICAgICAgICA8QWN0aXZlIDpsYWJlbD1cImBNYXRlcmlhbCBUaWNrZXIgIyR7aSArIDF9YFwiPlxuICAgICAgICAgIDxUZXh0SW5wdXQgdi1tb2RlbD1cInBhaXJbMF1cIiAvPlxuICAgICAgICA8L0FjdGl2ZT5cbiAgICAgICAgPEFjdGl2ZSA6bGFiZWw9XCJgUHJpY2UgTGltaXQgIyR7aSArIDF9YFwiPlxuICAgICAgICAgIDxOdW1iZXJJbnB1dCB2LW1vZGVsPVwicGFpclsxXVwiIC8+XG4gICAgICAgIDwvQWN0aXZlPlxuICAgICAgPC90ZW1wbGF0ZT5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJvbkFkZENsaWNrXCI+QUREPC9QcnVuQnV0dG9uPlxuICAgICAgPC9Db21tYW5kcz5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJlbWl0KCdjbG9zZScpXCI+Q0xPU0U8L1BydW5CdXR0b24+XG4gICAgICA8L0NvbW1hbmRzPlxuICAgIDwvZm9ybT5cbiAgPC9kaXY+XG48L3RlbXBsYXRlPlxuIl0sIm5hbWVzIjpbIl9ub3JtYWxpemVDbGFzcyIsIkMiLCJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiX2NyZWF0ZVZOb2RlIiwiVGV4dElucHV0IiwiTnVtYmVySW5wdXQiLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFhQSxVQUFBLE9BQUE7QUFFQSxhQUFBLGFBQUE7QUFDRSxjQUFBLFlBQUEsS0FBQSxDQUFBLElBQUEsQ0FBQSxDQUFBO0FBQUEsSUFBd0I7OztRQXVCbEIsT0FBQUEsZ0JBbEJPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxxQkFBQUEsSUFBQUE7QUFBQUEsTUFBMkIsR0FBQTtBQUFBO1VBQ1UsU0FBQUMsUUFBQSxNQUFBLENBQUEsR0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQTtBQUFBLFlBQWhCQyxnQkFBQSxxQkFBQSxFQUFBO0FBQUEsVUFBQSxFQUFBLENBQUE7QUFBQTs7O1dBZ0J6QkMsVUFBQSxJQUFBLEdBQUFDLG1CQUFBQyxVQUFBLE1BQUFDLFdBQUEsS0FBQSxhQUFBLENBQUEsTUFBQSxNQUFBOzs7WUFkeUQsR0FBQTtBQUFBO2dCQUduRCxPQUFBLG9CQUFBLElBQUEsQ0FBQTtBQUFBLGNBRjRCLEdBQUE7QUFBQTtrQkFDSkMsWUFBQUMsYUFBQTtBQUFBLG9CQUFBLFlBQUEsS0FBQSxDQUFBO0FBQUEsb0JBQVAsdUJBQUEsQ0FBQSxXQUFBLEtBQUEsQ0FBQSxJQUFBO0FBQUEsa0JBQUEsR0FBQSxNQUFBLEdBQUEsQ0FBQSxjQUFBLHFCQUFBLENBQUE7QUFBQTs7OztnQkFJakIsT0FBQSxnQkFBQSxJQUFBLENBQUE7QUFBQSxjQUZ3QixHQUFBO0FBQUE7a0JBQ0VELFlBQUFFLGFBQUE7QUFBQSxvQkFBQSxZQUFBLEtBQUEsQ0FBQTtBQUFBLG9CQUFQLHVCQUFBLENBQUEsV0FBQSxLQUFBLENBQUEsSUFBQTtBQUFBLGtCQUFBLEdBQUEsTUFBQSxHQUFBLENBQUEsY0FBQSxxQkFBQSxDQUFBO0FBQUE7Ozs7OztZQUtuQixTQUFBUixRQUFBLE1BQUE7QUFBQSxjQUQrQ00sWUFBQUcsYUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBNUMsU0FBQTtBQUFBLGNBQWdCLEdBQUE7QUFBQTtrQkFBZVIsZ0JBQUEsT0FBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7OztZQUlsQyxTQUFBRCxRQUFBLE1BQUE7QUFBQSxjQURvRE0sWUFBQUcsYUFBQTtBQUFBLGdCQUFBLFNBQUE7QUFBQSxnQkFBakQsU0FBQSxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQSxDQUFBLFdBQUEsS0FBQSxPQUFBO0FBQUEsY0FBb0IsR0FBQTtBQUFBO2tCQUFnQlIsZ0JBQUEsU0FBQSxFQUFBO0FBQUEsZ0JBQUEsRUFBQSxDQUFBO0FBQUE7Ozs7Ozs7Ozs7In0=
