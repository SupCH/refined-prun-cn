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
import { countDays } from './utils5.js';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQlVSTi52dWUyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0JVUk4vQlVSTi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBSYWRpb0l0ZW0gZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL1JhZGlvSXRlbS52dWUnO1xuaW1wb3J0IHsgZ2V0UGxhbmV0QnVybiwgTWF0ZXJpYWxCdXJuIH0gZnJvbSAnQHNyYy9jb3JlL2J1cm4nO1xuaW1wb3J0IHsgY29tcGFyZVBsYW5ldHMgfSBmcm9tICdAc3JjL3V0aWwnO1xuaW1wb3J0IEJ1cm5TZWN0aW9uIGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0JVUk4vQnVyblNlY3Rpb24udnVlJztcbmltcG9ydCB7IHVzZVRpbGVTdGF0ZSB9IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0JVUk4vdGlsZS1zdGF0ZSc7XG5pbXBvcnQgVG9vbHRpcCBmcm9tICdAc3JjL2NvbXBvbmVudHMvVG9vbHRpcC52dWUnO1xuaW1wb3J0IExvYWRpbmdTcGlubmVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9Mb2FkaW5nU3Bpbm5lci52dWUnO1xuaW1wb3J0IE1hdGVyaWFsUm93IGZyb20gJ0BzcmMvZmVhdHVyZXMvWElUL0JVUk4vTWF0ZXJpYWxSb3cudnVlJztcbmltcG9ydCB7IG1hdGVyaWFsc1N0b3JlIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLWFwaS9kYXRhL21hdGVyaWFscyc7XG5pbXBvcnQgeyB1c2VYaXRQYXJhbWV0ZXJzIH0gZnJvbSAnQHNyYy9ob29rcy91c2UteGl0LXBhcmFtZXRlcnMnO1xuaW1wb3J0IHsgc2l0ZXNTdG9yZSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi1hcGkvZGF0YS9zaXRlcyc7XG5pbXBvcnQgeyBjb3VudERheXMgfSBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9CVVJOL3V0aWxzJztcbmltcG9ydCBJbmxpbmVGbGV4IGZyb20gJ0BzcmMvY29tcG9uZW50cy9JbmxpbmVGbGV4LnZ1ZSc7XG5pbXBvcnQgeyBmaW5kV2l0aFF1ZXJ5IH0gZnJvbSAnQHNyYy91dGlscy9maW5kLXdpdGgtcXVlcnknO1xuaW1wb3J0IHsgY29udmVydFRvUGxhbmV0TmF0dXJhbElkIH0gZnJvbSAnQHNyYy9jb3JlL3BsYW5ldC1uYXR1cmFsLWlkJztcbmltcG9ydCBQcnVuQnV0dG9uIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuQnV0dG9uLnZ1ZSc7XG5pbXBvcnQgUXVpY2tQdXJjaGFzZURpYWxvZyBmcm9tICdAc3JjL2ZlYXR1cmVzL1hJVC9zaGFyZWQvUXVpY2tQdXJjaGFzZURpYWxvZy52dWUnO1xuaW1wb3J0IHsgc2hvd1RpbGVPdmVybGF5IH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL3RpbGUtb3ZlcmxheSc7XG5pbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IHQgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL2kxOG4nO1xuXG5jb25zdCBwYXJhbWV0ZXJzID0gdXNlWGl0UGFyYW1ldGVycygpO1xuXG4vLyBGYWtlIHNpdGUgZm9yIG92ZXJhbGwgYnVybi5cbmNvbnN0IG92ZXJhbGw6IFBydW5BcGkuU2l0ZSA9IHt9IGFzIFBydW5BcGkuU2l0ZTtcblxuY29uc3QgcXVlcnlSZXN1bHQgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghc2l0ZXNTdG9yZS5hbGwudmFsdWUpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgYWxsU2l0ZXMgPSBzaXRlc1N0b3JlLmFsbC52YWx1ZTtcbiAgaWYgKHBhcmFtZXRlcnMubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHNpdGVzOiBhbGxTaXRlcyxcbiAgICAgIGluY2x1ZGVPdmVyYWxsOiB0cnVlLFxuICAgICAgb3ZlcmFsbE9ubHk6IGZhbHNlLFxuICAgIH07XG4gIH1cbiAgY29uc3QgcmVzdWx0ID0gZmluZFdpdGhRdWVyeShwYXJhbWV0ZXJzLCBmaW5kU2l0ZXMpO1xuICBsZXQgbWF0Y2hlcyA9IHJlc3VsdC5pbmNsdWRlO1xuICBpZiAocmVzdWx0LmluY2x1ZGVBbGwpIHtcbiAgICBtYXRjaGVzID0gYWxsU2l0ZXM7XG4gIH1cbiAgaWYgKHJlc3VsdC5leGNsdWRlQWxsKSB7XG4gICAgbWF0Y2hlcyA9IFtdO1xuICB9XG4gIG1hdGNoZXMgPSBtYXRjaGVzLmZpbHRlcih4ID0+ICFyZXN1bHQuZXhjbHVkZS5oYXMoeCkpO1xuICBjb25zdCBub25PdmVyYWxsTWF0Y2hlcyA9IG1hdGNoZXMuZmlsdGVyKHggPT4geCAhPT0gb3ZlcmFsbCk7XG4gIGNvbnN0IG92ZXJhbGxJbmNsdWRlZCA9XG4gICAgbm9uT3ZlcmFsbE1hdGNoZXMubGVuZ3RoID4gMSB8fFxuICAgIG1hdGNoZXMubGVuZ3RoICE9PSBub25PdmVyYWxsTWF0Y2hlcy5sZW5ndGggfHxcbiAgICByZXN1bHQuaW5jbHVkZUFsbDtcbiAgY29uc3Qgb3ZlcmFsbEV4Y2x1ZGVkID0gcmVzdWx0LmV4Y2x1ZGUuaGFzKG92ZXJhbGwpIHx8IHJlc3VsdC5leGNsdWRlQWxsO1xuXG4gIGxldCBpbmNsdWRlT3ZlcmFsbCA9IG92ZXJhbGxJbmNsdWRlZCAmJiAhb3ZlcmFsbEV4Y2x1ZGVkO1xuICBsZXQgb3ZlcmFsbE9ubHkgPSBmYWxzZTtcbiAgbGV0IG92ZXJhbGxPbmx5U2l0ZXMgPSBhbGxTaXRlcztcbiAgaWYgKG1hdGNoZXMubGVuZ3RoID09PSAxICYmIG1hdGNoZXNbMF0gPT09IG92ZXJhbGwgJiYgIW92ZXJhbGxFeGNsdWRlZCkge1xuICAgIC8vIGBYSVQgQlVSTiBPVkVSQUxMYCxcbiAgICBvdmVyYWxsT25seVNpdGVzID0gYWxsU2l0ZXMuZmlsdGVyKHggPT4gIXJlc3VsdC5leGNsdWRlLmhhcyh4KSk7XG4gICAgaW5jbHVkZU92ZXJhbGwgPSB0cnVlO1xuICAgIG92ZXJhbGxPbmx5ID0gdHJ1ZTtcbiAgfVxuXG4gIHJldHVybiB7XG4gICAgc2l0ZXM6IG92ZXJhbGxPbmx5ID8gb3ZlcmFsbE9ubHlTaXRlcyA6IG5vbk92ZXJhbGxNYXRjaGVzLFxuICAgIGluY2x1ZGVPdmVyYWxsLFxuICAgIG92ZXJhbGxPbmx5LFxuICB9O1xufSk7XG5cbmZ1bmN0aW9uIGZpbmRTaXRlcyh0ZXJtOiBzdHJpbmcsIHBhcnRzOiBzdHJpbmdbXSkge1xuICBpZiAodGVybSA9PT0gJ2FsbCcpIHtcbiAgICByZXR1cm4gc2l0ZXNTdG9yZS5hbGwudmFsdWU7XG4gIH1cblxuICBpZiAodGVybSA9PT0gJ292ZXJhbGwnKSB7XG4gICAgcmV0dXJuIG92ZXJhbGw7XG4gIH1cblxuICBjb25zdCBuYXR1cmFsSWQgPSBjb252ZXJ0VG9QbGFuZXROYXR1cmFsSWQodGVybSwgcGFydHMpO1xuICByZXR1cm4gc2l0ZXNTdG9yZS5nZXRCeVBsYW5ldE5hdHVyYWxJZChuYXR1cmFsSWQpO1xufVxuXG5jb25zdCBwbGFuZXRCdXJuID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAocXVlcnlSZXN1bHQudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBjb25zdCBmaWx0ZXJlZCA9IHF1ZXJ5UmVzdWx0LnZhbHVlLnNpdGVzXG4gICAgLmZpbHRlcih4ID0+IHggIT09IG92ZXJhbGwpXG4gICAgLm1hcChnZXRQbGFuZXRCdXJuKVxuICAgIC5maWx0ZXIoeCA9PiB4ICE9PSB1bmRlZmluZWQpO1xuICBpZiAoZmlsdGVyZWQubGVuZ3RoIDw9IDEpIHtcbiAgICByZXR1cm4gZmlsdGVyZWQ7XG4gIH1cblxuICBmaWx0ZXJlZC5zb3J0KChhLCBiKSA9PiB7XG4gICAgY29uc3QgZGF5c0EgPSBjb3VudERheXMoYS5idXJuKTtcbiAgICBjb25zdCBkYXlzQiA9IGNvdW50RGF5cyhiLmJ1cm4pO1xuICAgIGlmIChkYXlzQSAhPT0gZGF5c0IpIHtcbiAgICAgIHJldHVybiBkYXlzQSAtIGRheXNCO1xuICAgIH1cbiAgICByZXR1cm4gY29tcGFyZVBsYW5ldHMoYS5uYXR1cmFsSWQsIGIubmF0dXJhbElkKTtcbiAgfSk7XG5cbiAgY29uc3Qgb3ZlcmFsbEJ1cm4gPSB7fTtcbiAgZm9yIChjb25zdCBidXJuIG9mIGZpbHRlcmVkKSB7XG4gICAgZm9yIChjb25zdCBtYXQgb2YgT2JqZWN0LmtleXMoYnVybi5idXJuKSkge1xuICAgICAgaWYgKG92ZXJhbGxCdXJuW21hdF0pIHtcbiAgICAgICAgb3ZlcmFsbEJ1cm5bbWF0XS5kYWlseUFtb3VudCArPSBidXJuLmJ1cm5bbWF0XS5kYWlseUFtb3VudDtcbiAgICAgICAgb3ZlcmFsbEJ1cm5bbWF0XS5pbnZlbnRvcnkgKz0gYnVybi5idXJuW21hdF0uaW52ZW50b3J5O1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgb3ZlcmFsbEJ1cm5bbWF0XSA9IHt9O1xuICAgICAgICBvdmVyYWxsQnVyblttYXRdLmRhaWx5QW1vdW50ID0gYnVybi5idXJuW21hdF0uZGFpbHlBbW91bnQ7XG4gICAgICAgIG92ZXJhbGxCdXJuW21hdF0uaW52ZW50b3J5ID0gYnVybi5idXJuW21hdF0uaW52ZW50b3J5O1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIGZvciAoY29uc3QgbWF0IG9mIE9iamVjdC5rZXlzKG92ZXJhbGxCdXJuKSkge1xuICAgIGlmIChvdmVyYWxsQnVyblttYXRdLmRhaWx5QW1vdW50ID49IDApIHtcbiAgICAgIG92ZXJhbGxCdXJuW21hdF0uZGF5c0xlZnQgPSAxMDAwO1xuICAgIH0gZWxzZSB7XG4gICAgICBvdmVyYWxsQnVyblttYXRdLmRheXNMZWZ0ID0gLW92ZXJhbGxCdXJuW21hdF0uaW52ZW50b3J5IC8gb3ZlcmFsbEJ1cm5bbWF0XS5kYWlseUFtb3VudDtcbiAgICB9XG4gIH1cblxuICBjb25zdCBvdmVyYWxsU2VjdGlvbiA9IHtcbiAgICBidXJuOiBvdmVyYWxsQnVybixcbiAgICBwbGFuZXROYW1lOiB0KCdidXJuLm92ZXJhbGwnKSxcbiAgICBuYXR1cmFsSWQ6ICcnLFxuICAgIHN0b3JlSWQ6ICcnLFxuICB9O1xuICBpZiAocXVlcnlSZXN1bHQudmFsdWUub3ZlcmFsbE9ubHkpIHtcbiAgICByZXR1cm4gW292ZXJhbGxTZWN0aW9uXTtcbiAgfVxuXG4gIGlmIChxdWVyeVJlc3VsdC52YWx1ZS5pbmNsdWRlT3ZlcmFsbCkge1xuICAgIGZpbHRlcmVkLnB1c2gob3ZlcmFsbFNlY3Rpb24pO1xuICB9XG4gIHJldHVybiBmaWx0ZXJlZDtcbn0pO1xuXG5jb25zdCByZWQgPSB1c2VUaWxlU3RhdGUoJ3JlZCcpO1xuY29uc3QgeWVsbG93ID0gdXNlVGlsZVN0YXRlKCd5ZWxsb3cnKTtcbmNvbnN0IGdyZWVuID0gdXNlVGlsZVN0YXRlKCdncmVlbicpO1xuY29uc3QgaW5mID0gdXNlVGlsZVN0YXRlKCdpbmYnKTtcblxuY29uc3QgZmFrZUJ1cm46IE1hdGVyaWFsQnVybiA9IHtcbiAgZGFpbHlBbW91bnQ6IC0xMDAwMDAsXG4gIGRheXNMZWZ0OiAxMCxcbiAgaW52ZW50b3J5OiAxMDAwMDAsXG4gIHR5cGU6ICdpbnB1dCcsXG4gIGlucHV0OiAxMDAwMDAsXG4gIG91dHB1dDogMCxcbiAgd29ya2ZvcmNlOiAwLFxufTtcblxuY29uc3QgcmF0ID0gbWF0ZXJpYWxzU3RvcmUuZ2V0QnlUaWNrZXIoJ1JBVCcpITtcblxuY29uc3QgZXhwYW5kID0gdXNlVGlsZVN0YXRlKCdleHBhbmQnKTtcblxuY29uc3QgYW55RXhwYW5kZWQgPSBjb21wdXRlZCgoKSA9PiBleHBhbmQudmFsdWUubGVuZ3RoID4gMCk7XG5cbmZ1bmN0aW9uIG9uRXhwYW5kQWxsQ2xpY2soKSB7XG4gIGlmIChleHBhbmQudmFsdWUubGVuZ3RoID4gMCkge1xuICAgIGV4cGFuZC52YWx1ZSA9IFtdO1xuICB9IGVsc2Uge1xuICAgIGV4cGFuZC52YWx1ZSA9IHBsYW5ldEJ1cm4udmFsdWU/Lm1hcCh4ID0+IHgubmF0dXJhbElkKSA/PyBbXTtcbiAgfVxufVxuXG4vLyBDYWxjdWxhdGUgbWF0ZXJpYWxzIHRoYXQgbmVlZCByZXN1cHBseSBiYXNlZCBvbiBCVVJOIG5lZWRzXG5jb25zdCBtYXRlcmlhbHNOZWVkaW5nUmVzdXBwbHkgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICghcGxhbmV0QnVybi52YWx1ZSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGNvbnN0IHJlc3VwcGx5RGF5cyA9IHVzZXJEYXRhLnNldHRpbmdzLmJ1cm4ucmVzdXBwbHk7XG4gIGNvbnN0IG1hdGVyaWFsczogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuXG4gIGZvciAoY29uc3QgYnVybiBvZiBwbGFuZXRCdXJuLnZhbHVlKSB7XG4gICAgZm9yIChjb25zdCBbdGlja2VyLCBidXJuRGF0YV0gb2YgT2JqZWN0LmVudHJpZXMoYnVybi5idXJuKSkge1xuICAgICAgaWYgKGJ1cm5EYXRhLmRhaWx5QW1vdW50ID49IDApIHtcbiAgICAgICAgLy8gTWF0ZXJpYWwgaXMgYmVpbmcgcHJvZHVjZWQgb3Igbm90IGNvbnN1bWVkXG4gICAgICAgIGNvbnRpbnVlO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBuZWVkID0gTWF0aC5tYXgoMCwgcmVzdXBwbHlEYXlzICogLWJ1cm5EYXRhLmRhaWx5QW1vdW50IC0gYnVybkRhdGEuaW52ZW50b3J5KTtcbiAgICAgIGlmIChuZWVkID4gMCkge1xuICAgICAgICBtYXRlcmlhbHNbdGlja2VyXSA9IChtYXRlcmlhbHNbdGlja2VyXSB8fCAwKSArIG5lZWQ7XG4gICAgICB9XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIG1hdGVyaWFscztcbn0pO1xuXG5mdW5jdGlvbiBvblF1aWNrUHVyY2hhc2VDbGljayhldjogRXZlbnQpIHtcbiAgaWYgKCFwbGFuZXRCdXJuLnZhbHVlIHx8IHBsYW5ldEJ1cm4udmFsdWUubGVuZ3RoID09PSAwKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgc2hvd1RpbGVPdmVybGF5KGV2LCBRdWlja1B1cmNoYXNlRGlhbG9nLCB7XG4gICAgcmF3QnVybkRhdGE6IHBsYW5ldEJ1cm4udmFsdWUsXG4gICAgcGFja2FnZU5hbWVQcmVmaXg6ICdCVVJOIFF1aWNrIFB1cmNoYXNlJyxcbiAgfSk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8TG9hZGluZ1NwaW5uZXIgdi1pZj1cInBsYW5ldEJ1cm4gPT09IHVuZGVmaW5lZFwiIC8+XG4gIDx0ZW1wbGF0ZSB2LWVsc2U+XG4gICAgPGRpdiA6Y2xhc3M9XCJDLkNvbUV4T3JkZXJzUGFuZWwuZmlsdGVyXCI+XG4gICAgICA8UmFkaW9JdGVtIHYtbW9kZWw9XCJyZWRcIiBob3Jpem9udGFsPnt7IHQoJ2J1cm4ucmVkJykgfX08L1JhZGlvSXRlbT5cbiAgICAgIDxSYWRpb0l0ZW0gdi1tb2RlbD1cInllbGxvd1wiIGhvcml6b250YWw+e3sgdCgnYnVybi55ZWxsb3cnKSB9fTwvUmFkaW9JdGVtPlxuICAgICAgPFJhZGlvSXRlbSB2LW1vZGVsPVwiZ3JlZW5cIiBob3Jpem9udGFsPnt7IHQoJ2J1cm4uZ3JlZW4nKSB9fTwvUmFkaW9JdGVtPlxuICAgICAgPFJhZGlvSXRlbSB2LW1vZGVsPVwiaW5mXCIgaG9yaXpvbnRhbD57eyB0KCdidXJuLmluZicpIH19PC9SYWRpb0l0ZW0+XG4gICAgPC9kaXY+XG4gICAgPGRpdiA6Y2xhc3M9XCIkc3R5bGUucXVpY2tQdXJjaGFzZUJhclwiPlxuICAgICAgPFBydW5CdXR0b25cbiAgICAgICAgcHJpbWFyeVxuICAgICAgICA6ZGlzYWJsZWQ9XCJPYmplY3Qua2V5cyhtYXRlcmlhbHNOZWVkaW5nUmVzdXBwbHkpLmxlbmd0aCA9PT0gMFwiXG4gICAgICAgIEBjbGljaz1cIm9uUXVpY2tQdXJjaGFzZUNsaWNrXCI+XG4gICAgICAgIHt7IHQoJ2J1cm4ucXVpY2tQdXJjaGFzZScpIH19XG4gICAgICA8L1BydW5CdXR0b24+XG4gICAgPC9kaXY+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoIHYtaWY9XCJwbGFuZXRCdXJuLmxlbmd0aCA+IDFcIiA6Y2xhc3M9XCIkc3R5bGUuZXhwYW5kXCIgQGNsaWNrPVwib25FeHBhbmRBbGxDbGlja1wiPlxuICAgICAgICAgICAge3sgYW55RXhwYW5kZWQgPyAnLScgOiAnKycgfX1cbiAgICAgICAgICA8L3RoPlxuICAgICAgICAgIDx0aCB2LWVsc2UgLz5cbiAgICAgICAgICA8dGg+e3sgdCgnYnVybi5pbnYnKSB9fTwvdGg+XG4gICAgICAgICAgPHRoPlxuICAgICAgICAgICAgPElubGluZUZsZXg+XG4gICAgICAgICAgICAgIHt7IHQoJ2J1cm4uYnVybicpIH19XG4gICAgICAgICAgICAgIDxUb29sdGlwIHBvc2l0aW9uPVwiYm90dG9tXCIgOnRvb2x0aXA9XCJ0KCdidXJuLmJ1cm5Ub29sdGlwJylcIiAvPlxuICAgICAgICAgICAgPC9JbmxpbmVGbGV4PlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRoPlxuICAgICAgICAgICAgPElubGluZUZsZXg+XG4gICAgICAgICAgICAgIHt7IHQoJ2J1cm4ubmVlZCcpIH19XG4gICAgICAgICAgICAgIDxUb29sdGlwIHBvc2l0aW9uPVwiYm90dG9tXCIgOnRvb2x0aXA9XCJ0KCdidXJuLm5lZWRUb29sdGlwJylcIiAvPlxuICAgICAgICAgICAgPC9JbmxpbmVGbGV4PlxuICAgICAgICAgIDwvdGg+XG4gICAgICAgICAgPHRoPnt7IHQoJ2J1cm4uZGF5cycpIH19PC90aD5cbiAgICAgICAgICA8dGg+e3sgdCgnYnVybi5jbWQnKSB9fTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5IDpjbGFzcz1cIiRzdHlsZS5mYWtlUm93XCI+XG4gICAgICAgIDxNYXRlcmlhbFJvdyBhbHdheXMtdmlzaWJsZSA6YnVybj1cImZha2VCdXJuXCIgOm1hdGVyaWFsPVwicmF0XCIgLz5cbiAgICAgIDwvdGJvZHk+XG4gICAgICA8QnVyblNlY3Rpb25cbiAgICAgICAgdi1mb3I9XCJidXJuIGluIHBsYW5ldEJ1cm5cIlxuICAgICAgICA6a2V5PVwiYnVybi5wbGFuZXROYW1lXCJcbiAgICAgICAgOmNhbi1taW5pbWl6ZT1cInBsYW5ldEJ1cm4ubGVuZ3RoID4gMVwiXG4gICAgICAgIDpidXJuPVwiYnVyblwiIC8+XG4gICAgPC90YWJsZT5cbiAgPC90ZW1wbGF0ZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4uZmFrZVJvdyB7XG4gIHZpc2liaWxpdHk6IGNvbGxhcHNlO1xufVxuXG4uZXhwYW5kIHtcbiAgdGV4dC1hbGlnbjogY2VudGVyO1xuICBjdXJzb3I6IHBvaW50ZXI7XG4gIHVzZXItc2VsZWN0OiBub25lO1xuICBmb250LXNpemU6IDEycHg7XG4gIHBhZGRpbmctbGVmdDogMThweDtcbiAgZm9udC13ZWlnaHQ6IGJvbGQ7XG59XG5cbi5xdWlja1B1cmNoYXNlQmFyIHtcbiAgbWFyZ2luOiA4cHggMDtcbiAgZGlzcGxheTogZmxleDtcbiAganVzdGlmeS1jb250ZW50OiBmbGV4LWVuZDtcbn1cbjwvc3R5bGU+XG4iXSwibmFtZXMiOlsiX3VucmVmIiwiX29wZW5CbG9jayIsIl9jcmVhdGVCbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfY3JlYXRlRWxlbWVudFZOb2RlIiwiX25vcm1hbGl6ZUNsYXNzIiwiQyIsIl9pc1JlZiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZVZOb2RlIiwiX3dpdGhDdHgiLCJUb29sdGlwIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7O0FBc0JBLFVBQUEsYUFBQSxpQkFBQTtBQUdBLFVBQUEsVUFBQSxDQUFBO0FBRUEsVUFBQSxjQUFBLFNBQUEsTUFBQTtBQUNFLFVBQUEsQ0FBQSxXQUFBLElBQUEsT0FBQTtBQUNFLGVBQUE7QUFBQSxNQUFPO0FBR1QsWUFBQSxXQUFBLFdBQUEsSUFBQTtBQUNBLFVBQUEsV0FBQSxXQUFBLEdBQUE7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
