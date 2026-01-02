import { __module as localizedFormat$1 } from './localizedFormat3.js';
var localizedFormat = localizedFormat$1.exports;
var hasRequiredLocalizedFormat;
function requireLocalizedFormat() {
  if (hasRequiredLocalizedFormat) return localizedFormat$1.exports;
  hasRequiredLocalizedFormat = 1;
  (function (module, exports$1) {
    !(function (e, t) {
      module.exports = t();
    })(localizedFormat, function () {
      var e = {
        LTS: 'h:mm:ss A',
        LT: 'h:mm A',
        L: 'MM/DD/YYYY',
        LL: 'MMMM D, YYYY',
        LLL: 'MMMM D, YYYY h:mm A',
        LLLL: 'dddd, MMMM D, YYYY h:mm A',
      };
      return function (t, o, n) {
        var r = o.prototype,
          i = r.format;
        ((n.en.formats = e),
          (r.format = function (t2) {
            void 0 === t2 && (t2 = 'YYYY-MM-DDTHH:mm:ssZ');
            var o2 = this.$locale().formats,
              n2 = (function (t3, o3) {
                return t3.replace(/(\[[^\]]+])|(LTS?|l{1,4}|L{1,4})/g, function (t4, n3, r2) {
                  var i2 = r2 && r2.toUpperCase();
                  return (
                    n3 ||
                    o3[r2] ||
                    e[r2] ||
                    o3[i2].replace(/(\[[^\]]+])|(MMMM|MM|DD|dddd)/g, function (e2, t5, o4) {
                      return t5 || o4.slice(1);
                    })
                  );
                });
              })(t2, void 0 === o2 ? {} : o2);
            return i.call(this, n2);
          }));
      };
    });
  })(localizedFormat$1);
  return localizedFormat$1.exports;
}
export { requireLocalizedFormat as __require };
