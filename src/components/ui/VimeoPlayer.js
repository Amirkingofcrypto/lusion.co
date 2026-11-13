/**
 * ============================================================================
 * Lusion Modular Component: 09-video-overlay
 * File: src/components/ui/VideoOverlay.js
 * Description: Vimeo Player SDK, TimingSrcConnector & VideoOverlay Component
 * Original Engine Lines: 32188 - 33349
 * ============================================================================
 */
const callbackMap = new WeakMap();
function storeCallback(o, e, t) {
  const r = callbackMap.get(o.element) || {};
  if (!(e in r)) {
    r[e] = [];
  }
  r[e].push(t);
  callbackMap.set(o.element, r);
}
function getCallbacks(o, e) {
  return (callbackMap.get(o.element) || {})[e] || [];
}
function removeCallback(o, e, t) {
  const r = callbackMap.get(o.element) || {};
  if (!r[e]) {
    return true;
  }
  if (!t) {
    r[e] = [];
    callbackMap.set(o.element, r);
    return true;
  }
  const n = r[e].indexOf(t);
  if (n !== -1) {
    r[e].splice(n, 1);
  }
  callbackMap.set(o.element, r);
  return r[e] && r[e].length === 0;
}
function shiftCallbacks(o, e) {
  const t = getCallbacks(o, e);
  if (t.length < 1) {
    return false;
  }
  const r = t.shift();
  removeCallback(o, e, r);
  return r;
}
function swapCallbacks(o, e) {
  const t = callbackMap.get(o);
  callbackMap.set(e, t);
  callbackMap.delete(o);
}
function parseMessageData(o) {
  if (typeof o == "string") {
    try {
      o = JSON.parse(o);
    } catch (e) {
      console.warn(e);
      return {};
    }
  }
  return o;
}
function postMessage(o, e, t) {
  if (!o.element.contentWindow || !o.element.contentWindow.postMessage) {
    return;
  }
  let r = {
    method: e
  };
  if (t !== undefined) {
    r.value = t;
  }
  const n = parseFloat(navigator.userAgent.toLowerCase().replace(/^.*msie (\d+).*$/, "$1"));
  if (n >= 8 && n < 10) {
    r = JSON.stringify(r);
  }
  o.element.contentWindow.postMessage(r, o.origin);
}
function processData(o, e) {
  e = parseMessageData(e);
  let t = [];
  let r;
  if (e.event) {
    if (e.event === "error") {
      getCallbacks(o, e.data.method).forEach(a => {
        const l = new Error(e.data.message);
        l.name = e.data.name;
        a.reject(l);
        removeCallback(o, e.data.method, a);
      });
    }
    t = getCallbacks(o, `event:${e.event}`);
    r = e.data;
  } else if (e.method) {
    const n = shiftCallbacks(o, e.method);
    if (n) {
      t.push(n);
      r = e.value;
    }
  }
  t.forEach(n => {
    try {
      if (typeof n == "function") {
        n.call(o, r);
        return;
      }
      n.resolve(r);
    } catch {}
  });
}
const oEmbedParameters = ["airplay", "audio_tracks", "audiotrack", "autopause", "autoplay", "background", "byline", "cc", "chapter_id", "chapters", "chromecast", "color", "colors", "controls", "disable_context_menu", "dnt", "end_time", "fullscreen", "height", "id", "initial_quality", "interactive_params", "keyboard", "loop", "maxheight", "max_quality", "maxwidth", "min_quality", "muted", "play_button_position", "playsinline", "portrait", "preload", "progress_bar", "quality", "quality_selector", "responsive", "skipping_forward", "speed", "start_time", "texttrack", "thumbnail_id", "title", "transcript", "transparent", "unmute_button", "url", "vimeo_logo", "volume", "watch_full_video", "width"];
function getOEmbedParameters(o, e = {}) {
  return oEmbedParameters.reduce((t, r) => {
    const n = o.getAttribute(`data-vimeo-${r}`);
    if (n || n === "") {
      t[r] = n === "" ? 1 : n;
    }
    return t;
  }, e);
}
function createEmbed(o, e) {
  let {
    html: t
  } = o;
  if (!e) {
    throw new TypeError("An element must be provided");
  }
  if (e.getAttribute("data-vimeo-initialized") !== null) {
    return e.querySelector("iframe");
  }
  const r = document.createElement("div");
  r.innerHTML = t;
  e.appendChild(r.firstChild);
  e.setAttribute("data-vimeo-initialized", "true");
  return e.querySelector("iframe");
}
function getOEmbedData(o, e = {}, t) {
  return new Promise((r, n) => {
    if (!isVimeoUrl(o)) {
      throw new TypeError(`“${o}” is not a vimeo.com url.`);
    }
    let l = `https://${getOembedDomain(o)}/api/oembed.json?url=${encodeURIComponent(o)}`;
    for (const u in e) {
      if (e.hasOwnProperty(u)) {
        l += `&${u}=${encodeURIComponent(e[u])}`;
      }
    }
    const c = "XDomainRequest" in window ? new XDomainRequest() : new XMLHttpRequest();
    c.open("GET", l, true);
    c.onload = function () {
      if (c.status === 404) {
        n(new Error(`“${o}” was not found.`));
        return;
      }
      if (c.status === 403) {
        n(new Error(`“${o}” is not embeddable.`));
        return;
      }
      try {
        const u = JSON.parse(c.responseText);
        if (u.domain_status_code === 403) {
          createEmbed(u, t);
          n(new Error(`“${o}” is not embeddable.`));
          return;
        }
        r(u);
      } catch (u) {
        n(u);
      }
    };
    c.onerror = function () {
      const u = c.status ? ` (${c.status})` : "";
      n(new Error(`There was an error fetching the embed code from Vimeo${u}.`));
    };
    c.send();
  });
}
function initializeEmbeds(o = document) {
  const e = [].slice.call(o.querySelectorAll("[data-vimeo-id], [data-vimeo-url]"));
  const t = r => {
    if ("console" in window && console.error) {
      console.error(`There was an error creating an embed: ${r}`);
    }
  };
  e.forEach(r => {
    try {
      if (r.getAttribute("data-vimeo-defer") !== null) {
        return;
      }
      const n = getOEmbedParameters(r);
      const a = getVimeoUrl(n);
      getOEmbedData(a, n, r).then(l => createEmbed(l, r)).catch(t);
    } catch (n) {
      t(n);
    }
  });
}
function resizeEmbeds(o = document) {
  if (window.VimeoPlayerResizeEmbeds_) {
    return;
  }
  window.VimeoPlayerResizeEmbeds_ = true;
  const e = t => {
    if (!isVimeoUrl(t.origin) || !t.data || t.data.event !== "spacechange") {
      return;
    }
    const r = t.source ? findIframeBySourceWindow(t.source, o) : null;
    if (r) {
      const n = r.parentElement;
      n.style.paddingBottom = `${t.data.data[0].bottom}px`;
    }
  };
  window.addEventListener("message", e);
}
function initAppendVideoMetadata(o = document) {
  if (window.VimeoSeoMetadataAppended) {
    return;
  }
  window.VimeoSeoMetadataAppended = true;
  const e = t => {
    if (!isVimeoUrl(t.origin)) {
      return;
    }
    const r = parseMessageData(t.data);
    if (!r || r.event !== "ready") {
      return;
    }
    const n = t.source ? findIframeBySourceWindow(t.source, o) : null;
    if (n && isVimeoEmbed(n.src)) {
      new Player(n).callMethod("appendVideoMetadata", window.location.href);
    }
  };
  window.addEventListener("message", e);
}
function checkUrlTimeParam(o = document) {
  if (window.VimeoCheckedUrlTimeParam) {
    return;
  }
  window.VimeoCheckedUrlTimeParam = true;
  const e = r => {
    if ("console" in window && console.error) {
      console.error(`There was an error getting video Id: ${r}`);
    }
  };
  const t = r => {
    if (!isVimeoUrl(r.origin)) {
      return;
    }
    const n = parseMessageData(r.data);
    if (!n || n.event !== "ready") {
      return;
    }
    const a = r.source ? findIframeBySourceWindow(r.source, o) : null;
    if (a && isVimeoEmbed(a.src)) {
      const l = new Player(a);
      l.getVideoId().then(c => {
        const u = new RegExp(`[?&]vimeo_t_${c}=([^&#]*)`).exec(window.location.href);
        if (u && u[1]) {
          const f = decodeURI(u[1]);
          l.setCurrentTime(f);
        }
      }).catch(e);
    }
  };
  window.addEventListener("message", t);
}
function updateDRMEmbeds() {
  if (window.VimeoDRMEmbedsUpdated) {
    return;
  }
  window.VimeoDRMEmbedsUpdated = true;
  const o = e => {
    if (!isVimeoUrl(e.origin)) {
      return;
    }
    const t = parseMessageData(e.data);
    if (!t || t.event !== "drminitfailed") {
      return;
    }
    const r = e.source ? findIframeBySourceWindow(e.source) : null;
    if (!r) {
      return;
    }
    const n = r.getAttribute("allow") || "";
    if (!n.includes("encrypted-media")) {
      r.setAttribute("allow", `${n}; encrypted-media`);
      const l = new URL(r.getAttribute("src"));
      l.searchParams.set("forcereload", "drm");
      r.setAttribute("src", l.toString());
      return;
    }
  };
  window.addEventListener("message", o);
}
function initializeScreenfull() {
  const o = function () {
    let r;
    const n = [["requestFullscreen", "exitFullscreen", "fullscreenElement", "fullscreenEnabled", "fullscreenchange", "fullscreenerror"], ["webkitRequestFullscreen", "webkitExitFullscreen", "webkitFullscreenElement", "webkitFullscreenEnabled", "webkitfullscreenchange", "webkitfullscreenerror"], ["webkitRequestFullScreen", "webkitCancelFullScreen", "webkitCurrentFullScreenElement", "webkitCancelFullScreen", "webkitfullscreenchange", "webkitfullscreenerror"], ["mozRequestFullScreen", "mozCancelFullScreen", "mozFullScreenElement", "mozFullScreenEnabled", "mozfullscreenchange", "mozfullscreenerror"], ["msRequestFullscreen", "msExitFullscreen", "msFullscreenElement", "msFullscreenEnabled", "MSFullscreenChange", "MSFullscreenError"]];
    let a = 0;
    const l = n.length;
    const c = {};
    for (; a < l; a++) {
      r = n[a];
      if (r && r[1] in document) {
        for (a = 0; a < r.length; a++) {
          c[n[0][a]] = r[a];
        }
        return c;
      }
    }
    return false;
  }();
  const e = {
    fullscreenchange: o.fullscreenchange,
    fullscreenerror: o.fullscreenerror
  };
  const t = {
    request(r) {
      return new Promise((n, a) => {
        const l = function () {
          t.off("fullscreenchange", l);
          n();
        };
        t.on("fullscreenchange", l);
        r = r || document.documentElement;
        const c = r[o.requestFullscreen]();
        if (c instanceof Promise) {
          c.then(l).catch(a);
        }
      });
    },
    exit() {
      return new Promise((r, n) => {
        if (!t.isFullscreen) {
          r();
          return;
        }
        const a = function () {
          t.off("fullscreenchange", a);
          r();
        };
        t.on("fullscreenchange", a);
        const l = document[o.exitFullscreen]();
        if (l instanceof Promise) {
          l.then(a).catch(n);
        }
      });
    },
    on(r, n) {
      const a = e[r];
      if (a) {
        document.addEventListener(a, n);
      }
    },
    off(r, n) {
      const a = e[r];
      if (a) {
        document.removeEventListener(a, n);
      }
    }
  };
  Object.defineProperties(t, {
    isFullscreen: {
      get() {
        return !!document[o.fullscreenElement];
      }
    },
    element: {
      enumerable: true,
      get() {
        return document[o.fullscreenElement];
      }
    },
    isEnabled: {
      enumerable: true,
      get() {
        return !!document[o.fullscreenEnabled];
      }
    }
  });
  return t;
}
const defaultOptions = {
  role: "viewer",
  autoPlayMuted: true,
  allowedDrift: 0.3,
  maxAllowedDrift: 1,
  minCheckInterval: 0.1,
  maxRateAdjustment: 0.2,
  maxTimeToCatchUp: 1
};
class TimingSrcConnector extends EventTarget {
  logger;
  constructor(e, t, r = {}, n) {
    super();
    this.logger = n;
    this.init(t, e, {
      ...defaultOptions,
      ...r
    });
  }
  disconnect() {
    this.dispatchEvent(new Event("disconnect"));
  }
  async init(e, t, r) {
    await this.waitForTOReadyState(e, "open");
    if (r.role === "viewer") {
      await this.updatePlayer(e, t, r);
      const n = subscribe(e, "change", () => this.updatePlayer(e, t, r));
      const a = this.maintainPlaybackPosition(e, t, r);
      this.addEventListener("disconnect", () => {
        a.cancel();
        n.cancel();
      });
    } else {
      await this.updateTimingObject(e, t);
      const n = subscribe(t, ["seeked", "play", "pause", "ratechange"], () => this.updateTimingObject(e, t), "on", "off");
      this.addEventListener("disconnect", () => n.cancel());
    }
  }
  async updateTimingObject(e, t) {
    const [r, n, a] = await Promise.all([t.getCurrentTime(), t.getPaused(), t.getPlaybackRate()]);
    e.update({
      position: r,
      velocity: n ? 0 : a
    });
  }
  async updatePlayer(e, t, r) {
    const {
      position: n,
      velocity: a
    } = e.query();
    if (typeof n == "number") {
      t.setCurrentTime(n);
    }
    if (typeof a == "number") {
      if (a === 0) {
        if ((await t.getPaused()) === false) {
          t.pause();
        }
      } else if (a > 0) {
        if ((await t.getPaused()) === true) {
          await t.play().catch(async l => {
            if (l.name === "NotAllowedError" && r.autoPlayMuted) {
              await t.setMuted(true);
              await t.play().catch(c => console.error("Couldn't play the video from TimingSrcConnector. Error:", c));
            }
          });
          this.updatePlayer(e, t, r);
        }
        if ((await t.getPlaybackRate()) !== a) {
          t.setPlaybackRate(a);
        }
      }
    }
  }
  maintainPlaybackPosition(e, t, r) {
    const {
      allowedDrift: n,
      maxAllowedDrift: a,
      minCheckInterval: l,
      maxRateAdjustment: c,
      maxTimeToCatchUp: u
    } = r;
    const f = Math.min(u, Math.max(l, a)) * 1000;
    const p = async () => {
      if (e.query().velocity === 0 || (await t.getPaused()) === true) {
        return;
      }
      const v = e.query().position - (await t.getCurrentTime());
      const _ = Math.abs(v);
      this.log(`Drift: ${v}`);
      if (_ > a) {
        await this.adjustSpeed(t, 0);
        t.setCurrentTime(e.query().position);
        this.log("Resync by currentTime");
      } else if (_ > n) {
        const T = _ / u;
        const M = c;
        const S = T < M ? (M - T) / 2 : M;
        await this.adjustSpeed(t, S * Math.sign(v));
        this.log("Resync by playbackRate");
      }
    };
    const g = setInterval(() => p(), f);
    return {
      cancel: () => clearInterval(g)
    };
  }
  log(e) {
    this.logger?.(`TimingSrcConnector: ${e}`);
  }
  speedAdjustment = 0;
  adjustSpeed = async (e, t) => {
    if (this.speedAdjustment === t) {
      return;
    }
    const r = (await e.getPlaybackRate()) - this.speedAdjustment + t;
    this.log(`New playbackRate:  ${r}`);
    await e.setPlaybackRate(r);
    this.speedAdjustment = t;
  };
  waitForTOReadyState(e, t) {
    return new Promise(r => {
      const n = () => {
        if (e.readyState === t) {
          r();
        } else {
          e.addEventListener("readystatechange", n, {
            once: true
          });
        }
      };
      n();
    });
  }
}
const playerMap = new WeakMap();
const readyMap = new WeakMap();
let screenfull = {};
class Player {
  constructor(e, t = {}) {
    if (window.jQuery && e instanceof jQuery) {
      if (e.length > 1 && window.console && console.warn) {
        console.warn("A jQuery object with multiple elements was passed, using the first element.");
      }
      e = e[0];
    }
    if (typeof document !== "undefined" && typeof e == "string") {
      e = document.getElementById(e);
    }
    if (!isDomElement(e)) {
      throw new TypeError("You must pass either a valid element or a valid id.");
    }
    if (e.nodeName !== "IFRAME") {
      const n = e.querySelector("iframe");
      if (n) {
        e = n;
      }
    }
    if (e.nodeName === "IFRAME" && !isVimeoUrl(e.getAttribute("src") || "")) {
      throw new Error("The player element passed isn’t a Vimeo embed.");
    }
    if (playerMap.has(e)) {
      return playerMap.get(e);
    }
    this._window = e.ownerDocument.defaultView;
    this.element = e;
    this.origin = "*";
    const r = new npo_src((n, a) => {
      this._onMessage = l => {
        if (!isVimeoUrl(l.origin) || this.element.contentWindow !== l.source) {
          return;
        }
        if (this.origin === "*") {
          this.origin = l.origin;
        }
        const c = parseMessageData(l.data);
        if (c && c.event === "error" && c.data && c.data.method === "ready") {
          const v = new Error(c.data.message);
          v.name = c.data.name;
          a(v);
          return;
        }
        const p = c && c.event === "ready";
        const g = c && c.method === "ping";
        if (p || g) {
          this.element.setAttribute("data-ready", "true");
          n();
          return;
        }
        processData(this, c);
      };
      this._window.addEventListener("message", this._onMessage);
      if (this.element.nodeName !== "IFRAME") {
        const l = getOEmbedParameters(e, t);
        const c = getVimeoUrl(l);
        getOEmbedData(c, l, e).then(u => {
          const f = createEmbed(u, e);
          this.element = f;
          this._originalElement = e;
          swapCallbacks(e, f);
          playerMap.set(this.element, this);
          return u;
        }).catch(a);
      }
    });
    readyMap.set(this, r);
    playerMap.set(this.element, this);
    if (this.element.nodeName === "IFRAME") {
      postMessage(this, "ping");
    }
    if (screenfull.isEnabled) {
      const n = () => screenfull.exit();
      this.fullscreenchangeHandler = () => {
        if (screenfull.isFullscreen) {
          storeCallback(this, "event:exitFullscreen", n);
        } else {
          removeCallback(this, "event:exitFullscreen", n);
        }
        this.ready().then(() => {
          postMessage(this, "fullscreenchange", screenfull.isFullscreen);
        });
      };
      screenfull.on("fullscreenchange", this.fullscreenchangeHandler);
    }
    return this;
  }
  static isVimeoUrl(e) {
    return isVimeoUrl(e);
  }
  callMethod(e) {
    for (var t = arguments.length, r = new Array(t > 1 ? t - 1 : 0), n = 1; n < t; n++) {
      r[n - 1] = arguments[n];
    }
    if (e == null) {
      throw new TypeError("You must pass a method name.");
    }
    return new npo_src((a, l) => this.ready().then(() => {
      storeCallback(this, e, {
        resolve: a,
        reject: l
      });
      if (r.length === 0) {
        r = {};
      } else if (r.length === 1) {
        r = r[0];
      }
      postMessage(this, e, r);
    }).catch(l));
  }
  get(e) {
    return new npo_src((t, r) => {
      e = getMethodName(e, "get");
      return this.ready().then(() => {
        storeCallback(this, e, {
          resolve: t,
          reject: r
        });
        postMessage(this, e);
      }).catch(r);
    });
  }
  set(e, t) {
    return new npo_src((r, n) => {
      e = getMethodName(e, "set");
      if (t == null) {
        throw new TypeError("There must be a value to set.");
      }
      return this.ready().then(() => {
        storeCallback(this, e, {
          resolve: r,
          reject: n
        });
        postMessage(this, e, t);
      }).catch(n);
    });
  }
  on(e, t) {
    if (!e) {
      throw new TypeError("You must pass an event name.");
    }
    if (!t) {
      throw new TypeError("You must pass a callback function.");
    }
    if (typeof t != "function") {
      throw new TypeError("The callback must be a function.");
    }
    if (getCallbacks(this, `event:${e}`).length === 0) {
      this.callMethod("addEventListener", e).catch(() => {});
    }
    storeCallback(this, `event:${e}`, t);
  }
  off(e, t) {
    if (!e) {
      throw new TypeError("You must pass an event name.");
    }
    if (t && typeof t != "function") {
      throw new TypeError("The callback must be a function.");
    }
    if (removeCallback(this, `event:${e}`, t)) {
      this.callMethod("removeEventListener", e).catch(n => {});
    }
  }
  loadVideo(e) {
    return this.callMethod("loadVideo", e);
  }
  ready() {
    const e = readyMap.get(this) || new npo_src((t, r) => {
      r(new Error("Unknown player. Probably unloaded."));
    });
    return npo_src.resolve(e);
  }
  addCuePoint(e, t = {}) {
    return this.callMethod("addCuePoint", {
      time: e,
      data: t
    });
  }
  removeCuePoint(e) {
    return this.callMethod("removeCuePoint", e);
  }
  enableTextTrack(e, t = null, r = true) {
    if (!e) {
      throw new TypeError("You must pass a language.");
    }
    return this.callMethod("enableTextTrack", {
      language: e,
      kind: t,
      showing: r
    });
  }
  disableTextTrack() {
    return this.callMethod("disableTextTrack");
  }
  selectAudioTrack(e, t) {
    if (!e) {
      throw new TypeError("You must pass a language.");
    }
    return this.callMethod("selectAudioTrack", {
      language: e,
      kind: t
    });
  }
  selectDefaultAudioTrack() {
    return this.callMethod("selectDefaultAudioTrack");
  }
  pause() {
    return this.callMethod("pause");
  }
  play() {
    return this.callMethod("play");
  }
  requestFullscreen() {
    if (screenfull.isEnabled) {
      return screenfull.request(this.element);
    } else {
      return this.callMethod("requestFullscreen");
    }
  }
  exitFullscreen() {
    if (screenfull.isEnabled) {
      return screenfull.exit();
    } else {
      return this.callMethod("exitFullscreen");
    }
  }
  getFullscreen() {
    if (screenfull.isEnabled) {
      return npo_src.resolve(screenfull.isFullscreen);
    } else {
      return this.get("fullscreen");
    }
  }
  requestPictureInPicture() {
    return this.callMethod("requestPictureInPicture");
  }
  exitPictureInPicture() {
    return this.callMethod("exitPictureInPicture");
  }
  getPictureInPicture() {
    return this.get("pictureInPicture");
  }
  remotePlaybackPrompt() {
    return this.callMethod("remotePlaybackPrompt");
  }
  unload() {
    return this.callMethod("unload");
  }
  destroy() {
    return new npo_src(e => {
      readyMap.delete(this);
      playerMap.delete(this.element);
      if (this._originalElement) {
        playerMap.delete(this._originalElement);
        this._originalElement.removeAttribute("data-vimeo-initialized");
      }
      if (this.element && this.element.nodeName === "IFRAME" && this.element.parentNode) {
        if (this.element.parentNode.parentNode && this._originalElement && this._originalElement !== this.element.parentNode) {
          this.element.parentNode.parentNode.removeChild(this.element.parentNode);
        } else {
          this.element.parentNode.removeChild(this.element);
        }
      }
      if (this.element && this.element.nodeName === "DIV" && this.element.parentNode) {
        this.element.removeAttribute("data-vimeo-initialized");
        const t = this.element.querySelector("iframe");
        if (t && t.parentNode) {
          if (t.parentNode.parentNode && this._originalElement && this._originalElement !== t.parentNode) {
            t.parentNode.parentNode.removeChild(t.parentNode);
          } else {
            t.parentNode.removeChild(t);
          }
        }
      }
      this._window.removeEventListener("message", this._onMessage);
      if (screenfull.isEnabled) {
        screenfull.off("fullscreenchange", this.fullscreenchangeHandler);
      }
      e();
    });
  }
  getAutopause() {
    return this.get("autopause");
  }
  setAutopause(e) {
    return this.set("autopause", e);
  }
  getBuffered() {
    return this.get("buffered");
  }
  getCameraProps() {
    return this.get("cameraProps");
  }
  setCameraProps(e) {
    return this.set("cameraProps", e);
  }
  getChapters() {
    return this.get("chapters");
  }
  getCurrentChapter() {
    return this.get("currentChapter");
  }
  getColor() {
    return this.get("color");
  }
  getColors() {
    return npo_src.all([this.get("colorOne"), this.get("colorTwo"), this.get("colorThree"), this.get("colorFour")]);
  }
  setColor(e) {
    return this.set("color", e);
  }
  setColors(e) {
    if (!Array.isArray(e)) {
      return new npo_src((n, a) => a(new TypeError("Argument must be an array.")));
    }
    const t = new npo_src(n => n(null));
    const r = [e[0] ? this.set("colorOne", e[0]) : t, e[1] ? this.set("colorTwo", e[1]) : t, e[2] ? this.set("colorThree", e[2]) : t, e[3] ? this.set("colorFour", e[3]) : t];
    return npo_src.all(r);
  }
  getCuePoints() {
    return this.get("cuePoints");
  }
  getCurrentTime() {
    return this.get("currentTime");
  }
  setCurrentTime(e) {
    return this.set("currentTime", e);
  }
  getDuration() {
    return this.get("duration");
  }
  getEnded() {
    return this.get("ended");
  }
  getLoop() {
    return this.get("loop");
  }
  setLoop(e) {
    return this.set("loop", e);
  }
  setMuted(e) {
    return this.set("muted", e);
  }
  getMuted() {
    return this.get("muted");
  }
  getPaused() {
    return this.get("paused");
  }
  getPlaybackRate() {
    return this.get("playbackRate");
  }
  setPlaybackRate(e) {
    return this.set("playbackRate", e);
  }
  getPlayed() {
    return this.get("played");
  }
  getQualities() {
    return this.get("qualities");
  }
  getQuality() {
    return this.get("quality");
  }
  setQuality(e) {
    return this.set("quality", e);
  }
  getRemotePlaybackAvailability() {
    return this.get("remotePlaybackAvailability");
  }
  getRemotePlaybackState() {
    return this.get("remotePlaybackState");
  }
  getSeekable() {
    return this.get("seekable");
  }
  getSeeking() {
    return this.get("seeking");
  }
  getTextTracks() {
    return this.get("textTracks");
  }
  getAudioTracks() {
    return this.get("audioTracks");
  }
  getEnabledAudioTrack() {
    return this.get("enabledAudioTrack");
  }
  getDefaultAudioTrack() {
    return this.get("defaultAudioTrack");
  }
  getVideoEmbedCode() {
    return this.get("videoEmbedCode");
  }
  getVideoId() {
    return this.get("videoId");
  }
  getVideoTitle() {
    return this.get("videoTitle");
  }
  getVideoWidth() {
    return this.get("videoWidth");
  }
  getVideoHeight() {
    return this.get("videoHeight");
  }
  getVideoUrl() {
    return this.get("videoUrl");
  }
  getVolume() {
    return this.get("volume");
  }
  setVolume(e) {
    return this.set("volume", e);
  }
  async setTimingSrc(e, t) {
    if (!e) {
      throw new TypeError("A Timing Object must be provided.");
    }
    await this.ready();
    const r = new TimingSrcConnector(this, e, t);
    postMessage(this, "notifyTimingObjectConnect");
    r.addEventListener("disconnect", () => postMessage(this, "notifyTimingObjectDisconnect"));
    return r;
  }
}
if (!isServerRuntime) {
  screenfull = initializeScreenfull();
  initializeEmbeds();
  resizeEmbeds();
  initAppendVideoMetadata();
  checkUrlTimeParam();
  updateDRMEmbeds();
}