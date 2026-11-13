/**
 * ============================================================================
 * Lusion Modular Component: 23-about-client-section
 * File: src/components/about/AboutClientSection.js
 * Description: AboutClientSection, SVGParser & PostUfx
 * Original Engine Lines: 43186 - 45148
 * ============================================================================
 */
class AboutClientSection {
  _needsReset = true;
  isSectionWasActive = false;
  preInit(e) {
    this.domContainer = e.querySelector("#about-clients");
    this.domTitle = e.querySelector("#about-clients-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitle._words = [];
    this.domDesc = e.querySelector("#about-clients-desc");
    this.domDesc._time = 0;
    this.domDesc._animating = false;
    this.domCarousel = e.querySelector("#about-clients-carousel");
    this.domCarouselLines = Array.from(this.domCarousel.querySelectorAll(".about-clients-carousel-line"));
    this.domCarouselLinesWrapper = [];
  }
  init() {
    this._createCarousel();
  }
  resize(e, t) {
    this._splitText();
    for (let r = 0; r < this.domCarouselLines.length; r++) {
      let n = this.domCarouselLines[r];
      let a = this.domCarouselLinesWrapper[r];
      a._width = n.getBoundingClientRect().width;
    }
  }
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive;
    let n = scrollManager.scrollViewDelta;
    let a = scrollManager.getDomRange(this.domTitle);
    let l = scrollManager.getDomRange(this.domDesc);
    if (r) {
      if (this._needsReset) {
        this._reset();
      }
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 1 + this.domTitle._words.length / TITLE_STAGGER);
      this.domDesc._time = math.clamp(this.domDesc._time + (this.domDesc._animating ? e : -e), 0, 1 + this.domDesc._splitted.words.length / DESCRIPTION_STAGGER);
      if (a.screenRatio > -1) {
        this.domTitle._animating = true;
        if (properties.useMobileLayout) {
          this.domTitle._words.forEach(c => {
            c.forEach(u => {
              u.style.transform = "translate3d(0, 0, 0)";
            });
          });
        } else {
          this.domTitle._words.forEach((c, u) => {
            c.forEach((f, p) => {
              let g = math.saturate(this.domTitle._time - u / 20);
              let v = ease.expoOut(g);
              f.style.transform = `translate3d(0, ${(1 - v) * 100 - (4 - p) * 100 * v}%, 0)`;
            });
          });
        }
      }
      if (l.screenRatio > -1) {
        this.domDesc._animating = true;
        this.domDesc._splitted.words.forEach((c, u) => {
          let f = properties.viewportWidth >= settings.MOBILE_WIDTH ? ease.lusion(this.domDesc._time - u / DESCRIPTION_STAGGER) : 1;
          let p = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domDesc._time - u / DESCRIPTION_STAGGER, 0, 1, 100, 0, ease.lusion) : 0;
          c.style.transform = `translate3d(0, ${p}%, 0)`;
          c.style.opacity = f;
        });
      }
      for (let c = 0; c < this.domCarouselLinesWrapper.length; c++) {
        let u = this.domCarouselLinesWrapper[c];
        let f = c % 2;
        u._time += e * input.lastScrollYDirection * (100 + f * 35) + n * (100 + f * 35);
        let p = -math.loop(u._time, 0, u._width);
        u.style.transform = `translateX(${p}px)`;
      }
    } else {
      this._needsReset = true;
    }
    this.isSectionWasActive = r;
  }
  _createCarousel() {
    this.domCarouselLines.forEach(e => {
      const t = document.createElement("div");
      t.classList.add("about-clients-carousel-line-wrapper");
      const r = e.cloneNode(true);
      const n = e.cloneNode(true);
      t.append(r, n, e);
      this.domCarousel.append(t);
      t._time = 0;
      this.domCarouselLinesWrapper.push(t);
    });
  }
  _splitText() {
    this.domTitleWordList = [];
    this.domTitle._splitted = new SplitType(this.domTitle, {
      types: "words",
      wordClass: "about-clients-title-word"
    });
    this.domTitle._splitted.words.forEach((e, t) => {
      const r = [];
      const n = e.parentNode;
      const a = document.createElement("div");
      a.style.position = "relative";
      a.style.overflow = "hidden";
      a.classList.add("about-clients-title-word-wrapper");
      a.style.display = "flex";
      a.style.flexDirection = "column";
      e.remove();
      this.domTitleWordList.push(a);
      for (let l = 0; l < 3; l++) {
        const c = e.cloneNode(true);
        c.style.transform = "translate3d(0, 100%, 0)";
        a.append(c);
        r.push(c);
        this.domTitle._words[t] = r;
      }
      n.append(a);
      e.remove();
    });
    this.domDesc._splitted = new SplitType(this.domDesc, {
      types: "words",
      wordClass: "about-clients-desc-text-word"
    });
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domTitle._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      this.domDesc._time = 0;
      this.domDesc._animating = false;
      this.domDesc._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
        e.style.opacity = 0;
      });
    }
  }
}
const aboutClientSection = new AboutClientSection();
class SVGParser {
  parse(e) {
    const t = this;
    function r(K, G) {
      if (K.nodeType !== 1) {
        return;
      }
      const U = R(K);
      let N = false;
      let he = null;
      switch (K.nodeName) {
        case "svg":
          G = T(K, G);
          break;
        case "style":
          a(K);
          break;
        case "g":
          G = T(K, G);
          break;
        case "path":
          G = T(K, G);
          if (K.hasAttribute("d")) {
            he = n(K);
          }
          break;
        case "rect":
          G = T(K, G);
          he = u(K);
          break;
        case "polygon":
          G = T(K, G);
          he = f(K);
          break;
        case "polyline":
          G = T(K, G);
          he = p(K);
          break;
        case "circle":
          G = T(K, G);
          he = g(K);
          break;
        case "ellipse":
          G = T(K, G);
          he = v(K);
          break;
        case "line":
          G = T(K, G);
          he = _(K);
          break;
        case "defs":
          N = true;
          break;
        case "use":
          G = T(K, G);
          const xe = (K.getAttributeNS("http://www.w3.org/1999/xlink", "href") || "").substring(1);
          const ee = K.viewportElement.getElementById(xe);
          if (ee) {
            r(ee, G);
          } else {
            console.warn("SVGLoader: 'use node' references non-existent node id: " + xe);
          }
          break;
      }
      if (he) {
        if (G.fill !== undefined && G.fill !== "none") {
          he.color.setStyle(G.fill);
        }
        I(he, te);
        re.push(he);
        he.userData = {
          node: K,
          style: G
        };
      }
      const ve = K.childNodes;
      for (let de = 0; de < ve.length; de++) {
        const xe = ve[de];
        if (!N || xe.nodeName === "style" || xe.nodeName === "defs") {
          r(xe, G);
        }
      }
      if (U) {
        z.pop();
        if (z.length > 0) {
          te.copy(z[z.length - 1]);
        } else {
          te.identity();
        }
      }
    }
    function n(K) {
      const G = new ShapePath();
      const U = new Vector2();
      const N = new Vector2();
      const he = new Vector2();
      let ve = true;
      let de = false;
      const xe = K.getAttribute("d");
      if (xe === "" || xe === "none") {
        return null;
      }
      const ee = xe.match(/[a-df-z][^a-df-z]*/gi);
      for (let Ue = 0, fe = ee.length; Ue < fe; Ue++) {
        const Se = ee[Ue];
        const Me = Se.charAt(0);
        const Be = Se.slice(1).trim();
        if (ve === true) {
          de = true;
          ve = false;
        }
        let se;
        switch (Me) {
          case "M":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x = se[$ + 0];
              U.y = se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              if ($ === 0) {
                G.moveTo(U.x, U.y);
              } else {
                G.lineTo(U.x, U.y);
              }
              if ($ === 0) {
                he.copy(U);
              }
            }
            break;
          case "H":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.x = se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "V":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.y = se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "L":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x = se[$ + 0];
              U.y = se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "C":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 6) {
              G.bezierCurveTo(se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], se[$ + 5]);
              N.x = se[$ + 2];
              N.y = se[$ + 3];
              U.x = se[$ + 4];
              U.y = se[$ + 5];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "S":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.bezierCurveTo(M(U.x, N.x), M(U.y, N.y), se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3]);
              N.x = se[$ + 0];
              N.y = se[$ + 1];
              U.x = se[$ + 2];
              U.y = se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "Q":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.quadraticCurveTo(se[$ + 0], se[$ + 1], se[$ + 2], se[$ + 3]);
              N.x = se[$ + 0];
              N.y = se[$ + 1];
              U.x = se[$ + 2];
              U.y = se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "T":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              const Ye = M(U.x, N.x);
              const st = M(U.y, N.y);
              G.quadraticCurveTo(Ye, st, se[$ + 0], se[$ + 1]);
              N.x = Ye;
              N.y = st;
              U.x = se[$ + 0];
              U.y = se[$ + 1];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "A":
            se = S(Be, [3, 4], 7);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 7) {
              if (se[$ + 5] == U.x && se[$ + 6] == U.y) {
                continue;
              }
              const Ye = U.clone();
              U.x = se[$ + 5];
              U.y = se[$ + 6];
              N.x = U.x;
              N.y = U.y;
              l(G, se[$], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], Ye, U);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "m":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x += se[$ + 0];
              U.y += se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              if ($ === 0) {
                G.moveTo(U.x, U.y);
              } else {
                G.lineTo(U.x, U.y);
              }
              if ($ === 0) {
                he.copy(U);
              }
            }
            break;
          case "h":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.x += se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "v":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $++) {
              U.y += se[$];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "l":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              U.x += se[$ + 0];
              U.y += se[$ + 1];
              N.x = U.x;
              N.y = U.y;
              G.lineTo(U.x, U.y);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "c":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 6) {
              G.bezierCurveTo(U.x + se[$ + 0], U.y + se[$ + 1], U.x + se[$ + 2], U.y + se[$ + 3], U.x + se[$ + 4], U.y + se[$ + 5]);
              N.x = U.x + se[$ + 2];
              N.y = U.y + se[$ + 3];
              U.x += se[$ + 4];
              U.y += se[$ + 5];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "s":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.bezierCurveTo(M(U.x, N.x), M(U.y, N.y), U.x + se[$ + 0], U.y + se[$ + 1], U.x + se[$ + 2], U.y + se[$ + 3]);
              N.x = U.x + se[$ + 0];
              N.y = U.y + se[$ + 1];
              U.x += se[$ + 2];
              U.y += se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "q":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 4) {
              G.quadraticCurveTo(U.x + se[$ + 0], U.y + se[$ + 1], U.x + se[$ + 2], U.y + se[$ + 3]);
              N.x = U.x + se[$ + 0];
              N.y = U.y + se[$ + 1];
              U.x += se[$ + 2];
              U.y += se[$ + 3];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "t":
            se = S(Be);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 2) {
              const Ye = M(U.x, N.x);
              const st = M(U.y, N.y);
              G.quadraticCurveTo(Ye, st, U.x + se[$ + 0], U.y + se[$ + 1]);
              N.x = Ye;
              N.y = st;
              U.x = U.x + se[$ + 0];
              U.y = U.y + se[$ + 1];
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "a":
            se = S(Be, [3, 4], 7);
            for (let $ = 0, Oe = se.length; $ < Oe; $ += 7) {
              if (se[$ + 5] == 0 && se[$ + 6] == 0) {
                continue;
              }
              const Ye = U.clone();
              U.x += se[$ + 5];
              U.y += se[$ + 6];
              N.x = U.x;
              N.y = U.y;
              l(G, se[$], se[$ + 1], se[$ + 2], se[$ + 3], se[$ + 4], Ye, U);
              if ($ === 0 && de === true) {
                he.copy(U);
              }
            }
            break;
          case "Z":
          case "z":
            G.currentPath.autoClose = true;
            if (G.currentPath.curves.length > 0) {
              U.copy(he);
              G.currentPath.currentPoint.copy(U);
              ve = true;
            }
            break;
          default:
            console.warn(Se);
        }
        de = false;
      }
      return G;
    }
    function a(K) {
      if (!!K.sheet && !!K.sheet.cssRules && !!K.sheet.cssRules.length) {
        for (let G = 0; G < K.sheet.cssRules.length; G++) {
          const U = K.sheet.cssRules[G];
          if (U.type !== 1) {
            continue;
          }
          const N = U.selectorText.split(/,/gm).filter(Boolean).map(he => he.trim());
          for (let he = 0; he < N.length; he++) {
            const ve = Object.fromEntries(Object.entries(U.style).filter(([, de]) => de !== ""));
            ce[N[he]] = Object.assign(ce[N[he]] || {}, ve);
          }
        }
      }
    }
    function l(K, G, U, N, he, ve, de, xe) {
      if (G == 0 || U == 0) {
        K.lineTo(xe.x, xe.y);
        return;
      }
      N = N * Math.PI / 180;
      G = Math.abs(G);
      U = Math.abs(U);
      const ee = (de.x - xe.x) / 2;
      const Ue = (de.y - xe.y) / 2;
      const fe = Math.cos(N) * ee + Math.sin(N) * Ue;
      const Se = -Math.sin(N) * ee + Math.cos(N) * Ue;
      let Me = G * G;
      let Be = U * U;
      const se = fe * fe;
      const $ = Se * Se;
      const Oe = se / Me + $ / Be;
      if (Oe > 1) {
        const Ee = Math.sqrt(Oe);
        G = Ee * G;
        U = Ee * U;
        Me = G * G;
        Be = U * U;
      }
      const Ye = Me * $ + Be * se;
      const st = (Me * Be - Ye) / Ye;
      let W = Math.sqrt(Math.max(0, st));
      if (he === ve) {
        W = -W;
      }
      const O = W * G * Se / U;
      const me = -W * U * fe / G;
      const Ie = Math.cos(N) * O - Math.sin(N) * me + (de.x + xe.x) / 2;
      const Le = Math.sin(N) * O + Math.cos(N) * me + (de.y + xe.y) / 2;
      const Y = c(1, 0, (fe - O) / G, (Se - me) / U);
      const we = c((fe - O) / G, (Se - me) / U, (-fe - O) / G, (-Se - me) / U) % (Math.PI * 2);
      K.currentPath.absellipse(Ie, Le, G, U, Y, Y + we, ve === 0, N);
    }
    function c(K, G, U, N) {
      const he = K * U + G * N;
      const ve = Math.sqrt(K * K + G * G) * Math.sqrt(U * U + N * N);
      let de = Math.acos(Math.max(-1, Math.min(1, he / ve)));
      if (K * N - G * U < 0) {
        de = -de;
      }
      return de;
    }
    function u(K) {
      const G = w(K.getAttribute("x") || 0);
      const U = w(K.getAttribute("y") || 0);
      const N = w(K.getAttribute("rx") || K.getAttribute("ry") || 0);
      const he = w(K.getAttribute("ry") || K.getAttribute("rx") || 0);
      const ve = w(K.getAttribute("width"));
      const de = w(K.getAttribute("height"));
      const xe = 0.448084975506;
      const ee = new ShapePath();
      ee.moveTo(G + N, U);
      ee.lineTo(G + ve - N, U);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G + ve - N * xe, U, G + ve, U + he * xe, G + ve, U + he);
      }
      ee.lineTo(G + ve, U + de - he);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G + ve, U + de - he * xe, G + ve - N * xe, U + de, G + ve - N, U + de);
      }
      ee.lineTo(G + N, U + de);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G + N * xe, U + de, G, U + de - he * xe, G, U + de - he);
      }
      ee.lineTo(G, U + he);
      if (N !== 0 || he !== 0) {
        ee.bezierCurveTo(G, U + he * xe, G + N * xe, U, G + N, U);
      }
      return ee;
    }
    function f(K) {
      function G(ve, de, xe) {
        const ee = w(de);
        const Ue = w(xe);
        if (he === 0) {
          N.moveTo(ee, Ue);
        } else {
          N.lineTo(ee, Ue);
        }
        he++;
      }
      const U = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
      const N = new ShapePath();
      let he = 0;
      K.getAttribute("points").replace(U, G);
      N.currentPath.autoClose = true;
      return N;
    }
    function p(K) {
      function G(ve, de, xe) {
        const ee = w(de);
        const Ue = w(xe);
        if (he === 0) {
          N.moveTo(ee, Ue);
        } else {
          N.lineTo(ee, Ue);
        }
        he++;
      }
      const U = /([+-]?\d*\.?\d+(?:e[+-]?\d+)?)(?:,|\s)([+-]?\d*\.?\d+(?:e[+-]?\d+)?)/g;
      const N = new ShapePath();
      let he = 0;
      K.getAttribute("points").replace(U, G);
      N.currentPath.autoClose = false;
      return N;
    }
    function g(K) {
      const G = w(K.getAttribute("cx") || 0);
      const U = w(K.getAttribute("cy") || 0);
      const N = w(K.getAttribute("r") || 0);
      const he = new Path();
      he.absarc(G, U, N, 0, Math.PI * 2);
      const ve = new ShapePath();
      ve.subPaths.push(he);
      return ve;
    }
    function v(K) {
      const G = w(K.getAttribute("cx") || 0);
      const U = w(K.getAttribute("cy") || 0);
      const N = w(K.getAttribute("rx") || 0);
      const he = w(K.getAttribute("ry") || 0);
      const ve = new Path();
      ve.absellipse(G, U, N, he, 0, Math.PI * 2);
      const de = new ShapePath();
      de.subPaths.push(ve);
      return de;
    }
    function _(K) {
      const G = w(K.getAttribute("x1") || 0);
      const U = w(K.getAttribute("y1") || 0);
      const N = w(K.getAttribute("x2") || 0);
      const he = w(K.getAttribute("y2") || 0);
      const ve = new ShapePath();
      ve.moveTo(G, U);
      ve.lineTo(N, he);
      ve.currentPath.autoClose = false;
      return ve;
    }
    function T(K, G) {
      G = Object.assign({}, G);
      let U = {};
      if (K.hasAttribute("class")) {
        const de = K.getAttribute("class").split(/\s/).filter(Boolean).map(xe => xe.trim());
        for (let xe = 0; xe < de.length; xe++) {
          U = Object.assign(U, ce["." + de[xe]]);
        }
      }
      if (K.hasAttribute("id")) {
        U = Object.assign(U, ce["#" + K.getAttribute("id")]);
      }
      function N(de, xe, ee = function (fe) {
        if (fe.startsWith("url")) {
          console.warn("SVGLoader: url access in attributes is not implemented.");
        }
        return fe;
      }) {
        if (K.hasAttribute(de)) {
          G[xe] = ee(K.getAttribute(de));
        }
        if (U[de]) {
          G[xe] = ee(U[de]);
        }
        if (K.style && K.style[de] !== "") {
          G[xe] = ee(K.style[de]);
        }
      }
      function he(de) {
        return Math.max(0, Math.min(1, w(de)));
      }
      function ve(de) {
        return Math.max(0, w(de));
      }
      N("fill", "fill");
      N("fill-opacity", "fillOpacity", he);
      N("fill-rule", "fillRule");
      N("opacity", "opacity", he);
      N("stroke", "stroke");
      N("stroke-opacity", "strokeOpacity", he);
      N("stroke-width", "strokeWidth", ve);
      N("stroke-linejoin", "strokeLineJoin");
      N("stroke-linecap", "strokeLineCap");
      N("stroke-miterlimit", "strokeMiterLimit", ve);
      N("visibility", "visibility");
      return G;
    }
    function M(K, G) {
      return K - (G - K);
    }
    function S(K, G, U) {
      if (typeof K != "string") {
        throw new TypeError("Invalid input: " + typeof K);
      }
      const N = {
        WHITESPACE: /[ \t\r\n]/,
        DIGIT: /[\d]/,
        SIGN: /[-+]/,
        POINT: /\./,
        COMMA: /,/,
        EXP: /e/i,
        FLAGS: /[01]/
      };
      const he = 0;
      const ve = 1;
      const de = 2;
      const xe = 3;
      let ee = he;
      let Ue = true;
      let fe = "";
      let Se = "";
      const Me = [];
      function Be(Ye, st, W) {
        const O = new SyntaxError("Unexpected character \"" + Ye + "\" at index " + st + ".");
        O.partial = W;
        throw O;
      }
      function se() {
        if (fe !== "") {
          if (Se === "") {
            Me.push(Number(fe));
          } else {
            Me.push(Number(fe) * Math.pow(10, Number(Se)));
          }
        }
        fe = "";
        Se = "";
      }
      let $;
      const Oe = K.length;
      for (let Ye = 0; Ye < Oe; Ye++) {
        $ = K[Ye];
        if (Array.isArray(G) && G.includes(Me.length % U) && N.FLAGS.test($)) {
          ee = ve;
          fe = $;
          se();
          continue;
        }
        if (ee === he) {
          if (N.WHITESPACE.test($)) {
            continue;
          }
          if (N.DIGIT.test($) || N.SIGN.test($)) {
            ee = ve;
            fe = $;
            continue;
          }
          if (N.POINT.test($)) {
            ee = de;
            fe = $;
            continue;
          }
          if (N.COMMA.test($)) {
            if (Ue) {
              Be($, Ye, Me);
            }
            Ue = true;
          }
        }
        if (ee === ve) {
          if (N.DIGIT.test($)) {
            fe += $;
            continue;
          }
          if (N.POINT.test($)) {
            fe += $;
            ee = de;
            continue;
          }
          if (N.EXP.test($)) {
            ee = xe;
            continue;
          }
          if (N.SIGN.test($) && fe.length === 1 && N.SIGN.test(fe[0])) {
            Be($, Ye, Me);
          }
        }
        if (ee === de) {
          if (N.DIGIT.test($)) {
            fe += $;
            continue;
          }
          if (N.EXP.test($)) {
            ee = xe;
            continue;
          }
          if (N.POINT.test($) && fe[fe.length - 1] === ".") {
            Be($, Ye, Me);
          }
        }
        if (ee === xe) {
          if (N.DIGIT.test($)) {
            Se += $;
            continue;
          }
          if (N.SIGN.test($)) {
            if (Se === "") {
              Se += $;
              continue;
            }
            if (Se.length === 1 && N.SIGN.test(Se)) {
              Be($, Ye, Me);
            }
          }
        }
        if (N.WHITESPACE.test($)) {
          se();
          ee = he;
          Ue = false;
        } else if (N.COMMA.test($)) {
          se();
          ee = he;
          Ue = true;
        } else if (N.SIGN.test($)) {
          se();
          ee = ve;
          fe = $;
        } else if (N.POINT.test($)) {
          se();
          ee = de;
          fe = $;
        } else {
          Be($, Ye, Me);
        }
      }
      se();
      return Me;
    }
    const b = ["mm", "cm", "in", "pt", "pc", "px"];
    const C = {
      mm: {
        mm: 1,
        cm: 0.1,
        in: 1 / 25.4,
        pt: 72 / 25.4,
        pc: 6 / 25.4,
        px: -1
      },
      cm: {
        mm: 10,
        cm: 1,
        in: 1 / 2.54,
        pt: 72 / 2.54,
        pc: 6 / 2.54,
        px: -1
      },
      in: {
        mm: 25.4,
        cm: 2.54,
        in: 1,
        pt: 72,
        pc: 6,
        px: -1
      },
      pt: {
        mm: 25.4 / 72,
        cm: 2.54 / 72,
        in: 1 / 72,
        pt: 1,
        pc: 6 / 72,
        px: -1
      },
      pc: {
        mm: 25.4 / 6,
        cm: 2.54 / 6,
        in: 1 / 6,
        pt: 12,
        pc: 1,
        px: -1
      },
      px: {
        px: 1
      }
    };
    function w(K) {
      let G = "px";
      if (typeof K == "string" || K instanceof String) {
        for (let N = 0, he = b.length; N < he; N++) {
          const ve = b[N];
          if (K.endsWith(ve)) {
            G = ve;
            K = K.substring(0, K.length - ve.length);
            break;
          }
        }
      }
      let U;
      if (G === "px" && t.defaultUnit !== "px") {
        U = C.in[t.defaultUnit] / t.defaultDPI;
      } else {
        U = C[G][t.defaultUnit];
        if (U < 0) {
          U = C[G].in * t.defaultDPI;
        }
      }
      return U * parseFloat(K);
    }
    function R(K) {
      if (!K.hasAttribute("transform") && (K.nodeName !== "use" || !K.hasAttribute("x") && !K.hasAttribute("y"))) {
        return null;
      }
      const G = E(K);
      if (z.length > 0) {
        G.premultiply(z[z.length - 1]);
      }
      te.copy(G);
      z.push(G);
      return G;
    }
    function E(K) {
      const G = new Matrix3();
      const U = j;
      if (K.nodeName === "use" && (K.hasAttribute("x") || K.hasAttribute("y"))) {
        const N = w(K.getAttribute("x"));
        const he = w(K.getAttribute("y"));
        G.translate(N, he);
      }
      if (K.hasAttribute("transform")) {
        const N = K.getAttribute("transform").split(")");
        for (let he = N.length - 1; he >= 0; he--) {
          const ve = N[he].trim();
          if (ve === "") {
            continue;
          }
          const de = ve.indexOf("(");
          const xe = ve.length;
          if (de > 0 && de < xe) {
            const ee = ve.slice(0, de);
            const Ue = S(ve.slice(de + 1));
            U.identity();
            switch (ee) {
              case "translate":
                if (Ue.length >= 1) {
                  const fe = Ue[0];
                  let Se = 0;
                  if (Ue.length >= 2) {
                    Se = Ue[1];
                  }
                  U.translate(fe, Se);
                }
                break;
              case "rotate":
                if (Ue.length >= 1) {
                  let fe = 0;
                  let Se = 0;
                  let Me = 0;
                  fe = Ue[0] * Math.PI / 180;
                  if (Ue.length >= 3) {
                    Se = Ue[1];
                    Me = Ue[2];
                  }
                  X.makeTranslation(-Se, -Me);
                  Z.makeRotation(fe);
                  q.multiplyMatrices(Z, X);
                  X.makeTranslation(Se, Me);
                  U.multiplyMatrices(X, q);
                }
                break;
              case "scale":
                if (Ue.length >= 1) {
                  const fe = Ue[0];
                  let Se = fe;
                  if (Ue.length >= 2) {
                    Se = Ue[1];
                  }
                  U.scale(fe, Se);
                }
                break;
              case "skewX":
                if (Ue.length === 1) {
                  U.set(1, Math.tan(Ue[0] * Math.PI / 180), 0, 0, 1, 0, 0, 0, 1);
                }
                break;
              case "skewY":
                if (Ue.length === 1) {
                  U.set(1, 0, 0, Math.tan(Ue[0] * Math.PI / 180), 1, 0, 0, 0, 1);
                }
                break;
              case "matrix":
                if (Ue.length === 6) {
                  U.set(Ue[0], Ue[2], Ue[4], Ue[1], Ue[3], Ue[5], 0, 0, 1);
                }
                break;
            }
          }
          G.premultiply(U);
        }
      }
      return G;
    }
    function I(K, G) {
      function U(de) {
        oe.set(de.x, de.y, 1).applyMatrix3(G);
        de.set(oe.x, oe.y);
      }
      function N(de) {
        const xe = de.xRadius;
        const ee = de.yRadius;
        const Ue = Math.cos(de.aRotation);
        const fe = Math.sin(de.aRotation);
        const Se = new Vector3(xe * Ue, xe * fe, 0);
        const Me = new Vector3(-ee * fe, ee * Ue, 0);
        const Be = Se.applyMatrix3(G);
        const se = Me.applyMatrix3(G);
        const $ = j.set(Be.x, se.x, 0, Be.y, se.y, 0, 0, 0, 1);
        const Oe = X.copy($).invert();
        const W = Z.copy(Oe).transpose().multiply(Oe).elements;
        const O = ne(W[0], W[1], W[4]);
        const me = Math.sqrt(O.rt1);
        const Ie = Math.sqrt(O.rt2);
        de.xRadius = 1 / me;
        de.yRadius = 1 / Ie;
        de.aRotation = Math.atan2(O.sn, O.cs);
        if (!((de.aEndAngle - de.aStartAngle) % (Math.PI * 2) < Number.EPSILON)) {
          const Y = X.set(me, 0, 0, 0, Ie, 0, 0, 0, 1);
          const we = Z.set(O.cs, O.sn, 0, -O.sn, O.cs, 0, 0, 0, 1);
          const Ee = Y.multiply(we).multiply($);
          const Fe = Xe => {
            const {
              x: tt,
              y: Re
            } = new Vector3(Math.cos(Xe), Math.sin(Xe), 0).applyMatrix3(Ee);
            return Math.atan2(Re, tt);
          };
          de.aStartAngle = Fe(de.aStartAngle);
          de.aEndAngle = Fe(de.aEndAngle);
          if (F(G)) {
            de.aClockwise = !de.aClockwise;
          }
        }
      }
      function he(de) {
        const xe = L(G);
        const ee = D(G);
        de.xRadius *= xe;
        de.yRadius *= ee;
        const Ue = xe > Number.EPSILON ? Math.atan2(G.elements[1], G.elements[0]) : Math.atan2(-G.elements[3], G.elements[4]);
        de.aRotation += Ue;
        if (F(G)) {
          de.aStartAngle *= -1;
          de.aEndAngle *= -1;
          de.aClockwise = !de.aClockwise;
        }
      }
      const ve = K.subPaths;
      for (let de = 0, xe = ve.length; de < xe; de++) {
        const Ue = ve[de].curves;
        for (let fe = 0; fe < Ue.length; fe++) {
          const Se = Ue[fe];
          if (Se.isLineCurve) {
            U(Se.v1);
            U(Se.v2);
          } else if (Se.isCubicBezierCurve) {
            U(Se.v0);
            U(Se.v1);
            U(Se.v2);
            U(Se.v3);
          } else if (Se.isQuadraticBezierCurve) {
            U(Se.v0);
            U(Se.v1);
            U(Se.v2);
          } else if (Se.isEllipseCurve) {
            ue.set(Se.aX, Se.aY);
            U(ue);
            Se.aX = ue.x;
            Se.aY = ue.y;
            if (k(G)) {
              N(Se);
            } else {
              he(Se);
            }
          }
        }
      }
    }
    function F(K) {
      const G = K.elements;
      return G[0] * G[4] - G[1] * G[3] < 0;
    }
    function k(K) {
      const G = K.elements;
      const U = G[0] * G[3] + G[1] * G[4];
      if (U === 0) {
        return false;
      }
      const N = L(K);
      const he = D(K);
      return Math.abs(U / (N * he)) > Number.EPSILON;
    }
    function L(K) {
      const G = K.elements;
      return Math.sqrt(G[0] * G[0] + G[1] * G[1]);
    }
    function D(K) {
      const G = K.elements;
      return Math.sqrt(G[3] * G[3] + G[4] * G[4]);
    }
    function ne(K, G, U) {
      let N;
      let he;
      let ve;
      let de;
      let xe;
      const ee = K + U;
      const Ue = K - U;
      const fe = Math.sqrt(Ue * Ue + G * 4 * G);
      if (ee > 0) {
        N = (ee + fe) * 0.5;
        xe = 1 / N;
        he = K * xe * U - G * xe * G;
      } else if (ee < 0) {
        he = (ee - fe) * 0.5;
      } else {
        N = fe * 0.5;
        he = fe * -0.5;
      }
      if (Ue > 0) {
        ve = Ue + fe;
      } else {
        ve = Ue - fe;
      }
      if (Math.abs(ve) > Math.abs(G) * 2) {
        xe = G * -2 / ve;
        de = 1 / Math.sqrt(1 + xe * xe);
        ve = xe * de;
      } else if (Math.abs(G) === 0) {
        ve = 1;
        de = 0;
      } else {
        xe = ve * -0.5 / G;
        ve = 1 / Math.sqrt(1 + xe * xe);
        de = xe * ve;
      }
      if (Ue > 0) {
        xe = ve;
        ve = -de;
        de = xe;
      }
      return {
        rt1: N,
        rt2: he,
        cs: ve,
        sn: de
      };
    }
    const re = [];
    const ce = {};
    const z = [];
    const j = new Matrix3();
    const X = new Matrix3();
    const Z = new Matrix3();
    const q = new Matrix3();
    const ue = new Vector2();
    const oe = new Vector3();
    const te = new Matrix3();
    const le = new DOMParser().parseFromString(e, "image/svg+xml");
    r(le.documentElement, {
      fill: "#000",
      fillOpacity: 1,
      strokeOpacity: 1,
      strokeWidth: 1,
      strokeLineJoin: "miter",
      strokeLineCap: "butt",
      strokeMiterLimit: 4
    });
    return {
      paths: re,
      xml: le.documentElement
    };
  }
  createShapes(e) {
    const r = {
      ORIGIN: 0,
      DESTINATION: 1,
      BETWEEN: 2,
      LEFT: 3,
      RIGHT: 4,
      BEHIND: 5,
      BEYOND: 6
    };
    const n = {
      loc: r.ORIGIN,
      t: 0
    };
    function a(M, S, b, C) {
      const w = M.x;
      const R = S.x;
      const E = b.x;
      const I = C.x;
      const F = M.y;
      const k = S.y;
      const L = b.y;
      const D = C.y;
      const ne = (I - E) * (F - L) - (D - L) * (w - E);
      const re = (R - w) * (F - L) - (k - F) * (w - E);
      const ce = (D - L) * (R - w) - (I - E) * (k - F);
      const z = ne / ce;
      const j = re / ce;
      if (ce === 0 && ne !== 0 || z <= 0 || z >= 1 || j < 0 || j > 1) {
        return null;
      }
      if (ne === 0 && ce === 0) {
        for (let X = 0; X < 2; X++) {
          l(X === 0 ? b : C, M, S);
          if (n.loc == r.ORIGIN) {
            const Z = X === 0 ? b : C;
            return {
              x: Z.x,
              y: Z.y,
              t: n.t
            };
          } else if (n.loc == r.BETWEEN) {
            const Z = +(w + n.t * (R - w)).toPrecision(10);
            const q = +(F + n.t * (k - F)).toPrecision(10);
            return {
              x: Z,
              y: q,
              t: n.t
            };
          }
        }
        return null;
      } else {
        for (let q = 0; q < 2; q++) {
          l(q === 0 ? b : C, M, S);
          if (n.loc == r.ORIGIN) {
            const ue = q === 0 ? b : C;
            return {
              x: ue.x,
              y: ue.y,
              t: n.t
            };
          }
        }
        const X = +(w + z * (R - w)).toPrecision(10);
        const Z = +(F + z * (k - F)).toPrecision(10);
        return {
          x: X,
          y: Z,
          t: z
        };
      }
    }
    function l(M, S, b) {
      const C = b.x - S.x;
      const w = b.y - S.y;
      const R = M.x - S.x;
      const E = M.y - S.y;
      const I = C * E - R * w;
      if (M.x === S.x && M.y === S.y) {
        n.loc = r.ORIGIN;
        n.t = 0;
        return;
      }
      if (M.x === b.x && M.y === b.y) {
        n.loc = r.DESTINATION;
        n.t = 1;
        return;
      }
      if (I < -Number.EPSILON) {
        n.loc = r.LEFT;
        return;
      }
      if (I > Number.EPSILON) {
        n.loc = r.RIGHT;
        return;
      }
      if (C * R < 0 || w * E < 0) {
        n.loc = r.BEHIND;
        return;
      }
      if (Math.sqrt(C * C + w * w) < Math.sqrt(R * R + E * E)) {
        n.loc = r.BEYOND;
        return;
      }
      let F;
      if (C !== 0) {
        F = R / C;
      } else {
        F = E / w;
      }
      n.loc = r.BETWEEN;
      n.t = F;
    }
    function c(M, S) {
      const b = [];
      const C = [];
      for (let w = 1; w < M.length; w++) {
        const R = M[w - 1];
        const E = M[w];
        for (let I = 1; I < S.length; I++) {
          const F = S[I - 1];
          const k = S[I];
          const L = a(R, E, F, k);
          if (L !== null && b.find(D => D.t <= L.t + Number.EPSILON && D.t >= L.t - Number.EPSILON) === undefined) {
            b.push(L);
            C.push(new Vector2(L.x, L.y));
          }
        }
      }
      return C;
    }
    function u(M, S, b) {
      const C = new Vector2();
      S.getCenter(C);
      const w = [];
      b.forEach(R => {
        if (R.boundingBox.containsPoint(C)) {
          c(M, R.points).forEach(I => {
            w.push({
              identifier: R.identifier,
              isCW: R.isCW,
              point: I
            });
          });
        }
      });
      w.sort((R, E) => R.point.x - E.point.x);
      return w;
    }
    function f(M, S, b, C, w) {
      if (w == null || w === "") {
        w = "nonzero";
      }
      const R = new Vector2();
      M.boundingBox.getCenter(R);
      const E = [new Vector2(b, R.y), new Vector2(C, R.y)];
      const I = u(E, M.boundingBox, S);
      I.sort((re, ce) => re.point.x - ce.point.x);
      const F = [];
      const k = [];
      I.forEach(re => {
        if (re.identifier === M.identifier) {
          F.push(re);
        } else {
          k.push(re);
        }
      });
      const L = F[0].point.x;
      const D = [];
      let ne = 0;
      while (ne < k.length && k[ne].point.x < L) {
        if (D.length > 0 && D[D.length - 1] === k[ne].identifier) {
          D.pop();
        } else {
          D.push(k[ne].identifier);
        }
        ne++;
      }
      D.push(M.identifier);
      if (w === "evenodd") {
        const re = D.length % 2 === 0;
        const ce = D[D.length - 2];
        return {
          identifier: M.identifier,
          isHole: re,
          for: ce
        };
      } else if (w === "nonzero") {
        let re = true;
        let ce = null;
        let z = null;
        for (let j = 0; j < D.length; j++) {
          const X = D[j];
          if (re) {
            z = S[X].isCW;
            re = false;
            ce = X;
          } else if (z !== S[X].isCW) {
            z = S[X].isCW;
            re = true;
          }
        }
        return {
          identifier: M.identifier,
          isHole: re,
          for: ce
        };
      } else {
        console.warn("fill-rule: \"" + w + "\" is currently not implemented.");
      }
    }
    let p = 999999999;
    let g = -999999999;
    let v = e.subPaths.map(M => {
      const S = M.getPoints();
      let b = -999999999;
      let C = 999999999;
      let w = -999999999;
      let R = 999999999;
      for (let E = 0; E < S.length; E++) {
        const I = S[E];
        if (I.y > b) {
          b = I.y;
        }
        if (I.y < C) {
          C = I.y;
        }
        if (I.x > w) {
          w = I.x;
        }
        if (I.x < R) {
          R = I.x;
        }
      }
      if (g <= w) {
        g = w + 1;
      }
      if (p >= R) {
        p = R - 1;
      }
      return {
        curves: M.curves,
        points: S,
        isCW: ShapeUtils.isClockWise(S),
        identifier: -1,
        boundingBox: new Box2(new Vector2(R, C), new Vector2(w, b))
      };
    });
    v = v.filter(M => M.points.length > 1);
    for (let M = 0; M < v.length; M++) {
      v[M].identifier = M;
    }
    const _ = v.map(M => f(M, v, p, g, e.userData ? e.userData.style.fillRule : undefined));
    const T = [];
    v.forEach(M => {
      if (!_[M.identifier].isHole) {
        const b = new Shape();
        b.curves = M.curves;
        _.filter(w => w.isHole && w.for === M.identifier).forEach(w => {
          const R = v[w.identifier];
          const E = new Path();
          E.curves = R.curves;
          b.holes.push(E);
        });
        T.push(b);
      }
    });
    return T;
  }
  getStrokeStyle(e, t, r, n, a) {
    e = e !== undefined ? e : 1;
    t = t !== undefined ? t : "#000";
    r = r !== undefined ? r : "miter";
    n = n !== undefined ? n : "butt";
    a = a !== undefined ? a : 4;
    return {
      strokeColor: t,
      strokeWidth: e,
      strokeLineJoin: r,
      strokeLineCap: n,
      strokeMiterLimit: a
    };
  }
  pointsToStroke(e, t, r, n) {
    const a = [];
    const l = [];
    const c = [];
    if (SVGLoader.pointsToStrokeWithBuffers(e, t, r, n, a, l, c) === 0) {
      return null;
    }
    const u = new BufferGeometry();
    u.setAttribute("position", new Float32BufferAttribute(a, 3));
    u.setAttribute("normal", new Float32BufferAttribute(l, 3));
    u.setAttribute("uv", new Float32BufferAttribute(c, 2));
    return u;
  }
  pointsToStrokeWithBuffers(e, t, r, n, a, l, c, u) {
    const f = new Vector2();
    const p = new Vector2();
    const g = new Vector2();
    const v = new Vector2();
    const _ = new Vector2();
    const T = new Vector2();
    const M = new Vector2();
    const S = new Vector2();
    const b = new Vector2();
    const C = new Vector2();
    const w = new Vector2();
    const R = new Vector2();
    const E = new Vector2();
    const I = new Vector2();
    const F = new Vector2();
    const k = new Vector2();
    const L = new Vector2();
    r = r !== undefined ? r : 12;
    n = n !== undefined ? n : 0.001;
    u = u !== undefined ? u : 0;
    e = Ue(e);
    const D = e.length;
    if (D < 2) {
      return 0;
    }
    const ne = e[0].equals(e[D - 1]);
    let re;
    let ce = e[0];
    let z;
    const j = t.strokeWidth / 2;
    const X = 1 / (D - 1);
    let Z = 0;
    let q;
    let ue;
    let oe;
    let te;
    let le = false;
    let Te = 0;
    let K = u * 3;
    let G = u * 2;
    U(e[0], e[1], f).multiplyScalar(j);
    S.copy(e[0]).sub(f);
    b.copy(e[0]).add(f);
    C.copy(S);
    w.copy(b);
    for (let fe = 1; fe < D; fe++) {
      re = e[fe];
      if (fe === D - 1) {
        if (ne) {
          z = e[1];
        } else {
          z = undefined;
        }
      } else {
        z = e[fe + 1];
      }
      const Se = f;
      U(ce, re, Se);
      g.copy(Se).multiplyScalar(j);
      R.copy(re).sub(g);
      E.copy(re).add(g);
      q = Z + X;
      ue = false;
      if (z !== undefined) {
        U(re, z, p);
        g.copy(p).multiplyScalar(j);
        I.copy(re).sub(g);
        F.copy(re).add(g);
        oe = true;
        g.subVectors(z, ce);
        if (Se.dot(g) < 0) {
          oe = false;
        }
        if (fe === 1) {
          le = oe;
        }
        g.subVectors(z, re);
        g.normalize();
        const Me = Math.abs(Se.dot(g));
        if (Me > Number.EPSILON) {
          const Be = j / Me;
          g.multiplyScalar(-Be);
          v.subVectors(re, ce);
          _.copy(v).setLength(Be).add(g);
          k.copy(_).negate();
          const se = _.length();
          const $ = v.length();
          v.divideScalar($);
          T.subVectors(z, re);
          const Oe = T.length();
          T.divideScalar(Oe);
          if (v.dot(k) < $ && T.dot(k) < Oe) {
            ue = true;
          }
          L.copy(_).add(re);
          k.add(re);
          te = false;
          if (ue) {
            if (oe) {
              F.copy(k);
              E.copy(k);
            } else {
              I.copy(k);
              R.copy(k);
            }
          } else {
            ve();
          }
          switch (t.strokeLineJoin) {
            case "bevel":
              de(oe, ue, q);
              break;
            case "round":
              xe(oe, ue);
              if (oe) {
                he(re, R, I, q, 0);
              } else {
                he(re, F, E, q, 1);
              }
              break;
            case "miter":
            case "miter-clip":
            default:
              const Ye = j * t.strokeMiterLimit / se;
              if (Ye < 1) {
                if (t.strokeLineJoin !== "miter-clip") {
                  de(oe, ue, q);
                  break;
                } else {
                  xe(oe, ue);
                  if (oe) {
                    T.subVectors(L, R).multiplyScalar(Ye).add(R);
                    M.subVectors(L, I).multiplyScalar(Ye).add(I);
                    N(R, q, 0);
                    N(T, q, 0);
                    N(re, q, 0.5);
                    N(re, q, 0.5);
                    N(T, q, 0);
                    N(M, q, 0);
                    N(re, q, 0.5);
                    N(M, q, 0);
                    N(I, q, 0);
                  } else {
                    T.subVectors(L, E).multiplyScalar(Ye).add(E);
                    M.subVectors(L, F).multiplyScalar(Ye).add(F);
                    N(E, q, 1);
                    N(T, q, 1);
                    N(re, q, 0.5);
                    N(re, q, 0.5);
                    N(T, q, 1);
                    N(M, q, 1);
                    N(re, q, 0.5);
                    N(M, q, 1);
                    N(F, q, 1);
                  }
                }
              } else {
                if (ue) {
                  if (oe) {
                    N(b, Z, 1);
                    N(S, Z, 0);
                    N(L, q, 0);
                    N(b, Z, 1);
                    N(L, q, 0);
                    N(k, q, 1);
                  } else {
                    N(b, Z, 1);
                    N(S, Z, 0);
                    N(L, q, 1);
                    N(S, Z, 0);
                    N(k, q, 0);
                    N(L, q, 1);
                  }
                  if (oe) {
                    I.copy(L);
                  } else {
                    F.copy(L);
                  }
                } else if (oe) {
                  N(R, q, 0);
                  N(L, q, 0);
                  N(re, q, 0.5);
                  N(re, q, 0.5);
                  N(L, q, 0);
                  N(I, q, 0);
                } else {
                  N(E, q, 1);
                  N(L, q, 1);
                  N(re, q, 0.5);
                  N(re, q, 0.5);
                  N(L, q, 1);
                  N(F, q, 1);
                }
                te = true;
              }
              break;
          }
        } else {
          ve();
        }
      } else {
        ve();
      }
      if (!ne && fe === D - 1) {
        ee(e[0], C, w, oe, true, Z);
      }
      Z = q;
      ce = re;
      S.copy(I);
      b.copy(F);
    }
    if (!ne) {
      ee(re, R, E, oe, false, q);
    } else if (ue && a) {
      let fe = L;
      let Se = k;
      if (le !== oe) {
        fe = k;
        Se = L;
      }
      if (oe) {
        if (te || le) {
          Se.toArray(a, 0);
          Se.toArray(a, 9);
          if (te) {
            fe.toArray(a, 3);
          }
        }
      } else if (te || !le) {
        Se.toArray(a, 3);
        Se.toArray(a, 9);
        if (te) {
          fe.toArray(a, 0);
        }
      }
    }
    return Te;
    function U(fe, Se, Me) {
      Me.subVectors(Se, fe);
      return Me.set(-Me.y, Me.x).normalize();
    }
    function N(fe, Se, Me) {
      if (a) {
        a[K] = fe.x;
        a[K + 1] = fe.y;
        a[K + 2] = 0;
        if (l) {
          l[K] = 0;
          l[K + 1] = 0;
          l[K + 2] = 1;
        }
        K += 3;
        if (c) {
          c[G] = Se;
          c[G + 1] = Me;
          G += 2;
        }
      }
      Te += 3;
    }
    function he(fe, Se, Me, Be, se) {
      f.copy(Se).sub(fe).normalize();
      p.copy(Me).sub(fe).normalize();
      let $ = Math.PI;
      const Oe = f.dot(p);
      if (Math.abs(Oe) < 1) {
        $ = Math.abs(Math.acos(Oe));
      }
      $ /= r;
      g.copy(Se);
      for (let Ye = 0, st = r - 1; Ye < st; Ye++) {
        v.copy(g).rotateAround(fe, $);
        N(g, Be, se);
        N(v, Be, se);
        N(fe, Be, 0.5);
        g.copy(v);
      }
      N(v, Be, se);
      N(Me, Be, se);
      N(fe, Be, 0.5);
    }
    function ve() {
      N(b, Z, 1);
      N(S, Z, 0);
      N(R, q, 0);
      N(b, Z, 1);
      N(R, q, 1);
      N(E, q, 0);
    }
    function de(fe, Se, Me) {
      if (Se) {
        if (fe) {
          N(b, Z, 1);
          N(S, Z, 0);
          N(R, q, 0);
          N(b, Z, 1);
          N(R, q, 0);
          N(k, q, 1);
          N(R, Me, 0);
          N(I, Me, 0);
          N(k, Me, 0.5);
        } else {
          N(b, Z, 1);
          N(S, Z, 0);
          N(E, q, 1);
          N(S, Z, 0);
          N(k, q, 0);
          N(E, q, 1);
          N(E, Me, 1);
          N(F, Me, 0);
          N(k, Me, 0.5);
        }
      } else if (fe) {
        N(R, Me, 0);
        N(I, Me, 0);
        N(re, Me, 0.5);
      } else {
        N(E, Me, 1);
        N(F, Me, 0);
        N(re, Me, 0.5);
      }
    }
    function xe(fe, Se) {
      if (Se) {
        if (fe) {
          N(b, Z, 1);
          N(S, Z, 0);
          N(R, q, 0);
          N(b, Z, 1);
          N(R, q, 0);
          N(k, q, 1);
          N(R, Z, 0);
          N(re, q, 0.5);
          N(k, q, 1);
          N(re, q, 0.5);
          N(I, Z, 0);
          N(k, q, 1);
        } else {
          N(b, Z, 1);
          N(S, Z, 0);
          N(E, q, 1);
          N(S, Z, 0);
          N(k, q, 0);
          N(E, q, 1);
          N(E, Z, 1);
          N(k, q, 0);
          N(re, q, 0.5);
          N(re, q, 0.5);
          N(k, q, 0);
          N(F, Z, 1);
        }
      }
    }
    function ee(fe, Se, Me, Be, se, $) {
      switch (t.strokeLineCap) {
        case "round":
          if (se) {
            he(fe, Me, Se, $, 0.5);
          } else {
            he(fe, Se, Me, $, 0.5);
          }
          break;
        case "square":
          if (se) {
            f.subVectors(Se, fe);
            p.set(f.y, -f.x);
            g.addVectors(f, p).add(fe);
            v.subVectors(p, f).add(fe);
            if (Be) {
              g.toArray(a, 3);
              v.toArray(a, 0);
              v.toArray(a, 9);
            } else {
              g.toArray(a, 3);
              g.toArray(a, 9);
              v.toArray(a, 0);
            }
          } else {
            f.subVectors(Me, fe);
            p.set(f.y, -f.x);
            g.addVectors(f, p).add(fe);
            v.subVectors(p, f).add(fe);
            const Oe = a.length;
            if (Be) {
              g.toArray(a, Oe - 3);
              v.toArray(a, Oe - 6);
              v.toArray(a, Oe - 12);
            } else {
              g.toArray(a, Oe - 6);
              v.toArray(a, Oe - 3);
              v.toArray(a, Oe - 12);
            }
          }
          break;
      }
    }
    function Ue(fe) {
      let Se = false;
      for (let Be = 1, se = fe.length - 1; Be < se; Be++) {
        if (fe[Be].distanceTo(fe[Be + 1]) < n) {
          Se = true;
          break;
        }
      }
      if (!Se) {
        return fe;
      }
      const Me = [];
      Me.push(fe[0]);
      for (let Be = 1, se = fe.length - 1; Be < se; Be++) {
        if (fe[Be].distanceTo(fe[Be + 1]) >= n) {
          Me.push(fe[Be]);
        }
      }
      Me.push(fe[fe.length - 1]);
      return Me;
    }
  }
}
const svgParser = new SVGParser();
const titleVert = `#define GLSLIFY 1
#ifdef IS_EDGE
attribute vec2 instancedPositionA;attribute vec2 instancedPositionB;varying vec2 v_toNode;uniform float u_radius;
#endif
uniform float u_scrollRatio;
#include <ufxVert>
varying vec2 v_uv;varying float v_ddd;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){
#ifdef IS_EDGE
bool isTop=position.y>0.;vec3 pos=vec3(isTop ? instancedPositionA : instancedPositionB,0.0);
#else
vec3 pos=position;
#endif
float lineRatio=floor(pos.y*6.)/6.;pos*=1.5;pos.x-=linearStep(lineRatio*0.4,0.56+lineRatio*0.4,u_scrollRatio)*0.5;vec3 basePos=getBasePosition(pos);vec3 screenPos=getScreenPosition(basePos);
#ifdef IS_EDGE
vec2 vAB=(instancedPositionA-instancedPositionB)*u_domWH;float angle=atan(vAB.y,vAB.x)+3.1415926*0.5;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);v_toNode=m*(position.xy*vec2(1.,step(0.5,abs(position.y))));screenPos.xy+=v_toNode*u_radius;
#endif
gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv*0.002);}`;
const titleFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform sampler2D u_gradientTexture;uniform vec2 u_screenPaintTextureSize;uniform vec2 u_resolution;uniform float u_time;uniform float u_invertRatio;uniform sampler2D u_texture;varying vec2 v_uv;
#ifdef IS_EDGE
varying vec2 v_toNode;
#endif
#include <getBlueNoise>
#include <textureBicubic>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(38.,27.));vec2 screenPaintUv=gl_FragCoord.xy/u_resolution;vec4 screenPaintData=textureBicubic(u_screenPaintTexture,screenPaintUv,u_screenPaintTextureSize);float timeOffset=u_time;
#ifdef IS_EDGE
timeOffset+=3.1415926;
#endif
float d=cos((screenPaintUv.x+screenPaintUv.y)*4.+timeOffset)*0.5+0.5;float screenPaintStrength=1.;float constantStrength=0.;float alpha=1.0;
#ifdef IS_EDGE
vec2 toNode=v_toNode;float toNodeDist=length(toNode);alpha=smoothstep(1.0+fwidth(toNodeDist),1.0,toNodeDist);screenPaintStrength=4.;vec3 baseColor=vec3(0.004+d*d*0.15);constantStrength=max(0.,d*2.-1.)*0.15;
#else
vec3 baseColor=vec3(0.004+d*d*0.015);
#endif
float hue=(screenPaintData.x+screenPaintData.y)*1.5+d*2.;vec3 color=mix(baseColor,texture2D(u_gradientTexture,vec2(hue,0.0)).rgb,max(screenPaintData.z,screenPaintData.w)*screenPaintStrength+constantStrength)+noise.x*0.004;gl_FragColor=vec4(mix(color,1.-color,u_invertRatio),alpha);}`;
class PostUfx extends Ufx {
  renderOrder = 100;
}
const postUfx = new PostUfx();
