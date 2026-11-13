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
const blitVert = `#define GLSLIFY 1
attribute vec2 position;varying vec2 v_uv;void main(){v_uv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;
const blitFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv);}`;
const uvBlitVert = `#define GLSLIFY 1
attribute vec2 position;attribute vec2 uv;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=vec4(position,0.0,1.0);}`;
const clearFrag = `#define GLSLIFY 1
uniform vec4 u_color;varying vec2 v_uv;void main(){gl_FragColor=u_color;}`;
const debugVert = `#define GLSLIFY 1
attribute vec3 position;attribute vec2 uv;uniform vec4 u_transform;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=vec4(position.xy*u_transform.zw+u_transform.xy,0.0,1.0);}`;
class FboHelper {
  isWebGL2;
  renderer;
  quadGeom;
  triGeom;
  floatType;
  precisionPrefix;
  precisionPrefix2;
  vertexShader;
  _scene;
  _camera;
  _tri;
  copyMaterial;
  uvCopyMaterial;
  clearMaterial;
  _debugScene;
  _debugMesh;
  _debugMaterial;
  init(e, t) {
    this.renderer = e;
    this.floatType = t;
    this.isWebGL2 = this.renderer.capabilities.isWebGL2;
    this._scene = new Scene();
    this._camera = new Camera();
    this._camera.position.z = 1;
    this.triGeom = new BufferGeometry();
    this.triGeom.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 4, -1, 0, -1, 4, 0]), 3));
    this.quadGeom = new PlaneGeometry(2, 2);
    this._tri = new Mesh(this.triGeom);
    this._tri.frustumCulled = false;
    this._scene.add(this._tri);
    this.precisionPrefix = `precision ${this.renderer.capabilities.precision} float;
`;
    this.precisionPrefix2 = `precision ${this.renderer.capabilities.precision} float;
			precision ${this.renderer.capabilities.precision} int;
			#define IS_WEBGL2 true
		`;
    if (this.isWebGL2) {
      this.vertexPrefix = `${this.precisionPrefix2}
				precision mediump sampler2DArray;
				#define attribute in
				#define varying out
				#define texture2D texture
			`;
      this.fragmentPrefix = `${this.precisionPrefix2}
				#define varying in
				out highp vec4 pc_fragColor;
				#define gl_FragColor pc_fragColor
				#define gl_FragDepthEXT gl_FragDepth
				#define texture2D texture
				#define textureCube texture
				#define texture2DProj textureProj
				#define texture2DLodEXT textureLod
				#define texture2DProjLodEXT textureProjLod
				#define textureCubeLodEXT textureLod
				#define texture2DGradEXT textureGrad
				#define texture2DProjGradEXT textureProjGrad
				#define textureCubeGradEXT textureGrad
			`;
    } else {
      this.vertexPrefix = this.precisionPrefix;
      this.fragmentPrefix = this.precisionPrefix;
    }
    this.renderer.getContext().getExtension("OES_standard_derivatives");
    this.vertexShader = this.isWebGL2 ? this.precisionPrefix2 + blitVert : this.precisionPrefix + blitVert;
    this.copyMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        }
      },
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending
    });
    this.uvCopyMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        }
      },
      vertexShader: uvBlitVert,
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      glslVersion: this.isWebGL2 ? GLSL3 : GLSL1
    });
    this.clearMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_color: {
          value: new Vector4(1, 1, 1, 1)
        }
      },
      fragmentShader: clearFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending
    });
    const r = new PlaneGeometry(1, 1);
    r.translate(0.5, -0.5, 0);
    this._debugMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_transform: {
          value: new Vector4(0, 0, 1, 1)
        }
      },
      vertexShader: debugVert,
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      glslVersion: this.isWebGL2 ? GLSL3 : GLSL1
    });
    this._debugMesh = new Mesh(r, this._debugMaterial);
    this._debugScene = new Scene();
    this._debugScene.frustumCulled = false;
    this._debugScene.add(this._debugMesh);
  }
  copy(e, t) {
    const r = this.copyMaterial;
    if (r) {
      r.uniforms.u_texture.value = e;
      this.render(r, t);
    }
  }
  uvCopy(e, t) {
    const r = this.uvCopyMaterial;
    if (r) {
      r.uniforms.u_texture.value = e;
      this.render(r, t);
    }
  }
  render(e, t) {
    if (this._tri && this.renderer && this._scene && this._camera) {
      this._tri.material = e;
      if (t) {
        this.renderer.setRenderTarget(t);
      }
      this.renderer.render(this._scene, this._camera);
    }
  }
  renderGeometry(e, t, r) {
    if (this._tri && this.triGeom) {
      this._tri.geometry = e;
      this.render(t, r);
      this._tri.geometry = this.triGeom;
    }
  }
  renderMesh(e, t, r = this._camera) {
    if (this._tri && this.renderer && this._scene && r) {
      this._tri.visible = false;
      this._scene.add(e);
      if (t) {
        this.renderer.setRenderTarget(t || null);
      }
      this.renderer.render(this._scene, r);
      if (t) {
        this.renderer.setRenderTarget(null);
      }
      this._scene.remove(e);
      this._tri.visible = true;
    }
  }
  debugTo(e, t, r, n, a) {
    if (!this.renderer || !this._debugMaterial || !this._debugScene || !this._camera) {
      return;
    }
    t = t || e.width || e.image.width;
    r = r || e.height || e.image.height;
    n = n || 0;
    a = a || 0;
    const l = this.renderer.getSize(new Vector2());
    n = n / l.width * 2 - 1;
    a = 1 - a / l.height * 2;
    t = t / l.width * 2;
    r = r / l.height * 2;
    this._debugMaterial.uniforms.u_texture.value = e;
    this._debugMaterial.uniforms.u_transform.value.set(n, a, t, r);
    const c = this.getColorState();
    this.renderer.autoClearColor = false;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this._debugScene, this._camera);
    this.setColorState(c);
  }
  parseDefines(e) {
    let t = "";
    for (const r in e) {
      const n = e[r];
      if (n === true) {
        t += `#define ${r}
`;
      } else {
        t += `#define ${r} ${n}
`;
      }
    }
    return t;
  }
  clearColor(e, t, r, n, a) {
    if (this.clearMaterial) {
      this.clearMaterial.uniforms.u_color.value.set(e, t, r, n);
      this.render(this.clearMaterial, a);
    }
  }
  getColorState() {
    if (!this.renderer) {
      return {
        autoClear: true,
        autoClearColor: true,
        autoClearStencil: true,
        autoClearDepth: true,
        clearColor: 0,
        clearAlpha: 1
      };
    }
    const e = new Color();
    this.renderer.getClearColor(e);
    return {
      autoClear: this.renderer.autoClear,
      autoClearColor: this.renderer.autoClearColor,
      autoClearStencil: this.renderer.autoClearStencil,
      autoClearDepth: this.renderer.autoClearDepth,
      clearColor: e.getHex(),
      clearAlpha: this.renderer.getClearAlpha()
    };
  }
  setColorState(e) {
    if (this.renderer) {
      this.renderer.setClearColor(e.clearColor, e.clearAlpha);
      this.renderer.autoClear = e.autoClear;
      this.renderer.autoClearColor = e.autoClearColor;
      this.renderer.autoClearStencil = e.autoClearStencil;
      this.renderer.autoClearDepth = e.autoClearDepth;
    }
  }
  createRawShaderMaterial(e) {
    e = Object.assign({
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      vertexShader: blitVert,
      fragmentShader: blitFrag,
      derivatives: false
    }, e);
    e.vertexShader = (e.vertexShaderPrefix ? e.vertexShaderPrefix : e.derivatives ? this.vertexPrefix : this.vertexPrefix) + e.vertexShader;
    e.fragmentShader = (e.fragmentShaderPrefix ? e.fragmentShaderPrefix : e.derivatives ? this.fragmentPrefix : this.fragmentPrefix) + e.fragmentShader;
    delete e.vertexShaderPrefix;
    delete e.fragmentShaderPrefix;
    delete e.derivatives;
    e.glslVersion = this.isWebGL2 ? GLSL3 : GLSL1;
    let t = new RawShaderMaterial(e);
    taskManager.add(t);
    return t;
  }
  createDataTexture(e, t, r, n = false, a = true) {
    let l = new DataTexture(e, t, r, RGBAFormat, n ? FloatType : UnsignedByteType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, a ? NearestFilter : LinearFilter, a ? NearestFilter : LinearFilter, 0);
    l.needsUpdate = true;
    return l;
  }
  createRenderTarget(e, t, r = false, n = false, a = 0) {
    return new WebGLRenderTarget(e, t, {
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping,
      magFilter: r ? NearestFilter : LinearFilter,
      minFilter: r ? NearestFilter : LinearFilter,
      type: typeof n == "boolean" ? n ? this.floatType : UnsignedByteType : n,
      anisotropy: 0,
      colorSpace: NoColorSpace,
      depthBuffer: false,
      stencilBuffer: false,
      samples: browser$1.isSupportMSAA ? a : 0
    });
  }
  createMultisampleRenderTarget(e, t, r = false, n = false, a = 8) {
    if (!this.renderer || !this.isWebGL2 || !browser$1.isSupportMSAA) {
      return this.createRenderTarget(e, t, r, n);
    } else {
      return new WebGLRenderTarget(e, t, {
        wrapS: ClampToEdgeWrapping,
        wrapT: ClampToEdgeWrapping,
        magFilter: r ? NearestFilter : LinearFilter,
        minFilter: r ? NearestFilter : LinearFilter,
        type: n ? this.floatType : UnsignedByteType,
        anisotropy: 0,
        colorSpace: NoColorSpace,
        depthBuffer: false,
        stencilBuffer: false,
        samples: a
      });
    }
  }
  clearMultisampleRenderTargetState(e) {
    e = e || this.renderer.getRenderTarget();
    if (e && e.samples > 0) {
      const t = this.renderer.properties.get(e);
      let r = this.renderer.getContext();
      r.bindFramebuffer(r.READ_FRAMEBUFFER, t.__webglMultisampledFramebuffer);
      r.bindFramebuffer(r.DRAW_FRAMEBUFFER, t.__webglFramebuffer);
      const n = e.width;
      const a = e.height;
      let l = r.COLOR_BUFFER_BIT;
      if (e.depthBuffer) {
        l |= r.DEPTH_BUFFER_BIT;
      }
      if (e.stencilBuffer) {
        l |= r.STENCIL_BUFFER_BIT;
      }
      r.blitFramebuffer(0, 0, n, a, 0, 0, n, a, l, r.NEAREST);
      r.bindFramebuffer(r.FRAMEBUFFER, t.__webglMultisampledFramebuffer);
    }
  }
}
const fboHelper = new FboHelper();
