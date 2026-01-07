import { C } from './prun-css.js';
import _sfc_main$1 from './RadioItem.vue.js';
import { getPlanetBurn } from './burn2.js';
import { comparePlanets } from './util.js';
import _sfc_main$4 from './BurnSection.vue.js';
import { useTileState } from './tile-state5.js';
import _sfc_main$3 from './Tooltip.vue.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import MaterialRow from './MaterialRow.vue.js';
import { materialsStore } from './materials.js';
import { useXitParameters } from './use-xit-parameters.js';
import { sitesStore } from './sites.js';
import { countDays } from './utils4.js';
import InlineFlex from './InlineFlex.vue.js';
import { findWithQuery } from './find-with-query.js';
import { convertToPlanetNaturalId } from './planet-natural-id.js';
import _sfc_main$2 from './PrunButton.vue.js';
import QuickPurchaseDialog from './QuickPurchaseDialog.vue.js';
import { showTileOverlay } from './tile-overlay.js';
import { userData } from './user-data.js';
import { t } from './index5.js';
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
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'BURN',
  setup(__props) {
    const parameters = useXitParameters();
    const overall = {};
    const queryResult = computed(() => {
      if (!sitesStore.all.value) {
        return void 0;
      }
      const allSites = sitesStore.all.value;
      if (parameters.length === 0) {
        return {
          sites: allSites,
          includeOverall: true,
          overallOnly: false,
        };
      }
      const result = findWithQuery(parameters, findSites);
      let matches = result.include;
      if (result.includeAll) {
        matches = allSites;
      }
      if (result.excludeAll) {
        matches = [];
      }
      matches = matches.filter(x => !result.exclude.has(x));
      const nonOverallMatches = matches.filter(x => x !== overall);
      const overallIncluded =
        nonOverallMatches.length > 1 ||
        matches.length !== nonOverallMatches.length ||
        result.includeAll;
      const overallExcluded = result.exclude.has(overall) || result.excludeAll;
      let includeOverall = overallIncluded && !overallExcluded;
      let overallOnly = false;
      let overallOnlySites = allSites;
      if (matches.length === 1 && matches[0] === overall && !overallExcluded) {
        overallOnlySites = allSites.filter(x => !result.exclude.has(x));
        includeOverall = true;
        overallOnly = true;
      }
      return {
        sites: overallOnly ? overallOnlySites : nonOverallMatches,
        includeOverall,
        overallOnly,
      };
    });
    function findSites(term, parts) {
      if (term === 'all') {
        return sitesStore.all.value;
      }
      if (term === 'overall') {
        return overall;
      }
      const naturalId = convertToPlanetNaturalId(term, parts);
      return sitesStore.getByPlanetNaturalId(naturalId);
    }
    const planetBurn = computed(() => {
      if (queryResult.value === void 0) {
        return void 0;
      }
      const filtered = queryResult.value.sites
        .filter(x => x !== overall)
        .map(getPlanetBurn)
        .filter(x => x !== void 0);
      if (filtered.length <= 1) {
        return filtered;
      }
      filtered.sort((a, b) => {
        const daysA = countDays(a.burn);
        const daysB = countDays(b.burn);
        if (daysA !== daysB) {
          return daysA - daysB;
        }
        return comparePlanets(a.naturalId, b.naturalId);
      });
      const overallBurn = {};
      for (const burn of filtered) {
        for (const mat of Object.keys(burn.burn)) {
          if (overallBurn[mat]) {
            overallBurn[mat].dailyAmount += burn.burn[mat].dailyAmount;
            overallBurn[mat].inventory += burn.burn[mat].inventory;
          } else {
            overallBurn[mat] = {};
            overallBurn[mat].dailyAmount = burn.burn[mat].dailyAmount;
            overallBurn[mat].inventory = burn.burn[mat].inventory;
          }
        }
      }
      for (const mat of Object.keys(overallBurn)) {
        if (overallBurn[mat].dailyAmount >= 0) {
          overallBurn[mat].daysLeft = 1e3;
        } else {
          overallBurn[mat].daysLeft = -overallBurn[mat].inventory / overallBurn[mat].dailyAmount;
        }
      }
      const overallSection = {
        burn: overallBurn,
        planetName: t('burn.overall'),
        naturalId: '',
        storeId: '',
      };
      if (queryResult.value.overallOnly) {
        return [overallSection];
      }
      if (queryResult.value.includeOverall) {
        filtered.push(overallSection);
      }
      return filtered;
    });
    const red = useTileState('red');
    const yellow = useTileState('yellow');
    const green = useTileState('green');
    const inf = useTileState('inf');
    const fakeBurn = {
      dailyAmount: -1e5,
      daysLeft: 10,
      inventory: 1e5,
      type: 'input',
      input: 1e5,
      output: 0,
      workforce: 0,
    };
    const rat = materialsStore.getByTicker('RAT');
    const expand = useTileState('expand');
    const anyExpanded = computed(() => expand.value.length > 0);
    function onExpandAllClick() {
      if (expand.value.length > 0) {
        expand.value = [];
      } else {
        expand.value = planetBurn.value?.map(x => x.naturalId) ?? [];
      }
    }
    const materialsNeedingResupply = computed(() => {
      if (!planetBurn.value) {
        return {};
      }
      const resupplyDays = userData.settings.burn.resupply;
      const materials = {};
      for (const burn of planetBurn.value) {
        for (const [ticker, burnData] of Object.entries(burn.burn)) {
          if (burnData.dailyAmount >= 0) {
            continue;
          }
          const need = Math.max(0, resupplyDays * -burnData.dailyAmount - burnData.inventory);
          if (need > 0) {
            materials[ticker] = (materials[ticker] || 0) + need;
          }
        }
      }
      return materials;
    });
    function onQuickPurchaseClick(ev) {
      if (!planetBurn.value || planetBurn.value.length === 0) {
        return;
      }
      showTileOverlay(ev, QuickPurchaseDialog, {
        rawBurnData: planetBurn.value,
        packageNamePrefix: 'BURN Quick Purchase',
      });
    }
    return (_ctx, _cache) => {
      return unref(planetBurn) === void 0
        ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
        : (openBlock(),
          createElementBlock(
            Fragment,
            { key: 1 },
            [
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ComExOrdersPanel.filter),
                },
                [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(red),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event => (isRef(red) ? (red.value = $event) : null)),
                      horizontal: '',
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('burn.red')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(yellow),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event => (isRef(yellow) ? (yellow.value = $event) : null)),
                      horizontal: '',
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('burn.yellow')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(green),
                      'onUpdate:modelValue':
                        _cache[2] ||
                        (_cache[2] = $event => (isRef(green) ? (green.value = $event) : null)),
                      horizontal: '',
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('burn.green')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(inf),
                      'onUpdate:modelValue':
                        _cache[3] ||
                        (_cache[3] = $event => (isRef(inf) ? (inf.value = $event) : null)),
                      horizontal: '',
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('burn.inf')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['modelValue'],
                  ),
                ],
                2,
              ),
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_ctx.$style.quickPurchaseBar),
                },
                [
                  createVNode(
                    _sfc_main$2,
                    {
                      primary: '',
                      disabled: Object.keys(unref(materialsNeedingResupply)).length === 0,
                      onClick: onQuickPurchaseClick,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(toDisplayString(unref(t)('burn.quickPurchase')), 1),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled'],
                  ),
                ],
                2,
              ),
              createBaseVNode('table', null, [
                createBaseVNode('thead', null, [
                  createBaseVNode('tr', null, [
                    unref(planetBurn).length > 1
                      ? (openBlock(),
                        createElementBlock(
                          'th',
                          {
                            key: 0,
                            class: normalizeClass(_ctx.$style.expand),
                            onClick: onExpandAllClick,
                          },
                          toDisplayString(unref(anyExpanded) ? '-' : '+'),
                          3,
                        ))
                      : (openBlock(), createElementBlock('th', _hoisted_1)),
                    createBaseVNode('th', null, toDisplayString(unref(t)('burn.inv')), 1),
                    createBaseVNode('th', null, [
                      createVNode(InlineFlex, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)('burn.burn')) + ' ', 1),
                          createVNode(
                            _sfc_main$3,
                            {
                              position: 'bottom',
                              tooltip: unref(t)('burn.burnTooltip'),
                            },
                            null,
                            8,
                            ['tooltip'],
                          ),
                        ]),
                        _: 1,
                      }),
                    ]),
                    createBaseVNode('th', null, [
                      createVNode(InlineFlex, null, {
                        default: withCtx(() => [
                          createTextVNode(toDisplayString(unref(t)('burn.need')) + ' ', 1),
                          createVNode(
                            _sfc_main$3,
                            {
                              position: 'bottom',
                              tooltip: unref(t)('burn.needTooltip'),
                            },
                            null,
                            8,
                            ['tooltip'],
                          ),
                        ]),
                        _: 1,
                      }),
                    ]),
                    createBaseVNode('th', null, toDisplayString(unref(t)('burn.days')), 1),
                    createBaseVNode('th', null, toDisplayString(unref(t)('burn.cmd')), 1),
                  ]),
                ]),
                createBaseVNode(
                  'tbody',
                  {
                    class: normalizeClass(_ctx.$style.fakeRow),
                  },
                  [
                    createVNode(
                      MaterialRow,
                      {
                        'always-visible': '',
                        burn: fakeBurn,
                        material: unref(rat),
                      },
                      null,
                      8,
                      ['material'],
                    ),
                  ],
                  2,
                ),
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(planetBurn), burn => {
                    return (
                      openBlock(),
                      createBlock(
                        _sfc_main$4,
                        {
                          key: burn.planetName,
                          'can-minimize': unref(planetBurn).length > 1,
                          burn,
                        },
                        null,
                        8,
                        ['can-minimize', 'burn'],
                      )
                    );
                  }),
                  128,
                )),
              ]),
            ],
            64,
          ));
    };
  },
});
export { _sfc_main as default };
