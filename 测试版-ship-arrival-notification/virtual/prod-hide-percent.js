import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule('PROD', `.${C.OrderStatus.inProgress}`, css.hidden);
}
features.add(import.meta.url, init, 'PROD: Hides percent value in the order list.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZC1oaWRlLXBlcmNlbnQuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9wcm9kLWhpZGUtcGVyY2VudC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoJ1BST0QnLCBgLiR7Qy5PcmRlclN0YXR1cy5pblByb2dyZXNzfWAsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnUFJPRDogSGlkZXMgcGVyY2VudCB2YWx1ZSBpbiB0aGUgb3JkZXIgbGlzdC4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxRQUFBLElBQUEsRUFBQSxZQUFBLFVBQUEsSUFBQSxJQUFBLE1BQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSw4Q0FBQTsifQ==
