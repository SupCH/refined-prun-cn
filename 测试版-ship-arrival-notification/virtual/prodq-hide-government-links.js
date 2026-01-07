import { applyCssRule } from './refined-prun-css.js';
import { C } from './prun-css.js';
import features from './feature-registry.js';
import css from './css-utils.module.css.js';
function init() {
  applyCssRule(
    'PRODQ',
    `.${C.ProductionQueue.table} tbody tr td:nth-child(3) .${C.Link.link}`,
    css.hidden,
  );
}
features.add(import.meta.url, init, 'PRODQ: Hides fee collector links.');
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHEtaGlkZS1nb3Zlcm5tZW50LWxpbmtzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvYWR2YW5jZWQvcHJvZHEtaGlkZS1nb3Zlcm5tZW50LWxpbmtzLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImltcG9ydCBjc3MgZnJvbSAnQHNyYy91dGlscy9jc3MtdXRpbHMubW9kdWxlLmNzcyc7XG5cbmZ1bmN0aW9uIGluaXQoKSB7XG4gIGFwcGx5Q3NzUnVsZShcbiAgICAnUFJPRFEnLFxuICAgIGAuJHtDLlByb2R1Y3Rpb25RdWV1ZS50YWJsZX0gdGJvZHkgdHIgdGQ6bnRoLWNoaWxkKDMpIC4ke0MuTGluay5saW5rfWAsXG4gICAgY3NzLmhpZGRlbixcbiAgKTtcbn1cblxuZmVhdHVyZXMuYWRkKGltcG9ydC5tZXRhLnVybCwgaW5pdCwgJ1BST0RROiBIaWRlcyBmZWUgY29sbGVjdG9yIGxpbmtzLicpO1xuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7QUFFQSxTQUFBLE9BQUE7QUFDRTtBQUFBLElBQUE7QUFBQSxJQUNFLElBQUEsRUFBQSxnQkFBQSxLQUFBLDhCQUFBLEVBQUEsS0FBQSxJQUFBO0FBQUEsSUFDb0UsSUFBQTtBQUFBLEVBQ2hFO0FBRVI7QUFFQSxTQUFBLElBQUEsWUFBQSxLQUFBLE1BQUEsbUNBQUE7In0=
