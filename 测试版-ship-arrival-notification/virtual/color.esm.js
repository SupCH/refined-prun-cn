/*!
 * @kurkle/color v0.3.4
 * https://github.com/kurkle/color#readme
 * (c) 2024 Jukka Kurkela
 * Released under the MIT License
 */
function round(v) {
  return (v + 0.5) | 0;
}
const lim = (v, l, h) => Math.max(Math.min(v, h), l);
function p2b(v) {
  return lim(round(v * 2.55), 0, 255);
}
function n2b(v) {
  return lim(round(v * 255), 0, 255);
}
function b2n(v) {
  return lim(round(v / 2.55) / 100, 0, 1);
}
function n2p(v) {
  return lim(round(v * 100), 0, 100);
}
const map$1 = {
  0: 0,
  1: 1,
  2: 2,
  3: 3,
  4: 4,
  5: 5,
  6: 6,
  7: 7,
  8: 8,
  9: 9,
  A: 10,
  B: 11,
  C: 12,
  D: 13,
  E: 14,
  F: 15,
  a: 10,
  b: 11,
  c: 12,
  d: 13,
  e: 14,
  f: 15,
};
const hex = [...'0123456789ABCDEF'];
const h1 = b => hex[b & 15];
const h2 = b => hex[(b & 240) >> 4] + hex[b & 15];
const eq = b => (b & 240) >> 4 === (b & 15);
const isShort = v => eq(v.r) && eq(v.g) && eq(v.b) && eq(v.a);
function hexParse(str) {
  var len = str.length;
  var ret;
  if (str[0] === '#') {
    if (len === 4 || len === 5) {
      ret = {
        r: 255 & (map$1[str[1]] * 17),
        g: 255 & (map$1[str[2]] * 17),
        b: 255 & (map$1[str[3]] * 17),
        a: len === 5 ? map$1[str[4]] * 17 : 255,
      };
    } else if (len === 7 || len === 9) {
      ret = {
        r: (map$1[str[1]] << 4) | map$1[str[2]],
        g: (map$1[str[3]] << 4) | map$1[str[4]],
        b: (map$1[str[5]] << 4) | map$1[str[6]],
        a: len === 9 ? (map$1[str[7]] << 4) | map$1[str[8]] : 255,
      };
    }
  }
  return ret;
}
const alpha = (a, f) => (a < 255 ? f(a) : '');
function hexString(v) {
  var f = isShort(v) ? h1 : h2;
  return v ? '#' + f(v.r) + f(v.g) + f(v.b) + alpha(v.a, f) : void 0;
}
const HUE_RE =
  /^(hsla?|hwb|hsv)\(\s*([-+.e\d]+)(?:deg)?[\s,]+([-+.e\d]+)%[\s,]+([-+.e\d]+)%(?:[\s,]+([-+.e\d]+)(%)?)?\s*\)$/;
function hsl2rgbn(h, s, l) {
  const a = s * Math.min(l, 1 - l);
  const f = (n, k = (n + h / 30) % 12) => l - a * Math.max(Math.min(k - 3, 9 - k, 1), -1);
  return [f(0), f(8), f(4)];
}
function hsv2rgbn(h, s, v) {
  const f = (n, k = (n + h / 60) % 6) => v - v * s * Math.max(Math.min(k, 4 - k, 1), 0);
  return [f(5), f(3), f(1)];
}
function hwb2rgbn(h, w, b) {
  const rgb = hsl2rgbn(h, 1, 0.5);
  let i;
  if (w + b > 1) {
    i = 1 / (w + b);
    w *= i;
    b *= i;
  }
  for (i = 0; i < 3; i++) {
    rgb[i] *= 1 - w - b;
    rgb[i] += w;
  }
  return rgb;
}
function hueValue(r, g, b, d, max) {
  if (r === max) {
    return (g - b) / d + (g < b ? 6 : 0);
  }
  if (g === max) {
    return (b - r) / d + 2;
  }
  return (r - g) / d + 4;
}
function rgb2hsl(v) {
  const range = 255;
  const r = v.r / range;
  const g = v.g / range;
  const b = v.b / range;
  const max = Math.max(r, g, b);
  const min = Math.min(r, g, b);
  const l = (max + min) / 2;
  let h, s, d;
  if (max !== min) {
    d = max - min;
    s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
    h = hueValue(r, g, b, d, max);
    h = h * 60 + 0.5;
  }
  return [h | 0, s || 0, l];
}
function calln(f, a, b, c) {
  return (Array.isArray(a) ? f(a[0], a[1], a[2]) : f(a, b, c)).map(n2b);
}
function hsl2rgb(h, s, l) {
  return calln(hsl2rgbn, h, s, l);
}
function hwb2rgb(h, w, b) {
  return calln(hwb2rgbn, h, w, b);
}
function hsv2rgb(h, s, v) {
  return calln(hsv2rgbn, h, s, v);
}
function hue(h) {
  return ((h % 360) + 360) % 360;
}
function hueParse(str) {
  const m = HUE_RE.exec(str);
  let a = 255;
  let v;
  if (!m) {
    return;
  }
  if (m[5] !== v) {
    a = m[6] ? p2b(+m[5]) : n2b(+m[5]);
  }
  const h = hue(+m[2]);
  const p1 = +m[3] / 100;
  const p2 = +m[4] / 100;
  if (m[1] === 'hwb') {
    v = hwb2rgb(h, p1, p2);
  } else if (m[1] === 'hsv') {
    v = hsv2rgb(h, p1, p2);
  } else {
    v = hsl2rgb(h, p1, p2);
  }
  return {
    r: v[0],
    g: v[1],
    b: v[2],
    a,
  };
}
function rotate(v, deg) {
  var h = rgb2hsl(v);
  h[0] = hue(h[0] + deg);
  h = hsl2rgb(h);
  v.r = h[0];
  v.g = h[1];
  v.b = h[2];
}
function hslString(v) {
  if (!v) {
    return;
  }
  const a = rgb2hsl(v);
  const h = a[0];
  const s = n2p(a[1]);
  const l = n2p(a[2]);
  return v.a < 255 ? `hsla(${h}, ${s}%, ${l}%, ${b2n(v.a)})` : `hsl(${h}, ${s}%, ${l}%)`;
}
const map = {
  x: 'dark',
  Z: 'light',
  Y: 're',
  X: 'blu',
  W: 'gr',
  V: 'medium',
  U: 'slate',
  A: 'ee',
  T: 'ol',
  S: 'or',
  B: 'ra',
  C: 'lateg',
  D: 'ights',
  R: 'in',
  Q: 'turquois',
  E: 'hi',
  P: 'ro',
  O: 'al',
  N: 'le',
  M: 'de',
  L: 'yello',
  F: 'en',
  K: 'ch',
  G: 'arks',
  H: 'ea',
  I: 'ightg',
  J: 'wh',
};
const names$1 = {
  OiceXe: 'f0f8ff',
  antiquewEte: 'faebd7',
  aqua: 'ffff',
  aquamarRe: '7fffd4',
  azuY: 'f0ffff',
  beige: 'f5f5dc',
  bisque: 'ffe4c4',
  black: '0',
  blanKedOmond: 'ffebcd',
  Xe: 'ff',
  XeviTet: '8a2be2',
  bPwn: 'a52a2a',
  burlywood: 'deb887',
  caMtXe: '5f9ea0',
  KartYuse: '7fff00',
  KocTate: 'd2691e',
  cSO: 'ff7f50',
  cSnflowerXe: '6495ed',
  cSnsilk: 'fff8dc',
  crimson: 'dc143c',
  cyan: 'ffff',
  xXe: '8b',
  xcyan: '8b8b',
  xgTMnPd: 'b8860b',
  xWay: 'a9a9a9',
  xgYF: '6400',
  xgYy: 'a9a9a9',
  xkhaki: 'bdb76b',
  xmagFta: '8b008b',
  xTivegYF: '556b2f',
  xSange: 'ff8c00',
  xScEd: '9932cc',
  xYd: '8b0000',
  xsOmon: 'e9967a',
  xsHgYF: '8fbc8f',
  xUXe: '483d8b',
  xUWay: '2f4f4f',
  xUgYy: '2f4f4f',
  xQe: 'ced1',
  xviTet: '9400d3',
  dAppRk: 'ff1493',
  dApskyXe: 'bfff',
  dimWay: '696969',
  dimgYy: '696969',
  dodgerXe: '1e90ff',
  fiYbrick: 'b22222',
  flSOwEte: 'fffaf0',
  foYstWAn: '228b22',
  fuKsia: 'ff00ff',
  gaRsbSo: 'dcdcdc',
  ghostwEte: 'f8f8ff',
  gTd: 'ffd700',
  gTMnPd: 'daa520',
  Way: '808080',
  gYF: '8000',
  gYFLw: 'adff2f',
  gYy: '808080',
  honeyMw: 'f0fff0',
  hotpRk: 'ff69b4',
  RdianYd: 'cd5c5c',
  Rdigo: '4b0082',
  ivSy: 'fffff0',
  khaki: 'f0e68c',
  lavFMr: 'e6e6fa',
  lavFMrXsh: 'fff0f5',
  lawngYF: '7cfc00',
  NmoncEffon: 'fffacd',
  ZXe: 'add8e6',
  ZcSO: 'f08080',
  Zcyan: 'e0ffff',
  ZgTMnPdLw: 'fafad2',
  ZWay: 'd3d3d3',
  ZgYF: '90ee90',
  ZgYy: 'd3d3d3',
  ZpRk: 'ffb6c1',
  ZsOmon: 'ffa07a',
  ZsHgYF: '20b2aa',
  ZskyXe: '87cefa',
  ZUWay: '778899',
  ZUgYy: '778899',
  ZstAlXe: 'b0c4de',
  ZLw: 'ffffe0',
  lime: 'ff00',
  limegYF: '32cd32',
  lRF: 'faf0e6',
  magFta: 'ff00ff',
  maPon: '800000',
  VaquamarRe: '66cdaa',
  VXe: 'cd',
  VScEd: 'ba55d3',
  VpurpN: '9370db',
  VsHgYF: '3cb371',
  VUXe: '7b68ee',
  VsprRggYF: 'fa9a',
  VQe: '48d1cc',
  VviTetYd: 'c71585',
  midnightXe: '191970',
  mRtcYam: 'f5fffa',
  mistyPse: 'ffe4e1',
  moccasR: 'ffe4b5',
  navajowEte: 'ffdead',
  navy: '80',
  Tdlace: 'fdf5e6',
  Tive: '808000',
  TivedBb: '6b8e23',
  Sange: 'ffa500',
  SangeYd: 'ff4500',
  ScEd: 'da70d6',
  pOegTMnPd: 'eee8aa',
  pOegYF: '98fb98',
  pOeQe: 'afeeee',
  pOeviTetYd: 'db7093',
  papayawEp: 'ffefd5',
  pHKpuff: 'ffdab9',
  peru: 'cd853f',
  pRk: 'ffc0cb',
  plum: 'dda0dd',
  powMrXe: 'b0e0e6',
  purpN: '800080',
  YbeccapurpN: '663399',
  Yd: 'ff0000',
  Psybrown: 'bc8f8f',
  PyOXe: '4169e1',
  saddNbPwn: '8b4513',
  sOmon: 'fa8072',
  sandybPwn: 'f4a460',
  sHgYF: '2e8b57',
  sHshell: 'fff5ee',
  siFna: 'a0522d',
  silver: 'c0c0c0',
  skyXe: '87ceeb',
  UXe: '6a5acd',
  UWay: '708090',
  UgYy: '708090',
  snow: 'fffafa',
  sprRggYF: 'ff7f',
  stAlXe: '4682b4',
  tan: 'd2b48c',
  teO: '8080',
  tEstN: 'd8bfd8',
  tomato: 'ff6347',
  Qe: '40e0d0',
  viTet: 'ee82ee',
  JHt: 'f5deb3',
  wEte: 'ffffff',
  wEtesmoke: 'f5f5f5',
  Lw: 'ffff00',
  LwgYF: '9acd32',
};
function unpack() {
  const unpacked = {};
  const keys = Object.keys(names$1);
  const tkeys = Object.keys(map);
  let i, j, k, ok, nk;
  for (i = 0; i < keys.length; i++) {
    ok = nk = keys[i];
    for (j = 0; j < tkeys.length; j++) {
      k = tkeys[j];
      nk = nk.replace(k, map[k]);
    }
    k = parseInt(names$1[ok], 16);
    unpacked[nk] = [(k >> 16) & 255, (k >> 8) & 255, k & 255];
  }
  return unpacked;
}
let names;
function nameParse(str) {
  if (!names) {
    names = unpack();
    names.transparent = [0, 0, 0, 0];
  }
  const a = names[str.toLowerCase()];
  return (
    a && {
      r: a[0],
      g: a[1],
      b: a[2],
      a: a.length === 4 ? a[3] : 255,
    }
  );
}
const RGB_RE =
  /^rgba?\(\s*([-+.\d]+)(%)?[\s,]+([-+.e\d]+)(%)?[\s,]+([-+.e\d]+)(%)?(?:[\s,/]+([-+.e\d]+)(%)?)?\s*\)$/;
