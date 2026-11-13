/**
 * ============================================================================
 * Lusion Modular Component: 24-about-page
 * File: src/components/about/AboutPage.js
 * Description: AboutAwardSection, AboutCapabilitySection, AboutPageAudios & AboutPage Component
 * Original Engine Lines: 45149 - 45683
 * ============================================================================
 */
class AboutAwardSection {
  domContainer;
  domTitle;
  domCapabilitySectionContainer;
  offsetY = 0;
  showItemPerSecond = 10;
  _needsReset = true;
  isSectionWasActive = false;
  preInit(e) {
    this.domContainer = e.querySelector("#about-award");
    this.domTitle = e.querySelector("#about-award-title");
    this.domHeaders = Array.from(e.querySelectorAll(".about-award-header"));
    this.domItems = Array.from(e.querySelectorAll(".about-award-item"));
    for (let l = 0; l < this.domHeaders.length; l++) {
      let c = this.domHeaders[l];
      let u = c.querySelector(".about-award-header-title");
      let f = c.querySelector(".about-award-header-svg");
      let p = c.querySelector(".about-award-header-text");
      u._splitted = new SplitType(u, {
        types: "chars"
      });
      p._splitted = new SplitType(p, {
        types: "chars"
      });
      c._title = u;
      c._svg = f;
      c._number = p;
      c._animating = false;
      c._time = 0;
    }
    for (let l = 0; l < this.domItems.length; l++) {
      let c = this.domItems[l];
      let u = c.querySelector(".about-award-line");
      let f = Array.from(c.querySelectorAll(".about-award-item-wrapper"));
      c._animating = false;
      c._time = 0;
      for (let p = 0; p < f.length; p++) {
        let g = f[p];
        let v = Array.from(g.querySelectorAll(".about-award-item-wrapper-text"));
        for (let _ = 0; _ < v.length; _++) {
          let T = v[_];
          T._splitted = new SplitType(T, {
            types: "words"
          });
        }
        g._texts = v;
      }
      c._line = u;
      c._wrappers = f;
    }
    this.domCapabilitySectionContainer = e.querySelector("#about-capability");
    let t = svgParser.createShapes(svgParser.parse(this.domTitle.outerHTML).paths[0]);
    let r = new ShapeGeometry(t);
    r.scale(1 / 1438, 1 / 1252, 1);
    let n = this._generateEdgeIndices(r);
    let a = properties.loader.add(settings.TEXTURE_PATH + "award_gradient.png", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    a.wrapS = a.wrapT = RepeatWrapping;
    this.titleEdgeMesh = new UfxMesh({
      refDom: this.domTitle,
      geometry: n,
      uniforms: Object.assign({
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
        u_screenPaintTextureSize: screenPaint.sharedUniforms.u_paintTextureSize,
        u_time: properties.sharedUniforms.u_time,
        u_gradientTexture: {
          value: a
        },
        u_radius: {
          value: 2
        },
        u_invertRatio: {
          value: 0
        },
        u_scrollRatio: {
          value: 0
        }
      }, blueNoise.sharedUniforms),
      vertexShader: titleVert,
      fragmentShader: titleFrag
    });
    this.titleEdgeMesh.material.defines.IS_EDGE = true;
    aboutPage.postUfxContainer.add(this.titleEdgeMesh);
    this.titleMesh = new UfxMesh({
      refDom: this.domTitle,
      geometry: r,
      uniforms: this.titleEdgeMesh.material.uniforms,
      vertexShader: titleVert,
      fragmentShader: titleFrag
    });
    this.titleMesh.renderOrder = 1;
    aboutPage.postUfxContainer.add(this.titleMesh);
  }
  _generateEdgeIndices(e) {
    let t = {};
    let r = [];
    let n = [];
    let a = e.attributes.position.array;
    let l = e.index.array;
    for (let p = 0; p < l.length; p += 3) {
      let g = l[p];
      let v = l[p + 1];
      let _ = l[p + 2];
      let T = g < v ? `${g}_${v}` : `${v}_${g}`;
      let M = v < _ ? `${v}_${_}` : `${_}_${v}`;
      let S = _ < g ? `${_}_${g}` : `${g}_${_}`;
      if (t[T]) {
        t[T].count++;
      } else {
        t[T] = {
          count: 1,
          p0: g,
          p1: v
        };
      }
      if (t[M]) {
        t[M].count++;
      } else {
        t[M] = {
          count: 1,
          p0: v,
          p1: _
        };
      }
      if (t[S]) {
        t[S].count++;
      } else {
        t[S] = {
          count: 1,
          p0: _,
          p1: g
        };
      }
    }
    let c = 0;
    for (let p in t) {
      let g = t[p];
      if (g.count === 1) {
        r[c] = a[g.p0 * 3];
        n[c] = a[g.p1 * 3];
        c++;
        r[c] = a[g.p0 * 3 + 1];
        n[c] = a[g.p1 * 3 + 1];
        c++;
      }
    }
    let u = new PlaneGeometry(2, 2, 1, 3);
    let f = new InstancedBufferGeometry();
    f.index = u.index;
    f.attributes.position = u.attributes.position;
    f.attributes.instancedPositionA = new InstancedBufferAttribute(new Float32Array(r), 2);
    f.attributes.instancedPositionB = new InstancedBufferAttribute(new Float32Array(n), 2);
    return f;
  }
  init() {}
  show() {}
  hide() {}
  resize(e, t) {
    this._splitText();
    this.titleMesh.syncDom(-scrollManager.scrollPixel);
    this.titleEdgeMesh.syncDom(-scrollManager.scrollPixel);
    this.titleEdgeMesh.material.uniforms.u_radius.value = Math.max(1, properties.viewportWidth / 1200);
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    this.titleMesh.visible = r;
    this.titleEdgeMesh.visible = r;
    if (this.titleMesh.visible) {
      this.titleMesh.material.uniforms.u_scrollRatio.value = math.fit(t.ratio, -0.75, 0.75, 0, 1);
      this.titleMesh.update(-scrollManager.scrollPixel);
      this.titleEdgeMesh.update(-scrollManager.scrollPixel);
      let n = scrollManager.getDomRange(this.domCapabilitySectionContainer);
      this.titleMesh.material.uniforms.u_invertRatio.value = math.fit(n.screenRatio, -1, -0.75, 0, 1);
    }
    if (r) {
      for (let n = 0; n < this.domHeaders.length; n++) {
        let a = this.domHeaders[n];
        let l = scrollManager.getDomRange(a);
        if (l.screenRatio > -1) {
          a._animating = true;
        } else {
          a._animating = false;
        }
        a._time = math.clamp(a._time + (a._animating ? e : -e), 0, 1.5);
        a._svg.style.transform = `scale(${math.fit(a._time, 0.2, 0.6, 0, 1, ease.backOut)}) rotate(${math.fit(l.screenRatio - n / 10, -1, 1, n % 2 === 0 ? -360 : 360, 0)}deg)`;
        for (let c = 0; c < a._title._splitted.chars.length; c++) {
          let u = a._title._splitted.chars[c];
          let f = math.fit(a._time - c / 25, 0, 0.7, 30, 0, ease.expoOut);
          let p = math.fit(a._time - c / 25, 0, 0.7, 100, 0, ease.expoOut);
          if (properties.viewportWidth < settings.MOBILE_WIDTH) {
            p = 0;
            f = 0;
          }
          u.style.transform = `translate3d(0, ${p}%, 0) rotate(${f}deg)`;
        }
        for (let c = 0; c < a._number._splitted.chars.length; c++) {
          let u = a._number._splitted.chars[c];
          let f = math.fit(a._time - c / 20, 0.2, 0.9, 100, 0, ease.expoOut);
          if (properties.viewportWidth < settings.MOBILE_WIDTH) {
            f = 0;
          }
          u.style.transform = `translate3d(0, ${f}%, 0)`;
        }
      }
      for (let n = 0; n < this.domItems.length; n++) {
        let a = this.domItems[n];
        if (scrollManager.getDomRange(a).screenRatio > -1) {
          a._animating = true;
        } else {
          a._animating = false;
        }
        a._time = math.clamp(a._time + (a._animating ? e : -e), 0, 1.5);
        a._line.style.transform = `scale3d(${math.fit(a._time, 0.2, 1, 0, 1, ease.expoOut)} ,1 ,1)`;
        for (let c = 0; c < a._wrappers.length; c++) {
          let u = a._wrappers[c];
          for (let f = 0; f < u._texts.length; f++) {
            let p = u._texts[f];
            for (let g = 0; g < p._splitted.words.length; g++) {
              let v = p._splitted.words[g];
              let _ = math.fit(a._time - c / 10 - f / 20 - g / 50, 0, 0.8, 100, 0, ease.expoOut);
              if (properties.viewportWidth < settings.MOBILE_WIDTH) {
                _ = 0;
              }
              v.style.transform = `translate3d(0, ${_}%, 0)`;
            }
          }
        }
      }
      if (this._needsReset) {
        this._reset();
      }
    } else {
      this._needsReset = true;
    }
    this.isSectionWasActive = r;
  }
  _splitText() {}
  _reset() {
    this._needsReset = false;
    for (let e = 0; e < this.domHeaders.length; e++) {
      let t = this.domHeaders[e];
      t._animating = false;
      t._time = 0;
    }
    for (let e = 0; e < this.domItems.length; e++) {
      let t = this.domItems[e];
      let r = Array.from(t.querySelectorAll(".about-award-item-wrapper"));
      t._animating = false;
      t._time = 0;
      for (let n = 0; n < r.length; n++) {
        let a = r[n];
        let l = Array.from(a.querySelectorAll(".about-award-item-wrapper-text"));
        for (let c = 0; c < l.length; c++) {
          let u = l[c];
          u._splitted = new SplitType(u, {
            types: "words"
          });
        }
        a._texts = l;
      }
    }
  }
}
const aboutAwardSection = new AboutAwardSection();
const NUMBER_OF_CARDS = 4;
class AboutCapabilitySection {
  domContainer;
  domList;
  domLine1;
  domLine2;
  domCards;
  showItemPerSecond = 10;
  time = 0;
  _needsReset = true;
  preInit(e) {
    this.domContainer = e.querySelector("#about-capability");
    this.domTitle = e.querySelector("#about-capability-title");
    this.domSubheader = e.querySelector("#about-capability-subheader");
    this.domSubheaderText = e.querySelector("#about-capability-subheader-text");
    this.domSubhheaderCards = Array.from(e.querySelectorAll(".about-capability-subheader-card"));
    this.domLine1 = e.querySelector("#about-capability-title-line-1");
    this.domLine2 = e.querySelector("#about-capability-title-line-2");
    this.domCardsWrapper = e.querySelector("#about-capability-cards-wrapper");
    this.domCards = e.querySelector("#about-capability-cards");
    this.domCardsArray = Array.from(this.domContainer.querySelectorAll(".about-capability-card"));
    this.titleTime = 0;
    if (!browser$1.isMobile) {
      this.lineVisual = new Line(2);
      this.lineVisual.preInit();
      this.lineVisual2 = new Line(3);
      this.lineVisual2.preInit();
    }
  }
  init() {
    if (!browser$1.isMobile) {
      this.lineVisual.init();
      aboutPage.postUfxContainer.add(this.lineVisual.container);
      this.lineVisual2.init();
      aboutPage.postUfxContainer.add(this.lineVisual2.container);
    }
  }
  resize(e, t) {
    this._splitText();
    this.domCards.style.transform = "translateZ(0)";
    for (let u = 0, f = this.domCardsArray.length; u < f; u++) {
      this.domCardsArray[u].style = "translateZ(0)";
    }
    let r = this.domCardsArray[0].getBoundingClientRect();
    this.domCards.style.height = properties.viewportWidth < 812 ? "auto" : r.height + "px";
    for (let u = 0, f = this.domCardsArray.length; u < f; u++);
    if (!browser$1.isMobile) {
      this.lineVisual.resize(e, t);
      this.lineVisual2.resize(e, t);
    }
    let n = this.domCardsWrapper.getBoundingClientRect();
    let a = this.domCards.getBoundingClientRect();
    let l = this.domLine1.getBoundingClientRect();
    let c = this.domLine2.getBoundingClientRect();
    for (let u = 0, f = this.domCardsArray.length; u < f; u++) {
      let p = this.domCardsArray[u];
      p._width = r.width;
      p._height = r.height;
      p._offsetY = u % 2 === 0 ? 30 : -30;
    }
    this.domCardsWrapper._height = this.domCardsWrapper.offsetHeight - this.domCardsArray[0]._height;
    this.domCardsWrapper._width = n.width;
    this.domCardsWrapper._cardOffset = this.domCardsWrapper._width - this.domCardsArray[0]._width * NUMBER_OF_CARDS;
    this.domCards._screenRatio = a.height / properties.viewportHeight;
    this.domLine2._translateX = c.left - l.left;
    this.domTitle._height = this.domTitle.getBoundingClientRect().height;
    scrollManager.resize(properties.viewportWidth, properties.viewportHeight);
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    this.isSectionActive = t.isActive;
    if (!browser$1.isMobile) {
      this.lineVisual.update(e, t);
      this.lineVisual2.update(e, t);
    }
    let r = scrollManager.getDomRange(this.domTitle);
    this.domTitle.style.visibility = this.isSectionActive ? "visible" : "hidden";
    this.domCards.style.transform = "translateZ(0)";
    properties.screenPaintOffsetRatio *= math.fit(t.screenRatio, -0.5, 0, 1, 0) + math.fit(t.screenRatio, 0.8, 1, 0, 1);
    if (this.isSectionActive) {
      if (this._needsReset) {
        this._reset();
      }
      let n = math.fit(t.screenRatio, -0.6, 0.2, 0, 1);
      let a = math.fit(t.screenRatio, -0.5, 0.7, 0, 1);
      let l = math.fit(t.screenRatio, -0.5, 0.7, -Math.PI / 2, Math.PI - Math.PI / 2);
      this.time += e;
      if (properties.viewportWidth > 812) {
        let u = scrollManager.getDomRange(this.domCardsWrapper);
        let f = scrollManager.getEaseInOutOffset(scrollManager.scrollPixel - u.top + (properties.viewportHeight - u.height) * 0.5, properties.viewportHeight * 3, 5, 1);
        this.domCards.style.transform = `translate3d(0, ${f}px, 0)`;
        for (let p = 0, g = this.domCardsArray.length; p < g; p++) {
          let v = this.domCardsArray[p];
          let _ = this.domCardsWrapper._width / 2 - v._width / 2;
          let T = p / NUMBER_OF_CARDS * (this.domCardsWrapper._width + this.domCardsWrapper._cardOffset / (NUMBER_OF_CARDS - 1));
          let M = math.fit(n, 0.2, 1, _, T, ease.expoOut);
          let S = math.fit(a, 0, 0.7 - Math.abs(g - 1 - p) / 20, 180, 0, ease.backInOut);
          let b = math.fit(Math.abs(math.fit(n, 0, 0.75, 0, 1) * 2 - 1), 1, 0, 0, (p - 1.5) * 9, ease.expoInOut);
          let C = Math.cos(this.time * 3 + p) * Math.cos(l);
          v.style.transform = `translate3d(${M}px, ${C * 10}px, 0) rotateZ(${b}deg) rotate3d(0, 1,  0, ${S}deg)`;
        }
      } else {
        let u = scrollManager.getDomRange(this.domCards);
        let f = math.fit(u.showScreenOffset, 0, this.domCards._screenRatio, 0, 1);
        this.domCards.style.perspectiveOrigin = `center ${f * 100}%`;
        for (let p = 0, g = this.domCardsArray.length; p < g; p++) {
          let v = this.domCardsArray[p];
          let _ = scrollManager.getDomRange(v);
          let T = math.fit(_.screenRatio, -0.85 - p % 2 / 10, 0, 180, 0, ease.cubicInOut);
          v.style.transform = `rotateY(${T}deg)`;
        }
      }
      let c = r.screenRatio > -1;
      this.titleTime += e * (c ? 1 : 0);
      this.domTitle._splitted.words.forEach((u, f) => {
        if (properties.useMobileLayout) {
          u.style.transform = "translate3d(0px, 0, 0)";
        } else if (f < 2) {
          let p = math.fit(this.titleTime - f / 10, 0, 1, 100, 0, ease.lusion);
          u.style.transform = `translate3d(0, ${p}%, 0)`;
        } else {
          let p = math.fit(this.titleTime - f / 10, 1, 2, -this.domLine2._translateX, 0, ease.lusion);
          let g = math.fit(this.titleTime - f / 10, 0.1, 1.1, -100, 0, ease.lusion);
          u.style.transform = `translate3d(${p}px, ${g}%, 0)`;
        }
      });
      this.domSubheaderText._splitted.lines.forEach((u, f) => {
        let p = c ? math.saturate(this.titleTime - f / 10 - 0.25) : 0;
        let g = properties.viewportWidth >= settings.MOBILE_WIDTH ? Math.round(ease.expoOut(p) * 1000) / 1000 : 1;
        u.style.transform = `translate3d(0, ${math.fit(g, 0, 1, 110, 0)}%, 0)`;
      });
      for (let u = 0, f = this.domSubhheaderCards.length; u < f; u++) {
        let p = this.domSubhheaderCards[u];
        let g = c ? math.saturate(this.titleTime - u / 10 - 0.25) : 0;
        let v = properties.viewportWidth >= settings.MOBILE_WIDTH ? Math.round(ease.expoOut(g) * 1000) / 1000 : 1;
        p.style.transform = `translate3d(0, ${math.fit(v, 0, 1, 110, 0)}%, 0)`;
      }
    } else {
      this._needsReset = true;
    }
  }
  _splitText() {
    this.domTitle._splitted = new SplitType(this.domTitle, {
      types: "words, lines",
      charClass: "about-capability-title-char"
    });
    this.domTitle._splitted.lines.forEach(e => {
      const t = document.createElement("div");
      t.style.position = "relative";
      t.style.overflow = "hidden";
      t.append(e);
      this.domTitle.append(t);
    });
    this.domSubheaderText._splitted = new SplitType(this.domSubheaderText, {
      types: "lines"
    });
    this.domSubheaderText._splitted.lines.forEach(e => {
      const t = document.createElement("div");
      t.style.position = "relative";
      t.style.overflow = "hidden";
      t.append(e);
      this.domSubheaderText.append(t);
    });
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.titleTime = 0;
      this.domTitle._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      this.domSubheaderText._splitted.chars.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      for (let e = 0, t = this.domSubhheaderCards.length; e < t; e++) {
        let r = this.domSubhheaderCards[e];
        r.style.transform = "translate3d(0, 110%, 0)";
      }
    }
  }
}
const aboutCapabilitySection = new AboutCapabilitySection();
class AboutPageAudios {
  hasInit = false;
  bgFilterActive = false;
  bgTrackName = "cinematic_0";
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      this.hasInit ||= true;
    }
  }
  update(e) {
    if (!settings.USE_AUDIO) {
      return;
    }
    if (e) {
      audios.fadeBgMusic(this.bgTrackName, 1);
    } else {
      audios.fadeBgMusic("generic", 1);
    }
    audios.items[this.bgTrackName].setFilterFrequencyViaRatio(math.fit(aboutHero.freezeRatio, 0.25, 1, 0, 0.75));
  }
}
const aboutPageAudios = new AboutPageAudios();
let _c = new Color();
class AboutPage extends Page {
  path = "about";
  id = "about";
  endVisualColor = properties.offWhiteColorHex;
  preInit() {
    let e = this.domContainer;
    aboutWhoSection.preInit(e);
    aboutClientSection.preInit(e);
    aboutAwardSection.preInit(e);
    aboutCapabilitySection.preInit(e);
  }
  init() {
    aboutWhoSection.init();
    aboutClientSection.init();
    aboutAwardSection.init();
    aboutCapabilitySection.init();
    super.init();
  }
  resize(e, t) {
    aboutWhoSection.resize(e, t);
    aboutClientSection.resize(e, t);
    aboutAwardSection.resize(e, t);
    aboutCapabilitySection.resize(e, t);
  }
  show(e, t, r) {
    aboutWhoSection.show();
    aboutPageAudios.init();
    super.show(e, t, r);
  }
  update(e) {
    super.update(e);
    let t = false;
    let r = true;
    let n = false;
    if (pagesManager.scrollTargetPage == this) {
      properties.bgColor.setStyle(properties.blackColorHex);
      let a = scrollManager.getDomRange(aboutCapabilitySection.domContainer);
      properties.bgColor.lerp(_c.setStyle(properties.blueColorHex), math.fit(a.screenRatio, -1, -0.5, 0, 1));
      if (a.screenRatio > -0.75) {
        n = true;
        r = false;
      } else {
        n = false;
        r = true;
      }
      if (footerSection.getDomRange().ratio > -0.1) {
        t = true;
        r = false;
        n = false;
      }
      document.documentElement.classList.toggle("is-black-bg", r);
      document.documentElement.classList.toggle("is-white-bg", t);
      document.documentElement.classList.toggle("is-blue-bg", n);
    }
    aboutWhoSection.update(e);
    aboutClientSection.update(e);
    aboutAwardSection.update(e);
    aboutCapabilitySection.update(e);
    aboutPageAudios.update(r);
  }
}
const aboutPage = new AboutPage();
