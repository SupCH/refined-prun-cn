import { applyCssRule } from './refined-prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(['FLT', 'FLTS', 'FLTP'], 'tr > :first-child', css.hidden);
}
features.add(import.meta.url, init, 'FLT: Hides the "Transponder" column.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmx0LWhpZGUtdHJhbnNwb25kZXIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9mZWF0dXJlcy9hZHZhbmNlZC9mbHQtaGlkZS10cmFuc3BvbmRlci50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoWydGTFQnLCAnRkxUUycsICdGTFRQJ10sICd0ciA+IDpmaXJzdC1jaGlsZCcsIGNzcy5oaWRkZW4pO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnRkxUOiBIaWRlcyB0aGUgXCJUcmFuc3BvbmRlclwiIGNvbHVtbi4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7QUFFQSxTQUFBLE9BQUE7QUFDRSxlQUFBLENBQUEsT0FBQSxRQUFBLE1BQUEsR0FBQSxxQkFBQSxJQUFBLE1BQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSxzQ0FBQTsifQ==
