/**
 * ============================================================================
 * Lusion Modular Component: 08-ufx-mesh-line
 * File: src/components/common/UfxMeshAndLine.js
 * Description: UfxMesh & Line (3D Procedural Ribbon Lines)
 * Original Engine Lines: 31387 - 32187
 * ============================================================================
 */
class UfxMesh extends Mesh {
  pivot = new Vector2();
  paddingL = 0;
  paddingR = 0;
  paddingT = 0;
  paddingB = 0;
  refDom;
  requireBg;
  tick = 0;
  _domX = 0;
  _domY = 0;
  _domWidth = 0;
  _domHeight = 0;
  _capturedOffsetX = 0;
  _capturedOffsetY = 0;
  constructor(e = {}) {
    let t = e.geometry || new PlaneGeometry(1, 1, e.segX || 1, e.segY || 1).translate(0.5, 0.5, 0);
    t.computeBoundingBox();
    super(t, e.material);
    this.refDom = e.refDom;
    this.pivot = e.pivot || new Vector2(0.5, 0.5);
    this.matrixAutoUpdate = false;
    this.frustumCulled = false;
    this.requireBg = e.requireBg === true;
    this.paddingL = e.paddingL || 0;
    this.paddingR = e.paddingR || 0;
    this.paddingT = e.paddingT || 0;
    this.paddingB = e.paddingB || 0;
    this._initMaterial(e);
    this.onBeforeRender = this._onBeforeRender.bind(this);
  }
  _onBeforeRender() {
    if (this.requireBg) {
      let e = fboHelper.renderer;
      let t = e.getRenderTarget();
      fboHelper.clearMultisampleRenderTargetState();
      fboHelper.copy(properties.postprocessing.sceneTexture, properties.postprocessing.fromRenderTarget);
      e.setRenderTarget(t);
    }
  }
  _initMaterial(e) {
    if (this.material != e.material) {
      this.material = new ShaderMaterial({
        vertexShader: e.vertexShader || quadVert,
        fragmentShader: e.fragmentShader || quadFrag
      });
      this.material.side = DoubleSide;
      this.material.transparent = true;
    }
    for (let r in e) {
      if (this.material[r] !== undefined) {
        this.material[r] = e[r];
      }
    }
    this.material.extensions.derivatives = true;
    let t = this.material.uniforms;
    if (t) {
      t.u_position = {
        value: this.position
      };
      t.u_quaternion = {
        value: this.quaternion
      };
      t.u_scale = {
        value: this.scale
      };
      t.u_domXY = {
        value: new Vector2()
      };
      t.u_domWH = {
        value: new Vector2()
      };
      t.u_domPivot = {
        value: new Vector2()
      };
      t.u_domPadding = {
        value: new Vector4()
      };
      t.u_bgTexture = properties.postprocessing.sharedUniforms.u_fromTexture;
      t.u_resolution = properties.postprocessing.sharedUniforms.u_resolution;
      t.u_viewportResolution = properties.sharedUniforms.u_viewportResolution;
    }
  }
  syncDom(e = 0, t = 0) {
    if (this.refDom) {
      let r = this.refDom.getBoundingClientRect();
      this.syncRect(r.left, r.top, Math.ceil(r.width), Math.ceil(r.height), e, t);
    } else {
      console.warn("refDom is missing");
    }
  }
  syncRect(e, t, r, n, a = 0, l = 0) {
    this._domX = e;
    this._domY = t;
    this._domWidth = Math.ceil(r);
    this._domHeight = Math.ceil(n);
    this.material.uniforms.u_domWH.value.set(this._domWidth, this._domHeight);
    this._capturedOffsetY = a;
    this._capturedOffsetX = l;
  }
  testViewport(e = 0, t = 0) {
    let r = this._domX - this._capturedOffsetX + t;
    let n = r + this._domWidth;
    let a = this._domY - this._capturedOffsetY + e;
    let l = a + this._domHeight;
    return a < properties.viewportHeight && l > 0 && r < properties.viewportWidth && n > 0;
  }
  update(e = 0, t = 0) {
    let r = this.material.uniforms;
    r.u_domXY.value.set(this._domX - this._capturedOffsetX + t, this._domY - this._capturedOffsetY + e);
    r.u_domPivot.value.set(this._domWidth * this.pivot.x, this._domHeight * this.pivot.y);
    r.u_domPadding.value.set(this.paddingL, this.paddingR, this.paddingT, this.paddingB);
    this.tick++;
  }
}
const videoVert = `#define GLSLIFY 1
uniform vec3 u_position;uniform vec4 u_quaternion;uniform vec3 u_scale;uniform vec2 u_domXYFrom;uniform vec2 u_domWHFrom;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_domPivot;uniform vec4 u_domPadding;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;varying float v_deltaRatio;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec3 getBasePosition(in vec3 pos,in vec2 domWH){vec3 basePos=vec3((pos.xy)*domWH-u_domPivot,pos.z);basePos.xy+=mix(-u_domPadding.xz,u_domPadding.yw,pos.xy);return basePos;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 getScreenPosition(in vec3 basePos,in vec2 domXY){vec3 screenPos=qrotate(u_quaternion,basePos*u_scale)+vec3(u_domPivot.xy,0.);screenPos=(screenPos+vec3(domXY,0.)+u_position)*vec3(1.,-1.,1.);return screenPos;}float cubicBezier(float p0,float p1,float p2,float p3,float t){float c=(p1-p0)*3.;float b=(p2-p1)*3.-c;float a=p3-p0-c-b;float t2=t*t;float t3=t2*t;return a*t3+b*t2+c*t+p0;}float easeOutBack(float t){return cubicBezier(0.,1.3,1.1,1.,t);}void main(){float placementWeight=1.-(pow(position.x*position.x,0.75)+pow(1.-position.y,1.5))/2.;v_showRatio=(smoothstep(placementWeight*0.3,0.7+placementWeight*0.3,u_showRatio));vec2 domXY=mix(u_domXYFrom,u_domXY,v_showRatio);vec2 domWH=mix(u_domWHFrom,u_domWH,v_showRatio);domXY.x+=mix(domWH.x,0.,cos(v_showRatio*3.1415926*2.)*0.5+0.5)*0.1;vec3 basePos=getBasePosition(position,domWH);float rot=(smoothstep(0.,1.,v_showRatio)-v_showRatio)*-0.5;vec3 rotBasePos=qrotate(vec4(0.,0.,sin(rot),cos(rot)),basePos);vec3 screenPos=getScreenPosition(rotBasePos,domXY);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=vec2(uv.x,1.-uv.y);v_domWH=domWH;}`;
const videoFrag = `#define GLSLIFY 1
uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec3 u_color;uniform sampler2D u_texture;uniform vec2 u_textureSize;uniform float u_time;uniform vec2 u_radialCenter;uniform float u_showRatio;uniform float u_globalRadius;uniform float u_aspectScale;varying vec2 v_uv;varying vec2 v_domWH;varying float v_showRatio;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*v_domWH,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(6.,25.));float imageAlpha=getRoundedCornerMask(v_uv,v_domWH,u_globalRadius,1.0);vec2 baseUv=v_uv;float toRadialCenterDist=length((baseUv-u_radialCenter)*vec2(v_domWH.x/v_domWH.y,1.));baseUv.y=(baseUv.y-.5)*mix(1.,u_aspectScale,v_showRatio)+0.5;vec3 color=texture2D(u_texture,baseUv).rgb;vec3 tintedColor=max(u_color,vec3(dot(color,vec3(0.299,0.587,0.114))));gl_FragColor=vec4(mix(tintedColor,color,v_showRatio),imageAlpha);}`;
const vert$j = `#define GLSLIFY 1
attribute vec3 CP;attribute float Cd;varying float v_cd;varying float v_lineRatio;varying float v_s;uniform float u_scrollY;uniform vec2 u_viewportResolution;uniform vec2 u_aspect;uniform vec2 u_margin;uniform float u_radius;void main(){vec3 pos=vec3(CP.xy+position.xy*u_radius,0.0);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_cd=Cd;v_lineRatio=position.z;v_s=CP.z;}`;
const frag$m = `#define GLSLIFY 1
varying float v_cd;varying float v_lineRatio;varying float v_s;uniform float u_showRatio;uniform float u_hideRatio;uniform vec3 u_colorBg;uniform vec3 u_color0;uniform vec3 u_color1;uniform float u_aoThreshold;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 hsv2rgb(in vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);rgb=rgb*rgb*(3.0-2.0*rgb);return c.z*mix(vec3(1.0),rgb,c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 lerpHSV(in vec3 a,in vec3 b,in float x){float hue=(mod(mod((b.x-a.x),1.)+1.5,1.)-0.5)*x+a.x;return vec3(hue,mix(a.yz,b.yz,x));}void main(){float ao=0.9+0.1*v_cd;float aoRatio=linearStep(u_aoThreshold-0.02,u_aoThreshold+0.02,u_showRatio);if(step(u_showRatio,v_lineRatio)>0.5)discard;float mixRatio=1.0-pow(1.0-clamp(v_lineRatio,0.0,1.0),2.0);gl_FragColor.rgb=hsv2rgb(lerpHSV(rgb2hsv(u_color1),rgb2hsv(u_color0),mixRatio));gl_FragColor.rgb*=min(1.0,ao+1.0-aoRatio);float alpha=abs(v_s-.5);gl_FragColor.a=linearStep(0.5,0.5-fwidth(alpha),alpha);}`;
const lineEndVert = `#define GLSLIFY 1
uniform vec3 u_color0;uniform vec3 u_color1;uniform float u_mixRatio;uniform float u_ao;vec3 hsv2rgb(in vec3 c){vec3 rgb=clamp(abs(mod(c.x*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);rgb=rgb*rgb*(3.0-2.0*rgb);return c.z*mix(vec3(1.0),rgb,c.y);}vec3 rgb2hsv(vec3 c){vec4 K=vec4(0.0,-1.0/3.0,2.0/3.0,-1.0);vec4 p=mix(vec4(c.bg,K.wz),vec4(c.gb,K.xy),step(c.b,c.g));vec4 q=mix(vec4(p.xyw,c.r),vec4(c.r,p.yzx),step(p.x,c.r));float d=q.x-min(q.w,q.y);float e=1.0e-10;return vec3(abs(q.z+(q.w-q.y)/(6.0*d+e)),d/(q.x+e),q.x);}vec3 lerpHSV(in vec3 a,in vec3 b,in float x){float hue=(mod(mod((b.x-a.x),1.)+1.5,1.)-0.5)*x+a.x;return vec3(hue,mix(a.yz,b.yz,x));}varying vec3 v_color;varying vec2 v_uv;void main(){v_color=u_ao*hsv2rgb(lerpHSV(rgb2hsv(u_color1),rgb2hsv(u_color0),u_mixRatio));v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const lineEndFrag = `#define GLSLIFY 1
varying vec3 v_color;varying vec2 v_uv;void main(){float d=length(v_uv-.5)*2.;gl_FragColor.rgb=v_color;gl_FragColor.a=smoothstep(1.,1.-fwidth(d),d);}`;
const _v0$2 = new Vector3();
const _v1$5 = new Vector3();
const _box = new Box3();
const LINES_DATA_LIST = [{
  fileName: "line_reel",
  aoThreshold: 0.555,
  margin: {
    x: -0.05,
    y: -0.8
  },
  scrollToRatioFactors: [0.4, 1.3],
  boxMin: new Vector3(-0.0112049, -0.0141946, 0),
  boxMax: new Vector3(1.01357, 0.718671, 0),
  color0: "#5a90ff",
  color1: "#2a38ee"
}, {
  fileName: "line_goal",
  aoThreshold: 0.0001,
  margin: {
    x: 0.2,
    y: -0.6
  },
  scrollToRatioFactors: [1.2, 2],
  boxMin: new Vector3(-0.0180006, -0.00963629, 0),
  boxMax: new Vector3(1.01777, 0.850395, 0),
  color0: "#94fffb",
  color1: "#1285dc"
}, {
  fileName: "line_capability",
  aoThreshold: 0.0001,
  margin: {
    x: 0,
    y: -1.15
  },
  scrollToRatioFactors: [0, 2],
  boxMin: new Vector3(-0.0165916, -0.0152524, 0),
  boxMax: new Vector3(1.018, 1.08872, 0),
  color0: "#fff",
  color1: "#bbb"
}, {
  fileName: "line_office",
  aoThreshold: 0.0001,
  margin: {
    x: 0,
    y: -2.2
  },
  boxMin: new Vector3(-0.0131718, -0.0141192, 0),
  boxMax: new Vector3(1.01767, 1.2037, 0),
  scrollToRatioFactors: [-2, 1.85],
  color0: "#fff",
  color1: "#bbb"
}];
class Line {
  container = new Object3D();
  innerContainer = new Object3D();
  geometry = new BufferGeometry();
  mesh = null;
  lineId = 0;
  aoThreshold = 0.47;
  radius = 0.008;
  lineData = null;
  constructor(e = 0) {
    this.lineId = e;
    this.lineData = LINES_DATA_LIST[this.lineId];
  }
  preInit() {
    this.container.add(this.innerContainer);
    properties.loader.add(settings.MODEL_PATH + "lines/" + this.lineData.fileName + ".buf", {
      onLoad: e => this.geometry = e
    });
  }
  init() {
    this.mesh = new Mesh(this.geometry, new ShaderMaterial({
      uniforms: {
        u_showRatio: {
          value: 0
        },
        u_aoThreshold: {
          value: this.lineData.aoThreshold
        },
        u_colorBg: {
          value: new Color()
        },
        u_color0: {
          value: new Color(this.lineData.color0)
        },
        u_color1: {
          value: new Color(this.lineData.color1)
        },
        u_scrollY: {
          value: 0
        },
        u_radius: {
          value: 0
        },
        u_aspect: {
          value: new Vector2()
        },
        u_margin: {
          value: new Vector2(this.lineData.margin.x, this.lineData.margin.y)
        },
        u_viewportResolution: properties.sharedUniforms.u_viewportResolution
      },
      vertexShader: vert$j,
      fragmentShader: frag$m,
      depthTest: false,
      transparent: true
    }));
    this.mesh.frustumCulled = false;
    this.mesh.material.defines.IS_LINE = true;
    this.mesh.material.extensions.derivatives = true;
    this.box = new Box3().setFromObject(this.mesh);
    this.innerContainer.add(this.mesh);
    this.circle = new Mesh(new PlaneGeometry(2, 2), new ShaderMaterial({
      uniforms: {
        u_color0: {
          value: new Color(this.lineData.color0)
        },
        u_color1: {
          value: new Color(this.lineData.color1)
        },
        u_ao: {
          value: 1
        },
        u_mixRatio: {
          value: 0
        }
      },
      vertexShader: lineEndVert,
      fragmentShader: lineEndFrag,
      side: 2,
      depthTest: false,
      transparent: true
    }));
    this.circle.material.extensions.derivatives = true;
    this.circle.frustumCulled = false;
    this.innerContainer.add(this.circle);
    const P = this.geometry && this.geometry.attributes && this.geometry.attributes.position;
    if (P) {
      const {
        array: e,
        count: t
      } = P;
      this.lineRatioArray = new Float32Array(t);
      for (let r = 0; r < t; r++) {
        this.lineRatioArray[r] = e[r * 3 + 2];
      }
    } else {
      this.lineRatioArray = new Float32Array(0);
    }
  }
  resize(e, t) {
    const r = t / Math.sqrt(e * e + t * t);
    this.mesh.material.uniforms.u_aspect.value.set(e / t * r, r);
  }
  update(e, t, r = 0) {
    if (!this.geometry || !this.geometry.attributes || !this.geometry.attributes.position || !this.geometry.attributes.CP || !this.geometry.attributes.Cd || !this.lineRatioArray || !this.lineRatioArray.length) {
      return;
    }
    let n = this.radius * math.fit(properties.viewportWidth, 540, 1920, 2, 1);
    let a = math.saturate(-(t.screenY - this.lineData.scrollToRatioFactors[0] * properties.viewportHeight) / (this.lineData.scrollToRatioFactors[1] * properties.viewportHeight));
    a = ease.quadInOut(a);
    const l = t.screenY + r;
    let c = properties.viewportWidth / this.mesh.material.uniforms.u_aspect.value.x;
    let u = properties.viewportHeight / this.mesh.material.uniforms.u_aspect.value.y;
    this.mesh.material.uniforms.u_showRatio.value = math.saturate(a);
    this.mesh.material.uniforms.u_scrollY.value = -l;
    this.mesh.material.uniforms.u_colorBg.value.copy(properties.bgColor);
    this.mesh.material.uniforms.u_radius.value = n;
    this.innerContainer.position.x = this.lineData.margin.x * c;
    this.innerContainer.position.y = this.lineData.margin.y * u - l;
    this.innerContainer.scale.x = c;
    this.innerContainer.scale.y = u;
    this.container.visible = false;
    if (this.container.parent) {
      this.container.parent.updateMatrixWorld(true);
      _box.min.copy(this.lineData.boxMin);
      _box.max.copy(this.lineData.boxMax);
      _box.applyMatrix4(this.innerContainer.matrixWorld);
      this.container.visible = _box.max.y > -properties.viewportHeight && _box.min.y < 0;
    }
    const {
      array: f,
      count: p
    } = this.geometry.attributes.CP;
    const {
      array: g
    } = this.geometry.attributes.position;
    let v = 0;
    let _ = 0;
    for (let R = 0; R < p; R++) {
      if (a >= this.lineRatioArray[R]) {
        v = R;
        if (R === p - 1) {
          _ = 0;
        } else {
          _ = (a - this.lineRatioArray[R]) / (this.lineRatioArray[R + 1] - this.lineRatioArray[R]);
        }
      }
    }
    const T = v;
    const M = Math.min(v + 1, p - 1);
    _v0$2.fromArray(f, v * 3);
    _v1$5.fromArray(f, Math.min(p - 1, v + 1) * 3);
    _v0$2.lerp(_v1$5, _);
    const S = this.geometry.attributes.Cd.array;
    let b = math.lerp(S[T], S[M], _);
    b = 0.9 + b * 0.1;
    const C = math.linearStep(this.lineData.aoThreshold - 0.02, this.lineData.aoThreshold + 0.02, a);
    this.circle.position.copy(_v0$2);
    this.circle.scale.set(n, n, 1);
    this.circle.material.uniforms.u_ao.value = Math.min(1, b + 1 - C);
    let w = math.lerp(g[T * 3 + 2], g[M * 3 + 2], _);
    w = 1 - Math.pow(1 - math.clamp(w, 0, 1), 2);
    this.circle.material.uniforms.u_mixRatio.value = w;
  }
} /*! @vimeo/player v2.30.4 | (c) 2026 Vimeo | MIT License | https://github.com/vimeo/player.js */
const isNode = typeof global !== "undefined" && {}.toString.call(global) === "[object global]";
const isBun = typeof Bun !== "undefined";
const isDeno = typeof Deno !== "undefined";
const isCloudflareWorker = typeof WebSocketPair == "function" && typeof caches?.default !== "undefined";
const isServerRuntime = isNode || isBun || isDeno || isCloudflareWorker;
function getMethodName(o, e) {
  if (o.indexOf(e.toLowerCase()) === 0) {
    return o;
  } else {
    return `${e.toLowerCase()}${o.substr(0, 1).toUpperCase()}${o.substr(1)}`;
  }
}
function isDomElement(o) {
  return !!o && o.nodeType === 1 && !!("nodeName" in o) && !!o.ownerDocument && !!o.ownerDocument.defaultView;
}
function isInteger(o) {
  return !isNaN(parseFloat(o)) && isFinite(o) && Math.floor(o) == o;
}
function isVimeoUrl(o) {
  return /^(https?:)?\/\/((((player|www)\.)?vimeo\.com)|((player\.)?[a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))(?=$|\/)/.test(o);
}
function isVimeoEmbed(o) {
  return /^https:\/\/player\.((vimeo\.com)|([a-zA-Z0-9-]+\.(videoji\.(hk|cn)|vimeo\.work)))\/video\/\d+/.test(o);
}
function getOembedDomain(o) {
  const e = (o || "").match(/^(?:https?:)?(?:\/\/)?([^/?]+)/);
  const t = (e && e[1] || "").replace("player.", "");
  const r = [".videoji.hk", ".vimeo.work", ".videoji.cn"];
  for (const n of r) {
    if (t.endsWith(n)) {
      return t;
    }
  }
  return "vimeo.com";
}
function getVimeoUrl(o = {}) {
  const e = o.id;
  const t = o.url;
  const r = e || t;
  if (!r) {
    throw new Error("An id or url must be passed, either in an options object or as a data-vimeo-id or data-vimeo-url attribute.");
  }
  if (isInteger(r)) {
    return `https://vimeo.com/${r}`;
  }
  if (isVimeoUrl(r)) {
    return r.replace("http:", "https:");
  }
  throw e ? new TypeError(`“${e}” is not a valid video id.`) : new TypeError(`“${r}” is not a vimeo.com url.`);
}
const subscribe = function (o, e, t, r = "addEventListener", n = "removeEventListener") {
  const a = typeof e == "string" ? [e] : e;
  a.forEach(l => {
    o[r](l, t);
  });
  return {
    cancel: () => a.forEach(l => o[n](l, t))
  };
};
function findIframeBySourceWindow(o, e = document) {
  if (!o || !e || typeof e.querySelectorAll != "function") {
    return null;
  }
  const t = e.querySelectorAll("iframe");
  for (let r = 0; r < t.length; r++) {
    if (t[r] && t[r].contentWindow === o) {
      return t[r];
    }
  }
  return null;
}
const arrayIndexOfSupport = typeof Array.prototype.indexOf !== "undefined";
const postMessageSupport = typeof window !== "undefined" && typeof window.postMessage !== "undefined";
if (!isServerRuntime && (!arrayIndexOfSupport || !postMessageSupport)) {
  throw new Error("Sorry, the Vimeo Player API is not available in this browser.");
}
var commonjsGlobal = typeof globalThis !== "undefined" ? globalThis : typeof window !== "undefined" ? window : typeof global !== "undefined" ? global : typeof self !== "undefined" ? self : {};
function createCommonjsModule(o, e) {
  e = {
    exports: {}
  };
  o(e, e.exports);
  return e.exports;
} /*!
  * weakmap-polyfill v2.0.4 - ECMAScript6 WeakMap polyfill
  * https://github.com/polygonplanet/weakmap-polyfill
  * Copyright (c) 2015-2021 polygonplanet <polygon.planet.aqua@gmail.com>
  * @license MIT
  */
