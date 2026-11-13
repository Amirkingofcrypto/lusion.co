/**
 * ============================================================================
 * Lusion Modular Component: 07-home-hero-section
 * File: src/components/home/HomeHeroSection.js
 * Description: HomeHeroSection Component
 * Original Engine Lines: 31239 - 31386
 * ============================================================================
 */
class HomeHeroSection {
  domContainer;
  domHomeTitle;
  sectionDomRange;
  preInit(e) {
    this.domContainer = e.querySelector("#home-hero");
    this.domVisualContainer = e.querySelector("#home-hero-visual-container");
    if (typeof homeHeroBanner !== "undefined") homeHeroBanner.mount(this.domVisualContainer);
    this.domHomeTitle = e.querySelector("#home-hero-title");
    this.domHomeScroll = e.querySelector("#home-hero-scroll");
    this.domHomeCrosses = Array.from(e.querySelectorAll(".home-hero-scroll-container-cross"));
    this.domHomeScroll = e.querySelector("#home-hero-scroll");
    this.domHomeScroll._animating = false;
    this.domHomeScroll._time = 0;
    visuals.stage3DList.push(homeBalloons);
    homeBalloons.preInit();
    this.frameMesh = new Mesh(fboHelper.triGeom, fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_viewportResolution: properties.sharedUniforms.u_viewportResolution,
        u_domXY: {
          value: new Vector2()
        },
        u_domWH: {
          value: new Vector2()
        },
        u_bgColor: properties.sharedUniforms.u_bgColor,
        u_globalRadius: properties.sharedUniforms.u_globalRadius
      }),
      vertexShader: frameVert,
      fragmentShader: frameFrag,
      blending: NormalBlending,
      depthTest: false,
      depthWrite: false,
      derivatives: true,
      transparent: true,
      side: 2
    }));
    this.frameMesh.material.extensions.derivatives = true;
    homePage.preUfxContainer.add(this.frameMesh);
    this.frameMesh.visible = false;
    this.frameMesh.renderOrder = -1000;
  }
  init() {
    input.onClicked.add(() => {
      if (input.hasThroughElem(this.domVisualContainer, "click")) {
        audios.countPlay("click");
        homeBalloons.changeHomeHeroColorSignal.dispatch();
      }
    });
    homeBalloons.init();
  }
  initEvent() {
    window.addEventListener("wheel", this._onWheel.bind(this), {
      once: true
    });
  }
  resize(e, t) {
    let r = scrollManager.getDomRange(this.domContainer);
    let n = r.isActive;
    homeBalloons.ratio = math.fit(r.ratio, 0, 1, 1, 0) * (n ? 1 : 0);
    let a = new SplitType(this.domHomeTitle, {
      types: "lines, words"
    });
    for (let l = 0; l < a.lines.length; l++) {
      let c = a.lines[l];
      c.style.position = "relative";
      c.style.overflow = "hidden";
    }
    this.domHomeTitle._words = a.words;
    a = new SplitType(this.domHomeScroll, {
      types: "words"
    });
    this.domHomeScroll._words = a.words;
    if (properties.hasInitialized) {
      homeBalloons.resize(properties.width, properties.height);
    }
  }
  _updateUi(e) {
    scrollManager.scrollPixel;
    math.fit(this.sectionDomRange.ratio, 0.3, 0.7, 0, 1, ease.cubcInOut);
    let t = Math.max(0, homePage.time - 1);
    for (let r = 0; r < this.domHomeTitle._words.length; r++) {
      let n = this.domHomeTitle._words[r];
      let a = t - r / 20;
      n.style.transform = `translate3d(0, ${math.fit(a, 0, 1, 1.7, 0, ease.lusion)}em, 0) rotate(${math.fit(a, 0, 0.7, 15, 0, ease.lusion)}deg)`;
    }
    for (let r = 0; r < this.domHomeCrosses.length; r++) {
      let n = this.domHomeCrosses[r];
      let a = math.fit(t - 0.2 - r / 10, 0, 0.6, 0, 1, ease.lusion);
      let l = math.fit(t - 0.2 - r / 10, 0, 0.6, 0, 180, ease.lusion);
      n.style.transform = `scale(${a}) rotate(${l}deg)`;
    }
    for (let r = 0; r < this.domHomeScroll._words.length; r++) {
      let n = this.domHomeScroll._words[r];
      let a = math.fit(t - 0.23 - r / 10, 0, 0.6, 0.8, 1, ease.lusion);
      let l = math.fit(t - 0.23 - r / 10, 0, 0.6, 0, 1, ease.lusion);
      n.style.opacity = l;
      n.style.transform = `scale(${a})`;
    }
  }
  _onWheel() {
    this.domHomeScroll._animating = true;
  }
  update(e) {
    this.sectionDomRange = scrollManager.getDomRange(this.domContainer);
    let t = this.sectionDomRange.isActive;
    let r = scrollManager.getDomRange(this.domVisualContainer);
    let n = this.frameMesh.material.uniforms;
    n.u_domXY.value.set(r.screenX, r.screenY);
    n.u_domWH.value.set(r.width, r.height);
    homeBalloons.ratio = math.fit(this.sectionDomRange.ratio, 0, 1, 1, 0) * (t ? 1 : 0);
    homeBalloons.isActive = homeBalloons.ratio > 0;
    this.frameMesh.visible = t;
    if (t) {
      homeBalloons.properties.cameraViewportOffsetY = -(r.screenY + r.height * 0.5 - properties.viewportHeight * 0.5);
      let a = r.width / r.height;
      let l = math.fit(a, 2.2, 2 / 3, 18, 30);
      homeBalloons.properties.cameraFov = l;
      homeBalloonsBackground.clipScale.set((r.width + 2) / properties.viewportWidth, (r.height + 2) / properties.viewportHeight);
      homeBalloonsBackground.clipOffset.set(-1 / properties.viewportWidth, (homeBalloons.properties.cameraViewportOffsetY - 1) / properties.viewportHeight);
    }
    if (t && properties.hasStarted) {
      this._updateUi(e, this.sectionDomRange);
    }
  }
  hide() {
    this._reset();
  }
  _reset() {
    this.domHomeScroll._animating = false;
    this.domHomeScroll._time = 0;
    for (let e = 0; e < this.domHomeTitle._words.length; e++) {
      let t = this.domHomeTitle._words[e];
      t.style.transform = "translate3d(0, 100%, 0)";
    }
  }
}
const homeHeroSection = new HomeHeroSection();
const ufxVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos){vec3 basePos=vec3((pos.xy)*u_domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}vec3 getScreenPosition(in vec3 basePos){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(u_domXY.xy,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}vec2 padUv(in vec2 uv){vec2 paddedUv=uv+mix(-u_domPadding.xz,u_domPadding.yw,uv)/u_domWH;paddedUv.y=1.-paddedUv.y;return paddedUv;}`;
const quadVert = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const quadFrag = `#define GLSLIFY 1
uniform sampler2D u_bgTexture;uniform vec2 u_resolution;uniform sampler2D u_texture;varying vec2 v_uv;void main(){vec2 bgUv=gl_FragCoord.xy/u_resolution;vec4 bgColor=texture2D(u_bgTexture,bgUv);float imagePaddingThreshold=max(abs(v_uv.x-.5),abs(v_uv.y-.5));float imageAlpha=smoothstep(0.5,0.5-fwidth(imagePaddingThreshold),imagePaddingThreshold);vec4 image=texture2D(u_texture,v_uv);image.a*=imageAlpha;gl_FragColor.rgb=mix(bgColor.rgb,image.rgb,image.a);gl_FragColor.a=image.a;}`;
ShaderChunk.ufxVert = ufxVert;
new Vector3();
new Vector3();
new Matrix4();
