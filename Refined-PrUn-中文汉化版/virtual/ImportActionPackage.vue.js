import { C } from './prun-css.js';
import _sfc_main$3 from './PrunButton.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$1 from './Active.vue.js';
import _sfc_main$2 from './TextInput.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import SelectInput from './SelectInput.vue.js';
import { uploadJson } from './json-file.js';
import { isPresent } from './is-present.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  createBlock,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ImportActionPackage',
  props: {
    onImport: { type: Function },
  },
  emits: ['close'],
  setup(__props, { emit: __emit }) {
    const emit = __emit;
    const typeOptions = [
      {
        label: 'Paste JSON',
        value: 'TEXT',
      },
      {
        label: 'Upload JSON',
        value: 'FILE',
      },
    ];
    const type = ref('TEXT');
    const text = ref('');
    const error = ref(false);
    function onImportClick() {
      if (text.value.length === 0) {
        error.value = true;
        return;
      }
      try {
        const json = JSON.parse(text.value);
        if (!validateJson(json)) {
          error.value = true;
          return;
        }
        __props.onImport(json);
        emit('close');
      } catch {
        error.value = true;
      }
    }
    function onUploadClick() {
      uploadJson(json => {
        if (!validateJson(json)) {
          error.value = true;
          return;
        }
        __props.onImport(json);
        emit('close');
      });
    }
    function validateJson(json) {
      return isPresent(json.global?.name);
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
                ...(_cache[2] || (_cache[2] = [createTextVNode('Import Action Package', -1)])),
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
                        options: typeOptions,
                      },
                      null,
                      8,
                      ['modelValue'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              unref(type) === 'TEXT'
                ? (openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: 0,
                      label: 'JSON',
                      error: unref(error),
                    },
                    {
                      default: withCtx(() => [
                        createVNode(
                          _sfc_main$2,
                          {
                            modelValue: unref(text),
                            'onUpdate:modelValue':
                              _cache[1] ||
                              (_cache[1] = $event => (isRef(text) ? (text.value = $event) : null)),
                            'focus-on-mount': '',
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
                  ))
                : createCommentVNode('', true),
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  unref(type) === 'FILE'
                    ? (openBlock(),
                      createBlock(
                        _sfc_main$3,
                        {
                          key: 0,
                          primary: '',
                          onClick: onUploadClick,
                        },
                        {
                          default: withCtx(() => [
                            ...(_cache[3] || (_cache[3] = [createTextVNode('UPLOAD', -1)])),
                          ]),
                          _: 1,
                        },
                      ))
                    : createCommentVNode('', true),
                  unref(type) === 'TEXT'
                    ? (openBlock(),
                      createBlock(
                        _sfc_main$3,
                        {
                          key: 1,
                          primary: '',
                          onClick: onImportClick,
                        },
                        {
                          default: withCtx(() => [
                            ...(_cache[4] || (_cache[4] = [createTextVNode('IMPORT', -1)])),
                          ]),
                          _: 1,
                        },
                      ))
                    : createCommentVNode('', true),
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