(function (o) {
  if (o.WeakMap) {
    return;
  }
  var e = Object.prototype.hasOwnProperty;
  var t = Object.defineProperty && function () {
    try {
      return Object.defineProperty({}, "x", {
        value: 1
      }).x === 1;
    } catch {}
  }();
  function r(a, l, c) {
    if (t) {
      Object.defineProperty(a, l, {
        configurable: true,
        writable: true,
        value: c
      });
    } else {
      a[l] = c;
    }
  }
  o.WeakMap = function () {
    function a() {
      if (this === undefined) {
        throw new TypeError("Constructor WeakMap requires 'new'");
      }
      r(this, "_id", c("_WeakMap"));
      if (arguments.length > 0) {
        throw new TypeError("WeakMap iterable is not supported");
      }
    }
    r(a.prototype, "delete", function (f) {
      l(this, "delete");
      if (!n(f)) {
        return false;
      }
      var p = f[this._id];
      if (p && p[0] === f) {
        delete f[this._id];
        return true;
      } else {
        return false;
      }
    });
    r(a.prototype, "get", function (f) {
      l(this, "get");
      if (n(f)) {
        var p = f[this._id];
        if (p && p[0] === f) {
          return p[1];
        }
      }
    });
    r(a.prototype, "has", function (f) {
      l(this, "has");
      if (!n(f)) {
        return false;
      }
      var p = f[this._id];
      return !!p && p[0] === f;
    });
    r(a.prototype, "set", function (f, p) {
      l(this, "set");
      if (!n(f)) {
        throw new TypeError("Invalid value used as weak map key");
      }
      var g = f[this._id];
      if (g && g[0] === f) {
        g[1] = p;
        return this;
      } else {
        r(f, this._id, [f, p]);
        return this;
      }
    });
    function l(f, p) {
      if (!n(f) || !e.call(f, "_id")) {
        throw new TypeError(p + " method called on incompatible receiver " + typeof f);
      }
    }
    function c(f) {
      return f + "_" + u() + "." + u();
    }
    function u() {
      return Math.random().toString().substring(2);
    }
    r(a, "_polyfill", true);
    return a;
  }();
  function n(a) {
    return Object(a) === a;
  }
})(typeof globalThis !== "undefined" ? globalThis : typeof self !== "undefined" ? self : typeof window !== "undefined" ? window : commonjsGlobal);
var npo_src = createCommonjsModule(function (o) {
  /*! Native Promise Only
  v0.8.1 (c) Kyle Simpson
  MIT License: http://getify.mit-license.org
  */
  (function (t, r, n) {
    r[t] = r[t] || n();
    o.exports &&= r[t];
  })("Promise", commonjsGlobal, function () {
    var t;
    var r;
    var n;
    var a = Object.prototype.toString;
    var l = typeof setImmediate !== "undefined" ? function (w) {
      return setImmediate(w);
    } : setTimeout;
    try {
      Object.defineProperty({}, "x", {});
      t = function (w, R, E, I) {
        return Object.defineProperty(w, R, {
          value: E,
          writable: true,
          configurable: I !== false
        });
      };
    } catch {
      t = function (R, E, I) {
        R[E] = I;
        return R;
      };
    }
    n = function () {
      var w;
      var R;
      var E;
      function I(F, k) {
        this.fn = F;
        this.self = k;
        this.next = undefined;
      }
      return {
        add: function (k, L) {
          E = new I(k, L);
          if (R) {
            R.next = E;
          } else {
            w = E;
          }
          R = E;
          E = undefined;
        },
        drain: function () {
          var k = w;
          for (w = R = r = undefined; k;) {
            k.fn.call(k.self);
            k = k.next;
          }
        }
      };
    }();
    function c(C, w) {
      n.add(C, w);
      r ||= l(n.drain);
    }
    function u(C) {
      var w;
      var R = typeof C;
      if (C != null && (R == "object" || R == "function")) {
        w = C.then;
      }
      if (typeof w == "function") {
        return w;
      } else {
        return false;
      }
    }
    function f() {
      for (var C = 0; C < this.chain.length; C++) {
        p(this, this.state === 1 ? this.chain[C].success : this.chain[C].failure, this.chain[C]);
      }
      this.chain.length = 0;
    }
    function p(C, w, R) {
      var E;
      var I;
      try {
        if (w === false) {
          R.reject(C.msg);
        } else {
          if (w === true) {
            E = C.msg;
          } else {
            E = w.call(undefined, C.msg);
          }
          if (E === R.promise) {
            R.reject(TypeError("Promise-chain cycle"));
          } else if (I = u(E)) {
            I.call(E, R.resolve, R.reject);
          } else {
            R.resolve(E);
          }
        }
      } catch (F) {
        R.reject(F);
      }
    }
    function g(C) {
      var w;
      var R = this;
      if (!R.triggered) {
        R.triggered = true;
        if (R.def) {
          R = R.def;
        }
        try {
          if (w = u(C)) {
            c(function () {
              var E = new T(R);
              try {
                w.call(C, function () {
                  g.apply(E, arguments);
                }, function () {
                  v.apply(E, arguments);
                });
              } catch (I) {
                v.call(E, I);
              }
            });
          } else {
            R.msg = C;
            R.state = 1;
            if (R.chain.length > 0) {
              c(f, R);
            }
          }
        } catch (E) {
          v.call(new T(R), E);
        }
      }
    }
    function v(C) {
      var w = this;
      if (!w.triggered) {
        w.triggered = true;
        if (w.def) {
          w = w.def;
        }
        w.msg = C;
        w.state = 2;
        if (w.chain.length > 0) {
          c(f, w);
        }
      }
    }
    function _(C, w, R, E) {
      for (var I = 0; I < w.length; I++) {
        (function (k) {
          C.resolve(w[k]).then(function (D) {
            R(k, D);
          }, E);
        })(I);
      }
    }
    function T(C) {
      this.def = C;
      this.triggered = false;
    }
    function M(C) {
      this.promise = C;
      this.state = 0;
      this.triggered = false;
      this.chain = [];
      this.msg = undefined;
    }
    function S(C) {
      if (typeof C != "function") {
        throw TypeError("Not a function");
      }
      if (this.__NPO__ !== 0) {
        throw TypeError("Not a promise");
      }
      this.__NPO__ = 1;
      var w = new M(this);
      this.then = function (E, I) {
        var F = {
          success: typeof E == "function" ? E : true,
          failure: typeof I == "function" ? I : false
        };
        F.promise = new this.constructor(function (L, D) {
          if (typeof L != "function" || typeof D != "function") {
            throw TypeError("Not a function");
          }
          F.resolve = L;
          F.reject = D;
        });
        w.chain.push(F);
        if (w.state !== 0) {
          c(f, w);
        }
        return F.promise;
      };
      this.catch = function (E) {
        return this.then(undefined, E);
      };
      try {
        C.call(undefined, function (E) {
          g.call(w, E);
        }, function (E) {
          v.call(w, E);
        });
      } catch (R) {
        v.call(w, R);
      }
    }
    var b = t({}, "constructor", S, false);
    S.prototype = b;
    t(b, "__NPO__", 0, false);
    t(S, "resolve", function (w) {
      var R = this;
      if (w && typeof w == "object" && w.__NPO__ === 1) {
        return w;
      } else {
        return new R(function (I, F) {
          if (typeof I != "function" || typeof F != "function") {
            throw TypeError("Not a function");
          }
          I(w);
        });
      }
    });
    t(S, "reject", function (w) {
      return new this(function (E, I) {
        if (typeof E != "function" || typeof I != "function") {
          throw TypeError("Not a function");
        }
        I(w);
      });
    });
    t(S, "all", function (w) {
      var R = this;
      if (a.call(w) != "[object Array]") {
        return R.reject(TypeError("Not an array"));
      } else if (w.length === 0) {
        return R.resolve([]);
      } else {
        return new R(function (I, F) {
          if (typeof I != "function" || typeof F != "function") {
            throw TypeError("Not a function");
          }
          var k = w.length;
          var L = Array(k);
          var D = 0;
          _(R, w, function (re, ce) {
            L[re] = ce;
            if (++D === k) {
              I(L);
            }
          }, F);
        });
      }
    });
    t(S, "race", function (w) {
      var R = this;
      if (a.call(w) != "[object Array]") {
        return R.reject(TypeError("Not an array"));
      } else {
        return new R(function (I, F) {
          if (typeof I != "function" || typeof F != "function") {
            throw TypeError("Not a function");
          }
          _(R, w, function (L, D) {
            I(D);
          }, F);
        });
      }
    });
    return S;
  });
});
