import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './cxpo-bigger-buttons.module.css.js';
function init() {
  applyCssRule(
    'CXPO',
    `.${C.FormComponent.containerCommand} .${C.FormComponent.input}`,
    $style.container,
  );
}
features.add(import.meta.url, init, 'CXPO: Makes "Buy" and "Sell" buttons bigger.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY3hwby1iaWdnZXItYnV0dG9ucy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2N4cG8tYmlnZ2VyLWJ1dHRvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL2N4cG8tYmlnZ2VyLWJ1dHRvbnMubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShcbiAgICAnQ1hQTycsXG4gICAgYC4ke0MuRm9ybUNvbXBvbmVudC5jb250YWluZXJDb21tYW5kfSAuJHtDLkZvcm1Db21wb25lbnQuaW5wdXR9YCxcbiAgICAkc3R5bGUuY29udGFpbmVyLFxuICApO1xufVxuXG5mZWF0dXJlcy5hZGQoaW1wb3J0Lm1ldGEudXJsLCBpbml0LCAnQ1hQTzogTWFrZXMgXCJCdXlcIiBhbmQgXCJTZWxsXCIgYnV0dG9ucyBiaWdnZXIuJyk7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7OztBQUVBLFNBQUEsT0FBQTtBQUNFO0FBQUEsSUFBQTtBQUFBLElBQ0UsSUFBQSxFQUFBLGNBQUEsZ0JBQUEsS0FBQSxFQUFBLGNBQUEsS0FBQTtBQUFBLElBQzhELE9BQUE7QUFBQSxFQUN2RDtBQUVYO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLDhDQUFBOyJ9
