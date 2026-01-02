import { refAttributeValue } from './reactive-dom.js';
function getPrunId(element) {
  return element.getAttribute('data-prun-id');
}
function refPrunId(element) {
  return refAttributeValue(element, 'data-prun-id');
}
export { getPrunId, refPrunId };