function rgbParse(str) {
  const m = RGB_RE.exec(str);
  let a = 255;
  let r, g, b;
  if (!m) {
    return;
  }
  if (m[7] !== r) {
    const v = +m[7];
    a = m[8] ? p2b(v) : lim(v * 255, 0, 255);
  }
  r = +m[1];
  g = +m[3];
  b = +m[5];
  r = 255 & (m[2] ? p2b(r) : lim(r, 0, 255));
  g = 255 & (m[4] ? p2b(g) : lim(g, 0, 255));
  b = 255 & (m[6] ? p2b(b) : lim(b, 0, 255));
  return {
    r,
    g,
    b,
    a,
  };
}
function rgbString(v) {
  return (
    v && (v.a < 255 ? `rgba(${v.r}, ${v.g}, ${v.b}, ${b2n(v.a)})` : `rgb(${v.r}, ${v.g}, ${v.b})`)
  );
}
const to = v => (v <= 31308e-7 ? v * 12.92 : Math.pow(v, 1 / 2.4) * 1.055 - 0.055);
const from = v => (v <= 0.04045 ? v / 12.92 : Math.pow((v + 0.055) / 1.055, 2.4));
function interpolate(rgb1, rgb2, t) {
  const r = from(b2n(rgb1.r));
  const g = from(b2n(rgb1.g));
  const b = from(b2n(rgb1.b));
  return {
    r: n2b(to(r + t * (from(b2n(rgb2.r)) - r))),
    g: n2b(to(g + t * (from(b2n(rgb2.g)) - g))),
    b: n2b(to(b + t * (from(b2n(rgb2.b)) - b))),
    a: rgb1.a + t * (rgb2.a - rgb1.a),
  };
}
function modHSL(v, i, ratio) {
  if (v) {
    let tmp = rgb2hsl(v);
    tmp[i] = Math.max(0, Math.min(tmp[i] + tmp[i] * ratio, i === 0 ? 360 : 1));
    tmp = hsl2rgb(tmp);
    v.r = tmp[0];
    v.g = tmp[1];
    v.b = tmp[2];
  }
}
function clone(v, proto) {
  return v ? Object.assign(proto || {}, v) : v;
}
function fromObject(input) {
  var v = { r: 0, g: 0, b: 0, a: 255 };
  if (Array.isArray(input)) {
    if (input.length >= 3) {
      v = { r: input[0], g: input[1], b: input[2], a: 255 };
      if (input.length > 3) {
        v.a = n2b(input[3]);
      }
    }
  } else {
    v = clone(input, { r: 0, g: 0, b: 0, a: 1 });
    v.a = n2b(v.a);
  }
  return v;
}
function functionParse(str) {
  if (str.charAt(0) === 'r') {
    return rgbParse(str);
  }
  return hueParse(str);
}
class Color {
  constructor(input) {
    if (input instanceof Color) {
      return input;
    }
    const type = typeof input;
    let v;
    if (type === 'object') {
      v = fromObject(input);
    } else if (type === 'string') {
      v = hexParse(input) || nameParse(input) || functionParse(input);
    }
    this._rgb = v;
    this._valid = !!v;
  }
  get valid() {
    return this._valid;
  }
  get rgb() {
    var v = clone(this._rgb);
    if (v) {
      v.a = b2n(v.a);
    }
    return v;
  }
  set rgb(obj) {
    this._rgb = fromObject(obj);
  }
  rgbString() {
    return this._valid ? rgbString(this._rgb) : void 0;
  }
  hexString() {
    return this._valid ? hexString(this._rgb) : void 0;
  }
  hslString() {
    return this._valid ? hslString(this._rgb) : void 0;
  }
  mix(color, weight) {
    if (color) {
      const c1 = this.rgb;
      const c2 = color.rgb;
      let w2;
      const p = weight === w2 ? 0.5 : weight;
      const w = 2 * p - 1;
      const a = c1.a - c2.a;
      const w1 = ((w * a === -1 ? w : (w + a) / (1 + w * a)) + 1) / 2;
      w2 = 1 - w1;
      c1.r = 255 & (w1 * c1.r + w2 * c2.r + 0.5);
      c1.g = 255 & (w1 * c1.g + w2 * c2.g + 0.5);
      c1.b = 255 & (w1 * c1.b + w2 * c2.b + 0.5);
      c1.a = p * c1.a + (1 - p) * c2.a;
      this.rgb = c1;
    }
    return this;
  }
  interpolate(color, t) {
    if (color) {
      this._rgb = interpolate(this._rgb, color._rgb, t);
    }
    return this;
  }
  clone() {
    return new Color(this.rgb);
  }
  alpha(a) {
    this._rgb.a = n2b(a);
    return this;
  }
  clearer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 - ratio;
    return this;
  }
  greyscale() {
    const rgb = this._rgb;
    const val = round(rgb.r * 0.3 + rgb.g * 0.59 + rgb.b * 0.11);
    rgb.r = rgb.g = rgb.b = val;
    return this;
  }
  opaquer(ratio) {
    const rgb = this._rgb;
    rgb.a *= 1 + ratio;
    return this;
  }
  negate() {
    const v = this._rgb;
    v.r = 255 - v.r;
    v.g = 255 - v.g;
    v.b = 255 - v.b;
    return this;
  }
  lighten(ratio) {
    modHSL(this._rgb, 2, ratio);
    return this;
  }
  darken(ratio) {
    modHSL(this._rgb, 2, -ratio);
    return this;
  }
  saturate(ratio) {
    modHSL(this._rgb, 1, ratio);
    return this;
  }
  desaturate(ratio) {
    modHSL(this._rgb, 1, -ratio);
    return this;
  }
  rotate(deg) {
    rotate(this._rgb, deg);
    return this;
  }
}
export {
  Color,
  b2n,
  hexParse,
  hexString,
  hsl2rgb,
  hslString,
  hsv2rgb,
  hueParse,
  hwb2rgb,
  lim,
  n2b,
  n2p,
  nameParse,
  p2b,
  rgb2hsl,
  rgbParse,
  rgbString,
  rotate,
  round,
};
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY29sb3IuZXNtLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vQGt1cmtsZStjb2xvckAwLjMuNC9ub2RlX21vZHVsZXMvQGt1cmtsZS9jb2xvci9kaXN0L2NvbG9yLmVzbS5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiFcbiAqIEBrdXJrbGUvY29sb3IgdjAuMy40XG4gKiBodHRwczovL2dpdGh1Yi5jb20va3Vya2xlL2NvbG9yI3JlYWRtZVxuICogKGMpIDIwMjQgSnVra2EgS3Vya2VsYVxuICogUmVsZWFzZWQgdW5kZXIgdGhlIE1JVCBMaWNlbnNlXG4gKi9cbmZ1bmN0aW9uIHJvdW5kKHYpIHtcbiAgcmV0dXJuIHYgKyAwLjUgfCAwO1xufVxuY29uc3QgbGltID0gKHYsIGwsIGgpID0+IE1hdGgubWF4KE1hdGgubWluKHYsIGgpLCBsKTtcbmZ1bmN0aW9uIHAyYih2KSB7XG4gIHJldHVybiBsaW0ocm91bmQodiAqIDIuNTUpLCAwLCAyNTUpO1xufVxuZnVuY3Rpb24gYjJwKHYpIHtcbiAgcmV0dXJuIGxpbShyb3VuZCh2IC8gMi41NSksIDAsIDEwMCk7XG59XG5mdW5jdGlvbiBuMmIodikge1xuICByZXR1cm4gbGltKHJvdW5kKHYgKiAyNTUpLCAwLCAyNTUpO1xufVxuZnVuY3Rpb24gYjJuKHYpIHtcbiAgcmV0dXJuIGxpbShyb3VuZCh2IC8gMi41NSkgLyAxMDAsIDAsIDEpO1xufVxuZnVuY3Rpb24gbjJwKHYpIHtcbiAgcmV0dXJuIGxpbShyb3VuZCh2ICogMTAwKSwgMCwgMTAwKTtcbn1cblxuY29uc3QgbWFwJDEgPSB7MDogMCwgMTogMSwgMjogMiwgMzogMywgNDogNCwgNTogNSwgNjogNiwgNzogNywgODogOCwgOTogOSwgQTogMTAsIEI6IDExLCBDOiAxMiwgRDogMTMsIEU6IDE0LCBGOiAxNSwgYTogMTAsIGI6IDExLCBjOiAxMiwgZDogMTMsIGU6IDE0LCBmOiAxNX07XG5jb25zdCBoZXggPSBbLi4uJzAxMjM0NTY3ODlBQkNERUYnXTtcbmNvbnN0IGgxID0gYiA9PiBoZXhbYiAmIDB4Rl07XG5jb25zdCBoMiA9IGIgPT4gaGV4WyhiICYgMHhGMCkgPj4gNF0gKyBoZXhbYiAmIDB4Rl07XG5jb25zdCBlcSA9IGIgPT4gKChiICYgMHhGMCkgPj4gNCkgPT09IChiICYgMHhGKTtcbmNvbnN0IGlzU2hvcnQgPSB2ID0+IGVxKHYucikgJiYgZXEodi5nKSAmJiBlcSh2LmIpICYmIGVxKHYuYSk7XG5mdW5jdGlvbiBoZXhQYXJzZShzdHIpIHtcbiAgdmFyIGxlbiA9IHN0ci5sZW5ndGg7XG4gIHZhciByZXQ7XG4gIGlmIChzdHJbMF0gPT09ICcjJykge1xuICAgIGlmIChsZW4gPT09IDQgfHwgbGVuID09PSA1KSB7XG4gICAgICByZXQgPSB7XG4gICAgICAgIHI6IDI1NSAmIG1hcCQxW3N0clsxXV0gKiAxNyxcbiAgICAgICAgZzogMjU1ICYgbWFwJDFbc3RyWzJdXSAqIDE3LFxuICAgICAgICBiOiAyNTUgJiBtYXAkMVtzdHJbM11dICogMTcsXG4gICAgICAgIGE6IGxlbiA9PT0gNSA/IG1hcCQxW3N0cls0XV0gKiAxNyA6IDI1NVxuICAgICAgfTtcbiAgICB9IGVsc2UgaWYgKGxlbiA9PT0gNyB8fCBsZW4gPT09IDkpIHtcbiAgICAgIHJldCA9IHtcbiAgICAgICAgcjogbWFwJDFbc3RyWzFdXSA8PCA0IHwgbWFwJDFbc3RyWzJdXSxcbiAgICAgICAgZzogbWFwJDFbc3RyWzNdXSA8PCA0IHwgbWFwJDFbc3RyWzRdXSxcbiAgICAgICAgYjogbWFwJDFbc3RyWzVdXSA8PCA0IHwgbWFwJDFbc3RyWzZdXSxcbiAgICAgICAgYTogbGVuID09PSA5ID8gKG1hcCQxW3N0cls3XV0gPDwgNCB8IG1hcCQxW3N0cls4XV0pIDogMjU1XG4gICAgICB9O1xuICAgIH1cbiAgfVxuICByZXR1cm4gcmV0O1xufVxuY29uc3QgYWxwaGEgPSAoYSwgZikgPT4gYSA8IDI1NSA/IGYoYSkgOiAnJztcbmZ1bmN0aW9uIGhleFN0cmluZyh2KSB7XG4gIHZhciBmID0gaXNTaG9ydCh2KSA/IGgxIDogaDI7XG4gIHJldHVybiB2XG4gICAgPyAnIycgKyBmKHYucikgKyBmKHYuZykgKyBmKHYuYikgKyBhbHBoYSh2LmEsIGYpXG4gICAgOiB1bmRlZmluZWQ7XG59XG5cbmNvbnN0IEhVRV9SRSA9IC9eKGhzbGE/fGh3Ynxoc3YpXFwoXFxzKihbLSsuZVxcZF0rKSg/OmRlZyk/W1xccyxdKyhbLSsuZVxcZF0rKSVbXFxzLF0rKFstKy5lXFxkXSspJSg/OltcXHMsXSsoWy0rLmVcXGRdKykoJSk/KT9cXHMqXFwpJC87XG5mdW5jdGlvbiBoc2wycmdibihoLCBzLCBsKSB7XG4gIGNvbnN0IGEgPSBzICogTWF0aC5taW4obCwgMSAtIGwpO1xuICBjb25zdCBmID0gKG4sIGsgPSAobiArIGggLyAzMCkgJSAxMikgPT4gbCAtIGEgKiBNYXRoLm1heChNYXRoLm1pbihrIC0gMywgOSAtIGssIDEpLCAtMSk7XG4gIHJldHVybiBbZigwKSwgZig4KSwgZig0KV07XG59XG5mdW5jdGlvbiBoc3YycmdibihoLCBzLCB2KSB7XG4gIGNvbnN0IGYgPSAobiwgayA9IChuICsgaCAvIDYwKSAlIDYpID0+IHYgLSB2ICogcyAqIE1hdGgubWF4KE1hdGgubWluKGssIDQgLSBrLCAxKSwgMCk7XG4gIHJldHVybiBbZig1KSwgZigzKSwgZigxKV07XG59XG5mdW5jdGlvbiBod2IycmdibihoLCB3LCBiKSB7XG4gIGNvbnN0IHJnYiA9IGhzbDJyZ2JuKGgsIDEsIDAuNSk7XG4gIGxldCBpO1xuICBpZiAodyArIGIgPiAxKSB7XG4gICAgaSA9IDEgLyAodyArIGIpO1xuICAgIHcgKj0gaTtcbiAgICBiICo9IGk7XG4gIH1cbiAgZm9yIChpID0gMDsgaSA8IDM7IGkrKykge1xuICAgIHJnYltpXSAqPSAxIC0gdyAtIGI7XG4gICAgcmdiW2ldICs9IHc7XG4gIH1cbiAgcmV0dXJuIHJnYjtcbn1cbmZ1bmN0aW9uIGh1ZVZhbHVlKHIsIGcsIGIsIGQsIG1heCkge1xuICBpZiAociA9PT0gbWF4KSB7XG4gICAgcmV0dXJuICgoZyAtIGIpIC8gZCkgKyAoZyA8IGIgPyA2IDogMCk7XG4gIH1cbiAgaWYgKGcgPT09IG1heCkge1xuICAgIHJldHVybiAoYiAtIHIpIC8gZCArIDI7XG4gIH1cbiAgcmV0dXJuIChyIC0gZykgLyBkICsgNDtcbn1cbmZ1bmN0aW9uIHJnYjJoc2wodikge1xuICBjb25zdCByYW5nZSA9IDI1NTtcbiAgY29uc3QgciA9IHYuciAvIHJhbmdlO1xuICBjb25zdCBnID0gdi5nIC8gcmFuZ2U7XG4gIGNvbnN0IGIgPSB2LmIgLyByYW5nZTtcbiAgY29uc3QgbWF4ID0gTWF0aC5tYXgociwgZywgYik7XG4gIGNvbnN0IG1pbiA9IE1hdGgubWluKHIsIGcsIGIpO1xuICBjb25zdCBsID0gKG1heCArIG1pbikgLyAyO1xuICBsZXQgaCwgcywgZDtcbiAgaWYgKG1heCAhPT0gbWluKSB7XG4gICAgZCA9IG1heCAtIG1pbjtcbiAgICBzID0gbCA+IDAuNSA/IGQgLyAoMiAtIG1heCAtIG1pbikgOiBkIC8gKG1heCArIG1pbik7XG4gICAgaCA9IGh1ZVZhbHVlKHIsIGcsIGIsIGQsIG1heCk7XG4gICAgaCA9IGggKiA2MCArIDAuNTtcbiAgfVxuICByZXR1cm4gW2ggfCAwLCBzIHx8IDAsIGxdO1xufVxuZnVuY3Rpb24gY2FsbG4oZiwgYSwgYiwgYykge1xuICByZXR1cm4gKFxuICAgIEFycmF5LmlzQXJyYXkoYSlcbiAgICAgID8gZihhWzBdLCBhWzFdLCBhWzJdKVxuICAgICAgOiBmKGEsIGIsIGMpXG4gICkubWFwKG4yYik7XG59XG5mdW5jdGlvbiBoc2wycmdiKGgsIHMsIGwpIHtcbiAgcmV0dXJuIGNhbGxuKGhzbDJyZ2JuLCBoLCBzLCBsKTtcbn1cbmZ1bmN0aW9uIGh3YjJyZ2IoaCwgdywgYikge1xuICByZXR1cm4gY2FsbG4oaHdiMnJnYm4sIGgsIHcsIGIpO1xufVxuZnVuY3Rpb24gaHN2MnJnYihoLCBzLCB2KSB7XG4gIHJldHVybiBjYWxsbihoc3YycmdibiwgaCwgcywgdik7XG59XG5mdW5jdGlvbiBodWUoaCkge1xuICByZXR1cm4gKGggJSAzNjAgKyAzNjApICUgMzYwO1xufVxuZnVuY3Rpb24gaHVlUGFyc2Uoc3RyKSB7XG4gIGNvbnN0IG0gPSBIVUVfUkUuZXhlYyhzdHIpO1xuICBsZXQgYSA9IDI1NTtcbiAgbGV0IHY7XG4gIGlmICghbSkge1xuICAgIHJldHVybjtcbiAgfVxuICBpZiAobVs1XSAhPT0gdikge1xuICAgIGEgPSBtWzZdID8gcDJiKCttWzVdKSA6IG4yYigrbVs1XSk7XG4gIH1cbiAgY29uc3QgaCA9IGh1ZSgrbVsyXSk7XG4gIGNvbnN0IHAxID0gK21bM10gLyAxMDA7XG4gIGNvbnN0IHAyID0gK21bNF0gLyAxMDA7XG4gIGlmIChtWzFdID09PSAnaHdiJykge1xuICAgIHYgPSBod2IycmdiKGgsIHAxLCBwMik7XG4gIH0gZWxzZSBpZiAobVsxXSA9PT0gJ2hzdicpIHtcbiAgICB2ID0gaHN2MnJnYihoLCBwMSwgcDIpO1xuICB9IGVsc2Uge1xuICAgIHYgPSBoc2wycmdiKGgsIHAxLCBwMik7XG4gIH1cbiAgcmV0dXJuIHtcbiAgICByOiB2WzBdLFxuICAgIGc6IHZbMV0sXG4gICAgYjogdlsyXSxcbiAgICBhOiBhXG4gIH07XG59XG5mdW5jdGlvbiByb3RhdGUodiwgZGVnKSB7XG4gIHZhciBoID0gcmdiMmhzbCh2KTtcbiAgaFswXSA9IGh1ZShoWzBdICsgZGVnKTtcbiAgaCA9IGhzbDJyZ2IoaCk7XG4gIHYuciA9IGhbMF07XG4gIHYuZyA9IGhbMV07XG4gIHYuYiA9IGhbMl07XG59XG5mdW5jdGlvbiBoc2xTdHJpbmcodikge1xuICBpZiAoIXYpIHtcbiAgICByZXR1cm47XG4gIH1cbiAgY29uc3QgYSA9IHJnYjJoc2wodik7XG4gIGNvbnN0IGggPSBhWzBdO1xuICBjb25zdCBzID0gbjJwKGFbMV0pO1xuICBjb25zdCBsID0gbjJwKGFbMl0pO1xuICByZXR1cm4gdi5hIDwgMjU1XG4gICAgPyBgaHNsYSgke2h9LCAke3N9JSwgJHtsfSUsICR7YjJuKHYuYSl9KWBcbiAgICA6IGBoc2woJHtofSwgJHtzfSUsICR7bH0lKWA7XG59XG5cbmNvbnN0IG1hcCA9IHtcblx0eDogJ2RhcmsnLFxuXHRaOiAnbGlnaHQnLFxuXHRZOiAncmUnLFxuXHRYOiAnYmx1Jyxcblx0VzogJ2dyJyxcblx0VjogJ21lZGl1bScsXG5cdFU6ICdzbGF0ZScsXG5cdEE6ICdlZScsXG5cdFQ6ICdvbCcsXG5cdFM6ICdvcicsXG5cdEI6ICdyYScsXG5cdEM6ICdsYXRlZycsXG5cdEQ6ICdpZ2h0cycsXG5cdFI6ICdpbicsXG5cdFE6ICd0dXJxdW9pcycsXG5cdEU6ICdoaScsXG5cdFA6ICdybycsXG5cdE86ICdhbCcsXG5cdE46ICdsZScsXG5cdE06ICdkZScsXG5cdEw6ICd5ZWxsbycsXG5cdEY6ICdlbicsXG5cdEs6ICdjaCcsXG5cdEc6ICdhcmtzJyxcblx0SDogJ2VhJyxcblx0STogJ2lnaHRnJyxcblx0SjogJ3doJ1xufTtcbmNvbnN0IG5hbWVzJDEgPSB7XG5cdE9pY2VYZTogJ2YwZjhmZicsXG5cdGFudGlxdWV3RXRlOiAnZmFlYmQ3Jyxcblx0YXF1YTogJ2ZmZmYnLFxuXHRhcXVhbWFyUmU6ICc3ZmZmZDQnLFxuXHRhenVZOiAnZjBmZmZmJyxcblx0YmVpZ2U6ICdmNWY1ZGMnLFxuXHRiaXNxdWU6ICdmZmU0YzQnLFxuXHRibGFjazogJzAnLFxuXHRibGFuS2VkT21vbmQ6ICdmZmViY2QnLFxuXHRYZTogJ2ZmJyxcblx0WGV2aVRldDogJzhhMmJlMicsXG5cdGJQd246ICdhNTJhMmEnLFxuXHRidXJseXdvb2Q6ICdkZWI4ODcnLFxuXHRjYU10WGU6ICc1ZjllYTAnLFxuXHRLYXJ0WXVzZTogJzdmZmYwMCcsXG5cdEtvY1RhdGU6ICdkMjY5MWUnLFxuXHRjU086ICdmZjdmNTAnLFxuXHRjU25mbG93ZXJYZTogJzY0OTVlZCcsXG5cdGNTbnNpbGs6ICdmZmY4ZGMnLFxuXHRjcmltc29uOiAnZGMxNDNjJyxcblx0Y3lhbjogJ2ZmZmYnLFxuXHR4WGU6ICc4YicsXG5cdHhjeWFuOiAnOGI4YicsXG5cdHhnVE1uUGQ6ICdiODg2MGInLFxuXHR4V2F5OiAnYTlhOWE5Jyxcblx0eGdZRjogJzY0MDAnLFxuXHR4Z1l5OiAnYTlhOWE5Jyxcblx0eGtoYWtpOiAnYmRiNzZiJyxcblx0eG1hZ0Z0YTogJzhiMDA4YicsXG5cdHhUaXZlZ1lGOiAnNTU2YjJmJyxcblx0eFNhbmdlOiAnZmY4YzAwJyxcblx0eFNjRWQ6ICc5OTMyY2MnLFxuXHR4WWQ6ICc4YjAwMDAnLFxuXHR4c09tb246ICdlOTk2N2EnLFxuXHR4c0hnWUY6ICc4ZmJjOGYnLFxuXHR4VVhlOiAnNDgzZDhiJyxcblx0eFVXYXk6ICcyZjRmNGYnLFxuXHR4VWdZeTogJzJmNGY0ZicsXG5cdHhRZTogJ2NlZDEnLFxuXHR4dmlUZXQ6ICc5NDAwZDMnLFxuXHRkQXBwUms6ICdmZjE0OTMnLFxuXHRkQXBza3lYZTogJ2JmZmYnLFxuXHRkaW1XYXk6ICc2OTY5NjknLFxuXHRkaW1nWXk6ICc2OTY5NjknLFxuXHRkb2RnZXJYZTogJzFlOTBmZicsXG5cdGZpWWJyaWNrOiAnYjIyMjIyJyxcblx0ZmxTT3dFdGU6ICdmZmZhZjAnLFxuXHRmb1lzdFdBbjogJzIyOGIyMicsXG5cdGZ1S3NpYTogJ2ZmMDBmZicsXG5cdGdhUnNiU286ICdkY2RjZGMnLFxuXHRnaG9zdHdFdGU6ICdmOGY4ZmYnLFxuXHRnVGQ6ICdmZmQ3MDAnLFxuXHRnVE1uUGQ6ICdkYWE1MjAnLFxuXHRXYXk6ICc4MDgwODAnLFxuXHRnWUY6ICc4MDAwJyxcblx0Z1lGTHc6ICdhZGZmMmYnLFxuXHRnWXk6ICc4MDgwODAnLFxuXHRob25leU13OiAnZjBmZmYwJyxcblx0aG90cFJrOiAnZmY2OWI0Jyxcblx0UmRpYW5ZZDogJ2NkNWM1YycsXG5cdFJkaWdvOiAnNGIwMDgyJyxcblx0aXZTeTogJ2ZmZmZmMCcsXG5cdGtoYWtpOiAnZjBlNjhjJyxcblx0bGF2Rk1yOiAnZTZlNmZhJyxcblx0bGF2Rk1yWHNoOiAnZmZmMGY1Jyxcblx0bGF3bmdZRjogJzdjZmMwMCcsXG5cdE5tb25jRWZmb246ICdmZmZhY2QnLFxuXHRaWGU6ICdhZGQ4ZTYnLFxuXHRaY1NPOiAnZjA4MDgwJyxcblx0WmN5YW46ICdlMGZmZmYnLFxuXHRaZ1RNblBkTHc6ICdmYWZhZDInLFxuXHRaV2F5OiAnZDNkM2QzJyxcblx0WmdZRjogJzkwZWU5MCcsXG5cdFpnWXk6ICdkM2QzZDMnLFxuXHRacFJrOiAnZmZiNmMxJyxcblx0WnNPbW9uOiAnZmZhMDdhJyxcblx0WnNIZ1lGOiAnMjBiMmFhJyxcblx0WnNreVhlOiAnODdjZWZhJyxcblx0WlVXYXk6ICc3Nzg4OTknLFxuXHRaVWdZeTogJzc3ODg5OScsXG5cdFpzdEFsWGU6ICdiMGM0ZGUnLFxuXHRaTHc6ICdmZmZmZTAnLFxuXHRsaW1lOiAnZmYwMCcsXG5cdGxpbWVnWUY6ICczMmNkMzInLFxuXHRsUkY6ICdmYWYwZTYnLFxuXHRtYWdGdGE6ICdmZjAwZmYnLFxuXHRtYVBvbjogJzgwMDAwMCcsXG5cdFZhcXVhbWFyUmU6ICc2NmNkYWEnLFxuXHRWWGU6ICdjZCcsXG5cdFZTY0VkOiAnYmE1NWQzJyxcblx0VnB1cnBOOiAnOTM3MGRiJyxcblx0VnNIZ1lGOiAnM2NiMzcxJyxcblx0VlVYZTogJzdiNjhlZScsXG5cdFZzcHJSZ2dZRjogJ2ZhOWEnLFxuXHRWUWU6ICc0OGQxY2MnLFxuXHRWdmlUZXRZZDogJ2M3MTU4NScsXG5cdG1pZG5pZ2h0WGU6ICcxOTE5NzAnLFxuXHRtUnRjWWFtOiAnZjVmZmZhJyxcblx0bWlzdHlQc2U6ICdmZmU0ZTEnLFxuXHRtb2NjYXNSOiAnZmZlNGI1Jyxcblx0bmF2YWpvd0V0ZTogJ2ZmZGVhZCcsXG5cdG5hdnk6ICc4MCcsXG5cdFRkbGFjZTogJ2ZkZjVlNicsXG5cdFRpdmU6ICc4MDgwMDAnLFxuXHRUaXZlZEJiOiAnNmI4ZTIzJyxcblx0U2FuZ2U6ICdmZmE1MDAnLFxuXHRTYW5nZVlkOiAnZmY0NTAwJyxcblx0U2NFZDogJ2RhNzBkNicsXG5cdHBPZWdUTW5QZDogJ2VlZThhYScsXG5cdHBPZWdZRjogJzk4ZmI5OCcsXG5cdHBPZVFlOiAnYWZlZWVlJyxcblx0cE9ldmlUZXRZZDogJ2RiNzA5MycsXG5cdHBhcGF5YXdFcDogJ2ZmZWZkNScsXG5cdHBIS3B1ZmY6ICdmZmRhYjknLFxuXHRwZXJ1OiAnY2Q4NTNmJyxcblx0cFJrOiAnZmZjMGNiJyxcblx0cGx1bTogJ2RkYTBkZCcsXG5cdHBvd01yWGU6ICdiMGUwZTYnLFxuXHRwdXJwTjogJzgwMDA4MCcsXG5cdFliZWNjYXB1cnBOOiAnNjYzMzk5Jyxcblx0WWQ6ICdmZjAwMDAnLFxuXHRQc3licm93bjogJ2JjOGY4ZicsXG5cdFB5T1hlOiAnNDE2OWUxJyxcblx0c2FkZE5iUHduOiAnOGI0NTEzJyxcblx0c09tb246ICdmYTgwNzInLFxuXHRzYW5keWJQd246ICdmNGE0NjAnLFxuXHRzSGdZRjogJzJlOGI1NycsXG5cdHNIc2hlbGw6ICdmZmY1ZWUnLFxuXHRzaUZuYTogJ2EwNTIyZCcsXG5cdHNpbHZlcjogJ2MwYzBjMCcsXG5cdHNreVhlOiAnODdjZWViJyxcblx0VVhlOiAnNmE1YWNkJyxcblx0VVdheTogJzcwODA5MCcsXG5cdFVnWXk6ICc3MDgwOTAnLFxuXHRzbm93OiAnZmZmYWZhJyxcblx0c3ByUmdnWUY6ICdmZjdmJyxcblx0c3RBbFhlOiAnNDY4MmI0Jyxcblx0dGFuOiAnZDJiNDhjJyxcblx0dGVPOiAnODA4MCcsXG5cdHRFc3ROOiAnZDhiZmQ4Jyxcblx0dG9tYXRvOiAnZmY2MzQ3Jyxcblx0UWU6ICc0MGUwZDAnLFxuXHR2aVRldDogJ2VlODJlZScsXG5cdEpIdDogJ2Y1ZGViMycsXG5cdHdFdGU6ICdmZmZmZmYnLFxuXHR3RXRlc21va2U6ICdmNWY1ZjUnLFxuXHRMdzogJ2ZmZmYwMCcsXG5cdEx3Z1lGOiAnOWFjZDMyJ1xufTtcbmZ1bmN0aW9uIHVucGFjaygpIHtcbiAgY29uc3QgdW5wYWNrZWQgPSB7fTtcbiAgY29uc3Qga2V5cyA9IE9iamVjdC5rZXlzKG5hbWVzJDEpO1xuICBjb25zdCB0a2V5cyA9IE9iamVjdC5rZXlzKG1hcCk7XG4gIGxldCBpLCBqLCBrLCBvaywgbms7XG4gIGZvciAoaSA9IDA7IGkgPCBrZXlzLmxlbmd0aDsgaSsrKSB7XG4gICAgb2sgPSBuayA9IGtleXNbaV07XG4gICAgZm9yIChqID0gMDsgaiA8IHRrZXlzLmxlbmd0aDsgaisrKSB7XG4gICAgICBrID0gdGtleXNbal07XG4gICAgICBuayA9IG5rLnJlcGxhY2UoaywgbWFwW2tdKTtcbiAgICB9XG4gICAgayA9IHBhcnNlSW50KG5hbWVzJDFbb2tdLCAxNik7XG4gICAgdW5wYWNrZWRbbmtdID0gW2sgPj4gMTYgJiAweEZGLCBrID4+IDggJiAweEZGLCBrICYgMHhGRl07XG4gIH1cbiAgcmV0dXJuIHVucGFja2VkO1xufVxuXG5sZXQgbmFtZXM7XG5mdW5jdGlvbiBuYW1lUGFyc2Uoc3RyKSB7XG4gIGlmICghbmFtZXMpIHtcbiAgICBuYW1lcyA9IHVucGFjaygpO1xuICAgIG5hbWVzLnRyYW5zcGFyZW50ID0gWzAsIDAsIDAsIDBdO1xuICB9XG4gIGNvbnN0IGEgPSBuYW1lc1tzdHIudG9Mb3dlckNhc2UoKV07XG4gIHJldHVybiBhICYmIHtcbiAgICByOiBhWzBdLFxuICAgIGc6IGFbMV0sXG4gICAgYjogYVsyXSxcbiAgICBhOiBhLmxlbmd0aCA9PT0gNCA/IGFbM10gOiAyNTVcbiAgfTtcbn1cblxuY29uc3QgUkdCX1JFID0gL15yZ2JhP1xcKFxccyooWy0rLlxcZF0rKSglKT9bXFxzLF0rKFstKy5lXFxkXSspKCUpP1tcXHMsXSsoWy0rLmVcXGRdKykoJSk/KD86W1xccywvXSsoWy0rLmVcXGRdKykoJSk/KT9cXHMqXFwpJC87XG5mdW5jdGlvbiByZ2JQYXJzZShzdHIpIHtcbiAgY29uc3QgbSA9IFJHQl9SRS5leGVjKHN0cik7XG4gIGxldCBhID0gMjU1O1xuICBsZXQgciwgZywgYjtcbiAgaWYgKCFtKSB7XG4gICAgcmV0dXJuO1xuICB9XG4gIGlmIChtWzddICE9PSByKSB7XG4gICAgY29uc3QgdiA9ICttWzddO1xuICAgIGEgPSBtWzhdID8gcDJiKHYpIDogbGltKHYgKiAyNTUsIDAsIDI1NSk7XG4gIH1cbiAgciA9ICttWzFdO1xuICBnID0gK21bM107XG4gIGIgPSArbVs1XTtcbiAgciA9IDI1NSAmIChtWzJdID8gcDJiKHIpIDogbGltKHIsIDAsIDI1NSkpO1xuICBnID0gMjU1ICYgKG1bNF0gPyBwMmIoZykgOiBsaW0oZywgMCwgMjU1KSk7XG4gIGIgPSAyNTUgJiAobVs2XSA/IHAyYihiKSA6IGxpbShiLCAwLCAyNTUpKTtcbiAgcmV0dXJuIHtcbiAgICByOiByLFxuICAgIGc6IGcsXG4gICAgYjogYixcbiAgICBhOiBhXG4gIH07XG59XG5mdW5jdGlvbiByZ2JTdHJpbmcodikge1xuICByZXR1cm4gdiAmJiAoXG4gICAgdi5hIDwgMjU1XG4gICAgICA/IGByZ2JhKCR7di5yfSwgJHt2Lmd9LCAke3YuYn0sICR7YjJuKHYuYSl9KWBcbiAgICAgIDogYHJnYigke3Yucn0sICR7di5nfSwgJHt2LmJ9KWBcbiAgKTtcbn1cblxuY29uc3QgdG8gPSB2ID0+IHYgPD0gMC4wMDMxMzA4ID8gdiAqIDEyLjkyIDogTWF0aC5wb3codiwgMS4wIC8gMi40KSAqIDEuMDU1IC0gMC4wNTU7XG5jb25zdCBmcm9tID0gdiA9PiB2IDw9IDAuMDQwNDUgPyB2IC8gMTIuOTIgOiBNYXRoLnBvdygodiArIDAuMDU1KSAvIDEuMDU1LCAyLjQpO1xuZnVuY3Rpb24gaW50ZXJwb2xhdGUocmdiMSwgcmdiMiwgdCkge1xuICBjb25zdCByID0gZnJvbShiMm4ocmdiMS5yKSk7XG4gIGNvbnN0IGcgPSBmcm9tKGIybihyZ2IxLmcpKTtcbiAgY29uc3QgYiA9IGZyb20oYjJuKHJnYjEuYikpO1xuICByZXR1cm4ge1xuICAgIHI6IG4yYih0byhyICsgdCAqIChmcm9tKGIybihyZ2IyLnIpKSAtIHIpKSksXG4gICAgZzogbjJiKHRvKGcgKyB0ICogKGZyb20oYjJuKHJnYjIuZykpIC0gZykpKSxcbiAgICBiOiBuMmIodG8oYiArIHQgKiAoZnJvbShiMm4ocmdiMi5iKSkgLSBiKSkpLFxuICAgIGE6IHJnYjEuYSArIHQgKiAocmdiMi5hIC0gcmdiMS5hKVxuICB9O1xufVxuXG5mdW5jdGlvbiBtb2RIU0wodiwgaSwgcmF0aW8pIHtcbiAgaWYgKHYpIHtcbiAgICBsZXQgdG1wID0gcmdiMmhzbCh2KTtcbiAgICB0bXBbaV0gPSBNYXRoLm1heCgwLCBNYXRoLm1pbih0bXBbaV0gKyB0bXBbaV0gKiByYXRpbywgaSA9PT0gMCA/IDM2MCA6IDEpKTtcbiAgICB0bXAgPSBoc2wycmdiKHRtcCk7XG4gICAgdi5yID0gdG1wWzBdO1xuICAgIHYuZyA9IHRtcFsxXTtcbiAgICB2LmIgPSB0bXBbMl07XG4gIH1cbn1cbmZ1bmN0aW9uIGNsb25lKHYsIHByb3RvKSB7XG4gIHJldHVybiB2ID8gT2JqZWN0LmFzc2lnbihwcm90byB8fCB7fSwgdikgOiB2O1xufVxuZnVuY3Rpb24gZnJvbU9iamVjdChpbnB1dCkge1xuICB2YXIgdiA9IHtyOiAwLCBnOiAwLCBiOiAwLCBhOiAyNTV9O1xuICBpZiAoQXJyYXkuaXNBcnJheShpbnB1dCkpIHtcbiAgICBpZiAoaW5wdXQubGVuZ3RoID49IDMpIHtcbiAgICAgIHYgPSB7cjogaW5wdXRbMF0sIGc6IGlucHV0WzFdLCBiOiBpbnB1dFsyXSwgYTogMjU1fTtcbiAgICAgIGlmIChpbnB1dC5sZW5ndGggPiAzKSB7XG4gICAgICAgIHYuYSA9IG4yYihpbnB1dFszXSk7XG4gICAgICB9XG4gICAgfVxuICB9IGVsc2Uge1xuICAgIHYgPSBjbG9uZShpbnB1dCwge3I6IDAsIGc6IDAsIGI6IDAsIGE6IDF9KTtcbiAgICB2LmEgPSBuMmIodi5hKTtcbiAgfVxuICByZXR1cm4gdjtcbn1cbmZ1bmN0aW9uIGZ1bmN0aW9uUGFyc2Uoc3RyKSB7XG4gIGlmIChzdHIuY2hhckF0KDApID09PSAncicpIHtcbiAgICByZXR1cm4gcmdiUGFyc2Uoc3RyKTtcbiAgfVxuICByZXR1cm4gaHVlUGFyc2Uoc3RyKTtcbn1cbmNsYXNzIENvbG9yIHtcbiAgY29uc3RydWN0b3IoaW5wdXQpIHtcbiAgICBpZiAoaW5wdXQgaW5zdGFuY2VvZiBDb2xvcikge1xuICAgICAgcmV0dXJuIGlucHV0O1xuICAgIH1cbiAgICBjb25zdCB0eXBlID0gdHlwZW9mIGlucHV0O1xuICAgIGxldCB2O1xuICAgIGlmICh0eXBlID09PSAnb2JqZWN0Jykge1xuICAgICAgdiA9IGZyb21PYmplY3QoaW5wdXQpO1xuICAgIH0gZWxzZSBpZiAodHlwZSA9PT0gJ3N0cmluZycpIHtcbiAgICAgIHYgPSBoZXhQYXJzZShpbnB1dCkgfHwgbmFtZVBhcnNlKGlucHV0KSB8fCBmdW5jdGlvblBhcnNlKGlucHV0KTtcbiAgICB9XG4gICAgdGhpcy5fcmdiID0gdjtcbiAgICB0aGlzLl92YWxpZCA9ICEhdjtcbiAgfVxuICBnZXQgdmFsaWQoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkO1xuICB9XG4gIGdldCByZ2IoKSB7XG4gICAgdmFyIHYgPSBjbG9uZSh0aGlzLl9yZ2IpO1xuICAgIGlmICh2KSB7XG4gICAgICB2LmEgPSBiMm4odi5hKTtcbiAgICB9XG4gICAgcmV0dXJuIHY7XG4gIH1cbiAgc2V0IHJnYihvYmopIHtcbiAgICB0aGlzLl9yZ2IgPSBmcm9tT2JqZWN0KG9iaik7XG4gIH1cbiAgcmdiU3RyaW5nKCkge1xuICAgIHJldHVybiB0aGlzLl92YWxpZCA/IHJnYlN0cmluZyh0aGlzLl9yZ2IpIDogdW5kZWZpbmVkO1xuICB9XG4gIGhleFN0cmluZygpIHtcbiAgICByZXR1cm4gdGhpcy5fdmFsaWQgPyBoZXhTdHJpbmcodGhpcy5fcmdiKSA6IHVuZGVmaW5lZDtcbiAgfVxuICBoc2xTdHJpbmcoKSB7XG4gICAgcmV0dXJuIHRoaXMuX3ZhbGlkID8gaHNsU3RyaW5nKHRoaXMuX3JnYikgOiB1bmRlZmluZWQ7XG4gIH1cbiAgbWl4KGNvbG9yLCB3ZWlnaHQpIHtcbiAgICBpZiAoY29sb3IpIHtcbiAgICAgIGNvbnN0IGMxID0gdGhpcy5yZ2I7XG4gICAgICBjb25zdCBjMiA9IGNvbG9yLnJnYjtcbiAgICAgIGxldCB3MjtcbiAgICAgIGNvbnN0IHAgPSB3ZWlnaHQgPT09IHcyID8gMC41IDogd2VpZ2h0O1xuICAgICAgY29uc3QgdyA9IDIgKiBwIC0gMTtcbiAgICAgIGNvbnN0IGEgPSBjMS5hIC0gYzIuYTtcbiAgICAgIGNvbnN0IHcxID0gKCh3ICogYSA9PT0gLTEgPyB3IDogKHcgKyBhKSAvICgxICsgdyAqIGEpKSArIDEpIC8gMi4wO1xuICAgICAgdzIgPSAxIC0gdzE7XG4gICAgICBjMS5yID0gMHhGRiAmIHcxICogYzEuciArIHcyICogYzIuciArIDAuNTtcbiAgICAgIGMxLmcgPSAweEZGICYgdzEgKiBjMS5nICsgdzIgKiBjMi5nICsgMC41O1xuICAgICAgYzEuYiA9IDB4RkYgJiB3MSAqIGMxLmIgKyB3MiAqIGMyLmIgKyAwLjU7XG4gICAgICBjMS5hID0gcCAqIGMxLmEgKyAoMSAtIHApICogYzIuYTtcbiAgICAgIHRoaXMucmdiID0gYzE7XG4gICAgfVxuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGludGVycG9sYXRlKGNvbG9yLCB0KSB7XG4gICAgaWYgKGNvbG9yKSB7XG4gICAgICB0aGlzLl9yZ2IgPSBpbnRlcnBvbGF0ZSh0aGlzLl9yZ2IsIGNvbG9yLl9yZ2IsIHQpO1xuICAgIH1cbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBjbG9uZSgpIHtcbiAgICByZXR1cm4gbmV3IENvbG9yKHRoaXMucmdiKTtcbiAgfVxuICBhbHBoYShhKSB7XG4gICAgdGhpcy5fcmdiLmEgPSBuMmIoYSk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgY2xlYXJlcihyYXRpbykge1xuICAgIGNvbnN0IHJnYiA9IHRoaXMuX3JnYjtcbiAgICByZ2IuYSAqPSAxIC0gcmF0aW87XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZ3JleXNjYWxlKCkge1xuICAgIGNvbnN0IHJnYiA9IHRoaXMuX3JnYjtcbiAgICBjb25zdCB2YWwgPSByb3VuZChyZ2IuciAqIDAuMyArIHJnYi5nICogMC41OSArIHJnYi5iICogMC4xMSk7XG4gICAgcmdiLnIgPSByZ2IuZyA9IHJnYi5iID0gdmFsO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG9wYXF1ZXIocmF0aW8pIHtcbiAgICBjb25zdCByZ2IgPSB0aGlzLl9yZ2I7XG4gICAgcmdiLmEgKj0gMSArIHJhdGlvO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIG5lZ2F0ZSgpIHtcbiAgICBjb25zdCB2ID0gdGhpcy5fcmdiO1xuICAgIHYuciA9IDI1NSAtIHYucjtcbiAgICB2LmcgPSAyNTUgLSB2Lmc7XG4gICAgdi5iID0gMjU1IC0gdi5iO1xuICAgIHJldHVybiB0aGlzO1xuICB9XG4gIGxpZ2h0ZW4ocmF0aW8pIHtcbiAgICBtb2RIU0wodGhpcy5fcmdiLCAyLCByYXRpbyk7XG4gICAgcmV0dXJuIHRoaXM7XG4gIH1cbiAgZGFya2VuKHJhdGlvKSB7XG4gICAgbW9kSFNMKHRoaXMuX3JnYiwgMiwgLXJhdGlvKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBzYXR1cmF0ZShyYXRpbykge1xuICAgIG1vZEhTTCh0aGlzLl9yZ2IsIDEsIHJhdGlvKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICBkZXNhdHVyYXRlKHJhdGlvKSB7XG4gICAgbW9kSFNMKHRoaXMuX3JnYiwgMSwgLXJhdGlvKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxuICByb3RhdGUoZGVnKSB7XG4gICAgcm90YXRlKHRoaXMuX3JnYiwgZGVnKTtcbiAgICByZXR1cm4gdGhpcztcbiAgfVxufVxuXG5mdW5jdGlvbiBpbmRleF9lc20oaW5wdXQpIHtcbiAgcmV0dXJuIG5ldyBDb2xvcihpbnB1dCk7XG59XG5cbmV4cG9ydCB7IENvbG9yLCBiMm4sIGIycCwgaW5kZXhfZXNtIGFzIGRlZmF1bHQsIGhleFBhcnNlLCBoZXhTdHJpbmcsIGhzbDJyZ2IsIGhzbFN0cmluZywgaHN2MnJnYiwgaHVlUGFyc2UsIGh3YjJyZ2IsIGxpbSwgbjJiLCBuMnAsIG5hbWVQYXJzZSwgcDJiLCByZ2IyaHNsLCByZ2JQYXJzZSwgcmdiU3RyaW5nLCByb3RhdGUsIHJvdW5kIH07XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQUE7QUFBQTtBQUFBO0FBQUE7QUFBQTtBQUFBO0FBTUEsU0FBUyxNQUFNLEdBQUc7QUFDaEIsU0FBTyxJQUFJLE1BQU07QUFDbkI7QUFDSyxNQUFDLE1BQU0sQ0FBQyxHQUFHLEdBQUcsTUFBTSxLQUFLLElBQUksS0FBSyxJQUFJLEdBQUcsQ0FBQyxHQUFHLENBQUM7QUFDbkQsU0FBUyxJQUFJLEdBQUc7QUFDZCxTQUFPLElBQUksTUFBTSxJQUFJLElBQUksR0FBRyxHQUFHLEdBQUc7QUFDcEM7QUFJQSxTQUFTLElBQUksR0FBRztBQUNkLFNBQU8sSUFBSSxNQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRztBQUNuQztBQUNBLFNBQVMsSUFBSSxHQUFHO0FBQ2QsU0FBTyxJQUFJLE1BQU0sSUFBSSxJQUFJLElBQUksS0FBSyxHQUFHLENBQUM7QUFDeEM7QUFDQSxTQUFTLElBQUksR0FBRztBQUNkLFNBQU8sSUFBSSxNQUFNLElBQUksR0FBRyxHQUFHLEdBQUcsR0FBRztBQUNuQztBQUVBLE1BQU0sUUFBUSxFQUFDLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLEdBQUcsR0FBRyxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsSUFBSSxHQUFHLElBQUksR0FBRyxJQUFJLEdBQUcsR0FBRTtBQUM3SixNQUFNLE1BQU0sQ0FBQyxHQUFHLGtCQUFrQjtBQUNsQyxNQUFNLEtBQUssT0FBSyxJQUFJLElBQUksRUFBRztBQUMzQixNQUFNLEtBQUssT0FBSyxLQUFLLElBQUksUUFBUyxDQUFDLElBQUksSUFBSSxJQUFJLEVBQUc7QUFDbEQs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TTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsY0FBYztBQUFBLEVBQ2QsSUFBSTtBQUFBLEVBQ0osU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLEVBQ1QsS0FBSztBQUFBLEVBQ0wsYUFBYTtBQUFBLEVBQ2IsU0FBUztBQUFBLEVBQ1QsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsVUFBVTtBQUFBLEVBQ1YsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsS0FBSztBQUFBLEVBQ0wsS0FBSztBQUFBLEVBQ0wsT0FBTztBQUFBLEVBQ1AsS0FBSztBQUFBLEVBQ0wsU0FBUztBQUFBLEVBQ1QsUUFBUTtBQUFBLEVBQ1IsU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sT0FBTztBQUFBLEVBQ1AsV0FBVztBQUFBLEVBQ1gsTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsS0FBSztBQUFBLEVBQ0wsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osS0FBSztBQUFBLEVBQ0wsT0FBTztBQUFBLEVBQ1AsUUFBUTtBQUFBLEVBQ1IsUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsS0FBSztBQUFBLEVBQ0wsVUFBVTtBQUFBLEVBQ1YsWUFBWTtBQUFBLEVBQ1osU0FBUztBQUFBLEVBQ1QsVUFBVTtBQUFBLEVBQ1YsU0FBUztBQUFBLEVBQ1QsWUFBWTtBQUFBLEVBQ1osTUFBTTtBQUFBLEVBQ04sUUFBUTtBQUFBLEVBQ1IsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sV0FBVztBQUFBLEVBQ1gsUUFBUTtBQUFBLEVBQ1IsT0FBTztBQUFBLEVBQ1AsWUFBWTtBQUFBLEVBQ1osV0FBVztBQUFBLEVBQ1gsU0FBUztBQUFBLEVBQ1QsTUFBTTtBQUFBLEVBQ04sS0FBSztBQUFBLEVBQ0wsTUFBTTtBQUFBLEVBQ04sU0FBUztBQUFBLEVBQ1QsT0FBTztBQUFBLEVBQ1AsYUFBYTtBQUFBLEVBQ2IsSUFBSTtBQUFBLEVBQ0osVUFBVTtBQUFBLEVBQ1YsT0FB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QUFLLEVBQUUsQ0FBQyxLQUFLLEVBQUUsQ0FBQyxLQUFLLElBQUksRUFBRSxDQUFDLENBQUMsTUFDeEMsT0FBTyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUMsS0FBSyxFQUFFLENBQUM7QUFFbEM7QUFFQSxNQUFNLEtBQUssT0FBSyxLQUFLLFdBQVksSUFBSSxRQUFRLEtBQUssSUFBSSxHQUFHLElBQU0sR0FBRyxJQUFJLFFBQVE7QUFDOUUsTUFBTSxPQUFPLE9BQUssS0FBSyxVQUFVLElBQUksUUFBUSxLQUFLLEtBQUssSUFBSSxTQUFTLE9BQU8sR0FBRztBQUM5RSxTQUFTLFlBQVksTUFBTSxNQUFNLEdBQUc7QUFDbEMsUUFBTSxJQUFJLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQztBQUMxQixRQUFNLElBQUksS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDO0FBQzFCLFFBQU0sSUFBSSxLQUFLLElBQUksS0FBSyxDQUFDLENBQUM7QUFDMUIsU0FBTztBQUFBLElBQ0wsR0FBRyxJQUFJLEdBQUcsSUFBSSxLQUFLLEtBQUssSUFBSSxLQUFLLENBQUMsQ0FBQyxJQUFJLEVBQUUsQ0FBQztBQUFBLElBQzFDLEdBQUcsSUFBSSxHQUFHLElBQUksS0FBSyxLQUFLLElBQUksS0FBSyxDQUFDLENBQUMsSUFBSSxFQUFFLENBQUM7QUFBQSxJQUMxQyxHQUFHLElBQUksR0FBRyxJQUFJLEtBQUssS0FBSyxJQUFJLEtBQUssQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO0FBQUEsSUFDMUMsR0FBRyxLQUFLLElBQUksS0FBSyxLQUFLLElBQUksS0FBSztBQUFBLEVBQ25DO0FBQ0E7QUFFQSxTQUFTLE9BQU8sR0FBRyxHQUFHLE9BQU87QUFDM0IsTUFBSSxHQUFHO0FBQ0wsUUFBSSxNQUFNLFFBQVEsQ0FBQztBQUNuQixRQUFJLENBQUMsSUFBSSxLQUFLLElBQUksR0FBRyxLQUFLLElBQUksSUFBSSxDQUFDLElBQUksSUFBSSxDQUFDLElBQUksT0FBTyxNQUFNLElBQUksTUFBTSxDQUFDLENBQUM7QUFDekUsVUFBTSxR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
