import { __exports as lexer } from './lexer2.js';
import { __require as requireToken } from './token.js';
var hasRequiredLexer;
function requireLexer() {
  if (hasRequiredLexer) return lexer;
  hasRequiredLexer = 1;
  Object.defineProperty(lexer, '__esModule', { value: true });
  var e = requireToken();
  function t(e2, t2) {
    for (var n2 = 0; n2 < e2.length; n2++) e2[n2] += t2;
    return e2;
  }
  var n = {
      0: true,
      1: true,
      3: true,
      4: true,
      6: true,
      8: true,
      9: true,
      12: true,
      13: true,
      14: true,
    },
    s = {
      0: true,
      1: true,
      2: true,
      3: true,
      4: true,
      5: true,
      6: true,
      7: true,
      8: true,
      9: true,
      10: true,
      11: true,
      12: true,
      13: true,
    },
    o = { 0: true, 3: true, 4: true, 8: true, 12: true, 13: true },
    p = {},
    r = { 0: true, 1: true, 3: true, 4: true, 6: true, 8: true, 12: true, 13: true },
    T = { 1: true },
    h = [
      [],
      [
        '1',
        '2',
        '3',
        '7',
        '8',
        '9',
        '4',
        '5',
        '6',
        '+',
        '-',
        '*',
        '/',
        '(',
        ')',
        '^',
        '!',
        'P',
        'C',
        'e',
        '0',
        '.',
        ',',
        'n',
        ' ',
        '&',
      ],
      ['pi', 'ln', 'Pi'],
      ['sin', 'cos', 'tan', 'Del', 'int', 'Mod', 'log', 'pow'],
      ['asin', 'acos', 'atan', 'cosh', 'root', 'tanh', 'sinh'],
      ['acosh', 'atanh', 'asinh', 'Sigma'],
    ];
  function E(e2, t2, n2, s2) {
    for (var o2 = 0; o2 < s2; o2++) if (e2[n2 + o2] !== t2[o2]) return false;
    return true;
  }
  function N(e2, t2) {
    for (var n2 = 0; n2 < t2.length; n2++) if (t2[n2].token === e2) return n2;
    return -1;
  }
  ((lexer.addToken = function (t2) {
    for (var n2 = 0; n2 < t2.length; n2++) {
      var s2 = t2[n2].token.length,
        o2 = -1;
      (t2[n2].type === e.tokenTypes.FUNCTION_WITH_N_ARGS &&
        void 0 === t2[n2].numberOfArguments &&
        (t2[n2].numberOfArguments = 2),
        (h[s2] = h[s2] || []));
      for (var p2 = 0; p2 < h[s2].length; p2++)
        if (t2[n2].token === h[s2][p2]) {
          o2 = N(h[s2][p2], this.tokens);
          break;
        }
      -1 === o2
        ? (this.tokens.push(t2[n2]),
          (t2[n2].precedence = e.preced[t2[n2].type]),
          h.length <= t2[n2].token.length && (h[t2[n2].token.length] = []),
          h[t2[n2].token.length].push(t2[n2].token))
        : ((this.tokens[o2] = t2[n2]), (t2[n2].precedence = e.preced[t2[n2].type]));
    }
  }),
    (lexer.lex = function (u, a) {
      var y,
        _ = {
          value: this.math.changeSign,
          type: e.tokenTypes.FUNCTION_WITH_ONE_ARG,
          precedence: 4,
          show: '-',
        },
        i = { value: ')', show: ')', type: e.tokenTypes.CLOSING_PARENTHESIS, precedence: 0 },
        A = { value: '(', type: e.tokenTypes.OPENING_PARENTHESIS, precedence: 0, show: '(' },
        O = [A],
        R = [],
        l = u,
        k = n,
        I = 0,
        f = p,
        P = '';
      void 0 !== a && this.addToken(a);
      var c = (function (e2, t2) {
        for (var n2, s2, o2, p2 = [], r2 = t2.length, T2 = 0; T2 < r2; T2++)
          if (!(T2 < r2 - 1 && ' ' === t2[T2] && ' ' === t2[T2 + 1])) {
            for (
              n2 = '', s2 = t2.length - T2 > h.length - 2 ? h.length - 1 : t2.length - T2;
              s2 > 0;
              s2--
            )
              if (void 0 !== h[s2])
                for (o2 = 0; o2 < h[s2].length; o2++)
                  E(t2, h[s2][o2], T2, s2) && ((n2 = h[s2][o2]), (o2 = h[s2].length), (s2 = 0));
            if (((T2 += n2.length - 1), '' === n2))
              throw new Error("Can't understand after " + t2.slice(T2));
            p2.push(e2.tokens[N(n2, e2.tokens)]);
          }
        return p2;
      })(this, l);
      for (y = 0; y < c.length; y++) {
        var C = c[y];
        if (14 !== C.type) {
          var g,
            S = C.token,
            d = C.type,
            v = C.value,
            w = C.precedence,
            U = C.show,
            m = O[O.length - 1];
          for (g = R.length; g-- && 0 === R[g]; )
            if (
              -1 !==
              [
                e.tokenTypes.FUNCTION_WITH_ONE_ARG,
                e.tokenTypes.BINARY_OPERATOR_HIGH_PRECENDENCE,
                e.tokenTypes.CONSTANT,
                e.tokenTypes.OPENING_PARENTHESIS,
                e.tokenTypes.CLOSING_PARENTHESIS,
                e.tokenTypes.BINARY_OPERATOR_LOW_PRECENDENCE,
                e.tokenTypes.BINARY_OPERATOR_PERMUTATION,
                e.tokenTypes.COMMA,
                e.tokenTypes.EVALUATED_FUNCTION,
                e.tokenTypes.EVALUATED_FUNCTION_PARAMETER,
              ].indexOf(d)
            ) {
              if (true !== k[d]) throw new Error(S + ' is not allowed after ' + P);
              (O.push(i), (k = s), (f = r), R.pop());
            }
          if (true !== k[d]) throw new Error(S + ' is not allowed after ' + P);
          true === f[d] &&
            ((d = e.tokenTypes.BINARY_OPERATOR_HIGH_PRECENDENCE),
            (v = this.math.mul),
            (U = '&times;'),
            (w = 3),
            (y -= 1));
          var H = {
            value: v,
            type: d,
            precedence: w,
            show: U,
            numberOfArguments: C.numberOfArguments,
          };
          if (d === e.tokenTypes.FUNCTION_WITH_ONE_ARG)
            ((k = n),
              (f = p),
              t(R, 1),
              O.push(H),
              c[y + 1].type !== e.tokenTypes.OPENING_PARENTHESIS && (O.push(A), R.push(2)));
          else if (d === e.tokenTypes.NUMBER)
            (m.type === e.tokenTypes.NUMBER ? ((m.value += v), t(R, 1)) : O.push(H),
              (k = s),
              (f = o));
          else if (d === e.tokenTypes.BINARY_OPERATOR_HIGH_PRECENDENCE)
            ((k = n), (f = p), t(R, 2), O.push(H));
          else if (d === e.tokenTypes.CONSTANT) (O.push(H), (k = s), (f = r));
          else if (d === e.tokenTypes.OPENING_PARENTHESIS)
            (t(R, 1), I++, (k = n), (f = p), O.push(H));
          else if (d === e.tokenTypes.CLOSING_PARENTHESIS) {
            if (!I) throw new Error('Closing parenthesis are more than opening one, wait What!!!');
            (I--, (k = s), (f = r), O.push(H), t(R, 1));
          } else if (d === e.tokenTypes.DECIMAL) {
            if (m.hasDec) throw new Error('Two decimals are not allowed in one number');
            (m.type !== e.tokenTypes.NUMBER &&
              ((m = { show: '0', value: 0, type: e.tokenTypes.NUMBER, precedence: 0 }),
              O.push(m),
              t(R, -1)),
              (k = T),
              t(R, 1),
              (f = p),
              (m.value += v),
              (m.hasDec = true));
          } else
            d === e.tokenTypes.POSTFIX_FUNCTION_WITH_ONE_ARG &&
              ((k = s), (f = r), t(R, 1), O.push(H));
          (d === e.tokenTypes.FUNCTION_WITH_N_ARGS
            ? ((k = n),
              (f = p),
              t(R, C.numberOfArguments + 2),
              O.push(H),
              c[y + 1].type !== e.tokenTypes.OPENING_PARENTHESIS &&
                (O.push(A), R.push(C.numberOfArguments + 2)))
            : d === e.tokenTypes.BINARY_OPERATOR_LOW_PRECENDENCE
              ? (m.type === e.tokenTypes.BINARY_OPERATOR_LOW_PRECENDENCE
                  ? m.value === this.math.add
                    ? ((m.value = v), (m.show = U), t(R, 1))
                    : m.value === this.math.sub &&
                      '-' === U &&
                      ((m.value = this.math.add), (m.show = '+'), t(R, 1))
                  : m.type !== e.tokenTypes.CLOSING_PARENTHESIS &&
                      m.type !== e.tokenTypes.POSTFIX_FUNCTION_WITH_ONE_ARG &&
                      m.type !== e.tokenTypes.NUMBER &&
                      m.type !== e.tokenTypes.CONSTANT &&
                      m.type !== e.tokenTypes.EVALUATED_FUNCTION_PARAMETER
                    ? '-' === S && ((k = n), (f = p), t(R, 1), R.push(2), O.push(_), O.push(A))
                    : (O.push(H), t(R, 2)),
                (k = n),
                (f = p))
              : d === e.tokenTypes.BINARY_OPERATOR_PERMUTATION
                ? ((k = n), (f = p), t(R, 2), O.push(H))
                : d === e.tokenTypes.COMMA
                  ? ((k = n), (f = p), O.push(H))
                  : d === e.tokenTypes.EVALUATED_FUNCTION
                    ? ((k = n),
                      (f = p),
                      t(R, 6),
                      O.push(H),
                      c[y + 1].type !== e.tokenTypes.OPENING_PARENTHESIS && (O.push(A), R.push(6)))
                    : d === e.tokenTypes.EVALUATED_FUNCTION_PARAMETER &&
                      ((k = s), (f = r), O.push(H)),
            t(R, -1),
            (P = S));
        } else if (
          y > 0 &&
          y < c.length - 1 &&
          1 === c[y + 1].type &&
          (1 === c[y - 1].type || 6 === c[y - 1].type)
        )
          throw new Error('Unexpected Space');
      }
      for (g = R.length; g--; ) O.push(i);
      if (true !== k[5]) throw new Error('complete the expression');
      for (; I--; ) O.push(i);
      return (O.push(i), O);
    }));
  return lexer;
}
export { requireLexer as __require };
