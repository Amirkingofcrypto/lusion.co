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