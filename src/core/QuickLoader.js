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