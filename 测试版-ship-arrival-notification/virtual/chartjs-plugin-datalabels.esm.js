import { ArcElement, PointElement, BarElement } from './chart.js';
import {
  a4 as merge,
  k as isNullOrUndef,
  i as isObject,
  F as each,
  Q as callback,
  a as resolve,
  v as valueOrDefault,
  a0 as toFont,
  d as defaults$1,
  E as toPadding,
} from './helpers.dataset.js';
/*!
 * chartjs-plugin-datalabels v2.2.0
 * https://chartjs-plugin-datalabels.netlify.app
 * (c) 2017-2022 chartjs-plugin-datalabels contributors
 * Released under the MIT license
 */
var devicePixelRatio = (function () {
  if (typeof window !== 'undefined') {
    if (window.devicePixelRatio) {
      return window.devicePixelRatio;
    }
    var screen = window.screen;
    if (screen) {
      return (screen.deviceXDPI || 1) / (screen.logicalXDPI || 1);
    }
  }
  return 1;
})();
var utils = {
  // @todo move this in Chart.helpers.toTextLines
  toTextLines: function (inputs) {
    var lines = [];
    var input;
    inputs = [].concat(inputs);
    while (inputs.length) {
      input = inputs.pop();
      if (typeof input === 'string') {
        lines.unshift.apply(lines, input.split('\n'));
      } else if (Array.isArray(input)) {
        inputs.push.apply(inputs, input);
      } else if (!isNullOrUndef(inputs)) {
        lines.unshift('' + input);
      }
    }
    return lines;
  },
  // @todo move this in Chart.helpers.canvas.textSize
  // @todo cache calls of measureText if font doesn't change?!
  textSize: function (ctx, lines, font) {
    var items = [].concat(lines);
    var ilen = items.length;
    var prev = ctx.font;
    var width = 0;
    var i;
    ctx.font = font.string;
    for (i = 0; i < ilen; ++i) {
      width = Math.max(ctx.measureText(items[i]).width, width);
    }
    ctx.font = prev;
    return {
      height: ilen * font.lineHeight,
      width,
    };
  },
  /**
   * Returns value bounded by min and max. This is equivalent to max(min, min(value, max)).
   * @todo move this method in Chart.helpers.bound
   * https://doc.qt.io/qt-5/qtglobal.html#qBound
   */
  bound: function (min, value, max) {
    return Math.max(min, Math.min(value, max));
  },
  /**
   * Returns an array of pair [value, state] where state is:
   * * -1: value is only in a0 (removed)
   * *  1: value is only in a1 (added)
   */
  arrayDiff: function (a0, a1) {
    var prev = a0.slice();
    var updates = [];
    var i, j, ilen, v;
    for (i = 0, ilen = a1.length; i < ilen; ++i) {
      v = a1[i];
      j = prev.indexOf(v);
      if (j === -1) {
        updates.push([v, 1]);
      } else {
        prev.splice(j, 1);
      }
    }
    for (i = 0, ilen = prev.length; i < ilen; ++i) {
      updates.push([prev[i], -1]);
    }
    return updates;
  },
  /**
   * https://github.com/chartjs/chartjs-plugin-datalabels/issues/70
   */
  rasterize: function (v) {
    return Math.round(v * devicePixelRatio) / devicePixelRatio;
  },
};
function orient(point, origin) {
  var x0 = origin.x;
  var y0 = origin.y;
  if (x0 === null) {
    return { x: 0, y: -1 };
  }
  if (y0 === null) {
    return { x: 1, y: 0 };
  }
  var dx = point.x - x0;
  var dy = point.y - y0;
  var ln = Math.sqrt(dx * dx + dy * dy);
  return {
    x: ln ? dx / ln : 0,
    y: ln ? dy / ln : -1,
  };
}
function aligned(x, y, vx, vy, align) {
  switch (align) {
    case 'center':
      vx = vy = 0;
      break;
    case 'bottom':
      vx = 0;
      vy = 1;
      break;
    case 'right':
      vx = 1;
      vy = 0;
      break;
    case 'left':
      vx = -1;
      vy = 0;
      break;
    case 'top':
      vx = 0;
      vy = -1;
      break;
    case 'start':
      vx = -vx;
      vy = -vy;
      break;
    case 'end':
      break;
    default:
      align *= Math.PI / 180;
      vx = Math.cos(align);
      vy = Math.sin(align);
      break;
  }
  return {
    x,
    y,
    vx,
    vy,
  };
}
var R_INSIDE = 0;
var R_LEFT = 1;
var R_RIGHT = 2;
var R_BOTTOM = 4;
var R_TOP = 8;
function region(x, y, rect) {
  var res = R_INSIDE;
  if (x < rect.left) {
    res |= R_LEFT;
  } else if (x > rect.right) {
    res |= R_RIGHT;
  }
  if (y < rect.top) {
    res |= R_TOP;
  } else if (y > rect.bottom) {
    res |= R_BOTTOM;
  }
  return res;
}
function clipped(segment, area) {
  var x0 = segment.x0;
  var y0 = segment.y0;
  var x1 = segment.x1;
  var y1 = segment.y1;
  var r0 = region(x0, y0, area);
  var r1 = region(x1, y1, area);
  var r, x, y;
  while (true) {
    if (!(r0 | r1) || r0 & r1) {
      break;
    }
    r = r0 || r1;
    if (r & R_TOP) {
      x = x0 + ((x1 - x0) * (area.top - y0)) / (y1 - y0);
      y = area.top;
    } else if (r & R_BOTTOM) {
      x = x0 + ((x1 - x0) * (area.bottom - y0)) / (y1 - y0);
      y = area.bottom;
    } else if (r & R_RIGHT) {
      y = y0 + ((y1 - y0) * (area.right - x0)) / (x1 - x0);
      x = area.right;
    } else if (r & R_LEFT) {
      y = y0 + ((y1 - y0) * (area.left - x0)) / (x1 - x0);
      x = area.left;
    }
    if (r === r0) {
      x0 = x;
      y0 = y;
      r0 = region(x0, y0, area);
    } else {
      x1 = x;
      y1 = y;
      r1 = region(x1, y1, area);
    }
  }
  return {
    x0,
    x1,
    y0,
    y1,
  };
}
function compute$1(range, config) {
  var anchor = config.anchor;
  var segment = range;
  var x, y;
  if (config.clamp) {
    segment = clipped(segment, config.area);
  }
  if (anchor === 'start') {
    x = segment.x0;
    y = segment.y0;
  } else if (anchor === 'end') {
    x = segment.x1;
    y = segment.y1;
  } else {
    x = (segment.x0 + segment.x1) / 2;
    y = (segment.y0 + segment.y1) / 2;
  }
  return aligned(x, y, range.vx, range.vy, config.align);
}
var positioners = {
  arc: function (el, config) {
    var angle = (el.startAngle + el.endAngle) / 2;
    var vx = Math.cos(angle);
    var vy = Math.sin(angle);
    var r0 = el.innerRadius;
    var r1 = el.outerRadius;
    return compute$1(
      {
        x0: el.x + vx * r0,
        y0: el.y + vy * r0,
        x1: el.x + vx * r1,
        y1: el.y + vy * r1,
        vx,
        vy,
      },
      config,
    );
  },
  point: function (el, config) {
    var v = orient(el, config.origin);
    var rx = v.x * el.options.radius;
    var ry = v.y * el.options.radius;
    return compute$1(
      {
        x0: el.x - rx,
        y0: el.y - ry,
        x1: el.x + rx,
        y1: el.y + ry,
        vx: v.x,
        vy: v.y,
      },
      config,
    );
  },
  bar: function (el, config) {
    var v = orient(el, config.origin);
    var x = el.x;
    var y = el.y;
    var sx = 0;
    var sy = 0;
    if (el.horizontal) {
      x = Math.min(el.x, el.base);
      sx = Math.abs(el.base - el.x);
    } else {
      y = Math.min(el.y, el.base);
      sy = Math.abs(el.base - el.y);
    }
    return compute$1(
      {
        x0: x,
        y0: y + sy,
        x1: x + sx,
        y1: y,
        vx: v.x,
        vy: v.y,
      },
      config,
    );
  },
  fallback: function (el, config) {
    var v = orient(el, config.origin);
    return compute$1(
      {
        x0: el.x,
        y0: el.y,
        x1: el.x + (el.width || 0),
        y1: el.y + (el.height || 0),
        vx: v.x,
        vy: v.y,
      },
      config,
    );
  },
};
var rasterize = utils.rasterize;
function boundingRects(model) {
  var borderWidth = model.borderWidth || 0;
  var padding = model.padding;
  var th = model.size.height;
  var tw = model.size.width;
  var tx = -tw / 2;
  var ty = -th / 2;
  return {
    frame: {
      x: tx - padding.left - borderWidth,
      y: ty - padding.top - borderWidth,
      w: tw + padding.width + borderWidth * 2,
      h: th + padding.height + borderWidth * 2,
    },
    text: {
      x: tx,
      y: ty,
      w: tw,
      h: th,
    },
  };
}
function getScaleOrigin(el, context) {
  var scale = context.chart.getDatasetMeta(context.datasetIndex).vScale;
  if (!scale) {
    return null;
  }
  if (scale.xCenter !== void 0 && scale.yCenter !== void 0) {
    return { x: scale.xCenter, y: scale.yCenter };
  }
  var pixel = scale.getBasePixel();
  return el.horizontal ? { x: pixel, y: null } : { x: null, y: pixel };
}
function getPositioner(el) {
  if (el instanceof ArcElement) {
    return positioners.arc;
  }
  if (el instanceof PointElement) {
    return positioners.point;
  }
  if (el instanceof BarElement) {
    return positioners.bar;
  }
  return positioners.fallback;
}
function drawRoundedRect(ctx, x, y, w, h, radius) {
  var HALF_PI = Math.PI / 2;
  if (radius) {
    var r = Math.min(radius, h / 2, w / 2);
    var left = x + r;
    var top = y + r;
    var right = x + w - r;
    var bottom = y + h - r;
    ctx.moveTo(x, top);
    if (left < right && top < bottom) {
      ctx.arc(left, top, r, -Math.PI, -HALF_PI);
      ctx.arc(right, top, r, -HALF_PI, 0);
      ctx.arc(right, bottom, r, 0, HALF_PI);
      ctx.arc(left, bottom, r, HALF_PI, Math.PI);
    } else if (left < right) {
      ctx.moveTo(left, y);
      ctx.arc(right, top, r, -HALF_PI, HALF_PI);
      ctx.arc(left, top, r, HALF_PI, Math.PI + HALF_PI);
    } else if (top < bottom) {
      ctx.arc(left, top, r, -Math.PI, 0);
      ctx.arc(left, bottom, r, 0, Math.PI);
    } else {
      ctx.arc(left, top, r, -Math.PI, Math.PI);
    }
    ctx.closePath();
    ctx.moveTo(x, y);
  } else {
    ctx.rect(x, y, w, h);
  }
}
function drawFrame(ctx, rect, model) {
  var bgColor = model.backgroundColor;
  var borderColor = model.borderColor;
  var borderWidth = model.borderWidth;
  if (!bgColor && (!borderColor || !borderWidth)) {
    return;
  }
  ctx.beginPath();
  drawRoundedRect(
    ctx,
    rasterize(rect.x) + borderWidth / 2,
    rasterize(rect.y) + borderWidth / 2,
    rasterize(rect.w) - borderWidth,
    rasterize(rect.h) - borderWidth,
    model.borderRadius,
  );
  ctx.closePath();
  if (bgColor) {
    ctx.fillStyle = bgColor;
    ctx.fill();
  }
  if (borderColor && borderWidth) {
    ctx.strokeStyle = borderColor;
    ctx.lineWidth = borderWidth;
    ctx.lineJoin = 'miter';
    ctx.stroke();
  }
}
function textGeometry(rect, align, font) {
  var h = font.lineHeight;
  var w = rect.w;
  var x = rect.x;
  var y = rect.y + h / 2;
  if (align === 'center') {
    x += w / 2;
  } else if (align === 'end' || align === 'right') {
    x += w;
  }
  return {
    h,
    w,
    x,
    y,
  };
}
function drawTextLine(ctx, text, cfg) {
  var shadow = ctx.shadowBlur;
  var stroked = cfg.stroked;
  var x = rasterize(cfg.x);
  var y = rasterize(cfg.y);
  var w = rasterize(cfg.w);
  if (stroked) {
    ctx.strokeText(text, x, y, w);
  }
  if (cfg.filled) {
    if (shadow && stroked) {
      ctx.shadowBlur = 0;
    }
    ctx.fillText(text, x, y, w);
    if (shadow && stroked) {
      ctx.shadowBlur = shadow;
    }
  }
}
function drawText(ctx, lines, rect, model) {
  var align = model.textAlign;
  var color = model.color;
  var filled = !!color;
  var font = model.font;
  var ilen = lines.length;
  var strokeColor = model.textStrokeColor;
  var strokeWidth = model.textStrokeWidth;
  var stroked = strokeColor && strokeWidth;
  var i;
  if (!ilen || (!filled && !stroked)) {
    return;
  }
  rect = textGeometry(rect, align, font);
  ctx.font = font.string;
  ctx.textAlign = align;
  ctx.textBaseline = 'middle';
  ctx.shadowBlur = model.textShadowBlur;
  ctx.shadowColor = model.textShadowColor;
  if (filled) {
    ctx.fillStyle = color;
  }
  if (stroked) {
    ctx.lineJoin = 'round';
    ctx.lineWidth = strokeWidth;
    ctx.strokeStyle = strokeColor;
  }
  for (i = 0, ilen = lines.length; i < ilen; ++i) {
    drawTextLine(ctx, lines[i], {
      stroked,
      filled,
      w: rect.w,
      x: rect.x,
      y: rect.y + rect.h * i,
    });
  }
}
var Label = function (config, ctx, el, index) {
  var me = this;
  me._config = config;
  me._index = index;
  me._model = null;
  me._rects = null;
  me._ctx = ctx;
  me._el = el;
};
merge(Label.prototype, {
  /**
   * @private
   */
  _modelize: function (display, lines, config, context) {
    var me = this;
    var index = me._index;
    var font = toFont(resolve([config.font, {}], context, index));
    var color = resolve([config.color, defaults$1.color], context, index);
    return {
      align: resolve([config.align, 'center'], context, index),
      anchor: resolve([config.anchor, 'center'], context, index),
      area: context.chart.chartArea,
      backgroundColor: resolve([config.backgroundColor, null], context, index),
      borderColor: resolve([config.borderColor, null], context, index),
      borderRadius: resolve([config.borderRadius, 0], context, index),
      borderWidth: resolve([config.borderWidth, 0], context, index),
      clamp: resolve([config.clamp, false], context, index),
      clip: resolve([config.clip, false], context, index),
      color,
      display,
      font,
      lines,
      offset: resolve([config.offset, 4], context, index),
      opacity: resolve([config.opacity, 1], context, index),
      origin: getScaleOrigin(me._el, context),
      padding: toPadding(resolve([config.padding, 4], context, index)),
      positioner: getPositioner(me._el),
      rotation: resolve([config.rotation, 0], context, index) * (Math.PI / 180),
      size: utils.textSize(me._ctx, lines, font),
      textAlign: resolve([config.textAlign, 'start'], context, index),
      textShadowBlur: resolve([config.textShadowBlur, 0], context, index),
      textShadowColor: resolve([config.textShadowColor, color], context, index),
      textStrokeColor: resolve([config.textStrokeColor, color], context, index),
      textStrokeWidth: resolve([config.textStrokeWidth, 0], context, index),
    };
  },
  update: function (context) {
    var me = this;
    var model = null;
    var rects = null;
    var index = me._index;
    var config = me._config;
    var value, label, lines;
    var display = resolve([config.display, true], context, index);
    if (display) {
      value = context.dataset.data[index];
      label = valueOrDefault(callback(config.formatter, [value, context]), value);
      lines = isNullOrUndef(label) ? [] : utils.toTextLines(label);
      if (lines.length) {
        model = me._modelize(display, lines, config, context);
        rects = boundingRects(model);
      }
    }
    me._model = model;
    me._rects = rects;
  },
  geometry: function () {
    return this._rects ? this._rects.frame : {};
  },
  rotation: function () {
    return this._model ? this._model.rotation : 0;
  },
  visible: function () {
    return this._model && this._model.opacity;
  },
  model: function () {
    return this._model;
  },
  draw: function (chart, center) {
    var me = this;
    var ctx = chart.ctx;
    var model = me._model;
    var rects = me._rects;
    var area;
    if (!this.visible()) {
      return;
    }
    ctx.save();
    if (model.clip) {
      area = model.area;
      ctx.beginPath();
      ctx.rect(area.left, area.top, area.right - area.left, area.bottom - area.top);
      ctx.clip();
    }
    ctx.globalAlpha = utils.bound(0, model.opacity, 1);
    ctx.translate(rasterize(center.x), rasterize(center.y));
    ctx.rotate(model.rotation);
    drawFrame(ctx, rects.frame, model);
    drawText(ctx, model.lines, rects.text, model);
    ctx.restore();
  },
});
var MIN_INTEGER = Number.MIN_SAFE_INTEGER || -9007199254740991;
var MAX_INTEGER = Number.MAX_SAFE_INTEGER || 9007199254740991;
function rotated(point, center, angle) {
  var cos = Math.cos(angle);
  var sin = Math.sin(angle);
  var cx = center.x;
  var cy = center.y;
  return {
    x: cx + cos * (point.x - cx) - sin * (point.y - cy),
    y: cy + sin * (point.x - cx) + cos * (point.y - cy),
  };
}
function projected(points, axis) {
  var min = MAX_INTEGER;
  var max = MIN_INTEGER;
  var origin = axis.origin;
  var i, pt, vx, vy, dp;
  for (i = 0; i < points.length; ++i) {
    pt = points[i];
    vx = pt.x - origin.x;
    vy = pt.y - origin.y;
    dp = axis.vx * vx + axis.vy * vy;
    min = Math.min(min, dp);
    max = Math.max(max, dp);
  }
  return {
    min,
    max,
  };
}
function toAxis(p0, p1) {
  var vx = p1.x - p0.x;
  var vy = p1.y - p0.y;
  var ln = Math.sqrt(vx * vx + vy * vy);
  return {
    vx: (p1.x - p0.x) / ln,
    vy: (p1.y - p0.y) / ln,
    origin: p0,
    ln,
  };
}
var HitBox = function () {
  this._rotation = 0;
  this._rect = {
    x: 0,
    y: 0,
    w: 0,
    h: 0,
  };
};
merge(HitBox.prototype, {
  center: function () {
    var r = this._rect;
    return {
      x: r.x + r.w / 2,
      y: r.y + r.h / 2,
    };
  },
  update: function (center, rect, rotation) {
    this._rotation = rotation;
    this._rect = {
      x: rect.x + center.x,
      y: rect.y + center.y,
      w: rect.w,
      h: rect.h,
    };
  },
  contains: function (point) {
    var me = this;
    var margin = 1;
    var rect = me._rect;
    point = rotated(point, me.center(), -me._rotation);
    return !(
      point.x < rect.x - margin ||
      point.y < rect.y - margin ||
      point.x > rect.x + rect.w + margin * 2 ||
      point.y > rect.y + rect.h + margin * 2
    );
  },
  // Separating Axis Theorem
  // https://gamedevelopment.tutsplus.com/tutorials/collision-detection-using-the-separating-axis-theorem--gamedev-169
  intersects: function (other) {
    var r0 = this._points();
    var r1 = other._points();
    var axes = [toAxis(r0[0], r0[1]), toAxis(r0[0], r0[3])];
    var i, pr0, pr1;
    if (this._rotation !== other._rotation) {
      axes.push(toAxis(r1[0], r1[1]), toAxis(r1[0], r1[3]));
    }
    for (i = 0; i < axes.length; ++i) {
      pr0 = projected(r0, axes[i]);
      pr1 = projected(r1, axes[i]);
      if (pr0.max < pr1.min || pr1.max < pr0.min) {
        return false;
      }
    }
    return true;
  },
  /**
   * @private
   */
  _points: function () {
    var me = this;
    var rect = me._rect;
    var angle = me._rotation;
    var center = me.center();
    return [
      rotated({ x: rect.x, y: rect.y }, center, angle),
      rotated({ x: rect.x + rect.w, y: rect.y }, center, angle),
      rotated({ x: rect.x + rect.w, y: rect.y + rect.h }, center, angle),
      rotated({ x: rect.x, y: rect.y + rect.h }, center, angle),
    ];
  },
});
function coordinates(el, model, geometry) {
  var point = model.positioner(el, model);
  var vx = point.vx;
  var vy = point.vy;
  if (!vx && !vy) {
    return { x: point.x, y: point.y };
  }
  var w = geometry.w;
  var h = geometry.h;
  var rotation = model.rotation;
  var dx = Math.abs((w / 2) * Math.cos(rotation)) + Math.abs((h / 2) * Math.sin(rotation));
  var dy = Math.abs((w / 2) * Math.sin(rotation)) + Math.abs((h / 2) * Math.cos(rotation));
  var vs = 1 / Math.max(Math.abs(vx), Math.abs(vy));
  dx *= vx * vs;
  dy *= vy * vs;
  dx += model.offset * vx;
  dy += model.offset * vy;
  return {
    x: point.x + dx,
    y: point.y + dy,
  };
}
function collide(labels, collider) {
  var i, j, s0, s1;
  for (i = labels.length - 1; i >= 0; --i) {
    s0 = labels[i].$layout;
    for (j = i - 1; j >= 0 && s0._visible; --j) {
      s1 = labels[j].$layout;
      if (s1._visible && s0._box.intersects(s1._box)) {
        collider(s0, s1);
      }
    }
  }
  return labels;
}
function compute(labels) {
  var i, ilen, label, state, geometry, center, proxy;
  for (i = 0, ilen = labels.length; i < ilen; ++i) {
    label = labels[i];
    state = label.$layout;
    if (state._visible) {
      proxy = new Proxy(label._el, { get: (el, p) => el.getProps([p], true)[p] });
      geometry = label.geometry();
      center = coordinates(proxy, label.model(), geometry);
      state._box.update(center, geometry, label.rotation());
    }
  }
  return collide(labels, function (s0, s1) {
    var h0 = s0._hidable;
    var h1 = s1._hidable;
    if ((h0 && h1) || h1) {
      s1._visible = false;
    } else if (h0) {
      s0._visible = false;
    }
  });
}
var layout = {
  prepare: function (datasets) {
    var labels = [];
    var i, j, ilen, jlen, label;
    for (i = 0, ilen = datasets.length; i < ilen; ++i) {
      for (j = 0, jlen = datasets[i].length; j < jlen; ++j) {
        label = datasets[i][j];
        labels.push(label);
        label.$layout = {
          _box: new HitBox(),
          _hidable: false,
          _visible: true,
          _set: i,
          _idx: label._index,
        };
      }
    }
    labels.sort(function (a, b) {
      var sa = a.$layout;
      var sb = b.$layout;
      return sa._idx === sb._idx ? sb._set - sa._set : sb._idx - sa._idx;
    });
    this.update(labels);
    return labels;
  },
  update: function (labels) {
    var dirty = false;
    var i, ilen, label, model, state;
    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      label = labels[i];
      model = label.model();
      state = label.$layout;
      state._hidable = model && model.display === 'auto';
      state._visible = label.visible();
      dirty |= state._hidable;
    }
    if (dirty) {
      compute(labels);
    }
  },
  lookup: function (labels, point) {
    var i, state;
    for (i = labels.length - 1; i >= 0; --i) {
      state = labels[i].$layout;
      if (state && state._visible && state._box.contains(point)) {
        return labels[i];
      }
    }
    return null;
  },
  draw: function (chart, labels) {
    var i, ilen, label, state, geometry, center;
    for (i = 0, ilen = labels.length; i < ilen; ++i) {
      label = labels[i];
      state = label.$layout;
      if (state._visible) {
        geometry = label.geometry();
        center = coordinates(label._el, label.model(), geometry);
        state._box.update(center, geometry, label.rotation());
        label.draw(chart, center);
      }
    }
  },
};
var formatter = function (value) {
  if (isNullOrUndef(value)) {
    return null;
  }
  var label = value;
  var keys, klen, k;
  if (isObject(value)) {
    if (!isNullOrUndef(value.label)) {
      label = value.label;
    } else if (!isNullOrUndef(value.r)) {
      label = value.r;
    } else {
      label = '';
      keys = Object.keys(value);
      for (k = 0, klen = keys.length; k < klen; ++k) {
        label += (k !== 0 ? ', ' : '') + keys[k] + ': ' + value[keys[k]];
      }
    }
  }
  return '' + label;
};
var defaults = {
  align: 'center',
  anchor: 'center',
  backgroundColor: null,
  borderColor: null,
  borderRadius: 0,
  borderWidth: 0,
  clamp: false,
  clip: false,
  color: void 0,
  display: true,
  font: {
    family: void 0,
    lineHeight: 1.2,
    size: void 0,
    style: void 0,
    weight: null,
  },
  formatter,
  labels: void 0,
  listeners: {},
  offset: 4,
  opacity: 1,
  padding: {
    top: 4,
    right: 4,
    bottom: 4,
    left: 4,
  },
  rotation: 0,
  textAlign: 'start',
  textStrokeColor: void 0,
  textStrokeWidth: 0,
  textShadowBlur: 0,
  textShadowColor: void 0,
};
var EXPANDO_KEY = '$datalabels';
var DEFAULT_KEY = '$default';
function configure(dataset, options) {
  var override = dataset.datalabels;
  var listeners = {};
  var configs = [];
  var labels, keys;
  if (override === false) {
    return null;
  }
  if (override === true) {
    override = {};
  }
  options = merge({}, [options, override]);
  labels = options.labels || {};
  keys = Object.keys(labels);
  delete options.labels;
  if (keys.length) {
    keys.forEach(function (key) {
      if (labels[key]) {
        configs.push(merge({}, [options, labels[key], { _key: key }]));
      }
    });
  } else {
    configs.push(options);
  }
  listeners = configs.reduce(function (target, config) {
    each(config.listeners || {}, function (fn, event) {
      target[event] = target[event] || {};
      target[event][config._key || DEFAULT_KEY] = fn;
    });
    delete config.listeners;
    return target;
  }, {});
  return {
    labels: configs,
    listeners,
  };
}
function dispatchEvent(chart, listeners, label, event) {
  if (!listeners) {
    return;
  }
  var context = label.$context;
  var groups = label.$groups;
  var callback$1;
  if (!listeners[groups._set]) {
    return;
  }
  callback$1 = listeners[groups._set][groups._key];
  if (!callback$1) {
    return;
  }
  if (callback(callback$1, [context, event]) === true) {
    chart[EXPANDO_KEY]._dirty = true;
    label.update(context);
  }
}
function dispatchMoveEvents(chart, listeners, previous, label, event) {
  var enter, leave;
  if (!previous && !label) {
    return;
  }
  if (!previous) {
    enter = true;
  } else if (!label) {
    leave = true;
  } else if (previous !== label) {
    leave = enter = true;
  }
  if (leave) {
    dispatchEvent(chart, listeners.leave, previous, event);
  }
  if (enter) {
    dispatchEvent(chart, listeners.enter, label, event);
  }
}
function handleMoveEvents(chart, event) {
  var expando = chart[EXPANDO_KEY];
  var listeners = expando._listeners;
  var previous, label;
  if (!listeners.enter && !listeners.leave) {
    return;
  }
  if (event.type === 'mousemove') {
    label = layout.lookup(expando._labels, event);
  } else if (event.type !== 'mouseout') {
    return;
  }
  previous = expando._hovered;
  expando._hovered = label;
  dispatchMoveEvents(chart, listeners, previous, label, event);
}
function handleClickEvents(chart, event) {
  var expando = chart[EXPANDO_KEY];
  var handlers = expando._listeners.click;
  var label = handlers && layout.lookup(expando._labels, event);
  if (label) {
    dispatchEvent(chart, handlers, label, event);
  }
}
var plugin = {
  id: 'datalabels',
  defaults,
  beforeInit: function (chart) {
    chart[EXPANDO_KEY] = {
      _actives: [],
    };
  },
  beforeUpdate: function (chart) {
    var expando = chart[EXPANDO_KEY];
    expando._listened = false;
    expando._listeners = {};
    expando._datasets = [];
    expando._labels = [];
  },
  afterDatasetUpdate: function (chart, args, options) {
    var datasetIndex = args.index;
    var expando = chart[EXPANDO_KEY];
    var labels = (expando._datasets[datasetIndex] = []);
    var visible = chart.isDatasetVisible(datasetIndex);
    var dataset = chart.data.datasets[datasetIndex];
    var config = configure(dataset, options);
    var elements = args.meta.data || [];
    var ctx = chart.ctx;
    var i, j, ilen, jlen, cfg, key, el, label;
    ctx.save();
    for (i = 0, ilen = elements.length; i < ilen; ++i) {
      el = elements[i];
      el[EXPANDO_KEY] = [];
      if (visible && el && chart.getDataVisibility(i) && !el.skip) {
        for (j = 0, jlen = config.labels.length; j < jlen; ++j) {
          cfg = config.labels[j];
          key = cfg._key;
          label = new Label(cfg, ctx, el, i);
          label.$groups = {
            _set: datasetIndex,
            _key: key || DEFAULT_KEY,
          };
          label.$context = {
            active: false,
            chart,
            dataIndex: i,
            dataset,
            datasetIndex,
          };
          label.update(label.$context);
          el[EXPANDO_KEY].push(label);
          labels.push(label);
        }
      }
    }
    ctx.restore();
    merge(expando._listeners, config.listeners, {
      merger: function (event, target, source) {
        target[event] = target[event] || {};
        target[event][args.index] = source[event];
        expando._listened = true;
      },
    });
  },
  afterUpdate: function (chart) {
    chart[EXPANDO_KEY]._labels = layout.prepare(chart[EXPANDO_KEY]._datasets);
  },
  // Draw labels on top of all dataset elements
  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/29
  // https://github.com/chartjs/chartjs-plugin-datalabels/issues/32
  afterDatasetsDraw: function (chart) {
    layout.draw(chart, chart[EXPANDO_KEY]._labels);
  },
  beforeEvent: function (chart, args) {
    if (chart[EXPANDO_KEY]._listened) {
      var event = args.event;
      switch (event.type) {
        case 'mousemove':
        case 'mouseout':
          handleMoveEvents(chart, event);
          break;
        case 'click':
          handleClickEvents(chart, event);
          break;
      }
    }
  },
  afterEvent: function (chart) {
    var expando = chart[EXPANDO_KEY];
    var previous = expando._actives;
    var actives = (expando._actives = chart.getActiveElements());
    var updates = utils.arrayDiff(previous, actives);
    var i, ilen, j, jlen, update, label, labels;
    for (i = 0, ilen = updates.length; i < ilen; ++i) {
      update = updates[i];
      if (update[1]) {
        labels = update[0].element[EXPANDO_KEY] || [];
        for (j = 0, jlen = labels.length; j < jlen; ++j) {
          label = labels[j];
          label.$context.active = update[1] === 1;
          label.update(label.$context);
        }
      }
    }
    if (expando._dirty || updates.length) {
      layout.update(expando._labels);
      chart.render();
    }
    delete expando._dirty;
  },
};
export { plugin as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy5lc20uanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL25vZGVfbW9kdWxlcy8ucG5wbS9jaGFydGpzLXBsdWdpbi1kYXRhbGFiZWxzQDIuMi4wX2NoYXJ0LmpzQDQuNS4wL25vZGVfbW9kdWxlcy9jaGFydGpzLXBsdWdpbi1kYXRhbGFiZWxzL2Rpc3QvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy5lc20uanMiXSwic291cmNlc0NvbnRlbnQiOlsiLyohXG4gKiBjaGFydGpzLXBsdWdpbi1kYXRhbGFiZWxzIHYyLjIuMFxuICogaHR0cHM6Ly9jaGFydGpzLXBsdWdpbi1kYXRhbGFiZWxzLm5ldGxpZnkuYXBwXG4gKiAoYykgMjAxNy0yMDIyIGNoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMgY29udHJpYnV0b3JzXG4gKiBSZWxlYXNlZCB1bmRlciB0aGUgTUlUIGxpY2Vuc2VcbiAqL1xuaW1wb3J0IHsgaXNOdWxsT3JVbmRlZiwgbWVyZ2UsIHRvRm9udCwgcmVzb2x2ZSwgdG9QYWRkaW5nLCB2YWx1ZU9yRGVmYXVsdCwgY2FsbGJhY2ssIGlzT2JqZWN0LCBlYWNoIH0gZnJvbSAnY2hhcnQuanMvaGVscGVycyc7XG5pbXBvcnQgeyBkZWZhdWx0cyBhcyBkZWZhdWx0cyQxLCBBcmNFbGVtZW50LCBQb2ludEVsZW1lbnQsIEJhckVsZW1lbnQgfSBmcm9tICdjaGFydC5qcyc7XG5cbnZhciBkZXZpY2VQaXhlbFJhdGlvID0gKGZ1bmN0aW9uKCkge1xuICBpZiAodHlwZW9mIHdpbmRvdyAhPT0gJ3VuZGVmaW5lZCcpIHtcbiAgICBpZiAod2luZG93LmRldmljZVBpeGVsUmF0aW8pIHtcbiAgICAgIHJldHVybiB3aW5kb3cuZGV2aWNlUGl4ZWxSYXRpbztcbiAgICB9XG5cbiAgICAvLyBkZXZpY2VQaXhlbFJhdGlvIGlzIHVuZGVmaW5lZCBvbiBJRTEwXG4gICAgLy8gaHR0cHM6Ly9zdGFja292ZXJmbG93LmNvbS9hLzIwMjA0MTgwLzg4Mzc4ODdcbiAgICAvLyBodHRwczovL2dpdGh1Yi5jb20vY2hhcnRqcy9jaGFydGpzLXBsdWdpbi1kYXRhbGFiZWxzL2lzc3Vlcy84NVxuICAgIHZhciBzY3JlZW4gPSB3aW5kb3cuc2NyZWVuO1xuICAgIGlmIChzY3JlZW4pIHtcbiAgICAgIHJldHVybiAoc2NyZWVuLmRldmljZVhEUEkgfHwgMSkgLyAoc2NyZWVuLmxvZ2ljYWxYRFBJIHx8IDEpO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiAxO1xufSgpKTtcblxudmFyIHV0aWxzID0ge1xuICAvLyBAdG9kbyBtb3ZlIHRoaXMgaW4gQ2hhcnQuaGVscGVycy50b1RleHRMaW5lc1xuICB0b1RleHRMaW5lczogZnVuY3Rpb24oaW5wdXRzKSB7XG4gICAgdmFyIGxpbmVzID0gW107XG4gICAgdmFyIGlucHV0O1xuXG4gICAgaW5wdXRzID0gW10uY29uY2F0KGlucHV0cyk7XG4gICAgd2hpbGUgKGlucHV0cy5sZW5ndGgpIHtcbiAgICAgIGlucHV0ID0gaW5wdXRzLnBvcCgpO1xuICAgICAgaWYgKHR5cGVvZiBpbnB1dCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgbGluZXMudW5zaGlmdC5hcHBseShsaW5lcywgaW5wdXQuc3BsaXQoJ1xcbicpKTtcbiAgICAgIH0gZWxzZSBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICAgICAgaW5wdXRzLnB1c2guYXBwbHkoaW5wdXRzLCBpbnB1dCk7XG4gICAgICB9IGVsc2UgaWYgKCFpc051bGxPclVuZGVmKGlucHV0cykpIHtcbiAgICAgICAgbGluZXMudW5zaGlmdCgnJyArIGlucHV0KTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gbGluZXM7XG4gIH0sXG5cbiAgLy8gQHRvZG8gbW92ZSB0aGlzIGluIENoYXJ0LmhlbHBlcnMuY2FudmFzLnRleHRTaXplXG4gIC8vIEB0b2RvIGNhY2hlIGNhbGxzIG9mIG1lYXN1cmVUZXh0IGlmIGZvbnQgZG9lc24ndCBjaGFuZ2U/IVxuICB0ZXh0U2l6ZTogZnVuY3Rpb24oY3R4LCBsaW5lcywgZm9udCkge1xuICAgIHZhciBpdGVtcyA9IFtdLmNvbmNhdChsaW5lcyk7XG4gICAgdmFyIGlsZW4gPSBpdGVtcy5sZW5ndGg7XG4gICAgdmFyIHByZXYgPSBjdHguZm9udDtcbiAgICB2YXIgd2lkdGggPSAwO1xuICAgIHZhciBpO1xuXG4gICAgY3R4LmZvbnQgPSBmb250LnN0cmluZztcblxuICAgIGZvciAoaSA9IDA7IGkgPCBpbGVuOyArK2kpIHtcbiAgICAgIHdpZHRoID0gTWF0aC5tYXgoY3R4Lm1lYXN1cmVUZXh0KGl0ZW1zW2ldKS53aWR0aCwgd2lkdGgpO1xuICAgIH1cblxuICAgIGN0eC5mb250ID0gcHJldjtcblxuICAgIHJldHVybiB7XG4gICAgICBoZWlnaHQ6IGlsZW4gKiBmb250LmxpbmVIZWlnaHQsXG4gICAgICB3aWR0aDogd2lkdGhcbiAgICB9O1xuICB9LFxuXG4gIC8qKlxuICAgKiBSZXR1cm5zIHZhbHVlIGJvdW5kZWQgYnkgbWluIGFuZCBtYXguIFRoaXMgaXMgZXF1aXZhbGVudCB0byBtYXgobWluLCBtaW4odmFsdWUsIG1heCkpLlxuICAgKiBAdG9kbyBtb3ZlIHRoaXMgbWV0aG9kIGluIENoYXJ0LmhlbHBlcnMuYm91bmRcbiAgICogaHR0cHM6Ly9kb2MucXQuaW8vcXQtNS9xdGdsb2JhbC5odG1sI3FCb3VuZFxuICAgKi9cbiAgYm91bmQ6IGZ1bmN0aW9uKG1pbiwgdmFsdWUsIG1heCkge1xuICAgIHJldHVybiBNYXRoLm1heChtaW4sIE1hdGgubWluKHZhbHVlLCBtYXgpKTtcbiAgfSxcblxuICAvKipcbiAgICogUmV0dXJucyBhbiBhcnJheSBvZiBwYWlyIFt2YWx1ZSwgc3RhdGVdIHdoZXJlIHN0YXRlIGlzOlxuICAgKiAqIC0xOiB2YWx1ZSBpcyBvbmx5IGluIGEwIChyZW1vdmVkKVxuICAgKiAqICAxOiB2YWx1ZSBpcyBvbmx5IGluIGExIChhZGRlZClcbiAgICovXG4gIGFycmF5RGlmZjogZnVuY3Rpb24oYTAsIGExKSB7XG4gICAgdmFyIHByZXYgPSBhMC5zbGljZSgpO1xuICAgIHZhciB1cGRhdGVzID0gW107XG4gICAgdmFyIGksIGosIGlsZW4sIHY7XG5cbiAgICBmb3IgKGkgPSAwLCBpbGVuID0gYTEubGVuZ3RoOyBpIDwgaWxlbjsgKytpKSB7XG4gICAgICB2ID0gYTFbaV07XG4gICAgICBqID0gcHJldi5pbmRleE9mKHYpO1xuXG4gICAgICBpZiAoaiA9PT0gLTEpIHtcbiAgICAgICAgdXBkYXRlcy5wdXNoKFt2LCAxXSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBwcmV2LnNwbGljZShqLCAxKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBmb3IgKGkgPSAwLCBpbGVuID0gcHJldi5sZW5ndGg7IGkgPCBpbGVuOyArK2kpIHtcbiAgICAgIHVwZGF0ZXMucHVzaChbcHJldltpXSwgLTFdKTtcbiAgICB9XG5cbiAgICByZXR1cm4gdXBkYXRlcztcbiAgfSxcblxuICAvKipcbiAgICogaHR0cHM6Ly9naXRodWIuY29tL2NoYXJ0anMvY2hhcnRqcy1wbHVnaW4tZGF0YWxhYmVscy9pc3N1ZXMvNzBcbiAgICovXG4gIHJhc3Rlcml6ZTogZnVuY3Rpb24odikge1xuICAgIHJldHVybiBNYXRoLnJvdW5kKHYgKiBkZXZpY2VQaXhlbFJhdGlvKSAvIGRldmljZVBpeGVsUmF0aW87XG4gIH1cbn07XG5cbmZ1bmN0aW9uIG9yaWVudChwb2ludCwgb3JpZ2luKSB7XG4gIHZhciB4MCA9IG9yaWdpbi54O1xuICB2YXIgeTAgPSBvcmlnaW4ueTtcblxuICBpZiAoeDAgPT09IG51bGwpIHtcbiAgICByZXR1cm4ge3g6IDAsIHk6IC0xfTtcbiAgfVxuICBpZiAoeTAgPT09IG51bGwpIHtcbiAgICByZXR1cm4ge3g6IDEsIHk6IDB9O1xuICB9XG5cbiAgdmFyIGR4ID0gcG9pbnQueCAtIHgwO1xuICB2YXIgZHkgPSBwb2ludC55IC0geTA7XG4gIHZhciBsbiA9IE1hdGguc3FydChkeCAqIGR4ICsgZHkgKiBkeSk7XG5cbiAgcmV0dXJuIHtcbiAgICB4OiBsbiA/IGR4IC8gbG4gOiAwLFxuICAgIHk6IGxuID8gZHkgLyBsbiA6IC0xXG4gIH07XG59XG5cbmZ1bmN0aW9uIGFsaWduZWQoeCwgeSwgdngsIHZ5LCBhbGlnbikge1xuICBzd2l0Y2ggKGFsaWduKSB7XG4gIGNhc2UgJ2NlbnRlcic6XG4gICAgdnggPSB2eSA9IDA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ2JvdHRvbSc6XG4gICAgdnggPSAwO1xuICAgIHZ5ID0gMTtcbiAgICBicmVhaztcbiAgY2FzZSAncmlnaHQnOlxuICAgIHZ4ID0gMTtcbiAgICB2eSA9IDA7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ2xlZnQnOlxuICAgIHZ4ID0gLTE7XG4gICAgdnkgPSAwO1xuICAgIGJyZWFrO1xuICBjYXNlICd0b3AnOlxuICAgIHZ4ID0gMDtcbiAgICB2eSA9IC0xO1xuICAgIGJyZWFrO1xuICBjYXNlICdzdGFydCc6XG4gICAgdnggPSAtdng7XG4gICAgdnkgPSAtdnk7XG4gICAgYnJlYWs7XG4gIGNhc2UgJ2VuZCc6XG4gICAgLy8ga2VlcCBuYXR1cmFsIG9yaWVudGF0aW9uXG4gICAgYnJlYWs7XG4gIGRlZmF1bHQ6XG4gICAgLy8gY2xvY2t3aXNlIHJvdGF0aW9uIChpbiBkZWdyZWUpXG4gICAgYWxpZ24gKj0gKE1hdGguUEkgLyAxODApO1xuICAgIHZ4ID0gTWF0aC5jb3MoYWxpZ24pO1xuICAgIHZ5ID0gTWF0aC5zaW4oYWxpZ24pO1xuICAgIGJyZWFrO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4OiB4LFxuICAgIHk6IHksXG4gICAgdng6IHZ4LFxuICAgIHZ5OiB2eVxuICB9O1xufVxuXG4vLyBMaW5lIGNsaXBwaW5nIChDb2hlbuKAk1N1dGhlcmxhbmQgYWxnb3JpdGhtKVxuLy8gaHR0cHM6Ly9lbi53aWtpcGVkaWEub3JnL3dpa2kvQ29oZW7igJNTdXRoZXJsYW5kX2FsZ29yaXRobVxuXG52YXIgUl9JTlNJREUgPSAwO1xudmFyIFJfTEVGVCA9IDE7XG52YXIgUl9SSUdIVCA9IDI7XG52YXIgUl9CT1RUT00gPSA0O1xudmFyIFJfVE9QID0gODtcblxuZnVuY3Rpb24gcmVnaW9uKHgsIHksIHJlY3QpIHtcbiAgdmFyIHJlcyA9IFJfSU5TSURFO1xuXG4gIGlmICh4IDwgcmVjdC5sZWZ0KSB7XG4gICAgcmVzIHw9IFJfTEVGVDtcbiAgfSBlbHNlIGlmICh4ID4gcmVjdC5yaWdodCkge1xuICAgIHJlcyB8PSBSX1JJR0hUO1xuICB9XG4gIGlmICh5IDwgcmVjdC50b3ApIHtcbiAgICByZXMgfD0gUl9UT1A7XG4gIH0gZWxzZSBpZiAoeSA+IHJlY3QuYm90dG9tKSB7XG4gICAgcmVzIHw9IFJfQk9UVE9NO1xuICB9XG5cbiAgcmV0dXJuIHJlcztcbn1cblxuZnVuY3Rpb24gY2xpcHBlZChzZWdtZW50LCBhcmVhKSB7XG4gIHZhciB4MCA9IHNlZ21lbnQueDA7XG4gIHZhciB5MCA9IHNlZ21lbnQueTA7XG4gIHZhciB4MSA9IHNlZ21lbnQueDE7XG4gIHZhciB5MSA9IHNlZ21lbnQueTE7XG4gIHZhciByMCA9IHJlZ2lvbih4MCwgeTAsIGFyZWEpO1xuICB2YXIgcjEgPSByZWdpb24oeDEsIHkxLCBhcmVhKTtcbiAgdmFyIHIsIHgsIHk7XG5cbiAgLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIG5vLWNvbnN0YW50LWNvbmRpdGlvblxuICB3aGlsZSAodHJ1ZSkge1xuICAgIGlmICghKHIwIHwgcjEpIHx8IChyMCAmIHIxKSkge1xuICAgICAgLy8gYm90aCBwb2ludHMgaW5zaWRlIG9yIG9uIHRoZSBzYW1lIHNpZGU6IG5vIGNsaXBwaW5nXG4gICAgICBicmVhaztcbiAgICB9XG5cbiAgICAvLyBhdCBsZWFzdCBvbmUgcG9pbnQgaXMgb3V0c2lkZVxuICAgIHIgPSByMCB8fCByMTtcblxuICAgIGlmIChyICYgUl9UT1ApIHtcbiAgICAgIHggPSB4MCArICh4MSAtIHgwKSAqIChhcmVhLnRvcCAtIHkwKSAvICh5MSAtIHkwKTtcbiAgICAgIHkgPSBhcmVhLnRvcDtcbiAgICB9IGVsc2UgaWYgKHIgJiBSX0JPVFRPTSkge1xuICAgICAgeCA9IHgwICsgKHgxIC0geDApICogKGFyZWEuYm90dG9tIC0geTApIC8gKHkxIC0geTApO1xuICAgICAgeSA9IGFyZWEuYm90dG9tO1xuICAgIH0gZWxzZSBpZiAociAmIFJfUklHSFQpIHtcbiAgICAgIHkgPSB5MCArICh5MSAtIHkwKSAqIChhcmVhLnJpZ2h0IC0geDApIC8gKHgxIC0geDApO1xuICAgICAgeCA9IGFyZWEucmlnaHQ7XG4gICAgfSBlbHNlIGlmIChyICYgUl9MRUZUKSB7XG4gICAgICB5ID0geTAgKyAoeTEgLSB5MCkgKiAoYXJlYS5sZWZ0IC0geDApIC8gKHgxIC0geDApO1xuICAgICAgeCA9IGFyZWEubGVmdDtcbiAgICB9XG5cbiAgICBpZiAociA9PT0gcjApIHtcbiAgICAgIHgwID0geDtcbiAgICAgIHkwID0geTtcbiAgICAgIHIwID0gcmVnaW9uKHgwLCB5MCwgYXJlYSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIHgxID0geDtcbiAgICAgIHkxID0geTtcbiAgICAgIHIxID0gcmVnaW9uKHgxLCB5MSwgYXJlYSk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHtcbiAgICB4MDogeDAsXG4gICAgeDE6IHgxLFxuICAgIHkwOiB5MCxcbiAgICB5MTogeTFcbiAgfTtcbn1cblxuZnVuY3Rpb24gY29tcHV0ZSQxKHJhbmdlLCBjb25maWcpIHtcbiAgdmFyIGFuY2hvciA9IGNvbmZpZy5hbmNob3I7XG4gIHZhciBzZWdtZW50ID0gcmFuZ2U7XG4gIHZhciB4LCB5O1xuXG4gIGlmIChjb25maWcuY2xhbXApIHtcbiAgICBzZWdtZW50ID0gY2xpcHBlZChzZWdtZW50LCBjb25maWcuYXJlYSk7XG4gIH1cblxuICBpZiAoYW5jaG9yID09PSAnc3RhcnQnKSB7XG4gICAgeCA9IHNlZ21lbnQueDA7XG4gICAgeSA9IHNlZ21lbnQueTA7XG4gIH0gZWxzZSBpZiAoYW5jaG9yID09PSAnZW5kJykge1xuICAgIHggPSBzZWdtZW50LngxO1xuICAgIHkgPSBzZWdtZW50LnkxO1xuICB9IGVsc2Uge1xuICAgIHggPSAoc2VnbWVudC54MCArIHNlZ21lbnQueDEpIC8gMjtcbiAgICB5ID0gKHNlZ21lbnQueTAgKyBzZWdtZW50LnkxKSAvIDI7XG4gIH1cblxuICByZXR1cm4gYWxpZ25lZCh4LCB5LCByYW5nZS52eCwgcmFuZ2UudnksIGNvbmZpZy5hbGlnbik7XG59XG5cbnZhciBwb3NpdGlvbmVycyA9IHtcbiAgYXJjOiBmdW5jdGlvbihlbCwgY29uZmlnKSB7XG4gICAgdmFyIGFuZ2xlID0gKGVsLnN0YXJ0QW5nbGUgKyBlbC5lbmRBbmdsZSkgLyAyO1xuICAgIHZhciB2eCA9IE1hdGguY29zKGFuZ2xlKTtcbiAgICB2YXIgdnkgPSBNYXRoLnNpbihhbmdsZSk7XG4gICAgdmFyIHIwID0gZWwuaW5uZXJSYWRpdXM7XG4gICAgdmFyIHIxID0gZWwub3V0ZXJSYWRpdXM7XG5cbiAgICByZXR1cm4gY29tcHV0ZSQxKHtcbiAgICAgIHgwOiBlbC54ICsgdnggKiByMCxcbiAgICAgIHkwOiBlbC55ICsgdnkgKiByMCxcbiAgICAgIHgxOiBlbC54ICsgdnggKiByMSxcbiAgICAgIHkxOiBlbC55ICsgdnkgKiByMSxcbiAgICAgIHZ4OiB2eCxcbiAgICAgIHZ5OiB2eVxuICAgIH0sIGNvbmZpZyk7XG4gIH0sXG5cbiAgcG9pbnQ6IGZ1bmN0aW9uKGVsLCBjb25maWcpIHtcbiAgICB2YXIgdiA9IG9yaWVudChlbCwgY29uZmlnLm9yaWdpbik7XG4gICAgdmFyIHJ4ID0gdi54ICogZWwub3B0aW9ucy5yYWRpdXM7XG4gICAgdmFyIHJ5ID0gdi55ICogZWwub3B0aW9ucy5yYWRpdXM7XG5cbiAgICByZXR1cm4gY29tcHV0ZSQxKHtcbiAgICAgIHgwOiBlbC54IC0gcngsXG4gICAgICB5MDogZWwueSAtIHJ5LFxuICAgICAgeDE6IGVsLnggKyByeCxcbiAgICAgIHkxOiBlbC55ICsgcnksXG4gICAgICB2eDogdi54LFxuICAgICAgdnk6IHYueVxuICAgIH0sIGNvbmZpZyk7XG4gIH0sXG5cbiAgYmFyOiBmdW5jdGlvbihlbCwgY29uZmlnKSB7XG4gICAgdmFyIHYgPSBvcmllbnQoZWwsIGNvbmZpZy5vcmlnaW4pO1xuICAgIHZhciB4ID0gZWwueDtcbiAgICB2YXIgeSA9IGVsLnk7XG4gICAgdmFyIHN4ID0gMDtcbiAgICB2YXIgc3kgPSAwO1xuXG4gICAgaWYgKGVsLmhvcml6b250YWwpIHtcbiAgICAgIHggPSBNYXRoLm1pbihlbC54LCBlbC5iYXNlKTtcbiAgICAgIHN4ID0gTWF0aC5hYnMoZWwuYmFzZSAtIGVsLngpO1xuICAgIH0gZWxzZSB7XG4gICAgICB5ID0gTWF0aC5taW4oZWwueSwgZWwuYmFzZSk7XG4gICAgICBzeSA9IE1hdGguYWJzKGVsLmJhc2UgLSBlbC55KTtcbiAgICB9XG5cbiAgICByZXR1cm4gY29tcHV0ZSQxKHtcbiAgICAgIHgwOiB4LFxuICAgICAgeTA6IHkgKyBzeSxcbiAgICAgIHgxOiB4ICsgc3gsXG4gICAgICB5MTogeSxcbiAgICAgIHZ4OiB2LngsXG4gICAgICB2eTogdi55XG4gICAgfSwgY29uZmlnKTtcbiAgfSxcblxuICBmYWxsYmFjazogZnVuY3Rpb24oZWwsIGNvbmZpZykge1xuICAgIHZhciB2ID0gb3JpZW50KGVsLCBjb25maWcub3JpZ2luKTtcblxuICAgIHJldHVybiBjb21wdXRlJDEoe1xuICAgICAgeDA6IGVsLngsXG4gICAgICB5MDogZWwueSxcbiAgICAgIHgxOiBlbC54ICsgKGVsLndpZHRoIHx8IDApLFxuICAgICAgeTE6IGVsLnkgKyAoZWwuaGVpZ2h0IHx8IDApLFxuICAgICAgdng6IHYueCxcbiAgICAgIHZ5OiB2LnlcbiAgICB9LCBjb25maWcpO1xuICB9XG59O1xuXG52YXIgcmFzdGVyaXplID0gdXRpbHMucmFzdGVyaXplO1xuXG5mdW5jdGlvbiBib3VuZGluZ1JlY3RzKG1vZGVsKSB7XG4gIHZhciBib3JkZXJXaWR0aCA9IG1vZGVsLmJvcmRlcldpZHRoIHx8IDA7XG4gIHZhciBwYWRkaW5nID0gbW9kZWwucGFkZGluZztcbiAgdmFyIHRoID0gbW9kZWwuc2l6ZS5oZWlnaHQ7XG4gIHZhciB0dyA9IG1vZGVsLnNpemUud2lkdGg7XG4gIHZhciB0eCA9IC10dyAvIDI7XG4gIHZhciB0eSA9IC10aCAvIDI7XG5cbiAgcmV0dXJuIHtcbiAgICBmcmFtZToge1xuICAgICAgeDogdHggLSBwYWRkaW5nLmxlZnQgLSBib3JkZXJXaWR0aCxcbiAgICAgIHk6IHR5IC0gcGFkZGluZy50b3AgLSBib3JkZXJXaWR0aCxcbiAgICAgIHc6IHR3ICsgcGFkZGluZy53aWR0aCArIGJvcmRlcldpZHRoICogMixcbiAgICAgIGg6IHRoICsgcGFkZGluZy5oZWlnaHQgKyBib3JkZXJXaWR0aCAqIDJcbiAgICB9LFxuICAgIHRleHQ6IHtcbiAgICAgIHg6IHR4LFxuICAgICAgeTogdHksXG4gICAgICB3OiB0dyxcbiAgICAgIGg6IHRoXG4gICAgfVxuICB9O1xufVxuXG5mdW5jdGlvbiBnZXRTY2FsZU9yaWdpbihlbCwgY29udGV4dCkge1xuICB2YXIgc2NhbGUgPSBjb250ZXh0LmNoYXJ0LmdldERhdGFzZXRNZXRhKGNvbnRleHQuZGF0YXNldEluZGV4KS52U2NhbGU7XG5cbiAgaWYgKCFzY2FsZSkge1xuICAgIHJldHVybiBudWxsO1xuICB9XG5cbiAgaWYgKHNjYWxlLnhDZW50ZXIgIT09IHVuZGVmaW5lZCAmJiBzY2FsZS55Q2VudGVyICE9PSB1bmRlZmluZWQpIHtcbiAgICByZXR1cm4ge3g6IHNjYWxlLnhDZW50ZXIsIHk6IHNjYWxlLnlDZW50ZXJ9O1xuICB9XG5cbiAgdmFyIHBpeGVsID0gc2NhbGUuZ2V0QmFzZVBpeGVsKCk7XG4gIHJldHVybiBlbC5ob3Jpem9udGFsID9cbiAgICB7eDogcGl4ZWwsIHk6IG51bGx9IDpcbiAgICB7eDogbnVsbCwgeTogcGl4ZWx9O1xufVxuXG5mdW5jdGlvbiBnZXRQb3NpdGlvbmVyKGVsKSB7XG4gIGlmIChlbCBpbnN0YW5jZW9mIEFyY0VsZW1lbnQpIHtcbiAgICByZXR1cm4gcG9zaXRpb25lcnMuYXJjO1xuICB9XG4gIGlmIChlbCBpbnN0YW5jZW9mIFBvaW50RWxlbWVudCkge1xuICAgIHJldHVybiBwb3NpdGlvbmVycy5wb2ludDtcbiAgfVxuICBpZiAoZWwgaW5zdGFuY2VvZiBCYXJFbGVtZW50KSB7XG4gICAgcmV0dXJuIHBvc2l0aW9uZXJzLmJhcjtcbiAgfVxuICByZXR1cm4gcG9zaXRpb25lcnMuZmFsbGJhY2s7XG59XG5cbmZ1bmN0aW9uIGRyYXdSb3VuZGVkUmVjdChjdHgsIHgsIHksIHcsIGgsIHJhZGl1cykge1xuICB2YXIgSEFMRl9QSSA9IE1hdGguUEkgLyAyO1xuXG4gIGlmIChyYWRpdXMpIHtcbiAgICB2YXIgciA9IE1hdGgubWluKHJhZGl1cywgaCAvIDIsIHcgLyAyKTtcbiAgICB2YXIgbGVmdCA9IHggKyByO1xuICAgIHZhciB0b3AgPSB5ICsgcjtcbiAgICB2YXIgcmlnaHQgPSB4ICsgdyAtIHI7XG4gICAgdmFyIGJvdHRvbSA9IHkgKyBoIC0gcjtcblxuICAgIGN0eC5tb3ZlVG8oeCwgdG9wKTtcbiAgICBpZiAobGVmdCA8IHJpZ2h0ICYmIHRvcCA8IGJvdHRvbSkge1xuICAgICAgY3R4LmFyYyhsZWZ0LCB0b3AsIHIsIC1NYXRoLlBJLCAtSEFMRl9QSSk7XG4gICAgICBjdHguYXJjKHJpZ2h0LCB0b3AsIHIsIC1IQUxGX1BJLCAwKTtcbiAgICAgIGN0eC5hcmMocmlnaHQsIGJvdHRvbSwgciwgMCwgSEFMRl9QSSk7XG4gICAgICBjdHguYXJjKGxlZnQsIGJvdHRvbSwgciwgSEFMRl9QSSwgTWF0aC5QSSk7XG4gICAgfSBlbHNlIGlmIChsZWZ0IDwgcmlnaHQpIHtcbiAgICAgIGN0eC5tb3ZlVG8obGVmdCwgeSk7XG4gICAgICBjdHguYXJjKHJpZ2h0LCB0b3AsIHIsIC1IQUxGX1BJLCBIQUxGX1BJKTtcbiAgICAgIGN0eC5hcmMobGVmdCwgdG9wLCByLCBIQUxGX1BJLCBNYXRoLlBJICsgSEFMRl9QSSk7XG4gICAgfSBlbHNlIGlmICh0b3AgPCBib3R0b20pIHtcbiAgICAgIGN0eC5hcmMobGVmdCwgdG9wLCByLCAtTWF0aC5QSSwgMCk7XG4gICAgICBjdHguYXJjKGxlZnQsIGJvdHRvbSwgciwgMCwgTWF0aC5QSSk7XG4gICAgfSBlbHNlIHtcbiAgICAgIGN0eC5hcmMobGVmdCwgdG9wLCByLCAtTWF0aC5QSSwgTWF0aC5QSSk7XG4gICAgfVxuICAgIGN0eC5jbG9zZVBhdGgoKTtcbiAgICBjdHgubW92ZVRvKHgsIHkpO1xuICB9IGVsc2Uge1xuICAgIGN0eC5yZWN0KHgsIHksIHcsIGgpO1xuICB9XG59XG5cbmZ1bmN0aW9uIGRyYXdGcmFtZShjdHgsIHJlY3QsIG1vZGVsKSB7XG4gIHZhciBiZ0NvbG9yID0gbW9kZWwuYmFja2dyb3VuZENvbG9yO1xuICB2YXIgYm9yZGVyQ29sb3IgPSBtb2RlbC5ib3JkZXJDb2xvcjtcbiAgdmFyIGJvcmRlcldpZHRoID0gbW9kZWwuYm9yZGVyV2lkdGg7XG5cbiAgaWYgKCFiZ0NvbG9yICYmICghYm9yZGVyQ29sb3IgfHwgIWJvcmRlcldpZHRoKSkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGN0eC5iZWdpblBhdGgoKTtcblxuICBkcmF3Um91bmRlZFJlY3QoXG4gICAgY3R4LFxuICAgIHJhc3Rlcml6ZShyZWN0LngpICsgYm9yZGVyV2lkdGggLyAyLFxuICAgIHJhc3Rlcml6ZShyZWN0LnkpICsgYm9yZGVyV2lkdGggLyAyLFxuICAgIHJhc3Rlcml6ZShyZWN0LncpIC0gYm9yZGVyV2lkdGgsXG4gICAgcmFzdGVyaXplKHJlY3QuaCkgLSBib3JkZXJXaWR0aCxcbiAgICBtb2RlbC5ib3JkZXJSYWRpdXMpO1xuXG4gIGN0eC5jbG9zZVBhdGgoKTtcblxuICBpZiAoYmdDb2xvcikge1xuICAgIGN0eC5maWxsU3R5bGUgPSBiZ0NvbG9yO1xuICAgIGN0eC5maWxsKCk7XG4gIH1cblxuICBpZiAoYm9yZGVyQ29sb3IgJiYgYm9yZGVyV2lkdGgpIHtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBib3JkZXJDb2xvcjtcbiAgICBjdHgubGluZVdpZHRoID0gYm9yZGVyV2lkdGg7XG4gICAgY3R4LmxpbmVKb2luID0gJ21pdGVyJztcbiAgICBjdHguc3Ryb2tlKCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gdGV4dEdlb21ldHJ5KHJlY3QsIGFsaWduLCBmb250KSB7XG4gIHZhciBoID0gZm9udC5saW5lSGVpZ2h0O1xuICB2YXIgdyA9IHJlY3QudztcbiAgdmFyIHggPSByZWN0Lng7XG4gIHZhciB5ID0gcmVjdC55ICsgaCAvIDI7XG5cbiAgaWYgKGFsaWduID09PSAnY2VudGVyJykge1xuICAgIHggKz0gdyAvIDI7XG4gIH0gZWxzZSBpZiAoYWxpZ24gPT09ICdlbmQnIHx8IGFsaWduID09PSAncmlnaHQnKSB7XG4gICAgeCArPSB3O1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBoOiBoLFxuICAgIHc6IHcsXG4gICAgeDogeCxcbiAgICB5OiB5XG4gIH07XG59XG5cbmZ1bmN0aW9uIGRyYXdUZXh0TGluZShjdHgsIHRleHQsIGNmZykge1xuICB2YXIgc2hhZG93ID0gY3R4LnNoYWRvd0JsdXI7XG4gIHZhciBzdHJva2VkID0gY2ZnLnN0cm9rZWQ7XG4gIHZhciB4ID0gcmFzdGVyaXplKGNmZy54KTtcbiAgdmFyIHkgPSByYXN0ZXJpemUoY2ZnLnkpO1xuICB2YXIgdyA9IHJhc3Rlcml6ZShjZmcudyk7XG5cbiAgaWYgKHN0cm9rZWQpIHtcbiAgICBjdHguc3Ryb2tlVGV4dCh0ZXh0LCB4LCB5LCB3KTtcbiAgfVxuXG4gIGlmIChjZmcuZmlsbGVkKSB7XG4gICAgaWYgKHNoYWRvdyAmJiBzdHJva2VkKSB7XG4gICAgICAvLyBQcmV2ZW50IGRyYXdpbmcgc2hhZG93IG9uIGJvdGggdGhlIHRleHQgc3Ryb2tlIGFuZCBmaWxsLCBzb1xuICAgICAgLy8gaWYgdGhlIHRleHQgaXMgc3Ryb2tlZCwgcmVtb3ZlIHRoZSBzaGFkb3cgZm9yIHRoZSB0ZXh0IGZpbGwuXG4gICAgICBjdHguc2hhZG93Qmx1ciA9IDA7XG4gICAgfVxuXG4gICAgY3R4LmZpbGxUZXh0KHRleHQsIHgsIHksIHcpO1xuXG4gICAgaWYgKHNoYWRvdyAmJiBzdHJva2VkKSB7XG4gICAgICBjdHguc2hhZG93Qmx1ciA9IHNoYWRvdztcbiAgICB9XG4gIH1cbn1cblxuZnVuY3Rpb24gZHJhd1RleHQoY3R4LCBsaW5lcywgcmVjdCwgbW9kZWwpIHtcbiAgdmFyIGFsaWduID0gbW9kZWwudGV4dEFsaWduO1xuICB2YXIgY29sb3IgPSBtb2RlbC5jb2xvcjtcbiAgdmFyIGZpbGxlZCA9ICEhY29sb3I7XG4gIHZhciBmb250ID0gbW9kZWwuZm9udDtcbiAgdmFyIGlsZW4gPSBsaW5lcy5sZW5ndGg7XG4gIHZhciBzdHJva2VDb2xvciA9IG1vZGVsLnRleHRTdHJva2VDb2xvcjtcbiAgdmFyIHN0cm9rZVdpZHRoID0gbW9kZWwudGV4dFN0cm9rZVdpZHRoO1xuICB2YXIgc3Ryb2tlZCA9IHN0cm9rZUNvbG9yICYmIHN0cm9rZVdpZHRoO1xuICB2YXIgaTtcblxuICBpZiAoIWlsZW4gfHwgKCFmaWxsZWQgJiYgIXN0cm9rZWQpKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgLy8gQWRqdXN0IGNvb3JkaW5hdGVzIGJhc2VkIG9uIHRleHQgYWxpZ25tZW50IGFuZCBsaW5lIGhlaWdodFxuICByZWN0ID0gdGV4dEdlb21ldHJ5KHJlY3QsIGFsaWduLCBmb250KTtcblxuICBjdHguZm9udCA9IGZvbnQuc3RyaW5nO1xuICBjdHgudGV4dEFsaWduID0gYWxpZ247XG4gIGN0eC50ZXh0QmFzZWxpbmUgPSAnbWlkZGxlJztcbiAgY3R4LnNoYWRvd0JsdXIgPSBtb2RlbC50ZXh0U2hhZG93Qmx1cjtcbiAgY3R4LnNoYWRvd0NvbG9yID0gbW9kZWwudGV4dFNoYWRvd0NvbG9yO1xuXG4gIGlmIChmaWxsZWQpIHtcbiAgICBjdHguZmlsbFN0eWxlID0gY29sb3I7XG4gIH1cbiAgaWYgKHN0cm9rZWQpIHtcbiAgICBjdHgubGluZUpvaW4gPSAncm91bmQnO1xuICAgIGN0eC5saW5lV2lkdGggPSBzdHJva2VXaWR0aDtcbiAgICBjdHguc3Ryb2tlU3R5bGUgPSBzdHJva2VDb2xvcjtcbiAgfVxuXG4gIGZvciAoaSA9IDAsIGlsZW4gPSBsaW5lcy5sZW5ndGg7IGkgPCBpbGVuOyArK2kpIHtcbiAgICBkcmF3VGV4dExpbmUoY3R4LCBsaW5lc1tpXSwge1xuICAgICAgc3Ryb2tlZDogc3Ryb2tlZCxcbiAgICAgIGZpbGxlZDogZmlsbGVkLFxuICAgICAgdzogcmVjdC53LFxuICAgICAgeDogcmVjdC54LFxuICAgICAgeTogcmVjdC55ICsgcmVjdC5oICogaVxuICAgIH0pO1xuICB9XG59XG5cbnZhciBMYWJlbCA9IGZ1bmN0aW9uKGNvbmZpZywgY3R4LCBlbCwgaW5kZXgpIHtcbiAgdmFyIG1lID0gdGhpcztcblxuICBtZS5fY29uZmlnID0gY29uZmlnO1xuICBtZS5faW5kZXggPSBpbmRleDtcbiAgbWUuX21vZGVsID0gbnVsbDtcbiAgbWUuX3JlY3RzID0gbnVsbDtcbiAgbWUuX2N0eCA9IGN0eDtcbiAgbWUuX2VsID0gZWw7XG59O1xuXG5tZXJnZShMYWJlbC5wcm90b3R5cGUsIHtcbiAgLyoqXG4gICAqIEBwcml2YXRlXG4gICAqL1xuICBfbW9kZWxpemU6IGZ1bmN0aW9uKGRpc3BsYXksIGxpbmVzLCBjb25maWcsIGNvbnRleHQpIHtcbiAgICB2YXIgbWUgPSB0aGlzO1xuICAgIHZhciBpbmRleCA9IG1lLl9pbmRleDtcbiAgICB2YXIgZm9udCA9IHRvRm9udChyZXNvbHZlKFtjb25maWcuZm9udCwge31dLCBjb250ZXh0LCBpbmRleCkpO1xuICAgIHZhciBjb2xvciA9IHJlc29sdmUoW2NvbmZpZy5jb2xvciwgZGVmYXVsdHMkMS5jb2xvcl0sIGNvbnRleHQsIGluZGV4KTtcblxuICAgIHJldHVybiB7XG4gICAgICBhbGlnbjogcmVzb2x2ZShbY29uZmlnLmFsaWduLCAnY2VudGVyJ10sIGNvbnRleHQsIGluZGV4KSxcbiAgICAgIGFuY2hvcjogcmVzb2x2ZShbY29uZmlnLmFuY2hvciwgJ2NlbnRlciddLCBjb250ZXh0LCBpbmRleCksXG4gICAgICBhcmVhOiBjb250ZXh0LmNoYXJ0LmNoYXJ0QXJlYSxcbiAgICAgIGJhY2tncm91bmRDb2xvcjogcmVzb2x2ZShbY29uZmlnLmJhY2tncm91bmRDb2xvciwgbnVsbF0sIGNvbnRleHQsIGluZGV4KSxcbiAgICAgIGJvcmRlckNvbG9yOiByZXNvbHZlKFtjb25maWcuYm9yZGVyQ29sb3IsIG51bGxdLCBjb250ZXh0LCBpbmRleCksXG4gICAgICBib3JkZXJSYWRpdXM6IHJlc29sdmUoW2NvbmZpZy5ib3JkZXJSYWRpdXMsIDBdLCBjb250ZXh0LCBpbmRleCksXG4gICAgICBib3JkZXJXaWR0aDogcmVzb2x2ZShbY29uZmlnLmJvcmRlcldpZHRoLCAwXSwgY29udGV4dCwgaW5kZXgpLFxuICAgICAgY2xhbXA6IHJlc29sdmUoW2NvbmZpZy5jbGFtcCwgZmFsc2VdLCBjb250ZXh0LCBpbmRleCksXG4gICAgICBjbGlwOiByZXNvbHZlKFtjb25maWcuY2xpcCwgZmFsc2VdLCBjb250ZXh0LCBpbmRleCksXG4gICAgICBjb2xvcjogY29sb3IsXG4gICAgICBkaXNwbGF5OiBkaXNwbGF5LFxuICAgICAgZm9udDogZm9udCxcbiAgICAgIGxpbmVzOiBsaW5lcyxcbiAgICAgIG9mZnNldDogcmVzb2x2ZShbY29uZmlnLm9mZnNldCwgNF0sIGNvbnRleHQsIGluZGV4KSxcbiAgICAgIG9wYWNpdHk6IHJlc29sdmUoW2NvbmZpZy5vcGFjaXR5LCAxXSwgY29udGV4dCwgaW5kZXgpLFxuICAgICAgb3JpZ2luOiBnZXRTY2FsZU9yaWdpbihtZS5fZWwsIGNvbnRleHQpLFxuICAgICAgcGFkZGluZzogdG9QYWRkaW5nKHJlc29sdmUoW2NvbmZpZy5wYWRkaW5nLCA0XSwgY29udGV4dCwgaW5kZXgpKSxcbiAgICAgIHBvc2l0aW9uZXI6IGdldFBvc2l0aW9uZXIobWUuX2VsKSxcbiAgICAgIHJvdGF0aW9uOiByZXNvbHZlKFtjb25maWcucm90YXRpb24sIDBdLCBjb250ZXh0LCBpbmRleCkgKiAoTWF0aC5QSSAvIDE4MCksXG4gICAgICBzaXplOiB1dGlscy50ZXh0U2l6ZShtZS5fY3R4LCBsaW5lcywgZm9udCksXG4gICAgICB0ZXh0QWxpZ246IHJlc29sdmUoW2NvbmZpZy50ZXh0QWxpZ24sICdzdGFydCddLCBjb250ZXh0LCBpbmRleCksXG4gICAgICB0ZXh0U2hhZG93Qmx1cjogcmVzb2x2ZShbY29uZmlnLnRleHRTaGFkb3dCbHVyLCAwXSwgY29udGV4dCwgaW5kZXgpLFxuICAgICAgdGV4dFNoYWRvd0NvbG9yOiByZXNvbHZlKFtjb25maWcudGV4dFNoYWRvd0NvbG9yLCBjb2xvcl0sIGNvbnRleHQsIGluZGV4KSxcbiAgICAgIHRleHRTdHJva2VDb2xvcjogcmVzb2x2ZShbY29uZmlnLnRleHRTdHJva2VDb2xvciwgY29sb3JdLCBjb250ZXh0LCBpbmRleCksXG4gICAgICB0ZXh0U3Ryb2tlV2lkdGg6IHJlc29sdmUoW2NvbmZpZy50ZXh0U3Ryb2tlV2lkdGgsIDBdLCBjb250ZXh0LCBpbmRleClcbiAgICB9O1xuICB9LFxuXG4gIHVwZGF0ZTogZnVuY3Rpb24oY29udGV4dCkge1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdmFyIG1vZGVsID0gbnVsbDtcbiAgICB2YXIgcmVjdHMgPSBudWxsO1xuICAgIHZhciBpbmRleCA9IG1lLl9pbmRleDtcbiAgICB2YXIgY29uZmlnID0gbWUuX2NvbmZpZztcbiAgICB2YXIgdmFsdWUsIGxhYmVsLCBsaW5lcztcblxuICAgIC8vIFdlIGZpcnN0IHJlc29sdmUgdGhlIGRpc3BsYXkgb3B0aW9uIChzZXBhcmF0ZWx5KSB0byBhdm9pZCBjb21wdXRpbmdcbiAgICAvLyBvdGhlciBvcHRpb25zIGluIGNhc2UgdGhlIGxhYmVsIGlzIGhpZGRlbiAoaS5lLiBkaXNwbGF5OiBmYWxzZSkuXG4gICAgdmFyIGRpc3BsYXkgPSByZXNvbHZlKFtjb25maWcuZGlzcGxheSwgdHJ1ZV0sIGNvbnRleHQsIGluZGV4KTtcblxuICAgIGlmIChkaXNwbGF5KSB7XG4gICAgICB2YWx1ZSA9IGNvbnRleHQuZGF0YXNldC5kYXRhW2luZGV4XTtcbiAgICAgIGxhYmVsID0gdmFsdWVPckRlZmF1bHQoY2FsbGJhY2soY29uZmlnLmZvcm1hdHRlciwgW3ZhbHVlLCBjb250ZXh0XSksIHZhbHVlKTtcbiAgICAgIGxpbmVzID0gaXNOdWxsT3JVbmRlZihsYWJlbCkgPyBbXSA6IHV0aWxzLnRvVGV4dExpbmVzKGxhYmVsKTtcblxuICAgICAgaWYgKGxpbmVzLmxlbmd0aCkge1xuICAgICAgICBtb2RlbCA9IG1lLl9tb2RlbGl6ZShkaXNwbGF5LCBsaW5lcywgY29uZmlnLCBjb250ZXh0KTtcbiAgICAgICAgcmVjdHMgPSBib3VuZGluZ1JlY3RzKG1vZGVsKTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICBtZS5fbW9kZWwgPSBtb2RlbDtcbiAgICBtZS5fcmVjdHMgPSByZWN0cztcbiAgfSxcblxuICBnZW9tZXRyeTogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX3JlY3RzID8gdGhpcy5fcmVjdHMuZnJhbWUgOiB7fTtcbiAgfSxcblxuICByb3RhdGlvbjogZnVuY3Rpb24oKSB7XG4gICAgcmV0dXJuIHRoaXMuX21vZGVsID8gdGhpcy5fbW9kZWwucm90YXRpb24gOiAwO1xuICB9LFxuXG4gIHZpc2libGU6IGZ1bmN0aW9uKCkge1xuICAgIHJldHVybiB0aGlzLl9tb2RlbCAmJiB0aGlzLl9tb2RlbC5vcGFjaXR5O1xuICB9LFxuXG4gIG1vZGVsOiBmdW5jdGlvbigpIHtcbiAgICByZXR1cm4gdGhpcy5fbW9kZWw7XG4gIH0sXG5cbiAgZHJhdzogZnVuY3Rpb24oY2hhcnQsIGNlbnRlcikge1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdmFyIGN0eCA9IGNoYXJ0LmN0eDtcbiAgICB2YXIgbW9kZWwgPSBtZS5fbW9kZWw7XG4gICAgdmFyIHJlY3RzID0gbWUuX3JlY3RzO1xuICAgIHZhciBhcmVhO1xuXG4gICAgaWYgKCF0aGlzLnZpc2libGUoKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cblxuICAgIGN0eC5zYXZlKCk7XG5cbiAgICBpZiAobW9kZWwuY2xpcCkge1xuICAgICAgYXJlYSA9IG1vZGVsLmFyZWE7XG4gICAgICBjdHguYmVnaW5QYXRoKCk7XG4gICAgICBjdHgucmVjdChcbiAgICAgICAgYXJlYS5sZWZ0LFxuICAgICAgICBhcmVhLnRvcCxcbiAgICAgICAgYXJlYS5yaWdodCAtIGFyZWEubGVmdCxcbiAgICAgICAgYXJlYS5ib3R0b20gLSBhcmVhLnRvcCk7XG4gICAgICBjdHguY2xpcCgpO1xuICAgIH1cblxuICAgIGN0eC5nbG9iYWxBbHBoYSA9IHV0aWxzLmJvdW5kKDAsIG1vZGVsLm9wYWNpdHksIDEpO1xuICAgIGN0eC50cmFuc2xhdGUocmFzdGVyaXplKGNlbnRlci54KSwgcmFzdGVyaXplKGNlbnRlci55KSk7XG4gICAgY3R4LnJvdGF0ZShtb2RlbC5yb3RhdGlvbik7XG5cbiAgICBkcmF3RnJhbWUoY3R4LCByZWN0cy5mcmFtZSwgbW9kZWwpO1xuICAgIGRyYXdUZXh0KGN0eCwgbW9kZWwubGluZXMsIHJlY3RzLnRleHQsIG1vZGVsKTtcblxuICAgIGN0eC5yZXN0b3JlKCk7XG4gIH1cbn0pO1xuXG52YXIgTUlOX0lOVEVHRVIgPSBOdW1iZXIuTUlOX1NBRkVfSU5URUdFUiB8fCAtOTAwNzE5OTI1NDc0MDk5MTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBlcy9uby1udW1iZXItbWluc2FmZWludGVnZXJcbnZhciBNQVhfSU5URUdFUiA9IE51bWJlci5NQVhfU0FGRV9JTlRFR0VSIHx8IDkwMDcxOTkyNTQ3NDA5OTE7ICAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIGVzL25vLW51bWJlci1tYXhzYWZlaW50ZWdlclxuXG5mdW5jdGlvbiByb3RhdGVkKHBvaW50LCBjZW50ZXIsIGFuZ2xlKSB7XG4gIHZhciBjb3MgPSBNYXRoLmNvcyhhbmdsZSk7XG4gIHZhciBzaW4gPSBNYXRoLnNpbihhbmdsZSk7XG4gIHZhciBjeCA9IGNlbnRlci54O1xuICB2YXIgY3kgPSBjZW50ZXIueTtcblxuICByZXR1cm4ge1xuICAgIHg6IGN4ICsgY29zICogKHBvaW50LnggLSBjeCkgLSBzaW4gKiAocG9pbnQueSAtIGN5KSxcbiAgICB5OiBjeSArIHNpbiAqIChwb2ludC54IC0gY3gpICsgY29zICogKHBvaW50LnkgLSBjeSlcbiAgfTtcbn1cblxuZnVuY3Rpb24gcHJvamVjdGVkKHBvaW50cywgYXhpcykge1xuICB2YXIgbWluID0gTUFYX0lOVEVHRVI7XG4gIHZhciBtYXggPSBNSU5fSU5URUdFUjtcbiAgdmFyIG9yaWdpbiA9IGF4aXMub3JpZ2luO1xuICB2YXIgaSwgcHQsIHZ4LCB2eSwgZHA7XG5cbiAgZm9yIChpID0gMDsgaSA8IHBvaW50cy5sZW5ndGg7ICsraSkge1xuICAgIHB0ID0gcG9pbnRzW2ldO1xuICAgIHZ4ID0gcHQueCAtIG9yaWdpbi54O1xuICAgIHZ5ID0gcHQueSAtIG9yaWdpbi55O1xuICAgIGRwID0gYXhpcy52eCAqIHZ4ICsgYXhpcy52eSAqIHZ5O1xuICAgIG1pbiA9IE1hdGgubWluKG1pbiwgZHApO1xuICAgIG1heCA9IE1hdGgubWF4KG1heCwgZHApO1xuICB9XG5cbiAgcmV0dXJuIHtcbiAgICBtaW46IG1pbixcbiAgICBtYXg6IG1heFxuICB9O1xufVxuXG5mdW5jdGlvbiB0b0F4aXMocDAsIHAxKSB7XG4gIHZhciB2eCA9IHAxLnggLSBwMC54O1xuICB2YXIgdnkgPSBwMS55IC0gcDAueTtcbiAgdmFyIGxuID0gTWF0aC5zcXJ0KHZ4ICogdnggKyB2eSAqIHZ5KTtcblxuICByZXR1cm4ge1xuICAgIHZ4OiAocDEueCAtIHAwLngpIC8gbG4sXG4gICAgdnk6IChwMS55IC0gcDAueSkgLyBsbixcbiAgICBvcmlnaW46IHAwLFxuICAgIGxuOiBsblxuICB9O1xufVxuXG52YXIgSGl0Qm94ID0gZnVuY3Rpb24oKSB7XG4gIHRoaXMuX3JvdGF0aW9uID0gMDtcbiAgdGhpcy5fcmVjdCA9IHtcbiAgICB4OiAwLFxuICAgIHk6IDAsXG4gICAgdzogMCxcbiAgICBoOiAwXG4gIH07XG59O1xuXG5tZXJnZShIaXRCb3gucHJvdG90eXBlLCB7XG4gIGNlbnRlcjogZnVuY3Rpb24oKSB7XG4gICAgdmFyIHIgPSB0aGlzLl9yZWN0O1xuICAgIHJldHVybiB7XG4gICAgICB4OiByLnggKyByLncgLyAyLFxuICAgICAgeTogci55ICsgci5oIC8gMlxuICAgIH07XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbihjZW50ZXIsIHJlY3QsIHJvdGF0aW9uKSB7XG4gICAgdGhpcy5fcm90YXRpb24gPSByb3RhdGlvbjtcbiAgICB0aGlzLl9yZWN0ID0ge1xuICAgICAgeDogcmVjdC54ICsgY2VudGVyLngsXG4gICAgICB5OiByZWN0LnkgKyBjZW50ZXIueSxcbiAgICAgIHc6IHJlY3QudyxcbiAgICAgIGg6IHJlY3QuaFxuICAgIH07XG4gIH0sXG5cbiAgY29udGFpbnM6IGZ1bmN0aW9uKHBvaW50KSB7XG4gICAgdmFyIG1lID0gdGhpcztcbiAgICB2YXIgbWFyZ2luID0gMTtcbiAgICB2YXIgcmVjdCA9IG1lLl9yZWN0O1xuXG4gICAgcG9pbnQgPSByb3RhdGVkKHBvaW50LCBtZS5jZW50ZXIoKSwgLW1lLl9yb3RhdGlvbik7XG5cbiAgICByZXR1cm4gIShwb2ludC54IDwgcmVjdC54IC0gbWFyZ2luXG4gICAgICB8fCBwb2ludC55IDwgcmVjdC55IC0gbWFyZ2luXG4gICAgICB8fCBwb2ludC54ID4gcmVjdC54ICsgcmVjdC53ICsgbWFyZ2luICogMlxuICAgICAgfHwgcG9pbnQueSA+IHJlY3QueSArIHJlY3QuaCArIG1hcmdpbiAqIDIpO1xuICB9LFxuXG4gIC8vIFNlcGFyYXRpbmcgQXhpcyBUaGVvcmVtXG4gIC8vIGh0dHBzOi8vZ2FtZWRldmVsb3BtZW50LnR1dHNwbHVzLmNvbS90dXRvcmlhbHMvY29sbGlzaW9uLWRldGVjdGlvbi11c2luZy10aGUtc2VwYXJhdGluZy1heGlzLXRoZW9yZW0tLWdhbWVkZXYtMTY5XG4gIGludGVyc2VjdHM6IGZ1bmN0aW9uKG90aGVyKSB7XG4gICAgdmFyIHIwID0gdGhpcy5fcG9pbnRzKCk7XG4gICAgdmFyIHIxID0gb3RoZXIuX3BvaW50cygpO1xuICAgIHZhciBheGVzID0gW1xuICAgICAgdG9BeGlzKHIwWzBdLCByMFsxXSksXG4gICAgICB0b0F4aXMocjBbMF0sIHIwWzNdKVxuICAgIF07XG4gICAgdmFyIGksIHByMCwgcHIxO1xuXG4gICAgaWYgKHRoaXMuX3JvdGF0aW9uICE9PSBvdGhlci5fcm90YXRpb24pIHtcbiAgICAgIC8vIE9ubHkgc2VwYXJhdGUgd2l0aCByMSBheGlzIGlmIHRoZSByb3RhdGlvbiBpcyBkaWZmZXJlbnQsXG4gICAgICAvLyBlbHNlIGl0J3MgZW5vdWdoIHRvIHNlcGFyYXRlIHIwIGFuZCByMSB3aXRoIHIwIGF4aXMgb25seSFcbiAgICAgIGF4ZXMucHVzaChcbiAgICAgICAgdG9BeGlzKHIxWzBdLCByMVsxXSksXG4gICAgICAgIHRvQXhpcyhyMVswXSwgcjFbM10pXG4gICAgICApO1xuICAgIH1cblxuICAgIGZvciAoaSA9IDA7IGkgPCBheGVzLmxlbmd0aDsgKytpKSB7XG4gICAgICBwcjAgPSBwcm9qZWN0ZWQocjAsIGF4ZXNbaV0pO1xuICAgICAgcHIxID0gcHJvamVjdGVkKHIxLCBheGVzW2ldKTtcblxuICAgICAgaWYgKHByMC5tYXggPCBwcjEubWluIHx8IHByMS5tYXggPCBwcjAubWluKSB7XG4gICAgICAgIHJldHVybiBmYWxzZTtcbiAgICAgIH1cbiAgICB9XG5cbiAgICByZXR1cm4gdHJ1ZTtcbiAgfSxcblxuICAvKipcbiAgICogQHByaXZhdGVcbiAgICovXG4gIF9wb2ludHM6IGZ1bmN0aW9uKCkge1xuICAgIHZhciBtZSA9IHRoaXM7XG4gICAgdmFyIHJlY3QgPSBtZS5fcmVjdDtcbiAgICB2YXIgYW5nbGUgPSBtZS5fcm90YXRpb247XG4gICAgdmFyIGNlbnRlciA9IG1lLmNlbnRlcigpO1xuXG4gICAgcmV0dXJuIFtcbiAgICAgIHJvdGF0ZWQoe3g6IHJlY3QueCwgeTogcmVjdC55fSwgY2VudGVyLCBhbmdsZSksXG4gICAgICByb3RhdGVkKHt4OiByZWN0LnggKyByZWN0LncsIHk6IHJlY3QueX0sIGNlbnRlciwgYW5nbGUpLFxuICAgICAgcm90YXRlZCh7eDogcmVjdC54ICsgcmVjdC53LCB5OiByZWN0LnkgKyByZWN0Lmh9LCBjZW50ZXIsIGFuZ2xlKSxcbiAgICAgIHJvdGF0ZWQoe3g6IHJlY3QueCwgeTogcmVjdC55ICsgcmVjdC5ofSwgY2VudGVyLCBhbmdsZSlcbiAgICBdO1xuICB9XG59KTtcblxuZnVuY3Rpb24gY29vcmRpbmF0ZXMoZWwsIG1vZGVsLCBnZW9tZXRyeSkge1xuICB2YXIgcG9pbnQgPSBtb2RlbC5wb3NpdGlvbmVyKGVsLCBtb2RlbCk7XG4gIHZhciB2eCA9IHBvaW50LnZ4O1xuICB2YXIgdnkgPSBwb2ludC52eTtcblxuICBpZiAoIXZ4ICYmICF2eSkge1xuICAgIC8vIGlmIGFsaWduZWQgY2VudGVyLCB3ZSBkb24ndCB3YW50IHRvIG9mZnNldCB0aGUgY2VudGVyIHBvaW50XG4gICAgcmV0dXJuIHt4OiBwb2ludC54LCB5OiBwb2ludC55fTtcbiAgfVxuXG4gIHZhciB3ID0gZ2VvbWV0cnkudztcbiAgdmFyIGggPSBnZW9tZXRyeS5oO1xuXG4gIC8vIHRha2UgaW4gYWNjb3VudCB0aGUgbGFiZWwgcm90YXRpb25cbiAgdmFyIHJvdGF0aW9uID0gbW9kZWwucm90YXRpb247XG4gIHZhciBkeCA9IE1hdGguYWJzKHcgLyAyICogTWF0aC5jb3Mocm90YXRpb24pKSArIE1hdGguYWJzKGggLyAyICogTWF0aC5zaW4ocm90YXRpb24pKTtcbiAgdmFyIGR5ID0gTWF0aC5hYnModyAvIDIgKiBNYXRoLnNpbihyb3RhdGlvbikpICsgTWF0aC5hYnMoaCAvIDIgKiBNYXRoLmNvcyhyb3RhdGlvbikpO1xuXG4gIC8vIHNjYWxlIHRoZSB1bml0IHZlY3RvciAodngsIHZ5KSB0byBnZXQgYXQgbGVhc3QgZHggb3IgZHkgZXF1YWwgdG9cbiAgLy8gdyBvciBoIHJlc3BlY3RpdmVseSAoZWxzZSB3ZSB3b3VsZCBjYWxjdWxhdGUgdGhlIGRpc3RhbmNlIHRvIHRoZVxuICAvLyBlbGxpcHNlIGluc2NyaWJlZCBpbiB0aGUgYm91bmRpbmcgcmVjdClcbiAgdmFyIHZzID0gMSAvIE1hdGgubWF4KE1hdGguYWJzKHZ4KSwgTWF0aC5hYnModnkpKTtcbiAgZHggKj0gdnggKiB2cztcbiAgZHkgKj0gdnkgKiB2cztcblxuICAvLyBmaW5hbGx5LCBpbmNsdWRlIHRoZSBleHBsaWNpdCBvZmZzZXRcbiAgZHggKz0gbW9kZWwub2Zmc2V0ICogdng7XG4gIGR5ICs9IG1vZGVsLm9mZnNldCAqIHZ5O1xuXG4gIHJldHVybiB7XG4gICAgeDogcG9pbnQueCArIGR4LFxuICAgIHk6IHBvaW50LnkgKyBkeVxuICB9O1xufVxuXG5mdW5jdGlvbiBjb2xsaWRlKGxhYmVscywgY29sbGlkZXIpIHtcbiAgdmFyIGksIGosIHMwLCBzMTtcblxuICAvLyBJTVBPUlRBTlQgSXRlcmF0ZSBpbiB0aGUgcmV2ZXJzZSBvcmRlciBzaW5jZSBpdGVtcyBhdCB0aGUgZW5kIG9mIHRoZVxuICAvLyBsaXN0IGhhdmUgYW4gaGlnaGVyIHdlaWdodC9wcmlvcml0eSBhbmQgdGh1cyBzaG91bGQgYmUgbGVzcyBpbXBhY3RlZFxuICAvLyBieSB0aGUgb3ZlcmxhcHBpbmcgc3RyYXRlZ3kuXG5cbiAgZm9yIChpID0gbGFiZWxzLmxlbmd0aCAtIDE7IGkgPj0gMDsgLS1pKSB7XG4gICAgczAgPSBsYWJlbHNbaV0uJGxheW91dDtcblxuICAgIGZvciAoaiA9IGkgLSAxOyBqID49IDAgJiYgczAuX3Zpc2libGU7IC0taikge1xuICAgICAgczEgPSBsYWJlbHNbal0uJGxheW91dDtcblxuICAgICAgaWYgKHMxLl92aXNpYmxlICYmIHMwLl9ib3guaW50ZXJzZWN0cyhzMS5fYm94KSkge1xuICAgICAgICBjb2xsaWRlcihzMCwgczEpO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsYWJlbHM7XG59XG5cbmZ1bmN0aW9uIGNvbXB1dGUobGFiZWxzKSB7XG4gIHZhciBpLCBpbGVuLCBsYWJlbCwgc3RhdGUsIGdlb21ldHJ5LCBjZW50ZXIsIHByb3h5O1xuXG4gIC8vIEluaXRpYWxpemUgbGFiZWxzIGZvciBvdmVybGFwIGRldGVjdGlvblxuICBmb3IgKGkgPSAwLCBpbGVuID0gbGFiZWxzLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuICAgIGxhYmVsID0gbGFiZWxzW2ldO1xuICAgIHN0YXRlID0gbGFiZWwuJGxheW91dDtcblxuICAgIGlmIChzdGF0ZS5fdmlzaWJsZSkge1xuICAgICAgLy8gQ2hhcnQuanMgMyByZW1vdmVkIGVsLl9tb2RlbCBpbiBmYXZvciBvZiBnZXRQcm9wcygpLCBtYWtpbmcgaGFyZGVyIHRvXG4gICAgICAvLyBhYnN0cmFjdCByZWFkaW5nIHZhbHVlcyBpbiBwb3NpdGlvbmVycy4gQWxzbywgdXNpbmcgc3RyaW5nIGFycmF5cyB0b1xuICAgICAgLy8gcmVhZCB2YWx1ZXMgKGkuZS4gdmFyIHthLGIsY30gPSBlbC5nZXRQcm9wcyhbXCJhXCIsXCJiXCIsXCJjXCJdKSkgd291bGQgbWFrZVxuICAgICAgLy8gcG9zaXRpb25lcnMgaW5lZmZpY2llbnQgaW4gdGhlIG5vcm1hbCBjYXNlIChpLmUuIG5vdCB0aGUgZmluYWwgdmFsdWVzKVxuICAgICAgLy8gYW5kIHRoZSBjb2RlIGEgYml0IHVnbHksIHNvIGxldCdzIHVzZSBhIFByb3h5IGluc3RlYWQuXG4gICAgICBwcm94eSA9IG5ldyBQcm94eShsYWJlbC5fZWwsIHtnZXQ6IChlbCwgcCkgPT4gZWwuZ2V0UHJvcHMoW3BdLCB0cnVlKVtwXX0pO1xuXG4gICAgICBnZW9tZXRyeSA9IGxhYmVsLmdlb21ldHJ5KCk7XG4gICAgICBjZW50ZXIgPSBjb29yZGluYXRlcyhwcm94eSwgbGFiZWwubW9kZWwoKSwgZ2VvbWV0cnkpO1xuICAgICAgc3RhdGUuX2JveC51cGRhdGUoY2VudGVyLCBnZW9tZXRyeSwgbGFiZWwucm90YXRpb24oKSk7XG4gICAgfVxuICB9XG5cbiAgLy8gQXV0byBoaWRlIG92ZXJsYXBwaW5nIGxhYmVsc1xuICByZXR1cm4gY29sbGlkZShsYWJlbHMsIGZ1bmN0aW9uKHMwLCBzMSkge1xuICAgIHZhciBoMCA9IHMwLl9oaWRhYmxlO1xuICAgIHZhciBoMSA9IHMxLl9oaWRhYmxlO1xuXG4gICAgaWYgKChoMCAmJiBoMSkgfHwgaDEpIHtcbiAgICAgIHMxLl92aXNpYmxlID0gZmFsc2U7XG4gICAgfSBlbHNlIGlmIChoMCkge1xuICAgICAgczAuX3Zpc2libGUgPSBmYWxzZTtcbiAgICB9XG4gIH0pO1xufVxuXG52YXIgbGF5b3V0ID0ge1xuICBwcmVwYXJlOiBmdW5jdGlvbihkYXRhc2V0cykge1xuICAgIHZhciBsYWJlbHMgPSBbXTtcbiAgICB2YXIgaSwgaiwgaWxlbiwgamxlbiwgbGFiZWw7XG5cbiAgICBmb3IgKGkgPSAwLCBpbGVuID0gZGF0YXNldHMubGVuZ3RoOyBpIDwgaWxlbjsgKytpKSB7XG4gICAgICBmb3IgKGogPSAwLCBqbGVuID0gZGF0YXNldHNbaV0ubGVuZ3RoOyBqIDwgamxlbjsgKytqKSB7XG4gICAgICAgIGxhYmVsID0gZGF0YXNldHNbaV1bal07XG4gICAgICAgIGxhYmVscy5wdXNoKGxhYmVsKTtcbiAgICAgICAgbGFiZWwuJGxheW91dCA9IHtcbiAgICAgICAgICBfYm94OiBuZXcgSGl0Qm94KCksXG4gICAgICAgICAgX2hpZGFibGU6IGZhbHNlLFxuICAgICAgICAgIF92aXNpYmxlOiB0cnVlLFxuICAgICAgICAgIF9zZXQ6IGksXG4gICAgICAgICAgX2lkeDogbGFiZWwuX2luZGV4XG4gICAgICAgIH07XG4gICAgICB9XG4gICAgfVxuXG4gICAgLy8gVE9ETyBOZXcgYHpgIG9wdGlvbjogbGFiZWxzIHdpdGggYSBoaWdoZXIgei1pbmRleCBhcmUgZHJhd25cbiAgICAvLyBvZiB0b3Agb2YgdGhlIG9uZXMgd2l0aCBhIGxvd2VyIGluZGV4LiBMb3dlc3Qgei1pbmRleCBsYWJlbHNcbiAgICAvLyBhcmUgYWxzbyBkaXNjYXJkZWQgZmlyc3Qgd2hlbiBoaWRpbmcgb3ZlcmxhcHBpbmcgbGFiZWxzLlxuICAgIGxhYmVscy5zb3J0KGZ1bmN0aW9uKGEsIGIpIHtcbiAgICAgIHZhciBzYSA9IGEuJGxheW91dDtcbiAgICAgIHZhciBzYiA9IGIuJGxheW91dDtcblxuICAgICAgcmV0dXJuIHNhLl9pZHggPT09IHNiLl9pZHhcbiAgICAgICAgPyBzYi5fc2V0IC0gc2EuX3NldFxuICAgICAgICA6IHNiLl9pZHggLSBzYS5faWR4O1xuICAgIH0pO1xuXG4gICAgdGhpcy51cGRhdGUobGFiZWxzKTtcblxuICAgIHJldHVybiBsYWJlbHM7XG4gIH0sXG5cbiAgdXBkYXRlOiBmdW5jdGlvbihsYWJlbHMpIHtcbiAgICB2YXIgZGlydHkgPSBmYWxzZTtcbiAgICB2YXIgaSwgaWxlbiwgbGFiZWwsIG1vZGVsLCBzdGF0ZTtcblxuICAgIGZvciAoaSA9IDAsIGlsZW4gPSBsYWJlbHMubGVuZ3RoOyBpIDwgaWxlbjsgKytpKSB7XG4gICAgICBsYWJlbCA9IGxhYmVsc1tpXTtcbiAgICAgIG1vZGVsID0gbGFiZWwubW9kZWwoKTtcbiAgICAgIHN0YXRlID0gbGFiZWwuJGxheW91dDtcbiAgICAgIHN0YXRlLl9oaWRhYmxlID0gbW9kZWwgJiYgbW9kZWwuZGlzcGxheSA9PT0gJ2F1dG8nO1xuICAgICAgc3RhdGUuX3Zpc2libGUgPSBsYWJlbC52aXNpYmxlKCk7XG4gICAgICBkaXJ0eSB8PSBzdGF0ZS5faGlkYWJsZTtcbiAgICB9XG5cbiAgICBpZiAoZGlydHkpIHtcbiAgICAgIGNvbXB1dGUobGFiZWxzKTtcbiAgICB9XG4gIH0sXG5cbiAgbG9va3VwOiBmdW5jdGlvbihsYWJlbHMsIHBvaW50KSB7XG4gICAgdmFyIGksIHN0YXRlO1xuXG4gICAgLy8gSU1QT1JUQU5UIEl0ZXJhdGUgaW4gdGhlIHJldmVyc2Ugb3JkZXIgc2luY2UgaXRlbXMgYXQgdGhlIGVuZCBvZlxuICAgIC8vIHRoZSBsaXN0IGhhdmUgYW4gaGlnaGVyIHotaW5kZXgsIHRodXMgc2hvdWxkIGJlIHBpY2tlZCBmaXJzdC5cblxuICAgIGZvciAoaSA9IGxhYmVscy5sZW5ndGggLSAxOyBpID49IDA7IC0taSkge1xuICAgICAgc3RhdGUgPSBsYWJlbHNbaV0uJGxheW91dDtcblxuICAgICAgaWYgKHN0YXRlICYmIHN0YXRlLl92aXNpYmxlICYmIHN0YXRlLl9ib3guY29udGFpbnMocG9pbnQpKSB7XG4gICAgICAgIHJldHVybiBsYWJlbHNbaV07XG4gICAgICB9XG4gICAgfVxuXG4gICAgcmV0dXJuIG51bGw7XG4gIH0sXG5cbiAgZHJhdzogZnVuY3Rpb24oY2hhcnQsIGxhYmVscykge1xuICAgIHZhciBpLCBpbGVuLCBsYWJlbCwgc3RhdGUsIGdlb21ldHJ5LCBjZW50ZXI7XG5cbiAgICBmb3IgKGkgPSAwLCBpbGVuID0gbGFiZWxzLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuICAgICAgbGFiZWwgPSBsYWJlbHNbaV07XG4gICAgICBzdGF0ZSA9IGxhYmVsLiRsYXlvdXQ7XG5cbiAgICAgIGlmIChzdGF0ZS5fdmlzaWJsZSkge1xuICAgICAgICBnZW9tZXRyeSA9IGxhYmVsLmdlb21ldHJ5KCk7XG4gICAgICAgIGNlbnRlciA9IGNvb3JkaW5hdGVzKGxhYmVsLl9lbCwgbGFiZWwubW9kZWwoKSwgZ2VvbWV0cnkpO1xuICAgICAgICBzdGF0ZS5fYm94LnVwZGF0ZShjZW50ZXIsIGdlb21ldHJ5LCBsYWJlbC5yb3RhdGlvbigpKTtcbiAgICAgICAgbGFiZWwuZHJhdyhjaGFydCwgY2VudGVyKTtcbiAgICAgIH1cbiAgICB9XG4gIH1cbn07XG5cbnZhciBmb3JtYXR0ZXIgPSBmdW5jdGlvbih2YWx1ZSkge1xuICBpZiAoaXNOdWxsT3JVbmRlZih2YWx1ZSkpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuXG4gIHZhciBsYWJlbCA9IHZhbHVlO1xuICB2YXIga2V5cywga2xlbiwgaztcbiAgaWYgKGlzT2JqZWN0KHZhbHVlKSkge1xuICAgIGlmICghaXNOdWxsT3JVbmRlZih2YWx1ZS5sYWJlbCkpIHtcbiAgICAgIGxhYmVsID0gdmFsdWUubGFiZWw7XG4gICAgfSBlbHNlIGlmICghaXNOdWxsT3JVbmRlZih2YWx1ZS5yKSkge1xuICAgICAgbGFiZWwgPSB2YWx1ZS5yO1xuICAgIH0gZWxzZSB7XG4gICAgICBsYWJlbCA9ICcnO1xuICAgICAga2V5cyA9IE9iamVjdC5rZXlzKHZhbHVlKTtcbiAgICAgIGZvciAoayA9IDAsIGtsZW4gPSBrZXlzLmxlbmd0aDsgayA8IGtsZW47ICsraykge1xuICAgICAgICBsYWJlbCArPSAoayAhPT0gMCA/ICcsICcgOiAnJykgKyBrZXlzW2tdICsgJzogJyArIHZhbHVlW2tleXNba11dO1xuICAgICAgfVxuICAgIH1cbiAgfVxuXG4gIHJldHVybiAnJyArIGxhYmVsO1xufTtcblxuLyoqXG4gKiBJTVBPUlRBTlQ6IG1ha2Ugc3VyZSB0byBhbHNvIHVwZGF0ZSB0ZXN0cyBhbmQgVHlwZVNjcmlwdCBkZWZpbml0aW9uXG4gKiBmaWxlcyAoYC90ZXN0L3NwZWNzL2RlZmF1bHRzLnNwZWMuanNgIGFuZCBgL3R5cGVzL29wdGlvbnMuZC50c2ApXG4gKi9cblxudmFyIGRlZmF1bHRzID0ge1xuICBhbGlnbjogJ2NlbnRlcicsXG4gIGFuY2hvcjogJ2NlbnRlcicsXG4gIGJhY2tncm91bmRDb2xvcjogbnVsbCxcbiAgYm9yZGVyQ29sb3I6IG51bGwsXG4gIGJvcmRlclJhZGl1czogMCxcbiAgYm9yZGVyV2lkdGg6IDAsXG4gIGNsYW1wOiBmYWxzZSxcbiAgY2xpcDogZmFsc2UsXG4gIGNvbG9yOiB1bmRlZmluZWQsXG4gIGRpc3BsYXk6IHRydWUsXG4gIGZvbnQ6IHtcbiAgICBmYW1pbHk6IHVuZGVmaW5lZCxcbiAgICBsaW5lSGVpZ2h0OiAxLjIsXG4gICAgc2l6ZTogdW5kZWZpbmVkLFxuICAgIHN0eWxlOiB1bmRlZmluZWQsXG4gICAgd2VpZ2h0OiBudWxsXG4gIH0sXG4gIGZvcm1hdHRlcjogZm9ybWF0dGVyLFxuICBsYWJlbHM6IHVuZGVmaW5lZCxcbiAgbGlzdGVuZXJzOiB7fSxcbiAgb2Zmc2V0OiA0LFxuICBvcGFjaXR5OiAxLFxuICBwYWRkaW5nOiB7XG4gICAgdG9wOiA0LFxuICAgIHJpZ2h0OiA0LFxuICAgIGJvdHRvbTogNCxcbiAgICBsZWZ0OiA0XG4gIH0sXG4gIHJvdGF0aW9uOiAwLFxuICB0ZXh0QWxpZ246ICdzdGFydCcsXG4gIHRleHRTdHJva2VDb2xvcjogdW5kZWZpbmVkLFxuICB0ZXh0U3Ryb2tlV2lkdGg6IDAsXG4gIHRleHRTaGFkb3dCbHVyOiAwLFxuICB0ZXh0U2hhZG93Q29sb3I6IHVuZGVmaW5lZFxufTtcblxuLyoqXG4gKiBAc2VlIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL0NoYXJ0LmpzL2lzc3Vlcy80MTc2XG4gKi9cblxudmFyIEVYUEFORE9fS0VZID0gJyRkYXRhbGFiZWxzJztcbnZhciBERUZBVUxUX0tFWSA9ICckZGVmYXVsdCc7XG5cbmZ1bmN0aW9uIGNvbmZpZ3VyZShkYXRhc2V0LCBvcHRpb25zKSB7XG4gIHZhciBvdmVycmlkZSA9IGRhdGFzZXQuZGF0YWxhYmVscztcbiAgdmFyIGxpc3RlbmVycyA9IHt9O1xuICB2YXIgY29uZmlncyA9IFtdO1xuICB2YXIgbGFiZWxzLCBrZXlzO1xuXG4gIGlmIChvdmVycmlkZSA9PT0gZmFsc2UpIHtcbiAgICByZXR1cm4gbnVsbDtcbiAgfVxuICBpZiAob3ZlcnJpZGUgPT09IHRydWUpIHtcbiAgICBvdmVycmlkZSA9IHt9O1xuICB9XG5cbiAgb3B0aW9ucyA9IG1lcmdlKHt9LCBbb3B0aW9ucywgb3ZlcnJpZGVdKTtcbiAgbGFiZWxzID0gb3B0aW9ucy5sYWJlbHMgfHwge307XG4gIGtleXMgPSBPYmplY3Qua2V5cyhsYWJlbHMpO1xuICBkZWxldGUgb3B0aW9ucy5sYWJlbHM7XG5cbiAgaWYgKGtleXMubGVuZ3RoKSB7XG4gICAga2V5cy5mb3JFYWNoKGZ1bmN0aW9uKGtleSkge1xuICAgICAgaWYgKGxhYmVsc1trZXldKSB7XG4gICAgICAgIGNvbmZpZ3MucHVzaChtZXJnZSh7fSwgW1xuICAgICAgICAgIG9wdGlvbnMsXG4gICAgICAgICAgbGFiZWxzW2tleV0sXG4gICAgICAgICAge19rZXk6IGtleX1cbiAgICAgICAgXSkpO1xuICAgICAgfVxuICAgIH0pO1xuICB9IGVsc2Uge1xuICAgIC8vIERlZmF1bHQgbGFiZWwgaWYgbm8gXCJuYW1lZFwiIGxhYmVsIGRlZmluZWQuXG4gICAgY29uZmlncy5wdXNoKG9wdGlvbnMpO1xuICB9XG5cbiAgLy8gbGlzdGVuZXJzOiB7PGV2ZW50LXR5cGU+OiB7PGxhYmVsLWtleT46IDxmbj59fVxuICBsaXN0ZW5lcnMgPSBjb25maWdzLnJlZHVjZShmdW5jdGlvbih0YXJnZXQsIGNvbmZpZykge1xuICAgIGVhY2goY29uZmlnLmxpc3RlbmVycyB8fCB7fSwgZnVuY3Rpb24oZm4sIGV2ZW50KSB7XG4gICAgICB0YXJnZXRbZXZlbnRdID0gdGFyZ2V0W2V2ZW50XSB8fCB7fTtcbiAgICAgIHRhcmdldFtldmVudF1bY29uZmlnLl9rZXkgfHwgREVGQVVMVF9LRVldID0gZm47XG4gICAgfSk7XG5cbiAgICBkZWxldGUgY29uZmlnLmxpc3RlbmVycztcbiAgICByZXR1cm4gdGFyZ2V0O1xuICB9LCB7fSk7XG5cbiAgcmV0dXJuIHtcbiAgICBsYWJlbHM6IGNvbmZpZ3MsXG4gICAgbGlzdGVuZXJzOiBsaXN0ZW5lcnNcbiAgfTtcbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hFdmVudChjaGFydCwgbGlzdGVuZXJzLCBsYWJlbCwgZXZlbnQpIHtcbiAgaWYgKCFsaXN0ZW5lcnMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICB2YXIgY29udGV4dCA9IGxhYmVsLiRjb250ZXh0O1xuICB2YXIgZ3JvdXBzID0gbGFiZWwuJGdyb3VwcztcbiAgdmFyIGNhbGxiYWNrJDE7XG5cbiAgaWYgKCFsaXN0ZW5lcnNbZ3JvdXBzLl9zZXRdKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgY2FsbGJhY2skMSA9IGxpc3RlbmVyc1tncm91cHMuX3NldF1bZ3JvdXBzLl9rZXldO1xuICBpZiAoIWNhbGxiYWNrJDEpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBpZiAoY2FsbGJhY2soY2FsbGJhY2skMSwgW2NvbnRleHQsIGV2ZW50XSkgPT09IHRydWUpIHtcbiAgICAvLyBVc2VycyBhcmUgYWxsb3dlZCB0byB0d2VhayB0aGUgZ2l2ZW4gY29udGV4dCBieSBpbmplY3RpbmcgdmFsdWVzIHRoYXQgY2FuIGJlXG4gICAgLy8gdXNlZCBpbiBzY3JpcHRhYmxlIG9wdGlvbnMgdG8gZGlzcGxheSBsYWJlbHMgZGlmZmVyZW50bHkgYmFzZWQgb24gdGhlIGN1cnJlbnRcbiAgICAvLyBldmVudCAoZS5nLiBoaWdobGlnaHQgYW4gaG92ZXJlZCBsYWJlbCkuIFRoYXQncyB3aHkgd2UgdXBkYXRlIHRoZSBsYWJlbCB3aXRoXG4gICAgLy8gdGhlIG91dHB1dCBjb250ZXh0IGFuZCBzY2hlZHVsZSBhIG5ldyBjaGFydCByZW5kZXIgYnkgc2V0dGluZyBpdCBkaXJ0eS5cbiAgICBjaGFydFtFWFBBTkRPX0tFWV0uX2RpcnR5ID0gdHJ1ZTtcbiAgICBsYWJlbC51cGRhdGUoY29udGV4dCk7XG4gIH1cbn1cblxuZnVuY3Rpb24gZGlzcGF0Y2hNb3ZlRXZlbnRzKGNoYXJ0LCBsaXN0ZW5lcnMsIHByZXZpb3VzLCBsYWJlbCwgZXZlbnQpIHtcbiAgdmFyIGVudGVyLCBsZWF2ZTtcblxuICBpZiAoIXByZXZpb3VzICYmICFsYWJlbCkge1xuICAgIHJldHVybjtcbiAgfVxuXG4gIGlmICghcHJldmlvdXMpIHtcbiAgICBlbnRlciA9IHRydWU7XG4gIH0gZWxzZSBpZiAoIWxhYmVsKSB7XG4gICAgbGVhdmUgPSB0cnVlO1xuICB9IGVsc2UgaWYgKHByZXZpb3VzICE9PSBsYWJlbCkge1xuICAgIGxlYXZlID0gZW50ZXIgPSB0cnVlO1xuICB9XG5cbiAgaWYgKGxlYXZlKSB7XG4gICAgZGlzcGF0Y2hFdmVudChjaGFydCwgbGlzdGVuZXJzLmxlYXZlLCBwcmV2aW91cywgZXZlbnQpO1xuICB9XG4gIGlmIChlbnRlcikge1xuICAgIGRpc3BhdGNoRXZlbnQoY2hhcnQsIGxpc3RlbmVycy5lbnRlciwgbGFiZWwsIGV2ZW50KTtcbiAgfVxufVxuXG5mdW5jdGlvbiBoYW5kbGVNb3ZlRXZlbnRzKGNoYXJ0LCBldmVudCkge1xuICB2YXIgZXhwYW5kbyA9IGNoYXJ0W0VYUEFORE9fS0VZXTtcbiAgdmFyIGxpc3RlbmVycyA9IGV4cGFuZG8uX2xpc3RlbmVycztcbiAgdmFyIHByZXZpb3VzLCBsYWJlbDtcblxuICBpZiAoIWxpc3RlbmVycy5lbnRlciAmJiAhbGlzdGVuZXJzLmxlYXZlKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgaWYgKGV2ZW50LnR5cGUgPT09ICdtb3VzZW1vdmUnKSB7XG4gICAgbGFiZWwgPSBsYXlvdXQubG9va3VwKGV4cGFuZG8uX2xhYmVscywgZXZlbnQpO1xuICB9IGVsc2UgaWYgKGV2ZW50LnR5cGUgIT09ICdtb3VzZW91dCcpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBwcmV2aW91cyA9IGV4cGFuZG8uX2hvdmVyZWQ7XG4gIGV4cGFuZG8uX2hvdmVyZWQgPSBsYWJlbDtcbiAgZGlzcGF0Y2hNb3ZlRXZlbnRzKGNoYXJ0LCBsaXN0ZW5lcnMsIHByZXZpb3VzLCBsYWJlbCwgZXZlbnQpO1xufVxuXG5mdW5jdGlvbiBoYW5kbGVDbGlja0V2ZW50cyhjaGFydCwgZXZlbnQpIHtcbiAgdmFyIGV4cGFuZG8gPSBjaGFydFtFWFBBTkRPX0tFWV07XG4gIHZhciBoYW5kbGVycyA9IGV4cGFuZG8uX2xpc3RlbmVycy5jbGljaztcbiAgdmFyIGxhYmVsID0gaGFuZGxlcnMgJiYgbGF5b3V0Lmxvb2t1cChleHBhbmRvLl9sYWJlbHMsIGV2ZW50KTtcbiAgaWYgKGxhYmVsKSB7XG4gICAgZGlzcGF0Y2hFdmVudChjaGFydCwgaGFuZGxlcnMsIGxhYmVsLCBldmVudCk7XG4gIH1cbn1cblxudmFyIHBsdWdpbiA9IHtcbiAgaWQ6ICdkYXRhbGFiZWxzJyxcblxuICBkZWZhdWx0czogZGVmYXVsdHMsXG5cbiAgYmVmb3JlSW5pdDogZnVuY3Rpb24oY2hhcnQpIHtcbiAgICBjaGFydFtFWFBBTkRPX0tFWV0gPSB7XG4gICAgICBfYWN0aXZlczogW11cbiAgICB9O1xuICB9LFxuXG4gIGJlZm9yZVVwZGF0ZTogZnVuY3Rpb24oY2hhcnQpIHtcbiAgICB2YXIgZXhwYW5kbyA9IGNoYXJ0W0VYUEFORE9fS0VZXTtcbiAgICBleHBhbmRvLl9saXN0ZW5lZCA9IGZhbHNlO1xuICAgIGV4cGFuZG8uX2xpc3RlbmVycyA9IHt9OyAgICAgLy8gezxldmVudC10eXBlPjogezxkYXRhc2V0LWluZGV4PjogezxsYWJlbC1rZXk+OiA8Zm4+fX19XG4gICAgZXhwYW5kby5fZGF0YXNldHMgPSBbXTsgICAgICAvLyBwZXIgZGF0YXNldCBsYWJlbHM6IFtMYWJlbFtdXVxuICAgIGV4cGFuZG8uX2xhYmVscyA9IFtdOyAgICAgICAgLy8gbGF5b3V0ZWQgbGFiZWxzOiBMYWJlbFtdXG4gIH0sXG5cbiAgYWZ0ZXJEYXRhc2V0VXBkYXRlOiBmdW5jdGlvbihjaGFydCwgYXJncywgb3B0aW9ucykge1xuICAgIHZhciBkYXRhc2V0SW5kZXggPSBhcmdzLmluZGV4O1xuICAgIHZhciBleHBhbmRvID0gY2hhcnRbRVhQQU5ET19LRVldO1xuICAgIHZhciBsYWJlbHMgPSBleHBhbmRvLl9kYXRhc2V0c1tkYXRhc2V0SW5kZXhdID0gW107XG4gICAgdmFyIHZpc2libGUgPSBjaGFydC5pc0RhdGFzZXRWaXNpYmxlKGRhdGFzZXRJbmRleCk7XG4gICAgdmFyIGRhdGFzZXQgPSBjaGFydC5kYXRhLmRhdGFzZXRzW2RhdGFzZXRJbmRleF07XG4gICAgdmFyIGNvbmZpZyA9IGNvbmZpZ3VyZShkYXRhc2V0LCBvcHRpb25zKTtcbiAgICB2YXIgZWxlbWVudHMgPSBhcmdzLm1ldGEuZGF0YSB8fCBbXTtcbiAgICB2YXIgY3R4ID0gY2hhcnQuY3R4O1xuICAgIHZhciBpLCBqLCBpbGVuLCBqbGVuLCBjZmcsIGtleSwgZWwsIGxhYmVsO1xuXG4gICAgY3R4LnNhdmUoKTtcblxuICAgIGZvciAoaSA9IDAsIGlsZW4gPSBlbGVtZW50cy5sZW5ndGg7IGkgPCBpbGVuOyArK2kpIHtcbiAgICAgIGVsID0gZWxlbWVudHNbaV07XG4gICAgICBlbFtFWFBBTkRPX0tFWV0gPSBbXTtcblxuICAgICAgaWYgKHZpc2libGUgJiYgZWwgJiYgY2hhcnQuZ2V0RGF0YVZpc2liaWxpdHkoaSkgJiYgIWVsLnNraXApIHtcbiAgICAgICAgZm9yIChqID0gMCwgamxlbiA9IGNvbmZpZy5sYWJlbHMubGVuZ3RoOyBqIDwgamxlbjsgKytqKSB7XG4gICAgICAgICAgY2ZnID0gY29uZmlnLmxhYmVsc1tqXTtcbiAgICAgICAgICBrZXkgPSBjZmcuX2tleTtcblxuICAgICAgICAgIGxhYmVsID0gbmV3IExhYmVsKGNmZywgY3R4LCBlbCwgaSk7XG4gICAgICAgICAgbGFiZWwuJGdyb3VwcyA9IHtcbiAgICAgICAgICAgIF9zZXQ6IGRhdGFzZXRJbmRleCxcbiAgICAgICAgICAgIF9rZXk6IGtleSB8fCBERUZBVUxUX0tFWVxuICAgICAgICAgIH07XG4gICAgICAgICAgbGFiZWwuJGNvbnRleHQgPSB7XG4gICAgICAgICAgICBhY3RpdmU6IGZhbHNlLFxuICAgICAgICAgICAgY2hhcnQ6IGNoYXJ0LFxuICAgICAgICAgICAgZGF0YUluZGV4OiBpLFxuICAgICAgICAgICAgZGF0YXNldDogZGF0YXNldCxcbiAgICAgICAgICAgIGRhdGFzZXRJbmRleDogZGF0YXNldEluZGV4XG4gICAgICAgICAgfTtcblxuICAgICAgICAgIGxhYmVsLnVwZGF0ZShsYWJlbC4kY29udGV4dCk7XG4gICAgICAgICAgZWxbRVhQQU5ET19LRVldLnB1c2gobGFiZWwpO1xuICAgICAgICAgIGxhYmVscy5wdXNoKGxhYmVsKTtcbiAgICAgICAgfVxuICAgICAgfVxuICAgIH1cblxuICAgIGN0eC5yZXN0b3JlKCk7XG5cbiAgICAvLyBTdG9yZSBsaXN0ZW5lcnMgYXQgdGhlIGNoYXJ0IGxldmVsIGFuZCBwZXIgZXZlbnQgdHlwZSB0byBvcHRpbWl6ZVxuICAgIC8vIGNhc2VzIHdoZXJlIG5vIGxpc3RlbmVycyBhcmUgcmVnaXN0ZXJlZCBmb3IgYSBzcGVjaWZpYyBldmVudC5cbiAgICBtZXJnZShleHBhbmRvLl9saXN0ZW5lcnMsIGNvbmZpZy5saXN0ZW5lcnMsIHtcbiAgICAgIG1lcmdlcjogZnVuY3Rpb24oZXZlbnQsIHRhcmdldCwgc291cmNlKSB7XG4gICAgICAgIHRhcmdldFtldmVudF0gPSB0YXJnZXRbZXZlbnRdIHx8IHt9O1xuICAgICAgICB0YXJnZXRbZXZlbnRdW2FyZ3MuaW5kZXhdID0gc291cmNlW2V2ZW50XTtcbiAgICAgICAgZXhwYW5kby5fbGlzdGVuZWQgPSB0cnVlO1xuICAgICAgfVxuICAgIH0pO1xuICB9LFxuXG4gIGFmdGVyVXBkYXRlOiBmdW5jdGlvbihjaGFydCkge1xuICAgIGNoYXJ0W0VYUEFORE9fS0VZXS5fbGFiZWxzID0gbGF5b3V0LnByZXBhcmUoY2hhcnRbRVhQQU5ET19LRVldLl9kYXRhc2V0cyk7XG4gIH0sXG5cbiAgLy8gRHJhdyBsYWJlbHMgb24gdG9wIG9mIGFsbCBkYXRhc2V0IGVsZW1lbnRzXG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL2NoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMvaXNzdWVzLzI5XG4gIC8vIGh0dHBzOi8vZ2l0aHViLmNvbS9jaGFydGpzL2NoYXJ0anMtcGx1Z2luLWRhdGFsYWJlbHMvaXNzdWVzLzMyXG4gIGFmdGVyRGF0YXNldHNEcmF3OiBmdW5jdGlvbihjaGFydCkge1xuICAgIGxheW91dC5kcmF3KGNoYXJ0LCBjaGFydFtFWFBBTkRPX0tFWV0uX2xhYmVscyk7XG4gIH0sXG5cbiAgYmVmb3JlRXZlbnQ6IGZ1bmN0aW9uKGNoYXJ0LCBhcmdzKSB7XG4gICAgLy8gSWYgdGhlcmUgaXMgbm8gbGlzdGVuZXIgcmVnaXN0ZXJlZCBmb3IgdGhpcyBjaGFydCwgYGxpc3RlbmVkYCB3aWxsIGJlIGZhbHNlLFxuICAgIC8vIG1lYW5pbmcgd2UgY2FuIGltbWVkaWF0ZWx5IGlnbm9yZSB0aGUgaW5jb21pbmcgZXZlbnQgYW5kIGF2b2lkIHVzZWxlc3MgZXh0cmFcbiAgICAvLyBjb21wdXRhdGlvbiBmb3IgdXNlcnMgd2hvIGRvbid0IGltcGxlbWVudCBsYWJlbCBpbnRlcmFjdGlvbnMuXG4gICAgaWYgKGNoYXJ0W0VYUEFORE9fS0VZXS5fbGlzdGVuZWQpIHtcbiAgICAgIHZhciBldmVudCA9IGFyZ3MuZXZlbnQ7XG4gICAgICBzd2l0Y2ggKGV2ZW50LnR5cGUpIHtcbiAgICAgIGNhc2UgJ21vdXNlbW92ZSc6XG4gICAgICBjYXNlICdtb3VzZW91dCc6XG4gICAgICAgIGhhbmRsZU1vdmVFdmVudHMoY2hhcnQsIGV2ZW50KTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdjbGljayc6XG4gICAgICAgIGhhbmRsZUNsaWNrRXZlbnRzKGNoYXJ0LCBldmVudCk7XG4gICAgICAgIGJyZWFrO1xuICAgICAgfVxuICAgIH1cbiAgfSxcblxuICBhZnRlckV2ZW50OiBmdW5jdGlvbihjaGFydCkge1xuICAgIHZhciBleHBhbmRvID0gY2hhcnRbRVhQQU5ET19LRVldO1xuICAgIHZhciBwcmV2aW91cyA9IGV4cGFuZG8uX2FjdGl2ZXM7XG4gICAgdmFyIGFjdGl2ZXMgPSBleHBhbmRvLl9hY3RpdmVzID0gY2hhcnQuZ2V0QWN0aXZlRWxlbWVudHMoKTtcbiAgICB2YXIgdXBkYXRlcyA9IHV0aWxzLmFycmF5RGlmZihwcmV2aW91cywgYWN0aXZlcyk7XG4gICAgdmFyIGksIGlsZW4sIGosIGpsZW4sIHVwZGF0ZSwgbGFiZWwsIGxhYmVscztcblxuICAgIGZvciAoaSA9IDAsIGlsZW4gPSB1cGRhdGVzLmxlbmd0aDsgaSA8IGlsZW47ICsraSkge1xuICAgICAgdXBkYXRlID0gdXBkYXRlc1tpXTtcbiAgICAgIGlmICh1cGRhdGVbMV0pIHtcbiAgICAgICAgbGFiZWxzID0gdXBkYXRlWzBdLmVsZW1lbnRbRVhQQU5ET19LRVldIHx8IFtdO1xuICAgICAgICBmb3IgKGogPSAwLCBqbGVuID0gbGFiZWxzLmxlbmd0aDsgaiA8IGpsZW47ICsraikge1xuICAgICAgICAgIGxhYmVsID0gbGFiZWxzW2pdO1xuICAgICAgICAgIGxhYmVsLiRjb250ZXh0LmFjdGl2ZSA9ICh1cGRhdGVbMV0gPT09IDEpO1xuICAgICAgICAgIGxhYmVsLnVwZGF0ZShsYWJlbC4kY29udGV4dCk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG5cbiAgICBpZiAoZXhwYW5kby5fZGlydHkgfHwgdXBkYXRlcy5sZW5ndGgpIHtcbiAgICAgIGxheW91dC51cGRhdGUoZXhwYW5kby5fbGFiZWxzKTtcbiAgICAgIGNoYXJ0LnJlbmRlcigpO1xuICAgIH1cblxuICAgIGRlbGV0ZSBleHBhbmRvLl9kaXJ0eTtcbiAgfVxufTtcblxuZXhwb3J0IHsgcGx1Z2luIGFzIGRlZmF1bHQgfTtcbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUFBO0FBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQVNBLElBQUksb0JBQW9CLFdBQVc7QUFDakMsTUFBSSxPQUFPLFdBQVcsYUFBYTtBQUNqQyxRQUFJLE9BQU8sa0JBQWtCO0FBQzNCLGFBQU8sT0FBTztBQUFBLElBQ2hCO0FBS0EsUUFBSSxTQUFTLE9BQU87QUFDcEIsUUFBSSxRQUFRO0FBQ1YsY0FBUSxPQUFPLGNBQWMsTUFBTSxPQUFPLGVBQWU7QUFBQSxJQUMzRDtBQUFBLEVBQ0Y7QUFFQSxTQUFPO0FBQ1Q7QUFFQSxJQUFJLFFBQVE7QUFBQTtBQUFBLEVBRVYsYUFBYSxTQUFTLFFBQVE7QUFDNUIsUUFBSSxRQUFRLENBQUE7QUFDWixRQUFJO0FBRUosYUFBUyxDQUFBLEVBQUcsT0FBTyxNQUFNO0FBQ3pCLFdBQU8sT0FBTyxRQUFRO0FB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
