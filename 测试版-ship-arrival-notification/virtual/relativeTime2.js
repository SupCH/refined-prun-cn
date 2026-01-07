import { __module as relativeTime$1 } from './relativeTime3.js';
var relativeTime = relativeTime$1.exports;
var hasRequiredRelativeTime;
function requireRelativeTime() {
  if (hasRequiredRelativeTime) return relativeTime$1.exports;
  hasRequiredRelativeTime = 1;
  (function (module, exports$1) {
    !(function (r, e) {
      module.exports = e();
    })(relativeTime, function () {
      return function (r, e, t) {
        r = r || {};
        var n = e.prototype,
          o = {
            future: 'in %s',
            past: '%s ago',
            s: 'a few seconds',
            m: 'a minute',
            mm: '%d minutes',
            h: 'an hour',
            hh: '%d hours',
            d: 'a day',
            dd: '%d days',
            M: 'a month',
            MM: '%d months',
            y: 'a year',
            yy: '%d years',
          };
        function i(r2, e2, t2, o2) {
          return n.fromToBase(r2, e2, t2, o2);
        }
        ((t.en.relativeTime = o),
          (n.fromToBase = function (e2, n2, i2, d2, u) {
            for (
              var f,
                a,
                s,
                l = i2.$locale().relativeTime || o,
                h = r.thresholds || [
                  { l: 's', r: 44, d: 'second' },
                  { l: 'm', r: 89 },
                  { l: 'mm', r: 44, d: 'minute' },
                  { l: 'h', r: 89 },
                  { l: 'hh', r: 21, d: 'hour' },
                  { l: 'd', r: 35 },
                  { l: 'dd', r: 25, d: 'day' },
                  { l: 'M', r: 45 },
                  { l: 'MM', r: 10, d: 'month' },
                  { l: 'y', r: 17 },
                  { l: 'yy', d: 'year' },
                ],
                m = h.length,
                c = 0;
              c < m;
              c += 1
            ) {
              var y = h[c];
              y.d && (f = d2 ? t(e2).diff(i2, y.d, true) : i2.diff(e2, y.d, true));
              var p = (r.rounding || Math.round)(Math.abs(f));
              if (((s = f > 0), p <= y.r || !y.r)) {
                p <= 1 && c > 0 && (y = h[c - 1]);
                var v = l[y.l];
                (u && (p = u('' + p)),
                  (a = 'string' == typeof v ? v.replace('%d', p) : v(p, n2, y.l, s)));
                break;
              }
            }
            if (n2) return a;
            var M = s ? l.future : l.past;
            return 'function' == typeof M ? M(a) : M.replace('%s', a);
          }),
          (n.to = function (r2, e2) {
            return i(r2, e2, this, true);
          }),
          (n.from = function (r2, e2) {
            return i(r2, e2, this);
          }));
        var d = function (r2) {
          return r2.$u ? t.utc() : t();
        };
        ((n.toNow = function (r2) {
          return this.to(d(this), r2);
        }),
          (n.fromNow = function (r2) {
            return this.from(d(this), r2);
          }));
      };
    });
  })(relativeTime$1);
  return relativeTime$1.exports;
}
export { requireRelativeTime as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicmVsYXRpdmVUaW1lMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RheWpzQDEuMTEuMTgvbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9yZWxhdGl2ZVRpbWUuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKHIsZSl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9ZSgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUoZSk6KHI9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczpyfHxzZWxmKS5kYXlqc19wbHVnaW5fcmVsYXRpdmVUaW1lPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24ocixlLHQpe3I9cnx8e307dmFyIG49ZS5wcm90b3R5cGUsbz17ZnV0dXJlOlwiaW4gJXNcIixwYXN0OlwiJXMgYWdvXCIsczpcImEgZmV3IHNlY29uZHNcIixtOlwiYSBtaW51dGVcIixtbTpcIiVkIG1pbnV0ZXNcIixoOlwiYW4gaG91clwiLGhoOlwiJWQgaG91cnNcIixkOlwiYSBkYXlcIixkZDpcIiVkIGRheXNcIixNOlwiYSBtb250aFwiLE1NOlwiJWQgbW9udGhzXCIseTpcImEgeWVhclwiLHl5OlwiJWQgeWVhcnNcIn07ZnVuY3Rpb24gaShyLGUsdCxvKXtyZXR1cm4gbi5mcm9tVG9CYXNlKHIsZSx0LG8pfXQuZW4ucmVsYXRpdmVUaW1lPW8sbi5mcm9tVG9CYXNlPWZ1bmN0aW9uKGUsbixpLGQsdSl7Zm9yKHZhciBmLGEscyxsPWkuJGxvY2FsZSgpLnJlbGF0aXZlVGltZXx8byxoPXIudGhyZXNob2xkc3x8W3tsOlwic1wiLHI6NDQsZDpcInNlY29uZFwifSx7bDpcIm1cIixyOjg5fSx7bDpcIm1tXCIscjo0NCxkOlwibWludXRlXCJ9LHtsOlwiaFwiLHI6ODl9LHtsOlwiaGhcIixyOjIxLGQ6XCJob3VyXCJ9LHtsOlwiZFwiLHI6MzV9LHtsOlwiZGRcIixyOjI1LGQ6XCJkYXlcIn0se2w6XCJNXCIscjo0NX0se2w6XCJNTVwiLHI6MTAsZDpcIm1vbnRoXCJ9LHtsOlwieVwiLHI6MTd9LHtsOlwieXlcIixkOlwieWVhclwifV0sbT1oLmxlbmd0aCxjPTA7YzxtO2MrPTEpe3ZhciB5PWhbY107eS5kJiYoZj1kP3QoZSkuZGlmZihpLHkuZCwhMCk6aS5kaWZmKGUseS5kLCEwKSk7dmFyIHA9KHIucm91bmRpbmd8fE1hdGgucm91bmQpKE1hdGguYWJzKGYpKTtpZihzPWY+MCxwPD15LnJ8fCF5LnIpe3A8PTEmJmM+MCYmKHk9aFtjLTFdKTt2YXIgdj1sW3kubF07dSYmKHA9dShcIlwiK3ApKSxhPVwic3RyaW5nXCI9PXR5cGVvZiB2P3YucmVwbGFjZShcIiVkXCIscCk6dihwLG4seS5sLHMpO2JyZWFrfX1pZihuKXJldHVybiBhO3ZhciBNPXM/bC5mdXR1cmU6bC5wYXN0O3JldHVyblwiZnVuY3Rpb25cIj09dHlwZW9mIE0/TShhKTpNLnJlcGxhY2UoXCIlc1wiLGEpfSxuLnRvPWZ1bmN0aW9uKHIsZSl7cmV0dXJuIGkocixlLHRoaXMsITApfSxuLmZyb209ZnVuY3Rpb24ocixlKXtyZXR1cm4gaShyLGUsdGhpcyl9O3ZhciBkPWZ1bmN0aW9uKHIpe3JldHVybiByLiR1P3QudXRjKCk6dCgpfTtuLnRvTm93PWZ1bmN0aW9uKHIpe3JldHVybiB0aGlzLnRvKGQodGhpcykscil9LG4uZnJvbU5vdz1mdW5jdGlvbihyKXtyZXR1cm4gdGhpcy5mcm9tKGQodGhpcykscil9fX0pKTsiXSwibmFtZXMiOlsidGhpcyIsInIiLCJlIiwidCIsIm8iLCJuIiwiaSIsImQiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFDLFNBQVMsR0FBRSxHQUFFO0FBQXNELGFBQUEsVUFBZSxFQUFDO0FBQUEsSUFBc0ksR0FBRUEsZUFBTSxXQUFVO0FBQWMsYUFBTyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsWUFBRSxLQUFHLENBQUE7QUFBRyxZQUFJLElBQUUsRUFBRSxXQUFVLElBQUUsRUFBQyxRQUFPLFNBQVEsTUFBSyxVQUFTLEdBQUUsaUJBQWdCLEdBQUUsWUFBVyxJQUFHLGNBQWEsR0FBRSxXQUFVLElBQUcsWUFBVyxHQUFFLFNBQVEsSUFBRyxXQUFVLEdBQUUsV0FBVSxJQUFHLGFBQVksR0FBRSxVQUFTLElBQUcsV0FBVTtBQUFFLGlCQUFTLEVBQUVDLElBQUVDLElBQUVDLElBQUVDLElBQUU7QUFBQyxpQkFBTyxFQUFFLFdBQVdILElBQUVDLElBQUVDLElBQUVDLEVBQUM7QUFBQSxRQUFDO0FBQUMsVUFBRSxHQUFHLGVBQWEsR0FBRSxFQUFFLGFBQVcsU0FBU0YsSUFBRUcsSUFBRUMsSUFBRUMsSUFBRSxHQUFFO0FBQUMsbUJBQVEsR0FBRSxHQUFFLEdBQUUsSUFBRUQsR0FBRSxRQUFPLEVBQUcsZ0JBQWMsR0FBRSxJQUFFLEVBQUUsY0FBWSxDQUFDLEVBQUMsR0FBRSxLQUFJLEdBQUUsSUFBRyxHQUFFLFNBQVEsR0FBRSxFQUFDLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxFQUFDLEdBQUUsTUFBSyxHQUFFLElBQUcsR0FBRSxTQUFRLEdBQUUsRUFBQyxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsRUFBQyxHQUFFLE1BQUssR0FBRSxJQUFHLEdBQUUsT0FBTSxHQUFFLEVBQUMsR0FBRSxLQUFJLEdBQUUsR0FBRSxHQUFFLEVBQUMsR0FBRSxNQUFLLEdBQUUsSUFBRyxHQUFFLE1BQUssR0FBRSxFQUFDLEdBQUUsS0FBSSxHQUFFLEdBQUUsR0FBRSxFQUFDLEdBQUUsTUFBSyxHQUFFLElBQUcsR0FBRSxRQUFPLEdBQUUsRUFBQyxHQUFFLEtBQUksR0FBRSxHQUFFLEdBQUUsRUFBQyxHQUFFLE1BQUssR0FBRSxPQUFNLENBQUMsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFFLEdBQUUsSUFBRSxHQUFFLEtBQUcsR0FBRTtBQUFDLGdCQUFJLElBQUUsRUFBRSxDQUFDO0FBQUUsY0FBRSxNQUFJLElBQUVDLEtBQUUsRUFBRUwsRUFBQyxFQUFFLEtBQUtJLElBQUUsRUFBRSxHQUFFLElBQUUsSUFBRUEsR0FBRSxLQUFLSixJQUFFLEVBQUUsR0FBRSxJQUFFO0FBQUcsZ0JBQUksS0FBRyxFQUFFLFlBQVUsS0FBSyxPQUFPLEtBQUssSUFBSSxDQUFDLENBQUM7QUFBRSxnQkFBRyxJQUFFLElBQUUsR0FBRSxLQUFHLEVBQUUsS0FBRyxDQUFDLEVBQUUsR0FBRTtBQUFDLG1CQUFHLEtBQUcsSUFBRSxNQUFJLElBQUUsRUFBRSxJQUFFLENBQUM7QUFBRyxrQkFBSSxJQUFFLEVBQUUsRUFBRSxDQUFDO0FBQUUsb0JBQUksSUFBRSxFQUFFLEtBQUcsQ0FBQyxJQUFHLElBQUUsWUFBVSxPQUFPLElBQUUsRUFBRSxRQUFRLE1BQUssQ0FBQyxJQUFFLEVBQUUsR0FBRUcsSUFBRSxFQUFFLEdBQUUsQ0FBQztBQUFFO0FBQUEsWUFBSztBQUFBLFVBQUM7QUFBQyxjQUFHQSxHQUFFLFFBQU87QUFBRSxjQUFJLElBQUUsSUFBRSxFQUFFLFNBQU8sRUFBRTtBQUFLLGlCQUFNLGNBQVksT0FBTyxJQUFFLEVBQUUsQ0FBQyxJQUFFLEVBQUUsUUFBUSxNQUFLLENBQUM7QUFBQSxRQUFDLEdBQUUsRUFBRSxLQUFHLFNBQVNKLElBQUVDLElBQUU7QUFBQyxpQkFBTyxFQUFFRCxJQUFFQyxJQUFFLE1BQUssSUFBRTtBQUFBLFFBQUMsR0FBRSxFQUFFLE9BQUssU0FBU0QsSUFBRUMsSUFBRTtBQUFDLGlCQUFPLEVBQUVELElBQUVDLElBQUUsSUFBSTtBQUFBLFFBQUM7QUFBRSxZQUFJLElBQUUsU0FBU0QsSUFBRTtBQUFDLGlCQUFPQSxHQUFFLEtBQUcsRUFBRSxJQUFHLElBQUcsRUFBQztBQUFBLFFBQUU7QUFBRSxVQUFFLFFBQU0sU0FBU0EsSUFBRTtBQUFDLGlCQUFPLEtBQUssR0FBRyxFQUFFLElBQUksR0FBRUEsRUFBQztBQUFBLFFBQUMsR0FBRSxFQUFFLFVBQVEsU0FBU0EsSUFBRTtBQUFDLGlCQUFPLEtBQUssS0FBSyxFQUFFLElBQUksR0FBRUEsRUFBQztBQUFBLFFBQUM7QUFBQSxNQUFDO0FBQUEsSUFBQzs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
