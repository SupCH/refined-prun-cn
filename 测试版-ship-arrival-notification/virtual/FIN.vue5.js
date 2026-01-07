import { withKeys } from './runtime-dom.esm-bundler.js';
import { t } from './index5.js';
import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$5 from './Tooltip.vue.js';
import _sfc_main$4 from './Commands.vue.js';
import _sfc_main$3 from './PrunButton.vue.js';
import { hhmm, ddmmyyyy, fixed0 } from './format.js';
import { userData, clearBalanceHistory } from './user-data.js';
import { calcEquity } from './balance-sheet-summary.js';
import { showConfirmationOverlay } from './tile-overlay.js';
import {
  balanceHistory,
  collectFinDataPoint,
  canCollectFinDataPoint,
} from './user-data-balance.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { ref, unref, isRef } from './reactivity.esm-bundler.js';
import { toDisplayString, normalizeClass } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'FIN',
  setup(__props) {
    const sortedData = computed(() => balanceHistory.value.slice().reverse());
    function confirmDataPointDelete(ev, index) {
      index = balanceHistory.value.length - index - 1;
      showConfirmationOverlay(ev, () => deleteBalanceHistoryDataPoint(index), {
        message: t('fin_settings.confirmDelete'),
      });
    }
    function deleteBalanceHistoryDataPoint(index) {
      const history = userData.balanceHistory;
      if (index < history.v1.length) {
        history.v1.splice(index, 1);
      } else {
        history.v2.splice(index - history.v1.length, 1);
      }
    }
    function confirmAllDataDelete(ev) {
      showConfirmationOverlay(ev, clearBalanceHistory, {
        message: t('fin_settings.confirmClearAll'),
      });
    }
    function formatValue(number) {
      return number !== void 0 ? fixed0(number) : '--';
    }
    const mmMaterials = ref(userData.settings.financial.mmMaterials);
    function onMMMaterialsSubmit() {
      const formatted = (mmMaterials.value ?? '').replaceAll(' ', '').toUpperCase();
      userData.settings.financial.mmMaterials = formatted;
      mmMaterials.value = formatted;
    }
    const ignoredMaterials = ref(userData.settings.financial.ignoredMaterials);
    function onIgnoredMaterialsSubmit() {
      const formatted = (ignoredMaterials.value ?? '').replaceAll(' ', '').toUpperCase();
      userData.settings.financial.ignoredMaterials = formatted;
      ignoredMaterials.value = formatted;
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin_settings.priceSettings')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createVNode(
              _sfc_main$2,
              {
                label: ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.mmMaterials'),
                tooltip: ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.mmMaterialsTooltip'),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(mmMaterials),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event =>
                          isRef(mmMaterials) ? (mmMaterials.value = $event) : null),
                      onKeyup: withKeys(onMMMaterialsSubmit, ['enter']),
                      onFocusout: onMMMaterialsSubmit,
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label', 'tooltip'],
            ),
            createVNode(
              _sfc_main$2,
              {
                label: ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.ignoredMaterials'),
                tooltip: ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.ignoredMaterialsTooltip'),
              },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(ignoredMaterials),
                      'onUpdate:modelValue':
                        _cache[1] ||
                        (_cache[1] = $event =>
                          isRef(ignoredMaterials) ? (ignoredMaterials.value = $event) : null),
                      onKeyup: withKeys(onIgnoredMaterialsSubmit, ['enter']),
                      onFocusout: onIgnoredMaterialsSubmit,
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
              8,
              ['label', 'tooltip'],
            ),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin_settings.collectedData')),
                  1,
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      primary: '',
                      disabled: !unref(canCollectFinDataPoint)(),
                      onClick: unref(collectFinDataPoint),
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(
                            ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.collectData'),
                          ),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                    8,
                    ['disabled', 'onClick'],
                  ),
                ]),
                _: 1,
              }),
            ]),
            createBaseVNode('table', null, [
              createBaseVNode('thead', null, [
                createBaseVNode('tr', null, [
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin_settings.date')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin_settings.equity')),
                    1,
                  ),
                  createBaseVNode(
                    'th',
                    null,
                    toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin_settings.command')),
                    1,
                  ),
                ]),
              ]),
              createBaseVNode('tbody', null, [
                (openBlock(true),
                createElementBlock(
                  Fragment,
                  null,
                  renderList(unref(sortedData), (balance, i) => {
                    return (
                      openBlock(),
                      createElementBlock(
                        'tr',
                        {
                          key: unref(objectId)(balance),
                        },
                        [
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(unref(hhmm)(balance.timestamp)) +
                              ' ' +
                              toDisplayString(unref(ddmmyyyy)(balance.timestamp)),
                            1,
                          ),
                          createBaseVNode(
                            'td',
                            null,
                            toDisplayString(formatValue(unref(calcEquity)(balance))),
                            1,
                          ),
                          createBaseVNode('td', null, [
                            createVNode(
                              _sfc_main$3,
                              {
                                dark: '',
                                inline: '',
                                onClick: $event => confirmDataPointDelete($event, i),
                              },
                              {
                                default: withCtx(() => [
                                  createTextVNode(
                                    toDisplayString(
                                      ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.delete'),
                                    ),
                                    1,
                                  ),
                                ]),
                                _: 2,
                              },
                              1032,
                              ['onClick'],
                            ),
                          ]),
                        ],
                      )
                    );
                  }),
                  128,
                )),
              ]),
            ]),
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('fin_settings.dangerZone')) +
                    ' ',
                  1,
                ),
                createVNode(
                  _sfc_main$5,
                  {
                    class: normalizeClass(_ctx.$style.tooltip),
                    tooltip: ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.clearData'),
                  },
                  null,
                  8,
                  ['class', 'tooltip'],
                ),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(_sfc_main$4, null, {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$3,
                    {
                      danger: '',
                      onClick: confirmAllDataDelete,
                    },
                    {
                      default: withCtx(() => [
                        createTextVNode(
                          toDisplayString(
                            ('t' in _ctx ? _ctx.t : unref(t))('fin_settings.clearData'),
                          ),
                          1,
                        ),
                      ]),
                      _: 1,
                    },
                  ),
                ]),
                _: 1,
              }),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiRklOLnZ1ZTUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9YSVQvU0VUL0ZJTi52dWUiXSwic291cmNlc0NvbnRlbnQiOlsiPHNjcmlwdCBzZXR1cCBsYW5nPVwidHNcIj5cbmltcG9ydCBTZWN0aW9uSGVhZGVyIGZyb20gJ0BzcmMvY29tcG9uZW50cy9TZWN0aW9uSGVhZGVyLnZ1ZSc7XG5pbXBvcnQgVG9vbHRpcCBmcm9tICdAc3JjL2NvbXBvbmVudHMvVG9vbHRpcC52dWUnO1xuaW1wb3J0IENvbW1hbmRzIGZyb20gJ0BzcmMvY29tcG9uZW50cy9mb3Jtcy9Db21tYW5kcy52dWUnO1xuaW1wb3J0IFBydW5CdXR0b24gZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5CdXR0b24udnVlJztcbmltcG9ydCB7IGZpeGVkMCwgaGhtbSwgZGRtbXl5eXkgfSBmcm9tICdAc3JjL3V0aWxzL2Zvcm1hdCc7XG5pbXBvcnQgeyBjbGVhckJhbGFuY2VIaXN0b3J5LCB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCB7IGNhbGNFcXVpdHkgfSBmcm9tICdAc3JjL2NvcmUvYmFsYW5jZS9iYWxhbmNlLXNoZWV0LXN1bW1hcnknO1xuaW1wb3J0IHsgc2hvd0NvbmZpcm1hdGlvbk92ZXJsYXkgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvdGlsZS1vdmVybGF5JztcbmltcG9ydCB7XG4gIGJhbGFuY2VIaXN0b3J5LFxuICBjYW5Db2xsZWN0RmluRGF0YVBvaW50LFxuICBjb2xsZWN0RmluRGF0YVBvaW50LFxufSBmcm9tICdAc3JjL3N0b3JlL3VzZXItZGF0YS1iYWxhbmNlJztcbmltcG9ydCBBY3RpdmUgZnJvbSAnQHNyYy9jb21wb25lbnRzL2Zvcm1zL0FjdGl2ZS52dWUnO1xuaW1wb3J0IFRleHRJbnB1dCBmcm9tICdAc3JjL2NvbXBvbmVudHMvZm9ybXMvVGV4dElucHV0LnZ1ZSc7XG5pbXBvcnQgeyBvYmplY3RJZCB9IGZyb20gJ0BzcmMvdXRpbHMvb2JqZWN0LWlkJztcblxuY29uc3Qgc29ydGVkRGF0YSA9IGNvbXB1dGVkKCgpID0+IGJhbGFuY2VIaXN0b3J5LnZhbHVlLnNsaWNlKCkucmV2ZXJzZSgpKTtcblxuZnVuY3Rpb24gY29uZmlybURhdGFQb2ludERlbGV0ZShldjogRXZlbnQsIGluZGV4OiBudW1iZXIpIHtcbiAgaW5kZXggPSBiYWxhbmNlSGlzdG9yeS52YWx1ZS5sZW5ndGggLSBpbmRleCAtIDE7XG4gIHNob3dDb25maXJtYXRpb25PdmVybGF5KGV2LCAoKSA9PiBkZWxldGVCYWxhbmNlSGlzdG9yeURhdGFQb2ludChpbmRleCksIHtcbiAgICBtZXNzYWdlOiB0KCdmaW5fc2V0dGluZ3MuY29uZmlybURlbGV0ZScpLFxuICB9KTtcbn1cblxuZnVuY3Rpb24gZGVsZXRlQmFsYW5jZUhpc3RvcnlEYXRhUG9pbnQoaW5kZXg6IG51bWJlcikge1xuICBjb25zdCBoaXN0b3J5ID0gdXNlckRhdGEuYmFsYW5jZUhpc3Rvcnk7XG4gIGlmIChpbmRleCA8IGhpc3RvcnkudjEubGVuZ3RoKSB7XG4gICAgaGlzdG9yeS52MS5zcGxpY2UoaW5kZXgsIDEpO1xuICB9IGVsc2Uge1xuICAgIGhpc3RvcnkudjIuc3BsaWNlKGluZGV4IC0gaGlzdG9yeS52MS5sZW5ndGgsIDEpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGNvbmZpcm1BbGxEYXRhRGVsZXRlKGV2OiBFdmVudCkge1xuICBzaG93Q29uZmlybWF0aW9uT3ZlcmxheShldiwgY2xlYXJCYWxhbmNlSGlzdG9yeSwge1xuICAgIG1lc3NhZ2U6IHQoJ2Zpbl9zZXR0aW5ncy5jb25maXJtQ2xlYXJBbGwnKSxcbiAgfSk7XG59XG5cbmZ1bmN0aW9uIGZvcm1hdFZhbHVlKG51bWJlcj86IG51bWJlcikge1xuICByZXR1cm4gbnVtYmVyICE9PSB1bmRlZmluZWQgPyBmaXhlZDAobnVtYmVyKSA6ICctLSc7XG59XG5cbmNvbnN0IG1tTWF0ZXJpYWxzID0gcmVmKHVzZXJEYXRhLnNldHRpbmdzLmZpbmFuY2lhbC5tbU1hdGVyaWFscyk7XG5cbmZ1bmN0aW9uIG9uTU1NYXRlcmlhbHNTdWJtaXQoKSB7XG4gIGNvbnN0IGZvcm1hdHRlZCA9IChtbU1hdGVyaWFscy52YWx1ZSA/PyAnJykucmVwbGFjZUFsbCgnICcsICcnKS50b1VwcGVyQ2FzZSgpO1xuICB1c2VyRGF0YS5zZXR0aW5ncy5maW5hbmNpYWwubW1NYXRlcmlhbHMgPSBmb3JtYXR0ZWQ7XG4gIG1tTWF0ZXJpYWxzLnZhbHVlID0gZm9ybWF0dGVkO1xufVxuXG5jb25zdCBpZ25vcmVkTWF0ZXJpYWxzID0gcmVmKHVzZXJEYXRhLnNldHRpbmdzLmZpbmFuY2lhbC5pZ25vcmVkTWF0ZXJpYWxzKTtcblxuZnVuY3Rpb24gb25JZ25vcmVkTWF0ZXJpYWxzU3VibWl0KCkge1xuICBjb25zdCBmb3JtYXR0ZWQgPSAoaWdub3JlZE1hdGVyaWFscy52YWx1ZSA/PyAnJykucmVwbGFjZUFsbCgnICcsICcnKS50b1VwcGVyQ2FzZSgpO1xuICB1c2VyRGF0YS5zZXR0aW5ncy5maW5hbmNpYWwuaWdub3JlZE1hdGVyaWFscyA9IGZvcm1hdHRlZDtcbiAgaWdub3JlZE1hdGVyaWFscy52YWx1ZSA9IGZvcm1hdHRlZDtcbn1cbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ2Zpbl9zZXR0aW5ncy5wcmljZVNldHRpbmdzJykgfX08L1NlY3Rpb25IZWFkZXI+XG4gIDxBY3RpdmUgOmxhYmVsPVwidCgnZmluX3NldHRpbmdzLm1tTWF0ZXJpYWxzJylcIiA6dG9vbHRpcD1cInQoJ2Zpbl9zZXR0aW5ncy5tbU1hdGVyaWFsc1Rvb2x0aXAnKVwiPlxuICAgIDxUZXh0SW5wdXRcbiAgICAgIHYtbW9kZWw9XCJtbU1hdGVyaWFsc1wiXG4gICAgICBAa2V5dXAuZW50ZXI9XCJvbk1NTWF0ZXJpYWxzU3VibWl0XCJcbiAgICAgIEBmb2N1c291dD1cIm9uTU1NYXRlcmlhbHNTdWJtaXRcIiAvPlxuICA8L0FjdGl2ZT5cbiAgPEFjdGl2ZVxuICAgIDpsYWJlbD1cInQoJ2Zpbl9zZXR0aW5ncy5pZ25vcmVkTWF0ZXJpYWxzJylcIlxuICAgIDp0b29sdGlwPVwidCgnZmluX3NldHRpbmdzLmlnbm9yZWRNYXRlcmlhbHNUb29sdGlwJylcIj5cbiAgICA8VGV4dElucHV0XG4gICAgICB2LW1vZGVsPVwiaWdub3JlZE1hdGVyaWFsc1wiXG4gICAgICBAa2V5dXAuZW50ZXI9XCJvbklnbm9yZWRNYXRlcmlhbHNTdWJtaXRcIlxuICAgICAgQGZvY3Vzb3V0PVwib25JZ25vcmVkTWF0ZXJpYWxzU3VibWl0XCIgLz5cbiAgPC9BY3RpdmU+XG4gIDxTZWN0aW9uSGVhZGVyPnt7IHQoJ2Zpbl9zZXR0aW5ncy5jb2xsZWN0ZWREYXRhJykgfX08L1NlY3Rpb25IZWFkZXI+XG4gIDxmb3JtPlxuICAgIDxDb21tYW5kcz5cbiAgICAgIDxQcnVuQnV0dG9uIHByaW1hcnkgOmRpc2FibGVkPVwiIWNhbkNvbGxlY3RGaW5EYXRhUG9pbnQoKVwiIEBjbGljaz1cImNvbGxlY3RGaW5EYXRhUG9pbnRcIj5cbiAgICAgICAge3sgdCgnZmluX3NldHRpbmdzLmNvbGxlY3REYXRhJykgfX1cbiAgICAgIDwvUHJ1bkJ1dHRvbj5cbiAgICA8L0NvbW1hbmRzPlxuICA8L2Zvcm0+XG4gIDx0YWJsZT5cbiAgICA8dGhlYWQ+XG4gICAgICA8dHI+XG4gICAgICAgIDx0aD57eyB0KCdmaW5fc2V0dGluZ3MuZGF0ZScpIH19PC90aD5cbiAgICAgICAgPHRoPnt7IHQoJ2Zpbl9zZXR0aW5ncy5lcXVpdHknKSB9fTwvdGg+XG4gICAgICAgIDx0aD57eyB0KCdmaW5fc2V0dGluZ3MuY29tbWFuZCcpIH19PC90aD5cbiAgICAgIDwvdHI+XG4gICAgPC90aGVhZD5cbiAgICA8dGJvZHk+XG4gICAgICA8dHIgdi1mb3I9XCIoYmFsYW5jZSwgaSkgaW4gc29ydGVkRGF0YVwiIDprZXk9XCJvYmplY3RJZChiYWxhbmNlKVwiPlxuICAgICAgICA8dGQ+e3sgaGhtbShiYWxhbmNlLnRpbWVzdGFtcCkgfX0ge3sgZGRtbXl5eXkoYmFsYW5jZS50aW1lc3RhbXApIH19PC90ZD5cbiAgICAgICAgPHRkPnt7IGZvcm1hdFZhbHVlKGNhbGNFcXVpdHkoYmFsYW5jZSkpIH19PC90ZD5cbiAgICAgICAgPHRkPlxuICAgICAgICAgIDxQcnVuQnV0dG9uIGRhcmsgaW5saW5lIEBjbGljaz1cImNvbmZpcm1EYXRhUG9pbnREZWxldGUoJGV2ZW50LCBpKVwiPnt7XG4gICAgICAgICAgICB0KCdmaW5fc2V0dGluZ3MuZGVsZXRlJylcbiAgICAgICAgICB9fTwvUHJ1bkJ1dHRvbj5cbiAgICAgICAgPC90ZD5cbiAgICAgIDwvdHI+XG4gICAgPC90Ym9keT5cbiAgPC90YWJsZT5cbiAgPFNlY3Rpb25IZWFkZXI+XG4gICAge3sgdCgnZmluX3NldHRpbmdzLmRhbmdlclpvbmUnKSB9fVxuICAgIDxUb29sdGlwIDpjbGFzcz1cIiRzdHlsZS50b29sdGlwXCIgOnRvb2x0aXA9XCJ0KCdmaW5fc2V0dGluZ3MuY2xlYXJEYXRhJylcIiAvPlxuICA8L1NlY3Rpb25IZWFkZXI+XG4gIDxmb3JtPlxuICAgIDxDb21tYW5kcz5cbiAgICAgIDxQcnVuQnV0dG9uIGRhbmdlciBAY2xpY2s9XCJjb25maXJtQWxsRGF0YURlbGV0ZVwiPnt7XG4gICAgICAgIHQoJ2Zpbl9zZXR0aW5ncy5jbGVhckRhdGEnKVxuICAgICAgfX08L1BydW5CdXR0b24+XG4gICAgPC9Db21tYW5kcz5cbiAgPC9mb3JtPlxuPC90ZW1wbGF0ZT5cblxuPHN0eWxlIG1vZHVsZT5cbi50b29sdGlwIHtcbiAgZmxvYXQ6IHJldmVydDtcbiAgZm9udC1zaXplOiAxMnB4O1xuICBtYXJnaW4tdG9wOiAtNHB4O1xufVxuPC9zdHlsZT5cbiJdLCJuYW1lcyI6WyJfd2l0aEN0eCIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIiwidCIsIl9jcmVhdGVWTm9kZSIsIlRleHRJbnB1dCIsIl91bnJlZiIsIl9pc1JlZiIsIl93aXRoS2V5cyIsIkNvbW1hbmRzIiwiUHJ1bkJ1dHRvbiIsIl9jcmVhdGVFbGVtZW50Vk5vZGUiLCJfb3BlbkJsb2NrIiwiX2NyZWF0ZUVsZW1lbnRCbG9jayIsIl9GcmFnbWVudCIsIl9yZW5kZXJMaXN0IiwiVG9vbHRpcCIsIl9ub3JtYWxpemVDbGFzcyJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7Ozs7Ozs7Ozs7Ozs7QUFrQkEsVUFBQSxhQUFBLFNBQUEsTUFBQSxlQUFBLE1BQUEsTUFBQSxFQUFBLFNBQUE7QUFFQSxhQUFBLHVCQUFBLElBQUEsT0FBQTtBQUNFLGNBQUEsZUFBQSxNQUFBLFNBQUEsUUFBQTtBQUNBLDhCQUFBLElBQUEsTUFBQSw4QkFBQSxLQUFBLEdBQUE7QUFBQSxRQUF3RSxTQUFBLEVBQUEsNEJBQUE7QUFBQSxNQUMvQixDQUFBO0FBQUEsSUFDeEM7QUFHSCxhQUFBLDhCQUFBLE9BQUE7QUFDRSxZQUFBLFVBQUEsU0FBQTtBQUNBLFVBQUEsUUFBQSxRQUFBLEdBQUEsUUFBQTtBQUNFLGdCQUFBLEdBQUEsT0FBQSxPQUFBLENBQUE7QUFBQSxNQUEwQixPQUFBO0FBRTFCLGdCQUFBLEdBQUEsT0FBQSxRQUFBLFFBQUEsR0FBQSxRQUFBLENBQUE7QUFBQSxNQUE4QztBQUFBLElBQ2hEO0FBR0YsYUFBQSxxQkFBQSxJQUFBO0FBQ0UsOEJBQUEsSUFBQSxxQkFBQTtBQUFBLFFBQWlELFNBQUEsRUFBQSw4QkFBQTtBQUFBLE1BQ04sQ0FBQTtBQUFBLElBQzFDO0FBR0gsYUFBQSxZQUFBLFFBQUE7QUFDRSxhQUFBLFdBQUEsU0FBQSxPQUFBLE1BQUEsSUFBQTtBQUFBLElBQStDO0FBR2pELFVBQUEsY0FBQSxJQUFBLFNBQUEsU0FBQSxVQUFBLFdBQUE7QUFFQSxhQUFBLHNCQUFBO0FBQ0UsWUFBQSxhQUFBLFlBQUEsU0FBQSxJQUFBLFdBQUEsS0FBQSxFQUFBLEVBQUEsWUFBQTtBQUNBLGVBQUEsU0FBQSxVQUFBLGNBQUE7QUFDQSxrQkFBQSxRQUFBO0FBQUEsSUFBb0I7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
