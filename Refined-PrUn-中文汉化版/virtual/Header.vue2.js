import { vModelText, withKeys } from './runtime-dom.esm-bundler.js';
import { C } from './prun-css.js';
import {
  defineComponent,
  mergeModels,
  useModel,
  useTemplateRef,
  createElementBlock,
  openBlock,
  renderSlot,
  Fragment,
  createCommentVNode,
  withDirectives,
  nextTick,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'Header',
  props: /* @__PURE__ */ mergeModels(
    {
      editable: { type: Boolean, default: false },
    },
    {
      modelValue: {},
      modelModifiers: {},
    },
  ),
  emits: ['update:modelValue'],
  setup(__props) {
    const model = useModel(__props, 'modelValue');
    const inputRef = useTemplateRef('input');
    const inputValue = ref('');
    const isEditing = ref(false);
    function onHeaderClick() {
      isEditing.value = true;
      inputValue.value = model.value ?? '';
      nextTick(() => inputRef.value?.focus());
    }
    function onEnterPress() {
      if (inputValue.value.length > 0) {
        model.value = inputValue.value;
      }
      inputRef.value?.blur();
    }
    function onBlur() {
      isEditing.value = false;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass([
              _ctx.$style.heading,
              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontHeaders,
              ('C' in _ctx ? _ctx.C : unref(C)).type.typeVeryLarge,
            ]),
          },
          [
            _ctx.editable
              ? (openBlock(),
                createElementBlock(
                  Fragment,
                  { key: 0 },
                  [
                    !unref(isEditing)
                      ? (openBlock(),
                        createElementBlock(
                          'span',
                          {
                            key: 0,
                            class: normalizeClass(_ctx.$style.editable),
                            onClick: onHeaderClick,
                          },
                          toDisplayString(model.value),
                          3,
                        ))
                      : createCommentVNode('', true),
                    unref(isEditing)
                      ? withDirectives(
                          (openBlock(),
                          createElementBlock(
                            'input',
                            {
                              key: 1,
                              ref: 'input',
                              'onUpdate:modelValue':
                                _cache[0] ||
                                (_cache[0] = $event =>
                                  isRef(inputValue) ? (inputValue.value = $event) : null),
                              class: normalizeClass(_ctx.$style.input),
                              autocomplete: 'off',
                              type: 'text',
                              placeholder: '',
                              onKeyup: withKeys(onEnterPress, ['enter']),
                              onBlur,
                            },
                            null,
                            34,
                          )),
                          [[vModelText, unref(inputValue)]],
                        )
                      : createCommentVNode('', true),
                  ],
                  64,
                ))
              : renderSlot(_ctx.$slots, 'default', { key: 1 }),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
