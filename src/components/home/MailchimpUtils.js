const validateEmail = o => o.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var toQuerystring_min = {
  exports: {}
};
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    return (() => {
      var t = {
        d: (p, g) => {
          for (var v in g) {
            if (t.o(g, v) && !t.o(p, v)) {
              Object.defineProperty(p, v, {
                enumerable: true,
                get: g[v]
              });
            }
          }
        },
        o: (p, g) => Object.prototype.hasOwnProperty.call(p, g),
        r: p => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(p, Symbol.toStringTag, {
              value: "Module"
            });
          }
          Object.defineProperty(p, "__esModule", {
            value: true
          });
        }
      };
      var r = {};
      function n(p) {
        n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (g) {
          return typeof g;
        } : function (g) {
          if (g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof g;
          }
        };
        return n(p);
      }
      t.r(r);
      t.d(r, {
        default: () => f
      });
      var a = encodeURIComponent;
      function l(p, g, v, _, T) {
        var M = _ && T.arrayPrefix || "";
        if (n(g) === "object") {
          var S = `${p}${M}${v && "]"}[`;
          return `${u(g, `${v}${S}`, T)}`;
        }
        if (v && v.length) {
          return `${v}${p}]${M}=${a(g)}`;
        } else {
          return `${p}${M}=${a(g)}`;
        }
      }
      function c(p, g, v, _) {
        return g.map(function (T) {
          return l(p, T, v, true, _);
        }).join("&");
      }
      function u(p, g = "", v = {}) {
        return (Array.isArray(p) ? p.map(function (_, T) {
          return l(`${T}`, _, g, true, v);
        }) : Object.keys(p).filter(function (_) {
          return p[_] !== undefined;
        }).map(function (_) {
          if (p[_] && Array.isArray(p[_])) {
            return c(`${_}`, p[_], g, v);
          } else {
            return l(_, p[_], g, false, v);
          }
        })).join("&").replace(/%20/g, "+");
      }
      const f = u;
      return r;
    })();
  });
})(toQuerystring_min);
var toQuerystring_minExports = toQuerystring_min.exports;
const toQueryString = getDefaultExportFromCjs(toQuerystring_minExports);
var browser = {
  exports: {}
};
var debug$1 = {
  exports: {}
};
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;
function ms(o, e) {
  e = e || {};
  var t = typeof o;
  if (t === "string" && o.length > 0) {
    return parse(o);
  }
  if (t === "number" && isNaN(o) === false) {
    if (e.long) {
      return fmtLong(o);
    } else {
      return fmtShort(o);
    }
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(o));
}
function parse(o) {
  o = String(o);
  if (!(o.length > 100)) {
    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(o);
    if (e) {
      var t = parseFloat(e[1]);
      var r = (e[2] || "ms").toLowerCase();
      switch (r) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return t * y;
        case "days":
        case "day":
        case "d":
          return t * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return t * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return t * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return t * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return t;
        default:
          return;
      }
    }
  }
}
function fmtShort(o) {
  if (o >= d) {
    return Math.round(o / d) + "d";
  } else if (o >= h) {
    return Math.round(o / h) + "h";
  } else if (o >= m) {
    return Math.round(o / m) + "m";
  } else if (o >= s) {
    return Math.round(o / s) + "s";
  } else {
    return o + "ms";
  }
}
function fmtLong(o) {
  return plural(o, d, "day") || plural(o, h, "hour") || plural(o, m, "minute") || plural(o, s, "second") || o + " ms";
}
function plural(o, e, t) {
  if (!(o < e)) {
    if (o < e * 1.5) {
      return Math.floor(o / e) + " " + t;
    } else {
      return Math.ceil(o / e) + " " + t + "s";
    }
  }
}
(function (o, e) {
  e = o.exports = n.debug = n.default = n;
  e.coerce = u;
  e.disable = l;
  e.enable = a;
  e.enabled = c;
  e.humanize = ms;
  e.names = [];
  e.skips = [];
  e.formatters = {};
  var t;
  function r(f) {
    var p = 0;
    var g;
    for (g in f) {
      p = (p << 5) - p + f.charCodeAt(g);
      p |= 0;
    }
    return e.colors[Math.abs(p) % e.colors.length];
  }
  function n(f) {
    function p() {
      if (p.enabled) {
        var g = p;
        var v = +new Date();
        var _ = v - (t || v);
        g.diff = _;
        g.prev = t;
        g.curr = v;
        t = v;
        for (var T = new Array(arguments.length), M = 0; M < T.length; M++) {
          T[M] = arguments[M];
        }
        T[0] = e.coerce(T[0]);
        if (typeof T[0] != "string") {
          T.unshift("%O");
        }
        var S = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, function (C, w) {
          if (C === "%%") {
            return C;
          }
          S++;
          var R = e.formatters[w];
          if (typeof R == "function") {
            var E = T[S];
            C = R.call(g, E);
            T.splice(S, 1);
            S--;
          }
          return C;
        });
        e.formatArgs.call(g, T);
        var b = p.log || e.log || console.log.bind(console);
        b.apply(g, T);
      }
    }
    p.namespace = f;
    p.enabled = e.enabled(f);
    p.useColors = e.useColors();
    p.color = r(f);
    if (typeof e.init == "function") {
      e.init(p);
    }
    return p;
  }
  function a(f) {
    e.save(f);
    e.names = [];
    e.skips = [];
    var p = (typeof f == "string" ? f : "").split(/[\s,]+/);
    for (var g = p.length, v = 0; v < g; v++) {
      if (p[v]) {
        f = p[v].replace(/\*/g, ".*?");
        if (f[0] === "-") {
          e.skips.push(new RegExp("^" + f.substr(1) + "$"));
        } else {
          e.names.push(new RegExp("^" + f + "$"));
        }
      }
    }
  }
  function l() {
    e.enable("");
  }
  function c(f) {
    var p;
    var g;
    p = 0;
    g = e.skips.length;
    for (; p < g; p++) {
      if (e.skips[p].test(f)) {
        return false;
      }
    }
    p = 0;
    g = e.names.length;
    for (; p < g; p++) {
      if (e.names[p].test(f)) {
        return true;
      }
    }
    return false;
  }
  function u(f) {
    if (f instanceof Error) {
      return f.stack || f.message;
    } else {
      return f;
    }
  }
})(debug$1, debug$1.exports);
var debugExports = debug$1.exports;
(function (o, e) {
  var t = {};
  e = o.exports = debugExports;
  e.log = a;
  e.formatArgs = n;
  e.save = l;
  e.load = c;
  e.useColors = r;
  e.storage = typeof chrome !== "undefined" && typeof chrome.storage !== "undefined" ? chrome.storage.local : u();
  e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
  function r() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    } else {
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
  }
  e.formatters.j = function (f) {
    try {
      return JSON.stringify(f);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
  function n(f) {
    var p = this.useColors;
    f[0] = (p ? "%c" : "") + this.namespace + (p ? " %c" : " ") + f[0] + (p ? "%c " : " ") + "+" + e.humanize(this.diff);
    if (p) {
      var g = "color: " + this.color;
      f.splice(1, 0, g, "color: inherit");
      var v = 0;
      var _ = 0;
      f[0].replace(/%[a-zA-Z%]/g, function (T) {
        if (T !== "%%") {
          v++;
          if (T === "%c") {
            _ = v;
          }
        }
      });
      f.splice(_, 0, g);
    }
  }
  function a() {
    return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function l(f) {
    try {
      if (f == null) {
        e.storage.removeItem("debug");
      } else {
        e.storage.debug = f;
      }
    } catch {}
  }
  function c() {
    var f;
    try {
      f = e.storage.debug;
    } catch {}
    if (!f && typeof process !== "undefined" && "env" in process) {
      f = t.DEBUG;
    }
    return f;
  }
  e.enable(c());
  function u() {
    try {
      return window.localStorage;
    } catch {}
  }
})(browser, browser.exports);
var browserExports = browser.exports;
var debug = browserExports("jsonp");
var jsonp_1 = jsonp;
var count = 0;
function noop() {}
function jsonp(o, e, t) {
  if (typeof e == "function") {
    t = e;
    e = {};
  }
  e ||= {};
  var r = e.prefix || "__jp";
  var n = e.name || r + count++;
  var a = e.param || "callback";
  var l = e.timeout ?? 60000;
  var c = encodeURIComponent;
  var u = document.getElementsByTagName("script")[0] || document.head;
  var f;
  var p;
  if (l) {
    p = setTimeout(function () {
      g();
      if (t) {
        t(new Error("Timeout"));
      }
    }, l);
  }
  function g() {
    if (f.parentNode) {
      f.parentNode.removeChild(f);
    }
    window[n] = noop;
    if (p) {
      clearTimeout(p);
    }
  }
  function v() {
    if (window[n]) {
      g();
    }
  }
  window[n] = function (_) {
    debug("jsonp got", _);
    g();
    if (t) {
      t(null, _);
    }
  };
  o += (~o.indexOf("?") ? "&" : "?") + a + "=" + c(n);
  o = o.replace("?&", "?");
  debug("jsonp req \"%s\"", o);
  f = document.createElement("script");
  f.src = o;
  u.parentNode.insertBefore(f, u);
  return v;
}
const jsonp$1 = getDefaultExportFromCjs(jsonp_1);
const MAILCHIMP_URL = "https://lusion.us20.list-manage.com/subscribe/post?u=ea813c53ac6d7a0b76f2e36a1&amp;id=44b41b41bf&amp;v_id=4233&amp;f_id=001e18e7f0";
const getAjaxUrl = o => o.replace("/post?", "/post-json?");