/**
 * ============================================================================
 * Lusion Modular Component: 30-loaders-support
 * File: src/core/LoadersAndSupport.js
 * Description: BufItem, EXRLoader, EXRItem, TextureItem, ThreeLoaderItem, GlPositionOffset & Support
 * Original Engine Lines: 49316 - 51303
 * ============================================================================
 */
class BufItem extends XHRItem {
  constructor(e, t) {
    super(e, {
      ...t,
      responseType: "arraybuffer"
    });
  }
  retrieve() {
    return false;
  }
  _onLoad() {
    if (!this.content) {
      const e = this.xmlhttp.response;
      let t = new Uint32Array(e, 0, 1)[0];
      let r = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(e, 4, t)));
      let n = r.vertexCount;
      let a = r.indexCount;
      let l = 4 + t;
      let c = new BufferGeometry();
      let u = r.attributes;
      let f = false;
      let p = {};
      for (let _ = 0, T = u.length; _ < T; _++) {
        let M = u[_];
        let S = M.id;
        let b = S === "indices" ? a : n;
        let C = M.componentSize;
        let w = window[M.storageType];
        let R = new w(e, l, b * C);
        let E = w.BYTES_PER_ELEMENT;
        let I;
        if (M.needsPack) {
          let F = M.packedComponents;
          let k = F.length;
          let L = M.storageType.indexOf("Int") === 0;
          let D = 1 << E * 8;
          let ne = L ? D * 0.5 : 0;
          let re = 1 / D;
          I = new Float32Array(b * C);
          for (let ce = 0, z = 0; ce < b; ce++) {
            for (let j = 0; j < k; j++) {
              let X = F[j];
              I[z] = (R[z] + ne) * re * X.delta + X.from;
              z++;
            }
          }
        } else {
          p[S] = l;
          I = R;
        }
        if (S === "normal") {
          f = true;
        }
        if (S === "indices") {
          c.setIndex(new BufferAttribute(I, 1));
        } else {
          c.setAttribute(S, new BufferAttribute(I, C));
        }
        l += b * C * E;
      }
      let g = r.meshType;
      let v = [];
      if (r.sceneData) {
        let _ = r.sceneData;
        let T = new Object3D();
        let M = [];
        let S = g === "Mesh" ? 3 : g === "LineSegments" ? 2 : 1;
        for (let b = 0, C = _.length; b < C; b++) {
          let w = _[b];
          let R;
          if (w.vertexCount == 0) {
            R = new Object3D();
          } else {
            let E = new BufferGeometry();
            let I = c.index;
            let F = I.array;
            let k = F.constructor;
            let L = k.BYTES_PER_ELEMENT;
            E.setIndex(new BufferAttribute(new F.constructor(F.buffer, w.faceIndex * I.itemSize * L * S + (p.indices || 0), w.faceCount * I.itemSize * S), I.itemSize));
            for (let D = 0, ne = E.index.array.length; D < ne; D++) {
              E.index.array[D] -= w.vertexIndex;
            }
            for (let D in c.attributes) {
              I = c.attributes[D];
              F = I.array;
              k = F.constructor;
              L = k.BYTES_PER_ELEMENT;
              E.setAttribute(D, new BufferAttribute(new F.constructor(F.buffer, w.vertexIndex * I.itemSize * L + (p[D] || 0), w.vertexCount * I.itemSize), I.itemSize));
            }
            if (g === "Mesh") {
              R = new Mesh(E, new MeshNormalMaterial({
                flatShading: !f
              }));
            } else if (g === "LineSegments") {
              R = new LineSegments(E, new LineBasicMaterial());
            } else {
              R = new Points(E, new PointsMaterial({
                sizeAttenuation: false,
                size: 2
              }));
            }
            M.push(R);
          }
          if (w.parentIndex > -1) {
            v[w.parentIndex].add(R);
          } else {
            T.add(R);
          }
          R.position.fromArray(w.position);
          R.quaternion.fromArray(w.quaternion);
          R.scale.fromArray(w.scale);
          R.name = w.name;
          R.userData.material = w.material;
          v[b] = R;
        }
        c.userData.meshList = M;
        c.userData.sceneObject = T;
      }
      this.content = c;
    }
    this.xmlhttp = undefined;
    super._onLoad(this);
  }
}
BufItem.type = "buf";
BufItem.extensions = ["buf"];
BufItem.responseType = "arraybuffer"; /*!
                                      fflate - fast JavaScript compression/decompression
                                      <https://101arrowz.github.io/fflate>
                                      Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
                                      version 0.6.9
                                      */
