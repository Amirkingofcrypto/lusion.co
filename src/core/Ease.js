let self$1;
class Ease {
  quadIn(e) {
    return e * e;
  }
  quadOut(e) {
    return e * (2 - e);
  }
  quadOutIn(e) {
    if (e < 0.5) {
      return self$1.quadOut(e + e) * 0.5;
    } else {
      return self$1.quadIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quadInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e;
    } else {
      return (--e * (e - 2) - 1) * -0.5;
    }
  }
  cubicIn(e) {
    return e * e * e;
  }
  cubicOut(e) {
    return --e * e * e + 1;
  }
  cubicOutIn(e) {
    if (e < 0.5) {
      return self$1.cubicOut(e + e) * 0.5;
    } else {
      return self$1.cubicIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  cubicInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e;
    } else {
      return ((e -= 2) * e * e + 2) * 0.5;
    }
  }
  quartIn(e) {
    return e * e * e * e;
  }
  quartOut(e) {
    return 1 - --e * e * e * e;
  }
  quartOutIn(e) {
    if (e < 0.5) {
      return self$1.quartOut(e + e) * 0.5;
    } else {
      return self$1.quartIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quartInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e * e;
    } else {
      return ((e -= 2) * e * e * e - 2) * -0.5;
    }
  }
  quintIn(e) {
    return e * e * e * e * e;
  }
  quintOut(e) {
    return --e * e * e * e * e + 1;
  }
  quintOutIn(e) {
    if (e < 0.5) {
      return self$1.quintOut(e + e) * 0.5;
    } else {
      return self$1.quintIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quintInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e * e * e;
    } else {
      return ((e -= 2) * e * e * e * e + 2) * 0.5;
    }
  }
  sineIn(e) {
    return 1 - Math.cos(e * Math.PI / 2);
  }
  sineOut(e) {
    return Math.sin(e * Math.PI / 2);
  }
  sineOutIn(e) {
    if (e < 0.5) {
      return self$1.sineOut(e + e) * 0.5;
    } else {
      return self$1.sineIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  sineInOut(e) {
    return (1 - Math.cos(Math.PI * e)) * 0.5;
  }
  expoIn(e) {
    if (e === 0) {
      return 0;
    } else {
      return Math.pow(1024, e - 1);
    }
  }
  expoOut(e) {
    if (e === 1) {
      return 1;
    } else {
      return 1 - Math.pow(2, e * -10);
    }
  }
  expoOutIn(e) {
    if (e < 0.5) {
      return self$1.expoOut(e + e) * 0.5;
    } else {
      return self$1.expoIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  expoInOut(e) {
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else if ((e *= 2) < 1) {
      return Math.pow(1024, e - 1) * 0.5;
    } else {
      return (-Math.pow(2, (e - 1) * -10) + 2) * 0.5;
    }
  }
  circIn(e) {
    return 1 - Math.sqrt(1 - e * e);
  }
  circOut(e) {
    return Math.sqrt(1 - --e * e);
  }
  circOutIn(e) {
    if (e < 0.5) {
      return self$1.circOut(e + e) * 0.5;
    } else {
      return self$1.circIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  circInOut(e) {
    if ((e *= 2) < 1) {
      return (Math.sqrt(1 - e * e) - 1) * -0.5;
    } else {
      return (Math.sqrt(1 - (e -= 2) * e) + 1) * 0.5;
    }
  }
  elasticIn(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      return -(r * Math.pow(2, (e -= 1) * 10) * Math.sin((e - t) * 2 * Math.PI / n));
    }
  }
  elasticOut(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      return r * Math.pow(2, e * -10) * Math.sin((e - t) * 2 * Math.PI / n) + 1;
    }
  }
  elasticOutIn(e) {
    if (e < 0.5) {
      return self$1.elasticOut(e + e) * 0.5;
    } else {
      return self$1.elasticIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  elasticInOut(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      if ((e *= 2) < 1) {
        return r * -0.5 * Math.pow(2, (e -= 1) * 10) * Math.sin((e - t) * 2 * Math.PI / n);
      } else {
        return r * Math.pow(2, (e -= 1) * -10) * Math.sin((e - t) * 2 * Math.PI / n) * 0.5 + 1;
      }
    }
  }
  backIn(e) {
    let t = 1.70158;
    return e * e * ((t + 1) * e - t);
  }
  backOut(e) {
    let t = 1.70158;
    return --e * e * ((t + 1) * e + t) + 1;
  }
  backOutIn(e) {
    if (e < 0.5) {
      return self$1.backOut(e + e) * 0.5;
    } else {
      return self$1.backIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  backInOut(e) {
    let t = 2.5949095;
    if ((e *= 2) < 1) {
      return e * 0.5 * e * ((t + 1) * e - t);
    } else {
      return ((e -= 2) * e * ((t + 1) * e + t) + 2) * 0.5;
    }
  }
  bounceIn(e) {
    return 1 - self$1.bounceOut(1 - e);
  }
  bounceOut(e) {
    if (e < 1 / 2.75) {
      return e * 7.5625 * e;
    } else if (e < 2 / 2.75) {
      return (e -= 1.5 / 2.75) * 7.5625 * e + 0.75;
    } else if (e < 2.5 / 2.75) {
      return (e -= 2.25 / 2.75) * 7.5625 * e + 0.9375;
    } else {
      return (e -= 2.625 / 2.75) * 7.5625 * e + 0.984375;
    }
  }
  bounceOutIn(e) {
    if (e < 0.5) {
      return self$1.bounceOut(e + e) * 0.5;
    } else {
      return self$1.bounceIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  bounceInOut(e) {
    if (e < 0.5) {
      return self$1.bounceIn(e * 2) * 0.5;
    } else {
      return self$1.bounceOut(e * 2 - 1) * 0.5 + 0.5;
    }
  }
  lusion(e) {
    return self$1.cubicBezier(e, 0.35, 0, 0, 1);
  }
  cubicBezier(e, t, r, n, a) {
    if (e <= 0) {
      return 0;
    }
    if (e >= 1) {
      return 1;
    }
    if (t === r && n === a) {
      return e;
    }
    const l = (ce, z, j, X) => 1 / (z * 3 * ce * ce + j * 2 * ce + X);
    const c = (ce, z, j, X, Z) => z * (ce * ce * ce) + j * (ce * ce) + X * ce + Z;
    const u = (ce, z, j, X, Z) => {
      let q = ce * ce;
      return z * (q * ce) + j * q + X * ce + Z;
    };
    let f = 0;
    let p = 0;
    let g = t;
    let v = r;
    let _ = n;
    let T = a;
    let M = 1;
    let S = 1;
    let b = M - _ * 3 + g * 3 - f;
    let C = _ * 3 - g * 6 + f * 3;
    let w = g * 3 - f * 3;
    let R = f;
    let E = S - T * 3 + v * 3 - p;
    let I = T * 3 - v * 6 + p * 3;
    let F = v * 3 - p * 3;
    let k = p;
    let L = e;
    let D;
    let ne;
    let re;
    for (D = 0; D < 100; D++) {
      ne = c(L, b, C, w, R);
      re = l(L, b, C, w);
      if (re === Infinity) {
        re = e;
      }
      L -= (ne - e) * re;
      L = Math.min(Math.max(L, 0), 1);
    }
    return u(L, E, I, F, k);
  }
}
self$1 = new Ease();
const ease = self$1;