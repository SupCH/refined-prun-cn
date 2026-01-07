import Hammer from './hammer.js';
import {
  F as each,
  Q as callback,
  z as getRelativePosition,
  v as valueOrDefault,
  aK as almostEquals,
  s as sign,
  C as _isPointInArea,
} from './helpers.dataset.js';
/*!
 * chartjs-plugin-zoom v2.2.0
 * https://www.chartjs.org/chartjs-plugin-zoom/2.2.0/
 * (c) 2016-2024 chartjs-plugin-zoom Contributors
 * Released under the MIT License
 */
const getModifierKey = opts => opts && opts.enabled && opts.modifierKey;
const keyPressed = (key, event) => key && event[key + 'Key'];
const keyNotPressed = (key, event) => key && !event[key + 'Key'];
function directionEnabled(mode, dir, chart) {
  if (mode === void 0) {
    return true;
  } else if (typeof mode === 'string') {
    return mode.indexOf(dir) !== -1;
  } else if (typeof mode === 'function') {
    return mode({ chart }).indexOf(dir) !== -1;
  }
  return false;
}
function directionsEnabled(mode, chart) {
  if (typeof mode === 'function') {
    mode = mode({ chart });
  }
  if (typeof mode === 'string') {
    return { x: mode.indexOf('x') !== -1, y: mode.indexOf('y') !== -1 };
  }
  return { x: false, y: false };
}
function debounce(fn, delay) {
  let timeout;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(fn, delay);
    return delay;
  };
}
function getScaleUnderPoint({ x, y }, chart) {
  const scales = chart.scales;
  const scaleIds = Object.keys(scales);
  for (let i = 0; i < scaleIds.length; i++) {
    const scale = scales[scaleIds[i]];
    if (y >= scale.top && y <= scale.bottom && x >= scale.left && x <= scale.right) {
      return scale;
    }
  }
  return null;
}
function getEnabledScalesByPoint(options, point, chart) {
  const { mode = 'xy', scaleMode, overScaleMode } = options || {};
  const scale = getScaleUnderPoint(point, chart);
  const enabled = directionsEnabled(mode, chart);
  const scaleEnabled = directionsEnabled(scaleMode, chart);
  if (overScaleMode) {
    const overScaleEnabled = directionsEnabled(overScaleMode, chart);
    for (const axis of ['x', 'y']) {
      if (overScaleEnabled[axis]) {
        scaleEnabled[axis] = enabled[axis];
        enabled[axis] = false;
      }
    }
  }
  if (scale && scaleEnabled[scale.axis]) {
    return [scale];
  }
  const enabledScales = [];
  each(chart.scales, function (scaleItem) {
    if (enabled[scaleItem.axis]) {
      enabledScales.push(scaleItem);
    }
  });
  return enabledScales;
}
const chartStates = /* @__PURE__ */ new WeakMap();
function getState(chart) {
  let state = chartStates.get(chart);
  if (!state) {
    state = {
      originalScaleLimits: {},
      updatedScaleLimits: {},
      handlers: {},
      panDelta: {},
      dragging: false,
      panning: false,
    };
    chartStates.set(chart, state);
  }
  return state;
}
function removeState(chart) {
  chartStates.delete(chart);
}
function zoomDelta(val, min, range, newRange) {
  const minPercent = Math.max(0, Math.min(1, (val - min) / range || 0));
  const maxPercent = 1 - minPercent;
  return {
    min: newRange * minPercent,
    max: newRange * maxPercent,
  };
}
function getValueAtPoint(scale, point) {
  const pixel = scale.isHorizontal() ? point.x : point.y;
  return scale.getValueForPixel(pixel);
}
function linearZoomDelta(scale, zoom2, center) {
  const range = scale.max - scale.min;
  const newRange = range * (zoom2 - 1);
  const centerValue = getValueAtPoint(scale, center);
  return zoomDelta(centerValue, scale.min, range, newRange);
}
function logarithmicZoomRange(scale, zoom2, center) {
  const centerValue = getValueAtPoint(scale, center);
  if (centerValue === void 0) {
    return { min: scale.min, max: scale.max };
  }
  const logMin = Math.log10(scale.min);
  const logMax = Math.log10(scale.max);
  const logCenter = Math.log10(centerValue);
  const logRange = logMax - logMin;
  const newLogRange = logRange * (zoom2 - 1);
  const delta = zoomDelta(logCenter, logMin, logRange, newLogRange);
  return {
    min: Math.pow(10, logMin + delta.min),
    max: Math.pow(10, logMax - delta.max),
  };
}
function getScaleLimits(scale, limits) {
  return (limits && (limits[scale.id] || limits[scale.axis])) || {};
}
function getLimit(state, scale, scaleLimits, prop, fallback) {
  let limit = scaleLimits[prop];
  if (limit === 'original') {
    const original = state.originalScaleLimits[scale.id][prop];
    limit = valueOrDefault(original.options, original.scale);
  }
  return valueOrDefault(limit, fallback);
}
function linearRange(scale, pixel0, pixel1) {
  const v0 = scale.getValueForPixel(pixel0);
  const v1 = scale.getValueForPixel(pixel1);
  return {
    min: Math.min(v0, v1),
    max: Math.max(v0, v1),
  };
}
function fixRange(range, { min, max, minLimit, maxLimit }, originalLimits) {
  const offset = (range - max + min) / 2;
  min -= offset;
  max += offset;
  const origMin = originalLimits.min.options ?? originalLimits.min.scale;
  const origMax = originalLimits.max.options ?? originalLimits.max.scale;
  const epsilon = range / 1e6;
  if (almostEquals(min, origMin, epsilon)) {
    min = origMin;
  }
  if (almostEquals(max, origMax, epsilon)) {
    max = origMax;
  }
  if (min < minLimit) {
    min = minLimit;
    max = Math.min(minLimit + range, maxLimit);
  } else if (max > maxLimit) {
    max = maxLimit;
    min = Math.max(maxLimit - range, minLimit);
  }
  return { min, max };
}
function updateRange(scale, { min, max }, limits, zoom2 = false) {
  const state = getState(scale.chart);
  const { options: scaleOpts } = scale;
  const scaleLimits = getScaleLimits(scale, limits);
  const { minRange = 0 } = scaleLimits;
  const minLimit = getLimit(state, scale, scaleLimits, 'min', -Infinity);
  const maxLimit = getLimit(state, scale, scaleLimits, 'max', Infinity);
  if (zoom2 === 'pan' && (min < minLimit || max > maxLimit)) {
    return true;
  }
  const scaleRange = scale.max - scale.min;
  const range = zoom2 ? Math.max(max - min, minRange) : scaleRange;
  if (zoom2 && range === minRange && scaleRange <= minRange) {
    return true;
  }
  const newRange = fixRange(
    range,
    { min, max, minLimit, maxLimit },
    state.originalScaleLimits[scale.id],
  );
  scaleOpts.min = newRange.min;
  scaleOpts.max = newRange.max;
  state.updatedScaleLimits[scale.id] = newRange;
  return scale.parse(newRange.min) !== scale.min || scale.parse(newRange.max) !== scale.max;
}
function zoomNumericalScale(scale, zoom2, center, limits) {
  const delta = linearZoomDelta(scale, zoom2, center);
  const newRange = { min: scale.min + delta.min, max: scale.max - delta.max };
  return updateRange(scale, newRange, limits, true);
}
function zoomLogarithmicScale(scale, zoom2, center, limits) {
  const newRange = logarithmicZoomRange(scale, zoom2, center);
  return updateRange(scale, newRange, limits, true);
}
function zoomRectNumericalScale(scale, from, to, limits) {
  updateRange(scale, linearRange(scale, from, to), limits, true);
}
const integerChange = v =>
  v === 0 || isNaN(v) ? 0 : v < 0 ? Math.min(Math.round(v), -1) : Math.max(Math.round(v), 1);
