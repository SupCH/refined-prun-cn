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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUkVQLnZ1ZTIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvUkVQL1JFUC52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBOdW1iZXJJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvTnVtYmVySW5wdXQudnVlJztcbmltcG9ydCB7XG4gIGNhbGN1bGF0ZUJ1aWxkaW5nRW50cmllcyxcbiAgY2FsY3VsYXRlU2hpcEVudHJpZXMsXG4gIGdldFBhcmFtZXRlclNoaXBzLFxuICBnZXRQYXJhbWV0ZXJTaXRlcyxcbn0gZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvUkVQL2VudHJpZXMnO1xuaW1wb3J0IHsgdGltZXN0YW1wRWFjaE1pbnV0ZSB9IGZyb20gJ0BzcmMvdXRpbHMvZGF5anMnO1xuaW1wb3J0IHsgYmluYXJ5U2VhcmNoIH0gZnJvbSAnQHNyYy91dGlscy9iaW5hcnktc2VhcmNoJztcbmltcG9ydCBkYXlqcyBmcm9tICdkYXlqcyc7XG5pbXBvcnQgeyBmaXhlZDEsIHBlcmNlbnQxIH0gZnJvbSAnQHNyYy91dGlscy9mb3JtYXQnO1xuaW1wb3J0IE1hdGVyaWFsUHVyY2hhc2VUYWJsZSBmcm9tICdAc3JjL2NvbXBvbmVudHMvTWF0ZXJpYWxQdXJjaGFzZVRhYmxlLnZ1ZSc7XG5pbXBvcnQgTG9hZGluZ1NwaW5uZXIgZnJvbSAnQHNyYy9jb21wb25lbnRzL0xvYWRpbmdTcGlubmVyLnZ1ZSc7XG5pbXBvcnQgeyBjYWxjQnVpbGRpbmdDb25kaXRpb24gfSBmcm9tICdAc3JjL2NvcmUvYnVpbGRpbmdzJztcbmltcG9ydCB7IGRpZmZEYXlzIH0gZnJvbSAnQHNyYy91dGlscy90aW1lLWRpZmYnO1xuaW1wb3J0IHsgdXNlckRhdGEgfSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YSc7XG5pbXBvcnQgeyBtZXJnZU1hdGVyaWFsQW1vdW50cyB9IGZyb20gJ0BzcmMvY29yZS9zb3J0LW1hdGVyaWFscyc7XG5pbXBvcnQgQWN0aXZlIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9BY3RpdmUudnVlJztcbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgeyB1c2VYaXRQYXJhbWV0ZXJzIH0gZnJvbSAnQHNyYy9ob29rcy91c2UteGl0LXBhcmFtZXRlcnMnO1xuaW1wb3J0IFBydW5MaW5rIGZyb20gJ0BzcmMvY29tcG9uZW50cy9QcnVuTGluay52dWUnO1xuaW1wb3J0IHsgb2JqZWN0SWQgfSBmcm9tICdAc3JjL3V0aWxzL29iamVjdC1pZCc7XG5pbXBvcnQgUHJ1bkJ1dHRvbiBmcm9tICdAc3JjL2NvbXBvbmVudHMvUHJ1bkJ1dHRvbi52dWUnO1xuaW1wb3J0IFF1aWNrUHVyY2hhc2VEaWFsb2cgZnJvbSAnQHNyYy9mZWF0dXJlcy9YSVQvc2hhcmVkL1F1aWNrUHVyY2hhc2VEaWFsb2cudnVlJztcbmltcG9ydCB7IHNob3dUaWxlT3ZlcmxheSB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS90aWxlLW92ZXJsYXknO1xuXG5jb25zdCBwYXJhbWV0ZXJzID0gdXNlWGl0UGFyYW1ldGVycygpO1xuXG5jb25zdCBzaXRlcyA9IGNvbXB1dGVkKCgpID0+IGdldFBhcmFtZXRlclNpdGVzKHBhcmFtZXRlcnMpKTtcbmNvbnN0IHNoaXBzID0gY29tcHV0ZWQoKCkgPT4gZ2V0UGFyYW1ldGVyU2hpcHMocGFyYW1ldGVycykpO1xuXG5jb25zdCBpc011bHRpVGFyZ2V0ID0gY29tcHV0ZWQoXG4gICgpID0+IChzaXRlcy52YWx1ZT8ubGVuZ3RoID8/IDApID4gMSB8fCAoc2hpcHMudmFsdWU/Lmxlbmd0aCA/PyAwKSA+IDAsXG4pO1xuXG5jb25zdCBidWlsZGluZ0VudHJpZXMgPSBjb21wdXRlZCgoKSA9PiBjYWxjdWxhdGVCdWlsZGluZ0VudHJpZXMoc2l0ZXMudmFsdWUpKTtcbmNvbnN0IHNoaXBFbnRyaWVzID0gY29tcHV0ZWQoKCkgPT4gY2FsY3VsYXRlU2hpcEVudHJpZXMoc2hpcHMudmFsdWUpKTtcblxuY29uc3QgbXNJbkFEYXkgPSBkYXlqcy5kdXJhdGlvbigxLCAnZGF5JykuYXNNaWxsaXNlY29uZHMoKTtcblxuY29uc3QgY3VycmVudFNwbGl0SW5kZXggPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmIChidWlsZGluZ0VudHJpZXMudmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cbiAgY29uc3Qgc2V0dGluZ3MgPSB1c2VyRGF0YS5zZXR0aW5ncy5yZXBhaXI7XG4gIGNvbnN0IGN1cnJlbnRTcGxpdERhdGUgPVxuICAgIHRpbWVzdGFtcEVhY2hNaW51dGUudmFsdWUgLSBzZXR0aW5ncy50aHJlc2hvbGQgKiBtc0luQURheSArIHNldHRpbmdzLm9mZnNldCAqIG1zSW5BRGF5O1xuICByZXR1cm4gYmluYXJ5U2VhcmNoKGN1cnJlbnRTcGxpdERhdGUsIGJ1aWxkaW5nRW50cmllcy52YWx1ZSwgeCA9PiB4Lmxhc3RSZXBhaXIpO1xufSk7XG5cbmNvbnN0IHZpc2libGVCdWlsZGluZ3MgPSBjb21wdXRlZCgoKSA9PiB7XG4gIHJldHVybiBidWlsZGluZ0VudHJpZXMudmFsdWU/LnNsaWNlKDAsIGN1cnJlbnRTcGxpdEluZGV4LnZhbHVlKTtcbn0pO1xuXG5jb25zdCB2aXNpYmxlU2hpcHMgPSBjb21wdXRlZCgoKSA9PiBzaGlwRW50cmllcy52YWx1ZT8uZmlsdGVyKHggPT4geC5jb25kaXRpb24gPD0gMC44NSkpO1xuXG5jb25zdCBtYXRlcmlhbHMgPSBjb21wdXRlZCgoKSA9PiB7XG4gIGlmICh2aXNpYmxlQnVpbGRpbmdzLnZhbHVlID09PSB1bmRlZmluZWQgfHwgdmlzaWJsZVNoaXBzLnZhbHVlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG4gIGNvbnN0IG1hdGVyaWFsczogUHJ1bkFwaS5NYXRlcmlhbEFtb3VudFtdID0gW107XG4gIGNvbnN0IHRpbWUgPSB0aW1lc3RhbXBFYWNoTWludXRlLnZhbHVlO1xuICBmb3IgKGNvbnN0IGJ1aWxkaW5nIG9mIHZpc2libGVCdWlsZGluZ3MudmFsdWUpIHtcbiAgICBjb25zdCBwbGFubmVkUmVwYWlyRGF0ZSA9XG4gICAgICAodGltZSAtIGJ1aWxkaW5nLmxhc3RSZXBhaXIpIC8gbXNJbkFEYXkgKyB1c2VyRGF0YS5zZXR0aW5ncy5yZXBhaXIub2Zmc2V0O1xuICAgIGZvciAoY29uc3QgeyBtYXRlcmlhbCwgYW1vdW50IH0gb2YgYnVpbGRpbmcuZnVsbE1hdGVyaWFscykge1xuICAgICAgbWF0ZXJpYWxzLnB1c2goe1xuICAgICAgICBtYXRlcmlhbCxcbiAgICAgICAgYW1vdW50OiBNYXRoLmNlaWwoYW1vdW50ICogKDEgLSBjYWxjQnVpbGRpbmdDb25kaXRpb24ocGxhbm5lZFJlcGFpckRhdGUpKSksXG4gICAgICB9KTtcbiAgICB9XG4gIH1cbiAgbWF0ZXJpYWxzLnB1c2goLi4udmlzaWJsZVNoaXBzLnZhbHVlLmZsYXRNYXAoeCA9PiB4Lm1hdGVyaWFscykpO1xuICByZXR1cm4gbWVyZ2VNYXRlcmlhbEFtb3VudHMobWF0ZXJpYWxzKTtcbn0pO1xuXG5mdW5jdGlvbiBjYWxjdWxhdGVBZ2UobGFzdFJlcGFpcjogbnVtYmVyKSB7XG4gIHJldHVybiBkaWZmRGF5cyhsYXN0UmVwYWlyLCB0aW1lc3RhbXBFYWNoTWludXRlLnZhbHVlLCB0cnVlKTtcbn1cblxuY29uc3QgcmVwYWlyTWF0ZXJpYWxzUmVjb3JkID0gY29tcHV0ZWQoKCkgPT4ge1xuICBpZiAoIW1hdGVyaWFscy52YWx1ZSkge1xuICAgIHJldHVybiB7fTtcbiAgfVxuXG4gIGNvbnN0IHJlY29yZDogUmVjb3JkPHN0cmluZywgbnVtYmVyPiA9IHt9O1xuICBmb3IgKGNvbnN0IG1hdCBvZiBtYXRlcmlhbHMudmFsdWUpIHtcbiAgICByZWNvcmRbbWF0Lm1hdGVyaWFsLnRpY2tlcl0gPSBtYXQuYW1vdW50O1xuICB9XG4gIHJldHVybiByZWNvcmQ7XG59KTtcblxuZnVuY3Rpb24gb25RdWlja1B1cmNoYXNlQ2xpY2soZXY6IEV2ZW50KSB7XG4gIGlmIChPYmplY3Qua2V5cyhyZXBhaXJNYXRlcmlhbHNSZWNvcmQudmFsdWUpLmxlbmd0aCA9PT0gMCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIHNob3dUaWxlT3ZlcmxheShldiwgUXVpY2tQdXJjaGFzZURpYWxvZywge1xuICAgIG1hdGVyaWFsczogcmVwYWlyTWF0ZXJpYWxzUmVjb3JkLnZhbHVlLFxuICAgIHBhY2thZ2VOYW1lUHJlZml4OiAnUkVQIFF1aWNrIFB1cmNoYXNlJyxcbiAgfSk7XG59XG48L3NjcmlwdD5cblxuPHRlbXBsYXRlPlxuICA8TG9hZGluZ1NwaW5uZXIgdi1pZj1cIm1hdGVyaWFscyA9PT0gdW5kZWZpbmVkXCIgLz5cbiAgPHRlbXBsYXRlIHYtZWxzZT5cbiAgICA8Zm9ybT5cbiAgICAgIDxBY3RpdmUgOmxhYmVsPVwidCgncmVwLmFnZVRocmVzaG9sZCcpXCI+XG4gICAgICAgIDxOdW1iZXJJbnB1dCB2LW1vZGVsPVwidXNlckRhdGEuc2V0dGluZ3MucmVwYWlyLnRocmVzaG9sZFwiIC8+XG4gICAgICA8L0FjdGl2ZT5cbiAgICAgIDxBY3RpdmUgOmxhYmVsPVwidCgncmVwLnRpbWVPZmZzZXQnKVwiPlxuICAgICAgICA8TnVtYmVySW5wdXQgdi1tb2RlbD1cInVzZXJEYXRhLnNldHRpbmdzLnJlcGFpci5vZmZzZXRcIiAvPlxuICAgICAgPC9BY3RpdmU+XG4gICAgPC9mb3JtPlxuICAgIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ3JlcC5zaG9wcGluZ0NhcnQnKSB9fTwvU2VjdGlvbkhlYWRlcj5cbiAgICA8ZGl2IDpjbGFzcz1cIiRzdHlsZS5xdWlja1B1cmNoYXNlQmFyXCI+XG4gICAgICA8UHJ1bkJ1dHRvblxuICAgICAgICBwcmltYXJ5XG4gICAgICAgIDpkaXNhYmxlZD1cIk9iamVjdC5rZXlzKHJlcGFpck1hdGVyaWFsc1JlY29yZCkubGVuZ3RoID09PSAwXCJcbiAgICAgICAgQGNsaWNrPVwib25RdWlja1B1cmNoYXNlQ2xpY2tcIj5cbiAgICAgICAge3sgdCgncmVwLnF1aWNrUHVyY2hhc2UnKSB9fVxuICAgICAgPC9QcnVuQnV0dG9uPlxuICAgIDwvZGl2PlxuICAgIDxNYXRlcmlhbFB1cmNoYXNlVGFibGVcbiAgICAgIDpjb2xsYXBzaWJsZT1cImlzTXVsdGlUYXJnZXRcIlxuICAgICAgOmNvbGxhcHNlZC1ieS1kZWZhdWx0PVwidHJ1ZVwiXG4gICAgICA6bWF0ZXJpYWxzPVwibWF0ZXJpYWxzXCIgLz5cbiAgICA8U2VjdGlvbkhlYWRlcj57eyB0KCdyZXAuYnVpbGRpbmdzJykgfX08L1NlY3Rpb25IZWFkZXI+XG4gICAgPHRhYmxlPlxuICAgICAgPHRoZWFkPlxuICAgICAgICA8dHI+XG4gICAgICAgICAgPHRoPnt7IHQoJ3JlcC50aWNrZXInKSB9fTwvdGg+XG4gICAgICAgICAgPHRoIHYtaWY9XCJpc011bHRpVGFyZ2V0XCI+e3sgdCgncmVwLnRhcmdldCcpIH19PC90aD5cbiAgICAgICAgICA8dGg+e3sgdCgncmVwLmFnZURheXMnKSB9fTwvdGg+XG4gICAgICAgICAgPHRoPnt7IHQoJ3JlcC5jb25kaXRpb24nKSB9fTwvdGg+XG4gICAgICAgIDwvdHI+XG4gICAgICA8L3RoZWFkPlxuICAgICAgPHRib2R5PlxuICAgICAgICA8dHIgdi1mb3I9XCJlbnRyeSBpbiB2aXNpYmxlQnVpbGRpbmdzXCIgOmtleT1cIm9iamVjdElkKGVudHJ5KVwiPlxuICAgICAgICAgIDx0ZD57eyBlbnRyeS50aWNrZXIgfX08L3RkPlxuICAgICAgICAgIDx0ZCB2LWlmPVwiaXNNdWx0aVRhcmdldFwiPlxuICAgICAgICAgICAgPFBydW5MaW5rIDpjb21tYW5kPVwiYFhJVCBSRVAgJHtlbnRyeS5uYXR1cmFsSWR9YFwiPnt7IGVudHJ5LnRhcmdldCB9fTwvUHJ1bkxpbms+XG4gICAgICAgICAgPC90ZD5cbiAgICAgICAgICA8dGQ+e3sgZml4ZWQxKGNhbGN1bGF0ZUFnZShlbnRyeS5sYXN0UmVwYWlyKSkgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBwZXJjZW50MShlbnRyeS5jb25kaXRpb24pIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgICAgPHRyIHYtZm9yPVwiZW50cnkgaW4gdmlzaWJsZVNoaXBzXCIgOmtleT1cIm9iamVjdElkKGVudHJ5KVwiPlxuICAgICAgICAgIDx0ZD57eyB0KCdyZXAuc2hpcCcpIH19PC90ZD5cbiAgICAgICAgICA8dGQ+e3sgZW50cnkudGFyZ2V0IH19PC90ZD5cbiAgICAgICAgICA8dGQ+e3sgZml4ZWQxKGNhbGN1bGF0ZUFnZShlbnRyeS5sYXN0UmVwYWlyKSkgfX08L3RkPlxuICAgICAgICAgIDx0ZD57eyBwZXJjZW50MShlbnRyeS5jb25kaXRpb24pIH19PC90ZD5cbiAgICAgICAgPC90cj5cbiAgICAgIDwvdGJvZHk+XG4gICAgPC90YWJsZT5cbiAgPC90ZW1wbGF0ZT5cbjwvdGVtcGxhdGU+XG5cbjxzdHlsZSBtb2R1bGU+XG4ucXVpY2tQdXJjaGFzZUJhciB7XG4gIG1hcmdpbjogOHB4IDA7XG4gIGRpc3BsYXk6IGZsZXg7XG4gIGp1c3RpZnktY29udGVudDogZmxleC1lbmQ7XG59XG48L3N0eWxlPlxuIl0sIm5hbWVzIjpbIl91bnJlZiIsIl9vcGVuQmxvY2siLCJfY3JlYXRlQmxvY2siLCJfY3JlYXRlRWxlbWVudEJsb2NrIiwiX0ZyYWdtZW50IiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVWTm9kZSIsIkFjdGl2ZSIsInQiLCJOdW1iZXJJbnB1dCIsIl93aXRoQ3R4IiwiX2NyZWF0ZVRleHRWTm9kZSIsIl90b0Rpc3BsYXlTdHJpbmciLCJfbm9ybWFsaXplQ2xhc3MiLCJfcmVuZGVyTGlzdCJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUEyQkEsVUFBQSxhQUFBLGlCQUFBO0FBRUEsVUFBQSxRQUFBLFNBQUEsTUFBQSxrQkFBQSxV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
