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