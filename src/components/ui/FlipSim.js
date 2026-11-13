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