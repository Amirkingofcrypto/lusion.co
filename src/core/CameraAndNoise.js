/**
 * ============================================================================
 * Lusion Modular Component: 12-noise-camera-controls
 * File: src/core/CameraAndNoise.js
 * Description: TextureHelper, Simple1DNoise, BrownianMotion, PostEffect, GoalTunnelEfx, GoalBlackTunnel & CameraControls
 * Original Engine Lines: 34346 - 35815
 * ============================================================================
 */
class TextureHelper {
  blackTexture;
  whiteTexture;
  transparentTexture;
  channelMixerMaterial;
  init() {
    this.blackTexture = this._createPixelTexture([0, 0, 0, 255]);
    this.whiteTexture = this._createPixelTexture([255, 255, 255, 255]);
    this.transparentTexture = this._createPixelTexture([0, 0, 0, 0]);
  }
  _createPixelTexture(e) {
    return fboHelper.createDataTexture(new Uint8Array(e), 1, 1, false, true);
  }
  mixChannels(e, t, r = -1, n = -1, a = -1, l = -1) {
    this.channelMixerMaterial ||= fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_channelMixerR: {
          value: new Vector4()
        },
        u_channelMixerG: {
          value: new Vector4()
        },
        u_channelMixerB: {
          value: new Vector4()
        },
        u_channelMixerA: {
          value: new Vector4()
        }
      },
      vertexShader: fboHelper.vertexShader,
      fragmentShader: fboHelper.precisionPrefix + channelMixerFrag,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendDst: OneFactor,
      blendSrc: OneFactor,
      blendEquationAlpha: AddEquation,
      blendDstAlpha: OneFactor,
      blendSrcAlpha: OneFactor
    });
    this.channelMixerMaterial.uniforms.u_texture.value = e;
    this.channelMixerMaterial.uniforms.u_channelMixerR.value.set(+(r % 4 == 0), +(r % 4 == 1), +(r % 4 == 2), +(r % 4 == 3)).multiplyScalar(r < 0 ? 0 : 1);
    this.channelMixerMaterial.uniforms.u_channelMixerG.value.set(+(n % 4 == 0), +(n % 4 == 1), +(n % 4 == 2), +(n % 4 == 3)).multiplyScalar(n < 0 ? 0 : 1);
    this.channelMixerMaterial.uniforms.u_channelMixerB.value.set(+(a % 4 == 0), +(a % 4 == 1), +(a % 4 == 2), +(a % 4 == 3)).multiplyScalar(a < 0 ? 0 : 1);
    this.channelMixerMaterial.uniforms.u_channelMixerA.value.set(+(l % 4 == 0), +(l % 4 == 1), +(l % 4 == 2), +(l % 4 == 3)).multiplyScalar(l < 0 ? 0 : 1);
    let c = fboHelper.getColorState();
    fboHelper.renderer.autoClear = false;
    fboHelper.render(this.channelMixerMaterial, t);
    fboHelper.setColorState(c);
  }
}
const textureHelper = new TextureHelper();
class Simple1DNoise {
  static MAX_VERTICES = 512;
  static MAX_VERTICES_MASK = Simple1DNoise.MAX_VERTICES - 1;
  _scale = 1;
  _amplitude = 1;
  _r = [];
  constructor(e) {
    let t = e ? math.getSeedRandomFn(e) : Math.random;
    for (let r = 0; r < Simple1DNoise.MAX_VERTICES; ++r) {
      this._r.push(t() - 0.5);
    }
  }
  getVal(e) {
    const t = e * this._scale;
    const r = Math.floor(t);
    const n = t - r;
    const a = n * n * (3 - n * 2);
    const l = r & Simple1DNoise.MAX_VERTICES_MASK;
    const c = l + 1 & Simple1DNoise.MAX_VERTICES_MASK;
    return math.mix(this._r[l], this._r[c], a) * this._amplitude;
  }
  getFbm(e, t) {
    let r = 0;
    let n = 0.5;
    for (let a = 0; a < t; a++) {
      r += n * this.getVal(e);
      e *= 2;
      n *= 0.5;
    }
    return r;
  }
  get amplitude() {
    return this._amplitude;
  }
  set amplitude(e) {
    this._amplitude = e;
  }
  get scale() {
    return this._scale;
  }
  set scale(e) {
    this._scale = e;
  }
}
const _v$2 = new Vector3();
class BrownianMotion {
  _position = new Vector3();
  _rotation = new Quaternion();
  _euler = new Euler();
  _scale = new Vector3(1, 1, 1);
  _matrix = new Matrix4();
  _enablePositionNoise = true;
  _enableRotationNoise = true;
  _positionFrequency = 0.25;
  _rotationFrequency = 0.25;
  _positionAmplitude = 0.3;
  _rotationAmplitude = 0.003;
  _positionScale = new Vector3(1, 1, 1);
  _rotationScale = new Vector3(1, 1, 0);
  _positionFractalLevel = 3;
  _rotationFractalLevel = 3;
  _times = new Float32Array(6);
  _noise = new Simple1DNoise();
  static FBM_NORM = 1 / 0.75;
  constructor() {
    this.rehash();
  }
  rehash() {
    for (let e = 0; e < 6; e++) {
      this._times[e] = Math.random() * -10000;
    }
  }
  update(e) {
    const t = e === undefined ? 16.666666666666668 : e;
    if (this._enablePositionNoise) {
      for (let r = 0; r < 3; r++) {
        this._times[r] += this._positionFrequency * t;
      }
      _v$2.set(this._noise.getFbm(this._times[0], this._positionFractalLevel), this._noise.getFbm(this._times[1], this._positionFractalLevel), this._noise.getFbm(this._times[2], this._positionFractalLevel));
      _v$2.multiply(this._positionScale);
      _v$2.multiplyScalar(this._positionAmplitude * BrownianMotion.FBM_NORM);
      this._position.copy(_v$2);
    }
    if (this._enableRotationNoise) {
      for (let r = 0; r < 3; r++) {
        this._times[r + 3] += this._rotationFrequency * t;
      }
      _v$2.set(this._noise.getFbm(this._times[3], this._rotationFractalLevel), this._noise.getFbm(this._times[4], this._rotationFractalLevel), this._noise.getFbm(this._times[5], this._rotationFractalLevel));
      _v$2.multiply(this._rotationScale);
      _v$2.multiplyScalar(this._rotationAmplitude * BrownianMotion.FBM_NORM);
      this._euler.set(_v$2.x, _v$2.y, _v$2.z);
      this._rotation.setFromEuler(this._euler);
    }
    this._matrix.compose(this._position, this._rotation, this._scale);
  }
  get positionAmplitude() {
    return this._positionAmplitude;
  }
  set positionAmplitude(e) {
    this._positionAmplitude = e;
  }
  get positionFrequency() {
    return this._positionFrequency;
  }
  set positionFrequency(e) {
    this._positionFrequency = e;
  }
  get rotationAmplitude() {
    return this._rotationAmplitude;
  }
  set rotationAmplitude(e) {
    this._rotationAmplitude = e;
  }
  get rotationFrequency() {
    return this._rotationFrequency;
  }
  set rotationFrequency(e) {
    this._rotationFrequency = e;
  }
  get matrix() {
    return this._matrix;
  }
  set matrix(e) {
    this._matrix = e;
  }
}
const vert$h = `#define GLSLIFY 1
attribute float ao;attribute float areaRatio;attribute float cluster;attribute float height;attribute vec3 center;attribute vec3 instancePos;attribute vec3 instanceGridIds;attribute vec3 instanceAxis;attribute vec4 tangent;uniform float u_time;uniform float u_showRatio;uniform float u_offsetZ;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying float v_ao;varying float v_opacity;varying float v_emission;varying vec2 v_uv;varying vec4 v_rands;varying float v_depth;
#define PI 3.14159265359
vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float angle){float halfAngle=angle*0.5;return vec4(axis*sin(halfAngle),cos(halfAngle));}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash44(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}
#include <goalBlackTunnelTransform>
void main(){vec3 pos=position;vec3 nor=normal;vec3 tang=tangent.xyz;
#ifdef IS_HD
float blockId=floor(pos.x+0.5);
#else
float blockId=0.;
#endif
vec4 q;vec3 offsetInstanceGridIds=instanceGridIds;offsetInstanceGridIds.z-=floor(u_offsetZ/float(GRID_SIZE))*2.;vec4 instanceRand1s=hash44(floor(vec4(offsetInstanceGridIds+.5,blockId+cluster)));v_rands=hash44(floor(vec4(offsetInstanceGridIds+.5,100.0)));float showRatio=u_showRatio;showRatio*=1.-step(10.5,instanceGridIds.z)*mod(u_offsetZ/float(GRID_SIZE),1.);
#ifdef IS_HD
pos=mix(center,pos,showRatio);
#else
pos.xy*=showRatio*showRatio;pos.z*=showRatio;
#endif
#ifdef IS_HD
pos.x-=blockId;float blockOffset=sin(u_time*2.+cos(u_time*4.+0.2+offsetInstanceGridIds.z))*0.15*instanceRand1s.y;float heightRatio=1.;pos.y=pos.y*height*heightRatio+(0.025+blockOffset);float variation=floor(instanceRand1s.x*8.);q=quaternion(vec3(0.,0.,variation>3.5 ?-1. : 1.),(mod(blockId,4.)+mod(variation,4.))*PI*0.5);pos=qrotate(q,pos);nor=qrotate(q,nor);tang=qrotate(q,tang);
#endif
q=quaternion(instanceAxis,PI*0.5);pos=qrotate(q,pos)*float(GRID_SIZE)+instancePos;nor=qrotate(q,nor);tang=qrotate(q,tang);pos.z+=mod(u_offsetZ,float(GRID_SIZE));v_depth=-pos.z;pos=goalBlackTunnelTransform(pos);
#ifdef IS_HD
v_ao=ao;v_emission=areaRatio<0.25 ? sin(pos.z*0.25-u_time)*0.5+0.5 : 0.;
#else
v_ao=1.;v_emission=0.;
#endif
v_opacity=linearStep(57.,30.,length(pos.xy))*linearStep(5.+100.,5.+100.-20.,cameraPosition.z-pos.z);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);}`;
const frag$k = `#define GLSLIFY 1
uniform sampler2D u_feedbackTexture;uniform sampler2D u_greebleArmbTexture;uniform sampler2D u_greebleNormalTexture;uniform vec2 u_resolution;uniform float u_outRatio;uniform vec3 u_outBloomFromToStrength;uniform vec3 u_color1;uniform vec3 u_color2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec4 v_rands;varying float v_ao;varying float v_opacity;varying float v_emission;varying float v_depth;varying vec2 v_uv;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec2 screenUv=gl_FragCoord.xy/u_resolution;float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 worldNormal=normalize(v_worldNormal)*faceDirection;vec3 worldTangent=normalize(v_worldTangent.xyz)*faceDirection;vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_greebleNormalTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_greebleArmbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 lightPos=vec3(0.0,-0.0,-100.0);vec3 toLight=normalize(lightPos-v_worldPosition);float diffuse=(dot(worldNormal,toLight)*0.5+0.5);
#ifdef IS_HD
float feedbackMultiplier=2.5;
#else
float feedbackMultiplier=2.0;
#endif
vec3 color1=u_color1;vec3 color2=u_color2;vec3 baseColor=0.5+mix(color1,color2,v_rands.x)*1.2;vec3 emissiveColor=mix(color1,color2,v_rands.y)*3.5;diffuse*=(0.5+texture2D(u_feedbackTexture,screenUv+worldNormal.xy*0.02).r*feedbackMultiplier);gl_FragColor.rgb=baseColor*vec3(ao*0.75*diffuse)+emissiveColor*v_emission;gl_FragColor.rgb*=v_opacity;float endBloomStrength=linearStep(u_outBloomFromToStrength.x,u_outBloomFromToStrength.y,v_depth)*u_outBloomFromToStrength.z;float bloomScale=linearStep(5.0,20.0,v_depth)*(1.0-linearStep(15.0,25.0,length(v_worldPosition.xy)));gl_FragColor.a=bloomScale*max(0.,dot(gl_FragColor.rgb,vec3(.299,.587,.114))*2.5-1.)+endBloomStrength*0.75;gl_FragColor.rgb+=endBloomStrength*(0.35+gl_FragColor.rgb*0.65);}`;
const goalBlackTunnelTransformShader = `#define GLSLIFY 1
uniform float u_blackTunnelTransformRatio;vec3 goalBlackTunnelTransform(vec3 pos){float t=u_blackTunnelTransformRatio*6.2831853;float zWeight=pos.z*0.025;float angle=t*zWeight*zWeight*sign(zWeight);float sa=sin(angle);float ca=cos(angle);mat2 m2=mat2(ca,-sa,sa,ca);pos.xy=m2*pos.xy;pos.z+=t*1.;pos=pos.xzy;float rad=20.;pos/=rad;vec3 a=pos;vec2 pq=vec2(-1.,.5)*t;float ada=dot(a,a);vec4 b=vec4(2.*a,ada-1.)/(1.+ada);vec4 pq_cs=vec4(cos(pq),sin(pq)).xzyw;vec2 np1=vec2(-1.,1.);vec4 c=(b.xxyy*np1.yxyy*pq_cs+b.zzww*np1.yyxy*pq_cs.yxwz).xzyw;pos=c.xyz/(1.-c.w);pos=pos.xzy;return pos*rad;}`;
class PostEffect {
  sharedUniforms = {};
  enabled = true;
  material = null;
  renderOrder = 0;
  _hasShownWarning = false;
  init(e) {
    Object.assign(this, e);
  }
  needsRender() {
    return true;
  }
  warn(e) {
    if (!this._hasShownWarning) {
      console.warn(e);
      this._hasShownWarning = true;
    }
  }
  setPostprocessing(e) {}
  render(e, t = false) {
    if (this.material.uniforms.u_texture) {
      this.material.uniforms.u_texture.value = e.fromTexture;
    }
    fboHelper.render(this.material, t ? null : e.toRenderTarget);
    e.swap();
  }
}
const fragmentShader$4 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform sampler2D u_depthTexture;uniform mat4 u_projectionViewInverseMatrix;uniform mat4 u_prevProjectionViewMatrix;uniform vec2 u_aspect;uniform float u_amount;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 bnoise=getBlueNoise(gl_FragCoord.xy);float depth=texture2D(u_depthTexture,v_uv+bnoise.yz*0.01*u_aspect).r;vec4 ndc=vec4(v_uv.xy*2.0-1.0,depth,1.0);vec4 worldPos=u_projectionViewInverseMatrix*ndc;vec4 prevPos=u_prevProjectionViewMatrix*worldPos;prevPos/=prevPos.w;prevPos.xy=prevPos.xy*0.5+0.5;vec2 velocity=(prevPos.xy-v_uv)/16.0*u_amount;vec2 uv=v_uv+bnoise.xy*velocity;vec4 color=vec4(0.0);float weightSum=0.0;float weight=1.0;float weightFalloff=1.0;for(int i=0;i<16;i++){color+=texture2D(u_texture,uv)*weight;uv+=velocity;weightSum+=weight;weight*=weightFalloff;}gl_FragColor=color/weightSum;}`;
class GoalTunnelEfx extends PostEffect {
  needsSync = true;
  amount = 1;
  _position = null;
  _quaternion = null;
  _scale = null;
  _q = null;
  projectionMatrix = null;
  prevProjectionMatrix = null;
  projectionViewMatrix = null;
  prevProjectionViewMatrix = null;
  projectionViewInverseMatrix = null;
  offsetPostion = null;
  offsetRotation = null;
  offsetScale = null;
  isActive = false;
  init(e) {
    Object.assign(this, e);
    super.init();
    this._position = new Vector3();
    this._quaternion = new Quaternion();
    this._scale = new Vector3(1, 1, 1);
    this._q = new Quaternion();
    this.offsetPostion = new Vector3(0, 0, 0);
    this.offsetRotation = new Euler(0, 0, 0);
    this.offsetScale = new Vector3(1, 1, 1);
    this.projectionViewMatrix = new Matrix4();
    this.prevProjectionViewMatrix = new Matrix4();
    this.projectionViewInverseMatrix = new Matrix4();
    this.finalPrevMatrix = new Matrix4();
    this.extraTransformMatrix = new Matrix4();
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_time: properties.sharedUniforms.u_time,
        u_texture: {
          value: null
        },
        u_depthTexture: {
          value: null
        },
        u_amount: {
          value: 1
        },
        u_aspect: properties.postprocessing.sharedUniforms.u_aspect,
        u_projectionViewInverseMatrix: {
          value: this.projectionViewInverseMatrix
        },
        u_prevProjectionViewMatrix: {
          value: this.finalPrevMatrix
        }
      }, blueNoise.sharedUniforms),
      fragmentShader: fragmentShader$4
    });
  }
  needsRender(e) {
    let t = this.amount > 0;
    this.needsSync = !t;
    return t && this.isActive;
  }
  syncCamera(e) {
    this.needsSync = true;
    if (e) {
      e.matrixWorldInverse.decompose(this._position, this._quaternion, this._scale);
      this.projectionViewMatrix.multiplyMatrices(e.projectionMatrix, e.matrixWorldInverse);
      this.projectionViewInverseMatrix.copy(this.projectionViewMatrix).invert();
    }
    this.prevProjectionViewMatrix.copy(this.projectionViewMatrix);
  }
  render(e, t = false) {
    let r = e.camera;
    this.material.uniforms.u_depthTexture = e.sharedUniforms.u_sceneDepthTexture;
    this.material.uniforms.u_amount.value = this.amount;
    if (this.needsSync || e.hasSizeChanged) {
      this.syncCamera(r);
      this.needsSync = false;
    } else {
      this.prevProjectionViewMatrix.copy(this.projectionViewMatrix);
    }
    this.projectionViewMatrix.multiplyMatrices(r.projectionMatrix, r.matrixWorldInverse);
    this.projectionViewInverseMatrix.copy(this.projectionViewMatrix).invert();
    this.extraTransformMatrix.compose(this.offsetPostion, this._q.setFromEuler(this.offsetRotation), this.offsetScale).invert();
    this.finalPrevMatrix.copy(this.prevProjectionViewMatrix);
    this.finalPrevMatrix.multiply(this.extraTransformMatrix);
    super.render(e, t);
  }
}
const goalTunnelEfx = new GoalTunnelEfx();
const _c1$3 = new Color();
const _c2$2 = new Color();
const COLOR_1 = ["#0d2b27", "#ba0000", "#00b5a6", "#0099ff"];
const COLOR_2 = ["#8c8c8c", "#008e6b", "#7e7f05", "#ff0000"];
class GoalBlackTunnel {
  container = new Object3D();
  GRID_SIZE = 20;
  textures = {};
  feedbackRenderTarget = null;
  _structureGeometries = {};
  _baseGeometries = {};
  sharedUniforms = {
    u_blackTunnelTransformRatio: {
      value: 0
    },
    u_showRatio: {
      value: 1
    },
    u_outBloomFromToStrength: {
      value: new Vector3(0, 70, 0)
    },
    u_offsetZ: {
      value: 0
    },
    u_feedbackTexture: {
      value: null
    },
    u_greebleArmbTexture: {
      value: null
    },
    u_greebleNormalTexture: {
      value: null
    },
    u_color1: {
      value: new Color()
    },
    u_color2: {
      value: new Color()
    }
  };
  textureTypeList = ["arm", "base", "nor"];
  timeBasedPulseTime = 0;
  timeBasedLinearTime = 0;
  preInit() {
    let e = ["ld", "hd"];
    shaderHelper.addChunk("goalBlackTunnelTransform", goalBlackTunnelTransformShader);
    this.feedbackRenderTarget = fboHelper.createRenderTarget(1, 1);
    this.feedbackRenderTarget.texture.wrapS = this.feedbackRenderTarget.texture.wrapT = MirroredRepeatWrapping;
    this.sharedUniforms.u_feedbackTexture.value = this.feedbackRenderTarget.texture;
    for (let t = 0; t < e.length; t++) {
      let r = e[t];
      properties.loader.add(settings.MODEL_PATH + "tunnels/grid_structure_" + r + ".buf", {
        onLoad: this._onGeometryLoad.bind(this, r, "structure")
      });
      properties.loader.add(settings.MODEL_PATH + "tunnels/grid_base_" + r + ".buf", {
        onLoad: this._onGeometryLoad.bind(this, r, "base")
      });
    }
    for (let t = 0; t < this.textureTypeList.length; t++) {
      let r = this.textureTypeList[t];
      properties.loader.add(settings.TEXTURE_PATH + "tunnels/grids/greeble_" + r + ".webp", {
        type: "texture",
        onLoad: this._onGreebleTextureLoad.bind(this, r)
      });
    }
  }
  _onGeometryLoad(e, t, r) {
    if (t == "structure") {
      this._structureGeometries[e] = r;
    } else {
      this._baseGeometries[e] = r;
    }
    let n = this._baseGeometries[e];
    let a = this._structureGeometries[e];
    if (n && a) {
      let l = new InstancedBufferGeometry();
      for (let f in n.attributes) {
        l.attributes[f] = n.attributes[f];
      }
      l.index = n.index;
      l.setAttribute("instancePos", new InstancedBufferAttribute(a.attributes.position.array, 3));
      l.setAttribute("instanceGridIds", new InstancedBufferAttribute(a.attributes.gridIds.array, 3));
      l.setAttribute("instanceAxis", new InstancedBufferAttribute(a.attributes.rotAxis.array, 3));
      let c = Object.assign({
        u_time: goalTunnels.sharedUniforms.u_tunnelTime,
        u_resolution: properties.sharedUniforms.u_resolution
      }, this.sharedUniforms);
      let u = new Mesh(l, new ShaderMaterial({
        uniforms: c,
        vertexShader: vert$h,
        fragmentShader: frag$k,
        side: DoubleSide
      }));
      u.material.defines.GRID_SIZE = this.GRID_SIZE;
      u.material.defines.IS_HD = e == "hd";
      u.frustumCulled = false;
      if (e == "hd") {
        u.onAfterRender = this._onAfterRender.bind(this);
        u.renderOrder = 2;
      } else {
        u.renderOrder = 1;
      }
      this.container.add(u);
    }
  }
  _onAfterRender() {
    let e = fboHelper.getColorState();
    let t = fboHelper.renderer.getRenderTarget();
    fboHelper.clearMultisampleRenderTargetState(t);
    fboHelper.copy(t.texture, this.feedbackRenderTarget);
    fboHelper.renderer.setRenderTarget(t);
    fboHelper.setColorState(e);
  }
  _onGreebleTextureLoad(e, t) {
    this.textures[e] = t;
    t.wrapS = t.wrapT = RepeatWrapping;
    if (e == "arm" || e == "base") {
      let r = this.textures.arm;
      let n = this.textures.base;
      if (r && n) {
        let a = fboHelper.createRenderTarget(r.image.width, r.image.height, false, false);
        a.texture.wrapS = a.texture.wrapT = RepeatWrapping;
        this.textures.arm = this.textures.base = null;
        fboHelper.copy(textureHelper.transparentTexture, a);
        textureHelper.mixChannels(r, a, 0, 1, 2, -1);
        textureHelper.mixChannels(n, a, -1, -1, -1, 0);
        r.dispose();
        n.dispose();
        this.sharedUniforms.u_greebleArmbTexture.value = a.texture;
      }
    } else {
      this.sharedUniforms.u_greebleNormalTexture.value = t;
    }
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let t = 0;
    let r = Math.floor(properties.width * 0.25);
    let n = Math.floor(properties.height * 0.25);
    if (this.feedbackRenderTarget.width != r || this.feedbackRenderTarget.height != n) {
      this.feedbackRenderTarget.setSize(r, n);
      fboHelper.clearColor(0, 0, 0, 1, this.feedbackRenderTarget);
    }
    let a = math.cUnMix(0.2, 0, goalTunnels.blackTunnelRatio) * -80;
    t += a - this.container.position.z;
    this.container.position.z = a;
    this.sharedUniforms.u_showRatio.value = goalTunnels.isBlackTunnelActive ? ease.expoIn(math.cUnMix(0, 0.1, goalTunnels.blackTunnelRatio)) : 0;
    let l = this.sharedUniforms.u_outBloomFromToStrength.value;
    l.z = math.fit(goalTunnels.blackTunnelRatio, 0.65, 0.75, 0, 0.2);
    l.z = math.fit(goalTunnels.blackTunnelRatio, 0.75, 0.85, l.z, 0.15);
    l.z = math.fit(goalTunnels.blackTunnelRatio, 0.85, 1, l.z, 0.15);
    l.x = math.fit(goalTunnels.blackTunnelRatio, 0.75, 0.85, 20, 60);
    l.x = math.fit(goalTunnels.blackTunnelRatio, 0.9, 1, l.x, 30);
    let c = math.fit(goalTunnels.blackTunnelRatio, 0.6, 1, 0, 1, ease.sineIn);
    this.sharedUniforms.u_blackTunnelTransformRatio.value = c;
    const u = (input.lastScrollYDirection < 0 ? -1 : 1) * goalTunnels.tunnelDeltaTime;
    this.timeBasedPulseTime += u * math.cUnMix(0.1, 0.3, goalTunnels.blackTunnelRatio) * math.fit(c, 0, 0.25, 1, 0.5);
    this.timeBasedLinearTime += u * math.fit(c, 0, 0.25, 1.5, 1);
    let f = this.timeBasedPulseTime;
    let p = Math.floor(f);
    let g = f - p;
    let _ = (p + ease.cubicInOut(g)) * this.GRID_SIZE + this.timeBasedLinearTime * this.GRID_SIZE + goalTunnels.blackTunnelRatio * this.GRID_SIZE * 10;
    t += _ - this.sharedUniforms.u_offsetZ.value;
    this.sharedUniforms.u_offsetZ.value = _;
    goalTunnels.properties.cameraDollyZoomFovOffset = Math.sin(goalTunnels.blackTunnelRatio * 10 + properties.time * 1) * 7.5 * math.smoothstep(0, 0.2, goalTunnels.blackTunnelRatio);
    let T = COLOR_1.length * math.fit(goalTunnels.blackTunnelRatio, 0.2, 1, 0, 1);
    let M = Math.floor(T);
    let S = Math.min(Math.ceil(T), COLOR_1.length - 1);
    let b = T - M;
    _c1$3.set(COLOR_1[M]);
    _c2$2.set(COLOR_1[S]);
    _c1$3.lerp(_c2$2, b > 0.5 ? 1 : 0);
    this.sharedUniforms.u_color1.value.copy(_c1$3);
    _c1$3.set(COLOR_2[M]);
    _c2$2.set(COLOR_2[S]);
    _c1$3.lerp(_c2$2, b > 0.5 ? 1 : 0);
    this.sharedUniforms.u_color2.value.copy(_c1$3);
    goalTunnelEfx.offsetPostion.z = t * math.fit(goalTunnels.blackTunnelRatio, 0, 0.2, 0, 1);
    goalTunnelEfx.offsetRotation.z = t * c * 0.01;
    goalTunnelEfx.amount = 1;
  }
}
const goalBlackTunnel = new GoalBlackTunnel();
const _changeEvent = {
  type: "change"
};
const _startEvent = {
  type: "start"
};
const _endEvent = {
  type: "end"
};
class OrbitControls extends EventDispatcher {
  constructor(e, t) {
    super();
    if (t === undefined) {
      console.warn("THREE.OrbitControls: The second parameter \"domElement\" is now mandatory.");
    }
    if (t === document) {
      console.error("THREE.OrbitControls: \"document\" should not be used as the target \"domElement\". Please use \"renderer.domElement\" instead.");
    }
    this.object = e;
    this.domElement = t;
    this.domElement.style.touchAction = "none";
    this.enabled = true;
    this.target = new Vector3();
    this.minDistance = 0;
    this.maxDistance = Infinity;
    this.minZoom = 0;
    this.maxZoom = Infinity;
    this.minPolarAngle = 0;
    this.maxPolarAngle = Math.PI;
    this.minAzimuthAngle = -Infinity;
    this.maxAzimuthAngle = Infinity;
    this.enableDamping = false;
    this.dampingFactor = 0.15;
    this.enableZoom = false;
    this.zoomSpeed = 1;
    this.enableRotate = true;
    this.rotateSpeed = 1;
    this.enablePan = true;
    this.panSpeed = 1;
    this.screenSpacePanning = true;
    this.keyPanSpeed = 7;
    this.autoRotate = false;
    this.autoRotateSpeed = 2;
    this.keys = {
      LEFT: "ArrowLeft",
      UP: "ArrowUp",
      RIGHT: "ArrowRight",
      BOTTOM: "ArrowDown"
    };
    this.mouseButtons = {
      LEFT: MOUSE.ROTATE,
      MIDDLE: MOUSE.DOLLY,
      RIGHT: MOUSE.PAN
    };
    this.touches = {
      ONE: TOUCH.ROTATE,
      TWO: TOUCH.DOLLY_PAN
    };
    this.target0 = this.target.clone();
    this.position0 = this.object.position.clone();
    this.zoom0 = this.object.zoom;
    this.scale = 1;
    this._domElementKeyEvents = null;
    this.getPolarAngle = function () {
      return c.phi;
    };
    this.getAzimuthalAngle = function () {
      return c.theta;
    };
    this.getDistance = function () {
      return this.object.position.distanceTo(this.target);
    };
    this.listenToKeyEvents = function (Y) {
      Y.addEventListener("keydown", Oe);
      this._domElementKeyEvents = Y;
    };
    this.saveState = function () {
      r.target0.copy(r.target);
      r.position0.copy(r.object.position);
      r.zoom0 = r.object.zoom;
    };
    this.reset = function () {
      r.target.copy(r.target0);
      r.object.position.copy(r.position0);
      r.object.zoom = r.zoom0;
      r.scale = 1;
      r.object.updateProjectionMatrix();
      r.dispatchEvent(_changeEvent);
      r.update();
      a = n.NONE;
    };
    this.update = function () {
      const Y = new Vector3();
      const we = new Quaternion().setFromUnitVectors(e.up, new Vector3(0, 1, 0));
      const Ee = we.clone().invert();
      const Fe = new Vector3();
      const Xe = new Quaternion();
      const tt = Math.PI * 2;
      return function () {
        const ot = r.object.position;
        Y.copy(ot).sub(r.target);
        Y.applyQuaternion(we);
        c.setFromVector3(Y);
        if (r.autoRotate && a === n.NONE) {
          k(I());
        }
        if (r.enableDamping) {
          c.theta += u.theta * r.dampingFactor;
          c.phi += u.phi * r.dampingFactor;
        } else {
          c.theta += u.theta;
          c.phi += u.phi;
        }
        let je = r.minAzimuthAngle;
        let We = r.maxAzimuthAngle;
        if (isFinite(je) && isFinite(We)) {
          if (je < -Math.PI) {
            je += tt;
          } else if (je > Math.PI) {
            je -= tt;
          }
          if (We < -Math.PI) {
            We += tt;
          } else if (We > Math.PI) {
            We -= tt;
          }
          if (je <= We) {
            c.theta = Math.max(je, Math.min(We, c.theta));
          } else {
            c.theta = c.theta > (je + We) / 2 ? Math.max(je, c.theta) : Math.min(We, c.theta);
          }
        }
        c.phi = Math.max(r.minPolarAngle, Math.min(r.maxPolarAngle, c.phi));
        c.makeSafe();
        let Ge = r.enableDamping ? (r.scale - 1) * r.dampingFactor + 1 : r.scale;
        c.radius *= Ge;
        c.radius = Math.max(r.minDistance, Math.min(r.maxDistance, c.radius));
        if (r.enableDamping === true) {
          r.target.addScaledVector(f, r.dampingFactor);
        } else {
          r.target.add(f);
        }
        Y.setFromSpherical(c);
        Y.applyQuaternion(Ee);
        ot.copy(r.target).add(Y);
        r.object.lookAt(r.target);
        if (r.enableDamping === true) {
          u.theta *= 1 - r.dampingFactor;
          u.phi *= 1 - r.dampingFactor;
          f.multiplyScalar(1 - r.dampingFactor);
        } else {
          u.set(0, 0, 0);
          f.set(0, 0, 0);
        }
        r.scale = r.scale / Ge;
        if (p || Fe.distanceToSquared(r.object.position) > l || (1 - Xe.dot(r.object.quaternion)) * 8 > l) {
          r.dispatchEvent(_changeEvent);
          Fe.copy(r.object.position);
          Xe.copy(r.object.quaternion);
          p = false;
          return true;
        } else {
          return false;
        }
      };
    }();
    this.dispose = function () {
      r.domElement.removeEventListener("contextmenu", W);
      r.domElement.removeEventListener("pointerdown", Ue);
      r.domElement.removeEventListener("pointercancel", Me);
      r.domElement.removeEventListener("wheel", $);
      r.domElement.removeEventListener("pointermove", fe);
      r.domElement.removeEventListener("pointerup", Se);
      if (r._domElementKeyEvents !== null) {
        r._domElementKeyEvents.removeEventListener("keydown", Oe);
      }
    };
    const r = this;
    const n = {
      NONE: -1,
      ROTATE: 0,
      DOLLY: 1,
      PAN: 2,
      TOUCH_ROTATE: 3,
      TOUCH_PAN: 4,
      TOUCH_DOLLY_PAN: 5,
      TOUCH_DOLLY_ROTATE: 6
    };
    let a = n.NONE;
    const l = 0.000001;
    const c = new Spherical();
    const u = new Spherical();
    const f = new Vector3();
    let p = false;
    const g = new Vector2();
    const v = new Vector2();
    const _ = new Vector2();
    const T = new Vector2();
    const M = new Vector2();
    const S = new Vector2();
    const b = new Vector2();
    const C = new Vector2();
    const w = new Vector2();
    const R = [];
    const E = {};
    function I() {
      return Math.PI * 2 / 60 / 60 * r.autoRotateSpeed;
    }
    function F() {
      return Math.pow(0.95, r.zoomSpeed);
    }
    function k(Y) {
      u.theta -= Y;
    }
    function L(Y) {
      u.phi -= Y;
    }
    const D = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        Y.setFromMatrixColumn(Fe, 0);
        Y.multiplyScalar(-Ee);
        f.add(Y);
      };
    }();
    const ne = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        if (r.screenSpacePanning === true) {
          Y.setFromMatrixColumn(Fe, 1);
        } else {
          Y.setFromMatrixColumn(Fe, 0);
          Y.crossVectors(r.object.up, Y);
        }
        Y.multiplyScalar(Ee);
        f.add(Y);
      };
    }();
    const re = function () {
      const Y = new Vector3();
      return function (Ee, Fe) {
        const Xe = r.domElement;
        if (r.object.isPerspectiveCamera) {
          const tt = r.object.position;
          Y.copy(tt).sub(r.target);
          let Re = Y.length();
          Re *= Math.tan(r.object.fov / 2 * Math.PI / 180);
          D(Ee * 2 * Re / Xe.clientHeight, r.object.matrix);
          ne(Fe * 2 * Re / Xe.clientHeight, r.object.matrix);
        } else if (r.object.isOrthographicCamera) {
          D(Ee * (r.object.right - r.object.left) / r.object.zoom / Xe.clientWidth, r.object.matrix);
          ne(Fe * (r.object.top - r.object.bottom) / r.object.zoom / Xe.clientHeight, r.object.matrix);
        } else {
          console.warn("WARNING: OrbitControls.js encountered an unknown camera type - pan disabled.");
          r.enablePan = false;
        }
      };
    }();
    function ce(Y) {
      if (r.object.isPerspectiveCamera) {
        r.scale /= Y;
      } else if (r.object.isOrthographicCamera) {
        r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom * Y));
        r.object.updateProjectionMatrix();
        p = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        r.enableZoom = false;
      }
    }
    function z(Y) {
      if (r.object.isPerspectiveCamera) {
        r.scale *= Y;
      } else if (r.object.isOrthographicCamera) {
        r.object.zoom = Math.max(r.minZoom, Math.min(r.maxZoom, r.object.zoom / Y));
        r.object.updateProjectionMatrix();
        p = true;
      } else {
        console.warn("WARNING: OrbitControls.js encountered an unknown camera type - dolly/zoom disabled.");
        r.enableZoom = false;
      }
    }
    function j(Y) {
      g.set(Y.clientX, Y.clientY);
    }
    function X(Y) {
      b.set(Y.clientX, Y.clientY);
    }
    function Z(Y) {
      T.set(Y.clientX, Y.clientY);
    }
    function q(Y) {
      v.set(Y.clientX, Y.clientY);
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      k(Math.PI * 2 * _.x / we.clientHeight);
      L(Math.PI * 2 * _.y / we.clientHeight);
      g.copy(v);
      r.update();
    }
    function ue(Y) {
      C.set(Y.clientX, Y.clientY);
      w.subVectors(C, b);
      if (w.y > 0) {
        ce(F());
      } else if (w.y < 0) {
        z(F());
      }
      b.copy(C);
      r.update();
    }
    function oe(Y) {
      M.set(Y.clientX, Y.clientY);
      S.subVectors(M, T).multiplyScalar(r.panSpeed);
      re(S.x, S.y);
      T.copy(M);
      r.update();
    }
    function te(Y) {
      if (Y.deltaY < 0) {
        z(F());
      } else if (Y.deltaY > 0) {
        ce(F());
      }
      r.update();
    }
    function le(Y) {
      let we = false;
      switch (Y.code) {
        case r.keys.UP:
          re(0, r.keyPanSpeed);
          we = true;
          break;
        case r.keys.BOTTOM:
          re(0, -r.keyPanSpeed);
          we = true;
          break;
        case r.keys.LEFT:
          re(r.keyPanSpeed, 0);
          we = true;
          break;
        case r.keys.RIGHT:
          re(-r.keyPanSpeed, 0);
          we = true;
          break;
      }
      if (we) {
        Y.preventDefault();
        r.update();
      }
    }
    function Te() {
      if (R.length === 1) {
        g.set(R[0].pageX, R[0].pageY);
      } else {
        const Y = (R[0].pageX + R[1].pageX) * 0.5;
        const we = (R[0].pageY + R[1].pageY) * 0.5;
        g.set(Y, we);
      }
    }
    function K() {
      if (R.length === 1) {
        T.set(R[0].pageX, R[0].pageY);
      } else {
        const Y = (R[0].pageX + R[1].pageX) * 0.5;
        const we = (R[0].pageY + R[1].pageY) * 0.5;
        T.set(Y, we);
      }
    }
    function G() {
      const Y = R[0].pageX - R[1].pageX;
      const we = R[0].pageY - R[1].pageY;
      const Ee = Math.sqrt(Y * Y + we * we);
      b.set(0, Ee);
    }
    function U() {
      if (r.enableZoom) {
        G();
      }
      if (r.enablePan) {
        K();
      }
    }
    function N() {
      if (r.enableZoom) {
        G();
      }
      if (r.enableRotate) {
        Te();
      }
    }
    function he(Y) {
      if (R.length == 1) {
        v.set(Y.pageX, Y.pageY);
      } else {
        const Ee = Le(Y);
        const Fe = (Y.pageX + Ee.x) * 0.5;
        const Xe = (Y.pageY + Ee.y) * 0.5;
        v.set(Fe, Xe);
      }
      _.subVectors(v, g).multiplyScalar(r.rotateSpeed);
      const we = r.domElement;
      k(Math.PI * 2 * _.x / we.clientHeight);
      L(Math.PI * 2 * _.y / we.clientHeight);
      g.copy(v);
    }
    function ve(Y) {
      if (R.length === 1) {
        M.set(Y.pageX, Y.pageY);
      } else {
        const we = Le(Y);
        const Ee = (Y.pageX + we.x) * 0.5;
        const Fe = (Y.pageY + we.y) * 0.5;
        M.set(Ee, Fe);
      }
      S.subVectors(M, T).multiplyScalar(r.panSpeed);
      re(S.x, S.y);
      T.copy(M);
    }
    function de(Y) {
      const we = Le(Y);
      const Ee = Y.pageX - we.x;
      const Fe = Y.pageY - we.y;
      const Xe = Math.sqrt(Ee * Ee + Fe * Fe);
      C.set(0, Xe);
      w.set(0, Math.pow(C.y / b.y, r.zoomSpeed));
      ce(w.y);
      b.copy(C);
    }
    function xe(Y) {
      if (r.enableZoom) {
        de(Y);
      }
      if (r.enablePan) {
        ve(Y);
      }
    }
    function ee(Y) {
      if (r.enableZoom) {
        de(Y);
      }
      if (r.enableRotate) {
        he(Y);
      }
    }
    function Ue(Y) {
      if (r.enabled !== false) {
        if (R.length === 0) {
          r.domElement.setPointerCapture(Y.pointerId);
          r.domElement.addEventListener("pointermove", fe);
          r.domElement.addEventListener("pointerup", Se);
        }
        O(Y);
        if (Y.pointerType === "touch") {
          Ye(Y);
        } else {
          Be(Y);
        }
      }
    }
    function fe(Y) {
      if (r.enabled !== false) {
        if (Y.pointerType === "touch") {
          st(Y);
        } else {
          se(Y);
        }
      }
    }
    function Se(Y) {
      me(Y);
      if (R.length === 0) {
        r.domElement.releasePointerCapture(Y.pointerId);
        r.domElement.removeEventListener("pointermove", fe);
        r.domElement.removeEventListener("pointerup", Se);
      }
      r.dispatchEvent(_endEvent);
      a = n.NONE;
    }
    function Me(Y) {
      me(Y);
    }
    function Be(Y) {
      let we;
      switch (Y.button) {
        case 0:
          we = r.mouseButtons.LEFT;
          break;
        case 1:
          we = r.mouseButtons.MIDDLE;
          break;
        case 2:
          we = r.mouseButtons.RIGHT;
          break;
        default:
          we = -1;
      }
      switch (we) {
        case MOUSE.DOLLY:
          if (r.enableZoom === false) {
            return;
          }
          X(Y);
          a = n.DOLLY;
          break;
        case MOUSE.ROTATE:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enablePan === false) {
              return;
            }
            Z(Y);
            a = n.PAN;
          } else {
            if (r.enableRotate === false) {
              return;
            }
            j(Y);
            a = n.ROTATE;
          }
          break;
        case MOUSE.PAN:
          if (Y.ctrlKey || Y.metaKey || Y.shiftKey) {
            if (r.enableRotate === false) {
              return;
            }
            j(Y);
            a = n.ROTATE;
          } else {
            if (r.enablePan === false) {
              return;
            }
            Z(Y);
            a = n.PAN;
          }
          break;
        default:
          a = n.NONE;
      }
      if (a !== n.NONE) {
        r.dispatchEvent(_startEvent);
      }
    }
    function se(Y) {
      if (r.enabled !== false) {
        switch (a) {
          case n.ROTATE:
            if (r.enableRotate === false) {
              return;
            }
            q(Y);
            break;
          case n.DOLLY:
            if (r.enableZoom === false) {
              return;
            }
            ue(Y);
            break;
          case n.PAN:
            if (r.enablePan === false) {
              return;
            }
            oe(Y);
            break;
        }
      }
    }
    function $(Y) {
      if (r.enabled !== false && r.enableZoom !== false && a === n.NONE) {
        r.dispatchEvent(_startEvent);
        te(Y);
        r.dispatchEvent(_endEvent);
      }
    }
    function Oe(Y) {
      if (r.enabled !== false && r.enablePan !== false) {
        le(Y);
      }
    }
    function Ye(Y) {
      Ie(Y);
      switch (R.length) {
        case 1:
          switch (r.touches.ONE) {
            case TOUCH.ROTATE:
              if (r.enableRotate === false) {
                return;
              }
              Te();
              a = n.TOUCH_ROTATE;
              break;
            case TOUCH.PAN:
              if (r.enablePan === false) {
                return;
              }
              K();
              a = n.TOUCH_PAN;
              break;
            default:
              a = n.NONE;
          }
          break;
        case 2:
          switch (r.touches.TWO) {
            case TOUCH.DOLLY_PAN:
              if (r.enableZoom === false && r.enablePan === false) {
                return;
              }
              U();
              a = n.TOUCH_DOLLY_PAN;
              break;
            case TOUCH.DOLLY_ROTATE:
              if (r.enableZoom === false && r.enableRotate === false) {
                return;
              }
              N();
              a = n.TOUCH_DOLLY_ROTATE;
              break;
            default:
              a = n.NONE;
          }
          break;
        default:
          a = n.NONE;
      }
      if (a !== n.NONE) {
        r.dispatchEvent(_startEvent);
      }
    }
    function st(Y) {
      Ie(Y);
      switch (a) {
        case n.TOUCH_ROTATE:
          if (r.enableRotate === false) {
            return;
          }
          he(Y);
          r.update();
          break;
        case n.TOUCH_PAN:
          if (r.enablePan === false) {
            return;
          }
          ve(Y);
          r.update();
          break;
        case n.TOUCH_DOLLY_PAN:
          if (r.enableZoom === false && r.enablePan === false) {
            return;
          }
          xe(Y);
          r.update();
          break;
        case n.TOUCH_DOLLY_ROTATE:
          if (r.enableZoom === false && r.enableRotate === false) {
            return;
          }
          ee(Y);
          r.update();
          break;
        default:
          a = n.NONE;
      }
    }
    function W(Y) {
      r.enabled;
    }
    function O(Y) {
      R.push(Y);
    }
    function me(Y) {
      delete E[Y.pointerId];
      for (let we = 0; we < R.length; we++) {
        if (R[we].pointerId == Y.pointerId) {
          R.splice(we, 1);
          return;
        }
      }
    }
    function Ie(Y) {
      let we = E[Y.pointerId];
      if (we === undefined) {
        we = new Vector2();
        E[Y.pointerId] = we;
      }
      we.set(Y.pageX, Y.pageY);
    }
    function Le(Y) {
      const we = Y.pointerId === R[0].pointerId ? R[1] : R[0];
      return E[we.pointerId];
    }
    r.domElement.addEventListener("contextmenu", W);
    r.domElement.addEventListener("pointerdown", Ue);
    r.domElement.addEventListener("pointercancel", Me);
    r.domElement.addEventListener("wheel", $, {
      passive: false
    });
    this.update();
  }
}
class DeviceOrientationControls {
  object = null;
  enabled = true;
  hasValue = false;
  deviceOrientation = {};
  screenOrientation = 0;
  alphaOffset = 0;
  zee = new Vector3(0, 0, 1);
  euler = new Euler();
  q0 = new Quaternion();
  q1 = new Quaternion(-Math.sqrt(0.5), 0, 0, Math.sqrt(0.5));
  _onBoundDeviceOrientationChangeEvent;
  _onBoundScreenOrientationChangeEvent;
  constructor(e) {
    this.object = e;
    this.object.rotation.reorder("YXZ");
    this._onBoundDeviceOrientationChangeEvent = this._onDeviceOrientationChangeEvent.bind(this);
    this._onBoundScreenOrientationChangeEvent = this._onScreenOrientationChangeEvent.bind(this);
    this.connect();
  }
  _onDeviceOrientationChangeEvent(e) {
    this.deviceOrientation = e;
  }
  _onScreenOrientationChangeEvent() {
    this.screenOrientation = window.orientation || 0;
  }
  setObjectQuaternion(e, t, r, n, a) {
    this.euler.set(r, t, -n, "YXZ");
    e.setFromEuler(this.euler);
    e.multiply(this.q1);
    e.multiply(this.q0.setFromAxisAngle(this.zee, -a));
  }
  connect() {
    this._onBoundScreenOrientationChangeEvent();
    if (window.DeviceOrientationEvent !== undefined && typeof window.DeviceOrientationEvent.requestPermission == "function") {
      window.DeviceOrientationEvent.requestPermission().then(e => {
        if (e == "granted") {
          window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
          window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
        }
      }).catch(function (e) {});
    } else {
      window.addEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
      window.addEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
    }
    this.enabled = true;
  }
  disconnect() {
    window.removeEventListener("orientationchange", this._onBoundScreenOrientationChangeEvent, false);
    window.removeEventListener("deviceorientation", this._onBoundDeviceOrientationChangeEvent, false);
    this.enabled = false;
  }
  update() {
    if (this.enabled === false) {
      return;
    }
    let e = this.deviceOrientation;
    if (e) {
      let t = e.alpha ? MathUtils$1.degToRad(e.alpha) + this.alphaOffset : 0;
      let r = e.beta ? MathUtils$1.degToRad(e.beta) : 0;
      let n = e.gamma ? MathUtils$1.degToRad(e.gamma) : 0;
      let a = this.screenOrientation ? MathUtils$1.degToRad(this.screenOrientation) : 0;
      this.setObjectQuaternion(this.object.quaternion, t, r, n, a);
      this.hasValue = this.hasValue || e.alpha && e.beta && e.gamma;
    }
  }
  dispose() {
    this.disconnect();
  }
}
class CameraControls {
  useOrbitControls = false;
  preInit(e) {
    this.DEFAULT_CAMERA_POSITION = new Vector3(0, 0, 5);
    this.DEFAULT_LOOKAT_POSITION = new Vector3(0, 0, 0);
    this._brownianMotion = null;
    this._orbitControls = null;
    this._orbitCamera = null;
    this._deviceOrientationControls = null;
    this._baseDeviceControlQuaternion = null;
    this._targetDeviceControlQuaternion = null;
    this._deviceOrientationCamera = null;
    this._hasDeviceOrientationControlValues = false;
    this._q = new Quaternion();
    this._e = new Euler();
    this._v1 = new Vector3();
    this._v2 = new Vector3();
    this._camera = properties.camera;
    this._deviceOrientationEuler = new Euler();
    this._camera.position.copy(this.DEFAULT_CAMERA_POSITION);
    this._brownianMotion = new BrownianMotion();
    if (this.useOrbitControls === true) {
      this._orbitCamera = this._camera.clone();
      this._orbitControls = new OrbitControls(this._orbitCamera, document.documentElement);
      this._orbitControls.enableDamping = true;
      this._orbitControls.target0.copy(this.DEFAULT_LOOKAT_POSITION);
      this._orbitControls.reset();
    }
    if (browser$1.isMobile) {
      this._deviceOrientationCamera = new Camera();
      this._baseDeviceControlQuaternion = new Quaternion();
      this._targetDeviceControlQuaternion = new Quaternion();
      let t = () => {
        this._deviceOrientationControls = new DeviceOrientationControls(this._deviceOrientationCamera);
        this._deviceOrientationControls.connect();
      };
      if (browser$1.isIOS) {
        properties.onFirstClicked.addOnce(t);
      } else {
        t();
      }
    }
  }
  init() {}
  resize(e, t) {}
  update(e) {
    let t = this._camera;
    this.DEFAULT_CAMERA_POSITION.copy(properties.defaultCameraPosition);
    this.DEFAULT_LOOKAT_POSITION.copy(properties.defaultLookAtPosition);
    t.near = properties.cameraNear;
    t.far = properties.cameraFar;
    t.matrix.identity();
    t.matrix.decompose(t.position, t.quaternion, t.scale);
    t.position.copy(this.DEFAULT_CAMERA_POSITION);
    t.lookAt(this.DEFAULT_LOOKAT_POSITION);
    if (browser$1.isMobile && this._deviceOrientationControls) {
      this._deviceOrientationControls.update();
    }
    if (this.useOrbitControls === true) {
      this._orbitControls.update();
      this._orbitCamera.updateMatrix();
      this._orbitCamera.matrix.decompose(t.position, t.quaternion, t.scale);
    }
    this._v1.set(0, 0, -1).applyQuaternion(t.quaternion);
    if (this.useOrbitControls === true) {
      this.cameraDistance = this._v2.copy(this._orbitControls.target).sub(t.position).dot(this._v1);
    } else {
      this.cameraDistance = this._v2.copy(this.DEFAULT_LOOKAT_POSITION).sub(t.position).dot(this._v1);
    }
    if (properties.cameraUsePhysical) {
      t.filmGauge = properties.cameraFilmGauge;
      t.setFocalLength(properties.cameraFocalLength);
    } else {
      t.fov = properties.cameraFov;
    }
    let r = t.fov;
    t.fov += properties.cameraDollyZoomFovOffset;
    let n = this.cameraDistance;
    n = n * Math.tan(r / 360 * Math.PI / 2) / Math.tan(t.fov / 360 * Math.PI / 2) - n;
    t.translateZ(n);
    t.setViewOffset(properties.viewportWidth, properties.viewportHeight, properties.cameraViewportOffsetX, properties.cameraViewportOffsetY, properties.viewportWidth, properties.viewportHeight);
    t.fov = r;
    this.cameraDistance += n;
    if (browser$1.isMobile) {
      if (this._deviceOrientationControls) {
        this._deviceOrientationControls.update();
        if (this._deviceOrientationControls.hasValue) {
          if (!this._hasDeviceOrientationControlValues) {
            this._targetDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion);
            this._baseDeviceControlQuaternion.copy(this._deviceOrientationCamera.quaternion);
          }
          this._targetDeviceControlQuaternion.slerp(this._deviceOrientationCamera.quaternion, 0.15);
          this._baseDeviceControlQuaternion.slerp(this._targetDeviceControlQuaternion, 0.15);
          this._q.copy(this._baseDeviceControlQuaternion).invert().multiply(this._targetDeviceControlQuaternion);
          this._deviceOrientationEuler.setFromQuaternion(this._q);
          this._hasDeviceOrientationControlValues = true;
          t.quaternion.multiply(this._q);
        }
      }
    } else {
      t.translateZ(this.cameraDistance * -1);
      let a = math.clamp(input.mouseXY.y, -1, 1) * properties.cameraLookStrength;
      let l = math.clamp(-input.mouseXY.x, -1, 1) * properties.cameraLookStrength;
      properties.cameraLookX += (a - properties.cameraLookX) * properties.cameraLookEaseDamp;
      properties.cameraLookY += (l - properties.cameraLookY) * properties.cameraLookEaseDamp;
      this._e.set(properties.cameraLookX, properties.cameraLookY, 0);
      this._q.setFromEuler(this._e);
      t.quaternion.multiply(this._q);
      t.translateZ(this.cameraDistance);
    }
    t.matrix.compose(t.position, t.quaternion, t.scale);
    this._brownianMotion.positionAmplitude = properties.cameraShakePositionStrength;
    this._brownianMotion.positionFrequency = properties.cameraShakePositionSpeed;
    this._brownianMotion.rotationAmplitude = properties.cameraShakeRotationStrength;
    this._brownianMotion.rotationFrequency = properties.cameraShakeRotationSpeed;
    this._brownianMotion.update(e);
    t.matrix.multiply(this._brownianMotion.matrix);
    t.matrix.decompose(t.position, t.quaternion, t.scale);
    this._v1.set(0, 0, -1).applyQuaternion(t.quaternion);
    if (this.useOrbitControls === true) {
      properties.cameraDistance = this._v2.copy(this._orbitControls.target).sub(t.position).dot(this._v1);
    }
    t.updateMatrixWorld();
    properties.cameraDirection.set(0, 0, 1).applyMatrix4(t.matrixWorld).sub(this._v1.set(0, 0, 0).applyMatrix4(t.matrixWorld)).normalize();
  }
}
const cameraControls = new CameraControls();
const vert$g = `#define GLSLIFY 1
uniform float u_time;uniform sampler2D u_animationPositionTexture;uniform sampler2D u_animationOrientTexture;uniform vec2 u_animationTextureSize;uniform float u_loopLinearBlend;attribute vec2 boneIndices;attribute vec2 boneWeights;attribute vec4 tangent;attribute float ao;attribute vec3 instancePos;attribute vec4 instanceOrient;attribute vec3 instanceAnimationFrameFromToBlend1;attribute vec3 instanceAnimationFrameFromToBlend2;varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying vec2 v_uv;varying float v_ao;
#define PI 3.14159265359
vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void computeTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec4 uvBone12){vec3 bonePos1=texture2D(u_animationPositionTexture,uvBone12.xy).xyz;vec3 bonePos2=texture2D(u_animationPositionTexture,uvBone12.zw).xyz;vec4 boneOrient1=texture2D(u_animationOrientTexture,uvBone12.xy);vec4 boneOrient2=texture2D(u_animationOrientTexture,uvBone12.zw);pos=(qrotate(boneOrient1,pos)+bonePos1)*boneWeights.x+(qrotate(boneOrient2,pos)+bonePos2)*boneWeights.y;nor=normalize(qrotate(boneOrient1,nor)*boneWeights.x+qrotate(boneOrient2,nor)*boneWeights.y);tang=normalize(qrotate(boneOrient1,tang)*boneWeights.x+qrotate(boneOrient2,tang)*boneWeights.y);}void computeFrameTransform(inout vec3 pos,inout vec3 nor,inout vec3 tang,vec3 instanceAnimationFrameFromToBlend){vec4 dataOffset=boneIndices.xyxy+instanceAnimationFrameFromToBlend.xxyy*float(BONE_COUNT)+0.5;vec4 fromUvsBone12=vec4(floor(mod(dataOffset.xy,u_animationTextureSize.x))+.5,floor(dataOffset.xy/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec4 toUvsBone12=vec4(floor(mod(dataOffset.zw,u_animationTextureSize.x))+.5,floor(dataOffset.zw/u_animationTextureSize.x)+.5).xzyw/u_animationTextureSize.xyxy;vec3 fromPos=pos;vec3 fromNor=nor;vec3 fromTang=tang.xyz;computeTransform(fromPos,fromTang,fromNor,fromUvsBone12);vec3 toPos=pos;vec3 toNor=nor;vec3 toTang=tang.xyz;computeTransform(toPos,toNor,toTang,toUvsBone12);pos=mix(fromPos,toPos,instanceAnimationFrameFromToBlend.z);nor=mix(fromNor,toNor,instanceAnimationFrameFromToBlend.z);tang=mix(fromTang,toTang,instanceAnimationFrameFromToBlend.z);}void main(){v_ao=ao;vec3 posLoop=position;vec3 norLoop=normal;vec3 tangLoop=tangent.xyz;computeFrameTransform(posLoop,norLoop,tangLoop,instanceAnimationFrameFromToBlend1);vec3 posLinear=position;vec3 norLinear=normal;vec3 tangLinear=tangent.xyz;computeFrameTransform(posLinear,norLinear,tangLinear,instanceAnimationFrameFromToBlend2);vec3 pos=mix(posLoop,posLinear,u_loopLinearBlend);vec3 nor=mix(norLoop,norLinear,u_loopLinearBlend);vec3 tang=mix(tangLoop,tangLinear,u_loopLinearBlend);pos=qrotate(instanceOrient,pos)+instancePos.xyz;nor=normalize(qrotate(instanceOrient,nor));tang=normalize(qrotate(instanceOrient,tang));vec4 mvPos=modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldTangent=vec4(inverseTransformDirection(normalMatrix*tang,viewMatrix),tangent.w);v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;v_viewPosition=-mvPos.xyz;gl_Position=projectionMatrix*mvPos;}`;
const fragWhite = `#define GLSLIFY 1
uniform sampler2D u_matcapTexture;uniform float u_frameOutRatio;uniform float u_faceLedLight;uniform vec3 u_tintColor;uniform vec3 u_cardPosition;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_faceLedColor;uniform sampler2D u_envTexture;
#include <astronautCommon_pars>
float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}vec2 boxIntersection(in vec3 ro,in vec3 rd,vec3 boxSize){vec3 m=1.0/rd;vec3 n=m*ro;vec3 k=abs(m)*boxSize;vec3 t1=-n-k;vec3 t2=-n+k;float tN=max(max(t1.x,t1.y),t1.z);float tF=min(min(t2.x,t2.y),t2.z);if(tN>tF||tF<0.0)return vec2(-1.0);return vec2(tN,tF);}void main(){
#include <astronautCommon>
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),1.);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float outOfFrameRatio=linearStep(0.35,1.0,u_frameOutRatio);vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float metalMask=1.0-metalness;vec3 color=vec3(matcapShading*albedo);color+=0.8*zAxisShading;color*=u_ambientColor*(0.85+sunNdL*0.5);color*=metalMask;color+=(0.5+0.5*outOfFrameRatio)*metalMask*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color*=0.7+0.3*ao;color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 tunnelColor=color*0.75;vec2 dists=boxIntersection(v_worldPosition+vec3(0.,0.,u_whiteTunnelRatio*7.5*5.)+worldNormal*200.,-worldNormal,vec3(7.5,7.5,100.));float dist=200.-dists.x;vec3 hitPos=v_worldPosition+dist*worldNormal;tunnelColor+=vec3(1.)*(abs(worldNormal.x)*0.5+0.5)/dist*(0.25+0.75*ao)*(cos(u_whiteTunnelRatio*6.283185307179586*5.)*0.3+0.7)*3.5*(1.-metalness);color=mix(tunnelColor,color,outOfFrameRatio)*(0.7+armb.r*0.3);vec3 ledLightPos=u_cardPosition;vec3 ledLightDir=ledLightPos-v_worldPosition;float ledLightDist=length(ledLightDir);ledLightDir/=ledLightDist;float attenuationLed=1.0/(16.0*ledLightDist);color+=attenuationLed*u_faceLedLight*u_faceLedColor*getMetalShininess(V,u_cardPosition,N,(1.0-metalness),metalness);attenuationLed=1.0/(16.0*ledLightDist*ledLightDist);color+=0.5*u_faceLedLight*u_faceLedColor*albedo*attenuationLed*(0.5+0.5*saturate(dot(ledLightDir,N)));gl_FragColor.rgb=mix(u_bgColor,color,vec3(u_showRatio*0.8+0.2));
#ifndef IS_HELMET_GLASS
gl_FragColor.rgb+=outOfFrameRatio*max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao;
#endif
gl_FragColor.rgb=min(vec3(1.),gl_FragColor.rgb+u_tintColor*(1.-u_frameOutRatio*0.3)*(0.4+gl_FragColor.b*0.6));gl_FragColor.rgb*=0.95+mix(u_tintColor,vec3(1.0),v_ao)*0.1;gl_FragColor.rgb*=mix(1.,metalMask*0.7+0.3,linearStep(0.8,1.,u_frameOutRatio));gl_FragColor.a=0.01;}`;
const fragCard = `#define GLSLIFY 1
uniform sampler2D u_cardTexture;uniform sampler2D u_cardLedTexture;uniform vec2 u_cardUvOffset;uniform vec2 u_cardTextureSize;uniform vec3 u_cardColor;uniform float u_cardOpacity;uniform float u_time;varying vec2 v_uv;void main(){vec2 uv=v_uv/u_cardTextureSize;vec4 texel=texture2D(u_cardTexture,uv+u_cardUvOffset);vec3 ledTexture=pow(texture2D(u_cardLedTexture,fract(v_uv*vec2(20.,15.))).rgb,vec3(2.2));float ledMask=dot(ledTexture,u_cardColor*texel.r);gl_FragColor.rgb=pow(ledTexture,vec3(1./2.2))*ledMask*2.5;gl_FragColor.a=texel.r*0.35;}`;
const fragBlack = `#define GLSLIFY 1
uniform sampler2D u_blackTunnelTexture;uniform sampler2D u_matcapTexture;uniform sampler2D u_envTexture;uniform float u_sunFactor;uniform vec3 u_sunPosition;uniform vec3 u_ambientColor;uniform vec3 u_sunFadeColor;uniform float u_blackTunnelRatio;uniform float u_offsetZ;uniform float u_frameIn;uniform float u_endRatio;
#ifdef IS_CLONE
uniform float u_alpha;
#endif
#include <astronautCommon_pars>
float sdBoxFrame(vec3 p,vec3 b,float e){p=abs(p)-b;vec3 q=abs(p+e)-e;return min(min(length(max(vec3(p.x,q.y,q.z),0.0))+min(max(p.x,max(q.y,q.z)),0.0),length(max(vec3(q.x,p.y,q.z),0.0))+min(max(q.x,max(p.y,q.z)),0.0)),length(max(vec3(q.x,q.y,p.z),0.0))+min(max(q.x,max(q.y,p.z)),0.0));}float getMetalShininess(vec3 viewDir,vec3 lightPosition,vec3 worldNormal,float roughness,float metalness){vec3 lightDir=normalize(lightPosition-v_worldPosition);vec3 H=normalize(viewDir+lightDir);float dotNL=max(0.,dot(worldNormal,lightDir));float dotNH=max(0.,dot(worldNormal,H));float alpha=max(0.01,roughness*roughness);float alphaSqr=alpha*alpha;float pi=3.14159;float denom=dotNH*dotNH*(alphaSqr-1.0)+1.0;float D=alphaSqr/(pi*denom*denom);float specular=metalness*D*5.0;return specular*dotNL;}void main(){
#include <astronautCommon>
vec2 uvDiff=cartesianToPolar(worldNormal);vec2 uvSpec=cartesianToPolar(reflection);vec3 blackTunnelEnvDiff=texture2D(u_blackTunnelTexture,0.25*uvDiff).rgb;vec3 blackTunnelEnvSpec=texture2D(u_blackTunnelTexture,0.25*uvSpec).rgb*(0.2+metalness*0.7)*2.;
#ifdef IS_CLONE
gl_FragColor.rgb=(blackTunnelEnvDiff*3.5*blackTunnelEnvDiff+blackTunnelEnvSpec*3.5)*v_ao*u_alpha*(0.5+fresnel*0.9);gl_FragColor.a=mix(max(gl_FragColor.r,max(gl_FragColor.g,gl_FragColor.b))*u_alpha,0.,u_endRatio);
#else
mat4 frameInRotation=rotation3d(vec3(1.0,0.0,0.0),0.2+1.*u_frameIn);vec3 viewDir=(vec4(normalize(v_worldPosition),1.0)*frameInRotation).xyz;vec3 x=normalize(vec3(viewDir.z,0.0,-viewDir.x));vec3 y=cross(viewDir,x);vec2 uv=vec2(dot(x,worldNormal),dot(y,worldNormal))*0.495+0.5;vec3 sunPosition=u_sunPosition;vec3 L=normalize(sunPosition-v_worldPosition);float sunNdLRaw=dot(N,L);float sunNdL=saturate(sunNdLRaw);float matcapShading=0.5+0.5*(1.0-texture2D(u_matcapTexture,uv).r);float zAxisShading=linearStep(-0.2,1.3,worldNormal.z)*(0.65+ao*0.35);float metalMask=1.0-metalness;float metalShininess=u_sunFactor*getMetalShininess(V,sunPosition,N,(1.0-0.9*metalness),0.4*metalness);vec3 color=vec3(matcapShading*albedo);color+=zAxisShading;color*=metalMask;color*=mix(u_ambientColor*(0.85+sunNdL*0.5),vec3(fresnel*2.),u_blackTunnelRatio*0.5);color+=linearStep(0.,10.0,metalShininess);color*=mix(0.5+0.5*ao,0.75+0.25*ao,u_blackTunnelRatio);color+=metalMask*u_sunFactor*(0.5*(0.4+0.2*ao+0.5*sunNdL)+0.1*sunNdL*sunNdL);color+=linearStep(0.,1.,-sunNdLRaw)*u_ambientColor*0.1;vec3 blackTunnelColor=(color*blackTunnelEnvSpec*(7.+metalness*10.)+albedo*blackTunnelEnvDiff*1.6)*(1.3-abs(reflection.z))*(0.5+ao*0.5);float GRID_SIZE=20.0;float offsetZ=mod(u_offsetZ,GRID_SIZE);vec3 ro=vec3(0.0,0.0,offsetZ);float t=0.0;vec3 relPos=v_worldPosition+worldNormal*3.+vec3(0.,0.,u_offsetZ);float repDist=GRID_SIZE-1.;vec3 relPosRep=mod(relPos+0.5*repDist,repDist)-0.5*repDist;float sdf=sdBoxFrame(relPosRep,vec3(GRID_SIZE-1.)*.5,1.);blackTunnelColor+=exp(-sdf*0.25)*blackTunnelEnvDiff*2.;gl_FragColor.rgb=color;gl_FragColor.rgb=mix(gl_FragColor.rgb,0.3*gl_FragColor.rgb+blackTunnelColor,clamp(u_blackTunnelRatio*2.-1.+ao,0.,1.));gl_FragColor.rgb=mix(u_bgColor,gl_FragColor.rgb,vec3(u_showRatio));gl_FragColor.rgb*=(0.3+armb.r*0.7);gl_FragColor.rgb+=max(worldNormal.z*2.*sunNdL,metalness)*texture2D(u_envTexture,1.2*(uv-0.5)+vec2(0.5,0.5)).rgb*0.75*v_ao*(1.-u_blackTunnelRatio);gl_FragColor.a=0.01+0.1*max(0.0,gl_FragColor.g-1.+metalness*0.2)*(0.5+metalness*1.5)+gl_FragColor.b*u_blackTunnelRatio*dot(vec3(0.299,0.587,0.114),blackTunnelColor)*5.;gl_FragColor.a+=metalShininess;gl_FragColor.a*=(0.5+fresnel*0.9);
#endif
}`;
const astronautCommon = `#define GLSLIFY 1
vec3 worldNormal=normalize(v_worldNormal);vec3 worldTangent=normalize(v_worldTangent.xyz);vec3 worldBinormal=normalize(cross(worldNormal,worldTangent))*-v_worldTangent.w;worldTangent=normalize(cross(worldBinormal,worldNormal));vec3 tangentSpaceNormal=normalize(texture2D(u_norTexture,v_uv).xyz-.5);worldNormal=normalize(tangentSpaceNormal.x*worldTangent+tangentSpaceNormal.y*worldBinormal+tangentSpaceNormal.z*worldNormal);vec4 armb=texture2D(u_armbTexture,v_uv);float ao=v_ao*armb.r;float roughness=armb.g;float metalness=armb.b;float albedo=armb.a;vec3 N=worldNormal;vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdV=clamp(abs(dot(N,V)),0.001,1.0);float fresnel=pow(1.0-NdV,5.0);`;
const astronautCommonPars = `#define GLSLIFY 1
uniform sampler2D u_armbTexture;uniform sampler2D u_norTexture;uniform float u_time;uniform vec3 u_bgColor;uniform float u_showRatio;
#ifdef IS_WHITE
uniform float u_whiteTunnelRatio;
#endif
varying vec3 v_worldPosition;varying vec4 v_worldTangent;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_ao;varying vec3 v_viewPosition;const float PI=3.14159265359;const float RECIPROCAL_PI=0.31830988618;const float RECIPROCAL_PI2=0.15915494;const float LN2=0.6931472;const float ENV_LODS=6.0;
#ifndef saturate
#define saturate( a ) clamp( a, 0.0, 1.0 )
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec2 cartesianToPolar(vec3 n){vec2 uv;uv.x=atan(n.z,n.x)*RECIPROCAL_PI2+0.5;uv.y=asin(n.y)*RECIPROCAL_PI+0.5;return uv;}mat4 rotation3d(vec3 axis,float angle){axis=normalize(axis);float s=sin(angle);float c=cos(angle);float oc=1.0-c;return mat4(oc*axis.x*axis.x+c,oc*axis.x*axis.y-axis.z*s,oc*axis.z*axis.x+axis.y*s,0.0,oc*axis.x*axis.y+axis.z*s,oc*axis.y*axis.y+c,oc*axis.y*axis.z-axis.x*s,0.0,oc*axis.z*axis.x-axis.y*s,oc*axis.y*axis.z+axis.x*s,oc*axis.z*axis.z+c,0.0,0.0,0.0,0.0,1.0);}`;
let _m0 = new Matrix4();
let _v0$1 = new Vector3();
let _v1$4 = new Vector3();
let _p0 = new Vector3();
let _p1 = new Vector3();
let _e0 = new Euler();
let _q0$1 = new Quaternion();
let _q1$2 = new Quaternion();
let _matrixWorld$1 = new Matrix4();
let _matrixWorldInverse$1 = new Matrix4();
let _projectionMatrix$1 = new Matrix4();
let _perspectiveCamera = new PerspectiveCamera();
