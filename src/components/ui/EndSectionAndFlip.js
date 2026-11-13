/**
 * ============================================================================
 * Lusion Modular Component: 27-end-section-flip
 * File: src/components/ui/EndSectionAndFlip.js
 * Description: FlipSim, FlipAnimation, EndSection, ScrollNavSection & PageExtraSections
 * Original Engine Lines: 46491 - 47616
 * ============================================================================
 */
class FlipSim {
  constructor() {
    this.isFlushing = false;
    this.hasInitialized = false;
    this.emitterPosA = new Vector2(1, 1);
    this.emitterPosB = new Vector2(1, 1);
    this.colliderRectList = [];
  }
  addColliderRect = (e, t = 0, r = 0, n = 0, a = 0) => {
    let l = this.fInvSpacing;
    let c = this.fNumY;
    let u = clamp(Math.round(e.x * l) - t, 0, this.fNumX - 1);
    let f = clamp(Math.round(e.y * l) - a, 0, this.fNumY - 1);
    let p = clamp(Math.round((e.x + e.w) * l) + r, 0, this.fNumX - 1);
    let g = clamp(Math.round((e.y + e.h) * l) + n, 0, this.fNumY - 1);
    p = Math.max(u, p);
    g = Math.max(f, g);
    this.colliderRectList.push(e);
    for (let _ = u; _ <= p; _++) {
      for (let T = f; T <= g; T++) {
        var v = _ * c + T;
        this.s[v] = 0;
      }
    }
    e.x = u / l;
    e.y = f / l;
    e.w = Math.max(1, p - u) / l;
    e.h = Math.max(1, g - f) / l;
    e.l = e.x;
    e.r = e.x + e.w;
    e.b = e.y;
    e.t = e.y + e.h;
    e.hw = e.w / 2;
    e.hh = e.h / 2;
    e.cx = e.x + e.hw;
    e.cy = e.y + e.hh;
  };
  init(e, t, r, n, a, l) {
    let c = this.hasInitialized;
    this.colliderRectList.length = 0;
    this.density = e;
    this.fNumX = Math.ceil(t / n) + 1;
    this.fNumY = Math.ceil(r / n) + 1;
    this.h = Math.max(t / this.fNumX, r / this.fNumY);
    this.fInvSpacing = 1 / this.h;
    var u = this.fNumX * this.fNumY;
    this.tankInnerWidth = (this.fNumX - 2) * this.h;
    this.tankInnerHeight = (this.fNumY - 2) * this.h;
    if (!c || u > this.cellType.length) {
      this.u = new Float32Array(u);
      this.v = new Float32Array(u);
      this.du = new Float32Array(u);
      this.dv = new Float32Array(u);
      this.prevU = new Float32Array(u);
      this.prevV = new Float32Array(u);
      this.p = new Int8Array(u);
      this.s = new Int8Array(u);
      this.cellType = new Int8Array(u);
      this.particleDensity = new Float32Array(u);
    }
    this.fNumCells = u;
    for (var f = 0; f < u; f++) {
      this.u[f] = this.v[f] = this.du[f] = this.dv[f] = this.prevU[f] = this.prevV[f] = this.p[f] = this.s[f] = this.cellType[f] = this.particleDensity[f] = 0;
    }
    this.particleRadius = a;
    this.pInvSpacing = 1 / (a * 2.2);
    this.pNumX = Math.floor(t * this.pInvSpacing) + 1;
    this.pNumY = Math.floor(r * this.pInvSpacing) + 1;
    this.particleRestDensity = 0;
    let p = this.pNumX * this.pNumY;
    if (!c || p > this.numCellParticles.length) {
      this.numCellParticles = new Uint32Array(p);
      this.firstCellParticle = new Uint32Array(p + 1);
    } else {
      for (var f = 0; f < p; f++) {
        this.numCellParticles[f] = 0;
        this.firstCellParticle[f] = 0;
      }
      this.firstCellParticle[p] = 0;
    }
    this.pNumCells = p;
    this.particlePosOut = new Float32Array(l * 2);
    this.particlePos = new Float32Array(l * 2);
    this.particleInfo = new Float32Array(l * 2);
    if (!c || l > this.particleDir.length / 2) {
      this.particleDir = new Float32Array(l * 2);
      this.particlePrevPos = new Float32Array(l * 2);
      this.particleVel = new Float32Array(l * 2);
      this.cellParticleIds = new Uint32Array(l);
      this.particleStatuses = new Uint8Array(l);
    }
    for (var f = 0; f < l; f++) {
      this.particlePos[f * 2 + 0] = -10000;
      this.particlePos[f * 2 + 1] = 0;
      this.particlePosOut[f * 2 + 0] = -10000;
      this.particlePosOut[f * 2 + 1] = 0;
      this.particleInfo[f * 2 + 0] = 0;
      this.particleInfo[f * 2 + 1] = 0;
      this.particleDir[f * 2 + 0] = 0;
      this.particleDir[f * 2 + 1] = 0;
      this.particlePrevPos[f * 2 + 0] = -10000;
      this.particlePrevPos[f * 2 + 1] = 0;
      this.particleVel[f * 2 + 0] = 0;
      this.particleVel[f * 2 + 1] = 0;
      this.cellParticleIds[f] = 0;
      this.particleStatuses[f] = 0;
    }
    this.numParticles = l;
    var g = this.fNumY;
    for (var f = 0; f < this.fNumX; f++) {
      for (var v = 0; v < this.fNumY; v++) {
        var _ = 0;
        if (f > 0 && f < this.fNumX - 1 && v > 0 && v < this.fNumY - 1) {
          _ = 1;
        }
        this.s[f * g + v] = _;
      }
    }
    this.hasInitialized = true;
  }
  integrateParticles(e, t) {
    for (var r = 0; r < this.numParticles; r++) {
      if (this.particleStatuses[r]) {
        this.particleVel[r * 2 + 1] += e * t;
        this.particlePos[r * 2] += this.particleVel[r * 2] * e;
        this.particlePos[r * 2 + 1] += this.particleVel[r * 2 + 1] * e;
      }
    }
  }
  pushParticlesApart(e) {
    this.numCellParticles.fill(0);
    for (var t = 0; t < this.numParticles; t++) {
      if (this.particleStatuses[t]) {
        var r = this.particlePos[t * 2];
        var n = this.particlePos[t * 2 + 1];
        var a = clamp(Math.floor(r * this.pInvSpacing), 0, this.pNumX - 1);
        var l = clamp(Math.floor(n * this.pInvSpacing), 0, this.pNumY - 1);
        var c = a * this.pNumY + l;
        this.numCellParticles[c]++;
      }
    }
    var u = 0;
    for (var t = 0; t < this.pNumCells; t++) {
      u += this.numCellParticles[t];
      this.firstCellParticle[t] = u;
    }
    this.firstCellParticle[this.pNumCells] = u;
    for (var t = 0; t < this.numParticles; t++) {
      if (this.particleStatuses[t]) {
        var r = this.particlePos[t * 2];
        var n = this.particlePos[t * 2 + 1];
        var a = clamp(Math.floor(r * this.pInvSpacing), 0, this.pNumX - 1);
        var l = clamp(Math.floor(n * this.pInvSpacing), 0, this.pNumY - 1);
        var c = a * this.pNumY + l;
        this.firstCellParticle[c]--;
        this.cellParticleIds[this.firstCellParticle[c]] = t;
      }
    }
    var f = this.particleRadius * 3;
    var p = f * f;
    for (var g = 0; g < e; g++) {
      for (var t = 0; t < this.numParticles; t++) {
        if (this.particleStatuses[t]) {
          var v = this.particlePos[t * 2];
          var _ = this.particlePos[t * 2 + 1];
          var T = Math.floor(v * this.pInvSpacing);
          var M = Math.floor(_ * this.pInvSpacing);
          var S = Math.max(T - 1, 0);
          var b = Math.max(M - 1, 0);
          for (var C = Math.min(T + 1, this.pNumX - 1), w = Math.min(M + 1, this.pNumY - 1), a = S; a <= C; a++) {
            for (var l = b; l <= w; l++) {
              var c = a * this.pNumY + l;
              var u = this.firstCellParticle[c];
              for (var R = this.firstCellParticle[c + 1], E = u; E < R; E++) {
                var I = this.cellParticleIds[E];
                if (I != t && this.particleStatuses[I]) {
                  var F = this.particlePos[I * 2];
                  var k = this.particlePos[I * 2 + 1];
                  var L = F - v;
                  var D = k - _;
                  var ne = L * L + D * D;
                  if (!(ne > p) && ne != 0) {
                    var re = Math.sqrt(ne);
                    var ce = (f - re) * 0.5 / re;
                    L *= ce;
                    D *= ce;
                    this.particlePos[t * 2] -= L;
                    this.particlePos[t * 2 + 1] -= D;
                    this.particlePos[I * 2] += L;
                    this.particlePos[I * 2 + 1] += D;
                  }
                }
              }
            }
          }
        }
      }
    }
  }
  handleParticleCollisions(e, t, r, n, a, l) {
    var c = 1 / this.fInvSpacing;
    var u = this.particleRadius;
    var f = n + u;
    var p = f * f;
    var g = c + u;
    var v = (this.fNumX - 1) * c - u;
    var _ = c + u;
    var T = (this.fNumY - 1) * c - u;
    var M = this.isFlushing;
    for (var S = 0; S < this.numParticles; S++) {
      if (this.particleStatuses[S]) {
        var b = this.particlePos[S * 2];
        var C = this.particlePos[S * 2 + 1];
        var w = b - t;
        var R = C - r;
        var E = w * w + R * R;
        if (E < p) {
          var I = Math.sqrt(E);
          var F = (f - I) / I;
          b += w * F;
          C += R * F;
          this.particleVel[S * 2] = a * 2;
          this.particleVel[S * 2 + 1] = l * 2;
        }
        let k = b - this.particlePrevPos[S * 2];
        let L = C - this.particlePrevPos[S * 2 + 1];
        let D = Math.sqrt(k * k + L * L);
        if (D > 0) {
          let ne = k / D;
          let re = L / D;
          let ce = 1 / (Math.abs(ne) > 0.0001 ? ne : 0.0001);
          let z = 1 / (Math.abs(re) > 0.0001 ? re : 0.0001);
          for (let j = 0; j < this.colliderRectList.length; j++) {
            let X = this.colliderRectList[j];
            if (b > X.l && b < X.r && C > X.b && C < X.t) {
              let Z = b - X.cx;
              let q = C - X.cy;
              let ue = Z * ce;
              let oe = q * z;
              let te = Math.abs(ce) * X.hw;
              let le = Math.abs(z) * X.hh;
              let Te = Math.max(-ue - te, -oe - le);
              b = b + ne * Te;
              C = C + re * Te;
            }
          }
        }
        if (b < g) {
          b = g;
          this.particleVel[S * 2] = 0;
        }
        if (b > v) {
          b = v;
          this.particleVel[S * 2] = 0;
        }
        if (C < _) {
          if (M) {
            b = -10000;
            C = 0;
            this.particleStatuses[S] = 0;
          } else {
            C = _;
            this.particleVel[S * 2 + 1] = 0;
          }
        }
        if (C > T) {
          C = T;
          this.particleVel[S * 2 + 1] = 0;
        }
        this.particlePos[S * 2] = b;
        this.particlePos[S * 2 + 1] = C;
      }
    }
    for (var S = 0; S < this.numParticles; S++) {
      _v0.fromArray(this.particleVel, S * 2);
      let L = _v0.length();
      if (L > 0.00001) {
        _v2.fromArray(this.particleDir, S * 2);
        _v1.fromArray(this.particleInfo, S * 2);
        _v1.y = math.mix(_v1.y, 0, 1 - Math.exp(e * -4));
        _v0.multiplyScalar(1 / L);
        let D = Math.atan2(_v0.y, _v0.x);
        let ne = Math.atan2(_v2.y, _v2.x);
        _v1.y += L * math.normalizeAngle(D - ne);
        _v1.x += _v1.y * e;
        _v1.toArray(this.particleInfo, S * 2);
        _v2.toArray(this.particleDir, S * 2);
      }
      this.particlePrevPos[S * 2] = this.particlePos[S * 2];
      this.particlePrevPos[S * 2 + 1] = this.particlePos[S * 2 + 1];
    }
  }
  updateParticleDensity() {
    var e = this.fNumY;
    var t = this.h;
    var r = this.fInvSpacing;
    var n = t * 0.5;
    var a = this.particleDensity;
    a.fill(0);
    for (var l = 0; l < this.numParticles; l++) {
      if (this.particleStatuses[l]) {
        var c = this.particlePos[l * 2];
        var u = this.particlePos[l * 2 + 1];
        c = clamp(c, t, (this.fNumX - 1) * t);
        u = clamp(u, t, (this.fNumY - 1) * t);
        var f = Math.floor((c - n) * r);
        var p = (c - n - f * t) * r;
        var g = Math.min(f + 1, this.fNumX - 2);
        var v = Math.floor((u - n) * r);
        var _ = (u - n - v * t) * r;
        var T = Math.min(v + 1, this.fNumY - 2);
        var M = 1 - p;
        var S = 1 - _;
        if (f < this.fNumX && v < this.fNumY) {
          a[f * e + v] += M * S;
        }
        if (g < this.fNumX && v < this.fNumY) {
          a[g * e + v] += p * S;
        }
        if (g < this.fNumX && T < this.fNumY) {
          a[g * e + T] += p * _;
        }
        if (f < this.fNumX && T < this.fNumY) {
          a[f * e + T] += M * _;
        }
      }
    }
    if (this.particleRestDensity == 0) {
      var b = 0;
      var C = 0;
      for (var l = 0; l < this.fNumCells; l++) {
        if (this.cellType[l] == FLUID_CELL) {
          b += a[l];
          C++;
        }
      }
      if (C > 0) {
        this.particleRestDensity = b / C;
      }
    }
  }
  transferVelocities(e, t) {
    var r = this.fNumY;
    var n = this.h;
    var a = this.fInvSpacing;
    var l = n * 0.5;
    if (e) {
      this.prevU.set(this.u);
      this.prevV.set(this.v);
      this.du.fill(0);
      this.dv.fill(0);
      this.u.fill(0);
      this.v.fill(0);
      for (var c = 0; c < this.fNumCells; c++) {
        this.cellType[c] = this.s[c] == 0 ? SOLID_CELL : AIR_CELL;
      }
      for (var c = 0; c < this.numParticles; c++) {
        if (this.particleStatuses[c]) {
          var u = this.particlePos[c * 2];
          var f = this.particlePos[c * 2 + 1];
          var p = clamp(Math.floor(u * a), 0, this.fNumX - 1);
          var g = clamp(Math.floor(f * a), 0, this.fNumY - 1);
          var v = p * r + g;
          if (this.cellType[v] == AIR_CELL) {
            this.cellType[v] = FLUID_CELL;
          }
        }
      }
    }
    for (var _ = 0; _ < 2; _++) {
      var T = _ == 0 ? 0 : l;
      var M = _ == 0 ? l : 0;
      var S = _ == 0 ? this.u : this.v;
      var b = _ == 0 ? this.prevU : this.prevV;
      var C = _ == 0 ? this.du : this.dv;
      for (var c = 0; c < this.numParticles; c++) {
        if (this.particleStatuses[c]) {
          var u = this.particlePos[c * 2];
          var f = this.particlePos[c * 2 + 1];
          u = clamp(u, n, (this.fNumX - 1) * n);
          f = clamp(f, n, (this.fNumY - 1) * n);
          var w = Math.min(Math.floor((u - T) * a), this.fNumX - 2);
          var R = (u - T - w * n) * a;
          var E = Math.min(w + 1, this.fNumX - 2);
          var I = Math.min(Math.floor((f - M) * a), this.fNumY - 2);
          var F = (f - M - I * n) * a;
          var k = Math.min(I + 1, this.fNumY - 2);
          var L = 1 - R;
          var D = 1 - F;
          var ne = L * D;
          var re = R * D;
          var ce = R * F;
          var z = L * F;
          var j = w * r + I;
          var X = E * r + I;
          var Z = E * r + k;
          var q = w * r + k;
          if (e) {
            var ue = this.particleVel[c * 2 + _];
            S[j] += ue * ne;
            C[j] += ne;
            S[X] += ue * re;
            C[X] += re;
            S[Z] += ue * ce;
            C[Z] += ce;
            S[q] += ue * z;
            C[q] += z;
          } else {
            var oe = _ == 0 ? r : 1;
            var te = this.cellType[j] != AIR_CELL || this.cellType[j - oe] != AIR_CELL ? 1 : 0;
            var le = this.cellType[X] != AIR_CELL || this.cellType[X - oe] != AIR_CELL ? 1 : 0;
            var Te = this.cellType[Z] != AIR_CELL || this.cellType[Z - oe] != AIR_CELL ? 1 : 0;
            var K = this.cellType[q] != AIR_CELL || this.cellType[q - oe] != AIR_CELL ? 1 : 0;
            var G = this.particleVel[c * 2 + _];
            var C = te * ne + le * re + Te * ce + K * z;
            if (C > 0) {
              var U = (te * ne * S[j] + le * re * S[X] + Te * ce * S[Z] + K * z * S[q]) / C;
              var N = (te * ne * (S[j] - b[j]) + le * re * (S[X] - b[X]) + Te * ce * (S[Z] - b[Z]) + K * z * (S[q] - b[q])) / C;
              var he = G + N;
              this.particleVel[c * 2 + _] = (1 - t) * U + t * he;
            }
          }
        }
      }
      if (e) {
        for (var c = 0; c < S.length; c++) {
          if (C[c] > 0) {
            S[c] /= C[c];
          }
        }
        for (var c = 0; c < this.fNumX; c++) {
          for (var ve = 0; ve < this.fNumY; ve++) {
            var de = this.cellType[c * r + ve] == SOLID_CELL;
            if (de || c > 0 && this.cellType[(c - 1) * r + ve] == SOLID_CELL) {
              this.u[c * r + ve] = this.prevU[c * r + ve];
            }
            if (de || ve > 0 && this.cellType[c * r + ve - 1] == SOLID_CELL) {
              this.v[c * r + ve] = this.prevV[c * r + ve];
            }
          }
        }
      }
    }
  }
  solveIncompressibility(e, t, r, n = true) {
    this.p.fill(0);
    this.prevU.set(this.u);
    this.prevV.set(this.v);
    var a = this.fNumY;
    var l = this.density * this.h / t;
    for (var c = 0; c < this.fNumCells; c++) {
      this.u[c];
      this.v[c];
    }
    for (var u = 0; u < e; u++) {
      for (var c = 1; c < this.fNumX - 1; c++) {
        for (var f = 1; f < this.fNumY - 1; f++) {
          if (this.cellType[c * a + f] == FLUID_CELL) {
            var p = c * a + f;
            var g = (c - 1) * a + f;
            var v = (c + 1) * a + f;
            var _ = c * a + f - 1;
            var T = c * a + f + 1;
            var w = this.s[p];
            var M = this.s[g];
            var S = this.s[v];
            var b = this.s[_];
            var C = this.s[T];
            var w = M + S + b + C;
            if (w != 0) {
              var R = this.u[v] - this.u[p] + this.v[T] - this.v[p];
              if (this.particleRestDensity > 0 && n) {
                var E = 0.5;
                var I = this.particleDensity[c * a + f] - this.particleRestDensity;
                if (I > 0) {
                  R = R - E * I;
                }
              }
              var F = -R / w;
              F *= r;
              this.p[p] += l * F;
              this.u[p] -= M * F;
              this.u[v] += S * F;
              this.v[p] -= b * F;
              this.v[T] += C * F;
            }
          }
        }
      }
    }
  }
  resetParticles() {}
  simulate(e, t, r, n, a, l, c, u, f, p, g, v, _) {
    e = Math.min(e, 1 / 60);
    var T = 1;
    var M = e / T;
    let S = Math.ceil(EMIT_RATE * e);
    let b = 0;
    for (var C = 0; C < T; C++) {
      for (let R = 0; R < this.numParticles && !(b / T >= S); R++) {
        if (this.particleStatuses[R] == 0) {
          let E = Math.random();
          this.particlePos[R * 2 + 0] = this.particlePrevPos[R * 2 + 0] = this.particlePosOut[R * 2 + 0] = math.mix(this.emitterPosA.x, this.emitterPosB.x, E) + (Math.random() - 0.5) * 0.01;
          this.particlePos[R * 2 + 1] = this.particlePrevPos[R * 2 + 1] = this.particlePosOut[R * 2 + 1] = math.mix(this.emitterPosA.y, this.emitterPosB.y, E) + (Math.random() - 0.5) * 0.01;
          this.particleInfo[R * 2 + 0] = Math.random() * Math.PI * 2;
          this.particleInfo[R * 2 + 1] = 0;
          this.particleDir[R * 2 + 0] = 0;
          this.particleDir[R * 2 + 1] = -1;
          let I = (2 + Math.pow(Math.random(), 2) * 3) * t * 0.1;
          this.particleVel[R * 2 + 0] = 0;
          this.particleVel[R * 2 + 1] = I;
          this.particleStatuses[R] = 1;
          b++;
        }
      }
      this.integrateParticles(M, t);
      if (u) {
        this.pushParticlesApart(a);
      }
      this.handleParticleCollisions(M, f, p, g, v, _);
      this.transferVelocities(true);
      this.updateParticleDensity();
      this.solveIncompressibility(n, M, l, c);
      this.transferVelocities(false, r);
      for (var w = 0; w < this.numParticles; w++) {
        this.particlePosOut[w * 2] = this.particlePos[w * 2] + (this.particlePosOut[w * 2] - this.particlePrevPos[w * 2]) * 0.5;
        this.particlePosOut[w * 2 + 1] = this.particlePos[w * 2 + 1] + (this.particlePosOut[w * 2 + 1] - this.particlePrevPos[w * 2 + 1]) * 0.5;
      }
    }
  }
}
const flipSim = new FlipSim();
const vert = `#define GLSLIFY 1
attribute vec2 instancedPos;attribute vec2 instancedInfo;uniform vec2 u_tankOffset;uniform vec2 u_tankSize;uniform vec2 u_tankActualSize;uniform vec2 u_renderScale;uniform float u_radius;uniform float u_opacity;
#include <ufxVert>
#ifdef IS_TEXTURE
attribute vec4 instanceColorShape;varying vec3 v_color;varying vec3 v_colorMix;varying vec2 v_uv;
#endif
void main(){float angle=instancedInfo.x;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);vec3 basePos=vec3((instancedPos-u_tankOffset)/u_tankActualSize-vec2(.5),0.0);basePos.y=-basePos.y;basePos.xy*=u_renderScale*2.;float particleSize=1.;
#ifdef IS_TEXTURE
float colorFract=fract(instanceColorShape.w/3.);v_color=instanceColorShape.rgb;v_colorMix=vec3(colorFract<0.25 ? 1. : 0.,abs(colorFract-.5)<0.25 ? 1. : 0.,colorFract>0.75 ? 1. : 0.);v_uv=uv;v_uv.x=(v_uv.x+floor(instanceColorShape.w/3.))/8.;
#else
particleSize+=min(1.,abs(instancedInfo.y)*0.01);
#endif
vec3 screenPos=getScreenPosition(basePos);screenPos.xy+=(m*position.xy)*u_radius*particleSize*u_renderScale.x*2.*u_opacity;gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);}`;
const frag$3 = `#define GLSLIFY 1
#ifdef IS_TEXTURE
uniform sampler2D u_texture;varying vec3 v_color;varying vec3 v_colorMix;varying vec2 v_uv;
#else
uniform vec3 u_color;
#endif
void main(){
#ifdef IS_TEXTURE
float a=dot(v_colorMix,texture2D(u_texture,v_uv).rgb);gl_FragColor=vec4(v_color,a);
#else
gl_FragColor=vec4(u_color,1.);
#endif
}`;
let COLORS = ["#ff383c", "#0029ff", "#bb2bff", "#1eff5d", "#cfff0f", "#d6e4ec", "#bbcbda", "#7a8d9b", "#262229"];
class FlipAnimation {
  PRESSURE_ITERATION = 60;
  NUM_PARTICLES_ITERS = 4;
  OVER_RELAXATION = 1;
  FLIP_RATIO = 0;
  mesh;
  meshList = [];
  top = 0;
  height = 0;
  gravity = 0;
  isActive = false;
  needsReset = false;
  hasDown = false;
  prevViewportWidth = 0;
  prevViewportHeight = 0;
  opacity = 1;
  colorHex;
  container = new Object3D();
  shapedContainer = new Object3D();
  texturedContainer = new Object3D();
  prevUseTextured = null;
  useTextured = true;
  sharedUniforms = {
    u_tankOffset: {
      value: new Vector2()
    },
    u_tankSize: {
      value: new Vector2()
    },
    u_tankActualSize: {
      value: new Vector2()
    },
    u_radius: {
      value: 0
    },
    u_opacity: {
      value: 0
    },
    u_renderScale: {
      value: new Vector2()
    },
    u_color: {
      value: new Color("#1A2FFB")
    },
    u_texture: {
      value: null
    }
  };
  preInit() {
    let e = [];
    for (let n = 0; n < COLORS.length; n++) {
      COLORS[n] = new Color(COLORS[n]);
    }
    let t = new BufferGeometry();
    t.setAttribute("position", new BufferAttribute(new Float32Array([0.0714286, -0.5, 0, -0.0714286, -0.5, 0, 0.5, -0.0714286, 0, 0.0714286, -0.0714286, 0, -0.0714286, -0.0714286, 0, -0.5, -0.0714286, 0, 0.5, 0.0714286, 0, 0.0714286, 0.0714286, 0, -0.0714286, 0.0714286, 0, -0.5, 0.0714286, 0, 0.0714286, 0.5, 0, -0.0714286, 0.5, 0]), 3));
    t.setIndex(new BufferAttribute(new Uint8Array([4, 5, 9, 0, 4, 3, 8, 7, 3, 7, 2, 3, 7, 6, 2, 11, 10, 7, 7, 8, 11, 3, 4, 8, 0, 1, 4, 4, 9, 8]), 1));
    e.push(t);
    e.push(new PlaneGeometry(0.8, 0.8));
    e.push(new CircleGeometry(0.4, 10));
    e.push(new CircleGeometry(0.5, 3));
    e.push(new PlaneGeometry(1.6, 1.6));
    let r = properties.loader.add(settings.TEXTURE_PATH + "flip_texture.png", {
      type: "texture"
    }).content;
    this.sharedUniforms.u_texture.value = r;
    for (let n = 0; n < e.length; n++) {
      let a = e[n];
      let l = new InstancedBufferGeometry();
      for (let u in a.attributes) {
        l.setAttribute(u, a.attributes[u]);
      }
      l.index = a.index;
      let c = new UfxMesh({
        geometry: l,
        material: new ShaderMaterial({
          uniforms: this.sharedUniforms,
          vertexShader: vert,
          fragmentShader: frag$3,
          depthWrite: false,
          depthTest: false,
          side: DoubleSide
        })
      });
      c.material.extensions.derivatives = true;
      c.frustumCulled = false;
      if (n < e.length - 1) {
        this.shapedContainer.add(c);
      } else {
        this.texturedContainer.add(c);
        c.material.defines.IS_TEXTURE = true;
        c.material.transparent = true;
      }
      this.meshList.push(c);
    }
    this.container.add(this.shapedContainer);
    this.container.add(this.texturedContainer);
    pageExtraSections.postUfxContainer.add(this.container);
  }
  init() {}
  reInitTank() {
    let e = properties.viewportWidth;
    let t = properties.viewportHeight;
    scrollManager.syncDom();
    this.capturedOffsetY = -scrollManager.scrollPixel + endSection.offsetY;
    let r = document.querySelector("#end-section-outer").getBoundingClientRect().top - this.capturedOffsetY;
    let n = document.querySelector("#end-section-outer").getBoundingClientRect().bottom - this.capturedOffsetY;
    let a = this.prevViewportWidth != e || this.prevViewportHeight != t || !flipSim.hasInitialized || this.prevUseTextured !== this.useTextured;
    this.prevUseTextured = this.useTextured;
    if (a) {
      this.prevViewportWidth = properties.viewportWidth;
      this.prevViewportHeight = properties.viewportHeight;
    }
    var l = 2;
    var c = l * t / e;
    let u = this.useTextured ? 0.4 : 1;
    var f = Math.ceil(math.fit(e, 320, 2560, 20, 90) * u);
    var p = this.tankWidth = l * 1;
    var g = this.tankHeight = c * 1;
    var v = p / f;
    var _ = 1;
    this.gravity = Math.ceil(math.fit(e, 320, 2560, -15, -3)) * (this.useTextured ? 1.5 : 1);
    var T = v * 0.2;
    var M = Math.ceil(math.fit(e, 320, 2560, 20, 80) * u);
    var S = Math.ceil(M * t / e);
    var b = Math.ceil(M * S / (this.meshList.length - 1)) * (this.meshList.length - 1);
    if (a) {
      flipSim.init(_, p, g, v, T, b);
    }
    this.sharedUniforms.u_tankOffset.value.set(flipSim.h, flipSim.h);
    this.sharedUniforms.u_tankSize.value.set(p, g);
    this.sharedUniforms.u_tankActualSize.value.set(flipSim.tankInnerWidth, flipSim.tankInnerHeight);
    this.sharedUniforms.u_radius.value = T;
    this.sharedUniforms.u_renderScale.value.set(e / p, e / p * flipSim.tankInnerHeight / flipSim.tankInnerWidth);
    let C = r + n >> 1;
    let w = e;
    let R = flipSim.tankInnerHeight / flipSim.tankInnerWidth * w;
    r = C - R / 2;
    n = C + R / 2;
    this.top = r;
    this.height = R;
    let E = flipSim.particlePosOut.length / 2;
    let I = Math.floor(E / (this.meshList.length - 1));
    let F = 0;
    for (let k = 0; k < this.meshList.length; k++) {
      let L = this.meshList[k];
      if (a) {
        let D;
        if (k < this.meshList.length - 1) {
          D = new InstancedInterleavedBuffer(flipSim.particlePosOut, 2, 4);
          L.geometry.setAttribute("instancedPos", new InterleavedBufferAttribute(D, 2, F * 2));
          L.geometry.attributes.instancedPos.usage = DynamicDrawUsage;
          D.count /= 4;
          D = new InstancedInterleavedBuffer(flipSim.particleInfo, 2, 4);
          L.geometry.setAttribute("instancedInfo", new InterleavedBufferAttribute(D, 2, F * 2));
          L.geometry.attributes.instancedInfo.usage = DynamicDrawUsage;
          D.count /= 4;
          F += I;
        } else {
          L.geometry.setAttribute("instancedPos", new InstancedBufferAttribute(flipSim.particlePosOut, 2));
          L.geometry.attributes.instancedPos.usage = DynamicDrawUsage;
          L.geometry.setAttribute("instancedInfo", new InstancedBufferAttribute(flipSim.particleInfo, 2));
          L.geometry.attributes.instancedInfo.usage = DynamicDrawUsage;
          let ne = flipSim.particlePosOut.length / 2;
          let re = new Float32Array(ne * 4);
          for (let ce = 0, z = 0; ce < ne; ce++, z += 4) {
            let j = ce % 45;
            j = j < 5 ? j : 5 + (j - 5) % 4;
            let X = COLORS[j];
            re[z + 0] = X.r;
            re[z + 1] = X.g;
            re[z + 2] = X.b;
            re[z + 3] = ~~(ce / 23) % 23;
          }
          L.geometry.setAttribute("instanceColorShape", new InstancedBufferAttribute(re, 4));
        }
        L.geometry._maxInstanceCount = flipSim.maxParticles;
      }
      L.syncRect(0, r + this.capturedOffsetY, e, R, this.capturedOffsetY);
    }
    if (a && !this.useTextured) {
      let k = document.querySelector("#end-bottom");
      flipSim.addColliderRect(this.convertDomRectToTankRect(k.getBoundingClientRect()), -1, -1, -1, -1);
    }
    this.hasDown = false;
  }
  resize() {
    if (this.isActive && this.meshList.length > 0) {
      this.reInitTank();
    } else {
      this.needsReset = true;
    }
    this.hasDown = false;
  }
  convertDomRectToTankRect(e) {
    let t = this.convertPixelXYToTankXY(e.left, e.bottom);
    let r = this.convertPixelSizeToTankSize(e.width, e.height);
    return {
      x: t.x,
      y: t.y,
      w: r.w,
      h: r.h
    };
  }
  convertPixelSizeToTankSize(e, t) {
    return {
      w: e / properties.viewportWidth * flipSim.tankInnerWidth,
      h: t / this.height * flipSim.tankInnerHeight
    };
  }
  convertPixelXYToTankXY(e, t) {
    let r = this.convertPixelSizeToTankSize(math.clamp(e, 0, properties.viewportWidth - 1), math.clamp(this.top + this.height - t - scrollManager.scrollPixel + endSection.offsetY, 0, properties.viewportHeight - 1));
    return {
      x: r.w + flipSim.h,
      y: r.h + flipSim.h
    };
  }
  update(e) {
    if (this.isActive) {
      if (this.needsReset || this.prevUseTextured !== this.useTextured) {
        this.needsReset = false;
        this.reInitTank();
      }
      if (properties.hasInitialized) {
        if (this.useTextured) {
          this.shapedContainer.visible = false;
          this.texturedContainer.visible = true;
        } else {
          this.shapedContainer.visible = true;
          this.texturedContainer.visible = false;
        }
        let t = -scrollManager.scrollPixel + endSection.offsetY;
        this.sharedUniforms.u_color.value.setStyle(this.colorHex);
        this.sharedUniforms.u_opacity.value = this.opacity;
        if (this.meshList[0].testViewport(t)) {
          e = Math.max(1 / 120, e);
          let r = true;
          let n = true;
          let a = this.convertPixelXYToTankXY(input.prevMousePixelXY.x, input.prevMousePixelXY.y);
          let l = this.convertPixelXYToTankXY(input.mousePixelXY.x, input.mousePixelXY.y);
          let c = l.x;
          let u = l.y;
          let f = (l.x - a.x) / e;
          let p = (l.y - a.y) / e;
          let g = 150 / properties.viewportWidth * (properties.useMobileLayout ? input.isDown ? 0.35 : 0 : math.fit(Math.sqrt(f * f + p * p), 0, 2, 0.2, 1));
          if (input.isDown && !properties.useMobileLayout) {
            c = -1000;
            u = -1000;
            this.hasDown = true;
            flipSim.isFlushing = true;
            flipSim.emitterPosA.copy(this.convertPixelXYToTankXY(input.prevMousePixelXY.x, input.prevMousePixelXY.y));
            flipSim.emitterPosB.copy(this.convertPixelXYToTankXY(input.mousePixelXY.x, input.mousePixelXY.y));
          } else {
            if (!this.hasDown) {
              flipSim.emitterPosA.copy(flipSim.emitterPosB.set(1, this.tankHeight * 0.5, 0));
            }
            flipSim.isFlushing = false;
          }
          flipSim.simulate(e, this.gravity, this.FLIP_RATIO, this.PRESSURE_ITERATION, this.NUM_PARTICLES_ITERS, this.OVER_RELAXATION, r, n, c, u, g, f, p);
          for (let v = 0; v < this.meshList.length; v++) {
            let _ = this.meshList[v];
            _.geometry.attributes.instancedPos.needsUpdate = true;
            _.geometry.attributes.instancedInfo.needsUpdate = true;
            _.update(t);
            _.visible = true;
          }
        } else {
          for (let r = 0; r < this.meshList.length; r++) {
            let n = this.meshList[r];
            n.visible = false;
          }
        }
      }
    } else {
      this.needsReset = true;
      for (let t = 0; t < this.meshList.length; t++) {
        let r = this.meshList[t];
        r.visible = false;
      }
    }
  }
}
const flipAnimation = new FlipAnimation();
class EndSection {
  domContainer;
  offsetY = 0;
  _needsReset = true;
  ROLLUP_ANIMATION_DURATION = 1;
  ROLLUP_ANIMATION_INTERVAL = 2;
  activeRatio = 0;
  hoverRatio = 0;
  time = 0;
  isHover = false;
  preInit() {
    this.domContainer = document.getElementById("end-section");
    this.outerContainer = document.getElementById("end-section-outer");
    this.domContent = document.getElementById("end-section-content");
    this.domTitle = document.getElementById("end-section-title");
    this.domTitleLink = document.getElementById("end-section-title-link");
    this.domTitleTopDecoration = document.getElementById("end-section-title-top-decoration");
    this.domTitleBottomLeftDecoration = document.getElementById("end-section-title-bottom-left-decoration");
    this.domTitleBottomRightDecoration = document.getElementById("end-section-title-bottom-right-decoration");
    this.domSubtitle = document.getElementById("end-section-subtitle-text");
    this.domButton = document.getElementById("end-bottom");
    this.domCrosses = Array.from(document.querySelectorAll(".end-section-content-cross"));
    flipAnimation.preInit();
  }
  init() {
    flipAnimation.init();
    if (!properties.useMobileLayout) {
      this.domTitle.addEventListener("mouseenter", this._onDomTitleMouseenter.bind(this));
      this.domTitle.addEventListener("mouseleave", this._onDomTitleMouseleave.bind(this));
    }
  }
  resize(e, t) {
    this.domContent.style.transform = "translate3d(-50%,-50%,0) scale3d(1,1,1)";
    this._splitText();
    this._needsReset = true;
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    if (pagesManager.scrollTargetPage) {
      flipAnimation.isActive = pagesManager.scrollTargetPage.hasEndVisual;
      flipAnimation.colorHex = pagesManager.scrollTargetPage.endVisualColor;
      flipAnimation.useTextured = pagesManager.scrollTargetPage.endVisualUseTextured;
      flipAnimation.container.visible = flipAnimation.isActive;
      flipAnimation.opacity = math.fit(pagesManager.scrollTargetPage.hideRatio, 0, 0.3, 1, 0);
    }
    let n = math.fit(t.hideScreenOffset, -0.75, 0, 0, 1);
    let a = math.mix(1, 0.9, n);
    this.offsetY = Math.max(0, -t.screenY);
    this.outerContainer.style.transform = `translate3d(0, ${this.offsetY - Math.max(0, t.hideScreenOffset) * properties.viewportHeight}px, 0)`;
    this.domContent.style.transform = `translate3d(-50%,-50%,0) scale3d(${a}, ${a}, ${a})`;
    if (r) {
      if (this._needsReset) {
        this._reset();
      }
      let l = pagesManager.scrollTargetPage ? pagesManager.scrollTargetPage.endSectionActiveThreshold : 1;
      let c = t.showScreenOffset > l;
      let u = this.time;
      this.activeRatio = math.saturate(this.activeRatio + (c ? e : -e));
      this.hoverRatio = math.saturate(this.hoverRatio + (this.isHover && this.activeRatio == 1 ? e : -e));
      this.time += e;
      let f = u % this.ROLLUP_ANIMATION_INTERVAL;
      let p = this.time % this.ROLLUP_ANIMATION_INTERVAL;
      this.domTitle.style.pointerEvents = c && this.activeRatio > 0.75 ? "auto" : "none";
      for (let v = 0; v < this.domCrosses.length; v++) {
        let _ = v / (this.domCrosses.length - 1);
        let T = math.fit(this.activeRatio, _ * 0.2, _ * 0.2 + 0.7, 0, 1, ease.lusion);
        let M = this.domCrosses[v];
        let S = math.fit(T, 0, 1, 0, 1, ease.lusion);
        let b = math.fit(T, 0, 1, 0, 180, ease.lusion);
        M.style.transform = `scale(${S}) rotate(${b}deg)`;
      }
      if (!properties.useMobileLayout) {
        for (let v = 0; v < this.domSubtitle._splitted.words.length; v++) {
          let _ = this.domSubtitle._splitted.words[v];
          let T = v / (this.domSubtitle._splitted.words.length - 1);
          let M = math.fit(this.activeRatio, T * 0.15, T * 0.15 + 0.75, 200, 0, ease.lusion);
          let S = math.fit(this.activeRatio, T * 0.1, T * 0.1 + 0.8, 30, 0, ease.lusion);
          _.style.transform = `translate3d(0, ${M}%, 0) rotate(${S}deg)`;
        }
      }
      for (let v = 0; v < this.domTitleLink._splitted.words.length; v++) {
        let _ = this.domTitleLink._splitted.words[v];
        let T = v / (this.domTitleLink._splitted.words.length - 1);
        if (f > p) {
          _._randCharIndex = Math.floor(Math.random() * _._chars.length);
          if (_._ratio == 0) {
            _._ratio = 0.001;
          }
        }
        if (_._ratio > 0) {
          _._ratio = math.saturate(_._ratio + (c ? e / this.ROLLUP_ANIMATION_DURATION : -e * 2));
          if (_._ratio == 1) {
            _._ratio = 0;
          }
        }
        for (let M = 0; M < _._chars.length; M++) {
          let S = _._chars[M];
          let b = M / (_._chars.length - 1);
          let C = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.activeRatio, T * 0.15 + b * 0.15, T * 0.15 + b * 0.15 + 0.7, 100, 0, ease.lusion) : 0;
          if (M === _._randCharIndex) {
            S._wrapper.style.transform = `translate3d(0, ${math.fit(_._ratio, T * 0.2, T * 0.2 + 0.8, 0, -100, ease.lusion)}%, 0)`;
          } else {
            S._wrapper.style.transform = "translateZ(0)";
          }
          S.style.transform = `translate3d(0, ${C}%, 0)`;
        }
      }
      this.domTitleTopDecoration.style.transform = `scale3d(${math.fit(this.hoverRatio, 0, 0.7, 0, 1, ease.cubicInOut)}, 1, 1)`;
      let g = math.fit(this.hoverRatio, 0.2, 1, 0, 1, ease.cubicInOut);
      this.domTitleBottomLeftDecoration.style.transform = `scale3d(${math.fit(g, 0, 0.35, 0, 1)}, 1, 1)`;
      this.domTitleBottomRightDecoration.style.transform = `scale3d(${math.fit(g, 0.4, 1, 0, 1)}, 1, 1)`;
    } else {
      this._needsReset = true;
      flipAnimation.isActive = false;
    }
    flipAnimation.update(e);
  }
  _splitText() {
    if (properties.useMobileLayout) {
      if (this.domSubtitle._splitted) {
        this.domSubtitle._splitted.revert();
      }
    } else {
      this.domSubtitle._splitted = new SplitType(this.domSubtitle, {
        types: "lines, words"
      });
      for (let e = 0; e < this.domSubtitle._splitted.lines.length; e++) {
        let t = this.domSubtitle._splitted.lines[e];
        let r = document.createElement("div");
        r.style.position = "relative";
        r.style.overflow = "hidden";
        r.append(t);
        this.domSubtitle.append(r);
      }
    }
    this.domTitleLink._splitted = new SplitType(this.domTitleLink, {
      types: "lines, words",
      lineClass: "end-section-title-link-line",
      wordClass: "end-section-title-link-word"
    });
    for (let e = 0; e < this.domTitleLink._splitted.lines.length; e++) {
      let t = this.domTitleLink._splitted.lines[e];
      if (e === 0) {
        t.append(this.domTitleTopDecoration);
      } else {
        t.append(this.domTitleBottomLeftDecoration);
        t.append(this.domTitleBottomRightDecoration);
      }
    }
    for (let e = 0; e < this.domTitleLink._splitted.words.length; e++) {
      let t = this.domTitleLink._splitted.words[e];
      let r = new SplitType(t, {
        types: "chars"
      });
      t._chars = r.chars;
      t._ratio = 0;
      for (let n = 0; n < t._chars.length; n++) {
        let a = t._chars[n];
        let l = a.cloneNode(true);
        let c = document.createElement("div");
        c.classList.add("char-wrapper");
        c.style.display = "inline-block";
        a._wrapper = c;
        c.append(a);
        c.append(l);
        t.append(c);
      }
    }
  }
  _reset() {
    this._needsReset = false;
    this.time = 0;
    this.hoverRatio = 0;
    this.activeRatio = 0;
    for (let e = 0; e < this.domTitleLink._splitted.words.length; e++) {
      let t = this.domTitleLink._splitted.words[e];
      for (let r = 0; r < t._chars.length; r++) {
        let n = t._chars[r];
        n._wrapper.style.transform = "translate3d(0, 0, 0)";
        n.style.transform = "translate3d(0, 0, 0)";
      }
    }
    flipAnimation.needsReset = true;
  }
  _onDomTitleMouseenter() {
    this.isHover = true;
  }
  _onDomTitleMouseleave() {
    this.isHover = false;
  }
}
const endSection = new EndSection();
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
