/**
 * ============================================================================
 * Lusion Modular Component: 26-playground-page
 * File: src/components/playground/PlaygroundPage.js
 * Description: PlaygroundPage Component
 * Original Engine Lines: 45868 - 46490
 * ============================================================================
 */
var dayjs_min = {
  exports: {}
};
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    var t = 1000;
    var r = 60000;
    var n = 3600000;
    var a = "millisecond";
    var l = "second";
    var c = "minute";
    var u = "hour";
    var f = "day";
    var p = "week";
    var g = "month";
    var v = "quarter";
    var _ = "year";
    var T = "date";
    var M = "Invalid Date";
    var S = /^(\d{4})[-/]?(\d{1,2})?[-/]?(\d{0,2})[Tt\s]*(\d{1,2})?:?(\d{1,2})?:?(\d{1,2})?[.:]?(\d+)?$/;
    var b = /\[([^\]]+)]|YYYY|YY|M{1,4}|D{1,2}|d{1,4}|H{1,2}|h{1,2}|a|A|m{1,2}|s{1,2}|Z{1,2}|SSS/g;
    var C = {
      name: "en",
      weekdays: "Sunday_Monday_Tuesday_Wednesday_Thursday_Friday_Saturday".split("_"),
      months: "January_February_March_April_May_June_July_August_September_October_November_December".split("_"),
      ordinal: function (z) {
        var j = ["th", "st", "nd", "rd"];
        var X = z % 100;
        return "[" + z + (j[(X - 20) % 10] || j[X] || j[0]) + "]";
      }
    };
    function w(z, j, X) {
      var Z = String(z);
      if (!Z || Z.length >= j) {
        return z;
      } else {
        return "" + Array(j + 1 - Z.length).join(X) + z;
      }
    }
    var R = {
      s: w,
      z: function (z) {
        var j = -z.utcOffset();
        var X = Math.abs(j);
        var Z = Math.floor(X / 60);
        var q = X % 60;
        return (j <= 0 ? "+" : "-") + w(Z, 2, "0") + ":" + w(q, 2, "0");
      },
      m: function z(j, X) {
        if (j.date() < X.date()) {
          return -z(X, j);
        }
        var Z = (X.year() - j.year()) * 12 + (X.month() - j.month());
        var q = j.clone().add(Z, g);
        var ue = X - q < 0;
        var oe = j.clone().add(Z + (ue ? -1 : 1), g);
        return +(-(Z + (X - q) / (ue ? q - oe : oe - q)) || 0);
      },
      a: function (z) {
        if (z < 0) {
          return Math.ceil(z) || 0;
        } else {
          return Math.floor(z);
        }
      },
      p: function (z) {
        return {
          M: g,
          y: _,
          w: p,
          d: f,
          D: T,
          h: u,
          m: c,
          s: l,
          ms: a,
          Q: v
        }[z] || String(z || "").toLowerCase().replace(/s$/, "");
      },
      u: function (z) {
        return z === undefined;
      }
    };
    var E = "en";
    var I = {
      [E]: C
    };
    var F = "$isDayjsObject";
    function k(z) {
      return z instanceof re || !!z && !!z[F];
    }
    var L = function z(j, X, Z) {
      var q;
      if (!j) {
        return E;
      }
      if (typeof j == "string") {
        var ue = j.toLowerCase();
        if (I[ue]) {
          q = ue;
        }
        if (X) {
          I[ue] = X;
          q = ue;
        }
        var oe = j.split("-");
        if (!q && oe.length > 1) {
          return z(oe[0]);
        }
      } else {
        var te = j.name;
        I[te] = j;
        q = te;
      }
      if (!Z && q) {
        E = q;
      }
      return q || !Z && E;
    };
    function D(z, j) {
      if (k(z)) {
        return z.clone();
      }
      var X = typeof j == "object" ? j : {};
      X.date = z;
      X.args = arguments;
      return new re(X);
    }
    var ne = R;
    ne.l = L;
    ne.i = k;
    ne.w = function (z, j) {
      return D(z, {
        locale: j.$L,
        utc: j.$u,
        x: j.$x,
        $offset: j.$offset
      });
    };
    var re = function () {
      function z(X) {
        this.$L = L(X.locale, null, true);
        this.parse(X);
        this.$x = this.$x || X.x || {};
        this[F] = true;
      }
      var j = z.prototype;
      j.parse = function (X) {
        this.$d = function (Z) {
          var q = Z.date;
          var ue = Z.utc;
          if (q === null) {
            return new Date(NaN);
          }
          if (ne.u(q)) {
            return new Date();
          }
          if (q instanceof Date) {
            return new Date(q);
          }
          if (typeof q == "string" && !/Z$/i.test(q)) {
            var oe = q.match(S);
            if (oe) {
              var te = oe[2] - 1 || 0;
              var le = (oe[7] || "0").substring(0, 3);
              if (ue) {
                return new Date(Date.UTC(oe[1], te, oe[3] || 1, oe[4] || 0, oe[5] || 0, oe[6] || 0, le));
              } else {
                return new Date(oe[1], te, oe[3] || 1, oe[4] || 0, oe[5] || 0, oe[6] || 0, le);
              }
            }
          }
          return new Date(q);
        }(X);
        this.init();
      };
      j.init = function () {
        var X = this.$d;
        this.$y = X.getFullYear();
        this.$M = X.getMonth();
        this.$D = X.getDate();
        this.$W = X.getDay();
        this.$H = X.getHours();
        this.$m = X.getMinutes();
        this.$s = X.getSeconds();
        this.$ms = X.getMilliseconds();
      };
      j.$utils = function () {
        return ne;
      };
      j.isValid = function () {
        return this.$d.toString() !== M;
      };
      j.isSame = function (X, Z) {
        var q = D(X);
        return this.startOf(Z) <= q && q <= this.endOf(Z);
      };
      j.isAfter = function (X, Z) {
        return D(X) < this.startOf(Z);
      };
      j.isBefore = function (X, Z) {
        return this.endOf(Z) < D(X);
      };
      j.$g = function (X, Z, q) {
        if (ne.u(X)) {
          return this[Z];
        } else {
          return this.set(q, X);
        }
      };
      j.unix = function () {
        return Math.floor(this.valueOf() / 1000);
      };
      j.valueOf = function () {
        return this.$d.getTime();
      };
      j.startOf = function (X, Z) {
        var q = this;
        var ue = !!ne.u(Z) || Z;
        var oe = ne.p(X);
        function te(ve, de) {
          var xe = ne.w(q.$u ? Date.UTC(q.$y, de, ve) : new Date(q.$y, de, ve), q);
          if (ue) {
            return xe;
          } else {
            return xe.endOf(f);
          }
        }
        function le(ve, de) {
          return ne.w(q.toDate()[ve].apply(q.toDate("s"), (ue ? [0, 0, 0, 0] : [23, 59, 59, 999]).slice(de)), q);
        }
        var Te = this.$W;
        var K = this.$M;
        var G = this.$D;
        var U = "set" + (this.$u ? "UTC" : "");
        switch (oe) {
          case _:
            if (ue) {
              return te(1, 0);
            } else {
              return te(31, 11);
            }
          case g:
            if (ue) {
              return te(1, K);
            } else {
              return te(0, K + 1);
            }
          case p:
            var N = this.$locale().weekStart || 0;
            var he = (Te < N ? Te + 7 : Te) - N;
            return te(ue ? G - he : G + (6 - he), K);
          case f:
          case T:
            return le(U + "Hours", 0);
          case u:
            return le(U + "Minutes", 1);
          case c:
            return le(U + "Seconds", 2);
          case l:
            return le(U + "Milliseconds", 3);
          default:
            return this.clone();
        }
      };
      j.endOf = function (X) {
        return this.startOf(X, false);
      };
      j.$set = function (X, Z) {
        var q;
        var ue = ne.p(X);
        var oe = "set" + (this.$u ? "UTC" : "");
        var te = (q = {}, q[f] = oe + "Date", q[T] = oe + "Date", q[g] = oe + "Month", q[_] = oe + "FullYear", q[u] = oe + "Hours", q[c] = oe + "Minutes", q[l] = oe + "Seconds", q[a] = oe + "Milliseconds", q)[ue];
        var le = ue === f ? this.$D + (Z - this.$W) : Z;
        if (ue === g || ue === _) {
          var Te = this.clone().set(T, 1);
          Te.$d[te](le);
          Te.init();
          this.$d = Te.set(T, Math.min(this.$D, Te.daysInMonth())).$d;
        } else if (te) {
          this.$d[te](le);
        }
        this.init();
        return this;
      };
      j.set = function (X, Z) {
        return this.clone().$set(X, Z);
      };
      j.get = function (X) {
        return this[ne.p(X)]();
      };
      j.add = function (X, Z) {
        var q;
        var ue = this;
        X = Number(X);
        var oe = ne.p(Z);
        function te(K) {
          var G = D(ue);
          return ne.w(G.date(G.date() + Math.round(K * X)), ue);
        }
        if (oe === g) {
          return this.set(g, this.$M + X);
        }
        if (oe === _) {
          return this.set(_, this.$y + X);
        }
        if (oe === f) {
          return te(1);
        }
        if (oe === p) {
          return te(7);
        }
        var le = (q = {}, q[c] = r, q[u] = n, q[l] = t, q)[oe] || 1;
        var Te = this.$d.getTime() + X * le;
        return ne.w(Te, this);
      };
      j.subtract = function (X, Z) {
        return this.add(X * -1, Z);
      };
      j.format = function (X) {
        var Z = this;
        var q = this.$locale();
        if (!this.isValid()) {
          return q.invalidDate || M;
        }
        var ue = X || "YYYY-MM-DDTHH:mm:ssZ";
        var oe = ne.z(this);
        var te = this.$H;
        var le = this.$m;
        var Te = this.$M;
        var K = q.weekdays;
        var G = q.months;
        var U = q.meridiem;
        function N(de, xe, ee, Ue) {
          return de && (de[xe] || de(Z, ue)) || ee[xe].slice(0, Ue);
        }
        function he(de) {
          return ne.s(te % 12 || 12, de, "0");
        }
        var ve = U || function (de, xe, ee) {
          var Ue = de < 12 ? "AM" : "PM";
          if (ee) {
            return Ue.toLowerCase();
          } else {
            return Ue;
          }
        };
        return ue.replace(b, function (de, xe) {
          return xe || function (ee) {
            switch (ee) {
              case "YY":
                return String(Z.$y).slice(-2);
              case "YYYY":
                return ne.s(Z.$y, 4, "0");
              case "M":
                return Te + 1;
              case "MM":
                return ne.s(Te + 1, 2, "0");
              case "MMM":
                return N(q.monthsShort, Te, G, 3);
              case "MMMM":
                return N(G, Te);
              case "D":
                return Z.$D;
              case "DD":
                return ne.s(Z.$D, 2, "0");
              case "d":
                return String(Z.$W);
              case "dd":
                return N(q.weekdaysMin, Z.$W, K, 2);
              case "ddd":
                return N(q.weekdaysShort, Z.$W, K, 3);
              case "dddd":
                return K[Z.$W];
              case "H":
                return String(te);
              case "HH":
                return ne.s(te, 2, "0");
              case "h":
                return he(1);
              case "hh":
                return he(2);
              case "a":
                return ve(te, le, true);
              case "A":
                return ve(te, le, false);
              case "m":
                return String(le);
              case "mm":
                return ne.s(le, 2, "0");
              case "s":
                return String(Z.$s);
              case "ss":
                return ne.s(Z.$s, 2, "0");
              case "SSS":
                return ne.s(Z.$ms, 3, "0");
              case "Z":
                return oe;
            }
            return null;
          }(de) || oe.replace(":", "");
        });
      };
      j.utcOffset = function () {
        return -Math.round(this.$d.getTimezoneOffset() / 15) * 15;
      };
      j.diff = function (X, Z, q) {
        var ue;
        var oe = this;
        var te = ne.p(Z);
        var le = D(X);
        var Te = (le.utcOffset() - this.utcOffset()) * r;
        var K = this - le;
        function G() {
          return ne.m(oe, le);
        }
        switch (te) {
          case _:
            ue = G() / 12;
            break;
          case g:
            ue = G();
            break;
          case v:
            ue = G() / 3;
            break;
          case p:
            ue = (K - Te) / 604800000;
            break;
          case f:
            ue = (K - Te) / 86400000;
            break;
          case u:
            ue = K / n;
            break;
          case c:
            ue = K / r;
            break;
          case l:
            ue = K / t;
            break;
          default:
            ue = K;
        }
        if (q) {
          return ue;
        } else {
          return ne.a(ue);
        }
      };
      j.daysInMonth = function () {
        return this.endOf(g).$D;
      };
      j.$locale = function () {
        return I[this.$L];
      };
      j.locale = function (X, Z) {
        if (!X) {
          return this.$L;
        }
        var q = this.clone();
        var ue = L(X, Z, true);
        if (ue) {
          q.$L = ue;
        }
        return q;
      };
      j.clone = function () {
        return ne.w(this.$d, this);
      };
      j.toDate = function () {
        return new Date(this.valueOf());
      };
      j.toJSON = function () {
        if (this.isValid()) {
          return this.toISOString();
        } else {
          return null;
        }
      };
      j.toISOString = function () {
        return this.$d.toISOString();
      };
      j.toString = function () {
        return this.$d.toUTCString();
      };
      return z;
    }();
    var ce = re.prototype;
    D.prototype = ce;
    [["$ms", a], ["$s", l], ["$m", c], ["$H", u], ["$W", f], ["$M", g], ["$y", _], ["$D", T]].forEach(function (z) {
      ce[z[1]] = function (j) {
        return this.$g(j, z[0], z[1]);
      };
    });
    D.extend = function (z, j) {
      if (!z.$i) {
        z(j, re, D);
        z.$i = true;
      }
      return D;
    };
    D.locale = L;
    D.isDayjs = k;
    D.unix = function (z) {
      return D(z * 1000);
    };
    D.en = I[E];
    D.Ls = I;
    D.p = {};
    return D;
  });
})(dayjs_min);
var dayjs_minExports = dayjs_min.exports;
const dayjs = getDefaultExportFromCjs(dayjs_minExports);
class PlaygroundPage extends Page {
  path = "playground";
  id = "playground";
  mesh = null;
  container = new Object3D();
  events = [{
    date: dayjs("2019-01-25")
  }, {
    date: dayjs("2019-09-25")
  }, {
    date: dayjs("2022-04-25")
  }];
  domEvents = [];
  preInit() {
    let e = this.domContainer;
    this.domMain = e.querySelector("#playground-main");
    this.domInner = e.querySelector("#playground-main-inner");
    this.domTimeline = e.querySelector("#playground-main-timeline");
    this.domTimelineLine = e.querySelector("#playground-main-timeline-line");
    this.domTimelineLineProgress = e.querySelector("#playground-main-timeline-line-progress");
    for (let t = 0; t < this.events.length; t++) {
      let r = document.createElement("div");
      r.classList.add("playground-main-timeline-event");
      let n = document.createElement("div");
      n.classList.add("playground-main-timeline-dot");
      n.addEventListener("mouseenter", this._onDomDotMouseenter.bind(this));
      n.addEventListener("mouseleave", this._onDomDotMouseleave.bind(this));
      let a = document.createElement("div");
      a.classList.add("playground-main-timeline-text");
      a.innerHTML = this.events[t].date.format("YY MMMM'DD");
      r.append(a);
      r.append(n);
      this.domTimeline.append(r);
      this.domEvents[t] = r;
    }
    properties.loader.add(settings.MODEL_PATH + "playground/tunnel.buf", {
      onLoad: t => {
        this._onTunnelLoad(t);
      }
    });
  }
  init() {
    this.domTimeline.addEventListener("click", this._onDomTimelineClick.bind(this));
  }
  resize(e, t) {
    let r = Number(getComputedStyle(this.domMain).getPropertyValue("padding-left").split("px")[0]);
    let n = this.events[this.events.length - 1].date.diff(this.events[0].date, "day");
    let a = properties.viewportWidth - r * 2;
    this.offsetRatio = r / properties.viewportWidth;
    this.domMain._height = this.domMain.getBoundingClientRect().height - properties.viewportHeight;
    for (let l = 0; l < this.domEvents.length; l++) {
      let c = this.domEvents[l];
      let p = this.events[l].date.diff(this.events[0].date, "day") / n;
      c._ratio = math.fit(p, 0, 1, this.offsetRatio, 1 - this.offsetRatio);
      c.style.left = p * a + r + "px";
    }
  }
  update(e) {
    super.update(e);
    let t = scrollManager.getDomRange(this.domContainer);
    let r = math.fit(t.screenRatio, -0.5, 0.5, 0, 1);
    if (r < 1) {
      this.domInner.style.transform = `translate3d(0, ${-scrollManager.y}px, 0)`;
      this.domTimelineLineProgress.style.transform = `scale3d(${r}, 1, 1)`;
      for (let n = 0; n < this.domEvents.length; n++) {
        let a = this.domEvents[n];
        if (r >= a._ratio) {
          a.classList.add("--active");
        } else {
          a.classList.remove("--active");
        }
      }
    }
  }
  _onTunnelLoad(e) {
    this.mesh = new Mesh(e, new MeshNormalMaterial());
    this.container.add(this.mesh);
  }
  _onDomTimelineClick(e) {
    let t = e.clientX / properties.viewportWidth;
    scrollManager.scrollToPixel(t * this.domMain._height);
  }
  _onDomDotMouseenter(e) {
    e.target.closest(".playground-main-timeline-event").classList.add("--hover");
  }
  _onDomDotMouseleave(e) {
    e.target.closest(".playground-main-timeline-event").classList.remove("--hover");
  }
}
const playgroundPage = new PlaygroundPage();
var FLUID_CELL = 0;
var AIR_CELL = 1;
var SOLID_CELL = 2;
var EMIT_RATE = 2000;
let _v0 = new Vector2();
let _v1 = new Vector2();
let _v2 = new Vector2();
function clamp(o, e, t) {
  if (o < e) {
    return e;
  } else if (o > t) {
    return t;
  } else {
    return o;
  }
}
