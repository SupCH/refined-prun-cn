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
