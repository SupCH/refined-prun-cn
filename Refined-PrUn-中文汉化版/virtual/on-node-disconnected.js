import onetime from './index6.js';
import { onNodeTreeMutation } from './on-node-tree-mutation.js';
let elements = [];
function onNodeDisconnected(node, callback) {
  if (!node.isConnected) {
    callback();
    return;
  }
  setupObserver();
  elements.push([node, callback]);
}
const setupObserver = onetime(() => onNodeTreeMutation(document, checkConnected));
function checkConnected(mutations) {
  if (mutations.every(x => x.removedNodes.length === 0)) {
    return;
  }
  const currentElements = elements;
  elements = [];
  for (const element of currentElements) {
    if (element[0].isConnected) {
      elements.push(element);
      continue;
    }
    try {
      element[1]();
    } catch (e) {
      console.error(e);
    }
  }
}
export { onNodeDisconnected as default };
