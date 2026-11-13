/**
 * ============================================================================
 * Lusion Modular Component: 02-settings-properties
 * File: src/core/SettingsAndProperties.js
 * Description: Browser Detection, Settings, Properties, QuickLoader, Howler & SplitType
 * Original Engine Lines: 25771 - 27257
 * ============================================================================
 */
class Browser {
  isMobile = detectUA.isMobile || detectUA.isTablet;
  isDesktop = detectUA.isDesktop;
  device = this.isMobile ? "mobile" : "desktop";
  isAndroid = !!detectUA.isAndroid;
  isIOS = !!detectUA.isiOS;
  isMacOS = !!detectUA.isMacOS;
  isWindows = detectUA.isWindows.version !== null;
  isLinux = userAgent.indexOf("linux") != -1;
  ua = userAgent;
  isEdge = browserName === "Microsoft Edge";
  isIE = browserName === "Internet Explorer";
  isFirefox = browserName === "Firefox";
  isChrome = browserName === "Chrome";
  isOpera = browserName === "Opera";
  isSafari = browserName === "Safari";
  isSupportMSAA = !userAgent.match("version/15.4 ");
  isSupportOgg = !!audioElem.canPlayType("audio/ogg");
  isRetina = window.devicePixelRatio && window.devicePixelRatio >= 1.5;
  devicePixelRatio = window.devicePixelRatio || 1;
  cpuCoreCount = navigator.hardwareConcurrency || 1;
  baseUrl = document.location.origin;
  isIFrame = window.self !== window.top;
  constructor() {}
}
const browser$1 = new Browser();
let CDN_PATH = "";
if (window.location.hostname == "lusion.co") {
  CDN_PATH = "https://lusion.dev";
}
if (window.location.hostname == "lusion.dev") {
  window.location.href = "" + window.location.pathname + window.location.search;
}
const BASE_PATH = function () {
  if (typeof window === "undefined") {
    return "";
  }
  const b = document.querySelector("base");
  const bh = b ? b.getAttribute("href") : "";
  if (bh && bh !== "/") {
    return bh.replace(/\/+$/, "");
  }
  const p = window.location.pathname;
  if (window.location.hostname.endsWith("github.io") || p.startsWith("/lusion.co")) {
    const m = p.match(/^\/([^/]+)/);
    if (m) {
      return "/" + m[1];
    }
  }
  return "";
}();
class Settings {
  CDN_PATH = "";
  TEAM_PATH = (BASE_PATH || "") + "/assets/team/";
  PROJECT_PATH = (BASE_PATH || "") + "/assets/projects/";
  MODEL_PATH = (BASE_PATH || "") + "/assets/models/";
  IMAGE_PATH = (BASE_PATH || "") + "/assets/images/";
  TEXTURE_PATH = (BASE_PATH || "") + "/assets/textures/";
  AUDIO_PATH = (BASE_PATH || "") + "/assets/audios/";
  SPRITE_PATH = (BASE_PATH || "") + "/assets/sprites/";
  RENDER_TARGET_FLOAT_TYPE = null;
  DATA_FLOAT_TYPE = null;
  USE_FLOAT_PACKING = false;
  USE_WEBGL2 = true;
  DPR = Math.min(1.5, browser$1.devicePixelRatio) || 1;
  USE_PIXEL_LIMIT = true;
  MAX_PIXEL_COUNT = 3686400;
  MOBILE_WIDTH = 812;
  IS_SMALL_SCREEN = Math.min(window.screen.width, window.screen.height) <= 820;
  JUMP_SECTION = "";
  JUMP_OFFSET = 0;
  USE_HD = false;
  SHOW_DETAILS = "";
  CROSS_ORIGINS = {
    "https://lusion.dev/": "anonymous"
  };
  IS_DEV = false;
  LOG = false;
  SKIP_ANIMATION = false;
  WEBGL_OFF = false;
  LOOK_DEV_MODE = false;
  TEST_TUNNEL = false;
  HOME_TEST = false;
  OPEN_CONTACT = false;
  TEST_BALLOONS = false;
  BALLOON_COLOR = "";
  USE_AUDIO = browser$1.isSupportOgg && !browser$1.isMobile;
  constructor() {
    if (window.URLSearchParams) {
      const t = (r => [...r].reduce((n, [a, l]) => {
        n[a] = l === "" ? true : l;
        return n;
      }, {}))(new URLSearchParams(window.location.search));
      this.override(t);
      for (const r in this) {
        if (r.indexOf("_PATH") > -1) {
          this["LOCAL_" + r] = this[r];
          this[r] = CDN_PATH + this[r];
        }
      }
    }
  }
  override(e) {
    for (const t in e) {
      if (this[t] !== undefined) {
        const r = e[t].toString();
        if (typeof this[t] == "boolean") {
          this[t] = r !== "0" && r !== false;
        } else if (typeof this[t] == "number") {
          this[t] = parseFloat(r);
        } else if (typeof this[t] == "string") {
          this[t] = r;
        }
      }
    }
    if (this.USE_HD) {
      this.USE_PIXEL_LIMIT = false;
    }
  }
}
const settings = new Settings();
var commonjsGlobal$1 = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function getDefaultExportFromCjs(o) {
  if (o && o.__esModule && Object.prototype.hasOwnProperty.call(o, "default")) {
    return o.default;
  } else {
    return o;
  }
}
var minSignal$1 = {
  exports: {}
};
(function (o) {
  (function (e) {
    function t() {
      this._listeners = [];
      this.dispatchCount = 0;
    }
    var r = t.prototype;
    r.add = c;
    r.addOnce = u;
    r.remove = f;
    r.dispatch = p;
    var n = "Callback function is missing!";
    var a = Array.prototype.slice;
    function l(g) {
      g.sort(function (v, _) {
        v = v.p;
        _ = _.p;
        if (_ < v) {
          return 1;
        } else if (_ > v) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    function c(g, v, _, T) {
      if (!g) {
        throw n;
      }
      _ = _ || 0;
      var M = this._listeners;
      var S;
      var b;
      var C;
      for (var w = M.length; w--;) {
        S = M[w];
        if (S.f === g && S.c === v) {
          return false;
        }
      }
      if (typeof _ == "function") {
        b = _;
        _ = T;
        C = 4;
      }
      M.unshift({
        f: g,
        c: v,
        p: _,
        r: b || g,
        a: a.call(arguments, C || 3),
        j: 0
      });
      l(M);
    }
    function u(g, v, _, T) {
      if (!g) {
        throw n;
      }
      var M = this;
      function S() {
        M.remove.call(M, g, v);
        return g.apply(v, a.call(arguments, 0));
      }
      T = a.call(arguments, 0);
      if (T.length === 1) {
        T.push(e);
      }
      T.splice(2, 0, S);
      c.apply(M, T);
    }
    function f(g, v) {
      if (!g) {
        this._listeners.length = 0;
        return true;
      }
      var _ = this._listeners;
      var T;
      for (var M = _.length; M--;) {
        T = _[M];
        if (T.f === g && (!v || T.c === v)) {
          T.j = 0;
          _.splice(M, 1);
          return true;
        }
      }
      return false;
    }
    function p(g) {
      g = a.call(arguments, 0);
      this.dispatchCount++;
      var v = this.dispatchCount;
      var _ = this._listeners;
      var T;
      var M;
      for (var S = _.length; S--;) {
        T = _[S];
        if (T && T.j < v && (T.j = v, T.r.apply(T.c, T.a.concat(g)) === false)) {
          M = T;
          break;
        }
      }
      _ = this._listeners;
      S = _.length;
      while (S--) {
        _[S].j = 0;
      }
      return M;
    }
    o.exports = t;
  })();
})(minSignal$1);
var minSignalExports$1 = minSignal$1.exports;
const MinSignal$2 = getDefaultExportFromCjs(minSignalExports$1);
var quickLoader$b = {
  exports: {}
};
var minSignal = {
  exports: {}
};
(function (o) {
  (function (e) {
    function t() {
      this._listeners = [];
      this.dispatchCount = 0;
    }
    var r = t.prototype;
    r.add = c;
    r.addOnce = u;
    r.remove = f;
    r.dispatch = p;
    var n = "Callback function is missing!";
    var a = Array.prototype.slice;
    function l(g) {
      g.sort(function (v, _) {
        v = v.p;
        _ = _.p;
        if (_ < v) {
          return 1;
        } else if (v > _) {
          return -1;
        } else {
          return 0;
        }
      });
    }
    function c(g, v, _, T) {
      if (!g) {
        throw n;
      }
      _ = _ || 0;
      var M = this._listeners;
      var S;
      var b;
      var C;
      for (var w = M.length; w--;) {
        S = M[w];
        if (S.f === g && S.c === v) {
          return false;
        }
      }
      if (typeof _ == "function") {
        b = _;
        _ = T;
        C = 4;
      }
      M.unshift({
        f: g,
        c: v,
        p: _,
        r: b || g,
        a: a.call(arguments, C || 3),
        j: 0
      });
      l(M);
    }
    function u(g, v, _, T) {
      if (!g) {
        throw n;
      }
      var M = this;
      function S() {
        M.remove.call(M, g, v);
        return g.apply(v, a.call(arguments, 0));
      }
      T = a.call(arguments, 0);
      if (T.length === 1) {
        T.push(e);
      }
      T.splice(2, 0, S);
      c.apply(M, T);
    }
    function f(g, v) {
      if (!g) {
        this._listeners.length = 0;
        return true;
      }
      var _ = this._listeners;
      var T;
      for (var M = _.length; M--;) {
        T = _[M];
        if (T.f === g && (!v || T.c === v)) {
          T.j = 0;
          _.splice(M, 1);
          return true;
        }
      }
      return false;
    }
    function p(g) {
      g = a.call(arguments, 0);
      this.dispatchCount++;
      var v = this.dispatchCount;
      var _ = this._listeners;
      var T;
      var M;
      for (var S = _.length; S--;) {
        T = _[S];
        if (T && T.j < v && (T.j = v, T.r.apply(T.c, T.a.concat(g)) === false)) {
          M = T;
          break;
        }
      }
      _ = this._listeners;
      S = _.length;
      while (S--) {
        _[S].j = 0;
      }
      return M;
    }
    o.exports = t;
  })();
})(minSignal);
var minSignalExports = minSignal.exports;
var MinSignal$1 = minSignalExports;
var undef$3;
function QuickLoader() {
  this.isLoading = false;
  this.totalWeight = 0;
  this.loadedWeight = 0;
  this.itemUrls = {};
  this.itemList = [];
  this.loadingSignal = new MinSignal$1();
  this.crossOriginMap = {};
  this.queue = [];
  this.activeItems = [];
  this.maxActiveItems = 4;
}
var _p$9 = QuickLoader.prototype;
_p$9.addChunk = addChunk;
_p$9.setCrossOrigin = setCrossOrigin;
_p$9.add = add;
_p$9.load = load$7;
_p$9.start = start$1;
_p$9.loadNext = loadNext;
_p$9._createItem = _createItem;
_p$9._onLoading = _onLoading$1;
_p$9.VERSION = "0.1.17";
_p$9.register = register;
_p$9.retrieveAll = retrieveAll;
_p$9.retrieve = retrieve;
_p$9.testExtensions = testExtensions;
_p$9.create = create;
_p$9.check = check;
var addedItems = _p$9.addedItems = {};
var loadedItems = _p$9.loadedItems = {};
var ITEM_CLASS_LIST = _p$9.ITEM_CLASS_LIST = [];
var ITEM_CLASSES = _p$9.ITEM_CLASSES = {};
quickLoader$b.exports = create();
function setCrossOrigin(o, e) {
  this.crossOriginMap[o] = e;
}
function addChunk(o, e) {
  var t;
  var r;
  var n;
  var a;
  var l;
  var c = retrieveAll(o, e);
  t = 0;
  n = c.length;
  for (; t < n; t++) {
    l = c[t];
    r = 0;
    a = l.items.length;
    for (; r < a; r++) {
      this.add(l.items[r], {
        type: l.type
      });
    }
  }
  return c;
}
function add(o, e) {
  var t = addedItems[o];
  t ||= this._createItem(o, e && e.type ? e.type : retrieve(o).type, e);
  if (e && e.onLoad) {
    t.onLoaded.addOnce(e.onLoad);
  }
  if (!this.itemUrls[o]) {
    this.itemUrls[o] = t;
    this.itemList.push(t);
    this.totalWeight += t.weight;
  }
  return t;
}
function load$7(o, e) {
  var t = addedItems[o];
  t ||= this._createItem(o, e && e.type ? e.type : retrieve(o).type, e);
  if (e && e.onLoad) {
    t.onLoaded.addOnce(e.onLoad);
  }
  if (loadedItems[o]) {
    t.dispatch();
  } else if (!t.isStartLoaded) {
    t.load();
  }
  return t;
}
function start$1(o) {
  if (o) {
    this.loadingSignal.add(o);
  }
  this.isLoading = true;
  var e = this.itemList.length;
  if (e) {
    var t = this.itemList.splice(0, this.itemList.length);
    var r;
    for (var n in this.itemUrls) {
      delete this.itemUrls[n];
    }
    for (var a = 0; a < e; a++) {
      r = t[a];
      var l = !!loadedItems[r.url];
      r.onLoaded.addOnce(_onItemLoad, this, -1024, r, t, l);
      if (r.hasLoading) {
        r.loadingSignal.add(_onLoading$1, this, -1024, r, t, undef$3);
      }
      if (l) {
        r.dispatch(_onItemLoad);
      } else if (!r.isStartLoaded) {
        this.queue.push(r);
      }
    }
    if (this.queue.length) {
      this.loadNext();
    }
  } else {
    _onItemLoad.call(this, undef$3, this.itemList);
  }
}
function loadNext() {
  if (this.queue.length && this.activeItems.length < this.maxActiveItems) {
    var o = this.queue.shift();
    this.activeItems.push(o);
    this.loadNext();
    o.load();
  }
}
function _onLoading$1(o, e, t, r, n) {
  if (!o || !!o.isLoaded || o.getCombinedPercent(r) !== 1) {
    if (n === undef$3) {
      this.loadedWeight = _getLoadedWeight(e);
      n = this.loadedWeight / this.totalWeight;
    }
    t = t || this.loadingSignal;
    t.dispatch(n, o);
  }
}
function _getLoadedWeight(o) {
  var e = 0;
  for (var t = 0, r = o.length; t < r; t++) {
    e += o[t].loadedWeight;
  }
  return e;
}
function _onItemLoad(o, e, t) {
  this.loadedWeight = _getLoadedWeight(e);
  if (!t) {
    var r = this.activeItems;
    for (var n = r.length; n--;) {
      if (r[n] === o) {
        r.splice(n, 1);
        break;
      }
    }
  }
  var a = this.loadingSignal;
  if (this.loadedWeight === this.totalWeight) {
    this.isLoading = false;
    this.loadedWeight = 0;
    this.totalWeight = 0;
    this.loadingSignal = new MinSignal$1();
    this._onLoading(o, e, a, 1, 1);
    if (o && o.noCache) {
      _removeItemCache(o);
    }
  } else {
    this._onLoading(o, e, a, 1, this.loadedWeight / this.totalWeight);
    if (o && o.noCache) {
      _removeItemCache(o);
    }
    if (!t) {
      this.loadNext();
    }
  }
}
function _removeItemCache(o) {
  var e = o.url;
  o.content = undef$3;
  addedItems[e] = undef$3;
  loadedItems[e] = undef$3;
}
function _createItem(o, e, t) {
  t = t || {};
  if (!t.crossOrigin) {
    for (var r in this.crossOriginMap) {
      if (o.indexOf(r) === 0) {
        t.crossOrigin = this.crossOriginMap[r];
        break;
      }
    }
  }
  return new ITEM_CLASSES[e](o, t);
}
function register(o) {
  if (!ITEM_CLASSES[o.type]) {
    ITEM_CLASS_LIST.push(o);
    ITEM_CLASSES[o.type] = o;
  }
}
function retrieveAll(o, e) {
  var t;
  var r;
  var n = o.length;
  var a = [];
  if (n && typeof o != "string") {
    for (t = 0; t < n; t++) {
      r = retrieve(o[t], e);
      if (r) {
        a = a.concat(r);
      }
    }
  } else {
    r = retrieve(o, e);
    if (r) {
      a = a.concat(r);
    }
  }
  return a;
}
function retrieve(o, e) {
  var t;
  var r;
  var n;
  var a;
  var l;
  if (e) {
    a = ITEM_CLASSES[e];
    n = a.retrieve(o);
  } else {
    t = 0;
    r = ITEM_CLASS_LIST.length;
    for (; t < r; t++) {
      a = ITEM_CLASS_LIST[t];
      l = a.type;
      if (typeof o == "string") {
        if (testExtensions(o, a)) {
          n = [o];
          break;
        }
      } else {
        n = a.retrieve(o);
        if (n && n.length && typeof n[0] == "string" && testExtensions(n[0], a)) {
          break;
        }
      }
      n = undef$3;
      l = undef$3;
    }
  }
  if (n) {
    return {
      type: e || l,
      items: n
    };
  }
}
function testExtensions(o, e) {
  if (o) {
    var t = _getExtension(o);
    var r = e.extensions;
    for (var n = r.length; n--;) {
      if (t === r[n]) {
        return true;
      }
    }
    return false;
  }
}
function _getExtension(o) {
  return o.split(".").pop().split(/#|\?/)[0];
}
function create() {
  return new QuickLoader();
}
function check() {
  var o = [];
  var e = [];
  for (var t in addedItems) {
    o.push(t);
    if (!loadedItems[t]) {
      e.push(addedItems[t]);
    }
  }
  console.log({
    added: o,
    notLoaded: e
  });
}
var quickLoaderExports = quickLoader$b.exports;
var MinSignal = minSignalExports;
var quickLoader$a = quickLoaderExports;
function AbstractItem$6(o, e) {
  if (o) {
    this.url = o;
    this.loadedWeight = 0;
    this.weight = 1;
    this.postPercent = 0;
    for (var t in e) {
      this[t] = e[t];
    }
    this.type ||= this.constructor.type;
    if (this.hasLoading) {
      this.loadingSignal = new MinSignal();
      this.loadingSignal.add(_onLoading, this);
      if (this.onLoading) {
        this.loadingSignal.add(this.onLoading);
      }
    }
    if (this.onPost) {
      this.onPostLoadingSignal = new MinSignal();
      this.onPostLoadingSignal.add(this._onPostLoading, this);
      this.postWeightRatio = this.postWeightRatio || 0.1;
    } else {
      this.postWeightRatio = 0;
    }
    var r = this;
    this.boundOnLoad = function () {
      r._onLoad();
    };
    this.onLoaded = new MinSignal();
    quickLoader$a.addedItems[o] = this;
  }
}
var AbstractItem_1 = AbstractItem$6;
var _p$8 = AbstractItem$6.prototype;
_p$8.load = load$6;
_p$8._onLoad = _onLoad$6;
_p$8._onLoading = _onLoading;
_p$8._onPostLoading = _onPostLoading;
_p$8._onLoadComplete = _onLoadComplete;
_p$8.getCombinedPercent = getCombinedPercent;
_p$8.dispatch = dispatch;
AbstractItem$6.extensions = [];
AbstractItem$6.retrieve = function () {
  return false;
};
function load$6() {
  this.isStartLoaded = true;
}
function _onLoad$6() {
  if (this.onPost) {
    this.onPost.call(this, this.content, this.onPostLoadingSignal);
  } else {
    this._onLoadComplete();
  }
}
function _onPostLoading(o) {
  this.postPercent = o;
  if (this.hasLoading) {
    this.loadingSignal.dispatch(1);
  }
  if (o === 1) {
    this._onLoadComplete();
  }
}
function _onLoadComplete() {
  this.isLoaded = true;
  this.loadedWeight = this.weight;
  quickLoader$a.loadedItems[this.url] = this;
  this.onLoaded.dispatch(this.content);
}
function getCombinedPercent(o) {
  return o * (1 - this.postWeightRatio) + this.postWeightRatio * this.postPercent;
}
function _onLoading(o) {
  this.loadedWeight = this.weight * this.getCombinedPercent(o);
}
function dispatch() {
  if (this.hasLoading) {
    this.loadingSignal.remove();
  }
  this.onLoaded.dispatch(this.content);
}
var AbstractItem$5 = AbstractItem_1;
var quickLoader$9 = quickLoaderExports;
function __generateFuncName() {
  return "_jsonp" + new Date().getTime() + ~~(Math.random() * 100000000);
}
function JSONPItem(o) {
  if (o) {
    _super$7.constructor.apply(this, arguments);
  }
}
JSONPItem.type = "jsonp";
JSONPItem.extensions = [];
quickLoader$9.register(JSONPItem);
JSONPItem.retrieve = function (o) {
  if (typeof o == "string" && o.indexOf("=") > -1) {
    return [o];
  } else {
    return false;
  }
};
var _super$7 = AbstractItem$5.prototype;
var _p$7 = JSONPItem.prototype = new AbstractItem$5();
_p$7.constructor = JSONPItem;
_p$7.load = load$5;
function load$5(o) {
  _super$7.load.apply(this, arguments);
  var e = this;
  var t = this.url.lastIndexOf("=") + 1;
  var r = this.url.substr(0, t);
  var n = this.url.substr(t);
  if (n.length === 0) {
    n = __generateFuncName();
    this.jsonpCallback = o;
  } else {
    this.jsonpCallback = this.jsonpCallback || window[n];
  }
  window[n] = function (l) {
    if (a.parentNode) {
      a.parentNode.removeChild(a);
    }
    e.content = l;
    e._onLoad();
  };
  var a = document.createElement("script");
  a.type = "text/javascript";
  a.src = r + n;
  document.getElementsByTagName("head")[0].appendChild(a);
}
var AbstractItem$4 = AbstractItem_1;
var quickLoader$8 = quickLoaderExports;
var undef$2;
var IS_SUPPORT_XML_HTTP_REQUEST = !!window.XMLHttpRequest;
function XHRItem$2(o) {
  if (o) {
    _super$6.constructor.apply(this, arguments);
    this.responseType = this.responseType || "";
    this.method = this.method || "GET";
  }
}
var XHRItem_1 = XHRItem$2;
XHRItem$2.type = "xhr";
XHRItem$2.extensions = [];
quickLoader$8.register(XHRItem$2);
XHRItem$2.retrieve = function () {
  return false;
};
var _super$6 = AbstractItem$4.prototype;
var _p$6 = XHRItem$2.prototype = new AbstractItem$4();
_p$6.constructor = XHRItem$2;
_p$6.load = load$4;
_p$6._onXmlHttpChange = _onXmlHttpChange;
_p$6._onXmlHttpProgress = _onXmlHttpProgress;
_p$6._onLoad = _onLoad$5;
function load$4() {
  _super$6.load.apply(this, arguments);
  var o = this;
  var e;
  if (IS_SUPPORT_XML_HTTP_REQUEST) {
    e = this.xmlhttp = new XMLHttpRequest();
  } else {
    e = this.xmlhttp = new ActiveXObject("Microsoft.XMLHTTP");
  }
  if (this.hasLoading) {
    e.onprogress = function (t) {
      o._onXmlHttpProgress(t);
    };
  }
  e.onerror = function () {
    console.warn("XHR error: " + o.url);
    o._onLoadComplete();
  };
  e.onreadystatechange = function () {
    o._onXmlHttpChange();
  };
  e.open(this.method, this.url, true);
  this.xmlhttp.responseType = this.responseType;
  if (IS_SUPPORT_XML_HTTP_REQUEST) {
    e.send(null);
  } else {
    e.send();
  }
}
function _onXmlHttpProgress(o) {
  this.loadingSignal.dispatch(o.loaded / o.total);
}
function _onXmlHttpChange() {
  if (this.xmlhttp.readyState === 4) {
    if (this.xmlhttp.status === 200 || this.xmlhttp.status === 0) {
      this._onLoad(this.xmlhttp);
    } else {
      console.warn("HTTP " + this.xmlhttp.status + " loading: " + this.url);
      this._onLoadComplete();
    }
  }
}
function _onLoad$5() {
  this.content ||= this.xmlhttp.response;
  this.xmlhttp = undef$2;
  _super$6._onLoad.call(this);
}
var XHRItem$1 = XHRItem_1;
var quickLoader$7 = quickLoaderExports;
function TextItem$1(o, e) {
  if (o) {
    e.responseType = "text";
    _super$5.constructor.apply(this, arguments);
  }
}
var TextItem_1 = TextItem$1;
TextItem$1.type = "text";
TextItem$1.extensions = ["html", "txt", "svg"];
quickLoader$7.register(TextItem$1);
TextItem$1.retrieve = function () {
  return false;
};
var _super$5 = XHRItem$1.prototype;
var _p$5 = TextItem$1.prototype = new XHRItem$1();
_p$5.constructor = TextItem$1;
_p$5._onLoad = _onLoad$4;
function _onLoad$4() {
  this.content ||= this.xmlhttp.responseText;
  _super$5._onLoad.apply(this, arguments);
}
var TextItem = TextItem_1;
var quickLoader$6 = quickLoaderExports;
function JSONItem(o) {
  if (o) {
    _super$4.constructor.apply(this, arguments);
  }
}
JSONItem.type = "json";
JSONItem.extensions = ["json"];
quickLoader$6.register(JSONItem);
JSONItem.retrieve = function () {
  return false;
};
var _super$4 = TextItem.prototype;
var _p$4 = JSONItem.prototype = new TextItem();
_p$4.constructor = JSONItem;
_p$4._onLoad = _onLoad$3;
function _onLoad$3() {
  this.content ||= window.JSON && window.JSON.parse ? JSON.parse(this.xmlhttp.responseText.toString()) : eval(this.xmlhttp.responseText.toString());
  _super$4._onLoad.call(this);
}
var AbstractItem$3 = AbstractItem_1;
var quickLoader$5 = quickLoaderExports;
var undef$1;
function AudioItem$1(o, e) {
  if (o) {
    this.loadThrough = !e || e.loadThrough === undef$1 ? true : e.loadThrough;
    _super$3.constructor.apply(this, arguments);
    try {
      this.content = this.content || new Audio();
    } catch {
      this.content = this.content || document.createElement("audio");
    }
    if (this.crossOrigin) {
      this.content.crossOrigin = this.crossOrigin;
    }
  }
}
AudioItem$1.type = "audio";
AudioItem$1.extensions = ["mp3", "ogg"];
quickLoader$5.register(AudioItem$1);
AudioItem$1.retrieve = function (o) {
  return false;
};
var _super$3 = AbstractItem$3.prototype;
var _p$3 = AudioItem$1.prototype = new AbstractItem$3();
_p$3.constructor = AudioItem$1;
_p$3.load = load$3;
_p$3._onLoad = _onLoad$2;
function load$3() {
  _super$3.load.apply(this, arguments);
  var o = this;
  var e = o.content;
  e.src = this.url;
  if (this.loadThrough) {
    e.addEventListener("canplaythrough", this.boundOnLoad, false);
  } else {
    e.addEventListener("canplay", this.boundOnLoad, false);
  }
  e.load();
}
function _onLoad$2() {
  this.content.removeEventListener("canplaythrough", this.boundOnLoad, false);
  this.content.removeEventListener("canplay", this.boundOnLoad, false);
  if (!this.isLoaded) {
    _super$3._onLoad.call(this);
  }
}
var AbstractItem$2 = AbstractItem_1;
var quickLoader$4 = quickLoaderExports;
var undef;
function VideoItem(o, e) {
  if (o) {
    this.loadThrough = !e || e.loadThrough === undef ? true : e.loadThrough;
    _super$2.constructor.apply(this, arguments);
    try {
      this.content = this.content || new Video();
    } catch {
      this.content = this.content || document.createElement("video");
    }
    if (this.crossOrigin) {
      this.content.crossOrigin = this.crossOrigin;
    }
  }
}
VideoItem.type = "video";
VideoItem.extensions = ["mp4", "webm", "ogv"];
quickLoader$4.register(VideoItem);
VideoItem.retrieve = function (o) {
  return false;
};
var _super$2 = AbstractItem$2.prototype;
var _p$2 = VideoItem.prototype = new AbstractItem$2();
_p$2.constructor = VideoItem;
_p$2.load = load$2;
_p$2._onLoad = _onLoad$1;
function load$2() {
  _super$2.load.apply(this, arguments);
  var o = this.content;
  o.preload = "auto";
  o.src = this.url;
  if (this.loadThrough) {
    o.addEventListener("canplaythrough", this.boundOnLoad, false);
  } else {
    o.addEventListener("canplay", this.boundOnLoad, false);
  }
  o.load();
}
function _onLoad$1() {
  this.content.removeEventListener("canplaythrough", this.boundOnLoad);
  this.content.removeEventListener("canplay", this.boundOnLoad);
  if (!this.isLoaded) {
    _super$2._onLoad.call(this);
  }
}
var AbstractItem$1 = AbstractItem_1;
var quickLoader$3 = quickLoaderExports;
function AnyItem$3(o, e) {
  if (o) {
    _super$1.constructor.call(this, o, e);
    if (!this.loadFunc && console) {
      console[console.error || console.log]("require loadFunc in the config object.");
    }
  }
}
AnyItem$3.type = "any";
AnyItem$3.extensions = [];
quickLoader$3.register(AnyItem$3);
AnyItem$3.retrieve = function () {
  return false;
};
var _super$1 = AbstractItem$1.prototype;
var _p$1 = AnyItem$3.prototype = new AbstractItem$1();
_p$1.constructor = AnyItem$3;
_p$1.load = load$1;
function load$1() {
  var o = this;
  this.loadFunc(this.url, function (e) {
    o.content = e;
    _super$1._onLoad.call(o);
  }, this.loadingSignal);
}
function computedStyle$2(o, e, t, r) {
  t = window.getComputedStyle;
  r = t ? t(o) : o.currentStyle;
  if (r) {
    return r[e.replace(/-(\w)/gi, function (n, a) {
      return a.toUpperCase();
    })];
  }
}
var computedStyle_commonjs = computedStyle$2;
var AbstractItem = AbstractItem_1;
var computedStyle$1 = computedStyle_commonjs;
var quickLoader$2 = quickLoaderExports;
function ImageItem$1(o, e) {
  if (o) {
    _super.constructor.apply(this, arguments);
    this.content = this.content || new Image();
    if (this.crossOrigin) {
      this.content.crossOrigin = this.crossOrigin;
    }
  }
}
var _super = AbstractItem.prototype;
var _p = ImageItem$1.prototype = new AbstractItem();
_p.constructor = ImageItem$1;
_p.load = load;
_p._onLoad = _onLoad;
ImageItem$1.retrieve = function (o) {
  if (o.nodeType && o.style) {
    var e = [];
    if (o.nodeName.toLowerCase() === "img" && o.src.indexOf(";") < 0) {
      e.push(o.src);
    }
    computedStyle$1(o, "background-image").replace(/s?url\(\s*?['"]?([^;]*?)['"]?\s*?\)/g, function (r, n) {
      e.push(n);
    });
    for (var t = e.length; t--;) {
      if (!_isNotData(e[t])) {
        e.splice(t, 1);
      }
    }
    if (e.length) {
      return e;
    } else {
      return false;
    }
  } else if (typeof o == "string") {
    return [o];
  } else {
    return false;
  }
};
ImageItem$1.type = "image";
ImageItem$1.extensions = ["jpg", "gif", "png"];
quickLoader$2.register(ImageItem$1);
function load() {
  _super.load.apply(this, arguments);
  var o = this.content;
  var self = this;
  o.onload = this.boundOnLoad;
  o.onerror = function () {
    console.warn("Image error: " + self.url);
    self._onLoadComplete();
  };
  o.src = this.url;
}
function _onLoad() {
  delete this.content.onload;
  delete this.content.onerror;
  this.width = this.content.width;
  this.height = this.content.height;
  _super._onLoad.call(this);
}
function _isNotData(o) {
  return o.indexOf("data:") !== 0;
}
var quickLoader = quickLoaderExports;
const quickLoader$1 = getDefaultExportFromCjs(quickLoader);
let computedStyle = getComputedStyle(document.documentElement);
class Properties {
  win = window;
  isSecureConnection = window.location.protocol === "https:";
  loader = quickLoader$1.create();
  percent = 0;
  easedPercent = 0;
  domRoot = document.querySelector(":root");
  _isSupportedDevice = false;
  _isSupportedBrowser = false;
  _isSupportedWebGL = false;
  _isSupportedMobileOrientation = false;
  _isSupported = false;
  time = 0;
  deltaTime = 0;
  hasInitialized = false;
  hasStarted = false;
  startTime = 0;
  viewportWidth = 0;
  viewportHeight = 0;
  width = 0;
  height = 0;
  useMobileLayout = false;
  renderer = null;
  scene = null;
  camera = null;
  cameraDirection = new Vector3(0, 0, 1);
  postprocessing = null;
  resolution = new Vector2();
  viewportResolution = new Vector2();
  bgColor = new Color();
  canvas = null;
  gl = null;
  webglDPR = 1;
  webglOpts = {
    antialias: false,
    alpha: false,
    xrCompatible: false,
    powerPreference: "high-performance"
  };
  sharedUniforms = {
    u_aspect: {
      value: 1
    },
    u_cameraDirection: {
      value: this.cameraDirection
    },
    u_dpr: {
      value: 1
    },
    u_time: {
      value: 0
    },
    u_deltaTime: {
      value: 1
    },
    u_resolution: {
      value: this.resolution
    },
    u_viewportResolution: {
      value: this.viewportResolution
    },
    u_bgColor: {
      value: this.bgColor
    },
    u_globalRadius: {
      value: 0
    }
  };
  initTaskList = [];
  changeCamera = new MinSignal$2();
  smaa = null;
  fxaa = null;
  aboutPageHeroEfxPrepass = null;
  cameraMotionBlur = null;
  aboutPageHeroEfx = null;
  gtao = null;
  bloom = null;
  screenPaintDistortion = null;
  final = null;
  offWhiteColorHex = computedStyle.getPropertyValue("--color-off-white").trim();
  blackColorHex = computedStyle.getPropertyValue("--color-black").trim();
  blueColorHex = computedStyle.getPropertyValue("--color-blue").trim();
  bgColorHex = computedStyle.getPropertyValue("--color-off-white").trim();
  opacity = 1;
  cameraLookX = 0;
  cameraLookY = 0;
  defaults = {
    defaultCameraPosition: new Vector3(0, 0, 5),
    defaultLookAtPosition: new Vector3(0, 0, 0),
    autoScrollSpeed: 0,
    cameraNear: 0.1,
    cameraFar: 200,
    clearAlpha: 1,
    cameraFov: 45,
    cameraUsePhysical: false,
    cameraFilmGauge: 35,
    cameraFocalLength: 35,
    cameraDollyZoomFovOffset: 0,
    screenPaintOffsetRatio: 1,
    cameraViewportOffsetX: 0,
    cameraViewportOffsetY: 0,
    cameraDistance: 5,
    cameraLookStrength: 0,
    cameraLookEaseDamp: 0.1,
    cameraShakePositionStrength: 0,
    cameraShakePositionSpeed: 0.15,
    cameraShakeRotationStrength: 0,
    cameraShakeRotationSpeed: 0.3,
    cameraDollyZoomFovOffset: 0,
    bloomAmount: 0,
    bloomRadius: 0,
    bloomThreshold: 0,
    bloomSmoothWidth: 0,
    bloomSaturation: 1,
    bloomHighPassMultiplier: 1,
    haloWidth: 0.6,
    haloRGBShift: 0.02,
    haloStrength: 0,
    haloMaskInner: 0.3,
    haloMaskOuter: 0.5,
    useFinal: false,
    vignetteFrom: 2,
    vignetteTo: 5,
    vignetteColorHex: "#000000",
    saturation: 1,
    contrast: 0,
    brightness: 1,
    tintColorHex: "#000000",
    tintOpacity: 0,
    screenPaintNeedsMouseDown: false,
    screenPaintMinRadius: 0,
    screenPaintMaxRadius: 100,
    screenPaintRadiusDistanceRange: 100,
    screenPaintPushStrength: 25,
    screenPaintVelocityDissipation: 0.975,
    screenPaintWeight1Dissipation: 0.95,
    screenPaintWeight2Dissipation: 0.8,
    screenPaintUseNoise: true,
    screenPaintCurlScale: 0.02,
    screenPaintCurlStrength: 3,
    screenPaintDistortionAmount: 3,
    screenPaintDistortionRGBShift: 0.5,
    screenPaintDistortionColorMultiplier: 10,
    screenPaintDistortionMultiplier: 5,
    upscalerAmount: 1,
    upscalerSharpness: 1,
    isSmaaEnabled: !settings.USE_HD
  };
  onFirstClicked = new MinSignal$2();
  isPreloaderFinished = false;
  balloonsColorIndex = 0;
  globalRadius = 0;
  isContactFromProjectPage = false;
  constructor() {}
  reset() {
    for (let e in this.defaults) {
      this[e] = this.defaults[e];
    }
    if (this.smaa) {
      this.smaa.enabled = true;
    }
  }
}
const properties = new Properties();
var _populated = false;
var _ie;
var _firefox;
var _opera;
var _webkit;
var _chrome;
var _ie_real_version;
var _osx;
var _windows;
var _linux;
var _android;
var _win64;
var _iphone;
var _ipad;
var _native;
var _mobile;
function _populate() {
  if (!_populated) {
    _populated = true;
    var o = navigator.userAgent;
    var e = /(?:MSIE.(\d+\.\d+))|(?:(?:Firefox|GranParadiso|Iceweasel).(\d+\.\d+))|(?:Opera(?:.+Version.|.)(\d+\.\d+))|(?:AppleWebKit.(\d+(?:\.\d+)?))|(?:Trident\/\d+\.\d+.*rv:(\d+\.\d+))/.exec(o);
    var t = /(Mac OS X)|(Windows)|(Linux)/.exec(o);
    _iphone = /\b(iPhone|iP[ao]d)/.exec(o);
    _ipad = /\b(iP[ao]d)/.exec(o);
    _android = /Android/i.exec(o);
    _native = /FBAN\/\w+;/i.exec(o);
    _mobile = /Mobile/i.exec(o);
    _win64 = !!/Win64/.exec(o);
    if (e) {
      _ie = e[1] ? parseFloat(e[1]) : e[5] ? parseFloat(e[5]) : NaN;
      if (_ie && document && document.documentMode) {
        _ie = document.documentMode;
      }
      var r = /(?:Trident\/(\d+.\d+))/.exec(o);
      _ie_real_version = r ? parseFloat(r[1]) + 4 : _ie;
      _firefox = e[2] ? parseFloat(e[2]) : NaN;
      _opera = e[3] ? parseFloat(e[3]) : NaN;
      _webkit = e[4] ? parseFloat(e[4]) : NaN;
      if (_webkit) {
        e = /(?:Chrome\/(\d+\.\d+))/.exec(o);
        _chrome = e && e[1] ? parseFloat(e[1]) : NaN;
      } else {
        _chrome = NaN;
      }
    } else {
      _ie = _firefox = _opera = _chrome = _webkit = NaN;
    }
    if (t) {
      if (t[1]) {
        var n = /(?:Mac OS X (\d+(?:[._]\d+)?))/.exec(o);
        _osx = n ? parseFloat(n[1].replace("_", ".")) : true;
      } else {
        _osx = false;
      }
      _windows = !!t[2];
      _linux = !!t[3];
    } else {
      _osx = _windows = _linux = false;
    }
  }
}
var UserAgent_DEPRECATED$1 = {
  ie: function () {
    return _populate() || _ie;
  },
  ieCompatibilityMode: function () {
    return _populate() || _ie_real_version > _ie;
  },
  ie64: function () {
    return UserAgent_DEPRECATED$1.ie() && _win64;
  },
  firefox: function () {
    return _populate() || _firefox;
  },
  opera: function () {
    return _populate() || _opera;
  },
  webkit: function () {
    return _populate() || _webkit;
  },
  safari: function () {
    return UserAgent_DEPRECATED$1.webkit();
  },
  chrome: function () {
    return _populate() || _chrome;
  },
  windows: function () {
    return _populate() || _windows;
  },
  osx: function () {
    return _populate() || _osx;
  },
  linux: function () {
    return _populate() || _linux;
  },
  iphone: function () {
    return _populate() || _iphone;
  },
  mobile: function () {
    return _populate() || _iphone || _ipad || _android || _mobile;
  },
  nativeApp: function () {
    return _populate() || _native;
  },
  android: function () {
    return _populate() || _android;
  },
  ipad: function () {
    return _populate() || _ipad;
  }
};
var UserAgent_DEPRECATED_1 = UserAgent_DEPRECATED$1;
var canUseDOM = typeof window !== "undefined" && !!window.document && !!window.document.createElement;
var ExecutionEnvironment$1 = {
  canUseDOM
};
var ExecutionEnvironment_1 = ExecutionEnvironment$1;
var ExecutionEnvironment = ExecutionEnvironment_1;
var useHasFeature;
if (ExecutionEnvironment.canUseDOM) {
  useHasFeature = document.implementation && document.implementation.hasFeature && document.implementation.hasFeature("", "") !== true;
}
/**
* Checks if an event is supported in the current execution environment.
*
* NOTE: This will not work correctly for non-generic events such as `change`,
* `reset`, `load`, `error`, and `select`.
*
* Borrows from Modernizr.
*
* @param {string} eventNameSuffix Event name, e.g. "click".
* @param {?boolean} capture Check if the capture phase is supported.
* @return {boolean} True if the event is supported.
* @internal
* @license Modernizr 3.0.0pre (Custom Build) | MIT
*/
function isEventSupported$1(o, e) {
  if (!ExecutionEnvironment.canUseDOM || e && !("addEventListener" in document)) {
    return false;
  }
  var t = "on" + o;
  var r = t in document;
  if (!r) {
    var n = document.createElement("div");
    n.setAttribute(t, "return;");
    r = typeof n[t] == "function";
  }
  if (!r && useHasFeature && o === "wheel") {
    r = document.implementation.hasFeature("Events.wheel", "3.0");
  }
  return r;
}
var isEventSupported_1 = isEventSupported$1;
var UserAgent_DEPRECATED = UserAgent_DEPRECATED_1;
var isEventSupported = isEventSupported_1;
var PIXEL_STEP = 10;
var LINE_HEIGHT = 40;
var PAGE_HEIGHT = 800;
function normalizeWheel$2(o) {
  var e = 0;
  var t = 0;
  var r = 0;
  var n = 0;
  if ("detail" in o) {
    t = o.detail;
  }
  if ("wheelDelta" in o) {
    t = -o.wheelDelta / 120;
  }
  if ("wheelDeltaY" in o) {
    t = -o.wheelDeltaY / 120;
  }
  if ("wheelDeltaX" in o) {
    e = -o.wheelDeltaX / 120;
  }
  if ("axis" in o && o.axis === o.HORIZONTAL_AXIS) {
    e = t;
    t = 0;
  }
  r = e * PIXEL_STEP;
  n = t * PIXEL_STEP;
  if ("deltaY" in o) {
    n = o.deltaY;
  }
  if ("deltaX" in o) {
    r = o.deltaX;
  }
  if ((r || n) && o.deltaMode) {
    if (o.deltaMode == 1) {
      r *= LINE_HEIGHT;
      n *= LINE_HEIGHT;
    } else {
      r *= PAGE_HEIGHT;
      n *= PAGE_HEIGHT;
    }
  }
  if (r && !e) {
    e = r < 1 ? -1 : 1;
  }
  if (n && !t) {
    t = n < 1 ? -1 : 1;
  }
  return {
    spinX: e,
    spinY: t,
    pixelX: r,
    pixelY: n
  };
}
normalizeWheel$2.getEventType = function () {
  if (UserAgent_DEPRECATED.firefox()) {
    return "DOMMouseScroll";
  } else if (isEventSupported("wheel")) {
    return "wheel";
  } else {
    return "mousewheel";
  }
};
var normalizeWheel_1 = normalizeWheel$2;
var normalizeWheel = normalizeWheel_1;
const normalizeWheel$1 = getDefaultExportFromCjs(normalizeWheel);
