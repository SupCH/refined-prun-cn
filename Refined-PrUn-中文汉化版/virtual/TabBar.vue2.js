import { vShow } from './runtime-dom.esm-bundler.js';
import _sfc_main$1 from './HeadItem.vue.js';
import { screensStore } from './screens.js';
import { userData } from './user-data.js';
import { vDraggable as so } from './vue-draggable-plus.js';
import { syncState } from './sync.js';
import {
  defineComponent,
  watchEffect,
  computed,
  useTemplateRef,
  onMounted,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  withDirectives,
  Fragment,
  renderList,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = ['href'];
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TabBar',
  setup(__props) {
    watchEffect(syncState);
    const current = computed(() => screensStore.current.value);
    function getScreen(id) {
      return screensStore.getById(id);
    }
    const container = useTemplateRef('container');
    onMounted(() => {
      container.value?.addEventListener(
        'wheel',
        e => {
          e.preventDefault();
          container.value?.scrollBy({ left: e.deltaY, behavior: 'smooth' });
        },
        { passive: false },
      );
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.spacer),
              },
              null,
              2,
            ),
            withDirectives(
              (openBlock(),
              createElementBlock(
                'div',
                {
                  ref_key: 'container',
                  ref: container,
                  class: normalizeClass(_ctx.$style.container),
                },
                [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(userData).tabs.order, id => {
                      return withDirectives(
                        (openBlock(),
                        createElementBlock(
                          'a',
                          {
                            key: id,
                            href: `#screen=${id}`,
                            class: normalizeClass(_ctx.$style.item),
                          },
                          [
                            createVNode(
                              _sfc_main$1,
                              {
                                label: getScreen(id).name,
                                active: unref(current) === getScreen(id),
                              },
                              null,
                              8,
                              ['label', 'active'],
                            ),
                          ],
                          10,
                          _hoisted_1,
                        )),
                        [[vShow, !unref(userData).tabs.hidden.includes(id)]],
                      );
                    }),
                    128,
                  )),
                ],
                2,
              )),
              [[unref(so), [unref(userData).tabs.order, { animation: 150 }]]],
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.spacer),
              },
              null,
              2,
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
