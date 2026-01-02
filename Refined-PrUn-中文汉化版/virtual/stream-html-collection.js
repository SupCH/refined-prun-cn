import { onNodeTreeMutation } from './on-node-tree-mutation.js';
import { isEmpty } from './is-empty.js';
async function* streamHtmlCollection(root, elements) {
  const seenElements = /* @__PURE__ */ new WeakSet();
  for (const element of Array.from(elements)) {
    seenElements.add(element);
    yield element;
  }
  const newElements = [];
  let resolve = () => {};
  onNodeTreeMutation(root, mutations => {
    if (mutations.every(x => x.addedNodes.length === 0)) {
      return;
    }
    for (let i = 0; i < elements.length; i++) {
      const element = elements[i];
      if (!seenElements.has(element)) {
        seenElements.add(element);
        newElements.push(element);
      }
    }
    if (!isEmpty(newElements)) {
      resolve();
    }
  });
  while (true) {
    await new Promise(x => (resolve = x));
    while (!isEmpty(newElements)) {
      yield newElements.shift();
    }
  }
}
async function streamElementOfHtmlCollection(root, elements) {
  if (elements.length > 0) {
    return elements[0];
  }
  await new Promise(resolve => {
    onNodeTreeMutation(root, () => {
      if (elements.length > 0) {
        resolve();
        return true;
      }
      return false;
    });
  });
  return elements[0];
}
export { streamElementOfHtmlCollection, streamHtmlCollection };
