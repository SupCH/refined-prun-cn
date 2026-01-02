import { streamElementOfHtmlCollection, streamHtmlCollection } from './stream-html-collection.js';
function getElementByClassNameOrTag(baseElement, selector) {
  const collection = getHtmlCollection(baseElement, selector);
  return collection.length === 0 ? void 0 : collection[0];
}
async function streamElementByClassNameOrTag(baseElement, selector) {
  const collection = getHtmlCollection(baseElement, selector);
  return await streamElementOfHtmlCollection(baseElement, collection);
}
function getElementsByClassNameOrTag(baseElement, selector) {
  const collection = getHtmlCollection(baseElement, selector);
  return Array.from(collection);
}
function streamElementsByClassNameOrTag(baseElement, selector) {
  const collection = getHtmlCollection(baseElement, selector);
  return {
    [Symbol.asyncIterator]() {
      return streamHtmlCollection(baseElement, collection);
    },
  };
}
const tagNames = /* @__PURE__ */ new Set([
  'div',
  'input',
  'span',
  'table',
  'thead',
  'tbody',
  'td',
  'tr',
  'th',
  'button',
  'progress',
  'style',
  'option',
  'select',
]);
const classNames = /* @__PURE__ */ new Set(['rc-slider-handle', 'rc-slider-mark-text']);
function registerClassName(className) {
  classNames.add(className);
}
function getHtmlCollection(baseElement, selector) {
  if (classNames.has(selector)) {
    return baseElement.getElementsByClassName(selector);
  }
  if (tagNames.has(selector)) {
    return baseElement.getElementsByTagName(selector);
  }
  if (isValidTag(selector)) {
    tagNames.add(selector);
  } else {
    classNames.add(selector);
  }
  return getHtmlCollection(baseElement, selector);
}
function isValidTag(name) {
  try {
    return document.createElement(name).constructor.name !== 'HTMLUnknownElement';
  } catch {
    return false;
  }
}
const $ = streamElementByClassNameOrTag;
const _$ = getElementByClassNameOrTag;
const $$ = streamElementsByClassNameOrTag;
const _$$ = getElementsByClassNameOrTag;
export {
  $,
  $$,
  _$,
  _$$,
  getElementByClassNameOrTag,
  getElementsByClassNameOrTag,
  registerClassName,
  streamElementByClassNameOrTag,
  streamElementsByClassNameOrTag,
};
