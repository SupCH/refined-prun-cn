import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { createVNode, Fragment } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  subscribe($$(tile.anchor, C.MessageList.messages), messages => {
    subscribe($$(messages, C.Link.link), processLink);
  });
}
function processLink(element) {
  const link = element.textContent;
  if (!link || !isImage(link)) {
    return;
  }
  const style = {
    maxHeight: '300px',
    maxWidth: '90%',
  };
  createFragmentApp(() =>
    createVNode(Fragment, null, [
      createVNode('br', null, null),
      createVNode(
        'img',
        {
          src: link,
          alt: 'Chat image',
          style: style,
        },
        null,
      ),
    ]),
  ).appendTo(element.parentElement);
}
function isImage(url) {
  return /\.(jpg|jpeg|png|webp|avif|gif|svg)$/.test(url);
}
function init() {
  tiles.observe(['COMG', 'COMP', 'COMU'], onTileReady);
}
features.add(import.meta.url, init, 'Adds images to chat messages containing image URLs.');
