import { __exports as token } from './token2.js';
var hasRequiredToken;
function requireToken() {
  if (hasRequiredToken) return token;
  hasRequiredToken = 1;
  (function (exports$1) {
    function e() {
      return (
        (e = Object.assign
          ? Object.assign.bind()
          : function (e2) {
              for (var t2 = 1; t2 < arguments.length; t2++) {
                var o2 = arguments[t2];
                for (var a in o2) Object.prototype.hasOwnProperty.call(o2, a) && (e2[a] = o2[a]);
              }
              return e2;
            }),
        e.apply(this, arguments)
      );
    }
    Object.defineProperty(exports$1, '__esModule', { value: true });
    var t,
      o = {
        0: 11,
        1: 0,
        2: 3,
        3: 0,
        4: 0,
        5: 0,
        6: 0,
        7: 11,
        8: 11,
        9: 1,
        10: 10,
        11: 0,
        12: 11,
        13: 0,
        14: -1,
      };
    ((exports$1.tokenTypes = void 0),
      ((t = exports$1.tokenTypes || (exports$1.tokenTypes = {}))[(t.FUNCTION_WITH_ONE_ARG = 0)] =
        'FUNCTION_WITH_ONE_ARG'),
      (t[(t.NUMBER = 1)] = 'NUMBER'),
      (t[(t.BINARY_OPERATOR_HIGH_PRECENDENCE = 2)] = 'BINARY_OPERATOR_HIGH_PRECENDENCE'),
      (t[(t.CONSTANT = 3)] = 'CONSTANT'),
      (t[(t.OPENING_PARENTHESIS = 4)] = 'OPENING_PARENTHESIS'),
      (t[(t.CLOSING_PARENTHESIS = 5)] = 'CLOSING_PARENTHESIS'),
      (t[(t.DECIMAL = 6)] = 'DECIMAL'),
      (t[(t.POSTFIX_FUNCTION_WITH_ONE_ARG = 7)] = 'POSTFIX_FUNCTION_WITH_ONE_ARG'),
      (t[(t.FUNCTION_WITH_N_ARGS = 8)] = 'FUNCTION_WITH_N_ARGS'),
      (t[(t.BINARY_OPERATOR_LOW_PRECENDENCE = 9)] = 'BINARY_OPERATOR_LOW_PRECENDENCE'),
      (t[(t.BINARY_OPERATOR_PERMUTATION = 10)] = 'BINARY_OPERATOR_PERMUTATION'),
      (t[(t.COMMA = 11)] = 'COMMA'),
      (t[(t.EVALUATED_FUNCTION = 12)] = 'EVALUATED_FUNCTION'),
      (t[(t.EVALUATED_FUNCTION_PARAMETER = 13)] = 'EVALUATED_FUNCTION_PARAMETER'),
      (t[(t.SPACE = 14)] = 'SPACE'),
      (exports$1.createTokens = function (t2) {
        return [
          { token: 'sin', show: 'sin', type: 0, value: t2.math.sin },
          { token: 'cos', show: 'cos', type: 0, value: t2.math.cos },
          { token: 'tan', show: 'tan', type: 0, value: t2.math.tan },
          { token: 'pi', show: '&pi;', type: 3, value: 'PI' },
          { token: '(', show: '(', type: 4, value: '(' },
          { token: ')', show: ')', type: 5, value: ')' },
          { token: 'P', show: 'P', type: 10, value: t2.math.P },
          { token: 'C', show: 'C', type: 10, value: t2.math.C },
          { token: ' ', show: ' ', type: 14, value: ' '.anchor },
          { token: 'asin', show: 'asin', type: 0, value: t2.math.asin },
          { token: 'acos', show: 'acos', type: 0, value: t2.math.acos },
          { token: 'atan', show: 'atan', type: 0, value: t2.math.atan },
          { token: '7', show: '7', type: 1, value: '7' },
          { token: '8', show: '8', type: 1, value: '8' },
          { token: '9', show: '9', type: 1, value: '9' },
          { token: 'int', show: 'Int', type: 0, value: Math.floor },
          { token: 'cosh', show: 'cosh', type: 0, value: t2.math.cosh },
          { token: 'acosh', show: 'acosh', type: 0, value: t2.math.acosh },
          { token: 'ln', show: ' ln', type: 0, value: Math.log },
          { token: '^', show: '^', type: 10, value: Math.pow },
          { token: 'root', show: 'root', type: 0, value: Math.sqrt },
          { token: '4', show: '4', type: 1, value: '4' },
          { token: '5', show: '5', type: 1, value: '5' },
          { token: '6', show: '6', type: 1, value: '6' },
          { token: '/', show: '&divide;', type: 2, value: t2.math.div },
          { token: '!', show: '!', type: 7, value: t2.math.fact },
          { token: 'tanh', show: 'tanh', type: 0, value: t2.math.tanh },
          { token: 'atanh', show: 'atanh', type: 0, value: t2.math.atanh },
          { token: 'Mod', show: ' Mod ', type: 2, value: t2.math.mod },
          { token: '1', show: '1', type: 1, value: '1' },
          { token: '2', show: '2', type: 1, value: '2' },
          { token: '3', show: '3', type: 1, value: '3' },
          { token: '*', show: '&times;', type: 2, value: t2.math.mul },
          { token: 'sinh', show: 'sinh', type: 0, value: t2.math.sinh },
          { token: 'asinh', show: 'asinh', type: 0, value: t2.math.asinh },
          { token: 'e', show: 'e', type: 3, value: 'E' },
          { token: 'log', show: ' log', type: 0, value: t2.math.log },
          { token: '0', show: '0', type: 1, value: '0' },
          { token: '.', show: '.', type: 6, value: '.' },
          { token: '+', show: '+', type: 9, value: t2.math.add },
          { token: '-', show: '-', type: 9, value: t2.math.sub },
          { token: ',', show: ',', type: 11, value: ',' },
          { token: 'Sigma', show: '&Sigma;', type: 12, value: t2.math.sigma },
          { token: 'n', show: 'n', type: 13, value: 'n' },
          { token: 'Pi', show: '&Pi;', type: 12, value: t2.math.Pi },
          { token: 'pow', show: 'pow', type: 8, value: Math.pow, numberOfArguments: 2 },
          { token: '&', show: '&', type: 9, value: t2.math.and },
        ].map(function (t3) {
          return e({}, t3, { precedence: o[t3.type] });
        });
      }),
      (exports$1.preced = o));
  })(token);
  return token;
}
export { requireToken as __require };
