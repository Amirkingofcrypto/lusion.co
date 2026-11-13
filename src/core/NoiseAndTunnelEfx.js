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