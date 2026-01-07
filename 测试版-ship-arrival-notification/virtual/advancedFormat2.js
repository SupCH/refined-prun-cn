import { __module as advancedFormat$1 } from './advancedFormat3.js';
var advancedFormat = advancedFormat$1.exports;
var hasRequiredAdvancedFormat;
function requireAdvancedFormat() {
  if (hasRequiredAdvancedFormat) return advancedFormat$1.exports;
  hasRequiredAdvancedFormat = 1;
  (function (module, exports$1) {
    !(function (e, t) {
      module.exports = t();
    })(advancedFormat, function () {
      return function (e, t) {
        var r = t.prototype,
          n = r.format;
        r.format = function (e2) {
          var t2 = this,
            r2 = this.$locale();
          if (!this.isValid()) return n.bind(this)(e2);
          var s = this.$utils(),
            a = (e2 || 'YYYY-MM-DDTHH:mm:ssZ').replace(
              /\[([^\]]+)]|Q|wo|ww|w|WW|W|zzz|z|gggg|GGGG|Do|X|x|k{1,2}|S/g,
              function (e3) {
                switch (e3) {
                  case 'Q':
                    return Math.ceil((t2.$M + 1) / 3);
                  case 'Do':
                    return r2.ordinal(t2.$D);
                  case 'gggg':
                    return t2.weekYear();
                  case 'GGGG':
                    return t2.isoWeekYear();
                  case 'wo':
                    return r2.ordinal(t2.week(), 'W');
                  case 'w':
                  case 'ww':
                    return s.s(t2.week(), 'w' === e3 ? 1 : 2, '0');
                  case 'W':
                  case 'WW':
                    return s.s(t2.isoWeek(), 'W' === e3 ? 1 : 2, '0');
                  case 'k':
                  case 'kk':
                    return s.s(String(0 === t2.$H ? 24 : t2.$H), 'k' === e3 ? 1 : 2, '0');
                  case 'X':
                    return Math.floor(t2.$d.getTime() / 1e3);
                  case 'x':
                    return t2.$d.getTime();
                  case 'z':
                    return '[' + t2.offsetName() + ']';
                  case 'zzz':
                    return '[' + t2.offsetName('long') + ']';
                  default:
                    return e3;
                }
              },
            );
          return n.bind(this)(a);
        };
      };
    });
  })(advancedFormat$1);
  return advancedFormat$1.exports;
}
export { requireAdvancedFormat as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYWR2YW5jZWRGb3JtYXQyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vZGF5anNAMS4xMS4xOC9ub2RlX21vZHVsZXMvZGF5anMvcGx1Z2luL2FkdmFuY2VkRm9ybWF0LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiFmdW5jdGlvbihlLHQpe1wib2JqZWN0XCI9PXR5cGVvZiBleHBvcnRzJiZcInVuZGVmaW5lZFwiIT10eXBlb2YgbW9kdWxlP21vZHVsZS5leHBvcnRzPXQoKTpcImZ1bmN0aW9uXCI9PXR5cGVvZiBkZWZpbmUmJmRlZmluZS5hbWQ/ZGVmaW5lKHQpOihlPVwidW5kZWZpbmVkXCIhPXR5cGVvZiBnbG9iYWxUaGlzP2dsb2JhbFRoaXM6ZXx8c2VsZikuZGF5anNfcGx1Z2luX2FkdmFuY2VkRm9ybWF0PXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjtyZXR1cm4gZnVuY3Rpb24oZSx0KXt2YXIgcj10LnByb3RvdHlwZSxuPXIuZm9ybWF0O3IuZm9ybWF0PWZ1bmN0aW9uKGUpe3ZhciB0PXRoaXMscj10aGlzLiRsb2NhbGUoKTtpZighdGhpcy5pc1ZhbGlkKCkpcmV0dXJuIG4uYmluZCh0aGlzKShlKTt2YXIgcz10aGlzLiR1dGlscygpLGE9KGV8fFwiWVlZWS1NTS1ERFRISDptbTpzc1pcIikucmVwbGFjZSgvXFxbKFteXFxdXSspXXxRfHdvfHd3fHd8V1d8V3x6enp8enxnZ2dnfEdHR0d8RG98WHx4fGt7MSwyfXxTL2csKGZ1bmN0aW9uKGUpe3N3aXRjaChlKXtjYXNlXCJRXCI6cmV0dXJuIE1hdGguY2VpbCgodC4kTSsxKS8zKTtjYXNlXCJEb1wiOnJldHVybiByLm9yZGluYWwodC4kRCk7Y2FzZVwiZ2dnZ1wiOnJldHVybiB0LndlZWtZZWFyKCk7Y2FzZVwiR0dHR1wiOnJldHVybiB0Lmlzb1dlZWtZZWFyKCk7Y2FzZVwid29cIjpyZXR1cm4gci5vcmRpbmFsKHQud2VlaygpLFwiV1wiKTtjYXNlXCJ3XCI6Y2FzZVwid3dcIjpyZXR1cm4gcy5zKHQud2VlaygpLFwid1wiPT09ZT8xOjIsXCIwXCIpO2Nhc2VcIldcIjpjYXNlXCJXV1wiOnJldHVybiBzLnModC5pc29XZWVrKCksXCJXXCI9PT1lPzE6MixcIjBcIik7Y2FzZVwia1wiOmNhc2VcImtrXCI6cmV0dXJuIHMucyhTdHJpbmcoMD09PXQuJEg/MjQ6dC4kSCksXCJrXCI9PT1lPzE6MixcIjBcIik7Y2FzZVwiWFwiOnJldHVybiBNYXRoLmZsb29yKHQuJGQuZ2V0VGltZSgpLzFlMyk7Y2FzZVwieFwiOnJldHVybiB0LiRkLmdldFRpbWUoKTtjYXNlXCJ6XCI6cmV0dXJuXCJbXCIrdC5vZmZzZXROYW1lKCkrXCJdXCI7Y2FzZVwienp6XCI6cmV0dXJuXCJbXCIrdC5vZmZzZXROYW1lKFwibG9uZ1wiKStcIl1cIjtkZWZhdWx0OnJldHVybiBlfX0pKTtyZXR1cm4gbi5iaW5kKHRoaXMpKGEpfX19KSk7Il0sIm5hbWVzIjpbInRoaXMiLCJlIiwidCIsInIiXSwibWFwcGluZ3MiOiI7Ozs7Ozs7QUFBQSxNQUFDLFNBQVMsR0FBRSxHQUFFO0FBQXNELGFBQUEsVUFBZSxFQUFDO0FBQUEsSUFBd0ksR0FBRUEsaUJBQU0sV0FBVTtBQUFjLGFBQU8sU0FBUyxHQUFFLEdBQUU7QUFBQyxZQUFJLElBQUUsRUFBRSxXQUFVLElBQUUsRUFBRTtBQUFPLFVBQUUsU0FBTyxTQUFTQyxJQUFFO0FBQUMsY0FBSUMsS0FBRSxNQUFLQyxLQUFFLEtBQUssUUFBTztBQUFHLGNBQUcsQ0FBQyxLQUFLLFFBQU8sRUFBRyxRQUFPLEVBQUUsS0FBSyxJQUFJLEVBQUVGLEVBQUM7QUFBRSxjQUFJLElBQUUsS0FBSyxPQUFNLEdBQUcsS0FBR0EsTUFBRyx3QkFBd0IsUUFBUSxnRUFBK0QsU0FBU0EsSUFBRTtBQUFDLG9CQUFPQSxJQUFDO0FBQUEsY0FBRSxLQUFJO0FBQUksdUJBQU8sS0FBSyxNQUFNQyxHQUFFLEtBQUcsS0FBRyxDQUFDO0FBQUEsY0FBRSxLQUFJO0FBQUssdUJBQU9DLEdBQUUsUUFBUUQsR0FBRSxFQUFFO0FBQUEsY0FBRSxLQUFJO0FBQU8sdUJBQU9BLEdBQUUsU0FBUTtBQUFBLGNBQUcsS0FBSTtBQUFPLHVCQUFPQSxHQUFFLFlBQVc7QUFBQSxjQUFHLEtBQUk7QUFBSyx1QkFBT0MsR0FBRSxRQUFRRCxHQUFFLEtBQUksR0FBRyxHQUFHO0FBQUEsY0FBRSxLQUFJO0FBQUEsY0FBSSxLQUFJO0FBQUssdUJBQU8sRUFBRSxFQUFFQSxHQUFFLEtBQUksR0FBRyxRQUFNRCxLQUFFLElBQUUsR0FBRSxHQUFHO0FBQUEsY0FBRSxLQUFJO0FBQUEsY0FBSSxLQUFJO0FBQUssdUJBQU8sRUFBRSxFQUFFQyxHQUFFLFFBQU8sR0FBRyxRQUFNRCxLQUFFLElBQUUsR0FBRSxHQUFHO0FBQUEsY0FBRSxLQUFJO0FBQUEsY0FBSSxLQUFJO0FBQUssdUJBQU8sRUFBRSxFQUFFLE9BQU8sTUFBSUMsR0FBRSxLQUFHLEtBQUdBLEdBQUUsRUFBRSxHQUFFLFFBQU1ELEtBQUUsSUFBRSxHQUFFLEdBQUc7QUFBQSxjQUFFLEtBQUk7QUFBSSx1QkFBTyxLQUFLLE1BQU1DLEdBQUUsR0FBRyxRQUFPLElBQUcsR0FBRztBQUFBLGNBQUUsS0FBSTtBQUFJLHVCQUFPQSxHQUFFLEdBQUcsUUFBTztBQUFBLGNBQUcsS0FBSTtBQUFJLHVCQUFNLE1BQUlBLEdBQUUsV0FBVSxJQUFHO0FBQUEsY0FBSSxLQUFJO0FBQU0sdUJBQU0sTUFBSUEsR0FBRSxXQUFXLE1BQU0sSUFBRTtBQUFBLGNBQUk7QUFBUSx1QkFBT0Q7QUFBQSxZQUFDO0FBQUEsVUFBQyxFQUFDO0FBQUcsaUJBQU8sRUFBRSxLQUFLLElBQUksRUFBRSxDQUFDO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBQSxJQUFDOzs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
