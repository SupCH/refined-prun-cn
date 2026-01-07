import { __module as dayjs_min$1 } from './dayjs.min3.js';
var dayjs_min = dayjs_min$1.exports;
var hasRequiredDayjs_min;
function requireDayjs_min() {
  if (hasRequiredDayjs_min) return dayjs_min$1.exports;
  hasRequiredDayjs_min = 1;
  (function (module, exports$1) {
    !(function (t, e) {
      module.exports = e();
    })(dayjs_min, function () {
      var t = 1e3,
        e = 6e4,
        n = 36e5,
        r = 'millisecond',
        i = 'second',
        s = 'minute',
        u = 'hour',
        a = 'day',
        o = 'week',
        c = 'month',
        f = 'quarter',
        h = 'year',
        d = 'date',
        l = 'Invalid Date',
        $ =
          /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/,
        y = /\[([^\]]+)]|Y{1,4}|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g,
        M = {
          name: 'en',
          weekdays: 'Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday'.split('_'),
          months:
            'January_February_March_April_May_June_July_August_September_October_November_December'.split(
              '_',
            ),
          ordinal: function (t2) {
            var e2 = ['th', 'st', 'nd', 'rd'],
              n2 = t2 % 100;
            return '[' + t2 + (e2[(n2 - 20) % 10] || e2[n2] || e2[0]) + ']';
          },
        },
        m = function (t2, e2, n2) {
          var r2 = String(t2);
          return !r2 || r2.length >= e2 ? t2 : '' + Array(e2 + 1 - r2.length).join(n2) + t2;
        },
        v = {
          s: m,
          z: function (t2) {
            var e2 = -t2.utcOffset(),
              n2 = Math.abs(e2),
              r2 = Math.floor(n2 / 60),
              i2 = n2 % 60;
            return (e2 <= 0 ? '+' : '-') + m(r2, 2, '0') + ':' + m(i2, 2, '0');
          },
          m: function t2(e2, n2) {
            if (e2.date() < n2.date()) return -t2(n2, e2);
            var r2 = 12 * (n2.year() - e2.year()) + (n2.month() - e2.month()),
              i2 = e2.clone().add(r2, c),
              s2 = n2 - i2 < 0,
              u2 = e2.clone().add(r2 + (s2 ? -1 : 1), c);
            return +(-(r2 + (n2 - i2) / (s2 ? i2 - u2 : u2 - i2)) || 0);
          },
          a: function (t2) {
            return t2 < 0 ? Math.ceil(t2) || 0 : Math.floor(t2);
          },
          p: function (t2) {
            return (
              { M: c, y: h, w: o, d: a, D: d, h: u, m: s, s: i, ms: r, Q: f }[t2] ||
              String(t2 || '')
                .toLowerCase()
                .replace(/s$/, '')
            );
          },
          u: function (t2) {
            return void 0 === t2;
          },
        },
        g = 'en',
        D = {};
      D[g] = M;
      var p = '$isDayjsObject',
        S = function (t2) {
          return t2 instanceof _ || !(!t2 || !t2[p]);
        },
        w = function t2(e2, n2, r2) {
          var i2;
          if (!e2) return g;
          if ('string' == typeof e2) {
            var s2 = e2.toLowerCase();
            (D[s2] && (i2 = s2), n2 && ((D[s2] = n2), (i2 = s2)));
            var u2 = e2.split('-');
            if (!i2 && u2.length > 1) return t2(u2[0]);
          } else {
            var a2 = e2.name;
            ((D[a2] = e2), (i2 = a2));
          }
          return (!r2 && i2 && (g = i2), i2 || (!r2 && g));
        },
        O = function (t2, e2) {
          if (S(t2)) return t2.clone();
          var n2 = 'object' == typeof e2 ? e2 : {};
          return ((n2.date = t2), (n2.args = arguments), new _(n2));
        },
        b = v;
      ((b.l = w),
        (b.i = S),
        (b.w = function (t2, e2) {
          return O(t2, { locale: e2.$L, utc: e2.$u, x: e2.$x, $offset: e2.$offset });
        }));
      var _ = (function () {
          function M2(t2) {
            ((this.$L = w(t2.locale, null, true)),
              this.parse(t2),
              (this.$x = this.$x || t2.x || {}),
              (this[p] = true));
          }
          var m2 = M2.prototype;
          return (
            (m2.parse = function (t2) {
              ((this.$d = (function (t3) {
                var e2 = t3.date,
                  n2 = t3.utc;
                if (null === e2) return /* @__PURE__ */ new Date(NaN);
                if (b.u(e2)) return /* @__PURE__ */ new Date();
                if (e2 instanceof Date) return new Date(e2);
                if ('string' == typeof e2 && !/Z$/i.test(e2)) {
                  var r2 = e2.match($);
                  if (r2) {
                    var i2 = r2[2] - 1 || 0,
                      s2 = (r2[7] || '0').substring(0, 3);
                    return n2
                      ? new Date(
                          Date.UTC(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2),
                        )
                      : new Date(r2[1], i2, r2[3] || 1, r2[4] || 0, r2[5] || 0, r2[6] || 0, s2);
                  }
                }
                return new Date(e2);
              })(t2)),
                this.init());
            }),
            (m2.init = function () {
              var t2 = this.$d;
              ((this.$y = t2.getFullYear()),
                (this.$M = t2.getMonth()),
                (this.$D = t2.getDate()),
                (this.$W = t2.getDay()),
                (this.$H = t2.getHours()),
                (this.$m = t2.getMinutes()),
                (this.$s = t2.getSeconds()),
                (this.$ms = t2.getMilliseconds()));
            }),
            (m2.$utils = function () {
              return b;
            }),
            (m2.isValid = function () {
              return !(this.$d.toString() === l);
            }),
            (m2.isSame = function (t2, e2) {
              var n2 = O(t2);
              return this.startOf(e2) <= n2 && n2 <= this.endOf(e2);
            }),
            (m2.isAfter = function (t2, e2) {
              return O(t2) < this.startOf(e2);
            }),
            (m2.isBefore = function (t2, e2) {
              return this.endOf(e2) < O(t2);
            }),
            (m2.$g = function (t2, e2, n2) {
              return b.u(t2) ? this[e2] : this.set(n2, t2);
            }),
            (m2.unix = function () {
              return Math.floor(this.valueOf() / 1e3);
            }),
            (m2.valueOf = function () {
              return this.$d.getTime();
            }),
            (m2.startOf = function (t2, e2) {
              var n2 = this,
                r2 = !!b.u(e2) || e2,
                f2 = b.p(t2),
                l2 = function (t3, e3) {
                  var i2 = b.w(n2.$u ? Date.UTC(n2.$y, e3, t3) : new Date(n2.$y, e3, t3), n2);
                  return r2 ? i2 : i2.endOf(a);
                },
                $2 = function (t3, e3) {
                  return b.w(
                    n2
                      .toDate()
                      [t3].apply(n2.toDate('s'), (r2 ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(e3)),
                    n2,
                  );
                },
                y2 = this.$W,
                M3 = this.$M,
                m3 = this.$D,
                v2 = 'set' + (this.$u ? 'UTC' : '');
              switch (f2) {
                case h:
                  return r2 ? l2(1, 0) : l2(31, 11);
                case c:
                  return r2 ? l2(1, M3) : l2(0, M3 + 1);
                case o:
                  var g2 = this.$locale().weekStart || 0,
                    D2 = (y2 < g2 ? y2 + 7 : y2) - g2;
                  return l2(r2 ? m3 - D2 : m3 + (6 - D2), M3);
                case a:
                case d:
                  return $2(v2 + 'Hours', 0);
                case u:
                  return $2(v2 + 'Minutes', 1);
                case s:
                  return $2(v2 + 'Seconds', 2);
                case i:
                  return $2(v2 + 'Milliseconds', 3);
                default:
                  return this.clone();
              }
            }),
            (m2.endOf = function (t2) {
              return this.startOf(t2, false);
            }),
            (m2.$set = function (t2, e2) {
              var n2,
                o2 = b.p(t2),
                f2 = 'set' + (this.$u ? 'UTC' : ''),
                l2 = ((n2 = {}),
                (n2[a] = f2 + 'Date'),
                (n2[d] = f2 + 'Date'),
                (n2[c] = f2 + 'Month'),
                (n2[h] = f2 + 'FullYear'),
                (n2[u] = f2 + 'Hours'),
                (n2[s] = f2 + 'Minutes'),
                (n2[i] = f2 + 'Seconds'),
                (n2[r] = f2 + 'Milliseconds'),
                n2)[o2],
                $2 = o2 === a ? this.$D + (e2 - this.$W) : e2;
              if (o2 === c || o2 === h) {
                var y2 = this.clone().set(d, 1);
                (y2.$d[l2]($2),
                  y2.init(),
                  (this.$d = y2.set(d, Math.min(this.$D, y2.daysInMonth())).$d));
              } else l2 && this.$d[l2]($2);
              return (this.init(), this);
            }),
            (m2.set = function (t2, e2) {
              return this.clone().$set(t2, e2);
            }),
            (m2.get = function (t2) {
              return this[b.p(t2)]();
            }),
            (m2.add = function (r2, f2) {
              var d2,
                l2 = this;
              r2 = Number(r2);
              var $2 = b.p(f2),
                y2 = function (t2) {
                  var e2 = O(l2);
                  return b.w(e2.date(e2.date() + Math.round(t2 * r2)), l2);
                };
              if ($2 === c) return this.set(c, this.$M + r2);
              if ($2 === h) return this.set(h, this.$y + r2);
              if ($2 === a) return y2(1);
              if ($2 === o) return y2(7);
              var M3 = ((d2 = {}), (d2[s] = e), (d2[u] = n), (d2[i] = t), d2)[$2] || 1,
                m3 = this.$d.getTime() + r2 * M3;
              return b.w(m3, this);
            }),
            (m2.subtract = function (t2, e2) {
              return this.add(-1 * t2, e2);
            }),
            (m2.format = function (t2) {
              var e2 = this,
                n2 = this.$locale();
              if (!this.isValid()) return n2.invalidDate || l;
              var r2 = t2 || 'YYYY-MM-DDTHH:mm:ssZ',
                i2 = b.z(this),
                s2 = this.$H,
                u2 = this.$m,
                a2 = this.$M,
                o2 = n2.weekdays,
                c2 = n2.months,
                f2 = n2.meridiem,
                h2 = function (t3, n3, i3, s3) {
                  return (t3 && (t3[n3] || t3(e2, r2))) || i3[n3].slice(0, s3);
                },
                d2 = function (t3) {
                  return b.s(s2 % 12 || 12, t3, '0');
                },
                $2 =
                  f2 ||
                  function (t3, e3, n3) {
                    var r3 = t3 < 12 ? 'AM' : 'PM';
                    return n3 ? r3.toLowerCase() : r3;
                  };
              return r2.replace(y, function (t3, r3) {
                return (
                  r3 ||
                  (function (t4) {
                    switch (t4) {
                      case 'YY':
                        return String(e2.$y).slice(-2);
                      case 'YYYY':
                        return b.s(e2.$y, 4, '0');
                      case 'M':
                        return a2 + 1;
                      case 'MM':
                        return b.s(a2 + 1, 2, '0');
                      case 'MMM':
                        return h2(n2.monthsShort, a2, c2, 3);
                      case 'MMMM':
                        return h2(c2, a2);
                      case 'D':
                        return e2.$D;
                      case 'DD':
                        return b.s(e2.$D, 2, '0');
                      case 'd':
                        return String(e2.$W);
                      case 'dd':
                        return h2(n2.weekdaysMin, e2.$W, o2, 2);
                      case 'ddd':
                        return h2(n2.weekdaysShort, e2.$W, o2, 3);
                      case 'dddd':
                        return o2[e2.$W];
                      case 'H':
                        return String(s2);
                      case 'HH':
                        return b.s(s2, 2, '0');
                      case 'h':
                        return d2(1);
                      case 'hh':
                        return d2(2);
                      case 'a':
                        return $2(s2, u2, true);
                      case 'A':
                        return $2(s2, u2, false);
                      case 'm':
                        return String(u2);
                      case 'mm':
                        return b.s(u2, 2, '0');
                      case 's':
                        return String(e2.$s);
                      case 'ss':
                        return b.s(e2.$s, 2, '0');
                      case 'SSS':
                        return b.s(e2.$ms, 3, '0');
                      case 'Z':
                        return i2;
                    }
                    return null;
                  })(t3) ||
                  i2.replace(':', '')
                );
              });
            }),
            (m2.utcOffset = function () {
              return 15 * -Math.round(this.$d.getTimezoneOffset() / 15);
            }),
            (m2.diff = function (r2, d2, l2) {
              var $2,
                y2 = this,
                M3 = b.p(d2),
                m3 = O(r2),
                v2 = (m3.utcOffset() - this.utcOffset()) * e,
                g2 = this - m3,
                D2 = function () {
                  return b.m(y2, m3);
                };
              switch (M3) {
                case h:
                  $2 = D2() / 12;
                  break;
                case c:
                  $2 = D2();
                  break;
                case f:
                  $2 = D2() / 3;
                  break;
                case o:
                  $2 = (g2 - v2) / 6048e5;
                  break;
                case a:
                  $2 = (g2 - v2) / 864e5;
                  break;
                case u:
                  $2 = g2 / n;
                  break;
                case s:
                  $2 = g2 / e;
                  break;
                case i:
                  $2 = g2 / t;
                  break;
                default:
                  $2 = g2;
              }
              return l2 ? $2 : b.a($2);
            }),
            (m2.daysInMonth = function () {
              return this.endOf(c).$D;
            }),
            (m2.$locale = function () {
              return D[this.$L];
            }),
            (m2.locale = function (t2, e2) {
              if (!t2) return this.$L;
              var n2 = this.clone(),
                r2 = w(t2, e2, true);
              return (r2 && (n2.$L = r2), n2);
            }),
            (m2.clone = function () {
              return b.w(this.$d, this);
            }),
            (m2.toDate = function () {
              return new Date(this.valueOf());
            }),
            (m2.toJSON = function () {
              return this.isValid() ? this.toISOString() : null;
            }),
            (m2.toISOString = function () {
              return this.$d.toISOString();
            }),
            (m2.toString = function () {
              return this.$d.toUTCString();
            }),
            M2
          );
        })(),
        k = _.prototype;
      return (
        (O.prototype = k),
        [
          ['$ms', r],
          ['$s', i],
          ['$m', s],
          ['$H', u],
          ['$W', a],
          ['$M', c],
          ['$y', h],
          ['$D', d],
        ].forEach(function (t2) {
          k[t2[1]] = function (e2) {
            return this.$g(e2, t2[0], t2[1]);
          };
        }),
        (O.extend = function (t2, e2) {
          return (t2.$i || (t2(e2, _, O), (t2.$i = true)), O);
        }),
        (O.locale = w),
        (O.isDayjs = S),
        (O.unix = function (t2) {
          return O(1e3 * t2);
        }),
        (O.en = D[g]),
        (O.Ls = D),
        (O.p = {}),
        O
      );
    });
  })(dayjs_min$1);
  return dayjs_min$1.exports;
}
export { requireDayjs_min as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGF5anMubWluMi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RheWpzQDEuMTEuMTgvbm9kZV9tb2R1bGVzL2RheWpzL2RheWpzLm1pbi5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24odCxlKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1lKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShlKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzPWUoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD0xZTMsZT02ZTQsbj0zNmU1LHI9XCJtaWxsaXNlY29uZFwiLGk9XCJzZWNvbmRcIixzPVwibWludXRlXCIsdT1cImhvdXJcIixhPVwiZGF5XCIsbz1cIndlZWtcIixjPVwibW9udGhcIixmPVwicXVhcnRlclwiLGg9XCJ5ZWFyXCIsZD1cImRhdGVcIixsPVwiSW52YWxpZCBEYXRlXCIsJD0vXihcXGR7NH0pWy0vXT8oXFxkezEsMn0pP1stL10/KFxcZHswLDJ9KVtUdFxcc10qKFxcZHsxLDJ9KT86PyhcXGR7MSwyfSk/Oj8oXFxkezEsMn0pP1suOl0/KFxcZCspPyQvLHk9L1xcWyhbXlxcXV0rKV18WXsxLDR9fE17MSw0fXxEezEsMn18ZHsxLDR9fEh7MSwyfXxoezEsMn18YXxBfG17MSwyfXxzezEsMn18WnsxLDJ9fFNTUy9nLE09e25hbWU6XCJlblwiLHdlZWtkYXlzOlwiU3VuZGF5X01vbmRheV9UdWVzZGF5X1dlZG5lc2RheV9UaHVyc2RheV9GcmlkYXlfU2F0dXJkYXlcIi5zcGxpdChcIl9cIiksbW9udGhzOlwiSmFudWFyeV9GZWJydWFyeV9NYXJjaF9BcHJpbF9NYXlfSnVuZV9KdWx5X0F1Z3VzdF9TZXB0ZW1iZXJfT2N0b2Jlcl9Ob3ZlbWJlcl9EZWNlbWJlclwiLnNwbGl0KFwiX1wiKSxvcmRpbmFsOmZ1bmN0aW9uKHQpe3ZhciBlPVtcInRoXCIsXCJzdFwiLFwibmRcIixcInJkXCJdLG49dCUxMDA7cmV0dXJuXCJbXCIrdCsoZVsobi0yMCklMTBdfHxlW25dfHxlWzBdKStcIl1cIn19LG09ZnVuY3Rpb24odCxlLG4pe3ZhciByPVN0cmluZyh0KTtyZXR1cm4hcnx8ci5sZW5ndGg+PWU/dDpcIlwiK0FycmF5KGUrMS1yLmxlbmd0aCkuam9pbihuKSt0fSx2PXtzOm0sejpmdW5jdGlvbih0KXt2YXIgZT0tdC51dGNPZmZzZXQoKSxuPU1hdGguYWJzKGUpLHI9TWF0aC5mbG9vcihuLzYwKSxpPW4lNjA7cmV0dXJuKGU8PTA/XCIrXCI6XCItXCIpK20ociwyLFwiMFwiKStcIjpcIittKGksMixcIjBcIil9LG06ZnVuY3Rpb24gdChlLG4pe2lmKGUuZGF0ZSgpPG4uZGF0ZSgpKXJldHVybi10KG4sZSk7dmFyIHI9MTIqKG4ueWVhcigpLWUueWVhcigpKSsobi5tb250aCgpLWUubW9udGgoKSksaT1lLmNsb25lKCkuYWRkKHIsYykscz1uLWk8MCx1PWUuY2xvbmUoKS5hZGQocisocz8tMToxKSxjKTtyZXR1cm4rKC0ocisobi1pKS8ocz9pLXU6dS1pKSl8fDApfSxhOmZ1bmN0aW9uKHQpe3JldHVybiB0PDA/TWF0aC5jZWlsKHQpfHwwOk1hdGguZmxvb3IodCl9LHA6ZnVuY3Rpb24odCl7cmV0dXJue006Yyx5OmgsdzpvLGQ6YSxEOmQsaDp1LG06cyxzOmksbXM6cixROmZ9W3RdfHxTdHJpbmcodHx8XCJcIikudG9Mb3dlckNhc2UoKS5yZXBsYWNlKC9zJC8sXCJcIil9LHU6ZnVuY3Rpb24odCl7cmV0dXJuIHZvaWQgMD09PXR9fSxnPVwiZW5cIixEPXt9O0RbZ109TTt2YXIgcD1cIiRpc0RheWpzT2JqZWN0XCIsUz1mdW5jdGlvbih0KXtyZXR1cm4gdCBpbnN0YW5jZW9mIF98fCEoIXR8fCF0W3BdKX0sdz1mdW5jdGlvbiB0KGUsbixyKXt2YXIgaTtpZighZSlyZXR1cm4gZztpZihcInN0cmluZ1wiPT10eXBlb2YgZSl7dmFyIHM9ZS50b0xvd2VyQ2FzZSgpO0Rbc10mJihpPXMpLG4mJihEW3NdPW4saT1zKTt2YXIgdT1lLnNwbGl0KFwiLVwiKTtpZighaSYmdS5sZW5ndGg+MSlyZXR1cm4gdCh1WzBdKX1lbHNle3ZhciBhPWUubmFtZTtEW2FdPWUsaT1hfXJldHVybiFyJiZpJiYoZz1pKSxpfHwhciYmZ30sTz1mdW5jdGlvbih0LGUpe2lmKFModCkpcmV0dXJuIHQuY2xvbmUoKTt2YXIgbj1cIm9iamVjdFwiPT10eXBlb2YgZT9lOnt9O3JldHVybiBuLmRhdGU9dCxuLmFyZ3M9YXJndW1lbnRzLG5ldyBfKG4pfSxiPXY7Yi5sPXcsYi5pPVMsYi53PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIE8odCx7bG9jYWxlOmUuJEwsdXRjOmUuJHUseDplLiR4LCRvZmZzZXQ6ZS4kb2Zmc2V0fSl9O3ZhciBfPWZ1bmN0aW9uKCl7ZnVuY3Rpb24gTSh0KXt0aGlzLiRMPXcodC5sb2NhbGUsbnVsbCwhMCksdGhpcy5wYXJzZSh0KSx0aGlzLiR4PXRoaXMuJHh8fHQueHx8e30sdGhpc1twXT0hMH12YXIgbT1NLnByb3RvdHlwZTtyZXR1cm4gbS5wYXJzZT1mdW5jdGlvbih0KXt0aGlzLiRkPWZ1bmN0aW9uKHQpe3ZhciBlPXQuZGF0ZSxuPXQudXRjO2lmKG51bGw9PT1lKXJldHVybiBuZXcgRGF0ZShOYU4pO2lmKGIudShlKSlyZXR1cm4gbmV3IERhdGU7aWYoZSBpbnN0YW5jZW9mIERhdGUpcmV0dXJuIG5ldyBEYXRlKGUpO2lmKFwic3RyaW5nXCI9PXR5cGVvZiBlJiYhL1okL2kudGVzdChlKSl7dmFyIHI9ZS5tYXRjaCgkKTtpZihyKXt2YXIgaT1yWzJdLTF8fDAscz0ocls3XXx8XCIwXCIpLnN1YnN0cmluZygwLDMpO3JldHVybiBuP25ldyBEYXRlKERhdGUuVVRDKHJbMV0saSxyWzNdfHwxLHJbNF18fDAscls1XXx8MCxyWzZdfHwwLHMpKTpuZXcgRGF0ZShyWzFdLGksclszXXx8MSxyWzRdfHwwLHJbNV18fDAscls2XXx8MCxzKX19cmV0dXJuIG5ldyBEYXRlKGUpfSh0KSx0aGlzLmluaXQoKX0sbS5pbml0PWZ1bmN0aW9uKCl7dmFyIHQ9dGhpcy4kZDt0aGlzLiR5PXQuZ2V0RnVsbFllYXIoKSx0aGlzLiRNPXQuZ2V0TW9udGgoKSx0aGlzLiREPXQuZ2V0RGF0ZSgpLHRoaXMuJFc9dC5nZXREYXkoKSx0aGlzLiRIPXQuZ2V0SG91cnMoKSx0aGlzLiRtPXQuZ2V0TWludXRlcygpLHRoaXMuJHM9dC5nZXRTZWNvbmRzKCksdGhpcy4kbXM9dC5nZXRNaWxsaXNlY29uZHMoKX0sbS4kdXRpbHM9ZnVuY3Rpb24oKXtyZXR1cm4gYn0sbS5pc1ZhbGlkPWZ1bmN0aW9uKCl7cmV0dXJuISh0aGlzLiRkLnRvU3RyaW5nKCk9PT1sKX0sbS5pc1NhbWU9ZnVuY3Rpb24odCxlKXt2YXIgbj1PKHQpO3JldHVybiB0aGlzLnN0YXJ0T2YoZSk8PW4mJm48PXRoaXMuZW5kT2YoZSl9LG0uaXNBZnRlcj1mdW5jdGlvbih0LGUpe3JldHVybiBPKHQpPHRoaXMuc3RhcnRPZihlKX0sbS5pc0JlZm9yZT1mdW5jdGlvbih0LGUpe3JldHVybiB0aGlzLmVuZE9mKGUpPE8odCl9LG0uJGc9ZnVuY3Rpb24odCxlLG4pe3JldHVybiBiLnUodCk/dGhpc1tlXTp0aGlzLnNldChuLHQpfSxtLnVuaXg9ZnVuY3Rpb24oKXtyZXR1cm4gTWF0aC5mbG9vcih0aGlzLnZhbHVlT2YoKS8xZTMpfSxtLnZhbHVlT2Y9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC5nZXRUaW1lKCl9LG0uc3RhcnRPZj1mdW5jdGlvbih0LGUpe3ZhciBuPXRoaXMscj0hIWIudShlKXx8ZSxmPWIucCh0KSxsPWZ1bmN0aW9uKHQsZSl7dmFyIGk9Yi53KG4uJHU/RGF0ZS5VVEMobi4keSxlLHQpOm5ldyBEYXRlKG4uJHksZSx0KSxuKTtyZXR1cm4gcj9pOmkuZW5kT2YoYSl9LCQ9ZnVuY3Rpb24odCxlKXtyZXR1cm4gYi53KG4udG9EYXRlKClbdF0uYXBwbHkobi50b0RhdGUoXCJzXCIpLChyP1swLDAsMCwwXTpbMjMsNTksNTksOTk5XSkuc2xpY2UoZSkpLG4pfSx5PXRoaXMuJFcsTT10aGlzLiRNLG09dGhpcy4kRCx2PVwic2V0XCIrKHRoaXMuJHU/XCJVVENcIjpcIlwiKTtzd2l0Y2goZil7Y2FzZSBoOnJldHVybiByP2woMSwwKTpsKDMxLDExKTtjYXNlIGM6cmV0dXJuIHI/bCgxLE0pOmwoMCxNKzEpO2Nhc2Ugbzp2YXIgZz10aGlzLiRsb2NhbGUoKS53ZWVrU3RhcnR8fDAsRD0oeTxnP3krNzp5KS1nO3JldHVybiBsKHI/bS1EOm0rKDYtRCksTSk7Y2FzZSBhOmNhc2UgZDpyZXR1cm4gJCh2K1wiSG91cnNcIiwwKTtjYXNlIHU6cmV0dXJuICQoditcIk1pbnV0ZXNcIiwxKTtjYXNlIHM6cmV0dXJuICQoditcIlNlY29uZHNcIiwyKTtjYXNlIGk6cmV0dXJuICQoditcIk1pbGxpc2Vjb25kc1wiLDMpO2RlZmF1bHQ6cmV0dXJuIHRoaXMuY2xvbmUoKX19LG0uZW5kT2Y9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuc3RhcnRPZih0LCExKX0sbS4kc2V0PWZ1bmN0aW9uKHQsZSl7dmFyIG4sbz1iLnAodCksZj1cInNldFwiKyh0aGlzLiR1P1wiVVRDXCI6XCJcIiksbD0obj17fSxuW2FdPWYrXCJEYXRlXCIsbltkXT1mK1wiRGF0ZVwiLG5bY109ZitcIk1vbnRoXCIsbltoXT1mK1wiRnVsbFllYXJcIixuW3VdPWYrXCJIb3Vyc1wiLG5bc109ZitcIk1pbnV0ZXNcIixuW2ldPWYrXCJTZWNvbmRzXCIsbltyXT1mK1wiTWlsbGlzZWNvbmRzXCIsbilbb10sJD1vPT09YT90aGlzLiREKyhlLXRoaXMuJFcpOmU7aWYobz09PWN8fG89PT1oKXt2YXIgeT10aGlzLmNsb25lKCkuc2V0KGQsMSk7eS4kZFtsXSgkKSx5LmluaXQoKSx0aGlzLiRkPXkuc2V0KGQsTWF0aC5taW4odGhpcy4kRCx5LmRheXNJbk1vbnRoKCkpKS4kZH1lbHNlIGwmJnRoaXMuJGRbbF0oJCk7cmV0dXJuIHRoaXMuaW5pdCgpLHRoaXN9LG0uc2V0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuY2xvbmUoKS4kc2V0KHQsZSl9LG0uZ2V0PWZ1bmN0aW9uKHQpe3JldHVybiB0aGlzW2IucCh0KV0oKX0sbS5hZGQ9ZnVuY3Rpb24ocixmKXt2YXIgZCxsPXRoaXM7cj1OdW1iZXIocik7dmFyICQ9Yi5wKGYpLHk9ZnVuY3Rpb24odCl7dmFyIGU9TyhsKTtyZXR1cm4gYi53KGUuZGF0ZShlLmRhdGUoKStNYXRoLnJvdW5kKHQqcikpLGwpfTtpZigkPT09YylyZXR1cm4gdGhpcy5zZXQoYyx0aGlzLiRNK3IpO2lmKCQ9PT1oKXJldHVybiB0aGlzLnNldChoLHRoaXMuJHkrcik7aWYoJD09PWEpcmV0dXJuIHkoMSk7aWYoJD09PW8pcmV0dXJuIHkoNyk7dmFyIE09KGQ9e30sZFtzXT1lLGRbdV09bixkW2ldPXQsZClbJF18fDEsbT10aGlzLiRkLmdldFRpbWUoKStyKk07cmV0dXJuIGIudyhtLHRoaXMpfSxtLnN1YnRyYWN0PWZ1bmN0aW9uKHQsZSl7cmV0dXJuIHRoaXMuYWRkKC0xKnQsZSl9LG0uZm9ybWF0PWZ1bmN0aW9uKHQpe3ZhciBlPXRoaXMsbj10aGlzLiRsb2NhbGUoKTtpZighdGhpcy5pc1ZhbGlkKCkpcmV0dXJuIG4uaW52YWxpZERhdGV8fGw7dmFyIHI9dHx8XCJZWVlZLU1NLUREVEhIOm1tOnNzWlwiLGk9Yi56KHRoaXMpLHM9dGhpcy4kSCx1PXRoaXMuJG0sYT10aGlzLiRNLG89bi53ZWVrZGF5cyxjPW4ubW9udGhzLGY9bi5tZXJpZGllbSxoPWZ1bmN0aW9uKHQsbixpLHMpe3JldHVybiB0JiYodFtuXXx8dChlLHIpKXx8aVtuXS5zbGljZSgwLHMpfSxkPWZ1bmN0aW9uKHQpe3JldHVybiBiLnMocyUxMnx8MTIsdCxcIjBcIil9LCQ9Znx8ZnVuY3Rpb24odCxlLG4pe3ZhciByPXQ8MTI/XCJBTVwiOlwiUE1cIjtyZXR1cm4gbj9yLnRvTG93ZXJDYXNlKCk6cn07cmV0dXJuIHIucmVwbGFjZSh5LChmdW5jdGlvbih0LHIpe3JldHVybiByfHxmdW5jdGlvbih0KXtzd2l0Y2godCl7Y2FzZVwiWVlcIjpyZXR1cm4gU3RyaW5nKGUuJHkpLnNsaWNlKC0yKTtjYXNlXCJZWVlZXCI6cmV0dXJuIGIucyhlLiR5LDQsXCIwXCIpO2Nhc2VcIk1cIjpyZXR1cm4gYSsxO2Nhc2VcIk1NXCI6cmV0dXJuIGIucyhhKzEsMixcIjBcIik7Y2FzZVwiTU1NXCI6cmV0dXJuIGgobi5tb250aHNTaG9ydCxhLGMsMyk7Y2FzZVwiTU1NTVwiOnJldHVybiBoKGMsYSk7Y2FzZVwiRFwiOnJldHVybiBlLiREO2Nhc2VcIkREXCI6cmV0dXJuIGIucyhlLiRELDIsXCIwXCIpO2Nhc2VcImRcIjpyZXR1cm4gU3RyaW5nKGUuJFcpO2Nhc2VcImRkXCI6cmV0dXJuIGgobi53ZWVrZGF5c01pbixlLiRXLG8sMik7Y2FzZVwiZGRkXCI6cmV0dXJuIGgobi53ZWVrZGF5c1Nob3J0LGUuJFcsbywzKTtjYXNlXCJkZGRkXCI6cmV0dXJuIG9bZS4kV107Y2FzZVwiSFwiOnJldHVybiBTdHJpbmcocyk7Y2FzZVwiSEhcIjpyZXR1cm4gYi5zKHMsMixcIjBcIik7Y2FzZVwiaFwiOnJldHVybiBkKDEpO2Nhc2VcImhoXCI6cmV0dXJuIGQoMik7Y2FzZVwiYVwiOnJldHVybiAkKHMsdSwhMCk7Y2FzZVwiQVwiOnJldHVybiAkKHMsdSwhMSk7Y2FzZVwibVwiOnJldHVybiBTdHJpbmcodSk7Y2FzZVwibW1cIjpyZXR1cm4gYi5zKHUsMixcIjBcIik7Y2FzZVwic1wiOnJldHVybiBTdHJpbmcoZS4kcyk7Y2FzZVwic3NcIjpyZXR1cm4gYi5zKGUuJHMsMixcIjBcIik7Y2FzZVwiU1NTXCI6cmV0dXJuIGIucyhlLiRtcywzLFwiMFwiKTtjYXNlXCJaXCI6cmV0dXJuIGl9cmV0dXJuIG51bGx9KHQpfHxpLnJlcGxhY2UoXCI6XCIsXCJcIil9KSl9LG0udXRjT2Zmc2V0PWZ1bmN0aW9uKCl7cmV0dXJuIDE1Ki1NYXRoLnJvdW5kKHRoaXMuJGQuZ2V0VGltZXpvbmVPZmZzZXQoKS8xNSl9LG0uZGlmZj1mdW5jdGlvbihyLGQsbCl7dmFyICQseT10aGlzLE09Yi5wKGQpLG09TyhyKSx2PShtLnV0Y09mZnNldCgpLXRoaXMudXRjT2Zmc2V0KCkpKmUsZz10aGlzLW0sRD1mdW5jdGlvbigpe3JldHVybiBiLm0oeSxtKX07c3dpdGNoKE0pe2Nhc2UgaDokPUQoKS8xMjticmVhaztjYXNlIGM6JD1EKCk7YnJlYWs7Y2FzZSBmOiQ9RCgpLzM7YnJlYWs7Y2FzZSBvOiQ9KGctdikvNjA0OGU1O2JyZWFrO2Nhc2UgYTokPShnLXYpLzg2NGU1O2JyZWFrO2Nhc2UgdTokPWcvbjticmVhaztjYXNlIHM6JD1nL2U7YnJlYWs7Y2FzZSBpOiQ9Zy90O2JyZWFrO2RlZmF1bHQ6JD1nfXJldHVybiBsPyQ6Yi5hKCQpfSxtLmRheXNJbk1vbnRoPWZ1bmN0aW9uKCl7cmV0dXJuIHRoaXMuZW5kT2YoYykuJER9LG0uJGxvY2FsZT1mdW5jdGlvbigpe3JldHVybiBEW3RoaXMuJExdfSxtLmxvY2FsZT1mdW5jdGlvbih0LGUpe2lmKCF0KXJldHVybiB0aGlzLiRMO3ZhciBuPXRoaXMuY2xvbmUoKSxyPXcodCxlLCEwKTtyZXR1cm4gciYmKG4uJEw9ciksbn0sbS5jbG9uZT1mdW5jdGlvbigpe3JldHVybiBiLncodGhpcy4kZCx0aGlzKX0sbS50b0RhdGU9ZnVuY3Rpb24oKXtyZXR1cm4gbmV3IERhdGUodGhpcy52YWx1ZU9mKCkpfSxtLnRvSlNPTj1mdW5jdGlvbigpe3JldHVybiB0aGlzLmlzVmFsaWQoKT90aGlzLnRvSVNPU3RyaW5nKCk6bnVsbH0sbS50b0lTT1N0cmluZz1mdW5jdGlvbigpe3JldHVybiB0aGlzLiRkLnRvSVNPU3RyaW5nKCl9LG0udG9TdHJpbmc9ZnVuY3Rpb24oKXtyZXR1cm4gdGhpcy4kZC50b1VUQ1N0cmluZygpfSxNfSgpLGs9Xy5wcm90b3R5cGU7cmV0dXJuIE8ucHJvdG90eXBlPWssW1tcIiRtc1wiLHJdLFtcIiRzXCIsaV0sW1wiJG1cIixzXSxbXCIkSFwiLHVdLFtcIiRXXCIsYV0sW1wiJE1cIixjXSxbXCIkeVwiLGhdLFtcIiREXCIsZF1dLmZvckVhY2goKGZ1bmN0aW9uKHQpe2tbdFsxXV09ZnVuY3Rpb24oZSl7cmV0dXJuIHRoaXMuJGcoZSx0WzBdLHRbMV0pfX0pKSxPLmV4dGVuZD1mdW5jdGlvbih0LGUpe3JldHVybiB0LiRpfHwodChlLF8sTyksdC4kaT0hMCksT30sTy5sb2NhbGU9dyxPLmlzRGF5anM9UyxPLnVuaXg9ZnVuY3Rpb24odCl7cmV0dXJuIE8oMWUzKnQpfSxPLmVuPURbZ10sTy5Mcz1ELE8ucD17fSxPfSkpOyJdLCJuYW1lcyI6WyJ0aGlzIiwidCIsImUiLCJuIiwiciIsImkiLCJzIiwidSIsImEiLCJNIiwibSIsImYiLCJsIiwiJCIsInkiLCJ2IiwiZyIsIkQiLCJvIiwiZCIsImMiLCJoIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsTUFBQyxTQUFTLEdBQUUsR0FBRTtBQUFzRCx1QkFBZSxFQUFDO0FBQUEsSUFBa0gsR0FBRUEsWUFBTSxXQUFVO0FBQWMsVUFBSSxJQUFFLEtBQUksSUFBRSxLQUFJLElBQUUsTUFBSyxJQUFFLGVBQWMsSUFBRSxVQUFTLElBQUUsVUFBUyxJQUFFLFFBQU8sSUFBRSxPQUFNLElBQUUsUUFBTyxJQUFFLFNBQVEsSUFBRSxXQUFVLElBQUUsUUFBTyxJQUFFLFFBQU8sSUFBRSxnQkFBZSxJQUFFLDhGQUE2RixJQUFFLHVGQUFzRixJQUFFLEVBQUMsTUFBSyxNQUFLLFVBQVMsMkRBQTJELE1BQU0sR0FBRyxHQUFFLFFBQU8sd0ZBQXdGLE1BQU0sR0FBRyxHQUFFLFNBQVEsU0FBU0MsSUFBRTtBQUFDLFlBQUlDLEtBQUUsQ0FBQyxNQUFLLE1BQUssTUFBSyxJQUFJLEdBQUVDLEtBQUVGLEtBQUU7QUFBSSxlQUFNLE1BQUlBLE1BQUdDLElBQUdDLEtBQUUsTUFBSSxFQUFFLEtBQUdELEdBQUVDLEVBQUMs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
