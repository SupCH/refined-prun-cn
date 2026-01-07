import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import { isValidPackageName } from './utils8.js';
import { t } from './index5.js';
import {
  defineComponent,
  watch,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CreateActionPackage',
  props: {
    onCreate: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const name = ref('');
    const nameError = ref(false);
    watch(name, () => (nameError.value = !isValidPackageName(name.value)));
    function onCreateClick() {
      if (name.value.length === 0 || !isValidPackageName(name.value)) {
        nameError.value = true;
        return;
      }
      __props.onCreate(name.value);
      emit('close');
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
                createTextVNode(toDisplayString(unref(t)('act.createPackage')), 1),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                {
                  label: unref(t)('act.name'),
                  error: unref(nameError),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(name),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(name) ? (name.value = $event) : null)),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['label', 'error'],
              ),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      onClick: onCreateClick,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('act.add').toUpperCase()), 1),
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
