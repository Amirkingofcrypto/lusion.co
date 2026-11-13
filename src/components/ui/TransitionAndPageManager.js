/**
 * ============================================================================
 * Lusion Modular Component: 28-transition-page-manager
 * File: src/components/ui/TransitionAndPageManager.js
 * Description: TransitionOverlay & PageManager
 * Original Engine Lines: 47617 - 47993
 * ============================================================================
 */
class TransitionOverlay {
  contentShowRatio = 0;
  contentHideRatio = 1;
  loadBarRatio = 0;
  lineTransformRatio = 0;
  showTextRatio = 0;
  waitTextRatio = 0;
  hideTextRatio = 1;
  pixelWidth = 0;
  needsShowText = false;
  needsHideText = false;
  loadingTextAnimation = 0;
  onShowTextCompleted = new MinSignal$2();
  onHideTextCompleted = new MinSignal$2();
  init() {
    this.canvas = document.getElementById("transition-overlay");
    this.ctx = this.canvas.getContext("2d");
  }
  resize(e, t) {
    e += 2;
    t += 2;
    this.canvas.width = e * settings.DPR;
    this.canvas.height = t * settings.DPR;
    this.canvas.style.width = e + "px";
    this.canvas.style.height = t + "px";
    this.pixelWidth = ~~Math.min(42, properties.viewportWidth / 30);
  }
  isReadyToHide() {}
  get activeRatio() {
    return Math.min(1 - this.contentShowRatio, this.contentHideRatio);
  }
  update(e) {
    if (this.activeRatio > 0) {
      let t = properties.viewportWidth + 2;
      let r = properties.viewportHeight + 2;
      let n = this.pixelWidth;
      let a = this.loadBarRatio;
      let l = this.lineTransformRatio;
      let c = Math.sqrt(t * t + r * r) / n;
      let u = this.ctx;
      u.save();
      u.scale(settings.DPR, settings.DPR);
      u.fillStyle = "#000";
      u.fillRect(0, 0, t, r);
      let f = ease.expoInOut(1 - this.activeRatio);
      let p = (1 + f * c) * n;
      u.translate(t * 0.5, r * 0.5);
      u.rotate(f * (this.contentShowRatio == 0 ? -1 : 1));
      u.translate(n * f * c, -n * 0.5 * f * c);
      u.scale(p, p);
      if (l == 0) {
        u.fillStyle = "#333";
        u.fillRect(-2.5, -0.5, 5, 1);
        u.fillStyle = "#fff";
        u.fillRect(-2.5, -0.5, a * 5, 1);
      } else {
        u.fillStyle = "#fff";
        if (this.needsShowText) {
          this.showTextRatio = this.showTextRatio + e * 1.25;
          if (this.showTextRatio >= 1) {
            this.showTextRatio = 1;
            this.needsShowText = false;
            this.onShowTextCompleted.dispatch();
          }
        }
        if (this.showTextRatio == 1) {
          this.waitTextRatio = Math.min(1, this.waitTextRatio + e * 3);
          if (this.waitTextRatio == 1 && this.needsHideText && taskManager.percent == 1) {
            this.hideTextRatio = this.hideTextRatio + e * 1.25;
            if (this.hideTextRatio >= 1) {
              this.hideTextRatio = 1;
              this.needsHideText = false;
              this.onHideTextCompleted.dispatch();
            }
          }
        }
        let g = this.showTextRatio;
        let v = this.hideTextRatio;
        let _ = math.fit(Math.min(g, 1 - v), 0, 0.5, 1, 0.2, ease.expoInOut);
        let T = (ease.expoInOut(g) + ease.expoInOut(v)) * -15;
        if (g > 0 && v < 1) {
          u.scale(_, _);
          u.translate(-l, l * 1.5);
          u.translate(T, 0);
          u.save();
          u.translate(-1.5, -4.5);
          u.beginPath();
          for (let M = 0, S = LOADING_RECTS.length / 4, b = 0; M < S; M++, b += 4) {
            u.fillStyle = "#fff";
            let C = LOADING_RECTS[b + 0];
            let w = LOADING_RECTS[b + 1];
            let R = LOADING_RECTS[b + 2];
            let E = LOADING_RECTS[b + 3];
            let I = M / (S - 1);
            let F = math.fit(g, I * 0.5, 0.5 + I * 0.5, 0, 1, ease.expoIn) * math.fit(v, I * 0.5, 0.5 + I * 0.5, 1, 0, ease.expoOut);
            if (g < 1) {
              if (M < 2) {
                F = 1;
              }
            } else if (M >= S - 2) {
              F = 1;
            }
            u.rect(C + (1 - F) * R * 0.5, w + (1 - F) * E * 0.5, R * F, E * F);
          }
          u.closePath();
          u.fill();
          u.restore();
        } else {
          u.translate(-l, l * 1.5);
          u.save();
          u.translate(0.5, -0.5);
          u.rotate(l * Math.PI * 0.5);
          u.globalCompositeOperation = "xor";
          u.fillRect(-3, 0, 3, 1);
          u.globalCompositeOperation = "source-over";
          u.globalAlpha = 1 - f;
          u.fillRect(-3, 0, 3, 1);
          u.restore();
          u.save();
          u.translate(0.5, -0.5);
          u.globalCompositeOperation = "xor";
          u.fillRect(0, 0, 2, 1);
          u.globalCompositeOperation = "source-over";
          u.globalAlpha = 1 - f;
          u.fillRect(0, 0, 2, 1);
          u.restore();
        }
      }
      u.restore();
      this.canvas.style.display = "block";
    } else {
      this.canvas.style.display = "none";
    }
  }
}
const transitionOverlay = new TransitionOverlay();
class PageManager {
  pages = {};
  pageList = [homePage, aboutPage, projectPage, projectsPage, playgroundPage];
  scrollTargetPage = null;
  domContainer = null;
  domInner = null;
  prevRoute = null;
  currRoute = null;
  _defaultRoute;
  _pendingRoute;
  _isHiding = false;
  _isShowing = false;
  _hasPreloaded = true;
  isFirstRoute = true;
  _needsShowLoading = false;
  onIdled = new MinSignal$2();
  onScrollTargetChanged = new MinSignal$2();
  NEEDS_LOG = false;
  constructor() {
    this._defaultRoute = new Route(undefined);
    this.prevRoute = this.currRoute = this._defaultRoute;
    for (let e = 0; e < this.pageList.length; e++) {
      let t = this.pageList[e];
      this.pages[t.id] = t;
      routeManager.addPath(t.path, t);
      preUfx.scene.add(t.preUfxContainer);
      postUfx.scene.add(t.postUfxContainer);
    }
    transitionOverlay.onShowTextCompleted.add(this._onShowTextComplete, this);
    transitionOverlay.onHideTextCompleted.add(this._onHideTextComplete, this);
    taskManager.onCompleted.add(this._onTaskComplete, this);
  }
  preInit() {
    this.domContainer = document.getElementById("page-container");
    this.domContainerInner = document.getElementById("page-container-inner");
    routeManager.onRouteChanged.add(this._onRouteChanged, this);
    this._onRouteChanged(routeManager.currRoute);
  }
  get isIdle() {
    return !this._isHiding && this._hasPreloaded && !this._isShowing && !this._needsShowLoading;
  }
  _onRouteChanged(e) {
    if (!this.isIdle) {
      this._pendingRoute = e;
    } else if (this.currRoute !== e) {
      this.prevRoute = this.currRoute;
      this.currRoute = e;
      let t = this.currRoute.target;
      if (!t.domContainer) {
        t.domContainer = this.currRoute.dom;
        this._log("preInit: " + this.currRoute.path);
        t.preInit(this.currRoute);
        if (properties.hasInitialized && !t.bypassShowingLoading) {
          this._needsShowLoading = true;
        }
      }
      if (properties.hasInitialized) {
        this._hasPreloaded = false;
      } else {
        this.scrollTargetPage = t;
        this.onScrollTargetChanged.dispatch(t);
      }
      if (!this.currRoute.hasContentPreloaded) {
        this._log("preInitContent: " + this.currRoute.path);
        t.preInitContent(this.currRoute);
      }
      if (properties.hasInitialized) {
        transitionOverlay.showTextRatio = 0;
        transitionOverlay.waitTextRatio = 0;
        transitionOverlay.hideTextRatio = 0;
        transitionOverlay.needsShowText = false;
        transitionOverlay.needsHideText = false;
        let r = this.prevRoute.target;
        this._isHiding = true;
        this._log("hide page", r.id);
        r.onHideStarted.dispatch();
        r.hide(this.prevRoute, this.currRoute, () => {
          this._isHiding = false;
          if (this._needsShowLoading) {
            transitionOverlay.needsShowText = true;
          } else if (this._hasPreloaded) {
            this._onHideComplete();
          }
        });
        if (r.useGenericTransition) {
          audios.countPlay("page");
        }
        properties.loader.start(n => {
          if (n == 1) {
            this._hasPreloaded = true;
            if (!this._isHiding) {
              if (this._needsShowLoading) {
                if (transitionOverlay.showTextRatio == 1) {
                  this._onHideComplete();
                }
              } else {
                this._onHideComplete();
              }
            }
          }
        });
      }
    }
  }
  _onShowTextComplete() {
    if (this._hasPreloaded) {
      this._onHideComplete();
    }
  }
  _onHideTextComplete() {
    this._showPage();
  }
  _onTaskComplete() {
    this.isFirstRoute;
  }
  init() {
    this._initPage();
  }
  _initPage() {
    let e = this.currRoute.target;
    if (!e.hasInitialized) {
      this._log("init: " + this.currRoute.path);
      e.init(this.currRoute);
      e.hasInitialized = true;
    }
    if (!this.currRoute.hasContentPreloaded) {
      this.currRoute.hasContentPreloaded = true;
      this._log("initContent: " + this.currRoute.path);
      e.initContent(this.currRoute);
    }
    taskManager.start();
  }
  _onHideComplete() {
    this._initPage();
    if (this.prevRoute.target) {
      let e = this.prevRoute.target;
      e.onHideCompleted.dispatch();
      this._log("hide page complete: " + this.prevRoute.path);
      e.isActive = false;
      if (e !== this.currRoute.target) {
        e.domContainer.remove();
        e.preUfxContainer.visible = false;
        e.postUfxContainer.visible = false;
      }
    }
    if (this._needsShowLoading) {
      transitionOverlay.needsHideText = true;
    } else {
      this._showPage();
    }
  }
  resize(e, t) {
    if (this.prevRoute.target && this.prevRoute.target.isActive && this.prevRoute.target !== this.currRoute.target && this.prevRoute.target.hasInitialized) {
      this.prevRoute.target.resize(e, t);
    }
    if (this.currRoute && this.currRoute.target.isActive) {
      this.currRoute.target.resize(e, t);
    }
  }
  start() {
    this._showPage();
  }
  _showPage() {
    this._isShowing = true;
    this._needsShowLoading = false;
    let e = this.currRoute.target;
    e.isActive = true;
    if (properties.hasInitialized && e !== this.prevRoute.target) {
      this.domContainerInner.prepend(e.domContainer);
      e.time = 0;
    }
    document.title = this.currRoute.title;
    this.scrollTargetPage = e;
    e.preUfxContainer.visible = true;
    e.postUfxContainer.visible = true;
    this.onScrollTargetChanged.dispatch(e);
    this._log("show page: " + this.currRoute.path);
    pageExtraSections.resize(properties.viewportWidth, properties.viewportHeight);
    scrollManager.resize(properties.viewportWidth, properties.viewportHeight);
    scrollManager.scrollToPixel(0, true);
    e.resize(properties.viewportWidth, properties.viewportHeight);
    e.onShowStarted.dispatch();
    e.show(this.prevRoute, this.currRoute, this._onShowComplete.bind(this));
    if (e.useGenericTransition) {
      audios.countPlay("page");
    }
  }
  _onShowComplete() {
    transitionOverlay.contentShowRatio = 1;
    this._isShowing = false;
    this.isFirstRoute = false;
    this.currRoute.target.isFirstShown = true;
    this.currRoute.target.onShowCompleted.dispatch();
    this._log("===============");
    if (this._pendingRoute) {
      let e = this._pendingRoute;
      this._pendingRoute = null;
      this._onRouteChanged(e);
    } else {
      this.onIdled.dispatch();
    }
    if (properties.isContactFromProjectPage) {
      properties.isContactFromProjectPage = false;
      scrollManager.scrollTo("footer-section", 0, false);
    }
  }
  update(e) {
    if (this.prevRoute.target && this.prevRoute.target.isActive && this.prevRoute.target !== this.currRoute.target && this.prevRoute.target.hasInitialized) {
      let t = this.prevRoute.target;
      t.time += e;
      t.update(e);
    }
    if (this.currRoute && this.currRoute.target.isActive) {
      let t = this.currRoute.target;
      t.time += e;
      t.update(e);
    }
    if (!this.isFirstRoute) {
      if ((this._isHiding || !this._hasPreloaded) && !this._isShowing && this.prevRoute.target.useGenericTransition) {
        transitionOverlay.contentHideRatio = this.prevRoute.target.hideRatio;
        transitionOverlay.contentShowRatio = 0;
      }
      if (this._isShowing && this.currRoute.target && this.currRoute.target.useGenericTransition) {
        transitionOverlay.contentHideRatio = 1;
        transitionOverlay.contentShowRatio = this.currRoute.target.showRatio;
      }
      let t = 1;
      if (this.prevRoute != this.currRoute) {
        if (this._isHiding && !this.prevRoute.target.useGenericTransition) {
          t *= math.fit(this.prevRoute.target.hideRatio, 0, 0.5, 1, 0);
        }
        if (this._isShowing && !this.currRoute.target.useGenericTransition) {
          t *= math.fit(this.currRoute.target.showRatio, 0.5, 1, 0, 1);
        }
      }
      this.domContainer.style.opacity = t;
    }
  }
  _log(e) {}
}
const pagesManager = new PageManager();
