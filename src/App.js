/**
 * ============================================================================
 * Lusion Modular Component: 31-app-preloader-bootstrap
 * File: src/App.js
 * Description: App, Preloader, Links, UI, FontItem & Main Render Loop Bootstrap
 * Original Engine Lines: 51304 - 51886
 * ============================================================================
 */
class App {
  initEngine() {
    properties.canvas = document.getElementById("canvas");
    properties.isSupported = support.isSupported();
    if (properties.isSupported) {
      properties.loader.register(BufItem);
      properties.loader.register(EXRItem);
      properties.loader.register(TextureItem);
      properties.loader.register(ThreeLoaderItem);
      properties.renderer = new WebGLRenderer({
        canvas: properties.canvas,
        context: properties.gl,
        premultipliedAlpha: false
      });
      properties.scene = new Scene();
      properties.camera = new PerspectiveCamera(45, 1, 0.1, 200);
      properties.scene.add(properties.camera);
      properties.sharedUniforms.u_resolution.value = properties.resolution = new Vector2();
      properties.sharedUniforms.u_viewportResolution.value = properties.viewportResolution = new Vector2();
      properties.sharedUniforms.u_bgColor.value = properties.bgColor = new Color();
      shaderHelper.addChunk("textureBicubic", textureBicubicShader);
      fboHelper.init(properties.renderer, settings.RENDER_TARGET_FLOAT_TYPE);
      textureHelper.init();
      properties.postprocessing = new Postprocessing();
      properties.postprocessing.init();
      blueNoise.preInit();
      glPositionOffset.init();
      screenPaint.init();
      properties.smaa = new Smaa();
      properties.smaa.init();
      properties.smaa.setTextures(properties.loader.add(settings.TEXTURE_PATH + "smaa-area.png", {
        weight: 32
      }).content, properties.loader.add(settings.TEXTURE_PATH + "smaa-search.png", {
        weight: 0.1
      }).content);
      properties.postprocessing.queue.push(properties.smaa);
      let e = !browser$1.isMobile || settings.USE_HD;
      properties.bloom = new Bloom();
      properties.bloom.init({
        USE_CONVOLUTION: e,
        USE_HD: e
      });
      properties.postprocessing.queue.push(properties.bloom);
      properties.screenPaintDistortion = new ScreenPaintDistortion();
      properties.screenPaintDistortion.init({
        screenPaint
      });
      properties.postprocessing.queue.push(properties.screenPaintDistortion);
      properties.final = new Final();
      properties.final.init();
      properties.postprocessing.queue.push(properties.final);
      if (settings.UP_SCALE > 1) {
        properties.upscaler = new Fsr();
        properties.upscaler.init();
        properties.postprocessing.queue.push(properties.upscaler);
      }
      preUfx.init();
      properties.postprocessing.queue.push(preUfx);
      postUfx.init();
      properties.postprocessing.queue.push(postUfx);
    }
  }
  preInit() {
    if (!settings.WEBGL_OFF) {
      cameraControls.preInit();
      visuals.preInit();
      audios.preInit();
    }
  }
  init() {
    if (!settings.WEBGL_OFF) {
      if (properties.smaa) {
        properties.smaa.updateTextures();
      }
      cameraControls.init();
      visuals.init();
      audios.init();
      if (settings.IS_DEV === false) {
        if (console.clear) {
          console.clear();
        }
        console.log("%c Created by Lusion: /", "border:2px solid gray; padding:5px; font-family:monospace; font-size:11px;");
      }
    }
  }
  start() {
    visuals.start();
  }
  resize(e, t) {
    if (!settings.WEBGL_OFF) {
      properties.renderer.setSize(e, t);
      properties.canvas.style.width = `${properties.viewportWidth}px`;
      properties.canvas.style.height = `${properties.viewportHeight}px`;
      properties.camera.aspect = properties.width / properties.height;
      properties.sharedUniforms.u_aspect.value = properties.camera.aspect;
      properties.camera.updateProjectionMatrix();
      properties.postprocessing.setSize(properties.width, properties.height);
      screenPaint.resize(properties.width, properties.height);
      visuals.resize(properties.width, properties.height);
    }
  }
  preUpdate(e = 0) {
    visuals.deactivateAll();
  }
  update(e = 0) {
    if (!settings.WEBGL_OFF) {
      properties.time = properties.sharedUniforms.u_time.value += e;
      properties.deltaTime = properties.sharedUniforms.u_deltaTime.value = e;
      visuals.syncProperties(e);
      blueNoise.update(e);
      screenPaint.update(e);
      cameraControls.update(e);
      visuals.update(e);
      audios.update(e);
      properties.renderer.setClearColor(properties.bgColor, properties.clearAlpha);
      properties.bgColor.setStyle(properties.bgColorHex);
      aboutPageHeroEfxPrepass.isActive = aboutHero.isActive;
      aboutPageHeroEfx.isActive = aboutHero.isActive;
      goalTunnelEfx.isActive = goalTunnels.isActive;
      properties.bloom.amount = properties.bloomAmount;
      properties.bloom.radius = properties.bloomRadius;
      properties.bloom.threshold = properties.bloomThreshold;
      properties.bloom.smoothWidth = properties.bloomSmoothWidth;
      properties.bloom.haloWidth = properties.haloWidth;
      properties.bloom.haloRGBShift = properties.haloRGBShift;
      properties.bloom.haloStrength = properties.haloStrength;
      properties.bloom.haloMaskInner = properties.haloMaskInner;
      properties.bloom.haloMaskOuter = properties.haloMaskOuter;
      properties.bloom.saturation = properties.bloomSaturation;
      properties.bloom.highPassMultiplier = properties.bloomHighPassMultiplier * (properties.bloom.USE_CONVOLUTION ? 1 : 1.5);
      properties.final.isActive = properties.useFinal;
      properties.final.vignetteFrom = properties.vignetteFrom;
      properties.final.vignetteTo = properties.vignetteTo;
      properties.final.vignetteColor.setStyle(properties.vignetteColorHex);
      properties.final.saturation = properties.saturation;
      properties.final.contrast = properties.contrast;
      properties.final.brightness = properties.brightness;
      properties.final.tintColor.setStyle(properties.tintColorHex);
      properties.final.tintOpacity = properties.tintOpacity;
      properties.final.bgColor.setStyle(properties.bgColorHex);
      properties.final.opacity = properties.opacity;
      screenPaint.needsMouseDown = properties.screenPaintNeedsMouseDown;
      screenPaint.minRadius = 0;
      screenPaint.maxRadius = Math.max(40, properties.viewportWidth / 20);
      screenPaint.radiusDistanceRange = properties.screenPaintRadiusDistanceRange;
      screenPaint.pushStrength = properties.screenPaintPushStrength;
      screenPaint.velocityDissipation = properties.screenPaintVelocityDissipation;
      screenPaint.weight1Dissipation = properties.screenPaintWeight1Dissipation;
      screenPaint.weight2Dissipation = properties.screenPaintWeight2Dissipation;
      screenPaint.useNoise = properties.screenPaintUseNoise;
      screenPaint.curlScale = properties.screenPaintCurlScale;
      screenPaint.curlStrength = properties.screenPaintCurlStrength;
      properties.screenPaintDistortion.amount = properties.screenPaintDistortionAmount;
      properties.screenPaintDistortion.rgbShift = properties.screenPaintDistortionRGBShift;
      properties.screenPaintDistortion.colorMultiplier = properties.screenPaintDistortionColorMultiplier;
      properties.screenPaintDistortion.multiplier = properties.screenPaintDistortionMultiplier;
      if (properties.upscaler) {
        properties.upscaler.sharpness = properties.upscalerSharpness;
      }
      if (transitionOverlay.activeRatio < 1) {
        properties.postprocessing.render(visuals.currentStage3D, properties.camera, true);
      }
      if (window.__debugTexture) {
        fboHelper.debugTo(window.__debugTexture);
      }
    }
  }
}
const app = new App();
class Preloader {
  percentTarget = 0;
  percent = 0;
  percentToStart = 0;
  DELAY = 1.5;
  MIN_PRELOAD_DURATION = 1;
  PERCENT_BETWEEN_INIT_AND_START = 0.3;
  MIN_DURATION_BETWEEN_INIT_AND_START = 0.25;
  HIDE_DURATION = 0.5;
  isActive = false;
  lineTransformTime = 0;
  digitsWidth = 0;
  preInit() {
    this.domContainer = document.getElementById("preloader");
    this.domDigitsContainer = document.getElementById("preloader-percent-digits");
    this.domDigits = document.querySelectorAll(".preloader-percent-digit");
    for (let e = 0; e < this.domDigits.length; e++) {
      let t = this.domDigits[e];
      t._domNums = t.querySelectorAll(".preloader-percent-digit-num");
      t._easedVal = 0;
    }
  }
  init() {}
  show(e, t) {
    this._initCallback = e;
    this._startCallback = t;
    this.isActive = true;
    properties.loader.start(r => {
      this.percentTarget = r;
    });
  }
  hide() {}
  resize(e, t, r) {
    if (r !== true) {
      this.digitsWidth = this.domDigitsContainer.offsetWidth;
    }
  }
  update(e) {
    if (!this.isActive) {
      return;
    }
    this._watchdog = (this._watchdog || 0) + e;
    if (this._watchdog > 3) {
      this.percentTarget = 1;
    }
    if (this._watchdog > 5) {
      this.percentToStart = 1;
      taskManager.percent = 1;
    }
    this.percent = Math.min(this.percentTarget, this.percent + (settings.SKIP_ANIMATION ? 1 : this.percentTarget > this.percent ? e : 0) / this.MIN_PRELOAD_DURATION);
    if (this.percentTarget == 1) {
      if (!properties.hasInitialized) {
        this._initCallback();
      }
      this.percentToStart = settings.SKIP_ANIMATION ? 1 : Math.min(taskManager.percent, this.percentToStart + e / this.MIN_DURATION_BETWEEN_INIT_AND_START);
    }
    let t = this.percentToStart * this.PERCENT_BETWEEN_INIT_AND_START + this.percent * (1 - this.PERCENT_BETWEEN_INIT_AND_START);
    let r = 0;
    if (t == 1) {
      this.lineTransformTime += settings.SKIP_ANIMATION ? 1 : e;
      r = ease.expoInOut(math.saturate(this.lineTransformTime));
    }
    if (r == 1 && !properties.hasStarted) {
      this._startCallback();
    }
    let n = settings.SKIP_ANIMATION ? +properties.hasStarted : math.saturate(properties.startTime);
    for (let a = 0; a < this.domDigits.length; a++) {
      let l = this.domDigits[a];
      let c = Math.floor(t * 100 / Math.pow(10, this.domDigits.length - a - 1));
      l._easedVal = math.mix(l._easedVal, c, 1 - Math.exp(e * -7));
      if (c - l._easedVal < 0.01) {
        l._easedVal = c;
      }
      let u = l._easedVal % 10;
      let f = Math.floor(u);
      let p = Math.ceil(u) % 10;
      let g = u - f;
      l._domNums[0].innerHTML = f;
      l._domNums[1].innerHTML = p;
      l.style.transform = "translateY(" + -(g - ease.expoInOut(math.saturate(n * 1.2 - a * 0.2 / (this.domDigits.length - 1)))) * 50 + "%) translateY(-0.05em)";
    }
    transitionOverlay.loadBarRatio = t;
    transitionOverlay.lineTransformRatio = r;
    transitionOverlay.contentShowRatio = n;
    if (n == 1) {
      this.domContainer.style.display = "none";
      this.isActive = false;
    }
  }
}
const preloader = new Preloader();
class Links {
  links = [];
  preInit() {
    Array.from(document.querySelectorAll(".is-link")).forEach(t => {
      const r = {
        el: t,
        canvas: document.createElement("canvas"),
        context: null,
        ratio: 0,
        animating: false,
        color: t.classList.contains("is-email") ? "#000000" : "#ffffff"
      };
      r.context = r.canvas.getContext("2d");
      r.el.style.position = "relative";
      r.el.style.width = "fit-content";
      r.canvas.style.position = "absolute";
      r.canvas.style.left = "0";
      r.canvas.style.top = "0";
      r.canvas.style.pointerEvents = "none";
      r.el.append(r.canvas);
      this.links.push(r);
    });
  }
  init() {
    this.links.forEach(e => {
      e.el.addEventListener("mouseenter", this._onLinkMouseenter.bind(this));
      e.el.addEventListener("mouseleave", this._onLinkMouseleave.bind(this));
    });
  }
  resize() {
    this.links.forEach(e => {
      const t = e.el.getBoundingClientRect();
      e._width = t.width;
      e._height = t.height;
      e.canvas.width = e._width * settings.DPR;
      e.canvas.height = e._height * settings.DPR;
      e.canvas.style.width = e._width + "px";
      e.canvas.style.height = e._height + "px";
    });
  }
  update(e) {
    this.links.forEach(t => {
      let r = t.ratio;
      t.ratio = math.saturate(t.ratio + (t.animating ? 1 : -1) * e * 3);
      if (t.ratio !== 0 || r !== t.ratio) {
        const n = ease.quadInOut(t.ratio);
        const a = ease.quadOut(Math.abs(t.ratio * 2 - 1));
        t.context.save();
        t.context.scale(settings.DPR, settings.DPR);
        t.context.lineWidth = 2;
        t.context.strokeStyle = t.color;
        t.context.clearRect(0, 0, t._width, t._height);
        t.context.beginPath();
        t.context.moveTo(0, t._height - t.context.lineWidth / 2);
        t.context.arcTo(t._width * n, t._height - t.context.lineWidth / 2, t._width * n, t._height - t.context.lineWidth / 2 - 1, (1 - a) * 30);
        t.context.stroke();
        t.context.restore();
      }
    });
  }
  _onLinkMouseenter(e) {
    const t = this.links.filter(r => r.el === e.target)[0];
    t.animating = true;
  }
  _onLinkMouseleave(e) {
    const t = this.links.filter(r => r.el === e.target)[0];
    t.animating = false;
  }
}
const links = new Links();
new Color();
class UI {
  domSectionsContainer = document.querySelector("#page-container");
  preInit() {
    if (!settings.WEBGL_OFF) {
      document.documentElement.classList.add("is-ready");
    }
    transitionOverlay.init();
    preloader.preInit();
    header.preInit();
    links.preInit();
    pageExtraSections.preInit();
  }
  preload(e, t) {
    preloader.show(e, t);
  }
  init() {
    header.init();
    links.init();
    pageExtraSections.init();
  }
  start() {
    preloader.hide();
    header.show();
  }
  resize(e, t, r) {
    transitionOverlay.resize(e, t);
    preloader.resize(e, t, r);
    links.resize(e, t);
    header.resize(e, t);
    pageExtraSections.resize(e, t);
    videoOverlay.resize(e, t);
    const a = getComputedStyle(document.documentElement).getPropertyValue("--global-border-radius").split("px")[0];
    properties.globalRadius = properties.sharedUniforms.u_globalRadius.value = parseInt(a);
  }
  update(e) {
    preloader.update(e);
    transitionOverlay.update(e);
    links.update(e);
    header.update(e);
    pageExtraSections.update(e);
    videoOverlay.update(e);
  }
}
const ui = new UI();
const AnyItem = properties.loader.ITEM_CLASSES.any;
class FontItem extends AnyItem {
  constructor(e, t) {
    if (!FontItem.dom) {
      FontItem.initDom();
    }
    t.loadFunc = () => {};
    t.hasLoading = t.hasLoading === undefined ? true : t.hasLoading;
    t.refText = "refing something...";
    t.refFontSize = t.refFontSize || 120;
    t.refFont = "Helvetica, Arial, FreeSans, Garuda, sans-serif";
    t.interval = t.interval || 20;
    t.refTextWidth = 0;
    super(e, t);
    this.loadFunc = this._loadFunc.bind(this);
  }
  static dom;
  static initDom() {
    let e = document.createElement("dom");
    e.style.position = "fixed";
    e.style.left = e.style.top = 0;
    e.style.visibility = "hidden";
    document.body.appendChild(e);
    FontItem.dom = e;
  }
  _loadFunc(e, t, r) {
    let n = e.split(",");
    let a = [];
    for (let g = 0; g < n.length; g++) {
      a.push(n[g].trim());
    }
    n = this.refFont.split(":");
    let l = n[0];
    let c = n[1] || "normal";
    let u = n[2] || "normal";
    let f;
    let p = a.length;
    f = setInterval(() => {
      n = a[0].split(":");
      l = n[0];
      c = n[1] || "normal";
      u = n[2] || "normal";
      let g = this._getTextWidth(l, c, u, this.refFont);
      let v = this._getTextWidth(this.refFont, c, u, this.refFont);
      if (g !== v) {
        a.shift();
        r.dispatch((p - a.length) / p);
        if (a.length === 0) {
          clearInterval(f);
          t();
        }
      }
    }, this.interval);
  }
  _getTextWidth = (e, t, r, n) => {
    let a = FontItem.dom;
    a.style.fontFamily = "\"" + e + "\"" + (n ? ", " + n : "");
    a.style.fontWeight = t;
    a.style.fontStyle = r;
    a.innerHTML = this.refText;
    return a.getBoundingClientRect().width;
  };
  _onLoaderLoad(e, t) {
    this.content = t;
    e(t);
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
FontItem.type = "font";
FontItem.extensions = [];
let dateTime = performance.now();
let _needsResize = false;
function preRun() {
  for (const [o, e] of Object.entries(settings.CROSS_ORIGINS)) {
    properties.loader.setCrossOrigin(o, e);
  }
  routeManager.init();
  properties.loader.register(FontItem);
  properties.loader.add("Aeonik:400", {
    type: "font"
  });
  properties.loader.start(o => {
    if (o === 1) {
      run();
    }
  });
}
function run() {
  let o = properties.viewportWidth = window.innerWidth;
  let e = properties.viewportHeight = window.innerHeight;
  properties.viewportResolution = new Vector2(o, e);
  properties.width = o;
  properties.height = e;
  properties.loader.add("Aeonik:500,Aeonik:400:italic,IBMPlexMono:400,IBMPlexMono:500,LusionMono:400", {
    type: "font"
  });
  app.initEngine();
  input.preInit();
  scrollManager.init();
  pagesManager.preInit();
  ui.preInit();
  app.preInit();
  window.addEventListener("resize", onResize);
  _onResize();
  loop();
  ui.preload(init, start);
}
function init() {
  input.init();
  pagesManager.init();
  ui.init();
  app.init();
  properties.hasInitialized = true;
}
function start() {
  ui.start();
  pagesManager.start();
  app.start();
  properties.hasStarted = true;
  _onResize(true);
  scrollManager.isActive = true;
  if (settings.JUMP_SECTION !== "") {
    scrollManager.scrollTo(settings.JUMP_SECTION, settings.JUMP_OFFSET, true);
  }
}
function onResize() {
  _needsResize = true;
}
function _onResize(o) {
  let e = properties.viewportWidth = window.innerWidth;
  let t = properties.viewportHeight = window.innerHeight;
  properties.viewportResolution.set(e, window.innerHeight);
  properties.useMobileLayout = e <= settings.MOBILE_WIDTH;
  document.documentElement.style.setProperty("--vh", t * 0.01 + "px");
  let r = e * settings.DPR;
  let n = t * settings.DPR;
  if (settings.USE_PIXEL_LIMIT === true && r * n > settings.MAX_PIXEL_COUNT) {
    let a = r / n;
    n = Math.sqrt(settings.MAX_PIXEL_COUNT / a);
    r = Math.ceil(n * a);
    n = Math.ceil(n);
  }
  properties.width = r;
  properties.height = n;
  properties.webglDPR = properties.width / e;
  properties.resolution.set(properties.width, properties.height);
  if (!o) {
    input.resize();
  }
  scrollManager.resize(e, t);
  pagesManager.resize(e, t);
  ui.resize(e, t, o);
  app.resize(Math.ceil(r * properties.upscalerAmount), Math.ceil(n * properties.upscalerAmount));
  scrollManager.resize(e, t);
}
function update(o) {
  scrollManager.autoScrollSpeed = properties.autoScrollSpeed;
  if (window.__AUTO_SCROLL__) {
    scrollManager.autoScrollSpeed = window.__AUTO_SCROLL__;
  }
  taskManager.update();
  properties.reset();
  app.preUpdate(o);
  input.update(o);
  scrollManager.update(o);
  pagesManager.update(o);
  ui.update(o);
  app.update(o);
  input.postUpdate(o);
}
function loop() {
  window.requestAnimationFrame(loop);
  let o = performance.now();
  let e = (o - dateTime) / 1000;
  dateTime = o;
  e = Math.min(e, 1 / 20);
  if (_needsResize) {
    _onResize();
  }
  if (properties.hasStarted) {
    properties.startTime += e;
  }
  Tween.autoUpdate(e);
  update(e);
  _needsResize = false;
}
preRun();
if (!Object.assign) {
  document.documentElement.classList.add("not-supported not-supported--browser");
}
document.documentElement.classList.remove("no-js");
if (/(ipad|iphone|android)/i.test((navigator.userAgent || navigator.vendor).toLowerCase())) {
  document.documentElement.classList.add("is-mobile");
} else {
  document.documentElement.classList.add("is-desktop");
}
function preventZoom(o) {
  o.preventDefault();
  document.body.style.zoom = 1;
}
window.addEventListener("wheel", o => o.preventDefault(), {
  passive: false
});
document.addEventListener("gesturestart", o => preventZoom(o));
document.addEventListener("gesturechange", o => preventZoom(o));
document.addEventListener("gestureend", o => preventZoom(o));

// Expose Modular Component Instances for runtime inspection and control
window.LusionModules = {
  properties,
  settings,
  support,
  app,
  preloader,
  ui,
  links,
  header,
  footerSection,
  endSection,
  scrollNavSection,
  pageExtraSections,
  transitionOverlay,
  videoOverlay,
  pagesManager,
  routeManager,
  scrollManager,
  cameraControls,
  postprocessing: properties.postprocessing,
  home: {
    page: homePage,
    heroSection: homeHeroSection,
    balloons: homeBalloons,
    balloonsPhysics: homeBalloonsPhysics,
    balloonsBackground: homeBalloonsBackground,
    reelSection: homeReelSection,
    featuredSection: homeFeaturedSection,
    goalSection: homeGoalSection,
    goalTunnels: goalTunnels,
    goalBlackTunnel: goalBlackTunnel,
    goalWhiteTunnel: goalWhiteTunnel,
    goalTunnelAstronauts: goalTunnelAstronauts,
    goalTunnelGlass: goalTunnelGlass
  },
  about: {
    page: aboutPage,
    hero: aboutHero,
    whoSection: aboutWhoSection,
    clientSection: aboutClientSection,
    awardSection: aboutAwardSection,
    capabilitySection: aboutCapabilitySection
  },
  projects: {
    page: projectsPage,
    mainSection: projectsMainSection,
    detailsPage: projectPage,
    detailsSection: projectDetailsSection
  },
  playground: {
    page: playgroundPage
  }
};
