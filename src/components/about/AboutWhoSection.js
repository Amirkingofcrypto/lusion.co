/**
 * ============================================================================
 * Lusion Modular Component: 22-about-who-section
 * File: src/components/about/AboutWhoSection.js
 * Description: AboutWhoLogo, WhoSubsectionWeAre, WhoSubsectionDetails, TextAnimationHelper, WhoSubsectionTeam & AboutWhoSection
 * Original Engine Lines: 42355 - 43185
 * ============================================================================
 */
class AboutWhoLogo {
  container = new Object3D();
  fromDom;
  toDom;
  mesh;
  toMesh;
  containerWidth = 0;
  hideRatio = 0;
  preInit(e) {
    this.fromDom = e.querySelector("#about-who-title-main-logo");
    this.toDom = e.querySelector("#about-who-title-left-2");
    aboutPage.postUfxContainer.add(this.container);
    this.toMesh = new UfxMesh({
      refDom: this.toDom
    });
    properties.loader.add(settings.MODEL_PATH + "about/logo_text.buf", {
      onLoad: this._onGeometryLoad.bind(this)
    });
  }
  _onGeometryLoad(e) {
    let t = this.toMesh.material.uniforms;
    this.mesh = new UfxMesh({
      refDom: this.fromDom,
      geometry: e,
      uniforms: {
        u_showRatio: {
          value: 1
        },
        u_hideRatio: {
          value: 0
        },
        u_aspect: {
          value: 1 / 0.200957
        },
        u_toDomXY: t.u_domXY,
        u_toDomWH: t.u_domWH,
        u_toDomPivot: t.u_domPivot,
        u_time: properties.sharedUniforms.u_time
      },
      vertexShader: vert$1,
      fragmentShader: frag$4
    });
    this.container.add(this.mesh);
  }
  init() {}
  resize(e, t) {
    _needsSync = true;
  }
  update(e, t, r, n, a) {
    if (this.mesh) {
      if (_needsSync) {
        _needsSync = false;
        this.mesh.syncDom(r, t - n);
        this.toMesh.syncDom(r, t - a);
      }
      this.mesh.material.uniforms.u_showRatio.value = math.fit(aboutPage.time, 0.5, 1.5, 0, 1);
      if (properties.useMobileLayout) {
        this.mesh.material.uniforms.u_showRatio.value *= 1 - this.hideRatio;
        this.mesh.material.uniforms.u_hideRatio.value = 0;
      } else {
        this.mesh.material.uniforms.u_hideRatio.value = this.hideRatio;
      }
      this.mesh.update(r, t);
      this.toMesh.update(r, t);
    }
  }
}
const aboutWhoLogo = new AboutWhoLogo();
class WhoSubsectionWeAre {
  domContainer;
  domScroll;
  domLeftTexts;
  logoHideRatio = 0;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-we-are");
    this.domScroll = e.querySelector("#about-who-title-main-scroll");
    this.domLeftTexts = e.querySelectorAll("#about-who-title-left-1, #about-who-title-left-2 svg, #about-who-title-left-3, #about-who-title-left-4 span");
    this.domRightTexts = e.querySelectorAll(".about-who-title-right-text");
    aboutWhoLogo.preInit(e);
  }
  init() {
    aboutWhoLogo.init();
  }
  show() {}
  hide() {}
  resize(e, t) {
    this.offsetUnitSize = Math.max(60, properties.viewportWidth * 0.08);
    aboutWhoLogo.resize(e, t);
  }
  update(e, t, r, n, a) {
    this.domContainer.style.visibility = t ? "visible" : "hidden";
    this.domContainer.style.opacity = t ? 1 : 0;
    aboutWhoLogo.container.visible = t;
    if (t) {
      let l = properties.useMobileLayout ? properties.viewportWidth * -r : 0;
      this.domContainer.style.transform = "translate3d(" + l + "px, 0, 0)";
      let c = aboutHero.introRatio < 0.05;
      this.logoHideRatio = math.saturate(this.logoHideRatio + e * (c ? -1 : 1));
      let u = this.offsetUnitSize;
      aboutWhoLogo._pageScrollOffsetXRatio = 0;
      for (let p = 0; p < this.domLeftTexts.length; p++) {
        let g = this.domLeftTexts[p];
        let _ = (!properties.useMobileLayout && p == 5 ? 4 : p) / (this.domLeftTexts.length - 1);
        let T = math.fit(this.logoHideRatio, _ * 0.2, _ * 0.2 + 0.8, 0, 1);
        let M = math.fit(r, 0, _ * 0.5 + 0.3, 0, -10, ease.cubicOut);
        g._pageScrollOffsetXRatio = M;
        if (properties.useMobileLayout || p != 1) {
          T = math.fit(T, 0.35, 1, 0, 1, ease.cubicOut);
          g.style.opacity = T;
          g.style.transform = "translate3d(" + ((1 - T) * 1 + M) * u + "px, 0, 0)";
          if (p == 1) {
            aboutWhoLogo.hideRatio = this.logoHideRatio;
          }
        } else {
          aboutWhoLogo.hideRatio = T;
          aboutWhoLogo._pageScrollOffsetXRatio = M;
        }
      }
      for (let p = 0; p < this.domRightTexts.length; p++) {
        let g = this.domRightTexts[p];
        let v = p / (this.domRightTexts.length - 1);
        let _ = math.fit(this.logoHideRatio, 0.5 + v * 0.1, v * 0.1 + 0.9, 0, 1, ease.cubicOut);
        let T = math.fit(r, 0.35, v * 0.5 + 1.35, 0, -5, ease.cubicOut);
        g.style.opacity = _;
        g.style.transform = "translate3d(" + ((1 - _) * 1 + T) * u + "px, 0, 0)";
      }
      let f = math.fit(this.logoHideRatio, 0, 0.35, 1, 0, ease.cubicInOut);
      this.domScroll.style.opacity = f;
      if (properties.useMobileLayout) {
        this.domScroll.style.transform = "translate3d(50%, " + (1 - f) * 120 + "%, 0)";
      } else {
        this.domScroll.style.transform = "translate3d(0, " + (1 - f) * 120 + "%, 0)";
      }
      aboutWhoLogo.update(e, -r * properties.viewportWidth + aboutWhoLogo._pageScrollOffsetXRatio * u, -scrollManager.scrollPixel + a, aboutWhoLogo._pageScrollOffsetXRatio * u, this.domLeftTexts[1]._pageScrollOffsetXRatio * u);
    }
  }
}
const whoSubsectionWeAre = new WhoSubsectionWeAre();
class WhoSubsectionDetails {
  domContainer;
  activeFaceId = -1;
  domTopWords;
  domBottomWords;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-details");
    let t = this.domContainer.querySelector("#about-who-desc-top");
    let r = this.domContainer.querySelector("#about-who-desc-bottom");
    this.domTopWords = this._parseDomText(t);
    this.domBottomWords = this._parseDomText(r);
  }
  _parseDomText(e) {
    let t = e.querySelectorAll("span");
    for (let r = 0; r < t.length; r++) {
      let n = t[r];
      let a = t[r].innerHTML.split(" ");
      n.innerHTML = "<span>" + a.join("</span><span>") + "</span>";
    }
    return e.querySelectorAll("span span");
  }
  init() {}
  show() {}
  hide() {}
  resize(e, t) {
    let r;
    r = this.domTopWords;
    let n = Infinity;
    let a = -1;
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      c.style.transform = "translateZ(0)";
      c.style.opacity = 1;
      let u = c.getBoundingClientRect().left;
      if (u <= n) {
        a++;
      }
      n = u + 1;
      c._line = a;
    }
    this.domTopWords._lineCount = a + 1;
    r = this.domBottomWords;
    n = Infinity;
    a = -1;
    for (let l = 0; l < r.length; l++) {
      let c = r[l];
      c.style.transform = "translateZ(0)";
      c.style.opacity = 1;
      let u = c.getBoundingClientRect().right;
      if (u <= n) {
        a++;
      }
      n = u + 1;
      c._line = a;
    }
    this.domBottomWords._lineCount = a + 1;
  }
  update(e, t, r) {
    this.domContainer.style.visibility = t ? "visible" : "hidden";
    if (t) {
      let n = 0;
      if (properties.useMobileLayout) {
        n = math.fit(r, -0.75, -0.25, 0, 1) * math.fit(r, 0.25, 0.5, 1, 0);
      } else {
        n = 1;
        let a;
        let l;
        a = this.domTopWords;
        l = a._lineCount;
        for (let c = 0; c < a.length; c++) {
          let u = a[c];
          let f = u._line / l;
          let p = c / a.length;
          let g = math.fit(r, -1 + f * 0.5, -0.1, 0, 1);
          let v = math.fit(r, -1 + p * 0.5, -0.1, 0, 1);
          let _ = math.fit(r, 0.1, 0.5 + f * 0.5, 0, 1);
          let T = math.fit(r, 0.1, 0.5 + p * 0.5, 0, 1);
          u.style.transform = "translate3d(" + (math.fit(g, 0, 1, 10, 0) + math.fit(_, 0, 1, 0, -10)) + "em, 0, 0) translate3d(" + (math.fit(r, -1, 0, -50, 0) + math.fit(r, 0.1, 1, 0, 20)) + "vw, 0, 0)";
          u.style.opacity = v * (1 - T);
        }
        a = this.domBottomWords;
        l = a._lineCount;
        for (let c = 0; c < a.length; c++) {
          let u = a[c];
          let f = u._line / l;
          let p = c / a.length;
          let g = math.fit(r, -0.6 + f * 0.5, -0.1, 0, 1);
          let v = math.fit(r, -0.6 + p * 0.5, -0.1, 0, 1);
          let _ = math.fit(r, 0.2, 0.5 + f * 0.5, 0, 1);
          let T = math.fit(r, 0.2, 0.5 + p * 0.5, 0, 1);
          u.style.transform = "translate3d(" + (math.fit(g, 0, 1, 10, 0) + math.fit(_, 0, 1, 0, -10)) + "em, 0, 0) translate3d(" + (math.fit(r, -1, 0, -20, 0) + math.fit(r, 0, 1, 0, 50)) + "vw, 0, 0)";
          u.style.opacity = v * (1 - T);
        }
      }
      this.domContainer.style.opacity = n;
    }
  }
}
const whoSubsectionDetails = new WhoSubsectionDetails();
class TextAnimationHelper {
  setMatrixText(e, t, r = 0, n = 40, a = 2, l = 1 / 15) {
    e._rawTime = 0;
    e._time = 0;
    e._direction = 1;
    e._prevRefreshTime = -Infinity;
    e._refreshRate = l;
    e._delay = r;
    t = t.replace("<br>", `
`);
    e._text = t;
    e._letterPerSecond = n;
    e._maxRandLetterCount = a;
    e.textContent = "";
  }
  resetMatrixTextTime(e) {
    e._rawTime = 0;
    e._time = 0;
    e._prevRefreshTime = -Infinity;
  }
  updateMatrixText(e, t = properties.deltaTime) {
    e._rawTime += t;
    e._time += t * e._direction;
    e._time = math.clamp(e._time, 0, e._delay + (e._text.length + e._maxRandLetterCount) / e._letterPerSecond);
    if (e._rawTime >= e._prevRefreshTime + e._refreshRate) {
      e._prevRefreshTime = e._rawTime;
      let r = e._text;
      let n = Math.max(0, Math.floor(e._letterPerSecond * (e._time - e._delay)));
      let a = Math.min(r.length, n - e._maxRandLetterCount);
      let l = Math.min(r.length, n);
      let c = "";
      if (n > 0) {
        c = r.substr(0, a);
        for (let u = 0; u < l - a; u++) {
          c += String.fromCharCode(33 + ~~(Math.random() * 93));
        }
        c = c.replace(`
`, "<br>");
      }
      if (e._str != c) {
        e._str = c;
        e.innerHTML = c;
      }
    }
  }
}
const textAnimationHelper = new TextAnimationHelper();
const letterVert = `#define GLSLIFY 1
#include <ufxVert>
uniform float u_letterIdx;varying vec2 v_pixel;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_pixel=vec2(u_letterIdx*5.+1.,1.)+vec2(uv.x,1.-uv.y)*vec2(3.,4.);}`;
const letterFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_opacity;uniform float u_time;varying vec2 v_pixel;vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(vec3(floor(v_pixel),floor(u_opacity*3.)+floor(u_time+sin(u_time*3.)*1.5)));float opacity=mix(pow(rands.x,5.),0.95+rands.y*0.05,smoothstep(.75,1.,u_opacity))*u_opacity;vec2 uv=(floor(v_pixel)+.5)/vec2(210.,6.);float mask=texture2D(u_texture,uv).r;vec2 dd=abs(fract(v_pixel)-.5);float dotMask=step(max(dd.x,dd.y),.05);gl_FragColor=vec4(1.,1.,1.,max(dotMask*.3*(opacity*0.5+u_opacity*0.5),mask*opacity));}`;
class WhoSubsectionTeam {
  domContainer;
  domProgress;
  domLeftTexts;
  domLeftNamePlaceholder;
  domLeftNameText;
  domLeftJobPlaceholder;
  domLeftJobText;
  domRight;
  domIndicator;
  domIndicatorInner;
  teamDataMap = {};
  teamDataList = [];
  faceId = "edan";
  targetActiveFaceIndex = 0;
  faceIndex = 0;
  _faceIndexTween;
  facesCount = 0;
  faceIndexTimer = 0;
  containerOffsetX = 0;
  itemActiveRatio = 0;
  isForward = true;
  wasActive = null;
  isChangable = false;
  canSwipe = true;
  hasSwiped = false;
  hasSwipedOnce = false;
  _isAnimating = false;
  timeBaseChangeSpeed = 0.2;
  lastSwipeTime = -1;
  domCursorDirection = -1;
  domCursorActive = false;
  domCursorActiveRatio = 0;
  domCursorRotateRatio = 0;
  domCursorExtraRotationMotion = new SecondOrderDynamics(0, 1, 0.8, 1.2);
  faceRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0
  };
  letterRect = {
    x: 0,
    y: 0,
    width: 0,
    height: 0,
    offsetX: 0,
    offsetY: 0
  };
  domRightWidth = 0;
  preInit(e) {
    this.domContainer = e.querySelector("#about-who-subsection-team");
    this.domProgress = e.querySelector("#about-who-team-progress");
    this.domLeft = e.querySelector("#about-who-team-left");
    this.domLeftInfo = e.querySelector("#about-who-team-info");
    this.domLeftNameIcon = e.querySelector("#about-who-team-name-icon");
    this.domLeftNamePlaceholder = e.querySelector("#about-who-team-name-placeholder");
    this.domLeftNameText = e.querySelector("#about-who-team-name-text");
    this.domLeftJobPlaceholder = e.querySelector("#about-who-team-job-placeholder");
    this.domLeftJobText = e.querySelector("#about-who-team-job-text");
    this.domNumber = e.querySelector("#about-who-team-number");
    this.domTopCompass = e.querySelector("#about-who-team-top-compass");
    this.domBottomCompass = e.querySelector("#about-who-team-bottom-compass");
    this.domDots = e.querySelector("#about-who-team-dots");
    this.domLetterContainer = e.querySelector("#about-who-team-letter-container");
    this.domIndicator = this.domProgress.querySelector("#about-who-team-indicator");
    this.domIndicatorInner = this.domProgress.querySelector("#about-who-team-indicator-inner");
    this.domIndicator._prevActiveRatio = -1;
    this.domRight = e.querySelector("#about-who-team-right");
    this.domTitle = e.querySelector("#about-who-team-title");
    this.domDesc = e.querySelector("#about-who-team-desc");
    this.domDescText = e.querySelector("#about-who-team-desc-text");
    this.domDescSquare = e.querySelector("#about-who-team-square");
    this.domCursor = e.querySelector("#about-who-face-cursor");
    this.domCursorArrow = e.querySelector("#about-who-face-cursor-arrow");
    this.domFaces = e.querySelector("#about-who-team-faces");
    this.domMobileSwipe = e.querySelector("#about-who-team-left-mobile-tips");
    this.domTeamNumber = e.querySelector("#about-who-team-number-center-item");
    properties.loader.add(settings.TEAM_PATH + "team.json", {
      onLoad: t => {
        this.teamDataList = t;
        this._createUIElements();
        for (let r = 0; r < t.length; r++) {
          t[r].index = r;
          this.teamDataMap[t[r].id] = t[r];
        }
      }
    });
    aboutHeroFaces.load(this.faceId);
    this.letterMesh = new UfxMesh({
      uniforms: {
        u_texture: {
          value: properties.loader.add(settings.TEXTURE_PATH + "font.png", {
            minFilter: LinearFilter,
            type: "texture"
          }).content
        },
        u_letterIdx: {
          value: 0
        },
        u_opacity: {
          value: 1
        },
        u_time: properties.sharedUniforms.u_time
      },
      vertexShader: letterVert,
      fragmentShader: letterFrag
    });
    this.letterMesh.visible = false;
    aboutPage.postUfxContainer.add(this.letterMesh);
    this._faceIndexTween = new Tween(this, () => {
      this.onTweenComplete();
    });
  }
  init() {
    input.onXScrolled.add(() => {
      if (properties.useMobileLayout && this.canSwipe && this.wasActive && properties.time - this.lastSwipeTime > 0.5) {
        this.hasSwiped = true;
        this.canSwipe = false;
        this.domCursorDirection = input.lastScrollXDirection;
        this.lastSwipeTime = properties.time;
      }
    }, this);
    input.onUped.add(() => {
      this.canSwipe = true;
    }, this);
  }
  onPageShow() {
    aboutHeroFaces.showRatio = 0;
    for (let e = 0; e < this.teamDataList.length; e++) {
      let t = this.teamDataList[e].id;
      aboutHeroFaces.load(t);
    }
    this.facesCount = this.teamDataList.length;
    this.updateTeamNumberUI();
  }
  prev() {
    this.targetActiveFaceIndex--;
    this.isForward = false;
    this._clearTween();
    this._isAnimating = true;
    this._faceIndexTween.to(1.25 + Math.abs(this.targetActiveFaceIndex - this.faceIndex) * 0.25, {
      faceIndex: this.targetActiveFaceIndex
    }, ease.cubicInOut);
    this.updateTeamNumberUI();
  }
  next() {
    this.targetActiveFaceIndex++;
    this.isForward = true;
    this._clearTween();
    this._isAnimating = true;
    this._faceIndexTween.to(1.25 + Math.abs(this.targetActiveFaceIndex - this.faceIndex) * 0.25, {
      faceIndex: this.targetActiveFaceIndex
    }, ease.cubicInOut);
    this.updateTeamNumberUI();
  }
  _clearTween() {
    this._isAnimating = false;
    this._faceIndexTween.kill();
  }
  updateTeamNumberUI() {
    const t = `${(math.mod(this.targetActiveFaceIndex, this.facesCount) + 1001).toString().substring(1)}`;
    this.domTeamNumber.innerHTML = t;
  }
  onTweenComplete() {
    this._clearTween();
    this.faceIndexTimer = 0;
    this._changeFaceUIByIndex(math.mod(this.targetActiveFaceIndex, this.teamDataList.length));
  }
  reset() {
    this._clearTween();
    this.faceIndexTimer = 0;
    this.targetActiveFaceIndex = 0;
    this.faceIndex = 0;
    this.canSwipe = true;
    this.isForward = true;
    this._changeFaceUIByIndex(0);
  }
  resize(e, t) {
    this._splitText();
    this.syncContainerOffset();
    this.domRightWidth = this.domRight.offsetWidth;
    let r = this.domContainer.getBoundingClientRect();
    let n = this.domFaces.getBoundingClientRect();
    this._updateRect(this.faceRect, n, r);
    let a = this.domLetterContainer.getBoundingClientRect();
    this._updateRect(this.letterRect, a, r);
    this._splitText();
  }
  _updateRect(e, t, r) {
    e.x = t.left - aboutWhoSection.subsectionContainerOffsetX - this.containerOffsetX;
    e.y = t.top - aboutWhoSection.subsectionContainerOffsetY + scrollManager.scrollPixel;
    e.width = t.width;
    e.height = t.height;
    e.offsetX = t.left - r.left;
    e.offsetY = t.top - r.top;
  }
  _changeFaceUIByIndex(e) {
    e = math.mod(e, this.teamDataList.length);
    let t = this.faceId = this.teamDataList[e].id;
    let r = this.teamDataMap[t].name;
    let n = this.teamDataMap[t].role;
    this.domLeftNamePlaceholder.innerHTML = r;
    textAnimationHelper.setMatrixText(this.domLeftNameText, r, 0, 1, 3, 1 / 30);
    this.domLeftJobPlaceholder.innerHTML = n;
    textAnimationHelper.setMatrixText(this.domLeftJobText, n, 0, 1, 3, 1 / 30);
  }
  _createUIElements() {
    let e = document.createElement("div");
    e.id = "about-who-team-top-compass-inner";
    this.topCompassInnerDiv = e;
    for (let r = 0; r < this.teamDataList.length - 4; r++) {
      for (let n = 0; n < 4; n++) {
        let a = document.createElement("div");
        a.classList.add("about-who-team-top-compass-long");
        e.append(a);
        for (let l = 0; l < 4; l++) {
          let c = document.createElement("div");
          c.classList.add("about-who-team-top-compass-small");
          e.append(c);
        }
      }
    }
    this.domTopCompass.append(e);
    let t = document.createElement("div");
    t.id = "about-who-team-bottom-compass-inner";
    this.bottomCompassInnerDiv = t;
    for (let r = 0; r < this.teamDataList.length - 4; r++) {
      for (let n = 0; n < 4; n++) {
        let a = document.createElement("div");
        a.classList.add("about-who-team-bottom-compass-long");
        t.append(a);
        for (let l = 0; l < 4; l++) {
          let c = document.createElement("div");
          c.classList.add("about-who-team-bottom-compass-small");
          t.append(c);
        }
      }
    }
    this.domBottomCompass.append(t);
    for (let r = 0; r < 11; r++) {
      let n = document.createElement("div");
      n.classList.add("about-who-team-dots-col");
      for (let a = 0; a < 3; a++) {
        let l = document.createElement("div");
        l.classList.add("about-who-team-dot");
        n.append(l);
      }
      this.domDots.append(n);
    }
    this.topCompassInnerDiv._width = this.topCompassInnerDiv.getBoundingClientRect().width - this.domTopCompass.getBoundingClientRect().width;
    this.bottomCompassInnerDiv._width = this.bottomCompassInnerDiv.getBoundingClientRect().width - this.domBottomCompass.getBoundingClientRect().width;
  }
  syncContainerOffset() {
    this.containerOffsetX = properties.useMobileLayout ? 0 : (aboutWhoSection.scrollRatio * aboutWhoSection.PAGE_DISTANCE - aboutWhoSection.PAGE_DISTANCE * 2) * properties.viewportWidth;
    this.domContainer.style.transform = "translate3d(" + this.containerOffsetX + "px,0,0)";
  }
  _splitText() {}
  preUpdate() {
    this.domCursor.style.display = "none";
    this.letterMesh.visible = false;
  }
  onSwipe() {
    this.hasSwipedOnce = true;
  }
  update(e, t, r, n, a, l) {
    let c = l > 0.5;
    aboutHeroFaces.showRatio = math.saturate(aboutHeroFaces.showRatio + (c ? e : -e) / 1.5);
    aboutHeroFaces.isActive = aboutHeroFaces.showRatio > 0;
    this.itemActiveRatio = math.saturate(this.itemActiveRatio + (aboutHeroFaces.isActive ? this._isAnimating ? -2 : 2 : 0) * e);
    if (t) {
      this.syncContainerOffset();
    }
    if (c && !this.hasSwipedOnce) {
      this.domMobileSwipe.classList.add("--is-active");
    } else {
      this.domMobileSwipe.classList.remove("--is-active");
    }
    let u = this.faceRect.x + aboutWhoSection.subsectionContainerOffsetX + this.containerOffsetX;
    let f = this.faceRect.y + aboutWhoSection.subsectionContainerOffsetY - scrollManager.scrollPixel;
    let p = this.faceRect.width;
    let g = this.faceRect.height;
    let v = input.easedMouseDynamics.default.value.x;
    let _ = input.easedMouseDynamics.default.value.y;
    let T = (v * 0.5 + 0.5) * properties.viewportWidth;
    let M = (0.5 - _ * 0.5) * properties.viewportHeight;
    let S = false;
    if (properties.useMobileLayout) {
      this.domCursor.style.display = "none";
    } else {
      if (!this.wasActive) {
        this.domCursorActiveRatio = 0;
      }
      S = c && T > u && T < u + p && M > f && M < f + g;
      this.domCursorActiveRatio = math.saturate(this.domCursorActiveRatio + (S ? e : -e) * 1.5);
      S = this.domCursorActiveRatio > 0;
      this.domCursorDirection = T - u - p * 0.5 > 0 ? 1 : -1;
      if (S) {
        this.domCursor.style.display = "flex";
        let R = T - u;
        let E = M + this.faceRect.offsetY - f;
        let I = Math.min(2.5, input.easedMouseDynamics.default.valueVel.length() / 5 + 1) * ease.backOut(this.domCursorActiveRatio) * math.fit(n, 0, properties.viewportHeight, 1, 0);
        this.domCursor.style.transform = `translate3d(${R}px, ${E}px,0) translate3d(-50%, -50%, 0) scale(${I})`;
        this.domCursorRotateRatio = math.saturate(this.domCursorRotateRatio + (this.domCursorDirection > 0 ? e * 3 : e * -3));
        this.domCursorExtraRotationMotion.update(e, math.clamp(input.easedMouseDynamics.default.valueVel.y * -this.domCursorDirection, -1, 1));
        let F = ease.backInOut(this.domCursorRotateRatio);
        this.domCursorArrow.style.transform = `rotate(${F * 180 + this.domCursorExtraRotationMotion.value * 75}deg)`;
      } else {
        this.domCursor.style.display = "none";
      }
    }
    let b = 0;
    let C = 0;
    let w = 0;
    if (t) {
      if (properties.useMobileLayout) {
        b = math.fit(r, -0.5, 0, 0, 1);
        C = math.fit(r, -0.5, 0, 0, 1) * math.fit(r, 0.5, 1, 1, 0);
        w = l;
      } else {
        b = math.fit(r, -0.5, -0.2, 0, 1);
        C = math.fit(r, -0.4, -0.1, 0, 1);
        w = math.fit(r, -0.3, 0, 0, 1);
      }
      this.domTitle.style.opacity = b;
      this.domDesc.style.opacity = C;
      this.domLeft.style.opacity = w;
      this.domLeft.style.visibility = "visible";
      this.domTitle.style.visibility = "visible";
      this.domDesc.style.visibility = "visible";
      this.letterMesh.syncRect(this.letterRect.x + aboutWhoSection.subsectionContainerOffsetX + this.containerOffsetX, this.letterRect.y + aboutWhoSection.subsectionContainerOffsetY - scrollManager.scrollPixel, this.letterRect.width, this.letterRect.height);
      this.letterMesh.update();
      this.letterMesh.visible = true;
    } else {
      this.domLeft.style.visibility = "hidden";
      this.domTitle.style.visibility = "hidden";
      this.domDesc.style.visibility = "hidden";
    }
    if (this.teamDataList.length) {
      if (t) {
        if (!this.wasActive) {
          this.reset();
        }
        if (!properties.useMobileLayout) {
          aboutHero.properties.cameraViewportOffsetX = (properties.viewportWidth / 2 - (properties.viewportWidth - this.domRightWidth) / 2) * math.fit(r, -aboutWhoSection.PAGE_DISTANCE, 0, 0, 1, ease.cubicInOut);
        }
        let R = this.hasSwiped && c;
        if (R || S && input.justClicked) {
          audios.countPlay("click");
          if (this.domCursorDirection == 1) {
            this.next();
          } else {
            this.prev();
          }
        }
        if (R) {
          this.onSwipe();
        }
        let E = this.faceIndexTimer;
        this.faceIndexTimer = Math.min(1, this.faceIndexTimer + e * this.timeBaseChangeSpeed * (this._isAnimating ? 0 : 1));
        if (E < 1 && this.faceIndexTimer >= 1) {
          if (this.isForward) {
            this.next();
          } else {
            this.prev();
          }
        }
        let I = Math.floor(math.mod(this.faceIndex, this.teamDataList.length));
        let F = math.mod(I + 1, this.teamDataList.length);
        let k = this.faceIndex - Math.floor(this.faceIndex);
        aboutHeroFaces.currId = this.teamDataList[I].id;
        aboutHeroFaces.nextId = this.teamDataList[F].id;
        aboutHeroFaces.transitionRatio = k;
        let L = this.domIndicatorInner;
        L.style.transform = "scaleX(" + this.faceIndexTimer + ")";
        this.domIndicator.style.transform = "scaleX(" + ease.expoInOut(this.itemActiveRatio) + ")";
        let D = this.itemActiveRatio > 0.95 ? 1 : (Math.cos(this.itemActiveRatio * 17.213) * 0.5 + 0.5) * Math.pow(this.itemActiveRatio, 0.25);
        this.domLeftNameIcon.style.opacity = D;
        this.domLeftNameText._direction = this.domLeftJobText._direction = this._isAnimating ? -1 : 1;
        this.domLeftNameText._letterPerSecond = this.domLeftJobText._letterPerSecond = this._isAnimating ? 60 : 30;
        textAnimationHelper.updateMatrixText(this.domLeftNameText);
        textAnimationHelper.updateMatrixText(this.domLeftJobText);
        this.letterMesh.material.uniforms.u_letterIdx.value = aboutHeroFaces.currId.substring(0, 1).toUpperCase().charCodeAt(0) - 65;
        this.letterMesh.material.uniforms.u_opacity.value = w * D;
      } else {
        this._clearTween();
      }
    }
    this.wasActive = t;
    this.hasSwiped = false;
  }
}
const whoSubsectionTeam = new WhoSubsectionTeam();
class AboutWhoSection {
  domContainer;
  activeFaceId = -1;
  scrollRatio = 0;
  subsectionContainerOffsetY = 0;
  subsectionContainerOffsetX = 0;
  RANGE_START_WAIT = 3.5;
  RANGE_PAGE_12 = 1.75;
  RANGE_PAGE_23 = 1.75;
  RANGE_PAGE_34 = 1.75;
  RANGE_END_WAIT = 2.5;
  PAGE_DISTANCE = 1.25;
  THRESHOLDS = [];
  MOBILE_THRESHOLDS = [];
  preInit(e) {
    this.domContainer = e.querySelector("#about-who");
    this.domSubsectionContainer = e.querySelector("#about-who-subsection-container");
    this.domCrosses = e.querySelector("#about-crosses ");
    let t = 0;
    let r = 0;
    this.THRESHOLDS.push(t += this.RANGE_START_WAIT);
    this.THRESHOLDS.push(t += this.RANGE_PAGE_12);
    this.THRESHOLDS.push(t += this.RANGE_PAGE_23);
    r = t;
    this.MOBILE_THRESHOLDS.push.apply(this.MOBILE_THRESHOLDS, this.THRESHOLDS);
    this.THRESHOLDS.push(t += this.RANGE_END_WAIT);
    this.MOBILE_THRESHOLDS.push(r += this.RANGE_PAGE_34);
    this.MOBILE_THRESHOLDS.push(r += this.RANGE_END_WAIT);
    whoSubsectionWeAre.preInit(e);
    whoSubsectionDetails.preInit(e);
    whoSubsectionTeam.preInit(e);
    aboutHero.preInit();
    visuals.stage3DList.push(aboutHero);
  }
  init() {
    whoSubsectionWeAre.init();
    whoSubsectionDetails.init();
    whoSubsectionTeam.init();
    aboutHero.init();
  }
  resize(e, t) {
    this.syncSubsectionContainerTransform();
    whoSubsectionWeAre.resize(e, t);
    whoSubsectionDetails.resize(e, t);
    whoSubsectionTeam.resize(e, t);
    aboutHero.resize(properties.width, properties.height);
  }
  show() {
    aboutWhoLogo.hideRatio = 0;
    whoSubsectionTeam.onPageShow();
  }
  getMoveRatio() {
    return -scrollManager.getDomRange(this.domContainer).screenY / (properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth);
  }
  getScrollRatio() {
    let e = properties.useMobileLayout ? this.MOBILE_THRESHOLDS : this.THRESHOLDS;
    let t = this.getMoveRatio();
    let r = 0;
    if (t < e[0]) {
      r = 0;
    } else if (t < e[1]) {
      r = math.fit(t, e[0], e[1], 0, 1, ease.cubicInOut);
    } else if (properties.useMobileLayout) {
      if (t < e[2]) {
        r = math.fit(t, e[1], e[2], 1, 2, ease.cubicInOut);
      } else {
        r = math.fit(t, e[2], e[3], 2, 3, ease.cubicInOut);
      }
    } else {
      r = math.fit(t, e[1], e[2], 1, 2, ease.cubicInOut);
    }
    return this.scrollRatio = r;
  }
  syncSubsectionContainerTransform() {
    let e = properties.useMobileLayout ? this.MOBILE_THRESHOLDS : this.THRESHOLDS;
    let t = properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth;
    this.scrollableSize = e[e.length - 1] * t;
    let n = scrollManager.getDomRange(this.domContainer).isActive;
    let a = scrollManager.getDomRange(this.domContainer);
    let l = this.getScrollRatio() * this.PAGE_DISTANCE;
    this.subsectionContainerOffsetY = math.fit(a.screenY, 0, -this.scrollableSize, 0, this.scrollableSize);
    if (properties.useMobileLayout) {
      this.subsectionContainerOffsetX = 0;
    } else {
      this.subsectionContainerOffsetX = l * -properties.viewportWidth;
    }
    this.domSubsectionContainer.style.transform = "translate3d(" + this.subsectionContainerOffsetX + "px," + this.subsectionContainerOffsetY + "px, 0)";
    this.domCrosses.style.transform = "translate3d(" + -this.subsectionContainerOffsetX + "px,0, 0)";
    if (!n) {
      aboutHero.isActive = false;
    }
  }
  update(e) {
    let t = properties.useMobileLayout ? this.MOBILE_THRESHOLDS : this.THRESHOLDS;
    let r = properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth;
    this.scrollableSize = t[t.length - 1] * r;
    let a = scrollManager.getDomRange(this.domContainer).isActive;
    let l = scrollManager.getDomRange(this.domContainer);
    this.syncSubsectionContainerTransform();
    whoSubsectionTeam.preUpdate();
    if (a) {
      let c = this.getScrollRatio() * this.PAGE_DISTANCE;
      let u = -l.screenY / (properties.useMobileLayout ? properties.viewportHeight : properties.viewportWidth);
      aboutHero.initialSplineRatio = math.fit(u, 0, t[1], 0, 1);
      aboutHero.hudRatio = math.fit(u, t[1], t[1] + this.RANGE_PAGE_23 * 0.5, 0, 1);
      aboutHero.outSectionRatio = math.fit(u / t[3], 0.9, 1, 0, 1);
      aboutHero.properties.cameraViewportOffsetX = 0;
      aboutHero.properties.cameraViewportOffsetY = 0;
      aboutHero.scrollYRatio = 0;
      aboutHero.faceShowRatio = 0;
      if (c < this.PAGE_DISTANCE) {
        aboutHero.introRatio = u / (this.RANGE_START_WAIT + this.RANGE_PAGE_12);
        whoSubsectionWeAre.update(e, true, c, u, this.subsectionContainerOffsetY);
      } else {
        aboutHero.introRatio = 1;
        whoSubsectionWeAre.update(e, false, c, u, this.subsectionContainerOffsetY);
      }
      if (c > 0 && c < this.PAGE_DISTANCE * 2) {
        whoSubsectionDetails.update(e, true, c - this.PAGE_DISTANCE, this.subsectionContainerOffsetY);
      } else {
        whoSubsectionDetails.update(e, false, c - this.PAGE_DISTANCE, this.subsectionContainerOffsetY);
      }
      let f = this.getMoveRatio();
      if (properties.useMobileLayout) {
        aboutHero.panningSplineRaito = math.fit(f, t[2], t[4], 0, 1);
      } else {
        aboutHero.panningSplineRaito = math.fit(f, t[1], t[3], 0, 1);
      }
      let p = math.fit(c - this.PAGE_DISTANCE * 2 - (properties.useMobileLayout ? this.PAGE_DISTANCE : 0), -1, 0, 0, 1);
      let g = Math.max(0, scrollManager.scrollPixel - l.top - t[t.length - 1] * r);
      if (c >= this.PAGE_DISTANCE) {
        aboutHero.properties.cameraViewportOffsetY = g;
        aboutHero.scrollYRatio = g / r;
        whoSubsectionTeam.update(e, true, c - this.PAGE_DISTANCE * 2, g, this.subsectionContainerOffsetY, p);
      } else {
        whoSubsectionTeam.update(e, false, c - this.PAGE_DISTANCE * 2, g, this.subsectionContainerOffsetY, p);
      }
      aboutHero.isActive = true;
    } else {
      aboutHero.isActive = false;
      whoSubsectionTeam.wasActive = false;
    }
  }
}
const aboutWhoSection = new AboutWhoSection();
const TITLE_STAGGER = 20;
const DESCRIPTION_STAGGER = 50;
