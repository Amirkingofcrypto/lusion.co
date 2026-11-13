/**
 * ============================================================================
 * Lusion Modular Component: 03-input-tween-fbo
 * File: src/core/InputTweenFbo.js
 * Description: SecondOrderDynamics, Input Controller, ScrollDomRange, Tween & FboHelper
 * Original Engine Lines: 27258 - 28062
 * ============================================================================
 */
class SecondOrderDynamics {
  target0 = null;
  target = null;
  prevTarget = null;
  value = null;
  valueVel = null;
  k1;
  k2;
  k3;
  _f;
  _z;
  _r;
  _w;
  _z;
  _d;
  _targetVelCache;
  _cache1;
  _cache2;
  _k1Stable;
  _k2Stable;
  isVector = null;
  isRobust = null;
  constructor(e, t = 1.5, r = 0.8, n = 2, a = true) {
    this.isRobust = a;
    this.isVector = typeof e == "object";
    this.setFZR(t, r, n);
    if (this.isVector) {
      this.target = e;
      this.target0 = e.clone();
      this.prevTarget = e.clone();
      this.value = e.clone();
      this.valueVel = e.clone().setScalar(0);
      this._targetVelCache = this.valueVel.clone();
      this._cache1 = this.valueVel.clone();
      this._cache2 = this.valueVel.clone();
      this.update = this._updateVector;
      this.reset = this._resetVector;
    } else {
      this.target0 = e;
      this.prevTarget = e;
      this.value = e;
      this.valueVel = 0;
      this.update = this._updateNumber;
      this.reset = this._resetNumber;
    }
    this.computeStableCoefficients = a ? this._computeRobustStableCoefficients : this._computeStableCoefficients;
  }
  update(e, t = 0) {}
  reset(e = null) {}
  _resetVector(e = this.target0) {
    this.valueVel.setScalar(0);
    this.prevTarget.copy(e);
    this.target.copy(e);
    this.value.copy(e);
  }
  _resetNumber(e = this.target0) {
    this.valueVel = 0;
    this.prevTarget = e;
    this.target = e;
    this.value = e;
  }
  setFZR(e = this._f, t = this._z, r = this._r) {
    let n = Math.PI * 2 * e;
    if (this.isRobust) {
      this._w = n;
      this._z = t;
      this._d = this._w * Math.sqrt(Math.abs(this._z * this._z - 1));
    }
    this.k1 = t / (Math.PI * e);
    this.k2 = 1 / (n * n);
    this.k3 = r * t / n;
  }
  _computeStableCoefficients(e) {
    this._k1Stable = this.k1;
    this._k2Stable = Math.max(this.k2, e * 1.1 * e / 4 + e * this.k1 / 2);
  }
  _computeRobustStableCoefficients(e) {
    if (this._w * e < this._z) {
      this._k1Stable = this.k1;
      this._k2Stable = Math.max(this.k2, e * e / 2 + e * this.k1 / 2, e * this.k1);
    } else {
      let t = Math.exp(-this._z * this._w * e);
      let r = t * 2 * (this._z <= 1 ? Math.cos(e * this._d) : Math.cosh(e * this._d));
      let n = t * t;
      let a = e / (1 + n - r);
      this._k1Stable = (1 - n) * a;
      this._k2Stable = e * a;
    }
  }
  _updateVector(e, t = this.target) {
    if (e > 0) {
      this._targetVelCache.copy(t).sub(this.prevTarget).divideScalar(e);
      this.prevTarget.copy(t);
      this.computeStableCoefficients(e);
      this.value.add(this._cache1.copy(this.valueVel).multiplyScalar(e));
      this._cache1.copy(t).add(this._targetVelCache.multiplyScalar(this.k3)).sub(this.value).sub(this._cache2.copy(this.valueVel).multiplyScalar(this._k1Stable)).multiplyScalar(e / this._k2Stable);
      this.valueVel.add(this._cache1);
    }
  }
  _updateNumber(e, t = this.target) {
    if (e > 0) {
      let r = (t - this.prevTarget) / e;
      this.prevTarget = t;
      this.computeStableCoefficients(e);
      this.valueVel += (t + this.k3 * r - this.value - this._k1Stable * this.valueVel) * (e / this._k2Stable);
      this.value += this.valueVel * e;
    }
  }
}
class Input {
  onDowned = new MinSignal$2();
  onMoved = new MinSignal$2();
  onUped = new MinSignal$2();
  onClicked = new MinSignal$2();
  onWheeled = new MinSignal$2();
  onXScrolled = new MinSignal$2();
  onYScrolled = new MinSignal$2();
  wasDown = false;
  isDown = false;
  downTime = 0;
  hasClicked = false;
  hasMoved = false;
  hadMoved = false;
  justClicked = false;
  mouseXY = new Vector2();
  _prevMouseXY = new Vector2();
  prevMouseXY = new Vector2();
  mousePixelXY = new Vector2();
  _prevMousePixelXY = new Vector2();
  prevMousePixelXY = new Vector2();
  downXY = new Vector2();
  downPixelXY = new Vector2();
  deltaXY = new Vector2();
  deltaPixelXY = new Vector2();
  deltaDownXY = new Vector2();
  deltaDownPixelXY = new Vector2();
  deltaDownPixelDistance = 0;
  deltaWheel = 0;
  deltaDragScrollX = 0;
  deltaScrollX = 0;
  deltaDragScrollY = 0;
  deltaScrollY = 0;
  isDragScrollingX = false;
  isDragScrollingY = false;
  isWheelScrolling = false;
  dragScrollXMomentum = 0;
  dragScrollYMomentum = 0;
  dragScrollMomentumMultiplier = 10;
  canDesktopDragScroll = false;
  needsCheckDragScrollDirection = false;
  lastScrollXDirection = 0;
  lastScrollYDirection = 0;
  easedMouseDynamics = {};
  dragScrollDynamic;
  downThroughElems = [];
  currThroughElems = [];
  prevThroughElems = [];
  clickThroughElems = [];
  preInit() {
    const e = document;
    e.addEventListener("mousedown", this._onDown.bind(this));
    e.addEventListener("touchstart", this._getTouchBound(this, this._onDown));
    e.addEventListener("mousemove", this._onMove.bind(this));
    e.addEventListener("touchmove", this._getTouchBound(this, this._onMove));
    e.addEventListener("mouseup", this._onUp.bind(this));
    e.addEventListener("touchend", this._getTouchBound(this, this._onUp));
    e.addEventListener("wheel", this._onWheel.bind(this));
    e.addEventListener("mousewheel", this._onWheel.bind(this));
    this.addEasedInput("default", 1.35, 0.5, 1.25);
    this.dragScrollDynamic = this.addEasedInput("dragScroll", 2, 1, 1);
    this.onUped.addOnce(() => {
      properties.onFirstClicked.dispatch();
    });
  }
  init() {}
  resize() {
    for (let e in this.easedMouseDynamics) {
      this.easedMouseDynamics[e].reset();
    }
  }
  update(e) {
    for (let t in this.easedMouseDynamics) {
      let r = this.easedMouseDynamics[t];
      r.target.copy(this.mouseXY);
      r.update(e);
    }
  }
  addEasedInput(e, t = 1.5, r = 0.8, n = 2) {
    return this.easedMouseDynamics[e] = new SecondOrderDynamics(new Vector2(), t, r, n);
  }
  postUpdate(e) {
    this.prevThroughElems.length = 0;
    this.prevThroughElems.concat(this.currThroughElems);
    this.deltaWheel = 0;
    this.deltaDragScrollX = 0;
    this.deltaDragScrollY = 0;
    this.deltaScrollX = 0;
    this.deltaScrollY = 0;
    this.dragScrollXMomentum = 0;
    this.dragScrollYMomentum = 0;
    this.deltaXY.set(0, 0);
    this.deltaPixelXY.set(0, 0);
    this.prevMouseXY.copy(this.mouseXY);
    this.prevMousePixelXY.copy(this.mousePixelXY);
    this.hadMoved = this.hasMoved;
    this.wasDown = this.isDown;
    this.justClicked = false;
    this.isWheelScrolling = false;
  }
  _onWheel(e) {
    let t = normalizeWheel$1(e).pixelY;
    t = math.clamp(t, -200, 200);
    this.deltaWheel += t;
    this.deltaScrollX = this.deltaDragScrollX + this.deltaWheel;
    this.deltaScrollY = this.deltaDragScrollY + this.deltaWheel;
    this.lastScrollXDirection = this.deltaWheel > 0 ? 1 : -1;
    this.lastScrollYDirection = this.deltaWheel > 0 ? 1 : -1;
    this.isWheelScrolling = true;
    this.onWheeled.dispatch(e.target);
    this.onXScrolled.dispatch(e.target);
    this.onYScrolled.dispatch(e.target);
  }
  _onDown(e) {
    if (e.button !== 2 && e.button !== 1) {
      this.isDown = true;
      this.downTime = +new Date();
      this.prevThroughElems.length = 0;
      this._setThroughElementsByEvent(e, this.downThroughElems);
      this._getInputXY(e, this.downXY);
      this._getInputPixelXY(e, this.downPixelXY);
      this._prevMouseXY.copy(this.downXY);
      this._prevMousePixelXY.copy(this.downPixelXY);
      this.deltaXY.set(0, 0);
      this.deltaPixelXY.set(0, 0);
      this._getInputXY(e, this.mouseXY);
      this.dragScrollDynamic.reset(this.mouseXY);
      this.isDragScrollingX = false;
      this.isDragScrollingY = false;
      this.needsCheckDragScrollDirection = false;
      this._onMove(e);
      this.onDowned.dispatch(e);
      this.needsCheckDragScrollDirection = true;
    }
  }
  _onMove(e) {
    if (e.button !== 2 && e.button !== 1) {
      this._getInputXY(e, this.mouseXY);
      this._getInputPixelXY(e, this.mousePixelXY);
      this.deltaXY.copy(this.mouseXY).sub(this._prevMouseXY);
      this.deltaPixelXY.copy(this.mousePixelXY).sub(this._prevMousePixelXY);
      this._prevMouseXY.copy(this.mouseXY);
      this._prevMousePixelXY.copy(this.mousePixelXY);
      this.hasMoved = this.deltaXY.length() > 0;
      if (this.isDown) {
        this.deltaDownXY.copy(this.mouseXY).sub(this.downXY);
        this.deltaDownPixelXY.copy(this.mousePixelXY).sub(this.downPixelXY);
        this.deltaDownPixelDistance = this.deltaDownPixelXY.length();
        if (browser$1.isMobile || this.canDesktopDragScroll) {
          if (this.needsCheckDragScrollDirection) {
            this.isDragScrollingX = Math.abs(this.deltaPixelXY.x) > Math.abs(this.deltaPixelXY.y);
            this.isDragScrollingY = !this.isDragScrollingX;
            this.needsCheckDragScrollDirection = false;
          }
          if (this.isDragScrollingX) {
            this.deltaDragScrollX += -this.deltaPixelXY.x;
            this.deltaScrollX += -this.deltaPixelXY.x + this.deltaWheel;
            this.lastScrollXDirection = this.deltaDragScrollX > 0 ? 1 : -1;
            this.onXScrolled.dispatch(e.target);
          }
          if (this.isDragScrollingY) {
            this.deltaDragScrollY += -this.deltaPixelXY.y;
            this.deltaScrollY += -this.deltaPixelXY.y + this.deltaWheel;
            this.lastScrollYDirection = this.deltaDragScrollY > 0 ? 1 : -1;
            this.onYScrolled.dispatch(e.target);
          }
        }
      }
      this._setThroughElementsByEvent(e, this.currThroughElems);
      this.onMoved.dispatch(e);
    }
  }
  _onUp(e) {
    if (e.button === 2 || e.button === 1) {
      return;
    }
    const t = e.clientX - this.downPixelXY.x;
    const r = e.clientY - this.downPixelXY.y;
    if (Math.sqrt(t * t + r * r) < 40 && +new Date() - this.downTime < 300) {
      this._setThroughElementsByEvent(e, this.clickThroughElems);
      this._getInputXY(e, this.mouseXY);
      this.hasClicked = true;
      this.justClicked = true;
      this.onClicked.dispatch(e);
    }
    this.deltaDownXY.set(0, 0);
    this.deltaDownPixelXY.set(0, 0);
    this.deltaDownPixelDistance = 0;
    this.dragScrollXMomentum = this.dragScrollDynamic.valueVel.y * properties.viewportWidth * this.dragScrollMomentumMultiplier * properties.deltaTime;
    this.dragScrollYMomentum = this.dragScrollDynamic.valueVel.y * properties.viewportHeight * this.dragScrollMomentumMultiplier * properties.deltaTime;
    this.isDown = false;
    this.needsCheckDragScrollDirection = false;
    this.onUped.dispatch(e);
  }
  _getTouchBound(e, t, r) {
    return function (n) {
      if (r && n.preventDefault) {
        n.preventDefault();
      }
      t.call(e, n.changedTouches[0] || n.touches[0]);
    };
  }
  _getInputXY(e, t) {
    t.set(e.clientX / properties.viewportWidth * 2 - 1, 1 - e.clientY / properties.viewportHeight * 2);
    return t;
  }
  _getInputPixelXY(e, t) {
    t.set(e.clientX, e.clientY);
  }
  _setThroughElementsByEvent(e, t) {
    let r = e.target;
    for (t.length = 0; r.parentNode;) {
      t.push(r);
      r = r.parentNode;
    }
  }
  hasThroughElem(e, t) {
    let r = this[t + "ThroughElems"] || this.currThroughElems;
    let n = r.length;
    while (n--) {
      if (r[n] === e) {
        return true;
      }
    }
    return false;
  }
  hasThroughElemWithClass(e, t) {
    let r = this[t + "ThroughElems"] || this.currThroughElems;
    let n = r.length;
    while (n--) {
      if (r[n].classList.contains(e)) {
        return r[n];
      }
    }
    return null;
  }
}
const input = new Input();