import { __module as quarterOfYear$1 } from './quarterOfYear3.js';
var quarterOfYear = quarterOfYear$1.exports;
var hasRequiredQuarterOfYear;
function requireQuarterOfYear() {
  if (hasRequiredQuarterOfYear) return quarterOfYear$1.exports;
  hasRequiredQuarterOfYear = 1;
  (function (module, exports$1) {
    !(function (t, n) {
      module.exports = n();
    })(quarterOfYear, function () {
      var t = 'month',
        n = 'quarter';
      return function (e, i) {
        var r = i.prototype;
        r.quarter = function (t2) {
          return this.$utils().u(t2)
            ? Math.ceil((this.month() + 1) / 3)
            : this.month((this.month() % 3) + 3 * (t2 - 1));
        };
        var s = r.add;
        r.add = function (e2, i2) {
          return (
            (e2 = Number(e2)),
            this.$utils().p(i2) === n ? this.add(3 * e2, t) : s.bind(this)(e2, i2)
          );
        };
        var u = r.startOf;
        r.startOf = function (e2, i2) {
          var r2 = this.$utils(),
            s2 = !!r2.u(i2) || i2;
          if (r2.p(e2) === n) {
            var o = this.quarter() - 1;
            return s2
              ? this.month(3 * o)
                  .startOf(t)
                  .startOf('day')
              : this.month(3 * o + 2)
                  .endOf(t)
                  .endOf('day');
          }
          return u.bind(this)(e2, i2);
        };
      };
    });
  })(quarterOfYear$1);
  return quarterOfYear$1.exports;
}
export { requireQuarterOfYear as __require };
