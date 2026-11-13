let idx = 0;
class ProjectDetailsItem {
  constructor(e = "image") {
    this.idx = idx++;
    this.data = {};
    this.type = e;
    this.aspect = 1;
    this.imgVersion = 0;
    this.texture = null;
    this.isActive = false;
    this.textSpeed = 1;
    this.parallaxRatio = 1;
    this.activeTime = 0;
    this.domVideoButton = null;
    this.onClick = null;
    let t = this.domWrapper = document.createElement("div");
    t.classList.add("project-details-item");
    let r = this.uniforms = Object.assign({
      u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture,
      u_texture: {
        value: null
      },
      u_activeRatio: {
        value: 0
      },
      u_isFullscreen: {
        value: 0
      },
      u_isVertical: projectDetailsSection.sharedUniforms.u_isVertical,
      u_opacity: projectDetailsSection.sharedUniforms.u_opacity,
      u_bgColor: projectDetailsSection.sharedUniforms.u_bgColor,
      u_screenRTSize: projectDetailsSection.sharedUniforms.u_screenRTSize,
      u_highlightColor: projectDetailsSection.sharedUniforms.u_highlightColor,
      u_textureSize: {
        value: new Vector2(1, 1)
      },
      u_time: properties.sharedUniforms.u_time,
      u_dpr: properties.sharedUniforms.u_dpr,
      u_mouseXY: {
        value: input.mouseXY
      },
      u_parallax: {
        value: 0
      },
      u_parallaxRatio: {
        value: 1
      },
      u_borderRadius: {
        value: 0
      }
    }, blueNoise.sharedUniforms);
    t.classList.add("is-" + e);
    switch (e) {
      case "image":
      case "video":
        r.u_readyRatio = {
          value: 0
        };
        this.ufxMesh = new UfxMesh({
          refDom: t,
          uniforms: r,
          depthTest: false,
          depthWrite: false,
          vertexShader: vert$a,
          fragmentShader: frag$e,
          transparent: false
        });
        break;
      case "text":
        this.domText = document.createElement("div");
        this.domText.classList.add("project-details-item-text");
        this.domWrapper.appendChild(this.domText);
        r.u_textColor = projectDetailsSection.sharedUniforms.u_textColor;
        r.u_bgColor = projectDetailsSection.sharedUniforms.u_bgColor;
        r.u_textRatio = {
          value: 0
        };
        this.ufxMesh = new UfxTextMesh({
          refDom: this.domText,
          uniforms: r,
          depthTest: false,
          depthWrite: false,
          vertexShader: vert$a,
          fragmentShader: frag$e,
          transparent: false
        });
        this.ufxMesh.material.defines.IS_TEXT = true;
        break;
    }
    projectDetailsScreen.screenScene.add(this.ufxMesh);
  }
  activate(e) {
    this.data = e;
    this.parallaxRatio = this.uniforms.u_parallaxRatio.value = e.parallax || 1;
    this.isFullscreen = !!e.fullscreen;
    this.uniforms.u_isFullscreen.value = +this.isFullscreen;
    this.uniforms.u_activeRatio.value = 0;
    if (this.type == "image") {
      this._initImage();
    } else if (this.type == "video") {
      this._initVideo();
    } else if (this.type == "text") {
      this._initText();
    } else {
      console.error("unknown type");
    }
    this.isActive = true;
  }
  deactivate() {
    this.isActive = false;
    this.playPauseVideo(false);
  }
  _initVideo() {
    let e = this.data;
    let t = browser$1.isMobile ? e.filename.replace("/video", "/mobile_video") : e.filename;
    if (t.indexOf("/") == 0) {
      t = settings.CDN_PATH + t;
    }
    let r = t + ".mp4";
    let n = this.texture;
    if (n && n.__url == r) {
      return;
    }
    this.imgVersion++;
    if (n && n.__loaded) {
      n.dispose();
    }
    this.aspect = e.width / e.height;
    this.uniforms.u_texture.value = textureHelper.blackTexture;
    this.uniforms.u_textureSize.value.set(e.width, e.height);
    let a;
    const l = document.createElement("video");
    if (settings.LOCAL_TEXTURE_PATH !== settings.TEXTURE_PATH) {
      l.crossOrigin = "anonymous";
    }
    l.muted = true;
    l.playsinline = true;
    l.setAttribute("playsinline", "");
    l.src = r;
    l.loop = true;
    l.load();
    a = new VideoTexture(l);
    a.__version = this.version;
    a.__url = this.url;
    a.__loaded = true;
    this.texture = a;
    this.uniforms.u_texture.value = a;
  }
  _initImage() {
    let e = this.data;
    let t = browser$1.isMobile ? e.filename.replace("/image", "/mobile_image") : e.filename;
    if (t.indexOf("/") == 0) {
      t = settings.CDN_PATH + t;
    }
    let r = t + ".webp";
    let n = this.texture;
    if (n && n.__url == r) {
      return;
    }
    this.imgVersion++;
    if (n && n.__loaded) {
      n.dispose();
    }
    this.aspect = e.width / e.height;
    this.uniforms.u_texture.value = textureHelper.blackTexture;
    this.uniforms.u_textureSize.value.set(e.width, e.height);
    let a = new Texture(new Image());
    a.__version = this.version;
    a.__url = this.url;
    properties.loader.load(r, {
      type: "texture",
      content: a,
      minFilter: settings.USE_WEBGL2 ? LinearMipmapLinearFilter : LinearFilter,
      onLoad: l => {
        if (l.__version != this.imgVersion) {
          l.__loaded = true;
          this.texture = l;
          this.uniforms.u_texture.value = l;
        } else {
          l.dispose();
        }
      }
    });
  }
  _initText() {
    let e = this.data;
    this.domWrapper.style.fontSize = e.fontSize + "em";
    this.domText.innerHTML = e.content;
    this.uniforms.u_textRatio.value = 0;
    this.textSpeed = 50 / Math.max(30, e.content.length);
  }
  _onMouseEnter() {}
  _onMouseLeave() {}
  _onClick() {}
  resize(e, t, r) {
    let n;
    let a;
    if (r) {
      e += this.isFullscreen ? 2 : 0;
      n = e;
      a = e / this.aspect;
      if (this.type == "image" || this.type == "video") {
        a *= this.parallaxRatio;
      }
    } else {
      t += this.isFullscreen ? 2 : 0;
      n = t * this.aspect;
      a = t;
      if (this.type == "image" || this.type == "video") {
        n *= this.parallaxRatio;
      }
    }
    this.domWrapper.style.width = n + "px";
    if (this.type == "text" && r) {
      this.domWrapper.style.height = "auto";
    } else {
      this.domWrapper.style.height = a + "px";
    }
    if (this.type == "text") {
      this.ufxMesh.syncText();
    }
  }
  syncDom() {
    let e = properties.useMobileLayout;
    let t = e ? 0 : projectDetailsSection.scrollPane.scrollPixel;
    let r = e ? projectDetailsSection.scrollPane.scrollPixel : 0;
    this.ufxMesh.syncDom(-r, -t);
  }
  playPauseVideo(e) {
    if (this.type == "video") {
      let t = this.texture && this.texture.image && this.texture.image.pause ? this.texture.image : null;
      if (t) {
        if (!e && !t.paused) {
          t.pause();
        }
        if (e && t.paused) {
          t.play();
        }
      }
    }
  }
  update(e) {
    let t = properties.useMobileLayout;
    let r = t ? this.isFullscreen ? 1 : 0 : projectDetailsSection.scrollPane.scrollPixel;
    let n = t ? projectDetailsSection.scrollPane.scrollPixel : this.isFullscreen ? 1 : 0;
    let a = this.ufxMesh.testViewport(-n, -r);
    this.ufxMesh.update(-n, -r);
    if (a) {
      this.uniforms.u_borderRadius.value = this.isFullscreen && !properties.useMobileLayout ? 0 : properties.globalRadius;
      if (this.type == "image" || this.type == "video") {
        if (t) {
          let l = this.uniforms.u_domXY.value.y;
          this.uniforms.u_parallax.value = math.fit(l, -this.ufxMesh._domHeight, properties.viewportHeight, -0.5, 0.5);
        } else {
          let l = this.uniforms.u_domXY.value.x;
          this.uniforms.u_parallax.value = math.fit(l, -this.ufxMesh._domWidth, properties.viewportWidth, -0.5, 0.5);
        }
      }
      this.activeTime += e;
      this.uniforms.u_activeRatio.value = math.fit(this.activeTime, 0, 1, 0, 1, ease.expoOut);
      this.playPauseVideo(!!pagesManager.isIdle);
    } else {
      this.activeTime = 0;
      this.playPauseVideo(false);
    }
    if (this.type == "image" || this.type == "video") {
      let l = this.uniforms.u_texture.value;
      let c = l !== textureHelper.blackTexture && l.__loaded;
      this.uniforms.u_readyRatio.value = Math.min(1, this.uniforms.u_readyRatio.value + (c ? e : 0));
    }
    if (this.type == "text") {
      if (this.ufxMesh.testViewport(-n, -r)) {
        let l;
        if (t) {
          l = math.unClampedFit(this.uniforms.u_domXY.value.y, properties.viewportHeight, -this.uniforms.u_domWH.value.y, 0, 1);
        } else {
          l = math.unClampedFit(this.uniforms.u_domXY.value.x, properties.viewportWidth, -this.uniforms.u_domWH.value.x, 0, 1);
        }
        let c = l > 0.2 && l < 0.8;
        this.uniforms.u_textRatio.value = math.clamp(this.uniforms.u_textRatio.value + e * (c ? this.textSpeed : 0), 0, 1);
      } else {
        this.uniforms.u_textRatio.value = 0;
      }
    }
  }
}
class ProjectDetailsItems {
  moveContainer;
  itemPool = [];
  imageItemPool = [];
  videoItemPool = [];
  textItemPool = [];
  useItem(e) {
    let t = e.type;
    let r;
    switch (t) {
      case "image":
        r = this.imageItemPool;
        break;
      case "video":
        r = this.videoItemPool;
        break;
      case "text":
        r = this.textItemPool;
        break;
    }
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      if (!l.isActive) {
        return l;
      }
    }
    let n = new ProjectDetailsItem(t);
    r.push(n);
    this.itemPool.push(n);
    return n;
  }
  deactivateAll() {
    for (let e = 0; e < this.itemPool.length; e++) {
      let t = this.itemPool[e];
      if (t.isActive) {
        t.deactivate();
        t.domWrapper.remove();
      }
    }
  }
  pauseAllVideos() {
    for (let e = 0; e < this.itemPool.length; e++) {
      this.itemPool[e].playPauseVideo(false);
    }
  }
  resizeAll(e, t, r) {
    let n = properties.useMobileLayout;
    for (let a = 0; a < this.itemPool.length; a++) {
      let l = this.itemPool[a];
      if (l.isActive) {
        let c = l.isFullscreen && !properties.useMobileLayout;
        l.resize(e, c ? properties.viewportHeight : t, n);
        l.domWrapper.style.top = (c ? -r : 0) + "px";
      }
    }
  }
  syncDoms() {
    for (let e = 0; e < this.itemPool.length; e++) {
      let t = this.itemPool[e];
      if (t.isActive) {
        t.syncDom();
      }
    }
  }
  update(e, t, r) {
    for (let n = 0; n < this.itemPool.length; n++) {
      let a = this.itemPool[n];
      if (a.isActive) {
        a.update(e);
      }
      if (a.isActive && a.ufxMesh.testViewport(-r, -t)) {
        a.ufxMesh.visible = true;
      } else {
        a.ufxMesh.visible = false;
      }
    }
  }
}
const projectDetailsItems = new ProjectDetailsItems();