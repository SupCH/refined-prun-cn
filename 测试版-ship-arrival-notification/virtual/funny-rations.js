import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './funny-rations.module.css.js';
import css from './css-utils.module.css.js';
function applyFunny() {
  const today = /* @__PURE__ */ new Date();
  if (today.getDate() === 1 && today.getMonth() === 3) {
    document.body.classList.add($style.funny);
  } else {
    document.body.classList.remove($style.funny);
  }
}
function init() {
  setInterval(applyFunny, 6e4);
  applyCssRule(`.${$style.funny} .rp-ticker-RAT.${C.ColoredIcon.container}:before`, css.hidden);
  applyCssRule(`.${$style.funny} .rp-ticker-RAT .${C.ColoredIcon.label}`, css.hidden);
  applyCssRule(
    `.${$style.funny} .rp-ticker-RAT .${C.ColoredIcon.labelContainer}:after`,
    $style.rat,
  );
}
features.add(import.meta.url, init, "I've heard a squeak.");
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVubnktcmF0aW9ucy5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2Z1bm55LXJhdGlvbnMudHMiXSwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0ICRzdHlsZSBmcm9tICcuL2Z1bm55LXJhdGlvbnMubW9kdWxlLmNzcyc7XG5pbXBvcnQgY3NzIGZyb20gJ0BzcmMvdXRpbHMvY3NzLXV0aWxzLm1vZHVsZS5jc3MnO1xuXG5mdW5jdGlvbiBhcHBseUZ1bm55KCkge1xuICBjb25zdCB0b2RheSA9IG5ldyBEYXRlKCk7XG4gIGlmICh0b2RheS5nZXREYXRlKCkgPT09IDEgJiYgdG9kYXkuZ2V0TW9udGgoKSA9PT0gMykge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LmFkZCgkc3R5bGUuZnVubnkpO1xuICB9IGVsc2Uge1xuICAgIGRvY3VtZW50LmJvZHkuY2xhc3NMaXN0LnJlbW92ZSgkc3R5bGUuZnVubnkpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIHNldEludGVydmFsKGFwcGx5RnVubnksIDYwMDAwKTtcblxuICBhcHBseUNzc1J1bGUoYC4keyRzdHlsZS5mdW5ueX0gLnJwLXRpY2tlci1SQVQuJHtDLkNvbG9yZWRJY29uLmNvbnRhaW5lcn06YmVmb3JlYCwgY3NzLmhpZGRlbik7XG4gIGFwcGx5Q3NzUnVsZShgLiR7JHN0eWxlLmZ1bm55fSAucnAtdGlja2VyLVJBVCAuJHtDLkNvbG9yZWRJY29uLmxhYmVsfWAsIGNzcy5oaWRkZW4pO1xuICBhcHBseUNzc1J1bGUoXG4gICAgYC4keyRzdHlsZS5mdW5ueX0gLnJwLXRpY2tlci1SQVQgLiR7Qy5Db2xvcmVkSWNvbi5sYWJlbENvbnRhaW5lcn06YWZ0ZXJgLFxuICAgICRzdHlsZS5yYXQsXG4gICk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsIFwiSSd2ZSBoZWFyZCBhIHNxdWVhay5cIik7XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7Ozs7QUFHQSxTQUFBLGFBQUE7QUFDRSxRQUFBLFFBQUEsb0JBQUEsS0FBQTtBQUNBLE1BQUEsTUFBQSxjQUFBLEtBQUEsTUFBQSxTQUFBLE1BQUEsR0FBQTtBQUNFLGFBQUEsS0FBQSxVQUFBLElBQUEsT0FBQSxLQUFBO0FBQUEsRUFBd0MsT0FBQTtBQUV4QyxhQUFBLEtBQUEsVUFBQSxPQUFBLE9BQUEsS0FBQTtBQUFBLEVBQTJDO0FBRS9DO0FBRUEsU0FBQSxPQUFBO0FBQ0UsY0FBQSxZQUFBLEdBQUE7QUFFQSxlQUFBLElBQUEsT0FBQSxLQUFBLG1CQUFBLEVBQUEsWUFBQSxTQUFBLFdBQUEsSUFBQSxNQUFBO0FBQ0EsZUFBQSxJQUFBLE9BQUEsS0FBQSxvQkFBQSxFQUFBLFlBQUEsS0FBQSxJQUFBLElBQUEsTUFBQTtBQUNBO0FBQUEsSUFBQSxJQUFBLE9BQUEsS0FBQSxvQkFBQSxFQUFBLFlBQUEsY0FBQTtBQUFBLElBQ2tFLE9BQUE7QUFBQSxFQUN6RDtBQUVYO0FBRUEsU0FBQSxJQUFBLFlBQUEsS0FBQSxNQUFBLHNCQUFBOyJ9
