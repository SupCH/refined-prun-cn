import { __module as es } from './index9.js';
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
