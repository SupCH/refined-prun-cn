import { showTileOverlay, showConfirmationOverlay } from './tile-overlay.js';
import _sfc_main$3 from './CreateCommandListOverlay.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import _sfc_main$2 from './ActionBar.vue.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import grip from './grip.module.css.js';
import fa from './font-awesome.module.css.js';
import PrunLink from './PrunLink.vue.js';
import { createId } from './create-id.js';
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
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CommandLists',
  setup(__props) {
    function createNew(ev) {
      showTileOverlay(ev, _sfc_main$3, {
        onCreate: name => {
          const id = createId();
          userData.commandLists.push({
            id,
            name,
            commands: [],
          });
          return showBuffer(`XIT CMDL ${id.substring(0, 8)}`);
        },
      });
    }
    function confirmDelete(ev, list) {
      showConfirmationOverlay(
        ev,
        () => (userData.commandLists = userData.commandLists.filter(x => x !== list)),
        {
          message: `Are you sure you want to delete the list "${list.name}"?`,
        },
      );
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
                    onClick: createNew,
                  },
                  {
                    default: withCtx(() => [
                      ...(_cache[0] || (_cache[0] = [createTextVNode('CREATE NEW', -1)])),
                    ]),
                    _: 1,
                  },
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('table', null, [
              _cache[2] ||
                (_cache[2] = createBaseVNode(
                  'thead',
                  null,
                  [
                    createBaseVNode('tr', null, [
                      createBaseVNode('th', null, 'Name'),
                      createBaseVNode('th', null, 'Length'),
                      createBaseVNode('th'),
                    ]),
                  ],
                  -1,
                )),
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
                      renderList(unref(userData).commandLists, list => {
                        return (
                          openBlock(),
                          createElementBlock(
                            'tr',
                            {
                              key: list.id,
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
                                    command: `XIT CMDL ${list.id.substring(0, 8)}`,
                                  },
                                  {
                                    default: withCtx(() => [
                                      createTextVNode(toDisplayString(list.name), 1),
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
                                  toDisplayString(list.commands.length) +
                                    ' command' +
                                    toDisplayString(list.commands.length !== 1 ? 's' : ''),
                                  1,
                                ),
                              ]),
                              createBaseVNode('td', null, [
                                createVNode(
                                  _sfc_main$1,
                                  {
                                    danger: '',
                                    onClick: $event => confirmDelete($event, list),
                                  },
                                  {
                                    default: withCtx(() => [
                                      ...(_cache[1] ||
                                        (_cache[1] = [createTextVNode('DELETE', -1)])),
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
                [[unref(so), [unref(userData).commandLists, draggableOptions]]],
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29tbWFuZExpc3RzLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvQ01ETC9Db21tYW5kTGlzdHMudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBzaG93VGlsZU92ZXJsYXksIHNob3dDb25maXJtYXRpb25PdmVybGF5IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3RpbGUtb3ZlcmxheSc7XG5pbXBvcnQgQ3JlYXRlQ29tbWFuZExpc3RPdmVybGF5IGZyb20gJy4vQ3JlYXRlQ29tbWFuZExpc3RPdmVybGF5LnZ1ZSc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IEFjdGlvbkJhciBmcm9tICdAc3JjL2NvbXBvbmVudHMvQWN0aW9uQmFyLnZ1ZSc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyB2RHJhZ2dhYmxlIH0gZnJvbSAndnVlLWRyYWdnYWJsZS1wbHVzJztcbmltcG9ydCBncmlwIGZyb20gJ0BzcmMvdXRpbHMvZ3JpcC5tb2R1bGUuY3NzJztcbmltcG9ydCBmYSBmcm9tICdAc3JjL3V0aWxzL2ZvbnQtYXdlc29tZS5tb2R1bGUuY3NzJztcbmltcG9ydCBQcnVuTGluayBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkxpbmsudnVlJztcbmltcG9ydCB7IGNyZWF0ZUlkIH0gZnJvbSAnQHNyYy9zdG9yZS9jcmVhdGUtaWQnO1xuXG5mdW5jdGlvbiBjcmVhdGVOZXcoZXY6IEV2ZW50KSB7XG4gIHNob3dUaWxlT3ZlcmxheShldiwgQ3JlYXRlQ29tbWFuZExpc3RPdmVybGF5LCB7XG4gICAgb25DcmVhdGU6IG5hbWUgPT4ge1xuICAgICAgY29uc3QgaWQgPSBjcmVhdGVJZCgpO1xuICAgICAgdXNlckRhdGEuY29tbWFuZExpc3RzLnB1c2goe1xuICAgICAgICBpZCxcbiAgICAgICAgbmFtZSxcbiAgICAgICAgY29tbWFuZHM6IFtdLFxuICAgICAgfSk7XG4gICAgICByZXR1cm4gc2hvd0J1ZmZlcihgWElUIENNREwgJHtpZC5zdWJzdHJpbmcoMCwgOCl9YCk7XG4gICAgfSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm1EZWxldGUoZXY6IEV2ZW50LCBsaXN0OiBVc2VyRGF0YS5Db21tYW5kTGlzdCkge1xuICBzaG93Q29uZmlybWF0aW9uT3ZlcmxheShcbiAgICBldixcbiAgICAoKSA9PiAodXNlckRhdGEuY29tbWFuZExpc3RzID0gdXNlckRhdGEuY29tbWFuZExpc3RzLmZpbHRlcih4ID0+IHggIT09IGxpc3QpKSxcbiAgICB7XG4gICAgICBtZXNzYWdlOiBgQXJlIHlvdSBzdXJlIHlvdSB3YW50IHRvIGRlbGV0ZSB0aGUgbGlzdCBcIiR7bGlzdC5uYW1lfVwiP2AsXG4gICAgfSxcbiAgKTtcbn1cblxuY29uc3QgZHJhZ2dpbmcgPSByZWYoZmFsc2UpO1xuXG5jb25zdCBkcmFnZ2FibGVPcHRpb25zID0ge1xuICBhbmltYXRpb246IDE1MCxcbiAgaGFuZGxlOiBgLiR7Z3JpcC5ncmlwfWAsXG4gIG9uU3RhcnQ6ICgpID0+IChkcmFnZ2luZy52YWx1ZSA9IHRydWUpLFxuICBvbkVuZDogKCkgPT4gKGRyYWdnaW5nLnZhbHVlID0gZmFsc2UpLFxufTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxBY3Rpb25CYXI+XG4gICAgPFBydW5CdXR0b24gcHJpbWFyeSBAY2xpY2s9XCJjcmVhdGVOZXdcIj5DUkVBVEUgTkVXPC9QcnVuQnV0dG9uPlxuICA8L0FjdGlvbkJhcj5cbiAgPHRhYmxlPlxuICAgIDx0aGVhZD5cbiAgICAgIDx0cj5cbiAgICAgICAgPHRoPk5hbWU8L3RoPlxuICAgICAgICA8dGg+TGVuZ3RoPC90aD5cbiAgICAgICAgPHRoIC8+XG4gICAgICA8L3RyPlxuICAgIDwvdGhlYWQ+XG4gICAgPHRib2R5XG4gICAgICB2LWRyYWdnYWJsZT1cIlt1c2VyRGF0YS5jb21tYW5kTGlzdHMsIGRyYWdnYWJsZU9wdGlvbnNdXCJcbiAgICAgIDpjbGFzcz1cImRyYWdnaW5nID8gJHN0eWxlLmRyYWdnaW5nIDogbnVsbFwiPlxuICAgICAgPHRyIHYtZm9yPVwibGlzdCBpbiB1c2VyRGF0YS5jb21tYW5kTGlzdHNcIiA6a2V5PVwibGlzdC5pZFwiPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4gOmNsYXNzPVwiW2dyaXAuZ3JpcCwgZmEuc29saWQsICRzdHlsZS5ncmlwXVwiPlxuICAgICAgICAgICAge3sgJ1xcdWY1OGUnIH19XG4gICAgICAgICAgPC9zcGFuPlxuICAgICAgICAgIDxQcnVuTGluayBpbmxpbmUgOmNvbW1hbmQ9XCJgWElUIENNREwgJHtsaXN0LmlkLnN1YnN0cmluZygwLCA4KX1gXCI+XG4gICAgICAgICAgICB7eyBsaXN0Lm5hbWUgfX1cbiAgICAgICAgICA8L1BydW5MaW5rPlxuICAgICAgICA8L3RkPlxuICAgICAgICA8dGQ+XG4gICAgICAgICAgPHNwYW4+XG4gICAgICAgICAgICB7eyBsaXN0LmNvbW1hbmRzLmxlbmd0aCB9fSBjb21tYW5ke3sgbGlzdC5jb21tYW5kcy5sZW5ndGggIT09IDEgPyAncycgOiAnJyB9fVxuICAgICAgICAgIDwvc3Bhbj5cbiAgICAgICAgPC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuQnV0dG9uIGRhbmdlciBAY2xpY2s9XCJjb25maXJtRGVsZXRlKCRldmVudCwgbGlzdClcIj5ERUxFVEU8L1BydW5CdXR0b24+XG4gICAgICAgIDwvdGQ+XG4gICAgICA8L3RyPlxuICAgIDwvdGJvZHk+XG4gIDwvdGFibGU+XG48L3RlbXBsYXRlPlxuXG48c3R5bGUgbW9kdWxlPlxuLmdyaXAge1xuICBjdXJzb3I6IG1vdmU7XG4gIHRyYW5zaXRpb246IG9wYWNpdHkgMC4ycyBlYXNlLWluLW91dDtcbiAgb3BhY2l0eTogMDtcbiAgbWFyZ2luLXJpZ2h0OiA1cHg7XG59XG5cbnRyOmhvdmVyIC5ncmlwIHtcbiAgb3BhY2l0eTogMTtcbn1cblxuLmRyYWdnaW5nIHRkIC5ncmlwIHtcbiAgb3BhY2l0eTogMDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiQ3JlYXRlQ29tbWFuZExpc3RPdmVybGF5IiwiX3dpdGhDdHgiLCJfY3JlYXRlVk5vZGUiLCJQcnVuQnV0dG9uIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfbm9ybWFsaXplQ2xhc3MiLCJfdW5yZWYiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7OztBQWFBLGFBQUEsVUFBQSxJQUFBO0FBQ0Usc0JBQUEsSUFBQUEsYUFBQTtBQUFBLFFBQThDLFVBQUEsQ0FBQSxTQUFBO0FBRTFDLGdCQUFBLEtBQUEsU0FBQTtBQUNBLG1CQUFBLGFBQUEsS0FBQTtBQUFBLFlBQTJCO0FBQUEsWUFDekI7QUFBQSxZQUNBLFVBQUEsQ0FBQTtBQUFBLFVBQ1csQ0FBQTtBQUViLGlCQUFBLFdBQUEsWUFBQSxHQUFBLFVBQUEsR0FBQSxDQUFBLENBQUEsRUFBQTtBQUFBLFFBQWtEO0FBQUEsTUFDcEQsQ0FBQTtBQUFBLElBQ0Q7QUFHSCxhQUFBLGNBQUEsSUFBQSxNQUFBO0FBQ0U7QUFBQSxRQUFBO0FBQUEsUUFDRSxNQUFBLFNBQUEsZUFBQSxTQUFBLGFBQUEsT0FBQSxDQUFBLE1BQUEsTUFBQSxJQUFBO0FBQUEsUUFDMkU7QUFBQSxVQUMzRSxTQUFBLDZDQUFBLEtBQUEsSUFBQTtBQUFBLFFBQ2lFO0FBQUEsTUFDakU7QUFBQSxJQUNGO0FBR0YsVUFBQSxXQUFBLElBQUEsS0FBQTtBQUVBLFVBQUEsbUJBQUE7QUFBQSxNQUF5QixXQUFBO0FBQUEsTUFDWixRQUFBLElBQUEsS0FBQSxJQUFBO0FBQUEsTUFDVSxTQUFBLE1BQUEsU0FBQSxRQUFBO0FBQUEsTUFDWSxPQUFBLE1BQUEsU0FBQSxRQUFBO0FBQUEsSUFDRjs7OztVQU9uQixTQUFBQyxRQUFBLE1BQUE7QUFBQSxZQURvREMsWUFBQUMsYUFBQTtBQUFBLGNBQUEsU0FBQTtBQUFBLGNBQWxELFNBQUE7QUFBQSxZQUFnQixHQUFBO0FBQUE7Z0JBQXFCQyxnQkFBQSxjQUFBLEVBQUE7QUFBQSxjQUFBLEVBQUEsQ0FBQTtBQUFBOzs7Ozs7VUFnQzNDLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQyxnQkFBQSxTQUFBLE1BQUE7QUFBQSxZQXZCRUEsZ0JBQUEsTUFBQSxNQUFBO0FBQUEsY0FEREEsZ0JBQUEsTUFBQSxNQUFBLE1BQUE7QUFBQSxjQUhLQSxnQkFBQSxNQUFBLE1BQUEsUUFBQTtBQUFBLGNBQ0VBLGdCQUFBLElBQUE7QUFBQSxZQUNKLENBQUE7QUFBQTs7WUF3QkYsT0FBQUMsZUFBQUMsTUFBQSxRQUFBLElBQUEsS0FBQSxPQUFBLFdBQUEsSUFBQTtBQUFBLFVBbkI0QixHQUFBO0FBQUE7O2dCQWtCN0IsS0FBQSxLQUFBO0FBQUEsY0FqQmdELEdBQUE7QUFBQTtrQkFROUNGLGdCQUFBLFFBQUE7QUFBQSxvQkFKSSxPQUFBQyxlQUFBLENBQUFDLE1BQUEsSUFBQSxFQUFBLE1BQUFBLE1BQUEsRUFBQSxFQUFBLE9BQUEsS0FBQSxPQUFBLElBQUEsQ0FBQTtBQUFBLGtCQUZ3QyxHQUFBQyxnQkFBQSxHQUFBLEdBQUEsQ0FBQTtBQUFBLGtCQUNsQ04sWUFBQSxVQUFBO0FBQUEsb0JBSUYsUUFBQTtBQUFBLG9CQUZELFNBQUEsWUFBQSxLQUFBLEdBQUEsVUFBQSxHQUFBLENBQUEsQ0FBQTtBQUFBLGtCQUE4QyxHQUFBO0FBQUE7c0JBQ3ZDRSxnQkFBQUksZ0JBQUEsS0FBQSxJQUFBLEdBQUEsQ0FBQTtBQUFBLG9CQUFILENBQUE7QUFBQTs7OztrQkFPWEgsZ0JBQUEsUUFBQSxNQUFBRyxnQkFBQSxLQUFBLFNBQUEsTUFBQSxJQUFBLGFBQUFBLGdCQUFBLEtBQUEsU0FBQSxXQUFBLElBQUEsTUFBQSxFQUFBLEdBQUEsQ0FBQTtBQUFBLGdCQUZ3RCxDQUFBO0FBQUE7a0JBS3hETixZQUFBQyxhQUFBO0FBQUEsb0JBRHdFLFFBQUE7QUFBQSxvQkFBL0QsU0FBQSxDQUFBLFdBQUEsY0FBQSxRQUFBLElBQUE7QUFBQSxrQkFBeUMsR0FBQTtBQUFBO3NCQUFTQyxnQkFBQSxVQUFBLEVBQUE7QUFBQSxvQkFBQSxFQUFBLENBQUE7QUFBQTs7Ozs7OztVQWpCYixDQUFBO0FBQUE7Ozs7OyJ9
