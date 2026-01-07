import { Color } from './color.esm.js';
/*!
 * Chart.js v4.5.0
 * https://www.chartjs.org
 * (c) 2025 Chart.js Contributors
 * Released under the MIT License
 */
function noop() {}
const uid = /* @__PURE__ */ (() => {
  let id = 0;
  return () => id++;
})();
function isNullOrUndef(value) {
  return value === null || value === void 0;
}
function isArray(value) {
  if (Array.isArray && Array.isArray(value)) {
    return true;
  }
  const type = Object.prototype.toString.call(value);
  if (type.slice(0, 7) === '[object' && type.slice(-6) === 'Array]') {
    return true;
  }
  return false;
}
function isObject(value) {
  return value !== null && Object.prototype.toString.call(value) === '[object Object]';
}
function isNumberFinite(value) {
  return (typeof value === 'number' || value instanceof Number) && isFinite(+value);
}
function finiteOrDefault(value, defaultValue) {
  return isNumberFinite(value) ? value : defaultValue;
}
function valueOrDefault(value, defaultValue) {
  return typeof value === 'undefined' ? defaultValue : value;
}
const toPercentage = (value, dimension) =>
  typeof value === 'string' && value.endsWith('%') ? parseFloat(value) / 100 : +value / dimension;
const toDimension = (value, dimension) =>
  typeof value === 'string' && value.endsWith('%') ? (parseFloat(value) / 100) * dimension : +value;
function callback(fn, args, thisArg) {
  if (fn && typeof fn.call === 'function') {
    return fn.apply(thisArg, args);
  }
}
function each(loopable, fn, thisArg, reverse) {
  let i, len, keys;
  if (isArray(loopable)) {
    len = loopable.length;
    {
      for (i = 0; i < len; i++) {
        fn.call(thisArg, loopable[i], i);
      }
    }
  } else if (isObject(loopable)) {
    keys = Object.keys(loopable);
    len = keys.length;
    for (i = 0; i < len; i++) {
      fn.call(thisArg, loopable[keys[i]], keys[i]);
    }
  }
}
function _elementsEqual(a0, a1) {
  let i, ilen, v0, v1;
  if (!a0 || !a1 || a0.length !== a1.length) {
    return false;
  }
  for (i = 0, ilen = a0.length; i < ilen; ++i) {
    v0 = a0[i];
    v1 = a1[i];
    if (v0.datasetIndex !== v1.datasetIndex || v0.index !== v1.index) {
      return false;
    }
  }
  return true;
}
function clone(source) {
  if (isArray(source)) {
    return source.map(clone);
  }
  if (isObject(source)) {
    const target = /* @__PURE__ */ Object.create(null);
    const keys = Object.keys(source);
    const klen = keys.length;
    let k = 0;
    for (; k < klen; ++k) {
      target[keys[k]] = clone(source[keys[k]]);
    }
    return target;
  }
  return source;
}
function isValidKey(key) {
  return ['__proto__', 'prototype', 'constructor'].indexOf(key) === -1;
}
function _merger(key, target, source, options) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    merge(tval, sval, options);
  } else {
    target[key] = clone(sval);
  }
}
function merge(target, source, options) {
  const sources = isArray(source) ? source : [source];
  const ilen = sources.length;
  if (!isObject(target)) {
    return target;
  }
  options = options || {};
  const merger = options.merger || _merger;
  let current;
  for (let i = 0; i < ilen; ++i) {
    current = sources[i];
    if (!isObject(current)) {
      continue;
    }
    const keys = Object.keys(current);
    for (let k = 0, klen = keys.length; k < klen; ++k) {
      merger(keys[k], target, current, options);
    }
  }
  return target;
}
function mergeIf(target, source) {
  return merge(target, source, {
    merger: _mergerIf,
  });
}
function _mergerIf(key, target, source) {
  if (!isValidKey(key)) {
    return;
  }
  const tval = target[key];
  const sval = source[key];
  if (isObject(tval) && isObject(sval)) {
    mergeIf(tval, sval);
  } else if (!Object.prototype.hasOwnProperty.call(target, key)) {
    target[key] = clone(sval);
  }
}
const keyResolvers = {
  // Chart.helpers.core resolveObjectKey should resolve empty key to root object
  '': v => v,
  // default resolvers
  x: o => o.x,
  y: o => o.y,
};
function _splitKey(key) {
  const parts = key.split('.');
  const keys = [];
  let tmp = '';
  for (const part of parts) {
    tmp += part;
    if (tmp.endsWith('\\')) {
      tmp = tmp.slice(0, -1) + '.';
    } else {
      keys.push(tmp);
      tmp = '';
    }
  }
  return keys;
}
function _getKeyResolver(key) {
  const keys = _splitKey(key);
  return obj => {
    for (const k of keys) {
      if (k === '') {
        break;
      }
      obj = obj && obj[k];
    }
    return obj;
  };
}
function resolveObjectKey(obj, key) {
  const resolver = keyResolvers[key] || (keyResolvers[key] = _getKeyResolver(key));
  return resolver(obj);
}
function _capitalize(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}
const defined = value => typeof value !== 'undefined';
const isFunction = value => typeof value === 'function';
const setsEqual = (a, b) => {
  if (a.size !== b.size) {
    return false;
  }
  for (const item of a) {
    if (!b.has(item)) {
      return false;
    }
  }
  return true;
};
function _isClickEvent(e) {
  return e.type === 'mouseup' || e.type === 'click' || e.type === 'contextmenu';
}
const PI = Math.PI;
const TAU = 2 * PI;
const PITAU = TAU + PI;
const INFINITY = Number.POSITIVE_INFINITY;
const RAD_PER_DEG = PI / 180;
const HALF_PI = PI / 2;
const QUARTER_PI = PI / 4;
const TWO_THIRDS_PI = (PI * 2) / 3;
const log10 = Math.log10;
const sign = Math.sign;
function almostEquals(x, y, epsilon) {
  return Math.abs(x - y) < epsilon;
}
function niceNum(range) {
  const roundedRange = Math.round(range);
  range = almostEquals(range, roundedRange, range / 1e3) ? roundedRange : range;
  const niceRange = Math.pow(10, Math.floor(log10(range)));
  const fraction = range / niceRange;
  const niceFraction = fraction <= 1 ? 1 : fraction <= 2 ? 2 : fraction <= 5 ? 5 : 10;
  return niceFraction * niceRange;
}
function _factorize(value) {
  const result = [];
  const sqrt = Math.sqrt(value);
  let i;
  for (i = 1; i < sqrt; i++) {
    if (value % i === 0) {
      result.push(i);
      result.push(value / i);
    }
  }
  if (sqrt === (sqrt | 0)) {
    result.push(sqrt);
  }
  result.sort((a, b) => a - b).pop();
  return result;
}
function isNonPrimitive(n) {
  return (
    typeof n === 'symbol' ||
    (typeof n === 'object' &&
      n !== null &&
      !(Symbol.toPrimitive in n || 'toString' in n || 'valueOf' in n))
  );
}
function isNumber(n) {
  return !isNonPrimitive(n) && !isNaN(parseFloat(n)) && isFinite(n);
}
function almostWhole(x, epsilon) {
  const rounded = Math.round(x);
  return rounded - epsilon <= x && rounded + epsilon >= x;
}
function _setMinAndMaxByKey(array, target, property) {
  let i, ilen, value;
  for (i = 0, ilen = array.length; i < ilen; i++) {
    value = array[i][property];
    if (!isNaN(value)) {
      target.min = Math.min(target.min, value);
      target.max = Math.max(target.max, value);
    }
  }
}
function toRadians(degrees) {
  return degrees * (PI / 180);
}
function toDegrees(radians) {
  return radians * (180 / PI);
}
function _decimalPlaces(x) {
  if (!isNumberFinite(x)) {
    return;
  }
  let e = 1;
  let p = 0;
  while (Math.round(x * e) / e !== x) {
    e *= 10;
    p++;
  }
  return p;
}
function getAngleFromPoint(centrePoint, anglePoint) {
  const distanceFromXCenter = anglePoint.x - centrePoint.x;
  const distanceFromYCenter = anglePoint.y - centrePoint.y;
  const radialDistanceFromCenter = Math.sqrt(
    distanceFromXCenter * distanceFromXCenter + distanceFromYCenter * distanceFromYCenter,
  );
  let angle = Math.atan2(distanceFromYCenter, distanceFromXCenter);
  if (angle < -0.5 * PI) {
    angle += TAU;
  }
  return {
    angle,
    distance: radialDistanceFromCenter,
  };
}
function distanceBetweenPoints(pt1, pt2) {
  return Math.sqrt(Math.pow(pt2.x - pt1.x, 2) + Math.pow(pt2.y - pt1.y, 2));
}
function _angleDiff(a, b) {
  return ((a - b + PITAU) % TAU) - PI;
}
function _normalizeAngle(a) {
  return ((a % TAU) + TAU) % TAU;
}
function _angleBetween(angle, start, end, sameAngleIsFullCircle) {
  const a = _normalizeAngle(angle);
  const s = _normalizeAngle(start);
  const e = _normalizeAngle(end);
  const angleToStart = _normalizeAngle(s - a);
  const angleToEnd = _normalizeAngle(e - a);
  const startToAngle = _normalizeAngle(a - s);
  const endToAngle = _normalizeAngle(a - e);
  return (
    a === s ||
    a === e ||
    (sameAngleIsFullCircle && s === e) ||
    (angleToStart > angleToEnd && startToAngle < endToAngle)
  );
}
function _limitValue(value, min, max) {
  return Math.max(min, Math.min(max, value));
}
function _int16Range(value) {
  return _limitValue(value, -32768, 32767);
}
function _isBetween(value, start, end, epsilon = 1e-6) {
  return value >= Math.min(start, end) - epsilon && value <= Math.max(start, end) + epsilon;
}
function _lookup(table, value, cmp) {
  cmp = cmp || (index => table[index] < value);
  let hi = table.length - 1;
  let lo = 0;
  let mid;
  while (hi - lo > 1) {
    mid = (lo + hi) >> 1;
    if (cmp(mid)) {
      lo = mid;
    } else {
      hi = mid;
    }
  }
  return {
    lo,
    hi,
  };
}
const _lookupByKey = (table, key, value, last) =>
  _lookup(
    table,
    value,
    last
      ? index => {
          const ti = table[index][key];
          return ti < value || (ti === value && table[index + 1][key] === value);
        }
      : index => table[index][key] < value,
  );
const _rlookupByKey = (table, key, value) =>
  _lookup(table, value, index => table[index][key] >= value);
function _filterBetween(values, min, max) {
  let start = 0;
  let end = values.length;
  while (start < end && values[start] < min) {
    start++;
  }
  while (end > start && values[end - 1] > max) {
    end--;
  }
  return start > 0 || end < values.length ? values.slice(start, end) : values;
}
const arrayEvents = ['push', 'pop', 'shift', 'splice', 'unshift'];
function listenArrayEvents(array, listener) {
  if (array._chartjs) {
    array._chartjs.listeners.push(listener);
    return;
  }
  Object.defineProperty(array, '_chartjs', {
    configurable: true,
    enumerable: false,
    value: {
      listeners: [listener],
    },
  });
  arrayEvents.forEach(key => {
    const method = '_onData' + _capitalize(key);
    const base = array[key];
    Object.defineProperty(array, key, {
      configurable: true,
      enumerable: false,
      value(...args) {
        const res = base.apply(this, args);
        array._chartjs.listeners.forEach(object => {
          if (typeof object[method] === 'function') {
            object[method](...args);
          }
        });
        return res;
      },
    });
  });
}
function unlistenArrayEvents(array, listener) {
  const stub = array._chartjs;
  if (!stub) {
    return;
  }
  const listeners = stub.listeners;
  const index = listeners.indexOf(listener);
  if (index !== -1) {
    listeners.splice(index, 1);
  }
  if (listeners.length > 0) {
    return;
  }
  arrayEvents.forEach(key => {
    delete array[key];
  });
  delete array._chartjs;
}
function _arrayUnique(items) {
  const set2 = new Set(items);
  if (set2.size === items.length) {
    return items;
  }
  return Array.from(set2);
}
const requestAnimFrame = (function () {
  if (typeof window === 'undefined') {
    return function (callback2) {
      return callback2();
    };
  }
  return window.requestAnimationFrame;
})();
function throttled(fn, thisArg) {
  let argsToUse = [];
  let ticking = false;
  return function (...args) {
    argsToUse = args;
    if (!ticking) {
      ticking = true;
      requestAnimFrame.call(window, () => {
        ticking = false;
        fn.apply(thisArg, argsToUse);
      });
    }
  };
}
function debounce(fn, delay) {
  let timeout;
  return function (...args) {
    if (delay) {
      clearTimeout(timeout);
      timeout = setTimeout(fn, delay, args);
    } else {
      fn.apply(this, args);
    }
    return delay;
  };
}
const _toLeftRightCenter = align =>
  align === 'start' ? 'left' : align === 'end' ? 'right' : 'center';
const _alignStartEnd = (align, start, end) =>
  align === 'start' ? start : align === 'end' ? end : (start + end) / 2;
const _textX = (align, left, right, rtl) => {
  const check = rtl ? 'left' : 'right';
  return align === check ? right : align === 'center' ? (left + right) / 2 : left;
};
function _getStartAndCountOfVisiblePoints(meta, points, animationsDisabled) {
  const pointCount = points.length;
  let start = 0;
  let count = pointCount;
  if (meta._sorted) {
    const { iScale, vScale, _parsed } = meta;
    const spanGaps = meta.dataset
      ? meta.dataset.options
        ? meta.dataset.options.spanGaps
        : null
      : null;
    const axis = iScale.axis;
    const { min, max, minDefined, maxDefined } = iScale.getUserBounds();
    if (minDefined) {
      start = Math.min(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, axis, min).lo,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled
          ? pointCount
          : _lookupByKey(points, axis, iScale.getPixelForValue(min)).lo,
      );
      if (spanGaps) {
        const distanceToDefinedLo = _parsed
          .slice(0, start + 1)
          .reverse()
          .findIndex(point => !isNullOrUndef(point[vScale.axis]));
        start -= Math.max(0, distanceToDefinedLo);
      }
      start = _limitValue(start, 0, pointCount - 1);
    }
    if (maxDefined) {
      let end = Math.max(
        // @ts-expect-error Need to type _parsed
        _lookupByKey(_parsed, iScale.axis, max, true).hi + 1,
        // @ts-expect-error Need to fix types on _lookupByKey
        animationsDisabled
          ? 0
          : _lookupByKey(points, axis, iScale.getPixelForValue(max), true).hi + 1,
      );
      if (spanGaps) {
        const distanceToDefinedHi = _parsed
          .slice(end - 1)
          .findIndex(point => !isNullOrUndef(point[vScale.axis]));
        end += Math.max(0, distanceToDefinedHi);
      }
      count = _limitValue(end, start, pointCount) - start;
    } else {
      count = pointCount - start;
    }
  }
  return {
    start,
    count,
  };
}
function _scaleRangesChanged(meta) {
  const { xScale, yScale, _scaleRanges } = meta;
  const newRanges = {
    xmin: xScale.min,
    xmax: xScale.max,
    ymin: yScale.min,
    ymax: yScale.max,
  };
  if (!_scaleRanges) {
    meta._scaleRanges = newRanges;
    return true;
  }
  const changed =
    _scaleRanges.xmin !== xScale.min ||
    _scaleRanges.xmax !== xScale.max ||
    _scaleRanges.ymin !== yScale.min ||
    _scaleRanges.ymax !== yScale.max;
  Object.assign(_scaleRanges, newRanges);
  return changed;
}
const atEdge = t => t === 0 || t === 1;
const elasticIn = (t, s, p) => -(Math.pow(2, 10 * (t -= 1)) * Math.sin(((t - s) * TAU) / p));
const elasticOut = (t, s, p) => Math.pow(2, -10 * t) * Math.sin(((t - s) * TAU) / p) + 1;
const effects = {
  linear: t => t,
  easeInQuad: t => t * t,
  easeOutQuad: t => -t * (t - 2),
  easeInOutQuad: t => ((t /= 0.5) < 1 ? 0.5 * t * t : -0.5 * (--t * (t - 2) - 1)),
  easeInCubic: t => t * t * t,
  easeOutCubic: t => (t -= 1) * t * t + 1,
  easeInOutCubic: t => ((t /= 0.5) < 1 ? 0.5 * t * t * t : 0.5 * ((t -= 2) * t * t + 2)),
  easeInQuart: t => t * t * t * t,
  easeOutQuart: t => -((t -= 1) * t * t * t - 1),
  easeInOutQuart: t => ((t /= 0.5) < 1 ? 0.5 * t * t * t * t : -0.5 * ((t -= 2) * t * t * t - 2)),
  easeInQuint: t => t * t * t * t * t,
  easeOutQuint: t => (t -= 1) * t * t * t * t + 1,
  easeInOutQuint: t =>
    (t /= 0.5) < 1 ? 0.5 * t * t * t * t * t : 0.5 * ((t -= 2) * t * t * t * t + 2),
  easeInSine: t => -Math.cos(t * HALF_PI) + 1,
  easeOutSine: t => Math.sin(t * HALF_PI),
  easeInOutSine: t => -0.5 * (Math.cos(PI * t) - 1),
  easeInExpo: t => (t === 0 ? 0 : Math.pow(2, 10 * (t - 1))),
  easeOutExpo: t => (t === 1 ? 1 : -Math.pow(2, -10 * t) + 1),
  easeInOutExpo: t =>
    atEdge(t)
      ? t
      : t < 0.5
        ? 0.5 * Math.pow(2, 10 * (t * 2 - 1))
        : 0.5 * (-Math.pow(2, -10 * (t * 2 - 1)) + 2),
  easeInCirc: t => (t >= 1 ? t : -(Math.sqrt(1 - t * t) - 1)),
  easeOutCirc: t => Math.sqrt(1 - (t -= 1) * t),
  easeInOutCirc: t =>
    (t /= 0.5) < 1 ? -0.5 * (Math.sqrt(1 - t * t) - 1) : 0.5 * (Math.sqrt(1 - (t -= 2) * t) + 1),
  easeInElastic: t => (atEdge(t) ? t : elasticIn(t, 0.075, 0.3)),
  easeOutElastic: t => (atEdge(t) ? t : elasticOut(t, 0.075, 0.3)),
  easeInOutElastic(t) {
    const s = 0.1125;
    const p = 0.45;
    return atEdge(t)
      ? t
      : t < 0.5
        ? 0.5 * elasticIn(t * 2, s, p)
        : 0.5 + 0.5 * elasticOut(t * 2 - 1, s, p);
  },
  easeInBack(t) {
    const s = 1.70158;
    return t * t * ((s + 1) * t - s);
  },
  easeOutBack(t) {
    const s = 1.70158;
    return (t -= 1) * t * ((s + 1) * t + s) + 1;
  },
  easeInOutBack(t) {
    let s = 1.70158;
    if ((t /= 0.5) < 1) {
      return 0.5 * (t * t * (((s *= 1.525) + 1) * t - s));
    }
    return 0.5 * ((t -= 2) * t * (((s *= 1.525) + 1) * t + s) + 2);
  },
  easeInBounce: t => 1 - effects.easeOutBounce(1 - t),
  easeOutBounce(t) {
    const m = 7.5625;
    const d = 2.75;
    if (t < 1 / d) {
      return m * t * t;
    }
    if (t < 2 / d) {
      return m * (t -= 1.5 / d) * t + 0.75;
    }
    if (t < 2.5 / d) {
      return m * (t -= 2.25 / d) * t + 0.9375;
    }
    return m * (t -= 2.625 / d) * t + 0.984375;
  },
  easeInOutBounce: t =>
    t < 0.5 ? effects.easeInBounce(t * 2) * 0.5 : effects.easeOutBounce(t * 2 - 1) * 0.5 + 0.5,
};
function isPatternOrGradient(value) {
  if (value && typeof value === 'object') {
    const type = value.toString();
    return type === '[object CanvasPattern]' || type === '[object CanvasGradient]';
  }
  return false;
}
function color(value) {
  return isPatternOrGradient(value) ? value : new Color(value);
}
function getHoverColor(value) {
  return isPatternOrGradient(value)
    ? value
    : new Color(value).saturate(0.5).darken(0.1).hexString();
}
const numbers = ['x', 'y', 'borderWidth', 'radius', 'tension'];
const colors = ['color', 'borderColor', 'backgroundColor'];
function applyAnimationsDefaults(defaults2) {
  defaults2.set('animation', {
    delay: void 0,
    duration: 1e3,
    easing: 'easeOutQuart',
    fn: void 0,
    from: void 0,
    loop: void 0,
    to: void 0,
    type: void 0,
  });
  defaults2.describe('animation', {
    _fallback: false,
    _indexable: false,
    _scriptable: name => name !== 'onProgress' && name !== 'onComplete' && name !== 'fn',
  });
  defaults2.set('animations', {
    colors: {
      type: 'color',
      properties: colors,
    },
    numbers: {
      type: 'number',
      properties: numbers,
    },
  });
  defaults2.describe('animations', {
    _fallback: 'animation',
  });
  defaults2.set('transitions', {
    active: {
      animation: {
        duration: 400,
      },
    },
    resize: {
      animation: {
        duration: 0,
      },
    },
    show: {
      animations: {
        colors: {
          from: 'transparent',
        },
        visible: {
          type: 'boolean',
          duration: 0,
        },
      },
    },
    hide: {
      animations: {
        colors: {
          to: 'transparent',
        },
        visible: {
          type: 'boolean',
          easing: 'linear',
          fn: v => v | 0,
        },
      },
    },
  });
}
function applyLayoutsDefaults(defaults2) {
  defaults2.set('layout', {
    autoPadding: true,
    padding: {
      top: 0,
      right: 0,
      bottom: 0,
      left: 0,
    },
  });
}
const intlCache = /* @__PURE__ */ new Map();
function getNumberFormat(locale, options) {
  options = options || {};
  const cacheKey = locale + JSON.stringify(options);
  let formatter = intlCache.get(cacheKey);
  if (!formatter) {
    formatter = new Intl.NumberFormat(locale, options);
    intlCache.set(cacheKey, formatter);
  }
  return formatter;
}
function formatNumber(num, locale, options) {
  return getNumberFormat(locale, options).format(num);
}
const formatters = {
  values(value) {
    return isArray(value) ? value : '' + value;
  },
  numeric(tickValue, index, ticks) {
    if (tickValue === 0) {
      return '0';
    }
    const locale = this.chart.options.locale;
    let notation;
    let delta = tickValue;
    if (ticks.length > 1) {
      const maxTick = Math.max(Math.abs(ticks[0].value), Math.abs(ticks[ticks.length - 1].value));
      if (maxTick < 1e-4 || maxTick > 1e15) {
        notation = 'scientific';
      }
      delta = calculateDelta(tickValue, ticks);
    }
    const logDelta = log10(Math.abs(delta));
    const numDecimal = isNaN(logDelta) ? 1 : Math.max(Math.min(-1 * Math.floor(logDelta), 20), 0);
    const options = {
      notation,
      minimumFractionDigits: numDecimal,
      maximumFractionDigits: numDecimal,
    };
    Object.assign(options, this.options.ticks.format);
    return formatNumber(tickValue, locale, options);
  },
};
function calculateDelta(tickValue, ticks) {
  let delta = ticks.length > 3 ? ticks[2].value - ticks[1].value : ticks[1].value - ticks[0].value;
  if (Math.abs(delta) >= 1 && tickValue !== Math.floor(tickValue)) {
    delta = tickValue - Math.floor(tickValue);
  }
  return delta;
}
var Ticks = {
  formatters,
};
function applyScaleDefaults(defaults2) {
  defaults2.set('scale', {
    display: true,
    offset: false,
    reverse: false,
    beginAtZero: false,
    bounds: 'ticks',
    clip: true,
    grace: 0,
    grid: {
      display: true,
      lineWidth: 1,
      drawOnChartArea: true,
      drawTicks: true,
      tickLength: 8,
      tickWidth: (_ctx, options) => options.lineWidth,
      tickColor: (_ctx, options) => options.color,
      offset: false,
    },
    border: {
      display: true,
      dash: [],
      dashOffset: 0,
      width: 1,
    },
    title: {
      display: false,
      text: '',
      padding: {
        top: 4,
        bottom: 4,
      },
    },
    ticks: {
      minRotation: 0,
      maxRotation: 50,
      mirror: false,
      textStrokeWidth: 0,
      textStrokeColor: '',
      padding: 3,
      display: true,
      autoSkip: true,
      autoSkipPadding: 3,
      labelOffset: 0,
      callback: Ticks.formatters.values,
      minor: {},
      major: {},
      align: 'center',
      crossAlign: 'near',
      showLabelBackdrop: false,
      backdropColor: 'rgba(255, 255, 255, 0.75)',
      backdropPadding: 2,
    },
  });
  defaults2.route('scale.ticks', 'color', '', 'color');
  defaults2.route('scale.grid', 'color', '', 'borderColor');
  defaults2.route('scale.border', 'color', '', 'borderColor');
  defaults2.route('scale.title', 'color', '', 'color');
  defaults2.describe('scale', {
    _fallback: false,
    _scriptable: name =>
      !name.startsWith('before') &&
      !name.startsWith('after') &&
      name !== 'callback' &&
      name !== 'parser',
    _indexable: name => name !== 'borderDash' && name !== 'tickBorderDash' && name !== 'dash',
  });
  defaults2.describe('scales', {
    _fallback: 'scale',
  });
  defaults2.describe('scale.ticks', {
    _scriptable: name => name !== 'backdropPadding' && name !== 'callback',
    _indexable: name => name !== 'backdropPadding',
  });
}
const overrides = /* @__PURE__ */ Object.create(null);
const descriptors = /* @__PURE__ */ Object.create(null);
function getScope$1(node, key) {
  if (!key) {
    return node;
  }
  const keys = key.split('.');
  for (let i = 0, n = keys.length; i < n; ++i) {
    const k = keys[i];
    node = node[k] || (node[k] = /* @__PURE__ */ Object.create(null));
  }
  return node;
}
function set(root, scope, values) {
  if (typeof scope === 'string') {
    return merge(getScope$1(root, scope), values);
  }
  return merge(getScope$1(root, ''), scope);
}
class Defaults {
  constructor(_descriptors2, _appliers) {
    this.animation = void 0;
    this.backgroundColor = 'rgba(0,0,0,0.1)';
    this.borderColor = 'rgba(0,0,0,0.1)';
    this.color = '#666';
    this.datasets = {};
    this.devicePixelRatio = context => context.chart.platform.getDevicePixelRatio();
    this.elements = {};
    this.events = ['mousemove', 'mouseout', 'click', 'touchstart', 'touchmove'];
    this.font = {
      family: "'Helvetica Neue', 'Helvetica', 'Arial', sans-serif",
      size: 12,
      style: 'normal',
      lineHeight: 1.2,
      weight: null,
    };
    this.hover = {};
    this.hoverBackgroundColor = (ctx, options) => getHoverColor(options.backgroundColor);
    this.hoverBorderColor = (ctx, options) => getHoverColor(options.borderColor);
    this.hoverColor = (ctx, options) => getHoverColor(options.color);
    this.indexAxis = 'x';
    this.interaction = {
      mode: 'nearest',
      intersect: true,
      includeInvisible: false,
    };
    this.maintainAspectRatio = true;
    this.onHover = null;
    this.onClick = null;
    this.parsing = true;
    this.plugins = {};
    this.responsive = true;
    this.scale = void 0;
    this.scales = {};
    this.showLine = true;
    this.drawActiveElementsOnTop = true;
    this.describe(_descriptors2);
    this.apply(_appliers);
  }
  set(scope, values) {
    return set(this, scope, values);
  }
  get(scope) {
    return getScope$1(this, scope);
  }
  describe(scope, values) {
    return set(descriptors, scope, values);
  }
  override(scope, values) {
    return set(overrides, scope, values);
  }
  route(scope, name, targetScope, targetName) {
    const scopeObject = getScope$1(this, scope);
    const targetScopeObject = getScope$1(this, targetScope);
    const privateName = '_' + name;
    Object.defineProperties(scopeObject, {
      [privateName]: {
        value: scopeObject[name],
        writable: true,
      },
      [name]: {
        enumerable: true,
        get() {
          const local = this[privateName];
          const target = targetScopeObject[targetName];
          if (isObject(local)) {
            return Object.assign({}, target, local);
          }
          return valueOrDefault(local, target);
        },
        set(value) {
          this[privateName] = value;
        },
      },
    });
  }
  apply(appliers) {
    appliers.forEach(apply => apply(this));
  }
}
var defaults = /* @__PURE__ */ new Defaults(
  {
    _scriptable: name => !name.startsWith('on'),
    _indexable: name => name !== 'events',
    hover: {
      _fallback: 'interaction',
    },
    interaction: {
      _scriptable: false,
      _indexable: false,
    },
  },
  [applyAnimationsDefaults, applyLayoutsDefaults, applyScaleDefaults],
);
function toFontString(font) {
  if (!font || isNullOrUndef(font.size) || isNullOrUndef(font.family)) {
    return null;
  }
  return (
    (font.style ? font.style + ' ' : '') +
    (font.weight ? font.weight + ' ' : '') +
    font.size +
    'px ' +
    font.family
  );
}
function _measureText(ctx, data, gc, longest, string) {
  let textWidth = data[string];
  if (!textWidth) {
    textWidth = data[string] = ctx.measureText(string).width;
    gc.push(string);
  }
  if (textWidth > longest) {
    longest = textWidth;
  }
  return longest;
}
function _alignPixel(chart, pixel, width) {
  const devicePixelRatio = chart.currentDevicePixelRatio;
  const halfWidth = width !== 0 ? Math.max(width / 2, 0.5) : 0;
  return Math.round((pixel - halfWidth) * devicePixelRatio) / devicePixelRatio + halfWidth;
}
function clearCanvas(canvas, ctx) {
  if (!ctx && !canvas) {
    return;
  }
  ctx = ctx || canvas.getContext('2d');
  ctx.save();
  ctx.resetTransform();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.restore();
}
function drawPoint(ctx, options, x, y) {
  drawPointLegend(ctx, options, x, y, null);
}
function drawPointLegend(ctx, options, x, y, w) {
  let type, xOffset, yOffset, size, cornerRadius, width, xOffsetW, yOffsetW;
  const style = options.pointStyle;
  const rotation = options.rotation;
  const radius = options.radius;
  let rad = (rotation || 0) * RAD_PER_DEG;
  if (style && typeof style === 'object') {
    type = style.toString();
    if (type === '[object HTMLImageElement]' || type === '[object HTMLCanvasElement]') {
      ctx.save();
      ctx.translate(x, y);
      ctx.rotate(rad);
      ctx.drawImage(style, -style.width / 2, -style.height / 2, style.width, style.height);
      ctx.restore();
      return;
    }
  }
  if (isNaN(radius) || radius <= 0) {
    return;
  }
  ctx.beginPath();
  switch (style) {
    // Default includes circle
    default:
      if (w) {
        ctx.ellipse(x, y, w / 2, radius, 0, 0, TAU);
      } else {
        ctx.arc(x, y, radius, 0, TAU);
      }
      ctx.closePath();
      break;
    case 'triangle':
      width = w ? w / 2 : radius;
      ctx.moveTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      rad += TWO_THIRDS_PI;
      ctx.lineTo(x + Math.sin(rad) * width, y - Math.cos(rad) * radius);
      ctx.closePath();
      break;
    case 'rectRounded':
      cornerRadius = radius * 0.516;
      size = radius - cornerRadius;
      xOffset = Math.cos(rad + QUARTER_PI) * size;
      xOffsetW = Math.cos(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
      yOffset = Math.sin(rad + QUARTER_PI) * size;
      yOffsetW = Math.sin(rad + QUARTER_PI) * (w ? w / 2 - cornerRadius : size);
      ctx.arc(x - xOffsetW, y - yOffset, cornerRadius, rad - PI, rad - HALF_PI);
      ctx.arc(x + yOffsetW, y - xOffset, cornerRadius, rad - HALF_PI, rad);
      ctx.arc(x + xOffsetW, y + yOffset, cornerRadius, rad, rad + HALF_PI);
      ctx.arc(x - yOffsetW, y + xOffset, cornerRadius, rad + HALF_PI, rad + PI);
      ctx.closePath();
      break;
    case 'rect':
      if (!rotation) {
        size = Math.SQRT1_2 * radius;
        width = w ? w / 2 : size;
        ctx.rect(x - width, y - size, 2 * width, 2 * size);
        break;
      }
      rad += QUARTER_PI;
    /* falls through */
    case 'rectRot':
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      ctx.closePath();
      break;
    case 'crossRot':
      rad += QUARTER_PI;
    /* falls through */
    case 'cross':
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      break;
    case 'star':
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      rad += QUARTER_PI;
      xOffsetW = Math.cos(rad) * (w ? w / 2 : radius);
      xOffset = Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      yOffsetW = Math.sin(rad) * (w ? w / 2 : radius);
      ctx.moveTo(x - xOffsetW, y - yOffset);
      ctx.lineTo(x + xOffsetW, y + yOffset);
      ctx.moveTo(x + yOffsetW, y - xOffset);
      ctx.lineTo(x - yOffsetW, y + xOffset);
      break;
    case 'line':
      xOffset = w ? w / 2 : Math.cos(rad) * radius;
      yOffset = Math.sin(rad) * radius;
      ctx.moveTo(x - xOffset, y - yOffset);
      ctx.lineTo(x + xOffset, y + yOffset);
      break;
    case 'dash':
      ctx.moveTo(x, y);
      ctx.lineTo(x + Math.cos(rad) * (w ? w / 2 : radius), y + Math.sin(rad) * radius);
      break;
    case false:
      ctx.closePath();
      break;
  }
  ctx.fill();
  if (options.borderWidth > 0) {
    ctx.stroke();
  }
}
function _isPointInArea(point, area, margin) {
  margin = margin || 0.5;
  return (
    !area ||
    (point &&
      point.x > area.left - margin &&
      point.x < area.right + margin &&
      point.y > area.top - margin &&
      point.y < area.bottom + margin)
  );
}
function clipArea(ctx, area) {
  ctx.save();
  ctx.beginPath();
  ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
  ctx.clip();
}
function unclipArea(ctx) {
  ctx.restore();
}
function _steppedLineTo(ctx, previous, target, flip, mode) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  if (mode === 'middle') {
    const midpoint = (previous.x + target.x) / 2;
    ctx.lineTo(midpoint, previous.y);
    ctx.lineTo(midpoint, target.y);
  } else if ((mode === 'after') !== !!flip) {
    ctx.lineTo(previous.x, target.y);
  } else {
    ctx.lineTo(target.x, previous.y);
  }
  ctx.lineTo(target.x, target.y);
}
function _bezierCurveTo(ctx, previous, target, flip) {
  if (!previous) {
    return ctx.lineTo(target.x, target.y);
  }
  ctx.bezierCurveTo(
    flip ? previous.cp1x : previous.cp2x,
    flip ? previous.cp1y : previous.cp2y,
    flip ? target.cp2x : target.cp1x,
    flip ? target.cp2y : target.cp1y,
    target.x,
    target.y,
  );
}
function setRenderOpts(ctx, opts) {
  if (opts.translation) {
    ctx.translate(opts.translation[0], opts.translation[1]);
  }
  if (!isNullOrUndef(opts.rotation)) {
    ctx.rotate(opts.rotation);
  }
  if (opts.color) {
    ctx.fillStyle = opts.color;
  }
  if (opts.textAlign) {
    ctx.textAlign = opts.textAlign;
  }
  if (opts.textBaseline) {
    ctx.textBaseline = opts.textBaseline;
  }
}
function decorateText(ctx, x, y, line, opts) {
  if (opts.strikethrough || opts.underline) {
    const metrics = ctx.measureText(line);
    const left = x - metrics.actualBoundingBoxLeft;
    const right = x + metrics.actualBoundingBoxRight;
    const top = y - metrics.actualBoundingBoxAscent;
    const bottom = y + metrics.actualBoundingBoxDescent;
    const yDecoration = opts.strikethrough ? (top + bottom) / 2 : bottom;
    ctx.strokeStyle = ctx.fillStyle;
    ctx.beginPath();
    ctx.lineWidth = opts.decorationWidth || 2;
    ctx.moveTo(left, yDecoration);
    ctx.lineTo(right, yDecoration);
    ctx.stroke();
  }
}
function drawBackdrop(ctx, opts) {
  const oldColor = ctx.fillStyle;
  ctx.fillStyle = opts.color;
  ctx.fillRect(opts.left, opts.top, opts.width, opts.height);
  ctx.fillStyle = oldColor;
}
function renderText(ctx, text, x, y, font, opts = {}) {
  const lines = isArray(text) ? text : [text];
  const stroke = opts.strokeWidth > 0 && opts.strokeColor !== '';
  let i, line;
  ctx.save();
  ctx.font = font.string;
  setRenderOpts(ctx, opts);
  for (i = 0; i < lines.length; ++i) {
    line = lines[i];
    if (opts.backdrop) {
      drawBackdrop(ctx, opts.backdrop);
    }
    if (stroke) {
      if (opts.strokeColor) {
        ctx.strokeStyle = opts.strokeColor;
      }
      if (!isNullOrUndef(opts.strokeWidth)) {
        ctx.lineWidth = opts.strokeWidth;
      }
      ctx.strokeText(line, x, y, opts.maxWidth);
    }
    ctx.fillText(line, x, y, opts.maxWidth);
    decorateText(ctx, x, y, line, opts);
    y += Number(font.lineHeight);
  }
  ctx.restore();
}
function addRoundedRectPath(ctx, rect) {
  const { x, y, w, h, radius } = rect;
  ctx.arc(x + radius.topLeft, y + radius.topLeft, radius.topLeft, 1.5 * PI, PI, true);
  ctx.lineTo(x, y + h - radius.bottomLeft);
  ctx.arc(x + radius.bottomLeft, y + h - radius.bottomLeft, radius.bottomLeft, PI, HALF_PI, true);
  ctx.lineTo(x + w - radius.bottomRight, y + h);
  ctx.arc(
    x + w - radius.bottomRight,
    y + h - radius.bottomRight,
    radius.bottomRight,
    HALF_PI,
    0,
    true,
  );
  ctx.lineTo(x + w, y + radius.topRight);
  ctx.arc(x + w - radius.topRight, y + radius.topRight, radius.topRight, 0, -HALF_PI, true);
  ctx.lineTo(x + radius.topLeft, y);
}
const LINE_HEIGHT = /^(normal|(\d+(?:\.\d+)?)(px|em|%)?)$/;
const FONT_STYLE = /^(normal|italic|initial|inherit|unset|(oblique( -?[0-9]?[0-9]deg)?))$/;
function toLineHeight(value, size) {
  const matches = ('' + value).match(LINE_HEIGHT);
  if (!matches || matches[1] === 'normal') {
    return size * 1.2;
  }
  value = +matches[2];
  switch (matches[3]) {
    case 'px':
      return value;
    case '%':
      value /= 100;
      break;
  }
  return size * value;
}
const numberOrZero = v => +v || 0;
function _readValueToProps(value, props) {
  const ret = {};
  const objProps = isObject(props);
  const keys = objProps ? Object.keys(props) : props;
  const read = isObject(value)
    ? objProps
      ? prop => valueOrDefault(value[prop], value[props[prop]])
      : prop => value[prop]
    : () => value;
  for (const prop of keys) {
    ret[prop] = numberOrZero(read(prop));
  }
  return ret;
}
function toTRBL(value) {
  return _readValueToProps(value, {
    top: 'y',
    right: 'x',
    bottom: 'y',
    left: 'x',
  });
}
function toTRBLCorners(value) {
  return _readValueToProps(value, ['topLeft', 'topRight', 'bottomLeft', 'bottomRight']);
}
function toPadding(value) {
  const obj = toTRBL(value);
  obj.width = obj.left + obj.right;
  obj.height = obj.top + obj.bottom;
  return obj;
}
function toFont(options, fallback) {
  options = options || {};
  fallback = fallback || defaults.font;
  let size = valueOrDefault(options.size, fallback.size);
  if (typeof size === 'string') {
    size = parseInt(size, 10);
  }
  let style = valueOrDefault(options.style, fallback.style);
  if (style && !('' + style).match(FONT_STYLE)) {
    console.warn('Invalid font style specified: "' + style + '"');
    style = void 0;
  }
  const font = {
    family: valueOrDefault(options.family, fallback.family),
    lineHeight: toLineHeight(valueOrDefault(options.lineHeight, fallback.lineHeight), size),
    size,
    style,
    weight: valueOrDefault(options.weight, fallback.weight),
    string: '',
  };
  font.string = toFontString(font);
  return font;
}
function resolve(inputs, context, index, info) {
  let i, ilen, value;
  for (i = 0, ilen = inputs.length; i < ilen; ++i) {
    value = inputs[i];
    if (value === void 0) {
      continue;
    }
    if (context !== void 0 && typeof value === 'function') {
      value = value(context);
    }
    if (index !== void 0 && isArray(value)) {
      value = value[index % value.length];
    }
    if (value !== void 0) {
      return value;
    }
  }
}
function _addGrace(minmax, grace, beginAtZero) {
  const { min, max } = minmax;
  const change = toDimension(grace, (max - min) / 2);
  const keepZero = (value, add) => (beginAtZero && value === 0 ? 0 : value + add);
  return {
    min: keepZero(min, -Math.abs(change)),
    max: keepZero(max, change),
  };
}
function createContext(parentContext, context) {
  return Object.assign(Object.create(parentContext), context);
}
function _createResolver(
  scopes,
  prefixes = [''],
  rootScopes,
  fallback,
  getTarget = () => scopes[0],
) {
  const finalRootScopes = rootScopes || scopes;
  if (typeof fallback === 'undefined') {
    fallback = _resolve('_fallback', scopes);
  }
  const cache = {
    [Symbol.toStringTag]: 'Object',
    _cacheable: true,
    _scopes: scopes,
    _rootScopes: finalRootScopes,
    _fallback: fallback,
    _getTarget: getTarget,
    override: scope => _createResolver([scope, ...scopes], prefixes, finalRootScopes, fallback),
  };
  return new Proxy(cache, {
    /**
     * A trap for the delete operator.
     */
    deleteProperty(target, prop) {
      delete target[prop];
      delete target._keys;
      delete scopes[0][prop];
      return true;
    },
    /**
     * A trap for getting property values.
     */
    get(target, prop) {
      return _cached(target, prop, () => _resolveWithPrefixes(prop, prefixes, scopes, target));
    },
    /**
     * A trap for Object.getOwnPropertyDescriptor.
     * Also used by Object.hasOwnProperty.
     */
    getOwnPropertyDescriptor(target, prop) {
      return Reflect.getOwnPropertyDescriptor(target._scopes[0], prop);
    },
    /**
     * A trap for Object.getPrototypeOf.
     */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(scopes[0]);
    },
    /**
     * A trap for the in operator.
     */
    has(target, prop) {
      return getKeysFromAllScopes(target).includes(prop);
    },
    /**
     * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
     */
    ownKeys(target) {
      return getKeysFromAllScopes(target);
    },
    /**
     * A trap for setting property values.
     */
    set(target, prop, value) {
      const storage = target._storage || (target._storage = getTarget());
      target[prop] = storage[prop] = value;
      delete target._keys;
      return true;
    },
  });
}
function _attachContext(proxy, context, subProxy, descriptorDefaults) {
  const cache = {
    _cacheable: false,
    _proxy: proxy,
    _context: context,
    _subProxy: subProxy,
    _stack: /* @__PURE__ */ new Set(),
    _descriptors: _descriptors(proxy, descriptorDefaults),
    setContext: ctx => _attachContext(proxy, ctx, subProxy, descriptorDefaults),
    override: scope => _attachContext(proxy.override(scope), context, subProxy, descriptorDefaults),
  };
  return new Proxy(cache, {
    /**
     * A trap for the delete operator.
     */
    deleteProperty(target, prop) {
      delete target[prop];
      delete proxy[prop];
      return true;
    },
    /**
     * A trap for getting property values.
     */
    get(target, prop, receiver) {
      return _cached(target, prop, () => _resolveWithContext(target, prop, receiver));
    },
    /**
     * A trap for Object.getOwnPropertyDescriptor.
     * Also used by Object.hasOwnProperty.
     */
    getOwnPropertyDescriptor(target, prop) {
      return target._descriptors.allKeys
        ? Reflect.has(proxy, prop)
          ? {
              enumerable: true,
              configurable: true,
            }
          : void 0
        : Reflect.getOwnPropertyDescriptor(proxy, prop);
    },
    /**
     * A trap for Object.getPrototypeOf.
     */
    getPrototypeOf() {
      return Reflect.getPrototypeOf(proxy);
    },
    /**
     * A trap for the in operator.
     */
    has(target, prop) {
      return Reflect.has(proxy, prop);
    },
    /**
     * A trap for Object.getOwnPropertyNames and Object.getOwnPropertySymbols.
     */
    ownKeys() {
      return Reflect.ownKeys(proxy);
    },
    /**
     * A trap for setting property values.
     */
    set(target, prop, value) {
      proxy[prop] = value;
      delete target[prop];
      return true;
    },
  });
}
function _descriptors(
  proxy,
  defaults2 = {
    scriptable: true,
    indexable: true,
  },
) {
  const {
    _scriptable = defaults2.scriptable,
    _indexable = defaults2.indexable,
    _allKeys = defaults2.allKeys,
  } = proxy;
  return {
    allKeys: _allKeys,
    scriptable: _scriptable,
    indexable: _indexable,
    isScriptable: isFunction(_scriptable) ? _scriptable : () => _scriptable,
    isIndexable: isFunction(_indexable) ? _indexable : () => _indexable,
  };
}
const readKey = (prefix, name) => (prefix ? prefix + _capitalize(name) : name);
const needsSubResolver = (prop, value) =>
  isObject(value) &&
  prop !== 'adapters' &&
  (Object.getPrototypeOf(value) === null || value.constructor === Object);
function _cached(target, prop, resolve2) {
  if (Object.prototype.hasOwnProperty.call(target, prop) || prop === 'constructor') {
    return target[prop];
  }
  const value = resolve2();
  target[prop] = value;
  return value;
}
function _resolveWithContext(target, prop, receiver) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  let value = _proxy[prop];
  if (isFunction(value) && descriptors2.isScriptable(prop)) {
    value = _resolveScriptable(prop, value, target, receiver);
  }
  if (isArray(value) && value.length) {
    value = _resolveArray(prop, value, target, descriptors2.isIndexable);
  }
  if (needsSubResolver(prop, value)) {
    value = _attachContext(value, _context, _subProxy && _subProxy[prop], descriptors2);
  }
  return value;
}
function _resolveScriptable(prop, getValue, target, receiver) {
  const { _proxy, _context, _subProxy, _stack } = target;
  if (_stack.has(prop)) {
    throw new Error('Recursion detected: ' + Array.from(_stack).join('->') + '->' + prop);
  }
  _stack.add(prop);
  let value = getValue(_context, _subProxy || receiver);
  _stack.delete(prop);
  if (needsSubResolver(prop, value)) {
    value = createSubResolver(_proxy._scopes, _proxy, prop, value);
  }
  return value;
}
function _resolveArray(prop, value, target, isIndexable) {
  const { _proxy, _context, _subProxy, _descriptors: descriptors2 } = target;
  if (typeof _context.index !== 'undefined' && isIndexable(prop)) {
    return value[_context.index % value.length];
  } else if (isObject(value[0])) {
    const arr = value;
    const scopes = _proxy._scopes.filter(s => s !== arr);
    value = [];
    for (const item of arr) {
      const resolver = createSubResolver(scopes, _proxy, prop, item);
      value.push(_attachContext(resolver, _context, _subProxy && _subProxy[prop], descriptors2));
    }
  }
  return value;
}
function resolveFallback(fallback, prop, value) {
  return isFunction(fallback) ? fallback(prop, value) : fallback;
}
const getScope = (key, parent) =>
  key === true ? parent : typeof key === 'string' ? resolveObjectKey(parent, key) : void 0;
function addScopes(set2, parentScopes, key, parentFallback, value) {
  for (const parent of parentScopes) {
    const scope = getScope(key, parent);
    if (scope) {
      set2.add(scope);
      const fallback = resolveFallback(scope._fallback, key, value);
      if (typeof fallback !== 'undefined' && fallback !== key && fallback !== parentFallback) {
        return fallback;
      }
    } else if (scope === false && typeof parentFallback !== 'undefined' && key !== parentFallback) {
      return null;
    }
  }
  return false;
}
function createSubResolver(parentScopes, resolver, prop, value) {
  const rootScopes = resolver._rootScopes;
  const fallback = resolveFallback(resolver._fallback, prop, value);
  const allScopes = [...parentScopes, ...rootScopes];
  const set2 = /* @__PURE__ */ new Set();
  set2.add(value);
  let key = addScopesFromKey(set2, allScopes, prop, fallback || prop, value);
  if (key === null) {
    return false;
  }
  if (typeof fallback !== 'undefined' && fallback !== prop) {
    key = addScopesFromKey(set2, allScopes, fallback, key, value);
    if (key === null) {
      return false;
    }
  }
  return _createResolver(Array.from(set2), [''], rootScopes, fallback, () =>
    subGetTarget(resolver, prop, value),
  );
}
function addScopesFromKey(set2, allScopes, key, fallback, item) {
  while (key) {
    key = addScopes(set2, allScopes, key, fallback, item);
  }
  return key;
}
function subGetTarget(resolver, prop, value) {
  const parent = resolver._getTarget();
  if (!(prop in parent)) {
    parent[prop] = {};
  }
  const target = parent[prop];
  if (isArray(target) && isObject(value)) {
    return value;
  }
  return target || {};
}
function _resolveWithPrefixes(prop, prefixes, scopes, proxy) {
  let value;
  for (const prefix of prefixes) {
    value = _resolve(readKey(prefix, prop), scopes);
    if (typeof value !== 'undefined') {
      return needsSubResolver(prop, value) ? createSubResolver(scopes, proxy, prop, value) : value;
    }
  }
}
function _resolve(key, scopes) {
  for (const scope of scopes) {
    if (!scope) {
      continue;
    }
    const value = scope[key];
    if (typeof value !== 'undefined') {
      return value;
    }
  }
}
function getKeysFromAllScopes(target) {
  let keys = target._keys;
  if (!keys) {
    keys = target._keys = resolveKeysFromAllScopes(target._scopes);
  }
  return keys;
}
function resolveKeysFromAllScopes(scopes) {
  const set2 = /* @__PURE__ */ new Set();
  for (const scope of scopes) {
    for (const key of Object.keys(scope).filter(k => !k.startsWith('_'))) {
      set2.add(key);
    }
  }
  return Array.from(set2);
}
const EPSILON = Number.EPSILON || 1e-14;
const getPoint = (points, i) => i < points.length && !points[i].skip && points[i];
const getValueAxis = indexAxis => (indexAxis === 'x' ? 'y' : 'x');
function splineCurve(firstPoint, middlePoint, afterPoint, t) {
  const previous = firstPoint.skip ? middlePoint : firstPoint;
  const current = middlePoint;
  const next = afterPoint.skip ? middlePoint : afterPoint;
  const d01 = distanceBetweenPoints(current, previous);
  const d12 = distanceBetweenPoints(next, current);
  let s01 = d01 / (d01 + d12);
  let s12 = d12 / (d01 + d12);
  s01 = isNaN(s01) ? 0 : s01;
  s12 = isNaN(s12) ? 0 : s12;
  const fa = t * s01;
  const fb = t * s12;
  return {
    previous: {
      x: current.x - fa * (next.x - previous.x),
      y: current.y - fa * (next.y - previous.y),
    },
    next: {
      x: current.x + fb * (next.x - previous.x),
      y: current.y + fb * (next.y - previous.y),
    },
  };
}
function monotoneAdjust(points, deltaK, mK) {
  const pointsLen = points.length;
  let alphaK, betaK, tauK, squaredMagnitude, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen - 1; ++i) {
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent || !pointAfter) {
      continue;
    }
    if (almostEquals(deltaK[i], 0, EPSILON)) {
      mK[i] = mK[i + 1] = 0;
      continue;
    }
    alphaK = mK[i] / deltaK[i];
    betaK = mK[i + 1] / deltaK[i];
    squaredMagnitude = Math.pow(alphaK, 2) + Math.pow(betaK, 2);
    if (squaredMagnitude <= 9) {
      continue;
    }
    tauK = 3 / Math.sqrt(squaredMagnitude);
    mK[i] = alphaK * tauK * deltaK[i];
    mK[i + 1] = betaK * tauK * deltaK[i];
  }
}
function monotoneCompute(points, mK, indexAxis = 'x') {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  let delta, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (let i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    const iPixel = pointCurrent[indexAxis];
    const vPixel = pointCurrent[valueAxis];
    if (pointBefore) {
      delta = (iPixel - pointBefore[indexAxis]) / 3;
      pointCurrent[`cp1${indexAxis}`] = iPixel - delta;
      pointCurrent[`cp1${valueAxis}`] = vPixel - delta * mK[i];
    }
    if (pointAfter) {
      delta = (pointAfter[indexAxis] - iPixel) / 3;
      pointCurrent[`cp2${indexAxis}`] = iPixel + delta;
      pointCurrent[`cp2${valueAxis}`] = vPixel + delta * mK[i];
    }
  }
}
function splineCurveMonotone(points, indexAxis = 'x') {
  const valueAxis = getValueAxis(indexAxis);
  const pointsLen = points.length;
  const deltaK = Array(pointsLen).fill(0);
  const mK = Array(pointsLen);
  let i, pointBefore, pointCurrent;
  let pointAfter = getPoint(points, 0);
  for (i = 0; i < pointsLen; ++i) {
    pointBefore = pointCurrent;
    pointCurrent = pointAfter;
    pointAfter = getPoint(points, i + 1);
    if (!pointCurrent) {
      continue;
    }
    if (pointAfter) {
      const slopeDelta = pointAfter[indexAxis] - pointCurrent[indexAxis];
      deltaK[i] =
        slopeDelta !== 0 ? (pointAfter[valueAxis] - pointCurrent[valueAxis]) / slopeDelta : 0;
    }
    mK[i] = !pointBefore
      ? deltaK[i]
      : !pointAfter
        ? deltaK[i - 1]
        : sign(deltaK[i - 1]) !== sign(deltaK[i])
          ? 0
          : (deltaK[i - 1] + deltaK[i]) / 2;
  }
  monotoneAdjust(points, deltaK, mK);
  monotoneCompute(points, mK, indexAxis);
}
function capControlPoint(pt, min, max) {
  return Math.max(Math.min(pt, max), min);
}
function capBezierPoints(points, area) {
  let i, ilen, point, inArea, inAreaPrev;
  let inAreaNext = _isPointInArea(points[0], area);
  for (i = 0, ilen = points.length; i < ilen; ++i) {
    inAreaPrev = inArea;
    inArea = inAreaNext;
    inAreaNext = i < ilen - 1 && _isPointInArea(points[i + 1], area);
    if (!inArea) {
      continue;
    }
    point = points[i];
    if (inAreaPrev) {
      point.cp1x = capControlPoint(point.cp1x, area.left, area.right);
      point.cp1y = capControlPoint(point.cp1y, area.top, area.bottom);
    }
    if (inAreaNext) {
      point.cp2x = capControlPoint(point.cp2x, area.left, area.right);
      point.cp2y = capControlPoint(point.cp2y, area.top, area.bottom);
    }
  }
}
function _updateBezierControlPoints(points, options, area, loop, indexAxis) {
  let i, ilen, point, controlPoints;
  if (options.spanGaps) {
    points = points.filter(pt => !pt.skip);
  }
  if (options.cubicInterpolationMode === 'monotone') {
    splineCurveMonotone(points, indexAxis);
  } else {
    let prev = loop ? points[points.length - 1] : points[0];
    for (i = 0, ilen = points.length; i < ilen; ++i) {
      point = points[i];
      controlPoints = splineCurve(
        prev,
        point,
        points[Math.min(i + 1, ilen - (loop ? 0 : 1)) % ilen],
        options.tension,
      );
      point.cp1x = controlPoints.previous.x;
      point.cp1y = controlPoints.previous.y;
      point.cp2x = controlPoints.next.x;
      point.cp2y = controlPoints.next.y;
      prev = point;
    }
  }
  if (options.capBezierPoints) {
    capBezierPoints(points, area);
  }
}
function _isDomSupported() {
  return typeof window !== 'undefined' && typeof document !== 'undefined';
}
function _getParentNode(domNode) {
  let parent = domNode.parentNode;
  if (parent && parent.toString() === '[object ShadowRoot]') {
    parent = parent.host;
  }
  return parent;
}
function parseMaxStyle(styleValue, node, parentProperty) {
  let valueInPixels;
  if (typeof styleValue === 'string') {
    valueInPixels = parseInt(styleValue, 10);
    if (styleValue.indexOf('%') !== -1) {
      valueInPixels = (valueInPixels / 100) * node.parentNode[parentProperty];
    }
  } else {
    valueInPixels = styleValue;
  }
  return valueInPixels;
}
const getComputedStyle = element =>
  element.ownerDocument.defaultView.getComputedStyle(element, null);
function getStyle(el, property) {
  return getComputedStyle(el).getPropertyValue(property);
}
const positions = ['top', 'right', 'bottom', 'left'];
function getPositionedStyle(styles, style, suffix) {
  const result = {};
  suffix = suffix ? '-' + suffix : '';
  for (let i = 0; i < 4; i++) {
    const pos = positions[i];
    result[pos] = parseFloat(styles[style + '-' + pos + suffix]) || 0;
  }
  result.width = result.left + result.right;
  result.height = result.top + result.bottom;
  return result;
}
const useOffsetPos = (x, y, target) => (x > 0 || y > 0) && (!target || !target.shadowRoot);
function getCanvasPosition(e, canvas) {
  const touches = e.touches;
  const source = touches && touches.length ? touches[0] : e;
  const { offsetX, offsetY } = source;
  let box = false;
  let x, y;
  if (useOffsetPos(offsetX, offsetY, e.target)) {
    x = offsetX;
    y = offsetY;
  } else {
    const rect = canvas.getBoundingClientRect();
    x = source.clientX - rect.left;
    y = source.clientY - rect.top;
    box = true;
  }
  return {
    x,
    y,
    box,
  };
}
function getRelativePosition(event, chart) {
  if ('native' in event) {
    return event;
  }
  const { canvas, currentDevicePixelRatio } = chart;
  const style = getComputedStyle(canvas);
  const borderBox = style.boxSizing === 'border-box';
  const paddings = getPositionedStyle(style, 'padding');
  const borders = getPositionedStyle(style, 'border', 'width');
  const { x, y, box } = getCanvasPosition(event, canvas);
  const xOffset = paddings.left + (box && borders.left);
  const yOffset = paddings.top + (box && borders.top);
  let { width, height } = chart;
  if (borderBox) {
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  return {
    x: Math.round((((x - xOffset) / width) * canvas.width) / currentDevicePixelRatio),
    y: Math.round((((y - yOffset) / height) * canvas.height) / currentDevicePixelRatio),
  };
}
function getContainerSize(canvas, width, height) {
  let maxWidth, maxHeight;
  if (width === void 0 || height === void 0) {
    const container = canvas && _getParentNode(canvas);
    if (!container) {
      width = canvas.clientWidth;
      height = canvas.clientHeight;
    } else {
      const rect = container.getBoundingClientRect();
      const containerStyle = getComputedStyle(container);
      const containerBorder = getPositionedStyle(containerStyle, 'border', 'width');
      const containerPadding = getPositionedStyle(containerStyle, 'padding');
      width = rect.width - containerPadding.width - containerBorder.width;
      height = rect.height - containerPadding.height - containerBorder.height;
      maxWidth = parseMaxStyle(containerStyle.maxWidth, container, 'clientWidth');
      maxHeight = parseMaxStyle(containerStyle.maxHeight, container, 'clientHeight');
    }
  }
  return {
    width,
    height,
    maxWidth: maxWidth || INFINITY,
    maxHeight: maxHeight || INFINITY,
  };
}
const round1 = v => Math.round(v * 10) / 10;
function getMaximumSize(canvas, bbWidth, bbHeight, aspectRatio) {
  const style = getComputedStyle(canvas);
  const margins = getPositionedStyle(style, 'margin');
  const maxWidth = parseMaxStyle(style.maxWidth, canvas, 'clientWidth') || INFINITY;
  const maxHeight = parseMaxStyle(style.maxHeight, canvas, 'clientHeight') || INFINITY;
  const containerSize = getContainerSize(canvas, bbWidth, bbHeight);
  let { width, height } = containerSize;
  if (style.boxSizing === 'content-box') {
    const borders = getPositionedStyle(style, 'border', 'width');
    const paddings = getPositionedStyle(style, 'padding');
    width -= paddings.width + borders.width;
    height -= paddings.height + borders.height;
  }
  width = Math.max(0, width - margins.width);
  height = Math.max(0, aspectRatio ? width / aspectRatio : height - margins.height);
  width = round1(Math.min(width, maxWidth, containerSize.maxWidth));
  height = round1(Math.min(height, maxHeight, containerSize.maxHeight));
  if (width && !height) {
    height = round1(width / 2);
  }
  const maintainHeight = bbWidth !== void 0 || bbHeight !== void 0;
  if (maintainHeight && aspectRatio && containerSize.height && height > containerSize.height) {
    height = containerSize.height;
    width = round1(Math.floor(height * aspectRatio));
  }
  return {
    width,
    height,
  };
}
function retinaScale(chart, forceRatio, forceStyle) {
  const pixelRatio = forceRatio || 1;
  const deviceHeight = Math.floor(chart.height * pixelRatio);
  const deviceWidth = Math.floor(chart.width * pixelRatio);
  chart.height = Math.floor(chart.height);
  chart.width = Math.floor(chart.width);
  const canvas = chart.canvas;
  if (canvas.style && (forceStyle || (!canvas.style.height && !canvas.style.width))) {
    canvas.style.height = `${chart.height}px`;
    canvas.style.width = `${chart.width}px`;
  }
  if (
    chart.currentDevicePixelRatio !== pixelRatio ||
    canvas.height !== deviceHeight ||
    canvas.width !== deviceWidth
  ) {
    chart.currentDevicePixelRatio = pixelRatio;
    canvas.height = deviceHeight;
    canvas.width = deviceWidth;
    chart.ctx.setTransform(pixelRatio, 0, 0, pixelRatio, 0, 0);
    return true;
  }
  return false;
}
const supportsEventListenerOptions = (function () {
  let passiveSupported = false;
  try {
    const options = {
      get passive() {
        passiveSupported = true;
        return false;
      },
    };
    if (_isDomSupported()) {
      window.addEventListener('test', null, options);
      window.removeEventListener('test', null, options);
    }
  } catch (e) {}
  return passiveSupported;
})();
function readUsedSize(element, property) {
  const value = getStyle(element, property);
  const matches = value && value.match(/^(\d+)(\.\d+)?px$/);
  return matches ? +matches[1] : void 0;
}
function _pointInLine(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y: p1.y + t * (p2.y - p1.y),
  };
}
function _steppedInterpolation(p1, p2, t, mode) {
  return {
    x: p1.x + t * (p2.x - p1.x),
    y:
      mode === 'middle'
        ? t < 0.5
          ? p1.y
          : p2.y
        : mode === 'after'
          ? t < 1
            ? p1.y
            : p2.y
          : t > 0
            ? p2.y
            : p1.y,
  };
}
function _bezierInterpolation(p1, p2, t, mode) {
  const cp1 = {
    x: p1.cp2x,
    y: p1.cp2y,
  };
  const cp2 = {
    x: p2.cp1x,
    y: p2.cp1y,
  };
  const a = _pointInLine(p1, cp1, t);
  const b = _pointInLine(cp1, cp2, t);
  const c = _pointInLine(cp2, p2, t);
  const d = _pointInLine(a, b, t);
  const e = _pointInLine(b, c, t);
  return _pointInLine(d, e, t);
}
const getRightToLeftAdapter = function (rectX, width) {
  return {
    x(x) {
      return rectX + rectX + width - x;
    },
    setWidth(w) {
      width = w;
    },
    textAlign(align) {
      if (align === 'center') {
        return align;
      }
      return align === 'right' ? 'left' : 'right';
    },
    xPlus(x, value) {
      return x - value;
    },
    leftForLtr(x, itemWidth) {
      return x - itemWidth;
    },
  };
};
const getLeftToRightAdapter = function () {
  return {
    x(x) {
      return x;
    },
    setWidth(w) {},
    textAlign(align) {
      return align;
    },
    xPlus(x, value) {
      return x + value;
    },
    leftForLtr(x, _itemWidth) {
      return x;
    },
  };
};
function getRtlAdapter(rtl, rectX, width) {
  return rtl ? getRightToLeftAdapter(rectX, width) : getLeftToRightAdapter();
}
function overrideTextDirection(ctx, direction) {
  let style, original;
  if (direction === 'ltr' || direction === 'rtl') {
    style = ctx.canvas.style;
    original = [style.getPropertyValue('direction'), style.getPropertyPriority('direction')];
    style.setProperty('direction', direction, 'important');
    ctx.prevTextDirection = original;
  }
}
function restoreTextDirection(ctx, original) {
  if (original !== void 0) {
    delete ctx.prevTextDirection;
    ctx.canvas.style.setProperty('direction', original[0], original[1]);
  }
}
function propertyFn(property) {
  if (property === 'angle') {
    return {
      between: _angleBetween,
      compare: _angleDiff,
      normalize: _normalizeAngle,
    };
  }
  return {
    between: _isBetween,
    compare: (a, b) => a - b,
    normalize: x => x,
  };
}
function normalizeSegment({ start, end, count, loop, style }) {
  return {
    start: start % count,
    end: end % count,
    loop: loop && (end - start + 1) % count === 0,
    style,
  };
}
function getSegment(segment, points, bounds) {
  const { property, start: startBound, end: endBound } = bounds;
  const { between, normalize } = propertyFn(property);
  const count = points.length;
  let { start, end, loop } = segment;
  let i, ilen;
  if (loop) {
    start += count;
    end += count;
    for (i = 0, ilen = count; i < ilen; ++i) {
      if (!between(normalize(points[start % count][property]), startBound, endBound)) {
        break;
      }
      start--;
      end--;
    }
    start %= count;
    end %= count;
  }
  if (end < start) {
    end += count;
  }
  return {
    start,
    end,
    loop,
    style: segment.style,
  };
}
function _boundSegment(segment, points, bounds) {
  if (!bounds) {
    return [segment];
  }
  const { property, start: startBound, end: endBound } = bounds;
  const count = points.length;
  const { compare, between, normalize } = propertyFn(property);
  const { start, end, loop, style } = getSegment(segment, points, bounds);
  const result = [];
  let inside = false;
  let subStart = null;
  let value, point, prevValue;
  const startIsBefore = () =>
    between(startBound, prevValue, value) && compare(startBound, prevValue) !== 0;
  const endIsBefore = () => compare(endBound, value) === 0 || between(endBound, prevValue, value);
  const shouldStart = () => inside || startIsBefore();
  const shouldStop = () => !inside || endIsBefore();
  for (let i = start, prev = start; i <= end; ++i) {
    point = points[i % count];
    if (point.skip) {
      continue;
    }
    value = normalize(point[property]);
    if (value === prevValue) {
      continue;
    }
    inside = between(value, startBound, endBound);
    if (subStart === null && shouldStart()) {
      subStart = compare(value, startBound) === 0 ? i : prev;
    }
    if (subStart !== null && shouldStop()) {
      result.push(
        normalizeSegment({
          start: subStart,
          end: i,
          loop,
          count,
          style,
        }),
      );
      subStart = null;
    }
    prev = i;
    prevValue = value;
  }
  if (subStart !== null) {
    result.push(
      normalizeSegment({
        start: subStart,
        end,
        loop,
        count,
        style,
      }),
    );
  }
  return result;
}
function _boundSegments(line, bounds) {
  const result = [];
  const segments = line.segments;
  for (let i = 0; i < segments.length; i++) {
    const sub = _boundSegment(segments[i], line.points, bounds);
    if (sub.length) {
      result.push(...sub);
    }
  }
  return result;
}
function findStartAndEnd(points, count, loop, spanGaps) {
  let start = 0;
  let end = count - 1;
  if (loop && !spanGaps) {
    while (start < count && !points[start].skip) {
      start++;
    }
  }
  while (start < count && points[start].skip) {
    start++;
  }
  start %= count;
  if (loop) {
    end += start;
  }
  while (end > start && points[end % count].skip) {
    end--;
  }
  end %= count;
  return {
    start,
    end,
  };
}
function solidSegments(points, start, max, loop) {
  const count = points.length;
  const result = [];
  let last = start;
  let prev = points[start];
  let end;
  for (end = start + 1; end <= max; ++end) {
    const cur = points[end % count];
    if (cur.skip || cur.stop) {
      if (!prev.skip) {
        loop = false;
        result.push({
          start: start % count,
          end: (end - 1) % count,
          loop,
        });
        start = last = cur.stop ? end : null;
      }
    } else {
      last = end;
      if (prev.skip) {
        start = end;
      }
    }
    prev = cur;
  }
  if (last !== null) {
    result.push({
      start: start % count,
      end: last % count,
      loop,
    });
  }
  return result;
}
function _computeSegments(line, segmentOptions) {
  const points = line.points;
  const spanGaps = line.options.spanGaps;
  const count = points.length;
  if (!count) {
    return [];
  }
  const loop = !!line._loop;
  const { start, end } = findStartAndEnd(points, count, loop, spanGaps);
  if (spanGaps === true) {
    return splitByStyles(
      line,
      [
        {
          start,
          end,
          loop,
        },
      ],
      points,
      segmentOptions,
    );
  }
  const max = end < start ? end + count : end;
  const completeLoop = !!line._fullLoop && start === 0 && end === count - 1;
  return splitByStyles(
    line,
    solidSegments(points, start, max, completeLoop),
    points,
    segmentOptions,
  );
}
function splitByStyles(line, segments, points, segmentOptions) {
  if (!segmentOptions || !segmentOptions.setContext || !points) {
    return segments;
  }
  return doSplitByStyles(line, segments, points, segmentOptions);
}
function doSplitByStyles(line, segments, points, segmentOptions) {
  const chartContext = line._chart.getContext();
  const baseStyle = readStyle(line.options);
  const {
    _datasetIndex: datasetIndex,
    options: { spanGaps },
  } = line;
  const count = points.length;
  const result = [];
  let prevStyle = baseStyle;
  let start = segments[0].start;
  let i = start;
  function addStyle(s, e, l, st) {
    const dir = spanGaps ? -1 : 1;
    if (s === e) {
      return;
    }
    s += count;
    while (points[s % count].skip) {
      s -= dir;
    }
    while (points[e % count].skip) {
      e += dir;
    }
    if (s % count !== e % count) {
      result.push({
        start: s % count,
        end: e % count,
        loop: l,
        style: st,
      });
      prevStyle = st;
      start = e % count;
    }
  }
  for (const segment of segments) {
    start = spanGaps ? start : segment.start;
    let prev = points[start % count];
    let style;
    for (i = start + 1; i <= segment.end; i++) {
      const pt = points[i % count];
      style = readStyle(
        segmentOptions.setContext(
          createContext(chartContext, {
            type: 'segment',
            p0: prev,
            p1: pt,
            p0DataIndex: (i - 1) % count,
            p1DataIndex: i % count,
            datasetIndex,
          }),
        ),
      );
      if (styleChanged(style, prevStyle)) {
        addStyle(start, i - 1, segment.loop, prevStyle);
      }
      prev = pt;
      prevStyle = style;
    }
    if (start < i - 1) {
      addStyle(start, i - 1, segment.loop, prevStyle);
    }
  }
  return result;
}
function readStyle(options) {
  return {
    backgroundColor: options.backgroundColor,
    borderCapStyle: options.borderCapStyle,
    borderDash: options.borderDash,
    borderDashOffset: options.borderDashOffset,
    borderJoinStyle: options.borderJoinStyle,
    borderWidth: options.borderWidth,
    borderColor: options.borderColor,
  };
}
function styleChanged(style, prevStyle) {
  if (!prevStyle) {
    return false;
  }
  const cache = [];
  const replacer = function (key, value) {
    if (!isPatternOrGradient(value)) {
      return value;
    }
    if (!cache.includes(value)) {
      cache.push(value);
    }
    return cache.indexOf(value);
  };
  return JSON.stringify(style, replacer) !== JSON.stringify(prevStyle, replacer);
}
function getSizeForArea(scale, chartArea, field) {
  return scale.options.clip ? scale[field] : chartArea[field];
}
function getDatasetArea(meta, chartArea) {
  const { xScale, yScale } = meta;
  if (xScale && yScale) {
    return {
      left: getSizeForArea(xScale, chartArea, 'left'),
      right: getSizeForArea(xScale, chartArea, 'right'),
      top: getSizeForArea(yScale, chartArea, 'top'),
      bottom: getSizeForArea(yScale, chartArea, 'bottom'),
    };
  }
  return chartArea;
}
function getDatasetClipArea(chart, meta) {
  const clip = meta._clip;
  if (clip.disabled) {
    return false;
  }
  const area = getDatasetArea(meta, chart.chartArea);
  return {
    left: clip.left === false ? 0 : area.left - (clip.left === true ? 0 : clip.left),
    right: clip.right === false ? chart.width : area.right + (clip.right === true ? 0 : clip.right),
    top: clip.top === false ? 0 : area.top - (clip.top === true ? 0 : clip.top),
    bottom:
      clip.bottom === false ? chart.height : area.bottom + (clip.bottom === true ? 0 : clip.bottom),
  };
}
export {
  unclipArea as $,
  _rlookupByKey as A,
  _lookupByKey as B,
  _isPointInArea as C,
  getAngleFromPoint as D,
  toPadding as E,
  each as F,
  getMaximumSize as G,
  HALF_PI as H,
  _getParentNode as I,
  readUsedSize as J,
  supportsEventListenerOptions as K,
  throttled as L,
  _isDomSupported as M,
  _factorize as N,
  finiteOrDefault as O,
  PI as P,
  callback as Q,
  _addGrace as R,
  _limitValue as S,
  TAU as T,
  toDegrees as U,
  _measureText as V,
  _int16Range as W,
  _alignPixel as X,
  clipArea as Y,
  renderText as Z,
  _arrayUnique as _,
  resolve as a,
  getStyle as a$,
  toFont as a0,
  _toLeftRightCenter as a1,
  _alignStartEnd as a2,
  overrides as a3,
  merge as a4,
  _capitalize as a5,
  descriptors as a6,
  isFunction as a7,
  _attachContext as a8,
  _createResolver as a9,
  getRtlAdapter as aA,
  overrideTextDirection as aB,
  _textX as aC,
  restoreTextDirection as aD,
  drawPointLegend as aE,
  distanceBetweenPoints as aF,
  noop as aG,
  _setMinAndMaxByKey as aH,
  niceNum as aI,
  almostWhole as aJ,
  almostEquals as aK,
  _decimalPlaces as aL,
  Ticks as aM,
  log10 as aN,
  _filterBetween as aP,
  _lookup as aQ,
  isPatternOrGradient as aR,
  getHoverColor as aS,
  clone as aT,
  _merger as aU,
  _mergerIf as aV,
  _splitKey as aX,
  toFontString as aY,
  splineCurve as aZ,
  splineCurveMonotone as a_,
  _descriptors as aa,
  mergeIf as ab,
  uid as ac,
  debounce as ad,
  retinaScale as ae,
  clearCanvas as af,
  setsEqual as ag,
  getDatasetClipArea as ah,
  _elementsEqual as ai,
  _isClickEvent as aj,
  _isBetween as ak,
  _normalizeAngle as al,
  _readValueToProps as am,
  _updateBezierControlPoints as an,
  _computeSegments as ao,
  _boundSegments as ap,
  _steppedInterpolation as aq,
  _bezierInterpolation as ar,
  _pointInLine as as,
  _steppedLineTo as at,
  _bezierCurveTo as au,
  drawPoint as av,
  addRoundedRectPath as aw,
  toTRBL as ax,
  toTRBLCorners as ay,
  _boundSegment as az,
  isArray as b,
  toLineHeight as b1,
  PITAU as b2,
  INFINITY as b3,
  RAD_PER_DEG as b4,
  QUARTER_PI as b5,
  TWO_THIRDS_PI as b6,
  _angleDiff as b7,
  color as c,
  defaults as d,
  effects as e,
  resolveObjectKey as f,
  isNumberFinite as g,
  defined as h,
  isObject as i,
  createContext as j,
  isNullOrUndef as k,
  listenArrayEvents as l,
  toPercentage as m,
  toDimension as n,
  formatNumber as o,
  _angleBetween as p,
  _getStartAndCountOfVisiblePoints as q,
  requestAnimFrame as r,
  sign as s,
  toRadians as t,
  unlistenArrayEvents as u,
  valueOrDefault as v,
  _scaleRangesChanged as w,
  isNumber as x,
  getRelativePosition as z,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaGVscGVycy5kYXRhc2V0LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vY2hhcnQuanNANC41LjAvbm9kZV9tb2R1bGVzL2NoYXJ0LmpzL2Rpc3QvY2h1bmtzL2hlbHBlcnMuZGF0YXNldC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIENoYXJ0LmpzIHY0LjUuMFxuICogaHR0cHM6Ly93d3cuY2hhcnRqcy5vcmdcbiAqIChjKSAyMDI1IENoYXJ0LmpzIENvbnRyaWJ1dG9yc1xuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cbmltcG9ydCB7IENvbG9yIH0gZnJvbSAnQGt1cmtsZS9jb2xvcic7XG5cbi8qKlxuICogQG5hbWVzcGFjZSBDaGFydC5oZWxwZXJzXG4gKi8gLyoqXG4gKiBBbiBlbXB0eSBmdW5jdGlvbiB0aGF0IGNhbiBiZSB1c2VkLCBmb3IgZXhhbXBsZSwgZm9yIG9wdGlvbmFsIGNhbGxiYWNrLlxuICovIGZ1bmN0aW9uIG5vb3AoKSB7XG4vKiBub29wICovIH1cbi8qKlxuICogUmV0dXJucyBhIHVuaXF1ZSBpZCwgc2VxdWVudGlhbGx5IGdlbmVyYXRlZCBmcm9tIGEgZ2xvYmFsIHZhcmlhYmxlLlxuICovIGNvbnN0IHVpZCA9ICgoKT0+e1xuICAgIGxldCBpZCA9IDA7XG4gICAgcmV0dXJuICgpPT5pZCsrO1xufSkoKTtcbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgbmVpdGhlciBudWxsIG5vciB1bmRlZmluZWQsIGVsc2UgcmV0dXJucyBmYWxzZS5cbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQHNpbmNlIDIuNy4wXG4gKi8gZnVuY3Rpb24gaXNOdWxsT3JVbmRlZih2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSA9PT0gbnVsbCB8fCB2YWx1ZSA9PT0gdW5kZWZpbmVkO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyBhbiBhcnJheSAoaW5jbHVkaW5nIHR5cGVkIGFycmF5cyksIGVsc2UgcmV0dXJucyBmYWxzZS5cbiAqIEBwYXJhbSB2YWx1ZSAtIFRoZSB2YWx1ZSB0byB0ZXN0LlxuICogQGZ1bmN0aW9uXG4gKi8gZnVuY3Rpb24gaXNBcnJheSh2YWx1ZSkge1xuICAgIGlmIChBcnJheS5pc0FycmF5ICYmIEFycmF5LmlzQXJyYXkodmFsdWUpKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gT2JqZWN0LnByb3RvdHlwZS50b1N0cmluZy5jYWxsKHZhbHVlKTtcbiAgICBpZiAodHlwZS5zbGljZSgwLCA3KSA9PT0gJ1tvYmplY3QnICYmIHR5cGUuc2xpY2UoLTYpID09PSAnQXJyYXldJykge1xuICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgYHZhbHVlYCBpcyBhbiBvYmplY3QgKGV4Y2x1ZGluZyBudWxsKSwgZWxzZSByZXR1cm5zIGZhbHNlLlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHRlc3QuXG4gKiBAc2luY2UgMi43LjBcbiAqLyBmdW5jdGlvbiBpc09iamVjdCh2YWx1ZSkge1xuICAgIHJldHVybiB2YWx1ZSAhPT0gbnVsbCAmJiBPYmplY3QucHJvdG90eXBlLnRvU3RyaW5nLmNhbGwodmFsdWUpID09PSAnW29iamVjdCBPYmplY3RdJztcbn1cbi8qKlxuICogUmV0dXJucyB0cnVlIGlmIGB2YWx1ZWAgaXMgYSBmaW5pdGUgbnVtYmVyLCBlbHNlIHJldHVybnMgZmFsc2VcbiAqIEBwYXJhbSB2YWx1ZSAgLSBUaGUgdmFsdWUgdG8gdGVzdC5cbiAqLyBmdW5jdGlvbiBpc051bWJlckZpbml0ZSh2YWx1ZSkge1xuICAgIHJldHVybiAodHlwZW9mIHZhbHVlID09PSAnbnVtYmVyJyB8fCB2YWx1ZSBpbnN0YW5jZW9mIE51bWJlcikgJiYgaXNGaW5pdGUoK3ZhbHVlKTtcbn1cbi8qKlxuICogUmV0dXJucyBgdmFsdWVgIGlmIGZpbml0ZSwgZWxzZSByZXR1cm5zIGBkZWZhdWx0VmFsdWVgLlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHJldHVybiBpZiBkZWZpbmVkLlxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIFRoZSB2YWx1ZSB0byByZXR1cm4gaWYgYHZhbHVlYCBpcyBub3QgZmluaXRlLlxuICovIGZ1bmN0aW9uIGZpbml0ZU9yRGVmYXVsdCh2YWx1ZSwgZGVmYXVsdFZhbHVlKSB7XG4gICAgcmV0dXJuIGlzTnVtYmVyRmluaXRlKHZhbHVlKSA/IHZhbHVlIDogZGVmYXVsdFZhbHVlO1xufVxuLyoqXG4gKiBSZXR1cm5zIGB2YWx1ZWAgaWYgZGVmaW5lZCwgZWxzZSByZXR1cm5zIGBkZWZhdWx0VmFsdWVgLlxuICogQHBhcmFtIHZhbHVlIC0gVGhlIHZhbHVlIHRvIHJldHVybiBpZiBkZWZpbmVkLlxuICogQHBhcmFtIGRlZmF1bHRWYWx1ZSAtIFRoZSB2YWx1ZSB0byByZXR1cm4gaWYgYHZhbHVlYCBpcyB1bmRlZmluZWQuXG4gKi8gZnVuY3Rpb24gdmFsdWVPckRlZmF1bHQodmFsdWUsIGRlZmF1bHRWYWx1ZSkge1xuICAgIHJldHVybiB0eXBlb2YgdmFsdWUgPT09ICd1bmRlZmluZWQnID8gZGVmYXVsdFZhbHVlIDogdmFsdWU7XG59XG5jb25zdCB0b1BlcmNlbnRhZ2UgPSAodmFsdWUsIGRpbWVuc2lvbik9PnR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuZW5kc1dpdGgoJyUnKSA/IHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwIDogK3ZhbHVlIC8gZGltZW5zaW9uO1xuY29uc3QgdG9EaW1lbnNpb24gPSAodmFsdWUsIGRpbWVuc2lvbik9PnR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycgJiYgdmFsdWUuZW5kc1dpdGgoJyUnKSA/IHBhcnNlRmxvYXQodmFsdWUpIC8gMTAwICogZGltZW5zaW9uIDogK3ZhbHVlO1xuLyoqXG4gKiBDYWxscyBgZm5gIHdpdGggdGhlIGdpdmVuIGBhcmdzYCBpbiB0aGUgc2NvcGUgZGVmaW5lZCBieSBgdGhpc0FyZ2AgYW5kIHJldHVybnMgdGhlXG4gKiB2YWx1ZSByZXR1cm5lZCBieSBgZm5gLiBJZiBgZm5gIGlzIG5vdCBhIGZ1bmN0aW9uLCB0aGlzIG1ldGhvZCByZXR1cm5zIHVuZGVmaW5lZC5cbiAqIEBwYXJhbSBmbiAtIFRoZSBmdW5jdGlvbiB0byBjYWxsLlxuICogQHBhcmFtIGFyZ3MgLSBUaGUgYXJndW1lbnRzIHdpdGggd2hpY2ggYGZuYCBzaG91bGQgYmUgY2FsbGVkLlxuICogQHBhcmFtIFt0aGlzQXJnXSAtIFRoZSB2YWx1ZSBvZiBgdGhpc2AgcHJvdmlkZWQgZm9yIHRoZSBjYWxsIHRvIGBmbmAuXG4gKi8gZnVuY3Rpb24gY2FsbGJhY2soZm4sIGFyZ3MsIHRoaXNBcmcpIHtcbiAgICBpZiAoZm4gJiYgdHlwZW9mIGZuLmNhbGwgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgcmV0dXJuIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3MpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGVhY2gobG9vcGFibGUsIGZuLCB0aGlzQXJnLCByZXZlcnNlKSB7XG4gICAgbGV0IGksIGxlbiwga2V5cztcbiAgICBpZiAoaXNBcnJheShsb29wYWJsZSkpIHtcbiAgICAgICAgbGVuID0gbG9vcGFibGUubGVuZ3RoO1xuICAgICAgICBpZiAocmV2ZXJzZSkge1xuICAgICAgICAgICAgZm9yKGkgPSBsZW4gLSAxOyBpID49IDA7IGktLSl7XG4gICAgICAgICAgICAgICAgZm4uY2FsbCh0aGlzQXJnLCBsb29wYWJsZVtpXSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmb3IoaSA9IDA7IGkgPCBsZW47IGkrKyl7XG4gICAgICAgICAgICAgICAgZm4uY2FsbCh0aGlzQXJnLCBsb29wYWJsZVtpXSwgaSk7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KGxvb3BhYmxlKSkge1xuICAgICAgICBrZXlzID0gT2JqZWN0LmtleXMobG9vcGFibGUpO1xuICAgICAgICBsZW4gPSBrZXlzLmxlbmd0aDtcbiAgICAgICAgZm9yKGkgPSAwOyBpIDwgbGVuOyBpKyspe1xuICAgICAgICAgICAgZm4uY2FsbCh0aGlzQXJnLCBsb29wYWJsZVtrZXlzW2ldXSwga2V5c1tpXSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiB0aGUgYGEwYCBhbmQgYGExYCBhcnJheXMgaGF2ZSB0aGUgc2FtZSBjb250ZW50LCBlbHNlIHJldHVybnMgZmFsc2UuXG4gKiBAcGFyYW0gYTAgLSBUaGUgYXJyYXkgdG8gY29tcGFyZVxuICogQHBhcmFtIGExIC0gVGhlIGFycmF5IHRvIGNvbXBhcmVcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2VsZW1lbnRzRXF1YWwoYTAsIGExKSB7XG4gICAgbGV0IGksIGlsZW4sIHYwLCB2MTtcbiAgICBpZiAoIWEwIHx8ICFhMSB8fCBhMC5sZW5ndGggIT09IGExLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvcihpID0gMCwgaWxlbiA9IGEwLmxlbmd0aDsgaSA8IGlsZW47ICsraSl7XG4gICAgICAgIHYwID0gYTBbaV07XG4gICAgICAgIHYxID0gYTFbaV07XG4gICAgICAgIGlmICh2MC5kYXRhc2V0SW5kZXggIT09IHYxLmRhdGFzZXRJbmRleCB8fCB2MC5pbmRleCAhPT0gdjEuaW5kZXgpIHtcbiAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdHJ1ZTtcbn1cbi8qKlxuICogUmV0dXJucyBhIGRlZXAgY29weSBvZiBgc291cmNlYCB3aXRob3V0IGtlZXBpbmcgcmVmZXJlbmNlcyBvbiBvYmplY3RzIGFuZCBhcnJheXMuXG4gKiBAcGFyYW0gc291cmNlIC0gVGhlIHZhbHVlIHRvIGNsb25lLlxuICovIGZ1bmN0aW9uIGNsb25lKHNvdXJjZSkge1xuICAgIGlmIChpc0FycmF5KHNvdXJjZSkpIHtcbiAgICAgICAgcmV0dXJuIHNvdXJjZS5tYXAoY2xvbmUpO1xuICAgIH1cbiAgICBpZiAoaXNPYmplY3Qoc291cmNlKSkge1xuICAgICAgICBjb25zdCB0YXJnZXQgPSBPYmplY3QuY3JlYXRlKG51bGwpO1xuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoc291cmNlKTtcbiAgICAgICAgY29uc3Qga2xlbiA9IGtleXMubGVuZ3RoO1xuICAgICAgICBsZXQgayA9IDA7XG4gICAgICAgIGZvcig7IGsgPCBrbGVuOyArK2spe1xuICAgICAgICAgICAgdGFyZ2V0W2tleXNba11dID0gY2xvbmUoc291cmNlW2tleXNba11dKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gdGFyZ2V0O1xuICAgIH1cbiAgICByZXR1cm4gc291cmNlO1xufVxuZnVuY3Rpb24gaXNWYWxpZEtleShrZXkpIHtcbiAgICByZXR1cm4gW1xuICAgICAgICAnX19wcm90b19fJyxcbiAgICAgICAgJ3Byb3RvdHlwZScsXG4gICAgICAgICdjb25zdHJ1Y3RvcidcbiAgICBdLmluZGV4T2Yoa2V5KSA9PT0gLTE7XG59XG4vKipcbiAqIFRoZSBkZWZhdWx0IG1lcmdlciB3aGVuIENoYXJ0LmhlbHBlcnMubWVyZ2UgaXMgY2FsbGVkIHdpdGhvdXQgbWVyZ2VyIG9wdGlvbi5cbiAqIE5vdGUoU0IpOiBhbHNvIHVzZWQgYnkgbWVyZ2VDb25maWcgYW5kIG1lcmdlU2NhbGVDb25maWcgYXMgZmFsbGJhY2suXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9tZXJnZXIoa2V5LCB0YXJnZXQsIHNvdXJjZSwgb3B0aW9ucykge1xuICAgIGlmICghaXNWYWxpZEtleShrZXkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHZhbCA9IHRhcmdldFtrZXldO1xuICAgIGNvbnN0IHN2YWwgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAoaXNPYmplY3QodHZhbCkgJiYgaXNPYmplY3Qoc3ZhbCkpIHtcbiAgICAgICAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby11c2UtYmVmb3JlLWRlZmluZVxuICAgICAgICBtZXJnZSh0dmFsLCBzdmFsLCBvcHRpb25zKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICB0YXJnZXRba2V5XSA9IGNsb25lKHN2YWwpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIG1lcmdlKHRhcmdldCwgc291cmNlLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc291cmNlcyA9IGlzQXJyYXkoc291cmNlKSA/IHNvdXJjZSA6IFtcbiAgICAgICAgc291cmNlXG4gICAgXTtcbiAgICBjb25zdCBpbGVuID0gc291cmNlcy5sZW5ndGg7XG4gICAgaWYgKCFpc09iamVjdCh0YXJnZXQpKSB7XG4gICAgICAgIHJldHVybiB0YXJnZXQ7XG4gICAgfVxuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGNvbnN0IG1lcmdlciA9IG9wdGlvbnMubWVyZ2VyIHx8IF9tZXJnZXI7XG4gICAgbGV0IGN1cnJlbnQ7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IGlsZW47ICsraSl7XG4gICAgICAgIGN1cnJlbnQgPSBzb3VyY2VzW2ldO1xuICAgICAgICBpZiAoIWlzT2JqZWN0KGN1cnJlbnQpKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBjb25zdCBrZXlzID0gT2JqZWN0LmtleXMoY3VycmVudCk7XG4gICAgICAgIGZvcihsZXQgayA9IDAsIGtsZW4gPSBrZXlzLmxlbmd0aDsgayA8IGtsZW47ICsrayl7XG4gICAgICAgICAgICBtZXJnZXIoa2V5c1trXSwgdGFyZ2V0LCBjdXJyZW50LCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gdGFyZ2V0O1xufVxuZnVuY3Rpb24gbWVyZ2VJZih0YXJnZXQsIHNvdXJjZSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICByZXR1cm4gbWVyZ2UodGFyZ2V0LCBzb3VyY2UsIHtcbiAgICAgICAgbWVyZ2VyOiBfbWVyZ2VySWZcbiAgICB9KTtcbn1cbi8qKlxuICogTWVyZ2VzIHNvdXJjZVtrZXldIGluIHRhcmdldFtrZXldIG9ubHkgaWYgdGFyZ2V0W2tleV0gaXMgdW5kZWZpbmVkLlxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfbWVyZ2VySWYoa2V5LCB0YXJnZXQsIHNvdXJjZSkge1xuICAgIGlmICghaXNWYWxpZEtleShrZXkpKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY29uc3QgdHZhbCA9IHRhcmdldFtrZXldO1xuICAgIGNvbnN0IHN2YWwgPSBzb3VyY2Vba2V5XTtcbiAgICBpZiAoaXNPYmplY3QodHZhbCkgJiYgaXNPYmplY3Qoc3ZhbCkpIHtcbiAgICAgICAgbWVyZ2VJZih0dmFsLCBzdmFsKTtcbiAgICB9IGVsc2UgaWYgKCFPYmplY3QucHJvdG90eXBlLmhhc093blByb3BlcnR5LmNhbGwodGFyZ2V0LCBrZXkpKSB7XG4gICAgICAgIHRhcmdldFtrZXldID0gY2xvbmUoc3ZhbCk7XG4gICAgfVxufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9kZXByZWNhdGVkKHNjb3BlLCB2YWx1ZSwgcHJldmlvdXMsIGN1cnJlbnQpIHtcbiAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zb2xlLndhcm4oc2NvcGUgKyAnOiBcIicgKyBwcmV2aW91cyArICdcIiBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIFwiJyArIGN1cnJlbnQgKyAnXCIgaW5zdGVhZCcpO1xuICAgIH1cbn1cbi8vIHJlc29sdmVPYmplY3RLZXkgcmVzb2x2ZXIgY2FjaGVcbmNvbnN0IGtleVJlc29sdmVycyA9IHtcbiAgICAvLyBDaGFydC5oZWxwZXJzLmNvcmUgcmVzb2x2ZU9iamVjdEtleSBzaG91bGQgcmVzb2x2ZSBlbXB0eSBrZXkgdG8gcm9vdCBvYmplY3RcbiAgICAnJzogKHYpPT52LFxuICAgIC8vIGRlZmF1bHQgcmVzb2x2ZXJzXG4gICAgeDogKG8pPT5vLngsXG4gICAgeTogKG8pPT5vLnlcbn07XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX3NwbGl0S2V5KGtleSkge1xuICAgIGNvbnN0IHBhcnRzID0ga2V5LnNwbGl0KCcuJyk7XG4gICAgY29uc3Qga2V5cyA9IFtdO1xuICAgIGxldCB0bXAgPSAnJztcbiAgICBmb3IgKGNvbnN0IHBhcnQgb2YgcGFydHMpe1xuICAgICAgICB0bXAgKz0gcGFydDtcbiAgICAgICAgaWYgKHRtcC5lbmRzV2l0aCgnXFxcXCcpKSB7XG4gICAgICAgICAgICB0bXAgPSB0bXAuc2xpY2UoMCwgLTEpICsgJy4nO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAga2V5cy5wdXNoKHRtcCk7XG4gICAgICAgICAgICB0bXAgPSAnJztcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn1cbmZ1bmN0aW9uIF9nZXRLZXlSZXNvbHZlcihrZXkpIHtcbiAgICBjb25zdCBrZXlzID0gX3NwbGl0S2V5KGtleSk7XG4gICAgcmV0dXJuIChvYmopPT57XG4gICAgICAgIGZvciAoY29uc3QgayBvZiBrZXlzKXtcbiAgICAgICAgICAgIGlmIChrID09PSAnJykge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgb2JqID0gb2JqICYmIG9ialtrXTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gb2JqO1xuICAgIH07XG59XG5mdW5jdGlvbiByZXNvbHZlT2JqZWN0S2V5KG9iaiwga2V5KSB7XG4gICAgY29uc3QgcmVzb2x2ZXIgPSBrZXlSZXNvbHZlcnNba2V5XSB8fCAoa2V5UmVzb2x2ZXJzW2tleV0gPSBfZ2V0S2V5UmVzb2x2ZXIoa2V5KSk7XG4gICAgcmV0dXJuIHJlc29sdmVyKG9iaik7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2NhcGl0YWxpemUoc3RyKSB7XG4gICAgcmV0dXJuIHN0ci5jaGFyQXQoMCkudG9VcHBlckNhc2UoKSArIHN0ci5zbGljZSgxKTtcbn1cbmNvbnN0IGRlZmluZWQgPSAodmFsdWUpPT50eXBlb2YgdmFsdWUgIT09ICd1bmRlZmluZWQnO1xuY29uc3QgaXNGdW5jdGlvbiA9ICh2YWx1ZSk9PnR5cGVvZiB2YWx1ZSA9PT0gJ2Z1bmN0aW9uJztcbi8vIEFkYXB0ZWQgZnJvbSBodHRwczovL3N0YWNrb3ZlcmZsb3cuY29tL3F1ZXN0aW9ucy8zMTEyODg1NS9jb21wYXJpbmctZWNtYTYtc2V0cy1mb3ItZXF1YWxpdHkjMzExMjkzODRcbmNvbnN0IHNldHNFcXVhbCA9IChhLCBiKT0+e1xuICAgIGlmIChhLnNpemUgIT09IGIuc2l6ZSkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGZvciAoY29uc3QgaXRlbSBvZiBhKXtcbiAgICAgICAgaWYgKCFiLmhhcyhpdGVtKSkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiB0cnVlO1xufTtcbi8qKlxuICogQHBhcmFtIGUgLSBUaGUgZXZlbnRcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2lzQ2xpY2tFdmVudChlKSB7XG4gICAgcmV0dXJuIGUudHlwZSA9PT0gJ21vdXNldXAnIHx8IGUudHlwZSA9PT0gJ2NsaWNrJyB8fCBlLnR5cGUgPT09ICdjb250ZXh0bWVudSc7XG59XG5cbi8qKlxuICogQGFsaWFzIENoYXJ0LmhlbHBlcnMubWF0aFxuICogQG5hbWVzcGFjZVxuICovIGNvbnN0IFBJID0gTWF0aC5QSTtcbmNvbnN0IFRBVSA9IDIgKiBQSTtcbmNvbnN0IFBJVEFVID0gVEFVICsgUEk7XG5jb25zdCBJTkZJTklUWSA9IE51bWJlci5QT1NJVElWRV9JTkZJTklUWTtcbmNvbnN0IFJBRF9QRVJfREVHID0gUEkgLyAxODA7XG5jb25zdCBIQUxGX1BJID0gUEkgLyAyO1xuY29uc3QgUVVBUlRFUl9QSSA9IFBJIC8gNDtcbmNvbnN0IFRXT19USElSRFNfUEkgPSBQSSAqIDIgLyAzO1xuY29uc3QgbG9nMTAgPSBNYXRoLmxvZzEwO1xuY29uc3Qgc2lnbiA9IE1hdGguc2lnbjtcbmZ1bmN0aW9uIGFsbW9zdEVxdWFscyh4LCB5LCBlcHNpbG9uKSB7XG4gICAgcmV0dXJuIE1hdGguYWJzKHggLSB5KSA8IGVwc2lsb247XG59XG4vKipcbiAqIEltcGxlbWVudGF0aW9uIG9mIHRoZSBuaWNlIG51bWJlciBhbGdvcml0aG0gdXNlZCBpbiBkZXRlcm1pbmluZyB3aGVyZSBheGlzIGxhYmVscyB3aWxsIGdvXG4gKi8gZnVuY3Rpb24gbmljZU51bShyYW5nZSkge1xuICAgIGNvbnN0IHJvdW5kZWRSYW5nZSA9IE1hdGgucm91bmQocmFuZ2UpO1xuICAgIHJhbmdlID0gYWxtb3N0RXF1YWxzKHJhbmdlLCByb3VuZGVkUmFuZ2UsIHJhbmdlIC8gMTAwMCkgPyByb3VuZGVkUmFuZ2UgOiByYW5nZTtcbiAgICBjb25zdCBuaWNlUmFuZ2UgPSBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihsb2cxMChyYW5nZSkpKTtcbiAgICBjb25zdCBmcmFjdGlvbiA9IHJhbmdlIC8gbmljZVJhbmdlO1xuICAgIGNvbnN0IG5pY2VGcmFjdGlvbiA9IGZyYWN0aW9uIDw9IDEgPyAxIDogZnJhY3Rpb24gPD0gMiA/IDIgOiBmcmFjdGlvbiA8PSA1ID8gNSA6IDEwO1xuICAgIHJldHVybiBuaWNlRnJhY3Rpb24gKiBuaWNlUmFuZ2U7XG59XG4vKipcbiAqIFJldHVybnMgYW4gYXJyYXkgb2YgZmFjdG9ycyBzb3J0ZWQgZnJvbSAxIHRvIHNxcnQodmFsdWUpXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9mYWN0b3JpemUodmFsdWUpIHtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBjb25zdCBzcXJ0ID0gTWF0aC5zcXJ0KHZhbHVlKTtcbiAgICBsZXQgaTtcbiAgICBmb3IoaSA9IDE7IGkgPCBzcXJ0OyBpKyspe1xuICAgICAgICBpZiAodmFsdWUgJSBpID09PSAwKSB7XG4gICAgICAgICAgICByZXN1bHQucHVzaChpKTtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHZhbHVlIC8gaSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgaWYgKHNxcnQgPT09IChzcXJ0IHwgMCkpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goc3FydCk7XG4gICAgfVxuICAgIHJlc3VsdC5zb3J0KChhLCBiKT0+YSAtIGIpLnBvcCgpO1xuICAgIHJldHVybiByZXN1bHQ7XG59XG4vKipcbiAqIFZlcmlmaWVzIHRoYXQgYXR0ZW1wdGluZyB0byBjb2VyY2UgbiB0byBzdHJpbmcgb3IgbnVtYmVyIHdvbid0IHRocm93IGEgVHlwZUVycm9yLlxuICovIGZ1bmN0aW9uIGlzTm9uUHJpbWl0aXZlKG4pIHtcbiAgICByZXR1cm4gdHlwZW9mIG4gPT09ICdzeW1ib2wnIHx8IHR5cGVvZiBuID09PSAnb2JqZWN0JyAmJiBuICE9PSBudWxsICYmICEoU3ltYm9sLnRvUHJpbWl0aXZlIGluIG4gfHwgJ3RvU3RyaW5nJyBpbiBuIHx8ICd2YWx1ZU9mJyBpbiBuKTtcbn1cbmZ1bmN0aW9uIGlzTnVtYmVyKG4pIHtcbiAgICByZXR1cm4gIWlzTm9uUHJpbWl0aXZlKG4pICYmICFpc05hTihwYXJzZUZsb2F0KG4pKSAmJiBpc0Zpbml0ZShuKTtcbn1cbmZ1bmN0aW9uIGFsbW9zdFdob2xlKHgsIGVwc2lsb24pIHtcbiAgICBjb25zdCByb3VuZGVkID0gTWF0aC5yb3VuZCh4KTtcbiAgICByZXR1cm4gcm91bmRlZCAtIGVwc2lsb24gPD0geCAmJiByb3VuZGVkICsgZXBzaWxvbiA+PSB4O1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9zZXRNaW5BbmRNYXhCeUtleShhcnJheSwgdGFyZ2V0LCBwcm9wZXJ0eSkge1xuICAgIGxldCBpLCBpbGVuLCB2YWx1ZTtcbiAgICBmb3IoaSA9IDAsIGlsZW4gPSBhcnJheS5sZW5ndGg7IGkgPCBpbGVuOyBpKyspe1xuICAgICAgICB2YWx1ZSA9IGFycmF5W2ldW3Byb3BlcnR5XTtcbiAgICAgICAgaWYgKCFpc05hTih2YWx1ZSkpIHtcbiAgICAgICAgICAgIHRhcmdldC5taW4gPSBNYXRoLm1pbih0YXJnZXQubWluLCB2YWx1ZSk7XG4gICAgICAgICAgICB0YXJnZXQubWF4ID0gTWF0aC5tYXgodGFyZ2V0Lm1heCwgdmFsdWUpO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gdG9SYWRpYW5zKGRlZ3JlZXMpIHtcbiAgICByZXR1cm4gZGVncmVlcyAqIChQSSAvIDE4MCk7XG59XG5mdW5jdGlvbiB0b0RlZ3JlZXMocmFkaWFucykge1xuICAgIHJldHVybiByYWRpYW5zICogKDE4MCAvIFBJKTtcbn1cbi8qKlxuICogUmV0dXJucyB0aGUgbnVtYmVyIG9mIGRlY2ltYWwgcGxhY2VzXG4gKiBpLmUuIHRoZSBudW1iZXIgb2YgZGlnaXRzIGFmdGVyIHRoZSBkZWNpbWFsIHBvaW50LCBvZiB0aGUgdmFsdWUgb2YgdGhpcyBOdW1iZXIuXG4gKiBAcGFyYW0geCAtIEEgbnVtYmVyLlxuICogQHJldHVybnMgVGhlIG51bWJlciBvZiBkZWNpbWFsIHBsYWNlcy5cbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2RlY2ltYWxQbGFjZXMoeCkge1xuICAgIGlmICghaXNOdW1iZXJGaW5pdGUoeCkpIHtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBsZXQgZSA9IDE7XG4gICAgbGV0IHAgPSAwO1xuICAgIHdoaWxlKE1hdGgucm91bmQoeCAqIGUpIC8gZSAhPT0geCl7XG4gICAgICAgIGUgKj0gMTA7XG4gICAgICAgIHArKztcbiAgICB9XG4gICAgcmV0dXJuIHA7XG59XG4vLyBHZXRzIHRoZSBhbmdsZSBmcm9tIHZlcnRpY2FsIHVwcmlnaHQgdG8gdGhlIHBvaW50IGFib3V0IGEgY2VudHJlLlxuZnVuY3Rpb24gZ2V0QW5nbGVGcm9tUG9pbnQoY2VudHJlUG9pbnQsIGFuZ2xlUG9pbnQpIHtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21YQ2VudGVyID0gYW5nbGVQb2ludC54IC0gY2VudHJlUG9pbnQueDtcbiAgICBjb25zdCBkaXN0YW5jZUZyb21ZQ2VudGVyID0gYW5nbGVQb2ludC55IC0gY2VudHJlUG9pbnQueTtcbiAgICBjb25zdCByYWRpYWxEaXN0YW5jZUZyb21DZW50ZXIgPSBNYXRoLnNxcnQoZGlzdGFuY2VGcm9tWENlbnRlciAqIGRpc3RhbmNlRnJvbVhDZW50ZXIgKyBkaXN0YW5jZUZyb21ZQ2VudGVyICogZGlzdGFuY2VGcm9tWUNlbnRlcik7XG4gICAgbGV0IGFuZ2xlID0gTWF0aC5hdGFuMihkaXN0YW5jZUZyb21ZQ2VudGVyLCBkaXN0YW5jZUZyb21YQ2VudGVyKTtcbiAgICBpZiAoYW5nbGUgPCAtMC41ICogUEkpIHtcbiAgICAgICAgYW5nbGUgKz0gVEFVOyAvLyBtYWtlIHN1cmUgdGhlIHJldHVybmVkIGFuZ2xlIGlzIGluIHRoZSByYW5nZSBvZiAoLVBJLzIsIDNQSS8yXVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBhbmdsZSxcbiAgICAgICAgZGlzdGFuY2U6IHJhZGlhbERpc3RhbmNlRnJvbUNlbnRlclxuICAgIH07XG59XG5mdW5jdGlvbiBkaXN0YW5jZUJldHdlZW5Qb2ludHMocHQxLCBwdDIpIHtcbiAgICByZXR1cm4gTWF0aC5zcXJ0KE1hdGgucG93KHB0Mi54IC0gcHQxLngsIDIpICsgTWF0aC5wb3cocHQyLnkgLSBwdDEueSwgMikpO1xufVxuLyoqXG4gKiBTaG9ydGVzdCBkaXN0YW5jZSBiZXR3ZWVuIGFuZ2xlcywgaW4gZWl0aGVyIGRpcmVjdGlvbi5cbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2FuZ2xlRGlmZihhLCBiKSB7XG4gICAgcmV0dXJuIChhIC0gYiArIFBJVEFVKSAlIFRBVSAtIFBJO1xufVxuLyoqXG4gKiBOb3JtYWxpemUgYW5nbGUgdG8gYmUgYmV0d2VlbiAwIGFuZCAyKlBJXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9ub3JtYWxpemVBbmdsZShhKSB7XG4gICAgcmV0dXJuIChhICUgVEFVICsgVEFVKSAlIFRBVTtcbn1cbi8qKlxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfYW5nbGVCZXR3ZWVuKGFuZ2xlLCBzdGFydCwgZW5kLCBzYW1lQW5nbGVJc0Z1bGxDaXJjbGUpIHtcbiAgICBjb25zdCBhID0gX25vcm1hbGl6ZUFuZ2xlKGFuZ2xlKTtcbiAgICBjb25zdCBzID0gX25vcm1hbGl6ZUFuZ2xlKHN0YXJ0KTtcbiAgICBjb25zdCBlID0gX25vcm1hbGl6ZUFuZ2xlKGVuZCk7XG4gICAgY29uc3QgYW5nbGVUb1N0YXJ0ID0gX25vcm1hbGl6ZUFuZ2xlKHMgLSBhKTtcbiAgICBjb25zdCBhbmdsZVRvRW5kID0gX25vcm1hbGl6ZUFuZ2xlKGUgLSBhKTtcbiAgICBjb25zdCBzdGFydFRvQW5nbGUgPSBfbm9ybWFsaXplQW5nbGUoYSAtIHMpO1xuICAgIGNvbnN0IGVuZFRvQW5nbGUgPSBfbm9ybWFsaXplQW5nbGUoYSAtIGUpO1xuICAgIHJldHVybiBhID09PSBzIHx8IGEgPT09IGUgfHwgc2FtZUFuZ2xlSXNGdWxsQ2lyY2xlICYmIHMgPT09IGUgfHwgYW5nbGVUb1N0YXJ0ID4gYW5nbGVUb0VuZCAmJiBzdGFydFRvQW5nbGUgPCBlbmRUb0FuZ2xlO1xufVxuLyoqXG4gKiBMaW1pdCBgdmFsdWVgIGJldHdlZW4gYG1pbmAgYW5kIGBtYXhgXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBtaW5cbiAqIEBwYXJhbSBtYXhcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2xpbWl0VmFsdWUodmFsdWUsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KG1pbiwgTWF0aC5taW4obWF4LCB2YWx1ZSkpO1xufVxuLyoqXG4gKiBAcGFyYW0ge251bWJlcn0gdmFsdWVcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2ludDE2UmFuZ2UodmFsdWUpIHtcbiAgICByZXR1cm4gX2xpbWl0VmFsdWUodmFsdWUsIC0zMjc2OCwgMzI3NjcpO1xufVxuLyoqXG4gKiBAcGFyYW0gdmFsdWVcbiAqIEBwYXJhbSBzdGFydFxuICogQHBhcmFtIGVuZFxuICogQHBhcmFtIFtlcHNpbG9uXVxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfaXNCZXR3ZWVuKHZhbHVlLCBzdGFydCwgZW5kLCBlcHNpbG9uID0gMWUtNikge1xuICAgIHJldHVybiB2YWx1ZSA+PSBNYXRoLm1pbihzdGFydCwgZW5kKSAtIGVwc2lsb24gJiYgdmFsdWUgPD0gTWF0aC5tYXgoc3RhcnQsIGVuZCkgKyBlcHNpbG9uO1xufVxuXG5mdW5jdGlvbiBfbG9va3VwKHRhYmxlLCB2YWx1ZSwgY21wKSB7XG4gICAgY21wID0gY21wIHx8ICgoaW5kZXgpPT50YWJsZVtpbmRleF0gPCB2YWx1ZSk7XG4gICAgbGV0IGhpID0gdGFibGUubGVuZ3RoIC0gMTtcbiAgICBsZXQgbG8gPSAwO1xuICAgIGxldCBtaWQ7XG4gICAgd2hpbGUoaGkgLSBsbyA+IDEpe1xuICAgICAgICBtaWQgPSBsbyArIGhpID4+IDE7XG4gICAgICAgIGlmIChjbXAobWlkKSkge1xuICAgICAgICAgICAgbG8gPSBtaWQ7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBoaSA9IG1pZDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBsbyxcbiAgICAgICAgaGlcbiAgICB9O1xufVxuLyoqXG4gKiBCaW5hcnkgc2VhcmNoXG4gKiBAcGFyYW0gdGFibGUgLSB0aGUgdGFibGUgc2VhcmNoLiBtdXN0IGJlIHNvcnRlZCFcbiAqIEBwYXJhbSBrZXkgLSBwcm9wZXJ0eSBuYW1lIGZvciB0aGUgdmFsdWUgaW4gZWFjaCBlbnRyeVxuICogQHBhcmFtIHZhbHVlIC0gdmFsdWUgdG8gZmluZFxuICogQHBhcmFtIGxhc3QgLSBsb29rdXAgbGFzdCBpbmRleFxuICogQHByaXZhdGVcbiAqLyBjb25zdCBfbG9va3VwQnlLZXkgPSAodGFibGUsIGtleSwgdmFsdWUsIGxhc3QpPT5fbG9va3VwKHRhYmxlLCB2YWx1ZSwgbGFzdCA/IChpbmRleCk9PntcbiAgICAgICAgY29uc3QgdGkgPSB0YWJsZVtpbmRleF1ba2V5XTtcbiAgICAgICAgcmV0dXJuIHRpIDwgdmFsdWUgfHwgdGkgPT09IHZhbHVlICYmIHRhYmxlW2luZGV4ICsgMV1ba2V5XSA9PT0gdmFsdWU7XG4gICAgfSA6IChpbmRleCk9PnRhYmxlW2luZGV4XVtrZXldIDwgdmFsdWUpO1xuLyoqXG4gKiBSZXZlcnNlIGJpbmFyeSBzZWFyY2hcbiAqIEBwYXJhbSB0YWJsZSAtIHRoZSB0YWJsZSBzZWFyY2guIG11c3QgYmUgc29ydGVkIVxuICogQHBhcmFtIGtleSAtIHByb3BlcnR5IG5hbWUgZm9yIHRoZSB2YWx1ZSBpbiBlYWNoIGVudHJ5XG4gKiBAcGFyYW0gdmFsdWUgLSB2YWx1ZSB0byBmaW5kXG4gKiBAcHJpdmF0ZVxuICovIGNvbnN0IF9ybG9va3VwQnlLZXkgPSAodGFibGUsIGtleSwgdmFsdWUpPT5fbG9va3VwKHRhYmxlLCB2YWx1ZSwgKGluZGV4KT0+dGFibGVbaW5kZXhdW2tleV0gPj0gdmFsdWUpO1xuLyoqXG4gKiBSZXR1cm4gc3Vic2V0IG9mIGB2YWx1ZXNgIGJldHdlZW4gYG1pbmAgYW5kIGBtYXhgIGluY2x1c2l2ZS5cbiAqIFZhbHVlcyBhcmUgYXNzdW1lZCB0byBiZSBpbiBzb3J0ZWQgb3JkZXIuXG4gKiBAcGFyYW0gdmFsdWVzIC0gc29ydGVkIGFycmF5IG9mIHZhbHVlc1xuICogQHBhcmFtIG1pbiAtIG1pbiB2YWx1ZVxuICogQHBhcmFtIG1heCAtIG1heCB2YWx1ZVxuICovIGZ1bmN0aW9uIF9maWx0ZXJCZXR3ZWVuKHZhbHVlcywgbWluLCBtYXgpIHtcbiAgICBsZXQgc3RhcnQgPSAwO1xuICAgIGxldCBlbmQgPSB2YWx1ZXMubGVuZ3RoO1xuICAgIHdoaWxlKHN0YXJ0IDwgZW5kICYmIHZhbHVlc1tzdGFydF0gPCBtaW4pe1xuICAgICAgICBzdGFydCsrO1xuICAgIH1cbiAgICB3aGlsZShlbmQgPiBzdGFydCAmJiB2YWx1ZXNbZW5kIC0gMV0gPiBtYXgpe1xuICAgICAgICBlbmQtLTtcbiAgICB9XG4gICAgcmV0dXJuIHN0YXJ0ID4gMCB8fCBlbmQgPCB2YWx1ZXMubGVuZ3RoID8gdmFsdWVzLnNsaWNlKHN0YXJ0LCBlbmQpIDogdmFsdWVzO1xufVxuY29uc3QgYXJyYXlFdmVudHMgPSBbXG4gICAgJ3B1c2gnLFxuICAgICdwb3AnLFxuICAgICdzaGlmdCcsXG4gICAgJ3NwbGljZScsXG4gICAgJ3Vuc2hpZnQnXG5dO1xuZnVuY3Rpb24gbGlzdGVuQXJyYXlFdmVudHMoYXJyYXksIGxpc3RlbmVyKSB7XG4gICAgaWYgKGFycmF5Ll9jaGFydGpzKSB7XG4gICAgICAgIGFycmF5Ll9jaGFydGpzLmxpc3RlbmVycy5wdXNoKGxpc3RlbmVyKTtcbiAgICAgICAgcmV0dXJuO1xuICAgIH1cbiAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXJyYXksICdfY2hhcnRqcycsIHtcbiAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICBlbnVtZXJhYmxlOiBmYWxzZSxcbiAgICAgICAgdmFsdWU6IHtcbiAgICAgICAgICAgIGxpc3RlbmVyczogW1xuICAgICAgICAgICAgICAgIGxpc3RlbmVyXG4gICAgICAgICAgICBdXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBhcnJheUV2ZW50cy5mb3JFYWNoKChrZXkpPT57XG4gICAgICAgIGNvbnN0IG1ldGhvZCA9ICdfb25EYXRhJyArIF9jYXBpdGFsaXplKGtleSk7XG4gICAgICAgIGNvbnN0IGJhc2UgPSBhcnJheVtrZXldO1xuICAgICAgICBPYmplY3QuZGVmaW5lUHJvcGVydHkoYXJyYXksIGtleSwge1xuICAgICAgICAgICAgY29uZmlndXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgZW51bWVyYWJsZTogZmFsc2UsXG4gICAgICAgICAgICB2YWx1ZSAoLi4uYXJncykge1xuICAgICAgICAgICAgICAgIGNvbnN0IHJlcyA9IGJhc2UuYXBwbHkodGhpcywgYXJncyk7XG4gICAgICAgICAgICAgICAgYXJyYXkuX2NoYXJ0anMubGlzdGVuZXJzLmZvckVhY2goKG9iamVjdCk9PntcbiAgICAgICAgICAgICAgICAgICAgaWYgKHR5cGVvZiBvYmplY3RbbWV0aG9kXSA9PT0gJ2Z1bmN0aW9uJykge1xuICAgICAgICAgICAgICAgICAgICAgICAgb2JqZWN0W21ldGhvZF0oLi4uYXJncyk7XG4gICAgICAgICAgICAgICAgICAgIH1cbiAgICAgICAgICAgICAgICB9KTtcbiAgICAgICAgICAgICAgICByZXR1cm4gcmVzO1xuICAgICAgICAgICAgfVxuICAgICAgICB9KTtcbiAgICB9KTtcbn1cbmZ1bmN0aW9uIHVubGlzdGVuQXJyYXlFdmVudHMoYXJyYXksIGxpc3RlbmVyKSB7XG4gICAgY29uc3Qgc3R1YiA9IGFycmF5Ll9jaGFydGpzO1xuICAgIGlmICghc3R1Yikge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGNvbnN0IGxpc3RlbmVycyA9IHN0dWIubGlzdGVuZXJzO1xuICAgIGNvbnN0IGluZGV4ID0gbGlzdGVuZXJzLmluZGV4T2YobGlzdGVuZXIpO1xuICAgIGlmIChpbmRleCAhPT0gLTEpIHtcbiAgICAgICAgbGlzdGVuZXJzLnNwbGljZShpbmRleCwgMSk7XG4gICAgfVxuICAgIGlmIChsaXN0ZW5lcnMubGVuZ3RoID4gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGFycmF5RXZlbnRzLmZvckVhY2goKGtleSk9PntcbiAgICAgICAgZGVsZXRlIGFycmF5W2tleV07XG4gICAgfSk7XG4gICAgZGVsZXRlIGFycmF5Ll9jaGFydGpzO1xufVxuLyoqXG4gKiBAcGFyYW0gaXRlbXNcbiAqLyBmdW5jdGlvbiBfYXJyYXlVbmlxdWUoaXRlbXMpIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0KGl0ZW1zKTtcbiAgICBpZiAoc2V0LnNpemUgPT09IGl0ZW1zLmxlbmd0aCkge1xuICAgICAgICByZXR1cm4gaXRlbXM7XG4gICAgfVxuICAgIHJldHVybiBBcnJheS5mcm9tKHNldCk7XG59XG5cbmZ1bmN0aW9uIGZvbnRTdHJpbmcocGl4ZWxTaXplLCBmb250U3R5bGUsIGZvbnRGYW1pbHkpIHtcbiAgICByZXR1cm4gZm9udFN0eWxlICsgJyAnICsgcGl4ZWxTaXplICsgJ3B4ICcgKyBmb250RmFtaWx5O1xufVxuLyoqXG4qIFJlcXVlc3QgYW5pbWF0aW9uIHBvbHlmaWxsXG4qLyBjb25zdCByZXF1ZXN0QW5pbUZyYW1lID0gZnVuY3Rpb24oKSB7XG4gICAgaWYgKHR5cGVvZiB3aW5kb3cgPT09ICd1bmRlZmluZWQnKSB7XG4gICAgICAgIHJldHVybiBmdW5jdGlvbihjYWxsYmFjaykge1xuICAgICAgICAgICAgcmV0dXJuIGNhbGxiYWNrKCk7XG4gICAgICAgIH07XG4gICAgfVxuICAgIHJldHVybiB3aW5kb3cucmVxdWVzdEFuaW1hdGlvbkZyYW1lO1xufSgpO1xuLyoqXG4gKiBUaHJvdHRsZXMgY2FsbGluZyBgZm5gIG9uY2UgcGVyIGFuaW1hdGlvbiBmcmFtZVxuICogTGF0ZXN0IGFyZ3VtZW50cyBhcmUgdXNlZCBvbiB0aGUgYWN0dWFsIGNhbGxcbiAqLyBmdW5jdGlvbiB0aHJvdHRsZWQoZm4sIHRoaXNBcmcpIHtcbiAgICBsZXQgYXJnc1RvVXNlID0gW107XG4gICAgbGV0IHRpY2tpbmcgPSBmYWxzZTtcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICAvLyBTYXZlIHRoZSBhcmdzIGZvciB1c2UgbGF0ZXJcbiAgICAgICAgYXJnc1RvVXNlID0gYXJncztcbiAgICAgICAgaWYgKCF0aWNraW5nKSB7XG4gICAgICAgICAgICB0aWNraW5nID0gdHJ1ZTtcbiAgICAgICAgICAgIHJlcXVlc3RBbmltRnJhbWUuY2FsbCh3aW5kb3csICgpPT57XG4gICAgICAgICAgICAgICAgdGlja2luZyA9IGZhbHNlO1xuICAgICAgICAgICAgICAgIGZuLmFwcGx5KHRoaXNBcmcsIGFyZ3NUb1VzZSk7XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgfVxuICAgIH07XG59XG4vKipcbiAqIERlYm91bmNlcyBjYWxsaW5nIGBmbmAgZm9yIGBkZWxheWAgbXNcbiAqLyBmdW5jdGlvbiBkZWJvdW5jZShmbiwgZGVsYXkpIHtcbiAgICBsZXQgdGltZW91dDtcbiAgICByZXR1cm4gZnVuY3Rpb24oLi4uYXJncykge1xuICAgICAgICBpZiAoZGVsYXkpIHtcbiAgICAgICAgICAgIGNsZWFyVGltZW91dCh0aW1lb3V0KTtcbiAgICAgICAgICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSwgYXJncyk7XG4gICAgICAgIH0gZWxzZSB7XG4gICAgICAgICAgICBmbi5hcHBseSh0aGlzLCBhcmdzKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZGVsYXk7XG4gICAgfTtcbn1cbi8qKlxuICogQ29udmVydHMgJ3N0YXJ0JyB0byAnbGVmdCcsICdlbmQnIHRvICdyaWdodCcgYW5kIG90aGVycyB0byAnY2VudGVyJ1xuICogQHByaXZhdGVcbiAqLyBjb25zdCBfdG9MZWZ0UmlnaHRDZW50ZXIgPSAoYWxpZ24pPT5hbGlnbiA9PT0gJ3N0YXJ0JyA/ICdsZWZ0JyA6IGFsaWduID09PSAnZW5kJyA/ICdyaWdodCcgOiAnY2VudGVyJztcbi8qKlxuICogUmV0dXJucyBgc3RhcnRgLCBgZW5kYCBvciBgKHN0YXJ0ICsgZW5kKSAvIDJgIGRlcGVuZGluZyBvbiBgYWxpZ25gLiBEZWZhdWx0cyB0byBgY2VudGVyYFxuICogQHByaXZhdGVcbiAqLyBjb25zdCBfYWxpZ25TdGFydEVuZCA9IChhbGlnbiwgc3RhcnQsIGVuZCk9PmFsaWduID09PSAnc3RhcnQnID8gc3RhcnQgOiBhbGlnbiA9PT0gJ2VuZCcgPyBlbmQgOiAoc3RhcnQgKyBlbmQpIC8gMjtcbi8qKlxuICogUmV0dXJucyBgbGVmdGAsIGByaWdodGAgb3IgYChsZWZ0ICsgcmlnaHQpIC8gMmAgZGVwZW5kaW5nIG9uIGBhbGlnbmAuIERlZmF1bHRzIHRvIGBsZWZ0YFxuICogQHByaXZhdGVcbiAqLyBjb25zdCBfdGV4dFggPSAoYWxpZ24sIGxlZnQsIHJpZ2h0LCBydGwpPT57XG4gICAgY29uc3QgY2hlY2sgPSBydGwgPyAnbGVmdCcgOiAncmlnaHQnO1xuICAgIHJldHVybiBhbGlnbiA9PT0gY2hlY2sgPyByaWdodCA6IGFsaWduID09PSAnY2VudGVyJyA/IChsZWZ0ICsgcmlnaHQpIC8gMiA6IGxlZnQ7XG59O1xuLyoqXG4gKiBSZXR1cm4gc3RhcnQgYW5kIGNvdW50IG9mIHZpc2libGUgcG9pbnRzLlxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfZ2V0U3RhcnRBbmRDb3VudE9mVmlzaWJsZVBvaW50cyhtZXRhLCBwb2ludHMsIGFuaW1hdGlvbnNEaXNhYmxlZCkge1xuICAgIGNvbnN0IHBvaW50Q291bnQgPSBwb2ludHMubGVuZ3RoO1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgbGV0IGNvdW50ID0gcG9pbnRDb3VudDtcbiAgICBpZiAobWV0YS5fc29ydGVkKSB7XG4gICAgICAgIGNvbnN0IHsgaVNjYWxlICwgdlNjYWxlICwgX3BhcnNlZCAgfSA9IG1ldGE7XG4gICAgICAgIGNvbnN0IHNwYW5HYXBzID0gbWV0YS5kYXRhc2V0ID8gbWV0YS5kYXRhc2V0Lm9wdGlvbnMgPyBtZXRhLmRhdGFzZXQub3B0aW9ucy5zcGFuR2FwcyA6IG51bGwgOiBudWxsO1xuICAgICAgICBjb25zdCBheGlzID0gaVNjYWxlLmF4aXM7XG4gICAgICAgIGNvbnN0IHsgbWluICwgbWF4ICwgbWluRGVmaW5lZCAsIG1heERlZmluZWQgIH0gPSBpU2NhbGUuZ2V0VXNlckJvdW5kcygpO1xuICAgICAgICBpZiAobWluRGVmaW5lZCkge1xuICAgICAgICAgICAgc3RhcnQgPSBNYXRoLm1pbigvLyBAdHMtZXhwZWN0LWVycm9yIE5lZWQgdG8gdHlwZSBfcGFyc2VkXG4gICAgICAgICAgICBfbG9va3VwQnlLZXkoX3BhcnNlZCwgYXhpcywgbWluKS5sbywgLy8gQHRzLWV4cGVjdC1lcnJvciBOZWVkIHRvIGZpeCB0eXBlcyBvbiBfbG9va3VwQnlLZXlcbiAgICAgICAgICAgIGFuaW1hdGlvbnNEaXNhYmxlZCA/IHBvaW50Q291bnQgOiBfbG9va3VwQnlLZXkocG9pbnRzLCBheGlzLCBpU2NhbGUuZ2V0UGl4ZWxGb3JWYWx1ZShtaW4pKS5sbyk7XG4gICAgICAgICAgICBpZiAoc3BhbkdhcHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZVRvRGVmaW5lZExvID0gX3BhcnNlZC5zbGljZSgwLCBzdGFydCArIDEpLnJldmVyc2UoKS5maW5kSW5kZXgoKHBvaW50KT0+IWlzTnVsbE9yVW5kZWYocG9pbnRbdlNjYWxlLmF4aXNdKSk7XG4gICAgICAgICAgICAgICAgc3RhcnQgLT0gTWF0aC5tYXgoMCwgZGlzdGFuY2VUb0RlZmluZWRMbyk7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBzdGFydCA9IF9saW1pdFZhbHVlKHN0YXJ0LCAwLCBwb2ludENvdW50IC0gMSk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKG1heERlZmluZWQpIHtcbiAgICAgICAgICAgIGxldCBlbmQgPSBNYXRoLm1heCgvLyBAdHMtZXhwZWN0LWVycm9yIE5lZWQgdG8gdHlwZSBfcGFyc2VkXG4gICAgICAgICAgICBfbG9va3VwQnlLZXkoX3BhcnNlZCwgaVNjYWxlLmF4aXMsIG1heCwgdHJ1ZSkuaGkgKyAxLCAvLyBAdHMtZXhwZWN0LWVycm9yIE5lZWQgdG8gZml4IHR5cGVzIG9uIF9sb29rdXBCeUtleVxuICAgICAgICAgICAgYW5pbWF0aW9uc0Rpc2FibGVkID8gMCA6IF9sb29rdXBCeUtleShwb2ludHMsIGF4aXMsIGlTY2FsZS5nZXRQaXhlbEZvclZhbHVlKG1heCksIHRydWUpLmhpICsgMSk7XG4gICAgICAgICAgICBpZiAoc3BhbkdhcHMpIHtcbiAgICAgICAgICAgICAgICBjb25zdCBkaXN0YW5jZVRvRGVmaW5lZEhpID0gX3BhcnNlZC5zbGljZShlbmQgLSAxKS5maW5kSW5kZXgoKHBvaW50KT0+IWlzTnVsbE9yVW5kZWYocG9pbnRbdlNjYWxlLmF4aXNdKSk7XG4gICAgICAgICAgICAgICAgZW5kICs9IE1hdGgubWF4KDAsIGRpc3RhbmNlVG9EZWZpbmVkSGkpO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgY291bnQgPSBfbGltaXRWYWx1ZShlbmQsIHN0YXJ0LCBwb2ludENvdW50KSAtIHN0YXJ0O1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgY291bnQgPSBwb2ludENvdW50IC0gc3RhcnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGNvdW50XG4gICAgfTtcbn1cbi8qKlxuICogQ2hlY2tzIGlmIHRoZSBzY2FsZSByYW5nZXMgaGF2ZSBjaGFuZ2VkLlxuICogQHBhcmFtIHtvYmplY3R9IG1ldGEgLSBkYXRhc2V0IG1ldGEuXG4gKiBAcmV0dXJucyB7Ym9vbGVhbn1cbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX3NjYWxlUmFuZ2VzQ2hhbmdlZChtZXRhKSB7XG4gICAgY29uc3QgeyB4U2NhbGUgLCB5U2NhbGUgLCBfc2NhbGVSYW5nZXMgIH0gPSBtZXRhO1xuICAgIGNvbnN0IG5ld1JhbmdlcyA9IHtcbiAgICAgICAgeG1pbjogeFNjYWxlLm1pbixcbiAgICAgICAgeG1heDogeFNjYWxlLm1heCxcbiAgICAgICAgeW1pbjogeVNjYWxlLm1pbixcbiAgICAgICAgeW1heDogeVNjYWxlLm1heFxuICAgIH07XG4gICAgaWYgKCFfc2NhbGVSYW5nZXMpIHtcbiAgICAgICAgbWV0YS5fc2NhbGVSYW5nZXMgPSBuZXdSYW5nZXM7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBjb25zdCBjaGFuZ2VkID0gX3NjYWxlUmFuZ2VzLnhtaW4gIT09IHhTY2FsZS5taW4gfHwgX3NjYWxlUmFuZ2VzLnhtYXggIT09IHhTY2FsZS5tYXggfHwgX3NjYWxlUmFuZ2VzLnltaW4gIT09IHlTY2FsZS5taW4gfHwgX3NjYWxlUmFuZ2VzLnltYXggIT09IHlTY2FsZS5tYXg7XG4gICAgT2JqZWN0LmFzc2lnbihfc2NhbGVSYW5nZXMsIG5ld1Jhbmdlcyk7XG4gICAgcmV0dXJuIGNoYW5nZWQ7XG59XG5cbmNvbnN0IGF0RWRnZSA9ICh0KT0+dCA9PT0gMCB8fCB0ID09PSAxO1xuY29uc3QgZWxhc3RpY0luID0gKHQsIHMsIHApPT4tKE1hdGgucG93KDIsIDEwICogKHQgLT0gMSkpICogTWF0aC5zaW4oKHQgLSBzKSAqIFRBVSAvIHApKTtcbmNvbnN0IGVsYXN0aWNPdXQgPSAodCwgcywgcCk9Pk1hdGgucG93KDIsIC0xMCAqIHQpICogTWF0aC5zaW4oKHQgLSBzKSAqIFRBVSAvIHApICsgMTtcbi8qKlxuICogRWFzaW5nIGZ1bmN0aW9ucyBhZGFwdGVkIGZyb20gUm9iZXJ0IFBlbm5lcidzIGVhc2luZyBlcXVhdGlvbnMuXG4gKiBAbmFtZXNwYWNlIENoYXJ0LmhlbHBlcnMuZWFzaW5nLmVmZmVjdHNcbiAqIEBzZWUgaHR0cDovL3d3dy5yb2JlcnRwZW5uZXIuY29tL2Vhc2luZy9cbiAqLyBjb25zdCBlZmZlY3RzID0ge1xuICAgIGxpbmVhcjogKHQpPT50LFxuICAgIGVhc2VJblF1YWQ6ICh0KT0+dCAqIHQsXG4gICAgZWFzZU91dFF1YWQ6ICh0KT0+LXQgKiAodCAtIDIpLFxuICAgIGVhc2VJbk91dFF1YWQ6ICh0KT0+KHQgLz0gMC41KSA8IDEgPyAwLjUgKiB0ICogdCA6IC0wLjUgKiAoLS10ICogKHQgLSAyKSAtIDEpLFxuICAgIGVhc2VJbkN1YmljOiAodCk9PnQgKiB0ICogdCxcbiAgICBlYXNlT3V0Q3ViaWM6ICh0KT0+KHQgLT0gMSkgKiB0ICogdCArIDEsXG4gICAgZWFzZUluT3V0Q3ViaWM6ICh0KT0+KHQgLz0gMC41KSA8IDEgPyAwLjUgKiB0ICogdCAqIHQgOiAwLjUgKiAoKHQgLT0gMikgKiB0ICogdCArIDIpLFxuICAgIGVhc2VJblF1YXJ0OiAodCk9PnQgKiB0ICogdCAqIHQsXG4gICAgZWFzZU91dFF1YXJ0OiAodCk9Pi0oKHQgLT0gMSkgKiB0ICogdCAqIHQgLSAxKSxcbiAgICBlYXNlSW5PdXRRdWFydDogKHQpPT4odCAvPSAwLjUpIDwgMSA/IDAuNSAqIHQgKiB0ICogdCAqIHQgOiAtMC41ICogKCh0IC09IDIpICogdCAqIHQgKiB0IC0gMiksXG4gICAgZWFzZUluUXVpbnQ6ICh0KT0+dCAqIHQgKiB0ICogdCAqIHQsXG4gICAgZWFzZU91dFF1aW50OiAodCk9Pih0IC09IDEpICogdCAqIHQgKiB0ICogdCArIDEsXG4gICAgZWFzZUluT3V0UXVpbnQ6ICh0KT0+KHQgLz0gMC41KSA8IDEgPyAwLjUgKiB0ICogdCAqIHQgKiB0ICogdCA6IDAuNSAqICgodCAtPSAyKSAqIHQgKiB0ICogdCAqIHQgKyAyKSxcbiAgICBlYXNlSW5TaW5lOiAodCk9Pi1NYXRoLmNvcyh0ICogSEFMRl9QSSkgKyAxLFxuICAgIGVhc2VPdXRTaW5lOiAodCk9Pk1hdGguc2luKHQgKiBIQUxGX1BJKSxcbiAgICBlYXNlSW5PdXRTaW5lOiAodCk9Pi0wLjUgKiAoTWF0aC5jb3MoUEkgKiB0KSAtIDEpLFxuICAgIGVhc2VJbkV4cG86ICh0KT0+dCA9PT0gMCA/IDAgOiBNYXRoLnBvdygyLCAxMCAqICh0IC0gMSkpLFxuICAgIGVhc2VPdXRFeHBvOiAodCk9PnQgPT09IDEgPyAxIDogLU1hdGgucG93KDIsIC0xMCAqIHQpICsgMSxcbiAgICBlYXNlSW5PdXRFeHBvOiAodCk9PmF0RWRnZSh0KSA/IHQgOiB0IDwgMC41ID8gMC41ICogTWF0aC5wb3coMiwgMTAgKiAodCAqIDIgLSAxKSkgOiAwLjUgKiAoLU1hdGgucG93KDIsIC0xMCAqICh0ICogMiAtIDEpKSArIDIpLFxuICAgIGVhc2VJbkNpcmM6ICh0KT0+dCA+PSAxID8gdCA6IC0oTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSxcbiAgICBlYXNlT3V0Q2lyYzogKHQpPT5NYXRoLnNxcnQoMSAtICh0IC09IDEpICogdCksXG4gICAgZWFzZUluT3V0Q2lyYzogKHQpPT4odCAvPSAwLjUpIDwgMSA/IC0wLjUgKiAoTWF0aC5zcXJ0KDEgLSB0ICogdCkgLSAxKSA6IDAuNSAqIChNYXRoLnNxcnQoMSAtICh0IC09IDIpICogdCkgKyAxKSxcbiAgICBlYXNlSW5FbGFzdGljOiAodCk9PmF0RWRnZSh0KSA/IHQgOiBlbGFzdGljSW4odCwgMC4wNzUsIDAuMyksXG4gICAgZWFzZU91dEVsYXN0aWM6ICh0KT0+YXRFZGdlKHQpID8gdCA6IGVsYXN0aWNPdXQodCwgMC4wNzUsIDAuMyksXG4gICAgZWFzZUluT3V0RWxhc3RpYyAodCkge1xuICAgICAgICBjb25zdCBzID0gMC4xMTI1O1xuICAgICAgICBjb25zdCBwID0gMC40NTtcbiAgICAgICAgcmV0dXJuIGF0RWRnZSh0KSA/IHQgOiB0IDwgMC41ID8gMC41ICogZWxhc3RpY0luKHQgKiAyLCBzLCBwKSA6IDAuNSArIDAuNSAqIGVsYXN0aWNPdXQodCAqIDIgLSAxLCBzLCBwKTtcbiAgICB9LFxuICAgIGVhc2VJbkJhY2sgKHQpIHtcbiAgICAgICAgY29uc3QgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiB0ICogdCAqICgocyArIDEpICogdCAtIHMpO1xuICAgIH0sXG4gICAgZWFzZU91dEJhY2sgKHQpIHtcbiAgICAgICAgY29uc3QgcyA9IDEuNzAxNTg7XG4gICAgICAgIHJldHVybiAodCAtPSAxKSAqIHQgKiAoKHMgKyAxKSAqIHQgKyBzKSArIDE7XG4gICAgfSxcbiAgICBlYXNlSW5PdXRCYWNrICh0KSB7XG4gICAgICAgIGxldCBzID0gMS43MDE1ODtcbiAgICAgICAgaWYgKCh0IC89IDAuNSkgPCAxKSB7XG4gICAgICAgICAgICByZXR1cm4gMC41ICogKHQgKiB0ICogKCgocyAqPSAxLjUyNSkgKyAxKSAqIHQgLSBzKSk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIDAuNSAqICgodCAtPSAyKSAqIHQgKiAoKChzICo9IDEuNTI1KSArIDEpICogdCArIHMpICsgMik7XG4gICAgfSxcbiAgICBlYXNlSW5Cb3VuY2U6ICh0KT0+MSAtIGVmZmVjdHMuZWFzZU91dEJvdW5jZSgxIC0gdCksXG4gICAgZWFzZU91dEJvdW5jZSAodCkge1xuICAgICAgICBjb25zdCBtID0gNy41NjI1O1xuICAgICAgICBjb25zdCBkID0gMi43NTtcbiAgICAgICAgaWYgKHQgPCAxIC8gZCkge1xuICAgICAgICAgICAgcmV0dXJuIG0gKiB0ICogdDtcbiAgICAgICAgfVxuICAgICAgICBpZiAodCA8IDIgLyBkKSB7XG4gICAgICAgICAgICByZXR1cm4gbSAqICh0IC09IDEuNSAvIGQpICogdCArIDAuNzU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHQgPCAyLjUgLyBkKSB7XG4gICAgICAgICAgICByZXR1cm4gbSAqICh0IC09IDIuMjUgLyBkKSAqIHQgKyAwLjkzNzU7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuIG0gKiAodCAtPSAyLjYyNSAvIGQpICogdCArIDAuOTg0Mzc1O1xuICAgIH0sXG4gICAgZWFzZUluT3V0Qm91bmNlOiAodCk9PnQgPCAwLjUgPyBlZmZlY3RzLmVhc2VJbkJvdW5jZSh0ICogMikgKiAwLjUgOiBlZmZlY3RzLmVhc2VPdXRCb3VuY2UodCAqIDIgLSAxKSAqIDAuNSArIDAuNVxufTtcblxuZnVuY3Rpb24gaXNQYXR0ZXJuT3JHcmFkaWVudCh2YWx1ZSkge1xuICAgIGlmICh2YWx1ZSAmJiB0eXBlb2YgdmFsdWUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIGNvbnN0IHR5cGUgPSB2YWx1ZS50b1N0cmluZygpO1xuICAgICAgICByZXR1cm4gdHlwZSA9PT0gJ1tvYmplY3QgQ2FudmFzUGF0dGVybl0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IENhbnZhc0dyYWRpZW50XSc7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbmZ1bmN0aW9uIGNvbG9yKHZhbHVlKSB7XG4gICAgcmV0dXJuIGlzUGF0dGVybk9yR3JhZGllbnQodmFsdWUpID8gdmFsdWUgOiBuZXcgQ29sb3IodmFsdWUpO1xufVxuZnVuY3Rpb24gZ2V0SG92ZXJDb2xvcih2YWx1ZSkge1xuICAgIHJldHVybiBpc1BhdHRlcm5PckdyYWRpZW50KHZhbHVlKSA/IHZhbHVlIDogbmV3IENvbG9yKHZhbHVlKS5zYXR1cmF0ZSgwLjUpLmRhcmtlbigwLjEpLmhleFN0cmluZygpO1xufVxuXG5jb25zdCBudW1iZXJzID0gW1xuICAgICd4JyxcbiAgICAneScsXG4gICAgJ2JvcmRlcldpZHRoJyxcbiAgICAncmFkaXVzJyxcbiAgICAndGVuc2lvbidcbl07XG5jb25zdCBjb2xvcnMgPSBbXG4gICAgJ2NvbG9yJyxcbiAgICAnYm9yZGVyQ29sb3InLFxuICAgICdiYWNrZ3JvdW5kQ29sb3InXG5dO1xuZnVuY3Rpb24gYXBwbHlBbmltYXRpb25zRGVmYXVsdHMoZGVmYXVsdHMpIHtcbiAgICBkZWZhdWx0cy5zZXQoJ2FuaW1hdGlvbicsIHtcbiAgICAgICAgZGVsYXk6IHVuZGVmaW5lZCxcbiAgICAgICAgZHVyYXRpb246IDEwMDAsXG4gICAgICAgIGVhc2luZzogJ2Vhc2VPdXRRdWFydCcsXG4gICAgICAgIGZuOiB1bmRlZmluZWQsXG4gICAgICAgIGZyb206IHVuZGVmaW5lZCxcbiAgICAgICAgbG9vcDogdW5kZWZpbmVkLFxuICAgICAgICB0bzogdW5kZWZpbmVkLFxuICAgICAgICB0eXBlOiB1bmRlZmluZWRcbiAgICB9KTtcbiAgICBkZWZhdWx0cy5kZXNjcmliZSgnYW5pbWF0aW9uJywge1xuICAgICAgICBfZmFsbGJhY2s6IGZhbHNlLFxuICAgICAgICBfaW5kZXhhYmxlOiBmYWxzZSxcbiAgICAgICAgX3NjcmlwdGFibGU6IChuYW1lKT0+bmFtZSAhPT0gJ29uUHJvZ3Jlc3MnICYmIG5hbWUgIT09ICdvbkNvbXBsZXRlJyAmJiBuYW1lICE9PSAnZm4nXG4gICAgfSk7XG4gICAgZGVmYXVsdHMuc2V0KCdhbmltYXRpb25zJywge1xuICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgIHR5cGU6ICdjb2xvcicsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBjb2xvcnNcbiAgICAgICAgfSxcbiAgICAgICAgbnVtYmVyczoge1xuICAgICAgICAgICAgdHlwZTogJ251bWJlcicsXG4gICAgICAgICAgICBwcm9wZXJ0aWVzOiBudW1iZXJzXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkZWZhdWx0cy5kZXNjcmliZSgnYW5pbWF0aW9ucycsIHtcbiAgICAgICAgX2ZhbGxiYWNrOiAnYW5pbWF0aW9uJ1xuICAgIH0pO1xuICAgIGRlZmF1bHRzLnNldCgndHJhbnNpdGlvbnMnLCB7XG4gICAgICAgIGFjdGl2ZToge1xuICAgICAgICAgICAgYW5pbWF0aW9uOiB7XG4gICAgICAgICAgICAgICAgZHVyYXRpb246IDQwMFxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICByZXNpemU6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbjoge1xuICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHNob3c6IHtcbiAgICAgICAgICAgIGFuaW1hdGlvbnM6IHtcbiAgICAgICAgICAgICAgICBjb2xvcnM6IHtcbiAgICAgICAgICAgICAgICAgICAgZnJvbTogJ3RyYW5zcGFyZW50J1xuICAgICAgICAgICAgICAgIH0sXG4gICAgICAgICAgICAgICAgdmlzaWJsZToge1xuICAgICAgICAgICAgICAgICAgICB0eXBlOiAnYm9vbGVhbicsXG4gICAgICAgICAgICAgICAgICAgIGR1cmF0aW9uOiAwXG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICBoaWRlOiB7XG4gICAgICAgICAgICBhbmltYXRpb25zOiB7XG4gICAgICAgICAgICAgICAgY29sb3JzOiB7XG4gICAgICAgICAgICAgICAgICAgIHRvOiAndHJhbnNwYXJlbnQnXG4gICAgICAgICAgICAgICAgfSxcbiAgICAgICAgICAgICAgICB2aXNpYmxlOiB7XG4gICAgICAgICAgICAgICAgICAgIHR5cGU6ICdib29sZWFuJyxcbiAgICAgICAgICAgICAgICAgICAgZWFzaW5nOiAnbGluZWFyJyxcbiAgICAgICAgICAgICAgICAgICAgZm46ICh2KT0+diB8IDBcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICB9KTtcbn1cblxuZnVuY3Rpb24gYXBwbHlMYXlvdXRzRGVmYXVsdHMoZGVmYXVsdHMpIHtcbiAgICBkZWZhdWx0cy5zZXQoJ2xheW91dCcsIHtcbiAgICAgICAgYXV0b1BhZGRpbmc6IHRydWUsXG4gICAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgICAgIHRvcDogMCxcbiAgICAgICAgICAgIHJpZ2h0OiAwLFxuICAgICAgICAgICAgYm90dG9tOiAwLFxuICAgICAgICAgICAgbGVmdDogMFxuICAgICAgICB9XG4gICAgfSk7XG59XG5cbmNvbnN0IGludGxDYWNoZSA9IG5ldyBNYXAoKTtcbmZ1bmN0aW9uIGdldE51bWJlckZvcm1hdChsb2NhbGUsIG9wdGlvbnMpIHtcbiAgICBvcHRpb25zID0gb3B0aW9ucyB8fCB7fTtcbiAgICBjb25zdCBjYWNoZUtleSA9IGxvY2FsZSArIEpTT04uc3RyaW5naWZ5KG9wdGlvbnMpO1xuICAgIGxldCBmb3JtYXR0ZXIgPSBpbnRsQ2FjaGUuZ2V0KGNhY2hlS2V5KTtcbiAgICBpZiAoIWZvcm1hdHRlcikge1xuICAgICAgICBmb3JtYXR0ZXIgPSBuZXcgSW50bC5OdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKTtcbiAgICAgICAgaW50bENhY2hlLnNldChjYWNoZUtleSwgZm9ybWF0dGVyKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdHRlcjtcbn1cbmZ1bmN0aW9uIGZvcm1hdE51bWJlcihudW0sIGxvY2FsZSwgb3B0aW9ucykge1xuICAgIHJldHVybiBnZXROdW1iZXJGb3JtYXQobG9jYWxlLCBvcHRpb25zKS5mb3JtYXQobnVtKTtcbn1cblxuY29uc3QgZm9ybWF0dGVycyA9IHtcbiB2YWx1ZXMgKHZhbHVlKSB7XG4gICAgICAgIHJldHVybiBpc0FycmF5KHZhbHVlKSA/ICB2YWx1ZSA6ICcnICsgdmFsdWU7XG4gICAgfSxcbiBudW1lcmljICh0aWNrVmFsdWUsIGluZGV4LCB0aWNrcykge1xuICAgICAgICBpZiAodGlja1ZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJzAnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IGxvY2FsZSA9IHRoaXMuY2hhcnQub3B0aW9ucy5sb2NhbGU7XG4gICAgICAgIGxldCBub3RhdGlvbjtcbiAgICAgICAgbGV0IGRlbHRhID0gdGlja1ZhbHVlO1xuICAgICAgICBpZiAodGlja3MubGVuZ3RoID4gMSkge1xuICAgICAgICAgICAgY29uc3QgbWF4VGljayA9IE1hdGgubWF4KE1hdGguYWJzKHRpY2tzWzBdLnZhbHVlKSwgTWF0aC5hYnModGlja3NbdGlja3MubGVuZ3RoIC0gMV0udmFsdWUpKTtcbiAgICAgICAgICAgIGlmIChtYXhUaWNrIDwgMWUtNCB8fCBtYXhUaWNrID4gMWUrMTUpIHtcbiAgICAgICAgICAgICAgICBub3RhdGlvbiA9ICdzY2llbnRpZmljJztcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGRlbHRhID0gY2FsY3VsYXRlRGVsdGEodGlja1ZhbHVlLCB0aWNrcyk7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgbG9nRGVsdGEgPSBsb2cxMChNYXRoLmFicyhkZWx0YSkpO1xuICAgICAgICBjb25zdCBudW1EZWNpbWFsID0gaXNOYU4obG9nRGVsdGEpID8gMSA6IE1hdGgubWF4KE1hdGgubWluKC0xICogTWF0aC5mbG9vcihsb2dEZWx0YSksIDIwKSwgMCk7XG4gICAgICAgIGNvbnN0IG9wdGlvbnMgPSB7XG4gICAgICAgICAgICBub3RhdGlvbixcbiAgICAgICAgICAgIG1pbmltdW1GcmFjdGlvbkRpZ2l0czogbnVtRGVjaW1hbCxcbiAgICAgICAgICAgIG1heGltdW1GcmFjdGlvbkRpZ2l0czogbnVtRGVjaW1hbFxuICAgICAgICB9O1xuICAgICAgICBPYmplY3QuYXNzaWduKG9wdGlvbnMsIHRoaXMub3B0aW9ucy50aWNrcy5mb3JtYXQpO1xuICAgICAgICByZXR1cm4gZm9ybWF0TnVtYmVyKHRpY2tWYWx1ZSwgbG9jYWxlLCBvcHRpb25zKTtcbiAgICB9LFxuIGxvZ2FyaXRobWljICh0aWNrVmFsdWUsIGluZGV4LCB0aWNrcykge1xuICAgICAgICBpZiAodGlja1ZhbHVlID09PSAwKSB7XG4gICAgICAgICAgICByZXR1cm4gJzAnO1xuICAgICAgICB9XG4gICAgICAgIGNvbnN0IHJlbWFpbiA9IHRpY2tzW2luZGV4XS5zaWduaWZpY2FuZCB8fCB0aWNrVmFsdWUgLyBNYXRoLnBvdygxMCwgTWF0aC5mbG9vcihsb2cxMCh0aWNrVmFsdWUpKSk7XG4gICAgICAgIGlmIChbXG4gICAgICAgICAgICAxLFxuICAgICAgICAgICAgMixcbiAgICAgICAgICAgIDMsXG4gICAgICAgICAgICA1LFxuICAgICAgICAgICAgMTAsXG4gICAgICAgICAgICAxNVxuICAgICAgICBdLmluY2x1ZGVzKHJlbWFpbikgfHwgaW5kZXggPiAwLjggKiB0aWNrcy5sZW5ndGgpIHtcbiAgICAgICAgICAgIHJldHVybiBmb3JtYXR0ZXJzLm51bWVyaWMuY2FsbCh0aGlzLCB0aWNrVmFsdWUsIGluZGV4LCB0aWNrcyk7XG4gICAgICAgIH1cbiAgICAgICAgcmV0dXJuICcnO1xuICAgIH1cbn07XG5mdW5jdGlvbiBjYWxjdWxhdGVEZWx0YSh0aWNrVmFsdWUsIHRpY2tzKSB7XG4gICAgbGV0IGRlbHRhID0gdGlja3MubGVuZ3RoID4gMyA/IHRpY2tzWzJdLnZhbHVlIC0gdGlja3NbMV0udmFsdWUgOiB0aWNrc1sxXS52YWx1ZSAtIHRpY2tzWzBdLnZhbHVlO1xuICAgIGlmIChNYXRoLmFicyhkZWx0YSkgPj0gMSAmJiB0aWNrVmFsdWUgIT09IE1hdGguZmxvb3IodGlja1ZhbHVlKSkge1xuICAgICAgICBkZWx0YSA9IHRpY2tWYWx1ZSAtIE1hdGguZmxvb3IodGlja1ZhbHVlKTtcbiAgICB9XG4gICAgcmV0dXJuIGRlbHRhO1xufVxuIHZhciBUaWNrcyA9IHtcbiAgICBmb3JtYXR0ZXJzXG59O1xuXG5mdW5jdGlvbiBhcHBseVNjYWxlRGVmYXVsdHMoZGVmYXVsdHMpIHtcbiAgICBkZWZhdWx0cy5zZXQoJ3NjYWxlJywge1xuICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICBvZmZzZXQ6IGZhbHNlLFxuICAgICAgICByZXZlcnNlOiBmYWxzZSxcbiAgICAgICAgYmVnaW5BdFplcm86IGZhbHNlLFxuIGJvdW5kczogJ3RpY2tzJyxcbiAgICAgICAgY2xpcDogdHJ1ZSxcbiBncmFjZTogMCxcbiAgICAgICAgZ3JpZDoge1xuICAgICAgICAgICAgZGlzcGxheTogdHJ1ZSxcbiAgICAgICAgICAgIGxpbmVXaWR0aDogMSxcbiAgICAgICAgICAgIGRyYXdPbkNoYXJ0QXJlYTogdHJ1ZSxcbiAgICAgICAgICAgIGRyYXdUaWNrczogdHJ1ZSxcbiAgICAgICAgICAgIHRpY2tMZW5ndGg6IDgsXG4gICAgICAgICAgICB0aWNrV2lkdGg6IChfY3R4LCBvcHRpb25zKT0+b3B0aW9ucy5saW5lV2lkdGgsXG4gICAgICAgICAgICB0aWNrQ29sb3I6IChfY3R4LCBvcHRpb25zKT0+b3B0aW9ucy5jb2xvcixcbiAgICAgICAgICAgIG9mZnNldDogZmFsc2VcbiAgICAgICAgfSxcbiAgICAgICAgYm9yZGVyOiB7XG4gICAgICAgICAgICBkaXNwbGF5OiB0cnVlLFxuICAgICAgICAgICAgZGFzaDogW10sXG4gICAgICAgICAgICBkYXNoT2Zmc2V0OiAwLjAsXG4gICAgICAgICAgICB3aWR0aDogMVxuICAgICAgICB9LFxuICAgICAgICB0aXRsZToge1xuICAgICAgICAgICAgZGlzcGxheTogZmFsc2UsXG4gICAgICAgICAgICB0ZXh0OiAnJyxcbiAgICAgICAgICAgIHBhZGRpbmc6IHtcbiAgICAgICAgICAgICAgICB0b3A6IDQsXG4gICAgICAgICAgICAgICAgYm90dG9tOiA0XG4gICAgICAgICAgICB9XG4gICAgICAgIH0sXG4gICAgICAgIHRpY2tzOiB7XG4gICAgICAgICAgICBtaW5Sb3RhdGlvbjogMCxcbiAgICAgICAgICAgIG1heFJvdGF0aW9uOiA1MCxcbiAgICAgICAgICAgIG1pcnJvcjogZmFsc2UsXG4gICAgICAgICAgICB0ZXh0U3Ryb2tlV2lkdGg6IDAsXG4gICAgICAgICAgICB0ZXh0U3Ryb2tlQ29sb3I6ICcnLFxuICAgICAgICAgICAgcGFkZGluZzogMyxcbiAgICAgICAgICAgIGRpc3BsYXk6IHRydWUsXG4gICAgICAgICAgICBhdXRvU2tpcDogdHJ1ZSxcbiAgICAgICAgICAgIGF1dG9Ta2lwUGFkZGluZzogMyxcbiAgICAgICAgICAgIGxhYmVsT2Zmc2V0OiAwLFxuICAgICAgICAgICAgY2FsbGJhY2s6IFRpY2tzLmZvcm1hdHRlcnMudmFsdWVzLFxuICAgICAgICAgICAgbWlub3I6IHt9LFxuICAgICAgICAgICAgbWFqb3I6IHt9LFxuICAgICAgICAgICAgYWxpZ246ICdjZW50ZXInLFxuICAgICAgICAgICAgY3Jvc3NBbGlnbjogJ25lYXInLFxuICAgICAgICAgICAgc2hvd0xhYmVsQmFja2Ryb3A6IGZhbHNlLFxuICAgICAgICAgICAgYmFja2Ryb3BDb2xvcjogJ3JnYmEoMjU1LCAyNTUsIDI1NSwgMC43NSknLFxuICAgICAgICAgICAgYmFja2Ryb3BQYWRkaW5nOiAyXG4gICAgICAgIH1cbiAgICB9KTtcbiAgICBkZWZhdWx0cy5yb3V0ZSgnc2NhbGUudGlja3MnLCAnY29sb3InLCAnJywgJ2NvbG9yJyk7XG4gICAgZGVmYXVsdHMucm91dGUoJ3NjYWxlLmdyaWQnLCAnY29sb3InLCAnJywgJ2JvcmRlckNvbG9yJyk7XG4gICAgZGVmYXVsdHMucm91dGUoJ3NjYWxlLmJvcmRlcicsICdjb2xvcicsICcnLCAnYm9yZGVyQ29sb3InKTtcbiAgICBkZWZhdWx0cy5yb3V0ZSgnc2NhbGUudGl0bGUnLCAnY29sb3InLCAnJywgJ2NvbG9yJyk7XG4gICAgZGVmYXVsdHMuZGVzY3JpYmUoJ3NjYWxlJywge1xuICAgICAgICBfZmFsbGJhY2s6IGZhbHNlLFxuICAgICAgICBfc2NyaXB0YWJsZTogKG5hbWUpPT4hbmFtZS5zdGFydHNXaXRoKCdiZWZvcmUnKSAmJiAhbmFtZS5zdGFydHNXaXRoKCdhZnRlcicpICYmIG5hbWUgIT09ICdjYWxsYmFjaycgJiYgbmFtZSAhPT0gJ3BhcnNlcicsXG4gICAgICAgIF9pbmRleGFibGU6IChuYW1lKT0+bmFtZSAhPT0gJ2JvcmRlckRhc2gnICYmIG5hbWUgIT09ICd0aWNrQm9yZGVyRGFzaCcgJiYgbmFtZSAhPT0gJ2Rhc2gnXG4gICAgfSk7XG4gICAgZGVmYXVsdHMuZGVzY3JpYmUoJ3NjYWxlcycsIHtcbiAgICAgICAgX2ZhbGxiYWNrOiAnc2NhbGUnXG4gICAgfSk7XG4gICAgZGVmYXVsdHMuZGVzY3JpYmUoJ3NjYWxlLnRpY2tzJywge1xuICAgICAgICBfc2NyaXB0YWJsZTogKG5hbWUpPT5uYW1lICE9PSAnYmFja2Ryb3BQYWRkaW5nJyAmJiBuYW1lICE9PSAnY2FsbGJhY2snLFxuICAgICAgICBfaW5kZXhhYmxlOiAobmFtZSk9Pm5hbWUgIT09ICdiYWNrZHJvcFBhZGRpbmcnXG4gICAgfSk7XG59XG5cbmNvbnN0IG92ZXJyaWRlcyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG5jb25zdCBkZXNjcmlwdG9ycyA9IE9iamVjdC5jcmVhdGUobnVsbCk7XG4gZnVuY3Rpb24gZ2V0U2NvcGUkMShub2RlLCBrZXkpIHtcbiAgICBpZiAoIWtleSkge1xuICAgICAgICByZXR1cm4gbm9kZTtcbiAgICB9XG4gICAgY29uc3Qga2V5cyA9IGtleS5zcGxpdCgnLicpO1xuICAgIGZvcihsZXQgaSA9IDAsIG4gPSBrZXlzLmxlbmd0aDsgaSA8IG47ICsraSl7XG4gICAgICAgIGNvbnN0IGsgPSBrZXlzW2ldO1xuICAgICAgICBub2RlID0gbm9kZVtrXSB8fCAobm9kZVtrXSA9IE9iamVjdC5jcmVhdGUobnVsbCkpO1xuICAgIH1cbiAgICByZXR1cm4gbm9kZTtcbn1cbmZ1bmN0aW9uIHNldChyb290LCBzY29wZSwgdmFsdWVzKSB7XG4gICAgaWYgKHR5cGVvZiBzY29wZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgcmV0dXJuIG1lcmdlKGdldFNjb3BlJDEocm9vdCwgc2NvcGUpLCB2YWx1ZXMpO1xuICAgIH1cbiAgICByZXR1cm4gbWVyZ2UoZ2V0U2NvcGUkMShyb290LCAnJyksIHNjb3BlKTtcbn1cbiBjbGFzcyBEZWZhdWx0cyB7XG4gICAgY29uc3RydWN0b3IoX2Rlc2NyaXB0b3JzLCBfYXBwbGllcnMpe1xuICAgICAgICB0aGlzLmFuaW1hdGlvbiA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5iYWNrZ3JvdW5kQ29sb3IgPSAncmdiYSgwLDAsMCwwLjEpJztcbiAgICAgICAgdGhpcy5ib3JkZXJDb2xvciA9ICdyZ2JhKDAsMCwwLDAuMSknO1xuICAgICAgICB0aGlzLmNvbG9yID0gJyM2NjYnO1xuICAgICAgICB0aGlzLmRhdGFzZXRzID0ge307XG4gICAgICAgIHRoaXMuZGV2aWNlUGl4ZWxSYXRpbyA9IChjb250ZXh0KT0+Y29udGV4dC5jaGFydC5wbGF0Zm9ybS5nZXREZXZpY2VQaXhlbFJhdGlvKCk7XG4gICAgICAgIHRoaXMuZWxlbWVudHMgPSB7fTtcbiAgICAgICAgdGhpcy5ldmVudHMgPSBbXG4gICAgICAgICAgICAnbW91c2Vtb3ZlJyxcbiAgICAgICAgICAgICdtb3VzZW91dCcsXG4gICAgICAgICAgICAnY2xpY2snLFxuICAgICAgICAgICAgJ3RvdWNoc3RhcnQnLFxuICAgICAgICAgICAgJ3RvdWNobW92ZSdcbiAgICAgICAgXTtcbiAgICAgICAgdGhpcy5mb250ID0ge1xuICAgICAgICAgICAgZmFtaWx5OiBcIidIZWx2ZXRpY2EgTmV1ZScsICdIZWx2ZXRpY2EnLCAnQXJpYWwnLCBzYW5zLXNlcmlmXCIsXG4gICAgICAgICAgICBzaXplOiAxMixcbiAgICAgICAgICAgIHN0eWxlOiAnbm9ybWFsJyxcbiAgICAgICAgICAgIGxpbmVIZWlnaHQ6IDEuMixcbiAgICAgICAgICAgIHdlaWdodDogbnVsbFxuICAgICAgICB9O1xuICAgICAgICB0aGlzLmhvdmVyID0ge307XG4gICAgICAgIHRoaXMuaG92ZXJCYWNrZ3JvdW5kQ29sb3IgPSAoY3R4LCBvcHRpb25zKT0+Z2V0SG92ZXJDb2xvcihvcHRpb25zLmJhY2tncm91bmRDb2xvcik7XG4gICAgICAgIHRoaXMuaG92ZXJCb3JkZXJDb2xvciA9IChjdHgsIG9wdGlvbnMpPT5nZXRIb3ZlckNvbG9yKG9wdGlvbnMuYm9yZGVyQ29sb3IpO1xuICAgICAgICB0aGlzLmhvdmVyQ29sb3IgPSAoY3R4LCBvcHRpb25zKT0+Z2V0SG92ZXJDb2xvcihvcHRpb25zLmNvbG9yKTtcbiAgICAgICAgdGhpcy5pbmRleEF4aXMgPSAneCc7XG4gICAgICAgIHRoaXMuaW50ZXJhY3Rpb24gPSB7XG4gICAgICAgICAgICBtb2RlOiAnbmVhcmVzdCcsXG4gICAgICAgICAgICBpbnRlcnNlY3Q6IHRydWUsXG4gICAgICAgICAgICBpbmNsdWRlSW52aXNpYmxlOiBmYWxzZVxuICAgICAgICB9O1xuICAgICAgICB0aGlzLm1haW50YWluQXNwZWN0UmF0aW8gPSB0cnVlO1xuICAgICAgICB0aGlzLm9uSG92ZXIgPSBudWxsO1xuICAgICAgICB0aGlzLm9uQ2xpY2sgPSBudWxsO1xuICAgICAgICB0aGlzLnBhcnNpbmcgPSB0cnVlO1xuICAgICAgICB0aGlzLnBsdWdpbnMgPSB7fTtcbiAgICAgICAgdGhpcy5yZXNwb25zaXZlID0gdHJ1ZTtcbiAgICAgICAgdGhpcy5zY2FsZSA9IHVuZGVmaW5lZDtcbiAgICAgICAgdGhpcy5zY2FsZXMgPSB7fTtcbiAgICAgICAgdGhpcy5zaG93TGluZSA9IHRydWU7XG4gICAgICAgIHRoaXMuZHJhd0FjdGl2ZUVsZW1lbnRzT25Ub3AgPSB0cnVlO1xuICAgICAgICB0aGlzLmRlc2NyaWJlKF9kZXNjcmlwdG9ycyk7XG4gICAgICAgIHRoaXMuYXBwbHkoX2FwcGxpZXJzKTtcbiAgICB9XG4gc2V0KHNjb3BlLCB2YWx1ZXMpIHtcbiAgICAgICAgcmV0dXJuIHNldCh0aGlzLCBzY29wZSwgdmFsdWVzKTtcbiAgICB9XG4gZ2V0KHNjb3BlKSB7XG4gICAgICAgIHJldHVybiBnZXRTY29wZSQxKHRoaXMsIHNjb3BlKTtcbiAgICB9XG4gZGVzY3JpYmUoc2NvcGUsIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gc2V0KGRlc2NyaXB0b3JzLCBzY29wZSwgdmFsdWVzKTtcbiAgICB9XG4gICAgb3ZlcnJpZGUoc2NvcGUsIHZhbHVlcykge1xuICAgICAgICByZXR1cm4gc2V0KG92ZXJyaWRlcywgc2NvcGUsIHZhbHVlcyk7XG4gICAgfVxuIHJvdXRlKHNjb3BlLCBuYW1lLCB0YXJnZXRTY29wZSwgdGFyZ2V0TmFtZSkge1xuICAgICAgICBjb25zdCBzY29wZU9iamVjdCA9IGdldFNjb3BlJDEodGhpcywgc2NvcGUpO1xuICAgICAgICBjb25zdCB0YXJnZXRTY29wZU9iamVjdCA9IGdldFNjb3BlJDEodGhpcywgdGFyZ2V0U2NvcGUpO1xuICAgICAgICBjb25zdCBwcml2YXRlTmFtZSA9ICdfJyArIG5hbWU7XG4gICAgICAgIE9iamVjdC5kZWZpbmVQcm9wZXJ0aWVzKHNjb3BlT2JqZWN0LCB7XG4gICAgICAgICAgICBbcHJpdmF0ZU5hbWVdOiB7XG4gICAgICAgICAgICAgICAgdmFsdWU6IHNjb3BlT2JqZWN0W25hbWVdLFxuICAgICAgICAgICAgICAgIHdyaXRhYmxlOiB0cnVlXG4gICAgICAgICAgICB9LFxuICAgICAgICAgICAgW25hbWVdOiB7XG4gICAgICAgICAgICAgICAgZW51bWVyYWJsZTogdHJ1ZSxcbiAgICAgICAgICAgICAgICBnZXQgKCkge1xuICAgICAgICAgICAgICAgICAgICBjb25zdCBsb2NhbCA9IHRoaXNbcHJpdmF0ZU5hbWVdO1xuICAgICAgICAgICAgICAgICAgICBjb25zdCB0YXJnZXQgPSB0YXJnZXRTY29wZU9iamVjdFt0YXJnZXROYW1lXTtcbiAgICAgICAgICAgICAgICAgICAgaWYgKGlzT2JqZWN0KGxvY2FsKSkge1xuICAgICAgICAgICAgICAgICAgICAgICAgcmV0dXJuIE9iamVjdC5hc3NpZ24oe30sIHRhcmdldCwgbG9jYWwpO1xuICAgICAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICAgICAgICAgIHJldHVybiB2YWx1ZU9yRGVmYXVsdChsb2NhbCwgdGFyZ2V0KTtcbiAgICAgICAgICAgICAgICB9LFxuICAgICAgICAgICAgICAgIHNldCAodmFsdWUpIHtcbiAgICAgICAgICAgICAgICAgICAgdGhpc1twcml2YXRlTmFtZV0gPSB2YWx1ZTtcbiAgICAgICAgICAgICAgICB9XG4gICAgICAgICAgICB9XG4gICAgICAgIH0pO1xuICAgIH1cbiAgICBhcHBseShhcHBsaWVycykge1xuICAgICAgICBhcHBsaWVycy5mb3JFYWNoKChhcHBseSk9PmFwcGx5KHRoaXMpKTtcbiAgICB9XG59XG52YXIgZGVmYXVsdHMgPSAvKiAjX19QVVJFX18gKi8gbmV3IERlZmF1bHRzKHtcbiAgICBfc2NyaXB0YWJsZTogKG5hbWUpPT4hbmFtZS5zdGFydHNXaXRoKCdvbicpLFxuICAgIF9pbmRleGFibGU6IChuYW1lKT0+bmFtZSAhPT0gJ2V2ZW50cycsXG4gICAgaG92ZXI6IHtcbiAgICAgICAgX2ZhbGxiYWNrOiAnaW50ZXJhY3Rpb24nXG4gICAgfSxcbiAgICBpbnRlcmFjdGlvbjoge1xuICAgICAgICBfc2NyaXB0YWJsZTogZmFsc2UsXG4gICAgICAgIF9pbmRleGFibGU6IGZhbHNlXG4gICAgfVxufSwgW1xuICAgIGFwcGx5QW5pbWF0aW9uc0RlZmF1bHRzLFxuICAgIGFwcGx5TGF5b3V0c0RlZmF1bHRzLFxuICAgIGFwcGx5U2NhbGVEZWZhdWx0c1xuXSk7XG5cbi8qKlxuICogQ29udmVydHMgdGhlIGdpdmVuIGZvbnQgb2JqZWN0IGludG8gYSBDU1MgZm9udCBzdHJpbmcuXG4gKiBAcGFyYW0gZm9udCAtIEEgZm9udCBvYmplY3QuXG4gKiBAcmV0dXJuIFRoZSBDU1MgZm9udCBzdHJpbmcuIFNlZSBodHRwczovL2RldmVsb3Blci5tb3ppbGxhLm9yZy9lbi1VUy9kb2NzL1dlYi9DU1MvZm9udFxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiB0b0ZvbnRTdHJpbmcoZm9udCkge1xuICAgIGlmICghZm9udCB8fCBpc051bGxPclVuZGVmKGZvbnQuc2l6ZSkgfHwgaXNOdWxsT3JVbmRlZihmb250LmZhbWlseSkpIHtcbiAgICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICAgIHJldHVybiAoZm9udC5zdHlsZSA/IGZvbnQuc3R5bGUgKyAnICcgOiAnJykgKyAoZm9udC53ZWlnaHQgPyBmb250LndlaWdodCArICcgJyA6ICcnKSArIGZvbnQuc2l6ZSArICdweCAnICsgZm9udC5mYW1pbHk7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX21lYXN1cmVUZXh0KGN0eCwgZGF0YSwgZ2MsIGxvbmdlc3QsIHN0cmluZykge1xuICAgIGxldCB0ZXh0V2lkdGggPSBkYXRhW3N0cmluZ107XG4gICAgaWYgKCF0ZXh0V2lkdGgpIHtcbiAgICAgICAgdGV4dFdpZHRoID0gZGF0YVtzdHJpbmddID0gY3R4Lm1lYXN1cmVUZXh0KHN0cmluZykud2lkdGg7XG4gICAgICAgIGdjLnB1c2goc3RyaW5nKTtcbiAgICB9XG4gICAgaWYgKHRleHRXaWR0aCA+IGxvbmdlc3QpIHtcbiAgICAgICAgbG9uZ2VzdCA9IHRleHRXaWR0aDtcbiAgICB9XG4gICAgcmV0dXJuIGxvbmdlc3Q7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIF9sb25nZXN0VGV4dChjdHgsIGZvbnQsIGFycmF5T2ZUaGluZ3MsIGNhY2hlKSB7XG4gICAgY2FjaGUgPSBjYWNoZSB8fCB7fTtcbiAgICBsZXQgZGF0YSA9IGNhY2hlLmRhdGEgPSBjYWNoZS5kYXRhIHx8IHt9O1xuICAgIGxldCBnYyA9IGNhY2hlLmdhcmJhZ2VDb2xsZWN0ID0gY2FjaGUuZ2FyYmFnZUNvbGxlY3QgfHwgW107XG4gICAgaWYgKGNhY2hlLmZvbnQgIT09IGZvbnQpIHtcbiAgICAgICAgZGF0YSA9IGNhY2hlLmRhdGEgPSB7fTtcbiAgICAgICAgZ2MgPSBjYWNoZS5nYXJiYWdlQ29sbGVjdCA9IFtdO1xuICAgICAgICBjYWNoZS5mb250ID0gZm9udDtcbiAgICB9XG4gICAgY3R4LnNhdmUoKTtcbiAgICBjdHguZm9udCA9IGZvbnQ7XG4gICAgbGV0IGxvbmdlc3QgPSAwO1xuICAgIGNvbnN0IGlsZW4gPSBhcnJheU9mVGhpbmdzLmxlbmd0aDtcbiAgICBsZXQgaSwgaiwgamxlbiwgdGhpbmcsIG5lc3RlZFRoaW5nO1xuICAgIGZvcihpID0gMDsgaSA8IGlsZW47IGkrKyl7XG4gICAgICAgIHRoaW5nID0gYXJyYXlPZlRoaW5nc1tpXTtcbiAgICAgICAgLy8gVW5kZWZpbmVkIHN0cmluZ3MgYW5kIGFycmF5cyBzaG91bGQgbm90IGJlIG1lYXN1cmVkXG4gICAgICAgIGlmICh0aGluZyAhPT0gdW5kZWZpbmVkICYmIHRoaW5nICE9PSBudWxsICYmICFpc0FycmF5KHRoaW5nKSkge1xuICAgICAgICAgICAgbG9uZ2VzdCA9IF9tZWFzdXJlVGV4dChjdHgsIGRhdGEsIGdjLCBsb25nZXN0LCB0aGluZyk7XG4gICAgICAgIH0gZWxzZSBpZiAoaXNBcnJheSh0aGluZykpIHtcbiAgICAgICAgICAgIC8vIGlmIGl0IGlzIGFuIGFycmF5IGxldHMgbWVhc3VyZSBlYWNoIGVsZW1lbnRcbiAgICAgICAgICAgIC8vIHRvIGRvIG1heWJlIHNpbXBsaWZ5IHRoaXMgZnVuY3Rpb24gYSBiaXQgc28gd2UgY2FuIGRvIHRoaXMgbW9yZSByZWN1cnNpdmVseT9cbiAgICAgICAgICAgIGZvcihqID0gMCwgamxlbiA9IHRoaW5nLmxlbmd0aDsgaiA8IGpsZW47IGorKyl7XG4gICAgICAgICAgICAgICAgbmVzdGVkVGhpbmcgPSB0aGluZ1tqXTtcbiAgICAgICAgICAgICAgICAvLyBVbmRlZmluZWQgc3RyaW5ncyBhbmQgYXJyYXlzIHNob3VsZCBub3QgYmUgbWVhc3VyZWRcbiAgICAgICAgICAgICAgICBpZiAobmVzdGVkVGhpbmcgIT09IHVuZGVmaW5lZCAmJiBuZXN0ZWRUaGluZyAhPT0gbnVsbCAmJiAhaXNBcnJheShuZXN0ZWRUaGluZykpIHtcbiAgICAgICAgICAgICAgICAgICAgbG9uZ2VzdCA9IF9tZWFzdXJlVGV4dChjdHgsIGRhdGEsIGdjLCBsb25nZXN0LCBuZXN0ZWRUaGluZyk7XG4gICAgICAgICAgICAgICAgfVxuICAgICAgICAgICAgfVxuICAgICAgICB9XG4gICAgfVxuICAgIGN0eC5yZXN0b3JlKCk7XG4gICAgY29uc3QgZ2NMZW4gPSBnYy5sZW5ndGggLyAyO1xuICAgIGlmIChnY0xlbiA+IGFycmF5T2ZUaGluZ3MubGVuZ3RoKSB7XG4gICAgICAgIGZvcihpID0gMDsgaSA8IGdjTGVuOyBpKyspe1xuICAgICAgICAgICAgZGVsZXRlIGRhdGFbZ2NbaV1dO1xuICAgICAgICB9XG4gICAgICAgIGdjLnNwbGljZSgwLCBnY0xlbik7XG4gICAgfVxuICAgIHJldHVybiBsb25nZXN0O1xufVxuLyoqXG4gKiBSZXR1cm5zIHRoZSBhbGlnbmVkIHBpeGVsIHZhbHVlIHRvIGF2b2lkIGFudGktYWxpYXNpbmcgYmx1clxuICogQHBhcmFtIGNoYXJ0IC0gVGhlIGNoYXJ0IGluc3RhbmNlLlxuICogQHBhcmFtIHBpeGVsIC0gQSBwaXhlbCB2YWx1ZS5cbiAqIEBwYXJhbSB3aWR0aCAtIFRoZSB3aWR0aCBvZiB0aGUgZWxlbWVudC5cbiAqIEByZXR1cm5zIFRoZSBhbGlnbmVkIHBpeGVsIHZhbHVlLlxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfYWxpZ25QaXhlbChjaGFydCwgcGl4ZWwsIHdpZHRoKSB7XG4gICAgY29uc3QgZGV2aWNlUGl4ZWxSYXRpbyA9IGNoYXJ0LmN1cnJlbnREZXZpY2VQaXhlbFJhdGlvO1xuICAgIGNvbnN0IGhhbGZXaWR0aCA9IHdpZHRoICE9PSAwID8gTWF0aC5tYXgod2lkdGggLyAyLCAwLjUpIDogMDtcbiAgICByZXR1cm4gTWF0aC5yb3VuZCgocGl4ZWwgLSBoYWxmV2lkdGgpICogZGV2aWNlUGl4ZWxSYXRpbykgLyBkZXZpY2VQaXhlbFJhdGlvICsgaGFsZldpZHRoO1xufVxuLyoqXG4gKiBDbGVhcnMgdGhlIGVudGlyZSBjYW52YXMuXG4gKi8gZnVuY3Rpb24gY2xlYXJDYW52YXMoY2FudmFzLCBjdHgpIHtcbiAgICBpZiAoIWN0eCAmJiAhY2FudmFzKSB7XG4gICAgICAgIHJldHVybjtcbiAgICB9XG4gICAgY3R4ID0gY3R4IHx8IGNhbnZhcy5nZXRDb250ZXh0KCcyZCcpO1xuICAgIGN0eC5zYXZlKCk7XG4gICAgLy8gY2FudmFzLndpZHRoIGFuZCBjYW52YXMuaGVpZ2h0IGRvIG5vdCBjb25zaWRlciB0aGUgY2FudmFzIHRyYW5zZm9ybSxcbiAgICAvLyB3aGlsZSBjbGVhclJlY3QgZG9lc1xuICAgIGN0eC5yZXNldFRyYW5zZm9ybSgpO1xuICAgIGN0eC5jbGVhclJlY3QoMCwgMCwgY2FudmFzLndpZHRoLCBjYW52YXMuaGVpZ2h0KTtcbiAgICBjdHgucmVzdG9yZSgpO1xufVxuZnVuY3Rpb24gZHJhd1BvaW50KGN0eCwgb3B0aW9ucywgeCwgeSkge1xuICAgIC8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdXNlLWJlZm9yZS1kZWZpbmVcbiAgICBkcmF3UG9pbnRMZWdlbmQoY3R4LCBvcHRpb25zLCB4LCB5LCBudWxsKTtcbn1cbi8vIGVzbGludC1kaXNhYmxlLW5leHQtbGluZSBjb21wbGV4aXR5XG5mdW5jdGlvbiBkcmF3UG9pbnRMZWdlbmQoY3R4LCBvcHRpb25zLCB4LCB5LCB3KSB7XG4gICAgbGV0IHR5cGUsIHhPZmZzZXQsIHlPZmZzZXQsIHNpemUsIGNvcm5lclJhZGl1cywgd2lkdGgsIHhPZmZzZXRXLCB5T2Zmc2V0VztcbiAgICBjb25zdCBzdHlsZSA9IG9wdGlvbnMucG9pbnRTdHlsZTtcbiAgICBjb25zdCByb3RhdGlvbiA9IG9wdGlvbnMucm90YXRpb247XG4gICAgY29uc3QgcmFkaXVzID0gb3B0aW9ucy5yYWRpdXM7XG4gICAgbGV0IHJhZCA9IChyb3RhdGlvbiB8fCAwKSAqIFJBRF9QRVJfREVHO1xuICAgIGlmIChzdHlsZSAmJiB0eXBlb2Ygc3R5bGUgPT09ICdvYmplY3QnKSB7XG4gICAgICAgIHR5cGUgPSBzdHlsZS50b1N0cmluZygpO1xuICAgICAgICBpZiAodHlwZSA9PT0gJ1tvYmplY3QgSFRNTEltYWdlRWxlbWVudF0nIHx8IHR5cGUgPT09ICdbb2JqZWN0IEhUTUxDYW52YXNFbGVtZW50XScpIHtcbiAgICAgICAgICAgIGN0eC5zYXZlKCk7XG4gICAgICAgICAgICBjdHgudHJhbnNsYXRlKHgsIHkpO1xuICAgICAgICAgICAgY3R4LnJvdGF0ZShyYWQpO1xuICAgICAgICAgICAgY3R4LmRyYXdJbWFnZShzdHlsZSwgLXN0eWxlLndpZHRoIC8gMiwgLXN0eWxlLmhlaWdodCAvIDIsIHN0eWxlLndpZHRoLCBzdHlsZS5oZWlnaHQpO1xuICAgICAgICAgICAgY3R4LnJlc3RvcmUoKTtcbiAgICAgICAgICAgIHJldHVybjtcbiAgICAgICAgfVxuICAgIH1cbiAgICBpZiAoaXNOYU4ocmFkaXVzKSB8fCByYWRpdXMgPD0gMCkge1xuICAgICAgICByZXR1cm47XG4gICAgfVxuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBzd2l0Y2goc3R5bGUpe1xuICAgICAgICAvLyBEZWZhdWx0IGluY2x1ZGVzIGNpcmNsZVxuICAgICAgICBkZWZhdWx0OlxuICAgICAgICAgICAgaWYgKHcpIHtcbiAgICAgICAgICAgICAgICBjdHguZWxsaXBzZSh4LCB5LCB3IC8gMiwgcmFkaXVzLCAwLCAwLCBUQVUpO1xuICAgICAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgICAgICBjdHguYXJjKHgsIHksIHJhZGl1cywgMCwgVEFVKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICd0cmlhbmdsZSc6XG4gICAgICAgICAgICB3aWR0aCA9IHcgPyB3IC8gMiA6IHJhZGl1cztcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeCArIE1hdGguc2luKHJhZCkgKiB3aWR0aCwgeSAtIE1hdGguY29zKHJhZCkgKiByYWRpdXMpO1xuICAgICAgICAgICAgcmFkICs9IFRXT19USElSRFNfUEk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHggKyBNYXRoLnNpbihyYWQpICogd2lkdGgsIHkgLSBNYXRoLmNvcyhyYWQpICogcmFkaXVzKTtcbiAgICAgICAgICAgIHJhZCArPSBUV09fVEhJUkRTX1BJO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyh4ICsgTWF0aC5zaW4ocmFkKSAqIHdpZHRoLCB5IC0gTWF0aC5jb3MocmFkKSAqIHJhZGl1cyk7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVjdFJvdW5kZWQnOlxuICAgICAgICAgICAgLy8gTk9URTogdGhlIHJvdW5kZWQgcmVjdCBpbXBsZW1lbnRhdGlvbiBjaGFuZ2VkIHRvIHVzZSBgYXJjYCBpbnN0ZWFkIG9mXG4gICAgICAgICAgICAvLyBgcXVhZHJhdGljQ3VydmVUb2Agc2luY2UgaXQgZ2VuZXJhdGVzIGJldHRlciByZXN1bHRzIHdoZW4gcmVjdCBpc1xuICAgICAgICAgICAgLy8gYWxtb3N0IGEgY2lyY2xlLiAwLjUxNiAoaW5zdGVhZCBvZiAwLjUpIHByb2R1Y2VzIHJlc3VsdHMgd2l0aCB2aXN1YWxseVxuICAgICAgICAgICAgLy8gY2xvc2VyIHByb3BvcnRpb24gdG8gdGhlIHByZXZpb3VzIGltcGwgYW5kIGl0IGlzIGluc2NyaWJlZCBpbiB0aGVcbiAgICAgICAgICAgIC8vIGNpcmNsZSB3aXRoIGByYWRpdXNgLiBGb3IgbW9yZSBkZXRhaWxzLCBzZWUgdGhlIGZvbGxvd2luZyBQUnM6XG4gICAgICAgICAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9DaGFydC5qcy9pc3N1ZXMvNTU5N1xuICAgICAgICAgICAgLy8gaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvQ2hhcnQuanMvaXNzdWVzLzU4NThcbiAgICAgICAgICAgIGNvcm5lclJhZGl1cyA9IHJhZGl1cyAqIDAuNTE2O1xuICAgICAgICAgICAgc2l6ZSA9IHJhZGl1cyAtIGNvcm5lclJhZGl1cztcbiAgICAgICAgICAgIHhPZmZzZXQgPSBNYXRoLmNvcyhyYWQgKyBRVUFSVEVSX1BJKSAqIHNpemU7XG4gICAgICAgICAgICB4T2Zmc2V0VyA9IE1hdGguY29zKHJhZCArIFFVQVJURVJfUEkpICogKHcgPyB3IC8gMiAtIGNvcm5lclJhZGl1cyA6IHNpemUpO1xuICAgICAgICAgICAgeU9mZnNldCA9IE1hdGguc2luKHJhZCArIFFVQVJURVJfUEkpICogc2l6ZTtcbiAgICAgICAgICAgIHlPZmZzZXRXID0gTWF0aC5zaW4ocmFkICsgUVVBUlRFUl9QSSkgKiAodyA/IHcgLyAyIC0gY29ybmVyUmFkaXVzIDogc2l6ZSk7XG4gICAgICAgICAgICBjdHguYXJjKHggLSB4T2Zmc2V0VywgeSAtIHlPZmZzZXQsIGNvcm5lclJhZGl1cywgcmFkIC0gUEksIHJhZCAtIEhBTEZfUEkpO1xuICAgICAgICAgICAgY3R4LmFyYyh4ICsgeU9mZnNldFcsIHkgLSB4T2Zmc2V0LCBjb3JuZXJSYWRpdXMsIHJhZCAtIEhBTEZfUEksIHJhZCk7XG4gICAgICAgICAgICBjdHguYXJjKHggKyB4T2Zmc2V0VywgeSArIHlPZmZzZXQsIGNvcm5lclJhZGl1cywgcmFkLCByYWQgKyBIQUxGX1BJKTtcbiAgICAgICAgICAgIGN0eC5hcmMoeCAtIHlPZmZzZXRXLCB5ICsgeE9mZnNldCwgY29ybmVyUmFkaXVzLCByYWQgKyBIQUxGX1BJLCByYWQgKyBQSSk7XG4gICAgICAgICAgICBjdHguY2xvc2VQYXRoKCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAncmVjdCc6XG4gICAgICAgICAgICBpZiAoIXJvdGF0aW9uKSB7XG4gICAgICAgICAgICAgICAgc2l6ZSA9IE1hdGguU1FSVDFfMiAqIHJhZGl1cztcbiAgICAgICAgICAgICAgICB3aWR0aCA9IHcgPyB3IC8gMiA6IHNpemU7XG4gICAgICAgICAgICAgICAgY3R4LnJlY3QoeCAtIHdpZHRoLCB5IC0gc2l6ZSwgMiAqIHdpZHRoLCAyICogc2l6ZSk7XG4gICAgICAgICAgICAgICAgYnJlYWs7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByYWQgKz0gUVVBUlRFUl9QSTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqLyBjYXNlICdyZWN0Um90JzpcbiAgICAgICAgICAgIHhPZmZzZXRXID0gTWF0aC5jb3MocmFkKSAqICh3ID8gdyAvIDIgOiByYWRpdXMpO1xuICAgICAgICAgICAgeE9mZnNldCA9IE1hdGguY29zKHJhZCkgKiByYWRpdXM7XG4gICAgICAgICAgICB5T2Zmc2V0ID0gTWF0aC5zaW4ocmFkKSAqIHJhZGl1cztcbiAgICAgICAgICAgIHlPZmZzZXRXID0gTWF0aC5zaW4ocmFkKSAqICh3ID8gdyAvIDIgOiByYWRpdXMpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4IC0geE9mZnNldFcsIHkgLSB5T2Zmc2V0KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCArIHlPZmZzZXRXLCB5IC0geE9mZnNldCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHggKyB4T2Zmc2V0VywgeSArIHlPZmZzZXQpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyh4IC0geU9mZnNldFcsIHkgKyB4T2Zmc2V0KTtcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdjcm9zc1JvdCc6XG4gICAgICAgICAgICByYWQgKz0gUVVBUlRFUl9QSTtcbiAgICAgICAgLyogZmFsbHMgdGhyb3VnaCAqLyBjYXNlICdjcm9zcyc6XG4gICAgICAgICAgICB4T2Zmc2V0VyA9IE1hdGguY29zKHJhZCkgKiAodyA/IHcgLyAyIDogcmFkaXVzKTtcbiAgICAgICAgICAgIHhPZmZzZXQgPSBNYXRoLmNvcyhyYWQpICogcmFkaXVzO1xuICAgICAgICAgICAgeU9mZnNldCA9IE1hdGguc2luKHJhZCkgKiByYWRpdXM7XG4gICAgICAgICAgICB5T2Zmc2V0VyA9IE1hdGguc2luKHJhZCkgKiAodyA/IHcgLyAyIDogcmFkaXVzKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeCAtIHhPZmZzZXRXLCB5IC0geU9mZnNldCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHggKyB4T2Zmc2V0VywgeSArIHlPZmZzZXQpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4ICsgeU9mZnNldFcsIHkgLSB4T2Zmc2V0KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCAtIHlPZmZzZXRXLCB5ICsgeE9mZnNldCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnc3Rhcic6XG4gICAgICAgICAgICB4T2Zmc2V0VyA9IE1hdGguY29zKHJhZCkgKiAodyA/IHcgLyAyIDogcmFkaXVzKTtcbiAgICAgICAgICAgIHhPZmZzZXQgPSBNYXRoLmNvcyhyYWQpICogcmFkaXVzO1xuICAgICAgICAgICAgeU9mZnNldCA9IE1hdGguc2luKHJhZCkgKiByYWRpdXM7XG4gICAgICAgICAgICB5T2Zmc2V0VyA9IE1hdGguc2luKHJhZCkgKiAodyA/IHcgLyAyIDogcmFkaXVzKTtcbiAgICAgICAgICAgIGN0eC5tb3ZlVG8oeCAtIHhPZmZzZXRXLCB5IC0geU9mZnNldCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHggKyB4T2Zmc2V0VywgeSArIHlPZmZzZXQpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4ICsgeU9mZnNldFcsIHkgLSB4T2Zmc2V0KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCAtIHlPZmZzZXRXLCB5ICsgeE9mZnNldCk7XG4gICAgICAgICAgICByYWQgKz0gUVVBUlRFUl9QSTtcbiAgICAgICAgICAgIHhPZmZzZXRXID0gTWF0aC5jb3MocmFkKSAqICh3ID8gdyAvIDIgOiByYWRpdXMpO1xuICAgICAgICAgICAgeE9mZnNldCA9IE1hdGguY29zKHJhZCkgKiByYWRpdXM7XG4gICAgICAgICAgICB5T2Zmc2V0ID0gTWF0aC5zaW4ocmFkKSAqIHJhZGl1cztcbiAgICAgICAgICAgIHlPZmZzZXRXID0gTWF0aC5zaW4ocmFkKSAqICh3ID8gdyAvIDIgOiByYWRpdXMpO1xuICAgICAgICAgICAgY3R4Lm1vdmVUbyh4IC0geE9mZnNldFcsIHkgLSB5T2Zmc2V0KTtcbiAgICAgICAgICAgIGN0eC5saW5lVG8oeCArIHhPZmZzZXRXLCB5ICsgeU9mZnNldCk7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHggKyB5T2Zmc2V0VywgeSAtIHhPZmZzZXQpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyh4IC0geU9mZnNldFcsIHkgKyB4T2Zmc2V0KTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICBjYXNlICdsaW5lJzpcbiAgICAgICAgICAgIHhPZmZzZXQgPSB3ID8gdyAvIDIgOiBNYXRoLmNvcyhyYWQpICogcmFkaXVzO1xuICAgICAgICAgICAgeU9mZnNldCA9IE1hdGguc2luKHJhZCkgKiByYWRpdXM7XG4gICAgICAgICAgICBjdHgubW92ZVRvKHggLSB4T2Zmc2V0LCB5IC0geU9mZnNldCk7XG4gICAgICAgICAgICBjdHgubGluZVRvKHggKyB4T2Zmc2V0LCB5ICsgeU9mZnNldCk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSAnZGFzaCc6XG4gICAgICAgICAgICBjdHgubW92ZVRvKHgsIHkpO1xuICAgICAgICAgICAgY3R4LmxpbmVUbyh4ICsgTWF0aC5jb3MocmFkKSAqICh3ID8gdyAvIDIgOiByYWRpdXMpLCB5ICsgTWF0aC5zaW4ocmFkKSAqIHJhZGl1cyk7XG4gICAgICAgICAgICBicmVhaztcbiAgICAgICAgY2FzZSBmYWxzZTpcbiAgICAgICAgICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICAgICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjdHguZmlsbCgpO1xuICAgIGlmIChvcHRpb25zLmJvcmRlcldpZHRoID4gMCkge1xuICAgICAgICBjdHguc3Ryb2tlKCk7XG4gICAgfVxufVxuLyoqXG4gKiBSZXR1cm5zIHRydWUgaWYgdGhlIHBvaW50IGlzIGluc2lkZSB0aGUgcmVjdGFuZ2xlXG4gKiBAcGFyYW0gcG9pbnQgLSBUaGUgcG9pbnQgdG8gdGVzdFxuICogQHBhcmFtIGFyZWEgLSBUaGUgcmVjdGFuZ2xlXG4gKiBAcGFyYW0gbWFyZ2luIC0gYWxsb3dlZCBtYXJnaW5cbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2lzUG9pbnRJbkFyZWEocG9pbnQsIGFyZWEsIG1hcmdpbikge1xuICAgIG1hcmdpbiA9IG1hcmdpbiB8fCAwLjU7IC8vIG1hcmdpbiAtIGRlZmF1bHQgaXMgdG8gbWF0Y2ggcm91bmRlZCBkZWNpbWFsc1xuICAgIHJldHVybiAhYXJlYSB8fCBwb2ludCAmJiBwb2ludC54ID4gYXJlYS5sZWZ0IC0gbWFyZ2luICYmIHBvaW50LnggPCBhcmVhLnJpZ2h0ICsgbWFyZ2luICYmIHBvaW50LnkgPiBhcmVhLnRvcCAtIG1hcmdpbiAmJiBwb2ludC55IDwgYXJlYS5ib3R0b20gKyBtYXJnaW47XG59XG5mdW5jdGlvbiBjbGlwQXJlYShjdHgsIGFyZWEpIHtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5iZWdpblBhdGgoKTtcbiAgICBjdHgucmVjdChhcmVhLmxlZnQsIGFyZWEudG9wLCBhcmVhLnJpZ2h0IC0gYXJlYS5sZWZ0LCBhcmVhLmJvdHRvbSAtIGFyZWEudG9wKTtcbiAgICBjdHguY2xpcCgpO1xufVxuZnVuY3Rpb24gdW5jbGlwQXJlYShjdHgpIHtcbiAgICBjdHgucmVzdG9yZSgpO1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9zdGVwcGVkTGluZVRvKGN0eCwgcHJldmlvdXMsIHRhcmdldCwgZmxpcCwgbW9kZSkge1xuICAgIGlmICghcHJldmlvdXMpIHtcbiAgICAgICAgcmV0dXJuIGN0eC5saW5lVG8odGFyZ2V0LngsIHRhcmdldC55KTtcbiAgICB9XG4gICAgaWYgKG1vZGUgPT09ICdtaWRkbGUnKSB7XG4gICAgICAgIGNvbnN0IG1pZHBvaW50ID0gKHByZXZpb3VzLnggKyB0YXJnZXQueCkgLyAyLjA7XG4gICAgICAgIGN0eC5saW5lVG8obWlkcG9pbnQsIHByZXZpb3VzLnkpO1xuICAgICAgICBjdHgubGluZVRvKG1pZHBvaW50LCB0YXJnZXQueSk7XG4gICAgfSBlbHNlIGlmIChtb2RlID09PSAnYWZ0ZXInICE9PSAhIWZsaXApIHtcbiAgICAgICAgY3R4LmxpbmVUbyhwcmV2aW91cy54LCB0YXJnZXQueSk7XG4gICAgfSBlbHNlIHtcbiAgICAgICAgY3R4LmxpbmVUbyh0YXJnZXQueCwgcHJldmlvdXMueSk7XG4gICAgfVxuICAgIGN0eC5saW5lVG8odGFyZ2V0LngsIHRhcmdldC55KTtcbn1cbi8qKlxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfYmV6aWVyQ3VydmVUbyhjdHgsIHByZXZpb3VzLCB0YXJnZXQsIGZsaXApIHtcbiAgICBpZiAoIXByZXZpb3VzKSB7XG4gICAgICAgIHJldHVybiBjdHgubGluZVRvKHRhcmdldC54LCB0YXJnZXQueSk7XG4gICAgfVxuICAgIGN0eC5iZXppZXJDdXJ2ZVRvKGZsaXAgPyBwcmV2aW91cy5jcDF4IDogcHJldmlvdXMuY3AyeCwgZmxpcCA/IHByZXZpb3VzLmNwMXkgOiBwcmV2aW91cy5jcDJ5LCBmbGlwID8gdGFyZ2V0LmNwMnggOiB0YXJnZXQuY3AxeCwgZmxpcCA/IHRhcmdldC5jcDJ5IDogdGFyZ2V0LmNwMXksIHRhcmdldC54LCB0YXJnZXQueSk7XG59XG5mdW5jdGlvbiBzZXRSZW5kZXJPcHRzKGN0eCwgb3B0cykge1xuICAgIGlmIChvcHRzLnRyYW5zbGF0aW9uKSB7XG4gICAgICAgIGN0eC50cmFuc2xhdGUob3B0cy50cmFuc2xhdGlvblswXSwgb3B0cy50cmFuc2xhdGlvblsxXSk7XG4gICAgfVxuICAgIGlmICghaXNOdWxsT3JVbmRlZihvcHRzLnJvdGF0aW9uKSkge1xuICAgICAgICBjdHgucm90YXRlKG9wdHMucm90YXRpb24pO1xuICAgIH1cbiAgICBpZiAob3B0cy5jb2xvcikge1xuICAgICAgICBjdHguZmlsbFN0eWxlID0gb3B0cy5jb2xvcjtcbiAgICB9XG4gICAgaWYgKG9wdHMudGV4dEFsaWduKSB7XG4gICAgICAgIGN0eC50ZXh0QWxpZ24gPSBvcHRzLnRleHRBbGlnbjtcbiAgICB9XG4gICAgaWYgKG9wdHMudGV4dEJhc2VsaW5lKSB7XG4gICAgICAgIGN0eC50ZXh0QmFzZWxpbmUgPSBvcHRzLnRleHRCYXNlbGluZTtcbiAgICB9XG59XG5mdW5jdGlvbiBkZWNvcmF0ZVRleHQoY3R4LCB4LCB5LCBsaW5lLCBvcHRzKSB7XG4gICAgaWYgKG9wdHMuc3RyaWtldGhyb3VnaCB8fCBvcHRzLnVuZGVybGluZSkge1xuICAgICAgICAvKipcbiAgICAgKiBOb3cgdGhhdCBJRTExIHN1cHBvcnQgaGFzIGJlZW4gZHJvcHBlZCwgd2UgY2FuIHVzZSBtb3JlXG4gICAgICogb2YgdGhlIFRleHRNZXRyaWNzIG9iamVjdC4gVGhlIGFjdHVhbCBib3VuZGluZyBib3hlc1xuICAgICAqIGFyZSB1bmZsYWdnZWQgaW4gQ2hyb21lLCBGaXJlZm94LCBFZGdlLCBhbmQgU2FmYXJpIHNvIHRoZXlcbiAgICAgKiBjYW4gYmUgc2FmZWx5IHVzZWQuXG4gICAgICogU2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0FQSS9UZXh0TWV0cmljcyNCcm93c2VyX2NvbXBhdGliaWxpdHlcbiAgICAgKi8gY29uc3QgbWV0cmljcyA9IGN0eC5tZWFzdXJlVGV4dChsaW5lKTtcbiAgICAgICAgY29uc3QgbGVmdCA9IHggLSBtZXRyaWNzLmFjdHVhbEJvdW5kaW5nQm94TGVmdDtcbiAgICAgICAgY29uc3QgcmlnaHQgPSB4ICsgbWV0cmljcy5hY3R1YWxCb3VuZGluZ0JveFJpZ2h0O1xuICAgICAgICBjb25zdCB0b3AgPSB5IC0gbWV0cmljcy5hY3R1YWxCb3VuZGluZ0JveEFzY2VudDtcbiAgICAgICAgY29uc3QgYm90dG9tID0geSArIG1ldHJpY3MuYWN0dWFsQm91bmRpbmdCb3hEZXNjZW50O1xuICAgICAgICBjb25zdCB5RGVjb3JhdGlvbiA9IG9wdHMuc3RyaWtldGhyb3VnaCA/ICh0b3AgKyBib3R0b20pIC8gMiA6IGJvdHRvbTtcbiAgICAgICAgY3R4LnN0cm9rZVN0eWxlID0gY3R4LmZpbGxTdHlsZTtcbiAgICAgICAgY3R4LmJlZ2luUGF0aCgpO1xuICAgICAgICBjdHgubGluZVdpZHRoID0gb3B0cy5kZWNvcmF0aW9uV2lkdGggfHwgMjtcbiAgICAgICAgY3R4Lm1vdmVUbyhsZWZ0LCB5RGVjb3JhdGlvbik7XG4gICAgICAgIGN0eC5saW5lVG8ocmlnaHQsIHlEZWNvcmF0aW9uKTtcbiAgICAgICAgY3R4LnN0cm9rZSgpO1xuICAgIH1cbn1cbmZ1bmN0aW9uIGRyYXdCYWNrZHJvcChjdHgsIG9wdHMpIHtcbiAgICBjb25zdCBvbGRDb2xvciA9IGN0eC5maWxsU3R5bGU7XG4gICAgY3R4LmZpbGxTdHlsZSA9IG9wdHMuY29sb3I7XG4gICAgY3R4LmZpbGxSZWN0KG9wdHMubGVmdCwgb3B0cy50b3AsIG9wdHMud2lkdGgsIG9wdHMuaGVpZ2h0KTtcbiAgICBjdHguZmlsbFN0eWxlID0gb2xkQ29sb3I7XG59XG4vKipcbiAqIFJlbmRlciB0ZXh0IG9udG8gdGhlIGNhbnZhc1xuICovIGZ1bmN0aW9uIHJlbmRlclRleHQoY3R4LCB0ZXh0LCB4LCB5LCBmb250LCBvcHRzID0ge30pIHtcbiAgICBjb25zdCBsaW5lcyA9IGlzQXJyYXkodGV4dCkgPyB0ZXh0IDogW1xuICAgICAgICB0ZXh0XG4gICAgXTtcbiAgICBjb25zdCBzdHJva2UgPSBvcHRzLnN0cm9rZVdpZHRoID4gMCAmJiBvcHRzLnN0cm9rZUNvbG9yICE9PSAnJztcbiAgICBsZXQgaSwgbGluZTtcbiAgICBjdHguc2F2ZSgpO1xuICAgIGN0eC5mb250ID0gZm9udC5zdHJpbmc7XG4gICAgc2V0UmVuZGVyT3B0cyhjdHgsIG9wdHMpO1xuICAgIGZvcihpID0gMDsgaSA8IGxpbmVzLmxlbmd0aDsgKytpKXtcbiAgICAgICAgbGluZSA9IGxpbmVzW2ldO1xuICAgICAgICBpZiAob3B0cy5iYWNrZHJvcCkge1xuICAgICAgICAgICAgZHJhd0JhY2tkcm9wKGN0eCwgb3B0cy5iYWNrZHJvcCk7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN0cm9rZSkge1xuICAgICAgICAgICAgaWYgKG9wdHMuc3Ryb2tlQ29sb3IpIHtcbiAgICAgICAgICAgICAgICBjdHguc3Ryb2tlU3R5bGUgPSBvcHRzLnN0cm9rZUNvbG9yO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgaWYgKCFpc051bGxPclVuZGVmKG9wdHMuc3Ryb2tlV2lkdGgpKSB7XG4gICAgICAgICAgICAgICAgY3R4LmxpbmVXaWR0aCA9IG9wdHMuc3Ryb2tlV2lkdGg7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICBjdHguc3Ryb2tlVGV4dChsaW5lLCB4LCB5LCBvcHRzLm1heFdpZHRoKTtcbiAgICAgICAgfVxuICAgICAgICBjdHguZmlsbFRleHQobGluZSwgeCwgeSwgb3B0cy5tYXhXaWR0aCk7XG4gICAgICAgIGRlY29yYXRlVGV4dChjdHgsIHgsIHksIGxpbmUsIG9wdHMpO1xuICAgICAgICB5ICs9IE51bWJlcihmb250LmxpbmVIZWlnaHQpO1xuICAgIH1cbiAgICBjdHgucmVzdG9yZSgpO1xufVxuLyoqXG4gKiBBZGQgYSBwYXRoIG9mIGEgcmVjdGFuZ2xlIHdpdGggcm91bmRlZCBjb3JuZXJzIHRvIHRoZSBjdXJyZW50IHN1Yi1wYXRoXG4gKiBAcGFyYW0gY3R4IC0gQ29udGV4dFxuICogQHBhcmFtIHJlY3QgLSBCb3VuZGluZyByZWN0XG4gKi8gZnVuY3Rpb24gYWRkUm91bmRlZFJlY3RQYXRoKGN0eCwgcmVjdCkge1xuICAgIGNvbnN0IHsgeCAsIHkgLCB3ICwgaCAsIHJhZGl1cyAgfSA9IHJlY3Q7XG4gICAgLy8gdG9wIGxlZnQgYXJjXG4gICAgY3R4LmFyYyh4ICsgcmFkaXVzLnRvcExlZnQsIHkgKyByYWRpdXMudG9wTGVmdCwgcmFkaXVzLnRvcExlZnQsIDEuNSAqIFBJLCBQSSwgdHJ1ZSk7XG4gICAgLy8gbGluZSBmcm9tIHRvcCBsZWZ0IHRvIGJvdHRvbSBsZWZ0XG4gICAgY3R4LmxpbmVUbyh4LCB5ICsgaCAtIHJhZGl1cy5ib3R0b21MZWZ0KTtcbiAgICAvLyBib3R0b20gbGVmdCBhcmNcbiAgICBjdHguYXJjKHggKyByYWRpdXMuYm90dG9tTGVmdCwgeSArIGggLSByYWRpdXMuYm90dG9tTGVmdCwgcmFkaXVzLmJvdHRvbUxlZnQsIFBJLCBIQUxGX1BJLCB0cnVlKTtcbiAgICAvLyBsaW5lIGZyb20gYm90dG9tIGxlZnQgdG8gYm90dG9tIHJpZ2h0XG4gICAgY3R4LmxpbmVUbyh4ICsgdyAtIHJhZGl1cy5ib3R0b21SaWdodCwgeSArIGgpO1xuICAgIC8vIGJvdHRvbSByaWdodCBhcmNcbiAgICBjdHguYXJjKHggKyB3IC0gcmFkaXVzLmJvdHRvbVJpZ2h0LCB5ICsgaCAtIHJhZGl1cy5ib3R0b21SaWdodCwgcmFkaXVzLmJvdHRvbVJpZ2h0LCBIQUxGX1BJLCAwLCB0cnVlKTtcbiAgICAvLyBsaW5lIGZyb20gYm90dG9tIHJpZ2h0IHRvIHRvcCByaWdodFxuICAgIGN0eC5saW5lVG8oeCArIHcsIHkgKyByYWRpdXMudG9wUmlnaHQpO1xuICAgIC8vIHRvcCByaWdodCBhcmNcbiAgICBjdHguYXJjKHggKyB3IC0gcmFkaXVzLnRvcFJpZ2h0LCB5ICsgcmFkaXVzLnRvcFJpZ2h0LCByYWRpdXMudG9wUmlnaHQsIDAsIC1IQUxGX1BJLCB0cnVlKTtcbiAgICAvLyBsaW5lIGZyb20gdG9wIHJpZ2h0IHRvIHRvcCBsZWZ0XG4gICAgY3R4LmxpbmVUbyh4ICsgcmFkaXVzLnRvcExlZnQsIHkpO1xufVxuXG5jb25zdCBMSU5FX0hFSUdIVCA9IC9eKG5vcm1hbHwoXFxkKyg/OlxcLlxcZCspPykocHh8ZW18JSk/KSQvO1xuY29uc3QgRk9OVF9TVFlMRSA9IC9eKG5vcm1hbHxpdGFsaWN8aW5pdGlhbHxpbmhlcml0fHVuc2V0fChvYmxpcXVlKCAtP1swLTldP1swLTldZGVnKT8pKSQvO1xuLyoqXG4gKiBAYWxpYXMgQ2hhcnQuaGVscGVycy5vcHRpb25zXG4gKiBAbmFtZXNwYWNlXG4gKi8gLyoqXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gbGluZSBoZWlnaHQgYHZhbHVlYCBpbiBwaXhlbHMgZm9yIGEgc3BlY2lmaWMgZm9udCBgc2l6ZWAuXG4gKiBAcGFyYW0gdmFsdWUgLSBUaGUgbGluZUhlaWdodCB0byBwYXJzZSAoZWcuIDEuNiwgJzE0cHgnLCAnNzUlJywgJzEuNmVtJykuXG4gKiBAcGFyYW0gc2l6ZSAtIFRoZSBmb250IHNpemUgKGluIHBpeGVscykgdXNlZCB0byByZXNvbHZlIHJlbGF0aXZlIGB2YWx1ZWAuXG4gKiBAcmV0dXJucyBUaGUgZWZmZWN0aXZlIGxpbmUgaGVpZ2h0IGluIHBpeGVscyAoc2l6ZSAqIDEuMiBpZiB2YWx1ZSBpcyBpbnZhbGlkKS5cbiAqIEBzZWUgaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQ1NTL2xpbmUtaGVpZ2h0XG4gKiBAc2luY2UgMi43LjBcbiAqLyBmdW5jdGlvbiB0b0xpbmVIZWlnaHQodmFsdWUsIHNpemUpIHtcbiAgICBjb25zdCBtYXRjaGVzID0gKCcnICsgdmFsdWUpLm1hdGNoKExJTkVfSEVJR0hUKTtcbiAgICBpZiAoIW1hdGNoZXMgfHwgbWF0Y2hlc1sxXSA9PT0gJ25vcm1hbCcpIHtcbiAgICAgICAgcmV0dXJuIHNpemUgKiAxLjI7XG4gICAgfVxuICAgIHZhbHVlID0gK21hdGNoZXNbMl07XG4gICAgc3dpdGNoKG1hdGNoZXNbM10pe1xuICAgICAgICBjYXNlICdweCc6XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIGNhc2UgJyUnOlxuICAgICAgICAgICAgdmFsdWUgLz0gMTAwO1xuICAgICAgICAgICAgYnJlYWs7XG4gICAgfVxuICAgIHJldHVybiBzaXplICogdmFsdWU7XG59XG5jb25zdCBudW1iZXJPclplcm8gPSAodik9Pit2IHx8IDA7XG5mdW5jdGlvbiBfcmVhZFZhbHVlVG9Qcm9wcyh2YWx1ZSwgcHJvcHMpIHtcbiAgICBjb25zdCByZXQgPSB7fTtcbiAgICBjb25zdCBvYmpQcm9wcyA9IGlzT2JqZWN0KHByb3BzKTtcbiAgICBjb25zdCBrZXlzID0gb2JqUHJvcHMgPyBPYmplY3Qua2V5cyhwcm9wcykgOiBwcm9wcztcbiAgICBjb25zdCByZWFkID0gaXNPYmplY3QodmFsdWUpID8gb2JqUHJvcHMgPyAocHJvcCk9PnZhbHVlT3JEZWZhdWx0KHZhbHVlW3Byb3BdLCB2YWx1ZVtwcm9wc1twcm9wXV0pIDogKHByb3ApPT52YWx1ZVtwcm9wXSA6ICgpPT52YWx1ZTtcbiAgICBmb3IgKGNvbnN0IHByb3Agb2Yga2V5cyl7XG4gICAgICAgIHJldFtwcm9wXSA9IG51bWJlck9yWmVybyhyZWFkKHByb3ApKTtcbiAgICB9XG4gICAgcmV0dXJuIHJldDtcbn1cbi8qKlxuICogQ29udmVydHMgdGhlIGdpdmVuIHZhbHVlIGludG8gYSBUUkJMIG9iamVjdC5cbiAqIEBwYXJhbSB2YWx1ZSAtIElmIGEgbnVtYmVyLCBzZXQgdGhlIHZhbHVlIHRvIGFsbCBUUkJMIGNvbXBvbmVudCxcbiAqICBlbHNlLCBpZiBhbiBvYmplY3QsIHVzZSBkZWZpbmVkIHByb3BlcnRpZXMgYW5kIHNldHMgdW5kZWZpbmVkIG9uZXMgdG8gMC5cbiAqICB4IC8geSBhcmUgc2hvcnRoYW5kcyBmb3Igc2FtZSB2YWx1ZSBmb3IgbGVmdC9yaWdodCBhbmQgdG9wL2JvdHRvbS5cbiAqIEByZXR1cm5zIFRoZSBwYWRkaW5nIHZhbHVlcyAodG9wLCByaWdodCwgYm90dG9tLCBsZWZ0KVxuICogQHNpbmNlIDMuMC4wXG4gKi8gZnVuY3Rpb24gdG9UUkJMKHZhbHVlKSB7XG4gICAgcmV0dXJuIF9yZWFkVmFsdWVUb1Byb3BzKHZhbHVlLCB7XG4gICAgICAgIHRvcDogJ3knLFxuICAgICAgICByaWdodDogJ3gnLFxuICAgICAgICBib3R0b206ICd5JyxcbiAgICAgICAgbGVmdDogJ3gnXG4gICAgfSk7XG59XG4vKipcbiAqIENvbnZlcnRzIHRoZSBnaXZlbiB2YWx1ZSBpbnRvIGEgVFJCTCBjb3JuZXJzIG9iamVjdCAoc2ltaWxhciB3aXRoIGNzcyBib3JkZXItcmFkaXVzKS5cbiAqIEBwYXJhbSB2YWx1ZSAtIElmIGEgbnVtYmVyLCBzZXQgdGhlIHZhbHVlIHRvIGFsbCBUUkJMIGNvcm5lciBjb21wb25lbnRzLFxuICogIGVsc2UsIGlmIGFuIG9iamVjdCwgdXNlIGRlZmluZWQgcHJvcGVydGllcyBhbmQgc2V0cyB1bmRlZmluZWQgb25lcyB0byAwLlxuICogQHJldHVybnMgVGhlIFRSQkwgY29ybmVyIHZhbHVlcyAodG9wTGVmdCwgdG9wUmlnaHQsIGJvdHRvbUxlZnQsIGJvdHRvbVJpZ2h0KVxuICogQHNpbmNlIDMuMC4wXG4gKi8gZnVuY3Rpb24gdG9UUkJMQ29ybmVycyh2YWx1ZSkge1xuICAgIHJldHVybiBfcmVhZFZhbHVlVG9Qcm9wcyh2YWx1ZSwgW1xuICAgICAgICAndG9wTGVmdCcsXG4gICAgICAgICd0b3BSaWdodCcsXG4gICAgICAgICdib3R0b21MZWZ0JyxcbiAgICAgICAgJ2JvdHRvbVJpZ2h0J1xuICAgIF0pO1xufVxuLyoqXG4gKiBDb252ZXJ0cyB0aGUgZ2l2ZW4gdmFsdWUgaW50byBhIHBhZGRpbmcgb2JqZWN0IHdpdGggcHJlLWNvbXB1dGVkIHdpZHRoL2hlaWdodC5cbiAqIEBwYXJhbSB2YWx1ZSAtIElmIGEgbnVtYmVyLCBzZXQgdGhlIHZhbHVlIHRvIGFsbCBUUkJMIGNvbXBvbmVudCxcbiAqICBlbHNlLCBpZiBhbiBvYmplY3QsIHVzZSBkZWZpbmVkIHByb3BlcnRpZXMgYW5kIHNldHMgdW5kZWZpbmVkIG9uZXMgdG8gMC5cbiAqICB4IC8geSBhcmUgc2hvcnRoYW5kcyBmb3Igc2FtZSB2YWx1ZSBmb3IgbGVmdC9yaWdodCBhbmQgdG9wL2JvdHRvbS5cbiAqIEByZXR1cm5zIFRoZSBwYWRkaW5nIHZhbHVlcyAodG9wLCByaWdodCwgYm90dG9tLCBsZWZ0LCB3aWR0aCwgaGVpZ2h0KVxuICogQHNpbmNlIDIuNy4wXG4gKi8gZnVuY3Rpb24gdG9QYWRkaW5nKHZhbHVlKSB7XG4gICAgY29uc3Qgb2JqID0gdG9UUkJMKHZhbHVlKTtcbiAgICBvYmoud2lkdGggPSBvYmoubGVmdCArIG9iai5yaWdodDtcbiAgICBvYmouaGVpZ2h0ID0gb2JqLnRvcCArIG9iai5ib3R0b207XG4gICAgcmV0dXJuIG9iajtcbn1cbi8qKlxuICogUGFyc2VzIGZvbnQgb3B0aW9ucyBhbmQgcmV0dXJucyB0aGUgZm9udCBvYmplY3QuXG4gKiBAcGFyYW0gb3B0aW9ucyAtIEEgb2JqZWN0IHRoYXQgY29udGFpbnMgZm9udCBvcHRpb25zIHRvIGJlIHBhcnNlZC5cbiAqIEBwYXJhbSBmYWxsYmFjayAtIEEgb2JqZWN0IHRoYXQgY29udGFpbnMgZmFsbGJhY2sgZm9udCBvcHRpb25zLlxuICogQHJldHVybiBUaGUgZm9udCBvYmplY3QuXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIHRvRm9udChvcHRpb25zLCBmYWxsYmFjaykge1xuICAgIG9wdGlvbnMgPSBvcHRpb25zIHx8IHt9O1xuICAgIGZhbGxiYWNrID0gZmFsbGJhY2sgfHwgZGVmYXVsdHMuZm9udDtcbiAgICBsZXQgc2l6ZSA9IHZhbHVlT3JEZWZhdWx0KG9wdGlvbnMuc2l6ZSwgZmFsbGJhY2suc2l6ZSk7XG4gICAgaWYgKHR5cGVvZiBzaXplID09PSAnc3RyaW5nJykge1xuICAgICAgICBzaXplID0gcGFyc2VJbnQoc2l6ZSwgMTApO1xuICAgIH1cbiAgICBsZXQgc3R5bGUgPSB2YWx1ZU9yRGVmYXVsdChvcHRpb25zLnN0eWxlLCBmYWxsYmFjay5zdHlsZSk7XG4gICAgaWYgKHN0eWxlICYmICEoJycgKyBzdHlsZSkubWF0Y2goRk9OVF9TVFlMRSkpIHtcbiAgICAgICAgY29uc29sZS53YXJuKCdJbnZhbGlkIGZvbnQgc3R5bGUgc3BlY2lmaWVkOiBcIicgKyBzdHlsZSArICdcIicpO1xuICAgICAgICBzdHlsZSA9IHVuZGVmaW5lZDtcbiAgICB9XG4gICAgY29uc3QgZm9udCA9IHtcbiAgICAgICAgZmFtaWx5OiB2YWx1ZU9yRGVmYXVsdChvcHRpb25zLmZhbWlseSwgZmFsbGJhY2suZmFtaWx5KSxcbiAgICAgICAgbGluZUhlaWdodDogdG9MaW5lSGVpZ2h0KHZhbHVlT3JEZWZhdWx0KG9wdGlvbnMubGluZUhlaWdodCwgZmFsbGJhY2subGluZUhlaWdodCksIHNpemUpLFxuICAgICAgICBzaXplLFxuICAgICAgICBzdHlsZSxcbiAgICAgICAgd2VpZ2h0OiB2YWx1ZU9yRGVmYXVsdChvcHRpb25zLndlaWdodCwgZmFsbGJhY2sud2VpZ2h0KSxcbiAgICAgICAgc3RyaW5nOiAnJ1xuICAgIH07XG4gICAgZm9udC5zdHJpbmcgPSB0b0ZvbnRTdHJpbmcoZm9udCk7XG4gICAgcmV0dXJuIGZvbnQ7XG59XG4vKipcbiAqIEV2YWx1YXRlcyB0aGUgZ2l2ZW4gYGlucHV0c2Agc2VxdWVudGlhbGx5IGFuZCByZXR1cm5zIHRoZSBmaXJzdCBkZWZpbmVkIHZhbHVlLlxuICogQHBhcmFtIGlucHV0cyAtIEFuIGFycmF5IG9mIHZhbHVlcywgZmFsbGluZyBiYWNrIHRvIHRoZSBsYXN0IHZhbHVlLlxuICogQHBhcmFtIGNvbnRleHQgLSBJZiBkZWZpbmVkIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBpcyBhIGZ1bmN0aW9uLCB0aGUgdmFsdWVcbiAqIGlzIGNhbGxlZCB3aXRoIGBjb250ZXh0YCBhcyBmaXJzdCBhcmd1bWVudCBhbmQgdGhlIHJlc3VsdCBiZWNvbWVzIHRoZSBuZXcgaW5wdXQuXG4gKiBAcGFyYW0gaW5kZXggLSBJZiBkZWZpbmVkIGFuZCB0aGUgY3VycmVudCB2YWx1ZSBpcyBhbiBhcnJheSwgdGhlIHZhbHVlXG4gKiBhdCBgaW5kZXhgIGJlY29tZSB0aGUgbmV3IGlucHV0LlxuICogQHBhcmFtIGluZm8gLSBvYmplY3QgdG8gcmV0dXJuIGluZm9ybWF0aW9uIGFib3V0IHJlc29sdXRpb24gaW5cbiAqIEBwYXJhbSBpbmZvLmNhY2hlYWJsZSAtIFdpbGwgYmUgc2V0IHRvIGBmYWxzZWAgaWYgb3B0aW9uIGlzIG5vdCBjYWNoZWFibGUuXG4gKiBAc2luY2UgMi43LjBcbiAqLyBmdW5jdGlvbiByZXNvbHZlKGlucHV0cywgY29udGV4dCwgaW5kZXgsIGluZm8pIHtcbiAgICBsZXQgY2FjaGVhYmxlID0gdHJ1ZTtcbiAgICBsZXQgaSwgaWxlbiwgdmFsdWU7XG4gICAgZm9yKGkgPSAwLCBpbGVuID0gaW5wdXRzLmxlbmd0aDsgaSA8IGlsZW47ICsraSl7XG4gICAgICAgIHZhbHVlID0gaW5wdXRzW2ldO1xuICAgICAgICBpZiAodmFsdWUgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGNvbnRleHQgIT09IHVuZGVmaW5lZCAmJiB0eXBlb2YgdmFsdWUgPT09ICdmdW5jdGlvbicpIHtcbiAgICAgICAgICAgIHZhbHVlID0gdmFsdWUoY29udGV4dCk7XG4gICAgICAgICAgICBjYWNoZWFibGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAoaW5kZXggIT09IHVuZGVmaW5lZCAmJiBpc0FycmF5KHZhbHVlKSkge1xuICAgICAgICAgICAgdmFsdWUgPSB2YWx1ZVtpbmRleCAlIHZhbHVlLmxlbmd0aF07XG4gICAgICAgICAgICBjYWNoZWFibGUgPSBmYWxzZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAodmFsdWUgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICAgICAgaWYgKGluZm8gJiYgIWNhY2hlYWJsZSkge1xuICAgICAgICAgICAgICAgIGluZm8uY2FjaGVhYmxlID0gZmFsc2U7XG4gICAgICAgICAgICB9XG4gICAgICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEBwYXJhbSBtaW5tYXhcbiAqIEBwYXJhbSBncmFjZVxuICogQHBhcmFtIGJlZ2luQXRaZXJvXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9hZGRHcmFjZShtaW5tYXgsIGdyYWNlLCBiZWdpbkF0WmVybykge1xuICAgIGNvbnN0IHsgbWluICwgbWF4ICB9ID0gbWlubWF4O1xuICAgIGNvbnN0IGNoYW5nZSA9IHRvRGltZW5zaW9uKGdyYWNlLCAobWF4IC0gbWluKSAvIDIpO1xuICAgIGNvbnN0IGtlZXBaZXJvID0gKHZhbHVlLCBhZGQpPT5iZWdpbkF0WmVybyAmJiB2YWx1ZSA9PT0gMCA/IDAgOiB2YWx1ZSArIGFkZDtcbiAgICByZXR1cm4ge1xuICAgICAgICBtaW46IGtlZXBaZXJvKG1pbiwgLU1hdGguYWJzKGNoYW5nZSkpLFxuICAgICAgICBtYXg6IGtlZXBaZXJvKG1heCwgY2hhbmdlKVxuICAgIH07XG59XG5mdW5jdGlvbiBjcmVhdGVDb250ZXh0KHBhcmVudENvbnRleHQsIGNvbnRleHQpIHtcbiAgICByZXR1cm4gT2JqZWN0LmFzc2lnbihPYmplY3QuY3JlYXRlKHBhcmVudENvbnRleHQpLCBjb250ZXh0KTtcbn1cblxuLyoqXG4gKiBDcmVhdGVzIGEgUHJveHkgZm9yIHJlc29sdmluZyByYXcgdmFsdWVzIGZvciBvcHRpb25zLlxuICogQHBhcmFtIHNjb3BlcyAtIFRoZSBvcHRpb24gc2NvcGVzIHRvIGxvb2sgZm9yIHZhbHVlcywgaW4gcmVzb2x1dGlvbiBvcmRlclxuICogQHBhcmFtIHByZWZpeGVzIC0gVGhlIHByZWZpeGVzIGZvciB2YWx1ZXMsIGluIHJlc29sdXRpb24gb3JkZXIuXG4gKiBAcGFyYW0gcm9vdFNjb3BlcyAtIFRoZSByb290IG9wdGlvbiBzY29wZXNcbiAqIEBwYXJhbSBmYWxsYmFjayAtIFBhcmVudCBzY29wZXMgZmFsbGJhY2tcbiAqIEBwYXJhbSBnZXRUYXJnZXQgLSBjYWxsYmFjayBmb3IgZ2V0dGluZyB0aGUgdGFyZ2V0IGZvciBjaGFuZ2VkIHZhbHVlc1xuICogQHJldHVybnMgUHJveHlcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2NyZWF0ZVJlc29sdmVyKHNjb3BlcywgcHJlZml4ZXMgPSBbXG4gICAgJydcbl0sIHJvb3RTY29wZXMsIGZhbGxiYWNrLCBnZXRUYXJnZXQgPSAoKT0+c2NvcGVzWzBdKSB7XG4gICAgY29uc3QgZmluYWxSb290U2NvcGVzID0gcm9vdFNjb3BlcyB8fCBzY29wZXM7XG4gICAgaWYgKHR5cGVvZiBmYWxsYmFjayA9PT0gJ3VuZGVmaW5lZCcpIHtcbiAgICAgICAgZmFsbGJhY2sgPSBfcmVzb2x2ZSgnX2ZhbGxiYWNrJywgc2NvcGVzKTtcbiAgICB9XG4gICAgY29uc3QgY2FjaGUgPSB7XG4gICAgICAgIFtTeW1ib2wudG9TdHJpbmdUYWddOiAnT2JqZWN0JyxcbiAgICAgICAgX2NhY2hlYWJsZTogdHJ1ZSxcbiAgICAgICAgX3Njb3Blczogc2NvcGVzLFxuICAgICAgICBfcm9vdFNjb3BlczogZmluYWxSb290U2NvcGVzLFxuICAgICAgICBfZmFsbGJhY2s6IGZhbGxiYWNrLFxuICAgICAgICBfZ2V0VGFyZ2V0OiBnZXRUYXJnZXQsXG4gICAgICAgIG92ZXJyaWRlOiAoc2NvcGUpPT5fY3JlYXRlUmVzb2x2ZXIoW1xuICAgICAgICAgICAgICAgIHNjb3BlLFxuICAgICAgICAgICAgICAgIC4uLnNjb3Blc1xuICAgICAgICAgICAgXSwgcHJlZml4ZXMsIGZpbmFsUm9vdFNjb3BlcywgZmFsbGJhY2spXG4gICAgfTtcbiAgICByZXR1cm4gbmV3IFByb3h5KGNhY2hlLCB7XG4gICAgICAgIC8qKlxuICAgICAqIEEgdHJhcCBmb3IgdGhlIGRlbGV0ZSBvcGVyYXRvci5cbiAgICAgKi8gZGVsZXRlUHJvcGVydHkgKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgZGVsZXRlIHRhcmdldFtwcm9wXTsgLy8gcmVtb3ZlIGZyb20gY2FjaGVcbiAgICAgICAgICAgIGRlbGV0ZSB0YXJnZXQuX2tleXM7IC8vIHJlbW92ZSBjYWNoZWQga2V5c1xuICAgICAgICAgICAgZGVsZXRlIHNjb3Blc1swXVtwcm9wXTsgLy8gcmVtb3ZlIGZyb20gdG9wIGxldmVsIHNjb3BlXG4gICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICogQSB0cmFwIGZvciBnZXR0aW5nIHByb3BlcnR5IHZhbHVlcy5cbiAgICAgKi8gZ2V0ICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBfY2FjaGVkKHRhcmdldCwgcHJvcCwgKCk9Pl9yZXNvbHZlV2l0aFByZWZpeGVzKHByb3AsIHByZWZpeGVzLCBzY29wZXMsIHRhcmdldCkpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgKiBBIHRyYXAgZm9yIE9iamVjdC5nZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IuXG4gICAgICogQWxzbyB1c2VkIGJ5IE9iamVjdC5oYXNPd25Qcm9wZXJ0eS5cbiAgICAgKi8gZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvcih0YXJnZXQuX3Njb3Blc1swXSwgcHJvcCk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAqIEEgdHJhcCBmb3IgT2JqZWN0LmdldFByb3RvdHlwZU9mLlxuICAgICAqLyBnZXRQcm90b3R5cGVPZiAoKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5nZXRQcm90b3R5cGVPZihzY29wZXNbMF0pO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgKiBBIHRyYXAgZm9yIHRoZSBpbiBvcGVyYXRvci5cbiAgICAgKi8gaGFzICh0YXJnZXQsIHByb3ApIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRLZXlzRnJvbUFsbFNjb3Blcyh0YXJnZXQpLmluY2x1ZGVzKHByb3ApO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgKiBBIHRyYXAgZm9yIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIGFuZCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLlxuICAgICAqLyBvd25LZXlzICh0YXJnZXQpIHtcbiAgICAgICAgICAgIHJldHVybiBnZXRLZXlzRnJvbUFsbFNjb3Blcyh0YXJnZXQpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgKiBBIHRyYXAgZm9yIHNldHRpbmcgcHJvcGVydHkgdmFsdWVzLlxuICAgICAqLyBzZXQgKHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgICAgIGNvbnN0IHN0b3JhZ2UgPSB0YXJnZXQuX3N0b3JhZ2UgfHwgKHRhcmdldC5fc3RvcmFnZSA9IGdldFRhcmdldCgpKTtcbiAgICAgICAgICAgIHRhcmdldFtwcm9wXSA9IHN0b3JhZ2VbcHJvcF0gPSB2YWx1ZTsgLy8gc2V0IHRvIHRvcCBsZXZlbCBzY29wZSArIGNhY2hlXG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0Ll9rZXlzOyAvLyByZW1vdmUgY2FjaGVkIGtleXNcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIFJldHVybnMgYW4gUHJveHkgZm9yIHJlc29sdmluZyBvcHRpb24gdmFsdWVzIHdpdGggY29udGV4dC5cbiAqIEBwYXJhbSBwcm94eSAtIFRoZSBQcm94eSByZXR1cm5lZCBieSBgX2NyZWF0ZVJlc29sdmVyYFxuICogQHBhcmFtIGNvbnRleHQgLSBDb250ZXh0IG9iamVjdCBmb3Igc2NyaXB0YWJsZS9pbmRleGFibGUgb3B0aW9uc1xuICogQHBhcmFtIHN1YlByb3h5IC0gVGhlIHByb3h5IHByb3ZpZGVkIGZvciBzY3JpcHRhYmxlIG9wdGlvbnNcbiAqIEBwYXJhbSBkZXNjcmlwdG9yRGVmYXVsdHMgLSBEZWZhdWx0cyBmb3IgZGVzY3JpcHRvcnNcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2F0dGFjaENvbnRleHQocHJveHksIGNvbnRleHQsIHN1YlByb3h5LCBkZXNjcmlwdG9yRGVmYXVsdHMpIHtcbiAgICBjb25zdCBjYWNoZSA9IHtcbiAgICAgICAgX2NhY2hlYWJsZTogZmFsc2UsXG4gICAgICAgIF9wcm94eTogcHJveHksXG4gICAgICAgIF9jb250ZXh0OiBjb250ZXh0LFxuICAgICAgICBfc3ViUHJveHk6IHN1YlByb3h5LFxuICAgICAgICBfc3RhY2s6IG5ldyBTZXQoKSxcbiAgICAgICAgX2Rlc2NyaXB0b3JzOiBfZGVzY3JpcHRvcnMocHJveHksIGRlc2NyaXB0b3JEZWZhdWx0cyksXG4gICAgICAgIHNldENvbnRleHQ6IChjdHgpPT5fYXR0YWNoQ29udGV4dChwcm94eSwgY3R4LCBzdWJQcm94eSwgZGVzY3JpcHRvckRlZmF1bHRzKSxcbiAgICAgICAgb3ZlcnJpZGU6IChzY29wZSk9Pl9hdHRhY2hDb250ZXh0KHByb3h5Lm92ZXJyaWRlKHNjb3BlKSwgY29udGV4dCwgc3ViUHJveHksIGRlc2NyaXB0b3JEZWZhdWx0cylcbiAgICB9O1xuICAgIHJldHVybiBuZXcgUHJveHkoY2FjaGUsIHtcbiAgICAgICAgLyoqXG4gICAgICogQSB0cmFwIGZvciB0aGUgZGVsZXRlIG9wZXJhdG9yLlxuICAgICAqLyBkZWxldGVQcm9wZXJ0eSAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICBkZWxldGUgdGFyZ2V0W3Byb3BdOyAvLyByZW1vdmUgZnJvbSBjYWNoZVxuICAgICAgICAgICAgZGVsZXRlIHByb3h5W3Byb3BdOyAvLyByZW1vdmUgZnJvbSBwcm94eVxuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAqIEEgdHJhcCBmb3IgZ2V0dGluZyBwcm9wZXJ0eSB2YWx1ZXMuXG4gICAgICovIGdldCAodGFyZ2V0LCBwcm9wLCByZWNlaXZlcikge1xuICAgICAgICAgICAgcmV0dXJuIF9jYWNoZWQodGFyZ2V0LCBwcm9wLCAoKT0+X3Jlc29sdmVXaXRoQ29udGV4dCh0YXJnZXQsIHByb3AsIHJlY2VpdmVyKSk7XG4gICAgICAgIH0sXG4gICAgICAgIC8qKlxuICAgICAqIEEgdHJhcCBmb3IgT2JqZWN0LmdldE93blByb3BlcnR5RGVzY3JpcHRvci5cbiAgICAgKiBBbHNvIHVzZWQgYnkgT2JqZWN0Lmhhc093blByb3BlcnR5LlxuICAgICAqLyBnZXRPd25Qcm9wZXJ0eURlc2NyaXB0b3IgKHRhcmdldCwgcHJvcCkge1xuICAgICAgICAgICAgcmV0dXJuIHRhcmdldC5fZGVzY3JpcHRvcnMuYWxsS2V5cyA/IFJlZmxlY3QuaGFzKHByb3h5LCBwcm9wKSA/IHtcbiAgICAgICAgICAgICAgICBlbnVtZXJhYmxlOiB0cnVlLFxuICAgICAgICAgICAgICAgIGNvbmZpZ3VyYWJsZTogdHJ1ZVxuICAgICAgICAgICAgfSA6IHVuZGVmaW5lZCA6IFJlZmxlY3QuZ2V0T3duUHJvcGVydHlEZXNjcmlwdG9yKHByb3h5LCBwcm9wKTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICogQSB0cmFwIGZvciBPYmplY3QuZ2V0UHJvdG90eXBlT2YuXG4gICAgICovIGdldFByb3RvdHlwZU9mICgpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0LmdldFByb3RvdHlwZU9mKHByb3h5KTtcbiAgICAgICAgfSxcbiAgICAgICAgLyoqXG4gICAgICogQSB0cmFwIGZvciB0aGUgaW4gb3BlcmF0b3IuXG4gICAgICovIGhhcyAodGFyZ2V0LCBwcm9wKSB7XG4gICAgICAgICAgICByZXR1cm4gUmVmbGVjdC5oYXMocHJveHksIHByb3ApO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgKiBBIHRyYXAgZm9yIE9iamVjdC5nZXRPd25Qcm9wZXJ0eU5hbWVzIGFuZCBPYmplY3QuZ2V0T3duUHJvcGVydHlTeW1ib2xzLlxuICAgICAqLyBvd25LZXlzICgpIHtcbiAgICAgICAgICAgIHJldHVybiBSZWZsZWN0Lm93bktleXMocHJveHkpO1xuICAgICAgICB9LFxuICAgICAgICAvKipcbiAgICAgKiBBIHRyYXAgZm9yIHNldHRpbmcgcHJvcGVydHkgdmFsdWVzLlxuICAgICAqLyBzZXQgKHRhcmdldCwgcHJvcCwgdmFsdWUpIHtcbiAgICAgICAgICAgIHByb3h5W3Byb3BdID0gdmFsdWU7IC8vIHNldCB0byBwcm94eVxuICAgICAgICAgICAgZGVsZXRlIHRhcmdldFtwcm9wXTsgLy8gcmVtb3ZlIGZyb20gY2FjaGVcbiAgICAgICAgICAgIHJldHVybiB0cnVlO1xuICAgICAgICB9XG4gICAgfSk7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2Rlc2NyaXB0b3JzKHByb3h5LCBkZWZhdWx0cyA9IHtcbiAgICBzY3JpcHRhYmxlOiB0cnVlLFxuICAgIGluZGV4YWJsZTogdHJ1ZVxufSkge1xuICAgIGNvbnN0IHsgX3NjcmlwdGFibGUgPWRlZmF1bHRzLnNjcmlwdGFibGUgLCBfaW5kZXhhYmxlID1kZWZhdWx0cy5pbmRleGFibGUgLCBfYWxsS2V5cyA9ZGVmYXVsdHMuYWxsS2V5cyAgfSA9IHByb3h5O1xuICAgIHJldHVybiB7XG4gICAgICAgIGFsbEtleXM6IF9hbGxLZXlzLFxuICAgICAgICBzY3JpcHRhYmxlOiBfc2NyaXB0YWJsZSxcbiAgICAgICAgaW5kZXhhYmxlOiBfaW5kZXhhYmxlLFxuICAgICAgICBpc1NjcmlwdGFibGU6IGlzRnVuY3Rpb24oX3NjcmlwdGFibGUpID8gX3NjcmlwdGFibGUgOiAoKT0+X3NjcmlwdGFibGUsXG4gICAgICAgIGlzSW5kZXhhYmxlOiBpc0Z1bmN0aW9uKF9pbmRleGFibGUpID8gX2luZGV4YWJsZSA6ICgpPT5faW5kZXhhYmxlXG4gICAgfTtcbn1cbmNvbnN0IHJlYWRLZXkgPSAocHJlZml4LCBuYW1lKT0+cHJlZml4ID8gcHJlZml4ICsgX2NhcGl0YWxpemUobmFtZSkgOiBuYW1lO1xuY29uc3QgbmVlZHNTdWJSZXNvbHZlciA9IChwcm9wLCB2YWx1ZSk9PmlzT2JqZWN0KHZhbHVlKSAmJiBwcm9wICE9PSAnYWRhcHRlcnMnICYmIChPYmplY3QuZ2V0UHJvdG90eXBlT2YodmFsdWUpID09PSBudWxsIHx8IHZhbHVlLmNvbnN0cnVjdG9yID09PSBPYmplY3QpO1xuZnVuY3Rpb24gX2NhY2hlZCh0YXJnZXQsIHByb3AsIHJlc29sdmUpIHtcbiAgICBpZiAoT2JqZWN0LnByb3RvdHlwZS5oYXNPd25Qcm9wZXJ0eS5jYWxsKHRhcmdldCwgcHJvcCkgfHwgcHJvcCA9PT0gJ2NvbnN0cnVjdG9yJykge1xuICAgICAgICByZXR1cm4gdGFyZ2V0W3Byb3BdO1xuICAgIH1cbiAgICBjb25zdCB2YWx1ZSA9IHJlc29sdmUoKTtcbiAgICAvLyBjYWNoZSB0aGUgcmVzb2x2ZWQgdmFsdWVcbiAgICB0YXJnZXRbcHJvcF0gPSB2YWx1ZTtcbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBfcmVzb2x2ZVdpdGhDb250ZXh0KHRhcmdldCwgcHJvcCwgcmVjZWl2ZXIpIHtcbiAgICBjb25zdCB7IF9wcm94eSAsIF9jb250ZXh0ICwgX3N1YlByb3h5ICwgX2Rlc2NyaXB0b3JzOiBkZXNjcmlwdG9ycyAgfSA9IHRhcmdldDtcbiAgICBsZXQgdmFsdWUgPSBfcHJveHlbcHJvcF07IC8vIHJlc29sdmUgZnJvbSBwcm94eVxuICAgIC8vIHJlc29sdmUgd2l0aCBjb250ZXh0XG4gICAgaWYgKGlzRnVuY3Rpb24odmFsdWUpICYmIGRlc2NyaXB0b3JzLmlzU2NyaXB0YWJsZShwcm9wKSkge1xuICAgICAgICB2YWx1ZSA9IF9yZXNvbHZlU2NyaXB0YWJsZShwcm9wLCB2YWx1ZSwgdGFyZ2V0LCByZWNlaXZlcik7XG4gICAgfVxuICAgIGlmIChpc0FycmF5KHZhbHVlKSAmJiB2YWx1ZS5sZW5ndGgpIHtcbiAgICAgICAgdmFsdWUgPSBfcmVzb2x2ZUFycmF5KHByb3AsIHZhbHVlLCB0YXJnZXQsIGRlc2NyaXB0b3JzLmlzSW5kZXhhYmxlKTtcbiAgICB9XG4gICAgaWYgKG5lZWRzU3ViUmVzb2x2ZXIocHJvcCwgdmFsdWUpKSB7XG4gICAgICAgIC8vIGlmIHRoZSByZXNvbHZlZCB2YWx1ZSBpcyBhbiBvYmplY3QsIGNyZWF0ZSBhIHN1YiByZXNvbHZlciBmb3IgaXRcbiAgICAgICAgdmFsdWUgPSBfYXR0YWNoQ29udGV4dCh2YWx1ZSwgX2NvbnRleHQsIF9zdWJQcm94eSAmJiBfc3ViUHJveHlbcHJvcF0sIGRlc2NyaXB0b3JzKTtcbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gX3Jlc29sdmVTY3JpcHRhYmxlKHByb3AsIGdldFZhbHVlLCB0YXJnZXQsIHJlY2VpdmVyKSB7XG4gICAgY29uc3QgeyBfcHJveHkgLCBfY29udGV4dCAsIF9zdWJQcm94eSAsIF9zdGFjayAgfSA9IHRhcmdldDtcbiAgICBpZiAoX3N0YWNrLmhhcyhwcm9wKSkge1xuICAgICAgICB0aHJvdyBuZXcgRXJyb3IoJ1JlY3Vyc2lvbiBkZXRlY3RlZDogJyArIEFycmF5LmZyb20oX3N0YWNrKS5qb2luKCctPicpICsgJy0+JyArIHByb3ApO1xuICAgIH1cbiAgICBfc3RhY2suYWRkKHByb3ApO1xuICAgIGxldCB2YWx1ZSA9IGdldFZhbHVlKF9jb250ZXh0LCBfc3ViUHJveHkgfHwgcmVjZWl2ZXIpO1xuICAgIF9zdGFjay5kZWxldGUocHJvcCk7XG4gICAgaWYgKG5lZWRzU3ViUmVzb2x2ZXIocHJvcCwgdmFsdWUpKSB7XG4gICAgICAgIC8vIFdoZW4gc2NyaXB0YWJsZSBvcHRpb24gcmV0dXJucyBhbiBvYmplY3QsIGNyZWF0ZSBhIHJlc29sdmVyIG9uIHRoYXQuXG4gICAgICAgIHZhbHVlID0gY3JlYXRlU3ViUmVzb2x2ZXIoX3Byb3h5Ll9zY29wZXMsIF9wcm94eSwgcHJvcCwgdmFsdWUpO1xuICAgIH1cbiAgICByZXR1cm4gdmFsdWU7XG59XG5mdW5jdGlvbiBfcmVzb2x2ZUFycmF5KHByb3AsIHZhbHVlLCB0YXJnZXQsIGlzSW5kZXhhYmxlKSB7XG4gICAgY29uc3QgeyBfcHJveHkgLCBfY29udGV4dCAsIF9zdWJQcm94eSAsIF9kZXNjcmlwdG9yczogZGVzY3JpcHRvcnMgIH0gPSB0YXJnZXQ7XG4gICAgaWYgKHR5cGVvZiBfY29udGV4dC5pbmRleCAhPT0gJ3VuZGVmaW5lZCcgJiYgaXNJbmRleGFibGUocHJvcCkpIHtcbiAgICAgICAgcmV0dXJuIHZhbHVlW19jb250ZXh0LmluZGV4ICUgdmFsdWUubGVuZ3RoXTtcbiAgICB9IGVsc2UgaWYgKGlzT2JqZWN0KHZhbHVlWzBdKSkge1xuICAgICAgICAvLyBBcnJheSBvZiBvYmplY3RzLCByZXR1cm4gYXJyYXkgb3IgcmVzb2x2ZXJzXG4gICAgICAgIGNvbnN0IGFyciA9IHZhbHVlO1xuICAgICAgICBjb25zdCBzY29wZXMgPSBfcHJveHkuX3Njb3Blcy5maWx0ZXIoKHMpPT5zICE9PSBhcnIpO1xuICAgICAgICB2YWx1ZSA9IFtdO1xuICAgICAgICBmb3IgKGNvbnN0IGl0ZW0gb2YgYXJyKXtcbiAgICAgICAgICAgIGNvbnN0IHJlc29sdmVyID0gY3JlYXRlU3ViUmVzb2x2ZXIoc2NvcGVzLCBfcHJveHksIHByb3AsIGl0ZW0pO1xuICAgICAgICAgICAgdmFsdWUucHVzaChfYXR0YWNoQ29udGV4dChyZXNvbHZlciwgX2NvbnRleHQsIF9zdWJQcm94eSAmJiBfc3ViUHJveHlbcHJvcF0sIGRlc2NyaXB0b3JzKSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHZhbHVlO1xufVxuZnVuY3Rpb24gcmVzb2x2ZUZhbGxiYWNrKGZhbGxiYWNrLCBwcm9wLCB2YWx1ZSkge1xuICAgIHJldHVybiBpc0Z1bmN0aW9uKGZhbGxiYWNrKSA/IGZhbGxiYWNrKHByb3AsIHZhbHVlKSA6IGZhbGxiYWNrO1xufVxuY29uc3QgZ2V0U2NvcGUgPSAoa2V5LCBwYXJlbnQpPT5rZXkgPT09IHRydWUgPyBwYXJlbnQgOiB0eXBlb2Yga2V5ID09PSAnc3RyaW5nJyA/IHJlc29sdmVPYmplY3RLZXkocGFyZW50LCBrZXkpIDogdW5kZWZpbmVkO1xuZnVuY3Rpb24gYWRkU2NvcGVzKHNldCwgcGFyZW50U2NvcGVzLCBrZXksIHBhcmVudEZhbGxiYWNrLCB2YWx1ZSkge1xuICAgIGZvciAoY29uc3QgcGFyZW50IG9mIHBhcmVudFNjb3Blcyl7XG4gICAgICAgIGNvbnN0IHNjb3BlID0gZ2V0U2NvcGUoa2V5LCBwYXJlbnQpO1xuICAgICAgICBpZiAoc2NvcGUpIHtcbiAgICAgICAgICAgIHNldC5hZGQoc2NvcGUpO1xuICAgICAgICAgICAgY29uc3QgZmFsbGJhY2sgPSByZXNvbHZlRmFsbGJhY2soc2NvcGUuX2ZhbGxiYWNrLCBrZXksIHZhbHVlKTtcbiAgICAgICAgICAgIGlmICh0eXBlb2YgZmFsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmIGZhbGxiYWNrICE9PSBrZXkgJiYgZmFsbGJhY2sgIT09IHBhcmVudEZhbGxiYWNrKSB7XG4gICAgICAgICAgICAgICAgLy8gV2hlbiB3ZSByZWFjaCB0aGUgZGVzY3JpcHRvciB0aGF0IGRlZmluZXMgYSBuZXcgX2ZhbGxiYWNrLCByZXR1cm4gdGhhdC5cbiAgICAgICAgICAgICAgICAvLyBUaGUgZmFsbGJhY2sgd2lsbCByZXN1bWUgdG8gdGhhdCBuZXcgc2NvcGUuXG4gICAgICAgICAgICAgICAgcmV0dXJuIGZhbGxiYWNrO1xuICAgICAgICAgICAgfVxuICAgICAgICB9IGVsc2UgaWYgKHNjb3BlID09PSBmYWxzZSAmJiB0eXBlb2YgcGFyZW50RmFsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmIGtleSAhPT0gcGFyZW50RmFsbGJhY2spIHtcbiAgICAgICAgICAgIC8vIEZhbGxiYWNrIHRvIGBmYWxzZWAgcmVzdWx0cyB0byBgZmFsc2VgLCB3aGVuIGZhbGxpbmcgYmFjayB0byBkaWZmZXJlbnQga2V5LlxuICAgICAgICAgICAgLy8gRm9yIGV4YW1wbGUgYGludGVyYWN0aW9uYCBmcm9tIGBob3ZlcmAgb3IgYHBsdWdpbnMudG9vbHRpcGAgYW5kIGBhbmltYXRpb25gIGZyb20gYGFuaW1hdGlvbnNgXG4gICAgICAgICAgICByZXR1cm4gbnVsbDtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBjcmVhdGVTdWJSZXNvbHZlcihwYXJlbnRTY29wZXMsIHJlc29sdmVyLCBwcm9wLCB2YWx1ZSkge1xuICAgIGNvbnN0IHJvb3RTY29wZXMgPSByZXNvbHZlci5fcm9vdFNjb3BlcztcbiAgICBjb25zdCBmYWxsYmFjayA9IHJlc29sdmVGYWxsYmFjayhyZXNvbHZlci5fZmFsbGJhY2ssIHByb3AsIHZhbHVlKTtcbiAgICBjb25zdCBhbGxTY29wZXMgPSBbXG4gICAgICAgIC4uLnBhcmVudFNjb3BlcyxcbiAgICAgICAgLi4ucm9vdFNjb3Blc1xuICAgIF07XG4gICAgY29uc3Qgc2V0ID0gbmV3IFNldCgpO1xuICAgIHNldC5hZGQodmFsdWUpO1xuICAgIGxldCBrZXkgPSBhZGRTY29wZXNGcm9tS2V5KHNldCwgYWxsU2NvcGVzLCBwcm9wLCBmYWxsYmFjayB8fCBwcm9wLCB2YWx1ZSk7XG4gICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmICh0eXBlb2YgZmFsbGJhY2sgIT09ICd1bmRlZmluZWQnICYmIGZhbGxiYWNrICE9PSBwcm9wKSB7XG4gICAgICAgIGtleSA9IGFkZFNjb3Blc0Zyb21LZXkoc2V0LCBhbGxTY29wZXMsIGZhbGxiYWNrLCBrZXksIHZhbHVlKTtcbiAgICAgICAgaWYgKGtleSA9PT0gbnVsbCkge1xuICAgICAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgICAgICB9XG4gICAgfVxuICAgIHJldHVybiBfY3JlYXRlUmVzb2x2ZXIoQXJyYXkuZnJvbShzZXQpLCBbXG4gICAgICAgICcnXG4gICAgXSwgcm9vdFNjb3BlcywgZmFsbGJhY2ssICgpPT5zdWJHZXRUYXJnZXQocmVzb2x2ZXIsIHByb3AsIHZhbHVlKSk7XG59XG5mdW5jdGlvbiBhZGRTY29wZXNGcm9tS2V5KHNldCwgYWxsU2NvcGVzLCBrZXksIGZhbGxiYWNrLCBpdGVtKSB7XG4gICAgd2hpbGUoa2V5KXtcbiAgICAgICAga2V5ID0gYWRkU2NvcGVzKHNldCwgYWxsU2NvcGVzLCBrZXksIGZhbGxiYWNrLCBpdGVtKTtcbiAgICB9XG4gICAgcmV0dXJuIGtleTtcbn1cbmZ1bmN0aW9uIHN1YkdldFRhcmdldChyZXNvbHZlciwgcHJvcCwgdmFsdWUpIHtcbiAgICBjb25zdCBwYXJlbnQgPSByZXNvbHZlci5fZ2V0VGFyZ2V0KCk7XG4gICAgaWYgKCEocHJvcCBpbiBwYXJlbnQpKSB7XG4gICAgICAgIHBhcmVudFtwcm9wXSA9IHt9O1xuICAgIH1cbiAgICBjb25zdCB0YXJnZXQgPSBwYXJlbnRbcHJvcF07XG4gICAgaWYgKGlzQXJyYXkodGFyZ2V0KSAmJiBpc09iamVjdCh2YWx1ZSkpIHtcbiAgICAgICAgLy8gRm9yIGFycmF5IG9mIG9iamVjdHMsIHRoZSBvYmplY3QgaXMgdXNlZCB0byBzdG9yZSB1cGRhdGVkIHZhbHVlc1xuICAgICAgICByZXR1cm4gdmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB0YXJnZXQgfHwge307XG59XG5mdW5jdGlvbiBfcmVzb2x2ZVdpdGhQcmVmaXhlcyhwcm9wLCBwcmVmaXhlcywgc2NvcGVzLCBwcm94eSkge1xuICAgIGxldCB2YWx1ZTtcbiAgICBmb3IgKGNvbnN0IHByZWZpeCBvZiBwcmVmaXhlcyl7XG4gICAgICAgIHZhbHVlID0gX3Jlc29sdmUocmVhZEtleShwcmVmaXgsIHByb3ApLCBzY29wZXMpO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIG5lZWRzU3ViUmVzb2x2ZXIocHJvcCwgdmFsdWUpID8gY3JlYXRlU3ViUmVzb2x2ZXIoc2NvcGVzLCBwcm94eSwgcHJvcCwgdmFsdWUpIDogdmFsdWU7XG4gICAgICAgIH1cbiAgICB9XG59XG5mdW5jdGlvbiBfcmVzb2x2ZShrZXksIHNjb3Blcykge1xuICAgIGZvciAoY29uc3Qgc2NvcGUgb2Ygc2NvcGVzKXtcbiAgICAgICAgaWYgKCFzY29wZSkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgdmFsdWUgPSBzY29wZVtrZXldO1xuICAgICAgICBpZiAodHlwZW9mIHZhbHVlICE9PSAndW5kZWZpbmVkJykge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgfVxufVxuZnVuY3Rpb24gZ2V0S2V5c0Zyb21BbGxTY29wZXModGFyZ2V0KSB7XG4gICAgbGV0IGtleXMgPSB0YXJnZXQuX2tleXM7XG4gICAgaWYgKCFrZXlzKSB7XG4gICAgICAgIGtleXMgPSB0YXJnZXQuX2tleXMgPSByZXNvbHZlS2V5c0Zyb21BbGxTY29wZXModGFyZ2V0Ll9zY29wZXMpO1xuICAgIH1cbiAgICByZXR1cm4ga2V5cztcbn1cbmZ1bmN0aW9uIHJlc29sdmVLZXlzRnJvbUFsbFNjb3BlcyhzY29wZXMpIHtcbiAgICBjb25zdCBzZXQgPSBuZXcgU2V0KCk7XG4gICAgZm9yIChjb25zdCBzY29wZSBvZiBzY29wZXMpe1xuICAgICAgICBmb3IgKGNvbnN0IGtleSBvZiBPYmplY3Qua2V5cyhzY29wZSkuZmlsdGVyKChrKT0+IWsuc3RhcnRzV2l0aCgnXycpKSl7XG4gICAgICAgICAgICBzZXQuYWRkKGtleSk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIEFycmF5LmZyb20oc2V0KTtcbn1cbmZ1bmN0aW9uIF9wYXJzZU9iamVjdERhdGFSYWRpYWxTY2FsZShtZXRhLCBkYXRhLCBzdGFydCwgY291bnQpIHtcbiAgICBjb25zdCB7IGlTY2FsZSAgfSA9IG1ldGE7XG4gICAgY29uc3QgeyBrZXkgPSdyJyAgfSA9IHRoaXMuX3BhcnNpbmc7XG4gICAgY29uc3QgcGFyc2VkID0gbmV3IEFycmF5KGNvdW50KTtcbiAgICBsZXQgaSwgaWxlbiwgaW5kZXgsIGl0ZW07XG4gICAgZm9yKGkgPSAwLCBpbGVuID0gY291bnQ7IGkgPCBpbGVuOyArK2kpe1xuICAgICAgICBpbmRleCA9IGkgKyBzdGFydDtcbiAgICAgICAgaXRlbSA9IGRhdGFbaW5kZXhdO1xuICAgICAgICBwYXJzZWRbaV0gPSB7XG4gICAgICAgICAgICByOiBpU2NhbGUucGFyc2UocmVzb2x2ZU9iamVjdEtleShpdGVtLCBrZXkpLCBpbmRleClcbiAgICAgICAgfTtcbiAgICB9XG4gICAgcmV0dXJuIHBhcnNlZDtcbn1cblxuY29uc3QgRVBTSUxPTiA9IE51bWJlci5FUFNJTE9OIHx8IDFlLTE0O1xuY29uc3QgZ2V0UG9pbnQgPSAocG9pbnRzLCBpKT0+aSA8IHBvaW50cy5sZW5ndGggJiYgIXBvaW50c1tpXS5za2lwICYmIHBvaW50c1tpXTtcbmNvbnN0IGdldFZhbHVlQXhpcyA9IChpbmRleEF4aXMpPT5pbmRleEF4aXMgPT09ICd4JyA/ICd5JyA6ICd4JztcbmZ1bmN0aW9uIHNwbGluZUN1cnZlKGZpcnN0UG9pbnQsIG1pZGRsZVBvaW50LCBhZnRlclBvaW50LCB0KSB7XG4gICAgLy8gUHJvcHMgdG8gUm9iIFNwZW5jZXIgYXQgc2NhbGVkIGlubm92YXRpb24gZm9yIGhpcyBwb3N0IG9uIHNwbGluaW5nIGJldHdlZW4gcG9pbnRzXG4gICAgLy8gaHR0cDovL3NjYWxlZGlubm92YXRpb24uY29tL2FuYWx5dGljcy9zcGxpbmVzL2Fib3V0U3BsaW5lcy5odG1sXG4gICAgLy8gVGhpcyBmdW5jdGlvbiBtdXN0IGFsc28gcmVzcGVjdCBcInNraXBwZWRcIiBwb2ludHNcbiAgICBjb25zdCBwcmV2aW91cyA9IGZpcnN0UG9pbnQuc2tpcCA/IG1pZGRsZVBvaW50IDogZmlyc3RQb2ludDtcbiAgICBjb25zdCBjdXJyZW50ID0gbWlkZGxlUG9pbnQ7XG4gICAgY29uc3QgbmV4dCA9IGFmdGVyUG9pbnQuc2tpcCA/IG1pZGRsZVBvaW50IDogYWZ0ZXJQb2ludDtcbiAgICBjb25zdCBkMDEgPSBkaXN0YW5jZUJldHdlZW5Qb2ludHMoY3VycmVudCwgcHJldmlvdXMpO1xuICAgIGNvbnN0IGQxMiA9IGRpc3RhbmNlQmV0d2VlblBvaW50cyhuZXh0LCBjdXJyZW50KTtcbiAgICBsZXQgczAxID0gZDAxIC8gKGQwMSArIGQxMik7XG4gICAgbGV0IHMxMiA9IGQxMiAvIChkMDEgKyBkMTIpO1xuICAgIC8vIElmIGFsbCBwb2ludHMgYXJlIHRoZSBzYW1lLCBzMDEgJiBzMDIgd2lsbCBiZSBpbmZcbiAgICBzMDEgPSBpc05hTihzMDEpID8gMCA6IHMwMTtcbiAgICBzMTIgPSBpc05hTihzMTIpID8gMCA6IHMxMjtcbiAgICBjb25zdCBmYSA9IHQgKiBzMDE7IC8vIHNjYWxpbmcgZmFjdG9yIGZvciB0cmlhbmdsZSBUYVxuICAgIGNvbnN0IGZiID0gdCAqIHMxMjtcbiAgICByZXR1cm4ge1xuICAgICAgICBwcmV2aW91czoge1xuICAgICAgICAgICAgeDogY3VycmVudC54IC0gZmEgKiAobmV4dC54IC0gcHJldmlvdXMueCksXG4gICAgICAgICAgICB5OiBjdXJyZW50LnkgLSBmYSAqIChuZXh0LnkgLSBwcmV2aW91cy55KVxuICAgICAgICB9LFxuICAgICAgICBuZXh0OiB7XG4gICAgICAgICAgICB4OiBjdXJyZW50LnggKyBmYiAqIChuZXh0LnggLSBwcmV2aW91cy54KSxcbiAgICAgICAgICAgIHk6IGN1cnJlbnQueSArIGZiICogKG5leHQueSAtIHByZXZpb3VzLnkpXG4gICAgICAgIH1cbiAgICB9O1xufVxuLyoqXG4gKiBBZGp1c3QgdGFuZ2VudHMgdG8gZW5zdXJlIG1vbm90b25pYyBwcm9wZXJ0aWVzXG4gKi8gZnVuY3Rpb24gbW9ub3RvbmVBZGp1c3QocG9pbnRzLCBkZWx0YUssIG1LKSB7XG4gICAgY29uc3QgcG9pbnRzTGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBsZXQgYWxwaGFLLCBiZXRhSywgdGF1Sywgc3F1YXJlZE1hZ25pdHVkZSwgcG9pbnRDdXJyZW50O1xuICAgIGxldCBwb2ludEFmdGVyID0gZ2V0UG9pbnQocG9pbnRzLCAwKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9pbnRzTGVuIC0gMTsgKytpKXtcbiAgICAgICAgcG9pbnRDdXJyZW50ID0gcG9pbnRBZnRlcjtcbiAgICAgICAgcG9pbnRBZnRlciA9IGdldFBvaW50KHBvaW50cywgaSArIDEpO1xuICAgICAgICBpZiAoIXBvaW50Q3VycmVudCB8fCAhcG9pbnRBZnRlcikge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKGFsbW9zdEVxdWFscyhkZWx0YUtbaV0sIDAsIEVQU0lMT04pKSB7XG4gICAgICAgICAgICBtS1tpXSA9IG1LW2kgKyAxXSA9IDA7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBhbHBoYUsgPSBtS1tpXSAvIGRlbHRhS1tpXTtcbiAgICAgICAgYmV0YUsgPSBtS1tpICsgMV0gLyBkZWx0YUtbaV07XG4gICAgICAgIHNxdWFyZWRNYWduaXR1ZGUgPSBNYXRoLnBvdyhhbHBoYUssIDIpICsgTWF0aC5wb3coYmV0YUssIDIpO1xuICAgICAgICBpZiAoc3F1YXJlZE1hZ25pdHVkZSA8PSA5KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICB0YXVLID0gMyAvIE1hdGguc3FydChzcXVhcmVkTWFnbml0dWRlKTtcbiAgICAgICAgbUtbaV0gPSBhbHBoYUsgKiB0YXVLICogZGVsdGFLW2ldO1xuICAgICAgICBtS1tpICsgMV0gPSBiZXRhSyAqIHRhdUsgKiBkZWx0YUtbaV07XG4gICAgfVxufVxuZnVuY3Rpb24gbW9ub3RvbmVDb21wdXRlKHBvaW50cywgbUssIGluZGV4QXhpcyA9ICd4Jykge1xuICAgIGNvbnN0IHZhbHVlQXhpcyA9IGdldFZhbHVlQXhpcyhpbmRleEF4aXMpO1xuICAgIGNvbnN0IHBvaW50c0xlbiA9IHBvaW50cy5sZW5ndGg7XG4gICAgbGV0IGRlbHRhLCBwb2ludEJlZm9yZSwgcG9pbnRDdXJyZW50O1xuICAgIGxldCBwb2ludEFmdGVyID0gZ2V0UG9pbnQocG9pbnRzLCAwKTtcbiAgICBmb3IobGV0IGkgPSAwOyBpIDwgcG9pbnRzTGVuOyArK2kpe1xuICAgICAgICBwb2ludEJlZm9yZSA9IHBvaW50Q3VycmVudDtcbiAgICAgICAgcG9pbnRDdXJyZW50ID0gcG9pbnRBZnRlcjtcbiAgICAgICAgcG9pbnRBZnRlciA9IGdldFBvaW50KHBvaW50cywgaSArIDEpO1xuICAgICAgICBpZiAoIXBvaW50Q3VycmVudCkge1xuICAgICAgICAgICAgY29udGludWU7XG4gICAgICAgIH1cbiAgICAgICAgY29uc3QgaVBpeGVsID0gcG9pbnRDdXJyZW50W2luZGV4QXhpc107XG4gICAgICAgIGNvbnN0IHZQaXhlbCA9IHBvaW50Q3VycmVudFt2YWx1ZUF4aXNdO1xuICAgICAgICBpZiAocG9pbnRCZWZvcmUpIHtcbiAgICAgICAgICAgIGRlbHRhID0gKGlQaXhlbCAtIHBvaW50QmVmb3JlW2luZGV4QXhpc10pIC8gMztcbiAgICAgICAgICAgIHBvaW50Q3VycmVudFtgY3AxJHtpbmRleEF4aXN9YF0gPSBpUGl4ZWwgLSBkZWx0YTtcbiAgICAgICAgICAgIHBvaW50Q3VycmVudFtgY3AxJHt2YWx1ZUF4aXN9YF0gPSB2UGl4ZWwgLSBkZWx0YSAqIG1LW2ldO1xuICAgICAgICB9XG4gICAgICAgIGlmIChwb2ludEFmdGVyKSB7XG4gICAgICAgICAgICBkZWx0YSA9IChwb2ludEFmdGVyW2luZGV4QXhpc10gLSBpUGl4ZWwpIC8gMztcbiAgICAgICAgICAgIHBvaW50Q3VycmVudFtgY3AyJHtpbmRleEF4aXN9YF0gPSBpUGl4ZWwgKyBkZWx0YTtcbiAgICAgICAgICAgIHBvaW50Q3VycmVudFtgY3AyJHt2YWx1ZUF4aXN9YF0gPSB2UGl4ZWwgKyBkZWx0YSAqIG1LW2ldO1xuICAgICAgICB9XG4gICAgfVxufVxuLyoqXG4gKiBUaGlzIGZ1bmN0aW9uIGNhbGN1bGF0ZXMgQsOpemllciBjb250cm9sIHBvaW50cyBpbiBhIHNpbWlsYXIgd2F5IHRoYW4gfHNwbGluZUN1cnZlfCxcbiAqIGJ1dCBwcmVzZXJ2ZXMgbW9ub3RvbmljaXR5IG9mIHRoZSBwcm92aWRlZCBkYXRhIGFuZCBlbnN1cmVzIG5vIGxvY2FsIGV4dHJlbXVtcyBhcmUgYWRkZWRcbiAqIGJldHdlZW4gdGhlIGRhdGFzZXQgZGlzY3JldGUgcG9pbnRzIGR1ZSB0byB0aGUgaW50ZXJwb2xhdGlvbi5cbiAqIFNlZSA6IGh0dHBzOi8vZW4ud2lraXBlZGlhLm9yZy93aWtpL01vbm90b25lX2N1YmljX2ludGVycG9sYXRpb25cbiAqLyBmdW5jdGlvbiBzcGxpbmVDdXJ2ZU1vbm90b25lKHBvaW50cywgaW5kZXhBeGlzID0gJ3gnKSB7XG4gICAgY29uc3QgdmFsdWVBeGlzID0gZ2V0VmFsdWVBeGlzKGluZGV4QXhpcyk7XG4gICAgY29uc3QgcG9pbnRzTGVuID0gcG9pbnRzLmxlbmd0aDtcbiAgICBjb25zdCBkZWx0YUsgPSBBcnJheShwb2ludHNMZW4pLmZpbGwoMCk7XG4gICAgY29uc3QgbUsgPSBBcnJheShwb2ludHNMZW4pO1xuICAgIC8vIENhbGN1bGF0ZSBzbG9wZXMgKGRlbHRhSykgYW5kIGluaXRpYWxpemUgdGFuZ2VudHMgKG1LKVxuICAgIGxldCBpLCBwb2ludEJlZm9yZSwgcG9pbnRDdXJyZW50O1xuICAgIGxldCBwb2ludEFmdGVyID0gZ2V0UG9pbnQocG9pbnRzLCAwKTtcbiAgICBmb3IoaSA9IDA7IGkgPCBwb2ludHNMZW47ICsraSl7XG4gICAgICAgIHBvaW50QmVmb3JlID0gcG9pbnRDdXJyZW50O1xuICAgICAgICBwb2ludEN1cnJlbnQgPSBwb2ludEFmdGVyO1xuICAgICAgICBwb2ludEFmdGVyID0gZ2V0UG9pbnQocG9pbnRzLCBpICsgMSk7XG4gICAgICAgIGlmICghcG9pbnRDdXJyZW50KSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpZiAocG9pbnRBZnRlcikge1xuICAgICAgICAgICAgY29uc3Qgc2xvcGVEZWx0YSA9IHBvaW50QWZ0ZXJbaW5kZXhBeGlzXSAtIHBvaW50Q3VycmVudFtpbmRleEF4aXNdO1xuICAgICAgICAgICAgLy8gSW4gdGhlIGNhc2Ugb2YgdHdvIHBvaW50cyB0aGF0IGFwcGVhciBhdCB0aGUgc2FtZSB4IHBpeGVsLCBzbG9wZURlbHRhWCBpcyAwXG4gICAgICAgICAgICBkZWx0YUtbaV0gPSBzbG9wZURlbHRhICE9PSAwID8gKHBvaW50QWZ0ZXJbdmFsdWVBeGlzXSAtIHBvaW50Q3VycmVudFt2YWx1ZUF4aXNdKSAvIHNsb3BlRGVsdGEgOiAwO1xuICAgICAgICB9XG4gICAgICAgIG1LW2ldID0gIXBvaW50QmVmb3JlID8gZGVsdGFLW2ldIDogIXBvaW50QWZ0ZXIgPyBkZWx0YUtbaSAtIDFdIDogc2lnbihkZWx0YUtbaSAtIDFdKSAhPT0gc2lnbihkZWx0YUtbaV0pID8gMCA6IChkZWx0YUtbaSAtIDFdICsgZGVsdGFLW2ldKSAvIDI7XG4gICAgfVxuICAgIG1vbm90b25lQWRqdXN0KHBvaW50cywgZGVsdGFLLCBtSyk7XG4gICAgbW9ub3RvbmVDb21wdXRlKHBvaW50cywgbUssIGluZGV4QXhpcyk7XG59XG5mdW5jdGlvbiBjYXBDb250cm9sUG9pbnQocHQsIG1pbiwgbWF4KSB7XG4gICAgcmV0dXJuIE1hdGgubWF4KE1hdGgubWluKHB0LCBtYXgpLCBtaW4pO1xufVxuZnVuY3Rpb24gY2FwQmV6aWVyUG9pbnRzKHBvaW50cywgYXJlYSkge1xuICAgIGxldCBpLCBpbGVuLCBwb2ludCwgaW5BcmVhLCBpbkFyZWFQcmV2O1xuICAgIGxldCBpbkFyZWFOZXh0ID0gX2lzUG9pbnRJbkFyZWEocG9pbnRzWzBdLCBhcmVhKTtcbiAgICBmb3IoaSA9IDAsIGlsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgaWxlbjsgKytpKXtcbiAgICAgICAgaW5BcmVhUHJldiA9IGluQXJlYTtcbiAgICAgICAgaW5BcmVhID0gaW5BcmVhTmV4dDtcbiAgICAgICAgaW5BcmVhTmV4dCA9IGkgPCBpbGVuIC0gMSAmJiBfaXNQb2ludEluQXJlYShwb2ludHNbaSArIDFdLCBhcmVhKTtcbiAgICAgICAgaWYgKCFpbkFyZWEpIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgICBpZiAoaW5BcmVhUHJldikge1xuICAgICAgICAgICAgcG9pbnQuY3AxeCA9IGNhcENvbnRyb2xQb2ludChwb2ludC5jcDF4LCBhcmVhLmxlZnQsIGFyZWEucmlnaHQpO1xuICAgICAgICAgICAgcG9pbnQuY3AxeSA9IGNhcENvbnRyb2xQb2ludChwb2ludC5jcDF5LCBhcmVhLnRvcCwgYXJlYS5ib3R0b20pO1xuICAgICAgICB9XG4gICAgICAgIGlmIChpbkFyZWFOZXh0KSB7XG4gICAgICAgICAgICBwb2ludC5jcDJ4ID0gY2FwQ29udHJvbFBvaW50KHBvaW50LmNwMngsIGFyZWEubGVmdCwgYXJlYS5yaWdodCk7XG4gICAgICAgICAgICBwb2ludC5jcDJ5ID0gY2FwQ29udHJvbFBvaW50KHBvaW50LmNwMnksIGFyZWEudG9wLCBhcmVhLmJvdHRvbSk7XG4gICAgICAgIH1cbiAgICB9XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX3VwZGF0ZUJlemllckNvbnRyb2xQb2ludHMocG9pbnRzLCBvcHRpb25zLCBhcmVhLCBsb29wLCBpbmRleEF4aXMpIHtcbiAgICBsZXQgaSwgaWxlbiwgcG9pbnQsIGNvbnRyb2xQb2ludHM7XG4gICAgLy8gT25seSBjb25zaWRlciBwb2ludHMgdGhhdCBhcmUgZHJhd24gaW4gY2FzZSB0aGUgc3BhbkdhcHMgb3B0aW9uIGlzIHVzZWRcbiAgICBpZiAob3B0aW9ucy5zcGFuR2Fwcykge1xuICAgICAgICBwb2ludHMgPSBwb2ludHMuZmlsdGVyKChwdCk9PiFwdC5za2lwKTtcbiAgICB9XG4gICAgaWYgKG9wdGlvbnMuY3ViaWNJbnRlcnBvbGF0aW9uTW9kZSA9PT0gJ21vbm90b25lJykge1xuICAgICAgICBzcGxpbmVDdXJ2ZU1vbm90b25lKHBvaW50cywgaW5kZXhBeGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBsZXQgcHJldiA9IGxvb3AgPyBwb2ludHNbcG9pbnRzLmxlbmd0aCAtIDFdIDogcG9pbnRzWzBdO1xuICAgICAgICBmb3IoaSA9IDAsIGlsZW4gPSBwb2ludHMubGVuZ3RoOyBpIDwgaWxlbjsgKytpKXtcbiAgICAgICAgICAgIHBvaW50ID0gcG9pbnRzW2ldO1xuICAgICAgICAgICAgY29udHJvbFBvaW50cyA9IHNwbGluZUN1cnZlKHByZXYsIHBvaW50LCBwb2ludHNbTWF0aC5taW4oaSArIDEsIGlsZW4gLSAobG9vcCA/IDAgOiAxKSkgJSBpbGVuXSwgb3B0aW9ucy50ZW5zaW9uKTtcbiAgICAgICAgICAgIHBvaW50LmNwMXggPSBjb250cm9sUG9pbnRzLnByZXZpb3VzLng7XG4gICAgICAgICAgICBwb2ludC5jcDF5ID0gY29udHJvbFBvaW50cy5wcmV2aW91cy55O1xuICAgICAgICAgICAgcG9pbnQuY3AyeCA9IGNvbnRyb2xQb2ludHMubmV4dC54O1xuICAgICAgICAgICAgcG9pbnQuY3AyeSA9IGNvbnRyb2xQb2ludHMubmV4dC55O1xuICAgICAgICAgICAgcHJldiA9IHBvaW50O1xuICAgICAgICB9XG4gICAgfVxuICAgIGlmIChvcHRpb25zLmNhcEJlemllclBvaW50cykge1xuICAgICAgICBjYXBCZXppZXJQb2ludHMocG9pbnRzLCBhcmVhKTtcbiAgICB9XG59XG5cbi8qKlxuICogQHByaXZhdGVcbiAqLyBmdW5jdGlvbiBfaXNEb21TdXBwb3J0ZWQoKSB7XG4gICAgcmV0dXJuIHR5cGVvZiB3aW5kb3cgIT09ICd1bmRlZmluZWQnICYmIHR5cGVvZiBkb2N1bWVudCAhPT0gJ3VuZGVmaW5lZCc7XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX2dldFBhcmVudE5vZGUoZG9tTm9kZSkge1xuICAgIGxldCBwYXJlbnQgPSBkb21Ob2RlLnBhcmVudE5vZGU7XG4gICAgaWYgKHBhcmVudCAmJiBwYXJlbnQudG9TdHJpbmcoKSA9PT0gJ1tvYmplY3QgU2hhZG93Um9vdF0nKSB7XG4gICAgICAgIHBhcmVudCA9IHBhcmVudC5ob3N0O1xuICAgIH1cbiAgICByZXR1cm4gcGFyZW50O1xufVxuLyoqXG4gKiBjb252ZXJ0IG1heC13aWR0aC9tYXgtaGVpZ2h0IHZhbHVlcyB0aGF0IG1heSBiZSBwZXJjZW50YWdlcyBpbnRvIGEgbnVtYmVyXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIHBhcnNlTWF4U3R5bGUoc3R5bGVWYWx1ZSwgbm9kZSwgcGFyZW50UHJvcGVydHkpIHtcbiAgICBsZXQgdmFsdWVJblBpeGVscztcbiAgICBpZiAodHlwZW9mIHN0eWxlVmFsdWUgPT09ICdzdHJpbmcnKSB7XG4gICAgICAgIHZhbHVlSW5QaXhlbHMgPSBwYXJzZUludChzdHlsZVZhbHVlLCAxMCk7XG4gICAgICAgIGlmIChzdHlsZVZhbHVlLmluZGV4T2YoJyUnKSAhPT0gLTEpIHtcbiAgICAgICAgICAgIC8vIHBlcmNlbnRhZ2UgKiBzaXplIGluIGRpbWVuc2lvblxuICAgICAgICAgICAgdmFsdWVJblBpeGVscyA9IHZhbHVlSW5QaXhlbHMgLyAxMDAgKiBub2RlLnBhcmVudE5vZGVbcGFyZW50UHJvcGVydHldO1xuICAgICAgICB9XG4gICAgfSBlbHNlIHtcbiAgICAgICAgdmFsdWVJblBpeGVscyA9IHN0eWxlVmFsdWU7XG4gICAgfVxuICAgIHJldHVybiB2YWx1ZUluUGl4ZWxzO1xufVxuY29uc3QgZ2V0Q29tcHV0ZWRTdHlsZSA9IChlbGVtZW50KT0+ZWxlbWVudC5vd25lckRvY3VtZW50LmRlZmF1bHRWaWV3LmdldENvbXB1dGVkU3R5bGUoZWxlbWVudCwgbnVsbCk7XG5mdW5jdGlvbiBnZXRTdHlsZShlbCwgcHJvcGVydHkpIHtcbiAgICByZXR1cm4gZ2V0Q29tcHV0ZWRTdHlsZShlbCkuZ2V0UHJvcGVydHlWYWx1ZShwcm9wZXJ0eSk7XG59XG5jb25zdCBwb3NpdGlvbnMgPSBbXG4gICAgJ3RvcCcsXG4gICAgJ3JpZ2h0JyxcbiAgICAnYm90dG9tJyxcbiAgICAnbGVmdCdcbl07XG5mdW5jdGlvbiBnZXRQb3NpdGlvbmVkU3R5bGUoc3R5bGVzLCBzdHlsZSwgc3VmZml4KSB7XG4gICAgY29uc3QgcmVzdWx0ID0ge307XG4gICAgc3VmZml4ID0gc3VmZml4ID8gJy0nICsgc3VmZml4IDogJyc7XG4gICAgZm9yKGxldCBpID0gMDsgaSA8IDQ7IGkrKyl7XG4gICAgICAgIGNvbnN0IHBvcyA9IHBvc2l0aW9uc1tpXTtcbiAgICAgICAgcmVzdWx0W3Bvc10gPSBwYXJzZUZsb2F0KHN0eWxlc1tzdHlsZSArICctJyArIHBvcyArIHN1ZmZpeF0pIHx8IDA7XG4gICAgfVxuICAgIHJlc3VsdC53aWR0aCA9IHJlc3VsdC5sZWZ0ICsgcmVzdWx0LnJpZ2h0O1xuICAgIHJlc3VsdC5oZWlnaHQgPSByZXN1bHQudG9wICsgcmVzdWx0LmJvdHRvbTtcbiAgICByZXR1cm4gcmVzdWx0O1xufVxuY29uc3QgdXNlT2Zmc2V0UG9zID0gKHgsIHksIHRhcmdldCk9Pih4ID4gMCB8fCB5ID4gMCkgJiYgKCF0YXJnZXQgfHwgIXRhcmdldC5zaGFkb3dSb290KTtcbi8qKlxuICogQHBhcmFtIGVcbiAqIEBwYXJhbSBjYW52YXNcbiAqIEByZXR1cm5zIENhbnZhcyBwb3NpdGlvblxuICovIGZ1bmN0aW9uIGdldENhbnZhc1Bvc2l0aW9uKGUsIGNhbnZhcykge1xuICAgIGNvbnN0IHRvdWNoZXMgPSBlLnRvdWNoZXM7XG4gICAgY29uc3Qgc291cmNlID0gdG91Y2hlcyAmJiB0b3VjaGVzLmxlbmd0aCA/IHRvdWNoZXNbMF0gOiBlO1xuICAgIGNvbnN0IHsgb2Zmc2V0WCAsIG9mZnNldFkgIH0gPSBzb3VyY2U7XG4gICAgbGV0IGJveCA9IGZhbHNlO1xuICAgIGxldCB4LCB5O1xuICAgIGlmICh1c2VPZmZzZXRQb3Mob2Zmc2V0WCwgb2Zmc2V0WSwgZS50YXJnZXQpKSB7XG4gICAgICAgIHggPSBvZmZzZXRYO1xuICAgICAgICB5ID0gb2Zmc2V0WTtcbiAgICB9IGVsc2Uge1xuICAgICAgICBjb25zdCByZWN0ID0gY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgICAgICB4ID0gc291cmNlLmNsaWVudFggLSByZWN0LmxlZnQ7XG4gICAgICAgIHkgPSBzb3VyY2UuY2xpZW50WSAtIHJlY3QudG9wO1xuICAgICAgICBib3ggPSB0cnVlO1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICB4LFxuICAgICAgICB5LFxuICAgICAgICBib3hcbiAgICB9O1xufVxuLyoqXG4gKiBHZXRzIGFuIGV2ZW50J3MgeCwgeSBjb29yZGluYXRlcywgcmVsYXRpdmUgdG8gdGhlIGNoYXJ0IGFyZWFcbiAqIEBwYXJhbSBldmVudFxuICogQHBhcmFtIGNoYXJ0XG4gKiBAcmV0dXJucyB4IGFuZCB5IGNvb3JkaW5hdGVzIG9mIHRoZSBldmVudFxuICovIGZ1bmN0aW9uIGdldFJlbGF0aXZlUG9zaXRpb24oZXZlbnQsIGNoYXJ0KSB7XG4gICAgaWYgKCduYXRpdmUnIGluIGV2ZW50KSB7XG4gICAgICAgIHJldHVybiBldmVudDtcbiAgICB9XG4gICAgY29uc3QgeyBjYW52YXMgLCBjdXJyZW50RGV2aWNlUGl4ZWxSYXRpbyAgfSA9IGNoYXJ0O1xuICAgIGNvbnN0IHN0eWxlID0gZ2V0Q29tcHV0ZWRTdHlsZShjYW52YXMpO1xuICAgIGNvbnN0IGJvcmRlckJveCA9IHN0eWxlLmJveFNpemluZyA9PT0gJ2JvcmRlci1ib3gnO1xuICAgIGNvbnN0IHBhZGRpbmdzID0gZ2V0UG9zaXRpb25lZFN0eWxlKHN0eWxlLCAncGFkZGluZycpO1xuICAgIGNvbnN0IGJvcmRlcnMgPSBnZXRQb3NpdGlvbmVkU3R5bGUoc3R5bGUsICdib3JkZXInLCAnd2lkdGgnKTtcbiAgICBjb25zdCB7IHggLCB5ICwgYm94ICB9ID0gZ2V0Q2FudmFzUG9zaXRpb24oZXZlbnQsIGNhbnZhcyk7XG4gICAgY29uc3QgeE9mZnNldCA9IHBhZGRpbmdzLmxlZnQgKyAoYm94ICYmIGJvcmRlcnMubGVmdCk7XG4gICAgY29uc3QgeU9mZnNldCA9IHBhZGRpbmdzLnRvcCArIChib3ggJiYgYm9yZGVycy50b3ApO1xuICAgIGxldCB7IHdpZHRoICwgaGVpZ2h0ICB9ID0gY2hhcnQ7XG4gICAgaWYgKGJvcmRlckJveCkge1xuICAgICAgICB3aWR0aCAtPSBwYWRkaW5ncy53aWR0aCArIGJvcmRlcnMud2lkdGg7XG4gICAgICAgIGhlaWdodCAtPSBwYWRkaW5ncy5oZWlnaHQgKyBib3JkZXJzLmhlaWdodDtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgeDogTWF0aC5yb3VuZCgoeCAtIHhPZmZzZXQpIC8gd2lkdGggKiBjYW52YXMud2lkdGggLyBjdXJyZW50RGV2aWNlUGl4ZWxSYXRpbyksXG4gICAgICAgIHk6IE1hdGgucm91bmQoKHkgLSB5T2Zmc2V0KSAvIGhlaWdodCAqIGNhbnZhcy5oZWlnaHQgLyBjdXJyZW50RGV2aWNlUGl4ZWxSYXRpbylcbiAgICB9O1xufVxuZnVuY3Rpb24gZ2V0Q29udGFpbmVyU2l6ZShjYW52YXMsIHdpZHRoLCBoZWlnaHQpIHtcbiAgICBsZXQgbWF4V2lkdGgsIG1heEhlaWdodDtcbiAgICBpZiAod2lkdGggPT09IHVuZGVmaW5lZCB8fCBoZWlnaHQgPT09IHVuZGVmaW5lZCkge1xuICAgICAgICBjb25zdCBjb250YWluZXIgPSBjYW52YXMgJiYgX2dldFBhcmVudE5vZGUoY2FudmFzKTtcbiAgICAgICAgaWYgKCFjb250YWluZXIpIHtcbiAgICAgICAgICAgIHdpZHRoID0gY2FudmFzLmNsaWVudFdpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gY2FudmFzLmNsaWVudEhlaWdodDtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGNvbnN0IHJlY3QgPSBjb250YWluZXIuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7IC8vIHRoaXMgaXMgdGhlIGJvcmRlciBib3ggb2YgdGhlIGNvbnRhaW5lclxuICAgICAgICAgICAgY29uc3QgY29udGFpbmVyU3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGNvbnRhaW5lcik7XG4gICAgICAgICAgICBjb25zdCBjb250YWluZXJCb3JkZXIgPSBnZXRQb3NpdGlvbmVkU3R5bGUoY29udGFpbmVyU3R5bGUsICdib3JkZXInLCAnd2lkdGgnKTtcbiAgICAgICAgICAgIGNvbnN0IGNvbnRhaW5lclBhZGRpbmcgPSBnZXRQb3NpdGlvbmVkU3R5bGUoY29udGFpbmVyU3R5bGUsICdwYWRkaW5nJyk7XG4gICAgICAgICAgICB3aWR0aCA9IHJlY3Qud2lkdGggLSBjb250YWluZXJQYWRkaW5nLndpZHRoIC0gY29udGFpbmVyQm9yZGVyLndpZHRoO1xuICAgICAgICAgICAgaGVpZ2h0ID0gcmVjdC5oZWlnaHQgLSBjb250YWluZXJQYWRkaW5nLmhlaWdodCAtIGNvbnRhaW5lckJvcmRlci5oZWlnaHQ7XG4gICAgICAgICAgICBtYXhXaWR0aCA9IHBhcnNlTWF4U3R5bGUoY29udGFpbmVyU3R5bGUubWF4V2lkdGgsIGNvbnRhaW5lciwgJ2NsaWVudFdpZHRoJyk7XG4gICAgICAgICAgICBtYXhIZWlnaHQgPSBwYXJzZU1heFN0eWxlKGNvbnRhaW5lclN0eWxlLm1heEhlaWdodCwgY29udGFpbmVyLCAnY2xpZW50SGVpZ2h0Jyk7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodCxcbiAgICAgICAgbWF4V2lkdGg6IG1heFdpZHRoIHx8IElORklOSVRZLFxuICAgICAgICBtYXhIZWlnaHQ6IG1heEhlaWdodCB8fCBJTkZJTklUWVxuICAgIH07XG59XG5jb25zdCByb3VuZDEgPSAodik9Pk1hdGgucm91bmQodiAqIDEwKSAvIDEwO1xuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIGNvbXBsZXhpdHlcbmZ1bmN0aW9uIGdldE1heGltdW1TaXplKGNhbnZhcywgYmJXaWR0aCwgYmJIZWlnaHQsIGFzcGVjdFJhdGlvKSB7XG4gICAgY29uc3Qgc3R5bGUgPSBnZXRDb21wdXRlZFN0eWxlKGNhbnZhcyk7XG4gICAgY29uc3QgbWFyZ2lucyA9IGdldFBvc2l0aW9uZWRTdHlsZShzdHlsZSwgJ21hcmdpbicpO1xuICAgIGNvbnN0IG1heFdpZHRoID0gcGFyc2VNYXhTdHlsZShzdHlsZS5tYXhXaWR0aCwgY2FudmFzLCAnY2xpZW50V2lkdGgnKSB8fCBJTkZJTklUWTtcbiAgICBjb25zdCBtYXhIZWlnaHQgPSBwYXJzZU1heFN0eWxlKHN0eWxlLm1heEhlaWdodCwgY2FudmFzLCAnY2xpZW50SGVpZ2h0JykgfHwgSU5GSU5JVFk7XG4gICAgY29uc3QgY29udGFpbmVyU2l6ZSA9IGdldENvbnRhaW5lclNpemUoY2FudmFzLCBiYldpZHRoLCBiYkhlaWdodCk7XG4gICAgbGV0IHsgd2lkdGggLCBoZWlnaHQgIH0gPSBjb250YWluZXJTaXplO1xuICAgIGlmIChzdHlsZS5ib3hTaXppbmcgPT09ICdjb250ZW50LWJveCcpIHtcbiAgICAgICAgY29uc3QgYm9yZGVycyA9IGdldFBvc2l0aW9uZWRTdHlsZShzdHlsZSwgJ2JvcmRlcicsICd3aWR0aCcpO1xuICAgICAgICBjb25zdCBwYWRkaW5ncyA9IGdldFBvc2l0aW9uZWRTdHlsZShzdHlsZSwgJ3BhZGRpbmcnKTtcbiAgICAgICAgd2lkdGggLT0gcGFkZGluZ3Mud2lkdGggKyBib3JkZXJzLndpZHRoO1xuICAgICAgICBoZWlnaHQgLT0gcGFkZGluZ3MuaGVpZ2h0ICsgYm9yZGVycy5oZWlnaHQ7XG4gICAgfVxuICAgIHdpZHRoID0gTWF0aC5tYXgoMCwgd2lkdGggLSBtYXJnaW5zLndpZHRoKTtcbiAgICBoZWlnaHQgPSBNYXRoLm1heCgwLCBhc3BlY3RSYXRpbyA/IHdpZHRoIC8gYXNwZWN0UmF0aW8gOiBoZWlnaHQgLSBtYXJnaW5zLmhlaWdodCk7XG4gICAgd2lkdGggPSByb3VuZDEoTWF0aC5taW4od2lkdGgsIG1heFdpZHRoLCBjb250YWluZXJTaXplLm1heFdpZHRoKSk7XG4gICAgaGVpZ2h0ID0gcm91bmQxKE1hdGgubWluKGhlaWdodCwgbWF4SGVpZ2h0LCBjb250YWluZXJTaXplLm1heEhlaWdodCkpO1xuICAgIGlmICh3aWR0aCAmJiAhaGVpZ2h0KSB7XG4gICAgICAgIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL0NoYXJ0LmpzL2lzc3Vlcy80NjU5XG4gICAgICAgIC8vIElmIHRoZSBjYW52YXMgaGFzIHdpZHRoLCBidXQgbm8gaGVpZ2h0LCBkZWZhdWx0IHRvIGFzcGVjdFJhdGlvIG9mIDIgKGNhbnZhcyBkZWZhdWx0KVxuICAgICAgICBoZWlnaHQgPSByb3VuZDEod2lkdGggLyAyKTtcbiAgICB9XG4gICAgY29uc3QgbWFpbnRhaW5IZWlnaHQgPSBiYldpZHRoICE9PSB1bmRlZmluZWQgfHwgYmJIZWlnaHQgIT09IHVuZGVmaW5lZDtcbiAgICBpZiAobWFpbnRhaW5IZWlnaHQgJiYgYXNwZWN0UmF0aW8gJiYgY29udGFpbmVyU2l6ZS5oZWlnaHQgJiYgaGVpZ2h0ID4gY29udGFpbmVyU2l6ZS5oZWlnaHQpIHtcbiAgICAgICAgaGVpZ2h0ID0gY29udGFpbmVyU2l6ZS5oZWlnaHQ7XG4gICAgICAgIHdpZHRoID0gcm91bmQxKE1hdGguZmxvb3IoaGVpZ2h0ICogYXNwZWN0UmF0aW8pKTtcbiAgICB9XG4gICAgcmV0dXJuIHtcbiAgICAgICAgd2lkdGgsXG4gICAgICAgIGhlaWdodFxuICAgIH07XG59XG4vKipcbiAqIEBwYXJhbSBjaGFydFxuICogQHBhcmFtIGZvcmNlUmF0aW9cbiAqIEBwYXJhbSBmb3JjZVN0eWxlXG4gKiBAcmV0dXJucyBUcnVlIGlmIHRoZSBjYW52YXMgY29udGV4dCBzaXplIG9yIHRyYW5zZm9ybWF0aW9uIGhhcyBjaGFuZ2VkLlxuICovIGZ1bmN0aW9uIHJldGluYVNjYWxlKGNoYXJ0LCBmb3JjZVJhdGlvLCBmb3JjZVN0eWxlKSB7XG4gICAgY29uc3QgcGl4ZWxSYXRpbyA9IGZvcmNlUmF0aW8gfHwgMTtcbiAgICBjb25zdCBkZXZpY2VIZWlnaHQgPSBNYXRoLmZsb29yKGNoYXJ0LmhlaWdodCAqIHBpeGVsUmF0aW8pO1xuICAgIGNvbnN0IGRldmljZVdpZHRoID0gTWF0aC5mbG9vcihjaGFydC53aWR0aCAqIHBpeGVsUmF0aW8pO1xuICAgIGNoYXJ0LmhlaWdodCA9IE1hdGguZmxvb3IoY2hhcnQuaGVpZ2h0KTtcbiAgICBjaGFydC53aWR0aCA9IE1hdGguZmxvb3IoY2hhcnQud2lkdGgpO1xuICAgIGNvbnN0IGNhbnZhcyA9IGNoYXJ0LmNhbnZhcztcbiAgICAvLyBJZiBubyBzdHlsZSBoYXMgYmVlbiBzZXQgb24gdGhlIGNhbnZhcywgdGhlIHJlbmRlciBzaXplIGlzIHVzZWQgYXMgZGlzcGxheSBzaXplLFxuICAgIC8vIG1ha2luZyB0aGUgY2hhcnQgdmlzdWFsbHkgYmlnZ2VyLCBzbyBsZXQncyBlbmZvcmNlIGl0IHRvIHRoZSBcImNvcnJlY3RcIiB2YWx1ZXMuXG4gICAgLy8gU2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL0NoYXJ0LmpzL2lzc3Vlcy8zNTc1XG4gICAgaWYgKGNhbnZhcy5zdHlsZSAmJiAoZm9yY2VTdHlsZSB8fCAhY2FudmFzLnN0eWxlLmhlaWdodCAmJiAhY2FudmFzLnN0eWxlLndpZHRoKSkge1xuICAgICAgICBjYW52YXMuc3R5bGUuaGVpZ2h0ID0gYCR7Y2hhcnQuaGVpZ2h0fXB4YDtcbiAgICAgICAgY2FudmFzLnN0eWxlLndpZHRoID0gYCR7Y2hhcnQud2lkdGh9cHhgO1xuICAgIH1cbiAgICBpZiAoY2hhcnQuY3VycmVudERldmljZVBpeGVsUmF0aW8gIT09IHBpeGVsUmF0aW8gfHwgY2FudmFzLmhlaWdodCAhPT0gZGV2aWNlSGVpZ2h0IHx8IGNhbnZhcy53aWR0aCAhPT0gZGV2aWNlV2lkdGgpIHtcbiAgICAgICAgY2hhcnQuY3VycmVudERldmljZVBpeGVsUmF0aW8gPSBwaXhlbFJhdGlvO1xuICAgICAgICBjYW52YXMuaGVpZ2h0ID0gZGV2aWNlSGVpZ2h0O1xuICAgICAgICBjYW52YXMud2lkdGggPSBkZXZpY2VXaWR0aDtcbiAgICAgICAgY2hhcnQuY3R4LnNldFRyYW5zZm9ybShwaXhlbFJhdGlvLCAwLCAwLCBwaXhlbFJhdGlvLCAwLCAwKTtcbiAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIHJldHVybiBmYWxzZTtcbn1cbi8qKlxuICogRGV0ZWN0cyBzdXBwb3J0IGZvciBvcHRpb25zIG9iamVjdCBhcmd1bWVudCBpbiBhZGRFdmVudExpc3RlbmVyLlxuICogaHR0cHM6Ly9kZXZlbG9wZXIubW96aWxsYS5vcmcvZW4tVVMvZG9jcy9XZWIvQVBJL0V2ZW50VGFyZ2V0L2FkZEV2ZW50TGlzdGVuZXIjU2FmZWx5X2RldGVjdGluZ19vcHRpb25fc3VwcG9ydFxuICogQHByaXZhdGVcbiAqLyBjb25zdCBzdXBwb3J0c0V2ZW50TGlzdGVuZXJPcHRpb25zID0gZnVuY3Rpb24oKSB7XG4gICAgbGV0IHBhc3NpdmVTdXBwb3J0ZWQgPSBmYWxzZTtcbiAgICB0cnkge1xuICAgICAgICBjb25zdCBvcHRpb25zID0ge1xuICAgICAgICAgICAgZ2V0IHBhc3NpdmUgKCkge1xuICAgICAgICAgICAgICAgIHBhc3NpdmVTdXBwb3J0ZWQgPSB0cnVlO1xuICAgICAgICAgICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfTtcbiAgICAgICAgaWYgKF9pc0RvbVN1cHBvcnRlZCgpKSB7XG4gICAgICAgICAgICB3aW5kb3cuYWRkRXZlbnRMaXN0ZW5lcigndGVzdCcsIG51bGwsIG9wdGlvbnMpO1xuICAgICAgICAgICAgd2luZG93LnJlbW92ZUV2ZW50TGlzdGVuZXIoJ3Rlc3QnLCBudWxsLCBvcHRpb25zKTtcbiAgICAgICAgfVxuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAvLyBjb250aW51ZSByZWdhcmRsZXNzIG9mIGVycm9yXG4gICAgfVxuICAgIHJldHVybiBwYXNzaXZlU3VwcG9ydGVkO1xufSgpO1xuLyoqXG4gKiBUaGUgXCJ1c2VkXCIgc2l6ZSBpcyB0aGUgZmluYWwgdmFsdWUgb2YgYSBkaW1lbnNpb24gcHJvcGVydHkgYWZ0ZXIgYWxsIGNhbGN1bGF0aW9ucyBoYXZlXG4gKiBiZWVuIHBlcmZvcm1lZC4gVGhpcyBtZXRob2QgdXNlcyB0aGUgY29tcHV0ZWQgc3R5bGUgb2YgYGVsZW1lbnRgIGJ1dCByZXR1cm5zIHVuZGVmaW5lZFxuICogaWYgdGhlIGNvbXB1dGVkIHN0eWxlIGlzIG5vdCBleHByZXNzZWQgaW4gcGl4ZWxzLiBUaGF0IGNhbiBoYXBwZW4gaW4gc29tZSBjYXNlcyB3aGVyZVxuICogYGVsZW1lbnRgIGhhcyBhIHNpemUgcmVsYXRpdmUgdG8gaXRzIHBhcmVudCBhbmQgdGhpcyBsYXN0IG9uZSBpcyBub3QgeWV0IGRpc3BsYXllZCxcbiAqIGZvciBleGFtcGxlIGJlY2F1c2Ugb2YgYGRpc3BsYXk6IG5vbmVgIG9uIGEgcGFyZW50IG5vZGUuXG4gKiBAc2VlIGh0dHBzOi8vZGV2ZWxvcGVyLm1vemlsbGEub3JnL2VuLVVTL2RvY3MvV2ViL0NTUy91c2VkX3ZhbHVlXG4gKiBAcmV0dXJucyBTaXplIGluIHBpeGVscyBvciB1bmRlZmluZWQgaWYgdW5rbm93bi5cbiAqLyBmdW5jdGlvbiByZWFkVXNlZFNpemUoZWxlbWVudCwgcHJvcGVydHkpIHtcbiAgICBjb25zdCB2YWx1ZSA9IGdldFN0eWxlKGVsZW1lbnQsIHByb3BlcnR5KTtcbiAgICBjb25zdCBtYXRjaGVzID0gdmFsdWUgJiYgdmFsdWUubWF0Y2goL14oXFxkKykoXFwuXFxkKyk/cHgkLyk7XG4gICAgcmV0dXJuIG1hdGNoZXMgPyArbWF0Y2hlc1sxXSA6IHVuZGVmaW5lZDtcbn1cblxuLyoqXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9wb2ludEluTGluZShwMSwgcDIsIHQsIG1vZGUpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4OiBwMS54ICsgdCAqIChwMi54IC0gcDEueCksXG4gICAgICAgIHk6IHAxLnkgKyB0ICogKHAyLnkgLSBwMS55KVxuICAgIH07XG59XG4vKipcbiAqIEBwcml2YXRlXG4gKi8gZnVuY3Rpb24gX3N0ZXBwZWRJbnRlcnBvbGF0aW9uKHAxLCBwMiwgdCwgbW9kZSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHg6IHAxLnggKyB0ICogKHAyLnggLSBwMS54KSxcbiAgICAgICAgeTogbW9kZSA9PT0gJ21pZGRsZScgPyB0IDwgMC41ID8gcDEueSA6IHAyLnkgOiBtb2RlID09PSAnYWZ0ZXInID8gdCA8IDEgPyBwMS55IDogcDIueSA6IHQgPiAwID8gcDIueSA6IHAxLnlcbiAgICB9O1xufVxuLyoqXG4gKiBAcHJpdmF0ZVxuICovIGZ1bmN0aW9uIF9iZXppZXJJbnRlcnBvbGF0aW9uKHAxLCBwMiwgdCwgbW9kZSkge1xuICAgIGNvbnN0IGNwMSA9IHtcbiAgICAgICAgeDogcDEuY3AyeCxcbiAgICAgICAgeTogcDEuY3AyeVxuICAgIH07XG4gICAgY29uc3QgY3AyID0ge1xuICAgICAgICB4OiBwMi5jcDF4LFxuICAgICAgICB5OiBwMi5jcDF5XG4gICAgfTtcbiAgICBjb25zdCBhID0gX3BvaW50SW5MaW5lKHAxLCBjcDEsIHQpO1xuICAgIGNvbnN0IGIgPSBfcG9pbnRJbkxpbmUoY3AxLCBjcDIsIHQpO1xuICAgIGNvbnN0IGMgPSBfcG9pbnRJbkxpbmUoY3AyLCBwMiwgdCk7XG4gICAgY29uc3QgZCA9IF9wb2ludEluTGluZShhLCBiLCB0KTtcbiAgICBjb25zdCBlID0gX3BvaW50SW5MaW5lKGIsIGMsIHQpO1xuICAgIHJldHVybiBfcG9pbnRJbkxpbmUoZCwgZSwgdCk7XG59XG5cbmNvbnN0IGdldFJpZ2h0VG9MZWZ0QWRhcHRlciA9IGZ1bmN0aW9uKHJlY3RYLCB3aWR0aCkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHggKHgpIHtcbiAgICAgICAgICAgIHJldHVybiByZWN0WCArIHJlY3RYICsgd2lkdGggLSB4O1xuICAgICAgICB9LFxuICAgICAgICBzZXRXaWR0aCAodykge1xuICAgICAgICAgICAgd2lkdGggPSB3O1xuICAgICAgICB9LFxuICAgICAgICB0ZXh0QWxpZ24gKGFsaWduKSB7XG4gICAgICAgICAgICBpZiAoYWxpZ24gPT09ICdjZW50ZXInKSB7XG4gICAgICAgICAgICAgICAgcmV0dXJuIGFsaWduO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgcmV0dXJuIGFsaWduID09PSAncmlnaHQnID8gJ2xlZnQnIDogJ3JpZ2h0JztcbiAgICAgICAgfSxcbiAgICAgICAgeFBsdXMgKHgsIHZhbHVlKSB7XG4gICAgICAgICAgICByZXR1cm4geCAtIHZhbHVlO1xuICAgICAgICB9LFxuICAgICAgICBsZWZ0Rm9yTHRyICh4LCBpdGVtV2lkdGgpIHtcbiAgICAgICAgICAgIHJldHVybiB4IC0gaXRlbVdpZHRoO1xuICAgICAgICB9XG4gICAgfTtcbn07XG5jb25zdCBnZXRMZWZ0VG9SaWdodEFkYXB0ZXIgPSBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICB4ICh4KSB7XG4gICAgICAgICAgICByZXR1cm4geDtcbiAgICAgICAgfSxcbiAgICAgICAgc2V0V2lkdGggKHcpIHt9LFxuICAgICAgICB0ZXh0QWxpZ24gKGFsaWduKSB7XG4gICAgICAgICAgICByZXR1cm4gYWxpZ247XG4gICAgICAgIH0sXG4gICAgICAgIHhQbHVzICh4LCB2YWx1ZSkge1xuICAgICAgICAgICAgcmV0dXJuIHggKyB2YWx1ZTtcbiAgICAgICAgfSxcbiAgICAgICAgbGVmdEZvckx0ciAoeCwgX2l0ZW1XaWR0aCkge1xuICAgICAgICAgICAgcmV0dXJuIHg7XG4gICAgICAgIH1cbiAgICB9O1xufTtcbmZ1bmN0aW9uIGdldFJ0bEFkYXB0ZXIocnRsLCByZWN0WCwgd2lkdGgpIHtcbiAgICByZXR1cm4gcnRsID8gZ2V0UmlnaHRUb0xlZnRBZGFwdGVyKHJlY3RYLCB3aWR0aCkgOiBnZXRMZWZ0VG9SaWdodEFkYXB0ZXIoKTtcbn1cbmZ1bmN0aW9uIG92ZXJyaWRlVGV4dERpcmVjdGlvbihjdHgsIGRpcmVjdGlvbikge1xuICAgIGxldCBzdHlsZSwgb3JpZ2luYWw7XG4gICAgaWYgKGRpcmVjdGlvbiA9PT0gJ2x0cicgfHwgZGlyZWN0aW9uID09PSAncnRsJykge1xuICAgICAgICBzdHlsZSA9IGN0eC5jYW52YXMuc3R5bGU7XG4gICAgICAgIG9yaWdpbmFsID0gW1xuICAgICAgICAgICAgc3R5bGUuZ2V0UHJvcGVydHlWYWx1ZSgnZGlyZWN0aW9uJyksXG4gICAgICAgICAgICBzdHlsZS5nZXRQcm9wZXJ0eVByaW9yaXR5KCdkaXJlY3Rpb24nKVxuICAgICAgICBdO1xuICAgICAgICBzdHlsZS5zZXRQcm9wZXJ0eSgnZGlyZWN0aW9uJywgZGlyZWN0aW9uLCAnaW1wb3J0YW50Jyk7XG4gICAgICAgIGN0eC5wcmV2VGV4dERpcmVjdGlvbiA9IG9yaWdpbmFsO1xuICAgIH1cbn1cbmZ1bmN0aW9uIHJlc3RvcmVUZXh0RGlyZWN0aW9uKGN0eCwgb3JpZ2luYWwpIHtcbiAgICBpZiAob3JpZ2luYWwgIT09IHVuZGVmaW5lZCkge1xuICAgICAgICBkZWxldGUgY3R4LnByZXZUZXh0RGlyZWN0aW9uO1xuICAgICAgICBjdHguY2FudmFzLnN0eWxlLnNldFByb3BlcnR5KCdkaXJlY3Rpb24nLCBvcmlnaW5hbFswXSwgb3JpZ2luYWxbMV0pO1xuICAgIH1cbn1cblxuZnVuY3Rpb24gcHJvcGVydHlGbihwcm9wZXJ0eSkge1xuICAgIGlmIChwcm9wZXJ0eSA9PT0gJ2FuZ2xlJykge1xuICAgICAgICByZXR1cm4ge1xuICAgICAgICAgICAgYmV0d2VlbjogX2FuZ2xlQmV0d2VlbixcbiAgICAgICAgICAgIGNvbXBhcmU6IF9hbmdsZURpZmYsXG4gICAgICAgICAgICBub3JtYWxpemU6IF9ub3JtYWxpemVBbmdsZVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4ge1xuICAgICAgICBiZXR3ZWVuOiBfaXNCZXR3ZWVuLFxuICAgICAgICBjb21wYXJlOiAoYSwgYik9PmEgLSBiLFxuICAgICAgICBub3JtYWxpemU6ICh4KT0+eFxuICAgIH07XG59XG5mdW5jdGlvbiBub3JtYWxpemVTZWdtZW50KHsgc3RhcnQgLCBlbmQgLCBjb3VudCAsIGxvb3AgLCBzdHlsZSAgfSkge1xuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0OiBzdGFydCAlIGNvdW50LFxuICAgICAgICBlbmQ6IGVuZCAlIGNvdW50LFxuICAgICAgICBsb29wOiBsb29wICYmIChlbmQgLSBzdGFydCArIDEpICUgY291bnQgPT09IDAsXG4gICAgICAgIHN0eWxlXG4gICAgfTtcbn1cbmZ1bmN0aW9uIGdldFNlZ21lbnQoc2VnbWVudCwgcG9pbnRzLCBib3VuZHMpIHtcbiAgICBjb25zdCB7IHByb3BlcnR5ICwgc3RhcnQ6IHN0YXJ0Qm91bmQgLCBlbmQ6IGVuZEJvdW5kICB9ID0gYm91bmRzO1xuICAgIGNvbnN0IHsgYmV0d2VlbiAsIG5vcm1hbGl6ZSAgfSA9IHByb3BlcnR5Rm4ocHJvcGVydHkpO1xuICAgIGNvbnN0IGNvdW50ID0gcG9pbnRzLmxlbmd0aDtcbiAgICBsZXQgeyBzdGFydCAsIGVuZCAsIGxvb3AgIH0gPSBzZWdtZW50O1xuICAgIGxldCBpLCBpbGVuO1xuICAgIGlmIChsb29wKSB7XG4gICAgICAgIHN0YXJ0ICs9IGNvdW50O1xuICAgICAgICBlbmQgKz0gY291bnQ7XG4gICAgICAgIGZvcihpID0gMCwgaWxlbiA9IGNvdW50OyBpIDwgaWxlbjsgKytpKXtcbiAgICAgICAgICAgIGlmICghYmV0d2Vlbihub3JtYWxpemUocG9pbnRzW3N0YXJ0ICUgY291bnRdW3Byb3BlcnR5XSksIHN0YXJ0Qm91bmQsIGVuZEJvdW5kKSkge1xuICAgICAgICAgICAgICAgIGJyZWFrO1xuICAgICAgICAgICAgfVxuICAgICAgICAgICAgc3RhcnQtLTtcbiAgICAgICAgICAgIGVuZC0tO1xuICAgICAgICB9XG4gICAgICAgIHN0YXJ0ICU9IGNvdW50O1xuICAgICAgICBlbmQgJT0gY291bnQ7XG4gICAgfVxuICAgIGlmIChlbmQgPCBzdGFydCkge1xuICAgICAgICBlbmQgKz0gY291bnQ7XG4gICAgfVxuICAgIHJldHVybiB7XG4gICAgICAgIHN0YXJ0LFxuICAgICAgICBlbmQsXG4gICAgICAgIGxvb3AsXG4gICAgICAgIHN0eWxlOiBzZWdtZW50LnN0eWxlXG4gICAgfTtcbn1cbiBmdW5jdGlvbiBfYm91bmRTZWdtZW50KHNlZ21lbnQsIHBvaW50cywgYm91bmRzKSB7XG4gICAgaWYgKCFib3VuZHMpIHtcbiAgICAgICAgcmV0dXJuIFtcbiAgICAgICAgICAgIHNlZ21lbnRcbiAgICAgICAgXTtcbiAgICB9XG4gICAgY29uc3QgeyBwcm9wZXJ0eSAsIHN0YXJ0OiBzdGFydEJvdW5kICwgZW5kOiBlbmRCb3VuZCAgfSA9IGJvdW5kcztcbiAgICBjb25zdCBjb3VudCA9IHBvaW50cy5sZW5ndGg7XG4gICAgY29uc3QgeyBjb21wYXJlICwgYmV0d2VlbiAsIG5vcm1hbGl6ZSAgfSA9IHByb3BlcnR5Rm4ocHJvcGVydHkpO1xuICAgIGNvbnN0IHsgc3RhcnQgLCBlbmQgLCBsb29wICwgc3R5bGUgIH0gPSBnZXRTZWdtZW50KHNlZ21lbnQsIHBvaW50cywgYm91bmRzKTtcbiAgICBjb25zdCByZXN1bHQgPSBbXTtcbiAgICBsZXQgaW5zaWRlID0gZmFsc2U7XG4gICAgbGV0IHN1YlN0YXJ0ID0gbnVsbDtcbiAgICBsZXQgdmFsdWUsIHBvaW50LCBwcmV2VmFsdWU7XG4gICAgY29uc3Qgc3RhcnRJc0JlZm9yZSA9ICgpPT5iZXR3ZWVuKHN0YXJ0Qm91bmQsIHByZXZWYWx1ZSwgdmFsdWUpICYmIGNvbXBhcmUoc3RhcnRCb3VuZCwgcHJldlZhbHVlKSAhPT0gMDtcbiAgICBjb25zdCBlbmRJc0JlZm9yZSA9ICgpPT5jb21wYXJlKGVuZEJvdW5kLCB2YWx1ZSkgPT09IDAgfHwgYmV0d2VlbihlbmRCb3VuZCwgcHJldlZhbHVlLCB2YWx1ZSk7XG4gICAgY29uc3Qgc2hvdWxkU3RhcnQgPSAoKT0+aW5zaWRlIHx8IHN0YXJ0SXNCZWZvcmUoKTtcbiAgICBjb25zdCBzaG91bGRTdG9wID0gKCk9PiFpbnNpZGUgfHwgZW5kSXNCZWZvcmUoKTtcbiAgICBmb3IobGV0IGkgPSBzdGFydCwgcHJldiA9IHN0YXJ0OyBpIDw9IGVuZDsgKytpKXtcbiAgICAgICAgcG9pbnQgPSBwb2ludHNbaSAlIGNvdW50XTtcbiAgICAgICAgaWYgKHBvaW50LnNraXApIHtcbiAgICAgICAgICAgIGNvbnRpbnVlO1xuICAgICAgICB9XG4gICAgICAgIHZhbHVlID0gbm9ybWFsaXplKHBvaW50W3Byb3BlcnR5XSk7XG4gICAgICAgIGlmICh2YWx1ZSA9PT0gcHJldlZhbHVlKSB7XG4gICAgICAgICAgICBjb250aW51ZTtcbiAgICAgICAgfVxuICAgICAgICBpbnNpZGUgPSBiZXR3ZWVuKHZhbHVlLCBzdGFydEJvdW5kLCBlbmRCb3VuZCk7XG4gICAgICAgIGlmIChzdWJTdGFydCA9PT0gbnVsbCAmJiBzaG91bGRTdGFydCgpKSB7XG4gICAgICAgICAgICBzdWJTdGFydCA9IGNvbXBhcmUodmFsdWUsIHN0YXJ0Qm91bmQpID09PSAwID8gaSA6IHByZXY7XG4gICAgICAgIH1cbiAgICAgICAgaWYgKHN1YlN0YXJ0ICE9PSBudWxsICYmIHNob3VsZFN0b3AoKSkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2gobm9ybWFsaXplU2VnbWVudCh7XG4gICAgICAgICAgICAgICAgc3RhcnQ6IHN1YlN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZDogaSxcbiAgICAgICAgICAgICAgICBsb29wLFxuICAgICAgICAgICAgICAgIGNvdW50LFxuICAgICAgICAgICAgICAgIHN0eWxlXG4gICAgICAgICAgICB9KSk7XG4gICAgICAgICAgICBzdWJTdGFydCA9IG51bGw7XG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IGk7XG4gICAgICAgIHByZXZWYWx1ZSA9IHZhbHVlO1xuICAgIH1cbiAgICBpZiAoc3ViU3RhcnQgIT09IG51bGwpIHtcbiAgICAgICAgcmVzdWx0LnB1c2gobm9ybWFsaXplU2VnbWVudCh7XG4gICAgICAgICAgICBzdGFydDogc3ViU3RhcnQsXG4gICAgICAgICAgICBlbmQsXG4gICAgICAgICAgICBsb29wLFxuICAgICAgICAgICAgY291bnQsXG4gICAgICAgICAgICBzdHlsZVxuICAgICAgICB9KSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4gZnVuY3Rpb24gX2JvdW5kU2VnbWVudHMobGluZSwgYm91bmRzKSB7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgY29uc3Qgc2VnbWVudHMgPSBsaW5lLnNlZ21lbnRzO1xuICAgIGZvcihsZXQgaSA9IDA7IGkgPCBzZWdtZW50cy5sZW5ndGg7IGkrKyl7XG4gICAgICAgIGNvbnN0IHN1YiA9IF9ib3VuZFNlZ21lbnQoc2VnbWVudHNbaV0sIGxpbmUucG9pbnRzLCBib3VuZHMpO1xuICAgICAgICBpZiAoc3ViLmxlbmd0aCkge1xuICAgICAgICAgICAgcmVzdWx0LnB1c2goLi4uc3ViKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuIGZ1bmN0aW9uIGZpbmRTdGFydEFuZEVuZChwb2ludHMsIGNvdW50LCBsb29wLCBzcGFuR2Fwcykge1xuICAgIGxldCBzdGFydCA9IDA7XG4gICAgbGV0IGVuZCA9IGNvdW50IC0gMTtcbiAgICBpZiAobG9vcCAmJiAhc3BhbkdhcHMpIHtcbiAgICAgICAgd2hpbGUoc3RhcnQgPCBjb3VudCAmJiAhcG9pbnRzW3N0YXJ0XS5za2lwKXtcbiAgICAgICAgICAgIHN0YXJ0Kys7XG4gICAgICAgIH1cbiAgICB9XG4gICAgd2hpbGUoc3RhcnQgPCBjb3VudCAmJiBwb2ludHNbc3RhcnRdLnNraXApe1xuICAgICAgICBzdGFydCsrO1xuICAgIH1cbiAgICBzdGFydCAlPSBjb3VudDtcbiAgICBpZiAobG9vcCkge1xuICAgICAgICBlbmQgKz0gc3RhcnQ7XG4gICAgfVxuICAgIHdoaWxlKGVuZCA+IHN0YXJ0ICYmIHBvaW50c1tlbmQgJSBjb3VudF0uc2tpcCl7XG4gICAgICAgIGVuZC0tO1xuICAgIH1cbiAgICBlbmQgJT0gY291bnQ7XG4gICAgcmV0dXJuIHtcbiAgICAgICAgc3RhcnQsXG4gICAgICAgIGVuZFxuICAgIH07XG59XG4gZnVuY3Rpb24gc29saWRTZWdtZW50cyhwb2ludHMsIHN0YXJ0LCBtYXgsIGxvb3ApIHtcbiAgICBjb25zdCBjb3VudCA9IHBvaW50cy5sZW5ndGg7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IGxhc3QgPSBzdGFydDtcbiAgICBsZXQgcHJldiA9IHBvaW50c1tzdGFydF07XG4gICAgbGV0IGVuZDtcbiAgICBmb3IoZW5kID0gc3RhcnQgKyAxOyBlbmQgPD0gbWF4OyArK2VuZCl7XG4gICAgICAgIGNvbnN0IGN1ciA9IHBvaW50c1tlbmQgJSBjb3VudF07XG4gICAgICAgIGlmIChjdXIuc2tpcCB8fCBjdXIuc3RvcCkge1xuICAgICAgICAgICAgaWYgKCFwcmV2LnNraXApIHtcbiAgICAgICAgICAgICAgICBsb29wID0gZmFsc2U7XG4gICAgICAgICAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgICAgICAgICBzdGFydDogc3RhcnQgJSBjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgZW5kOiAoZW5kIC0gMSkgJSBjb3VudCxcbiAgICAgICAgICAgICAgICAgICAgbG9vcFxuICAgICAgICAgICAgICAgIH0pO1xuICAgICAgICAgICAgICAgIHN0YXJ0ID0gbGFzdCA9IGN1ci5zdG9wID8gZW5kIDogbnVsbDtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICAgIGxhc3QgPSBlbmQ7XG4gICAgICAgICAgICBpZiAocHJldi5za2lwKSB7XG4gICAgICAgICAgICAgICAgc3RhcnQgPSBlbmQ7XG4gICAgICAgICAgICB9XG4gICAgICAgIH1cbiAgICAgICAgcHJldiA9IGN1cjtcbiAgICB9XG4gICAgaWYgKGxhc3QgIT09IG51bGwpIHtcbiAgICAgICAgcmVzdWx0LnB1c2goe1xuICAgICAgICAgICAgc3RhcnQ6IHN0YXJ0ICUgY291bnQsXG4gICAgICAgICAgICBlbmQ6IGxhc3QgJSBjb3VudCxcbiAgICAgICAgICAgIGxvb3BcbiAgICAgICAgfSk7XG4gICAgfVxuICAgIHJldHVybiByZXN1bHQ7XG59XG4gZnVuY3Rpb24gX2NvbXB1dGVTZWdtZW50cyhsaW5lLCBzZWdtZW50T3B0aW9ucykge1xuICAgIGNvbnN0IHBvaW50cyA9IGxpbmUucG9pbnRzO1xuICAgIGNvbnN0IHNwYW5HYXBzID0gbGluZS5vcHRpb25zLnNwYW5HYXBzO1xuICAgIGNvbnN0IGNvdW50ID0gcG9pbnRzLmxlbmd0aDtcbiAgICBpZiAoIWNvdW50KSB7XG4gICAgICAgIHJldHVybiBbXTtcbiAgICB9XG4gICAgY29uc3QgbG9vcCA9ICEhbGluZS5fbG9vcDtcbiAgICBjb25zdCB7IHN0YXJ0ICwgZW5kICB9ID0gZmluZFN0YXJ0QW5kRW5kKHBvaW50cywgY291bnQsIGxvb3AsIHNwYW5HYXBzKTtcbiAgICBpZiAoc3BhbkdhcHMgPT09IHRydWUpIHtcbiAgICAgICAgcmV0dXJuIHNwbGl0QnlTdHlsZXMobGluZSwgW1xuICAgICAgICAgICAge1xuICAgICAgICAgICAgICAgIHN0YXJ0LFxuICAgICAgICAgICAgICAgIGVuZCxcbiAgICAgICAgICAgICAgICBsb29wXG4gICAgICAgICAgICB9XG4gICAgICAgIF0sIHBvaW50cywgc2VnbWVudE9wdGlvbnMpO1xuICAgIH1cbiAgICBjb25zdCBtYXggPSBlbmQgPCBzdGFydCA/IGVuZCArIGNvdW50IDogZW5kO1xuICAgIGNvbnN0IGNvbXBsZXRlTG9vcCA9ICEhbGluZS5fZnVsbExvb3AgJiYgc3RhcnQgPT09IDAgJiYgZW5kID09PSBjb3VudCAtIDE7XG4gICAgcmV0dXJuIHNwbGl0QnlTdHlsZXMobGluZSwgc29saWRTZWdtZW50cyhwb2ludHMsIHN0YXJ0LCBtYXgsIGNvbXBsZXRlTG9vcCksIHBvaW50cywgc2VnbWVudE9wdGlvbnMpO1xufVxuIGZ1bmN0aW9uIHNwbGl0QnlTdHlsZXMobGluZSwgc2VnbWVudHMsIHBvaW50cywgc2VnbWVudE9wdGlvbnMpIHtcbiAgICBpZiAoIXNlZ21lbnRPcHRpb25zIHx8ICFzZWdtZW50T3B0aW9ucy5zZXRDb250ZXh0IHx8ICFwb2ludHMpIHtcbiAgICAgICAgcmV0dXJuIHNlZ21lbnRzO1xuICAgIH1cbiAgICByZXR1cm4gZG9TcGxpdEJ5U3R5bGVzKGxpbmUsIHNlZ21lbnRzLCBwb2ludHMsIHNlZ21lbnRPcHRpb25zKTtcbn1cbiBmdW5jdGlvbiBkb1NwbGl0QnlTdHlsZXMobGluZSwgc2VnbWVudHMsIHBvaW50cywgc2VnbWVudE9wdGlvbnMpIHtcbiAgICBjb25zdCBjaGFydENvbnRleHQgPSBsaW5lLl9jaGFydC5nZXRDb250ZXh0KCk7XG4gICAgY29uc3QgYmFzZVN0eWxlID0gcmVhZFN0eWxlKGxpbmUub3B0aW9ucyk7XG4gICAgY29uc3QgeyBfZGF0YXNldEluZGV4OiBkYXRhc2V0SW5kZXggLCBvcHRpb25zOiB7IHNwYW5HYXBzICB9ICB9ID0gbGluZTtcbiAgICBjb25zdCBjb3VudCA9IHBvaW50cy5sZW5ndGg7XG4gICAgY29uc3QgcmVzdWx0ID0gW107XG4gICAgbGV0IHByZXZTdHlsZSA9IGJhc2VTdHlsZTtcbiAgICBsZXQgc3RhcnQgPSBzZWdtZW50c1swXS5zdGFydDtcbiAgICBsZXQgaSA9IHN0YXJ0O1xuICAgIGZ1bmN0aW9uIGFkZFN0eWxlKHMsIGUsIGwsIHN0KSB7XG4gICAgICAgIGNvbnN0IGRpciA9IHNwYW5HYXBzID8gLTEgOiAxO1xuICAgICAgICBpZiAocyA9PT0gZSkge1xuICAgICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG4gICAgICAgIHMgKz0gY291bnQ7XG4gICAgICAgIHdoaWxlKHBvaW50c1tzICUgY291bnRdLnNraXApe1xuICAgICAgICAgICAgcyAtPSBkaXI7XG4gICAgICAgIH1cbiAgICAgICAgd2hpbGUocG9pbnRzW2UgJSBjb3VudF0uc2tpcCl7XG4gICAgICAgICAgICBlICs9IGRpcjtcbiAgICAgICAgfVxuICAgICAgICBpZiAocyAlIGNvdW50ICE9PSBlICUgY291bnQpIHtcbiAgICAgICAgICAgIHJlc3VsdC5wdXNoKHtcbiAgICAgICAgICAgICAgICBzdGFydDogcyAlIGNvdW50LFxuICAgICAgICAgICAgICAgIGVuZDogZSAlIGNvdW50LFxuICAgICAgICAgICAgICAgIGxvb3A6IGwsXG4gICAgICAgICAgICAgICAgc3R5bGU6IHN0XG4gICAgICAgICAgICB9KTtcbiAgICAgICAgICAgIHByZXZTdHlsZSA9IHN0O1xuICAgICAgICAgICAgc3RhcnQgPSBlICUgY291bnQ7XG4gICAgICAgIH1cbiAgICB9XG4gICAgZm9yIChjb25zdCBzZWdtZW50IG9mIHNlZ21lbnRzKXtcbiAgICAgICAgc3RhcnQgPSBzcGFuR2FwcyA/IHN0YXJ0IDogc2VnbWVudC5zdGFydDtcbiAgICAgICAgbGV0IHByZXYgPSBwb2ludHNbc3RhcnQgJSBjb3VudF07XG4gICAgICAgIGxldCBzdHlsZTtcbiAgICAgICAgZm9yKGkgPSBzdGFydCArIDE7IGkgPD0gc2VnbWVudC5lbmQ7IGkrKyl7XG4gICAgICAgICAgICBjb25zdCBwdCA9IHBvaW50c1tpICUgY291bnRdO1xuICAgICAgICAgICAgc3R5bGUgPSByZWFkU3R5bGUoc2VnbWVudE9wdGlvbnMuc2V0Q29udGV4dChjcmVhdGVDb250ZXh0KGNoYXJ0Q29udGV4dCwge1xuICAgICAgICAgICAgICAgIHR5cGU6ICdzZWdtZW50JyxcbiAgICAgICAgICAgICAgICBwMDogcHJldixcbiAgICAgICAgICAgICAgICBwMTogcHQsXG4gICAgICAgICAgICAgICAgcDBEYXRhSW5kZXg6IChpIC0gMSkgJSBjb3VudCxcbiAgICAgICAgICAgICAgICBwMURhdGFJbmRleDogaSAlIGNvdW50LFxuICAgICAgICAgICAgICAgIGRhdGFzZXRJbmRleFxuICAgICAgICAgICAgfSkpKTtcbiAgICAgICAgICAgIGlmIChzdHlsZUNoYW5nZWQoc3R5bGUsIHByZXZTdHlsZSkpIHtcbiAgICAgICAgICAgICAgICBhZGRTdHlsZShzdGFydCwgaSAtIDEsIHNlZ21lbnQubG9vcCwgcHJldlN0eWxlKTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgICAgIHByZXYgPSBwdDtcbiAgICAgICAgICAgIHByZXZTdHlsZSA9IHN0eWxlO1xuICAgICAgICB9XG4gICAgICAgIGlmIChzdGFydCA8IGkgLSAxKSB7XG4gICAgICAgICAgICBhZGRTdHlsZShzdGFydCwgaSAtIDEsIHNlZ21lbnQubG9vcCwgcHJldlN0eWxlKTtcbiAgICAgICAgfVxuICAgIH1cbiAgICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gcmVhZFN0eWxlKG9wdGlvbnMpIHtcbiAgICByZXR1cm4ge1xuICAgICAgICBiYWNrZ3JvdW5kQ29sb3I6IG9wdGlvbnMuYmFja2dyb3VuZENvbG9yLFxuICAgICAgICBib3JkZXJDYXBTdHlsZTogb3B0aW9ucy5ib3JkZXJDYXBTdHlsZSxcbiAgICAgICAgYm9yZGVyRGFzaDogb3B0aW9ucy5ib3JkZXJEYXNoLFxuICAgICAgICBib3JkZXJEYXNoT2Zmc2V0OiBvcHRpb25zLmJvcmRlckRhc2hPZmZzZXQsXG4gICAgICAgIGJvcmRlckpvaW5TdHlsZTogb3B0aW9ucy5ib3JkZXJKb2luU3R5bGUsXG4gICAgICAgIGJvcmRlcldpZHRoOiBvcHRpb25zLmJvcmRlcldpZHRoLFxuICAgICAgICBib3JkZXJDb2xvcjogb3B0aW9ucy5ib3JkZXJDb2xvclxuICAgIH07XG59XG5mdW5jdGlvbiBzdHlsZUNoYW5nZWQoc3R5bGUsIHByZXZTdHlsZSkge1xuICAgIGlmICghcHJldlN0eWxlKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgY29uc3QgY2FjaGUgPSBbXTtcbiAgICBjb25zdCByZXBsYWNlciA9IGZ1bmN0aW9uKGtleSwgdmFsdWUpIHtcbiAgICAgICAgaWYgKCFpc1BhdHRlcm5PckdyYWRpZW50KHZhbHVlKSkge1xuICAgICAgICAgICAgcmV0dXJuIHZhbHVlO1xuICAgICAgICB9XG4gICAgICAgIGlmICghY2FjaGUuaW5jbHVkZXModmFsdWUpKSB7XG4gICAgICAgICAgICBjYWNoZS5wdXNoKHZhbHVlKTtcbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gY2FjaGUuaW5kZXhPZih2YWx1ZSk7XG4gICAgfTtcbiAgICByZXR1cm4gSlNPTi5zdHJpbmdpZnkoc3R5bGUsIHJlcGxhY2VyKSAhPT0gSlNPTi5zdHJpbmdpZnkocHJldlN0eWxlLCByZXBsYWNlcik7XG59XG5cbmZ1bmN0aW9uIGdldFNpemVGb3JBcmVhKHNjYWxlLCBjaGFydEFyZWEsIGZpZWxkKSB7XG4gICAgcmV0dXJuIHNjYWxlLm9wdGlvbnMuY2xpcCA/IHNjYWxlW2ZpZWxkXSA6IGNoYXJ0QXJlYVtmaWVsZF07XG59XG5mdW5jdGlvbiBnZXREYXRhc2V0QXJlYShtZXRhLCBjaGFydEFyZWEpIHtcbiAgICBjb25zdCB7IHhTY2FsZSAsIHlTY2FsZSAgfSA9IG1ldGE7XG4gICAgaWYgKHhTY2FsZSAmJiB5U2NhbGUpIHtcbiAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIGxlZnQ6IGdldFNpemVGb3JBcmVhKHhTY2FsZSwgY2hhcnRBcmVhLCAnbGVmdCcpLFxuICAgICAgICAgICAgcmlnaHQ6IGdldFNpemVGb3JBcmVhKHhTY2FsZSwgY2hhcnRBcmVhLCAncmlnaHQnKSxcbiAgICAgICAgICAgIHRvcDogZ2V0U2l6ZUZvckFyZWEoeVNjYWxlLCBjaGFydEFyZWEsICd0b3AnKSxcbiAgICAgICAgICAgIGJvdHRvbTogZ2V0U2l6ZUZvckFyZWEoeVNjYWxlLCBjaGFydEFyZWEsICdib3R0b20nKVxuICAgICAgICB9O1xuICAgIH1cbiAgICByZXR1cm4gY2hhcnRBcmVhO1xufVxuZnVuY3Rpb24gZ2V0RGF0YXNldENsaXBBcmVhKGNoYXJ0LCBtZXRhKSB7XG4gICAgY29uc3QgY2xpcCA9IG1ldGEuX2NsaXA7XG4gICAgaWYgKGNsaXAuZGlzYWJsZWQpIHtcbiAgICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgICBjb25zdCBhcmVhID0gZ2V0RGF0YXNldEFyZWEobWV0YSwgY2hhcnQuY2hhcnRBcmVhKTtcbiAgICByZXR1cm4ge1xuICAgICAgICBsZWZ0OiBjbGlwLmxlZnQgPT09IGZhbHNlID8gMCA6IGFyZWEubGVmdCAtIChjbGlwLmxlZnQgPT09IHRydWUgPyAwIDogY2xpcC5sZWZ0KSxcbiAgICAgICAgcmlnaHQ6IGNsaXAucmlnaHQgPT09IGZhbHNlID8gY2hhcnQud2lkdGggOiBhcmVhLnJpZ2h0ICsgKGNsaXAucmlnaHQgPT09IHRydWUgPyAwIDogY2xpcC5yaWdodCksXG4gICAgICAgIHRvcDogY2xpcC50b3AgPT09IGZhbHNlID8gMCA6IGFyZWEudG9wIC0gKGNsaXAudG9wID09PSB0cnVlID8gMCA6IGNsaXAudG9wKSxcbiAgICAgICAgYm90dG9tOiBjbGlwLmJvdHRvbSA9PT0gZmFsc2UgPyBjaGFydC5oZWlnaHQgOiBhcmVhLmJvdHRvbSArIChjbGlwLmJvdHRvbSA9PT0gdHJ1ZSA/IDAgOiBjbGlwLmJvdHRvbSlcbiAgICB9O1xufVxuXG5leHBvcnQgeyB1bmNsaXBBcmVhIGFzICQsIF9ybG9va3VwQnlLZXkgYXMgQSwgX2xvb2t1cEJ5S2V5IGFzIEIsIF9pc1BvaW50SW5BcmVhIGFzIEMsIGdldEFuZ2xlRnJvbVBvaW50IGFzIEQsIHRvUGFkZGluZyBhcyBFLCBlYWNoIGFzIEYsIGdldE1heGltdW1TaXplIGFzIEcsIEhBTEZfUEkgYXMgSCwgX2dldFBhcmVudE5vZGUgYXMgSSwgcmVhZFVzZWRTaXplIGFzIEosIHN1cHBvcnRzRXZlbnRMaXN0ZW5lck9wdGlvbnMgYXMgSywgdGhyb3R0bGVkIGFzIEwsIF9pc0RvbVN1cHBvcnRlZCBhcyBNLCBfZmFjdG9yaXplIGFzIE4sIGZpbml0ZU9yRGVmYXVsdCBhcyBPLCBQSSBhcyBQLCBjYWxsYmFjayBhcyBRLCBfYWRkR3JhY2UgYXMgUiwgX2xpbWl0VmFsdWUgYXMgUywgVEFVIGFzIFQsIHRvRGVncmVlcyBhcyBVLCBfbWVhc3VyZVRleHQgYXMgViwgX2ludDE2UmFuZ2UgYXMgVywgX2FsaWduUGl4ZWwgYXMgWCwgY2xpcEFyZWEgYXMgWSwgcmVuZGVyVGV4dCBhcyBaLCBfYXJyYXlVbmlxdWUgYXMgXywgcmVzb2x2ZSBhcyBhLCBnZXRTdHlsZSBhcyBhJCwgdG9Gb250IGFzIGEwLCBfdG9MZWZ0UmlnaHRDZW50ZXIgYXMgYTEsIF9hbGlnblN0YXJ0RW5kIGFzIGEyLCBvdmVycmlkZXMgYXMgYTMsIG1lcmdlIGFzIGE0LCBfY2FwaXRhbGl6ZSBhcyBhNSwgZGVzY3JpcHRvcnMgYXMgYTYsIGlzRnVuY3Rpb24gYXMgYTcsIF9hdHRhY2hDb250ZXh0IGFzIGE4LCBfY3JlYXRlUmVzb2x2ZXIgYXMgYTksIGdldFJ0bEFkYXB0ZXIgYXMgYUEsIG92ZXJyaWRlVGV4dERpcmVjdGlvbiBhcyBhQiwgX3RleHRYIGFzIGFDLCByZXN0b3JlVGV4dERpcmVjdGlvbiBhcyBhRCwgZHJhd1BvaW50TGVnZW5kIGFzIGFFLCBkaXN0YW5jZUJldHdlZW5Qb2ludHMgYXMgYUYsIG5vb3AgYXMgYUcsIF9zZXRNaW5BbmRNYXhCeUtleSBhcyBhSCwgbmljZU51bSBhcyBhSSwgYWxtb3N0V2hvbGUgYXMgYUosIGFsbW9zdEVxdWFscyBhcyBhSywgX2RlY2ltYWxQbGFjZXMgYXMgYUwsIFRpY2tzIGFzIGFNLCBsb2cxMCBhcyBhTiwgX2xvbmdlc3RUZXh0IGFzIGFPLCBfZmlsdGVyQmV0d2VlbiBhcyBhUCwgX2xvb2t1cCBhcyBhUSwgaXNQYXR0ZXJuT3JHcmFkaWVudCBhcyBhUiwgZ2V0SG92ZXJDb2xvciBhcyBhUywgY2xvbmUgYXMgYVQsIF9tZXJnZXIgYXMgYVUsIF9tZXJnZXJJZiBhcyBhViwgX2RlcHJlY2F0ZWQgYXMgYVcsIF9zcGxpdEtleSBhcyBhWCwgdG9Gb250U3RyaW5nIGFzIGFZLCBzcGxpbmVDdXJ2ZSBhcyBhWiwgc3BsaW5lQ3VydmVNb25vdG9uZSBhcyBhXywgX2Rlc2NyaXB0b3JzIGFzIGFhLCBtZXJnZUlmIGFzIGFiLCB1aWQgYXMgYWMsIGRlYm91bmNlIGFzIGFkLCByZXRpbmFTY2FsZSBhcyBhZSwgY2xlYXJDYW52YXMgYXMgYWYsIHNldHNFcXVhbCBhcyBhZywgZ2V0RGF0YXNldENsaXBBcmVhIGFzIGFoLCBfZWxlbWVudHNFcXVhbCBhcyBhaSwgX2lzQ2xpY2tFdmVudCBhcyBhaiwgX2lzQmV0d2VlbiBhcyBhaywgX25vcm1hbGl6ZUFuZ2xlIGFzIGFsLCBfcmVhZFZhbHVlVG9Qcm9wcyBhcyBhbSwgX3VwZGF0ZUJlemllckNvbnRyb2xQb2ludHMgYXMgYW4sIF9jb21wdXRlU2VnbWVudHMgYXMgYW8sIF9ib3VuZFNlZ21lbnRzIGFzIGFwLCBfc3RlcHBlZEludGVycG9sYXRpb24gYXMgYXEsIF9iZXppZXJJbnRlcnBvbGF0aW9uIGFzIGFyLCBfcG9pbnRJbkxpbmUgYXMgYXMsIF9zdGVwcGVkTGluZVRvIGFzIGF0LCBfYmV6aWVyQ3VydmVUbyBhcyBhdSwgZHJhd1BvaW50IGFzIGF2LCBhZGRSb3VuZGVkUmVjdFBhdGggYXMgYXcsIHRvVFJCTCBhcyBheCwgdG9UUkJMQ29ybmVycyBhcyBheSwgX2JvdW5kU2VnbWVudCBhcyBheiwgaXNBcnJheSBhcyBiLCBmb250U3RyaW5nIGFzIGIwLCB0b0xpbmVIZWlnaHQgYXMgYjEsIFBJVEFVIGFzIGIyLCBJTkZJTklUWSBhcyBiMywgUkFEX1BFUl9ERUcgYXMgYjQsIFFVQVJURVJfUEkgYXMgYjUsIFRXT19USElSRFNfUEkgYXMgYjYsIF9hbmdsZURpZmYgYXMgYjcsIGNvbG9yIGFzIGMsIGRlZmF1bHRzIGFzIGQsIGVmZmVjdHMgYXMgZSwgcmVzb2x2ZU9iamVjdEtleSBhcyBmLCBpc051bWJlckZpbml0ZSBhcyBnLCBkZWZpbmVkIGFzIGgsIGlzT2JqZWN0IGFzIGksIGNyZWF0ZUNvbnRleHQgYXMgaiwgaXNOdWxsT3JVbmRlZiBhcyBrLCBsaXN0ZW5BcnJheUV2ZW50cyBhcyBsLCB0b1BlcmNlbnRhZ2UgYXMgbSwgdG9EaW1lbnNpb24gYXMgbiwgZm9ybWF0TnVtYmVyIGFzIG8sIF9hbmdsZUJldHdlZW4gYXMgcCwgX2dldFN0YXJ0QW5kQ291bnRPZlZpc2libGVQb2ludHMgYXMgcSwgcmVxdWVzdEFuaW1GcmFtZSBhcyByLCBzaWduIGFzIHMsIHRvUmFkaWFucyBhcyB0LCB1bmxpc3RlbkFycmF5RXZlbnRzIGFzIHUsIHZhbHVlT3JEZWZhdWx0IGFzIHYsIF9zY2FsZVJhbmdlc0NoYW5nZWQgYXMgdywgaXNOdW1iZXIgYXMgeCwgX3BhcnNlT2JqZWN0RGF0YVJhZGlhbFNjYWxlIGFzIHksIGdldFJlbGF0aXZlUG9zaXRpb24gYXMgeiB9O1xuLy8jIHNvdXJjZU1hcHBpbmdVUkw9aGVscGVycy5kYXRhc2V0LmpzLm1hcFxuIl0sIm5hbWVzIjpbInNldCIsImNhbGxiYWNrIiwiZGVmYXVsdHMiLCJfZGVzY3JpcHRvcnMiLCJyZXNvbHZlIiwiZGVzY3JpcHRvcnMiXSwibWFwcGluZ3MiOiI7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFZSSxTQUFTLE9BQU87QUFDVDtBQUdGLE1BQUMsTUFBTyx1QkFBSTtBQUNqQixNQUFJLEtBQUs7QUFDVCxTQUFPLE1BQUk7QUFDZixHQUFDO0FBS0csU0FBUyxjQUFjLE9BQU87QUFDOUIsU0FBTyxVQUFVLFFBQVEsVUFBVTtBQUN2QztBQUtJLFNBQVMsUUFBUSxPQUFPO0FBQ3hCLE1BQUksTUFBTSxXQUFXLE1BQU0sUUFBUSxLQUFLLEdBQUc7QUFDdkMsV0FBTztBQUFBLEVBQ1g7QUFDQSxRQUFNLE9BQU8sT0FBTyxVQUFVLFNB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
