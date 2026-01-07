import { t } from './index5.js';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiTm90ZUxpc3QudnVlMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL1hJVC9OT1RFL05vdGVMaXN0LnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgc2hvd1RpbGVPdmVybGF5LCBzaG93Q29uZmlybWF0aW9uT3ZlcmxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS90aWxlLW92ZXJsYXknO1xuaW1wb3J0IENyZWF0ZU5vdGVPdmVybGF5IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL05PVEUvQ3JlYXRlTm90ZU92ZXJsYXkudnVlJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgQWN0aW9uQmFyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9BY3Rpb25CYXIudnVlJztcbmltcG9ydCB7IHNob3dCdWZmZXIgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYnVmZmVycyc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGNyZWF0ZU5vdGUsIGRlbGV0ZU5vdGUgfSBmcm9tICdAc3JjL3N0b3JlL25vdGVzJztcbmltcG9ydCB7IHZEcmFnZ2FibGUgfSBmcm9tICd2dWUtZHJhZ2dhYmxlLXBsdXMnO1xuaW1wb3J0IGdyaXAgZnJvbSAnQHNyYy91dGlscy9ncmlwLm1vZHVsZS5jc3MnO1xuaW1wb3J0IGZhIGZyb20gJ0BzcmMvdXRpbHMvZm9udC1hd2Vzb21lLm1vZHVsZS5jc3MnO1xuaW1wb3J0IFBydW5MaW5rIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuTGluay52dWUnO1xuXG5mdW5jdGlvbiBjcmVhdGVOZXdOb3RlKGV2OiBFdmVudCkge1xuICBzaG93VGlsZU92ZXJsYXkoZXYsIENyZWF0ZU5vdGVPdmVybGF5LCB7XG4gICAgb25DcmVhdGU6IG5hbWUgPT4ge1xuICAgICAgY29uc3QgaWQgPSBjcmVhdGVOb3RlKG5hbWUpO1xuICAgICAgc2hvd0J1ZmZlcihgWElUIE5PVEUgJHtpZH1gKTtcbiAgICB9LFxuICB9KTtcbn1cblxuZnVuY3Rpb24gY29uZmlybURlbGV0ZShldjogRXZlbnQsIG5vdGU6IFVzZXJEYXRhLk5vdGUpIHtcbiAgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkoZXYsICgpID0+IGRlbGV0ZU5vdGUobm90ZSksIHtcbiAgICBtZXNzYWdlOiB0KCdub3RlLmRlbGV0ZUNvbmZpcm0nLCBub3RlLm5hbWUpLFxuICB9KTtcbn1cblxuY29uc3QgZHJhZ2dpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBkcmFnZ2FibGVPcHRpb25zID0ge1xuICBhbmltYXRpb246IDE1MCxcbiAgaGFuZGxlOiBgLiR7Z3JpcC5ncmlwfWAsXG4gIG9uU3RhcnQ6ICgpID0+IChkcmFnZ2luZy52YWx1ZSA9IHRydWUpLFxuICBvbkVuZDogKCkgPT4gKGRyYWdnaW5nLnZhbHVlID0gZmFsc2UpLFxufTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxBY3Rpb25CYXI+XG4gICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJjcmVhdGVOZXdOb3RlXCI+e3sgdCgnbm90ZS5uZXdOb3RlJykgfX08L1BydW5CdXR0b24+XG4gIDwvQWN0aW9uQmFyPlxuICA8dGFibGU+XG4gICAgPHRoZWFkPlxuICAgICAgPHRyPlxuICAgICAgICA8dGg+e3sgdCgnbm90ZS5ub3RlTmFtZScpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ25vdGUubm90ZUxlbmd0aCcpIH19PC90aD5cbiAgICAgICAgPHRoIC8+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5XG4gICAgICB2LWRyYWdnYWJsZT1cIlt1c2VyRGF0YS5ub3RlcywgZHJhZ2dhYmxlT3B0aW9uc11cIlxuICAgICAgOmNsYXNzPVwiZHJhZ2dpbmcgPyAkc3R5bGUuZHJhZ2dpbmcgOiBudWxsXCI+XG4gICAgICA8dHIgdi1mb3I9XCJub3RlIGluIHVzZXJEYXRhLm5vdGVzXCIgOmtleT1cIm5vdGUuaWRcIj5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuIDpjbGFzcz1cIltncmlwLmdyaXAsIGZhLnNvbGlkLCAkc3R5bGUuZ3JpcF1cIj5cbiAgICAgICAgICAgIHt7ICdcXHVmNThlJyB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgICA8UHJ1bkxpbmsgaW5saW5lIDpjb21tYW5kPVwiYFhJVCBOT1RFICR7bm90ZS5pZC5zdWJzdHJpbmcoMCwgOCl9YFwiPlxuICAgICAgICAgICAge3sgbm90ZS5uYW1lIH19XG4gICAgICAgICAgPC9QcnVuTGluaz5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxzcGFuPlxuICAgICAgICAgICAge3sgdCgnbm90ZS5jaGFyYWN0ZXJzJywgbm90ZS50ZXh0Lmxlbmd0aC50b0xvY2FsZVN0cmluZygpKSB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuQnV0dG9uIGRhbmdlciBAY2xpY2s9XCJjb25maXJtRGVsZXRlKCRldmVudCwgbm90ZSlcIj57e1xuICAgICAgICAgICAgdCgnbm90ZS5kZWxldGVOb3RlJylcbiAgICAgICAgICB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uZ3JpcCB7XG4gIGN1cnNvcjogbW92ZTtcbiAgdHJhbnNpdGlvbjogb3BhY2l0eSAwLjJzIGVhc2UtaW4tb3V0O1xuICBvcGFjaXR5OiAwO1xuICBtYXJnaW4tcmlnaHQ6IDVweDtcbn1cblxudHI6aG92ZXIgLmdyaXAge1xuICBvcGFjaXR5OiAxO1xufVxuXG4uZHJhZ2dpbmcgdGQgLmdyaXAge1xuICBvcGFjaXR5OiAwO1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJDcmVhdGVOb3RlT3ZlcmxheSIsIl93aXRoQ3R4IiwiX2NyZWF0ZVZOb2RlIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLGFBQUEsY0FBQSxJQUFBO0FBQ0Usc0JBQUEsSUFBQUEsYUFBQTtBQUFBLFFBQXVDLFVBQUEsQ0FBQSxTQUFBO0FBRW5DLGdCQUFBLEtBQUEsV0FBQSxJQUFBO0FBQ0EscUJBQUEsWUFBQSxFQUFBLEVBQUE7QUFBQSxRQUEyQjtBQUFBLE1BQzdCLENBQUE7QUFBQSxJQUNEO0FBR0gsYUFBQSxjQUFBLElBQUEsTUFBQTtBQUNFLDhCQUFBLElBQUEsTUFBQSxXQUFBLElBQUEsR0FBQTtBQUFBLFFBQW9ELFNBQUEsRUFBQSxzQkFBQSxLQUFBLElBQUE7QUFBQSxNQUNSLENBQUE7QUFBQSxJQUMzQztBQUdILFVBQUEsV0FBQSxJQUFBLEtBQUE7QUFFQSxVQUFBLG1CQUFBO0FBQUEsTUFBeUIsV0FBQTtBQUFBLE1BQ1osUUFBQSxJQUFBLEtBQUEsSUFBQTtBQUFBLE1BQ1UsU0FBQSxNQUFBLFNBQUEsUUFBQTtBQUFBLE1BQ1ksT0FBQSxNQUFBLFNBQUEsUUFBQTtBQUFBLElBQ0Y7Ozs7VUFPbkIsU0FBQUMsUUFBQSxNQUFBO0FBQUEsWUFEcUVDLFlBQUFDLGFBQUE7QUFBQSxjQUFBLFNBQUE7QUFBQSxjQUFuRSxTQUFBO0FBQUEsWUFBZ0IsR0FBQTtBQUFBO2dCQUFzQ0MsZ0JBQUFDLGlCQUFwQkMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7Y0FBQyxDQUFBO0FBQUE7Ozs7OztVQWtDekNDLGdCQUFBLFNBQUEsTUFBQTtBQUFBLFlBekJFQSxnQkFBQSxNQUFBLE1BQUE7QUFBQSxjQUREQSxnQkFBQSxNQUFBLE1BQUFGLGlCQUhJQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxlQUFBQSxDQUFBQSxHQUFBQSxDQUFBQTtBQUFBQSxjQUFDQyxnQkFBQSxNQUFBLE1BQUFGLGlCQUNEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxpQkFBQUEsQ0FBQUEsR0FBQUEsQ0FBQUE7QUFBQUEsY0FBQyxPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUMsZ0JBQUEsTUFBQSxNQUFBLE1BQUEsRUFBQTtBQUFBLFlBQ0YsQ0FBQTtBQUFBOztZQTBCRixPQUFBQyxlQUFBQyxNQUFBLFFBQUEsSUFBQSxLQUFBLE9BQUEsV0FBQSxJQUFBO0FBQUEsVUFyQjRCLEdBQUE7QUFBQTs7Z0JBb0I3QixLQUFBLEtBQUE7QUFBQSxjQW5CeUMsR0FBQTtBQUFBO2tCQVF2Q0YsZ0JBQUEsUUFBQTtBQUFBLG9CQUpJLE9BQUFDLGVBQUEsQ0FBQUMsTUFBQSxJQUFBLEVBQUEsTUFBQUEsTUFBQSxFQUFBLEVBQUEsT0FBQSxLQUFBLE9BQUEsSUFBQSxDQUFBO0FBQUEsa0JBRndDLEdBQUFKLGdCQUFBLEdBQUEsR0FBQSxDQUFBO0FBQUEsa0JBQ2xDSCxZQUFBLFVBQUE7QUFBQSxvQkFJRixRQUFBO0FBQUEsb0JBRkQsU0FBQSxZQUFBLEtBQUEsR0FBQSxVQUFBLEdBQUEsQ0FBQSxDQUFBO0FBQUEsa0JBQThDLEdBQUE7QUFBQTtzQkFDdkNFLGdCQUFBQyxnQkFBQSxLQUFBLElBQUEsR0FBQSxDQUFBO0FBQUEsb0JBQUgsQ0FBQTtBQUFBOzs7O2tCQU9YRSxnQkFBQSxRQUFBLE1BQUFGLGlCQUZFQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtnQkFBb0QsQ0FBQTtBQUFBO2tCQU90REosWUFBQUMsYUFBQTtBQUFBLG9CQURZLFFBQUE7QUFBQSxvQkFGSCxTQUFBLENBQUEsV0FBQSxjQUFBLFFBQUEsSUFBQTtBQUFBLGtCQUF5QyxHQUFBO0FBQUE7c0JBRW5EQyxnQkFBQUMsaUJBREFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBO29CQUFDLENBQUE7QUFBQTs7Ozs7OztVQWxCdUMsQ0FBQTtBQUFBOzs7OzsifQ==
