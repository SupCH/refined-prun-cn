import { $$, $ } from './select-dom.js';
import { C } from './prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import features from './feature-registry.js';
import { changeInputValue } from './util.js';
import { correctMaterialCommand } from './material-commands.js';
import { correctPlanetCommand } from './planet-commands.js';
import { correctShipCommand } from './ship-commands.js';
import { correctSystemCommand } from './system-commands.js';
import { correctXitWeb } from './xit-web.js';
import { correctXitArgs } from './xit-args.js';
const transformers = [
  correctMaterialCommand,
  correctPlanetCommand,
  correctShipCommand,
  correctSystemCommand,
  correctXitWeb,
  correctXitArgs,
];
async function onSelectorReady(selector) {
  const input = await $(selector, C.PanelSelector.input);
  const form = input.form;
  let skipCorrection = false;
  form.addEventListener('submit', ev => {
    if (skipCorrection) {
      skipCorrection = false;
      return;
    }
    const parts = input.value.split(' ');
    for (const transform of transformers) {
      transform(parts);
    }
    const command = parts.join(' ');
    if (input.value === command) {
      return;
    }
    ev.stopPropagation();
    ev.preventDefault();
    changeInputValue(input, command);
    setTimeout(() => form.requestSubmit(), 0);
    skipCorrection = true;
  });
}
function init() {
  subscribe($$(document, C.Tile.selector), onSelectorReady);
}
features.add(import.meta.url, init, 'Corrects tile commands.');
