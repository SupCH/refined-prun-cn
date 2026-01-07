import { __exports as postfix } from './postfix2.js';
var hasRequiredPostfix;
function requirePostfix() {
  if (hasRequiredPostfix) return postfix;
  hasRequiredPostfix = 1;
  (function (exports$1) {
    (Object.defineProperty(exports$1, '__esModule', { value: true }),
      (exports$1.toPostfix = function (e) {
        for (
          var p,
            t,
            u,
            l = [],
            o = -1,
            r = -1,
            s = [{ value: '(', type: 4, precedence: 0, show: '(' }],
            a = 1;
          a < e.length;
          a++
        )
          if (1 === e[a].type || 3 === e[a].type || 13 === e[a].type)
            (1 === e[a].type && (e[a].value = Number(e[a].value)), l.push(e[a]));
          else if (4 === e[a].type) s.push(e[a]);
          else if (5 === e[a].type)
            for (; 4 !== (null == (h = t = s.pop()) ? void 0 : h.type); ) {
              var h;
              t && l.push(t);
            }
          else if (11 === e[a].type) {
            for (; 4 !== (null == (v = t = s.pop()) ? void 0 : v.type); ) {
              var v;
              t && l.push(t);
            }
            s.push(t);
          } else {
            ((r = (p = e[a]).precedence), (o = (u = s[s.length - 1]).precedence));
            var n = 'Math.pow' == u.value && 'Math.pow' == p.value;
            if (r > o) s.push(p);
            else {
              for (; (o >= r && !n) || (n && r < o); )
                ((t = s.pop()),
                  (u = s[s.length - 1]),
                  t && l.push(t),
                  (o = u.precedence),
                  (n = 'Math.pow' == p.value && 'Math.pow' == u.value));
              s.push(p);
            }
          }
        return l;
      }));
  })(postfix);
  return postfix;
}
export { requirePostfix as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGZpeC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vbm9kZV9tb2R1bGVzLy5wbnBtL21hdGgtZXhwcmVzc2lvbi1ldmFsdWF0b3JAMi4wLjcvbm9kZV9tb2R1bGVzL21hdGgtZXhwcmVzc2lvbi1ldmFsdWF0b3IvZGlzdC9lcy9wb3N0Zml4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO09iamVjdC5kZWZpbmVQcm9wZXJ0eShleHBvcnRzLFwiX19lc01vZHVsZVwiLHt2YWx1ZTohMH0pLGV4cG9ydHMudG9Qb3N0Zml4PWZ1bmN0aW9uKGUpe2Zvcih2YXIgcCx0LHUsbD1bXSxvPS0xLHI9LTEscz1be3ZhbHVlOlwiKFwiLHR5cGU6NCxwcmVjZWRlbmNlOjAsc2hvdzpcIihcIn1dLGE9MTthPGUubGVuZ3RoO2ErKylpZigxPT09ZVthXS50eXBlfHwzPT09ZVthXS50eXBlfHwxMz09PWVbYV0udHlwZSkxPT09ZVthXS50eXBlJiYoZVthXS52YWx1ZT1OdW1iZXIoZVthXS52YWx1ZSkpLGwucHVzaChlW2FdKTtlbHNlIGlmKDQ9PT1lW2FdLnR5cGUpcy5wdXNoKGVbYV0pO2Vsc2UgaWYoNT09PWVbYV0udHlwZSlmb3IoOzQhPT0obnVsbD09KGg9dD1zLnBvcCgpKT92b2lkIDA6aC50eXBlKTspe3ZhciBoO3QmJmwucHVzaCh0KX1lbHNlIGlmKDExPT09ZVthXS50eXBlKXtmb3IoOzQhPT0obnVsbD09KHY9dD1zLnBvcCgpKT92b2lkIDA6di50eXBlKTspe3ZhciB2O3QmJmwucHVzaCh0KX1zLnB1c2godCl9ZWxzZXtyPShwPWVbYV0pLnByZWNlZGVuY2Usbz0odT1zW3MubGVuZ3RoLTFdKS5wcmVjZWRlbmNlO3ZhciBuPVwiTWF0aC5wb3dcIj09dS52YWx1ZSYmXCJNYXRoLnBvd1wiPT1wLnZhbHVlO2lmKHI+bylzLnB1c2gocCk7ZWxzZXtmb3IoO28+PXImJiFufHxuJiZyPG87KXQ9cy5wb3AoKSx1PXNbcy5sZW5ndGgtMV0sdCYmbC5wdXNoKHQpLG89dS5wcmVjZWRlbmNlLG49XCJNYXRoLnBvd1wiPT1wLnZhbHVlJiZcIk1hdGgucG93XCI9PXUudmFsdWU7cy5wdXNoKHApfX1yZXR1cm4gbH07XG4iXSwibmFtZXMiOlsiZXhwb3J0cyJdLCJtYXBwaW5ncyI6Ijs7Ozs7O0FBQWEsV0FBTyxlQUFlQSxXQUFRLGNBQWEsRUFBQyxPQUFNLEtBQUUsQ0FBQyxHQUFFQSxVQUFBLFlBQWtCLFNBQVMsR0FBRTtBQUFDLGVBQVEsR0FBRSxHQUFFLEdBQUUsSUFBRSxDQUFBLEdBQUcsSUFBRSxJQUFHLElBQUUsSUFBRyxJQUFFLENBQUMsRUFBQyxPQUFNLEtBQUksTUFBSyxHQUFFLFlBQVcsR0FBRSxNQUFLLElBQUcsQ0FBQyxHQUFFLElBQUUsR0FBRSxJQUFFLEVBQUUsUUFBTyxJQUFJLEtBQUcsTUFBSSxFQUFFLENBQUMsRUFBRSxRQUFNLE1BQUksRUFBRSxDQUFDLEVBQUUsUUFBTSxPQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssT0FBSSxFQUFFLENBQUMsRUFBRSxTQUFPLEVBQUUsQ0FBQyxFQUFFLFFBQU0sT0FBTyxFQUFFLENBQUMsRUFBRSxLQUFLLElBQUcsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsZUFBVSxNQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDO0FBQUEsZUFBVSxNQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssUUFBSyxPQUFLLFNBQU8sSUFBRSxJQUFFLEVBQUUsSUFBRyxLQUFJLFNBQU8sRUFBRSxTQUFPO0FBQUMsWUFBSTtBQUFFLGFBQUcsRUFBRSxLQUFLLENBQUM7QUFBQSxNQUFDO0FBQUEsZUFBUyxPQUFLLEVBQUUsQ0FBQyxFQUFFLE1BQUs7QUFBQyxlQUFLLE9BQUssU0FBTyxJQUFFLElBQUUsRUFBRSxTQUFPLFNBQU8sRUFBRSxTQUFPO0FBQUMsY0FBSTtBQUFFLGVBQUcsRUFBRSxLQUFLLENBQUM7QUFBQSxRQUFDO0FBQUMsVUFBRSxLQUFLLENBQUM7QUFBQSxNQUFDLE9BQUs7QUFBQyxhQUFHLElBQUUsRUFBRSxDQUFDLEdBQUcsWUFBVyxLQUFHLElBQUUsRUFBRSxFQUFFLFNBQU8sQ0FBQyxHQUFHO0FBQVcsWUFBSSxJQUFFLGNBQVksRUFBRSxTQUFPLGNBQVksRUFBRTtBQUFNLFlBQUcsSUFBRSxFQUFFLEdBQUUsS0FBSyxDQUFDO0FBQUEsYUFBTTtBQUFDLGlCQUFLLEtBQUcsS0FBRyxDQUFDLEtBQUcsS0FBRyxJQUFFLElBQUcsS0FBRSxFQUFFLElBQUcsR0FBRyxJQUFFLEVBQUUsRUFBRSxTQUFPLENBQUMsR0FBRSxLQUFHLEVBQUUsS0FBSyxDQUFDLEdBQUUsSUFBRSxFQUFFLFlBQVcsSUFBRSxjQUFZLEVBQUUsU0FBTyxjQUFZLEVBQUU7QUFBTSxZQUFFLEtBQUssQ0FBQztBQUFBLFFBQUM7QUFBQSxNQUFDO0FBQUMsYUFBTztBQUFBLElBQUM7QUFBQTs7OyIsInhfZ29vZ2xlX2lnbm9yZUxpc3QiOlswXX0=
