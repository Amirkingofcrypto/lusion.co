class ScrollNavSection {
  domContainer;
  domText;
  overScrollRatio = 0;
  downWaitTime = 0;
  _needsReset = true;
  path = "";
  preInit() {
    this.domContainer = document.getElementById("scroll-nav-section");
    this.domText = document.getElementById("scroll-nav-text");
    this.barInner = document.getElementById("scroll-nav-next-bar-inner");
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive;
    let n = scrollManager.scrollPixel >= scrollManager.contentSize * scrollManager.viewSizePixel - 5;
    let a = (input.deltaDragScrollY + input.deltaWheel) * (scrollManager.isActive && pagesManager.isIdle ? 1 : 0);
    this.downWaitTime = a > 0 ? 0.3 : Math.max(0, this.downWaitTime - e);
    this.overScrollRatio = r ? math.saturate(this.overScrollRatio + e * (n && a > 0 ? 2 : this.downWaitTime > 0 ? 0 : a < 0 ? -5 : -0.2) * (pagesManager.isIdle ? 1 : 0)) : 0;
    if (r) {
      let l = pagesManager.currRoute;
      this.barInner.style.transform = `scaleX(${this.overScrollRatio})`;
      if (scrollManager.isActive && pagesManager.isIdle) {
        if (this.path !== l.scrollNavPath) {
          this.path = l.scrollNavPath;
          this.domText.innerHTML = l.scrollNavText;
        }
        if (this.overScrollRatio == 1) {
          routeManager.setPath(this.path);
        }
      }
    }
  }
}
const scrollNavSection = new ScrollNavSection();
class PageExtraSections {
  isActive = true;
  domContainer;
  _needsResize = false;
  preUfxContainer = new Object3D();
  postUfxContainer = new Object3D();
  preInit() {
    preUfx.scene.add(this.preUfxContainer);
    postUfx.scene.add(this.postUfxContainer);
    this.domContainer = document.querySelector("#page-extra-sections");
    endSection.preInit();
    footerSection.preInit();
    scrollNavSection.preInit();
  }
  init() {
    endSection.init();
    footerSection.init();
    scrollNavSection.init();
  }
  resize(e, t) {
    this.preUfxContainer.visible = this.postUfxContainer.visible = false;
    if (pagesManager.scrollTargetPage) {
      if (pagesManager.scrollTargetPage.hasExtraPages) {
        this.preUfxContainer.visible = this.postUfxContainer.visible = true;
        this._needsResize = false;
        this.domContainer.style.display = "block";
        endSection.resize(e, t);
        footerSection.resize(e, t);
        scrollNavSection.resize(e, t);
      } else {
        this.domContainer.style.display = "none";
        this._needsResize = true;
      }
    }
  }
  update(e) {
    this.preUfxContainer.visible = this.postUfxContainer.visible = false;
    if (pagesManager.scrollTargetPage) {
      if (pagesManager.scrollTargetPage.hasExtraPages) {
        this.preUfxContainer.visible = this.postUfxContainer.visible = true;
        if (this._needsResize) {
          this.resize(properties.viewportWidth, properties.viewportHeight);
        }
        this.domContainer.style.display = "block";
        endSection.update(e);
        footerSection.update(e);
        scrollNavSection.update(e);
      } else {
        this.domContainer.style.display = "none";
        this._needsResize = true;
      }
    }
  }
}
const pageExtraSections = new PageExtraSections();
let LOADING_RECTS = [1, 1, 1, 3, 2, 4, 2, 1, 6, 2, 1, 2, 7, 1, 1, 1, 7, 4, 1, 1, 8, 2, 1, 2, 11, 2, 1, 3, 13, 2, 1, 3, 12, 1, 1, 1, 16, 1, 2, 1, 18, 2, 1, 2, 16, 4, 2, 1, 22, 1, 1, 4, 26, 1, 1, 4, 27, 1, 1, 1, 28, 2, 1, 3, 32, 1, 1, 1, 33, 3, 1, 1, 31, 1, 1, 3, 32, 4, 2, 1];