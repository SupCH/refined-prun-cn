import { isProxy, unref, isRef } from './reactivity.esm-bundler.js';
import {
  getCurrentInstance,
  watch,
  onMounted,
  nextTick,
  onUnmounted,
} from './runtime-core.esm-bundler.js';
var rn = Object.defineProperty;
var Ne = Object.getOwnPropertySymbols;
var vt = Object.prototype.hasOwnProperty,
  bt = Object.prototype.propertyIsEnumerable;
var mt = (t, e, n) =>
    e in t
      ? rn(t, e, { enumerable: true, configurable: true, writable: true, value: n })
      : (t[e] = n),
  fe = (t, e) => {
    for (var n in e || (e = {})) vt.call(e, n) && mt(t, n, e[n]);
    if (Ne) for (var n of Ne(e)) bt.call(e, n) && mt(t, n, e[n]);
    return t;
  };
var Ve = (t, e) => {
  var n = {};
  for (var o in t) vt.call(t, o) && e.indexOf(o) < 0 && (n[o] = t[o]);
  if (t != null && Ne) for (var o of Ne(t)) e.indexOf(o) < 0 && bt.call(t, o) && (n[o] = t[o]);
  return n;
};
const Bt = '[vue-draggable-plus]: ';
function gn(t) {
  console.warn(Bt + t);
}
function mn(t) {
  console.error(Bt + t);
}
function wt(t, e, n) {
  return (n >= 0 && n < t.length && t.splice(n, 0, t.splice(e, 1)[0]), t);
}
function Et(t, e) {
  return (Array.isArray(t) && t.splice(e, 1), t);
}
function St(t, e, n) {
  return (Array.isArray(t) && t.splice(e, 0, n), t);
}
function yn(t) {
  return typeof t == 'undefined';
}
function wn(t) {
  return typeof t == 'string';
}
function Dt(t, e, n) {
  const o = t.children[n];
  t.insertBefore(e, o);
}
function qe(t) {
  t.parentNode && t.parentNode.removeChild(t);
}
function En(t, e = document) {
  var o;
  let n = null;
  return (
    typeof (e == null ? void 0 : e.querySelector) == 'function'
      ? (n = (o = e == null ? void 0 : e.querySelector) == null ? void 0 : o.call(e, t))
      : (n = document.querySelector(t)),
    n || gn(`Element not found: ${t}`),
    n
  );
}
function Sn(t, e, n = null) {
  return function (...o) {
    return (t.apply(n, o), e.apply(n, o));
  };
}
function Dn(t, e) {
  const n = fe({}, t);
  return (
    Object.keys(e).forEach(o => {
      n[o] ? (n[o] = Sn(t[o], e[o])) : (n[o] = e[o]);
    }),
    n
  );
}
function _n(t) {
  return t instanceof HTMLElement;
}
function _t(t, e) {
  Object.keys(t).forEach(n => {
    e(n, t[n]);
  });
}
function Tn(t) {
  return (
    t.charCodeAt(0) === 111 &&
    t.charCodeAt(1) === 110 && // uppercase letter
    (t.charCodeAt(2) > 122 || t.charCodeAt(2) < 97)
  );
}
const Cn = Object.assign;
/**!
 * Sortable 1.15.2
 * @author	RubaXa   <trash@rubaxa.org>
 * @author	owenm    <owen23355@gmail.com>
 * @license MIT
 */
function Tt(t, e) {
  var n = Object.keys(t);
  if (Object.getOwnPropertySymbols) {
    var o = Object.getOwnPropertySymbols(t);
    (e &&
      (o = o.filter(function (r) {
        return Object.getOwnPropertyDescriptor(t, r).enumerable;
      })),
      n.push.apply(n, o));
  }
  return n;
}
function te(t) {
  for (var e = 1; e < arguments.length; e++) {
    var n = arguments[e] != null ? arguments[e] : {};
    e % 2
      ? Tt(Object(n), true).forEach(function (o) {
          On(t, o, n[o]);
        })
      : Object.getOwnPropertyDescriptors
        ? Object.defineProperties(t, Object.getOwnPropertyDescriptors(n))
        : Tt(Object(n)).forEach(function (o) {
            Object.defineProperty(t, o, Object.getOwnPropertyDescriptor(n, o));
          });
  }
  return t;
}
function Xe(t) {
  '@babel/helpers - typeof';
  return (
    typeof Symbol == 'function' && typeof Symbol.iterator == 'symbol'
      ? (Xe = function (e) {
          return typeof e;
        })
      : (Xe = function (e) {
          return e &&
            typeof Symbol == 'function' &&
            e.constructor === Symbol &&
            e !== Symbol.prototype
            ? 'symbol'
            : typeof e;
        }),
    Xe(t)
  );
}
function On(t, e, n) {
  return (
    e in t
      ? Object.defineProperty(t, e, {
          value: n,
          enumerable: true,
          configurable: true,
          writable: true,
        })
      : (t[e] = n),
    t
  );
}
function re() {
  return (
    (re =
      Object.assign ||
      function (t) {
        for (var e = 1; e < arguments.length; e++) {
          var n = arguments[e];
          for (var o in n) Object.prototype.hasOwnProperty.call(n, o) && (t[o] = n[o]);
        }
        return t;
      }),
    re.apply(this, arguments)
  );
}
function In(t, e) {
  if (t == null) return {};
  var n = {},
    o = Object.keys(t),
    r,
    i;
  for (i = 0; i < o.length; i++) ((r = o[i]), !(e.indexOf(r) >= 0) && (n[r] = t[r]));
  return n;
}
function An(t, e) {
  if (t == null) return {};
  var n = In(t, e),
    o,
    r;
  if (Object.getOwnPropertySymbols) {
    var i = Object.getOwnPropertySymbols(t);
    for (r = 0; r < i.length; r++)
      ((o = i[r]),
        !(e.indexOf(o) >= 0) && Object.prototype.propertyIsEnumerable.call(t, o) && (n[o] = t[o]));
  }
  return n;
}
var xn = '1.15.2';
function oe(t) {
  if (typeof window != 'undefined' && window.navigator)
    return !!(/* @__PURE__ */ navigator.userAgent.match(t));
}
var ie = oe(/(?:Trident.*rv[ :]?11\.|msie|iemobile|Windows Phone)/i),
  Ae = oe(/Edge/i),
  Ct = oe(/firefox/i),
  _e = oe(/safari/i) && !oe(/chrome/i) && !oe(/android/i),
  kt = oe(/iP(ad|od|hone)/i),
  Ht = oe(/chrome/i) && oe(/android/i),
  Lt = {
    capture: false,
    passive: false,
  };
function D(t, e, n) {
  t.addEventListener(e, n, !ie && Lt);
}
function S(t, e, n) {
  t.removeEventListener(e, n, !ie && Lt);
}
function Le(t, e) {
  if (e) {
    if ((e[0] === '>' && (e = e.substring(1)), t))
      try {
        if (t.matches) return t.matches(e);
        if (t.msMatchesSelector) return t.msMatchesSelector(e);
        if (t.webkitMatchesSelector) return t.webkitMatchesSelector(e);
      } catch (n) {
        return false;
      }
    return false;
  }
}
function Nn(t) {
  return t.host && t !== document && t.host.nodeType ? t.host : t.parentNode;
}
function Z(t, e, n, o) {
  if (t) {
    n = n || document;
    do {
      if (
        (e != null && (e[0] === '>' ? t.parentNode === n && Le(t, e) : Le(t, e))) ||
        (o && t === n)
      )
        return t;
      if (t === n) break;
    } while ((t = Nn(t)));
  }
  return null;
}
var Ot = /\s+/g;
function V(t, e, n) {
  if (t && e)
    if (t.classList) t.classList[n ? 'add' : 'remove'](e);
    else {
      var o = (' ' + t.className + ' ').replace(Ot, ' ').replace(' ' + e + ' ', ' ');
      t.className = (o + (n ? ' ' + e : '')).replace(Ot, ' ');
    }
}
function h(t, e, n) {
  var o = t && t.style;
  if (o) {
    if (n === void 0)
      return (
        document.defaultView && document.defaultView.getComputedStyle
          ? (n = document.defaultView.getComputedStyle(t, ''))
          : t.currentStyle && (n = t.currentStyle),
        e === void 0 ? n : n[e]
      );
    (!(e in o) && e.indexOf('webkit') === -1 && (e = '-webkit-' + e),
      (o[e] = n + (typeof n == 'string' ? '' : 'px')));
  }
}
function ye(t, e) {
  var n = '';
  if (typeof t == 'string') n = t;
  else
    do {
      var o = h(t, 'transform');
      o && o !== 'none' && (n = o + ' ' + n);
    } while (!e && (t = t.parentNode));
  var r = window.DOMMatrix || window.WebKitCSSMatrix || window.CSSMatrix || window.MSCSSMatrix;
  return r && new r(n);
}
function Wt(t, e, n) {
  if (t) {
    var o = t.getElementsByTagName(e),
      r = 0,
      i = o.length;
    if (n) for (; r < i; r++) n(o[r], r);
    return o;
  }
  return [];
}
function ee() {
  var t = document.scrollingElement;
  return t || document.documentElement;
}
function M(t, e, n, o, r) {
  if (!(!t.getBoundingClientRect && t !== window)) {
    var i, a, l, s, u, d, f;
    if (
      (t !== window && t.parentNode && t !== ee()
        ? ((i = t.getBoundingClientRect()),
          (a = i.top),
          (l = i.left),
          (s = i.bottom),
          (u = i.right),
          (d = i.height),
          (f = i.width))
        : ((a = 0),
          (l = 0),
          (s = window.innerHeight),
          (u = window.innerWidth),
          (d = window.innerHeight),
          (f = window.innerWidth)),
      (e || n) && t !== window && ((r = r || t.parentNode), !ie))
    )
      do
        if (
          r &&
          r.getBoundingClientRect &&
          (h(r, 'transform') !== 'none' || (n && h(r, 'position') !== 'static'))
        ) {
          var m = r.getBoundingClientRect();
          ((a -= m.top + parseInt(h(r, 'border-top-width'))),
            (l -= m.left + parseInt(h(r, 'border-left-width'))),
            (s = a + i.height),
            (u = l + i.width));
          break;
        }
      while ((r = r.parentNode));
    if (o && t !== window) {
      var y = ye(r || t),
        b = y && y.a,
        E = y && y.d;
      y && ((a /= E), (l /= b), (f /= b), (d /= E), (s = a + d), (u = l + f));
    }
    return {
      top: a,
      left: l,
      bottom: s,
      right: u,
      width: f,
      height: d,
    };
  }
}
function It(t, e, n) {
  for (var o = ue(t, true), r = M(t)[e]; o; ) {
    var i = M(o)[n],
      a = void 0;
    if (((a = r >= i), !a)) return o;
    if (o === ee()) break;
    o = ue(o, false);
  }
  return false;
}
function we(t, e, n, o) {
  for (var r = 0, i = 0, a = t.children; i < a.length; ) {
    if (
      a[i].style.display !== 'none' &&
      a[i] !== p.ghost &&
      (o || a[i] !== p.dragged) &&
      Z(a[i], n.draggable, t, false)
    ) {
      if (r === e) return a[i];
      r++;
    }
    i++;
  }
  return null;
}
function dt(t, e) {
  for (
    var n = t.lastElementChild;
    n && (n === p.ghost || h(n, 'display') === 'none' || (e && !Le(n, e)));

  )
    n = n.previousElementSibling;
  return n || null;
}
function K(t, e) {
  var n = 0;
  if (!t || !t.parentNode) return -1;
  for (; (t = t.previousElementSibling); )
    t.nodeName.toUpperCase() !== 'TEMPLATE' && t !== p.clone && (!e || Le(t, e)) && n++;
  return n;
}
function At(t) {
  var e = 0,
    n = 0,
    o = ee();
  if (t)
    do {
      var r = ye(t),
        i = r.a,
        a = r.d;
      ((e += t.scrollLeft * i), (n += t.scrollTop * a));
    } while (t !== o && (t = t.parentNode));
  return [e, n];
}
function Pn(t, e) {
  for (var n in t)
    if (t.hasOwnProperty(n)) {
      for (var o in e) if (e.hasOwnProperty(o) && e[o] === t[n][o]) return Number(n);
    }
  return -1;
}
function ue(t, e) {
  if (!t || !t.getBoundingClientRect) return ee();
  var n = t,
    o = false;
  do
    if (n.clientWidth < n.scrollWidth || n.clientHeight < n.scrollHeight) {
      var r = h(n);
      if (
        (n.clientWidth < n.scrollWidth && (r.overflowX == 'auto' || r.overflowX == 'scroll')) ||
        (n.clientHeight < n.scrollHeight && (r.overflowY == 'auto' || r.overflowY == 'scroll'))
      ) {
        if (!n.getBoundingClientRect || n === document.body) return ee();
        if (o || e) return n;
        o = true;
      }
    }
  while ((n = n.parentNode));
  return ee();
}
function Mn(t, e) {
  if (t && e) for (var n in e) e.hasOwnProperty(n) && (t[n] = e[n]);
  return t;
}
function Ke(t, e) {
  return (
    Math.round(t.top) === Math.round(e.top) &&
    Math.round(t.left) === Math.round(e.left) &&
    Math.round(t.height) === Math.round(e.height) &&
    Math.round(t.width) === Math.round(e.width)
  );
}
var Te;
function Gt(t, e) {
  return function () {
    if (!Te) {
      var n = arguments,
        o = this;
      (n.length === 1 ? t.call(o, n[0]) : t.apply(o, n),
        (Te = setTimeout(function () {
          Te = void 0;
        }, e)));
    }
  };
}
function Fn() {
  (clearTimeout(Te), (Te = void 0));
}
function jt(t, e, n) {
  ((t.scrollLeft += e), (t.scrollTop += n));
}
function zt(t) {
  var e = window.Polymer,
    n = window.jQuery || window.Zepto;
  return e && e.dom ? e.dom(t).cloneNode(true) : n ? n(t).clone(true)[0] : t.cloneNode(true);
}
function Ut(t, e, n) {
  var o = {};
  return (
    Array.from(t.children).forEach(function (r) {
      var i, a, l, s;
      if (!(!Z(r, e.draggable, t, false) || r.animated || r === n)) {
        var u = M(r);
        ((o.left = Math.min((i = o.left) !== null && i !== void 0 ? i : 1 / 0, u.left)),
          (o.top = Math.min((a = o.top) !== null && a !== void 0 ? a : 1 / 0, u.top)),
          (o.right = Math.max((l = o.right) !== null && l !== void 0 ? l : -1 / 0, u.right)),
          (o.bottom = Math.max((s = o.bottom) !== null && s !== void 0 ? s : -1 / 0, u.bottom)));
      }
    }),
    (o.width = o.right - o.left),
    (o.height = o.bottom - o.top),
    (o.x = o.left),
    (o.y = o.top),
    o
  );
}
var q = 'Sortable' + /* @__PURE__ */ new Date().getTime();
function Rn() {
  var t = [],
    e;
  return {
    captureAnimationState: function () {
      if (((t = []), !!this.options.animation)) {
        var o = [].slice.call(this.el.children);
        o.forEach(function (r) {
          if (!(h(r, 'display') === 'none' || r === p.ghost)) {
            t.push({
              target: r,
              rect: M(r),
            });
            var i = te({}, t[t.length - 1].rect);
            if (r.thisAnimationDuration) {
              var a = ye(r, true);
              a && ((i.top -= a.f), (i.left -= a.e));
            }
            r.fromRect = i;
          }
        });
      }
    },
    addAnimationState: function (o) {
      t.push(o);
    },
    removeAnimationState: function (o) {
      t.splice(
        Pn(t, {
          target: o,
        }),
        1,
      );
    },
    animateAll: function (o) {
      var r = this;
      if (!this.options.animation) {
        (clearTimeout(e), typeof o == 'function' && o());
        return;
      }
      var i = false,
        a = 0;
      (t.forEach(function (l) {
        var s = 0,
          u = l.target,
          d = u.fromRect,
          f = M(u),
          m = u.prevFromRect,
          y = u.prevToRect,
          b = l.rect,
          E = ye(u, true);
        (E && ((f.top -= E.f), (f.left -= E.e)),
          (u.toRect = f),
          u.thisAnimationDuration &&
            Ke(m, f) &&
            !Ke(d, f) && // Make sure animatingRect is on line between toRect & fromRect
            (b.top - f.top) / (b.left - f.left) === (d.top - f.top) / (d.left - f.left) &&
            (s = Yn(b, m, y, r.options)),
          Ke(f, d) ||
            ((u.prevFromRect = d),
            (u.prevToRect = f),
            s || (s = r.options.animation),
            r.animate(u, b, f, s)),
          s &&
            ((i = true),
            (a = Math.max(a, s)),
            clearTimeout(u.animationResetTimer),
            (u.animationResetTimer = setTimeout(function () {
              ((u.animationTime = 0),
                (u.prevFromRect = null),
                (u.fromRect = null),
                (u.prevToRect = null),
                (u.thisAnimationDuration = null));
            }, s)),
            (u.thisAnimationDuration = s)));
      }),
        clearTimeout(e),
        i
          ? (e = setTimeout(function () {
              typeof o == 'function' && o();
            }, a))
          : typeof o == 'function' && o(),
        (t = []));
    },
    animate: function (o, r, i, a) {
      if (a) {
        (h(o, 'transition', ''), h(o, 'transform', ''));
        var l = ye(this.el),
          s = l && l.a,
          u = l && l.d,
          d = (r.left - i.left) / (s || 1),
          f = (r.top - i.top) / (u || 1);
        ((o.animatingX = !!d),
          (o.animatingY = !!f),
          h(o, 'transform', 'translate3d(' + d + 'px,' + f + 'px,0)'),
          (this.forRepaintDummy = Xn(o)),
          h(
            o,
            'transition',
            'transform ' + a + 'ms' + (this.options.easing ? ' ' + this.options.easing : ''),
          ),
          h(o, 'transform', 'translate3d(0,0,0)'),
          typeof o.animated == 'number' && clearTimeout(o.animated),
          (o.animated = setTimeout(function () {
            (h(o, 'transition', ''),
              h(o, 'transform', ''),
              (o.animated = false),
              (o.animatingX = false),
              (o.animatingY = false));
          }, a)));
      }
    },
  };
}
function Xn(t) {
  return t.offsetWidth;
}
function Yn(t, e, n, o) {
  return (
    (Math.sqrt(Math.pow(e.top - t.top, 2) + Math.pow(e.left - t.left, 2)) /
      Math.sqrt(Math.pow(e.top - n.top, 2) + Math.pow(e.left - n.left, 2))) *
    o.animation
  );
}
var ge = [],
  Je = {
    initializeByDefault: true,
  },
  xe = {
    mount: function (e) {
      for (var n in Je) Je.hasOwnProperty(n) && !(n in e) && (e[n] = Je[n]);
      (ge.forEach(function (o) {
        if (o.pluginName === e.pluginName)
          throw 'Sortable: Cannot mount plugin '.concat(e.pluginName, ' more than once');
      }),
        ge.push(e));
    },
    pluginEvent: function (e, n, o) {
      var r = this;
      ((this.eventCanceled = false),
        (o.cancel = function () {
          r.eventCanceled = true;
        }));
      var i = e + 'Global';
      ge.forEach(function (a) {
        n[a.pluginName] &&
          (n[a.pluginName][i] &&
            n[a.pluginName][i](
              te(
                {
                  sortable: n,
                },
                o,
              ),
            ),
          n.options[a.pluginName] &&
            n[a.pluginName][e] &&
            n[a.pluginName][e](
              te(
                {
                  sortable: n,
                },
                o,
              ),
            ));
      });
    },
    initializePlugins: function (e, n, o, r) {
      ge.forEach(function (l) {
        var s = l.pluginName;
        if (!(!e.options[s] && !l.initializeByDefault)) {
          var u = new l(e, n, e.options);
          ((u.sortable = e), (u.options = e.options), (e[s] = u), re(o, u.defaults));
        }
      });
      for (var i in e.options)
        if (e.options.hasOwnProperty(i)) {
          var a = this.modifyOption(e, i, e.options[i]);
          typeof a != 'undefined' && (e.options[i] = a);
        }
    },
    getEventProperties: function (e, n) {
      var o = {};
      return (
        ge.forEach(function (r) {
          typeof r.eventProperties == 'function' &&
            re(o, r.eventProperties.call(n[r.pluginName], e));
        }),
        o
      );
    },
    modifyOption: function (e, n, o) {
      var r;
      return (
        ge.forEach(function (i) {
          e[i.pluginName] &&
            i.optionListeners &&
            typeof i.optionListeners[n] == 'function' &&
            (r = i.optionListeners[n].call(e[i.pluginName], o));
        }),
        r
      );
    },
  };
function Bn(t) {
  var e = t.sortable,
    n = t.rootEl,
    o = t.name,
    r = t.targetEl,
    i = t.cloneEl,
    a = t.toEl,
    l = t.fromEl,
    s = t.oldIndex,
    u = t.newIndex,
    d = t.oldDraggableIndex,
    f = t.newDraggableIndex,
    m = t.originalEvent,
    y = t.putSortable,
    b = t.extraEventProperties;
  if (((e = e || (n && n[q])), !!e)) {
    var E,
      k = e.options,
      H = 'on' + o.charAt(0).toUpperCase() + o.substr(1);
    (window.CustomEvent && !ie && !Ae
      ? (E = new CustomEvent(o, {
          bubbles: true,
          cancelable: true,
        }))
      : ((E = document.createEvent('Event')), E.initEvent(o, true, true)),
      (E.to = a || n),
      (E.from = l || n),
      (E.item = r || n),
      (E.clone = i),
      (E.oldIndex = s),
      (E.newIndex = u),
      (E.oldDraggableIndex = d),
      (E.newDraggableIndex = f),
      (E.originalEvent = m),
      (E.pullMode = y ? y.lastPutMode : void 0));
    var F = te(te({}, b), xe.getEventProperties(o, e));
    for (var A in F) E[A] = F[A];
    (n && n.dispatchEvent(E), k[H] && k[H].call(e, E));
  }
}
var kn = ['evt'],
  G = function (e, n) {
    var o = arguments.length > 2 && arguments[2] !== void 0 ? arguments[2] : {},
      r = o.evt,
      i = An(o, kn);
    xe.pluginEvent.bind(p)(
      e,
      n,
      te(
        {
          dragEl: c,
          parentEl: I,
          ghostEl: g,
          rootEl: C,
          nextEl: pe,
          lastDownEl: Ye,
          cloneEl: O,
          cloneHidden: se,
          dragStarted: Ee,
          putSortable: X,
          activeSortable: p.active,
          originalEvent: r,
          oldIndex: be,
          oldDraggableIndex: Ce,
          newIndex: $,
          newDraggableIndex: le,
          hideGhostForTarget: Kt,
          unhideGhostForTarget: Jt,
          cloneNowHidden: function () {
            se = true;
          },
          cloneNowShown: function () {
            se = false;
          },
          dispatchSortableEvent: function (l) {
            W({
              sortable: n,
              name: l,
              originalEvent: r,
            });
          },
        },
        i,
      ),
    );
  };
function W(t) {
  Bn(
    te(
      {
        putSortable: X,
        cloneEl: O,
        targetEl: c,
        rootEl: C,
        oldIndex: be,
        oldDraggableIndex: Ce,
        newIndex: $,
        newDraggableIndex: le,
      },
      t,
    ),
  );
}
var c,
  I,
  g,
  C,
  pe,
  Ye,
  O,
  se,
  be,
  $,
  Ce,
  le,
  Pe,
  X,
  ve = false,
  We = false,
  Ge = [],
  de,
  J,
  Ze,
  Qe,
  xt,
  Nt,
  Ee,
  me,
  Oe,
  Ie = false,
  Me = false,
  Be,
  B,
  et = [],
  at = false,
  je = [],
  Ue = typeof document != 'undefined',
  Fe = kt,
  Pt = Ae || ie ? 'cssFloat' : 'float',
  Hn = Ue && !Ht && !kt && 'draggable' in document.createElement('div'),
  Vt = (function () {
    if (Ue) {
      if (ie) return false;
      var t = document.createElement('x');
      return ((t.style.cssText = 'pointer-events:auto'), t.style.pointerEvents === 'auto');
    }
  })(),
  $t = function (e, n) {
    var o = h(e),
      r =
        parseInt(o.width) -
        parseInt(o.paddingLeft) -
        parseInt(o.paddingRight) -
        parseInt(o.borderLeftWidth) -
        parseInt(o.borderRightWidth),
      i = we(e, 0, n),
      a = we(e, 1, n),
      l = i && h(i),
      s = a && h(a),
      u = l && parseInt(l.marginLeft) + parseInt(l.marginRight) + M(i).width,
      d = s && parseInt(s.marginLeft) + parseInt(s.marginRight) + M(a).width;
    if (o.display === 'flex')
      return o.flexDirection === 'column' || o.flexDirection === 'column-reverse'
        ? 'vertical'
        : 'horizontal';
    if (o.display === 'grid')
      return o.gridTemplateColumns.split(' ').length <= 1 ? 'vertical' : 'horizontal';
    if (i && l.float && l.float !== 'none') {
      var f = l.float === 'left' ? 'left' : 'right';
      return a && (s.clear === 'both' || s.clear === f) ? 'vertical' : 'horizontal';
    }
    return i &&
      (l.display === 'block' ||
        l.display === 'flex' ||
        l.display === 'table' ||
        l.display === 'grid' ||
        (u >= r && o[Pt] === 'none') ||
        (a && o[Pt] === 'none' && u + d > r))
      ? 'vertical'
      : 'horizontal';
  },
  Ln = function (e, n, o) {
    var r = o ? e.left : e.top,
      i = o ? e.right : e.bottom,
      a = o ? e.width : e.height,
      l = o ? n.left : n.top,
      s = o ? n.right : n.bottom,
      u = o ? n.width : n.height;
    return r === l || i === s || r + a / 2 === l + u / 2;
  },
  Wn = function (e, n) {
    var o;
    return (
      Ge.some(function (r) {
        var i = r[q].options.emptyInsertThreshold;
        if (!(!i || dt(r))) {
          var a = M(r),
            l = e >= a.left - i && e <= a.right + i,
            s = n >= a.top - i && n <= a.bottom + i;
          if (l && s) return (o = r);
        }
      }),
      o
    );
  },
  qt = function (e) {
    function n(i, a) {
      return function (l, s, u, d) {
        var f =
          l.options.group.name &&
          s.options.group.name &&
          l.options.group.name === s.options.group.name;
        if (i == null && (a || f)) return true;
        if (i == null || i === false) return false;
        if (a && i === 'clone') return i;
        if (typeof i == 'function') return n(i(l, s, u, d), a)(l, s, u, d);
        var m = (a ? l : s).options.group.name;
        return i === true || (typeof i == 'string' && i === m) || (i.join && i.indexOf(m) > -1);
      };
    }
    var o = {},
      r = e.group;
    ((!r || Xe(r) != 'object') &&
      (r = {
        name: r,
      }),
      (o.name = r.name),
      (o.checkPull = n(r.pull, true)),
      (o.checkPut = n(r.put)),
      (o.revertClone = r.revertClone),
      (e.group = o));
  },
  Kt = function () {
    !Vt && g && h(g, 'display', 'none');
  },
  Jt = function () {
    !Vt && g && h(g, 'display', '');
  };
Ue &&
  !Ht &&
  document.addEventListener(
    'click',
    function (t) {
      if (We)
        return (
          t.preventDefault(),
          t.stopPropagation && t.stopPropagation(),
          t.stopImmediatePropagation && t.stopImmediatePropagation(),
          (We = false),
          false
        );
    },
    true,
  );
var he = function (e) {
    if (c) {
      e = e.touches ? e.touches[0] : e;
      var n = Wn(e.clientX, e.clientY);
      if (n) {
        var o = {};
        for (var r in e) e.hasOwnProperty(r) && (o[r] = e[r]);
        ((o.target = o.rootEl = n),
          (o.preventDefault = void 0),
          (o.stopPropagation = void 0),
          n[q]._onDragOver(o));
      }
    }
  },
  Gn = function (e) {
    c && c.parentNode[q]._isOutsideThisEl(e.target);
  };
