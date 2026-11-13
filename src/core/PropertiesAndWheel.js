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