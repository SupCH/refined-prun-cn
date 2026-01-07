import { t } from './index5.js';
import { selfCurrentConditions, selfNonCurrentConditions } from './contract-conditions.js';
import { contractsStore } from './contracts.js';
import LoadingSpinner from './LoadingSpinner.vue.js';
import _sfc_main$1 from './ConditionRow.vue.js';
import { isEmpty } from './is-empty.js';
import {
  defineComponent,
  computed,
  createBlock,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _hoisted_2 = { colspan: '3' };
const _hoisted_3 = { key: 0 };
const _hoisted_4 = { colspan: '3' };
const _hoisted_5 = { colspan: '3' };
const _hoisted_6 = { key: 0 };
const _hoisted_7 = { colspan: '3' };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CONTC',
  setup(__props) {
    const current = computed(() =>
      selfCurrentConditions.value.filter(x =>
        x.dependencies.every(x2 => x2.status === 'FULFILLED'),
      ),
    );
    const nonCurrent = computed(() =>
      selfNonCurrentConditions.value.filter(x =>
        x.dependencies.every(x2 => x2.status === 'FULFILLED'),
      ),
    );
    return (_ctx, _cache) => {
      return !unref(contractsStore).fetched
        ? (openBlock(), createBlock(LoadingSpinner, { key: 0 }))
        : (openBlock(),
          createElementBlock('table', _hoisted_1, [
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('conts.contract')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.deadline')),
                  1,
                ),
                createBaseVNode(
                  'th',
                  null,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.condition')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  _hoisted_2,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.currentConditions')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(current))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_3, [
                    createBaseVNode(
                      'td',
                      _hoisted_4,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.noPending')),
                      1,
                    ),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(current), x => {
                      return (
                        openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: x.condition.id,
                            contract: x.contract,
                            condition: x.condition,
                            deadline: x.deadline,
                          },
                          null,
                          8,
                          ['contract', 'condition', 'deadline'],
                        )
                      );
                    }),
                    128,
                  )),
            ]),
            createBaseVNode('thead', null, [
              createBaseVNode('tr', null, [
                createBaseVNode(
                  'th',
                  _hoisted_5,
                  toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.nonCurrentConditions')),
                  1,
                ),
              ]),
            ]),
            createBaseVNode('tbody', null, [
              unref(isEmpty)(unref(nonCurrent))
                ? (openBlock(),
                  createElementBlock('tr', _hoisted_6, [
                    createBaseVNode(
                      'td',
                      _hoisted_7,
                      toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('contc.noPending')),
                      1,
                    ),
                  ]))
                : (openBlock(true),
                  createElementBlock(
                    Fragment,
                    { key: 1 },
                    renderList(unref(nonCurrent), x => {
                      return (
                        openBlock(),
                        createBlock(
                          _sfc_main$1,
                          {
                            key: x.condition.id,
                            contract: x.contract,
                            condition: x.condition,
                            deadline: x.deadline,
                          },
                          null,
                          8,
                          ['contract', 'condition', 'deadline'],
                        )
                      );
                    }),
                    128,
                  )),
            ]),
          ]));
    };
  },
});
export { _sfc_main as default };
