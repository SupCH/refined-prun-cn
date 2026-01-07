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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibG9jYWxpemVkRm9ybWF0Mi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL2RheWpzQDEuMTEuMTgvbm9kZV9tb2R1bGVzL2RheWpzL3BsdWdpbi9sb2NhbGl6ZWRGb3JtYXQuanMiXSwic291cmNlc0NvbnRlbnQiOlsiIWZ1bmN0aW9uKGUsdCl7XCJvYmplY3RcIj09dHlwZW9mIGV4cG9ydHMmJlwidW5kZWZpbmVkXCIhPXR5cGVvZiBtb2R1bGU/bW9kdWxlLmV4cG9ydHM9dCgpOlwiZnVuY3Rpb25cIj09dHlwZW9mIGRlZmluZSYmZGVmaW5lLmFtZD9kZWZpbmUodCk6KGU9XCJ1bmRlZmluZWRcIiE9dHlwZW9mIGdsb2JhbFRoaXM/Z2xvYmFsVGhpczplfHxzZWxmKS5kYXlqc19wbHVnaW5fbG9jYWxpemVkRm9ybWF0PXQoKX0odGhpcywoZnVuY3Rpb24oKXtcInVzZSBzdHJpY3RcIjt2YXIgZT17TFRTOlwiaDptbTpzcyBBXCIsTFQ6XCJoOm1tIEFcIixMOlwiTU0vREQvWVlZWVwiLExMOlwiTU1NTSBELCBZWVlZXCIsTExMOlwiTU1NTSBELCBZWVlZIGg6bW0gQVwiLExMTEw6XCJkZGRkLCBNTU1NIEQsIFlZWVkgaDptbSBBXCJ9O3JldHVybiBmdW5jdGlvbih0LG8sbil7dmFyIHI9by5wcm90b3R5cGUsaT1yLmZvcm1hdDtuLmVuLmZvcm1hdHM9ZSxyLmZvcm1hdD1mdW5jdGlvbih0KXt2b2lkIDA9PT10JiYodD1cIllZWVktTU0tRERUSEg6bW06c3NaXCIpO3ZhciBvPXRoaXMuJGxvY2FsZSgpLmZvcm1hdHMsbj1mdW5jdGlvbih0LG8pe3JldHVybiB0LnJlcGxhY2UoLyhcXFtbXlxcXV0rXSl8KExUUz98bHsxLDR9fEx7MSw0fSkvZywoZnVuY3Rpb24odCxuLHIpe3ZhciBpPXImJnIudG9VcHBlckNhc2UoKTtyZXR1cm4gbnx8b1tyXXx8ZVtyXXx8b1tpXS5yZXBsYWNlKC8oXFxbW15cXF1dK10pfChNTU1NfE1NfEREfGRkZGQpL2csKGZ1bmN0aW9uKGUsdCxvKXtyZXR1cm4gdHx8by5zbGljZSgxKX0pKX0pKX0odCx2b2lkIDA9PT1vP3t9Om8pO3JldHVybiBpLmNhbGwodGhpcyxuKX19fSkpOyJdLCJuYW1lcyI6WyJ0aGlzIiwidCIsIm8iLCJuIiwiciIsImkiLCJlIl0sIm1hcHBpbmdzIjoiOzs7Ozs7O0FBQUEsTUFBQyxTQUFTLEdBQUUsR0FBRTtBQUFzRCxhQUFBLFVBQWUsRUFBQztBQUFBLElBQXlJLEdBQUVBLGtCQUFNLFdBQVU7QUFBYyxVQUFJLElBQUUsRUFBQyxLQUFJLGFBQVksSUFBRyxVQUFTLEdBQUUsY0FBYSxJQUFHLGdCQUFlLEtBQUksdUJBQXNCLE1BQUssNEJBQTJCO0FBQUUsYUFBTyxTQUFTLEdBQUUsR0FBRSxHQUFFO0FBQUMsWUFBSSxJQUFFLEVBQUUsV0FBVSxJQUFFLEVBQUU7QUFBTyxVQUFFLEdBQUcsVUFBUSxHQUFFLEVBQUUsU0FBTyxTQUFTQyxJQUFFO0FBQUMscUJBQVNBLE9BQUlBLEtBQUU7QUFBd0IsY0FBSUMsS0FBRSxLQUFLLFFBQU8sRUFBRyxTQUFRQyxNQUFFLFNBQVNGLElBQUVDLElBQUU7QUFBQyxtQkFBT0QsR0FBRSxRQUFRLHNDQUFxQyxTQUFTQSxJQUFFRSxJQUFFQyxJQUFFO0FBQUMsa0JBQUlDLEtBQUVELE1BQUdBLEdBQUUsWUFBVztBQUFHLHFCQUFPRCxNQUFHRCxHQUFFRSxFQUFDLEtBQUcsRUFBRUEsRUFBQyxLQUFHRixHQUFFRyxFQUFDLEVBQUUsUUFBUSxtQ0FBa0MsU0FBU0MsSUFBRUwsSUFBRUMsSUFBRTtBQUFDLHVCQUFPRCxNQUFHQyxHQUFFLE1BQU0sQ0FBQztBQUFBLGNBQUMsRUFBQztBQUFBLFlBQUUsRUFBQztBQUFBLFVBQUUsR0FBRUQsSUFBRSxXQUFTQyxLQUFFLENBQUEsSUFBR0EsRUFBQztBQUFFLGlCQUFPLEVBQUUsS0FBSyxNQUFLQyxFQUFDO0FBQUEsUUFBQztBQUFBLE1BQUM7QUFBQSxJQUFDLEVBQUM7QUFBQTs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
