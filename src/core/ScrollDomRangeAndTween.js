class ScrollDomRange {
  constructor(e, t) {
    this.dom = e;
    this.isVertical = t;
    this.needsUpdate = true;
    this.forcedUpdate = true;
    this.screenX = 0;
    this.screenY = 0;
    this.ratio = 0;
    this.screenRatio = 0;
    this.isActive = false;
    this._left = 0;
    this._right = 0;
    this._top = 0;
    this._bottom = 0;
    this.left = 0;
    this.right = 0;
    this.top = 0;
    this.bottom = 0;
    this.width = 0;
    this.height = 0;
    this.showScreenOffset = 0;
    this.hideScreenOffset = 0;
  }
  update(e, t, r, n) {
    n = n || this.needsUpdate;
    if (n) {
      let c = this.dom.getBoundingClientRect();
      this.needsUpdate = false;
      this._left = c.left;
      this._right = c.right;
      this._top = c.top;
      this._bottom = c.bottom;
      this.width = c.width;
      this.height = c.height;
      this.forcedUpdate = false;
      if (this.isVertical) {
        this._top += e;
        this._bottom += e;
      } else {
        this._left += e;
        this._right += e;
      }
    }
    this.left = this._left;
    this.right = this._right;
    this.top = this._top;
    this.bottom = this._bottom;
    if (this.isVertical) {
      this.top += r;
      this.bottom += r;
    } else {
      this.left += r;
      this.right += r;
    }
    this.screenX = this.left;
    this.screenY = this.top;
    let a;
    if (this.isVertical) {
      a = this.screenY -= e;
    } else {
      a = this.screenX -= e;
    }
    let l = this.isVertical ? this.height : this.width;
    this.ratio = Math.min(0, math.unClampedFit(a, t, t - l, -1, 0));
    this.ratio += Math.max(0, math.unClampedFit(a, 0, -l, 0, 1));
    this.screenRatio = math.fit(a, t, -l, -1, 1);
    this.showScreenOffset = -(a - t) / t;
    this.hideScreenOffset = -(a + l) / t;
    this.isActive = this.ratio >= -1 && this.ratio <= 1;
  }
}
let instances = [];
class Tween {
  constructor(e, t) {
    this.target = e;
    this.fromProperties = {};
    this.toProperties = {};
    this.onComplete = t;
    this.t = 0;
    this.duration = 0;
    this.autoUpdate = true;
    instances.push(this);
  }
  static autoUpdate(e) {
    for (let t = 0; t < instances.length; t++) {
      let r = instances[t];
      if (r.autoUpdate) {
        r.update(e);
      }
    }
  }
  restart() {
    this.isActive = true;
    this.t = 0;
  }
  kill() {
    this.t = this.duration;
  }
  to(e, t, r = null) {
    let n = {};
    for (let a in t) {
      n[a] = this.target[a];
    }
    this.fromTo(e, n, t, r);
  }
  fromTo(e, t, r, n) {
    this.duration = e;
    this.ease = n;
    this.fromProperties = t;
    this.toProperties = r;
    this.restart();
    this.update(0, this.duration == 0);
  }
  update(e = 0, t = false) {
    if (this.t < this.duration || t) {
      this.t = Math.min(this.duration, this.t + e);
      let r = this.t / this.duration;
      if (this.ease) {
        r = this.ease(r);
      }
      for (let n in this.toProperties) {
        this.target[n] = math.mix(this.fromProperties[n], this.toProperties[n], r);
      }
      if (this.t == this.duration && this.onComplete) {
        this.onComplete();
      }
    }
  }
}