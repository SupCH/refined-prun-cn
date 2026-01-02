import { C } from './prun-css.js';
import _sfc_main$1 from './RadioItem.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
import { isRef, unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SelectButton',
  props: {
    label: {},
    selected: { type: Boolean },
    set: { type: Function },
  },
  setup(__props) {
    const model = computed({
      get: () => __props.selected,
      set: value => __props.set(value),
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).SelectButton.container),
          },
          [
            createVNode(
              _sfc_main$1,
              {
                modelValue: unref(model),
                'onUpdate:modelValue':
                  _cache[0] ||
                  (_cache[0] = $event => (isRef(model) ? (model.value = $event) : null)),
              },
              {
                default: withCtx(() => [createTextVNode(toDisplayString(_ctx.label), 1)]),
                _: 1,
              },
              8,
              ['modelValue'],
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
