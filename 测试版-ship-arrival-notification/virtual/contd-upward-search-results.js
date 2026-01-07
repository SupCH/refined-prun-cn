import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './contd-upward-search-results.module.css.js';
function init() {
  applyCssRule('CONTD', `.${C.UserSelector.suggestionsContainer}`, $style.suggestions);
}
features.add(import.meta.url, init, 'CONTD: Moves the search bar results above the search bar.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29udGQtdXB3YXJkLXNlYXJjaC1yZXN1bHRzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvY29udGQtdXB3YXJkLXNlYXJjaC1yZXN1bHRzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9jb250ZC11cHdhcmQtc2VhcmNoLXJlc3VsdHMubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZSgnQ09OVEQnLCBgLiR7Qy5Vc2VyU2VsZWN0b3Iuc3VnZ2VzdGlvbnNDb250YWluZXJ9YCwgJHN0eWxlLnN1Z2dlc3Rpb25zKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ0NPTlREOiBNb3ZlcyB0aGUgc2VhcmNoIGJhciByZXN1bHRzIGFib3ZlIHRoZSBzZWFyY2ggYmFyLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxTQUFBLE9BQUE7QUFDRSxlQUFBLFNBQUEsSUFBQSxFQUFBLGFBQUEsb0JBQUEsSUFBQSxPQUFBLFdBQUE7QUFDRjtBQUVBLFNBQUEsSUFBQSxZQUFBLEtBQUEsTUFBQSwyREFBQTsifQ==
