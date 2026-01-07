import tiles from './tiles.js';
import { C } from './prun-css.js';
import { _$, $, _$$ } from './select-dom.js';
import { clickElement, changeInputValue } from './util.js';
import { sleep } from './sleep.js';
import css from './css-utils.module.css.js';
import onNodeDisconnected from './on-node-disconnected.js';
import { getPrunId } from './attributes.js';
import { watchUntil } from './watch.js';
import { dispatchClientPrunMessage } from './prun-api-listener.js';
import { clamp } from './clamp.js';
import {
  UI_WINDOWS_REQUEST_FOCUS,
  UI_TILES_CHANGE_COMMAND,
  UI_WINDOWS_UPDATE_SIZE,
} from './client-messages.js';
import { onNodeTreeMutation } from './on-node-tree-mutation.js';
import { isEmpty } from './is-empty.js';
let isBusy = false;
const pendingResolvers = [];
async function showBuffer(command, options) {
  if (!options?.force) {
    const existing = tiles.find(command).find(x => !x.docked);
    if (existing) {
      const window = existing.frame.closest(`.${C.Window.window}`);
      const command2 = UI_WINDOWS_REQUEST_FOCUS(existing.id);
      if (dispatchClientPrunMessage(command2)) {
        return window;
      }
      const header = _$(window, C.Window.header);
      void clickElement(header);
      return window;
    }
  }
  await acquireSlot();
  const create = await $(document.documentElement, C.Dock.create);
  try {
    const windows = document.getElementsByClassName(C.Window.window);
    const seenWindows = new Set(Array.from(windows));
    const newWindow = await new Promise(resolve => {
      onNodeTreeMutation(document, () => {
        for (let i = 0; i < windows.length; i++) {
          if (!seenWindows.has(windows[i])) {
            resolve(windows[i]);
            return true;
          }
        }
        return false;
      });
      create.click();
    });
    await processWindow(newWindow, command, options);
    return newWindow;
  } finally {
    releaseSlot();
  }
}
async function acquireSlot() {
  if (!isBusy) {
    isBusy = true;
    return;
  }
  await new Promise(resolve => pendingResolvers.push(resolve));
}
function releaseSlot() {
  if (isEmpty(pendingResolvers)) {
    isBusy = false;
  } else {
    setTimeout(pendingResolvers.shift(), 0);
  }
}
async function processWindow(window, command, options) {
  const input = _$(window, C.PanelSelector.input);
  const form = input.form;
  if (!form?.isConnected) {
    return;
  }
  if (!(options?.autoSubmit ?? true)) {
    changeInputValue(input, command);
    return;
  }
  window.classList.add(css.hidden);
  const tile = _$(window, C.Tile.tile);
  const id = getPrunId(tile);
  if (options?.autoClose) {
    const dockLabel = id?.padStart(2, '0');
    const dockTab = _$$(document, C.Dock.buffer).find(
      x => _$(x, C.Dock.title)?.textContent === dockLabel,
    );
    if (dockTab) {
      dockTab.classList.add(css.hidden);
    }
  }
  const message = UI_TILES_CHANGE_COMMAND(id, command);
  if (!dispatchClientPrunMessage(message)) {
    changeInputValue(input, command);
    await sleep(0);
    form.requestSubmit();
  }
  const selector = await $(window, C.Tile.selector);
  await Promise.any([
    new Promise(resolve => onNodeDisconnected(input, resolve)),
    $(selector, C.Tile.warning),
  ]);
  if (!options?.autoClose) {
    window.classList.remove(css.hidden);
    return;
  }
  void closeWhenDone(window, options);
}
async function closeWhenDone(window, options) {
  await sleep(0);
  const closeWhen = options?.closeWhen;
  if (closeWhen) {
    await watchUntil(closeWhen);
  }
  const buttons = _$$(window, C.Window.button);
  const closeButton = buttons.find(x => x.textContent === 'x');
  if (closeButton) {
    closeButton?.click();
  }
  await new Promise(resolve => onNodeDisconnected(window, resolve));
}
function setBufferSize(id, width, height) {
  dispatchClientPrunMessage(
    UI_WINDOWS_UPDATE_SIZE(
      id,
      clamp(width, 100, document.body.clientWidth - 50),
      clamp(height, 50, document.body.clientHeight - 50),
    ),
  );
}
export { setBufferSize, showBuffer };
