import { withKeys } from './runtime-dom.esm-bundler.js';
import { t } from './index13.js';
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
