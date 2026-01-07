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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiSW1wb3J0QWN0aW9uUGFja2FnZS52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQUNUL0ltcG9ydEFjdGlvblBhY2thZ2UudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IFNlY3Rpb25IZWFkZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL1NlY3Rpb25IZWFkZXIudnVlJztcbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgQ29tbWFuZHMgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0NvbW1hbmRzLnZ1ZSc7XG5pbXBvcnQgU2VsZWN0SW5wdXQgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1NlbGVjdElucHV0LnZ1ZSc7XG5pbXBvcnQgeyB1cGxvYWRKc29uIH0gZnJvbSAnQHNyYy91dGlscy9qc29uLWZpbGUnO1xuaW1wb3J0IHsgaXNQcmVzZW50IH0gZnJvbSAndHMtZXh0cmFzJztcblxuY29uc3QgeyBvbkltcG9ydCB9ID0gZGVmaW5lUHJvcHM8eyBvbkltcG9ydDogKGpzb246IFVzZXJEYXRhLkFjdGlvblBhY2thZ2VEYXRhKSA9PiB2b2lkIH0+KCk7XG5cbmNvbnN0IGVtaXQgPSBkZWZpbmVFbWl0czx7IChlOiAnY2xvc2UnKTogdm9pZCB9PigpO1xuXG50eXBlIEltcG9ydFR5cGUgPSAnVEVYVCcgfCAnRklMRSc7XG5cbmNvbnN0IHR5cGVPcHRpb25zOiB7IGxhYmVsOiBzdHJpbmc7IHZhbHVlOiBJbXBvcnRUeXBlIH1bXSA9IFtcbiAge1xuICAgIGxhYmVsOiAnUGFzdGUgSlNPTicsXG4gICAgdmFsdWU6ICdURVhUJyxcbiAgfSxcbiAge1xuICAgIGxhYmVsOiAnVXBsb2FkIEpTT04nLFxuICAgIHZhbHVlOiAnRklMRScsXG4gIH0sXG5dO1xuXG5jb25zdCB0eXBlID0gcmVmKCdURVhUJyBhcyBJbXBvcnRUeXBlKTtcbmNvbnN0IHRleHQgPSByZWYoJycpO1xuY29uc3QgZXJyb3IgPSByZWYoZmFsc2UpO1xuXG5mdW5jdGlvbiBvbkltcG9ydENsaWNrKCkge1xuICBpZiAodGV4dC52YWx1ZS5sZW5ndGggPT09IDApIHtcbiAgICBlcnJvci52YWx1ZSA9IHRydWU7XG4gICAgcmV0dXJuO1xuICB9XG4gIHRyeSB7XG4gICAgY29uc3QganNvbiA9IEpTT04ucGFyc2UodGV4dC52YWx1ZSk7XG4gICAgaWYgKCF2YWxpZGF0ZUpzb24oanNvbikpIHtcbiAgICAgIGVycm9yLnZhbHVlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25JbXBvcnQoanNvbik7XG4gICAgZW1pdCgnY2xvc2UnKTtcbiAgfSBjYXRjaCB7XG4gICAgZXJyb3IudmFsdWUgPSB0cnVlO1xuICB9XG59XG5cbmZ1bmN0aW9uIG9uVXBsb2FkQ2xpY2soKSB7XG4gIHVwbG9hZEpzb24oanNvbiA9PiB7XG4gICAgaWYgKCF2YWxpZGF0ZUpzb24oanNvbikpIHtcbiAgICAgIGVycm9yLnZhbHVlID0gdHJ1ZTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgb25JbXBvcnQoanNvbik7XG4gICAgZW1pdCgnY2xvc2UnKTtcbiAgfSk7XG59XG5cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55XG5mdW5jdGlvbiB2YWxpZGF0ZUpzb24oanNvbjogYW55KSB7XG4gIHJldHVybiBpc1ByZXNlbnQoanNvbi5nbG9iYWw/Lm5hbWUpO1xufVxuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPGRpdiA6Y2xhc3M9XCJDLkRyYWZ0Q29uZGl0aW9uRWRpdG9yLmZvcm1cIj5cbiAgICA8U2VjdGlvbkhlYWRlcj5JbXBvcnQgQWN0aW9uIFBhY2thZ2U8L1NlY3Rpb25IZWFkZXI+XG4gICAgPGZvcm0+XG4gICAgICA8QWN0aXZlIGxhYmVsPVwiVHlwZVwiPlxuICAgICAgICA8U2VsZWN0SW5wdXQgdi1tb2RlbD1cInR5cGVcIiA6b3B0aW9ucz1cInR5cGVPcHRpb25zXCIgLz5cbiAgICAgIDwvQWN0aXZlPlxuICAgICAgPEFjdGl2ZSB2LWlmPVwidHlwZSA9PT0gJ1RFWFQnXCIgbGFiZWw9XCJKU09OXCIgOmVycm9yPVwiZXJyb3JcIj5cbiAgICAgICAgPFRleHRJbnB1dCB2LW1vZGVsPVwidGV4dFwiIGZvY3VzLW9uLW1vdW50IC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxDb21tYW5kcz5cbiAgICAgICAgPFBydW5CdXR0b24gdi1pZj1cInR5cGUgPT09ICdGSUxFJ1wiIHByaW1hcnkgQGNsaWNrPVwib25VcGxvYWRDbGlja1wiPlVQTE9BRDwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPFBydW5CdXR0b24gdi1pZj1cInR5cGUgPT09ICdURVhUJ1wiIHByaW1hcnkgQGNsaWNrPVwib25JbXBvcnRDbGlja1wiPklNUE9SVDwvUHJ1bkJ1dHRvbj5cbiAgICAgIDwvQ29tbWFuZHM+XG4gICAgPC9mb3JtPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIkFjdGl2ZSIsIl91bnJlZiIsIl9pc1JlZiIsIlRleHRJbnB1dCIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJQcnVuQnV0dG9uIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBWUEsVUFBQSxPQUFBO0FBSUEsVUFBQSxjQUFBO0FBQUEsTUFBNEQ7QUFBQSxRQUMxRCxPQUFBO0FBQUEsUUFDUyxPQUFBO0FBQUEsTUFDQTtBQUFBLE1B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
