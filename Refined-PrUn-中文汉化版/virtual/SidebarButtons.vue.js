import { C, prunStyleUpdated } from './prun-css.js';
import { showBuffer } from './buffers.js';
import { userData } from './user-data.js';
import { canAcceptContract } from './utils4.js';
import { contractsStore } from './contracts.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  withDirectives,
  openBlock,
  createElementBlock,
  Fragment,
  renderList,
  createElementVNode as createBaseVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = ['onClick'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'SidebarButtons',
  props: {
    comPulse: { type: Boolean },
  },
  setup(__props) {
    const pendingContracts = computed(
      () => contractsStore.all.value?.filter(canAcceptContract).length ?? 0,
    );
    const hasPendingContracts = computed(() => pendingContracts.value > 0);
    const activeIndicator = [
      C.Frame.toggleIndicator,
      C.Frame.toggleIndicatorPulseActive,
      C.effects.shadowPulseSuccess,
    ];
    const inactiveIndicator = [C.Frame.toggleIndicator, C.Frame.toggleIndicatorSecondary];
    function indicatorClass(command) {
      if (command === 'COM' && __props.comPulse) {
        return activeIndicator;
      }
      if (['CONTS', 'XIT CONTS'].includes(command) && hasPendingContracts.value) {
        return activeIndicator;
      }
      if (command === 'XIT DEV' && prunStyleUpdated.value) {
        return activeIndicator;
      }
      return inactiveIndicator;
    }
    return (_ctx, _cache) => {
      return withDirectives(
        (openBlock(),
        createElementBlock('div', null, [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(unref(userData).settings.sidebar, button => {
              return (
                openBlock(),
                createElementBlock(
                  'div',
                  {
                    key: unref(objectId)(button),
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Frame.toggle),
                    onClick: () => unref(showBuffer)(button[1]),
                  },
                  [
                    createBaseVNode(
                      'span',
                      {
                        class: normalizeClass([
                          ('C' in _ctx ? _ctx.C : unref(C)).Frame.toggleLabel,
                          ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                          ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                        ]),
                      },
                      toDisplayString(button[0]),
                      3,
                    ),
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(indicatorClass(button[1])),
                      },
                      null,
                      2,
                    ),
                  ],
                  10,
                  _hoisted_1,
                )
              );
            }),
            128,
          )),
        ])),
        [[unref(so), [unref(userData).settings.sidebar, { animation: 150 }]]],
      );
    };
  },
});
export { _sfc_main as default };
