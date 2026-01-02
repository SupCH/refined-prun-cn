import { useXitParameters } from './use-xit-parameters.js';
import { userData } from './user-data.js';
import _sfc_main$1 from './PrunButton.vue.js';
import { createId } from './create-id.js';
import CommandLists from './CommandLists.vue.js';
import CommandList from './CommandList.vue.js';
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
  __name: 'CMDL',
  setup(__props) {
    const parameters = useXitParameters();
    const name = parameters.join(' ');
    const list = computed(() => {
      const byId = userData.commandLists.find(x => x.id.startsWith(parameters[0]));
      if (byId) {
        return byId;
      }
      return userData.commandLists.find(x => x.name === name);
    });
    function onCreateClick() {
      userData.commandLists.push({
        id: createId(),
        name,
        commands: [],
      });
    }
    return (_ctx, _cache) => {
      return unref(isEmpty)(unref(parameters))
        ? (openBlock(), createBlock(CommandLists, { key: 0 }))
        : unref(list)
          ? (openBlock(),
            createBlock(
              CommandList,
              {
                key: 1,
                list: unref(list),
              },
              null,
              8,
              ['list'],
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
                  'Command List "' + toDisplayString(unref(name)) + '" not found.',
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
