import { __exports as functions } from './functions2.js';
var hasRequiredFunctions;
function requireFunctions() {
  if (hasRequiredFunctions) return functions;
  hasRequiredFunctions = 1;
  Object.defineProperty(functions, '__esModule', { value: true });
  functions.createMathFunctions = function (t) {
    return {
      isDegree: true,
      acos: function (n) {
        return t.math.isDegree ? (180 / Math.PI) * Math.acos(n) : Math.acos(n);
      },
      add: function (t2, n) {
        return t2 + n;
      },
      asin: function (n) {
        return t.math.isDegree ? (180 / Math.PI) * Math.asin(n) : Math.asin(n);
      },
      atan: function (n) {
        return t.math.isDegree ? (180 / Math.PI) * Math.atan(n) : Math.atan(n);
      },
      acosh: function (t2) {
        return Math.log(t2 + Math.sqrt(t2 * t2 - 1));
      },
      asinh: function (t2) {
        return Math.log(t2 + Math.sqrt(t2 * t2 + 1));
      },
      atanh: function (t2) {
        return Math.log((1 + t2) / (1 - t2));
      },
      C: function (n, r) {
        var a = 1,
          o = n - r,
          e = r;
        e < o && ((e = o), (o = r));
        for (var u = e + 1; u <= n; u++) a *= u;
        var i = t.math.fact(o);
        return 'NaN' === i ? 'NaN' : a / i;
      },
      changeSign: function (t2) {
        return -t2;
      },
      cos: function (n) {
        return (t.math.isDegree && (n = t.math.toRadian(n)), Math.cos(n));
      },
      cosh: function (t2) {
        return (Math.pow(Math.E, t2) + Math.pow(Math.E, -1 * t2)) / 2;
      },
      div: function (t2, n) {
        return t2 / n;
      },
      fact: function (t2) {
        if (t2 % 1 != 0) return 'NaN';
        for (var n = 1, r = 2; r <= t2; r++) n *= r;
        return n;
      },
      inverse: function (t2) {
        return 1 / t2;
      },
      log: function (t2) {
        return Math.log(t2) / Math.log(10);
      },
      mod: function (t2, n) {
        return t2 % n;
      },
      mul: function (t2, n) {
        return t2 * n;
      },
      P: function (t2, n) {
        for (var r = 1, a = Math.floor(t2) - Math.floor(n) + 1; a <= Math.floor(t2); a++) r *= a;
        return r;
      },
      Pi: function (n, r, a) {
        for (var o = 1, e = n; e <= r; e++) o *= Number(t.postfixEval(a, { n: e }));
        return o;
      },
      pow10x: function (t2) {
        for (var n = 1; t2--; ) n *= 10;
        return n;
      },
      sigma: function (n, r, a) {
        for (var o = 0, e = n; e <= r; e++) o += Number(t.postfixEval(a, { n: e }));
        return o;
      },
      sin: function (n) {
        return (t.math.isDegree && (n = t.math.toRadian(n)), Math.sin(n));
      },
      sinh: function (t2) {
        return (Math.pow(Math.E, t2) - Math.pow(Math.E, -1 * t2)) / 2;
      },
      sub: function (t2, n) {
        return t2 - n;
      },
      tan: function (n) {
        return (t.math.isDegree && (n = t.math.toRadian(n)), Math.tan(n));
      },
      tanh: function (n) {
        return t.math.sinh(n) / t.math.cosh(n);
      },
      toRadian: function (t2) {
        return (t2 * Math.PI) / 180;
      },
      and: function (t2, n) {
        return t2 & n;
      },
    };
  };
  return functions;
}
export { requireFunctions as __require };
