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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZnVuY3Rpb25zLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWF0aC1leHByZXNzaW9uLWV2YWx1YXRvckAyLjAuNy9ub2RlX21vZHVsZXMvbWF0aC1leHByZXNzaW9uLWV2YWx1YXRvci9kaXN0L2VzL2Z1bmN0aW9ucy5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJcInVzZSBzdHJpY3RcIjtPYmplY3QuZGVmaW5lUHJvcGVydHkoZXhwb3J0cyxcIl9fZXNNb2R1bGVcIix7dmFsdWU6ITB9KTtleHBvcnRzLmNyZWF0ZU1hdGhGdW5jdGlvbnM9ZnVuY3Rpb24odCl7cmV0dXJue2lzRGVncmVlOiEwLGFjb3M6ZnVuY3Rpb24obil7cmV0dXJuIHQubWF0aC5pc0RlZ3JlZT8xODAvTWF0aC5QSSpNYXRoLmFjb3Mobik6TWF0aC5hY29zKG4pfSxhZGQ6ZnVuY3Rpb24odCxuKXtyZXR1cm4gdCtufSxhc2luOmZ1bmN0aW9uKG4pe3JldHVybiB0Lm1hdGguaXNEZWdyZWU/MTgwL01hdGguUEkqTWF0aC5hc2luKG4pOk1hdGguYXNpbihuKX0sYXRhbjpmdW5jdGlvbihuKXtyZXR1cm4gdC5tYXRoLmlzRGVncmVlPzE4MC9NYXRoLlBJKk1hdGguYXRhbihuKTpNYXRoLmF0YW4obil9LGFjb3NoOmZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLmxvZyh0K01hdGguc3FydCh0KnQtMSkpfSxhc2luaDpmdW5jdGlvbih0KXtyZXR1cm4gTWF0aC5sb2codCtNYXRoLnNxcnQodCp0KzEpKX0sYXRhbmg6ZnVuY3Rpb24odCl7cmV0dXJuIE1hdGgubG9nKCgxK3QpLygxLXQpKX0sQzpmdW5jdGlvbihuLHIpe3ZhciBhPTEsbz1uLXIsZT1yO2U8byYmKGU9byxvPXIpO2Zvcih2YXIgdT1lKzE7dTw9bjt1KyspYSo9dTt2YXIgaT10Lm1hdGguZmFjdChvKTtyZXR1cm5cIk5hTlwiPT09aT9cIk5hTlwiOmEvaX0sY2hhbmdlU2lnbjpmdW5jdGlvbih0KXtyZXR1cm4tdH0sY29zOmZ1bmN0aW9uKG4pe3JldHVybiB0Lm1hdGguaXNEZWdyZWUmJihuPXQubWF0aC50b1JhZGlhbihuKSksTWF0aC5jb3Mobil9LGNvc2g6ZnVuY3Rpb24odCl7cmV0dXJuKE1hdGgucG93KE1hdGguRSx0KStNYXRoLnBvdyhNYXRoLkUsLTEqdCkpLzJ9LGRpdjpmdW5jdGlvbih0LG4pe3JldHVybiB0L259LGZhY3Q6ZnVuY3Rpb24odCl7aWYodCUxIT0wKXJldHVyblwiTmFOXCI7Zm9yKHZhciBuPTEscj0yO3I8PXQ7cisrKW4qPXI7cmV0dXJuIG59LGludmVyc2U6ZnVuY3Rpb24odCl7cmV0dXJuIDEvdH0sbG9nOmZ1bmN0aW9uKHQpe3JldHVybiBNYXRoLmxvZyh0KS9NYXRoLmxvZygxMCl9LG1vZDpmdW5jdGlvbih0LG4pe3JldHVybiB0JW59LG11bDpmdW5jdGlvbih0LG4pe3JldHVybiB0Km59LFA6ZnVuY3Rpb24odCxuKXtmb3IodmFyIHI9MSxhPU1hdGguZmxvb3IodCktTWF0aC5mbG9vcihuKSsxO2E8PU1hdGguZmxvb3IodCk7YSsrKXIqPWE7cmV0dXJuIHJ9LFBpOmZ1bmN0aW9uKG4scixhKXtmb3IodmFyIG89MSxlPW47ZTw9cjtlKyspbyo9TnVtYmVyKHQucG9zdGZpeEV2YWwoYSx7bjplfSkpO3JldHVybiBvfSxwb3cxMHg6ZnVuY3Rpb24odCl7Zm9yKHZhciBuPTE7dC0tOyluKj0xMDtyZXR1cm4gbn0sc2lnbWE6ZnVuY3Rpb24obixyLGEpe2Zvcih2YXIgbz0wLGU9bjtlPD1yO2UrKylvKz1OdW1iZXIodC5wb3N0Zml4RXZhbChhLHtuOmV9KSk7cmV0dXJuIG99LHNpbjpmdW5jdGlvbihuKXtyZXR1cm4gdC5tYXRoLmlzRGVncmVlJiYobj10Lm1hdGgudG9SYWRpYW4obikpLE1hdGguc2luKG4pfSxzaW5oOmZ1bmN0aW9uKHQpe3JldHVybihNYXRoLnBvdyhNYXRoLkUsdCktTWF0aC5wb3coTWF0aC5FLC0xKnQpKS8yfSxzdWI6ZnVuY3Rpb24odCxuKXtyZXR1cm4gdC1ufSx0YW46ZnVuY3Rpb24obil7cmV0dXJuIHQubWF0aC5pc0RlZ3JlZSYmKG49dC5tYXRoLnRvUmFkaWFuKG4pKSxNYXRoLnRhbihuKX0sdGFuaDpmdW5jdGlvbihuKXtyZXR1cm4gdC5tYXRoLnNpbmgobikvdC5tYXRoLmNvc2gobil9LHRvUmFkaWFuOmZ1bmN0aW9uKHQpe3JldHVybiB0Kk1hdGguUEkvMTgwfSxhbmQ6ZnVuY3Rpb24odCxuKXtyZXR1cm4gdCZufX19O1xuIl0sIm5hbWVzIjpbInQiXSwibWFwcGluZ3MiOiI7Ozs7O0FBQWEsU0FBTyxlQUFlLFdBQVEsY0FBYSxFQUFDLE9BQU0sS0FBRSxDQUFDO0FBQUUsa0NBQTRCLFNBQVMsR0FBRTtBQUFDLFdBQU0sRUFBQyxVQUFTLE1BQUcsTUFBSyxTQUFTLEdBQUU7QUFBQyxhQUFPLEVBQUUsS0FBSyxXQUFTLE1BQUksS0FBSyxLQUFHLEtBQUssS0FBSyxDQUFDLElBQUUsS0FBSyxLQUFLLENBQUM7QUFBQSxJQUFDLEdBQUUsS0FBSSxTQUFTQSxJQUFFLEdBQUU7QUFBQyxhQUFPQSxLQUFFO0FBQUEsSUFBQyxHQUFFLE1BQUssU0FBUyxHQUFFO0FBQUMsYUFBTyxFQUFFLEtBQUssV0FBUyxNQUFJLEtBQUssS0FBRyxLQUFLLEtBQUssQ0FBQyxJQUFFLEtBQUssS0FBSyxDQUFDO0FBQUEsSUFBQyxHQUFFLE1BQUssU0FBUyxHQUFFO0FBQUMsYUFBTyxFQUFFLEtBQUssV0FBUyxNQUFJLEtBQUssS0FBRyxLQUFLLEtBQUssQ0FBQyxJQUFFLEtBQUssS0FBSyxDQUFDO0FBQUEsSUFBQyxHQUFFLE9BQU0sU0FBU0EsSUFBRTtBQUFDLGFBQU8sS0FBSyxJQUFJQSxLQUFFLEtBQUssS0FBS0EsS0FBRUEsS0FBRSxDQUFDLENBQUM7QUFBQSxJQUFDLEdBQUUsT0FBTSxTQUFTQSxJQUFFO0FBQUMsYUFBTyxLQUFLLElBQUlBLEtBQUUsS0FBSyxLQUFLQSxLQUFFQSxLQUFFLENBQUMsQ0FBQztBQUFBLElBQUMsR0FBRSxPQUFNLFNBQVNBLElBQUU7QUFBQyxhQUFPLEtBQUssS0FBSyxJQUFFQSxPQUFJLElBQUVBLEdBQUU7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTLEdBQUUsR0FBRTtBQUFDLFVBQUksSUFBRSxHQUFFLElBQUUsSUFBRSxHQUFFLElBQUU7QUFBRSxVQUFFLE1BQUksSUFBRSxHQUFFLElBQUU7QUFBRyxlQUFRLElBQUUsSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLE1BQUc7QUFBRSxVQUFJLElBQUUsRUFBRSxLQUFLLEtBQUssQ0FBQztBQUFFLGFBQU0sVUFBUSxJQUFFLFFBQU0sSUFBRTtBQUFBLElBQUMsR0FBRSxZQUFXLFNBQVNBLElBQUU7QUFBQyxhQUFNLENBQUNBO0FBQUEsSUFBQyxHQUFFLEtBQUksU0FBUyxHQUFFO0FBQUMsYUFBTyxFQUFFLEtBQUssYUFBVyxJQUFFLEVBQUUsS0FBSyxTQUFTLENBQUMsSUFBRyxLQUFLLElBQUksQ0FBQztBQUFBLElBQUMsR0FBRSxNQUFLLFNBQVNBLElBQUU7QUFBQyxjQUFPLEtBQUssSUFBSSxLQUFLLEdBQUVBLEVBQUMsSUFBRSxLQUFLLElBQUksS0FBSyxHQUFFLEtBQUdBLEVBQUMsS0FBRztBQUFBLElBQUMsR0FBRSxLQUFJLFNBQVNBLElBQUUsR0FBRTtBQUFDLGFBQU9BLEtBQUU7QUFBQSxJQUFDLEdBQUUsTUFBSyxTQUFTQSxJQUFFO0FBQUMsVUFBR0EsS0FBRSxLQUFHLEVBQUUsUUFBTTtBQUFNLGVBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHQSxJQUFFLElBQUksTUFBRztBQUFFLGFBQU87QUFBQSxJQUFDLEdBQUUsU0FBUSxTQUFTQSxJQUFFO0FBQUMsYUFBTyxJQUFFQTtBQUFBLElBQUMsR0FBRSxLQUFJLFNBQVNBLElBQUU7QUFBQyxhQUFPLEtBQUssSUFBSUEsRUFBQyxJQUFFLEtBQUssSUFBSSxFQUFFO0FBQUEsSUFBQyxHQUFFLEtBQUksU0FBU0EsSUFBRSxHQUFFO0FBQUMsYUFBT0EsS0FBRTtBQUFBLElBQUMsR0FBRSxLQUFJLFNBQVNBLElBQUUsR0FBRTtBQUFDLGFBQU9BLEtBQUU7QUFBQSxJQUFDLEdBQUUsR0FBRSxTQUFTQSxJQUFFLEdBQUU7QUFBQyxlQUFRLElBQUUsR0FBRSxJQUFFLEtBQUssTUFBTUEsRUFBQyxJQUFFLEtBQUssTUFBTSxDQUFDLElBQUUsR0FBRSxLQUFHLEtBQUssTUFBTUEsRUFBQyxHQUFFLElBQUksTUFBRztBQUFFLGFBQU87QUFBQSxJQUFDLEdBQUUsSUFBRyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsZUFBUSxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsR0FBRSxJQUFJLE1BQUcsT0FBTyxFQUFFLFlBQVksR0FBRSxFQUFDLEdBQUUsRUFBQyxDQUFDLENBQUM7QUFBRSxhQUFPO0FBQUEsSUFBQyxHQUFFLFFBQU8sU0FBU0EsSUFBRTtBQUFDLGVBQVEsSUFBRSxHQUFFQSxPQUFLLE1BQUc7QUFBRyxhQUFPO0FBQUEsSUFBQyxHQUFFLE9BQU0sU0FBUyxHQUFFLEdBQUUsR0FBRTtBQUFDLGVBQVEsSUFBRSxHQUFFLElBQUUsR0FBRSxLQUFHLEdBQUUsSUFBSSxNQUFHLE9BQU8sRUFBRSxZQUFZLEdBQUUsRUFBQyxHQUFFLEVBQUMsQ0FBQyxDQUFDO0FBQUUsYUFBTztBQUFBLElBQUMsR0FBRSxLQUFJLFNBQVMsR0FBRTtBQUFDLGFBQU8sRUFBRSxLQUFLLGFBQVcsSUFBRSxFQUFFLEtBQUssU0FBUyxDQUFDLElBQUcsS0FBSyxJQUFJLENBQUM7QUFBQSxJQUFDLEdBQUUsTUFBSyxTQUFTQSxJQUFFO0FBQUMsY0FBTyxLQUFLLElBQUksS0FBSyxHQUFFQSxFQUFDLElBQUUsS0FBSyxJQUFJLEtBQUssR0FBRSxLQUFHQSxFQUFDLEtBQUc7QUFBQSxJQUFDLEdBQUUsS0FBSSxTQUFTQSxJQUFFLEdBQUU7QUFBQyxhQUFPQSxLQUFFO0FBQUEsSUFBQyxHQUFFLEtBQUksU0FBUyxHQUFFO0FBQUMsYUFBTyxFQUFFLEtBQUssYUFBVyxJQUFFLEVBQUUsS0FBSyxTQUFTLENBQUMsSUFBRyxLQUFLLElBQUksQ0FBQztBQUFBLElBQUMsR0FBRSxNQUFLLFNBQVMsR0FBRTtBQUFDLGFBQU8sRUFBRSxLQUFLLEtBQUssQ0FBQyxJQUFFLEVBQUUsS0FBSyxLQUFLLENBQUM7QUFBQSxJQUFDLEdBQUUsVUFBUyxTQUFTQSxJQUFFO0FBQUMsYUFBT0EsS0FBRSxLQUFLLEtBQUc7QUFBQSxJQUFHLEdBQUUsS0FBSSxTQUFTQSxJQUFFLEdBQUU7QUFBQyxhQUFPQSxLQUFFO0FBQUEsSUFBQyxFQUFDO0FBQUEsRUFBQzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
