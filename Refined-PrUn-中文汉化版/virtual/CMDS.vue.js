import xit from './xit-registry.js';
import { t } from './index13.js';
import { castArray } from './cast-array.js';
import PrunLink from './PrunLink.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  Fragment,
  renderList,
  createVNode,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'CMDS',
  setup(__props) {
    const sorted = xit.registry.sort((a, b) => {
      const commandA = castArray(a.command)[0];
      const commandB = castArray(b.command)[0];
      return commandA.localeCompare(commandB);
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('table', null, [
          createBaseVNode('thead', null, [
            createBaseVNode('tr', null, [
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.command')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.description')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.mandatory')),
                1,
              ),
              createBaseVNode(
                'th',
                null,
                toDisplayString(('t' in _ctx ? _ctx.t : unref(t))('cmds.optional')),
                1,
              ),
            ]),
          ]),
          createBaseVNode('tbody', null, [
            (openBlock(true),
            createElementBlock(
              Fragment,
              null,
              renderList(unref(sorted), command => {
                return (
                  openBlock(),
                  createElementBlock(
                    'tr',
                    {
                      key: unref(objectId)(command),
                    },
                    [
                      createBaseVNode('td', null, [
                        createVNode(
                          PrunLink,
                          {
                            command: 'XIT ' + unref(castArray)(command.command)[0],
                            'auto-submit': !command.mandatoryParameters,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(
                                toDisplayString(unref(castArray)(command.command)[0]),
                                1,
                              ),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['command', 'auto-submit'],
                        ),
                      ]),
                      createBaseVNode(
                        'td',
                        null,
                        toDisplayString(
                          ('t' in _ctx ? _ctx.t : unref(t))(
                            'commands.' + unref(castArray)(command.command)[0],
                          ),
                        ),
                        1,
                      ),
                      createBaseVNode('td', null, toDisplayString(command.mandatoryParameters), 1),
                      createBaseVNode('td', null, toDisplayString(command.optionalParameters), 1),
                    ],
                  )
                );
              }),
              128,
            )),
          ]),
        ])
      );
    };
  },
});
export { _sfc_main as default };
