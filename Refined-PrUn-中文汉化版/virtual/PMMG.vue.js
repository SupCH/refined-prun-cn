import SectionHeader from './SectionHeader.vue.js';
import _sfc_main$1 from './PrunButton.vue.js';
import _sfc_main$2 from './Commands.vue.js';
import {
  importPmmgSettings,
  importPmmgFinancialHistory,
  importPmmgNotes,
  importPmmgActions,
  importPmmgCommandLists,
} from './pmmg-import.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  withCtx,
  createTextVNode,
  Fragment,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PMMG',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          Fragment,
          null,
          [
            createVNode(SectionHeader, null, {
              default: withCtx(() => [
                ...(_cache[0] || (_cache[0] = [createTextVNode('Import PMMG files', -1)])),
              ]),
              _: 1,
            }),
            createBaseVNode('form', null, [
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-settings.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgSettings),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[1] || (_cache[1] = [createTextVNode('Import Settings', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-finance.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgFinancialHistory),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[2] || (_cache[2] = [createTextVNode('Import Finances', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-notes.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgNotes),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[3] || (_cache[3] = [createTextVNode('Import Notes', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-action.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgActions),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[4] || (_cache[4] = [createTextVNode('Import Actions', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
              createVNode(
                _sfc_main$2,
                { label: 'pmmg-lists.json' },
                {
                  default: withCtx(() => [
                    createVNode(
                      _sfc_main$1,
                      {
                        primary: '',
                        onClick: unref(importPmmgCommandLists),
                      },
                      {
                        default: withCtx(() => [
                          ...(_cache[5] ||
                            (_cache[5] = [createTextVNode('Import Command Lists', -1)])),
                        ]),
                        _: 1,
                      },
                      8,
                      ['onClick'],
                    ),
                  ]),
                  _: 1,
                },
              ),
            ]),
          ],
          64,
        )
      );
    };
  },
});
export { _sfc_main as default };
