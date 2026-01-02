import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$2 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import SelectInput from './SelectInput.vue.js';
import { act } from './act-registry.js';
import {
  defineComponent,
  computed,
  useTemplateRef,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  createBlock,
  createCommentVNode,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'EditAction',
  props: {
    add: { type: Boolean },
    action: {},
    onSave: { type: Function },
    pkg: {},
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const name = ref(__props.action.name || '');
    const nameError = ref(false);
    const typeOptions = act.getActionTypes();
    const type = ref(__props.action.type);
    const editFormComponent = computed(() => act.getActionInfo(type.value)?.editComponent);
    const editForm = useTemplateRef('editForm');
    function onSaveClick() {
      let isValid = editForm.value.validate();
      nameError.value = name.value.length === 0;
      isValid &&= !nameError.value;
      if (!isValid) {
        return;
      }
      for (const key of Object.keys(__props.action)) {
        delete __props.action[key];
      }
      editForm.value.save();
      __props.action.name = name.value;
      __props.action.type = type.value;
      __props.onSave?.();
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
                createTextVNode(toDisplayString(_ctx.add ? 'Add' : 'Edit') + ' Action', 1),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$1,
                { label: 'Type' },
                {
                  default: withCtx(() => [
                    createVNode(
                      SelectInput,
                      {
                        modelValue: unref(type),
                        'onUpdate:modelValue':
                          _cache[0] ||
                          (_cache[0] = $event => (isRef(type) ? (type.value = $event) : null)),
                        options: unref(typeOptions),
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
                {
                  label: 'Name',
                  error: unref(nameError),
                },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$2,
                      {
                        modelValue: unref(name),
                        'onUpdate:modelValue':
                          _cache[1] ||
                          (_cache[1] = $event => (isRef(name) ? (name.value = $event) : null)),
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
              unref(editFormComponent)
                ? (openBlock(),
                  createBlock(
                    resolveDynamicComponent(unref(editFormComponent)),
                    {
                      key: 0,
                      ref_key: 'editForm',
                      ref: editForm,
                      action: _ctx.action,
                      pkg: _ctx.pkg,
                    },
                    null,
                    8,
                    ['action', 'pkg'],
                  ))
                : createCommentVNode('', true),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      onClick: onSaveClick,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(_ctx.add ? 'ADD' : 'SAVE'), 1),
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