function p(t, e) {
  if (!(t && t.nodeType && t.nodeType === 1))
    throw 'Sortable: `el` must be an HTMLElement, not '.concat({}.toString.call(t));
  ((this.el = t), (this.options = e = re({}, e)), (t[q] = this));
  var n = {
    group: null,
    sort: true,
    disabled: false,
    store: null,
    handle: null,
    draggable: /^[uo]l$/i.test(t.nodeName) ? '>li' : '>*',
    swapThreshold: 1,
    // percentage; 0 <= x <= 1
    invertSwap: false,
    // invert always
    invertedSwapThreshold: null,
    // will be set to same as swapThreshold if default
    removeCloneOnHide: true,
    direction: function () {
      return $t(t, this.options);
    },
    ghostClass: 'sortable-ghost',
    chosenClass: 'sortable-chosen',
    dragClass: 'sortable-drag',
    ignore: 'a, img',
    filter: null,
    preventOnFilter: true,
    animation: 0,
    easing: null,
    setData: function (a, l) {
      a.setData('Text', l.textContent);
    },
    dropBubble: false,
    dragoverBubble: false,
    dataIdAttr: 'data-id',
    delay: 0,
    delayOnTouchOnly: false,
    touchStartThreshold:
      (Number.parseInt ? Number : window).parseInt(window.devicePixelRatio, 10) || 1,
    forceFallback: false,
    fallbackClass: 'sortable-fallback',
    fallbackOnBody: false,
    fallbackTolerance: 0,
    fallbackOffset: {
      x: 0,
      y: 0,
    },
    supportPointer: p.supportPointer !== false && 'PointerEvent' in window && !_e,
    emptyInsertThreshold: 5,
  };
  xe.initializePlugins(this, t, n);
  for (var o in n) !(o in e) && (e[o] = n[o]);
  qt(e);
  for (var r in this)
    r.charAt(0) === '_' && typeof this[r] == 'function' && (this[r] = this[r].bind(this));
  ((this.nativeDraggable = e.forceFallback ? false : Hn),
    this.nativeDraggable && (this.options.touchStartThreshold = 1),
    e.supportPointer
      ? D(t, 'pointerdown', this._onTapStart)
      : (D(t, 'mousedown', this._onTapStart), D(t, 'touchstart', this._onTapStart)),
    this.nativeDraggable && (D(t, 'dragover', this), D(t, 'dragenter', this)),
    Ge.push(this.el),
    e.store && e.store.get && this.sort(e.store.get(this) || []),
    re(this, Rn()));
}
p.prototype =
  /** @lends Sortable.prototype */
  {
    constructor: p,
    _isOutsideThisEl: function (e) {
      !this.el.contains(e) && e !== this.el && (me = null);
    },
    _getDirection: function (e, n) {
      return typeof this.options.direction == 'function'
        ? this.options.direction.call(this, e, n, c)
        : this.options.direction;
    },
    _onTapStart: function (e) {
      if (e.cancelable) {
        var n = this,
          o = this.el,
          r = this.options,
          i = r.preventOnFilter,
          a = e.type,
          l = (e.touches && e.touches[0]) || (e.pointerType && e.pointerType === 'touch' && e),
          s = (l || e).target,
          u =
            (e.target.shadowRoot &&
              ((e.path && e.path[0]) || (e.composedPath && e.composedPath()[0]))) ||
            s,
          d = r.filter;
        if (
          (Jn(o),
          !c &&
            !((/mousedown|pointerdown/.test(a) && e.button !== 0) || r.disabled) &&
            !u.isContentEditable &&
            !(!this.nativeDraggable && _e && s && s.tagName.toUpperCase() === 'SELECT') &&
            ((s = Z(s, r.draggable, o, false)), !(s && s.animated) && Ye !== s))
        ) {
          if (((be = K(s)), (Ce = K(s, r.draggable)), typeof d == 'function')) {
            if (d.call(this, e, s, this)) {
              (W({
                sortable: n,
                rootEl: u,
                name: 'filter',
                targetEl: s,
                toEl: o,
                fromEl: o,
              }),
                G('filter', n, {
                  evt: e,
                }),
                i && e.cancelable && e.preventDefault());
              return;
            }
          } else if (
            d &&
            ((d = d.split(',').some(function (f) {
              if (((f = Z(u, f.trim(), o, false)), f))
                return (
                  W({
                    sortable: n,
                    rootEl: f,
                    name: 'filter',
                    targetEl: s,
                    fromEl: o,
                    toEl: o,
                  }),
                  G('filter', n, {
                    evt: e,
                  }),
                  true
                );
            })),
            d)
          ) {
            i && e.cancelable && e.preventDefault();
            return;
          }
          (r.handle && !Z(u, r.handle, o, false)) || this._prepareDragStart(e, l, s);
        }
      }
    },
    _prepareDragStart: function (e, n, o) {
      var r = this,
        i = r.el,
        a = r.options,
        l = i.ownerDocument,
        s;
      if (o && !c && o.parentNode === i) {
        var u = M(o);
        if (
          ((C = i),
          (c = o),
          (I = c.parentNode),
          (pe = c.nextSibling),
          (Ye = o),
          (Pe = a.group),
          (p.dragged = c),
          (de = {
            target: c,
            clientX: (n || e).clientX,
            clientY: (n || e).clientY,
          }),
          (xt = de.clientX - u.left),
          (Nt = de.clientY - u.top),
          (this._lastX = (n || e).clientX),
          (this._lastY = (n || e).clientY),
          (c.style['will-change'] = 'all'),
          (s = function () {
            if (
              (G('delayEnded', r, {
                evt: e,
              }),
              p.eventCanceled)
            ) {
              r._onDrop();
              return;
            }
            (r._disableDelayedDragEvents(),
              !Ct && r.nativeDraggable && (c.draggable = true),
              r._triggerDragStart(e, n),
              W({
                sortable: r,
                name: 'choose',
                originalEvent: e,
              }),
              V(c, a.chosenClass, true));
          }),
          a.ignore.split(',').forEach(function (d) {
            Wt(c, d.trim(), tt);
          }),
          D(l, 'dragover', he),
          D(l, 'mousemove', he),
          D(l, 'touchmove', he),
          D(l, 'mouseup', r._onDrop),
          D(l, 'touchend', r._onDrop),
          D(l, 'touchcancel', r._onDrop),
          Ct &&
            this.nativeDraggable &&
            ((this.options.touchStartThreshold = 4), (c.draggable = true)),
          G('delayStart', this, {
            evt: e,
          }),
          a.delay && (!a.delayOnTouchOnly || n) && (!this.nativeDraggable || !(Ae || ie)))
        ) {
          if (p.eventCanceled) {
            this._onDrop();
            return;
          }
          (D(l, 'mouseup', r._disableDelayedDrag),
            D(l, 'touchend', r._disableDelayedDrag),
            D(l, 'touchcancel', r._disableDelayedDrag),
            D(l, 'mousemove', r._delayedDragTouchMoveHandler),
            D(l, 'touchmove', r._delayedDragTouchMoveHandler),
            a.supportPointer && D(l, 'pointermove', r._delayedDragTouchMoveHandler),
            (r._dragStartTimer = setTimeout(s, a.delay)));
        } else s();
      }
    },
    _delayedDragTouchMoveHandler: function (e) {
      var n = e.touches ? e.touches[0] : e;
      Math.max(Math.abs(n.clientX - this._lastX), Math.abs(n.clientY - this._lastY)) >=
        Math.floor(
          this.options.touchStartThreshold /
            ((this.nativeDraggable && window.devicePixelRatio) || 1),
        ) && this._disableDelayedDrag();
    },
    _disableDelayedDrag: function () {
      (c && tt(c), clearTimeout(this._dragStartTimer), this._disableDelayedDragEvents());
    },
    _disableDelayedDragEvents: function () {
      var e = this.el.ownerDocument;
      (S(e, 'mouseup', this._disableDelayedDrag),
        S(e, 'touchend', this._disableDelayedDrag),
        S(e, 'touchcancel', this._disableDelayedDrag),
        S(e, 'mousemove', this._delayedDragTouchMoveHandler),
        S(e, 'touchmove', this._delayedDragTouchMoveHandler),
        S(e, 'pointermove', this._delayedDragTouchMoveHandler));
    },
    _triggerDragStart: function (e, n) {
      ((n = n || (e.pointerType == 'touch' && e)),
        !this.nativeDraggable || n
          ? this.options.supportPointer
            ? D(document, 'pointermove', this._onTouchMove)
            : n
              ? D(document, 'touchmove', this._onTouchMove)
              : D(document, 'mousemove', this._onTouchMove)
          : (D(c, 'dragend', this), D(C, 'dragstart', this._onDragStart)));
      try {
        document.selection
          ? ke(function () {
              document.selection.empty();
            })
          : window.getSelection().removeAllRanges();
      } catch (o) {}
    },
    _dragStarted: function (e, n) {
      if (((ve = false), C && c)) {
        (G('dragStarted', this, {
          evt: n,
        }),
          this.nativeDraggable && D(document, 'dragover', Gn));
        var o = this.options;
        (!e && V(c, o.dragClass, false),
          V(c, o.ghostClass, true),
          (p.active = this),
          e && this._appendGhost(),
          W({
            sortable: this,
            name: 'start',
            originalEvent: n,
          }));
      } else this._nulling();
    },
    _emulateDragOver: function () {
      if (J) {
        ((this._lastX = J.clientX), (this._lastY = J.clientY), Kt());
        for (
          var e = document.elementFromPoint(J.clientX, J.clientY), n = e;
          e && e.shadowRoot && ((e = e.shadowRoot.elementFromPoint(J.clientX, J.clientY)), e !== n);

        )
          n = e;
        if ((c.parentNode[q]._isOutsideThisEl(e), n))
          do {
            if (n[q]) {
              var o = void 0;
              if (
                ((o = n[q]._onDragOver({
                  clientX: J.clientX,
                  clientY: J.clientY,
                  target: e,
                  rootEl: n,
                })),
                o && !this.options.dragoverBubble)
              )
                break;
            }
            e = n;
          } while ((n = n.parentNode));
        Jt();
      }
    },
    _onTouchMove: function (e) {
      if (de) {
        var n = this.options,
          o = n.fallbackTolerance,
          r = n.fallbackOffset,
          i = e.touches ? e.touches[0] : e,
          a = g && ye(g, true),
          l = g && a && a.a,
          s = g && a && a.d,
          u = Fe && B && At(B),
          d = (i.clientX - de.clientX + r.x) / (l || 1) + (u ? u[0] - et[0] : 0) / (l || 1),
          f = (i.clientY - de.clientY + r.y) / (s || 1) + (u ? u[1] - et[1] : 0) / (s || 1);
        if (!p.active && !ve) {
          if (
            o &&
            Math.max(Math.abs(i.clientX - this._lastX), Math.abs(i.clientY - this._lastY)) < o
          )
            return;
          this._onDragStart(e, true);
        }
        if (g) {
          a
            ? ((a.e += d - (Ze || 0)), (a.f += f - (Qe || 0)))
            : (a = {
                a: 1,
                b: 0,
                c: 0,
                d: 1,
                e: d,
                f,
              });
          var m = 'matrix('
            .concat(a.a, ',')
            .concat(a.b, ',')
            .concat(a.c, ',')
            .concat(a.d, ',')
            .concat(a.e, ',')
            .concat(a.f, ')');
          (h(g, 'webkitTransform', m),
            h(g, 'mozTransform', m),
            h(g, 'msTransform', m),
            h(g, 'transform', m),
            (Ze = d),
            (Qe = f),
            (J = i));
        }
        e.cancelable && e.preventDefault();
      }
    },
    _appendGhost: function () {
      if (!g) {
        var e = this.options.fallbackOnBody ? document.body : C,
          n = M(c, true, Fe, true, e),
          o = this.options;
        if (Fe) {
          for (
            B = e;
            h(B, 'position') === 'static' && h(B, 'transform') === 'none' && B !== document;

          )
            B = B.parentNode;
          (B !== document.body && B !== document.documentElement
            ? (B === document && (B = ee()), (n.top += B.scrollTop), (n.left += B.scrollLeft))
            : (B = ee()),
            (et = At(B)));
        }
        ((g = c.cloneNode(true)),
          V(g, o.ghostClass, false),
          V(g, o.fallbackClass, true),
          V(g, o.dragClass, true),
          h(g, 'transition', ''),
          h(g, 'transform', ''),
          h(g, 'box-sizing', 'border-box'),
          h(g, 'margin', 0),
          h(g, 'top', n.top),
          h(g, 'left', n.left),
          h(g, 'width', n.width),
          h(g, 'height', n.height),
          h(g, 'opacity', '0.8'),
          h(g, 'position', Fe ? 'absolute' : 'fixed'),
          h(g, 'zIndex', '100000'),
          h(g, 'pointerEvents', 'none'),
          (p.ghost = g),
          e.appendChild(g),
          h(
            g,
            'transform-origin',
            (xt / parseInt(g.style.width)) * 100 +
              '% ' +
              (Nt / parseInt(g.style.height)) * 100 +
              '%',
          ));
      }
    },
    _onDragStart: function (e, n) {
      var o = this,
        r = e.dataTransfer,
        i = o.options;
      if (
        (G('dragStart', this, {
          evt: e,
        }),
        p.eventCanceled)
      ) {
        this._onDrop();
        return;
      }
      (G('setupClone', this),
        p.eventCanceled ||
          ((O = zt(c)),
          O.removeAttribute('id'),
          (O.draggable = false),
          (O.style['will-change'] = ''),
          this._hideClone(),
          V(O, this.options.chosenClass, false),
          (p.clone = O)),
        (o.cloneId = ke(function () {
          (G('clone', o),
            !p.eventCanceled &&
              (o.options.removeCloneOnHide || C.insertBefore(O, c),
              o._hideClone(),
              W({
                sortable: o,
                name: 'clone',
              })));
        })),
        !n && V(c, i.dragClass, true),
        n
          ? ((We = true), (o._loopId = setInterval(o._emulateDragOver, 50)))
          : (S(document, 'mouseup', o._onDrop),
            S(document, 'touchend', o._onDrop),
            S(document, 'touchcancel', o._onDrop),
            r && ((r.effectAllowed = 'move'), i.setData && i.setData.call(o, r, c)),
            D(document, 'drop', o),
            h(c, 'transform', 'translateZ(0)')),
        (ve = true),
        (o._dragStartId = ke(o._dragStarted.bind(o, n, e))),
        D(document, 'selectstart', o),
        (Ee = true),
        _e && h(document.body, 'user-select', 'none'));
    },
    // Returns true - if no further action is needed (either inserted or another condition)
    _onDragOver: function (e) {
      var n = this.el,
        o = e.target,
        r,
        i,
        a,
        l = this.options,
        s = l.group,
        u = p.active,
        d = Pe === s,
        f = l.sort,
        m = X || u,
        y,
        b = this,
        E = false;
      if (at) return;
      function k(ce, nn) {
        G(
          ce,
          b,
          te(
            {
              evt: e,
              isOwner: d,
              axis: y ? 'vertical' : 'horizontal',
              revert: a,
              dragRect: r,
              targetRect: i,
              canSort: f,
              fromSortable: m,
              target: o,
              completed: F,
              onMove: function (gt, on) {
                return Re(C, n, c, r, gt, M(gt), e, on);
              },
              changed: A,
            },
            nn,
          ),
        );
      }
      function H() {
        (k('dragOverAnimationCapture'),
          b.captureAnimationState(),
          b !== m && m.captureAnimationState());
      }
      function F(ce) {
        return (
          k('dragOverCompleted', {
            insertion: ce,
          }),
          ce &&
            (d ? u._hideClone() : u._showClone(b),
            b !== m &&
              (V(c, X ? X.options.ghostClass : u.options.ghostClass, false),
              V(c, l.ghostClass, true)),
            X !== b && b !== p.active ? (X = b) : b === p.active && X && (X = null),
            m === b && (b._ignoreWhileAnimating = o),
            b.animateAll(function () {
              (k('dragOverAnimationComplete'), (b._ignoreWhileAnimating = null));
            }),
            b !== m && (m.animateAll(), (m._ignoreWhileAnimating = null))),
          ((o === c && !c.animated) || (o === n && !o.animated)) && (me = null),
          !l.dragoverBubble &&
            !e.rootEl &&
            o !== document &&
            (c.parentNode[q]._isOutsideThisEl(e.target), !ce && he(e)),
          !l.dragoverBubble && e.stopPropagation && e.stopPropagation(),
          (E = true)
        );
      }
      function A() {
        (($ = K(c)),
          (le = K(c, l.draggable)),
          W({
            sortable: b,
            name: 'change',
            toEl: n,
            newIndex: $,
            newDraggableIndex: le,
            originalEvent: e,
          }));
      }
      if (
        (e.preventDefault !== void 0 && e.cancelable && e.preventDefault(),
        (o = Z(o, l.draggable, n, true)),
        k('dragOver'),
        p.eventCanceled)
      )
        return E;
      if (
        c.contains(e.target) ||
        (o.animated && o.animatingX && o.animatingY) ||
        b._ignoreWhileAnimating === o
      )
        return F(false);
      if (
        ((We = false),
        u &&
          !l.disabled &&
          (d
            ? f || (a = I !== C)
            : X === this ||
              ((this.lastPutMode = Pe.checkPull(this, u, c, e)) && s.checkPut(this, u, c, e))))
      ) {
        if (
          ((y = this._getDirection(e, o) === 'vertical'),
          (r = M(c)),
          k('dragOverValid'),
          p.eventCanceled)
        )
          return E;
        if (a)
          return (
            (I = C),
            H(),
            this._hideClone(),
            k('revert'),
            p.eventCanceled || (pe ? C.insertBefore(c, pe) : C.appendChild(c)),
            F(true)
          );
        var L = dt(n, l.draggable);
        if (!L || (Vn(e, y, this) && !L.animated)) {
          if (L === c) return F(false);
          if (
            (L && n === e.target && (o = L),
            o && (i = M(o)),
            Re(C, n, c, r, o, i, e, !!o) !== false)
          )
            return (
              H(),
              L && L.nextSibling ? n.insertBefore(c, L.nextSibling) : n.appendChild(c),
              (I = n),
              A(),
              F(true)
            );
        } else if (L && Un(e, y, this)) {
          var ne = we(n, 0, l, true);
          if (ne === c) return F(false);
          if (((o = ne), (i = M(o)), Re(C, n, c, r, o, i, e, false) !== false))
            return (H(), n.insertBefore(c, ne), (I = n), A(), F(true));
        } else if (o.parentNode === n) {
          i = M(o);
          var j = 0,
            Q,
            v = c.parentNode !== n,
            w = !Ln((c.animated && c.toRect) || r, (o.animated && o.toRect) || i, y),
            x = y ? 'top' : 'left',
            N = It(o, 'top', 'top') || It(c, 'top', 'top'),
            _ = N ? N.scrollTop : void 0;
          (me !== o && ((Q = i[x]), (Ie = false), (Me = (!w && l.invertSwap) || v)),
            (j = $n(
              e,
              o,
              i,
              y,
              w ? 1 : l.swapThreshold,
              l.invertedSwapThreshold == null ? l.swapThreshold : l.invertedSwapThreshold,
              Me,
              me === o,
            )));
          var T;
          if (j !== 0) {
            var R = K(c);
            do ((R -= j), (T = I.children[R]));
            while (T && (h(T, 'display') === 'none' || T === g));
          }
          if (j === 0 || T === o) return F(false);
          ((me = o), (Oe = j));
          var Y = o.nextElementSibling,
            z = false;
          z = j === 1;
          var ae = Re(C, n, c, r, o, i, e, z);
          if (ae !== false)
            return (
              (ae === 1 || ae === -1) && (z = ae === 1),
              (at = true),
              setTimeout(zn, 30),
              H(),
              z && !Y ? n.appendChild(c) : o.parentNode.insertBefore(c, z ? Y : o),
              N && jt(N, 0, _ - N.scrollTop),
              (I = c.parentNode),
              Q !== void 0 && !Me && (Be = Math.abs(Q - M(o)[x])),
              A(),
              F(true)
            );
        }
        if (n.contains(c)) return F(false);
      }
      return false;
    },
    _ignoreWhileAnimating: null,
    _offMoveEvents: function () {
      (S(document, 'mousemove', this._onTouchMove),
        S(document, 'touchmove', this._onTouchMove),
        S(document, 'pointermove', this._onTouchMove),
        S(document, 'dragover', he),
        S(document, 'mousemove', he),
        S(document, 'touchmove', he));
    },
    _offUpEvents: function () {
      var e = this.el.ownerDocument;
      (S(e, 'mouseup', this._onDrop),
        S(e, 'touchend', this._onDrop),
        S(e, 'pointerup', this._onDrop),
        S(e, 'touchcancel', this._onDrop),
        S(document, 'selectstart', this));
    },
    _onDrop: function (e) {
      var n = this.el,
        o = this.options;
      if (
        (($ = K(c)),
        (le = K(c, o.draggable)),
        G('drop', this, {
          evt: e,
        }),
        (I = c && c.parentNode),
        ($ = K(c)),
        (le = K(c, o.draggable)),
        p.eventCanceled)
      ) {
        this._nulling();
        return;
      }
      ((ve = false),
        (Me = false),
        (Ie = false),
        clearInterval(this._loopId),
        clearTimeout(this._dragStartTimer),
        lt(this.cloneId),
        lt(this._dragStartId),
        this.nativeDraggable && (S(document, 'drop', this), S(n, 'dragstart', this._onDragStart)),
        this._offMoveEvents(),
        this._offUpEvents(),
        _e && h(document.body, 'user-select', ''),
        h(c, 'transform', ''),
        e &&
          (Ee && (e.cancelable && e.preventDefault(), !o.dropBubble && e.stopPropagation()),
          g && g.parentNode && g.parentNode.removeChild(g),
          (C === I || (X && X.lastPutMode !== 'clone')) &&
            O &&
            O.parentNode &&
            O.parentNode.removeChild(O),
          c &&
            (this.nativeDraggable && S(c, 'dragend', this),
            tt(c),
            (c.style['will-change'] = ''),
            Ee && !ve && V(c, X ? X.options.ghostClass : this.options.ghostClass, false),
            V(c, this.options.chosenClass, false),
            W({
              sortable: this,
              name: 'unchoose',
              toEl: I,
              newIndex: null,
              newDraggableIndex: null,
              originalEvent: e,
            }),
            C !== I
              ? ($ >= 0 &&
                  (W({
                    rootEl: I,
                    name: 'add',
                    toEl: I,
                    fromEl: C,
                    originalEvent: e,
                  }),
                  W({
                    sortable: this,
                    name: 'remove',
                    toEl: I,
                    originalEvent: e,
                  }),
                  W({
                    rootEl: I,
                    name: 'sort',
                    toEl: I,
                    fromEl: C,
                    originalEvent: e,
                  }),
                  W({
                    sortable: this,
                    name: 'sort',
                    toEl: I,
                    originalEvent: e,
                  })),
                X && X.save())
              : $ !== be &&
                $ >= 0 &&
                (W({
                  sortable: this,
                  name: 'update',
                  toEl: I,
                  originalEvent: e,
                }),
                W({
                  sortable: this,
                  name: 'sort',
                  toEl: I,
                  originalEvent: e,
                })),
            p.active &&
              (($ == null || $ === -1) && (($ = be), (le = Ce)),
              W({
                sortable: this,
                name: 'end',
                toEl: I,
                originalEvent: e,
              }),
              this.save()))),
        this._nulling());
    },
    _nulling: function () {
      (G('nulling', this),
        (C =
          c =
          I =
          g =
          pe =
          O =
          Ye =
          se =
          de =
          J =
          Ee =
          $ =
          le =
          be =
          Ce =
          me =
          Oe =
          X =
          Pe =
          p.dragged =
          p.ghost =
          p.clone =
          p.active =
            null),
        je.forEach(function (e) {
          e.checked = true;
        }),
        (je.length = Ze = Qe = 0));
    },
    handleEvent: function (e) {
      switch (e.type) {
        case 'drop':
        case 'dragend':
          this._onDrop(e);
          break;
        case 'dragenter':
        case 'dragover':
          c && (this._onDragOver(e), jn(e));
          break;
        case 'selectstart':
          e.preventDefault();
          break;
      }
    },
    /**
     * Serializes the item into an array of string.
     * @returns {String[]}
     */
    toArray: function () {
      for (var e = [], n, o = this.el.children, r = 0, i = o.length, a = this.options; r < i; r++)
        ((n = o[r]),
          Z(n, a.draggable, this.el, false) && e.push(n.getAttribute(a.dataIdAttr) || Kn(n)));
      return e;
    },
    /**
     * Sorts the elements according to the array.
     * @param  {String[]}  order  order of the items
     */
    sort: function (e, n) {
      var o = {},
        r = this.el;
      (this.toArray().forEach(function (i, a) {
        var l = r.children[a];
        Z(l, this.options.draggable, r, false) && (o[i] = l);
      }, this),
        n && this.captureAnimationState(),
        e.forEach(function (i) {
          o[i] && (r.removeChild(o[i]), r.appendChild(o[i]));
        }),
        n && this.animateAll());
    },
    /**
     * Save the current sorting
     */
    save: function () {
      var e = this.options.store;
      e && e.set && e.set(this);
    },
    /**
     * For each element in the set, get the first element that matches the selector by testing the element itself and traversing up through its ancestors in the DOM tree.
     * @param   {HTMLElement}  el
     * @param   {String}       [selector]  default: `options.draggable`
     * @returns {HTMLElement|null}
     */
    closest: function (e, n) {
      return Z(e, n || this.options.draggable, this.el, false);
    },
    /**
     * Set/get option
     * @param   {string} name
     * @param   {*}      [value]
     * @returns {*}
     */
    option: function (e, n) {
      var o = this.options;
      if (n === void 0) return o[e];
      var r = xe.modifyOption(this, e, n);
      (typeof r != 'undefined' ? (o[e] = r) : (o[e] = n), e === 'group' && qt(o));
    },
    /**
     * Destroy
     */
    destroy: function () {
      G('destroy', this);
      var e = this.el;
      ((e[q] = null),
        S(e, 'mousedown', this._onTapStart),
        S(e, 'touchstart', this._onTapStart),
        S(e, 'pointerdown', this._onTapStart),
        this.nativeDraggable && (S(e, 'dragover', this), S(e, 'dragenter', this)),
        Array.prototype.forEach.call(e.querySelectorAll('[draggable]'), function (n) {
          n.removeAttribute('draggable');
        }),
        this._onDrop(),
        this._disableDelayedDragEvents(),
        Ge.splice(Ge.indexOf(this.el), 1),
        (this.el = e = null));
    },
    _hideClone: function () {
      if (!se) {
        if ((G('hideClone', this), p.eventCanceled)) return;
        (h(O, 'display', 'none'),
          this.options.removeCloneOnHide && O.parentNode && O.parentNode.removeChild(O),
          (se = true));
      }
    },
    _showClone: function (e) {
      if (e.lastPutMode !== 'clone') {
        this._hideClone();
        return;
      }
      if (se) {
        if ((G('showClone', this), p.eventCanceled)) return;
        (c.parentNode == C && !this.options.group.revertClone
          ? C.insertBefore(O, c)
          : pe
            ? C.insertBefore(O, pe)
            : C.appendChild(O),
          this.options.group.revertClone && this.animate(c, O),
          h(O, 'display', ''),
          (se = false));
      }
    },
  };
function jn(t) {
  (t.dataTransfer && (t.dataTransfer.dropEffect = 'move'), t.cancelable && t.preventDefault());
}
function Re(t, e, n, o, r, i, a, l) {
  var s,
    u = t[q],
    d = u.options.onMove,
    f;
  return (
    window.CustomEvent && !ie && !Ae
      ? (s = new CustomEvent('move', {
          bubbles: true,
          cancelable: true,
        }))
      : ((s = document.createEvent('Event')), s.initEvent('move', true, true)),
    (s.to = e),
    (s.from = t),
    (s.dragged = n),
    (s.draggedRect = o),
    (s.related = r || e),
    (s.relatedRect = i || M(e)),
    (s.willInsertAfter = l),
    (s.originalEvent = a),
    t.dispatchEvent(s),
    d && (f = d.call(u, s, a)),
    f
  );
}
function tt(t) {
  t.draggable = false;
}
function zn() {
  at = false;
}
function Un(t, e, n) {
  var o = M(we(n.el, 0, n.options, true)),
    r = Ut(n.el, n.options, g),
    i = 10;
  return e
    ? t.clientX < r.left - i || (t.clientY < o.top && t.clientX < o.right)
    : t.clientY < r.top - i || (t.clientY < o.bottom && t.clientX < o.left);
}
function Vn(t, e, n) {
  var o = M(dt(n.el, n.options.draggable)),
    r = Ut(n.el, n.options, g),
    i = 10;
  return e
    ? t.clientX > r.right + i || (t.clientY > o.bottom && t.clientX > o.left)
    : t.clientY > r.bottom + i || (t.clientX > o.right && t.clientY > o.top);
}
function $n(t, e, n, o, r, i, a, l) {
  var s = o ? t.clientY : t.clientX,
    u = o ? n.height : n.width,
    d = o ? n.top : n.left,
    f = o ? n.bottom : n.right,
    m = false;
  if (!a) {
    if (l && Be < u * r) {
      if ((!Ie && (Oe === 1 ? s > d + (u * i) / 2 : s < f - (u * i) / 2) && (Ie = true), Ie))
        m = true;
      else if (Oe === 1 ? s < d + Be : s > f - Be) return -Oe;
    } else if (s > d + (u * (1 - r)) / 2 && s < f - (u * (1 - r)) / 2) return qn(e);
  }
  return (
    (m = m || a),
    m && (s < d + (u * i) / 2 || s > f - (u * i) / 2) ? (s > d + u / 2 ? 1 : -1) : 0
  );
}
function qn(t) {
  return K(c) < K(t) ? 1 : -1;
}
function Kn(t) {
  for (var e = t.tagName + t.className + t.src + t.href + t.textContent, n = e.length, o = 0; n--; )
    o += e.charCodeAt(n);
  return o.toString(36);
}
function Jn(t) {
  je.length = 0;
  for (var e = t.getElementsByTagName('input'), n = e.length; n--; ) {
    var o = e[n];
    o.checked && je.push(o);
  }
}
function ke(t) {
  return setTimeout(t, 0);
}
function lt(t) {
  return clearTimeout(t);
}
Ue &&
  D(document, 'touchmove', function (t) {
    (p.active || ve) && t.cancelable && t.preventDefault();
  });
p.utils = {
  on: D,
  off: S,
  css: h,
  find: Wt,
  is: function (e, n) {
    return !!Z(e, n, e, false);
  },
  extend: Mn,
  throttle: Gt,
  closest: Z,
  toggleClass: V,
  clone: zt,
  index: K,
  nextTick: ke,
  cancelNextTick: lt,
  detectDirection: $t,
  getChild: we,
};
p.get = function (t) {
  return t[q];
};
p.mount = function () {
  for (var t = arguments.length, e = new Array(t), n = 0; n < t; n++) e[n] = arguments[n];
  (e[0].constructor === Array && (e = e[0]),
    e.forEach(function (o) {
      if (!o.prototype || !o.prototype.constructor)
        throw 'Sortable: Mounted plugin must be a constructor function, not '.concat(
          {}.toString.call(o),
        );
      (o.utils && (p.utils = te(te({}, p.utils), o.utils)), xe.mount(o));
    }));
};
p.create = function (t, e) {
  return new p(t, e);
};
p.version = xn;
var P = [],
  Se,
  st,
  ut = false,
  nt,
  ot,
  ze,
  De;
