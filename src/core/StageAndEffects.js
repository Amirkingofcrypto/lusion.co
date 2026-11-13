/**
 * ============================================================================
 * Lusion Modular Component: 04-task-page-stage-efx
 * File: src/core/StageAndEffects.js
 * Description: Task, TaskManager, Page Base Class, Ease, Stage3D, Blur, ShaderHelper, BlueNoise & ScreenPaint
 * Original Engine Lines: 28063 - 29211
 * ============================================================================
 */
class Task {
  _completeCount = 0;
  _completeTotal = 0;
  constructor(e) {
    if (Array.isArray(e)) {
      this.run = this.createMultiCallbackFunc(e);
    } else {
      this.run = this.createCallbackFunc(e);
    }
  }
  get isCompleted() {
    return this._completeCount == this._completeTotal;
  }
  run() {}
  createMultiCallbackFunc(e) {
    let t = [];
    for (let r = 0; r < e.length; r++) {
      t.push(this.createCallbackFunc(e[r]));
    }
    return function () {
      for (let r = 0; r < t.length; r++) {
        t[r]();
      }
    };
  }
  _onComplete() {
    this._completeCount++;
  }
  createCallbackFunc(e) {
    if (!e) {
      return () => {};
    }
    let t;
    this._completeTotal++;
    if (e.isRawShaderMaterial || e.isShaderMaterial) {
      t = this.createShaderMaterialFunc(e);
    } else if (e.isObject3D) {
      t = this.createCompileSceneFunc(e);
    } else if (e.isTexture) {
      t = this.createInitTextureFunc(e);
    } else {
      t = e.bind(this, this._onComplete);
    }
    return t;
  }
  createShaderMaterialFunc(e) {
    return function () {
      fboHelper._tri.material = e;
      let t = false;
      const r = () => {
        if (!t) {
          t = true;
          this._onComplete();
        }
      };
      setTimeout(r, 1500);
      try {
        properties.renderer.compileAsync(fboHelper._tri, properties.camera).then(r).catch(n => {
          console.warn("compileAsync shader err:", n);
          r();
        });
      } catch (n) {
        console.warn("compileAsync shader sync err:", n);
        r();
      }
    };
  }
  createCompileSceneFunc(e) {
    return function () {
      e.traverse(r => {
        r._tmpVisible = r.visible;
        r.visible = true;
      });
      let t = e.visible;
      e.visible = true;
      let r = false;
      const n = () => {
        if (!r) {
          r = true;
          e.traverse(a => {
            a.visible = a._tmpVisible;
          });
          e.visible = t;
          this._onComplete();
        }
      };
      setTimeout(n, 1500);
      try {
        properties.renderer.compileAsync(e, properties.camera).then(n).catch(a => {
          console.warn("compileAsync scene err:", a);
          n();
        });
      } catch (a) {
        console.warn("compileAsync scene sync err:", a);
        n();
      }
    };
  }
  createInitTextureFunc(e) {
    return function () {
      properties.renderer.initTexture(e);
      this._onComplete();
    };
  }
}
class TaskManager {
  percent = 1;
  taskList = [];
  _activeTaskList = [];
  _activeTaskIndex = 0;
  _needsStart = false;
  onCompleted = new MinSignal$2();
  start() {
    this._needsStart = true;
    this.percent = 0;
  }
  _start() {
    this._needsStart = false;
    this._activeTaskList = this.taskList.splice(0, this.taskList.length);
    this._activeTaskIndex = 0;
  }
  add(e) {
    if (!settings.SKIP_ANIMATION) {
      this.taskList.push(new Task(e));
    }
  }
  update() {
    if (this._needsStart) {
      this._start();
    }
    if (this._activeTaskList.length) {
      let e = this._activeTaskList[this._activeTaskIndex];
      if (e && !e.isCompleted) {
        this._activeTaskIndex++;
        this.percent = this._activeTaskIndex / this._activeTaskList.length;
        e.run();
      }
    } else {
      let e = this.percent;
      this.percent = 1;
      if (e < 1) {
        this.onCompleted.dispatch();
      }
    }
  }
}
const taskManager = new TaskManager();
class Page {
  domContainer;
  route = null;
  time = 0;
  showDuration = 1;
  hideDuration = 1;
  showRatio = 0;
  hideRatio = 0;
  _showPageTween;
  _hidePageTween;
  isActive = false;
  hasInitialized = false;
  hasExtraPages = true;
  hasEndVisual = true;
  endVisualColor = properties.blueColorHex;
  endVisualUseTextured = false;
  endSectionActiveThreshold = 0.9;
  useGenericTransition = true;
  isFirstShown = false;
  bypassShowingLoading = false;
  preUfxContainer = new Object3D();
  postUfxContainer = new Object3D();
  onShowStarted = new MinSignal$2();
  onShowCompleted = new MinSignal$2();
  onHideStarted = new MinSignal$2();
  onHideCompleted = new MinSignal$2();
  constructor() {
    this._showPageTween = new Tween(this);
    this._hidePageTween = new Tween(this);
  }
  get activeRatio() {
    return this.showRatio * (1 - this.hideRatio);
  }
  hasProject(e) {
    return false;
  }
  get isScrollTarget() {
    return pagesManager.scrollTargetPage === this;
  }
  preInit(e) {}
  preInitContent(e) {}
  init(e) {
    taskManager.add(this.preUfxContainer);
    taskManager.add(this.postUfxContainer);
  }
  initContent(e) {}
  show(e, t, r) {
    this._showPageTween.kill();
    this._showPageTween.onComplete = r;
    this.hideRatio = 0;
    this._showPageTween.fromTo(this.showDuration, {
      showRatio: 0
    }, {
      showRatio: 1
    });
  }
  hide(e, t, r) {
    if (this._hidePageTween) {
      this._hidePageTween.kill();
    }
    this._hidePageTween.onComplete = r;
    this._hidePageTween.fromTo(this.hideDuration, {
      hideRatio: 0
    }, {
      hideRatio: 1
    });
  }
  resize(e, t) {}
  update(e) {}
}
let self$1;
class Ease {
  quadIn(e) {
    return e * e;
  }
  quadOut(e) {
    return e * (2 - e);
  }
  quadOutIn(e) {
    if (e < 0.5) {
      return self$1.quadOut(e + e) * 0.5;
    } else {
      return self$1.quadIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quadInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e;
    } else {
      return (--e * (e - 2) - 1) * -0.5;
    }
  }
  cubicIn(e) {
    return e * e * e;
  }
  cubicOut(e) {
    return --e * e * e + 1;
  }
  cubicOutIn(e) {
    if (e < 0.5) {
      return self$1.cubicOut(e + e) * 0.5;
    } else {
      return self$1.cubicIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  cubicInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e;
    } else {
      return ((e -= 2) * e * e + 2) * 0.5;
    }
  }
  quartIn(e) {
    return e * e * e * e;
  }
  quartOut(e) {
    return 1 - --e * e * e * e;
  }
  quartOutIn(e) {
    if (e < 0.5) {
      return self$1.quartOut(e + e) * 0.5;
    } else {
      return self$1.quartIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quartInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e * e;
    } else {
      return ((e -= 2) * e * e * e - 2) * -0.5;
    }
  }
  quintIn(e) {
    return e * e * e * e * e;
  }
  quintOut(e) {
    return --e * e * e * e * e + 1;
  }
  quintOutIn(e) {
    if (e < 0.5) {
      return self$1.quintOut(e + e) * 0.5;
    } else {
      return self$1.quintIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  quintInOut(e) {
    if ((e *= 2) < 1) {
      return e * 0.5 * e * e * e * e;
    } else {
      return ((e -= 2) * e * e * e * e + 2) * 0.5;
    }
  }
  sineIn(e) {
    return 1 - Math.cos(e * Math.PI / 2);
  }
  sineOut(e) {
    return Math.sin(e * Math.PI / 2);
  }
  sineOutIn(e) {
    if (e < 0.5) {
      return self$1.sineOut(e + e) * 0.5;
    } else {
      return self$1.sineIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  sineInOut(e) {
    return (1 - Math.cos(Math.PI * e)) * 0.5;
  }
  expoIn(e) {
    if (e === 0) {
      return 0;
    } else {
      return Math.pow(1024, e - 1);
    }
  }
  expoOut(e) {
    if (e === 1) {
      return 1;
    } else {
      return 1 - Math.pow(2, e * -10);
    }
  }
  expoOutIn(e) {
    if (e < 0.5) {
      return self$1.expoOut(e + e) * 0.5;
    } else {
      return self$1.expoIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  expoInOut(e) {
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else if ((e *= 2) < 1) {
      return Math.pow(1024, e - 1) * 0.5;
    } else {
      return (-Math.pow(2, (e - 1) * -10) + 2) * 0.5;
    }
  }
  circIn(e) {
    return 1 - Math.sqrt(1 - e * e);
  }
  circOut(e) {
    return Math.sqrt(1 - --e * e);
  }
  circOutIn(e) {
    if (e < 0.5) {
      return self$1.circOut(e + e) * 0.5;
    } else {
      return self$1.circIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  circInOut(e) {
    if ((e *= 2) < 1) {
      return (Math.sqrt(1 - e * e) - 1) * -0.5;
    } else {
      return (Math.sqrt(1 - (e -= 2) * e) + 1) * 0.5;
    }
  }
  elasticIn(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      return -(r * Math.pow(2, (e -= 1) * 10) * Math.sin((e - t) * 2 * Math.PI / n));
    }
  }
  elasticOut(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      return r * Math.pow(2, e * -10) * Math.sin((e - t) * 2 * Math.PI / n) + 1;
    }
  }
  elasticOutIn(e) {
    if (e < 0.5) {
      return self$1.elasticOut(e + e) * 0.5;
    } else {
      return self$1.elasticIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  elasticInOut(e) {
    let t;
    let r = 0.1;
    let n = 0.4;
    if (e === 0) {
      return 0;
    } else if (e === 1) {
      return 1;
    } else {
      if (!r || r < 1) {
        r = 1;
        t = n / 4;
      } else {
        t = n * Math.asin(1 / r) / (Math.PI * 2);
      }
      if ((e *= 2) < 1) {
        return r * -0.5 * Math.pow(2, (e -= 1) * 10) * Math.sin((e - t) * 2 * Math.PI / n);
      } else {
        return r * Math.pow(2, (e -= 1) * -10) * Math.sin((e - t) * 2 * Math.PI / n) * 0.5 + 1;
      }
    }
  }
  backIn(e) {
    let t = 1.70158;
    return e * e * ((t + 1) * e - t);
  }
  backOut(e) {
    let t = 1.70158;
    return --e * e * ((t + 1) * e + t) + 1;
  }
  backOutIn(e) {
    if (e < 0.5) {
      return self$1.backOut(e + e) * 0.5;
    } else {
      return self$1.backIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  backInOut(e) {
    let t = 2.5949095;
    if ((e *= 2) < 1) {
      return e * 0.5 * e * ((t + 1) * e - t);
    } else {
      return ((e -= 2) * e * ((t + 1) * e + t) + 2) * 0.5;
    }
  }
  bounceIn(e) {
    return 1 - self$1.bounceOut(1 - e);
  }
  bounceOut(e) {
    if (e < 1 / 2.75) {
      return e * 7.5625 * e;
    } else if (e < 2 / 2.75) {
      return (e -= 1.5 / 2.75) * 7.5625 * e + 0.75;
    } else if (e < 2.5 / 2.75) {
      return (e -= 2.25 / 2.75) * 7.5625 * e + 0.9375;
    } else {
      return (e -= 2.625 / 2.75) * 7.5625 * e + 0.984375;
    }
  }
  bounceOutIn(e) {
    if (e < 0.5) {
      return self$1.bounceOut(e + e) * 0.5;
    } else {
      return self$1.bounceIn(e + e - 1) * 0.5 + 0.5;
    }
  }
  bounceInOut(e) {
    if (e < 0.5) {
      return self$1.bounceIn(e * 2) * 0.5;
    } else {
      return self$1.bounceOut(e * 2 - 1) * 0.5 + 0.5;
    }
  }
  lusion(e) {
    return self$1.cubicBezier(e, 0.35, 0, 0, 1);
  }
  cubicBezier(e, t, r, n, a) {
    if (e <= 0) {
      return 0;
    }
    if (e >= 1) {
      return 1;
    }
    if (t === r && n === a) {
      return e;
    }
    const l = (ce, z, j, X) => 1 / (z * 3 * ce * ce + j * 2 * ce + X);
    const c = (ce, z, j, X, Z) => z * (ce * ce * ce) + j * (ce * ce) + X * ce + Z;
    const u = (ce, z, j, X, Z) => {
      let q = ce * ce;
      return z * (q * ce) + j * q + X * ce + Z;
    };
    let f = 0;
    let p = 0;
    let g = t;
    let v = r;
    let _ = n;
    let T = a;
    let M = 1;
    let S = 1;
    let b = M - _ * 3 + g * 3 - f;
    let C = _ * 3 - g * 6 + f * 3;
    let w = g * 3 - f * 3;
    let R = f;
    let E = S - T * 3 + v * 3 - p;
    let I = T * 3 - v * 6 + p * 3;
    let F = v * 3 - p * 3;
    let k = p;
    let L = e;
    let D;
    let ne;
    let re;
    for (D = 0; D < 100; D++) {
      ne = c(L, b, C, w, R);
      re = l(L, b, C, w);
      if (re === Infinity) {
        re = e;
      }
      L -= (ne - e) * re;
      L = Math.min(Math.max(L, 0), 1);
    }
    return u(L, E, I, F, k);
  }
}
self$1 = new Ease();
const ease = self$1;
const vert$l = `#define GLSLIFY 1
attribute vec3 daoN;attribute vec3 daoP;attribute float ao;attribute float thickness;attribute vec3 SN;uniform vec3 u_lightPosition;uniform vec4 u_selfPositionRadius;uniform vec4 u_selfRotation;uniform float u_time;varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec3 v_smoothViewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_ao;varying float v_thickness;varying float v_selfShadow;vec3 qrotate(vec3 v,vec4 q){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){v_localPosition=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;vec3 worldPosition=(modelMatrix*vec4(position,1.)).xyz;vec4 invertedQuat=vec4(-u_selfRotation.xyz,u_selfRotation.w);vec3 L=(u_lightPosition-worldPosition)/u_selfPositionRadius.w;L=normalize(qrotate(L,invertedQuat));vec3 dao=mix(daoN,daoP,sign(L)*.5+.5);vec3 absDir=abs(L);float selfShadow=dot(absDir,dao)/(absDir.x+absDir.y+absDir.z);selfShadow=min(pow(selfShadow*3.,0.3)*1.45,1.);v_worldPosition=worldPosition;v_viewNormal=normalMatrix*normal;v_smoothViewNormal=normalMatrix*SN;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_ao=ao;v_thickness=thickness;v_selfShadow=selfShadow;}`;
const frag$p = `#define GLSLIFY 1
varying vec3 v_viewNormal;varying vec3 v_smoothViewNormal;varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_ao;varying float v_selfShadow;uniform vec4 u_nearPositionRadiusList[NEIGHBOUR_COUNT];uniform vec4 u_nearRotationList[NEIGHBOUR_COUNT];uniform vec3 u_nearColorList[NEIGHBOUR_COUNT];uniform vec2 u_nearTransparencyLumaList[NEIGHBOUR_COUNT];uniform float u_roughness;uniform vec3 u_bgColor;uniform vec3 u_color;uniform float u_time;uniform mat4 projectionMatrix;uniform sampler2D u_matcap;uniform vec3 u_lightPosition;const float PI=3.14159265359;const float RECIPROCAL_PI=0.31830988618;
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
varying float v_thickness;
#include <textureBicubic>
#include <getBlueNoise>
#ifdef IS_SEMITRANSPARENT_BACK
uniform sampler2D u_sceneTexture;
#endif
#ifdef IS_SEMITRANSPARENT
uniform sampler2D u_sceneTexture;uniform sampler2D u_blurredTextures[4];uniform vec2 u_blurredTextureSizes[4];vec4 lodSample(vec2 uv,float lod){lod=clamp(lod,1.,3.999);float lodFloor=floor(lod);float lodFract=lod-lodFloor;vec4 mapFrom;vec4 mapTo;if(lodFloor<1.5){mapFrom=textureBicubic(u_blurredTextures[0],uv,u_blurredTextureSizes[0]);mapTo=textureBicubic(u_blurredTextures[1],uv,u_blurredTextureSizes[1]);}else if(lodFloor<2.5){mapFrom=textureBicubic(u_blurredTextures[1],uv,u_blurredTextureSizes[1]);mapTo=textureBicubic(u_blurredTextures[2],uv,u_blurredTextureSizes[2]);}else{mapFrom=textureBicubic(u_blurredTextures[2],uv,u_blurredTextureSizes[2]);mapTo=textureBicubic(u_blurredTextures[3],uv,u_blurredTextureSizes[3]);}return mix(mapFrom,mapTo,lodFract);}
#endif
uniform float u_sss;uniform vec3 u_sssColor;vec3 qrotate(vec3 v,vec4 q){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}float cylIntersect(in vec3 ro,in vec3 rd,in vec3 a,in vec3 b,float ra){vec3 ba=b-a;vec3 oc=ro-a;float baba=dot(ba,ba);float bard=dot(ba,rd);float baoc=dot(ba,oc);float k2=baba-bard*bard;float k1=baba*dot(oc,rd)-baoc*bard;float k0=baba*dot(oc,oc)-baoc*baoc-ra*ra*baba;float h=k1*k1-k2*k0;if(h>=0.){h=sqrt(h);float t=(-k1-h)/k2;float y=baoc+t*bard;if(y>0.0&&y<baba)return t;t=(((y<0.0)? 0.0 : baba)-baoc)/bard;if(abs(k1+k2*t)<h){return t;}}return 200.;}bool centerSphereHitTest(in vec3 ro,in vec3 rd,in float r){float b=dot(ro,rd);float c=dot(ro,ro)-r*r;return b*b-c>=0.0;}vec3 getCrossAoShadowIntersect(in vec3 p,in vec3 n,in vec3 l,in vec3 refl,in vec4 objPosRadius,in vec4 quaternion,in float intersectDist){float ao=1.0;float shadow=1.0;float intersect=100.0;float R=0.666667*objPosRadius.w;float r=0.333333*objPosRadius.w;vec3 centerPos=objPosRadius.xyz;vec3 invertedPosOffset=-objPosRadius.xyz;vec4 invertedQuat=vec4(-quaternion.xyz,quaternion.w);p=qrotate(p+invertedPosOffset,invertedQuat);l=normalize(qrotate(l+invertedPosOffset,invertedQuat));n=qrotate(n,invertedQuat);refl=qrotate(refl,invertedQuat);vec3 ro=p,pa=vec3(-R),pb=vec3(R);float k=1.;vec3 ba=pb-pa;vec3 oa=ro-pa;vec3 oaX=vec3(oa.x,ro.y,ro.z);vec3 oaY=vec3(ro.x,oa.y,ro.z);vec3 oaZ=vec3(ro.x,ro.y,oa.z);vec3 baba=ba*ba;vec3 oaba=oa*ba;vec3 h3=clamp(oaba/baba,vec3(0.),vec3(1.));vec3 odX=oaX-vec3(h3.x*ba.x,0.,0.);vec3 odY=oaY-vec3(0.,h3.y*ba.y,0.);vec3 odZ=oaZ-vec3(0.,0.,h3.z*ba.z);vec3 dl3=vec3(length(odX),length(odY),length(odZ));vec3 o3=vec3(1.)-saturate(vec3(dot(-odX,n),dot(-odY,n),dot(-odZ,n))*r*r/(dl3*dl3*dl3));o3=sqrt(o3*o3*o3);ao=o3.x*o3.y*o3.z;vec3 oad=vec3(dot(oaX,l),dot(oaY,l),dot(oaZ,l));vec3 dba=l*ba;vec3 thDiv=1./(baba-dba*dba);vec3 thX3=max((-oad*baba+dba*oaba)*thDiv,vec3(0.0001));vec3 thY3=saturate((oaba-oad*dba)*thDiv);vec3 pp=pa+ba*thY3;vec3 qqX=ro+l*thX3.x;vec3 qqY=ro+l*thX3.y;vec3 qqZ=ro+l*thX3.z;vec3 dd=vec3(length(vec3(pp.x,0.,0.)-qqX),length(vec3(0.,pp.y,0.)-qqY),length(vec3(0.,0.,pp.z)-qqZ))-r;vec3 s=saturate(k*dd/thX3+0.5);s=s*s*(3.0-2.0*s);shadow=s.x*s.y*s.z;vec3 a;vec3 b;r*=0.9;if((intersectDist+2.05>length(p)-objPosRadius.w)&&centerSphereHitTest(ro,refl,objPosRadius.w*1.1)){a=vec3(-objPosRadius.w,0.0,0.0);b=vec3(objPosRadius.w,0.0,0.0);intersect=min(intersect,cylIntersect(p,refl,a,b,r));a=vec3(0.0,-objPosRadius.w,0.0);b=vec3(0.0,objPosRadius.w,0.0);intersect=min(intersect,cylIntersect(p,refl,a,b,r));a=vec3(0.0,0.0,-objPosRadius.w);b=vec3(0.0,0.0,objPosRadius.w);intersect=min(intersect,cylIntersect(p,refl,a,b,r));}return vec3(ao,shadow,intersect);}vec2 getUvFromPos(vec3 v){vec4 ndcPos=projectionMatrix*viewMatrix*vec4(v,1.0);vec2 refractionCoords=ndcPos.xy/ndcPos.w;refractionCoords+=1.0;refractionCoords/=2.0;return refractionCoords;}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 filmicToneMapping(vec3 color){color=max(vec3(0.),color-vec3(0.004));color=(color*(6.2*color+.5))/(color*(6.2*color+1.7)+0.06);return color;}vec3 hueShift(vec3 color,float hue){const vec3 k=vec3(0.57735,0.57735,0.57735);float cosAngle=cos(hue);return vec3(color*cosAngle+cross(k,color)*sin(hue)+k*dot(k,color)*(1.0-cosAngle));}vec3 hue2RGBSmooth(in float hue){vec3 rgb=clamp(abs(mod(hue*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return rgb*rgb*(3.0-2.0*rgb);}void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+vec2(3.,9.));vec3 blueNoise2=getBlueNoise(gl_FragCoord.xy+vec2(56.,39.));float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 viewNormal=faceDirection*normalize(v_viewNormal);vec3 smoothViewNormal=faceDirection*normalize(v_smoothViewNormal);vec3 V=normalize(cameraPosition-v_worldPosition);vec3 N=inverseTransformDirection(viewNormal,viewMatrix);vec3 SN=inverseTransformDirection(smoothViewNormal,viewMatrix);float roughness=min(0.9,u_roughness+dot(vec3(1.0),fwidth((viewNormal))));vec3 reflectView=reflect(-V,N);vec3 reflectViewBN=normalize(reflectView+(blueNoise-.5)*(roughness>0.5 ? 0.5 : 0.01));vec3 worldToLight=u_lightPosition-v_worldPosition;vec3 L=normalize(worldToLight);float NdV=clamp(abs(dot(N,V)),0.001,1.0);float NdL=clamp(dot(N,L),0.001,1.0);vec3 gi=vec3(1.0);vec4 reflections=vec4(0.,0.,0.,100.);float ao=1.0;float shadow=1.0;float alpha=0.0;vec3 albedo=vec3(1.0);for(int i=0;i<NEIGHBOUR_COUNT;i++){vec3 nearColor=u_nearColorList[i];vec2 nearTransparencyLuma=u_nearTransparencyLumaList[i].xy;vec3 aoShadowIntersect=getCrossAoShadowIntersect(v_worldPosition,N,worldToLight,reflectViewBN,u_nearPositionRadiusList[i],u_nearRotationList[i],reflections.w);float _ao=aoShadowIntersect.r;_ao=saturate(_ao+0.5*nearTransparencyLuma.x);ao*=_ao;shadow*=aoShadowIntersect.g;gi+=(1.0-0.9*nearTransparencyLuma.y)*nearColor*3.0*min(1.,(1.0-_ao*_ao)/0.7);float neighNearFarDist=aoShadowIntersect.b;if(neighNearFarDist<reflections.w&&neighNearFarDist>0.0001){reflections=vec4(vec3((1.0-0.5*nearTransparencyLuma.x)*nearColor),neighNearFarDist);}}reflections.rgb*=1./((0.2+roughness*0.8)*reflections.w*10.+4.);reflections=reflections*ao*v_ao;gi/=float(NEIGHBOUR_COUNT);
#if defined(IS_SEMITRANSPARENT) || defined(IS_SEMITRANSPARENT_BACK)
float ior=2.4;
#ifdef IS_SEMITRANSPARENT
vec3 refractionVector=refract(-V,SN,1.0/ior);vec2 refractionCoords=getUvFromPos(v_worldPosition+refractionVector*0.3);float lod=2.5+v_thickness;vec4 blur=lodSample(refractionCoords,lod);albedo=blur.rgb*(0.75+u_color*0.4);albedo=albedo*0.8+(0.125+0.2*v_selfShadow*v_ao)*u_color;
#else
vec3 refractionVector=refract(-V,-N,ior);vec2 refractionCoords=getUvFromPos(v_worldPosition+refractionVector*ao*0.5);albedo=texture2D(u_sceneTexture,refractionCoords).rgb;albedo=albedo*0.5+(0.05+0.2*v_selfShadow*v_ao)*u_color;
#endif
#endif
albedo*=u_color;vec3 viewDir=normalize(v_viewPosition);vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);
#ifdef IS_SEMITRANSPARENT
vec2 uvPerturbed=vec2(dot(x,smoothViewNormal),dot(y,smoothViewNormal))*0.5+0.5;
#else
vec2 uvPerturbed=vec2(dot(x,viewNormal),dot(y,viewNormal))*0.5+0.5;
#endif
vec3 matcapMap=texture2D(u_matcap,uvPerturbed).rgb;vec3 matcapDiff=vec3(matcapMap.r);vec3 matcapSpec=vec3(roughness>.5 ? matcapMap.g : matcapMap.b);reflections.rgb*=0.75+0.25*shadow*v_selfShadow;matcapDiff=0.25+0.75*matcapDiff;matcapSpec=matcapSpec;shadow=0.6+0.4*shadow;float selfShadow=v_selfShadow;vec3 color;
#if defined(IS_SEMITRANSPARENT) || defined(IS_SEMITRANSPARENT_BACK)
float fresnel=(1.0-clamp(abs(dot(normalize(N+SN),V)),0.001,1.0))*(1.-v_thickness);color=albedo;color+=0.15*matcapDiff;color+=fresnel*albedo*0.5;
#ifdef IS_SEMITRANSPARENT
color+=reflections.rgb;color+=hue2RGBSmooth(viewNormal.z*v_ao*1.5)*pow(1.-v_thickness*0.75,2.)*max(vec3(0.),1.-matcapDiff)*0.2*dot(albedo,vec3(0.299,0.587,0.114));
#endif
color*=(selfShadow*0.35+0.65);color*=(ao*shadow*0.75+0.25);;
#else
color=albedo*matcapDiff+matcapSpec;color+=reflections.rgb;color*=ao;color+=gi;color*=selfShadow;color*=shadow;
#endif
gl_FragColor.rgb=color;gl_FragColor.a=max(0.,dot(color,vec3(0.299,0.587,0.114))*1.5-1.);gl_FragColor.rgb=filmicToneMapping(pow(gl_FragColor.rgb,vec3(2.2)));}`;
const prePassVert = `#define GLSLIFY 1
void main(){gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.);gl_Position.z+=0.002/gl_Position.w;}`;
const prePassFrag = `#define GLSLIFY 1
void main(){gl_FragColor=vec4(1.);}`;
class Stage3D extends Scene {
  wasActive = null;
  isActive = null;
  constructor(e = {}) {
    super();
    Object.assign(this, {
      defaultCameraPosition: new Vector3(0, 0, 5),
      defaultLookAtPosition: new Vector3(0, 0, 0),
      properties: {}
    }, e);
  }
  preInit() {}
  init() {}
  resize(e, t) {}
  syncProperties(e) {}
  update(e) {}
}
const blur9VaryingVertexShader = `#define GLSLIFY 1
attribute vec3 position;uniform vec2 u_delta;varying vec2 v_uv[9];void main(){vec2 uv=position.xy*0.5+0.5;v_uv[0]=uv;vec2 delta=u_delta;v_uv[1]=uv-delta;v_uv[2]=uv+delta;delta+=u_delta;v_uv[3]=uv-delta;v_uv[4]=uv+delta;delta+=u_delta;v_uv[5]=uv-delta;v_uv[6]=uv+delta;delta+=u_delta;v_uv[7]=uv-delta;v_uv[8]=uv+delta;gl_Position=vec4(position,1.0);}`;
const blur9VaryingFragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv[9];void main(){vec4 color=texture2D(u_texture,v_uv[0])*0.1633;color+=texture2D(u_texture,v_uv[1])*0.1531;color+=texture2D(u_texture,v_uv[2])*0.1531;color+=texture2D(u_texture,v_uv[3])*0.12245;color+=texture2D(u_texture,v_uv[4])*0.12245;color+=texture2D(u_texture,v_uv[5])*0.0918;color+=texture2D(u_texture,v_uv[6])*0.0918;color+=texture2D(u_texture,v_uv[7])*0.051;color+=texture2D(u_texture,v_uv[8])*0.051;gl_FragColor=color;}`;
const blur9FragmentShader = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_delta;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv)*0.1633;vec2 delta=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.1531;color+=texture2D(u_texture,v_uv+delta)*0.1531;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.12245;color+=texture2D(u_texture,v_uv+delta)*0.12245;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.0918;color+=texture2D(u_texture,v_uv+delta)*0.0918;delta+=u_delta;color+=texture2D(u_texture,v_uv-delta)*0.051;color+=texture2D(u_texture,v_uv+delta)*0.051;gl_FragColor=color;}`;
class Blur {
  material = null;
  getBlur9Material() {
    let e = fboHelper.MAX_VARYING_VECTORS > 8;
    this.blur9Material ||= fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_delta: {
          value: new Vector2()
        }
      },
      vertexShader: e ? fboHelper.precisionPrefix + blur9VaryingVertexShader : fboHelper.vertexShader,
      fragmentShader: fboHelper.precisionPrefix + (e ? blur9VaryingFragmentShader : blur9FragmentShader),
      depthWrite: false,
      depthTest: false
    });
    return this.blur9Material;
  }
  blur(e, t, r, n, a, l) {
    let c = 0.25;
    let u = Math.ceil(r.width * t) || 0;
    let f = Math.ceil(r.height * t) || 0;
    this.material ||= this.getBlur9Material();
    if (!n) {
      console.warn("You have to pass intermediateRenderTarget to blur");
    }
    if (u !== n.width || f !== n.height) {
      n.setSize(u, f);
    }
    if (a) {
      if (!l) {
        a.setSize(r.width, r.height);
      }
    } else {
      a = r;
    }
    this.material.uniforms.u_texture.value = r.texture || r;
    this.material.uniforms.u_delta.value.set(e / u * c, 0);
    fboHelper.render(this.material, n);
    this.material.uniforms.u_texture.value = n.texture || n;
    this.material.uniforms.u_delta.value.set(0, e / f * c);
    fboHelper.render(this.material, a);
  }
}
const blur = new Blur();
class ShaderHelper {
  glslifyStrip(e) {
    return e.replace(/#define\sGLSLIFY\s./, "");
  }
  addChunk(e, t) {
    ShaderChunk[e] = this.glslifyStrip(t);
  }
  _wrapInclude(e) {
    return "#include <" + e + ">";
  }
  insertBefore(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(t, `${this.glslifyStrip(r)}
${a}`);
  }
  insertAfter(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(a, `${a}
${this.glslifyStrip(r)}
`);
  }
  replace(e, t, r, n) {
    const a = n ? this._wrapInclude(t) : t;
    return e.replace(a, `
${this.glslifyStrip(r)}
`);
  }
}
const shaderHelper = new ShaderHelper();
const getBlueNoiseShader = `#define GLSLIFY 1
uniform sampler2D u_blueNoiseTexture;uniform vec2 u_blueNoiseTexelSize;uniform vec2 u_blueNoiseCoordOffset;vec3 getBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize+u_blueNoiseCoordOffset).rgb;}vec3 getStaticBlueNoise(vec2 coord){return texture2D(u_blueNoiseTexture,coord*u_blueNoiseTexelSize).rgb;}`;
class BlueNoise {
  sharedUniforms = {
    u_blueNoiseTexture: {
      value: null
    },
    u_blueNoiseLinearTexture: {
      value: null
    },
    u_blueNoiseTexelSize: {
      value: null
    },
    u_blueNoiseCoordOffset: {
      value: new Vector2()
    }
  };
  TEXTURE_SIZE = 128;
  preInit() {
    let e = new Texture();
    e.generateMipmaps = false;
    e.minFilter = e.magFilter = LinearFilter;
    e.wrapS = e.wrapT = RepeatWrapping;
    let t = new Texture(properties.loader.add(settings.TEXTURE_PATH + "LDR_RGB1_0.png", {
      weight: 55,
      onLoad: function () {
        t.needsUpdate = true;
        e.needsUpdate = true;
      }
    }).content);
    e.image = t.image;
    t.generateMipmaps = false;
    t.minFilter = t.magFilter = NearestFilter;
    t.wrapS = t.wrapT = RepeatWrapping;
    this.sharedUniforms.u_blueNoiseTexture.value = t;
    this.sharedUniforms.u_blueNoiseLinearTexture.value = e;
    this.sharedUniforms.u_blueNoiseTexelSize.value = new Vector2(1 / this.TEXTURE_SIZE, 1 / this.TEXTURE_SIZE);
    shaderHelper.addChunk("getBlueNoise", getBlueNoiseShader);
  }
  update(e) {
    this.sharedUniforms.u_blueNoiseCoordOffset.value.set(Math.random(), Math.random());
  }
}
const blueNoise = new BlueNoise();
const COLORS$1 = settings.BALLOON_COLOR ? ["#" + settings.BALLOON_COLOR] : ["#061dfb", "#ADFF00", "#f6000e", "#7e09f5", "#ffc000"];
const colorIndex = Math.floor(Math.random() * COLORS$1.length);
const fancyColor = COLORS$1[colorIndex];
const _c$1 = new Color(fancyColor);
_c$1.offsetHSL(0, 0, 0.5);
let SOFT_PLASTIC;
let HARD_PLASTIC;
let GLASS;
let STONE;
SOFT_PLASTIC = HARD_PLASTIC = GLASS = STONE = {
  density: 1,
  friction: 2,
  restitution: 0.8
};
let sphereData = [{
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: fancyColor,
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: true,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...SOFT_PLASTIC
}, {
  color: "#ffffff",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: true,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...STONE
}, {
  color: "#111",
  sss: 0,
  sssColor: "#111",
  isSemitransparent: false,
  isRough: false,
  isColored: false,
  isBlackWhite: false,
  radius: 1,
  ...HARD_PLASTIC
}];
if (!browser$1.isMobile) {
  sphereData.push({
    color: "#fff",
    sss: 0,
    sssColor: "#111",
    isSemitransparent: true,
    isRough: true,
    isColored: false,
    isBlackWhite: true,
    radius: 1,
    ...GLASS
  }, {
    color: "#" + _c$1.getHexString(),
    sss: 0,
    sssColor: "#111",
    isSemitransparent: true,
    isRough: true,
    isColored: true,
    isBlackWhite: false,
    radius: 1,
    ...GLASS
  });
}
const SPHERES_DATA = sphereData;
const vert$k = `#define GLSLIFY 1
uniform vec2 u_clipScale;uniform vec2 u_clipOffset;varying vec2 v_uv;void main(){vec3 pos=position;vec3 absPos=abs(position);if(max(absPos.x,absPos.y)<0.9){pos.xy=pos.xy*u_clipScale+u_clipOffset;pos*=2.;}gl_Position=vec4(pos,1.0);v_uv=vec2(pos.x,pos.y)*0.5+0.5;}`;
const frag$o = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform vec3 u_colorPaint;uniform float u_aspect;uniform vec2 u_smooth;uniform vec2 u_resolution;uniform float u_activeRatio;uniform sampler2D u_screenPaintTexture;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec2 q=vec2(v_uv-0.5);q.x*=u_aspect;float dst=length(q);dst=smoothstep(u_smooth.x,u_smooth.y,dst);vec3 color=mix(u_color0,u_color1,0.925+0.075*dst);color+=noise*0.004;gl_FragColor.rgb=color;gl_FragColor.a=0.0;}`;
const frag$n = `#define GLSLIFY 1
uniform sampler2D u_lowPaintTexture;uniform sampler2D u_prevPaintTexture;uniform vec2 u_paintTexelSize;uniform vec2 u_scrollOffset;uniform vec4 u_drawFrom;uniform vec4 u_drawTo;uniform float u_pushStrength;uniform vec3 u_dissipations;uniform vec2 u_vel;varying vec2 v_uv;vec2 sdSegment(in vec2 p,in vec2 a,in vec2 b){vec2 pa=p-a,ba=b-a;float h=clamp(dot(pa,ba)/dot(ba,ba),0.0,1.0);return vec2(length(pa-ba*h),h);}
#ifdef USE_NOISE
uniform float u_curlScale;uniform float u_curlStrength;vec2 hash(vec2 p){vec3 p3=fract(vec3(p.xyx)*vec3(.1031,.1030,.0973));p3+=dot(p3,p3.yzx+33.33);return fract((p3.xx+p3.yz)*p3.zy)*2.0-1.0;}vec3 noised(in vec2 p){vec2 i=floor(p);vec2 f=fract(p);vec2 u=f*f*f*(f*(f*6.0-15.0)+10.0);vec2 du=30.0*f*f*(f*(f-2.0)+1.0);vec2 ga=hash(i+vec2(0.0,0.0));vec2 gb=hash(i+vec2(1.0,0.0));vec2 gc=hash(i+vec2(0.0,1.0));vec2 gd=hash(i+vec2(1.0,1.0));float va=dot(ga,f-vec2(0.0,0.0));float vb=dot(gb,f-vec2(1.0,0.0));float vc=dot(gc,f-vec2(0.0,1.0));float vd=dot(gd,f-vec2(1.0,1.0));return vec3(va+u.x*(vb-va)+u.y*(vc-va)+u.x*u.y*(va-vb-vc+vd),ga+u.x*(gb-ga)+u.y*(gc-ga)+u.x*u.y*(ga-gb-gc+gd)+du*(u.yx*(va-vb-vc+vd)+vec2(vb,vc)-va));}
#endif
void main(){vec2 res=sdSegment(gl_FragCoord.xy,u_drawFrom.xy,u_drawTo.xy);vec2 radiusWeight=mix(u_drawFrom.zw,u_drawTo.zw,res.y);float d=1.0-smoothstep(-0.01,radiusWeight.x,res.x);vec4 lowData=texture2D(u_lowPaintTexture,v_uv-u_scrollOffset);vec2 velInv=(0.5-lowData.xy)*u_pushStrength;
#ifdef USE_NOISE
vec3 noise3=noised(gl_FragCoord.xy*u_curlScale*(1.0-lowData.xy));vec2 noise=noised(gl_FragCoord.xy*u_curlScale*(2.0-lowData.xy*(0.5+noise3.x)+noise3.yz*0.1)).yz;velInv+=noise*(lowData.z+lowData.w)*u_curlStrength;
#endif
vec4 data=texture2D(u_prevPaintTexture,v_uv-u_scrollOffset+velInv*u_paintTexelSize);data.xy-=0.5;vec4 delta=(u_dissipations.xxyz-1.0)*data;vec2 newVel=u_vel*d;delta+=vec4(newVel,radiusWeight.yy*d);delta.zw=sign(delta.zw)*max(vec2(0.004),abs(delta.zw));data+=delta;data.xy+=0.5;gl_FragColor=clamp(data,vec4(0.0),vec4(1.0));}`;
let _v$4 = new Vector2();
class ScreenPaint {
  _lowRenderTarget;
  _lowBlurRenderTarget;
  _prevPaintRenderTarget;
  _currPaintRenderTarget;
  _material;
  _material2;
  _distortionMaterial;
  _fromDrawData;
  _toDrawData;
  drawEnabled = true;
  needsMouseDown = false;
  enabled = true;
  minRadius = 0;
  maxRadius = 100;
  radiusDistanceRange = 100;
  pushStrength = 25;
  accelerationDissipation = 0.8;
  velocityDissipation = 0.985;
  weight1Dissipation = 0.985;
  weight2Dissipation = 0.5;
  useNoise = false;
  curlScale = 0.1;
  curlStrength = 5;
  _prevUseNoise = null;
  sharedUniforms = {
    u_paintTexelSize: {
      value: new Vector2()
    },
    u_paintTextureSize: {
      value: new Vector2()
    },
    u_prevPaintTexture: {
      value: null
    },
    u_currPaintTexture: {
      value: null
    },
    u_lowPaintTexture: {
      value: null
    }
  };
  init() {
    this._lowRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._lowBlurRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._prevPaintRenderTarget = fboHelper.createRenderTarget(1, 1);
    this._currPaintRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.sharedUniforms.u_lowPaintTexture.value = this._lowRenderTarget.texture;
    this._material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_lowPaintTexture: {
          value: this._lowRenderTarget.texture
        },
        u_prevPaintTexture: this.sharedUniforms.u_prevPaintTexture,
        u_paintTexelSize: this.sharedUniforms.u_paintTexelSize,
        u_drawFrom: {
          value: this._fromDrawData = new Vector4(0, 0, 0, 0)
        },
        u_drawTo: {
          value: this._toDrawData = new Vector4(0, 0, 0, 0)
        },
        u_pushStrength: {
          value: 0
        },
        u_curlScale: {
          value: 0
        },
        u_curlStrength: {
          value: 0
        },
        u_vel: {
          value: new Vector2()
        },
        u_dissipations: {
          value: new Vector3()
        },
        u_scrollOffset: {
          value: new Vector2()
        }
      },
      fragmentShader: frag$n
    });
  }
  resize(e, t) {
    let r = e >> 2;
    let n = t >> 2;
    let a = e >> 3;
    let l = t >> 3;
    if (r !== this._currPaintRenderTarget.width || n !== this._currPaintRenderTarget.height) {
      this._currPaintRenderTarget.setSize(r, n);
      this._prevPaintRenderTarget.setSize(r, n);
      this._lowRenderTarget.setSize(a, l);
      this._lowBlurRenderTarget.setSize(a, l);
      this.sharedUniforms.u_paintTexelSize.value.set(1 / r, 1 / n);
      this.sharedUniforms.u_paintTextureSize.value.set(r, n);
      this.clear();
    }
  }
  clear = () => {
    fboHelper.clearColor(0.5, 0.5, 0, 0, this._lowRenderTarget);
    fboHelper.clearColor(0.5, 0.5, 0, 0, this._lowBlurRenderTarget);
    fboHelper.clearColor(0.5, 0.5, 0, 0, this._currPaintRenderTarget);
    this._material.uniforms.u_vel.value.set(0, 0);
  };
  update(e) {
    if (!this.enabled) {
      return;
    }
    if (this.useNoise !== this._prevUseNoise) {
      this._material.defines.USE_NOISE = this.useNoise;
      this._material.needsUpdate = true;
      this._prevUseNoise = this.useNoise;
    }
    let t = this._currPaintRenderTarget.width;
    let r = this._currPaintRenderTarget.height;
    let n = this._prevPaintRenderTarget;
    this._prevPaintRenderTarget = this._currPaintRenderTarget;
    this._currPaintRenderTarget = n;
    this.sharedUniforms.u_prevPaintTexture.value = this._prevPaintRenderTarget.texture;
    this.sharedUniforms.u_currPaintTexture.value = this._currPaintRenderTarget.texture;
    let a = scrollManager.scrollViewDelta * properties.screenPaintOffsetRatio;
    let l = scrollManager.isVertical ? 0 : a;
    let c = scrollManager.isVertical ? a : 0;
    _v$4.copy(input.mousePixelXY);
    _v$4.x += l * properties.viewportWidth * 3;
    _v$4.y += c * properties.viewportHeight * 3;
    let u = _v$4.distanceTo(input.prevMousePixelXY);
    let f = math.fit(u, 0, this.radiusDistanceRange, this.minRadius, this.maxRadius);
    if (Math.abs(scrollManager.scrollViewDelta) == 0 && (!input.hadMoved || !this.drawEnabled || (this.needsMouseDown || browser$1.isMobile) && (!input.isDown || !input.wasDown))) {
      f = 0;
    }
    f = f / properties.viewportHeight * r;
    this._material.uniforms.u_pushStrength.value = this.pushStrength;
    this._material.uniforms.u_curlScale.value = this.curlScale;
    this._material.uniforms.u_curlStrength.value = this.curlStrength;
    this._material.uniforms.u_dissipations.value.set(this.velocityDissipation, this.weight1Dissipation, this.weight2Dissipation);
    this._fromDrawData.copy(this._toDrawData);
    _v$4.copy(input.mouseXY);
    _v$4.x += l;
    _v$4.y += c;
    this._toDrawData.set((_v$4.x + 1) * t / 2, (_v$4.y + 1) * r / 2, f, 1);
    _v$4.set(this._toDrawData.x - this._fromDrawData.x, this._toDrawData.y - this._fromDrawData.y).multiplyScalar(e * 0.8);
    this._material.uniforms.u_vel.value.multiplyScalar(this.accelerationDissipation).add(_v$4);
    this._material.uniforms.u_scrollOffset.value.y = l;
    this._material.uniforms.u_scrollOffset.value.y = c;
    fboHelper.render(this._material, this._currPaintRenderTarget);
    fboHelper.copy(this._currPaintRenderTarget.texture, this._lowRenderTarget);
    blur.blur(8, 1, this._lowRenderTarget, this._lowBlurRenderTarget);
  }
}
const screenPaint = new ScreenPaint();
