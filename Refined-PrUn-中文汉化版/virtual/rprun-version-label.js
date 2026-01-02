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
            'data-tooltip': 'Refined PrUn version.',
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
features.add(import.meta.url, init, 'Adds a bottom-right "Refined PrUn version" label.');
