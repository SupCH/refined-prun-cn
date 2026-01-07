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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhdC1pbWFnZXMuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9iYXNpYy9jaGF0LWltYWdlcy50c3giXSwic291cmNlc0NvbnRlbnQiOlsiZnVuY3Rpb24gb25UaWxlUmVhZHkodGlsZTogUHJ1blRpbGUpIHtcbiAgc3Vic2NyaWJlKCQkKHRpbGUuYW5jaG9yLCBDLk1lc3NhZ2VMaXN0Lm1lc3NhZ2VzKSwgbWVzc2FnZXMgPT4ge1xuICAgIHN1YnNjcmliZSgkJChtZXNzYWdlcywgQy5MaW5rLmxpbmspLCBwcm9jZXNzTGluayk7XG4gIH0pO1xufVxuXG5mdW5jdGlvbiBwcm9jZXNzTGluayhlbGVtZW50OiBIVE1MRWxlbWVudCkge1xuICBjb25zdCBsaW5rID0gZWxlbWVudC50ZXh0Q29udGVudDtcbiAgaWYgKCFsaW5rIHx8ICFpc0ltYWdlKGxpbmspKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY29uc3Qgc3R5bGUgPSB7XG4gICAgbWF4SGVpZ2h0OiAnMzAwcHgnLFxuICAgIG1heFdpZHRoOiAnOTAlJyxcbiAgfTtcblxuICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgPD5cbiAgICAgIDxiciAvPlxuICAgICAgPGltZyBzcmM9e2xpbmt9IGFsdD1cIkNoYXQgaW1hZ2VcIiBzdHlsZT17c3R5bGV9IC8+XG4gICAgPC8+XG4gICkpLmFwcGVuZFRvKGVsZW1lbnQucGFyZW50RWxlbWVudCEpO1xufVxuXG5mdW5jdGlvbiBpc0ltYWdlKHVybDogc3RyaW5nKSB7XG4gIHJldHVybiAvXFwuKGpwZ3xqcGVnfHBuZ3x3ZWJwfGF2aWZ8Z2lmfHN2ZykkLy50ZXN0KHVybCk7XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHRpbGVzLm9ic2VydmUoWydDT01HJywgJ0NPTVAnLCAnQ09NVSddLCBvblRpbGVSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdBZGRzIGltYWdlcyB0byBjaGF0IG1lc3NhZ2VzIGNvbnRhaW5pbmcgaW1hZ2UgVVJMcy4nKTtcbiJdLCJuYW1lcyI6WyJzdWJzY3JpYmUiLCJtYXhIZWlnaHQiLCJtYXhXaWR0aCIsInRpbGVzIiwiZmVhdHVyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxTQUFBLFlBQUEsTUFBQTtBQUNFQSxZQUFBQSxHQUFBQSxLQUFBQSxRQUFBQSxFQUFBQSxZQUFBQSxRQUFBQSxHQUFBQSxjQUFBQTtBQUNFQSxjQUFBQSxHQUFBQSxVQUFBQSxFQUFBQSxLQUFBQSxJQUFBQSxHQUFBQSxXQUFBQTtBQUFBQSxFQUNGLENBQUE7QUFDRjtBQUVBLFNBQUEsWUFBQSxTQUFBO0FBQ0UsUUFBQSxPQUFBLFFBQUE7O0FBRUU7QUFBQSxFQUNGO0FBRUEsUUFBQSxRQUFBO0FBQUEsSUFDRUMsV0FBQUE7QUFBQUEsSUFDQUMsVUFBQUE7QUFBQUE7O0lBR2dCLE9BQUE7QUFBQSxJQUdBLE9BQUE7QUFBQTtFQUErQixHQUFBLElBQUEsQ0FBQSxDQUFBLENBQUEsRUFBQSxTQUFBLFFBQUEsYUFBQTtBQUduRDtBQUVBLFNBQUEsUUFBQSxLQUFBO0FBQ0UsU0FBQSxzQ0FBQSxLQUFBLEdBQUE7QUFDRjtBQUVBLFNBQUEsT0FBQTtBQUNFQyxRQUFBQSxRQUFBQSxDQUFBQSxRQUFBQSxRQUFBQSxNQUFBQSxHQUFBQSxXQUFBQTtBQUNGO0FBRUFDLFNBQUFBLElBQUFBLFlBQUFBLEtBQUFBLE1BQUFBLHFEQUFBQTsifQ==
