/**
 * ============================================================================
 * Lusion Modular Component: 29-scroll-postprocessing
 * File: src/core/ScrollAndPostprocessing.js
 * Description: ScrollPane, ScrollManager, Postprocessing, Smaa, Bloom, ScreenPaintDistortion, Final & Fsr
 * Original Engine Lines: 47994 - 49315
 * ============================================================================
 */
class ScrollPane {
  lockOnDirection = true;
  isActive = false;
  x;
  y;
  viewDom;
  contentDom;
  isVertical = true;
  targetScrollPixel = 0;
  scrollViewDelta = 0;
  viewWidthPixel = 0;
  viewHeightPixel = 0;
  contentSize = 0;
  contentSizePixel = 0;
  scrollView = 0;
  progress = 0;
  minScrollPixel = 0.1;
  viewSizePixel = 1;
  scrollMultiplier = (browser$1.isMobile, 1);
  domRanges = new Map();
  useResizeObserver = true;
  tick = -1;
  lastResizeTick = -1;
  resizeObserveTick = -1;
  hasResizeObserved = false;
  autoScrollSpeed = 0;
  autoScrollRatio = 0;
  skipAutoScroll = false;
  dragHistory = [];
  dragHistoryMaxTime = 0.1;
  isWheelScrolling = false;
  frictionCoeffFrom = 2.1;
  frictionCoeffTo = 1.9;
  frictionCoeffWeightDivisor = 5;
  minVelocity = -1;
  wheelEaseCoeff = 12;
  scrollPixel = 0;
  init(e = {}) {
    Object.assign(this, e);
    if (this.contentDom && this.useResizeObserver && window.ResizeObserver) {
      new ResizeObserver(this._onResizeObserve.bind(this)).observe(this.contentDom);
    }
    document.documentElement.addEventListener("keydown", t => {
      if (this.isMoveable) {
        if (this.isVertical) {
          if (t.key === "ArrowUp") {
            this.scrollToPixel(this.scrollPixel - 100);
          } else if (t.key === "ArrowDown") {
            this.scrollToPixel(this.scrollPixel + 100);
          }
        } else if (t.key === "ArrowLeft") {
          this.scrollToPixel(this.scrollPixel - 100);
        } else if (t.key === "ArrowRight") {
          this.scrollToPixel(this.scrollPixel + 100);
        }
        if (t.key === "PageUp") {
          this.scrollToPixel(this.scrollPixel - this.viewSizePixel);
        } else if (t.key === "PageDown") {
          this.scrollToPixel(this.scrollPixel + this.viewSizePixel);
        }
      }
    });
  }
  _onResizeObserve() {
    this.hasResizeObserved = true;
    this.resizeObserveTick = this.tick;
  }
  getDomRange(e, t = 0, r = false) {
    let n = this.domRanges.get(e);
    if (!n) {
      this.domRanges.set(e, n = new ScrollDomRange(e, this.isVertical));
    }
    n.update(this.scrollPixel, this.viewSizePixel, t, r);
    return n;
  }
  scrollTo(e, t = 0, r = false) {
    e = typeof e == "string" ? document.getElementById(e) : e;
    if (e) {
      let n = this.getDomRange(e);
      this.scrollToPixel(n.top + t * this.viewSizePixel, r);
    }
  }
  scrollToPixel(e = 0, t = false) {
    e = this._clampScrollPixel(e);
    if (t) {
      this.resetScroll(e);
      this.progress = this.contentSize > 0 ? e / this.contentSizePixel : 0;
    } else {
      this.resetScroll(this.scrollPixel);
      this.targetScrollPixel = e;
      this.isWheelScrolling = true;
      this.skipAutoScroll = true;
    }
    this.syncDom();
  }
  getEaseInOutOffset(e, t, r = 0, n = 0.5) {
    let a = 1.5 + n;
    let l = (a - 1) * 2 + r;
    let c = 0;
    let u = a;
    let f = u + r;
    let p = f + a;
    let g = t * p / l;
    let v = e + g * 0.5 - t * 0.5;
    let _ = Math.min(1, v / g);
    if (_ > 0) {
      let M = _ * p;
      var T = M;
      if (M > c && M <= u) {
        let S = (M - c) / (u - c);
        T = math.cubicBezier(c, (u - c) / 3 + c, 1, 1, S);
      } else if (M > u && M <= f) {
        T = 1;
      } else if (M > f && M <= p) {
        let S = (M - f) / (p - f);
        T = math.cubicBezier(1, 1, -(p - f) / 3 + 2, 2, S);
      } else if (M > p) {
        T = M - l;
      }
      return (M - T) / l * t;
    }
    return 0;
  }
  resize(e, t) {
    this.domRanges.forEach(n => {
      n.needsUpdate = true;
    });
    if (this.viewDom) {
      let n = this.viewDom.getBoundingClientRect();
      e = n.width;
      t = n.height;
    }
    this.viewWidthPixel = e;
    this.viewHeightPixel = t;
    let r = this.isVertical ? t : e;
    if (this.contentDom) {
      let n = this.contentDom.getBoundingClientRect();
      this.contentSize = Math.max(0, (this.isVertical ? n.height : n.width) / r - 1);
    }
    this.contentSizePixel = Math.floor(this.contentSize * r);
    this.targetScrollPixel = this.contentSizePixel * this.progress;
    this.resetScroll(this.targetScrollPixel);
    this.viewSizePixel = r;
    this.lastResizeTick = this.tick;
    this.syncDom();
  }
  _clampScrollPixel(e) {
    return math.clamp(e, 0, this.contentSizePixel);
  }
  resetScroll(e) {
    this.targetScrollPixel = this.scrollPixel = e;
    this.velocityPixel = 0;
    this.dragHistory.length = 0;
  }
  update(e, t) {
    if (this.hasResizeObserved) {
      this.hasResizeObserved = false;
      if (this.resizeObserveTick !== this.lastResizeTick) {
        this.resize(this.viewWidthPixel, this.viewHeightPixel);
      }
    }
    let r = this.scrollView;
    let n = input.isDown && (!this.lockOnDirection && (input.isDragScrollingY || input.isDragScrollingX) || this.isVertical && input.isDragScrollingY || !this.isVertical && input.isDragScrollingX);
    let a = 0;
    if (input.isDown && !input.wasDown) {
      this.dragHistory.length = 0;
    }
    if (this.isMoveable) {
      let l = 0;
      if (this.isVertical) {
        if (input.isWheelScrolling || input.isDragScrollingY) {
          l = input.deltaScrollY;
        } else if (!this.lockOnDirection && input.isDragScrollingX) {
          l = -input.deltaPixelXY.y + input.deltaWheel;
        }
      } else if (input.isWheelScrolling || input.isDragScrollingX) {
        l = input.deltaScrollX;
      } else if (!this.lockOnDirection && input.isDragScrollingY) {
        l = -input.deltaPixelXY.x + input.deltaWheel;
      }
      if (input.isWheelScrolling) {
        this.isWheelScrolling = true;
      }
      if (l !== 0) {
        this.skipAutoScroll = false;
      }
      this.autoScrollRatio = math.saturate(this.autoScrollRatio + (Math.abs(this.autoScrollSpeed) > 0 && l == 0 ? e : -1));
      let c = this.autoScrollSpeed * this.viewSizePixel * e * (this.skipAutoScroll ? 0 : this.autoScrollRatio);
      let u = properties.time;
      if (n) {
        for (this.dragHistory.push({
          time: u,
          deltaTime: e,
          deltaPixel: l
        }); this.dragHistory.length > 0 && u - this.dragHistory[0].time > this.dragHistoryMaxTime;) {
          this.dragHistory.shift();
        }
        this.targetScrollPixel = this.scrollPixel;
        this.isWheelScrolling = false;
        a = l;
      } else {
        if (input.isDown) {
          this.resetScroll(this.scrollPixel);
        }
        if (this.isWheelScrolling) {
          this.dragHistory.length = 0;
          this.velocityPixel = 0;
          this.targetScrollPixel += l;
          this.targetScrollPixel = this._clampScrollPixel(this.targetScrollPixel);
          let f = this.targetScrollPixel - this.scrollPixel;
          a = f * (1 - Math.exp(-this.wheelEaseCoeff * e));
          if (Math.abs(f) < this.minScrollPixel) {
            a = f;
            this.isWheelScrolling = false;
          }
        } else {
          if (this.dragHistory.length > 0) {
            let g = 0;
            let v = 0;
            for (let _ = 0; _ < this.dragHistory.length; _++) {
              let T = this.dragHistory[_];
              if (T.time > 0) {
                let M = T.deltaPixel / T.deltaTime;
                let S = T.deltaTime;
                let b = this.dragHistory.length == 1 ? 1 : (T.time - this.dragHistory[0].time) / this.dragHistoryMaxTime;
                let C = S * b;
                v += M * C;
                g += C;
              }
            }
            this.velocityPixel = v / g;
            this.dragHistory.length = 0;
          }
          let p = -math.mix(this.frictionCoeffFrom, this.frictionCoeffTo, math.clamp(Math.abs(this.velocityPixel / this.viewSizePixel / this.frictionCoeffWeightDivisor), 0, 1)) * this.velocityPixel;
          this.velocityPixel += p * e;
          a = this.velocityPixel * e;
        }
      }
      this.targetScrollPixel += c;
      this.scrollPixel += c;
    }
    this.scrollPixel = this._clampScrollPixel(this.scrollPixel + a);
    this.scrollView = this.scrollPixel / this.viewSizePixel;
    this.scrollViewDelta = this.scrollView - r;
    this.progress = this.contentSize > 0 ? this.scrollPixel / this.contentSizePixel : 0;
    if (Math.abs(this.targetScrollPixel - this.scrollPixel) < this.minScrollPixel) {
      this.scrollPixel = this.targetScrollPixel;
    }
    if (Math.abs(this.velocityPixel) <= this.minVelocity) {
      this.velocityPixel = 0;
    }
    this.isScrolling = this.targetScrollPixel !== this.scrollPixel || Math.abs(this.velocityPixel) > 0;
    this.syncDom();
    this.tick++;
  }
  syncDom() {
    if (this.contentDom) {
      this.x = 0;
      this.y = 0;
      if (this.isVertical) {
        this.y = -this.scrollPixel;
      } else {
        this.x = -this.scrollPixel;
      }
      this.contentDom.style.transform = `translate3d(${this.x}px, ${this.y}px, 0px)`;
    }
  }
  get isMoveable() {
    return this.isActive && !videoOverlay.isOpened && pagesManager.isIdle && !header.menu.opened && this.contentSize > 0 && (!this.viewDom || input.hasThroughElem(this.viewDom, "down"));
  }
}
class ScrollManager extends ScrollPane {
  domScrollIndicator;
  domScrollIndicatorHeight = 1;
  domScrollIndicatorBar;
  scrollIndicatorActiveRatio = 0;
  lastMouseInteractiveTime = -Infinity;
  isIndicatorActive = undefined;
  easedScrollStrength = 0;
  frameIdx = -1;
  MIN_BAR_SCALE_Y = 2 / 10;
  init() {
    super.init({
      contentDom: document.getElementById("page-container"),
      domScrollIndicator: document.getElementById("scroll-indicator"),
      domScrollIndicatorBar: document.getElementById("scroll-indicator-bar")
    });
  }
  resize(e, t) {
    super.resize(e, t);
    this.domScrollIndicatorHeight = this.domScrollIndicator.getBoundingClientRect().height;
  }
  update(e) {
    super.update(e, this.scrollValue);
    this.easedScrollStrength += Math.abs(this.scrollViewDelta);
    this.easedScrollStrength += (0 - this.easedScrollStrength) * (1 - Math.exp(e * -10));
    this.easedScrollStrength = Math.min(this.easedScrollStrength, 1);
    if (Math.abs(this.scrollViewDelta) > 0) {
      this.lastMouseInteractiveTime = properties.time;
      this.isIndicatorActive = true;
    } else if (properties.time > this.lastMouseInteractiveTime + 0.5) {
      this.isIndicatorActive = false;
    }
    this.scrollIndicatorActiveRatio = math.clamp(this.scrollIndicatorActiveRatio + (this.isIndicatorActive ? 2 : -2) * e, 0, 1);
    this.domScrollIndicator.style.opacity = this.scrollIndicatorActiveRatio;
    let r = 1;
    let n = 0;
    if (this.contentSize > 0) {
      r = Math.max(this.MIN_BAR_SCALE_Y, 1 / (1 + this.contentSize));
      n = this.scrollView / this.contentSize * (1 - r);
    }
    this.domScrollIndicatorBar.style.height = this.domScrollIndicatorHeight * r + "px";
    this.domScrollIndicatorBar.style.transform = "translate3d(0," + this.domScrollIndicatorHeight * n + "px,0)";
    this.frameIdx++;
  }
  get isMoveable() {
    return super.isMoveable;
  }
}
const scrollManager = new ScrollManager();