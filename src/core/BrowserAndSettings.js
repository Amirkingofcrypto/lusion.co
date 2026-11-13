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