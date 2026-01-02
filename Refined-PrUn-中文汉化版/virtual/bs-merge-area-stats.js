import { subscribe } from './subscribe-async-generator.js';
import { _$$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import tiles from './tiles.js';
import features from './feature-registry.js';
import { watchEffectWhileNodeAlive } from './watch.js';
import { refValue } from './reactive-dom.js';
function onTileReady(tile) {
  if (!tile.parameter) {
    return;
  }
  subscribe($$(tile.anchor, C.Site.info), info => {
    const elements = _$$(info, C.FormComponent.containerPassive);
    if (elements.length < 2) {
      return;
    }
    const areaRow = elements[0];
    areaRow.style.display = 'none';
    const areaBar = areaRow.getElementsByTagName('progress')[0];
    if (areaBar === void 0) {
      return;
    }
    const areaBarCopy = areaBar.cloneNode(true);
    const areaValue = refValue(areaBar);
    watchEffectWhileNodeAlive(areaBar, () => (areaBarCopy.value = areaValue.value));
    const editDiv = elements[1].getElementsByTagName('div')[0];
    editDiv.insertBefore(areaBarCopy, editDiv.lastChild);
  });
}
function init() {
  tiles.observe('BS', onTileReady);
}
features.add(
  import.meta.url,
  init,
  'BS: Merges the area progress bar field with the detailed area stats row.',
);