function Zn() {
  function t() {
    this.defaults = {
      scroll: true,
      forceAutoScrollFallback: false,
      scrollSensitivity: 30,
      scrollSpeed: 10,
      bubbleScroll: true,
    };
    for (var e in this)
      e.charAt(0) === '_' && typeof this[e] == 'function' && (this[e] = this[e].bind(this));
  }
  return (
    (t.prototype = {
      dragStarted: function (n) {
        var o = n.originalEvent;
        this.sortable.nativeDraggable
          ? D(document, 'dragover', this._handleAutoScroll)
          : this.options.supportPointer
            ? D(document, 'pointermove', this._handleFallbackAutoScroll)
            : o.touches
              ? D(document, 'touchmove', this._handleFallbackAutoScroll)
              : D(document, 'mousemove', this._handleFallbackAutoScroll);
      },
      dragOverCompleted: function (n) {
        var o = n.originalEvent;
        !this.options.dragOverBubble && !o.rootEl && this._handleAutoScroll(o);
      },
      drop: function () {
        (this.sortable.nativeDraggable
          ? S(document, 'dragover', this._handleAutoScroll)
          : (S(document, 'pointermove', this._handleFallbackAutoScroll),
            S(document, 'touchmove', this._handleFallbackAutoScroll),
            S(document, 'mousemove', this._handleFallbackAutoScroll)),
          Mt(),
          He(),
          Fn());
      },
      nulling: function () {
        ((ze = st = Se = ut = De = nt = ot = null), (P.length = 0));
      },
      _handleFallbackAutoScroll: function (n) {
        this._handleAutoScroll(n, true);
      },
      _handleAutoScroll: function (n, o) {
        var r = this,
          i = (n.touches ? n.touches[0] : n).clientX,
          a = (n.touches ? n.touches[0] : n).clientY,
          l = document.elementFromPoint(i, a);
        if (((ze = n), o || this.options.forceAutoScrollFallback || Ae || ie || _e)) {
          rt(n, this.options, l, o);
          var s = ue(l, true);
          ut &&
            (!De || i !== nt || a !== ot) &&
            (De && Mt(),
            (De = setInterval(function () {
              var u = ue(document.elementFromPoint(i, a), true);
              (u !== s && ((s = u), He()), rt(n, r.options, u, o));
            }, 10)),
            (nt = i),
            (ot = a));
        } else {
          if (!this.options.bubbleScroll || ue(l, true) === ee()) {
            He();
            return;
          }
          rt(n, this.options, ue(l, false), false);
        }
      },
    }),
    re(t, {
      pluginName: 'scroll',
      initializeByDefault: true,
    })
  );
}
function He() {
  (P.forEach(function (t) {
    clearInterval(t.pid);
  }),
    (P = []));
}
function Mt() {
  clearInterval(De);
}
var rt = Gt(function (t, e, n, o) {
    if (e.scroll) {
      var r = (t.touches ? t.touches[0] : t).clientX,
        i = (t.touches ? t.touches[0] : t).clientY,
        a = e.scrollSensitivity,
        l = e.scrollSpeed,
        s = ee(),
        u = false,
        d;
      st !== n &&
        ((st = n), He(), (Se = e.scroll), (d = e.scrollFn), Se === true && (Se = ue(n, true)));
      var f = 0,
        m = Se;
      do {
        var y = m,
          b = M(y),
          E = b.top,
          k = b.bottom,
          H = b.left,
          F = b.right,
          A = b.width,
          L = b.height,
          ne = void 0,
          j = void 0,
          Q = y.scrollWidth,
          v = y.scrollHeight,
          w = h(y),
          x = y.scrollLeft,
          N = y.scrollTop;
        y === s
          ? ((ne =
              A < Q &&
              (w.overflowX === 'auto' || w.overflowX === 'scroll' || w.overflowX === 'visible')),
            (j =
              L < v &&
              (w.overflowY === 'auto' || w.overflowY === 'scroll' || w.overflowY === 'visible')))
          : ((ne = A < Q && (w.overflowX === 'auto' || w.overflowX === 'scroll')),
            (j = L < v && (w.overflowY === 'auto' || w.overflowY === 'scroll')));
        var _ = ne && (Math.abs(F - r) <= a && x + A < Q) - (Math.abs(H - r) <= a && !!x),
          T = j && (Math.abs(k - i) <= a && N + L < v) - (Math.abs(E - i) <= a && !!N);
        if (!P[f]) for (var R = 0; R <= f; R++) P[R] || (P[R] = {});
        ((P[f].vx != _ || P[f].vy != T || P[f].el !== y) &&
          ((P[f].el = y),
          (P[f].vx = _),
          (P[f].vy = T),
          clearInterval(P[f].pid),
          (_ != 0 || T != 0) &&
            ((u = true),
            (P[f].pid = setInterval(
              function () {
                o && this.layer === 0 && p.active._onTouchMove(ze);
                var Y = P[this.layer].vy ? P[this.layer].vy * l : 0,
                  z = P[this.layer].vx ? P[this.layer].vx * l : 0;
                (typeof d == 'function' &&
                  d.call(p.dragged.parentNode[q], z, Y, t, ze, P[this.layer].el) !== 'continue') ||
                  jt(P[this.layer].el, z, Y);
              }.bind({
                layer: f,
              }),
              24,
            )))),
          f++);
      } while (e.bubbleScroll && m !== s && (m = ue(m, false)));
      ut = u;
    }
  }, 30),
  Zt = function (e) {
    var n = e.originalEvent,
      o = e.putSortable,
      r = e.dragEl,
      i = e.activeSortable,
      a = e.dispatchSortableEvent,
      l = e.hideGhostForTarget,
      s = e.unhideGhostForTarget;
    if (n) {
      var u = o || i;
      l();
      var d = n.changedTouches && n.changedTouches.length ? n.changedTouches[0] : n,
        f = document.elementFromPoint(d.clientX, d.clientY);
      (s(),
        u &&
          !u.el.contains(f) &&
          (a('spill'),
          this.onSpill({
            dragEl: r,
            putSortable: o,
          })));
    }
  };
function ht() {}
ht.prototype = {
  startIndex: null,
  dragStart: function (e) {
    var n = e.oldDraggableIndex;
    this.startIndex = n;
  },
  onSpill: function (e) {
    var n = e.dragEl,
      o = e.putSortable;
    (this.sortable.captureAnimationState(), o && o.captureAnimationState());
    var r = we(this.sortable.el, this.startIndex, this.options);
    (r ? this.sortable.el.insertBefore(n, r) : this.sortable.el.appendChild(n),
      this.sortable.animateAll(),
      o && o.animateAll());
  },
  drop: Zt,
};
re(ht, {
  pluginName: 'revertOnSpill',
});
function pt() {}
pt.prototype = {
  onSpill: function (e) {
    var n = e.dragEl,
      o = e.putSortable,
      r = o || this.sortable;
    (r.captureAnimationState(), n.parentNode && n.parentNode.removeChild(n), r.animateAll());
  },
  drop: Zt,
};
re(pt, {
  pluginName: 'removeOnSpill',
});
p.mount(new Zn());
p.mount(pt, ht);
function Qn(t) {
  return t == null ? t : JSON.parse(JSON.stringify(t));
}
function eo(t) {
  getCurrentInstance() && onUnmounted(t);
}
function to(t) {
  getCurrentInstance() ? onMounted(t) : nextTick(t);
}
let Qt = null,
  en = null;
function Ft(t = null, e = null) {
  ((Qt = t), (en = e));
}
function no() {
  return {
    data: Qt,
    clonedData: en,
  };
}
const Rt = Symbol('cloneElement');
function tn(...t) {
  var j, Q;
  const e = (j = getCurrentInstance()) == null ? void 0 : j.proxy;
  let n = null;
  const o = t[0];
  let [, r, i] = t;
  Array.isArray(unref(r)) || ((i = r), (r = null));
  let a = null;
  const { immediate: l = true, clone: s = Qn, customUpdate: u } = (Q = unref(i)) != null ? Q : {};
  function d(v) {
    var R;
    const { from: w, oldIndex: x, item: N } = v;
    n = Array.from(w.childNodes);
    const _ = unref((R = unref(r)) == null ? void 0 : R[x]),
      T = s(_);
    (Ft(_, T), (N[Rt] = T));
  }
  function f(v) {
    const w = v.item[Rt];
    if (!yn(w)) {
      if ((qe(v.item), isRef(r))) {
        const x = [...unref(r)];
        r.value = St(x, v.newDraggableIndex, w);
        return;
      }
      St(unref(r), v.newDraggableIndex, w);
    }
  }
  function m(v) {
    const { from: w, item: x, oldIndex: N, oldDraggableIndex: _, pullMode: T, clone: R } = v;
    if ((Dt(w, x, N), T === 'clone')) {
      qe(R);
      return;
    }
    if (isRef(r)) {
      const Y = [...unref(r)];
      r.value = Et(Y, _);
      return;
    }
    Et(unref(r), _);
  }
  function y(v) {
    if (u) {
      u(v);
      return;
    }
    const { from: w, item: x, oldIndex: N, oldDraggableIndex: _, newDraggableIndex: T } = v;
    if ((qe(x), Dt(w, x, N), isRef(r))) {
      const R = [...unref(r)];
      r.value = wt(R, _, T);
      return;
    }
    wt(unref(r), _, T);
  }
  function b(v) {
    const { newIndex: w, oldIndex: x, from: N, to: _ } = v;
    let T = null;
    const R = w === x && N === _;
    try {
      if (R) {
        let Y = null;
        n == null ||
          n.some((z, ae) => {
            if (Y && (n == null ? void 0 : n.length) !== _.childNodes.length)
              return (N.insertBefore(Y, z.nextSibling), true);
            const ce = _.childNodes[ae];
            Y = _ == null ? void 0 : _.replaceChild(z, ce);
          });
      }
    } catch (Y) {
      T = Y;
    } finally {
      n = null;
    }
    nextTick(() => {
      if ((Ft(), T)) throw T;
    });
  }
  const E = {
    onUpdate: y,
    onStart: d,
    onAdd: f,
    onRemove: m,
    onEnd: b,
  };
  function k(v) {
    const w = unref(o);
    return (
      v || (v = wn(w) ? En(w, e == null ? void 0 : e.$el) : w),
      v && !_n(v) && (v = v.$el),
      v || mn('Root element not found'),
      v
    );
  }
  function H() {
    var N;
    const _ = (N = unref(i)) != null ? N : {},
      { immediate: v, clone: w } = _,
      x = Ve(_, ['immediate', 'clone']);
    return (
      _t(x, (T, R) => {
        Tn(T) &&
          (x[T] = (Y, ...z) => {
            const ae = no();
            return (Cn(Y, ae), R(Y, ...z));
          });
      }),
      Dn(r === null ? {} : E, x)
    );
  }
  const F = v => {
    ((v = k(v)), a && A.destroy(), (a = new p(v, H())));
  };
  watch(
    () => i,
    () => {
      a &&
        _t(H(), (v, w) => {
          a == null || a.option(v, w);
        });
    },
    { deep: true },
  );
  const A = {
      option: (v, w) => (a == null ? void 0 : a.option(v, w)),
      destroy: () => {
        (a == null || a.destroy(), (a = null));
      },
      save: () => (a == null ? void 0 : a.save()),
      toArray: () => (a == null ? void 0 : a.toArray()),
      closest: (...v) => (a == null ? void 0 : a.closest(...v)),
    },
    L = () => (A == null ? void 0 : A.option('disabled', true)),
    ne = () => (A == null ? void 0 : A.option('disabled', false));
  return (
    to(() => {
      l && F();
    }),
    eo(A.destroy),
    fe({ start: F, pause: L, resume: ne }, A)
  );
}
const ct = [
  'update',
  'start',
  'add',
  'remove',
  'choose',
  'unchoose',
  'end',
  'sort',
  'filter',
  'clone',
  'move',
  'change',
];
[
  'clone',
  'animation',
  'ghostClass',
  'group',
  'sort',
  'disabled',
  'store',
  'handle',
  'draggable',
  'swapThreshold',
  'invertSwap',
  'invertedSwapThreshold',
  'removeCloneOnHide',
  'direction',
  'chosenClass',
  'dragClass',
  'ignore',
  'filter',
  'preventOnFilter',
  'easing',
  'setData',
  'dropBubble',
  'dragoverBubble',
  'dataIdAttr',
  'delay',
  'delayOnTouchOnly',
  'touchStartThreshold',
  'forceFallback',
  'fallbackClass',
  'fallbackOnBody',
  'fallbackTolerance',
  'fallbackOffset',
  'supportPointer',
  'emptyInsertThreshold',
  'scroll',
  'forceAutoScrollFallback',
  'scrollSensitivity',
  'scrollSpeed',
  'bubbleScroll',
  'modelValue',
  'tag',
  'target',
  'customUpdate',
  ...ct.map(t => `on${t.replace(/^\S/, e => e.toUpperCase())}`),
];
const Xt = {
    mounted: 'mounted',
    unmounted: 'unmounted',
  },
  it = /* @__PURE__ */ new WeakMap(),
  so = {
    [Xt.mounted](t, e) {
      const n = isProxy(e.value) ? [e.value] : e.value,
        [o, r] = n,
        i = tn(t, o, r);
      it.set(t, i.destroy);
    },
    [Xt.unmounted](t) {
      var e;
      ((e = it.get(t)) == null || e(), it.delete(t));
    },
  };
