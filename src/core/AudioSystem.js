/**
 * ============================================================================
 * Lusion Modular Component: 06-audio-system
 * File: src/core/AudioSystem.js
 * Description: AudioGroup, AudioItem, GlobalAudios & Audios
 * Original Engine Lines: 29906 - 31238
 * ============================================================================
 */
const frameVert = `#define GLSLIFY 1
attribute vec3 position;varying vec2 v_uv;uniform vec2 u_viewportResolution;uniform vec2 u_domXY;uniform vec2 u_domWH;void main(){v_uv=position.xy*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,1.0);}`;
const frameFrag = `#define GLSLIFY 1
uniform vec3 u_bgColor;uniform vec2 u_aspect;uniform vec2 u_domWH;uniform float u_globalRadius;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){float mask=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius,1.0);gl_FragColor.rgb=u_bgColor;gl_FragColor.a=mask;}`;
(function () {
  function o() {
    for (var r = arguments.length, n = 0; n < r; n++) {
      var a = n < 0 || arguments.length <= n ? undefined : arguments[n];
      if (a.nodeType === 1 || a.nodeType === 11) {
        this.appendChild(a);
      } else {
        this.appendChild(document.createTextNode(String(a)));
      }
    }
  }
  function e() {
    while (this.lastChild) {
      this.removeChild(this.lastChild);
    }
    if (arguments.length) {
      this.append.apply(this, arguments);
    }
  }
  function t() {
    var r = this.parentNode;
    for (var n = arguments.length, a = new Array(n), l = 0; l < n; l++) {
      a[l] = arguments[l];
    }
    var c = a.length;
    if (r) {
      for (c || r.removeChild(this); c--;) {
        var u = a[c];
        if (typeof u != "object") {
          u = this.ownerDocument.createTextNode(u);
        } else if (u.parentNode) {
          u.parentNode.removeChild(u);
        }
        if (c) {
          r.insertBefore(this.previousSibling, u);
        } else {
          r.replaceChild(u, this);
        }
      }
    }
  }
  if (typeof Element !== "undefined") {
    if (!Element.prototype.append) {
      Element.prototype.append = o;
      DocumentFragment.prototype.append = o;
    }
    if (!Element.prototype.replaceChildren) {
      Element.prototype.replaceChildren = e;
      DocumentFragment.prototype.replaceChildren = e;
    }
    if (!Element.prototype.replaceWith) {
      Element.prototype.replaceWith = t;
      DocumentFragment.prototype.replaceWith = t;
    }
  }
})();
function _classCallCheck(o, e) {
  if (!(o instanceof e)) {
    throw new TypeError("Cannot call a class as a function");
  }
}
function _defineProperties(o, e) {
  for (var t = 0; t < e.length; t++) {
    var r = e[t];
    r.enumerable = r.enumerable || false;
    r.configurable = true;
    if ("value" in r) {
      r.writable = true;
    }
    Object.defineProperty(o, r.key, r);
  }
}
function _createClass(o, e, t) {
  if (e) {
    _defineProperties(o.prototype, e);
  }
  if (t) {
    _defineProperties(o, t);
  }
  return o;
}
function _defineProperty(o, e, t) {
  if (e in o) {
    Object.defineProperty(o, e, {
      value: t,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    o[e] = t;
  }
  return o;
}
function ownKeys(o, e) {
  var t = Object.keys(o);
  if (Object.getOwnPropertySymbols) {
    var r = Object.getOwnPropertySymbols(o);
    if (e) {
      r = r.filter(function (n) {
        return Object.getOwnPropertyDescriptor(o, n).enumerable;
      });
    }
    t.push.apply(t, r);
  }
  return t;
}
function _objectSpread2(o) {
  for (var e = 1; e < arguments.length; e++) {
    var t = arguments[e] ?? {};
    if (e % 2) {
      ownKeys(Object(t), true).forEach(function (r) {
        _defineProperty(o, r, t[r]);
      });
    } else if (Object.getOwnPropertyDescriptors) {
      Object.defineProperties(o, Object.getOwnPropertyDescriptors(t));
    } else {
      ownKeys(Object(t)).forEach(function (r) {
        Object.defineProperty(o, r, Object.getOwnPropertyDescriptor(t, r));
      });
    }
  }
  return o;
}
function _slicedToArray(o, e) {
  return _arrayWithHoles(o) || _iterableToArrayLimit(o, e) || _unsupportedIterableToArray(o, e) || _nonIterableRest();
}
function _toConsumableArray(o) {
  return _arrayWithoutHoles(o) || _iterableToArray(o) || _unsupportedIterableToArray(o) || _nonIterableSpread();
}
function _arrayWithoutHoles(o) {
  if (Array.isArray(o)) {
    return _arrayLikeToArray(o);
  }
}
function _arrayWithHoles(o) {
  if (Array.isArray(o)) {
    return o;
  }
}
function _iterableToArray(o) {
  if (typeof Symbol !== "undefined" && Symbol.iterator in Object(o)) {
    return Array.from(o);
  }
}
function _iterableToArrayLimit(o, e) {
  if (typeof Symbol !== "undefined" && !!(Symbol.iterator in Object(o))) {
    var t = [];
    var r = true;
    var n = false;
    var a = undefined;
    try {
      for (var l = o[Symbol.iterator](), c; !(r = (c = l.next()).done) && (t.push(c.value), !e || t.length !== e); r = true);
    } catch (u) {
      n = true;
      a = u;
    } finally {
      try {
        if (!r && l.return != null) {
          l.return();
        }
      } finally {
        if (n) {
          throw a;
        }
      }
    }
    return t;
  }
}
function _unsupportedIterableToArray(o, e) {
  if (o) {
    if (typeof o == "string") {
      return _arrayLikeToArray(o, e);
    }
    var t = Object.prototype.toString.call(o).slice(8, -1);
    if (t === "Object" && o.constructor) {
      t = o.constructor.name;
    }
    if (t === "Map" || t === "Set") {
      return Array.from(o);
    }
    if (t === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(t)) {
      return _arrayLikeToArray(o, e);
    }
  }
}
function _arrayLikeToArray(o, e) {
  if (e == null || e > o.length) {
    e = o.length;
  }
  for (var t = 0, r = new Array(e); t < e; t++) {
    r[t] = o[t];
  }
  return r;
}
function _nonIterableSpread() {
  throw new TypeError(`Invalid attempt to spread non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function _nonIterableRest() {
  throw new TypeError(`Invalid attempt to destructure non-iterable instance.
In order to be iterable, non-array objects must have a [Symbol.iterator]() method.`);
}
function extend(o, e) {
  return Object.getOwnPropertyNames(Object(o)).reduce(function (t, r) {
    var n = Object.getOwnPropertyDescriptor(Object(o), r);
    var a = Object.getOwnPropertyDescriptor(Object(e), r);
    return Object.defineProperty(t, r, a || n);
  }, {});
}
function isString(o) {
  return typeof o == "string";
}
function isArray(o) {
  return Array.isArray(o);
}
function parseSettings(o = {}) {
  var e = extend(o);
  var t;
  if (e.types !== undefined) {
    t = e.types;
  } else if (e.split !== undefined) {
    t = e.split;
  }
  if (t !== undefined) {
    e.types = (isString(t) || isArray(t) ? String(t) : "").split(",").map(function (r) {
      return String(r).trim();
    }).filter(function (r) {
      return /((line)|(word)|(char))/i.test(r);
    });
  }
  if (e.absolute || e.position) {
    e.absolute = e.absolute || /absolute/.test(o.position);
  }
  return e;
}
function parseTypes(o) {
  var e = isString(o) || isArray(o) ? String(o) : "";
  return {
    none: !e,
    lines: /line/i.test(e),
    words: /word/i.test(e),
    chars: /char/i.test(e)
  };
}
function isObject(o) {
  return o !== null && typeof o == "object";
}
function isNode$1(o) {
  return isObject(o) && /^(1|3|11)$/.test(o.nodeType);
}
function isLength(o) {
  return typeof o == "number" && o > -1 && o % 1 === 0;
}
function isArrayLike(o) {
  return isObject(o) && isLength(o.length);
}
function toArray(o) {
  if (isArray(o)) {
    return o;
  } else if (o == null) {
    return [];
  } else if (isArrayLike(o)) {
    return Array.prototype.slice.call(o);
  } else {
    return [o];
  }
}
function getTargetElements(o) {
  var e = o;
  if (isString(o)) {
    if (/^(#[a-z]\w+)$/.test(o.trim())) {
      e = document.getElementById(o.trim().slice(1));
    } else {
      e = document.querySelectorAll(o);
    }
  }
  return toArray(e).reduce(function (t, r) {
    return [].concat(_toConsumableArray(t), _toConsumableArray(toArray(r).filter(isNode$1)));
  }, []);
}
var entries = Object.entries;
var expando = "_splittype";
var cache = {};
var uid = 0;
function set(o, e, t) {
  if (!isObject(o)) {
    console.warn("[data.set] owner is not an object");
    return null;
  }
  var r = o[expando] ||= ++uid;
  var n = cache[r] ||= {};
  if (t === undefined) {
    if (e && Object.getPrototypeOf(e) === Object.prototype) {
      cache[r] = _objectSpread2(_objectSpread2({}, n), e);
    }
  } else if (e !== undefined) {
    n[e] = t;
  }
  return t;
}
function get(o, e) {
  var t = isObject(o) ? o[expando] : null;
  var r = t && cache[t] || {};
  return r;
}
function remove(o) {
  var e = o && o[expando];
  if (e) {
    delete o[e];
    delete cache[e];
  }
}
function clear() {
  Object.keys(cache).forEach(function (o) {
    delete cache[o];
  });
}
function cleanup() {
  entries(cache).forEach(function (o) {
    var e = _slicedToArray(o, 2);
    var t = e[0];
    var r = e[1];
    var n = r.isRoot;
    var a = r.isSplit;
    if (!n || !a) {
      cache[t] = null;
      delete cache[t];
    }
  });
}
function toWords(o, e = " ") {
  var t = o ? String(o) : "";
  return t.trim().replace(/\s+/g, " ").split(e);
}
var rsAstralRange = "\\ud800-\\udfff";
var rsComboMarksRange = "\\u0300-\\u036f\\ufe20-\\ufe23";
var rsComboSymbolsRange = "\\u20d0-\\u20f0";
var rsVarRange = "\\ufe0e\\ufe0f";
var rsAstral = `[${rsAstralRange}]`;
var rsCombo = `[${rsComboMarksRange}${rsComboSymbolsRange}]`;
var rsFitz = "\\ud83c[\\udffb-\\udfff]";
var rsModifier = `(?:${rsCombo}|${rsFitz})`;
var rsNonAstral = `[^${rsAstralRange}]`;
var rsRegional = "(?:\\ud83c[\\udde6-\\uddff]){2}";
var rsSurrPair = "[\\ud800-\\udbff][\\udc00-\\udfff]";
var rsZWJ = "\\u200d";
var reOptMod = `${rsModifier}?`;
var rsOptVar = `[${rsVarRange}]?`;
var rsOptJoin = "(?:" + rsZWJ + "(?:" + [rsNonAstral, rsRegional, rsSurrPair].join("|") + ")" + rsOptVar + reOptMod + ")*";
var rsSeq = rsOptVar + reOptMod + rsOptJoin;
var rsSymbol = `(?:${[`${rsNonAstral}${rsCombo}?`, rsCombo, rsRegional, rsSurrPair, rsAstral].join("|")}
)`;
var reUnicode = RegExp(`${rsFitz}(?=${rsFitz})|${rsSymbol}${rsSeq}`, "g");
var unicodeRange = [rsZWJ, rsAstralRange, rsComboMarksRange, rsComboSymbolsRange, rsVarRange];
var reHasUnicode = RegExp(`[${unicodeRange.join("")}]`);
function asciiToArray(o) {
  return o.split("");
}
function hasUnicode(o) {
  return reHasUnicode.test(o);
}
function unicodeToArray(o) {
  return o.match(reUnicode) || [];
}
function stringToArray(o) {
  if (hasUnicode(o)) {
    return unicodeToArray(o);
  } else {
    return asciiToArray(o);
  }
}
function toString(o) {
  if (o == null) {
    return "";
  } else {
    return String(o);
  }
}
function toChars(o, e = "") {
  o = toString(o);
  if (o && isString(o) && !e && hasUnicode(o)) {
    return stringToArray(o);
  } else {
    return o.split(e);
  }
}
function createElement(o, e) {
  var t = document.createElement(o);
  if (e) {
    Object.keys(e).forEach(function (r) {
      var n = e[r];
      var a = isString(n) ? n.trim() : n;
      if (a !== null && a !== "") {
        if (r === "children") {
          t.append.apply(t, _toConsumableArray(toArray(a)));
        } else {
          t.setAttribute(r, a);
        }
      }
    });
  }
  return t;
}
var defaults = {
  splitClass: "",
  lineClass: "line",
  wordClass: "word",
  charClass: "char",
  types: ["lines", "words", "chars"],
  absolute: false,
  tagName: "div"
};
function splitWordsAndChars(o, e) {
  e = extend(defaults, e);
  var t = parseTypes(e.types);
  var r = e.tagName;
  var n = o.nodeValue;
  var a = document.createDocumentFragment();
  var l = [];
  var c = [];
  if (/^\s/.test(n)) {
    a.append(" ");
  }
  l = toWords(n).reduce(function (u, f, p, g) {
    var v;
    var _;
    if (t.chars) {
      _ = toChars(f).map(function (T) {
        var M = createElement(r, {
          class: `${e.splitClass} ${e.charClass}`,
          style: "display: inline-block;",
          children: T
        });
        set(M, "isChar", true);
        c = [].concat(_toConsumableArray(c), [M]);
        return M;
      });
    }
    if (t.words || t.lines) {
      v = createElement(r, {
        class: `${e.wordClass} ${e.splitClass}`,
        style: `display: inline-block; ${t.words && e.absolute ? "position: relative;" : ""}`,
        children: t.chars ? _ : f
      });
      set(v, {
        isWord: true,
        isWordStart: true,
        isWordEnd: true
      });
      a.appendChild(v);
    } else {
      _.forEach(function (T) {
        a.appendChild(T);
      });
    }
    if (p < g.length - 1) {
      a.append(" ");
    }
    if (t.words) {
      return u.concat(v);
    } else {
      return u;
    }
  }, []);
  if (/\s$/.test(n)) {
    a.append(" ");
  }
  o.replaceWith(a);
  return {
    words: l,
    chars: c
  };
}
function split(o, e) {
  var t = o.nodeType;
  var r = {
    words: [],
    chars: []
  };
  if (!/(1|3|11)/.test(t)) {
    return r;
  }
  if (t === 3 && /\S/.test(o.nodeValue)) {
    return splitWordsAndChars(o, e);
  }
  var n = toArray(o.childNodes);
  if (n.length && (set(o, "isSplit", true), !get(o).isRoot)) {
    o.style.display = "inline-block";
    o.style.position = "relative";
    var a = o.nextSibling;
    var l = o.previousSibling;
    var c = o.textContent || "";
    var u = a ? a.textContent : " ";
    var f = l ? l.textContent : " ";
    set(o, {
      isWordEnd: /\s$/.test(c) || /^\s/.test(u),
      isWordStart: /^\s/.test(c) || /\s$/.test(f)
    });
  }
  return n.reduce(function (p, g) {
    var v = split(g, e);
    var _ = v.words;
    var T = v.chars;
    return {
      words: [].concat(_toConsumableArray(p.words), _toConsumableArray(_)),
      chars: [].concat(_toConsumableArray(p.chars), _toConsumableArray(T))
    };
  }, r);
}
function getPosition(o, e, t, r) {
  if (!t.absolute) {
    return {
      top: e ? o.offsetTop : null
    };
  }
  var n = o.offsetParent;
  var a = _slicedToArray(r, 2);
  var l = a[0];
  var c = a[1];
  var u = 0;
  var f = 0;
  if (n && n !== document.body) {
    var p = n.getBoundingClientRect();
    u = p.x + l;
    f = p.y + c;
  }
  var g = o.getBoundingClientRect();
  var v = g.width;
  var _ = g.height;
  var T = g.x;
  var M = g.y;
  var S = M + c - f;
  var b = T + l - u;
  return {
    width: v,
    height: _,
    top: S,
    left: b
  };
}
function unSplitWords(o) {
  if (get(o).isWord) {
    remove(o);
    o.replaceWith.apply(o, _toConsumableArray(o.childNodes));
  } else {
    toArray(o.children).forEach(function (e) {
      return unSplitWords(e);
    });
  }
}
var createFragment = function o() {
  return document.createDocumentFragment();
};
function repositionAfterSplit(o, e, t) {
  var r = parseTypes(e.types);
  var n = e.tagName;
  var a = o.getElementsByTagName("*");
  var l = [];
  var c = [];
  var u = null;
  var f;
  var p;
  var g;
  var v = [];
  var _ = o.parentElement;
  var T = o.nextElementSibling;
  var M = createFragment();
  var S = window.getComputedStyle(o);
  var b = S.textAlign;
  var C = parseFloat(S.fontSize);
  var w = C * 0.2;
  if (e.absolute) {
    g = {
      left: o.offsetLeft,
      top: o.offsetTop,
      width: o.offsetWidth
    };
    p = o.offsetWidth;
    f = o.offsetHeight;
    set(o, {
      cssWidth: o.style.width,
      cssHeight: o.style.height
    });
  }
  toArray(a).forEach(function (R) {
    var E = R.parentElement === o;
    var I = getPosition(R, E, e, t);
    var F = I.width;
    var k = I.height;
    var L = I.top;
    var D = I.left;
    if (!/^br$/i.test(R.nodeName)) {
      if (r.lines && E) {
        if (u === null || L - u >= w) {
          u = L;
          l.push(c = []);
        }
        c.push(R);
      }
      if (e.absolute) {
        set(R, {
          top: L,
          left: D,
          width: F,
          height: k
        });
      }
    }
  });
  if (_) {
    _.removeChild(o);
  }
  if (r.lines) {
    v = l.map(function (R) {
      var E = createElement(n, {
        class: `${e.splitClass} ${e.lineClass}`,
        style: `display: block; text-align: ${b}; width: 100%;`
      });
      set(E, "isLine", true);
      var I = {
        height: 0,
        top: 10000
      };
      M.appendChild(E);
      R.forEach(function (F, k, L) {
        var D = get(F);
        var ne = D.isWordEnd;
        var re = D.top;
        var ce = D.height;
        var z = L[k + 1];
        I.height = Math.max(I.height, ce);
        I.top = Math.min(I.top, re);
        E.appendChild(F);
        if (ne && get(z).isWordStart) {
          E.append(" ");
        }
      });
      if (e.absolute) {
        set(E, {
          height: I.height,
          top: I.top
        });
      }
      return E;
    });
    if (!r.words) {
      unSplitWords(M);
    }
    o.replaceChildren(M);
  }
  if (e.absolute) {
    o.style.width = `${o.style.width || p}px`;
    o.style.height = `${f}px`;
    toArray(a).forEach(function (R) {
      var E = get(R);
      var I = E.isLine;
      var F = E.top;
      var k = E.left;
      var L = E.width;
      var D = E.height;
      var ne = get(R.parentElement);
      var re = !I && ne.isLine;
      R.style.top = `${re ? F - ne.top : F}px`;
      R.style.left = I ? `${g.left}px` : `${k - (re ? g.left : 0)}px`;
      R.style.height = `${D}px`;
      R.style.width = I ? `${g.width}px` : `${L}px`;
      R.style.position = "absolute";
    });
  }
  if (_) {
    if (T) {
      _.insertBefore(o, T);
    } else {
      _.appendChild(o);
    }
  }
  return v;
}
var _defaults = extend(defaults, {});
var SplitType = function () {
  _createClass(o, null, [{
    key: "clearData",
    value: function () {
      clear();
    }
  }, {
    key: "setDefaults",
    value: function (t) {
      _defaults = extend(_defaults, parseSettings(t));
      return defaults;
    }
  }, {
    key: "revert",
    value: function (t) {
      getTargetElements(t).forEach(function (r) {
        var n = get(r);
        var a = n.isSplit;
        var l = n.html;
        var c = n.cssWidth;
        var u = n.cssHeight;
        if (a) {
          r.innerHTML = l;
          r.style.width = c || "";
          r.style.height = u || "";
          remove(r);
        }
      });
    }
  }, {
    key: "create",
    value: function (t, r) {
      return new o(t, r);
    }
  }, {
    key: "data",
    get: function () {
      return cache;
    }
  }, {
    key: "defaults",
    get: function () {
      return _defaults;
    },
    set: function (t) {
      _defaults = extend(_defaults, parseSettings(t));
    }
  }]);
  function o(e, t) {
    _classCallCheck(this, o);
    this.isSplit = false;
    this.settings = extend(_defaults, parseSettings(t));
    this.elements = getTargetElements(e);
    this.split();
  }
  _createClass(o, [{
    key: "split",
    value: function (t) {
      var r = this;
      this.revert();
      this.elements.forEach(function (l) {
        set(l, "html", l.innerHTML);
      });
      this.lines = [];
      this.words = [];
      this.chars = [];
      var n = [window.pageXOffset, window.pageYOffset];
      if (t !== undefined) {
        this.settings = extend(this.settings, parseSettings(t));
      }
      var a = parseTypes(this.settings.types);
      if (!a.none) {
        this.elements.forEach(function (l) {
          set(l, "isRoot", true);
          var c = split(l, r.settings);
          var u = c.words;
          var f = c.chars;
          r.words = [].concat(_toConsumableArray(r.words), _toConsumableArray(u));
          r.chars = [].concat(_toConsumableArray(r.chars), _toConsumableArray(f));
        });
        this.elements.forEach(function (l) {
          if (a.lines || r.settings.absolute) {
            var c = repositionAfterSplit(l, r.settings, n);
            r.lines = [].concat(_toConsumableArray(r.lines), _toConsumableArray(c));
          }
        });
        this.isSplit = true;
        window.scrollTo(n[0], n[1]);
        cleanup();
      }
    }
  }, {
    key: "revert",
    value: function () {
      if (this.isSplit) {
        this.lines = null;
        this.words = null;
        this.chars = null;
        this.isSplit = false;
      }
      o.revert(this.elements);
    }
  }]);
  return o;
}();
const AUDIO_DATA = {
  ui: [{
    id: "hover_[3]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }, {
    id: "click_[2]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }, {
    id: "focus_[3]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 0.4
  }, {
    id: "glass_broken",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }, {
    id: "page_[2]",
    ext: ".ogg",
    isLoopable: false,
    isPositional: false,
    isPreload: true,
    isElem: false,
    isSfx: true,
    volume: 1
  }],
  music: [{
    id: "generic",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: false,
    isSfx: false,
    volume: 1
  }, {
    id: "cinematic_0",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: true,
    isSfx: false,
    volume: 1
  }, {
    id: "cinematic_2",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: true,
    isSfx: false,
    volume: 1
  }, {
    id: "cinematic_3",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: true,
    isSfx: false,
    volume: 1
  }, {
    id: "generic_end",
    ext: ".ogg",
    isLoopable: true,
    isPositional: false,
    isPreload: false,
    isElem: true,
    needsFilter: false,
    isSfx: false,
    volume: 1
  }]
};
class AudioGroup {
  id = "";
  children = [];
  volume = 1;
  init(e) {
    Object.assign(this, e);
  }
  update(e) {
    e *= this.volume;
    this.children.forEach(t => {
      t.setFinalVolume(e);
    });
  }
  add(e) {
    if (!this.children.includes(e)) {
      this.children.push(e);
    }
  }
  remove(e) {
    if (this.children.includes(e)) {
      this.children.splice(this.children.indexOf(e), 1);
    }
  }
  play() {
    this.children.forEach(e => e.play());
  }
  stop() {
    this.children.forEach(e => e.stop());
  }
}
const LOW_PASS_FREQ = 300;
const MAX_FREQ = 22050;
class AudioItem {
  autoplay = false;
  elem = null;
  id = "";
  url = "";
  fileSize = 100;
  isMutable = false;
  isPositional = false;
  isLoopable = false;
  isPreload = true;
  onInitialized = new MinSignal$2();
  onEnded = new MinSignal$2();
  onPlayed = new MinSignal$2();
  volume = 1;
  audioObject = null;
  hasInitialized = false;
  container = null;
  refDistance = 1;
  _buffer = null;
  _originalOnEnd = null;
  needsFilter = false;
  fadeTime = 0;
  fadeDuration = 1;
  isFadingIn = false;
  isFadingOut = false;
  isSfx = false;
  preInit(e) {
    Object.assign(this, e);
    if (this.isPositional) {
      this.container = new Object3D();
    }
  }
  init(e) {
    if (this.hasInitialized !== true) {
      this.hasInitialized = true;
      this.audioObject = this.isPositional ? new PositionalAudio(e) : new Audio$1(e);
      if (this.isPositional) {
        this.container.add(this.audioObject);
      }
      this._originalOnEnd = this.audioObject.onEnded.bind(this.audioObject);
      this.audioObject.onEnded = this.onEnd.bind(this);
      if (this.isPositional) {
        this.setRefDistance(this.refDistance);
      }
      if (this.isElem && !this.elem) {
        this.elem = document.createElement("audio");
        if (settings.LOCAL_AUDIO_PATH !== settings.AUDIO_PATH) {
          this.elem.crossOrigin = "anonymous";
        }
        this.elem.src = this.url;
      }
      if (this.needsFilter) {
        const t = this.audioObject.context;
        this.biquadFilter = t.createBiquadFilter();
        this.biquadFilter.type = "lowpass";
        this.biquadFilter.frequency.value = MAX_FREQ;
        this.audioObject.setFilter(this.biquadFilter);
      }
      if (this.elem) {
        this.elem.loop = this.isLoopable;
        this.audioObject.setMediaElementSource(this.elem);
        this.elem.addEventListener("ended", this.onEnd.bind(this));
        if (this.autoplay) {
          this.play();
        }
      } else {
        this.audioObject.setLoop(this.isLoopable);
        if (this._buffer) {
          this.decodeAudioData();
        }
      }
      this.onInitialized.dispatch(this);
    }
  }
  load(e) {
    if (this.elem) {
      this.elem.src = this.url;
    } else {
      const t = this.isPreload ? "add" : "load";
      properties.loader[t](this.url, {
        weight: this.fileSize,
        type: "xhr",
        responseType: "arraybuffer",
        hasLoading: true,
        onLoad: r => {
          this._buffer = r;
          if (this.hasInitialized) {
            this.decodeAudioData();
          }
          if (e) {
            e();
          }
        }
      });
    }
  }
  setFinalVolume(e) {
    this.audioObject?.setVolume(e * this.volume);
  }
  activateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(LOW_PASS_FREQ, e.currentTime + 0.5);
    }
  }
  deactivateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(MAX_FREQ, e.currentTime + 0.5);
    }
  }
  setFilterFrequency(e = MAX_FREQ) {
    if (this.needsFilter && this.biquadFilter) {
      this.audioObject.context;
      this.biquadFilter.frequency.value = e;
    }
  }
  setFilterFrequencyViaRatio(e = 1) {
    this.setFilterFrequency(math.fit(e, 0, 1, MAX_FREQ, LOW_PASS_FREQ, ease.expoOut));
  }
  setPositionObjectParent(e) {
    if (this.hasInitialized) {
      if (e) {
        e.add(this.audioObject);
      } else if (this.audioObject.parent) {
        this.audioObject.parent.remove(this.audioObject);
      }
    } else {
      this.positionObjectParent = e;
    }
  }
  decodeAudioData() {
    const e = this._buffer.slice(0);
    AudioContext.getContext().decodeAudioData(e, r => {
      this.audioObject.setBuffer(r);
      if (this.autoplay) {
        this.play();
      }
    });
  }
  onEnd() {
    if (this._originalOnEnd) {
      this._originalOnEnd();
    }
    this.onEnded.dispatch(this);
  }
  play() {
    if (!this.isSfx) {
      this.autoplay = true;
    }
    if (this.audioObject && !this.audioObject.isPlaying) {
      if (this.elem) {
        this.elem.play();
        this.elem.currentTime = 0.01;
        this.audioObject.isPlaying = true;
      } else {
        this.audioObject.play();
      }
      this.onPlayed.dispatch(this);
    }
  }
  stop() {
    this.autoplay = false;
    if (this.audioObject && this.audioObject.isPlaying) {
      if (this.elem) {
        this.elem.pause();
        this.audioObject.isPlaying = false;
      } else {
        this.audioObject.stop();
      }
      this.onEnded.dispatch(this);
    }
  }
  setRefDistance(e) {
    this.refDistance = e;
    if (this.isPositional && this.audioObject) {
      this.audioObject.setRefDistance(this.refDistance);
    }
  }
  setFadeIn(e = 1) {
    this.fadeTime = 0;
    this.fadeDuration = e;
    this.isFadingIn = true;
    this.isFadingOut = false;
    this.play();
  }
  setFadeOut(e = 1) {
    this.fadeTime = e;
    this.fadeDuration = e;
    this.isFadingIn = false;
    this.isFadingOut = true;
  }
  update(e) {
    if (!this.isFadingOut && !this.isFadingIn) {
      return;
    }
    if (this.isFadingOut) {
      this.fadeTime -= e;
    }
    if (this.isFadingIn) {
      this.fadeTime += e;
    }
    const t = math.saturate(this.fadeTime / this.fadeDuration);
    this.volume = t;
    if (this.isFadingOut && t === 0) {
      this.stop();
      this.isFadingOut = false;
    }
    if (this.isFadingIn && t === 1) {
      this.isFadingIn = false;
    }
  }
}
class GlobalAudios {
  hasInit = false;
  constructor() {}
  init() {
    this.domRightTalkBtn = document.getElementById("header-right-talk-btn");
    this.domRightSoundBtn = document.getElementById("header-right-sound-btn");
    this.domRightMenuBtn = document.getElementById("header-right-menu-btn");
    this.domHeaderProjectBack = document.getElementById("header-center-project-back-btn");
    this.domMenuLabLink = document.getElementById("header-menu-labs");
    this.domEndSectionTitleLink = document.getElementById("end-section-title-link");
    this.domFooterBottomUp = document.getElementById("footer-bottom-up");
    this.domFooterEnquiresLink = document.getElementById("footer-enquires-link");
    this.domFooterBusinessLink = document.getElementById("footer-business-link");
    this.domFooterBottomLabs = document.getElementById("footer-bottom-labs");
    this.domMenuLinks = Array.from(document.querySelectorAll("#header-menu-links .header-menu-link"));
    this.domFooterSocialsLinks = Array.from(document.querySelectorAll(".footer-socials-line-wrapper"));
    audios.addHoverClickEvents(this.domRightTalkBtn);
    audios.addHoverClickEvents(this.domRightSoundBtn);
    audios.addHoverClickEvents(this.domRightMenuBtn);
    audios.addHoverClickEvents(this.domHeaderProjectBack);
    audios.addHoverClickEvents(this.domMenuLabLink);
    audios.addHoverClickEvents(this.domEndSectionTitleLink);
    audios.addHoverClickEvents(this.domFooterBottomUp);
    audios.addHoverClickEvents(this.domFooterEnquiresLink);
    audios.addHoverClickEvents(this.domFooterBusinessLink);
    audios.addHoverClickEvents(this.domFooterBottomLabs);
    this.domMenuLinks.forEach(e => audios.addHoverClickEvents(e));
    this.domFooterSocialsLinks.forEach(e => audios.addHoverClickEvents(e));
    this.hasInit = true;
  }
  update() {}
}
const globalAudios = new GlobalAudios();
let SKIP_AUDIO = !settings.USE_AUDIO;
class Audios {
  groups = {};
  items = {};
  isActive = true;
  volume = 0;
  listener = null;
  _boundOnBodyClick = null;
  _onBodyClicked = new MinSignal$2();
  _onRolloverCount = -1;
  _onClickCount = -1;
  _onFocusCount = -1;
  prevBgMusicId = null;
  currBgMusicId = null;
  wasActive = false;
  _counts = {};
  _maxes = {};
  preInit() {
    if (!SKIP_AUDIO) {
      this._boundOnBodyClick = () => this._onBodyClick();
      input.onDowned.add(this._boundOnBodyClick);
      for (let e in AUDIO_DATA) {
        let t = new AudioGroup();
        let r = AUDIO_DATA[e];
        t.init({
          id: e,
          volume: 1
        });
        this.groups[e] = t;
        let n = r.length;
        while (n--) {
          let a = r[n];
          let l = this._parseCountText(a.id);
          let c = l.text;
          if (l.count > 0) {
            for (let u = 1; u < l.count; u++) {
              let f = Object.assign({}, a);
              f.id = l.text + "_" + u;
              r.push(f);
            }
            this._counts[c] = -1;
            this._maxes[c] = l.count;
            a.id = l.text + "_0";
          }
        }
        r.forEach(a => {
          let l = new AudioItem();
          let c = a.id;
          let u = c + a.ext;
          a.url = settings.AUDIO_PATH + u;
          l.preInit(a);
          l.load(() => {});
          this.items[c] = l;
          this.groups[e].add(l);
        });
      }
    }
  }
  _parseCountText(e) {
    let t = 0;
    e.replace(/(.+)_\[(\d)\]/, (r, n, a, l) => {
      e = n;
      t = parseInt(a, 10);
    });
    return {
      text: e,
      count: t
    };
  }
  init() {
    if (!SKIP_AUDIO) {
      this.getListener(e => {
        for (let t in this.items) {
          this.items[t].init(e);
        }
      });
      globalAudios.init();
    }
  }
  on() {
    this.isActive = true;
  }
  off() {
    this.isActive = false;
  }
  toggle() {
    this.isActive = !this.isActive;
  }
  pause() {
    this.wasActive = this.isActive;
  }
  resume() {}
  getListener(e) {
    if (!SKIP_AUDIO) {
      if (this.listener) {
        e(this.listener);
      } else {
        this._onBodyClicked.add(e);
      }
    }
  }
  _onBodyClick() {
    if (!SKIP_AUDIO) {
      input.onDowned.remove(this._boundOnBodyClick);
      this.listener = new AudioListener();
      this._onBodyClicked.dispatch(this.listener);
      properties.camera.add(this.listener);
    }
  }
  addHoverClickEvents(e) {
    if (!SKIP_AUDIO) {
      this.addHoverEvent(e);
      this.addClickEvent(e);
    }
  }
  addHoverEvent(e, t = "hover") {
    if (!SKIP_AUDIO) {
      e.addEventListener("mouseenter", () => {
        this.countPlay(t);
      });
    }
  }
  addClickEvent(e, t = "click") {
    if (!SKIP_AUDIO) {
      input.onClicked.add(() => {
        if (input.hasThroughElem(e, t)) {
          this.countPlay(t);
        }
      });
    }
  }
  countPlay(e) {
    if (SKIP_AUDIO) {
      return;
    }
    let t = this._counts[e];
    let r = this._maxes[e];
    t = this._counts[e] = (t + 1) % r;
    this.items[e + "_" + t].play();
  }
  fadeBgMusic(e, t = 1, r = undefined) {
    if (!SKIP_AUDIO) {
      if (this.currBgMusicId !== e) {
        this.prevBgMusicId = this.currBgMusicId;
        this.currBgMusicId = e;
        if (r === undefined) {
          r = t;
        }
        this.items[this.prevBgMusicId]?.setFadeOut(r);
        this.items[this.currBgMusicId]?.setFadeIn(t);
      }
    }
  }
  update(e) {
    if (!SKIP_AUDIO && (globalAudios.update(e), this.listener)) {
      this.volume = math.saturate(this.volume + (this.isActive ? 1 : -1) * e);
      for (let t in this.items) {
        this.items[t].update(e);
      }
      for (let t in this.groups) {
        this.groups[t].update(this.volume);
      }
    }
  }
}
const audios = new Audios();
