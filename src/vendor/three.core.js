/**
 * ============================================================================
 * Lusion Modular Component: 01-three-core
 * File: src/vendor/three.core.js
 * Description: Three.js r158 Core, Math, Geometries, Shaders & WebGLRenderer
 * Original Engine Lines: 1 - 25770
 * ============================================================================
 */
/**
 * @license
 * Copyright 2010-2023 Three.js Authors
 * SPDX-License-Identifier: MIT
 */
const REVISION = "158";
const MOUSE = {
  ROTATE: 0,
  DOLLY: 1,
  PAN: 2
};
const TOUCH = {
  ROTATE: 0,
  PAN: 1,
  DOLLY_PAN: 2,
  DOLLY_ROTATE: 3
};
const CullFaceNone = 0;
const CullFaceBack = 1;
const CullFaceFront = 2;
const PCFShadowMap = 1;
const PCFSoftShadowMap = 2;
const VSMShadowMap = 3;
const FrontSide = 0;
const BackSide = 1;
const DoubleSide = 2;
const NoBlending = 0;
const NormalBlending = 1;
const AdditiveBlending = 2;
const SubtractiveBlending = 3;
const MultiplyBlending = 4;
const CustomBlending = 5;
const AddEquation = 100;
const SubtractEquation = 101;
const ReverseSubtractEquation = 102;
const MinEquation = 103;
const MaxEquation = 104;
const ZeroFactor = 200;
const OneFactor = 201;
const SrcColorFactor = 202;
const OneMinusSrcColorFactor = 203;
const SrcAlphaFactor = 204;
const OneMinusSrcAlphaFactor = 205;
const DstAlphaFactor = 206;
const OneMinusDstAlphaFactor = 207;
const DstColorFactor = 208;
const OneMinusDstColorFactor = 209;
const SrcAlphaSaturateFactor = 210;
const ConstantColorFactor = 211;
const OneMinusConstantColorFactor = 212;
const ConstantAlphaFactor = 213;
const OneMinusConstantAlphaFactor = 214;
const NeverDepth = 0;
const AlwaysDepth = 1;
const LessDepth = 2;
const LessEqualDepth = 3;
const EqualDepth = 4;
const GreaterEqualDepth = 5;
const GreaterDepth = 6;
const NotEqualDepth = 7;
const MultiplyOperation = 0;
const MixOperation = 1;
const AddOperation = 2;
const NoToneMapping = 0;
const LinearToneMapping = 1;
const ReinhardToneMapping = 2;
const CineonToneMapping = 3;
const ACESFilmicToneMapping = 4;
const CustomToneMapping = 5;
const UVMapping = 300;
const CubeReflectionMapping = 301;
const CubeRefractionMapping = 302;
const EquirectangularReflectionMapping = 303;
const EquirectangularRefractionMapping = 304;
const CubeUVReflectionMapping = 306;
const RepeatWrapping = 1000;
const ClampToEdgeWrapping = 1001;
const MirroredRepeatWrapping = 1002;
const NearestFilter = 1003;
const NearestMipmapNearestFilter = 1004;
const NearestMipMapNearestFilter = 1004;
const NearestMipmapLinearFilter = 1005;
const NearestMipMapLinearFilter = 1005;
const LinearFilter = 1006;
const LinearMipmapNearestFilter = 1007;
const LinearMipMapNearestFilter = 1007;
const LinearMipmapLinearFilter = 1008;
const LinearMipMapLinearFilter = 1008;
const UnsignedByteType = 1009;
const ByteType = 1010;
const ShortType = 1011;
const UnsignedShortType = 1012;
const IntType = 1013;
const UnsignedIntType = 1014;
const FloatType = 1015;
const HalfFloatType = 1016;
const UnsignedShort4444Type = 1017;
const UnsignedShort5551Type = 1018;
const UnsignedInt248Type = 1020;
const AlphaFormat = 1021;
const RGBAFormat = 1023;
const LuminanceFormat = 1024;
const LuminanceAlphaFormat = 1025;
const DepthFormat = 1026;
const DepthStencilFormat = 1027;
const RedFormat = 1028;
const RedIntegerFormat = 1029;
const RGFormat = 1030;
const RGIntegerFormat = 1031;
const RGBAIntegerFormat = 1033;
const RGB_S3TC_DXT1_Format = 33776;
const RGBA_S3TC_DXT1_Format = 33777;
const RGBA_S3TC_DXT3_Format = 33778;
const RGBA_S3TC_DXT5_Format = 33779;
const RGB_PVRTC_4BPPV1_Format = 35840;
const RGB_PVRTC_2BPPV1_Format = 35841;
const RGBA_PVRTC_4BPPV1_Format = 35842;
const RGBA_PVRTC_2BPPV1_Format = 35843;
const RGB_ETC1_Format = 36196;
const RGB_ETC2_Format = 37492;
const RGBA_ETC2_EAC_Format = 37496;
const RGBA_ASTC_4x4_Format = 37808;
const RGBA_ASTC_5x4_Format = 37809;
const RGBA_ASTC_5x5_Format = 37810;
const RGBA_ASTC_6x5_Format = 37811;
const RGBA_ASTC_6x6_Format = 37812;
const RGBA_ASTC_8x5_Format = 37813;
const RGBA_ASTC_8x6_Format = 37814;
const RGBA_ASTC_8x8_Format = 37815;
const RGBA_ASTC_10x5_Format = 37816;
const RGBA_ASTC_10x6_Format = 37817;
const RGBA_ASTC_10x8_Format = 37818;
const RGBA_ASTC_10x10_Format = 37819;
const RGBA_ASTC_12x10_Format = 37820;
const RGBA_ASTC_12x12_Format = 37821;
const RGBA_BPTC_Format = 36492;
const RGB_BPTC_SIGNED_Format = 36494;
const RGB_BPTC_UNSIGNED_Format = 36495;
const RED_RGTC1_Format = 36283;
const SIGNED_RED_RGTC1_Format = 36284;
const RED_GREEN_RGTC2_Format = 36285;
const SIGNED_RED_GREEN_RGTC2_Format = 36286;
const LinearEncoding = 3000;
const sRGBEncoding = 3001;
const BasicDepthPacking = 3200;
const RGBADepthPacking = 3201;
const TangentSpaceNormalMap = 0;
const ObjectSpaceNormalMap = 1;
const NoColorSpace = "";
const SRGBColorSpace = "srgb";
const LinearSRGBColorSpace = "srgb-linear";
const DisplayP3ColorSpace = "display-p3";
const LinearDisplayP3ColorSpace = "display-p3-linear";
const LinearTransfer = "linear";
const SRGBTransfer = "srgb";
const Rec709Primaries = "rec709";
const P3Primaries = "p3";
const KeepStencilOp = 7680;
const AlwaysStencilFunc = 519;
const NeverCompare = 512;
const LessCompare = 513;
const EqualCompare = 514;
const LessEqualCompare = 515;
const GreaterCompare = 516;
const NotEqualCompare = 517;
const GreaterEqualCompare = 518;
const AlwaysCompare = 519;
const StaticDrawUsage = 35044;
const DynamicDrawUsage = 35048;
const GLSL1 = "100";
const GLSL3 = "300 es";
const _SRGBAFormat = 1035;
const WebGLCoordinateSystem = 2000;
const WebGPUCoordinateSystem = 2001;
class EventDispatcher {
  addEventListener(e, t) {
    if (this._listeners === undefined) {
      this._listeners = {};
    }
    const r = this._listeners;
    if (r[e] === undefined) {
      r[e] = [];
    }
    if (r[e].indexOf(t) === -1) {
      r[e].push(t);
    }
  }
  hasEventListener(e, t) {
    if (this._listeners === undefined) {
      return false;
    }
    const r = this._listeners;
    return r[e] !== undefined && r[e].indexOf(t) !== -1;
  }
  removeEventListener(e, t) {
    if (this._listeners === undefined) {
      return;
    }
    const n = this._listeners[e];
    if (n !== undefined) {
      const a = n.indexOf(t);
      if (a !== -1) {
        n.splice(a, 1);
      }
    }
  }
  dispatchEvent(e) {
    if (this._listeners === undefined) {
      return;
    }
    const r = this._listeners[e.type];
    if (r !== undefined) {
      e.target = this;
      const n = r.slice(0);
      for (let a = 0, l = n.length; a < l; a++) {
        n[a].call(this, e);
      }
      e.target = null;
    }
  }
}
const _lut = ["00", "01", "02", "03", "04", "05", "06", "07", "08", "09", "0a", "0b", "0c", "0d", "0e", "0f", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19", "1a", "1b", "1c", "1d", "1e", "1f", "20", "21", "22", "23", "24", "25", "26", "27", "28", "29", "2a", "2b", "2c", "2d", "2e", "2f", "30", "31", "32", "33", "34", "35", "36", "37", "38", "39", "3a", "3b", "3c", "3d", "3e", "3f", "40", "41", "42", "43", "44", "45", "46", "47", "48", "49", "4a", "4b", "4c", "4d", "4e", "4f", "50", "51", "52", "53", "54", "55", "56", "57", "58", "59", "5a", "5b", "5c", "5d", "5e", "5f", "60", "61", "62", "63", "64", "65", "66", "67", "68", "69", "6a", "6b", "6c", "6d", "6e", "6f", "70", "71", "72", "73", "74", "75", "76", "77", "78", "79", "7a", "7b", "7c", "7d", "7e", "7f", "80", "81", "82", "83", "84", "85", "86", "87", "88", "89", "8a", "8b", "8c", "8d", "8e", "8f", "90", "91", "92", "93", "94", "95", "96", "97", "98", "99", "9a", "9b", "9c", "9d", "9e", "9f", "a0", "a1", "a2", "a3", "a4", "a5", "a6", "a7", "a8", "a9", "aa", "ab", "ac", "ad", "ae", "af", "b0", "b1", "b2", "b3", "b4", "b5", "b6", "b7", "b8", "b9", "ba", "bb", "bc", "bd", "be", "bf", "c0", "c1", "c2", "c3", "c4", "c5", "c6", "c7", "c8", "c9", "ca", "cb", "cc", "cd", "ce", "cf", "d0", "d1", "d2", "d3", "d4", "d5", "d6", "d7", "d8", "d9", "da", "db", "dc", "dd", "de", "df", "e0", "e1", "e2", "e3", "e4", "e5", "e6", "e7", "e8", "e9", "ea", "eb", "ec", "ed", "ee", "ef", "f0", "f1", "f2", "f3", "f4", "f5", "f6", "f7", "f8", "f9", "fa", "fb", "fc", "fd", "fe", "ff"];
let _seed = 1234567;
const DEG2RAD = Math.PI / 180;
const RAD2DEG = 180 / Math.PI;
function generateUUID() {
  const o = Math.random() * 4294967295 | 0;
  const e = Math.random() * 4294967295 | 0;
  const t = Math.random() * 4294967295 | 0;
  const r = Math.random() * 4294967295 | 0;
  return (_lut[o & 255] + _lut[o >> 8 & 255] + _lut[o >> 16 & 255] + _lut[o >> 24 & 255] + "-" + _lut[e & 255] + _lut[e >> 8 & 255] + "-" + _lut[e >> 16 & 15 | 64] + _lut[e >> 24 & 255] + "-" + _lut[t & 63 | 128] + _lut[t >> 8 & 255] + "-" + _lut[t >> 16 & 255] + _lut[t >> 24 & 255] + _lut[r & 255] + _lut[r >> 8 & 255] + _lut[r >> 16 & 255] + _lut[r >> 24 & 255]).toLowerCase();
}
function clamp$1(o, e, t) {
  return Math.max(e, Math.min(t, o));
}
function euclideanModulo(o, e) {
  return (o % e + e) % e;
}
function mapLinear(o, e, t, r, n) {
  return r + (o - e) * (n - r) / (t - e);
}
function inverseLerp(o, e, t) {
  if (o !== e) {
    return (t - o) / (e - o);
  } else {
    return 0;
  }
}
function lerp(o, e, t) {
  return (1 - t) * o + t * e;
}
function damp(o, e, t, r) {
  return lerp(o, e, 1 - Math.exp(-t * r));
}
function pingpong(o, e = 1) {
  return e - Math.abs(euclideanModulo(o, e * 2) - e);
}
function smoothstep(o, e, t) {
  if (o <= e) {
    return 0;
  } else if (o >= t) {
    return 1;
  } else {
    o = (o - e) / (t - e);
    return o * o * (3 - o * 2);
  }
}
function smootherstep(o, e, t) {
  if (o <= e) {
    return 0;
  } else if (o >= t) {
    return 1;
  } else {
    o = (o - e) / (t - e);
    return o * o * o * (o * (o * 6 - 15) + 10);
  }
}
function randInt(o, e) {
  return o + Math.floor(Math.random() * (e - o + 1));
}
function randFloat(o, e) {
  return o + Math.random() * (e - o);
}
function randFloatSpread(o) {
  return o * (0.5 - Math.random());
}
function seededRandom(o) {
  if (o !== undefined) {
    _seed = o;
  }
  let e = _seed += 1831565813;
  e = Math.imul(e ^ e >>> 15, e | 1);
  e ^= e + Math.imul(e ^ e >>> 7, e | 61);
  return ((e ^ e >>> 14) >>> 0) / 4294967296;
}
function degToRad(o) {
  return o * DEG2RAD;
}
function radToDeg(o) {
  return o * RAD2DEG;
}
function isPowerOfTwo(o) {
  return (o & o - 1) === 0 && o !== 0;
}
function ceilPowerOfTwo(o) {
  return Math.pow(2, Math.ceil(Math.log(o) / Math.LN2));
}
function floorPowerOfTwo(o) {
  return Math.pow(2, Math.floor(Math.log(o) / Math.LN2));
}
function setQuaternionFromProperEuler(o, e, t, r, n) {
  const a = Math.cos;
  const l = Math.sin;
  const c = a(t / 2);
  const u = l(t / 2);
  const f = a((e + r) / 2);
  const p = l((e + r) / 2);
  const g = a((e - r) / 2);
  const v = l((e - r) / 2);
  const _ = a((r - e) / 2);
  const T = l((r - e) / 2);
  switch (n) {
    case "XYX":
      o.set(c * p, u * g, u * v, c * f);
      break;
    case "YZY":
      o.set(u * v, c * p, u * g, c * f);
      break;
    case "ZXZ":
      o.set(u * g, u * v, c * p, c * f);
      break;
    case "XZX":
      o.set(c * p, u * T, u * _, c * f);
      break;
    case "YXY":
      o.set(u * _, c * p, u * T, c * f);
      break;
    case "ZYZ":
      o.set(u * T, u * _, c * p, c * f);
      break;
    default:
      console.warn("THREE.MathUtils: .setQuaternionFromProperEuler() encountered an unknown order: " + n);
  }
}
function denormalize(o, e) {
  switch (e.constructor) {
    case Float32Array:
      return o;
    case Uint32Array:
      return o / 4294967295;
    case Uint16Array:
      return o / 65535;
    case Uint8Array:
      return o / 255;
    case Int32Array:
      return Math.max(o / 2147483647, -1);
    case Int16Array:
      return Math.max(o / 32767, -1);
    case Int8Array:
      return Math.max(o / 127, -1);
    default:
      throw new Error("Invalid component type.");
  }
}
function normalize(o, e) {
  switch (e.constructor) {
    case Float32Array:
      return o;
    case Uint32Array:
      return Math.round(o * 4294967295);
    case Uint16Array:
      return Math.round(o * 65535);
    case Uint8Array:
      return Math.round(o * 255);
    case Int32Array:
      return Math.round(o * 2147483647);
    case Int16Array:
      return Math.round(o * 32767);
    case Int8Array:
      return Math.round(o * 127);
    default:
      throw new Error("Invalid component type.");
  }
}
const MathUtils$1 = {
  DEG2RAD,
  RAD2DEG,
  generateUUID,
  clamp: clamp$1,
  euclideanModulo,
  mapLinear,
  inverseLerp,
  lerp,
  damp,
  pingpong,
  smoothstep,
  smootherstep,
  randInt,
  randFloat,
  randFloatSpread,
  seededRandom,
  degToRad,
  radToDeg,
  isPowerOfTwo,
  ceilPowerOfTwo,
  floorPowerOfTwo,
  setQuaternionFromProperEuler,
  normalize,
  denormalize
};
class Vector2 {
  constructor(e = 0, t = 0) {
    Vector2.prototype.isVector2 = true;
    this.x = e;
    this.y = t;
  }
  get width() {
    return this.x;
  }
  set width(e) {
    this.x = e;
  }
  get height() {
    return this.y;
  }
  set height(e) {
    this.y = e;
  }
  set(e, t) {
    this.x = e;
    this.y = t;
    return this;
  }
  setScalar(e) {
    this.x = e;
    this.y = e;
    return this;
  }
  setX(e) {
    this.x = e;
    return this;
  }
  setY(e) {
    this.y = e;
    return this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y);
  }
  copy(e) {
    this.x = e.x;
    this.y = e.y;
    return this;
  }
  add(e) {
    this.x += e.x;
    this.y += e.y;
    return this;
  }
  addScalar(e) {
    this.x += e;
    this.y += e;
    return this;
  }
  addVectors(e, t) {
    this.x = e.x + t.x;
    this.y = e.y + t.y;
    return this;
  }
  addScaledVector(e, t) {
    this.x += e.x * t;
    this.y += e.y * t;
    return this;
  }
  sub(e) {
    this.x -= e.x;
    this.y -= e.y;
    return this;
  }
  subScalar(e) {
    this.x -= e;
    this.y -= e;
    return this;
  }
  subVectors(e, t) {
    this.x = e.x - t.x;
    this.y = e.y - t.y;
    return this;
  }
  multiply(e) {
    this.x *= e.x;
    this.y *= e.y;
    return this;
  }
  multiplyScalar(e) {
    this.x *= e;
    this.y *= e;
    return this;
  }
  divide(e) {
    this.x /= e.x;
    this.y /= e.y;
    return this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  applyMatrix3(e) {
    const t = this.x;
    const r = this.y;
    const n = e.elements;
    this.x = n[0] * t + n[3] * r + n[6];
    this.y = n[1] * t + n[4] * r + n[7];
    return this;
  }
  min(e) {
    this.x = Math.min(this.x, e.x);
    this.y = Math.min(this.y, e.y);
    return this;
  }
  max(e) {
    this.x = Math.max(this.x, e.x);
    this.y = Math.max(this.y, e.y);
    return this;
  }
  clamp(e, t) {
    this.x = Math.max(e.x, Math.min(t.x, this.x));
    this.y = Math.max(e.y, Math.min(t.y, this.y));
    return this;
  }
  clampScalar(e, t) {
    this.x = Math.max(e, Math.min(t, this.x));
    this.y = Math.max(e, Math.min(t, this.y));
    return this;
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    return this;
  }
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    return this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y;
  }
  cross(e) {
    return this.x * e.y - this.y * e.x;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  angle() {
    return Math.atan2(-this.y, -this.x) + Math.PI;
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) {
      return Math.PI / 2;
    }
    const r = this.dot(e) / t;
    return Math.acos(clamp$1(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x;
    const r = this.y - e.y;
    return t * t + r * r;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    this.x += (e.x - this.x) * t;
    this.y += (e.y - this.y) * t;
    return this;
  }
  lerpVectors(e, t, r) {
    this.x = e.x + (t.x - e.x) * r;
    this.y = e.y + (t.y - e.y) * r;
    return this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y;
  }
  fromArray(e, t = 0) {
    this.x = e[t];
    this.y = e[t + 1];
    return this;
  }
  toArray(e = [], t = 0) {
    e[t] = this.x;
    e[t + 1] = this.y;
    return e;
  }
  fromBufferAttribute(e, t) {
    this.x = e.getX(t);
    this.y = e.getY(t);
    return this;
  }
  rotateAround(e, t) {
    const r = Math.cos(t);
    const n = Math.sin(t);
    const a = this.x - e.x;
    const l = this.y - e.y;
    this.x = a * r - l * n + e.x;
    this.y = a * n + l * r + e.y;
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
  }
}
class Matrix3 {
  constructor(e, t, r, n, a, l, c, u, f) {
    Matrix3.prototype.isMatrix3 = true;
    this.elements = [1, 0, 0, 0, 1, 0, 0, 0, 1];
    if (e !== undefined) {
      this.set(e, t, r, n, a, l, c, u, f);
    }
  }
  set(e, t, r, n, a, l, c, u, f) {
    const p = this.elements;
    p[0] = e;
    p[1] = n;
    p[2] = c;
    p[3] = t;
    p[4] = a;
    p[5] = u;
    p[6] = r;
    p[7] = l;
    p[8] = f;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 1, 0, 0, 0, 1);
    return this;
  }
  copy(e) {
    const t = this.elements;
    const r = e.elements;
    t[0] = r[0];
    t[1] = r[1];
    t[2] = r[2];
    t[3] = r[3];
    t[4] = r[4];
    t[5] = r[5];
    t[6] = r[6];
    t[7] = r[7];
    t[8] = r[8];
    return this;
  }
  extractBasis(e, t, r) {
    e.setFromMatrix3Column(this, 0);
    t.setFromMatrix3Column(this, 1);
    r.setFromMatrix3Column(this, 2);
    return this;
  }
  setFromMatrix4(e) {
    const t = e.elements;
    this.set(t[0], t[4], t[8], t[1], t[5], t[9], t[2], t[6], t[10]);
    return this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const r = e.elements;
    const n = t.elements;
    const a = this.elements;
    const l = r[0];
    const c = r[3];
    const u = r[6];
    const f = r[1];
    const p = r[4];
    const g = r[7];
    const v = r[2];
    const _ = r[5];
    const T = r[8];
    const M = n[0];
    const S = n[3];
    const b = n[6];
    const C = n[1];
    const w = n[4];
    const R = n[7];
    const E = n[2];
    const I = n[5];
    const F = n[8];
    a[0] = l * M + c * C + u * E;
    a[3] = l * S + c * w + u * I;
    a[6] = l * b + c * R + u * F;
    a[1] = f * M + p * C + g * E;
    a[4] = f * S + p * w + g * I;
    a[7] = f * b + p * R + g * F;
    a[2] = v * M + _ * C + T * E;
    a[5] = v * S + _ * w + T * I;
    a[8] = v * b + _ * R + T * F;
    return this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    t[0] *= e;
    t[3] *= e;
    t[6] *= e;
    t[1] *= e;
    t[4] *= e;
    t[7] *= e;
    t[2] *= e;
    t[5] *= e;
    t[8] *= e;
    return this;
  }
  determinant() {
    const e = this.elements;
    const t = e[0];
    const r = e[1];
    const n = e[2];
    const a = e[3];
    const l = e[4];
    const c = e[5];
    const u = e[6];
    const f = e[7];
    const p = e[8];
    return t * l * p - t * c * f - r * a * p + r * c * u + n * a * f - n * l * u;
  }
  invert() {
    const e = this.elements;
    const t = e[0];
    const r = e[1];
    const n = e[2];
    const a = e[3];
    const l = e[4];
    const c = e[5];
    const u = e[6];
    const f = e[7];
    const p = e[8];
    const g = p * l - c * f;
    const v = c * u - p * a;
    const _ = f * a - l * u;
    const T = t * g + r * v + n * _;
    if (T === 0) {
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    const M = 1 / T;
    e[0] = g * M;
    e[1] = (n * f - p * r) * M;
    e[2] = (c * r - n * l) * M;
    e[3] = v * M;
    e[4] = (p * t - n * u) * M;
    e[5] = (n * a - c * t) * M;
    e[6] = _ * M;
    e[7] = (r * u - f * t) * M;
    e[8] = (l * t - r * a) * M;
    return this;
  }
  transpose() {
    let e;
    const t = this.elements;
    e = t[1];
    t[1] = t[3];
    t[3] = e;
    e = t[2];
    t[2] = t[6];
    t[6] = e;
    e = t[5];
    t[5] = t[7];
    t[7] = e;
    return this;
  }
  getNormalMatrix(e) {
    return this.setFromMatrix4(e).invert().transpose();
  }
  transposeIntoArray(e) {
    const t = this.elements;
    e[0] = t[0];
    e[1] = t[3];
    e[2] = t[6];
    e[3] = t[1];
    e[4] = t[4];
    e[5] = t[7];
    e[6] = t[2];
    e[7] = t[5];
    e[8] = t[8];
    return this;
  }
  setUvTransform(e, t, r, n, a, l, c) {
    const u = Math.cos(a);
    const f = Math.sin(a);
    this.set(r * u, r * f, -r * (u * l + f * c) + l + e, -n * f, n * u, -n * (-f * l + u * c) + c + t, 0, 0, 1);
    return this;
  }
  scale(e, t) {
    this.premultiply(_m3.makeScale(e, t));
    return this;
  }
  rotate(e) {
    this.premultiply(_m3.makeRotation(-e));
    return this;
  }
  translate(e, t) {
    this.premultiply(_m3.makeTranslation(e, t));
    return this;
  }
  makeTranslation(e, t) {
    if (e.isVector2) {
      this.set(1, 0, e.x, 0, 1, e.y, 0, 0, 1);
    } else {
      this.set(1, 0, e, 0, 1, t, 0, 0, 1);
    }
    return this;
  }
  makeRotation(e) {
    const t = Math.cos(e);
    const r = Math.sin(e);
    this.set(t, -r, 0, r, t, 0, 0, 0, 1);
    return this;
  }
  makeScale(e, t) {
    this.set(e, 0, 0, 0, t, 0, 0, 0, 1);
    return this;
  }
  equals(e) {
    const t = this.elements;
    const r = e.elements;
    for (let n = 0; n < 9; n++) {
      if (t[n] !== r[n]) {
        return false;
      }
    }
    return true;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 9; r++) {
      this.elements[r] = e[r + t];
    }
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.elements;
    e[t] = r[0];
    e[t + 1] = r[1];
    e[t + 2] = r[2];
    e[t + 3] = r[3];
    e[t + 4] = r[4];
    e[t + 5] = r[5];
    e[t + 6] = r[6];
    e[t + 7] = r[7];
    e[t + 8] = r[8];
    return e;
  }
  clone() {
    return new this.constructor().fromArray(this.elements);
  }
}
const _m3 = new Matrix3();
function arrayNeedsUint32(o) {
  for (let e = o.length - 1; e >= 0; --e) {
    if (o[e] >= 65535) {
      return true;
    }
  }
  return false;
}
function createElementNS(o) {
  return document.createElementNS("http://www.w3.org/1999/xhtml", o);
}
function createCanvasElement() {
  const o = createElementNS("canvas");
  o.style.display = "block";
  return o;
}
const _cache = {};
function warnOnce(o) {
  if (!(o in _cache)) {
    _cache[o] = true;
    console.warn(o);
  }
}
const LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = new Matrix3().set(0.8224621, 0.177538, 0, 0.0331941, 0.9668058, 0, 0.0170827, 0.0723974, 0.9105199);
const LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = new Matrix3().set(1.2249401, -0.2249404, 0, -0.0420569, 1.0420571, 0, -0.0196376, -0.0786361, 1.0982735);
const COLOR_SPACES = {
  [LinearSRGBColorSpace]: {
    transfer: LinearTransfer,
    primaries: Rec709Primaries,
    toReference: o => o,
    fromReference: o => o
  },
  [SRGBColorSpace]: {
    transfer: SRGBTransfer,
    primaries: Rec709Primaries,
    toReference: o => o.convertSRGBToLinear(),
    fromReference: o => o.convertLinearToSRGB()
  },
  [LinearDisplayP3ColorSpace]: {
    transfer: LinearTransfer,
    primaries: P3Primaries,
    toReference: o => o.applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),
    fromReference: o => o.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3)
  },
  [DisplayP3ColorSpace]: {
    transfer: SRGBTransfer,
    primaries: P3Primaries,
    toReference: o => o.convertSRGBToLinear().applyMatrix3(LINEAR_DISPLAY_P3_TO_LINEAR_SRGB),
    fromReference: o => o.applyMatrix3(LINEAR_SRGB_TO_LINEAR_DISPLAY_P3).convertLinearToSRGB()
  }
};
const SUPPORTED_WORKING_COLOR_SPACES = new Set([LinearSRGBColorSpace, LinearDisplayP3ColorSpace]);
const ColorManagement = {
  enabled: true,
  _workingColorSpace: LinearSRGBColorSpace,
  get legacyMode() {
    console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.");
    return !this.enabled;
  },
  set legacyMode(o) {
    console.warn("THREE.ColorManagement: .legacyMode=false renamed to .enabled=true in r150.");
    this.enabled = !o;
  },
  get workingColorSpace() {
    return this._workingColorSpace;
  },
  set workingColorSpace(o) {
    if (!SUPPORTED_WORKING_COLOR_SPACES.has(o)) {
      throw new Error(`Unsupported working color space, "${o}".`);
    }
    this._workingColorSpace = o;
  },
  convert: function (o, e, t) {
    if (this.enabled === false || e === t || !e || !t) {
      return o;
    }
    const r = COLOR_SPACES[e].toReference;
    const n = COLOR_SPACES[t].fromReference;
    return n(r(o));
  },
  fromWorkingColorSpace: function (o, e) {
    return this.convert(o, this._workingColorSpace, e);
  },
  toWorkingColorSpace: function (o, e) {
    return this.convert(o, e, this._workingColorSpace);
  },
  getPrimaries: function (o) {
    return COLOR_SPACES[o].primaries;
  },
  getTransfer: function (o) {
    if (o === NoColorSpace) {
      return LinearTransfer;
    } else {
      return COLOR_SPACES[o].transfer;
    }
  }
};
function SRGBToLinear(o) {
  if (o < 0.04045) {
    return o * 0.0773993808;
  } else {
    return Math.pow(o * 0.9478672986 + 0.0521327014, 2.4);
  }
}
function LinearToSRGB(o) {
  if (o < 0.0031308) {
    return o * 12.92;
  } else {
    return Math.pow(o, 0.41666) * 1.055 - 0.055;
  }
}
let _canvas;
class ImageUtils {
  static getDataURL(e) {
    if (/^data:/i.test(e.src) || typeof HTMLCanvasElement === "undefined") {
      return e.src;
    }
    let t;
    if (e instanceof HTMLCanvasElement) {
      t = e;
    } else {
      if (_canvas === undefined) {
        _canvas = createElementNS("canvas");
      }
      _canvas.width = e.width;
      _canvas.height = e.height;
      const r = _canvas.getContext("2d");
      if (e instanceof ImageData) {
        r.putImageData(e, 0, 0);
      } else {
        r.drawImage(e, 0, 0, e.width, e.height);
      }
      t = _canvas;
    }
    if (t.width > 2048 || t.height > 2048) {
      console.warn("THREE.ImageUtils.getDataURL: Image converted to jpg for performance reasons", e);
      return t.toDataURL("image/jpeg", 0.6);
    } else {
      return t.toDataURL("image/png");
    }
  }
  static sRGBToLinear(e) {
    if (typeof HTMLImageElement !== "undefined" && e instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && e instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && e instanceof ImageBitmap) {
      const t = createElementNS("canvas");
      t.width = e.width;
      t.height = e.height;
      const r = t.getContext("2d");
      r.drawImage(e, 0, 0, e.width, e.height);
      const n = r.getImageData(0, 0, e.width, e.height);
      const a = n.data;
      for (let l = 0; l < a.length; l++) {
        a[l] = SRGBToLinear(a[l] / 255) * 255;
      }
      r.putImageData(n, 0, 0);
      return t;
    } else if (e.data) {
      const t = e.data.slice(0);
      for (let r = 0; r < t.length; r++) {
        if (t instanceof Uint8Array || t instanceof Uint8ClampedArray) {
          t[r] = Math.floor(SRGBToLinear(t[r] / 255) * 255);
        } else {
          t[r] = SRGBToLinear(t[r]);
        }
      }
      return {
        data: t,
        width: e.width,
        height: e.height
      };
    } else {
      console.warn("THREE.ImageUtils.sRGBToLinear(): Unsupported image type. No color space conversion applied.");
      return e;
    }
  }
}
let _sourceId = 0;
class Source {
  constructor(e = null) {
    this.isSource = true;
    Object.defineProperty(this, "id", {
      value: _sourceId++
    });
    this.uuid = generateUUID();
    this.data = e;
    this.version = 0;
  }
  set needsUpdate(e) {
    if (e === true) {
      this.version++;
    }
  }
  toJSON(e) {
    const t = e === undefined || typeof e == "string";
    if (!t && e.images[this.uuid] !== undefined) {
      return e.images[this.uuid];
    }
    const r = {
      uuid: this.uuid,
      url: ""
    };
    const n = this.data;
    if (n !== null) {
      let a;
      if (Array.isArray(n)) {
        a = [];
        for (let l = 0, c = n.length; l < c; l++) {
          if (n[l].isDataTexture) {
            a.push(serializeImage(n[l].image));
          } else {
            a.push(serializeImage(n[l]));
          }
        }
      } else {
        a = serializeImage(n);
      }
      r.url = a;
    }
    if (!t) {
      e.images[this.uuid] = r;
    }
    return r;
  }
}
function serializeImage(o) {
  if (typeof HTMLImageElement !== "undefined" && o instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && o instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && o instanceof ImageBitmap) {
    return ImageUtils.getDataURL(o);
  } else if (o.data) {
    return {
      data: Array.from(o.data),
      width: o.width,
      height: o.height,
      type: o.data.constructor.name
    };
  } else {
    console.warn("THREE.Texture: Unable to serialize Texture.");
    return {};
  }
}
let _textureId = 0;
class Texture extends EventDispatcher {
  constructor(e = Texture.DEFAULT_IMAGE, t = Texture.DEFAULT_MAPPING, r = ClampToEdgeWrapping, n = ClampToEdgeWrapping, a = LinearFilter, l = LinearMipmapLinearFilter, c = RGBAFormat, u = UnsignedByteType, f = Texture.DEFAULT_ANISOTROPY, p = NoColorSpace) {
    super();
    this.isTexture = true;
    Object.defineProperty(this, "id", {
      value: _textureId++
    });
    this.uuid = generateUUID();
    this.name = "";
    this.source = new Source(e);
    this.mipmaps = [];
    this.mapping = t;
    this.channel = 0;
    this.wrapS = r;
    this.wrapT = n;
    this.magFilter = a;
    this.minFilter = l;
    this.anisotropy = f;
    this.format = c;
    this.internalFormat = null;
    this.type = u;
    this.offset = new Vector2(0, 0);
    this.repeat = new Vector2(1, 1);
    this.center = new Vector2(0, 0);
    this.rotation = 0;
    this.matrixAutoUpdate = true;
    this.matrix = new Matrix3();
    this.generateMipmaps = true;
    this.premultiplyAlpha = false;
    this.flipY = true;
    this.unpackAlignment = 4;
    if (typeof p == "string") {
      this.colorSpace = p;
    } else {
      warnOnce("THREE.Texture: Property .encoding has been replaced by .colorSpace.");
      this.colorSpace = p === sRGBEncoding ? SRGBColorSpace : NoColorSpace;
    }
    this.userData = {};
    this.version = 0;
    this.onUpdate = null;
    this.isRenderTargetTexture = false;
    this.needsPMREMUpdate = false;
  }
  get image() {
    return this.source.data;
  }
  set image(e = null) {
    this.source.data = e;
  }
  updateMatrix() {
    this.matrix.setUvTransform(this.offset.x, this.offset.y, this.repeat.x, this.repeat.y, this.rotation, this.center.x, this.center.y);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name;
    this.source = e.source;
    this.mipmaps = e.mipmaps.slice(0);
    this.mapping = e.mapping;
    this.channel = e.channel;
    this.wrapS = e.wrapS;
    this.wrapT = e.wrapT;
    this.magFilter = e.magFilter;
    this.minFilter = e.minFilter;
    this.anisotropy = e.anisotropy;
    this.format = e.format;
    this.internalFormat = e.internalFormat;
    this.type = e.type;
    this.offset.copy(e.offset);
    this.repeat.copy(e.repeat);
    this.center.copy(e.center);
    this.rotation = e.rotation;
    this.matrixAutoUpdate = e.matrixAutoUpdate;
    this.matrix.copy(e.matrix);
    this.generateMipmaps = e.generateMipmaps;
    this.premultiplyAlpha = e.premultiplyAlpha;
    this.flipY = e.flipY;
    this.unpackAlignment = e.unpackAlignment;
    this.colorSpace = e.colorSpace;
    this.userData = JSON.parse(JSON.stringify(e.userData));
    this.needsUpdate = true;
    return this;
  }
  toJSON(e) {
    const t = e === undefined || typeof e == "string";
    if (!t && e.textures[this.uuid] !== undefined) {
      return e.textures[this.uuid];
    }
    const r = {
      metadata: {
        version: 4.6,
        type: "Texture",
        generator: "Texture.toJSON"
      },
      uuid: this.uuid,
      name: this.name,
      image: this.source.toJSON(e).uuid,
      mapping: this.mapping,
      channel: this.channel,
      repeat: [this.repeat.x, this.repeat.y],
      offset: [this.offset.x, this.offset.y],
      center: [this.center.x, this.center.y],
      rotation: this.rotation,
      wrap: [this.wrapS, this.wrapT],
      format: this.format,
      internalFormat: this.internalFormat,
      type: this.type,
      colorSpace: this.colorSpace,
      minFilter: this.minFilter,
      magFilter: this.magFilter,
      anisotropy: this.anisotropy,
      flipY: this.flipY,
      generateMipmaps: this.generateMipmaps,
      premultiplyAlpha: this.premultiplyAlpha,
      unpackAlignment: this.unpackAlignment
    };
    if (Object.keys(this.userData).length > 0) {
      r.userData = this.userData;
    }
    if (!t) {
      e.textures[this.uuid] = r;
    }
    return r;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  transformUv(e) {
    if (this.mapping !== UVMapping) {
      return e;
    }
    e.applyMatrix3(this.matrix);
    if (e.x < 0 || e.x > 1) {
      switch (this.wrapS) {
        case RepeatWrapping:
          e.x = e.x - Math.floor(e.x);
          break;
        case ClampToEdgeWrapping:
          e.x = e.x < 0 ? 0 : 1;
          break;
        case MirroredRepeatWrapping:
          if (Math.abs(Math.floor(e.x) % 2) === 1) {
            e.x = Math.ceil(e.x) - e.x;
          } else {
            e.x = e.x - Math.floor(e.x);
          }
          break;
      }
    }
    if (e.y < 0 || e.y > 1) {
      switch (this.wrapT) {
        case RepeatWrapping:
          e.y = e.y - Math.floor(e.y);
          break;
        case ClampToEdgeWrapping:
          e.y = e.y < 0 ? 0 : 1;
          break;
        case MirroredRepeatWrapping:
          if (Math.abs(Math.floor(e.y) % 2) === 1) {
            e.y = Math.ceil(e.y) - e.y;
          } else {
            e.y = e.y - Math.floor(e.y);
          }
          break;
      }
    }
    if (this.flipY) {
      e.y = 1 - e.y;
    }
    return e;
  }
  set needsUpdate(e) {
    if (e === true) {
      this.version++;
      this.source.needsUpdate = true;
    }
  }
  get encoding() {
    warnOnce("THREE.Texture: Property .encoding has been replaced by .colorSpace.");
    if (this.colorSpace === SRGBColorSpace) {
      return sRGBEncoding;
    } else {
      return LinearEncoding;
    }
  }
  set encoding(e) {
    warnOnce("THREE.Texture: Property .encoding has been replaced by .colorSpace.");
    this.colorSpace = e === sRGBEncoding ? SRGBColorSpace : NoColorSpace;
  }
}
Texture.DEFAULT_IMAGE = null;
Texture.DEFAULT_MAPPING = UVMapping;
Texture.DEFAULT_ANISOTROPY = 1;
class Vector4 {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    Vector4.prototype.isVector4 = true;
    this.x = e;
    this.y = t;
    this.z = r;
    this.w = n;
  }
  get width() {
    return this.z;
  }
  set width(e) {
    this.z = e;
  }
  get height() {
    return this.w;
  }
  set height(e) {
    this.w = e;
  }
  set(e, t, r, n) {
    this.x = e;
    this.y = t;
    this.z = r;
    this.w = n;
    return this;
  }
  setScalar(e) {
    this.x = e;
    this.y = e;
    this.z = e;
    this.w = e;
    return this;
  }
  setX(e) {
    this.x = e;
    return this;
  }
  setY(e) {
    this.y = e;
    return this;
  }
  setZ(e) {
    this.z = e;
    return this;
  }
  setW(e) {
    this.w = e;
    return this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      case 3:
        this.w = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      case 3:
        return this.w;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z, this.w);
  }
  copy(e) {
    this.x = e.x;
    this.y = e.y;
    this.z = e.z;
    this.w = e.w !== undefined ? e.w : 1;
    return this;
  }
  add(e) {
    this.x += e.x;
    this.y += e.y;
    this.z += e.z;
    this.w += e.w;
    return this;
  }
  addScalar(e) {
    this.x += e;
    this.y += e;
    this.z += e;
    this.w += e;
    return this;
  }
  addVectors(e, t) {
    this.x = e.x + t.x;
    this.y = e.y + t.y;
    this.z = e.z + t.z;
    this.w = e.w + t.w;
    return this;
  }
  addScaledVector(e, t) {
    this.x += e.x * t;
    this.y += e.y * t;
    this.z += e.z * t;
    this.w += e.w * t;
    return this;
  }
  sub(e) {
    this.x -= e.x;
    this.y -= e.y;
    this.z -= e.z;
    this.w -= e.w;
    return this;
  }
  subScalar(e) {
    this.x -= e;
    this.y -= e;
    this.z -= e;
    this.w -= e;
    return this;
  }
  subVectors(e, t) {
    this.x = e.x - t.x;
    this.y = e.y - t.y;
    this.z = e.z - t.z;
    this.w = e.w - t.w;
    return this;
  }
  multiply(e) {
    this.x *= e.x;
    this.y *= e.y;
    this.z *= e.z;
    this.w *= e.w;
    return this;
  }
  multiplyScalar(e) {
    this.x *= e;
    this.y *= e;
    this.z *= e;
    this.w *= e;
    return this;
  }
  applyMatrix4(e) {
    const t = this.x;
    const r = this.y;
    const n = this.z;
    const a = this.w;
    const l = e.elements;
    this.x = l[0] * t + l[4] * r + l[8] * n + l[12] * a;
    this.y = l[1] * t + l[5] * r + l[9] * n + l[13] * a;
    this.z = l[2] * t + l[6] * r + l[10] * n + l[14] * a;
    this.w = l[3] * t + l[7] * r + l[11] * n + l[15] * a;
    return this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  setAxisAngleFromQuaternion(e) {
    this.w = Math.acos(e.w) * 2;
    const t = Math.sqrt(1 - e.w * e.w);
    if (t < 0.0001) {
      this.x = 1;
      this.y = 0;
      this.z = 0;
    } else {
      this.x = e.x / t;
      this.y = e.y / t;
      this.z = e.z / t;
    }
    return this;
  }
  setAxisAngleFromRotationMatrix(e) {
    let t;
    let r;
    let n;
    let a;
    const u = e.elements;
    const f = u[0];
    const p = u[4];
    const g = u[8];
    const v = u[1];
    const _ = u[5];
    const T = u[9];
    const M = u[2];
    const S = u[6];
    const b = u[10];
    if (Math.abs(p - v) < 0.01 && Math.abs(g - M) < 0.01 && Math.abs(T - S) < 0.01) {
      if (Math.abs(p + v) < 0.1 && Math.abs(g + M) < 0.1 && Math.abs(T + S) < 0.1 && Math.abs(f + _ + b - 3) < 0.1) {
        this.set(1, 0, 0, 0);
        return this;
      }
      t = Math.PI;
      const w = (f + 1) / 2;
      const R = (_ + 1) / 2;
      const E = (b + 1) / 2;
      const I = (p + v) / 4;
      const F = (g + M) / 4;
      const k = (T + S) / 4;
      if (w > R && w > E) {
        if (w < 0.01) {
          r = 0;
          n = 0.707106781;
          a = 0.707106781;
        } else {
          r = Math.sqrt(w);
          n = I / r;
          a = F / r;
        }
      } else if (R > E) {
        if (R < 0.01) {
          r = 0.707106781;
          n = 0;
          a = 0.707106781;
        } else {
          n = Math.sqrt(R);
          r = I / n;
          a = k / n;
        }
      } else if (E < 0.01) {
        r = 0.707106781;
        n = 0.707106781;
        a = 0;
      } else {
        a = Math.sqrt(E);
        r = F / a;
        n = k / a;
      }
      this.set(r, n, a, t);
      return this;
    }
    let C = Math.sqrt((S - T) * (S - T) + (g - M) * (g - M) + (v - p) * (v - p));
    if (Math.abs(C) < 0.001) {
      C = 1;
    }
    this.x = (S - T) / C;
    this.y = (g - M) / C;
    this.z = (v - p) / C;
    this.w = Math.acos((f + _ + b - 1) / 2);
    return this;
  }
  min(e) {
    this.x = Math.min(this.x, e.x);
    this.y = Math.min(this.y, e.y);
    this.z = Math.min(this.z, e.z);
    this.w = Math.min(this.w, e.w);
    return this;
  }
  max(e) {
    this.x = Math.max(this.x, e.x);
    this.y = Math.max(this.y, e.y);
    this.z = Math.max(this.z, e.z);
    this.w = Math.max(this.w, e.w);
    return this;
  }
  clamp(e, t) {
    this.x = Math.max(e.x, Math.min(t.x, this.x));
    this.y = Math.max(e.y, Math.min(t.y, this.y));
    this.z = Math.max(e.z, Math.min(t.z, this.z));
    this.w = Math.max(e.w, Math.min(t.w, this.w));
    return this;
  }
  clampScalar(e, t) {
    this.x = Math.max(e, Math.min(t, this.x));
    this.y = Math.max(e, Math.min(t, this.y));
    this.z = Math.max(e, Math.min(t, this.z));
    this.w = Math.max(e, Math.min(t, this.w));
    return this;
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    this.w = Math.floor(this.w);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    this.w = Math.ceil(this.w);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    this.w = Math.round(this.w);
    return this;
  }
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    this.z = Math.trunc(this.z);
    this.w = Math.trunc(this.w);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    this.w = -this.w;
    return this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z + this.w * e.w;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z + this.w * this.w);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z) + Math.abs(this.w);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    this.x += (e.x - this.x) * t;
    this.y += (e.y - this.y) * t;
    this.z += (e.z - this.z) * t;
    this.w += (e.w - this.w) * t;
    return this;
  }
  lerpVectors(e, t, r) {
    this.x = e.x + (t.x - e.x) * r;
    this.y = e.y + (t.y - e.y) * r;
    this.z = e.z + (t.z - e.z) * r;
    this.w = e.w + (t.w - e.w) * r;
    return this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z && e.w === this.w;
  }
  fromArray(e, t = 0) {
    this.x = e[t];
    this.y = e[t + 1];
    this.z = e[t + 2];
    this.w = e[t + 3];
    return this;
  }
  toArray(e = [], t = 0) {
    e[t] = this.x;
    e[t + 1] = this.y;
    e[t + 2] = this.z;
    e[t + 3] = this.w;
    return e;
  }
  fromBufferAttribute(e, t) {
    this.x = e.getX(t);
    this.y = e.getY(t);
    this.z = e.getZ(t);
    this.w = e.getW(t);
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    this.w = Math.random();
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
    yield this.w;
  }
}
class RenderTarget extends EventDispatcher {
  constructor(e = 1, t = 1, r = {}) {
    super();
    this.isRenderTarget = true;
    this.width = e;
    this.height = t;
    this.depth = 1;
    this.scissor = new Vector4(0, 0, e, t);
    this.scissorTest = false;
    this.viewport = new Vector4(0, 0, e, t);
    const n = {
      width: e,
      height: t,
      depth: 1
    };
    if (r.encoding !== undefined) {
      warnOnce("THREE.WebGLRenderTarget: option.encoding has been replaced by option.colorSpace.");
      r.colorSpace = r.encoding === sRGBEncoding ? SRGBColorSpace : NoColorSpace;
    }
    r = Object.assign({
      generateMipmaps: false,
      internalFormat: null,
      minFilter: LinearFilter,
      depthBuffer: true,
      stencilBuffer: false,
      depthTexture: null,
      samples: 0
    }, r);
    this.texture = new Texture(n, r.mapping, r.wrapS, r.wrapT, r.magFilter, r.minFilter, r.format, r.type, r.anisotropy, r.colorSpace);
    this.texture.isRenderTargetTexture = true;
    this.texture.flipY = false;
    this.texture.generateMipmaps = r.generateMipmaps;
    this.texture.internalFormat = r.internalFormat;
    this.depthBuffer = r.depthBuffer;
    this.stencilBuffer = r.stencilBuffer;
    this.depthTexture = r.depthTexture;
    this.samples = r.samples;
  }
  setSize(e, t, r = 1) {
    if (this.width !== e || this.height !== t || this.depth !== r) {
      this.width = e;
      this.height = t;
      this.depth = r;
      this.texture.image.width = e;
      this.texture.image.height = t;
      this.texture.image.depth = r;
      this.dispose();
    }
    this.viewport.set(0, 0, e, t);
    this.scissor.set(0, 0, e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.width = e.width;
    this.height = e.height;
    this.depth = e.depth;
    this.scissor.copy(e.scissor);
    this.scissorTest = e.scissorTest;
    this.viewport.copy(e.viewport);
    this.texture = e.texture.clone();
    this.texture.isRenderTargetTexture = true;
    const t = Object.assign({}, e.texture.image);
    this.texture.source = new Source(t);
    this.depthBuffer = e.depthBuffer;
    this.stencilBuffer = e.stencilBuffer;
    if (e.depthTexture !== null) {
      this.depthTexture = e.depthTexture.clone();
    }
    this.samples = e.samples;
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
class WebGLRenderTarget extends RenderTarget {
  constructor(e = 1, t = 1, r = {}) {
    super(e, t, r);
    this.isWebGLRenderTarget = true;
  }
}
class DataArrayTexture extends Texture {
  constructor(e = null, t = 1, r = 1, n = 1) {
    super(null);
    this.isDataArrayTexture = true;
    this.image = {
      data: e,
      width: t,
      height: r,
      depth: n
    };
    this.magFilter = NearestFilter;
    this.minFilter = NearestFilter;
    this.wrapR = ClampToEdgeWrapping;
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
  }
}
class Data3DTexture extends Texture {
  constructor(e = null, t = 1, r = 1, n = 1) {
    super(null);
    this.isData3DTexture = true;
    this.image = {
      data: e,
      width: t,
      height: r,
      depth: n
    };
    this.magFilter = NearestFilter;
    this.minFilter = NearestFilter;
    this.wrapR = ClampToEdgeWrapping;
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
  }
}
class Quaternion {
  constructor(e = 0, t = 0, r = 0, n = 1) {
    this.isQuaternion = true;
    this._x = e;
    this._y = t;
    this._z = r;
    this._w = n;
  }
  static slerpFlat(e, t, r, n, a, l, c) {
    let u = r[n + 0];
    let f = r[n + 1];
    let p = r[n + 2];
    let g = r[n + 3];
    const v = a[l + 0];
    const _ = a[l + 1];
    const T = a[l + 2];
    const M = a[l + 3];
    if (c === 0) {
      e[t + 0] = u;
      e[t + 1] = f;
      e[t + 2] = p;
      e[t + 3] = g;
      return;
    }
    if (c === 1) {
      e[t + 0] = v;
      e[t + 1] = _;
      e[t + 2] = T;
      e[t + 3] = M;
      return;
    }
    if (g !== M || u !== v || f !== _ || p !== T) {
      let S = 1 - c;
      const b = u * v + f * _ + p * T + g * M;
      const C = b >= 0 ? 1 : -1;
      const w = 1 - b * b;
      if (w > Number.EPSILON) {
        const E = Math.sqrt(w);
        const I = Math.atan2(E, b * C);
        S = Math.sin(S * I) / E;
        c = Math.sin(c * I) / E;
      }
      const R = c * C;
      u = u * S + v * R;
      f = f * S + _ * R;
      p = p * S + T * R;
      g = g * S + M * R;
      if (S === 1 - c) {
        const E = 1 / Math.sqrt(u * u + f * f + p * p + g * g);
        u *= E;
        f *= E;
        p *= E;
        g *= E;
      }
    }
    e[t] = u;
    e[t + 1] = f;
    e[t + 2] = p;
    e[t + 3] = g;
  }
  static multiplyQuaternionsFlat(e, t, r, n, a, l) {
    const c = r[n];
    const u = r[n + 1];
    const f = r[n + 2];
    const p = r[n + 3];
    const g = a[l];
    const v = a[l + 1];
    const _ = a[l + 2];
    const T = a[l + 3];
    e[t] = c * T + p * g + u * _ - f * v;
    e[t + 1] = u * T + p * v + f * g - c * _;
    e[t + 2] = f * T + p * _ + c * v - u * g;
    e[t + 3] = p * T - c * g - u * v - f * _;
    return e;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e;
    this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e;
    this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e;
    this._onChangeCallback();
  }
  get w() {
    return this._w;
  }
  set w(e) {
    this._w = e;
    this._onChangeCallback();
  }
  set(e, t, r, n) {
    this._x = e;
    this._y = t;
    this._z = r;
    this._w = n;
    this._onChangeCallback();
    return this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._w);
  }
  copy(e) {
    this._x = e.x;
    this._y = e.y;
    this._z = e.z;
    this._w = e.w;
    this._onChangeCallback();
    return this;
  }
  setFromEuler(e, t) {
    const r = e._x;
    const n = e._y;
    const a = e._z;
    const l = e._order;
    const c = Math.cos;
    const u = Math.sin;
    const f = c(r / 2);
    const p = c(n / 2);
    const g = c(a / 2);
    const v = u(r / 2);
    const _ = u(n / 2);
    const T = u(a / 2);
    switch (l) {
      case "XYZ":
        this._x = v * p * g + f * _ * T;
        this._y = f * _ * g - v * p * T;
        this._z = f * p * T + v * _ * g;
        this._w = f * p * g - v * _ * T;
        break;
      case "YXZ":
        this._x = v * p * g + f * _ * T;
        this._y = f * _ * g - v * p * T;
        this._z = f * p * T - v * _ * g;
        this._w = f * p * g + v * _ * T;
        break;
      case "ZXY":
        this._x = v * p * g - f * _ * T;
        this._y = f * _ * g + v * p * T;
        this._z = f * p * T + v * _ * g;
        this._w = f * p * g - v * _ * T;
        break;
      case "ZYX":
        this._x = v * p * g - f * _ * T;
        this._y = f * _ * g + v * p * T;
        this._z = f * p * T - v * _ * g;
        this._w = f * p * g + v * _ * T;
        break;
      case "YZX":
        this._x = v * p * g + f * _ * T;
        this._y = f * _ * g + v * p * T;
        this._z = f * p * T - v * _ * g;
        this._w = f * p * g - v * _ * T;
        break;
      case "XZY":
        this._x = v * p * g - f * _ * T;
        this._y = f * _ * g - v * p * T;
        this._z = f * p * T + v * _ * g;
        this._w = f * p * g + v * _ * T;
        break;
      default:
        console.warn("THREE.Quaternion: .setFromEuler() encountered an unknown order: " + l);
    }
    if (t !== false) {
      this._onChangeCallback();
    }
    return this;
  }
  setFromAxisAngle(e, t) {
    const r = t / 2;
    const n = Math.sin(r);
    this._x = e.x * n;
    this._y = e.y * n;
    this._z = e.z * n;
    this._w = Math.cos(r);
    this._onChangeCallback();
    return this;
  }
  setFromRotationMatrix(e) {
    const t = e.elements;
    const r = t[0];
    const n = t[4];
    const a = t[8];
    const l = t[1];
    const c = t[5];
    const u = t[9];
    const f = t[2];
    const p = t[6];
    const g = t[10];
    const v = r + c + g;
    if (v > 0) {
      const _ = 0.5 / Math.sqrt(v + 1);
      this._w = 0.25 / _;
      this._x = (p - u) * _;
      this._y = (a - f) * _;
      this._z = (l - n) * _;
    } else if (r > c && r > g) {
      const _ = Math.sqrt(1 + r - c - g) * 2;
      this._w = (p - u) / _;
      this._x = _ * 0.25;
      this._y = (n + l) / _;
      this._z = (a + f) / _;
    } else if (c > g) {
      const _ = Math.sqrt(1 + c - r - g) * 2;
      this._w = (a - f) / _;
      this._x = (n + l) / _;
      this._y = _ * 0.25;
      this._z = (u + p) / _;
    } else {
      const _ = Math.sqrt(1 + g - r - c) * 2;
      this._w = (l - n) / _;
      this._x = (a + f) / _;
      this._y = (u + p) / _;
      this._z = _ * 0.25;
    }
    this._onChangeCallback();
    return this;
  }
  setFromUnitVectors(e, t) {
    let r = e.dot(t) + 1;
    if (r < Number.EPSILON) {
      r = 0;
      if (Math.abs(e.x) > Math.abs(e.z)) {
        this._x = -e.y;
        this._y = e.x;
        this._z = 0;
        this._w = r;
      } else {
        this._x = 0;
        this._y = -e.z;
        this._z = e.y;
        this._w = r;
      }
    } else {
      this._x = e.y * t.z - e.z * t.y;
      this._y = e.z * t.x - e.x * t.z;
      this._z = e.x * t.y - e.y * t.x;
      this._w = r;
    }
    return this.normalize();
  }
  angleTo(e) {
    return Math.acos(Math.abs(clamp$1(this.dot(e), -1, 1))) * 2;
  }
  rotateTowards(e, t) {
    const r = this.angleTo(e);
    if (r === 0) {
      return this;
    }
    const n = Math.min(1, t / r);
    this.slerp(e, n);
    return this;
  }
  identity() {
    return this.set(0, 0, 0, 1);
  }
  invert() {
    return this.conjugate();
  }
  conjugate() {
    this._x *= -1;
    this._y *= -1;
    this._z *= -1;
    this._onChangeCallback();
    return this;
  }
  dot(e) {
    return this._x * e._x + this._y * e._y + this._z * e._z + this._w * e._w;
  }
  lengthSq() {
    return this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w;
  }
  length() {
    return Math.sqrt(this._x * this._x + this._y * this._y + this._z * this._z + this._w * this._w);
  }
  normalize() {
    let e = this.length();
    if (e === 0) {
      this._x = 0;
      this._y = 0;
      this._z = 0;
      this._w = 1;
    } else {
      e = 1 / e;
      this._x = this._x * e;
      this._y = this._y * e;
      this._z = this._z * e;
      this._w = this._w * e;
    }
    this._onChangeCallback();
    return this;
  }
  multiply(e) {
    return this.multiplyQuaternions(this, e);
  }
  premultiply(e) {
    return this.multiplyQuaternions(e, this);
  }
  multiplyQuaternions(e, t) {
    const r = e._x;
    const n = e._y;
    const a = e._z;
    const l = e._w;
    const c = t._x;
    const u = t._y;
    const f = t._z;
    const p = t._w;
    this._x = r * p + l * c + n * f - a * u;
    this._y = n * p + l * u + a * c - r * f;
    this._z = a * p + l * f + r * u - n * c;
    this._w = l * p - r * c - n * u - a * f;
    this._onChangeCallback();
    return this;
  }
  slerp(e, t) {
    if (t === 0) {
      return this;
    }
    if (t === 1) {
      return this.copy(e);
    }
    const r = this._x;
    const n = this._y;
    const a = this._z;
    const l = this._w;
    let c = l * e._w + r * e._x + n * e._y + a * e._z;
    if (c < 0) {
      this._w = -e._w;
      this._x = -e._x;
      this._y = -e._y;
      this._z = -e._z;
      c = -c;
    } else {
      this.copy(e);
    }
    if (c >= 1) {
      this._w = l;
      this._x = r;
      this._y = n;
      this._z = a;
      return this;
    }
    const u = 1 - c * c;
    if (u <= Number.EPSILON) {
      const _ = 1 - t;
      this._w = _ * l + t * this._w;
      this._x = _ * r + t * this._x;
      this._y = _ * n + t * this._y;
      this._z = _ * a + t * this._z;
      this.normalize();
      this._onChangeCallback();
      return this;
    }
    const f = Math.sqrt(u);
    const p = Math.atan2(f, c);
    const g = Math.sin((1 - t) * p) / f;
    const v = Math.sin(t * p) / f;
    this._w = l * g + this._w * v;
    this._x = r * g + this._x * v;
    this._y = n * g + this._y * v;
    this._z = a * g + this._z * v;
    this._onChangeCallback();
    return this;
  }
  slerpQuaternions(e, t, r) {
    return this.copy(e).slerp(t, r);
  }
  random() {
    const e = Math.random();
    const t = Math.sqrt(1 - e);
    const r = Math.sqrt(e);
    const n = Math.PI * 2 * Math.random();
    const a = Math.PI * 2 * Math.random();
    return this.set(t * Math.cos(n), r * Math.sin(a), r * Math.cos(a), t * Math.sin(n));
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._w === this._w;
  }
  fromArray(e, t = 0) {
    this._x = e[t];
    this._y = e[t + 1];
    this._z = e[t + 2];
    this._w = e[t + 3];
    this._onChangeCallback();
    return this;
  }
  toArray(e = [], t = 0) {
    e[t] = this._x;
    e[t + 1] = this._y;
    e[t + 2] = this._z;
    e[t + 3] = this._w;
    return e;
  }
  fromBufferAttribute(e, t) {
    this._x = e.getX(t);
    this._y = e.getY(t);
    this._z = e.getZ(t);
    this._w = e.getW(t);
    return this;
  }
  toJSON() {
    return this.toArray();
  }
  _onChange(e) {
    this._onChangeCallback = e;
    return this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._w;
  }
}
class Vector3 {
  constructor(e = 0, t = 0, r = 0) {
    Vector3.prototype.isVector3 = true;
    this.x = e;
    this.y = t;
    this.z = r;
  }
  set(e, t, r = this.z) {
    this.x = e;
    this.y = t;
    this.z = r;
    return this;
  }
  setScalar(e) {
    this.x = e;
    this.y = e;
    this.z = e;
    return this;
  }
  setX(e) {
    this.x = e;
    return this;
  }
  setY(e) {
    this.y = e;
    return this;
  }
  setZ(e) {
    this.z = e;
    return this;
  }
  setComponent(e, t) {
    switch (e) {
      case 0:
        this.x = t;
        break;
      case 1:
        this.y = t;
        break;
      case 2:
        this.z = t;
        break;
      default:
        throw new Error("index is out of range: " + e);
    }
    return this;
  }
  getComponent(e) {
    switch (e) {
      case 0:
        return this.x;
      case 1:
        return this.y;
      case 2:
        return this.z;
      default:
        throw new Error("index is out of range: " + e);
    }
  }
  clone() {
    return new this.constructor(this.x, this.y, this.z);
  }
  copy(e) {
    this.x = e.x;
    this.y = e.y;
    this.z = e.z;
    return this;
  }
  add(e) {
    this.x += e.x;
    this.y += e.y;
    this.z += e.z;
    return this;
  }
  addScalar(e) {
    this.x += e;
    this.y += e;
    this.z += e;
    return this;
  }
  addVectors(e, t) {
    this.x = e.x + t.x;
    this.y = e.y + t.y;
    this.z = e.z + t.z;
    return this;
  }
  addScaledVector(e, t) {
    this.x += e.x * t;
    this.y += e.y * t;
    this.z += e.z * t;
    return this;
  }
  sub(e) {
    this.x -= e.x;
    this.y -= e.y;
    this.z -= e.z;
    return this;
  }
  subScalar(e) {
    this.x -= e;
    this.y -= e;
    this.z -= e;
    return this;
  }
  subVectors(e, t) {
    this.x = e.x - t.x;
    this.y = e.y - t.y;
    this.z = e.z - t.z;
    return this;
  }
  multiply(e) {
    this.x *= e.x;
    this.y *= e.y;
    this.z *= e.z;
    return this;
  }
  multiplyScalar(e) {
    this.x *= e;
    this.y *= e;
    this.z *= e;
    return this;
  }
  multiplyVectors(e, t) {
    this.x = e.x * t.x;
    this.y = e.y * t.y;
    this.z = e.z * t.z;
    return this;
  }
  applyEuler(e) {
    return this.applyQuaternion(_quaternion$4.setFromEuler(e));
  }
  applyAxisAngle(e, t) {
    return this.applyQuaternion(_quaternion$4.setFromAxisAngle(e, t));
  }
  applyMatrix3(e) {
    const t = this.x;
    const r = this.y;
    const n = this.z;
    const a = e.elements;
    this.x = a[0] * t + a[3] * r + a[6] * n;
    this.y = a[1] * t + a[4] * r + a[7] * n;
    this.z = a[2] * t + a[5] * r + a[8] * n;
    return this;
  }
  applyNormalMatrix(e) {
    return this.applyMatrix3(e).normalize();
  }
  applyMatrix4(e) {
    const t = this.x;
    const r = this.y;
    const n = this.z;
    const a = e.elements;
    const l = 1 / (a[3] * t + a[7] * r + a[11] * n + a[15]);
    this.x = (a[0] * t + a[4] * r + a[8] * n + a[12]) * l;
    this.y = (a[1] * t + a[5] * r + a[9] * n + a[13]) * l;
    this.z = (a[2] * t + a[6] * r + a[10] * n + a[14]) * l;
    return this;
  }
  applyQuaternion(e) {
    const t = this.x;
    const r = this.y;
    const n = this.z;
    const a = e.x;
    const l = e.y;
    const c = e.z;
    const u = e.w;
    const f = (l * n - c * r) * 2;
    const p = (c * t - a * n) * 2;
    const g = (a * r - l * t) * 2;
    this.x = t + u * f + l * g - c * p;
    this.y = r + u * p + c * f - a * g;
    this.z = n + u * g + a * p - l * f;
    return this;
  }
  project(e) {
    return this.applyMatrix4(e.matrixWorldInverse).applyMatrix4(e.projectionMatrix);
  }
  unproject(e) {
    return this.applyMatrix4(e.projectionMatrixInverse).applyMatrix4(e.matrixWorld);
  }
  transformDirection(e) {
    const t = this.x;
    const r = this.y;
    const n = this.z;
    const a = e.elements;
    this.x = a[0] * t + a[4] * r + a[8] * n;
    this.y = a[1] * t + a[5] * r + a[9] * n;
    this.z = a[2] * t + a[6] * r + a[10] * n;
    return this.normalize();
  }
  divide(e) {
    this.x /= e.x;
    this.y /= e.y;
    this.z /= e.z;
    return this;
  }
  divideScalar(e) {
    return this.multiplyScalar(1 / e);
  }
  min(e) {
    this.x = Math.min(this.x, e.x);
    this.y = Math.min(this.y, e.y);
    this.z = Math.min(this.z, e.z);
    return this;
  }
  max(e) {
    this.x = Math.max(this.x, e.x);
    this.y = Math.max(this.y, e.y);
    this.z = Math.max(this.z, e.z);
    return this;
  }
  clamp(e, t) {
    this.x = Math.max(e.x, Math.min(t.x, this.x));
    this.y = Math.max(e.y, Math.min(t.y, this.y));
    this.z = Math.max(e.z, Math.min(t.z, this.z));
    return this;
  }
  clampScalar(e, t) {
    this.x = Math.max(e, Math.min(t, this.x));
    this.y = Math.max(e, Math.min(t, this.y));
    this.z = Math.max(e, Math.min(t, this.z));
    return this;
  }
  clampLength(e, t) {
    const r = this.length();
    return this.divideScalar(r || 1).multiplyScalar(Math.max(e, Math.min(t, r)));
  }
  floor() {
    this.x = Math.floor(this.x);
    this.y = Math.floor(this.y);
    this.z = Math.floor(this.z);
    return this;
  }
  ceil() {
    this.x = Math.ceil(this.x);
    this.y = Math.ceil(this.y);
    this.z = Math.ceil(this.z);
    return this;
  }
  round() {
    this.x = Math.round(this.x);
    this.y = Math.round(this.y);
    this.z = Math.round(this.z);
    return this;
  }
  roundToZero() {
    this.x = Math.trunc(this.x);
    this.y = Math.trunc(this.y);
    this.z = Math.trunc(this.z);
    return this;
  }
  negate() {
    this.x = -this.x;
    this.y = -this.y;
    this.z = -this.z;
    return this;
  }
  dot(e) {
    return this.x * e.x + this.y * e.y + this.z * e.z;
  }
  lengthSq() {
    return this.x * this.x + this.y * this.y + this.z * this.z;
  }
  length() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }
  manhattanLength() {
    return Math.abs(this.x) + Math.abs(this.y) + Math.abs(this.z);
  }
  normalize() {
    return this.divideScalar(this.length() || 1);
  }
  setLength(e) {
    return this.normalize().multiplyScalar(e);
  }
  lerp(e, t) {
    this.x += (e.x - this.x) * t;
    this.y += (e.y - this.y) * t;
    this.z += (e.z - this.z) * t;
    return this;
  }
  lerpVectors(e, t, r) {
    this.x = e.x + (t.x - e.x) * r;
    this.y = e.y + (t.y - e.y) * r;
    this.z = e.z + (t.z - e.z) * r;
    return this;
  }
  cross(e) {
    return this.crossVectors(this, e);
  }
  crossVectors(e, t) {
    const r = e.x;
    const n = e.y;
    const a = e.z;
    const l = t.x;
    const c = t.y;
    const u = t.z;
    this.x = n * u - a * c;
    this.y = a * l - r * u;
    this.z = r * c - n * l;
    return this;
  }
  projectOnVector(e) {
    const t = e.lengthSq();
    if (t === 0) {
      return this.set(0, 0, 0);
    }
    const r = e.dot(this) / t;
    return this.copy(e).multiplyScalar(r);
  }
  projectOnPlane(e) {
    _vector$b.copy(this).projectOnVector(e);
    return this.sub(_vector$b);
  }
  reflect(e) {
    return this.sub(_vector$b.copy(e).multiplyScalar(this.dot(e) * 2));
  }
  angleTo(e) {
    const t = Math.sqrt(this.lengthSq() * e.lengthSq());
    if (t === 0) {
      return Math.PI / 2;
    }
    const r = this.dot(e) / t;
    return Math.acos(clamp$1(r, -1, 1));
  }
  distanceTo(e) {
    return Math.sqrt(this.distanceToSquared(e));
  }
  distanceToSquared(e) {
    const t = this.x - e.x;
    const r = this.y - e.y;
    const n = this.z - e.z;
    return t * t + r * r + n * n;
  }
  manhattanDistanceTo(e) {
    return Math.abs(this.x - e.x) + Math.abs(this.y - e.y) + Math.abs(this.z - e.z);
  }
  setFromSpherical(e) {
    return this.setFromSphericalCoords(e.radius, e.phi, e.theta);
  }
  setFromSphericalCoords(e, t, r) {
    const n = Math.sin(t) * e;
    this.x = n * Math.sin(r);
    this.y = Math.cos(t) * e;
    this.z = n * Math.cos(r);
    return this;
  }
  setFromCylindrical(e) {
    return this.setFromCylindricalCoords(e.radius, e.theta, e.y);
  }
  setFromCylindricalCoords(e, t, r) {
    this.x = e * Math.sin(t);
    this.y = r;
    this.z = e * Math.cos(t);
    return this;
  }
  setFromMatrixPosition(e) {
    const t = e.elements;
    this.x = t[12];
    this.y = t[13];
    this.z = t[14];
    return this;
  }
  setFromMatrixScale(e) {
    const t = this.setFromMatrixColumn(e, 0).length();
    const r = this.setFromMatrixColumn(e, 1).length();
    const n = this.setFromMatrixColumn(e, 2).length();
    this.x = t;
    this.y = r;
    this.z = n;
    return this;
  }
  setFromMatrixColumn(e, t) {
    return this.fromArray(e.elements, t * 4);
  }
  setFromMatrix3Column(e, t) {
    return this.fromArray(e.elements, t * 3);
  }
  setFromEuler(e) {
    this.x = e._x;
    this.y = e._y;
    this.z = e._z;
    return this;
  }
  setFromColor(e) {
    this.x = e.r;
    this.y = e.g;
    this.z = e.b;
    return this;
  }
  equals(e) {
    return e.x === this.x && e.y === this.y && e.z === this.z;
  }
  fromArray(e, t = 0) {
    this.x = e[t];
    this.y = e[t + 1];
    this.z = e[t + 2];
    return this;
  }
  toArray(e = [], t = 0) {
    e[t] = this.x;
    e[t + 1] = this.y;
    e[t + 2] = this.z;
    return e;
  }
  fromBufferAttribute(e, t) {
    this.x = e.getX(t);
    this.y = e.getY(t);
    this.z = e.getZ(t);
    return this;
  }
  random() {
    this.x = Math.random();
    this.y = Math.random();
    this.z = Math.random();
    return this;
  }
  randomDirection() {
    const e = (Math.random() - 0.5) * 2;
    const t = Math.random() * Math.PI * 2;
    const r = Math.sqrt(1 - e ** 2);
    this.x = r * Math.cos(t);
    this.y = r * Math.sin(t);
    this.z = e;
    return this;
  }
  *[Symbol.iterator]() {
    yield this.x;
    yield this.y;
    yield this.z;
  }
}
const _vector$b = new Vector3();
const _quaternion$4 = new Quaternion();
class Box3 {
  constructor(e = new Vector3(Infinity, Infinity, Infinity), t = new Vector3(-Infinity, -Infinity, -Infinity)) {
    this.isBox3 = true;
    this.min = e;
    this.max = t;
  }
  set(e, t) {
    this.min.copy(e);
    this.max.copy(t);
    return this;
  }
  setFromArray(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t += 3) {
      this.expandByPoint(_vector$a.fromArray(e, t));
    }
    return this;
  }
  setFromBufferAttribute(e) {
    this.makeEmpty();
    for (let t = 0, r = e.count; t < r; t++) {
      this.expandByPoint(_vector$a.fromBufferAttribute(e, t));
    }
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t++) {
      this.expandByPoint(e[t]);
    }
    return this;
  }
  setFromCenterAndSize(e, t) {
    const r = _vector$a.copy(t).multiplyScalar(0.5);
    this.min.copy(e).sub(r);
    this.max.copy(e).add(r);
    return this;
  }
  setFromObject(e, t = false) {
    this.makeEmpty();
    return this.expandByObject(e, t);
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.min.copy(e.min);
    this.max.copy(e.max);
    return this;
  }
  makeEmpty() {
    this.min.x = this.min.y = this.min.z = Infinity;
    this.max.x = this.max.y = this.max.z = -Infinity;
    return this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y || this.max.z < this.min.z;
  }
  getCenter(e) {
    if (this.isEmpty()) {
      return e.set(0, 0, 0);
    } else {
      return e.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
  }
  getSize(e) {
    if (this.isEmpty()) {
      return e.set(0, 0, 0);
    } else {
      return e.subVectors(this.max, this.min);
    }
  }
  expandByPoint(e) {
    this.min.min(e);
    this.max.max(e);
    return this;
  }
  expandByVector(e) {
    this.min.sub(e);
    this.max.add(e);
    return this;
  }
  expandByScalar(e) {
    this.min.addScalar(-e);
    this.max.addScalar(e);
    return this;
  }
  expandByObject(e, t = false) {
    e.updateWorldMatrix(false, false);
    const r = e.geometry;
    if (r !== undefined) {
      const a = r.getAttribute("position");
      if (t === true && a !== undefined && e.isInstancedMesh !== true) {
        for (let l = 0, c = a.count; l < c; l++) {
          if (e.isMesh === true) {
            e.getVertexPosition(l, _vector$a);
          } else {
            _vector$a.fromBufferAttribute(a, l);
          }
          _vector$a.applyMatrix4(e.matrixWorld);
          this.expandByPoint(_vector$a);
        }
      } else {
        if (e.boundingBox !== undefined) {
          if (e.boundingBox === null) {
            e.computeBoundingBox();
          }
          _box$3.copy(e.boundingBox);
        } else {
          if (r.boundingBox === null) {
            r.computeBoundingBox();
          }
          _box$3.copy(r.boundingBox);
        }
        _box$3.applyMatrix4(e.matrixWorld);
        this.union(_box$3);
      }
    }
    const n = e.children;
    for (let a = 0, l = n.length; a < l; a++) {
      this.expandByObject(n[a], t);
    }
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x) && !(e.x > this.max.x) && !(e.y < this.min.y) && !(e.y > this.max.y) && !(e.z < this.min.z) && !(e.z > this.max.z);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y && this.min.z <= e.min.z && e.max.z <= this.max.z;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y), (e.z - this.min.z) / (this.max.z - this.min.z));
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x) && !(e.min.x > this.max.x) && !(e.max.y < this.min.y) && !(e.min.y > this.max.y) && !(e.max.z < this.min.z) && !(e.min.z > this.max.z);
  }
  intersectsSphere(e) {
    this.clampPoint(e.center, _vector$a);
    return _vector$a.distanceToSquared(e.center) <= e.radius * e.radius;
  }
  intersectsPlane(e) {
    let t;
    let r;
    if (e.normal.x > 0) {
      t = e.normal.x * this.min.x;
      r = e.normal.x * this.max.x;
    } else {
      t = e.normal.x * this.max.x;
      r = e.normal.x * this.min.x;
    }
    if (e.normal.y > 0) {
      t += e.normal.y * this.min.y;
      r += e.normal.y * this.max.y;
    } else {
      t += e.normal.y * this.max.y;
      r += e.normal.y * this.min.y;
    }
    if (e.normal.z > 0) {
      t += e.normal.z * this.min.z;
      r += e.normal.z * this.max.z;
    } else {
      t += e.normal.z * this.max.z;
      r += e.normal.z * this.min.z;
    }
    return t <= -e.constant && r >= -e.constant;
  }
  intersectsTriangle(e) {
    if (this.isEmpty()) {
      return false;
    }
    this.getCenter(_center);
    _extents.subVectors(this.max, _center);
    _v0$2$1.subVectors(e.a, _center);
    _v1$7.subVectors(e.b, _center);
    _v2$4.subVectors(e.c, _center);
    _f0.subVectors(_v1$7, _v0$2$1);
    _f1.subVectors(_v2$4, _v1$7);
    _f2.subVectors(_v0$2$1, _v2$4);
    let t = [0, -_f0.z, _f0.y, 0, -_f1.z, _f1.y, 0, -_f2.z, _f2.y, _f0.z, 0, -_f0.x, _f1.z, 0, -_f1.x, _f2.z, 0, -_f2.x, -_f0.y, _f0.x, 0, -_f1.y, _f1.x, 0, -_f2.y, _f2.x, 0];
    if (!satForAxes(t, _v0$2$1, _v1$7, _v2$4, _extents) || (t = [1, 0, 0, 0, 1, 0, 0, 0, 1], !satForAxes(t, _v0$2$1, _v1$7, _v2$4, _extents))) {
      return false;
    } else {
      _triangleNormal.crossVectors(_f0, _f1);
      t = [_triangleNormal.x, _triangleNormal.y, _triangleNormal.z];
      return satForAxes(t, _v0$2$1, _v1$7, _v2$4, _extents);
    }
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, _vector$a).distanceTo(e);
  }
  getBoundingSphere(e) {
    if (this.isEmpty()) {
      e.makeEmpty();
    } else {
      this.getCenter(e.center);
      e.radius = this.getSize(_vector$a).length() * 0.5;
    }
    return e;
  }
  intersect(e) {
    this.min.max(e.min);
    this.max.min(e.max);
    if (this.isEmpty()) {
      this.makeEmpty();
    }
    return this;
  }
  union(e) {
    this.min.min(e.min);
    this.max.max(e.max);
    return this;
  }
  applyMatrix4(e) {
    if (this.isEmpty()) {
      return this;
    } else {
      _points[0].set(this.min.x, this.min.y, this.min.z).applyMatrix4(e);
      _points[1].set(this.min.x, this.min.y, this.max.z).applyMatrix4(e);
      _points[2].set(this.min.x, this.max.y, this.min.z).applyMatrix4(e);
      _points[3].set(this.min.x, this.max.y, this.max.z).applyMatrix4(e);
      _points[4].set(this.max.x, this.min.y, this.min.z).applyMatrix4(e);
      _points[5].set(this.max.x, this.min.y, this.max.z).applyMatrix4(e);
      _points[6].set(this.max.x, this.max.y, this.min.z).applyMatrix4(e);
      _points[7].set(this.max.x, this.max.y, this.max.z).applyMatrix4(e);
      this.setFromPoints(_points);
      return this;
    }
  }
  translate(e) {
    this.min.add(e);
    this.max.add(e);
    return this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
const _points = [new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3(), new Vector3()];
const _vector$a = new Vector3();
const _box$3 = new Box3();
const _v0$2$1 = new Vector3();
const _v1$7 = new Vector3();
const _v2$4 = new Vector3();
const _f0 = new Vector3();
const _f1 = new Vector3();
const _f2 = new Vector3();
const _center = new Vector3();
const _extents = new Vector3();
const _triangleNormal = new Vector3();
const _testAxis = new Vector3();
function satForAxes(o, e, t, r, n) {
  for (let a = 0, l = o.length - 3; a <= l; a += 3) {
    _testAxis.fromArray(o, a);
    const c = n.x * Math.abs(_testAxis.x) + n.y * Math.abs(_testAxis.y) + n.z * Math.abs(_testAxis.z);
    const u = e.dot(_testAxis);
    const f = t.dot(_testAxis);
    const p = r.dot(_testAxis);
    if (Math.max(-Math.max(u, f, p), Math.min(u, f, p)) > c) {
      return false;
    }
  }
  return true;
}
const _box$2 = new Box3();
const _v1$6$1 = new Vector3();
const _v2$3 = new Vector3();
class Sphere {
  constructor(e = new Vector3(), t = -1) {
    this.center = e;
    this.radius = t;
  }
  set(e, t) {
    this.center.copy(e);
    this.radius = t;
    return this;
  }
  setFromPoints(e, t) {
    const r = this.center;
    if (t !== undefined) {
      r.copy(t);
    } else {
      _box$2.setFromPoints(e).getCenter(r);
    }
    let n = 0;
    for (let a = 0, l = e.length; a < l; a++) {
      n = Math.max(n, r.distanceToSquared(e[a]));
    }
    this.radius = Math.sqrt(n);
    return this;
  }
  copy(e) {
    this.center.copy(e.center);
    this.radius = e.radius;
    return this;
  }
  isEmpty() {
    return this.radius < 0;
  }
  makeEmpty() {
    this.center.set(0, 0, 0);
    this.radius = -1;
    return this;
  }
  containsPoint(e) {
    return e.distanceToSquared(this.center) <= this.radius * this.radius;
  }
  distanceToPoint(e) {
    return e.distanceTo(this.center) - this.radius;
  }
  intersectsSphere(e) {
    const t = this.radius + e.radius;
    return e.center.distanceToSquared(this.center) <= t * t;
  }
  intersectsBox(e) {
    return e.intersectsSphere(this);
  }
  intersectsPlane(e) {
    return Math.abs(e.distanceToPoint(this.center)) <= this.radius;
  }
  clampPoint(e, t) {
    const r = this.center.distanceToSquared(e);
    t.copy(e);
    if (r > this.radius * this.radius) {
      t.sub(this.center).normalize();
      t.multiplyScalar(this.radius).add(this.center);
    }
    return t;
  }
  getBoundingBox(e) {
    if (this.isEmpty()) {
      e.makeEmpty();
      return e;
    } else {
      e.set(this.center, this.center);
      e.expandByScalar(this.radius);
      return e;
    }
  }
  applyMatrix4(e) {
    this.center.applyMatrix4(e);
    this.radius = this.radius * e.getMaxScaleOnAxis();
    return this;
  }
  translate(e) {
    this.center.add(e);
    return this;
  }
  expandByPoint(e) {
    if (this.isEmpty()) {
      this.center.copy(e);
      this.radius = 0;
      return this;
    }
    _v1$6$1.subVectors(e, this.center);
    const t = _v1$6$1.lengthSq();
    if (t > this.radius * this.radius) {
      const r = Math.sqrt(t);
      const n = (r - this.radius) * 0.5;
      this.center.addScaledVector(_v1$6$1, n / r);
      this.radius += n;
    }
    return this;
  }
  union(e) {
    if (e.isEmpty()) {
      return this;
    } else if (this.isEmpty()) {
      this.copy(e);
      return this;
    } else {
      if (this.center.equals(e.center) === true) {
        this.radius = Math.max(this.radius, e.radius);
      } else {
        _v2$3.subVectors(e.center, this.center).setLength(e.radius);
        this.expandByPoint(_v1$6$1.copy(e.center).add(_v2$3));
        this.expandByPoint(_v1$6$1.copy(e.center).sub(_v2$3));
      }
      return this;
    }
  }
  equals(e) {
    return e.center.equals(this.center) && e.radius === this.radius;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _vector$9 = new Vector3();
const _segCenter = new Vector3();
const _segDir = new Vector3();
const _diff = new Vector3();
const _edge1 = new Vector3();
const _edge2 = new Vector3();
const _normal$1 = new Vector3();
class Ray {
  constructor(e = new Vector3(), t = new Vector3(0, 0, -1)) {
    this.origin = e;
    this.direction = t;
  }
  set(e, t) {
    this.origin.copy(e);
    this.direction.copy(t);
    return this;
  }
  copy(e) {
    this.origin.copy(e.origin);
    this.direction.copy(e.direction);
    return this;
  }
  at(e, t) {
    return t.copy(this.origin).addScaledVector(this.direction, e);
  }
  lookAt(e) {
    this.direction.copy(e).sub(this.origin).normalize();
    return this;
  }
  recast(e) {
    this.origin.copy(this.at(e, _vector$9));
    return this;
  }
  closestPointToPoint(e, t) {
    t.subVectors(e, this.origin);
    const r = t.dot(this.direction);
    if (r < 0) {
      return t.copy(this.origin);
    } else {
      return t.copy(this.origin).addScaledVector(this.direction, r);
    }
  }
  distanceToPoint(e) {
    return Math.sqrt(this.distanceSqToPoint(e));
  }
  distanceSqToPoint(e) {
    const t = _vector$9.subVectors(e, this.origin).dot(this.direction);
    if (t < 0) {
      return this.origin.distanceToSquared(e);
    } else {
      _vector$9.copy(this.origin).addScaledVector(this.direction, t);
      return _vector$9.distanceToSquared(e);
    }
  }
  distanceSqToSegment(e, t, r, n) {
    _segCenter.copy(e).add(t).multiplyScalar(0.5);
    _segDir.copy(t).sub(e).normalize();
    _diff.copy(this.origin).sub(_segCenter);
    const a = e.distanceTo(t) * 0.5;
    const l = -this.direction.dot(_segDir);
    const c = _diff.dot(this.direction);
    const u = -_diff.dot(_segDir);
    const f = _diff.lengthSq();
    const p = Math.abs(1 - l * l);
    let g;
    let v;
    let _;
    let T;
    if (p > 0) {
      g = l * u - c;
      v = l * c - u;
      T = a * p;
      if (g >= 0) {
        if (v >= -T) {
          if (v <= T) {
            const M = 1 / p;
            g *= M;
            v *= M;
            _ = g * (g + l * v + c * 2) + v * (l * g + v + u * 2) + f;
          } else {
            v = a;
            g = Math.max(0, -(l * v + c));
            _ = -g * g + v * (v + u * 2) + f;
          }
        } else {
          v = -a;
          g = Math.max(0, -(l * v + c));
          _ = -g * g + v * (v + u * 2) + f;
        }
      } else if (v <= -T) {
        g = Math.max(0, -(-l * a + c));
        v = g > 0 ? -a : Math.min(Math.max(-a, -u), a);
        _ = -g * g + v * (v + u * 2) + f;
      } else if (v <= T) {
        g = 0;
        v = Math.min(Math.max(-a, -u), a);
        _ = v * (v + u * 2) + f;
      } else {
        g = Math.max(0, -(l * a + c));
        v = g > 0 ? a : Math.min(Math.max(-a, -u), a);
        _ = -g * g + v * (v + u * 2) + f;
      }
    } else {
      v = l > 0 ? -a : a;
      g = Math.max(0, -(l * v + c));
      _ = -g * g + v * (v + u * 2) + f;
    }
    if (r) {
      r.copy(this.origin).addScaledVector(this.direction, g);
    }
    if (n) {
      n.copy(_segCenter).addScaledVector(_segDir, v);
    }
    return _;
  }
  intersectSphere(e, t) {
    _vector$9.subVectors(e.center, this.origin);
    const r = _vector$9.dot(this.direction);
    const n = _vector$9.dot(_vector$9) - r * r;
    const a = e.radius * e.radius;
    if (n > a) {
      return null;
    }
    const l = Math.sqrt(a - n);
    const c = r - l;
    const u = r + l;
    if (u < 0) {
      return null;
    } else if (c < 0) {
      return this.at(u, t);
    } else {
      return this.at(c, t);
    }
  }
  intersectsSphere(e) {
    return this.distanceSqToPoint(e.center) <= e.radius * e.radius;
  }
  distanceToPlane(e) {
    const t = e.normal.dot(this.direction);
    if (t === 0) {
      if (e.distanceToPoint(this.origin) === 0) {
        return 0;
      } else {
        return null;
      }
    }
    const r = -(this.origin.dot(e.normal) + e.constant) / t;
    if (r >= 0) {
      return r;
    } else {
      return null;
    }
  }
  intersectPlane(e, t) {
    const r = this.distanceToPlane(e);
    if (r === null) {
      return null;
    } else {
      return this.at(r, t);
    }
  }
  intersectsPlane(e) {
    const t = e.distanceToPoint(this.origin);
    return t === 0 || e.normal.dot(this.direction) * t < 0;
  }
  intersectBox(e, t) {
    let r;
    let n;
    let a;
    let l;
    let c;
    let u;
    const f = 1 / this.direction.x;
    const p = 1 / this.direction.y;
    const g = 1 / this.direction.z;
    const v = this.origin;
    if (f >= 0) {
      r = (e.min.x - v.x) * f;
      n = (e.max.x - v.x) * f;
    } else {
      r = (e.max.x - v.x) * f;
      n = (e.min.x - v.x) * f;
    }
    if (p >= 0) {
      a = (e.min.y - v.y) * p;
      l = (e.max.y - v.y) * p;
    } else {
      a = (e.max.y - v.y) * p;
      l = (e.min.y - v.y) * p;
    }
    if (r > l || a > n || ((a > r || isNaN(r)) && (r = a), (l < n || isNaN(n)) && (n = l), g >= 0 ? (c = (e.min.z - v.z) * g, u = (e.max.z - v.z) * g) : (c = (e.max.z - v.z) * g, u = (e.min.z - v.z) * g), r > u || c > n) || ((c > r || r !== r) && (r = c), (u < n || n !== n) && (n = u), n < 0)) {
      return null;
    } else {
      return this.at(r >= 0 ? r : n, t);
    }
  }
  intersectsBox(e) {
    return this.intersectBox(e, _vector$9) !== null;
  }
  intersectTriangle(e, t, r, n, a) {
    _edge1.subVectors(t, e);
    _edge2.subVectors(r, e);
    _normal$1.crossVectors(_edge1, _edge2);
    let l = this.direction.dot(_normal$1);
    let c;
    if (l > 0) {
      if (n) {
        return null;
      }
      c = 1;
    } else if (l < 0) {
      c = -1;
      l = -l;
    } else {
      return null;
    }
    _diff.subVectors(this.origin, e);
    const u = c * this.direction.dot(_edge2.crossVectors(_diff, _edge2));
    if (u < 0) {
      return null;
    }
    const f = c * this.direction.dot(_edge1.cross(_diff));
    if (f < 0 || u + f > l) {
      return null;
    }
    const p = -c * _diff.dot(_normal$1);
    if (p < 0) {
      return null;
    } else {
      return this.at(p / l, a);
    }
  }
  applyMatrix4(e) {
    this.origin.applyMatrix4(e);
    this.direction.transformDirection(e);
    return this;
  }
  equals(e) {
    return e.origin.equals(this.origin) && e.direction.equals(this.direction);
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class Matrix4 {
  constructor(e, t, r, n, a, l, c, u, f, p, g, v, _, T, M, S) {
    Matrix4.prototype.isMatrix4 = true;
    this.elements = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    if (e !== undefined) {
      this.set(e, t, r, n, a, l, c, u, f, p, g, v, _, T, M, S);
    }
  }
  set(e, t, r, n, a, l, c, u, f, p, g, v, _, T, M, S) {
    const b = this.elements;
    b[0] = e;
    b[4] = t;
    b[8] = r;
    b[12] = n;
    b[1] = a;
    b[5] = l;
    b[9] = c;
    b[13] = u;
    b[2] = f;
    b[6] = p;
    b[10] = g;
    b[14] = v;
    b[3] = _;
    b[7] = T;
    b[11] = M;
    b[15] = S;
    return this;
  }
  identity() {
    this.set(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  clone() {
    return new Matrix4().fromArray(this.elements);
  }
  copy(e) {
    const t = this.elements;
    const r = e.elements;
    t[0] = r[0];
    t[1] = r[1];
    t[2] = r[2];
    t[3] = r[3];
    t[4] = r[4];
    t[5] = r[5];
    t[6] = r[6];
    t[7] = r[7];
    t[8] = r[8];
    t[9] = r[9];
    t[10] = r[10];
    t[11] = r[11];
    t[12] = r[12];
    t[13] = r[13];
    t[14] = r[14];
    t[15] = r[15];
    return this;
  }
  copyPosition(e) {
    const t = this.elements;
    const r = e.elements;
    t[12] = r[12];
    t[13] = r[13];
    t[14] = r[14];
    return this;
  }
  setFromMatrix3(e) {
    const t = e.elements;
    this.set(t[0], t[3], t[6], 0, t[1], t[4], t[7], 0, t[2], t[5], t[8], 0, 0, 0, 0, 1);
    return this;
  }
  extractBasis(e, t, r) {
    e.setFromMatrixColumn(this, 0);
    t.setFromMatrixColumn(this, 1);
    r.setFromMatrixColumn(this, 2);
    return this;
  }
  makeBasis(e, t, r) {
    this.set(e.x, t.x, r.x, 0, e.y, t.y, r.y, 0, e.z, t.z, r.z, 0, 0, 0, 0, 1);
    return this;
  }
  extractRotation(e) {
    const t = this.elements;
    const r = e.elements;
    const n = 1 / _v1$5$1.setFromMatrixColumn(e, 0).length();
    const a = 1 / _v1$5$1.setFromMatrixColumn(e, 1).length();
    const l = 1 / _v1$5$1.setFromMatrixColumn(e, 2).length();
    t[0] = r[0] * n;
    t[1] = r[1] * n;
    t[2] = r[2] * n;
    t[3] = 0;
    t[4] = r[4] * a;
    t[5] = r[5] * a;
    t[6] = r[6] * a;
    t[7] = 0;
    t[8] = r[8] * l;
    t[9] = r[9] * l;
    t[10] = r[10] * l;
    t[11] = 0;
    t[12] = 0;
    t[13] = 0;
    t[14] = 0;
    t[15] = 1;
    return this;
  }
  makeRotationFromEuler(e) {
    const t = this.elements;
    const r = e.x;
    const n = e.y;
    const a = e.z;
    const l = Math.cos(r);
    const c = Math.sin(r);
    const u = Math.cos(n);
    const f = Math.sin(n);
    const p = Math.cos(a);
    const g = Math.sin(a);
    if (e.order === "XYZ") {
      const v = l * p;
      const _ = l * g;
      const T = c * p;
      const M = c * g;
      t[0] = u * p;
      t[4] = -u * g;
      t[8] = f;
      t[1] = _ + T * f;
      t[5] = v - M * f;
      t[9] = -c * u;
      t[2] = M - v * f;
      t[6] = T + _ * f;
      t[10] = l * u;
    } else if (e.order === "YXZ") {
      const v = u * p;
      const _ = u * g;
      const T = f * p;
      const M = f * g;
      t[0] = v + M * c;
      t[4] = T * c - _;
      t[8] = l * f;
      t[1] = l * g;
      t[5] = l * p;
      t[9] = -c;
      t[2] = _ * c - T;
      t[6] = M + v * c;
      t[10] = l * u;
    } else if (e.order === "ZXY") {
      const v = u * p;
      const _ = u * g;
      const T = f * p;
      const M = f * g;
      t[0] = v - M * c;
      t[4] = -l * g;
      t[8] = T + _ * c;
      t[1] = _ + T * c;
      t[5] = l * p;
      t[9] = M - v * c;
      t[2] = -l * f;
      t[6] = c;
      t[10] = l * u;
    } else if (e.order === "ZYX") {
      const v = l * p;
      const _ = l * g;
      const T = c * p;
      const M = c * g;
      t[0] = u * p;
      t[4] = T * f - _;
      t[8] = v * f + M;
      t[1] = u * g;
      t[5] = M * f + v;
      t[9] = _ * f - T;
      t[2] = -f;
      t[6] = c * u;
      t[10] = l * u;
    } else if (e.order === "YZX") {
      const v = l * u;
      const _ = l * f;
      const T = c * u;
      const M = c * f;
      t[0] = u * p;
      t[4] = M - v * g;
      t[8] = T * g + _;
      t[1] = g;
      t[5] = l * p;
      t[9] = -c * p;
      t[2] = -f * p;
      t[6] = _ * g + T;
      t[10] = v - M * g;
    } else if (e.order === "XZY") {
      const v = l * u;
      const _ = l * f;
      const T = c * u;
      const M = c * f;
      t[0] = u * p;
      t[4] = -g;
      t[8] = f * p;
      t[1] = v * g + M;
      t[5] = l * p;
      t[9] = _ * g - T;
      t[2] = T * g - _;
      t[6] = c * p;
      t[10] = M * g + v;
    }
    t[3] = 0;
    t[7] = 0;
    t[11] = 0;
    t[12] = 0;
    t[13] = 0;
    t[14] = 0;
    t[15] = 1;
    return this;
  }
  makeRotationFromQuaternion(e) {
    return this.compose(_zero, e, _one);
  }
  lookAt(e, t, r) {
    const n = this.elements;
    _z.subVectors(e, t);
    if (_z.lengthSq() === 0) {
      _z.z = 1;
    }
    _z.normalize();
    _x.crossVectors(r, _z);
    if (_x.lengthSq() === 0) {
      if (Math.abs(r.z) === 1) {
        _z.x += 0.0001;
      } else {
        _z.z += 0.0001;
      }
      _z.normalize();
      _x.crossVectors(r, _z);
    }
    _x.normalize();
    _y.crossVectors(_z, _x);
    n[0] = _x.x;
    n[4] = _y.x;
    n[8] = _z.x;
    n[1] = _x.y;
    n[5] = _y.y;
    n[9] = _z.y;
    n[2] = _x.z;
    n[6] = _y.z;
    n[10] = _z.z;
    return this;
  }
  multiply(e) {
    return this.multiplyMatrices(this, e);
  }
  premultiply(e) {
    return this.multiplyMatrices(e, this);
  }
  multiplyMatrices(e, t) {
    const r = e.elements;
    const n = t.elements;
    const a = this.elements;
    const l = r[0];
    const c = r[4];
    const u = r[8];
    const f = r[12];
    const p = r[1];
    const g = r[5];
    const v = r[9];
    const _ = r[13];
    const T = r[2];
    const M = r[6];
    const S = r[10];
    const b = r[14];
    const C = r[3];
    const w = r[7];
    const R = r[11];
    const E = r[15];
    const I = n[0];
    const F = n[4];
    const k = n[8];
    const L = n[12];
    const D = n[1];
    const ne = n[5];
    const re = n[9];
    const ce = n[13];
    const z = n[2];
    const j = n[6];
    const X = n[10];
    const Z = n[14];
    const q = n[3];
    const ue = n[7];
    const oe = n[11];
    const te = n[15];
    a[0] = l * I + c * D + u * z + f * q;
    a[4] = l * F + c * ne + u * j + f * ue;
    a[8] = l * k + c * re + u * X + f * oe;
    a[12] = l * L + c * ce + u * Z + f * te;
    a[1] = p * I + g * D + v * z + _ * q;
    a[5] = p * F + g * ne + v * j + _ * ue;
    a[9] = p * k + g * re + v * X + _ * oe;
    a[13] = p * L + g * ce + v * Z + _ * te;
    a[2] = T * I + M * D + S * z + b * q;
    a[6] = T * F + M * ne + S * j + b * ue;
    a[10] = T * k + M * re + S * X + b * oe;
    a[14] = T * L + M * ce + S * Z + b * te;
    a[3] = C * I + w * D + R * z + E * q;
    a[7] = C * F + w * ne + R * j + E * ue;
    a[11] = C * k + w * re + R * X + E * oe;
    a[15] = C * L + w * ce + R * Z + E * te;
    return this;
  }
  multiplyScalar(e) {
    const t = this.elements;
    t[0] *= e;
    t[4] *= e;
    t[8] *= e;
    t[12] *= e;
    t[1] *= e;
    t[5] *= e;
    t[9] *= e;
    t[13] *= e;
    t[2] *= e;
    t[6] *= e;
    t[10] *= e;
    t[14] *= e;
    t[3] *= e;
    t[7] *= e;
    t[11] *= e;
    t[15] *= e;
    return this;
  }
  determinant() {
    const e = this.elements;
    const t = e[0];
    const r = e[4];
    const n = e[8];
    const a = e[12];
    const l = e[1];
    const c = e[5];
    const u = e[9];
    const f = e[13];
    const p = e[2];
    const g = e[6];
    const v = e[10];
    const _ = e[14];
    const T = e[3];
    const M = e[7];
    const S = e[11];
    const b = e[15];
    return T * (+a * u * g - n * f * g - a * c * v + r * f * v + n * c * _ - r * u * _) + M * (+t * u * _ - t * f * v + a * l * v - n * l * _ + n * f * p - a * u * p) + S * (+t * f * g - t * c * _ - a * l * g + r * l * _ + a * c * p - r * f * p) + b * (-n * c * p - t * u * g + t * c * v + n * l * g - r * l * v + r * u * p);
  }
  transpose() {
    const e = this.elements;
    let t;
    t = e[1];
    e[1] = e[4];
    e[4] = t;
    t = e[2];
    e[2] = e[8];
    e[8] = t;
    t = e[6];
    e[6] = e[9];
    e[9] = t;
    t = e[3];
    e[3] = e[12];
    e[12] = t;
    t = e[7];
    e[7] = e[13];
    e[13] = t;
    t = e[11];
    e[11] = e[14];
    e[14] = t;
    return this;
  }
  setPosition(e, t, r) {
    const n = this.elements;
    if (e.isVector3) {
      n[12] = e.x;
      n[13] = e.y;
      n[14] = e.z;
    } else {
      n[12] = e;
      n[13] = t;
      n[14] = r;
    }
    return this;
  }
  invert() {
    const e = this.elements;
    const t = e[0];
    const r = e[1];
    const n = e[2];
    const a = e[3];
    const l = e[4];
    const c = e[5];
    const u = e[6];
    const f = e[7];
    const p = e[8];
    const g = e[9];
    const v = e[10];
    const _ = e[11];
    const T = e[12];
    const M = e[13];
    const S = e[14];
    const b = e[15];
    const C = g * S * f - M * v * f + M * u * _ - c * S * _ - g * u * b + c * v * b;
    const w = T * v * f - p * S * f - T * u * _ + l * S * _ + p * u * b - l * v * b;
    const R = p * M * f - T * g * f + T * c * _ - l * M * _ - p * c * b + l * g * b;
    const E = T * g * u - p * M * u - T * c * v + l * M * v + p * c * S - l * g * S;
    const I = t * C + r * w + n * R + a * E;
    if (I === 0) {
      return this.set(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
    }
    const F = 1 / I;
    e[0] = C * F;
    e[1] = (M * v * a - g * S * a - M * n * _ + r * S * _ + g * n * b - r * v * b) * F;
    e[2] = (c * S * a - M * u * a + M * n * f - r * S * f - c * n * b + r * u * b) * F;
    e[3] = (g * u * a - c * v * a - g * n * f + r * v * f + c * n * _ - r * u * _) * F;
    e[4] = w * F;
    e[5] = (p * S * a - T * v * a + T * n * _ - t * S * _ - p * n * b + t * v * b) * F;
    e[6] = (T * u * a - l * S * a - T * n * f + t * S * f + l * n * b - t * u * b) * F;
    e[7] = (l * v * a - p * u * a + p * n * f - t * v * f - l * n * _ + t * u * _) * F;
    e[8] = R * F;
    e[9] = (T * g * a - p * M * a - T * r * _ + t * M * _ + p * r * b - t * g * b) * F;
    e[10] = (l * M * a - T * c * a + T * r * f - t * M * f - l * r * b + t * c * b) * F;
    e[11] = (p * c * a - l * g * a - p * r * f + t * g * f + l * r * _ - t * c * _) * F;
    e[12] = E * F;
    e[13] = (p * M * n - T * g * n + T * r * v - t * M * v - p * r * S + t * g * S) * F;
    e[14] = (T * c * n - l * M * n - T * r * u + t * M * u + l * r * S - t * c * S) * F;
    e[15] = (l * g * n - p * c * n + p * r * u - t * g * u - l * r * v + t * c * v) * F;
    return this;
  }
  scale(e) {
    const t = this.elements;
    const r = e.x;
    const n = e.y;
    const a = e.z;
    t[0] *= r;
    t[4] *= n;
    t[8] *= a;
    t[1] *= r;
    t[5] *= n;
    t[9] *= a;
    t[2] *= r;
    t[6] *= n;
    t[10] *= a;
    t[3] *= r;
    t[7] *= n;
    t[11] *= a;
    return this;
  }
  getMaxScaleOnAxis() {
    const e = this.elements;
    const t = e[0] * e[0] + e[1] * e[1] + e[2] * e[2];
    const r = e[4] * e[4] + e[5] * e[5] + e[6] * e[6];
    const n = e[8] * e[8] + e[9] * e[9] + e[10] * e[10];
    return Math.sqrt(Math.max(t, r, n));
  }
  makeTranslation(e, t, r) {
    if (e.isVector3) {
      this.set(1, 0, 0, e.x, 0, 1, 0, e.y, 0, 0, 1, e.z, 0, 0, 0, 1);
    } else {
      this.set(1, 0, 0, e, 0, 1, 0, t, 0, 0, 1, r, 0, 0, 0, 1);
    }
    return this;
  }
  makeRotationX(e) {
    const t = Math.cos(e);
    const r = Math.sin(e);
    this.set(1, 0, 0, 0, 0, t, -r, 0, 0, r, t, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationY(e) {
    const t = Math.cos(e);
    const r = Math.sin(e);
    this.set(t, 0, r, 0, 0, 1, 0, 0, -r, 0, t, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationZ(e) {
    const t = Math.cos(e);
    const r = Math.sin(e);
    this.set(t, -r, 0, 0, r, t, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
    return this;
  }
  makeRotationAxis(e, t) {
    const r = Math.cos(t);
    const n = Math.sin(t);
    const a = 1 - r;
    const l = e.x;
    const c = e.y;
    const u = e.z;
    const f = a * l;
    const p = a * c;
    this.set(f * l + r, f * c - n * u, f * u + n * c, 0, f * c + n * u, p * c + r, p * u - n * l, 0, f * u - n * c, p * u + n * l, a * u * u + r, 0, 0, 0, 0, 1);
    return this;
  }
  makeScale(e, t, r) {
    this.set(e, 0, 0, 0, 0, t, 0, 0, 0, 0, r, 0, 0, 0, 0, 1);
    return this;
  }
  makeShear(e, t, r, n, a, l) {
    this.set(1, r, a, 0, e, 1, l, 0, t, n, 1, 0, 0, 0, 0, 1);
    return this;
  }
  compose(e, t, r) {
    const n = this.elements;
    const a = t._x;
    const l = t._y;
    const c = t._z;
    const u = t._w;
    const f = a + a;
    const p = l + l;
    const g = c + c;
    const v = a * f;
    const _ = a * p;
    const T = a * g;
    const M = l * p;
    const S = l * g;
    const b = c * g;
    const C = u * f;
    const w = u * p;
    const R = u * g;
    const E = r.x;
    const I = r.y;
    const F = r.z;
    n[0] = (1 - (M + b)) * E;
    n[1] = (_ + R) * E;
    n[2] = (T - w) * E;
    n[3] = 0;
    n[4] = (_ - R) * I;
    n[5] = (1 - (v + b)) * I;
    n[6] = (S + C) * I;
    n[7] = 0;
    n[8] = (T + w) * F;
    n[9] = (S - C) * F;
    n[10] = (1 - (v + M)) * F;
    n[11] = 0;
    n[12] = e.x;
    n[13] = e.y;
    n[14] = e.z;
    n[15] = 1;
    return this;
  }
  decompose(e, t, r) {
    const n = this.elements;
    let a = _v1$5$1.set(n[0], n[1], n[2]).length();
    const l = _v1$5$1.set(n[4], n[5], n[6]).length();
    const c = _v1$5$1.set(n[8], n[9], n[10]).length();
    if (this.determinant() < 0) {
      a = -a;
    }
    e.x = n[12];
    e.y = n[13];
    e.z = n[14];
    _m1$2.copy(this);
    const f = 1 / a;
    const p = 1 / l;
    const g = 1 / c;
    _m1$2.elements[0] *= f;
    _m1$2.elements[1] *= f;
    _m1$2.elements[2] *= f;
    _m1$2.elements[4] *= p;
    _m1$2.elements[5] *= p;
    _m1$2.elements[6] *= p;
    _m1$2.elements[8] *= g;
    _m1$2.elements[9] *= g;
    _m1$2.elements[10] *= g;
    t.setFromRotationMatrix(_m1$2);
    r.x = a;
    r.y = l;
    r.z = c;
    return this;
  }
  makePerspective(e, t, r, n, a, l, c = WebGLCoordinateSystem) {
    const u = this.elements;
    const f = a * 2 / (t - e);
    const p = a * 2 / (r - n);
    const g = (t + e) / (t - e);
    const v = (r + n) / (r - n);
    let _;
    let T;
    if (c === WebGLCoordinateSystem) {
      _ = -(l + a) / (l - a);
      T = l * -2 * a / (l - a);
    } else if (c === WebGPUCoordinateSystem) {
      _ = -l / (l - a);
      T = -l * a / (l - a);
    } else {
      throw new Error("THREE.Matrix4.makePerspective(): Invalid coordinate system: " + c);
    }
    u[0] = f;
    u[4] = 0;
    u[8] = g;
    u[12] = 0;
    u[1] = 0;
    u[5] = p;
    u[9] = v;
    u[13] = 0;
    u[2] = 0;
    u[6] = 0;
    u[10] = _;
    u[14] = T;
    u[3] = 0;
    u[7] = 0;
    u[11] = -1;
    u[15] = 0;
    return this;
  }
  makeOrthographic(e, t, r, n, a, l, c = WebGLCoordinateSystem) {
    const u = this.elements;
    const f = 1 / (t - e);
    const p = 1 / (r - n);
    const g = 1 / (l - a);
    const v = (t + e) * f;
    const _ = (r + n) * p;
    let T;
    let M;
    if (c === WebGLCoordinateSystem) {
      T = (l + a) * g;
      M = g * -2;
    } else if (c === WebGPUCoordinateSystem) {
      T = a * g;
      M = g * -1;
    } else {
      throw new Error("THREE.Matrix4.makeOrthographic(): Invalid coordinate system: " + c);
    }
    u[0] = f * 2;
    u[4] = 0;
    u[8] = 0;
    u[12] = -v;
    u[1] = 0;
    u[5] = p * 2;
    u[9] = 0;
    u[13] = -_;
    u[2] = 0;
    u[6] = 0;
    u[10] = M;
    u[14] = -T;
    u[3] = 0;
    u[7] = 0;
    u[11] = 0;
    u[15] = 1;
    return this;
  }
  equals(e) {
    const t = this.elements;
    const r = e.elements;
    for (let n = 0; n < 16; n++) {
      if (t[n] !== r[n]) {
        return false;
      }
    }
    return true;
  }
  fromArray(e, t = 0) {
    for (let r = 0; r < 16; r++) {
      this.elements[r] = e[r + t];
    }
    return this;
  }
  toArray(e = [], t = 0) {
    const r = this.elements;
    e[t] = r[0];
    e[t + 1] = r[1];
    e[t + 2] = r[2];
    e[t + 3] = r[3];
    e[t + 4] = r[4];
    e[t + 5] = r[5];
    e[t + 6] = r[6];
    e[t + 7] = r[7];
    e[t + 8] = r[8];
    e[t + 9] = r[9];
    e[t + 10] = r[10];
    e[t + 11] = r[11];
    e[t + 12] = r[12];
    e[t + 13] = r[13];
    e[t + 14] = r[14];
    e[t + 15] = r[15];
    return e;
  }
}
const _v1$5$1 = new Vector3();
const _m1$2 = new Matrix4();
const _zero = new Vector3(0, 0, 0);
const _one = new Vector3(1, 1, 1);
const _x = new Vector3();
const _y = new Vector3();
const _z = new Vector3();
const _matrix = new Matrix4();
const _quaternion$3 = new Quaternion();
class Euler {
  constructor(e = 0, t = 0, r = 0, n = Euler.DEFAULT_ORDER) {
    this.isEuler = true;
    this._x = e;
    this._y = t;
    this._z = r;
    this._order = n;
  }
  get x() {
    return this._x;
  }
  set x(e) {
    this._x = e;
    this._onChangeCallback();
  }
  get y() {
    return this._y;
  }
  set y(e) {
    this._y = e;
    this._onChangeCallback();
  }
  get z() {
    return this._z;
  }
  set z(e) {
    this._z = e;
    this._onChangeCallback();
  }
  get order() {
    return this._order;
  }
  set order(e) {
    this._order = e;
    this._onChangeCallback();
  }
  set(e, t, r, n = this._order) {
    this._x = e;
    this._y = t;
    this._z = r;
    this._order = n;
    this._onChangeCallback();
    return this;
  }
  clone() {
    return new this.constructor(this._x, this._y, this._z, this._order);
  }
  copy(e) {
    this._x = e._x;
    this._y = e._y;
    this._z = e._z;
    this._order = e._order;
    this._onChangeCallback();
    return this;
  }
  setFromRotationMatrix(e, t = this._order, r = true) {
    const n = e.elements;
    const a = n[0];
    const l = n[4];
    const c = n[8];
    const u = n[1];
    const f = n[5];
    const p = n[9];
    const g = n[2];
    const v = n[6];
    const _ = n[10];
    switch (t) {
      case "XYZ":
        this._y = Math.asin(clamp$1(c, -1, 1));
        if (Math.abs(c) < 0.9999999) {
          this._x = Math.atan2(-p, _);
          this._z = Math.atan2(-l, a);
        } else {
          this._x = Math.atan2(v, f);
          this._z = 0;
        }
        break;
      case "YXZ":
        this._x = Math.asin(-clamp$1(p, -1, 1));
        if (Math.abs(p) < 0.9999999) {
          this._y = Math.atan2(c, _);
          this._z = Math.atan2(u, f);
        } else {
          this._y = Math.atan2(-g, a);
          this._z = 0;
        }
        break;
      case "ZXY":
        this._x = Math.asin(clamp$1(v, -1, 1));
        if (Math.abs(v) < 0.9999999) {
          this._y = Math.atan2(-g, _);
          this._z = Math.atan2(-l, f);
        } else {
          this._y = 0;
          this._z = Math.atan2(u, a);
        }
        break;
      case "ZYX":
        this._y = Math.asin(-clamp$1(g, -1, 1));
        if (Math.abs(g) < 0.9999999) {
          this._x = Math.atan2(v, _);
          this._z = Math.atan2(u, a);
        } else {
          this._x = 0;
          this._z = Math.atan2(-l, f);
        }
        break;
      case "YZX":
        this._z = Math.asin(clamp$1(u, -1, 1));
        if (Math.abs(u) < 0.9999999) {
          this._x = Math.atan2(-p, f);
          this._y = Math.atan2(-g, a);
        } else {
          this._x = 0;
          this._y = Math.atan2(c, _);
        }
        break;
      case "XZY":
        this._z = Math.asin(-clamp$1(l, -1, 1));
        if (Math.abs(l) < 0.9999999) {
          this._x = Math.atan2(v, f);
          this._y = Math.atan2(c, a);
        } else {
          this._x = Math.atan2(-p, _);
          this._y = 0;
        }
        break;
      default:
        console.warn("THREE.Euler: .setFromRotationMatrix() encountered an unknown order: " + t);
    }
    this._order = t;
    if (r === true) {
      this._onChangeCallback();
    }
    return this;
  }
  setFromQuaternion(e, t, r) {
    _matrix.makeRotationFromQuaternion(e);
    return this.setFromRotationMatrix(_matrix, t, r);
  }
  setFromVector3(e, t = this._order) {
    return this.set(e.x, e.y, e.z, t);
  }
  reorder(e) {
    _quaternion$3.setFromEuler(this);
    return this.setFromQuaternion(_quaternion$3, e);
  }
  equals(e) {
    return e._x === this._x && e._y === this._y && e._z === this._z && e._order === this._order;
  }
  fromArray(e) {
    this._x = e[0];
    this._y = e[1];
    this._z = e[2];
    if (e[3] !== undefined) {
      this._order = e[3];
    }
    this._onChangeCallback();
    return this;
  }
  toArray(e = [], t = 0) {
    e[t] = this._x;
    e[t + 1] = this._y;
    e[t + 2] = this._z;
    e[t + 3] = this._order;
    return e;
  }
  _onChange(e) {
    this._onChangeCallback = e;
    return this;
  }
  _onChangeCallback() {}
  *[Symbol.iterator]() {
    yield this._x;
    yield this._y;
    yield this._z;
    yield this._order;
  }
}
Euler.DEFAULT_ORDER = "XYZ";
class Layers {
  constructor() {
    this.mask = 1;
  }
  set(e) {
    this.mask = (1 << e | 0) >>> 0;
  }
  enable(e) {
    this.mask |= 1 << e | 0;
  }
  enableAll() {
    this.mask = -1;
  }
  toggle(e) {
    this.mask ^= 1 << e | 0;
  }
  disable(e) {
    this.mask &= ~(1 << e | 0);
  }
  disableAll() {
    this.mask = 0;
  }
  test(e) {
    return (this.mask & e.mask) !== 0;
  }
  isEnabled(e) {
    return (this.mask & (1 << e | 0)) !== 0;
  }
}
let _object3DId = 0;
const _v1$4$1 = new Vector3();
const _q1$3 = new Quaternion();
const _m1$1 = new Matrix4();
const _target = new Vector3();
const _position$3 = new Vector3();
const _scale$2 = new Vector3();
const _quaternion$2 = new Quaternion();
const _xAxis = new Vector3(1, 0, 0);
const _yAxis = new Vector3(0, 1, 0);
const _zAxis = new Vector3(0, 0, 1);
const _addedEvent = {
  type: "added"
};
const _removedEvent = {
  type: "removed"
};
class Object3D extends EventDispatcher {
  constructor() {
    super();
    this.isObject3D = true;
    Object.defineProperty(this, "id", {
      value: _object3DId++
    });
    this.uuid = generateUUID();
    this.name = "";
    this.type = "Object3D";
    this.parent = null;
    this.children = [];
    this.up = Object3D.DEFAULT_UP.clone();
    const e = new Vector3();
    const t = new Euler();
    const r = new Quaternion();
    const n = new Vector3(1, 1, 1);
    function a() {
      r.setFromEuler(t, false);
    }
    function l() {
      t.setFromQuaternion(r, undefined, false);
    }
    t._onChange(a);
    r._onChange(l);
    Object.defineProperties(this, {
      position: {
        configurable: true,
        enumerable: true,
        value: e
      },
      rotation: {
        configurable: true,
        enumerable: true,
        value: t
      },
      quaternion: {
        configurable: true,
        enumerable: true,
        value: r
      },
      scale: {
        configurable: true,
        enumerable: true,
        value: n
      },
      modelViewMatrix: {
        value: new Matrix4()
      },
      normalMatrix: {
        value: new Matrix3()
      }
    });
    this.matrix = new Matrix4();
    this.matrixWorld = new Matrix4();
    this.matrixAutoUpdate = Object3D.DEFAULT_MATRIX_AUTO_UPDATE;
    this.matrixWorldNeedsUpdate = false;
    this.matrixWorldAutoUpdate = Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE;
    this.layers = new Layers();
    this.visible = true;
    this.castShadow = false;
    this.receiveShadow = false;
    this.frustumCulled = true;
    this.renderOrder = 0;
    this.animations = [];
    this.userData = {};
  }
  onBeforeRender() {}
  onAfterRender() {}
  applyMatrix4(e) {
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }
    this.matrix.premultiply(e);
    this.matrix.decompose(this.position, this.quaternion, this.scale);
  }
  applyQuaternion(e) {
    this.quaternion.premultiply(e);
    return this;
  }
  setRotationFromAxisAngle(e, t) {
    this.quaternion.setFromAxisAngle(e, t);
  }
  setRotationFromEuler(e) {
    this.quaternion.setFromEuler(e, true);
  }
  setRotationFromMatrix(e) {
    this.quaternion.setFromRotationMatrix(e);
  }
  setRotationFromQuaternion(e) {
    this.quaternion.copy(e);
  }
  rotateOnAxis(e, t) {
    _q1$3.setFromAxisAngle(e, t);
    this.quaternion.multiply(_q1$3);
    return this;
  }
  rotateOnWorldAxis(e, t) {
    _q1$3.setFromAxisAngle(e, t);
    this.quaternion.premultiply(_q1$3);
    return this;
  }
  rotateX(e) {
    return this.rotateOnAxis(_xAxis, e);
  }
  rotateY(e) {
    return this.rotateOnAxis(_yAxis, e);
  }
  rotateZ(e) {
    return this.rotateOnAxis(_zAxis, e);
  }
  translateOnAxis(e, t) {
    _v1$4$1.copy(e).applyQuaternion(this.quaternion);
    this.position.add(_v1$4$1.multiplyScalar(t));
    return this;
  }
  translateX(e) {
    return this.translateOnAxis(_xAxis, e);
  }
  translateY(e) {
    return this.translateOnAxis(_yAxis, e);
  }
  translateZ(e) {
    return this.translateOnAxis(_zAxis, e);
  }
  localToWorld(e) {
    this.updateWorldMatrix(true, false);
    return e.applyMatrix4(this.matrixWorld);
  }
  worldToLocal(e) {
    this.updateWorldMatrix(true, false);
    return e.applyMatrix4(_m1$1.copy(this.matrixWorld).invert());
  }
  lookAt(e, t, r) {
    if (e.isVector3) {
      _target.copy(e);
    } else {
      _target.set(e, t, r);
    }
    const n = this.parent;
    this.updateWorldMatrix(true, false);
    _position$3.setFromMatrixPosition(this.matrixWorld);
    if (this.isCamera || this.isLight) {
      _m1$1.lookAt(_position$3, _target, this.up);
    } else {
      _m1$1.lookAt(_target, _position$3, this.up);
    }
    this.quaternion.setFromRotationMatrix(_m1$1);
    if (n) {
      _m1$1.extractRotation(n.matrixWorld);
      _q1$3.setFromRotationMatrix(_m1$1);
      this.quaternion.premultiply(_q1$3.invert());
    }
  }
  add(e) {
    if (arguments.length > 1) {
      for (let t = 0; t < arguments.length; t++) {
        this.add(arguments[t]);
      }
      return this;
    }
    if (e === this) {
      console.error("THREE.Object3D.add: object can't be added as a child of itself.", e);
      return this;
    } else {
      if (e && e.isObject3D) {
        if (e.parent !== null) {
          e.parent.remove(e);
        }
        e.parent = this;
        this.children.push(e);
        e.dispatchEvent(_addedEvent);
      } else {
        console.error("THREE.Object3D.add: object not an instance of THREE.Object3D.", e);
      }
      return this;
    }
  }
  remove(e) {
    if (arguments.length > 1) {
      for (let r = 0; r < arguments.length; r++) {
        this.remove(arguments[r]);
      }
      return this;
    }
    const t = this.children.indexOf(e);
    if (t !== -1) {
      e.parent = null;
      this.children.splice(t, 1);
      e.dispatchEvent(_removedEvent);
    }
    return this;
  }
  removeFromParent() {
    const e = this.parent;
    if (e !== null) {
      e.remove(this);
    }
    return this;
  }
  clear() {
    return this.remove(...this.children);
  }
  attach(e) {
    this.updateWorldMatrix(true, false);
    _m1$1.copy(this.matrixWorld).invert();
    if (e.parent !== null) {
      e.parent.updateWorldMatrix(true, false);
      _m1$1.multiply(e.parent.matrixWorld);
    }
    e.applyMatrix4(_m1$1);
    this.add(e);
    e.updateWorldMatrix(false, true);
    return this;
  }
  getObjectById(e) {
    return this.getObjectByProperty("id", e);
  }
  getObjectByName(e) {
    return this.getObjectByProperty("name", e);
  }
  getObjectByProperty(e, t) {
    if (this[e] === t) {
      return this;
    }
    for (let r = 0, n = this.children.length; r < n; r++) {
      const l = this.children[r].getObjectByProperty(e, t);
      if (l !== undefined) {
        return l;
      }
    }
  }
  getObjectsByProperty(e, t) {
    let r = [];
    if (this[e] === t) {
      r.push(this);
    }
    for (let n = 0, a = this.children.length; n < a; n++) {
      const l = this.children[n].getObjectsByProperty(e, t);
      if (l.length > 0) {
        r = r.concat(l);
      }
    }
    return r;
  }
  getWorldPosition(e) {
    this.updateWorldMatrix(true, false);
    return e.setFromMatrixPosition(this.matrixWorld);
  }
  getWorldQuaternion(e) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_position$3, e, _scale$2);
    return e;
  }
  getWorldScale(e) {
    this.updateWorldMatrix(true, false);
    this.matrixWorld.decompose(_position$3, _quaternion$2, e);
    return e;
  }
  getWorldDirection(e) {
    this.updateWorldMatrix(true, false);
    const t = this.matrixWorld.elements;
    return e.set(t[8], t[9], t[10]).normalize();
  }
  raycast() {}
  traverse(e) {
    e(this);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) {
      t[r].traverse(e);
    }
  }
  traverseVisible(e) {
    if (this.visible === false) {
      return;
    }
    e(this);
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) {
      t[r].traverseVisible(e);
    }
  }
  traverseAncestors(e) {
    const t = this.parent;
    if (t !== null) {
      e(t);
      t.traverseAncestors(e);
    }
  }
  updateMatrix() {
    this.matrix.compose(this.position, this.quaternion, this.scale);
    this.matrixWorldNeedsUpdate = true;
  }
  updateMatrixWorld(e) {
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }
    if (this.matrixWorldNeedsUpdate || e) {
      if (this.parent === null) {
        this.matrixWorld.copy(this.matrix);
      } else {
        this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
      }
      this.matrixWorldNeedsUpdate = false;
      e = true;
    }
    const t = this.children;
    for (let r = 0, n = t.length; r < n; r++) {
      const a = t[r];
      if (a.matrixWorldAutoUpdate === true || e === true) {
        a.updateMatrixWorld(e);
      }
    }
  }
  updateWorldMatrix(e, t) {
    const r = this.parent;
    if (e === true && r !== null && r.matrixWorldAutoUpdate === true) {
      r.updateWorldMatrix(true, false);
    }
    if (this.matrixAutoUpdate) {
      this.updateMatrix();
    }
    if (this.parent === null) {
      this.matrixWorld.copy(this.matrix);
    } else {
      this.matrixWorld.multiplyMatrices(this.parent.matrixWorld, this.matrix);
    }
    if (t === true) {
      const n = this.children;
      for (let a = 0, l = n.length; a < l; a++) {
        const c = n[a];
        if (c.matrixWorldAutoUpdate === true) {
          c.updateWorldMatrix(false, true);
        }
      }
    }
  }
  toJSON(e) {
    const t = e === undefined || typeof e == "string";
    const r = {};
    if (t) {
      e = {
        geometries: {},
        materials: {},
        textures: {},
        images: {},
        shapes: {},
        skeletons: {},
        animations: {},
        nodes: {}
      };
      r.metadata = {
        version: 4.6,
        type: "Object",
        generator: "Object3D.toJSON"
      };
    }
    const n = {
      uuid: this.uuid,
      type: this.type
    };
    if (this.name !== "") {
      n.name = this.name;
    }
    if (this.castShadow === true) {
      n.castShadow = true;
    }
    if (this.receiveShadow === true) {
      n.receiveShadow = true;
    }
    if (this.visible === false) {
      n.visible = false;
    }
    if (this.frustumCulled === false) {
      n.frustumCulled = false;
    }
    if (this.renderOrder !== 0) {
      n.renderOrder = this.renderOrder;
    }
    if (Object.keys(this.userData).length > 0) {
      n.userData = this.userData;
    }
    n.layers = this.layers.mask;
    n.matrix = this.matrix.toArray();
    n.up = this.up.toArray();
    if (this.matrixAutoUpdate === false) {
      n.matrixAutoUpdate = false;
    }
    if (this.isInstancedMesh) {
      n.type = "InstancedMesh";
      n.count = this.count;
      n.instanceMatrix = this.instanceMatrix.toJSON();
      if (this.instanceColor !== null) {
        n.instanceColor = this.instanceColor.toJSON();
      }
    }
    function a(c, u) {
      if (c[u.uuid] === undefined) {
        c[u.uuid] = u.toJSON(e);
      }
      return u.uuid;
    }
    if (this.isScene) {
      if (this.background) {
        if (this.background.isColor) {
          n.background = this.background.toJSON();
        } else if (this.background.isTexture) {
          n.background = this.background.toJSON(e).uuid;
        }
      }
      if (this.environment && this.environment.isTexture && this.environment.isRenderTargetTexture !== true) {
        n.environment = this.environment.toJSON(e).uuid;
      }
    } else if (this.isMesh || this.isLine || this.isPoints) {
      n.geometry = a(e.geometries, this.geometry);
      const c = this.geometry.parameters;
      if (c !== undefined && c.shapes !== undefined) {
        const u = c.shapes;
        if (Array.isArray(u)) {
          for (let f = 0, p = u.length; f < p; f++) {
            const g = u[f];
            a(e.shapes, g);
          }
        } else {
          a(e.shapes, u);
        }
      }
    }
    if (this.isSkinnedMesh) {
      n.bindMode = this.bindMode;
      n.bindMatrix = this.bindMatrix.toArray();
      if (this.skeleton !== undefined) {
        a(e.skeletons, this.skeleton);
        n.skeleton = this.skeleton.uuid;
      }
    }
    if (this.material !== undefined) {
      if (Array.isArray(this.material)) {
        const c = [];
        for (let u = 0, f = this.material.length; u < f; u++) {
          c.push(a(e.materials, this.material[u]));
        }
        n.material = c;
      } else {
        n.material = a(e.materials, this.material);
      }
    }
    if (this.children.length > 0) {
      n.children = [];
      for (let c = 0; c < this.children.length; c++) {
        n.children.push(this.children[c].toJSON(e).object);
      }
    }
    if (this.animations.length > 0) {
      n.animations = [];
      for (let c = 0; c < this.animations.length; c++) {
        const u = this.animations[c];
        n.animations.push(a(e.animations, u));
      }
    }
    if (t) {
      const c = l(e.geometries);
      const u = l(e.materials);
      const f = l(e.textures);
      const p = l(e.images);
      const g = l(e.shapes);
      const v = l(e.skeletons);
      const _ = l(e.animations);
      const T = l(e.nodes);
      if (c.length > 0) {
        r.geometries = c;
      }
      if (u.length > 0) {
        r.materials = u;
      }
      if (f.length > 0) {
        r.textures = f;
      }
      if (p.length > 0) {
        r.images = p;
      }
      if (g.length > 0) {
        r.shapes = g;
      }
      if (v.length > 0) {
        r.skeletons = v;
      }
      if (_.length > 0) {
        r.animations = _;
      }
      if (T.length > 0) {
        r.nodes = T;
      }
    }
    r.object = n;
    return r;
    function l(c) {
      const u = [];
      for (const f in c) {
        const p = c[f];
        delete p.metadata;
        u.push(p);
      }
      return u;
    }
  }
  clone(e) {
    return new this.constructor().copy(this, e);
  }
  copy(e, t = true) {
    this.name = e.name;
    this.up.copy(e.up);
    this.position.copy(e.position);
    this.rotation.order = e.rotation.order;
    this.quaternion.copy(e.quaternion);
    this.scale.copy(e.scale);
    this.matrix.copy(e.matrix);
    this.matrixWorld.copy(e.matrixWorld);
    this.matrixAutoUpdate = e.matrixAutoUpdate;
    this.matrixWorldNeedsUpdate = e.matrixWorldNeedsUpdate;
    this.matrixWorldAutoUpdate = e.matrixWorldAutoUpdate;
    this.layers.mask = e.layers.mask;
    this.visible = e.visible;
    this.castShadow = e.castShadow;
    this.receiveShadow = e.receiveShadow;
    this.frustumCulled = e.frustumCulled;
    this.renderOrder = e.renderOrder;
    this.animations = e.animations.slice();
    this.userData = JSON.parse(JSON.stringify(e.userData));
    if (t === true) {
      for (let r = 0; r < e.children.length; r++) {
        const n = e.children[r];
        this.add(n.clone());
      }
    }
    return this;
  }
}
Object3D.DEFAULT_UP = new Vector3(0, 1, 0);
Object3D.DEFAULT_MATRIX_AUTO_UPDATE = true;
Object3D.DEFAULT_MATRIX_WORLD_AUTO_UPDATE = true;
const _v0$1$1 = new Vector3();
const _v1$3$1 = new Vector3();
const _v2$2 = new Vector3();
const _v3$1 = new Vector3();
const _vab = new Vector3();
const _vac = new Vector3();
const _vbc = new Vector3();
const _vap = new Vector3();
const _vbp = new Vector3();
const _vcp = new Vector3();
let warnedGetUV = false;
class Triangle {
  constructor(e = new Vector3(), t = new Vector3(), r = new Vector3()) {
    this.a = e;
    this.b = t;
    this.c = r;
  }
  static getNormal(e, t, r, n) {
    n.subVectors(r, t);
    _v0$1$1.subVectors(e, t);
    n.cross(_v0$1$1);
    const a = n.lengthSq();
    if (a > 0) {
      return n.multiplyScalar(1 / Math.sqrt(a));
    } else {
      return n.set(0, 0, 0);
    }
  }
  static getBarycoord(e, t, r, n, a) {
    _v0$1$1.subVectors(n, t);
    _v1$3$1.subVectors(r, t);
    _v2$2.subVectors(e, t);
    const l = _v0$1$1.dot(_v0$1$1);
    const c = _v0$1$1.dot(_v1$3$1);
    const u = _v0$1$1.dot(_v2$2);
    const f = _v1$3$1.dot(_v1$3$1);
    const p = _v1$3$1.dot(_v2$2);
    const g = l * f - c * c;
    if (g === 0) {
      return a.set(-2, -1, -1);
    }
    const v = 1 / g;
    const _ = (f * u - c * p) * v;
    const T = (l * p - c * u) * v;
    return a.set(1 - _ - T, T, _);
  }
  static containsPoint(e, t, r, n) {
    this.getBarycoord(e, t, r, n, _v3$1);
    return _v3$1.x >= 0 && _v3$1.y >= 0 && _v3$1.x + _v3$1.y <= 1;
  }
  static getUV(e, t, r, n, a, l, c, u) {
    if (warnedGetUV === false) {
      console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().");
      warnedGetUV = true;
    }
    return this.getInterpolation(e, t, r, n, a, l, c, u);
  }
  static getInterpolation(e, t, r, n, a, l, c, u) {
    this.getBarycoord(e, t, r, n, _v3$1);
    u.setScalar(0);
    u.addScaledVector(a, _v3$1.x);
    u.addScaledVector(l, _v3$1.y);
    u.addScaledVector(c, _v3$1.z);
    return u;
  }
  static isFrontFacing(e, t, r, n) {
    _v0$1$1.subVectors(r, t);
    _v1$3$1.subVectors(e, t);
    return _v0$1$1.cross(_v1$3$1).dot(n) < 0;
  }
  set(e, t, r) {
    this.a.copy(e);
    this.b.copy(t);
    this.c.copy(r);
    return this;
  }
  setFromPointsAndIndices(e, t, r, n) {
    this.a.copy(e[t]);
    this.b.copy(e[r]);
    this.c.copy(e[n]);
    return this;
  }
  setFromAttributeAndIndices(e, t, r, n) {
    this.a.fromBufferAttribute(e, t);
    this.b.fromBufferAttribute(e, r);
    this.c.fromBufferAttribute(e, n);
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.a.copy(e.a);
    this.b.copy(e.b);
    this.c.copy(e.c);
    return this;
  }
  getArea() {
    _v0$1$1.subVectors(this.c, this.b);
    _v1$3$1.subVectors(this.a, this.b);
    return _v0$1$1.cross(_v1$3$1).length() * 0.5;
  }
  getMidpoint(e) {
    return e.addVectors(this.a, this.b).add(this.c).multiplyScalar(1 / 3);
  }
  getNormal(e) {
    return Triangle.getNormal(this.a, this.b, this.c, e);
  }
  getPlane(e) {
    return e.setFromCoplanarPoints(this.a, this.b, this.c);
  }
  getBarycoord(e, t) {
    return Triangle.getBarycoord(e, this.a, this.b, this.c, t);
  }
  getUV(e, t, r, n, a) {
    if (warnedGetUV === false) {
      console.warn("THREE.Triangle.getUV() has been renamed to THREE.Triangle.getInterpolation().");
      warnedGetUV = true;
    }
    return Triangle.getInterpolation(e, this.a, this.b, this.c, t, r, n, a);
  }
  getInterpolation(e, t, r, n, a) {
    return Triangle.getInterpolation(e, this.a, this.b, this.c, t, r, n, a);
  }
  containsPoint(e) {
    return Triangle.containsPoint(e, this.a, this.b, this.c);
  }
  isFrontFacing(e) {
    return Triangle.isFrontFacing(this.a, this.b, this.c, e);
  }
  intersectsBox(e) {
    return e.intersectsTriangle(this);
  }
  closestPointToPoint(e, t) {
    const r = this.a;
    const n = this.b;
    const a = this.c;
    let l;
    let c;
    _vab.subVectors(n, r);
    _vac.subVectors(a, r);
    _vap.subVectors(e, r);
    const u = _vab.dot(_vap);
    const f = _vac.dot(_vap);
    if (u <= 0 && f <= 0) {
      return t.copy(r);
    }
    _vbp.subVectors(e, n);
    const p = _vab.dot(_vbp);
    const g = _vac.dot(_vbp);
    if (p >= 0 && g <= p) {
      return t.copy(n);
    }
    const v = u * g - p * f;
    if (v <= 0 && u >= 0 && p <= 0) {
      l = u / (u - p);
      return t.copy(r).addScaledVector(_vab, l);
    }
    _vcp.subVectors(e, a);
    const _ = _vab.dot(_vcp);
    const T = _vac.dot(_vcp);
    if (T >= 0 && _ <= T) {
      return t.copy(a);
    }
    const M = _ * f - u * T;
    if (M <= 0 && f >= 0 && T <= 0) {
      c = f / (f - T);
      return t.copy(r).addScaledVector(_vac, c);
    }
    const S = p * T - _ * g;
    if (S <= 0 && g - p >= 0 && _ - T >= 0) {
      _vbc.subVectors(a, n);
      c = (g - p) / (g - p + (_ - T));
      return t.copy(n).addScaledVector(_vbc, c);
    }
    const b = 1 / (S + M + v);
    l = M * b;
    c = v * b;
    return t.copy(r).addScaledVector(_vab, l).addScaledVector(_vac, c);
  }
  equals(e) {
    return e.a.equals(this.a) && e.b.equals(this.b) && e.c.equals(this.c);
  }
}
const _colorKeywords = {
  aliceblue: 15792383,
  antiquewhite: 16444375,
  aqua: 65535,
  aquamarine: 8388564,
  azure: 15794175,
  beige: 16119260,
  bisque: 16770244,
  black: 0,
  blanchedalmond: 16772045,
  blue: 255,
  blueviolet: 9055202,
  brown: 10824234,
  burlywood: 14596231,
  cadetblue: 6266528,
  chartreuse: 8388352,
  chocolate: 13789470,
  coral: 16744272,
  cornflowerblue: 6591981,
  cornsilk: 16775388,
  crimson: 14423100,
  cyan: 65535,
  darkblue: 139,
  darkcyan: 35723,
  darkgoldenrod: 12092939,
  darkgray: 11119017,
  darkgreen: 25600,
  darkgrey: 11119017,
  darkkhaki: 12433259,
  darkmagenta: 9109643,
  darkolivegreen: 5597999,
  darkorange: 16747520,
  darkorchid: 10040012,
  darkred: 9109504,
  darksalmon: 15308410,
  darkseagreen: 9419919,
  darkslateblue: 4734347,
  darkslategray: 3100495,
  darkslategrey: 3100495,
  darkturquoise: 52945,
  darkviolet: 9699539,
  deeppink: 16716947,
  deepskyblue: 49151,
  dimgray: 6908265,
  dimgrey: 6908265,
  dodgerblue: 2003199,
  firebrick: 11674146,
  floralwhite: 16775920,
  forestgreen: 2263842,
  fuchsia: 16711935,
  gainsboro: 14474460,
  ghostwhite: 16316671,
  gold: 16766720,
  goldenrod: 14329120,
  gray: 8421504,
  green: 32768,
  greenyellow: 11403055,
  grey: 8421504,
  honeydew: 15794160,
  hotpink: 16738740,
  indianred: 13458524,
  indigo: 4915330,
  ivory: 16777200,
  khaki: 15787660,
  lavender: 15132410,
  lavenderblush: 16773365,
  lawngreen: 8190976,
  lemonchiffon: 16775885,
  lightblue: 11393254,
  lightcoral: 15761536,
  lightcyan: 14745599,
  lightgoldenrodyellow: 16448210,
  lightgray: 13882323,
  lightgreen: 9498256,
  lightgrey: 13882323,
  lightpink: 16758465,
  lightsalmon: 16752762,
  lightseagreen: 2142890,
  lightskyblue: 8900346,
  lightslategray: 7833753,
  lightslategrey: 7833753,
  lightsteelblue: 11584734,
  lightyellow: 16777184,
  lime: 65280,
  limegreen: 3329330,
  linen: 16445670,
  magenta: 16711935,
  maroon: 8388608,
  mediumaquamarine: 6737322,
  mediumblue: 205,
  mediumorchid: 12211667,
  mediumpurple: 9662683,
  mediumseagreen: 3978097,
  mediumslateblue: 8087790,
  mediumspringgreen: 64154,
  mediumturquoise: 4772300,
  mediumvioletred: 13047173,
  midnightblue: 1644912,
  mintcream: 16121850,
  mistyrose: 16770273,
  moccasin: 16770229,
  navajowhite: 16768685,
  navy: 128,
  oldlace: 16643558,
  olive: 8421376,
  olivedrab: 7048739,
  orange: 16753920,
  orangered: 16729344,
  orchid: 14315734,
  palegoldenrod: 15657130,
  palegreen: 10025880,
  paleturquoise: 11529966,
  palevioletred: 14381203,
  papayawhip: 16773077,
  peachpuff: 16767673,
  peru: 13468991,
  pink: 16761035,
  plum: 14524637,
  powderblue: 11591910,
  purple: 8388736,
  rebeccapurple: 6697881,
  red: 16711680,
  rosybrown: 12357519,
  royalblue: 4286945,
  saddlebrown: 9127187,
  salmon: 16416882,
  sandybrown: 16032864,
  seagreen: 3050327,
  seashell: 16774638,
  sienna: 10506797,
  silver: 12632256,
  skyblue: 8900331,
  slateblue: 6970061,
  slategray: 7372944,
  slategrey: 7372944,
  snow: 16775930,
  springgreen: 65407,
  steelblue: 4620980,
  tan: 13808780,
  teal: 32896,
  thistle: 14204888,
  tomato: 16737095,
  turquoise: 4251856,
  violet: 15631086,
  wheat: 16113331,
  white: 16777215,
  whitesmoke: 16119285,
  yellow: 16776960,
  yellowgreen: 10145074
};
const _hslA = {
  h: 0,
  s: 0,
  l: 0
};
const _hslB = {
  h: 0,
  s: 0,
  l: 0
};
function hue2rgb(o, e, t) {
  if (t < 0) {
    t += 1;
  }
  if (t > 1) {
    t -= 1;
  }
  if (t < 1 / 6) {
    return o + (e - o) * 6 * t;
  } else if (t < 1 / 2) {
    return e;
  } else if (t < 2 / 3) {
    return o + (e - o) * 6 * (2 / 3 - t);
  } else {
    return o;
  }
}
class Color {
  constructor(e, t, r) {
    this.isColor = true;
    this.r = 1;
    this.g = 1;
    this.b = 1;
    return this.set(e, t, r);
  }
  set(e, t, r) {
    if (t === undefined && r === undefined) {
      const n = e;
      if (n && n.isColor) {
        this.copy(n);
      } else if (typeof n == "number") {
        this.setHex(n);
      } else if (typeof n == "string") {
        this.setStyle(n);
      }
    } else {
      this.setRGB(e, t, r);
    }
    return this;
  }
  setScalar(e) {
    this.r = e;
    this.g = e;
    this.b = e;
    return this;
  }
  setHex(e, t = SRGBColorSpace) {
    e = Math.floor(e);
    this.r = (e >> 16 & 255) / 255;
    this.g = (e >> 8 & 255) / 255;
    this.b = (e & 255) / 255;
    ColorManagement.toWorkingColorSpace(this, t);
    return this;
  }
  setRGB(e, t, r, n = ColorManagement.workingColorSpace) {
    this.r = e;
    this.g = t;
    this.b = r;
    ColorManagement.toWorkingColorSpace(this, n);
    return this;
  }
  setHSL(e, t, r, n = ColorManagement.workingColorSpace) {
    e = euclideanModulo(e, 1);
    t = clamp$1(t, 0, 1);
    r = clamp$1(r, 0, 1);
    if (t === 0) {
      this.r = this.g = this.b = r;
    } else {
      const a = r <= 0.5 ? r * (1 + t) : r + t - r * t;
      const l = r * 2 - a;
      this.r = hue2rgb(l, a, e + 1 / 3);
      this.g = hue2rgb(l, a, e);
      this.b = hue2rgb(l, a, e - 1 / 3);
    }
    ColorManagement.toWorkingColorSpace(this, n);
    return this;
  }
  setStyle(e, t = SRGBColorSpace) {
    function r(a) {
      if (a !== undefined && parseFloat(a) < 1) {
        console.warn("THREE.Color: Alpha component of " + e + " will be ignored.");
      }
    }
    let n;
    if (n = /^(\w+)\(([^\)]*)\)/.exec(e)) {
      let a;
      const l = n[1];
      const c = n[2];
      switch (l) {
        case "rgb":
        case "rgba":
          if (a = /^\s*(\d+)\s*,\s*(\d+)\s*,\s*(\d+)\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c)) {
            r(a[4]);
            return this.setRGB(Math.min(255, parseInt(a[1], 10)) / 255, Math.min(255, parseInt(a[2], 10)) / 255, Math.min(255, parseInt(a[3], 10)) / 255, t);
          }
          if (a = /^\s*(\d+)\%\s*,\s*(\d+)\%\s*,\s*(\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c)) {
            r(a[4]);
            return this.setRGB(Math.min(100, parseInt(a[1], 10)) / 100, Math.min(100, parseInt(a[2], 10)) / 100, Math.min(100, parseInt(a[3], 10)) / 100, t);
          }
          break;
        case "hsl":
        case "hsla":
          if (a = /^\s*(\d*\.?\d+)\s*,\s*(\d*\.?\d+)\%\s*,\s*(\d*\.?\d+)\%\s*(?:,\s*(\d*\.?\d+)\s*)?$/.exec(c)) {
            r(a[4]);
            return this.setHSL(parseFloat(a[1]) / 360, parseFloat(a[2]) / 100, parseFloat(a[3]) / 100, t);
          }
          break;
        default:
          console.warn("THREE.Color: Unknown color model " + e);
      }
    } else if (n = /^\#([A-Fa-f\d]+)$/.exec(e)) {
      const a = n[1];
      const l = a.length;
      if (l === 3) {
        return this.setRGB(parseInt(a.charAt(0), 16) / 15, parseInt(a.charAt(1), 16) / 15, parseInt(a.charAt(2), 16) / 15, t);
      }
      if (l === 6) {
        return this.setHex(parseInt(a, 16), t);
      }
      console.warn("THREE.Color: Invalid hex color " + e);
    } else if (e && e.length > 0) {
      return this.setColorName(e, t);
    }
    return this;
  }
  setColorName(e, t = SRGBColorSpace) {
    const r = _colorKeywords[e.toLowerCase()];
    if (r !== undefined) {
      this.setHex(r, t);
    } else {
      console.warn("THREE.Color: Unknown color " + e);
    }
    return this;
  }
  clone() {
    return new this.constructor(this.r, this.g, this.b);
  }
  copy(e) {
    this.r = e.r;
    this.g = e.g;
    this.b = e.b;
    return this;
  }
  copySRGBToLinear(e) {
    this.r = SRGBToLinear(e.r);
    this.g = SRGBToLinear(e.g);
    this.b = SRGBToLinear(e.b);
    return this;
  }
  copyLinearToSRGB(e) {
    this.r = LinearToSRGB(e.r);
    this.g = LinearToSRGB(e.g);
    this.b = LinearToSRGB(e.b);
    return this;
  }
  convertSRGBToLinear() {
    this.copySRGBToLinear(this);
    return this;
  }
  convertLinearToSRGB() {
    this.copyLinearToSRGB(this);
    return this;
  }
  getHex(e = SRGBColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color$1.copy(this), e);
    return Math.round(clamp$1(_color$1.r * 255, 0, 255)) * 65536 + Math.round(clamp$1(_color$1.g * 255, 0, 255)) * 256 + Math.round(clamp$1(_color$1.b * 255, 0, 255));
  }
  getHexString(e = SRGBColorSpace) {
    return ("000000" + this.getHex(e).toString(16)).slice(-6);
  }
  getHSL(e, t = ColorManagement.workingColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color$1.copy(this), t);
    const r = _color$1.r;
    const n = _color$1.g;
    const a = _color$1.b;
    const l = Math.max(r, n, a);
    const c = Math.min(r, n, a);
    let u;
    let f;
    const p = (c + l) / 2;
    if (c === l) {
      u = 0;
      f = 0;
    } else {
      const g = l - c;
      f = p <= 0.5 ? g / (l + c) : g / (2 - l - c);
      switch (l) {
        case r:
          u = (n - a) / g + (n < a ? 6 : 0);
          break;
        case n:
          u = (a - r) / g + 2;
          break;
        case a:
          u = (r - n) / g + 4;
          break;
      }
      u /= 6;
    }
    e.h = u;
    e.s = f;
    e.l = p;
    return e;
  }
  getRGB(e, t = ColorManagement.workingColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color$1.copy(this), t);
    e.r = _color$1.r;
    e.g = _color$1.g;
    e.b = _color$1.b;
    return e;
  }
  getStyle(e = SRGBColorSpace) {
    ColorManagement.fromWorkingColorSpace(_color$1.copy(this), e);
    const t = _color$1.r;
    const r = _color$1.g;
    const n = _color$1.b;
    if (e !== SRGBColorSpace) {
      return `color(${e} ${t.toFixed(3)} ${r.toFixed(3)} ${n.toFixed(3)})`;
    } else {
      return `rgb(${Math.round(t * 255)},${Math.round(r * 255)},${Math.round(n * 255)})`;
    }
  }
  offsetHSL(e, t, r) {
    this.getHSL(_hslA);
    return this.setHSL(_hslA.h + e, _hslA.s + t, _hslA.l + r);
  }
  add(e) {
    this.r += e.r;
    this.g += e.g;
    this.b += e.b;
    return this;
  }
  addColors(e, t) {
    this.r = e.r + t.r;
    this.g = e.g + t.g;
    this.b = e.b + t.b;
    return this;
  }
  addScalar(e) {
    this.r += e;
    this.g += e;
    this.b += e;
    return this;
  }
  sub(e) {
    this.r = Math.max(0, this.r - e.r);
    this.g = Math.max(0, this.g - e.g);
    this.b = Math.max(0, this.b - e.b);
    return this;
  }
  multiply(e) {
    this.r *= e.r;
    this.g *= e.g;
    this.b *= e.b;
    return this;
  }
  multiplyScalar(e) {
    this.r *= e;
    this.g *= e;
    this.b *= e;
    return this;
  }
  lerp(e, t) {
    this.r += (e.r - this.r) * t;
    this.g += (e.g - this.g) * t;
    this.b += (e.b - this.b) * t;
    return this;
  }
  lerpColors(e, t, r) {
    this.r = e.r + (t.r - e.r) * r;
    this.g = e.g + (t.g - e.g) * r;
    this.b = e.b + (t.b - e.b) * r;
    return this;
  }
  lerpHSL(e, t) {
    this.getHSL(_hslA);
    e.getHSL(_hslB);
    const r = lerp(_hslA.h, _hslB.h, t);
    const n = lerp(_hslA.s, _hslB.s, t);
    const a = lerp(_hslA.l, _hslB.l, t);
    this.setHSL(r, n, a);
    return this;
  }
  setFromVector3(e) {
    this.r = e.x;
    this.g = e.y;
    this.b = e.z;
    return this;
  }
  applyMatrix3(e) {
    const t = this.r;
    const r = this.g;
    const n = this.b;
    const a = e.elements;
    this.r = a[0] * t + a[3] * r + a[6] * n;
    this.g = a[1] * t + a[4] * r + a[7] * n;
    this.b = a[2] * t + a[5] * r + a[8] * n;
    return this;
  }
  equals(e) {
    return e.r === this.r && e.g === this.g && e.b === this.b;
  }
  fromArray(e, t = 0) {
    this.r = e[t];
    this.g = e[t + 1];
    this.b = e[t + 2];
    return this;
  }
  toArray(e = [], t = 0) {
    e[t] = this.r;
    e[t + 1] = this.g;
    e[t + 2] = this.b;
    return e;
  }
  fromBufferAttribute(e, t) {
    this.r = e.getX(t);
    this.g = e.getY(t);
    this.b = e.getZ(t);
    return this;
  }
  toJSON() {
    return this.getHex();
  }
  *[Symbol.iterator]() {
    yield this.r;
    yield this.g;
    yield this.b;
  }
}
const _color$1 = new Color();
Color.NAMES = _colorKeywords;
let _materialId = 0;
class Material extends EventDispatcher {
  constructor() {
    super();
    this.isMaterial = true;
    Object.defineProperty(this, "id", {
      value: _materialId++
    });
    this.uuid = generateUUID();
    this.name = "";
    this.type = "Material";
    this.blending = NormalBlending;
    this.side = FrontSide;
    this.vertexColors = false;
    this.opacity = 1;
    this.transparent = false;
    this.alphaHash = false;
    this.blendSrc = SrcAlphaFactor;
    this.blendDst = OneMinusSrcAlphaFactor;
    this.blendEquation = AddEquation;
    this.blendSrcAlpha = null;
    this.blendDstAlpha = null;
    this.blendEquationAlpha = null;
    this.blendColor = new Color(0, 0, 0);
    this.blendAlpha = 0;
    this.depthFunc = LessEqualDepth;
    this.depthTest = true;
    this.depthWrite = true;
    this.stencilWriteMask = 255;
    this.stencilFunc = AlwaysStencilFunc;
    this.stencilRef = 0;
    this.stencilFuncMask = 255;
    this.stencilFail = KeepStencilOp;
    this.stencilZFail = KeepStencilOp;
    this.stencilZPass = KeepStencilOp;
    this.stencilWrite = false;
    this.clippingPlanes = null;
    this.clipIntersection = false;
    this.clipShadows = false;
    this.shadowSide = null;
    this.colorWrite = true;
    this.precision = null;
    this.polygonOffset = false;
    this.polygonOffsetFactor = 0;
    this.polygonOffsetUnits = 0;
    this.dithering = false;
    this.alphaToCoverage = false;
    this.premultipliedAlpha = false;
    this.forceSinglePass = false;
    this.visible = true;
    this.toneMapped = true;
    this.userData = {};
    this.version = 0;
    this._alphaTest = 0;
  }
  get alphaTest() {
    return this._alphaTest;
  }
  set alphaTest(e) {
    if (this._alphaTest > 0 != e > 0) {
      this.version++;
    }
    this._alphaTest = e;
  }
  onBuild() {}
  onBeforeRender() {}
  onBeforeCompile() {}
  customProgramCacheKey() {
    return this.onBeforeCompile.toString();
  }
  setValues(e) {
    if (e !== undefined) {
      for (const t in e) {
        const r = e[t];
        if (r === undefined) {
          console.warn(`THREE.Material: parameter '${t}' has value of undefined.`);
          continue;
        }
        const n = this[t];
        if (n === undefined) {
          console.warn(`THREE.Material: '${t}' is not a property of THREE.${this.type}.`);
          continue;
        }
        if (n && n.isColor) {
          n.set(r);
        } else if (n && n.isVector3 && r && r.isVector3) {
          n.copy(r);
        } else {
          this[t] = r;
        }
      }
    }
  }
  toJSON(e) {
    const t = e === undefined || typeof e == "string";
    if (t) {
      e = {
        textures: {},
        images: {}
      };
    }
    const r = {
      metadata: {
        version: 4.6,
        type: "Material",
        generator: "Material.toJSON"
      }
    };
    r.uuid = this.uuid;
    r.type = this.type;
    if (this.name !== "") {
      r.name = this.name;
    }
    if (this.color && this.color.isColor) {
      r.color = this.color.getHex();
    }
    if (this.roughness !== undefined) {
      r.roughness = this.roughness;
    }
    if (this.metalness !== undefined) {
      r.metalness = this.metalness;
    }
    if (this.sheen !== undefined) {
      r.sheen = this.sheen;
    }
    if (this.sheenColor && this.sheenColor.isColor) {
      r.sheenColor = this.sheenColor.getHex();
    }
    if (this.sheenRoughness !== undefined) {
      r.sheenRoughness = this.sheenRoughness;
    }
    if (this.emissive && this.emissive.isColor) {
      r.emissive = this.emissive.getHex();
    }
    if (this.emissiveIntensity && this.emissiveIntensity !== 1) {
      r.emissiveIntensity = this.emissiveIntensity;
    }
    if (this.specular && this.specular.isColor) {
      r.specular = this.specular.getHex();
    }
    if (this.specularIntensity !== undefined) {
      r.specularIntensity = this.specularIntensity;
    }
    if (this.specularColor && this.specularColor.isColor) {
      r.specularColor = this.specularColor.getHex();
    }
    if (this.shininess !== undefined) {
      r.shininess = this.shininess;
    }
    if (this.clearcoat !== undefined) {
      r.clearcoat = this.clearcoat;
    }
    if (this.clearcoatRoughness !== undefined) {
      r.clearcoatRoughness = this.clearcoatRoughness;
    }
    if (this.clearcoatMap && this.clearcoatMap.isTexture) {
      r.clearcoatMap = this.clearcoatMap.toJSON(e).uuid;
    }
    if (this.clearcoatRoughnessMap && this.clearcoatRoughnessMap.isTexture) {
      r.clearcoatRoughnessMap = this.clearcoatRoughnessMap.toJSON(e).uuid;
    }
    if (this.clearcoatNormalMap && this.clearcoatNormalMap.isTexture) {
      r.clearcoatNormalMap = this.clearcoatNormalMap.toJSON(e).uuid;
      r.clearcoatNormalScale = this.clearcoatNormalScale.toArray();
    }
    if (this.iridescence !== undefined) {
      r.iridescence = this.iridescence;
    }
    if (this.iridescenceIOR !== undefined) {
      r.iridescenceIOR = this.iridescenceIOR;
    }
    if (this.iridescenceThicknessRange !== undefined) {
      r.iridescenceThicknessRange = this.iridescenceThicknessRange;
    }
    if (this.iridescenceMap && this.iridescenceMap.isTexture) {
      r.iridescenceMap = this.iridescenceMap.toJSON(e).uuid;
    }
    if (this.iridescenceThicknessMap && this.iridescenceThicknessMap.isTexture) {
      r.iridescenceThicknessMap = this.iridescenceThicknessMap.toJSON(e).uuid;
    }
    if (this.anisotropy !== undefined) {
      r.anisotropy = this.anisotropy;
    }
    if (this.anisotropyRotation !== undefined) {
      r.anisotropyRotation = this.anisotropyRotation;
    }
    if (this.anisotropyMap && this.anisotropyMap.isTexture) {
      r.anisotropyMap = this.anisotropyMap.toJSON(e).uuid;
    }
    if (this.map && this.map.isTexture) {
      r.map = this.map.toJSON(e).uuid;
    }
    if (this.matcap && this.matcap.isTexture) {
      r.matcap = this.matcap.toJSON(e).uuid;
    }
    if (this.alphaMap && this.alphaMap.isTexture) {
      r.alphaMap = this.alphaMap.toJSON(e).uuid;
    }
    if (this.lightMap && this.lightMap.isTexture) {
      r.lightMap = this.lightMap.toJSON(e).uuid;
      r.lightMapIntensity = this.lightMapIntensity;
    }
    if (this.aoMap && this.aoMap.isTexture) {
      r.aoMap = this.aoMap.toJSON(e).uuid;
      r.aoMapIntensity = this.aoMapIntensity;
    }
    if (this.bumpMap && this.bumpMap.isTexture) {
      r.bumpMap = this.bumpMap.toJSON(e).uuid;
      r.bumpScale = this.bumpScale;
    }
    if (this.normalMap && this.normalMap.isTexture) {
      r.normalMap = this.normalMap.toJSON(e).uuid;
      r.normalMapType = this.normalMapType;
      r.normalScale = this.normalScale.toArray();
    }
    if (this.displacementMap && this.displacementMap.isTexture) {
      r.displacementMap = this.displacementMap.toJSON(e).uuid;
      r.displacementScale = this.displacementScale;
      r.displacementBias = this.displacementBias;
    }
    if (this.roughnessMap && this.roughnessMap.isTexture) {
      r.roughnessMap = this.roughnessMap.toJSON(e).uuid;
    }
    if (this.metalnessMap && this.metalnessMap.isTexture) {
      r.metalnessMap = this.metalnessMap.toJSON(e).uuid;
    }
    if (this.emissiveMap && this.emissiveMap.isTexture) {
      r.emissiveMap = this.emissiveMap.toJSON(e).uuid;
    }
    if (this.specularMap && this.specularMap.isTexture) {
      r.specularMap = this.specularMap.toJSON(e).uuid;
    }
    if (this.specularIntensityMap && this.specularIntensityMap.isTexture) {
      r.specularIntensityMap = this.specularIntensityMap.toJSON(e).uuid;
    }
    if (this.specularColorMap && this.specularColorMap.isTexture) {
      r.specularColorMap = this.specularColorMap.toJSON(e).uuid;
    }
    if (this.envMap && this.envMap.isTexture) {
      r.envMap = this.envMap.toJSON(e).uuid;
      if (this.combine !== undefined) {
        r.combine = this.combine;
      }
    }
    if (this.envMapIntensity !== undefined) {
      r.envMapIntensity = this.envMapIntensity;
    }
    if (this.reflectivity !== undefined) {
      r.reflectivity = this.reflectivity;
    }
    if (this.refractionRatio !== undefined) {
      r.refractionRatio = this.refractionRatio;
    }
    if (this.gradientMap && this.gradientMap.isTexture) {
      r.gradientMap = this.gradientMap.toJSON(e).uuid;
    }
    if (this.transmission !== undefined) {
      r.transmission = this.transmission;
    }
    if (this.transmissionMap && this.transmissionMap.isTexture) {
      r.transmissionMap = this.transmissionMap.toJSON(e).uuid;
    }
    if (this.thickness !== undefined) {
      r.thickness = this.thickness;
    }
    if (this.thicknessMap && this.thicknessMap.isTexture) {
      r.thicknessMap = this.thicknessMap.toJSON(e).uuid;
    }
    if (this.attenuationDistance !== undefined && this.attenuationDistance !== Infinity) {
      r.attenuationDistance = this.attenuationDistance;
    }
    if (this.attenuationColor !== undefined) {
      r.attenuationColor = this.attenuationColor.getHex();
    }
    if (this.size !== undefined) {
      r.size = this.size;
    }
    if (this.shadowSide !== null) {
      r.shadowSide = this.shadowSide;
    }
    if (this.sizeAttenuation !== undefined) {
      r.sizeAttenuation = this.sizeAttenuation;
    }
    if (this.blending !== NormalBlending) {
      r.blending = this.blending;
    }
    if (this.side !== FrontSide) {
      r.side = this.side;
    }
    if (this.vertexColors === true) {
      r.vertexColors = true;
    }
    if (this.opacity < 1) {
      r.opacity = this.opacity;
    }
    if (this.transparent === true) {
      r.transparent = true;
    }
    if (this.blendSrc !== SrcAlphaFactor) {
      r.blendSrc = this.blendSrc;
    }
    if (this.blendDst !== OneMinusSrcAlphaFactor) {
      r.blendDst = this.blendDst;
    }
    if (this.blendEquation !== AddEquation) {
      r.blendEquation = this.blendEquation;
    }
    if (this.blendSrcAlpha !== null) {
      r.blendSrcAlpha = this.blendSrcAlpha;
    }
    if (this.blendDstAlpha !== null) {
      r.blendDstAlpha = this.blendDstAlpha;
    }
    if (this.blendEquationAlpha !== null) {
      r.blendEquationAlpha = this.blendEquationAlpha;
    }
    if (this.blendColor && this.blendColor.isColor) {
      r.blendColor = this.blendColor.getHex();
    }
    if (this.blendAlpha !== 0) {
      r.blendAlpha = this.blendAlpha;
    }
    if (this.depthFunc !== LessEqualDepth) {
      r.depthFunc = this.depthFunc;
    }
    if (this.depthTest === false) {
      r.depthTest = this.depthTest;
    }
    if (this.depthWrite === false) {
      r.depthWrite = this.depthWrite;
    }
    if (this.colorWrite === false) {
      r.colorWrite = this.colorWrite;
    }
    if (this.stencilWriteMask !== 255) {
      r.stencilWriteMask = this.stencilWriteMask;
    }
    if (this.stencilFunc !== AlwaysStencilFunc) {
      r.stencilFunc = this.stencilFunc;
    }
    if (this.stencilRef !== 0) {
      r.stencilRef = this.stencilRef;
    }
    if (this.stencilFuncMask !== 255) {
      r.stencilFuncMask = this.stencilFuncMask;
    }
    if (this.stencilFail !== KeepStencilOp) {
      r.stencilFail = this.stencilFail;
    }
    if (this.stencilZFail !== KeepStencilOp) {
      r.stencilZFail = this.stencilZFail;
    }
    if (this.stencilZPass !== KeepStencilOp) {
      r.stencilZPass = this.stencilZPass;
    }
    if (this.stencilWrite === true) {
      r.stencilWrite = this.stencilWrite;
    }
    if (this.rotation !== undefined && this.rotation !== 0) {
      r.rotation = this.rotation;
    }
    if (this.polygonOffset === true) {
      r.polygonOffset = true;
    }
    if (this.polygonOffsetFactor !== 0) {
      r.polygonOffsetFactor = this.polygonOffsetFactor;
    }
    if (this.polygonOffsetUnits !== 0) {
      r.polygonOffsetUnits = this.polygonOffsetUnits;
    }
    if (this.linewidth !== undefined && this.linewidth !== 1) {
      r.linewidth = this.linewidth;
    }
    if (this.dashSize !== undefined) {
      r.dashSize = this.dashSize;
    }
    if (this.gapSize !== undefined) {
      r.gapSize = this.gapSize;
    }
    if (this.scale !== undefined) {
      r.scale = this.scale;
    }
    if (this.dithering === true) {
      r.dithering = true;
    }
    if (this.alphaTest > 0) {
      r.alphaTest = this.alphaTest;
    }
    if (this.alphaHash === true) {
      r.alphaHash = true;
    }
    if (this.alphaToCoverage === true) {
      r.alphaToCoverage = true;
    }
    if (this.premultipliedAlpha === true) {
      r.premultipliedAlpha = true;
    }
    if (this.forceSinglePass === true) {
      r.forceSinglePass = true;
    }
    if (this.wireframe === true) {
      r.wireframe = true;
    }
    if (this.wireframeLinewidth > 1) {
      r.wireframeLinewidth = this.wireframeLinewidth;
    }
    if (this.wireframeLinecap !== "round") {
      r.wireframeLinecap = this.wireframeLinecap;
    }
    if (this.wireframeLinejoin !== "round") {
      r.wireframeLinejoin = this.wireframeLinejoin;
    }
    if (this.flatShading === true) {
      r.flatShading = true;
    }
    if (this.visible === false) {
      r.visible = false;
    }
    if (this.toneMapped === false) {
      r.toneMapped = false;
    }
    if (this.fog === false) {
      r.fog = false;
    }
    if (Object.keys(this.userData).length > 0) {
      r.userData = this.userData;
    }
    function n(a) {
      const l = [];
      for (const c in a) {
        const u = a[c];
        delete u.metadata;
        l.push(u);
      }
      return l;
    }
    if (t) {
      const a = n(e.textures);
      const l = n(e.images);
      if (a.length > 0) {
        r.textures = a;
      }
      if (l.length > 0) {
        r.images = l;
      }
    }
    return r;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.name = e.name;
    this.blending = e.blending;
    this.side = e.side;
    this.vertexColors = e.vertexColors;
    this.opacity = e.opacity;
    this.transparent = e.transparent;
    this.blendSrc = e.blendSrc;
    this.blendDst = e.blendDst;
    this.blendEquation = e.blendEquation;
    this.blendSrcAlpha = e.blendSrcAlpha;
    this.blendDstAlpha = e.blendDstAlpha;
    this.blendEquationAlpha = e.blendEquationAlpha;
    this.blendColor.copy(e.blendColor);
    this.blendAlpha = e.blendAlpha;
    this.depthFunc = e.depthFunc;
    this.depthTest = e.depthTest;
    this.depthWrite = e.depthWrite;
    this.stencilWriteMask = e.stencilWriteMask;
    this.stencilFunc = e.stencilFunc;
    this.stencilRef = e.stencilRef;
    this.stencilFuncMask = e.stencilFuncMask;
    this.stencilFail = e.stencilFail;
    this.stencilZFail = e.stencilZFail;
    this.stencilZPass = e.stencilZPass;
    this.stencilWrite = e.stencilWrite;
    const t = e.clippingPlanes;
    let r = null;
    if (t !== null) {
      const n = t.length;
      r = new Array(n);
      for (let a = 0; a !== n; ++a) {
        r[a] = t[a].clone();
      }
    }
    this.clippingPlanes = r;
    this.clipIntersection = e.clipIntersection;
    this.clipShadows = e.clipShadows;
    this.shadowSide = e.shadowSide;
    this.colorWrite = e.colorWrite;
    this.precision = e.precision;
    this.polygonOffset = e.polygonOffset;
    this.polygonOffsetFactor = e.polygonOffsetFactor;
    this.polygonOffsetUnits = e.polygonOffsetUnits;
    this.dithering = e.dithering;
    this.alphaTest = e.alphaTest;
    this.alphaHash = e.alphaHash;
    this.alphaToCoverage = e.alphaToCoverage;
    this.premultipliedAlpha = e.premultipliedAlpha;
    this.forceSinglePass = e.forceSinglePass;
    this.visible = e.visible;
    this.toneMapped = e.toneMapped;
    this.userData = JSON.parse(JSON.stringify(e.userData));
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
  set needsUpdate(e) {
    if (e === true) {
      this.version++;
    }
  }
}
class MeshBasicMaterial extends Material {
  constructor(e) {
    super();
    this.isMeshBasicMaterial = true;
    this.type = "MeshBasicMaterial";
    this.color = new Color(16777215);
    this.map = null;
    this.lightMap = null;
    this.lightMapIntensity = 1;
    this.aoMap = null;
    this.aoMapIntensity = 1;
    this.specularMap = null;
    this.alphaMap = null;
    this.envMap = null;
    this.combine = MultiplyOperation;
    this.reflectivity = 1;
    this.refractionRatio = 0.98;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.wireframeLinecap = "round";
    this.wireframeLinejoin = "round";
    this.fog = true;
    this.setValues(e);
  }
  copy(e) {
    super.copy(e);
    this.color.copy(e.color);
    this.map = e.map;
    this.lightMap = e.lightMap;
    this.lightMapIntensity = e.lightMapIntensity;
    this.aoMap = e.aoMap;
    this.aoMapIntensity = e.aoMapIntensity;
    this.specularMap = e.specularMap;
    this.alphaMap = e.alphaMap;
    this.envMap = e.envMap;
    this.combine = e.combine;
    this.reflectivity = e.reflectivity;
    this.refractionRatio = e.refractionRatio;
    this.wireframe = e.wireframe;
    this.wireframeLinewidth = e.wireframeLinewidth;
    this.wireframeLinecap = e.wireframeLinecap;
    this.wireframeLinejoin = e.wireframeLinejoin;
    this.fog = e.fog;
    return this;
  }
}
const _tables = _generateTables();
function _generateTables() {
  const o = new ArrayBuffer(4);
  const e = new Float32Array(o);
  const t = new Uint32Array(o);
  const r = new Uint32Array(512);
  const n = new Uint32Array(512);
  for (let u = 0; u < 256; ++u) {
    const f = u - 127;
    if (f < -27) {
      r[u] = 0;
      r[u | 256] = 32768;
      n[u] = 24;
      n[u | 256] = 24;
    } else if (f < -14) {
      r[u] = 1024 >> -f - 14;
      r[u | 256] = 1024 >> -f - 14 | 32768;
      n[u] = -f - 1;
      n[u | 256] = -f - 1;
    } else if (f <= 15) {
      r[u] = f + 15 << 10;
      r[u | 256] = f + 15 << 10 | 32768;
      n[u] = 13;
      n[u | 256] = 13;
    } else if (f < 128) {
      r[u] = 31744;
      r[u | 256] = 64512;
      n[u] = 24;
      n[u | 256] = 24;
    } else {
      r[u] = 31744;
      r[u | 256] = 64512;
      n[u] = 13;
      n[u | 256] = 13;
    }
  }
  const a = new Uint32Array(2048);
  const l = new Uint32Array(64);
  const c = new Uint32Array(64);
  for (let u = 1; u < 1024; ++u) {
    let f = u << 13;
    let p = 0;
    while (!(f & 8388608)) {
      f <<= 1;
      p -= 8388608;
    }
    f &= -8388609;
    p += 947912704;
    a[u] = f | p;
  }
  for (let u = 1024; u < 2048; ++u) {
    a[u] = 939524096 + (u - 1024 << 13);
  }
  for (let u = 1; u < 31; ++u) {
    l[u] = u << 23;
  }
  l[31] = 1199570944;
  l[32] = 2147483648;
  for (let u = 33; u < 63; ++u) {
    l[u] = 2147483648 + (u - 32 << 23);
  }
  l[63] = 3347054592;
  for (let u = 1; u < 64; ++u) {
    if (u !== 32) {
      c[u] = 1024;
    }
  }
  return {
    floatView: e,
    uint32View: t,
    baseTable: r,
    shiftTable: n,
    mantissaTable: a,
    exponentTable: l,
    offsetTable: c
  };
}
function toHalfFloat(o) {
  if (Math.abs(o) > 65504) {
    console.warn("THREE.DataUtils.toHalfFloat(): Value out of range.");
  }
  o = clamp$1(o, -65504, 65504);
  _tables.floatView[0] = o;
  const e = _tables.uint32View[0];
  const t = e >> 23 & 511;
  return _tables.baseTable[t] + ((e & 8388607) >> _tables.shiftTable[t]);
}
function fromHalfFloat(o) {
  const e = o >> 10;
  _tables.uint32View[0] = _tables.mantissaTable[_tables.offsetTable[e] + (o & 1023)] + _tables.exponentTable[e];
  return _tables.floatView[0];
}
const DataUtils = {
  toHalfFloat,
  fromHalfFloat
};
const _vector$8 = new Vector3();
const _vector2$1 = new Vector2();
class BufferAttribute {
  constructor(e, t, r = false) {
    if (Array.isArray(e)) {
      throw new TypeError("THREE.BufferAttribute: array should be a Typed Array.");
    }
    this.isBufferAttribute = true;
    this.name = "";
    this.array = e;
    this.itemSize = t;
    this.count = e !== undefined ? e.length / t : 0;
    this.normalized = r;
    this.usage = StaticDrawUsage;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.gpuType = FloatType;
    this.version = 0;
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    if (e === true) {
      this.version++;
    }
  }
  setUsage(e) {
    this.usage = e;
    return this;
  }
  copy(e) {
    this.name = e.name;
    this.array = new e.array.constructor(e.array);
    this.itemSize = e.itemSize;
    this.count = e.count;
    this.normalized = e.normalized;
    this.usage = e.usage;
    this.gpuType = e.gpuType;
    return this;
  }
  copyAt(e, t, r) {
    e *= this.itemSize;
    r *= t.itemSize;
    for (let n = 0, a = this.itemSize; n < a; n++) {
      this.array[e + n] = t.array[r + n];
    }
    return this;
  }
  copyArray(e) {
    this.array.set(e);
    return this;
  }
  applyMatrix3(e) {
    if (this.itemSize === 2) {
      for (let t = 0, r = this.count; t < r; t++) {
        _vector2$1.fromBufferAttribute(this, t);
        _vector2$1.applyMatrix3(e);
        this.setXY(t, _vector2$1.x, _vector2$1.y);
      }
    } else if (this.itemSize === 3) {
      for (let t = 0, r = this.count; t < r; t++) {
        _vector$8.fromBufferAttribute(this, t);
        _vector$8.applyMatrix3(e);
        this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
      }
    }
    return this;
  }
  applyMatrix4(e) {
    for (let t = 0, r = this.count; t < r; t++) {
      _vector$8.fromBufferAttribute(this, t);
      _vector$8.applyMatrix4(e);
      this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    }
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, r = this.count; t < r; t++) {
      _vector$8.fromBufferAttribute(this, t);
      _vector$8.applyNormalMatrix(e);
      this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    }
    return this;
  }
  transformDirection(e) {
    for (let t = 0, r = this.count; t < r; t++) {
      _vector$8.fromBufferAttribute(this, t);
      _vector$8.transformDirection(e);
      this.setXYZ(t, _vector$8.x, _vector$8.y, _vector$8.z);
    }
    return this;
  }
  set(e, t = 0) {
    this.array.set(e, t);
    return this;
  }
  getComponent(e, t) {
    let r = this.array[e * this.itemSize + t];
    if (this.normalized) {
      r = denormalize(r, this.array);
    }
    return r;
  }
  setComponent(e, t, r) {
    if (this.normalized) {
      r = normalize(r, this.array);
    }
    this.array[e * this.itemSize + t] = r;
    return this;
  }
  getX(e) {
    let t = this.array[e * this.itemSize];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  setX(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.array[e * this.itemSize] = t;
    return this;
  }
  getY(e) {
    let t = this.array[e * this.itemSize + 1];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  setY(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.array[e * this.itemSize + 1] = t;
    return this;
  }
  getZ(e) {
    let t = this.array[e * this.itemSize + 2];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  setZ(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.array[e * this.itemSize + 2] = t;
    return this;
  }
  getW(e) {
    let t = this.array[e * this.itemSize + 3];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  setW(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.array[e * this.itemSize + 3] = t;
    return this;
  }
  setXY(e, t, r) {
    e *= this.itemSize;
    if (this.normalized) {
      t = normalize(t, this.array);
      r = normalize(r, this.array);
    }
    this.array[e + 0] = t;
    this.array[e + 1] = r;
    return this;
  }
  setXYZ(e, t, r, n) {
    e *= this.itemSize;
    if (this.normalized) {
      t = normalize(t, this.array);
      r = normalize(r, this.array);
      n = normalize(n, this.array);
    }
    this.array[e + 0] = t;
    this.array[e + 1] = r;
    this.array[e + 2] = n;
    return this;
  }
  setXYZW(e, t, r, n, a) {
    e *= this.itemSize;
    if (this.normalized) {
      t = normalize(t, this.array);
      r = normalize(r, this.array);
      n = normalize(n, this.array);
      a = normalize(a, this.array);
    }
    this.array[e + 0] = t;
    this.array[e + 1] = r;
    this.array[e + 2] = n;
    this.array[e + 3] = a;
    return this;
  }
  onUpload(e) {
    this.onUploadCallback = e;
    return this;
  }
  clone() {
    return new this.constructor(this.array, this.itemSize).copy(this);
  }
  toJSON() {
    const e = {
      itemSize: this.itemSize,
      type: this.array.constructor.name,
      array: Array.from(this.array),
      normalized: this.normalized
    };
    if (this.name !== "") {
      e.name = this.name;
    }
    if (this.usage !== StaticDrawUsage) {
      e.usage = this.usage;
    }
    if (this.updateRange.offset !== 0 || this.updateRange.count !== -1) {
      e.updateRange = this.updateRange;
    }
    return e;
  }
}
class Uint16BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint16Array(e), t, r);
  }
}
class Uint32BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Uint32Array(e), t, r);
  }
}
class Float32BufferAttribute extends BufferAttribute {
  constructor(e, t, r) {
    super(new Float32Array(e), t, r);
  }
}
let _id$2 = 0;
const _m1 = new Matrix4();
const _obj = new Object3D();
const _offset = new Vector3();
const _box$1 = new Box3();
const _boxMorphTargets = new Box3();
const _vector$7 = new Vector3();
class BufferGeometry extends EventDispatcher {
  constructor() {
    super();
    this.isBufferGeometry = true;
    Object.defineProperty(this, "id", {
      value: _id$2++
    });
    this.uuid = generateUUID();
    this.name = "";
    this.type = "BufferGeometry";
    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.morphTargetsRelative = false;
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null;
    this.drawRange = {
      start: 0,
      count: Infinity
    };
    this.userData = {};
  }
  getIndex() {
    return this.index;
  }
  setIndex(e) {
    if (Array.isArray(e)) {
      this.index = new (arrayNeedsUint32(e) ? Uint32BufferAttribute : Uint16BufferAttribute)(e, 1);
    } else {
      this.index = e;
    }
    return this;
  }
  getAttribute(e) {
    return this.attributes[e];
  }
  setAttribute(e, t) {
    this.attributes[e] = t;
    return this;
  }
  deleteAttribute(e) {
    delete this.attributes[e];
    return this;
  }
  hasAttribute(e) {
    return this.attributes[e] !== undefined;
  }
  addGroup(e, t, r = 0) {
    this.groups.push({
      start: e,
      count: t,
      materialIndex: r
    });
  }
  clearGroups() {
    this.groups = [];
  }
  setDrawRange(e, t) {
    this.drawRange.start = e;
    this.drawRange.count = t;
  }
  applyMatrix4(e) {
    const t = this.attributes.position;
    if (t !== undefined) {
      t.applyMatrix4(e);
      t.needsUpdate = true;
    }
    const r = this.attributes.normal;
    if (r !== undefined) {
      const a = new Matrix3().getNormalMatrix(e);
      r.applyNormalMatrix(a);
      r.needsUpdate = true;
    }
    const n = this.attributes.tangent;
    if (n !== undefined) {
      n.transformDirection(e);
      n.needsUpdate = true;
    }
    if (this.boundingBox !== null) {
      this.computeBoundingBox();
    }
    if (this.boundingSphere !== null) {
      this.computeBoundingSphere();
    }
    return this;
  }
  applyQuaternion(e) {
    _m1.makeRotationFromQuaternion(e);
    this.applyMatrix4(_m1);
    return this;
  }
  rotateX(e) {
    _m1.makeRotationX(e);
    this.applyMatrix4(_m1);
    return this;
  }
  rotateY(e) {
    _m1.makeRotationY(e);
    this.applyMatrix4(_m1);
    return this;
  }
  rotateZ(e) {
    _m1.makeRotationZ(e);
    this.applyMatrix4(_m1);
    return this;
  }
  translate(e, t, r) {
    _m1.makeTranslation(e, t, r);
    this.applyMatrix4(_m1);
    return this;
  }
  scale(e, t, r) {
    _m1.makeScale(e, t, r);
    this.applyMatrix4(_m1);
    return this;
  }
  lookAt(e) {
    _obj.lookAt(e);
    _obj.updateMatrix();
    this.applyMatrix4(_obj.matrix);
    return this;
  }
  center() {
    this.computeBoundingBox();
    this.boundingBox.getCenter(_offset).negate();
    this.translate(_offset.x, _offset.y, _offset.z);
    return this;
  }
  setFromPoints(e) {
    const t = [];
    for (let r = 0, n = e.length; r < n; r++) {
      const a = e[r];
      t.push(a.x, a.y, a.z || 0);
    }
    this.setAttribute("position", new Float32BufferAttribute(t, 3));
    return this;
  }
  computeBoundingBox() {
    if (this.boundingBox === null) {
      this.boundingBox = new Box3();
    }
    const e = this.attributes.position;
    const t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): GLBufferAttribute requires a manual bounding box. Alternatively set \"mesh.frustumCulled\" to \"false\".", this);
      this.boundingBox.set(new Vector3(-Infinity, -Infinity, -Infinity), new Vector3(Infinity, Infinity, Infinity));
      return;
    }
    if (e !== undefined) {
      this.boundingBox.setFromBufferAttribute(e);
      if (t) {
        for (let r = 0, n = t.length; r < n; r++) {
          const a = t[r];
          _box$1.setFromBufferAttribute(a);
          if (this.morphTargetsRelative) {
            _vector$7.addVectors(this.boundingBox.min, _box$1.min);
            this.boundingBox.expandByPoint(_vector$7);
            _vector$7.addVectors(this.boundingBox.max, _box$1.max);
            this.boundingBox.expandByPoint(_vector$7);
          } else {
            this.boundingBox.expandByPoint(_box$1.min);
            this.boundingBox.expandByPoint(_box$1.max);
          }
        }
      }
    } else {
      this.boundingBox.makeEmpty();
    }
    if (isNaN(this.boundingBox.min.x) || isNaN(this.boundingBox.min.y) || isNaN(this.boundingBox.min.z)) {
      console.error("THREE.BufferGeometry.computeBoundingBox(): Computed min/max have NaN values. The \"position\" attribute is likely to have NaN values.", this);
    }
  }
  computeBoundingSphere() {
    if (this.boundingSphere === null) {
      this.boundingSphere = new Sphere();
    }
    const e = this.attributes.position;
    const t = this.morphAttributes.position;
    if (e && e.isGLBufferAttribute) {
      console.error("THREE.BufferGeometry.computeBoundingSphere(): GLBufferAttribute requires a manual bounding sphere. Alternatively set \"mesh.frustumCulled\" to \"false\".", this);
      this.boundingSphere.set(new Vector3(), Infinity);
      return;
    }
    if (e) {
      const r = this.boundingSphere.center;
      _box$1.setFromBufferAttribute(e);
      if (t) {
        for (let a = 0, l = t.length; a < l; a++) {
          const c = t[a];
          _boxMorphTargets.setFromBufferAttribute(c);
          if (this.morphTargetsRelative) {
            _vector$7.addVectors(_box$1.min, _boxMorphTargets.min);
            _box$1.expandByPoint(_vector$7);
            _vector$7.addVectors(_box$1.max, _boxMorphTargets.max);
            _box$1.expandByPoint(_vector$7);
          } else {
            _box$1.expandByPoint(_boxMorphTargets.min);
            _box$1.expandByPoint(_boxMorphTargets.max);
          }
        }
      }
      _box$1.getCenter(r);
      let n = 0;
      for (let a = 0, l = e.count; a < l; a++) {
        _vector$7.fromBufferAttribute(e, a);
        n = Math.max(n, r.distanceToSquared(_vector$7));
      }
      if (t) {
        for (let a = 0, l = t.length; a < l; a++) {
          const c = t[a];
          const u = this.morphTargetsRelative;
          for (let f = 0, p = c.count; f < p; f++) {
            _vector$7.fromBufferAttribute(c, f);
            if (u) {
              _offset.fromBufferAttribute(e, f);
              _vector$7.add(_offset);
            }
            n = Math.max(n, r.distanceToSquared(_vector$7));
          }
        }
      }
      this.boundingSphere.radius = Math.sqrt(n);
      if (isNaN(this.boundingSphere.radius)) {
        console.error("THREE.BufferGeometry.computeBoundingSphere(): Computed radius is NaN. The \"position\" attribute is likely to have NaN values.", this);
      }
    }
  }
  computeTangents() {
    const e = this.index;
    const t = this.attributes;
    if (e === null || t.position === undefined || t.normal === undefined || t.uv === undefined) {
      console.error("THREE.BufferGeometry: .computeTangents() failed. Missing required attributes (index, position, normal or uv)");
      return;
    }
    const r = e.array;
    const n = t.position.array;
    const a = t.normal.array;
    const l = t.uv.array;
    const c = n.length / 3;
    if (this.hasAttribute("tangent") === false) {
      this.setAttribute("tangent", new BufferAttribute(new Float32Array(c * 4), 4));
    }
    const u = this.getAttribute("tangent").array;
    const f = [];
    const p = [];
    for (let D = 0; D < c; D++) {
      f[D] = new Vector3();
      p[D] = new Vector3();
    }
    const g = new Vector3();
    const v = new Vector3();
    const _ = new Vector3();
    const T = new Vector2();
    const M = new Vector2();
    const S = new Vector2();
    const b = new Vector3();
    const C = new Vector3();
    function w(D, ne, re) {
      g.fromArray(n, D * 3);
      v.fromArray(n, ne * 3);
      _.fromArray(n, re * 3);
      T.fromArray(l, D * 2);
      M.fromArray(l, ne * 2);
      S.fromArray(l, re * 2);
      v.sub(g);
      _.sub(g);
      M.sub(T);
      S.sub(T);
      const ce = 1 / (M.x * S.y - S.x * M.y);
      if (isFinite(ce)) {
        b.copy(v).multiplyScalar(S.y).addScaledVector(_, -M.y).multiplyScalar(ce);
        C.copy(_).multiplyScalar(M.x).addScaledVector(v, -S.x).multiplyScalar(ce);
        f[D].add(b);
        f[ne].add(b);
        f[re].add(b);
        p[D].add(C);
        p[ne].add(C);
        p[re].add(C);
      }
    }
    let R = this.groups;
    if (R.length === 0) {
      R = [{
        start: 0,
        count: r.length
      }];
    }
    for (let D = 0, ne = R.length; D < ne; ++D) {
      const re = R[D];
      const ce = re.start;
      const z = re.count;
      for (let j = ce, X = ce + z; j < X; j += 3) {
        w(r[j + 0], r[j + 1], r[j + 2]);
      }
    }
    const E = new Vector3();
    const I = new Vector3();
    const F = new Vector3();
    const k = new Vector3();
    function L(D) {
      F.fromArray(a, D * 3);
      k.copy(F);
      const ne = f[D];
      E.copy(ne);
      E.sub(F.multiplyScalar(F.dot(ne))).normalize();
      I.crossVectors(k, ne);
      const ce = I.dot(p[D]) < 0 ? -1 : 1;
      u[D * 4] = E.x;
      u[D * 4 + 1] = E.y;
      u[D * 4 + 2] = E.z;
      u[D * 4 + 3] = ce;
    }
    for (let D = 0, ne = R.length; D < ne; ++D) {
      const re = R[D];
      const ce = re.start;
      const z = re.count;
      for (let j = ce, X = ce + z; j < X; j += 3) {
        L(r[j + 0]);
        L(r[j + 1]);
        L(r[j + 2]);
      }
    }
  }
  computeVertexNormals() {
    const e = this.index;
    const t = this.getAttribute("position");
    if (t !== undefined) {
      let r = this.getAttribute("normal");
      if (r === undefined) {
        r = new BufferAttribute(new Float32Array(t.count * 3), 3);
        this.setAttribute("normal", r);
      } else {
        for (let v = 0, _ = r.count; v < _; v++) {
          r.setXYZ(v, 0, 0, 0);
        }
      }
      const n = new Vector3();
      const a = new Vector3();
      const l = new Vector3();
      const c = new Vector3();
      const u = new Vector3();
      const f = new Vector3();
      const p = new Vector3();
      const g = new Vector3();
      if (e) {
        for (let v = 0, _ = e.count; v < _; v += 3) {
          const T = e.getX(v + 0);
          const M = e.getX(v + 1);
          const S = e.getX(v + 2);
          n.fromBufferAttribute(t, T);
          a.fromBufferAttribute(t, M);
          l.fromBufferAttribute(t, S);
          p.subVectors(l, a);
          g.subVectors(n, a);
          p.cross(g);
          c.fromBufferAttribute(r, T);
          u.fromBufferAttribute(r, M);
          f.fromBufferAttribute(r, S);
          c.add(p);
          u.add(p);
          f.add(p);
          r.setXYZ(T, c.x, c.y, c.z);
          r.setXYZ(M, u.x, u.y, u.z);
          r.setXYZ(S, f.x, f.y, f.z);
        }
      } else {
        for (let v = 0, _ = t.count; v < _; v += 3) {
          n.fromBufferAttribute(t, v + 0);
          a.fromBufferAttribute(t, v + 1);
          l.fromBufferAttribute(t, v + 2);
          p.subVectors(l, a);
          g.subVectors(n, a);
          p.cross(g);
          r.setXYZ(v + 0, p.x, p.y, p.z);
          r.setXYZ(v + 1, p.x, p.y, p.z);
          r.setXYZ(v + 2, p.x, p.y, p.z);
        }
      }
      this.normalizeNormals();
      r.needsUpdate = true;
    }
  }
  normalizeNormals() {
    const e = this.attributes.normal;
    for (let t = 0, r = e.count; t < r; t++) {
      _vector$7.fromBufferAttribute(e, t);
      _vector$7.normalize();
      e.setXYZ(t, _vector$7.x, _vector$7.y, _vector$7.z);
    }
  }
  toNonIndexed() {
    function e(c, u) {
      const f = c.array;
      const p = c.itemSize;
      const g = c.normalized;
      const v = new f.constructor(u.length * p);
      let _ = 0;
      let T = 0;
      for (let M = 0, S = u.length; M < S; M++) {
        if (c.isInterleavedBufferAttribute) {
          _ = u[M] * c.data.stride + c.offset;
        } else {
          _ = u[M] * p;
        }
        for (let b = 0; b < p; b++) {
          v[T++] = f[_++];
        }
      }
      return new BufferAttribute(v, p, g);
    }
    if (this.index === null) {
      console.warn("THREE.BufferGeometry.toNonIndexed(): BufferGeometry is already non-indexed.");
      return this;
    }
    const t = new BufferGeometry();
    const r = this.index.array;
    const n = this.attributes;
    for (const c in n) {
      const u = n[c];
      const f = e(u, r);
      t.setAttribute(c, f);
    }
    const a = this.morphAttributes;
    for (const c in a) {
      const u = [];
      const f = a[c];
      for (let p = 0, g = f.length; p < g; p++) {
        const v = f[p];
        const _ = e(v, r);
        u.push(_);
      }
      t.morphAttributes[c] = u;
    }
    t.morphTargetsRelative = this.morphTargetsRelative;
    const l = this.groups;
    for (let c = 0, u = l.length; c < u; c++) {
      const f = l[c];
      t.addGroup(f.start, f.count, f.materialIndex);
    }
    return t;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "BufferGeometry",
        generator: "BufferGeometry.toJSON"
      }
    };
    e.uuid = this.uuid;
    e.type = this.type;
    if (this.name !== "") {
      e.name = this.name;
    }
    if (Object.keys(this.userData).length > 0) {
      e.userData = this.userData;
    }
    if (this.parameters !== undefined) {
      const u = this.parameters;
      for (const f in u) {
        if (u[f] !== undefined) {
          e[f] = u[f];
        }
      }
      return e;
    }
    e.data = {
      attributes: {}
    };
    const t = this.index;
    if (t !== null) {
      e.data.index = {
        type: t.array.constructor.name,
        array: Array.prototype.slice.call(t.array)
      };
    }
    const r = this.attributes;
    for (const u in r) {
      const f = r[u];
      e.data.attributes[u] = f.toJSON(e.data);
    }
    const n = {};
    let a = false;
    for (const u in this.morphAttributes) {
      const f = this.morphAttributes[u];
      const p = [];
      for (let g = 0, v = f.length; g < v; g++) {
        const _ = f[g];
        p.push(_.toJSON(e.data));
      }
      if (p.length > 0) {
        n[u] = p;
        a = true;
      }
    }
    if (a) {
      e.data.morphAttributes = n;
      e.data.morphTargetsRelative = this.morphTargetsRelative;
    }
    const l = this.groups;
    if (l.length > 0) {
      e.data.groups = JSON.parse(JSON.stringify(l));
    }
    const c = this.boundingSphere;
    if (c !== null) {
      e.data.boundingSphere = {
        center: c.center.toArray(),
        radius: c.radius
      };
    }
    return e;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.index = null;
    this.attributes = {};
    this.morphAttributes = {};
    this.groups = [];
    this.boundingBox = null;
    this.boundingSphere = null;
    const t = {};
    this.name = e.name;
    const r = e.index;
    if (r !== null) {
      this.setIndex(r.clone(t));
    }
    const n = e.attributes;
    for (const f in n) {
      const p = n[f];
      this.setAttribute(f, p.clone(t));
    }
    const a = e.morphAttributes;
    for (const f in a) {
      const p = [];
      const g = a[f];
      for (let v = 0, _ = g.length; v < _; v++) {
        p.push(g[v].clone(t));
      }
      this.morphAttributes[f] = p;
    }
    this.morphTargetsRelative = e.morphTargetsRelative;
    const l = e.groups;
    for (let f = 0, p = l.length; f < p; f++) {
      const g = l[f];
      this.addGroup(g.start, g.count, g.materialIndex);
    }
    const c = e.boundingBox;
    if (c !== null) {
      this.boundingBox = c.clone();
    }
    const u = e.boundingSphere;
    if (u !== null) {
      this.boundingSphere = u.clone();
    }
    this.drawRange.start = e.drawRange.start;
    this.drawRange.count = e.drawRange.count;
    this.userData = e.userData;
    return this;
  }
  dispose() {
    this.dispatchEvent({
      type: "dispose"
    });
  }
}
const _inverseMatrix$3 = new Matrix4();
const _ray$3 = new Ray();
const _sphere$5 = new Sphere();
const _sphereHitAt = new Vector3();
const _vA$1 = new Vector3();
const _vB$1 = new Vector3();
const _vC$1 = new Vector3();
const _tempA = new Vector3();
const _morphA = new Vector3();
const _uvA$1 = new Vector2();
const _uvB$1 = new Vector2();
const _uvC$1 = new Vector2();
const _normalA = new Vector3();
const _normalB = new Vector3();
const _normalC = new Vector3();
const _intersectionPoint = new Vector3();
const _intersectionPointWorld = new Vector3();
class Mesh extends Object3D {
  constructor(e = new BufferGeometry(), t = new MeshBasicMaterial()) {
    super();
    this.isMesh = true;
    this.type = "Mesh";
    this.geometry = e;
    this.material = t;
    this.updateMorphTargets();
  }
  copy(e, t) {
    super.copy(e, t);
    if (e.morphTargetInfluences !== undefined) {
      this.morphTargetInfluences = e.morphTargetInfluences.slice();
    }
    if (e.morphTargetDictionary !== undefined) {
      this.morphTargetDictionary = Object.assign({}, e.morphTargetDictionary);
    }
    this.material = Array.isArray(e.material) ? e.material.slice() : e.material;
    this.geometry = e.geometry;
    return this;
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes;
    const r = Object.keys(t);
    if (r.length > 0) {
      const n = t[r[0]];
      if (n !== undefined) {
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (let a = 0, l = n.length; a < l; a++) {
          const c = n[a].name || String(a);
          this.morphTargetInfluences.push(0);
          this.morphTargetDictionary[c] = a;
        }
      }
    }
  }
  getVertexPosition(e, t) {
    const r = this.geometry;
    const n = r.attributes.position;
    const a = r.morphAttributes.position;
    const l = r.morphTargetsRelative;
    t.fromBufferAttribute(n, e);
    const c = this.morphTargetInfluences;
    if (a && c) {
      _morphA.set(0, 0, 0);
      for (let u = 0, f = a.length; u < f; u++) {
        const p = c[u];
        const g = a[u];
        if (p !== 0) {
          _tempA.fromBufferAttribute(g, e);
          if (l) {
            _morphA.addScaledVector(_tempA, p);
          } else {
            _morphA.addScaledVector(_tempA.sub(t), p);
          }
        }
      }
      t.add(_morphA);
    }
    return t;
  }
  raycast(e, t) {
    const r = this.geometry;
    const n = this.material;
    const a = this.matrixWorld;
    if (n !== undefined) {
      if (r.boundingSphere === null) {
        r.computeBoundingSphere();
      }
      _sphere$5.copy(r.boundingSphere);
      _sphere$5.applyMatrix4(a);
      _ray$3.copy(e.ray).recast(e.near);
      if (_sphere$5.containsPoint(_ray$3.origin) !== false || _ray$3.intersectSphere(_sphere$5, _sphereHitAt) !== null && !(_ray$3.origin.distanceToSquared(_sphereHitAt) > (e.far - e.near) ** 2)) {
        _inverseMatrix$3.copy(a).invert();
        _ray$3.copy(e.ray).applyMatrix4(_inverseMatrix$3);
        if (r.boundingBox === null || _ray$3.intersectsBox(r.boundingBox) !== false) {
          this._computeIntersections(e, t, _ray$3);
        }
      }
    }
  }
  _computeIntersections(e, t, r) {
    let n;
    const a = this.geometry;
    const l = this.material;
    const c = a.index;
    const u = a.attributes.position;
    const f = a.attributes.uv;
    const p = a.attributes.uv1;
    const g = a.attributes.normal;
    const v = a.groups;
    const _ = a.drawRange;
    if (c !== null) {
      if (Array.isArray(l)) {
        for (let T = 0, M = v.length; T < M; T++) {
          const S = v[T];
          const b = l[S.materialIndex];
          const C = Math.max(S.start, _.start);
          const w = Math.min(c.count, Math.min(S.start + S.count, _.start + _.count));
          for (let R = C, E = w; R < E; R += 3) {
            const I = c.getX(R);
            const F = c.getX(R + 1);
            const k = c.getX(R + 2);
            n = checkGeometryIntersection(this, b, e, r, f, p, g, I, F, k);
            if (n) {
              n.faceIndex = Math.floor(R / 3);
              n.face.materialIndex = S.materialIndex;
              t.push(n);
            }
          }
        }
      } else {
        const T = Math.max(0, _.start);
        const M = Math.min(c.count, _.start + _.count);
        for (let S = T, b = M; S < b; S += 3) {
          const C = c.getX(S);
          const w = c.getX(S + 1);
          const R = c.getX(S + 2);
          n = checkGeometryIntersection(this, l, e, r, f, p, g, C, w, R);
          if (n) {
            n.faceIndex = Math.floor(S / 3);
            t.push(n);
          }
        }
      }
    } else if (u !== undefined) {
      if (Array.isArray(l)) {
        for (let T = 0, M = v.length; T < M; T++) {
          const S = v[T];
          const b = l[S.materialIndex];
          const C = Math.max(S.start, _.start);
          const w = Math.min(u.count, Math.min(S.start + S.count, _.start + _.count));
          for (let R = C, E = w; R < E; R += 3) {
            const I = R;
            const F = R + 1;
            const k = R + 2;
            n = checkGeometryIntersection(this, b, e, r, f, p, g, I, F, k);
            if (n) {
              n.faceIndex = Math.floor(R / 3);
              n.face.materialIndex = S.materialIndex;
              t.push(n);
            }
          }
        }
      } else {
        const T = Math.max(0, _.start);
        const M = Math.min(u.count, _.start + _.count);
        for (let S = T, b = M; S < b; S += 3) {
          const C = S;
          const w = S + 1;
          const R = S + 2;
          n = checkGeometryIntersection(this, l, e, r, f, p, g, C, w, R);
          if (n) {
            n.faceIndex = Math.floor(S / 3);
            t.push(n);
          }
        }
      }
    }
  }
}
function checkIntersection(o, e, t, r, n, a, l, c) {
  let u;
  if (e.side === BackSide) {
    u = r.intersectTriangle(l, a, n, true, c);
  } else {
    u = r.intersectTriangle(n, a, l, e.side === FrontSide, c);
  }
  if (u === null) {
    return null;
  }
  _intersectionPointWorld.copy(c);
  _intersectionPointWorld.applyMatrix4(o.matrixWorld);
  const f = t.ray.origin.distanceTo(_intersectionPointWorld);
  if (f < t.near || f > t.far) {
    return null;
  } else {
    return {
      distance: f,
      point: _intersectionPointWorld.clone(),
      object: o
    };
  }
}
function checkGeometryIntersection(o, e, t, r, n, a, l, c, u, f) {
  o.getVertexPosition(c, _vA$1);
  o.getVertexPosition(u, _vB$1);
  o.getVertexPosition(f, _vC$1);
  const p = checkIntersection(o, e, t, r, _vA$1, _vB$1, _vC$1, _intersectionPoint);
  if (p) {
    if (n) {
      _uvA$1.fromBufferAttribute(n, c);
      _uvB$1.fromBufferAttribute(n, u);
      _uvC$1.fromBufferAttribute(n, f);
      p.uv = Triangle.getInterpolation(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2());
    }
    if (a) {
      _uvA$1.fromBufferAttribute(a, c);
      _uvB$1.fromBufferAttribute(a, u);
      _uvC$1.fromBufferAttribute(a, f);
      p.uv1 = Triangle.getInterpolation(_intersectionPoint, _vA$1, _vB$1, _vC$1, _uvA$1, _uvB$1, _uvC$1, new Vector2());
      p.uv2 = p.uv1;
    }
    if (l) {
      _normalA.fromBufferAttribute(l, c);
      _normalB.fromBufferAttribute(l, u);
      _normalC.fromBufferAttribute(l, f);
      p.normal = Triangle.getInterpolation(_intersectionPoint, _vA$1, _vB$1, _vC$1, _normalA, _normalB, _normalC, new Vector3());
      if (p.normal.dot(r.direction) > 0) {
        p.normal.multiplyScalar(-1);
      }
    }
    const g = {
      a: c,
      b: u,
      c: f,
      normal: new Vector3(),
      materialIndex: 0
    };
    Triangle.getNormal(_vA$1, _vB$1, _vC$1, g.normal);
    p.face = g;
  }
  return p;
}
class BoxGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, r = 1, n = 1, a = 1, l = 1) {
    super();
    this.type = "BoxGeometry";
    this.parameters = {
      width: e,
      height: t,
      depth: r,
      widthSegments: n,
      heightSegments: a,
      depthSegments: l
    };
    const c = this;
    n = Math.floor(n);
    a = Math.floor(a);
    l = Math.floor(l);
    const u = [];
    const f = [];
    const p = [];
    const g = [];
    let v = 0;
    let _ = 0;
    T("z", "y", "x", -1, -1, r, t, e, l, a, 0);
    T("z", "y", "x", 1, -1, r, t, -e, l, a, 1);
    T("x", "z", "y", 1, 1, e, r, t, n, l, 2);
    T("x", "z", "y", 1, -1, e, r, -t, n, l, 3);
    T("x", "y", "z", 1, -1, e, t, r, n, a, 4);
    T("x", "y", "z", -1, -1, e, t, -r, n, a, 5);
    this.setIndex(u);
    this.setAttribute("position", new Float32BufferAttribute(f, 3));
    this.setAttribute("normal", new Float32BufferAttribute(p, 3));
    this.setAttribute("uv", new Float32BufferAttribute(g, 2));
    function T(M, S, b, C, w, R, E, I, F, k, L) {
      const D = R / F;
      const ne = E / k;
      const re = R / 2;
      const ce = E / 2;
      const z = I / 2;
      const j = F + 1;
      const X = k + 1;
      let Z = 0;
      let q = 0;
      const ue = new Vector3();
      for (let oe = 0; oe < X; oe++) {
        const te = oe * ne - ce;
        for (let le = 0; le < j; le++) {
          const Te = le * D - re;
          ue[M] = Te * C;
          ue[S] = te * w;
          ue[b] = z;
          f.push(ue.x, ue.y, ue.z);
          ue[M] = 0;
          ue[S] = 0;
          ue[b] = I > 0 ? 1 : -1;
          p.push(ue.x, ue.y, ue.z);
          g.push(le / F);
          g.push(1 - oe / k);
          Z += 1;
        }
      }
      for (let oe = 0; oe < k; oe++) {
        for (let te = 0; te < F; te++) {
          const le = v + te + j * oe;
          const Te = v + te + j * (oe + 1);
          const K = v + (te + 1) + j * (oe + 1);
          const G = v + (te + 1) + j * oe;
          u.push(le, Te, G);
          u.push(Te, K, G);
          q += 6;
        }
      }
      c.addGroup(_, q, L);
      _ += q;
      v += Z;
    }
  }
  copy(e) {
    super.copy(e);
    this.parameters = Object.assign({}, e.parameters);
    return this;
  }
  static fromJSON(e) {
    return new BoxGeometry(e.width, e.height, e.depth, e.widthSegments, e.heightSegments, e.depthSegments);
  }
}
function cloneUniforms(o) {
  const e = {};
  for (const t in o) {
    e[t] = {};
    for (const r in o[t]) {
      const n = o[t][r];
      if (n && (n.isColor || n.isMatrix3 || n.isMatrix4 || n.isVector2 || n.isVector3 || n.isVector4 || n.isTexture || n.isQuaternion)) {
        if (n.isRenderTargetTexture) {
          console.warn("UniformsUtils: Textures of render targets cannot be cloned via cloneUniforms() or mergeUniforms().");
          e[t][r] = null;
        } else {
          e[t][r] = n.clone();
        }
      } else if (Array.isArray(n)) {
        e[t][r] = n.slice();
      } else {
        e[t][r] = n;
      }
    }
  }
  return e;
}
function mergeUniforms(o) {
  const e = {};
  for (let t = 0; t < o.length; t++) {
    const r = cloneUniforms(o[t]);
    for (const n in r) {
      e[n] = r[n];
    }
  }
  return e;
}
function cloneUniformsGroups(o) {
  const e = [];
  for (let t = 0; t < o.length; t++) {
    e.push(o[t].clone());
  }
  return e;
}
function getUnlitUniformColorSpace(o) {
  if (o.getRenderTarget() === null) {
    return o.outputColorSpace;
  } else {
    return ColorManagement.workingColorSpace;
  }
}
const UniformsUtils = {
  clone: cloneUniforms,
  merge: mergeUniforms
};
var default_vertex = `void main() {
	gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
}`;
var default_fragment = `void main() {
	gl_FragColor = vec4( 1.0, 0.0, 0.0, 1.0 );
}`;
class ShaderMaterial extends Material {
  constructor(e) {
    super();
    this.isShaderMaterial = true;
    this.type = "ShaderMaterial";
    this.defines = {};
    this.uniforms = {};
    this.uniformsGroups = [];
    this.vertexShader = default_vertex;
    this.fragmentShader = default_fragment;
    this.linewidth = 1;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.fog = false;
    this.lights = false;
    this.clipping = false;
    this.forceSinglePass = true;
    this.extensions = {
      derivatives: false,
      fragDepth: false,
      drawBuffers: false,
      shaderTextureLOD: false
    };
    this.defaultAttributeValues = {
      color: [1, 1, 1],
      uv: [0, 0],
      uv1: [0, 0]
    };
    this.index0AttributeName = undefined;
    this.uniformsNeedUpdate = false;
    this.glslVersion = null;
    if (e !== undefined) {
      this.setValues(e);
    }
  }
  copy(e) {
    super.copy(e);
    this.fragmentShader = e.fragmentShader;
    this.vertexShader = e.vertexShader;
    this.uniforms = cloneUniforms(e.uniforms);
    this.uniformsGroups = cloneUniformsGroups(e.uniformsGroups);
    this.defines = Object.assign({}, e.defines);
    this.wireframe = e.wireframe;
    this.wireframeLinewidth = e.wireframeLinewidth;
    this.fog = e.fog;
    this.lights = e.lights;
    this.clipping = e.clipping;
    this.extensions = Object.assign({}, e.extensions);
    this.glslVersion = e.glslVersion;
    return this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.glslVersion = this.glslVersion;
    t.uniforms = {};
    for (const n in this.uniforms) {
      const l = this.uniforms[n].value;
      if (l && l.isTexture) {
        t.uniforms[n] = {
          type: "t",
          value: l.toJSON(e).uuid
        };
      } else if (l && l.isColor) {
        t.uniforms[n] = {
          type: "c",
          value: l.getHex()
        };
      } else if (l && l.isVector2) {
        t.uniforms[n] = {
          type: "v2",
          value: l.toArray()
        };
      } else if (l && l.isVector3) {
        t.uniforms[n] = {
          type: "v3",
          value: l.toArray()
        };
      } else if (l && l.isVector4) {
        t.uniforms[n] = {
          type: "v4",
          value: l.toArray()
        };
      } else if (l && l.isMatrix3) {
        t.uniforms[n] = {
          type: "m3",
          value: l.toArray()
        };
      } else if (l && l.isMatrix4) {
        t.uniforms[n] = {
          type: "m4",
          value: l.toArray()
        };
      } else {
        t.uniforms[n] = {
          value: l
        };
      }
    }
    if (Object.keys(this.defines).length > 0) {
      t.defines = this.defines;
    }
    t.vertexShader = this.vertexShader;
    t.fragmentShader = this.fragmentShader;
    t.lights = this.lights;
    t.clipping = this.clipping;
    const r = {};
    for (const n in this.extensions) {
      if (this.extensions[n] === true) {
        r[n] = true;
      }
    }
    if (Object.keys(r).length > 0) {
      t.extensions = r;
    }
    return t;
  }
}
class Camera extends Object3D {
  constructor() {
    super();
    this.isCamera = true;
    this.type = "Camera";
    this.matrixWorldInverse = new Matrix4();
    this.projectionMatrix = new Matrix4();
    this.projectionMatrixInverse = new Matrix4();
    this.coordinateSystem = WebGLCoordinateSystem;
  }
  copy(e, t) {
    super.copy(e, t);
    this.matrixWorldInverse.copy(e.matrixWorldInverse);
    this.projectionMatrix.copy(e.projectionMatrix);
    this.projectionMatrixInverse.copy(e.projectionMatrixInverse);
    this.coordinateSystem = e.coordinateSystem;
    return this;
  }
  getWorldDirection(e) {
    return super.getWorldDirection(e).negate();
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e);
    this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  updateWorldMatrix(e, t) {
    super.updateWorldMatrix(e, t);
    this.matrixWorldInverse.copy(this.matrixWorld).invert();
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
class PerspectiveCamera extends Camera {
  constructor(e = 50, t = 1, r = 0.1, n = 2000) {
    super();
    this.isPerspectiveCamera = true;
    this.type = "PerspectiveCamera";
    this.fov = e;
    this.zoom = 1;
    this.near = r;
    this.far = n;
    this.focus = 10;
    this.aspect = t;
    this.view = null;
    this.filmGauge = 35;
    this.filmOffset = 0;
    this.updateProjectionMatrix();
  }
  copy(e, t) {
    super.copy(e, t);
    this.fov = e.fov;
    this.zoom = e.zoom;
    this.near = e.near;
    this.far = e.far;
    this.focus = e.focus;
    this.aspect = e.aspect;
    this.view = e.view === null ? null : Object.assign({}, e.view);
    this.filmGauge = e.filmGauge;
    this.filmOffset = e.filmOffset;
    return this;
  }
  setFocalLength(e) {
    const t = this.getFilmHeight() * 0.5 / e;
    this.fov = RAD2DEG * 2 * Math.atan(t);
    this.updateProjectionMatrix();
  }
  getFocalLength() {
    const e = Math.tan(DEG2RAD * 0.5 * this.fov);
    return this.getFilmHeight() * 0.5 / e;
  }
  getEffectiveFOV() {
    return RAD2DEG * 2 * Math.atan(Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom);
  }
  getFilmWidth() {
    return this.filmGauge * Math.min(this.aspect, 1);
  }
  getFilmHeight() {
    return this.filmGauge / Math.max(this.aspect, 1);
  }
  setViewOffset(e, t, r, n, a, l) {
    this.aspect = e / t;
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = e;
    this.view.fullHeight = t;
    this.view.offsetX = r;
    this.view.offsetY = n;
    this.view.width = a;
    this.view.height = l;
    this.updateProjectionMatrix();
  }
  clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = this.near;
    let t = e * Math.tan(DEG2RAD * 0.5 * this.fov) / this.zoom;
    let r = t * 2;
    let n = this.aspect * r;
    let a = n * -0.5;
    const l = this.view;
    if (this.view !== null && this.view.enabled) {
      const u = l.fullWidth;
      const f = l.fullHeight;
      a += l.offsetX * n / u;
      t -= l.offsetY * r / f;
      n *= l.width / u;
      r *= l.height / f;
    }
    const c = this.filmOffset;
    if (c !== 0) {
      a += e * c / this.getFilmWidth();
    }
    this.projectionMatrix.makePerspective(a, a + n, t, t - r, e, this.far, this.coordinateSystem);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.object.fov = this.fov;
    t.object.zoom = this.zoom;
    t.object.near = this.near;
    t.object.far = this.far;
    t.object.focus = this.focus;
    t.object.aspect = this.aspect;
    if (this.view !== null) {
      t.object.view = Object.assign({}, this.view);
    }
    t.object.filmGauge = this.filmGauge;
    t.object.filmOffset = this.filmOffset;
    return t;
  }
}
const fov = -90;
const aspect = 1;
class CubeCamera extends Object3D {
  constructor(e, t, r) {
    super();
    this.type = "CubeCamera";
    this.renderTarget = r;
    this.coordinateSystem = null;
    this.activeMipmapLevel = 0;
    const n = new PerspectiveCamera(fov, aspect, e, t);
    n.layers = this.layers;
    this.add(n);
    const a = new PerspectiveCamera(fov, aspect, e, t);
    a.layers = this.layers;
    this.add(a);
    const l = new PerspectiveCamera(fov, aspect, e, t);
    l.layers = this.layers;
    this.add(l);
    const c = new PerspectiveCamera(fov, aspect, e, t);
    c.layers = this.layers;
    this.add(c);
    const u = new PerspectiveCamera(fov, aspect, e, t);
    u.layers = this.layers;
    this.add(u);
    const f = new PerspectiveCamera(fov, aspect, e, t);
    f.layers = this.layers;
    this.add(f);
  }
  updateCoordinateSystem() {
    const e = this.coordinateSystem;
    const t = this.children.concat();
    const [r, n, a, l, c, u] = t;
    for (const f of t) {
      this.remove(f);
    }
    if (e === WebGLCoordinateSystem) {
      r.up.set(0, 1, 0);
      r.lookAt(1, 0, 0);
      n.up.set(0, 1, 0);
      n.lookAt(-1, 0, 0);
      a.up.set(0, 0, -1);
      a.lookAt(0, 1, 0);
      l.up.set(0, 0, 1);
      l.lookAt(0, -1, 0);
      c.up.set(0, 1, 0);
      c.lookAt(0, 0, 1);
      u.up.set(0, 1, 0);
      u.lookAt(0, 0, -1);
    } else if (e === WebGPUCoordinateSystem) {
      r.up.set(0, -1, 0);
      r.lookAt(-1, 0, 0);
      n.up.set(0, -1, 0);
      n.lookAt(1, 0, 0);
      a.up.set(0, 0, 1);
      a.lookAt(0, 1, 0);
      l.up.set(0, 0, -1);
      l.lookAt(0, -1, 0);
      c.up.set(0, -1, 0);
      c.lookAt(0, 0, 1);
      u.up.set(0, -1, 0);
      u.lookAt(0, 0, -1);
    } else {
      throw new Error("THREE.CubeCamera.updateCoordinateSystem(): Invalid coordinate system: " + e);
    }
    for (const f of t) {
      this.add(f);
      f.updateMatrixWorld();
    }
  }
  update(e, t) {
    if (this.parent === null) {
      this.updateMatrixWorld();
    }
    const {
      renderTarget: r,
      activeMipmapLevel: n
    } = this;
    if (this.coordinateSystem !== e.coordinateSystem) {
      this.coordinateSystem = e.coordinateSystem;
      this.updateCoordinateSystem();
    }
    const [a, l, c, u, f, p] = this.children;
    const g = e.getRenderTarget();
    const v = e.getActiveCubeFace();
    const _ = e.getActiveMipmapLevel();
    const T = e.xr.enabled;
    e.xr.enabled = false;
    const M = r.texture.generateMipmaps;
    r.texture.generateMipmaps = false;
    e.setRenderTarget(r, 0, n);
    e.render(t, a);
    e.setRenderTarget(r, 1, n);
    e.render(t, l);
    e.setRenderTarget(r, 2, n);
    e.render(t, c);
    e.setRenderTarget(r, 3, n);
    e.render(t, u);
    e.setRenderTarget(r, 4, n);
    e.render(t, f);
    r.texture.generateMipmaps = M;
    e.setRenderTarget(r, 5, n);
    e.render(t, p);
    e.setRenderTarget(g, v, _);
    e.xr.enabled = T;
    r.texture.needsPMREMUpdate = true;
  }
}
class CubeTexture extends Texture {
  constructor(e, t, r, n, a, l, c, u, f, p) {
    e = e !== undefined ? e : [];
    t = t !== undefined ? t : CubeReflectionMapping;
    super(e, t, r, n, a, l, c, u, f, p);
    this.isCubeTexture = true;
    this.flipY = false;
  }
  get images() {
    return this.image;
  }
  set images(e) {
    this.image = e;
  }
}
class WebGLCubeRenderTarget extends WebGLRenderTarget {
  constructor(e = 1, t = {}) {
    super(e, e, t);
    this.isWebGLCubeRenderTarget = true;
    const r = {
      width: e,
      height: e,
      depth: 1
    };
    const n = [r, r, r, r, r, r];
    if (t.encoding !== undefined) {
      warnOnce("THREE.WebGLCubeRenderTarget: option.encoding has been replaced by option.colorSpace.");
      t.colorSpace = t.encoding === sRGBEncoding ? SRGBColorSpace : NoColorSpace;
    }
    this.texture = new CubeTexture(n, t.mapping, t.wrapS, t.wrapT, t.magFilter, t.minFilter, t.format, t.type, t.anisotropy, t.colorSpace);
    this.texture.isRenderTargetTexture = true;
    this.texture.generateMipmaps = t.generateMipmaps !== undefined ? t.generateMipmaps : false;
    this.texture.minFilter = t.minFilter !== undefined ? t.minFilter : LinearFilter;
  }
  fromEquirectangularTexture(e, t) {
    this.texture.type = t.type;
    this.texture.colorSpace = t.colorSpace;
    this.texture.generateMipmaps = t.generateMipmaps;
    this.texture.minFilter = t.minFilter;
    this.texture.magFilter = t.magFilter;
    const r = {
      uniforms: {
        tEquirect: {
          value: null
        }
      },
      vertexShader: `

				varying vec3 vWorldDirection;

				vec3 transformDirection( in vec3 dir, in mat4 matrix ) {

					return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );

				}

				void main() {

					vWorldDirection = transformDirection( position, modelMatrix );

					#include <begin_vertex>
					#include <project_vertex>

				}
			`,
      fragmentShader: `

				uniform sampler2D tEquirect;

				varying vec3 vWorldDirection;

				#include <common>

				void main() {

					vec3 direction = normalize( vWorldDirection );

					vec2 sampleUV = equirectUv( direction );

					gl_FragColor = texture2D( tEquirect, sampleUV );

				}
			`
    };
    const n = new BoxGeometry(5, 5, 5);
    const a = new ShaderMaterial({
      name: "CubemapFromEquirect",
      uniforms: cloneUniforms(r.uniforms),
      vertexShader: r.vertexShader,
      fragmentShader: r.fragmentShader,
      side: BackSide,
      blending: NoBlending
    });
    a.uniforms.tEquirect.value = t;
    const l = new Mesh(n, a);
    const c = t.minFilter;
    if (t.minFilter === LinearMipmapLinearFilter) {
      t.minFilter = LinearFilter;
    }
    new CubeCamera(1, 10, this).update(e, l);
    t.minFilter = c;
    l.geometry.dispose();
    l.material.dispose();
    return this;
  }
  clear(e, t, r, n) {
    const a = e.getRenderTarget();
    for (let l = 0; l < 6; l++) {
      e.setRenderTarget(this, l);
      e.clear(t, r, n);
    }
    e.setRenderTarget(a);
  }
}
const _vector1 = new Vector3();
const _vector2 = new Vector3();
const _normalMatrix = new Matrix3();
class Plane {
  constructor(e = new Vector3(1, 0, 0), t = 0) {
    this.isPlane = true;
    this.normal = e;
    this.constant = t;
  }
  set(e, t) {
    this.normal.copy(e);
    this.constant = t;
    return this;
  }
  setComponents(e, t, r, n) {
    this.normal.set(e, t, r);
    this.constant = n;
    return this;
  }
  setFromNormalAndCoplanarPoint(e, t) {
    this.normal.copy(e);
    this.constant = -t.dot(this.normal);
    return this;
  }
  setFromCoplanarPoints(e, t, r) {
    const n = _vector1.subVectors(r, t).cross(_vector2.subVectors(e, t)).normalize();
    this.setFromNormalAndCoplanarPoint(n, e);
    return this;
  }
  copy(e) {
    this.normal.copy(e.normal);
    this.constant = e.constant;
    return this;
  }
  normalize() {
    const e = 1 / this.normal.length();
    this.normal.multiplyScalar(e);
    this.constant *= e;
    return this;
  }
  negate() {
    this.constant *= -1;
    this.normal.negate();
    return this;
  }
  distanceToPoint(e) {
    return this.normal.dot(e) + this.constant;
  }
  distanceToSphere(e) {
    return this.distanceToPoint(e.center) - e.radius;
  }
  projectPoint(e, t) {
    return t.copy(e).addScaledVector(this.normal, -this.distanceToPoint(e));
  }
  intersectLine(e, t) {
    const r = e.delta(_vector1);
    const n = this.normal.dot(r);
    if (n === 0) {
      if (this.distanceToPoint(e.start) === 0) {
        return t.copy(e.start);
      } else {
        return null;
      }
    }
    const a = -(e.start.dot(this.normal) + this.constant) / n;
    if (a < 0 || a > 1) {
      return null;
    } else {
      return t.copy(e.start).addScaledVector(r, a);
    }
  }
  intersectsLine(e) {
    const t = this.distanceToPoint(e.start);
    const r = this.distanceToPoint(e.end);
    return t < 0 && r > 0 || r < 0 && t > 0;
  }
  intersectsBox(e) {
    return e.intersectsPlane(this);
  }
  intersectsSphere(e) {
    return e.intersectsPlane(this);
  }
  coplanarPoint(e) {
    return e.copy(this.normal).multiplyScalar(-this.constant);
  }
  applyMatrix4(e, t) {
    const r = t || _normalMatrix.getNormalMatrix(e);
    const n = this.coplanarPoint(_vector1).applyMatrix4(e);
    const a = this.normal.applyMatrix3(r).normalize();
    this.constant = -n.dot(a);
    return this;
  }
  translate(e) {
    this.constant -= e.dot(this.normal);
    return this;
  }
  equals(e) {
    return e.normal.equals(this.normal) && e.constant === this.constant;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _sphere$4 = new Sphere();
const _vector$6 = new Vector3();
class Frustum {
  constructor(e = new Plane(), t = new Plane(), r = new Plane(), n = new Plane(), a = new Plane(), l = new Plane()) {
    this.planes = [e, t, r, n, a, l];
  }
  set(e, t, r, n, a, l) {
    const c = this.planes;
    c[0].copy(e);
    c[1].copy(t);
    c[2].copy(r);
    c[3].copy(n);
    c[4].copy(a);
    c[5].copy(l);
    return this;
  }
  copy(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) {
      t[r].copy(e.planes[r]);
    }
    return this;
  }
  setFromProjectionMatrix(e, t = WebGLCoordinateSystem) {
    const r = this.planes;
    const n = e.elements;
    const a = n[0];
    const l = n[1];
    const c = n[2];
    const u = n[3];
    const f = n[4];
    const p = n[5];
    const g = n[6];
    const v = n[7];
    const _ = n[8];
    const T = n[9];
    const M = n[10];
    const S = n[11];
    const b = n[12];
    const C = n[13];
    const w = n[14];
    const R = n[15];
    r[0].setComponents(u - a, v - f, S - _, R - b).normalize();
    r[1].setComponents(u + a, v + f, S + _, R + b).normalize();
    r[2].setComponents(u + l, v + p, S + T, R + C).normalize();
    r[3].setComponents(u - l, v - p, S - T, R - C).normalize();
    r[4].setComponents(u - c, v - g, S - M, R - w).normalize();
    if (t === WebGLCoordinateSystem) {
      r[5].setComponents(u + c, v + g, S + M, R + w).normalize();
    } else if (t === WebGPUCoordinateSystem) {
      r[5].setComponents(c, g, M, w).normalize();
    } else {
      throw new Error("THREE.Frustum.setFromProjectionMatrix(): Invalid coordinate system: " + t);
    }
    return this;
  }
  intersectsObject(e) {
    if (e.boundingSphere !== undefined) {
      if (e.boundingSphere === null) {
        e.computeBoundingSphere();
      }
      _sphere$4.copy(e.boundingSphere).applyMatrix4(e.matrixWorld);
    } else {
      const t = e.geometry;
      if (t.boundingSphere === null) {
        t.computeBoundingSphere();
      }
      _sphere$4.copy(t.boundingSphere).applyMatrix4(e.matrixWorld);
    }
    return this.intersectsSphere(_sphere$4);
  }
  intersectsSprite(e) {
    _sphere$4.center.set(0, 0, 0);
    _sphere$4.radius = 0.7071067811865476;
    _sphere$4.applyMatrix4(e.matrixWorld);
    return this.intersectsSphere(_sphere$4);
  }
  intersectsSphere(e) {
    const t = this.planes;
    const r = e.center;
    const n = -e.radius;
    for (let a = 0; a < 6; a++) {
      if (t[a].distanceToPoint(r) < n) {
        return false;
      }
    }
    return true;
  }
  intersectsBox(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) {
      const n = t[r];
      _vector$6.x = n.normal.x > 0 ? e.max.x : e.min.x;
      _vector$6.y = n.normal.y > 0 ? e.max.y : e.min.y;
      _vector$6.z = n.normal.z > 0 ? e.max.z : e.min.z;
      if (n.distanceToPoint(_vector$6) < 0) {
        return false;
      }
    }
    return true;
  }
  containsPoint(e) {
    const t = this.planes;
    for (let r = 0; r < 6; r++) {
      if (t[r].distanceToPoint(e) < 0) {
        return false;
      }
    }
    return true;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
function WebGLAnimation() {
  let o = null;
  let e = false;
  let t = null;
  let r = null;
  function n(a, l) {
    t(a, l);
    r = o.requestAnimationFrame(n);
  }
  return {
    start: function () {
      if (e !== true && t !== null) {
        r = o.requestAnimationFrame(n);
        e = true;
      }
    },
    stop: function () {
      o.cancelAnimationFrame(r);
      e = false;
    },
    setAnimationLoop: function (a) {
      t = a;
    },
    setContext: function (a) {
      o = a;
    }
  };
}
function WebGLAttributes(o, e) {
  const t = e.isWebGL2;
  const r = new WeakMap();
  function n(f, p) {
    const g = f.array;
    const v = f.usage;
    const _ = o.createBuffer();
    o.bindBuffer(p, _);
    o.bufferData(p, g, v);
    f.onUploadCallback();
    let T;
    if (g instanceof Float32Array) {
      T = o.FLOAT;
    } else if (g instanceof Uint16Array) {
      if (f.isFloat16BufferAttribute) {
        if (t) {
          T = o.HALF_FLOAT;
        } else {
          throw new Error("THREE.WebGLAttributes: Usage of Float16BufferAttribute requires WebGL2.");
        }
      } else {
        T = o.UNSIGNED_SHORT;
      }
    } else if (g instanceof Int16Array) {
      T = o.SHORT;
    } else if (g instanceof Uint32Array) {
      T = o.UNSIGNED_INT;
    } else if (g instanceof Int32Array) {
      T = o.INT;
    } else if (g instanceof Int8Array) {
      T = o.BYTE;
    } else if (g instanceof Uint8Array) {
      T = o.UNSIGNED_BYTE;
    } else if (g instanceof Uint8ClampedArray) {
      T = o.UNSIGNED_BYTE;
    } else {
      throw new Error("THREE.WebGLAttributes: Unsupported buffer data format: " + g);
    }
    return {
      buffer: _,
      type: T,
      bytesPerElement: g.BYTES_PER_ELEMENT,
      version: f.version
    };
  }
  function a(f, p, g) {
    const v = p.array;
    const _ = p.updateRange;
    o.bindBuffer(g, f);
    if (_.count === -1) {
      o.bufferSubData(g, 0, v);
    } else {
      if (t) {
        o.bufferSubData(g, _.offset * v.BYTES_PER_ELEMENT, v, _.offset, _.count);
      } else {
        o.bufferSubData(g, _.offset * v.BYTES_PER_ELEMENT, v.subarray(_.offset, _.offset + _.count));
      }
      _.count = -1;
    }
    p.onUploadCallback();
  }
  function l(f) {
    if (f.isInterleavedBufferAttribute) {
      f = f.data;
    }
    return r.get(f);
  }
  function c(f) {
    if (f.isInterleavedBufferAttribute) {
      f = f.data;
    }
    const p = r.get(f);
    if (p) {
      o.deleteBuffer(p.buffer);
      r.delete(f);
    }
  }
  function u(f, p) {
    if (f.isGLBufferAttribute) {
      const v = r.get(f);
      if (!v || v.version < f.version) {
        r.set(f, {
          buffer: f.buffer,
          type: f.type,
          bytesPerElement: f.elementSize,
          version: f.version
        });
      }
      return;
    }
    if (f.isInterleavedBufferAttribute) {
      f = f.data;
    }
    const g = r.get(f);
    if (g === undefined) {
      r.set(f, n(f, p));
    } else if (g.version < f.version) {
      a(g.buffer, f, p);
      g.version = f.version;
    }
  }
  return {
    get: l,
    remove: c,
    update: u
  };
}
class PlaneGeometry extends BufferGeometry {
  constructor(e = 1, t = 1, r = 1, n = 1) {
    super();
    this.type = "PlaneGeometry";
    this.parameters = {
      width: e,
      height: t,
      widthSegments: r,
      heightSegments: n
    };
    const a = e / 2;
    const l = t / 2;
    const c = Math.floor(r);
    const u = Math.floor(n);
    const f = c + 1;
    const p = u + 1;
    const g = e / c;
    const v = t / u;
    const _ = [];
    const T = [];
    const M = [];
    const S = [];
    for (let b = 0; b < p; b++) {
      const C = b * v - l;
      for (let w = 0; w < f; w++) {
        const R = w * g - a;
        T.push(R, -C, 0);
        M.push(0, 0, 1);
        S.push(w / c);
        S.push(1 - b / u);
      }
    }
    for (let b = 0; b < u; b++) {
      for (let C = 0; C < c; C++) {
        const w = C + f * b;
        const R = C + f * (b + 1);
        const E = C + 1 + f * (b + 1);
        const I = C + 1 + f * b;
        _.push(w, R, I);
        _.push(R, E, I);
      }
    }
    this.setIndex(_);
    this.setAttribute("position", new Float32BufferAttribute(T, 3));
    this.setAttribute("normal", new Float32BufferAttribute(M, 3));
    this.setAttribute("uv", new Float32BufferAttribute(S, 2));
  }
  copy(e) {
    super.copy(e);
    this.parameters = Object.assign({}, e.parameters);
    return this;
  }
  static fromJSON(e) {
    return new PlaneGeometry(e.width, e.height, e.widthSegments, e.heightSegments);
  }
}
var alphahash_fragment = `#ifdef USE_ALPHAHASH
	if ( diffuseColor.a < getAlphaHashThreshold( vPosition ) ) discard;
#endif`;
var alphahash_pars_fragment = `#ifdef USE_ALPHAHASH
	const float ALPHA_HASH_SCALE = 0.05;
	float hash2D( vec2 value ) {
		return fract( 1.0e4 * sin( 17.0 * value.x + 0.1 * value.y ) * ( 0.1 + abs( sin( 13.0 * value.y + value.x ) ) ) );
	}
	float hash3D( vec3 value ) {
		return hash2D( vec2( hash2D( value.xy ), value.z ) );
	}
	float getAlphaHashThreshold( vec3 position ) {
		float maxDeriv = max(
			length( dFdx( position.xyz ) ),
			length( dFdy( position.xyz ) )
		);
		float pixScale = 1.0 / ( ALPHA_HASH_SCALE * maxDeriv );
		vec2 pixScales = vec2(
			exp2( floor( log2( pixScale ) ) ),
			exp2( ceil( log2( pixScale ) ) )
		);
		vec2 alpha = vec2(
			hash3D( floor( pixScales.x * position.xyz ) ),
			hash3D( floor( pixScales.y * position.xyz ) )
		);
		float lerpFactor = fract( log2( pixScale ) );
		float x = ( 1.0 - lerpFactor ) * alpha.x + lerpFactor * alpha.y;
		float a = min( lerpFactor, 1.0 - lerpFactor );
		vec3 cases = vec3(
			x * x / ( 2.0 * a * ( 1.0 - a ) ),
			( x - 0.5 * a ) / ( 1.0 - a ),
			1.0 - ( ( 1.0 - x ) * ( 1.0 - x ) / ( 2.0 * a * ( 1.0 - a ) ) )
		);
		float threshold = ( x < ( 1.0 - a ) )
			? ( ( x < a ) ? cases.x : cases.y )
			: cases.z;
		return clamp( threshold , 1.0e-6, 1.0 );
	}
#endif`;
var alphamap_fragment = `#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, vAlphaMapUv ).g;
#endif`;
var alphamap_pars_fragment = `#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`;
var alphatest_fragment = `#ifdef USE_ALPHATEST
	if ( diffuseColor.a < alphaTest ) discard;
#endif`;
var alphatest_pars_fragment = `#ifdef USE_ALPHATEST
	uniform float alphaTest;
#endif`;
var aomap_fragment = `#ifdef USE_AOMAP
	float ambientOcclusion = ( texture2D( aoMap, vAoMapUv ).r - 1.0 ) * aoMapIntensity + 1.0;
	reflectedLight.indirectDiffuse *= ambientOcclusion;
	#if defined( USE_CLEARCOAT ) 
		clearcoatSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_SHEEN ) 
		sheenSpecularIndirect *= ambientOcclusion;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD )
		float dotNV = saturate( dot( geometryNormal, geometryViewDir ) );
		reflectedLight.indirectSpecular *= computeSpecularOcclusion( dotNV, ambientOcclusion, material.roughness );
	#endif
#endif`;
var aomap_pars_fragment = `#ifdef USE_AOMAP
	uniform sampler2D aoMap;
	uniform float aoMapIntensity;
#endif`;
var begin_vertex = `vec3 transformed = vec3( position );
#ifdef USE_ALPHAHASH
	vPosition = vec3( position );
#endif`;
var beginnormal_vertex = `vec3 objectNormal = vec3( normal );
#ifdef USE_TANGENT
	vec3 objectTangent = vec3( tangent.xyz );
#endif`;
var bsdfs = `float G_BlinnPhong_Implicit( ) {
	return 0.25;
}
float D_BlinnPhong( const in float shininess, const in float dotNH ) {
	return RECIPROCAL_PI * ( shininess * 0.5 + 1.0 ) * pow( dotNH, shininess );
}
vec3 BRDF_BlinnPhong( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in vec3 specularColor, const in float shininess ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( specularColor, 1.0, dotVH );
	float G = G_BlinnPhong_Implicit( );
	float D = D_BlinnPhong( shininess, dotNH );
	return F * ( G * D );
} // validated`;
var iridescence_fragment = `#ifdef USE_IRIDESCENCE
	const mat3 XYZ_TO_REC709 = mat3(
		 3.2404542, -0.9692660,  0.0556434,
		-1.5371385,  1.8760108, -0.2040259,
		-0.4985314,  0.0415560,  1.0572252
	);
	vec3 Fresnel0ToIor( vec3 fresnel0 ) {
		vec3 sqrtF0 = sqrt( fresnel0 );
		return ( vec3( 1.0 ) + sqrtF0 ) / ( vec3( 1.0 ) - sqrtF0 );
	}
	vec3 IorToFresnel0( vec3 transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - vec3( incidentIor ) ) / ( transmittedIor + vec3( incidentIor ) ) );
	}
	float IorToFresnel0( float transmittedIor, float incidentIor ) {
		return pow2( ( transmittedIor - incidentIor ) / ( transmittedIor + incidentIor ));
	}
	vec3 evalSensitivity( float OPD, vec3 shift ) {
		float phase = 2.0 * PI * OPD * 1.0e-9;
		vec3 val = vec3( 5.4856e-13, 4.4201e-13, 5.2481e-13 );
		vec3 pos = vec3( 1.6810e+06, 1.7953e+06, 2.2084e+06 );
		vec3 var = vec3( 4.3278e+09, 9.3046e+09, 6.6121e+09 );
		vec3 xyz = val * sqrt( 2.0 * PI * var ) * cos( pos * phase + shift ) * exp( - pow2( phase ) * var );
		xyz.x += 9.7470e-14 * sqrt( 2.0 * PI * 4.5282e+09 ) * cos( 2.2399e+06 * phase + shift[ 0 ] ) * exp( - 4.5282e+09 * pow2( phase ) );
		xyz /= 1.0685e-7;
		vec3 rgb = XYZ_TO_REC709 * xyz;
		return rgb;
	}
	vec3 evalIridescence( float outsideIOR, float eta2, float cosTheta1, float thinFilmThickness, vec3 baseF0 ) {
		vec3 I;
		float iridescenceIOR = mix( outsideIOR, eta2, smoothstep( 0.0, 0.03, thinFilmThickness ) );
		float sinTheta2Sq = pow2( outsideIOR / iridescenceIOR ) * ( 1.0 - pow2( cosTheta1 ) );
		float cosTheta2Sq = 1.0 - sinTheta2Sq;
		if ( cosTheta2Sq < 0.0 ) {
			return vec3( 1.0 );
		}
		float cosTheta2 = sqrt( cosTheta2Sq );
		float R0 = IorToFresnel0( iridescenceIOR, outsideIOR );
		float R12 = F_Schlick( R0, 1.0, cosTheta1 );
		float T121 = 1.0 - R12;
		float phi12 = 0.0;
		if ( iridescenceIOR < outsideIOR ) phi12 = PI;
		float phi21 = PI - phi12;
		vec3 baseIOR = Fresnel0ToIor( clamp( baseF0, 0.0, 0.9999 ) );		vec3 R1 = IorToFresnel0( baseIOR, iridescenceIOR );
		vec3 R23 = F_Schlick( R1, 1.0, cosTheta2 );
		vec3 phi23 = vec3( 0.0 );
		if ( baseIOR[ 0 ] < iridescenceIOR ) phi23[ 0 ] = PI;
		if ( baseIOR[ 1 ] < iridescenceIOR ) phi23[ 1 ] = PI;
		if ( baseIOR[ 2 ] < iridescenceIOR ) phi23[ 2 ] = PI;
		float OPD = 2.0 * iridescenceIOR * thinFilmThickness * cosTheta2;
		vec3 phi = vec3( phi21 ) + phi23;
		vec3 R123 = clamp( R12 * R23, 1e-5, 0.9999 );
		vec3 r123 = sqrt( R123 );
		vec3 Rs = pow2( T121 ) * R23 / ( vec3( 1.0 ) - R123 );
		vec3 C0 = R12 + Rs;
		I = C0;
		vec3 Cm = Rs - T121;
		for ( int m = 1; m <= 2; ++ m ) {
			Cm *= r123;
			vec3 Sm = 2.0 * evalSensitivity( float( m ) * OPD, float( m ) * phi );
			I += Cm * Sm;
		}
		return max( I, vec3( 0.0 ) );
	}
#endif`;
var bumpmap_pars_fragment = `#ifdef USE_BUMPMAP
	uniform sampler2D bumpMap;
	uniform float bumpScale;
	vec2 dHdxy_fwd() {
		vec2 dSTdx = dFdx( vBumpMapUv );
		vec2 dSTdy = dFdy( vBumpMapUv );
		float Hll = bumpScale * texture2D( bumpMap, vBumpMapUv ).x;
		float dBx = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdx ).x - Hll;
		float dBy = bumpScale * texture2D( bumpMap, vBumpMapUv + dSTdy ).x - Hll;
		return vec2( dBx, dBy );
	}
	vec3 perturbNormalArb( vec3 surf_pos, vec3 surf_norm, vec2 dHdxy, float faceDirection ) {
		vec3 vSigmaX = normalize( dFdx( surf_pos.xyz ) );
		vec3 vSigmaY = normalize( dFdy( surf_pos.xyz ) );
		vec3 vN = surf_norm;
		vec3 R1 = cross( vSigmaY, vN );
		vec3 R2 = cross( vN, vSigmaX );
		float fDet = dot( vSigmaX, R1 ) * faceDirection;
		vec3 vGrad = sign( fDet ) * ( dHdxy.x * R1 + dHdxy.y * R2 );
		return normalize( abs( fDet ) * surf_norm - vGrad );
	}
#endif`;
var clipping_planes_fragment = `#if NUM_CLIPPING_PLANES > 0
	vec4 plane;
	#pragma unroll_loop_start
	for ( int i = 0; i < UNION_CLIPPING_PLANES; i ++ ) {
		plane = clippingPlanes[ i ];
		if ( dot( vClipPosition, plane.xyz ) > plane.w ) discard;
	}
	#pragma unroll_loop_end
	#if UNION_CLIPPING_PLANES < NUM_CLIPPING_PLANES
		bool clipped = true;
		#pragma unroll_loop_start
		for ( int i = UNION_CLIPPING_PLANES; i < NUM_CLIPPING_PLANES; i ++ ) {
			plane = clippingPlanes[ i ];
			clipped = ( dot( vClipPosition, plane.xyz ) > plane.w ) && clipped;
		}
		#pragma unroll_loop_end
		if ( clipped ) discard;
	#endif
#endif`;
var clipping_planes_pars_fragment = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
	uniform vec4 clippingPlanes[ NUM_CLIPPING_PLANES ];
#endif`;
var clipping_planes_pars_vertex = `#if NUM_CLIPPING_PLANES > 0
	varying vec3 vClipPosition;
#endif`;
var clipping_planes_vertex = `#if NUM_CLIPPING_PLANES > 0
	vClipPosition = - mvPosition.xyz;
#endif`;
var color_fragment = `#if defined( USE_COLOR_ALPHA )
	diffuseColor *= vColor;
#elif defined( USE_COLOR )
	diffuseColor.rgb *= vColor;
#endif`;
var color_pars_fragment = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR )
	varying vec3 vColor;
#endif`;
var color_pars_vertex = `#if defined( USE_COLOR_ALPHA )
	varying vec4 vColor;
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	varying vec3 vColor;
#endif`;
var color_vertex = `#if defined( USE_COLOR_ALPHA )
	vColor = vec4( 1.0 );
#elif defined( USE_COLOR ) || defined( USE_INSTANCING_COLOR )
	vColor = vec3( 1.0 );
#endif
#ifdef USE_COLOR
	vColor *= color;
#endif
#ifdef USE_INSTANCING_COLOR
	vColor.xyz *= instanceColor.xyz;
#endif`;
var common = `#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define EPSILON 1e-6
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
#define whiteComplement( a ) ( 1.0 - saturate( a ) )
float pow2( const in float x ) { return x*x; }
vec3 pow2( const in vec3 x ) { return x*x; }
float pow3( const in float x ) { return x*x*x; }
float pow4( const in float x ) { float x2 = x*x; return x2*x2; }
float max3( const in vec3 v ) { return max( max( v.x, v.y ), v.z ); }
float average( const in vec3 v ) { return dot( v, vec3( 0.3333333 ) ); }
highp float rand( const in vec2 uv ) {
	const highp float a = 12.9898, b = 78.233, c = 43758.5453;
	highp float dt = dot( uv.xy, vec2( a,b ) ), sn = mod( dt, PI );
	return fract( sin( sn ) * c );
}
#ifdef HIGH_PRECISION
	float precisionSafeLength( vec3 v ) { return length( v ); }
#else
	float precisionSafeLength( vec3 v ) {
		float maxComponent = max3( abs( v ) );
		return length( v / maxComponent ) * maxComponent;
	}
#endif
struct IncidentLight {
	vec3 color;
	vec3 direction;
	bool visible;
};
struct ReflectedLight {
	vec3 directDiffuse;
	vec3 directSpecular;
	vec3 indirectDiffuse;
	vec3 indirectSpecular;
};
#ifdef USE_ALPHAHASH
	varying vec3 vPosition;
#endif
vec3 transformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( matrix * vec4( dir, 0.0 ) ).xyz );
}
vec3 inverseTransformDirection( in vec3 dir, in mat4 matrix ) {
	return normalize( ( vec4( dir, 0.0 ) * matrix ).xyz );
}
mat3 transposeMat3( const in mat3 m ) {
	mat3 tmp;
	tmp[ 0 ] = vec3( m[ 0 ].x, m[ 1 ].x, m[ 2 ].x );
	tmp[ 1 ] = vec3( m[ 0 ].y, m[ 1 ].y, m[ 2 ].y );
	tmp[ 2 ] = vec3( m[ 0 ].z, m[ 1 ].z, m[ 2 ].z );
	return tmp;
}
float luminance( const in vec3 rgb ) {
	const vec3 weights = vec3( 0.2126729, 0.7151522, 0.0721750 );
	return dot( weights, rgb );
}
bool isPerspectiveMatrix( mat4 m ) {
	return m[ 2 ][ 3 ] == - 1.0;
}
vec2 equirectUv( in vec3 dir ) {
	float u = atan( dir.z, dir.x ) * RECIPROCAL_PI2 + 0.5;
	float v = asin( clamp( dir.y, - 1.0, 1.0 ) ) * RECIPROCAL_PI + 0.5;
	return vec2( u, v );
}
vec3 BRDF_Lambert( const in vec3 diffuseColor ) {
	return RECIPROCAL_PI * diffuseColor;
}
vec3 F_Schlick( const in vec3 f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
}
float F_Schlick( const in float f0, const in float f90, const in float dotVH ) {
	float fresnel = exp2( ( - 5.55473 * dotVH - 6.98316 ) * dotVH );
	return f0 * ( 1.0 - fresnel ) + ( f90 * fresnel );
} // validated`;
var cube_uv_reflection_fragment = `#ifdef ENVMAP_TYPE_CUBE_UV
	#define cubeUV_minMipLevel 4.0
	#define cubeUV_minTileSize 16.0
	float getFace( vec3 direction ) {
		vec3 absDirection = abs( direction );
		float face = - 1.0;
		if ( absDirection.x > absDirection.z ) {
			if ( absDirection.x > absDirection.y )
				face = direction.x > 0.0 ? 0.0 : 3.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		} else {
			if ( absDirection.z > absDirection.y )
				face = direction.z > 0.0 ? 2.0 : 5.0;
			else
				face = direction.y > 0.0 ? 1.0 : 4.0;
		}
		return face;
	}
	vec2 getUV( vec3 direction, float face ) {
		vec2 uv;
		if ( face == 0.0 ) {
			uv = vec2( direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 1.0 ) {
			uv = vec2( - direction.x, - direction.z ) / abs( direction.y );
		} else if ( face == 2.0 ) {
			uv = vec2( - direction.x, direction.y ) / abs( direction.z );
		} else if ( face == 3.0 ) {
			uv = vec2( - direction.z, direction.y ) / abs( direction.x );
		} else if ( face == 4.0 ) {
			uv = vec2( - direction.x, direction.z ) / abs( direction.y );
		} else {
			uv = vec2( direction.x, direction.y ) / abs( direction.z );
		}
		return 0.5 * ( uv + 1.0 );
	}
	vec3 bilinearCubeUV( sampler2D envMap, vec3 direction, float mipInt ) {
		float face = getFace( direction );
		float filterInt = max( cubeUV_minMipLevel - mipInt, 0.0 );
		mipInt = max( mipInt, cubeUV_minMipLevel );
		float faceSize = exp2( mipInt );
		highp vec2 uv = getUV( direction, face ) * ( faceSize - 2.0 ) + 1.0;
		if ( face > 2.0 ) {
			uv.y += faceSize;
			face -= 3.0;
		}
		uv.x += face * faceSize;
		uv.x += filterInt * 3.0 * cubeUV_minTileSize;
		uv.y += 4.0 * ( exp2( CUBEUV_MAX_MIP ) - faceSize );
		uv.x *= CUBEUV_TEXEL_WIDTH;
		uv.y *= CUBEUV_TEXEL_HEIGHT;
		#ifdef texture2DGradEXT
			return texture2DGradEXT( envMap, uv, vec2( 0.0 ), vec2( 0.0 ) ).rgb;
		#else
			return texture2D( envMap, uv ).rgb;
		#endif
	}
	#define cubeUV_r0 1.0
	#define cubeUV_v0 0.339
	#define cubeUV_m0 - 2.0
	#define cubeUV_r1 0.8
	#define cubeUV_v1 0.276
	#define cubeUV_m1 - 1.0
	#define cubeUV_r4 0.4
	#define cubeUV_v4 0.046
	#define cubeUV_m4 2.0
	#define cubeUV_r5 0.305
	#define cubeUV_v5 0.016
	#define cubeUV_m5 3.0
	#define cubeUV_r6 0.21
	#define cubeUV_v6 0.0038
	#define cubeUV_m6 4.0
	float roughnessToMip( float roughness ) {
		float mip = 0.0;
		if ( roughness >= cubeUV_r1 ) {
			mip = ( cubeUV_r0 - roughness ) * ( cubeUV_m1 - cubeUV_m0 ) / ( cubeUV_r0 - cubeUV_r1 ) + cubeUV_m0;
		} else if ( roughness >= cubeUV_r4 ) {
			mip = ( cubeUV_r1 - roughness ) * ( cubeUV_m4 - cubeUV_m1 ) / ( cubeUV_r1 - cubeUV_r4 ) + cubeUV_m1;
		} else if ( roughness >= cubeUV_r5 ) {
			mip = ( cubeUV_r4 - roughness ) * ( cubeUV_m5 - cubeUV_m4 ) / ( cubeUV_r4 - cubeUV_r5 ) + cubeUV_m4;
		} else if ( roughness >= cubeUV_r6 ) {
			mip = ( cubeUV_r5 - roughness ) * ( cubeUV_m6 - cubeUV_m5 ) / ( cubeUV_r5 - cubeUV_r6 ) + cubeUV_m5;
		} else {
			mip = - 2.0 * log2( 1.16 * roughness );		}
		return mip;
	}
	vec4 textureCubeUV( sampler2D envMap, vec3 sampleDir, float roughness ) {
		float mip = clamp( roughnessToMip( roughness ), cubeUV_m0, CUBEUV_MAX_MIP );
		float mipF = fract( mip );
		float mipInt = floor( mip );
		vec3 color0 = bilinearCubeUV( envMap, sampleDir, mipInt );
		if ( mipF == 0.0 ) {
			return vec4( color0, 1.0 );
		} else {
			vec3 color1 = bilinearCubeUV( envMap, sampleDir, mipInt + 1.0 );
			return vec4( mix( color0, color1, mipF ), 1.0 );
		}
	}
#endif`;
var defaultnormal_vertex = `vec3 transformedNormal = objectNormal;
#ifdef USE_INSTANCING
	mat3 m = mat3( instanceMatrix );
	transformedNormal /= vec3( dot( m[ 0 ], m[ 0 ] ), dot( m[ 1 ], m[ 1 ] ), dot( m[ 2 ], m[ 2 ] ) );
	transformedNormal = m * transformedNormal;
#endif
transformedNormal = normalMatrix * transformedNormal;
#ifdef FLIP_SIDED
	transformedNormal = - transformedNormal;
#endif
#ifdef USE_TANGENT
	vec3 transformedTangent = ( modelViewMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#ifdef FLIP_SIDED
		transformedTangent = - transformedTangent;
	#endif
#endif`;
var displacementmap_pars_vertex = `#ifdef USE_DISPLACEMENTMAP
	uniform sampler2D displacementMap;
	uniform float displacementScale;
	uniform float displacementBias;
#endif`;
var displacementmap_vertex = `#ifdef USE_DISPLACEMENTMAP
	transformed += normalize( objectNormal ) * ( texture2D( displacementMap, vDisplacementMapUv ).x * displacementScale + displacementBias );
#endif`;
var emissivemap_fragment = `#ifdef USE_EMISSIVEMAP
	vec4 emissiveColor = texture2D( emissiveMap, vEmissiveMapUv );
	totalEmissiveRadiance *= emissiveColor.rgb;
#endif`;
var emissivemap_pars_fragment = `#ifdef USE_EMISSIVEMAP
	uniform sampler2D emissiveMap;
#endif`;
var colorspace_fragment = "gl_FragColor = linearToOutputTexel( gl_FragColor );";
var colorspace_pars_fragment = `
const mat3 LINEAR_SRGB_TO_LINEAR_DISPLAY_P3 = mat3(
	vec3( 0.8224621, 0.177538, 0.0 ),
	vec3( 0.0331941, 0.9668058, 0.0 ),
	vec3( 0.0170827, 0.0723974, 0.9105199 )
);
const mat3 LINEAR_DISPLAY_P3_TO_LINEAR_SRGB = mat3(
	vec3( 1.2249401, - 0.2249404, 0.0 ),
	vec3( - 0.0420569, 1.0420571, 0.0 ),
	vec3( - 0.0196376, - 0.0786361, 1.0982735 )
);
vec4 LinearSRGBToLinearDisplayP3( in vec4 value ) {
	return vec4( value.rgb * LINEAR_SRGB_TO_LINEAR_DISPLAY_P3, value.a );
}
vec4 LinearDisplayP3ToLinearSRGB( in vec4 value ) {
	return vec4( value.rgb * LINEAR_DISPLAY_P3_TO_LINEAR_SRGB, value.a );
}
vec4 LinearTransferOETF( in vec4 value ) {
	return value;
}
vec4 sRGBTransferOETF( in vec4 value ) {
	return vec4( mix( pow( value.rgb, vec3( 0.41666 ) ) * 1.055 - vec3( 0.055 ), value.rgb * 12.92, vec3( lessThanEqual( value.rgb, vec3( 0.0031308 ) ) ) ), value.a );
}
vec4 LinearToLinear( in vec4 value ) {
	return value;
}
vec4 LinearTosRGB( in vec4 value ) {
	return sRGBTransferOETF( value );
}`;
var envmap_fragment = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vec3 cameraToFrag;
		if ( isOrthographic ) {
			cameraToFrag = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToFrag = normalize( vWorldPosition - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vec3 reflectVec = reflect( cameraToFrag, worldNormal );
		#else
			vec3 reflectVec = refract( cameraToFrag, worldNormal, refractionRatio );
		#endif
	#else
		vec3 reflectVec = vReflect;
	#endif
	#ifdef ENVMAP_TYPE_CUBE
		vec4 envColor = textureCube( envMap, vec3( flipEnvMap * reflectVec.x, reflectVec.yz ) );
	#else
		vec4 envColor = vec4( 0.0 );
	#endif
	#ifdef ENVMAP_BLENDING_MULTIPLY
		outgoingLight = mix( outgoingLight, outgoingLight * envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_MIX )
		outgoingLight = mix( outgoingLight, envColor.xyz, specularStrength * reflectivity );
	#elif defined( ENVMAP_BLENDING_ADD )
		outgoingLight += envColor.xyz * specularStrength * reflectivity;
	#endif
#endif`;
var envmap_common_pars_fragment = `#ifdef USE_ENVMAP
	uniform float envMapIntensity;
	uniform float flipEnvMap;
	#ifdef ENVMAP_TYPE_CUBE
		uniform samplerCube envMap;
	#else
		uniform sampler2D envMap;
	#endif
	
#endif`;
var envmap_pars_fragment = `#ifdef USE_ENVMAP
	uniform float reflectivity;
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		varying vec3 vWorldPosition;
		uniform float refractionRatio;
	#else
		varying vec3 vReflect;
	#endif
#endif`;
var envmap_pars_vertex = `#ifdef USE_ENVMAP
	#if defined( USE_BUMPMAP ) || defined( USE_NORMALMAP ) || defined( PHONG ) || defined( LAMBERT )
		#define ENV_WORLDPOS
	#endif
	#ifdef ENV_WORLDPOS
		
		varying vec3 vWorldPosition;
	#else
		varying vec3 vReflect;
		uniform float refractionRatio;
	#endif
#endif`;
var envmap_vertex = `#ifdef USE_ENVMAP
	#ifdef ENV_WORLDPOS
		vWorldPosition = worldPosition.xyz;
	#else
		vec3 cameraToVertex;
		if ( isOrthographic ) {
			cameraToVertex = normalize( vec3( - viewMatrix[ 0 ][ 2 ], - viewMatrix[ 1 ][ 2 ], - viewMatrix[ 2 ][ 2 ] ) );
		} else {
			cameraToVertex = normalize( worldPosition.xyz - cameraPosition );
		}
		vec3 worldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
		#ifdef ENVMAP_MODE_REFLECTION
			vReflect = reflect( cameraToVertex, worldNormal );
		#else
			vReflect = refract( cameraToVertex, worldNormal, refractionRatio );
		#endif
	#endif
#endif`;
var fog_vertex = `#ifdef USE_FOG
	vFogDepth = - mvPosition.z;
#endif`;
var fog_pars_vertex = `#ifdef USE_FOG
	varying float vFogDepth;
#endif`;
var fog_fragment = `#ifdef USE_FOG
	#ifdef FOG_EXP2
		float fogFactor = 1.0 - exp( - fogDensity * fogDensity * vFogDepth * vFogDepth );
	#else
		float fogFactor = smoothstep( fogNear, fogFar, vFogDepth );
	#endif
	gl_FragColor.rgb = mix( gl_FragColor.rgb, fogColor, fogFactor );
#endif`;
var fog_pars_fragment = `#ifdef USE_FOG
	uniform vec3 fogColor;
	varying float vFogDepth;
	#ifdef FOG_EXP2
		uniform float fogDensity;
	#else
		uniform float fogNear;
		uniform float fogFar;
	#endif
#endif`;
var gradientmap_pars_fragment = `#ifdef USE_GRADIENTMAP
	uniform sampler2D gradientMap;
#endif
vec3 getGradientIrradiance( vec3 normal, vec3 lightDirection ) {
	float dotNL = dot( normal, lightDirection );
	vec2 coord = vec2( dotNL * 0.5 + 0.5, 0.0 );
	#ifdef USE_GRADIENTMAP
		return vec3( texture2D( gradientMap, coord ).r );
	#else
		vec2 fw = fwidth( coord ) * 0.5;
		return mix( vec3( 0.7 ), vec3( 1.0 ), smoothstep( 0.7 - fw.x, 0.7 + fw.x, coord.x ) );
	#endif
}`;
var lightmap_fragment = `#ifdef USE_LIGHTMAP
	vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
	vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
	reflectedLight.indirectDiffuse += lightMapIrradiance;
#endif`;
var lightmap_pars_fragment = `#ifdef USE_LIGHTMAP
	uniform sampler2D lightMap;
	uniform float lightMapIntensity;
#endif`;
var lights_lambert_fragment = `LambertMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularStrength = specularStrength;`;
var lights_lambert_pars_fragment = `varying vec3 vViewPosition;
struct LambertMaterial {
	vec3 diffuseColor;
	float specularStrength;
};
void RE_Direct_Lambert( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Lambert( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in LambertMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Lambert
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Lambert`;
var lights_pars_begin = `uniform bool receiveShadow;
uniform vec3 ambientLightColor;
#if defined( USE_LIGHT_PROBES )
	uniform vec3 lightProbe[ 9 ];
#endif
vec3 shGetIrradianceAt( in vec3 normal, in vec3 shCoefficients[ 9 ] ) {
	float x = normal.x, y = normal.y, z = normal.z;
	vec3 result = shCoefficients[ 0 ] * 0.886227;
	result += shCoefficients[ 1 ] * 2.0 * 0.511664 * y;
	result += shCoefficients[ 2 ] * 2.0 * 0.511664 * z;
	result += shCoefficients[ 3 ] * 2.0 * 0.511664 * x;
	result += shCoefficients[ 4 ] * 2.0 * 0.429043 * x * y;
	result += shCoefficients[ 5 ] * 2.0 * 0.429043 * y * z;
	result += shCoefficients[ 6 ] * ( 0.743125 * z * z - 0.247708 );
	result += shCoefficients[ 7 ] * 2.0 * 0.429043 * x * z;
	result += shCoefficients[ 8 ] * 0.429043 * ( x * x - y * y );
	return result;
}
vec3 getLightProbeIrradiance( const in vec3 lightProbe[ 9 ], const in vec3 normal ) {
	vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
	vec3 irradiance = shGetIrradianceAt( worldNormal, lightProbe );
	return irradiance;
}
vec3 getAmbientLightIrradiance( const in vec3 ambientLightColor ) {
	vec3 irradiance = ambientLightColor;
	return irradiance;
}
float getDistanceAttenuation( const in float lightDistance, const in float cutoffDistance, const in float decayExponent ) {
	#if defined ( LEGACY_LIGHTS )
		if ( cutoffDistance > 0.0 && decayExponent > 0.0 ) {
			return pow( saturate( - lightDistance / cutoffDistance + 1.0 ), decayExponent );
		}
		return 1.0;
	#else
		float distanceFalloff = 1.0 / max( pow( lightDistance, decayExponent ), 0.01 );
		if ( cutoffDistance > 0.0 ) {
			distanceFalloff *= pow2( saturate( 1.0 - pow4( lightDistance / cutoffDistance ) ) );
		}
		return distanceFalloff;
	#endif
}
float getSpotAttenuation( const in float coneCosine, const in float penumbraCosine, const in float angleCosine ) {
	return smoothstep( coneCosine, penumbraCosine, angleCosine );
}
#if NUM_DIR_LIGHTS > 0
	struct DirectionalLight {
		vec3 direction;
		vec3 color;
	};
	uniform DirectionalLight directionalLights[ NUM_DIR_LIGHTS ];
	void getDirectionalLightInfo( const in DirectionalLight directionalLight, out IncidentLight light ) {
		light.color = directionalLight.color;
		light.direction = directionalLight.direction;
		light.visible = true;
	}
#endif
#if NUM_POINT_LIGHTS > 0
	struct PointLight {
		vec3 position;
		vec3 color;
		float distance;
		float decay;
	};
	uniform PointLight pointLights[ NUM_POINT_LIGHTS ];
	void getPointLightInfo( const in PointLight pointLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = pointLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float lightDistance = length( lVector );
		light.color = pointLight.color;
		light.color *= getDistanceAttenuation( lightDistance, pointLight.distance, pointLight.decay );
		light.visible = ( light.color != vec3( 0.0 ) );
	}
#endif
#if NUM_SPOT_LIGHTS > 0
	struct SpotLight {
		vec3 position;
		vec3 direction;
		vec3 color;
		float distance;
		float decay;
		float coneCos;
		float penumbraCos;
	};
	uniform SpotLight spotLights[ NUM_SPOT_LIGHTS ];
	void getSpotLightInfo( const in SpotLight spotLight, const in vec3 geometryPosition, out IncidentLight light ) {
		vec3 lVector = spotLight.position - geometryPosition;
		light.direction = normalize( lVector );
		float angleCos = dot( light.direction, spotLight.direction );
		float spotAttenuation = getSpotAttenuation( spotLight.coneCos, spotLight.penumbraCos, angleCos );
		if ( spotAttenuation > 0.0 ) {
			float lightDistance = length( lVector );
			light.color = spotLight.color * spotAttenuation;
			light.color *= getDistanceAttenuation( lightDistance, spotLight.distance, spotLight.decay );
			light.visible = ( light.color != vec3( 0.0 ) );
		} else {
			light.color = vec3( 0.0 );
			light.visible = false;
		}
	}
#endif
#if NUM_RECT_AREA_LIGHTS > 0
	struct RectAreaLight {
		vec3 color;
		vec3 position;
		vec3 halfWidth;
		vec3 halfHeight;
	};
	uniform sampler2D ltc_1;	uniform sampler2D ltc_2;
	uniform RectAreaLight rectAreaLights[ NUM_RECT_AREA_LIGHTS ];
#endif
#if NUM_HEMI_LIGHTS > 0
	struct HemisphereLight {
		vec3 direction;
		vec3 skyColor;
		vec3 groundColor;
	};
	uniform HemisphereLight hemisphereLights[ NUM_HEMI_LIGHTS ];
	vec3 getHemisphereLightIrradiance( const in HemisphereLight hemiLight, const in vec3 normal ) {
		float dotNL = dot( normal, hemiLight.direction );
		float hemiDiffuseWeight = 0.5 * dotNL + 0.5;
		vec3 irradiance = mix( hemiLight.groundColor, hemiLight.skyColor, hemiDiffuseWeight );
		return irradiance;
	}
#endif`;
var envmap_physical_pars_fragment = `#ifdef USE_ENVMAP
	vec3 getIBLIrradiance( const in vec3 normal ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 worldNormal = inverseTransformDirection( normal, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, worldNormal, 1.0 );
			return PI * envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	vec3 getIBLRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness ) {
		#ifdef ENVMAP_TYPE_CUBE_UV
			vec3 reflectVec = reflect( - viewDir, normal );
			reflectVec = normalize( mix( reflectVec, normal, roughness * roughness) );
			reflectVec = inverseTransformDirection( reflectVec, viewMatrix );
			vec4 envMapColor = textureCubeUV( envMap, reflectVec, roughness );
			return envMapColor.rgb * envMapIntensity;
		#else
			return vec3( 0.0 );
		#endif
	}
	#ifdef USE_ANISOTROPY
		vec3 getIBLAnisotropyRadiance( const in vec3 viewDir, const in vec3 normal, const in float roughness, const in vec3 bitangent, const in float anisotropy ) {
			#ifdef ENVMAP_TYPE_CUBE_UV
				vec3 bentNormal = cross( bitangent, viewDir );
				bentNormal = normalize( cross( bentNormal, bitangent ) );
				bentNormal = normalize( mix( bentNormal, normal, pow2( pow2( 1.0 - anisotropy * ( 1.0 - roughness ) ) ) ) );
				return getIBLRadiance( viewDir, bentNormal, roughness );
			#else
				return vec3( 0.0 );
			#endif
		}
	#endif
#endif`;
var lights_toon_fragment = `ToonMaterial material;
material.diffuseColor = diffuseColor.rgb;`;
var lights_toon_pars_fragment = `varying vec3 vViewPosition;
struct ToonMaterial {
	vec3 diffuseColor;
};
void RE_Direct_Toon( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	vec3 irradiance = getGradientIrradiance( geometryNormal, directLight.direction ) * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Toon( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in ToonMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_Toon
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Toon`;
var lights_phong_fragment = `BlinnPhongMaterial material;
material.diffuseColor = diffuseColor.rgb;
material.specularColor = specular;
material.specularShininess = shininess;
material.specularStrength = specularStrength;`;
var lights_phong_pars_fragment = `varying vec3 vViewPosition;
struct BlinnPhongMaterial {
	vec3 diffuseColor;
	vec3 specularColor;
	float specularShininess;
	float specularStrength;
};
void RE_Direct_BlinnPhong( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
	reflectedLight.directSpecular += irradiance * BRDF_BlinnPhong( directLight.direction, geometryViewDir, geometryNormal, material.specularColor, material.specularShininess ) * material.specularStrength;
}
void RE_IndirectDiffuse_BlinnPhong( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in BlinnPhongMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
#define RE_Direct				RE_Direct_BlinnPhong
#define RE_IndirectDiffuse		RE_IndirectDiffuse_BlinnPhong`;
var lights_physical_fragment = `PhysicalMaterial material;
material.diffuseColor = diffuseColor.rgb * ( 1.0 - metalnessFactor );
vec3 dxy = max( abs( dFdx( nonPerturbedNormal ) ), abs( dFdy( nonPerturbedNormal ) ) );
float geometryRoughness = max( max( dxy.x, dxy.y ), dxy.z );
material.roughness = max( roughnessFactor, 0.0525 );material.roughness += geometryRoughness;
material.roughness = min( material.roughness, 1.0 );
#ifdef IOR
	material.ior = ior;
	#ifdef USE_SPECULAR
		float specularIntensityFactor = specularIntensity;
		vec3 specularColorFactor = specularColor;
		#ifdef USE_SPECULAR_COLORMAP
			specularColorFactor *= texture2D( specularColorMap, vSpecularColorMapUv ).rgb;
		#endif
		#ifdef USE_SPECULAR_INTENSITYMAP
			specularIntensityFactor *= texture2D( specularIntensityMap, vSpecularIntensityMapUv ).a;
		#endif
		material.specularF90 = mix( specularIntensityFactor, 1.0, metalnessFactor );
	#else
		float specularIntensityFactor = 1.0;
		vec3 specularColorFactor = vec3( 1.0 );
		material.specularF90 = 1.0;
	#endif
	material.specularColor = mix( min( pow2( ( material.ior - 1.0 ) / ( material.ior + 1.0 ) ) * specularColorFactor, vec3( 1.0 ) ) * specularIntensityFactor, diffuseColor.rgb, metalnessFactor );
#else
	material.specularColor = mix( vec3( 0.04 ), diffuseColor.rgb, metalnessFactor );
	material.specularF90 = 1.0;
#endif
#ifdef USE_CLEARCOAT
	material.clearcoat = clearcoat;
	material.clearcoatRoughness = clearcoatRoughness;
	material.clearcoatF0 = vec3( 0.04 );
	material.clearcoatF90 = 1.0;
	#ifdef USE_CLEARCOATMAP
		material.clearcoat *= texture2D( clearcoatMap, vClearcoatMapUv ).x;
	#endif
	#ifdef USE_CLEARCOAT_ROUGHNESSMAP
		material.clearcoatRoughness *= texture2D( clearcoatRoughnessMap, vClearcoatRoughnessMapUv ).y;
	#endif
	material.clearcoat = saturate( material.clearcoat );	material.clearcoatRoughness = max( material.clearcoatRoughness, 0.0525 );
	material.clearcoatRoughness += geometryRoughness;
	material.clearcoatRoughness = min( material.clearcoatRoughness, 1.0 );
#endif
#ifdef USE_IRIDESCENCE
	material.iridescence = iridescence;
	material.iridescenceIOR = iridescenceIOR;
	#ifdef USE_IRIDESCENCEMAP
		material.iridescence *= texture2D( iridescenceMap, vIridescenceMapUv ).r;
	#endif
	#ifdef USE_IRIDESCENCE_THICKNESSMAP
		material.iridescenceThickness = (iridescenceThicknessMaximum - iridescenceThicknessMinimum) * texture2D( iridescenceThicknessMap, vIridescenceThicknessMapUv ).g + iridescenceThicknessMinimum;
	#else
		material.iridescenceThickness = iridescenceThicknessMaximum;
	#endif
#endif
#ifdef USE_SHEEN
	material.sheenColor = sheenColor;
	#ifdef USE_SHEEN_COLORMAP
		material.sheenColor *= texture2D( sheenColorMap, vSheenColorMapUv ).rgb;
	#endif
	material.sheenRoughness = clamp( sheenRoughness, 0.07, 1.0 );
	#ifdef USE_SHEEN_ROUGHNESSMAP
		material.sheenRoughness *= texture2D( sheenRoughnessMap, vSheenRoughnessMapUv ).a;
	#endif
#endif
#ifdef USE_ANISOTROPY
	#ifdef USE_ANISOTROPYMAP
		mat2 anisotropyMat = mat2( anisotropyVector.x, anisotropyVector.y, - anisotropyVector.y, anisotropyVector.x );
		vec3 anisotropyPolar = texture2D( anisotropyMap, vAnisotropyMapUv ).rgb;
		vec2 anisotropyV = anisotropyMat * normalize( 2.0 * anisotropyPolar.rg - vec2( 1.0 ) ) * anisotropyPolar.b;
	#else
		vec2 anisotropyV = anisotropyVector;
	#endif
	material.anisotropy = length( anisotropyV );
	anisotropyV /= material.anisotropy;
	material.anisotropy = saturate( material.anisotropy );
	material.alphaT = mix( pow2( material.roughness ), 1.0, pow2( material.anisotropy ) );
	material.anisotropyT = tbn[ 0 ] * anisotropyV.x - tbn[ 1 ] * anisotropyV.y;
	material.anisotropyB = tbn[ 1 ] * anisotropyV.x + tbn[ 0 ] * anisotropyV.y;
#endif`;
var lights_physical_pars_fragment = `struct PhysicalMaterial {
	vec3 diffuseColor;
	float roughness;
	vec3 specularColor;
	float specularF90;
	#ifdef USE_CLEARCOAT
		float clearcoat;
		float clearcoatRoughness;
		vec3 clearcoatF0;
		float clearcoatF90;
	#endif
	#ifdef USE_IRIDESCENCE
		float iridescence;
		float iridescenceIOR;
		float iridescenceThickness;
		vec3 iridescenceFresnel;
		vec3 iridescenceF0;
	#endif
	#ifdef USE_SHEEN
		vec3 sheenColor;
		float sheenRoughness;
	#endif
	#ifdef IOR
		float ior;
	#endif
	#ifdef USE_TRANSMISSION
		float transmission;
		float transmissionAlpha;
		float thickness;
		float attenuationDistance;
		vec3 attenuationColor;
	#endif
	#ifdef USE_ANISOTROPY
		float anisotropy;
		float alphaT;
		vec3 anisotropyT;
		vec3 anisotropyB;
	#endif
};
vec3 clearcoatSpecularDirect = vec3( 0.0 );
vec3 clearcoatSpecularIndirect = vec3( 0.0 );
vec3 sheenSpecularDirect = vec3( 0.0 );
vec3 sheenSpecularIndirect = vec3(0.0 );
vec3 Schlick_to_F0( const in vec3 f, const in float f90, const in float dotVH ) {
    float x = clamp( 1.0 - dotVH, 0.0, 1.0 );
    float x2 = x * x;
    float x5 = clamp( x * x2 * x2, 0.0, 0.9999 );
    return ( f - vec3( f90 ) * x5 ) / ( 1.0 - x5 );
}
float V_GGX_SmithCorrelated( const in float alpha, const in float dotNL, const in float dotNV ) {
	float a2 = pow2( alpha );
	float gv = dotNL * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNV ) );
	float gl = dotNV * sqrt( a2 + ( 1.0 - a2 ) * pow2( dotNL ) );
	return 0.5 / max( gv + gl, EPSILON );
}
float D_GGX( const in float alpha, const in float dotNH ) {
	float a2 = pow2( alpha );
	float denom = pow2( dotNH ) * ( a2 - 1.0 ) + 1.0;
	return RECIPROCAL_PI * a2 / pow2( denom );
}
#ifdef USE_ANISOTROPY
	float V_GGX_SmithCorrelated_Anisotropic( const in float alphaT, const in float alphaB, const in float dotTV, const in float dotBV, const in float dotTL, const in float dotBL, const in float dotNV, const in float dotNL ) {
		float gv = dotNL * length( vec3( alphaT * dotTV, alphaB * dotBV, dotNV ) );
		float gl = dotNV * length( vec3( alphaT * dotTL, alphaB * dotBL, dotNL ) );
		float v = 0.5 / ( gv + gl );
		return saturate(v);
	}
	float D_GGX_Anisotropic( const in float alphaT, const in float alphaB, const in float dotNH, const in float dotTH, const in float dotBH ) {
		float a2 = alphaT * alphaB;
		highp vec3 v = vec3( alphaB * dotTH, alphaT * dotBH, a2 * dotNH );
		highp float v2 = dot( v, v );
		float w2 = a2 / v2;
		return RECIPROCAL_PI * a2 * pow2 ( w2 );
	}
#endif
#ifdef USE_CLEARCOAT
	vec3 BRDF_GGX_Clearcoat( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material) {
		vec3 f0 = material.clearcoatF0;
		float f90 = material.clearcoatF90;
		float roughness = material.clearcoatRoughness;
		float alpha = pow2( roughness );
		vec3 halfDir = normalize( lightDir + viewDir );
		float dotNL = saturate( dot( normal, lightDir ) );
		float dotNV = saturate( dot( normal, viewDir ) );
		float dotNH = saturate( dot( normal, halfDir ) );
		float dotVH = saturate( dot( viewDir, halfDir ) );
		vec3 F = F_Schlick( f0, f90, dotVH );
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
		return F * ( V * D );
	}
#endif
vec3 BRDF_GGX( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, const in PhysicalMaterial material ) {
	vec3 f0 = material.specularColor;
	float f90 = material.specularF90;
	float roughness = material.roughness;
	float alpha = pow2( roughness );
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float dotVH = saturate( dot( viewDir, halfDir ) );
	vec3 F = F_Schlick( f0, f90, dotVH );
	#ifdef USE_IRIDESCENCE
		F = mix( F, material.iridescenceFresnel, material.iridescence );
	#endif
	#ifdef USE_ANISOTROPY
		float dotTL = dot( material.anisotropyT, lightDir );
		float dotTV = dot( material.anisotropyT, viewDir );
		float dotTH = dot( material.anisotropyT, halfDir );
		float dotBL = dot( material.anisotropyB, lightDir );
		float dotBV = dot( material.anisotropyB, viewDir );
		float dotBH = dot( material.anisotropyB, halfDir );
		float V = V_GGX_SmithCorrelated_Anisotropic( material.alphaT, alpha, dotTV, dotBV, dotTL, dotBL, dotNV, dotNL );
		float D = D_GGX_Anisotropic( material.alphaT, alpha, dotNH, dotTH, dotBH );
	#else
		float V = V_GGX_SmithCorrelated( alpha, dotNL, dotNV );
		float D = D_GGX( alpha, dotNH );
	#endif
	return F * ( V * D );
}
vec2 LTC_Uv( const in vec3 N, const in vec3 V, const in float roughness ) {
	const float LUT_SIZE = 64.0;
	const float LUT_SCALE = ( LUT_SIZE - 1.0 ) / LUT_SIZE;
	const float LUT_BIAS = 0.5 / LUT_SIZE;
	float dotNV = saturate( dot( N, V ) );
	vec2 uv = vec2( roughness, sqrt( 1.0 - dotNV ) );
	uv = uv * LUT_SCALE + LUT_BIAS;
	return uv;
}
float LTC_ClippedSphereFormFactor( const in vec3 f ) {
	float l = length( f );
	return max( ( l * l + f.z ) / ( l + 1.0 ), 0.0 );
}
vec3 LTC_EdgeVectorFormFactor( const in vec3 v1, const in vec3 v2 ) {
	float x = dot( v1, v2 );
	float y = abs( x );
	float a = 0.8543985 + ( 0.4965155 + 0.0145206 * y ) * y;
	float b = 3.4175940 + ( 4.1616724 + y ) * y;
	float v = a / b;
	float theta_sintheta = ( x > 0.0 ) ? v : 0.5 * inversesqrt( max( 1.0 - x * x, 1e-7 ) ) - v;
	return cross( v1, v2 ) * theta_sintheta;
}
vec3 LTC_Evaluate( const in vec3 N, const in vec3 V, const in vec3 P, const in mat3 mInv, const in vec3 rectCoords[ 4 ] ) {
	vec3 v1 = rectCoords[ 1 ] - rectCoords[ 0 ];
	vec3 v2 = rectCoords[ 3 ] - rectCoords[ 0 ];
	vec3 lightNormal = cross( v1, v2 );
	if( dot( lightNormal, P - rectCoords[ 0 ] ) < 0.0 ) return vec3( 0.0 );
	vec3 T1, T2;
	T1 = normalize( V - N * dot( V, N ) );
	T2 = - cross( N, T1 );
	mat3 mat = mInv * transposeMat3( mat3( T1, T2, N ) );
	vec3 coords[ 4 ];
	coords[ 0 ] = mat * ( rectCoords[ 0 ] - P );
	coords[ 1 ] = mat * ( rectCoords[ 1 ] - P );
	coords[ 2 ] = mat * ( rectCoords[ 2 ] - P );
	coords[ 3 ] = mat * ( rectCoords[ 3 ] - P );
	coords[ 0 ] = normalize( coords[ 0 ] );
	coords[ 1 ] = normalize( coords[ 1 ] );
	coords[ 2 ] = normalize( coords[ 2 ] );
	coords[ 3 ] = normalize( coords[ 3 ] );
	vec3 vectorFormFactor = vec3( 0.0 );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 0 ], coords[ 1 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 1 ], coords[ 2 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 2 ], coords[ 3 ] );
	vectorFormFactor += LTC_EdgeVectorFormFactor( coords[ 3 ], coords[ 0 ] );
	float result = LTC_ClippedSphereFormFactor( vectorFormFactor );
	return vec3( result );
}
#if defined( USE_SHEEN )
float D_Charlie( float roughness, float dotNH ) {
	float alpha = pow2( roughness );
	float invAlpha = 1.0 / alpha;
	float cos2h = dotNH * dotNH;
	float sin2h = max( 1.0 - cos2h, 0.0078125 );
	return ( 2.0 + invAlpha ) * pow( sin2h, invAlpha * 0.5 ) / ( 2.0 * PI );
}
float V_Neubelt( float dotNV, float dotNL ) {
	return saturate( 1.0 / ( 4.0 * ( dotNL + dotNV - dotNL * dotNV ) ) );
}
vec3 BRDF_Sheen( const in vec3 lightDir, const in vec3 viewDir, const in vec3 normal, vec3 sheenColor, const in float sheenRoughness ) {
	vec3 halfDir = normalize( lightDir + viewDir );
	float dotNL = saturate( dot( normal, lightDir ) );
	float dotNV = saturate( dot( normal, viewDir ) );
	float dotNH = saturate( dot( normal, halfDir ) );
	float D = D_Charlie( sheenRoughness, dotNH );
	float V = V_Neubelt( dotNV, dotNL );
	return sheenColor * ( D * V );
}
#endif
float IBLSheenBRDF( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	float r2 = roughness * roughness;
	float a = roughness < 0.25 ? -339.2 * r2 + 161.4 * roughness - 25.9 : -8.48 * r2 + 14.3 * roughness - 9.95;
	float b = roughness < 0.25 ? 44.0 * r2 - 23.7 * roughness + 3.26 : 1.97 * r2 - 3.27 * roughness + 0.72;
	float DG = exp( a * dotNV + b ) + ( roughness < 0.25 ? 0.0 : 0.1 * ( roughness - 0.25 ) );
	return saturate( DG * RECIPROCAL_PI );
}
vec2 DFGApprox( const in vec3 normal, const in vec3 viewDir, const in float roughness ) {
	float dotNV = saturate( dot( normal, viewDir ) );
	const vec4 c0 = vec4( - 1, - 0.0275, - 0.572, 0.022 );
	const vec4 c1 = vec4( 1, 0.0425, 1.04, - 0.04 );
	vec4 r = roughness * c0 + c1;
	float a004 = min( r.x * r.x, exp2( - 9.28 * dotNV ) ) * r.x + r.y;
	vec2 fab = vec2( - 1.04, 1.04 ) * a004 + r.zw;
	return fab;
}
vec3 EnvironmentBRDF( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness ) {
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	return specularColor * fab.x + specularF90 * fab.y;
}
#ifdef USE_IRIDESCENCE
void computeMultiscatteringIridescence( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float iridescence, const in vec3 iridescenceF0, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#else
void computeMultiscattering( const in vec3 normal, const in vec3 viewDir, const in vec3 specularColor, const in float specularF90, const in float roughness, inout vec3 singleScatter, inout vec3 multiScatter ) {
#endif
	vec2 fab = DFGApprox( normal, viewDir, roughness );
	#ifdef USE_IRIDESCENCE
		vec3 Fr = mix( specularColor, iridescenceF0, iridescence );
	#else
		vec3 Fr = specularColor;
	#endif
	vec3 FssEss = Fr * fab.x + specularF90 * fab.y;
	float Ess = fab.x + fab.y;
	float Ems = 1.0 - Ess;
	vec3 Favg = Fr + ( 1.0 - Fr ) * 0.047619;	vec3 Fms = FssEss * Favg / ( 1.0 - Ems * Favg );
	singleScatter += FssEss;
	multiScatter += Fms * Ems;
}
#if NUM_RECT_AREA_LIGHTS > 0
	void RE_Direct_RectArea_Physical( const in RectAreaLight rectAreaLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
		vec3 normal = geometryNormal;
		vec3 viewDir = geometryViewDir;
		vec3 position = geometryPosition;
		vec3 lightPos = rectAreaLight.position;
		vec3 halfWidth = rectAreaLight.halfWidth;
		vec3 halfHeight = rectAreaLight.halfHeight;
		vec3 lightColor = rectAreaLight.color;
		float roughness = material.roughness;
		vec3 rectCoords[ 4 ];
		rectCoords[ 0 ] = lightPos + halfWidth - halfHeight;		rectCoords[ 1 ] = lightPos - halfWidth - halfHeight;
		rectCoords[ 2 ] = lightPos - halfWidth + halfHeight;
		rectCoords[ 3 ] = lightPos + halfWidth + halfHeight;
		vec2 uv = LTC_Uv( normal, viewDir, roughness );
		vec4 t1 = texture2D( ltc_1, uv );
		vec4 t2 = texture2D( ltc_2, uv );
		mat3 mInv = mat3(
			vec3( t1.x, 0, t1.y ),
			vec3(    0, 1,    0 ),
			vec3( t1.z, 0, t1.w )
		);
		vec3 fresnel = ( material.specularColor * t2.x + ( vec3( 1.0 ) - material.specularColor ) * t2.y );
		reflectedLight.directSpecular += lightColor * fresnel * LTC_Evaluate( normal, viewDir, position, mInv, rectCoords );
		reflectedLight.directDiffuse += lightColor * material.diffuseColor * LTC_Evaluate( normal, viewDir, position, mat3( 1.0 ), rectCoords );
	}
#endif
void RE_Direct_Physical( const in IncidentLight directLight, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	float dotNL = saturate( dot( geometryNormal, directLight.direction ) );
	vec3 irradiance = dotNL * directLight.color;
	#ifdef USE_CLEARCOAT
		float dotNLcc = saturate( dot( geometryClearcoatNormal, directLight.direction ) );
		vec3 ccIrradiance = dotNLcc * directLight.color;
		clearcoatSpecularDirect += ccIrradiance * BRDF_GGX_Clearcoat( directLight.direction, geometryViewDir, geometryClearcoatNormal, material );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularDirect += irradiance * BRDF_Sheen( directLight.direction, geometryViewDir, geometryNormal, material.sheenColor, material.sheenRoughness );
	#endif
	reflectedLight.directSpecular += irradiance * BRDF_GGX( directLight.direction, geometryViewDir, geometryNormal, material );
	reflectedLight.directDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectDiffuse_Physical( const in vec3 irradiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight ) {
	reflectedLight.indirectDiffuse += irradiance * BRDF_Lambert( material.diffuseColor );
}
void RE_IndirectSpecular_Physical( const in vec3 radiance, const in vec3 irradiance, const in vec3 clearcoatRadiance, const in vec3 geometryPosition, const in vec3 geometryNormal, const in vec3 geometryViewDir, const in vec3 geometryClearcoatNormal, const in PhysicalMaterial material, inout ReflectedLight reflectedLight) {
	#ifdef USE_CLEARCOAT
		clearcoatSpecularIndirect += clearcoatRadiance * EnvironmentBRDF( geometryClearcoatNormal, geometryViewDir, material.clearcoatF0, material.clearcoatF90, material.clearcoatRoughness );
	#endif
	#ifdef USE_SHEEN
		sheenSpecularIndirect += irradiance * material.sheenColor * IBLSheenBRDF( geometryNormal, geometryViewDir, material.sheenRoughness );
	#endif
	vec3 singleScattering = vec3( 0.0 );
	vec3 multiScattering = vec3( 0.0 );
	vec3 cosineWeightedIrradiance = irradiance * RECIPROCAL_PI;
	#ifdef USE_IRIDESCENCE
		computeMultiscatteringIridescence( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.iridescence, material.iridescenceFresnel, material.roughness, singleScattering, multiScattering );
	#else
		computeMultiscattering( geometryNormal, geometryViewDir, material.specularColor, material.specularF90, material.roughness, singleScattering, multiScattering );
	#endif
	vec3 totalScattering = singleScattering + multiScattering;
	vec3 diffuse = material.diffuseColor * ( 1.0 - max( max( totalScattering.r, totalScattering.g ), totalScattering.b ) );
	reflectedLight.indirectSpecular += radiance * singleScattering;
	reflectedLight.indirectSpecular += multiScattering * cosineWeightedIrradiance;
	reflectedLight.indirectDiffuse += diffuse * cosineWeightedIrradiance;
}
#define RE_Direct				RE_Direct_Physical
#define RE_Direct_RectArea		RE_Direct_RectArea_Physical
#define RE_IndirectDiffuse		RE_IndirectDiffuse_Physical
#define RE_IndirectSpecular		RE_IndirectSpecular_Physical
float computeSpecularOcclusion( const in float dotNV, const in float ambientOcclusion, const in float roughness ) {
	return saturate( pow( dotNV + ambientOcclusion, exp2( - 16.0 * roughness - 1.0 ) ) - 1.0 + ambientOcclusion );
}`;
var lights_fragment_begin = `
vec3 geometryPosition = - vViewPosition;
vec3 geometryNormal = normal;
vec3 geometryViewDir = ( isOrthographic ) ? vec3( 0, 0, 1 ) : normalize( vViewPosition );
vec3 geometryClearcoatNormal = vec3( 0.0 );
#ifdef USE_CLEARCOAT
	geometryClearcoatNormal = clearcoatNormal;
#endif
#ifdef USE_IRIDESCENCE
	float dotNVi = saturate( dot( normal, geometryViewDir ) );
	if ( material.iridescenceThickness == 0.0 ) {
		material.iridescence = 0.0;
	} else {
		material.iridescence = saturate( material.iridescence );
	}
	if ( material.iridescence > 0.0 ) {
		material.iridescenceFresnel = evalIridescence( 1.0, material.iridescenceIOR, dotNVi, material.iridescenceThickness, material.specularColor );
		material.iridescenceF0 = Schlick_to_F0( material.iridescenceFresnel, 1.0, dotNVi );
	}
#endif
IncidentLight directLight;
#if ( NUM_POINT_LIGHTS > 0 ) && defined( RE_Direct )
	PointLight pointLight;
	#if defined( USE_SHADOWMAP ) && NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHTS; i ++ ) {
		pointLight = pointLights[ i ];
		getPointLightInfo( pointLight, geometryPosition, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_POINT_LIGHT_SHADOWS )
		pointLightShadow = pointLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getPointShadow( pointShadowMap[ i ], pointLightShadow.shadowMapSize, pointLightShadow.shadowBias, pointLightShadow.shadowRadius, vPointShadowCoord[ i ], pointLightShadow.shadowCameraNear, pointLightShadow.shadowCameraFar ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_SPOT_LIGHTS > 0 ) && defined( RE_Direct )
	SpotLight spotLight;
	vec4 spotColor;
	vec3 spotLightCoord;
	bool inSpotLightMap;
	#if defined( USE_SHADOWMAP ) && NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHTS; i ++ ) {
		spotLight = spotLights[ i ];
		getSpotLightInfo( spotLight, geometryPosition, directLight );
		#if ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#define SPOT_LIGHT_MAP_INDEX UNROLLED_LOOP_INDEX
		#elif ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		#define SPOT_LIGHT_MAP_INDEX NUM_SPOT_LIGHT_MAPS
		#else
		#define SPOT_LIGHT_MAP_INDEX ( UNROLLED_LOOP_INDEX - NUM_SPOT_LIGHT_SHADOWS + NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS )
		#endif
		#if ( SPOT_LIGHT_MAP_INDEX < NUM_SPOT_LIGHT_MAPS )
			spotLightCoord = vSpotLightCoord[ i ].xyz / vSpotLightCoord[ i ].w;
			inSpotLightMap = all( lessThan( abs( spotLightCoord * 2. - 1. ), vec3( 1.0 ) ) );
			spotColor = texture2D( spotLightMap[ SPOT_LIGHT_MAP_INDEX ], spotLightCoord.xy );
			directLight.color = inSpotLightMap ? directLight.color * spotColor.rgb : directLight.color;
		#endif
		#undef SPOT_LIGHT_MAP_INDEX
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
		spotLightShadow = spotLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( spotShadowMap[ i ], spotLightShadow.shadowMapSize, spotLightShadow.shadowBias, spotLightShadow.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_DIR_LIGHTS > 0 ) && defined( RE_Direct )
	DirectionalLight directionalLight;
	#if defined( USE_SHADOWMAP ) && NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLightShadow;
	#endif
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHTS; i ++ ) {
		directionalLight = directionalLights[ i ];
		getDirectionalLightInfo( directionalLight, directLight );
		#if defined( USE_SHADOWMAP ) && ( UNROLLED_LOOP_INDEX < NUM_DIR_LIGHT_SHADOWS )
		directionalLightShadow = directionalLightShadows[ i ];
		directLight.color *= ( directLight.visible && receiveShadow ) ? getShadow( directionalShadowMap[ i ], directionalLightShadow.shadowMapSize, directionalLightShadow.shadowBias, directionalLightShadow.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
		#endif
		RE_Direct( directLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if ( NUM_RECT_AREA_LIGHTS > 0 ) && defined( RE_Direct_RectArea )
	RectAreaLight rectAreaLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_RECT_AREA_LIGHTS; i ++ ) {
		rectAreaLight = rectAreaLights[ i ];
		RE_Direct_RectArea( rectAreaLight, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
	}
	#pragma unroll_loop_end
#endif
#if defined( RE_IndirectDiffuse )
	vec3 iblIrradiance = vec3( 0.0 );
	vec3 irradiance = getAmbientLightIrradiance( ambientLightColor );
	#if defined( USE_LIGHT_PROBES )
		irradiance += getLightProbeIrradiance( lightProbe, geometryNormal );
	#endif
	#if ( NUM_HEMI_LIGHTS > 0 )
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_HEMI_LIGHTS; i ++ ) {
			irradiance += getHemisphereLightIrradiance( hemisphereLights[ i ], geometryNormal );
		}
		#pragma unroll_loop_end
	#endif
#endif
#if defined( RE_IndirectSpecular )
	vec3 radiance = vec3( 0.0 );
	vec3 clearcoatRadiance = vec3( 0.0 );
#endif`;
var lights_fragment_maps = `#if defined( RE_IndirectDiffuse )
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		vec3 lightMapIrradiance = lightMapTexel.rgb * lightMapIntensity;
		irradiance += lightMapIrradiance;
	#endif
	#if defined( USE_ENVMAP ) && defined( STANDARD ) && defined( ENVMAP_TYPE_CUBE_UV )
		iblIrradiance += getIBLIrradiance( geometryNormal );
	#endif
#endif
#if defined( USE_ENVMAP ) && defined( RE_IndirectSpecular )
	#ifdef USE_ANISOTROPY
		radiance += getIBLAnisotropyRadiance( geometryViewDir, geometryNormal, material.roughness, material.anisotropyB, material.anisotropy );
	#else
		radiance += getIBLRadiance( geometryViewDir, geometryNormal, material.roughness );
	#endif
	#ifdef USE_CLEARCOAT
		clearcoatRadiance += getIBLRadiance( geometryViewDir, geometryClearcoatNormal, material.clearcoatRoughness );
	#endif
#endif`;
var lights_fragment_end = `#if defined( RE_IndirectDiffuse )
	RE_IndirectDiffuse( irradiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif
#if defined( RE_IndirectSpecular )
	RE_IndirectSpecular( radiance, iblIrradiance, clearcoatRadiance, geometryPosition, geometryNormal, geometryViewDir, geometryClearcoatNormal, material, reflectedLight );
#endif`;
var logdepthbuf_fragment = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	gl_FragDepthEXT = vIsPerspective == 0.0 ? gl_FragCoord.z : log2( vFragDepth ) * logDepthBufFC * 0.5;
#endif`;
var logdepthbuf_pars_fragment = `#if defined( USE_LOGDEPTHBUF ) && defined( USE_LOGDEPTHBUF_EXT )
	uniform float logDepthBufFC;
	varying float vFragDepth;
	varying float vIsPerspective;
#endif`;
var logdepthbuf_pars_vertex = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		varying float vFragDepth;
		varying float vIsPerspective;
	#else
		uniform float logDepthBufFC;
	#endif
#endif`;
var logdepthbuf_vertex = `#ifdef USE_LOGDEPTHBUF
	#ifdef USE_LOGDEPTHBUF_EXT
		vFragDepth = 1.0 + gl_Position.w;
		vIsPerspective = float( isPerspectiveMatrix( projectionMatrix ) );
	#else
		if ( isPerspectiveMatrix( projectionMatrix ) ) {
			gl_Position.z = log2( max( EPSILON, gl_Position.w + 1.0 ) ) * logDepthBufFC - 1.0;
			gl_Position.z *= gl_Position.w;
		}
	#endif
#endif`;
var map_fragment = `#ifdef USE_MAP
	vec4 sampledDiffuseColor = texture2D( map, vMapUv );
	#ifdef DECODE_VIDEO_TEXTURE
		sampledDiffuseColor = vec4( mix( pow( sampledDiffuseColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), sampledDiffuseColor.rgb * 0.0773993808, vec3( lessThanEqual( sampledDiffuseColor.rgb, vec3( 0.04045 ) ) ) ), sampledDiffuseColor.w );
	
	#endif
	diffuseColor *= sampledDiffuseColor;
#endif`;
var map_pars_fragment = `#ifdef USE_MAP
	uniform sampler2D map;
#endif`;
var map_particle_fragment = `#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
	#if defined( USE_POINTS_UV )
		vec2 uv = vUv;
	#else
		vec2 uv = ( uvTransform * vec3( gl_PointCoord.x, 1.0 - gl_PointCoord.y, 1 ) ).xy;
	#endif
#endif
#ifdef USE_MAP
	diffuseColor *= texture2D( map, uv );
#endif
#ifdef USE_ALPHAMAP
	diffuseColor.a *= texture2D( alphaMap, uv ).g;
#endif`;
var map_particle_pars_fragment = `#if defined( USE_POINTS_UV )
	varying vec2 vUv;
#else
	#if defined( USE_MAP ) || defined( USE_ALPHAMAP )
		uniform mat3 uvTransform;
	#endif
#endif
#ifdef USE_MAP
	uniform sampler2D map;
#endif
#ifdef USE_ALPHAMAP
	uniform sampler2D alphaMap;
#endif`;
var metalnessmap_fragment = `float metalnessFactor = metalness;
#ifdef USE_METALNESSMAP
	vec4 texelMetalness = texture2D( metalnessMap, vMetalnessMapUv );
	metalnessFactor *= texelMetalness.b;
#endif`;
var metalnessmap_pars_fragment = `#ifdef USE_METALNESSMAP
	uniform sampler2D metalnessMap;
#endif`;
var morphcolor_vertex = `#if defined( USE_MORPHCOLORS ) && defined( MORPHTARGETS_TEXTURE )
	vColor *= morphTargetBaseInfluence;
	for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
		#if defined( USE_COLOR_ALPHA )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ) * morphTargetInfluences[ i ];
		#elif defined( USE_COLOR )
			if ( morphTargetInfluences[ i ] != 0.0 ) vColor += getMorph( gl_VertexID, i, 2 ).rgb * morphTargetInfluences[ i ];
		#endif
	}
#endif`;
var morphnormal_vertex = `#ifdef USE_MORPHNORMALS
	objectNormal *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) objectNormal += getMorph( gl_VertexID, i, 1 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		objectNormal += morphNormal0 * morphTargetInfluences[ 0 ];
		objectNormal += morphNormal1 * morphTargetInfluences[ 1 ];
		objectNormal += morphNormal2 * morphTargetInfluences[ 2 ];
		objectNormal += morphNormal3 * morphTargetInfluences[ 3 ];
	#endif
#endif`;
var morphtarget_pars_vertex = `#ifdef USE_MORPHTARGETS
	uniform float morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		uniform float morphTargetInfluences[ MORPHTARGETS_COUNT ];
		uniform sampler2DArray morphTargetsTexture;
		uniform ivec2 morphTargetsTextureSize;
		vec4 getMorph( const in int vertexIndex, const in int morphTargetIndex, const in int offset ) {
			int texelIndex = vertexIndex * MORPHTARGETS_TEXTURE_STRIDE + offset;
			int y = texelIndex / morphTargetsTextureSize.x;
			int x = texelIndex - y * morphTargetsTextureSize.x;
			ivec3 morphUV = ivec3( x, y, morphTargetIndex );
			return texelFetch( morphTargetsTexture, morphUV, 0 );
		}
	#else
		#ifndef USE_MORPHNORMALS
			uniform float morphTargetInfluences[ 8 ];
		#else
			uniform float morphTargetInfluences[ 4 ];
		#endif
	#endif
#endif`;
var morphtarget_vertex = `#ifdef USE_MORPHTARGETS
	transformed *= morphTargetBaseInfluence;
	#ifdef MORPHTARGETS_TEXTURE
		for ( int i = 0; i < MORPHTARGETS_COUNT; i ++ ) {
			if ( morphTargetInfluences[ i ] != 0.0 ) transformed += getMorph( gl_VertexID, i, 0 ).xyz * morphTargetInfluences[ i ];
		}
	#else
		transformed += morphTarget0 * morphTargetInfluences[ 0 ];
		transformed += morphTarget1 * morphTargetInfluences[ 1 ];
		transformed += morphTarget2 * morphTargetInfluences[ 2 ];
		transformed += morphTarget3 * morphTargetInfluences[ 3 ];
		#ifndef USE_MORPHNORMALS
			transformed += morphTarget4 * morphTargetInfluences[ 4 ];
			transformed += morphTarget5 * morphTargetInfluences[ 5 ];
			transformed += morphTarget6 * morphTargetInfluences[ 6 ];
			transformed += morphTarget7 * morphTargetInfluences[ 7 ];
		#endif
	#endif
#endif`;
var normal_fragment_begin = `float faceDirection = gl_FrontFacing ? 1.0 : - 1.0;
#ifdef FLAT_SHADED
	vec3 fdx = dFdx( vViewPosition );
	vec3 fdy = dFdy( vViewPosition );
	vec3 normal = normalize( cross( fdx, fdy ) );
#else
	vec3 normal = normalize( vNormal );
	#ifdef DOUBLE_SIDED
		normal *= faceDirection;
	#endif
#endif
#if defined( USE_NORMALMAP_TANGENTSPACE ) || defined( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY )
	#ifdef USE_TANGENT
		mat3 tbn = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn = getTangentFrame( - vViewPosition, normal,
		#if defined( USE_NORMALMAP )
			vNormalMapUv
		#elif defined( USE_CLEARCOAT_NORMALMAP )
			vClearcoatNormalMapUv
		#else
			vUv
		#endif
		);
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn[0] *= faceDirection;
		tbn[1] *= faceDirection;
	#endif
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	#ifdef USE_TANGENT
		mat3 tbn2 = mat3( normalize( vTangent ), normalize( vBitangent ), normal );
	#else
		mat3 tbn2 = getTangentFrame( - vViewPosition, normal, vClearcoatNormalMapUv );
	#endif
	#if defined( DOUBLE_SIDED ) && ! defined( FLAT_SHADED )
		tbn2[0] *= faceDirection;
		tbn2[1] *= faceDirection;
	#endif
#endif
vec3 nonPerturbedNormal = normal;`;
var normal_fragment_maps = `#ifdef USE_NORMALMAP_OBJECTSPACE
	normal = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	#ifdef FLIP_SIDED
		normal = - normal;
	#endif
	#ifdef DOUBLE_SIDED
		normal = normal * faceDirection;
	#endif
	normal = normalize( normalMatrix * normal );
#elif defined( USE_NORMALMAP_TANGENTSPACE )
	vec3 mapN = texture2D( normalMap, vNormalMapUv ).xyz * 2.0 - 1.0;
	mapN.xy *= normalScale;
	normal = normalize( tbn * mapN );
#elif defined( USE_BUMPMAP )
	normal = perturbNormalArb( - vViewPosition, normal, dHdxy_fwd(), faceDirection );
#endif`;
var normal_pars_fragment = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`;
var normal_pars_vertex = `#ifndef FLAT_SHADED
	varying vec3 vNormal;
	#ifdef USE_TANGENT
		varying vec3 vTangent;
		varying vec3 vBitangent;
	#endif
#endif`;
var normal_vertex = `#ifndef FLAT_SHADED
	vNormal = normalize( transformedNormal );
	#ifdef USE_TANGENT
		vTangent = normalize( transformedTangent );
		vBitangent = normalize( cross( vNormal, vTangent ) * tangent.w );
	#endif
#endif`;
var normalmap_pars_fragment = `#ifdef USE_NORMALMAP
	uniform sampler2D normalMap;
	uniform vec2 normalScale;
#endif
#ifdef USE_NORMALMAP_OBJECTSPACE
	uniform mat3 normalMatrix;
#endif
#if ! defined ( USE_TANGENT ) && ( defined ( USE_NORMALMAP_TANGENTSPACE ) || defined ( USE_CLEARCOAT_NORMALMAP ) || defined( USE_ANISOTROPY ) )
	mat3 getTangentFrame( vec3 eye_pos, vec3 surf_norm, vec2 uv ) {
		vec3 q0 = dFdx( eye_pos.xyz );
		vec3 q1 = dFdy( eye_pos.xyz );
		vec2 st0 = dFdx( uv.st );
		vec2 st1 = dFdy( uv.st );
		vec3 N = surf_norm;
		vec3 q1perp = cross( q1, N );
		vec3 q0perp = cross( N, q0 );
		vec3 T = q1perp * st0.x + q0perp * st1.x;
		vec3 B = q1perp * st0.y + q0perp * st1.y;
		float det = max( dot( T, T ), dot( B, B ) );
		float scale = ( det == 0.0 ) ? 0.0 : inversesqrt( det );
		return mat3( T * scale, B * scale, N );
	}
#endif`;
var clearcoat_normal_fragment_begin = `#ifdef USE_CLEARCOAT
	vec3 clearcoatNormal = nonPerturbedNormal;
#endif`;
var clearcoat_normal_fragment_maps = `#ifdef USE_CLEARCOAT_NORMALMAP
	vec3 clearcoatMapN = texture2D( clearcoatNormalMap, vClearcoatNormalMapUv ).xyz * 2.0 - 1.0;
	clearcoatMapN.xy *= clearcoatNormalScale;
	clearcoatNormal = normalize( tbn2 * clearcoatMapN );
#endif`;
var clearcoat_pars_fragment = `#ifdef USE_CLEARCOATMAP
	uniform sampler2D clearcoatMap;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform sampler2D clearcoatNormalMap;
	uniform vec2 clearcoatNormalScale;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform sampler2D clearcoatRoughnessMap;
#endif`;
var iridescence_pars_fragment = `#ifdef USE_IRIDESCENCEMAP
	uniform sampler2D iridescenceMap;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform sampler2D iridescenceThicknessMap;
#endif`;
var opaque_fragment = `#ifdef OPAQUE
diffuseColor.a = 1.0;
#endif
#ifdef USE_TRANSMISSION
diffuseColor.a *= material.transmissionAlpha;
#endif
gl_FragColor = vec4( outgoingLight, diffuseColor.a );`;
var packing = `vec3 packNormalToRGB( const in vec3 normal ) {
	return normalize( normal ) * 0.5 + 0.5;
}
vec3 unpackRGBToNormal( const in vec3 rgb ) {
	return 2.0 * rgb.xyz - 1.0;
}
const float PackUpscale = 256. / 255.;const float UnpackDownscale = 255. / 256.;
const vec3 PackFactors = vec3( 256. * 256. * 256., 256. * 256., 256. );
const vec4 UnpackFactors = UnpackDownscale / vec4( PackFactors, 1. );
const float ShiftRight8 = 1. / 256.;
vec4 packDepthToRGBA( const in float v ) {
	vec4 r = vec4( fract( v * PackFactors ), v );
	r.yzw -= r.xyz * ShiftRight8;	return r * PackUpscale;
}
float unpackRGBAToDepth( const in vec4 v ) {
	return dot( v, UnpackFactors );
}
vec2 packDepthToRG( in highp float v ) {
	return packDepthToRGBA( v ).yx;
}
float unpackRGToDepth( const in highp vec2 v ) {
	return unpackRGBAToDepth( vec4( v.xy, 0.0, 0.0 ) );
}
vec4 pack2HalfToRGBA( vec2 v ) {
	vec4 r = vec4( v.x, fract( v.x * 255.0 ), v.y, fract( v.y * 255.0 ) );
	return vec4( r.x - r.y / 255.0, r.y, r.z - r.w / 255.0, r.w );
}
vec2 unpackRGBATo2Half( vec4 v ) {
	return vec2( v.x + ( v.y / 255.0 ), v.z + ( v.w / 255.0 ) );
}
float viewZToOrthographicDepth( const in float viewZ, const in float near, const in float far ) {
	return ( viewZ + near ) / ( near - far );
}
float orthographicDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return depth * ( near - far ) - near;
}
float viewZToPerspectiveDepth( const in float viewZ, const in float near, const in float far ) {
	return ( ( near + viewZ ) * far ) / ( ( far - near ) * viewZ );
}
float perspectiveDepthToViewZ( const in float depth, const in float near, const in float far ) {
	return ( near * far ) / ( ( far - near ) * depth - far );
}`;
var premultiplied_alpha_fragment = `#ifdef PREMULTIPLIED_ALPHA
	gl_FragColor.rgb *= gl_FragColor.a;
#endif`;
var project_vertex = `vec4 mvPosition = vec4( transformed, 1.0 );
#ifdef USE_INSTANCING
	mvPosition = instanceMatrix * mvPosition;
#endif
mvPosition = modelViewMatrix * mvPosition;
gl_Position = projectionMatrix * mvPosition;`;
var dithering_fragment = `#ifdef DITHERING
	gl_FragColor.rgb = dithering( gl_FragColor.rgb );
#endif`;
var dithering_pars_fragment = `#ifdef DITHERING
	vec3 dithering( vec3 color ) {
		float grid_position = rand( gl_FragCoord.xy );
		vec3 dither_shift_RGB = vec3( 0.25 / 255.0, -0.25 / 255.0, 0.25 / 255.0 );
		dither_shift_RGB = mix( 2.0 * dither_shift_RGB, -2.0 * dither_shift_RGB, grid_position );
		return color + dither_shift_RGB;
	}
#endif`;
var roughnessmap_fragment = `float roughnessFactor = roughness;
#ifdef USE_ROUGHNESSMAP
	vec4 texelRoughness = texture2D( roughnessMap, vRoughnessMapUv );
	roughnessFactor *= texelRoughness.g;
#endif`;
var roughnessmap_pars_fragment = `#ifdef USE_ROUGHNESSMAP
	uniform sampler2D roughnessMap;
#endif`;
var shadowmap_pars_fragment = `#if NUM_SPOT_LIGHT_COORDS > 0
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#if NUM_SPOT_LIGHT_MAPS > 0
	uniform sampler2D spotLightMap[ NUM_SPOT_LIGHT_MAPS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform sampler2D directionalShadowMap[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		uniform sampler2D spotShadowMap[ NUM_SPOT_LIGHT_SHADOWS ];
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform sampler2D pointShadowMap[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
	float texture2DCompare( sampler2D depths, vec2 uv, float compare ) {
		return step( compare, unpackRGBAToDepth( texture2D( depths, uv ) ) );
	}
	vec2 texture2DDistribution( sampler2D shadow, vec2 uv ) {
		return unpackRGBATo2Half( texture2D( shadow, uv ) );
	}
	float VSMShadow (sampler2D shadow, vec2 uv, float compare ){
		float occlusion = 1.0;
		vec2 distribution = texture2DDistribution( shadow, uv );
		float hard_shadow = step( compare , distribution.x );
		if (hard_shadow != 1.0 ) {
			float distance = compare - distribution.x ;
			float variance = max( 0.00000, distribution.y * distribution.y );
			float softness_probability = variance / (variance + distance * distance );			softness_probability = clamp( ( softness_probability - 0.3 ) / ( 0.95 - 0.3 ), 0.0, 1.0 );			occlusion = clamp( max( hard_shadow, softness_probability ), 0.0, 1.0 );
		}
		return occlusion;
	}
	float getShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord ) {
		float shadow = 1.0;
		shadowCoord.xyz /= shadowCoord.w;
		shadowCoord.z += shadowBias;
		bool inFrustum = shadowCoord.x >= 0.0 && shadowCoord.x <= 1.0 && shadowCoord.y >= 0.0 && shadowCoord.y <= 1.0;
		bool frustumTest = inFrustum && shadowCoord.z <= 1.0;
		if ( frustumTest ) {
		#if defined( SHADOWMAP_TYPE_PCF )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx0 = - texelSize.x * shadowRadius;
			float dy0 = - texelSize.y * shadowRadius;
			float dx1 = + texelSize.x * shadowRadius;
			float dy1 = + texelSize.y * shadowRadius;
			float dx2 = dx0 / 2.0;
			float dy2 = dy0 / 2.0;
			float dx3 = dx1 / 2.0;
			float dy3 = dy1 / 2.0;
			shadow = (
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy2 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx2, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx3, dy3 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( 0.0, dy1 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, shadowCoord.xy + vec2( dx1, dy1 ), shadowCoord.z )
			) * ( 1.0 / 17.0 );
		#elif defined( SHADOWMAP_TYPE_PCF_SOFT )
			vec2 texelSize = vec2( 1.0 ) / shadowMapSize;
			float dx = texelSize.x;
			float dy = texelSize.y;
			vec2 uv = shadowCoord.xy;
			vec2 f = fract( uv * shadowMapSize + 0.5 );
			uv -= f * texelSize;
			shadow = (
				texture2DCompare( shadowMap, uv, shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( dx, 0.0 ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + vec2( 0.0, dy ), shadowCoord.z ) +
				texture2DCompare( shadowMap, uv + texelSize, shadowCoord.z ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, 0.0 ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 0.0 ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( -dx, dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, dy ), shadowCoord.z ),
					 f.x ) +
				mix( texture2DCompare( shadowMap, uv + vec2( 0.0, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( 0.0, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( texture2DCompare( shadowMap, uv + vec2( dx, -dy ), shadowCoord.z ),
					 texture2DCompare( shadowMap, uv + vec2( dx, 2.0 * dy ), shadowCoord.z ),
					 f.y ) +
				mix( mix( texture2DCompare( shadowMap, uv + vec2( -dx, -dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, -dy ), shadowCoord.z ),
						  f.x ),
					 mix( texture2DCompare( shadowMap, uv + vec2( -dx, 2.0 * dy ), shadowCoord.z ),
						  texture2DCompare( shadowMap, uv + vec2( 2.0 * dx, 2.0 * dy ), shadowCoord.z ),
						  f.x ),
					 f.y )
			) * ( 1.0 / 9.0 );
		#elif defined( SHADOWMAP_TYPE_VSM )
			shadow = VSMShadow( shadowMap, shadowCoord.xy, shadowCoord.z );
		#else
			shadow = texture2DCompare( shadowMap, shadowCoord.xy, shadowCoord.z );
		#endif
		}
		return shadow;
	}
	vec2 cubeToUV( vec3 v, float texelSizeY ) {
		vec3 absV = abs( v );
		float scaleToCube = 1.0 / max( absV.x, max( absV.y, absV.z ) );
		absV *= scaleToCube;
		v *= scaleToCube * ( 1.0 - 2.0 * texelSizeY );
		vec2 planar = v.xy;
		float almostATexel = 1.5 * texelSizeY;
		float almostOne = 1.0 - almostATexel;
		if ( absV.z >= almostOne ) {
			if ( v.z > 0.0 )
				planar.x = 4.0 - v.x;
		} else if ( absV.x >= almostOne ) {
			float signX = sign( v.x );
			planar.x = v.z * signX + 2.0 * signX;
		} else if ( absV.y >= almostOne ) {
			float signY = sign( v.y );
			planar.x = v.x + 2.0 * signY + 2.0;
			planar.y = v.z * signY - 2.0;
		}
		return vec2( 0.125, 0.25 ) * planar + vec2( 0.375, 0.75 );
	}
	float getPointShadow( sampler2D shadowMap, vec2 shadowMapSize, float shadowBias, float shadowRadius, vec4 shadowCoord, float shadowCameraNear, float shadowCameraFar ) {
		vec2 texelSize = vec2( 1.0 ) / ( shadowMapSize * vec2( 4.0, 2.0 ) );
		vec3 lightToPosition = shadowCoord.xyz;
		float dp = ( length( lightToPosition ) - shadowCameraNear ) / ( shadowCameraFar - shadowCameraNear );		dp += shadowBias;
		vec3 bd3D = normalize( lightToPosition );
		#if defined( SHADOWMAP_TYPE_PCF ) || defined( SHADOWMAP_TYPE_PCF_SOFT ) || defined( SHADOWMAP_TYPE_VSM )
			vec2 offset = vec2( - 1, 1 ) * shadowRadius * texelSize.y;
			return (
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yyx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxy, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.xxx, texelSize.y ), dp ) +
				texture2DCompare( shadowMap, cubeToUV( bd3D + offset.yxx, texelSize.y ), dp )
			) * ( 1.0 / 9.0 );
		#else
			return texture2DCompare( shadowMap, cubeToUV( bd3D, texelSize.y ), dp );
		#endif
	}
#endif`;
var shadowmap_pars_vertex = `#if NUM_SPOT_LIGHT_COORDS > 0
	uniform mat4 spotLightMatrix[ NUM_SPOT_LIGHT_COORDS ];
	varying vec4 vSpotLightCoord[ NUM_SPOT_LIGHT_COORDS ];
#endif
#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
		uniform mat4 directionalShadowMatrix[ NUM_DIR_LIGHT_SHADOWS ];
		varying vec4 vDirectionalShadowCoord[ NUM_DIR_LIGHT_SHADOWS ];
		struct DirectionalLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform DirectionalLightShadow directionalLightShadows[ NUM_DIR_LIGHT_SHADOWS ];
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
		struct SpotLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
		};
		uniform SpotLightShadow spotLightShadows[ NUM_SPOT_LIGHT_SHADOWS ];
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		uniform mat4 pointShadowMatrix[ NUM_POINT_LIGHT_SHADOWS ];
		varying vec4 vPointShadowCoord[ NUM_POINT_LIGHT_SHADOWS ];
		struct PointLightShadow {
			float shadowBias;
			float shadowNormalBias;
			float shadowRadius;
			vec2 shadowMapSize;
			float shadowCameraNear;
			float shadowCameraFar;
		};
		uniform PointLightShadow pointLightShadows[ NUM_POINT_LIGHT_SHADOWS ];
	#endif
#endif`;
var shadowmap_vertex = `#if ( defined( USE_SHADOWMAP ) && ( NUM_DIR_LIGHT_SHADOWS > 0 || NUM_POINT_LIGHT_SHADOWS > 0 ) ) || ( NUM_SPOT_LIGHT_COORDS > 0 )
	vec3 shadowWorldNormal = inverseTransformDirection( transformedNormal, viewMatrix );
	vec4 shadowWorldPosition;
#endif
#if defined( USE_SHADOWMAP )
	#if NUM_DIR_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * directionalLightShadows[ i ].shadowNormalBias, 0 );
			vDirectionalShadowCoord[ i ] = directionalShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
		#pragma unroll_loop_start
		for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
			shadowWorldPosition = worldPosition + vec4( shadowWorldNormal * pointLightShadows[ i ].shadowNormalBias, 0 );
			vPointShadowCoord[ i ] = pointShadowMatrix[ i ] * shadowWorldPosition;
		}
		#pragma unroll_loop_end
	#endif
#endif
#if NUM_SPOT_LIGHT_COORDS > 0
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_COORDS; i ++ ) {
		shadowWorldPosition = worldPosition;
		#if ( defined( USE_SHADOWMAP ) && UNROLLED_LOOP_INDEX < NUM_SPOT_LIGHT_SHADOWS )
			shadowWorldPosition.xyz += shadowWorldNormal * spotLightShadows[ i ].shadowNormalBias;
		#endif
		vSpotLightCoord[ i ] = spotLightMatrix[ i ] * shadowWorldPosition;
	}
	#pragma unroll_loop_end
#endif`;
var shadowmask_pars_fragment = `float getShadowMask() {
	float shadow = 1.0;
	#ifdef USE_SHADOWMAP
	#if NUM_DIR_LIGHT_SHADOWS > 0
	DirectionalLightShadow directionalLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_DIR_LIGHT_SHADOWS; i ++ ) {
		directionalLight = directionalLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( directionalShadowMap[ i ], directionalLight.shadowMapSize, directionalLight.shadowBias, directionalLight.shadowRadius, vDirectionalShadowCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_SPOT_LIGHT_SHADOWS > 0
	SpotLightShadow spotLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_SPOT_LIGHT_SHADOWS; i ++ ) {
		spotLight = spotLightShadows[ i ];
		shadow *= receiveShadow ? getShadow( spotShadowMap[ i ], spotLight.shadowMapSize, spotLight.shadowBias, spotLight.shadowRadius, vSpotLightCoord[ i ] ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#if NUM_POINT_LIGHT_SHADOWS > 0
	PointLightShadow pointLight;
	#pragma unroll_loop_start
	for ( int i = 0; i < NUM_POINT_LIGHT_SHADOWS; i ++ ) {
		pointLight = pointLightShadows[ i ];
		shadow *= receiveShadow ? getPointShadow( pointShadowMap[ i ], pointLight.shadowMapSize, pointLight.shadowBias, pointLight.shadowRadius, vPointShadowCoord[ i ], pointLight.shadowCameraNear, pointLight.shadowCameraFar ) : 1.0;
	}
	#pragma unroll_loop_end
	#endif
	#endif
	return shadow;
}`;
var skinbase_vertex = `#ifdef USE_SKINNING
	mat4 boneMatX = getBoneMatrix( skinIndex.x );
	mat4 boneMatY = getBoneMatrix( skinIndex.y );
	mat4 boneMatZ = getBoneMatrix( skinIndex.z );
	mat4 boneMatW = getBoneMatrix( skinIndex.w );
#endif`;
var skinning_pars_vertex = `#ifdef USE_SKINNING
	uniform mat4 bindMatrix;
	uniform mat4 bindMatrixInverse;
	uniform highp sampler2D boneTexture;
	uniform int boneTextureSize;
	mat4 getBoneMatrix( const in float i ) {
		float j = i * 4.0;
		float x = mod( j, float( boneTextureSize ) );
		float y = floor( j / float( boneTextureSize ) );
		float dx = 1.0 / float( boneTextureSize );
		float dy = 1.0 / float( boneTextureSize );
		y = dy * ( y + 0.5 );
		vec4 v1 = texture2D( boneTexture, vec2( dx * ( x + 0.5 ), y ) );
		vec4 v2 = texture2D( boneTexture, vec2( dx * ( x + 1.5 ), y ) );
		vec4 v3 = texture2D( boneTexture, vec2( dx * ( x + 2.5 ), y ) );
		vec4 v4 = texture2D( boneTexture, vec2( dx * ( x + 3.5 ), y ) );
		mat4 bone = mat4( v1, v2, v3, v4 );
		return bone;
	}
#endif`;
var skinning_vertex = `#ifdef USE_SKINNING
	vec4 skinVertex = bindMatrix * vec4( transformed, 1.0 );
	vec4 skinned = vec4( 0.0 );
	skinned += boneMatX * skinVertex * skinWeight.x;
	skinned += boneMatY * skinVertex * skinWeight.y;
	skinned += boneMatZ * skinVertex * skinWeight.z;
	skinned += boneMatW * skinVertex * skinWeight.w;
	transformed = ( bindMatrixInverse * skinned ).xyz;
#endif`;
var skinnormal_vertex = `#ifdef USE_SKINNING
	mat4 skinMatrix = mat4( 0.0 );
	skinMatrix += skinWeight.x * boneMatX;
	skinMatrix += skinWeight.y * boneMatY;
	skinMatrix += skinWeight.z * boneMatZ;
	skinMatrix += skinWeight.w * boneMatW;
	skinMatrix = bindMatrixInverse * skinMatrix * bindMatrix;
	objectNormal = vec4( skinMatrix * vec4( objectNormal, 0.0 ) ).xyz;
	#ifdef USE_TANGENT
		objectTangent = vec4( skinMatrix * vec4( objectTangent, 0.0 ) ).xyz;
	#endif
#endif`;
var specularmap_fragment = `float specularStrength;
#ifdef USE_SPECULARMAP
	vec4 texelSpecular = texture2D( specularMap, vSpecularMapUv );
	specularStrength = texelSpecular.r;
#else
	specularStrength = 1.0;
#endif`;
var specularmap_pars_fragment = `#ifdef USE_SPECULARMAP
	uniform sampler2D specularMap;
#endif`;
var tonemapping_fragment = `#if defined( TONE_MAPPING )
	gl_FragColor.rgb = toneMapping( gl_FragColor.rgb );
#endif`;
var tonemapping_pars_fragment = `#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
uniform float toneMappingExposure;
vec3 LinearToneMapping( vec3 color ) {
	return saturate( toneMappingExposure * color );
}
vec3 ReinhardToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	return saturate( color / ( vec3( 1.0 ) + color ) );
}
vec3 OptimizedCineonToneMapping( vec3 color ) {
	color *= toneMappingExposure;
	color = max( vec3( 0.0 ), color - 0.004 );
	return pow( ( color * ( 6.2 * color + 0.5 ) ) / ( color * ( 6.2 * color + 1.7 ) + 0.06 ), vec3( 2.2 ) );
}
vec3 RRTAndODTFit( vec3 v ) {
	vec3 a = v * ( v + 0.0245786 ) - 0.000090537;
	vec3 b = v * ( 0.983729 * v + 0.4329510 ) + 0.238081;
	return a / b;
}
vec3 ACESFilmicToneMapping( vec3 color ) {
	const mat3 ACESInputMat = mat3(
		vec3( 0.59719, 0.07600, 0.02840 ),		vec3( 0.35458, 0.90834, 0.13383 ),
		vec3( 0.04823, 0.01566, 0.83777 )
	);
	const mat3 ACESOutputMat = mat3(
		vec3(  1.60475, -0.10208, -0.00327 ),		vec3( -0.53108,  1.10813, -0.07276 ),
		vec3( -0.07367, -0.00605,  1.07602 )
	);
	color *= toneMappingExposure / 0.6;
	color = ACESInputMat * color;
	color = RRTAndODTFit( color );
	color = ACESOutputMat * color;
	return saturate( color );
}
vec3 CustomToneMapping( vec3 color ) { return color; }`;
var transmission_fragment = `#ifdef USE_TRANSMISSION
	material.transmission = transmission;
	material.transmissionAlpha = 1.0;
	material.thickness = thickness;
	material.attenuationDistance = attenuationDistance;
	material.attenuationColor = attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		material.transmission *= texture2D( transmissionMap, vTransmissionMapUv ).r;
	#endif
	#ifdef USE_THICKNESSMAP
		material.thickness *= texture2D( thicknessMap, vThicknessMapUv ).g;
	#endif
	vec3 pos = vWorldPosition;
	vec3 v = normalize( cameraPosition - pos );
	vec3 n = inverseTransformDirection( normal, viewMatrix );
	vec4 transmitted = getIBLVolumeRefraction(
		n, v, material.roughness, material.diffuseColor, material.specularColor, material.specularF90,
		pos, modelMatrix, viewMatrix, projectionMatrix, material.ior, material.thickness,
		material.attenuationColor, material.attenuationDistance );
	material.transmissionAlpha = mix( material.transmissionAlpha, transmitted.a, material.transmission );
	totalDiffuse = mix( totalDiffuse, transmitted.rgb, material.transmission );
#endif`;
var transmission_pars_fragment = `#ifdef USE_TRANSMISSION
	uniform float transmission;
	uniform float thickness;
	uniform float attenuationDistance;
	uniform vec3 attenuationColor;
	#ifdef USE_TRANSMISSIONMAP
		uniform sampler2D transmissionMap;
	#endif
	#ifdef USE_THICKNESSMAP
		uniform sampler2D thicknessMap;
	#endif
	uniform vec2 transmissionSamplerSize;
	uniform sampler2D transmissionSamplerMap;
	uniform mat4 modelMatrix;
	uniform mat4 projectionMatrix;
	varying vec3 vWorldPosition;
	float w0( float a ) {
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - a + 3.0 ) - 3.0 ) + 1.0 );
	}
	float w1( float a ) {
		return ( 1.0 / 6.0 ) * ( a *  a * ( 3.0 * a - 6.0 ) + 4.0 );
	}
	float w2( float a ){
		return ( 1.0 / 6.0 ) * ( a * ( a * ( - 3.0 * a + 3.0 ) + 3.0 ) + 1.0 );
	}
	float w3( float a ) {
		return ( 1.0 / 6.0 ) * ( a * a * a );
	}
	float g0( float a ) {
		return w0( a ) + w1( a );
	}
	float g1( float a ) {
		return w2( a ) + w3( a );
	}
	float h0( float a ) {
		return - 1.0 + w1( a ) / ( w0( a ) + w1( a ) );
	}
	float h1( float a ) {
		return 1.0 + w3( a ) / ( w2( a ) + w3( a ) );
	}
	vec4 bicubic( sampler2D tex, vec2 uv, vec4 texelSize, float lod ) {
		uv = uv * texelSize.zw + 0.5;
		vec2 iuv = floor( uv );
		vec2 fuv = fract( uv );
		float g0x = g0( fuv.x );
		float g1x = g1( fuv.x );
		float h0x = h0( fuv.x );
		float h1x = h1( fuv.x );
		float h0y = h0( fuv.y );
		float h1y = h1( fuv.y );
		vec2 p0 = ( vec2( iuv.x + h0x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p1 = ( vec2( iuv.x + h1x, iuv.y + h0y ) - 0.5 ) * texelSize.xy;
		vec2 p2 = ( vec2( iuv.x + h0x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		vec2 p3 = ( vec2( iuv.x + h1x, iuv.y + h1y ) - 0.5 ) * texelSize.xy;
		return g0( fuv.y ) * ( g0x * textureLod( tex, p0, lod ) + g1x * textureLod( tex, p1, lod ) ) +
			g1( fuv.y ) * ( g0x * textureLod( tex, p2, lod ) + g1x * textureLod( tex, p3, lod ) );
	}
	vec4 textureBicubic( sampler2D sampler, vec2 uv, float lod ) {
		vec2 fLodSize = vec2( textureSize( sampler, int( lod ) ) );
		vec2 cLodSize = vec2( textureSize( sampler, int( lod + 1.0 ) ) );
		vec2 fLodSizeInv = 1.0 / fLodSize;
		vec2 cLodSizeInv = 1.0 / cLodSize;
		vec4 fSample = bicubic( sampler, uv, vec4( fLodSizeInv, fLodSize ), floor( lod ) );
		vec4 cSample = bicubic( sampler, uv, vec4( cLodSizeInv, cLodSize ), ceil( lod ) );
		return mix( fSample, cSample, fract( lod ) );
	}
	vec3 getVolumeTransmissionRay( const in vec3 n, const in vec3 v, const in float thickness, const in float ior, const in mat4 modelMatrix ) {
		vec3 refractionVector = refract( - v, normalize( n ), 1.0 / ior );
		vec3 modelScale;
		modelScale.x = length( vec3( modelMatrix[ 0 ].xyz ) );
		modelScale.y = length( vec3( modelMatrix[ 1 ].xyz ) );
		modelScale.z = length( vec3( modelMatrix[ 2 ].xyz ) );
		return normalize( refractionVector ) * thickness * modelScale;
	}
	float applyIorToRoughness( const in float roughness, const in float ior ) {
		return roughness * clamp( ior * 2.0 - 2.0, 0.0, 1.0 );
	}
	vec4 getTransmissionSample( const in vec2 fragCoord, const in float roughness, const in float ior ) {
		float lod = log2( transmissionSamplerSize.x ) * applyIorToRoughness( roughness, ior );
		return textureBicubic( transmissionSamplerMap, fragCoord.xy, lod );
	}
	vec3 volumeAttenuation( const in float transmissionDistance, const in vec3 attenuationColor, const in float attenuationDistance ) {
		if ( isinf( attenuationDistance ) ) {
			return vec3( 1.0 );
		} else {
			vec3 attenuationCoefficient = -log( attenuationColor ) / attenuationDistance;
			vec3 transmittance = exp( - attenuationCoefficient * transmissionDistance );			return transmittance;
		}
	}
	vec4 getIBLVolumeRefraction( const in vec3 n, const in vec3 v, const in float roughness, const in vec3 diffuseColor,
		const in vec3 specularColor, const in float specularF90, const in vec3 position, const in mat4 modelMatrix,
		const in mat4 viewMatrix, const in mat4 projMatrix, const in float ior, const in float thickness,
		const in vec3 attenuationColor, const in float attenuationDistance ) {
		vec3 transmissionRay = getVolumeTransmissionRay( n, v, thickness, ior, modelMatrix );
		vec3 refractedRayExit = position + transmissionRay;
		vec4 ndcPos = projMatrix * viewMatrix * vec4( refractedRayExit, 1.0 );
		vec2 refractionCoords = ndcPos.xy / ndcPos.w;
		refractionCoords += 1.0;
		refractionCoords /= 2.0;
		vec4 transmittedLight = getTransmissionSample( refractionCoords, roughness, ior );
		vec3 transmittance = diffuseColor * volumeAttenuation( length( transmissionRay ), attenuationColor, attenuationDistance );
		vec3 attenuatedColor = transmittance * transmittedLight.rgb;
		vec3 F = EnvironmentBRDF( n, v, specularColor, specularF90, roughness );
		float transmittanceFactor = ( transmittance.r + transmittance.g + transmittance.b ) / 3.0;
		return vec4( ( 1.0 - F ) * attenuatedColor, 1.0 - ( 1.0 - transmittedLight.a ) * transmittanceFactor );
	}
#endif`;
var uv_pars_fragment = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_SPECULARMAP
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`;
var uv_pars_vertex = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	varying vec2 vUv;
#endif
#ifdef USE_MAP
	uniform mat3 mapTransform;
	varying vec2 vMapUv;
#endif
#ifdef USE_ALPHAMAP
	uniform mat3 alphaMapTransform;
	varying vec2 vAlphaMapUv;
#endif
#ifdef USE_LIGHTMAP
	uniform mat3 lightMapTransform;
	varying vec2 vLightMapUv;
#endif
#ifdef USE_AOMAP
	uniform mat3 aoMapTransform;
	varying vec2 vAoMapUv;
#endif
#ifdef USE_BUMPMAP
	uniform mat3 bumpMapTransform;
	varying vec2 vBumpMapUv;
#endif
#ifdef USE_NORMALMAP
	uniform mat3 normalMapTransform;
	varying vec2 vNormalMapUv;
#endif
#ifdef USE_DISPLACEMENTMAP
	uniform mat3 displacementMapTransform;
	varying vec2 vDisplacementMapUv;
#endif
#ifdef USE_EMISSIVEMAP
	uniform mat3 emissiveMapTransform;
	varying vec2 vEmissiveMapUv;
#endif
#ifdef USE_METALNESSMAP
	uniform mat3 metalnessMapTransform;
	varying vec2 vMetalnessMapUv;
#endif
#ifdef USE_ROUGHNESSMAP
	uniform mat3 roughnessMapTransform;
	varying vec2 vRoughnessMapUv;
#endif
#ifdef USE_ANISOTROPYMAP
	uniform mat3 anisotropyMapTransform;
	varying vec2 vAnisotropyMapUv;
#endif
#ifdef USE_CLEARCOATMAP
	uniform mat3 clearcoatMapTransform;
	varying vec2 vClearcoatMapUv;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	uniform mat3 clearcoatNormalMapTransform;
	varying vec2 vClearcoatNormalMapUv;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	uniform mat3 clearcoatRoughnessMapTransform;
	varying vec2 vClearcoatRoughnessMapUv;
#endif
#ifdef USE_SHEEN_COLORMAP
	uniform mat3 sheenColorMapTransform;
	varying vec2 vSheenColorMapUv;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	uniform mat3 sheenRoughnessMapTransform;
	varying vec2 vSheenRoughnessMapUv;
#endif
#ifdef USE_IRIDESCENCEMAP
	uniform mat3 iridescenceMapTransform;
	varying vec2 vIridescenceMapUv;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	uniform mat3 iridescenceThicknessMapTransform;
	varying vec2 vIridescenceThicknessMapUv;
#endif
#ifdef USE_SPECULARMAP
	uniform mat3 specularMapTransform;
	varying vec2 vSpecularMapUv;
#endif
#ifdef USE_SPECULAR_COLORMAP
	uniform mat3 specularColorMapTransform;
	varying vec2 vSpecularColorMapUv;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	uniform mat3 specularIntensityMapTransform;
	varying vec2 vSpecularIntensityMapUv;
#endif
#ifdef USE_TRANSMISSIONMAP
	uniform mat3 transmissionMapTransform;
	varying vec2 vTransmissionMapUv;
#endif
#ifdef USE_THICKNESSMAP
	uniform mat3 thicknessMapTransform;
	varying vec2 vThicknessMapUv;
#endif`;
var uv_vertex = `#if defined( USE_UV ) || defined( USE_ANISOTROPY )
	vUv = vec3( uv, 1 ).xy;
#endif
#ifdef USE_MAP
	vMapUv = ( mapTransform * vec3( MAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ALPHAMAP
	vAlphaMapUv = ( alphaMapTransform * vec3( ALPHAMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_LIGHTMAP
	vLightMapUv = ( lightMapTransform * vec3( LIGHTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_AOMAP
	vAoMapUv = ( aoMapTransform * vec3( AOMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_BUMPMAP
	vBumpMapUv = ( bumpMapTransform * vec3( BUMPMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_NORMALMAP
	vNormalMapUv = ( normalMapTransform * vec3( NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_DISPLACEMENTMAP
	vDisplacementMapUv = ( displacementMapTransform * vec3( DISPLACEMENTMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_EMISSIVEMAP
	vEmissiveMapUv = ( emissiveMapTransform * vec3( EMISSIVEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_METALNESSMAP
	vMetalnessMapUv = ( metalnessMapTransform * vec3( METALNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ROUGHNESSMAP
	vRoughnessMapUv = ( roughnessMapTransform * vec3( ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_ANISOTROPYMAP
	vAnisotropyMapUv = ( anisotropyMapTransform * vec3( ANISOTROPYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOATMAP
	vClearcoatMapUv = ( clearcoatMapTransform * vec3( CLEARCOATMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_NORMALMAP
	vClearcoatNormalMapUv = ( clearcoatNormalMapTransform * vec3( CLEARCOAT_NORMALMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_CLEARCOAT_ROUGHNESSMAP
	vClearcoatRoughnessMapUv = ( clearcoatRoughnessMapTransform * vec3( CLEARCOAT_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCEMAP
	vIridescenceMapUv = ( iridescenceMapTransform * vec3( IRIDESCENCEMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_IRIDESCENCE_THICKNESSMAP
	vIridescenceThicknessMapUv = ( iridescenceThicknessMapTransform * vec3( IRIDESCENCE_THICKNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_COLORMAP
	vSheenColorMapUv = ( sheenColorMapTransform * vec3( SHEEN_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SHEEN_ROUGHNESSMAP
	vSheenRoughnessMapUv = ( sheenRoughnessMapTransform * vec3( SHEEN_ROUGHNESSMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULARMAP
	vSpecularMapUv = ( specularMapTransform * vec3( SPECULARMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_COLORMAP
	vSpecularColorMapUv = ( specularColorMapTransform * vec3( SPECULAR_COLORMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_SPECULAR_INTENSITYMAP
	vSpecularIntensityMapUv = ( specularIntensityMapTransform * vec3( SPECULAR_INTENSITYMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_TRANSMISSIONMAP
	vTransmissionMapUv = ( transmissionMapTransform * vec3( TRANSMISSIONMAP_UV, 1 ) ).xy;
#endif
#ifdef USE_THICKNESSMAP
	vThicknessMapUv = ( thicknessMapTransform * vec3( THICKNESSMAP_UV, 1 ) ).xy;
#endif`;
var worldpos_vertex = `#if defined( USE_ENVMAP ) || defined( DISTANCE ) || defined ( USE_SHADOWMAP ) || defined ( USE_TRANSMISSION ) || NUM_SPOT_LIGHT_COORDS > 0
	vec4 worldPosition = vec4( transformed, 1.0 );
	#ifdef USE_INSTANCING
		worldPosition = instanceMatrix * worldPosition;
	#endif
	worldPosition = modelMatrix * worldPosition;
#endif`;
const vertex$h = `varying vec2 vUv;
uniform mat3 uvTransform;
void main() {
	vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	gl_Position = vec4( position.xy, 1.0, 1.0 );
}`;
const fragment$h = `uniform sampler2D t2D;
uniform float backgroundIntensity;
varying vec2 vUv;
void main() {
	vec4 texColor = texture2D( t2D, vUv );
	#ifdef DECODE_VIDEO_TEXTURE
		texColor = vec4( mix( pow( texColor.rgb * 0.9478672986 + vec3( 0.0521327014 ), vec3( 2.4 ) ), texColor.rgb * 0.0773993808, vec3( lessThanEqual( texColor.rgb, vec3( 0.04045 ) ) ) ), texColor.w );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;
const vertex$g = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`;
const fragment$g = `#ifdef ENVMAP_TYPE_CUBE
	uniform samplerCube envMap;
#elif defined( ENVMAP_TYPE_CUBE_UV )
	uniform sampler2D envMap;
#endif
uniform float flipEnvMap;
uniform float backgroundBlurriness;
uniform float backgroundIntensity;
varying vec3 vWorldDirection;
#include <cube_uv_reflection_fragment>
void main() {
	#ifdef ENVMAP_TYPE_CUBE
		vec4 texColor = textureCube( envMap, vec3( flipEnvMap * vWorldDirection.x, vWorldDirection.yz ) );
	#elif defined( ENVMAP_TYPE_CUBE_UV )
		vec4 texColor = textureCubeUV( envMap, vWorldDirection, backgroundBlurriness );
	#else
		vec4 texColor = vec4( 0.0, 0.0, 0.0, 1.0 );
	#endif
	texColor.rgb *= backgroundIntensity;
	gl_FragColor = texColor;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;
const vertex$f = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
	gl_Position.z = gl_Position.w;
}`;
const fragment$f = `uniform samplerCube tCube;
uniform float tFlip;
uniform float opacity;
varying vec3 vWorldDirection;
void main() {
	vec4 texColor = textureCube( tCube, vec3( tFlip * vWorldDirection.x, vWorldDirection.yz ) );
	gl_FragColor = texColor;
	gl_FragColor.a *= opacity;
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;
const vertex$e = `#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
varying vec2 vHighPrecisionZW;
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vHighPrecisionZW = gl_Position.zw;
}`;
const fragment$e = `#if DEPTH_PACKING == 3200
	uniform float opacity;
#endif
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
varying vec2 vHighPrecisionZW;
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#if DEPTH_PACKING == 3200
		diffuseColor.a = opacity;
	#endif
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <logdepthbuf_fragment>
	float fragCoordZ = 0.5 * vHighPrecisionZW[0] / vHighPrecisionZW[1] + 0.5;
	#if DEPTH_PACKING == 3200
		gl_FragColor = vec4( vec3( 1.0 - fragCoordZ ), opacity );
	#elif DEPTH_PACKING == 3201
		gl_FragColor = packDepthToRGBA( fragCoordZ );
	#endif
}`;
const vertex$d = `#define DISTANCE
varying vec3 vWorldPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <skinbase_vertex>
	#ifdef USE_DISPLACEMENTMAP
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <worldpos_vertex>
	#include <clipping_planes_vertex>
	vWorldPosition = worldPosition.xyz;
}`;
const fragment$d = `#define DISTANCE
uniform vec3 referencePosition;
uniform float nearDistance;
uniform float farDistance;
varying vec3 vWorldPosition;
#include <common>
#include <packing>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <clipping_planes_pars_fragment>
void main () {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( 1.0 );
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	float dist = length( vWorldPosition - referencePosition );
	dist = ( dist - nearDistance ) / ( farDistance - nearDistance );
	dist = saturate( dist );
	gl_FragColor = packDepthToRGBA( dist );
}`;
const vertex$c = `varying vec3 vWorldDirection;
#include <common>
void main() {
	vWorldDirection = transformDirection( position, modelMatrix );
	#include <begin_vertex>
	#include <project_vertex>
}`;
const fragment$c = `uniform sampler2D tEquirect;
varying vec3 vWorldDirection;
#include <common>
void main() {
	vec3 direction = normalize( vWorldDirection );
	vec2 sampleUV = equirectUv( direction );
	gl_FragColor = texture2D( tEquirect, sampleUV );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
}`;
const vertex$b = `uniform float scale;
attribute float lineDistance;
varying float vLineDistance;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	vLineDistance = scale * lineDistance;
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`;
const fragment$b = `uniform vec3 diffuse;
uniform float opacity;
uniform float dashSize;
uniform float totalSize;
varying float vLineDistance;
#include <common>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	if ( mod( vLineDistance, totalSize ) > dashSize ) {
		discard;
	}
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`;
const vertex$a = `#include <common>
#include <uv_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#if defined ( USE_ENVMAP ) || defined ( USE_SKINNING )
		#include <beginnormal_vertex>
		#include <morphnormal_vertex>
		#include <skinbase_vertex>
		#include <skinnormal_vertex>
		#include <defaultnormal_vertex>
	#endif
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <fog_vertex>
}`;
const fragment$a = `uniform vec3 diffuse;
uniform float opacity;
#ifndef FLAT_SHADED
	varying vec3 vNormal;
#endif
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	#ifdef USE_LIGHTMAP
		vec4 lightMapTexel = texture2D( lightMap, vLightMapUv );
		reflectedLight.indirectDiffuse += lightMapTexel.rgb * lightMapIntensity * RECIPROCAL_PI;
	#else
		reflectedLight.indirectDiffuse += vec3( 1.0 );
	#endif
	#include <aomap_fragment>
	reflectedLight.indirectDiffuse *= diffuseColor.rgb;
	vec3 outgoingLight = reflectedLight.indirectDiffuse;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`;
const vertex$9 = `#define LAMBERT
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`;
const fragment$9 = `#define LAMBERT
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_lambert_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_lambert_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`;
const vertex$8 = `#define MATCAP
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <color_pars_vertex>
#include <displacementmap_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
	vViewPosition = - mvPosition.xyz;
}`;
const fragment$8 = `#define MATCAP
uniform vec3 diffuse;
uniform float opacity;
uniform sampler2D matcap;
varying vec3 vViewPosition;
#include <common>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	vec3 viewDir = normalize( vViewPosition );
	vec3 x = normalize( vec3( viewDir.z, 0.0, - viewDir.x ) );
	vec3 y = cross( viewDir, x );
	vec2 uv = vec2( dot( x, normal ), dot( y, normal ) ) * 0.495 + 0.5;
	#ifdef USE_MATCAP
		vec4 matcapColor = texture2D( matcap, uv );
	#else
		vec4 matcapColor = vec4( vec3( mix( 0.2, 0.8, uv.y ) ), 1.0 );
	#endif
	vec3 outgoingLight = diffuseColor.rgb * matcapColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`;
const vertex$7 = `#define NORMAL
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	vViewPosition = - mvPosition.xyz;
#endif
}`;
const fragment$7 = `#define NORMAL
uniform float opacity;
#if defined( FLAT_SHADED ) || defined( USE_BUMPMAP ) || defined( USE_NORMALMAP_TANGENTSPACE )
	varying vec3 vViewPosition;
#endif
#include <packing>
#include <uv_pars_fragment>
#include <normal_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	#include <logdepthbuf_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	gl_FragColor = vec4( packNormalToRGB( normal ), opacity );
	#ifdef OPAQUE
		gl_FragColor.a = 1.0;
	#endif
}`;
const vertex$6 = `#define PHONG
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <envmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <envmap_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`;
const fragment$6 = `#define PHONG
uniform vec3 diffuse;
uniform vec3 emissive;
uniform vec3 specular;
uniform float shininess;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_phong_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <specularmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <specularmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_phong_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + reflectedLight.directSpecular + reflectedLight.indirectSpecular + totalEmissiveRadiance;
	#include <envmap_fragment>
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`;
const vertex$5 = `#define STANDARD
varying vec3 vViewPosition;
#ifdef USE_TRANSMISSION
	varying vec3 vWorldPosition;
#endif
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
#ifdef USE_TRANSMISSION
	vWorldPosition = worldPosition.xyz;
#endif
}`;
const fragment$5 = `#define STANDARD
#ifdef PHYSICAL
	#define IOR
	#define USE_SPECULAR
#endif
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float roughness;
uniform float metalness;
uniform float opacity;
#ifdef IOR
	uniform float ior;
#endif
#ifdef USE_SPECULAR
	uniform float specularIntensity;
	uniform vec3 specularColor;
	#ifdef USE_SPECULAR_COLORMAP
		uniform sampler2D specularColorMap;
	#endif
	#ifdef USE_SPECULAR_INTENSITYMAP
		uniform sampler2D specularIntensityMap;
	#endif
#endif
#ifdef USE_CLEARCOAT
	uniform float clearcoat;
	uniform float clearcoatRoughness;
#endif
#ifdef USE_IRIDESCENCE
	uniform float iridescence;
	uniform float iridescenceIOR;
	uniform float iridescenceThicknessMinimum;
	uniform float iridescenceThicknessMaximum;
#endif
#ifdef USE_SHEEN
	uniform vec3 sheenColor;
	uniform float sheenRoughness;
	#ifdef USE_SHEEN_COLORMAP
		uniform sampler2D sheenColorMap;
	#endif
	#ifdef USE_SHEEN_ROUGHNESSMAP
		uniform sampler2D sheenRoughnessMap;
	#endif
#endif
#ifdef USE_ANISOTROPY
	uniform vec2 anisotropyVector;
	#ifdef USE_ANISOTROPYMAP
		uniform sampler2D anisotropyMap;
	#endif
#endif
varying vec3 vViewPosition;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <iridescence_fragment>
#include <cube_uv_reflection_fragment>
#include <envmap_common_pars_fragment>
#include <envmap_physical_pars_fragment>
#include <fog_pars_fragment>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_physical_pars_fragment>
#include <transmission_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <clearcoat_pars_fragment>
#include <iridescence_pars_fragment>
#include <roughnessmap_pars_fragment>
#include <metalnessmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <roughnessmap_fragment>
	#include <metalnessmap_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <clearcoat_normal_fragment_begin>
	#include <clearcoat_normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_physical_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 totalDiffuse = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse;
	vec3 totalSpecular = reflectedLight.directSpecular + reflectedLight.indirectSpecular;
	#include <transmission_fragment>
	vec3 outgoingLight = totalDiffuse + totalSpecular + totalEmissiveRadiance;
	#ifdef USE_SHEEN
		float sheenEnergyComp = 1.0 - 0.157 * max3( material.sheenColor );
		outgoingLight = outgoingLight * sheenEnergyComp + sheenSpecularDirect + sheenSpecularIndirect;
	#endif
	#ifdef USE_CLEARCOAT
		float dotNVcc = saturate( dot( geometryClearcoatNormal, geometryViewDir ) );
		vec3 Fcc = F_Schlick( material.clearcoatF0, material.clearcoatF90, dotNVcc );
		outgoingLight = outgoingLight * ( 1.0 - material.clearcoat * Fcc ) + ( clearcoatSpecularDirect + clearcoatSpecularIndirect ) * material.clearcoat;
	#endif
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`;
const vertex$4 = `#define TOON
varying vec3 vViewPosition;
#include <common>
#include <uv_pars_vertex>
#include <displacementmap_pars_vertex>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <normal_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <shadowmap_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <normal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <displacementmap_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	vViewPosition = - mvPosition.xyz;
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`;
const fragment$4 = `#define TOON
uniform vec3 diffuse;
uniform vec3 emissive;
uniform float opacity;
#include <common>
#include <packing>
#include <dithering_pars_fragment>
#include <color_pars_fragment>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <aomap_pars_fragment>
#include <lightmap_pars_fragment>
#include <emissivemap_pars_fragment>
#include <gradientmap_pars_fragment>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <normal_pars_fragment>
#include <lights_toon_pars_fragment>
#include <shadowmap_pars_fragment>
#include <bumpmap_pars_fragment>
#include <normalmap_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec4 diffuseColor = vec4( diffuse, opacity );
	ReflectedLight reflectedLight = ReflectedLight( vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ), vec3( 0.0 ) );
	vec3 totalEmissiveRadiance = emissive;
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <color_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	#include <normal_fragment_begin>
	#include <normal_fragment_maps>
	#include <emissivemap_fragment>
	#include <lights_toon_fragment>
	#include <lights_fragment_begin>
	#include <lights_fragment_maps>
	#include <lights_fragment_end>
	#include <aomap_fragment>
	vec3 outgoingLight = reflectedLight.directDiffuse + reflectedLight.indirectDiffuse + totalEmissiveRadiance;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
	#include <dithering_fragment>
}`;
const vertex$3 = `uniform float size;
uniform float scale;
#include <common>
#include <color_pars_vertex>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
#ifdef USE_POINTS_UV
	varying vec2 vUv;
	uniform mat3 uvTransform;
#endif
void main() {
	#ifdef USE_POINTS_UV
		vUv = ( uvTransform * vec3( uv, 1 ) ).xy;
	#endif
	#include <color_vertex>
	#include <morphcolor_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <project_vertex>
	gl_PointSize = size;
	#ifdef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) gl_PointSize *= ( scale / - mvPosition.z );
	#endif
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <worldpos_vertex>
	#include <fog_vertex>
}`;
const fragment$3 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <color_pars_fragment>
#include <map_particle_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_particle_fragment>
	#include <color_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
	#include <premultiplied_alpha_fragment>
}`;
const vertex$2 = `#include <common>
#include <fog_pars_vertex>
#include <morphtarget_pars_vertex>
#include <skinning_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <shadowmap_pars_vertex>
void main() {
	#include <beginnormal_vertex>
	#include <morphnormal_vertex>
	#include <skinbase_vertex>
	#include <skinnormal_vertex>
	#include <defaultnormal_vertex>
	#include <begin_vertex>
	#include <morphtarget_vertex>
	#include <skinning_vertex>
	#include <project_vertex>
	#include <logdepthbuf_vertex>
	#include <worldpos_vertex>
	#include <shadowmap_vertex>
	#include <fog_vertex>
}`;
const fragment$2 = `uniform vec3 color;
uniform float opacity;
#include <common>
#include <packing>
#include <fog_pars_fragment>
#include <bsdfs>
#include <lights_pars_begin>
#include <logdepthbuf_pars_fragment>
#include <shadowmap_pars_fragment>
#include <shadowmask_pars_fragment>
void main() {
	#include <logdepthbuf_fragment>
	gl_FragColor = vec4( color, opacity * ( 1.0 - getShadowMask() ) );
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`;
const vertex$1 = `uniform float rotation;
uniform vec2 center;
#include <common>
#include <uv_pars_vertex>
#include <fog_pars_vertex>
#include <logdepthbuf_pars_vertex>
#include <clipping_planes_pars_vertex>
void main() {
	#include <uv_vertex>
	vec4 mvPosition = modelViewMatrix * vec4( 0.0, 0.0, 0.0, 1.0 );
	vec2 scale;
	scale.x = length( vec3( modelMatrix[ 0 ].x, modelMatrix[ 0 ].y, modelMatrix[ 0 ].z ) );
	scale.y = length( vec3( modelMatrix[ 1 ].x, modelMatrix[ 1 ].y, modelMatrix[ 1 ].z ) );
	#ifndef USE_SIZEATTENUATION
		bool isPerspective = isPerspectiveMatrix( projectionMatrix );
		if ( isPerspective ) scale *= - mvPosition.z;
	#endif
	vec2 alignedPosition = ( position.xy - ( center - vec2( 0.5 ) ) ) * scale;
	vec2 rotatedPosition;
	rotatedPosition.x = cos( rotation ) * alignedPosition.x - sin( rotation ) * alignedPosition.y;
	rotatedPosition.y = sin( rotation ) * alignedPosition.x + cos( rotation ) * alignedPosition.y;
	mvPosition.xy += rotatedPosition;
	gl_Position = projectionMatrix * mvPosition;
	#include <logdepthbuf_vertex>
	#include <clipping_planes_vertex>
	#include <fog_vertex>
}`;
const fragment$1 = `uniform vec3 diffuse;
uniform float opacity;
#include <common>
#include <uv_pars_fragment>
#include <map_pars_fragment>
#include <alphamap_pars_fragment>
#include <alphatest_pars_fragment>
#include <alphahash_pars_fragment>
#include <fog_pars_fragment>
#include <logdepthbuf_pars_fragment>
#include <clipping_planes_pars_fragment>
void main() {
	#include <clipping_planes_fragment>
	vec3 outgoingLight = vec3( 0.0 );
	vec4 diffuseColor = vec4( diffuse, opacity );
	#include <logdepthbuf_fragment>
	#include <map_fragment>
	#include <alphamap_fragment>
	#include <alphatest_fragment>
	#include <alphahash_fragment>
	outgoingLight = diffuseColor.rgb;
	#include <opaque_fragment>
	#include <tonemapping_fragment>
	#include <colorspace_fragment>
	#include <fog_fragment>
}`;
const ShaderChunk = {
  alphahash_fragment,
  alphahash_pars_fragment,
  alphamap_fragment,
  alphamap_pars_fragment,
  alphatest_fragment,
  alphatest_pars_fragment,
  aomap_fragment,
  aomap_pars_fragment,
  begin_vertex,
  beginnormal_vertex,
  bsdfs,
  iridescence_fragment,
  bumpmap_pars_fragment,
  clipping_planes_fragment,
  clipping_planes_pars_fragment,
  clipping_planes_pars_vertex,
  clipping_planes_vertex,
  color_fragment,
  color_pars_fragment,
  color_pars_vertex,
  color_vertex,
  common,
  cube_uv_reflection_fragment,
  defaultnormal_vertex,
  displacementmap_pars_vertex,
  displacementmap_vertex,
  emissivemap_fragment,
  emissivemap_pars_fragment,
  colorspace_fragment,
  colorspace_pars_fragment,
  envmap_fragment,
  envmap_common_pars_fragment,
  envmap_pars_fragment,
  envmap_pars_vertex,
  envmap_physical_pars_fragment,
  envmap_vertex,
  fog_vertex,
  fog_pars_vertex,
  fog_fragment,
  fog_pars_fragment,
  gradientmap_pars_fragment,
  lightmap_fragment,
  lightmap_pars_fragment,
  lights_lambert_fragment,
  lights_lambert_pars_fragment,
  lights_pars_begin,
  lights_toon_fragment,
  lights_toon_pars_fragment,
  lights_phong_fragment,
  lights_phong_pars_fragment,
  lights_physical_fragment,
  lights_physical_pars_fragment,
  lights_fragment_begin,
  lights_fragment_maps,
  lights_fragment_end,
  logdepthbuf_fragment,
  logdepthbuf_pars_fragment,
  logdepthbuf_pars_vertex,
  logdepthbuf_vertex,
  map_fragment,
  map_pars_fragment,
  map_particle_fragment,
  map_particle_pars_fragment,
  metalnessmap_fragment,
  metalnessmap_pars_fragment,
  morphcolor_vertex,
  morphnormal_vertex,
  morphtarget_pars_vertex,
  morphtarget_vertex,
  normal_fragment_begin,
  normal_fragment_maps,
  normal_pars_fragment,
  normal_pars_vertex,
  normal_vertex,
  normalmap_pars_fragment,
  clearcoat_normal_fragment_begin,
  clearcoat_normal_fragment_maps,
  clearcoat_pars_fragment,
  iridescence_pars_fragment,
  opaque_fragment,
  packing,
  premultiplied_alpha_fragment,
  project_vertex,
  dithering_fragment,
  dithering_pars_fragment,
  roughnessmap_fragment,
  roughnessmap_pars_fragment,
  shadowmap_pars_fragment,
  shadowmap_pars_vertex,
  shadowmap_vertex,
  shadowmask_pars_fragment,
  skinbase_vertex,
  skinning_pars_vertex,
  skinning_vertex,
  skinnormal_vertex,
  specularmap_fragment,
  specularmap_pars_fragment,
  tonemapping_fragment,
  tonemapping_pars_fragment,
  transmission_fragment,
  transmission_pars_fragment,
  uv_pars_fragment,
  uv_pars_vertex,
  uv_vertex,
  worldpos_vertex,
  background_vert: vertex$h,
  background_frag: fragment$h,
  backgroundCube_vert: vertex$g,
  backgroundCube_frag: fragment$g,
  cube_vert: vertex$f,
  cube_frag: fragment$f,
  depth_vert: vertex$e,
  depth_frag: fragment$e,
  distanceRGBA_vert: vertex$d,
  distanceRGBA_frag: fragment$d,
  equirect_vert: vertex$c,
  equirect_frag: fragment$c,
  linedashed_vert: vertex$b,
  linedashed_frag: fragment$b,
  meshbasic_vert: vertex$a,
  meshbasic_frag: fragment$a,
  meshlambert_vert: vertex$9,
  meshlambert_frag: fragment$9,
  meshmatcap_vert: vertex$8,
  meshmatcap_frag: fragment$8,
  meshnormal_vert: vertex$7,
  meshnormal_frag: fragment$7,
  meshphong_vert: vertex$6,
  meshphong_frag: fragment$6,
  meshphysical_vert: vertex$5,
  meshphysical_frag: fragment$5,
  meshtoon_vert: vertex$4,
  meshtoon_frag: fragment$4,
  points_vert: vertex$3,
  points_frag: fragment$3,
  shadow_vert: vertex$2,
  shadow_frag: fragment$2,
  sprite_vert: vertex$1,
  sprite_frag: fragment$1
};
const UniformsLib = {
  common: {
    diffuse: {
      value: new Color(16777215)
    },
    opacity: {
      value: 1
    },
    map: {
      value: null
    },
    mapTransform: {
      value: new Matrix3()
    },
    alphaMap: {
      value: null
    },
    alphaMapTransform: {
      value: new Matrix3()
    },
    alphaTest: {
      value: 0
    }
  },
  specularmap: {
    specularMap: {
      value: null
    },
    specularMapTransform: {
      value: new Matrix3()
    }
  },
  envmap: {
    envMap: {
      value: null
    },
    flipEnvMap: {
      value: -1
    },
    reflectivity: {
      value: 1
    },
    ior: {
      value: 1.5
    },
    refractionRatio: {
      value: 0.98
    }
  },
  aomap: {
    aoMap: {
      value: null
    },
    aoMapIntensity: {
      value: 1
    },
    aoMapTransform: {
      value: new Matrix3()
    }
  },
  lightmap: {
    lightMap: {
      value: null
    },
    lightMapIntensity: {
      value: 1
    },
    lightMapTransform: {
      value: new Matrix3()
    }
  },
  bumpmap: {
    bumpMap: {
      value: null
    },
    bumpMapTransform: {
      value: new Matrix3()
    },
    bumpScale: {
      value: 1
    }
  },
  normalmap: {
    normalMap: {
      value: null
    },
    normalMapTransform: {
      value: new Matrix3()
    },
    normalScale: {
      value: new Vector2(1, 1)
    }
  },
  displacementmap: {
    displacementMap: {
      value: null
    },
    displacementMapTransform: {
      value: new Matrix3()
    },
    displacementScale: {
      value: 1
    },
    displacementBias: {
      value: 0
    }
  },
  emissivemap: {
    emissiveMap: {
      value: null
    },
    emissiveMapTransform: {
      value: new Matrix3()
    }
  },
  metalnessmap: {
    metalnessMap: {
      value: null
    },
    metalnessMapTransform: {
      value: new Matrix3()
    }
  },
  roughnessmap: {
    roughnessMap: {
      value: null
    },
    roughnessMapTransform: {
      value: new Matrix3()
    }
  },
  gradientmap: {
    gradientMap: {
      value: null
    }
  },
  fog: {
    fogDensity: {
      value: 0.00025
    },
    fogNear: {
      value: 1
    },
    fogFar: {
      value: 2000
    },
    fogColor: {
      value: new Color(16777215)
    }
  },
  lights: {
    ambientLightColor: {
      value: []
    },
    lightProbe: {
      value: []
    },
    directionalLights: {
      value: [],
      properties: {
        direction: {},
        color: {}
      }
    },
    directionalLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    directionalShadowMap: {
      value: []
    },
    directionalShadowMatrix: {
      value: []
    },
    spotLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        direction: {},
        distance: {},
        coneCos: {},
        penumbraCos: {},
        decay: {}
      }
    },
    spotLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {}
      }
    },
    spotLightMap: {
      value: []
    },
    spotShadowMap: {
      value: []
    },
    spotLightMatrix: {
      value: []
    },
    pointLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        decay: {},
        distance: {}
      }
    },
    pointLightShadows: {
      value: [],
      properties: {
        shadowBias: {},
        shadowNormalBias: {},
        shadowRadius: {},
        shadowMapSize: {},
        shadowCameraNear: {},
        shadowCameraFar: {}
      }
    },
    pointShadowMap: {
      value: []
    },
    pointShadowMatrix: {
      value: []
    },
    hemisphereLights: {
      value: [],
      properties: {
        direction: {},
        skyColor: {},
        groundColor: {}
      }
    },
    rectAreaLights: {
      value: [],
      properties: {
        color: {},
        position: {},
        width: {},
        height: {}
      }
    },
    ltc_1: {
      value: null
    },
    ltc_2: {
      value: null
    }
  },
  points: {
    diffuse: {
      value: new Color(16777215)
    },
    opacity: {
      value: 1
    },
    size: {
      value: 1
    },
    scale: {
      value: 1
    },
    map: {
      value: null
    },
    alphaMap: {
      value: null
    },
    alphaMapTransform: {
      value: new Matrix3()
    },
    alphaTest: {
      value: 0
    },
    uvTransform: {
      value: new Matrix3()
    }
  },
  sprite: {
    diffuse: {
      value: new Color(16777215)
    },
    opacity: {
      value: 1
    },
    center: {
      value: new Vector2(0.5, 0.5)
    },
    rotation: {
      value: 0
    },
    map: {
      value: null
    },
    mapTransform: {
      value: new Matrix3()
    },
    alphaMap: {
      value: null
    },
    alphaMapTransform: {
      value: new Matrix3()
    },
    alphaTest: {
      value: 0
    }
  }
};
const ShaderLib = {
  basic: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.fog]),
    vertexShader: ShaderChunk.meshbasic_vert,
    fragmentShader: ShaderChunk.meshbasic_frag
  },
  lambert: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0)
      }
    }]),
    vertexShader: ShaderChunk.meshlambert_vert,
    fragmentShader: ShaderChunk.meshlambert_frag
  },
  phong: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.specularmap, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0)
      },
      specular: {
        value: new Color(1118481)
      },
      shininess: {
        value: 30
      }
    }]),
    vertexShader: ShaderChunk.meshphong_vert,
    fragmentShader: ShaderChunk.meshphong_frag
  },
  standard: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.envmap, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.roughnessmap, UniformsLib.metalnessmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0)
      },
      roughness: {
        value: 1
      },
      metalness: {
        value: 0
      },
      envMapIntensity: {
        value: 1
      }
    }]),
    vertexShader: ShaderChunk.meshphysical_vert,
    fragmentShader: ShaderChunk.meshphysical_frag
  },
  toon: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.aomap, UniformsLib.lightmap, UniformsLib.emissivemap, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.gradientmap, UniformsLib.fog, UniformsLib.lights, {
      emissive: {
        value: new Color(0)
      }
    }]),
    vertexShader: ShaderChunk.meshtoon_vert,
    fragmentShader: ShaderChunk.meshtoon_frag
  },
  matcap: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, UniformsLib.fog, {
      matcap: {
        value: null
      }
    }]),
    vertexShader: ShaderChunk.meshmatcap_vert,
    fragmentShader: ShaderChunk.meshmatcap_frag
  },
  points: {
    uniforms: mergeUniforms([UniformsLib.points, UniformsLib.fog]),
    vertexShader: ShaderChunk.points_vert,
    fragmentShader: ShaderChunk.points_frag
  },
  dashed: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.fog, {
      scale: {
        value: 1
      },
      dashSize: {
        value: 1
      },
      totalSize: {
        value: 2
      }
    }]),
    vertexShader: ShaderChunk.linedashed_vert,
    fragmentShader: ShaderChunk.linedashed_frag
  },
  depth: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap]),
    vertexShader: ShaderChunk.depth_vert,
    fragmentShader: ShaderChunk.depth_frag
  },
  normal: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.bumpmap, UniformsLib.normalmap, UniformsLib.displacementmap, {
      opacity: {
        value: 1
      }
    }]),
    vertexShader: ShaderChunk.meshnormal_vert,
    fragmentShader: ShaderChunk.meshnormal_frag
  },
  sprite: {
    uniforms: mergeUniforms([UniformsLib.sprite, UniformsLib.fog]),
    vertexShader: ShaderChunk.sprite_vert,
    fragmentShader: ShaderChunk.sprite_frag
  },
  background: {
    uniforms: {
      uvTransform: {
        value: new Matrix3()
      },
      t2D: {
        value: null
      },
      backgroundIntensity: {
        value: 1
      }
    },
    vertexShader: ShaderChunk.background_vert,
    fragmentShader: ShaderChunk.background_frag
  },
  backgroundCube: {
    uniforms: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      },
      backgroundBlurriness: {
        value: 0
      },
      backgroundIntensity: {
        value: 1
      }
    },
    vertexShader: ShaderChunk.backgroundCube_vert,
    fragmentShader: ShaderChunk.backgroundCube_frag
  },
  cube: {
    uniforms: {
      tCube: {
        value: null
      },
      tFlip: {
        value: -1
      },
      opacity: {
        value: 1
      }
    },
    vertexShader: ShaderChunk.cube_vert,
    fragmentShader: ShaderChunk.cube_frag
  },
  equirect: {
    uniforms: {
      tEquirect: {
        value: null
      }
    },
    vertexShader: ShaderChunk.equirect_vert,
    fragmentShader: ShaderChunk.equirect_frag
  },
  distanceRGBA: {
    uniforms: mergeUniforms([UniformsLib.common, UniformsLib.displacementmap, {
      referencePosition: {
        value: new Vector3()
      },
      nearDistance: {
        value: 1
      },
      farDistance: {
        value: 1000
      }
    }]),
    vertexShader: ShaderChunk.distanceRGBA_vert,
    fragmentShader: ShaderChunk.distanceRGBA_frag
  },
  shadow: {
    uniforms: mergeUniforms([UniformsLib.lights, UniformsLib.fog, {
      color: {
        value: new Color(0)
      },
      opacity: {
        value: 1
      }
    }]),
    vertexShader: ShaderChunk.shadow_vert,
    fragmentShader: ShaderChunk.shadow_frag
  }
};
ShaderLib.physical = {
  uniforms: mergeUniforms([ShaderLib.standard.uniforms, {
    clearcoat: {
      value: 0
    },
    clearcoatMap: {
      value: null
    },
    clearcoatMapTransform: {
      value: new Matrix3()
    },
    clearcoatNormalMap: {
      value: null
    },
    clearcoatNormalMapTransform: {
      value: new Matrix3()
    },
    clearcoatNormalScale: {
      value: new Vector2(1, 1)
    },
    clearcoatRoughness: {
      value: 0
    },
    clearcoatRoughnessMap: {
      value: null
    },
    clearcoatRoughnessMapTransform: {
      value: new Matrix3()
    },
    iridescence: {
      value: 0
    },
    iridescenceMap: {
      value: null
    },
    iridescenceMapTransform: {
      value: new Matrix3()
    },
    iridescenceIOR: {
      value: 1.3
    },
    iridescenceThicknessMinimum: {
      value: 100
    },
    iridescenceThicknessMaximum: {
      value: 400
    },
    iridescenceThicknessMap: {
      value: null
    },
    iridescenceThicknessMapTransform: {
      value: new Matrix3()
    },
    sheen: {
      value: 0
    },
    sheenColor: {
      value: new Color(0)
    },
    sheenColorMap: {
      value: null
    },
    sheenColorMapTransform: {
      value: new Matrix3()
    },
    sheenRoughness: {
      value: 1
    },
    sheenRoughnessMap: {
      value: null
    },
    sheenRoughnessMapTransform: {
      value: new Matrix3()
    },
    transmission: {
      value: 0
    },
    transmissionMap: {
      value: null
    },
    transmissionMapTransform: {
      value: new Matrix3()
    },
    transmissionSamplerSize: {
      value: new Vector2()
    },
    transmissionSamplerMap: {
      value: null
    },
    thickness: {
      value: 0
    },
    thicknessMap: {
      value: null
    },
    thicknessMapTransform: {
      value: new Matrix3()
    },
    attenuationDistance: {
      value: 0
    },
    attenuationColor: {
      value: new Color(0)
    },
    specularColor: {
      value: new Color(1, 1, 1)
    },
    specularColorMap: {
      value: null
    },
    specularColorMapTransform: {
      value: new Matrix3()
    },
    specularIntensity: {
      value: 1
    },
    specularIntensityMap: {
      value: null
    },
    specularIntensityMapTransform: {
      value: new Matrix3()
    },
    anisotropyVector: {
      value: new Vector2()
    },
    anisotropyMap: {
      value: null
    },
    anisotropyMapTransform: {
      value: new Matrix3()
    }
  }]),
  vertexShader: ShaderChunk.meshphysical_vert,
  fragmentShader: ShaderChunk.meshphysical_frag
};
const _rgb = {
  r: 0,
  b: 0,
  g: 0
};
function WebGLBackground(o, e, t, r, n, a, l) {
  const c = new Color(0);
  let u = a === true ? 0 : 1;
  let f;
  let p;
  let g = null;
  let v = 0;
  let _ = null;
  function T(S, b) {
    let C = false;
    let w = b.isScene === true ? b.background : null;
    if (w && w.isTexture) {
      w = (b.backgroundBlurriness > 0 ? t : e).get(w);
    }
    if (w === null) {
      M(c, u);
    } else if (w && w.isColor) {
      M(w, 1);
      C = true;
    }
    const R = o.xr.getEnvironmentBlendMode();
    if (R === "additive") {
      r.buffers.color.setClear(0, 0, 0, 1, l);
    } else if (R === "alpha-blend") {
      r.buffers.color.setClear(0, 0, 0, 0, l);
    }
    if (o.autoClear || C) {
      o.clear(o.autoClearColor, o.autoClearDepth, o.autoClearStencil);
    }
    if (w && (w.isCubeTexture || w.mapping === CubeUVReflectionMapping)) {
      if (p === undefined) {
        p = new Mesh(new BoxGeometry(1, 1, 1), new ShaderMaterial({
          name: "BackgroundCubeMaterial",
          uniforms: cloneUniforms(ShaderLib.backgroundCube.uniforms),
          vertexShader: ShaderLib.backgroundCube.vertexShader,
          fragmentShader: ShaderLib.backgroundCube.fragmentShader,
          side: BackSide,
          depthTest: false,
          depthWrite: false,
          fog: false
        }));
        p.geometry.deleteAttribute("normal");
        p.geometry.deleteAttribute("uv");
        p.onBeforeRender = function (E, I, F) {
          this.matrixWorld.copyPosition(F.matrixWorld);
        };
        Object.defineProperty(p.material, "envMap", {
          get: function () {
            return this.uniforms.envMap.value;
          }
        });
        n.update(p);
      }
      p.material.uniforms.envMap.value = w;
      p.material.uniforms.flipEnvMap.value = w.isCubeTexture && w.isRenderTargetTexture === false ? -1 : 1;
      p.material.uniforms.backgroundBlurriness.value = b.backgroundBlurriness;
      p.material.uniforms.backgroundIntensity.value = b.backgroundIntensity;
      p.material.toneMapped = ColorManagement.getTransfer(w.colorSpace) !== SRGBTransfer;
      if (g !== w || v !== w.version || _ !== o.toneMapping) {
        p.material.needsUpdate = true;
        g = w;
        v = w.version;
        _ = o.toneMapping;
      }
      p.layers.enableAll();
      S.unshift(p, p.geometry, p.material, 0, 0, null);
    } else if (w && w.isTexture) {
      if (f === undefined) {
        f = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({
          name: "BackgroundMaterial",
          uniforms: cloneUniforms(ShaderLib.background.uniforms),
          vertexShader: ShaderLib.background.vertexShader,
          fragmentShader: ShaderLib.background.fragmentShader,
          side: FrontSide,
          depthTest: false,
          depthWrite: false,
          fog: false
        }));
        f.geometry.deleteAttribute("normal");
        Object.defineProperty(f.material, "map", {
          get: function () {
            return this.uniforms.t2D.value;
          }
        });
        n.update(f);
      }
      f.material.uniforms.t2D.value = w;
      f.material.uniforms.backgroundIntensity.value = b.backgroundIntensity;
      f.material.toneMapped = ColorManagement.getTransfer(w.colorSpace) !== SRGBTransfer;
      if (w.matrixAutoUpdate === true) {
        w.updateMatrix();
      }
      f.material.uniforms.uvTransform.value.copy(w.matrix);
      if (g !== w || v !== w.version || _ !== o.toneMapping) {
        f.material.needsUpdate = true;
        g = w;
        v = w.version;
        _ = o.toneMapping;
      }
      f.layers.enableAll();
      S.unshift(f, f.geometry, f.material, 0, 0, null);
    }
  }
  function M(S, b) {
    S.getRGB(_rgb, getUnlitUniformColorSpace(o));
    r.buffers.color.setClear(_rgb.r, _rgb.g, _rgb.b, b, l);
  }
  return {
    getClearColor: function () {
      return c;
    },
    setClearColor: function (S, b = 1) {
      c.set(S);
      u = b;
      M(c, u);
    },
    getClearAlpha: function () {
      return u;
    },
    setClearAlpha: function (S) {
      u = S;
      M(c, u);
    },
    render: T
  };
}
function WebGLBindingStates(o, e, t, r) {
  const n = o.getParameter(o.MAX_VERTEX_ATTRIBS);
  const a = r.isWebGL2 ? null : e.get("OES_vertex_array_object");
  const l = r.isWebGL2 || a !== null;
  const c = {};
  const u = S(null);
  let f = u;
  let p = false;
  function g(z, j, X, Z, q) {
    let ue = false;
    if (l) {
      const oe = M(Z, X, j);
      if (f !== oe) {
        f = oe;
        _(f.object);
      }
      ue = b(z, Z, X, q);
      if (ue) {
        C(z, Z, X, q);
      }
    } else {
      const oe = j.wireframe === true;
      if (f.geometry !== Z.id || f.program !== X.id || f.wireframe !== oe) {
        f.geometry = Z.id;
        f.program = X.id;
        f.wireframe = oe;
        ue = true;
      }
    }
    if (q !== null) {
      t.update(q, o.ELEMENT_ARRAY_BUFFER);
    }
    if (ue || p) {
      p = false;
      k(z, j, X, Z);
      if (q !== null) {
        o.bindBuffer(o.ELEMENT_ARRAY_BUFFER, t.get(q).buffer);
      }
    }
  }
  function v() {
    if (r.isWebGL2) {
      return o.createVertexArray();
    } else {
      return a.createVertexArrayOES();
    }
  }
  function _(z) {
    if (r.isWebGL2) {
      return o.bindVertexArray(z);
    } else {
      return a.bindVertexArrayOES(z);
    }
  }
  function T(z) {
    if (r.isWebGL2) {
      return o.deleteVertexArray(z);
    } else {
      return a.deleteVertexArrayOES(z);
    }
  }
  function M(z, j, X) {
    const Z = X.wireframe === true;
    let q = c[z.id];
    if (q === undefined) {
      q = {};
      c[z.id] = q;
    }
    let ue = q[j.id];
    if (ue === undefined) {
      ue = {};
      q[j.id] = ue;
    }
    let oe = ue[Z];
    if (oe === undefined) {
      oe = S(v());
      ue[Z] = oe;
    }
    return oe;
  }
  function S(z) {
    const j = [];
    const X = [];
    const Z = [];
    for (let q = 0; q < n; q++) {
      j[q] = 0;
      X[q] = 0;
      Z[q] = 0;
    }
    return {
      geometry: null,
      program: null,
      wireframe: false,
      newAttributes: j,
      enabledAttributes: X,
      attributeDivisors: Z,
      object: z,
      attributes: {},
      index: null
    };
  }
  function b(z, j, X, Z) {
    const q = f.attributes;
    const ue = j.attributes;
    let oe = 0;
    const te = X.getAttributes();
    for (const le in te) {
      if (te[le].location >= 0) {
        const K = q[le];
        let G = ue[le];
        if (G === undefined) {
          if (le === "instanceMatrix" && z.instanceMatrix) {
            G = z.instanceMatrix;
          }
          if (le === "instanceColor" && z.instanceColor) {
            G = z.instanceColor;
          }
        }
        if (K === undefined || K.attribute !== G || G && K.data !== G.data) {
          return true;
        }
        oe++;
      }
    }
    return f.attributesNum !== oe || f.index !== Z;
  }
  function C(z, j, X, Z) {
    const q = {};
    const ue = j.attributes;
    let oe = 0;
    const te = X.getAttributes();
    for (const le in te) {
      if (te[le].location >= 0) {
        let K = ue[le];
        if (K === undefined) {
          if (le === "instanceMatrix" && z.instanceMatrix) {
            K = z.instanceMatrix;
          }
          if (le === "instanceColor" && z.instanceColor) {
            K = z.instanceColor;
          }
        }
        const G = {
          attribute: K
        };
        if (K && K.data) {
          G.data = K.data;
        }
        q[le] = G;
        oe++;
      }
    }
    f.attributes = q;
    f.attributesNum = oe;
    f.index = Z;
  }
  function w() {
    const z = f.newAttributes;
    for (let j = 0, X = z.length; j < X; j++) {
      z[j] = 0;
    }
  }
  function R(z) {
    E(z, 0);
  }
  function E(z, j) {
    const X = f.newAttributes;
    const Z = f.enabledAttributes;
    const q = f.attributeDivisors;
    X[z] = 1;
    if (Z[z] === 0) {
      o.enableVertexAttribArray(z);
      Z[z] = 1;
    }
    if (q[z] !== j) {
      (r.isWebGL2 ? o : e.get("ANGLE_instanced_arrays"))[r.isWebGL2 ? "vertexAttribDivisor" : "vertexAttribDivisorANGLE"](z, j);
      q[z] = j;
    }
  }
  function I() {
    const z = f.newAttributes;
    const j = f.enabledAttributes;
    for (let X = 0, Z = j.length; X < Z; X++) {
      if (j[X] !== z[X]) {
        o.disableVertexAttribArray(X);
        j[X] = 0;
      }
    }
  }
  function F(z, j, X, Z, q, ue, oe) {
    if (oe === true) {
      o.vertexAttribIPointer(z, j, X, q, ue);
    } else {
      o.vertexAttribPointer(z, j, X, Z, q, ue);
    }
  }
  function k(z, j, X, Z) {
    if (r.isWebGL2 === false && (z.isInstancedMesh || Z.isInstancedBufferGeometry) && e.get("ANGLE_instanced_arrays") === null) {
      return;
    }
    w();
    const q = Z.attributes;
    const ue = X.getAttributes();
    const oe = j.defaultAttributeValues;
    for (const te in ue) {
      const le = ue[te];
      if (le.location >= 0) {
        let Te = q[te];
        if (Te === undefined) {
          if (te === "instanceMatrix" && z.instanceMatrix) {
            Te = z.instanceMatrix;
          }
          if (te === "instanceColor" && z.instanceColor) {
            Te = z.instanceColor;
          }
        }
        if (Te !== undefined) {
          const K = Te.normalized;
          const G = Te.itemSize;
          const U = t.get(Te);
          if (U === undefined) {
            continue;
          }
          const N = U.buffer;
          const he = U.type;
          const ve = U.bytesPerElement;
          const de = r.isWebGL2 === true && (he === o.INT || he === o.UNSIGNED_INT || Te.gpuType === IntType);
          if (Te.isInterleavedBufferAttribute) {
            const xe = Te.data;
            const ee = xe.stride;
            const Ue = Te.offset;
            if (xe.isInstancedInterleavedBuffer) {
              for (let fe = 0; fe < le.locationSize; fe++) {
                E(le.location + fe, xe.meshPerAttribute);
              }
              if (z.isInstancedMesh !== true && Z._maxInstanceCount === undefined) {
                Z._maxInstanceCount = xe.meshPerAttribute * xe.count;
              }
            } else {
              for (let fe = 0; fe < le.locationSize; fe++) {
                R(le.location + fe);
              }
            }
            o.bindBuffer(o.ARRAY_BUFFER, N);
            for (let fe = 0; fe < le.locationSize; fe++) {
              F(le.location + fe, G / le.locationSize, he, K, ee * ve, (Ue + G / le.locationSize * fe) * ve, de);
            }
          } else {
            if (Te.isInstancedBufferAttribute) {
              for (let xe = 0; xe < le.locationSize; xe++) {
                E(le.location + xe, Te.meshPerAttribute);
              }
              if (z.isInstancedMesh !== true && Z._maxInstanceCount === undefined) {
                Z._maxInstanceCount = Te.meshPerAttribute * Te.count;
              }
            } else {
              for (let xe = 0; xe < le.locationSize; xe++) {
                R(le.location + xe);
              }
            }
            o.bindBuffer(o.ARRAY_BUFFER, N);
            for (let xe = 0; xe < le.locationSize; xe++) {
              F(le.location + xe, G / le.locationSize, he, K, G * ve, G / le.locationSize * xe * ve, de);
            }
          }
        } else if (oe !== undefined) {
          const K = oe[te];
          if (K !== undefined) {
            switch (K.length) {
              case 2:
                o.vertexAttrib2fv(le.location, K);
                break;
              case 3:
                o.vertexAttrib3fv(le.location, K);
                break;
              case 4:
                o.vertexAttrib4fv(le.location, K);
                break;
              default:
                o.vertexAttrib1fv(le.location, K);
            }
          }
        }
      }
    }
    I();
  }
  function L() {
    re();
    for (const z in c) {
      const j = c[z];
      for (const X in j) {
        const Z = j[X];
        for (const q in Z) {
          T(Z[q].object);
          delete Z[q];
        }
        delete j[X];
      }
      delete c[z];
    }
  }
  function D(z) {
    if (c[z.id] === undefined) {
      return;
    }
    const j = c[z.id];
    for (const X in j) {
      const Z = j[X];
      for (const q in Z) {
        T(Z[q].object);
        delete Z[q];
      }
      delete j[X];
    }
    delete c[z.id];
  }
  function ne(z) {
    for (const j in c) {
      const X = c[j];
      if (X[z.id] === undefined) {
        continue;
      }
      const Z = X[z.id];
      for (const q in Z) {
        T(Z[q].object);
        delete Z[q];
      }
      delete X[z.id];
    }
  }
  function re() {
    ce();
    p = true;
    if (f !== u) {
      f = u;
      _(f.object);
    }
  }
  function ce() {
    u.geometry = null;
    u.program = null;
    u.wireframe = false;
  }
  return {
    setup: g,
    reset: re,
    resetDefaultState: ce,
    dispose: L,
    releaseStatesOfGeometry: D,
    releaseStatesOfProgram: ne,
    initAttributes: w,
    enableAttribute: R,
    disableUnusedAttributes: I
  };
}
function WebGLBufferRenderer(o, e, t, r) {
  const n = r.isWebGL2;
  let a;
  function l(f) {
    a = f;
  }
  function c(f, p) {
    o.drawArrays(a, f, p);
    t.update(p, a, 1);
  }
  function u(f, p, g) {
    if (g === 0) {
      return;
    }
    let v;
    let _;
    if (n) {
      v = o;
      _ = "drawArraysInstanced";
    } else {
      v = e.get("ANGLE_instanced_arrays");
      _ = "drawArraysInstancedANGLE";
      if (v === null) {
        console.error("THREE.WebGLBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        return;
      }
    }
    v[_](a, f, p, g);
    t.update(p, a, g);
  }
  this.setMode = l;
  this.render = c;
  this.renderInstances = u;
}
function WebGLCapabilities(o, e, t) {
  let r;
  function n() {
    if (r !== undefined) {
      return r;
    }
    if (e.has("EXT_texture_filter_anisotropic") === true) {
      const F = e.get("EXT_texture_filter_anisotropic");
      r = o.getParameter(F.MAX_TEXTURE_MAX_ANISOTROPY_EXT);
    } else {
      r = 0;
    }
    return r;
  }
  function a(F) {
    if (F === "highp") {
      if (o.getShaderPrecisionFormat(o.VERTEX_SHADER, o.HIGH_FLOAT).precision > 0 && o.getShaderPrecisionFormat(o.FRAGMENT_SHADER, o.HIGH_FLOAT).precision > 0) {
        return "highp";
      }
      F = "mediump";
    }
    if (F === "mediump" && o.getShaderPrecisionFormat(o.VERTEX_SHADER, o.MEDIUM_FLOAT).precision > 0 && o.getShaderPrecisionFormat(o.FRAGMENT_SHADER, o.MEDIUM_FLOAT).precision > 0) {
      return "mediump";
    } else {
      return "lowp";
    }
  }
  const l = typeof WebGL2RenderingContext !== "undefined" && o.constructor.name === "WebGL2RenderingContext";
  let c = t.precision !== undefined ? t.precision : "highp";
  const u = a(c);
  if (u !== c) {
    console.warn("THREE.WebGLRenderer:", c, "not supported, using", u, "instead.");
    c = u;
  }
  const f = l || e.has("WEBGL_draw_buffers");
  const p = t.logarithmicDepthBuffer === true;
  const g = o.getParameter(o.MAX_TEXTURE_IMAGE_UNITS);
  const v = o.getParameter(o.MAX_VERTEX_TEXTURE_IMAGE_UNITS);
  const _ = o.getParameter(o.MAX_TEXTURE_SIZE);
  const T = o.getParameter(o.MAX_CUBE_MAP_TEXTURE_SIZE);
  const M = o.getParameter(o.MAX_VERTEX_ATTRIBS);
  const S = o.getParameter(o.MAX_VERTEX_UNIFORM_VECTORS);
  const b = o.getParameter(o.MAX_VARYING_VECTORS);
  const C = o.getParameter(o.MAX_FRAGMENT_UNIFORM_VECTORS);
  const w = v > 0;
  const R = l || e.has("OES_texture_float");
  const E = w && R;
  const I = l ? o.getParameter(o.MAX_SAMPLES) : 0;
  return {
    isWebGL2: l,
    drawBuffers: f,
    getMaxAnisotropy: n,
    getMaxPrecision: a,
    precision: c,
    logarithmicDepthBuffer: p,
    maxTextures: g,
    maxVertexTextures: v,
    maxTextureSize: _,
    maxCubemapSize: T,
    maxAttributes: M,
    maxVertexUniforms: S,
    maxVaryings: b,
    maxFragmentUniforms: C,
    vertexTextures: w,
    floatFragmentTextures: R,
    floatVertexTextures: E,
    maxSamples: I
  };
}
function WebGLClipping(o) {
  const e = this;
  let t = null;
  let r = 0;
  let n = false;
  let a = false;
  const l = new Plane();
  const c = new Matrix3();
  const u = {
    value: null,
    needsUpdate: false
  };
  this.uniform = u;
  this.numPlanes = 0;
  this.numIntersection = 0;
  this.init = function (g, v) {
    const _ = g.length !== 0 || v || r !== 0 || n;
    n = v;
    r = g.length;
    return _;
  };
  this.beginShadows = function () {
    a = true;
    p(null);
  };
  this.endShadows = function () {
    a = false;
  };
  this.setGlobalState = function (g, v) {
    t = p(g, v, 0);
  };
  this.setState = function (g, v, _) {
    const T = g.clippingPlanes;
    const M = g.clipIntersection;
    const S = g.clipShadows;
    const b = o.get(g);
    if (!n || T === null || T.length === 0 || a && !S) {
      if (a) {
        p(null);
      } else {
        f();
      }
    } else {
      const C = a ? 0 : r;
      const w = C * 4;
      let R = b.clippingState || null;
      u.value = R;
      R = p(T, v, w, _);
      for (let E = 0; E !== w; ++E) {
        R[E] = t[E];
      }
      b.clippingState = R;
      this.numIntersection = M ? this.numPlanes : 0;
      this.numPlanes += C;
    }
  };
  function f() {
    if (u.value !== t) {
      u.value = t;
      u.needsUpdate = r > 0;
    }
    e.numPlanes = r;
    e.numIntersection = 0;
  }
  function p(g, v, _, T) {
    const M = g !== null ? g.length : 0;
    let S = null;
    if (M !== 0) {
      S = u.value;
      if (T !== true || S === null) {
        const b = _ + M * 4;
        const C = v.matrixWorldInverse;
        c.getNormalMatrix(C);
        if (S === null || S.length < b) {
          S = new Float32Array(b);
        }
        for (let w = 0, R = _; w !== M; ++w, R += 4) {
          l.copy(g[w]).applyMatrix4(C, c);
          l.normal.toArray(S, R);
          S[R + 3] = l.constant;
        }
      }
      u.value = S;
      u.needsUpdate = true;
    }
    e.numPlanes = M;
    e.numIntersection = 0;
    return S;
  }
}
function WebGLCubeMaps(o) {
  let e = new WeakMap();
  function t(l, c) {
    if (c === EquirectangularReflectionMapping) {
      l.mapping = CubeReflectionMapping;
    } else if (c === EquirectangularRefractionMapping) {
      l.mapping = CubeRefractionMapping;
    }
    return l;
  }
  function r(l) {
    if (l && l.isTexture && l.isRenderTargetTexture === false) {
      const c = l.mapping;
      if (c === EquirectangularReflectionMapping || c === EquirectangularRefractionMapping) {
        if (e.has(l)) {
          const u = e.get(l).texture;
          return t(u, l.mapping);
        } else {
          const u = l.image;
          if (u && u.height > 0) {
            const f = new WebGLCubeRenderTarget(u.height / 2);
            f.fromEquirectangularTexture(o, l);
            e.set(l, f);
            l.addEventListener("dispose", n);
            return t(f.texture, l.mapping);
          } else {
            return null;
          }
        }
      }
    }
    return l;
  }
  function n(l) {
    const c = l.target;
    c.removeEventListener("dispose", n);
    const u = e.get(c);
    if (u !== undefined) {
      e.delete(c);
      u.dispose();
    }
  }
  function a() {
    e = new WeakMap();
  }
  return {
    get: r,
    dispose: a
  };
}
class OrthographicCamera extends Camera {
  constructor(e = -1, t = 1, r = 1, n = -1, a = 0.1, l = 2000) {
    super();
    this.isOrthographicCamera = true;
    this.type = "OrthographicCamera";
    this.zoom = 1;
    this.view = null;
    this.left = e;
    this.right = t;
    this.top = r;
    this.bottom = n;
    this.near = a;
    this.far = l;
    this.updateProjectionMatrix();
  }
  copy(e, t) {
    super.copy(e, t);
    this.left = e.left;
    this.right = e.right;
    this.top = e.top;
    this.bottom = e.bottom;
    this.near = e.near;
    this.far = e.far;
    this.zoom = e.zoom;
    this.view = e.view === null ? null : Object.assign({}, e.view);
    return this;
  }
  setViewOffset(e, t, r, n, a, l) {
    if (this.view === null) {
      this.view = {
        enabled: true,
        fullWidth: 1,
        fullHeight: 1,
        offsetX: 0,
        offsetY: 0,
        width: 1,
        height: 1
      };
    }
    this.view.enabled = true;
    this.view.fullWidth = e;
    this.view.fullHeight = t;
    this.view.offsetX = r;
    this.view.offsetY = n;
    this.view.width = a;
    this.view.height = l;
    this.updateProjectionMatrix();
  }
  clearViewOffset() {
    if (this.view !== null) {
      this.view.enabled = false;
    }
    this.updateProjectionMatrix();
  }
  updateProjectionMatrix() {
    const e = (this.right - this.left) / (this.zoom * 2);
    const t = (this.top - this.bottom) / (this.zoom * 2);
    const r = (this.right + this.left) / 2;
    const n = (this.top + this.bottom) / 2;
    let a = r - e;
    let l = r + e;
    let c = n + t;
    let u = n - t;
    if (this.view !== null && this.view.enabled) {
      const f = (this.right - this.left) / this.view.fullWidth / this.zoom;
      const p = (this.top - this.bottom) / this.view.fullHeight / this.zoom;
      a += f * this.view.offsetX;
      l = a + f * this.view.width;
      c -= p * this.view.offsetY;
      u = c - p * this.view.height;
    }
    this.projectionMatrix.makeOrthographic(a, l, c, u, this.near, this.far, this.coordinateSystem);
    this.projectionMatrixInverse.copy(this.projectionMatrix).invert();
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.object.zoom = this.zoom;
    t.object.left = this.left;
    t.object.right = this.right;
    t.object.top = this.top;
    t.object.bottom = this.bottom;
    t.object.near = this.near;
    t.object.far = this.far;
    if (this.view !== null) {
      t.object.view = Object.assign({}, this.view);
    }
    return t;
  }
}
const LOD_MIN = 4;
const EXTRA_LOD_SIGMA = [0.125, 0.215, 0.35, 0.446, 0.526, 0.582];
const MAX_SAMPLES = 20;
const _flatCamera = new OrthographicCamera();
const _clearColor = new Color();
let _oldTarget = null;
let _oldActiveCubeFace = 0;
let _oldActiveMipmapLevel = 0;
const PHI = (1 + Math.sqrt(5)) / 2;
const INV_PHI = 1 / PHI;
const _axisDirections = [new Vector3(1, 1, 1), new Vector3(-1, 1, 1), new Vector3(1, 1, -1), new Vector3(-1, 1, -1), new Vector3(0, PHI, INV_PHI), new Vector3(0, PHI, -INV_PHI), new Vector3(INV_PHI, 0, PHI), new Vector3(-INV_PHI, 0, PHI), new Vector3(PHI, INV_PHI, 0), new Vector3(-PHI, INV_PHI, 0)];
class PMREMGenerator {
  constructor(e) {
    this._renderer = e;
    this._pingPongRenderTarget = null;
    this._lodMax = 0;
    this._cubeSize = 0;
    this._lodPlanes = [];
    this._sizeLods = [];
    this._sigmas = [];
    this._blurMaterial = null;
    this._cubemapMaterial = null;
    this._equirectMaterial = null;
    this._compileMaterial(this._blurMaterial);
  }
  fromScene(e, t = 0, r = 0.1, n = 100) {
    _oldTarget = this._renderer.getRenderTarget();
    _oldActiveCubeFace = this._renderer.getActiveCubeFace();
    _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel();
    this._setSize(256);
    const a = this._allocateTargets();
    a.depthBuffer = true;
    this._sceneToCubeUV(e, r, n, a);
    if (t > 0) {
      this._blur(a, 0, 0, t);
    }
    this._applyPMREM(a);
    this._cleanup(a);
    return a;
  }
  fromEquirectangular(e, t = null) {
    return this._fromTexture(e, t);
  }
  fromCubemap(e, t = null) {
    return this._fromTexture(e, t);
  }
  compileCubemapShader() {
    if (this._cubemapMaterial === null) {
      this._cubemapMaterial = _getCubemapMaterial();
      this._compileMaterial(this._cubemapMaterial);
    }
  }
  compileEquirectangularShader() {
    if (this._equirectMaterial === null) {
      this._equirectMaterial = _getEquirectMaterial();
      this._compileMaterial(this._equirectMaterial);
    }
  }
  dispose() {
    this._dispose();
    if (this._cubemapMaterial !== null) {
      this._cubemapMaterial.dispose();
    }
    if (this._equirectMaterial !== null) {
      this._equirectMaterial.dispose();
    }
  }
  _setSize(e) {
    this._lodMax = Math.floor(Math.log2(e));
    this._cubeSize = Math.pow(2, this._lodMax);
  }
  _dispose() {
    if (this._blurMaterial !== null) {
      this._blurMaterial.dispose();
    }
    if (this._pingPongRenderTarget !== null) {
      this._pingPongRenderTarget.dispose();
    }
    for (let e = 0; e < this._lodPlanes.length; e++) {
      this._lodPlanes[e].dispose();
    }
  }
  _cleanup(e) {
    this._renderer.setRenderTarget(_oldTarget, _oldActiveCubeFace, _oldActiveMipmapLevel);
    e.scissorTest = false;
    _setViewport(e, 0, 0, e.width, e.height);
  }
  _fromTexture(e, t) {
    if (e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping) {
      this._setSize(e.image.length === 0 ? 16 : e.image[0].width || e.image[0].image.width);
    } else {
      this._setSize(e.image.width / 4);
    }
    _oldTarget = this._renderer.getRenderTarget();
    _oldActiveCubeFace = this._renderer.getActiveCubeFace();
    _oldActiveMipmapLevel = this._renderer.getActiveMipmapLevel();
    const r = t || this._allocateTargets();
    this._textureToCubeUV(e, r);
    this._applyPMREM(r);
    this._cleanup(r);
    return r;
  }
  _allocateTargets() {
    const e = Math.max(this._cubeSize, 112) * 3;
    const t = this._cubeSize * 4;
    const r = {
      magFilter: LinearFilter,
      minFilter: LinearFilter,
      generateMipmaps: false,
      type: HalfFloatType,
      format: RGBAFormat,
      colorSpace: LinearSRGBColorSpace,
      depthBuffer: false
    };
    const n = _createRenderTarget(e, t, r);
    if (this._pingPongRenderTarget === null || this._pingPongRenderTarget.width !== e || this._pingPongRenderTarget.height !== t) {
      if (this._pingPongRenderTarget !== null) {
        this._dispose();
      }
      this._pingPongRenderTarget = _createRenderTarget(e, t, r);
      const {
        _lodMax: a
      } = this;
      ({
        sizeLods: this._sizeLods,
        lodPlanes: this._lodPlanes,
        sigmas: this._sigmas
      } = _createPlanes(a));
      this._blurMaterial = _getBlurShader(a, e, t);
    }
    return n;
  }
  _compileMaterial(e) {
    const t = new Mesh(this._lodPlanes[0], e);
    this._renderer.compile(t, _flatCamera);
  }
  _sceneToCubeUV(e, t, r, n) {
    const c = new PerspectiveCamera(90, 1, t, r);
    const u = [1, -1, 1, 1, 1, 1];
    const f = [1, 1, 1, -1, -1, -1];
    const p = this._renderer;
    const g = p.autoClear;
    const v = p.toneMapping;
    p.getClearColor(_clearColor);
    p.toneMapping = NoToneMapping;
    p.autoClear = false;
    const _ = new MeshBasicMaterial({
      name: "PMREM.Background",
      side: BackSide,
      depthWrite: false,
      depthTest: false
    });
    const T = new Mesh(new BoxGeometry(), _);
    let M = false;
    const S = e.background;
    if (S) {
      if (S.isColor) {
        _.color.copy(S);
        e.background = null;
        M = true;
      }
    } else {
      _.color.copy(_clearColor);
      M = true;
    }
    for (let b = 0; b < 6; b++) {
      const C = b % 3;
      if (C === 0) {
        c.up.set(0, u[b], 0);
        c.lookAt(f[b], 0, 0);
      } else if (C === 1) {
        c.up.set(0, 0, u[b]);
        c.lookAt(0, f[b], 0);
      } else {
        c.up.set(0, u[b], 0);
        c.lookAt(0, 0, f[b]);
      }
      const w = this._cubeSize;
      _setViewport(n, C * w, b > 2 ? w : 0, w, w);
      p.setRenderTarget(n);
      if (M) {
        p.render(T, c);
      }
      p.render(e, c);
    }
    T.geometry.dispose();
    T.material.dispose();
    p.toneMapping = v;
    p.autoClear = g;
    e.background = S;
  }
  _textureToCubeUV(e, t) {
    const r = this._renderer;
    const n = e.mapping === CubeReflectionMapping || e.mapping === CubeRefractionMapping;
    if (n) {
      if (this._cubemapMaterial === null) {
        this._cubemapMaterial = _getCubemapMaterial();
      }
      this._cubemapMaterial.uniforms.flipEnvMap.value = e.isRenderTargetTexture === false ? -1 : 1;
    } else if (this._equirectMaterial === null) {
      this._equirectMaterial = _getEquirectMaterial();
    }
    const a = n ? this._cubemapMaterial : this._equirectMaterial;
    const l = new Mesh(this._lodPlanes[0], a);
    const c = a.uniforms;
    c.envMap.value = e;
    const u = this._cubeSize;
    _setViewport(t, 0, 0, u * 3, u * 2);
    r.setRenderTarget(t);
    r.render(l, _flatCamera);
  }
  _applyPMREM(e) {
    const t = this._renderer;
    const r = t.autoClear;
    t.autoClear = false;
    for (let n = 1; n < this._lodPlanes.length; n++) {
      const a = Math.sqrt(this._sigmas[n] * this._sigmas[n] - this._sigmas[n - 1] * this._sigmas[n - 1]);
      const l = _axisDirections[(n - 1) % _axisDirections.length];
      this._blur(e, n - 1, n, a, l);
    }
    t.autoClear = r;
  }
  _blur(e, t, r, n, a) {
    const l = this._pingPongRenderTarget;
    this._halfBlur(e, l, t, r, n, "latitudinal", a);
    this._halfBlur(l, e, r, r, n, "longitudinal", a);
  }
  _halfBlur(e, t, r, n, a, l, c) {
    const u = this._renderer;
    const f = this._blurMaterial;
    if (l !== "latitudinal" && l !== "longitudinal") {
      console.error("blur direction must be either latitudinal or longitudinal!");
    }
    const p = 3;
    const g = new Mesh(this._lodPlanes[n], f);
    const v = f.uniforms;
    const _ = this._sizeLods[r] - 1;
    const T = isFinite(a) ? Math.PI / (_ * 2) : Math.PI * 2 / (MAX_SAMPLES * 2 - 1);
    const M = a / T;
    const S = isFinite(a) ? 1 + Math.floor(p * M) : MAX_SAMPLES;
    if (S > MAX_SAMPLES) {
      console.warn(`sigmaRadians, ${a}, is too large and will clip, as it requested ${S} samples when the maximum is set to ${MAX_SAMPLES}`);
    }
    const b = [];
    let C = 0;
    for (let F = 0; F < MAX_SAMPLES; ++F) {
      const k = F / M;
      const L = Math.exp(-k * k / 2);
      b.push(L);
      if (F === 0) {
        C += L;
      } else if (F < S) {
        C += L * 2;
      }
    }
    for (let F = 0; F < b.length; F++) {
      b[F] = b[F] / C;
    }
    v.envMap.value = e.texture;
    v.samples.value = S;
    v.weights.value = b;
    v.latitudinal.value = l === "latitudinal";
    if (c) {
      v.poleAxis.value = c;
    }
    const {
      _lodMax: w
    } = this;
    v.dTheta.value = T;
    v.mipInt.value = w - r;
    const R = this._sizeLods[n];
    const E = R * 3 * (n > w - LOD_MIN ? n - w + LOD_MIN : 0);
    const I = (this._cubeSize - R) * 4;
    _setViewport(t, E, I, R * 3, R * 2);
    u.setRenderTarget(t);
    u.render(g, _flatCamera);
  }
}
function _createPlanes(o) {
  const e = [];
  const t = [];
  const r = [];
  let n = o;
  const a = o - LOD_MIN + 1 + EXTRA_LOD_SIGMA.length;
  for (let l = 0; l < a; l++) {
    const c = Math.pow(2, n);
    t.push(c);
    let u = 1 / c;
    if (l > o - LOD_MIN) {
      u = EXTRA_LOD_SIGMA[l - o + LOD_MIN - 1];
    } else if (l === 0) {
      u = 0;
    }
    r.push(u);
    const f = 1 / (c - 2);
    const p = -f;
    const g = 1 + f;
    const v = [p, p, g, p, g, g, p, p, g, g, p, g];
    const _ = 6;
    const T = 6;
    const M = 3;
    const S = 2;
    const b = 1;
    const C = new Float32Array(M * T * _);
    const w = new Float32Array(S * T * _);
    const R = new Float32Array(b * T * _);
    for (let I = 0; I < _; I++) {
      const F = I % 3 * 2 / 3 - 1;
      const k = I > 2 ? 0 : -1;
      const L = [F, k, 0, F + 2 / 3, k, 0, F + 2 / 3, k + 1, 0, F, k, 0, F + 2 / 3, k + 1, 0, F, k + 1, 0];
      C.set(L, M * T * I);
      w.set(v, S * T * I);
      const D = [I, I, I, I, I, I];
      R.set(D, b * T * I);
    }
    const E = new BufferGeometry();
    E.setAttribute("position", new BufferAttribute(C, M));
    E.setAttribute("uv", new BufferAttribute(w, S));
    E.setAttribute("faceIndex", new BufferAttribute(R, b));
    e.push(E);
    if (n > LOD_MIN) {
      n--;
    }
  }
  return {
    lodPlanes: e,
    sizeLods: t,
    sigmas: r
  };
}
function _createRenderTarget(o, e, t) {
  const r = new WebGLRenderTarget(o, e, t);
  r.texture.mapping = CubeUVReflectionMapping;
  r.texture.name = "PMREM.cubeUv";
  r.scissorTest = true;
  return r;
}
function _setViewport(o, e, t, r, n) {
  o.viewport.set(e, t, r, n);
  o.scissor.set(e, t, r, n);
}
function _getBlurShader(o, e, t) {
  const r = new Float32Array(MAX_SAMPLES);
  const n = new Vector3(0, 1, 0);
  return new ShaderMaterial({
    name: "SphericalGaussianBlur",
    defines: {
      n: MAX_SAMPLES,
      CUBEUV_TEXEL_WIDTH: 1 / e,
      CUBEUV_TEXEL_HEIGHT: 1 / t,
      CUBEUV_MAX_MIP: `${o}.0`
    },
    uniforms: {
      envMap: {
        value: null
      },
      samples: {
        value: 1
      },
      weights: {
        value: r
      },
      latitudinal: {
        value: false
      },
      dTheta: {
        value: 0
      },
      mipInt: {
        value: 0
      },
      poleAxis: {
        value: n
      }
    },
    vertexShader: _getCommonVertexShader(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;
			uniform int samples;
			uniform float weights[ n ];
			uniform bool latitudinal;
			uniform float dTheta;
			uniform float mipInt;
			uniform vec3 poleAxis;

			#define ENVMAP_TYPE_CUBE_UV
			#include <cube_uv_reflection_fragment>

			vec3 getSample( float theta, vec3 axis ) {

				float cosTheta = cos( theta );
				// Rodrigues' axis-angle rotation
				vec3 sampleDirection = vOutputDirection * cosTheta
					+ cross( axis, vOutputDirection ) * sin( theta )
					+ axis * dot( axis, vOutputDirection ) * ( 1.0 - cosTheta );

				return bilinearCubeUV( envMap, sampleDirection, mipInt );

			}

			void main() {

				vec3 axis = latitudinal ? poleAxis : cross( poleAxis, vOutputDirection );

				if ( all( equal( axis, vec3( 0.0 ) ) ) ) {

					axis = vec3( vOutputDirection.z, 0.0, - vOutputDirection.x );

				}

				axis = normalize( axis );

				gl_FragColor = vec4( 0.0, 0.0, 0.0, 1.0 );
				gl_FragColor.rgb += weights[ 0 ] * getSample( 0.0, axis );

				for ( int i = 1; i < n; i++ ) {

					if ( i >= samples ) {

						break;

					}

					float theta = dTheta * float( i );
					gl_FragColor.rgb += weights[ i ] * getSample( -1.0 * theta, axis );
					gl_FragColor.rgb += weights[ i ] * getSample( theta, axis );

				}

			}
		`,
    blending: NoBlending,
    depthTest: false,
    depthWrite: false
  });
}
function _getEquirectMaterial() {
  return new ShaderMaterial({
    name: "EquirectangularToCubeUV",
    uniforms: {
      envMap: {
        value: null
      }
    },
    vertexShader: _getCommonVertexShader(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			varying vec3 vOutputDirection;

			uniform sampler2D envMap;

			#include <common>

			void main() {

				vec3 outputDirection = normalize( vOutputDirection );
				vec2 uv = equirectUv( outputDirection );

				gl_FragColor = vec4( texture2D ( envMap, uv ).rgb, 1.0 );

			}
		`,
    blending: NoBlending,
    depthTest: false,
    depthWrite: false
  });
}
function _getCubemapMaterial() {
  return new ShaderMaterial({
    name: "CubemapToCubeUV",
    uniforms: {
      envMap: {
        value: null
      },
      flipEnvMap: {
        value: -1
      }
    },
    vertexShader: _getCommonVertexShader(),
    fragmentShader: `

			precision mediump float;
			precision mediump int;

			uniform float flipEnvMap;

			varying vec3 vOutputDirection;

			uniform samplerCube envMap;

			void main() {

				gl_FragColor = textureCube( envMap, vec3( flipEnvMap * vOutputDirection.x, vOutputDirection.yz ) );

			}
		`,
    blending: NoBlending,
    depthTest: false,
    depthWrite: false
  });
}
function _getCommonVertexShader() {
  return `

		precision mediump float;
		precision mediump int;

		attribute float faceIndex;

		varying vec3 vOutputDirection;

		// RH coordinate system; PMREM face-indexing convention
		vec3 getDirection( vec2 uv, float face ) {

			uv = 2.0 * uv - 1.0;

			vec3 direction = vec3( uv, 1.0 );

			if ( face == 0.0 ) {

				direction = direction.zyx; // ( 1, v, u ) pos x

			} else if ( face == 1.0 ) {

				direction = direction.xzy;
				direction.xz *= -1.0; // ( -u, 1, -v ) pos y

			} else if ( face == 2.0 ) {

				direction.x *= -1.0; // ( -u, v, 1 ) pos z

			} else if ( face == 3.0 ) {

				direction = direction.zyx;
				direction.xz *= -1.0; // ( -1, v, -u ) neg x

			} else if ( face == 4.0 ) {

				direction = direction.xzy;
				direction.xy *= -1.0; // ( -u, -1, v ) neg y

			} else if ( face == 5.0 ) {

				direction.z *= -1.0; // ( u, v, -1 ) neg z

			}

			return direction;

		}

		void main() {

			vOutputDirection = getDirection( uv, faceIndex );
			gl_Position = vec4( position, 1.0 );

		}
	`;
}
function WebGLCubeUVMaps(o) {
  let e = new WeakMap();
  let t = null;
  function r(c) {
    if (c && c.isTexture) {
      const u = c.mapping;
      const f = u === EquirectangularReflectionMapping || u === EquirectangularRefractionMapping;
      const p = u === CubeReflectionMapping || u === CubeRefractionMapping;
      if (f || p) {
        if (c.isRenderTargetTexture && c.needsPMREMUpdate === true) {
          c.needsPMREMUpdate = false;
          let g = e.get(c);
          if (t === null) {
            t = new PMREMGenerator(o);
          }
          g = f ? t.fromEquirectangular(c, g) : t.fromCubemap(c, g);
          e.set(c, g);
          return g.texture;
        } else {
          if (e.has(c)) {
            return e.get(c).texture;
          }
          {
            const g = c.image;
            if (f && g && g.height > 0 || p && g && n(g)) {
              if (t === null) {
                t = new PMREMGenerator(o);
              }
              const v = f ? t.fromEquirectangular(c) : t.fromCubemap(c);
              e.set(c, v);
              c.addEventListener("dispose", a);
              return v.texture;
            } else {
              return null;
            }
          }
        }
      }
    }
    return c;
  }
  function n(c) {
    let u = 0;
    const f = 6;
    for (let p = 0; p < f; p++) {
      if (c[p] !== undefined) {
        u++;
      }
    }
    return u === f;
  }
  function a(c) {
    const u = c.target;
    u.removeEventListener("dispose", a);
    const f = e.get(u);
    if (f !== undefined) {
      e.delete(u);
      f.dispose();
    }
  }
  function l() {
    e = new WeakMap();
    if (t !== null) {
      t.dispose();
      t = null;
    }
  }
  return {
    get: r,
    dispose: l
  };
}
function WebGLExtensions(o) {
  const e = {};
  function t(r) {
    if (e[r] !== undefined) {
      return e[r];
    }
    let n;
    switch (r) {
      case "WEBGL_depth_texture":
        n = o.getExtension("WEBGL_depth_texture") || o.getExtension("MOZ_WEBGL_depth_texture") || o.getExtension("WEBKIT_WEBGL_depth_texture");
        break;
      case "EXT_texture_filter_anisotropic":
        n = o.getExtension("EXT_texture_filter_anisotropic") || o.getExtension("MOZ_EXT_texture_filter_anisotropic") || o.getExtension("WEBKIT_EXT_texture_filter_anisotropic");
        break;
      case "WEBGL_compressed_texture_s3tc":
        n = o.getExtension("WEBGL_compressed_texture_s3tc") || o.getExtension("MOZ_WEBGL_compressed_texture_s3tc") || o.getExtension("WEBKIT_WEBGL_compressed_texture_s3tc");
        break;
      case "WEBGL_compressed_texture_pvrtc":
        n = o.getExtension("WEBGL_compressed_texture_pvrtc") || o.getExtension("WEBKIT_WEBGL_compressed_texture_pvrtc");
        break;
      default:
        n = o.getExtension(r);
    }
    e[r] = n;
    return n;
  }
  return {
    has: function (r) {
      return t(r) !== null;
    },
    init: function (r) {
      if (r.isWebGL2) {
        t("EXT_color_buffer_float");
      } else {
        t("WEBGL_depth_texture");
        t("OES_texture_float");
        t("OES_texture_half_float");
        t("OES_texture_half_float_linear");
        t("OES_standard_derivatives");
        t("OES_element_index_uint");
        t("OES_vertex_array_object");
        t("ANGLE_instanced_arrays");
      }
      t("OES_texture_float_linear");
      t("EXT_color_buffer_half_float");
      t("WEBGL_multisampled_render_to_texture");
    },
    get: function (r) {
      const n = t(r);
      if (n === null) {
        console.warn("THREE.WebGLRenderer: " + r + " extension not supported.");
      }
      return n;
    }
  };
}
function WebGLGeometries(o, e, t, r) {
  const n = {};
  const a = new WeakMap();
  function l(g) {
    const v = g.target;
    if (v.index !== null) {
      e.remove(v.index);
    }
    for (const T in v.attributes) {
      e.remove(v.attributes[T]);
    }
    for (const T in v.morphAttributes) {
      const M = v.morphAttributes[T];
      for (let S = 0, b = M.length; S < b; S++) {
        e.remove(M[S]);
      }
    }
    v.removeEventListener("dispose", l);
    delete n[v.id];
    const _ = a.get(v);
    if (_) {
      e.remove(_);
      a.delete(v);
    }
    r.releaseStatesOfGeometry(v);
    if (v.isInstancedBufferGeometry === true) {
      delete v._maxInstanceCount;
    }
    t.memory.geometries--;
  }
  function c(g, v) {
    if (n[v.id] !== true) {
      v.addEventListener("dispose", l);
      n[v.id] = true;
      t.memory.geometries++;
    }
    return v;
  }
  function u(g) {
    const v = g.attributes;
    for (const T in v) {
      e.update(v[T], o.ARRAY_BUFFER);
    }
    const _ = g.morphAttributes;
    for (const T in _) {
      const M = _[T];
      for (let S = 0, b = M.length; S < b; S++) {
        e.update(M[S], o.ARRAY_BUFFER);
      }
    }
  }
  function f(g) {
    const v = [];
    const _ = g.index;
    const T = g.attributes.position;
    let M = 0;
    if (_ !== null) {
      const C = _.array;
      M = _.version;
      for (let w = 0, R = C.length; w < R; w += 3) {
        const E = C[w + 0];
        const I = C[w + 1];
        const F = C[w + 2];
        v.push(E, I, I, F, F, E);
      }
    } else if (T !== undefined) {
      const C = T.array;
      M = T.version;
      for (let w = 0, R = C.length / 3 - 1; w < R; w += 3) {
        const E = w + 0;
        const I = w + 1;
        const F = w + 2;
        v.push(E, I, I, F, F, E);
      }
    } else {
      return;
    }
    const S = new (arrayNeedsUint32(v) ? Uint32BufferAttribute : Uint16BufferAttribute)(v, 1);
    S.version = M;
    const b = a.get(g);
    if (b) {
      e.remove(b);
    }
    a.set(g, S);
  }
  function p(g) {
    const v = a.get(g);
    if (v) {
      const _ = g.index;
      if (_ !== null && v.version < _.version) {
        f(g);
      }
    } else {
      f(g);
    }
    return a.get(g);
  }
  return {
    get: c,
    update: u,
    getWireframeAttribute: p
  };
}
function WebGLIndexedBufferRenderer(o, e, t, r) {
  const n = r.isWebGL2;
  let a;
  function l(v) {
    a = v;
  }
  let c;
  let u;
  function f(v) {
    c = v.type;
    u = v.bytesPerElement;
  }
  function p(v, _) {
    o.drawElements(a, _, c, v * u);
    t.update(_, a, 1);
  }
  function g(v, _, T) {
    if (T === 0) {
      return;
    }
    let M;
    let S;
    if (n) {
      M = o;
      S = "drawElementsInstanced";
    } else {
      M = e.get("ANGLE_instanced_arrays");
      S = "drawElementsInstancedANGLE";
      if (M === null) {
        console.error("THREE.WebGLIndexedBufferRenderer: using THREE.InstancedBufferGeometry but hardware does not support extension ANGLE_instanced_arrays.");
        return;
      }
    }
    M[S](a, _, c, v * u, T);
    t.update(_, a, T);
  }
  this.setMode = l;
  this.setIndex = f;
  this.render = p;
  this.renderInstances = g;
}
function WebGLInfo(o) {
  const e = {
    geometries: 0,
    textures: 0
  };
  const t = {
    frame: 0,
    calls: 0,
    triangles: 0,
    points: 0,
    lines: 0
  };
  function r(a, l, c) {
    t.calls++;
    switch (l) {
      case o.TRIANGLES:
        t.triangles += c * (a / 3);
        break;
      case o.LINES:
        t.lines += c * (a / 2);
        break;
      case o.LINE_STRIP:
        t.lines += c * (a - 1);
        break;
      case o.LINE_LOOP:
        t.lines += c * a;
        break;
      case o.POINTS:
        t.points += c * a;
        break;
      default:
        console.error("THREE.WebGLInfo: Unknown draw mode:", l);
        break;
    }
  }
  function n() {
    t.calls = 0;
    t.triangles = 0;
    t.points = 0;
    t.lines = 0;
  }
  return {
    memory: e,
    render: t,
    programs: null,
    autoReset: true,
    reset: n,
    update: r
  };
}
function numericalSort(o, e) {
  return o[0] - e[0];
}
function absNumericalSort(o, e) {
  return Math.abs(e[1]) - Math.abs(o[1]);
}
function WebGLMorphtargets(o, e, t) {
  const r = {};
  const n = new Float32Array(8);
  const a = new WeakMap();
  const l = new Vector4();
  const c = [];
  for (let f = 0; f < 8; f++) {
    c[f] = [f, 0];
  }
  function u(f, p, g) {
    const v = f.morphTargetInfluences;
    if (e.isWebGL2 === true) {
      const T = p.morphAttributes.position || p.morphAttributes.normal || p.morphAttributes.color;
      const M = T !== undefined ? T.length : 0;
      let S = a.get(p);
      if (S === undefined || S.count !== M) {
        let j = function () {
          ce.dispose();
          a.delete(p);
          p.removeEventListener("dispose", j);
        };
        var _ = j;
        if (S !== undefined) {
          S.texture.dispose();
        }
        const w = p.morphAttributes.position !== undefined;
        const R = p.morphAttributes.normal !== undefined;
        const E = p.morphAttributes.color !== undefined;
        const I = p.morphAttributes.position || [];
        const F = p.morphAttributes.normal || [];
        const k = p.morphAttributes.color || [];
        let L = 0;
        if (w === true) {
          L = 1;
        }
        if (R === true) {
          L = 2;
        }
        if (E === true) {
          L = 3;
        }
        let D = p.attributes.position.count * L;
        let ne = 1;
        if (D > e.maxTextureSize) {
          ne = Math.ceil(D / e.maxTextureSize);
          D = e.maxTextureSize;
        }
        const re = new Float32Array(D * ne * 4 * M);
        const ce = new DataArrayTexture(re, D, ne, M);
        ce.type = FloatType;
        ce.needsUpdate = true;
        const z = L * 4;
        for (let X = 0; X < M; X++) {
          const Z = I[X];
          const q = F[X];
          const ue = k[X];
          const oe = D * ne * 4 * X;
          for (let te = 0; te < Z.count; te++) {
            const le = te * z;
            if (w === true) {
              l.fromBufferAttribute(Z, te);
              re[oe + le + 0] = l.x;
              re[oe + le + 1] = l.y;
              re[oe + le + 2] = l.z;
              re[oe + le + 3] = 0;
            }
            if (R === true) {
              l.fromBufferAttribute(q, te);
              re[oe + le + 4] = l.x;
              re[oe + le + 5] = l.y;
              re[oe + le + 6] = l.z;
              re[oe + le + 7] = 0;
            }
            if (E === true) {
              l.fromBufferAttribute(ue, te);
              re[oe + le + 8] = l.x;
              re[oe + le + 9] = l.y;
              re[oe + le + 10] = l.z;
              re[oe + le + 11] = ue.itemSize === 4 ? l.w : 1;
            }
          }
        }
        S = {
          count: M,
          texture: ce,
          size: new Vector2(D, ne)
        };
        a.set(p, S);
        p.addEventListener("dispose", j);
      }
      let b = 0;
      for (let w = 0; w < v.length; w++) {
        b += v[w];
      }
      const C = p.morphTargetsRelative ? 1 : 1 - b;
      g.getUniforms().setValue(o, "morphTargetBaseInfluence", C);
      g.getUniforms().setValue(o, "morphTargetInfluences", v);
      g.getUniforms().setValue(o, "morphTargetsTexture", S.texture, t);
      g.getUniforms().setValue(o, "morphTargetsTextureSize", S.size);
    } else {
      const T = v === undefined ? 0 : v.length;
      let M = r[p.id];
      if (M === undefined || M.length !== T) {
        M = [];
        for (let R = 0; R < T; R++) {
          M[R] = [R, 0];
        }
        r[p.id] = M;
      }
      for (let R = 0; R < T; R++) {
        const E = M[R];
        E[0] = R;
        E[1] = v[R];
      }
      M.sort(absNumericalSort);
      for (let R = 0; R < 8; R++) {
        if (R < T && M[R][1]) {
          c[R][0] = M[R][0];
          c[R][1] = M[R][1];
        } else {
          c[R][0] = Number.MAX_SAFE_INTEGER;
          c[R][1] = 0;
        }
      }
      c.sort(numericalSort);
      const S = p.morphAttributes.position;
      const b = p.morphAttributes.normal;
      let C = 0;
      for (let R = 0; R < 8; R++) {
        const E = c[R];
        const I = E[0];
        const F = E[1];
        if (I !== Number.MAX_SAFE_INTEGER && F) {
          if (S && p.getAttribute("morphTarget" + R) !== S[I]) {
            p.setAttribute("morphTarget" + R, S[I]);
          }
          if (b && p.getAttribute("morphNormal" + R) !== b[I]) {
            p.setAttribute("morphNormal" + R, b[I]);
          }
          n[R] = F;
          C += F;
        } else {
          if (S && p.hasAttribute("morphTarget" + R) === true) {
            p.deleteAttribute("morphTarget" + R);
          }
          if (b && p.hasAttribute("morphNormal" + R) === true) {
            p.deleteAttribute("morphNormal" + R);
          }
          n[R] = 0;
        }
      }
      const w = p.morphTargetsRelative ? 1 : 1 - C;
      g.getUniforms().setValue(o, "morphTargetBaseInfluence", w);
      g.getUniforms().setValue(o, "morphTargetInfluences", n);
    }
  }
  return {
    update: u
  };
}
function WebGLObjects(o, e, t, r) {
  let n = new WeakMap();
  function a(u) {
    const f = r.render.frame;
    const p = u.geometry;
    const g = e.get(u, p);
    if (n.get(g) !== f) {
      e.update(g);
      n.set(g, f);
    }
    if (u.isInstancedMesh) {
      if (u.hasEventListener("dispose", c) === false) {
        u.addEventListener("dispose", c);
      }
      if (n.get(u) !== f) {
        t.update(u.instanceMatrix, o.ARRAY_BUFFER);
        if (u.instanceColor !== null) {
          t.update(u.instanceColor, o.ARRAY_BUFFER);
        }
        n.set(u, f);
      }
    }
    if (u.isSkinnedMesh) {
      const v = u.skeleton;
      if (n.get(v) !== f) {
        v.update();
        n.set(v, f);
      }
    }
    return g;
  }
  function l() {
    n = new WeakMap();
  }
  function c(u) {
    const f = u.target;
    f.removeEventListener("dispose", c);
    t.remove(f.instanceMatrix);
    if (f.instanceColor !== null) {
      t.remove(f.instanceColor);
    }
  }
  return {
    update: a,
    dispose: l
  };
}
const emptyTexture = new Texture();
const emptyArrayTexture = new DataArrayTexture();
const empty3dTexture = new Data3DTexture();
const emptyCubeTexture = new CubeTexture();
const arrayCacheF32 = [];
const arrayCacheI32 = [];
const mat4array = new Float32Array(16);
const mat3array = new Float32Array(9);
const mat2array = new Float32Array(4);
function flatten(o, e, t) {
  const r = o[0];
  if (r <= 0 || r > 0) {
    return o;
  }
  const n = e * t;
  let a = arrayCacheF32[n];
  if (a === undefined) {
    a = new Float32Array(n);
    arrayCacheF32[n] = a;
  }
  if (e !== 0) {
    r.toArray(a, 0);
    for (let l = 1, c = 0; l !== e; ++l) {
      c += t;
      o[l].toArray(a, c);
    }
  }
  return a;
}
function arraysEqual(o, e) {
  if (o.length !== e.length) {
    return false;
  }
  for (let t = 0, r = o.length; t < r; t++) {
    if (o[t] !== e[t]) {
      return false;
    }
  }
  return true;
}
function copyArray(o, e) {
  for (let t = 0, r = e.length; t < r; t++) {
    o[t] = e[t];
  }
}
function allocTexUnits(o, e) {
  let t = arrayCacheI32[e];
  if (t === undefined) {
    t = new Int32Array(e);
    arrayCacheI32[e] = t;
  }
  for (let r = 0; r !== e; ++r) {
    t[r] = o.allocateTextureUnit();
  }
  return t;
}
function setValueV1f(o, e) {
  const t = this.cache;
  if (t[0] !== e) {
    o.uniform1f(this.addr, e);
    t[0] = e;
  }
}
function setValueV2f(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y) {
      o.uniform2f(this.addr, e.x, e.y);
      t[0] = e.x;
      t[1] = e.y;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform2fv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV3f(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) {
      o.uniform3f(this.addr, e.x, e.y, e.z);
      t[0] = e.x;
      t[1] = e.y;
      t[2] = e.z;
    }
  } else if (e.r !== undefined) {
    if (t[0] !== e.r || t[1] !== e.g || t[2] !== e.b) {
      o.uniform3f(this.addr, e.r, e.g, e.b);
      t[0] = e.r;
      t[1] = e.g;
      t[2] = e.b;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform3fv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV4f(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) {
      o.uniform4f(this.addr, e.x, e.y, e.z, e.w);
      t[0] = e.x;
      t[1] = e.y;
      t[2] = e.z;
      t[3] = e.w;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform4fv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueM2(o, e) {
  const t = this.cache;
  const r = e.elements;
  if (r === undefined) {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniformMatrix2fv(this.addr, false, e);
    copyArray(t, e);
  } else {
    if (arraysEqual(t, r)) {
      return;
    }
    mat2array.set(r);
    o.uniformMatrix2fv(this.addr, false, mat2array);
    copyArray(t, r);
  }
}
function setValueM3(o, e) {
  const t = this.cache;
  const r = e.elements;
  if (r === undefined) {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniformMatrix3fv(this.addr, false, e);
    copyArray(t, e);
  } else {
    if (arraysEqual(t, r)) {
      return;
    }
    mat3array.set(r);
    o.uniformMatrix3fv(this.addr, false, mat3array);
    copyArray(t, r);
  }
}
function setValueM4(o, e) {
  const t = this.cache;
  const r = e.elements;
  if (r === undefined) {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniformMatrix4fv(this.addr, false, e);
    copyArray(t, e);
  } else {
    if (arraysEqual(t, r)) {
      return;
    }
    mat4array.set(r);
    o.uniformMatrix4fv(this.addr, false, mat4array);
    copyArray(t, r);
  }
}
function setValueV1i(o, e) {
  const t = this.cache;
  if (t[0] !== e) {
    o.uniform1i(this.addr, e);
    t[0] = e;
  }
}
function setValueV2i(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y) {
      o.uniform2i(this.addr, e.x, e.y);
      t[0] = e.x;
      t[1] = e.y;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform2iv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV3i(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) {
      o.uniform3i(this.addr, e.x, e.y, e.z);
      t[0] = e.x;
      t[1] = e.y;
      t[2] = e.z;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform3iv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV4i(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) {
      o.uniform4i(this.addr, e.x, e.y, e.z, e.w);
      t[0] = e.x;
      t[1] = e.y;
      t[2] = e.z;
      t[3] = e.w;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform4iv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV1ui(o, e) {
  const t = this.cache;
  if (t[0] !== e) {
    o.uniform1ui(this.addr, e);
    t[0] = e;
  }
}
function setValueV2ui(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y) {
      o.uniform2ui(this.addr, e.x, e.y);
      t[0] = e.x;
      t[1] = e.y;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform2uiv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV3ui(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z) {
      o.uniform3ui(this.addr, e.x, e.y, e.z);
      t[0] = e.x;
      t[1] = e.y;
      t[2] = e.z;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform3uiv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueV4ui(o, e) {
  const t = this.cache;
  if (e.x !== undefined) {
    if (t[0] !== e.x || t[1] !== e.y || t[2] !== e.z || t[3] !== e.w) {
      o.uniform4ui(this.addr, e.x, e.y, e.z, e.w);
      t[0] = e.x;
      t[1] = e.y;
      t[2] = e.z;
      t[3] = e.w;
    }
  } else {
    if (arraysEqual(t, e)) {
      return;
    }
    o.uniform4uiv(this.addr, e);
    copyArray(t, e);
  }
}
function setValueT1(o, e, t) {
  const r = this.cache;
  const n = t.allocateTextureUnit();
  if (r[0] !== n) {
    o.uniform1i(this.addr, n);
    r[0] = n;
  }
  t.setTexture2D(e || emptyTexture, n);
}
function setValueT3D1(o, e, t) {
  const r = this.cache;
  const n = t.allocateTextureUnit();
  if (r[0] !== n) {
    o.uniform1i(this.addr, n);
    r[0] = n;
  }
  t.setTexture3D(e || empty3dTexture, n);
}
function setValueT6(o, e, t) {
  const r = this.cache;
  const n = t.allocateTextureUnit();
  if (r[0] !== n) {
    o.uniform1i(this.addr, n);
    r[0] = n;
  }
  t.setTextureCube(e || emptyCubeTexture, n);
}
function setValueT2DArray1(o, e, t) {
  const r = this.cache;
  const n = t.allocateTextureUnit();
  if (r[0] !== n) {
    o.uniform1i(this.addr, n);
    r[0] = n;
  }
  t.setTexture2DArray(e || emptyArrayTexture, n);
}
function getSingularSetter(o) {
  switch (o) {
    case 5126:
      return setValueV1f;
    case 35664:
      return setValueV2f;
    case 35665:
      return setValueV3f;
    case 35666:
      return setValueV4f;
    case 35674:
      return setValueM2;
    case 35675:
      return setValueM3;
    case 35676:
      return setValueM4;
    case 5124:
    case 35670:
      return setValueV1i;
    case 35667:
    case 35671:
      return setValueV2i;
    case 35668:
    case 35672:
      return setValueV3i;
    case 35669:
    case 35673:
      return setValueV4i;
    case 5125:
      return setValueV1ui;
    case 36294:
      return setValueV2ui;
    case 36295:
      return setValueV3ui;
    case 36296:
      return setValueV4ui;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return setValueT1;
    case 35679:
    case 36299:
    case 36307:
      return setValueT3D1;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return setValueT6;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return setValueT2DArray1;
  }
}
function setValueV1fArray(o, e) {
  o.uniform1fv(this.addr, e);
}
function setValueV2fArray(o, e) {
  const t = flatten(e, this.size, 2);
  o.uniform2fv(this.addr, t);
}
function setValueV3fArray(o, e) {
  const t = flatten(e, this.size, 3);
  o.uniform3fv(this.addr, t);
}
function setValueV4fArray(o, e) {
  const t = flatten(e, this.size, 4);
  o.uniform4fv(this.addr, t);
}
function setValueM2Array(o, e) {
  const t = flatten(e, this.size, 4);
  o.uniformMatrix2fv(this.addr, false, t);
}
function setValueM3Array(o, e) {
  const t = flatten(e, this.size, 9);
  o.uniformMatrix3fv(this.addr, false, t);
}
function setValueM4Array(o, e) {
  const t = flatten(e, this.size, 16);
  o.uniformMatrix4fv(this.addr, false, t);
}
function setValueV1iArray(o, e) {
  o.uniform1iv(this.addr, e);
}
function setValueV2iArray(o, e) {
  o.uniform2iv(this.addr, e);
}
function setValueV3iArray(o, e) {
  o.uniform3iv(this.addr, e);
}
function setValueV4iArray(o, e) {
  o.uniform4iv(this.addr, e);
}
function setValueV1uiArray(o, e) {
  o.uniform1uiv(this.addr, e);
}
function setValueV2uiArray(o, e) {
  o.uniform2uiv(this.addr, e);
}
function setValueV3uiArray(o, e) {
  o.uniform3uiv(this.addr, e);
}
function setValueV4uiArray(o, e) {
  o.uniform4uiv(this.addr, e);
}
function setValueT1Array(o, e, t) {
  const r = this.cache;
  const n = e.length;
  const a = allocTexUnits(t, n);
  if (!arraysEqual(r, a)) {
    o.uniform1iv(this.addr, a);
    copyArray(r, a);
  }
  for (let l = 0; l !== n; ++l) {
    t.setTexture2D(e[l] || emptyTexture, a[l]);
  }
}
function setValueT3DArray(o, e, t) {
  const r = this.cache;
  const n = e.length;
  const a = allocTexUnits(t, n);
  if (!arraysEqual(r, a)) {
    o.uniform1iv(this.addr, a);
    copyArray(r, a);
  }
  for (let l = 0; l !== n; ++l) {
    t.setTexture3D(e[l] || empty3dTexture, a[l]);
  }
}
function setValueT6Array(o, e, t) {
  const r = this.cache;
  const n = e.length;
  const a = allocTexUnits(t, n);
  if (!arraysEqual(r, a)) {
    o.uniform1iv(this.addr, a);
    copyArray(r, a);
  }
  for (let l = 0; l !== n; ++l) {
    t.setTextureCube(e[l] || emptyCubeTexture, a[l]);
  }
}
function setValueT2DArrayArray(o, e, t) {
  const r = this.cache;
  const n = e.length;
  const a = allocTexUnits(t, n);
  if (!arraysEqual(r, a)) {
    o.uniform1iv(this.addr, a);
    copyArray(r, a);
  }
  for (let l = 0; l !== n; ++l) {
    t.setTexture2DArray(e[l] || emptyArrayTexture, a[l]);
  }
}
function getPureArraySetter(o) {
  switch (o) {
    case 5126:
      return setValueV1fArray;
    case 35664:
      return setValueV2fArray;
    case 35665:
      return setValueV3fArray;
    case 35666:
      return setValueV4fArray;
    case 35674:
      return setValueM2Array;
    case 35675:
      return setValueM3Array;
    case 35676:
      return setValueM4Array;
    case 5124:
    case 35670:
      return setValueV1iArray;
    case 35667:
    case 35671:
      return setValueV2iArray;
    case 35668:
    case 35672:
      return setValueV3iArray;
    case 35669:
    case 35673:
      return setValueV4iArray;
    case 5125:
      return setValueV1uiArray;
    case 36294:
      return setValueV2uiArray;
    case 36295:
      return setValueV3uiArray;
    case 36296:
      return setValueV4uiArray;
    case 35678:
    case 36198:
    case 36298:
    case 36306:
    case 35682:
      return setValueT1Array;
    case 35679:
    case 36299:
    case 36307:
      return setValueT3DArray;
    case 35680:
    case 36300:
    case 36308:
    case 36293:
      return setValueT6Array;
    case 36289:
    case 36303:
    case 36311:
    case 36292:
      return setValueT2DArrayArray;
  }
}
class SingleUniform {
  constructor(e, t, r) {
    this.id = e;
    this.addr = r;
    this.cache = [];
    this.setValue = getSingularSetter(t.type);
  }
}
class PureArrayUniform {
  constructor(e, t, r) {
    this.id = e;
    this.addr = r;
    this.cache = [];
    this.size = t.size;
    this.setValue = getPureArraySetter(t.type);
  }
}
class StructuredUniform {
  constructor(e) {
    this.id = e;
    this.seq = [];
    this.map = {};
  }
  setValue(e, t, r) {
    const n = this.seq;
    for (let a = 0, l = n.length; a !== l; ++a) {
      const c = n[a];
      c.setValue(e, t[c.id], r);
    }
  }
}
const RePathPart = /(\w+)(\])?(\[|\.)?/g;
function addUniform(o, e) {
  o.seq.push(e);
  o.map[e.id] = e;
}
function parseUniform(o, e, t) {
  const r = o.name;
  const n = r.length;
  for (RePathPart.lastIndex = 0;;) {
    const a = RePathPart.exec(r);
    const l = RePathPart.lastIndex;
    let c = a[1];
    const u = a[2] === "]";
    const f = a[3];
    if (u) {
      c = c | 0;
    }
    if (f === undefined || f === "[" && l + 2 === n) {
      addUniform(t, f === undefined ? new SingleUniform(c, o, e) : new PureArrayUniform(c, o, e));
      break;
    } else {
      let g = t.map[c];
      if (g === undefined) {
        g = new StructuredUniform(c);
        addUniform(t, g);
      }
      t = g;
    }
  }
}
class WebGLUniforms {
  constructor(e, t) {
    this.seq = [];
    this.map = {};
    const r = e.getProgramParameter(t, e.ACTIVE_UNIFORMS);
    for (let n = 0; n < r; ++n) {
      const a = e.getActiveUniform(t, n);
      const l = e.getUniformLocation(t, a.name);
      parseUniform(a, l, this);
    }
  }
  setValue(e, t, r, n) {
    const a = this.map[t];
    if (a !== undefined) {
      a.setValue(e, r, n);
    }
  }
  setOptional(e, t, r) {
    const n = t[r];
    if (n !== undefined) {
      this.setValue(e, r, n);
    }
  }
  static upload(e, t, r, n) {
    for (let a = 0, l = t.length; a !== l; ++a) {
      const c = t[a];
      const u = r[c.id];
      if (u.needsUpdate !== false) {
        c.setValue(e, u.value, n);
      }
    }
  }
  static seqWithValue(e, t) {
    const r = [];
    for (let n = 0, a = e.length; n !== a; ++n) {
      const l = e[n];
      if (l.id in t) {
        r.push(l);
      }
    }
    return r;
  }
}
function WebGLShader(o, e, t) {
  const r = o.createShader(e);
  o.shaderSource(r, t);
  o.compileShader(r);
  return r;
}
const COMPLETION_STATUS_KHR = 37297;
let programIdCount = 0;
function handleSource(o, e) {
  const t = o.split(`
`);
  const r = [];
  const n = Math.max(e - 6, 0);
  const a = Math.min(e + 6, t.length);
  for (let l = n; l < a; l++) {
    const c = l + 1;
    r.push(`${c === e ? ">" : " "} ${c}: ${t[l]}`);
  }
  return r.join(`
`);
}
function getEncodingComponents(o) {
  const e = ColorManagement.getPrimaries(ColorManagement.workingColorSpace);
  const t = ColorManagement.getPrimaries(o);
  let r;
  if (e === t) {
    r = "";
  } else if (e === P3Primaries && t === Rec709Primaries) {
    r = "LinearDisplayP3ToLinearSRGB";
  } else if (e === Rec709Primaries && t === P3Primaries) {
    r = "LinearSRGBToLinearDisplayP3";
  }
  switch (o) {
    case LinearSRGBColorSpace:
    case LinearDisplayP3ColorSpace:
      return [r, "LinearTransferOETF"];
    case SRGBColorSpace:
    case DisplayP3ColorSpace:
      return [r, "sRGBTransferOETF"];
    default:
      console.warn("THREE.WebGLProgram: Unsupported color space:", o);
      return [r, "LinearTransferOETF"];
  }
}
function getShaderErrors(o, e, t) {
  const r = o.getShaderParameter(e, o.COMPILE_STATUS);
  const n = o.getShaderInfoLog(e).trim();
  if (r && n === "") {
    return "";
  }
  const a = /ERROR: 0:(\d+)/.exec(n);
  if (a) {
    const l = parseInt(a[1]);
    return `${t.toUpperCase()}

${n}

${handleSource(o.getShaderSource(e), l)}`;
  } else {
    return n;
  }
}
function getTexelEncodingFunction(o, e) {
  const t = getEncodingComponents(e);
  return `vec4 ${o}( vec4 value ) { return ${t[0]}( ${t[1]}( value ) ); }`;
}
function getToneMappingFunction(o, e) {
  let t;
  switch (e) {
    case LinearToneMapping:
      t = "Linear";
      break;
    case ReinhardToneMapping:
      t = "Reinhard";
      break;
    case CineonToneMapping:
      t = "OptimizedCineon";
      break;
    case ACESFilmicToneMapping:
      t = "ACESFilmic";
      break;
    case CustomToneMapping:
      t = "Custom";
      break;
    default:
      console.warn("THREE.WebGLProgram: Unsupported toneMapping:", e);
      t = "Linear";
  }
  return "vec3 " + o + "( vec3 color ) { return " + t + "ToneMapping( color ); }";
}
function generateExtensions(o) {
  return [o.extensionDerivatives || o.envMapCubeUVHeight || o.bumpMap || o.normalMapTangentSpace || o.clearcoatNormalMap || o.flatShading || o.shaderID === "physical" ? "#extension GL_OES_standard_derivatives : enable" : "", (o.extensionFragDepth || o.logarithmicDepthBuffer) && o.rendererExtensionFragDepth ? "#extension GL_EXT_frag_depth : enable" : "", o.extensionDrawBuffers && o.rendererExtensionDrawBuffers ? "#extension GL_EXT_draw_buffers : require" : "", (o.extensionShaderTextureLOD || o.envMap || o.transmission) && o.rendererExtensionShaderTextureLod ? "#extension GL_EXT_shader_texture_lod : enable" : ""].filter(filterEmptyLine).join(`
`);
}
function generateDefines(o) {
  const e = [];
  for (const t in o) {
    const r = o[t];
    if (r !== false) {
      e.push("#define " + t + " " + r);
    }
  }
  return e.join(`
`);
}
function fetchAttributeLocations(o, e) {
  const t = {};
  const r = o.getProgramParameter(e, o.ACTIVE_ATTRIBUTES);
  for (let n = 0; n < r; n++) {
    const a = o.getActiveAttrib(e, n);
    const l = a.name;
    let c = 1;
    if (a.type === o.FLOAT_MAT2) {
      c = 2;
    }
    if (a.type === o.FLOAT_MAT3) {
      c = 3;
    }
    if (a.type === o.FLOAT_MAT4) {
      c = 4;
    }
    t[l] = {
      type: a.type,
      location: o.getAttribLocation(e, l),
      locationSize: c
    };
  }
  return t;
}
function filterEmptyLine(o) {
  return o !== "";
}
function replaceLightNums(o, e) {
  const t = e.numSpotLightShadows + e.numSpotLightMaps - e.numSpotLightShadowsWithMaps;
  return o.replace(/NUM_DIR_LIGHTS/g, e.numDirLights).replace(/NUM_SPOT_LIGHTS/g, e.numSpotLights).replace(/NUM_SPOT_LIGHT_MAPS/g, e.numSpotLightMaps).replace(/NUM_SPOT_LIGHT_COORDS/g, t).replace(/NUM_RECT_AREA_LIGHTS/g, e.numRectAreaLights).replace(/NUM_POINT_LIGHTS/g, e.numPointLights).replace(/NUM_HEMI_LIGHTS/g, e.numHemiLights).replace(/NUM_DIR_LIGHT_SHADOWS/g, e.numDirLightShadows).replace(/NUM_SPOT_LIGHT_SHADOWS_WITH_MAPS/g, e.numSpotLightShadowsWithMaps).replace(/NUM_SPOT_LIGHT_SHADOWS/g, e.numSpotLightShadows).replace(/NUM_POINT_LIGHT_SHADOWS/g, e.numPointLightShadows);
}
function replaceClippingPlaneNums(o, e) {
  return o.replace(/NUM_CLIPPING_PLANES/g, e.numClippingPlanes).replace(/UNION_CLIPPING_PLANES/g, e.numClippingPlanes - e.numClipIntersection);
}
const includePattern = /^[ \t]*#include +<([\w\d./]+)>/gm;
function resolveIncludes(o) {
  return o.replace(includePattern, includeReplacer);
}
const shaderChunkMap = new Map([["encodings_fragment", "colorspace_fragment"], ["encodings_pars_fragment", "colorspace_pars_fragment"], ["output_fragment", "opaque_fragment"]]);
function includeReplacer(o, e) {
  let t = ShaderChunk[e];
  if (t === undefined) {
    const r = shaderChunkMap.get(e);
    if (r !== undefined) {
      t = ShaderChunk[r];
      console.warn("THREE.WebGLRenderer: Shader chunk \"%s\" has been deprecated. Use \"%s\" instead.", e, r);
    } else {
      throw new Error("Can not resolve #include <" + e + ">");
    }
  }
  return resolveIncludes(t);
}
const unrollLoopPattern = /#pragma unroll_loop_start\s+for\s*\(\s*int\s+i\s*=\s*(\d+)\s*;\s*i\s*<\s*(\d+)\s*;\s*i\s*\+\+\s*\)\s*{([\s\S]+?)}\s+#pragma unroll_loop_end/g;
function unrollLoops(o) {
  return o.replace(unrollLoopPattern, loopReplacer);
}
function loopReplacer(o, e, t, r) {
  let n = "";
  for (let a = parseInt(e); a < parseInt(t); a++) {
    n += r.replace(/\[\s*i\s*\]/g, "[ " + a + " ]").replace(/UNROLLED_LOOP_INDEX/g, a);
  }
  return n;
}
function generatePrecision(o) {
  let e = `${"precision " + o.precision} float;
precision ${o.precision} int;`;
  if (o.precision === "highp") {
    e += `
#define HIGH_PRECISION`;
  } else if (o.precision === "mediump") {
    e += `
#define MEDIUM_PRECISION`;
  } else if (o.precision === "lowp") {
    e += `
#define LOW_PRECISION`;
  }
  return e;
}
function generateShadowMapTypeDefine(o) {
  let e = "SHADOWMAP_TYPE_BASIC";
  if (o.shadowMapType === PCFShadowMap) {
    e = "SHADOWMAP_TYPE_PCF";
  } else if (o.shadowMapType === PCFSoftShadowMap) {
    e = "SHADOWMAP_TYPE_PCF_SOFT";
  } else if (o.shadowMapType === VSMShadowMap) {
    e = "SHADOWMAP_TYPE_VSM";
  }
  return e;
}
function generateEnvMapTypeDefine(o) {
  let e = "ENVMAP_TYPE_CUBE";
  if (o.envMap) {
    switch (o.envMapMode) {
      case CubeReflectionMapping:
      case CubeRefractionMapping:
        e = "ENVMAP_TYPE_CUBE";
        break;
      case CubeUVReflectionMapping:
        e = "ENVMAP_TYPE_CUBE_UV";
        break;
    }
  }
  return e;
}
function generateEnvMapModeDefine(o) {
  let e = "ENVMAP_MODE_REFLECTION";
  if (o.envMap) {
    switch (o.envMapMode) {
      case CubeRefractionMapping:
        e = "ENVMAP_MODE_REFRACTION";
        break;
    }
  }
  return e;
}
function generateEnvMapBlendingDefine(o) {
  let e = "ENVMAP_BLENDING_NONE";
  if (o.envMap) {
    switch (o.combine) {
      case MultiplyOperation:
        e = "ENVMAP_BLENDING_MULTIPLY";
        break;
      case MixOperation:
        e = "ENVMAP_BLENDING_MIX";
        break;
      case AddOperation:
        e = "ENVMAP_BLENDING_ADD";
        break;
    }
  }
  return e;
}
function generateCubeUVSize(o) {
  const e = o.envMapCubeUVHeight;
  if (e === null) {
    return null;
  }
  const t = Math.log2(e) - 2;
  const r = 1 / e;
  return {
    texelWidth: 1 / (Math.max(Math.pow(2, t), 112) * 3),
    texelHeight: r,
    maxMip: t
  };
}
function WebGLProgram(o, e, t, r) {
  const n = o.getContext();
  const a = t.defines;
  let l = t.vertexShader;
  let c = t.fragmentShader;
  const u = generateShadowMapTypeDefine(t);
  const f = generateEnvMapTypeDefine(t);
  const p = generateEnvMapModeDefine(t);
  const g = generateEnvMapBlendingDefine(t);
  const v = generateCubeUVSize(t);
  const _ = t.isWebGL2 ? "" : generateExtensions(t);
  const T = generateDefines(a);
  const M = n.createProgram();
  let S;
  let b;
  let C = t.glslVersion ? `${"#version " + t.glslVersion}
` : "";
  if (t.isRawShaderMaterial) {
    S = ["#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, T].filter(filterEmptyLine).join(`
`);
    if (S.length > 0) {
      S += `
`;
    }
    b = [_, "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, T].filter(filterEmptyLine).join(`
`);
    if (b.length > 0) {
      b += `
`;
    }
  } else {
    S = [generatePrecision(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, T, t.instancing ? "#define USE_INSTANCING" : "", t.instancingColor ? "#define USE_INSTANCING_COLOR" : "", t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + p : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.displacementMap ? "#define USE_DISPLACEMENTMAP" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.mapUv ? "#define MAP_UV " + t.mapUv : "", t.alphaMapUv ? "#define ALPHAMAP_UV " + t.alphaMapUv : "", t.lightMapUv ? "#define LIGHTMAP_UV " + t.lightMapUv : "", t.aoMapUv ? "#define AOMAP_UV " + t.aoMapUv : "", t.emissiveMapUv ? "#define EMISSIVEMAP_UV " + t.emissiveMapUv : "", t.bumpMapUv ? "#define BUMPMAP_UV " + t.bumpMapUv : "", t.normalMapUv ? "#define NORMALMAP_UV " + t.normalMapUv : "", t.displacementMapUv ? "#define DISPLACEMENTMAP_UV " + t.displacementMapUv : "", t.metalnessMapUv ? "#define METALNESSMAP_UV " + t.metalnessMapUv : "", t.roughnessMapUv ? "#define ROUGHNESSMAP_UV " + t.roughnessMapUv : "", t.anisotropyMapUv ? "#define ANISOTROPYMAP_UV " + t.anisotropyMapUv : "", t.clearcoatMapUv ? "#define CLEARCOATMAP_UV " + t.clearcoatMapUv : "", t.clearcoatNormalMapUv ? "#define CLEARCOAT_NORMALMAP_UV " + t.clearcoatNormalMapUv : "", t.clearcoatRoughnessMapUv ? "#define CLEARCOAT_ROUGHNESSMAP_UV " + t.clearcoatRoughnessMapUv : "", t.iridescenceMapUv ? "#define IRIDESCENCEMAP_UV " + t.iridescenceMapUv : "", t.iridescenceThicknessMapUv ? "#define IRIDESCENCE_THICKNESSMAP_UV " + t.iridescenceThicknessMapUv : "", t.sheenColorMapUv ? "#define SHEEN_COLORMAP_UV " + t.sheenColorMapUv : "", t.sheenRoughnessMapUv ? "#define SHEEN_ROUGHNESSMAP_UV " + t.sheenRoughnessMapUv : "", t.specularMapUv ? "#define SPECULARMAP_UV " + t.specularMapUv : "", t.specularColorMapUv ? "#define SPECULAR_COLORMAP_UV " + t.specularColorMapUv : "", t.specularIntensityMapUv ? "#define SPECULAR_INTENSITYMAP_UV " + t.specularIntensityMapUv : "", t.transmissionMapUv ? "#define TRANSMISSIONMAP_UV " + t.transmissionMapUv : "", t.thicknessMapUv ? "#define THICKNESSMAP_UV " + t.thicknessMapUv : "", t.vertexTangents && t.flatShading === false ? "#define USE_TANGENT" : "", t.vertexColors ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.skinning ? "#define USE_SKINNING" : "", t.morphTargets ? "#define USE_MORPHTARGETS" : "", t.morphNormals && t.flatShading === false ? "#define USE_MORPHNORMALS" : "", t.morphColors && t.isWebGL2 ? "#define USE_MORPHCOLORS" : "", t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE" : "", t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_TEXTURE_STRIDE " + t.morphTextureStride : "", t.morphTargetsCount > 0 && t.isWebGL2 ? "#define MORPHTARGETS_COUNT " + t.morphTargetsCount : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + u : "", t.sizeAttenuation ? "#define USE_SIZEATTENUATION" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.useLegacyLights ? "#define LEGACY_LIGHTS" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 modelMatrix;", "uniform mat4 modelViewMatrix;", "uniform mat4 projectionMatrix;", "uniform mat4 viewMatrix;", "uniform mat3 normalMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", "#ifdef USE_INSTANCING", "\tattribute mat4 instanceMatrix;", "#endif", "#ifdef USE_INSTANCING_COLOR", "\tattribute vec3 instanceColor;", "#endif", "attribute vec3 position;", "attribute vec3 normal;", "attribute vec2 uv;", "#ifdef USE_UV1", "\tattribute vec2 uv1;", "#endif", "#ifdef USE_UV2", "\tattribute vec2 uv2;", "#endif", "#ifdef USE_UV3", "\tattribute vec2 uv3;", "#endif", "#ifdef USE_TANGENT", "\tattribute vec4 tangent;", "#endif", "#if defined( USE_COLOR_ALPHA )", "\tattribute vec4 color;", "#elif defined( USE_COLOR )", "\tattribute vec3 color;", "#endif", "#if ( defined( USE_MORPHTARGETS ) && ! defined( MORPHTARGETS_TEXTURE ) )", "\tattribute vec3 morphTarget0;", "\tattribute vec3 morphTarget1;", "\tattribute vec3 morphTarget2;", "\tattribute vec3 morphTarget3;", "\t#ifdef USE_MORPHNORMALS", "\t\tattribute vec3 morphNormal0;", "\t\tattribute vec3 morphNormal1;", "\t\tattribute vec3 morphNormal2;", "\t\tattribute vec3 morphNormal3;", "\t#else", "\t\tattribute vec3 morphTarget4;", "\t\tattribute vec3 morphTarget5;", "\t\tattribute vec3 morphTarget6;", "\t\tattribute vec3 morphTarget7;", "\t#endif", "#endif", "#ifdef USE_SKINNING", "\tattribute vec4 skinIndex;", "\tattribute vec4 skinWeight;", "#endif", `
`].filter(filterEmptyLine).join(`
`);
    b = [_, generatePrecision(t), "#define SHADER_TYPE " + t.shaderType, "#define SHADER_NAME " + t.shaderName, T, t.useFog && t.fog ? "#define USE_FOG" : "", t.useFog && t.fogExp2 ? "#define FOG_EXP2" : "", t.map ? "#define USE_MAP" : "", t.matcap ? "#define USE_MATCAP" : "", t.envMap ? "#define USE_ENVMAP" : "", t.envMap ? "#define " + f : "", t.envMap ? "#define " + p : "", t.envMap ? "#define " + g : "", v ? "#define CUBEUV_TEXEL_WIDTH " + v.texelWidth : "", v ? "#define CUBEUV_TEXEL_HEIGHT " + v.texelHeight : "", v ? "#define CUBEUV_MAX_MIP " + v.maxMip + ".0" : "", t.lightMap ? "#define USE_LIGHTMAP" : "", t.aoMap ? "#define USE_AOMAP" : "", t.bumpMap ? "#define USE_BUMPMAP" : "", t.normalMap ? "#define USE_NORMALMAP" : "", t.normalMapObjectSpace ? "#define USE_NORMALMAP_OBJECTSPACE" : "", t.normalMapTangentSpace ? "#define USE_NORMALMAP_TANGENTSPACE" : "", t.emissiveMap ? "#define USE_EMISSIVEMAP" : "", t.anisotropy ? "#define USE_ANISOTROPY" : "", t.anisotropyMap ? "#define USE_ANISOTROPYMAP" : "", t.clearcoat ? "#define USE_CLEARCOAT" : "", t.clearcoatMap ? "#define USE_CLEARCOATMAP" : "", t.clearcoatRoughnessMap ? "#define USE_CLEARCOAT_ROUGHNESSMAP" : "", t.clearcoatNormalMap ? "#define USE_CLEARCOAT_NORMALMAP" : "", t.iridescence ? "#define USE_IRIDESCENCE" : "", t.iridescenceMap ? "#define USE_IRIDESCENCEMAP" : "", t.iridescenceThicknessMap ? "#define USE_IRIDESCENCE_THICKNESSMAP" : "", t.specularMap ? "#define USE_SPECULARMAP" : "", t.specularColorMap ? "#define USE_SPECULAR_COLORMAP" : "", t.specularIntensityMap ? "#define USE_SPECULAR_INTENSITYMAP" : "", t.roughnessMap ? "#define USE_ROUGHNESSMAP" : "", t.metalnessMap ? "#define USE_METALNESSMAP" : "", t.alphaMap ? "#define USE_ALPHAMAP" : "", t.alphaTest ? "#define USE_ALPHATEST" : "", t.alphaHash ? "#define USE_ALPHAHASH" : "", t.sheen ? "#define USE_SHEEN" : "", t.sheenColorMap ? "#define USE_SHEEN_COLORMAP" : "", t.sheenRoughnessMap ? "#define USE_SHEEN_ROUGHNESSMAP" : "", t.transmission ? "#define USE_TRANSMISSION" : "", t.transmissionMap ? "#define USE_TRANSMISSIONMAP" : "", t.thicknessMap ? "#define USE_THICKNESSMAP" : "", t.vertexTangents && t.flatShading === false ? "#define USE_TANGENT" : "", t.vertexColors || t.instancingColor ? "#define USE_COLOR" : "", t.vertexAlphas ? "#define USE_COLOR_ALPHA" : "", t.vertexUv1s ? "#define USE_UV1" : "", t.vertexUv2s ? "#define USE_UV2" : "", t.vertexUv3s ? "#define USE_UV3" : "", t.pointsUvs ? "#define USE_POINTS_UV" : "", t.gradientMap ? "#define USE_GRADIENTMAP" : "", t.flatShading ? "#define FLAT_SHADED" : "", t.doubleSided ? "#define DOUBLE_SIDED" : "", t.flipSided ? "#define FLIP_SIDED" : "", t.shadowMapEnabled ? "#define USE_SHADOWMAP" : "", t.shadowMapEnabled ? "#define " + u : "", t.premultipliedAlpha ? "#define PREMULTIPLIED_ALPHA" : "", t.numLightProbes > 0 ? "#define USE_LIGHT_PROBES" : "", t.useLegacyLights ? "#define LEGACY_LIGHTS" : "", t.decodeVideoTexture ? "#define DECODE_VIDEO_TEXTURE" : "", t.logarithmicDepthBuffer ? "#define USE_LOGDEPTHBUF" : "", t.logarithmicDepthBuffer && t.rendererExtensionFragDepth ? "#define USE_LOGDEPTHBUF_EXT" : "", "uniform mat4 viewMatrix;", "uniform vec3 cameraPosition;", "uniform bool isOrthographic;", t.toneMapping !== NoToneMapping ? "#define TONE_MAPPING" : "", t.toneMapping !== NoToneMapping ? ShaderChunk.tonemapping_pars_fragment : "", t.toneMapping !== NoToneMapping ? getToneMappingFunction("toneMapping", t.toneMapping) : "", t.dithering ? "#define DITHERING" : "", t.opaque ? "#define OPAQUE" : "", ShaderChunk.colorspace_pars_fragment, getTexelEncodingFunction("linearToOutputTexel", t.outputColorSpace), t.useDepthPacking ? "#define DEPTH_PACKING " + t.depthPacking : "", `
`].filter(filterEmptyLine).join(`
`);
  }
  l = resolveIncludes(l);
  l = replaceLightNums(l, t);
  l = replaceClippingPlaneNums(l, t);
  c = resolveIncludes(c);
  c = replaceLightNums(c, t);
  c = replaceClippingPlaneNums(c, t);
  l = unrollLoops(l);
  c = unrollLoops(c);
  if (t.isWebGL2 && t.isRawShaderMaterial !== true) {
    C = `#version 300 es
`;
    S = `${["precision mediump sampler2DArray;", "#define attribute in", "#define varying out", "#define texture2D texture"].join(`
`)}
${S}`;
    b = `${["precision mediump sampler2DArray;", "#define varying in", t.glslVersion === GLSL3 ? "" : "layout(location = 0) out highp vec4 pc_fragColor;", t.glslVersion === GLSL3 ? "" : "#define gl_FragColor pc_fragColor", "#define gl_FragDepthEXT gl_FragDepth", "#define texture2D texture", "#define textureCube texture", "#define texture2DProj textureProj", "#define texture2DLodEXT textureLod", "#define texture2DProjLodEXT textureProjLod", "#define textureCubeLodEXT textureLod", "#define texture2DGradEXT textureGrad", "#define texture2DProjGradEXT textureProjGrad", "#define textureCubeGradEXT textureGrad"].join(`
`)}
${b}`;
  }
  const w = C + S + l;
  const R = C + b + c;
  const E = WebGLShader(n, n.VERTEX_SHADER, w);
  const I = WebGLShader(n, n.FRAGMENT_SHADER, R);
  n.attachShader(M, E);
  n.attachShader(M, I);
  if (t.index0AttributeName !== undefined) {
    n.bindAttribLocation(M, 0, t.index0AttributeName);
  } else if (t.morphTargets === true) {
    n.bindAttribLocation(M, 0, "position");
  }
  n.linkProgram(M);
  function F(ne) {
    if (o.debug.checkShaderErrors) {
      const re = n.getProgramInfoLog(M).trim();
      const ce = n.getShaderInfoLog(E).trim();
      const z = n.getShaderInfoLog(I).trim();
      let j = true;
      let X = true;
      if (n.getProgramParameter(M, n.LINK_STATUS) === false) {
        j = false;
        if (typeof o.debug.onShaderError == "function") {
          o.debug.onShaderError(n, M, E, I);
        } else {
          const Z = getShaderErrors(n, E, "vertex");
          const q = getShaderErrors(n, I, "fragment");
          console.error(`${"THREE.WebGLProgram: Shader Error " + n.getError() + " - VALIDATE_STATUS " + n.getProgramParameter(M, n.VALIDATE_STATUS)}

Program Info Log: ${re}
${Z}
${q}`);
        }
      } else if (re !== "") {
        console.warn("THREE.WebGLProgram: Program Info Log:", re);
      } else if (ce === "" || z === "") {
        X = false;
      }
      if (X) {
        ne.diagnostics = {
          runnable: j,
          programLog: re,
          vertexShader: {
            log: ce,
            prefix: S
          },
          fragmentShader: {
            log: z,
            prefix: b
          }
        };
      }
    }
    n.deleteShader(E);
    n.deleteShader(I);
    k = new WebGLUniforms(n, M);
    L = fetchAttributeLocations(n, M);
  }
  let k;
  this.getUniforms = function () {
    if (k === undefined) {
      F(this);
    }
    return k;
  };
  let L;
  this.getAttributes = function () {
    if (L === undefined) {
      F(this);
    }
    return L;
  };
  let D = t.rendererExtensionParallelShaderCompile === false;
  this.isReady = function () {
    if (D === false) {
      D = n.getProgramParameter(M, COMPLETION_STATUS_KHR);
    }
    return D;
  };
  this.destroy = function () {
    r.releaseStatesOfProgram(this);
    n.deleteProgram(M);
    this.program = undefined;
  };
  this.type = t.shaderType;
  this.name = t.shaderName;
  this.id = programIdCount++;
  this.cacheKey = e;
  this.usedTimes = 1;
  this.program = M;
  this.vertexShader = E;
  this.fragmentShader = I;
  return this;
}
let _id$1 = 0;
class WebGLShaderCache {
  constructor() {
    this.shaderCache = new Map();
    this.materialCache = new Map();
  }
  update(e) {
    const t = e.vertexShader;
    const r = e.fragmentShader;
    const n = this._getShaderStage(t);
    const a = this._getShaderStage(r);
    const l = this._getShaderCacheForMaterial(e);
    if (l.has(n) === false) {
      l.add(n);
      n.usedTimes++;
    }
    if (l.has(a) === false) {
      l.add(a);
      a.usedTimes++;
    }
    return this;
  }
  remove(e) {
    const t = this.materialCache.get(e);
    for (const r of t) {
      r.usedTimes--;
      if (r.usedTimes === 0) {
        this.shaderCache.delete(r.code);
      }
    }
    this.materialCache.delete(e);
    return this;
  }
  getVertexShaderID(e) {
    return this._getShaderStage(e.vertexShader).id;
  }
  getFragmentShaderID(e) {
    return this._getShaderStage(e.fragmentShader).id;
  }
  dispose() {
    this.shaderCache.clear();
    this.materialCache.clear();
  }
  _getShaderCacheForMaterial(e) {
    const t = this.materialCache;
    let r = t.get(e);
    if (r === undefined) {
      r = new Set();
      t.set(e, r);
    }
    return r;
  }
  _getShaderStage(e) {
    const t = this.shaderCache;
    let r = t.get(e);
    if (r === undefined) {
      r = new WebGLShaderStage(e);
      t.set(e, r);
    }
    return r;
  }
}
class WebGLShaderStage {
  constructor(e) {
    this.id = _id$1++;
    this.code = e;
    this.usedTimes = 0;
  }
}
function WebGLPrograms(o, e, t, r, n, a, l) {
  const c = new Layers();
  const u = new WebGLShaderCache();
  const f = [];
  const p = n.isWebGL2;
  const g = n.logarithmicDepthBuffer;
  const v = n.vertexTextures;
  let _ = n.precision;
  const T = {
    MeshDepthMaterial: "depth",
    MeshDistanceMaterial: "distanceRGBA",
    MeshNormalMaterial: "normal",
    MeshBasicMaterial: "basic",
    MeshLambertMaterial: "lambert",
    MeshPhongMaterial: "phong",
    MeshToonMaterial: "toon",
    MeshStandardMaterial: "physical",
    MeshPhysicalMaterial: "physical",
    MeshMatcapMaterial: "matcap",
    LineBasicMaterial: "basic",
    LineDashedMaterial: "dashed",
    PointsMaterial: "points",
    ShadowMaterial: "shadow",
    SpriteMaterial: "sprite"
  };
  function M(L) {
    if (L === 0) {
      return "uv";
    } else {
      return `uv${L}`;
    }
  }
  function S(L, D, ne, re, ce) {
    const z = re.fog;
    const j = ce.geometry;
    const X = L.isMeshStandardMaterial ? re.environment : null;
    const Z = (L.isMeshStandardMaterial ? t : e).get(L.envMap || X);
    const q = Z && Z.mapping === CubeUVReflectionMapping ? Z.image.height : null;
    const ue = T[L.type];
    if (L.precision !== null) {
      _ = n.getMaxPrecision(L.precision);
      if (_ !== L.precision) {
        console.warn("THREE.WebGLProgram.getParameters:", L.precision, "not supported, using", _, "instead.");
      }
    }
    const oe = j.morphAttributes.position || j.morphAttributes.normal || j.morphAttributes.color;
    const te = oe !== undefined ? oe.length : 0;
    let le = 0;
    if (j.morphAttributes.position !== undefined) {
      le = 1;
    }
    if (j.morphAttributes.normal !== undefined) {
      le = 2;
    }
    if (j.morphAttributes.color !== undefined) {
      le = 3;
    }
    let Te;
    let K;
    let G;
    let U;
    if (ue) {
      const pt = ShaderLib[ue];
      Te = pt.vertexShader;
      K = pt.fragmentShader;
    } else {
      Te = L.vertexShader;
      K = L.fragmentShader;
      u.update(L);
      G = u.getVertexShaderID(L);
      U = u.getFragmentShaderID(L);
    }
    const N = o.getRenderTarget();
    const he = ce.isInstancedMesh === true;
    const ve = !!L.map;
    const de = !!L.matcap;
    const xe = !!Z;
    const ee = !!L.aoMap;
    const Ue = !!L.lightMap;
    const fe = !!L.bumpMap;
    const Se = !!L.normalMap;
    const Me = !!L.displacementMap;
    const Be = !!L.emissiveMap;
    const se = !!L.metalnessMap;
    const $ = !!L.roughnessMap;
    const Oe = L.anisotropy > 0;
    const Ye = L.clearcoat > 0;
    const st = L.iridescence > 0;
    const W = L.sheen > 0;
    const O = L.transmission > 0;
    const me = Oe && !!L.anisotropyMap;
    const Ie = Ye && !!L.clearcoatMap;
    const Le = Ye && !!L.clearcoatNormalMap;
    const Y = Ye && !!L.clearcoatRoughnessMap;
    const we = st && !!L.iridescenceMap;
    const Ee = st && !!L.iridescenceThicknessMap;
    const Fe = W && !!L.sheenColorMap;
    const Xe = W && !!L.sheenRoughnessMap;
    const tt = !!L.specularMap;
    const Re = !!L.specularColorMap;
    const ot = !!L.specularIntensityMap;
    const je = O && !!L.transmissionMap;
    const We = O && !!L.thicknessMap;
    const Ge = !!L.gradientMap;
    const qe = !!L.alphaMap;
    const Pe = L.alphaTest > 0;
    const ae = !!L.alphaHash;
    const ke = !!L.extensions;
    const Ne = !!j.attributes.uv1;
    const be = !!j.attributes.uv2;
    const ze = !!j.attributes.uv3;
    let Je = NoToneMapping;
    if (L.toneMapped && (N === null || N.isXRRenderTarget === true)) {
      Je = o.toneMapping;
    }
    return {
      isWebGL2: p,
      shaderID: ue,
      shaderType: L.type,
      shaderName: L.name,
      vertexShader: Te,
      fragmentShader: K,
      defines: L.defines,
      customVertexShaderID: G,
      customFragmentShaderID: U,
      isRawShaderMaterial: L.isRawShaderMaterial === true,
      glslVersion: L.glslVersion,
      precision: _,
      instancing: he,
      instancingColor: he && ce.instanceColor !== null,
      supportsVertexTextures: v,
      outputColorSpace: N === null ? o.outputColorSpace : N.isXRRenderTarget === true ? N.texture.colorSpace : LinearSRGBColorSpace,
      map: ve,
      matcap: de,
      envMap: xe,
      envMapMode: xe && Z.mapping,
      envMapCubeUVHeight: q,
      aoMap: ee,
      lightMap: Ue,
      bumpMap: fe,
      normalMap: Se,
      displacementMap: v && Me,
      emissiveMap: Be,
      normalMapObjectSpace: Se && L.normalMapType === ObjectSpaceNormalMap,
      normalMapTangentSpace: Se && L.normalMapType === TangentSpaceNormalMap,
      metalnessMap: se,
      roughnessMap: $,
      anisotropy: Oe,
      anisotropyMap: me,
      clearcoat: Ye,
      clearcoatMap: Ie,
      clearcoatNormalMap: Le,
      clearcoatRoughnessMap: Y,
      iridescence: st,
      iridescenceMap: we,
      iridescenceThicknessMap: Ee,
      sheen: W,
      sheenColorMap: Fe,
      sheenRoughnessMap: Xe,
      specularMap: tt,
      specularColorMap: Re,
      specularIntensityMap: ot,
      transmission: O,
      transmissionMap: je,
      thicknessMap: We,
      gradientMap: Ge,
      opaque: L.transparent === false && L.blending === NormalBlending,
      alphaMap: qe,
      alphaTest: Pe,
      alphaHash: ae,
      combine: L.combine,
      mapUv: ve && M(L.map.channel),
      aoMapUv: ee && M(L.aoMap.channel),
      lightMapUv: Ue && M(L.lightMap.channel),
      bumpMapUv: fe && M(L.bumpMap.channel),
      normalMapUv: Se && M(L.normalMap.channel),
      displacementMapUv: Me && M(L.displacementMap.channel),
      emissiveMapUv: Be && M(L.emissiveMap.channel),
      metalnessMapUv: se && M(L.metalnessMap.channel),
      roughnessMapUv: $ && M(L.roughnessMap.channel),
      anisotropyMapUv: me && M(L.anisotropyMap.channel),
      clearcoatMapUv: Ie && M(L.clearcoatMap.channel),
      clearcoatNormalMapUv: Le && M(L.clearcoatNormalMap.channel),
      clearcoatRoughnessMapUv: Y && M(L.clearcoatRoughnessMap.channel),
      iridescenceMapUv: we && M(L.iridescenceMap.channel),
      iridescenceThicknessMapUv: Ee && M(L.iridescenceThicknessMap.channel),
      sheenColorMapUv: Fe && M(L.sheenColorMap.channel),
      sheenRoughnessMapUv: Xe && M(L.sheenRoughnessMap.channel),
      specularMapUv: tt && M(L.specularMap.channel),
      specularColorMapUv: Re && M(L.specularColorMap.channel),
      specularIntensityMapUv: ot && M(L.specularIntensityMap.channel),
      transmissionMapUv: je && M(L.transmissionMap.channel),
      thicknessMapUv: We && M(L.thicknessMap.channel),
      alphaMapUv: qe && M(L.alphaMap.channel),
      vertexTangents: !!j.attributes.tangent && (Se || Oe),
      vertexColors: L.vertexColors,
      vertexAlphas: L.vertexColors === true && !!j.attributes.color && j.attributes.color.itemSize === 4,
      vertexUv1s: Ne,
      vertexUv2s: be,
      vertexUv3s: ze,
      pointsUvs: ce.isPoints === true && !!j.attributes.uv && (ve || qe),
      fog: !!z,
      useFog: L.fog === true,
      fogExp2: z && z.isFogExp2,
      flatShading: L.flatShading === true,
      sizeAttenuation: L.sizeAttenuation === true,
      logarithmicDepthBuffer: g,
      skinning: ce.isSkinnedMesh === true,
      morphTargets: j.morphAttributes.position !== undefined,
      morphNormals: j.morphAttributes.normal !== undefined,
      morphColors: j.morphAttributes.color !== undefined,
      morphTargetsCount: te,
      morphTextureStride: le,
      numDirLights: D.directional.length,
      numPointLights: D.point.length,
      numSpotLights: D.spot.length,
      numSpotLightMaps: D.spotLightMap.length,
      numRectAreaLights: D.rectArea.length,
      numHemiLights: D.hemi.length,
      numDirLightShadows: D.directionalShadowMap.length,
      numPointLightShadows: D.pointShadowMap.length,
      numSpotLightShadows: D.spotShadowMap.length,
      numSpotLightShadowsWithMaps: D.numSpotLightShadowsWithMaps,
      numLightProbes: D.numLightProbes,
      numClippingPlanes: l.numPlanes,
      numClipIntersection: l.numIntersection,
      dithering: L.dithering,
      shadowMapEnabled: o.shadowMap.enabled && ne.length > 0,
      shadowMapType: o.shadowMap.type,
      toneMapping: Je,
      useLegacyLights: o._useLegacyLights,
      decodeVideoTexture: ve && L.map.isVideoTexture === true && ColorManagement.getTransfer(L.map.colorSpace) === SRGBTransfer,
      premultipliedAlpha: L.premultipliedAlpha,
      doubleSided: L.side === DoubleSide,
      flipSided: L.side === BackSide,
      useDepthPacking: L.depthPacking >= 0,
      depthPacking: L.depthPacking || 0,
      index0AttributeName: L.index0AttributeName,
      extensionDerivatives: ke && L.extensions.derivatives === true,
      extensionFragDepth: ke && L.extensions.fragDepth === true,
      extensionDrawBuffers: ke && L.extensions.drawBuffers === true,
      extensionShaderTextureLOD: ke && L.extensions.shaderTextureLOD === true,
      rendererExtensionFragDepth: p || r.has("EXT_frag_depth"),
      rendererExtensionDrawBuffers: p || r.has("WEBGL_draw_buffers"),
      rendererExtensionShaderTextureLod: p || r.has("EXT_shader_texture_lod"),
      rendererExtensionParallelShaderCompile: r.has("KHR_parallel_shader_compile"),
      customProgramCacheKey: L.customProgramCacheKey()
    };
  }
  function b(L) {
    const D = [];
    if (L.shaderID) {
      D.push(L.shaderID);
    } else {
      D.push(L.customVertexShaderID);
      D.push(L.customFragmentShaderID);
    }
    if (L.defines !== undefined) {
      for (const ne in L.defines) {
        D.push(ne);
        D.push(L.defines[ne]);
      }
    }
    if (L.isRawShaderMaterial === false) {
      C(D, L);
      w(D, L);
      D.push(o.outputColorSpace);
    }
    D.push(L.customProgramCacheKey);
    return D.join();
  }
  function C(L, D) {
    L.push(D.precision);
    L.push(D.outputColorSpace);
    L.push(D.envMapMode);
    L.push(D.envMapCubeUVHeight);
    L.push(D.mapUv);
    L.push(D.alphaMapUv);
    L.push(D.lightMapUv);
    L.push(D.aoMapUv);
    L.push(D.bumpMapUv);
    L.push(D.normalMapUv);
    L.push(D.displacementMapUv);
    L.push(D.emissiveMapUv);
    L.push(D.metalnessMapUv);
    L.push(D.roughnessMapUv);
    L.push(D.anisotropyMapUv);
    L.push(D.clearcoatMapUv);
    L.push(D.clearcoatNormalMapUv);
    L.push(D.clearcoatRoughnessMapUv);
    L.push(D.iridescenceMapUv);
    L.push(D.iridescenceThicknessMapUv);
    L.push(D.sheenColorMapUv);
    L.push(D.sheenRoughnessMapUv);
    L.push(D.specularMapUv);
    L.push(D.specularColorMapUv);
    L.push(D.specularIntensityMapUv);
    L.push(D.transmissionMapUv);
    L.push(D.thicknessMapUv);
    L.push(D.combine);
    L.push(D.fogExp2);
    L.push(D.sizeAttenuation);
    L.push(D.morphTargetsCount);
    L.push(D.morphAttributeCount);
    L.push(D.numDirLights);
    L.push(D.numPointLights);
    L.push(D.numSpotLights);
    L.push(D.numSpotLightMaps);
    L.push(D.numHemiLights);
    L.push(D.numRectAreaLights);
    L.push(D.numDirLightShadows);
    L.push(D.numPointLightShadows);
    L.push(D.numSpotLightShadows);
    L.push(D.numSpotLightShadowsWithMaps);
    L.push(D.numLightProbes);
    L.push(D.shadowMapType);
    L.push(D.toneMapping);
    L.push(D.numClippingPlanes);
    L.push(D.numClipIntersection);
    L.push(D.depthPacking);
  }
  function w(L, D) {
    c.disableAll();
    if (D.isWebGL2) {
      c.enable(0);
    }
    if (D.supportsVertexTextures) {
      c.enable(1);
    }
    if (D.instancing) {
      c.enable(2);
    }
    if (D.instancingColor) {
      c.enable(3);
    }
    if (D.matcap) {
      c.enable(4);
    }
    if (D.envMap) {
      c.enable(5);
    }
    if (D.normalMapObjectSpace) {
      c.enable(6);
    }
    if (D.normalMapTangentSpace) {
      c.enable(7);
    }
    if (D.clearcoat) {
      c.enable(8);
    }
    if (D.iridescence) {
      c.enable(9);
    }
    if (D.alphaTest) {
      c.enable(10);
    }
    if (D.vertexColors) {
      c.enable(11);
    }
    if (D.vertexAlphas) {
      c.enable(12);
    }
    if (D.vertexUv1s) {
      c.enable(13);
    }
    if (D.vertexUv2s) {
      c.enable(14);
    }
    if (D.vertexUv3s) {
      c.enable(15);
    }
    if (D.vertexTangents) {
      c.enable(16);
    }
    if (D.anisotropy) {
      c.enable(17);
    }
    if (D.alphaHash) {
      c.enable(18);
    }
    L.push(c.mask);
    c.disableAll();
    if (D.fog) {
      c.enable(0);
    }
    if (D.useFog) {
      c.enable(1);
    }
    if (D.flatShading) {
      c.enable(2);
    }
    if (D.logarithmicDepthBuffer) {
      c.enable(3);
    }
    if (D.skinning) {
      c.enable(4);
    }
    if (D.morphTargets) {
      c.enable(5);
    }
    if (D.morphNormals) {
      c.enable(6);
    }
    if (D.morphColors) {
      c.enable(7);
    }
    if (D.premultipliedAlpha) {
      c.enable(8);
    }
    if (D.shadowMapEnabled) {
      c.enable(9);
    }
    if (D.useLegacyLights) {
      c.enable(10);
    }
    if (D.doubleSided) {
      c.enable(11);
    }
    if (D.flipSided) {
      c.enable(12);
    }
    if (D.useDepthPacking) {
      c.enable(13);
    }
    if (D.dithering) {
      c.enable(14);
    }
    if (D.transmission) {
      c.enable(15);
    }
    if (D.sheen) {
      c.enable(16);
    }
    if (D.opaque) {
      c.enable(17);
    }
    if (D.pointsUvs) {
      c.enable(18);
    }
    if (D.decodeVideoTexture) {
      c.enable(19);
    }
    L.push(c.mask);
  }
  function R(L) {
    const D = T[L.type];
    let ne;
    if (D) {
      const re = ShaderLib[D];
      ne = UniformsUtils.clone(re.uniforms);
    } else {
      ne = L.uniforms;
    }
    return ne;
  }
  function E(L, D) {
    let ne;
    for (let re = 0, ce = f.length; re < ce; re++) {
      const z = f[re];
      if (z.cacheKey === D) {
        ne = z;
        ++ne.usedTimes;
        break;
      }
    }
    if (ne === undefined) {
      ne = new WebGLProgram(o, D, L, a);
      f.push(ne);
    }
    return ne;
  }
  function I(L) {
    if (--L.usedTimes === 0) {
      const D = f.indexOf(L);
      f[D] = f[f.length - 1];
      f.pop();
      L.destroy();
    }
  }
  function F(L) {
    u.remove(L);
  }
  function k() {
    u.dispose();
  }
  return {
    getParameters: S,
    getProgramCacheKey: b,
    getUniforms: R,
    acquireProgram: E,
    releaseProgram: I,
    releaseShaderCache: F,
    programs: f,
    dispose: k
  };
}
function WebGLProperties() {
  let o = new WeakMap();
  function e(a) {
    let l = o.get(a);
    if (l === undefined) {
      l = {};
      o.set(a, l);
    }
    return l;
  }
  function t(a) {
    o.delete(a);
  }
  function r(a, l, c) {
    o.get(a)[l] = c;
  }
  function n() {
    o = new WeakMap();
  }
  return {
    get: e,
    remove: t,
    update: r,
    dispose: n
  };
}
function painterSortStable(o, e) {
  if (o.groupOrder !== e.groupOrder) {
    return o.groupOrder - e.groupOrder;
  } else if (o.renderOrder !== e.renderOrder) {
    return o.renderOrder - e.renderOrder;
  } else if (o.material.id !== e.material.id) {
    return o.material.id - e.material.id;
  } else if (o.z !== e.z) {
    return o.z - e.z;
  } else {
    return o.id - e.id;
  }
}
function reversePainterSortStable(o, e) {
  if (o.groupOrder !== e.groupOrder) {
    return o.groupOrder - e.groupOrder;
  } else if (o.renderOrder !== e.renderOrder) {
    return o.renderOrder - e.renderOrder;
  } else if (o.z !== e.z) {
    return e.z - o.z;
  } else {
    return o.id - e.id;
  }
}
function WebGLRenderList() {
  const o = [];
  let e = 0;
  const t = [];
  const r = [];
  const n = [];
  function a() {
    e = 0;
    t.length = 0;
    r.length = 0;
    n.length = 0;
  }
  function l(g, v, _, T, M, S) {
    let b = o[e];
    if (b === undefined) {
      b = {
        id: g.id,
        object: g,
        geometry: v,
        material: _,
        groupOrder: T,
        renderOrder: g.renderOrder,
        z: M,
        group: S
      };
      o[e] = b;
    } else {
      b.id = g.id;
      b.object = g;
      b.geometry = v;
      b.material = _;
      b.groupOrder = T;
      b.renderOrder = g.renderOrder;
      b.z = M;
      b.group = S;
    }
    e++;
    return b;
  }
  function c(g, v, _, T, M, S) {
    const b = l(g, v, _, T, M, S);
    if (_.transmission > 0) {
      r.push(b);
    } else if (_.transparent === true) {
      n.push(b);
    } else {
      t.push(b);
    }
  }
  function u(g, v, _, T, M, S) {
    const b = l(g, v, _, T, M, S);
    if (_.transmission > 0) {
      r.unshift(b);
    } else if (_.transparent === true) {
      n.unshift(b);
    } else {
      t.unshift(b);
    }
  }
  function f(g, v) {
    if (t.length > 1) {
      t.sort(g || painterSortStable);
    }
    if (r.length > 1) {
      r.sort(v || reversePainterSortStable);
    }
    if (n.length > 1) {
      n.sort(v || reversePainterSortStable);
    }
  }
  function p() {
    for (let g = e, v = o.length; g < v; g++) {
      const _ = o[g];
      if (_.id === null) {
        break;
      }
      _.id = null;
      _.object = null;
      _.geometry = null;
      _.material = null;
      _.group = null;
    }
  }
  return {
    opaque: t,
    transmissive: r,
    transparent: n,
    init: a,
    push: c,
    unshift: u,
    finish: p,
    sort: f
  };
}
function WebGLRenderLists() {
  let o = new WeakMap();
  function e(r, n) {
    const a = o.get(r);
    let l;
    if (a === undefined) {
      l = new WebGLRenderList();
      o.set(r, [l]);
    } else if (n >= a.length) {
      l = new WebGLRenderList();
      a.push(l);
    } else {
      l = a[n];
    }
    return l;
  }
  function t() {
    o = new WeakMap();
  }
  return {
    get: e,
    dispose: t
  };
}
function UniformsCache() {
  const o = {};
  return {
    get: function (e) {
      if (o[e.id] !== undefined) {
        return o[e.id];
      }
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            direction: new Vector3(),
            color: new Color()
          };
          break;
        case "SpotLight":
          t = {
            position: new Vector3(),
            direction: new Vector3(),
            color: new Color(),
            distance: 0,
            coneCos: 0,
            penumbraCos: 0,
            decay: 0
          };
          break;
        case "PointLight":
          t = {
            position: new Vector3(),
            color: new Color(),
            distance: 0,
            decay: 0
          };
          break;
        case "HemisphereLight":
          t = {
            direction: new Vector3(),
            skyColor: new Color(),
            groundColor: new Color()
          };
          break;
        case "RectAreaLight":
          t = {
            color: new Color(),
            position: new Vector3(),
            halfWidth: new Vector3(),
            halfHeight: new Vector3()
          };
          break;
      }
      o[e.id] = t;
      return t;
    }
  };
}
function ShadowUniformsCache() {
  const o = {};
  return {
    get: function (e) {
      if (o[e.id] !== undefined) {
        return o[e.id];
      }
      let t;
      switch (e.type) {
        case "DirectionalLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vector2()
          };
          break;
        case "SpotLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vector2()
          };
          break;
        case "PointLight":
          t = {
            shadowBias: 0,
            shadowNormalBias: 0,
            shadowRadius: 1,
            shadowMapSize: new Vector2(),
            shadowCameraNear: 1,
            shadowCameraFar: 1000
          };
          break;
      }
      o[e.id] = t;
      return t;
    }
  };
}
let nextVersion = 0;
function shadowCastingAndTexturingLightsFirst(o, e) {
  return (e.castShadow ? 2 : 0) - (o.castShadow ? 2 : 0) + (e.map ? 1 : 0) - (o.map ? 1 : 0);
}
function WebGLLights(o, e) {
  const t = new UniformsCache();
  const r = ShadowUniformsCache();
  const n = {
    version: 0,
    hash: {
      directionalLength: -1,
      pointLength: -1,
      spotLength: -1,
      rectAreaLength: -1,
      hemiLength: -1,
      numDirectionalShadows: -1,
      numPointShadows: -1,
      numSpotShadows: -1,
      numSpotMaps: -1,
      numLightProbes: -1
    },
    ambient: [0, 0, 0],
    probe: [],
    directional: [],
    directionalShadow: [],
    directionalShadowMap: [],
    directionalShadowMatrix: [],
    spot: [],
    spotLightMap: [],
    spotShadow: [],
    spotShadowMap: [],
    spotLightMatrix: [],
    rectArea: [],
    rectAreaLTC1: null,
    rectAreaLTC2: null,
    point: [],
    pointShadow: [],
    pointShadowMap: [],
    pointShadowMatrix: [],
    hemi: [],
    numSpotLightShadowsWithMaps: 0,
    numLightProbes: 0
  };
  for (let p = 0; p < 9; p++) {
    n.probe.push(new Vector3());
  }
  const a = new Vector3();
  const l = new Matrix4();
  const c = new Matrix4();
  function u(p, g) {
    let v = 0;
    let _ = 0;
    let T = 0;
    for (let re = 0; re < 9; re++) {
      n.probe[re].set(0, 0, 0);
    }
    let M = 0;
    let S = 0;
    let b = 0;
    let C = 0;
    let w = 0;
    let R = 0;
    let E = 0;
    let I = 0;
    let F = 0;
    let k = 0;
    let L = 0;
    p.sort(shadowCastingAndTexturingLightsFirst);
    const D = g === true ? Math.PI : 1;
    for (let re = 0, ce = p.length; re < ce; re++) {
      const z = p[re];
      const j = z.color;
      const X = z.intensity;
      const Z = z.distance;
      const q = z.shadow && z.shadow.map ? z.shadow.map.texture : null;
      if (z.isAmbientLight) {
        v += j.r * X * D;
        _ += j.g * X * D;
        T += j.b * X * D;
      } else if (z.isLightProbe) {
        for (let ue = 0; ue < 9; ue++) {
          n.probe[ue].addScaledVector(z.sh.coefficients[ue], X);
        }
        L++;
      } else if (z.isDirectionalLight) {
        const ue = t.get(z);
        ue.color.copy(z.color).multiplyScalar(z.intensity * D);
        if (z.castShadow) {
          const oe = z.shadow;
          const te = r.get(z);
          te.shadowBias = oe.bias;
          te.shadowNormalBias = oe.normalBias;
          te.shadowRadius = oe.radius;
          te.shadowMapSize = oe.mapSize;
          n.directionalShadow[M] = te;
          n.directionalShadowMap[M] = q;
          n.directionalShadowMatrix[M] = z.shadow.matrix;
          R++;
        }
        n.directional[M] = ue;
        M++;
      } else if (z.isSpotLight) {
        const ue = t.get(z);
        ue.position.setFromMatrixPosition(z.matrixWorld);
        ue.color.copy(j).multiplyScalar(X * D);
        ue.distance = Z;
        ue.coneCos = Math.cos(z.angle);
        ue.penumbraCos = Math.cos(z.angle * (1 - z.penumbra));
        ue.decay = z.decay;
        n.spot[b] = ue;
        const oe = z.shadow;
        if (z.map) {
          n.spotLightMap[F] = z.map;
          F++;
          oe.updateMatrices(z);
          if (z.castShadow) {
            k++;
          }
        }
        n.spotLightMatrix[b] = oe.matrix;
        if (z.castShadow) {
          const te = r.get(z);
          te.shadowBias = oe.bias;
          te.shadowNormalBias = oe.normalBias;
          te.shadowRadius = oe.radius;
          te.shadowMapSize = oe.mapSize;
          n.spotShadow[b] = te;
          n.spotShadowMap[b] = q;
          I++;
        }
        b++;
      } else if (z.isRectAreaLight) {
        const ue = t.get(z);
        ue.color.copy(j).multiplyScalar(X);
        ue.halfWidth.set(z.width * 0.5, 0, 0);
        ue.halfHeight.set(0, z.height * 0.5, 0);
        n.rectArea[C] = ue;
        C++;
      } else if (z.isPointLight) {
        const ue = t.get(z);
        ue.color.copy(z.color).multiplyScalar(z.intensity * D);
        ue.distance = z.distance;
        ue.decay = z.decay;
        if (z.castShadow) {
          const oe = z.shadow;
          const te = r.get(z);
          te.shadowBias = oe.bias;
          te.shadowNormalBias = oe.normalBias;
          te.shadowRadius = oe.radius;
          te.shadowMapSize = oe.mapSize;
          te.shadowCameraNear = oe.camera.near;
          te.shadowCameraFar = oe.camera.far;
          n.pointShadow[S] = te;
          n.pointShadowMap[S] = q;
          n.pointShadowMatrix[S] = z.shadow.matrix;
          E++;
        }
        n.point[S] = ue;
        S++;
      } else if (z.isHemisphereLight) {
        const ue = t.get(z);
        ue.skyColor.copy(z.color).multiplyScalar(X * D);
        ue.groundColor.copy(z.groundColor).multiplyScalar(X * D);
        n.hemi[w] = ue;
        w++;
      }
    }
    if (C > 0) {
      if (e.isWebGL2 || o.has("OES_texture_float_linear") === true) {
        n.rectAreaLTC1 = UniformsLib.LTC_FLOAT_1;
        n.rectAreaLTC2 = UniformsLib.LTC_FLOAT_2;
      } else if (o.has("OES_texture_half_float_linear") === true) {
        n.rectAreaLTC1 = UniformsLib.LTC_HALF_1;
        n.rectAreaLTC2 = UniformsLib.LTC_HALF_2;
      } else {
        console.error("THREE.WebGLRenderer: Unable to use RectAreaLight. Missing WebGL extensions.");
      }
    }
    n.ambient[0] = v;
    n.ambient[1] = _;
    n.ambient[2] = T;
    const ne = n.hash;
    if (ne.directionalLength !== M || ne.pointLength !== S || ne.spotLength !== b || ne.rectAreaLength !== C || ne.hemiLength !== w || ne.numDirectionalShadows !== R || ne.numPointShadows !== E || ne.numSpotShadows !== I || ne.numSpotMaps !== F || ne.numLightProbes !== L) {
      n.directional.length = M;
      n.spot.length = b;
      n.rectArea.length = C;
      n.point.length = S;
      n.hemi.length = w;
      n.directionalShadow.length = R;
      n.directionalShadowMap.length = R;
      n.pointShadow.length = E;
      n.pointShadowMap.length = E;
      n.spotShadow.length = I;
      n.spotShadowMap.length = I;
      n.directionalShadowMatrix.length = R;
      n.pointShadowMatrix.length = E;
      n.spotLightMatrix.length = I + F - k;
      n.spotLightMap.length = F;
      n.numSpotLightShadowsWithMaps = k;
      n.numLightProbes = L;
      ne.directionalLength = M;
      ne.pointLength = S;
      ne.spotLength = b;
      ne.rectAreaLength = C;
      ne.hemiLength = w;
      ne.numDirectionalShadows = R;
      ne.numPointShadows = E;
      ne.numSpotShadows = I;
      ne.numSpotMaps = F;
      ne.numLightProbes = L;
      n.version = nextVersion++;
    }
  }
  function f(p, g) {
    let v = 0;
    let _ = 0;
    let T = 0;
    let M = 0;
    let S = 0;
    const b = g.matrixWorldInverse;
    for (let C = 0, w = p.length; C < w; C++) {
      const R = p[C];
      if (R.isDirectionalLight) {
        const E = n.directional[v];
        E.direction.setFromMatrixPosition(R.matrixWorld);
        a.setFromMatrixPosition(R.target.matrixWorld);
        E.direction.sub(a);
        E.direction.transformDirection(b);
        v++;
      } else if (R.isSpotLight) {
        const E = n.spot[T];
        E.position.setFromMatrixPosition(R.matrixWorld);
        E.position.applyMatrix4(b);
        E.direction.setFromMatrixPosition(R.matrixWorld);
        a.setFromMatrixPosition(R.target.matrixWorld);
        E.direction.sub(a);
        E.direction.transformDirection(b);
        T++;
      } else if (R.isRectAreaLight) {
        const E = n.rectArea[M];
        E.position.setFromMatrixPosition(R.matrixWorld);
        E.position.applyMatrix4(b);
        c.identity();
        l.copy(R.matrixWorld);
        l.premultiply(b);
        c.extractRotation(l);
        E.halfWidth.set(R.width * 0.5, 0, 0);
        E.halfHeight.set(0, R.height * 0.5, 0);
        E.halfWidth.applyMatrix4(c);
        E.halfHeight.applyMatrix4(c);
        M++;
      } else if (R.isPointLight) {
        const E = n.point[_];
        E.position.setFromMatrixPosition(R.matrixWorld);
        E.position.applyMatrix4(b);
        _++;
      } else if (R.isHemisphereLight) {
        const E = n.hemi[S];
        E.direction.setFromMatrixPosition(R.matrixWorld);
        E.direction.transformDirection(b);
        S++;
      }
    }
  }
  return {
    setup: u,
    setupView: f,
    state: n
  };
}
function WebGLRenderState(o, e) {
  const t = new WebGLLights(o, e);
  const r = [];
  const n = [];
  function a() {
    r.length = 0;
    n.length = 0;
  }
  function l(g) {
    r.push(g);
  }
  function c(g) {
    n.push(g);
  }
  function u(g) {
    t.setup(r, g);
  }
  function f(g) {
    t.setupView(r, g);
  }
  return {
    init: a,
    state: {
      lightsArray: r,
      shadowsArray: n,
      lights: t
    },
    setupLights: u,
    setupLightsView: f,
    pushLight: l,
    pushShadow: c
  };
}
function WebGLRenderStates(o, e) {
  let t = new WeakMap();
  function r(a, l = 0) {
    const c = t.get(a);
    let u;
    if (c === undefined) {
      u = new WebGLRenderState(o, e);
      t.set(a, [u]);
    } else if (l >= c.length) {
      u = new WebGLRenderState(o, e);
      c.push(u);
    } else {
      u = c[l];
    }
    return u;
  }
  function n() {
    t = new WeakMap();
  }
  return {
    get: r,
    dispose: n
  };
}
class MeshDepthMaterial extends Material {
  constructor(e) {
    super();
    this.isMeshDepthMaterial = true;
    this.type = "MeshDepthMaterial";
    this.depthPacking = BasicDepthPacking;
    this.map = null;
    this.alphaMap = null;
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.setValues(e);
  }
  copy(e) {
    super.copy(e);
    this.depthPacking = e.depthPacking;
    this.map = e.map;
    this.alphaMap = e.alphaMap;
    this.displacementMap = e.displacementMap;
    this.displacementScale = e.displacementScale;
    this.displacementBias = e.displacementBias;
    this.wireframe = e.wireframe;
    this.wireframeLinewidth = e.wireframeLinewidth;
    return this;
  }
}
class MeshDistanceMaterial extends Material {
  constructor(e) {
    super();
    this.isMeshDistanceMaterial = true;
    this.type = "MeshDistanceMaterial";
    this.map = null;
    this.alphaMap = null;
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.setValues(e);
  }
  copy(e) {
    super.copy(e);
    this.map = e.map;
    this.alphaMap = e.alphaMap;
    this.displacementMap = e.displacementMap;
    this.displacementScale = e.displacementScale;
    this.displacementBias = e.displacementBias;
    return this;
  }
}
const vertex = `void main() {
	gl_Position = vec4( position, 1.0 );
}`;
const fragment = `uniform sampler2D shadow_pass;
uniform vec2 resolution;
uniform float radius;
#include <packing>
void main() {
	const float samples = float( VSM_SAMPLES );
	float mean = 0.0;
	float squared_mean = 0.0;
	float uvStride = samples <= 1.0 ? 0.0 : 2.0 / ( samples - 1.0 );
	float uvStart = samples <= 1.0 ? 0.0 : - 1.0;
	for ( float i = 0.0; i < samples; i ++ ) {
		float uvOffset = uvStart + i * uvStride;
		#ifdef HORIZONTAL_PASS
			vec2 distribution = unpackRGBATo2Half( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( uvOffset, 0.0 ) * radius ) / resolution ) );
			mean += distribution.x;
			squared_mean += distribution.y * distribution.y + distribution.x * distribution.x;
		#else
			float depth = unpackRGBAToDepth( texture2D( shadow_pass, ( gl_FragCoord.xy + vec2( 0.0, uvOffset ) * radius ) / resolution ) );
			mean += depth;
			squared_mean += depth * depth;
		#endif
	}
	mean = mean / samples;
	squared_mean = squared_mean / samples;
	float std_dev = sqrt( squared_mean - mean * mean );
	gl_FragColor = pack2HalfToRGBA( vec2( mean, std_dev ) );
}`;
function WebGLShadowMap(o, e, t) {
  let r = new Frustum();
  const n = new Vector2();
  const a = new Vector2();
  const l = new Vector4();
  const c = new MeshDepthMaterial({
    depthPacking: RGBADepthPacking
  });
  const u = new MeshDistanceMaterial();
  const f = {};
  const p = t.maxTextureSize;
  const g = {
    [FrontSide]: BackSide,
    [BackSide]: FrontSide,
    [DoubleSide]: DoubleSide
  };
  const v = new ShaderMaterial({
    defines: {
      VSM_SAMPLES: 8
    },
    uniforms: {
      shadow_pass: {
        value: null
      },
      resolution: {
        value: new Vector2()
      },
      radius: {
        value: 4
      }
    },
    vertexShader: vertex,
    fragmentShader: fragment
  });
  const _ = v.clone();
  _.defines.HORIZONTAL_PASS = 1;
  const T = new BufferGeometry();
  T.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0.5, 3, -1, 0.5, -1, 3, 0.5]), 3));
  const M = new Mesh(T, v);
  const S = this;
  this.enabled = false;
  this.autoUpdate = true;
  this.needsUpdate = false;
  this.type = PCFShadowMap;
  let b = this.type;
  this.render = function (E, I, F) {
    if (S.enabled === false || S.autoUpdate === false && S.needsUpdate === false || E.length === 0) {
      return;
    }
    const k = o.getRenderTarget();
    const L = o.getActiveCubeFace();
    const D = o.getActiveMipmapLevel();
    const ne = o.state;
    ne.setBlending(NoBlending);
    ne.buffers.color.setClear(1, 1, 1, 1);
    ne.buffers.depth.setTest(true);
    ne.setScissorTest(false);
    const re = b !== VSMShadowMap && this.type === VSMShadowMap;
    const ce = b === VSMShadowMap && this.type !== VSMShadowMap;
    for (let z = 0, j = E.length; z < j; z++) {
      const X = E[z];
      const Z = X.shadow;
      if (Z === undefined) {
        console.warn("THREE.WebGLShadowMap:", X, "has no shadow.");
        continue;
      }
      if (Z.autoUpdate === false && Z.needsUpdate === false) {
        continue;
      }
      n.copy(Z.mapSize);
      const q = Z.getFrameExtents();
      n.multiply(q);
      a.copy(Z.mapSize);
      if (n.x > p || n.y > p) {
        if (n.x > p) {
          a.x = Math.floor(p / q.x);
          n.x = a.x * q.x;
          Z.mapSize.x = a.x;
        }
        if (n.y > p) {
          a.y = Math.floor(p / q.y);
          n.y = a.y * q.y;
          Z.mapSize.y = a.y;
        }
      }
      if (Z.map === null || re === true || ce === true) {
        const oe = this.type !== VSMShadowMap ? {
          minFilter: NearestFilter,
          magFilter: NearestFilter
        } : {};
        if (Z.map !== null) {
          Z.map.dispose();
        }
        Z.map = new WebGLRenderTarget(n.x, n.y, oe);
        Z.map.texture.name = X.name + ".shadowMap";
        Z.camera.updateProjectionMatrix();
      }
      o.setRenderTarget(Z.map);
      o.clear();
      const ue = Z.getViewportCount();
      for (let oe = 0; oe < ue; oe++) {
        const te = Z.getViewport(oe);
        l.set(a.x * te.x, a.y * te.y, a.x * te.z, a.y * te.w);
        ne.viewport(l);
        Z.updateMatrices(X, oe);
        r = Z.getFrustum();
        R(I, F, Z.camera, X, this.type);
      }
      if (Z.isPointLightShadow !== true && this.type === VSMShadowMap) {
        C(Z, F);
      }
      Z.needsUpdate = false;
    }
    b = this.type;
    S.needsUpdate = false;
    o.setRenderTarget(k, L, D);
  };
  function C(E, I) {
    const F = e.update(M);
    if (v.defines.VSM_SAMPLES !== E.blurSamples) {
      v.defines.VSM_SAMPLES = E.blurSamples;
      _.defines.VSM_SAMPLES = E.blurSamples;
      v.needsUpdate = true;
      _.needsUpdate = true;
    }
    if (E.mapPass === null) {
      E.mapPass = new WebGLRenderTarget(n.x, n.y);
    }
    v.uniforms.shadow_pass.value = E.map.texture;
    v.uniforms.resolution.value = E.mapSize;
    v.uniforms.radius.value = E.radius;
    o.setRenderTarget(E.mapPass);
    o.clear();
    o.renderBufferDirect(I, null, F, v, M, null);
    _.uniforms.shadow_pass.value = E.mapPass.texture;
    _.uniforms.resolution.value = E.mapSize;
    _.uniforms.radius.value = E.radius;
    o.setRenderTarget(E.map);
    o.clear();
    o.renderBufferDirect(I, null, F, _, M, null);
  }
  function w(E, I, F, k) {
    let L = null;
    const D = F.isPointLight === true ? E.customDistanceMaterial : E.customDepthMaterial;
    if (D !== undefined) {
      L = D;
    } else {
      L = F.isPointLight === true ? u : c;
      if (o.localClippingEnabled && I.clipShadows === true && Array.isArray(I.clippingPlanes) && I.clippingPlanes.length !== 0 || I.displacementMap && I.displacementScale !== 0 || I.alphaMap && I.alphaTest > 0 || I.map && I.alphaTest > 0) {
        const ne = L.uuid;
        const re = I.uuid;
        let ce = f[ne];
        if (ce === undefined) {
          ce = {};
          f[ne] = ce;
        }
        let z = ce[re];
        if (z === undefined) {
          z = L.clone();
          ce[re] = z;
        }
        L = z;
      }
    }
    L.visible = I.visible;
    L.wireframe = I.wireframe;
    if (k === VSMShadowMap) {
      L.side = I.shadowSide !== null ? I.shadowSide : I.side;
    } else {
      L.side = I.shadowSide !== null ? I.shadowSide : g[I.side];
    }
    L.alphaMap = I.alphaMap;
    L.alphaTest = I.alphaTest;
    L.map = I.map;
    L.clipShadows = I.clipShadows;
    L.clippingPlanes = I.clippingPlanes;
    L.clipIntersection = I.clipIntersection;
    L.displacementMap = I.displacementMap;
    L.displacementScale = I.displacementScale;
    L.displacementBias = I.displacementBias;
    L.wireframeLinewidth = I.wireframeLinewidth;
    L.linewidth = I.linewidth;
    if (F.isPointLight === true && L.isMeshDistanceMaterial === true) {
      const ne = o.properties.get(L);
      ne.light = F;
    }
    return L;
  }
  function R(E, I, F, k, L) {
    if (E.visible === false) {
      return;
    }
    if (E.layers.test(I.layers) && (E.isMesh || E.isLine || E.isPoints) && (E.castShadow || E.receiveShadow && L === VSMShadowMap) && (!E.frustumCulled || r.intersectsObject(E))) {
      E.modelViewMatrix.multiplyMatrices(F.matrixWorldInverse, E.matrixWorld);
      const re = e.update(E);
      const ce = E.material;
      if (Array.isArray(ce)) {
        const z = re.groups;
        for (let j = 0, X = z.length; j < X; j++) {
          const Z = z[j];
          const q = ce[Z.materialIndex];
          if (q && q.visible) {
            const ue = w(E, q, k, L);
            o.renderBufferDirect(F, null, re, ue, E, Z);
          }
        }
      } else if (ce.visible) {
        const z = w(E, ce, k, L);
        o.renderBufferDirect(F, null, re, z, E, null);
      }
    }
    const ne = E.children;
    for (let re = 0, ce = ne.length; re < ce; re++) {
      R(ne[re], I, F, k, L);
    }
  }
}
function WebGLState(o, e, t) {
  const r = t.isWebGL2;
  function n() {
    let ae = false;
    const ke = new Vector4();
    let Ne = null;
    const be = new Vector4(0, 0, 0, 0);
    return {
      setMask: function (ze) {
        if (Ne !== ze && !ae) {
          o.colorMask(ze, ze, ze, ze);
          Ne = ze;
        }
      },
      setLocked: function (ze) {
        ae = ze;
      },
      setClear: function (ze, Je, at, pt, xt) {
        if (xt === true) {
          ze *= pt;
          Je *= pt;
          at *= pt;
        }
        ke.set(ze, Je, at, pt);
        if (be.equals(ke) === false) {
          o.clearColor(ze, Je, at, pt);
          be.copy(ke);
        }
      },
      reset: function () {
        ae = false;
        Ne = null;
        be.set(-1, 0, 0, 0);
      }
    };
  }
  function a() {
    let ae = false;
    let ke = null;
    let Ne = null;
    let be = null;
    return {
      setTest: function (ze) {
        if (ze) {
          ve(o.DEPTH_TEST);
        } else {
          de(o.DEPTH_TEST);
        }
      },
      setMask: function (ze) {
        if (ke !== ze && !ae) {
          o.depthMask(ze);
          ke = ze;
        }
      },
      setFunc: function (ze) {
        if (Ne !== ze) {
          switch (ze) {
            case NeverDepth:
              o.depthFunc(o.NEVER);
              break;
            case AlwaysDepth:
              o.depthFunc(o.ALWAYS);
              break;
            case LessDepth:
              o.depthFunc(o.LESS);
              break;
            case LessEqualDepth:
              o.depthFunc(o.LEQUAL);
              break;
            case EqualDepth:
              o.depthFunc(o.EQUAL);
              break;
            case GreaterEqualDepth:
              o.depthFunc(o.GEQUAL);
              break;
            case GreaterDepth:
              o.depthFunc(o.GREATER);
              break;
            case NotEqualDepth:
              o.depthFunc(o.NOTEQUAL);
              break;
            default:
              o.depthFunc(o.LEQUAL);
          }
          Ne = ze;
        }
      },
      setLocked: function (ze) {
        ae = ze;
      },
      setClear: function (ze) {
        if (be !== ze) {
          o.clearDepth(ze);
          be = ze;
        }
      },
      reset: function () {
        ae = false;
        ke = null;
        Ne = null;
        be = null;
      }
    };
  }
  function l() {
    let ae = false;
    let ke = null;
    let Ne = null;
    let be = null;
    let ze = null;
    let Je = null;
    let at = null;
    let pt = null;
    let xt = null;
    return {
      setTest: function (ht) {
        if (!ae) {
          if (ht) {
            ve(o.STENCIL_TEST);
          } else {
            de(o.STENCIL_TEST);
          }
        }
      },
      setMask: function (ht) {
        if (ke !== ht && !ae) {
          o.stencilMask(ht);
          ke = ht;
        }
      },
      setFunc: function (ht, gt, yt) {
        if (Ne !== ht || be !== gt || ze !== yt) {
          o.stencilFunc(ht, gt, yt);
          Ne = ht;
          be = gt;
          ze = yt;
        }
      },
      setOp: function (ht, gt, yt) {
        if (Je !== ht || at !== gt || pt !== yt) {
          o.stencilOp(ht, gt, yt);
          Je = ht;
          at = gt;
          pt = yt;
        }
      },
      setLocked: function (ht) {
        ae = ht;
      },
      setClear: function (ht) {
        if (xt !== ht) {
          o.clearStencil(ht);
          xt = ht;
        }
      },
      reset: function () {
        ae = false;
        ke = null;
        Ne = null;
        be = null;
        ze = null;
        Je = null;
        at = null;
        pt = null;
        xt = null;
      }
    };
  }
  const c = new n();
  const u = new a();
  const f = new l();
  const p = new WeakMap();
  const g = new WeakMap();
  let v = {};
  let _ = {};
  let T = new WeakMap();
  let M = [];
  let S = null;
  let b = false;
  let C = null;
  let w = null;
  let R = null;
  let E = null;
  let I = null;
  let F = null;
  let k = null;
  let L = new Color(0, 0, 0);
  let D = 0;
  let ne = false;
  let re = null;
  let ce = null;
  let z = null;
  let j = null;
  let X = null;
  const Z = o.getParameter(o.MAX_COMBINED_TEXTURE_IMAGE_UNITS);
  let q = false;
  let ue = 0;
  const oe = o.getParameter(o.VERSION);
  if (oe.indexOf("WebGL") !== -1) {
    ue = parseFloat(/^WebGL (\d)/.exec(oe)[1]);
    q = ue >= 1;
  } else if (oe.indexOf("OpenGL ES") !== -1) {
    ue = parseFloat(/^OpenGL ES (\d)/.exec(oe)[1]);
    q = ue >= 2;
  }
  let te = null;
  let le = {};
  const Te = o.getParameter(o.SCISSOR_BOX);
  const K = o.getParameter(o.VIEWPORT);
  const G = new Vector4().fromArray(Te);
  const U = new Vector4().fromArray(K);
  function N(ae, ke, Ne, be) {
    const ze = new Uint8Array(4);
    const Je = o.createTexture();
    o.bindTexture(ae, Je);
    o.texParameteri(ae, o.TEXTURE_MIN_FILTER, o.NEAREST);
    o.texParameteri(ae, o.TEXTURE_MAG_FILTER, o.NEAREST);
    for (let at = 0; at < Ne; at++) {
      if (r && (ae === o.TEXTURE_3D || ae === o.TEXTURE_2D_ARRAY)) {
        o.texImage3D(ke, 0, o.RGBA, 1, 1, be, 0, o.RGBA, o.UNSIGNED_BYTE, ze);
      } else {
        o.texImage2D(ke + at, 0, o.RGBA, 1, 1, 0, o.RGBA, o.UNSIGNED_BYTE, ze);
      }
    }
    return Je;
  }
  const he = {};
  he[o.TEXTURE_2D] = N(o.TEXTURE_2D, o.TEXTURE_2D, 1);
  he[o.TEXTURE_CUBE_MAP] = N(o.TEXTURE_CUBE_MAP, o.TEXTURE_CUBE_MAP_POSITIVE_X, 6);
  if (r) {
    he[o.TEXTURE_2D_ARRAY] = N(o.TEXTURE_2D_ARRAY, o.TEXTURE_2D_ARRAY, 1, 1);
    he[o.TEXTURE_3D] = N(o.TEXTURE_3D, o.TEXTURE_3D, 1, 1);
  }
  c.setClear(0, 0, 0, 1);
  u.setClear(1);
  f.setClear(0);
  ve(o.DEPTH_TEST);
  u.setFunc(LessEqualDepth);
  se(false);
  $(CullFaceBack);
  ve(o.CULL_FACE);
  Me(NoBlending);
  function ve(ae) {
    if (v[ae] !== true) {
      o.enable(ae);
      v[ae] = true;
    }
  }
  function de(ae) {
    if (v[ae] !== false) {
      o.disable(ae);
      v[ae] = false;
    }
  }
  function xe(ae, ke) {
    if (_[ae] !== ke) {
      o.bindFramebuffer(ae, ke);
      _[ae] = ke;
      if (r) {
        if (ae === o.DRAW_FRAMEBUFFER) {
          _[o.FRAMEBUFFER] = ke;
        }
        if (ae === o.FRAMEBUFFER) {
          _[o.DRAW_FRAMEBUFFER] = ke;
        }
      }
      return true;
    } else {
      return false;
    }
  }
  function ee(ae, ke) {
    let Ne = M;
    let be = false;
    if (ae) {
      Ne = T.get(ke);
      if (Ne === undefined) {
        Ne = [];
        T.set(ke, Ne);
      }
      if (ae.isWebGLMultipleRenderTargets) {
        const ze = ae.texture;
        if (Ne.length !== ze.length || Ne[0] !== o.COLOR_ATTACHMENT0) {
          for (let Je = 0, at = ze.length; Je < at; Je++) {
            Ne[Je] = o.COLOR_ATTACHMENT0 + Je;
          }
          Ne.length = ze.length;
          be = true;
        }
      } else if (Ne[0] !== o.COLOR_ATTACHMENT0) {
        Ne[0] = o.COLOR_ATTACHMENT0;
        be = true;
      }
    } else if (Ne[0] !== o.BACK) {
      Ne[0] = o.BACK;
      be = true;
    }
    if (be) {
      if (t.isWebGL2) {
        o.drawBuffers(Ne);
      } else {
        e.get("WEBGL_draw_buffers").drawBuffersWEBGL(Ne);
      }
    }
  }
  function Ue(ae) {
    if (S !== ae) {
      o.useProgram(ae);
      S = ae;
      return true;
    } else {
      return false;
    }
  }
  const fe = {
    [AddEquation]: o.FUNC_ADD,
    [SubtractEquation]: o.FUNC_SUBTRACT,
    [ReverseSubtractEquation]: o.FUNC_REVERSE_SUBTRACT
  };
  if (r) {
    fe[MinEquation] = o.MIN;
    fe[MaxEquation] = o.MAX;
  } else {
    const ae = e.get("EXT_blend_minmax");
    if (ae !== null) {
      fe[MinEquation] = ae.MIN_EXT;
      fe[MaxEquation] = ae.MAX_EXT;
    }
  }
  const Se = {
    [ZeroFactor]: o.ZERO,
    [OneFactor]: o.ONE,
    [SrcColorFactor]: o.SRC_COLOR,
    [SrcAlphaFactor]: o.SRC_ALPHA,
    [SrcAlphaSaturateFactor]: o.SRC_ALPHA_SATURATE,
    [DstColorFactor]: o.DST_COLOR,
    [DstAlphaFactor]: o.DST_ALPHA,
    [OneMinusSrcColorFactor]: o.ONE_MINUS_SRC_COLOR,
    [OneMinusSrcAlphaFactor]: o.ONE_MINUS_SRC_ALPHA,
    [OneMinusDstColorFactor]: o.ONE_MINUS_DST_COLOR,
    [OneMinusDstAlphaFactor]: o.ONE_MINUS_DST_ALPHA,
    [ConstantColorFactor]: o.CONSTANT_COLOR,
    [OneMinusConstantColorFactor]: o.ONE_MINUS_CONSTANT_COLOR,
    [ConstantAlphaFactor]: o.CONSTANT_ALPHA,
    [OneMinusConstantAlphaFactor]: o.ONE_MINUS_CONSTANT_ALPHA
  };
  function Me(ae, ke, Ne, be, ze, Je, at, pt, xt, ht) {
    if (ae === NoBlending) {
      if (b === true) {
        de(o.BLEND);
        b = false;
      }
      return;
    }
    if (b === false) {
      ve(o.BLEND);
      b = true;
    }
    if (ae !== CustomBlending) {
      if (ae !== C || ht !== ne) {
        if (w !== AddEquation || I !== AddEquation) {
          o.blendEquation(o.FUNC_ADD);
          w = AddEquation;
          I = AddEquation;
        }
        if (ht) {
          switch (ae) {
            case NormalBlending:
              o.blendFuncSeparate(o.ONE, o.ONE_MINUS_SRC_ALPHA, o.ONE, o.ONE_MINUS_SRC_ALPHA);
              break;
            case AdditiveBlending:
              o.blendFunc(o.ONE, o.ONE);
              break;
            case SubtractiveBlending:
              o.blendFuncSeparate(o.ZERO, o.ONE_MINUS_SRC_COLOR, o.ZERO, o.ONE);
              break;
            case MultiplyBlending:
              o.blendFuncSeparate(o.ZERO, o.SRC_COLOR, o.ZERO, o.SRC_ALPHA);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", ae);
              break;
          }
        } else {
          switch (ae) {
            case NormalBlending:
              o.blendFuncSeparate(o.SRC_ALPHA, o.ONE_MINUS_SRC_ALPHA, o.ONE, o.ONE_MINUS_SRC_ALPHA);
              break;
            case AdditiveBlending:
              o.blendFunc(o.SRC_ALPHA, o.ONE);
              break;
            case SubtractiveBlending:
              o.blendFuncSeparate(o.ZERO, o.ONE_MINUS_SRC_COLOR, o.ZERO, o.ONE);
              break;
            case MultiplyBlending:
              o.blendFunc(o.ZERO, o.SRC_COLOR);
              break;
            default:
              console.error("THREE.WebGLState: Invalid blending: ", ae);
              break;
          }
        }
        R = null;
        E = null;
        F = null;
        k = null;
        L.set(0, 0, 0);
        D = 0;
        C = ae;
        ne = ht;
      }
      return;
    }
    ze = ze || ke;
    Je = Je || Ne;
    at = at || be;
    if (ke !== w || ze !== I) {
      o.blendEquationSeparate(fe[ke], fe[ze]);
      w = ke;
      I = ze;
    }
    if (Ne !== R || be !== E || Je !== F || at !== k) {
      o.blendFuncSeparate(Se[Ne], Se[be], Se[Je], Se[at]);
      R = Ne;
      E = be;
      F = Je;
      k = at;
    }
    if (pt.equals(L) === false || xt !== D) {
      o.blendColor(pt.r, pt.g, pt.b, xt);
      L.copy(pt);
      D = xt;
    }
    C = ae;
    ne = false;
  }
  function Be(ae, ke) {
    if (ae.side === DoubleSide) {
      de(o.CULL_FACE);
    } else {
      ve(o.CULL_FACE);
    }
    let Ne = ae.side === BackSide;
    if (ke) {
      Ne = !Ne;
    }
    se(Ne);
    if (ae.blending === NormalBlending && ae.transparent === false) {
      Me(NoBlending);
    } else {
      Me(ae.blending, ae.blendEquation, ae.blendSrc, ae.blendDst, ae.blendEquationAlpha, ae.blendSrcAlpha, ae.blendDstAlpha, ae.blendColor, ae.blendAlpha, ae.premultipliedAlpha);
    }
    u.setFunc(ae.depthFunc);
    u.setTest(ae.depthTest);
    u.setMask(ae.depthWrite);
    c.setMask(ae.colorWrite);
    const be = ae.stencilWrite;
    f.setTest(be);
    if (be) {
      f.setMask(ae.stencilWriteMask);
      f.setFunc(ae.stencilFunc, ae.stencilRef, ae.stencilFuncMask);
      f.setOp(ae.stencilFail, ae.stencilZFail, ae.stencilZPass);
    }
    Ye(ae.polygonOffset, ae.polygonOffsetFactor, ae.polygonOffsetUnits);
    if (ae.alphaToCoverage === true) {
      ve(o.SAMPLE_ALPHA_TO_COVERAGE);
    } else {
      de(o.SAMPLE_ALPHA_TO_COVERAGE);
    }
  }
  function se(ae) {
    if (re !== ae) {
      if (ae) {
        o.frontFace(o.CW);
      } else {
        o.frontFace(o.CCW);
      }
      re = ae;
    }
  }
  function $(ae) {
    if (ae !== CullFaceNone) {
      ve(o.CULL_FACE);
      if (ae !== ce) {
        if (ae === CullFaceBack) {
          o.cullFace(o.BACK);
        } else if (ae === CullFaceFront) {
          o.cullFace(o.FRONT);
        } else {
          o.cullFace(o.FRONT_AND_BACK);
        }
      }
    } else {
      de(o.CULL_FACE);
    }
    ce = ae;
  }
  function Oe(ae) {
    if (ae !== z) {
      if (q) {
        o.lineWidth(ae);
      }
      z = ae;
    }
  }
  function Ye(ae, ke, Ne) {
    if (ae) {
      ve(o.POLYGON_OFFSET_FILL);
      if (j !== ke || X !== Ne) {
        o.polygonOffset(ke, Ne);
        j = ke;
        X = Ne;
      }
    } else {
      de(o.POLYGON_OFFSET_FILL);
    }
  }
  function st(ae) {
    if (ae) {
      ve(o.SCISSOR_TEST);
    } else {
      de(o.SCISSOR_TEST);
    }
  }
  function W(ae = o.TEXTURE0 + Z - 1) {
    if (te !== ae) {
      o.activeTexture(ae);
      te = ae;
    }
  }
  function O(ae, ke, Ne) {
    if (Ne === undefined) {
      if (te === null) {
        Ne = o.TEXTURE0 + Z - 1;
      } else {
        Ne = te;
      }
    }
    let be = le[Ne];
    if (be === undefined) {
      be = {
        type: undefined,
        texture: undefined
      };
      le[Ne] = be;
    }
    if (be.type !== ae || be.texture !== ke) {
      if (te !== Ne) {
        o.activeTexture(Ne);
        te = Ne;
      }
      o.bindTexture(ae, ke || he[ae]);
      be.type = ae;
      be.texture = ke;
    }
  }
  function me() {
    const ae = le[te];
    if (ae !== undefined && ae.type !== undefined) {
      o.bindTexture(ae.type, null);
      ae.type = undefined;
      ae.texture = undefined;
    }
  }
  function Ie() {
    try {
      o.compressedTexImage2D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function Le() {
    try {
      o.compressedTexImage3D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function Y() {
    try {
      o.texSubImage2D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function we() {
    try {
      o.texSubImage3D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function Ee() {
    try {
      o.compressedTexSubImage2D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function Fe() {
    try {
      o.compressedTexSubImage3D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function Xe() {
    try {
      o.texStorage2D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function tt() {
    try {
      o.texStorage3D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function Re() {
    try {
      o.texImage2D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function ot() {
    try {
      o.texImage3D.apply(o, arguments);
    } catch (ae) {
      console.error("THREE.WebGLState:", ae);
    }
  }
  function je(ae) {
    if (G.equals(ae) === false) {
      o.scissor(ae.x, ae.y, ae.z, ae.w);
      G.copy(ae);
    }
  }
  function We(ae) {
    if (U.equals(ae) === false) {
      o.viewport(ae.x, ae.y, ae.z, ae.w);
      U.copy(ae);
    }
  }
  function Ge(ae, ke) {
    let Ne = g.get(ke);
    if (Ne === undefined) {
      Ne = new WeakMap();
      g.set(ke, Ne);
    }
    let be = Ne.get(ae);
    if (be === undefined) {
      be = o.getUniformBlockIndex(ke, ae.name);
      Ne.set(ae, be);
    }
  }
  function qe(ae, ke) {
    const be = g.get(ke).get(ae);
    if (p.get(ke) !== be) {
      o.uniformBlockBinding(ke, be, ae.__bindingPointIndex);
      p.set(ke, be);
    }
  }
  function Pe() {
    o.disable(o.BLEND);
    o.disable(o.CULL_FACE);
    o.disable(o.DEPTH_TEST);
    o.disable(o.POLYGON_OFFSET_FILL);
    o.disable(o.SCISSOR_TEST);
    o.disable(o.STENCIL_TEST);
    o.disable(o.SAMPLE_ALPHA_TO_COVERAGE);
    o.blendEquation(o.FUNC_ADD);
    o.blendFunc(o.ONE, o.ZERO);
    o.blendFuncSeparate(o.ONE, o.ZERO, o.ONE, o.ZERO);
    o.blendColor(0, 0, 0, 0);
    o.colorMask(true, true, true, true);
    o.clearColor(0, 0, 0, 0);
    o.depthMask(true);
    o.depthFunc(o.LESS);
    o.clearDepth(1);
    o.stencilMask(4294967295);
    o.stencilFunc(o.ALWAYS, 0, 4294967295);
    o.stencilOp(o.KEEP, o.KEEP, o.KEEP);
    o.clearStencil(0);
    o.cullFace(o.BACK);
    o.frontFace(o.CCW);
    o.polygonOffset(0, 0);
    o.activeTexture(o.TEXTURE0);
    o.bindFramebuffer(o.FRAMEBUFFER, null);
    if (r === true) {
      o.bindFramebuffer(o.DRAW_FRAMEBUFFER, null);
      o.bindFramebuffer(o.READ_FRAMEBUFFER, null);
    }
    o.useProgram(null);
    o.lineWidth(1);
    o.scissor(0, 0, o.canvas.width, o.canvas.height);
    o.viewport(0, 0, o.canvas.width, o.canvas.height);
    v = {};
    te = null;
    le = {};
    _ = {};
    T = new WeakMap();
    M = [];
    S = null;
    b = false;
    C = null;
    w = null;
    R = null;
    E = null;
    I = null;
    F = null;
    k = null;
    L = new Color(0, 0, 0);
    D = 0;
    ne = false;
    re = null;
    ce = null;
    z = null;
    j = null;
    X = null;
    G.set(0, 0, o.canvas.width, o.canvas.height);
    U.set(0, 0, o.canvas.width, o.canvas.height);
    c.reset();
    u.reset();
    f.reset();
  }
  return {
    buffers: {
      color: c,
      depth: u,
      stencil: f
    },
    enable: ve,
    disable: de,
    bindFramebuffer: xe,
    drawBuffers: ee,
    useProgram: Ue,
    setBlending: Me,
    setMaterial: Be,
    setFlipSided: se,
    setCullFace: $,
    setLineWidth: Oe,
    setPolygonOffset: Ye,
    setScissorTest: st,
    activeTexture: W,
    bindTexture: O,
    unbindTexture: me,
    compressedTexImage2D: Ie,
    compressedTexImage3D: Le,
    texImage2D: Re,
    texImage3D: ot,
    updateUBOMapping: Ge,
    uniformBlockBinding: qe,
    texStorage2D: Xe,
    texStorage3D: tt,
    texSubImage2D: Y,
    texSubImage3D: we,
    compressedTexSubImage2D: Ee,
    compressedTexSubImage3D: Fe,
    scissor: je,
    viewport: We,
    reset: Pe
  };
}
function WebGLTextures(o, e, t, r, n, a, l) {
  const c = n.isWebGL2;
  const u = n.maxTextures;
  const f = n.maxCubemapSize;
  const p = n.maxTextureSize;
  const g = n.maxSamples;
  const v = e.has("WEBGL_multisampled_render_to_texture") ? e.get("WEBGL_multisampled_render_to_texture") : null;
  const _ = typeof navigator === "undefined" ? false : /OculusBrowser/g.test(navigator.userAgent);
  const T = new WeakMap();
  let M;
  const S = new WeakMap();
  let b = false;
  try {
    b = typeof OffscreenCanvas !== "undefined" && new OffscreenCanvas(1, 1).getContext("2d") !== null;
  } catch {}
  function C(W, O) {
    if (b) {
      return new OffscreenCanvas(W, O);
    } else {
      return createElementNS("canvas");
    }
  }
  function w(W, O, me, Ie) {
    let Le = 1;
    if (W.width > Ie || W.height > Ie) {
      Le = Ie / Math.max(W.width, W.height);
    }
    if (Le < 1 || O === true) {
      if (typeof HTMLImageElement !== "undefined" && W instanceof HTMLImageElement || typeof HTMLCanvasElement !== "undefined" && W instanceof HTMLCanvasElement || typeof ImageBitmap !== "undefined" && W instanceof ImageBitmap) {
        const Y = O ? floorPowerOfTwo : Math.floor;
        const we = Y(Le * W.width);
        const Ee = Y(Le * W.height);
        if (M === undefined) {
          M = C(we, Ee);
        }
        const Fe = me ? C(we, Ee) : M;
        Fe.width = we;
        Fe.height = Ee;
        Fe.getContext("2d").drawImage(W, 0, 0, we, Ee);
        console.warn("THREE.WebGLRenderer: Texture has been resized from (" + W.width + "x" + W.height + ") to (" + we + "x" + Ee + ").");
        return Fe;
      } else {
        if ("data" in W) {
          console.warn("THREE.WebGLRenderer: Image in DataTexture is too big (" + W.width + "x" + W.height + ").");
        }
        return W;
      }
    }
    return W;
  }
  function R(W) {
    return isPowerOfTwo(W.width) && isPowerOfTwo(W.height);
  }
  function E(W) {
    if (c) {
      return false;
    } else {
      return W.wrapS !== ClampToEdgeWrapping || W.wrapT !== ClampToEdgeWrapping || W.minFilter !== NearestFilter && W.minFilter !== LinearFilter;
    }
  }
  function I(W, O) {
    return W.generateMipmaps && O && W.minFilter !== NearestFilter && W.minFilter !== LinearFilter;
  }
  function F(W) {
    o.generateMipmap(W);
  }
  function k(W, O, me, Ie, Le = false) {
    if (c === false) {
      return O;
    }
    if (W !== null) {
      if (o[W] !== undefined) {
        return o[W];
      }
      console.warn("THREE.WebGLRenderer: Attempt to use non-existing WebGL internal format '" + W + "'");
    }
    let Y = O;
    if (O === o.RED) {
      if (me === o.FLOAT) {
        Y = o.R32F;
      }
      if (me === o.HALF_FLOAT) {
        Y = o.R16F;
      }
      if (me === o.UNSIGNED_BYTE) {
        Y = o.R8;
      }
    }
    if (O === o.RED_INTEGER) {
      if (me === o.UNSIGNED_BYTE) {
        Y = o.R8UI;
      }
      if (me === o.UNSIGNED_SHORT) {
        Y = o.R16UI;
      }
      if (me === o.UNSIGNED_INT) {
        Y = o.R32UI;
      }
      if (me === o.BYTE) {
        Y = o.R8I;
      }
      if (me === o.SHORT) {
        Y = o.R16I;
      }
      if (me === o.INT) {
        Y = o.R32I;
      }
    }
    if (O === o.RG) {
      if (me === o.FLOAT) {
        Y = o.RG32F;
      }
      if (me === o.HALF_FLOAT) {
        Y = o.RG16F;
      }
      if (me === o.UNSIGNED_BYTE) {
        Y = o.RG8;
      }
    }
    if (O === o.RGBA) {
      const we = Le ? LinearTransfer : ColorManagement.getTransfer(Ie);
      if (me === o.FLOAT) {
        Y = o.RGBA32F;
      }
      if (me === o.HALF_FLOAT) {
        Y = o.RGBA16F;
      }
      if (me === o.UNSIGNED_BYTE) {
        Y = we === SRGBTransfer ? o.SRGB8_ALPHA8 : o.RGBA8;
      }
      if (me === o.UNSIGNED_SHORT_4_4_4_4) {
        Y = o.RGBA4;
      }
      if (me === o.UNSIGNED_SHORT_5_5_5_1) {
        Y = o.RGB5_A1;
      }
    }
    if (Y === o.R16F || Y === o.R32F || Y === o.RG16F || Y === o.RG32F || Y === o.RGBA16F || Y === o.RGBA32F) {
      e.get("EXT_color_buffer_float");
    }
    return Y;
  }
  function L(W, O, me) {
    if (I(W, me) === true || W.isFramebufferTexture && W.minFilter !== NearestFilter && W.minFilter !== LinearFilter) {
      return Math.log2(Math.max(O.width, O.height)) + 1;
    } else if (W.mipmaps !== undefined && W.mipmaps.length > 0) {
      return W.mipmaps.length;
    } else if (W.isCompressedTexture && Array.isArray(W.image)) {
      return O.mipmaps.length;
    } else {
      return 1;
    }
  }
  function D(W) {
    if (W === NearestFilter || W === NearestMipmapNearestFilter || W === NearestMipmapLinearFilter) {
      return o.NEAREST;
    } else {
      return o.LINEAR;
    }
  }
  function ne(W) {
    const O = W.target;
    O.removeEventListener("dispose", ne);
    ce(O);
    if (O.isVideoTexture) {
      T.delete(O);
    }
  }
  function re(W) {
    const O = W.target;
    O.removeEventListener("dispose", re);
    j(O);
  }
  function ce(W) {
    const O = r.get(W);
    if (O.__webglInit === undefined) {
      return;
    }
    const me = W.source;
    const Ie = S.get(me);
    if (Ie) {
      const Le = Ie[O.__cacheKey];
      Le.usedTimes--;
      if (Le.usedTimes === 0) {
        z(W);
      }
      if (Object.keys(Ie).length === 0) {
        S.delete(me);
      }
    }
    r.remove(W);
  }
  function z(W) {
    const O = r.get(W);
    o.deleteTexture(O.__webglTexture);
    const me = W.source;
    const Ie = S.get(me);
    delete Ie[O.__cacheKey];
    l.memory.textures--;
  }
  function j(W) {
    const O = W.texture;
    const me = r.get(W);
    const Ie = r.get(O);
    if (Ie.__webglTexture !== undefined) {
      o.deleteTexture(Ie.__webglTexture);
      l.memory.textures--;
    }
    if (W.depthTexture) {
      W.depthTexture.dispose();
    }
    if (W.isWebGLCubeRenderTarget) {
      for (let Le = 0; Le < 6; Le++) {
        if (Array.isArray(me.__webglFramebuffer[Le])) {
          for (let Y = 0; Y < me.__webglFramebuffer[Le].length; Y++) {
            o.deleteFramebuffer(me.__webglFramebuffer[Le][Y]);
          }
        } else {
          o.deleteFramebuffer(me.__webglFramebuffer[Le]);
        }
        if (me.__webglDepthbuffer) {
          o.deleteRenderbuffer(me.__webglDepthbuffer[Le]);
        }
      }
    } else {
      if (Array.isArray(me.__webglFramebuffer)) {
        for (let Le = 0; Le < me.__webglFramebuffer.length; Le++) {
          o.deleteFramebuffer(me.__webglFramebuffer[Le]);
        }
      } else {
        o.deleteFramebuffer(me.__webglFramebuffer);
      }
      if (me.__webglDepthbuffer) {
        o.deleteRenderbuffer(me.__webglDepthbuffer);
      }
      if (me.__webglMultisampledFramebuffer) {
        o.deleteFramebuffer(me.__webglMultisampledFramebuffer);
      }
      if (me.__webglColorRenderbuffer) {
        for (let Le = 0; Le < me.__webglColorRenderbuffer.length; Le++) {
          if (me.__webglColorRenderbuffer[Le]) {
            o.deleteRenderbuffer(me.__webglColorRenderbuffer[Le]);
          }
        }
      }
      if (me.__webglDepthRenderbuffer) {
        o.deleteRenderbuffer(me.__webglDepthRenderbuffer);
      }
    }
    if (W.isWebGLMultipleRenderTargets) {
      for (let Le = 0, Y = O.length; Le < Y; Le++) {
        const we = r.get(O[Le]);
        if (we.__webglTexture) {
          o.deleteTexture(we.__webglTexture);
          l.memory.textures--;
        }
        r.remove(O[Le]);
      }
    }
    r.remove(O);
    r.remove(W);
  }
  let X = 0;
  function Z() {
    X = 0;
  }
  function q() {
    const W = X;
    if (W >= u) {
      console.warn("THREE.WebGLTextures: Trying to use " + W + " texture units while this GPU supports only " + u);
    }
    X += 1;
    return W;
  }
  function ue(W) {
    const O = [];
    O.push(W.wrapS);
    O.push(W.wrapT);
    O.push(W.wrapR || 0);
    O.push(W.magFilter);
    O.push(W.minFilter);
    O.push(W.anisotropy);
    O.push(W.internalFormat);
    O.push(W.format);
    O.push(W.type);
    O.push(W.generateMipmaps);
    O.push(W.premultiplyAlpha);
    O.push(W.flipY);
    O.push(W.unpackAlignment);
    O.push(W.colorSpace);
    return O.join();
  }
  function oe(W, O) {
    const me = r.get(W);
    if (W.isVideoTexture) {
      Ye(W);
    }
    if (W.isRenderTargetTexture === false && W.version > 0 && me.__version !== W.version) {
      const Ie = W.image;
      if (Ie === null) {
        console.warn("THREE.WebGLRenderer: Texture marked for update but no image data found.");
      } else if (Ie.complete === false) {
        console.warn("THREE.WebGLRenderer: Texture marked for update but image is incomplete");
      } else {
        ve(me, W, O);
        return;
      }
    }
    t.bindTexture(o.TEXTURE_2D, me.__webglTexture, o.TEXTURE0 + O);
  }
  function te(W, O) {
    const me = r.get(W);
    if (W.version > 0 && me.__version !== W.version) {
      ve(me, W, O);
      return;
    }
    t.bindTexture(o.TEXTURE_2D_ARRAY, me.__webglTexture, o.TEXTURE0 + O);
  }
  function le(W, O) {
    const me = r.get(W);
    if (W.version > 0 && me.__version !== W.version) {
      ve(me, W, O);
      return;
    }
    t.bindTexture(o.TEXTURE_3D, me.__webglTexture, o.TEXTURE0 + O);
  }
  function Te(W, O) {
    const me = r.get(W);
    if (W.version > 0 && me.__version !== W.version) {
      de(me, W, O);
      return;
    }
    t.bindTexture(o.TEXTURE_CUBE_MAP, me.__webglTexture, o.TEXTURE0 + O);
  }
  const K = {
    [RepeatWrapping]: o.REPEAT,
    [ClampToEdgeWrapping]: o.CLAMP_TO_EDGE,
    [MirroredRepeatWrapping]: o.MIRRORED_REPEAT
  };
  const G = {
    [NearestFilter]: o.NEAREST,
    [NearestMipmapNearestFilter]: o.NEAREST_MIPMAP_NEAREST,
    [NearestMipmapLinearFilter]: o.NEAREST_MIPMAP_LINEAR,
    [LinearFilter]: o.LINEAR,
    [LinearMipmapNearestFilter]: o.LINEAR_MIPMAP_NEAREST,
    [LinearMipmapLinearFilter]: o.LINEAR_MIPMAP_LINEAR
  };
  const U = {
    [NeverCompare]: o.NEVER,
    [AlwaysCompare]: o.ALWAYS,
    [LessCompare]: o.LESS,
    [LessEqualCompare]: o.LEQUAL,
    [EqualCompare]: o.EQUAL,
    [GreaterEqualCompare]: o.GEQUAL,
    [GreaterCompare]: o.GREATER,
    [NotEqualCompare]: o.NOTEQUAL
  };
  function N(W, O, me) {
    if (me) {
      o.texParameteri(W, o.TEXTURE_WRAP_S, K[O.wrapS]);
      o.texParameteri(W, o.TEXTURE_WRAP_T, K[O.wrapT]);
      if (W === o.TEXTURE_3D || W === o.TEXTURE_2D_ARRAY) {
        o.texParameteri(W, o.TEXTURE_WRAP_R, K[O.wrapR]);
      }
      o.texParameteri(W, o.TEXTURE_MAG_FILTER, G[O.magFilter]);
      o.texParameteri(W, o.TEXTURE_MIN_FILTER, G[O.minFilter]);
    } else {
      o.texParameteri(W, o.TEXTURE_WRAP_S, o.CLAMP_TO_EDGE);
      o.texParameteri(W, o.TEXTURE_WRAP_T, o.CLAMP_TO_EDGE);
      if (W === o.TEXTURE_3D || W === o.TEXTURE_2D_ARRAY) {
        o.texParameteri(W, o.TEXTURE_WRAP_R, o.CLAMP_TO_EDGE);
      }
      if (O.wrapS !== ClampToEdgeWrapping || O.wrapT !== ClampToEdgeWrapping) {
        console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.wrapS and Texture.wrapT should be set to THREE.ClampToEdgeWrapping.");
      }
      o.texParameteri(W, o.TEXTURE_MAG_FILTER, D(O.magFilter));
      o.texParameteri(W, o.TEXTURE_MIN_FILTER, D(O.minFilter));
      if (O.minFilter !== NearestFilter && O.minFilter !== LinearFilter) {
        console.warn("THREE.WebGLRenderer: Texture is not power of two. Texture.minFilter should be set to THREE.NearestFilter or THREE.LinearFilter.");
      }
    }
    if (O.compareFunction) {
      o.texParameteri(W, o.TEXTURE_COMPARE_MODE, o.COMPARE_REF_TO_TEXTURE);
      o.texParameteri(W, o.TEXTURE_COMPARE_FUNC, U[O.compareFunction]);
    }
    if (e.has("EXT_texture_filter_anisotropic") === true) {
      const Ie = e.get("EXT_texture_filter_anisotropic");
      if (O.magFilter === NearestFilter || O.minFilter !== NearestMipmapLinearFilter && O.minFilter !== LinearMipmapLinearFilter || O.type === FloatType && e.has("OES_texture_float_linear") === false || c === false && O.type === HalfFloatType && e.has("OES_texture_half_float_linear") === false) {
        return;
      }
      if (O.anisotropy > 1 || r.get(O).__currentAnisotropy) {
        o.texParameterf(W, Ie.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(O.anisotropy, n.getMaxAnisotropy()));
        r.get(O).__currentAnisotropy = O.anisotropy;
      }
    }
  }
  function he(W, O) {
    let me = false;
    if (W.__webglInit === undefined) {
      W.__webglInit = true;
      O.addEventListener("dispose", ne);
    }
    const Ie = O.source;
    let Le = S.get(Ie);
    if (Le === undefined) {
      Le = {};
      S.set(Ie, Le);
    }
    const Y = ue(O);
    if (Y !== W.__cacheKey) {
      if (Le[Y] === undefined) {
        Le[Y] = {
          texture: o.createTexture(),
          usedTimes: 0
        };
        l.memory.textures++;
        me = true;
      }
      Le[Y].usedTimes++;
      const we = Le[W.__cacheKey];
      if (we !== undefined) {
        Le[W.__cacheKey].usedTimes--;
        if (we.usedTimes === 0) {
          z(O);
        }
      }
      W.__cacheKey = Y;
      W.__webglTexture = Le[Y].texture;
    }
    return me;
  }
  function ve(W, O, me) {
    let Ie = o.TEXTURE_2D;
    if (O.isDataArrayTexture || O.isCompressedArrayTexture) {
      Ie = o.TEXTURE_2D_ARRAY;
    }
    if (O.isData3DTexture) {
      Ie = o.TEXTURE_3D;
    }
    const Le = he(W, O);
    const Y = O.source;
    t.bindTexture(Ie, W.__webglTexture, o.TEXTURE0 + me);
    const we = r.get(Y);
    if (Y.version !== we.__version || Le === true) {
      t.activeTexture(o.TEXTURE0 + me);
      const Ee = ColorManagement.getPrimaries(ColorManagement.workingColorSpace);
      const Fe = O.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries(O.colorSpace);
      const Xe = O.colorSpace === NoColorSpace || Ee === Fe ? o.NONE : o.BROWSER_DEFAULT_WEBGL;
      o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, O.flipY);
      o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, O.premultiplyAlpha);
      o.pixelStorei(o.UNPACK_ALIGNMENT, O.unpackAlignment);
      o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL, Xe);
      const tt = E(O) && R(O.image) === false;
      let Re = w(O.image, tt, false, p);
      Re = st(O, Re);
      const ot = R(Re) || c;
      const je = a.convert(O.format, O.colorSpace);
      let We = a.convert(O.type);
      let Ge = k(O.internalFormat, je, We, O.colorSpace, O.isVideoTexture);
      N(Ie, O, ot);
      let qe;
      const Pe = O.mipmaps;
      const ae = c && O.isVideoTexture !== true;
      const ke = we.__version === undefined || Le === true;
      const Ne = L(O, Re, ot);
      if (O.isDepthTexture) {
        Ge = o.DEPTH_COMPONENT;
        if (c) {
          if (O.type === FloatType) {
            Ge = o.DEPTH_COMPONENT32F;
          } else if (O.type === UnsignedIntType) {
            Ge = o.DEPTH_COMPONENT24;
          } else if (O.type === UnsignedInt248Type) {
            Ge = o.DEPTH24_STENCIL8;
          } else {
            Ge = o.DEPTH_COMPONENT16;
          }
        } else if (O.type === FloatType) {
          console.error("WebGLRenderer: Floating point depth texture requires WebGL2.");
        }
        if (O.format === DepthFormat && Ge === o.DEPTH_COMPONENT && O.type !== UnsignedShortType && O.type !== UnsignedIntType) {
          console.warn("THREE.WebGLRenderer: Use UnsignedShortType or UnsignedIntType for DepthFormat DepthTexture.");
          O.type = UnsignedIntType;
          We = a.convert(O.type);
        }
        if (O.format === DepthStencilFormat && Ge === o.DEPTH_COMPONENT) {
          Ge = o.DEPTH_STENCIL;
          if (O.type !== UnsignedInt248Type) {
            console.warn("THREE.WebGLRenderer: Use UnsignedInt248Type for DepthStencilFormat DepthTexture.");
            O.type = UnsignedInt248Type;
            We = a.convert(O.type);
          }
        }
        if (ke) {
          if (ae) {
            t.texStorage2D(o.TEXTURE_2D, 1, Ge, Re.width, Re.height);
          } else {
            t.texImage2D(o.TEXTURE_2D, 0, Ge, Re.width, Re.height, 0, je, We, null);
          }
        }
      } else if (O.isDataTexture) {
        if (Pe.length > 0 && ot) {
          if (ae && ke) {
            t.texStorage2D(o.TEXTURE_2D, Ne, Ge, Pe[0].width, Pe[0].height);
          }
          for (let be = 0, ze = Pe.length; be < ze; be++) {
            qe = Pe[be];
            if (ae) {
              t.texSubImage2D(o.TEXTURE_2D, be, 0, 0, qe.width, qe.height, je, We, qe.data);
            } else {
              t.texImage2D(o.TEXTURE_2D, be, Ge, qe.width, qe.height, 0, je, We, qe.data);
            }
          }
          O.generateMipmaps = false;
        } else if (ae) {
          if (ke) {
            t.texStorage2D(o.TEXTURE_2D, Ne, Ge, Re.width, Re.height);
          }
          t.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, Re.width, Re.height, je, We, Re.data);
        } else {
          t.texImage2D(o.TEXTURE_2D, 0, Ge, Re.width, Re.height, 0, je, We, Re.data);
        }
      } else if (O.isCompressedTexture) {
        if (O.isCompressedArrayTexture) {
          if (ae && ke) {
            t.texStorage3D(o.TEXTURE_2D_ARRAY, Ne, Ge, Pe[0].width, Pe[0].height, Re.depth);
          }
          for (let be = 0, ze = Pe.length; be < ze; be++) {
            qe = Pe[be];
            if (O.format !== RGBAFormat) {
              if (je !== null) {
                if (ae) {
                  t.compressedTexSubImage3D(o.TEXTURE_2D_ARRAY, be, 0, 0, 0, qe.width, qe.height, Re.depth, je, qe.data, 0, 0);
                } else {
                  t.compressedTexImage3D(o.TEXTURE_2D_ARRAY, be, Ge, qe.width, qe.height, Re.depth, 0, qe.data, 0, 0);
                }
              } else {
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
              }
            } else if (ae) {
              t.texSubImage3D(o.TEXTURE_2D_ARRAY, be, 0, 0, 0, qe.width, qe.height, Re.depth, je, We, qe.data);
            } else {
              t.texImage3D(o.TEXTURE_2D_ARRAY, be, Ge, qe.width, qe.height, Re.depth, 0, je, We, qe.data);
            }
          }
        } else {
          if (ae && ke) {
            t.texStorage2D(o.TEXTURE_2D, Ne, Ge, Pe[0].width, Pe[0].height);
          }
          for (let be = 0, ze = Pe.length; be < ze; be++) {
            qe = Pe[be];
            if (O.format !== RGBAFormat) {
              if (je !== null) {
                if (ae) {
                  t.compressedTexSubImage2D(o.TEXTURE_2D, be, 0, 0, qe.width, qe.height, je, qe.data);
                } else {
                  t.compressedTexImage2D(o.TEXTURE_2D, be, Ge, qe.width, qe.height, 0, qe.data);
                }
              } else {
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .uploadTexture()");
              }
            } else if (ae) {
              t.texSubImage2D(o.TEXTURE_2D, be, 0, 0, qe.width, qe.height, je, We, qe.data);
            } else {
              t.texImage2D(o.TEXTURE_2D, be, Ge, qe.width, qe.height, 0, je, We, qe.data);
            }
          }
        }
      } else if (O.isDataArrayTexture) {
        if (ae) {
          if (ke) {
            t.texStorage3D(o.TEXTURE_2D_ARRAY, Ne, Ge, Re.width, Re.height, Re.depth);
          }
          t.texSubImage3D(o.TEXTURE_2D_ARRAY, 0, 0, 0, 0, Re.width, Re.height, Re.depth, je, We, Re.data);
        } else {
          t.texImage3D(o.TEXTURE_2D_ARRAY, 0, Ge, Re.width, Re.height, Re.depth, 0, je, We, Re.data);
        }
      } else if (O.isData3DTexture) {
        if (ae) {
          if (ke) {
            t.texStorage3D(o.TEXTURE_3D, Ne, Ge, Re.width, Re.height, Re.depth);
          }
          t.texSubImage3D(o.TEXTURE_3D, 0, 0, 0, 0, Re.width, Re.height, Re.depth, je, We, Re.data);
        } else {
          t.texImage3D(o.TEXTURE_3D, 0, Ge, Re.width, Re.height, Re.depth, 0, je, We, Re.data);
        }
      } else if (O.isFramebufferTexture) {
        if (ke) {
          if (ae) {
            t.texStorage2D(o.TEXTURE_2D, Ne, Ge, Re.width, Re.height);
          } else {
            let be = Re.width;
            let ze = Re.height;
            for (let Je = 0; Je < Ne; Je++) {
              t.texImage2D(o.TEXTURE_2D, Je, Ge, be, ze, 0, je, We, null);
              be >>= 1;
              ze >>= 1;
            }
          }
        }
      } else if (Pe.length > 0 && ot) {
        if (ae && ke) {
          t.texStorage2D(o.TEXTURE_2D, Ne, Ge, Pe[0].width, Pe[0].height);
        }
        for (let be = 0, ze = Pe.length; be < ze; be++) {
          qe = Pe[be];
          if (ae) {
            t.texSubImage2D(o.TEXTURE_2D, be, 0, 0, je, We, qe);
          } else {
            t.texImage2D(o.TEXTURE_2D, be, Ge, je, We, qe);
          }
        }
        O.generateMipmaps = false;
      } else if (ae) {
        if (ke) {
          t.texStorage2D(o.TEXTURE_2D, Ne, Ge, Re.width, Re.height);
        }
        t.texSubImage2D(o.TEXTURE_2D, 0, 0, 0, je, We, Re);
      } else {
        t.texImage2D(o.TEXTURE_2D, 0, Ge, je, We, Re);
      }
      if (I(O, ot)) {
        F(Ie);
      }
      we.__version = Y.version;
      if (O.onUpdate) {
        O.onUpdate(O);
      }
    }
    W.__version = O.version;
  }
  function de(W, O, me) {
    if (O.image.length !== 6) {
      return;
    }
    const Ie = he(W, O);
    const Le = O.source;
    t.bindTexture(o.TEXTURE_CUBE_MAP, W.__webglTexture, o.TEXTURE0 + me);
    const Y = r.get(Le);
    if (Le.version !== Y.__version || Ie === true) {
      t.activeTexture(o.TEXTURE0 + me);
      const we = ColorManagement.getPrimaries(ColorManagement.workingColorSpace);
      const Ee = O.colorSpace === NoColorSpace ? null : ColorManagement.getPrimaries(O.colorSpace);
      const Fe = O.colorSpace === NoColorSpace || we === Ee ? o.NONE : o.BROWSER_DEFAULT_WEBGL;
      o.pixelStorei(o.UNPACK_FLIP_Y_WEBGL, O.flipY);
      o.pixelStorei(o.UNPACK_PREMULTIPLY_ALPHA_WEBGL, O.premultiplyAlpha);
      o.pixelStorei(o.UNPACK_ALIGNMENT, O.unpackAlignment);
      o.pixelStorei(o.UNPACK_COLORSPACE_CONVERSION_WEBGL, Fe);
      const Xe = O.isCompressedTexture || O.image[0].isCompressedTexture;
      const tt = O.image[0] && O.image[0].isDataTexture;
      const Re = [];
      for (let be = 0; be < 6; be++) {
        if (!Xe && !tt) {
          Re[be] = w(O.image[be], false, true, f);
        } else {
          Re[be] = tt ? O.image[be].image : O.image[be];
        }
        Re[be] = st(O, Re[be]);
      }
      const ot = Re[0];
      const je = R(ot) || c;
      const We = a.convert(O.format, O.colorSpace);
      const Ge = a.convert(O.type);
      const qe = k(O.internalFormat, We, Ge, O.colorSpace);
      const Pe = c && O.isVideoTexture !== true;
      const ae = Y.__version === undefined || Ie === true;
      let ke = L(O, ot, je);
      N(o.TEXTURE_CUBE_MAP, O, je);
      let Ne;
      if (Xe) {
        if (Pe && ae) {
          t.texStorage2D(o.TEXTURE_CUBE_MAP, ke, qe, ot.width, ot.height);
        }
        for (let be = 0; be < 6; be++) {
          Ne = Re[be].mipmaps;
          for (let ze = 0; ze < Ne.length; ze++) {
            const Je = Ne[ze];
            if (O.format !== RGBAFormat) {
              if (We !== null) {
                if (Pe) {
                  t.compressedTexSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze, 0, 0, Je.width, Je.height, We, Je.data);
                } else {
                  t.compressedTexImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze, qe, Je.width, Je.height, 0, Je.data);
                }
              } else {
                console.warn("THREE.WebGLRenderer: Attempt to load unsupported compressed texture format in .setTextureCube()");
              }
            } else if (Pe) {
              t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze, 0, 0, Je.width, Je.height, We, Ge, Je.data);
            } else {
              t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze, qe, Je.width, Je.height, 0, We, Ge, Je.data);
            }
          }
        }
      } else {
        Ne = O.mipmaps;
        if (Pe && ae) {
          if (Ne.length > 0) {
            ke++;
          }
          t.texStorage2D(o.TEXTURE_CUBE_MAP, ke, qe, Re[0].width, Re[0].height);
        }
        for (let be = 0; be < 6; be++) {
          if (tt) {
            if (Pe) {
              t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, 0, 0, 0, Re[be].width, Re[be].height, We, Ge, Re[be].data);
            } else {
              t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, 0, qe, Re[be].width, Re[be].height, 0, We, Ge, Re[be].data);
            }
            for (let ze = 0; ze < Ne.length; ze++) {
              const at = Ne[ze].image[be].image;
              if (Pe) {
                t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze + 1, 0, 0, at.width, at.height, We, Ge, at.data);
              } else {
                t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze + 1, qe, at.width, at.height, 0, We, Ge, at.data);
              }
            }
          } else {
            if (Pe) {
              t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, 0, 0, 0, We, Ge, Re[be]);
            } else {
              t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, 0, qe, We, Ge, Re[be]);
            }
            for (let ze = 0; ze < Ne.length; ze++) {
              const Je = Ne[ze];
              if (Pe) {
                t.texSubImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze + 1, 0, 0, We, Ge, Je.image[be]);
              } else {
                t.texImage2D(o.TEXTURE_CUBE_MAP_POSITIVE_X + be, ze + 1, qe, We, Ge, Je.image[be]);
              }
            }
          }
        }
      }
      if (I(O, je)) {
        F(o.TEXTURE_CUBE_MAP);
      }
      Y.__version = Le.version;
      if (O.onUpdate) {
        O.onUpdate(O);
      }
    }
    W.__version = O.version;
  }
  function xe(W, O, me, Ie, Le, Y) {
    const we = a.convert(me.format, me.colorSpace);
    const Ee = a.convert(me.type);
    const Fe = k(me.internalFormat, we, Ee, me.colorSpace);
    if (!r.get(O).__hasExternalTextures) {
      const tt = Math.max(1, O.width >> Y);
      const Re = Math.max(1, O.height >> Y);
      if (Le === o.TEXTURE_3D || Le === o.TEXTURE_2D_ARRAY) {
        t.texImage3D(Le, Y, Fe, tt, Re, O.depth, 0, we, Ee, null);
      } else {
        t.texImage2D(Le, Y, Fe, tt, Re, 0, we, Ee, null);
      }
    }
    t.bindFramebuffer(o.FRAMEBUFFER, W);
    if (Oe(O)) {
      v.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, Ie, Le, r.get(me).__webglTexture, 0, $(O));
    } else if (Le === o.TEXTURE_2D || Le >= o.TEXTURE_CUBE_MAP_POSITIVE_X && Le <= o.TEXTURE_CUBE_MAP_NEGATIVE_Z) {
      o.framebufferTexture2D(o.FRAMEBUFFER, Ie, Le, r.get(me).__webglTexture, Y);
    }
    t.bindFramebuffer(o.FRAMEBUFFER, null);
  }
  function ee(W, O, me) {
    o.bindRenderbuffer(o.RENDERBUFFER, W);
    if (O.depthBuffer && !O.stencilBuffer) {
      let Ie = c === true ? o.DEPTH_COMPONENT24 : o.DEPTH_COMPONENT16;
      if (me || Oe(O)) {
        const Le = O.depthTexture;
        if (Le && Le.isDepthTexture) {
          if (Le.type === FloatType) {
            Ie = o.DEPTH_COMPONENT32F;
          } else if (Le.type === UnsignedIntType) {
            Ie = o.DEPTH_COMPONENT24;
          }
        }
        const Y = $(O);
        if (Oe(O)) {
          v.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, Y, Ie, O.width, O.height);
        } else {
          o.renderbufferStorageMultisample(o.RENDERBUFFER, Y, Ie, O.width, O.height);
        }
      } else {
        o.renderbufferStorage(o.RENDERBUFFER, Ie, O.width, O.height);
      }
      o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_ATTACHMENT, o.RENDERBUFFER, W);
    } else if (O.depthBuffer && O.stencilBuffer) {
      const Ie = $(O);
      if (me && Oe(O) === false) {
        o.renderbufferStorageMultisample(o.RENDERBUFFER, Ie, o.DEPTH24_STENCIL8, O.width, O.height);
      } else if (Oe(O)) {
        v.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, Ie, o.DEPTH24_STENCIL8, O.width, O.height);
      } else {
        o.renderbufferStorage(o.RENDERBUFFER, o.DEPTH_STENCIL, O.width, O.height);
      }
      o.framebufferRenderbuffer(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.RENDERBUFFER, W);
    } else {
      const Ie = O.isWebGLMultipleRenderTargets === true ? O.texture : [O.texture];
      for (let Le = 0; Le < Ie.length; Le++) {
        const Y = Ie[Le];
        const we = a.convert(Y.format, Y.colorSpace);
        const Ee = a.convert(Y.type);
        const Fe = k(Y.internalFormat, we, Ee, Y.colorSpace);
        const Xe = $(O);
        if (me && Oe(O) === false) {
          o.renderbufferStorageMultisample(o.RENDERBUFFER, Xe, Fe, O.width, O.height);
        } else if (Oe(O)) {
          v.renderbufferStorageMultisampleEXT(o.RENDERBUFFER, Xe, Fe, O.width, O.height);
        } else {
          o.renderbufferStorage(o.RENDERBUFFER, Fe, O.width, O.height);
        }
      }
    }
    o.bindRenderbuffer(o.RENDERBUFFER, null);
  }
  function Ue(W, O) {
    if (O && O.isWebGLCubeRenderTarget) {
      throw new Error("Depth Texture with cube render targets is not supported");
    }
    t.bindFramebuffer(o.FRAMEBUFFER, W);
    if (!O.depthTexture || !O.depthTexture.isDepthTexture) {
      throw new Error("renderTarget.depthTexture must be an instance of THREE.DepthTexture");
    }
    if (!r.get(O.depthTexture).__webglTexture || O.depthTexture.image.width !== O.width || O.depthTexture.image.height !== O.height) {
      O.depthTexture.image.width = O.width;
      O.depthTexture.image.height = O.height;
      O.depthTexture.needsUpdate = true;
    }
    oe(O.depthTexture, 0);
    const Ie = r.get(O.depthTexture).__webglTexture;
    const Le = $(O);
    if (O.depthTexture.format === DepthFormat) {
      if (Oe(O)) {
        v.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, o.DEPTH_ATTACHMENT, o.TEXTURE_2D, Ie, 0, Le);
      } else {
        o.framebufferTexture2D(o.FRAMEBUFFER, o.DEPTH_ATTACHMENT, o.TEXTURE_2D, Ie, 0);
      }
    } else if (O.depthTexture.format === DepthStencilFormat) {
      if (Oe(O)) {
        v.framebufferTexture2DMultisampleEXT(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.TEXTURE_2D, Ie, 0, Le);
      } else {
        o.framebufferTexture2D(o.FRAMEBUFFER, o.DEPTH_STENCIL_ATTACHMENT, o.TEXTURE_2D, Ie, 0);
      }
    } else {
      throw new Error("Unknown depthTexture format");
    }
  }
  function fe(W) {
    const O = r.get(W);
    const me = W.isWebGLCubeRenderTarget === true;
    if (W.depthTexture && !O.__autoAllocateDepthBuffer) {
      if (me) {
        throw new Error("target.depthTexture not supported in Cube render targets");
      }
      Ue(O.__webglFramebuffer, W);
    } else if (me) {
      O.__webglDepthbuffer = [];
      for (let Ie = 0; Ie < 6; Ie++) {
        t.bindFramebuffer(o.FRAMEBUFFER, O.__webglFramebuffer[Ie]);
        O.__webglDepthbuffer[Ie] = o.createRenderbuffer();
        ee(O.__webglDepthbuffer[Ie], W, false);
      }
    } else {
      t.bindFramebuffer(o.FRAMEBUFFER, O.__webglFramebuffer);
      O.__webglDepthbuffer = o.createRenderbuffer();
      ee(O.__webglDepthbuffer, W, false);
    }
    t.bindFramebuffer(o.FRAMEBUFFER, null);
  }
  function Se(W, O, me) {
    const Ie = r.get(W);
    if (O !== undefined) {
      xe(Ie.__webglFramebuffer, W, W.texture, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, 0);
    }
    if (me !== undefined) {
      fe(W);
    }
  }
  function Me(W) {
    const O = W.texture;
    const me = r.get(W);
    const Ie = r.get(O);
    W.addEventListener("dispose", re);
    if (W.isWebGLMultipleRenderTargets !== true) {
      if (Ie.__webglTexture === undefined) {
        Ie.__webglTexture = o.createTexture();
      }
      Ie.__version = O.version;
      l.memory.textures++;
    }
    const Le = W.isWebGLCubeRenderTarget === true;
    const Y = W.isWebGLMultipleRenderTargets === true;
    const we = R(W) || c;
    if (Le) {
      me.__webglFramebuffer = [];
      for (let Ee = 0; Ee < 6; Ee++) {
        if (c && O.mipmaps && O.mipmaps.length > 0) {
          me.__webglFramebuffer[Ee] = [];
          for (let Fe = 0; Fe < O.mipmaps.length; Fe++) {
            me.__webglFramebuffer[Ee][Fe] = o.createFramebuffer();
          }
        } else {
          me.__webglFramebuffer[Ee] = o.createFramebuffer();
        }
      }
    } else {
      if (c && O.mipmaps && O.mipmaps.length > 0) {
        me.__webglFramebuffer = [];
        for (let Ee = 0; Ee < O.mipmaps.length; Ee++) {
          me.__webglFramebuffer[Ee] = o.createFramebuffer();
        }
      } else {
        me.__webglFramebuffer = o.createFramebuffer();
      }
      if (Y) {
        if (n.drawBuffers) {
          const Ee = W.texture;
          for (let Fe = 0, Xe = Ee.length; Fe < Xe; Fe++) {
            const tt = r.get(Ee[Fe]);
            if (tt.__webglTexture === undefined) {
              tt.__webglTexture = o.createTexture();
              l.memory.textures++;
            }
          }
        } else {
          console.warn("THREE.WebGLRenderer: WebGLMultipleRenderTargets can only be used with WebGL2 or WEBGL_draw_buffers extension.");
        }
      }
      if (c && W.samples > 0 && Oe(W) === false) {
        const Ee = Y ? O : [O];
        me.__webglMultisampledFramebuffer = o.createFramebuffer();
        me.__webglColorRenderbuffer = [];
        t.bindFramebuffer(o.FRAMEBUFFER, me.__webglMultisampledFramebuffer);
        for (let Fe = 0; Fe < Ee.length; Fe++) {
          const Xe = Ee[Fe];
          me.__webglColorRenderbuffer[Fe] = o.createRenderbuffer();
          o.bindRenderbuffer(o.RENDERBUFFER, me.__webglColorRenderbuffer[Fe]);
          const tt = a.convert(Xe.format, Xe.colorSpace);
          const Re = a.convert(Xe.type);
          const ot = k(Xe.internalFormat, tt, Re, Xe.colorSpace, W.isXRRenderTarget === true);
          const je = $(W);
          o.renderbufferStorageMultisample(o.RENDERBUFFER, je, ot, W.width, W.height);
          o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + Fe, o.RENDERBUFFER, me.__webglColorRenderbuffer[Fe]);
        }
        o.bindRenderbuffer(o.RENDERBUFFER, null);
        if (W.depthBuffer) {
          me.__webglDepthRenderbuffer = o.createRenderbuffer();
          ee(me.__webglDepthRenderbuffer, W, true);
        }
        t.bindFramebuffer(o.FRAMEBUFFER, null);
      }
    }
    if (Le) {
      t.bindTexture(o.TEXTURE_CUBE_MAP, Ie.__webglTexture);
      N(o.TEXTURE_CUBE_MAP, O, we);
      for (let Ee = 0; Ee < 6; Ee++) {
        if (c && O.mipmaps && O.mipmaps.length > 0) {
          for (let Fe = 0; Fe < O.mipmaps.length; Fe++) {
            xe(me.__webglFramebuffer[Ee][Fe], W, O, o.COLOR_ATTACHMENT0, o.TEXTURE_CUBE_MAP_POSITIVE_X + Ee, Fe);
          }
        } else {
          xe(me.__webglFramebuffer[Ee], W, O, o.COLOR_ATTACHMENT0, o.TEXTURE_CUBE_MAP_POSITIVE_X + Ee, 0);
        }
      }
      if (I(O, we)) {
        F(o.TEXTURE_CUBE_MAP);
      }
      t.unbindTexture();
    } else if (Y) {
      const Ee = W.texture;
      for (let Fe = 0, Xe = Ee.length; Fe < Xe; Fe++) {
        const tt = Ee[Fe];
        const Re = r.get(tt);
        t.bindTexture(o.TEXTURE_2D, Re.__webglTexture);
        N(o.TEXTURE_2D, tt, we);
        xe(me.__webglFramebuffer, W, tt, o.COLOR_ATTACHMENT0 + Fe, o.TEXTURE_2D, 0);
        if (I(tt, we)) {
          F(o.TEXTURE_2D);
        }
      }
      t.unbindTexture();
    } else {
      let Ee = o.TEXTURE_2D;
      if (W.isWebGL3DRenderTarget || W.isWebGLArrayRenderTarget) {
        if (c) {
          Ee = W.isWebGL3DRenderTarget ? o.TEXTURE_3D : o.TEXTURE_2D_ARRAY;
        } else {
          console.error("THREE.WebGLTextures: THREE.Data3DTexture and THREE.DataArrayTexture only supported with WebGL2.");
        }
      }
      t.bindTexture(Ee, Ie.__webglTexture);
      N(Ee, O, we);
      if (c && O.mipmaps && O.mipmaps.length > 0) {
        for (let Fe = 0; Fe < O.mipmaps.length; Fe++) {
          xe(me.__webglFramebuffer[Fe], W, O, o.COLOR_ATTACHMENT0, Ee, Fe);
        }
      } else {
        xe(me.__webglFramebuffer, W, O, o.COLOR_ATTACHMENT0, Ee, 0);
      }
      if (I(O, we)) {
        F(Ee);
      }
      t.unbindTexture();
    }
    if (W.depthBuffer) {
      fe(W);
    }
  }
  function Be(W) {
    const O = R(W) || c;
    const me = W.isWebGLMultipleRenderTargets === true ? W.texture : [W.texture];
    for (let Ie = 0, Le = me.length; Ie < Le; Ie++) {
      const Y = me[Ie];
      if (I(Y, O)) {
        const we = W.isWebGLCubeRenderTarget ? o.TEXTURE_CUBE_MAP : o.TEXTURE_2D;
        const Ee = r.get(Y).__webglTexture;
        t.bindTexture(we, Ee);
        F(we);
        t.unbindTexture();
      }
    }
  }
  function se(W) {
    if (c && W.samples > 0 && Oe(W) === false) {
      const O = W.isWebGLMultipleRenderTargets ? W.texture : [W.texture];
      const me = W.width;
      const Ie = W.height;
      let Le = o.COLOR_BUFFER_BIT;
      const Y = [];
      const we = W.stencilBuffer ? o.DEPTH_STENCIL_ATTACHMENT : o.DEPTH_ATTACHMENT;
      const Ee = r.get(W);
      const Fe = W.isWebGLMultipleRenderTargets === true;
      if (Fe) {
        for (let Xe = 0; Xe < O.length; Xe++) {
          t.bindFramebuffer(o.FRAMEBUFFER, Ee.__webglMultisampledFramebuffer);
          o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + Xe, o.RENDERBUFFER, null);
          t.bindFramebuffer(o.FRAMEBUFFER, Ee.__webglFramebuffer);
          o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0 + Xe, o.TEXTURE_2D, null, 0);
        }
      }
      t.bindFramebuffer(o.READ_FRAMEBUFFER, Ee.__webglMultisampledFramebuffer);
      t.bindFramebuffer(o.DRAW_FRAMEBUFFER, Ee.__webglFramebuffer);
      for (let Xe = 0; Xe < O.length; Xe++) {
        Y.push(o.COLOR_ATTACHMENT0 + Xe);
        if (W.depthBuffer) {
          Y.push(we);
        }
        const tt = Ee.__ignoreDepthValues !== undefined ? Ee.__ignoreDepthValues : false;
        if (tt === false) {
          if (W.depthBuffer) {
            Le |= o.DEPTH_BUFFER_BIT;
          }
          if (W.stencilBuffer) {
            Le |= o.STENCIL_BUFFER_BIT;
          }
        }
        if (Fe) {
          o.framebufferRenderbuffer(o.READ_FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.RENDERBUFFER, Ee.__webglColorRenderbuffer[Xe]);
        }
        if (tt === true) {
          o.invalidateFramebuffer(o.READ_FRAMEBUFFER, [we]);
          o.invalidateFramebuffer(o.DRAW_FRAMEBUFFER, [we]);
        }
        if (Fe) {
          const Re = r.get(O[Xe]).__webglTexture;
          o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0, o.TEXTURE_2D, Re, 0);
        }
        o.blitFramebuffer(0, 0, me, Ie, 0, 0, me, Ie, Le, o.NEAREST);
        if (_) {
          o.invalidateFramebuffer(o.READ_FRAMEBUFFER, Y);
        }
      }
      t.bindFramebuffer(o.READ_FRAMEBUFFER, null);
      t.bindFramebuffer(o.DRAW_FRAMEBUFFER, null);
      if (Fe) {
        for (let Xe = 0; Xe < O.length; Xe++) {
          t.bindFramebuffer(o.FRAMEBUFFER, Ee.__webglMultisampledFramebuffer);
          o.framebufferRenderbuffer(o.FRAMEBUFFER, o.COLOR_ATTACHMENT0 + Xe, o.RENDERBUFFER, Ee.__webglColorRenderbuffer[Xe]);
          const tt = r.get(O[Xe]).__webglTexture;
          t.bindFramebuffer(o.FRAMEBUFFER, Ee.__webglFramebuffer);
          o.framebufferTexture2D(o.DRAW_FRAMEBUFFER, o.COLOR_ATTACHMENT0 + Xe, o.TEXTURE_2D, tt, 0);
        }
      }
      t.bindFramebuffer(o.DRAW_FRAMEBUFFER, Ee.__webglMultisampledFramebuffer);
    }
  }
  function $(W) {
    return Math.min(g, W.samples);
  }
  function Oe(W) {
    const O = r.get(W);
    return c && W.samples > 0 && e.has("WEBGL_multisampled_render_to_texture") === true && O.__useRenderToTexture !== false;
  }
  function Ye(W) {
    const O = l.render.frame;
    if (T.get(W) !== O) {
      T.set(W, O);
      W.update();
    }
  }
  function st(W, O) {
    const me = W.colorSpace;
    const Ie = W.format;
    const Le = W.type;
    if (W.isCompressedTexture !== true && W.isVideoTexture !== true && W.format !== _SRGBAFormat) {
      if (me !== LinearSRGBColorSpace && me !== NoColorSpace) {
        if (ColorManagement.getTransfer(me) === SRGBTransfer) {
          if (c === false) {
            if (e.has("EXT_sRGB") === true && Ie === RGBAFormat) {
              W.format = _SRGBAFormat;
              W.minFilter = LinearFilter;
              W.generateMipmaps = false;
            } else {
              O = ImageUtils.sRGBToLinear(O);
            }
          } else if (Ie !== RGBAFormat || Le !== UnsignedByteType) {
            console.warn("THREE.WebGLTextures: sRGB encoded textures have to use RGBAFormat and UnsignedByteType.");
          }
        } else {
          console.error("THREE.WebGLTextures: Unsupported texture color space:", me);
        }
      }
    }
    return O;
  }
  this.allocateTextureUnit = q;
  this.resetTextureUnits = Z;
  this.setTexture2D = oe;
  this.setTexture2DArray = te;
  this.setTexture3D = le;
  this.setTextureCube = Te;
  this.rebindTextures = Se;
  this.setupRenderTarget = Me;
  this.updateRenderTargetMipmap = Be;
  this.updateMultisampleRenderTarget = se;
  this.setupDepthRenderbuffer = fe;
  this.setupFrameBufferTexture = xe;
  this.useMultisampledRTT = Oe;
}
function WebGLUtils(o, e, t) {
  const r = t.isWebGL2;
  function n(a, l = NoColorSpace) {
    let c;
    const u = ColorManagement.getTransfer(l);
    if (a === UnsignedByteType) {
      return o.UNSIGNED_BYTE;
    }
    if (a === UnsignedShort4444Type) {
      return o.UNSIGNED_SHORT_4_4_4_4;
    }
    if (a === UnsignedShort5551Type) {
      return o.UNSIGNED_SHORT_5_5_5_1;
    }
    if (a === ByteType) {
      return o.BYTE;
    }
    if (a === ShortType) {
      return o.SHORT;
    }
    if (a === UnsignedShortType) {
      return o.UNSIGNED_SHORT;
    }
    if (a === IntType) {
      return o.INT;
    }
    if (a === UnsignedIntType) {
      return o.UNSIGNED_INT;
    }
    if (a === FloatType) {
      return o.FLOAT;
    }
    if (a === HalfFloatType) {
      if (r) {
        return o.HALF_FLOAT;
      } else {
        c = e.get("OES_texture_half_float");
        if (c !== null) {
          return c.HALF_FLOAT_OES;
        } else {
          return null;
        }
      }
    }
    if (a === AlphaFormat) {
      return o.ALPHA;
    }
    if (a === RGBAFormat) {
      return o.RGBA;
    }
    if (a === LuminanceFormat) {
      return o.LUMINANCE;
    }
    if (a === LuminanceAlphaFormat) {
      return o.LUMINANCE_ALPHA;
    }
    if (a === DepthFormat) {
      return o.DEPTH_COMPONENT;
    }
    if (a === DepthStencilFormat) {
      return o.DEPTH_STENCIL;
    }
    if (a === _SRGBAFormat) {
      c = e.get("EXT_sRGB");
      if (c !== null) {
        return c.SRGB_ALPHA_EXT;
      } else {
        return null;
      }
    }
    if (a === RedFormat) {
      return o.RED;
    }
    if (a === RedIntegerFormat) {
      return o.RED_INTEGER;
    }
    if (a === RGFormat) {
      return o.RG;
    }
    if (a === RGIntegerFormat) {
      return o.RG_INTEGER;
    }
    if (a === RGBAIntegerFormat) {
      return o.RGBA_INTEGER;
    }
    if (a === RGB_S3TC_DXT1_Format || a === RGBA_S3TC_DXT1_Format || a === RGBA_S3TC_DXT3_Format || a === RGBA_S3TC_DXT5_Format) {
      if (u === SRGBTransfer) {
        c = e.get("WEBGL_compressed_texture_s3tc_srgb");
        if (c !== null) {
          if (a === RGB_S3TC_DXT1_Format) {
            return c.COMPRESSED_SRGB_S3TC_DXT1_EXT;
          }
          if (a === RGBA_S3TC_DXT1_Format) {
            return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT1_EXT;
          }
          if (a === RGBA_S3TC_DXT3_Format) {
            return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT3_EXT;
          }
          if (a === RGBA_S3TC_DXT5_Format) {
            return c.COMPRESSED_SRGB_ALPHA_S3TC_DXT5_EXT;
          }
        } else {
          return null;
        }
      } else {
        c = e.get("WEBGL_compressed_texture_s3tc");
        if (c !== null) {
          if (a === RGB_S3TC_DXT1_Format) {
            return c.COMPRESSED_RGB_S3TC_DXT1_EXT;
          }
          if (a === RGBA_S3TC_DXT1_Format) {
            return c.COMPRESSED_RGBA_S3TC_DXT1_EXT;
          }
          if (a === RGBA_S3TC_DXT3_Format) {
            return c.COMPRESSED_RGBA_S3TC_DXT3_EXT;
          }
          if (a === RGBA_S3TC_DXT5_Format) {
            return c.COMPRESSED_RGBA_S3TC_DXT5_EXT;
          }
        } else {
          return null;
        }
      }
    }
    if (a === RGB_PVRTC_4BPPV1_Format || a === RGB_PVRTC_2BPPV1_Format || a === RGBA_PVRTC_4BPPV1_Format || a === RGBA_PVRTC_2BPPV1_Format) {
      c = e.get("WEBGL_compressed_texture_pvrtc");
      if (c !== null) {
        if (a === RGB_PVRTC_4BPPV1_Format) {
          return c.COMPRESSED_RGB_PVRTC_4BPPV1_IMG;
        }
        if (a === RGB_PVRTC_2BPPV1_Format) {
          return c.COMPRESSED_RGB_PVRTC_2BPPV1_IMG;
        }
        if (a === RGBA_PVRTC_4BPPV1_Format) {
          return c.COMPRESSED_RGBA_PVRTC_4BPPV1_IMG;
        }
        if (a === RGBA_PVRTC_2BPPV1_Format) {
          return c.COMPRESSED_RGBA_PVRTC_2BPPV1_IMG;
        }
      } else {
        return null;
      }
    }
    if (a === RGB_ETC1_Format) {
      c = e.get("WEBGL_compressed_texture_etc1");
      if (c !== null) {
        return c.COMPRESSED_RGB_ETC1_WEBGL;
      } else {
        return null;
      }
    }
    if (a === RGB_ETC2_Format || a === RGBA_ETC2_EAC_Format) {
      c = e.get("WEBGL_compressed_texture_etc");
      if (c !== null) {
        if (a === RGB_ETC2_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ETC2;
          } else {
            return c.COMPRESSED_RGB8_ETC2;
          }
        }
        if (a === RGBA_ETC2_EAC_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ETC2_EAC;
          } else {
            return c.COMPRESSED_RGBA8_ETC2_EAC;
          }
        }
      } else {
        return null;
      }
    }
    if (a === RGBA_ASTC_4x4_Format || a === RGBA_ASTC_5x4_Format || a === RGBA_ASTC_5x5_Format || a === RGBA_ASTC_6x5_Format || a === RGBA_ASTC_6x6_Format || a === RGBA_ASTC_8x5_Format || a === RGBA_ASTC_8x6_Format || a === RGBA_ASTC_8x8_Format || a === RGBA_ASTC_10x5_Format || a === RGBA_ASTC_10x6_Format || a === RGBA_ASTC_10x8_Format || a === RGBA_ASTC_10x10_Format || a === RGBA_ASTC_12x10_Format || a === RGBA_ASTC_12x12_Format) {
      c = e.get("WEBGL_compressed_texture_astc");
      if (c !== null) {
        if (a === RGBA_ASTC_4x4_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_4x4_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_4x4_KHR;
          }
        }
        if (a === RGBA_ASTC_5x4_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x4_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_5x4_KHR;
          }
        }
        if (a === RGBA_ASTC_5x5_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_5x5_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_5x5_KHR;
          }
        }
        if (a === RGBA_ASTC_6x5_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x5_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_6x5_KHR;
          }
        }
        if (a === RGBA_ASTC_6x6_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_6x6_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_6x6_KHR;
          }
        }
        if (a === RGBA_ASTC_8x5_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x5_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_8x5_KHR;
          }
        }
        if (a === RGBA_ASTC_8x6_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x6_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_8x6_KHR;
          }
        }
        if (a === RGBA_ASTC_8x8_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_8x8_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_8x8_KHR;
          }
        }
        if (a === RGBA_ASTC_10x5_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x5_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_10x5_KHR;
          }
        }
        if (a === RGBA_ASTC_10x6_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x6_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_10x6_KHR;
          }
        }
        if (a === RGBA_ASTC_10x8_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x8_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_10x8_KHR;
          }
        }
        if (a === RGBA_ASTC_10x10_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_10x10_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_10x10_KHR;
          }
        }
        if (a === RGBA_ASTC_12x10_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x10_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_12x10_KHR;
          }
        }
        if (a === RGBA_ASTC_12x12_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB8_ALPHA8_ASTC_12x12_KHR;
          } else {
            return c.COMPRESSED_RGBA_ASTC_12x12_KHR;
          }
        }
      } else {
        return null;
      }
    }
    if (a === RGBA_BPTC_Format || a === RGB_BPTC_SIGNED_Format || a === RGB_BPTC_UNSIGNED_Format) {
      c = e.get("EXT_texture_compression_bptc");
      if (c !== null) {
        if (a === RGBA_BPTC_Format) {
          if (u === SRGBTransfer) {
            return c.COMPRESSED_SRGB_ALPHA_BPTC_UNORM_EXT;
          } else {
            return c.COMPRESSED_RGBA_BPTC_UNORM_EXT;
          }
        }
        if (a === RGB_BPTC_SIGNED_Format) {
          return c.COMPRESSED_RGB_BPTC_SIGNED_FLOAT_EXT;
        }
        if (a === RGB_BPTC_UNSIGNED_Format) {
          return c.COMPRESSED_RGB_BPTC_UNSIGNED_FLOAT_EXT;
        }
      } else {
        return null;
      }
    }
    if (a === RED_RGTC1_Format || a === SIGNED_RED_RGTC1_Format || a === RED_GREEN_RGTC2_Format || a === SIGNED_RED_GREEN_RGTC2_Format) {
      c = e.get("EXT_texture_compression_rgtc");
      if (c !== null) {
        if (a === RGBA_BPTC_Format) {
          return c.COMPRESSED_RED_RGTC1_EXT;
        }
        if (a === SIGNED_RED_RGTC1_Format) {
          return c.COMPRESSED_SIGNED_RED_RGTC1_EXT;
        }
        if (a === RED_GREEN_RGTC2_Format) {
          return c.COMPRESSED_RED_GREEN_RGTC2_EXT;
        }
        if (a === SIGNED_RED_GREEN_RGTC2_Format) {
          return c.COMPRESSED_SIGNED_RED_GREEN_RGTC2_EXT;
        }
      } else {
        return null;
      }
    }
    if (a === UnsignedInt248Type) {
      if (r) {
        return o.UNSIGNED_INT_24_8;
      } else {
        c = e.get("WEBGL_depth_texture");
        if (c !== null) {
          return c.UNSIGNED_INT_24_8_WEBGL;
        } else {
          return null;
        }
      }
    } else if (o[a] !== undefined) {
      return o[a];
    } else {
      return null;
    }
  }
  return {
    convert: n
  };
}
class ArrayCamera extends PerspectiveCamera {
  constructor(e = []) {
    super();
    this.isArrayCamera = true;
    this.cameras = e;
  }
}
class Group extends Object3D {
  constructor() {
    super();
    this.isGroup = true;
    this.type = "Group";
  }
}
const _moveEvent = {
  type: "move"
};
class WebXRController {
  constructor() {
    this._targetRay = null;
    this._grip = null;
    this._hand = null;
  }
  getHandSpace() {
    if (this._hand === null) {
      this._hand = new Group();
      this._hand.matrixAutoUpdate = false;
      this._hand.visible = false;
      this._hand.joints = {};
      this._hand.inputState = {
        pinching: false
      };
    }
    return this._hand;
  }
  getTargetRaySpace() {
    if (this._targetRay === null) {
      this._targetRay = new Group();
      this._targetRay.matrixAutoUpdate = false;
      this._targetRay.visible = false;
      this._targetRay.hasLinearVelocity = false;
      this._targetRay.linearVelocity = new Vector3();
      this._targetRay.hasAngularVelocity = false;
      this._targetRay.angularVelocity = new Vector3();
    }
    return this._targetRay;
  }
  getGripSpace() {
    if (this._grip === null) {
      this._grip = new Group();
      this._grip.matrixAutoUpdate = false;
      this._grip.visible = false;
      this._grip.hasLinearVelocity = false;
      this._grip.linearVelocity = new Vector3();
      this._grip.hasAngularVelocity = false;
      this._grip.angularVelocity = new Vector3();
    }
    return this._grip;
  }
  dispatchEvent(e) {
    if (this._targetRay !== null) {
      this._targetRay.dispatchEvent(e);
    }
    if (this._grip !== null) {
      this._grip.dispatchEvent(e);
    }
    if (this._hand !== null) {
      this._hand.dispatchEvent(e);
    }
    return this;
  }
  connect(e) {
    if (e && e.hand) {
      const t = this._hand;
      if (t) {
        for (const r of e.hand.values()) {
          this._getHandJoint(t, r);
        }
      }
    }
    this.dispatchEvent({
      type: "connected",
      data: e
    });
    return this;
  }
  disconnect(e) {
    this.dispatchEvent({
      type: "disconnected",
      data: e
    });
    if (this._targetRay !== null) {
      this._targetRay.visible = false;
    }
    if (this._grip !== null) {
      this._grip.visible = false;
    }
    if (this._hand !== null) {
      this._hand.visible = false;
    }
    return this;
  }
  update(e, t, r) {
    let n = null;
    let a = null;
    let l = null;
    const c = this._targetRay;
    const u = this._grip;
    const f = this._hand;
    if (e && t.session.visibilityState !== "visible-blurred") {
      if (f && e.hand) {
        l = true;
        for (const M of e.hand.values()) {
          const S = t.getJointPose(M, r);
          const b = this._getHandJoint(f, M);
          if (S !== null) {
            b.matrix.fromArray(S.transform.matrix);
            b.matrix.decompose(b.position, b.rotation, b.scale);
            b.matrixWorldNeedsUpdate = true;
            b.jointRadius = S.radius;
          }
          b.visible = S !== null;
        }
        const p = f.joints["index-finger-tip"];
        const g = f.joints["thumb-tip"];
        const v = p.position.distanceTo(g.position);
        const _ = 0.02;
        const T = 0.005;
        if (f.inputState.pinching && v > _ + T) {
          f.inputState.pinching = false;
          this.dispatchEvent({
            type: "pinchend",
            handedness: e.handedness,
            target: this
          });
        } else if (!f.inputState.pinching && v <= _ - T) {
          f.inputState.pinching = true;
          this.dispatchEvent({
            type: "pinchstart",
            handedness: e.handedness,
            target: this
          });
        }
      } else if (u !== null && e.gripSpace) {
        a = t.getPose(e.gripSpace, r);
        if (a !== null) {
          u.matrix.fromArray(a.transform.matrix);
          u.matrix.decompose(u.position, u.rotation, u.scale);
          u.matrixWorldNeedsUpdate = true;
          if (a.linearVelocity) {
            u.hasLinearVelocity = true;
            u.linearVelocity.copy(a.linearVelocity);
          } else {
            u.hasLinearVelocity = false;
          }
          if (a.angularVelocity) {
            u.hasAngularVelocity = true;
            u.angularVelocity.copy(a.angularVelocity);
          } else {
            u.hasAngularVelocity = false;
          }
        }
      }
      if (c !== null) {
        n = t.getPose(e.targetRaySpace, r);
        if (n === null && a !== null) {
          n = a;
        }
        if (n !== null) {
          c.matrix.fromArray(n.transform.matrix);
          c.matrix.decompose(c.position, c.rotation, c.scale);
          c.matrixWorldNeedsUpdate = true;
          if (n.linearVelocity) {
            c.hasLinearVelocity = true;
            c.linearVelocity.copy(n.linearVelocity);
          } else {
            c.hasLinearVelocity = false;
          }
          if (n.angularVelocity) {
            c.hasAngularVelocity = true;
            c.angularVelocity.copy(n.angularVelocity);
          } else {
            c.hasAngularVelocity = false;
          }
          this.dispatchEvent(_moveEvent);
        }
      }
    }
    if (c !== null) {
      c.visible = n !== null;
    }
    if (u !== null) {
      u.visible = a !== null;
    }
    if (f !== null) {
      f.visible = l !== null;
    }
    return this;
  }
  _getHandJoint(e, t) {
    if (e.joints[t.jointName] === undefined) {
      const r = new Group();
      r.matrixAutoUpdate = false;
      r.visible = false;
      e.joints[t.jointName] = r;
      e.add(r);
    }
    return e.joints[t.jointName];
  }
}
class DepthTexture extends Texture {
  constructor(e, t, r, n, a, l, c, u, f, p) {
    p = p !== undefined ? p : DepthFormat;
    if (p !== DepthFormat && p !== DepthStencilFormat) {
      throw new Error("DepthTexture format must be either THREE.DepthFormat or THREE.DepthStencilFormat");
    }
    if (r === undefined && p === DepthFormat) {
      r = UnsignedIntType;
    }
    if (r === undefined && p === DepthStencilFormat) {
      r = UnsignedInt248Type;
    }
    super(null, n, a, l, c, u, p, r, f);
    this.isDepthTexture = true;
    this.image = {
      width: e,
      height: t
    };
    this.magFilter = c !== undefined ? c : NearestFilter;
    this.minFilter = u !== undefined ? u : NearestFilter;
    this.flipY = false;
    this.generateMipmaps = false;
    this.compareFunction = null;
  }
  copy(e) {
    super.copy(e);
    this.compareFunction = e.compareFunction;
    return this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    if (this.compareFunction !== null) {
      t.compareFunction = this.compareFunction;
    }
    return t;
  }
}
class WebXRManager extends EventDispatcher {
  constructor(e, t) {
    super();
    const r = this;
    let n = null;
    let a = 1;
    let l = null;
    let c = "local-floor";
    let u = 1;
    let f = null;
    let p = null;
    let g = null;
    let v = null;
    let _ = null;
    let T = null;
    const M = t.getContextAttributes();
    let S = null;
    let b = null;
    const C = [];
    const w = [];
    const R = new PerspectiveCamera();
    R.layers.enable(1);
    R.viewport = new Vector4();
    const E = new PerspectiveCamera();
    E.layers.enable(2);
    E.viewport = new Vector4();
    const I = [R, E];
    const F = new ArrayCamera();
    F.layers.enable(1);
    F.layers.enable(2);
    let k = null;
    let L = null;
    this.cameraAutoUpdate = true;
    this.enabled = false;
    this.isPresenting = false;
    this.getController = function (te) {
      let le = C[te];
      if (le === undefined) {
        le = new WebXRController();
        C[te] = le;
      }
      return le.getTargetRaySpace();
    };
    this.getControllerGrip = function (te) {
      let le = C[te];
      if (le === undefined) {
        le = new WebXRController();
        C[te] = le;
      }
      return le.getGripSpace();
    };
    this.getHand = function (te) {
      let le = C[te];
      if (le === undefined) {
        le = new WebXRController();
        C[te] = le;
      }
      return le.getHandSpace();
    };
    function D(te) {
      const le = w.indexOf(te.inputSource);
      if (le === -1) {
        return;
      }
      const Te = C[le];
      if (Te !== undefined) {
        Te.update(te.inputSource, te.frame, f || l);
        Te.dispatchEvent({
          type: te.type,
          data: te.inputSource
        });
      }
    }
    function ne() {
      n.removeEventListener("select", D);
      n.removeEventListener("selectstart", D);
      n.removeEventListener("selectend", D);
      n.removeEventListener("squeeze", D);
      n.removeEventListener("squeezestart", D);
      n.removeEventListener("squeezeend", D);
      n.removeEventListener("end", ne);
      n.removeEventListener("inputsourceschange", re);
      for (let te = 0; te < C.length; te++) {
        const le = w[te];
        if (le !== null) {
          w[te] = null;
          C[te].disconnect(le);
        }
      }
      k = null;
      L = null;
      e.setRenderTarget(S);
      _ = null;
      v = null;
      g = null;
      n = null;
      b = null;
      oe.stop();
      r.isPresenting = false;
      r.dispatchEvent({
        type: "sessionend"
      });
    }
    this.setFramebufferScaleFactor = function (te) {
      a = te;
      if (r.isPresenting === true) {
        console.warn("THREE.WebXRManager: Cannot change framebuffer scale while presenting.");
      }
    };
    this.setReferenceSpaceType = function (te) {
      c = te;
      if (r.isPresenting === true) {
        console.warn("THREE.WebXRManager: Cannot change reference space type while presenting.");
      }
    };
    this.getReferenceSpace = function () {
      return f || l;
    };
    this.setReferenceSpace = function (te) {
      f = te;
    };
    this.getBaseLayer = function () {
      if (v !== null) {
        return v;
      } else {
        return _;
      }
    };
    this.getBinding = function () {
      return g;
    };
    this.getFrame = function () {
      return T;
    };
    this.getSession = function () {
      return n;
    };
    this.setSession = async function (te) {
      n = te;
      if (n !== null) {
        S = e.getRenderTarget();
        n.addEventListener("select", D);
        n.addEventListener("selectstart", D);
        n.addEventListener("selectend", D);
        n.addEventListener("squeeze", D);
        n.addEventListener("squeezestart", D);
        n.addEventListener("squeezeend", D);
        n.addEventListener("end", ne);
        n.addEventListener("inputsourceschange", re);
        if (M.xrCompatible !== true) {
          await t.makeXRCompatible();
        }
        if (n.renderState.layers === undefined || e.capabilities.isWebGL2 === false) {
          const le = {
            antialias: n.renderState.layers === undefined ? M.antialias : true,
            alpha: true,
            depth: M.depth,
            stencil: M.stencil,
            framebufferScaleFactor: a
          };
          _ = new XRWebGLLayer(n, t, le);
          n.updateRenderState({
            baseLayer: _
          });
          b = new WebGLRenderTarget(_.framebufferWidth, _.framebufferHeight, {
            format: RGBAFormat,
            type: UnsignedByteType,
            colorSpace: e.outputColorSpace,
            stencilBuffer: M.stencil
          });
        } else {
          let le = null;
          let Te = null;
          let K = null;
          if (M.depth) {
            K = M.stencil ? t.DEPTH24_STENCIL8 : t.DEPTH_COMPONENT24;
            le = M.stencil ? DepthStencilFormat : DepthFormat;
            Te = M.stencil ? UnsignedInt248Type : UnsignedIntType;
          }
          const G = {
            colorFormat: t.RGBA8,
            depthFormat: K,
            scaleFactor: a
          };
          g = new XRWebGLBinding(n, t);
          v = g.createProjectionLayer(G);
          n.updateRenderState({
            layers: [v]
          });
          b = new WebGLRenderTarget(v.textureWidth, v.textureHeight, {
            format: RGBAFormat,
            type: UnsignedByteType,
            depthTexture: new DepthTexture(v.textureWidth, v.textureHeight, Te, undefined, undefined, undefined, undefined, undefined, undefined, le),
            stencilBuffer: M.stencil,
            colorSpace: e.outputColorSpace,
            samples: M.antialias ? 4 : 0
          });
          const U = e.properties.get(b);
          U.__ignoreDepthValues = v.ignoreDepthValues;
        }
        b.isXRRenderTarget = true;
        this.setFoveation(u);
        f = null;
        l = await n.requestReferenceSpace(c);
        oe.setContext(n);
        oe.start();
        r.isPresenting = true;
        r.dispatchEvent({
          type: "sessionstart"
        });
      }
    };
    this.getEnvironmentBlendMode = function () {
      if (n !== null) {
        return n.environmentBlendMode;
      }
    };
    function re(te) {
      for (let le = 0; le < te.removed.length; le++) {
        const Te = te.removed[le];
        const K = w.indexOf(Te);
        if (K >= 0) {
          w[K] = null;
          C[K].disconnect(Te);
        }
      }
      for (let le = 0; le < te.added.length; le++) {
        const Te = te.added[le];
        let K = w.indexOf(Te);
        if (K === -1) {
          for (let U = 0; U < C.length; U++) {
            if (U >= w.length) {
              w.push(Te);
              K = U;
              break;
            } else if (w[U] === null) {
              w[U] = Te;
              K = U;
              break;
            }
          }
          if (K === -1) {
            break;
          }
        }
        const G = C[K];
        if (G) {
          G.connect(Te);
        }
      }
    }
    const ce = new Vector3();
    const z = new Vector3();
    function j(te, le, Te) {
      ce.setFromMatrixPosition(le.matrixWorld);
      z.setFromMatrixPosition(Te.matrixWorld);
      const K = ce.distanceTo(z);
      const G = le.projectionMatrix.elements;
      const U = Te.projectionMatrix.elements;
      const N = G[14] / (G[10] - 1);
      const he = G[14] / (G[10] + 1);
      const ve = (G[9] + 1) / G[5];
      const de = (G[9] - 1) / G[5];
      const xe = (G[8] - 1) / G[0];
      const ee = (U[8] + 1) / U[0];
      const Ue = N * xe;
      const fe = N * ee;
      const Se = K / (-xe + ee);
      const Me = Se * -xe;
      le.matrixWorld.decompose(te.position, te.quaternion, te.scale);
      te.translateX(Me);
      te.translateZ(Se);
      te.matrixWorld.compose(te.position, te.quaternion, te.scale);
      te.matrixWorldInverse.copy(te.matrixWorld).invert();
      const Be = N + Se;
      const se = he + Se;
      const $ = Ue - Me;
      const Oe = fe + (K - Me);
      const Ye = ve * he / se * Be;
      const st = de * he / se * Be;
      te.projectionMatrix.makePerspective($, Oe, Ye, st, Be, se);
      te.projectionMatrixInverse.copy(te.projectionMatrix).invert();
    }
    function X(te, le) {
      if (le === null) {
        te.matrixWorld.copy(te.matrix);
      } else {
        te.matrixWorld.multiplyMatrices(le.matrixWorld, te.matrix);
      }
      te.matrixWorldInverse.copy(te.matrixWorld).invert();
    }
    this.updateCamera = function (te) {
      if (n === null) {
        return;
      }
      F.near = E.near = R.near = te.near;
      F.far = E.far = R.far = te.far;
      if (k !== F.near || L !== F.far) {
        n.updateRenderState({
          depthNear: F.near,
          depthFar: F.far
        });
        k = F.near;
        L = F.far;
      }
      const le = te.parent;
      const Te = F.cameras;
      X(F, le);
      for (let K = 0; K < Te.length; K++) {
        X(Te[K], le);
      }
      if (Te.length === 2) {
        j(F, R, E);
      } else {
        F.projectionMatrix.copy(R.projectionMatrix);
      }
      Z(te, F, le);
    };
    function Z(te, le, Te) {
      if (Te === null) {
        te.matrix.copy(le.matrixWorld);
      } else {
        te.matrix.copy(Te.matrixWorld);
        te.matrix.invert();
        te.matrix.multiply(le.matrixWorld);
      }
      te.matrix.decompose(te.position, te.quaternion, te.scale);
      te.updateMatrixWorld(true);
      te.projectionMatrix.copy(le.projectionMatrix);
      te.projectionMatrixInverse.copy(le.projectionMatrixInverse);
      if (te.isPerspectiveCamera) {
        te.fov = RAD2DEG * 2 * Math.atan(1 / te.projectionMatrix.elements[5]);
        te.zoom = 1;
      }
    }
    this.getCamera = function () {
      return F;
    };
    this.getFoveation = function () {
      if (v !== null || _ !== null) {
        return u;
      }
    };
    this.setFoveation = function (te) {
      u = te;
      if (v !== null) {
        v.fixedFoveation = te;
      }
      if (_ !== null && _.fixedFoveation !== undefined) {
        _.fixedFoveation = te;
      }
    };
    let q = null;
    function ue(te, le) {
      p = le.getViewerPose(f || l);
      T = le;
      if (p !== null) {
        const Te = p.views;
        if (_ !== null) {
          e.setRenderTargetFramebuffer(b, _.framebuffer);
          e.setRenderTarget(b);
        }
        let K = false;
        if (Te.length !== F.cameras.length) {
          F.cameras.length = 0;
          K = true;
        }
        for (let G = 0; G < Te.length; G++) {
          const U = Te[G];
          let N = null;
          if (_ !== null) {
            N = _.getViewport(U);
          } else {
            const ve = g.getViewSubImage(v, U);
            N = ve.viewport;
            if (G === 0) {
              e.setRenderTargetTextures(b, ve.colorTexture, v.ignoreDepthValues ? undefined : ve.depthStencilTexture);
              e.setRenderTarget(b);
            }
          }
          let he = I[G];
          if (he === undefined) {
            he = new PerspectiveCamera();
            he.layers.enable(G);
            he.viewport = new Vector4();
            I[G] = he;
          }
          he.matrix.fromArray(U.transform.matrix);
          he.matrix.decompose(he.position, he.quaternion, he.scale);
          he.projectionMatrix.fromArray(U.projectionMatrix);
          he.projectionMatrixInverse.copy(he.projectionMatrix).invert();
          he.viewport.set(N.x, N.y, N.width, N.height);
          if (G === 0) {
            F.matrix.copy(he.matrix);
            F.matrix.decompose(F.position, F.quaternion, F.scale);
          }
          if (K === true) {
            F.cameras.push(he);
          }
        }
      }
      for (let Te = 0; Te < C.length; Te++) {
        const K = w[Te];
        const G = C[Te];
        if (K !== null && G !== undefined) {
          G.update(K, le, f || l);
        }
      }
      if (q) {
        q(te, le);
      }
      if (le.detectedPlanes) {
        r.dispatchEvent({
          type: "planesdetected",
          data: le
        });
      }
      T = null;
    }
    const oe = new WebGLAnimation();
    oe.setAnimationLoop(ue);
    this.setAnimationLoop = function (te) {
      q = te;
    };
    this.dispose = function () {};
  }
}
function WebGLMaterials(o, e) {
  function t(S, b) {
    if (S.matrixAutoUpdate === true) {
      S.updateMatrix();
    }
    b.value.copy(S.matrix);
  }
  function r(S, b) {
    b.color.getRGB(S.fogColor.value, getUnlitUniformColorSpace(o));
    if (b.isFog) {
      S.fogNear.value = b.near;
      S.fogFar.value = b.far;
    } else if (b.isFogExp2) {
      S.fogDensity.value = b.density;
    }
  }
  function n(S, b, C, w, R) {
    if (b.isMeshBasicMaterial || b.isMeshLambertMaterial) {
      a(S, b);
    } else if (b.isMeshToonMaterial) {
      a(S, b);
      g(S, b);
    } else if (b.isMeshPhongMaterial) {
      a(S, b);
      p(S, b);
    } else if (b.isMeshStandardMaterial) {
      a(S, b);
      v(S, b);
      if (b.isMeshPhysicalMaterial) {
        _(S, b, R);
      }
    } else if (b.isMeshMatcapMaterial) {
      a(S, b);
      T(S, b);
    } else if (b.isMeshDepthMaterial) {
      a(S, b);
    } else if (b.isMeshDistanceMaterial) {
      a(S, b);
      M(S, b);
    } else if (b.isMeshNormalMaterial) {
      a(S, b);
    } else if (b.isLineBasicMaterial) {
      l(S, b);
      if (b.isLineDashedMaterial) {
        c(S, b);
      }
    } else if (b.isPointsMaterial) {
      u(S, b, C, w);
    } else if (b.isSpriteMaterial) {
      f(S, b);
    } else if (b.isShadowMaterial) {
      S.color.value.copy(b.color);
      S.opacity.value = b.opacity;
    } else if (b.isShaderMaterial) {
      b.uniformsNeedUpdate = false;
    }
  }
  function a(S, b) {
    S.opacity.value = b.opacity;
    if (b.color) {
      S.diffuse.value.copy(b.color);
    }
    if (b.emissive) {
      S.emissive.value.copy(b.emissive).multiplyScalar(b.emissiveIntensity);
    }
    if (b.map) {
      S.map.value = b.map;
      t(b.map, S.mapTransform);
    }
    if (b.alphaMap) {
      S.alphaMap.value = b.alphaMap;
      t(b.alphaMap, S.alphaMapTransform);
    }
    if (b.bumpMap) {
      S.bumpMap.value = b.bumpMap;
      t(b.bumpMap, S.bumpMapTransform);
      S.bumpScale.value = b.bumpScale;
      if (b.side === BackSide) {
        S.bumpScale.value *= -1;
      }
    }
    if (b.normalMap) {
      S.normalMap.value = b.normalMap;
      t(b.normalMap, S.normalMapTransform);
      S.normalScale.value.copy(b.normalScale);
      if (b.side === BackSide) {
        S.normalScale.value.negate();
      }
    }
    if (b.displacementMap) {
      S.displacementMap.value = b.displacementMap;
      t(b.displacementMap, S.displacementMapTransform);
      S.displacementScale.value = b.displacementScale;
      S.displacementBias.value = b.displacementBias;
    }
    if (b.emissiveMap) {
      S.emissiveMap.value = b.emissiveMap;
      t(b.emissiveMap, S.emissiveMapTransform);
    }
    if (b.specularMap) {
      S.specularMap.value = b.specularMap;
      t(b.specularMap, S.specularMapTransform);
    }
    if (b.alphaTest > 0) {
      S.alphaTest.value = b.alphaTest;
    }
    const C = e.get(b).envMap;
    if (C) {
      S.envMap.value = C;
      S.flipEnvMap.value = C.isCubeTexture && C.isRenderTargetTexture === false ? -1 : 1;
      S.reflectivity.value = b.reflectivity;
      S.ior.value = b.ior;
      S.refractionRatio.value = b.refractionRatio;
    }
    if (b.lightMap) {
      S.lightMap.value = b.lightMap;
      const w = o._useLegacyLights === true ? Math.PI : 1;
      S.lightMapIntensity.value = b.lightMapIntensity * w;
      t(b.lightMap, S.lightMapTransform);
    }
    if (b.aoMap) {
      S.aoMap.value = b.aoMap;
      S.aoMapIntensity.value = b.aoMapIntensity;
      t(b.aoMap, S.aoMapTransform);
    }
  }
  function l(S, b) {
    S.diffuse.value.copy(b.color);
    S.opacity.value = b.opacity;
    if (b.map) {
      S.map.value = b.map;
      t(b.map, S.mapTransform);
    }
  }
  function c(S, b) {
    S.dashSize.value = b.dashSize;
    S.totalSize.value = b.dashSize + b.gapSize;
    S.scale.value = b.scale;
  }
  function u(S, b, C, w) {
    S.diffuse.value.copy(b.color);
    S.opacity.value = b.opacity;
    S.size.value = b.size * C;
    S.scale.value = w * 0.5;
    if (b.map) {
      S.map.value = b.map;
      t(b.map, S.uvTransform);
    }
    if (b.alphaMap) {
      S.alphaMap.value = b.alphaMap;
      t(b.alphaMap, S.alphaMapTransform);
    }
    if (b.alphaTest > 0) {
      S.alphaTest.value = b.alphaTest;
    }
  }
  function f(S, b) {
    S.diffuse.value.copy(b.color);
    S.opacity.value = b.opacity;
    S.rotation.value = b.rotation;
    if (b.map) {
      S.map.value = b.map;
      t(b.map, S.mapTransform);
    }
    if (b.alphaMap) {
      S.alphaMap.value = b.alphaMap;
      t(b.alphaMap, S.alphaMapTransform);
    }
    if (b.alphaTest > 0) {
      S.alphaTest.value = b.alphaTest;
    }
  }
  function p(S, b) {
    S.specular.value.copy(b.specular);
    S.shininess.value = Math.max(b.shininess, 0.0001);
  }
  function g(S, b) {
    if (b.gradientMap) {
      S.gradientMap.value = b.gradientMap;
    }
  }
  function v(S, b) {
    S.metalness.value = b.metalness;
    if (b.metalnessMap) {
      S.metalnessMap.value = b.metalnessMap;
      t(b.metalnessMap, S.metalnessMapTransform);
    }
    S.roughness.value = b.roughness;
    if (b.roughnessMap) {
      S.roughnessMap.value = b.roughnessMap;
      t(b.roughnessMap, S.roughnessMapTransform);
    }
    if (e.get(b).envMap) {
      S.envMapIntensity.value = b.envMapIntensity;
    }
  }
  function _(S, b, C) {
    S.ior.value = b.ior;
    if (b.sheen > 0) {
      S.sheenColor.value.copy(b.sheenColor).multiplyScalar(b.sheen);
      S.sheenRoughness.value = b.sheenRoughness;
      if (b.sheenColorMap) {
        S.sheenColorMap.value = b.sheenColorMap;
        t(b.sheenColorMap, S.sheenColorMapTransform);
      }
      if (b.sheenRoughnessMap) {
        S.sheenRoughnessMap.value = b.sheenRoughnessMap;
        t(b.sheenRoughnessMap, S.sheenRoughnessMapTransform);
      }
    }
    if (b.clearcoat > 0) {
      S.clearcoat.value = b.clearcoat;
      S.clearcoatRoughness.value = b.clearcoatRoughness;
      if (b.clearcoatMap) {
        S.clearcoatMap.value = b.clearcoatMap;
        t(b.clearcoatMap, S.clearcoatMapTransform);
      }
      if (b.clearcoatRoughnessMap) {
        S.clearcoatRoughnessMap.value = b.clearcoatRoughnessMap;
        t(b.clearcoatRoughnessMap, S.clearcoatRoughnessMapTransform);
      }
      if (b.clearcoatNormalMap) {
        S.clearcoatNormalMap.value = b.clearcoatNormalMap;
        t(b.clearcoatNormalMap, S.clearcoatNormalMapTransform);
        S.clearcoatNormalScale.value.copy(b.clearcoatNormalScale);
        if (b.side === BackSide) {
          S.clearcoatNormalScale.value.negate();
        }
      }
    }
    if (b.iridescence > 0) {
      S.iridescence.value = b.iridescence;
      S.iridescenceIOR.value = b.iridescenceIOR;
      S.iridescenceThicknessMinimum.value = b.iridescenceThicknessRange[0];
      S.iridescenceThicknessMaximum.value = b.iridescenceThicknessRange[1];
      if (b.iridescenceMap) {
        S.iridescenceMap.value = b.iridescenceMap;
        t(b.iridescenceMap, S.iridescenceMapTransform);
      }
      if (b.iridescenceThicknessMap) {
        S.iridescenceThicknessMap.value = b.iridescenceThicknessMap;
        t(b.iridescenceThicknessMap, S.iridescenceThicknessMapTransform);
      }
    }
    if (b.transmission > 0) {
      S.transmission.value = b.transmission;
      S.transmissionSamplerMap.value = C.texture;
      S.transmissionSamplerSize.value.set(C.width, C.height);
      if (b.transmissionMap) {
        S.transmissionMap.value = b.transmissionMap;
        t(b.transmissionMap, S.transmissionMapTransform);
      }
      S.thickness.value = b.thickness;
      if (b.thicknessMap) {
        S.thicknessMap.value = b.thicknessMap;
        t(b.thicknessMap, S.thicknessMapTransform);
      }
      S.attenuationDistance.value = b.attenuationDistance;
      S.attenuationColor.value.copy(b.attenuationColor);
    }
    if (b.anisotropy > 0) {
      S.anisotropyVector.value.set(b.anisotropy * Math.cos(b.anisotropyRotation), b.anisotropy * Math.sin(b.anisotropyRotation));
      if (b.anisotropyMap) {
        S.anisotropyMap.value = b.anisotropyMap;
        t(b.anisotropyMap, S.anisotropyMapTransform);
      }
    }
    S.specularIntensity.value = b.specularIntensity;
    S.specularColor.value.copy(b.specularColor);
    if (b.specularColorMap) {
      S.specularColorMap.value = b.specularColorMap;
      t(b.specularColorMap, S.specularColorMapTransform);
    }
    if (b.specularIntensityMap) {
      S.specularIntensityMap.value = b.specularIntensityMap;
      t(b.specularIntensityMap, S.specularIntensityMapTransform);
    }
  }
  function T(S, b) {
    if (b.matcap) {
      S.matcap.value = b.matcap;
    }
  }
  function M(S, b) {
    const C = e.get(b).light;
    S.referencePosition.value.setFromMatrixPosition(C.matrixWorld);
    S.nearDistance.value = C.shadow.camera.near;
    S.farDistance.value = C.shadow.camera.far;
  }
  return {
    refreshFogUniforms: r,
    refreshMaterialUniforms: n
  };
}
function WebGLUniformsGroups(o, e, t, r) {
  let n = {};
  let a = {};
  let l = [];
  const c = t.isWebGL2 ? o.getParameter(o.MAX_UNIFORM_BUFFER_BINDINGS) : 0;
  function u(C, w) {
    const R = w.program;
    r.uniformBlockBinding(C, R);
  }
  function f(C, w) {
    let R = n[C.id];
    if (R === undefined) {
      T(C);
      R = p(C);
      n[C.id] = R;
      C.addEventListener("dispose", S);
    }
    const E = w.program;
    r.updateUBOMapping(C, E);
    const I = e.render.frame;
    if (a[C.id] !== I) {
      v(C);
      a[C.id] = I;
    }
  }
  function p(C) {
    const w = g();
    C.__bindingPointIndex = w;
    const R = o.createBuffer();
    const E = C.__size;
    const I = C.usage;
    o.bindBuffer(o.UNIFORM_BUFFER, R);
    o.bufferData(o.UNIFORM_BUFFER, E, I);
    o.bindBuffer(o.UNIFORM_BUFFER, null);
    o.bindBufferBase(o.UNIFORM_BUFFER, w, R);
    return R;
  }
  function g() {
    for (let C = 0; C < c; C++) {
      if (l.indexOf(C) === -1) {
        l.push(C);
        return C;
      }
    }
    console.error("THREE.WebGLRenderer: Maximum number of simultaneously usable uniforms groups reached.");
    return 0;
  }
  function v(C) {
    const w = n[C.id];
    const R = C.uniforms;
    const E = C.__cache;
    o.bindBuffer(o.UNIFORM_BUFFER, w);
    for (let I = 0, F = R.length; I < F; I++) {
      const k = R[I];
      if (_(k, I, E) === true) {
        const L = k.__offset;
        const D = Array.isArray(k.value) ? k.value : [k.value];
        let ne = 0;
        for (let re = 0; re < D.length; re++) {
          const ce = D[re];
          const z = M(ce);
          if (typeof ce == "number") {
            k.__data[0] = ce;
            o.bufferSubData(o.UNIFORM_BUFFER, L + ne, k.__data);
          } else if (ce.isMatrix3) {
            k.__data[0] = ce.elements[0];
            k.__data[1] = ce.elements[1];
            k.__data[2] = ce.elements[2];
            k.__data[3] = ce.elements[0];
            k.__data[4] = ce.elements[3];
            k.__data[5] = ce.elements[4];
            k.__data[6] = ce.elements[5];
            k.__data[7] = ce.elements[0];
            k.__data[8] = ce.elements[6];
            k.__data[9] = ce.elements[7];
            k.__data[10] = ce.elements[8];
            k.__data[11] = ce.elements[0];
          } else {
            ce.toArray(k.__data, ne);
            ne += z.storage / Float32Array.BYTES_PER_ELEMENT;
          }
        }
        o.bufferSubData(o.UNIFORM_BUFFER, L, k.__data);
      }
    }
    o.bindBuffer(o.UNIFORM_BUFFER, null);
  }
  function _(C, w, R) {
    const E = C.value;
    if (R[w] === undefined) {
      if (typeof E == "number") {
        R[w] = E;
      } else {
        const I = Array.isArray(E) ? E : [E];
        const F = [];
        for (let k = 0; k < I.length; k++) {
          F.push(I[k].clone());
        }
        R[w] = F;
      }
      return true;
    } else if (typeof E == "number") {
      if (R[w] !== E) {
        R[w] = E;
        return true;
      }
    } else {
      const I = Array.isArray(R[w]) ? R[w] : [R[w]];
      const F = Array.isArray(E) ? E : [E];
      for (let k = 0; k < I.length; k++) {
        const L = I[k];
        if (L.equals(F[k]) === false) {
          L.copy(F[k]);
          return true;
        }
      }
    }
    return false;
  }
  function T(C) {
    const w = C.uniforms;
    let R = 0;
    const E = 16;
    let I = 0;
    for (let F = 0, k = w.length; F < k; F++) {
      const L = w[F];
      const D = {
        boundary: 0,
        storage: 0
      };
      const ne = Array.isArray(L.value) ? L.value : [L.value];
      for (let re = 0, ce = ne.length; re < ce; re++) {
        const z = ne[re];
        const j = M(z);
        D.boundary += j.boundary;
        D.storage += j.storage;
      }
      L.__data = new Float32Array(D.storage / Float32Array.BYTES_PER_ELEMENT);
      L.__offset = R;
      if (F > 0) {
        I = R % E;
        const re = E - I;
        if (I !== 0 && re - D.boundary < 0) {
          R += E - I;
          L.__offset = R;
        }
      }
      R += D.storage;
    }
    I = R % E;
    if (I > 0) {
      R += E - I;
    }
    C.__size = R;
    C.__cache = {};
    return this;
  }
  function M(C) {
    const w = {
      boundary: 0,
      storage: 0
    };
    if (typeof C == "number") {
      w.boundary = 4;
      w.storage = 4;
    } else if (C.isVector2) {
      w.boundary = 8;
      w.storage = 8;
    } else if (C.isVector3 || C.isColor) {
      w.boundary = 16;
      w.storage = 12;
    } else if (C.isVector4) {
      w.boundary = 16;
      w.storage = 16;
    } else if (C.isMatrix3) {
      w.boundary = 48;
      w.storage = 48;
    } else if (C.isMatrix4) {
      w.boundary = 64;
      w.storage = 64;
    } else if (C.isTexture) {
      console.warn("THREE.WebGLRenderer: Texture samplers can not be part of an uniforms group.");
    } else {
      console.warn("THREE.WebGLRenderer: Unsupported uniform value type.", C);
    }
    return w;
  }
  function S(C) {
    const w = C.target;
    w.removeEventListener("dispose", S);
    const R = l.indexOf(w.__bindingPointIndex);
    l.splice(R, 1);
    o.deleteBuffer(n[w.id]);
    delete n[w.id];
    delete a[w.id];
  }
  function b() {
    for (const C in n) {
      o.deleteBuffer(n[C]);
    }
    l = [];
    n = {};
    a = {};
  }
  return {
    bind: u,
    update: f,
    dispose: b
  };
}
class WebGLRenderer {
  constructor(e = {}) {
    const {
      canvas: t = createCanvasElement(),
      context: r = null,
      depth: n = true,
      stencil: a = true,
      alpha: l = false,
      antialias: c = false,
      premultipliedAlpha: u = true,
      preserveDrawingBuffer: f = false,
      powerPreference: p = "default",
      failIfMajorPerformanceCaveat: g = false
    } = e;
    this.isWebGLRenderer = true;
    let v;
    if (r !== null) {
      v = r.getContextAttributes().alpha;
    } else {
      v = l;
    }
    const _ = new Uint32Array(4);
    const T = new Int32Array(4);
    let M = null;
    let S = null;
    const b = [];
    const C = [];
    this.domElement = t;
    this.debug = {
      checkShaderErrors: true,
      onShaderError: null
    };
    this.autoClear = true;
    this.autoClearColor = true;
    this.autoClearDepth = true;
    this.autoClearStencil = true;
    this.sortObjects = true;
    this.clippingPlanes = [];
    this.localClippingEnabled = false;
    this._outputColorSpace = SRGBColorSpace;
    this._useLegacyLights = false;
    this.toneMapping = NoToneMapping;
    this.toneMappingExposure = 1;
    const w = this;
    let R = false;
    let E = 0;
    let I = 0;
    let F = null;
    let k = -1;
    let L = null;
    const D = new Vector4();
    const ne = new Vector4();
    let re = null;
    const ce = new Color(0);
    let z = 0;
    let j = t.width;
    let X = t.height;
    let Z = 1;
    let q = null;
    let ue = null;
    const oe = new Vector4(0, 0, j, X);
    const te = new Vector4(0, 0, j, X);
    let le = false;
    const Te = new Frustum();
    let K = false;
    let G = false;
    let U = null;
    const N = new Matrix4();
    const he = new Vector2();
    const ve = new Vector3();
    const de = {
      background: null,
      fog: null,
      environment: null,
      overrideMaterial: null,
      isScene: true
    };
    function xe() {
      if (F === null) {
        return Z;
      } else {
        return 1;
      }
    }
    let ee = r;
    function Ue(A, H) {
      for (let V = 0; V < A.length; V++) {
        const J = A[V];
        const ie = t.getContext(J, H);
        if (ie !== null) {
          return ie;
        }
      }
      return null;
    }
    try {
      const A = {
        alpha: true,
        depth: n,
        stencil: a,
        antialias: c,
        premultipliedAlpha: u,
        preserveDrawingBuffer: f,
        powerPreference: p,
        failIfMajorPerformanceCaveat: g
      };
      if ("setAttribute" in t) {
        t.setAttribute("data-engine", `three.js r${REVISION}`);
      }
      t.addEventListener("webglcontextlost", Pe, false);
      t.addEventListener("webglcontextrestored", ae, false);
      t.addEventListener("webglcontextcreationerror", ke, false);
      if (ee === null) {
        const H = ["webgl2", "webgl", "experimental-webgl"];
        if (w.isWebGL1Renderer === true) {
          H.shift();
        }
        ee = Ue(H, A);
        if (ee === null) {
          throw Ue(H) ? new Error("Error creating WebGL context with your selected attributes.") : new Error("Error creating WebGL context.");
        }
      }
      if (typeof WebGLRenderingContext !== "undefined" && ee instanceof WebGLRenderingContext) {
        console.warn("THREE.WebGLRenderer: WebGL 1 support was deprecated in r153 and will be removed in r163.");
      }
      if (ee.getShaderPrecisionFormat === undefined) {
        ee.getShaderPrecisionFormat = function () {
          return {
            rangeMin: 1,
            rangeMax: 1,
            precision: 1
          };
        };
      }
    } catch (A) {
      console.error("THREE.WebGLRenderer: " + A.message);
      throw A;
    }
    let fe;
    let Se;
    let Me;
    let Be;
    let se;
    let $;
    let Oe;
    let Ye;
    let st;
    let W;
    let O;
    let me;
    let Ie;
    let Le;
    let Y;
    let we;
    let Ee;
    let Fe;
    let Xe;
    let tt;
    let Re;
    let ot;
    let je;
    let We;
    function Ge() {
      fe = new WebGLExtensions(ee);
      Se = new WebGLCapabilities(ee, fe, e);
      fe.init(Se);
      ot = new WebGLUtils(ee, fe, Se);
      Me = new WebGLState(ee, fe, Se);
      Be = new WebGLInfo(ee);
      se = new WebGLProperties();
      $ = new WebGLTextures(ee, fe, Me, se, Se, ot, Be);
      Oe = new WebGLCubeMaps(w);
      Ye = new WebGLCubeUVMaps(w);
      st = new WebGLAttributes(ee, Se);
      je = new WebGLBindingStates(ee, fe, st, Se);
      W = new WebGLGeometries(ee, st, Be, je);
      O = new WebGLObjects(ee, W, st, Be);
      Xe = new WebGLMorphtargets(ee, Se, $);
      we = new WebGLClipping(se);
      me = new WebGLPrograms(w, Oe, Ye, fe, Se, je, we);
      Ie = new WebGLMaterials(w, se);
      Le = new WebGLRenderLists();
      Y = new WebGLRenderStates(fe, Se);
      Fe = new WebGLBackground(w, Oe, Ye, Me, O, v, u);
      Ee = new WebGLShadowMap(w, O, Se);
      We = new WebGLUniformsGroups(ee, Be, Se, Me);
      tt = new WebGLBufferRenderer(ee, fe, Be, Se);
      Re = new WebGLIndexedBufferRenderer(ee, fe, Be, Se);
      Be.programs = me.programs;
      w.capabilities = Se;
      w.extensions = fe;
      w.properties = se;
      w.renderLists = Le;
      w.shadowMap = Ee;
      w.state = Me;
      w.info = Be;
    }
    Ge();
    const qe = new WebXRManager(w, ee);
    this.xr = qe;
    this.getContext = function () {
      return ee;
    };
    this.getContextAttributes = function () {
      return ee.getContextAttributes();
    };
    this.forceContextLoss = function () {
      const A = fe.get("WEBGL_lose_context");
      if (A) {
        A.loseContext();
      }
    };
    this.forceContextRestore = function () {
      const A = fe.get("WEBGL_lose_context");
      if (A) {
        A.restoreContext();
      }
    };
    this.getPixelRatio = function () {
      return Z;
    };
    this.setPixelRatio = function (A) {
      if (A !== undefined) {
        Z = A;
        this.setSize(j, X, false);
      }
    };
    this.getSize = function (A) {
      return A.set(j, X);
    };
    this.setSize = function (A, H, V = true) {
      if (qe.isPresenting) {
        console.warn("THREE.WebGLRenderer: Can't change size while VR device is presenting.");
        return;
      }
      j = A;
      X = H;
      t.width = Math.floor(A * Z);
      t.height = Math.floor(H * Z);
      if (V === true) {
        t.style.width = A + "px";
        t.style.height = H + "px";
      }
      this.setViewport(0, 0, A, H);
    };
    this.getDrawingBufferSize = function (A) {
      return A.set(j * Z, X * Z).floor();
    };
    this.setDrawingBufferSize = function (A, H, V) {
      j = A;
      X = H;
      Z = V;
      t.width = Math.floor(A * V);
      t.height = Math.floor(H * V);
      this.setViewport(0, 0, A, H);
    };
    this.getCurrentViewport = function (A) {
      return A.copy(D);
    };
    this.getViewport = function (A) {
      return A.copy(oe);
    };
    this.setViewport = function (A, H, V, J) {
      if (A.isVector4) {
        oe.set(A.x, A.y, A.z, A.w);
      } else {
        oe.set(A, H, V, J);
      }
      Me.viewport(D.copy(oe).multiplyScalar(Z).floor());
    };
    this.getScissor = function (A) {
      return A.copy(te);
    };
    this.setScissor = function (A, H, V, J) {
      if (A.isVector4) {
        te.set(A.x, A.y, A.z, A.w);
      } else {
        te.set(A, H, V, J);
      }
      Me.scissor(ne.copy(te).multiplyScalar(Z).floor());
    };
    this.getScissorTest = function () {
      return le;
    };
    this.setScissorTest = function (A) {
      Me.setScissorTest(le = A);
    };
    this.setOpaqueSort = function (A) {
      q = A;
    };
    this.setTransparentSort = function (A) {
      ue = A;
    };
    this.getClearColor = function (A) {
      return A.copy(Fe.getClearColor());
    };
    this.setClearColor = function () {
      Fe.setClearColor.apply(Fe, arguments);
    };
    this.getClearAlpha = function () {
      return Fe.getClearAlpha();
    };
    this.setClearAlpha = function () {
      Fe.setClearAlpha.apply(Fe, arguments);
    };
    this.clear = function (A = true, H = true, V = true) {
      let J = 0;
      if (A) {
        let ie = false;
        if (F !== null) {
          const ge = F.texture.format;
          ie = ge === RGBAIntegerFormat || ge === RGIntegerFormat || ge === RedIntegerFormat;
        }
        if (ie) {
          const ge = F.texture.type;
          const pe = ge === UnsignedByteType || ge === UnsignedIntType || ge === UnsignedShortType || ge === UnsignedInt248Type || ge === UnsignedShort4444Type || ge === UnsignedShort5551Type;
          const ye = Fe.getClearColor();
          const Ce = Fe.getClearAlpha();
          const Ae = ye.r;
          const De = ye.g;
          const He = ye.b;
          if (pe) {
            _[0] = Ae;
            _[1] = De;
            _[2] = He;
            _[3] = Ce;
            ee.clearBufferuiv(ee.COLOR, 0, _);
          } else {
            T[0] = Ae;
            T[1] = De;
            T[2] = He;
            T[3] = Ce;
            ee.clearBufferiv(ee.COLOR, 0, T);
          }
        } else {
          J |= ee.COLOR_BUFFER_BIT;
        }
      }
      if (H) {
        J |= ee.DEPTH_BUFFER_BIT;
      }
      if (V) {
        J |= ee.STENCIL_BUFFER_BIT;
        this.state.buffers.stencil.setMask(4294967295);
      }
      ee.clear(J);
    };
    this.clearColor = function () {
      this.clear(true, false, false);
    };
    this.clearDepth = function () {
      this.clear(false, true, false);
    };
    this.clearStencil = function () {
      this.clear(false, false, true);
    };
    this.dispose = function () {
      t.removeEventListener("webglcontextlost", Pe, false);
      t.removeEventListener("webglcontextrestored", ae, false);
      t.removeEventListener("webglcontextcreationerror", ke, false);
      Le.dispose();
      Y.dispose();
      se.dispose();
      Oe.dispose();
      Ye.dispose();
      O.dispose();
      je.dispose();
      We.dispose();
      me.dispose();
      qe.dispose();
      qe.removeEventListener("sessionstart", xt);
      qe.removeEventListener("sessionend", ht);
      if (U) {
        U.dispose();
        U = null;
      }
      gt.stop();
    };
    function Pe(A) {
      A.preventDefault();
      console.log("THREE.WebGLRenderer: Context Lost.");
      R = true;
    }
    function ae() {
      console.log("THREE.WebGLRenderer: Context Restored.");
      R = false;
      const A = Be.autoReset;
      const H = Ee.enabled;
      const V = Ee.autoUpdate;
      const J = Ee.needsUpdate;
      const ie = Ee.type;
      Ge();
      Be.autoReset = A;
      Ee.enabled = H;
      Ee.autoUpdate = V;
      Ee.needsUpdate = J;
      Ee.type = ie;
    }
    function ke(A) {
      console.error("THREE.WebGLRenderer: A WebGL context could not be created. Reason: ", A.statusMessage);
    }
    function Ne(A) {
      const H = A.target;
      H.removeEventListener("dispose", Ne);
      be(H);
    }
    function be(A) {
      ze(A);
      se.remove(A);
    }
    function ze(A) {
      const H = se.get(A).programs;
      if (H !== undefined) {
        H.forEach(function (V) {
          me.releaseProgram(V);
        });
        if (A.isShaderMaterial) {
          me.releaseShaderCache(A);
        }
      }
    }
    this.renderBufferDirect = function (A, H, V, J, ie, ge) {
      if (H === null) {
        H = de;
      }
      const pe = ie.isMesh && ie.matrixWorld.determinant() < 0;
      const ye = P(A, H, V, J, ie);
      Me.setMaterial(J, pe);
      let Ce = V.index;
      let Ae = 1;
      if (J.wireframe === true) {
        Ce = W.getWireframeAttribute(V);
        if (Ce === undefined) {
          return;
        }
        Ae = 2;
      }
      const De = V.drawRange;
      const He = V.attributes.position;
      let Ve = De.start * Ae;
      let $e = (De.start + De.count) * Ae;
      if (ge !== null) {
        Ve = Math.max(Ve, ge.start * Ae);
        $e = Math.min($e, (ge.start + ge.count) * Ae);
      }
      if (Ce !== null) {
        Ve = Math.max(Ve, 0);
        $e = Math.min($e, Ce.count);
      } else if (He != null) {
        Ve = Math.max(Ve, 0);
        $e = Math.min($e, He.count);
      }
      const Ze = $e - Ve;
      if (Ze < 0 || Ze === Infinity) {
        return;
      }
      je.setup(ie, J, ye, V, Ce);
      let ct;
      let it = tt;
      if (Ce !== null) {
        ct = st.get(Ce);
        it = Re;
        it.setIndex(ct);
      }
      if (ie.isMesh) {
        if (J.wireframe === true) {
          Me.setLineWidth(J.wireframeLinewidth * xe());
          it.setMode(ee.LINES);
        } else {
          it.setMode(ee.TRIANGLES);
        }
      } else if (ie.isLine) {
        let Qe = J.linewidth;
        if (Qe === undefined) {
          Qe = 1;
        }
        Me.setLineWidth(Qe * xe());
        if (ie.isLineSegments) {
          it.setMode(ee.LINES);
        } else if (ie.isLineLoop) {
          it.setMode(ee.LINE_LOOP);
        } else {
          it.setMode(ee.LINE_STRIP);
        }
      } else if (ie.isPoints) {
        it.setMode(ee.POINTS);
      } else if (ie.isSprite) {
        it.setMode(ee.TRIANGLES);
      }
      if (ie.isInstancedMesh) {
        it.renderInstances(Ve, Ze, ie.count);
      } else if (V.isInstancedBufferGeometry) {
        const Qe = V._maxInstanceCount !== undefined ? V._maxInstanceCount : Infinity;
        const ut = Math.min(V.instanceCount, Qe);
        it.renderInstances(Ve, Ze, ut);
      } else {
        it.render(Ve, Ze);
      }
    };
    function Je(A, H, V) {
      if (A.transparent === true && A.side === DoubleSide && A.forceSinglePass === false) {
        A.side = BackSide;
        A.needsUpdate = true;
        nt(A, H, V);
        A.side = FrontSide;
        A.needsUpdate = true;
        nt(A, H, V);
        A.side = DoubleSide;
      } else {
        nt(A, H, V);
      }
    }
    this.compile = function (A, H, V = null) {
      if (V === null) {
        V = A;
      }
      S = Y.get(V);
      S.init();
      C.push(S);
      V.traverseVisible(function (ie) {
        if (ie.isLight && ie.layers.test(H.layers)) {
          S.pushLight(ie);
          if (ie.castShadow) {
            S.pushShadow(ie);
          }
        }
      });
      if (A !== V) {
        A.traverseVisible(function (ie) {
          if (ie.isLight && ie.layers.test(H.layers)) {
            S.pushLight(ie);
            if (ie.castShadow) {
              S.pushShadow(ie);
            }
          }
        });
      }
      S.setupLights(w._useLegacyLights);
      const J = new Set();
      A.traverse(function (ie) {
        const ge = ie.material;
        if (ge) {
          if (Array.isArray(ge)) {
            for (let pe = 0; pe < ge.length; pe++) {
              const ye = ge[pe];
              Je(ye, V, ie);
              J.add(ye);
            }
          } else {
            Je(ge, V, ie);
            J.add(ge);
          }
        }
      });
      C.pop();
      S = null;
      return J;
    };
    this.compileAsync = function (A, H, V = null) {
      const J = this.compile(A, H, V);
      return new Promise(ie => {
        function ge() {
          J.forEach(function (pe) {
            if (se.get(pe).currentProgram.isReady()) {
              J.delete(pe);
            }
          });
          if (J.size === 0) {
            ie(A);
            return;
          }
          setTimeout(ge, 10);
        }
        if (fe.get("KHR_parallel_shader_compile") !== null) {
          ge();
        } else {
          setTimeout(ge, 10);
        }
      });
    };
    let at = null;
    function pt(A) {
      if (at) {
        at(A);
      }
    }
    function xt() {
      gt.stop();
    }
    function ht() {
      gt.start();
    }
    const gt = new WebGLAnimation();
    gt.setAnimationLoop(pt);
    if (typeof self !== "undefined") {
      gt.setContext(self);
    }
    this.setAnimationLoop = function (A) {
      at = A;
      qe.setAnimationLoop(A);
      if (A === null) {
        gt.stop();
      } else {
        gt.start();
      }
    };
    qe.addEventListener("sessionstart", xt);
    qe.addEventListener("sessionend", ht);
    this.render = function (A, H) {
      if (H !== undefined && H.isCamera !== true) {
        console.error("THREE.WebGLRenderer.render: camera is not an instance of THREE.Camera.");
        return;
      }
      if (R === true) {
        return;
      }
      if (A.matrixWorldAutoUpdate === true) {
        A.updateMatrixWorld();
      }
      if (H.parent === null && H.matrixWorldAutoUpdate === true) {
        H.updateMatrixWorld();
      }
      if (qe.enabled === true && qe.isPresenting === true) {
        if (qe.cameraAutoUpdate === true) {
          qe.updateCamera(H);
        }
        H = qe.getCamera();
      }
      if (A.isScene === true) {
        A.onBeforeRender(w, A, H, F);
      }
      S = Y.get(A, C.length);
      S.init();
      C.push(S);
      N.multiplyMatrices(H.projectionMatrix, H.matrixWorldInverse);
      Te.setFromProjectionMatrix(N);
      G = this.localClippingEnabled;
      K = we.init(this.clippingPlanes, G);
      M = Le.get(A, b.length);
      M.init();
      b.push(M);
      yt(A, H, 0, w.sortObjects);
      M.finish();
      if (w.sortObjects === true) {
        M.sort(q, ue);
      }
      this.info.render.frame++;
      if (K === true) {
        we.beginShadows();
      }
      const V = S.state.shadowsArray;
      Ee.render(V, A, H);
      if (K === true) {
        we.endShadows();
      }
      if (this.info.autoReset === true) {
        this.info.reset();
      }
      Fe.render(M, A);
      S.setupLights(w._useLegacyLights);
      if (H.isArrayCamera) {
        const J = H.cameras;
        for (let ie = 0, ge = J.length; ie < ge; ie++) {
          const pe = J[ie];
          Mt(M, A, pe, pe.viewport);
        }
      } else {
        Mt(M, A, H);
      }
      if (F !== null) {
        $.updateMultisampleRenderTarget(F);
        $.updateRenderTargetMipmap(F);
      }
      if (A.isScene === true) {
        A.onAfterRender(w, A, H);
      }
      je.resetDefaultState();
      k = -1;
      L = null;
      C.pop();
      if (C.length > 0) {
        S = C[C.length - 1];
      } else {
        S = null;
      }
      b.pop();
      if (b.length > 0) {
        M = b[b.length - 1];
      } else {
        M = null;
      }
    };
    function yt(A, H, V, J) {
      if (A.visible === false) {
        return;
      }
      if (A.layers.test(H.layers)) {
        if (A.isGroup) {
          V = A.renderOrder;
        } else if (A.isLOD) {
          if (A.autoUpdate === true) {
            A.update(H);
          }
        } else if (A.isLight) {
          S.pushLight(A);
          if (A.castShadow) {
            S.pushShadow(A);
          }
        } else if (A.isSprite) {
          if (!A.frustumCulled || Te.intersectsSprite(A)) {
            if (J) {
              ve.setFromMatrixPosition(A.matrixWorld).applyMatrix4(N);
            }
            const pe = O.update(A);
            const ye = A.material;
            if (ye.visible) {
              M.push(A, pe, ye, V, ve.z, null);
            }
          }
        } else if ((A.isMesh || A.isLine || A.isPoints) && (!A.frustumCulled || Te.intersectsObject(A))) {
          const pe = O.update(A);
          const ye = A.material;
          if (J) {
            if (A.boundingSphere !== undefined) {
              if (A.boundingSphere === null) {
                A.computeBoundingSphere();
              }
              ve.copy(A.boundingSphere.center);
            } else {
              if (pe.boundingSphere === null) {
                pe.computeBoundingSphere();
              }
              ve.copy(pe.boundingSphere.center);
            }
            ve.applyMatrix4(A.matrixWorld).applyMatrix4(N);
          }
          if (Array.isArray(ye)) {
            const Ce = pe.groups;
            for (let Ae = 0, De = Ce.length; Ae < De; Ae++) {
              const He = Ce[Ae];
              const Ve = ye[He.materialIndex];
              if (Ve && Ve.visible) {
                M.push(A, pe, Ve, V, ve.z, He);
              }
            }
          } else if (ye.visible) {
            M.push(A, pe, ye, V, ve.z, null);
          }
        }
      }
      const ge = A.children;
      for (let pe = 0, ye = ge.length; pe < ye; pe++) {
        yt(ge[pe], H, V, J);
      }
    }
    function Mt(A, H, V, J) {
      const ie = A.opaque;
      const ge = A.transmissive;
      const pe = A.transparent;
      S.setupLightsView(V);
      if (K === true) {
        we.setGlobalState(w.clippingPlanes, V);
      }
      if (ge.length > 0) {
        Et(ie, ge, H, V);
      }
      if (J) {
        Me.viewport(D.copy(J));
      }
      if (ie.length > 0) {
        St(ie, H, V);
      }
      if (ge.length > 0) {
        St(ge, H, V);
      }
      if (pe.length > 0) {
        St(pe, H, V);
      }
      Me.buffers.depth.setTest(true);
      Me.buffers.depth.setMask(true);
      Me.buffers.color.setMask(true);
      Me.setPolygonOffset(false);
    }
    function Et(A, H, V, J) {
      if ((V.isScene === true ? V.overrideMaterial : null) !== null) {
        return;
      }
      const ge = Se.isWebGL2;
      if (U === null) {
        U = new WebGLRenderTarget(1, 1, {
          generateMipmaps: true,
          type: fe.has("EXT_color_buffer_half_float") ? HalfFloatType : UnsignedByteType,
          minFilter: LinearMipmapLinearFilter,
          samples: ge ? 4 : 0
        });
      }
      w.getDrawingBufferSize(he);
      if (ge) {
        U.setSize(he.x, he.y);
      } else {
        U.setSize(floorPowerOfTwo(he.x), floorPowerOfTwo(he.y));
      }
      const pe = w.getRenderTarget();
      w.setRenderTarget(U);
      w.getClearColor(ce);
      z = w.getClearAlpha();
      if (z < 1) {
        w.setClearColor(16777215, 0.5);
      }
      w.clear();
      const ye = w.toneMapping;
      w.toneMapping = NoToneMapping;
      St(A, V, J);
      $.updateMultisampleRenderTarget(U);
      $.updateRenderTargetMipmap(U);
      let Ce = false;
      for (let Ae = 0, De = H.length; Ae < De; Ae++) {
        const He = H[Ae];
        const Ve = He.object;
        const $e = He.geometry;
        const Ze = He.material;
        const ct = He.group;
        if (Ze.side === DoubleSide && Ve.layers.test(J.layers)) {
          const it = Ze.side;
          Ze.side = BackSide;
          Ze.needsUpdate = true;
          Tt(Ve, V, J, $e, Ze, ct);
          Ze.side = it;
          Ze.needsUpdate = true;
          Ce = true;
        }
      }
      if (Ce === true) {
        $.updateMultisampleRenderTarget(U);
        $.updateRenderTargetMipmap(U);
      }
      w.setRenderTarget(pe);
      w.setClearColor(ce, z);
      w.toneMapping = ye;
    }
    function St(A, H, V) {
      const J = H.isScene === true ? H.overrideMaterial : null;
      for (let ie = 0, ge = A.length; ie < ge; ie++) {
        const pe = A[ie];
        const ye = pe.object;
        const Ce = pe.geometry;
        const Ae = J === null ? pe.material : J;
        const De = pe.group;
        if (ye.layers.test(V.layers)) {
          Tt(ye, H, V, Ce, Ae, De);
        }
      }
    }
    function Tt(A, H, V, J, ie, ge) {
      A.onBeforeRender(w, H, V, J, ie, ge);
      A.modelViewMatrix.multiplyMatrices(V.matrixWorldInverse, A.matrixWorld);
      A.normalMatrix.getNormalMatrix(A.modelViewMatrix);
      ie.onBeforeRender(w, H, V, J, A, ge);
      if (ie.transparent === true && ie.side === DoubleSide && ie.forceSinglePass === false) {
        ie.side = BackSide;
        ie.needsUpdate = true;
        w.renderBufferDirect(V, H, J, ie, A, ge);
        ie.side = FrontSide;
        ie.needsUpdate = true;
        w.renderBufferDirect(V, H, J, ie, A, ge);
        ie.side = DoubleSide;
      } else {
        w.renderBufferDirect(V, H, J, ie, A, ge);
      }
      A.onAfterRender(w, H, V, J, ie, ge);
    }
    function nt(A, H, V) {
      if (H.isScene !== true) {
        H = de;
      }
      const J = se.get(A);
      const ie = S.state.lights;
      const ge = S.state.shadowsArray;
      const pe = ie.state.version;
      const ye = me.getParameters(A, ie.state, ge, H, V);
      const Ce = me.getProgramCacheKey(ye);
      let Ae = J.programs;
      J.environment = A.isMeshStandardMaterial ? H.environment : null;
      J.fog = H.fog;
      J.envMap = (A.isMeshStandardMaterial ? Ye : Oe).get(A.envMap || J.environment);
      if (Ae === undefined) {
        A.addEventListener("dispose", Ne);
        Ae = new Map();
        J.programs = Ae;
      }
      let De = Ae.get(Ce);
      if (De !== undefined) {
        if (J.currentProgram === De && J.lightsStateVersion === pe) {
          Ct(A, ye);
          return De;
        }
      } else {
        ye.uniforms = me.getUniforms(A);
        A.onBuild(V, ye, w);
        A.onBeforeCompile(ye, w);
        De = me.acquireProgram(ye, Ce);
        Ae.set(Ce, De);
        J.uniforms = ye.uniforms;
      }
      const He = J.uniforms;
      if (!A.isShaderMaterial && !A.isRawShaderMaterial || A.clipping === true) {
        He.clippingPlanes = we.uniform;
      }
      Ct(A, ye);
      J.needsLights = Q(A);
      J.lightsStateVersion = pe;
      if (J.needsLights) {
        He.ambientLightColor.value = ie.state.ambient;
        He.lightProbe.value = ie.state.probe;
        He.directionalLights.value = ie.state.directional;
        He.directionalLightShadows.value = ie.state.directionalShadow;
        He.spotLights.value = ie.state.spot;
        He.spotLightShadows.value = ie.state.spotShadow;
        He.rectAreaLights.value = ie.state.rectArea;
        He.ltc_1.value = ie.state.rectAreaLTC1;
        He.ltc_2.value = ie.state.rectAreaLTC2;
        He.pointLights.value = ie.state.point;
        He.pointLightShadows.value = ie.state.pointShadow;
        He.hemisphereLights.value = ie.state.hemi;
        He.directionalShadowMap.value = ie.state.directionalShadowMap;
        He.directionalShadowMatrix.value = ie.state.directionalShadowMatrix;
        He.spotShadowMap.value = ie.state.spotShadowMap;
        He.spotLightMatrix.value = ie.state.spotLightMatrix;
        He.spotLightMap.value = ie.state.spotLightMap;
        He.pointShadowMap.value = ie.state.pointShadowMap;
        He.pointShadowMatrix.value = ie.state.pointShadowMatrix;
      }
      J.currentProgram = De;
      J.uniformsList = null;
      return De;
    }
    function Rt(A) {
      if (A.uniformsList === null) {
        const H = A.currentProgram.getUniforms();
        A.uniformsList = WebGLUniforms.seqWithValue(H.seq, A.uniforms);
      }
      return A.uniformsList;
    }
    function Ct(A, H) {
      const V = se.get(A);
      V.outputColorSpace = H.outputColorSpace;
      V.instancing = H.instancing;
      V.instancingColor = H.instancingColor;
      V.skinning = H.skinning;
      V.morphTargets = H.morphTargets;
      V.morphNormals = H.morphNormals;
      V.morphColors = H.morphColors;
      V.morphTargetsCount = H.morphTargetsCount;
      V.numClippingPlanes = H.numClippingPlanes;
      V.numIntersection = H.numClipIntersection;
      V.vertexAlphas = H.vertexAlphas;
      V.vertexTangents = H.vertexTangents;
      V.toneMapping = H.toneMapping;
    }
    function P(A, H, V, J, ie) {
      if (H.isScene !== true) {
        H = de;
      }
      $.resetTextureUnits();
      const ge = H.fog;
      const pe = J.isMeshStandardMaterial ? H.environment : null;
      const ye = F === null ? w.outputColorSpace : F.isXRRenderTarget === true ? F.texture.colorSpace : LinearSRGBColorSpace;
      const Ce = (J.isMeshStandardMaterial ? Ye : Oe).get(J.envMap || pe);
      const Ae = J.vertexColors === true && !!V.attributes.color && V.attributes.color.itemSize === 4;
      const De = !!V.attributes.tangent && (!!J.normalMap || J.anisotropy > 0);
      const He = !!V.morphAttributes.position;
      const Ve = !!V.morphAttributes.normal;
      const $e = !!V.morphAttributes.color;
      let Ze = NoToneMapping;
      if (J.toneMapped && (F === null || F.isXRRenderTarget === true)) {
        Ze = w.toneMapping;
      }
      const ct = V.morphAttributes.position || V.morphAttributes.normal || V.morphAttributes.color;
      const it = ct !== undefined ? ct.length : 0;
      const Qe = se.get(J);
      const ut = S.state.lights;
      if (K === true && (G === true || A !== L)) {
        const mt = A === L && J.id === k;
        we.setState(J, A, mt);
      }
      let Ke = false;
      if (J.version === Qe.__version) {
        if (Qe.needsLights && Qe.lightsStateVersion !== ut.state.version || Qe.outputColorSpace !== ye || ie.isInstancedMesh && Qe.instancing === false || !ie.isInstancedMesh && Qe.instancing === true || ie.isSkinnedMesh && Qe.skinning === false || !ie.isSkinnedMesh && Qe.skinning === true || ie.isInstancedMesh && Qe.instancingColor === true && ie.instanceColor === null || ie.isInstancedMesh && Qe.instancingColor === false && ie.instanceColor !== null || Qe.envMap !== Ce || J.fog === true && Qe.fog !== ge || Qe.numClippingPlanes !== undefined && (Qe.numClippingPlanes !== we.numPlanes || Qe.numIntersection !== we.numIntersection) || Qe.vertexAlphas !== Ae || Qe.vertexTangents !== De || Qe.morphTargets !== He || Qe.morphNormals !== Ve || Qe.morphColors !== $e || Qe.toneMapping !== Ze || Se.isWebGL2 === true && Qe.morphTargetsCount !== it) {
          Ke = true;
        }
      } else {
        Ke = true;
        Qe.__version = J.version;
      }
      let dt = Qe.currentProgram;
      if (Ke === true) {
        dt = nt(J, H, ie);
      }
      let _t = false;
      let ft = false;
      let lt = false;
      const rt = dt.getUniforms();
      const vt = Qe.uniforms;
      if (Me.useProgram(dt.program)) {
        _t = true;
        ft = true;
        lt = true;
      }
      if (J.id !== k) {
        k = J.id;
        ft = true;
      }
      if (_t || L !== A) {
        rt.setValue(ee, "projectionMatrix", A.projectionMatrix);
        rt.setValue(ee, "viewMatrix", A.matrixWorldInverse);
        const mt = rt.map.cameraPosition;
        if (mt !== undefined) {
          mt.setValue(ee, ve.setFromMatrixPosition(A.matrixWorld));
        }
        if (Se.logarithmicDepthBuffer) {
          rt.setValue(ee, "logDepthBufFC", 2 / (Math.log(A.far + 1) / Math.LN2));
        }
        if (J.isMeshPhongMaterial || J.isMeshToonMaterial || J.isMeshLambertMaterial || J.isMeshBasicMaterial || J.isMeshStandardMaterial || J.isShaderMaterial) {
          rt.setValue(ee, "isOrthographic", A.isOrthographicCamera === true);
        }
        if (L !== A) {
          L = A;
          ft = true;
          lt = true;
        }
      }
      if (ie.isSkinnedMesh) {
        rt.setOptional(ee, ie, "bindMatrix");
        rt.setOptional(ee, ie, "bindMatrixInverse");
        const mt = ie.skeleton;
        if (mt) {
          if (Se.floatVertexTextures) {
            if (mt.boneTexture === null) {
              mt.computeBoneTexture();
            }
            rt.setValue(ee, "boneTexture", mt.boneTexture, $);
            rt.setValue(ee, "boneTextureSize", mt.boneTextureSize);
          } else {
            console.warn("THREE.WebGLRenderer: SkinnedMesh can only be used with WebGL 2. With WebGL 1 OES_texture_float and vertex textures support is required.");
          }
        }
      }
      const bt = V.morphAttributes;
      if (bt.position !== undefined || bt.normal !== undefined || bt.color !== undefined && Se.isWebGL2 === true) {
        Xe.update(ie, V, dt);
      }
      if (ft || Qe.receiveShadow !== ie.receiveShadow) {
        Qe.receiveShadow = ie.receiveShadow;
        rt.setValue(ee, "receiveShadow", ie.receiveShadow);
      }
      if (J.isMeshGouraudMaterial && J.envMap !== null) {
        vt.envMap.value = Ce;
        vt.flipEnvMap.value = Ce.isCubeTexture && Ce.isRenderTargetTexture === false ? -1 : 1;
      }
      if (ft) {
        rt.setValue(ee, "toneMappingExposure", w.toneMappingExposure);
        if (Qe.needsLights) {
          B(vt, lt);
        }
        if (ge && J.fog === true) {
          Ie.refreshFogUniforms(vt, ge);
        }
        Ie.refreshMaterialUniforms(vt, J, Z, X, U);
        WebGLUniforms.upload(ee, Rt(Qe), vt, $);
      }
      if (J.isShaderMaterial && J.uniformsNeedUpdate === true) {
        WebGLUniforms.upload(ee, Rt(Qe), vt, $);
        J.uniformsNeedUpdate = false;
      }
      if (J.isSpriteMaterial) {
        rt.setValue(ee, "center", ie.center);
      }
      rt.setValue(ee, "modelViewMatrix", ie.modelViewMatrix);
      rt.setValue(ee, "normalMatrix", ie.normalMatrix);
      rt.setValue(ee, "modelMatrix", ie.matrixWorld);
      if (J.isShaderMaterial || J.isRawShaderMaterial) {
        const mt = J.uniformsGroups;
        for (let wt = 0, Pt = mt.length; wt < Pt; wt++) {
          if (Se.isWebGL2) {
            const At = mt[wt];
            We.update(At, dt);
            We.bind(At, dt);
          } else {
            console.warn("THREE.WebGLRenderer: Uniform Buffer Objects can only be used with WebGL 2.");
          }
        }
      }
      return dt;
    }
    function B(A, H) {
      A.ambientLightColor.needsUpdate = H;
      A.lightProbe.needsUpdate = H;
      A.directionalLights.needsUpdate = H;
      A.directionalLightShadows.needsUpdate = H;
      A.pointLights.needsUpdate = H;
      A.pointLightShadows.needsUpdate = H;
      A.spotLights.needsUpdate = H;
      A.spotLightShadows.needsUpdate = H;
      A.rectAreaLights.needsUpdate = H;
      A.hemisphereLights.needsUpdate = H;
    }
    function Q(A) {
      return A.isMeshLambertMaterial || A.isMeshToonMaterial || A.isMeshPhongMaterial || A.isMeshStandardMaterial || A.isShadowMaterial || A.isShaderMaterial && A.lights === true;
    }
    this.getActiveCubeFace = function () {
      return E;
    };
    this.getActiveMipmapLevel = function () {
      return I;
    };
    this.getRenderTarget = function () {
      return F;
    };
    this.setRenderTargetTextures = function (A, H, V) {
      se.get(A.texture).__webglTexture = H;
      se.get(A.depthTexture).__webglTexture = V;
      const J = se.get(A);
      J.__hasExternalTextures = true;
      if (J.__hasExternalTextures) {
        J.__autoAllocateDepthBuffer = V === undefined;
        if (!J.__autoAllocateDepthBuffer) {
          if (fe.has("WEBGL_multisampled_render_to_texture") === true) {
            console.warn("THREE.WebGLRenderer: Render-to-texture extension was disabled because an external texture was provided");
            J.__useRenderToTexture = false;
          }
        }
      }
    };
    this.setRenderTargetFramebuffer = function (A, H) {
      const V = se.get(A);
      V.__webglFramebuffer = H;
      V.__useDefaultFramebuffer = H === undefined;
    };
    this.setRenderTarget = function (A, H = 0, V = 0) {
      F = A;
      E = H;
      I = V;
      let J = true;
      let ie = null;
      let ge = false;
      let pe = false;
      if (A) {
        const Ce = se.get(A);
        if (Ce.__useDefaultFramebuffer !== undefined) {
          Me.bindFramebuffer(ee.FRAMEBUFFER, null);
          J = false;
        } else if (Ce.__webglFramebuffer === undefined) {
          $.setupRenderTarget(A);
        } else if (Ce.__hasExternalTextures) {
          $.rebindTextures(A, se.get(A.texture).__webglTexture, se.get(A.depthTexture).__webglTexture);
        }
        const Ae = A.texture;
        if (Ae.isData3DTexture || Ae.isDataArrayTexture || Ae.isCompressedArrayTexture) {
          pe = true;
        }
        const De = se.get(A).__webglFramebuffer;
        if (A.isWebGLCubeRenderTarget) {
          if (Array.isArray(De[H])) {
            ie = De[H][V];
          } else {
            ie = De[H];
          }
          ge = true;
        } else if (Se.isWebGL2 && A.samples > 0 && $.useMultisampledRTT(A) === false) {
          ie = se.get(A).__webglMultisampledFramebuffer;
        } else if (Array.isArray(De)) {
          ie = De[V];
        } else {
          ie = De;
        }
        D.copy(A.viewport);
        ne.copy(A.scissor);
        re = A.scissorTest;
      } else {
        D.copy(oe).multiplyScalar(Z).floor();
        ne.copy(te).multiplyScalar(Z).floor();
        re = le;
      }
      if (Me.bindFramebuffer(ee.FRAMEBUFFER, ie) && Se.drawBuffers && J) {
        Me.drawBuffers(A, ie);
      }
      Me.viewport(D);
      Me.scissor(ne);
      Me.setScissorTest(re);
      if (ge) {
        const Ce = se.get(A.texture);
        ee.framebufferTexture2D(ee.FRAMEBUFFER, ee.COLOR_ATTACHMENT0, ee.TEXTURE_CUBE_MAP_POSITIVE_X + H, Ce.__webglTexture, V);
      } else if (pe) {
        const Ce = se.get(A.texture);
        const Ae = H || 0;
        ee.framebufferTextureLayer(ee.FRAMEBUFFER, ee.COLOR_ATTACHMENT0, Ce.__webglTexture, V || 0, Ae);
      }
      k = -1;
    };
    this.readRenderTargetPixels = function (A, H, V, J, ie, ge, pe) {
      if (!A || !A.isWebGLRenderTarget) {
        console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not THREE.WebGLRenderTarget.");
        return;
      }
      let ye = se.get(A).__webglFramebuffer;
      if (A.isWebGLCubeRenderTarget && pe !== undefined) {
        ye = ye[pe];
      }
      if (ye) {
        Me.bindFramebuffer(ee.FRAMEBUFFER, ye);
        try {
          const Ce = A.texture;
          const Ae = Ce.format;
          const De = Ce.type;
          if (Ae !== RGBAFormat && ot.convert(Ae) !== ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_FORMAT)) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in RGBA or implementation defined format.");
            return;
          }
          const He = De === HalfFloatType && (fe.has("EXT_color_buffer_half_float") || Se.isWebGL2 && fe.has("EXT_color_buffer_float"));
          if (De !== UnsignedByteType && ot.convert(De) !== ee.getParameter(ee.IMPLEMENTATION_COLOR_READ_TYPE) && (De !== FloatType || !Se.isWebGL2 && !fe.has("OES_texture_float") && !fe.has("WEBGL_color_buffer_float")) && !He) {
            console.error("THREE.WebGLRenderer.readRenderTargetPixels: renderTarget is not in UnsignedByteType or implementation defined type.");
            return;
          }
          if (H >= 0 && H <= A.width - J && V >= 0 && V <= A.height - ie) {
            ee.readPixels(H, V, J, ie, ot.convert(Ae), ot.convert(De), ge);
          }
        } finally {
          const Ce = F !== null ? se.get(F).__webglFramebuffer : null;
          Me.bindFramebuffer(ee.FRAMEBUFFER, Ce);
        }
      }
    };
    this.copyFramebufferToTexture = function (A, H, V = 0) {
      const J = Math.pow(2, -V);
      const ie = Math.floor(H.image.width * J);
      const ge = Math.floor(H.image.height * J);
      $.setTexture2D(H, 0);
      ee.copyTexSubImage2D(ee.TEXTURE_2D, V, 0, 0, A.x, A.y, ie, ge);
      Me.unbindTexture();
    };
    this.copyTextureToTexture = function (A, H, V, J = 0) {
      const ie = H.image.width;
      const ge = H.image.height;
      const pe = ot.convert(V.format);
      const ye = ot.convert(V.type);
      $.setTexture2D(V, 0);
      ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL, V.flipY);
      ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL, V.premultiplyAlpha);
      ee.pixelStorei(ee.UNPACK_ALIGNMENT, V.unpackAlignment);
      if (H.isDataTexture) {
        ee.texSubImage2D(ee.TEXTURE_2D, J, A.x, A.y, ie, ge, pe, ye, H.image.data);
      } else if (H.isCompressedTexture) {
        ee.compressedTexSubImage2D(ee.TEXTURE_2D, J, A.x, A.y, H.mipmaps[0].width, H.mipmaps[0].height, pe, H.mipmaps[0].data);
      } else {
        ee.texSubImage2D(ee.TEXTURE_2D, J, A.x, A.y, pe, ye, H.image);
      }
      if (J === 0 && V.generateMipmaps) {
        ee.generateMipmap(ee.TEXTURE_2D);
      }
      Me.unbindTexture();
    };
    this.copyTextureToTexture3D = function (A, H, V, J, ie = 0) {
      if (w.isWebGL1Renderer) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: can only be used with WebGL2.");
        return;
      }
      const ge = A.max.x - A.min.x + 1;
      const pe = A.max.y - A.min.y + 1;
      const ye = A.max.z - A.min.z + 1;
      const Ce = ot.convert(J.format);
      const Ae = ot.convert(J.type);
      let De;
      if (J.isData3DTexture) {
        $.setTexture3D(J, 0);
        De = ee.TEXTURE_3D;
      } else if (J.isDataArrayTexture) {
        $.setTexture2DArray(J, 0);
        De = ee.TEXTURE_2D_ARRAY;
      } else {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: only supports THREE.DataTexture3D and THREE.DataTexture2DArray.");
        return;
      }
      ee.pixelStorei(ee.UNPACK_FLIP_Y_WEBGL, J.flipY);
      ee.pixelStorei(ee.UNPACK_PREMULTIPLY_ALPHA_WEBGL, J.premultiplyAlpha);
      ee.pixelStorei(ee.UNPACK_ALIGNMENT, J.unpackAlignment);
      const He = ee.getParameter(ee.UNPACK_ROW_LENGTH);
      const Ve = ee.getParameter(ee.UNPACK_IMAGE_HEIGHT);
      const $e = ee.getParameter(ee.UNPACK_SKIP_PIXELS);
      const Ze = ee.getParameter(ee.UNPACK_SKIP_ROWS);
      const ct = ee.getParameter(ee.UNPACK_SKIP_IMAGES);
      const it = V.isCompressedTexture ? V.mipmaps[0] : V.image;
      ee.pixelStorei(ee.UNPACK_ROW_LENGTH, it.width);
      ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT, it.height);
      ee.pixelStorei(ee.UNPACK_SKIP_PIXELS, A.min.x);
      ee.pixelStorei(ee.UNPACK_SKIP_ROWS, A.min.y);
      ee.pixelStorei(ee.UNPACK_SKIP_IMAGES, A.min.z);
      if (V.isDataTexture || V.isData3DTexture) {
        ee.texSubImage3D(De, ie, H.x, H.y, H.z, ge, pe, ye, Ce, Ae, it.data);
      } else if (V.isCompressedArrayTexture) {
        console.warn("THREE.WebGLRenderer.copyTextureToTexture3D: untested support for compressed srcTexture.");
        ee.compressedTexSubImage3D(De, ie, H.x, H.y, H.z, ge, pe, ye, Ce, it.data);
      } else {
        ee.texSubImage3D(De, ie, H.x, H.y, H.z, ge, pe, ye, Ce, Ae, it);
      }
      ee.pixelStorei(ee.UNPACK_ROW_LENGTH, He);
      ee.pixelStorei(ee.UNPACK_IMAGE_HEIGHT, Ve);
      ee.pixelStorei(ee.UNPACK_SKIP_PIXELS, $e);
      ee.pixelStorei(ee.UNPACK_SKIP_ROWS, Ze);
      ee.pixelStorei(ee.UNPACK_SKIP_IMAGES, ct);
      if (ie === 0 && J.generateMipmaps) {
        ee.generateMipmap(De);
      }
      Me.unbindTexture();
    };
    this.initTexture = function (A) {
      if (A.isCubeTexture) {
        $.setTextureCube(A, 0);
      } else if (A.isData3DTexture) {
        $.setTexture3D(A, 0);
      } else if (A.isDataArrayTexture || A.isCompressedArrayTexture) {
        $.setTexture2DArray(A, 0);
      } else {
        $.setTexture2D(A, 0);
      }
      Me.unbindTexture();
    };
    this.resetState = function () {
      E = 0;
      I = 0;
      F = null;
      Me.reset();
      je.reset();
    };
    if (typeof __THREE_DEVTOOLS__ !== "undefined") {
      __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
        detail: this
      }));
    }
  }
  get coordinateSystem() {
    return WebGLCoordinateSystem;
  }
  get outputColorSpace() {
    return this._outputColorSpace;
  }
  set outputColorSpace(e) {
    this._outputColorSpace = e;
    const t = this.getContext();
    t.drawingBufferColorSpace = e === DisplayP3ColorSpace ? "display-p3" : "srgb";
    t.unpackColorSpace = ColorManagement.workingColorSpace === LinearDisplayP3ColorSpace ? "display-p3" : "srgb";
  }
  get physicallyCorrectLights() {
    console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.");
    return !this.useLegacyLights;
  }
  set physicallyCorrectLights(e) {
    console.warn("THREE.WebGLRenderer: The property .physicallyCorrectLights has been removed. Set renderer.useLegacyLights instead.");
    this.useLegacyLights = !e;
  }
  get outputEncoding() {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.");
    if (this.outputColorSpace === SRGBColorSpace) {
      return sRGBEncoding;
    } else {
      return LinearEncoding;
    }
  }
  set outputEncoding(e) {
    console.warn("THREE.WebGLRenderer: Property .outputEncoding has been removed. Use .outputColorSpace instead.");
    this.outputColorSpace = e === sRGBEncoding ? SRGBColorSpace : LinearSRGBColorSpace;
  }
  get useLegacyLights() {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.");
    return this._useLegacyLights;
  }
  set useLegacyLights(e) {
    console.warn("THREE.WebGLRenderer: The property .useLegacyLights has been deprecated. Migrate your lighting according to the following guide: https://discourse.threejs.org/t/updates-to-lighting-in-three-js-r155/53733.");
    this._useLegacyLights = e;
  }
}
class WebGL1Renderer extends WebGLRenderer {}
WebGL1Renderer.prototype.isWebGL1Renderer = true;
class Scene extends Object3D {
  constructor() {
    super();
    this.isScene = true;
    this.type = "Scene";
    this.background = null;
    this.environment = null;
    this.fog = null;
    this.backgroundBlurriness = 0;
    this.backgroundIntensity = 1;
    this.overrideMaterial = null;
    if (typeof __THREE_DEVTOOLS__ !== "undefined") {
      __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("observe", {
        detail: this
      }));
    }
  }
  copy(e, t) {
    super.copy(e, t);
    if (e.background !== null) {
      this.background = e.background.clone();
    }
    if (e.environment !== null) {
      this.environment = e.environment.clone();
    }
    if (e.fog !== null) {
      this.fog = e.fog.clone();
    }
    this.backgroundBlurriness = e.backgroundBlurriness;
    this.backgroundIntensity = e.backgroundIntensity;
    if (e.overrideMaterial !== null) {
      this.overrideMaterial = e.overrideMaterial.clone();
    }
    this.matrixAutoUpdate = e.matrixAutoUpdate;
    return this;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    if (this.fog !== null) {
      t.object.fog = this.fog.toJSON();
    }
    if (this.backgroundBlurriness > 0) {
      t.object.backgroundBlurriness = this.backgroundBlurriness;
    }
    if (this.backgroundIntensity !== 1) {
      t.object.backgroundIntensity = this.backgroundIntensity;
    }
    return t;
  }
}
class InterleavedBuffer {
  constructor(e, t) {
    this.isInterleavedBuffer = true;
    this.array = e;
    this.stride = t;
    this.count = e !== undefined ? e.length / t : 0;
    this.usage = StaticDrawUsage;
    this.updateRange = {
      offset: 0,
      count: -1
    };
    this.version = 0;
    this.uuid = generateUUID();
  }
  onUploadCallback() {}
  set needsUpdate(e) {
    if (e === true) {
      this.version++;
    }
  }
  setUsage(e) {
    this.usage = e;
    return this;
  }
  copy(e) {
    this.array = new e.array.constructor(e.array);
    this.count = e.count;
    this.stride = e.stride;
    this.usage = e.usage;
    return this;
  }
  copyAt(e, t, r) {
    e *= this.stride;
    r *= t.stride;
    for (let n = 0, a = this.stride; n < a; n++) {
      this.array[e + n] = t.array[r + n];
    }
    return this;
  }
  set(e, t = 0) {
    this.array.set(e, t);
    return this;
  }
  clone(e) {
    if (e.arrayBuffers === undefined) {
      e.arrayBuffers = {};
    }
    if (this.array.buffer._uuid === undefined) {
      this.array.buffer._uuid = generateUUID();
    }
    if (e.arrayBuffers[this.array.buffer._uuid] === undefined) {
      e.arrayBuffers[this.array.buffer._uuid] = this.array.slice(0).buffer;
    }
    const t = new this.array.constructor(e.arrayBuffers[this.array.buffer._uuid]);
    const r = new this.constructor(t, this.stride);
    r.setUsage(this.usage);
    return r;
  }
  onUpload(e) {
    this.onUploadCallback = e;
    return this;
  }
  toJSON(e) {
    if (e.arrayBuffers === undefined) {
      e.arrayBuffers = {};
    }
    if (this.array.buffer._uuid === undefined) {
      this.array.buffer._uuid = generateUUID();
    }
    if (e.arrayBuffers[this.array.buffer._uuid] === undefined) {
      e.arrayBuffers[this.array.buffer._uuid] = Array.from(new Uint32Array(this.array.buffer));
    }
    return {
      uuid: this.uuid,
      buffer: this.array.buffer._uuid,
      type: this.array.constructor.name,
      stride: this.stride
    };
  }
}
const _vector$5 = new Vector3();
class InterleavedBufferAttribute {
  constructor(e, t, r, n = false) {
    this.isInterleavedBufferAttribute = true;
    this.name = "";
    this.data = e;
    this.itemSize = t;
    this.offset = r;
    this.normalized = n;
  }
  get count() {
    return this.data.count;
  }
  get array() {
    return this.data.array;
  }
  set needsUpdate(e) {
    this.data.needsUpdate = e;
  }
  applyMatrix4(e) {
    for (let t = 0, r = this.data.count; t < r; t++) {
      _vector$5.fromBufferAttribute(this, t);
      _vector$5.applyMatrix4(e);
      this.setXYZ(t, _vector$5.x, _vector$5.y, _vector$5.z);
    }
    return this;
  }
  applyNormalMatrix(e) {
    for (let t = 0, r = this.count; t < r; t++) {
      _vector$5.fromBufferAttribute(this, t);
      _vector$5.applyNormalMatrix(e);
      this.setXYZ(t, _vector$5.x, _vector$5.y, _vector$5.z);
    }
    return this;
  }
  transformDirection(e) {
    for (let t = 0, r = this.count; t < r; t++) {
      _vector$5.fromBufferAttribute(this, t);
      _vector$5.transformDirection(e);
      this.setXYZ(t, _vector$5.x, _vector$5.y, _vector$5.z);
    }
    return this;
  }
  setX(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.data.array[e * this.data.stride + this.offset] = t;
    return this;
  }
  setY(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.data.array[e * this.data.stride + this.offset + 1] = t;
    return this;
  }
  setZ(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.data.array[e * this.data.stride + this.offset + 2] = t;
    return this;
  }
  setW(e, t) {
    if (this.normalized) {
      t = normalize(t, this.array);
    }
    this.data.array[e * this.data.stride + this.offset + 3] = t;
    return this;
  }
  getX(e) {
    let t = this.data.array[e * this.data.stride + this.offset];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  getY(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 1];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  getZ(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 2];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  getW(e) {
    let t = this.data.array[e * this.data.stride + this.offset + 3];
    if (this.normalized) {
      t = denormalize(t, this.array);
    }
    return t;
  }
  setXY(e, t, r) {
    e = e * this.data.stride + this.offset;
    if (this.normalized) {
      t = normalize(t, this.array);
      r = normalize(r, this.array);
    }
    this.data.array[e + 0] = t;
    this.data.array[e + 1] = r;
    return this;
  }
  setXYZ(e, t, r, n) {
    e = e * this.data.stride + this.offset;
    if (this.normalized) {
      t = normalize(t, this.array);
      r = normalize(r, this.array);
      n = normalize(n, this.array);
    }
    this.data.array[e + 0] = t;
    this.data.array[e + 1] = r;
    this.data.array[e + 2] = n;
    return this;
  }
  setXYZW(e, t, r, n, a) {
    e = e * this.data.stride + this.offset;
    if (this.normalized) {
      t = normalize(t, this.array);
      r = normalize(r, this.array);
      n = normalize(n, this.array);
      a = normalize(a, this.array);
    }
    this.data.array[e + 0] = t;
    this.data.array[e + 1] = r;
    this.data.array[e + 2] = n;
    this.data.array[e + 3] = a;
    return this;
  }
  clone(e) {
    if (e === undefined) {
      console.log("THREE.InterleavedBufferAttribute.clone(): Cloning an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let r = 0; r < this.count; r++) {
        const n = r * this.data.stride + this.offset;
        for (let a = 0; a < this.itemSize; a++) {
          t.push(this.data.array[n + a]);
        }
      }
      return new BufferAttribute(new this.array.constructor(t), this.itemSize, this.normalized);
    } else {
      if (e.interleavedBuffers === undefined) {
        e.interleavedBuffers = {};
      }
      if (e.interleavedBuffers[this.data.uuid] === undefined) {
        e.interleavedBuffers[this.data.uuid] = this.data.clone(e);
      }
      return new InterleavedBufferAttribute(e.interleavedBuffers[this.data.uuid], this.itemSize, this.offset, this.normalized);
    }
  }
  toJSON(e) {
    if (e === undefined) {
      console.log("THREE.InterleavedBufferAttribute.toJSON(): Serializing an interleaved buffer attribute will de-interleave buffer data.");
      const t = [];
      for (let r = 0; r < this.count; r++) {
        const n = r * this.data.stride + this.offset;
        for (let a = 0; a < this.itemSize; a++) {
          t.push(this.data.array[n + a]);
        }
      }
      return {
        itemSize: this.itemSize,
        type: this.array.constructor.name,
        array: t,
        normalized: this.normalized
      };
    } else {
      if (e.interleavedBuffers === undefined) {
        e.interleavedBuffers = {};
      }
      if (e.interleavedBuffers[this.data.uuid] === undefined) {
        e.interleavedBuffers[this.data.uuid] = this.data.toJSON(e);
      }
      return {
        isInterleavedBufferAttribute: true,
        itemSize: this.itemSize,
        data: this.data.uuid,
        offset: this.offset,
        normalized: this.normalized
      };
    }
  }
}
class DataTexture extends Texture {
  constructor(e = null, t = 1, r = 1, n, a, l, c, u, f = NearestFilter, p = NearestFilter, g, v) {
    super(null, l, c, u, f, p, n, a, g, v);
    this.isDataTexture = true;
    this.image = {
      data: e,
      width: t,
      height: r
    };
    this.generateMipmaps = false;
    this.flipY = false;
    this.unpackAlignment = 1;
  }
}
class InstancedBufferAttribute extends BufferAttribute {
  constructor(e, t, r, n = 1) {
    super(e, t, r);
    this.isInstancedBufferAttribute = true;
    this.meshPerAttribute = n;
  }
  copy(e) {
    super.copy(e);
    this.meshPerAttribute = e.meshPerAttribute;
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.meshPerAttribute = this.meshPerAttribute;
    e.isInstancedBufferAttribute = true;
    return e;
  }
}
class LineBasicMaterial extends Material {
  constructor(e) {
    super();
    this.isLineBasicMaterial = true;
    this.type = "LineBasicMaterial";
    this.color = new Color(16777215);
    this.map = null;
    this.linewidth = 1;
    this.linecap = "round";
    this.linejoin = "round";
    this.fog = true;
    this.setValues(e);
  }
  copy(e) {
    super.copy(e);
    this.color.copy(e.color);
    this.map = e.map;
    this.linewidth = e.linewidth;
    this.linecap = e.linecap;
    this.linejoin = e.linejoin;
    this.fog = e.fog;
    return this;
  }
}
const _start$1 = new Vector3();
const _end$1 = new Vector3();
const _inverseMatrix$1 = new Matrix4();
const _ray$1 = new Ray();
const _sphere$1 = new Sphere();
let Line$1 = class extends Object3D {
  constructor(e = new BufferGeometry(), t = new LineBasicMaterial()) {
    super();
    this.isLine = true;
    this.type = "Line";
    this.geometry = e;
    this.material = t;
    this.updateMorphTargets();
  }
  copy(e, t) {
    super.copy(e, t);
    this.material = Array.isArray(e.material) ? e.material.slice() : e.material;
    this.geometry = e.geometry;
    return this;
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position;
      const r = [0];
      for (let n = 1, a = t.count; n < a; n++) {
        _start$1.fromBufferAttribute(t, n - 1);
        _end$1.fromBufferAttribute(t, n);
        r[n] = r[n - 1];
        r[n] += _start$1.distanceTo(_end$1);
      }
      e.setAttribute("lineDistance", new Float32BufferAttribute(r, 1));
    } else {
      console.warn("THREE.Line.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    }
    return this;
  }
  raycast(e, t) {
    const r = this.geometry;
    const n = this.matrixWorld;
    const a = e.params.Line.threshold;
    const l = r.drawRange;
    if (r.boundingSphere === null) {
      r.computeBoundingSphere();
    }
    _sphere$1.copy(r.boundingSphere);
    _sphere$1.applyMatrix4(n);
    _sphere$1.radius += a;
    if (e.ray.intersectsSphere(_sphere$1) === false) {
      return;
    }
    _inverseMatrix$1.copy(n).invert();
    _ray$1.copy(e.ray).applyMatrix4(_inverseMatrix$1);
    const c = a / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    const u = c * c;
    const f = new Vector3();
    const p = new Vector3();
    const g = new Vector3();
    const v = new Vector3();
    const _ = this.isLineSegments ? 2 : 1;
    const T = r.index;
    const S = r.attributes.position;
    if (T !== null) {
      const b = Math.max(0, l.start);
      const C = Math.min(T.count, l.start + l.count);
      for (let w = b, R = C - 1; w < R; w += _) {
        const E = T.getX(w);
        const I = T.getX(w + 1);
        f.fromBufferAttribute(S, E);
        p.fromBufferAttribute(S, I);
        if (_ray$1.distanceSqToSegment(f, p, v, g) > u) {
          continue;
        }
        v.applyMatrix4(this.matrixWorld);
        const k = e.ray.origin.distanceTo(v);
        if (!(k < e.near) && !(k > e.far)) {
          t.push({
            distance: k,
            point: g.clone().applyMatrix4(this.matrixWorld),
            index: w,
            face: null,
            faceIndex: null,
            object: this
          });
        }
      }
    } else {
      const b = Math.max(0, l.start);
      const C = Math.min(S.count, l.start + l.count);
      for (let w = b, R = C - 1; w < R; w += _) {
        f.fromBufferAttribute(S, w);
        p.fromBufferAttribute(S, w + 1);
        if (_ray$1.distanceSqToSegment(f, p, v, g) > u) {
          continue;
        }
        v.applyMatrix4(this.matrixWorld);
        const I = e.ray.origin.distanceTo(v);
        if (!(I < e.near) && !(I > e.far)) {
          t.push({
            distance: I,
            point: g.clone().applyMatrix4(this.matrixWorld),
            index: w,
            face: null,
            faceIndex: null,
            object: this
          });
        }
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes;
    const r = Object.keys(t);
    if (r.length > 0) {
      const n = t[r[0]];
      if (n !== undefined) {
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (let a = 0, l = n.length; a < l; a++) {
          const c = n[a].name || String(a);
          this.morphTargetInfluences.push(0);
          this.morphTargetDictionary[c] = a;
        }
      }
    }
  }
};
const _start = new Vector3();
const _end = new Vector3();
class LineSegments extends Line$1 {
  constructor(e, t) {
    super(e, t);
    this.isLineSegments = true;
    this.type = "LineSegments";
  }
  computeLineDistances() {
    const e = this.geometry;
    if (e.index === null) {
      const t = e.attributes.position;
      const r = [];
      for (let n = 0, a = t.count; n < a; n += 2) {
        _start.fromBufferAttribute(t, n);
        _end.fromBufferAttribute(t, n + 1);
        r[n] = n === 0 ? 0 : r[n - 1];
        r[n + 1] = r[n] + _start.distanceTo(_end);
      }
      e.setAttribute("lineDistance", new Float32BufferAttribute(r, 1));
    } else {
      console.warn("THREE.LineSegments.computeLineDistances(): Computation only possible with non-indexed BufferGeometry.");
    }
    return this;
  }
}
class PointsMaterial extends Material {
  constructor(e) {
    super();
    this.isPointsMaterial = true;
    this.type = "PointsMaterial";
    this.color = new Color(16777215);
    this.map = null;
    this.alphaMap = null;
    this.size = 1;
    this.sizeAttenuation = true;
    this.fog = true;
    this.setValues(e);
  }
  copy(e) {
    super.copy(e);
    this.color.copy(e.color);
    this.map = e.map;
    this.alphaMap = e.alphaMap;
    this.size = e.size;
    this.sizeAttenuation = e.sizeAttenuation;
    this.fog = e.fog;
    return this;
  }
}
const _inverseMatrix = new Matrix4();
const _ray = new Ray();
const _sphere = new Sphere();
const _position$2 = new Vector3();
class Points extends Object3D {
  constructor(e = new BufferGeometry(), t = new PointsMaterial()) {
    super();
    this.isPoints = true;
    this.type = "Points";
    this.geometry = e;
    this.material = t;
    this.updateMorphTargets();
  }
  copy(e, t) {
    super.copy(e, t);
    this.material = Array.isArray(e.material) ? e.material.slice() : e.material;
    this.geometry = e.geometry;
    return this;
  }
  raycast(e, t) {
    const r = this.geometry;
    const n = this.matrixWorld;
    const a = e.params.Points.threshold;
    const l = r.drawRange;
    if (r.boundingSphere === null) {
      r.computeBoundingSphere();
    }
    _sphere.copy(r.boundingSphere);
    _sphere.applyMatrix4(n);
    _sphere.radius += a;
    if (e.ray.intersectsSphere(_sphere) === false) {
      return;
    }
    _inverseMatrix.copy(n).invert();
    _ray.copy(e.ray).applyMatrix4(_inverseMatrix);
    const c = a / ((this.scale.x + this.scale.y + this.scale.z) / 3);
    const u = c * c;
    const f = r.index;
    const g = r.attributes.position;
    if (f !== null) {
      const v = Math.max(0, l.start);
      const _ = Math.min(f.count, l.start + l.count);
      for (let T = v, M = _; T < M; T++) {
        const S = f.getX(T);
        _position$2.fromBufferAttribute(g, S);
        testPoint(_position$2, S, u, n, e, t, this);
      }
    } else {
      const v = Math.max(0, l.start);
      const _ = Math.min(g.count, l.start + l.count);
      for (let T = v, M = _; T < M; T++) {
        _position$2.fromBufferAttribute(g, T);
        testPoint(_position$2, T, u, n, e, t, this);
      }
    }
  }
  updateMorphTargets() {
    const t = this.geometry.morphAttributes;
    const r = Object.keys(t);
    if (r.length > 0) {
      const n = t[r[0]];
      if (n !== undefined) {
        this.morphTargetInfluences = [];
        this.morphTargetDictionary = {};
        for (let a = 0, l = n.length; a < l; a++) {
          const c = n[a].name || String(a);
          this.morphTargetInfluences.push(0);
          this.morphTargetDictionary[c] = a;
        }
      }
    }
  }
}
function testPoint(o, e, t, r, n, a, l) {
  const c = _ray.distanceSqToPoint(o);
  if (c < t) {
    const u = new Vector3();
    _ray.closestPointToPoint(o, u);
    u.applyMatrix4(r);
    const f = n.ray.origin.distanceTo(u);
    if (f < n.near || f > n.far) {
      return;
    }
    a.push({
      distance: f,
      distanceToRay: Math.sqrt(c),
      point: u,
      index: e,
      face: null,
      object: l
    });
  }
}
class VideoTexture extends Texture {
  constructor(e, t, r, n, a, l, c, u, f) {
    super(e, t, r, n, a, l, c, u, f);
    this.isVideoTexture = true;
    this.minFilter = l !== undefined ? l : LinearFilter;
    this.magFilter = a !== undefined ? a : LinearFilter;
    this.generateMipmaps = false;
    const p = this;
    function g() {
      p.needsUpdate = true;
      e.requestVideoFrameCallback(g);
    }
    if ("requestVideoFrameCallback" in e) {
      e.requestVideoFrameCallback(g);
    }
  }
  clone() {
    return new this.constructor(this.image).copy(this);
  }
  update() {
    const e = this.image;
    if ("requestVideoFrameCallback" in e === false && e.readyState >= e.HAVE_CURRENT_DATA) {
      this.needsUpdate = true;
    }
  }
}
class Curve {
  constructor() {
    this.type = "Curve";
    this.arcLengthDivisions = 200;
  }
  getPoint() {
    console.warn("THREE.Curve: .getPoint() not implemented.");
    return null;
  }
  getPointAt(e, t) {
    const r = this.getUtoTmapping(e);
    return this.getPoint(r, t);
  }
  getPoints(e = 5) {
    const t = [];
    for (let r = 0; r <= e; r++) {
      t.push(this.getPoint(r / e));
    }
    return t;
  }
  getSpacedPoints(e = 5) {
    const t = [];
    for (let r = 0; r <= e; r++) {
      t.push(this.getPointAt(r / e));
    }
    return t;
  }
  getLength() {
    const e = this.getLengths();
    return e[e.length - 1];
  }
  getLengths(e = this.arcLengthDivisions) {
    if (this.cacheArcLengths && this.cacheArcLengths.length === e + 1 && !this.needsUpdate) {
      return this.cacheArcLengths;
    }
    this.needsUpdate = false;
    const t = [];
    let r;
    let n = this.getPoint(0);
    let a = 0;
    t.push(0);
    for (let l = 1; l <= e; l++) {
      r = this.getPoint(l / e);
      a += r.distanceTo(n);
      t.push(a);
      n = r;
    }
    this.cacheArcLengths = t;
    return t;
  }
  updateArcLengths() {
    this.needsUpdate = true;
    this.getLengths();
  }
  getUtoTmapping(e, t) {
    const r = this.getLengths();
    let n = 0;
    const a = r.length;
    let l;
    if (t) {
      l = t;
    } else {
      l = e * r[a - 1];
    }
    let c = 0;
    let u = a - 1;
    let f;
    while (c <= u) {
      n = Math.floor(c + (u - c) / 2);
      f = r[n] - l;
      if (f < 0) {
        c = n + 1;
      } else if (f > 0) {
        u = n - 1;
      } else {
        u = n;
        break;
      }
    }
    n = u;
    if (r[n] === l) {
      return n / (a - 1);
    }
    const p = r[n];
    const v = r[n + 1] - p;
    const _ = (l - p) / v;
    return (n + _) / (a - 1);
  }
  getTangent(e, t) {
    let n = e - 0.0001;
    let a = e + 0.0001;
    if (n < 0) {
      n = 0;
    }
    if (a > 1) {
      a = 1;
    }
    const l = this.getPoint(n);
    const c = this.getPoint(a);
    const u = t || (l.isVector2 ? new Vector2() : new Vector3());
    u.copy(c).sub(l).normalize();
    return u;
  }
  getTangentAt(e, t) {
    const r = this.getUtoTmapping(e);
    return this.getTangent(r, t);
  }
  computeFrenetFrames(e, t) {
    const r = new Vector3();
    const n = [];
    const a = [];
    const l = [];
    const c = new Vector3();
    const u = new Matrix4();
    for (let _ = 0; _ <= e; _++) {
      const T = _ / e;
      n[_] = this.getTangentAt(T, new Vector3());
    }
    a[0] = new Vector3();
    l[0] = new Vector3();
    let f = Number.MAX_VALUE;
    const p = Math.abs(n[0].x);
    const g = Math.abs(n[0].y);
    const v = Math.abs(n[0].z);
    if (p <= f) {
      f = p;
      r.set(1, 0, 0);
    }
    if (g <= f) {
      f = g;
      r.set(0, 1, 0);
    }
    if (v <= f) {
      r.set(0, 0, 1);
    }
    c.crossVectors(n[0], r).normalize();
    a[0].crossVectors(n[0], c);
    l[0].crossVectors(n[0], a[0]);
    for (let _ = 1; _ <= e; _++) {
      a[_] = a[_ - 1].clone();
      l[_] = l[_ - 1].clone();
      c.crossVectors(n[_ - 1], n[_]);
      if (c.length() > Number.EPSILON) {
        c.normalize();
        const T = Math.acos(clamp$1(n[_ - 1].dot(n[_]), -1, 1));
        a[_].applyMatrix4(u.makeRotationAxis(c, T));
      }
      l[_].crossVectors(n[_], a[_]);
    }
    if (t === true) {
      let _ = Math.acos(clamp$1(a[0].dot(a[e]), -1, 1));
      _ /= e;
      if (n[0].dot(c.crossVectors(a[0], a[e])) > 0) {
        _ = -_;
      }
      for (let T = 1; T <= e; T++) {
        a[T].applyMatrix4(u.makeRotationAxis(n[T], _ * T));
        l[T].crossVectors(n[T], a[T]);
      }
    }
    return {
      tangents: n,
      normals: a,
      binormals: l
    };
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.arcLengthDivisions = e.arcLengthDivisions;
    return this;
  }
  toJSON() {
    const e = {
      metadata: {
        version: 4.6,
        type: "Curve",
        generator: "Curve.toJSON"
      }
    };
    e.arcLengthDivisions = this.arcLengthDivisions;
    e.type = this.type;
    return e;
  }
  fromJSON(e) {
    this.arcLengthDivisions = e.arcLengthDivisions;
    return this;
  }
}
class EllipseCurve extends Curve {
  constructor(e = 0, t = 0, r = 1, n = 1, a = 0, l = Math.PI * 2, c = false, u = 0) {
    super();
    this.isEllipseCurve = true;
    this.type = "EllipseCurve";
    this.aX = e;
    this.aY = t;
    this.xRadius = r;
    this.yRadius = n;
    this.aStartAngle = a;
    this.aEndAngle = l;
    this.aClockwise = c;
    this.aRotation = u;
  }
  getPoint(e, t) {
    const r = t || new Vector2();
    const n = Math.PI * 2;
    let a = this.aEndAngle - this.aStartAngle;
    const l = Math.abs(a) < Number.EPSILON;
    while (a < 0) {
      a += n;
    }
    while (a > n) {
      a -= n;
    }
    if (a < Number.EPSILON) {
      if (l) {
        a = 0;
      } else {
        a = n;
      }
    }
    if (this.aClockwise === true && !l) {
      if (a === n) {
        a = -n;
      } else {
        a = a - n;
      }
    }
    const c = this.aStartAngle + e * a;
    let u = this.aX + this.xRadius * Math.cos(c);
    let f = this.aY + this.yRadius * Math.sin(c);
    if (this.aRotation !== 0) {
      const p = Math.cos(this.aRotation);
      const g = Math.sin(this.aRotation);
      const v = u - this.aX;
      const _ = f - this.aY;
      u = v * p - _ * g + this.aX;
      f = v * g + _ * p + this.aY;
    }
    return r.set(u, f);
  }
  copy(e) {
    super.copy(e);
    this.aX = e.aX;
    this.aY = e.aY;
    this.xRadius = e.xRadius;
    this.yRadius = e.yRadius;
    this.aStartAngle = e.aStartAngle;
    this.aEndAngle = e.aEndAngle;
    this.aClockwise = e.aClockwise;
    this.aRotation = e.aRotation;
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.aX = this.aX;
    e.aY = this.aY;
    e.xRadius = this.xRadius;
    e.yRadius = this.yRadius;
    e.aStartAngle = this.aStartAngle;
    e.aEndAngle = this.aEndAngle;
    e.aClockwise = this.aClockwise;
    e.aRotation = this.aRotation;
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.aX = e.aX;
    this.aY = e.aY;
    this.xRadius = e.xRadius;
    this.yRadius = e.yRadius;
    this.aStartAngle = e.aStartAngle;
    this.aEndAngle = e.aEndAngle;
    this.aClockwise = e.aClockwise;
    this.aRotation = e.aRotation;
    return this;
  }
}
class ArcCurve extends EllipseCurve {
  constructor(e, t, r, n, a, l) {
    super(e, t, r, r, n, a, l);
    this.isArcCurve = true;
    this.type = "ArcCurve";
  }
}
function CubicPoly() {
  let o = 0;
  let e = 0;
  let t = 0;
  let r = 0;
  function n(a, l, c, u) {
    o = a;
    e = c;
    t = a * -3 + l * 3 - c * 2 - u;
    r = a * 2 - l * 2 + c + u;
  }
  return {
    initCatmullRom: function (a, l, c, u, f) {
      n(l, c, f * (c - a), f * (u - l));
    },
    initNonuniformCatmullRom: function (a, l, c, u, f, p, g) {
      let v = (l - a) / f - (c - a) / (f + p) + (c - l) / p;
      let _ = (c - l) / p - (u - l) / (p + g) + (u - c) / g;
      v *= p;
      _ *= p;
      n(l, c, v, _);
    },
    calc: function (a) {
      const l = a * a;
      const c = l * a;
      return o + e * a + t * l + r * c;
    }
  };
}
const tmp = new Vector3();
const px = new CubicPoly();
const py = new CubicPoly();
const pz = new CubicPoly();
class CatmullRomCurve3 extends Curve {
  constructor(e = [], t = false, r = "centripetal", n = 0.5) {
    super();
    this.isCatmullRomCurve3 = true;
    this.type = "CatmullRomCurve3";
    this.points = e;
    this.closed = t;
    this.curveType = r;
    this.tension = n;
  }
  getPoint(e, t = new Vector3()) {
    const r = t;
    const n = this.points;
    const a = n.length;
    const l = (a - (this.closed ? 0 : 1)) * e;
    let c = Math.floor(l);
    let u = l - c;
    if (this.closed) {
      c += c > 0 ? 0 : (Math.floor(Math.abs(c) / a) + 1) * a;
    } else if (u === 0 && c === a - 1) {
      c = a - 2;
      u = 1;
    }
    let f;
    let p;
    if (this.closed || c > 0) {
      f = n[(c - 1) % a];
    } else {
      tmp.subVectors(n[0], n[1]).add(n[0]);
      f = tmp;
    }
    const g = n[c % a];
    const v = n[(c + 1) % a];
    if (this.closed || c + 2 < a) {
      p = n[(c + 2) % a];
    } else {
      tmp.subVectors(n[a - 1], n[a - 2]).add(n[a - 1]);
      p = tmp;
    }
    if (this.curveType === "centripetal" || this.curveType === "chordal") {
      const _ = this.curveType === "chordal" ? 0.5 : 0.25;
      let T = Math.pow(f.distanceToSquared(g), _);
      let M = Math.pow(g.distanceToSquared(v), _);
      let S = Math.pow(v.distanceToSquared(p), _);
      if (M < 0.0001) {
        M = 1;
      }
      if (T < 0.0001) {
        T = M;
      }
      if (S < 0.0001) {
        S = M;
      }
      px.initNonuniformCatmullRom(f.x, g.x, v.x, p.x, T, M, S);
      py.initNonuniformCatmullRom(f.y, g.y, v.y, p.y, T, M, S);
      pz.initNonuniformCatmullRom(f.z, g.z, v.z, p.z, T, M, S);
    } else if (this.curveType === "catmullrom") {
      px.initCatmullRom(f.x, g.x, v.x, p.x, this.tension);
      py.initCatmullRom(f.y, g.y, v.y, p.y, this.tension);
      pz.initCatmullRom(f.z, g.z, v.z, p.z, this.tension);
    }
    r.set(px.calc(u), py.calc(u), pz.calc(u));
    return r;
  }
  copy(e) {
    super.copy(e);
    this.points = [];
    for (let t = 0, r = e.points.length; t < r; t++) {
      const n = e.points[t];
      this.points.push(n.clone());
    }
    this.closed = e.closed;
    this.curveType = e.curveType;
    this.tension = e.tension;
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, r = this.points.length; t < r; t++) {
      const n = this.points[t];
      e.points.push(n.toArray());
    }
    e.closed = this.closed;
    e.curveType = this.curveType;
    e.tension = this.tension;
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.points = [];
    for (let t = 0, r = e.points.length; t < r; t++) {
      const n = e.points[t];
      this.points.push(new Vector3().fromArray(n));
    }
    this.closed = e.closed;
    this.curveType = e.curveType;
    this.tension = e.tension;
    return this;
  }
}
function CatmullRom(o, e, t, r, n) {
  const a = (r - e) * 0.5;
  const l = (n - t) * 0.5;
  const c = o * o;
  const u = o * c;
  return (t * 2 - r * 2 + a + l) * u + (t * -3 + r * 3 - a * 2 - l) * c + a * o + t;
}
function QuadraticBezierP0(o, e) {
  const t = 1 - o;
  return t * t * e;
}
function QuadraticBezierP1(o, e) {
  return (1 - o) * 2 * o * e;
}
function QuadraticBezierP2(o, e) {
  return o * o * e;
}
function QuadraticBezier(o, e, t, r) {
  return QuadraticBezierP0(o, e) + QuadraticBezierP1(o, t) + QuadraticBezierP2(o, r);
}
function CubicBezierP0(o, e) {
  const t = 1 - o;
  return t * t * t * e;
}
function CubicBezierP1(o, e) {
  const t = 1 - o;
  return t * 3 * t * o * e;
}
function CubicBezierP2(o, e) {
  return (1 - o) * 3 * o * o * e;
}
function CubicBezierP3(o, e) {
  return o * o * o * e;
}
function CubicBezier(o, e, t, r, n) {
  return CubicBezierP0(o, e) + CubicBezierP1(o, t) + CubicBezierP2(o, r) + CubicBezierP3(o, n);
}
class CubicBezierCurve extends Curve {
  constructor(e = new Vector2(), t = new Vector2(), r = new Vector2(), n = new Vector2()) {
    super();
    this.isCubicBezierCurve = true;
    this.type = "CubicBezierCurve";
    this.v0 = e;
    this.v1 = t;
    this.v2 = r;
    this.v3 = n;
  }
  getPoint(e, t = new Vector2()) {
    const r = t;
    const n = this.v0;
    const a = this.v1;
    const l = this.v2;
    const c = this.v3;
    r.set(CubicBezier(e, n.x, a.x, l.x, c.x), CubicBezier(e, n.y, a.y, l.y, c.y));
    return r;
  }
  copy(e) {
    super.copy(e);
    this.v0.copy(e.v0);
    this.v1.copy(e.v1);
    this.v2.copy(e.v2);
    this.v3.copy(e.v3);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.v0 = this.v0.toArray();
    e.v1 = this.v1.toArray();
    e.v2 = this.v2.toArray();
    e.v3 = this.v3.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.v0.fromArray(e.v0);
    this.v1.fromArray(e.v1);
    this.v2.fromArray(e.v2);
    this.v3.fromArray(e.v3);
    return this;
  }
}
class CubicBezierCurve3 extends Curve {
  constructor(e = new Vector3(), t = new Vector3(), r = new Vector3(), n = new Vector3()) {
    super();
    this.isCubicBezierCurve3 = true;
    this.type = "CubicBezierCurve3";
    this.v0 = e;
    this.v1 = t;
    this.v2 = r;
    this.v3 = n;
  }
  getPoint(e, t = new Vector3()) {
    const r = t;
    const n = this.v0;
    const a = this.v1;
    const l = this.v2;
    const c = this.v3;
    r.set(CubicBezier(e, n.x, a.x, l.x, c.x), CubicBezier(e, n.y, a.y, l.y, c.y), CubicBezier(e, n.z, a.z, l.z, c.z));
    return r;
  }
  copy(e) {
    super.copy(e);
    this.v0.copy(e.v0);
    this.v1.copy(e.v1);
    this.v2.copy(e.v2);
    this.v3.copy(e.v3);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.v0 = this.v0.toArray();
    e.v1 = this.v1.toArray();
    e.v2 = this.v2.toArray();
    e.v3 = this.v3.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.v0.fromArray(e.v0);
    this.v1.fromArray(e.v1);
    this.v2.fromArray(e.v2);
    this.v3.fromArray(e.v3);
    return this;
  }
}
class LineCurve extends Curve {
  constructor(e = new Vector2(), t = new Vector2()) {
    super();
    this.isLineCurve = true;
    this.type = "LineCurve";
    this.v1 = e;
    this.v2 = t;
  }
  getPoint(e, t = new Vector2()) {
    const r = t;
    if (e === 1) {
      r.copy(this.v2);
    } else {
      r.copy(this.v2).sub(this.v1);
      r.multiplyScalar(e).add(this.v1);
    }
    return r;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new Vector2()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    super.copy(e);
    this.v1.copy(e.v1);
    this.v2.copy(e.v2);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.v1 = this.v1.toArray();
    e.v2 = this.v2.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.v1.fromArray(e.v1);
    this.v2.fromArray(e.v2);
    return this;
  }
}
class LineCurve3 extends Curve {
  constructor(e = new Vector3(), t = new Vector3()) {
    super();
    this.isLineCurve3 = true;
    this.type = "LineCurve3";
    this.v1 = e;
    this.v2 = t;
  }
  getPoint(e, t = new Vector3()) {
    const r = t;
    if (e === 1) {
      r.copy(this.v2);
    } else {
      r.copy(this.v2).sub(this.v1);
      r.multiplyScalar(e).add(this.v1);
    }
    return r;
  }
  getPointAt(e, t) {
    return this.getPoint(e, t);
  }
  getTangent(e, t = new Vector3()) {
    return t.subVectors(this.v2, this.v1).normalize();
  }
  getTangentAt(e, t) {
    return this.getTangent(e, t);
  }
  copy(e) {
    super.copy(e);
    this.v1.copy(e.v1);
    this.v2.copy(e.v2);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.v1 = this.v1.toArray();
    e.v2 = this.v2.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.v1.fromArray(e.v1);
    this.v2.fromArray(e.v2);
    return this;
  }
}
class QuadraticBezierCurve extends Curve {
  constructor(e = new Vector2(), t = new Vector2(), r = new Vector2()) {
    super();
    this.isQuadraticBezierCurve = true;
    this.type = "QuadraticBezierCurve";
    this.v0 = e;
    this.v1 = t;
    this.v2 = r;
  }
  getPoint(e, t = new Vector2()) {
    const r = t;
    const n = this.v0;
    const a = this.v1;
    const l = this.v2;
    r.set(QuadraticBezier(e, n.x, a.x, l.x), QuadraticBezier(e, n.y, a.y, l.y));
    return r;
  }
  copy(e) {
    super.copy(e);
    this.v0.copy(e.v0);
    this.v1.copy(e.v1);
    this.v2.copy(e.v2);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.v0 = this.v0.toArray();
    e.v1 = this.v1.toArray();
    e.v2 = this.v2.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.v0.fromArray(e.v0);
    this.v1.fromArray(e.v1);
    this.v2.fromArray(e.v2);
    return this;
  }
}
class QuadraticBezierCurve3 extends Curve {
  constructor(e = new Vector3(), t = new Vector3(), r = new Vector3()) {
    super();
    this.isQuadraticBezierCurve3 = true;
    this.type = "QuadraticBezierCurve3";
    this.v0 = e;
    this.v1 = t;
    this.v2 = r;
  }
  getPoint(e, t = new Vector3()) {
    const r = t;
    const n = this.v0;
    const a = this.v1;
    const l = this.v2;
    r.set(QuadraticBezier(e, n.x, a.x, l.x), QuadraticBezier(e, n.y, a.y, l.y), QuadraticBezier(e, n.z, a.z, l.z));
    return r;
  }
  copy(e) {
    super.copy(e);
    this.v0.copy(e.v0);
    this.v1.copy(e.v1);
    this.v2.copy(e.v2);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.v0 = this.v0.toArray();
    e.v1 = this.v1.toArray();
    e.v2 = this.v2.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.v0.fromArray(e.v0);
    this.v1.fromArray(e.v1);
    this.v2.fromArray(e.v2);
    return this;
  }
}
class SplineCurve extends Curve {
  constructor(e = []) {
    super();
    this.isSplineCurve = true;
    this.type = "SplineCurve";
    this.points = e;
  }
  getPoint(e, t = new Vector2()) {
    const r = t;
    const n = this.points;
    const a = (n.length - 1) * e;
    const l = Math.floor(a);
    const c = a - l;
    const u = n[l === 0 ? l : l - 1];
    const f = n[l];
    const p = n[l > n.length - 2 ? n.length - 1 : l + 1];
    const g = n[l > n.length - 3 ? n.length - 1 : l + 2];
    r.set(CatmullRom(c, u.x, f.x, p.x, g.x), CatmullRom(c, u.y, f.y, p.y, g.y));
    return r;
  }
  copy(e) {
    super.copy(e);
    this.points = [];
    for (let t = 0, r = e.points.length; t < r; t++) {
      const n = e.points[t];
      this.points.push(n.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.points = [];
    for (let t = 0, r = this.points.length; t < r; t++) {
      const n = this.points[t];
      e.points.push(n.toArray());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.points = [];
    for (let t = 0, r = e.points.length; t < r; t++) {
      const n = e.points[t];
      this.points.push(new Vector2().fromArray(n));
    }
    return this;
  }
}
var Curves = Object.freeze({
  __proto__: null,
  ArcCurve,
  CatmullRomCurve3,
  CubicBezierCurve,
  CubicBezierCurve3,
  EllipseCurve,
  LineCurve,
  LineCurve3,
  QuadraticBezierCurve,
  QuadraticBezierCurve3,
  SplineCurve
});
class CurvePath extends Curve {
  constructor() {
    super();
    this.type = "CurvePath";
    this.curves = [];
    this.autoClose = false;
  }
  add(e) {
    this.curves.push(e);
  }
  closePath() {
    const e = this.curves[0].getPoint(0);
    const t = this.curves[this.curves.length - 1].getPoint(1);
    if (!e.equals(t)) {
      const r = e.isVector2 === true ? "LineCurve" : "LineCurve3";
      this.curves.push(new Curves[r](t, e));
    }
    return this;
  }
  getPoint(e, t) {
    const r = e * this.getLength();
    const n = this.getCurveLengths();
    let a = 0;
    while (a < n.length) {
      if (n[a] >= r) {
        const l = n[a] - r;
        const c = this.curves[a];
        const u = c.getLength();
        const f = u === 0 ? 0 : 1 - l / u;
        return c.getPointAt(f, t);
      }
      a++;
    }
    return null;
  }
  getLength() {
    const e = this.getCurveLengths();
    return e[e.length - 1];
  }
  updateArcLengths() {
    this.needsUpdate = true;
    this.cacheLengths = null;
    this.getCurveLengths();
  }
  getCurveLengths() {
    if (this.cacheLengths && this.cacheLengths.length === this.curves.length) {
      return this.cacheLengths;
    }
    const e = [];
    let t = 0;
    for (let r = 0, n = this.curves.length; r < n; r++) {
      t += this.curves[r].getLength();
      e.push(t);
    }
    this.cacheLengths = e;
    return e;
  }
  getSpacedPoints(e = 40) {
    const t = [];
    for (let r = 0; r <= e; r++) {
      t.push(this.getPoint(r / e));
    }
    if (this.autoClose) {
      t.push(t[0]);
    }
    return t;
  }
  getPoints(e = 12) {
    const t = [];
    let r;
    for (let n = 0, a = this.curves; n < a.length; n++) {
      const l = a[n];
      const c = l.isEllipseCurve ? e * 2 : l.isLineCurve || l.isLineCurve3 ? 1 : l.isSplineCurve ? e * l.points.length : e;
      const u = l.getPoints(c);
      for (let f = 0; f < u.length; f++) {
        const p = u[f];
        if (!r || !r.equals(p)) {
          t.push(p);
          r = p;
        }
      }
    }
    if (this.autoClose && t.length > 1 && !t[t.length - 1].equals(t[0])) {
      t.push(t[0]);
    }
    return t;
  }
  copy(e) {
    super.copy(e);
    this.curves = [];
    for (let t = 0, r = e.curves.length; t < r; t++) {
      const n = e.curves[t];
      this.curves.push(n.clone());
    }
    this.autoClose = e.autoClose;
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.autoClose = this.autoClose;
    e.curves = [];
    for (let t = 0, r = this.curves.length; t < r; t++) {
      const n = this.curves[t];
      e.curves.push(n.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.autoClose = e.autoClose;
    this.curves = [];
    for (let t = 0, r = e.curves.length; t < r; t++) {
      const n = e.curves[t];
      this.curves.push(new Curves[n.type]().fromJSON(n));
    }
    return this;
  }
}
class Path extends CurvePath {
  constructor(e) {
    super();
    this.type = "Path";
    this.currentPoint = new Vector2();
    if (e) {
      this.setFromPoints(e);
    }
  }
  setFromPoints(e) {
    this.moveTo(e[0].x, e[0].y);
    for (let t = 1, r = e.length; t < r; t++) {
      this.lineTo(e[t].x, e[t].y);
    }
    return this;
  }
  moveTo(e, t) {
    this.currentPoint.set(e, t);
    return this;
  }
  lineTo(e, t) {
    const r = new LineCurve(this.currentPoint.clone(), new Vector2(e, t));
    this.curves.push(r);
    this.currentPoint.set(e, t);
    return this;
  }
  quadraticCurveTo(e, t, r, n) {
    const a = new QuadraticBezierCurve(this.currentPoint.clone(), new Vector2(e, t), new Vector2(r, n));
    this.curves.push(a);
    this.currentPoint.set(r, n);
    return this;
  }
  bezierCurveTo(e, t, r, n, a, l) {
    const c = new CubicBezierCurve(this.currentPoint.clone(), new Vector2(e, t), new Vector2(r, n), new Vector2(a, l));
    this.curves.push(c);
    this.currentPoint.set(a, l);
    return this;
  }
  splineThru(e) {
    const t = [this.currentPoint.clone()].concat(e);
    const r = new SplineCurve(t);
    this.curves.push(r);
    this.currentPoint.copy(e[e.length - 1]);
    return this;
  }
  arc(e, t, r, n, a, l) {
    const c = this.currentPoint.x;
    const u = this.currentPoint.y;
    this.absarc(e + c, t + u, r, n, a, l);
    return this;
  }
  absarc(e, t, r, n, a, l) {
    this.absellipse(e, t, r, r, n, a, l);
    return this;
  }
  ellipse(e, t, r, n, a, l, c, u) {
    const f = this.currentPoint.x;
    const p = this.currentPoint.y;
    this.absellipse(e + f, t + p, r, n, a, l, c, u);
    return this;
  }
  absellipse(e, t, r, n, a, l, c, u) {
    const f = new EllipseCurve(e, t, r, n, a, l, c, u);
    if (this.curves.length > 0) {
      const g = f.getPoint(0);
      if (!g.equals(this.currentPoint)) {
        this.lineTo(g.x, g.y);
      }
    }
    this.curves.push(f);
    const p = f.getPoint(1);
    this.currentPoint.copy(p);
    return this;
  }
  copy(e) {
    super.copy(e);
    this.currentPoint.copy(e.currentPoint);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.currentPoint = this.currentPoint.toArray();
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.currentPoint.fromArray(e.currentPoint);
    return this;
  }
}
class CircleGeometry extends BufferGeometry {
  constructor(e = 1, t = 32, r = 0, n = Math.PI * 2) {
    super();
    this.type = "CircleGeometry";
    this.parameters = {
      radius: e,
      segments: t,
      thetaStart: r,
      thetaLength: n
    };
    t = Math.max(3, t);
    const a = [];
    const l = [];
    const c = [];
    const u = [];
    const f = new Vector3();
    const p = new Vector2();
    l.push(0, 0, 0);
    c.push(0, 0, 1);
    u.push(0.5, 0.5);
    for (let g = 0, v = 3; g <= t; g++, v += 3) {
      const _ = r + g / t * n;
      f.x = e * Math.cos(_);
      f.y = e * Math.sin(_);
      l.push(f.x, f.y, f.z);
      c.push(0, 0, 1);
      p.x = (l[v] / e + 1) / 2;
      p.y = (l[v + 1] / e + 1) / 2;
      u.push(p.x, p.y);
    }
    for (let g = 1; g <= t; g++) {
      a.push(g, g + 1, 0);
    }
    this.setIndex(a);
    this.setAttribute("position", new Float32BufferAttribute(l, 3));
    this.setAttribute("normal", new Float32BufferAttribute(c, 3));
    this.setAttribute("uv", new Float32BufferAttribute(u, 2));
  }
  copy(e) {
    super.copy(e);
    this.parameters = Object.assign({}, e.parameters);
    return this;
  }
  static fromJSON(e) {
    return new CircleGeometry(e.radius, e.segments, e.thetaStart, e.thetaLength);
  }
}
class Shape extends Path {
  constructor(e) {
    super(e);
    this.uuid = generateUUID();
    this.type = "Shape";
    this.holes = [];
  }
  getPointsHoles(e) {
    const t = [];
    for (let r = 0, n = this.holes.length; r < n; r++) {
      t[r] = this.holes[r].getPoints(e);
    }
    return t;
  }
  extractPoints(e) {
    return {
      shape: this.getPoints(e),
      holes: this.getPointsHoles(e)
    };
  }
  copy(e) {
    super.copy(e);
    this.holes = [];
    for (let t = 0, r = e.holes.length; t < r; t++) {
      const n = e.holes[t];
      this.holes.push(n.clone());
    }
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.uuid = this.uuid;
    e.holes = [];
    for (let t = 0, r = this.holes.length; t < r; t++) {
      const n = this.holes[t];
      e.holes.push(n.toJSON());
    }
    return e;
  }
  fromJSON(e) {
    super.fromJSON(e);
    this.uuid = e.uuid;
    this.holes = [];
    for (let t = 0, r = e.holes.length; t < r; t++) {
      const n = e.holes[t];
      this.holes.push(new Path().fromJSON(n));
    }
    return this;
  }
}
const Earcut = {
  triangulate: function (o, e, t = 2) {
    const r = e && e.length;
    const n = r ? e[0] * t : o.length;
    let a = linkedList(o, 0, n, t, true);
    const l = [];
    if (!a || a.next === a.prev) {
      return l;
    }
    let c;
    let u;
    let f;
    let p;
    let g;
    let v;
    let _;
    if (r) {
      a = eliminateHoles(o, e, a, t);
    }
    if (o.length > t * 80) {
      c = f = o[0];
      u = p = o[1];
      for (let T = t; T < n; T += t) {
        g = o[T];
        v = o[T + 1];
        if (g < c) {
          c = g;
        }
        if (v < u) {
          u = v;
        }
        if (g > f) {
          f = g;
        }
        if (v > p) {
          p = v;
        }
      }
      _ = Math.max(f - c, p - u);
      _ = _ !== 0 ? 32767 / _ : 0;
    }
    earcutLinked(a, l, t, c, u, _, 0);
    return l;
  }
};
function linkedList(o, e, t, r, n) {
  let a;
  let l;
  if (n === signedArea(o, e, t, r) > 0) {
    for (a = e; a < t; a += r) {
      l = insertNode(a, o[a], o[a + 1], l);
    }
  } else {
    for (a = t - r; a >= e; a -= r) {
      l = insertNode(a, o[a], o[a + 1], l);
    }
  }
  if (l && equals(l, l.next)) {
    removeNode(l);
    l = l.next;
  }
  return l;
}
function filterPoints(o, e) {
  if (!o) {
    return o;
  }
  e ||= o;
  let t = o;
  let r;
  do {
    r = false;
    if (!t.steiner && (equals(t, t.next) || area(t.prev, t, t.next) === 0)) {
      removeNode(t);
      t = e = t.prev;
      if (t === t.next) {
        break;
      }
      r = true;
    } else {
      t = t.next;
    }
  } while (r || t !== e);
  return e;
}
function earcutLinked(o, e, t, r, n, a, l) {
  if (!o) {
    return;
  }
  if (!l && a) {
    indexCurve(o, r, n, a);
  }
  let c = o;
  let u;
  let f;
  while (o.prev !== o.next) {
    u = o.prev;
    f = o.next;
    if (a ? isEarHashed(o, r, n, a) : isEar(o)) {
      e.push(u.i / t | 0);
      e.push(o.i / t | 0);
      e.push(f.i / t | 0);
      removeNode(o);
      o = f.next;
      c = f.next;
      continue;
    }
    o = f;
    if (o === c) {
      if (l) {
        if (l === 1) {
          o = cureLocalIntersections(filterPoints(o), e, t);
          earcutLinked(o, e, t, r, n, a, 2);
        } else if (l === 2) {
          splitEarcut(o, e, t, r, n, a);
        }
      } else {
        earcutLinked(filterPoints(o), e, t, r, n, a, 1);
      }
      break;
    }
  }
}
function isEar(o) {
  const e = o.prev;
  const t = o;
  const r = o.next;
  if (area(e, t, r) >= 0) {
    return false;
  }
  const n = e.x;
  const a = t.x;
  const l = r.x;
  const c = e.y;
  const u = t.y;
  const f = r.y;
  const p = n < a ? n < l ? n : l : a < l ? a : l;
  const g = c < u ? c < f ? c : f : u < f ? u : f;
  const v = n > a ? n > l ? n : l : a > l ? a : l;
  const _ = c > u ? c > f ? c : f : u > f ? u : f;
  let T = r.next;
  while (T !== e) {
    if (T.x >= p && T.x <= v && T.y >= g && T.y <= _ && pointInTriangle(n, c, a, u, l, f, T.x, T.y) && area(T.prev, T, T.next) >= 0) {
      return false;
    }
    T = T.next;
  }
  return true;
}
function isEarHashed(o, e, t, r) {
  const n = o.prev;
  const a = o;
  const l = o.next;
  if (area(n, a, l) >= 0) {
    return false;
  }
  const c = n.x;
  const u = a.x;
  const f = l.x;
  const p = n.y;
  const g = a.y;
  const v = l.y;
  const _ = c < u ? c < f ? c : f : u < f ? u : f;
  const T = p < g ? p < v ? p : v : g < v ? g : v;
  const M = c > u ? c > f ? c : f : u > f ? u : f;
  const S = p > g ? p > v ? p : v : g > v ? g : v;
  const b = zOrder(_, T, e, t, r);
  const C = zOrder(M, S, e, t, r);
  let w = o.prevZ;
  let R = o.nextZ;
  while (w && w.z >= b && R && R.z <= C) {
    if (w.x >= _ && w.x <= M && w.y >= T && w.y <= S && w !== n && w !== l && pointInTriangle(c, p, u, g, f, v, w.x, w.y) && area(w.prev, w, w.next) >= 0 || (w = w.prevZ, R.x >= _ && R.x <= M && R.y >= T && R.y <= S && R !== n && R !== l && pointInTriangle(c, p, u, g, f, v, R.x, R.y) && area(R.prev, R, R.next) >= 0)) {
      return false;
    }
    R = R.nextZ;
  }
  while (w && w.z >= b) {
    if (w.x >= _ && w.x <= M && w.y >= T && w.y <= S && w !== n && w !== l && pointInTriangle(c, p, u, g, f, v, w.x, w.y) && area(w.prev, w, w.next) >= 0) {
      return false;
    }
    w = w.prevZ;
  }
  while (R && R.z <= C) {
    if (R.x >= _ && R.x <= M && R.y >= T && R.y <= S && R !== n && R !== l && pointInTriangle(c, p, u, g, f, v, R.x, R.y) && area(R.prev, R, R.next) >= 0) {
      return false;
    }
    R = R.nextZ;
  }
  return true;
}
function cureLocalIntersections(o, e, t) {
  let r = o;
  do {
    const n = r.prev;
    const a = r.next.next;
    if (!equals(n, a) && intersects(n, r, r.next, a) && locallyInside(n, a) && locallyInside(a, n)) {
      e.push(n.i / t | 0);
      e.push(r.i / t | 0);
      e.push(a.i / t | 0);
      removeNode(r);
      removeNode(r.next);
      r = o = a;
    }
    r = r.next;
  } while (r !== o);
  return filterPoints(r);
}
function splitEarcut(o, e, t, r, n, a) {
  let l = o;
  do {
    let c = l.next.next;
    while (c !== l.prev) {
      if (l.i !== c.i && isValidDiagonal(l, c)) {
        let u = splitPolygon(l, c);
        l = filterPoints(l, l.next);
        u = filterPoints(u, u.next);
        earcutLinked(l, e, t, r, n, a, 0);
        earcutLinked(u, e, t, r, n, a, 0);
        return;
      }
      c = c.next;
    }
    l = l.next;
  } while (l !== o);
}
function eliminateHoles(o, e, t, r) {
  const n = [];
  let a;
  let l;
  let c;
  let u;
  let f;
  a = 0;
  l = e.length;
  for (; a < l; a++) {
    c = e[a] * r;
    u = a < l - 1 ? e[a + 1] * r : o.length;
    f = linkedList(o, c, u, r, false);
    if (f === f.next) {
      f.steiner = true;
    }
    n.push(getLeftmost(f));
  }
  n.sort(compareX);
  a = 0;
  for (; a < n.length; a++) {
    t = eliminateHole(n[a], t);
  }
  return t;
}
function compareX(o, e) {
  return o.x - e.x;
}
function eliminateHole(o, e) {
  const t = findHoleBridge(o, e);
  if (!t) {
    return e;
  }
  const r = splitPolygon(t, o);
  filterPoints(r, r.next);
  return filterPoints(t, t.next);
}
function findHoleBridge(o, e) {
  let t = e;
  let r = -Infinity;
  let n;
  const a = o.x;
  const l = o.y;
  do {
    if (l <= t.y && l >= t.next.y && t.next.y !== t.y) {
      const v = t.x + (l - t.y) * (t.next.x - t.x) / (t.next.y - t.y);
      if (v <= a && v > r && (r = v, n = t.x < t.next.x ? t : t.next, v === a)) {
        return n;
      }
    }
    t = t.next;
  } while (t !== e);
  if (!n) {
    return null;
  }
  const c = n;
  const u = n.x;
  const f = n.y;
  let p = Infinity;
  let g;
  t = n;
  do {
    if (a >= t.x && t.x >= u && a !== t.x && pointInTriangle(l < f ? a : r, l, u, f, l < f ? r : a, l, t.x, t.y)) {
      g = Math.abs(l - t.y) / (a - t.x);
      if (locallyInside(t, o) && (g < p || g === p && (t.x > n.x || t.x === n.x && sectorContainsSector(n, t)))) {
        n = t;
        p = g;
      }
    }
    t = t.next;
  } while (t !== c);
  return n;
}
function sectorContainsSector(o, e) {
  return area(o.prev, o, e.prev) < 0 && area(e.next, o, o.next) < 0;
}
function indexCurve(o, e, t, r) {
  let n = o;
  do {
    if (n.z === 0) {
      n.z = zOrder(n.x, n.y, e, t, r);
    }
    n.prevZ = n.prev;
    n.nextZ = n.next;
    n = n.next;
  } while (n !== o);
  n.prevZ.nextZ = null;
  n.prevZ = null;
  sortLinked(n);
}
function sortLinked(o) {
  let e;
  let t;
  let r;
  let n;
  let a;
  let l;
  let c;
  let u;
  let f = 1;
  do {
    t = o;
    o = null;
    a = null;
    l = 0;
    while (t) {
      l++;
      r = t;
      c = 0;
      e = 0;
      for (; e < f && (c++, r = r.nextZ, !!r); e++);
      for (u = f; c > 0 || u > 0 && r;) {
        if (c !== 0 && (u === 0 || !r || t.z <= r.z)) {
          n = t;
          t = t.nextZ;
          c--;
        } else {
          n = r;
          r = r.nextZ;
          u--;
        }
        if (a) {
          a.nextZ = n;
        } else {
          o = n;
        }
        n.prevZ = a;
        a = n;
      }
      t = r;
    }
    a.nextZ = null;
    f *= 2;
  } while (l > 1);
  return o;
}
function zOrder(o, e, t, r, n) {
  o = (o - t) * n | 0;
  e = (e - r) * n | 0;
  o = (o | o << 8) & 16711935;
  o = (o | o << 4) & 252645135;
  o = (o | o << 2) & 858993459;
  o = (o | o << 1) & 1431655765;
  e = (e | e << 8) & 16711935;
  e = (e | e << 4) & 252645135;
  e = (e | e << 2) & 858993459;
  e = (e | e << 1) & 1431655765;
  return o | e << 1;
}
function getLeftmost(o) {
  let e = o;
  let t = o;
  do {
    if (e.x < t.x || e.x === t.x && e.y < t.y) {
      t = e;
    }
    e = e.next;
  } while (e !== o);
  return t;
}
function pointInTriangle(o, e, t, r, n, a, l, c) {
  return (n - l) * (e - c) >= (o - l) * (a - c) && (o - l) * (r - c) >= (t - l) * (e - c) && (t - l) * (a - c) >= (n - l) * (r - c);
}
function isValidDiagonal(o, e) {
  return o.next.i !== e.i && o.prev.i !== e.i && !intersectsPolygon(o, e) && (locallyInside(o, e) && locallyInside(e, o) && middleInside(o, e) && (area(o.prev, o, e.prev) || area(o, e.prev, e)) || equals(o, e) && area(o.prev, o, o.next) > 0 && area(e.prev, e, e.next) > 0);
}
function area(o, e, t) {
  return (e.y - o.y) * (t.x - e.x) - (e.x - o.x) * (t.y - e.y);
}
function equals(o, e) {
  return o.x === e.x && o.y === e.y;
}
function intersects(o, e, t, r) {
  const n = sign(area(o, e, t));
  const a = sign(area(o, e, r));
  const l = sign(area(t, r, o));
  const c = sign(area(t, r, e));
  return n !== a && l !== c || n === 0 && !!onSegment(o, t, e) || a === 0 && !!onSegment(o, r, e) || l === 0 && !!onSegment(t, o, r) || c === 0 && !!onSegment(t, e, r);
}
function onSegment(o, e, t) {
  return e.x <= Math.max(o.x, t.x) && e.x >= Math.min(o.x, t.x) && e.y <= Math.max(o.y, t.y) && e.y >= Math.min(o.y, t.y);
}
function sign(o) {
  if (o > 0) {
    return 1;
  } else if (o < 0) {
    return -1;
  } else {
    return 0;
  }
}
function intersectsPolygon(o, e) {
  let t = o;
  do {
    if (t.i !== o.i && t.next.i !== o.i && t.i !== e.i && t.next.i !== e.i && intersects(t, t.next, o, e)) {
      return true;
    }
    t = t.next;
  } while (t !== o);
  return false;
}
function locallyInside(o, e) {
  if (area(o.prev, o, o.next) < 0) {
    return area(o, e, o.next) >= 0 && area(o, o.prev, e) >= 0;
  } else {
    return area(o, e, o.prev) < 0 || area(o, o.next, e) < 0;
  }
}
function middleInside(o, e) {
  let t = o;
  let r = false;
  const n = (o.x + e.x) / 2;
  const a = (o.y + e.y) / 2;
  do {
    if (t.y > a != t.next.y > a && t.next.y !== t.y && n < (t.next.x - t.x) * (a - t.y) / (t.next.y - t.y) + t.x) {
      r = !r;
    }
    t = t.next;
  } while (t !== o);
  return r;
}
function splitPolygon(o, e) {
  const t = new Node(o.i, o.x, o.y);
  const r = new Node(e.i, e.x, e.y);
  const n = o.next;
  const a = e.prev;
  o.next = e;
  e.prev = o;
  t.next = n;
  n.prev = t;
  r.next = t;
  t.prev = r;
  a.next = r;
  r.prev = a;
  return r;
}
function insertNode(o, e, t, r) {
  const n = new Node(o, e, t);
  if (r) {
    n.next = r.next;
    n.prev = r;
    r.next.prev = n;
    r.next = n;
  } else {
    n.prev = n;
    n.next = n;
  }
  return n;
}
function removeNode(o) {
  o.next.prev = o.prev;
  o.prev.next = o.next;
  if (o.prevZ) {
    o.prevZ.nextZ = o.nextZ;
  }
  if (o.nextZ) {
    o.nextZ.prevZ = o.prevZ;
  }
}
function Node(o, e, t) {
  this.i = o;
  this.x = e;
  this.y = t;
  this.prev = null;
  this.next = null;
  this.z = 0;
  this.prevZ = null;
  this.nextZ = null;
  this.steiner = false;
}
function signedArea(o, e, t, r) {
  let n = 0;
  for (let a = e, l = t - r; a < t; a += r) {
    n += (o[l] - o[a]) * (o[a + 1] + o[l + 1]);
    l = a;
  }
  return n;
}
class ShapeUtils {
  static area(e) {
    const t = e.length;
    let r = 0;
    for (let n = t - 1, a = 0; a < t; n = a++) {
      r += e[n].x * e[a].y - e[a].x * e[n].y;
    }
    return r * 0.5;
  }
  static isClockWise(e) {
    return ShapeUtils.area(e) < 0;
  }
  static triangulateShape(e, t) {
    const r = [];
    const n = [];
    const a = [];
    removeDupEndPts(e);
    addContour(r, e);
    let l = e.length;
    t.forEach(removeDupEndPts);
    for (let u = 0; u < t.length; u++) {
      n.push(l);
      l += t[u].length;
      addContour(r, t[u]);
    }
    const c = Earcut.triangulate(r, n);
    for (let u = 0; u < c.length; u += 3) {
      a.push(c.slice(u, u + 3));
    }
    return a;
  }
}
function removeDupEndPts(o) {
  const e = o.length;
  if (e > 2 && o[e - 1].equals(o[0])) {
    o.pop();
  }
}
function addContour(o, e) {
  for (let t = 0; t < e.length; t++) {
    o.push(e[t].x);
    o.push(e[t].y);
  }
}
class ShapeGeometry extends BufferGeometry {
  constructor(e = new Shape([new Vector2(0, 0.5), new Vector2(-0.5, -0.5), new Vector2(0.5, -0.5)]), t = 12) {
    super();
    this.type = "ShapeGeometry";
    this.parameters = {
      shapes: e,
      curveSegments: t
    };
    const r = [];
    const n = [];
    const a = [];
    const l = [];
    let c = 0;
    let u = 0;
    if (Array.isArray(e) === false) {
      f(e);
    } else {
      for (let p = 0; p < e.length; p++) {
        f(e[p]);
        this.addGroup(c, u, p);
        c += u;
        u = 0;
      }
    }
    this.setIndex(r);
    this.setAttribute("position", new Float32BufferAttribute(n, 3));
    this.setAttribute("normal", new Float32BufferAttribute(a, 3));
    this.setAttribute("uv", new Float32BufferAttribute(l, 2));
    function f(p) {
      const g = n.length / 3;
      const v = p.extractPoints(t);
      let _ = v.shape;
      const T = v.holes;
      if (ShapeUtils.isClockWise(_) === false) {
        _ = _.reverse();
      }
      for (let S = 0, b = T.length; S < b; S++) {
        const C = T[S];
        if (ShapeUtils.isClockWise(C) === true) {
          T[S] = C.reverse();
        }
      }
      const M = ShapeUtils.triangulateShape(_, T);
      for (let S = 0, b = T.length; S < b; S++) {
        const C = T[S];
        _ = _.concat(C);
      }
      for (let S = 0, b = _.length; S < b; S++) {
        const C = _[S];
        n.push(C.x, C.y, 0);
        a.push(0, 0, 1);
        l.push(C.x, C.y);
      }
      for (let S = 0, b = M.length; S < b; S++) {
        const C = M[S];
        const w = C[0] + g;
        const R = C[1] + g;
        const E = C[2] + g;
        r.push(w, R, E);
        u += 3;
      }
    }
  }
  copy(e) {
    super.copy(e);
    this.parameters = Object.assign({}, e.parameters);
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    const t = this.parameters.shapes;
    return toJSON(t, e);
  }
  static fromJSON(e, t) {
    const r = [];
    for (let n = 0, a = e.shapes.length; n < a; n++) {
      const l = t[e.shapes[n]];
      r.push(l);
    }
    return new ShapeGeometry(r, e.curveSegments);
  }
}
function toJSON(o, e) {
  e.shapes = [];
  if (Array.isArray(o)) {
    for (let t = 0, r = o.length; t < r; t++) {
      const n = o[t];
      e.shapes.push(n.uuid);
    }
  } else {
    e.shapes.push(o.uuid);
  }
  return e;
}
class SphereGeometry extends BufferGeometry {
  constructor(e = 1, t = 32, r = 16, n = 0, a = Math.PI * 2, l = 0, c = Math.PI) {
    super();
    this.type = "SphereGeometry";
    this.parameters = {
      radius: e,
      widthSegments: t,
      heightSegments: r,
      phiStart: n,
      phiLength: a,
      thetaStart: l,
      thetaLength: c
    };
    t = Math.max(3, Math.floor(t));
    r = Math.max(2, Math.floor(r));
    const u = Math.min(l + c, Math.PI);
    let f = 0;
    const p = [];
    const g = new Vector3();
    const v = new Vector3();
    const _ = [];
    const T = [];
    const M = [];
    const S = [];
    for (let b = 0; b <= r; b++) {
      const C = [];
      const w = b / r;
      let R = 0;
      if (b === 0 && l === 0) {
        R = 0.5 / t;
      } else if (b === r && u === Math.PI) {
        R = -0.5 / t;
      }
      for (let E = 0; E <= t; E++) {
        const I = E / t;
        g.x = -e * Math.cos(n + I * a) * Math.sin(l + w * c);
        g.y = e * Math.cos(l + w * c);
        g.z = e * Math.sin(n + I * a) * Math.sin(l + w * c);
        T.push(g.x, g.y, g.z);
        v.copy(g).normalize();
        M.push(v.x, v.y, v.z);
        S.push(I + R, 1 - w);
        C.push(f++);
      }
      p.push(C);
    }
    for (let b = 0; b < r; b++) {
      for (let C = 0; C < t; C++) {
        const w = p[b][C + 1];
        const R = p[b][C];
        const E = p[b + 1][C];
        const I = p[b + 1][C + 1];
        if (b !== 0 || l > 0) {
          _.push(w, R, I);
        }
        if (b !== r - 1 || u < Math.PI) {
          _.push(R, E, I);
        }
      }
    }
    this.setIndex(_);
    this.setAttribute("position", new Float32BufferAttribute(T, 3));
    this.setAttribute("normal", new Float32BufferAttribute(M, 3));
    this.setAttribute("uv", new Float32BufferAttribute(S, 2));
  }
  copy(e) {
    super.copy(e);
    this.parameters = Object.assign({}, e.parameters);
    return this;
  }
  static fromJSON(e) {
    return new SphereGeometry(e.radius, e.widthSegments, e.heightSegments, e.phiStart, e.phiLength, e.thetaStart, e.thetaLength);
  }
}
class RawShaderMaterial extends ShaderMaterial {
  constructor(e) {
    super(e);
    this.isRawShaderMaterial = true;
    this.type = "RawShaderMaterial";
  }
}
class MeshNormalMaterial extends Material {
  constructor(e) {
    super();
    this.isMeshNormalMaterial = true;
    this.type = "MeshNormalMaterial";
    this.bumpMap = null;
    this.bumpScale = 1;
    this.normalMap = null;
    this.normalMapType = TangentSpaceNormalMap;
    this.normalScale = new Vector2(1, 1);
    this.displacementMap = null;
    this.displacementScale = 1;
    this.displacementBias = 0;
    this.wireframe = false;
    this.wireframeLinewidth = 1;
    this.flatShading = false;
    this.setValues(e);
  }
  copy(e) {
    super.copy(e);
    this.bumpMap = e.bumpMap;
    this.bumpScale = e.bumpScale;
    this.normalMap = e.normalMap;
    this.normalMapType = e.normalMapType;
    this.normalScale.copy(e.normalScale);
    this.displacementMap = e.displacementMap;
    this.displacementScale = e.displacementScale;
    this.displacementBias = e.displacementBias;
    this.wireframe = e.wireframe;
    this.wireframeLinewidth = e.wireframeLinewidth;
    this.flatShading = e.flatShading;
    return this;
  }
}
const Cache = {
  enabled: false,
  files: {},
  add: function (o, e) {
    if (this.enabled !== false) {
      this.files[o] = e;
    }
  },
  get: function (o) {
    if (this.enabled !== false) {
      return this.files[o];
    }
  },
  remove: function (o) {
    delete this.files[o];
  },
  clear: function () {
    this.files = {};
  }
};
class LoadingManager {
  constructor(e, t, r) {
    const n = this;
    let a = false;
    let l = 0;
    let c = 0;
    let u;
    const f = [];
    this.onStart = undefined;
    this.onLoad = e;
    this.onProgress = t;
    this.onError = r;
    this.itemStart = function (p) {
      c++;
      if (a === false && n.onStart !== undefined) {
        n.onStart(p, l, c);
      }
      a = true;
    };
    this.itemEnd = function (p) {
      l++;
      if (n.onProgress !== undefined) {
        n.onProgress(p, l, c);
      }
      if (l === c) {
        a = false;
        if (n.onLoad !== undefined) {
          n.onLoad();
        }
      }
    };
    this.itemError = function (p) {
      if (n.onError !== undefined) {
        n.onError(p);
      }
    };
    this.resolveURL = function (p) {
      if (u) {
        return u(p);
      } else {
        return p;
      }
    };
    this.setURLModifier = function (p) {
      u = p;
      return this;
    };
    this.addHandler = function (p, g) {
      f.push(p, g);
      return this;
    };
    this.removeHandler = function (p) {
      const g = f.indexOf(p);
      if (g !== -1) {
        f.splice(g, 2);
      }
      return this;
    };
    this.getHandler = function (p) {
      for (let g = 0, v = f.length; g < v; g += 2) {
        const _ = f[g];
        const T = f[g + 1];
        if (_.global) {
          _.lastIndex = 0;
        }
        if (_.test(p)) {
          return T;
        }
      }
      return null;
    };
  }
}
const DefaultLoadingManager = new LoadingManager();
class Loader {
  constructor(e) {
    this.manager = e !== undefined ? e : DefaultLoadingManager;
    this.crossOrigin = "anonymous";
    this.withCredentials = false;
    this.path = "";
    this.resourcePath = "";
    this.requestHeader = {};
  }
  load() {}
  loadAsync(e, t) {
    const r = this;
    return new Promise(function (n, a) {
      r.load(e, n, t, a);
    });
  }
  parse() {}
  setCrossOrigin(e) {
    this.crossOrigin = e;
    return this;
  }
  setWithCredentials(e) {
    this.withCredentials = e;
    return this;
  }
  setPath(e) {
    this.path = e;
    return this;
  }
  setResourcePath(e) {
    this.resourcePath = e;
    return this;
  }
  setRequestHeader(e) {
    this.requestHeader = e;
    return this;
  }
}
Loader.DEFAULT_MATERIAL_NAME = "__DEFAULT";
const loading = {};
class HttpError extends Error {
  constructor(e, t) {
    super(e);
    this.response = t;
  }
}
class FileLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e = "", t, r, n) {
    if (this.path !== undefined) {
      e = this.path + e;
    }
    e = this.manager.resolveURL(e);
    const a = Cache.get(e);
    if (a !== undefined) {
      this.manager.itemStart(e);
      setTimeout(() => {
        if (t) {
          t(a);
        }
        this.manager.itemEnd(e);
      }, 0);
      return a;
    }
    if (loading[e] !== undefined) {
      loading[e].push({
        onLoad: t,
        onProgress: r,
        onError: n
      });
      return;
    }
    loading[e] = [];
    loading[e].push({
      onLoad: t,
      onProgress: r,
      onError: n
    });
    const l = new Request(e, {
      headers: new Headers(this.requestHeader),
      credentials: this.withCredentials ? "include" : "same-origin"
    });
    const c = this.mimeType;
    const u = this.responseType;
    fetch(l).then(f => {
      if (f.status === 200 || f.status === 0) {
        if (f.status === 0) {
          console.warn("THREE.FileLoader: HTTP Status 0 received.");
        }
        if (typeof ReadableStream === "undefined" || f.body === undefined || f.body.getReader === undefined) {
          return f;
        }
        const p = loading[e];
        const g = f.body.getReader();
        const v = f.headers.get("Content-Length") || f.headers.get("X-File-Size");
        const _ = v ? parseInt(v) : 0;
        const T = _ !== 0;
        let M = 0;
        const S = new ReadableStream({
          start(b) {
            C();
            function C() {
              g.read().then(({
                done: w,
                value: R
              }) => {
                if (w) {
                  b.close();
                } else {
                  M += R.byteLength;
                  const E = new ProgressEvent("progress", {
                    lengthComputable: T,
                    loaded: M,
                    total: _
                  });
                  for (let I = 0, F = p.length; I < F; I++) {
                    const k = p[I];
                    if (k.onProgress) {
                      k.onProgress(E);
                    }
                  }
                  b.enqueue(R);
                  C();
                }
              });
            }
          }
        });
        return new Response(S);
      } else {
        throw new HttpError(`fetch for "${f.url}" responded with ${f.status}: ${f.statusText}`, f);
      }
    }).then(f => {
      switch (u) {
        case "arraybuffer":
          return f.arrayBuffer();
        case "blob":
          return f.blob();
        case "document":
          return f.text().then(p => new DOMParser().parseFromString(p, c));
        case "json":
          return f.json();
        default:
          if (c === undefined) {
            return f.text();
          }
          {
            const g = /charset="?([^;"\s]*)"?/i.exec(c);
            const v = g && g[1] ? g[1].toLowerCase() : undefined;
            const _ = new TextDecoder(v);
            return f.arrayBuffer().then(T => _.decode(T));
          }
      }
    }).then(f => {
      Cache.add(e, f);
      const p = loading[e];
      delete loading[e];
      for (let g = 0, v = p.length; g < v; g++) {
        const _ = p[g];
        if (_.onLoad) {
          _.onLoad(f);
        }
      }
    }).catch(f => {
      const p = loading[e];
      if (p === undefined) {
        this.manager.itemError(e);
        throw f;
      }
      delete loading[e];
      for (let g = 0, v = p.length; g < v; g++) {
        const _ = p[g];
        if (_.onError) {
          _.onError(f);
        }
      }
      this.manager.itemError(e);
    }).finally(() => {
      this.manager.itemEnd(e);
    });
    this.manager.itemStart(e);
  }
  setResponseType(e) {
    this.responseType = e;
    return this;
  }
  setMimeType(e) {
    this.mimeType = e;
    return this;
  }
}
class DataTextureLoader extends Loader {
  constructor(e) {
    super(e);
  }
  load(e, t, r, n) {
    const a = this;
    const l = new DataTexture();
    const c = new FileLoader(this.manager);
    c.setResponseType("arraybuffer");
    c.setRequestHeader(this.requestHeader);
    c.setPath(this.path);
    c.setWithCredentials(a.withCredentials);
    c.load(e, function (u) {
      let f;
      try {
        f = a.parse(u);
      } catch (p) {
        if (n !== undefined) {
          n(p);
        } else {
          console.error(p);
          return;
        }
      }
      if (f.image !== undefined) {
        l.image = f.image;
      } else if (f.data !== undefined) {
        l.image.width = f.width;
        l.image.height = f.height;
        l.image.data = f.data;
      }
      l.wrapS = f.wrapS !== undefined ? f.wrapS : ClampToEdgeWrapping;
      l.wrapT = f.wrapT !== undefined ? f.wrapT : ClampToEdgeWrapping;
      l.magFilter = f.magFilter !== undefined ? f.magFilter : LinearFilter;
      l.minFilter = f.minFilter !== undefined ? f.minFilter : LinearFilter;
      l.anisotropy = f.anisotropy !== undefined ? f.anisotropy : 1;
      if (f.colorSpace !== undefined) {
        l.colorSpace = f.colorSpace;
      } else if (f.encoding !== undefined) {
        l.encoding = f.encoding;
      }
      if (f.flipY !== undefined) {
        l.flipY = f.flipY;
      }
      if (f.format !== undefined) {
        l.format = f.format;
      }
      if (f.type !== undefined) {
        l.type = f.type;
      }
      if (f.mipmaps !== undefined) {
        l.mipmaps = f.mipmaps;
        l.minFilter = LinearMipmapLinearFilter;
      }
      if (f.mipmapCount === 1) {
        l.minFilter = LinearFilter;
      }
      if (f.generateMipmaps !== undefined) {
        l.generateMipmaps = f.generateMipmaps;
      }
      l.needsUpdate = true;
      if (t) {
        t(l, f);
      }
    }, r, n);
    return l;
  }
}
class InstancedBufferGeometry extends BufferGeometry {
  constructor() {
    super();
    this.isInstancedBufferGeometry = true;
    this.type = "InstancedBufferGeometry";
    this.instanceCount = Infinity;
  }
  copy(e) {
    super.copy(e);
    this.instanceCount = e.instanceCount;
    return this;
  }
  toJSON() {
    const e = super.toJSON();
    e.instanceCount = this.instanceCount;
    e.isInstancedBufferGeometry = true;
    return e;
  }
}
let _context;
class AudioContext {
  static getContext() {
    if (_context === undefined) {
      _context = new (window.AudioContext || window.webkitAudioContext)();
    }
    return _context;
  }
  static setContext(e) {
    _context = e;
  }
}
class Clock {
  constructor(e = true) {
    this.autoStart = e;
    this.startTime = 0;
    this.oldTime = 0;
    this.elapsedTime = 0;
    this.running = false;
  }
  start() {
    this.startTime = now();
    this.oldTime = this.startTime;
    this.elapsedTime = 0;
    this.running = true;
  }
  stop() {
    this.getElapsedTime();
    this.running = false;
    this.autoStart = false;
  }
  getElapsedTime() {
    this.getDelta();
    return this.elapsedTime;
  }
  getDelta() {
    let e = 0;
    if (this.autoStart && !this.running) {
      this.start();
      return 0;
    }
    if (this.running) {
      const t = now();
      e = (t - this.oldTime) / 1000;
      this.oldTime = t;
      this.elapsedTime += e;
    }
    return e;
  }
}
function now() {
  return (typeof performance === "undefined" ? Date : performance).now();
}
const _position$1 = new Vector3();
const _quaternion$1 = new Quaternion();
const _scale$1 = new Vector3();
const _orientation$1 = new Vector3();
class AudioListener extends Object3D {
  constructor() {
    super();
    this.type = "AudioListener";
    this.context = AudioContext.getContext();
    this.gain = this.context.createGain();
    this.gain.connect(this.context.destination);
    this.filter = null;
    this.timeDelta = 0;
    this._clock = new Clock();
  }
  getInput() {
    return this.gain;
  }
  removeFilter() {
    if (this.filter !== null) {
      this.gain.disconnect(this.filter);
      this.filter.disconnect(this.context.destination);
      this.gain.connect(this.context.destination);
      this.filter = null;
    }
    return this;
  }
  getFilter() {
    return this.filter;
  }
  setFilter(e) {
    if (this.filter !== null) {
      this.gain.disconnect(this.filter);
      this.filter.disconnect(this.context.destination);
    } else {
      this.gain.disconnect(this.context.destination);
    }
    this.filter = e;
    this.gain.connect(this.filter);
    this.filter.connect(this.context.destination);
    return this;
  }
  getMasterVolume() {
    return this.gain.gain.value;
  }
  setMasterVolume(e) {
    this.gain.gain.setTargetAtTime(e, this.context.currentTime, 0.01);
    return this;
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e);
    const t = this.context.listener;
    const r = this.up;
    this.timeDelta = this._clock.getDelta();
    this.matrixWorld.decompose(_position$1, _quaternion$1, _scale$1);
    _orientation$1.set(0, 0, -1).applyQuaternion(_quaternion$1);
    if (t.positionX) {
      const n = this.context.currentTime + this.timeDelta;
      t.positionX.linearRampToValueAtTime(_position$1.x, n);
      t.positionY.linearRampToValueAtTime(_position$1.y, n);
      t.positionZ.linearRampToValueAtTime(_position$1.z, n);
      t.forwardX.linearRampToValueAtTime(_orientation$1.x, n);
      t.forwardY.linearRampToValueAtTime(_orientation$1.y, n);
      t.forwardZ.linearRampToValueAtTime(_orientation$1.z, n);
      t.upX.linearRampToValueAtTime(r.x, n);
      t.upY.linearRampToValueAtTime(r.y, n);
      t.upZ.linearRampToValueAtTime(r.z, n);
    } else {
      t.setPosition(_position$1.x, _position$1.y, _position$1.z);
      t.setOrientation(_orientation$1.x, _orientation$1.y, _orientation$1.z, r.x, r.y, r.z);
    }
  }
}
let Audio$1 = class extends Object3D {
  constructor(e) {
    super();
    this.type = "Audio";
    this.listener = e;
    this.context = e.context;
    this.gain = this.context.createGain();
    this.gain.connect(e.getInput());
    this.autoplay = false;
    this.buffer = null;
    this.detune = 0;
    this.loop = false;
    this.loopStart = 0;
    this.loopEnd = 0;
    this.offset = 0;
    this.duration = undefined;
    this.playbackRate = 1;
    this.isPlaying = false;
    this.hasPlaybackControl = true;
    this.source = null;
    this.sourceType = "empty";
    this._startedAt = 0;
    this._progress = 0;
    this._connected = false;
    this.filters = [];
  }
  getOutput() {
    return this.gain;
  }
  setNodeSource(e) {
    this.hasPlaybackControl = false;
    this.sourceType = "audioNode";
    this.source = e;
    this.connect();
    return this;
  }
  setMediaElementSource(e) {
    this.hasPlaybackControl = false;
    this.sourceType = "mediaNode";
    this.source = this.context.createMediaElementSource(e);
    this.connect();
    return this;
  }
  setMediaStreamSource(e) {
    this.hasPlaybackControl = false;
    this.sourceType = "mediaStreamNode";
    this.source = this.context.createMediaStreamSource(e);
    this.connect();
    return this;
  }
  setBuffer(e) {
    this.buffer = e;
    this.sourceType = "buffer";
    if (this.autoplay) {
      this.play();
    }
    return this;
  }
  play(e = 0) {
    if (this.isPlaying === true) {
      console.warn("THREE.Audio: Audio is already playing.");
      return;
    }
    if (this.hasPlaybackControl === false) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    this._startedAt = this.context.currentTime + e;
    const t = this.context.createBufferSource();
    t.buffer = this.buffer;
    t.loop = this.loop;
    t.loopStart = this.loopStart;
    t.loopEnd = this.loopEnd;
    t.onended = this.onEnded.bind(this);
    t.start(this._startedAt, this._progress + this.offset, this.duration);
    this.isPlaying = true;
    this.source = t;
    this.setDetune(this.detune);
    this.setPlaybackRate(this.playbackRate);
    return this.connect();
  }
  pause() {
    if (this.hasPlaybackControl === false) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    if (this.isPlaying === true) {
      this._progress += Math.max(this.context.currentTime - this._startedAt, 0) * this.playbackRate;
      if (this.loop === true) {
        this._progress = this._progress % (this.duration || this.buffer.duration);
      }
      this.source.stop();
      this.source.onended = null;
      this.isPlaying = false;
    }
    return this;
  }
  stop() {
    if (this.hasPlaybackControl === false) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    this._progress = 0;
    if (this.source !== null) {
      this.source.stop();
      this.source.onended = null;
    }
    this.isPlaying = false;
    return this;
  }
  connect() {
    if (this.filters.length > 0) {
      this.source.connect(this.filters[0]);
      for (let e = 1, t = this.filters.length; e < t; e++) {
        this.filters[e - 1].connect(this.filters[e]);
      }
      this.filters[this.filters.length - 1].connect(this.getOutput());
    } else {
      this.source.connect(this.getOutput());
    }
    this._connected = true;
    return this;
  }
  disconnect() {
    if (this._connected !== false) {
      if (this.filters.length > 0) {
        this.source.disconnect(this.filters[0]);
        for (let e = 1, t = this.filters.length; e < t; e++) {
          this.filters[e - 1].disconnect(this.filters[e]);
        }
        this.filters[this.filters.length - 1].disconnect(this.getOutput());
      } else {
        this.source.disconnect(this.getOutput());
      }
      this._connected = false;
      return this;
    }
  }
  getFilters() {
    return this.filters;
  }
  setFilters(e) {
    e ||= [];
    if (this._connected === true) {
      this.disconnect();
      this.filters = e.slice();
      this.connect();
    } else {
      this.filters = e.slice();
    }
    return this;
  }
  setDetune(e) {
    this.detune = e;
    if (this.source.detune !== undefined) {
      if (this.isPlaying === true) {
        this.source.detune.setTargetAtTime(this.detune, this.context.currentTime, 0.01);
      }
      return this;
    }
  }
  getDetune() {
    return this.detune;
  }
  getFilter() {
    return this.getFilters()[0];
  }
  setFilter(e) {
    return this.setFilters(e ? [e] : []);
  }
  setPlaybackRate(e) {
    if (this.hasPlaybackControl === false) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    this.playbackRate = e;
    if (this.isPlaying === true) {
      this.source.playbackRate.setTargetAtTime(this.playbackRate, this.context.currentTime, 0.01);
    }
    return this;
  }
  getPlaybackRate() {
    return this.playbackRate;
  }
  onEnded() {
    this.isPlaying = false;
  }
  getLoop() {
    if (this.hasPlaybackControl === false) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return false;
    } else {
      return this.loop;
    }
  }
  setLoop(e) {
    if (this.hasPlaybackControl === false) {
      console.warn("THREE.Audio: this Audio has no playback control.");
      return;
    }
    this.loop = e;
    if (this.isPlaying === true) {
      this.source.loop = this.loop;
    }
    return this;
  }
  setLoopStart(e) {
    this.loopStart = e;
    return this;
  }
  setLoopEnd(e) {
    this.loopEnd = e;
    return this;
  }
  getVolume() {
    return this.gain.gain.value;
  }
  setVolume(e) {
    this.gain.gain.setTargetAtTime(e, this.context.currentTime, 0.01);
    return this;
  }
};
const _position = new Vector3();
const _quaternion = new Quaternion();
const _scale = new Vector3();
const _orientation = new Vector3();
class PositionalAudio extends Audio$1 {
  constructor(e) {
    super(e);
    this.panner = this.context.createPanner();
    this.panner.panningModel = "HRTF";
    this.panner.connect(this.gain);
  }
  connect() {
    super.connect();
    this.panner.connect(this.gain);
  }
  disconnect() {
    super.disconnect();
    this.panner.disconnect(this.gain);
  }
  getOutput() {
    return this.panner;
  }
  getRefDistance() {
    return this.panner.refDistance;
  }
  setRefDistance(e) {
    this.panner.refDistance = e;
    return this;
  }
  getRolloffFactor() {
    return this.panner.rolloffFactor;
  }
  setRolloffFactor(e) {
    this.panner.rolloffFactor = e;
    return this;
  }
  getDistanceModel() {
    return this.panner.distanceModel;
  }
  setDistanceModel(e) {
    this.panner.distanceModel = e;
    return this;
  }
  getMaxDistance() {
    return this.panner.maxDistance;
  }
  setMaxDistance(e) {
    this.panner.maxDistance = e;
    return this;
  }
  setDirectionalCone(e, t, r) {
    this.panner.coneInnerAngle = e;
    this.panner.coneOuterAngle = t;
    this.panner.coneOuterGain = r;
    return this;
  }
  updateMatrixWorld(e) {
    super.updateMatrixWorld(e);
    if (this.hasPlaybackControl === true && this.isPlaying === false) {
      return;
    }
    this.matrixWorld.decompose(_position, _quaternion, _scale);
    _orientation.set(0, 0, 1).applyQuaternion(_quaternion);
    const t = this.panner;
    if (t.positionX) {
      const r = this.context.currentTime + this.listener.timeDelta;
      t.positionX.linearRampToValueAtTime(_position.x, r);
      t.positionY.linearRampToValueAtTime(_position.y, r);
      t.positionZ.linearRampToValueAtTime(_position.z, r);
      t.orientationX.linearRampToValueAtTime(_orientation.x, r);
      t.orientationY.linearRampToValueAtTime(_orientation.y, r);
      t.orientationZ.linearRampToValueAtTime(_orientation.z, r);
    } else {
      t.setPosition(_position.x, _position.y, _position.z);
      t.setOrientation(_orientation.x, _orientation.y, _orientation.z);
    }
  }
}
class InstancedInterleavedBuffer extends InterleavedBuffer {
  constructor(e, t, r = 1) {
    super(e, t);
    this.isInstancedInterleavedBuffer = true;
    this.meshPerAttribute = r;
  }
  copy(e) {
    super.copy(e);
    this.meshPerAttribute = e.meshPerAttribute;
    return this;
  }
  clone(e) {
    const t = super.clone(e);
    t.meshPerAttribute = this.meshPerAttribute;
    return t;
  }
  toJSON(e) {
    const t = super.toJSON(e);
    t.isInstancedInterleavedBuffer = true;
    t.meshPerAttribute = this.meshPerAttribute;
    return t;
  }
}
class Spherical {
  constructor(e = 1, t = 0, r = 0) {
    this.radius = e;
    this.phi = t;
    this.theta = r;
    return this;
  }
  set(e, t, r) {
    this.radius = e;
    this.phi = t;
    this.theta = r;
    return this;
  }
  copy(e) {
    this.radius = e.radius;
    this.phi = e.phi;
    this.theta = e.theta;
    return this;
  }
  makeSafe() {
    this.phi = Math.max(0.000001, Math.min(Math.PI - 0.000001, this.phi));
    return this;
  }
  setFromVector3(e) {
    return this.setFromCartesianCoords(e.x, e.y, e.z);
  }
  setFromCartesianCoords(e, t, r) {
    this.radius = Math.sqrt(e * e + t * t + r * r);
    if (this.radius === 0) {
      this.theta = 0;
      this.phi = 0;
    } else {
      this.theta = Math.atan2(e, r);
      this.phi = Math.acos(clamp$1(t / this.radius, -1, 1));
    }
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
}
const _vector$4 = new Vector2();
class Box2 {
  constructor(e = new Vector2(Infinity, Infinity), t = new Vector2(-Infinity, -Infinity)) {
    this.isBox2 = true;
    this.min = e;
    this.max = t;
  }
  set(e, t) {
    this.min.copy(e);
    this.max.copy(t);
    return this;
  }
  setFromPoints(e) {
    this.makeEmpty();
    for (let t = 0, r = e.length; t < r; t++) {
      this.expandByPoint(e[t]);
    }
    return this;
  }
  setFromCenterAndSize(e, t) {
    const r = _vector$4.copy(t).multiplyScalar(0.5);
    this.min.copy(e).sub(r);
    this.max.copy(e).add(r);
    return this;
  }
  clone() {
    return new this.constructor().copy(this);
  }
  copy(e) {
    this.min.copy(e.min);
    this.max.copy(e.max);
    return this;
  }
  makeEmpty() {
    this.min.x = this.min.y = Infinity;
    this.max.x = this.max.y = -Infinity;
    return this;
  }
  isEmpty() {
    return this.max.x < this.min.x || this.max.y < this.min.y;
  }
  getCenter(e) {
    if (this.isEmpty()) {
      return e.set(0, 0);
    } else {
      return e.addVectors(this.min, this.max).multiplyScalar(0.5);
    }
  }
  getSize(e) {
    if (this.isEmpty()) {
      return e.set(0, 0);
    } else {
      return e.subVectors(this.max, this.min);
    }
  }
  expandByPoint(e) {
    this.min.min(e);
    this.max.max(e);
    return this;
  }
  expandByVector(e) {
    this.min.sub(e);
    this.max.add(e);
    return this;
  }
  expandByScalar(e) {
    this.min.addScalar(-e);
    this.max.addScalar(e);
    return this;
  }
  containsPoint(e) {
    return !(e.x < this.min.x) && !(e.x > this.max.x) && !(e.y < this.min.y) && !(e.y > this.max.y);
  }
  containsBox(e) {
    return this.min.x <= e.min.x && e.max.x <= this.max.x && this.min.y <= e.min.y && e.max.y <= this.max.y;
  }
  getParameter(e, t) {
    return t.set((e.x - this.min.x) / (this.max.x - this.min.x), (e.y - this.min.y) / (this.max.y - this.min.y));
  }
  intersectsBox(e) {
    return !(e.max.x < this.min.x) && !(e.min.x > this.max.x) && !(e.max.y < this.min.y) && !(e.min.y > this.max.y);
  }
  clampPoint(e, t) {
    return t.copy(e).clamp(this.min, this.max);
  }
  distanceToPoint(e) {
    return this.clampPoint(e, _vector$4).distanceTo(e);
  }
  intersect(e) {
    this.min.max(e.min);
    this.max.min(e.max);
    if (this.isEmpty()) {
      this.makeEmpty();
    }
    return this;
  }
  union(e) {
    this.min.min(e.min);
    this.max.max(e.max);
    return this;
  }
  translate(e) {
    this.min.add(e);
    this.max.add(e);
    return this;
  }
  equals(e) {
    return e.min.equals(this.min) && e.max.equals(this.max);
  }
}
class ShapePath {
  constructor() {
    this.type = "ShapePath";
    this.color = new Color();
    this.subPaths = [];
    this.currentPath = null;
  }
  moveTo(e, t) {
    this.currentPath = new Path();
    this.subPaths.push(this.currentPath);
    this.currentPath.moveTo(e, t);
    return this;
  }
  lineTo(e, t) {
    this.currentPath.lineTo(e, t);
    return this;
  }
  quadraticCurveTo(e, t, r, n) {
    this.currentPath.quadraticCurveTo(e, t, r, n);
    return this;
  }
  bezierCurveTo(e, t, r, n, a, l) {
    this.currentPath.bezierCurveTo(e, t, r, n, a, l);
    return this;
  }
  splineThru(e) {
    this.currentPath.splineThru(e);
    return this;
  }
  toShapes(e) {
    function t(b) {
      const C = [];
      for (let w = 0, R = b.length; w < R; w++) {
        const E = b[w];
        const I = new Shape();
        I.curves = E.curves;
        C.push(I);
      }
      return C;
    }
    function r(b, C) {
      const w = C.length;
      let R = false;
      for (let E = w - 1, I = 0; I < w; E = I++) {
        let F = C[E];
        let k = C[I];
        let L = k.x - F.x;
        let D = k.y - F.y;
        if (Math.abs(D) > Number.EPSILON) {
          if (D < 0) {
            F = C[I];
            L = -L;
            k = C[E];
            D = -D;
          }
          if (b.y < F.y || b.y > k.y) {
            continue;
          }
          if (b.y === F.y) {
            if (b.x === F.x) {
              return true;
            }
          } else {
            const ne = D * (b.x - F.x) - L * (b.y - F.y);
            if (ne === 0) {
              return true;
            }
            if (ne < 0) {
              continue;
            }
            R = !R;
          }
        } else {
          if (b.y !== F.y) {
            continue;
          }
          if (k.x <= b.x && b.x <= F.x || F.x <= b.x && b.x <= k.x) {
            return true;
          }
        }
      }
      return R;
    }
    const n = ShapeUtils.isClockWise;
    const a = this.subPaths;
    if (a.length === 0) {
      return [];
    }
    let l;
    let c;
    let u;
    const f = [];
    if (a.length === 1) {
      c = a[0];
      u = new Shape();
      u.curves = c.curves;
      f.push(u);
      return f;
    }
    let p = !n(a[0].getPoints());
    p = e ? !p : p;
    const g = [];
    const v = [];
    let _ = [];
    let T = 0;
    let M;
    v[T] = undefined;
    _[T] = [];
    for (let b = 0, C = a.length; b < C; b++) {
      c = a[b];
      M = c.getPoints();
      l = n(M);
      l = e ? !l : l;
      if (l) {
        if (!p && v[T]) {
          T++;
        }
        v[T] = {
          s: new Shape(),
          p: M
        };
        v[T].s.curves = c.curves;
        if (p) {
          T++;
        }
        _[T] = [];
      } else {
        _[T].push({
          h: c,
          p: M[0]
        });
      }
    }
    if (!v[0]) {
      return t(a);
    }
    if (v.length > 1) {
      let b = false;
      let C = 0;
      for (let w = 0, R = v.length; w < R; w++) {
        g[w] = [];
      }
      for (let w = 0, R = v.length; w < R; w++) {
        const E = _[w];
        for (let I = 0; I < E.length; I++) {
          const F = E[I];
          let k = true;
          for (let L = 0; L < v.length; L++) {
            if (r(F.p, v[L].p)) {
              if (w !== L) {
                C++;
              }
              if (k) {
                k = false;
                g[L].push(F);
              } else {
                b = true;
              }
            }
          }
          if (k) {
            g[w].push(F);
          }
        }
      }
      if (C > 0 && b === false) {
        _ = g;
      }
    }
    let S;
    for (let b = 0, C = v.length; b < C; b++) {
      u = v[b].s;
      f.push(u);
      S = _[b];
      for (let w = 0, R = S.length; w < R; w++) {
        u.holes.push(S[w].h);
      }
    }
    return f;
  }
}
if (typeof __THREE_DEVTOOLS__ !== "undefined") {
  __THREE_DEVTOOLS__.dispatchEvent(new CustomEvent("register", {
    detail: {
      revision: REVISION
    }
  }));
}
if (typeof window !== "undefined") {
  if (window.__THREE__) {
    console.warn("WARNING: Multiple instances of Three.js being imported.");
  } else {
    window.__THREE__ = REVISION;
  }
}
class MathUtils {
  PI = Math.PI;
  PI2 = this.PI * 2;
  HALF_PI = this.PI * 0.5;
  DEG2RAD = this.PI / 180;
  RAD2DEG = 180 / this.PI;
  linearStep(e, t, r) {
    return this.clamp((r - e) / (t - e), 0, 1);
  }
  step(e, t) {
    if (t < e) {
      return 0;
    } else {
      return 1;
    }
  }
  clamp(e, t, r) {
    if (e < t) {
      return t;
    } else if (e > r) {
      return r;
    } else {
      return e;
    }
  }
  mod(e, t) {
    return e - t * Math.floor(e / t);
  }
  mix(e, t, r) {
    return e + (t - e) * r;
  }
  cMix(e, t, r) {
    return e + (t - e) * this.clamp(r, 0, 1);
  }
  unMix(e, t, r) {
    return (r - e) / (t - e);
  }
  cUnMix(e, t, r) {
    return this.clamp((r - e) / (t - e), 0, 1);
  }
  saturate(e) {
    return this.clamp(e, 0, 1);
  }
  fit(e, t, r, n, a, l) {
    e = this.cUnMix(t, r, e);
    if (l) {
      e = l(e);
    }
    return n + e * (a - n);
  }
  unClampedFit(e, t, r, n, a, l) {
    e = this.unMix(t, r, e);
    if (l) {
      e = l(e);
    }
    return n + e * (a - n);
  }
  lerp(e, t, r) {
    return e * (1 - r) + t * r;
  }
  loop(e, t, r) {
    e -= t;
    r -= t;
    return (e < 0 ? (r - Math.abs(e) % r) % r : e % r) + t;
  }
  normalize(e, t, r) {
    return Math.max(0, Math.min(1, e - t / r - t));
  }
  smoothstep(e, t, r) {
    r = this.cUnMix(e, t, r);
    return r * r * (3 - r * 2);
  }
  fract(e) {
    return e - Math.floor(e);
  }
  hash(e) {
    return this.fract(Math.sin(e) * 43758.5453123);
  }
  hash2(e, t) {
    return this.fract(Math.sin(e * 12.9898 + t * 4.1414) * 43758.5453);
  }
  sign(e) {
    if (e) {
      if (e < 0) {
        return -1;
      } else {
        return 1;
      }
    } else {
      return 0;
    }
  }
  isPowerOfTwo(e) {
    return (e & -e) === e;
  }
  powerTwoCeilingBase(e) {
    return Math.ceil(Math.log(e) / Math.log(2));
  }
  powerTwoCeiling(e) {
    if (this.isPowerOfTwo(e)) {
      return e;
    } else {
      return 1 << this.powerTwoCeilingBase(e);
    }
  }
  powerTwoFloorBase(e) {
    return Math.floor(Math.log(e) / Math.log(2));
  }
  powerTwoFloor(e) {
    if (this.isPowerOfTwo(e)) {
      return e;
    } else {
      return 1 << this.powerTwoFloorBase(e);
    }
  }
  latLngBearing(e, t, r, n) {
    let a = Math.sin(n - t) * Math.cos(r);
    let l = Math.cos(e) * Math.sin(r) - Math.sin(e) * Math.cos(r) * Math.cos(n - t);
    return Math.atan2(a, l);
  }
  distanceTo(e, t) {
    return Math.sqrt(e * e + t * t);
  }
  distanceSqrTo(e, t) {
    return e * e + t * t;
  }
  distanceTo3(e, t, r) {
    return Math.sqrt(e * e + t * t + r * r);
  }
  distanceSqrTo3(e, t, r) {
    return e * e + t * t + r * r;
  }
  latLngDistance(e, t, r, n) {
    let a = Math.sin((r - e) / 2);
    let l = Math.sin((n - t) / 2);
    let c = a * a + Math.cos(e) * Math.cos(r) * l * l;
    return Math.atan2(Math.sqrt(c), Math.sqrt(1 - c)) * 2;
  }
  cubicBezier(e, t, r, n, a) {
    let l = (t - e) * 3;
    let c = (r - t) * 3 - l;
    let u = n - e - l - c;
    let f = a * a;
    let p = f * a;
    return u * p + c * f + l * a + e;
  }
  cubicBezierFn(e, t, r, n) {
    let a = (t - e) * 3;
    let l = (r - t) * 3 - a;
    let c = n - e - a - l;
    return u => {
      let f = u * u;
      let p = f * u;
      return c * p + l * f + a * u + e;
    };
  }
  normalizeAngle(e) {
    e += this.PI;
    e = e < 0 ? this.PI2 - Math.abs(e % PI2) : e % this.PI2;
    e -= this.PI;
    return e;
  }
  closestAngleTo(e, t) {
    return e + this.normalizeAngle(t - e);
  }
  randomRange(e, t) {
    return e + Math.random() * (t - e);
  }
  randomRangeInt(e, t) {
    return Math.floor(this.randomRange(e, t + 1));
  }
  padZero(e, t) {
    if (e.toString().length >= t) {
      return e;
    } else {
      return (Math.pow(10, t) + Math.floor(e)).toString().substring(1);
    }
  }
  lerpColor(e, t, r) {
    const n = e >> 16;
    const a = e >> 8 & 255;
    const l = e & 255;
    const c = t >> 16;
    const u = t >> 8 & 255;
    const f = t & 255;
    const p = n + r * (c - n);
    const g = a + r * (u - a);
    const v = l + r * (f - l);
    return (p << 16) + (g << 8) + (v | 0);
  }
  getSeedRandomFn(e) {
    let t = 1779033703;
    let r = 3144134277;
    let n = 1013904242;
    let a = 2773480762;
    for (let l = 0, c; l < e.length; l++) {
      c = e.charCodeAt(l);
      t = r ^ Math.imul(t ^ c, 597399067);
      r = n ^ Math.imul(r ^ c, 2869860233);
      n = a ^ Math.imul(n ^ c, 951274213);
      a = t ^ Math.imul(a ^ c, 2716044179);
    }
    return _sfc32(Math.imul(n ^ t >>> 18, 597399067), Math.imul(a ^ r >>> 22, 2869860233), Math.imul(t ^ n >>> 17, 951274213), Math.imul(r ^ a >>> 19, 2716044179));
  }
}
function _sfc32(o, e, t, r) {
  return function () {
    o |= 0;
    e |= 0;
    t |= 0;
    r |= 0;
    var n = (o + e | 0) + r | 0;
    r = r + 1 | 0;
    o = e ^ e >>> 9;
    e = t + (t << 3) | 0;
    t = t << 21 | t >>> 11;
    t = t + n | 0;
    return (n >>> 0) / 4294967296;
  };
}
const math = new MathUtils();
var isSSR = typeof window === "undefined";
var DetectUA = function () {
  function o(e) {
    this.userAgent = e || (!isSSR && window.navigator ? window.navigator.userAgent : "");
    this.isAndroidDevice = !/like android/i.test(this.userAgent) && /android/i.test(this.userAgent);
    this.iOSDevice = this.match(1, /(iphone|ipod|ipad)/i).toLowerCase();
    if (!isSSR && navigator.platform === "MacIntel" && navigator.maxTouchPoints > 2 && !window.MSStream) {
      this.iOSDevice = "ipad";
    }
  }
  o.prototype.match = function (e, t) {
    var r = this.userAgent.match(t);
    return r && r.length > 1 && r[e] || "";
  };
  Object.defineProperty(o.prototype, "isMobile", {
    get: function () {
      return !this.isTablet && (/[^-]mobi/i.test(this.userAgent) || this.iOSDevice === "iphone" || this.iOSDevice === "ipod" || this.isAndroidDevice || /nexus\s*[0-6]\s*/i.test(this.userAgent));
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isTablet", {
    get: function () {
      return /tablet/i.test(this.userAgent) && !/tablet pc/i.test(this.userAgent) || this.iOSDevice === "ipad" || this.isAndroidDevice && !/[^-]mobi/i.test(this.userAgent) || !/nexus\s*[0-6]\s*/i.test(this.userAgent) && /nexus\s*[0-9]+/i.test(this.userAgent);
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isDesktop", {
    get: function () {
      return !this.isMobile && !this.isTablet;
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isMacOS", {
    get: function () {
      return /macintosh/i.test(this.userAgent) && {
        version: this.match(1, /mac os x (\d+(\.?_?\d+)+)/i).replace(/[_\s]/g, ".").split(".").map(function (e) {
          return e;
        })[1]
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isWindows", {
    get: function () {
      return /windows /i.test(this.userAgent) && {
        version: this.match(1, /Windows ((NT|XP)( \d\d?.\d)?)/i)
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isiOS", {
    get: function () {
      return !!this.iOSDevice && {
        version: this.match(1, /os (\d+([_\s]\d+)*) like mac os x/i).replace(/[_\s]/g, ".") || this.match(1, /version\/(\d+(\.\d+)?)/i)
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "isAndroid", {
    get: function () {
      return this.isAndroidDevice && {
        version: this.match(1, /android[ \/-](\d+(\.\d+)*)/i)
      };
    },
    enumerable: false,
    configurable: true
  });
  Object.defineProperty(o.prototype, "browser", {
    get: function () {
      var e = this.match(1, /version\/(\d+(\.\d+)?)/i);
      if (/opera/i.test(this.userAgent)) {
        return {
          name: "Opera",
          version: e || this.match(1, /(?:opera|opr|opios)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/opr\/|opios/i.test(this.userAgent)) {
        return {
          name: "Opera",
          version: this.match(1, /(?:opr|opios)[\s\/](\d+(\.\d+)?)/i) || e
        };
      } else if (/SamsungBrowser/i.test(this.userAgent)) {
        return {
          name: "Samsung Internet for Android",
          version: e || this.match(1, /(?:SamsungBrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/yabrowser/i.test(this.userAgent)) {
        return {
          name: "Yandex Browser",
          version: e || this.match(1, /(?:yabrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/ucbrowser/i.test(this.userAgent)) {
        return {
          name: "UC Browser",
          version: this.match(1, /(?:ucbrowser)[\s\/](\d+(\.\d+)?)/i)
        };
      } else if (/msie|trident/i.test(this.userAgent)) {
        return {
          name: "Internet Explorer",
          version: this.match(1, /(?:msie |rv:)(\d+(\.\d+)?)/i)
        };
      } else if (/(edge|edgios|edga|edg)/i.test(this.userAgent)) {
        return {
          name: "Microsoft Edge",
          version: this.match(2, /(edge|edgios|edga|edg)\/(\d+(\.\d+)?)/i)
        };
      } else if (/firefox|iceweasel|fxios/i.test(this.userAgent)) {
        return {
          name: "Firefox",
          version: this.match(1, /(?:firefox|iceweasel|fxios)[ \/](\d+(\.\d+)?)/i)
        };
      } else if (/chromium/i.test(this.userAgent)) {
        return {
          name: "Chromium",
          version: this.match(1, /(?:chromium)[\s\/](\d+(?:\.\d+)?)/i) || e
        };
      } else if (/chrome|crios|crmo/i.test(this.userAgent)) {
        return {
          name: "Chrome",
          version: this.match(1, /(?:chrome|crios|crmo)\/(\d+(\.\d+)?)/i)
        };
      } else if (/safari|applewebkit/i.test(this.userAgent)) {
        return {
          name: "Safari",
          version: e
        };
      } else {
        return {
          name: this.match(1, /^(.*)\/(.*) /),
          version: this.match(2, /^(.*)\/(.*) /)
        };
      }
    },
    enumerable: false,
    configurable: true
  });
  return o;
}();
ColorManagement.enabled = false;
let detectUA = new DetectUA();
let userAgent = (navigator.userAgent || navigator.vendor).toLowerCase();
let browserName = detectUA.browser.name;
let audioElem = document.createElement("audio");
