let random = math.getSeedRandomFn("balloonBody-25");
const GRAVITY_FACTOR = 40;
class HomeBalloonsBody {
  position0 = new Vector3();
  velocity0 = new Vector3();
  position = new Vector3();
  velocity = new Vector3();
  gravityVel = new Vector3();
  gravityAcc = new Vector3();
  gravityForce = new Vector3();
  angularVelocity = new Vector3();
  torque = new Vector3();
  quaternion = new Quaternion();
  radius = 1;
  mass = 1;
  volume = 1;
  density = 1;
  friction = 1;
  frictionTot = 0;
  restitution = 1;
  inertia = 0;
  constructor(e = 1, t = 1, r = 0.5, n = 0.5, a = false) {
    this.position0.set((random() - 0.5) * 12, (random() - 0.5) * 12, a ? 7 + random() : (random() - 0.5) * 6);
    this.velocity0.copy(this.position0).multiplyScalar(-2);
    this.position.copy(this.position0);
    this.velocity.copy(this.velocity0);
    this.radius = e * 1.05;
    this.density = t;
    this.friction = r;
    this.restitution = n;
    this.volume = Math.PI * this.radius * 1.333333;
    this.mass = this.volume * this.radius * this.radius * this.density;
    this.inertia = this.mass * this.radius * this.radius * 0.4;
    this.reset();
  }
  reset() {
    this.position.copy(this.position0);
    this.velocity.copy(this.velocity0);
  }
  applyImpulse() {
    this.gravityForce.copy(this.position).negate().multiplyScalar(10);
    this.gravityAcc.copy(this.gravityForce);
    this.gravityForce.set(Math.random() - 0.5, Math.random() - 0.5, Math.random() - 0.5).multiplyScalar(80);
    this.gravityAcc.add(this.gravityForce).multiplyScalar(1 / this.mass);
    this.velocity.negate();
    this.velocity.add(this.gravityAcc);
  }
  updateGravity(e) {
    this.gravityForce.copy(this.position).negate().multiplyScalar(GRAVITY_FACTOR);
    this.gravityAcc.copy(this.gravityForce).multiplyScalar(1 / this.mass);
    this.gravityAcc.multiplyScalar(1 / (1 + this.frictionTot));
    this.velocity.addScaledVector(this.gravityAcc, e);
    this.frictionTot *= 0.5;
  }
  update(e) {
    this.position.addScaledVector(this.velocity, e);
    this.velocity.multiplyScalar(Math.pow(0.2, e));
  }
}
const _mouse = new Vector3();
const _mousePrev = new Vector3();
const _vel = new Vector3();
const _pos = new Vector3();
const _v0$3 = new Vector3();
const _v1$6 = new Vector3();
const _p1$1 = new Vector3();
const _normal = new Vector3();
const _q$2 = new Quaternion();
const _mousePushForce = new Vector3();
const _mouseBA = new Vector3();
class HomeBalloonsPhysics {
  MOUSE_RADIUS = 0.025;
  MOUSE_INFLUENCE = 0.1;
  MOUSE_PUSH_FORCE = 0.12;
  bodies = [];
  isActive = true;
  initWorld() {
    for (let e = 0; e < homeBalloons.NUM_BALLOONS; e++) {
      const t = homeBalloons.balloonList[e];
      const {
        radius: r,
        density: n,
        friction: a,
        restitution: l,
        isSemitransparent: c
      } = t;
      const u = new HomeBalloonsBody(r, n, a, l, c);
      this.bodies.push(u);
    }
  }
  reset() {
    for (let e = 0; e < this.bodies.length; e++) {
      this.bodies[e].reset();
    }
  }
  update(e) {
    if (!this.isActive) {
      return;
    }
    _p1$1.set(input.mouseXY.x, input.mouseXY.y, 0.5);
    _p1$1.unproject(properties.camera);
    _p1$1.sub(properties.camera.position).normalize();
    const r = (0 - properties.camera.position.z) / _p1$1.z;
    _p1$1.multiplyScalar(r);
    _mouse.copy(properties.camera.position).add(_p1$1);
    _mousePushForce.copy(_mouse).sub(_mousePrev).multiplyScalar(this.MOUSE_PUSH_FORCE / e);
    _mouseBA.copy(_mouse).sub(properties.camera.position);
    let n = _mouseBA.lengthSq();
    _mousePrev.copy(_mouse);
    for (let a = 0; a < this.bodies.length; a++) {
      const l = this.bodies[a];
      l.updateGravity(e);
      _vel.copy(l.velocity);
      _pos.copy(l.position);
      for (let p = a + 1; p < this.bodies.length; p++) {
        const g = this.bodies[p];
        _v1$6.copy(g.velocity);
        _p1$1.copy(g.position);
        _normal.copy(_pos).sub(_p1$1);
        const v = _normal.length();
        const _ = l.radius + g.radius;
        if (v < _) {
          const T = Math.sqrt(l.friction * g.friction, 2);
          l.frictionTot += T;
          g.frictionTot += T;
          _normal.normalize();
          _normal.multiplyScalar((v - _) * 0.5);
          _pos.sub(_normal);
          _p1$1.add(_normal);
          _normal.normalize();
          const M = _vel.dot(_normal);
          const S = _v1$6.dot(_normal);
          const b = l.mass;
          const C = g.mass;
          const w = l.restitution;
          const R = g.restitution;
          const E = (b * M + C * S - C * (M - S) * w) / (b + C);
          const I = (b * M + C * S - b * (S - M) * R) / (b + C);
          _vel.addScaledVector(_normal, (E - M) / (1 + T));
          _v1$6.addScaledVector(_normal, (I - S) / (1 + T));
          g.position.copy(_p1$1);
          g.velocity.copy(_v1$6);
        }
      }
      _v0$3.copy(_pos).sub(properties.camera.position);
      let c = _v0$3.dot(_mouseBA) / n;
      c = _v0$3.sub(_v1$6.copy(_mouseBA).multiplyScalar(c)).length() - l.radius - this.MOUSE_RADIUS;
      if (c < 0) {
        _v0$3.copy(_pos).sub(properties.camera.position).cross(_mouseBA).normalize();
        _v1$6.copy(_mouseBA).cross(_v0$3).normalize();
        _pos.sub(_v1$6.multiplyScalar(this.MOUSE_INFLUENCE * c));
        _v1$6.multiplyScalar(-this.MOUSE_PUSH_FORCE / e);
        _vel.add(_v1$6);
        _vel.add(_mousePushForce);
      }
      let u = _pos.length();
      if (u > 0) {
        _v0$3.set(1, 1, 1).normalize();
        let p = 1 - Math.abs(_v0$3.dot(_v1$6.copy(_pos).normalize()));
        p *= e * math.fit(u, 0, 2, 0, 1) * 0.5;
        p *= a % 2 * 2 - 1;
        _q$2.setFromAxisAngle(_v0$3, p);
        _v1$6.copy(_pos).applyQuaternion(_q$2).sub(_v0$3.copy(_pos));
        _vel.add(_v1$6);
      }
      _v0$3.cross(_vel);
      let f = _v0$3.length();
      f /= l.inertia;
      if (f > 0) {
        _v0$3.normalize();
        _q$2.setFromAxisAngle(_v0$3, f * e);
        l.quaternion.premultiply(_q$2);
      }
      l.position.copy(_pos);
      l.velocity.copy(_vel);
      l.update(e);
    }
  }
}
const homeBalloonsPhysics = new HomeBalloonsPhysics();