function _typeof(obj) {
  '@babel/helpers - typeof';
  return (
    (_typeof =
      'function' == typeof Symbol && 'symbol' == typeof Symbol.iterator
        ? function (obj2) {
            return typeof obj2;
          }
        : function (obj2) {
            return obj2 &&
              'function' == typeof Symbol &&
              obj2.constructor === Symbol &&
              obj2 !== Symbol.prototype
              ? 'symbol'
              : typeof obj2;
          }),
    _typeof(obj)
  );
}
var trimLeft = /^\s+/;
var trimRight = /\s+$/;
function tinycolor(color, opts) {
  color = color ? color : '';
  opts = opts || {};
  if (color instanceof tinycolor) {
    return color;
  }
  if (!(this instanceof tinycolor)) {
    return new tinycolor(color, opts);
  }
  var rgb = inputToRGB(color);
  ((this._originalInput = color),
    (this._r = rgb.r),
    (this._g = rgb.g),
    (this._b = rgb.b),
    (this._a = rgb.a),
    (this._roundA = Math.round(100 * this._a) / 100),
    (this._format = opts.format || rgb.format));
  this._gradientType = opts.gradientType;
  if (this._r < 1) this._r = Math.round(this._r);
  if (this._g < 1) this._g = Math.round(this._g);
  if (this._b < 1) this._b = Math.round(this._b);
  this._ok = rgb.ok;
}
tinycolor.prototype = {
  isDark: function isDark() {
    return this.getBrightness() < 128;
  },
  isLight: function isLight() {
    return !this.isDark();
  },
  isValid: function isValid() {
    return this._ok;
  },
  getOriginalInput: function getOriginalInput() {
    return this._originalInput;
  },
  getFormat: function getFormat() {
    return this._format;
  },
  getAlpha: function getAlpha() {
    return this._a;
  },
  getBrightness: function getBrightness() {
    var rgb = this.toRgb();
    return (rgb.r * 299 + rgb.g * 587 + rgb.b * 114) / 1e3;
  },
  getLuminance: function getLuminance() {
    var rgb = this.toRgb();
    var RsRGB, GsRGB, BsRGB, R, G, B;
    RsRGB = rgb.r / 255;
    GsRGB = rgb.g / 255;
    BsRGB = rgb.b / 255;
    if (RsRGB <= 0.03928) R = RsRGB / 12.92;
    else R = Math.pow((RsRGB + 0.055) / 1.055, 2.4);
    if (GsRGB <= 0.03928) G = GsRGB / 12.92;
    else G = Math.pow((GsRGB + 0.055) / 1.055, 2.4);
    if (BsRGB <= 0.03928) B = BsRGB / 12.92;
    else B = Math.pow((BsRGB + 0.055) / 1.055, 2.4);
    return 0.2126 * R + 0.7152 * G + 0.0722 * B;
  },
  setAlpha: function setAlpha(value) {
    this._a = boundAlpha(value);
    this._roundA = Math.round(100 * this._a) / 100;
    return this;
  },
  toHsv: function toHsv() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    return {
      h: hsv.h * 360,
      s: hsv.s,
      v: hsv.v,
      a: this._a,
    };
  },
  toHsvString: function toHsvString() {
    var hsv = rgbToHsv(this._r, this._g, this._b);
    var h = Math.round(hsv.h * 360),
      s = Math.round(hsv.s * 100),
      v = Math.round(hsv.v * 100);
    return this._a == 1
      ? 'hsv(' + h + ', ' + s + '%, ' + v + '%)'
      : 'hsva(' + h + ', ' + s + '%, ' + v + '%, ' + this._roundA + ')';
  },
  toHsl: function toHsl() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    return {
      h: hsl.h * 360,
      s: hsl.s,
      l: hsl.l,
      a: this._a,
    };
  },
  toHslString: function toHslString() {
    var hsl = rgbToHsl(this._r, this._g, this._b);
    var h = Math.round(hsl.h * 360),
      s = Math.round(hsl.s * 100),
      l = Math.round(hsl.l * 100);
    return this._a == 1
      ? 'hsl(' + h + ', ' + s + '%, ' + l + '%)'
      : 'hsla(' + h + ', ' + s + '%, ' + l + '%, ' + this._roundA + ')';
  },
  toHex: function toHex(allow3Char) {
    return rgbToHex(this._r, this._g, this._b, allow3Char);
  },
  toHexString: function toHexString(allow3Char) {
    return '#' + this.toHex(allow3Char);
  },
  toHex8: function toHex8(allow4Char) {
    return rgbaToHex(this._r, this._g, this._b, this._a, allow4Char);
  },
  toHex8String: function toHex8String(allow4Char) {
    return '#' + this.toHex8(allow4Char);
  },
  toRgb: function toRgb() {
    return {
      r: Math.round(this._r),
      g: Math.round(this._g),
      b: Math.round(this._b),
      a: this._a,
    };
  },
  toRgbString: function toRgbString() {
    return this._a == 1
      ? 'rgb(' + Math.round(this._r) + ', ' + Math.round(this._g) + ', ' + Math.round(this._b) + ')'
      : 'rgba(' +
          Math.round(this._r) +
          ', ' +
          Math.round(this._g) +
          ', ' +
          Math.round(this._b) +
          ', ' +
          this._roundA +
          ')';
  },
  toPercentageRgb: function toPercentageRgb() {
    return {
      r: Math.round(bound01(this._r, 255) * 100) + '%',
      g: Math.round(bound01(this._g, 255) * 100) + '%',
      b: Math.round(bound01(this._b, 255) * 100) + '%',
      a: this._a,
    };
  },
  toPercentageRgbString: function toPercentageRgbString() {
    return this._a == 1
      ? 'rgb(' +
          Math.round(bound01(this._r, 255) * 100) +
          '%, ' +
          Math.round(bound01(this._g, 255) * 100) +
          '%, ' +
          Math.round(bound01(this._b, 255) * 100) +
          '%)'
      : 'rgba(' +
          Math.round(bound01(this._r, 255) * 100) +
          '%, ' +
          Math.round(bound01(this._g, 255) * 100) +
          '%, ' +
          Math.round(bound01(this._b, 255) * 100) +
          '%, ' +
          this._roundA +
          ')';
  },
  toName: function toName() {
    if (this._a === 0) {
      return 'transparent';
    }
    if (this._a < 1) {
      return false;
    }
    return hexNames[rgbToHex(this._r, this._g, this._b, true)] || false;
  },
  toFilter: function toFilter(secondColor) {
    var hex8String = '#' + rgbaToArgbHex(this._r, this._g, this._b, this._a);
    var secondHex8String = hex8String;
    var gradientType = this._gradientType ? 'GradientType = 1, ' : '';
    if (secondColor) {
      var s = tinycolor(secondColor);
      secondHex8String = '#' + rgbaToArgbHex(s._r, s._g, s._b, s._a);
    }
    return (
      'progid:DXImageTransform.Microsoft.gradient(' +
      gradientType +
      'startColorstr=' +
      hex8String +
      ',endColorstr=' +
      secondHex8String +
      ')'
    );
  },
  toString: function toString(format) {
    var formatSet = !!format;
    format = format || this._format;
    var formattedString = false;
    var hasAlpha = this._a < 1 && this._a >= 0;
    var needsAlphaFormat =
      !formatSet &&
      hasAlpha &&
      (format === 'hex' ||
        format === 'hex6' ||
        format === 'hex3' ||
        format === 'hex4' ||
        format === 'hex8' ||
        format === 'name');
    if (needsAlphaFormat) {
      if (format === 'name' && this._a === 0) {
        return this.toName();
      }
      return this.toRgbString();
    }
    if (format === 'rgb') {
      formattedString = this.toRgbString();
    }
    if (format === 'prgb') {
      formattedString = this.toPercentageRgbString();
    }
    if (format === 'hex' || format === 'hex6') {
      formattedString = this.toHexString();
    }
    if (format === 'hex3') {
      formattedString = this.toHexString(true);
    }
    if (format === 'hex4') {
      formattedString = this.toHex8String(true);
    }
    if (format === 'hex8') {
      formattedString = this.toHex8String();
    }
    if (format === 'name') {
      formattedString = this.toName();
    }
    if (format === 'hsl') {
      formattedString = this.toHslString();
    }
    if (format === 'hsv') {
      formattedString = this.toHsvString();
    }
    return formattedString || this.toHexString();
  },
  clone: function clone() {
    return tinycolor(this.toString());
  },
  _applyModification: function _applyModification(fn, args) {
    var color = fn.apply(null, [this].concat([].slice.call(args)));
    this._r = color._r;
    this._g = color._g;
    this._b = color._b;
    this.setAlpha(color._a);
    return this;
  },
  lighten: function lighten() {
    return this._applyModification(_lighten, arguments);
  },
  brighten: function brighten() {
    return this._applyModification(_brighten, arguments);
  },
  darken: function darken() {
    return this._applyModification(_darken, arguments);
  },
  desaturate: function desaturate() {
    return this._applyModification(_desaturate, arguments);
  },
  saturate: function saturate() {
    return this._applyModification(_saturate, arguments);
  },
  greyscale: function greyscale() {
    return this._applyModification(_greyscale, arguments);
  },
  spin: function spin() {
    return this._applyModification(_spin, arguments);
  },
  _applyCombination: function _applyCombination(fn, args) {
    return fn.apply(null, [this].concat([].slice.call(args)));
  },
  analogous: function analogous() {
    return this._applyCombination(_analogous, arguments);
  },
  complement: function complement() {
    return this._applyCombination(_complement, arguments);
  },
  monochromatic: function monochromatic() {
    return this._applyCombination(_monochromatic, arguments);
  },
  splitcomplement: function splitcomplement() {
    return this._applyCombination(_splitcomplement, arguments);
  },
  // Disabled until https://github.com/bgrins/TinyColor/issues/254
  // polyad: function (number) {
  //   return this._applyCombination(polyad, [number]);
  // },
  triad: function triad() {
    return this._applyCombination(polyad, [3]);
  },
  tetrad: function tetrad() {
    return this._applyCombination(polyad, [4]);
  },
};
tinycolor.fromRatio = function (color, opts) {
  if (_typeof(color) == 'object') {
    var newColor = {};
    for (var i in color) {
      if (color.hasOwnProperty(i)) {
        if (i === 'a') {
          newColor[i] = color[i];
        } else {
          newColor[i] = convertToPercentage(color[i]);
        }
      }
    }
    color = newColor;
  }
  return tinycolor(color, opts);
};
function inputToRGB(color) {
  var rgb = {
    r: 0,
    g: 0,
    b: 0,
  };
  var a = 1;
  var s = null;
  var v = null;
  var l = null;
  var ok = false;
  var format = false;
  if (typeof color == 'string') {
    color = stringInputToObject(color);
  }
  if (_typeof(color) == 'object') {
    if (isValidCSSUnit(color.r) && isValidCSSUnit(color.g) && isValidCSSUnit(color.b)) {
      rgb = rgbToRgb(color.r, color.g, color.b);
      ok = true;
      format = String(color.r).substr(-1) === '%' ? 'prgb' : 'rgb';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.v)) {
      s = convertToPercentage(color.s);
      v = convertToPercentage(color.v);
      rgb = hsvToRgb(color.h, s, v);
      ok = true;
      format = 'hsv';
    } else if (isValidCSSUnit(color.h) && isValidCSSUnit(color.s) && isValidCSSUnit(color.l)) {
      s = convertToPercentage(color.s);
      l = convertToPercentage(color.l);
      rgb = hslToRgb(color.h, s, l);
      ok = true;
      format = 'hsl';
    }
    if (color.hasOwnProperty('a')) {
      a = color.a;
    }
  }
  a = boundAlpha(a);
  return {
    ok,
    format: color.format || format,
    r: Math.min(255, Math.max(rgb.r, 0)),
    g: Math.min(255, Math.max(rgb.g, 0)),
    b: Math.min(255, Math.max(rgb.b, 0)),
    a,
  };
}
function rgbToRgb(r, g, b) {
  return {
    r: bound01(r, 255) * 255,
    g: bound01(g, 255) * 255,
    b: bound01(b, 255) * 255,
  };
}
function rgbToHsl(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    l = (max + min) / 2;
  if (max == min) {
    h = s = 0;
  } else {
    var d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h,
    s,
    l,
  };
}
function hslToRgb(h, s, l) {
  var r, g, b;
  h = bound01(h, 360);
  s = bound01(s, 100);
  l = bound01(l, 100);
  function hue2rgb(p2, q2, t) {
    if (t < 0) t += 1;
    if (t > 1) t -= 1;
    if (t < 1 / 6) return p2 + (q2 - p2) * 6 * t;
    if (t < 1 / 2) return q2;
    if (t < 2 / 3) return p2 + (q2 - p2) * (2 / 3 - t) * 6;
    return p2;
  }
  if (s === 0) {
    r = g = b = l;
  } else {
    var q = l < 0.5 ? l * (1 + s) : l + s - l * s;
    var p = 2 * l - q;
    r = hue2rgb(p, q, h + 1 / 3);
    g = hue2rgb(p, q, h);
    b = hue2rgb(p, q, h - 1 / 3);
  }
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}
function rgbToHsv(r, g, b) {
  r = bound01(r, 255);
  g = bound01(g, 255);
  b = bound01(b, 255);
  var max = Math.max(r, g, b),
    min = Math.min(r, g, b);
  var h,
    s,
    v = max;
  var d = max - min;
  s = max === 0 ? 0 : d / max;
  if (max == min) {
    h = 0;
  } else {
    switch (max) {
      case r:
        h = (g - b) / d + (g < b ? 6 : 0);
        break;
      case g:
        h = (b - r) / d + 2;
        break;
      case b:
        h = (r - g) / d + 4;
        break;
    }
    h /= 6;
  }
  return {
    h,
    s,
    v,
  };
}
function hsvToRgb(h, s, v) {
  h = bound01(h, 360) * 6;
  s = bound01(s, 100);
  v = bound01(v, 100);
  var i = Math.floor(h),
    f = h - i,
    p = v * (1 - s),
    q = v * (1 - f * s),
    t = v * (1 - (1 - f) * s),
    mod = i % 6,
    r = [v, q, p, p, t, v][mod],
    g = [t, v, v, q, p, p][mod],
    b = [p, p, t, v, v, q][mod];
  return {
    r: r * 255,
    g: g * 255,
    b: b * 255,
  };
}
function rgbToHex(r, g, b, allow3Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
  ];
  if (
    allow3Char &&
    hex[0].charAt(0) == hex[0].charAt(1) &&
    hex[1].charAt(0) == hex[1].charAt(1) &&
    hex[2].charAt(0) == hex[2].charAt(1)
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0);
  }
  return hex.join('');
}
function rgbaToHex(r, g, b, a, allow4Char) {
  var hex = [
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
    pad2(convertDecimalToHex(a)),
  ];
  if (
    allow4Char &&
    hex[0].charAt(0) == hex[0].charAt(1) &&
    hex[1].charAt(0) == hex[1].charAt(1) &&
    hex[2].charAt(0) == hex[2].charAt(1) &&
    hex[3].charAt(0) == hex[3].charAt(1)
  ) {
    return hex[0].charAt(0) + hex[1].charAt(0) + hex[2].charAt(0) + hex[3].charAt(0);
  }
  return hex.join('');
}
function rgbaToArgbHex(r, g, b, a) {
  var hex = [
    pad2(convertDecimalToHex(a)),
    pad2(Math.round(r).toString(16)),
    pad2(Math.round(g).toString(16)),
    pad2(Math.round(b).toString(16)),
  ];
  return hex.join('');
}
tinycolor.equals = function (color1, color2) {
  if (!color1 || !color2) return false;
  return tinycolor(color1).toRgbString() == tinycolor(color2).toRgbString();
};
tinycolor.random = function () {
  return tinycolor.fromRatio({
    r: Math.random(),
    g: Math.random(),
    b: Math.random(),
  });
};
function _desaturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s -= amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _saturate(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.s += amount / 100;
  hsl.s = clamp01(hsl.s);
  return tinycolor(hsl);
}
function _greyscale(color) {
  return tinycolor(color).desaturate(100);
}
function _lighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l += amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _brighten(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var rgb = tinycolor(color).toRgb();
  rgb.r = Math.max(0, Math.min(255, rgb.r - Math.round(255 * -(amount / 100))));
  rgb.g = Math.max(0, Math.min(255, rgb.g - Math.round(255 * -(amount / 100))));
  rgb.b = Math.max(0, Math.min(255, rgb.b - Math.round(255 * -(amount / 100))));
  return tinycolor(rgb);
}
function _darken(color, amount) {
  amount = amount === 0 ? 0 : amount || 10;
  var hsl = tinycolor(color).toHsl();
  hsl.l -= amount / 100;
  hsl.l = clamp01(hsl.l);
  return tinycolor(hsl);
}
function _spin(color, amount) {
  var hsl = tinycolor(color).toHsl();
  var hue = (hsl.h + amount) % 360;
  hsl.h = hue < 0 ? 360 + hue : hue;
  return tinycolor(hsl);
}
function _complement(color) {
  var hsl = tinycolor(color).toHsl();
  hsl.h = (hsl.h + 180) % 360;
  return tinycolor(hsl);
}
function polyad(color, number) {
  if (isNaN(number) || number <= 0) {
    throw new Error('Argument to polyad must be a positive number');
  }
  var hsl = tinycolor(color).toHsl();
  var result = [tinycolor(color)];
  var step = 360 / number;
  for (var i = 1; i < number; i++) {
    result.push(
      tinycolor({
        h: (hsl.h + i * step) % 360,
        s: hsl.s,
        l: hsl.l,
      }),
    );
  }
  return result;
}
function _splitcomplement(color) {
  var hsl = tinycolor(color).toHsl();
  var h = hsl.h;
  return [
    tinycolor(color),
    tinycolor({
      h: (h + 72) % 360,
      s: hsl.s,
      l: hsl.l,
    }),
    tinycolor({
      h: (h + 216) % 360,
      s: hsl.s,
      l: hsl.l,
    }),
  ];
}
function _analogous(color, results, slices) {
  results = results || 6;
  slices = slices || 30;
  var hsl = tinycolor(color).toHsl();
  var part = 360 / slices;
  var ret = [tinycolor(color)];
  for (hsl.h = (hsl.h - ((part * results) >> 1) + 720) % 360; --results; ) {
    hsl.h = (hsl.h + part) % 360;
    ret.push(tinycolor(hsl));
  }
  return ret;
}
function _monochromatic(color, results) {
  results = results || 6;
  var hsv = tinycolor(color).toHsv();
  var h = hsv.h,
    s = hsv.s,
    v = hsv.v;
  var ret = [];
  var modification = 1 / results;
  while (results--) {
    ret.push(
      tinycolor({
        h,
        s,
        v,
      }),
    );
    v = (v + modification) % 1;
  }
  return ret;
}
tinycolor.mix = function (color1, color2, amount) {
  amount = amount === 0 ? 0 : amount || 50;
  var rgb1 = tinycolor(color1).toRgb();
  var rgb2 = tinycolor(color2).toRgb();
  var p = amount / 100;
  var rgba = {
    r: (rgb2.r - rgb1.r) * p + rgb1.r,
    g: (rgb2.g - rgb1.g) * p + rgb1.g,
    b: (rgb2.b - rgb1.b) * p + rgb1.b,
    a: (rgb2.a - rgb1.a) * p + rgb1.a,
  };
  return tinycolor(rgba);
};
tinycolor.readability = function (color1, color2) {
  var c1 = tinycolor(color1);
  var c2 = tinycolor(color2);
  return (
    (Math.max(c1.getLuminance(), c2.getLuminance()) + 0.05) /
    (Math.min(c1.getLuminance(), c2.getLuminance()) + 0.05)
  );
};
tinycolor.isReadable = function (color1, color2, wcag2) {
  var readability = tinycolor.readability(color1, color2);
  var wcag2Parms, out;
  out = false;
  wcag2Parms = validateWCAG2Parms(wcag2);
  switch (wcag2Parms.level + wcag2Parms.size) {
    case 'AAsmall':
    case 'AAAlarge':
      out = readability >= 4.5;
      break;
    case 'AAlarge':
      out = readability >= 3;
      break;
    case 'AAAsmall':
      out = readability >= 7;
      break;
  }
  return out;
};
tinycolor.mostReadable = function (baseColor, colorList, args) {
  var bestColor = null;
  var bestScore = 0;
  var readability;
  var includeFallbackColors, level, size;
  args = args || {};
  includeFallbackColors = args.includeFallbackColors;
  level = args.level;
  size = args.size;
  for (var i = 0; i < colorList.length; i++) {
    readability = tinycolor.readability(baseColor, colorList[i]);
    if (readability > bestScore) {
      bestScore = readability;
      bestColor = tinycolor(colorList[i]);
    }
  }
  if (
    tinycolor.isReadable(baseColor, bestColor, {
      level,
      size,
    }) ||
    !includeFallbackColors
  ) {
    return bestColor;
  } else {
    args.includeFallbackColors = false;
    return tinycolor.mostReadable(baseColor, ['#fff', '#000'], args);
  }
};
var names = (tinycolor.names = {
  aliceblue: 'f0f8ff',
  antiquewhite: 'faebd7',
  aqua: '0ff',
  aquamarine: '7fffd4',
  azure: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '000',
  blanchedalmond: 'ffebcd',
  blue: '00f',
  blueviolet: '8a2be2',
  brown: 'a52a2a',
  burlywood: 'deb887',
  burntsienna: 'ea7e5d',
  cadetblue: '5f9ea0',
  chartreuse: '7fff00',
  chocolate: 'd2691e',
  coral: 'ff7f50',
  cornflowerblue: '6495ed',
  cornsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: '0ff',
  darkblue: '00008b',
  darkcyan: '008b8b',
  darkgoldenrod: 'b8860b',
  darkgray: 'a9a9a9',
  darkgreen: '006400',
  darkgrey: 'a9a9a9',
  darkkhaki: 'bdb76b',
  darkmagenta: '8b008b',
  darkolivegreen: '556b2f',
  darkorange: 'ff8c00',
  darkorchid: '9932cc',
  darkred: '8b0000',
  darksalmon: 'e9967a',
  darkseagreen: '8fbc8f',
  darkslateblue: '483d8b',
  darkslategray: '2f4f4f',
  darkslategrey: '2f4f4f',
  darkturquoise: '00ced1',
  darkviolet: '9400d3',
  deeppink: 'ff1493',
  deepskyblue: '00bfff',
  dimgray: '696969',
  dimgrey: '696969',
  dodgerblue: '1e90ff',
  firebrick: 'b22222',
  floralwhite: 'fffaf0',
  forestgreen: '228b22',
  fuchsia: 'f0f',
  gainsboro: 'dcdcdc',
  ghostwhite: 'f8f8ff',
  gold: 'ffd700',
  goldenrod: 'daa520',
  gray: '808080',
  green: '008000',
  greenyellow: 'adff2f',
  grey: '808080',
  honeydew: 'f0fff0',
  hotpink: 'ff69b4',
  indianred: 'cd5c5c',
  indigo: '4b0082',
  ivory: 'fffff0',
  khaki: 'f0e68c',
  lavender: 'e6e6fa',
  lavenderblush: 'fff0f5',
  lawngreen: '7cfc00',
  lemonchiffon: 'fffacd',
  lightblue: 'add8e6',
  lightcoral: 'f08080',
  lightcyan: 'e0ffff',
  lightgoldenrodyellow: 'fafad2',
  lightgray: 'd3d3d3',
  lightgreen: '90ee90',
  lightgrey: 'd3d3d3',
  lightpink: 'ffb6c1',
  lightsalmon: 'ffa07a',
  lightseagreen: '20b2aa',
  lightskyblue: '87cefa',
  lightslategray: '789',
  lightslategrey: '789',
  lightsteelblue: 'b0c4de',
  lightyellow: 'ffffe0',
  lime: '0f0',
  limegreen: '32cd32',
  linen: 'faf0e6',
  magenta: 'f0f',
  maroon: '800000',
  mediumaquamarine: '66cdaa',
  mediumblue: '0000cd',
  mediumorchid: 'ba55d3',
  mediumpurple: '9370db',
  mediumseagreen: '3cb371',
  mediumslateblue: '7b68ee',
  mediumspringgreen: '00fa9a',
  mediumturquoise: '48d1cc',
  mediumvioletred: 'c71585',
  midnightblue: '191970',
  mintcream: 'f5fffa',
  mistyrose: 'ffe4e1',
  moccasin: 'ffe4b5',
  navajowhite: 'ffdead',
  navy: '000080',
  oldlace: 'fdf5e6',
  olive: '808000',
  olivedrab: '6b8e23',
  orange: 'ffa500',
  orangered: 'ff4500',
  orchid: 'da70d6',
  palegoldenrod: 'eee8aa',
  palegreen: '98fb98',
  paleturquoise: 'afeeee',
  palevioletred: 'db7093',
  papayawhip: 'ffefd5',
  peachpuff: 'ffdab9',
  peru: 'cd853f',
  pink: 'ffc0cb',
  plum: 'dda0dd',
  powderblue: 'b0e0e6',
  purple: '800080',
  rebeccapurple: '663399',
  red: 'f00',
  rosybrown: 'bc8f8f',
  royalblue: '4169e1',
  saddlebrown: '8b4513',
  salmon: 'fa8072',
  sandybrown: 'f4a460',
  seagreen: '2e8b57',
  seashell: 'fff5ee',
  sienna: 'a0522d',
  silver: 'c0c0c0',
  skyblue: '87ceeb',
  slateblue: '6a5acd',
  slategray: '708090',
  slategrey: '708090',
  snow: 'fffafa',
  springgreen: '00ff7f',
  steelblue: '4682b4',
  tan: 'd2b48c',
  teal: '008080',
  thistle: 'd8bfd8',
  tomato: 'ff6347',
  turquoise: '40e0d0',
  violet: 'ee82ee',
  wheat: 'f5deb3',
  white: 'fff',
  whitesmoke: 'f5f5f5',
  yellow: 'ff0',
  yellowgreen: '9acd32',
});
var hexNames = (tinycolor.hexNames = flip(names));
function flip(o) {
  var flipped = {};
  for (var i in o) {
    if (o.hasOwnProperty(i)) {
      flipped[o[i]] = i;
    }
  }
  return flipped;
}
function boundAlpha(a) {
  a = parseFloat(a);
  if (isNaN(a) || a < 0 || a > 1) {
    a = 1;
  }
  return a;
}
function bound01(n, max) {
  if (isOnePointZero(n)) n = '100%';
  var processPercent = isPercentage(n);
  n = Math.min(max, Math.max(0, parseFloat(n)));
  if (processPercent) {
    n = parseInt(n * max, 10) / 100;
  }
  if (Math.abs(n - max) < 1e-6) {
    return 1;
  }
  return (n % max) / parseFloat(max);
}
function clamp01(val) {
  return Math.min(1, Math.max(0, val));
}
function parseIntFromHex(val) {
  return parseInt(val, 16);
}
function isOnePointZero(n) {
  return typeof n == 'string' && n.indexOf('.') != -1 && parseFloat(n) === 1;
}
function isPercentage(n) {
  return typeof n === 'string' && n.indexOf('%') != -1;
}
function pad2(c) {
  return c.length == 1 ? '0' + c : '' + c;
}
function convertToPercentage(n) {
  if (n <= 1) {
    n = n * 100 + '%';
  }
  return n;
}
function convertDecimalToHex(d) {
  return Math.round(parseFloat(d) * 255).toString(16);
}
function convertHexToDecimal(h) {
  return parseIntFromHex(h) / 255;
}
var matchers = (function () {
  var CSS_INTEGER = '[-\\+]?\\d+%?';
  var CSS_NUMBER = '[-\\+]?\\d*\\.\\d+%?';
  var CSS_UNIT = '(?:' + CSS_NUMBER + ')|(?:' + CSS_INTEGER + ')';
  var PERMISSIVE_MATCH3 =
    '[\\s|\\(]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')[,|\\s]+(' + CSS_UNIT + ')\\s*\\)?';
  var PERMISSIVE_MATCH4 =
    '[\\s|\\(]+(' +
    CSS_UNIT +
    ')[,|\\s]+(' +
    CSS_UNIT +
    ')[,|\\s]+(' +
    CSS_UNIT +
    ')[,|\\s]+(' +
    CSS_UNIT +
    ')\\s*\\)?';
  return {
    CSS_UNIT: new RegExp(CSS_UNIT),
    rgb: new RegExp('rgb' + PERMISSIVE_MATCH3),
    rgba: new RegExp('rgba' + PERMISSIVE_MATCH4),
    hsl: new RegExp('hsl' + PERMISSIVE_MATCH3),
    hsla: new RegExp('hsla' + PERMISSIVE_MATCH4),
    hsv: new RegExp('hsv' + PERMISSIVE_MATCH3),
    hsva: new RegExp('hsva' + PERMISSIVE_MATCH4),
    hex3: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex6: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
    hex4: /^#?([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})([0-9a-fA-F]{1})$/,
    hex8: /^#?([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})([0-9a-fA-F]{2})$/,
  };
})();
function isValidCSSUnit(color) {
  return !!matchers.CSS_UNIT.exec(color);
}
function stringInputToObject(color) {
  color = color.replace(trimLeft, '').replace(trimRight, '').toLowerCase();
  var named = false;
  if (names[color]) {
    color = names[color];
    named = true;
  } else if (color == 'transparent') {
    return {
      r: 0,
      g: 0,
      b: 0,
      a: 0,
      format: 'name',
    };
  }
  var match;
  if ((match = matchers.rgb.exec(color))) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
    };
  }
  if ((match = matchers.rgba.exec(color))) {
    return {
      r: match[1],
      g: match[2],
      b: match[3],
      a: match[4],
    };
  }
  if ((match = matchers.hsl.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
    };
  }
  if ((match = matchers.hsla.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      l: match[3],
      a: match[4],
    };
  }
  if ((match = matchers.hsv.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
    };
  }
  if ((match = matchers.hsva.exec(color))) {
    return {
      h: match[1],
      s: match[2],
      v: match[3],
      a: match[4],
    };
  }
  if ((match = matchers.hex8.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      a: convertHexToDecimal(match[4]),
      format: named ? 'name' : 'hex8',
    };
  }
  if ((match = matchers.hex6.exec(color))) {
    return {
      r: parseIntFromHex(match[1]),
      g: parseIntFromHex(match[2]),
      b: parseIntFromHex(match[3]),
      format: named ? 'name' : 'hex',
    };
  }
  if ((match = matchers.hex4.exec(color))) {
    return {
      r: parseIntFromHex(match[1] + '' + match[1]),
      g: parseIntFromHex(match[2] + '' + match[2]),
      b: parseIntFromHex(match[3] + '' + match[3]),
      a: convertHexToDecimal(match[4] + '' + match[4]),
      format: named ? 'name' : 'hex8',
    };
  }
  if ((match = matchers.hex3.exec(color))) {
    return {
      r: parseIntFromHex(match[1] + '' + match[1]),
      g: parseIntFromHex(match[2] + '' + match[2]),
      b: parseIntFromHex(match[3] + '' + match[3]),
      format: named ? 'name' : 'hex',
    };
  }
  return false;
}
function validateWCAG2Parms(parms) {
  var level, size;
  parms = parms || {
    level: 'AA',
    size: 'small',
  };
  level = (parms.level || 'AA').toUpperCase();
  size = (parms.size || 'small').toLowerCase();
  if (level !== 'AA' && level !== 'AAA') {
    level = 'AA';
  }
  if (size !== 'small' && size !== 'large') {
    size = 'small';
  }
  return {
    level,
    size,
  };
}
export { tinycolor as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidGlueWNvbG9yLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vdGlueWNvbG9yMkAxLjYuMC9ub2RlX21vZHVsZXMvdGlueWNvbG9yMi9lc20vdGlueWNvbG9yLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIi8vIFRoaXMgZmlsZSBpcyBhdXRvZ2VuZXJhdGVkLiBJdCdzIHVzZWQgdG8gcHVibGlzaCBFU00gdG8gbnBtLlxuZnVuY3Rpb24gX3R5cGVvZihvYmopIHtcbiAgXCJAYmFiZWwvaGVscGVycyAtIHR5cGVvZlwiO1xuXG4gIHJldHVybiBfdHlwZW9mID0gXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgXCJzeW1ib2xcIiA9PSB0eXBlb2YgU3ltYm9sLml0ZXJhdG9yID8gZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiB0eXBlb2Ygb2JqO1xuICB9IDogZnVuY3Rpb24gKG9iaikge1xuICAgIHJldHVybiBvYmogJiYgXCJmdW5jdGlvblwiID09IHR5cGVvZiBTeW1ib2wgJiYgb2JqLmNvbnN0cnVjdG9yID09PSBTeW1ib2wgJiYgb2JqICE9PSBTeW1ib2wucHJvdG90eXBlID8gXCJzeW1ib2xcIiA6IHR5cGVvZiBvYmo7XG4gIH0sIF90eXBlb2Yob2JqKTtcbn1cblxuLy8gaHR0cHM6Ly9naXRodWIuY29tL2Jncmlucy9UaW55Q29sb3Jcbi8vIEJyaWFuIEdyaW5zdGVhZCwgTUlUIExpY2Vuc2VcblxudmFyIHRyaW1MZWZ0ID0gL15cXHMrLztcbnZhciB0cmltUmlnaHQgPSAvXFxzKyQvO1xuZnVuY3Rpb24gdGlueWNvbG9yKGNvbG9yLCBvcHRzKSB7XG4gIGNvbG9yID0gY29sb3IgPyBjb2xvciA6IFwiXCI7XG4gIG9wdHMgPSBvcHRzIHx8IHt9O1xuXG4gIC8vIElmIGlucHV0IGlzIGFscmVhZHkgYSB0aW55Y29sb3IsIHJldHVybiBpdHNlbGZcbiAgaWYgKGNvbG9yIGluc3RhbmNlb2YgdGlueWNvbG9yKSB7XG4gICAgcmV0dXJuIGNvbG9yO1xuICB9XG4gIC8vIElmIHdlIGFyZSBjYWxsZWQgYXMgYSBmdW5jdGlvbiwgY2FsbCB1c2luZyBuZXcgaW5zdGVhZFxuICBpZiAoISh0aGlzIGluc3RhbmNlb2YgdGlueWNvbG9yKSkge1xuICAgIHJldHVybiBuZXcgdGlueWNvbG9yKGNvbG9yLCBvcHRzKTtcbiAgfVxuICB2YXIgcmdiID0gaW5wdXRUb1JHQihjb2xvcik7XG4gIHRoaXMuX29yaWdpbmFsSW5wdXQgPSBjb2xvciwgdGhpcy5fciA9IHJnYi5yLCB0aGlzLl9nID0gcmdiLmcsIHRoaXMuX2IgPSByZ2IuYiwgdGhpcy5fYSA9IHJnYi5hLCB0aGlzLl9yb3VuZEEgPSBNYXRoLnJvdW5kKDEwMCAqIHRoaXMuX2EpIC8gMTAwLCB0aGlzLl9mb3JtYXQgPSBvcHRzLmZvcm1hdCB8fCByZ2IuZm9ybWF0O1xuICB0aGlzLl9ncmFkaWVudFR5cGUgPSBvcHRzLmdyYWRpZW50VHlwZTtcblxuICAvLyBEb24ndCBsZXQgdGhlIHJhbmdlIG9mIFswLDI1NV0gY29tZSBiYWNrIGluIFswLDFdLlxuICAvLyBQb3RlbnRpYWxseSBsb3NlIGEgbGl0dGxlIGJpdCBvZiBwcmVjaXNpb24gaGVyZSwgYnV0IHdpbGwgZml4IGlzc3VlcyB3aGVyZVxuICAvLyAuNSBnZXRzIGludGVycHJldGVkIGFzIGhhbGYgb2YgdGhlIHRvdGFsLCBpbnN0ZWFkIG9mIGhhbGYgb2YgMVxuICAvLyBJZiBpdCB3YXMgc3VwcG9zZWQgdG8gYmUgMTI4LCB0aGlzIHdhcyBhbHJlYWR5IHRha2VuIGNhcmUgb2YgYnkgYGlucHV0VG9SZ2JgXG4gIGlmICh0aGlzLl9yIDwgMSkgdGhpcy5fciA9IE1hdGgucm91bmQodGhpcy5fcik7XG4gIGlmICh0aGlzLl9nIDwgMSkgdGhpcy5fZyA9IE1hdGgucm91bmQodGhpcy5fZyk7XG4gIGlmICh0aGlzLl9iIDwgMSkgdGhpcy5fYiA9IE1hdGgucm91bmQodGhpcy5fYik7XG4gIHRoaXMuX29rID0gcmdiLm9rO1xufVxudGlueWNvbG9yLnByb3RvdHlwZSA9IHtcbiAgaXNEYXJrOiBmdW5jdGlvbiBpc0RhcmsoKSB7XG4gICAgcmV0dXJuIHRoaXMuZ2V0QnJpZ2h0bmVzcygpIDwgMTI4O1xuICB9LFxuICBpc0xpZ2h0OiBmdW5jdGlvbiBpc0xpZ2h0KCkge1xuICAgIHJldHVybiAhdGhpcy5pc0RhcmsoKTtcbiAgfSxcbiAgaXNWYWxpZDogZnVuY3Rpb24gaXNWYWxpZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fb2s7XG4gIH0sXG4gIGdldE9yaWdpbmFsSW5wdXQ6IGZ1bmN0aW9uIGdldE9yaWdpbmFsSW5wdXQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX29yaWdpbmFsSW5wdXQ7XG4gIH0sXG4gIGdldEZvcm1hdDogZnVuY3Rpb24gZ2V0Rm9ybWF0KCkge1xuICAgIHJldHVybiB0aGlzLl9mb3JtYXQ7XG4gIH0sXG4gIGdldEFscGhhOiBmdW5jdGlvbiBnZXRBbHBoYSgpIHtcbiAgICByZXR1cm4gdGhpcy5fYTtcbiAgfSxcbiAgZ2V0QnJpZ2h0bmVzczogZnVuY3Rpb24gZ2V0QnJpZ2h0bmVzcygpIHtcbiAgICAvL2h0dHA6Ly93d3cudzMub3JnL1RSL0FFUlQjY29sb3ItY29udHJhc3RcbiAgICB2YXIgcmdiID0gdGhpcy50b1JnYigpO1xuICAgIHJldHVybiAocmdiLnIgKiAyOTkgKyByZ2IuZyAqIDU4NyArIHJnYi5iICogMTE0KSAvIDEwMDA7XG4gIH0sXG4gIGdldEx1bWluYW5jZTogZnVuY3Rpb24gZ2V0THVtaW5hbmNlKCkge1xuICAgIC8vaHR0cDovL3d3dy53My5vcmcvVFIvMjAwOC9SRUMtV0NBRzIwLTIwMDgxMjExLyNyZWxhdGl2ZWx1bWluYW5jZWRlZlxuICAgIHZhciByZ2IgPSB0aGlzLnRvUmdiKCk7XG4gICAgdmFyIFJzUkdCLCBHc1JHQiwgQnNSR0IsIFIsIEcsIEI7XG4gICAgUnNSR0IgPSByZ2IuciAvIDI1NTtcbiAgICBHc1JHQiA9IHJnYi5nIC8gMjU1O1xuICAgIEJzUkdCID0gcmdiLmIgLyAyNTU7XG4gICAgaWYgKFJzUkdCIDw9IDAuMDM5MjgpIFIgPSBSc1JHQiAvIDEyLjkyO2Vsc2UgUiA9IE1hdGgucG93KChSc1JHQiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuICAgIGlmIChHc1JHQiA8PSAwLjAzOTI4KSBHID0gR3NSR0IgLyAxMi45MjtlbHNlIEcgPSBNYXRoLnBvdygoR3NSR0IgKyAwLjA1NSkgLyAxLjA1NSwgMi40KTtcbiAgICBpZiAoQnNSR0IgPD0gMC4wMzkyOCkgQiA9IEJzUkdCIC8gMTIuOTI7ZWxzZSBCID0gTWF0aC5wb3coKEJzUkdCICsgMC4wNTUpIC8gMS4wNTUsIDIuNCk7XG4gICAgcmV0dXJuIDAuMjEyNiAqIFIgKyAwLjcxNTIgKiBHICsgMC4wNzIyICogQjtcbiAgfSxcbiAgc2V0QWxwaGE6IGZ1bmN0aW9uIHNldEFscGhhKHZhbHVlKSB7XG4gICAgdGhpcy5fYSA9IGJvdW5kQWxwaGEodmFsdWUpO1xuICAgIHRoaXMuX3JvdW5kQSA9IE1hdGgucm91bmQoMTAwICogdGhpcy5fYSkgLyAxMDA7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIHRvSHN2OiBmdW5jdGlvbiB0b0hzdigpIHtcbiAgICB2YXIgaHN2ID0gcmdiVG9Ic3YodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IGhzdi5oICogMzYwLFxuICAgICAgczogaHN2LnMsXG4gICAgICB2OiBoc3YudixcbiAgICAgIGE6IHRoaXMuX2FcbiAgICB9O1xuICB9LFxuICB0b0hzdlN0cmluZzogZnVuY3Rpb24gdG9Ic3ZTdHJpbmcoKSB7XG4gICAgdmFyIGhzdiA9IHJnYlRvSHN2KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xuICAgIHZhciBoID0gTWF0aC5yb3VuZChoc3YuaCAqIDM2MCksXG4gICAgICBzID0gTWF0aC5yb3VuZChoc3YucyAqIDEwMCksXG4gICAgICB2ID0gTWF0aC5yb3VuZChoc3YudiAqIDEwMCk7XG4gICAgcmV0dXJuIHRoaXMuX2EgPT0gMSA/IFwiaHN2KFwiICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgdiArIFwiJSlcIiA6IFwiaHN2YShcIiArIGggKyBcIiwgXCIgKyBzICsgXCIlLCBcIiArIHYgKyBcIiUsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gIH0sXG4gIHRvSHNsOiBmdW5jdGlvbiB0b0hzbCgpIHtcbiAgICB2YXIgaHNsID0gcmdiVG9Ic2wodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYik7XG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IGhzbC5oICogMzYwLFxuICAgICAgczogaHNsLnMsXG4gICAgICBsOiBoc2wubCxcbiAgICAgIGE6IHRoaXMuX2FcbiAgICB9O1xuICB9LFxuICB0b0hzbFN0cmluZzogZnVuY3Rpb24gdG9Ic2xTdHJpbmcoKSB7XG4gICAgdmFyIGhzbCA9IHJnYlRvSHNsKHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IpO1xuICAgIHZhciBoID0gTWF0aC5yb3VuZChoc2wuaCAqIDM2MCksXG4gICAgICBzID0gTWF0aC5yb3VuZChoc2wucyAqIDEwMCksXG4gICAgICBsID0gTWF0aC5yb3VuZChoc2wubCAqIDEwMCk7XG4gICAgcmV0dXJuIHRoaXMuX2EgPT0gMSA/IFwiaHNsKFwiICsgaCArIFwiLCBcIiArIHMgKyBcIiUsIFwiICsgbCArIFwiJSlcIiA6IFwiaHNsYShcIiArIGggKyBcIiwgXCIgKyBzICsgXCIlLCBcIiArIGwgKyBcIiUsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gIH0sXG4gIHRvSGV4OiBmdW5jdGlvbiB0b0hleChhbGxvdzNDaGFyKSB7XG4gICAgcmV0dXJuIHJnYlRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIGFsbG93M0NoYXIpO1xuICB9LFxuICB0b0hleFN0cmluZzogZnVuY3Rpb24gdG9IZXhTdHJpbmcoYWxsb3czQ2hhcikge1xuICAgIHJldHVybiBcIiNcIiArIHRoaXMudG9IZXgoYWxsb3czQ2hhcik7XG4gIH0sXG4gIHRvSGV4ODogZnVuY3Rpb24gdG9IZXg4KGFsbG93NENoYXIpIHtcbiAgICByZXR1cm4gcmdiYVRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIHRoaXMuX2EsIGFsbG93NENoYXIpO1xuICB9LFxuICB0b0hleDhTdHJpbmc6IGZ1bmN0aW9uIHRvSGV4OFN0cmluZyhhbGxvdzRDaGFyKSB7XG4gICAgcmV0dXJuIFwiI1wiICsgdGhpcy50b0hleDgoYWxsb3c0Q2hhcik7XG4gIH0sXG4gIHRvUmdiOiBmdW5jdGlvbiB0b1JnYigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogTWF0aC5yb3VuZCh0aGlzLl9yKSxcbiAgICAgIGc6IE1hdGgucm91bmQodGhpcy5fZyksXG4gICAgICBiOiBNYXRoLnJvdW5kKHRoaXMuX2IpLFxuICAgICAgYTogdGhpcy5fYVxuICAgIH07XG4gIH0sXG4gIHRvUmdiU3RyaW5nOiBmdW5jdGlvbiB0b1JnYlN0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fYSA9PSAxID8gXCJyZ2IoXCIgKyBNYXRoLnJvdW5kKHRoaXMuX3IpICsgXCIsIFwiICsgTWF0aC5yb3VuZCh0aGlzLl9nKSArIFwiLCBcIiArIE1hdGgucm91bmQodGhpcy5fYikgKyBcIilcIiA6IFwicmdiYShcIiArIE1hdGgucm91bmQodGhpcy5fcikgKyBcIiwgXCIgKyBNYXRoLnJvdW5kKHRoaXMuX2cpICsgXCIsIFwiICsgTWF0aC5yb3VuZCh0aGlzLl9iKSArIFwiLCBcIiArIHRoaXMuX3JvdW5kQSArIFwiKVwiO1xuICB9LFxuICB0b1BlcmNlbnRhZ2VSZ2I6IGZ1bmN0aW9uIHRvUGVyY2VudGFnZVJnYigpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogTWF0aC5yb3VuZChib3VuZDAxKHRoaXMuX3IsIDI1NSkgKiAxMDApICsgXCIlXCIsXG4gICAgICBnOiBNYXRoLnJvdW5kKGJvdW5kMDEodGhpcy5fZywgMjU1KSAqIDEwMCkgKyBcIiVcIixcbiAgICAgIGI6IE1hdGgucm91bmQoYm91bmQwMSh0aGlzLl9iLCAyNTUpICogMTAwKSArIFwiJVwiLFxuICAgICAgYTogdGhpcy5fYVxuICAgIH07XG4gIH0sXG4gIHRvUGVyY2VudGFnZVJnYlN0cmluZzogZnVuY3Rpb24gdG9QZXJjZW50YWdlUmdiU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl9hID09IDEgPyBcInJnYihcIiArIE1hdGgucm91bmQoYm91bmQwMSh0aGlzLl9yLCAyNTUpICogMTAwKSArIFwiJSwgXCIgKyBNYXRoLnJvdW5kKGJvdW5kMDEodGhpcy5fZywgMjU1KSAqIDEwMCkgKyBcIiUsIFwiICsgTWF0aC5yb3VuZChib3VuZDAxKHRoaXMuX2IsIDI1NSkgKiAxMDApICsgXCIlKVwiIDogXCJyZ2JhKFwiICsgTWF0aC5yb3VuZChib3VuZDAxKHRoaXMuX3IsIDI1NSkgKiAxMDApICsgXCIlLCBcIiArIE1hdGgucm91bmQoYm91bmQwMSh0aGlzLl9nLCAyNTUpICogMTAwKSArIFwiJSwgXCIgKyBNYXRoLnJvdW5kKGJvdW5kMDEodGhpcy5fYiwgMjU1KSAqIDEwMCkgKyBcIiUsIFwiICsgdGhpcy5fcm91bmRBICsgXCIpXCI7XG4gIH0sXG4gIHRvTmFtZTogZnVuY3Rpb24gdG9OYW1lKCkge1xuICAgIGlmICh0aGlzLl9hID09PSAwKSB7XG4gICAgICByZXR1cm4gXCJ0cmFuc3BhcmVudFwiO1xuICAgIH1cbiAgICBpZiAodGhpcy5fYSA8IDEpIHtcbiAgICAgIHJldHVybiBmYWxzZTtcbiAgICB9XG4gICAgcmV0dXJuIGhleE5hbWVzW3JnYlRvSGV4KHRoaXMuX3IsIHRoaXMuX2csIHRoaXMuX2IsIHRydWUpXSB8fCBmYWxzZTtcbiAgfSxcbiAgdG9GaWx0ZXI6IGZ1bmN0aW9uIHRvRmlsdGVyKHNlY29uZENvbG9yKSB7XG4gICAgdmFyIGhleDhTdHJpbmcgPSBcIiNcIiArIHJnYmFUb0FyZ2JIZXgodGhpcy5fciwgdGhpcy5fZywgdGhpcy5fYiwgdGhpcy5fYSk7XG4gICAgdmFyIHNlY29uZEhleDhTdHJpbmcgPSBoZXg4U3RyaW5nO1xuICAgIHZhciBncmFkaWVudFR5cGUgPSB0aGlzLl9ncmFkaWVudFR5cGUgPyBcIkdyYWRpZW50VHlwZSA9IDEsIFwiIDogXCJcIjtcbiAgICBpZiAoc2Vjb25kQ29sb3IpIHtcbiAgICAgIHZhciBzID0gdGlueWNvbG9yKHNlY29uZENvbG9yKTtcbiAgICAgIHNlY29uZEhleDhTdHJpbmcgPSBcIiNcIiArIHJnYmFUb0FyZ2JIZXgocy5fciwgcy5fZywgcy5fYiwgcy5fYSk7XG4gICAgfVxuICAgIHJldHVybiBcInByb2dpZDpEWEltYWdlVHJhbnNmb3JtLk1pY3Jvc29mdC5ncmFkaWVudChcIiArIGdyYWRpZW50VHlwZSArIFwic3RhcnRDb2xvcnN0cj1cIiArIGhleDhTdHJpbmcgKyBcIixlbmRDb2xvcnN0cj1cIiArIHNlY29uZEhleDhTdHJpbmcgKyBcIilcIjtcbiAgfSxcbiAgdG9TdHJpbmc6IGZ1bmN0aW9uIHRvU3RyaW5nKGZvcm1hdCkge1xuICAgIHZhciBmb3JtYXRTZXQgPSAhIWZvcm1hdDtcbiAgICBmb3JtYXQgPSBmb3JtYXQgfHwgdGhpcy5fZm9ybWF0O1xuICAgIHZhciBmb3JtYXR0ZWRTdHJpbmcgPSBmYWxzZTtcbiAgICB2YXIgaGFzQWxwaGEgPSB0aGlzLl9hIDwgMSAmJiB0aGlzLl9hID49IDA7XG4gICAgdmFyIG5lZWRzQWxwaGFGb3JtYXQgPSAhZm9ybWF0U2V0ICYmIGhhc0FscGhhICYmIChmb3JtYXQgPT09IFwiaGV4XCIgfHwgZm9ybWF0ID09PSBcImhleDZcIiB8fCBmb3JtYXQgPT09IFwiaGV4M1wiIHx8IGZvcm1hdCA9PT0gXCJoZXg0XCIgfHwgZm9ybWF0ID09PSBcImhleDhcIiB8fCBmb3JtYXQgPT09IFwibmFtZVwiKTtcbiAgICBpZiAobmVlZHNBbHBoYUZvcm1hdCkge1xuICAgICAgLy8gU3BlY2lhbCBjYXNlIGZvciBcInRyYW5zcGFyZW50XCIsIGFsbCBvdGhlciBub24tYWxwaGEgZm9ybWF0c1xuICAgICAgLy8gd2lsbCByZXR1cm4gcmdiYSB3aGVuIHRoZXJlIGlzIHRyYW5zcGFyZW5jeS5cbiAgICAgIGlmIChmb3JtYXQgPT09IFwibmFtZVwiICYmIHRoaXMuX2EgPT09IDApIHtcbiAgICAgICAgcmV0dXJuIHRoaXMudG9OYW1lKCk7XG4gICAgICB9XG4gICAgICByZXR1cm4gdGhpcy50b1JnYlN0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcInJnYlwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvUmdiU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IFwicHJnYlwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvUGVyY2VudGFnZVJnYlN0cmluZygpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcImhleFwiIHx8IGZvcm1hdCA9PT0gXCJoZXg2XCIpIHtcbiAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcoKTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gXCJoZXgzXCIpIHtcbiAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXhTdHJpbmcodHJ1ZSk7XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IFwiaGV4NFwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSGV4OFN0cmluZyh0cnVlKTtcbiAgICB9XG4gICAgaWYgKGZvcm1hdCA9PT0gXCJoZXg4XCIpIHtcbiAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9IZXg4U3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IFwibmFtZVwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvTmFtZSgpO1xuICAgIH1cbiAgICBpZiAoZm9ybWF0ID09PSBcImhzbFwiKSB7XG4gICAgICBmb3JtYXR0ZWRTdHJpbmcgPSB0aGlzLnRvSHNsU3RyaW5nKCk7XG4gICAgfVxuICAgIGlmIChmb3JtYXQgPT09IFwiaHN2XCIpIHtcbiAgICAgIGZvcm1hdHRlZFN0cmluZyA9IHRoaXMudG9Ic3ZTdHJpbmcoKTtcbiAgICB9XG4gICAgcmV0dXJuIGZvcm1hdHRlZFN0cmluZyB8fCB0aGlzLnRvSGV4U3RyaW5nKCk7XG4gIH0sXG4gIGNsb25lOiBmdW5jdGlvbiBjbG9uZSgpIHtcbiAgICByZXR1cm4gdGlueWNvbG9yKHRoaXMudG9TdHJpbmcoKSk7XG4gIH0sXG4gIF9hcHBseU1vZGlmaWNhdGlvbjogZnVuY3Rpb24gX2FwcGx5TW9kaWZpY2F0aW9uKGZuLCBhcmdzKSB7XG4gICAgdmFyIGNvbG9yID0gZm4uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3MpKSk7XG4gICAgdGhpcy5fciA9IGNvbG9yLl9yO1xuICAgIHRoaXMuX2cgPSBjb2xvci5fZztcbiAgICB0aGlzLl9iID0gY29sb3IuX2I7XG4gICAgdGhpcy5zZXRBbHBoYShjb2xvci5fYSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH0sXG4gIGxpZ2h0ZW46IGZ1bmN0aW9uIGxpZ2h0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9saWdodGVuLCBhcmd1bWVudHMpO1xuICB9LFxuICBicmlnaHRlbjogZnVuY3Rpb24gYnJpZ2h0ZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9icmlnaHRlbiwgYXJndW1lbnRzKTtcbiAgfSxcbiAgZGFya2VuOiBmdW5jdGlvbiBkYXJrZW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9kYXJrZW4sIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGRlc2F0dXJhdGU6IGZ1bmN0aW9uIGRlc2F0dXJhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9kZXNhdHVyYXRlLCBhcmd1bWVudHMpO1xuICB9LFxuICBzYXR1cmF0ZTogZnVuY3Rpb24gc2F0dXJhdGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9zYXR1cmF0ZSwgYXJndW1lbnRzKTtcbiAgfSxcbiAgZ3JleXNjYWxlOiBmdW5jdGlvbiBncmV5c2NhbGUoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9ncmV5c2NhbGUsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHNwaW46IGZ1bmN0aW9uIHNwaW4oKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5TW9kaWZpY2F0aW9uKF9zcGluLCBhcmd1bWVudHMpO1xuICB9LFxuICBfYXBwbHlDb21iaW5hdGlvbjogZnVuY3Rpb24gX2FwcGx5Q29tYmluYXRpb24oZm4sIGFyZ3MpIHtcbiAgICByZXR1cm4gZm4uYXBwbHkobnVsbCwgW3RoaXNdLmNvbmNhdChbXS5zbGljZS5jYWxsKGFyZ3MpKSk7XG4gIH0sXG4gIGFuYWxvZ291czogZnVuY3Rpb24gYW5hbG9nb3VzKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKF9hbmFsb2dvdXMsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIGNvbXBsZW1lbnQ6IGZ1bmN0aW9uIGNvbXBsZW1lbnQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oX2NvbXBsZW1lbnQsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIG1vbm9jaHJvbWF0aWM6IGZ1bmN0aW9uIG1vbm9jaHJvbWF0aWMoKSB7XG4gICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24oX21vbm9jaHJvbWF0aWMsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIHNwbGl0Y29tcGxlbWVudDogZnVuY3Rpb24gc3BsaXRjb21wbGVtZW50KCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKF9zcGxpdGNvbXBsZW1lbnQsIGFyZ3VtZW50cyk7XG4gIH0sXG4gIC8vIERpc2FibGVkIHVudGlsIGh0dHBzOi8vZ2l0aHViLmNvbS9iZ3JpbnMvVGlueUNvbG9yL2lzc3Vlcy8yNTRcbiAgLy8gcG9seWFkOiBmdW5jdGlvbiAobnVtYmVyKSB7XG4gIC8vICAgcmV0dXJuIHRoaXMuX2FwcGx5Q29tYmluYXRpb24ocG9seWFkLCBbbnVtYmVyXSk7XG4gIC8vIH0sXG4gIHRyaWFkOiBmdW5jdGlvbiB0cmlhZCgpIHtcbiAgICByZXR1cm4gdGhpcy5fYXBwbHlDb21iaW5hdGlvbihwb2x5YWQsIFszXSk7XG4gIH0sXG4gIHRldHJhZDogZnVuY3Rpb24gdGV0cmFkKCkge1xuICAgIHJldHVybiB0aGlzLl9hcHBseUNvbWJpbmF0aW9uKHBvbHlhZCwgWzRdKTtcbiAgfVxufTtcblxuLy8gSWYgaW5wdXQgaXMgYW4gb2JqZWN0LCBmb3JjZSAxIGludG8gXCIxLjBcIiB0byBoYW5kbGUgcmF0aW9zIHByb3Blcmx5XG4vLyBTdHJpbmcgaW5wdXQgcmVxdWlyZXMgXCIxLjBcIiBhcyBpbnB1dCwgc28gMSB3aWxsIGJlIHRyZWF0ZWQgYXMgMVxudGlueWNvbG9yLmZyb21SYXRpbyA9IGZ1bmN0aW9uIChjb2xvciwgb3B0cykge1xuICBpZiAoX3R5cGVvZihjb2xvcikgPT0gXCJvYmplY3RcIikge1xuICAgIHZhciBuZXdDb2xvciA9IHt9O1xuICAgIGZvciAodmFyIGkgaW4gY29sb3IpIHtcbiAgICAgIGlmIChjb2xvci5oYXNPd25Qcm9wZXJ0eShpKSkge1xuICAgICAgICBpZiAoaSA9PT0gXCJhXCIpIHtcbiAgICAgICAgICBuZXdDb2xvcltpXSA9IGNvbG9yW2ldO1xuICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgIG5ld0NvbG9yW2ldID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvcltpXSk7XG4gICAgICAgIH1cbiAgICAgIH1cbiAgICB9XG4gICAgY29sb3IgPSBuZXdDb2xvcjtcbiAgfVxuICByZXR1cm4gdGlueWNvbG9yKGNvbG9yLCBvcHRzKTtcbn07XG5cbi8vIEdpdmVuIGEgc3RyaW5nIG9yIG9iamVjdCwgY29udmVydCB0aGF0IGlucHV0IHRvIFJHQlxuLy8gUG9zc2libGUgc3RyaW5nIGlucHV0czpcbi8vXG4vLyAgICAgXCJyZWRcIlxuLy8gICAgIFwiI2YwMFwiIG9yIFwiZjAwXCJcbi8vICAgICBcIiNmZjAwMDBcIiBvciBcImZmMDAwMFwiXG4vLyAgICAgXCIjZmYwMDAwMDBcIiBvciBcImZmMDAwMDAwXCJcbi8vICAgICBcInJnYiAyNTUgMCAwXCIgb3IgXCJyZ2IgKDI1NSwgMCwgMClcIlxuLy8gICAgIFwicmdiIDEuMCAwIDBcIiBvciBcInJnYiAoMSwgMCwgMClcIlxuLy8gICAgIFwicmdiYSAoMjU1LCAwLCAwLCAxKVwiIG9yIFwicmdiYSAyNTUsIDAsIDAsIDFcIlxuLy8gICAgIFwicmdiYSAoMS4wLCAwLCAwLCAxKVwiIG9yIFwicmdiYSAxLjAsIDAsIDAsIDFcIlxuLy8gICAgIFwiaHNsKDAsIDEwMCUsIDUwJSlcIiBvciBcImhzbCAwIDEwMCUgNTAlXCJcbi8vICAgICBcImhzbGEoMCwgMTAwJSwgNTAlLCAxKVwiIG9yIFwiaHNsYSAwIDEwMCUgNTAlLCAxXCJcbi8vICAgICBcImhzdigwLCAxMDAlLCAxMDAlKVwiIG9yIFwiaHN2IDAgMTAwJSAxMDAlXCJcbi8vXG5mdW5jdGlvbiBpbnB1dFRvUkdCKGNvbG9yKSB7XG4gIHZhciByZ2IgPSB7XG4gICAgcjogMCxcbiAgICBnOiAwLFxuICAgIGI6IDBcbiAgfTtcbiAgdmFyIGEgPSAxO1xuICB2YXIgcyA9IG51bGw7XG4gIHZhciB2ID0gbnVsbDtcbiAgdmFyIGwgPSBudWxsO1xuICB2YXIgb2sgPSBmYWxzZTtcbiAgdmFyIGZvcm1hdCA9IGZhbHNlO1xuICBpZiAodHlwZW9mIGNvbG9yID09IFwic3RyaW5nXCIpIHtcbiAgICBjb2xvciA9IHN0cmluZ0lucHV0VG9PYmplY3QoY29sb3IpO1xuICB9XG4gIGlmIChfdHlwZW9mKGNvbG9yKSA9PSBcIm9iamVjdFwiKSB7XG4gICAgaWYgKGlzVmFsaWRDU1NVbml0KGNvbG9yLnIpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLmcpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLmIpKSB7XG4gICAgICByZ2IgPSByZ2JUb1JnYihjb2xvci5yLCBjb2xvci5nLCBjb2xvci5iKTtcbiAgICAgIG9rID0gdHJ1ZTtcbiAgICAgIGZvcm1hdCA9IFN0cmluZyhjb2xvci5yKS5zdWJzdHIoLTEpID09PSBcIiVcIiA/IFwicHJnYlwiIDogXCJyZ2JcIjtcbiAgICB9IGVsc2UgaWYgKGlzVmFsaWRDU1NVbml0KGNvbG9yLmgpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLnMpICYmIGlzVmFsaWRDU1NVbml0KGNvbG9yLnYpKSB7XG4gICAgICBzID0gY29udmVydFRvUGVyY2VudGFnZShjb2xvci5zKTtcbiAgICAgIHYgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnYpO1xuICAgICAgcmdiID0gaHN2VG9SZ2IoY29sb3IuaCwgcywgdik7XG4gICAgICBvayA9IHRydWU7XG4gICAgICBmb3JtYXQgPSBcImhzdlwiO1xuICAgIH0gZWxzZSBpZiAoaXNWYWxpZENTU1VuaXQoY29sb3IuaCkgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IucykgJiYgaXNWYWxpZENTU1VuaXQoY29sb3IubCkpIHtcbiAgICAgIHMgPSBjb252ZXJ0VG9QZXJjZW50YWdlKGNvbG9yLnMpO1xuICAgICAgbCA9IGNvbnZlcnRUb1BlcmNlbnRhZ2UoY29sb3IubCk7XG4gICAgICByZ2IgPSBoc2xUb1JnYihjb2xvci5oLCBzLCBsKTtcbiAgICAgIG9rID0gdHJ1ZTtcbiAgICAgIGZvcm1hdCA9IFwiaHNsXCI7XG4gICAgfVxuICAgIGlmIChjb2xvci5oYXNPd25Qcm9wZXJ0eShcImFcIikpIHtcbiAgICAgIGEgPSBjb2xvci5hO1xuICAgIH1cbiAgfVxuICBhID0gYm91bmRBbHBoYShhKTtcbiAgcmV0dXJuIHtcbiAgICBvazogb2ssXG4gICAgZm9ybWF0OiBjb2xvci5mb3JtYXQgfHwgZm9ybWF0LFxuICAgIHI6IE1hdGgubWluKDI1NSwgTWF0aC5tYXgocmdiLnIsIDApKSxcbiAgICBnOiBNYXRoLm1pbigyNTUsIE1hdGgubWF4KHJnYi5nLCAwKSksXG4gICAgYjogTWF0aC5taW4oMjU1LCBNYXRoLm1heChyZ2IuYiwgMCkpLFxuICAgIGE6IGFcbiAgfTtcbn1cblxuLy8gQ29udmVyc2lvbiBGdW5jdGlvbnNcbi8vIC0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbi8vIGByZ2JUb0hzbGAsIGByZ2JUb0hzdmAsIGBoc2xUb1JnYmAsIGBoc3ZUb1JnYmAgbW9kaWZpZWQgZnJvbTpcbi8vIDxodHRwOi8vbWppamFja3Nvbi5jb20vMjAwOC8wMi9yZ2ItdG8taHNsLWFuZC1yZ2ItdG8taHN2LWNvbG9yLW1vZGVsLWNvbnZlcnNpb24tYWxnb3JpdGhtcy1pbi1qYXZhc2NyaXB0PlxuXG4vLyBgcmdiVG9SZ2JgXG4vLyBIYW5kbGUgYm91bmRzIC8gcGVyY2VudGFnZSBjaGVja2luZyB0byBjb25mb3JtIHRvIENTUyBjb2xvciBzcGVjXG4vLyA8aHR0cDovL3d3dy53My5vcmcvVFIvY3NzMy1jb2xvci8+XG4vLyAqQXNzdW1lczoqIHIsIGcsIGIgaW4gWzAsIDI1NV0gb3IgWzAsIDFdXG4vLyAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIFswLCAyNTVdXG5mdW5jdGlvbiByZ2JUb1JnYihyLCBnLCBiKSB7XG4gIHJldHVybiB7XG4gICAgcjogYm91bmQwMShyLCAyNTUpICogMjU1LFxuICAgIGc6IGJvdW5kMDEoZywgMjU1KSAqIDI1NSxcbiAgICBiOiBib3VuZDAxKGIsIDI1NSkgKiAyNTVcbiAgfTtcbn1cblxuLy8gYHJnYlRvSHNsYFxuLy8gQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTTC5cbi8vICpBc3N1bWVzOiogciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiBbMCwgMjU1XSBvciBbMCwgMV1cbi8vICpSZXR1cm5zOiogeyBoLCBzLCBsIH0gaW4gWzAsMV1cbmZ1bmN0aW9uIHJnYlRvSHNsKHIsIGcsIGIpIHtcbiAgciA9IGJvdW5kMDEociwgMjU1KTtcbiAgZyA9IGJvdW5kMDEoZywgMjU1KTtcbiAgYiA9IGJvdW5kMDEoYiwgMjU1KTtcbiAgdmFyIG1heCA9IE1hdGgubWF4KHIsIGcsIGIpLFxuICAgIG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICB2YXIgaCxcbiAgICBzLFxuICAgIGwgPSAobWF4ICsgbWluKSAvIDI7XG4gIGlmIChtYXggPT0gbWluKSB7XG4gICAgaCA9IHMgPSAwOyAvLyBhY2hyb21hdGljXG4gIH0gZWxzZSB7XG4gICAgdmFyIGQgPSBtYXggLSBtaW47XG4gICAgcyA9IGwgPiAwLjUgPyBkIC8gKDIgLSBtYXggLSBtaW4pIDogZCAvIChtYXggKyBtaW4pO1xuICAgIHN3aXRjaCAobWF4KSB7XG4gICAgICBjYXNlIHI6XG4gICAgICAgIGggPSAoZyAtIGIpIC8gZCArIChnIDwgYiA/IDYgOiAwKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGc6XG4gICAgICAgIGggPSAoYiAtIHIpIC8gZCArIDI7XG4gICAgICAgIGJyZWFrO1xuICAgICAgY2FzZSBiOlxuICAgICAgICBoID0gKHIgLSBnKSAvIGQgKyA0O1xuICAgICAgICBicmVhaztcbiAgICB9XG4gICAgaCAvPSA2O1xuICB9XG4gIHJldHVybiB7XG4gICAgaDogaCxcbiAgICBzOiBzLFxuICAgIGw6IGxcbiAgfTtcbn1cblxuLy8gYGhzbFRvUmdiYFxuLy8gQ29udmVydHMgYW4gSFNMIGNvbG9yIHZhbHVlIHRvIFJHQi5cbi8vICpBc3N1bWVzOiogaCBpcyBjb250YWluZWQgaW4gWzAsIDFdIG9yIFswLCAzNjBdIGFuZCBzIGFuZCBsIGFyZSBjb250YWluZWQgWzAsIDFdIG9yIFswLCAxMDBdXG4vLyAqUmV0dXJuczoqIHsgciwgZywgYiB9IGluIHRoZSBzZXQgWzAsIDI1NV1cbmZ1bmN0aW9uIGhzbFRvUmdiKGgsIHMsIGwpIHtcbiAgdmFyIHIsIGcsIGI7XG4gIGggPSBib3VuZDAxKGgsIDM2MCk7XG4gIHMgPSBib3VuZDAxKHMsIDEwMCk7XG4gIGwgPSBib3VuZDAxKGwsIDEwMCk7XG4gIGZ1bmN0aW9uIGh1ZTJyZ2IocCwgcSwgdCkge1xuICAgIGlmICh0IDwgMCkgdCArPSAxO1xuICAgIGlmICh0ID4gMSkgdCAtPSAxO1xuICAgIGlmICh0IDwgMSAvIDYpIHJldHVybiBwICsgKHEgLSBwKSAqIDYgKiB0O1xuICAgIGlmICh0IDwgMSAvIDIpIHJldHVybiBxO1xuICAgIGlmICh0IDwgMiAvIDMpIHJldHVybiBwICsgKHEgLSBwKSAqICgyIC8gMyAtIHQpICogNjtcbiAgICByZXR1cm4gcDtcbiAgfVxuICBpZiAocyA9PT0gMCkge1xuICAgIHIgPSBnID0gYiA9IGw7IC8vIGFjaHJvbWF0aWNcbiAgfSBlbHNlIHtcbiAgICB2YXIgcSA9IGwgPCAwLjUgPyBsICogKDEgKyBzKSA6IGwgKyBzIC0gbCAqIHM7XG4gICAgdmFyIHAgPSAyICogbCAtIHE7XG4gICAgciA9IGh1ZTJyZ2IocCwgcSwgaCArIDEgLyAzKTtcbiAgICBnID0gaHVlMnJnYihwLCBxLCBoKTtcbiAgICBiID0gaHVlMnJnYihwLCBxLCBoIC0gMSAvIDMpO1xuICB9XG4gIHJldHVybiB7XG4gICAgcjogciAqIDI1NSxcbiAgICBnOiBnICogMjU1LFxuICAgIGI6IGIgKiAyNTVcbiAgfTtcbn1cblxuLy8gYHJnYlRvSHN2YFxuLy8gQ29udmVydHMgYW4gUkdCIGNvbG9yIHZhbHVlIHRvIEhTVlxuLy8gKkFzc3VtZXM6KiByLCBnLCBhbmQgYiBhcmUgY29udGFpbmVkIGluIHRoZSBzZXQgWzAsIDI1NV0gb3IgWzAsIDFdXG4vLyAqUmV0dXJuczoqIHsgaCwgcywgdiB9IGluIFswLDFdXG5mdW5jdGlvbiByZ2JUb0hzdihyLCBnLCBiKSB7XG4gIHIgPSBib3VuZDAxKHIsIDI1NSk7XG4gIGcgPSBib3VuZDAxKGcsIDI1NSk7XG4gIGIgPSBib3VuZDAxKGIsIDI1NSk7XG4gIHZhciBtYXggPSBNYXRoLm1heChyLCBnLCBiKSxcbiAgICBtaW4gPSBNYXRoLm1pbihyLCBnLCBiKTtcbiAgdmFyIGgsXG4gICAgcyxcbiAgICB2ID0gbWF4O1xuICB2YXIgZCA9IG1heCAtIG1pbjtcbiAgcyA9IG1heCA9PT0gMCA/IDAgOiBkIC8gbWF4O1xuICBpZiAobWF4ID09IG1pbikge1xuICAgIGggPSAwOyAvLyBhY2hyb21hdGljXG4gIH0gZWxzZSB7XG4gICAgc3dpdGNoIChtYXgpIHtcbiAgICAgIGNhc2UgcjpcbiAgICAgICAgaCA9IChnIC0gYikgLyBkICsgKGcgPCBiID8gNiA6IDApO1xuICAgICAgICBicmVhaztcbiAgICAgIGNhc2UgZzpcbiAgICAgICAgaCA9IChiIC0gcikgLyBkICsgMjtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlIGI6XG4gICAgICAgIGggPSAociAtIGcpIC8gZCArIDQ7XG4gICAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBoIC89IDY7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICBoOiBoLFxuICAgIHM6IHMsXG4gICAgdjogdlxuICB9O1xufVxuXG4vLyBgaHN2VG9SZ2JgXG4vLyBDb252ZXJ0cyBhbiBIU1YgY29sb3IgdmFsdWUgdG8gUkdCLlxuLy8gKkFzc3VtZXM6KiBoIGlzIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDM2MF0gYW5kIHMgYW5kIHYgYXJlIGNvbnRhaW5lZCBpbiBbMCwgMV0gb3IgWzAsIDEwMF1cbi8vICpSZXR1cm5zOiogeyByLCBnLCBiIH0gaW4gdGhlIHNldCBbMCwgMjU1XVxuZnVuY3Rpb24gaHN2VG9SZ2IoaCwgcywgdikge1xuICBoID0gYm91bmQwMShoLCAzNjApICogNjtcbiAgcyA9IGJvdW5kMDEocywgMTAwKTtcbiAgdiA9IGJvdW5kMDEodiwgMTAwKTtcbiAgdmFyIGkgPSBNYXRoLmZsb29yKGgpLFxuICAgIGYgPSBoIC0gaSxcbiAgICBwID0gdiAqICgxIC0gcyksXG4gICAgcSA9IHYgKiAoMSAtIGYgKiBzKSxcbiAgICB0ID0gdiAqICgxIC0gKDEgLSBmKSAqIHMpLFxuICAgIG1vZCA9IGkgJSA2LFxuICAgIHIgPSBbdiwgcSwgcCwgcCwgdCwgdl1bbW9kXSxcbiAgICBnID0gW3QsIHYsIHYsIHEsIHAsIHBdW21vZF0sXG4gICAgYiA9IFtwLCBwLCB0LCB2LCB2LCBxXVttb2RdO1xuICByZXR1cm4ge1xuICAgIHI6IHIgKiAyNTUsXG4gICAgZzogZyAqIDI1NSxcbiAgICBiOiBiICogMjU1XG4gIH07XG59XG5cbi8vIGByZ2JUb0hleGBcbi8vIENvbnZlcnRzIGFuIFJHQiBjb2xvciB0byBoZXhcbi8vIEFzc3VtZXMgciwgZywgYW5kIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdXG4vLyBSZXR1cm5zIGEgMyBvciA2IGNoYXJhY3RlciBoZXhcbmZ1bmN0aW9uIHJnYlRvSGV4KHIsIGcsIGIsIGFsbG93M0NoYXIpIHtcbiAgdmFyIGhleCA9IFtwYWQyKE1hdGgucm91bmQocikudG9TdHJpbmcoMTYpKSwgcGFkMihNYXRoLnJvdW5kKGcpLnRvU3RyaW5nKDE2KSksIHBhZDIoTWF0aC5yb3VuZChiKS50b1N0cmluZygxNikpXTtcblxuICAvLyBSZXR1cm4gYSAzIGNoYXJhY3RlciBoZXggaWYgcG9zc2libGVcbiAgaWYgKGFsbG93M0NoYXIgJiYgaGV4WzBdLmNoYXJBdCgwKSA9PSBoZXhbMF0uY2hhckF0KDEpICYmIGhleFsxXS5jaGFyQXQoMCkgPT0gaGV4WzFdLmNoYXJBdCgxKSAmJiBoZXhbMl0uY2hhckF0KDApID09IGhleFsyXS5jaGFyQXQoMSkpIHtcbiAgICByZXR1cm4gaGV4WzBdLmNoYXJBdCgwKSArIGhleFsxXS5jaGFyQXQoMCkgKyBoZXhbMl0uY2hhckF0KDApO1xuICB9XG4gIHJldHVybiBoZXguam9pbihcIlwiKTtcbn1cblxuLy8gYHJnYmFUb0hleGBcbi8vIENvbnZlcnRzIGFuIFJHQkEgY29sb3IgcGx1cyBhbHBoYSB0cmFuc3BhcmVuY3kgdG8gaGV4XG4vLyBBc3N1bWVzIHIsIGcsIGIgYXJlIGNvbnRhaW5lZCBpbiB0aGUgc2V0IFswLCAyNTVdIGFuZFxuLy8gYSBpbiBbMCwgMV0uIFJldHVybnMgYSA0IG9yIDggY2hhcmFjdGVyIHJnYmEgaGV4XG5mdW5jdGlvbiByZ2JhVG9IZXgociwgZywgYiwgYSwgYWxsb3c0Q2hhcikge1xuICB2YXIgaGV4ID0gW3BhZDIoTWF0aC5yb3VuZChyKS50b1N0cmluZygxNikpLCBwYWQyKE1hdGgucm91bmQoZykudG9TdHJpbmcoMTYpKSwgcGFkMihNYXRoLnJvdW5kKGIpLnRvU3RyaW5nKDE2KSksIHBhZDIoY29udmVydERlY2ltYWxUb0hleChhKSldO1xuXG4gIC8vIFJldHVybiBhIDQgY2hhcmFjdGVyIGhleCBpZiBwb3NzaWJsZVxuICBpZiAoYWxsb3c0Q2hhciAmJiBoZXhbMF0uY2hhckF0KDApID09IGhleFswXS5jaGFyQXQoMSkgJiYgaGV4WzFdLmNoYXJBdCgwKSA9PSBoZXhbMV0uY2hhckF0KDEpICYmIGhleFsyXS5jaGFyQXQoMCkgPT0gaGV4WzJdLmNoYXJBdCgxKSAmJiBoZXhbM10uY2hhckF0KDApID09IGhleFszXS5jaGFyQXQoMSkpIHtcbiAgICByZXR1cm4gaGV4WzBdLmNoYXJBdCgwKSArIGhleFsxXS5jaGFyQXQoMCkgKyBoZXhbMl0uY2hhckF0KDApICsgaGV4WzNdLmNoYXJBdCgwKTtcbiAgfVxuICByZXR1cm4gaGV4LmpvaW4oXCJcIik7XG59XG5cbi8vIGByZ2JhVG9BcmdiSGV4YFxuLy8gQ29udmVydHMgYW4gUkdCQSBjb2xvciB0byBhbiBBUkdCIEhleDggc3RyaW5nXG4vLyBSYXJlbHkgdXNlZCwgYnV0IHJlcXVpcmVkIGZvciBcInRvRmlsdGVyKClcIlxuZnVuY3Rpb24gcmdiYVRvQXJnYkhleChyLCBnLCBiLCBhKSB7XG4gIHZhciBoZXggPSBbcGFkMihjb252ZXJ0RGVjaW1hbFRvSGV4KGEpKSwgcGFkMihNYXRoLnJvdW5kKHIpLnRvU3RyaW5nKDE2KSksIHBhZDIoTWF0aC5yb3VuZChnKS50b1N0cmluZygxNikpLCBwYWQyKE1hdGgucm91bmQoYikudG9TdHJpbmcoMTYpKV07XG4gIHJldHVybiBoZXguam9pbihcIlwiKTtcbn1cblxuLy8gYGVxdWFsc2Bcbi8vIENhbiBiZSBjYWxsZWQgd2l0aCBhbnkgdGlueWNvbG9yIGlucHV0XG50aW55Y29sb3IuZXF1YWxzID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyKSB7XG4gIGlmICghY29sb3IxIHx8ICFjb2xvcjIpIHJldHVybiBmYWxzZTtcbiAgcmV0dXJuIHRpbnljb2xvcihjb2xvcjEpLnRvUmdiU3RyaW5nKCkgPT0gdGlueWNvbG9yKGNvbG9yMikudG9SZ2JTdHJpbmcoKTtcbn07XG50aW55Y29sb3IucmFuZG9tID0gZnVuY3Rpb24gKCkge1xuICByZXR1cm4gdGlueWNvbG9yLmZyb21SYXRpbyh7XG4gICAgcjogTWF0aC5yYW5kb20oKSxcbiAgICBnOiBNYXRoLnJhbmRvbSgpLFxuICAgIGI6IE1hdGgucmFuZG9tKClcbiAgfSk7XG59O1xuXG4vLyBNb2RpZmljYXRpb24gRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG4vLyBUaGFua3MgdG8gbGVzcy5qcyBmb3Igc29tZSBvZiB0aGUgYmFzaWNzIGhlcmVcbi8vIDxodHRwczovL2dpdGh1Yi5jb20vY2xvdWRoZWFkL2xlc3MuanMvYmxvYi9tYXN0ZXIvbGliL2xlc3MvZnVuY3Rpb25zLmpzPlxuXG5mdW5jdGlvbiBfZGVzYXR1cmF0ZShjb2xvciwgYW1vdW50KSB7XG4gIGFtb3VudCA9IGFtb3VudCA9PT0gMCA/IDAgOiBhbW91bnQgfHwgMTA7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIGhzbC5zIC09IGFtb3VudCAvIDEwMDtcbiAgaHNsLnMgPSBjbGFtcDAxKGhzbC5zKTtcbiAgcmV0dXJuIHRpbnljb2xvcihoc2wpO1xufVxuZnVuY3Rpb24gX3NhdHVyYXRlKGNvbG9yLCBhbW91bnQpIHtcbiAgYW1vdW50ID0gYW1vdW50ID09PSAwID8gMCA6IGFtb3VudCB8fCAxMDtcbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgaHNsLnMgKz0gYW1vdW50IC8gMTAwO1xuICBoc2wucyA9IGNsYW1wMDEoaHNsLnMpO1xuICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG59XG5mdW5jdGlvbiBfZ3JleXNjYWxlKGNvbG9yKSB7XG4gIHJldHVybiB0aW55Y29sb3IoY29sb3IpLmRlc2F0dXJhdGUoMTAwKTtcbn1cbmZ1bmN0aW9uIF9saWdodGVuKGNvbG9yLCBhbW91bnQpIHtcbiAgYW1vdW50ID0gYW1vdW50ID09PSAwID8gMCA6IGFtb3VudCB8fCAxMDtcbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgaHNsLmwgKz0gYW1vdW50IC8gMTAwO1xuICBoc2wubCA9IGNsYW1wMDEoaHNsLmwpO1xuICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG59XG5mdW5jdGlvbiBfYnJpZ2h0ZW4oY29sb3IsIGFtb3VudCkge1xuICBhbW91bnQgPSBhbW91bnQgPT09IDAgPyAwIDogYW1vdW50IHx8IDEwO1xuICB2YXIgcmdiID0gdGlueWNvbG9yKGNvbG9yKS50b1JnYigpO1xuICByZ2IuciA9IE1hdGgubWF4KDAsIE1hdGgubWluKDI1NSwgcmdiLnIgLSBNYXRoLnJvdW5kKDI1NSAqIC0oYW1vdW50IC8gMTAwKSkpKTtcbiAgcmdiLmcgPSBNYXRoLm1heCgwLCBNYXRoLm1pbigyNTUsIHJnYi5nIC0gTWF0aC5yb3VuZCgyNTUgKiAtKGFtb3VudCAvIDEwMCkpKSk7XG4gIHJnYi5iID0gTWF0aC5tYXgoMCwgTWF0aC5taW4oMjU1LCByZ2IuYiAtIE1hdGgucm91bmQoMjU1ICogLShhbW91bnQgLyAxMDApKSkpO1xuICByZXR1cm4gdGlueWNvbG9yKHJnYik7XG59XG5mdW5jdGlvbiBfZGFya2VuKGNvbG9yLCBhbW91bnQpIHtcbiAgYW1vdW50ID0gYW1vdW50ID09PSAwID8gMCA6IGFtb3VudCB8fCAxMDtcbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgaHNsLmwgLT0gYW1vdW50IC8gMTAwO1xuICBoc2wubCA9IGNsYW1wMDEoaHNsLmwpO1xuICByZXR1cm4gdGlueWNvbG9yKGhzbCk7XG59XG5cbi8vIFNwaW4gdGFrZXMgYSBwb3NpdGl2ZSBvciBuZWdhdGl2ZSBhbW91bnQgd2l0aGluIFstMzYwLCAzNjBdIGluZGljYXRpbmcgdGhlIGNoYW5nZSBvZiBodWUuXG4vLyBWYWx1ZXMgb3V0c2lkZSBvZiB0aGlzIHJhbmdlIHdpbGwgYmUgd3JhcHBlZCBpbnRvIHRoaXMgcmFuZ2UuXG5mdW5jdGlvbiBfc3Bpbihjb2xvciwgYW1vdW50KSB7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIHZhciBodWUgPSAoaHNsLmggKyBhbW91bnQpICUgMzYwO1xuICBoc2wuaCA9IGh1ZSA8IDAgPyAzNjAgKyBodWUgOiBodWU7XG4gIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbn1cblxuLy8gQ29tYmluYXRpb24gRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIFRoYW5rcyB0byBqUXVlcnkgeENvbG9yIGZvciBzb21lIG9mIHRoZSBpZGVhcyBiZWhpbmQgdGhlc2Vcbi8vIDxodHRwczovL2dpdGh1Yi5jb20vaW5mdXNpb24valF1ZXJ5LXhjb2xvci9ibG9iL21hc3Rlci9qcXVlcnkueGNvbG9yLmpzPlxuXG5mdW5jdGlvbiBfY29tcGxlbWVudChjb2xvcikge1xuICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICBoc2wuaCA9IChoc2wuaCArIDE4MCkgJSAzNjA7XG4gIHJldHVybiB0aW55Y29sb3IoaHNsKTtcbn1cbmZ1bmN0aW9uIHBvbHlhZChjb2xvciwgbnVtYmVyKSB7XG4gIGlmIChpc05hTihudW1iZXIpIHx8IG51bWJlciA8PSAwKSB7XG4gICAgdGhyb3cgbmV3IEVycm9yKFwiQXJndW1lbnQgdG8gcG9seWFkIG11c3QgYmUgYSBwb3NpdGl2ZSBudW1iZXJcIik7XG4gIH1cbiAgdmFyIGhzbCA9IHRpbnljb2xvcihjb2xvcikudG9Ic2woKTtcbiAgdmFyIHJlc3VsdCA9IFt0aW55Y29sb3IoY29sb3IpXTtcbiAgdmFyIHN0ZXAgPSAzNjAgLyBudW1iZXI7XG4gIGZvciAodmFyIGkgPSAxOyBpIDwgbnVtYmVyOyBpKyspIHtcbiAgICByZXN1bHQucHVzaCh0aW55Y29sb3Ioe1xuICAgICAgaDogKGhzbC5oICsgaSAqIHN0ZXApICUgMzYwLFxuICAgICAgczogaHNsLnMsXG4gICAgICBsOiBoc2wubFxuICAgIH0pKTtcbiAgfVxuICByZXR1cm4gcmVzdWx0O1xufVxuZnVuY3Rpb24gX3NwbGl0Y29tcGxlbWVudChjb2xvcikge1xuICB2YXIgaHNsID0gdGlueWNvbG9yKGNvbG9yKS50b0hzbCgpO1xuICB2YXIgaCA9IGhzbC5oO1xuICByZXR1cm4gW3Rpbnljb2xvcihjb2xvciksIHRpbnljb2xvcih7XG4gICAgaDogKGggKyA3MikgJSAzNjAsXG4gICAgczogaHNsLnMsXG4gICAgbDogaHNsLmxcbiAgfSksIHRpbnljb2xvcih7XG4gICAgaDogKGggKyAyMTYpICUgMzYwLFxuICAgIHM6IGhzbC5zLFxuICAgIGw6IGhzbC5sXG4gIH0pXTtcbn1cbmZ1bmN0aW9uIF9hbmFsb2dvdXMoY29sb3IsIHJlc3VsdHMsIHNsaWNlcykge1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCA2O1xuICBzbGljZXMgPSBzbGljZXMgfHwgMzA7XG4gIHZhciBoc2wgPSB0aW55Y29sb3IoY29sb3IpLnRvSHNsKCk7XG4gIHZhciBwYXJ0ID0gMzYwIC8gc2xpY2VzO1xuICB2YXIgcmV0ID0gW3Rpbnljb2xvcihjb2xvcildO1xuICBmb3IgKGhzbC5oID0gKGhzbC5oIC0gKHBhcnQgKiByZXN1bHRzID4+IDEpICsgNzIwKSAlIDM2MDsgLS1yZXN1bHRzOykge1xuICAgIGhzbC5oID0gKGhzbC5oICsgcGFydCkgJSAzNjA7XG4gICAgcmV0LnB1c2godGlueWNvbG9yKGhzbCkpO1xuICB9XG4gIHJldHVybiByZXQ7XG59XG5mdW5jdGlvbiBfbW9ub2Nocm9tYXRpYyhjb2xvciwgcmVzdWx0cykge1xuICByZXN1bHRzID0gcmVzdWx0cyB8fCA2O1xuICB2YXIgaHN2ID0gdGlueWNvbG9yKGNvbG9yKS50b0hzdigpO1xuICB2YXIgaCA9IGhzdi5oLFxuICAgIHMgPSBoc3YucyxcbiAgICB2ID0gaHN2LnY7XG4gIHZhciByZXQgPSBbXTtcbiAgdmFyIG1vZGlmaWNhdGlvbiA9IDEgLyByZXN1bHRzO1xuICB3aGlsZSAocmVzdWx0cy0tKSB7XG4gICAgcmV0LnB1c2godGlueWNvbG9yKHtcbiAgICAgIGg6IGgsXG4gICAgICBzOiBzLFxuICAgICAgdjogdlxuICAgIH0pKTtcbiAgICB2ID0gKHYgKyBtb2RpZmljYXRpb24pICUgMTtcbiAgfVxuICByZXR1cm4gcmV0O1xufVxuXG4vLyBVdGlsaXR5IEZ1bmN0aW9uc1xuLy8gLS0tLS0tLS0tLS0tLS0tLS0tLS0tXG5cbnRpbnljb2xvci5taXggPSBmdW5jdGlvbiAoY29sb3IxLCBjb2xvcjIsIGFtb3VudCkge1xuICBhbW91bnQgPSBhbW91bnQgPT09IDAgPyAwIDogYW1vdW50IHx8IDUwO1xuICB2YXIgcmdiMSA9IHRpbnljb2xvcihjb2xvcjEpLnRvUmdiKCk7XG4gIHZhciByZ2IyID0gdGlueWNvbG9yKGNvbG9yMikudG9SZ2IoKTtcbiAgdmFyIHAgPSBhbW91bnQgLyAxMDA7XG4gIHZhciByZ2JhID0ge1xuICAgIHI6IChyZ2IyLnIgLSByZ2IxLnIpICogcCArIHJnYjEucixcbiAgICBnOiAocmdiMi5nIC0gcmdiMS5nKSAqIHAgKyByZ2IxLmcsXG4gICAgYjogKHJnYjIuYiAtIHJnYjEuYikgKiBwICsgcmdiMS5iLFxuICAgIGE6IChyZ2IyLmEgLSByZ2IxLmEpICogcCArIHJnYjEuYVxuICB9O1xuICByZXR1cm4gdGlueWNvbG9yKHJnYmEpO1xufTtcblxuLy8gUmVhZGFiaWxpdHkgRnVuY3Rpb25zXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi8yMDA4L1JFQy1XQ0FHMjAtMjAwODEyMTEvI2NvbnRyYXN0LXJhdGlvZGVmIChXQ0FHIFZlcnNpb24gMilcblxuLy8gYGNvbnRyYXN0YFxuLy8gQW5hbHl6ZSB0aGUgMiBjb2xvcnMgYW5kIHJldHVybnMgdGhlIGNvbG9yIGNvbnRyYXN0IGRlZmluZWQgYnkgKFdDQUcgVmVyc2lvbiAyKVxudGlueWNvbG9yLnJlYWRhYmlsaXR5ID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyKSB7XG4gIHZhciBjMSA9IHRpbnljb2xvcihjb2xvcjEpO1xuICB2YXIgYzIgPSB0aW55Y29sb3IoY29sb3IyKTtcbiAgcmV0dXJuIChNYXRoLm1heChjMS5nZXRMdW1pbmFuY2UoKSwgYzIuZ2V0THVtaW5hbmNlKCkpICsgMC4wNSkgLyAoTWF0aC5taW4oYzEuZ2V0THVtaW5hbmNlKCksIGMyLmdldEx1bWluYW5jZSgpKSArIDAuMDUpO1xufTtcblxuLy8gYGlzUmVhZGFibGVgXG4vLyBFbnN1cmUgdGhhdCBmb3JlZ3JvdW5kIGFuZCBiYWNrZ3JvdW5kIGNvbG9yIGNvbWJpbmF0aW9ucyBtZWV0IFdDQUcyIGd1aWRlbGluZXMuXG4vLyBUaGUgdGhpcmQgYXJndW1lbnQgaXMgYW4gb3B0aW9uYWwgT2JqZWN0LlxuLy8gICAgICB0aGUgJ2xldmVsJyBwcm9wZXJ0eSBzdGF0ZXMgJ0FBJyBvciAnQUFBJyAtIGlmIG1pc3Npbmcgb3IgaW52YWxpZCwgaXQgZGVmYXVsdHMgdG8gJ0FBJztcbi8vICAgICAgdGhlICdzaXplJyBwcm9wZXJ0eSBzdGF0ZXMgJ2xhcmdlJyBvciAnc21hbGwnIC0gaWYgbWlzc2luZyBvciBpbnZhbGlkLCBpdCBkZWZhdWx0cyB0byAnc21hbGwnLlxuLy8gSWYgdGhlIGVudGlyZSBvYmplY3QgaXMgYWJzZW50LCBpc1JlYWRhYmxlIGRlZmF1bHRzIHRvIHtsZXZlbDpcIkFBXCIsc2l6ZTpcInNtYWxsXCJ9LlxuXG4vLyAqRXhhbXBsZSpcbi8vICAgIHRpbnljb2xvci5pc1JlYWRhYmxlKFwiIzAwMFwiLCBcIiMxMTFcIikgPT4gZmFsc2Vcbi8vICAgIHRpbnljb2xvci5pc1JlYWRhYmxlKFwiIzAwMFwiLCBcIiMxMTFcIix7bGV2ZWw6XCJBQVwiLHNpemU6XCJsYXJnZVwifSkgPT4gZmFsc2VcbnRpbnljb2xvci5pc1JlYWRhYmxlID0gZnVuY3Rpb24gKGNvbG9yMSwgY29sb3IyLCB3Y2FnMikge1xuICB2YXIgcmVhZGFiaWxpdHkgPSB0aW55Y29sb3IucmVhZGFiaWxpdHkoY29sb3IxLCBjb2xvcjIpO1xuICB2YXIgd2NhZzJQYXJtcywgb3V0O1xuICBvdXQgPSBmYWxzZTtcbiAgd2NhZzJQYXJtcyA9IHZhbGlkYXRlV0NBRzJQYXJtcyh3Y2FnMik7XG4gIHN3aXRjaCAod2NhZzJQYXJtcy5sZXZlbCArIHdjYWcyUGFybXMuc2l6ZSkge1xuICAgIGNhc2UgXCJBQXNtYWxsXCI6XG4gICAgY2FzZSBcIkFBQWxhcmdlXCI6XG4gICAgICBvdXQgPSByZWFkYWJpbGl0eSA+PSA0LjU7XG4gICAgICBicmVhaztcbiAgICBjYXNlIFwiQUFsYXJnZVwiOlxuICAgICAgb3V0ID0gcmVhZGFiaWxpdHkgPj0gMztcbiAgICAgIGJyZWFrO1xuICAgIGNhc2UgXCJBQUFzbWFsbFwiOlxuICAgICAgb3V0ID0gcmVhZGFiaWxpdHkgPj0gNztcbiAgICAgIGJyZWFrO1xuICB9XG4gIHJldHVybiBvdXQ7XG59O1xuXG4vLyBgbW9zdFJlYWRhYmxlYFxuLy8gR2l2ZW4gYSBiYXNlIGNvbG9yIGFuZCBhIGxpc3Qgb2YgcG9zc2libGUgZm9yZWdyb3VuZCBvciBiYWNrZ3JvdW5kXG4vLyBjb2xvcnMgZm9yIHRoYXQgYmFzZSwgcmV0dXJucyB0aGUgbW9zdCByZWFkYWJsZSBjb2xvci5cbi8vIE9wdGlvbmFsbHkgcmV0dXJucyBCbGFjayBvciBXaGl0ZSBpZiB0aGUgbW9zdCByZWFkYWJsZSBjb2xvciBpcyB1bnJlYWRhYmxlLlxuLy8gKkV4YW1wbGUqXG4vLyAgICB0aW55Y29sb3IubW9zdFJlYWRhYmxlKHRpbnljb2xvci5tb3N0UmVhZGFibGUoXCIjMTIzXCIsIFtcIiMxMjRcIiwgXCIjMTI1XCJdLHtpbmNsdWRlRmFsbGJhY2tDb2xvcnM6ZmFsc2V9KS50b0hleFN0cmluZygpOyAvLyBcIiMxMTIyNTVcIlxuLy8gICAgdGlueWNvbG9yLm1vc3RSZWFkYWJsZSh0aW55Y29sb3IubW9zdFJlYWRhYmxlKFwiIzEyM1wiLCBbXCIjMTI0XCIsIFwiIzEyNVwiXSx7aW5jbHVkZUZhbGxiYWNrQ29sb3JzOnRydWV9KS50b0hleFN0cmluZygpOyAgLy8gXCIjZmZmZmZmXCJcbi8vICAgIHRpbnljb2xvci5tb3N0UmVhZGFibGUoXCIjYTgwMTVhXCIsIFtcIiNmYWYzZjNcIl0se2luY2x1ZGVGYWxsYmFja0NvbG9yczp0cnVlLGxldmVsOlwiQUFBXCIsc2l6ZTpcImxhcmdlXCJ9KS50b0hleFN0cmluZygpOyAvLyBcIiNmYWYzZjNcIlxuLy8gICAgdGlueWNvbG9yLm1vc3RSZWFkYWJsZShcIiNhODAxNWFcIiwgW1wiI2ZhZjNmM1wiXSx7aW5jbHVkZUZhbGxiYWNrQ29sb3JzOnRydWUsbGV2ZWw6XCJBQUFcIixzaXplOlwic21hbGxcIn0pLnRvSGV4U3RyaW5nKCk7IC8vIFwiI2ZmZmZmZlwiXG50aW55Y29sb3IubW9zdFJlYWRhYmxlID0gZnVuY3Rpb24gKGJhc2VDb2xvciwgY29sb3JMaXN0LCBhcmdzKSB7XG4gIHZhciBiZXN0Q29sb3IgPSBudWxsO1xuICB2YXIgYmVzdFNjb3JlID0gMDtcbiAgdmFyIHJlYWRhYmlsaXR5O1xuICB2YXIgaW5jbHVkZUZhbGxiYWNrQ29sb3JzLCBsZXZlbCwgc2l6ZTtcbiAgYXJncyA9IGFyZ3MgfHwge307XG4gIGluY2x1ZGVGYWxsYmFja0NvbG9ycyA9IGFyZ3MuaW5jbHVkZUZhbGxiYWNrQ29sb3JzO1xuICBsZXZlbCA9IGFyZ3MubGV2ZWw7XG4gIHNpemUgPSBhcmdzLnNpemU7XG4gIGZvciAodmFyIGkgPSAwOyBpIDwgY29sb3JMaXN0Lmxlbmd0aDsgaSsrKSB7XG4gICAgcmVhZGFiaWxpdHkgPSB0aW55Y29sb3IucmVhZGFiaWxpdHkoYmFzZUNvbG9yLCBjb2xvckxpc3RbaV0pO1xuICAgIGlmIChyZWFkYWJpbGl0eSA+IGJlc3RTY29yZSkge1xuICAgICAgYmVzdFNjb3JlID0gcmVhZGFiaWxpdHk7XG4gICAgICBiZXN0Q29sb3IgPSB0aW55Y29sb3IoY29sb3JMaXN0W2ldKTtcbiAgICB9XG4gIH1cbiAgaWYgKHRpbnljb2xvci5pc1JlYWRhYmxlKGJhc2VDb2xvciwgYmVzdENvbG9yLCB7XG4gICAgbGV2ZWw6IGxldmVsLFxuICAgIHNpemU6IHNpemVcbiAgfSkgfHwgIWluY2x1ZGVGYWxsYmFja0NvbG9ycykge1xuICAgIHJldHVybiBiZXN0Q29sb3I7XG4gIH0gZWxzZSB7XG4gICAgYXJncy5pbmNsdWRlRmFsbGJhY2tDb2xvcnMgPSBmYWxzZTtcbiAgICByZXR1cm4gdGlueWNvbG9yLm1vc3RSZWFkYWJsZShiYXNlQ29sb3IsIFtcIiNmZmZcIiwgXCIjMDAwXCJdLCBhcmdzKTtcbiAgfVxufTtcblxuLy8gQmlnIExpc3Qgb2YgQ29sb3JzXG4vLyAtLS0tLS0tLS0tLS0tLS0tLS1cbi8vIDxodHRwczovL3d3dy53My5vcmcvVFIvY3NzLWNvbG9yLTQvI25hbWVkLWNvbG9ycz5cbnZhciBuYW1lcyA9IHRpbnljb2xvci5uYW1lcyA9IHtcbiAgYWxpY2VibHVlOiBcImYwZjhmZlwiLFxuICBhbnRpcXVld2hpdGU6IFwiZmFlYmQ3XCIsXG4gIGFxdWE6IFwiMGZmXCIsXG4gIGFxdWFtYXJpbmU6IFwiN2ZmZmQ0XCIsXG4gIGF6dXJlOiBcImYwZmZmZlwiLFxuICBiZWlnZTogXCJmNWY1ZGNcIixcbiAgYmlzcXVlOiBcImZmZTRjNFwiLFxuICBibGFjazogXCIwMDBcIixcbiAgYmxhbmNoZWRhbG1vbmQ6IFwiZmZlYmNkXCIsXG4gIGJsdWU6IFwiMDBmXCIsXG4gIGJsdWV2aW9sZXQ6IFwiOGEyYmUyXCIsXG4gIGJyb3duOiBcImE1MmEyYVwiLFxuICBidXJseXdvb2Q6IFwiZGViODg3XCIsXG4gIGJ1cm50c2llbm5hOiBcImVhN2U1ZFwiLFxuICBjYWRldGJsdWU6IFwiNWY5ZWEwXCIsXG4gIGNoYXJ0cmV1c2U6IFwiN2ZmZjAwXCIsXG4gIGNob2NvbGF0ZTogXCJkMjY5MWVcIixcbiAgY29yYWw6IFwiZmY3ZjUwXCIsXG4gIGNvcm5mbG93ZXJibHVlOiBcIjY0OTVlZFwiLFxuICBjb3Juc2lsazogXCJmZmY4ZGNcIixcbiAgY3JpbXNvbjogXCJkYzE0M2NcIixcbiAgY3lhbjogXCIwZmZcIixcbiAgZGFya2JsdWU6IFwiMDAwMDhiXCIsXG4gIGRhcmtjeWFuOiBcIjAwOGI4YlwiLFxuICBkYXJrZ29sZGVucm9kOiBcImI4ODYwYlwiLFxuICBkYXJrZ3JheTogXCJhOWE5YTlcIixcbiAgZGFya2dyZWVuOiBcIjAwNjQwMFwiLFxuICBkYXJrZ3JleTogXCJhOWE5YTlcIixcbiAgZGFya2toYWtpOiBcImJkYjc2YlwiLFxuICBkYXJrbWFnZW50YTogXCI4YjAwOGJcIixcbiAgZGFya29saXZlZ3JlZW46IFwiNTU2YjJmXCIsXG4gIGRhcmtvcmFuZ2U6IFwiZmY4YzAwXCIsXG4gIGRhcmtvcmNoaWQ6IFwiOTkzMmNjXCIsXG4gIGRhcmtyZWQ6IFwiOGIwMDAwXCIsXG4gIGRhcmtzYWxtb246IFwiZTk5NjdhXCIsXG4gIGRhcmtzZWFncmVlbjogXCI4ZmJjOGZcIixcbiAgZGFya3NsYXRlYmx1ZTogXCI0ODNkOGJcIixcbiAgZGFya3NsYXRlZ3JheTogXCIyZjRmNGZcIixcbiAgZGFya3NsYXRlZ3JleTogXCIyZjRmNGZcIixcbiAgZGFya3R1cnF1b2lzZTogXCIwMGNlZDFcIixcbiAgZGFya3Zpb2xldDogXCI5NDAwZDNcIixcbiAgZGVlcHBpbms6IFwiZmYxNDkzXCIsXG4gIGRlZXBza3libHVlOiBcIjAwYmZmZlwiLFxuICBkaW1ncmF5OiBcIjY5Njk2OVwiLFxuICBkaW1ncmV5OiBcIjY5Njk2OVwiLFxuICBkb2RnZXJibHVlOiBcIjFlOTBmZlwiLFxuICBmaXJlYnJpY2s6IFwiYjIyMjIyXCIsXG4gIGZsb3JhbHdoaXRlOiBcImZmZmFmMFwiLFxuICBmb3Jlc3RncmVlbjogXCIyMjhiMjJcIixcbiAgZnVjaHNpYTogXCJmMGZcIixcbiAgZ2FpbnNib3JvOiBcImRjZGNkY1wiLFxuICBnaG9zdHdoaXRlOiBcImY4ZjhmZlwiLFxuICBnb2xkOiBcImZmZDcwMFwiLFxuICBnb2xkZW5yb2Q6IFwiZGFhNTIwXCIsXG4gIGdyYXk6IFwiODA4MDgwXCIsXG4gIGdyZWVuOiBcIjAwODAwMFwiLFxuICBncmVlbnllbGxvdzogXCJhZGZmMmZcIixcbiAgZ3JleTogXCI4MDgwODBcIixcbiAgaG9uZXlkZXc6IFwiZjBmZmYwXCIsXG4gIGhvdHBpbms6IFwiZmY2OWI0XCIsXG4gIGluZGlhbnJlZDogXCJjZDVjNWNcIixcbiAgaW5kaWdvOiBcIjRiMDA4MlwiLFxuICBpdm9yeTogXCJmZmZmZjBcIixcbiAga2hha2k6IFwiZjBlNjhjXCIsXG4gIGxhdmVuZGVyOiBcImU2ZTZmYVwiLFxuICBsYXZlbmRlcmJsdXNoOiBcImZmZjBmNVwiLFxuICBsYXduZ3JlZW46IFwiN2NmYzAwXCIsXG4gIGxlbW9uY2hpZmZvbjogXCJmZmZhY2RcIixcbiAgbGlnaHRibHVlOiBcImFkZDhlNlwiLFxuICBsaWdodGNvcmFsOiBcImYwODA4MFwiLFxuICBsaWdodGN5YW46IFwiZTBmZmZmXCIsXG4gIGxpZ2h0Z29sZGVucm9keWVsbG93OiBcImZhZmFkMlwiLFxuICBsaWdodGdyYXk6IFwiZDNkM2QzXCIsXG4gIGxpZ2h0Z3JlZW46IFwiOTBlZTkwXCIsXG4gIGxpZ2h0Z3JleTogXCJkM2QzZDNcIixcbiAgbGlnaHRwaW5rOiBcImZmYjZjMVwiLFxuICBsaWdodHNhbG1vbjogXCJmZmEwN2FcIixcbiAgbGlnaHRzZWFncmVlbjogXCIyMGIyYWFcIixcbiAgbGlnaHRza3libHVlOiBcIjg3Y2VmYVwiLFxuICBsaWdodHNsYXRlZ3JheTogXCI3ODlcIixcbiAgbGlnaHRzbGF0ZWdyZXk6IFwiNzg5XCIsXG4gIGxpZ2h0c3RlZWxibHVlOiBcImIwYzRkZVwiLFxuICBsaWdodHllbGxvdzogXCJmZmZmZTBcIixcbiAgbGltZTogXCIwZjBcIixcbiAgbGltZWdyZWVuOiBcIjMyY2QzMlwiLFxuICBsaW5lbjogXCJmYWYwZTZcIixcbiAgbWFnZW50YTogXCJmMGZcIixcbiAgbWFyb29uOiBcIjgwMDAwMFwiLFxuICBtZWRpdW1hcXVhbWFyaW5lOiBcIjY2Y2RhYVwiLFxuICBtZWRpdW1ibHVlOiBcIjAwMDBjZFwiLFxuICBtZWRpdW1vcmNoaWQ6IFwiYmE1NWQzXCIsXG4gIG1lZGl1bXB1cnBsZTogXCI5MzcwZGJcIixcbiAgbWVkaXVtc2VhZ3JlZW46IFwiM2NiMzcxXCIsXG4gIG1lZGl1bXNsYXRlYmx1ZTogXCI3YjY4ZWVcIixcbiAgbWVkaXVtc3ByaW5nZ3JlZW46IFwiMDBmYTlhXCIsXG4gIG1lZGl1bXR1cnF1b2lzZTogXCI0OGQxY2NcIixcbiAgbWVkaXVtdmlvbGV0cmVkOiBcImM3MTU4NVwiLFxuICBtaWRuaWdodGJsdWU6IFwiMTkxOTcwXCIsXG4gIG1pbnRjcmVhbTogXCJmNWZmZmFcIixcbiAgbWlzdHlyb3NlOiBcImZmZTRlMVwiLFxuICBtb2NjYXNpbjogXCJmZmU0YjVcIixcbiAgbmF2YWpvd2hpdGU6IFwiZmZkZWFkXCIsXG4gIG5hdnk6IFwiMDAwMDgwXCIsXG4gIG9sZGxhY2U6IFwiZmRmNWU2XCIsXG4gIG9saXZlOiBcIjgwODAwMFwiLFxuICBvbGl2ZWRyYWI6IFwiNmI4ZTIzXCIsXG4gIG9yYW5nZTogXCJmZmE1MDBcIixcbiAgb3JhbmdlcmVkOiBcImZmNDUwMFwiLFxuICBvcmNoaWQ6IFwiZGE3MGQ2XCIsXG4gIHBhbGVnb2xkZW5yb2Q6IFwiZWVlOGFhXCIsXG4gIHBhbGVncmVlbjogXCI5OGZiOThcIixcbiAgcGFsZXR1cnF1b2lzZTogXCJhZmVlZWVcIixcbiAgcGFsZXZpb2xldHJlZDogXCJkYjcwOTNcIixcbiAgcGFwYXlhd2hpcDogXCJmZmVmZDVcIixcbiAgcGVhY2hwdWZmOiBcImZmZGFiOVwiLFxuICBwZXJ1OiBcImNkODUzZlwiLFxuICBwaW5rOiBcImZmYzBjYlwiLFxuICBwbHVtOiBcImRkYTBkZFwiLFxuICBwb3dkZXJibHVlOiBcImIwZTBlNlwiLFxuICBwdXJwbGU6IFwiODAwMDgwXCIsXG4gIHJlYmVjY2FwdXJwbGU6IFwiNjYzMzk5XCIsXG4gIHJlZDogXCJmMDBcIixcbiAgcm9zeWJyb3duOiBcImJjOGY4ZlwiLFxuICByb3lhbGJsdWU6IFwiNDE2OWUxXCIsXG4gIHNhZGRsZWJyb3duOiBcIjhiNDUxM1wiLFxuICBzYWxtb246IFwiZmE4MDcyXCIsXG4gIHNhbmR5YnJvd246IFwiZjRhNDYwXCIsXG4gIHNlYWdyZWVuOiBcIjJlOGI1N1wiLFxuICBzZWFzaGVsbDogXCJmZmY1ZWVcIixcbiAgc2llbm5hOiBcImEwNTIyZFwiLFxuICBzaWx2ZXI6IFwiYzBjMGMwXCIsXG4gIHNreWJsdWU6IFwiODdjZWViXCIsXG4gIHNsYXRlYmx1ZTogXCI2YTVhY2RcIixcbiAgc2xhdGVncmF5OiBcIjcwODA5MFwiLFxuICBzbGF0ZWdyZXk6IFwiNzA4MDkwXCIsXG4gIHNub3c6IFwiZmZmYWZhXCIsXG4gIHNwcmluZ2dyZWVuOiBcIjAwZmY3ZlwiLFxuICBzdGVlbGJsdWU6IFwiNDY4MmI0XCIsXG4gIHRhbjogXCJkMmI0OGNcIixcbiAgdGVhbDogXCIwMDgwODBcIixcbiAgdGhpc3RsZTogXCJkOGJmZDhcIixcbiAgdG9tYXRvOiBcImZmNjM0N1wiLFxuICB0dXJxdW9pc2U6IFwiNDBlMGQwXCIsXG4gIHZpb2xldDogXCJlZTgyZWVcIixcbiAgd2hlYXQ6IFwiZjVkZWIzXCIsXG4gIHdoaXRlOiBcImZmZlwiLFxuICB3aGl0ZXNtb2tlOiBcImY1ZjVmNVwiLFxuICB5ZWxsb3c6IFwiZmYwXCIsXG4gIHllbGxvd2dyZWVuOiBcIjlhY2QzMlwiXG59O1xuXG4vLyBNYWtlIGl0IGVhc3kgdG8gYWNjZXNzIGNvbG9ycyB2aWEgYGhleE5hbWVzW2hleF1gXG52YXIgaGV4TmFtZXMgPSB0aW55Y29sb3IuaGV4TmFtZXMgPSBmbGlwKG5hbWVzKTtcblxuLy8gVXRpbGl0aWVzXG4vLyAtLS0tLS0tLS1cblxuLy8gYHsgJ25hbWUxJzogJ3ZhbDEnIH1gIGJlY29tZXMgYHsgJ3ZhbDEnOiAnbmFtZTEnIH1gXG5mdW5jdGlvbiBmbGlwKG8pIHtcbiAgdmFyIGZsaXBwZWQgPSB7fTtcbiAgZm9yICh2YXIgaSBpbiBvKSB7XG4gICAgaWYgKG8uaGFzT3duUHJvcGVydHkoaSkpIHtcbiAgICAgIGZsaXBwZWRbb1tpXV0gPSBpO1xuICAgIH1cbiAgfVxuICByZXR1cm4gZmxpcHBlZDtcbn1cblxuLy8gUmV0dXJuIGEgdmFsaWQgYWxwaGEgdmFsdWUgWzAsMV0gd2l0aCBhbGwgaW52YWxpZCB2YWx1ZXMgYmVpbmcgc2V0IHRvIDFcbmZ1bmN0aW9uIGJvdW5kQWxwaGEoYSkge1xuICBhID0gcGFyc2VGbG9hdChhKTtcbiAgaWYgKGlzTmFOKGEpIHx8IGEgPCAwIHx8IGEgPiAxKSB7XG4gICAgYSA9IDE7XG4gIH1cbiAgcmV0dXJuIGE7XG59XG5cbi8vIFRha2UgaW5wdXQgZnJvbSBbMCwgbl0gYW5kIHJldHVybiBpdCBhcyBbMCwgMV1cbmZ1bmN0aW9uIGJvdW5kMDEobiwgbWF4KSB7XG4gIGlmIChpc09uZVBvaW50WmVybyhuKSkgbiA9IFwiMTAwJVwiO1xuICB2YXIgcHJvY2Vzc1BlcmNlbnQgPSBpc1BlcmNlbnRhZ2Uobik7XG4gIG4gPSBNYXRoLm1pbihtYXgsIE1hdGgubWF4KDAsIHBhcnNlRmxvYXQobikpKTtcblxuICAvLyBBdXRvbWF0aWNhbGx5IGNvbnZlcnQgcGVyY2VudGFnZSBpbnRvIG51bWJlclxuICBpZiAocHJvY2Vzc1BlcmNlbnQpIHtcbiAgICBuID0gcGFyc2VJbnQobiAqIG1heCwgMTApIC8gMTAwO1xuICB9XG5cbiAgLy8gSGFuZGxlIGZsb2F0aW5nIHBvaW50IHJvdW5kaW5nIGVycm9yc1xuICBpZiAoTWF0aC5hYnMobiAtIG1heCkgPCAwLjAwMDAwMSkge1xuICAgIHJldHVybiAxO1xuICB9XG5cbiAgLy8gQ29udmVydCBpbnRvIFswLCAxXSByYW5nZSBpZiBpdCBpc24ndCBhbHJlYWR5XG4gIHJldHVybiBuICUgbWF4IC8gcGFyc2VGbG9hdChtYXgpO1xufVxuXG4vLyBGb3JjZSBhIG51bWJlciBiZXR3ZWVuIDAgYW5kIDFcbmZ1bmN0aW9uIGNsYW1wMDEodmFsKSB7XG4gIHJldHVybiBNYXRoLm1pbigxLCBNYXRoLm1heCgwLCB2YWwpKTtcbn1cblxuLy8gUGFyc2UgYSBiYXNlLTE2IGhleCB2YWx1ZSBpbnRvIGEgYmFzZS0xMCBpbnRlZ2VyXG5mdW5jdGlvbiBwYXJzZUludEZyb21IZXgodmFsKSB7XG4gIHJldHVybiBwYXJzZUludCh2YWwsIDE2KTtcbn1cblxuLy8gTmVlZCB0byBoYW5kbGUgMS4wIGFzIDEwMCUsIHNpbmNlIG9uY2UgaXQgaXMgYSBudW1iZXIsIHRoZXJlIGlzIG5vIGRpZmZlcmVuY2UgYmV0d2VlbiBpdCBhbmQgMVxuLy8gPGh0dHA6Ly9zdGFja292ZXJmbG93LmNvbS9xdWVzdGlvbnMvNzQyMjA3Mi9qYXZhc2NyaXB0LWhvdy10by1kZXRlY3QtbnVtYmVyLWFzLWEtZGVjaW1hbC1pbmNsdWRpbmctMS0wPlxuZnVuY3Rpb24gaXNPbmVQb2ludFplcm8obikge1xuICByZXR1cm4gdHlwZW9mIG4gPT0gXCJzdHJpbmdcIiAmJiBuLmluZGV4T2YoXCIuXCIpICE9IC0xICYmIHBhcnNlRmxvYXQobikgPT09IDE7XG59XG5cbi8vIENoZWNrIHRvIHNlZSBpZiBzdHJpbmcgcGFzc2VkIGluIGlzIGEgcGVyY2VudGFnZVxuZnVuY3Rpb24gaXNQZXJjZW50YWdlKG4pIHtcbiAgcmV0dXJuIHR5cGVvZiBuID09PSBcInN0cmluZ1wiICYmIG4uaW5kZXhPZihcIiVcIikgIT0gLTE7XG59XG5cbi8vIEZvcmNlIGEgaGV4IHZhbHVlIHRvIGhhdmUgMiBjaGFyYWN0ZXJzXG5mdW5jdGlvbiBwYWQyKGMpIHtcbiAgcmV0dXJuIGMubGVuZ3RoID09IDEgPyBcIjBcIiArIGMgOiBcIlwiICsgYztcbn1cblxuLy8gUmVwbGFjZSBhIGRlY2ltYWwgd2l0aCBpdCdzIHBlcmNlbnRhZ2UgdmFsdWVcbmZ1bmN0aW9uIGNvbnZlcnRUb1BlcmNlbnRhZ2Uobikge1xuICBpZiAobiA8PSAxKSB7XG4gICAgbiA9IG4gKiAxMDAgKyBcIiVcIjtcbiAgfVxuICByZXR1cm4gbjtcbn1cblxuLy8gQ29udmVydHMgYSBkZWNpbWFsIHRvIGEgaGV4IHZhbHVlXG5mdW5jdGlvbiBjb252ZXJ0RGVjaW1hbFRvSGV4KGQpIHtcbiAgcmV0dXJuIE1hdGgucm91bmQocGFyc2VGbG9hdChkKSAqIDI1NSkudG9TdHJpbmcoMTYpO1xufVxuLy8gQ29udmVydHMgYSBoZXggdmFsdWUgdG8gYSBkZWNpbWFsXG5mdW5jdGlvbiBjb252ZXJ0SGV4VG9EZWNpbWFsKGgpIHtcbiAgcmV0dXJuIHBhcnNlSW50RnJvbUhleChoKSAvIDI1NTtcbn1cbnZhciBtYXRjaGVycyA9IGZ1bmN0aW9uICgpIHtcbiAgLy8gPGh0dHA6Ly93d3cudzMub3JnL1RSL2NzczMtdmFsdWVzLyNpbnRlZ2Vycz5cbiAgdmFyIENTU19JTlRFR0VSID0gXCJbLVxcXFwrXT9cXFxcZCslP1wiO1xuXG4gIC8vIDxodHRwOi8vd3d3LnczLm9yZy9UUi9jc3MzLXZhbHVlcy8jbnVtYmVyLXZhbHVlPlxuICB2YXIgQ1NTX05VTUJFUiA9IFwiWy1cXFxcK10/XFxcXGQqXFxcXC5cXFxcZCslP1wiO1xuXG4gIC8vIEFsbG93IHBvc2l0aXZlL25lZ2F0aXZlIGludGVnZXIvbnVtYmVyLiAgRG9uJ3QgY2FwdHVyZSB0aGUgZWl0aGVyL29yLCBqdXN0IHRoZSBlbnRpcmUgb3V0Y29tZS5cbiAgdmFyIENTU19VTklUID0gXCIoPzpcIiArIENTU19OVU1CRVIgKyBcIil8KD86XCIgKyBDU1NfSU5URUdFUiArIFwiKVwiO1xuXG4gIC8vIEFjdHVhbCBtYXRjaGluZy5cbiAgLy8gUGFyZW50aGVzZXMgYW5kIGNvbW1hcyBhcmUgb3B0aW9uYWwsIGJ1dCBub3QgcmVxdWlyZWQuXG4gIC8vIFdoaXRlc3BhY2UgY2FuIHRha2UgdGhlIHBsYWNlIG9mIGNvbW1hcyBvciBvcGVuaW5nIHBhcmVuXG4gIHZhciBQRVJNSVNTSVZFX01BVENIMyA9IFwiW1xcXFxzfFxcXFwoXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVssfFxcXFxzXSsoXCIgKyBDU1NfVU5JVCArIFwiKVxcXFxzKlxcXFwpP1wiO1xuICB2YXIgUEVSTUlTU0lWRV9NQVRDSDQgPSBcIltcXFxcc3xcXFxcKF0rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilbLHxcXFxcc10rKFwiICsgQ1NTX1VOSVQgKyBcIilcXFxccypcXFxcKT9cIjtcbiAgcmV0dXJuIHtcbiAgICBDU1NfVU5JVDogbmV3IFJlZ0V4cChDU1NfVU5JVCksXG4gICAgcmdiOiBuZXcgUmVnRXhwKFwicmdiXCIgKyBQRVJNSVNTSVZFX01BVENIMyksXG4gICAgcmdiYTogbmV3IFJlZ0V4cChcInJnYmFcIiArIFBFUk1JU1NJVkVfTUFUQ0g0KSxcbiAgICBoc2w6IG5ldyBSZWdFeHAoXCJoc2xcIiArIFBFUk1JU1NJVkVfTUFUQ0gzKSxcbiAgICBoc2xhOiBuZXcgUmVnRXhwKFwiaHNsYVwiICsgUEVSTUlTU0lWRV9NQVRDSDQpLFxuICAgIGhzdjogbmV3IFJlZ0V4cChcImhzdlwiICsgUEVSTUlTU0lWRV9NQVRDSDMpLFxuICAgIGhzdmE6IG5ldyBSZWdFeHAoXCJoc3ZhXCIgKyBQRVJNSVNTSVZFX01BVENINCksXG4gICAgaGV4MzogL14jPyhbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgIGhleDY6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkkLyxcbiAgICBoZXg0OiAvXiM/KFswLTlhLWZBLUZdezF9KShbMC05YS1mQS1GXXsxfSkoWzAtOWEtZkEtRl17MX0pKFswLTlhLWZBLUZdezF9KSQvLFxuICAgIGhleDg6IC9eIz8oWzAtOWEtZkEtRl17Mn0pKFswLTlhLWZBLUZdezJ9KShbMC05YS1mQS1GXXsyfSkoWzAtOWEtZkEtRl17Mn0pJC9cbiAgfTtcbn0oKTtcblxuLy8gYGlzVmFsaWRDU1NVbml0YFxuLy8gVGFrZSBpbiBhIHNpbmdsZSBzdHJpbmcgLyBudW1iZXIgYW5kIGNoZWNrIHRvIHNlZSBpZiBpdCBsb29rcyBsaWtlIGEgQ1NTIHVuaXRcbi8vIChzZWUgYG1hdGNoZXJzYCBhYm92ZSBmb3IgZGVmaW5pdGlvbikuXG5mdW5jdGlvbiBpc1ZhbGlkQ1NTVW5pdChjb2xvcikge1xuICByZXR1cm4gISFtYXRjaGVycy5DU1NfVU5JVC5leGVjKGNvbG9yKTtcbn1cblxuLy8gYHN0cmluZ0lucHV0VG9PYmplY3RgXG4vLyBQZXJtaXNzaXZlIHN0cmluZyBwYXJzaW5nLiAgVGFrZSBpbiBhIG51bWJlciBvZiBmb3JtYXRzLCBhbmQgb3V0cHV0IGFuIG9iamVjdFxuLy8gYmFzZWQgb24gZGV0ZWN0ZWQgZm9ybWF0LiAgUmV0dXJucyBgeyByLCBnLCBiIH1gIG9yIGB7IGgsIHMsIGwgfWAgb3IgYHsgaCwgcywgdn1gXG5mdW5jdGlvbiBzdHJpbmdJbnB1dFRvT2JqZWN0KGNvbG9yKSB7XG4gIGNvbG9yID0gY29sb3IucmVwbGFjZSh0cmltTGVmdCwgXCJcIikucmVwbGFjZSh0cmltUmlnaHQsIFwiXCIpLnRvTG93ZXJDYXNlKCk7XG4gIHZhciBuYW1lZCA9IGZhbHNlO1xuICBpZiAobmFtZXNbY29sb3JdKSB7XG4gICAgY29sb3IgPSBuYW1lc1tjb2xvcl07XG4gICAgbmFtZWQgPSB0cnVlO1xuICB9IGVsc2UgaWYgKGNvbG9yID09IFwidHJhbnNwYXJlbnRcIikge1xuICAgIHJldHVybiB7XG4gICAgICByOiAwLFxuICAgICAgZzogMCxcbiAgICAgIGI6IDAsXG4gICAgICBhOiAwLFxuICAgICAgZm9ybWF0OiBcIm5hbWVcIlxuICAgIH07XG4gIH1cblxuICAvLyBUcnkgdG8gbWF0Y2ggc3RyaW5nIGlucHV0IHVzaW5nIHJlZ3VsYXIgZXhwcmVzc2lvbnMuXG4gIC8vIEtlZXAgbW9zdCBvZiB0aGUgbnVtYmVyIGJvdW5kaW5nIG91dCBvZiB0aGlzIGZ1bmN0aW9uIC0gZG9uJ3Qgd29ycnkgYWJvdXQgWzAsMV0gb3IgWzAsMTAwXSBvciBbMCwzNjBdXG4gIC8vIEp1c3QgcmV0dXJuIGFuIG9iamVjdCBhbmQgbGV0IHRoZSBjb252ZXJzaW9uIGZ1bmN0aW9ucyBoYW5kbGUgdGhhdC5cbiAgLy8gVGhpcyB3YXkgdGhlIHJlc3VsdCB3aWxsIGJlIHRoZSBzYW1lIHdoZXRoZXIgdGhlIHRpbnljb2xvciBpcyBpbml0aWFsaXplZCB3aXRoIHN0cmluZyBvciBvYmplY3QuXG4gIHZhciBtYXRjaDtcbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMucmdiLmV4ZWMoY29sb3IpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IG1hdGNoWzFdLFxuICAgICAgZzogbWF0Y2hbMl0sXG4gICAgICBiOiBtYXRjaFszXVxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMucmdiYS5leGVjKGNvbG9yKSkge1xuICAgIHJldHVybiB7XG4gICAgICByOiBtYXRjaFsxXSxcbiAgICAgIGc6IG1hdGNoWzJdLFxuICAgICAgYjogbWF0Y2hbM10sXG4gICAgICBhOiBtYXRjaFs0XVxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMuaHNsLmV4ZWMoY29sb3IpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IG1hdGNoWzFdLFxuICAgICAgczogbWF0Y2hbMl0sXG4gICAgICBsOiBtYXRjaFszXVxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMuaHNsYS5leGVjKGNvbG9yKSkge1xuICAgIHJldHVybiB7XG4gICAgICBoOiBtYXRjaFsxXSxcbiAgICAgIHM6IG1hdGNoWzJdLFxuICAgICAgbDogbWF0Y2hbM10sXG4gICAgICBhOiBtYXRjaFs0XVxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMuaHN2LmV4ZWMoY29sb3IpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIGg6IG1hdGNoWzFdLFxuICAgICAgczogbWF0Y2hbMl0sXG4gICAgICB2OiBtYXRjaFszXVxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMuaHN2YS5leGVjKGNvbG9yKSkge1xuICAgIHJldHVybiB7XG4gICAgICBoOiBtYXRjaFsxXSxcbiAgICAgIHM6IG1hdGNoWzJdLFxuICAgICAgdjogbWF0Y2hbM10sXG4gICAgICBhOiBtYXRjaFs0XVxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMuaGV4OC5leGVjKGNvbG9yKSkge1xuICAgIHJldHVybiB7XG4gICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0pLFxuICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdKSxcbiAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSksXG4gICAgICBhOiBjb252ZXJ0SGV4VG9EZWNpbWFsKG1hdGNoWzRdKSxcbiAgICAgIGZvcm1hdDogbmFtZWQgPyBcIm5hbWVcIiA6IFwiaGV4OFwiXG4gICAgfTtcbiAgfVxuICBpZiAobWF0Y2ggPSBtYXRjaGVycy5oZXg2LmV4ZWMoY29sb3IpKSB7XG4gICAgcmV0dXJuIHtcbiAgICAgIHI6IHBhcnNlSW50RnJvbUhleChtYXRjaFsxXSksXG4gICAgICBnOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMl0pLFxuICAgICAgYjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzNdKSxcbiAgICAgIGZvcm1hdDogbmFtZWQgPyBcIm5hbWVcIiA6IFwiaGV4XCJcbiAgICB9O1xuICB9XG4gIGlmIChtYXRjaCA9IG1hdGNoZXJzLmhleDQuZXhlYyhjb2xvcikpIHtcbiAgICByZXR1cm4ge1xuICAgICAgcjogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzFdICsgXCJcIiArIG1hdGNoWzFdKSxcbiAgICAgIGc6IHBhcnNlSW50RnJvbUhleChtYXRjaFsyXSArIFwiXCIgKyBtYXRjaFsyXSksXG4gICAgICBiOiBwYXJzZUludEZyb21IZXgobWF0Y2hbM10gKyBcIlwiICsgbWF0Y2hbM10pLFxuICAgICAgYTogY29udmVydEhleFRvRGVjaW1hbChtYXRjaFs0XSArIFwiXCIgKyBtYXRjaFs0XSksXG4gICAgICBmb3JtYXQ6IG5hbWVkID8gXCJuYW1lXCIgOiBcImhleDhcIlxuICAgIH07XG4gIH1cbiAgaWYgKG1hdGNoID0gbWF0Y2hlcnMuaGV4My5leGVjKGNvbG9yKSkge1xuICAgIHJldHVybiB7XG4gICAgICByOiBwYXJzZUludEZyb21IZXgobWF0Y2hbMV0gKyBcIlwiICsgbWF0Y2hbMV0pLFxuICAgICAgZzogcGFyc2VJbnRGcm9tSGV4KG1hdGNoWzJdICsgXCJcIiArIG1hdGNoWzJdKSxcbiAgICAgIGI6IHBhcnNlSW50RnJvbUhleChtYXRjaFszXSArIFwiXCIgKyBtYXRjaFszXSksXG4gICAgICBmb3JtYXQ6IG5hbWVkID8gXCJuYW1lXCIgOiBcImhleFwiXG4gICAgfTtcbiAgfVxuICByZXR1cm4gZmFsc2U7XG59XG5mdW5jdGlvbiB2YWxpZGF0ZVdDQUcyUGFybXMocGFybXMpIHtcbiAgLy8gcmV0dXJuIHZhbGlkIFdDQUcyIHBhcm1zIGZvciBpc1JlYWRhYmxlLlxuICAvLyBJZiBpbnB1dCBwYXJtcyBhcmUgaW52YWxpZCwgcmV0dXJuIHtcImxldmVsXCI6XCJBQVwiLCBcInNpemVcIjpcInNtYWxsXCJ9XG4gIHZhciBsZXZlbCwgc2l6ZTtcbiAgcGFybXMgPSBwYXJtcyB8fCB7XG4gICAgbGV2ZWw6IFwiQUFcIixcbiAgICBzaXplOiBcInNtYWxsXCJcbiAgfTtcbiAgbGV2ZWwgPSAocGFybXMubGV2ZWwgfHwgXCJBQVwiKS50b1VwcGVyQ2FzZSgpO1xuICBzaXplID0gKHBhcm1zLnNpemUgfHwgXCJzbWFsbFwiKS50b0xvd2VyQ2FzZSgpO1xuICBpZiAobGV2ZWwgIT09IFwiQUFcIiAmJiBsZXZlbCAhPT0gXCJBQUFcIikge1xuICAgIGxldmVsID0gXCJBQVwiO1xuICB9XG4gIGlmIChzaXplICE9PSBcInNtYWxsXCIgJiYgc2l6ZSAhPT0gXCJsYXJnZVwiKSB7XG4gICAgc2l6ZSA9IFwic21hbGxcIjtcbiAgfVxuICByZXR1cm4ge1xuICAgIGxldmVsOiBsZXZlbCxcbiAgICBzaXplOiBzaXplXG4gIH07XG59XG5cbmV4cG9ydCB7IHRpbnljb2xvciBhcyBkZWZhdWx0IH07XG4iXSwibmFtZXMiOlsib2JqIiwicCIsInEiXSwibWFwcGluZ3MiOiJBQUNBLFNBQVMsUUFBUSxLQUFLO0FBQ3BCO0FBRUEsU0FBTyxVQUFVLGNBQWMsT0FBTyxVQUFVLFlBQVksT0FBTyxPQUFPLFdBQVcsU0FBVUEsTUFBSztBQUNsRyxXQUFPLE9BQU9BO0FBQUEsRUFDaEIsSUFBSSxTQUFVQSxNQUFLO0FBQ2pCLFdBQU9BLFFBQU8sY0FBYyxPQUFPLFVBQVVBLEtBQUksZ0JBQWdCLFVBQVVBLFNBQVEsT0FBTyxZQUFZLFdBQVcsT0FBT0E7QUFBQSxFQUMxSCxHQUFHLFFBQVEsR0FBRztBQUNoQjtBQUtBLElBQUksV0FBVztBQUNmLElBQUksWUFBWTtBQUNoQixTQUFTLFVBQVUsT0FBTyxNQUFNO0FBQzlCLFVBQVEsUUFBUSxRQUFRO0FBQ3hCLFNBQU8sUUFBUSxDQUFBO0FBR2YsTUFBSSxpQkFBaUIsV0FBVztBQUM5QixXQUFPO0FBQUEsRUFDVDtBQUVBLE1BQUksRUFBRSxnQkFBZ0IsWUFBWTtBQUNoQyxXQUFPLElBQUksVUFBVSxPQUFPLElBQUk7QUFBQSxFQUNsQztBQUNBLE1BQUksTUFBTSxXQUFXLEtBQUs7QUFDMUIsT0FBSyxpQkFBaUIsT0FBTyxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssS0FBSyxJQUFJLEdBQUcsS0FBSyxLQUFLLElBQUksR0FBRyxLQUFLLEtBQUssSUFBSSxHQUFHLEtBQUssVUFBVSxLQUFLLE1BQU0sTUFBTSxLQUFLLEVBQUUsSUFBSSxLQUFLLEtBQUssVUFBVSxLQUFLLFVBQVUsSUFBSTtBQUNuTCxPQUFLLGdCQUFnQixLQUFL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O0FBQUEsRUFDWixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxNQUFNO0FBQUEsRUFDTixPQUFPO0FBQUEsRUFDUCxhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixVQUFVO0FBQUEsRUFDVixTQUFTO0FBQUEsRUFDVCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixPQUFPO0FBQUEsRUFDUCxPQUFPO0FBQUEsRUFDUCxVQUFVO0FBQUEsRUFDVixlQUFlO0FBQUEsRUFDZixXQUFXO0FBQUEsRUFDWCxjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxzQkFBc0I7QUFBQSxFQUN0QixXQUFXO0FBQUEsRUFDWCxZQUFZO0FBQUEsRUFDWixXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxhQUFhO0FBQUEsRUFDYixlQUFlO0FBQUEsRUFDZixjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixnQkFBZ0I7QUFBQSxFQUNoQixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixXQUFXO0FBQUEsRUFDWCxPQUFPO0FBQUEsRUFDUCxTQUFTO0FBQUEsRUFDVCxRQUFRO0FBQUEsRUFDUixrQkFBa0I7QUFBQSxFQUNsQixZQUFZO0FBQUEsRUFDWixjQUFjO0FBQUEsRUFDZCxjQUFjO0FBQUEsRUFDZCxnQkFBZ0I7QUFBQSxFQUNoQixpQkFBaUI7QUFBQSxFQUNqQixtQkFBbUI7QUFBQSxFQUNuQixpQkFBaUI7QUFBQSxFQUNqQixpQkFBaUI7QUFBQSxFQUNqQixjQUFjO0FBQUEsRUFDZCxXQUFXO0FBQUEsRUFDWCxXQUFXO0FBQUEsRUFDWCxVQUFVO0FBQUEsRUFDVixhQUFhO0FBQUEsRUFDYixNQUFNO0FBQUEsRUFDTixTQUFTO0FBQUEsRUFDVCxPQUFPO0FBQUEsRUFDUCxXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixXQUFXO0FBQUEsRUFDWCxRQUFRO0FBQUEsRUFDUixlQUFl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
