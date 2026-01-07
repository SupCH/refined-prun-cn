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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicXVhcnRlck9mWWVhcjIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXlqc0AxLjExLjE4L25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vcXVhcnRlck9mWWVhci5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24odCxuKXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz1uKCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZShuKToodD1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOnR8fHNlbGYpLmRheWpzX3BsdWdpbl9xdWFydGVyT2ZZZWFyPW4oKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgdD1cIm1vbnRoXCIsbj1cInF1YXJ0ZXJcIjtyZXR1cm4gZnVuY3Rpb24oZSxpKXt2YXIgcj1pLnByb3RvdHlwZTtyLnF1YXJ0ZXI9ZnVuY3Rpb24odCl7cmV0dXJuIHRoaXMuJHV0aWxzKCkudSh0KT9NYXRoLmNlaWwoKHRoaXMubW9udGgoKSsxKS8zKTp0aGlzLm1vbnRoKHRoaXMubW9udGgoKSUzKzMqKHQtMSkpfTt2YXIgcz1yLmFkZDtyLmFkZD1mdW5jdGlvbihlLGkpe3JldHVybiBlPU51bWJlcihlKSx0aGlzLiR1dGlscygpLnAoaSk9PT1uP3RoaXMuYWRkKDMqZSx0KTpzLmJpbmQodGhpcykoZSxpKX07dmFyIHU9ci5zdGFydE9mO3Iuc3RhcnRPZj1mdW5jdGlvbihlLGkpe3ZhciByPXRoaXMuJHV0aWxzKCkscz0hIXIudShpKXx8aTtpZihyLnAoZSk9PT1uKXt2YXIgbz10aGlzLnF1YXJ0ZXIoKS0xO3JldHVybiBzP3RoaXMubW9udGgoMypvKS5zdGFydE9mKHQpLnN0YXJ0T2YoXCJkYXlcIik6dGhpcy5tb250aCgzKm8rMikuZW5kT2YodCkuZW5kT2YoXCJkYXlcIil9cmV0dXJuIHUuYmluZCh0aGlzKShlLGkpfX19KSk7Il0sIm5hbWVzIjpbInRoaXMiLCJ0IiwiZSIsImkiLCJyIiwicyJdLCJtYXBwaW5ncyI6Ijs7Ozs7OztBQUFBLE1BQUMsU0FBUyxHQUFFLEdBQUU7QUFBc0QsdUJBQWU7SUFBd0ksR0FBRUEsZ0JBQU0sV0FBVTtBQUFjLFVBQUksSUFBRSxTQUFRLElBQUU7QUFBVSxhQUFPLFNBQVMsR0FBRSxHQUFFO0FBQUMsWUFBSSxJQUFFLEVBQUU7QUFBVSxVQUFFLFVBQVEsU0FBU0MsSUFBRTtBQUFDLGlCQUFPLEtBQUssT0FBTSxFQUFHLEVBQUVBLEVBQUMsSUFBRSxLQUFLLE1BQU0sS0FBSyxNQUFLLElBQUcsS0FBRyxDQUFDLElBQUUsS0FBSyxNQUFNLEtBQUssTUFBSyxJQUFHLElBQUUsS0FBR0EsS0FBRSxFQUFFO0FBQUEsUUFBQztBQUFFLFlBQUksSUFBRSxFQUFFO0FBQUksVUFBRSxNQUFJLFNBQVNDLElBQUVDLElBQUU7QUFBQyxpQkFBT0QsS0FBRSxPQUFPQSxFQUFDLEdBQUUsS0FBSyxPQUFNLEVBQUcsRUFBRUMsRUFBQyxNQUFJLElBQUUsS0FBSyxJQUFJLElBQUVELElBQUUsQ0FBQyxJQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUVBLElBQUVDLEVBQUM7QUFBQSxRQUFDO0FBQUUsWUFBSSxJQUFFLEVBQUU7QUFBUSxVQUFFLFVBQVEsU0FBU0QsSUFBRUMsSUFBRTtBQUFDLGNBQUlDLEtBQUUsS0FBSyxPQUFNLEdBQUdDLEtBQUUsQ0FBQyxDQUFDRCxHQUFFLEVBQUVELEVBQUMsS0FBR0E7QUFBRSxjQUFHQyxHQUFFLEVBQUVGLEVBQUMsTUFBSSxHQUFFO0FBQUMsZ0JBQUksSUFBRSxLQUFLLFFBQU8sSUFBRztBQUFFLG1CQUFPRyxLQUFFLEtBQUssTUFBTSxJQUFFLENBQUMsRUFBRSxRQUFRLENBQUMsRUFBRSxRQUFRLEtBQUssSUFBRSxLQUFLLE1BQU0sSUFBRSxJQUFFLENBQUMsRUFBRSxNQUFNLENBQUMsRUFBRSxNQUFNLEtBQUs7QUFBQSxVQUFDO0FBQUMsaUJBQU8sRUFBRSxLQUFLLElBQUksRUFBRUgsSUFBRUMsRUFBQztBQUFBLFFBQUM7QUFBQSxNQUFDO0FBQUEsSUFBQzs7OzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
