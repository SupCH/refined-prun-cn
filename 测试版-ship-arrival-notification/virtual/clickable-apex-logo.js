import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import { subscribe } from './subscribe-async-generator.js';
import { $$ } from './select-dom.js';
import features from './feature-registry.js';
import $style from './clickable-apex-logo.module.css.js';
import { companyStore } from './company.js';
import { showBuffer } from './buffers.js';
function init() {
  applyCssRule(`.${C.Frame.logo}`, $style.logo);
  subscribe($$(document, C.Frame.logo), logo => {
    logo.addEventListener('click', () => showBuffer(`CO ${companyStore.value?.code}`));
  });
}
features.add(
  import.meta.url,
  init,
  'Makes the APEX logo clickable and leading to the user company info screen.',
);
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2xpY2thYmxlLWFwZXgtbG9nby5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2NsaWNrYWJsZS1hcGV4LWxvZ28udHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL2NsaWNrYWJsZS1hcGV4LWxvZ28ubW9kdWxlLmNzcyc7XG5pbXBvcnQgeyBjb21wYW55U3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY29tcGFueSc7XG5pbXBvcnQgeyBzaG93QnVmZmVyIH0gZnJvbSAnQHNyYy9pbmZyYXN0cnVjdHVyZS9wcnVuLXVpL2J1ZmZlcnMnO1xuXG5mdW5jdGlvbiBpbml0KCkge1xuICBhcHBseUNzc1J1bGUoYC4ke0MuRnJhbWUubG9nb31gLCAkc3R5bGUubG9nbyk7XG4gIHN1YnNjcmliZSgkJChkb2N1bWVudCwgQy5GcmFtZS5sb2dvKSwgbG9nbyA9PiB7XG4gICAgbG9nby5hZGRFdmVudExpc3RlbmVyKCdjbGljaycsICgpID0+IHNob3dCdWZmZXIoYENPICR7Y29tcGFueVN0b3JlLnZhbHVlPy5jb2RlfWApKTtcbiAgfSk7XG59XG5cbmZlYXR1cmVzLmFkZChcbiAgaW1wb3J0Lm1ldGEudXJsLFxuICBpbml0LFxuICAnTWFrZXMgdGhlIEFQRVggbG9nbyBjbGlja2FibGUgYW5kIGxlYWRpbmcgdG8gdGhlIHVzZXIgY29tcGFueSBpbmZvIHNjcmVlbi4nLFxuKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7OztBQUlBLFNBQUEsT0FBQTtBQUNFLGVBQUEsSUFBQSxFQUFBLE1BQUEsSUFBQSxJQUFBLE9BQUEsSUFBQTtBQUNBLFlBQUEsR0FBQSxVQUFBLEVBQUEsTUFBQSxJQUFBLEdBQUEsQ0FBQSxTQUFBO0FBQ0UsU0FBQSxpQkFBQSxTQUFBLE1BQUEsV0FBQSxNQUFBLGFBQUEsT0FBQSxJQUFBLEVBQUEsQ0FBQTtBQUFBLEVBQWlGLENBQUE7QUFFckY7QUFFQSxTQUFBO0FBQUEsRUFBUyxZQUFBO0FBQUEsRUFDSztBQUFBLEVBQ1o7QUFFRjsifQ==
