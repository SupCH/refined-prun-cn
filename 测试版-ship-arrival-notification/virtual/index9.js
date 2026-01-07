import { __module as es } from './index10.js';
import { __require as requireLexer } from './lexer.js';
import { __require as requireToken } from './token.js';
import { __require as requirePostfix } from './postfix.js';
import { __require as requirePostfix_evaluator } from './postfix_evaluator.js';
import { __require as requireFunctions } from './functions.js';
var hasRequiredEs;
function requireEs() {
  if (hasRequiredEs) return es.exports;
  hasRequiredEs = 1;
  var t = requireLexer(),
    e = requireToken(),
    i = requirePostfix(),
    o = requirePostfix_evaluator(),
    s = requireFunctions(),
    r = (function () {
      function r2() {
        ((this.toPostfix = i.toPostfix),
          (this.addToken = t.addToken),
          (this.lex = t.lex),
          (this.postfixEval = o.postfixEval),
          (this.math = s.createMathFunctions(this)),
          (this.tokens = e.createTokens(this)));
      }
      return (
        (r2.prototype.eval = function (t2, e2, i2) {
          return this.postfixEval(this.toPostfix(this.lex(t2, e2)), i2);
        }),
        r2
      );
    })();
  ((r.TOKEN_TYPES = e.tokenTypes), (r.tokenTypes = e.tokenTypes), (es.exports = r));
  return es.exports;
}
export { requireEs as __require };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXg5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vbWF0aC1leHByZXNzaW9uLWV2YWx1YXRvckAyLjAuNy9ub2RlX21vZHVsZXMvbWF0aC1leHByZXNzaW9uLWV2YWx1YXRvci9kaXN0L2VzL2luZGV4LmpzIl0sInNvdXJjZXNDb250ZW50IjpbIlwidXNlIHN0cmljdFwiO3ZhciB0PXJlcXVpcmUoXCIuL2xleGVyXCIpLGU9cmVxdWlyZShcIi4vdG9rZW5cIiksaT1yZXF1aXJlKFwiLi9wb3N0Zml4XCIpLG89cmVxdWlyZShcIi4vcG9zdGZpeF9ldmFsdWF0b3JcIikscz1yZXF1aXJlKFwiLi9mdW5jdGlvbnNcIikscj1mdW5jdGlvbigpe2Z1bmN0aW9uIHIoKXt0aGlzLnRvUG9zdGZpeD1pLnRvUG9zdGZpeCx0aGlzLmFkZFRva2VuPXQuYWRkVG9rZW4sdGhpcy5sZXg9dC5sZXgsdGhpcy5wb3N0Zml4RXZhbD1vLnBvc3RmaXhFdmFsLHRoaXMubWF0aD1zLmNyZWF0ZU1hdGhGdW5jdGlvbnModGhpcyksdGhpcy50b2tlbnM9ZS5jcmVhdGVUb2tlbnModGhpcyl9cmV0dXJuIHIucHJvdG90eXBlLmV2YWw9ZnVuY3Rpb24odCxlLGkpe3JldHVybiB0aGlzLnBvc3RmaXhFdmFsKHRoaXMudG9Qb3N0Zml4KHRoaXMubGV4KHQsZSkpLGkpfSxyfSgpO3IuVE9LRU5fVFlQRVM9ZS50b2tlblR5cGVzLHIudG9rZW5UeXBlcz1lLnRva2VuVHlwZXMsbW9kdWxlLmV4cG9ydHM9cjtcbiJdLCJuYW1lcyI6WyJyZXF1aXJlJCQwIiwicmVxdWlyZSQkMSIsInJlcXVpcmUkJDIiLCJyZXF1aXJlJCQzIiwicmVxdWlyZSQkNCIsInIiLCJ0IiwiZSIsImkiLCJlc01vZHVsZSJdLCJtYXBwaW5ncyI6Ijs7Ozs7Ozs7OztBQUFhLE1BQUksSUFBRUEsZ0JBQW1CLElBQUVDLGFBQUEsR0FBbUIsSUFBRUMsZUFBQSxHQUFxQixJQUFFQyx5QkFBQSxHQUErQixJQUFFQyxvQkFBdUIsS0FBRSxXQUFVO0FBQUMsYUFBU0MsS0FBRztBQUFDLFdBQUssWUFBVSxFQUFFLFdBQVUsS0FBSyxXQUFTLEVBQUUsVUFBUyxLQUFLLE1BQUksRUFBRSxLQUFJLEtBQUssY0FBWSxFQUFFLGFBQVksS0FBSyxPQUFLLEVBQUUsb0JBQW9CLElBQUksR0FBRSxLQUFLLFNBQU8sRUFBRSxhQUFhLElBQUk7QUFBQSxJQUFDO0FBQUMsV0FBT0EsR0FBRSxVQUFVLE9BQUssU0FBU0MsSUFBRUMsSUFBRUMsSUFBRTtBQUFDLGFBQU8sS0FBSyxZQUFZLEtBQUssVUFBVSxLQUFLLElBQUlGLElBQUVDLEVBQUMsQ0FBQyxHQUFFQyxFQUFDO0FBQUEsSUFBQyxHQUFFSDtBQUFBLEVBQUMsR0FBQztBQUFHLElBQUUsY0FBWSxFQUFFLFlBQVcsRUFBRSxhQUFXLEVBQUUsWUFBV0ksR0FBQSxVQUFlOzs7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
