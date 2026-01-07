import { C } from './prun-css.js';
import { _$ } from './select-dom.js';
import getMapArray from './get-map-array.js';
import { castArray } from './cast-array.js';
import onetime from './index7.js';
import { onNodeTreeMutation } from './on-node-tree-mutation.js';
import removeArrayElement from './remove-array-element.js';
import { getPrunId } from './attributes.js';
import onNodeDisconnected from './on-node-disconnected.js';
import { matchBufferSize } from './buffer-sizes.js';
import { setBufferSize } from './buffers.js';
const pastWindows = /* @__PURE__ */ new WeakSet();
const activeTiles = [];
const commandObservers = /* @__PURE__ */ new Map();
const anyCommandObservers = [];
const setupObserver = onetime(() => onNodeTreeMutation(document, reconciliate));
function reconciliate(mutations) {
  if (mutations.some(x => x.removedNodes.length > 0)) {
    for (const tile of activeTiles) {
      if (!tile.frame.isConnected) {
        deactivateTile(tile);
      }
    }
  }
  if (mutations.every(x => x.addedNodes.length === 0)) {
    return;
  }
  const frameElements = document.getElementsByClassName(C.TileFrame.frame);
  if (frameElements.length === activeTiles.length) {
    let sameTiles = true;
    for (let i = 0; i < frameElements.length; i++) {
      if (activeTiles[i].frame !== frameElements[i]) {
        sameTiles = false;
        break;
      }
    }
    if (sameTiles) {
      return;
    }
  }
  const newFrames = /* @__PURE__ */ new Set();
  for (let i = 0; i < frameElements.length; i++) {
    newFrames.add(frameElements[i]);
  }
  for (const tile of activeTiles) {
    newFrames.delete(tile.frame);
  }
  for (const frame of newFrames) {
    const anchor = _$(frame, C.TileFrame.anchor);
    if (!anchor) {
      continue;
    }
    activateFrame(frame, anchor);
  }
}
function activateFrame(frame, anchor) {
  const tileElement = frame.parentElement;
  const container = tileElement.parentElement;
  const docked = !container.classList.contains(C.Window.body);
  const id = getPrunId(tileElement);
  const commandElement = _$(frame, C.TileFrame.cmd);
  const fullCommand = commandElement.textContent.trim();
  const indexOfSpace = fullCommand.indexOf(' ');
  const tile = {
    id,
    container,
    frame,
    anchor,
    docked,
    fullCommand,
    command: (indexOfSpace > 0 ? fullCommand.slice(0, indexOfSpace) : fullCommand).toUpperCase(),
    parameter: indexOfSpace > 0 ? fullCommand.slice(indexOfSpace + 1) : void 0,
  };
  frame.classList.add(`rp-command-${tile.command}`);
  activateTile(tile);
  onNodeDisconnected(frame, () => deactivateTile(tile));
  if (!docked && !pastWindows.has(container)) {
    pastWindows.add(container);
    const size = matchBufferSize(fullCommand);
    if (size) {
      setBufferSize(id, size[0], size[1]);
    }
  }
}
function activateTile(tile) {
  if (activeTiles.includes(tile)) {
    return;
  }
  activeTiles.push(tile);
  for (const observer of getMapArray(commandObservers, tile.command)) {
    runObserver(observer, tile);
  }
  for (const observer of anyCommandObservers) {
    runObserver(observer, tile);
  }
}
function runObserver(observer, tile) {
  try {
    observer(tile);
  } catch (error) {
    console.error(error);
  }
}
function deactivateTile(tile) {
  if (!activeTiles.includes(tile)) {
    return;
  }
  removeArrayElement(activeTiles, tile);
}
function observeTiles(commands, observer) {
  setupObserver();
  for (let command of castArray(commands)) {
    command = command.toUpperCase();
    const observers = getMapArray(commandObservers, command);
    observers.push(observer);
    for (const tile of activeTiles) {
      if (tile.command === command) {
        runObserver(observer, tile);
      }
    }
  }
}
function observeAllTiles(observer) {
  setupObserver();
  anyCommandObservers.push(observer);
  for (const tile of activeTiles) {
    runObserver(observer, tile);
  }
}
function findTiles(command, ignoreCase = false) {
  return ignoreCase
    ? activeTiles.filter(tile => tile.fullCommand.toUpperCase() === command.toUpperCase())
    : activeTiles.filter(tile => tile.fullCommand === command);
}
function findByContainer(container) {
  return activeTiles.filter(tile => tile.container === container);
}
const tiles = {
  observe: observeTiles,
  observeAll: observeAllTiles,
  find: findTiles,
  findByContainer,
};
export { tiles as default };
