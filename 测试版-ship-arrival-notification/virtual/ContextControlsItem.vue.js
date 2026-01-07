import { C } from './prun-css.js';
import { showBuffer } from './buffers.js';
import {
  defineComponent,
  computed,
  createElementBlock,
  openBlock,
  createElementVNode as createBaseVNode,
  createCommentVNode,
  createTextVNode,
} from './runtime-core.esm-bundler.js';
import { unref } from './reactivity.esm-bundler.js';
import { normalizeClass, toDisplayString } from './shared.esm-bundler.js';
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: 'ContextControlsItem',
  props: {
    cmd: {},
    label: {},
  },
  setup(__props) {
    const props = __props;
    const commandParts = computed(() => {
      const words = props.cmd.split(' ');
      let command = words.shift();
      if (command === 'XIT') {
        command += ' ' + words.shift();
      }
      return [command, words.join(' ')];
    });
    const itemClasses = [C.ContextControls.item, C.fonts.fontRegular, C.type.typeSmall];
    return (_ctx, _cache) => {
      return (
        openBlock(),
        createElementBlock(
          'div',
          {
            class: normalizeClass(itemClasses),
            onClick: _cache[0] || (_cache[0] = () => unref(showBuffer)(_ctx.cmd)),
          },
          [
            createBaseVNode('span', null, [
              createBaseVNode(
                'span',
                {
                  class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ContextControls.cmd),
                },
                toDisplayString(unref(commandParts)[0]),
                3,
              ),
              createTextVNode(' ' + toDisplayString(unref(commandParts)[1]), 1),
            ]),
            _ctx.label
              ? (openBlock(),
                createElementBlock(
                  'span',
                  {
                    key: 0,
                    class: normalizeClass(('C' in _ctx ? _ctx.C : unref(C)).ContextControls.label),
                  },
                  ': ' + toDisplayString(_ctx.label),
                  3,
                ))
              : createCommentVNode('', true),
          ],
        )
      );
    };
  },
});
export { _sfc_main as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiQ29udGV4dENvbnRyb2xzSXRlbS52dWUuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9jb21wb25lbnRzL0NvbnRleHRDb250cm9sc0l0ZW0udnVlIl0sInNvdXJjZXNDb250ZW50IjpbIjxzY3JpcHQgc2V0dXAgbGFuZz1cInRzXCI+XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuXG5jb25zdCBwcm9wcyA9IGRlZmluZVByb3BzPHsgY21kOiBzdHJpbmc7IGxhYmVsPzogc3RyaW5nIH0+KCk7XG5cbmNvbnN0IGNvbW1hbmRQYXJ0cyA9IGNvbXB1dGVkKCgpID0+IHtcbiAgY29uc3Qgd29yZHMgPSBwcm9wcy5jbWQuc3BsaXQoJyAnKTtcbiAgbGV0IGNvbW1hbmQgPSB3b3Jkcy5zaGlmdCgpO1xuICBpZiAoY29tbWFuZCA9PT0gJ1hJVCcpIHtcbiAgICBjb21tYW5kICs9ICcgJyArIHdvcmRzLnNoaWZ0KCk7XG4gIH1cbiAgcmV0dXJuIFtjb21tYW5kLCB3b3Jkcy5qb2luKCcgJyldO1xufSk7XG5cbmNvbnN0IGl0ZW1DbGFzc2VzID0gW0MuQ29udGV4dENvbnRyb2xzLml0ZW0sIEMuZm9udHMuZm9udFJlZ3VsYXIsIEMudHlwZS50eXBlU21hbGxdO1xuPC9zY3JpcHQ+XG5cbjx0ZW1wbGF0ZT5cbiAgPCEtLSBUaGUgbm9kZSBzdHJ1Y3R1cmUgaXMgZnVsbHkgcmVwbGljYXRlZCBmcm9tIFByVW4sIGRvbid0IG1pbmQgdW5uZWNlc3Nhcnkgbm9kZXMuIC0tPlxuICA8ZGl2IDpjbGFzcz1cIml0ZW1DbGFzc2VzXCIgQGNsaWNrPVwiKCkgPT4gc2hvd0J1ZmZlcihjbWQpXCI+XG4gICAgPHNwYW4+XG4gICAgICA8c3BhbiA6Y2xhc3M9XCJDLkNvbnRleHRDb250cm9scy5jbWRcIj57eyBjb21tYW5kUGFydHNbMF0gfX08L3NwYW4+XG4gICAgICB7eyBjb21tYW5kUGFydHNbMV0gfX1cbiAgICA8L3NwYW4+XG4gICAgPHNwYW4gdi1pZj1cImxhYmVsXCIgOmNsYXNzPVwiQy5Db250ZXh0Q29udHJvbHMubGFiZWxcIj46IHt7IGxhYmVsIH19PC9zcGFuPlxuICA8L2Rpdj5cbjwvdGVtcGxhdGU+XG4iXSwibmFtZXMiOlsiX25vcm1hbGl6ZUNsYXNzIiwiX3VucmVmIiwiX2NyZWF0ZUVsZW1lbnRWTm9kZSIsIkMiLCJfdG9EaXNwbGF5U3RyaW5nIiwiX2NyZWF0ZVRleHRWTm9kZSIsIl9jcmVhdGVDb21tZW50Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7OztBQUdBLFVBQUEsUUFBQTtBQUVBLFVBQUEsZUFBQSxTQUFBLE1BQUE7QUFDRSxZQUFBLFFBQUEsTUFBQSxJQUFBLE1BQUEsR0FBQTtBQUNBLFVBQUEsVUFBQSxNQUFBLE1BQUE7QUFDQSxVQUFBLFlBQUEsT0FBQTtBQUNFLG1CQUFBLE1BQUEsTUFBQSxNQUFBO0FBQUEsTUFBNkI7QUFFL0IsYUFBQSxDQUFBLFNBQUEsTUFBQSxLQUFBLEdBQUEsQ0FBQTtBQUFBLElBQWdDLENBQUE7QUFHbEMsVUFBQSxjQUFBLENBQUEsRUFBQSxnQkFBQSxNQUFBLEVBQUEsTUFBQSxhQUFBLEVBQUEsS0FBQSxTQUFBOzs7UUFXUSxPQUFBQSxlQUFBLFdBQUE7QUFBQSxRQU5rQixTQUFBLE9BQUEsQ0FBQSxNQUFBLE9BQUEsQ0FBQSxJQUFBLE1BQUFDLE1BQUEsVUFBQSxFQUFBLEtBQUEsR0FBQTtBQUFBLE1BQThCLEdBQUE7QUFBQTtVQUk3Q0MsZ0JBQUEsUUFBQTtBQUFBLFlBRjRELE9BQUFGLGdCQUFuREcsT0FBQUEsT0FBQUEsS0FBQUEsSUFBQUEsTUFBQUEsQ0FBQUEsR0FBQUEsZ0JBQUFBLEdBQUFBO0FBQUFBLFVBQXFCLEdBQUFDLGdCQUFBSCxNQUFBLFlBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsVUFBaUJJLGdCQUFBLE1BQUFELGdCQUFBSCxNQUFBLFlBQUEsRUFBQSxDQUFBLENBQUEsR0FBQSxDQUFBO0FBQUEsUUFDckMsQ0FBQTtBQUFBO1VBRXVELEtBQUE7QUFBQSxpQ0FBN0NFLE9BQUFBLE9BQUFBLEtBQUFBLElBQUFBLE1BQUFBLENBQUFBLEdBQUFBLGdCQUFBQSxLQUFBQTtBQUFBQSxRQUF1QixHQUFBLE9BQUFDLGdCQUFBLEtBQUEsS0FBQSxHQUFBLENBQUEsS0FBQUUsbUJBQUEsSUFBQSxJQUFBO0FBQUE7Ozs7In0=
