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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXNvV2VlazIuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9kYXlqc0AxLjExLjE4L25vZGVfbW9kdWxlcy9kYXlqcy9wbHVnaW4vaXNvV2Vlay5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIhZnVuY3Rpb24oZSx0KXtcIm9iamVjdFwiPT10eXBlb2YgZXhwb3J0cyYmXCJ1bmRlZmluZWRcIiE9dHlwZW9mIG1vZHVsZT9tb2R1bGUuZXhwb3J0cz10KCk6XCJmdW5jdGlvblwiPT10eXBlb2YgZGVmaW5lJiZkZWZpbmUuYW1kP2RlZmluZSh0KTooZT1cInVuZGVmaW5lZFwiIT10eXBlb2YgZ2xvYmFsVGhpcz9nbG9iYWxUaGlzOmV8fHNlbGYpLmRheWpzX3BsdWdpbl9pc29XZWVrPXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT1cImRheVwiO3JldHVybiBmdW5jdGlvbih0LGkscyl7dmFyIGE9ZnVuY3Rpb24odCl7cmV0dXJuIHQuYWRkKDQtdC5pc29XZWVrZGF5KCksZSl9LGQ9aS5wcm90b3R5cGU7ZC5pc29XZWVrWWVhcj1mdW5jdGlvbigpe3JldHVybiBhKHRoaXMpLnllYXIoKX0sZC5pc29XZWVrPWZ1bmN0aW9uKHQpe2lmKCF0aGlzLiR1dGlscygpLnUodCkpcmV0dXJuIHRoaXMuYWRkKDcqKHQtdGhpcy5pc29XZWVrKCkpLGUpO3ZhciBpLGQsbixvLHI9YSh0aGlzKSx1PShpPXRoaXMuaXNvV2Vla1llYXIoKSxkPXRoaXMuJHUsbj0oZD9zLnV0YzpzKSgpLnllYXIoaSkuc3RhcnRPZihcInllYXJcIiksbz00LW4uaXNvV2Vla2RheSgpLG4uaXNvV2Vla2RheSgpPjQmJihvKz03KSxuLmFkZChvLGUpKTtyZXR1cm4gci5kaWZmKHUsXCJ3ZWVrXCIpKzF9LGQuaXNvV2Vla2RheT1mdW5jdGlvbihlKXtyZXR1cm4gdGhpcy4kdXRpbHMoKS51KGUpP3RoaXMuZGF5KCl8fDc6dGhpcy5kYXkodGhpcy5kYXkoKSU3P2U6ZS03KX07dmFyIG49ZC5zdGFydE9mO2Quc3RhcnRPZj1mdW5jdGlvbihlLHQpe3ZhciBpPXRoaXMuJHV0aWxzKCkscz0hIWkudSh0KXx8dDtyZXR1cm5cImlzb3dlZWtcIj09PWkucChlKT9zP3RoaXMuZGF0ZSh0aGlzLmRhdGUoKS0odGhpcy5pc29XZWVrZGF5KCktMSkpLnN0YXJ0T2YoXCJkYXlcIik6dGhpcy5kYXRlKHRoaXMuZGF0ZSgpLTEtKHRoaXMuaXNvV2Vla2RheSgpLTEpKzcpLmVuZE9mKFwiZGF5XCIpOm4uYmluZCh0aGlzKShlLHQpfX19KSk7Il0sIm5hbWVzIjpbInRoaXMiLCJ0IiwiaSIsImQiLCJuIiwiZSIsInMiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFDLFNBQVMsR0FBRSxHQUFFO0FBQXNELGFBQUEsVUFBZTtJQUFrSSxHQUFFQSxVQUFNLFdBQVU7QUFBYyxVQUFJLElBQUU7QUFBTSxhQUFPLFNBQVMsR0FBRSxHQUFFLEdBQUU7QUFBQyxZQUFJLElBQUUsU0FBU0MsSUFBRTtBQUFDLGlCQUFPQSxHQUFFLElBQUksSUFBRUEsR0FBRSxjQUFhLENBQUM7QUFBQSxRQUFDLEdBQUUsSUFBRSxFQUFFO0FBQVUsVUFBRSxjQUFZLFdBQVU7QUFBQyxpQkFBTyxFQUFFLElBQUksRUFBRSxLQUFJO0FBQUEsUUFBRSxHQUFFLEVBQUUsVUFBUSxTQUFTQSxJQUFFO0FBQUMsY0FBRyxDQUFDLEtBQUssT0FBTSxFQUFHLEVBQUVBLEVBQUMsRUFBRSxRQUFPLEtBQUssSUFBSSxLQUFHQSxLQUFFLEtBQUssUUFBTyxJQUFJLENBQUM7QUFBRSxjQUFJQyxJQUFFQyxJQUFFQyxJQUFFLEdBQUUsSUFBRSxFQUFFLElBQUksR0FBRSxLQUFHRixLQUFFLEtBQUssWUFBVyxHQUFHQyxLQUFFLEtBQUssSUFBR0MsTUFBR0QsS0FBRSxFQUFFLE1BQUksR0FBQyxFQUFJLEtBQUtELEVBQUMsRUFBRSxRQUFRLE1BQU0sR0FBRSxJQUFFLElBQUVFLEdBQUUsV0FBVSxHQUFHQSxHQUFFLFdBQVUsSUFBRyxNQUFJLEtBQUcsSUFBR0EsR0FBRSxJQUFJLEdBQUUsQ0FBQztBQUFHLGlCQUFPLEVBQUUsS0FBSyxHQUFFLE1BQU0sSUFBRTtBQUFBLFFBQUMsR0FBRSxFQUFFLGFBQVcsU0FBU0MsSUFBRTtBQUFDLGlCQUFPLEtBQUssT0FBTSxFQUFHLEVBQUVBLEVBQUMsSUFBRSxLQUFLLFNBQU8sSUFBRSxLQUFLLElBQUksS0FBSyxJQUFHLElBQUcsSUFBRUEsS0FBRUEsS0FBRSxDQUFDO0FBQUEsUUFBQztBQUFFLFlBQUksSUFBRSxFQUFFO0FBQVEsVUFBRSxVQUFRLFNBQVNBLElBQUVKLElBQUU7QUFBQyxjQUFJQyxLQUFFLEtBQUssT0FBTSxHQUFHSSxLQUFFLENBQUMsQ0FBQ0osR0FBRSxFQUFFRCxFQUFDLEtBQUdBO0FBQUUsaUJBQU0sY0FBWUMsR0FBRSxFQUFFRyxFQUFDLElBQUVDLEtBQUUsS0FBSyxLQUFLLEtBQUssVUFBUSxLQUFLLFdBQVUsSUFBRyxFQUFFLEVBQUUsUUFBUSxLQUFLLElBQUUsS0FBSyxLQUFLLEtBQUssS0FBSSxJQUFHLEtBQUcsS0FBSyxlQUFhLEtBQUcsQ0FBQyxFQUFFLE1BQU0sS0FBSyxJQUFFLEVBQUUsS0FBSyxJQUFJLEVBQUVELElBQUVKLEVBQUM7QUFBQSxRQUFDO0FBQUEsTUFBQztBQUFBLElBQUM7Ozs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
