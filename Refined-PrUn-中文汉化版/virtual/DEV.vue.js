import { prunStyleUpdated, C, mergedPrunStyles } from './prun-css.js';
import { downloadFile } from './util.js';
import DebugButton from './DevButton.vue.js';
import { userData } from './user-data.js';
import api from './js.cookie.js';
import { isRecordingPrunLog, prunLog } from './prun-api-listener.js';
import SectionHeader from './SectionHeader.vue.js';
import { relayUrl } from './relay.js';
import _sfc_main$2 from './Active.vue.js';
import _sfc_main$1 from './TextInput.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createVNode,
  createElementVNode as createBaseVNode,
  createBlock,
  withCtx,
  createTextVNode,
  createCommentVNode,
} from './runtime-core.esm-bundler.js';
import { ref, isRef, unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { style: { paddingTop: '4px' } };
const _hoisted_2 = { key: 0 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'DEV',
  setup(__props) {
    function logUserData() {
      console.log(userData);
    }
    const prunDebug = ref(api.get('pu-debug') === 'true');
    function switchPrunDebug() {
      api.set('pu-debug', (!prunDebug.value).toString());
      prunDebug.value = !prunDebug.value;
    }
    function recordPrunLog() {
      isRecordingPrunLog.value = true;
    }
    function stopRecordingPrunLog() {
      isRecordingPrunLog.value = false;
      downloadFile(prunLog.value, 'prun-log.json', true);
      prunLog.value = [];
    }
    function downloadCssDefinition() {
      let definition = `export {};
`;
      definition += `declare global {
`;
      definition += `  interface PrunCssClasses {
`;
      for (const key of Object.keys(C).sort()) {
        definition += `    ${key}: {
`;
        for (const childKey of Object.keys(C[key]).sort()) {
          definition += `      ${childKey}: string;
`;
        }
        definition += `    };
`;
      }
      definition += '  }\n';
      definition += '}\n';
      downloadFile(definition, 'prun-css.types.d.ts', false);
    }
    function downloadPrunStyles() {
      downloadFile(mergedPrunStyles, 'prun.css', false);
    }
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', _hoisted_1, [
          createVNode(SectionHeader, null, {
            default: withCtx(() => [
              ...(_cache[1] ||
                (_cache[1] = [
                  createTextVNode(
                    'Warning: Messing with these can lead to unexpected behavior',
                    -1,
                  ),
                ])),
            ]),
            _: 1,
          }),
          createBaseVNode('form', null, [
            createVNode(
              _sfc_main$2,
              { label: 'Relay' },
              {
                default: withCtx(() => [
                  createVNode(
                    _sfc_main$1,
                    {
                      modelValue: unref(relayUrl),
                      'onUpdate:modelValue':
                        _cache[0] ||
                        (_cache[0] = $event =>
                          isRef(relayUrl) ? (relayUrl.value = $event) : null),
                    },
                    null,
                    8,
                    ['modelValue'],
                  ),
                ]),
                _: 1,
              },
            ),
          ]),
          !unref(isRecordingPrunLog)
            ? (openBlock(),
              createBlock(
                DebugButton,
                {
                  key: 0,
                  onClick: recordPrunLog,
                },
                {
                  default: withCtx(() => [
                    ...(_cache[2] || (_cache[2] = [createTextVNode('Record PrUn Log', -1)])),
                  ]),
                  _: 1,
                },
              ))
            : (openBlock(),
              createBlock(
                DebugButton,
                {
                  key: 1,
                  onClick: stopRecordingPrunLog,
                },
                {
                  default: withCtx(() => [
                    ...(_cache[3] || (_cache[3] = [createTextVNode('Stop Recording', -1)])),
                  ]),
                  _: 1,
                },
              )),
          createVNode(
            DebugButton,
            { onClick: switchPrunDebug },
            {
              default: withCtx(() => [
                createTextVNode(
                  toDisplayString(unref(prunDebug) ? 'Disable' : 'Enable') + ' pu-debug ',
                  1,
                ),
              ]),
              _: 1,
            },
          ),
          createVNode(
            DebugButton,
            { onClick: logUserData },
            {
              default: withCtx(() => [
                ...(_cache[4] || (_cache[4] = [createTextVNode('Log User Data', -1)])),
              ]),
              _: 1,
            },
          ),
          createVNode(
            DebugButton,
            { onClick: downloadCssDefinition },
            {
              default: withCtx(() => [
                ...(_cache[5] || (_cache[5] = [createTextVNode('Export prun-css.types.d.ts', -1)])),
              ]),
              _: 1,
            },
          ),
          createVNode(
            DebugButton,
            { onClick: downloadPrunStyles },
            {
              default: withCtx(() => [
                _cache[6] || (_cache[6] = createTextVNode(' Export prun.css ', -1)),
                unref(prunStyleUpdated)
                  ? (openBlock(), createElementBlock('span', _hoisted_2, '(new!)'))
                  : createCommentVNode('', true),
              ]),
              _: 1,
            },
          ),
        ])
      );
    };
  },
});
export { _sfc_main as default };
