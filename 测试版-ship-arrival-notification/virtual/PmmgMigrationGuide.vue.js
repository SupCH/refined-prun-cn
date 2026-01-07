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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiUG1tZ01pZ3JhdGlvbkd1aWRlLnZ1ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2NvbXBvbmVudHMvUG1tZ01pZ3JhdGlvbkd1aWRlLnZ1ZSJdLCJzb3VyY2VzQ29udGVudCI6WyI8c2NyaXB0IHNldHVwIGxhbmc9XCJ0c1wiPlxuaW1wb3J0IHsgc2hvd0J1ZmZlciB9IGZyb20gJ0BzcmMvaW5mcmFzdHJ1Y3R1cmUvcHJ1bi11aS9idWZmZXJzLmpzJztcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXYgOmNsYXNzPVwiQy5XaW5kb3cud2luZG93XCIgc3R5bGU9XCJsZWZ0OiAxMDBweDsgdG9wOiAxMDBweDsgei1pbmRleDogOTk5XCI+XG4gICAgPGRpdiA6Y2xhc3M9XCJDLldpbmRvdy5oZWFkZXJcIiAvPlxuICAgIDxkaXZcbiAgICAgIDpjbGFzcz1cIkMuV2luZG93LmJvZHlcIlxuICAgICAgc3R5bGU9XCJcbiAgICAgICAgcG9zaXRpb246IHJlbGF0aXZlO1xuICAgICAgICB1c2VyLXNlbGVjdDogYXV0bztcbiAgICAgICAgd2lkdGg6IDQwMHB4O1xuICAgICAgICBoZWlnaHQ6IDIwMHB4O1xuICAgICAgICBib3gtc2l6aW5nOiBib3JkZXItYm94O1xuICAgICAgICBmbGV4LXNocmluazogMDtcbiAgICAgIFwiPlxuICAgICAgPGRpdiA6Y2xhc3M9XCJDLlRpbGUudGlsZVwiPlxuICAgICAgICA8ZGl2IDpjbGFzcz1cIkMuVGlsZUZyYW1lLmZyYW1lXCI+XG4gICAgICAgICAgPGRpdlxuICAgICAgICAgICAgOmNsYXNzPVwiW0MuVGlsZUZyYW1lLmhlYWRlciwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVSZWd1bGFyXVwiXG4gICAgICAgICAgICBzdHlsZT1cImN1cnNvcjogZGVmYXVsdFwiPlxuICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCJbQy5UaWxlRnJhbWUudGl0bGUsIEMuZm9udHMuZm9udFNtYWxsSGVhZGVyc11cIj5cbiAgICAgICAgICAgICAgUkVGSU5FRCBQUlVOIE1JR1JBVElPTiBHVUlERVxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPGRpdiA6Y2xhc3M9XCJbQy5UaWxlRnJhbWUuYm9keSwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVSZWd1bGFyXVwiPlxuICAgICAgICAgICAgPGRpdiA6Y2xhc3M9XCJDLlRpbGVGcmFtZS5hbmNob3JcIj5cbiAgICAgICAgICAgICAgPGRpdiBzdHlsZT1cIndpZHRoOiAxMDAlOyBoZWlnaHQ6IDEwMCU7IHBhZGRpbmc6IDEwcHhcIj5cbiAgICAgICAgICAgICAgICA8cD5QTU1HIGlzIGN1cnJlbnRseSBydW5uaW5nLiBQbGVhc2UgZm9sbG93IHRoZSBtaWdyYXRpb24gZ3VpZGU6PC9wPlxuICAgICAgICAgICAgICAgIDxvbCBzdHlsZT1cInBhZGRpbmctaW5saW5lOiAxNXB4OyBsaW5lLWhlaWdodDogMS41XCI+XG4gICAgICAgICAgICAgICAgICA8bGk+XG4gICAgICAgICAgICAgICAgICAgIEV4cG9ydCBhbGwgdXNlciBkYXRhIGZyb21cbiAgICAgICAgICAgICAgICAgICAgPHNwYW4gOmNsYXNzPVwiQy5MaW5rLmxpbmtcIiBAY2xpY2s9XCJzaG93QnVmZmVyKCdYSVQgU0VUJylcIj5YSVQgU0VUPC9zcGFuPlxuICAgICAgICAgICAgICAgICAgICAoc2Nyb2xsIHRvIHRoZSB2ZXJ5IGJvdHRvbSkuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPk9wZW4gdGhlIEV4dGVuc2lvbnMgcGFnZSBpbiB5b3VyIGJyb3dzZXIuPC9saT5cbiAgICAgICAgICAgICAgICAgIDxsaT5EaXNhYmxlIHRoZSBQTU1HIEV4dGVuZGVkIGV4dGVuc2lvbi48L2xpPlxuICAgICAgICAgICAgICAgICAgPGxpPlxuICAgICAgICAgICAgICAgICAgICBSZWxvYWQgdGhlIGdhbWUsIGFuZCwgYWZ0ZXIgc2VsZWN0aW5nIGEgcHJlZmVycmVkIGZlYXR1cmUgc2V0LCBpbXBvcnQgUE1NRyBmaWxlc1xuICAgICAgICAgICAgICAgICAgICB1c2luZyBYSVQgU0VUIFBNTUcuXG4gICAgICAgICAgICAgICAgICA8L2xpPlxuICAgICAgICAgICAgICAgIDwvb2w+XG4gICAgICAgICAgICAgIDwvZGl2PlxuICAgICAgICAgICAgPC9kaXY+XG4gICAgICAgICAgPC9kaXY+XG4gICAgICAgIDwvZGl2PlxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gIDwvZGl2PlxuPC90ZW1wbGF0ZT5cbiJdLCJuYW1lcyI6WyJfbm9ybWFsaXplQ2xhc3MiLCJDIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdW5yZWYiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztRQWlEUSxPQUFBQSxnQkE1Q09DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLE9BQUFBLE1BQUFBO0FBQUFBLFFBQWUsT0FBQSxFQUFBLFFBQUEsU0FBQSxPQUFBLFNBQUEsV0FBQSxNQUFBO0FBQUEsTUFBRSxHQUFBO0FBQUE7VUFDSSxPQUFBRCxnQkFBbkJDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLE9BQUFBLE1BQUFBO0FBQUFBLFFBQWUsR0FBQSxNQUFBLENBQUE7QUFBQTtVQTBDdEIsT0FBQUQsZ0JBeENJQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxPQUFBQSxJQUFBQTtBQUFBQSxVQUFhLE9BQUEsRUFBQSxZQUFBLFlBQUEsZUFBQSxRQUFBLFNBQUEsU0FBQSxVQUFBLFNBQUEsY0FBQSxjQUFBLGVBQUEsSUFBQTtBQUFBLFFBQ3JCLEdBQUE7QUFBQTtZQXNDTSxPQUFBRCxnQkE5Qk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLEtBQUFBLElBQUFBO0FBQUFBLFVBQVcsR0FBQTtBQUFBO2NBNkJoQixPQUFBRCxnQkE1Qk9DLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLFVBQUFBLEtBQUFBO0FBQUFBLFlBQWlCLEdBQUE7QUFBQTtnQkFPdEIsT0FBQUQsZUFBQSxFQUxLQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxzQkFBb0JBLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLE1BQUFBLGNBQXFCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQTtnQkFBa0IsT0FBQSxFQUFBLFVBQUEsVUFBQTtBQUFBLGNBQ3BFLEdBQUE7QUFBQTtrQkFHTSxPQUFBRCxlQUFBLEVBRlFDLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLHFCQUFtQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsTUFBQUEsZ0JBQUFBLENBQUFBO0FBQUFBLGdCQUF3QixHQUFBLGtDQUFBLENBQUE7QUFBQSxjQUV6RCxHQUFBLENBQUE7QUFBQTtnQkFxQkksT0FBQUQsZUFBQSxFQW5CUUMsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsb0JBQWtCQSxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxNQUFBQSxjQUFxQkEsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUE7Y0FBa0IsR0FBQTtBQUFBO2tCQWtCL0QsT0FBQUQsZ0JBakJPQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxVQUFBQSxNQUFBQTtBQUFBQSxnQkFBa0IsR0FBQTtBQUFBO29CQWdCdkIsT0FBQSxDQUFBLE1BQUEsT0FBQSxDQUFBLElBQUFDLGdCQUFBLEtBQUEsTUFBQSxpRUFBQSxFQUFBO0FBQUEsb0JBZDREQSxnQkFBQSxNQUFBLFlBQUE7QUFBQSxzQkFhM0RBLGdCQUFBLE1BQUEsTUFBQTtBQUFBLHdCQVBFLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQyxnQkFBQSwrQkFBQSxFQUFBO0FBQUEsd0JBRkhELGdCQUFBLFFBQUE7QUFBQSwwQkFBd0UsT0FBQUYsZ0JBQTFEQyxPQUFBQSxPQUFBQSxLQUFBQSxJQUFBQSxNQUFBQSxDQUFBQSxHQUFBQSxLQUFBQSxJQUFBQTtBQUFBQSwwQkFBVyxTQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLENBQUEsV0FBQUcsTUFBQSxVQUFBLEVBQUEsU0FBQTtBQUFBLHdCQUFvQixHQUFBLFdBQUEsQ0FBQTtBQUFBLHdCQUFvQixPQUFBLENBQUEsTUFBQSxPQUFBLENBQUEsSUFBQUQsZ0JBQUEsa0NBQUEsRUFBQTtBQUFBLHNCQUVuRSxDQUFBO0FBQUE7c0JBQzZDLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBRCxnQkFBQSxNQUFBLE1BQUEsd0NBQUEsRUFBQTtBQUFBLHNCQUNMLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBQSxnQkFBQSxNQUFBLE1BQUEsMEdBQUEsRUFBQTtBQUFBLG9CQUl4QyxDQUFBO0FBQUE7Ozs7Ozs7Ozs7In0=
