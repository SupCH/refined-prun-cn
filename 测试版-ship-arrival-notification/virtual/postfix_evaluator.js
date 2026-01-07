import { __exports as postfix_evaluator } from './postfix_evaluator2.js';
var hasRequiredPostfix_evaluator;
function requirePostfix_evaluator() {
  if (hasRequiredPostfix_evaluator) return postfix_evaluator;
  hasRequiredPostfix_evaluator = 1;
  (function (exports$1) {
    (Object.defineProperty(exports$1, '__esModule', { value: true }),
      (exports$1.postfixEval = function (e, a) {
        (((a = a || {}).PI = Math.PI), (a.E = Math.E));
        for (var p, u, r, l = [], s = void 0 !== a.n, t = 0; t < e.length; t++)
          if (1 === e[t].type) l.push({ value: e[t].value, type: 1 });
          else if (3 === e[t].type) l.push({ value: a[e[t].value], type: 1 });
          else if (0 === e[t].type) {
            var v = l[l.length - 1];
            Array.isArray(v) ? v.push(e[t]) : (v.value = e[t].value(v.value));
          } else if (7 === e[t].type) {
            var y = l[l.length - 1];
            Array.isArray(y) ? y.push(e[t]) : (y.value = e[t].value(y.value));
          } else if (8 === e[t].type) {
            for (var h = [], i = 0; i < e[t].numberOfArguments; i++) {
              var o = l.pop();
              o && h.push(o.value);
            }
            l.push({ type: 1, value: e[t].value.apply(e[t], h.reverse()) });
          } else if (10 === e[t].type)
            ((p = l.pop()),
              (u = l.pop()),
              Array.isArray(u)
                ? ((u = u.concat(p)).push(e[t]), l.push(u))
                : Array.isArray(p)
                  ? (p.unshift(u), p.push(e[t]), l.push(p))
                  : l.push({ type: 1, value: e[t].value(u.value, p.value) }));
          else if (2 === e[t].type || 9 === e[t].type)
            ((p = l.pop()),
              (u = l.pop()),
              Array.isArray(u)
                ? ((u = u.concat(p)).push(e[t]), l.push(u))
                : Array.isArray(p)
                  ? (p.unshift(u), p.push(e[t]), l.push(p))
                  : l.push({ type: 1, value: e[t].value(u.value, p.value) }));
          else if (12 === e[t].type) {
            p = l.pop();
            var n = void 0;
            ((n = !Array.isArray(p) && p ? [p] : p || []),
              (u = l.pop()),
              (r = l.pop()),
              l.push({ type: 1, value: e[t].value(r.value, u.value, n) }));
          } else
            13 === e[t].type && (s ? l.push({ value: a[e[t].value], type: 3 }) : l.push([e[t]]));
        if (l.length > 1) throw new Error('Uncaught Syntax error');
        return parseFloat(l[0].value.toFixed(15));
      }));
  })(postfix_evaluator);
  return postfix_evaluator;
}
export { requirePostfix_evaluator as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicG9zdGZpeF9ldmFsdWF0b3IuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9tYXRoLWV4cHJlc3Npb24tZXZhbHVhdG9yQDIuMC43L25vZGVfbW9kdWxlcy9tYXRoLWV4cHJlc3Npb24tZXZhbHVhdG9yL2Rpc3QvZXMvcG9zdGZpeF9ldmFsdWF0b3IuanMiXSwic291cmNlc0NvbnRlbnQiOlsiXCJ1c2Ugc3RyaWN0XCI7T2JqZWN0LmRlZmluZVByb3BlcnR5KGV4cG9ydHMsXCJfX2VzTW9kdWxlXCIse3ZhbHVlOiEwfSksZXhwb3J0cy5wb3N0Zml4RXZhbD1mdW5jdGlvbihlLGEpeyhhPWF8fHt9KS5QST1NYXRoLlBJLGEuRT1NYXRoLkU7Zm9yKHZhciBwLHUscixsPVtdLHM9dm9pZCAwIT09YS5uLHQ9MDt0PGUubGVuZ3RoO3QrKylpZigxPT09ZVt0XS50eXBlKWwucHVzaCh7dmFsdWU6ZVt0XS52YWx1ZSx0eXBlOjF9KTtlbHNlIGlmKDM9PT1lW3RdLnR5cGUpbC5wdXNoKHt2YWx1ZTphW2VbdF0udmFsdWVdLHR5cGU6MX0pO2Vsc2UgaWYoMD09PWVbdF0udHlwZSl7dmFyIHY9bFtsLmxlbmd0aC0xXTtBcnJheS5pc0FycmF5KHYpP3YucHVzaChlW3RdKTp2LnZhbHVlPWVbdF0udmFsdWUodi52YWx1ZSl9ZWxzZSBpZig3PT09ZVt0XS50eXBlKXt2YXIgeT1sW2wubGVuZ3RoLTFdO0FycmF5LmlzQXJyYXkoeSk/eS5wdXNoKGVbdF0pOnkudmFsdWU9ZVt0XS52YWx1ZSh5LnZhbHVlKX1lbHNlIGlmKDg9PT1lW3RdLnR5cGUpe2Zvcih2YXIgaD1bXSxpPTA7aTxlW3RdLm51bWJlck9mQXJndW1lbnRzO2krKyl7dmFyIG89bC5wb3AoKTtvJiZoLnB1c2goby52YWx1ZSl9bC5wdXNoKHt0eXBlOjEsdmFsdWU6ZVt0XS52YWx1ZS5hcHBseShlW3RdLGgucmV2ZXJzZSgpKX0pfWVsc2UgaWYoMTA9PT1lW3RdLnR5cGUpcD1sLnBvcCgpLHU9bC5wb3AoKSxBcnJheS5pc0FycmF5KHUpPygodT11LmNvbmNhdChwKSkucHVzaChlW3RdKSxsLnB1c2godSkpOkFycmF5LmlzQXJyYXkocCk/KHAudW5zaGlmdCh1KSxwLnB1c2goZVt0XSksbC5wdXNoKHApKTpsLnB1c2goe3R5cGU6MSx2YWx1ZTplW3RdLnZhbHVlKHUudmFsdWUscC52YWx1ZSl9KTtlbHNlIGlmKDI9PT1lW3RdLnR5cGV8fDk9PT1lW3RdLnR5cGUpcD1sLnBvcCgpLHU9bC5wb3AoKSxBcnJheS5pc0FycmF5KHUpPygodT11LmNvbmNhdChwKSkucHVzaChlW3RdKSxsLnB1c2godSkpOkFycmF5LmlzQXJyYXkocCk/KHAudW5zaGlmdCh1KSxwLnB1c2goZVt0XSksbC5wdXNoKHApKTpsLnB1c2goe3R5cGU6MSx2YWx1ZTplW3RdLnZhbHVlKHUudmFsdWUscC52YWx1ZSl9KTtlbHNlIGlmKDEyPT09ZVt0XS50eXBlKXtwPWwucG9wKCk7dmFyIG49dm9pZCAwO249IUFycmF5LmlzQXJyYXkocCkmJnA/W3BdOnB8fFtdLHU9bC5wb3AoKSxyPWwucG9wKCksbC5wdXNoKHt0eXBlOjEsdmFsdWU6ZVt0XS52YWx1ZShyLnZhbHVlLHUudmFsdWUsbil9KX1lbHNlIDEzPT09ZVt0XS50eXBlJiYocz9sLnB1c2goe3ZhbHVlOmFbZVt0XS52YWx1ZV0sdHlwZTozfSk6bC5wdXNoKFtlW3RdXSkpO2lmKGwubGVuZ3RoPjEpdGhyb3cgbmV3IEVycm9yKFwiVW5jYXVnaHQgU3ludGF4IGVycm9yXCIpO3JldHVybiBwYXJzZUZsb2F0KGxbMF0udmFsdWUudG9GaXhlZCgxNSkpfTtcbiJdLCJuYW1lcyI6WyJleHBvcnRzIl0sIm1hcHBpbmdzIjoiOzs7Ozs7QUFBYSxXQUFPLGVBQWVBLFdBQVEsY0FBYSxFQUFDLE9BQU0sS0FBRSxDQUFDLEdBQUVBLFVBQUEsY0FBb0IsU0FBUyxHQUFFLEdBQUU7QUFBQyxPQUFDLElBQUUsS0FBRyxDQUFBLEdBQUksS0FBRyxLQUFLLElBQUcsRUFBRSxJQUFFLEtBQUs7QUFBRSxlQUFRLEdBQUUsR0FBRSxHQUFFLElBQUUsQ0FBQSxHQUFHLElBQUUsV0FBUyxFQUFFLEdBQUUsSUFBRSxHQUFFLElBQUUsRUFBRSxRQUFPLElBQUksS0FBRyxNQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRSxLQUFLLEVBQUMsT0FBTSxFQUFFLENBQUMsRUFBRSxPQUFNLE1BQUssRUFBQyxDQUFDO0FBQUEsZUFBVSxNQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRSxLQUFLLEVBQUMsT0FBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRSxNQUFLLEVBQUMsQ0FBQztBQUFBLGVBQVUsTUFBSSxFQUFFLENBQUMsRUFBRSxNQUFLO0FBQUMsWUFBSSxJQUFFLEVBQUUsRUFBRSxTQUFPLENBQUM7QUFBRSxjQUFNLFFBQVEsQ0FBQyxJQUFFLEVBQUUsS0FBSyxFQUFFLENBQUMsQ0FBQyxJQUFFLEVBQUUsUUFBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsS0FBSztBQUFBLE1BQUMsV0FBUyxNQUFJLEVBQUUsQ0FBQyxFQUFFLE1BQUs7QUFBQyxZQUFJLElBQUUsRUFBRSxFQUFFLFNBQU8sQ0FBQztBQUFFLGNBQU0sUUFBUSxDQUFDLElBQUUsRUFBRSxLQUFLLEVBQUUsQ0FBQyxDQUFDLElBQUUsRUFBRSxRQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxLQUFLO0FBQUEsTUFBQyxXQUFTLE1BQUksRUFBRSxDQUFDLEVBQUUsTUFBSztBQUFDLGlCQUFRLElBQUUsSUFBRyxJQUFFLEdBQUUsSUFBRSxFQUFFLENBQUMsRUFBRSxtQkFBa0IsS0FBSTtBQUFDLGNBQUksSUFBRSxFQUFFLElBQUc7QUFBRyxlQUFHLEVBQUUsS0FBSyxFQUFFLEtBQUs7QUFBQSxRQUFDO0FBQUMsVUFBRSxLQUFLLEVBQUMsTUFBSyxHQUFFLE9BQU0sRUFBRSxDQUFDLEVBQUUsTUFBTSxNQUFNLEVBQUUsQ0FBQyxHQUFFLEVBQUUsUUFBTyxDQUFFLEVBQUMsQ0FBQztBQUFBLE1BQUMsV0FBUyxPQUFLLEVBQUUsQ0FBQyxFQUFFLEtBQUssS0FBRSxFQUFFLElBQUcsR0FBRyxJQUFFLEVBQUUsSUFBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQUksSUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRSxFQUFFLEtBQUssQ0FBQyxLQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUcsRUFBRSxRQUFRLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRSxFQUFFLEtBQUssQ0FBQyxLQUFHLEVBQUUsS0FBSyxFQUFDLE1BQUssR0FBRSxPQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFBQSxlQUFVLE1BQUksRUFBRSxDQUFDLEVBQUUsUUFBTSxNQUFJLEVBQUUsQ0FBQyxFQUFFLEtBQUssS0FBRSxFQUFFLElBQUcsR0FBRyxJQUFFLEVBQUUsSUFBRyxHQUFHLE1BQU0sUUFBUSxDQUFDLE1BQUksSUFBRSxFQUFFLE9BQU8sQ0FBQyxHQUFHLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRSxFQUFFLEtBQUssQ0FBQyxLQUFHLE1BQU0sUUFBUSxDQUFDLEtBQUcsRUFBRSxRQUFRLENBQUMsR0FBRSxFQUFFLEtBQUssRUFBRSxDQUFDLENBQUMsR0FBRSxFQUFFLEtBQUssQ0FBQyxLQUFHLEVBQUUsS0FBSyxFQUFDLE1BQUssR0FBRSxPQUFNLEVBQUUsQ0FBQyxFQUFFLE1BQU0sRUFBRSxPQUFNLEVBQUUsS0FBSyxFQUFDLENBQUM7QUFBQSxlQUFVLE9BQUssRUFBRSxDQUFDLEVBQUUsTUFBSztBQUFDLFlBQUUsRUFBRTtBQUFNLFlBQUksSUFBRTtBQUFPLFlBQUUsQ0FBQyxNQUFNLFFBQVEsQ0FBQyxLQUFHLElBQUUsQ0FBQyxDQUFDLElBQUUsS0FBRyxDQUFBLEdBQUcsSUFBRSxFQUFFLElBQUcsR0FBRyxJQUFFLEVBQUUsT0FBTSxFQUFFLEtBQUssRUFBQyxNQUFLLEdBQUUsT0FBTSxFQUFFLENBQUMsRUFBRSxNQUFNLEVBQUUsT0FBTSxFQUFFLE9BQU0sQ0FBQyxFQUFDLENBQUM7QUFBQSxNQUFDLE1BQU0sUUFBSyxFQUFFLENBQUMsRUFBRSxTQUFPLElBQUUsRUFBRSxLQUFLLEVBQUMsT0FBTSxFQUFFLEVBQUUsQ0FBQyxFQUFFLEtBQUssR0FBRSxNQUFLLEVBQUMsQ0FBQyxJQUFFLEVBQUUsS0FBSyxDQUFDLEVBQUUsQ0FBQyxDQUFDLENBQUM7QUFBRyxVQUFHLEVBQUUsU0FBTyxFQUFFLE9BQU0sSUFBSSxNQUFNLHVCQUF1QjtBQUFFLGFBQU8sV0FBVyxFQUFFLENBQUMsRUFBRSxNQUFNLFFBQVEsRUFBRSxDQUFDO0FBQUEsSUFBQztBQUFBOzs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
