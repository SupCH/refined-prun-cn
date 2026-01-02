import xit from './xit-registry.js';
import { _$, $$ } from './select-dom.js';
import { C } from './prun-css.js';
import { createFragmentApp } from './vue-fragment-app.js';
import { subscribe } from './subscribe-async-generator.js';
import tiles from './tiles.js';
import _sfc_main from './ContextControls.vue.js';
import { tileStatePlugin } from './user-data-tiles.js';
import { startMeasure } from './performance-measure.js';
import { xitParametersKey } from './use-xit-parameters.js';
import { xitCommandKey } from './use-xit-command.js';
import { userData } from './user-data.js';
import { showBuffer } from './buffers.js';
import { tileKey } from './use-tile.js';
import { isEmpty } from './is-empty.js';
function onTileReady(tile) {
  let rawParameter = tile.parameter;
  if (!rawParameter) {
    rawParameter = 'CMDS';
  }
  let parameters = [];
  if (rawParameter[0] === '1') {
    const keyValues = rawParameter.split(' ');
    parameters.push(...keyValues.map(x => x.slice(2)));
  } else {
    parameters = rawParameter.split(/[_ ]+/g);
  }
  if (isEmpty(parameters)) {
    return;
  }
  const command = parameters[0];
  if (command.toUpperCase() == 'FIO' || command.toUpperCase() == 'COL') {
    return;
  }
  const xitCommand = xit.get(command);
  parameters = parameters.slice(1);
  if (xitCommand) {
    _$(tile.frame, C.TileFrame.title).textContent =
      typeof xitCommand.name === 'string' ? xitCommand.name : xitCommand.name(parameters);
    if (xitCommand.contextItems) {
      const items = xitCommand.contextItems(parameters);
      if (!isEmpty(items)) {
        const header = _$(tile.frame, C.TileFrame.header);
        createFragmentApp(_sfc_main, { items }).after(header);
      }
    }
  }
  subscribe($$(tile.anchor, C.ScrollView.view), scrollView => {
    const container = scrollView.children[0];
    if (container === void 0) {
      return;
    }
    container.removeAttribute('style');
    container.style.width = '100%';
    container.style.height = '100%';
    if (!xitCommand) {
      container.textContent = 'Error! No Matching Function!';
      return;
    }
    startMeasure(tile.fullCommand);
    createFragmentApp(xitCommand.component(parameters))
      .use(tileStatePlugin, { tile })
      .provide(tileKey, tile)
      .provide(xitCommandKey, command)
      .provide(xitParametersKey, parameters)
      .appendTo(container);
  });
}
function initializeXitCommands() {
  tiles.observe('XIT', onTileReady);
  if (userData.settings.mode === void 0) {
    setTimeout(() => showBuffer('XIT START'), 1e3);
  }
}
export { initializeXitCommands };
