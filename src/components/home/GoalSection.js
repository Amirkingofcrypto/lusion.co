/**
 * ============================================================================
 * Lusion Modular Component: 15-goal-section
 * File: src/components/home/GoalSection.js
 * Description: GoalSectionRanges, GoalTunnelsBackground, GoalWhiteTunnelParticles, GoalWhiteTunnelStickers, GoalTunnels & GoalSection
 * Original Engine Lines: 37510 - 38670
 * ============================================================================
 */
class GoalSectionRanges {
  items = {};
  itemList = [{
    id: "blackFrameShow",
    isPixelBased: true
  }, {
    id: "blackFrameIn",
    weight: 1
  }, {
    id: "blackTitle",
    weight: 5
  }, {
    id: "blackTunnel",
    weight: 12
  }, {
    id: "whiteTunnel",
    weight: 2
  }, {
    id: "whiteFrameOut",
    weight: 1
  }, {
    id: "whiteFrameBreak",
    weight: 1.5
  }, {
    id: "astronautDrop",
    isPixelBased: true
  }, {
    id: "astronautWait",
    isPixelBased: true
  }];
  offsetY = 0;
  prevRatio = null;
  ratio = null;
  wasActive = null;
  isActive = null;
  _cachedRanges = {};
  totalPixelCount = 0;
  totalTunnelWeight = 0;
  baseY = 0;
  domContainer;
  domImgIn;
  domImgOut;
  tick = 0;
  SHOW_DEBUG = false;
  _debugTimeline;
  _debugTimelineItems = [];
  _debugTimelineIndicator;
  init(e) {
    this.domContainer = e.querySelector("#home-goal");
    this.domImgIn = e.querySelector("#home-goal-image-in");
    this.domImgOut = e.querySelector("#home-goal-image-out");
    for (let t = 0; t < this.itemList.length; t++) {
      let r = this.itemList[t];
      this.items[r.id] = r;
      if (r.weight) {
        this.totalTunnelWeight += r.weight;
      }
    }
    if (this.SHOW_DEBUG) {
      this._debugTimeline = document.createElement("div");
      this._debugTimeline.style = `
				position: fixed;
				bottom: 0;
				left: 0;
				zIndex: 1000;
				height: 4px;
				width: 100%;
				pointerEvents: none;
			`;
      document.body.appendChild(this._debugTimeline);
      for (let t = 0; t < this.itemList.length; t++) {
        let r = this._debugTimelineItems[t] = document.createElement("div");
        r.style = `
					position: absolute;
					left: 0;
					width: 100%;
					height: 100%;
					bottom: 0;
					background: ${t % 2 ? "green" : "blue"};
					transform-origin: 0 0;
				`;
        this._debugTimeline.appendChild(r);
      }
      this._debugTimelineIndicator = document.createElement("div");
      this._debugTimelineIndicator.style = `
				position: position;
				left: -10px;
				top: -20px;
				width: 0;
				height: 0;
				border-style: solid;
				border-width: 20px 10px 0 10px;
				border-color: red transparent transparent transparent;
			`;
      this._debugTimeline.appendChild(this._debugTimelineIndicator);
    }
  }
  resize(e, t) {
    let r = scrollManager.getDomRange(this.domContainer);
    let n = scrollManager.getDomRange(this.domImgIn);
    let a = scrollManager.getDomRange(this.domImgOut);
    this.baseY = n.top - properties.viewportHeight;
    let c = r.bottom - this.baseY - (t + n.height) * 0.5 - (t + a.height) * 0.5;
    this.items.blackFrameShow.pixelCount = (t + n.height) * 0.5;
    this.items.astronautDrop.pixelCount = (t + a.height) * 0.5 + t;
    let u = scrollManager.getDomRange(footerSection.domContainer).bottom - r.bottom;
    this.items.astronautWait.pixelCount = u - this.items.astronautDrop.pixelCount * 0;
    this.totalPixelCount = 0;
    for (let f = 0; f < this.itemList.length; f++) {
      let p = this.itemList[f];
      p.pixelFrom = this.totalPixelCount;
      if (p.weight) {
        p.pixelCount = c * p.weight / this.totalTunnelWeight;
      }
      this.totalPixelCount += p.pixelCount;
      p.pixelTo = this.totalPixelCount;
    }
    if (this.SHOW_DEBUG) {
      for (let f = 0; f < this.itemList.length; f++) {
        let p = this.itemList[f];
        let g = this._debugTimelineItems[f];
        g.style.transform = `translateX(${p.pixelFrom / this.totalPixelCount * e}px) scaleX(${p.pixelCount / this.totalPixelCount})`;
      }
    }
  }
  update(e) {
    this.tick++;
    this.offsetY = scrollManager.scrollPixel - this.baseY;
    this.prevRatio = this.ratio;
    this.ratio = this.offsetY / this.totalPixelCount;
    this.wasActive = this.isActive;
    this.isActive = this.ratio >= 0 && this.ratio < 1;
    if (this.SHOW_DEBUG) {
      this._debugTimelineIndicator.style.transform = `translateX(${this.ratio * properties.viewportWidth}px) translate3d(-50%, -20px, 0)`;
    }
  }
  getRange(e, t = e) {
    let r = e + "-" + t;
    let n = this._cachedRanges[r];
    n ||= this._cachedRanges[r] = {
      from: this.items[e],
      to: this.items[t]
    };
    if (n.tick !== this.tick) {
      n.tick = this.tick;
      n.pixelFrom = n.from.pixelFrom;
      n.pixelTo = n.to.pixelTo;
      n.pixelCount = n.pixelTo - n.pixelFrom;
      n.pixel = scrollManager.scrollPixel - this.baseY - n.pixelFrom;
      n.ratio = n.pixel / n.pixelCount;
      n.isActive = n.ratio >= 0 && n.ratio < 1;
    }
    return n;
  }
}
const homeGoalSectionRanges = new GoalSectionRanges();
const vert$e = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;void main(){vec3 pos=position;pos.z*=0.1;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=pos;}`;
const frag$i = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;uniform sampler2D u_earthTexture;uniform vec3 u_bgColor;uniform vec3 u_atmosphereColor;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getBlueNoise>
void main(){vec3 bn=getBlueNoise(gl_FragCoord.xy);float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 earthMap=texture2D(u_earthTexture,v_uv).rgb;gl_FragColor.rgb=earthMap;gl_FragColor.a=0.0;}`;
class GoalTunnelsBackground {
  container = new Object3D();
  mesh = null;
  constructor() {}
  preInit() {
    this.earthTexture = properties.loader.add(settings.TEXTURE_PATH + "tunnels/earth_landscape.jpg", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/earth_card.buf", {
      onLoad: e => {
        this.geo = e;
      }
    });
  }
  init() {
    this.mesh = new Mesh(this.geo, new ShaderMaterial({
      uniforms: Object.assign({
        u_bgColor: {
          value: new Color()
        },
        u_atmosphereColor: {
          value: new Color("#4169E1")
        },
        u_earthTexture: {
          value: this.earthTexture
        }
      }, blueNoise.sharedUniforms),
      vertexShader: vert$e,
      fragmentShader: frag$i
    }));
    this.mesh.renderOrder = -1;
    this.mesh.frustumCulled = false;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    const t = math.saturate(homeGoalSectionRanges.getRange("blackFrameShow").ratio);
    const r = math.saturate(homeGoalSectionRanges.getRange("blackFrameIn").ratio);
    this.mesh.material.uniforms.u_bgColor.value.copy(properties.bgColor);
    this.mesh.position.y = -((1 - t) * 10 + 2.5 + r * 30);
    this.mesh.scale.setScalar(math.fit(r, 0, 0.5, 40, 70));
    this.container.rotation.x = math.fit(r, 0, 0.5, 0, -1);
    this.mesh.visible = r < 1;
  }
}
const goalTunnelsBackground = new GoalTunnelsBackground();
const vert$d = `#define GLSLIFY 1
attribute vec3 a_instancePosition;attribute vec3 a_instanceRotationAxis;attribute vec4 a_instanceRand;attribute float thickness;uniform float u_time;uniform float u_aspect;uniform float u_activeRatio;varying vec3 v_viewNormal;varying float v_thickness;varying vec3 v_cameraPositionLS;varying vec3 v_positionLS;varying vec3 v_normalLS;varying vec4 v_orient;varying float v_fadeOut;
#ifndef HALF_PI
#define HALF_PI 1.5707963267948966
#endif
float elasticOut(float t){return sin(-13.0*(t+1.0)*HALF_PI)*pow(2.0,-10.0*t)+1.0;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float halfAngle){return vec4(axis*sin(halfAngle),cos(halfAngle));}vec3 rotate(vec3 v,vec3 axis,float angle){vec4 q=quaternion(axis,angle*.5);return qrotate(q,v);}void main(){float time=0.5*u_time+4.*a_instanceRand.x;float scale=0.75;vec3 pos=position;vec4 orient=quaternion(a_instanceRotationAxis,(0.5+a_instanceRand.y)*time);pos=qrotate(orient,pos);pos*=scale;vec3 nor=qrotate(orient,normal);vec3 instancePosition=a_instancePosition;instancePosition.y+=0.5*u_time*(1.+a_instanceRand.x);float yLimit=20.0/u_aspect;instancePosition.y=mod(instancePosition.y,yLimit)-0.5*yLimit;v_fadeOut=abs(instancePosition.y)/(yLimit*0.5);pos*=linearStep(a_instanceRand.w*0.5,a_instanceRand.w*0.5+0.5,u_activeRatio);pos+=instancePosition;vec4 orientInv=vec4(-orient.xyz,orient.w);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);v_cameraPositionLS=qrotate(orientInv,(cameraPosition-instancePosition)/scale);v_positionLS=position*scale;v_normalLS=normal;v_orient=orient;v_viewNormal=normalMatrix*nor;v_thickness=thickness;}`;
const frag$h = `#define GLSLIFY 1
uniform vec3 u_color;uniform vec3 u_bgColor;uniform vec4 u_planes[25];uniform mat3 normalMatrix;varying vec3 v_viewNormal;varying float v_thickness;varying vec3 v_cameraPositionLS;varying vec3 v_positionLS;varying vec3 v_normalLS;varying vec4 v_orient;varying float v_fadeOut;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float plaIntersect(in vec3 ro,in vec3 rd,in vec4 p){return-(dot(ro,p.xyz)+p.w)/dot(rd,p.xyz);}vec4 getColorShade(vec3 dir,vec3 vn){float d=dot(dir,vn);float shade=(1.0-max(0.,vn.z))*v_thickness*5.;shade*=(pow(linearStep(2.,-1.,d),4.)*0.15+pow(linearStep(1.,-2.,d),5.)*7.);vec3 rgb=mix(vec3(0.8),clamp(abs(mod((d+vn.z)*12.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0),1.-shade);return vec4((vec3(u_color)+rgb*1.2)*shade,0.035+(1.-v_thickness)*shade*shade)*(1.-abs(vn.z));}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 localDir=normalize(v_positionLS);vec3 viewNormal=normalize(v_viewNormal);float ior=2.418;vec3 norLS=normalize(v_normalLS);vec3 refrLS=refract(normalize(v_positionLS-v_cameraPositionLS),norLS,1./ior);float dist=100.;vec3 planeDir=vec3(0.);for(int i=0;i<25;i++){vec4 plane=u_planes[i];plane.xyz*=-1.;plane.w*=0.7501;float hitDist=plaIntersect(v_positionLS+refrLS*0.001,refrLS,plane);if(hitDist>0.&&hitDist<dist){dist=hitDist;planeDir=u_planes[i].xyz;}}vec3 refrPosLS=v_positionLS+refrLS*dist;refrLS=refract(refrLS,planeDir,ior);vec3 refrLocalDir=qrotate(v_orient,normalize(refrPosLS));vec3 viewPlaneNor=normalMatrix*qrotate(v_orient,planeDir);vec4 frontColorShade=getColorShade(localDir,viewNormal);vec4 backColorShade=getColorShade(refrLocalDir,viewPlaneNor);gl_FragColor=frontColorShade*1.5+vec4(backColorShade.rgb*0.75,backColorShade.a*.5);gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,linearStep(0.0,0.1,1.0-v_fadeOut));}`;
const _v$1 = new Vector3();
class GoalWhiteTunnelParticles {
  PARTICLE_COUNT = 64;
  container = new Object3D();
  mesh = null;
  material = null;
  geometry = null;
  activeRatio = 0;
  constructor() {}
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "tunnels/diamond.buf", {
      onLoad: e => this.geo = e
    });
  }
  init() {
    let e = this.geo || new BufferGeometry();
    let t = new InstancedBufferGeometry();
    if (e && e.attributes) {
      for (let u in e.attributes) {
        t.attributes[u] = e.attributes[u];
      }
      t.index = e.index;
    }
    let r = math.getSeedRandomFn("diamonds-3");
    const n = new Float32Array(this.PARTICLE_COUNT * 3);
    const a = new Float32Array(this.PARTICLE_COUNT * 3);
    const l = new Float32Array(this.PARTICLE_COUNT * 4);
    let c = [-0.694747, 0.694747, 0.186157, -0.239229, -0.50859, 0.694747, 0.50859, -0.239229, -0.186157, 0.694747, 0.694747, -0.239229, 0.186157, 0.694747, 0.694747, -0.239229, 0.50859, 0.694747, 0.50859, -0.239229, 0.694747, 0.694747, 0.186157, -0.239229, 0.694747, 0.694747, -0.186157, -0.239229, 0.50859, 0.694747, -0.50859, -0.239229, 0.186157, 0.694747, -0.694746, -0.239229, -0.186156, 0.694747, -0.694747, -0.239229, -0.508589, 0.694747, -0.50859, -0.239229, -0.694747, 0.694747, -0.186157, -0.239229, -0.694747, -0.694747, 0.186157, -0.455518, -0.50859, -0.694747, 0.50859, -0.455518, -0.186157, -0.694747, 0.694747, -0.455518, 0.186157, -0.694747, 0.694747, -0.455518, 0.50859, -0.694747, 0.50859, -0.455518, 0.694746, -0.694747, 0.186157, -0.455518, 0.694746, -0.694747, -0.186157, -0.455518, 0.50859, -0.694747, -0.50859, -0.455518, 0.186157, -0.694747, -0.694746, -0.455518, -0.186156, -0.694747, -0.694747, -0.455518, -0.508589, -0.694747, -0.50859, -0.455518, -0.694747, -0.694747, -0.186157, -0.455518, -0, -1, -0, -0.34434];
    for (let u = 0, f = 0, p = 0; u < this.PARTICLE_COUNT; u++, f += 3, p += 4) {
      n[f] = (r() * 2 - 1) * 16;
      n[f + 1] = (r() * 2 - 1) * 16;
      n[f + 2] = 19 - (this.PARTICLE_COUNT - u - 1) / (this.PARTICLE_COUNT - 1) * 8;
      _v$1.randomDirection();
      a[f] = _v$1.x;
      a[f + 1] = _v$1.y;
      a[f + 2] = _v$1.z;
      l[p] = r();
      l[p + 1] = r();
      l[p + 2] = r();
      l[p + 3] = r();
    }
    t.setAttribute("a_instancePosition", new InstancedBufferAttribute(n, 3));
    t.setAttribute("a_instanceRotationAxis", new InstancedBufferAttribute(a, 3));
    t.setAttribute("a_instanceRand", new InstancedBufferAttribute(l, 4));
    this.material = new ShaderMaterial({
      vertexShader: vert$d,
      fragmentShader: frag$h,
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_activeRatio: {
          value: 0
        },
        u_color: {
          value: new Color("#689aff")
        },
        u_planes: {
          value: c
        },
        u_bgColor: {
          value: new Color()
        },
        u_aspect: properties.sharedUniforms.u_aspect
      },
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: ZeroFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    });
    this.mesh = new Mesh(t, this.material);
    this.mesh.frustumCulled = false;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    const {
      whiteTunnelWaitRatio: t
    } = goalTunnels;
    this.activeRatio = math.fit(t, 0, 0.2, 0, 1);
    this.container.visible = this.activeRatio > 0;
    this.material.uniforms.u_activeRatio.value = this.activeRatio;
    this.material.uniforms.u_bgColor.value.copy(properties.bgColor);
  }
}
const goalWhiteTunnelParticles = new GoalWhiteTunnelParticles();
const vert$c = `#define GLSLIFY 1
attribute float instanceId;attribute vec4 instanceUvInfo;attribute vec4 instanceRands;uniform float u_time;uniform float u_activeRatio;uniform float u_aspect;uniform vec2 u_textureSize;varying float v_fadeOut;varying vec2 v_uv;vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 pos=position;pos.xy*=instanceUvInfo.zw*u_textureSize*0.01;float t=u_time*mix(0.05,0.1,instanceRands.x)+instanceRands.y;float cycle=floor(t);float ratio=fract(t);vec4 cycleRands=hash42(vec2(cycle,instanceId));pos.xy=rotate(pos.xy,instanceRands.z*6.28+sign(cycleRands.z-.5)*u_time*mix(.5,1.,cycleRands.y))*linearStep(instanceRands.w*0.5,instanceRands.w*0.5+0.5,u_activeRatio)*0.35;float yLimit=7.0/u_aspect;vec3 instancePos=vec3(mix(-5.,5.,cycleRands.x),yLimit*mix(-1.0,1.0,ratio),20.+instanceId/float(COUNT));pos+=instancePos;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_uv=instanceUvInfo.xy+instanceUvInfo.zw*vec2(uv.x,1.-uv.y);v_uv.y=1.0-v_uv.y;v_fadeOut=2.0*abs(ratio-0.5);}`;
const frag$g = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_bgColor;varying vec2 v_uv;varying float v_fadeOut;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){gl_FragColor=texture2D(u_texture,v_uv);gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,linearStep(0.0,0.1,1.0-v_fadeOut));}`;
const goalWhiteTunnelStickerData = [{
  x: 1132,
  y: 3,
  w: 195,
  h: 195
}, {
  x: 744,
  y: 3,
  w: 195,
  h: 256
}, {
  x: 525,
  y: 3,
  w: 213,
  h: 282
}, {
  x: 242,
  y: 3,
  w: 277,
  h: 286
}, {
  x: 1055,
  y: 633,
  w: 209,
  h: 209
}, {
  x: 1076,
  y: 398,
  w: 209,
  h: 209
}, {
  x: 3,
  y: 772,
  w: 298,
  h: 249
}, {
  x: 945,
  y: 3,
  w: 181,
  h: 249
}, {
  x: 1291,
  y: 389,
  w: 160,
  h: 197
}, {
  x: 1055,
  y: 848,
  w: 83,
  h: 122
}, {
  x: 1132,
  y: 204,
  w: 167,
  h: 179
}, {
  x: 1270,
  y: 828,
  w: 192,
  h: 193
}, {
  x: 780,
  y: 265,
  w: 182,
  h: 167
}, {
  x: 564,
  y: 445,
  w: 294,
  h: 184
}, {
  x: 307,
  y: 683,
  w: 205,
  h: 334
}, {
  x: 864,
  y: 438,
  w: 206,
  h: 189
}, {
  x: 968,
  y: 258,
  w: 149,
  h: 134
}, {
  x: 734,
  y: 635,
  w: 165,
  h: 382
}, {
  x: 605,
  y: 291,
  w: 169,
  h: 141
}, {
  x: 302,
  y: 445,
  w: 256,
  h: 232
}, {
  x: 518,
  y: 683,
  w: 210,
  h: 266
}, {
  x: 242,
  y: 295,
  w: 357,
  h: 144
}, {
  x: 3,
  y: 3,
  w: 233,
  h: 469
}, {
  x: 905,
  y: 633,
  w: 144,
  h: 340
}, {
  x: 1270,
  y: 613,
  w: 187,
  h: 209
}, {
  x: 3,
  y: 478,
  w: 293,
  h: 288
}];
new Vector3();
class GoalWhiteTunnelStickers {
  COUNT = 26;
  container = new Object3D();
  mesh = null;
  material = null;
  geometry = null;
  textureSize = new Vector2(1465, 1024);
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_textureSize: {
      value: this.textureSize
    },
    u_activeRatio: {
      value: 0
    }
  };
  preInit() {
    this.sharedUniforms.u_texture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/" + (browser$1.isMobile ? "stickers_low.png" : "stickers.png"), {
      type: "texture"
    }).content;
  }
  init() {
    let e = new PlaneGeometry(1, 1);
    let t = new InstancedBufferGeometry();
    for (let l in e.attributes) {
      t.attributes[l] = e.attributes[l];
    }
    t.index = e.index;
    let r = new Float32Array(this.COUNT);
    let n = new Float32Array(this.COUNT * 4);
    let a = new Float32Array(this.COUNT * 4);
    for (let l = 0, c = 0, u = 0; l < this.COUNT; l++, c += 3, u += 4) {
      r[l] = l / this.COUNT;
      let f = goalWhiteTunnelStickerData[l % goalWhiteTunnelStickerData.length];
      n[u + 0] = f.x / this.textureSize.x;
      n[u + 1] = f.y / this.textureSize.y;
      n[u + 2] = f.w / this.textureSize.x;
      n[u + 3] = f.h / this.textureSize.y;
      a[u] = Math.random();
      a[u + 1] = Math.random();
      a[u + 2] = Math.random();
      a[u + 3] = Math.random();
    }
    t.setAttribute("instanceId", new InstancedBufferAttribute(r, 1));
    t.setAttribute("instanceUvInfo", new InstancedBufferAttribute(n, 4));
    t.setAttribute("instanceRands", new InstancedBufferAttribute(a, 4));
    this.material = new ShaderMaterial({
      vertexShader: vert$c,
      fragmentShader: frag$g,
      uniforms: {
        u_time: properties.sharedUniforms.u_time,
        u_activeRatio: this.sharedUniforms.u_activeRatio,
        u_texture: this.sharedUniforms.u_texture,
        u_textureSize: this.sharedUniforms.u_textureSize,
        u_bgColor: {
          value: new Color()
        },
        u_aspect: properties.sharedUniforms.u_aspect
      },
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: SrcAlphaFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: ZeroFactor,
      blendDstAlpha: ZeroFactor
    });
    this.material.defines.COUNT = this.COUNT;
    this.mesh = new Mesh(t, this.material);
    this.mesh.frustumCulled = false;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    const {
      whiteTunnelWaitRatio: t
    } = goalTunnels;
    this.activeRatio = math.fit(t, 0, 0.2, 0, 1);
    this.container.visible = this.activeRatio > 0;
    this.material.uniforms.u_activeRatio.value = this.activeRatio;
    this.material.uniforms.u_bgColor.value.copy(properties.bgColor);
  }
}
const goalWhiteTunnelStickers = new GoalWhiteTunnelStickers();
class GoalTunnels extends Stage3D {
  THRESHOLD = [0, 0.3, 0.8, 1];
  blackTitleRatio = 0;
  blackTunnelRatio = 0;
  whiteTunnelRatio = 0;
  frameHeight = 1;
  EndCameraDepthToFrame = 2;
  isBlackTitleActive = false;
  isBlackTunnelActive = false;
  isWhiteTunnelActive = false;
  expectedFov = 45;
  freezeRatio = 0;
  tunnelDeltaTime = 1;
  tunnelTime = 1;
  sharedUniforms = {
    u_whiteTunnelRatio: {
      value: 0
    },
    u_tunnelTime: {
      value: 0
    }
  };
  constructor() {
    super({
      ratio: 0,
      properties: {
        defaultCameraPosition: new Vector3(0, 0, 25),
        defaultLookAtPosition: new Vector3(0, 0, 24),
        cameraLookStrength: 0.2,
        cameraLookEaseDamp: 0.1,
        bloomAmount: 0,
        cameraFov: 30,
        haloRGBShift: 0.015,
        clearAlpha: 0
      }
    });
  }
  preInit() {
    goalTunnelEfx.init();
    properties.postprocessing.queue.push(goalTunnelEfx);
    goalTunnelAstronauts.preInit();
    goalBlackTunnel.preInit();
    goalWhiteTunnel.preInit();
    goalTunnelsBackground.preInit();
    goalWhiteTunnelParticles.preInit();
    goalWhiteTunnelStickers.preInit();
    this.add(goalTunnelsBackground.container);
    this.add(goalBlackTunnel.container);
    this.add(goalWhiteTunnel.container);
    this.add(goalWhiteTunnelParticles.container);
    this.add(goalWhiteTunnelStickers.container);
    goalTunnelGlass.preInit();
    homePage.preUfxContainer.add(goalTunnelGlass.container);
  }
  init() {
    goalTunnelAstronauts.init();
    goalBlackTunnel.init();
    goalWhiteTunnel.init();
    goalTunnelGlass.init();
    goalTunnelsBackground.init();
    goalWhiteTunnelParticles.init();
    goalWhiteTunnelStickers.init();
    this.resetAstronautLayer();
    taskManager.add(this);
  }
  resize(e, t) {
    goalTunnelAstronauts.resize(e, t);
    goalBlackTunnel.resize(e, t);
    goalWhiteTunnel.resize(e, t);
    goalTunnelsBackground.resize(e, t);
    goalWhiteTunnelParticles.resize(e, t);
    goalWhiteTunnelStickers.resize(e, t);
  }
  updateRatios() {
    this.blackFrameInRatio = math.saturate(homeGoalSectionRanges.getRange("blackFrameIn").ratio);
    this.blackTitleRatio = math.saturate(homeGoalSectionRanges.getRange("blackTitle").ratio);
    this.blackTunnelRatio = math.saturate(homeGoalSectionRanges.getRange("blackTunnel").ratio);
    this.whiteFrameRatio = math.saturate(homeGoalSectionRanges.getRange("whiteTunnel").ratio);
    this.whiteFrameOutRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameOut").ratio);
    this.whiteFrameBreakRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameBreak").ratio);
    this.astronautDropRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautDrop").ratio);
    this.whiteTunnelRatio = math.saturate(homeGoalSectionRanges.getRange("whiteTunnel", "whiteFrameOut").ratio);
    this.whiteTunnelAstronautRatio = math.saturate(homeGoalSectionRanges.getRange("whiteTunnel", "whiteFrameBreak").ratio);
    this.whiteTunnelAstronautOutRatio = math.saturate(homeGoalSectionRanges.getRange("whiteFrameBreak", "astronautWait").ratio);
    this.whiteTunnelWaitRatio = math.saturate(homeGoalSectionRanges.getRange("astronautWait").ratio);
    let e = this.isBlackTunnelActive;
    let t = this.isWhiteTunnelActive;
    this.isBlackTitleActive = this.blackTitleRatio < 1;
    this.isBlackTunnelActive = this.blackTunnelRatio < 1 && !this.isBlackTitleActive;
    this.isWhiteTunnelActive = this.whiteTunnelRatio <= 1 && !this.isBlackTunnelActive && !this.isBlackTitleActive;
    goalBlackTunnel.container.visible = this.isBlackTunnelActive;
    goalWhiteTunnel.container.visible = this.isWhiteTunnelActive && this.astronautDropRatio < 1;
    if (goalTunnelGlass.container) {
      goalTunnelGlass.container.visible = goalTunnelGlass.container.visible && this.astronautDropRatio < 1;
      goalTunnelGlass.fragmentScale = math.fit(this.astronautDropRatio, 0.75, 1, 1, 0);
    }
    if (this.isWhiteTunnelActive && !t || this.isBlackTunnelActive && !e) {
      goalTunnelEfx.needsSync = true;
    }
    this.sharedUniforms.u_whiteTunnelRatio.value = this.whiteTunnelRatio;
    let r = math.mix(this.frameHeight, properties.viewportHeight, this.blackFrameInRatio < 1 ? this.blackFrameInRatio : 1 - this.whiteFrameRatio);
    let n = this.expectedFov / 180 * Math.PI;
    let a = this.defaultCameraPosition.distanceTo(this.defaultLookAtPosition);
    let l = Math.tan(n / 2) * a * 2 * properties.viewportHeight / r;
    this.properties.cameraFov = Math.atan(l / 2 / a) * 2 / Math.PI * 180;
    goalTunnelEfx.offsetPostion.set(0, 0, 0);
    goalTunnelEfx.offsetRotation.set(0, 0, 0);
    goalTunnelEfx.offsetScale.set(1, 1, 1);
    goalTunnelEfx.amount = 1;
  }
  syncProperties(e) {
    this.properties.haloStrength = this.blackFrameInRatio * (math.mix(0, 0.15, this.blackTitleRatio) + math.fit(this.blackTunnelRatio, 0.2, 0.4, 0, 0.25));
    this.properties.haloStrength = math.fit(this.blackTunnelRatio, 0.65, 0.75, this.properties.haloStrength, 0.08);
    this.properties.bloomSaturation = this.blackTunnelRatio < 1 ? math.fit(this.blackTunnelRatio, 0, 0.7, 1, 3) : 1;
    if (this.isWhiteTunnelActive) {
      this.properties.bloomAmount = this.astronautDropRatio < 1 ? math.fit(this.whiteFrameRatio, 0, 0.05, 4, 2) : math.fit(this.whiteTunnelWaitRatio, 0, 0.1, 0, 20);
      this.properties.haloStrength = 0;
      this.properties.clearAlpha = math.fit(this.whiteTunnelWaitRatio, 0, 0.1, 0.3, 0);
      this.properties.cameraNear = 1;
      this.properties.cameraFar = 200;
    } else {
      this.properties.bloomAmount = math.fit(this.blackTitleRatio, 0, 0.25, 30, 6);
      this.properties.cameraNear = 1;
      this.properties.cameraFar = 200;
    }
    this.properties.cameraLookStrength = math.smoothstep(0.5, 1, this.blackTitleRatio) * 0.08 + 0.02;
    this.properties.cameraLookStrength *= this.whiteTunnelRatio > 0 ? math.fit(this.whiteTunnelAstronautOutRatio, 0.75, 1, 0, 0.5) : 1;
    this.properties.cameraLookStrength = math.fit(this.whiteTunnelWaitRatio, 0, 0.1, this.properties.cameraLookStrength, 0.05);
    this.freezeRatio += ((input.isDown ? 1 : 0) - this.freezeRatio) * 0.1;
    this.tunnelDeltaTime = math.fit(this.freezeRatio, 0, 1, 1, 0.3) * e;
    this.tunnelDeltaTime = math.fit(this.blackFrameInRatio, 0, 1, e, this.tunnelDeltaTime);
    this.tunnelDeltaTime = math.fit(this.whiteTunnelAstronautOutRatio, 0.5, 0.75, this.tunnelDeltaTime, e);
    this.tunnelTime += this.tunnelDeltaTime;
    this.sharedUniforms.u_tunnelTime.value = this.tunnelTime;
    this.properties.autoScrollSpeed = (1 - this.freezeRatio) * input.lastScrollYDirection * 2.5 * math.fit(this.blackFrameInRatio, 0, 0.5, 0, 1) * math.fit(this.whiteTunnelWaitRatio, 0, 0.25, 1, 0);
  }
  resetAstronautLayer() {
    this.add(goalTunnelAstronauts.container);
  }
  update(e) {
    if (this.isBlackTitleActive) {
      properties.bgColor.setStyle("#000");
    }
    if (this.isBlackTunnelActive) {
      properties.bgColor.setStyle("#000");
      goalBlackTunnel.update(this.tunnelDeltaTime);
    }
    if (this.isWhiteTunnelActive) {
      properties.bgColor.setStyle(this.astronautDropRatio < 1 ? "#fff" : "#000");
      goalWhiteTunnel.update(this.tunnelDeltaTime);
      if (this.whiteTunnelRatio == 1 && this.astronautDropRatio < 1) {
        homePage.preUfxContainer.add(goalTunnelAstronauts.container);
      }
    }
    goalTunnelAstronauts.update(this.tunnelDeltaTime);
    goalTunnelGlass.update(e);
    goalTunnelsBackground.update(e);
    goalWhiteTunnelParticles.update(e);
    goalWhiteTunnelStickers.update(e);
  }
}
const goalTunnels = new GoalTunnels();
const frameBgVert = `#define GLSLIFY 1
attribute vec2 position;uniform vec2 u_viewportResolution;uniform vec2 u_frameOffset;uniform float u_frameScale;uniform float u_frameRotate;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform vec2 u_dom2Offset;uniform vec2 u_dom2WH;varying vec2 v_uv;varying vec2 v_uv2;mat2 getRotation2D(float a){float s=sin(a);float c=cos(a);return mat2(c,-s,s,c);}void main(){v_uv=position*0.5+0.5;v_uv.y=1.0-v_uv.y;v_uv=(v_uv*u_viewportResolution-u_domXY-u_domWH*0.5);v_uv-=u_frameOffset;v_uv=getRotation2D(u_frameRotate)*v_uv;v_uv/=u_frameScale;v_uv2=v_uv+(-u_dom2Offset);v_uv2=(v_uv2+u_dom2WH*0.5)/u_dom2WH;v_uv=(v_uv+u_domWH*0.5)/u_domWH;gl_Position=vec4(position,0.0,1.0);}`;
const frameBgFrag = `#define GLSLIFY 1
uniform sampler2D u_dom2Texture;uniform vec3 u_bgColor;uniform vec2 u_domWH;uniform vec2 u_dom2WH;uniform float u_globalRadius;uniform float u_radiusScale;uniform vec3 u_glowColor;uniform float u_glowRadius;uniform float u_glowUpperBound;uniform float u_glowPow;uniform float u_glowTint;varying vec2 v_uv;varying vec2 v_uv2;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}float sdRoundedBox(in vec2 p,in vec2 b,in float r){vec2 q=abs(p)-b+r;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r;}float getRoundedCornerMask(vec2 uv,vec2 size,float radius,float ratio){vec2 halfSize=size*0.5;float maxDist=length(halfSize);float minSize=min(halfSize.x,halfSize.y);float maxSize=max(halfSize.x,halfSize.y);float t=ratio*maxDist;radius=mix(minSize*linearStep(0.,minSize,t),radius,linearStep(maxSize,maxDist,t));halfSize=min(halfSize,vec2(t));float d=sdRoundedBox((uv-.5)*size,halfSize,radius);return smoothstep(0.,0.-fwidth(d),d);}float sdBox(in vec2 p,in vec2 b){vec2 w=abs(p)-b;vec2 s=vec2(p.x<0.0?-1:1,p.y<0.0?-1:1);float g=max(w.x,w.y);return(g>0.0)?length(max(w,0.0)):g;}void main(){vec3 map=texture2D(u_dom2Texture,v_uv2).rgb;float opacity=1.-getRoundedCornerMask(v_uv,u_domWH,u_globalRadius*u_radiusScale,1.);vec3 color=u_bgColor;float shadow=1.0;vec2 lightPos=vec2(2.,1.5);vec2 tabletSize=vec2(u_domWH.x/u_domWH.y,1.);float tabletRadiusOffset=0.05;vec2 pos=(v_uv*2.-1.)*tabletSize;vec2 toLight=normalize(lightPos-pos);float dist=sdBox(pos,tabletSize-tabletRadiusOffset)-u_glowRadius-tabletRadiusOffset;color=mix(u_glowColor,color,pow(linearStep(0.,u_glowUpperBound,dist),u_glowPow));color=mix(color,mix(map.ggg,map.ggg*u_glowColor,u_glowTint),1.-map.r);gl_FragColor=vec4(color,opacity);}`;
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
