/**
 * ============================================================================
 * Lusion Modular Component: 11-home-featured-section
 * File: src/components/home/HomeFeaturedSection.js
 * Description: ProjectItem, ProjectItemList & HomeFeaturedSection Component
 * Original Engine Lines: 33865 - 34345
 * ============================================================================
 */
const vert$i = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const frag$l = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform vec3 u_colorBg;uniform float u_showRatio;uniform float u_activeRatio;uniform vec2 u_textureSize;uniform vec2 u_domWH;uniform vec2 u_shiftXY;uniform vec3 u_focusPos;uniform float u_time;uniform float u_zoomRatio;uniform float u_dofRangeOffset;uniform float u_saturation;uniform float u_brightness;uniform float u_borderRatio;uniform float u_rippleStrength;uniform vec2 u_resolution;uniform float u_globalRadius;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*u_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;vec2 baseUv=v_uv;baseUv.x-=(screenUv.x-0.5)*(1.-sin((screenUv.y)*3.141592))*u_rippleStrength;float radiusRatio=1.;vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(5.,28.));float imageAlpha=getRoundedCornerMask(baseUv,u_domWH*mix(0.7,1.,u_showRatio),u_globalRadius,radiusRatio);vec2 toUvSpace=1./(u_textureSize*max(u_domWH.x/u_textureSize.x,u_domWH.y/u_textureSize.y));float borderThickenss=(u_domWH.y*0.08+5.)*u_borderRatio-5.;vec2 uv=baseUv-.5;uv*=u_domWH*mix(0.75,1.,u_showRatio);uv*=mix(0.975,1.,u_zoomRatio);float zMultiplier=u_domWH.y*(.15+u_activeRatio*15.);vec3 pos=vec3(uv,-zMultiplier);float cameraDepth=u_domWH.y*mix(10.,5.,u_zoomRatio);vec3 rayOri=vec3(u_focusPos.xy,cameraDepth);float dist=length(pos-rayOri);vec3 rayDir=(pos-rayOri)/dist;float skipDist=cameraDepth/-rayDir.z;dist-=skipDist;float stepDist=dist/float(PARALLAX_SAMPLES);vec3 rayStep=rayDir*stepDist;vec3 rayPos=rayOri+rayDir*(skipDist+stepDist*noise.x);for(int i=0;i<PARALLAX_SAMPLES;i++){float currZ=-texture2D(u_depthTexture,rayPos.xy*toUvSpace+.5).r*zMultiplier;if(currZ>rayPos.z){break;}rayPos+=rayStep;dist+=stepDist;}uv=rayPos.xy;uv*=toUvSpace;uv+=u_shiftXY*0.015;float depth=texture2D(u_depthTexture,uv+.5).r;vec3 color=vec3(0.0);float PI=3.1415926;float blurriness=mix(0.0,0.01,u_zoomRatio)*linearStep(0.0,0.5,abs(depth-u_focusPos.z)+u_dofRangeOffset);float angle=PI*2.*noise.y;float textureAspectInv=u_textureSize.y/u_textureSize.x;float numSampleInv=1./float(BLUR_SAMPLES);for(int i=0;i<BLUR_SAMPLES;i++){float fI=float(i);float r=sqrt((fI+0.5)*numSampleInv)*blurriness;angle+=10.16640738;vec2 uvOffset=r*vec2(cos(angle)*textureAspectInv,sin(angle));vec4 image=texture2D(u_texture,uv+uvOffset+.5);color+=image.rgb;}color*=numSampleInv;float luma=dot(color,vec3(0.299,0.587,0.114));color=mix(vec3(luma),color,1.0+u_saturation);color+=u_brightness;float fogThickness=0.75;color=mix(color,u_colorBg,linearStep(0.0,fogThickness,u_activeRatio*(1.+fogThickness*2.)-fogThickness-(1.0-depth)));gl_FragColor=vec4(color,imageAlpha);}`;
let TEXT_STAGGER = 20;
let LETTER_PER_SECOND = 40;
let MAX_RAND_LETTER_COUNT = 5;
class ProjectItem {
  static hoverDom = null;
  constructor(e, t, r, n) {
    this.list = e;
    this.id = t;
    this.dom = r;
    this.index = n;
    this.isHover = false;
    this.hoverRatio = 0;
    this.hoverThresholds = [0, 0.2, 0.3];
    this.focusZ = 0.5;
    this.parallaxStrength = 1;
    this.activeRatio = 0;
    this.showTime = 0;
    this.isHoverDom = false;
    this.domMain = this.dom.querySelector(".project-item-main");
    this.domFooterLine1 = this.dom.querySelector(".project-item-line-1");
    this.domFooterLine2 = this.dom.querySelector(".project-item-line-2-inner");
    this.domFooterLine2Icon = this.dom.querySelector(".project-item-line-2-icon");
    this.domFooterLine2List = [];
    this.domFooterLine1Text = this.domFooterLine1.textContent;
    this.domFooterLine1Time = 0;
    this.domFooterLine2Text = this.domFooterLine2.textContent;
    this.domFooterLine2Time = 0;
    this.domFooterLine2HoverRatio = 0;
    let a = settings.USE_WEBGL2 ? LinearMipmapLinearFilter : LinearFilter;
    let l = properties.loader.load(settings.PROJECT_PATH + this.id + "/home.webp", {
      type: "texture",
      minFilter: a
    }).content;
    let c = properties.loader.load(settings.PROJECT_PATH + this.id + "/home_depth.webp", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    this.focusPosMotion = new SecondOrderDynamics(new Vector3(), 1, 0.6, 2);
    this.focusPos = this.focusPosMotion.value;
    this.shiftXYTarget = new Vector2();
    this.shiftXY = new Vector2();
    this.zoomMotion = new SecondOrderDynamics(1, 2.2, 0.7, 3);
    this.dofRangeOffsetRatio = 0;
    this.borderMotion = new SecondOrderDynamics(0, 2.5, 0.5, 2);
    let u = n % 2 ? 1 : -1;
    this.ufxMesh = new UfxMesh({
      refDom: this.domMain,
      paddingL: u > 0 ? 0 : 1000,
      paddingR: u < 0 ? 0 : 1000,
      uniforms: Object.assign({
        u_side: {
          value: u
        },
        u_sideMargin: {
          value: 1
        },
        u_texture: {
          value: l
        },
        u_depthTexture: {
          value: c
        },
        u_textureSize: {
          value: l.size
        },
        u_focusPos: {
          value: this.focusPos
        },
        u_shiftXY: {
          value: this.shiftXY
        },
        u_deltaOffset: {
          value: new Vector2()
        },
        u_zoomRatio: this.zoomMotion,
        u_dofRangeOffset: {
          value: 0
        },
        u_dofStrength: {
          value: 1
        },
        u_saturation: {
          value: -1
        },
        u_brightness: {
          value: 0
        },
        u_colorBg: {
          value: new Color(r.dataset.colorBg)
        },
        u_activeRatio: {
          value: 0
        },
        u_showRatio: {
          value: 0
        },
        u_borderRatio: {
          value: 0
        },
        u_rippleStrength: {
          value: 0
        },
        u_time: properties.sharedUniforms.u_time,
        u_globalRadius: properties.sharedUniforms.u_globalRadius
      }, blueNoise.sharedUniforms),
      depthTest: false,
      depthWrite: false,
      vertexShader: vert$i,
      fragmentShader: frag$l
    });
    this.ufxMesh.material.defines.PARALLAX_SAMPLES = 12;
    this.ufxMesh.material.defines.BLUR_SAMPLES = 6;
    this.ufxMesh.renderOrder = 10;
    this.domMain.addEventListener("mouseenter", this._onMouseEnter.bind(this));
    this.domMain.addEventListener("mouseleave", this._onMouseLeave.bind(this));
  }
  _onMouseEnter() {
    if (pagesManager.isIdle && this.list.zoomRatio == 0) {
      this.isHover = true;
      audios.countPlay("focus");
    }
  }
  _onMouseLeave() {
    this.isHover = false;
  }
  syncDom() {
    this.ufxMesh.syncDom(-scrollManager.scrollPixel);
  }
  _findIndexFromThresholds(e) {
    for (let t = 0; t < this.hoverThresholds.length; t++) {
      if (e < this.hoverThresholds[t]) {
        return t;
      }
    }
    return this.hoverThresholds.length;
  }
  update(e) {
    let t = scrollManager.getDomRange(this.dom);
    if (t.ratio > -1 && t.ratio < 1) {
      this.ufxMesh.update(-scrollManager.scrollPixel);
      this.domFooterLine2HoverRatio = math.saturate(this.domFooterLine2HoverRatio + (this.isHoverDom ? 1 : -1) * e * 2.5);
      this.domFooterLine1Time += e;
      let r = this.domFooterLine1Text;
      let n = Math.min(r.length, Math.floor(LETTER_PER_SECOND * this.domFooterLine1Time) - MAX_RAND_LETTER_COUNT);
      let a = Math.min(r.length, Math.floor(LETTER_PER_SECOND * this.domFooterLine1Time));
      let l = "";
      for (let c = 0; c < n; c++) {
        l += r[c];
      }
      for (let c = 0; c < a - n; c++) {
        l += String.fromCharCode(33 + ~~(Math.random() * 93));
      }
      this.domFooterLine1.textContent = l;
      this.domFooterLine2Time += e * 0.8;
      if (properties.useMobileLayout) {
        this.domFooterLine2List.forEach((c, u) => {
          c.style.transform = "translate3d(1.5em, 0, 0)";
          let f = math.saturate(this.domFooterLine2HoverRatio - Math.abs(u - this.domFooterLine2List.length - 1) / 100);
          let p = math.fit(f, 0, 1, 0, 1.5, ease.lusion);
          c.style.transform += `translateX(${p}em)`;
        });
        this.domFooterLine2Icon.style.transform = "translateX(1em)";
      } else {
        this.domFooterLine2List.forEach((u, f) => {
          let p = math.fit(f, 0, this.domFooterLine2List.length - 1, Math.PI / 2, Math.PI * 3 / 2);
          let g = math.saturate(this.domFooterLine2Time - Math.cos(p) / TEXT_STAGGER);
          let v = math.fit(g, 0, 1, 500, 0, ease.expoInOut);
          let _ = math.saturate(this.domFooterLine2HoverRatio - Math.abs(f - this.domFooterLine2List.length - 1) / 100);
          let T = math.fit(_, 0, 1, 0, 1.5, ease.lusion);
          u.style.transform = `translate3d(${T}em, -${v}%, 0)`;
        });
        let c = math.fit(this.domFooterLine2HoverRatio, 0.3, 1, 0, 1, ease.lusion);
        this.domFooterLine2Icon.style.transform = `translateX(${c}em)`;
      }
      this.showTime += e;
      if (this.ufxMesh.testViewport(-scrollManager.scrollPixel)) {
        this.ufxMesh.visible = true;
        let c = input.mousePixelXY.x;
        let u = input.mousePixelXY.y + scrollManager.scrollPixel;
        let f = this.ufxMesh._domX;
        let p = this.ufxMesh._domY - this.ufxMesh._capturedOffsetY;
        let g = this.ufxMesh._domWidth;
        let v = this.ufxMesh._domHeight;
        let _ = this.hoverRatio;
        this.hoverRatio = math.clamp(this.hoverRatio + (this.isHover ? 1 : -1) * e, 0, 1);
        if (_ < this.hoverRatio) {
          let w = this._findIndexFromThresholds(_);
          let R = this._findIndexFromThresholds(this.hoverRatio);
          if (R != w) {
            this.shiftXYTarget.set(Math.random() - 0.5, Math.random() - 0.5).normalize().multiplyScalar(math.fit(this.hoverRatio, 0, 0.6, 1, 0));
          }
          if (R == this.hoverThresholds.length) {
            this.shiftXYTarget.multiplyScalar(0.5);
          }
        } else {
          this.shiftXYTarget.multiplyScalar(0.95);
        }
        this.shiftXY.lerp(this.shiftXYTarget, 0.2);
        let T = this.focusPosMotion.target;
        let M = this.list.zoomRatio;
        let S = this.activeRatio = this.id == this.list.selectedId ? M : Math.min(this.activeRatio, M);
        if (this.isHover && S == 0) {
          let w = this.parallaxStrength;
          let R = this.hoverRatio > 0 ? math.fit(this.hoverRatio, 0, 0.3, 1, 0) * v * 0.75 : 0;
          T.x = (c - f - g * 0.5 + Math.cos(properties.time * 20) * R) / g * -v * w;
          T.y = (u - p - v * 0.5 - Math.sin(properties.time * 30) * R) / v * v * w;
          T.z = this.focusZ;
        } else {
          T.x = 0;
          T.y = 0;
          T.z = S > 0 ? this.focusZ : -1;
        }
        this.zoomMotion.target = this.isHover || S > 0 ? 1 : 0;
        this.dofRangeOffsetRatio = math.clamp(this.dofRangeOffsetRatio + (this.isHover ? 0.75 : -1) * e, 0, 1);
        this.ufxMesh.material.uniforms.u_dofRangeOffset.value = math.mix(0, -0.5, this.dofRangeOffsetRatio);
        this.ufxMesh.material.uniforms.u_saturation.value = 0;
        this.ufxMesh.material.uniforms.u_brightness.value = 0;
        let b = math.fit(this.showTime, 0, 1.5, 0, 1, ease.expoOut);
        this.ufxMesh.material.uniforms.u_showRatio.value = b;
        this.ufxMesh.material.uniforms.u_activeRatio.value = S * S;
        let C = math.fit(this.showTime, 0, 2, 0, 1, ease.expoOut);
        this.ufxMesh.position.x = (1 - C) * (this.index % 2 - 0.5) * -properties.viewportWidth * 0.1;
        this.ufxMesh.rotation.z = (1 - C) * (this.index % 2 - 0.5) * 0.1;
        this.borderMotion.target = this.isHover && S == 0 ? 1 : 0;
        this.borderMotion.update(e);
        this.ufxMesh.material.uniforms.u_borderRatio.value = 0;
        this.ufxMesh.material.uniforms.u_rippleStrength.value = Math.min(0.15, scrollManager.easedScrollStrength * 0.5);
        this.focusPosMotion.update(e);
        this.zoomMotion.update(e);
      } else {
        this.ufxMesh.visible = false;
      }
    } else {
      this.ufxMesh.visible = false;
      this.showTime = 0;
      this.domFooterLine1Time = 0;
      this.domFooterLine2Time = 0;
      this.domFooterLine2.style.removeProperty("will-change");
    }
  }
  preloadImage() {}
}
class ProjectItemList {
  selectedId = null;
  page = null;
  zoomRatio = 0;
  projectItems = {};
  projectItemList = [];
  ufxContainer = new Object3D();
  ufxPivotContainer = new Object3D();
  constructor(e, t) {
    this.page = e;
    this.ufxContainer.add(this.ufxPivotContainer);
    e.postUfxContainer.add(this.ufxContainer);
    let r = t.querySelectorAll(".project-item");
    for (let n = 0; n < r.length; n++) {
      let a = r[n];
      let l = a.dataset.id;
      let c = this.projectItems[l] = this.projectItemList[n] = new ProjectItem(this, l, a, n);
      if (!properties.useMobileLayout) {
        c.dom.addEventListener("mouseenter", this._onDomItemMouseEnter.bind(this));
        c.dom.addEventListener("mouseleave", this._onDomItemMouseLeave.bind(this));
      }
      this.ufxPivotContainer.add(c.ufxMesh);
      let u = c.domFooterLine2.textContent.split("");
      c.domFooterLine2.textContent = "";
      u.forEach(f => {
        let p = document.createElement("div");
        p.classList.add("project-item-line-2-inner-list");
        p.style.display = "flex";
        p.style.flexDirection = "column";
        p.style.transform = "translateY(-400%)";
        c.domFooterLine2List.push(p);
        if (f === " ") {
          p.style.width = "0.3em";
        } else {
          for (let g = 0; g < 4; g++) {
            let v = document.createElement("span");
            v.textContent = f;
            p.appendChild(v);
          }
        }
        c.domFooterLine2.appendChild(p);
      });
    }
  }
  hasProject(e) {
    return !!this.projectItems[e];
  }
  getProjectItemTop(e) {
    let t = this.projectItems[e];
    if (t) {
      return scrollManager.getDomRange(t.dom)._top;
    } else {
      return 0;
    }
  }
  _onDomItemMouseEnter(e) {
    let t = this.projectItemList.filter(r => r.dom === e.target)[0];
    t.isHoverDom = true;
    ProjectItem.hoverDom = t;
  }
  _onDomItemMouseLeave(e) {
    let t = this.projectItemList.filter(r => r.dom === e.target)[0];
    t.isHoverDom = false;
    ProjectItem.hoverDom = null;
  }
  resize = (e, t) => {
    this.needsSyncUfx = true;
    this.ufxPivotContainer.position.set(-e * 0.5, t * 0.5, 0);
    this.ufxContainer.position.set(e * 0.5, -t * 0.5, 0);
    for (let r = 0; r < this.projectItemList.length; r++) {
      let n = this.projectItemList[r];
      n.isHoverDom = false;
    }
    ProjectItem.hoverDom = null;
  };
  update(e) {
    if (this.needsSyncUfx) {
      this.needsSyncUfx = false;
      for (let u = 0; u < this.projectItemList.length; u++) {
        this.projectItemList[u].syncDom();
      }
    }
    let t = 0;
    let r = 0;
    let n = 0;
    let a = 0;
    let l = 1;
    let c = this.projectItems[this.selectedId];
    if (c) {
      let u = ease.cubicInOut(this.zoomRatio);
      let f = Math.max(properties.viewportWidth / c.ufxMesh._domWidth, properties.viewportHeight / c.ufxMesh._domHeight);
      l *= math.mix(1, f * 1.2, u);
      let p = properties.viewportWidth * 0.5 - c.ufxMesh._domX - c.ufxMesh._domWidth * 0.5;
      let g = properties.viewportHeight * 0.5 - c.ufxMesh._domY - c.ufxMesh._domHeight * 0.5 + scrollManager.scrollPixel + c.ufxMesh._capturedOffsetY;
      t += p;
      r -= g;
      t -= p * (1 - u) / l;
      r += g * (1 - u) / l;
      n += u * 0.3 * p / properties.viewportWidth;
      a -= u * 0.3 * p / properties.viewportWidth;
    }
    t -= properties.viewportWidth * 0.5;
    r += properties.viewportHeight * 0.5;
    this.ufxPivotContainer.position.set(t, r, 0);
    this.ufxContainer.rotation.y = n;
    this.ufxContainer.rotation.z = a;
    this.ufxContainer.scale.setScalar(l);
    for (let u = 0; u < this.projectItemList.length; u++) {
      this.projectItemList[u].update(e);
    }
  }
}
class HomeFeaturedSection {
  domContainer;
  domTitle;
  domDisclaimer;
  domCta;
  projectItemList;
  time = 0;
  _needsReset = true;
  preInit(e) {
    this.domContainer = e.querySelector("#home-featured");
    this.projectItemList = new ProjectItemList(homePage, e.querySelector(".project-list"));
    this.domItems = e.querySelectorAll(".project-item");
    this.domTitle = e.querySelector("#home-featured-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domDisclaimer = e.querySelector("#home-featured-disclaimer");
    this.domDisclaimer._time = 0;
    this.domDisclaimer._animating = false;
    this.domCta = e.querySelector("#home-featured-cta");
    this.domCta._time = 0;
    this.domCta._animating = false;
  }
  init() {}
  resize(e, t) {
    this._splitText();
    this.projectItemList.resize(e, t);
  }
  update(e) {
    if (scrollManager.getDomRange(this.domContainer).isActive) {
      if (this._needsReset) {
        this._reset();
      }
      let r = scrollManager.getDomRange(this.domTitle);
      let n = scrollManager.getDomRange(this.domDisclaimer);
      let a = scrollManager.getDomRange(this.domCta);
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      this.domDisclaimer._time = math.clamp(this.domDisclaimer._time + (this.domDisclaimer._animating ? e : -e), 0, 2);
      this.domCta._time = math.clamp(this.domCta._time + (this.domCta._animating ? e : -e), 0, 1);
      if (r.screenRatio > -1) {
        this.domTitle._animating = true;
        if (!properties.useMobileLayout) {
          this.domTitle._splitted.chars.forEach((l, c) => {
            let u = math.fit(this.domTitle._time * 1.5 - c / 20, 0, 1, 1, 0, ease.lusion);
            let f = math.fit(this.domTitle._time * 1.5 - c / 20, 0, 1, 10, 0, ease.lusion);
            l.style.transform = `translate3d(0, ${u}em, 0) rotate(${f}deg)`;
          });
        }
      }
      if (n.screenRatio > -1) {
        this.domDisclaimer._animating = true;
        if (!properties.useMobileLayout) {
          this.domDisclaimer._splitted.lines.forEach((l, c) => {
            let u = math.fit(this.domDisclaimer._time * 1 - c / 20, 0, 1, 100, 0, ease.lusion);
            l.style.transform = `translate3d(0, ${u}%, 0)`;
          });
        }
      }
      if (a.screenRatio > -1) {
        if (properties.useMobileLayout) {
          this.domCta.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
          this.domCta.style.opacity = 1;
        } else {
          this.domCta._animating = true;
          this.domCta.style.transform = `translate3d(0, ${math.fit(this.domCta._time, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domCta._time, 0, 1, 10, 0, ease.lusion)}deg)`;
          this.domCta.style.opacity = ease.lusion(this.domCta._time);
        }
      }
    } else {
      this._needsReset = true;
    }
    this.projectItemList.zoomRatio = math.fit(homePage.activeRatio, 0, 0.75, 1, 0);
    this.projectItemList.update(e);
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domDisclaimer._time = 0;
      this.domDisclaimer._animating = false;
      this.domCta._time = 0;
      this.domCta._animating = false;
      if (!properties.useMobileLayout) {
        this.domDisclaimer._splitted.lines.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitle._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
      }
    }
  }
  _splitText() {
    if (properties.useMobileLayout) {
      if (this.domTitle._splitted) {
        this.domTitle._splitted.revert();
      }
      if (this.domDisclaimer._splitted) {
        this.domDisclaimer._splitted.revert();
      }
    } else {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words, chars"
      });
      this.domDisclaimer._splitted = new SplitType(this.domDisclaimer, {
        types: "lines"
      });
      this.domDisclaimer._splitted.lines.forEach(e => {
        let t = document.createElement("div");
        t.style.position = "relative";
        t.style.overflow = "hidden";
        t.append(e);
        this.domDisclaimer.append(t);
      });
    }
  }
}
const homeFeaturedSection = new HomeFeaturedSection();
const channelMixerFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_channelMixerR;uniform vec4 u_channelMixerG;uniform vec4 u_channelMixerB;uniform vec4 u_channelMixerA;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv);gl_FragColor=vec4(dot(color,u_channelMixerR),dot(color,u_channelMixerG),dot(color,u_channelMixerB),dot(color,u_channelMixerA));}`;
