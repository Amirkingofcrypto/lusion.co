class Route {
  constructor(e) {
    this.path = e;
    this.pathNodes = e ? e.split("/") : [];
    this.target = null;
    this.title = "";
    this.dom = null;
    this.scrollNavPath = "";
    this.scrollNavText = "";
    this.hasContentPreloaded = false;
    this.content = {};
  }
  setTitleDom(e, t, r, n) {
    this.title = e;
    this.dom = t;
    this.scrollNavPath = r;
    this.scrollNavText = n;
  }
  setTarget(e) {
    let t = null;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      if (n.regExp.test(this.path)) {
        t = n;
        break;
      }
    }
    if (!t) {
      console.error("route not found for path: " + this.path);
      window.location.href = BASE_PATH ? window.location.origin + BASE_PATH + "/" : window.location.origin;
      return;
    }
    this.target = t.target;
  }
}
let loc = window.location;
let ORIGIN = window.location.origin;
let URL_PREFIX_REGEX = new RegExp("^" + ORIGIN.replace(/\//g, "\\/"));
class RouteManager {
  routes = {};
  matchList = [];
  currPath = null;
  _pendingPath = null;
  queryStr;
  onRouteChanged = new MinSignal$2();
  get currRoute() {
    return this.routes[this.currPath];
  }
  init() {
    this.queryStr = loc.href.split("?")[1] || "";
    window.addEventListener("popstate", this._onStatePop.bind(this));
    this.setUrl();
  }
  addPath(e, t) {
    this.matchList.push({
      regExp: e instanceof RegExp ? e : new RegExp("^" + e + "$"),
      target: t
    });
  }
  _createRoute(e) {
    let t = this.routes[e] = new Route(e);
    t.setTarget(this.matchList);
    return t;
  }
  _fetchHtml(e) {
    let t = this.routes[e];
    if (t) {
      if (t.dom) {
        this._onDomReady(t);
      }
    } else {
      properties.loader.load(BASE_PATH ? BASE_PATH + "/" + e : "/" + e, {
        type: "text",
        onLoad: this._initDom.bind(this, this._createRoute(e))
      });
    }
  }
  _initDom(e, t) {
    let r = document;
    let n = r.title;
    if (t) {
      r = r.implementation.createHTMLDocument();
      r.body.innerHTML = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(t)[1];
      let u = /<title[^>]*>((.|[\n\r])*)<\/title>/im.exec(t);
      n = u ? u[1] : "";
    }
    let a = r.getElementById("scroll-nav-section");
    let l;
    let c;
    if (a) {
      l = a.dataset.path;
      c = r.getElementById("scroll-nav-text").innerHTML;
    }
    e.setTitleDom(n, r.querySelector(".page"), l, c);
    a.removeAttribute("data-path");
    this._attachEvents(t ? e.dom : r.documentElement);
    this._onDomReady(e);
  }
  _attachEvents(e) {
    let t = e.querySelectorAll("a");
    for (let r = 0, n = t.length; r < n; r++) {
      let a = t[r];
      if (!a.__hasClickParsed) {
        a.__hasClickParsed = true;
        let l = a.href.indexOf(window.location.origin) === 0 || a.href.indexOf("/") === 0;
        if (a.dataset.linkType) {
          l = a.dataset.linkType === "internal";
        }
        if (l) {
          a.addEventListener("mouseenter", c => {
            this.preFetch(this.parseUrl(a.href));
          });
          a.addEventListener("click", this._onInternalLinkClick.bind(this, a));
        } else {
          a.addEventListener("click", this._onRegularLinkClick.bind(this, a));
        }
      }
    }
  }
  _onRegularLinkClick(e, t) {
    let r = e.href;
    if (r.indexOf("https://player.vimeo.com/video/") === 0) {
      t.preventDefault();
      let n = r.split("/").pop();
      videoOverlay.initAndPlayVideo(n, true);
    }
  }
  _onInternalLinkClick(e, t) {
    t.preventDefault();
    let r = true;
    if (e._onPreClick) {
      r = e._onPreClick() !== false;
    }
    if (r) {
      this.setUrl(e.href);
    }
  }
  _onDomReady(e) {
    if (this._pendingPath == e.path) {
      this._pendingPath = null;
      this.onRouteChanged.dispatch(e);
    }
  }
  parseUrl(e = loc.href) {
    let t = e.replace(URL_PREFIX_REGEX, "");
    let r = t.split("#");
    r[1];
    r = r[0].split("?");
    r[1];
    t = this.parsePath(r[0]);
    return t;
  }
  parsePath(e) {
    e = e.replace(/^\/|\/$/g, "");
    const bp = (BASE_PATH || "").replace(/^\/|\/$/g, "");
    if (bp && (e === bp || e.startsWith(bp + "/"))) {
      e = e.slice(bp.length).replace(/^\/|\/$/g, "");
    }
    return e;
  }
  setUrl(e = loc.href) {
    let t = this.parseUrl(e);
    this.setPath(t);
  }
  setPath(e) {
    e = this.parsePath(e);
    if (e !== this.currPath) {
      history.pushState(null, null, (BASE_PATH ? BASE_PATH + (e ? "/" + e : "/") : e || "/") + (this.queryStr ? "?" + this.queryStr : ""));
      this._onStatePop();
    }
  }
  preFetch(e) {
    e = this.parsePath(e);
    this._fetchHtml(e);
  }
  _onStatePop(e) {
    if (e) {
      e.preventDefault();
    }
    let t = this.parseUrl();
    if (t !== this.currPath) {
      this.currPath = t;
      this._pendingPath = t;
      if (properties.hasInitialized) {
        this._fetchHtml(t);
      } else {
        this._initDom(this._createRoute(t));
      }
    }
  }
}
const routeManager = new RouteManager();
let _c1$1 = new Color();
let _c2$1 = new Color();