import { t } from './index13.js';
import PrunLink from './PrunLink.vue.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'HELP',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('table', null, [
          createBaseVNode('thead', null, [
            createBaseVNode('tr', null, [
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.wantTo')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.command')),
                1,
              ),
            ]),
          ]),
          createBaseVNode('tbody', null, [
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.changeSettings')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.changeFeatureSet')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET FEAT' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.disableFeature')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET FEAT' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.findCommands')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT CMDS' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.importPmmg')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT SET PMMG' })]),
            ]),
            createBaseVNode('tr', null, [
              createBaseVNode(
                'td',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('help.corgiGif')),
                1,
              ),
              createBaseVNode('td', null, [createVNode(PrunLink, { command: 'XIT GIF CORGI' })]),
            ]),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
