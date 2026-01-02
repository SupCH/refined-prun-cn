import { t } from './index5.js';
import _sfc_main$1 from './NumberInput.vue.js';
import {
  getParameterSites,
  getParameterShips,
  calculateBuildingEntries,
  calculateShipEntries,
} from './entries.js';
import { timestampEachMinute } from './dayjs.js';
import { binarySearch } from './binary-search.js';
import dayjs from './dayjs.min.js';
import { fixed1, percent1 } from './format.js';
import MaterialPurchaseTable from './MaterialPurchaseTable.vue.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import { calcBuildingCondition } from './buildings.js';
import { diffDays } from './time-diff.js';
import { userData } from './user-data.js';
import { mergeMaterialAmounts } from './sort-materials.js';
import _sfc_main$2 from './Active.vue.js';
import SectionHeader from './SectionHeader.vue.js';
import { useXitParameters } from './use-xit-parameters.js';
import PrunLink from './PrunLink.vue.js';
import { objectId } from './object-id.js';
import _sfc_main$3 from './PrunButton.vue.js';
import QuickPurchaseDialog from './QuickPurchaseDialog.vue.js';
import { showTileOverlay } from './tile-overlay.js';
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
  createCommentVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 0 };
const _hoisted_2 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'REP',
  setup(__props) {
    const parameters = useXitParameters();
    const sites = computed(() => getParameterSites(parameters));
    const ships = computed(() => getParameterShips(parameters));
    const isMultiTarget = computed(
      () => (sites.value?.length ?? 0) > 1 || (ships.value?.length ?? 0) > 0,
    );
    const buildingEntries = computed(() => calculateBuildingEntries(sites.value));
    const shipEntries = computed(() => calculateShipEntries(ships.value));
    const msInADay = dayjs.duration(1, 'day').asMilliseconds();
    const currentSplitIndex = computed(() => {
      if (buildingEntries.value === void 0) {
        return void 0;
      }
      const settings = userData.settings.repair;
      const currentSplitDate =
        timestampEachMinute.value - settings.threshold * msInADay + settings.offset * msInADay;
      return binarySearch(currentSplitDate, buildingEntries.value, x => x.lastRepair);
    });
    const visibleBuildings = computed(() => {
      return buildingEntries.value?.slice(0, currentSplitIndex.value);
    });
    const visibleShips = computed(() => shipEntries.value?.filter(x => x.condition <= 0.85));
    const materials = computed(() => {
      if (visibleBuildings.value === void 0 || visibleShips.value === void 0) {
        return void 0;
      }
      const materials2 = [];
      const time = timestampEachMinute.value;
      for (const building of visibleBuildings.value) {
        const plannedRepairDate =
          (time - building.lastRepair) / msInADay + userData.settings.repair.offset;
        for (const { material, amount } of building.fullMaterials) {
          materials2.push({
            material,
            amount: Math.ceil(amount * (1 - calcBuildingCondition(plannedRepairDate))),
          });
        }
      }
      materials2.push(...visibleShips.value.flatMap(x => x.materials));
      return mergeMaterialAmounts(materials2);
    });
    function calculateAge(lastRepair) {
      return diffDays(lastRepair, timestampEachMinute.value, true);
    }
    const repairMaterialsRecord = computed(() => {
      if (!materials.value) {
        return {};
      }
      const record = {};
      for (const mat of materials.value) {
        record[mat.material.ticker] = mat.amount;
      }
      return record;
    });
    function onQuickPurchaseClick(ev) {
      if (Object.keys(repairMaterialsRecord.value).length === 0) {
        return;
      }
      showTileOverlay(ev, QuickPurchaseDialog, {
        materials: repairMaterialsRecord.value,
        packageNamePrefix: 'REP Quick Purchase',
      });
    }
    return (_ctx, _cache) => {
      return unref(materials) === void 0
        ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
        : (openBlock(),
          createElementBlock(
            Fragment,
            { key: 1 },
            [
              createBaseVNode('form', null, [
                createVNode(
                  _sfc_main$2,
                  {
                    label: ('t' in _ctx ? _ctx.t : unref(t))('rep.ageThreshold'),
                  },
                  {
                    default: withCtx(() => [
                      createVNode(
                        _sfc_main$1,
                        {
                          modelValue: unref(userData).settings.repair.threshold,
                          'onUpdate:modelValue':
                            _cache[0] ||
                            (_cache[0] = $event =>
                              (unref(userData).settings.repair.threshold = $event)),
                        },
                        null,
                        8,
                        ['modelValue'],
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ['label'],
                ),
                createVNode(
                  _sfc_main$2,
                  {
                    label: ('t' in _ctx ? _ctx.t : unref(t))('rep.timeOffset'),
                  },
                  {
                    default: withCtx(() => [
                      createVNode(
                        _sfc_main$1,
                        {
                          modelValue: unref(userData).settings.repair.offset,
                          'onUpdate:modelValue':
                            _cache[1] ||
                            (_cache[1] = $event =>
                              (unref(userData).settings.repair.offset = $event)),
                        },
                        null,
                        8,
                        ['modelValue'],
                      ),
                    ]),
                    _: 1,
                  },
                  8,
                  ['label'],
                ),
              ]),
              createVNode(SectionHeader, null, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.shoppingCart')),
                    1,
                  ),
                ]),
                _: 1,
              }),
              createBaseVNode(
                'div',
                {
                  class: normalizeClass(_ctx.$style.quickPurchaseBar),
                },
                [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      disabled: Object.keys(unref(repairMaterialsRecord)).length === 0,
                      onClick: onQuickPurchaseClick,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.quickPurchase')),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled'],
                  ),
                ],
                2,
              ),
              createVNode(
                MaterialPurchaseTable,
                {
                  collapsible: unref(isMultiTarget),
                  'collapsed-by-default': true,
                  materials: unref(materials),
                },
                null,
                8,
                ['collapsible', 'materials'],
              ),
              createVNode(SectionHeader, null, {
                default: withCtx(() => [
                  createTextVNode(
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.buildings')),
                    1,
                  ),
                ]),
                _: 1,
              }),
              createBaseVNode('table', null, [
                createBaseVNode('thead', null, [
                  createBaseVNode('tr', null, [
                    createBaseVNode(
                      'th',
                      null,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.ticker')),
                      1,
                    ),
                    unref(isMultiTarget)
                      ? (openBlock(),
                        createElementBlock(
                          'th',
                          _hoisted_1,
                          toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.target')),
                          1,
                        ))
                      : createCommentVNode('', true),
                    createBaseVNode(
                      'th',
                      null,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.ageDays')),
                      1,
                    ),
                    createBaseVNode(
                      'th',
                      null,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.condition')),
                      1,
                    ),
                  ]),
                ]),
                createBaseVNode('tbody', null, [
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(visibleBuildings), entry => {
                      return (
                        openBlock(),
                        createElementBlock(
                          'tr',
                          {
                            key: unref(objectId)(entry),
                          },
                          [
                            createBaseVNode('td', null, toDisplayString(entry.ticker), 1),
                            unref(isMultiTarget)
                              ? (openBlock(),
                                createElementBlock('td', _hoisted_2, [
                                  createVNode(
                                    PrunLink,
                                    {
                                      command: `XIT REP ${entry.naturalId}`,
                                    },
                                    {
                                      default: withCtx(() => [
                                        createTextVNode(toDisplayString(entry.target), 1),
                                      ]),
                                      _: 2,
                                    },
                                    1032,
                                    ['command'],
                                  ),
                                ]))
                              : createCommentVNode('', true),
                            createBaseVNode(
                              'td',
                              null,
                              toDisplayString(unref(fixed1)(calculateAge(entry.lastRepair))),
                              1,
                            ),
                            createBaseVNode(
                              'td',
                              null,
                              toDisplayString(unref(percent1)(entry.condition)),
                              1,
                            ),
                          ],
                        )
                      );
                    }),
                    128,
                  )),
                  (openBlock(true),
                  createElementBlock(
                    Fragment,
                    null,
                    renderList(unref(visibleShips), entry => {
                      return (
                        openBlock(),
                        createElementBlock(
                          'tr',
                          {
                            key: unref(objectId)(entry),
                          },
                          [
                            createBaseVNode(
                              'td',
                              null,
                              toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('rep.ship')),
                              1,
                            ),
                            createBaseVNode('td', null, toDisplayString(entry.target), 1),
                            createBaseVNode(
                              'td',
                              null,
                              toDisplayString(unref(fixed1)(calculateAge(entry.lastRepair))),
                              1,
                            ),
                            createBaseVNode(
                              'td',
                              null,
                              toDisplayString(unref(percent1)(entry.condition)),
                              1,
                            ),
                          ],
                        )
                      );
                    }),
                    128,
                  )),
                ]),
              ]),
            ],
            64,
          ));
    };
  },
});
export { _sfc_main as default };
