import PrunLink from './PrunLink.vue.js';
import { objectId } from './object-id.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  Fragment,
  renderList,
  createBlock,
  withCtx,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { toDisplayString } from './shared.esm-bundler.js';
const _hoisted_1 = { key: 1 };
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'TaskText',
  props: {
    text: {},
  },
  setup(__props) {
    const parts = computed(() => {
      const parts2 = [];
      let processed = __props.text;
      if (!processed) {
        return parts2;
      }
      const matches = [...processed.matchAll(/\[\[([a-zA-Z]):([^:\]]+)]]/g)];
      let cut = 0;
      for (const match of matches) {
        const before = processed.substring(0, match.index - cut);
        if (before.length > 0) {
          parts2.push({ text: before });
        }
        switch (match[1]) {
          case 'm':
            parts2.push({ text: match[2], command: `MAT ${match[2]}` });
            break;
          case 'p':
            parts2.push({ text: match[2], command: `BS ${match[2]}` });
            break;
          default:
            parts2.push({ text: match[0] });
            break;
        }
        processed = processed.slice(match.index + match[0].length - cut);
        cut = match.index + match[0].length;
      }
      if (processed.length > 0) {
        parts2.push({ text: processed });
      }
      return parts2;
    });
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock('div', null, [
          (openBlock(true),
          createElementBlock(
            Fragment,
            null,
            renderList(unref(parts), part => {
              return (
                openBlock(),
                createElementBlock(
                  Fragment,
                  {
                    key: unref(objectId)(part),
                  },
                  [
                    part.command
                      ? (openBlock(),
                        createBlock(
                          PrunLink,
                          {
                            key: 0,
                            inline: '',
                            command: part.command,
                          },
                          {
                            default: withCtx(() => [
                              createTextVNode(toDisplayString(part.text), 1),
                            ]),
                            _: 2,
                          },
                          1032,
                          ['command'],
                        ))
                      : (openBlock(),
                        createElementBlock('span', _hoisted_1, toDisplayString(part.text), 1)),
                  ],
                  64,
                )
              );
            }),
            128,
          )),
        ])
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiVGFza1RleHQudnVlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL1RPRE8vVGFza1RleHQudnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgUHJ1bkxpbmsgZnJvbSAnQHNyYy9jb21wb25lbnRzL1BydW5MaW5rLnZ1ZSc7XG5pbXBvcnQgeyBvYmplY3RJZCB9IGZyb20gJ0BzcmMvdXRpbHMvb2JqZWN0LWlkJztcblxuY29uc3QgeyB0ZXh0IH0gPSBkZWZpbmVQcm9wczx7IHRleHQ/OiBzdHJpbmcgfT4oKTtcblxuaW50ZXJmYWNlIFBhcnQge1xuICB0ZXh0Pzogc3RyaW5nO1xuICBjb21tYW5kPzogc3RyaW5nO1xufVxuXG5jb25zdCBwYXJ0cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3QgcGFydHM6IFBhcnRbXSA9IFtdO1xuICBsZXQgcHJvY2Vzc2VkID0gdGV4dDtcbiAgaWYgKCFwcm9jZXNzZWQpIHtcbiAgICByZXR1cm4gcGFydHM7XG4gIH1cbiAgY29uc3QgbWF0Y2hlcyA9IFsuLi5wcm9jZXNzZWQubWF0Y2hBbGwoL1xcW1xcWyhbYS16QS1aXSk6KFteOlxcXV0rKV1dL2cpXTtcbiAgbGV0IGN1dCA9IDA7XG4gIGZvciAoY29uc3QgbWF0Y2ggb2YgbWF0Y2hlcykge1xuICAgIGNvbnN0IGJlZm9yZSA9IHByb2Nlc3NlZC5zdWJzdHJpbmcoMCwgbWF0Y2guaW5kZXggLSBjdXQpO1xuICAgIGlmIChiZWZvcmUubGVuZ3RoID4gMCkge1xuICAgICAgcGFydHMucHVzaCh7IHRleHQ6IGJlZm9yZSB9KTtcbiAgICB9XG4gICAgc3dpdGNoIChtYXRjaFsxXSkge1xuICAgICAgY2FzZSAnbSc6XG4gICAgICAgIHBhcnRzLnB1c2goeyB0ZXh0OiBtYXRjaFsyXSwgY29tbWFuZDogYE1BVCAke21hdGNoWzJdfWAgfSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSAncCc6XG4gICAgICAgIHBhcnRzLnB1c2goeyB0ZXh0OiBtYXRjaFsyXSwgY29tbWFuZDogYEJTICR7bWF0Y2hbMl19YCB9KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBkZWZhdWx0OlxuICAgICAgICBwYXJ0cy5wdXNoKHsgdGV4dDogbWF0Y2hbMF0gfSk7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBwcm9jZXNzZWQgPSBwcm9jZXNzZWQuc2xpY2UobWF0Y2guaW5kZXggKyBtYXRjaFswXS5sZW5ndGggLSBjdXQpO1xuICAgIGN1dCA9IG1hdGNoLmluZGV4ICsgbWF0Y2hbMF0ubGVuZ3RoO1xuICB9XG5cbiAgaWYgKHByb2Nlc3NlZC5sZW5ndGggPiAwKSB7XG4gICAgcGFydHMucHVzaCh7IHRleHQ6IHByb2Nlc3NlZCB9KTtcbiAgfVxuICByZXR1cm4gcGFydHM7XG59KTtcbjwvc2NyaXB0PlxuXG48dGVtcGxhdGU+XG4gIDxkaXY+XG4gICAgPHRlbXBsYXRlIHYtZm9yPVwicGFydCBpbiBwYXJ0c1wiIDprZXk9XCJvYmplY3RJZChwYXJ0KVwiPlxuICAgICAgPFBydW5MaW5rIHYtaWY9XCJwYXJ0LmNvbW1hbmRcIiBpbmxpbmUgOmNvbW1hbmQ9XCJwYXJ0LmNvbW1hbmRcIj57eyBwYXJ0LnRleHQgfX08L1BydW5MaW5rPlxuICAgICAgPHNwYW4gdi1lbHNlPnt7IHBhcnQudGV4dCB9fTwvc3Bhbj5cbiAgICA8L3RlbXBsYXRlPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX29wZW5CbG9jayIsIl9jcmVhdGVFbGVtZW50QmxvY2siLCJfRnJhZ21lbnQiLCJfcmVuZGVyTGlzdCIsIl91bnJlZiIsIl9jcmVhdGVUZXh0Vk5vZGUiLCJfdG9EaXNwbGF5U3RyaW5nIl0sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7QUFXQSxVQUFBLFFBQUEsU0FBQSxNQUFBO0FBQ0UsWUFBQSxTQUFBLENBQUE7QUFDQSxVQUFBLFlBQUEsUUFBQTtBQUNBLFVBQUEsQ0FBQSxXQUFBO0FBQ0UsZUFBQTtBQUFBLE1BQU87QUFFVCxZQUFBLFVBQUEsQ0FBQSxHQUFBLFVBQUEsU0FBQSw2QkFBQSxDQUFBO0FBQ0EsVUFBQSxNQUFBO0FBQ0EsaUJBQUEsU0FBQSxTQUFBO0FBQ0UsY0FBQSxTQUFBLFVBQUEsVUFBQSxHQUFBLE1BQUEsUUFBQSxHQUFBO0FBQ0EsWUFBQSxPQUFBLFNBQUEsR0FBQTtBQUNFLGlCQUFBLEtBQUEsRUFBQSxNQUFBLE9BQUEsQ0FBQTtBQUFBLFFBQTJCO0FBRTdCLGdCQUFBLE1BQUEsQ0FBQSxHQUFBO0FBQUEsVUFBa0IsS0FBQTtBQUVkLG1CQUFBLEtBQUEsRUFBQSxNQUFBLE1BQUEsQ0FBQSxHQUFBLFNBQUEsT0FBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTtBQUFBLFVBQUEsS0FBQTtBQUVBLG1CQUFBLEtBQUEsRUFBQSxNQUFBLE1BQUEsQ0FBQSxHQUFBLFNBQUEsTUFBQSxNQUFBLENBQUEsQ0FBQSxHQUFBLENBQUE7QUFDQTtBQUFBLFVBQUE7QUFFQSxtQkFBQSxLQUFBLEVBQUEsTUFBQSxNQUFBLENBQUEsRUFBQSxDQUFBO0FBQ0E7QUFBQSxRQUFBO0FBRUosb0JBQUEsVUFBQSxNQUFBLE1BQUEsUUFBQSxNQUFBLENBQUEsRUFBQSxTQUFBLEdBQUE7QUFDQSxjQUFBLE1BQUEsUUFBQSxNQUFBLENBQUEsRUFBQTtBQUFBLE1BQTZCO0FBRy9CLFVBQUEsVUFBQSxTQUFBLEdBQUE7QUFDRSxlQUFBLEtBQUEsRUFBQSxNQUFBLFVBQUEsQ0FBQTtBQUFBLE1BQThCO0FBRWhDLGFBQUE7QUFBQSxJQUFPLENBQUE7OztTQVVEQSxVQUFBLElBQUEsR0FBQUMsbUJBQUFDLFVBQUEsTUFBQUMsV0FBQUMsTUFBQSxLQUFBLEdBQUEsQ0FBQSxTQUFBOzs7VUFKK0MsR0FBQTtBQUFBO2NBQ3NDLEtBQUE7QUFBQTtjQUF6RCxTQUFBLEtBQUE7QUFBQSxZQUFzQixHQUFBO0FBQUE7Z0JBQXdCQyxnQkFBQUMsZ0JBQUEsS0FBQSxJQUFBLEdBQUEsQ0FBQTtBQUFBLGNBQUgsQ0FBQTtBQUFBOztVQUNoRCxHQUFBLEVBQUE7QUFBQTs7Ozs7In0=
