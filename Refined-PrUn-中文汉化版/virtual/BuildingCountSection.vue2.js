import { C } from './prun-css.js';
import { sitesStore } from './sites.js';
import BuildingIcon from './BuildingIcon.vue.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createBlock,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BuildingCountSection',
  props: {
    naturalId: {},
  },
  setup(__props) {
    const buildings = computed(() => {
      const totals = /* @__PURE__ */ new Map();
      const buildings2 = sitesStore.getByPlanetNaturalId(__props.naturalId)?.platforms ?? [];
      for (const building of buildings2) {
        const ticker = building.module.reactorTicker;
        totals.set(ticker, (totals.get(ticker) ?? 0) + 1);
      }
      const keys = [...totals.keys()];
      keys.sort();
      return keys.map(x => [x, totals.get(x)]);
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createBaseVNode(
              'h2',
              {
                class: normalizeClass([
                  ('C' in _ctx ? _ctx.C : unref(C)).Site.header,
                  ('C' in _ctx ? _ctx.C : unref(C)).ui.header2,
                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                ]),
              },
              'Buildings',
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(_ctx.$style.list),
              },
              [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(buildings), building => {
                    return (
                      openBlock(),
                      createBlock(
                        BuildingIcon,
                        {
                          key: building[0],
                          ticker: building[0],
                          amount: building[1],
                        },
                        null,
                        8,
                        ['ticker', 'amount'],
                      )
                    );
                  }),
                  128,
                )),
              ],
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