function existCategoryFromMaxZoom(scale) {
  const labels = scale.getLabels();
  const maxIndex = labels.length - 1;
  if (scale.min > 0) {
    scale.min -= 1;
  }
  if (scale.max < maxIndex) {
    scale.max += 1;
  }
}
function zoomCategoryScale(scale, zoom2, center, limits) {
  const delta = linearZoomDelta(scale, zoom2, center);
  if (scale.min === scale.max && zoom2 < 1) {
    existCategoryFromMaxZoom(scale);
  }
  const newRange = {
    min: scale.min + integerChange(delta.min),
    max: scale.max - integerChange(delta.max),
  };
  return updateRange(scale, newRange, limits, true);
}
function scaleLength(scale) {
  return scale.isHorizontal() ? scale.width : scale.height;
}
function panCategoryScale(scale, delta, limits) {
  const labels = scale.getLabels();
  const lastLabelIndex = labels.length - 1;
  let { min, max } = scale;
  const range = Math.max(max - min, 1);
  const stepDelta = Math.round(scaleLength(scale) / Math.max(range, 10));
  const stepSize = Math.round(Math.abs(delta / stepDelta));
  let applied;
  if (delta < -stepDelta) {
    max = Math.min(max + stepSize, lastLabelIndex);
    min = range === 1 ? max : max - range;
    applied = max === lastLabelIndex;
  } else if (delta > stepDelta) {
    min = Math.max(0, min - stepSize);
    max = range === 1 ? min : min + range;
    applied = min === 0;
  }
  return updateRange(scale, { min, max }, limits) || applied;
}
const OFFSETS = {
  second: 500,
  minute: 30 * 1e3,
  hour: 30 * 60 * 1e3,
  day: 12 * 60 * 60 * 1e3,
  week: 3.5 * 24 * 60 * 60 * 1e3,
  month: 15 * 24 * 60 * 60 * 1e3,
  quarter: 60 * 24 * 60 * 60 * 1e3,
  year: 182 * 24 * 60 * 60 * 1e3,
};
function panNumericalScale(scale, delta, limits, pan2 = false) {
  const { min: prevStart, max: prevEnd, options } = scale;
  const round = options.time && options.time.round;
  const offset = OFFSETS[round] || 0;
  const newMin = scale.getValueForPixel(scale.getPixelForValue(prevStart + offset) - delta);
  const newMax = scale.getValueForPixel(scale.getPixelForValue(prevEnd + offset) - delta);
  if (isNaN(newMin) || isNaN(newMax)) {
    return true;
  }
  return updateRange(scale, { min: newMin, max: newMax }, limits, pan2 ? 'pan' : false);
}
function panNonLinearScale(scale, delta, limits) {
  return panNumericalScale(scale, delta, limits, true);
}
const zoomFunctions = {
  category: zoomCategoryScale,
  default: zoomNumericalScale,
  logarithmic: zoomLogarithmicScale,
};
const zoomRectFunctions = {
  default: zoomRectNumericalScale,
};
const panFunctions = {
  category: panCategoryScale,
  default: panNumericalScale,
  logarithmic: panNonLinearScale,
  timeseries: panNonLinearScale,
};
function shouldUpdateScaleLimits(scale, originalScaleLimits, updatedScaleLimits) {
  const {
    id,
    options: { min, max },
  } = scale;
  if (!originalScaleLimits[id] || !updatedScaleLimits[id]) {
    return true;
  }
  const previous = updatedScaleLimits[id];
  return previous.min !== min || previous.max !== max;
}
function removeMissingScales(limits, scales) {
  each(limits, (opt, key) => {
    if (!scales[key]) {
      delete limits[key];
    }
  });
}
function storeOriginalScaleLimits(chart, state) {
  const { scales } = chart;
  const { originalScaleLimits, updatedScaleLimits } = state;
  each(scales, function (scale) {
    if (shouldUpdateScaleLimits(scale, originalScaleLimits, updatedScaleLimits)) {
      originalScaleLimits[scale.id] = {
        min: { scale: scale.min, options: scale.options.min },
        max: { scale: scale.max, options: scale.options.max },
      };
    }
  });
  removeMissingScales(originalScaleLimits, scales);
  removeMissingScales(updatedScaleLimits, scales);
  return originalScaleLimits;
}
function doZoom(scale, amount, center, limits) {
  const fn = zoomFunctions[scale.type] || zoomFunctions.default;
  callback(fn, [scale, amount, center, limits]);
}
function doZoomRect(scale, from, to, limits) {
  const fn = zoomRectFunctions[scale.type] || zoomRectFunctions.default;
  callback(fn, [scale, from, to, limits]);
}
function getCenter(chart) {
  const ca = chart.chartArea;
  return {
    x: (ca.left + ca.right) / 2,
    y: (ca.top + ca.bottom) / 2,
  };
}
function zoom(chart, amount, transition = 'none', trigger = 'api') {
  const {
    x = 1,
    y = 1,
    focalPoint = getCenter(chart),
  } = typeof amount === 'number' ? { x: amount, y: amount } : amount;
  const state = getState(chart);
  const {
    options: { limits, zoom: zoomOptions },
  } = state;
  storeOriginalScaleLimits(chart, state);
  const xEnabled = x !== 1;
  const yEnabled = y !== 1;
  const enabledScales = getEnabledScalesByPoint(zoomOptions, focalPoint, chart);
  each(enabledScales || chart.scales, function (scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoom(scale, x, focalPoint, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoom(scale, y, focalPoint, limits);
    }
  });
  chart.update(transition);
  callback(zoomOptions.onZoom, [{ chart, trigger }]);
}
function zoomRect(chart, p0, p1, transition = 'none', trigger = 'api') {
  const state = getState(chart);
  const {
    options: { limits, zoom: zoomOptions },
  } = state;
  const { mode = 'xy' } = zoomOptions;
  storeOriginalScaleLimits(chart, state);
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  each(chart.scales, function (scale) {
    if (scale.isHorizontal() && xEnabled) {
      doZoomRect(scale, p0.x, p1.x, limits);
    } else if (!scale.isHorizontal() && yEnabled) {
      doZoomRect(scale, p0.y, p1.y, limits);
    }
  });
  chart.update(transition);
  callback(zoomOptions.onZoom, [{ chart, trigger }]);
}
function zoomScale(chart, scaleId, range, transition = 'none', trigger = 'api') {
  const state = getState(chart);
  storeOriginalScaleLimits(chart, state);
  const scale = chart.scales[scaleId];
  updateRange(scale, range, void 0, true);
  chart.update(transition);
  callback(state.options.zoom?.onZoom, [{ chart, trigger }]);
}
function resetZoom(chart, transition = 'default') {
  const state = getState(chart);
  const originalScaleLimits = storeOriginalScaleLimits(chart, state);
  each(chart.scales, function (scale) {
    const scaleOptions = scale.options;
    if (originalScaleLimits[scale.id]) {
      scaleOptions.min = originalScaleLimits[scale.id].min.options;
      scaleOptions.max = originalScaleLimits[scale.id].max.options;
    } else {
      delete scaleOptions.min;
      delete scaleOptions.max;
    }
    delete state.updatedScaleLimits[scale.id];
  });
  chart.update(transition);
  callback(state.options.zoom.onZoomComplete, [{ chart }]);
}
function getOriginalRange(state, scaleId) {
  const original = state.originalScaleLimits[scaleId];
  if (!original) {
    return;
  }
  const { min, max } = original;
  return valueOrDefault(max.options, max.scale) - valueOrDefault(min.options, min.scale);
}
function getZoomLevel(chart) {
  const state = getState(chart);
  let min = 1;
  let max = 1;
  each(chart.scales, function (scale) {
    const origRange = getOriginalRange(state, scale.id);
    if (origRange) {
      const level = Math.round((origRange / (scale.max - scale.min)) * 100) / 100;
      min = Math.min(min, level);
      max = Math.max(max, level);
    }
  });
  return min < 1 ? min : max;
}
function panScale(scale, delta, limits, state) {
  const { panDelta } = state;
  const storedDelta = panDelta[scale.id] || 0;
  if (sign(storedDelta) === sign(delta)) {
    delta += storedDelta;
  }
  const fn = panFunctions[scale.type] || panFunctions.default;
  if (callback(fn, [scale, delta, limits])) {
    panDelta[scale.id] = 0;
  } else {
    panDelta[scale.id] = delta;
  }
}
function pan(chart, delta, enabledScales, transition = 'none') {
  const { x = 0, y = 0 } = typeof delta === 'number' ? { x: delta, y: delta } : delta;
  const state = getState(chart);
  const {
    options: { pan: panOptions, limits },
  } = state;
  const { onPan } = panOptions || {};
  storeOriginalScaleLimits(chart, state);
  const xEnabled = x !== 0;
  const yEnabled = y !== 0;
  each(enabledScales || chart.scales, function (scale) {
    if (scale.isHorizontal() && xEnabled) {
      panScale(scale, x, limits, state);
    } else if (!scale.isHorizontal() && yEnabled) {
      panScale(scale, y, limits, state);
    }
  });
  chart.update(transition);
  callback(onPan, [{ chart }]);
}
function getInitialScaleBounds(chart) {
  const state = getState(chart);
  storeOriginalScaleLimits(chart, state);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    const { min, max } = state.originalScaleLimits[scaleId] || { min: {}, max: {} };
    scaleBounds[scaleId] = { min: min.scale, max: max.scale };
  }
  return scaleBounds;
}
function getZoomedScaleBounds(chart) {
  const state = getState(chart);
  const scaleBounds = {};
  for (const scaleId of Object.keys(chart.scales)) {
    scaleBounds[scaleId] = state.updatedScaleLimits[scaleId];
  }
  return scaleBounds;
}
function isZoomedOrPanned(chart) {
  const scaleBounds = getInitialScaleBounds(chart);
  for (const scaleId of Object.keys(chart.scales)) {
    const { min: originalMin, max: originalMax } = scaleBounds[scaleId];
    if (originalMin !== void 0 && chart.scales[scaleId].min !== originalMin) {
      return true;
    }
    if (originalMax !== void 0 && chart.scales[scaleId].max !== originalMax) {
      return true;
    }
  }
  return false;
}
function isZoomingOrPanning(chart) {
  const state = getState(chart);
  return state.panning || state.dragging;
}
const clamp = (x, from, to) => Math.min(to, Math.max(from, x));
function removeHandler(chart, type) {
  const { handlers } = getState(chart);
  const handler = handlers[type];
  if (handler && handler.target) {
    handler.target.removeEventListener(type, handler);
    delete handlers[type];
  }
}
function addHandler(chart, target, type, handler) {
  const { handlers, options } = getState(chart);
  const oldHandler = handlers[type];
  if (oldHandler && oldHandler.target === target) {
    return;
  }
  removeHandler(chart, type);
  handlers[type] = event => handler(chart, event, options);
  handlers[type].target = target;
  const passive = type === 'wheel' ? false : void 0;
  target.addEventListener(type, handlers[type], { passive });
}
function mouseMove(chart, event) {
  const state = getState(chart);
  if (state.dragStart) {
    state.dragging = true;
    state.dragEnd = event;
    chart.update('none');
  }
}
function keyDown(chart, event) {
  const state = getState(chart);
  if (!state.dragStart || event.key !== 'Escape') {
    return;
  }
  removeHandler(chart, 'keydown');
  state.dragging = false;
  state.dragStart = state.dragEnd = null;
  chart.update('none');
}
function getPointPosition(event, chart) {
  if (event.target !== chart.canvas) {
    const canvasArea = chart.canvas.getBoundingClientRect();
    return {
      x: event.clientX - canvasArea.left,
      y: event.clientY - canvasArea.top,
    };
  }
  return getRelativePosition(event, chart);
}
function zoomStart(chart, event, zoomOptions) {
  const { onZoomStart, onZoomRejected } = zoomOptions;
  if (onZoomStart) {
    const point = getPointPosition(event, chart);
    if (callback(onZoomStart, [{ chart, event, point }]) === false) {
      callback(onZoomRejected, [{ chart, event }]);
      return false;
    }
  }
}
function mouseDown(chart, event) {
  if (chart.legend) {
    const point = getRelativePosition(event, chart);
    if (_isPointInArea(point, chart.legend)) {
      return;
    }
  }
  const state = getState(chart);
  const { pan: panOptions, zoom: zoomOptions = {} } = state.options;
  if (
    event.button !== 0 ||
    keyPressed(getModifierKey(panOptions), event) ||
    keyNotPressed(getModifierKey(zoomOptions.drag), event)
  ) {
    return callback(zoomOptions.onZoomRejected, [{ chart, event }]);
  }
  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  state.dragStart = event;
  addHandler(chart, chart.canvas.ownerDocument, 'mousemove', mouseMove);
  addHandler(chart, window.document, 'keydown', keyDown);
}
function applyAspectRatio({ begin, end }, aspectRatio) {
  let width = end.x - begin.x;
  let height = end.y - begin.y;
  const ratio = Math.abs(width / height);
  if (ratio > aspectRatio) {
    width = Math.sign(width) * Math.abs(height * aspectRatio);
  } else if (ratio < aspectRatio) {
    height = Math.sign(height) * Math.abs(width / aspectRatio);
  }
  end.x = begin.x + width;
  end.y = begin.y + height;
}
function applyMinMaxProps(rect, chartArea, points, { min, max, prop }) {
  rect[min] = clamp(Math.min(points.begin[prop], points.end[prop]), chartArea[min], chartArea[max]);
  rect[max] = clamp(Math.max(points.begin[prop], points.end[prop]), chartArea[min], chartArea[max]);
}
function getRelativePoints(chart, pointEvents, maintainAspectRatio) {
  const points = {
    begin: getPointPosition(pointEvents.dragStart, chart),
    end: getPointPosition(pointEvents.dragEnd, chart),
  };
  if (maintainAspectRatio) {
    const aspectRatio = chart.chartArea.width / chart.chartArea.height;
    applyAspectRatio(points, aspectRatio);
  }
  return points;
}
function computeDragRect(chart, mode, pointEvents, maintainAspectRatio) {
  const xEnabled = directionEnabled(mode, 'x', chart);
  const yEnabled = directionEnabled(mode, 'y', chart);
  const { top, left, right, bottom, width: chartWidth, height: chartHeight } = chart.chartArea;
  const rect = { top, left, right, bottom };
  const points = getRelativePoints(chart, pointEvents, maintainAspectRatio && xEnabled && yEnabled);
  if (xEnabled) {
    applyMinMaxProps(rect, chart.chartArea, points, { min: 'left', max: 'right', prop: 'x' });
  }
  if (yEnabled) {
    applyMinMaxProps(rect, chart.chartArea, points, { min: 'top', max: 'bottom', prop: 'y' });
  }
  const width = rect.right - rect.left;
  const height = rect.bottom - rect.top;
  return {
    ...rect,
    width,
    height,
    zoomX: xEnabled && width ? 1 + (chartWidth - width) / chartWidth : 1,
    zoomY: yEnabled && height ? 1 + (chartHeight - height) / chartHeight : 1,
  };
}
function mouseUp(chart, event) {
  const state = getState(chart);
  if (!state.dragStart) {
    return;
  }
  removeHandler(chart, 'mousemove');
  const {
    mode,
    onZoomComplete,
    drag: { threshold = 0, maintainAspectRatio },
  } = state.options.zoom;
  const rect = computeDragRect(
    chart,
    mode,
    { dragStart: state.dragStart, dragEnd: event },
    maintainAspectRatio,
  );
  const distanceX = directionEnabled(mode, 'x', chart) ? rect.width : 0;
  const distanceY = directionEnabled(mode, 'y', chart) ? rect.height : 0;
  const distance = Math.sqrt(distanceX * distanceX + distanceY * distanceY);
  state.dragStart = state.dragEnd = null;
  if (distance <= threshold) {
    state.dragging = false;
    chart.update('none');
    return;
  }
  zoomRect(chart, { x: rect.left, y: rect.top }, { x: rect.right, y: rect.bottom }, 'zoom', 'drag');
  state.dragging = false;
  state.filterNextClick = true;
  callback(onZoomComplete, [{ chart }]);
}
function wheelPreconditions(chart, event, zoomOptions) {
  if (keyNotPressed(getModifierKey(zoomOptions.wheel), event)) {
    callback(zoomOptions.onZoomRejected, [{ chart, event }]);
    return;
  }
  if (zoomStart(chart, event, zoomOptions) === false) {
    return;
  }
  if (event.cancelable) {
    event.preventDefault();
  }
  if (event.deltaY === void 0) {
    return;
  }
  return true;
}
function wheel(chart, event) {
  const {
    handlers: { onZoomComplete },
    options: { zoom: zoomOptions },
  } = getState(chart);
  if (!wheelPreconditions(chart, event, zoomOptions)) {
    return;
  }
  const rect = event.target.getBoundingClientRect();
  const speed = zoomOptions.wheel.speed;
  const percentage = event.deltaY >= 0 ? 2 - 1 / (1 - speed) : 1 + speed;
  const amount = {
    x: percentage,
    y: percentage,
    focalPoint: {
      x: event.clientX - rect.left,
      y: event.clientY - rect.top,
    },
  };
  zoom(chart, amount, 'zoom', 'wheel');
  callback(onZoomComplete, [{ chart }]);
}
function addDebouncedHandler(chart, name, handler, delay) {
  if (handler) {
    getState(chart).handlers[name] = debounce(() => callback(handler, [{ chart }]), delay);
  }
}
function addListeners(chart, options) {
  const canvas = chart.canvas;
  const { wheel: wheelOptions, drag: dragOptions, onZoomComplete } = options.zoom;
  if (wheelOptions.enabled) {
    addHandler(chart, canvas, 'wheel', wheel);
    addDebouncedHandler(chart, 'onZoomComplete', onZoomComplete, 250);
  } else {
    removeHandler(chart, 'wheel');
  }
  if (dragOptions.enabled) {
    addHandler(chart, canvas, 'mousedown', mouseDown);
    addHandler(chart, canvas.ownerDocument, 'mouseup', mouseUp);
  } else {
    removeHandler(chart, 'mousedown');
    removeHandler(chart, 'mousemove');
    removeHandler(chart, 'mouseup');
    removeHandler(chart, 'keydown');
  }
}
function removeListeners(chart) {
  removeHandler(chart, 'mousedown');
  removeHandler(chart, 'mousemove');
  removeHandler(chart, 'mouseup');
  removeHandler(chart, 'wheel');
  removeHandler(chart, 'click');
  removeHandler(chart, 'keydown');
}
function createEnabler(chart, state) {
  return function (recognizer, event) {
    const { pan: panOptions, zoom: zoomOptions = {} } = state.options;
    if (!panOptions || !panOptions.enabled) {
      return false;
    }
    const srcEvent = event && event.srcEvent;
    if (!srcEvent) {
      return true;
    }
    if (
      !state.panning &&
      event.pointerType === 'mouse' &&
      (keyNotPressed(getModifierKey(panOptions), srcEvent) ||
        keyPressed(getModifierKey(zoomOptions.drag), srcEvent))
    ) {
      callback(panOptions.onPanRejected, [{ chart, event }]);
      return false;
    }
    return true;
  };
}
function pinchAxes(p0, p1) {
  const pinchX = Math.abs(p0.clientX - p1.clientX);
  const pinchY = Math.abs(p0.clientY - p1.clientY);
  const p = pinchX / pinchY;
  let x, y;
  if (p > 0.3 && p < 1.7) {
    x = y = true;
  } else if (pinchX > pinchY) {
    x = true;
  } else {
    y = true;
  }
  return { x, y };
}
function handlePinch(chart, state, e) {
  if (state.scale) {
    const { center, pointers } = e;
    const zoomPercent = (1 / state.scale) * e.scale;
    const rect = e.target.getBoundingClientRect();
    const pinch = pinchAxes(pointers[0], pointers[1]);
    const mode = state.options.zoom.mode;
    const amount = {
      x: pinch.x && directionEnabled(mode, 'x', chart) ? zoomPercent : 1,
      y: pinch.y && directionEnabled(mode, 'y', chart) ? zoomPercent : 1,
      focalPoint: {
        x: center.x - rect.left,
        y: center.y - rect.top,
      },
    };
    zoom(chart, amount, 'zoom', 'pinch');
    state.scale = e.scale;
  }
}
function startPinch(chart, state, event) {
  if (state.options.zoom.pinch.enabled) {
    const point = getRelativePosition(event, chart);
    if (callback(state.options.zoom.onZoomStart, [{ chart, event, point }]) === false) {
      state.scale = null;
      callback(state.options.zoom.onZoomRejected, [{ chart, event }]);
    } else {
      state.scale = 1;
    }
  }
}
function endPinch(chart, state, e) {
  if (state.scale) {
    handlePinch(chart, state, e);
    state.scale = null;
    callback(state.options.zoom.onZoomComplete, [{ chart }]);
  }
}
function handlePan(chart, state, e) {
  const delta = state.delta;
  if (delta) {
    state.panning = true;
    pan(chart, { x: e.deltaX - delta.x, y: e.deltaY - delta.y }, state.panScales);
    state.delta = { x: e.deltaX, y: e.deltaY };
  }
}
function startPan(chart, state, event) {
  const { enabled, onPanStart, onPanRejected } = state.options.pan;
  if (!enabled) {
    return;
  }
  const rect = event.target.getBoundingClientRect();
  const point = {
    x: event.center.x - rect.left,
    y: event.center.y - rect.top,
  };
  if (callback(onPanStart, [{ chart, event, point }]) === false) {
    return callback(onPanRejected, [{ chart, event }]);
  }
  state.panScales = getEnabledScalesByPoint(state.options.pan, point, chart);
  state.delta = { x: 0, y: 0 };
  handlePan(chart, state, event);
}
function endPan(chart, state) {
  state.delta = null;
  if (state.panning) {
    state.panning = false;
    state.filterNextClick = true;
    callback(state.options.pan.onPanComplete, [{ chart }]);
  }
}
const hammers = /* @__PURE__ */ new WeakMap();
function startHammer(chart, options) {
  const state = getState(chart);
  const canvas = chart.canvas;
  const { pan: panOptions, zoom: zoomOptions } = options;
  const mc = new Hammer.Manager(canvas);
  if (zoomOptions && zoomOptions.pinch.enabled) {
    mc.add(new Hammer.Pinch());
    mc.on('pinchstart', e => startPinch(chart, state, e));
    mc.on('pinch', e => handlePinch(chart, state, e));
    mc.on('pinchend', e => endPinch(chart, state, e));
  }
  if (panOptions && panOptions.enabled) {
    mc.add(
      new Hammer.Pan({
        threshold: panOptions.threshold,
        enable: createEnabler(chart, state),
      }),
    );
    mc.on('panstart', e => startPan(chart, state, e));
    mc.on('panmove', e => handlePan(chart, state, e));
    mc.on('panend', () => endPan(chart, state));
  }
  hammers.set(chart, mc);
}
function stopHammer(chart) {
  const mc = hammers.get(chart);
  if (mc) {
    mc.remove('pinchstart');
    mc.remove('pinch');
    mc.remove('pinchend');
    mc.remove('panstart');
    mc.remove('pan');
    mc.remove('panend');
    mc.destroy();
    hammers.delete(chart);
  }
}
function hammerOptionsChanged(oldOptions, newOptions) {
  const { pan: oldPan, zoom: oldZoom } = oldOptions;
  const { pan: newPan, zoom: newZoom } = newOptions;
  if (oldZoom?.zoom?.pinch?.enabled !== newZoom?.zoom?.pinch?.enabled) {
    return true;
  }
  if (oldPan?.enabled !== newPan?.enabled) {
    return true;
  }
  if (oldPan?.threshold !== newPan?.threshold) {
    return true;
  }
  return false;
}
var version = '2.2.0';
function draw(chart, caller, options) {
  const dragOptions = options.zoom.drag;
  const { dragStart, dragEnd } = getState(chart);
  if (dragOptions.drawTime !== caller || !dragEnd) {
    return;
  }
  const { left, top, width, height } = computeDragRect(
    chart,
    options.zoom.mode,
    { dragStart, dragEnd },
    dragOptions.maintainAspectRatio,
  );
  const ctx = chart.ctx;
  ctx.save();
  ctx.beginPath();
  ctx.fillStyle = dragOptions.backgroundColor || 'rgba(225,225,225,0.3)';
  ctx.fillRect(left, top, width, height);
  if (dragOptions.borderWidth > 0) {
    ctx.lineWidth = dragOptions.borderWidth;
    ctx.strokeStyle = dragOptions.borderColor || 'rgba(225,225,225)';
    ctx.strokeRect(left, top, width, height);
  }
  ctx.restore();
}
var plugin = {
  id: 'zoom',
  version,
  defaults: {
    pan: {
      enabled: false,
      mode: 'xy',
      threshold: 10,
      modifierKey: null,
    },
    zoom: {
      wheel: {
        enabled: false,
        speed: 0.1,
        modifierKey: null,
      },
      drag: {
        enabled: false,
        drawTime: 'beforeDatasetsDraw',
        modifierKey: null,
      },
      pinch: {
        enabled: false,
      },
      mode: 'xy',
    },
  },
  start: function (chart, _args, options) {
    const state = getState(chart);
    state.options = options;
    if (Object.prototype.hasOwnProperty.call(options.zoom, 'enabled')) {
      console.warn(
        'The option `zoom.enabled` is no longer supported. Please use `zoom.wheel.enabled`, `zoom.drag.enabled`, or `zoom.pinch.enabled`.',
      );
    }
    if (
      Object.prototype.hasOwnProperty.call(options.zoom, 'overScaleMode') ||
      Object.prototype.hasOwnProperty.call(options.pan, 'overScaleMode')
    ) {
      console.warn(
        'The option `overScaleMode` is deprecated. Please use `scaleMode` instead (and update `mode` as desired).',
      );
    }
    if (Hammer) {
      startHammer(chart, options);
    }
    chart.pan = (delta, panScales, transition) => pan(chart, delta, panScales, transition);
    chart.zoom = (args, transition) => zoom(chart, args, transition);
    chart.zoomRect = (p0, p1, transition) => zoomRect(chart, p0, p1, transition);
    chart.zoomScale = (id, range, transition) => zoomScale(chart, id, range, transition);
    chart.resetZoom = transition => resetZoom(chart, transition);
    chart.getZoomLevel = () => getZoomLevel(chart);
    chart.getInitialScaleBounds = () => getInitialScaleBounds(chart);
    chart.getZoomedScaleBounds = () => getZoomedScaleBounds(chart);
    chart.isZoomedOrPanned = () => isZoomedOrPanned(chart);
    chart.isZoomingOrPanning = () => isZoomingOrPanning(chart);
  },
  beforeEvent(chart, { event }) {
    if (isZoomingOrPanning(chart)) {
      return false;
    }
    if (event.type === 'click' || event.type === 'mouseup') {
      const state = getState(chart);
      if (state.filterNextClick) {
        state.filterNextClick = false;
        return false;
      }
    }
  },
  beforeUpdate: function (chart, args, options) {
    const state = getState(chart);
    const previousOptions = state.options;
    state.options = options;
    if (hammerOptionsChanged(previousOptions, options)) {
      stopHammer(chart);
      startHammer(chart, options);
    }
    addListeners(chart, options);
  },
  beforeDatasetsDraw(chart, _args, options) {
    draw(chart, 'beforeDatasetsDraw', options);
  },
  afterDatasetsDraw(chart, _args, options) {
    draw(chart, 'afterDatasetsDraw', options);
  },
  beforeDraw(chart, _args, options) {
    draw(chart, 'beforeDraw', options);
  },
  afterDraw(chart, _args, options) {
    draw(chart, 'afterDraw', options);
  },
  stop: function (chart) {
    removeListeners(chart);
    if (Hammer) {
      stopHammer(chart);
    }
    removeState(chart);
  },
  panFunctions,
  zoomFunctions,
  zoomRectFunctions,
};
export { plugin as default, pan, resetZoom, zoom, zoomRect, zoomScale };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRqcy1wbHVnaW4tem9vbS5lc20uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9jaGFydGpzLXBsdWdpbi16b29tQDIuMi4wX2NoYXJ0LmpzQDQuNS4wL25vZGVfbW9kdWxlcy9jaGFydGpzLXBsdWdpbi16b29tL2Rpc3QvY2hhcnRqcy1wbHVnaW4tem9vbS5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4qIGNoYXJ0anMtcGx1Z2luLXpvb20gdjIuMi4wXG4qIGh0dHBzOi8vd3d3LmNoYXJ0anMub3JnL2NoYXJ0anMtcGx1Z2luLXpvb20vMi4yLjAvXG4gKiAoYykgMjAxNi0yMDI0IGNoYXJ0anMtcGx1Z2luLXpvb20gQ29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIExpY2Vuc2VcbiAqL1xuaW1wb3J0IEhhbW1lciBmcm9tICdoYW1tZXJqcyc7XG5pbXBvcnQgeyBlYWNoLCB2YWx1ZU9yRGVmYXVsdCwgYWxtb3N0RXF1YWxzLCBjYWxsYmFjaywgc2lnbiwgZ2V0UmVsYXRpdmVQb3NpdGlvbiwgX2lzUG9pbnRJbkFyZWEgfSBmcm9tICdjaGFydC5qcy9oZWxwZXJzJztcblxuY29uc3QgZ2V0TW9kaWZpZXJLZXkgPSBvcHRzID0+IG9wdHMgJiYgb3B0cy5lbmFibGVkICYmIG9wdHMubW9kaWZpZXJLZXk7XG5jb25zdCBrZXlQcmVzc2VkID0gKGtleSwgZXZlbnQpID0+IGtleSAmJiBldmVudFtrZXkgKyAnS2V5J107XG5jb25zdCBrZXlOb3RQcmVzc2VkID0gKGtleSwgZXZlbnQpID0+IGtleSAmJiAhZXZlbnRba2V5ICsgJ0tleSddO1xuZnVuY3Rpb24gZGlyZWN0aW9uRW5hYmxlZChtb2RlLCBkaXIsIGNoYXJ0KSB7XG4gIGlmIChtb2RlID09PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSBlbHNlIGlmICh0eXBlb2YgbW9kZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gbW9kZS5pbmRleE9mKGRpcikgIT09IC0xO1xuICB9IGVsc2UgaWYgKHR5cGVvZiBtb2RlID09PSAnZnVuY3Rpb24nKSB7XG4gICAgcmV0dXJuIG1vZGUoe2NoYXJ0fSkuaW5kZXhPZihkaXIpICE9PSAtMTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiBkaXJlY3Rpb25zRW5hYmxlZChtb2RlLCBjaGFydCkge1xuICBpZiAodHlwZW9mIG1vZGUgPT09ICdmdW5jdGlvbicpIHtcbiAgICBtb2RlID0gbW9kZSh7Y2hhcnR9KTtcbiAgfVxuICBpZiAodHlwZW9mIG1vZGUgPT09ICdzdHJpbmcnKSB7XG4gICAgcmV0dXJuIHt4OiBtb2RlLmluZGV4T2YoJ3gnKSAhPT0gLTEsIHk6IG1vZGUuaW5kZXhPZigneScpICE9PSAtMX07XG4gIH1cbiAgcmV0dXJuIHt4OiBmYWxzZSwgeTogZmFsc2V9O1xufVxuZnVuY3Rpb24gZGVib3VuY2UoZm4sIGRlbGF5KSB7XG4gIGxldCB0aW1lb3V0O1xuICByZXR1cm4gZnVuY3Rpb24oKSB7XG4gICAgY2xlYXJUaW1lb3V0KHRpbWVvdXQpO1xuICAgIHRpbWVvdXQgPSBzZXRUaW1lb3V0KGZuLCBkZWxheSk7XG4gICAgcmV0dXJuIGRlbGF5O1xuICB9O1xufVxuZnVuY3Rpb24gZ2V0U2NhbGVVbmRlclBvaW50KHt4LCB5fSwgY2hhcnQpIHtcbiAgY29uc3Qgc2NhbGVzID0gY2hhcnQuc2NhbGVzO1xuICBjb25zdCBzY2FsZUlkcyA9IE9iamVjdC5rZXlzKHNjYWxlcyk7XG4gIGZvciAobGV0IGkgPSAwOyBpIDwgc2NhbGVJZHMubGVuZ3RoOyBpKyspIHtcbiAgICBjb25zdCBzY2FsZSA9IHNjYWxlc1tzY2FsZUlkc1tpXV07XG4gICAgaWYgKHkgPj0gc2NhbGUudG9wICYmIHkgPD0gc2NhbGUuYm90dG9tICYmIHggPj0gc2NhbGUubGVmdCAmJiB4IDw9IHNjYWxlLnJpZ2h0KSB7XG4gICAgICByZXR1cm4gc2NhbGU7XG4gICAgfVxuICB9XG4gIHJldHVybiBudWxsO1xufVxuZnVuY3Rpb24gZ2V0RW5hYmxlZFNjYWxlc0J5UG9pbnQob3B0aW9ucywgcG9pbnQsIGNoYXJ0KSB7XG4gIGNvbnN0IHttb2RlID0gJ3h5Jywgc2NhbGVNb2RlLCBvdmVyU2NhbGVNb2RlfSA9IG9wdGlvbnMgfHwge307XG4gIGNvbnN0IHNjYWxlID0gZ2V0U2NhbGVVbmRlclBvaW50KHBvaW50LCBjaGFydCk7XG4gIGNvbnN0IGVuYWJsZWQgPSBkaXJlY3Rpb25zRW5hYmxlZChtb2RlLCBjaGFydCk7XG4gIGNvbnN0IHNjYWxlRW5hYmxlZCA9IGRpcmVjdGlvbnNFbmFibGVkKHNjYWxlTW9kZSwgY2hhcnQpO1xuICBpZiAob3ZlclNjYWxlTW9kZSkge1xuICAgIGNvbnN0IG92ZXJTY2FsZUVuYWJsZWQgPSBkaXJlY3Rpb25zRW5hYmxlZChvdmVyU2NhbGVNb2RlLCBjaGFydCk7XG4gICAgZm9yIChjb25zdCBheGlzIG9mIFsneCcsICd5J10pIHtcbiAgICAgIGlmIChvdmVyU2NhbGVFbmFibGVkW2F4aXNdKSB7XG4gICAgICAgIHNjYWxlRW5hYmxlZFtheGlzXSA9IGVuYWJsZWRbYXhpc107XG4gICAgICAgIGVuYWJsZWRbYXhpc10gPSBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbiAgaWYgKHNjYWxlICYmIHNjYWxlRW5hYmxlZFtzY2FsZS5heGlzXSkge1xuICAgIHJldHVybiBbc2NhbGVdO1xuICB9XG4gIGNvbnN0IGVuYWJsZWRTY2FsZXMgPSBbXTtcbiAgZWFjaChjaGFydC5zY2FsZXMsIGZ1bmN0aW9uKHNjYWxlSXRlbSkge1xuICAgIGlmIChlbmFibGVkW3NjYWxlSXRlbS5heGlzXSkge1xuICAgICAgZW5hYmxlZFNjYWxlcy5wdXNoKHNjYWxlSXRlbSk7XG4gICAgfVxuICB9KTtcbiAgcmV0dXJuIGVuYWJsZWRTY2FsZXM7XG59XG5cbmNvbnN0IGNoYXJ0U3RhdGVzID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIGdldFN0YXRlKGNoYXJ0KSB7XG4gIGxldCBzdGF0ZSA9IGNoYXJ0U3RhdGVzLmdldChjaGFydCk7XG4gIGlmICghc3RhdGUpIHtcbiAgICBzdGF0ZSA9IHtcbiAgICAgIG9yaWdpbmFsU2NhbGVMaW1pdHM6IHt9LFxuICAgICAgdXBkYXRlZFNjYWxlTGltaXRzOiB7fSxcbiAgICAgIGhhbmRsZXJzOiB7fSxcbiAgICAgIHBhbkRlbHRhOiB7fSxcbiAgICAgIGRyYWdnaW5nOiBmYWxzZSxcbiAgICAgIHBhbm5pbmc6IGZhbHNlXG4gICAgfTtcbiAgICBjaGFydFN0YXRlcy5zZXQoY2hhcnQsIHN0YXRlKTtcbiAgfVxuICByZXR1cm4gc3RhdGU7XG59XG5mdW5jdGlvbiByZW1vdmVTdGF0ZShjaGFydCkge1xuICBjaGFydFN0YXRlcy5kZWxldGUoY2hhcnQpO1xufVxuXG5mdW5jdGlvbiB6b29tRGVsdGEodmFsLCBtaW4sIHJhbmdlLCBuZXdSYW5nZSkge1xuICBjb25zdCBtaW5QZXJjZW50ID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMSwgKHZhbCAtIG1pbikgLyByYW5nZSB8fCAwKSk7XG4gIGNvbnN0IG1heFBlcmNlbnQgPSAxIC0gbWluUGVyY2VudDtcbiAgcmV0dXJuIHtcbiAgICBtaW46IG5ld1JhbmdlICogbWluUGVyY2VudCxcbiAgICBtYXg6IG5ld1JhbmdlICogbWF4UGVyY2VudFxuICB9O1xufVxuZnVuY3Rpb24gZ2V0VmFsdWVBdFBvaW50KHNjYWxlLCBwb2ludCkge1xuICBjb25zdCBwaXhlbCA9IHNjYWxlLmlzSG9yaXpvbnRhbCgpID8gcG9pbnQueCA6IHBvaW50Lnk7XG4gIHJldHVybiBzY2FsZS5nZXRWYWx1ZUZvclBpeGVsKHBpeGVsKTtcbn1cbmZ1bmN0aW9uIGxpbmVhclpvb21EZWx0YShzY2FsZSwgem9vbSwgY2VudGVyKSB7XG4gIGNvbnN0IHJhbmdlID0gc2NhbGUubWF4IC0gc2NhbGUubWluO1xuICBjb25zdCBuZXdSYW5nZSA9IHJhbmdlICogKHpvb20gLSAxKTtcbiAgY29uc3QgY2VudGVyVmFsdWUgPSBnZXRWYWx1ZUF0UG9pbnQoc2NhbGUsIGNlbnRlcik7XG4gIHJldHVybiB6b29tRGVsdGEoY2VudGVyVmFsdWUsIHNjYWxlLm1pbiwgcmFuZ2UsIG5ld1JhbmdlKTtcbn1cbmZ1bmN0aW9uIGxvZ2FyaXRobWljWm9vbVJhbmdlKHNjYWxlLCB6b29tLCBjZW50ZXIpIHtcbiAgY29uc3QgY2VudGVyVmFsdWUgPSBnZXRWYWx1ZUF0UG9pbnQoc2NhbGUsIGNlbnRlcik7XG4gIGlmIChjZW50ZXJWYWx1ZSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuIHttaW46IHNjYWxlLm1pbiwgbWF4OiBzY2FsZS5tYXh9O1xuICB9XG4gIGNvbnN0IGxvZ01pbiA9IE1hdGgubG9nMTAoc2NhbGUubWluKTtcbiAgY29uc3QgbG9nTWF4ID0gTWF0aC5sb2cxMChzY2FsZS5tYXgpO1xuICBjb25zdCBsb2dDZW50ZXIgPSBNYXRoLmxvZzEwKGNlbnRlclZhbHVlKTtcbiAgY29uc3QgbG9nUmFuZ2UgPSBsb2dNYXggLSBsb2dNaW47XG4gIGNvbnN0IG5ld0xvZ1JhbmdlID0gbG9nUmFuZ2UgKiAoem9vbSAtIDEpO1xuICBjb25zdCBkZWx0YSA9IHpvb21EZWx0YShsb2dDZW50ZXIsIGxvZ01pbiwgbG9nUmFuZ2UsIG5ld0xvZ1JhbmdlKTtcbiAgcmV0dXJuIHtcbiAgICBtaW46IE1hdGgucG93KDEwLCBsb2dNaW4gKyBkZWx0YS5taW4pLFxuICAgIG1heDogTWF0aC5wb3coMTAsIGxvZ01heCAtIGRlbHRhLm1heCksXG4gIH07XG59XG5mdW5jdGlvbiBnZXRTY2FsZUxpbWl0cyhzY2FsZSwgbGltaXRzKSB7XG4gIHJldHVybiBsaW1pdHMgJiYgKGxpbWl0c1tzY2FsZS5pZF0gfHwgbGltaXRzW3NjYWxlLmF4aXNdKSB8fCB7fTtcbn1cbmZ1bmN0aW9uIGdldExpbWl0KHN0YXRlLCBzY2FsZSwgc2NhbGVMaW1pdHMsIHByb3AsIGZhbGxiYWNrKSB7XG4gIGxldCBsaW1pdCA9IHNjYWxlTGltaXRzW3Byb3BdO1xuICBpZiAobGltaXQgPT09ICdvcmlnaW5hbCcpIHtcbiAgICBjb25zdCBvcmlnaW5hbCA9IHN0YXRlLm9yaWdpbmFsU2NhbGVMaW1pdHNbc2NhbGUuaWRdW3Byb3BdO1xuICAgIGxpbWl0ID0gdmFsdWVPckRlZmF1bHQob3JpZ2luYWwub3B0aW9ucywgb3JpZ2luYWwuc2NhbGUpO1xuICB9XG4gIHJldHVybiB2YWx1ZU9yRGVmYXVsdChsaW1pdCwgZmFsbGJhY2spO1xufVxuZnVuY3Rpb24gbGluZWFyUmFuZ2Uoc2NhbGUsIHBpeGVsMCwgcGl4ZWwxKSB7XG4gIGNvbnN0IHYwID0gc2NhbGUuZ2V0VmFsdWVGb3JQaXhlbChwaXhlbDApO1xuICBjb25zdCB2MSA9IHNjYWxlLmdldFZhbHVlRm9yUGl4ZWwocGl4ZWwxKTtcbiAgcmV0dXJuIHtcbiAgICBtaW46IE1hdGgubWluKHYwLCB2MSksXG4gICAgbWF4OiBNYXRoLm1heCh2MCwgdjEpXG4gIH07XG59XG5mdW5jdGlvbiBmaXhSYW5nZShyYW5nZSwge21pbiwgbWF4LCBtaW5MaW1pdCwgbWF4TGltaXR9LCBvcmlnaW5hbExpbWl0cykge1xuICBjb25zdCBvZmZzZXQgPSAocmFuZ2UgLSBtYXggKyBtaW4pIC8gMjtcbiAgbWluIC09IG9mZnNldDtcbiAgbWF4ICs9IG9mZnNldDtcbiAgY29uc3Qgb3JpZ01pbiA9IG9yaWdpbmFsTGltaXRzLm1pbi5vcHRpb25zID8/IG9yaWdpbmFsTGltaXRzLm1pbi5zY2FsZTtcbiAgY29uc3Qgb3JpZ01heCA9IG9yaWdpbmFsTGltaXRzLm1heC5vcHRpb25zID8/IG9yaWdpbmFsTGltaXRzLm1heC5zY2FsZTtcbiAgY29uc3QgZXBzaWxvbiA9IHJhbmdlIC8gMWU2O1xuICBpZiAoYWxtb3N0RXF1YWxzKG1pbiwgb3JpZ01pbiwgZXBzaWxvbikpIHtcbiAgICBtaW4gPSBvcmlnTWluO1xuICB9XG4gIGlmIChhbG1vc3RFcXVhbHMobWF4LCBvcmlnTWF4LCBlcHNpbG9uKSkge1xuICAgIG1heCA9IG9yaWdNYXg7XG4gIH1cbiAgaWYgKG1pbiA8IG1pbkxpbWl0KSB7XG4gICAgbWluID0gbWluTGltaXQ7XG4gICAgbWF4ID0gTWF0aC5taW4obWluTGltaXQgKyByYW5nZSwgbWF4TGltaXQpO1xuICB9IGVsc2UgaWYgKG1heCA+IG1heExpbWl0KSB7XG4gICAgbWF4ID0gbWF4TGltaXQ7XG4gICAgbWluID0gTWF0aC5tYXgobWF4TGltaXQgLSByYW5nZSwgbWluTGltaXQpO1xuICB9XG4gIHJldHVybiB7bWluLCBtYXh9O1xufVxuZnVuY3Rpb24gdXBkYXRlUmFuZ2Uoc2NhbGUsIHttaW4sIG1heH0sIGxpbWl0cywgem9vbSA9IGZhbHNlKSB7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoc2NhbGUuY2hhcnQpO1xuICBjb25zdCB7b3B0aW9uczogc2NhbGVPcHRzfSA9IHNjYWxlO1xuICBjb25zdCBzY2FsZUxpbWl0cyA9IGdldFNjYWxlTGltaXRzKHNjYWxlLCBsaW1pdHMpO1xuICBjb25zdCB7bWluUmFuZ2UgPSAwfSA9IHNjYWxlTGltaXRzO1xuICBjb25zdCBtaW5MaW1pdCA9IGdldExpbWl0KHN0YXRlLCBzY2FsZSwgc2NhbGVMaW1pdHMsICdtaW4nLCAtSW5maW5pdHkpO1xuICBjb25zdCBtYXhMaW1pdCA9IGdldExpbWl0KHN0YXRlLCBzY2FsZSwgc2NhbGVMaW1pdHMsICdtYXgnLCBJbmZpbml0eSk7XG4gIGlmICh6b29tID09PSAncGFuJyAmJiAobWluIDwgbWluTGltaXQgfHwgbWF4ID4gbWF4TGltaXQpKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3Qgc2NhbGVSYW5nZSA9IHNjYWxlLm1heCAtIHNjYWxlLm1pbjtcbiAgY29uc3QgcmFuZ2UgPSB6b29tID8gTWF0aC5tYXgobWF4IC0gbWluLCBtaW5SYW5nZSkgOiBzY2FsZVJhbmdlO1xuICBpZiAoem9vbSAmJiByYW5nZSA9PT0gbWluUmFuZ2UgJiYgc2NhbGVSYW5nZSA8PSBtaW5SYW5nZSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIGNvbnN0IG5ld1JhbmdlID0gZml4UmFuZ2UocmFuZ2UsIHttaW4sIG1heCwgbWluTGltaXQsIG1heExpbWl0fSwgc3RhdGUub3JpZ2luYWxTY2FsZUxpbWl0c1tzY2FsZS5pZF0pO1xuICBzY2FsZU9wdHMubWluID0gbmV3UmFuZ2UubWluO1xuICBzY2FsZU9wdHMubWF4ID0gbmV3UmFuZ2UubWF4O1xuICBzdGF0ZS51cGRhdGVkU2NhbGVMaW1pdHNbc2NhbGUuaWRdID0gbmV3UmFuZ2U7XG4gIHJldHVybiBzY2FsZS5wYXJzZShuZXdSYW5nZS5taW4pICE9PSBzY2FsZS5taW4gfHwgc2NhbGUucGFyc2UobmV3UmFuZ2UubWF4KSAhPT0gc2NhbGUubWF4O1xufVxuZnVuY3Rpb24gem9vbU51bWVyaWNhbFNjYWxlKHNjYWxlLCB6b29tLCBjZW50ZXIsIGxpbWl0cykge1xuICBjb25zdCBkZWx0YSA9IGxpbmVhclpvb21EZWx0YShzY2FsZSwgem9vbSwgY2VudGVyKTtcbiAgY29uc3QgbmV3UmFuZ2UgPSB7bWluOiBzY2FsZS5taW4gKyBkZWx0YS5taW4sIG1heDogc2NhbGUubWF4IC0gZGVsdGEubWF4fTtcbiAgcmV0dXJuIHVwZGF0ZVJhbmdlKHNjYWxlLCBuZXdSYW5nZSwgbGltaXRzLCB0cnVlKTtcbn1cbmZ1bmN0aW9uIHpvb21Mb2dhcml0aG1pY1NjYWxlKHNjYWxlLCB6b29tLCBjZW50ZXIsIGxpbWl0cykge1xuICBjb25zdCBuZXdSYW5nZSA9IGxvZ2FyaXRobWljWm9vbVJhbmdlKHNjYWxlLCB6b29tLCBjZW50ZXIpO1xuICByZXR1cm4gdXBkYXRlUmFuZ2Uoc2NhbGUsIG5ld1JhbmdlLCBsaW1pdHMsIHRydWUpO1xufVxuZnVuY3Rpb24gem9vbVJlY3ROdW1lcmljYWxTY2FsZShzY2FsZSwgZnJvbSwgdG8sIGxpbWl0cykge1xuICB1cGRhdGVSYW5nZShzY2FsZSwgbGluZWFyUmFuZ2Uoc2NhbGUsIGZyb20sIHRvKSwgbGltaXRzLCB0cnVlKTtcbn1cbmNvbnN0IGludGVnZXJDaGFuZ2UgPSAodikgPT4gdiA9PT0gMCB8fCBpc05hTih2KSA/IDAgOiB2IDwgMCA/IE1hdGgubWluKE1hdGgucm91bmQodiksIC0xKSA6IE1hdGgubWF4KE1hdGgucm91bmQodiksIDEpO1xuZnVuY3Rpb24gZXhpc3RDYXRlZ29yeUZyb21NYXhab29tKHNjYWxlKSB7XG4gIGNvbnN0IGxhYmVscyA9IHNjYWxlLmdldExhYmVscygpO1xuICBjb25zdCBtYXhJbmRleCA9IGxhYmVscy5sZW5ndGggLSAxO1xuICBpZiAoc2NhbGUubWluID4gMCkge1xuICAgIHNjYWxlLm1pbiAtPSAxO1xuICB9XG4gIGlmIChzY2FsZS5tYXggPCBtYXhJbmRleCkge1xuICAgIHNjYWxlLm1heCArPSAxO1xuICB9XG59XG5mdW5jdGlvbiB6b29tQ2F0ZWdvcnlTY2FsZShzY2FsZSwgem9vbSwgY2VudGVyLCBsaW1pdHMpIHtcbiAgY29uc3QgZGVsdGEgPSBsaW5lYXJab29tRGVsdGEoc2NhbGUsIHpvb20sIGNlbnRlcik7XG4gIGlmIChzY2FsZS5taW4gPT09IHNjYWxlLm1heCAmJiB6b29tIDwgMSkge1xuICAgIGV4aXN0Q2F0ZWdvcnlGcm9tTWF4Wm9vbShzY2FsZSk7XG4gIH1cbiAgY29uc3QgbmV3UmFuZ2UgPSB7bWluOiBzY2FsZS5taW4gKyBpbnRlZ2VyQ2hhbmdlKGRlbHRhLm1pbiksIG1heDogc2NhbGUubWF4IC0gaW50ZWdlckNoYW5nZShkZWx0YS5tYXgpfTtcbiAgcmV0dXJuIHVwZGF0ZVJhbmdlKHNjYWxlLCBuZXdSYW5nZSwgbGltaXRzLCB0cnVlKTtcbn1cbmZ1bmN0aW9uIHNjYWxlTGVuZ3RoKHNjYWxlKSB7XG4gIHJldHVybiBzY2FsZS5pc0hvcml6b250YWwoKSA/IHNjYWxlLndpZHRoIDogc2NhbGUuaGVpZ2h0O1xufVxuZnVuY3Rpb24gcGFuQ2F0ZWdvcnlTY2FsZShzY2FsZSwgZGVsdGEsIGxpbWl0cykge1xuICBjb25zdCBsYWJlbHMgPSBzY2FsZS5nZXRMYWJlbHMoKTtcbiAgY29uc3QgbGFzdExhYmVsSW5kZXggPSBsYWJlbHMubGVuZ3RoIC0gMTtcbiAgbGV0IHttaW4sIG1heH0gPSBzY2FsZTtcbiAgY29uc3QgcmFuZ2UgPSBNYXRoLm1heChtYXggLSBtaW4sIDEpO1xuICBjb25zdCBzdGVwRGVsdGEgPSBNYXRoLnJvdW5kKHNjYWxlTGVuZ3RoKHNjYWxlKSAvIE1hdGgubWF4KHJhbmdlLCAxMCkpO1xuICBjb25zdCBzdGVwU2l6ZSA9IE1hdGgucm91bmQoTWF0aC5hYnMoZGVsdGEgLyBzdGVwRGVsdGEpKTtcbiAgbGV0IGFwcGxpZWQ7XG4gIGlmIChkZWx0YSA8IC1zdGVwRGVsdGEpIHtcbiAgICBtYXggPSBNYXRoLm1pbihtYXggKyBzdGVwU2l6ZSwgbGFzdExhYmVsSW5kZXgpO1xuICAgIG1pbiA9IHJhbmdlID09PSAxID8gbWF4IDogbWF4IC0gcmFuZ2U7XG4gICAgYXBwbGllZCA9IG1heCA9PT0gbGFzdExhYmVsSW5kZXg7XG4gIH0gZWxzZSBpZiAoZGVsdGEgPiBzdGVwRGVsdGEpIHtcbiAgICBtaW4gPSBNYXRoLm1heCgwLCBtaW4gLSBzdGVwU2l6ZSk7XG4gICAgbWF4ID0gcmFuZ2UgPT09IDEgPyBtaW4gOiBtaW4gKyByYW5nZTtcbiAgICBhcHBsaWVkID0gbWluID09PSAwO1xuICB9XG4gIHJldHVybiB1cGRhdGVSYW5nZShzY2FsZSwge21pbiwgbWF4fSwgbGltaXRzKSB8fCBhcHBsaWVkO1xufVxuY29uc3QgT0ZGU0VUUyA9IHtcbiAgc2Vjb25kOiA1MDAsXG4gIG1pbnV0ZTogMzAgKiAxMDAwLFxuICBob3VyOiAzMCAqIDYwICogMTAwMCxcbiAgZGF5OiAxMiAqIDYwICogNjAgKiAxMDAwLFxuICB3ZWVrOiAzLjUgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICBtb250aDogMTUgKiAyNCAqIDYwICogNjAgKiAxMDAwLFxuICBxdWFydGVyOiA2MCAqIDI0ICogNjAgKiA2MCAqIDEwMDAsXG4gIHllYXI6IDE4MiAqIDI0ICogNjAgKiA2MCAqIDEwMDBcbn07XG5mdW5jdGlvbiBwYW5OdW1lcmljYWxTY2FsZShzY2FsZSwgZGVsdGEsIGxpbWl0cywgcGFuID0gZmFsc2UpIHtcbiAgY29uc3Qge21pbjogcHJldlN0YXJ0LCBtYXg6IHByZXZFbmQsIG9wdGlvbnN9ID0gc2NhbGU7XG4gIGNvbnN0IHJvdW5kID0gb3B0aW9ucy50aW1lICYmIG9wdGlvbnMudGltZS5yb3VuZDtcbiAgY29uc3Qgb2Zmc2V0ID0gT0ZGU0VUU1tyb3VuZF0gfHwgMDtcbiAgY29uc3QgbmV3TWluID0gc2NhbGUuZ2V0VmFsdWVGb3JQaXhlbChzY2FsZS5nZXRQaXhlbEZvclZhbHVlKHByZXZTdGFydCArIG9mZnNldCkgLSBkZWx0YSk7XG4gIGNvbnN0IG5ld01heCA9IHNjYWxlLmdldFZhbHVlRm9yUGl4ZWwoc2NhbGUuZ2V0UGl4ZWxGb3JWYWx1ZShwcmV2RW5kICsgb2Zmc2V0KSAtIGRlbHRhKTtcbiAgaWYgKGlzTmFOKG5ld01pbikgfHwgaXNOYU4obmV3TWF4KSkge1xuICAgIHJldHVybiB0cnVlO1xuICB9XG4gIHJldHVybiB1cGRhdGVSYW5nZShzY2FsZSwge21pbjogbmV3TWluLCBtYXg6IG5ld01heH0sIGxpbWl0cywgcGFuID8gJ3BhbicgOiBmYWxzZSk7XG59XG5mdW5jdGlvbiBwYW5Ob25MaW5lYXJTY2FsZShzY2FsZSwgZGVsdGEsIGxpbWl0cykge1xuICByZXR1cm4gcGFuTnVtZXJpY2FsU2NhbGUoc2NhbGUsIGRlbHRhLCBsaW1pdHMsIHRydWUpO1xufVxuY29uc3Qgem9vbUZ1bmN0aW9ucyA9IHtcbiAgY2F0ZWdvcnk6IHpvb21DYXRlZ29yeVNjYWxlLFxuICBkZWZhdWx0OiB6b29tTnVtZXJpY2FsU2NhbGUsXG4gIGxvZ2FyaXRobWljOiB6b29tTG9nYXJpdGhtaWNTY2FsZSxcbn07XG5jb25zdCB6b29tUmVjdEZ1bmN0aW9ucyA9IHtcbiAgZGVmYXVsdDogem9vbVJlY3ROdW1lcmljYWxTY2FsZSxcbn07XG5jb25zdCBwYW5GdW5jdGlvbnMgPSB7XG4gIGNhdGVnb3J5OiBwYW5DYXRlZ29yeVNjYWxlLFxuICBkZWZhdWx0OiBwYW5OdW1lcmljYWxTY2FsZSxcbiAgbG9nYXJpdGhtaWM6IHBhbk5vbkxpbmVhclNjYWxlLFxuICB0aW1lc2VyaWVzOiBwYW5Ob25MaW5lYXJTY2FsZSxcbn07XG5cbmZ1bmN0aW9uIHNob3VsZFVwZGF0ZVNjYWxlTGltaXRzKHNjYWxlLCBvcmlnaW5hbFNjYWxlTGltaXRzLCB1cGRhdGVkU2NhbGVMaW1pdHMpIHtcbiAgY29uc3Qge2lkLCBvcHRpb25zOiB7bWluLCBtYXh9fSA9IHNjYWxlO1xuICBpZiAoIW9yaWdpbmFsU2NhbGVMaW1pdHNbaWRdIHx8ICF1cGRhdGVkU2NhbGVMaW1pdHNbaWRdKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgY29uc3QgcHJldmlvdXMgPSB1cGRhdGVkU2NhbGVMaW1pdHNbaWRdO1xuICByZXR1cm4gcHJldmlvdXMubWluICE9PSBtaW4gfHwgcHJldmlvdXMubWF4ICE9PSBtYXg7XG59XG5mdW5jdGlvbiByZW1vdmVNaXNzaW5nU2NhbGVzKGxpbWl0cywgc2NhbGVzKSB7XG4gIGVhY2gobGltaXRzLCAob3B0LCBrZXkpID0+IHtcbiAgICBpZiAoIXNjYWxlc1trZXldKSB7XG4gICAgICBkZWxldGUgbGltaXRzW2tleV07XG4gICAgfVxuICB9KTtcbn1cbmZ1bmN0aW9uIHN0b3JlT3JpZ2luYWxTY2FsZUxpbWl0cyhjaGFydCwgc3RhdGUpIHtcbiAgY29uc3Qge3NjYWxlc30gPSBjaGFydDtcbiAgY29uc3Qge29yaWdpbmFsU2NhbGVMaW1pdHMsIHVwZGF0ZWRTY2FsZUxpbWl0c30gPSBzdGF0ZTtcbiAgZWFjaChzY2FsZXMsIGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgaWYgKHNob3VsZFVwZGF0ZVNjYWxlTGltaXRzKHNjYWxlLCBvcmlnaW5hbFNjYWxlTGltaXRzLCB1cGRhdGVkU2NhbGVMaW1pdHMpKSB7XG4gICAgICBvcmlnaW5hbFNjYWxlTGltaXRzW3NjYWxlLmlkXSA9IHtcbiAgICAgICAgbWluOiB7c2NhbGU6IHNjYWxlLm1pbiwgb3B0aW9uczogc2NhbGUub3B0aW9ucy5taW59LFxuICAgICAgICBtYXg6IHtzY2FsZTogc2NhbGUubWF4LCBvcHRpb25zOiBzY2FsZS5vcHRpb25zLm1heH0sXG4gICAgICB9O1xuICAgIH1cbiAgfSk7XG4gIHJlbW92ZU1pc3NpbmdTY2FsZXMob3JpZ2luYWxTY2FsZUxpbWl0cywgc2NhbGVzKTtcbiAgcmVtb3ZlTWlzc2luZ1NjYWxlcyh1cGRhdGVkU2NhbGVMaW1pdHMsIHNjYWxlcyk7XG4gIHJldHVybiBvcmlnaW5hbFNjYWxlTGltaXRzO1xufVxuZnVuY3Rpb24gZG9ab29tKHNjYWxlLCBhbW91bnQsIGNlbnRlciwgbGltaXRzKSB7XG4gIGNvbnN0IGZuID0gem9vbUZ1bmN0aW9uc1tzY2FsZS50eXBlXSB8fCB6b29tRnVuY3Rpb25zLmRlZmF1bHQ7XG4gIGNhbGxiYWNrKGZuLCBbc2NhbGUsIGFtb3VudCwgY2VudGVyLCBsaW1pdHNdKTtcbn1cbmZ1bmN0aW9uIGRvWm9vbVJlY3Qoc2NhbGUsIGZyb20sIHRvLCBsaW1pdHMpIHtcbiAgY29uc3QgZm4gPSB6b29tUmVjdEZ1bmN0aW9uc1tzY2FsZS50eXBlXSB8fCB6b29tUmVjdEZ1bmN0aW9ucy5kZWZhdWx0O1xuICBjYWxsYmFjayhmbiwgW3NjYWxlLCBmcm9tLCB0bywgbGltaXRzXSk7XG59XG5mdW5jdGlvbiBnZXRDZW50ZXIoY2hhcnQpIHtcbiAgY29uc3QgY2EgPSBjaGFydC5jaGFydEFyZWE7XG4gIHJldHVybiB7XG4gICAgeDogKGNhLmxlZnQgKyBjYS5yaWdodCkgLyAyLFxuICAgIHk6IChjYS50b3AgKyBjYS5ib3R0b20pIC8gMixcbiAgfTtcbn1cbmZ1bmN0aW9uIHpvb20oY2hhcnQsIGFtb3VudCwgdHJhbnNpdGlvbiA9ICdub25lJywgdHJpZ2dlciA9ICdhcGknKSB7XG4gIGNvbnN0IHt4ID0gMSwgeSA9IDEsIGZvY2FsUG9pbnQgPSBnZXRDZW50ZXIoY2hhcnQpfSA9IHR5cGVvZiBhbW91bnQgPT09ICdudW1iZXInID8ge3g6IGFtb3VudCwgeTogYW1vdW50fSA6IGFtb3VudDtcbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gIGNvbnN0IHtvcHRpb25zOiB7bGltaXRzLCB6b29tOiB6b29tT3B0aW9uc319ID0gc3RhdGU7XG4gIHN0b3JlT3JpZ2luYWxTY2FsZUxpbWl0cyhjaGFydCwgc3RhdGUpO1xuICBjb25zdCB4RW5hYmxlZCA9IHggIT09IDE7XG4gIGNvbnN0IHlFbmFibGVkID0geSAhPT0gMTtcbiAgY29uc3QgZW5hYmxlZFNjYWxlcyA9IGdldEVuYWJsZWRTY2FsZXNCeVBvaW50KHpvb21PcHRpb25zLCBmb2NhbFBvaW50LCBjaGFydCk7XG4gIGVhY2goZW5hYmxlZFNjYWxlcyB8fCBjaGFydC5zY2FsZXMsIGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgaWYgKHNjYWxlLmlzSG9yaXpvbnRhbCgpICYmIHhFbmFibGVkKSB7XG4gICAgICBkb1pvb20oc2NhbGUsIHgsIGZvY2FsUG9pbnQsIGxpbWl0cyk7XG4gICAgfSBlbHNlIGlmICghc2NhbGUuaXNIb3Jpem9udGFsKCkgJiYgeUVuYWJsZWQpIHtcbiAgICAgIGRvWm9vbShzY2FsZSwgeSwgZm9jYWxQb2ludCwgbGltaXRzKTtcbiAgICB9XG4gIH0pO1xuICBjaGFydC51cGRhdGUodHJhbnNpdGlvbik7XG4gIGNhbGxiYWNrKHpvb21PcHRpb25zLm9uWm9vbSwgW3tjaGFydCwgdHJpZ2dlcn1dKTtcbn1cbmZ1bmN0aW9uIHpvb21SZWN0KGNoYXJ0LCBwMCwgcDEsIHRyYW5zaXRpb24gPSAnbm9uZScsIHRyaWdnZXIgPSAnYXBpJykge1xuICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKGNoYXJ0KTtcbiAgY29uc3Qge29wdGlvbnM6IHtsaW1pdHMsIHpvb206IHpvb21PcHRpb25zfX0gPSBzdGF0ZTtcbiAgY29uc3Qge21vZGUgPSAneHknfSA9IHpvb21PcHRpb25zO1xuICBzdG9yZU9yaWdpbmFsU2NhbGVMaW1pdHMoY2hhcnQsIHN0YXRlKTtcbiAgY29uc3QgeEVuYWJsZWQgPSBkaXJlY3Rpb25FbmFibGVkKG1vZGUsICd4JywgY2hhcnQpO1xuICBjb25zdCB5RW5hYmxlZCA9IGRpcmVjdGlvbkVuYWJsZWQobW9kZSwgJ3knLCBjaGFydCk7XG4gIGVhY2goY2hhcnQuc2NhbGVzLCBmdW5jdGlvbihzY2FsZSkge1xuICAgIGlmIChzY2FsZS5pc0hvcml6b250YWwoKSAmJiB4RW5hYmxlZCkge1xuICAgICAgZG9ab29tUmVjdChzY2FsZSwgcDAueCwgcDEueCwgbGltaXRzKTtcbiAgICB9IGVsc2UgaWYgKCFzY2FsZS5pc0hvcml6b250YWwoKSAmJiB5RW5hYmxlZCkge1xuICAgICAgZG9ab29tUmVjdChzY2FsZSwgcDAueSwgcDEueSwgbGltaXRzKTtcbiAgICB9XG4gIH0pO1xuICBjaGFydC51cGRhdGUodHJhbnNpdGlvbik7XG4gIGNhbGxiYWNrKHpvb21PcHRpb25zLm9uWm9vbSwgW3tjaGFydCwgdHJpZ2dlcn1dKTtcbn1cbmZ1bmN0aW9uIHpvb21TY2FsZShjaGFydCwgc2NhbGVJZCwgcmFuZ2UsIHRyYW5zaXRpb24gPSAnbm9uZScsIHRyaWdnZXIgPSAnYXBpJykge1xuICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKGNoYXJ0KTtcbiAgc3RvcmVPcmlnaW5hbFNjYWxlTGltaXRzKGNoYXJ0LCBzdGF0ZSk7XG4gIGNvbnN0IHNjYWxlID0gY2hhcnQuc2NhbGVzW3NjYWxlSWRdO1xuICB1cGRhdGVSYW5nZShzY2FsZSwgcmFuZ2UsIHVuZGVmaW5lZCwgdHJ1ZSk7XG4gIGNoYXJ0LnVwZGF0ZSh0cmFuc2l0aW9uKTtcbiAgY2FsbGJhY2soc3RhdGUub3B0aW9ucy56b29tPy5vblpvb20sIFt7Y2hhcnQsIHRyaWdnZXJ9XSk7XG59XG5mdW5jdGlvbiByZXNldFpvb20oY2hhcnQsIHRyYW5zaXRpb24gPSAnZGVmYXVsdCcpIHtcbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gIGNvbnN0IG9yaWdpbmFsU2NhbGVMaW1pdHMgPSBzdG9yZU9yaWdpbmFsU2NhbGVMaW1pdHMoY2hhcnQsIHN0YXRlKTtcbiAgZWFjaChjaGFydC5zY2FsZXMsIGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgY29uc3Qgc2NhbGVPcHRpb25zID0gc2NhbGUub3B0aW9ucztcbiAgICBpZiAob3JpZ2luYWxTY2FsZUxpbWl0c1tzY2FsZS5pZF0pIHtcbiAgICAgIHNjYWxlT3B0aW9ucy5taW4gPSBvcmlnaW5hbFNjYWxlTGltaXRzW3NjYWxlLmlkXS5taW4ub3B0aW9ucztcbiAgICAgIHNjYWxlT3B0aW9ucy5tYXggPSBvcmlnaW5hbFNjYWxlTGltaXRzW3NjYWxlLmlkXS5tYXgub3B0aW9ucztcbiAgICB9IGVsc2Uge1xuICAgICAgZGVsZXRlIHNjYWxlT3B0aW9ucy5taW47XG4gICAgICBkZWxldGUgc2NhbGVPcHRpb25zLm1heDtcbiAgICB9XG4gICAgZGVsZXRlIHN0YXRlLnVwZGF0ZWRTY2FsZUxpbWl0c1tzY2FsZS5pZF07XG4gIH0pO1xuICBjaGFydC51cGRhdGUodHJhbnNpdGlvbik7XG4gIGNhbGxiYWNrKHN0YXRlLm9wdGlvbnMuem9vbS5vblpvb21Db21wbGV0ZSwgW3tjaGFydH1dKTtcbn1cbmZ1bmN0aW9uIGdldE9yaWdpbmFsUmFuZ2Uoc3RhdGUsIHNjYWxlSWQpIHtcbiAgY29uc3Qgb3JpZ2luYWwgPSBzdGF0ZS5vcmlnaW5hbFNjYWxlTGltaXRzW3NjYWxlSWRdO1xuICBpZiAoIW9yaWdpbmFsKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHttaW4sIG1heH0gPSBvcmlnaW5hbDtcbiAgcmV0dXJuIHZhbHVlT3JEZWZhdWx0KG1heC5vcHRpb25zLCBtYXguc2NhbGUpIC0gdmFsdWVPckRlZmF1bHQobWluLm9wdGlvbnMsIG1pbi5zY2FsZSk7XG59XG5mdW5jdGlvbiBnZXRab29tTGV2ZWwoY2hhcnQpIHtcbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gIGxldCBtaW4gPSAxO1xuICBsZXQgbWF4ID0gMTtcbiAgZWFjaChjaGFydC5zY2FsZXMsIGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgY29uc3Qgb3JpZ1JhbmdlID0gZ2V0T3JpZ2luYWxSYW5nZShzdGF0ZSwgc2NhbGUuaWQpO1xuICAgIGlmIChvcmlnUmFuZ2UpIHtcbiAgICAgIGNvbnN0IGxldmVsID0gTWF0aC5yb3VuZChvcmlnUmFuZ2UgLyAoc2NhbGUubWF4IC0gc2NhbGUubWluKSAqIDEwMCkgLyAxMDA7XG4gICAgICBtaW4gPSBNYXRoLm1pbihtaW4sIGxldmVsKTtcbiAgICAgIG1heCA9IE1hdGgubWF4KG1heCwgbGV2ZWwpO1xuICAgIH1cbiAgfSk7XG4gIHJldHVybiBtaW4gPCAxID8gbWluIDogbWF4O1xufVxuZnVuY3Rpb24gcGFuU2NhbGUoc2NhbGUsIGRlbHRhLCBsaW1pdHMsIHN0YXRlKSB7XG4gIGNvbnN0IHtwYW5EZWx0YX0gPSBzdGF0ZTtcbiAgY29uc3Qgc3RvcmVkRGVsdGEgPSBwYW5EZWx0YVtzY2FsZS5pZF0gfHwgMDtcbiAgaWYgKHNpZ24oc3RvcmVkRGVsdGEpID09PSBzaWduKGRlbHRhKSkge1xuICAgIGRlbHRhICs9IHN0b3JlZERlbHRhO1xuICB9XG4gIGNvbnN0IGZuID0gcGFuRnVuY3Rpb25zW3NjYWxlLnR5cGVdIHx8IHBhbkZ1bmN0aW9ucy5kZWZhdWx0O1xuICBpZiAoY2FsbGJhY2soZm4sIFtzY2FsZSwgZGVsdGEsIGxpbWl0c10pKSB7XG4gICAgcGFuRGVsdGFbc2NhbGUuaWRdID0gMDtcbiAgfSBlbHNlIHtcbiAgICBwYW5EZWx0YVtzY2FsZS5pZF0gPSBkZWx0YTtcbiAgfVxufVxuZnVuY3Rpb24gcGFuKGNoYXJ0LCBkZWx0YSwgZW5hYmxlZFNjYWxlcywgdHJhbnNpdGlvbiA9ICdub25lJykge1xuICBjb25zdCB7eCA9IDAsIHkgPSAwfSA9IHR5cGVvZiBkZWx0YSA9PT0gJ251bWJlcicgPyB7eDogZGVsdGEsIHk6IGRlbHRhfSA6IGRlbHRhO1xuICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKGNoYXJ0KTtcbiAgY29uc3Qge29wdGlvbnM6IHtwYW46IHBhbk9wdGlvbnMsIGxpbWl0c319ID0gc3RhdGU7XG4gIGNvbnN0IHtvblBhbn0gPSBwYW5PcHRpb25zIHx8IHt9O1xuICBzdG9yZU9yaWdpbmFsU2NhbGVMaW1pdHMoY2hhcnQsIHN0YXRlKTtcbiAgY29uc3QgeEVuYWJsZWQgPSB4ICE9PSAwO1xuICBjb25zdCB5RW5hYmxlZCA9IHkgIT09IDA7XG4gIGVhY2goZW5hYmxlZFNjYWxlcyB8fCBjaGFydC5zY2FsZXMsIGZ1bmN0aW9uKHNjYWxlKSB7XG4gICAgaWYgKHNjYWxlLmlzSG9yaXpvbnRhbCgpICYmIHhFbmFibGVkKSB7XG4gICAgICBwYW5TY2FsZShzY2FsZSwgeCwgbGltaXRzLCBzdGF0ZSk7XG4gICAgfSBlbHNlIGlmICghc2NhbGUuaXNIb3Jpem9udGFsKCkgJiYgeUVuYWJsZWQpIHtcbiAgICAgIHBhblNjYWxlKHNjYWxlLCB5LCBsaW1pdHMsIHN0YXRlKTtcbiAgICB9XG4gIH0pO1xuICBjaGFydC51cGRhdGUodHJhbnNpdGlvbik7XG4gIGNhbGxiYWNrKG9uUGFuLCBbe2NoYXJ0fV0pO1xufVxuZnVuY3Rpb24gZ2V0SW5pdGlhbFNjYWxlQm91bmRzKGNoYXJ0KSB7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoY2hhcnQpO1xuICBzdG9yZU9yaWdpbmFsU2NhbGVMaW1pdHMoY2hhcnQsIHN0YXRlKTtcbiAgY29uc3Qgc2NhbGVCb3VuZHMgPSB7fTtcbiAgZm9yIChjb25zdCBzY2FsZUlkIG9mIE9iamVjdC5rZXlzKGNoYXJ0LnNjYWxlcykpIHtcbiAgICBjb25zdCB7bWluLCBtYXh9ID0gc3RhdGUub3JpZ2luYWxTY2FsZUxpbWl0c1tzY2FsZUlkXSB8fCB7bWluOiB7fSwgbWF4OiB7fX07XG4gICAgc2NhbGVCb3VuZHNbc2NhbGVJZF0gPSB7bWluOiBtaW4uc2NhbGUsIG1heDogbWF4LnNjYWxlfTtcbiAgfVxuICByZXR1cm4gc2NhbGVCb3VuZHM7XG59XG5mdW5jdGlvbiBnZXRab29tZWRTY2FsZUJvdW5kcyhjaGFydCkge1xuICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKGNoYXJ0KTtcbiAgY29uc3Qgc2NhbGVCb3VuZHMgPSB7fTtcbiAgZm9yIChjb25zdCBzY2FsZUlkIG9mIE9iamVjdC5rZXlzKGNoYXJ0LnNjYWxlcykpIHtcbiAgICBzY2FsZUJvdW5kc1tzY2FsZUlkXSA9IHN0YXRlLnVwZGF0ZWRTY2FsZUxpbWl0c1tzY2FsZUlkXTtcbiAgfVxuICByZXR1cm4gc2NhbGVCb3VuZHM7XG59XG5mdW5jdGlvbiBpc1pvb21lZE9yUGFubmVkKGNoYXJ0KSB7XG4gIGNvbnN0IHNjYWxlQm91bmRzID0gZ2V0SW5pdGlhbFNjYWxlQm91bmRzKGNoYXJ0KTtcbiAgZm9yIChjb25zdCBzY2FsZUlkIG9mIE9iamVjdC5rZXlzKGNoYXJ0LnNjYWxlcykpIHtcbiAgICBjb25zdCB7bWluOiBvcmlnaW5hbE1pbiwgbWF4OiBvcmlnaW5hbE1heH0gPSBzY2FsZUJvdW5kc1tzY2FsZUlkXTtcbiAgICBpZiAob3JpZ2luYWxNaW4gIT09IHVuZGVmaW5lZCAmJiBjaGFydC5zY2FsZXNbc2NhbGVJZF0ubWluICE9PSBvcmlnaW5hbE1pbikge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmIChvcmlnaW5hbE1heCAhPT0gdW5kZWZpbmVkICYmIGNoYXJ0LnNjYWxlc1tzY2FsZUlkXS5tYXggIT09IG9yaWdpbmFsTWF4KSB7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuZnVuY3Rpb24gaXNab29taW5nT3JQYW5uaW5nKGNoYXJ0KSB7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoY2hhcnQpO1xuICByZXR1cm4gc3RhdGUucGFubmluZyB8fCBzdGF0ZS5kcmFnZ2luZztcbn1cblxuY29uc3QgY2xhbXAgPSAoeCwgZnJvbSwgdG8pID0+IE1hdGgubWluKHRvLCBNYXRoLm1heChmcm9tLCB4KSk7XG5mdW5jdGlvbiByZW1vdmVIYW5kbGVyKGNoYXJ0LCB0eXBlKSB7XG4gIGNvbnN0IHtoYW5kbGVyc30gPSBnZXRTdGF0ZShjaGFydCk7XG4gIGNvbnN0IGhhbmRsZXIgPSBoYW5kbGVyc1t0eXBlXTtcbiAgaWYgKGhhbmRsZXIgJiYgaGFuZGxlci50YXJnZXQpIHtcbiAgICBoYW5kbGVyLnRhcmdldC5yZW1vdmVFdmVudExpc3RlbmVyKHR5cGUsIGhhbmRsZXIpO1xuICAgIGRlbGV0ZSBoYW5kbGVyc1t0eXBlXTtcbiAgfVxufVxuZnVuY3Rpb24gYWRkSGFuZGxlcihjaGFydCwgdGFyZ2V0LCB0eXBlLCBoYW5kbGVyKSB7XG4gIGNvbnN0IHtoYW5kbGVycywgb3B0aW9uc30gPSBnZXRTdGF0ZShjaGFydCk7XG4gIGNvbnN0IG9sZEhhbmRsZXIgPSBoYW5kbGVyc1t0eXBlXTtcbiAgaWYgKG9sZEhhbmRsZXIgJiYgb2xkSGFuZGxlci50YXJnZXQgPT09IHRhcmdldCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZW1vdmVIYW5kbGVyKGNoYXJ0LCB0eXBlKTtcbiAgaGFuZGxlcnNbdHlwZV0gPSAoZXZlbnQpID0+IGhhbmRsZXIoY2hhcnQsIGV2ZW50LCBvcHRpb25zKTtcbiAgaGFuZGxlcnNbdHlwZV0udGFyZ2V0ID0gdGFyZ2V0O1xuICBjb25zdCBwYXNzaXZlID0gdHlwZSA9PT0gJ3doZWVsJyA/IGZhbHNlIDogdW5kZWZpbmVkO1xuICB0YXJnZXQuYWRkRXZlbnRMaXN0ZW5lcih0eXBlLCBoYW5kbGVyc1t0eXBlXSwge3Bhc3NpdmV9KTtcbn1cbmZ1bmN0aW9uIG1vdXNlTW92ZShjaGFydCwgZXZlbnQpIHtcbiAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gIGlmIChzdGF0ZS5kcmFnU3RhcnQpIHtcbiAgICBzdGF0ZS5kcmFnZ2luZyA9IHRydWU7XG4gICAgc3RhdGUuZHJhZ0VuZCA9IGV2ZW50O1xuICAgIGNoYXJ0LnVwZGF0ZSgnbm9uZScpO1xuICB9XG59XG5mdW5jdGlvbiBrZXlEb3duKGNoYXJ0LCBldmVudCkge1xuICBjb25zdCBzdGF0ZSA9IGdldFN0YXRlKGNoYXJ0KTtcbiAgaWYgKCFzdGF0ZS5kcmFnU3RhcnQgfHwgZXZlbnQua2V5ICE9PSAnRXNjYXBlJykge1xuICAgIHJldHVybjtcbiAgfVxuICByZW1vdmVIYW5kbGVyKGNoYXJ0LCAna2V5ZG93bicpO1xuICBzdGF0ZS5kcmFnZ2luZyA9IGZhbHNlO1xuICBzdGF0ZS5kcmFnU3RhcnQgPSBzdGF0ZS5kcmFnRW5kID0gbnVsbDtcbiAgY2hhcnQudXBkYXRlKCdub25lJyk7XG59XG5mdW5jdGlvbiBnZXRQb2ludFBvc2l0aW9uKGV2ZW50LCBjaGFydCkge1xuICBpZiAoZXZlbnQudGFyZ2V0ICE9PSBjaGFydC5jYW52YXMpIHtcbiAgICBjb25zdCBjYW52YXNBcmVhID0gY2hhcnQuY2FudmFzLmdldEJvdW5kaW5nQ2xpZW50UmVjdCgpO1xuICAgIHJldHVybiB7XG4gICAgICB4OiBldmVudC5jbGllbnRYIC0gY2FudmFzQXJlYS5sZWZ0LFxuICAgICAgeTogZXZlbnQuY2xpZW50WSAtIGNhbnZhc0FyZWEudG9wLFxuICAgIH07XG4gIH1cbiAgcmV0dXJuIGdldFJlbGF0aXZlUG9zaXRpb24oZXZlbnQsIGNoYXJ0KTtcbn1cbmZ1bmN0aW9uIHpvb21TdGFydChjaGFydCwgZXZlbnQsIHpvb21PcHRpb25zKSB7XG4gIGNvbnN0IHtvblpvb21TdGFydCwgb25ab29tUmVqZWN0ZWR9ID0gem9vbU9wdGlvbnM7XG4gIGlmIChvblpvb21TdGFydCkge1xuICAgIGNvbnN0IHBvaW50ID0gZ2V0UG9pbnRQb3NpdGlvbihldmVudCwgY2hhcnQpO1xuICAgIGlmIChjYWxsYmFjayhvblpvb21TdGFydCwgW3tjaGFydCwgZXZlbnQsIHBvaW50fV0pID09PSBmYWxzZSkge1xuICAgICAgY2FsbGJhY2sob25ab29tUmVqZWN0ZWQsIFt7Y2hhcnQsIGV2ZW50fV0pO1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gbW91c2VEb3duKGNoYXJ0LCBldmVudCkge1xuICBpZiAoY2hhcnQubGVnZW5kKSB7XG4gICAgY29uc3QgcG9pbnQgPSBnZXRSZWxhdGl2ZVBvc2l0aW9uKGV2ZW50LCBjaGFydCk7XG4gICAgaWYgKF9pc1BvaW50SW5BcmVhKHBvaW50LCBjaGFydC5sZWdlbmQpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuICB9XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoY2hhcnQpO1xuICBjb25zdCB7cGFuOiBwYW5PcHRpb25zLCB6b29tOiB6b29tT3B0aW9ucyA9IHt9fSA9IHN0YXRlLm9wdGlvbnM7XG4gIGlmIChcbiAgICBldmVudC5idXR0b24gIT09IDAgfHxcbiAgICBrZXlQcmVzc2VkKGdldE1vZGlmaWVyS2V5KHBhbk9wdGlvbnMpLCBldmVudCkgfHxcbiAgICBrZXlOb3RQcmVzc2VkKGdldE1vZGlmaWVyS2V5KHpvb21PcHRpb25zLmRyYWcpLCBldmVudClcbiAgKSB7XG4gICAgcmV0dXJuIGNhbGxiYWNrKHpvb21PcHRpb25zLm9uWm9vbVJlamVjdGVkLCBbe2NoYXJ0LCBldmVudH1dKTtcbiAgfVxuICBpZiAoem9vbVN0YXJ0KGNoYXJ0LCBldmVudCwgem9vbU9wdGlvbnMpID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBzdGF0ZS5kcmFnU3RhcnQgPSBldmVudDtcbiAgYWRkSGFuZGxlcihjaGFydCwgY2hhcnQuY2FudmFzLm93bmVyRG9jdW1lbnQsICdtb3VzZW1vdmUnLCBtb3VzZU1vdmUpO1xuICBhZGRIYW5kbGVyKGNoYXJ0LCB3aW5kb3cuZG9jdW1lbnQsICdrZXlkb3duJywga2V5RG93bik7XG59XG5mdW5jdGlvbiBhcHBseUFzcGVjdFJhdGlvKHtiZWdpbiwgZW5kfSwgYXNwZWN0UmF0aW8pIHtcbiAgbGV0IHdpZHRoID0gZW5kLnggLSBiZWdpbi54O1xuICBsZXQgaGVpZ2h0ID0gZW5kLnkgLSBiZWdpbi55O1xuICBjb25zdCByYXRpbyA9IE1hdGguYWJzKHdpZHRoIC8gaGVpZ2h0KTtcbiAgaWYgKHJhdGlvID4gYXNwZWN0UmF0aW8pIHtcbiAgICB3aWR0aCA9IE1hdGguc2lnbih3aWR0aCkgKiBNYXRoLmFicyhoZWlnaHQgKiBhc3BlY3RSYXRpbyk7XG4gIH0gZWxzZSBpZiAocmF0aW8gPCBhc3BlY3RSYXRpbykge1xuICAgIGhlaWdodCA9IE1hdGguc2lnbihoZWlnaHQpICogTWF0aC5hYnMod2lkdGggLyBhc3BlY3RSYXRpbyk7XG4gIH1cbiAgZW5kLnggPSBiZWdpbi54ICsgd2lkdGg7XG4gIGVuZC55ID0gYmVnaW4ueSArIGhlaWdodDtcbn1cbmZ1bmN0aW9uIGFwcGx5TWluTWF4UHJvcHMocmVjdCwgY2hhcnRBcmVhLCBwb2ludHMsIHttaW4sIG1heCwgcHJvcH0pIHtcbiAgcmVjdFttaW5dID0gY2xhbXAoTWF0aC5taW4ocG9pbnRzLmJlZ2luW3Byb3BdLCBwb2ludHMuZW5kW3Byb3BdKSwgY2hhcnRBcmVhW21pbl0sIGNoYXJ0QXJlYVttYXhdKTtcbiAgcmVjdFttYXhdID0gY2xhbXAoTWF0aC5tYXgocG9pbnRzLmJlZ2luW3Byb3BdLCBwb2ludHMuZW5kW3Byb3BdKSwgY2hhcnRBcmVhW21pbl0sIGNoYXJ0QXJlYVttYXhdKTtcbn1cbmZ1bmN0aW9uIGdldFJlbGF0aXZlUG9pbnRzKGNoYXJ0LCBwb2ludEV2ZW50cywgbWFpbnRhaW5Bc3BlY3RSYXRpbykge1xuICBjb25zdCBwb2ludHMgPSB7XG4gICAgYmVnaW46IGdldFBvaW50UG9zaXRpb24ocG9pbnRFdmVudHMuZHJhZ1N0YXJ0LCBjaGFydCksXG4gICAgZW5kOiBnZXRQb2ludFBvc2l0aW9uKHBvaW50RXZlbnRzLmRyYWdFbmQsIGNoYXJ0KSxcbiAgfTtcbiAgaWYgKG1haW50YWluQXNwZWN0UmF0aW8pIHtcbiAgICBjb25zdCBhc3BlY3RSYXRpbyA9IGNoYXJ0LmNoYXJ0QXJlYS53aWR0aCAvIGNoYXJ0LmNoYXJ0QXJlYS5oZWlnaHQ7XG4gICAgYXBwbHlBc3BlY3RSYXRpbyhwb2ludHMsIGFzcGVjdFJhdGlvKTtcbiAgfVxuICByZXR1cm4gcG9pbnRzO1xufVxuZnVuY3Rpb24gY29tcHV0ZURyYWdSZWN0KGNoYXJ0LCBtb2RlLCBwb2ludEV2ZW50cywgbWFpbnRhaW5Bc3BlY3RSYXRpbykge1xuICBjb25zdCB4RW5hYmxlZCA9IGRpcmVjdGlvbkVuYWJsZWQobW9kZSwgJ3gnLCBjaGFydCk7XG4gIGNvbnN0IHlFbmFibGVkID0gZGlyZWN0aW9uRW5hYmxlZChtb2RlLCAneScsIGNoYXJ0KTtcbiAgY29uc3Qge3RvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbSwgd2lkdGg6IGNoYXJ0V2lkdGgsIGhlaWdodDogY2hhcnRIZWlnaHR9ID0gY2hhcnQuY2hhcnRBcmVhO1xuICBjb25zdCByZWN0ID0ge3RvcCwgbGVmdCwgcmlnaHQsIGJvdHRvbX07XG4gIGNvbnN0IHBvaW50cyA9IGdldFJlbGF0aXZlUG9pbnRzKGNoYXJ0LCBwb2ludEV2ZW50cywgbWFpbnRhaW5Bc3BlY3RSYXRpbyAmJiB4RW5hYmxlZCAmJiB5RW5hYmxlZCk7XG4gIGlmICh4RW5hYmxlZCkge1xuICAgIGFwcGx5TWluTWF4UHJvcHMocmVjdCwgY2hhcnQuY2hhcnRBcmVhLCBwb2ludHMsIHttaW46ICdsZWZ0JywgbWF4OiAncmlnaHQnLCBwcm9wOiAneCd9KTtcbiAgfVxuICBpZiAoeUVuYWJsZWQpIHtcbiAgICBhcHBseU1pbk1heFByb3BzKHJlY3QsIGNoYXJ0LmNoYXJ0QXJlYSwgcG9pbnRzLCB7bWluOiAndG9wJywgbWF4OiAnYm90dG9tJywgcHJvcDogJ3knfSk7XG4gIH1cbiAgY29uc3Qgd2lkdGggPSByZWN0LnJpZ2h0IC0gcmVjdC5sZWZ0O1xuICBjb25zdCBoZWlnaHQgPSByZWN0LmJvdHRvbSAtIHJlY3QudG9wO1xuICByZXR1cm4ge1xuICAgIC4uLnJlY3QsXG4gICAgd2lkdGgsXG4gICAgaGVpZ2h0LFxuICAgIHpvb21YOiB4RW5hYmxlZCAmJiB3aWR0aCA/IDEgKyAoKGNoYXJ0V2lkdGggLSB3aWR0aCkgLyBjaGFydFdpZHRoKSA6IDEsXG4gICAgem9vbVk6IHlFbmFibGVkICYmIGhlaWdodCA/IDEgKyAoKGNoYXJ0SGVpZ2h0IC0gaGVpZ2h0KSAvIGNoYXJ0SGVpZ2h0KSA6IDFcbiAgfTtcbn1cbmZ1bmN0aW9uIG1vdXNlVXAoY2hhcnQsIGV2ZW50KSB7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoY2hhcnQpO1xuICBpZiAoIXN0YXRlLmRyYWdTdGFydCkge1xuICAgIHJldHVybjtcbiAgfVxuICByZW1vdmVIYW5kbGVyKGNoYXJ0LCAnbW91c2Vtb3ZlJyk7XG4gIGNvbnN0IHttb2RlLCBvblpvb21Db21wbGV0ZSwgZHJhZzoge3RocmVzaG9sZCA9IDAsIG1haW50YWluQXNwZWN0UmF0aW99fSA9IHN0YXRlLm9wdGlvbnMuem9vbTtcbiAgY29uc3QgcmVjdCA9IGNvbXB1dGVEcmFnUmVjdChjaGFydCwgbW9kZSwge2RyYWdTdGFydDogc3RhdGUuZHJhZ1N0YXJ0LCBkcmFnRW5kOiBldmVudH0sIG1haW50YWluQXNwZWN0UmF0aW8pO1xuICBjb25zdCBkaXN0YW5jZVggPSBkaXJlY3Rpb25FbmFibGVkKG1vZGUsICd4JywgY2hhcnQpID8gcmVjdC53aWR0aCA6IDA7XG4gIGNvbnN0IGRpc3RhbmNlWSA9IGRpcmVjdGlvbkVuYWJsZWQobW9kZSwgJ3knLCBjaGFydCkgPyByZWN0LmhlaWdodCA6IDA7XG4gIGNvbnN0IGRpc3RhbmNlID0gTWF0aC5zcXJ0KGRpc3RhbmNlWCAqIGRpc3RhbmNlWCArIGRpc3RhbmNlWSAqIGRpc3RhbmNlWSk7XG4gIHN0YXRlLmRyYWdTdGFydCA9IHN0YXRlLmRyYWdFbmQgPSBudWxsO1xuICBpZiAoZGlzdGFuY2UgPD0gdGhyZXNob2xkKSB7XG4gICAgc3RhdGUuZHJhZ2dpbmcgPSBmYWxzZTtcbiAgICBjaGFydC51cGRhdGUoJ25vbmUnKTtcbiAgICByZXR1cm47XG4gIH1cbiAgem9vbVJlY3QoY2hhcnQsIHt4OiByZWN0LmxlZnQsIHk6IHJlY3QudG9wfSwge3g6IHJlY3QucmlnaHQsIHk6IHJlY3QuYm90dG9tfSwgJ3pvb20nLCAnZHJhZycpO1xuICBzdGF0ZS5kcmFnZ2luZyA9IGZhbHNlO1xuICBzdGF0ZS5maWx0ZXJOZXh0Q2xpY2sgPSB0cnVlO1xuICBjYWxsYmFjayhvblpvb21Db21wbGV0ZSwgW3tjaGFydH1dKTtcbn1cbmZ1bmN0aW9uIHdoZWVsUHJlY29uZGl0aW9ucyhjaGFydCwgZXZlbnQsIHpvb21PcHRpb25zKSB7XG4gIGlmIChrZXlOb3RQcmVzc2VkKGdldE1vZGlmaWVyS2V5KHpvb21PcHRpb25zLndoZWVsKSwgZXZlbnQpKSB7XG4gICAgY2FsbGJhY2soem9vbU9wdGlvbnMub25ab29tUmVqZWN0ZWQsIFt7Y2hhcnQsIGV2ZW50fV0pO1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoem9vbVN0YXJ0KGNoYXJ0LCBldmVudCwgem9vbU9wdGlvbnMpID09PSBmYWxzZSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAoZXZlbnQuY2FuY2VsYWJsZSkge1xuICAgIGV2ZW50LnByZXZlbnREZWZhdWx0KCk7XG4gIH1cbiAgaWYgKGV2ZW50LmRlbHRhWSA9PT0gdW5kZWZpbmVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIHJldHVybiB0cnVlO1xufVxuZnVuY3Rpb24gd2hlZWwoY2hhcnQsIGV2ZW50KSB7XG4gIGNvbnN0IHtoYW5kbGVyczoge29uWm9vbUNvbXBsZXRlfSwgb3B0aW9uczoge3pvb206IHpvb21PcHRpb25zfX0gPSBnZXRTdGF0ZShjaGFydCk7XG4gIGlmICghd2hlZWxQcmVjb25kaXRpb25zKGNoYXJ0LCBldmVudCwgem9vbU9wdGlvbnMpKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJlY3QgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHNwZWVkID0gem9vbU9wdGlvbnMud2hlZWwuc3BlZWQ7XG4gIGNvbnN0IHBlcmNlbnRhZ2UgPSBldmVudC5kZWx0YVkgPj0gMCA/IDIgLSAxIC8gKDEgLSBzcGVlZCkgOiAxICsgc3BlZWQ7XG4gIGNvbnN0IGFtb3VudCA9IHtcbiAgICB4OiBwZXJjZW50YWdlLFxuICAgIHk6IHBlcmNlbnRhZ2UsXG4gICAgZm9jYWxQb2ludDoge1xuICAgICAgeDogZXZlbnQuY2xpZW50WCAtIHJlY3QubGVmdCxcbiAgICAgIHk6IGV2ZW50LmNsaWVudFkgLSByZWN0LnRvcFxuICAgIH1cbiAgfTtcbiAgem9vbShjaGFydCwgYW1vdW50LCAnem9vbScsICd3aGVlbCcpO1xuICBjYWxsYmFjayhvblpvb21Db21wbGV0ZSwgW3tjaGFydH1dKTtcbn1cbmZ1bmN0aW9uIGFkZERlYm91bmNlZEhhbmRsZXIoY2hhcnQsIG5hbWUsIGhhbmRsZXIsIGRlbGF5KSB7XG4gIGlmIChoYW5kbGVyKSB7XG4gICAgZ2V0U3RhdGUoY2hhcnQpLmhhbmRsZXJzW25hbWVdID0gZGVib3VuY2UoKCkgPT4gY2FsbGJhY2soaGFuZGxlciwgW3tjaGFydH1dKSwgZGVsYXkpO1xuICB9XG59XG5mdW5jdGlvbiBhZGRMaXN0ZW5lcnMoY2hhcnQsIG9wdGlvbnMpIHtcbiAgY29uc3QgY2FudmFzID0gY2hhcnQuY2FudmFzO1xuICBjb25zdCB7d2hlZWw6IHdoZWVsT3B0aW9ucywgZHJhZzogZHJhZ09wdGlvbnMsIG9uWm9vbUNvbXBsZXRlfSA9IG9wdGlvbnMuem9vbTtcbiAgaWYgKHdoZWVsT3B0aW9ucy5lbmFibGVkKSB7XG4gICAgYWRkSGFuZGxlcihjaGFydCwgY2FudmFzLCAnd2hlZWwnLCB3aGVlbCk7XG4gICAgYWRkRGVib3VuY2VkSGFuZGxlcihjaGFydCwgJ29uWm9vbUNvbXBsZXRlJywgb25ab29tQ29tcGxldGUsIDI1MCk7XG4gIH0gZWxzZSB7XG4gICAgcmVtb3ZlSGFuZGxlcihjaGFydCwgJ3doZWVsJyk7XG4gIH1cbiAgaWYgKGRyYWdPcHRpb25zLmVuYWJsZWQpIHtcbiAgICBhZGRIYW5kbGVyKGNoYXJ0LCBjYW52YXMsICdtb3VzZWRvd24nLCBtb3VzZURvd24pO1xuICAgIGFkZEhhbmRsZXIoY2hhcnQsIGNhbnZhcy5vd25lckRvY3VtZW50LCAnbW91c2V1cCcsIG1vdXNlVXApO1xuICB9IGVsc2Uge1xuICAgIHJlbW92ZUhhbmRsZXIoY2hhcnQsICdtb3VzZWRvd24nKTtcbiAgICByZW1vdmVIYW5kbGVyKGNoYXJ0LCAnbW91c2Vtb3ZlJyk7XG4gICAgcmVtb3ZlSGFuZGxlcihjaGFydCwgJ21vdXNldXAnKTtcbiAgICByZW1vdmVIYW5kbGVyKGNoYXJ0LCAna2V5ZG93bicpO1xuICB9XG59XG5mdW5jdGlvbiByZW1vdmVMaXN0ZW5lcnMoY2hhcnQpIHtcbiAgcmVtb3ZlSGFuZGxlcihjaGFydCwgJ21vdXNlZG93bicpO1xuICByZW1vdmVIYW5kbGVyKGNoYXJ0LCAnbW91c2Vtb3ZlJyk7XG4gIHJlbW92ZUhhbmRsZXIoY2hhcnQsICdtb3VzZXVwJyk7XG4gIHJlbW92ZUhhbmRsZXIoY2hhcnQsICd3aGVlbCcpO1xuICByZW1vdmVIYW5kbGVyKGNoYXJ0LCAnY2xpY2snKTtcbiAgcmVtb3ZlSGFuZGxlcihjaGFydCwgJ2tleWRvd24nKTtcbn1cblxuZnVuY3Rpb24gY3JlYXRlRW5hYmxlcihjaGFydCwgc3RhdGUpIHtcbiAgcmV0dXJuIGZ1bmN0aW9uKHJlY29nbml6ZXIsIGV2ZW50KSB7XG4gICAgY29uc3Qge3BhbjogcGFuT3B0aW9ucywgem9vbTogem9vbU9wdGlvbnMgPSB7fX0gPSBzdGF0ZS5vcHRpb25zO1xuICAgIGlmICghcGFuT3B0aW9ucyB8fCAhcGFuT3B0aW9ucy5lbmFibGVkKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGNvbnN0IHNyY0V2ZW50ID0gZXZlbnQgJiYgZXZlbnQuc3JjRXZlbnQ7XG4gICAgaWYgKCFzcmNFdmVudCkge1xuICAgICAgcmV0dXJuIHRydWU7XG4gICAgfVxuICAgIGlmICghc3RhdGUucGFubmluZyAmJiBldmVudC5wb2ludGVyVHlwZSA9PT0gJ21vdXNlJyAmJiAoXG4gICAgICBrZXlOb3RQcmVzc2VkKGdldE1vZGlmaWVyS2V5KHBhbk9wdGlvbnMpLCBzcmNFdmVudCkgfHwga2V5UHJlc3NlZChnZXRNb2RpZmllcktleSh6b29tT3B0aW9ucy5kcmFnKSwgc3JjRXZlbnQpKVxuICAgICkge1xuICAgICAgY2FsbGJhY2socGFuT3B0aW9ucy5vblBhblJlamVjdGVkLCBbe2NoYXJ0LCBldmVudH1dKTtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIHRydWU7XG4gIH07XG59XG5mdW5jdGlvbiBwaW5jaEF4ZXMocDAsIHAxKSB7XG4gIGNvbnN0IHBpbmNoWCA9IE1hdGguYWJzKHAwLmNsaWVudFggLSBwMS5jbGllbnRYKTtcbiAgY29uc3QgcGluY2hZID0gTWF0aC5hYnMocDAuY2xpZW50WSAtIHAxLmNsaWVudFkpO1xuICBjb25zdCBwID0gcGluY2hYIC8gcGluY2hZO1xuICBsZXQgeCwgeTtcbiAgaWYgKHAgPiAwLjMgJiYgcCA8IDEuNykge1xuICAgIHggPSB5ID0gdHJ1ZTtcbiAgfSBlbHNlIGlmIChwaW5jaFggPiBwaW5jaFkpIHtcbiAgICB4ID0gdHJ1ZTtcbiAgfSBlbHNlIHtcbiAgICB5ID0gdHJ1ZTtcbiAgfVxuICByZXR1cm4ge3gsIHl9O1xufVxuZnVuY3Rpb24gaGFuZGxlUGluY2goY2hhcnQsIHN0YXRlLCBlKSB7XG4gIGlmIChzdGF0ZS5zY2FsZSkge1xuICAgIGNvbnN0IHtjZW50ZXIsIHBvaW50ZXJzfSA9IGU7XG4gICAgY29uc3Qgem9vbVBlcmNlbnQgPSAxIC8gc3RhdGUuc2NhbGUgKiBlLnNjYWxlO1xuICAgIGNvbnN0IHJlY3QgPSBlLnRhcmdldC5nZXRCb3VuZGluZ0NsaWVudFJlY3QoKTtcbiAgICBjb25zdCBwaW5jaCA9IHBpbmNoQXhlcyhwb2ludGVyc1swXSwgcG9pbnRlcnNbMV0pO1xuICAgIGNvbnN0IG1vZGUgPSBzdGF0ZS5vcHRpb25zLnpvb20ubW9kZTtcbiAgICBjb25zdCBhbW91bnQgPSB7XG4gICAgICB4OiBwaW5jaC54ICYmIGRpcmVjdGlvbkVuYWJsZWQobW9kZSwgJ3gnLCBjaGFydCkgPyB6b29tUGVyY2VudCA6IDEsXG4gICAgICB5OiBwaW5jaC55ICYmIGRpcmVjdGlvbkVuYWJsZWQobW9kZSwgJ3knLCBjaGFydCkgPyB6b29tUGVyY2VudCA6IDEsXG4gICAgICBmb2NhbFBvaW50OiB7XG4gICAgICAgIHg6IGNlbnRlci54IC0gcmVjdC5sZWZ0LFxuICAgICAgICB5OiBjZW50ZXIueSAtIHJlY3QudG9wXG4gICAgICB9XG4gICAgfTtcbiAgICB6b29tKGNoYXJ0LCBhbW91bnQsICd6b29tJywgJ3BpbmNoJyk7XG4gICAgc3RhdGUuc2NhbGUgPSBlLnNjYWxlO1xuICB9XG59XG5mdW5jdGlvbiBzdGFydFBpbmNoKGNoYXJ0LCBzdGF0ZSwgZXZlbnQpIHtcbiAgaWYgKHN0YXRlLm9wdGlvbnMuem9vbS5waW5jaC5lbmFibGVkKSB7XG4gICAgY29uc3QgcG9pbnQgPSBnZXRSZWxhdGl2ZVBvc2l0aW9uKGV2ZW50LCBjaGFydCk7XG4gICAgaWYgKGNhbGxiYWNrKHN0YXRlLm9wdGlvbnMuem9vbS5vblpvb21TdGFydCwgW3tjaGFydCwgZXZlbnQsIHBvaW50fV0pID09PSBmYWxzZSkge1xuICAgICAgc3RhdGUuc2NhbGUgPSBudWxsO1xuICAgICAgY2FsbGJhY2soc3RhdGUub3B0aW9ucy56b29tLm9uWm9vbVJlamVjdGVkLCBbe2NoYXJ0LCBldmVudH1dKTtcbiAgICB9IGVsc2Uge1xuICAgICAgc3RhdGUuc2NhbGUgPSAxO1xuICAgIH1cbiAgfVxufVxuZnVuY3Rpb24gZW5kUGluY2goY2hhcnQsIHN0YXRlLCBlKSB7XG4gIGlmIChzdGF0ZS5zY2FsZSkge1xuICAgIGhhbmRsZVBpbmNoKGNoYXJ0LCBzdGF0ZSwgZSk7XG4gICAgc3RhdGUuc2NhbGUgPSBudWxsO1xuICAgIGNhbGxiYWNrKHN0YXRlLm9wdGlvbnMuem9vbS5vblpvb21Db21wbGV0ZSwgW3tjaGFydH1dKTtcbiAgfVxufVxuZnVuY3Rpb24gaGFuZGxlUGFuKGNoYXJ0LCBzdGF0ZSwgZSkge1xuICBjb25zdCBkZWx0YSA9IHN0YXRlLmRlbHRhO1xuICBpZiAoZGVsdGEpIHtcbiAgICBzdGF0ZS5wYW5uaW5nID0gdHJ1ZTtcbiAgICBwYW4oY2hhcnQsIHt4OiBlLmRlbHRhWCAtIGRlbHRhLngsIHk6IGUuZGVsdGFZIC0gZGVsdGEueX0sIHN0YXRlLnBhblNjYWxlcyk7XG4gICAgc3RhdGUuZGVsdGEgPSB7eDogZS5kZWx0YVgsIHk6IGUuZGVsdGFZfTtcbiAgfVxufVxuZnVuY3Rpb24gc3RhcnRQYW4oY2hhcnQsIHN0YXRlLCBldmVudCkge1xuICBjb25zdCB7ZW5hYmxlZCwgb25QYW5TdGFydCwgb25QYW5SZWplY3RlZH0gPSBzdGF0ZS5vcHRpb25zLnBhbjtcbiAgaWYgKCFlbmFibGVkKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGNvbnN0IHJlY3QgPSBldmVudC50YXJnZXQuZ2V0Qm91bmRpbmdDbGllbnRSZWN0KCk7XG4gIGNvbnN0IHBvaW50ID0ge1xuICAgIHg6IGV2ZW50LmNlbnRlci54IC0gcmVjdC5sZWZ0LFxuICAgIHk6IGV2ZW50LmNlbnRlci55IC0gcmVjdC50b3BcbiAgfTtcbiAgaWYgKGNhbGxiYWNrKG9uUGFuU3RhcnQsIFt7Y2hhcnQsIGV2ZW50LCBwb2ludH1dKSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gY2FsbGJhY2sob25QYW5SZWplY3RlZCwgW3tjaGFydCwgZXZlbnR9XSk7XG4gIH1cbiAgc3RhdGUucGFuU2NhbGVzID0gZ2V0RW5hYmxlZFNjYWxlc0J5UG9pbnQoc3RhdGUub3B0aW9ucy5wYW4sIHBvaW50LCBjaGFydCk7XG4gIHN0YXRlLmRlbHRhID0ge3g6IDAsIHk6IDB9O1xuICBoYW5kbGVQYW4oY2hhcnQsIHN0YXRlLCBldmVudCk7XG59XG5mdW5jdGlvbiBlbmRQYW4oY2hhcnQsIHN0YXRlKSB7XG4gIHN0YXRlLmRlbHRhID0gbnVsbDtcbiAgaWYgKHN0YXRlLnBhbm5pbmcpIHtcbiAgICBzdGF0ZS5wYW5uaW5nID0gZmFsc2U7XG4gICAgc3RhdGUuZmlsdGVyTmV4dENsaWNrID0gdHJ1ZTtcbiAgICBjYWxsYmFjayhzdGF0ZS5vcHRpb25zLnBhbi5vblBhbkNvbXBsZXRlLCBbe2NoYXJ0fV0pO1xuICB9XG59XG5jb25zdCBoYW1tZXJzID0gbmV3IFdlYWtNYXAoKTtcbmZ1bmN0aW9uIHN0YXJ0SGFtbWVyKGNoYXJ0LCBvcHRpb25zKSB7XG4gIGNvbnN0IHN0YXRlID0gZ2V0U3RhdGUoY2hhcnQpO1xuICBjb25zdCBjYW52YXMgPSBjaGFydC5jYW52YXM7XG4gIGNvbnN0IHtwYW46IHBhbk9wdGlvbnMsIHpvb206IHpvb21PcHRpb25zfSA9IG9wdGlvbnM7XG4gIGNvbnN0IG1jID0gbmV3IEhhbW1lci5NYW5hZ2VyKGNhbnZhcyk7XG4gIGlmICh6b29tT3B0aW9ucyAmJiB6b29tT3B0aW9ucy5waW5jaC5lbmFibGVkKSB7XG4gICAgbWMuYWRkKG5ldyBIYW1tZXIuUGluY2goKSk7XG4gICAgbWMub24oJ3BpbmNoc3RhcnQnLCAoZSkgPT4gc3RhcnRQaW5jaChjaGFydCwgc3RhdGUsIGUpKTtcbiAgICBtYy5vbigncGluY2gnLCAoZSkgPT4gaGFuZGxlUGluY2goY2hhcnQsIHN0YXRlLCBlKSk7XG4gICAgbWMub24oJ3BpbmNoZW5kJywgKGUpID0+IGVuZFBpbmNoKGNoYXJ0LCBzdGF0ZSwgZSkpO1xuICB9XG4gIGlmIChwYW5PcHRpb25zICYmIHBhbk9wdGlvbnMuZW5hYmxlZCkge1xuICAgIG1jLmFkZChuZXcgSGFtbWVyLlBhbih7XG4gICAgICB0aHJlc2hvbGQ6IHBhbk9wdGlvbnMudGhyZXNob2xkLFxuICAgICAgZW5hYmxlOiBjcmVhdGVFbmFibGVyKGNoYXJ0LCBzdGF0ZSlcbiAgICB9KSk7XG4gICAgbWMub24oJ3BhbnN0YXJ0JywgKGUpID0+IHN0YXJ0UGFuKGNoYXJ0LCBzdGF0ZSwgZSkpO1xuICAgIG1jLm9uKCdwYW5tb3ZlJywgKGUpID0+IGhhbmRsZVBhbihjaGFydCwgc3RhdGUsIGUpKTtcbiAgICBtYy5vbigncGFuZW5kJywgKCkgPT4gZW5kUGFuKGNoYXJ0LCBzdGF0ZSkpO1xuICB9XG4gIGhhbW1lcnMuc2V0KGNoYXJ0LCBtYyk7XG59XG5mdW5jdGlvbiBzdG9wSGFtbWVyKGNoYXJ0KSB7XG4gIGNvbnN0IG1jID0gaGFtbWVycy5nZXQoY2hhcnQpO1xuICBpZiAobWMpIHtcbiAgICBtYy5yZW1vdmUoJ3BpbmNoc3RhcnQnKTtcbiAgICBtYy5yZW1vdmUoJ3BpbmNoJyk7XG4gICAgbWMucmVtb3ZlKCdwaW5jaGVuZCcpO1xuICAgIG1jLnJlbW92ZSgncGFuc3RhcnQnKTtcbiAgICBtYy5yZW1vdmUoJ3BhbicpO1xuICAgIG1jLnJlbW92ZSgncGFuZW5kJyk7XG4gICAgbWMuZGVzdHJveSgpO1xuICAgIGhhbW1lcnMuZGVsZXRlKGNoYXJ0KTtcbiAgfVxufVxuZnVuY3Rpb24gaGFtbWVyT3B0aW9uc0NoYW5nZWQob2xkT3B0aW9ucywgbmV3T3B0aW9ucykge1xuICBjb25zdCB7cGFuOiBvbGRQYW4sIHpvb206IG9sZFpvb219ID0gb2xkT3B0aW9ucztcbiAgY29uc3Qge3BhbjogbmV3UGFuLCB6b29tOiBuZXdab29tfSA9IG5ld09wdGlvbnM7XG4gIGlmIChvbGRab29tPy56b29tPy5waW5jaD8uZW5hYmxlZCAhPT0gbmV3Wm9vbT8uem9vbT8ucGluY2g/LmVuYWJsZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAob2xkUGFuPy5lbmFibGVkICE9PSBuZXdQYW4/LmVuYWJsZWQpIHtcbiAgICByZXR1cm4gdHJ1ZTtcbiAgfVxuICBpZiAob2xkUGFuPy50aHJlc2hvbGQgIT09IG5ld1Bhbj8udGhyZXNob2xkKSB7XG4gICAgcmV0dXJuIHRydWU7XG4gIH1cbiAgcmV0dXJuIGZhbHNlO1xufVxuXG52YXIgdmVyc2lvbiA9IFwiMi4yLjBcIjtcblxuZnVuY3Rpb24gZHJhdyhjaGFydCwgY2FsbGVyLCBvcHRpb25zKSB7XG4gIGNvbnN0IGRyYWdPcHRpb25zID0gb3B0aW9ucy56b29tLmRyYWc7XG4gIGNvbnN0IHtkcmFnU3RhcnQsIGRyYWdFbmR9ID0gZ2V0U3RhdGUoY2hhcnQpO1xuICBpZiAoZHJhZ09wdGlvbnMuZHJhd1RpbWUgIT09IGNhbGxlciB8fCAhZHJhZ0VuZCkge1xuICAgIHJldHVybjtcbiAgfVxuICBjb25zdCB7bGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0fSA9IGNvbXB1dGVEcmFnUmVjdChjaGFydCwgb3B0aW9ucy56b29tLm1vZGUsIHtkcmFnU3RhcnQsIGRyYWdFbmR9LCBkcmFnT3B0aW9ucy5tYWludGFpbkFzcGVjdFJhdGlvKTtcbiAgY29uc3QgY3R4ID0gY2hhcnQuY3R4O1xuICBjdHguc2F2ZSgpO1xuICBjdHguYmVnaW5QYXRoKCk7XG4gIGN0eC5maWxsU3R5bGUgPSBkcmFnT3B0aW9ucy5iYWNrZ3JvdW5kQ29sb3IgfHwgJ3JnYmEoMjI1LDIyNSwyMjUsMC4zKSc7XG4gIGN0eC5maWxsUmVjdChsZWZ0LCB0b3AsIHdpZHRoLCBoZWlnaHQpO1xuICBpZiAoZHJhZ09wdGlvbnMuYm9yZGVyV2lkdGggPiAwKSB7XG4gICAgY3R4LmxpbmVXaWR0aCA9IGRyYWdPcHRpb25zLmJvcmRlcldpZHRoO1xuICAgIGN0eC5zdHJva2VTdHlsZSA9IGRyYWdPcHRpb25zLmJvcmRlckNvbG9yIHx8ICdyZ2JhKDIyNSwyMjUsMjI1KSc7XG4gICAgY3R4LnN0cm9rZVJlY3QobGVmdCwgdG9wLCB3aWR0aCwgaGVpZ2h0KTtcbiAgfVxuICBjdHgucmVzdG9yZSgpO1xufVxudmFyIHBsdWdpbiA9IHtcbiAgaWQ6ICd6b29tJyxcbiAgdmVyc2lvbixcbiAgZGVmYXVsdHM6IHtcbiAgICBwYW46IHtcbiAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgbW9kZTogJ3h5JyxcbiAgICAgIHRocmVzaG9sZDogMTAsXG4gICAgICBtb2RpZmllcktleTogbnVsbCxcbiAgICB9LFxuICAgIHpvb206IHtcbiAgICAgIHdoZWVsOiB7XG4gICAgICAgIGVuYWJsZWQ6IGZhbHNlLFxuICAgICAgICBzcGVlZDogMC4xLFxuICAgICAgICBtb2RpZmllcktleTogbnVsbFxuICAgICAgfSxcbiAgICAgIGRyYWc6IHtcbiAgICAgICAgZW5hYmxlZDogZmFsc2UsXG4gICAgICAgIGRyYXdUaW1lOiAnYmVmb3JlRGF0YXNldHNEcmF3JyxcbiAgICAgICAgbW9kaWZpZXJLZXk6IG51bGxcbiAgICAgIH0sXG4gICAgICBwaW5jaDoge1xuICAgICAgICBlbmFibGVkOiBmYWxzZVxuICAgICAgfSxcbiAgICAgIG1vZGU6ICd4eScsXG4gICAgfVxuICB9LFxuICBzdGFydDogZnVuY3Rpb24oY2hhcnQsIF9hcmdzLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gICAgc3RhdGUub3B0aW9ucyA9IG9wdGlvbnM7XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLnpvb20sICdlbmFibGVkJykpIHtcbiAgICAgIGNvbnNvbGUud2FybignVGhlIG9wdGlvbiBgem9vbS5lbmFibGVkYCBpcyBubyBsb25nZXIgc3VwcG9ydGVkLiBQbGVhc2UgdXNlIGB6b29tLndoZWVsLmVuYWJsZWRgLCBgem9vbS5kcmFnLmVuYWJsZWRgLCBvciBgem9vbS5waW5jaC5lbmFibGVkYC4nKTtcbiAgICB9XG4gICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLnpvb20sICdvdmVyU2NhbGVNb2RlJylcbiAgICAgIHx8IE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvcHRpb25zLnBhbiwgJ292ZXJTY2FsZU1vZGUnKSkge1xuICAgICAgY29uc29sZS53YXJuKCdUaGUgb3B0aW9uIGBvdmVyU2NhbGVNb2RlYCBpcyBkZXByZWNhdGVkLiBQbGVhc2UgdXNlIGBzY2FsZU1vZGVgIGluc3RlYWQgKGFuZCB1cGRhdGUgYG1vZGVgIGFzIGRlc2lyZWQpLicpO1xuICAgIH1cbiAgICBpZiAoSGFtbWVyKSB7XG4gICAgICBzdGFydEhhbW1lcihjaGFydCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGNoYXJ0LnBhbiA9IChkZWx0YSwgcGFuU2NhbGVzLCB0cmFuc2l0aW9uKSA9PiBwYW4oY2hhcnQsIGRlbHRhLCBwYW5TY2FsZXMsIHRyYW5zaXRpb24pO1xuICAgIGNoYXJ0Lnpvb20gPSAoYXJncywgdHJhbnNpdGlvbikgPT4gem9vbShjaGFydCwgYXJncywgdHJhbnNpdGlvbik7XG4gICAgY2hhcnQuem9vbVJlY3QgPSAocDAsIHAxLCB0cmFuc2l0aW9uKSA9PiB6b29tUmVjdChjaGFydCwgcDAsIHAxLCB0cmFuc2l0aW9uKTtcbiAgICBjaGFydC56b29tU2NhbGUgPSAoaWQsIHJhbmdlLCB0cmFuc2l0aW9uKSA9PiB6b29tU2NhbGUoY2hhcnQsIGlkLCByYW5nZSwgdHJhbnNpdGlvbik7XG4gICAgY2hhcnQucmVzZXRab29tID0gKHRyYW5zaXRpb24pID0+IHJlc2V0Wm9vbShjaGFydCwgdHJhbnNpdGlvbik7XG4gICAgY2hhcnQuZ2V0Wm9vbUxldmVsID0gKCkgPT4gZ2V0Wm9vbUxldmVsKGNoYXJ0KTtcbiAgICBjaGFydC5nZXRJbml0aWFsU2NhbGVCb3VuZHMgPSAoKSA9PiBnZXRJbml0aWFsU2NhbGVCb3VuZHMoY2hhcnQpO1xuICAgIGNoYXJ0LmdldFpvb21lZFNjYWxlQm91bmRzID0gKCkgPT4gZ2V0Wm9vbWVkU2NhbGVCb3VuZHMoY2hhcnQpO1xuICAgIGNoYXJ0LmlzWm9vbWVkT3JQYW5uZWQgPSAoKSA9PiBpc1pvb21lZE9yUGFubmVkKGNoYXJ0KTtcbiAgICBjaGFydC5pc1pvb21pbmdPclBhbm5pbmcgPSAoKSA9PiBpc1pvb21pbmdPclBhbm5pbmcoY2hhcnQpO1xuICB9LFxuICBiZWZvcmVFdmVudChjaGFydCwge2V2ZW50fSkge1xuICAgIGlmIChpc1pvb21pbmdPclBhbm5pbmcoY2hhcnQpKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChldmVudC50eXBlID09PSAnY2xpY2snIHx8IGV2ZW50LnR5cGUgPT09ICdtb3VzZXVwJykge1xuICAgICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gICAgICBpZiAoc3RhdGUuZmlsdGVyTmV4dENsaWNrKSB7XG4gICAgICAgIHN0YXRlLmZpbHRlck5leHRDbGljayA9IGZhbHNlO1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgICB9XG4gICAgfVxuICB9LFxuICBiZWZvcmVVcGRhdGU6IGZ1bmN0aW9uKGNoYXJ0LCBhcmdzLCBvcHRpb25zKSB7XG4gICAgY29uc3Qgc3RhdGUgPSBnZXRTdGF0ZShjaGFydCk7XG4gICAgY29uc3QgcHJldmlvdXNPcHRpb25zID0gc3RhdGUub3B0aW9ucztcbiAgICBzdGF0ZS5vcHRpb25zID0gb3B0aW9ucztcbiAgICBpZiAoaGFtbWVyT3B0aW9uc0NoYW5nZWQocHJldmlvdXNPcHRpb25zLCBvcHRpb25zKSkge1xuICAgICAgc3RvcEhhbW1lcihjaGFydCk7XG4gICAgICBzdGFydEhhbW1lcihjaGFydCwgb3B0aW9ucyk7XG4gICAgfVxuICAgIGFkZExpc3RlbmVycyhjaGFydCwgb3B0aW9ucyk7XG4gIH0sXG4gIGJlZm9yZURhdGFzZXRzRHJhdyhjaGFydCwgX2FyZ3MsIG9wdGlvbnMpIHtcbiAgICBkcmF3KGNoYXJ0LCAnYmVmb3JlRGF0YXNldHNEcmF3Jywgb3B0aW9ucyk7XG4gIH0sXG4gIGFmdGVyRGF0YXNldHNEcmF3KGNoYXJ0LCBfYXJncywgb3B0aW9ucykge1xuICAgIGRyYXcoY2hhcnQsICdhZnRlckRhdGFzZXRzRHJhdycsIG9wdGlvbnMpO1xuICB9LFxuICBiZWZvcmVEcmF3KGNoYXJ0LCBfYXJncywgb3B0aW9ucykge1xuICAgIGRyYXcoY2hhcnQsICdiZWZvcmVEcmF3Jywgb3B0aW9ucyk7XG4gIH0sXG4gIGFmdGVyRHJhdyhjaGFydCwgX2FyZ3MsIG9wdGlvbnMpIHtcbiAgICBkcmF3KGNoYXJ0LCAnYWZ0ZXJEcmF3Jywgb3B0aW9ucyk7XG4gIH0sXG4gIHN0b3A6IGZ1bmN0aW9uKGNoYXJ0KSB7XG4gICAgcmVtb3ZlTGlzdGVuZXJzKGNoYXJ0KTtcbiAgICBpZiAoSGFtbWVyKSB7XG4gICAgICBzdG9wSGFtbWVyKGNoYXJ0KTtcbiAgICB9XG4gICAgcmVtb3ZlU3RhdGUoY2hhcnQpO1xuICB9LFxuICBwYW5GdW5jdGlvbnMsXG4gIHpvb21GdW5jdGlvbnMsXG4gIHpvb21SZWN0RnVuY3Rpb25zLFxufTtcblxuZXhwb3J0IHsgcGx1Z2luIGFzIGRlZmF1bHQsIHBhbiwgcmVzZXRab29tLCB6b29tLCB6b29tUmVjdCwgem9vbVNjYWxlIH07XG4iXSwibmFtZXMiOlsiem9vbSIsInBhbiJdLCJtYXBwaW5ncyI6Ijs7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFTQSxNQUFNLGlCQUFpQixVQUFRLFFBQVEsS0FBSyxXQUFXLEtBQUs7QUFDNUQsTUFBTSxhQUFhLENBQUMsS0FBSyxVQUFVLE9BQU8sTUFBTSxNQUFNLEtBQUs7QUFDM0QsTUFBTSxnQkFBZ0IsQ0FBQyxLQUFLLFVBQVUsT0FBTyxDQUFDLE1BQU0sTUFBTSxLQUFLO0FBQy9ELFNBQVMsaUJBQWlCLE1BQU0sS0FBSyxPQUFPO0FBQzFDLE1BQUksU0FBUyxRQUFXO0FBQ3RCLFdBQU87QUFBQSxFQUNULFdBQVcsT0FBTyxTQUFTLFVBQVU7QUFDbkMsV0FBTyxLQUFLLFFBQVEsR0FBRyxNQUFNO0FBQUEsRUFDL0IsV0FBVyxPQUFPLFNBQVMsWUFBWTtBQUNyQyxXQUFPLEtBQUssRUFBQyxNQUFLLENBQUMsRUFBRSxRQUFRLEdBQUcsTUFBTTtBQUFBLEVBQ3hDO0FBQ0EsU0FBTztBQUNUO0FBQ0EsU0FBUyxrQkFBa0IsTUFBTSxPQUFPO0FBQ3RDLE1BQUksT0FBTyxTQUFTLFlBQVk7QUFDOUIsV0FBTyxLQUFLLEVBQUMsTUFBSyxDQUFDO0FBQUEsRUFDckI7QUFDQSxNQUFJLE9BQU8sU0FBUyxVQUFVO0FBQzVCLFdBQU8sRUFBQyxHQUFHLEtBQUssUUFBUSxHQUFHLE1BQU0sSUFBSSxHQUFHLEtBQUssUUFBUSxHQUFHLE1BQU0sR0FBRTtBQUFBLEVB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
