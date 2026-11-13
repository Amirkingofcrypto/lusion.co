const _changeEvent = {
  type: "change"
};
const _startEvent = {
  type: "start"
};
const _endEvent = {
  type: "end"
};
class OrbitControls extends EventDispatcher {
  constructor(e, t) {
    super();
    if (t === undefined) {
      console.warn("THREE.OrbitControls: The second parameter \"domElement\" is now mandatory.");
    }
    if (t === document) {
      console.error("THREE.OrbitControls: \"document\" should not be used as the target \"domElement\". Please use \"renderer.domElement\" instead.");
    }
    this.object = e;
    this.domElement = t;
    this.domElement.style.touchAction = "none";
    this.enabled = true;
    this.target = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.15;
    this.enableZoom = false;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    };
    this.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    };
    this.touches = {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.scale = 1;
    this._domElementKeyEvents = null;
    this.getPolarAngle = function () {
      return c.phi;
    };
    this.getAzimuthalAngle = function () {
      return c.theta;
    };
    this.getDistance = function () {
      return this.object.position.distanceTo(this.target);
    };
    this.listenToKeyEvents = function (Y) {
      Y.addEventListener("keydown", Oe);
      this._domElementKeyEvents = Y;
    };
    this.saveState = function () {
      r.target0.copy(r.target);
      r.position0.copy(r.object.position);
      r.zoom0 = r.object.zoom;
    };
    this.reset = function () {
      r.target.copy(r.target0);
      r.object.position.copy(r.position0);
      r.object.zoom = r.zoom0;
      r.scale = 1;
      r.object.updateProjectionMatrix();
      r.dispatchEvent(_changeEvent);
      r.update();
      a = n.NONE;
    };
    this.update = function () {
      const Y = new Vector3();
      const we = new Quaternion().setFromUnitVectors(e.up, new Vector3(0, 1, 0));
      const Ee = we.clone().invert();
      const Fe = new Vector3();
      const Xe = new Quaternion();
      const tt = Math.PI * 2;
      return function () {
        const ot = r.object.position;
        Y.copy(ot).sub(r.target);
        Y.applyQuaternion(we);
        c.setFromVector3(Y);
        if (r.autoRotate && a === n.NONE) {
          k(I());
        }
        if (r.enableDamping) {
          c.theta += u.theta * r.dampingFactor;
          c.phi += u.phi * r.dampingFactor;
        } else {
          c.theta += u.theta;
          c.phi += u.phi;
        }
        let je = r.minAzimuthAngle;
        let We = r.maxAzimuthAngle;
        if (isFinite(je) && isFinite(We)) {
          if (je < -Math.PI) {
            je += tt;
          } else if (je > Math.PI) {
            je -= tt;
          }
          if (We < -Math.PI) {
            We += tt;
          } else if (We > Math.PI) {
            We -= tt;
          }
          if (je <= We) {
            c.theta = Math.max(je, Math.min(We, c.theta));
          } else {
            c.theta = c.theta > (je + We) / 2 ? Math.max(je, c.theta) : Math.min(We, c.theta);
          }
        }
        c.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, c.phi));
        c.makeSafe();
        let Ge = r.enableDamping ? (r.scale - 1) * r.dampingFactor + 1 : r.scale;
        c.radius *= Ge;
        c.radius = Math.max(r.minDistance, Math.min(r.maxDistance, c.radius));
        if (r.enableDamping === true) {
          r.target.addScaledVector(f, r.dampingFactor);
        } else {
          r.target.add(f);
        }
        Y.setFromSpherical(c);
        Y.applyQuaternion(Ee);
        ot.copy(r.target).add(Y);
        r.object.lookAt(r.target);
        if (r.enableDamping === true) {
          u.theta *= 1 - r.dampingFactor;
          u.phi *= 1 - r.dampingFactor;
          f.multiplyScalar(1 - r.dampingFactor);
        } else {
          u.set(0, 0, 0);
          f.set(0, 0, 0);
        }
        r.scale = r.scale / Ge;
        if (p || Fe.distanceToSquared(r.object.position) > l || (1 - Xe.dot(r.object.quaternion)) * 8 > l) {
          r.dispatchEvent(_changeEvent);
          Fe.copy(r.object.position);
          Xe.copy(r.object.quaternion);
          p = false;
          return true;
        } else {
          return false;
        }
      };
    }();
    this.dispose = function () {
      r.domElement.removeEventListener("contextmenu", W);
      r.domElement.removeEventListener("pointerdown", Ue);
      r.domElement.removeEventListener("pointercancel", Me);
      r.domElement.removeEventListener("wheel", $);
      r.domElement.removeEventListener("pointermove", fe);
      r.domElement.removeEventListener("pointerup", Se);
      if (r._domElementKeyEvents !== null) {
        r._domElementKeyEvents.removeEventListener("keydown", Oe);
      }
    };
    const r = this;
    const n = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let a = n.NONE;
    const l = 0.000001;
    const c = new Spherical();
    const u = new Spherical();
    const f = new Vector3();
    let p = false;
    const g = new Vector2();
    const v = new Vector2();
    const _ = new Vector2();
    const T = new Vector2();
    const M = new Vector2();
    const S = new Vector2();
    const b = new Vector2();
    const C = new Vector2();
    const w = new Vector2();
    const R = [];
    const E = {};
    function I() {
      return Math.PI * 2 / 60 / 60 * r.autoRotateSpeed;
    }
    function F() {
      return Math.pow(0.95, r.zoomSpeed);
    }
    function k(Y) {
      u.theta -= Y;
    }
    function L(Y) {
      u.phi -= Y;
    }
    const D = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        Y.setFromMatrixColumn(Fe, 0);
        Y.multiplyScalar(-Ee);
        f.add(Y);
      };
    }();
    const ne = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        if (r.screenSpacePanning === true) {
          Y.setFromMatrixColumn(Fe, 1);
        } else {
          Y.setFromMatrixColumn(Fe, 0);
          Y.crossVectors(r.object.up, Y);
        }
        Y.multiplyScalar(Ee);
        f.add(Y);
      };
    }();
    const re = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        const Xe = r.domElement;
        if (r.object.isPerspectiveCamera) {
          const tt = r.object.position;
          Y.copy(tt).sub(r.target);
          let Re = Y.length();
          Re *= Math.tan(r.object.fov / 2 * Math.PI / 180);
          D(Ee * 2 * Re / Xe.clientHeight, r.object.matrix);
          ne(Fe * 2 * Re / Xe.clientHeight, r.object.matrix);
        } else if (r.object.isOrthographicCamera) {
          D(Ee * (r.object.right - r.object.left) / r.object.zoom / Xe.clientWidth, r.object.matrix);
          ne(Fe * (r.object.top - r.object.bottom) / r.object.zoom / Xe.clientHeight, r.object.matrix);
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          r.enablePan = false;
        }
      };
    }();
    function ce(Y) {
      if (r.object.isPerspectiveCamera) {
        r.scale /= Y;
      } else if (r.object.isOrthographicCamera) {
        r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * Y));
        r.object.updateProjectionMatrix();
        p = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        r.enableZoom = false;
      }
    }
    function z(Y) {
      if (r.object.isPerspectiveCamera) {
        r.scale *= Y;
      } else if (r.object.isOrthographicCamera) {
        r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / Y));
        r.object.updateProjectionMatrix();
        p = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        r.enableZoom = false;
      }
    }
    function j(Y) {
      g.set(Y.clientX, Y.clientY);
    }
    function X(Y) {
      b.set(Y.clientX, Y.clientY);
    }
    function Z(Y) {
      T.set(Y.clientX, Y.clientY);
    }
    function q(Y) {
      v.set(Y.clientX, Y.clientY);
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      k(Math.PI * 2 * _.x / we.clientHeight);
      L(Math.PI * 2 * _.y / we.clientHeight);
      g.copy(v);
      r.update();
    }
    function ue(Y) {
      C.set(Y.clientX, Y.clientY);
      w.subVectors(C, b);
      if (w.y > 0) {
        ce(F());
      } else if (w.y < 0) {
        z(F());
      }
      b.copy(C);
      r.update();
    }
    function oe(Y) {
      M.set(Y.clientX, Y.clientY);
      S.subVectors(M, T).multiplyScalar(r.panSpeed);
      re(S.x, S.y);
      T.copy(M);
      r.update();
    }
    function te(Y) {
      if (Y.deltaY < 0) {
        z(F());
      } else if (Y.deltaY > 0) {
        ce(F());
      }
      r.update();
    }
    function le(Y) {
      let we = false;
      switch (Y.code) {
        case r.keys.UP:
          re(0, r.keyPanSpeed);
          we = true;
          break;
        case r.keys.BOTTOM:
          re(0, -r.keyPanSpeed);
          we = true;
          break;
        case r.keys.LEFT:
          re(r.keyPanSpeed, 0);
          we = true;
          break;
        case r.keys.RIGHT:
          re(-r.keyPanSpeed, 0);
          we = true;
          break;
      }
      if (we) {
        Y.preventDefault();
        r.update();
      }
    }
    function Te() {
      if (R.length === 1) {
        g.set(R[0].pageX, R[0].pageY);
      } else {
        const Y = (R[0].pageX + R[1].pageX) * 0.5;
        const we = (R[0].pageY + R[1].pageY) * 0.5;
        g.set(Y, we);
      }
    }
    function K() {
      if (R.length === 1) {
        T.set(R[0].pageX, R[0].pageY);
      } else {
        const Y = (R[0].pageX + R[1].pageX) * 0.5;
        const we = (R[0].pageY + R[1].pageY) * 0.5;
        T.set(Y, we);
      }
    }
    function G() {
      const Y = R[0].pageX - R[1].pageX;
      const we = R[0].pageY - R[1].pageY;
      const Ee = Math.sqrt(Y * Y + we * we);
      b.set(0, Ee);
    }
    function U() {
      if (r.enableZoom) {
        G();
      }
      if (r.enablePan) {
        K();
      }
    }
    function N() {
      if (r.enableZoom) {
        G();
      }
      if (r.enableRotate) {
        Te();
      }
    }
    function he(Y) {
      if (R.length == 1) {
        v.set(Y.pageX, Y.pageY);
      } else {
        const Ee = Le(Y);
        const Fe = (Y.pageX + Ee.x) * 0.5;
        const Xe = (Y.pageY + Ee.y) * 0.5;
        v.set(Fe, Xe);
      }
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      k(Math.PI * 2 * _.x / we.clientHeight);
      L(Math.PI * 2 * _.y / we.clientHeight);
      g.copy(v);
    }
    function ve(Y) {
      if (R.length === 1) {
        M.set(Y.pageX, Y.pageY);
      } else {
        const we = Le(Y);
        const Ee = (Y.pageX + we.x) * 0.5;
        const Fe = (Y.pageY + we.y) * 0.5;
        M.set(Ee, Fe);
      }
      S.subVectors(M, T).multiplyScalar(r.panSpeed);
      re(S.x, S.y);
      T.copy(M);
    }
    function de(Y) {
      const we = Le(Y);
      const Ee = Y.pageX - we.x;
      const Fe = Y.pageY - we.y;
      const Xe = Math.sqrt(Ee * Ee + Fe * Fe);
      C.set(0, Xe);
      w.set(0, Math.pow(C.y / b.y, r.zoomSpeed));
      ce(w.y);
      b.copy(C);
    }
    function xe(Y) {
      if (r.enableZoom) {
        de(Y);
      }
      if (r.enablePan) {
        ve(Y);
      }
    }
    function ee(Y) {
      if (r.enableZoom) {
        de(Y);
      }
      if (r.enableRotate) {
        he(Y);
      }
    }
    function Ue(Y) {
      if (r.enabled !== false) {
        if (R.length === 0) {
          r.domElement.setPointerCapture(Y.pointerId);
          r.domElement.addEventListener("pointermove", fe);
          r.domElement.addEventListener("pointerup", Se);
        }
        O(Y);
        if (Y.pointerType === "touch") {
          Ye(Y);
        } else {
          Be(Y);
        }
      }
    }
    function fe(Y) {
      if (r.enabled !== false) {
        if (Y.pointerType === "touch") {
          st(Y);
        } else {
          se(Y);
        }
      }
    }
    function Se(Y) {
      me(Y);
      if (R.length === 0) {
        r.domElement.releasePointerCapture(Y.pointerId);
        r.domElement.removeEventListener("pointermove", fe);
        r.domElement.removeEventListener("pointerup", Se);
      }
      r.dispatchEvent(_endEvent);
      a = n.NONE;
    }
    function Me(Y) {
      me(Y);
    }
    function Be(Y) {
      let we;
      switch (Y.button) {
        case 0:
          we = r.mouseButtons.LEFT;
          break;
        case 1:
          we = r.mouseButtons.MIDDLE;
          break;
        case 2:
          we = r.mouseButtons.RIGHT;
          break;
        default:
          we = -1;
      }
      switch (we) {
        case MOUSE.DOLLY:
          if (r.enableZoom === false) {
            return;
          }
          X(Y);
          a = n.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enablePan === false) {
              return;
            }
            Z(Y);
            a = n.PAN;
          } else {
            if (r.enableRotate === false) {
              return;
            }
            j(Y);
            a = n.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enableRotate === false) {
              return;
            }
            j(Y);
            a = n.ROTATE;
          } else {
            if (r.enablePan === false) {
              return;
            }
            Z(Y);
            a = n.PAN;
          }
          break;
        default:
          a = n.NONE;
      }
      if (a !== n.NONE) {
        r.dispatchEvent(_startEvent);
      }
    }
    function se(Y) {
      if (r.enabled !== false) {
        switch (a) {
          case n.ROTATE:
            if (r.enableRotate === false) {
              return;
            }
            q(Y);
            break;
          case n.DOLLY:
            if (r.enableZoom === false) {
              return;
            }
            ue(Y);
            break;
          case n.PAN:
            if (r.enablePan === false) {
              return;
            }
            oe(Y);
            break;
        }
      }
    }
    function $(Y) {
      if (r.enabled !== false && r.enableZoom !== false && a === n.NONE) {
        r.dispatchEvent(_startEvent);
        te(Y);
        r.dispatchEvent(_endEvent);
      }
    }
    function Oe(Y) {
      if (r.enabled !== false && r.enablePan !== false) {
        le(Y);
      }
    }
    function Ye(Y) {
      Ie(Y);
      switch (R.length) {
        case 1:
          switch (r.touches.ONE) {
            case TOUCH.ROTATE:
              if (r.enableRotate === false) {
                return;
              }
              Te();
              a = n.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (r.enablePan === false) {
                return;
              }
              K();
              a = n.TOUCH_PAN;
              break;
            default:
              a = n.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (r.enableZoom === false && r.enablePan === false) {
                return;
              }
              U();
              a = n.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (r.enableZoom === false && r.enableRotate === false) {
                return;
              }
              N();
              a = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = n.NONE;
          }
          break;
        default:
          a = n.NONE;
      }
      if (a !== n.NONE) {
        r.dispatchEvent(_startEvent);
      }
    }
    function st(Y) {
      Ie(Y);
      switch (a) {
        case n.TOUCH_ROTATE:
          if (r.enableRotate === false) {
            return;
          }
          he(Y);
          r.update();
          break;
        case n.TOUCH_PAN:
          if (r.enablePan === false) {
            return;
          }
          ve(Y);
          r.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (r.enableZoom === false && r.enablePan === false) {
            return;
          }
          xe(Y);
          r.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === false && r.enableRotate === false) {
            return;
          }
          ee(Y);
          r.update();
          break;
        default:
          a = n.NONE;
      }
    }
    function W(Y) {
      r.enabled;
    }
    function O(Y) {
      R.push(Y);
    }
    function me(Y) {
      delete E[Y.pointerId];
      for (let we = 0; we < R.length; we++) {
        if (R[we].pointerId == Y.pointerId) {
          R.splice(we, 1);
          return;
        }
      }
    }
    function Ie(Y) {
      let we = E[Y.pointerId];
      if (we === undefined) {
        we = new Vector2();
        E[Y.pointerId] = we;
      }
      we.set(Y.pageX, Y.pageY);
    }
    function Le(Y) {
      const we = Y.pointerId === R[0].pointerId ? R[1] : R[0];
      return E[we.pointerId];
    }
    r.domElement.addEventListener("contextmenu", W);
    r.domElement.addEventListener("pointerdown", Ue);
    r.domElement.addEventListener("pointercancel", Me);
    r.domElement.addEventListener("wheel", $, {
      passive: false
    });
    this.update();
  }
}
class DeviceOrientationControls {
  object = null;
  enabled = true;
  hasValue = false;
  deviceOrientation = {};
  screenOrientation = 0;
  alphaOffset = 0;
  zee = new Vector3(0, 0, 1);
  euler = new Euler();
  q0 = new Quaternion();
  q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
  _onBoundDeviceOrientationChangeEvent;
  _onBoundScreenOrientationChangeEvent;
  constructor(e) {
    this.object = e;
    this.object.rotation.reorder("YXZ");
    this._onBoundDeviceOrientationChangeEvent = this._onDeviceOrientationChangeEvent.bind(this);
    this._onBoundScreenOrientationChangeEvent = this._onScreenOrientationChangeEvent.bind(this);
    this.connect();
  }
  _onDeviceOrientationChangeEvent(e) {
    this.deviceOrientation = e;
  }
  _onScreenOrientationChangeEvent() {
    this.screenOrientation = window.orientation || 0;
  }
  setObjectQuaternion(e, t, r, n, a) {
    this.euler.set(r, t, -n, "YXZ");
    e.setFromEuler(this.euler);
    e.multiply(this.q1);
    e.multiply(this.q0.setFromAxisAngle(this.zee, -a));
  }
  connect() {
    this._onBoundScreenOrientationChangeEvent();
    if (window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission == "function") {
      window.DeviceOrientationEvent.requestPermission().then(e => {
        if (e == "granted") {
          window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
          window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
        }
      }).catch(function (e) {});
    } else {
      window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
      window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
    }
    this.enabled = true;
  }
  disconnect() {
    window.removeEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
    window.removeEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
    this.enabled = false;
  }
  update() {
    if (this.enabled === false) {
      return;
    }
    let e = this.deviceOrientation;
    if (e) {
      let t = e.alpha ? MathUtils$1.degToRad(e.alpha) + this.alphaOffset : 0;
      let r = e.beta ? MathUtils$1.degToRad(e.beta) : 0;
      let n = e.gamma ? MathUtils$1.degToRad(e.gamma) : 0;
      let a = this.screenOrientation ? MathUtils$1.degToRad(this.screenOrientation) : 0;
      this.setObjectQuaternion(this.object.quaternion, t, r, n, a);
      this.hasValue = this.hasValue || e.alpha && e.beta && e.gamma;
    }
  }
  dispose() {
    this.disconnect();
  }
}
class CameraControls {
  useOrbitControls = false;
  preInit(e) {
    this.DEFAULT_CAMERA_POSITION = new Vector3(0, 0, 5);
    this.DEFAULT_LOOKAT_POSITION = new Vector3(0, 0, 0);
    this._brownianMotion = null;
    this._orbitControls = null;
    this._orbitCamera = null;
    this._deviceOrientationControls = null;
    this._baseDeviceControlQuaternion = null;
    this._targetDeviceControlQuaternion = null;
    this._deviceOrientationCamera = null;
    this._hasDeviceOrientationControlValues = false;
    this._q = new Quaternion();
    this._e = new Euler();
    this._v1 = new Vector3();
    this._v2 = new Vector3();
    this._camera = properties.camera;
    this._deviceOrientationEuler = new Euler();
    this._camera.position.copy(this.DEFAULT_CAMERA_POSITION);
    this._brownianMotion = new BrownianMotion();
    if (this.useOrbitControls === true) {
      this._orbitCamera = this._camera.clone();
      this._orbitControls = new OrbitControls(this._orbitCamera, document.documentElement);
      this._orbitControls.enableDamping = true;
      this._orbitControls.target0.copy(this.DEFAULT_LOOKAT_POSITION);
      this._orbitControls.reset();
    }
    if (browser$1.isMobile) {
      this._deviceOrientationCamera = new Camera();
      this._baseDeviceControlQuaternion = new Quaternion();
      this._targetDeviceControlQuaternion = new Quaternion();
      let t = () => {
        this._deviceOrientationControls = new DeviceOrientationControls(this._deviceOrientationCamera);
        this._deviceOrientationControls.connect();
      };
      if (browser$1.isIOS) {
        properties.onFirstClicked.addOnce(t);
      } else {
        t();
      }
    }
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let t = this._camera;
    this.DEFAULT_CAMERA_POSITION.copy(properties.defaultCameraPosition);
    this.DEFAULT_LOOKAT_POSITION.copy(properties.defaultLookAtPosition);
    t.near = properties.cameraNear;
    t.far = properties.cameraFar;
    t.matrix.identity();
    t.matrix.decompose(t.position, t.quaternion, t.scale);
    t.position.copy(this.DEFAULT_CAMERA_POSITION);
    t.lookAt(this.DEFAULT_LOOKAT_POSITION);
    if (browser$1.isMobile && this._deviceOrientationControls) {
      this._deviceOrientationControls.update();
    }
    if (this.useOrbitControls === true) {
      this._orbitControls.update();
      this._orbitCamera.updateMatrix();
      this._orbitCamera.matrix.decompose(t.position, t.quaternion, t.scale);
    }
    this._v1.set(0, 0, -1).applyQuaternion(t.quaternion);
    if (this.useOrbitControls === true) {
      this.cameraDistance = this._v2.copy(this._orbitControls.target).sub(t.position).dot(this._v1);
    } else {
      this.cameraDistance = this._v2.copy(this.DEFAULT_LOOKAT_POSITION).sub(t.position).dot(this._v1);
    }
    if (properties.cameraUsePhysical) {
      t.filmGauge = properties.cameraFilmGauge;
      t.setFocalLength(properties.cameraFocalLength);
    } else {
      t.fov = properties.cameraFov;
    }
    let r = t.fov;
    t.fov += properties.cameraDollyZoomFovOffset;
    let n = this.cameraDistance;
    n = n * Math.tan(r / 360 * Math.PI / 2) / Math.tan(t.fov / 360 * Math.PI / 2) - n;
    t.translateZ(n);
    t.setViewOffset(properties.viewportWidth, properties.viewportHeight, properties.cameraViewportOffsetX, properties.cameraViewportOffsetY, properties.viewportWidth, properties.viewportHeight);
    t.fov = r;
    this.cameraDistance += n;
    if (browser$1.isMobile) {
      if (this._deviceOrientationControls) {
        this._deviceOrientationControls.update();
        if (this._deviceOrientationControls.hasValue) {
          if (!this._hasDeviceOrientationControlValues) {
            this._targetDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion);
            this._baseDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion);
          }
          this._targetDeviceControlQuaternion.slerp(this._deviceOrientationCamera.quaternion, 0.15);
          this._baseDeviceControlQuaternion.slerp(this._targetDeviceControlQuaternion, 0.15);
          this._q.copy(this._baseDeviceControlQuaternion).invert().multiply(this._targetDeviceControlQuaternion);
          this._deviceOrientationEuler.setFromQuaternion(this._q);
          this._hasDeviceOrientationControlValues = true;
          t.quaternion.multiply(this._q);
        }
      }
    } else {
      t.translateZ(this.cameraDistance * -1);
      let a = math.clamp(input.mouseXY.y, -1, 1) * properties.cameraLookStrength;
      let l = math.clamp(-input.mouseXY.x, -1, 1) * properties.cameraLookStrength;
      properties.cameraLookX += (a - properties.cameraLookX) * properties.cameraLookEaseDamp;
      properties.cameraLookY += (l - properties.cameraLookY) * properties.cameraLookEaseDamp;
      this._e.set(properties.cameraLookX, properties.cameraLookY, 0);
      this._q.setFromEuler(this._e);
      t.quaternion.multiply(this._q);
      t.translateZ(this.cameraDistance);
    }
    t.matrix.compose(t.position, t.quaternion, t.scale);
    this._brownianMotion.positionAmplitude = properties.cameraShakePositionStrength;
    this._brownianMotion.positionFrequency = properties.cameraShakePositionSpeed;
    this._brownianMotion.rotationAmplitude = properties.cameraShakeRotationStrength;
    this._brownianMotion.rotationFrequency = properties.cameraShakeRotationSpeed;
    this._brownianMotion.update(e);
    t.matrix.multiply(this._brownianMotion.matrix);
    t.matrix.decompose(t.position, t.quaternion, t.scale);
    this._v1.set(0, 0, -1).applyQuaternion(t.quaternion);
    if (this.useOrbitControls === true) {
      properties.cameraDistance = this._v2.copy(this._orbitControls.target).sub(t.position).dot(this._v1);
    }
    t.updateMatrixWorld();
    properties.cameraDirection.set(0, 0, 1).applyMatrix4(t.matrixWorld).sub(this._v1.set(0, 0, 0).applyMatrix4(t.matrixWorld)).normalize();
  }
}
const cameraControls = new CameraControls();
const vert$g = `#define GLSLIFY 1
uniform float u_time;uniform sampler2D u_animationPositionTexture;uniform sampler2D u_animationOrientTexture;uniform vec2 u_animationTextureSize;uniform float u_loopLinearBlend;attribute vec2 boneIndices;attribute vec2 boneWeights;attribute vec4 tangent;attribute float ao;attribute vec3 instancePos;attribute vec4 instanceOrient;attribute vec3 instanceAnimationFrameFromToBlend1;attribute vec3 instanceAnimationFrameFromToBlend2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying vec2 v_uv;varying float v_ao;
#define PI 3.14159265359
vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void computeTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec4 uvBone12){vec3 bonePos1=texture2D(u_animationPositionTexture,uvBone12.xy).xyz;vec3 bonePos2=texture2D(u_animationPositionTexture,uvBone12.zw).xyz;vec4 boneOrient1=texture2D(u_animationOrientTexture,uvBone12.xy);vec4 boneOrient2=texture2D(u_animationOrientTexture,uvBone12.zw);pos=(qrotate(boneOrient1,pos)+bonePos1)*boneWeights.x+(qrotate(boneOrient2,pos)+bonePos2)*boneWeights.y;nor=normalize(qrotate(boneOrient1,nor)*boneWeights.x+qrotate(boneOrient2,nor)*boneWeights.y);tang=normalize(qrotate(boneOrient1,tang)*boneWeights.x+qrotate(boneOrient2,tang)*boneWeights.y);}void computeFrameTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec3 instanceAnimationFrameFromToBlend){vec4 dataOffset=boneIndices.xyxy+instanceAnimationFrameFromToBlend.xxyy*float(BONE_COUNT)+0.5;vec4 fromUvsBone12=vec4(floor(mod(dataOffset.xy,u_animationTextureSize.x))+.5,floor(dataOffset.xy/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec4 toUvsBone12=vec4(floor(mod(dataOffset.zw,u_animationTextureSize.x))+.5,floor(dataOffset.zw/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec3 fromPos=pos;vec3 fromNor=nor;vec3 fromTang=tang.xyz;computeTransform(fromPos,fromTang,fromNor,fromUvsBone12);vec3 toPos=pos;vec3 toNor=nor;vec3 toTang=tang.xyz;computeTransform(toPos,toNor,toTang,toUvsBone12);pos=mix(fromPos,toPos,instanceAnimationFrameFromToBlend.z);nor=mix(fromNor,toNor,instanceAnimationFrameFromToBlend.z);tang=mix(fromTang,toTang,instanceAnimationFrameFromToBlend.z);}void main(){v_ao=ao;vec3 posLoop=position;vec3 norLoop=normal;vec3 tangLoop=tangent.xyz;computeFrameTransform(posLoop,norLoop,tangLoop,instanceAnimationFrameFromToBlend1);vec3 posLinear=position;vec3 norLinear=normal;vec3 tangLinear=tangent.xyz;computeFrameTransform(posLinear,norLinear,tangLinear,instanceAnimationFrameFromToBlend2);vec3 pos=mix(posLoop,posLinear,u_loopLinearBlend);vec3 nor=mix(norLoop,norLinear,u_loopLinearBlend);vec3 tang=mix(tangLoop,tangLinear,u_loopLinearBlend);pos=qrotate(instanceOrient,pos)+instancePos.xyz;nor=normalize(qrotate(instanceOrient,nor));tang=normalize(qrotate(instanceOrient,tang));vec4 mvPos=modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;v_viewPosition=-mvPos.xyz;gl_Position=projectionMatrix*mvPos;}`;
const fragWhite = `#define GLSLIFY 1
uniform sampler2D u_matcapTexture;uniform float u_frameOutRatio;uniform float u_faceLedLight;uniform vec3 u_tintColor;uniform vec3 u_cardPosition;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_faceLedColor;uniform sampler2D u_envTexture;
#include <astronautCommon_pars>
float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}vec2 boxIntersection(in vec3 ro,in vec3 rd,vec3 boxSize){vec3 m=1.0/rd;vec3 n=m*ro;vec3 k=abs(m)*boxSize;vec3 t1=-n-k;vec3 t2=-n+k;float tN=max(max(t1.x,t1.y),t1.z);float tF=min(min(t2.x,t2.y),t2.z);if(tN>tF||tF<0.0)return vec2(-1.0);return vec2(tN,tF);}void main(){
#include <astronautCommon>
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),1.);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float outOfFrameRatio=linearStep(0.35,1.0,u_frameOutRatio);vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float metalMask=1.0-metalness;vec3 color=vec3(matcapShading*albedo);color+=0.8*zAxisShading;color*=u_ambientColor*(0.85+sunNdL*0.5);color*=metalMask;color+=(0.5+0.5*outOfFrameRatio)*metalMask*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color*=0.7+0.3*ao;color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 tunnelColor=color*0.75;vec2 dists=boxIntersection(v_worldPosition+vec3(0.,0.,u_whiteTunnelRatio*7.5*5.)+worldNormal*200.,-worldNormal,vec3(7.5,7.5,100.));float dist=200.-dists.x;vec3 hitPos=v_worldPosition+dist*worldNormal;tunnelColor+=vec3(1.)*(abs(worldNormal.x)*0.5+0.5)/dist*(0.25+0.75*ao)*(cos(u_whiteTunnelRatio*6.283185307179586*5.)*0.3+0.7)*3.5*(1.-metalness);color=mix(tunnelColor,color,outOfFrameRatio)*(0.7+armb.r*0.3);vec3 ledLightPos=u_cardPosition;vec3 ledLightDir=ledLightPos-v_worldPosition;float ledLightDist=length(ledLightDir);ledLightDir/=ledLightDist;float attenuationLed=1.0/(16.0*ledLightDist);color+=attenuationLed*u_faceLedLight*u_faceLedColor*getMetalShininess(V,u_cardPosition,N,(1.0-metalness),metalness);attenuationLed=1.0/(16.0*ledLightDist*ledLightDist);color+=0.5*u_faceLedLight*u_faceLedColor*albedo*attenuationLed*(0.5+0.5*saturate(dot(ledLightDir,N)));gl_FragColor.rgb=mix(u_bgColor,color,vec3(u_showRatio*0.8+0.2));
#ifndef IS_HELMET_GLASS
gl_FragColor.rgb+=outOfFrameRatio*max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao;
#endif
gl_FragColor.rgb=min(vec3(1.),gl_FragColor.rgb+u_tintColor*(1.-u_frameOutRatio*0.3)*(0.4+gl_FragColor.b*0.6));gl_FragColor.rgb*=0.95+mix(u_tintColor,vec3(1.0),v_ao)*0.1;gl_FragColor.rgb*=mix(1.,metalMask*0.7+0.3,linearStep(0.8,1.,u_frameOutRatio));gl_FragColor.a=0.01;}`;
const fragCard = `#define GLSLIFY 1
uniform sampler2D u_cardTexture;uniform sampler2D u_cardLedTexture;uniform vec2 u_cardUvOffset;uniform vec2 u_cardTextureSize;uniform vec3 u_cardColor;uniform float u_cardOpacity;uniform float u_time;varying vec2 v_uv;void main(){vec2 uv=v_uv/u_cardTextureSize;vec4 texel=texture2D(u_cardTexture,uv+u_cardUvOffset);vec3 ledTexture=pow(texture2D(u_cardLedTexture,fract(v_uv*vec2(20.,15.))).rgb,vec3(2.2));float ledMask=dot(ledTexture,u_cardColor*texel.r);gl_FragColor.rgb=pow(ledTexture,vec3(1./2.2))*ledMask*2.5;gl_FragColor.a=texel.r*0.35;}`;
const fragBlack = `#define GLSLIFY 1
uniform sampler2D u_blackTunnelTexture;uniform sampler2D u_matcapTexture;uniform sampler2D u_envTexture;uniform float u_sunFactor;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_sunFadeColor;uniform float u_blackTunnelRatio;uniform float u_offsetZ;uniform float u_frameIn;uniform float u_endRatio;
#ifdef IS_CLONE
uniform float u_alpha;
#endif
#include <astronautCommon_pars>
float sdBoxFrame(vec3 p,vec3 b,float e){p=abs(p)-b;vec3 q=abs(p+e)-e;return min(min(length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));}float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}void main(){
#include <astronautCommon>
vec2 uvDiff=cartesianToPolar(worldNormal);vec2 uvSpec=cartesianToPolar(reflection);vec3 blackTunnelEnvDiff=texture2D(u_blackTunnelTexture,0.25*uvDiff).rgb;vec3 blackTunnelEnvSpec=texture2D(u_blackTunnelTexture,0.25*uvSpec).rgb*(0.2+metalness*0.7)*2.;
#ifdef IS_CLONE
gl_FragColor.rgb=(blackTunnelEnvDiff*3.5*blackTunnelEnvDiff+blackTunnelEnvSpec*3.5)*v_ao*u_alpha*(0.5+fresnel*0.9);gl_FragColor.a=mix(max(gl_FragColor.r,max(gl_FragColor.g,gl_FragColor.b))*u_alpha,0.,u_endRatio);
#else
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),0.2+1.*u_frameIn);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float metalMask=1.0-metalness;float metalShininess=u_sunFactor*getMetalShininess(V,sunPosition,N,(1.0-0.9*metalness),0.4*metalness);vec3 color=vec3(matcapShading*albedo);color+=zAxisShading;color*=metalMask;color*=mix(u_ambientColor*(0.85+sunNdL*0.5),vec3(fresnel*2.),u_blackTunnelRatio*0.5);color+=linearStep(0.,10.0,metalShininess);color*=mix(0.5+0.5*ao,0.75+0.25*ao,u_blackTunnelRatio);color+=metalMask*u_sunFactor*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 blackTunnelColor=(color*blackTunnelEnvSpec*(7.+metalness*10.)+albedo*blackTunnelEnvDiff*1.6)*(1.3-abs(reflection.z))*(0.5+ao*0.5);float GRID_SIZE=20.0;float offsetZ=mod(u_offsetZ,GRID_SIZE);vec3 ro=vec3(0.0,0.0,offsetZ);float t=0.0;vec3 relPos=v_worldPosition+worldNormal*3.+vec3(0.,0.,u_offsetZ);float repDist=GRID_SIZE-1.;vec3 relPosRep=mod(relPos+0.5*repDist,repDist)-0.5*repDist;float sdf=sdBoxFrame(relPosRep,vec3(GRID_SIZE-1.)*.5,1.);blackTunnelColor+=exp(-sdf*0.25)*blackTunnelEnvDiff*2.;gl_FragColor.rgb=color;gl_FragColor.rgb=mix(gl_FragColor.rgb,0.3*gl_FragColor.rgb+blackTunnelColor,clamp(u_blackTunnelRatio*2.-1.+ao,0.,1.));gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,vec3(u_showRatio));gl_FragColor.rgb*=(0.3+armb.r*0.7);gl_FragColor.rgb+=max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao*(1.-u_blackTunnelRatio);gl_FragColor.a=0.01+0.1*max(0.0,gl_FragColor.g-1.+metalness*0.2)*(0.5+metalness*1.5)+gl_FragColor.b*u_blackTunnelRatio*dot(vec3(0.299,0.587,0.114),blackTunnelColor)*5.;gl_FragColor.a+=metalShininess;gl_FragColor.a*=(0.5+fresnel*0.9);
#endif
}`;
const astronautCommon = `#define GLSLIFY 1
vec3 worldNormal=normalize(v_worldNormal);vec3 worldTangent=normalize(v_worldTangent.xyz);vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_norTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_armbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 N=worldNormal;vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdV=clamp(abs(dot(N,V)),0.001,1.0);float fresnel=pow(1.0-NdV,5.0);`;
const astronautCommonPars = `#define GLSLIFY 1
uniform sampler2D u_armbTexture;uniform sampler2D u_norTexture;uniform float u_time;uniform vec3 u_bgColor;uniform float u_showRatio;
#ifdef IS_WHITE
uniform float u_whiteTunnelRatio;
#endif
varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_ao;varying vec3 v_viewPosition;const float PI=3.14159265359;const float RECIPROCAL_PI=0.31830988618;const float RECIPROCAL_PI2=0.15915494;const float LN2=0.6931472;const float ENV_LODS=6.0;
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec2 cartesianToPolar(vec3 n){vec2 uv;uv.x=atan(n.z,n.x)*RECIPROCAL_PI2+0.5;uv.y=asin(n.y)*RECIPROCAL_PI+0.5;return uv;}mat4 rotation3d(vec3 axis,float angle){axis=normalize(axis);float s=sin(angle);float c=cos(angle);float oc=1.0-c;return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.0,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.0,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.0,0.0,0.0,0.0,1.0);}`;
let _m0 = new Matrix4();
let _v0$1 = new Vector3();
let _v1$4 = new Vector3();
let _p0 = new Vector3();
let _p1 = new Vector3();
let _e0 = new Euler();
let _q0$1 = new Quaternion();
let _q1$2 = new Quaternion();
let _matrixWorld$1 = new Matrix4();
let _matrixWorldInverse$1 = new Matrix4();
let _projectionMatrix$1 = new Matrix4();
let _perspectiveCamera = new PerspectiveCamera();