import _sfc_main$1 from './SortCriteria.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'InventorySortControls',
  props: {
    activeSort: {},
    onAddClick: { type: Function },
    onModeClick: { type: Function },
    reverse: { type: Boolean },
    sorting: {},
  },
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(_ctx.sorting, mode => {
                return (
                  openBlock(),
                  createBlock(
                    _sfc_main$1,
                    {
                      key: unref(objectId)(mode),
                      label: mode.label,
                      active: mode.label === _ctx.activeSort,
                      reverse: _ctx.reverse,
                      onClick: $event => _ctx.onModeClick(mode.label),
                    },
                    null,
                    8,
                    ['label', 'active', 'reverse', 'onClick'],
                  )
                );
              }),
              128,
            )),
            createVNode(
              _sfc_main$1,
              {
                label: '+',
                onClick: _ctx.onAddClick,
              },
              null,
              8,
              ['onClick'],
            ),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
