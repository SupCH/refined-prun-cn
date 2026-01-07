import SectionHeader from './SectionHeader.vue.js';
import { act } from './act-registry.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createVNode,
  createBlock,
  withCtx,
  createTextVNode,
  resolveDynamicComponent,
} from './runtime-core.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ConfigureWindow',
  props: {
    pkg: {},
    config: {},
  },
  setup(__props) {
    const blocks = computed(() => {
      const blocks2 = [];
      for (const group of __props.pkg.groups) {
        const info = act.getMaterialGroupInfo(group.type);
        if (!info || !info.configureComponent || !info.needsConfigure?.(group)) {
          continue;
        }
        const name = group.name;
        let groupConfig = __props.config.materialGroups[name];
        if (!groupConfig) {
          continue;
        }
        blocks2.push({
          name: `[${name}]: ${info.type} Material Group`,
          component: info.configureComponent,
          data: group,
          config: groupConfig,
        });
      }
      for (const action of __props.pkg.actions) {
        const info = act.getActionInfo(action.type);
        if (!info || !info.configureComponent || !info.needsConfigure?.(action)) {
          continue;
        }
        const name = action.name;
        let actionConfig = __props.config.actions[name];
        if (!actionConfig) {
          continue;
        }
        blocks2.push({
          name: `[${name}]: ${info.type} Action`,
          component: info.configureComponent,
          data: action,
          config: actionConfig,
        });
      }
      return blocks2;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(_ctx.$style.config),
          },
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(blocks), block => {
                return (
                  openBlock(),
                  createElementBlock(
                    Fragment,
                    {
                      key: block.name,
                    },
                    [
                      createVNode(
                        SectionHeader,
                        {
                          class: normalizeClass(_ctx.$style.sectionHeader),
                        },
                        {
                          default: withCtx(() => [createTextVNode(toDisplayString(block.name), 1)]),
                          _: 2,
                        },
                        1032,
                        ['class'],
                      ),
                      (openBlock(),
                      createBlock(
                        resolveDynamicComponent(block.component),
                        {
                          data: block.data,
                          config: block.config,
                        },
                        null,
                        8,
                        ['data', 'config'],
                      )),
                    ],
                    64,
                  )
                );
              }),
              128,
            )),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
