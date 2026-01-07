import config from './config.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { fetchJson } from './fetch.js';
import { createVNode, createTextVNode } from './runtime-core.esm-bundler.js';
{
  const container = document.getElementById('container');
  const id = setInterval(async () => {
    const manifest = await fetchJson(config.url.manifest);
    if (!manifest.version || config.version === manifest.version) {
      return;
    }
    void setTimeout(() => window.location.reload(), 3e3);
    clearInterval(id);
    if (C.Connecting === void 0) {
      return;
    }
    createFragmentApp(() =>
      createVNode(
        'div',
        {
          class: [C.Connecting.processing, C.Connecting.overlay],
          style: {
            zIndex: '999999',
          },
        },
        [
          createVNode(
            'span',
            {
              class: [C.Connecting.message, C.fonts.fontRegular, C.type.typeLarger],
            },
            [createTextVNode('Reloading (zh-cn)refined-prun...')],
          ),
        ],
      ),
    ).appendTo(container);
  }, 1e3);
}
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZXh0ZW5zaW9uLXVwZGF0ZS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3NoZWxsL2V4dGVuc2lvbi11cGRhdGUudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCB7IGZldGNoSnNvbiB9IGZyb20gJ0BzcmMvdXRpbHMvZmV0Y2gnO1xuXG5pZiAoaW1wb3J0Lm1ldGEuZW52LlBST0QpIHtcbiAgY29uc3QgY29udGFpbmVyID0gZG9jdW1lbnQuZ2V0RWxlbWVudEJ5SWQoJ2NvbnRhaW5lcicpITtcbiAgY29uc3QgaWQgPSBzZXRJbnRlcnZhbChhc3luYyAoKSA9PiB7XG4gICAgY29uc3QgbWFuaWZlc3QgPSAoYXdhaXQgZmV0Y2hKc29uKGNvbmZpZy51cmwubWFuaWZlc3QpKSBhcyBjaHJvbWUucnVudGltZS5NYW5pZmVzdFYzO1xuICAgIGlmICghbWFuaWZlc3QudmVyc2lvbiB8fCBjb25maWcudmVyc2lvbiA9PT0gbWFuaWZlc3QudmVyc2lvbikge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICB2b2lkIHNldFRpbWVvdXQoKCkgPT4gd2luZG93LmxvY2F0aW9uLnJlbG9hZCgpLCAzMDAwKTtcbiAgICBjbGVhckludGVydmFsKGlkKTtcbiAgICBpZiAoQy5Db25uZWN0aW5nID09PSB1bmRlZmluZWQpIHtcbiAgICAgIC8vIFRoZXJlIG1pZ2h0IGJlIGEgY2FzZSB3aGVyZSBQclVuIENTUyB3YXMgbm90IHBhcnNlZCB5ZXQuXG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNyZWF0ZUZyYWdtZW50QXBwKCgpID0+IChcbiAgICAgIDxkaXYgY2xhc3M9e1tDLkNvbm5lY3RpbmcucHJvY2Vzc2luZywgQy5Db25uZWN0aW5nLm92ZXJsYXldfSBzdHlsZT17eyB6SW5kZXg6ICc5OTk5OTknIH19PlxuICAgICAgICA8c3BhbiBjbGFzcz17W0MuQ29ubmVjdGluZy5tZXNzYWdlLCBDLmZvbnRzLmZvbnRSZWd1bGFyLCBDLnR5cGUudHlwZUxhcmdlcl19PlxuICAgICAgICAgIFJlbG9hZGluZyAoemgtY24pcmVmaW5lZC1wcnVuLi4uXG4gICAgICAgIDwvc3Bhbj5cbiAgICAgIDwvZGl2PlxuICAgICkpLmFwcGVuZFRvKGNvbnRhaW5lcik7XG4gIH0sIDEwMDApO1xufVxuIl0sIm5hbWVzIjpbImNsZWFySW50ZXJ2YWwiLCJjcmVhdGVGcmFnbWVudEFwcCIsIl9jcmVhdGVWTm9kZSIsIl9jcmVhdGVUZXh0Vk5vZGUiXSwibWFwcGluZ3MiOiI7Ozs7O0FBRUE7QUFDRSxRQUFBLFlBQUEsU0FBQSxlQUFBLFdBQUE7QUFDQSxRQUFBLEtBQUEsWUFBQSxZQUFBO0FBQ0UsVUFBQSxXQUFBLE1BQUEsVUFBQSxPQUFBLElBQUEsUUFBQTtBQUNBLFFBQUEsQ0FBQSxTQUFBLFdBQUEsT0FBQSxZQUFBLFNBQUEsU0FBQTtBQUNFO0FBQUEsSUFBQTtBQUVGLFNBQUEsV0FBQSxNQUFBLE9BQUEsU0FBQSxPQUFBLEdBQUEsR0FBQTtBQUNBQSxrQkFBQUEsRUFBQUE7QUFDQSxRQUFBLEVBQUEsZUFBQSxRQUFBO0FBRUU7QUFBQSxJQUFBO0FBRUZDLHNCQUFBQSxNQUFBQSxZQUFBQSxPQUFBQTtBQUFBQSxNQUFrQixTQUFBLENBQUEsRUFBQSxXQUFBLFlBQUEsRUFBQSxXQUFBLE9BQUE7QUFBQSxNQUMwQyxTQUFBO0FBQUEsUUFBVSxRQUFBO0FBQUEsTUFBVTtBQUFBLElBQVMsR0FBQSxDQUFBQyxZQUFBLFFBQUE7QUFBQSxNQUFDLFNBQUEsQ0FBQSxFQUFBLFdBQUEsU0FBQSxFQUFBLE1BQUEsYUFBQSxFQUFBLEtBQUEsVUFBQTtBQUFBLElBQ1osR0FBQSxDQUFBQyxnQkFBQSxrQ0FBQSxDQUFBLENBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxTQUFBLFNBQUE7QUFBQSxFQUl6RCxHQUFBLEdBQUE7QUFFekI7In0=
