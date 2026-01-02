import { subscribe } from './subscribe-async-generator.js';
import { $$, _$$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { refAnimationFrame } from './reactive-dom.js';
import { isEmpty } from './is-empty.js';
import { createVNode } from './runtime-core.esm-bundler.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.workforces), workforces => {
    subscribe($$(workforces, 'tr'), row => {
      const cells = _$$(row, 'td');
      if (isEmpty(cells)) {
        return;
      }
      const bar = cells[4].getElementsByTagName('div')[0];
      bar.style.display = 'flex';
      bar.style.flexDirection = 'row';
      bar.style.justifyContent = 'left';
      const progress = bar.getElementsByTagName('progress')[0];
      const progressTitle = refAnimationFrame(progress, x => x.title);
      createFragmentApp(() => createVNode('span', null, [progressTitle.value])).appendTo(bar);
    });
  });
}
function init() {
  tiles.observe('BS', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BS: Adds a workforce satisfaction percentage label to the satisfaction progress bar.',
);
