import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import config from './config.js';
import { applyCssRule } from './refined-prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import features from './feature-registry.js';
import $style from './rprun-version-label.module.css.js';
import { createVNode, createTextVNode } from './runtime-core.esm-bundler.js';
async function onFooterReady(footer) {
  const userCount = await $(footer, C.UsersOnlineCount.container);
  function onClick() {
    window.open('https://github.com/refined-prun/refined-prun/blob/main/CHANGELOG.md', '_blank');
  }
  createFragmentApp(() =>
    createVNode(
      'div',
      {
        class: [$style.container, C.HeadItem.container, C.fonts.fontRegular, C.type.typeRegular],
        onClick: onClick,
      },
      [
        createVNode(
          'div',
          {
            class: [C.HeadItem.indicator, C.HeadItem.indicatorSuccess],
          },
          null,
        ),
        createVNode(
          'div',
          {
            class: [$style.label, C.HeadItem.label],
            'data-tooltip': '(zh-cn)refined-prun version.',
            'data-tooltip-position': 'top',
          },
          [createTextVNode('v. '), config.version],
        ),
      ],
    ),
  ).before(userCount);
}
function init() {
  applyCssRule(`.${C.Frame.foot}`, $style.foot);
  subscribe($$(document, C.Frame.foot), onFooterReady);
}
features.add(import.meta.url, init, 'Adds a bottom-right "(zh-cn)refined-prun version" label.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicnBydW4tdmVyc2lvbi1sYWJlbC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL3JwcnVuLXZlcnNpb24tbGFiZWwudHN4Il0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9ycHJ1bi12ZXJzaW9uLWxhYmVsLm1vZHVsZS5jc3MnO1xuXG5hc3luYyBmdW5jdGlvbiBvbkZvb3RlclJlYWR5KGZvb3RlcjogSFRNTEVsZW1lbnQpIHtcbiAgY29uc3QgdXNlckNvdW50ID0gYXdhaXQgJChmb290ZXIsIEMuVXNlcnNPbmxpbmVDb3VudC5jb250YWluZXIpO1xuXG4gIGZ1bmN0aW9uIG9uQ2xpY2soKSB7XG4gICAgd2luZG93Lm9wZW4oJ2h0dHBzOi8vZ2l0aHViLmNvbS9yZWZpbmVkLXBydW4vcmVmaW5lZC1wcnVuL2Jsb2IvbWFpbi9DSEFOR0VMT0cubWQnLCAnX2JsYW5rJyk7XG4gIH1cblxuICBjcmVhdGVGcmFnbWVudEFwcCgoKSA9PiAoXG4gICAgPGRpdlxuICAgICAgY2xhc3M9e1skc3R5bGUuY29udGFpbmVyLCBDLkhlYWRJdGVtLmNvbnRhaW5lciwgQy5mb250cy5mb250UmVndWxhciwgQy50eXBlLnR5cGVSZWd1bGFyXX1cbiAgICAgIG9uQ2xpY2s9e29uQ2xpY2t9PlxuICAgICAgPGRpdiBjbGFzcz17W0MuSGVhZEl0ZW0uaW5kaWNhdG9yLCBDLkhlYWRJdGVtLmluZGljYXRvclN1Y2Nlc3NdfSAvPlxuICAgICAgPGRpdlxuICAgICAgICBjbGFzcz17WyRzdHlsZS5sYWJlbCwgQy5IZWFkSXRlbS5sYWJlbF19XG4gICAgICAgIGRhdGEtdG9vbHRpcD1cIih6aC1jbilyZWZpbmVkLXBydW4gdmVyc2lvbi5cIlxuICAgICAgICBkYXRhLXRvb2x0aXAtcG9zaXRpb249XCJ0b3BcIj5cbiAgICAgICAgdi4ge2NvbmZpZy52ZXJzaW9ufVxuICAgICAgPC9kaXY+XG4gICAgPC9kaXY+XG4gICkpLmJlZm9yZSh1c2VyQ291bnQpO1xufVxuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoYC4ke0MuRnJhbWUuZm9vdH1gLCAkc3R5bGUuZm9vdCk7XG4gIHN1YnNjcmliZSgkJChkb2N1bWVudCwgQy5GcmFtZS5mb290KSwgb25Gb290ZXJSZWFkeSk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdBZGRzIGEgYm90dG9tLXJpZ2h0IFwiKHpoLWNuKXJlZmluZWQtcHJ1biB2ZXJzaW9uXCIgbGFiZWwuJyk7XG4iXSwibmFtZXMiOlsid2luZG93IiwiX2NyZWF0ZVZOb2RlIiwiYXBwbHlDc3NSdWxlIiwic3Vic2NyaWJlIiwiZmVhdHVyZXMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7OztBQUVBLGVBQUEsY0FBQSxRQUFBO0FBQ0UsUUFBQSxZQUFBLE1BQUEsRUFBQSxRQUFBLEVBQUEsaUJBQUEsU0FBQTs7QUFHRUEsV0FBQUEsS0FBQUEsdUVBQUFBLFFBQUFBO0FBQUFBLEVBQ0Y7Ozs7RUFLb0IsR0FBQSxDQUFBQyxZQUFBLE9BQUE7QUFBQTtFQUMrQyxHQUFBLElBQUEsR0FBQUEsWUFBQSxPQUFBO0FBQUE7SUFFdEIsZ0JBQUE7QUFBQSxJQUFBLHlCQUFBO0FBQUE7QUFPL0M7QUFFQSxTQUFBLE9BQUE7QUFDRUMsZUFBQUEsSUFBQUEsRUFBQUEsTUFBQUEsSUFBQUEsSUFBQUEsT0FBQUEsSUFBQUE7QUFDQUMsWUFBQUEsR0FBQUEsVUFBQUEsRUFBQUEsTUFBQUEsSUFBQUEsR0FBQUEsYUFBQUE7QUFDRjtBQUVBQyxTQUFBQSxJQUFBQSxZQUFBQSxLQUFBQSxNQUFBQSwwREFBQUE7In0=
