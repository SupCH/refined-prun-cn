import { t } from './index13.js';
import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import _sfc_main$3 from './CreateNoteOverlay.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import _sfc_main$2 from './ActionBar.vue.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import { createNote, deleteNote } from './notes.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import PrunLink from './PrunLink.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  withDirectives,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'NoteList',
  setup(__props) {
    function createNewNote(ev) {
      showTileOverlay(ev, _sfc_main$3, {
        onCreate: name => {
          const id = createNote(name);
          showBuffer(`XIT NOTE ${id}`);
        },
      });
    }
    function confirmDelete(ev, note) {
      showConfirmationOverlay(ev, () => deleteNote(note), {
        message: t('note.deleteConfirm', note.name),
      });
    }
    const dragging = ref(false);
    const draggableOptions = {
      animation: 150,
      handle: `.${grip.grip}`,
      onStart: () => (dragging.value = true),
      onEnd: () => (dragging.value = false),
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(_sfc_main$2, null, {
              default: withCtx(() => [
                createVNode(
                  _sfc_main$1,
                  {
                    primary: '',
                    onClick: createNewNote,
                  },
                  {
                    default: withCtx(() => [
                      createTextVNode(
                        toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('note.newNote')),
                        1,
                      ),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('note.noteName')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('note.noteLength')),
                    1,
                  ),
                  _cache[0] || (_cache[0] = createBaseVNode('th', null, null, -1)),
                ]),
              ]),
              withDirectives(
                (openBlock(),
                createElementBlock(
                  'tbody',
                  {
                    class: normalizeClass(unref(dragging) ? _ctx.$style.dragging : null),
                  },
                  [
                    (openBlock(true),
                    createElementBlock(
                      Fragment,
                      null,
                      renderList(unref(userData).notes, note => {
                        return (
                          openBlock(),
                          createElementBlock(
                            'tr',
                            {
                              key: note.id,
                            },
                            [
                              createBaseVNode('td', null, [
                                createBaseVNode(
                                  'span',
                                  {
                                    class: normalizeClass([
                                      unref(grip).grip,
                                      unref(fa).solid,
                                      _ctx.$style.grip,
                                    ]),
                                  },
                                  toDisplayString(''),
                                  2,
                                ),
                                createVNode(
                                  PrunLink,
                                  {
                                    inline: '',
                                    command: `XIT NOTE ${note.id.substring(0, 8)}`,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(note.name), 1),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['command'],
                                ),
                              ]),
                              createBaseVNode('td', null, [
                                createBaseVNode(
                                  'span',
                                  null,
                                  toDisplayString(
                                    ('t' in _ctx ? _ctx.t : unref(t))(
                                      'note.characters',
                                      note.text.length.toLocaleString(),
                                    ),
                                  ),
                                  1,
                                ),
                              ]),
                              createBaseVNode('td', null, [
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    danger: '',
                                    onClick: $event => confirmDelete($event, note),
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(
                                        toDisplayString(
                                          ('t' in _ctx ? _ctx.t : unref(t))('note.deleteNote'),
                                        ),
                                        1,
                                      ),
                                    ]),
                                    _: 2,
                                  },
                                  1032,
                                  ['onClick'],
                                ),
                              ]),
                            ],
                          )
                        );
                      }),
                      128,
                    )),
                  ],
                  2,
                )),
                [[unref(so), [unref(userData).notes, draggableOptions]]],
              ),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
