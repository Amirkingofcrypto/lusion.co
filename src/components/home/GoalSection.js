class HomeGoalSectionTunnelTitle {
  domContainer;
  domLines;
  domLineWords = [];
  totalLineHeight = 0;
  RATIO_FROM = 0.25;
  RATIO_TO = 1;
  init(e) {
    this.domContainer = e.querySelector("#home-goal-tunnel-title");
    this.domLines = e.querySelectorAll(".home-goal-tunnel-title-line");
    for (let t = 0; t < this.domLines.length; t++) {
      let r = this.domLines[t];
      let a = r.textContent.replace(/\s+/g, " ").split(" ");
      let l = "";
      for (let c = 0; c < a.length; c++) {
        l += "<span>" + a[c] + "</span>";
      }
      r.innerHTML = l;
      this.domLineWords[t] = r.querySelectorAll("span");
    }
  }
  resize(e, t) {
    this.domContainer.style.transform = "translateZ(0)";
    let r = this.domContainer.getBoundingClientRect();
    let n = r.width;
    let a = r.left;
    this._resetWords();
    for (let l = 0; l < this.domLineWords.length; l++) {
      let c = this.domLineWords[l];
      let u = n;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        g._domRect = g.getBoundingClientRect();
        g._centerX = g._domRect.left + g._domRect.width * 0.5;
        u -= g._domRect.width;
      }
      let f = 0;
      for (let p = 0; p < c.length; p++) {
        let g = c[p];
        g._offsetX = -g._domRect.left + a + f;
        f += g._domRect.width + u / (c.length - 1);
      }
    }
    this.totalLineHeight = this.domLines[this.domLines.length - 1].getBoundingClientRect().bottom - this.domLines[0].getBoundingClientRect().top;
  }
  _resetWords() {
    this.domContainer.style.transform = "translateZ(0)";
    for (let e = 0; e < this.domLineWords.length; e++) {
      let t = this.domLineWords[e];
      for (let r = 0; r < t.length; r++) {
        let n = t[r];
        n.style.transform = "translateZ(0)";
      }
    }
  }
  update(e) {
    let t = homeGoalSectionRanges.getRange("blackTitle");
    let r = math.fit(t.ratio, this.RATIO_FROM, this.RATIO_TO, 0, 1);
    e = e && r % 1 > 0;
    this.domContainer.style.visibility = e ? "visible" : "hidden";
    if (e) {
      let n = math.fit(r, 0.5, 1, 1, 12, ease.cubicIn);
      let a = math.fit(r, 0.9, 1, 1, 0);
      let l = math.fit(r, 0.4, 0.6, 0, 1, ease.cubicInOut);
      n *= math.fit(r, 0, 0.15, 0.85, 1, ease.cubicOut);
      a *= math.fit(r, 0, 0.05, 0, 1);
      let c = homeGoalSectionRanges.offsetY - properties.viewportHeight * 0.5;
      this.domContainer.style.transform = "translate3d(0," + c + "px,0) scale(" + n + ")  translateY(" + -this.totalLineHeight * 0.5 + "px) translateY(0.25em)";
      this.domContainer.style.opacity = a;
      for (let u = 0; u < this.domLineWords.length; u++) {
        let f = this.domLineWords[u];
        for (let p = 0; p < f.length; p++) {
          let g = f[p];
          g.style.transform = "translateX(" + l * g._offsetX + "px)";
        }
      }
    }
  }
}
const homeGoalSectionTunnelTitle = new HomeGoalSectionTunnelTitle();
const TITLE_STAGGER$1 = 40;
const TITLE_DELAY = 0.4;
let _m$1 = new Matrix4();
let _q = new Quaternion();
let _e = new Euler();
let _c0 = new Color();
class GoalSection {
  domContainer;
  domContext;
  domContextInner;
  domImgIn;
  domImgInInner;
  domImgOut;
  domImgOutInner;
  frameBgMesh;
  _placeholderTexture1;
  _placeholderTexture2;
  offsetY = 0;
  radiusRatio = 0;
  uiBgColorNeedsOverride = false;
  isUIBgBlack = false;
  _needsReset = true;
  sectionPaddingTop = 0;
  line = null;
  preInit(e) {
    homeGoalSectionRanges.init(e);
    this.domContainer = e.querySelector("#home-goal");
    this.domContext = e.querySelector("#home-goal-context");
    this.domContextInner = e.querySelector("#home-goal-context-inner");
    this.domTitle = e.querySelector("#home-goal-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domDescs = e.querySelector("#home-goal-texts");
    this.domImgIn = e.querySelector("#home-goal-image-in");
    this.domImgInInner = e.querySelector("#home-goal-image-in-inner");
    this.domImgOut = e.querySelector("#home-goal-image-out");
    this.domImgOutInner = e.querySelector("#home-goal-image-out-inner");
    this.frameBgMesh = new UfxMesh({
      geometry: fboHelper.triGeom,
      material: fboHelper.createRawShaderMaterial({
        uniforms: {
          u_bgColor: {
            value: new Color()
          },
          u_frameOffset: {
            value: new Vector2()
          },
          u_frameScale: {
            value: 1
          },
          u_frameRotate: {
            value: 0
          },
          u_radiusScale: {
            value: 0
          },
          u_glowColor: {
            value: new Color(0, 0, 0)
          },
          u_glowRadius: {
            value: 0.11
          },
          u_glowUpperBound: {
            value: 0.5
          },
          u_glowPow: {
            value: 0.1
          },
          u_glowTint: {
            value: 0
          },
          u_dom2Offset: {
            value: new Vector2()
          },
          u_dom2WH: {
            value: new Vector2()
          },
          u_dom2Texture: {
            value: null
          },
          u_viewportResolution: properties.sharedUniforms.u_viewportResolution,
          u_time: properties.sharedUniforms.u_time,
          u_globalRadius: properties.sharedUniforms.u_globalRadius
        },
        vertexShader: frameBgVert,
        fragmentShader: frameBgFrag,
        depthTest: false,
        depthWrite: false,
        derivatives: true,
        transparent: true,
        blending: NormalBlending
      })
    });
    this.frameBgMesh.renderOrder = -1;
    homePage.preUfxContainer.add(this.frameBgMesh);
    this.frameBgMesh.visible = false;
    homeGoalSectionTunnelTitle.init(e);
    visuals.stage3DList.push(goalTunnels);
    goalTunnels.preInit();
    this.lineVisual = new Line(1);
    this.lineVisual.preInit();
  }
  init() {
    this._placeholderTexture1 = properties.loader.load(settings.TEXTURE_PATH + "/tunnels/tablet.png", {
      type: "texture",
      flipY: false,
      minFilter: LinearFilter
    }).content;
    this._placeholderTexture2 = properties.loader.load(settings.TEXTURE_PATH + "/tunnels/desktop.png", {
      type: "texture",
      flipY: false,
      minFilter: LinearFilter
    }).content;
    goalTunnels.init();
    this.lineVisual.init();
    homePage.postUfxContainer.add(this.lineVisual.container);
  }
  show() {}
  hide() {}
  resize(e, t) {
    this._splitText();
    scrollManager.resize(e, t);
    homeGoalSectionRanges.resize(e, t);
    goalTunnelGlass.resize(e, t);
    homeGoalSectionTunnelTitle.resize(e, t);
    goalTunnels.resize(properties.width, properties.height);
    this.lineVisual.resize(e, t);
    this.sectionPaddingTop = parseFloat(getComputedStyle(this.domContainer).getPropertyValue("padding-top"));
  }
  update(e) {
    homeGoalSectionRanges.update(e);
    let t = scrollManager.getDomRange(this.domContainer);
    let r = t.isActive;
    let n = scrollManager.getDomRange(this.domImgIn);
    let a = scrollManager.getDomRange(this.domImgInInner);
    let l = scrollManager.getDomRange(this.domImgOut);
    let c = scrollManager.getDomRange(this.domImgOutInner);
    let u = 0;
    goalTunnels.isActive = homeGoalSectionRanges.isActive && properties.hasInitialized;
    goalTunnels.resetAstronautLayer();
    if (goalTunnelGlass.container) {
      goalTunnelGlass.container.visible = false;
    }
    this.uiBgColorNeedsOverride = goalTunnels.isActive;
    if (this.uiBgColorNeedsOverride) {
      this.isUIBgBlack = homeGoalSectionRanges.getRange("blackTitle", "blackTunnel").isActive || homeGoalSectionRanges.getRange("whiteFrameOut", "astronautWait").isActive;
    }
    let f = 0;
    let p = 1;
    let g;
    let v;
    let _ = homeGoalSectionRanges.getRange("blackFrameIn");
    if (properties.useMobileLayout) {
      this.domDescs.style.transform = "translateZ(0)";
    } else {
      this.domDescs.style.transform = "translate3d(0," + (n._top - this.sectionPaddingTop - t._top + n.height * 0.5) + "px,0) translateY(-50%)";
    }
    if (goalTunnels.isActive) {
      let b = this.frameBgMesh.material.uniforms;
      let C = math.saturate(homeGoalSectionRanges.ratio);
      let w;
      let R;
      let E = 0;
      let I = 1;
      let F = 0;
      let k = 0;
      let L = 0;
      let D = 0;
      let ne = b.u_glowColor.value;
      goalTunnels.ratio = C;
      let re = textureHelper.blackTexture;
      let ce = 0;
      let z = homeGoalSectionRanges.getRange("blackTunnel");
      let j = homeGoalSectionRanges.getRange("blackFrameShow");
      let X = homeGoalSectionRanges.getRange("whiteFrameOut");
      let Z = homeGoalSectionRanges.getRange("whiteFrameBreak");
      let q = homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautDrop");
      let ue = homeGoalSectionRanges.getRange("astronautDrop");
      homeGoalSectionTunnelTitle.update(true);
      let oe = q.ratio;
      let te = ue.ratio;
      let le = 0;
      E = math.saturate(_.ratio);
      let Te = 0;
      if (z.ratio < 1) {
        w = n;
        R = a;
        u = Math.max(0, homeGoalSectionRanges.offsetY - _.pixelFrom);
        le = u;
        f = E * 0.4;
        Te = 0;
        F = math.fit(E, 0, 1, 0.11, -0.5);
        k = math.fit(E, 0, 1, 0.25, 2);
        L = math.fit(E, 0, 1, 0.06, 0.3);
        ne.setStyle(properties.blackColorHex).lerp(_c0.setStyle(properties.offWhiteColorHex), E);
        if (this._placeholderTexture1 && this._placeholderTexture1.image.width) {
          re = this._placeholderTexture1;
        }
      } else {
        w = l;
        R = c;
        let xe = -properties.viewportHeight * 0.5 - l.top + n.top - l.height * 0.5;
        u = homeGoalSectionRanges.offsetY + xe;
        if (te < 1) {
          u = math.clamp(u, 0, Z.pixelTo + xe);
        }
        Te = 0;
        E = math.fit(homeGoalSectionRanges.offsetY, X.pixelFrom, X.pixelTo, 1, 0);
        ce = Math.max(0, homeGoalSectionRanges.offsetY - ue.pixelFrom);
        f = E * -0.3;
        if (oe < 0) {
          D = 0.8;
          ne.setStyle(properties.blackColorHex);
        } else {
          F = -0.5;
          k = math.fit(oe, 0, 0.15, 0, 0.8);
          k = math.fit(oe, 0.15, 0.3, k, 2);
          L = math.fit(oe, 0, 0.1, 0.3, 1);
          L = math.fit(oe, 0.1, 1, L, 0.2);
          D = 0.5;
          let ee = math.fit(oe, 0, 0.1, 1, 0);
          ee = math.fit(oe, 0.1, 0.8, ee, 0.85);
          ne.setStyle(properties.blueColorHex).lerp(_c0.setStyle(properties.blackColorHex), ee);
        }
        if (this._placeholderTexture2 && this._placeholderTexture2.image.width) {
          re = this._placeholderTexture2;
        }
        goalTunnelGlass.domFrameHeight = l.height;
        goalTunnelGlass.domFrameRotation = f;
        if (goalTunnelGlass.container) {
          goalTunnelGlass.container.visible = true;
        }
        I = 0;
      }
      let K = properties.viewportHeight * 0.2 * (1 - math.saturate(j.ratio));
      let G = Math.sqrt(properties.viewportWidth * properties.viewportWidth + properties.viewportHeight * properties.viewportHeight);
      p = math.mix(1, G / Math.min(w.width, w.height), E);
      goalTunnelGlass.domFrameScale = p;
      if (te < 1) {
        g = properties.viewportWidth * 0.5 - w.left - w.width * 0.5;
      } else {
        g = 0;
      }
      v = -(w.top + K - scrollManager.scrollPixel + w.height * 0.5 - properties.viewportHeight * 0.5 + u);
      goalTunnels.frameHeight = w.height;
      goalTunnelAstronauts.extraCameraViewportOffsetX = -math.fit(q.ratio, 0, 1, 0, -w.left - w.width * 0.5 + properties.viewportWidth * 0.5, ease.cubicInOut);
      goalTunnelAstronauts.extraCameraViewportOffsetY = -ce;
      properties.cameraViewportOffsetX = g * (1 - E);
      properties.cameraViewportOffsetY = v * (1 - E);
      b.u_dom2Texture.value = re;
      b.u_frameOffset.value.set(g * E, v * E);
      b.u_frameScale.value = p;
      b.u_frameRotate.value = f;
      b.u_radiusScale.value = I;
      b.u_bgColor.value.setStyle(C < 0.5 ? properties.offWhiteColorHex : properties.blackColorHex);
      b.u_glowRadius.value = F;
      b.u_glowUpperBound.value = k;
      b.u_glowPow.value = L;
      b.u_glowTint.value = D;
      properties.screenPaintOffsetRatio = 1 - E;
      this.frameBgMesh.syncRect(w.left, w.top + K, w.width, w.height);
      this.frameBgMesh.update(-scrollManager.scrollPixel + u);
      this.frameBgMesh.visible = E < 1;
      this.frameBgMesh.visible = E < 1 && te < 1;
      goalTunnelGlass.ratio = math.fit(q.ratio, 0, 1, 0, 1, ease.sineOut);
      if (goalTunnelGlass.container) {
        goalTunnelGlass.container.visible = goalTunnelGlass.container.visible && goalTunnelGlass.ratio > 0;
      }
      b.u_dom2Offset.value.set(R.left + R.width * 0.5 - w.left - w.width * 0.5, R.top + R.height * 0.5 - w.top - w.height * 0.5 + Te);
      b.u_dom2WH.value.set(R.width, R.height);
      this.domContextInner.style.transform = `translate3d(0, ${le}px, 0)`;
      this.domContextInner.style.visibility = this.frameBgMesh.visible ? "visible" : "hidden";
      let U = scrollManager.getDomRange(this.domContext);
      let N = properties.viewportWidth * 0.5 - U.screenX - properties.cameraViewportOffsetX;
      let he = properties.viewportHeight * 0.5 - U.screenY - properties.cameraViewportOffsetY - le;
      this.domContextInner.style.transformOrigin = "0 0";
      this.domContextInner.style.transform = `translate3d(${N}px, ${he + le}px, 0) scale(${p}) rotate(${f}rad) translate3d(${-N + g * E}px, ${-he + v * E}px, 0) `;
      let ve = properties.viewportWidth * 0.5 - properties.cameraViewportOffsetX;
      let de = -properties.viewportHeight * 0.5 + properties.cameraViewportOffsetY;
      ve *= -1;
      de *= -1;
      if (z.ratio < 1) {
        let xe = this.lineVisual.container.matrix;
        xe.makeTranslation(ve, de, 0);
        _e.set(0, 0, -f);
        _q.setFromEuler(_e);
        _m$1.makeRotationFromQuaternion(_q);
        xe.premultiply(_m$1);
        _m$1.makeScale(p, p, p);
        xe.premultiply(_m$1);
        _m$1.makeTranslation(-ve, -de, 0);
        xe.premultiply(_m$1);
        xe.decompose(this.lineVisual.container.position, this.lineVisual.container.quaternion, this.lineVisual.container.scale);
        this.lineVisual.update(e, t, u);
      }
    } else {
      this.lineVisual.update(e, t);
      this.frameBgMesh.visible = false;
      this.domContextInner.style.visibility = r ? "visible" : "hidden";
      this.domContextInner.style.transform = "translateZ(0)";
      this.lineVisual.container.position.set(0, 0, 0);
      this.lineVisual.container.quaternion.set(0, 0, 0, 1);
      this.lineVisual.container.scale.set(1, 1, 1);
      homeGoalSectionTunnelTitle.update(false);
    }
    if (_.ratio >= 1) {
      this.lineVisual.container.visible = false;
    }
    goalTunnels.updateRatios();
    let T = scrollManager.getDomRange(this.domContext, -u);
    let M = T;
    let S = properties.useMobileLayout ? 0 : 800;
    if (t.screenRatio < -0.8 && t.screenRatio !== -1) {
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      if (T.screenRatio > -1) {
        this.domTitle._animating = true;
        let b = math.fit(t.showScreenOffset, 0, 1.5, S * -0.2, 0);
        this.domTitle.style.transform = `translate3d(0, ${b}px, 0)`;
        if (!properties.useMobileLayout) {
          this.domTitle._splitted.words.forEach((C, w) => {
            let R = math.fit(this.domTitle._time - TITLE_DELAY - w / TITLE_STAGGER$1, 0, 1, 200, 0, ease.lusion);
            let E = math.fit(this.domTitle._time - w / TITLE_STAGGER$1, 0, 1, 100, 0, ease.lusion);
            C.style.transform = `translate3d(${R}px, ${E}%, 0)`;
          });
        }
      }
      M.screenRatio > -1;
      if (this._needsReset) {
        this._reset();
      }
    } else {
      this._needsReset = true;
    }
  }
  _splitText() {
    if (properties.useMobileLayout) {
      if (this.domTitle._splitted) {
        this.domTitle._splitted.revert();
      }
    } else {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words, lines",
        charClass: "goal-title-char"
      });
      this.domTitle._splitted.lines.forEach(e => {
        const t = document.createElement("div");
        t.style.position = "relative";
        t.style.overflow = "hidden";
        t.classList.add("goal-title-line-wrapper");
        t.append(e);
        this.domTitle.append(t);
      });
    }
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      if (properties.viewportWidth > settings.MOBILE_WIDTH) {
        this.domTitle._splitted.words.forEach(e => {
          e.style.transform = "translate3d(100%, 100%, 0)";
        });
      }
    }
  }
}
const homeGoalSection = new GoalSection();
const vertexShader = `#define GLSLIFY 1
attribute float branchRatio;attribute vec3 branchSplinePos;attribute vec3 leafAxis;attribute float leafRatio;attribute float meshId;uniform float u_time;uniform float u_delay;uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform float u_angleForce;varying vec3 v_position;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 toQuaternion(float angle,vec3 axis){float half_angle=angle/2.0;vec4 q;q.x=axis.x*sin(half_angle);q.y=axis.y*sin(half_angle);q.z=axis.z*sin(half_angle);q.w=cos(half_angle);return q;}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=position;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;float time=u_delay+0.2*u_time;float branchNoiseStrength=0.001;vec3 branchOffset=branchNoiseStrength*branchRatio*branchRatio*simplexNoiseDerivatives(vec4(pos,time)).xyz;branchOffset+=vec3(-1.0,0.0,0.0)*u_angleForce*branchRatio*branchRatio*0.1;if(meshId>0.0){vec3 toBranchSpline=pos-branchSplinePos;float angle=0.005*simplexNoiseDerivatives(vec4(branchRatio*0.5,u_time,meshId,1.0)).x;angle-=0.5*sign(leafAxis.z)*leafRatio*leafRatio*u_angleForce;vec4 q=toQuaternion(angle,leafAxis);toBranchSpline=qrotate(q,toBranchSpline);pos=branchSplinePos+branchOffset+toBranchSpline;}else{pos+=branchOffset;}vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_position=pos;}`;
const fragmentShader$3 = `#define GLSLIFY 1
uniform vec3 u_bbMin;uniform vec3 u_bbMax;uniform vec3 u_mask;varying vec3 v_position;void main(){gl_FragColor.rgb=u_mask*vec3((v_position.x-u_bbMin.x)/(u_bbMax.x-u_bbMin.x));gl_FragColor.a=1.0;}`;
const vert$b = `#define GLSLIFY 1
attribute float centroidY;uniform mat4 u_shadowViewMatrixCamera;uniform mat4 u_shadowProjectionMatrixCamera;uniform mat4 u_shadowModelMatrixCamera;uniform vec3 u_shadowProjPosition;varying vec3 v_worldPosition;
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);vec4 worldPosition=modelMatrix*vec4(position,1.0);v_worldPosition=worldPosition.xyz;}`;
const frag$f = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_shadowTexture;uniform vec3 u_shadowProjPosition;uniform mat4 u_shadowViewMatrixCamera;uniform mat4 u_shadowProjectionMatrixCamera;uniform mat4 u_shadowModelMatrixCamera;uniform vec3 u_bgColor;uniform float u_plantsShadow;uniform vec3 u_previewBgColor;uniform float u_previewBgThreshold;uniform bool u_isVertical;uniform float u_scrollXStrength;uniform float u_activeRatio;varying vec2 v_uv;varying vec3 v_worldPosition;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(22.,45.));vec2 imageUv=v_uv;float moveAxis=u_isVertical ? 1.-v_uv.y : v_uv.x;float waveOffset=cos(moveAxis*6.2831853)*2.*u_scrollXStrength*u_scrollXStrength;vec2 imageUvOffsetBit=vec2(0.0,0.0);if(u_isVertical){imageUv.x+=waveOffset;imageUvOffsetBit.y=u_scrollXStrength/8.;}else{imageUv.y+=waveOffset;imageUvOffsetBit.x=u_scrollXStrength/8.;}imageUv+=imageUvOffsetBit*noise.x;vec4 image=vec4(0.0,0.0,0.0,0.0);vec4 baseColor=vec4(u_bgColor,0.0);for(int i=0;i<8;i++){vec4 texel=texture2D(u_texture,imageUv);image+=mix(baseColor,texel,texel.a);imageUv+=imageUvOffsetBit;}image/=8.;vec3 worldPosition=v_worldPosition;worldPosition.z+=mix(0.0,-4.,image.a);vec3 projectorDirection=normalize(u_shadowProjPosition-worldPosition);float projectorDistance=length(u_shadowProjPosition-worldPosition);vec4 texCoords=u_shadowViewMatrixCamera*vec4(worldPosition,1.0);vec2 shadowUv=(texCoords.xy/texCoords.w)*0.9;shadowUv.y=1.0-shadowUv.y;vec4 shadowImage=texture2D(u_shadowTexture,shadowUv);float shadow=max(shadowImage.r,max(shadowImage.g,shadowImage.b));shadow=mix(0.,mix(shadow,0.35+shadow*0.65,image.w),u_activeRatio);vec3 color=image.rgb;color=mix(color,u_previewBgColor,smoothstep(u_previewBgThreshold,u_previewBgThreshold+fwidth(moveAxis),moveAxis));color*=mix(1.0,u_plantsShadow,shadow);gl_FragColor=vec4(color,1.);}`;