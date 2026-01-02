import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import { isValidPackageName } from './utils8.js';
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
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'RenameActionPackage',
  props: {
    name: {},
    onRename: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const newName = ref(__props.name);
    const nameError = ref(false);
    watch(newName, () => (nameError.value = !isValidPackageName(newName.value)));
    function onCreateClick() {
      if (newName.value.length === 0 || !isValidPackageName(newName.value)) {
        nameError.value = true;
        return;
      }
      __props.onRename(newName.value);
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
                ...(_cache[1] || (_cache[1] = [createTextVNode('Rename Action Package', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.description),
              },
              ' WARNING: Renaming an action package will break all existing tile links to it (including this one). You can see the full list of your action packages in XIT ACT. ',
              2,
            ),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                {
                  label: 'Name',
                  error: unref(nameError),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        modelValue: unref(newName),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event =>
                            isRef(newName) ? (newName.value = $event) : null),
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
                8,
                ['error'],
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
                        ...(_cache[2] || (_cache[2] = [createTextVNode('RENAME', -1)])),
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
