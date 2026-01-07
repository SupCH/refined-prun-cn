import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import $style from './item-ticker-shadow.module.css.js';
function init() {
  applyCssRule(`.${C.ColoredIcon.label}`, $style.shadow);
  applyCssRule(`.${C.BuildingIcon.ticker}`, $style.shadow);
}
features.add(import.meta.url, init, 'Adds a shadow to item tickers.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXRlbS10aWNrZXItc2hhZG93LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYmFzaWMvaXRlbS10aWNrZXItc2hhZG93LnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCAkc3R5bGUgZnJvbSAnLi9pdGVtLXRpY2tlci1zaGFkb3cubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShgLiR7Qy5Db2xvcmVkSWNvbi5sYWJlbH1gLCAkc3R5bGUuc2hhZG93KTtcbiAgYXBwbHlDc3NSdWxlKGAuJHtDLkJ1aWxkaW5nSWNvbi50aWNrZXJ9YCwgJHN0eWxlLnNoYWRvdyk7XG59XG5cbmZlYXR1cmVzLmFkZChpbXBvcnQubWV0YS51cmwsIGluaXQsICdBZGRzIGEgc2hhZG93IHRvIGl0ZW0gdGlja2Vycy4nKTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7O0FBRUEsU0FBQSxPQUFBO0FBQ0UsZUFBQSxJQUFBLEVBQUEsWUFBQSxLQUFBLElBQUEsT0FBQSxNQUFBO0FBQ0EsZUFBQSxJQUFBLEVBQUEsYUFBQSxNQUFBLElBQUEsT0FBQSxNQUFBO0FBQ0Y7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsZ0NBQUE7In0=
