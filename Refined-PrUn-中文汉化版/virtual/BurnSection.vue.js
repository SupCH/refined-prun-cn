import PlanetHeader from './PlanetHeader.vue.js';
import _sfc_main$1 from './MaterialList.vue.js';
import { useTileState } from './tile-state5.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BurnSection',
  props: {
    burn: {},
    canMinimize: { type: Boolean },
  },
  setup(__props) {
    const expand = useTileState('expand');
    const naturalId = computed(() => __props.burn.naturalId);
    const isMinimized = computed(
      () => __props.canMinimize && !expand.value.includes(naturalId.value),
    );
    const onHeaderClick = () => {
      if (!__props.canMinimize) {
        return;
      }
      if (isMinimized.value) {
        expand.value = [...expand.value, naturalId.value];
      } else {
        expand.value = expand.value.filter(x => x !== naturalId.value);
      }
    };
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode('tbody', null, [
              createVNode(
                PlanetHeader,
                {
                  'has-minimize': _ctx.canMinimize,
                  burn: _ctx.burn,
                  minimized: unref(isMinimized),
                  'on-click': onHeaderClick,
                },
                null,
                8,
                ['has-minimize', 'burn', 'minimized'],
              ),
            ]),
            !unref(isMinimized)
              ? (openBlock(),
                createElementBlock('tbody', _hoisted_1, [
                  createVNode(_sfc_main$1, { burn: _ctx.burn }, null, 8, ['burn']),
                ]))
              : createCommentVNode('', true),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
