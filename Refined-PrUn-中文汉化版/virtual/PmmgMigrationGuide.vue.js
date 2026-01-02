import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { normalizeClass } from './shared.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
const _hoisted_1 = { style: { width: '100%', height: '100%', padding: '10px' } };
const _hoisted_2 = { style: { 'padding-inline': '15px', 'line-height': '1.5' } };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'PmmgMigrationGuide',
  setup(__props) {
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Window.window),
            style: { left: '100px', top: '100px', 'z-index': '999' },
          },
          [
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Window.header),
              },
              null,
              2,
            ),
            createBaseVNode(
              'div',
              {
                class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Window.body),
                style: {
                  position: 'relative',
                  'user-select': 'auto',
                  width: '400px',
                  height: '200px',
                  'box-sizing': 'border-box',
                  'flex-shrink': '0',
                },
              },
              [
                createBaseVNode(
                  'div',
                  {
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).Tile.tile),
                  },
                  [
                    createBaseVNode(
                      'div',
                      {
                        class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).TileFrame.frame),
                      },
                      [
                        createBaseVNode(
                          'div',
                          {
                            class: normalizeClass([
                              ('C' in _ctx ? _ctx.C : unref(C)).TileFrame.header,
                              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                              ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                            ]),
                            style: { cursor: 'default' },
                          },
                          [
                            createBaseVNode(
                              'div',
                              {
                                class: normalizeClass([
                                  ('C' in _ctx ? _ctx.C : unref(C)).TileFrame.title,
                                  ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontSmallHeaders,
                                ]),
                              },
                              ' REFINED PRUN MIGRATION GUIDE ',
                              2,
                            ),
                          ],
                          2,
                        ),
                        createBaseVNode(
                          'div',
                          {
                            class: normalizeClass([
                              ('C' in _ctx ? _ctx.C : unref(C)).TileFrame.body,
                              ('C' in _ctx ? _ctx.C : unref(C)).fonts.fontRegular,
                              ('C' in _ctx ? _ctx.C : unref(C)).type.typeRegular,
                            ]),
                          },
                          [
                            createBaseVNode(
                              'div',
                              {
                                class: normalizeClass(
                                  ('C' in _ctx ? _ctx.C : unref(C)).TileFrame.anchor,
                                ),
                              },
                              [
                                createBaseVNode('div', _hoisted_1, [
                                  _cache[6] ||
                                    (_cache[6] = createBaseVNode(
                                      'p',
                                      null,
                                      'PMMG is currently running. Please follow the migration guide:',
                                      -1,
                                    )),
                                  createBaseVNode('ol', _hoisted_2, [
                                    createBaseVNode('li', null, [
                                      _cache[1] ||
                                        (_cache[1] = createTextVNode(
                                          ' Export all user data from ',
                                          -1,
                                        )),
                                      createBaseVNode(
                                        'span',
                                        {
                                          class: normalizeClass(
                                            ('C' in _ctx ? _ctx.C : unref(C)).Link.link,
                                          ),
                                          onClick:
                                            _cache[0] ||
                                            (_cache[0] = $event => unref(showBuffer)('XIT SET')),
                                        },
                                        'XIT SET',
                                        2,
                                      ),
                                      _cache[2] ||
                                        (_cache[2] = createTextVNode(
                                          ' (scroll to the very bottom). ',
                                          -1,
                                        )),
                                    ]),
                                    _cache[3] ||
                                      (_cache[3] = createBaseVNode(
                                        'li',
                                        null,
                                        'Open the Extensions page in your browser.',
                                        -1,
                                      )),
                                    _cache[4] ||
                                      (_cache[4] = createBaseVNode(
                                        'li',
                                        null,
                                        'Disable the PMMG Extended extension.',
                                        -1,
                                      )),
                                    _cache[5] ||
                                      (_cache[5] = createBaseVNode(
                                        'li',
                                        null,
                                        ' Reload the game, and, after selecting a preferred feature set, import PMMG files using XIT SET PMMG. ',
                                        -1,
                                      )),
                                  ]),
                                ]),
                              ],
                              2,
                            ),
                          ],
                          2,
                        ),
                      ],
                      2,
                    ),
                  ],
                  2,
                ),
              ],
              2,
            ),
          ],
          2,
        )
      );
    };
  },
});
export { _sfc_main as default };
