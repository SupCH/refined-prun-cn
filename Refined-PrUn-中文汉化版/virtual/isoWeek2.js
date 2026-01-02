import { __module as isoWeek$1 } from './isoWeek3.js';
var isoWeek = isoWeek$1.exports;
var hasRequiredIsoWeek;
function requireIsoWeek() {
  if (hasRequiredIsoWeek) return isoWeek$1.exports;
  hasRequiredIsoWeek = 1;
  (function (module, exports$1) {
    !(function (e, t) {
      module.exports = t();
    })(isoWeek, function () {
      var e = 'day';
      return function (t, i, s) {
        var a = function (t2) {
            return t2.add(4 - t2.isoWeekday(), e);
          },
          d = i.prototype;
        ((d.isoWeekYear = function () {
          return a(this).year();
        }),
          (d.isoWeek = function (t2) {
            if (!this.$utils().u(t2)) return this.add(7 * (t2 - this.isoWeek()), e);
            var i2,
              d2,
              n2,
              o,
              r = a(this),
              u =
                ((i2 = this.isoWeekYear()),
                (d2 = this.$u),
                (n2 = (d2 ? s.utc : s)().year(i2).startOf('year')),
                (o = 4 - n2.isoWeekday()),
                n2.isoWeekday() > 4 && (o += 7),
                n2.add(o, e));
            return r.diff(u, 'week') + 1;
          }),
          (d.isoWeekday = function (e2) {
            return this.$utils().u(e2) ? this.day() || 7 : this.day(this.day() % 7 ? e2 : e2 - 7);
          }));
        var n = d.startOf;
        d.startOf = function (e2, t2) {
          var i2 = this.$utils(),
            s2 = !!i2.u(t2) || t2;
          return 'isoweek' === i2.p(e2)
            ? s2
              ? this.date(this.date() - (this.isoWeekday() - 1)).startOf('day')
              : this.date(this.date() - 1 - (this.isoWeekday() - 1) + 7).endOf('day')
            : n.bind(this)(e2, t2);
        };
      };
    });
  })(isoWeek$1);
  return isoWeek$1.exports;
}
export { requireIsoWeek as __require };
