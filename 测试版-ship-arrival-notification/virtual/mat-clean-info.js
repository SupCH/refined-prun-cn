import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(
    'MAT',
    `.${C.MaterialInformation.container} > .${C.FormComponent.containerPassive}:nth-child(2)`,
    css.hidden,
  );
  applyCssRule(
    'MAT',
    `.${C.MaterialInformation.container} > .${C.FormComponent.containerPassive}:nth-child(6)`,
    css.hidden,
  );
}
features.add(import.meta.url, init, 'MAT: Hides "Ticker" and "Natural resource" fields.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWF0LWNsZWFuLWluZm8uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9tYXQtY2xlYW4taW5mby50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoXG4gICAgJ01BVCcsXG4gICAgYC4ke0MuTWF0ZXJpYWxJbmZvcm1hdGlvbi5jb250YWluZXJ9ID4gLiR7Qy5Gb3JtQ29tcG9uZW50LmNvbnRhaW5lclBhc3NpdmV9Om50aC1jaGlsZCgyKWAsXG4gICAgY3NzLmhpZGRlbixcbiAgKTtcbiAgYXBwbHlDc3NSdWxlKFxuICAgICdNQVQnLFxuICAgIGAuJHtDLk1hdGVyaWFsSW5mb3JtYXRpb24uY29udGFpbmVyfSA+IC4ke0MuRm9ybUNvbXBvbmVudC5jb250YWluZXJQYXNzaXZlfTpudGgtY2hpbGQoNilgLFxuICAgIGNzcy5oaWRkZW4sXG4gICk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdNQVQ6IEhpZGVzIFwiVGlja2VyXCIgYW5kIFwiTmF0dXJhbCByZXNvdXJjZVwiIGZpZWxkcy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0U7QUFBQSxJQUFBO0FBQUEsSUFDRSxJQUFBLEVBQUEsb0JBQUEsU0FBQSxPQUFBLEVBQUEsY0FBQSxnQkFBQTtBQUFBLElBQzBFLElBQUE7QUFBQSxFQUN0RTtBQUVOO0FBQUEsSUFBQTtBQUFBLElBQ0UsSUFBQSxFQUFBLG9CQUFBLFNBQUEsT0FBQSxFQUFBLGNBQUEsZ0JBQUE7QUFBQSxJQUMwRSxJQUFBO0FBQUEsRUFDdEU7QUFFUjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxvREFBQTsifQ==
