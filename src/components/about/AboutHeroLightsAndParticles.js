/**
 * ============================================================================
 * Lusion Modular Component: 20-about-hero-subsystems
 * File: src/components/about/AboutHeroSubsystems.js
 * Description: AboutHeroLight, LightField, ParticlesSimulation, Scatter, Rocks, Ground, Lines, Person, Fog, Halo, Faces & Letters
 * Original Engine Lines: 40508 - 42145
 * ============================================================================
 */
class AboutHeroLight {
  shadowMapSize = 1024;
  position = new Vector3(0, 8, 0);
  shadowRenderTarget = null;
  sharedUniforms = {
    u_lightPosition: {
      value: this.position
    },
    u_lightColor: {
      value: new Color("#000")
    },
    u_lightShadowMaxDistance: {
      value: 12
    },
    u_lightShadowTexture: {
      value: null
    },
    u_lightShadowTextureTexelSize: {
      value: new Vector2(1 / this.shadowMapSize, 1 / (this.shadowMapSize * 2))
    }
  };
  preInit() {}
  init() {
    shaderHelper.addChunk("getLightUv", getLightUvShader);
    this.shadowRenderTarget = fboHelper.createRenderTarget(this.shadowMapSize, this.shadowMapSize * 2, true, HalfFloatType);
    let e = this.sharedUniforms.u_lightShadowTexture.value = this.shadowRenderTarget.texture;
    this.shadowRenderTarget.depthBuffer = true;
    if (settings.USE_WEBGL2) {
      e.format = RedFormat;
    }
  }
  update(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    t.setRenderTarget(this.shadowRenderTarget);
    t.setClearColor(16777215, 1);
    t.clear();
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
  renderMesh(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    t.autoClearColor = false;
    fboHelper.renderMesh(e, this.shadowRenderTarget);
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
  postUpdate(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    properties.gl;
    t.autoClear = false;
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
}
const light = new AboutHeroLight();
const sliceShader = `#define GLSLIFY 1
uniform vec2 u_lightFieldSlicedTextureSize;uniform vec2 u_lightFieldSliceColRowCount;uniform vec3 u_lightFieldGridCount;uniform vec3 u_lightFieldVolumeOffset;uniform vec3 u_lightFieldVolumeSize;vec2 lightFieldGridToUv(vec3 grid){vec2 uv=grid.xy;vec2 colRow=floor(vec2(mod(grid.z,u_lightFieldSliceColRowCount.x),grid.z/u_lightFieldSliceColRowCount.x));uv+=colRow*u_lightFieldGridCount.xy+.5;return uv/u_lightFieldSlicedTextureSize;}vec3 lightFieldGridToUv3(vec3 grid){return grid/u_lightFieldGridCount;}vec3 clampLightFieldGrid(vec3 grid){return clamp(grid,vec3(.5),u_lightFieldGridCount-vec3(.5));}vec3 lightFieldPosToGrid(vec3 pos){return(pos-u_lightFieldVolumeOffset)/u_lightFieldVolumeSize*u_lightFieldGridCount;}vec3 clampedLightFieldPosToGrid(vec3 pos){return clampLightFieldGrid(lightFieldPosToGrid(pos));}vec4 sampleLightField(sampler2D tex,vec3 gridPos){gridPos.z-=.5;vec2 uv1=lightFieldGridToUv(clampLightFieldGrid(vec3(gridPos.xy,floor(gridPos.z)+.5)));vec2 uv2=lightFieldGridToUv(clampLightFieldGrid(vec3(gridPos.xy,ceil(gridPos.z)+.5)));return mix(texture2D(tex,uv1),texture2D(tex,uv2),fract(gridPos.z));}`;
const sliceBlendFrag = `#define GLSLIFY 1
uniform sampler2D u_prevSliceTexture;uniform sampler2D u_drawnSliceTexture;varying vec2 v_uv;
#include <lightFieldSlice>
vec4 sampleSlice4(vec3 gridPos){vec3 sliceOffset=vec3(-.5,.5,0.);return(texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.xxz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.xyz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.yxz)))+texture2D(u_drawnSliceTexture,lightFieldGridToUv(clampLightFieldGrid(gridPos+sliceOffset.yyz))))/4.;}void main(){vec3 gridPos=vec3(mod(gl_FragCoord.xy,u_lightFieldGridCount.xy),dot(floor(gl_FragCoord.xy/u_lightFieldGridCount.xy),vec2(1.,u_lightFieldSliceColRowCount.x))+.5);vec4 prev=texture2D(u_prevSliceTexture,v_uv);vec4 curr=(sampleSlice4(gridPos+vec3(0.,0.,-1.))+sampleSlice4(gridPos)*2.+sampleSlice4(gridPos+vec3(0.,0.,1.)))*.25;prev+=(curr-prev)*mix(0.15,0.08,clamp(prev.r,0.,1.));gl_FragColor=prev;}`;
class AboutHeroLightField {
  GRID_COUNT = new Vector3(64, 64, 64);
  VOLUME_SIZE = new Vector3(8, 0, 0);
  container = new Object3D();
  prevSliceRenderTarget = null;
  currSliceRenderTarget = null;
  drawnSliceRenderTarget = null;
  sliceTo3DMesh = null;
  sliceBlendMaterial;
  sliceColumnCount = 0;
  sliceRowCount = 0;
  gridSize = 0;
  SHOW_TEST_VOXELS = false;
  sharedUniforms = {
    u_lightFieldTexture3D: {
      value: null
    },
    u_lightFieldMaxLod: {
      value: 0
    },
    u_lightFieldSlicedTexture: {
      value: null
    },
    u_lightFieldSlicedTextureSize: {
      value: new Vector2()
    },
    u_lightFieldSliceColRowCount: {
      value: new Vector2()
    },
    u_lightFieldGridSize: {
      value: 0
    },
    u_lightFieldGridCount: {
      value: this.GRID_COUNT
    },
    u_lightFieldVolumeOffset: {
      value: new Vector3()
    },
    u_lightFieldVolumeSize: {
      value: new Vector3()
    }
  };
  preInit() {}
  init() {
    shaderHelper.addChunk("lightFieldSlice", sliceShader);
    this.gridSize = this.VOLUME_SIZE.x / (this.GRID_COUNT.x - 1);
    this.sharedUniforms.u_lightFieldGridSize.value = this.gridSize;
    this.VOLUME_SIZE.y = this.gridSize * (this.GRID_COUNT.y - 1);
    this.VOLUME_SIZE.z = this.gridSize * (this.GRID_COUNT.z - 1);
    this.sharedUniforms.u_lightFieldVolumeSize.value.setScalar(this.gridSize).add(this.VOLUME_SIZE);
    this.sharedUniforms.u_lightFieldMaxLod.value = Math.log2(Math.min(this.GRID_COUNT.x, this.GRID_COUNT.y, this.GRID_COUNT.z));
    let e = this.GRID_COUNT.x * this.GRID_COUNT.y * this.GRID_COUNT.z;
    let t = this.sliceColumnCount = Math.ceil(Math.sqrt(e) / this.GRID_COUNT.x);
    let r = this.sliceRowCount = Math.ceil(this.GRID_COUNT.z / t);
    this.sharedUniforms.u_lightFieldSliceColRowCount.value.set(t, r);
    let n = this.GRID_COUNT.x * t;
    let a = this.GRID_COUNT.y * r;
    this.sharedUniforms.u_lightFieldSlicedTextureSize.value.set(n, a);
    this.currSliceRenderTarget = fboHelper.createRenderTarget(n, a);
    this.prevSliceRenderTarget = this.currSliceRenderTarget.clone();
    this.drawnSliceRenderTarget = this.currSliceRenderTarget.clone();
    fboHelper.clearColor(0, 0, 0, 0, this.currSliceRenderTarget);
    this.sliceBlendMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_lightFieldSlicedTextureSize: this.sharedUniforms.u_lightFieldSlicedTextureSize,
        u_lightFieldSliceColRowCount: this.sharedUniforms.u_lightFieldSliceColRowCount,
        u_lightFieldGridCount: this.sharedUniforms.u_lightFieldGridCount,
        u_lightFieldVolumeOffset: this.sharedUniforms.u_lightFieldVolumeOffset,
        u_lightFieldVolumeSize: this.sharedUniforms.u_lightFieldVolumeSize,
        u_prevSliceTexture: {
          value: null
        },
        u_drawnSliceTexture: {
          value: this.drawnSliceRenderTarget.texture
        }
      },
      fragmentShader: sliceBlendFrag
    });
  }
  update(e) {
    let t = this.VOLUME_SIZE.clone().multiplyScalar(0.5).sub(light.position).multiplyScalar(-1);
    this.sharedUniforms.u_lightFieldVolumeOffset.value.setScalar(-this.gridSize / 2).add(t);
    let r = properties.renderer;
    let n = fboHelper.getColorState();
    let a = r.getRenderTarget();
    r.setRenderTarget(this.drawnSliceRenderTarget);
    r.setClearColor(0, 0);
    r.clear();
    r.setRenderTarget(a);
    fboHelper.setColorState(n);
  }
  renderMesh(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    t.autoClearColor = false;
    fboHelper.renderMesh(e, this.drawnSliceRenderTarget);
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
  postUpdate(e) {
    let t = properties.renderer;
    let r = fboHelper.getColorState();
    let n = t.getRenderTarget();
    properties.gl;
    t.autoClear = false;
    let a = this.prevSliceRenderTarget;
    this.prevSliceRenderTarget = this.currSliceRenderTarget;
    this.currSliceRenderTarget = a;
    this.sharedUniforms.u_lightFieldSlicedTexture.value = this.currSliceRenderTarget.texture;
    this.sliceBlendMaterial.uniforms.u_prevSliceTexture.value = this.prevSliceRenderTarget.texture;
    fboHelper.render(this.sliceBlendMaterial, this.currSliceRenderTarget);
    t.setRenderTarget(n);
    fboHelper.setColorState(r);
  }
}
const lightField = new AboutHeroLightField();
const fragSim = `#define GLSLIFY 1
uniform sampler2D u_simPrevPosLifeTexture;uniform sampler2D u_simDefaultPosLifeTexture;uniform float u_introDeltaTime;uniform float u_noiseTime;uniform float u_noiseScale;uniform float u_noiseStableFactor;uniform vec3 u_lightPosition;varying vec2 v_uv;
#define PI2 6.283185307179586
vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec3 curl(in vec3 p,in float noiseTime,in float persistence){vec4 xNoisePotentialDerivatives=vec4(0.0);vec4 yNoisePotentialDerivatives=vec4(0.0);vec4 zNoisePotentialDerivatives=vec4(0.0);for(int i=0;i<2;++i){float twoPowI=pow(2.0,float(i));float scale=0.5*twoPowI*pow(persistence,float(i));xNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4(p*twoPowI,noiseTime))*scale;yNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(123.4,129845.6,-1239.1))*twoPowI,noiseTime))*scale;zNoisePotentialDerivatives+=simplexNoiseDerivatives(vec4((p+vec3(-9519.0,9051.0,-123.0))*twoPowI,noiseTime))*scale;}return vec3(xNoisePotentialDerivatives[3]-zNoisePotentialDerivatives[1],zNoisePotentialDerivatives[2]-yNoisePotentialDerivatives[3],yNoisePotentialDerivatives[1]-xNoisePotentialDerivatives[2]);}void main(){vec4 posLife=texture2D(u_simPrevPosLifeTexture,v_uv);vec3 posLifeOrigin=posLife.xyz-u_lightPosition;posLife.w-=(0.5+u_noiseStableFactor)*u_introDeltaTime;if(posLife.w<0.0){vec3 defPosOrigin=texture2D(u_simDefaultPosLifeTexture,v_uv).xyz;vec3 defPos=defPosOrigin*(1.25+sin(u_noiseTime*2.5+v_uv.x*21.)*0.25)+u_lightPosition;posLife.w+=1.;posLife.xyz=defPos;}vec3 toLight=posLife.xyz-u_lightPosition;vec3 axis=vec3(sin(u_noiseTime),cos(u_noiseTime*2.+v_uv.y*6.283185),0.0);vec3 spinDir=cross(axis,toLight);float dist=length(toLight);if(dist>0.01){float spinStrength=u_introDeltaTime*(0.1+smoothstep(0.5,2.0,dist-v_uv.x*0.5)*(v_uv.y<0.5 ? 1. :-1.)*mix(2.,4.,v_uv.x))*mix(0.75,1.5,u_noiseStableFactor);posLife.xyz+=spinDir*spinStrength;}posLife.xyz+=(1.25+0.5*u_noiseScale)*curl((posLife.xyz-u_lightPosition)*(0.4+0.3*u_noiseStableFactor),u_noiseTime,0.2)*u_introDeltaTime*mix(0.4,1.5,posLife.w*posLife.w)*mix(0.75,1.25,v_uv.x);gl_FragColor=posLife;}`;
new Vector3();
class AboutHeroParticlesSimulation {
  SIM_TEXTURE_WIDTH = 128;
  SIM_TEXTURE_HEIGHT = browser$1.isMobile ? 128 : 192;
  currPositionRenderTarget = null;
  prevPositionRenderTarget = null;
  ORIGIN = new Vector3(0, 8, 0);
  isPlaying = true;
  isFirstSim = true;
  noiseSpeed = 0.4;
  _noise = new Simple1DNoise();
  noiseScaleTime = Math.random();
  noiseStableFactorTime = Math.random();
  noiseStableFactor = Math.random();
  sharedUniforms = {
    u_simCurrPosLifeTexture: {
      value: null
    },
    u_simPrevPosLifeTexture: {
      value: null
    },
    u_simDefaultPosLifeTexture: {
      value: null
    },
    u_simTextureSize: {
      value: new Vector2(this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT)
    },
    u_noiseStableFactor: {
      value: 0
    }
  };
  preInit() {
    this.currPositionRenderTarget = fboHelper.createRenderTarget(this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT, true, FloatType);
    this.prevPositionRenderTarget = this.currPositionRenderTarget.clone();
    this.positionMaterial = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_lightPosition: light.sharedUniforms.u_lightPosition,
        u_simPrevPosLifeTexture: this.sharedUniforms.u_simPrevPosLifeTexture,
        u_simDefaultPosLifeTexture: this.sharedUniforms.u_simDefaultPosLifeTexture,
        u_introDeltaTime: aboutHero.sharedUniforms.u_introDeltaTime,
        u_noiseTime: {
          value: 0
        },
        u_noiseScale: {
          value: 0
        },
        u_noiseStableFactor: this.sharedUniforms.u_noiseStableFactor
      },
      fragmentShader: fragSim
    });
    let e = this.SIM_TEXTURE_WIDTH * this.SIM_TEXTURE_HEIGHT;
    let t = new Float32Array(e * 4);
    for (let n = 0, a = 0; n < e; n++, a += 4) {
      let l = Math.random();
      let c = Math.random();
      let u = l * 2 * Math.PI;
      let f = Math.acos(c * 2 - 1);
      let p = 0.25 + Math.cbrt(Math.random()) * 0.5;
      let g = Math.sin(u);
      let v = Math.cos(u);
      let _ = Math.sin(f);
      let T = Math.cos(f);
      t[a + 0] = p * _ * v;
      t[a + 1] = p * _ * g;
      t[a + 2] = p * T;
      t[a + 3] = n / e - 1;
    }
    let r = this.sharedUniforms.u_simDefaultPosLifeTexture.value = fboHelper.createDataTexture(t, this.SIM_TEXTURE_WIDTH, this.SIM_TEXTURE_HEIGHT, true, true);
    fboHelper.copy(r, this.currPositionRenderTarget);
  }
  init() {}
  update(e) {
    if (this.isPlaying) {
      let t = this.currPositionRenderTarget;
      this.currPositionRenderTarget = this.prevPositionRenderTarget;
      this.prevPositionRenderTarget = t;
      this.sharedUniforms.u_simCurrPosLifeTexture.value = this.currPositionRenderTarget.texture;
      this.sharedUniforms.u_simPrevPosLifeTexture.value = this.prevPositionRenderTarget.texture;
      this.positionMaterial.uniforms.u_noiseTime.value += e * this.noiseSpeed;
      this.noiseScaleTime += e;
      const r = this._noise.getFbm(this.noiseScaleTime, 3);
      this.positionMaterial.uniforms.u_noiseScale.value = Math.abs(r) * 10;
      this.noiseStableFactorTime += e * 0.5;
      this.noiseStableFactor += Math.abs(this._noise.getFbm(this.noiseStableFactorTime, 3)) * 0.05;
      this.sharedUniforms.u_noiseStableFactor.value = math.fit(aboutHero.introRatio, 0, 0.4, 0, 1) * math.smoothstep(0.9, 0.95, 0.5 + Math.sin(this.noiseStableFactor) * 0.5);
      fboHelper.render(this.positionMaterial, this.currPositionRenderTarget);
    }
  }
}
const sim = new AboutHeroParticlesSimulation();
const vert$9 = `#define GLSLIFY 1
attribute vec3 simUv;uniform sampler2D u_simCurrPosLifeTexture;uniform vec2 u_simTextureSize;uniform float u_sceneHideRatio;uniform float u_isEmissive;uniform float u_noiseStableFactor;uniform sampler2D u_lightFieldSlicedTexture;
#include <lightFieldSlice>
varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying float v_depth;varying float v_diff;varying float v_ao;varying float v_emission;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,simUv.xy);vec4 rands=hash43(simUv);float particleSize=mix(0.06,0.175,u_isEmissive)*(0.5+rands.x*0.5);float particleSizeScale=linearStep(0.0,0.1,currPositionInfo.w)*linearStep(1.0,0.9,currPositionInfo.w);particleSize*=particleSizeScale*(1.0-u_sceneHideRatio);vec3 pos=position*particleSize+currPositionInfo.xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_viewNormal=normalMatrix*normal;v_worldNormal=normalize((vec4(v_viewNormal,0.)*viewMatrix).xyz);vec3 rayGridDir=v_worldNormal;vec3 rayGridPos=lightFieldPosToGrid(v_worldPosition);vec4 indirectDiffuse=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+rayGridDir);float lifeFalloff=mix(0.5,1.,particleSizeScale);v_emission=(indirectDiffuse.a*0.55*lifeFalloff+0.45)*u_isEmissive;v_diff=(1.-indirectDiffuse.a)*lifeFalloff;v_diff*=linearStep(5.,1.5,length(v_worldPosition-vec3(0.,8.,0.)));v_ao=1.0-indirectDiffuse.a;
#include <aboutHeroVisualFinal_vert>
}`;
const frag$d = `#define GLSLIFY 1
uniform sampler2D u_lightFieldSlicedTexture;uniform float u_noiseStableFactor;uniform float u_emissiveRatio;uniform float u_contrast;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewNormal;varying float v_depth;varying float v_diff;varying float v_emission;varying float v_ao;
#include <lightFieldSlice>
#include <getScatter>
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec3 viewNormal=normalize(v_viewNormal);vec3 worldNormal=normalize(v_worldNormal);vec3 rayGridPos=lightFieldPosToGrid(v_worldPosition);vec3 rayGridDir=worldNormal;vec3 rayGridSpecDir=reflect(normalize(v_worldPosition-cameraPosition),worldNormal);vec4 indirectSpecular=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+normalize(rayGridSpecDir+(noise-.5)*0.25)*(1.+noise.z));float specular=indirectSpecular.r;vec3 rayGridRefractDir=refract(normalize(v_worldPosition-cameraPosition),worldNormal,1./1.4);vec4 refractionInfo=sampleLightField(u_lightFieldSlicedTexture,rayGridPos+normalize(rayGridRefractDir+(noise-.5)*0.25)*(1.5+noise.z));float refraction=refractionInfo.r*(1.-refractionInfo.a*0.75);float shade=v_diff*0.45+specular+refraction;shade+=getScatter(cameraPosition,v_worldPosition)*1.35;float viewShade=linearStep(-1.,1.,dot(viewNormal,vec3(.5773)));shade=mix(shade,viewShade,v_emission*v_ao)*(.4+v_ao*.6);gl_FragColor=vec4(mix(shade,smoothstep(0.,1.,shade),0.5),v_depth,1.,mix(v_diff*v_diff+v_emission,1.,u_emissiveRatio));}`;
const lightFieldVert = `#define GLSLIFY 1
attribute vec3 position;uniform sampler2D u_simCurrPosLifeTexture;uniform float u_noiseStableFactor;
#include <lightFieldSlice>
varying vec4 v_color;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 rands=hash43(position);vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,position.xy);float scale=linearStep(1.0,0.9,currPositionInfo.w);vec3 pos=currPositionInfo.xyz;vec3 lightFieldGrid=clampedLightFieldPosToGrid(pos);vec2 lightFieldUv=lightFieldGridToUv(lightFieldGrid);gl_Position=vec4(lightFieldUv*2.0-1.0,0.0,1.0);gl_PointSize=1.0;vec3 color=position.x<0.005 ? vec3(1.): vec3(0.1);v_color=vec4(color,1.)*scale;}`;
const lightFieldFrag = `#define GLSLIFY 1
varying vec4 v_color;void main(){gl_FragColor=v_color;}`;
const motionVert = `#define GLSLIFY 1
attribute vec2 simUv;uniform sampler2D u_simPrevPosLifeTexture;uniform sampler2D u_simCurrPosLifeTexture;uniform vec2 u_simTextureSize;uniform float u_strength;uniform float u_aspect;varying vec2 v_delta;varying float v_headTail;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}void main(){vec4 currPositionInfo=texture2D(u_simCurrPosLifeTexture,simUv);vec4 prevPositionInfo=texture2D(u_simPrevPosLifeTexture,simUv);vec4 rands=hash43(vec3(simUv.xy,0.));float particleSize=(simUv.x<0.005 ? 0.175 : 0.06)*(0.5+rands.x*0.5);mat4 mvp=projectionMatrix*modelViewMatrix;vec4 currScreenPos=mvp*vec4(currPositionInfo.xyz,1.0);vec4 prevScreenPos=mvp*vec4(prevPositionInfo.xyz,1.0);currScreenPos/=currScreenPos.w;prevScreenPos/=prevScreenPos.w;vec2 screenPosDelta=currScreenPos.xy-prevScreenPos.xy;float screenPosDist=length(screenPosDelta);float angle=screenPosDist>0.001 ? atan(screenPosDelta.y,screenPosDelta.x*u_aspect): 0.;vec4 screenPos=position.x>-0.0001 ? currScreenPos : prevScreenPos;vec4 offsetScreenPos=modelViewMatrix*vec4((position.x>0. ? currPositionInfo.xyz : prevPositionInfo.xyz),1.0);offsetScreenPos.xy+=particleSize;offsetScreenPos=projectionMatrix*offsetScreenPos;offsetScreenPos/=offsetScreenPos.w;offsetScreenPos=offsetScreenPos-screenPos;v_delta=screenPosDelta;v_headTail=position.x;vec4 pos=vec4(position,0.);pos.xy=rotate(pos.xy,angle)*length(offsetScreenPos.xy*vec2(u_aspect,1.));pos.xy*=vec2(1./u_aspect,1.);pos+=screenPos;pos.xy+=v_delta*.5;v_delta=v_delta*2.+.5;gl_Position=pos;if(currPositionInfo.w>prevPositionInfo.w){gl_Position=vec4(2.,0.,0.,1.);}}`;
const motionFrag = `#define GLSLIFY 1
varying vec2 v_delta;varying float v_headTail;void main(){float ratio=sqrt(abs(v_headTail)*2.);float strength=sign(v_headTail)*ratio*-.5;gl_FragColor=vec4(v_delta,strength+.5,v_headTail+0.5);}`;
const getScatter = `#define GLSLIFY 1
uniform vec2 u_lightScatterDivider;uniform float u_lightScatterPowInv;uniform vec3 u_lightScatterPos0;uniform vec3 u_lightScatterPos1;uniform float u_lightScatterRatio;float getScatterCoff(vec3 start,vec3 dir,vec3 lightPos,float d){vec3 q=start-lightPos;float b=dot(dir,q);float c=dot(q,q);float t=c-b*b;float s=1.0/(2.5+pow(0.001+t,0.8));return s*(atan((d+b)*s)-atan(b*s));}vec2 getScatterLine(vec3 start,vec3 dir,vec3 lightPos0,vec3 lightPos1,float d){vec3 segCenter=(lightPos0+lightPos1)*0.5;vec3 segDir=normalize(lightPos1-lightPos0);vec3 diff=start-segCenter;float segExtent=distance(lightPos0,lightPos1)*0.5;float a01=-dot(dir,segDir);float b0=dot(diff,dir);float b1=-dot(diff,segDir);float det=abs(1.0-a01*a01);float s=clamp((a01*b0-b1)/max(0.0001,det),-segExtent,segExtent);vec3 lightPos=segDir*s+segCenter;return vec2(getScatterCoff(start,dir,segExtent>0.0 ? lightPos : lightPos0,d),s/segExtent*0.5+0.5);}float getScatter(vec3 cameraPosition,vec3 worldPos,vec2 lightScatterDivider,float lightScatterPowInv){vec3 worldToCamera=worldPos-cameraPosition;float d=length(worldToCamera);vec3 dir=worldToCamera/d;vec2 val=getScatterLine(cameraPosition,dir,u_lightScatterPos0,u_lightScatterPos1,d);return pow(max(0.0,val.x/mix(lightScatterDivider.x,lightScatterDivider.y,val.y)),lightScatterPowInv)*u_lightScatterRatio;}float getScatter(vec3 cameraPosition,vec3 worldPos){return getScatter(cameraPosition,worldPos,u_lightScatterDivider,u_lightScatterPowInv);}`;
class AboutHeroScatter {
  sharedUniforms = {
    u_lightScatterDivider: {
      value: new Vector2(1.1, 5.5)
    },
    u_lightScatterPowInv: {
      value: 0
    },
    u_lightScatterRatio: {
      value: 0
    },
    u_lightScatterPos0: {
      value: new Vector3(0, 18, 0)
    },
    u_lightScatterPos1: {
      value: new Vector3(0, 0, 0)
    }
  };
  constructor() {
    this._brownianMotion0 = new BrownianMotion();
    this._brownianMotion1 = new BrownianMotion();
  }
  init() {
    shaderHelper.addChunk("getScatter", getScatter);
  }
  update(e) {
    let t = math.fit(aboutHero.introRatio, 0, 0.2, 2, 0.7);
    t = math.fit(aboutHero.introRatio, 0.7, 0.85, t, 0.4);
    this.sharedUniforms.u_lightScatterPowInv.value = t;
    this.sharedUniforms.u_lightScatterRatio.value = math.fit(aboutHero.introRatio, 0.7, 0.85, 1, 0, ease.cubicIn);
  }
}
const aboutHeroScatter = new AboutHeroScatter();
const fragmentShader$2 = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;void main(){gl_FragColor=texture2D(u_texture,v_uv).rrra;}`;
const motionBlurFragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform sampler2D u_motionTexture;uniform float u_blurRatio;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(41.,25.));vec4 motion=texture2D(u_motionTexture,v_uv);motion.xy-=0.5;motion.xy*=(motion.z-.5)/16.*u_blurRatio*0.25;vec4 c=vec4(0.);vec2 offset=motion.xy*noise.xy;for(int i=0;i<16;i++){offset+=motion.xy;c+=texture2D(u_texture,v_uv+offset);}c/=16.;gl_FragColor=vec4(c.rrr,c.a);vec4 color=texture2D(u_texture,v_uv).rrra;gl_FragColor=max(color,gl_FragColor);}`;
const blurFragmentShader = `#define GLSLIFY 1
varying vec2 v_uv;uniform sampler2D u_texture;uniform float u_aspect;uniform float u_blurRatio;
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy);vec4 tex=texture2D(u_texture,v_uv);vec2 ra=vec2(0.);float fi=0.;float theta=noise.x*6.283185307179586;vec2 strength=vec2(1.,1.*u_aspect)*.006*tex.b*u_blurRatio;for(int i=0;i<8;i++){theta+=10.166407384630519;ra+=texture2D(u_texture,v_uv+vec2(cos(theta),sin(theta))*sqrt((fi+.5)/8.)*strength).ra;fi+=1.;}ra/=8.;gl_FragColor=ra.xxxy;}`;
class AboutPageHeroEfxPrepass extends PostEffect {
  isActive = true;
  cacheRT = null;
  motionBlurRatio = 1;
  motionRT;
  motionTmpRT;
  useMotionBlur = false;
  blurRatio = 0;
  scene = new Scene();
  needsRenderScene = true;
  renderOrder = 5;
  init(e) {
    Object.assign(this, e);
    super.init();
    this.cacheRT = fboHelper.createRenderTarget(1, 1);
    this.motionRT = fboHelper.createRenderTarget(1, 1);
    this.motionRT.depthBuffer = true;
    this.motionTmpRT = fboHelper.createRenderTarget(1, 1);
    this._material = fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: null
        },
        u_motionTexture: {
          value: this.motionRT.texture
        },
        u_aspect: {
          value: 1
        },
        u_blurRatio: {
          value: 0
        }
      }, blueNoise.sharedUniforms),
      fragmentShader: fragmentShader$2
    });
    this._motionBlurMaterial = fboHelper.createRawShaderMaterial({
      uniforms: this._material.uniforms,
      fragmentShader: motionBlurFragmentShader
    });
    this._blurMaterial = fboHelper.createRawShaderMaterial({
      uniforms: this._material.uniforms,
      fragmentShader: blurFragmentShader
    });
  }
  needsRender() {
    return this.isActive;
  }
  setPostprocessing(e) {
    const t = e.width;
    const r = e.height;
    this.cacheRT.setSize(t, r);
    this._material.uniforms.u_aspect.value = t / r;
  }
  renderMotion(e, t, r, n) {
    let a = properties.renderer;
    let l = fboHelper.getColorState();
    let c = a.getRenderTarget();
    this.motionRT.setSize(r, n);
    a.setRenderTarget(this.motionRT);
    a.setClearColor(8355711, 0);
    a.clear();
    fboHelper.renderMesh(e, this.motionRT, t);
    blur.blur(2, 1, this.motionRT, this.motionTmpRT, this.motionRT);
    a.setRenderTarget(c);
    fboHelper.setColorState(l);
    this.useMotionBlur = true;
  }
  render(e, t = false) {
    fboHelper.copy(e.fromTexture, this.cacheRT);
    if (this.useMotionBlur) {
      this.useMotionBlur = false;
      this.material = this._motionBlurMaterial;
      this.material.uniforms.u_blurRatio.value = this.motionBlurRatio;
    } else {
      this.material = this.blurRatio > 0 ? this._blurMaterial : this._material;
      this.material.uniforms.u_blurRatio.value = this.blurRatio;
    }
    if (this.needsRenderScene) {
      this.material.uniforms.u_texture.value = e.fromTexture;
      fboHelper.render(this.material, e.toRenderTarget);
      let r = fboHelper.getColorState();
      fboHelper.renderer.autoClear = false;
      fboHelper.renderer.setRenderTarget(e.toRenderTarget);
      fboHelper.renderer.render(this.scene, e.camera);
      fboHelper.setColorState(r);
      e.swap();
    } else {
      super.render(e, t);
    }
  }
}
const aboutPageHeroEfxPrepass = new AboutPageHeroEfxPrepass();
class AboutHeroParticles {
  container = new Object3D();
  emissiveMesh = null;
  nonEmissiveMesh = null;
  lightFieldMesh = null;
  lodIds = ["l", "m", "s", "xs"];
  lodRefGeometries = [];
  preInit() {
    for (let p = settings.IS_SMALL_SCREEN ? 1 : 0; p < 4; p++) {
      properties.loader.add(settings.MODEL_PATH + "about/sphere_" + this.lodIds[p] + ".buf", {
        onLoad: this._onGeometryLoad.bind(this, p)
      });
    }
    let e = sim.SIM_TEXTURE_WIDTH * sim.SIM_TEXTURE_HEIGHT;
    let t = new Float32Array(e * 3);
    let r = new InstancedBufferGeometry();
    let n = new InstancedBufferGeometry();
    let a = new Float32Array((sim.SIM_TEXTURE_WIDTH - 1) * sim.SIM_TEXTURE_HEIGHT * 2);
    let l = new Float32Array(sim.SIM_TEXTURE_HEIGHT * 2);
    for (let p = 0, g = 0, v = 0, _ = 0; p < e; p++, g += 3) {
      let T = t[g + 0] = (p % sim.SIM_TEXTURE_WIDTH + 0.5) / sim.SIM_TEXTURE_WIDTH;
      let M = t[g + 1] = (~~(p / sim.SIM_TEXTURE_WIDTH) + 0.5) / sim.SIM_TEXTURE_HEIGHT;
      if (p % sim.SIM_TEXTURE_WIDTH == 0) {
        l[v + 0] = T;
        l[v + 1] = M;
        v += 2;
      } else {
        a[_ + 0] = T;
        a[_ + 1] = M;
        _ += 2;
      }
    }
    r.setAttribute("simUv", new InstancedBufferAttribute(a, 2));
    this.nonEmissiveMesh = new Mesh(r, new ShaderMaterial({
      uniforms: Object.assign({
        u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
        u_simTextureSize: sim.sharedUniforms.u_simTextureSize,
        u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
        u_isEmissive: {
          value: 0
        },
        u_emissiveRatio: {
          value: 0
        }
      }, lightField.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms, blueNoise.sharedUniforms),
      vertexShader: vert$9,
      fragmentShader: frag$d
    }));
    this.nonEmissiveMesh.renderOrder = 5;
    this.nonEmissiveMesh.frustumCulled = false;
    this.container.add(this.nonEmissiveMesh);
    n.setAttribute("simUv", new InstancedBufferAttribute(l, 2));
    this.emissiveMesh = new Mesh(n, new ShaderMaterial({
      uniforms: Object.assign({}, this.nonEmissiveMesh.material.uniforms, {
        u_isEmissive: {
          value: 1
        },
        u_emissiveRatio: {
          value: 0
        }
      }),
      vertexShader: vert$9,
      fragmentShader: frag$d
    }));
    this.emissiveMesh.renderOrder = 5;
    this.emissiveMesh.frustumCulled = false;
    this.container.add(this.emissiveMesh);
    let c = new PlaneGeometry(1, 1);
    let u = new InstancedBufferGeometry();
    for (let p in c.attributes) {
      u.attributes[p] = c.attributes[p];
    }
    u.setIndex(c.getIndex());
    u.setAttribute("simUv", new InstancedBufferAttribute(t, 3));
    this.motionMesh = new Mesh(u, new ShaderMaterial({
      uniforms: {
        u_simPrevPosLifeTexture: sim.sharedUniforms.u_simPrevPosLifeTexture,
        u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
        u_aspect: properties.sharedUniforms.u_aspect
      },
      vertexShader: motionVert,
      fragmentShader: motionFrag
    }));
    this.motionMesh.frustumCulled = false;
    let f = new BufferGeometry();
    f.name = "lightFieldGeometry";
    f.setAttribute("position", new BufferAttribute(t, 3));
    this.lightFieldMesh = new Points(f, fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_simCurrPosLifeTexture: sim.sharedUniforms.u_simCurrPosLifeTexture,
        u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor
      }, lightField.sharedUniforms),
      vertexShader: lightFieldVert,
      fragmentShader: lightFieldFrag,
      blending: CustomBlending,
      blendEquation: MaxEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: MaxEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    }));
    this.lightFieldMesh.frustumCulled = false;
  }
  _onGeometryLoad(e, t) {
    this.lodRefGeometries[e] = t;
  }
  init() {}
  update(e) {
    this.nonEmissiveMesh.material.uniforms.u_emissiveRatio.value = math.fit(aboutHero.introRatio, 0, 0.2, 0, 0.75);
    this.emissiveMesh.material.uniforms.u_emissiveRatio.value = math.fit(aboutHero.introRatio, 0, 0.2, 0, 0.75);
    let t;
    let r = aboutHero.introRatio < 0.3;
    let n = !r && aboutHero.introRatio < 0.7;
    let a = 0;
    let l = 0;
    if (settings.IS_SMALL_SCREEN) {
      a = r ? 2 : 3;
      l = r ? 1 : n ? 2 : 3;
    } else {
      a = r ? 1 : n ? 2 : 3;
      l = r ? 0 : n ? 1 : 3;
    }
    t = this.lodRefGeometries[a];
    for (let u in t.attributes) {
      this.nonEmissiveMesh.geometry.attributes[u] = t.attributes[u];
    }
    this.nonEmissiveMesh.geometry.setIndex(t.getIndex());
    t = this.lodRefGeometries[l];
    for (let u in t.attributes) {
      this.emissiveMesh.geometry.attributes[u] = t.attributes[u];
    }
    this.emissiveMesh.geometry.setIndex(t.getIndex());
    lightField.renderMesh(this.lightFieldMesh);
    let c = math.fit(aboutHero.introRatio, 0, 0.1, 1, 1.5);
    c = math.fit(aboutHero.introRatio, 0.1, 0.15, c, 0);
    aboutPageHeroEfxPrepass.motionBlurRatio = c;
    if (aboutPageHeroEfxPrepass.motionBlurRatio > 0) {
      aboutPageHeroEfxPrepass.renderMotion(this.motionMesh, properties.camera, properties.width >> 2, properties.height >> 2);
    }
  }
}
const aboutHeroParticles = new AboutHeroParticles();
const vert$8 = `#define GLSLIFY 1
attribute float piece;attribute float instanceId;attribute vec4 instanceRands;uniform sampler2D u_posRandTexture;uniform sampler2D u_orientTexture;uniform vec2 u_animationTextureSize;uniform float u_time;uniform float u_globalTime;uniform float u_scale;uniform float u_noiseStableFactor;uniform float u_hudRatio;
#ifdef IS_SHADOW
uniform vec3 u_lightPosition;uniform float u_lightShadowMaxDistance;varying float v_distToLight;
#include <getLightUv>
#else
varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying float v_depth;
#endif
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}vec4 quaternion(vec3 axis,float halfAngle){return vec4(axis*sin(halfAngle),cos(halfAngle));}vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}void main(){float duration=0.25+2.+4.;float time=duration*instanceRands.x+u_time;float cycle=floor(time/duration);time=time-duration*cycle;vec4 cycleRands=hash42(vec2(cycle,instanceId));float flyUpRatio=pow(linearStep(2.25,6.25,time),1.5);float appearRatio=linearStep(0.,0.25,time-instanceRands.y)*(1.0-u_hudRatio);vec4 selfSpin=quaternion(normalize(instanceRands.xyz-0.5),flyUpRatio*mix(5.0,30.,cycleRands.z));float pieceScale=appearRatio;vec3 origin=vec3(0.0,1.9+instanceRands.w*0.4,0.0);float angle=cycleRands.x*6.2832;float radius=4.+cycleRands.w*4.;float rollRatio=1.0-linearStep(0.,3.25,time+instanceRands.x);radius-=(rollRatio*rollRatio)*5.;vec2 dir=vec2(cos(angle),sin(angle));vec3 instanceOffset=vec3(dir.x*radius,flyUpRatio*mix(30.0,40.,cycleRands.z)+u_noiseStableFactor*(0.5+0.5*sin(u_globalTime+instanceId*0.1))*0.1,dir.y*radius);instanceOffset.xz=rotate(instanceOffset.xz,flyUpRatio*flyUpRatio*mix(-1.,1.,instanceRands.z))*smoothstep(1.5,0.35,flyUpRatio);float frame=linearStep(0.25,2.25,time)*119.;float frameFloor=floor(frame);float frameCeil=min(frameFloor+1.,119.);float frameFract=frame-frameFloor;vec4 simUvs=(vec3(piece,frameFloor,frameCeil).xyxz+.5)/u_animationTextureSize.xyxy;vec4 posRand1=texture2D(u_posRandTexture,simUvs.xy);vec4 orient1=texture2D(u_orientTexture,simUvs.xy);vec4 posRand2=texture2D(u_posRandTexture,simUvs.zw);vec4 orient2=texture2D(u_orientTexture,simUvs.zw);
#ifdef IS_SHADOW
pieceScale*=1.5;
#endif
vec3 pos1=qrotate(orient1,position)*pieceScale+posRand1.xyz;vec3 pos2=qrotate(orient2,position)*pieceScale+posRand2.xyz;vec3 pos=u_scale*0.75*mix(0.5,1.5,instanceRands.z*instanceRands.z)*linearStep(1.,0.9,flyUpRatio)*(qrotate(selfSpin,mix(pos1,pos2,frameFract)-origin)+origin)*mix(0.3,0.7,cycleRands.w)+instanceOffset;
#ifdef IS_SHADOW
pos=(modelMatrix*vec4(pos,1.0)).xyz;vec3 center=instanceOffset+origin-u_lightPosition;pos-=u_lightPosition;v_distToLight=length(pos)/u_lightShadowMaxDistance;if(center.y>0.0){pos.y=max(0.001,pos.y);}else{pos.y=min(-0.001,pos.y);}gl_Position=vec4(getLightUv(pos)*2.0-1.0,1.-v_distToLight,1.0);
#else
vec3 nor1=qrotate(selfSpin,qrotate(orient1,normal));vec3 nor2=qrotate(selfSpin,qrotate(orient2,normal));vec3 nor=normalize(mix(nor1,nor2,frameFract));gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_viewNormal=normalMatrix*nor;v_uv=uv;vec4 viewPosition=modelViewMatrix*vec4(pos,1.0);
#include <aboutHeroVisualFinal_vert>
#endif
}`;
const frag$c = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_textureChannelMixer;uniform vec3 u_lightColor;uniform vec3 u_lightPosition;uniform float u_noiseStableFactor;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying float v_depth;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
void main(){float pattern=dot(u_textureChannelMixer,texture2D(u_texture,v_uv));vec3 viewNormal=normalize(v_viewNormal);vec3 worldNormal=inverseTransformDirection(viewNormal,viewMatrix);vec3 worldToLight=u_lightPosition-v_worldPosition;float worldToLightDist=length(worldToLight);float attenutation=1.0/(0.05+(0.02-0.005*u_noiseStableFactor)*worldToLightDist*worldToLightDist);worldToLight/=worldToLightDist;vec3 cameraToWorld=normalize(v_worldPosition-cameraPosition);float diff=0.25+0.75*dot(worldNormal,worldToLight);float spec=0.8*dot(reflect(cameraToWorld,worldNormal),worldToLight);vec3 color=vec3(pattern);color*=attenutation*(0.05+diff+spec*diff);gl_FragColor=vec4(color*0.85+0.15,spec*(0.3+u_noiseStableFactor));gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
}`;
const lightShadowMapFrag = `#define GLSLIFY 1
varying float v_distToLight;void main(){gl_FragColor=vec4(v_distToLight);}`;