function durl(o) {
  return URL.createObjectURL(new Blob([o], {
    type: "text/javascript"
  }));
}
try {
  URL.revokeObjectURL(durl(""));
} catch (o) {
  durl = function (e) {
    return "data:application/javascript;charset=UTF-8," + encodeURI(e);
  };
}
var u8 = Uint8Array;
var u16 = Uint16Array;
var u32 = Uint32Array;
var fleb = new u8([0, 0, 0, 0, 0, 0, 0, 0, 1, 1, 1, 1, 2, 2, 2, 2, 3, 3, 3, 3, 4, 4, 4, 4, 5, 5, 5, 5, 0, 0, 0, 0]);
var fdeb = new u8([0, 0, 0, 0, 1, 1, 2, 2, 3, 3, 4, 4, 5, 5, 6, 6, 7, 7, 8, 8, 9, 9, 10, 10, 11, 11, 12, 12, 13, 13, 0, 0]);
var clim = new u8([16, 17, 18, 0, 8, 7, 9, 6, 10, 5, 11, 4, 12, 3, 13, 2, 14, 1, 15]);
function freb(o, e) {
  var t = new u16(31);
  for (var r = 0; r < 31; ++r) {
    t[r] = e += 1 << o[r - 1];
  }
  var n = new u32(t[30]);
  for (var r = 1; r < 30; ++r) {
    for (var a = t[r]; a < t[r + 1]; ++a) {
      n[a] = a - t[r] << 5 | r;
    }
  }
  return [t, n];
}
var _a = freb(fleb, 2);
var fl = _a[0];
var revfl = _a[1];
fl[28] = 258;
revfl[258] = 28;
var _b = freb(fdeb, 0);
var fd = _b[0];
var rev = new u16(32768);
for (var i = 0; i < 32768; ++i) {
  var x = (i & 43690) >>> 1 | (i & 21845) << 1;
  x = (x & 52428) >>> 2 | (x & 13107) << 2;
  x = (x & 61680) >>> 4 | (x & 3855) << 4;
  rev[i] = ((x & 65280) >>> 8 | (x & 255) << 8) >>> 1;
}
function hMap(o, e, t) {
  for (var r = o.length, n = 0, a = new u16(e); n < r; ++n) {
    ++a[o[n] - 1];
  }
  var l = new u16(e);
  for (n = 0; n < e; ++n) {
    l[n] = l[n - 1] + a[n - 1] << 1;
  }
  var c;
  if (t) {
    c = new u16(1 << e);
    var u = 15 - e;
    for (n = 0; n < r; ++n) {
      if (o[n]) {
        var f = n << 4 | o[n];
        var p = e - o[n];
        for (var g = l[o[n] - 1]++ << p, v = g | (1 << p) - 1; g <= v; ++g) {
          c[rev[g] >>> u] = f;
        }
      }
    }
  } else {
    c = new u16(r);
    n = 0;
    for (; n < r; ++n) {
      if (o[n]) {
        c[n] = rev[l[o[n] - 1]++] >>> 15 - o[n];
      }
    }
  }
  return c;
}
var flt = new u8(288);
for (var i = 0; i < 144; ++i) {
  flt[i] = 8;
}
for (var i = 144; i < 256; ++i) {
  flt[i] = 9;
}
for (var i = 256; i < 280; ++i) {
  flt[i] = 7;
}
for (var i = 280; i < 288; ++i) {
  flt[i] = 8;
}
var fdt = new u8(32);
for (var i = 0; i < 32; ++i) {
  fdt[i] = 5;
}
var flrm = hMap(flt, 9, 1);
var fdrm = hMap(fdt, 5, 1);
function max(o) {
  var e = o[0];
  for (var t = 1; t < o.length; ++t) {
    if (o[t] > e) {
      e = o[t];
    }
  }
  return e;
}
function bits(o, e, t) {
  var r = e / 8 | 0;
  return (o[r] | o[r + 1] << 8) >> (e & 7) & t;
}
function bits16(o, e) {
  var t = e / 8 | 0;
  return (o[t] | o[t + 1] << 8 | o[t + 2] << 16) >> (e & 7);
}
function shft(o) {
  return (o / 8 | 0) + (o & 7 && 1);
}
function slc(o, e, t) {
  if (t == null || t > o.length) {
    t = o.length;
  }
  var r = new (o instanceof u16 ? u16 : o instanceof u32 ? u32 : u8)(t - e);
  r.set(o.subarray(e, t));
  return r;
}
function inflt(o, e, t) {
  var r = o.length;
  if (!r || t && !t.l && r < 5) {
    return e || new u8(0);
  }
  var n = !e || t;
  var a = !t || t.i;
  t ||= {};
  e ||= new u8(r * 3);
  function l(U) {
    var N = e.length;
    if (U > N) {
      var he = new u8(Math.max(N * 2, U));
      he.set(e);
      e = he;
    }
  }
  var c = t.f || 0;
  var u = t.p || 0;
  var f = t.b || 0;
  var p = t.l;
  var g = t.d;
  var v = t.m;
  var _ = t.n;
  var T = r * 8;
  do {
    if (!p) {
      t.f = c = bits(o, u, 1);
      var M = bits(o, u + 1, 3);
      u += 3;
      if (M) {
        if (M == 1) {
          p = flrm;
          g = fdrm;
          v = 9;
          _ = 5;
        } else if (M == 2) {
          var w = bits(o, u, 31) + 257;
          var R = bits(o, u + 10, 15) + 4;
          var E = w + bits(o, u + 5, 31) + 1;
          u += 14;
          var I = new u8(E);
          var F = new u8(19);
          for (var k = 0; k < R; ++k) {
            F[clim[k]] = bits(o, u + k * 3, 7);
          }
          u += R * 3;
          var L = max(F);
          var D = (1 << L) - 1;
          var ne = hMap(F, L, 1);
          for (var k = 0; k < E;) {
            var re = ne[bits(o, u, D)];
            u += re & 15;
            var S = re >>> 4;
            if (S < 16) {
              I[k++] = S;
            } else {
              var ce = 0;
              var z = 0;
              for (S == 16 ? (z = 3 + bits(o, u, 3), u += 2, ce = I[k - 1]) : S == 17 ? (z = 3 + bits(o, u, 7), u += 3) : S == 18 && (z = 11 + bits(o, u, 127), u += 7); z--;) {
                I[k++] = ce;
              }
            }
          }
          var j = I.subarray(0, w);
          var X = I.subarray(w);
          v = max(j);
          _ = max(X);
          p = hMap(j, v, 1);
          g = hMap(X, _, 1);
        } else {
          throw "invalid block type";
        }
      } else {
        var S = shft(u) + 4;
        var b = o[S - 4] | o[S - 3] << 8;
        var C = S + b;
        if (C > r) {
          if (a) {
            throw "unexpected EOF";
          }
          break;
        }
        if (n) {
          l(f + b);
        }
        e.set(o.subarray(S, C), f);
        t.b = f += b;
        t.p = u = C * 8;
        continue;
      }
      if (u > T) {
        if (a) {
          throw "unexpected EOF";
        }
        break;
      }
    }
    if (n) {
      l(f + 131072);
    }
    var Z = (1 << v) - 1;
    var q = (1 << _) - 1;
    for (var ue = u;; ue = u) {
      var ce = p[bits16(o, u) & Z];
      var oe = ce >>> 4;
      u += ce & 15;
      if (u > T) {
        if (a) {
          throw "unexpected EOF";
        }
        break;
      }
      if (!ce) {
        throw "invalid length/literal";
      }
      if (oe < 256) {
        e[f++] = oe;
      } else if (oe == 256) {
        ue = u;
        p = null;
        break;
      } else {
        var te = oe - 254;
        if (oe > 264) {
          var k = oe - 257;
          var le = fleb[k];
          te = bits(o, u, (1 << le) - 1) + fl[k];
          u += le;
        }
        var Te = g[bits16(o, u) & q];
        var K = Te >>> 4;
        if (!Te) {
          throw "invalid distance";
        }
        u += Te & 15;
        var X = fd[K];
        if (K > 3) {
          var le = fdeb[K];
          X += bits16(o, u) & (1 << le) - 1;
          u += le;
        }
        if (u > T) {
          if (a) {
            throw "unexpected EOF";
          }
          break;
        }
        if (n) {
          l(f + 131072);
        }
        for (var G = f + te; f < G; f += 4) {
          e[f] = e[f - X];
          e[f + 1] = e[f + 1 - X];
          e[f + 2] = e[f + 2 - X];
          e[f + 3] = e[f + 3 - X];
        }
        f = G;
      }
    }
    t.l = p;
    t.p = ue;
    t.b = f;
    if (p) {
      c = 1;
      t.m = v;
      t.d = g;
      t.n = _;
    }
  } while (!c);
  if (f == e.length) {
    return e;
  } else {
    return slc(e, 0, f);
  }
}
var et = new u8(0);
function zlv(o) {
  if ((o[0] & 15) != 8 || o[0] >>> 4 > 7 || (o[0] << 8 | o[1]) % 31) {
    throw "invalid zlib data";
  }
  if (o[1] & 32) {
    throw "invalid zlib data: preset dictionaries not supported";
  }
}
function unzlibSync(o, e) {
  return inflt((zlv(o), o.subarray(2, -4)), e);
}
var td = typeof TextDecoder !== "undefined" && new TextDecoder();
var tds = 0;
try {
  td.decode(et, {
    stream: true
  });
  tds = 1;
} catch (o) {}
class EXRLoader extends DataTextureLoader {
  constructor(e) {
    super(e);
    this.type = HalfFloatType;
  }
  parse(e) {
    const L = Math.pow(2.7182818, 2.2);
    function D(P, B) {
      let Q = 0;
      for (let H = 0; H < 65536; ++H) {
        if (H == 0 || P[H >> 3] & 1 << (H & 7)) {
          B[Q++] = H;
        }
      }
      const A = Q - 1;
      while (Q < 65536) {
        B[Q++] = 0;
      }
      return A;
    }
    function ne(P) {
      for (let B = 0; B < 16384; B++) {
        P[B] = {};
        P[B].len = 0;
        P[B].lit = 0;
        P[B].p = null;
      }
    }
    const re = {
      l: 0,
      c: 0,
      lc: 0
    };
    function ce(P, B, Q, A, H) {
      while (Q < P) {
        B = B << 8 | ot(A, H);
        Q += 8;
      }
      Q -= P;
      re.l = B >> Q & (1 << P) - 1;
      re.c = B;
      re.lc = Q;
    }
    const z = new Array(59);
    function j(P) {
      for (let Q = 0; Q <= 58; ++Q) {
        z[Q] = 0;
      }
      for (let Q = 0; Q < 65537; ++Q) {
        z[P[Q]] += 1;
      }
      let B = 0;
      for (let Q = 58; Q > 0; --Q) {
        const A = B + z[Q] >> 1;
        z[Q] = B;
        B = A;
      }
      for (let Q = 0; Q < 65537; ++Q) {
        const A = P[Q];
        if (A > 0) {
          P[Q] = A | z[A]++ << 6;
        }
      }
    }
    function X(P, B, Q, A, H, V) {
      const J = B;
      let ie = 0;
      let ge = 0;
      for (; A <= H; A++) {
        if (J.value - B.value > Q) {
          return false;
        }
        ce(6, ie, ge, P, J);
        const pe = re.l;
        ie = re.c;
        ge = re.lc;
        V[A] = pe;
        if (pe == 63) {
          if (J.value - B.value > Q) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          ce(8, ie, ge, P, J);
          let ye = re.l + 6;
          ie = re.c;
          ge = re.lc;
          if (A + ye > H + 1) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          while (ye--) {
            V[A++] = 0;
          }
          A--;
        } else if (pe >= 59) {
          let ye = pe - 59 + 2;
          if (A + ye > H + 1) {
            throw new Error("Something wrong with hufUnpackEncTable");
          }
          while (ye--) {
            V[A++] = 0;
          }
          A--;
        }
      }
      j(V);
    }
    function Z(P) {
      return P & 63;
    }
    function q(P) {
      return P >> 6;
    }
    function ue(P, B, Q, A) {
      for (; B <= Q; B++) {
        const H = q(P[B]);
        const V = Z(P[B]);
        if (H >> V) {
          throw new Error("Invalid table entry");
        }
        if (V > 14) {
          const J = A[H >> V - 14];
          if (J.len) {
            throw new Error("Invalid table entry");
          }
          J.lit++;
          if (J.p) {
            const ie = J.p;
            J.p = new Array(J.lit);
            for (let ge = 0; ge < J.lit - 1; ++ge) {
              J.p[ge] = ie[ge];
            }
          } else {
            J.p = new Array(1);
          }
          J.p[J.lit - 1] = B;
        } else if (V) {
          let J = 0;
          for (let ie = 1 << 14 - V; ie > 0; ie--) {
            const ge = A[(H << 14 - V) + J];
            if (ge.len || ge.p) {
              throw new Error("Invalid table entry");
            }
            ge.len = V;
            ge.lit = B;
            J++;
          }
        }
      }
      return true;
    }
    const oe = {
      c: 0,
      lc: 0
    };
    function te(P, B, Q, A) {
      P = P << 8 | ot(Q, A);
      B += 8;
      oe.c = P;
      oe.lc = B;
    }
    const le = {
      c: 0,
      lc: 0
    };
    function Te(P, B, Q, A, H, V, J, ie, ge) {
      if (P == B) {
        if (A < 8) {
          te(Q, A, H, V);
          Q = oe.c;
          A = oe.lc;
        }
        A -= 8;
        let pe = Q >> A;
        pe = new Uint8Array([pe])[0];
        if (ie.value + pe > ge) {
          return false;
        }
        const ye = J[ie.value - 1];
        while (pe-- > 0) {
          J[ie.value++] = ye;
        }
      } else if (ie.value < ge) {
        J[ie.value++] = P;
      } else {
        return false;
      }
      le.c = Q;
      le.lc = A;
    }
    function K(P) {
      return P & 65535;
    }
    function G(P) {
      const B = K(P);
      if (B > 32767) {
        return B - 65536;
      } else {
        return B;
      }
    }
    const U = {
      a: 0,
      b: 0
    };
    function N(P, B) {
      const Q = G(P);
      const H = G(B);
      const V = Q + (H & 1) + (H >> 1);
      const J = V;
      const ie = V - H;
      U.a = J;
      U.b = ie;
    }
    function he(P, B) {
      const Q = K(P);
      const A = K(B);
      const H = Q - (A >> 1) & 65535;
      const V = A + H - 32768 & 65535;
      U.a = V;
      U.b = H;
    }
    function ve(P, B, Q, A, H, V, J) {
      const ie = J < 16384;
      const ge = Q > H ? H : Q;
      let pe = 1;
      let ye;
      let Ce;
      while (pe <= ge) {
        pe <<= 1;
      }
      pe >>= 1;
      ye = pe;
      pe >>= 1;
      while (pe >= 1) {
        Ce = 0;
        const Ae = Ce + V * (H - ye);
        const De = V * pe;
        const He = V * ye;
        const Ve = A * pe;
        const $e = A * ye;
        let Ze;
        let ct;
        let it;
        let Qe;
        for (; Ce <= Ae; Ce += He) {
          let ut = Ce;
          const Ke = Ce + A * (Q - ye);
          for (; ut <= Ke; ut += $e) {
            const dt = ut + Ve;
            const _t = ut + De;
            const ft = _t + Ve;
            if (ie) {
              N(P[ut + B], P[_t + B]);
              Ze = U.a;
              it = U.b;
              N(P[dt + B], P[ft + B]);
              ct = U.a;
              Qe = U.b;
              N(Ze, ct);
              P[ut + B] = U.a;
              P[dt + B] = U.b;
              N(it, Qe);
              P[_t + B] = U.a;
              P[ft + B] = U.b;
            } else {
              he(P[ut + B], P[_t + B]);
              Ze = U.a;
              it = U.b;
              he(P[dt + B], P[ft + B]);
              ct = U.a;
              Qe = U.b;
              he(Ze, ct);
              P[ut + B] = U.a;
              P[dt + B] = U.b;
              he(it, Qe);
              P[_t + B] = U.a;
              P[ft + B] = U.b;
            }
          }
          if (Q & pe) {
            const dt = ut + De;
            if (ie) {
              N(P[ut + B], P[dt + B]);
            } else {
              he(P[ut + B], P[dt + B]);
            }
            Ze = U.a;
            P[dt + B] = U.b;
            P[ut + B] = Ze;
          }
        }
        if (H & pe) {
          let ut = Ce;
          const Ke = Ce + A * (Q - ye);
          for (; ut <= Ke; ut += $e) {
            const dt = ut + Ve;
            if (ie) {
              N(P[ut + B], P[dt + B]);
            } else {
              he(P[ut + B], P[dt + B]);
            }
            Ze = U.a;
            P[dt + B] = U.b;
            P[ut + B] = Ze;
          }
        }
        ye = pe;
        pe >>= 1;
      }
      return Ce;
    }
    function de(P, B, Q, A, H, V, J, ie, ge) {
      let pe = 0;
      let ye = 0;
      const Ce = J;
      const Ae = Math.trunc(A.value + (H + 7) / 8);
      while (A.value < Ae) {
        te(pe, ye, Q, A);
        pe = oe.c;
        ye = oe.lc;
        while (ye >= 14) {
          const He = pe >> ye - 14 & 16383;
          const Ve = B[He];
          if (Ve.len) {
            ye -= Ve.len;
            Te(Ve.lit, V, pe, ye, Q, A, ie, ge, Ce);
            pe = le.c;
            ye = le.lc;
          } else {
            if (!Ve.p) {
              throw new Error("hufDecode issues");
            }
            let $e;
            for ($e = 0; $e < Ve.lit; $e++) {
              const Ze = Z(P[Ve.p[$e]]);
              while (ye < Ze && A.value < Ae) {
                te(pe, ye, Q, A);
                pe = oe.c;
                ye = oe.lc;
              }
              if (ye >= Ze && q(P[Ve.p[$e]]) == (pe >> ye - Ze & (1 << Ze) - 1)) {
                ye -= Ze;
                Te(Ve.p[$e], V, pe, ye, Q, A, ie, ge, Ce);
                pe = le.c;
                ye = le.lc;
                break;
              }
            }
            if ($e == Ve.lit) {
              throw new Error("hufDecode issues");
            }
          }
        }
      }
      const De = 8 - H & 7;
      pe >>= De;
      ye -= De;
      while (ye > 0) {
        const He = B[pe << 14 - ye & 16383];
        if (He.len) {
          ye -= He.len;
          Te(He.lit, V, pe, ye, Q, A, ie, ge, Ce);
          pe = le.c;
          ye = le.lc;
        } else {
          throw new Error("hufDecode issues");
        }
      }
      return true;
    }
    function xe(P, B, Q, A, H, V) {
      const J = {
        value: 0
      };
      const ie = Q.value;
      const ge = Re(B, Q);
      const pe = Re(B, Q);
      Q.value += 4;
      const ye = Re(B, Q);
      Q.value += 4;
      if (ge < 0 || ge >= 65537 || pe < 0 || pe >= 65537) {
        throw new Error("Something wrong with HUF_ENCSIZE");
      }
      const Ce = new Array(65537);
      const Ae = new Array(16384);
      ne(Ae);
      const De = A - (Q.value - ie);
      X(P, Q, De, ge, pe, Ce);
      if (ye > (A - (Q.value - ie)) * 8) {
        throw new Error("Something wrong with hufUncompress");
      }
      ue(Ce, ge, pe, Ae);
      de(Ce, Ae, P, Q, ye, pe, V, H, J);
    }
    function ee(P, B, Q) {
      for (let A = 0; A < Q; ++A) {
        B[A] = P[B[A]];
      }
    }
    function Ue(P) {
      for (let B = 1; B < P.length; B++) {
        const Q = P[B - 1] + P[B] - 128;
        P[B] = Q;
      }
    }
    function fe(P, B) {
      let Q = 0;
      let A = Math.floor((P.length + 1) / 2);
      let H = 0;
      const V = P.length - 1;
      while (!(H > V) && !(B[H++] = P[Q++], H > V)) {
        B[H++] = P[A++];
      }
    }
    function Se(P) {
      let B = P.byteLength;
      const Q = new Array();
      let A = 0;
      const H = new DataView(P);
      while (B > 0) {
        const V = H.getInt8(A++);
        if (V < 0) {
          const J = -V;
          B -= J + 1;
          for (let ie = 0; ie < J; ie++) {
            Q.push(H.getUint8(A++));
          }
        } else {
          const J = V;
          B -= 2;
          const ie = H.getUint8(A++);
          for (let ge = 0; ge < J + 1; ge++) {
            Q.push(ie);
          }
        }
      }
      return Q;
    }
    function Me(P, B, Q, A, H, V) {
      let J = new DataView(V.buffer);
      const ie = Q[P.idx[0]].width;
      const ge = Q[P.idx[0]].height;
      const pe = 3;
      const ye = Math.floor(ie / 8);
      const Ce = Math.ceil(ie / 8);
      const Ae = Math.ceil(ge / 8);
      const De = ie - (Ce - 1) * 8;
      const He = ge - (Ae - 1) * 8;
      const Ve = {
        value: 0
      };
      const $e = new Array(pe);
      const Ze = new Array(pe);
      const ct = new Array(pe);
      const it = new Array(pe);
      const Qe = new Array(pe);
      for (let Ke = 0; Ke < pe; ++Ke) {
        Qe[Ke] = B[P.idx[Ke]];
        $e[Ke] = Ke < 1 ? 0 : $e[Ke - 1] + Ce * Ae;
        Ze[Ke] = new Float32Array(64);
        ct[Ke] = new Uint16Array(64);
        it[Ke] = new Uint16Array(Ce * 64);
      }
      for (let Ke = 0; Ke < Ae; ++Ke) {
        let dt = 8;
        if (Ke == Ae - 1) {
          dt = He;
        }
        let _t = 8;
        for (let lt = 0; lt < Ce; ++lt) {
          if (lt == Ce - 1) {
            _t = De;
          }
          for (let rt = 0; rt < pe; ++rt) {
            ct[rt].fill(0);
            ct[rt][0] = H[$e[rt]++];
            Be(Ve, A, ct[rt]);
            se(ct[rt], Ze[rt]);
            $(Ze[rt]);
          }
          Oe(Ze);
          for (let rt = 0; rt < pe; ++rt) {
            Ye(Ze[rt], it[rt], lt * 64);
          }
        }
        let ft = 0;
        for (let lt = 0; lt < pe; ++lt) {
          const rt = Q[P.idx[lt]].type;
          for (let vt = Ke * 8; vt < Ke * 8 + dt; ++vt) {
            ft = Qe[lt][vt];
            for (let bt = 0; bt < ye; ++bt) {
              const mt = bt * 64 + (vt & 7) * 8;
              J.setUint16(ft + rt * 0, it[lt][mt + 0], true);
              J.setUint16(ft + rt * 2, it[lt][mt + 1], true);
              J.setUint16(ft + rt * 4, it[lt][mt + 2], true);
              J.setUint16(ft + rt * 6, it[lt][mt + 3], true);
              J.setUint16(ft + rt * 8, it[lt][mt + 4], true);
              J.setUint16(ft + rt * 10, it[lt][mt + 5], true);
              J.setUint16(ft + rt * 12, it[lt][mt + 6], true);
              J.setUint16(ft + rt * 14, it[lt][mt + 7], true);
              ft += rt * 16;
            }
          }
          if (ye != Ce) {
            for (let vt = Ke * 8; vt < Ke * 8 + dt; ++vt) {
              const bt = Qe[lt][vt] + ye * 8 * 2 * rt;
              const mt = ye * 64 + (vt & 7) * 8;
              for (let wt = 0; wt < _t; ++wt) {
                J.setUint16(bt + wt * 2 * rt, it[lt][mt + wt], true);
              }
            }
          }
        }
      }
      const ut = new Uint16Array(ie);
      J = new DataView(V.buffer);
      for (let Ke = 0; Ke < pe; ++Ke) {
        Q[P.idx[Ke]].decoded = true;
        const dt = Q[P.idx[Ke]].type;
        if (Q[Ke].type == 2) {
          for (let _t = 0; _t < ge; ++_t) {
            const ft = Qe[Ke][_t];
            for (let lt = 0; lt < ie; ++lt) {
              ut[lt] = J.getUint16(ft + lt * 2 * dt, true);
            }
            for (let lt = 0; lt < ie; ++lt) {
              J.setFloat32(ft + lt * 2 * dt, Pe(ut[lt]), true);
            }
          }
        }
      }
    }
    function Be(P, B, Q) {
      let A;
      let H = 1;
      while (H < 64) {
        A = B[P.value];
        if (A == 65280) {
          H = 64;
        } else if (A >> 8 == 255) {
          H += A & 255;
        } else {
          Q[H] = A;
          H++;
        }
        P.value++;
      }
    }
    function se(P, B) {
      B[0] = Pe(P[0]);
      B[1] = Pe(P[1]);
      B[2] = Pe(P[5]);
      B[3] = Pe(P[6]);
      B[4] = Pe(P[14]);
      B[5] = Pe(P[15]);
      B[6] = Pe(P[27]);
      B[7] = Pe(P[28]);
      B[8] = Pe(P[2]);
      B[9] = Pe(P[4]);
      B[10] = Pe(P[7]);
      B[11] = Pe(P[13]);
      B[12] = Pe(P[16]);
      B[13] = Pe(P[26]);
      B[14] = Pe(P[29]);
      B[15] = Pe(P[42]);
      B[16] = Pe(P[3]);
      B[17] = Pe(P[8]);
      B[18] = Pe(P[12]);
      B[19] = Pe(P[17]);
      B[20] = Pe(P[25]);
      B[21] = Pe(P[30]);
      B[22] = Pe(P[41]);
      B[23] = Pe(P[43]);
      B[24] = Pe(P[9]);
      B[25] = Pe(P[11]);
      B[26] = Pe(P[18]);
      B[27] = Pe(P[24]);
      B[28] = Pe(P[31]);
      B[29] = Pe(P[40]);
      B[30] = Pe(P[44]);
      B[31] = Pe(P[53]);
      B[32] = Pe(P[10]);
      B[33] = Pe(P[19]);
      B[34] = Pe(P[23]);
      B[35] = Pe(P[32]);
      B[36] = Pe(P[39]);
      B[37] = Pe(P[45]);
      B[38] = Pe(P[52]);
      B[39] = Pe(P[54]);
      B[40] = Pe(P[20]);
      B[41] = Pe(P[22]);
      B[42] = Pe(P[33]);
      B[43] = Pe(P[38]);
      B[44] = Pe(P[46]);
      B[45] = Pe(P[51]);
      B[46] = Pe(P[55]);
      B[47] = Pe(P[60]);
      B[48] = Pe(P[21]);
      B[49] = Pe(P[34]);
      B[50] = Pe(P[37]);
      B[51] = Pe(P[47]);
      B[52] = Pe(P[50]);
      B[53] = Pe(P[56]);
      B[54] = Pe(P[59]);
      B[55] = Pe(P[61]);
      B[56] = Pe(P[35]);
      B[57] = Pe(P[36]);
      B[58] = Pe(P[48]);
      B[59] = Pe(P[49]);
      B[60] = Pe(P[57]);
      B[61] = Pe(P[58]);
      B[62] = Pe(P[62]);
      B[63] = Pe(P[63]);
    }
    function $(P) {
      const B = Math.cos(0.7853975) * 0.5;
      const Q = Math.cos(3.14159 / 16) * 0.5;
      const A = Math.cos(3.14159 / 8) * 0.5;
      const H = Math.cos(9.424769999999999 / 16) * 0.5;
      const V = Math.cos(15.70795 / 16) * 0.5;
      const J = Math.cos(9.424769999999999 / 8) * 0.5;
      const ie = Math.cos(21.99113 / 16) * 0.5;
      const ge = new Array(4);
      const pe = new Array(4);
      const ye = new Array(4);
      const Ce = new Array(4);
      for (let Ae = 0; Ae < 8; ++Ae) {
        const De = Ae * 8;
        ge[0] = A * P[De + 2];
        ge[1] = J * P[De + 2];
        ge[2] = A * P[De + 6];
        ge[3] = J * P[De + 6];
        pe[0] = Q * P[De + 1] + H * P[De + 3] + V * P[De + 5] + ie * P[De + 7];
        pe[1] = H * P[De + 1] - ie * P[De + 3] - Q * P[De + 5] - V * P[De + 7];
        pe[2] = V * P[De + 1] - Q * P[De + 3] + ie * P[De + 5] + H * P[De + 7];
        pe[3] = ie * P[De + 1] - V * P[De + 3] + H * P[De + 5] - Q * P[De + 7];
        ye[0] = B * (P[De + 0] + P[De + 4]);
        ye[3] = B * (P[De + 0] - P[De + 4]);
        ye[1] = ge[0] + ge[3];
        ye[2] = ge[1] - ge[2];
        Ce[0] = ye[0] + ye[1];
        Ce[1] = ye[3] + ye[2];
        Ce[2] = ye[3] - ye[2];
        Ce[3] = ye[0] - ye[1];
        P[De + 0] = Ce[0] + pe[0];
        P[De + 1] = Ce[1] + pe[1];
        P[De + 2] = Ce[2] + pe[2];
        P[De + 3] = Ce[3] + pe[3];
        P[De + 4] = Ce[3] - pe[3];
        P[De + 5] = Ce[2] - pe[2];
        P[De + 6] = Ce[1] - pe[1];
        P[De + 7] = Ce[0] - pe[0];
      }
      for (let Ae = 0; Ae < 8; ++Ae) {
        ge[0] = A * P[16 + Ae];
        ge[1] = J * P[16 + Ae];
        ge[2] = A * P[48 + Ae];
        ge[3] = J * P[48 + Ae];
        pe[0] = Q * P[8 + Ae] + H * P[24 + Ae] + V * P[40 + Ae] + ie * P[56 + Ae];
        pe[1] = H * P[8 + Ae] - ie * P[24 + Ae] - Q * P[40 + Ae] - V * P[56 + Ae];
        pe[2] = V * P[8 + Ae] - Q * P[24 + Ae] + ie * P[40 + Ae] + H * P[56 + Ae];
        pe[3] = ie * P[8 + Ae] - V * P[24 + Ae] + H * P[40 + Ae] - Q * P[56 + Ae];
        ye[0] = B * (P[Ae] + P[32 + Ae]);
        ye[3] = B * (P[Ae] - P[32 + Ae]);
        ye[1] = ge[0] + ge[3];
        ye[2] = ge[1] - ge[2];
        Ce[0] = ye[0] + ye[1];
        Ce[1] = ye[3] + ye[2];
        Ce[2] = ye[3] - ye[2];
        Ce[3] = ye[0] - ye[1];
        P[0 + Ae] = Ce[0] + pe[0];
        P[8 + Ae] = Ce[1] + pe[1];
        P[16 + Ae] = Ce[2] + pe[2];
        P[24 + Ae] = Ce[3] + pe[3];
        P[32 + Ae] = Ce[3] - pe[3];
        P[40 + Ae] = Ce[2] - pe[2];
        P[48 + Ae] = Ce[1] - pe[1];
        P[56 + Ae] = Ce[0] - pe[0];
      }
    }
    function Oe(P) {
      for (let B = 0; B < 64; ++B) {
        const Q = P[0][B];
        const A = P[1][B];
        const H = P[2][B];
        P[0][B] = Q + H * 1.5747;
        P[1][B] = Q - A * 0.1873 - H * 0.4682;
        P[2][B] = Q + A * 1.8556;
      }
    }
    function Ye(P, B, Q) {
      for (let A = 0; A < 64; ++A) {
        B[Q + A] = DataUtils.toHalfFloat(st(P[A]));
      }
    }
    function st(P) {
      if (P <= 1) {
        return Math.sign(P) * Math.pow(Math.abs(P), 2.2);
      } else {
        return Math.sign(P) * Math.pow(L, Math.abs(P) - 1);
      }
    }
    function W(P) {
      return new DataView(P.array.buffer, P.offset.value, P.size);
    }
    function O(P) {
      const B = P.viewer.buffer.slice(P.offset.value, P.offset.value + P.size);
      const Q = new Uint8Array(Se(B));
      const A = new Uint8Array(Q.length);
      Ue(Q);
      fe(Q, A);
      return new DataView(A.buffer);
    }
    function me(P) {
      const B = P.array.slice(P.offset.value, P.offset.value + P.size);
      const Q = unzlibSync(B);
      const A = new Uint8Array(Q.length);
      Ue(Q);
      fe(Q, A);
      return new DataView(A.buffer);
    }
    function Ie(P) {
      const B = P.viewer;
      const Q = {
        value: P.offset.value
      };
      const A = new Uint16Array(P.width * P.scanlineBlockSize * (P.channels * P.type));
      const H = new Uint8Array(8192);
      let V = 0;
      const J = new Array(P.channels);
      for (let He = 0; He < P.channels; He++) {
        J[He] = {};
        J[He].start = V;
        J[He].end = J[He].start;
        J[He].nx = P.width;
        J[He].ny = P.lines;
        J[He].size = P.type;
        V += J[He].nx * J[He].ny * J[He].size;
      }
      const ie = ae(B, Q);
      const ge = ae(B, Q);
      if (ge >= 8192) {
        throw new Error("Something is wrong with PIZ_COMPRESSION BITMAP_SIZE");
      }
      if (ie <= ge) {
        for (let He = 0; He < ge - ie + 1; He++) {
          H[He + ie] = je(B, Q);
        }
      }
      const pe = new Uint16Array(65536);
      const ye = D(H, pe);
      const Ce = Re(B, Q);
      xe(P.array, B, Q, Ce, A, V);
      for (let He = 0; He < P.channels; ++He) {
        const Ve = J[He];
        for (let $e = 0; $e < J[He].size; ++$e) {
          ve(A, Ve.start + $e, Ve.nx, Ve.size, Ve.ny, Ve.nx * Ve.size, ye);
        }
      }
      ee(pe, A, V);
      let Ae = 0;
      const De = new Uint8Array(A.buffer.byteLength);
      for (let He = 0; He < P.lines; He++) {
        for (let Ve = 0; Ve < P.channels; Ve++) {
          const $e = J[Ve];
          const Ze = $e.nx * $e.size;
          const ct = new Uint8Array(A.buffer, $e.end * 2, Ze * 2);
          De.set(ct, Ae);
          Ae += Ze * 2;
          $e.end += Ze;
        }
      }
      return new DataView(De.buffer);
    }
    function Le(P) {
      const B = P.array.slice(P.offset.value, P.offset.value + P.size);
      const Q = unzlibSync(B);
      const A = P.lines * P.channels * P.width;
      const H = P.type == 1 ? new Uint16Array(A) : new Uint32Array(A);
      let V = 0;
      let J = 0;
      const ie = new Array(4);
      for (let ge = 0; ge < P.lines; ge++) {
        for (let pe = 0; pe < P.channels; pe++) {
          let ye = 0;
          switch (P.type) {
            case 1:
              ie[0] = V;
              ie[1] = ie[0] + P.width;
              V = ie[1] + P.width;
              for (let Ce = 0; Ce < P.width; ++Ce) {
                const Ae = Q[ie[0]++] << 8 | Q[ie[1]++];
                ye += Ae;
                H[J] = ye;
                J++;
              }
              break;
            case 2:
              ie[0] = V;
              ie[1] = ie[0] + P.width;
              ie[2] = ie[1] + P.width;
              V = ie[2] + P.width;
              for (let Ce = 0; Ce < P.width; ++Ce) {
                const Ae = Q[ie[0]++] << 24 | Q[ie[1]++] << 16 | Q[ie[2]++] << 8;
                ye += Ae;
                H[J] = ye;
                J++;
              }
              break;
          }
        }
      }
      return new DataView(H.buffer);
    }
    function Y(P) {
      const B = P.viewer;
      const Q = {
        value: P.offset.value
      };
      const A = new Uint8Array(P.width * P.lines * (P.channels * P.type * 2));
      const H = {
        version: We(B, Q),
        unknownUncompressedSize: We(B, Q),
        unknownCompressedSize: We(B, Q),
        acCompressedSize: We(B, Q),
        dcCompressedSize: We(B, Q),
        rleCompressedSize: We(B, Q),
        rleUncompressedSize: We(B, Q),
        rleRawSize: We(B, Q),
        totalAcUncompressedCount: We(B, Q),
        totalDcUncompressedCount: We(B, Q),
        acCompression: We(B, Q)
      };
      if (H.version < 2) {
        throw new Error("EXRLoader.parse: " + Tt.compression + " version " + H.version + " is unsupported");
      }
      const V = new Array();
      let J = ae(B, Q) - 2;
      while (J > 0) {
        const Ve = we(B.buffer, Q);
        const $e = je(B, Q);
        const Ze = $e >> 2 & 3;
        const ct = ($e >> 4) - 1;
        const it = new Int8Array([ct])[0];
        const Qe = je(B, Q);
        V.push({
          name: Ve,
          index: it,
          type: Qe,
          compression: Ze
        });
        J -= Ve.length + 3;
      }
      const ie = Tt.channels;
      const ge = new Array(P.channels);
      for (let Ve = 0; Ve < P.channels; ++Ve) {
        const $e = ge[Ve] = {};
        const Ze = ie[Ve];
        $e.name = Ze.name;
        $e.compression = 0;
        $e.decoded = false;
        $e.type = Ze.pixelType;
        $e.pLinear = Ze.pLinear;
        $e.width = P.width;
        $e.height = P.lines;
      }
      const pe = {
        idx: new Array(3)
      };
      for (let Ve = 0; Ve < P.channels; ++Ve) {
        const $e = ge[Ve];
        for (let Ze = 0; Ze < V.length; ++Ze) {
          const ct = V[Ze];
          if ($e.name == ct.name) {
            $e.compression = ct.compression;
            if (ct.index >= 0) {
              pe.idx[ct.index] = Ve;
            }
            $e.offset = Ve;
          }
        }
      }
      let ye;
      let Ce;
      let Ae;
      if (H.acCompressedSize > 0) {
        switch (H.acCompression) {
          case 0:
            ye = new Uint16Array(H.totalAcUncompressedCount);
            xe(P.array, B, Q, H.acCompressedSize, ye, H.totalAcUncompressedCount);
            break;
          case 1:
            const Ve = P.array.slice(Q.value, Q.value + H.totalAcUncompressedCount);
            const $e = unzlibSync(Ve);
            ye = new Uint16Array($e.buffer);
            Q.value += H.totalAcUncompressedCount;
            break;
        }
      }
      if (H.dcCompressedSize > 0) {
        const Ve = {
          array: P.array,
          offset: Q,
          size: H.dcCompressedSize
        };
        Ce = new Uint16Array(me(Ve).buffer);
        Q.value += H.dcCompressedSize;
      }
      if (H.rleRawSize > 0) {
        const Ve = P.array.slice(Q.value, Q.value + H.rleCompressedSize);
        const $e = unzlibSync(Ve);
        Ae = Se($e.buffer);
        Q.value += H.rleCompressedSize;
      }
      let De = 0;
      const He = new Array(ge.length);
      for (let Ve = 0; Ve < He.length; ++Ve) {
        He[Ve] = new Array();
      }
      for (let Ve = 0; Ve < P.lines; ++Ve) {
        for (let $e = 0; $e < ge.length; ++$e) {
          He[$e].push(De);
          De += ge[$e].width * P.type * 2;
        }
      }
      Me(pe, He, ge, ye, Ce, A);
      for (let Ve = 0; Ve < ge.length; ++Ve) {
        const $e = ge[Ve];
        if (!$e.decoded) {
          switch ($e.compression) {
            case 2:
              let Ze = 0;
              let ct = 0;
              for (let it = 0; it < P.lines; ++it) {
                let Qe = He[Ve][Ze];
                for (let ut = 0; ut < $e.width; ++ut) {
                  for (let Ke = 0; Ke < $e.type * 2; ++Ke) {
                    A[Qe++] = Ae[ct + Ke * $e.width * $e.height];
                  }
                  ct++;
                }
                Ze++;
              }
              break;
            case 1:
            default:
              throw new Error("EXRLoader.parse: unsupported channel compression");
          }
        }
      }
      return new DataView(A.buffer);
    }
    function we(P, B) {
      const Q = new Uint8Array(P);
      let A = 0;
      while (Q[B.value + A] != 0) {
        A += 1;
      }
      const H = new TextDecoder().decode(Q.slice(B.value, B.value + A));
      B.value = B.value + A + 1;
      return H;
    }
    function Ee(P, B, Q) {
      const A = new TextDecoder().decode(new Uint8Array(P).slice(B.value, B.value + Q));
      B.value = B.value + Q;
      return A;
    }
    function Fe(P, B) {
      const Q = tt(P, B);
      const A = Re(P, B);
      return [Q, A];
    }
    function Xe(P, B) {
      const Q = Re(P, B);
      const A = Re(P, B);
      return [Q, A];
    }
    function tt(P, B) {
      const Q = P.getInt32(B.value, true);
      B.value = B.value + 4;
      return Q;
    }
    function Re(P, B) {
      const Q = P.getUint32(B.value, true);
      B.value = B.value + 4;
      return Q;
    }
    function ot(P, B) {
      const Q = P[B.value];
      B.value = B.value + 1;
      return Q;
    }
    function je(P, B) {
      const Q = P.getUint8(B.value);
      B.value = B.value + 1;
      return Q;
    }
    const We = function (P, B) {
      let Q;
      if ("getBigInt64" in DataView.prototype) {
        Q = Number(P.getBigInt64(B.value, true));
      } else {
        Q = P.getUint32(B.value + 4, true) + Number(P.getUint32(B.value, true) << 0);
      }
      B.value += 8;
      return Q;
    };
    function Ge(P, B) {
      const Q = P.getFloat32(B.value, true);
      B.value += 4;
      return Q;
    }
    function qe(P, B) {
      return DataUtils.toHalfFloat(Ge(P, B));
    }
    function Pe(P) {
      const B = (P & 31744) >> 10;
      const Q = P & 1023;
      return (P >> 15 ? -1 : 1) * (B ? B === 31 ? Q ? NaN : Infinity : Math.pow(2, B - 15) * (1 + Q / 1024) : Q / 1024 * 0.00006103515625);
    }
    function ae(P, B) {
      const Q = P.getUint16(B.value, true);
      B.value += 2;
      return Q;
    }
    function ke(P, B) {
      return Pe(ae(P, B));
    }
    function Ne(P, B, Q, A) {
      const H = Q.value;
      const V = [];
      while (Q.value < H + A - 1) {
        const J = we(B, Q);
        const ie = tt(P, Q);
        const ge = je(P, Q);
        Q.value += 3;
        const pe = tt(P, Q);
        const ye = tt(P, Q);
        V.push({
          name: J,
          pixelType: ie,
          pLinear: ge,
          xSampling: pe,
          ySampling: ye
        });
      }
      Q.value += 1;
      return V;
    }
    function be(P, B) {
      const Q = Ge(P, B);
      const A = Ge(P, B);
      const H = Ge(P, B);
      const V = Ge(P, B);
      const J = Ge(P, B);
      const ie = Ge(P, B);
      const ge = Ge(P, B);
      const pe = Ge(P, B);
      return {
        redX: Q,
        redY: A,
        greenX: H,
        greenY: V,
        blueX: J,
        blueY: ie,
        whiteX: ge,
        whiteY: pe
      };
    }
    function ze(P, B) {
      const Q = ["NO_COMPRESSION", "RLE_COMPRESSION", "ZIPS_COMPRESSION", "ZIP_COMPRESSION", "PIZ_COMPRESSION", "PXR24_COMPRESSION", "B44_COMPRESSION", "B44A_COMPRESSION", "DWAA_COMPRESSION", "DWAB_COMPRESSION"];
      const A = je(P, B);
      return Q[A];
    }
    function Je(P, B) {
      const Q = Re(P, B);
      const A = Re(P, B);
      const H = Re(P, B);
      const V = Re(P, B);
      return {
        xMin: Q,
        yMin: A,
        xMax: H,
        yMax: V
      };
    }
    function at(P, B) {
      const Q = ["INCREASING_Y"];
      const A = je(P, B);
      return Q[A];
    }
    function pt(P, B) {
      const Q = Ge(P, B);
      const A = Ge(P, B);
      return [Q, A];
    }
    function xt(P, B) {
      const Q = Ge(P, B);
      const A = Ge(P, B);
      const H = Ge(P, B);
      return [Q, A, H];
    }
    function ht(P, B, Q, A, H) {
      if (A === "string" || A === "stringvector" || A === "iccProfile") {
        return Ee(B, Q, H);
      }
      if (A === "chlist") {
        return Ne(P, B, Q, H);
      }
      if (A === "chromaticities") {
        return be(P, Q);
      }
      if (A === "compression") {
        return ze(P, Q);
      }
      if (A === "box2i") {
        return Je(P, Q);
      }
      if (A === "lineOrder") {
        return at(P, Q);
      }
      if (A === "float") {
        return Ge(P, Q);
      }
      if (A === "v2f") {
        return pt(P, Q);
      }
      if (A === "v3f") {
        return xt(P, Q);
      }
      if (A === "int") {
        return tt(P, Q);
      }
      if (A === "rational") {
        return Fe(P, Q);
      }
      if (A === "timecode") {
        return Xe(P, Q);
      }
      if (A === "preview") {
        Q.value += H;
        return "skipped";
      }
      Q.value += H;
    }
    function gt(P, B, Q) {
      const A = {};
      if (P.getUint32(0, true) != 20000630) {
        throw new Error("THREE.EXRLoader: Provided file doesn't appear to be in OpenEXR format.");
      }
      A.version = P.getUint8(4);
      const H = P.getUint8(5);
      A.spec = {
        singleTile: !!(H & 2),
        longName: !!(H & 4),
        deepFormat: !!(H & 8),
        multiPart: !!(H & 16)
      };
      Q.value = 8;
      let V = true;
      while (V) {
        const J = we(B, Q);
        if (J == 0) {
          V = false;
        } else {
          const ie = we(B, Q);
          const ge = Re(P, Q);
          const pe = ht(P, B, Q, ie, ge);
          if (pe === undefined) {
            console.warn(`THREE.EXRLoader: Skipped unknown header attribute type '${ie}'.`);
          } else {
            A[J] = pe;
          }
        }
      }
      if (H & -5) {
        console.error("THREE.EXRHeader:", A);
        throw new Error("THREE.EXRLoader: Provided file is currently unsupported.");
      }
      return A;
    }
    function yt(P, B, Q, A, H) {
      const V = {
        size: 0,
        viewer: B,
        array: Q,
        offset: A,
        width: P.dataWindow.xMax - P.dataWindow.xMin + 1,
        height: P.dataWindow.yMax - P.dataWindow.yMin + 1,
        channels: P.channels.length,
        bytesPerLine: null,
        lines: null,
        inputSize: null,
        type: P.channels[0].pixelType,
        uncompress: null,
        getter: null,
        format: null,
        colorSpace: LinearSRGBColorSpace
      };
      switch (P.compression) {
        case "NO_COMPRESSION":
          V.lines = 1;
          V.uncompress = W;
          break;
        case "RLE_COMPRESSION":
          V.lines = 1;
          V.uncompress = O;
          break;
        case "ZIPS_COMPRESSION":
          V.lines = 1;
          V.uncompress = me;
          break;
        case "ZIP_COMPRESSION":
          V.lines = 16;
          V.uncompress = me;
          break;
        case "PIZ_COMPRESSION":
          V.lines = 32;
          V.uncompress = Ie;
          break;
        case "PXR24_COMPRESSION":
          V.lines = 16;
          V.uncompress = Le;
          break;
        case "DWAA_COMPRESSION":
          V.lines = 32;
          V.uncompress = Y;
          break;
        case "DWAB_COMPRESSION":
          V.lines = 256;
          V.uncompress = Y;
          break;
        default:
          throw new Error("EXRLoader.parse: " + P.compression + " is unsupported");
      }
      V.scanlineBlockSize = V.lines;
      if (V.type == 1) {
        switch (H) {
          case FloatType:
            V.getter = ke;
            V.inputSize = 2;
            break;
          case HalfFloatType:
            V.getter = ae;
            V.inputSize = 2;
            break;
        }
      } else if (V.type == 2) {
        switch (H) {
          case FloatType:
            V.getter = Ge;
            V.inputSize = 4;
            break;
          case HalfFloatType:
            V.getter = qe;
            V.inputSize = 4;
        }
      } else {
        throw new Error("EXRLoader.parse: unsupported pixelType " + V.type + " for " + P.compression + ".");
      }
      V.blockCount = (P.dataWindow.yMax + 1) / V.scanlineBlockSize;
      for (let ie = 0; ie < V.blockCount; ie++) {
        We(B, A);
      }
      V.outputChannels = V.channels == 3 ? 4 : V.channels;
      const J = V.width * V.height * V.outputChannels;
      switch (H) {
        case FloatType:
          V.byteArray = new Float32Array(J);
          if (V.channels < V.outputChannels) {
            V.byteArray.fill(1, 0, J);
          }
          break;
        case HalfFloatType:
          V.byteArray = new Uint16Array(J);
          if (V.channels < V.outputChannels) {
            V.byteArray.fill(15360, 0, J);
          }
          break;
        default:
          console.error("THREE.EXRLoader: unsupported type: ", H);
          break;
      }
      V.bytesPerLine = V.width * V.inputSize * V.channels;
      if (V.outputChannels == 4) {
        V.format = RGBAFormat;
        V.colorSpace = LinearSRGBColorSpace;
      } else {
        V.format = RedFormat;
        V.colorSpace = NoColorSpace;
      }
      return V;
    }
    const Mt = new DataView(e);
    const Et = new Uint8Array(e);
    const St = {
      value: 0
    };
    const Tt = gt(Mt, e, St);
    const nt = yt(Tt, Mt, Et, St, this.type);
    const Rt = {
      value: 0
    };
    const Ct = {
      R: 0,
      G: 1,
      B: 2,
      A: 3,
      Y: 0
    };
    for (let P = 0; P < nt.height / nt.scanlineBlockSize; P++) {
      const B = Re(Mt, St);
      nt.size = Re(Mt, St);
      nt.lines = B + nt.scanlineBlockSize > nt.height ? nt.height - B : nt.scanlineBlockSize;
      const A = nt.size < nt.lines * nt.bytesPerLine ? nt.uncompress(nt) : W(nt);
      St.value += nt.size;
      for (let H = 0; H < nt.scanlineBlockSize; H++) {
        const V = H + P * nt.scanlineBlockSize;
        if (V >= nt.height) {
          break;
        }
        for (let J = 0; J < nt.channels; J++) {
          const ie = Ct[Tt.channels[J].name];
          for (let ge = 0; ge < nt.width; ge++) {
            Rt.value = (H * (nt.channels * nt.width) + J * nt.width + ge) * nt.inputSize;
            const pe = (nt.height - 1 - V) * (nt.width * nt.outputChannels) + ge * nt.outputChannels + ie;
            nt.byteArray[pe] = nt.getter(A, Rt);
          }
        }
      }
    }
    return {
      header: Tt,
      width: nt.width,
      height: nt.height,
      data: nt.byteArray,
      format: nt.format,
      colorSpace: nt.colorSpace,
      type: this.type
    };
  }
  setDataType(e) {
    this.type = e;
    return this;
  }
  load(e, t, r, n) {
    function a(l, c) {
      l.colorSpace = c.colorSpace;
      l.minFilter = LinearFilter;
      l.magFilter = LinearFilter;
      l.generateMipmaps = false;
      l.flipY = false;
      if (t) {
        t(l, c);
      }
    }
    return super.load(e, a, r, n);
  }
}
const AnyItem$2 = properties.loader.ITEM_CLASSES.any;
class EXRItem extends AnyItem$2 {
  constructor(e, t) {
    super(e, {
      ...t,
      responseType: "type"
    });
    this.EXRLoader = new EXRLoader();
  }
  retrieve() {
    return false;
  }
  _onLoad(e) {
    this.content = e;
    super._onLoad(this);
  }
  loadFunc() {
    this.EXRLoader.load(this.url, this._onLoad.bind(this), this._onGLTFLoading.bind(this), e => {
      console.warn("EXR load error: " + this.url, e);
      this._onLoadComplete();
    });
  }
  _onGLTFLoading(e) {
    if (this.hasLoading) {
      this.loadingSignal.dispatch(e.loaded / e.total);
    }
  }
}
EXRItem.type = "exr";
EXRItem.extensions = ["exr"];
const ImageItem = properties.loader.ITEM_CLASSES.image;
class TextureItem extends ImageItem {
  constructor(e, t) {
    let r = t.content || new Texture(new Image());
    t.content = r.image;
    r.size = new Vector2();
    r.minFilter = t.minFilter || LinearMipMapLinearFilter;
    switch (r.minFilter) {
      case NearestMipMapNearestFilter:
      case NearestMipMapLinearFilter:
      case LinearMipMapNearestFilter:
      case LinearMipMapLinearFilter:
        r.generateMipmaps = true;
        r.anisotropy = t.anisotropy || properties.renderer.capabilities.getMaxAnisotropy();
        break;
      default:
        r.generateMipmaps = false;
    }
    r.flipY = t.flipY === undefined ? true : t.flipY;
    if (t.wrap) {
      r.wrapS = r.wrapT = t.wrap;
    } else {
      if (t.wrapS) {
        r.wrapS = t.wrapS;
      }
      if (t.wrapT) {
        r.wrapT = t.wrapT;
      }
    }
    super(e, t);
    this.content = r;
  }
  retrieve() {
    return false;
  }
  load() {
    this.isStartLoaded = true;
    let e = this.content.image;
    e.onload = this.boundOnLoad;
    e.src = this.url;
  }
  _onLoad() {
    delete this.content.image.onload;
    this.width = this.content.image.width;
    this.height = this.content.image.height;
    this.content.size.set(this.width, this.height);
    this.content.needsUpdate = true;
    taskManager.add(this.content);
    if (this.onPost) {
      this.onPost.call(this, this.content, this.onPostLoadingSignal);
    } else {
      this._onLoadComplete();
    }
  }
}
TextureItem.type = "texture";
TextureItem.extensions = [];
const AnyItem$1 = properties.loader.ITEM_CLASSES.any;
class ThreeLoaderItem extends AnyItem$1 {
  constructor(e, t) {
    t.loadFunc = () => {};
    t.hasLoading = t.hasLoading === undefined ? true : t.hasLoading;
    super(e, t);
    if (!t.loader && console) {
      (console.error || console.log)("loader is required.");
    }
    this.loadFunc = this._loadFunc.bind(this);
  }
  _loadFunc(e, t, r) {
    this.loader.load(e, this._onLoaderLoad.bind(this, t), this._onLoaderLoading.bind(this, r), n => {
      console.warn("ThreeLoader error: " + e, n);
      t(null);
    });
  }
  _onLoaderLoad(e, t) {
    this.content = t;
    e(t);
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
ThreeLoaderItem.type = "three-loader";
ThreeLoaderItem.extensions = [];
const shader = `#define GLSLIFY 1
uniform vec2 u_glPositionOffset;vec4 glPositionOffset(vec4 glPosition){return glPosition+vec4(u_glPositionOffset*glPosition.w,0.0,0.0);}`;
class GlPositionOffset {
  offset = new Vector2();
  sharedUniforms = {
    u_glPositionOffset: {
      value: null
    }
  };
  init() {
    this.sharedUniforms.u_glPositionOffset.value = this.offset;
    shaderHelper.addChunk("glPositionOffset", shader);
  }
  setOffset(e, t) {
    return this.offset.set(e, t);
  }
}
const glPositionOffset = new GlPositionOffset();
class Support {
  isSupported() {
    properties._isSupportedDevice = true;
    properties._isSupportedBrowser = (browser$1.isChrome || browser$1.isSafari || browser$1.isEdge || browser$1.isFirefox || browser$1.isOpera) && !browser$1.isIE;
    properties._isSupportedWebGL = this.checkSupportWebGL();
    return properties._isSupportedWebGL;
  }
  checkSupportWebGL() {
    if (!(properties.canvas instanceof HTMLCanvasElement)) {
      return false;
    }
    if (settings.USE_WEBGL2 && window.WebGL2RenderingContext) {
      try {
        properties.gl = properties.canvas.getContext("webgl2", properties.webglOpts);
        settings.RENDER_TARGET_FLOAT_TYPE = HalfFloatType;
        settings.DATA_FLOAT_TYPE = FloatType;
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    settings.USE_WEBGL2 = false;
    if (window.WebGLRenderingContext) {
      try {
        let e = properties.gl = properties.canvas.getContext("webgl", properties.webglOpts) || properties.canvas.getContext("experimental-webgl", properties.webglOpts);
        if ((e.getExtension("OES_texture_float") || e.getExtension("OES_texture_half_float")) && e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
          settings.RENDER_TARGET_FLOAT_TYPE = browser$1.isIOS || e.getExtension("OES_texture_half_float") ? HalfFloatType : FloatType;
          settings.DATA_FLOAT_TYPE = FloatType;
        } else {
          settings.USE_FLOAT_PACKING = true;
          settings.RENDER_TARGET_FLOAT_TYPE = settings.DATA_FLOAT_TYPE = UnsignedByteType;
          return false;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return false;
  }
}
const support = new Support();
const textureBicubicShader = `#define GLSLIFY 1
vec4 cubic(float v){vec4 n=vec4(1.0,2.0,3.0,4.0)-v;vec4 s=n*n*n;float x=s.x;float y=s.y-4.0*s.x;float z=s.z-4.0*s.y+6.0*s.x;float w=6.0-x-y-z;return vec4(x,y,z,w);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,offset.xz);vec4 sample1=texture2D(t,offset.yz);vec4 sample2=texture2D(t,offset.xw);vec4 sample3=texture2D(t,offset.yw);float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize,vec4 clampRect){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,clamp(offset.xz,clampRect.xy,clampRect.zw));vec4 sample1=texture2D(t,clamp(offset.yz,clampRect.xy,clampRect.zw));vec4 sample2=texture2D(t,clamp(offset.xw,clampRect.xy,clampRect.zw));vec4 sample3=texture2D(t,clamp(offset.yw,clampRect.xy,clampRect.zw));float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}`;
