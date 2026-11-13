/**
 * ============================================================================
 * Lusion Modular Component: 10-home-reel-section
 * File: src/components/home/HomeReelSection.js
 * Description: HomeReelSection Component & DomHelper
 * Original Engine Lines: 33350 - 33864
 * ============================================================================
 */
class HomeReelSection {
  domContainer;
  domTitle;
  domTitleLine1;
  domDesc;
  domTopContainer;
  domBottomContainer;
  domTopPlayButton;
  domReelContainer;
  domVideoPlaceholder;
  videoPlaceholderHeight = 0;
  ufxMesh;
  ufxShowRatio = 0;
  ufxMeshRadialCenter = new Vector2(0.5, 0.5);
  isUfxMeshHover = false;
  ROLLUP_ANIMATION_INTERVAL = 2;
  currRollupTime = 0;
  prevRollupTime = 0;
  hoverRatio = 0;
  geometry = null;
  _needsReset = true;
  isVerticalVideo = false;
  showVideoPlaceholderButton = false;
  preInit(e) {
    this.domContainer = e.querySelector("#home-reel");
    this.domTitle = e.querySelector("#home-reel-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitleInner = e.querySelector("#home-reel-title-inner");
    this.domTitleLine1 = e.querySelector("#home-reel-title-line-1");
    this.domContent = e.querySelector("#home-reel-content");
    this.domDescription = e.querySelector("#home-reel-desc");
    this.domDescription._time = 0;
    this.domDescription._animating = false;
    this.domBtn = e.querySelector("#home-reel-cta");
    this.domBtn._ratio = 0;
    this.domBtn._animating = false;
    this.domThumb = e.querySelector("#home-reel-thumb");
    this.domReelContainer = e.querySelector("#home-reel-container");
    this.domReelContainerInner = e.querySelector("#home-reel-container-inner");
    this.domVideoContainer = e.querySelector("#home-reel-video-container");
    this.domVideoContainerDecorationTop = e.querySelector("#home-reel-video-container-top");
    this.domVideoContainerDecorationTop._crosses = Array.from(this.domVideoContainerDecorationTop.querySelectorAll(".home-reel-video-container-cross"));
    this.domVideoContainerDecorationTop._svgWrapper = this.domVideoContainerDecorationTop.querySelector(".home-reel-video-container-svg-wrapper");
    this.domVideoContainerDecorationTop._svgs = Array.from(this.domVideoContainerDecorationTop.querySelectorAll("svg"));
    this.domVideoContainerDecorationTop._animating = false;
    this.domVideoContainerDecorationTop._time = 0;
    this.domVideoContainerDecorationBottom = e.querySelector("#home-reel-video-container-bottom");
    this.domVideoContainerDecorationBottom._crosses = Array.from(this.domVideoContainerDecorationBottom.querySelectorAll(".home-reel-video-container-cross"));
    this.domVideoContainerDecorationBottom._svgWrapper = this.domVideoContainerDecorationBottom.querySelector(".home-reel-video-container-svg-wrapper");
    this.domVideoContainerDecorationBottom._svgs = Array.from(this.domVideoContainerDecorationBottom.querySelectorAll("svg"));
    this.domVideoContainerDecorationBottom._animating = false;
    this.domVideoContainerDecorationBottom._time = 0;
    this.domVideoPlaceholder = e.querySelector("#home-reel-video-placeholder");
    this.domVideoTitle = e.querySelector("#home-reel-video-title");
    this.domVideoTitle._animating = false;
    this.domVideoTitle._time = 0;
    this.domVideoTitle._showAnimating = false;
    this.domVideoTitle._showTime = 0;
    this.domVideoContainerDecoration = e.querySelector("#home-reel-video-container-decoration");
    this.domTopContainer = e.querySelector("#home-reel-decoration-top-container");
    this.domBottomContainer = e.querySelector("#home-reel-decoration-bottom-container");
    this.domVideoButton = e.querySelector("#home-reel-video-watch-btn");
    this.domVideoButton._active = false;
    this.domVideoButton._ratio = 0;
    this.domVideoButton._time = 0;
    this.domVideoButton._hover = false;
    this.domVideoButton._hoverRatio = 0;
    this.domVideoButton._hoverRatio2 = 0;
    this.domVideoButton._hoverRatio3 = 0;
    this.domVideoButton._hoverTime = 0;
    this.isVerticalVideo = properties.viewportWidth <= 560;
    this.video = document.createElement("video");
    this.video.muted = true;
    this.video.playsinline = true;
    this.video.setAttribute("playsinline", "");
    if (settings.LOCAL_TEXTURE_PATH !== settings.TEXTURE_PATH) {
      this.video.crossOrigin = "anonymous";
    }
    this.video.src = settings.TEXTURE_PATH + (this.isVerticalVideo ? "reel/mobile.mp4" : "reel/desktop.mp4");
    this.video.loop = true;
    this.video.load();
    this.videoTexture = new VideoTexture(this.video);
    this.ufxMeshThumb = new UfxMesh({
      refDom: this.domThumb
    });
    this.ufxMesh = new UfxMesh({
      refDom: this.domReelContainerInner,
      segX: 32,
      segY: 32,
      uniforms: Object.assign({
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
        u_resolution: properties.sharedUniforms.u_resolution,
        u_texture: {
          value: this.videoTexture
        },
        u_radialCenter: {
          value: this.ufxMeshRadialCenter
        },
        u_color: {
          value: new Color(1716219)
        },
        u_showRatio: {
          value: 0
        },
        u_aspectScale: {
          value: 1
        },
        u_time: properties.sharedUniforms.u_time,
        u_domXYFrom: this.ufxMeshThumb.material.uniforms.u_domXY,
        u_domWHFrom: this.ufxMeshThumb.material.uniforms.u_domWH,
        u_globalRadius: properties.sharedUniforms.u_globalRadius
      }, blueNoise.sharedUniforms),
      vertexShader: videoVert,
      fragmentShader: videoFrag,
      depthTest: false,
      depthWrite: false,
      side: 2
    });
    this.ufxMesh.renderOrder = 1000;
    homePage.preUfxContainer.add(this.ufxMesh);
    videoOverlay.preInit();
    this.lineVisual = new Line(0);
    this.lineVisual.preInit();
    this.domVideoPlaceholder.addEventListener("mouseenter", this._onVideoMeshMouseEnter.bind(this));
    this.domVideoPlaceholder.addEventListener("mouseleave", this._onVideoMeshMouseLeave.bind(this));
    this.domVideoButton.addEventListener("mouseenter", this._onDomVideoButtonMouseenter.bind(this));
    this.domVideoButton.addEventListener("mouseleave", this._onDomVideoButtonMouseleave.bind(this));
    input.onClicked.add(() => {
      if (input.hasThroughElem(this.domVideoButton, "click")) {
        this._onDomVideoButtonClick();
      }
    });
  }
  init() {
    this.lineVisual.init();
    this.lineVisual.mesh.material.transparent = true;
    this.lineVisual.circle.material.transparent = true;
    this.lineVisual.mesh.renderOrder = 200;
    this.lineVisual.circle.renderOrder = 200;
    videoOverlay.init();
    homePage.onHideStarted.add(this._onPageHideStarted.bind(this));
  }
  _onPageHideStarted() {
    if (!this.video.paused) {
      this.video.pause();
    }
    this.domDescription.style.transform = "translate3d(0, 0, 0)";
  }
  resize(e, t) {
    let r = e <= 560;
    this._splitText();
    let n = this.domVideoContainer.getBoundingClientRect().width;
    let a;
    let l = 0;
    let c = 1;
    if (r) {
      a = n / 3 * 4;
    } else {
      let u = document.getElementById("header-container").getBoundingClientRect().bottom;
      let f = properties.viewportHeight - u;
      let p = Math.abs(parseFloat(window.getComputedStyle(this.domVideoContainerDecoration).top) * 3) / 2;
      f -= p * 2;
      a = Math.min(f, n / 2);
      l = -properties.viewportHeight * 0.5 + f * 0.5 + u + p;
      c = a / (n / 1920 * 960);
    }
    this.domVideoContainer.style.height = a + "px";
    this.domVideoContainer.style.marginTop = l + "px";
    scrollManager.resize(properties.viewportWidth, properties.viewportHeight);
    this.ufxMeshThumb.syncDom(-scrollManager.scrollPixel);
    this.ufxMesh.syncDom(-scrollManager.scrollPixel);
    this.ufxMesh.material.uniforms.u_aspectScale.value = c;
    this.lineVisual.resize(e, t);
    this.domVideoButton._width = parseFloat(getComputedStyle(document.documentElement).fontSize) * 12;
    this.videoPlaceholderHeight = this.domVideoPlaceholder.getBoundingClientRect().height;
    this.domTitleLine1._paddingLeft = Number(getComputedStyle(this.domTitleLine1).paddingLeft.split("px")[0]);
    this.domVideoContainer.style.transform = "translateZ(0)";
    this.domVideoContainerDecorationTop._svgWrapper._width = this.domVideoContainerDecorationTop._svgWrapper.getBoundingClientRect().width;
    if (this.isVerticalVideo !== r) {
      this.isVerticalVideo = r;
      this.video.src = settings.TEXTURE_PATH + (this.isVerticalVideo ? "reel/mobile.mp4" : "reel/desktop.mp4");
    }
  }
  update(e) {
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    this.lineVisual.update(e, t);
    let n = properties.viewportWidth <= 812;
    let a = scrollManager.getDomRange(this.domReelContainer);
    let l = scrollManager.getDomRange(this.domReelContainerInner);
    let c = n ? 0 : scrollManager.getEaseInOutOffset(scrollManager.scrollPixel - a.top + (properties.viewportHeight - l.height) * 0.5, properties.viewportHeight, 1, 0);
    let u = scrollManager.getDomRange(this.domThumb);
    let f = n ? l.isActive : u.showScreenOffset > 0 && l.hideScreenOffset < 1;
    homePage.preUfxContainer.add(this.lineVisual.container);
    homePage.preUfxContainer.add(this.lineVisual.container);
    if (f) {
      this.domVideoContainer.classList.add("--is-visible");
    } else {
      this.domVideoContainer.classList.remove("--is-visible");
    }
    if (f) {
      let p = u.top - (properties.viewportHeight - u.height) * 0.5;
      let g = a.top - (properties.viewportHeight - a.height) * 0.5;
      let v = Math.max(0, u.showScreenOffset * properties.viewportHeight - properties.viewportHeight * 0.5 - u.height * 0.5);
      this.ufxMeshThumb.update(-scrollManager.scrollPixel + v);
      this.ufxMesh.update(-scrollManager.scrollPixel + c);
      this.ufxMesh.visible = true;
      this.ufxMesh.visible = r;
      this.hoverRatio = math.saturate(this.hoverRatio + e * 4 * (this.isUfxMeshHover ? 1 : -1));
      let _ = input.mousePixelXY.x;
      let T = input.mousePixelXY.y + scrollManager.scrollPixel;
      let M = this.ufxMesh._domX;
      let S = this.ufxMesh._domY - this.ufxMesh._capturedOffsetY;
      let b = this.ufxMesh._domWidth;
      let C = this.ufxMesh._domHeight;
      this.ufxMeshRadialCenter.set((_ - M) / b, 1 - (T - S) / C);
      let w = math.fit(scrollManager.scrollPixel, p, g, 0, 1);
      this.videoPlaceholderRatio = w;
      this.showVideoPlaceholderButton = w > 0.9;
      this.ufxMesh.material.uniforms.u_showRatio.value = n ? 1 : w;
      if (w === 1) {
        this.domVideoTitle._animating = true;
        this.domVideoTitle._showAnimating = true;
      } else {
        this.domVideoTitle._showAnimating = false;
        this.domVideoTitle._animating = false;
      }
      this.domVideoContainer.style.transform = `translate3d(0,${c}px,0)`;
      if (!properties.useMobileLayout && w % 1 > 0) {
        properties.autoScrollSpeed = input.lastScrollYDirection;
      }
      if (this.video.paused) {
        this.video.play();
      }
    } else {
      this.ufxMesh.visible = false;
      if (!this.video.paused) {
        this.video.pause();
      }
    }
    if (t.screenRatio === -1) {
      this._reset();
    }
    if (r) {
      this._updateUI(e, a, t);
    } else {
      this._needsReset = true;
    }
  }
  _updateUI(e, t, r) {
    let n = scrollManager.getDomRange(this.domTitle);
    let a = scrollManager.getDomRange(this.domContent);
    this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
    this.domDescription._time = math.clamp(this.domDescription._time + (this.domDescription._animating ? e : -e), 0, 2);
    this.domBtn._ratio = math.saturate(this.domBtn._ratio + (this.domBtn._animating ? e : -e));
    if (this.videoPlaceholderRatio !== 1) {
      this.domVideoButton._hover = false;
    }
    this.domVideoButton._ratio = math.fit(this.videoPlaceholderRatio, 0.3, 1, 0, 1);
    this.domVideoButton._active = this.domVideoButton._ratio === 1;
    this.domVideoButton._time = math.clamp(this.domVideoButton._time + (t.screenRatio > -1 ? e : -e), 0, Infinity);
    this.domVideoButton._hoverRatio = math.saturate(this.domVideoButton._hoverRatio + (this.domVideoButton._hover ? e : -e));
    this.domVideoButton._hoverRatio2 = math.saturate(this.domVideoButton._hoverRatio2 + (this.domVideoButton._hover ? e * 1.5 : -e * 1.5));
    this.domVideoButton._hoverRatio3 = math.saturate(this.domVideoButton._hoverRatio3 + (this.domVideoButton._hover ? e * 3 : -e * 3));
    this.domVideoButton._hoverTime = math.clamp(this.domVideoButton._hoverTime + (this.domVideoButton._hover ? e * 2 : -e * 0), 0, Infinity);
    this.domVideoContainerDecorationTop._time = math.clamp(this.domVideoContainerDecorationTop._time + (this.domVideoContainerDecorationTop._animating ? e : -e * 2), 0, 1.4);
    this.domVideoContainerDecorationBottom._time = math.clamp(this.domVideoContainerDecorationBottom._time + (this.domVideoContainerDecorationBottom._animating ? e : -e * 2), 0, 1.4);
    if (!properties.useMobileLayout) {
      this.domVideoButton.style.opacity = ease.expoInOut(this.domVideoButton._ratio);
      this.domVideoButton.style.transform = `scale(${ease.expoInOut(this.domVideoButton._ratio) + ease.expoInOut(this.domVideoButton._hoverRatio3) * 0.1})`;
      this.domVideoButton.style.display = this.domVideoButton._ratio > 0 ? "flex" : "none";
      if (this.domVideoButton._ratio === 1) {
        this.domVideoContainerDecorationTop._animating = true;
        this.domVideoContainerDecorationBottom._animating = true;
      } else {
        this.domVideoContainerDecorationTop._animating = false;
        this.domVideoContainerDecorationBottom._animating = false;
      }
      for (let f = 0; f < this.domVideoContainerDecorationTop._crosses.length; f++) {
        let p = this.domVideoContainerDecorationTop._crosses[f];
        let g = math.fit(this.domVideoContainerDecorationTop._time - f / 10, 0, 0.6, 0, 1, ease.lusion);
        let v = math.fit(this.domVideoContainerDecorationTop._time - f / 10, 0, 0.6, 0, 180, ease.lusion);
        let _ = math.fit(this.domVideoButton._hoverRatio2 - f / 10, 0, 0.7, 0, 1, ease.expoInOut);
        p.style.transform = `translate3d(0, ${_}em, 0) scale(${g}) rotate(${v}deg)`;
      }
      for (let f = 0; f < this.domVideoContainerDecorationBottom._crosses.length; f++) {
        let p = this.domVideoContainerDecorationBottom._crosses[f];
        let g = math.fit(this.domVideoContainerDecorationBottom._time - f / 10, 0, 0.6, 0, 1, ease.lusion);
        let v = math.fit(this.domVideoContainerDecorationBottom._time - f / 10, 0, 0.6, 0, 180, ease.lusion);
        let _ = math.fit(this.domVideoButton._hoverRatio2 - f / 10, 0, 0.7, 0, 1, ease.expoInOut);
        p.style.transform = `translate3d(0, ${_}em, 0) scale(${g}) rotate(${v}deg)`;
      }
    }
    for (let f = 0; f < this.domVideoContainerDecorationTop._svgs.length; f++) {
      let p = this.domVideoContainerDecorationTop._svgs[f];
      let g = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domVideoButton._hoverRatio2 - f / 25, 0.2, 1, 1.2, 0, ease.expoInOut) : 0;
      p.style.transform = `translate3d(0, ${g}em, 0)`;
    }
    for (let f = 0; f < this.domVideoContainerDecorationBottom._svgs.length; f++) {
      let p = this.domVideoContainerDecorationBottom._svgs[f];
      let g = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domVideoButton._hoverRatio2 - f / 25, 0.2, 1, 1.2, 0, ease.expoInOut) : 0;
      p.style.transform = `translate3d(0, ${g}em, 0)`;
    }
    let l = properties.viewportWidth < settings.MOBILE_WIDTH ? this.domVideoButton._time : this.domVideoButton._hoverTime;
    let c = math.fit(l % 15, 0, 15, 0, -this.domVideoContainerDecorationTop._svgWrapper._width / 2);
    this.domVideoContainerDecorationTop._svgWrapper.style.transform = `translate3d(${c}px, 0, 0)`;
    c = math.fit(l % 15, 0, 15, -this.domVideoContainerDecorationTop._svgWrapper._width / 2, 0);
    this.domVideoContainerDecorationBottom._svgWrapper.style.transform = `translate3d(${c}px, 0, 0)`;
    let u = properties.viewportHeight * 0.1;
    this.domTitleInner.style.transform = "translateZ(0)";
    if (n.screenRatio > -1) {
      this.domTitle._animating = true;
      if (!properties.useMobileLayout) {
        this.domVideoTitle._time = math.clamp(this.domVideoTitle._time + (this.domVideoTitle._animating ? e : -e), 0, Infinity);
        this.domVideoTitle._showTime = Math.min(this.domVideoButton._ratio, math.saturate(this.domVideoTitle._showTime + (this.domVideoTitle._showAnimating ? e : -e)));
        this.domVideoTitle._hoverTime = math.saturate(this.domVideoTitle._hoverTime + (this.domVideoTitle._hover && this.domVideoTitle._time > 1 ? e * 1.5 : -e * 1.5));
        this.currRollupTime = this.domVideoTitle._time % this.ROLLUP_ANIMATION_INTERVAL;
        for (let p = 0; p < this.domVideoTitle._splitted.words.length; p++) {
          let g = this.domVideoTitle._splitted.words[p];
          if (this.prevRollupTime - this.currRollupTime > this.ROLLUP_ANIMATION_INTERVAL - 1) {
            g._randCharIndex = Math.round(Math.random() * (g._chars.length - 1));
          }
          for (let v = 0; v < g._chars.length; v++) {
            let _ = g._chars[v];
            let T = math.fit(this.domVideoTitle._showTime - p / 4 - v / 20, 0, 0.6, 200, 0, ease.lusion);
            if (v === g._randCharIndex) {
              T += math.fit(this.currRollupTime - p / 10, 0.5, 1.3, 0, -100, ease.lusion);
            }
            _._wrapper.style.transform = `translate3d(0, ${T}%, 0)`;
          }
        }
        for (let p = 0, g = this.domTitle._splitted.words.length; p < g; p++) {
          let v = this.domTitle._splitted.words[p];
          let _;
          let T;
          if (p < 2) {
            _ = math.fit(this.domTitle._time - Math.abs(2 - p) / 10, 0.5, 1.2, -this.domTitleLine1._paddingLeft, 0, ease.lusion);
            T = math.fit(this.domTitle._time - p / 10, 0, 1, 100, 0, ease.lusion);
          } else {
            _ = 0;
            T = math.fit(this.domTitle._time - p / 10, 0, 1, -100, 0, ease.lusion);
          }
          v.style.transform = `translate3d(${_}px, ${T}%, 0)`;
        }
      }
      let f = n.showScreenOffset * -u * 0.5;
      this.domTitleInner.style.transform = "translate3d(0," + f + "px,0)";
      this.prevRollupTime = this.currRollupTime;
    }
    if (a.screenRatio > -1) {
      let f = a.showScreenOffset * -u * 1.5;
      this.domDescription.style.transform = "translate3d(0," + f + "px,0)";
      this.domDescription._animating = true;
      if (!properties.useMobileLayout) {
        this.domDescription._splitted.words.forEach((g, v) => {
          let _ = math.fit(this.domDescription._time - v / 100, 0, 1, 0.1, 1, ease.expoOut);
          let T = math.fit(this.domDescription._time - v / 100, 0, 1, 100, 0, ease.expoOut);
          g.style.opacity = _;
          g.style.transform = `translate3d(0, ${T}%, 0)`;
        });
      }
      this.domBtn._animating = true;
      let p = a.showScreenOffset * -u * 1.25;
      if (properties.viewportWidth >= 812) {
        this.domBtn.style.transform = `translateY(${p}px)translate3d(0, ${math.fit(this.domBtn._ratio, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domBtn._ratio, 0, 1, 10, 0, ease.lusion)}deg)`;
        this.domBtn.style.opacity = ease.lusion(this.domBtn._ratio);
      } else {
        this.domBtn.style.transform = `translateY(${p}px)`;
      }
    }
  }
  _onDomVideoButtonClick() {
    videoOverlay.initAndPlayVideo(VIDEO_LIST.MAIN_VIDEO_REEL);
  }
  _onDomVideoButtonMouseenter() {
    this.domVideoButton._hover = true;
    this.domVideoContainerDecorationBottom.classList.add("--is-active");
    this.domVideoContainerDecorationTop.classList.add("--is-active");
  }
  _onDomVideoButtonMouseleave() {
    this.domVideoButton._hover = false;
    this.domVideoContainerDecorationBottom.classList.remove("--is-active");
    this.domVideoContainerDecorationTop.classList.remove("--is-active");
  }
  _onVideoMeshMouseEnter() {
    this.isUfxMeshHover = true;
  }
  _onVideoMeshMouseLeave() {
    this.isUfxMeshHover = false;
  }
  _splitText() {
    if (properties.viewportWidth >= 812) {
      this.domDescription._splitted = new SplitType(this.domDescription, {
        types: "words"
      });
      this.domTitle._splitted = new SplitType(this.domTitleInner, {
        types: "words"
      });
      this.domTitleLine1 = document.getElementById("home-reel-title-line-1");
      this.domVideoTitle._splitted = new SplitType(this.domVideoTitle, {
        types: "words",
        wordClass: "home-reel-video-title-word"
      });
      for (let e = 0; e < this.domVideoTitle._splitted.words.length; e++) {
        let t = this.domVideoTitle._splitted.words[e];
        let r = new SplitType(t, {
          types: "chars"
        });
        t._chars = r.chars;
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
  }
  _reset() {
    if (this.domDescription._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domDescription._time = 0;
      this.domDescription._animating = false;
      this.domVideoButton._active = false;
      this.domVideoButton._ratio = 0;
      this.domVideoButton._hover = false;
      this.domVideoButton._hoverTime = 0;
      this.domVideoButton._hoverRatio = 0;
      this.domVideoButton._hoverRatio2 = 0;
      this.domVideoButton._hoverRatio3 = 0;
      this.domBtn._animating = false;
      this.domBtn._ratio = 0;
      this.domVideoContainerDecorationTop._animating = false;
      this.domVideoContainerDecorationTop._time = 0;
      if (properties.useMobileLayout) {
        if (this.domDescription._splitted) {
          this.domDescription._splitted.revert();
        }
        if (this.domTitle._splitted) {
          this.domTitle._splitted.revert();
        }
      } else {
        this.domDescription._splitted.words.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
          e.style.opacity = 0;
        });
        this.domTitle._splitted.words.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        for (let e = 0; e < this.domVideoTitle._splitted.words.length; e++) {
          let t = this.domVideoTitle._splitted.words[e];
          for (let r = 0; r < t._chars.length; r++) {
            let n = t._chars[r];
            n._wrapper.style.transform = "translate3d(0, 0, 0)";
            n.style.transform = "translate3d(0, 0, 0)";
          }
        }
      }
      this.domVideoTitle._animating = false;
      this.domVideoTitle._time = 0;
      this.domVideoTitle._showAnimating = false;
      this.domVideoTitle._showTime = 0;
    }
  }
}
const homeReelSection = new HomeReelSection();
let wrapper = document.createElement("div");
class DomHelper {
  clone(e) {
    wrapper.innerHTML = e.outerHTML;
    let t = wrapper.firstChild;
    wrapper.removeChild(t);
    return t;
  }
  _collapseWhiteSpace(e) {
    return e.trim().replace(/\s+/g, " ");
  }
  getLinesFromText(e) {
    let t = e.childNodes;
    let r = [];
    for (let n = 0, a = t.length; n < a; n++) {
      let l = t[n];
      if (l.nodeType == 3) {
        r.push.apply(r, this.getLinesFromTextNode(l));
      }
    }
    return r;
  }
  getLinesFromTextNode(e) {
    if (e.nodeType !== 3) {
      throw new Error("Lines can only be extracted from text nodes.");
    }
    e.textContent = this._collapseWhiteSpace(e.textContent);
    for (var t = e.textContent, r = document.createRange(), n = [], a = [], l = 0; l < t.length; l++) {
      r.setStart(e, 0);
      r.setEnd(e, l + 1);
      var c = r.getClientRects().length - 1;
      if (!n[c]) {
        n.push(a = []);
      }
      a.push(t.charAt(l));
    }
    n = n.map(u => this._collapseWhiteSpace(u.join("")));
    return n;
  }
}
const domHelper = new DomHelper();
