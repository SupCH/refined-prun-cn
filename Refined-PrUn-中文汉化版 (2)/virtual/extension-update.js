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
            [createTextVNode('Reloading Refined PrUn...')],
          ),
        ],
      ),
    ).appendTo(container);
  }, 1e3);
}