export { tn as useDraggable, so as vDraggable };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidnVlLWRyYWdnYWJsZS1wbHVzLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vdnVlLWRyYWdnYWJsZS1wbHVzQDAuNi4wX0B0eXBlcytzb3J0YWJsZWpzQDEuMTUuOC9ub2RlX21vZHVsZXMvdnVlLWRyYWdnYWJsZS1wbHVzL2Rpc3QvdnVlLWRyYWdnYWJsZS1wbHVzLmpzIl0sInNvdXJjZXNDb250ZW50IjpbInZhciBybiA9IE9iamVjdC5kZWZpbmVQcm9wZXJ0eTtcbnZhciBOZSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHM7XG52YXIgdnQgPSBPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LCBidCA9IE9iamVjdC5wcm90b3R5cGUucHJvcGVydHlJc0VudW1lcmFibGU7XG52YXIgbXQgPSAodCwgZSwgbikgPT4gZSBpbiB0ID8gcm4odCwgZSwgeyBlbnVtZXJhYmxlOiAhMCwgY29uZmlndXJhYmxlOiAhMCwgd3JpdGFibGU6ICEwLCB2YWx1ZTogbiB9KSA6IHRbZV0gPSBuLCBmZSA9ICh0LCBlKSA9PiB7XG4gIGZvciAodmFyIG4gaW4gZSB8fCAoZSA9IHt9KSlcbiAgICB2dC5jYWxsKGUsIG4pICYmIG10KHQsIG4sIGVbbl0pO1xuICBpZiAoTmUpXG4gICAgZm9yICh2YXIgbiBvZiBOZShlKSlcbiAgICAgIGJ0LmNhbGwoZSwgbikgJiYgbXQodCwgbiwgZVtuXSk7XG4gIHJldHVybiB0O1xufTtcbnZhciBWZSA9ICh0LCBlKSA9PiB7XG4gIHZhciBuID0ge307XG4gIGZvciAodmFyIG8gaW4gdClcbiAgICB2dC5jYWxsKHQsIG8pICYmIGUuaW5kZXhPZihvKSA8IDAgJiYgKG5bb10gPSB0W29dKTtcbiAgaWYgKHQgIT0gbnVsbCAmJiBOZSlcbiAgICBmb3IgKHZhciBvIG9mIE5lKHQpKVxuICAgICAgZS5pbmRleE9mKG8pIDwgMCAmJiBidC5jYWxsKHQsIG8pICYmIChuW29dID0gdFtvXSk7XG4gIHJldHVybiBuO1xufTtcbmltcG9ydCB7IGdldEN1cnJlbnRJbnN0YW5jZSBhcyBmdCwgdW5yZWYgYXMgVSwgd2F0Y2ggYXMgYW4sIG9uVW5tb3VudGVkIGFzIGxuLCBvbk1vdW50ZWQgYXMgc24sIG5leHRUaWNrIGFzIFl0LCBpc1JlZiBhcyAkZSwgZGVmaW5lQ29tcG9uZW50IGFzIHVuLCBjb21wdXRlZCBhcyB5dCwgdG9SZWZzIGFzIGNuLCByZWYgYXMgZm4sIHJlYWN0aXZlIGFzIGRuLCBoIGFzIGhuLCBpc1Byb3h5IGFzIHBuIH0gZnJvbSBcInZ1ZVwiO1xuY29uc3QgQnQgPSBcIlt2dWUtZHJhZ2dhYmxlLXBsdXNdOiBcIjtcbmZ1bmN0aW9uIGduKHQpIHtcbiAgY29uc29sZS53YXJuKEJ0ICsgdCk7XG59XG5mdW5jdGlvbiBtbih0KSB7XG4gIGNvbnNvbGUuZXJyb3IoQnQgKyB0KTtcbn1cbmZ1bmN0aW9uIHd0KHQsIGUsIG4pIHtcbiAgcmV0dXJuIG4gPj0gMCAmJiBuIDwgdC5sZW5ndGggJiYgdC5zcGxpY2UobiwgMCwgdC5zcGxpY2UoZSwgMSlbMF0pLCB0O1xufVxuZnVuY3Rpb24gdm4odCkge1xuICByZXR1cm4gdC5yZXBsYWNlKC8tKFxcdykvZywgKGUsIG4pID0+IG4gPyBuLnRvVXBwZXJDYXNlKCkgOiBcIlwiKTtcbn1cbmZ1bmN0aW9uIGJuKHQpIHtcbiAgcmV0dXJuIE9iamVjdC5rZXlzKHQpLnJlZHVjZSgoZSwgbikgPT4gKHR5cGVvZiB0W25dICE9IFwidW5kZWZpbmVkXCIgJiYgKGVbdm4obildID0gdFtuXSksIGUpLCB7fSk7XG59XG5mdW5jdGlvbiBFdCh0LCBlKSB7XG4gIHJldHVybiBBcnJheS5pc0FycmF5KHQpICYmIHQuc3BsaWNlKGUsIDEpLCB0O1xufVxuZnVuY3Rpb24gU3QodCwgZSwgbikge1xuICByZXR1cm4gQXJyYXkuaXNBcnJheSh0KSAmJiB0LnNwbGljZShlLCAwLCBuKSwgdDtcbn1cbmZ1bmN0aW9uIHluKHQpIHtcbiAgcmV0dXJuIHR5cGVvZiB0ID09IFwidW5kZWZpbmVkXCI7XG59XG5mdW5jdGlvbiB3bih0KSB7XG4gIHJldHVybiB0eXBlb2YgdCA9PSBcInN0cmluZ1wiO1xufVxuZnVuY3Rpb24gRHQodCwgZSwgbikge1xuICBjb25zdCBvID0gdC5jaGlsZHJlbltuXTtcbiAgdC5pbnNlcnRCZWZvcmUoZSwgbyk7XG59XG5mdW5jdGlvbiBxZSh0KSB7XG4gIHQucGFyZW50Tm9kZSAmJiB0LnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQodCk7XG59XG5mdW5jdGlvbiBFbih0LCBlID0gZG9jdW1lbnQpIHtcbiAgdmFyIG87XG4gIGxldCBuID0gbnVsbDtcbiAgcmV0dXJuIHR5cGVvZiAoZSA9PSBudWxsID8gdm9pZCAwIDogZS5xdWVyeVNlbGVjdG9yKSA9PSBcImZ1bmN0aW9uXCIgPyBuID0gKG8gPSBlID09IG51bGwgPyB2b2lkIDAgOiBlLnF1ZXJ5U2VsZWN0b3IpID09IG51bGwgPyB2b2lkIDAgOiBvLmNhbGwoZSwgdCkgOiBuID0gZG9jdW1lbnQucXVlcnlTZWxlY3Rvcih0KSwgbiB8fCBnbihgRWxlbWVudCBub3QgZm91bmQ6ICR7dH1gKSwgbjtcbn1cbmZ1bmN0aW9uIFNuKHQsIGUsIG4gPSBudWxsKSB7XG4gIHJldHVybiBmdW5jdGlvbiguLi5vKSB7XG4gICAgcmV0dXJuIHQuYXBwbHkobiwgbyksIGUuYXBwbHkobiwgbyk7XG4gIH07XG59XG5mdW5jdGlvbiBEbih0LCBlKSB7XG4gIGNvbnN0IG4gPSBmZSh7fSwgdCk7XG4gIHJldHVybiBPYmplY3Qua2V5cyhlKS5mb3JFYWNoKChvKSA9PiB7XG4gICAgbltvXSA/IG5bb10gPSBTbih0W29dLCBlW29dKSA6IG5bb10gPSBlW29dO1xuICB9KSwgbjtcbn1cbmZ1bmN0aW9uIF9uKHQpIHtcbiAgcmV0dXJuIHQgaW5zdGFuY2VvZiBIVE1MRWxlbWVudDtcbn1cbmZ1bmN0aW9uIF90KHQsIGUpIHtcbiAgT2JqZWN0LmtleXModCkuZm9yRWFjaCgobikgPT4ge1xuICAgIGUobiwgdFtuXSk7XG4gIH0pO1xufVxuZnVuY3Rpb24gVG4odCkge1xuICByZXR1cm4gdC5jaGFyQ29kZUF0KDApID09PSAxMTEgJiYgdC5jaGFyQ29kZUF0KDEpID09PSAxMTAgJiYgLy8gdXBwZXJjYXNlIGxldHRlclxuICAodC5jaGFyQ29kZUF0KDIpID4gMTIyIHx8IHQuY2hhckNvZGVBdCgyKSA8IDk3KTtcbn1cbmNvbnN0IENuID0gT2JqZWN0LmFzc2lnbjtcbi8qKiFcbiAqIFNvcnRhYmxlIDEuMTUuMlxuICogQGF1dGhvclx0UnViYVhhICAgPHRyYXNoQHJ1YmF4YS5vcmc+XG4gKiBAYXV0aG9yXHRvd2VubSAgICA8b3dlbjIzMzU1QGdtYWlsLmNvbT5cbiAqIEBsaWNlbnNlIE1JVFxuICovXG5mdW5jdGlvbiBUdCh0LCBlKSB7XG4gIHZhciBuID0gT2JqZWN0LmtleXModCk7XG4gIGlmIChPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKSB7XG4gICAgdmFyIG8gPSBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzKHQpO1xuICAgIGUgJiYgKG8gPSBvLmZpbHRlcihmdW5jdGlvbihyKSB7XG4gICAgICByZXR1cm4gT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0LCByKS5lbnVtZXJhYmxlO1xuICAgIH0pKSwgbi5wdXNoLmFwcGx5KG4sIG8pO1xuICB9XG4gIHJldHVybiBuO1xufVxuZnVuY3Rpb24gdGUodCkge1xuICBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKykge1xuICAgIHZhciBuID0gYXJndW1lbnRzW2VdICE9IG51bGwgPyBhcmd1bWVudHNbZV0gOiB7fTtcbiAgICBlICUgMiA/IFR0KE9iamVjdChuKSwgITApLmZvckVhY2goZnVuY3Rpb24obykge1xuICAgICAgT24odCwgbywgbltvXSk7XG4gICAgfSkgOiBPYmplY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9ycyA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHQsIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3JzKG4pKSA6IFR0KE9iamVjdChuKSkuZm9yRWFjaChmdW5jdGlvbihvKSB7XG4gICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkodCwgbywgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcihuLCBvKSk7XG4gICAgfSk7XG4gIH1cbiAgcmV0dXJuIHQ7XG59XG5mdW5jdGlvbiBYZSh0KSB7XG4gIFwiQGJhYmVsL2hlbHBlcnMgLSB0eXBlb2ZcIjtcbiAgcmV0dXJuIHR5cGVvZiBTeW1ib2wgPT0gXCJmdW5jdGlvblwiICYmIHR5cGVvZiBTeW1ib2wuaXRlcmF0b3IgPT0gXCJzeW1ib2xcIiA/IFhlID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiB0eXBlb2YgZTtcbiAgfSA6IFhlID0gZnVuY3Rpb24oZSkge1xuICAgIHJldHVybiBlICYmIHR5cGVvZiBTeW1ib2wgPT0gXCJmdW5jdGlvblwiICYmIGUuY29uc3RydWN0b3IgPT09IFN5bWJvbCAmJiBlICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBlO1xuICB9LCBYZSh0KTtcbn1cbmZ1bmN0aW9uIE9uKHQsIGUsIG4pIHtcbiAgcmV0dXJuIGUgaW4gdCA/IE9iamVjdC5kZWZpbmVQcm9wZXJ0eSh0LCBlLCB7XG4gICAgdmFsdWU6IG4sXG4gICAgZW51bWVyYWJsZTogITAsXG4gICAgY29uZmlndXJhYmxlOiAhMCxcbiAgICB3cml0YWJsZTogITBcbiAgfSkgOiB0W2VdID0gbiwgdDtcbn1cbmZ1bmN0aW9uIHJlKCkge1xuICByZXR1cm4gcmUgPSBPYmplY3QuYXNzaWduIHx8IGZ1bmN0aW9uKHQpIHtcbiAgICBmb3IgKHZhciBlID0gMTsgZSA8IGFyZ3VtZW50cy5sZW5ndGg7IGUrKykge1xuICAgICAgdmFyIG4gPSBhcmd1bWVudHNbZV07XG4gICAgICBmb3IgKHZhciBvIGluIG4pXG4gICAgICAgIE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChuLCBvKSAmJiAodFtvXSA9IG5bb10pO1xuICAgIH1cbiAgICByZXR1cm4gdDtcbiAgfSwgcmUuYXBwbHkodGhpcywgYXJndW1lbnRzKTtcbn1cbmZ1bmN0aW9uIEluKHQsIGUpIHtcbiAgaWYgKHQgPT0gbnVsbClcbiAgICByZXR1cm4ge307XG4gIHZhciBuID0ge30sIG8gPSBPYmplY3Qua2V5cyh0KSwgciwgaTtcbiAgZm9yIChpID0gMDsgaSA8IG8ubGVuZ3RoOyBpKyspXG4gICAgciA9IG9baV0sICEoZS5pbmRleE9mKHIpID49IDApICYmIChuW3JdID0gdFtyXSk7XG4gIHJldHVybiBuO1xufVxuZnVuY3Rpb24gQW4odCwgZSkge1xuICBpZiAodCA9PSBudWxsKVxuICAgIHJldHVybiB7fTtcbiAgdmFyIG4gPSBJbih0LCBlKSwgbywgcjtcbiAgaWYgKE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHMpIHtcbiAgICB2YXIgaSA9IE9iamVjdC5nZXRPd25Qcm9wZXJ0eVN5bWJvbHModCk7XG4gICAgZm9yIChyID0gMDsgciA8IGkubGVuZ3RoOyByKyspXG4gICAgICBvID0gaVtyXSwgIShlLmluZGV4T2YobykgPj0gMCkgJiYgT2JqZWN0LnByb3RvdHlwZS5wcm9wZXJ0eUlzRW51bWVyYWJsZS5jYWxsKHQsIG8pICYmIChuW29dID0gdFtvXSk7XG4gIH1cbiAgcmV0dXJuIG47XG59XG52YXIgeG4gPSBcIjEuMTUuMlwiO1xuZnVuY3Rpb24gb2UodCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPSBcInVuZGVmaW5lZFwiICYmIHdpbmRvdy5uYXZpZ2F0b3IpXG4gICAgcmV0dXJuICEhLyogQF9fUFVSRV9fICovIG5hdmlnYXRvci51c2VyQWdlbnQubWF0Y2godCk7XG59XG52YXIgaWUgPSBvZSgvKD86VHJpZGVudC4qcnZbIDpdPzExXFwufG1zaWV8aWVtb2JpbGV8V2luZG93cyBQaG9uZSkvaSksIEFlID0gb2UoL0VkZ2UvaSksIEN0ID0gb2UoL2ZpcmVmb3gvaSksIF9lID0gb2UoL3NhZmFyaS9pKSAmJiAhb2UoL2Nocm9tZS9pKSAmJiAhb2UoL2FuZHJvaWQvaSksIGt0ID0gb2UoL2lQKGFkfG9kfGhvbmUpL2kpLCBIdCA9IG9lKC9jaHJvbWUvaSkgJiYgb2UoL2FuZHJvaWQvaSksIEx0ID0ge1xuICBjYXB0dXJlOiAhMSxcbiAgcGFzc2l2ZTogITFcbn07XG5mdW5jdGlvbiBEKHQsIGUsIG4pIHtcbiAgdC5hZGRFdmVudExpc3RlbmVyKGUsIG4sICFpZSAmJiBMdCk7XG59XG5mdW5jdGlvbiBTKHQsIGUsIG4pIHtcbiAgdC5yZW1vdmVFdmVudExpc3RlbmVyKGUsIG4sICFpZSAmJiBMdCk7XG59XG5mdW5jdGlvbiBMZSh0LCBlKSB7XG4gIGlmIChlKSB7XG4gICAgaWYgKGVbMF0gPT09IFwiPlwiICYmIChlID0gZS5zdWJzdHJpbmcoMSkpLCB0KVxuICAgICAgdHJ5IHtcbiAgICAgICAgaWYgKHQubWF0Y2hlcylcbiAgICAgICAgICByZXR1cm4gdC5tYXRjaGVzKGUpO1xuICAgICAgICBpZiAodC5tc01hdGNoZXNTZWxlY3RvcilcbiAgICAgICAgICByZXR1cm4gdC5tc01hdGNoZXNTZWxlY3RvcihlKTtcbiAgICAgICAgaWYgKHQud2Via2l0TWF0Y2hlc1NlbGVjdG9yKVxuICAgICAgICAgIHJldHVybiB0LndlYmtpdE1hdGNoZXNTZWxlY3RvcihlKTtcbiAgICAgIH0gY2F0Y2ggKG4pIHtcbiAgICAgICAgcmV0dXJuICExO1xuICAgICAgfVxuICAgIHJldHVybiAhMTtcbiAgfVxufVxuZnVuY3Rpb24gTm4odCkge1xuICByZXR1cm4gdC5ob3N0ICYmIHQgIT09IGRvY3VtZW50ICYmIHQuaG9zdC5ub2RlVHlwZSA/IHQuaG9zdCA6IHQucGFyZW50Tm9kZTtcbn1cbmZ1bmN0aW9uIFoodCwgZSwgbiwgbykge1xuICBpZiAodCkge1xuICAgIG4gPSBuIHx8IGRvY3VtZW50O1xuICAgIGRvIHtcbiAgICAgIGlmIChlICE9IG51bGwgJiYgKGVbMF0gPT09IFwiPlwiID8gdC5wYXJlbnROb2RlID09PSBuICYmIExlKHQsIGUpIDogTGUodCwgZSkpIHx8IG8gJiYgdCA9PT0gbilcbiAgICAgICAgcmV0dXJuIHQ7XG4gICAgICBpZiAodCA9PT0gbilcbiAgICAgICAgYnJlYWs7XG4gICAgfSB3aGlsZSAodCA9IE5uKHQpKTtcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbnZhciBPdCA9IC9cXHMrL2c7XG5mdW5jdGlvbiBWKHQsIGUsIG4pIHtcbiAgaWYgKHQgJiYgZSlcbiAgICBpZiAodC5jbGFzc0xpc3QpXG4gICAgICB0LmNsYXNzTGlzdFtuID8gXCJhZGRcIiA6IFwicmVtb3ZlXCJdKGUpO1xuICAgIGVsc2Uge1xuICAgICAgdmFyIG8gPSAoXCIgXCIgKyB0LmNsYXNzTmFtZSArIFwiIFwiKS5yZXBsYWNlKE90LCBcIiBcIikucmVwbGFjZShcIiBcIiArIGUgKyBcIiBcIiwgXCIgXCIpO1xuICAgICAgdC5jbGFzc05hbWUgPSAobyArIChuID8gXCIgXCIgKyBlIDogXCJcIikpLnJlcGxhY2UoT3QsIFwiIFwiKTtcbiAgICB9XG59XG5mdW5jdGlvbiBoKHQsIGUsIG4pIHtcbiAgdmFyIG8gPSB0ICYmIHQuc3R5bGU7XG4gIGlmIChvKSB7XG4gICAgaWYgKG4gPT09IHZvaWQgMClcbiAgICAgIHJldHVybiBkb2N1bWVudC5kZWZhdWx0VmlldyAmJiBkb2N1bWVudC5kZWZhdWx0Vmlldy5nZXRDb21wdXRlZFN0eWxlID8gbiA9IGRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUodCwgXCJcIikgOiB0LmN1cnJlbnRTdHlsZSAmJiAobiA9IHQuY3VycmVudFN0eWxlKSwgZSA9PT0gdm9pZCAwID8gbiA6IG5bZV07XG4gICAgIShlIGluIG8pICYmIGUuaW5kZXhPZihcIndlYmtpdFwiKSA9PT0gLTEgJiYgKGUgPSBcIi13ZWJraXQtXCIgKyBlKSwgb1tlXSA9IG4gKyAodHlwZW9mIG4gPT0gXCJzdHJpbmdcIiA/IFwiXCIgOiBcInB4XCIpO1xuICB9XG59XG5mdW5jdGlvbiB5ZSh0LCBlKSB7XG4gIHZhciBuID0gXCJcIjtcbiAgaWYgKHR5cGVvZiB0ID09IFwic3RyaW5nXCIpXG4gICAgbiA9IHQ7XG4gIGVsc2VcbiAgICBkbyB7XG4gICAgICB2YXIgbyA9IGgodCwgXCJ0cmFuc2Zvcm1cIik7XG4gICAgICBvICYmIG8gIT09IFwibm9uZVwiICYmIChuID0gbyArIFwiIFwiICsgbik7XG4gICAgfSB3aGlsZSAoIWUgJiYgKHQgPSB0LnBhcmVudE5vZGUpKTtcbiAgdmFyIHIgPSB3aW5kb3cuRE9NTWF0cml4IHx8IHdpbmRvdy5XZWJLaXRDU1NNYXRyaXggfHwgd2luZG93LkNTU01hdHJpeCB8fCB3aW5kb3cuTVNDU1NNYXRyaXg7XG4gIHJldHVybiByICYmIG5ldyByKG4pO1xufVxuZnVuY3Rpb24gV3QodCwgZSwgbikge1xuICBpZiAodCkge1xuICAgIHZhciBvID0gdC5nZXRFbGVtZW50c0J5VGFnTmFtZShlKSwgciA9IDAsIGkgPSBvLmxlbmd0aDtcbiAgICBpZiAobilcbiAgICAgIGZvciAoOyByIDwgaTsgcisrKVxuICAgICAgICBuKG9bcl0sIHIpO1xuICAgIHJldHVybiBvO1xuICB9XG4gIHJldHVybiBbXTtcbn1cbmZ1bmN0aW9uIGVlKCkge1xuICB2YXIgdCA9IGRvY3VtZW50LnNjcm9sbGluZ0VsZW1lbnQ7XG4gIHJldHVybiB0IHx8IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudDtcbn1cbmZ1bmN0aW9uIE0odCwgZSwgbiwgbywgcikge1xuICBpZiAoISghdC5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgdCAhPT0gd2luZG93KSkge1xuICAgIHZhciBpLCBhLCBsLCBzLCB1LCBkLCBmO1xuICAgIGlmICh0ICE9PSB3aW5kb3cgJiYgdC5wYXJlbnROb2RlICYmIHQgIT09IGVlKCkgPyAoaSA9IHQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCksIGEgPSBpLnRvcCwgbCA9IGkubGVmdCwgcyA9IGkuYm90dG9tLCB1ID0gaS5yaWdodCwgZCA9IGkuaGVpZ2h0LCBmID0gaS53aWR0aCkgOiAoYSA9IDAsIGwgPSAwLCBzID0gd2luZG93LmlubmVySGVpZ2h0LCB1ID0gd2luZG93LmlubmVyV2lkdGgsIGQgPSB3aW5kb3cuaW5uZXJIZWlnaHQsIGYgPSB3aW5kb3cuaW5uZXJXaWR0aCksIChlIHx8IG4pICYmIHQgIT09IHdpbmRvdyAmJiAociA9IHIgfHwgdC5wYXJlbnROb2RlLCAhaWUpKVxuICAgICAgZG9cbiAgICAgICAgaWYgKHIgJiYgci5nZXRCb3VuZGluZ0NsaWVudFJlY3QgJiYgKGgociwgXCJ0cmFuc2Zvcm1cIikgIT09IFwibm9uZVwiIHx8IG4gJiYgaChyLCBcInBvc2l0aW9uXCIpICE9PSBcInN0YXRpY1wiKSkge1xuICAgICAgICAgIHZhciBtID0gci5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICAgICAgICBhIC09IG0udG9wICsgcGFyc2VJbnQoaChyLCBcImJvcmRlci10b3Atd2lkdGhcIikpLCBsIC09IG0ubGVmdCArIHBhcnNlSW50KGgociwgXCJib3JkZXItbGVmdC13aWR0aFwiKSksIHMgPSBhICsgaS5oZWlnaHQsIHUgPSBsICsgaS53aWR0aDtcbiAgICAgICAgICBicmVhaztcbiAgICAgICAgfVxuICAgICAgd2hpbGUgKHIgPSByLnBhcmVudE5vZGUpO1xuICAgIGlmIChvICYmIHQgIT09IHdpbmRvdykge1xuICAgICAgdmFyIHkgPSB5ZShyIHx8IHQpLCBiID0geSAmJiB5LmEsIEUgPSB5ICYmIHkuZDtcbiAgICAgIHkgJiYgKGEgLz0gRSwgbCAvPSBiLCBmIC89IGIsIGQgLz0gRSwgcyA9IGEgKyBkLCB1ID0gbCArIGYpO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgdG9wOiBhLFxuICAgICAgbGVmdDogbCxcbiAgICAgIGJvdHRvbTogcyxcbiAgICAgIHJpZ2h0OiB1LFxuICAgICAgd2lkdGg6IGYsXG4gICAgICBoZWlnaHQ6IGRcbiAgICB9O1xuICB9XG59XG5mdW5jdGlvbiBJdCh0LCBlLCBuKSB7XG4gIGZvciAodmFyIG8gPSB1ZSh0LCAhMCksIHIgPSBNKHQpW2VdOyBvOyApIHtcbiAgICB2YXIgaSA9IE0obylbbl0sIGEgPSB2b2lkIDA7XG4gICAgaWYgKGEgPSByID49IGksICFhKVxuICAgICAgcmV0dXJuIG87XG4gICAgaWYgKG8gPT09IGVlKCkpXG4gICAgICBicmVhaztcbiAgICBvID0gdWUobywgITEpO1xuICB9XG4gIHJldHVybiAhMTtcbn1cbmZ1bmN0aW9uIHdlKHQsIGUsIG4sIG8pIHtcbiAgZm9yICh2YXIgciA9IDAsIGkgPSAwLCBhID0gdC5jaGlsZHJlbjsgaSA8IGEubGVuZ3RoOyApIHtcbiAgICBpZiAoYVtpXS5zdHlsZS5kaXNwbGF5ICE9PSBcIm5vbmVcIiAmJiBhW2ldICE9PSBwLmdob3N0ICYmIChvIHx8IGFbaV0gIT09IHAuZHJhZ2dlZCkgJiYgWihhW2ldLCBuLmRyYWdnYWJsZSwgdCwgITEpKSB7XG4gICAgICBpZiAociA9PT0gZSlcbiAgICAgICAgcmV0dXJuIGFbaV07XG4gICAgICByKys7XG4gICAgfVxuICAgIGkrKztcbiAgfVxuICByZXR1cm4gbnVsbDtcbn1cbmZ1bmN0aW9uIGR0KHQsIGUpIHtcbiAgZm9yICh2YXIgbiA9IHQubGFzdEVsZW1lbnRDaGlsZDsgbiAmJiAobiA9PT0gcC5naG9zdCB8fCBoKG4sIFwiZGlzcGxheVwiKSA9PT0gXCJub25lXCIgfHwgZSAmJiAhTGUobiwgZSkpOyApXG4gICAgbiA9IG4ucHJldmlvdXNFbGVtZW50U2libGluZztcbiAgcmV0dXJuIG4gfHwgbnVsbDtcbn1cbmZ1bmN0aW9uIEsodCwgZSkge1xuICB2YXIgbiA9IDA7XG4gIGlmICghdCB8fCAhdC5wYXJlbnROb2RlKVxuICAgIHJldHVybiAtMTtcbiAgZm9yICg7IHQgPSB0LnByZXZpb3VzRWxlbWVudFNpYmxpbmc7IClcbiAgICB0Lm5vZGVOYW1lLnRvVXBwZXJDYXNlKCkgIT09IFwiVEVNUExBVEVcIiAmJiB0ICE9PSBwLmNsb25lICYmICghZSB8fCBMZSh0LCBlKSkgJiYgbisrO1xuICByZXR1cm4gbjtcbn1cbmZ1bmN0aW9uIEF0KHQpIHtcbiAgdmFyIGUgPSAwLCBuID0gMCwgbyA9IGVlKCk7XG4gIGlmICh0KVxuICAgIGRvIHtcbiAgICAgIHZhciByID0geWUodCksIGkgPSByLmEsIGEgPSByLmQ7XG4gICAgICBlICs9IHQuc2Nyb2xsTGVmdCAqIGksIG4gKz0gdC5zY3JvbGxUb3AgKiBhO1xuICAgIH0gd2hpbGUgKHQgIT09IG8gJiYgKHQgPSB0LnBhcmVudE5vZGUpKTtcbiAgcmV0dXJuIFtlLCBuXTtcbn1cbmZ1bmN0aW9uIFBuKHQsIGUpIHtcbiAgZm9yICh2YXIgbiBpbiB0KVxuICAgIGlmICh0Lmhhc093blByb3BlcnR5KG4pKSB7XG4gICAgICBmb3IgKHZhciBvIGluIGUpXG4gICAgICAgIGlmIChlLmhhc093blByb3BlcnR5KG8pICYmIGVbb10gPT09IHRbbl1bb10pXG4gICAgICAgICAgcmV0dXJuIE51bWJlcihuKTtcbiAgICB9XG4gIHJldHVybiAtMTtcbn1cbmZ1bmN0aW9uIHVlKHQsIGUpIHtcbiAgaWYgKCF0IHx8ICF0LmdldEJvdW5kaW5nQ2xpZW50UmVjdClcbiAgICByZXR1cm4gZWUoKTtcbiAgdmFyIG4gPSB0LCBvID0gITE7XG4gIGRvXG4gICAgaWYgKG4uY2xpZW50V2lkdGggPCBuLnNjcm9sbFdpZHRoIHx8IG4uY2xpZW50SGVpZ2h0IDwgbi5zY3JvbGxIZWlnaHQpIHtcbiAgICAgIHZhciByID0gaChuKTtcbiAgICAgIGlmIChuLmNsaWVudFdpZHRoIDwgbi5zY3JvbGxXaWR0aCAmJiAoci5vdmVyZmxvd1ggPT0gXCJhdXRvXCIgfHwgci5vdmVyZmxvd1ggPT0gXCJzY3JvbGxcIikgfHwgbi5jbGllbnRIZWlnaHQgPCBuLnNjcm9sbEhlaWdodCAmJiAoci5vdmVyZmxvd1kgPT0gXCJhdXRvXCIgfHwgci5vdmVyZmxvd1kgPT0gXCJzY3JvbGxcIikpIHtcbiAgICAgICAgaWYgKCFuLmdldEJvdW5kaW5nQ2xpZW50UmVjdCB8fCBuID09PSBkb2N1bWVudC5ib2R5KVxuICAgICAgICAgIHJldHVybiBlZSgpO1xuICAgICAgICBpZiAobyB8fCBlKVxuICAgICAgICAgIHJldHVybiBuO1xuICAgICAgICBvID0gITA7XG4gICAgICB9XG4gICAgfVxuICB3aGlsZSAobiA9IG4ucGFyZW50Tm9kZSk7XG4gIHJldHVybiBlZSgpO1xufVxuZnVuY3Rpb24gTW4odCwgZSkge1xuICBpZiAodCAmJiBlKVxuICAgIGZvciAodmFyIG4gaW4gZSlcbiAgICAgIGUuaGFzT3duUHJvcGVydHkobikgJiYgKHRbbl0gPSBlW25dKTtcbiAgcmV0dXJuIHQ7XG59XG5mdW5jdGlvbiBLZSh0LCBlKSB7XG4gIHJldHVybiBNYXRoLnJvdW5kKHQudG9wKSA9PT0gTWF0aC5yb3VuZChlLnRvcCkgJiYgTWF0aC5yb3VuZCh0LmxlZnQpID09PSBNYXRoLnJvdW5kKGUubGVmdCkgJiYgTWF0aC5yb3VuZCh0LmhlaWdodCkgPT09IE1hdGgucm91bmQoZS5oZWlnaHQpICYmIE1hdGgucm91bmQodC53aWR0aCkgPT09IE1hdGgucm91bmQoZS53aWR0aCk7XG59XG52YXIgVGU7XG5mdW5jdGlvbiBHdCh0LCBlKSB7XG4gIHJldHVybiBmdW5jdGlvbigpIHtcbiAgICBpZiAoIVRlKSB7XG4gICAgICB2YXIgbiA9IGFyZ3VtZW50cywgbyA9IHRoaXM7XG4gICAgICBuLmxlbmd0aCA9PT0gMSA/IHQuY2FsbChvLCBuWzBdKSA6IHQuYXBwbHkobywgbiksIFRlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgVGUgPSB2b2lkIDA7XG4gICAgICB9LCBlKTtcbiAgICB9XG4gIH07XG59XG5mdW5jdGlvbiBGbigpIHtcbiAgY2xlYXJUaW1lb3V0KFRlKSwgVGUgPSB2b2lkIDA7XG59XG5mdW5jdGlvbiBqdCh0LCBlLCBuKSB7XG4gIHQuc2Nyb2xsTGVmdCArPSBlLCB0LnNjcm9sbFRvcCArPSBuO1xufVxuZnVuY3Rpb24genQodCkge1xuICB2YXIgZSA9IHdpbmRvdy5Qb2x5bWVyLCBuID0gd2luZG93LmpRdWVyeSB8fCB3aW5kb3cuWmVwdG87XG4gIHJldHVybiBlICYmIGUuZG9tID8gZS5kb20odCkuY2xvbmVOb2RlKCEwKSA6IG4gPyBuKHQpLmNsb25lKCEwKVswXSA6IHQuY2xvbmVOb2RlKCEwKTtcbn1cbmZ1bmN0aW9uIFV0KHQsIGUsIG4pIHtcbiAgdmFyIG8gPSB7fTtcbiAgcmV0dXJuIEFycmF5LmZyb20odC5jaGlsZHJlbikuZm9yRWFjaChmdW5jdGlvbihyKSB7XG4gICAgdmFyIGksIGEsIGwsIHM7XG4gICAgaWYgKCEoIVoociwgZS5kcmFnZ2FibGUsIHQsICExKSB8fCByLmFuaW1hdGVkIHx8IHIgPT09IG4pKSB7XG4gICAgICB2YXIgdSA9IE0ocik7XG4gICAgICBvLmxlZnQgPSBNYXRoLm1pbigoaSA9IG8ubGVmdCkgIT09IG51bGwgJiYgaSAhPT0gdm9pZCAwID8gaSA6IDEgLyAwLCB1LmxlZnQpLCBvLnRvcCA9IE1hdGgubWluKChhID0gby50b3ApICE9PSBudWxsICYmIGEgIT09IHZvaWQgMCA/IGEgOiAxIC8gMCwgdS50b3ApLCBvLnJpZ2h0ID0gTWF0aC5tYXgoKGwgPSBvLnJpZ2h0KSAhPT0gbnVsbCAmJiBsICE9PSB2b2lkIDAgPyBsIDogLTEgLyAwLCB1LnJpZ2h0KSwgby5ib3R0b20gPSBNYXRoLm1heCgocyA9IG8uYm90dG9tKSAhPT0gbnVsbCAmJiBzICE9PSB2b2lkIDAgPyBzIDogLTEgLyAwLCB1LmJvdHRvbSk7XG4gICAgfVxuICB9KSwgby53aWR0aCA9IG8ucmlnaHQgLSBvLmxlZnQsIG8uaGVpZ2h0ID0gby5ib3R0b20gLSBvLnRvcCwgby54ID0gby5sZWZ0LCBvLnkgPSBvLnRvcCwgbztcbn1cbnZhciBxID0gXCJTb3J0YWJsZVwiICsgKC8qIEBfX1BVUkVfXyAqLyBuZXcgRGF0ZSgpKS5nZXRUaW1lKCk7XG5mdW5jdGlvbiBSbigpIHtcbiAgdmFyIHQgPSBbXSwgZTtcbiAgcmV0dXJuIHtcbiAgICBjYXB0dXJlQW5pbWF0aW9uU3RhdGU6IGZ1bmN0aW9uKCkge1xuICAgICAgaWYgKHQgPSBbXSwgISF0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSB7XG4gICAgICAgIHZhciBvID0gW10uc2xpY2UuY2FsbCh0aGlzLmVsLmNoaWxkcmVuKTtcbiAgICAgICAgby5mb3JFYWNoKGZ1bmN0aW9uKHIpIHtcbiAgICAgICAgICBpZiAoIShoKHIsIFwiZGlzcGxheVwiKSA9PT0gXCJub25lXCIgfHwgciA9PT0gcC5naG9zdCkpIHtcbiAgICAgICAgICAgIHQucHVzaCh7XG4gICAgICAgICAgICAgIHRhcmdldDogcixcbiAgICAgICAgICAgICAgcmVjdDogTShyKVxuICAgICAgICAgICAgfSk7XG4gICAgICAgICAgICB2YXIgaSA9IHRlKHt9LCB0W3QubGVuZ3RoIC0gMV0ucmVjdCk7XG4gICAgICAgICAgICBpZiAoci50aGlzQW5pbWF0aW9uRHVyYXRpb24pIHtcbiAgICAgICAgICAgICAgdmFyIGEgPSB5ZShyLCAhMCk7XG4gICAgICAgICAgICAgIGEgJiYgKGkudG9wIC09IGEuZiwgaS5sZWZ0IC09IGEuZSk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByLmZyb21SZWN0ID0gaTtcbiAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0sXG4gICAgYWRkQW5pbWF0aW9uU3RhdGU6IGZ1bmN0aW9uKG8pIHtcbiAgICAgIHQucHVzaChvKTtcbiAgICB9LFxuICAgIHJlbW92ZUFuaW1hdGlvblN0YXRlOiBmdW5jdGlvbihvKSB7XG4gICAgICB0LnNwbGljZShQbih0LCB7XG4gICAgICAgIHRhcmdldDogb1xuICAgICAgfSksIDEpO1xuICAgIH0sXG4gICAgYW5pbWF0ZUFsbDogZnVuY3Rpb24obykge1xuICAgICAgdmFyIHIgPSB0aGlzO1xuICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYW5pbWF0aW9uKSB7XG4gICAgICAgIGNsZWFyVGltZW91dChlKSwgdHlwZW9mIG8gPT0gXCJmdW5jdGlvblwiICYmIG8oKTtcbiAgICAgICAgcmV0dXJuO1xuICAgICAgfVxuICAgICAgdmFyIGkgPSAhMSwgYSA9IDA7XG4gICAgICB0LmZvckVhY2goZnVuY3Rpb24obCkge1xuICAgICAgICB2YXIgcyA9IDAsIHUgPSBsLnRhcmdldCwgZCA9IHUuZnJvbVJlY3QsIGYgPSBNKHUpLCBtID0gdS5wcmV2RnJvbVJlY3QsIHkgPSB1LnByZXZUb1JlY3QsIGIgPSBsLnJlY3QsIEUgPSB5ZSh1LCAhMCk7XG4gICAgICAgIEUgJiYgKGYudG9wIC09IEUuZiwgZi5sZWZ0IC09IEUuZSksIHUudG9SZWN0ID0gZiwgdS50aGlzQW5pbWF0aW9uRHVyYXRpb24gJiYgS2UobSwgZikgJiYgIUtlKGQsIGYpICYmIC8vIE1ha2Ugc3VyZSBhbmltYXRpbmdSZWN0IGlzIG9uIGxpbmUgYmV0d2VlbiB0b1JlY3QgJiBmcm9tUmVjdFxuICAgICAgICAoYi50b3AgLSBmLnRvcCkgLyAoYi5sZWZ0IC0gZi5sZWZ0KSA9PT0gKGQudG9wIC0gZi50b3ApIC8gKGQubGVmdCAtIGYubGVmdCkgJiYgKHMgPSBZbihiLCBtLCB5LCByLm9wdGlvbnMpKSwgS2UoZiwgZCkgfHwgKHUucHJldkZyb21SZWN0ID0gZCwgdS5wcmV2VG9SZWN0ID0gZiwgcyB8fCAocyA9IHIub3B0aW9ucy5hbmltYXRpb24pLCByLmFuaW1hdGUodSwgYiwgZiwgcykpLCBzICYmIChpID0gITAsIGEgPSBNYXRoLm1heChhLCBzKSwgY2xlYXJUaW1lb3V0KHUuYW5pbWF0aW9uUmVzZXRUaW1lciksIHUuYW5pbWF0aW9uUmVzZXRUaW1lciA9IHNldFRpbWVvdXQoZnVuY3Rpb24oKSB7XG4gICAgICAgICAgdS5hbmltYXRpb25UaW1lID0gMCwgdS5wcmV2RnJvbVJlY3QgPSBudWxsLCB1LmZyb21SZWN0ID0gbnVsbCwgdS5wcmV2VG9SZWN0ID0gbnVsbCwgdS50aGlzQW5pbWF0aW9uRHVyYXRpb24gPSBudWxsO1xuICAgICAgICB9LCBzKSwgdS50aGlzQW5pbWF0aW9uRHVyYXRpb24gPSBzKTtcbiAgICAgIH0pLCBjbGVhclRpbWVvdXQoZSksIGkgPyBlID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgdHlwZW9mIG8gPT0gXCJmdW5jdGlvblwiICYmIG8oKTtcbiAgICAgIH0sIGEpIDogdHlwZW9mIG8gPT0gXCJmdW5jdGlvblwiICYmIG8oKSwgdCA9IFtdO1xuICAgIH0sXG4gICAgYW5pbWF0ZTogZnVuY3Rpb24obywgciwgaSwgYSkge1xuICAgICAgaWYgKGEpIHtcbiAgICAgICAgaChvLCBcInRyYW5zaXRpb25cIiwgXCJcIiksIGgobywgXCJ0cmFuc2Zvcm1cIiwgXCJcIik7XG4gICAgICAgIHZhciBsID0geWUodGhpcy5lbCksIHMgPSBsICYmIGwuYSwgdSA9IGwgJiYgbC5kLCBkID0gKHIubGVmdCAtIGkubGVmdCkgLyAocyB8fCAxKSwgZiA9IChyLnRvcCAtIGkudG9wKSAvICh1IHx8IDEpO1xuICAgICAgICBvLmFuaW1hdGluZ1ggPSAhIWQsIG8uYW5pbWF0aW5nWSA9ICEhZiwgaChvLCBcInRyYW5zZm9ybVwiLCBcInRyYW5zbGF0ZTNkKFwiICsgZCArIFwicHgsXCIgKyBmICsgXCJweCwwKVwiKSwgdGhpcy5mb3JSZXBhaW50RHVtbXkgPSBYbihvKSwgaChvLCBcInRyYW5zaXRpb25cIiwgXCJ0cmFuc2Zvcm0gXCIgKyBhICsgXCJtc1wiICsgKHRoaXMub3B0aW9ucy5lYXNpbmcgPyBcIiBcIiArIHRoaXMub3B0aW9ucy5lYXNpbmcgOiBcIlwiKSksIGgobywgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGUzZCgwLDAsMClcIiksIHR5cGVvZiBvLmFuaW1hdGVkID09IFwibnVtYmVyXCIgJiYgY2xlYXJUaW1lb3V0KG8uYW5pbWF0ZWQpLCBvLmFuaW1hdGVkID0gc2V0VGltZW91dChmdW5jdGlvbigpIHtcbiAgICAgICAgICBoKG8sIFwidHJhbnNpdGlvblwiLCBcIlwiKSwgaChvLCBcInRyYW5zZm9ybVwiLCBcIlwiKSwgby5hbmltYXRlZCA9ICExLCBvLmFuaW1hdGluZ1ggPSAhMSwgby5hbmltYXRpbmdZID0gITE7XG4gICAgICAgIH0sIGEpO1xuICAgICAgfVxuICAgIH1cbiAgfTtcbn1cbmZ1bmN0aW9uIFhuKHQpIHtcbiAgcmV0dXJuIHQub2Zmc2V0V2lkdGg7XG59XG5mdW5jdGlvbiBZbih0LCBlLCBuLCBvKSB7XG4gIHJldHVybiBNYXRoLnNxcnQoTWF0aC5wb3coZS50b3AgLSB0LnRvcCwgMikgKyBNYXRoLnBvdyhlLmxlZnQgLSB0LmxlZnQsIDIpKSAvIE1hdGguc3FydChNYXRoLnBvdyhlLnRvcCAtIG4udG9wLCAyKSArIE1hdGgucG93KGUubGVmdCAtIG4ubGVmdCwgMikpICogby5hbmltYXRpb247XG59XG52YXIgZ2UgPSBbXSwgSmUgPSB7XG4gIGluaXRpYWxpemVCeURlZmF1bHQ6ICEwXG59LCB4ZSA9IHtcbiAgbW91bnQ6IGZ1bmN0aW9uKGUpIHtcbiAgICBmb3IgKHZhciBuIGluIEplKVxuICAgICAgSmUuaGFzT3duUHJvcGVydHkobikgJiYgIShuIGluIGUpICYmIChlW25dID0gSmVbbl0pO1xuICAgIGdlLmZvckVhY2goZnVuY3Rpb24obykge1xuICAgICAgaWYgKG8ucGx1Z2luTmFtZSA9PT0gZS5wbHVnaW5OYW1lKVxuICAgICAgICB0aHJvdyBcIlNvcnRhYmxlOiBDYW5ub3QgbW91bnQgcGx1Z2luIFwiLmNvbmNhdChlLnBsdWdpbk5hbWUsIFwiIG1vcmUgdGhhbiBvbmNlXCIpO1xuICAgIH0pLCBnZS5wdXNoKGUpO1xuICB9LFxuICBwbHVnaW5FdmVudDogZnVuY3Rpb24oZSwgbiwgbykge1xuICAgIHZhciByID0gdGhpcztcbiAgICB0aGlzLmV2ZW50Q2FuY2VsZWQgPSAhMSwgby5jYW5jZWwgPSBmdW5jdGlvbigpIHtcbiAgICAgIHIuZXZlbnRDYW5jZWxlZCA9ICEwO1xuICAgIH07XG4gICAgdmFyIGkgPSBlICsgXCJHbG9iYWxcIjtcbiAgICBnZS5mb3JFYWNoKGZ1bmN0aW9uKGEpIHtcbiAgICAgIG5bYS5wbHVnaW5OYW1lXSAmJiAoblthLnBsdWdpbk5hbWVdW2ldICYmIG5bYS5wbHVnaW5OYW1lXVtpXSh0ZSh7XG4gICAgICAgIHNvcnRhYmxlOiBuXG4gICAgICB9LCBvKSksIG4ub3B0aW9uc1thLnBsdWdpbk5hbWVdICYmIG5bYS5wbHVnaW5OYW1lXVtlXSAmJiBuW2EucGx1Z2luTmFtZV1bZV0odGUoe1xuICAgICAgICBzb3J0YWJsZTogblxuICAgICAgfSwgbykpKTtcbiAgICB9KTtcbiAgfSxcbiAgaW5pdGlhbGl6ZVBsdWdpbnM6IGZ1bmN0aW9uKGUsIG4sIG8sIHIpIHtcbiAgICBnZS5mb3JFYWNoKGZ1bmN0aW9uKGwpIHtcbiAgICAgIHZhciBzID0gbC5wbHVnaW5OYW1lO1xuICAgICAgaWYgKCEoIWUub3B0aW9uc1tzXSAmJiAhbC5pbml0aWFsaXplQnlEZWZhdWx0KSkge1xuICAgICAgICB2YXIgdSA9IG5ldyBsKGUsIG4sIGUub3B0aW9ucyk7XG4gICAgICAgIHUuc29ydGFibGUgPSBlLCB1Lm9wdGlvbnMgPSBlLm9wdGlvbnMsIGVbc10gPSB1LCByZShvLCB1LmRlZmF1bHRzKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBmb3IgKHZhciBpIGluIGUub3B0aW9ucylcbiAgICAgIGlmIChlLm9wdGlvbnMuaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgICAgdmFyIGEgPSB0aGlzLm1vZGlmeU9wdGlvbihlLCBpLCBlLm9wdGlvbnNbaV0pO1xuICAgICAgICB0eXBlb2YgYSAhPSBcInVuZGVmaW5lZFwiICYmIChlLm9wdGlvbnNbaV0gPSBhKTtcbiAgICAgIH1cbiAgfSxcbiAgZ2V0RXZlbnRQcm9wZXJ0aWVzOiBmdW5jdGlvbihlLCBuKSB7XG4gICAgdmFyIG8gPSB7fTtcbiAgICByZXR1cm4gZ2UuZm9yRWFjaChmdW5jdGlvbihyKSB7XG4gICAgICB0eXBlb2Ygci5ldmVudFByb3BlcnRpZXMgPT0gXCJmdW5jdGlvblwiICYmIHJlKG8sIHIuZXZlbnRQcm9wZXJ0aWVzLmNhbGwobltyLnBsdWdpbk5hbWVdLCBlKSk7XG4gICAgfSksIG87XG4gIH0sXG4gIG1vZGlmeU9wdGlvbjogZnVuY3Rpb24oZSwgbiwgbykge1xuICAgIHZhciByO1xuICAgIHJldHVybiBnZS5mb3JFYWNoKGZ1bmN0aW9uKGkpIHtcbiAgICAgIGVbaS5wbHVnaW5OYW1lXSAmJiBpLm9wdGlvbkxpc3RlbmVycyAmJiB0eXBlb2YgaS5vcHRpb25MaXN0ZW5lcnNbbl0gPT0gXCJmdW5jdGlvblwiICYmIChyID0gaS5vcHRpb25MaXN0ZW5lcnNbbl0uY2FsbChlW2kucGx1Z2luTmFtZV0sIG8pKTtcbiAgICB9KSwgcjtcbiAgfVxufTtcbmZ1bmN0aW9uIEJuKHQpIHtcbiAgdmFyIGUgPSB0LnNvcnRhYmxlLCBuID0gdC5yb290RWwsIG8gPSB0Lm5hbWUsIHIgPSB0LnRhcmdldEVsLCBpID0gdC5jbG9uZUVsLCBhID0gdC50b0VsLCBsID0gdC5mcm9tRWwsIHMgPSB0Lm9sZEluZGV4LCB1ID0gdC5uZXdJbmRleCwgZCA9IHQub2xkRHJhZ2dhYmxlSW5kZXgsIGYgPSB0Lm5ld0RyYWdnYWJsZUluZGV4LCBtID0gdC5vcmlnaW5hbEV2ZW50LCB5ID0gdC5wdXRTb3J0YWJsZSwgYiA9IHQuZXh0cmFFdmVudFByb3BlcnRpZXM7XG4gIGlmIChlID0gZSB8fCBuICYmIG5bcV0sICEhZSkge1xuICAgIHZhciBFLCBrID0gZS5vcHRpb25zLCBIID0gXCJvblwiICsgby5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIG8uc3Vic3RyKDEpO1xuICAgIHdpbmRvdy5DdXN0b21FdmVudCAmJiAhaWUgJiYgIUFlID8gRSA9IG5ldyBDdXN0b21FdmVudChvLCB7XG4gICAgICBidWJibGVzOiAhMCxcbiAgICAgIGNhbmNlbGFibGU6ICEwXG4gICAgfSkgOiAoRSA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIiksIEUuaW5pdEV2ZW50KG8sICEwLCAhMCkpLCBFLnRvID0gYSB8fCBuLCBFLmZyb20gPSBsIHx8IG4sIEUuaXRlbSA9IHIgfHwgbiwgRS5jbG9uZSA9IGksIEUub2xkSW5kZXggPSBzLCBFLm5ld0luZGV4ID0gdSwgRS5vbGREcmFnZ2FibGVJbmRleCA9IGQsIEUubmV3RHJhZ2dhYmxlSW5kZXggPSBmLCBFLm9yaWdpbmFsRXZlbnQgPSBtLCBFLnB1bGxNb2RlID0geSA/IHkubGFzdFB1dE1vZGUgOiB2b2lkIDA7XG4gICAgdmFyIEYgPSB0ZSh0ZSh7fSwgYiksIHhlLmdldEV2ZW50UHJvcGVydGllcyhvLCBlKSk7XG4gICAgZm9yICh2YXIgQSBpbiBGKVxuICAgICAgRVtBXSA9IEZbQV07XG4gICAgbiAmJiBuLmRpc3BhdGNoRXZlbnQoRSksIGtbSF0gJiYga1tIXS5jYWxsKGUsIEUpO1xuICB9XG59XG52YXIga24gPSBbXCJldnRcIl0sIEcgPSBmdW5jdGlvbihlLCBuKSB7XG4gIHZhciBvID0gYXJndW1lbnRzLmxlbmd0aCA+IDIgJiYgYXJndW1lbnRzWzJdICE9PSB2b2lkIDAgPyBhcmd1bWVudHNbMl0gOiB7fSwgciA9IG8uZXZ0LCBpID0gQW4obywga24pO1xuICB4ZS5wbHVnaW5FdmVudC5iaW5kKHApKGUsIG4sIHRlKHtcbiAgICBkcmFnRWw6IGMsXG4gICAgcGFyZW50RWw6IEksXG4gICAgZ2hvc3RFbDogZyxcbiAgICByb290RWw6IEMsXG4gICAgbmV4dEVsOiBwZSxcbiAgICBsYXN0RG93bkVsOiBZZSxcbiAgICBjbG9uZUVsOiBPLFxuICAgIGNsb25lSGlkZGVuOiBzZSxcbiAgICBkcmFnU3RhcnRlZDogRWUsXG4gICAgcHV0U29ydGFibGU6IFgsXG4gICAgYWN0aXZlU29ydGFibGU6IHAuYWN0aXZlLFxuICAgIG9yaWdpbmFsRXZlbnQ6IHIsXG4gICAgb2xkSW5kZXg6IGJlLFxuICAgIG9sZERyYWdnYWJsZUluZGV4OiBDZSxcbiAgICBuZXdJbmRleDogJCxcbiAgICBuZXdEcmFnZ2FibGVJbmRleDogbGUsXG4gICAgaGlkZUdob3N0Rm9yVGFyZ2V0OiBLdCxcbiAgICB1bmhpZGVHaG9zdEZvclRhcmdldDogSnQsXG4gICAgY2xvbmVOb3dIaWRkZW46IGZ1bmN0aW9uKCkge1xuICAgICAgc2UgPSAhMDtcbiAgICB9LFxuICAgIGNsb25lTm93U2hvd246IGZ1bmN0aW9uKCkge1xuICAgICAgc2UgPSAhMTtcbiAgICB9LFxuICAgIGRpc3BhdGNoU29ydGFibGVFdmVudDogZnVuY3Rpb24obCkge1xuICAgICAgVyh7XG4gICAgICAgIHNvcnRhYmxlOiBuLFxuICAgICAgICBuYW1lOiBsLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiByXG4gICAgICB9KTtcbiAgICB9XG4gIH0sIGkpKTtcbn07XG5mdW5jdGlvbiBXKHQpIHtcbiAgQm4odGUoe1xuICAgIHB1dFNvcnRhYmxlOiBYLFxuICAgIGNsb25lRWw6IE8sXG4gICAgdGFyZ2V0RWw6IGMsXG4gICAgcm9vdEVsOiBDLFxuICAgIG9sZEluZGV4OiBiZSxcbiAgICBvbGREcmFnZ2FibGVJbmRleDogQ2UsXG4gICAgbmV3SW5kZXg6ICQsXG4gICAgbmV3RHJhZ2dhYmxlSW5kZXg6IGxlXG4gIH0sIHQpKTtcbn1cbnZhciBjLCBJLCBnLCBDLCBwZSwgWWUsIE8sIHNlLCBiZSwgJCwgQ2UsIGxlLCBQZSwgWCwgdmUgPSAhMSwgV2UgPSAhMSwgR2UgPSBbXSwgZGUsIEosIFplLCBRZSwgeHQsIE50LCBFZSwgbWUsIE9lLCBJZSA9ICExLCBNZSA9ICExLCBCZSwgQiwgZXQgPSBbXSwgYXQgPSAhMSwgamUgPSBbXSwgVWUgPSB0eXBlb2YgZG9jdW1lbnQgIT0gXCJ1bmRlZmluZWRcIiwgRmUgPSBrdCwgUHQgPSBBZSB8fCBpZSA/IFwiY3NzRmxvYXRcIiA6IFwiZmxvYXRcIiwgSG4gPSBVZSAmJiAhSHQgJiYgIWt0ICYmIFwiZHJhZ2dhYmxlXCIgaW4gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcImRpdlwiKSwgVnQgPSBmdW5jdGlvbigpIHtcbiAgaWYgKFVlKSB7XG4gICAgaWYgKGllKVxuICAgICAgcmV0dXJuICExO1xuICAgIHZhciB0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudChcInhcIik7XG4gICAgcmV0dXJuIHQuc3R5bGUuY3NzVGV4dCA9IFwicG9pbnRlci1ldmVudHM6YXV0b1wiLCB0LnN0eWxlLnBvaW50ZXJFdmVudHMgPT09IFwiYXV0b1wiO1xuICB9XG59KCksICR0ID0gZnVuY3Rpb24oZSwgbikge1xuICB2YXIgbyA9IGgoZSksIHIgPSBwYXJzZUludChvLndpZHRoKSAtIHBhcnNlSW50KG8ucGFkZGluZ0xlZnQpIC0gcGFyc2VJbnQoby5wYWRkaW5nUmlnaHQpIC0gcGFyc2VJbnQoby5ib3JkZXJMZWZ0V2lkdGgpIC0gcGFyc2VJbnQoby5ib3JkZXJSaWdodFdpZHRoKSwgaSA9IHdlKGUsIDAsIG4pLCBhID0gd2UoZSwgMSwgbiksIGwgPSBpICYmIGgoaSksIHMgPSBhICYmIGgoYSksIHUgPSBsICYmIHBhcnNlSW50KGwubWFyZ2luTGVmdCkgKyBwYXJzZUludChsLm1hcmdpblJpZ2h0KSArIE0oaSkud2lkdGgsIGQgPSBzICYmIHBhcnNlSW50KHMubWFyZ2luTGVmdCkgKyBwYXJzZUludChzLm1hcmdpblJpZ2h0KSArIE0oYSkud2lkdGg7XG4gIGlmIChvLmRpc3BsYXkgPT09IFwiZmxleFwiKVxuICAgIHJldHVybiBvLmZsZXhEaXJlY3Rpb24gPT09IFwiY29sdW1uXCIgfHwgby5mbGV4RGlyZWN0aW9uID09PSBcImNvbHVtbi1yZXZlcnNlXCIgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgaWYgKG8uZGlzcGxheSA9PT0gXCJncmlkXCIpXG4gICAgcmV0dXJuIG8uZ3JpZFRlbXBsYXRlQ29sdW1ucy5zcGxpdChcIiBcIikubGVuZ3RoIDw9IDEgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgaWYgKGkgJiYgbC5mbG9hdCAmJiBsLmZsb2F0ICE9PSBcIm5vbmVcIikge1xuICAgIHZhciBmID0gbC5mbG9hdCA9PT0gXCJsZWZ0XCIgPyBcImxlZnRcIiA6IFwicmlnaHRcIjtcbiAgICByZXR1cm4gYSAmJiAocy5jbGVhciA9PT0gXCJib3RoXCIgfHwgcy5jbGVhciA9PT0gZikgPyBcInZlcnRpY2FsXCIgOiBcImhvcml6b250YWxcIjtcbiAgfVxuICByZXR1cm4gaSAmJiAobC5kaXNwbGF5ID09PSBcImJsb2NrXCIgfHwgbC5kaXNwbGF5ID09PSBcImZsZXhcIiB8fCBsLmRpc3BsYXkgPT09IFwidGFibGVcIiB8fCBsLmRpc3BsYXkgPT09IFwiZ3JpZFwiIHx8IHUgPj0gciAmJiBvW1B0XSA9PT0gXCJub25lXCIgfHwgYSAmJiBvW1B0XSA9PT0gXCJub25lXCIgJiYgdSArIGQgPiByKSA/IFwidmVydGljYWxcIiA6IFwiaG9yaXpvbnRhbFwiO1xufSwgTG4gPSBmdW5jdGlvbihlLCBuLCBvKSB7XG4gIHZhciByID0gbyA/IGUubGVmdCA6IGUudG9wLCBpID0gbyA/IGUucmlnaHQgOiBlLmJvdHRvbSwgYSA9IG8gPyBlLndpZHRoIDogZS5oZWlnaHQsIGwgPSBvID8gbi5sZWZ0IDogbi50b3AsIHMgPSBvID8gbi5yaWdodCA6IG4uYm90dG9tLCB1ID0gbyA/IG4ud2lkdGggOiBuLmhlaWdodDtcbiAgcmV0dXJuIHIgPT09IGwgfHwgaSA9PT0gcyB8fCByICsgYSAvIDIgPT09IGwgKyB1IC8gMjtcbn0sIFduID0gZnVuY3Rpb24oZSwgbikge1xuICB2YXIgbztcbiAgcmV0dXJuIEdlLnNvbWUoZnVuY3Rpb24ocikge1xuICAgIHZhciBpID0gcltxXS5vcHRpb25zLmVtcHR5SW5zZXJ0VGhyZXNob2xkO1xuICAgIGlmICghKCFpIHx8IGR0KHIpKSkge1xuICAgICAgdmFyIGEgPSBNKHIpLCBsID0gZSA+PSBhLmxlZnQgLSBpICYmIGUgPD0gYS5yaWdodCArIGksIHMgPSBuID49IGEudG9wIC0gaSAmJiBuIDw9IGEuYm90dG9tICsgaTtcbiAgICAgIGlmIChsICYmIHMpXG4gICAgICAgIHJldHVybiBvID0gcjtcbiAgICB9XG4gIH0pLCBvO1xufSwgcXQgPSBmdW5jdGlvbihlKSB7XG4gIGZ1bmN0aW9uIG4oaSwgYSkge1xuICAgIHJldHVybiBmdW5jdGlvbihsLCBzLCB1LCBkKSB7XG4gICAgICB2YXIgZiA9IGwub3B0aW9ucy5ncm91cC5uYW1lICYmIHMub3B0aW9ucy5ncm91cC5uYW1lICYmIGwub3B0aW9ucy5ncm91cC5uYW1lID09PSBzLm9wdGlvbnMuZ3JvdXAubmFtZTtcbiAgICAgIGlmIChpID09IG51bGwgJiYgKGEgfHwgZikpXG4gICAgICAgIHJldHVybiAhMDtcbiAgICAgIGlmIChpID09IG51bGwgfHwgaSA9PT0gITEpXG4gICAgICAgIHJldHVybiAhMTtcbiAgICAgIGlmIChhICYmIGkgPT09IFwiY2xvbmVcIilcbiAgICAgICAgcmV0dXJuIGk7XG4gICAgICBpZiAodHlwZW9mIGkgPT0gXCJmdW5jdGlvblwiKVxuICAgICAgICByZXR1cm4gbihpKGwsIHMsIHUsIGQpLCBhKShsLCBzLCB1LCBkKTtcbiAgICAgIHZhciBtID0gKGEgPyBsIDogcykub3B0aW9ucy5ncm91cC5uYW1lO1xuICAgICAgcmV0dXJuIGkgPT09ICEwIHx8IHR5cGVvZiBpID09IFwic3RyaW5nXCIgJiYgaSA9PT0gbSB8fCBpLmpvaW4gJiYgaS5pbmRleE9mKG0pID4gLTE7XG4gICAgfTtcbiAgfVxuICB2YXIgbyA9IHt9LCByID0gZS5ncm91cDtcbiAgKCFyIHx8IFhlKHIpICE9IFwib2JqZWN0XCIpICYmIChyID0ge1xuICAgIG5hbWU6IHJcbiAgfSksIG8ubmFtZSA9IHIubmFtZSwgby5jaGVja1B1bGwgPSBuKHIucHVsbCwgITApLCBvLmNoZWNrUHV0ID0gbihyLnB1dCksIG8ucmV2ZXJ0Q2xvbmUgPSByLnJldmVydENsb25lLCBlLmdyb3VwID0gbztcbn0sIEt0ID0gZnVuY3Rpb24oKSB7XG4gICFWdCAmJiBnICYmIGgoZywgXCJkaXNwbGF5XCIsIFwibm9uZVwiKTtcbn0sIEp0ID0gZnVuY3Rpb24oKSB7XG4gICFWdCAmJiBnICYmIGgoZywgXCJkaXNwbGF5XCIsIFwiXCIpO1xufTtcblVlICYmICFIdCAmJiBkb2N1bWVudC5hZGRFdmVudExpc3RlbmVyKFwiY2xpY2tcIiwgZnVuY3Rpb24odCkge1xuICBpZiAoV2UpXG4gICAgcmV0dXJuIHQucHJldmVudERlZmF1bHQoKSwgdC5zdG9wUHJvcGFnYXRpb24gJiYgdC5zdG9wUHJvcGFnYXRpb24oKSwgdC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24gJiYgdC5zdG9wSW1tZWRpYXRlUHJvcGFnYXRpb24oKSwgV2UgPSAhMSwgITE7XG59LCAhMCk7XG52YXIgaGUgPSBmdW5jdGlvbihlKSB7XG4gIGlmIChjKSB7XG4gICAgZSA9IGUudG91Y2hlcyA/IGUudG91Y2hlc1swXSA6IGU7XG4gICAgdmFyIG4gPSBXbihlLmNsaWVudFgsIGUuY2xpZW50WSk7XG4gICAgaWYgKG4pIHtcbiAgICAgIHZhciBvID0ge307XG4gICAgICBmb3IgKHZhciByIGluIGUpXG4gICAgICAgIGUuaGFzT3duUHJvcGVydHkocikgJiYgKG9bcl0gPSBlW3JdKTtcbiAgICAgIG8udGFyZ2V0ID0gby5yb290RWwgPSBuLCBvLnByZXZlbnREZWZhdWx0ID0gdm9pZCAwLCBvLnN0b3BQcm9wYWdhdGlvbiA9IHZvaWQgMCwgbltxXS5fb25EcmFnT3ZlcihvKTtcbiAgICB9XG4gIH1cbn0sIEduID0gZnVuY3Rpb24oZSkge1xuICBjICYmIGMucGFyZW50Tm9kZVtxXS5faXNPdXRzaWRlVGhpc0VsKGUudGFyZ2V0KTtcbn07XG5mdW5jdGlvbiBwKHQsIGUpIHtcbiAgaWYgKCEodCAmJiB0Lm5vZGVUeXBlICYmIHQubm9kZVR5cGUgPT09IDEpKVxuICAgIHRocm93IFwiU29ydGFibGU6IGBlbGAgbXVzdCBiZSBhbiBIVE1MRWxlbWVudCwgbm90IFwiLmNvbmNhdCh7fS50b1N0cmluZy5jYWxsKHQpKTtcbiAgdGhpcy5lbCA9IHQsIHRoaXMub3B0aW9ucyA9IGUgPSByZSh7fSwgZSksIHRbcV0gPSB0aGlzO1xuICB2YXIgbiA9IHtcbiAgICBncm91cDogbnVsbCxcbiAgICBzb3J0OiAhMCxcbiAgICBkaXNhYmxlZDogITEsXG4gICAgc3RvcmU6IG51bGwsXG4gICAgaGFuZGxlOiBudWxsLFxuICAgIGRyYWdnYWJsZTogL15bdW9dbCQvaS50ZXN0KHQubm9kZU5hbWUpID8gXCI+bGlcIiA6IFwiPipcIixcbiAgICBzd2FwVGhyZXNob2xkOiAxLFxuICAgIC8vIHBlcmNlbnRhZ2U7IDAgPD0geCA8PSAxXG4gICAgaW52ZXJ0U3dhcDogITEsXG4gICAgLy8gaW52ZXJ0IGFsd2F5c1xuICAgIGludmVydGVkU3dhcFRocmVzaG9sZDogbnVsbCxcbiAgICAvLyB3aWxsIGJlIHNldCB0byBzYW1lIGFzIHN3YXBUaHJlc2hvbGQgaWYgZGVmYXVsdFxuICAgIHJlbW92ZUNsb25lT25IaWRlOiAhMCxcbiAgICBkaXJlY3Rpb246IGZ1bmN0aW9uKCkge1xuICAgICAgcmV0dXJuICR0KHQsIHRoaXMub3B0aW9ucyk7XG4gICAgfSxcbiAgICBnaG9zdENsYXNzOiBcInNvcnRhYmxlLWdob3N0XCIsXG4gICAgY2hvc2VuQ2xhc3M6IFwic29ydGFibGUtY2hvc2VuXCIsXG4gICAgZHJhZ0NsYXNzOiBcInNvcnRhYmxlLWRyYWdcIixcbiAgICBpZ25vcmU6IFwiYSwgaW1nXCIsXG4gICAgZmlsdGVyOiBudWxsLFxuICAgIHByZXZlbnRPbkZpbHRlcjogITAsXG4gICAgYW5pbWF0aW9uOiAwLFxuICAgIGVhc2luZzogbnVsbCxcbiAgICBzZXREYXRhOiBmdW5jdGlvbihhLCBsKSB7XG4gICAgICBhLnNldERhdGEoXCJUZXh0XCIsIGwudGV4dENvbnRlbnQpO1xuICAgIH0sXG4gICAgZHJvcEJ1YmJsZTogITEsXG4gICAgZHJhZ292ZXJCdWJibGU6ICExLFxuICAgIGRhdGFJZEF0dHI6IFwiZGF0YS1pZFwiLFxuICAgIGRlbGF5OiAwLFxuICAgIGRlbGF5T25Ub3VjaE9ubHk6ICExLFxuICAgIHRvdWNoU3RhcnRUaHJlc2hvbGQ6IChOdW1iZXIucGFyc2VJbnQgPyBOdW1iZXIgOiB3aW5kb3cpLnBhcnNlSW50KHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvLCAxMCkgfHwgMSxcbiAgICBmb3JjZUZhbGxiYWNrOiAhMSxcbiAgICBmYWxsYmFja0NsYXNzOiBcInNvcnRhYmxlLWZhbGxiYWNrXCIsXG4gICAgZmFsbGJhY2tPbkJvZHk6ICExLFxuICAgIGZhbGxiYWNrVG9sZXJhbmNlOiAwLFxuICAgIGZhbGxiYWNrT2Zmc2V0OiB7XG4gICAgICB4OiAwLFxuICAgICAgeTogMFxuICAgIH0sXG4gICAgc3VwcG9ydFBvaW50ZXI6IHAuc3VwcG9ydFBvaW50ZXIgIT09ICExICYmIFwiUG9pbnRlckV2ZW50XCIgaW4gd2luZG93ICYmICFfZSxcbiAgICBlbXB0eUluc2VydFRocmVzaG9sZDogNVxuICB9O1xuICB4ZS5pbml0aWFsaXplUGx1Z2lucyh0aGlzLCB0LCBuKTtcbiAgZm9yICh2YXIgbyBpbiBuKVxuICAgICEobyBpbiBlKSAmJiAoZVtvXSA9IG5bb10pO1xuICBxdChlKTtcbiAgZm9yICh2YXIgciBpbiB0aGlzKVxuICAgIHIuY2hhckF0KDApID09PSBcIl9cIiAmJiB0eXBlb2YgdGhpc1tyXSA9PSBcImZ1bmN0aW9uXCIgJiYgKHRoaXNbcl0gPSB0aGlzW3JdLmJpbmQodGhpcykpO1xuICB0aGlzLm5hdGl2ZURyYWdnYWJsZSA9IGUuZm9yY2VGYWxsYmFjayA/ICExIDogSG4sIHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmICh0aGlzLm9wdGlvbnMudG91Y2hTdGFydFRocmVzaG9sZCA9IDEpLCBlLnN1cHBvcnRQb2ludGVyID8gRCh0LCBcInBvaW50ZXJkb3duXCIsIHRoaXMuX29uVGFwU3RhcnQpIDogKEQodCwgXCJtb3VzZWRvd25cIiwgdGhpcy5fb25UYXBTdGFydCksIEQodCwgXCJ0b3VjaHN0YXJ0XCIsIHRoaXMuX29uVGFwU3RhcnQpKSwgdGhpcy5uYXRpdmVEcmFnZ2FibGUgJiYgKEQodCwgXCJkcmFnb3ZlclwiLCB0aGlzKSwgRCh0LCBcImRyYWdlbnRlclwiLCB0aGlzKSksIEdlLnB1c2godGhpcy5lbCksIGUuc3RvcmUgJiYgZS5zdG9yZS5nZXQgJiYgdGhpcy5zb3J0KGUuc3RvcmUuZ2V0KHRoaXMpIHx8IFtdKSwgcmUodGhpcywgUm4oKSk7XG59XG5wLnByb3RvdHlwZSA9IC8qKiBAbGVuZHMgU29ydGFibGUucHJvdG90eXBlICovXG57XG4gIGNvbnN0cnVjdG9yOiBwLFxuICBfaXNPdXRzaWRlVGhpc0VsOiBmdW5jdGlvbihlKSB7XG4gICAgIXRoaXMuZWwuY29udGFpbnMoZSkgJiYgZSAhPT0gdGhpcy5lbCAmJiAobWUgPSBudWxsKTtcbiAgfSxcbiAgX2dldERpcmVjdGlvbjogZnVuY3Rpb24oZSwgbikge1xuICAgIHJldHVybiB0eXBlb2YgdGhpcy5vcHRpb25zLmRpcmVjdGlvbiA9PSBcImZ1bmN0aW9uXCIgPyB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uLmNhbGwodGhpcywgZSwgbiwgYykgOiB0aGlzLm9wdGlvbnMuZGlyZWN0aW9uO1xuICB9LFxuICBfb25UYXBTdGFydDogZnVuY3Rpb24oZSkge1xuICAgIGlmIChlLmNhbmNlbGFibGUpIHtcbiAgICAgIHZhciBuID0gdGhpcywgbyA9IHRoaXMuZWwsIHIgPSB0aGlzLm9wdGlvbnMsIGkgPSByLnByZXZlbnRPbkZpbHRlciwgYSA9IGUudHlwZSwgbCA9IGUudG91Y2hlcyAmJiBlLnRvdWNoZXNbMF0gfHwgZS5wb2ludGVyVHlwZSAmJiBlLnBvaW50ZXJUeXBlID09PSBcInRvdWNoXCIgJiYgZSwgcyA9IChsIHx8IGUpLnRhcmdldCwgdSA9IGUudGFyZ2V0LnNoYWRvd1Jvb3QgJiYgKGUucGF0aCAmJiBlLnBhdGhbMF0gfHwgZS5jb21wb3NlZFBhdGggJiYgZS5jb21wb3NlZFBhdGgoKVswXSkgfHwgcywgZCA9IHIuZmlsdGVyO1xuICAgICAgaWYgKEpuKG8pLCAhYyAmJiAhKC9tb3VzZWRvd258cG9pbnRlcmRvd24vLnRlc3QoYSkgJiYgZS5idXR0b24gIT09IDAgfHwgci5kaXNhYmxlZCkgJiYgIXUuaXNDb250ZW50RWRpdGFibGUgJiYgISghdGhpcy5uYXRpdmVEcmFnZ2FibGUgJiYgX2UgJiYgcyAmJiBzLnRhZ05hbWUudG9VcHBlckNhc2UoKSA9PT0gXCJTRUxFQ1RcIikgJiYgKHMgPSBaKHMsIHIuZHJhZ2dhYmxlLCBvLCAhMSksICEocyAmJiBzLmFuaW1hdGVkKSAmJiBZZSAhPT0gcykpIHtcbiAgICAgICAgaWYgKGJlID0gSyhzKSwgQ2UgPSBLKHMsIHIuZHJhZ2dhYmxlKSwgdHlwZW9mIGQgPT0gXCJmdW5jdGlvblwiKSB7XG4gICAgICAgICAgaWYgKGQuY2FsbCh0aGlzLCBlLCBzLCB0aGlzKSkge1xuICAgICAgICAgICAgVyh7XG4gICAgICAgICAgICAgIHNvcnRhYmxlOiBuLFxuICAgICAgICAgICAgICByb290RWw6IHUsXG4gICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyXCIsXG4gICAgICAgICAgICAgIHRhcmdldEVsOiBzLFxuICAgICAgICAgICAgICB0b0VsOiBvLFxuICAgICAgICAgICAgICBmcm9tRWw6IG9cbiAgICAgICAgICAgIH0pLCBHKFwiZmlsdGVyXCIsIG4sIHtcbiAgICAgICAgICAgICAgZXZ0OiBlXG4gICAgICAgICAgICB9KSwgaSAmJiBlLmNhbmNlbGFibGUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIGlmIChkICYmIChkID0gZC5zcGxpdChcIixcIikuc29tZShmdW5jdGlvbihmKSB7XG4gICAgICAgICAgaWYgKGYgPSBaKHUsIGYudHJpbSgpLCBvLCAhMSksIGYpXG4gICAgICAgICAgICByZXR1cm4gVyh7XG4gICAgICAgICAgICAgIHNvcnRhYmxlOiBuLFxuICAgICAgICAgICAgICByb290RWw6IGYsXG4gICAgICAgICAgICAgIG5hbWU6IFwiZmlsdGVyXCIsXG4gICAgICAgICAgICAgIHRhcmdldEVsOiBzLFxuICAgICAgICAgICAgICBmcm9tRWw6IG8sXG4gICAgICAgICAgICAgIHRvRWw6IG9cbiAgICAgICAgICAgIH0pLCBHKFwiZmlsdGVyXCIsIG4sIHtcbiAgICAgICAgICAgICAgZXZ0OiBlXG4gICAgICAgICAgICB9KSwgITA7XG4gICAgICAgIH0pLCBkKSkge1xuICAgICAgICAgIGkgJiYgZS5jYW5jZWxhYmxlICYmIGUucHJldmVudERlZmF1bHQoKTtcbiAgICAgICAgICByZXR1cm47XG4gICAgICAgIH1cbiAgICAgICAgci5oYW5kbGUgJiYgIVoodSwgci5oYW5kbGUsIG8sICExKSB8fCB0aGlzLl9wcmVwYXJlRHJhZ1N0YXJ0KGUsIGwsIHMpO1xuICAgICAgfVxuICAgIH1cbiAgfSxcbiAgX3ByZXBhcmVEcmFnU3RhcnQ6IGZ1bmN0aW9uKGUsIG4sIG8pIHtcbiAgICB2YXIgciA9IHRoaXMsIGkgPSByLmVsLCBhID0gci5vcHRpb25zLCBsID0gaS5vd25lckRvY3VtZW50LCBzO1xuICAgIGlmIChvICYmICFjICYmIG8ucGFyZW50Tm9kZSA9PT0gaSkge1xuICAgICAgdmFyIHUgPSBNKG8pO1xuICAgICAgaWYgKEMgPSBpLCBjID0gbywgSSA9IGMucGFyZW50Tm9kZSwgcGUgPSBjLm5leHRTaWJsaW5nLCBZZSA9IG8sIFBlID0gYS5ncm91cCwgcC5kcmFnZ2VkID0gYywgZGUgPSB7XG4gICAgICAgIHRhcmdldDogYyxcbiAgICAgICAgY2xpZW50WDogKG4gfHwgZSkuY2xpZW50WCxcbiAgICAgICAgY2xpZW50WTogKG4gfHwgZSkuY2xpZW50WVxuICAgICAgfSwgeHQgPSBkZS5jbGllbnRYIC0gdS5sZWZ0LCBOdCA9IGRlLmNsaWVudFkgLSB1LnRvcCwgdGhpcy5fbGFzdFggPSAobiB8fCBlKS5jbGllbnRYLCB0aGlzLl9sYXN0WSA9IChuIHx8IGUpLmNsaWVudFksIGMuc3R5bGVbXCJ3aWxsLWNoYW5nZVwiXSA9IFwiYWxsXCIsIHMgPSBmdW5jdGlvbigpIHtcbiAgICAgICAgaWYgKEcoXCJkZWxheUVuZGVkXCIsIHIsIHtcbiAgICAgICAgICBldnQ6IGVcbiAgICAgICAgfSksIHAuZXZlbnRDYW5jZWxlZCkge1xuICAgICAgICAgIHIuX29uRHJvcCgpO1xuICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgICAgICByLl9kaXNhYmxlRGVsYXllZERyYWdFdmVudHMoKSwgIUN0ICYmIHIubmF0aXZlRHJhZ2dhYmxlICYmIChjLmRyYWdnYWJsZSA9ICEwKSwgci5fdHJpZ2dlckRyYWdTdGFydChlLCBuKSwgVyh7XG4gICAgICAgICAgc29ydGFibGU6IHIsXG4gICAgICAgICAgbmFtZTogXCJjaG9vc2VcIixcbiAgICAgICAgICBvcmlnaW5hbEV2ZW50OiBlXG4gICAgICAgIH0pLCBWKGMsIGEuY2hvc2VuQ2xhc3MsICEwKTtcbiAgICAgIH0sIGEuaWdub3JlLnNwbGl0KFwiLFwiKS5mb3JFYWNoKGZ1bmN0aW9uKGQpIHtcbiAgICAgICAgV3QoYywgZC50cmltKCksIHR0KTtcbiAgICAgIH0pLCBEKGwsIFwiZHJhZ292ZXJcIiwgaGUpLCBEKGwsIFwibW91c2Vtb3ZlXCIsIGhlKSwgRChsLCBcInRvdWNobW92ZVwiLCBoZSksIEQobCwgXCJtb3VzZXVwXCIsIHIuX29uRHJvcCksIEQobCwgXCJ0b3VjaGVuZFwiLCByLl9vbkRyb3ApLCBEKGwsIFwidG91Y2hjYW5jZWxcIiwgci5fb25Ecm9wKSwgQ3QgJiYgdGhpcy5uYXRpdmVEcmFnZ2FibGUgJiYgKHRoaXMub3B0aW9ucy50b3VjaFN0YXJ0VGhyZXNob2xkID0gNCwgYy5kcmFnZ2FibGUgPSAhMCksIEcoXCJkZWxheVN0YXJ0XCIsIHRoaXMsIHtcbiAgICAgICAgZXZ0OiBlXG4gICAgICB9KSwgYS5kZWxheSAmJiAoIWEuZGVsYXlPblRvdWNoT25seSB8fCBuKSAmJiAoIXRoaXMubmF0aXZlRHJhZ2dhYmxlIHx8ICEoQWUgfHwgaWUpKSkge1xuICAgICAgICBpZiAocC5ldmVudENhbmNlbGVkKSB7XG4gICAgICAgICAgdGhpcy5fb25Ecm9wKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIEQobCwgXCJtb3VzZXVwXCIsIHIuX2Rpc2FibGVEZWxheWVkRHJhZyksIEQobCwgXCJ0b3VjaGVuZFwiLCByLl9kaXNhYmxlRGVsYXllZERyYWcpLCBEKGwsIFwidG91Y2hjYW5jZWxcIiwgci5fZGlzYWJsZURlbGF5ZWREcmFnKSwgRChsLCBcIm1vdXNlbW92ZVwiLCByLl9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIpLCBEKGwsIFwidG91Y2htb3ZlXCIsIHIuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlciksIGEuc3VwcG9ydFBvaW50ZXIgJiYgRChsLCBcInBvaW50ZXJtb3ZlXCIsIHIuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlciksIHIuX2RyYWdTdGFydFRpbWVyID0gc2V0VGltZW91dChzLCBhLmRlbGF5KTtcbiAgICAgIH0gZWxzZVxuICAgICAgICBzKCk7XG4gICAgfVxuICB9LFxuICBfZGVsYXllZERyYWdUb3VjaE1vdmVIYW5kbGVyOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIG4gPSBlLnRvdWNoZXMgPyBlLnRvdWNoZXNbMF0gOiBlO1xuICAgIE1hdGgubWF4KE1hdGguYWJzKG4uY2xpZW50WCAtIHRoaXMuX2xhc3RYKSwgTWF0aC5hYnMobi5jbGllbnRZIC0gdGhpcy5fbGFzdFkpKSA+PSBNYXRoLmZsb29yKHRoaXMub3B0aW9ucy50b3VjaFN0YXJ0VGhyZXNob2xkIC8gKHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIHdpbmRvdy5kZXZpY2VQaXhlbFJhdGlvIHx8IDEpKSAmJiB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcoKTtcbiAgfSxcbiAgX2Rpc2FibGVEZWxheWVkRHJhZzogZnVuY3Rpb24oKSB7XG4gICAgYyAmJiB0dChjKSwgY2xlYXJUaW1lb3V0KHRoaXMuX2RyYWdTdGFydFRpbWVyKSwgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnRXZlbnRzKCk7XG4gIH0sXG4gIF9kaXNhYmxlRGVsYXllZERyYWdFdmVudHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBlID0gdGhpcy5lbC5vd25lckRvY3VtZW50O1xuICAgIFMoZSwgXCJtb3VzZXVwXCIsIHRoaXMuX2Rpc2FibGVEZWxheWVkRHJhZyksIFMoZSwgXCJ0b3VjaGVuZFwiLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWcpLCBTKGUsIFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fZGlzYWJsZURlbGF5ZWREcmFnKSwgUyhlLCBcIm1vdXNlbW92ZVwiLCB0aGlzLl9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIpLCBTKGUsIFwidG91Y2htb3ZlXCIsIHRoaXMuX2RlbGF5ZWREcmFnVG91Y2hNb3ZlSGFuZGxlciksIFMoZSwgXCJwb2ludGVybW92ZVwiLCB0aGlzLl9kZWxheWVkRHJhZ1RvdWNoTW92ZUhhbmRsZXIpO1xuICB9LFxuICBfdHJpZ2dlckRyYWdTdGFydDogZnVuY3Rpb24oZSwgbikge1xuICAgIG4gPSBuIHx8IGUucG9pbnRlclR5cGUgPT0gXCJ0b3VjaFwiICYmIGUsICF0aGlzLm5hdGl2ZURyYWdnYWJsZSB8fCBuID8gdGhpcy5vcHRpb25zLnN1cHBvcnRQb2ludGVyID8gRChkb2N1bWVudCwgXCJwb2ludGVybW92ZVwiLCB0aGlzLl9vblRvdWNoTW92ZSkgOiBuID8gRChkb2N1bWVudCwgXCJ0b3VjaG1vdmVcIiwgdGhpcy5fb25Ub3VjaE1vdmUpIDogRChkb2N1bWVudCwgXCJtb3VzZW1vdmVcIiwgdGhpcy5fb25Ub3VjaE1vdmUpIDogKEQoYywgXCJkcmFnZW5kXCIsIHRoaXMpLCBEKEMsIFwiZHJhZ3N0YXJ0XCIsIHRoaXMuX29uRHJhZ1N0YXJ0KSk7XG4gICAgdHJ5IHtcbiAgICAgIGRvY3VtZW50LnNlbGVjdGlvbiA/IGtlKGZ1bmN0aW9uKCkge1xuICAgICAgICBkb2N1bWVudC5zZWxlY3Rpb24uZW1wdHkoKTtcbiAgICAgIH0pIDogd2luZG93LmdldFNlbGVjdGlvbigpLnJlbW92ZUFsbFJhbmdlcygpO1xuICAgIH0gY2F0Y2ggKG8pIHtcbiAgICB9XG4gIH0sXG4gIF9kcmFnU3RhcnRlZDogZnVuY3Rpb24oZSwgbikge1xuICAgIGlmICh2ZSA9ICExLCBDICYmIGMpIHtcbiAgICAgIEcoXCJkcmFnU3RhcnRlZFwiLCB0aGlzLCB7XG4gICAgICAgIGV2dDogblxuICAgICAgfSksIHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIEQoZG9jdW1lbnQsIFwiZHJhZ292ZXJcIiwgR24pO1xuICAgICAgdmFyIG8gPSB0aGlzLm9wdGlvbnM7XG4gICAgICAhZSAmJiBWKGMsIG8uZHJhZ0NsYXNzLCAhMSksIFYoYywgby5naG9zdENsYXNzLCAhMCksIHAuYWN0aXZlID0gdGhpcywgZSAmJiB0aGlzLl9hcHBlbmRHaG9zdCgpLCBXKHtcbiAgICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICAgIG5hbWU6IFwic3RhcnRcIixcbiAgICAgICAgb3JpZ2luYWxFdmVudDogblxuICAgICAgfSk7XG4gICAgfSBlbHNlXG4gICAgICB0aGlzLl9udWxsaW5nKCk7XG4gIH0sXG4gIF9lbXVsYXRlRHJhZ092ZXI6IGZ1bmN0aW9uKCkge1xuICAgIGlmIChKKSB7XG4gICAgICB0aGlzLl9sYXN0WCA9IEouY2xpZW50WCwgdGhpcy5fbGFzdFkgPSBKLmNsaWVudFksIEt0KCk7XG4gICAgICBmb3IgKHZhciBlID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChKLmNsaWVudFgsIEouY2xpZW50WSksIG4gPSBlOyBlICYmIGUuc2hhZG93Um9vdCAmJiAoZSA9IGUuc2hhZG93Um9vdC5lbGVtZW50RnJvbVBvaW50KEouY2xpZW50WCwgSi5jbGllbnRZKSwgZSAhPT0gbik7IClcbiAgICAgICAgbiA9IGU7XG4gICAgICBpZiAoYy5wYXJlbnROb2RlW3FdLl9pc091dHNpZGVUaGlzRWwoZSksIG4pXG4gICAgICAgIGRvIHtcbiAgICAgICAgICBpZiAobltxXSkge1xuICAgICAgICAgICAgdmFyIG8gPSB2b2lkIDA7XG4gICAgICAgICAgICBpZiAobyA9IG5bcV0uX29uRHJhZ092ZXIoe1xuICAgICAgICAgICAgICBjbGllbnRYOiBKLmNsaWVudFgsXG4gICAgICAgICAgICAgIGNsaWVudFk6IEouY2xpZW50WSxcbiAgICAgICAgICAgICAgdGFyZ2V0OiBlLFxuICAgICAgICAgICAgICByb290RWw6IG5cbiAgICAgICAgICAgIH0pLCBvICYmICF0aGlzLm9wdGlvbnMuZHJhZ292ZXJCdWJibGUpXG4gICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgIH1cbiAgICAgICAgICBlID0gbjtcbiAgICAgICAgfSB3aGlsZSAobiA9IG4ucGFyZW50Tm9kZSk7XG4gICAgICBKdCgpO1xuICAgIH1cbiAgfSxcbiAgX29uVG91Y2hNb3ZlOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGRlKSB7XG4gICAgICB2YXIgbiA9IHRoaXMub3B0aW9ucywgbyA9IG4uZmFsbGJhY2tUb2xlcmFuY2UsIHIgPSBuLmZhbGxiYWNrT2Zmc2V0LCBpID0gZS50b3VjaGVzID8gZS50b3VjaGVzWzBdIDogZSwgYSA9IGcgJiYgeWUoZywgITApLCBsID0gZyAmJiBhICYmIGEuYSwgcyA9IGcgJiYgYSAmJiBhLmQsIHUgPSBGZSAmJiBCICYmIEF0KEIpLCBkID0gKGkuY2xpZW50WCAtIGRlLmNsaWVudFggKyByLngpIC8gKGwgfHwgMSkgKyAodSA/IHVbMF0gLSBldFswXSA6IDApIC8gKGwgfHwgMSksIGYgPSAoaS5jbGllbnRZIC0gZGUuY2xpZW50WSArIHIueSkgLyAocyB8fCAxKSArICh1ID8gdVsxXSAtIGV0WzFdIDogMCkgLyAocyB8fCAxKTtcbiAgICAgIGlmICghcC5hY3RpdmUgJiYgIXZlKSB7XG4gICAgICAgIGlmIChvICYmIE1hdGgubWF4KE1hdGguYWJzKGkuY2xpZW50WCAtIHRoaXMuX2xhc3RYKSwgTWF0aC5hYnMoaS5jbGllbnRZIC0gdGhpcy5fbGFzdFkpKSA8IG8pXG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB0aGlzLl9vbkRyYWdTdGFydChlLCAhMCk7XG4gICAgICB9XG4gICAgICBpZiAoZykge1xuICAgICAgICBhID8gKGEuZSArPSBkIC0gKFplIHx8IDApLCBhLmYgKz0gZiAtIChRZSB8fCAwKSkgOiBhID0ge1xuICAgICAgICAgIGE6IDEsXG4gICAgICAgICAgYjogMCxcbiAgICAgICAgICBjOiAwLFxuICAgICAgICAgIGQ6IDEsXG4gICAgICAgICAgZTogZCxcbiAgICAgICAgICBmXG4gICAgICAgIH07XG4gICAgICAgIHZhciBtID0gXCJtYXRyaXgoXCIuY29uY2F0KGEuYSwgXCIsXCIpLmNvbmNhdChhLmIsIFwiLFwiKS5jb25jYXQoYS5jLCBcIixcIikuY29uY2F0KGEuZCwgXCIsXCIpLmNvbmNhdChhLmUsIFwiLFwiKS5jb25jYXQoYS5mLCBcIilcIik7XG4gICAgICAgIGgoZywgXCJ3ZWJraXRUcmFuc2Zvcm1cIiwgbSksIGgoZywgXCJtb3pUcmFuc2Zvcm1cIiwgbSksIGgoZywgXCJtc1RyYW5zZm9ybVwiLCBtKSwgaChnLCBcInRyYW5zZm9ybVwiLCBtKSwgWmUgPSBkLCBRZSA9IGYsIEogPSBpO1xuICAgICAgfVxuICAgICAgZS5jYW5jZWxhYmxlICYmIGUucHJldmVudERlZmF1bHQoKTtcbiAgICB9XG4gIH0sXG4gIF9hcHBlbmRHaG9zdDogZnVuY3Rpb24oKSB7XG4gICAgaWYgKCFnKSB7XG4gICAgICB2YXIgZSA9IHRoaXMub3B0aW9ucy5mYWxsYmFja09uQm9keSA/IGRvY3VtZW50LmJvZHkgOiBDLCBuID0gTShjLCAhMCwgRmUsICEwLCBlKSwgbyA9IHRoaXMub3B0aW9ucztcbiAgICAgIGlmIChGZSkge1xuICAgICAgICBmb3IgKEIgPSBlOyBoKEIsIFwicG9zaXRpb25cIikgPT09IFwic3RhdGljXCIgJiYgaChCLCBcInRyYW5zZm9ybVwiKSA9PT0gXCJub25lXCIgJiYgQiAhPT0gZG9jdW1lbnQ7IClcbiAgICAgICAgICBCID0gQi5wYXJlbnROb2RlO1xuICAgICAgICBCICE9PSBkb2N1bWVudC5ib2R5ICYmIEIgIT09IGRvY3VtZW50LmRvY3VtZW50RWxlbWVudCA/IChCID09PSBkb2N1bWVudCAmJiAoQiA9IGVlKCkpLCBuLnRvcCArPSBCLnNjcm9sbFRvcCwgbi5sZWZ0ICs9IEIuc2Nyb2xsTGVmdCkgOiBCID0gZWUoKSwgZXQgPSBBdChCKTtcbiAgICAgIH1cbiAgICAgIGcgPSBjLmNsb25lTm9kZSghMCksIFYoZywgby5naG9zdENsYXNzLCAhMSksIFYoZywgby5mYWxsYmFja0NsYXNzLCAhMCksIFYoZywgby5kcmFnQ2xhc3MsICEwKSwgaChnLCBcInRyYW5zaXRpb25cIiwgXCJcIiksIGgoZywgXCJ0cmFuc2Zvcm1cIiwgXCJcIiksIGgoZywgXCJib3gtc2l6aW5nXCIsIFwiYm9yZGVyLWJveFwiKSwgaChnLCBcIm1hcmdpblwiLCAwKSwgaChnLCBcInRvcFwiLCBuLnRvcCksIGgoZywgXCJsZWZ0XCIsIG4ubGVmdCksIGgoZywgXCJ3aWR0aFwiLCBuLndpZHRoKSwgaChnLCBcImhlaWdodFwiLCBuLmhlaWdodCksIGgoZywgXCJvcGFjaXR5XCIsIFwiMC44XCIpLCBoKGcsIFwicG9zaXRpb25cIiwgRmUgPyBcImFic29sdXRlXCIgOiBcImZpeGVkXCIpLCBoKGcsIFwiekluZGV4XCIsIFwiMTAwMDAwXCIpLCBoKGcsIFwicG9pbnRlckV2ZW50c1wiLCBcIm5vbmVcIiksIHAuZ2hvc3QgPSBnLCBlLmFwcGVuZENoaWxkKGcpLCBoKGcsIFwidHJhbnNmb3JtLW9yaWdpblwiLCB4dCAvIHBhcnNlSW50KGcuc3R5bGUud2lkdGgpICogMTAwICsgXCIlIFwiICsgTnQgLyBwYXJzZUludChnLnN0eWxlLmhlaWdodCkgKiAxMDAgKyBcIiVcIik7XG4gICAgfVxuICB9LFxuICBfb25EcmFnU3RhcnQ6IGZ1bmN0aW9uKGUsIG4pIHtcbiAgICB2YXIgbyA9IHRoaXMsIHIgPSBlLmRhdGFUcmFuc2ZlciwgaSA9IG8ub3B0aW9ucztcbiAgICBpZiAoRyhcImRyYWdTdGFydFwiLCB0aGlzLCB7XG4gICAgICBldnQ6IGVcbiAgICB9KSwgcC5ldmVudENhbmNlbGVkKSB7XG4gICAgICB0aGlzLl9vbkRyb3AoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgRyhcInNldHVwQ2xvbmVcIiwgdGhpcyksIHAuZXZlbnRDYW5jZWxlZCB8fCAoTyA9IHp0KGMpLCBPLnJlbW92ZUF0dHJpYnV0ZShcImlkXCIpLCBPLmRyYWdnYWJsZSA9ICExLCBPLnN0eWxlW1wid2lsbC1jaGFuZ2VcIl0gPSBcIlwiLCB0aGlzLl9oaWRlQ2xvbmUoKSwgVihPLCB0aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsICExKSwgcC5jbG9uZSA9IE8pLCBvLmNsb25lSWQgPSBrZShmdW5jdGlvbigpIHtcbiAgICAgIEcoXCJjbG9uZVwiLCBvKSwgIXAuZXZlbnRDYW5jZWxlZCAmJiAoby5vcHRpb25zLnJlbW92ZUNsb25lT25IaWRlIHx8IEMuaW5zZXJ0QmVmb3JlKE8sIGMpLCBvLl9oaWRlQ2xvbmUoKSwgVyh7XG4gICAgICAgIHNvcnRhYmxlOiBvLFxuICAgICAgICBuYW1lOiBcImNsb25lXCJcbiAgICAgIH0pKTtcbiAgICB9KSwgIW4gJiYgVihjLCBpLmRyYWdDbGFzcywgITApLCBuID8gKFdlID0gITAsIG8uX2xvb3BJZCA9IHNldEludGVydmFsKG8uX2VtdWxhdGVEcmFnT3ZlciwgNTApKSA6IChTKGRvY3VtZW50LCBcIm1vdXNldXBcIiwgby5fb25Ecm9wKSwgUyhkb2N1bWVudCwgXCJ0b3VjaGVuZFwiLCBvLl9vbkRyb3ApLCBTKGRvY3VtZW50LCBcInRvdWNoY2FuY2VsXCIsIG8uX29uRHJvcCksIHIgJiYgKHIuZWZmZWN0QWxsb3dlZCA9IFwibW92ZVwiLCBpLnNldERhdGEgJiYgaS5zZXREYXRhLmNhbGwobywgciwgYykpLCBEKGRvY3VtZW50LCBcImRyb3BcIiwgbyksIGgoYywgXCJ0cmFuc2Zvcm1cIiwgXCJ0cmFuc2xhdGVaKDApXCIpKSwgdmUgPSAhMCwgby5fZHJhZ1N0YXJ0SWQgPSBrZShvLl9kcmFnU3RhcnRlZC5iaW5kKG8sIG4sIGUpKSwgRChkb2N1bWVudCwgXCJzZWxlY3RzdGFydFwiLCBvKSwgRWUgPSAhMCwgX2UgJiYgaChkb2N1bWVudC5ib2R5LCBcInVzZXItc2VsZWN0XCIsIFwibm9uZVwiKTtcbiAgfSxcbiAgLy8gUmV0dXJucyB0cnVlIC0gaWYgbm8gZnVydGhlciBhY3Rpb24gaXMgbmVlZGVkIChlaXRoZXIgaW5zZXJ0ZWQgb3IgYW5vdGhlciBjb25kaXRpb24pXG4gIF9vbkRyYWdPdmVyOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIG4gPSB0aGlzLmVsLCBvID0gZS50YXJnZXQsIHIsIGksIGEsIGwgPSB0aGlzLm9wdGlvbnMsIHMgPSBsLmdyb3VwLCB1ID0gcC5hY3RpdmUsIGQgPSBQZSA9PT0gcywgZiA9IGwuc29ydCwgbSA9IFggfHwgdSwgeSwgYiA9IHRoaXMsIEUgPSAhMTtcbiAgICBpZiAoYXQpXG4gICAgICByZXR1cm47XG4gICAgZnVuY3Rpb24gayhjZSwgbm4pIHtcbiAgICAgIEcoY2UsIGIsIHRlKHtcbiAgICAgICAgZXZ0OiBlLFxuICAgICAgICBpc093bmVyOiBkLFxuICAgICAgICBheGlzOiB5ID8gXCJ2ZXJ0aWNhbFwiIDogXCJob3Jpem9udGFsXCIsXG4gICAgICAgIHJldmVydDogYSxcbiAgICAgICAgZHJhZ1JlY3Q6IHIsXG4gICAgICAgIHRhcmdldFJlY3Q6IGksXG4gICAgICAgIGNhblNvcnQ6IGYsXG4gICAgICAgIGZyb21Tb3J0YWJsZTogbSxcbiAgICAgICAgdGFyZ2V0OiBvLFxuICAgICAgICBjb21wbGV0ZWQ6IEYsXG4gICAgICAgIG9uTW92ZTogZnVuY3Rpb24oZ3QsIG9uKSB7XG4gICAgICAgICAgcmV0dXJuIFJlKEMsIG4sIGMsIHIsIGd0LCBNKGd0KSwgZSwgb24pO1xuICAgICAgICB9LFxuICAgICAgICBjaGFuZ2VkOiBBXG4gICAgICB9LCBubikpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBIKCkge1xuICAgICAgayhcImRyYWdPdmVyQW5pbWF0aW9uQ2FwdHVyZVwiKSwgYi5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKSwgYiAhPT0gbSAmJiBtLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgIH1cbiAgICBmdW5jdGlvbiBGKGNlKSB7XG4gICAgICByZXR1cm4gayhcImRyYWdPdmVyQ29tcGxldGVkXCIsIHtcbiAgICAgICAgaW5zZXJ0aW9uOiBjZVxuICAgICAgfSksIGNlICYmIChkID8gdS5faGlkZUNsb25lKCkgOiB1Ll9zaG93Q2xvbmUoYiksIGIgIT09IG0gJiYgKFYoYywgWCA/IFgub3B0aW9ucy5naG9zdENsYXNzIDogdS5vcHRpb25zLmdob3N0Q2xhc3MsICExKSwgVihjLCBsLmdob3N0Q2xhc3MsICEwKSksIFggIT09IGIgJiYgYiAhPT0gcC5hY3RpdmUgPyBYID0gYiA6IGIgPT09IHAuYWN0aXZlICYmIFggJiYgKFggPSBudWxsKSwgbSA9PT0gYiAmJiAoYi5faWdub3JlV2hpbGVBbmltYXRpbmcgPSBvKSwgYi5hbmltYXRlQWxsKGZ1bmN0aW9uKCkge1xuICAgICAgICBrKFwiZHJhZ092ZXJBbmltYXRpb25Db21wbGV0ZVwiKSwgYi5faWdub3JlV2hpbGVBbmltYXRpbmcgPSBudWxsO1xuICAgICAgfSksIGIgIT09IG0gJiYgKG0uYW5pbWF0ZUFsbCgpLCBtLl9pZ25vcmVXaGlsZUFuaW1hdGluZyA9IG51bGwpKSwgKG8gPT09IGMgJiYgIWMuYW5pbWF0ZWQgfHwgbyA9PT0gbiAmJiAhby5hbmltYXRlZCkgJiYgKG1lID0gbnVsbCksICFsLmRyYWdvdmVyQnViYmxlICYmICFlLnJvb3RFbCAmJiBvICE9PSBkb2N1bWVudCAmJiAoYy5wYXJlbnROb2RlW3FdLl9pc091dHNpZGVUaGlzRWwoZS50YXJnZXQpLCAhY2UgJiYgaGUoZSkpLCAhbC5kcmFnb3ZlckJ1YmJsZSAmJiBlLnN0b3BQcm9wYWdhdGlvbiAmJiBlLnN0b3BQcm9wYWdhdGlvbigpLCBFID0gITA7XG4gICAgfVxuICAgIGZ1bmN0aW9uIEEoKSB7XG4gICAgICAkID0gSyhjKSwgbGUgPSBLKGMsIGwuZHJhZ2dhYmxlKSwgVyh7XG4gICAgICAgIHNvcnRhYmxlOiBiLFxuICAgICAgICBuYW1lOiBcImNoYW5nZVwiLFxuICAgICAgICB0b0VsOiBuLFxuICAgICAgICBuZXdJbmRleDogJCxcbiAgICAgICAgbmV3RHJhZ2dhYmxlSW5kZXg6IGxlLFxuICAgICAgICBvcmlnaW5hbEV2ZW50OiBlXG4gICAgICB9KTtcbiAgICB9XG4gICAgaWYgKGUucHJldmVudERlZmF1bHQgIT09IHZvaWQgMCAmJiBlLmNhbmNlbGFibGUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpLCBvID0gWihvLCBsLmRyYWdnYWJsZSwgbiwgITApLCBrKFwiZHJhZ092ZXJcIiksIHAuZXZlbnRDYW5jZWxlZClcbiAgICAgIHJldHVybiBFO1xuICAgIGlmIChjLmNvbnRhaW5zKGUudGFyZ2V0KSB8fCBvLmFuaW1hdGVkICYmIG8uYW5pbWF0aW5nWCAmJiBvLmFuaW1hdGluZ1kgfHwgYi5faWdub3JlV2hpbGVBbmltYXRpbmcgPT09IG8pXG4gICAgICByZXR1cm4gRighMSk7XG4gICAgaWYgKFdlID0gITEsIHUgJiYgIWwuZGlzYWJsZWQgJiYgKGQgPyBmIHx8IChhID0gSSAhPT0gQykgOiBYID09PSB0aGlzIHx8ICh0aGlzLmxhc3RQdXRNb2RlID0gUGUuY2hlY2tQdWxsKHRoaXMsIHUsIGMsIGUpKSAmJiBzLmNoZWNrUHV0KHRoaXMsIHUsIGMsIGUpKSkge1xuICAgICAgaWYgKHkgPSB0aGlzLl9nZXREaXJlY3Rpb24oZSwgbykgPT09IFwidmVydGljYWxcIiwgciA9IE0oYyksIGsoXCJkcmFnT3ZlclZhbGlkXCIpLCBwLmV2ZW50Q2FuY2VsZWQpXG4gICAgICAgIHJldHVybiBFO1xuICAgICAgaWYgKGEpXG4gICAgICAgIHJldHVybiBJID0gQywgSCgpLCB0aGlzLl9oaWRlQ2xvbmUoKSwgayhcInJldmVydFwiKSwgcC5ldmVudENhbmNlbGVkIHx8IChwZSA/IEMuaW5zZXJ0QmVmb3JlKGMsIHBlKSA6IEMuYXBwZW5kQ2hpbGQoYykpLCBGKCEwKTtcbiAgICAgIHZhciBMID0gZHQobiwgbC5kcmFnZ2FibGUpO1xuICAgICAgaWYgKCFMIHx8IFZuKGUsIHksIHRoaXMpICYmICFMLmFuaW1hdGVkKSB7XG4gICAgICAgIGlmIChMID09PSBjKVxuICAgICAgICAgIHJldHVybiBGKCExKTtcbiAgICAgICAgaWYgKEwgJiYgbiA9PT0gZS50YXJnZXQgJiYgKG8gPSBMKSwgbyAmJiAoaSA9IE0obykpLCBSZShDLCBuLCBjLCByLCBvLCBpLCBlLCAhIW8pICE9PSAhMSlcbiAgICAgICAgICByZXR1cm4gSCgpLCBMICYmIEwubmV4dFNpYmxpbmcgPyBuLmluc2VydEJlZm9yZShjLCBMLm5leHRTaWJsaW5nKSA6IG4uYXBwZW5kQ2hpbGQoYyksIEkgPSBuLCBBKCksIEYoITApO1xuICAgICAgfSBlbHNlIGlmIChMICYmIFVuKGUsIHksIHRoaXMpKSB7XG4gICAgICAgIHZhciBuZSA9IHdlKG4sIDAsIGwsICEwKTtcbiAgICAgICAgaWYgKG5lID09PSBjKVxuICAgICAgICAgIHJldHVybiBGKCExKTtcbiAgICAgICAgaWYgKG8gPSBuZSwgaSA9IE0obyksIFJlKEMsIG4sIGMsIHIsIG8sIGksIGUsICExKSAhPT0gITEpXG4gICAgICAgICAgcmV0dXJuIEgoKSwgbi5pbnNlcnRCZWZvcmUoYywgbmUpLCBJID0gbiwgQSgpLCBGKCEwKTtcbiAgICAgIH0gZWxzZSBpZiAoby5wYXJlbnROb2RlID09PSBuKSB7XG4gICAgICAgIGkgPSBNKG8pO1xuICAgICAgICB2YXIgaiA9IDAsIFEsIHYgPSBjLnBhcmVudE5vZGUgIT09IG4sIHcgPSAhTG4oYy5hbmltYXRlZCAmJiBjLnRvUmVjdCB8fCByLCBvLmFuaW1hdGVkICYmIG8udG9SZWN0IHx8IGksIHkpLCB4ID0geSA/IFwidG9wXCIgOiBcImxlZnRcIiwgTiA9IEl0KG8sIFwidG9wXCIsIFwidG9wXCIpIHx8IEl0KGMsIFwidG9wXCIsIFwidG9wXCIpLCBfID0gTiA/IE4uc2Nyb2xsVG9wIDogdm9pZCAwO1xuICAgICAgICBtZSAhPT0gbyAmJiAoUSA9IGlbeF0sIEllID0gITEsIE1lID0gIXcgJiYgbC5pbnZlcnRTd2FwIHx8IHYpLCBqID0gJG4oZSwgbywgaSwgeSwgdyA/IDEgOiBsLnN3YXBUaHJlc2hvbGQsIGwuaW52ZXJ0ZWRTd2FwVGhyZXNob2xkID09IG51bGwgPyBsLnN3YXBUaHJlc2hvbGQgOiBsLmludmVydGVkU3dhcFRocmVzaG9sZCwgTWUsIG1lID09PSBvKTtcbiAgICAgICAgdmFyIFQ7XG4gICAgICAgIGlmIChqICE9PSAwKSB7XG4gICAgICAgICAgdmFyIFIgPSBLKGMpO1xuICAgICAgICAgIGRvXG4gICAgICAgICAgICBSIC09IGosIFQgPSBJLmNoaWxkcmVuW1JdO1xuICAgICAgICAgIHdoaWxlIChUICYmIChoKFQsIFwiZGlzcGxheVwiKSA9PT0gXCJub25lXCIgfHwgVCA9PT0gZykpO1xuICAgICAgICB9XG4gICAgICAgIGlmIChqID09PSAwIHx8IFQgPT09IG8pXG4gICAgICAgICAgcmV0dXJuIEYoITEpO1xuICAgICAgICBtZSA9IG8sIE9lID0gajtcbiAgICAgICAgdmFyIFkgPSBvLm5leHRFbGVtZW50U2libGluZywgeiA9ICExO1xuICAgICAgICB6ID0gaiA9PT0gMTtcbiAgICAgICAgdmFyIGFlID0gUmUoQywgbiwgYywgciwgbywgaSwgZSwgeik7XG4gICAgICAgIGlmIChhZSAhPT0gITEpXG4gICAgICAgICAgcmV0dXJuIChhZSA9PT0gMSB8fCBhZSA9PT0gLTEpICYmICh6ID0gYWUgPT09IDEpLCBhdCA9ICEwLCBzZXRUaW1lb3V0KHpuLCAzMCksIEgoKSwgeiAmJiAhWSA/IG4uYXBwZW5kQ2hpbGQoYykgOiBvLnBhcmVudE5vZGUuaW5zZXJ0QmVmb3JlKGMsIHogPyBZIDogbyksIE4gJiYganQoTiwgMCwgXyAtIE4uc2Nyb2xsVG9wKSwgSSA9IGMucGFyZW50Tm9kZSwgUSAhPT0gdm9pZCAwICYmICFNZSAmJiAoQmUgPSBNYXRoLmFicyhRIC0gTShvKVt4XSkpLCBBKCksIEYoITApO1xuICAgICAgfVxuICAgICAgaWYgKG4uY29udGFpbnMoYykpXG4gICAgICAgIHJldHVybiBGKCExKTtcbiAgICB9XG4gICAgcmV0dXJuICExO1xuICB9LFxuICBfaWdub3JlV2hpbGVBbmltYXRpbmc6IG51bGwsXG4gIF9vZmZNb3ZlRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICBTKGRvY3VtZW50LCBcIm1vdXNlbW92ZVwiLCB0aGlzLl9vblRvdWNoTW92ZSksIFMoZG9jdW1lbnQsIFwidG91Y2htb3ZlXCIsIHRoaXMuX29uVG91Y2hNb3ZlKSwgUyhkb2N1bWVudCwgXCJwb2ludGVybW92ZVwiLCB0aGlzLl9vblRvdWNoTW92ZSksIFMoZG9jdW1lbnQsIFwiZHJhZ292ZXJcIiwgaGUpLCBTKGRvY3VtZW50LCBcIm1vdXNlbW92ZVwiLCBoZSksIFMoZG9jdW1lbnQsIFwidG91Y2htb3ZlXCIsIGhlKTtcbiAgfSxcbiAgX29mZlVwRXZlbnRzOiBmdW5jdGlvbigpIHtcbiAgICB2YXIgZSA9IHRoaXMuZWwub3duZXJEb2N1bWVudDtcbiAgICBTKGUsIFwibW91c2V1cFwiLCB0aGlzLl9vbkRyb3ApLCBTKGUsIFwidG91Y2hlbmRcIiwgdGhpcy5fb25Ecm9wKSwgUyhlLCBcInBvaW50ZXJ1cFwiLCB0aGlzLl9vbkRyb3ApLCBTKGUsIFwidG91Y2hjYW5jZWxcIiwgdGhpcy5fb25Ecm9wKSwgUyhkb2N1bWVudCwgXCJzZWxlY3RzdGFydFwiLCB0aGlzKTtcbiAgfSxcbiAgX29uRHJvcDogZnVuY3Rpb24oZSkge1xuICAgIHZhciBuID0gdGhpcy5lbCwgbyA9IHRoaXMub3B0aW9ucztcbiAgICBpZiAoJCA9IEsoYyksIGxlID0gSyhjLCBvLmRyYWdnYWJsZSksIEcoXCJkcm9wXCIsIHRoaXMsIHtcbiAgICAgIGV2dDogZVxuICAgIH0pLCBJID0gYyAmJiBjLnBhcmVudE5vZGUsICQgPSBLKGMpLCBsZSA9IEsoYywgby5kcmFnZ2FibGUpLCBwLmV2ZW50Q2FuY2VsZWQpIHtcbiAgICAgIHRoaXMuX251bGxpbmcoKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgdmUgPSAhMSwgTWUgPSAhMSwgSWUgPSAhMSwgY2xlYXJJbnRlcnZhbCh0aGlzLl9sb29wSWQpLCBjbGVhclRpbWVvdXQodGhpcy5fZHJhZ1N0YXJ0VGltZXIpLCBsdCh0aGlzLmNsb25lSWQpLCBsdCh0aGlzLl9kcmFnU3RhcnRJZCksIHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIChTKGRvY3VtZW50LCBcImRyb3BcIiwgdGhpcyksIFMobiwgXCJkcmFnc3RhcnRcIiwgdGhpcy5fb25EcmFnU3RhcnQpKSwgdGhpcy5fb2ZmTW92ZUV2ZW50cygpLCB0aGlzLl9vZmZVcEV2ZW50cygpLCBfZSAmJiBoKGRvY3VtZW50LmJvZHksIFwidXNlci1zZWxlY3RcIiwgXCJcIiksIGgoYywgXCJ0cmFuc2Zvcm1cIiwgXCJcIiksIGUgJiYgKEVlICYmIChlLmNhbmNlbGFibGUgJiYgZS5wcmV2ZW50RGVmYXVsdCgpLCAhby5kcm9wQnViYmxlICYmIGUuc3RvcFByb3BhZ2F0aW9uKCkpLCBnICYmIGcucGFyZW50Tm9kZSAmJiBnLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoZyksIChDID09PSBJIHx8IFggJiYgWC5sYXN0UHV0TW9kZSAhPT0gXCJjbG9uZVwiKSAmJiBPICYmIE8ucGFyZW50Tm9kZSAmJiBPLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoTyksIGMgJiYgKHRoaXMubmF0aXZlRHJhZ2dhYmxlICYmIFMoYywgXCJkcmFnZW5kXCIsIHRoaXMpLCB0dChjKSwgYy5zdHlsZVtcIndpbGwtY2hhbmdlXCJdID0gXCJcIiwgRWUgJiYgIXZlICYmIFYoYywgWCA/IFgub3B0aW9ucy5naG9zdENsYXNzIDogdGhpcy5vcHRpb25zLmdob3N0Q2xhc3MsICExKSwgVihjLCB0aGlzLm9wdGlvbnMuY2hvc2VuQ2xhc3MsICExKSwgVyh7XG4gICAgICBzb3J0YWJsZTogdGhpcyxcbiAgICAgIG5hbWU6IFwidW5jaG9vc2VcIixcbiAgICAgIHRvRWw6IEksXG4gICAgICBuZXdJbmRleDogbnVsbCxcbiAgICAgIG5ld0RyYWdnYWJsZUluZGV4OiBudWxsLFxuICAgICAgb3JpZ2luYWxFdmVudDogZVxuICAgIH0pLCBDICE9PSBJID8gKCQgPj0gMCAmJiAoVyh7XG4gICAgICByb290RWw6IEksXG4gICAgICBuYW1lOiBcImFkZFwiLFxuICAgICAgdG9FbDogSSxcbiAgICAgIGZyb21FbDogQyxcbiAgICAgIG9yaWdpbmFsRXZlbnQ6IGVcbiAgICB9KSwgVyh7XG4gICAgICBzb3J0YWJsZTogdGhpcyxcbiAgICAgIG5hbWU6IFwicmVtb3ZlXCIsXG4gICAgICB0b0VsOiBJLFxuICAgICAgb3JpZ2luYWxFdmVudDogZVxuICAgIH0pLCBXKHtcbiAgICAgIHJvb3RFbDogSSxcbiAgICAgIG5hbWU6IFwic29ydFwiLFxuICAgICAgdG9FbDogSSxcbiAgICAgIGZyb21FbDogQyxcbiAgICAgIG9yaWdpbmFsRXZlbnQ6IGVcbiAgICB9KSwgVyh7XG4gICAgICBzb3J0YWJsZTogdGhpcyxcbiAgICAgIG5hbWU6IFwic29ydFwiLFxuICAgICAgdG9FbDogSSxcbiAgICAgIG9yaWdpbmFsRXZlbnQ6IGVcbiAgICB9KSksIFggJiYgWC5zYXZlKCkpIDogJCAhPT0gYmUgJiYgJCA+PSAwICYmIChXKHtcbiAgICAgIHNvcnRhYmxlOiB0aGlzLFxuICAgICAgbmFtZTogXCJ1cGRhdGVcIixcbiAgICAgIHRvRWw6IEksXG4gICAgICBvcmlnaW5hbEV2ZW50OiBlXG4gICAgfSksIFcoe1xuICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICBuYW1lOiBcInNvcnRcIixcbiAgICAgIHRvRWw6IEksXG4gICAgICBvcmlnaW5hbEV2ZW50OiBlXG4gICAgfSkpLCBwLmFjdGl2ZSAmJiAoKCQgPT0gbnVsbCB8fCAkID09PSAtMSkgJiYgKCQgPSBiZSwgbGUgPSBDZSksIFcoe1xuICAgICAgc29ydGFibGU6IHRoaXMsXG4gICAgICBuYW1lOiBcImVuZFwiLFxuICAgICAgdG9FbDogSSxcbiAgICAgIG9yaWdpbmFsRXZlbnQ6IGVcbiAgICB9KSwgdGhpcy5zYXZlKCkpKSksIHRoaXMuX251bGxpbmcoKTtcbiAgfSxcbiAgX251bGxpbmc6IGZ1bmN0aW9uKCkge1xuICAgIEcoXCJudWxsaW5nXCIsIHRoaXMpLCBDID0gYyA9IEkgPSBnID0gcGUgPSBPID0gWWUgPSBzZSA9IGRlID0gSiA9IEVlID0gJCA9IGxlID0gYmUgPSBDZSA9IG1lID0gT2UgPSBYID0gUGUgPSBwLmRyYWdnZWQgPSBwLmdob3N0ID0gcC5jbG9uZSA9IHAuYWN0aXZlID0gbnVsbCwgamUuZm9yRWFjaChmdW5jdGlvbihlKSB7XG4gICAgICBlLmNoZWNrZWQgPSAhMDtcbiAgICB9KSwgamUubGVuZ3RoID0gWmUgPSBRZSA9IDA7XG4gIH0sXG4gIGhhbmRsZUV2ZW50OiBmdW5jdGlvbihlKSB7XG4gICAgc3dpdGNoIChlLnR5cGUpIHtcbiAgICAgIGNhc2UgXCJkcm9wXCI6XG4gICAgICBjYXNlIFwiZHJhZ2VuZFwiOlxuICAgICAgICB0aGlzLl9vbkRyb3AoZSk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBcImRyYWdlbnRlclwiOlxuICAgICAgY2FzZSBcImRyYWdvdmVyXCI6XG4gICAgICAgIGMgJiYgKHRoaXMuX29uRHJhZ092ZXIoZSksIGpuKGUpKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIFwic2VsZWN0c3RhcnRcIjpcbiAgICAgICAgZS5wcmV2ZW50RGVmYXVsdCgpO1xuICAgICAgICBicmVhaztcbiAgICB9XG4gIH0sXG4gIC8qKlxuICAgKiBTZXJpYWxpemVzIHRoZSBpdGVtIGludG8gYW4gYXJyYXkgb2Ygc3RyaW5nLlxuICAgKiBAcmV0dXJucyB7U3RyaW5nW119XG4gICAqL1xuICB0b0FycmF5OiBmdW5jdGlvbigpIHtcbiAgICBmb3IgKHZhciBlID0gW10sIG4sIG8gPSB0aGlzLmVsLmNoaWxkcmVuLCByID0gMCwgaSA9IG8ubGVuZ3RoLCBhID0gdGhpcy5vcHRpb25zOyByIDwgaTsgcisrKVxuICAgICAgbiA9IG9bcl0sIFoobiwgYS5kcmFnZ2FibGUsIHRoaXMuZWwsICExKSAmJiBlLnB1c2gobi5nZXRBdHRyaWJ1dGUoYS5kYXRhSWRBdHRyKSB8fCBLbihuKSk7XG4gICAgcmV0dXJuIGU7XG4gIH0sXG4gIC8qKlxuICAgKiBTb3J0cyB0aGUgZWxlbWVudHMgYWNjb3JkaW5nIHRvIHRoZSBhcnJheS5cbiAgICogQHBhcmFtICB7U3RyaW5nW119ICBvcmRlciAgb3JkZXIgb2YgdGhlIGl0ZW1zXG4gICAqL1xuICBzb3J0OiBmdW5jdGlvbihlLCBuKSB7XG4gICAgdmFyIG8gPSB7fSwgciA9IHRoaXMuZWw7XG4gICAgdGhpcy50b0FycmF5KCkuZm9yRWFjaChmdW5jdGlvbihpLCBhKSB7XG4gICAgICB2YXIgbCA9IHIuY2hpbGRyZW5bYV07XG4gICAgICBaKGwsIHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHIsICExKSAmJiAob1tpXSA9IGwpO1xuICAgIH0sIHRoaXMpLCBuICYmIHRoaXMuY2FwdHVyZUFuaW1hdGlvblN0YXRlKCksIGUuZm9yRWFjaChmdW5jdGlvbihpKSB7XG4gICAgICBvW2ldICYmIChyLnJlbW92ZUNoaWxkKG9baV0pLCByLmFwcGVuZENoaWxkKG9baV0pKTtcbiAgICB9KSwgbiAmJiB0aGlzLmFuaW1hdGVBbGwoKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNhdmUgdGhlIGN1cnJlbnQgc29ydGluZ1xuICAgKi9cbiAgc2F2ZTogZnVuY3Rpb24oKSB7XG4gICAgdmFyIGUgPSB0aGlzLm9wdGlvbnMuc3RvcmU7XG4gICAgZSAmJiBlLnNldCAmJiBlLnNldCh0aGlzKTtcbiAgfSxcbiAgLyoqXG4gICAqIEZvciBlYWNoIGVsZW1lbnQgaW4gdGhlIHNldCwgZ2V0IHRoZSBmaXJzdCBlbGVtZW50IHRoYXQgbWF0Y2hlcyB0aGUgc2VsZWN0b3IgYnkgdGVzdGluZyB0aGUgZWxlbWVudCBpdHNlbGYgYW5kIHRyYXZlcnNpbmcgdXAgdGhyb3VnaCBpdHMgYW5jZXN0b3JzIGluIHRoZSBET00gdHJlZS5cbiAgICogQHBhcmFtICAge0hUTUxFbGVtZW50fSAgZWxcbiAgICogQHBhcmFtICAge1N0cmluZ30gICAgICAgW3NlbGVjdG9yXSAgZGVmYXVsdDogYG9wdGlvbnMuZHJhZ2dhYmxlYFxuICAgKiBAcmV0dXJucyB7SFRNTEVsZW1lbnR8bnVsbH1cbiAgICovXG4gIGNsb3Nlc3Q6IGZ1bmN0aW9uKGUsIG4pIHtcbiAgICByZXR1cm4gWihlLCBuIHx8IHRoaXMub3B0aW9ucy5kcmFnZ2FibGUsIHRoaXMuZWwsICExKTtcbiAgfSxcbiAgLyoqXG4gICAqIFNldC9nZXQgb3B0aW9uXG4gICAqIEBwYXJhbSAgIHtzdHJpbmd9IG5hbWVcbiAgICogQHBhcmFtICAgeyp9ICAgICAgW3ZhbHVlXVxuICAgKiBAcmV0dXJucyB7Kn1cbiAgICovXG4gIG9wdGlvbjogZnVuY3Rpb24oZSwgbikge1xuICAgIHZhciBvID0gdGhpcy5vcHRpb25zO1xuICAgIGlmIChuID09PSB2b2lkIDApXG4gICAgICByZXR1cm4gb1tlXTtcbiAgICB2YXIgciA9IHhlLm1vZGlmeU9wdGlvbih0aGlzLCBlLCBuKTtcbiAgICB0eXBlb2YgciAhPSBcInVuZGVmaW5lZFwiID8gb1tlXSA9IHIgOiBvW2VdID0gbiwgZSA9PT0gXCJncm91cFwiICYmIHF0KG8pO1xuICB9LFxuICAvKipcbiAgICogRGVzdHJveVxuICAgKi9cbiAgZGVzdHJveTogZnVuY3Rpb24oKSB7XG4gICAgRyhcImRlc3Ryb3lcIiwgdGhpcyk7XG4gICAgdmFyIGUgPSB0aGlzLmVsO1xuICAgIGVbcV0gPSBudWxsLCBTKGUsIFwibW91c2Vkb3duXCIsIHRoaXMuX29uVGFwU3RhcnQpLCBTKGUsIFwidG91Y2hzdGFydFwiLCB0aGlzLl9vblRhcFN0YXJ0KSwgUyhlLCBcInBvaW50ZXJkb3duXCIsIHRoaXMuX29uVGFwU3RhcnQpLCB0aGlzLm5hdGl2ZURyYWdnYWJsZSAmJiAoUyhlLCBcImRyYWdvdmVyXCIsIHRoaXMpLCBTKGUsIFwiZHJhZ2VudGVyXCIsIHRoaXMpKSwgQXJyYXkucHJvdG90eXBlLmZvckVhY2guY2FsbChlLnF1ZXJ5U2VsZWN0b3JBbGwoXCJbZHJhZ2dhYmxlXVwiKSwgZnVuY3Rpb24obikge1xuICAgICAgbi5yZW1vdmVBdHRyaWJ1dGUoXCJkcmFnZ2FibGVcIik7XG4gICAgfSksIHRoaXMuX29uRHJvcCgpLCB0aGlzLl9kaXNhYmxlRGVsYXllZERyYWdFdmVudHMoKSwgR2Uuc3BsaWNlKEdlLmluZGV4T2YodGhpcy5lbCksIDEpLCB0aGlzLmVsID0gZSA9IG51bGw7XG4gIH0sXG4gIF9oaWRlQ2xvbmU6IGZ1bmN0aW9uKCkge1xuICAgIGlmICghc2UpIHtcbiAgICAgIGlmIChHKFwiaGlkZUNsb25lXCIsIHRoaXMpLCBwLmV2ZW50Q2FuY2VsZWQpXG4gICAgICAgIHJldHVybjtcbiAgICAgIGgoTywgXCJkaXNwbGF5XCIsIFwibm9uZVwiKSwgdGhpcy5vcHRpb25zLnJlbW92ZUNsb25lT25IaWRlICYmIE8ucGFyZW50Tm9kZSAmJiBPLnBhcmVudE5vZGUucmVtb3ZlQ2hpbGQoTyksIHNlID0gITA7XG4gICAgfVxuICB9LFxuICBfc2hvd0Nsb25lOiBmdW5jdGlvbihlKSB7XG4gICAgaWYgKGUubGFzdFB1dE1vZGUgIT09IFwiY2xvbmVcIikge1xuICAgICAgdGhpcy5faGlkZUNsb25lKCk7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmIChzZSkge1xuICAgICAgaWYgKEcoXCJzaG93Q2xvbmVcIiwgdGhpcyksIHAuZXZlbnRDYW5jZWxlZClcbiAgICAgICAgcmV0dXJuO1xuICAgICAgYy5wYXJlbnROb2RlID09IEMgJiYgIXRoaXMub3B0aW9ucy5ncm91cC5yZXZlcnRDbG9uZSA/IEMuaW5zZXJ0QmVmb3JlKE8sIGMpIDogcGUgPyBDLmluc2VydEJlZm9yZShPLCBwZSkgOiBDLmFwcGVuZENoaWxkKE8pLCB0aGlzLm9wdGlvbnMuZ3JvdXAucmV2ZXJ0Q2xvbmUgJiYgdGhpcy5hbmltYXRlKGMsIE8pLCBoKE8sIFwiZGlzcGxheVwiLCBcIlwiKSwgc2UgPSAhMTtcbiAgICB9XG4gIH1cbn07XG5mdW5jdGlvbiBqbih0KSB7XG4gIHQuZGF0YVRyYW5zZmVyICYmICh0LmRhdGFUcmFuc2Zlci5kcm9wRWZmZWN0ID0gXCJtb3ZlXCIpLCB0LmNhbmNlbGFibGUgJiYgdC5wcmV2ZW50RGVmYXVsdCgpO1xufVxuZnVuY3Rpb24gUmUodCwgZSwgbiwgbywgciwgaSwgYSwgbCkge1xuICB2YXIgcywgdSA9IHRbcV0sIGQgPSB1Lm9wdGlvbnMub25Nb3ZlLCBmO1xuICByZXR1cm4gd2luZG93LkN1c3RvbUV2ZW50ICYmICFpZSAmJiAhQWUgPyBzID0gbmV3IEN1c3RvbUV2ZW50KFwibW92ZVwiLCB7XG4gICAgYnViYmxlczogITAsXG4gICAgY2FuY2VsYWJsZTogITBcbiAgfSkgOiAocyA9IGRvY3VtZW50LmNyZWF0ZUV2ZW50KFwiRXZlbnRcIiksIHMuaW5pdEV2ZW50KFwibW92ZVwiLCAhMCwgITApKSwgcy50byA9IGUsIHMuZnJvbSA9IHQsIHMuZHJhZ2dlZCA9IG4sIHMuZHJhZ2dlZFJlY3QgPSBvLCBzLnJlbGF0ZWQgPSByIHx8IGUsIHMucmVsYXRlZFJlY3QgPSBpIHx8IE0oZSksIHMud2lsbEluc2VydEFmdGVyID0gbCwgcy5vcmlnaW5hbEV2ZW50ID0gYSwgdC5kaXNwYXRjaEV2ZW50KHMpLCBkICYmIChmID0gZC5jYWxsKHUsIHMsIGEpKSwgZjtcbn1cbmZ1bmN0aW9uIHR0KHQpIHtcbiAgdC5kcmFnZ2FibGUgPSAhMTtcbn1cbmZ1bmN0aW9uIHpuKCkge1xuICBhdCA9ICExO1xufVxuZnVuY3Rpb24gVW4odCwgZSwgbikge1xuICB2YXIgbyA9IE0od2Uobi5lbCwgMCwgbi5vcHRpb25zLCAhMCkpLCByID0gVXQobi5lbCwgbi5vcHRpb25zLCBnKSwgaSA9IDEwO1xuICByZXR1cm4gZSA/IHQuY2xpZW50WCA8IHIubGVmdCAtIGkgfHwgdC5jbGllbnRZIDwgby50b3AgJiYgdC5jbGllbnRYIDwgby5yaWdodCA6IHQuY2xpZW50WSA8IHIudG9wIC0gaSB8fCB0LmNsaWVudFkgPCBvLmJvdHRvbSAmJiB0LmNsaWVudFggPCBvLmxlZnQ7XG59XG5mdW5jdGlvbiBWbih0LCBlLCBuKSB7XG4gIHZhciBvID0gTShkdChuLmVsLCBuLm9wdGlvbnMuZHJhZ2dhYmxlKSksIHIgPSBVdChuLmVsLCBuLm9wdGlvbnMsIGcpLCBpID0gMTA7XG4gIHJldHVybiBlID8gdC5jbGllbnRYID4gci5yaWdodCArIGkgfHwgdC5jbGllbnRZID4gby5ib3R0b20gJiYgdC5jbGllbnRYID4gby5sZWZ0IDogdC5jbGllbnRZID4gci5ib3R0b20gKyBpIHx8IHQuY2xpZW50WCA+IG8ucmlnaHQgJiYgdC5jbGllbnRZID4gby50b3A7XG59XG5mdW5jdGlvbiAkbih0LCBlLCBuLCBvLCByLCBpLCBhLCBsKSB7XG4gIHZhciBzID0gbyA/IHQuY2xpZW50WSA6IHQuY2xpZW50WCwgdSA9IG8gPyBuLmhlaWdodCA6IG4ud2lkdGgsIGQgPSBvID8gbi50b3AgOiBuLmxlZnQsIGYgPSBvID8gbi5ib3R0b20gOiBuLnJpZ2h0LCBtID0gITE7XG4gIGlmICghYSkge1xuICAgIGlmIChsICYmIEJlIDwgdSAqIHIpIHtcbiAgICAgIGlmICghSWUgJiYgKE9lID09PSAxID8gcyA+IGQgKyB1ICogaSAvIDIgOiBzIDwgZiAtIHUgKiBpIC8gMikgJiYgKEllID0gITApLCBJZSlcbiAgICAgICAgbSA9ICEwO1xuICAgICAgZWxzZSBpZiAoT2UgPT09IDEgPyBzIDwgZCArIEJlIDogcyA+IGYgLSBCZSlcbiAgICAgICAgcmV0dXJuIC1PZTtcbiAgICB9IGVsc2UgaWYgKHMgPiBkICsgdSAqICgxIC0gcikgLyAyICYmIHMgPCBmIC0gdSAqICgxIC0gcikgLyAyKVxuICAgICAgcmV0dXJuIHFuKGUpO1xuICB9XG4gIHJldHVybiBtID0gbSB8fCBhLCBtICYmIChzIDwgZCArIHUgKiBpIC8gMiB8fCBzID4gZiAtIHUgKiBpIC8gMikgPyBzID4gZCArIHUgLyAyID8gMSA6IC0xIDogMDtcbn1cbmZ1bmN0aW9uIHFuKHQpIHtcbiAgcmV0dXJuIEsoYykgPCBLKHQpID8gMSA6IC0xO1xufVxuZnVuY3Rpb24gS24odCkge1xuICBmb3IgKHZhciBlID0gdC50YWdOYW1lICsgdC5jbGFzc05hbWUgKyB0LnNyYyArIHQuaHJlZiArIHQudGV4dENvbnRlbnQsIG4gPSBlLmxlbmd0aCwgbyA9IDA7IG4tLTsgKVxuICAgIG8gKz0gZS5jaGFyQ29kZUF0KG4pO1xuICByZXR1cm4gby50b1N0cmluZygzNik7XG59XG5mdW5jdGlvbiBKbih0KSB7XG4gIGplLmxlbmd0aCA9IDA7XG4gIGZvciAodmFyIGUgPSB0LmdldEVsZW1lbnRzQnlUYWdOYW1lKFwiaW5wdXRcIiksIG4gPSBlLmxlbmd0aDsgbi0tOyApIHtcbiAgICB2YXIgbyA9IGVbbl07XG4gICAgby5jaGVja2VkICYmIGplLnB1c2gobyk7XG4gIH1cbn1cbmZ1bmN0aW9uIGtlKHQpIHtcbiAgcmV0dXJuIHNldFRpbWVvdXQodCwgMCk7XG59XG5mdW5jdGlvbiBsdCh0KSB7XG4gIHJldHVybiBjbGVhclRpbWVvdXQodCk7XG59XG5VZSAmJiBEKGRvY3VtZW50LCBcInRvdWNobW92ZVwiLCBmdW5jdGlvbih0KSB7XG4gIChwLmFjdGl2ZSB8fCB2ZSkgJiYgdC5jYW5jZWxhYmxlICYmIHQucHJldmVudERlZmF1bHQoKTtcbn0pO1xucC51dGlscyA9IHtcbiAgb246IEQsXG4gIG9mZjogUyxcbiAgY3NzOiBoLFxuICBmaW5kOiBXdCxcbiAgaXM6IGZ1bmN0aW9uKGUsIG4pIHtcbiAgICByZXR1cm4gISFaKGUsIG4sIGUsICExKTtcbiAgfSxcbiAgZXh0ZW5kOiBNbixcbiAgdGhyb3R0bGU6IEd0LFxuICBjbG9zZXN0OiBaLFxuICB0b2dnbGVDbGFzczogVixcbiAgY2xvbmU6IHp0LFxuICBpbmRleDogSyxcbiAgbmV4dFRpY2s6IGtlLFxuICBjYW5jZWxOZXh0VGljazogbHQsXG4gIGRldGVjdERpcmVjdGlvbjogJHQsXG4gIGdldENoaWxkOiB3ZVxufTtcbnAuZ2V0ID0gZnVuY3Rpb24odCkge1xuICByZXR1cm4gdFtxXTtcbn07XG5wLm1vdW50ID0gZnVuY3Rpb24oKSB7XG4gIGZvciAodmFyIHQgPSBhcmd1bWVudHMubGVuZ3RoLCBlID0gbmV3IEFycmF5KHQpLCBuID0gMDsgbiA8IHQ7IG4rKylcbiAgICBlW25dID0gYXJndW1lbnRzW25dO1xuICBlWzBdLmNvbnN0cnVjdG9yID09PSBBcnJheSAmJiAoZSA9IGVbMF0pLCBlLmZvckVhY2goZnVuY3Rpb24obykge1xuICAgIGlmICghby5wcm90b3R5cGUgfHwgIW8ucHJvdG90eXBlLmNvbnN0cnVjdG9yKVxuICAgICAgdGhyb3cgXCJTb3J0YWJsZTogTW91bnRlZCBwbHVnaW4gbXVzdCBiZSBhIGNvbnN0cnVjdG9yIGZ1bmN0aW9uLCBub3QgXCIuY29uY2F0KHt9LnRvU3RyaW5nLmNhbGwobykpO1xuICAgIG8udXRpbHMgJiYgKHAudXRpbHMgPSB0ZSh0ZSh7fSwgcC51dGlscyksIG8udXRpbHMpKSwgeGUubW91bnQobyk7XG4gIH0pO1xufTtcbnAuY3JlYXRlID0gZnVuY3Rpb24odCwgZSkge1xuICByZXR1cm4gbmV3IHAodCwgZSk7XG59O1xucC52ZXJzaW9uID0geG47XG52YXIgUCA9IFtdLCBTZSwgc3QsIHV0ID0gITEsIG50LCBvdCwgemUsIERlO1xuZnVuY3Rpb24gWm4oKSB7XG4gIGZ1bmN0aW9uIHQoKSB7XG4gICAgdGhpcy5kZWZhdWx0cyA9IHtcbiAgICAgIHNjcm9sbDogITAsXG4gICAgICBmb3JjZUF1dG9TY3JvbGxGYWxsYmFjazogITEsXG4gICAgICBzY3JvbGxTZW5zaXRpdml0eTogMzAsXG4gICAgICBzY3JvbGxTcGVlZDogMTAsXG4gICAgICBidWJibGVTY3JvbGw6ICEwXG4gICAgfTtcbiAgICBmb3IgKHZhciBlIGluIHRoaXMpXG4gICAgICBlLmNoYXJBdCgwKSA9PT0gXCJfXCIgJiYgdHlwZW9mIHRoaXNbZV0gPT0gXCJmdW5jdGlvblwiICYmICh0aGlzW2VdID0gdGhpc1tlXS5iaW5kKHRoaXMpKTtcbiAgfVxuICByZXR1cm4gdC5wcm90b3R5cGUgPSB7XG4gICAgZHJhZ1N0YXJ0ZWQ6IGZ1bmN0aW9uKG4pIHtcbiAgICAgIHZhciBvID0gbi5vcmlnaW5hbEV2ZW50O1xuICAgICAgdGhpcy5zb3J0YWJsZS5uYXRpdmVEcmFnZ2FibGUgPyBEKGRvY3VtZW50LCBcImRyYWdvdmVyXCIsIHRoaXMuX2hhbmRsZUF1dG9TY3JvbGwpIDogdGhpcy5vcHRpb25zLnN1cHBvcnRQb2ludGVyID8gRChkb2N1bWVudCwgXCJwb2ludGVybW92ZVwiLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpIDogby50b3VjaGVzID8gRChkb2N1bWVudCwgXCJ0b3VjaG1vdmVcIiwgdGhpcy5faGFuZGxlRmFsbGJhY2tBdXRvU2Nyb2xsKSA6IEQoZG9jdW1lbnQsIFwibW91c2Vtb3ZlXCIsIHRoaXMuX2hhbmRsZUZhbGxiYWNrQXV0b1Njcm9sbCk7XG4gICAgfSxcbiAgICBkcmFnT3ZlckNvbXBsZXRlZDogZnVuY3Rpb24obikge1xuICAgICAgdmFyIG8gPSBuLm9yaWdpbmFsRXZlbnQ7XG4gICAgICAhdGhpcy5vcHRpb25zLmRyYWdPdmVyQnViYmxlICYmICFvLnJvb3RFbCAmJiB0aGlzLl9oYW5kbGVBdXRvU2Nyb2xsKG8pO1xuICAgIH0sXG4gICAgZHJvcDogZnVuY3Rpb24oKSB7XG4gICAgICB0aGlzLnNvcnRhYmxlLm5hdGl2ZURyYWdnYWJsZSA/IFMoZG9jdW1lbnQsIFwiZHJhZ292ZXJcIiwgdGhpcy5faGFuZGxlQXV0b1Njcm9sbCkgOiAoUyhkb2N1bWVudCwgXCJwb2ludGVybW92ZVwiLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpLCBTKGRvY3VtZW50LCBcInRvdWNobW92ZVwiLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpLCBTKGRvY3VtZW50LCBcIm1vdXNlbW92ZVwiLCB0aGlzLl9oYW5kbGVGYWxsYmFja0F1dG9TY3JvbGwpKSwgTXQoKSwgSGUoKSwgRm4oKTtcbiAgICB9LFxuICAgIG51bGxpbmc6IGZ1bmN0aW9uKCkge1xuICAgICAgemUgPSBzdCA9IFNlID0gdXQgPSBEZSA9IG50ID0gb3QgPSBudWxsLCBQLmxlbmd0aCA9IDA7XG4gICAgfSxcbiAgICBfaGFuZGxlRmFsbGJhY2tBdXRvU2Nyb2xsOiBmdW5jdGlvbihuKSB7XG4gICAgICB0aGlzLl9oYW5kbGVBdXRvU2Nyb2xsKG4sICEwKTtcbiAgICB9LFxuICAgIF9oYW5kbGVBdXRvU2Nyb2xsOiBmdW5jdGlvbihuLCBvKSB7XG4gICAgICB2YXIgciA9IHRoaXMsIGkgPSAobi50b3VjaGVzID8gbi50b3VjaGVzWzBdIDogbikuY2xpZW50WCwgYSA9IChuLnRvdWNoZXMgPyBuLnRvdWNoZXNbMF0gOiBuKS5jbGllbnRZLCBsID0gZG9jdW1lbnQuZWxlbWVudEZyb21Qb2ludChpLCBhKTtcbiAgICAgIGlmICh6ZSA9IG4sIG8gfHwgdGhpcy5vcHRpb25zLmZvcmNlQXV0b1Njcm9sbEZhbGxiYWNrIHx8IEFlIHx8IGllIHx8IF9lKSB7XG4gICAgICAgIHJ0KG4sIHRoaXMub3B0aW9ucywgbCwgbyk7XG4gICAgICAgIHZhciBzID0gdWUobCwgITApO1xuICAgICAgICB1dCAmJiAoIURlIHx8IGkgIT09IG50IHx8IGEgIT09IG90KSAmJiAoRGUgJiYgTXQoKSwgRGUgPSBzZXRJbnRlcnZhbChmdW5jdGlvbigpIHtcbiAgICAgICAgICB2YXIgdSA9IHVlKGRvY3VtZW50LmVsZW1lbnRGcm9tUG9pbnQoaSwgYSksICEwKTtcbiAgICAgICAgICB1ICE9PSBzICYmIChzID0gdSwgSGUoKSksIHJ0KG4sIHIub3B0aW9ucywgdSwgbyk7XG4gICAgICAgIH0sIDEwKSwgbnQgPSBpLCBvdCA9IGEpO1xuICAgICAgfSBlbHNlIHtcbiAgICAgICAgaWYgKCF0aGlzLm9wdGlvbnMuYnViYmxlU2Nyb2xsIHx8IHVlKGwsICEwKSA9PT0gZWUoKSkge1xuICAgICAgICAgIEhlKCk7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHJ0KG4sIHRoaXMub3B0aW9ucywgdWUobCwgITEpLCAhMSk7XG4gICAgICB9XG4gICAgfVxuICB9LCByZSh0LCB7XG4gICAgcGx1Z2luTmFtZTogXCJzY3JvbGxcIixcbiAgICBpbml0aWFsaXplQnlEZWZhdWx0OiAhMFxuICB9KTtcbn1cbmZ1bmN0aW9uIEhlKCkge1xuICBQLmZvckVhY2goZnVuY3Rpb24odCkge1xuICAgIGNsZWFySW50ZXJ2YWwodC5waWQpO1xuICB9KSwgUCA9IFtdO1xufVxuZnVuY3Rpb24gTXQoKSB7XG4gIGNsZWFySW50ZXJ2YWwoRGUpO1xufVxudmFyIHJ0ID0gR3QoZnVuY3Rpb24odCwgZSwgbiwgbykge1xuICBpZiAoZS5zY3JvbGwpIHtcbiAgICB2YXIgciA9ICh0LnRvdWNoZXMgPyB0LnRvdWNoZXNbMF0gOiB0KS5jbGllbnRYLCBpID0gKHQudG91Y2hlcyA/IHQudG91Y2hlc1swXSA6IHQpLmNsaWVudFksIGEgPSBlLnNjcm9sbFNlbnNpdGl2aXR5LCBsID0gZS5zY3JvbGxTcGVlZCwgcyA9IGVlKCksIHUgPSAhMSwgZDtcbiAgICBzdCAhPT0gbiAmJiAoc3QgPSBuLCBIZSgpLCBTZSA9IGUuc2Nyb2xsLCBkID0gZS5zY3JvbGxGbiwgU2UgPT09ICEwICYmIChTZSA9IHVlKG4sICEwKSkpO1xuICAgIHZhciBmID0gMCwgbSA9IFNlO1xuICAgIGRvIHtcbiAgICAgIHZhciB5ID0gbSwgYiA9IE0oeSksIEUgPSBiLnRvcCwgayA9IGIuYm90dG9tLCBIID0gYi5sZWZ0LCBGID0gYi5yaWdodCwgQSA9IGIud2lkdGgsIEwgPSBiLmhlaWdodCwgbmUgPSB2b2lkIDAsIGogPSB2b2lkIDAsIFEgPSB5LnNjcm9sbFdpZHRoLCB2ID0geS5zY3JvbGxIZWlnaHQsIHcgPSBoKHkpLCB4ID0geS5zY3JvbGxMZWZ0LCBOID0geS5zY3JvbGxUb3A7XG4gICAgICB5ID09PSBzID8gKG5lID0gQSA8IFEgJiYgKHcub3ZlcmZsb3dYID09PSBcImF1dG9cIiB8fCB3Lm92ZXJmbG93WCA9PT0gXCJzY3JvbGxcIiB8fCB3Lm92ZXJmbG93WCA9PT0gXCJ2aXNpYmxlXCIpLCBqID0gTCA8IHYgJiYgKHcub3ZlcmZsb3dZID09PSBcImF1dG9cIiB8fCB3Lm92ZXJmbG93WSA9PT0gXCJzY3JvbGxcIiB8fCB3Lm92ZXJmbG93WSA9PT0gXCJ2aXNpYmxlXCIpKSA6IChuZSA9IEEgPCBRICYmICh3Lm92ZXJmbG93WCA9PT0gXCJhdXRvXCIgfHwgdy5vdmVyZmxvd1ggPT09IFwic2Nyb2xsXCIpLCBqID0gTCA8IHYgJiYgKHcub3ZlcmZsb3dZID09PSBcImF1dG9cIiB8fCB3Lm92ZXJmbG93WSA9PT0gXCJzY3JvbGxcIikpO1xuICAgICAgdmFyIF8gPSBuZSAmJiAoTWF0aC5hYnMoRiAtIHIpIDw9IGEgJiYgeCArIEEgPCBRKSAtIChNYXRoLmFicyhIIC0gcikgPD0gYSAmJiAhIXgpLCBUID0gaiAmJiAoTWF0aC5hYnMoayAtIGkpIDw9IGEgJiYgTiArIEwgPCB2KSAtIChNYXRoLmFicyhFIC0gaSkgPD0gYSAmJiAhIU4pO1xuICAgICAgaWYgKCFQW2ZdKVxuICAgICAgICBmb3IgKHZhciBSID0gMDsgUiA8PSBmOyBSKyspXG4gICAgICAgICAgUFtSXSB8fCAoUFtSXSA9IHt9KTtcbiAgICAgIChQW2ZdLnZ4ICE9IF8gfHwgUFtmXS52eSAhPSBUIHx8IFBbZl0uZWwgIT09IHkpICYmIChQW2ZdLmVsID0geSwgUFtmXS52eCA9IF8sIFBbZl0udnkgPSBULCBjbGVhckludGVydmFsKFBbZl0ucGlkKSwgKF8gIT0gMCB8fCBUICE9IDApICYmICh1ID0gITAsIFBbZl0ucGlkID0gc2V0SW50ZXJ2YWwoZnVuY3Rpb24oKSB7XG4gICAgICAgIG8gJiYgdGhpcy5sYXllciA9PT0gMCAmJiBwLmFjdGl2ZS5fb25Ub3VjaE1vdmUoemUpO1xuICAgICAgICB2YXIgWSA9IFBbdGhpcy5sYXllcl0udnkgPyBQW3RoaXMubGF5ZXJdLnZ5ICogbCA6IDAsIHogPSBQW3RoaXMubGF5ZXJdLnZ4ID8gUFt0aGlzLmxheWVyXS52eCAqIGwgOiAwO1xuICAgICAgICB0eXBlb2YgZCA9PSBcImZ1bmN0aW9uXCIgJiYgZC5jYWxsKHAuZHJhZ2dlZC5wYXJlbnROb2RlW3FdLCB6LCBZLCB0LCB6ZSwgUFt0aGlzLmxheWVyXS5lbCkgIT09IFwiY29udGludWVcIiB8fCBqdChQW3RoaXMubGF5ZXJdLmVsLCB6LCBZKTtcbiAgICAgIH0uYmluZCh7XG4gICAgICAgIGxheWVyOiBmXG4gICAgICB9KSwgMjQpKSksIGYrKztcbiAgICB9IHdoaWxlIChlLmJ1YmJsZVNjcm9sbCAmJiBtICE9PSBzICYmIChtID0gdWUobSwgITEpKSk7XG4gICAgdXQgPSB1O1xuICB9XG59LCAzMCksIFp0ID0gZnVuY3Rpb24oZSkge1xuICB2YXIgbiA9IGUub3JpZ2luYWxFdmVudCwgbyA9IGUucHV0U29ydGFibGUsIHIgPSBlLmRyYWdFbCwgaSA9IGUuYWN0aXZlU29ydGFibGUsIGEgPSBlLmRpc3BhdGNoU29ydGFibGVFdmVudCwgbCA9IGUuaGlkZUdob3N0Rm9yVGFyZ2V0LCBzID0gZS51bmhpZGVHaG9zdEZvclRhcmdldDtcbiAgaWYgKG4pIHtcbiAgICB2YXIgdSA9IG8gfHwgaTtcbiAgICBsKCk7XG4gICAgdmFyIGQgPSBuLmNoYW5nZWRUb3VjaGVzICYmIG4uY2hhbmdlZFRvdWNoZXMubGVuZ3RoID8gbi5jaGFuZ2VkVG91Y2hlc1swXSA6IG4sIGYgPSBkb2N1bWVudC5lbGVtZW50RnJvbVBvaW50KGQuY2xpZW50WCwgZC5jbGllbnRZKTtcbiAgICBzKCksIHUgJiYgIXUuZWwuY29udGFpbnMoZikgJiYgKGEoXCJzcGlsbFwiKSwgdGhpcy5vblNwaWxsKHtcbiAgICAgIGRyYWdFbDogcixcbiAgICAgIHB1dFNvcnRhYmxlOiBvXG4gICAgfSkpO1xuICB9XG59O1xuZnVuY3Rpb24gaHQoKSB7XG59XG5odC5wcm90b3R5cGUgPSB7XG4gIHN0YXJ0SW5kZXg6IG51bGwsXG4gIGRyYWdTdGFydDogZnVuY3Rpb24oZSkge1xuICAgIHZhciBuID0gZS5vbGREcmFnZ2FibGVJbmRleDtcbiAgICB0aGlzLnN0YXJ0SW5kZXggPSBuO1xuICB9LFxuICBvblNwaWxsOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIG4gPSBlLmRyYWdFbCwgbyA9IGUucHV0U29ydGFibGU7XG4gICAgdGhpcy5zb3J0YWJsZS5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKSwgbyAmJiBvLmNhcHR1cmVBbmltYXRpb25TdGF0ZSgpO1xuICAgIHZhciByID0gd2UodGhpcy5zb3J0YWJsZS5lbCwgdGhpcy5zdGFydEluZGV4LCB0aGlzLm9wdGlvbnMpO1xuICAgIHIgPyB0aGlzLnNvcnRhYmxlLmVsLmluc2VydEJlZm9yZShuLCByKSA6IHRoaXMuc29ydGFibGUuZWwuYXBwZW5kQ2hpbGQobiksIHRoaXMuc29ydGFibGUuYW5pbWF0ZUFsbCgpLCBvICYmIG8uYW5pbWF0ZUFsbCgpO1xuICB9LFxuICBkcm9wOiBadFxufTtcbnJlKGh0LCB7XG4gIHBsdWdpbk5hbWU6IFwicmV2ZXJ0T25TcGlsbFwiXG59KTtcbmZ1bmN0aW9uIHB0KCkge1xufVxucHQucHJvdG90eXBlID0ge1xuICBvblNwaWxsOiBmdW5jdGlvbihlKSB7XG4gICAgdmFyIG4gPSBlLmRyYWdFbCwgbyA9IGUucHV0U29ydGFibGUsIHIgPSBvIHx8IHRoaXMuc29ydGFibGU7XG4gICAgci5jYXB0dXJlQW5pbWF0aW9uU3RhdGUoKSwgbi5wYXJlbnROb2RlICYmIG4ucGFyZW50Tm9kZS5yZW1vdmVDaGlsZChuKSwgci5hbmltYXRlQWxsKCk7XG4gIH0sXG4gIGRyb3A6IFp0XG59O1xucmUocHQsIHtcbiAgcGx1Z2luTmFtZTogXCJyZW1vdmVPblNwaWxsXCJcbn0pO1xucC5tb3VudChuZXcgWm4oKSk7XG5wLm1vdW50KHB0LCBodCk7XG5mdW5jdGlvbiBRbih0KSB7XG4gIHJldHVybiB0ID09IG51bGwgPyB0IDogSlNPTi5wYXJzZShKU09OLnN0cmluZ2lmeSh0KSk7XG59XG5mdW5jdGlvbiBlbyh0KSB7XG4gIGZ0KCkgJiYgbG4odCk7XG59XG5mdW5jdGlvbiB0byh0KSB7XG4gIGZ0KCkgPyBzbih0KSA6IFl0KHQpO1xufVxubGV0IFF0ID0gbnVsbCwgZW4gPSBudWxsO1xuZnVuY3Rpb24gRnQodCA9IG51bGwsIGUgPSBudWxsKSB7XG4gIFF0ID0gdCwgZW4gPSBlO1xufVxuZnVuY3Rpb24gbm8oKSB7XG4gIHJldHVybiB7XG4gICAgZGF0YTogUXQsXG4gICAgY2xvbmVkRGF0YTogZW5cbiAgfTtcbn1cbmNvbnN0IFJ0ID0gU3ltYm9sKFwiY2xvbmVFbGVtZW50XCIpO1xuZnVuY3Rpb24gdG4oLi4udCkge1xuICB2YXIgaiwgUTtcbiAgY29uc3QgZSA9IChqID0gZnQoKSkgPT0gbnVsbCA/IHZvaWQgMCA6IGoucHJveHk7XG4gIGxldCBuID0gbnVsbDtcbiAgY29uc3QgbyA9IHRbMF07XG4gIGxldCBbLCByLCBpXSA9IHQ7XG4gIEFycmF5LmlzQXJyYXkoVShyKSkgfHwgKGkgPSByLCByID0gbnVsbCk7XG4gIGxldCBhID0gbnVsbDtcbiAgY29uc3Qge1xuICAgIGltbWVkaWF0ZTogbCA9ICEwLFxuICAgIGNsb25lOiBzID0gUW4sXG4gICAgY3VzdG9tVXBkYXRlOiB1XG4gIH0gPSAoUSA9IFUoaSkpICE9IG51bGwgPyBRIDoge307XG4gIGZ1bmN0aW9uIGQodikge1xuICAgIHZhciBSO1xuICAgIGNvbnN0IHsgZnJvbTogdywgb2xkSW5kZXg6IHgsIGl0ZW06IE4gfSA9IHY7XG4gICAgbiA9IEFycmF5LmZyb20ody5jaGlsZE5vZGVzKTtcbiAgICBjb25zdCBfID0gVSgoUiA9IFUocikpID09IG51bGwgPyB2b2lkIDAgOiBSW3hdKSwgVCA9IHMoXyk7XG4gICAgRnQoXywgVCksIE5bUnRdID0gVDtcbiAgfVxuICBmdW5jdGlvbiBmKHYpIHtcbiAgICBjb25zdCB3ID0gdi5pdGVtW1J0XTtcbiAgICBpZiAoIXluKHcpKSB7XG4gICAgICBpZiAocWUodi5pdGVtKSwgJGUocikpIHtcbiAgICAgICAgY29uc3QgeCA9IFsuLi5VKHIpXTtcbiAgICAgICAgci52YWx1ZSA9IFN0KHgsIHYubmV3RHJhZ2dhYmxlSW5kZXgsIHcpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBTdChVKHIpLCB2Lm5ld0RyYWdnYWJsZUluZGV4LCB3KTtcbiAgICB9XG4gIH1cbiAgZnVuY3Rpb24gbSh2KSB7XG4gICAgY29uc3QgeyBmcm9tOiB3LCBpdGVtOiB4LCBvbGRJbmRleDogTiwgb2xkRHJhZ2dhYmxlSW5kZXg6IF8sIHB1bGxNb2RlOiBULCBjbG9uZTogUiB9ID0gdjtcbiAgICBpZiAoRHQodywgeCwgTiksIFQgPT09IFwiY2xvbmVcIikge1xuICAgICAgcWUoUik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGlmICgkZShyKSkge1xuICAgICAgY29uc3QgWSA9IFsuLi5VKHIpXTtcbiAgICAgIHIudmFsdWUgPSBFdChZLCBfKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgRXQoVShyKSwgXyk7XG4gIH1cbiAgZnVuY3Rpb24geSh2KSB7XG4gICAgaWYgKHUpIHtcbiAgICAgIHUodik7XG4gICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IHsgZnJvbTogdywgaXRlbTogeCwgb2xkSW5kZXg6IE4sIG9sZERyYWdnYWJsZUluZGV4OiBfLCBuZXdEcmFnZ2FibGVJbmRleDogVCB9ID0gdjtcbiAgICBpZiAocWUoeCksIER0KHcsIHgsIE4pLCAkZShyKSkge1xuICAgICAgY29uc3QgUiA9IFsuLi5VKHIpXTtcbiAgICAgIHIudmFsdWUgPSB3dChcbiAgICAgICAgUixcbiAgICAgICAgXyxcbiAgICAgICAgVFxuICAgICAgKTtcbiAgICAgIHJldHVybjtcbiAgICB9XG4gICAgd3QoVShyKSwgXywgVCk7XG4gIH1cbiAgZnVuY3Rpb24gYih2KSB7XG4gICAgY29uc3QgeyBuZXdJbmRleDogdywgb2xkSW5kZXg6IHgsIGZyb206IE4sIHRvOiBfIH0gPSB2O1xuICAgIGxldCBUID0gbnVsbDtcbiAgICBjb25zdCBSID0gdyA9PT0geCAmJiBOID09PSBfO1xuICAgIHRyeSB7XG4gICAgICBpZiAoUikge1xuICAgICAgICBsZXQgWSA9IG51bGw7XG4gICAgICAgIG4gPT0gbnVsbCB8fCBuLnNvbWUoKHosIGFlKSA9PiB7XG4gICAgICAgICAgaWYgKFkgJiYgKG4gPT0gbnVsbCA/IHZvaWQgMCA6IG4ubGVuZ3RoKSAhPT0gXy5jaGlsZE5vZGVzLmxlbmd0aClcbiAgICAgICAgICAgIHJldHVybiBOLmluc2VydEJlZm9yZShZLCB6Lm5leHRTaWJsaW5nKSwgITA7XG4gICAgICAgICAgY29uc3QgY2UgPSBfLmNoaWxkTm9kZXNbYWVdO1xuICAgICAgICAgIFkgPSBfID09IG51bGwgPyB2b2lkIDAgOiBfLnJlcGxhY2VDaGlsZCh6LCBjZSk7XG4gICAgICAgIH0pO1xuICAgICAgfVxuICAgIH0gY2F0Y2ggKFkpIHtcbiAgICAgIFQgPSBZO1xuICAgIH0gZmluYWxseSB7XG4gICAgICBuID0gbnVsbDtcbiAgICB9XG4gICAgWXQoKCkgPT4ge1xuICAgICAgaWYgKEZ0KCksIFQpXG4gICAgICAgIHRocm93IFQ7XG4gICAgfSk7XG4gIH1cbiAgY29uc3QgRSA9IHtcbiAgICBvblVwZGF0ZTogeSxcbiAgICBvblN0YXJ0OiBkLFxuICAgIG9uQWRkOiBmLFxuICAgIG9uUmVtb3ZlOiBtLFxuICAgIG9uRW5kOiBiXG4gIH07XG4gIGZ1bmN0aW9uIGsodikge1xuICAgIGNvbnN0IHcgPSBVKG8pO1xuICAgIHJldHVybiB2IHx8ICh2ID0gd24odykgPyBFbih3LCBlID09IG51bGwgPyB2b2lkIDAgOiBlLiRlbCkgOiB3KSwgdiAmJiAhX24odikgJiYgKHYgPSB2LiRlbCksIHYgfHwgbW4oXCJSb290IGVsZW1lbnQgbm90IGZvdW5kXCIpLCB2O1xuICB9XG4gIGZ1bmN0aW9uIEgoKSB7XG4gICAgdmFyIE47XG4gICAgY29uc3QgXyA9IChOID0gVShpKSkgIT0gbnVsbCA/IE4gOiB7fSwgeyBpbW1lZGlhdGU6IHYsIGNsb25lOiB3IH0gPSBfLCB4ID0gVmUoXywgW1wiaW1tZWRpYXRlXCIsIFwiY2xvbmVcIl0pO1xuICAgIHJldHVybiBfdCh4LCAoVCwgUikgPT4ge1xuICAgICAgVG4oVCkgJiYgKHhbVF0gPSAoWSwgLi4ueikgPT4ge1xuICAgICAgICBjb25zdCBhZSA9IG5vKCk7XG4gICAgICAgIHJldHVybiBDbihZLCBhZSksIFIoWSwgLi4ueik7XG4gICAgICB9KTtcbiAgICB9KSwgRG4oXG4gICAgICByID09PSBudWxsID8ge30gOiBFLFxuICAgICAgeFxuICAgICk7XG4gIH1cbiAgY29uc3QgRiA9ICh2KSA9PiB7XG4gICAgdiA9IGsodiksIGEgJiYgQS5kZXN0cm95KCksIGEgPSBuZXcgcCh2LCBIKCkpO1xuICB9O1xuICBhbihcbiAgICAoKSA9PiBpLFxuICAgICgpID0+IHtcbiAgICAgIGEgJiYgX3QoSCgpLCAodiwgdykgPT4ge1xuICAgICAgICBhID09IG51bGwgfHwgYS5vcHRpb24odiwgdyk7XG4gICAgICB9KTtcbiAgICB9LFxuICAgIHsgZGVlcDogITAgfVxuICApO1xuICBjb25zdCBBID0ge1xuICAgIG9wdGlvbjogKHYsIHcpID0+IGEgPT0gbnVsbCA/IHZvaWQgMCA6IGEub3B0aW9uKHYsIHcpLFxuICAgIGRlc3Ryb3k6ICgpID0+IHtcbiAgICAgIGEgPT0gbnVsbCB8fCBhLmRlc3Ryb3koKSwgYSA9IG51bGw7XG4gICAgfSxcbiAgICBzYXZlOiAoKSA9PiBhID09IG51bGwgPyB2b2lkIDAgOiBhLnNhdmUoKSxcbiAgICB0b0FycmF5OiAoKSA9PiBhID09IG51bGwgPyB2b2lkIDAgOiBhLnRvQXJyYXkoKSxcbiAgICBjbG9zZXN0OiAoLi4udikgPT4gYSA9PSBudWxsID8gdm9pZCAwIDogYS5jbG9zZXN0KC4uLnYpXG4gIH0sIEwgPSAoKSA9PiBBID09IG51bGwgPyB2b2lkIDAgOiBBLm9wdGlvbihcImRpc2FibGVkXCIsICEwKSwgbmUgPSAoKSA9PiBBID09IG51bGwgPyB2b2lkIDAgOiBBLm9wdGlvbihcImRpc2FibGVkXCIsICExKTtcbiAgcmV0dXJuIHRvKCgpID0+IHtcbiAgICBsICYmIEYoKTtcbiAgfSksIGVvKEEuZGVzdHJveSksIGZlKHsgc3RhcnQ6IEYsIHBhdXNlOiBMLCByZXN1bWU6IG5lIH0sIEEpO1xufVxuY29uc3QgY3QgPSBbXG4gIFwidXBkYXRlXCIsXG4gIFwic3RhcnRcIixcbiAgXCJhZGRcIixcbiAgXCJyZW1vdmVcIixcbiAgXCJjaG9vc2VcIixcbiAgXCJ1bmNob29zZVwiLFxuICBcImVuZFwiLFxuICBcInNvcnRcIixcbiAgXCJmaWx0ZXJcIixcbiAgXCJjbG9uZVwiLFxuICBcIm1vdmVcIixcbiAgXCJjaGFuZ2VcIlxuXSwgb28gPSBbXG4gIFwiY2xvbmVcIixcbiAgXCJhbmltYXRpb25cIixcbiAgXCJnaG9zdENsYXNzXCIsXG4gIFwiZ3JvdXBcIixcbiAgXCJzb3J0XCIsXG4gIFwiZGlzYWJsZWRcIixcbiAgXCJzdG9yZVwiLFxuICBcImhhbmRsZVwiLFxuICBcImRyYWdnYWJsZVwiLFxuICBcInN3YXBUaHJlc2hvbGRcIixcbiAgXCJpbnZlcnRTd2FwXCIsXG4gIFwiaW52ZXJ0ZWRTd2FwVGhyZXNob2xkXCIsXG4gIFwicmVtb3ZlQ2xvbmVPbkhpZGVcIixcbiAgXCJkaXJlY3Rpb25cIixcbiAgXCJjaG9zZW5DbGFzc1wiLFxuICBcImRyYWdDbGFzc1wiLFxuICBcImlnbm9yZVwiLFxuICBcImZpbHRlclwiLFxuICBcInByZXZlbnRPbkZpbHRlclwiLFxuICBcImVhc2luZ1wiLFxuICBcInNldERhdGFcIixcbiAgXCJkcm9wQnViYmxlXCIsXG4gIFwiZHJhZ292ZXJCdWJibGVcIixcbiAgXCJkYXRhSWRBdHRyXCIsXG4gIFwiZGVsYXlcIixcbiAgXCJkZWxheU9uVG91Y2hPbmx5XCIsXG4gIFwidG91Y2hTdGFydFRocmVzaG9sZFwiLFxuICBcImZvcmNlRmFsbGJhY2tcIixcbiAgXCJmYWxsYmFja0NsYXNzXCIsXG4gIFwiZmFsbGJhY2tPbkJvZHlcIixcbiAgXCJmYWxsYmFja1RvbGVyYW5jZVwiLFxuICBcImZhbGxiYWNrT2Zmc2V0XCIsXG4gIFwic3VwcG9ydFBvaW50ZXJcIixcbiAgXCJlbXB0eUluc2VydFRocmVzaG9sZFwiLFxuICBcInNjcm9sbFwiLFxuICBcImZvcmNlQXV0b1Njcm9sbEZhbGxiYWNrXCIsXG4gIFwic2Nyb2xsU2Vuc2l0aXZpdHlcIixcbiAgXCJzY3JvbGxTcGVlZFwiLFxuICBcImJ1YmJsZVNjcm9sbFwiLFxuICBcIm1vZGVsVmFsdWVcIixcbiAgXCJ0YWdcIixcbiAgXCJ0YXJnZXRcIixcbiAgXCJjdXN0b21VcGRhdGVcIixcbiAgLi4uY3QubWFwKCh0KSA9PiBgb24ke3QucmVwbGFjZSgvXlxcUy8sIChlKSA9PiBlLnRvVXBwZXJDYXNlKCkpfWApXG5dLCBsbyA9IHVuKHtcbiAgbmFtZTogXCJWdWVEcmFnZ2FibGVcIixcbiAgbW9kZWw6IHtcbiAgICBwcm9wOiBcIm1vZGVsVmFsdWVcIixcbiAgICBldmVudDogXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiXG4gIH0sXG4gIHByb3BzOiBvbyxcbiAgZW1pdHM6IFtcInVwZGF0ZTptb2RlbFZhbHVlXCIsIC4uLmN0XSxcbiAgc2V0dXAodCwgeyBzbG90czogZSwgZW1pdDogbiwgZXhwb3NlOiBvLCBhdHRyczogciB9KSB7XG4gICAgY29uc3QgaSA9IGN0LnJlZHVjZSgoZCwgZikgPT4ge1xuICAgICAgY29uc3QgbSA9IGBvbiR7Zi5yZXBsYWNlKC9eXFxTLywgKHkpID0+IHkudG9VcHBlckNhc2UoKSl9YDtcbiAgICAgIHJldHVybiBkW21dID0gKC4uLnkpID0+IG4oZiwgLi4ueSksIGQ7XG4gICAgfSwge30pLCBhID0geXQoKCkgPT4ge1xuICAgICAgY29uc3QgeSA9IGNuKHQpLCB7IG1vZGVsVmFsdWU6IGQgfSA9IHksIGYgPSBWZSh5LCBbXCJtb2RlbFZhbHVlXCJdKSwgbSA9IE9iamVjdC5lbnRyaWVzKGYpLnJlZHVjZSgoYiwgW0UsIGtdKSA9PiB7XG4gICAgICAgIGNvbnN0IEggPSBVKGspO1xuICAgICAgICByZXR1cm4gSCAhPT0gdm9pZCAwICYmIChiW0VdID0gSCksIGI7XG4gICAgICB9LCB7fSk7XG4gICAgICByZXR1cm4gZmUoZmUoe30sIGkpLCBibihmZShmZSh7fSwgciksIG0pKSk7XG4gICAgfSksIGwgPSB5dCh7XG4gICAgICBnZXQ6ICgpID0+IHQubW9kZWxWYWx1ZSxcbiAgICAgIHNldDogKGQpID0+IG4oXCJ1cGRhdGU6bW9kZWxWYWx1ZVwiLCBkKVxuICAgIH0pLCBzID0gZm4oKSwgdSA9IGRuKFxuICAgICAgdG4odC50YXJnZXQgfHwgcywgbCwgYSlcbiAgICApO1xuICAgIHJldHVybiBvKHUpLCAoKSA9PiB7XG4gICAgICB2YXIgZDtcbiAgICAgIHJldHVybiBobih0LnRhZyB8fCBcImRpdlwiLCB7IHJlZjogcyB9LCAoZCA9IGUgPT0gbnVsbCA/IHZvaWQgMCA6IGUuZGVmYXVsdCkgPT0gbnVsbCA/IHZvaWQgMCA6IGQuY2FsbChlLCB1KSk7XG4gICAgfTtcbiAgfVxufSksIFh0ID0ge1xuICBtb3VudGVkOiBcIm1vdW50ZWRcIixcbiAgdW5tb3VudGVkOiBcInVubW91bnRlZFwiXG59LCBpdCA9IC8qIEBfX1BVUkVfXyAqLyBuZXcgV2Vha01hcCgpLCBzbyA9IHtcbiAgW1h0Lm1vdW50ZWRdKHQsIGUpIHtcbiAgICBjb25zdCBuID0gcG4oZS52YWx1ZSkgPyBbZS52YWx1ZV0gOiBlLnZhbHVlLCBbbywgcl0gPSBuLCBpID0gdG4odCwgbywgcik7XG4gICAgaXQuc2V0KHQsIGkuZGVzdHJveSk7XG4gIH0sXG4gIFtYdC51bm1vdW50ZWRdKHQpIHtcbiAgICB2YXIgZTtcbiAgICAoZSA9IGl0LmdldCh0KSkgPT0gbnVsbCB8fCBlKCksIGl0LmRlbGV0ZSh0KTtcbiAgfVxufTtcbmV4cG9ydCB7XG4gIGxvIGFzIFZ1ZURyYWdnYWJsZSxcbiAgdG4gYXMgdXNlRHJhZ2dhYmxlLFxuICBzbyBhcyB2RHJhZ2dhYmxlXG59O1xuIl0sIm5hbWVzIjpbImZ0IiwibG4iLCJzbiIsIll0IiwiVSIsIiRlIiwiYW4iLCJwbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQSxJQUFJLEtBQUssT0FBTztBQUNoQixJQUFJLEtBQUssT0FBTztBQUNoQixJQUFJLEtBQUssT0FBTyxVQUFV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
