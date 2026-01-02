import NoteList from './NoteList.vue.js';
import NoteEditor from './NoteEditor.vue.js';
import { useXitParameters } from './use-xit-parameters.js';
import { userData } from './user-data.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { createId } from './create-id.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'NOTE',
  setup(__props) {
    const parameters = useXitParameters();
    const name = parameters.join(' ');
    const note = computed(() => {
      const byId = userData.notes.find(x => x.id.startsWith(parameters[0]));
      if (byId) {
        return byId;
      }
      return userData.notes.find(x => x.name === name);
    });
    function onCreateClick() {
      userData.notes.push({
        id: createId(),
        name,
        text: '',
      });
    }
    return (_ctx, _cache) => {
      return unref(isEmpty)(unref(parameters))
        ? (openBlock(), createBlock(NoteList, { key: 0 }))
        : unref(note)
          ? (openBlock(),
            createBlock(
              NoteEditor,
              {
                key: 1,
                note: unref(note),
              },
              null,
              8,
              ['note'],
            ))
          : (openBlock(),
            createElementBlock(
              'div',
              {
                key: 2,
                class: normalizeClass(_ctx.$style.create),
              },
              [
                createBaseVNode(
                  'span',
                  null,
                  'Note "' + toDisplayString(unref(name)) + '" not found.',
                  1,
                ),
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    class: normalizeClass(_ctx.$style.button),
                    onClick: onCreateClick,
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[0] || (_cache[0] = [createTextVNode('CREATE', -1)])),
                    ]),
                    _: 1,
                  },
                  8,
                  ['class'],
                ),
              ],
              2,
            ));
    };
  },
});
export { _sfc_main as default };
