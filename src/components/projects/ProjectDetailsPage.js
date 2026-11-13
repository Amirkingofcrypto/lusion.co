/**
 * ============================================================================
 * Lusion Modular Component: 18-project-details-page
 * File: src/components/projects/ProjectDetailsPage.js
 * Description: ProjectDetailsData, UfxTextMesh, ProjectDetailsItem, ProjectDetailsItems, ProjectDetailsSection & ProjectPage
 * Original Engine Lines: 39337 - 40334
 * ============================================================================
 */
class ProjectDetailsData {
  id = "";
  title = "";
  desc = "";
  ctaTitle = "";
  ctaUrl = "";
  colorBg = "#000";
  colorBtnBg = "#000";
  colorBtnBgHover = "#000";
  colorBtnText = "#000";
  colorBtnTextHover = "#000";
  colorHighlight = "#000";
  colorIconBg = "#000";
  colorIconColor = "#000";
  colorText = "#000";
  shadow = 0;
  nextColorBg = "#000";
  nextColorText = "#000";
  nextId = "";
  nextTitle = "";
  nextShadow = 0;
  domServiceSideListItems;
  domLinkSideListItems;
  itemDataList = [];
  constructor(e, t) {
    this.id = e;
    this.title = t.querySelector("#project-details-title").innerHTML;
    this.desc = t.querySelector("#project-details-desc").innerHTML;
    this.ctaTitle = t.querySelector("#project-details-launch-cta-text").textContent;
    this.ctaUrl = t.querySelector("#project-details-launch-cta").href;
    let r = {
      ...t.querySelector("#project-details").dataset
    };
    this.colorBg = r.colorBg;
    this.colorBtnBg = r.colorBtnBg;
    this.colorBtnBgHover = r.colorBtnBgHover;
    this.colorBtnText = r.colorBtnText;
    this.colorBtnTextHover = r.colorBtnTextHover;
    this.colorHighlight = r.colorHighlight;
    this.colorIconBg = r.colorIconBg;
    this.colorIconColor = r.colorIconColor;
    this.colorText = r.colorText;
    this.shadow = parseFloat(r.shadow);
    (this.domServiceSideListItems = Array.from(t.querySelectorAll("#project-details-side-list-services > *"))).forEach(l => {
      l.remove();
    });
    (this.domLinkSideListItems = Array.from(t.querySelectorAll("#project-details-side-list-links > *"))).forEach(l => {
      l.remove();
    });
    let n = Array.from(t.querySelectorAll(".project-details-item"));
    for (let l = 0; l < n.length; l++) {
      let c = n[l];
      let u = {
        ...c.dataset
      };
      if (c.classList.contains("is-text")) {
        u.content = c.querySelector(".project-details-item-text").textContent;
      } else {
        u.width = parseFloat(u.width);
        u.height = parseFloat(u.height);
        u.parallax = parseFloat(u.parallax || 1);
        u.fullscreen = u.fullscreen !== undefined;
      }
      this.itemDataList.push(u);
      c.remove();
    }
    let a = {
      ...t.querySelector("#project-details-preview").dataset
    };
    this.nextColorBg = a.nextColorBg;
    this.nextColorText = a.nextColorText;
    this.nextId = a.nextId;
    this.nextShadow = parseFloat(a.nextShadow);
    this.nextTitle = t.querySelector("#project-details-preview-title").textContent;
  }
}
class UfxTextMesh extends UfxMesh {
  constructor(e = {}) {
    super(e);
    if (!this.refDom) {
      console.error("UfxTextMesh: refDom is not defined");
    }
    this.material.uniforms.u_texture = {
      value: textureHelper.transparentTexture
    };
    this.canvas = document.createElement("canvas");
  }
  syncText() {
    let e = domHelper.getLinesFromText(this.refDom);
    let t = this.refDom.getBoundingClientRect();
    let r = this.canvas;
    let n = r.getContext("2d");
    let a = getComputedStyle(this.refDom);
    let l = parseFloat(a.getPropertyValue("padding-left"));
    let c = Math.floor(parseFloat(a.getPropertyValue("font-size")));
    let u = a.getPropertyValue("font-style");
    let f = a.getPropertyValue("font-weight");
    let p = a.getPropertyValue("font-family");
    let g = Math.ceil(t.width);
    let v = Math.ceil(t.height);
    r.width = Math.ceil(g * properties.webglDPR);
    r.height = Math.ceil(v * properties.webglDPR);
    let _ = parseFloat(a.getPropertyValue("line-height"));
    n.save();
    n.scale(properties.webglDPR, properties.webglDPR);
    n.fillStyle = "#000";
    n.fillRect(0, 0, g, v);
    n.font = u + " " + f + " " + c + "px " + p;
    let T = 0;
    let M = [];
    for (let C = 0; C < e.length; C++) {
      let w = Math.ceil(n.measureText(e[C]).width + 1);
      M.push(w);
      T += w;
    }
    let S = 0;
    let b;
    b = _ * 0.15;
    for (let C = 0; C < e.length; C++) {
      let w = l;
      let R = C * _ + b;
      let E = M[C];
      let I = n.createLinearGradient(w, 0, w + E, 0);
      I.addColorStop(0, "rgb(" + Math.round(S / T * 255) + ", 0, 0)");
      S += E;
      I.addColorStop(1, "rgb(" + Math.round(S / T * 255) + ", 0, 0)");
      n.fillStyle = I;
      n.fillRect(w, R, E, _);
    }
    n.globalCompositeOperation = "lighter";
    n.fillStyle = "#0f0";
    b = _ * 0.8;
    for (let C = 0; C < e.length; C++) {
      let w = l;
      let R = C * _ + b;
      n.fillText(e[C], w, R);
    }
    n.restore();
    if (this.texture) {
      this.texture.dispose();
    }
    this.texture = new Texture(this.canvas);
    this.texture.minFilter = LinearFilter;
    this.texture.magFilter = LinearFilter;
    this.material.uniforms.u_texture.value = this.texture;
    this.texture.needsUpdate = true;
  }
}
const vert$a = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const frag$e = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform float u_opacity;uniform float u_parallax;uniform float u_time;uniform float u_dpr;uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec2 u_screenRTSize;uniform float u_activeRatio;uniform vec3 u_highlightColor;uniform vec3 u_bgColor;uniform vec2 u_mouseXY;uniform float u_borderRadius;uniform float u_parallaxRatio;uniform float u_isFullscreen;uniform int u_isVertical;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#ifdef IS_TEXT
uniform vec3 u_textColor;uniform float u_textRatio;
#else
uniform float u_readyRatio;float sdRoundedBox(in vec2 p,in vec2 b,in vec4 r){r.xy=(p.x>0.0)?r.xy : r.zw;r.x=(p.y>0.0)?r.x  : r.y;vec2 q=abs(p)-b+r.x;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;}float getRoundedCornerMask(vec2 uv,vec4 radius){float d=sdRoundedBox((uv-.5)*u_domWH,u_domWH*0.5*mix(0.6,1.,max(u_isFullscreen,u_activeRatio)),radius.yzwx);return smoothstep(0.,0.-fwidth(d),d);}
#endif
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(43.,12.));
#ifdef IS_TEXT
vec4 image=texture2D(u_texture,v_uv);vec3 color=u_textColor;float mask=smoothstep(u_textRatio,u_textRatio-.5/255.,image.r*255./256.);float imageAlpha=image.g;color=mix(u_bgColor,color,(0.2+mask*0.8));
#else
vec2 uv=v_uv;uv-=0.5;uv*=mix(0.6,1.,u_activeRatio);if(u_isVertical==1){uv.y*=u_parallaxRatio;uv.y+=u_parallax*(1.-u_parallaxRatio);}else{uv.x*=u_parallaxRatio;uv.x+=u_parallax*(1.-u_parallaxRatio);}uv+=0.5;vec3 color=texture2D(u_texture,uv).rgb;float imageAlpha=getRoundedCornerMask(v_uv,vec4(u_borderRadius));color=mix(u_highlightColor,color,u_readyRatio);
#endif
imageAlpha*=u_opacity;gl_FragColor=vec4(color,imageAlpha);}`;
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
let _c1 = new Color();
let _c2 = new Color();
class ProjectDetailsSection {
  projectDetailsDatas = {};
  projectDetailsData;
  domContainer;
  domHeaderInfo;
  domHeaderBackBtn;
  domTitle;
  domDesc;
  domCta;
  domSideListService;
  domSideListLinks;
  domDetailsItemsWrapper;
  domDetailsItemsMoveContainer;
  domPreview;
  domPreviewInner;
  domPreviewHeader;
  domPreviewTitle;
  domPreviewFooterBarInner;
  selectedId = "";
  contentShowRatio = 0;
  nextProjectRatio = 0;
  overScrollRatio = 0;
  overScrollSize = 0;
  previewInnerOffsetFrom = 0;
  previewInnerOffsetTo = 0;
  titleCenterOffsetY = 0;
  previewTitleColorDefaultColorHex = "#c2c3c7";
  previewTitleColorHex = "#000";
  previewShadow = 0;
  scrollPane;
  isVertical = null;
  VERTICAL_BREAK_PIONT = 1000;
  itemPool = [];
  imageItemPool = [];
  videoItemPool = [];
  textItemPool = [];
  projectDatas = {};
  sharedUniforms = {
    u_opacity: {
      value: 0
    },
    u_isVertical: {
      value: 0
    },
    u_scrollX: {
      value: 0
    },
    u_highlightColor: {
      value: new Color()
    },
    u_bgColor: {
      value: new Color()
    },
    u_textColor: {
      value: new Color()
    }
  };
  domHeaderBackBtnHoverAnimation = {
    animating: false,
    ratio: 0
  };
  preInit(e) {
    this.domContainer = e.querySelector("#project-details");
    this.domContainer.style.backgroundColor = "";
    this.domHeaderInfo = e.querySelector("#project-details-header-info");
    this.domHeaderInfo._ratio = 0;
    this.domHeaderInfo._hide = false;
    this.domHeaderBackBtn = document.querySelector("#header-center-project-back-btn");
    this.domHeaderInfoSvg = document.querySelector("#project-details-header-info-svg");
    this.domMeta = e.querySelector("#project-details-meta");
    this.domTitle = e.querySelector("#project-details-title");
    this.domDesc = e.querySelector("#project-details-desc");
    this.domCta = e.querySelector("#project-details-launch-cta");
    this.domCtaText = e.querySelector("#project-details-launch-cta-text");
    this.domCtaMobile = e.querySelector("#project-details-launch-cta-mobile");
    this.domCtaMobileText = e.querySelector("#project-details-launch-cta-mobile-text");
    this.domSideListService = e.querySelector("#project-details-side-list-services");
    this.domSideListLinks = e.querySelector("#project-details-side-list-links");
    this.domDetailsItemsWrapper = e.querySelector("#project-details-items-wrapper");
    this.domDetailsItemsMoveContainer = e.querySelector("#project-details-items-move-container");
    this.domPreview = e.querySelector("#project-details-preview");
    this.domPreviewInner = e.querySelector("#project-details-preview-inner");
    this.domPreviewTitle = e.querySelector("#project-details-preview-title");
    this.domPreviewFooter = e.querySelector("#project-details-preview-footer");
    this.domPreviewFooterBarInner = e.querySelector("#project-details-preview-footer-bar-inner");
    this.scrollPane = new ScrollPane();
    this.scrollPane.contentDom = this.domDetailsItemsMoveContainer;
    this.scrollPane.init();
    projectDetailsScreen.preInit(this.domContainer);
  }
  preInitContent(e) {
    let t = e.pathNodes[1];
    this.projectDetailsDatas[t] = new ProjectDetailsData(t, e.dom);
  }
  _onModelLoad(e) {}
  init() {
    projectDetailsScreen.init();
    projectPage.onHideCompleted.add(() => {
      projectDetailsItems.pauseAllVideos();
    });
  }
  show(e) {
    this._disposeLayout();
    this._initLayout(e);
    this.overScrollRatio = 0;
    this.scrollPane.isActive = true;
    this.scrollPane.scrollToPixel(0, true);
    this.scrollPane.update(0);
    this.scrollPane.isActive = false;
    this.updatePreviewUI(e, true);
    this.resize(properties.viewportWidth, properties.viewportHeight);
    this.update(0, true);
  }
  updatePreviewUI(e, t = true) {
    let r = this.projectDetailsDatas[e];
    if (t) {
      this.domPreviewTitle.innerHTML = r.nextTitle;
      projectDetailsScreen.previewBgColorHex = r.nextColorBg;
      this.previewTitleColorHex = r.nextColorText;
      this.previewShadow = r.nextShadow;
    } else {
      this.domPreviewTitle.innerHTML = r.title;
      projectDetailsScreen.previewBgColorHex = r.colorBg;
      this.previewTitleColorHex = r.colorText;
      this.previewShadow = r.shadow;
    }
  }
  _disposeLayout() {
    let e = this.projectDetailsData;
    projectDetailsItems.deactivateAll();
    if (!e) {
      window.addEventListener("wheel", this._onWindowWheel.bind(this), {
        once: true
      });
    }
    if (e) {
      e.domServiceSideListItems.forEach(t => {
        t.remove();
      });
      e.domLinkSideListItems.forEach(t => {
        t.remove();
      });
    }
  }
  _initLayout(e) {
    let t = this.projectDetailsData = this.projectDetailsDatas[e];
    routeManager.preFetch("/projects/" + t.nextId);
    this.domTitle.innerHTML = t.title;
    this.domDesc.innerHTML = t.desc;
    this.domCtaText.textContent = t.ctaTitle;
    this.domCtaMobileText.textContent = t.ctaTitle;
    if (routeManager.parseUrl(t.ctaUrl)) {
      this.domCta.href = t.ctaUrl;
      this.domCtaMobile.href = t.ctaUrl;
      this.domContainer.classList.add("has-cta");
    } else {
      this.domContainer.classList.remove("has-cta");
    }
    this.domSideListService.style.visibility = t.domServiceSideListItems.length > 1 ? "visible" : "hidden";
    this.domSideListLinks.style.visibility = t.domLinkSideListItems.length > 1 ? "visible" : "hidden";
    t.domServiceSideListItems.forEach(r => {
      this.domSideListService.appendChild(r);
    });
    t.domLinkSideListItems.forEach(r => {
      this.domSideListLinks.appendChild(r);
    });
    this.sharedUniforms.u_highlightColor.value.setStyle(t.colorHighlight);
    this.sharedUniforms.u_textColor.value.setStyle(t.colorText);
    this.sharedUniforms.u_bgColor.value.setStyle(t.colorBg);
    this.domHeaderBackBtn.addEventListener("click", this._onBackBtnClick.bind(this));
    for (let r in t) {
      r.replace(/^color(.+)/g, (n, a) => {
        a = a.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, (l, c, u) => c + "-" + u).toLowerCase();
        properties.domRoot.style.setProperty("--project-details-" + a, t[r]);
      });
    }
    properties.domRoot.style.setProperty("--header-color", t.colorHighlight);
    properties.domRoot.style.setProperty("--header-text-color", t.colorBtnText);
    header.domContainer.style.color = t.colorHighlight;
    t.itemDataList.forEach(r => {
      let n = projectDetailsItems.useItem(r);
      n.activate(r);
      this.domDetailsItemsMoveContainer.appendChild(n.domWrapper);
    });
  }
  _onBackBtnClick() {
    if (this.scrollPane.isActive && pagesManager.isIdle) {
      routeManager.setPath(projectPage.prevNonProjectPath || "/");
    }
  }
  _splitText() {}
  hide(e, t, r) {
    r();
    this.scrollPane.isActive = false;
  }
  resize(e, t) {
    this._splitText();
    let r = properties.useMobileLayout;
    this.sharedUniforms.u_isVertical.value = r ? 1 : 0;
    if (r) {
      this.domMeta.style.transform = "translateZ(0)";
    } else {
      this.domMeta.style.transform = "translate3d(0,-50%,0)";
    }
    let n = this.domMeta.getBoundingClientRect();
    this.domDetailsItemsMoveContainer.style.paddingTop = (r ? n.bottom : 0) + "px";
    if (r) {
      this.overScrollSize = this.domPreviewInner.getBoundingClientRect().height;
      this.domDetailsItemsMoveContainer.style.paddingRight = 0;
      this.domDetailsItemsMoveContainer.style.paddingBottom = this.overScrollSize + this.domDetailsItemsWrapper.getBoundingClientRect().top + "px";
    } else {
      this.overScrollSize = properties.viewportWidth * 0.25;
      this.domDetailsItemsMoveContainer.style.paddingRight = this.overScrollSize + "px";
      this.domDetailsItemsMoveContainer.style.paddingBottom = 0;
    }
    let a = this.domDetailsItemsMoveContainer.getBoundingClientRect();
    projectDetailsItems.resizeAll(a.width, a.height, a.top);
    let l = this.domTitle.getBoundingClientRect();
    if (r) {
      let c = this.domPreviewTitle.getBoundingClientRect();
      let u = this.domPreviewInner.getBoundingClientRect();
      this.previewInnerOffsetFrom = 0;
      this.previewInnerOffsetTo = l.top - (c.top - u.top);
    } else {
      this.previewInnerOffsetFrom = this.overScrollSize * 0.2;
      this.previewInnerOffsetTo = n.left;
    }
    this.domHeaderInfo.style.bottom = (properties.viewportHeight - this.domDetailsItemsWrapper.getBoundingClientRect().bottom) / 2 - this.domHeaderInfo.getBoundingClientRect().height / 2 + "px";
    this.titleCenterOffsetY = r ? 0 : properties.viewportHeight * 0.5 - n.top - l.height * 0.5;
    this.domPreviewTitle.style.width = l.width + "px";
    this.scrollPane.isVertical = r;
    this.scrollPane.isActive = true;
    this.scrollPane.resize(e, t);
    this.scrollPane.update(0);
    this.scrollPane.isActive = false;
    projectDetailsItems.syncDoms();
    projectDetailsScreen.resize(e, t);
  }
  update(e, t = false) {
    let r = this.projectDetailsData;
    if (!r) {
      return;
    }
    let n = properties.useMobileLayout;
    let a = n ? 0 : this.scrollPane.scrollPixel;
    let l = n ? this.scrollPane.scrollPixel : 0;
    let c = math.fit(projectPage.showRatio * (1 - projectPage.hideRatio), 0.5, 1, 0, 1);
    let u = math.fit(c, 0, 0.5, 0, 1, ease.expoOut);
    this.domHeaderBackBtn.style.transform = `translate3d(0,${1 - u}em,0)`;
    this.domHeaderBackBtn.style.opacity = u;
    this.scrollPane.isActive = projectPage.nextProjectRatio == 0 && projectPage.contentShowRatio > 0.75;
    if (projectPage.contentShowRatio <= 0.75) {
      this.scrollPane.scrollToPixel(0, true);
    }
    this.scrollPane.update(e);
    let f = (this.scrollPane.contentSize + 1) * this.scrollPane.viewSizePixel - this.scrollPane.scrollPixel - this.overScrollSize;
    if (n) {
      f = Math.min(f, l + properties.viewportHeight);
    } else {
      f = Math.min(f, a + properties.viewportWidth);
    }
    f = math.fit(projectPage.nextProjectRatio, 0, 1, f, 0, ease.quintInOut);
    let p = math.fit(projectPage.nextProjectRatio, 0, 1, this.previewInnerOffsetFrom, this.previewInnerOffsetTo);
    if (n) {
      this.domPreview.style.transform = `translate3d(0, ${f}px, 0)`;
      this.domPreviewInner.style.transform = `translate3d(0, ${p}px, 0)`;
    } else {
      this.domPreview.style.transform = `translate3d(${f}px, 0, 0)`;
      this.domPreviewInner.style.transform = `translate3d(${p}px, 0, 0)`;
    }
    this.domPreviewFooterBarInner.style.transform = `scaleX(${this.overScrollRatio})`;
    let g = c * math.fit(projectPage.nextProjectRatio, 0, 0.5, 1, 0) * math.fit(projectPage.contentShowRatio, 0.5, 1, 0, 1);
    let v = 1;
    if (n) {
      this.domMeta.style.transform = this.domDetailsItemsMoveContainer.style.transform;
    } else {
      this.domMeta.style.transform = "translate3d(0,-50%,0)";
      v = math.fit(this.scrollPane.scrollPixel, 0, (n ? properties.viewportHeight : properties.viewportWidth) * 0.25, 1, 0);
      v = Math.min(1 - projectPage.nextProjectRatio, v, c) * math.fit(projectPage.nextProjectRatio, 0, 0.3, 1, 0);
    }
    let _ = math.fit(projectPage.nextProjectRatio, 0.75, 1, 0, 1);
    this.domPreviewFooter.style.opacity = ease.expoInOut(g);
    this.domPreviewTitle.style.color = _c1.setStyle(this.previewTitleColorDefaultColorHex).lerp(_c2.setStyle(this.previewTitleColorHex), _).getStyle();
    projectDetailsScreen.previewColorRatio = _;
    projectDetailsScreen.previewBgThreshold = f / (n ? properties.viewportHeight : properties.viewportWidth);
    projectDetailsScreen.shadow = math.mix(r.shadow, this.previewShadow, projectPage.nextProjectRatio);
    this.domMeta.classList.toggle("is-active", v > 0.5);
    this.domTitle.style.transform = `translate3d(${this.scrollPane.x / 2}px, ${math.fit(projectPage.contentShowRatio, 0, 0.65, this.titleCenterOffsetY, 0, ease.expoInOut)}px, 0)`;
    this.domTitle.style.opacity = v;
    let T;
    T = math.fit(projectPage.contentShowRatio, 0.4, 0.85, 0, 1, ease.expoOut);
    this.domDesc.style.transform = `translate3d(${this.scrollPane.x / 3}px, ${(1 - T) * 30}px, 0)`;
    this.domDesc.style.opacity = Math.min(v, T);
    T = math.fit(projectPage.contentShowRatio, 0.45, 0.9, 0, 1, ease.expoOut);
    this.domCta.style.transform = `translate3d(0, ${(1 - T) * 30}px, 0)`;
    this.domCta.style.opacity = Math.min(v, T);
    T = math.fit(projectPage.contentShowRatio, 0.5, 0.95, 0, 1, ease.expoOut);
    this.domSideListService.style.transform = `translate3d(${this.scrollPane.x / 5}px, ${(1 - T) * 30}px, 0)`;
    this.domSideListService.style.opacity = Math.min(v, T);
    T = math.fit(projectPage.contentShowRatio, 0.55, 1, 0, 1, ease.expoOut);
    this.domSideListLinks.style.transform = `translate3d(${this.scrollPane.x / 4}px, ${(1 - T) * 30}px, 0)`;
    this.domSideListLinks.style.opacity = Math.min(v, T);
    this.domHeaderInfo._ratio = math.saturate(this.domHeaderInfo._ratio + (this.domHeaderInfo._hide ? e : -e));
    this.domHeaderInfo.style.opacity = T - ease.expoOut(this.domHeaderInfo._ratio);
    this.sharedUniforms.u_opacity.value = g;
    projectDetailsItems.update(e, a, l);
    if (!t) {
      projectDetailsScreen.update(e);
    }
    if (this.scrollPane.isActive && pagesManager.isIdle) {
      let M = this.scrollPane.targetScrollPixel >= this.scrollPane.contentSize * this.scrollPane.viewSizePixel - 1;
      let S = properties.useMobileLayout ? input.deltaDragScrollY + input.deltaWheel : input.deltaDragScrollX + input.deltaWheel;
      this.overScrollRatio = math.saturate(this.overScrollRatio + e * (M && S > 0 ? 3 : S < 0 ? -5 : -0.2));
      if (this.overScrollRatio == 1) {
        routeManager.setPath("/projects/" + r.nextId);
      }
    }
  }
  _onWindowWheel() {
    this.domHeaderInfo._hide = true;
  }
}
const projectDetailsSection = new ProjectDetailsSection();
class ProjectPageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1);
      if (!this.hasInit) {
        this.domProjectLaunchCta = document.getElementById("project-details-launch-cta");
        audios.addHoverClickEvents(this.domProjectLaunchCta);
        this.hasInit = true;
      }
    }
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectPageAudios = new ProjectPageAudios();
class ProjectPage extends Page {
  path = /projects\/([^\/]+)$/;
  id = "project";
  hasExtraPages = false;
  bypassShowingLoading = true;
  contentShowRatio = 0;
  nextProjectRatio = 0;
  prevNonProjectPath = null;
  preInit() {
    this._hideShownTween = new Tween(this, this._onContentShowComplete.bind(this));
    let e = this.domContainer;
    projectDetailsSection.preInit(e);
    videoOverlay.preInit();
  }
  preInitContent(e) {
    projectDetailsSection.preInitContent(e);
  }
  init() {
    projectDetailsSection.init();
    videoOverlay.init();
    super.init();
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    this._showPageTween.kill();
    let n = t.pathNodes[1];
    this.hideRatio = 0;
    header.forceWhite = true;
    header.domRightMenuBtn.style.background = "#fff";
    header.domContainer.classList.add("--is-projects");
    projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "auto";
    if (e.target && e.target !== this) {
      this.prevNonProjectPath = e.path;
    }
    this._onShowCompleteCallback = r;
    if (e.target === t.target) {
      this.useGenericTransition = false;
      projectDetailsSection.updatePreviewUI(n, false);
      projectDetailsSection.update(0, true);
      this._showPageTween.onComplete = this._onNextProjectComplete.bind(this);
      this._showPageTween.fromTo(1, {
        nextProjectRatio: 0
      }, {
        nextProjectRatio: 1
      });
    } else {
      if (e.target && e.target.hasProject(n)) {
        this.useGenericTransition = false;
      }
      projectDetailsSection.show(n);
      this._showPageTween.onComplete = r;
      this._showPageTween.fromTo(this.showDuration, {
        showRatio: 0,
        contentShowRatio: 0
      }, {
        showRatio: 1,
        contentShowRatio: 1
      });
    }
    projectPageAudios.init();
  }
  hide(e, t, r) {
    this.useGenericTransition = true;
    header.domRightMenuBtn.style.removeProperty("background");
    header.domContainer.classList.remove("--is-projects");
    projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "none";
    if (e.target === t.target) {
      this.useGenericTransition = false;
      this.hideRatio = 1;
      r();
    } else {
      let n = e.pathNodes[1];
      if (t.target.hasProject(n) && t.target.isFirstShown) {
        this.useGenericTransition = false;
      }
      super.hide(e, t, () => {
        header.domContainer.style.removeProperty("color");
        header.forceWhite = false;
        for (let a in projectDetailsSection.projectDetailsData) {
          a.replace(/^color(.+)/g, (l, c) => {
            c = c.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, (u, f, p) => f + "-" + p).toLowerCase();
            properties.domRoot.style.removeProperty("--project-details-" + c);
            properties.domRoot.style.removeProperty("--header-color");
            properties.domRoot.style.removeProperty("--header-text-color");
          });
        }
        r();
      });
    }
  }
  resize(e, t) {
    if (this.hasInitialized) {
      projectDetailsSection.resize(e, t);
    }
  }
  update(e) {
    super.update(e);
    if (this.hasInitialized) {
      if (properties.smaa) {
        properties.smaa.enabled = false;
      }
      projectDetailsSection.update(e);
      projectPageAudios.update(e);
    }
  }
  _onContentShowComplete() {
    this._onShowCompleteCallback();
  }
  _onNextProjectComplete() {
    this._hideShownTween.kill();
    let e = pagesManager.currRoute.pathNodes[1];
    this.nextProjectRatio = 0;
    this.contentShowRatio = 0;
    projectDetailsSection.show(e);
    this._hideShownTween.fromTo(1.5, {
      contentShowRatio: 0
    }, {
      contentShowRatio: 1
    });
  }
}
const projectPage = new ProjectPage();
let _brokenGlassStep = 0;
