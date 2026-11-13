/**
 * ============================================================================
 * Lusion Modular Component: 16-route-manager
 * File: src/core/RouteManager.js
 * Description: ProjectDetailsScreen, Route & RouteManager
 * Original Engine Lines: 38671 - 39094
 * ============================================================================
 */
const _v3 = new Vector3();
let _c1$2 = new Color();
new Color();
class ProjectDetailsScreen {
  screenRT;
  screenCamera;
  screenScene = new Scene();
  screenMesh;
  shadowContainer = new Object3D();
  shadowCamera;
  shadowRt;
  shadowBlurRt1;
  shadowBlurRt2;
  shadowBlurRt3;
  shadowFinalRt;
  plantGeo;
  plantMaterial;
  plantMesh0;
  plantMesh1;
  plantMesh2;
  velocity = new Vector2();
  mouse = new Vector2();
  angleForce = 0;
  angleForceEased = 0;
  shadow = 1;
  previewBgThreshold = 1;
  previewColorRatio = 0;
  previewBgColorDefaultColorHex = "#F3F4F9";
  previewBgColorHex = "#000";
  sharedUniforms = {
    u_shadowTexture: {
      value: null
    },
    u_shadowViewMatrixCamera: {
      value: new Matrix4()
    },
    u_shadowProjectionMatrixCamera: {
      value: new Matrix4()
    },
    u_shadowModelMatrixCamera: {
      value: new Matrix4()
    },
    u_shadowProjPosition: {
      value: new Vector3()
    }
  };
  preInit(e) {
    this.screenCamera = new OrthographicCamera(-1, 1, 1, -1, 0, 200);
    this.screenCamera.position.set(0, 0, 100);
    this.screenRT = fboHelper.createRenderTarget(1, 1);
    this.screenMesh = new UfxMesh({
      refDom: e,
      uniforms: Object.assign({
        u_texture: {
          value: this.screenRT.texture
        },
        u_bgColor: projectDetailsSection.sharedUniforms.u_bgColor,
        u_previewBgColor: {
          value: new Color("#f00")
        },
        u_previewBgThreshold: {
          value: 1
        },
        u_plantsShadow: {
          value: 1
        },
        u_scrollXStrength: {
          value: 0
        },
        u_activeRatio: {
          value: 0
        },
        u_isVertical: projectDetailsSection.sharedUniforms.u_isVertical
      }, this.sharedUniforms, blueNoise.sharedUniforms),
      vertexShader: vert$b,
      fragmentShader: frag$f,
      depthWrite: true,
      depthTest: true,
      transparent: false
    });
    projectPage.preUfxContainer.add(this.screenMesh);
    properties.loader.add(settings.MODEL_PATH + "plant.buf", {
      onLoad: t => this.plantGeo = t
    });
    this.shadowRT = fboHelper.createRenderTarget(1, 1);
    this.shadowBlurRT1 = fboHelper.createRenderTarget(1, 1);
    this.shadowBlurRT2 = fboHelper.createRenderTarget(1, 1);
    this.shadowBlurRT3 = fboHelper.createRenderTarget(1, 1);
    this.shadowFinalRt = fboHelper.createRenderTarget(1, 1);
    this.shadowCamera = new OrthographicCamera(-1, 1, 1, -1, 0.001, 50);
    this.sharedUniforms.u_shadowTexture.value = this.shadowFinalRt.texture;
  }
  init() {
    this.shadowCamera.position.set(0, 0, 10);
    this.shadowCamera.lookAt(0.2, 0, 0);
    this.shadowCamera.zoom = 2500;
    this.shadowCamera.updateProjectionMatrix();
    this.shadowCamera.updateMatrixWorld();
    this.shadowCamera.updateWorldMatrix();
    this.plantGeo.computeBoundingBox();
    const e = new ShaderMaterial({
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_bbMin: {
          value: this.plantGeo.boundingBox.min
        },
        u_bbMax: {
          value: this.plantGeo.boundingBox.max
        },
        u_delay: {
          value: 0
        },
        u_angleForce: {
          value: 0
        },
        u_mask: {
          value: new Vector3()
        }
      },
      vertexShader,
      fragmentShader: fragmentShader$3,
      side: 2
    });
    e.uniforms.u_mask.value.set(1, 0, 0);
    this.plantMesh0 = new Mesh(this.plantGeo, e);
    this.plantMesh0.position.set(-0.55, -0.8, -5);
    this.plantMesh0.rotation.set(0, -0.2, -0.2);
    const t = e.clone();
    t.uniforms.u_time = properties.sharedUniforms.u_time;
    t.uniforms.u_mask.value.set(0, 1, 0);
    this.plantMesh1 = new Mesh(this.plantGeo, t);
    this.plantMesh1.position.set(-0.75, -0.8, 0);
    this.plantMesh1.rotation.set(0, 0.2, -0.5);
    const r = e.clone();
    r.uniforms.u_time = properties.sharedUniforms.u_time;
    r.uniforms.u_mask.value.set(0, 0, 1);
    this.plantMesh2 = new Mesh(this.plantGeo, r);
    this.plantMesh2.position.set(-0.45, -0.8, 5);
    this.plantMesh2.rotation.set(0.3, 0.3, 0.1);
    this.shadowContainer.add(this.plantMesh0);
    this.shadowContainer.add(this.plantMesh1);
    this.shadowContainer.add(this.plantMesh2);
    this.plantMesh0.onBeforeRender = this._onPlantMeshRender.bind(this, this.plantMesh0);
    this.plantMesh1.onBeforeRender = this._onPlantMeshRender.bind(this, this.plantMesh1);
    this.plantMesh2.onBeforeRender = this._onPlantMeshRender.bind(this, this.plantMesh2);
  }
  _onPlantMeshRender(e) {
    let t = e.material.uniforms.u_mask.value;
    properties.gl.colorMask(t.x == 1, t.y == 1, t.z == 1, true);
  }
  resize() {
    let e = properties.width;
    let t = properties.height;
    this.screenMesh.syncDom(0);
    this.screenRT.setSize(e, t);
    let r = properties.viewportWidth;
    let n = properties.viewportHeight;
    this.screenCamera.left = -r * 0.5;
    this.screenCamera.right = r * 0.5;
    this.screenCamera.top = n * 0.5;
    this.screenCamera.bottom = -n * 0.5;
    const a = 0.75;
    let l = Math.ceil(a * e);
    let c = Math.ceil(a * t);
    this.shadowRT.setSize(l, c);
    this.shadowFinalRt.setSize(l, c);
    this.shadowCamera.left = -r * 0.5;
    this.shadowCamera.right = r * 0.5;
    this.shadowCamera.top = n * 0.5;
    this.shadowCamera.bottom = -n * 0.5;
    this.shadowCamera.updateProjectionMatrix();
  }
  update(e) {
    if (!this.plantMesh0) {
      return;
    }
    let t = projectDetailsSection.scrollPane;
    _v3.set(-0.1, 0.1, 10);
    _v3.x += input.mouseXY.x * 0.03;
    _v3.y += input.mouseXY.y * 0.015;
    this.shadowCamera.position.lerp(_v3, e * 4);
    this.shadowCamera.lookAt(-0.1, 0, 0);
    this.shadowCamera.updateProjectionMatrix();
    this.shadowCamera.updateMatrixWorld();
    this.shadowCamera.updateWorldMatrix();
    this.angleForce += Math.abs(t.scrollViewDelta);
    this.angleForceEased = math.mix(this.angleForceEased, this.angleForce, 0.02);
    const r = math.clamp(this.angleForce - this.angleForceEased, -1, 1);
    this.sharedUniforms.u_shadowViewMatrixCamera.value.copy(this.shadowCamera.matrixWorldInverse);
    this.sharedUniforms.u_shadowProjectionMatrixCamera.value.copy(this.shadowCamera.projectionMatrix);
    this.sharedUniforms.u_shadowModelMatrixCamera.value.copy(this.shadowCamera.matrixWorld);
    this.sharedUniforms.u_shadowProjPosition.value.copy(this.shadowCamera.position);
    fboHelper.copy(textureHelper.transparentTexture, this.shadowFinalRt);
    const n = fboHelper.getColorState();
    let a = fboHelper.renderer.getRenderTarget();
    let l = fboHelper.renderer;
    l.setRenderTarget(this.shadowRT);
    l.setClearColor(0, 0);
    this.plantMesh0.material.uniforms.u_delay.value = 0;
    this.plantMesh1.material.uniforms.u_delay.value = 0.2;
    this.plantMesh2.material.uniforms.u_delay.value = 0.5;
    this.plantMesh0.material.uniforms.u_angleForce.value = r;
    this.plantMesh1.material.uniforms.u_angleForce.value = r;
    this.plantMesh2.material.uniforms.u_angleForce.value = r;
    fboHelper.renderMesh(this.shadowContainer, this.shadowRT, this.shadowCamera);
    properties.gl.colorMask(true, true, true, true);
    blur.blur(2, 1, this.shadowRT, this.shadowBlurRT1);
    textureHelper.mixChannels(this.shadowRT.texture, this.shadowFinalRt, 0, -1, -1, -1);
    blur.blur(4, 0.5, this.shadowRT, this.shadowBlurRT2);
    textureHelper.mixChannels(this.shadowRT.texture, this.shadowFinalRt, -1, 1, -1, -1);
    blur.blur(4, 0.75, this.shadowRT, this.shadowBlurRT3);
    textureHelper.mixChannels(this.shadowRT.texture, this.shadowFinalRt, -1, -1, 2, -1);
    l.setRenderTarget(null);
    this.screenCamera.position.x = properties.viewportWidth * 0.5;
    this.screenCamera.position.y = -properties.viewportHeight * 0.5;
    this.screenCamera.updateProjectionMatrix();
    this.screenMesh.material.uniforms.u_plantsShadow.value = this.shadow;
    this.screenMesh.material.uniforms.u_previewBgThreshold.value = this.previewBgThreshold;
    this.screenMesh.material.uniforms.u_scrollXStrength.value = Math.min(0.15, t.isActive ? t.scrollViewDelta : 0);
    this.screenMesh.material.uniforms.u_previewBgColor.value.setStyle(this.previewBgColorDefaultColorHex).lerp(_c1$2.setStyle(this.previewBgColorHex), this.previewColorRatio);
    this.screenMesh.material.uniforms.u_activeRatio.value = projectPage.activeRatio;
    this.screenMesh.update();
    l.setClearColor(0, 0);
    l.clear(this.screenRT);
    l.setRenderTarget(this.screenRT);
    l.render(this.screenScene, this.screenCamera);
    l.setRenderTarget(a);
    fboHelper.setColorState(n);
  }
}
const projectDetailsScreen = new ProjectDetailsScreen();
class Route {
  constructor(e) {
    this.path = e;
    this.pathNodes = e ? e.split("/") : [];
    this.target = null;
    this.title = "";
    this.dom = null;
    this.scrollNavPath = "";
    this.scrollNavText = "";
    this.hasContentPreloaded = false;
    this.content = {};
  }
  setTitleDom(e, t, r, n) {
    this.title = e;
    this.dom = t;
    this.scrollNavPath = r;
    this.scrollNavText = n;
  }
  setTarget(e) {
    let t = null;
    for (let r = 0; r < e.length; r++) {
      let n = e[r];
      if (n.regExp.test(this.path)) {
        t = n;
        break;
      }
    }
    if (!t) {
      console.error("route not found for path: " + this.path);
      window.location.href = BASE_PATH ? window.location.origin + BASE_PATH + "/" : window.location.origin;
    }
    this.target = t.target;
  }
}
let loc = window.location;
let ORIGIN = window.location.origin;
let URL_PREFIX_REGEX = new RegExp("^" + ORIGIN.replace(/\//g, "\\/"));
class RouteManager {
  routes = {};
  matchList = [];
  currPath = null;
  _pendingPath = null;
  queryStr;
  onRouteChanged = new MinSignal$2();
  get currRoute() {
    return this.routes[this.currPath];
  }
  init() {
    this.queryStr = loc.href.split("?")[1] || "";
    window.addEventListener("popstate", this._onStatePop.bind(this));
    this.setUrl();
  }
  addPath(e, t) {
    this.matchList.push({
      regExp: e instanceof RegExp ? e : new RegExp("^" + e + "$"),
      target: t
    });
  }
  _createRoute(e) {
    let t = this.routes[e] = new Route(e);
    t.setTarget(this.matchList);
    return t;
  }
  _fetchHtml(e) {
    let t = this.routes[e];
    if (t) {
      if (t.dom) {
        this._onDomReady(t);
      }
    } else {
      properties.loader.load(BASE_PATH ? BASE_PATH + "/" + e : "/" + e, {
        type: "text",
        onLoad: this._initDom.bind(this, this._createRoute(e))
      });
    }
  }
  _initDom(e, t) {
    let r = document;
    let n = r.title;
    if (t) {
      r = r.implementation.createHTMLDocument();
      r.body.innerHTML = /<body[^>]*>((.|[\n\r])*)<\/body>/im.exec(t)[1];
      let u = /<title[^>]*>((.|[\n\r])*)<\/title>/im.exec(t);
      n = u ? u[1] : "";
    }
    let a = r.getElementById("scroll-nav-section");
    let l;
    let c;
    if (a) {
      l = a.dataset.path;
      c = r.getElementById("scroll-nav-text").innerHTML;
    }
    e.setTitleDom(n, r.querySelector(".page"), l, c);
    a.removeAttribute("data-path");
    this._attachEvents(t ? e.dom : r.documentElement);
    this._onDomReady(e);
  }
  _attachEvents(e) {
    let t = e.querySelectorAll("a");
    for (let r = 0, n = t.length; r < n; r++) {
      let a = t[r];
      if (!a.__hasClickParsed) {
        a.__hasClickParsed = true;
        let l = a.href.indexOf(window.location.origin) === 0 || a.href.indexOf("/") === 0;
        if (a.dataset.linkType) {
          l = a.dataset.linkType === "internal";
        }
        if (l) {
          a.addEventListener("mouseenter", c => {
            this.preFetch(this.parseUrl(a.href));
          });
          a.addEventListener("click", this._onInternalLinkClick.bind(this, a));
        } else {
          a.addEventListener("click", this._onRegularLinkClick.bind(this, a));
        }
      }
    }
  }
  _onRegularLinkClick(e, t) {
    let r = e.href;
    if (r.indexOf("https://player.vimeo.com/video/") === 0) {
      t.preventDefault();
      let n = r.split("/").pop();
      videoOverlay.initAndPlayVideo(n, true);
    }
  }
  _onInternalLinkClick(e, t) {
    t.preventDefault();
    let r = true;
    if (e._onPreClick) {
      r = e._onPreClick() !== false;
    }
    if (r) {
      this.setUrl(e.href);
    }
  }
  _onDomReady(e) {
    if (this._pendingPath == e.path) {
      this._pendingPath = null;
      this.onRouteChanged.dispatch(e);
    }
  }
  parseUrl(e = loc.href) {
    let t = e.replace(URL_PREFIX_REGEX, "");
    let r = t.split("#");
    r[1];
    r = r[0].split("?");
    r[1];
    t = this.parsePath(r[0]);
    return t;
  }
  parsePath(e) {
    e = e.replace(/^\/|\/$/g, "");
    const bp = (BASE_PATH || "").replace(/^\/|\/$/g, "");
    if (bp && (e === bp || e.startsWith(bp + "/"))) {
      e = e.slice(bp.length).replace(/^\/|\/$/g, "");
    }
    return e;
  }
  setUrl(e = loc.href) {
    let t = this.parseUrl(e);
    this.setPath(t);
  }
  setPath(e) {
    e = this.parsePath(e);
    if (e !== this.currPath) {
      history.pushState(null, null, (BASE_PATH ? BASE_PATH + (e ? "/" + e : "/") : e || "/") + (this.queryStr ? "?" + this.queryStr : ""));
      this._onStatePop();
    }
  }
  preFetch(e) {
    e = this.parsePath(e);
    this._fetchHtml(e);
  }
  _onStatePop(e) {
    if (e) {
      e.preventDefault();
    }
    let t = this.parseUrl();
    if (t !== this.currPath) {
      this.currPath = t;
      this._pendingPath = t;
      if (properties.hasInitialized) {
        this._fetchHtml(t);
      } else {
        this._initDom(this._createRoute(t));
      }
    }
  }
}
const routeManager = new RouteManager();
let _c1$1 = new Color();
let _c2$1 = new Color();
