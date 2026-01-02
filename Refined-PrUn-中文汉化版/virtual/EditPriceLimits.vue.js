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
