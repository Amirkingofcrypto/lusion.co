const vert$3 = `#define GLSLIFY 1
uniform sampler2D u_positionTexture;uniform sampler2D u_norShadeTexture;uniform float u_activeRatio;uniform float u_showRatio;uniform vec3 u_mouse;uniform vec2 u_resolution;uniform float u_time;uniform float u_isForward;uniform float u_glitchOffset;uniform float u_glitchStrength;uniform float u_glitchThreshold;attribute vec2 a_simUv;attribute vec4 a_rands1;attribute vec4 a_rands2;varying float v_shade;varying float v_showRatio;varying float v_blurriness;varying vec2 v_toCenter;varying vec2 v_uv;varying vec3 v_color;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v+dot(v,vec4(F4)));vec4 x0=v-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec4 hash42(vec2 p){vec4 p4=fract(vec4(p.xyxy)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){vec3 basePos=texture2D(u_positionTexture,a_simUv).xyz;vec3 pos=basePos;float yRatio=basePos.y*0.5+0.5;float showRatio=smoothstep(a_rands1.x*0.2+yRatio*0.4,0.4+a_rands1.y*0.2+yRatio*0.4,u_showRatio);pos*=1.3;pos+=(simplexNoiseDerivatives(vec4(basePos*8.,u_time)).yzw*0.2+vec3(1.*yRatio,0.0,-1.))*(1.-showRatio);v_showRatio=showRatio;vec4 norShade=texture2D(u_norShadeTexture,a_simUv);float depth=clamp(1.-pos.z,0.0,1.0);vec3 nor=norShade.xyz*2.-1.;vec3 worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;vec3 viewNormal=normalMatrix*normalize(nor);vec3 worldNormal=inverseTransformDirection(viewNormal,viewMatrix);vec3 lightDir=normalize(u_mouse-worldPosition);float distToLight=distance(u_mouse,worldPosition);float light=norShade.w*1.25;float diff=linearStep(0.35,1.0,dot(worldNormal,lightDir))/sqrt(distToLight*0.1);light*=diff+0.6;light+=(0.05+diff*0.15)*smoothstep(0.0,0.005,norShade.w);float frontFaceMultiplier=linearStep(-0.2,0.0,viewNormal.z);light*=frontFaceMultiplier;v_blurriness=min(1.0,(abs(depth-(1.-u_activeRatio*showRatio)*0.5))*2.5)*(2.-showRatio);float basePointSize=0.009*(1.+pow(v_blurriness,1.5)*8.)*frontFaceMultiplier;float pointSize=max(basePointSize,12./u_resolution.y);float subpixelMultiplier=pow(basePointSize/pointSize,1.5);pos.xy+=position.xy*pointSize*step(0.003,light)*linearStep(0.0,0.75,u_activeRatio);vec4 verticalRands=hash42(vec2(floor(basePos.y*3.+cos(basePos.y*3.+u_glitchOffset)*2.+u_glitchOffset),0.))*u_glitchStrength;float glitchWeight=verticalRands.x*step(u_glitchThreshold,verticalRands.y);pos.x+=(verticalRands.z*verticalRands.z)*glitchWeight*0.35*cos(basePos.y+u_glitchOffset);gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);v_color=mix(vec3(1.0),(viewNormal.xzy*0.5+0.5)*vec3(1.0,0.5,2.0),glitchWeight);light*=(1.+glitchWeight*1.5);light+=0.1*glitchWeight;float scanline=smoothstep(0.04,0.,abs(fract(u_time*-0.3-basePos.y*.5+.5)));light+=scanline*(0.25*norShade.w*(1.0-light)+smoothstep(0.03,0.,abs(viewNormal.z)));v_shade=min(1.0,light*(1.-v_blurriness*0.5))*subpixelMultiplier*showRatio;v_toCenter=(uv-.5)*2.;v_uv=uv;}`;
const frag$6 = `#define GLSLIFY 1
varying float v_shade;varying float v_showRatio;varying vec2 v_toCenter;varying float v_blurriness;varying vec2 v_uv;varying vec3 v_color;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 linearStep(vec3 edge0,vec3 edge1,vec3 x){return clamp((x-edge0)/(edge1-edge0),vec3(0.),vec3(1.));}void main(){float shade=v_shade;float d=length(v_toCenter);float range=v_blurriness*5.;float brightness=linearStep(1.,1.-range-fwidth(d),d);shade*=brightness*(1.25-v_blurriness*v_shade);gl_FragColor=vec4(shade)*v_showRatio*v_showRatio;gl_FragColor.a*=pow(1.-v_blurriness,3.)*0.8*linearStep(0.8,1.0,v_showRatio*v_showRatio);}`;
const PARTICLE_COUNT = 8192;
const SIM_TEXTURE_WIDTH = 128;
const SIM_TEXTURE_HEIGHT = 64;
const MAX_FACE_NUM = 2;
let _v1$1 = new Vector3();
new Vector3();
let _m = new Matrix4();
class AboutHeroFaces {
  container = new Object3D();
  faceContainer = new Object3D();
  isActive = false;
  hasStartedLoads = {};
  teamPosDataTextures = {};
  teamNShadeDataTextures = {};
  sharedUniforms = {
    u_mouse: {
      value: new Vector3()
    },
    u_glitchOffset: {
      value: 0
    },
    u_glitchStrength: {
      value: 0
    },
    u_showRatio: {
      value: 0
    }
  };
  currId = "";
  nextId = "";
  transitionRatio = 0;
  showRatio = 0;
  activeRatio = 1;
  hideRatio = 0;
  meshArray = [];
  preInit() {}
  load(e) {
    if (!this.hasStartedLoads[e]) {
      this.hasStartedLoads[e] = true;
      properties.loader[properties.hasInitialized ? "load" : "add"](settings.TEAM_PATH + e + ".buf", {
        onLoad: t => {
          this._onModelLoaded(e, t);
        }
      });
    }
  }
  _onModelLoaded(e, t) {
    let r = t.attributes.position.array;
    let n = new Float32Array(PARTICLE_COUNT * 4);
    for (let a = 0, l = 0, c = 0; a < PARTICLE_COUNT; a++, l += 3, c += 4) {
      n[c] = r[l];
      n[c + 1] = r[l + 1];
      n[c + 2] = r[l + 2];
      n[c + 3] = 1 / PARTICLE_COUNT;
    }
    this.teamPosDataTextures[e] = fboHelper.createDataTexture(n, SIM_TEXTURE_WIDTH, SIM_TEXTURE_HEIGHT, true, true);
    this.teamNShadeDataTextures[e] = fboHelper.createDataTexture(t.attributes.nShade.array, SIM_TEXTURE_WIDTH, SIM_TEXTURE_HEIGHT, false, true);
  }
  init() {
    this.container.add(this.faceContainer);
    this.container.scale.set(27.5, 27.5, 16);
    this.container.rotation.y = Math.PI + 0.2;
    this.container.rotation.x = 0.1;
    this.container.position.y = 34;
    this.container.position.z = 25;
    this.container.updateMatrixWorld(true);
    let e = new PlaneGeometry(1, 1);
    let t = new InstancedBufferGeometry();
    for (let l in e.attributes) {
      t.attributes[l] = e.attributes[l];
    }
    t.index = e.index;
    let r = new Float32Array(PARTICLE_COUNT * 2);
    let n = new Float32Array(PARTICLE_COUNT * 4);
    let a = new Float32Array(PARTICLE_COUNT * 4);
    for (let l = 0, c = 0, u = 0; l < PARTICLE_COUNT; l++, c += 2, u += 4) {
      r[c] = (l % SIM_TEXTURE_WIDTH + 0.5) / SIM_TEXTURE_WIDTH;
      r[c + 1] = (~~(l / SIM_TEXTURE_WIDTH) + 0.5) / SIM_TEXTURE_HEIGHT;
      n[u] = Math.random();
      n[u + 1] = Math.random();
      n[u + 2] = Math.random();
      n[u + 3] = Math.random();
      a[u] = Math.random();
      a[u + 1] = Math.random();
      a[u + 2] = Math.random();
      a[u + 3] = Math.random();
    }
    t.setAttribute("a_simUv", new InstancedBufferAttribute(r, 2));
    t.setAttribute("a_rands1", new InstancedBufferAttribute(n, 4));
    t.setAttribute("a_rands2", new InstancedBufferAttribute(a, 4));
    for (let l = 0; l < MAX_FACE_NUM; l++) {
      const c = new ShaderMaterial({
        uniforms: {
          u_time: properties.sharedUniforms.u_time,
          u_resolution: properties.sharedUniforms.u_resolution,
          u_mouse: this.sharedUniforms.u_mouse,
          u_glitchOffset: this.sharedUniforms.u_glitchOffset,
          u_glitchStrength: this.sharedUniforms.u_glitchStrength,
          u_glitchThreshold: {
            value: 0
          },
          u_activeRatio: {
            value: 0
          },
          u_showRatio: this.sharedUniforms.u_showRatio,
          u_positionTexture: {
            value: null
          },
          u_norShadeTexture: {
            value: null
          }
        },
        vertexShader: vert$3,
        fragmentShader: frag$6,
        depthTest: false,
        depthWrite: false,
        transparent: true,
        blending: CustomBlending,
        blendEquation: AddEquation,
        blendSrc: OneFactor,
        blendDst: OneFactor,
        blendEquationAlpha: AddEquation,
        blendSrcAlpha: OneFactor,
        blendDstAlpha: OneFactor
      });
      c.extensions.derivatives = true;
      const u = new Mesh(t, c);
      u.frustumCulled = false;
      u.visible = false;
      this.meshArray.push(u);
      this.faceContainer.add(u);
    }
  }
  resize(e, t) {}
  update(e) {
    if (this.meshArray.length > 0) {
      let t = this.transitionRatio;
      this.sharedUniforms.u_showRatio.value = this.showRatio;
      let r = input.easedMouseDynamics.default.value;
      _v1$1.set(r.x, r.y, 0.5).unproject(cameraControls._camera).sub(cameraControls._camera.position).normalize();
      _v1$1.multiplyScalar(75 / _v1$1.z).add(cameraControls._camera.position);
      _m.copy(this.faceContainer.matrixWorld).invert();
      _v1$1.applyMatrix4(_m);
      let n = math.clamp(_v1$1.y * 0.03, -0.05, 0.05);
      let a = math.clamp(_v1$1.x * 0.03, -0.05, 0.05);
      _v1$1.applyMatrix4(this.faceContainer.matrixWorld);
      this.sharedUniforms.u_mouse.value.copy(_v1$1);
      let l = this.meshArray[0];
      l.material.uniforms.u_positionTexture.value = this.teamPosDataTextures[this.currId];
      l.material.uniforms.u_norShadeTexture.value = this.teamNShadeDataTextures[this.currId];
      l.material.uniforms.u_activeRatio.value = 1 - t;
      l.material.uniforms.u_glitchThreshold.value = math.fit(l.material.uniforms.u_activeRatio.value, 0.4, 1, 0, 0.9);
      l.material.uniforms.u_activeRatio.value *= this.activeRatio;
      l.position.x = t * -1.5;
      l.position.z = -t * 2 - (1 - this.activeRatio) * 2;
      l.rotation.y = t * -0.3 + a;
      l.rotation.x = t * 0.4 + n;
      l.visible = true;
      let c = this.meshArray[1];
      c.material.uniforms.u_positionTexture.value = this.teamPosDataTextures[this.nextId];
      c.material.uniforms.u_norShadeTexture.value = this.teamNShadeDataTextures[this.nextId];
      c.material.uniforms.u_activeRatio.value = t;
      c.material.uniforms.u_glitchThreshold.value = math.fit(c.material.uniforms.u_activeRatio.value, 0.4, 1, 0, 0.9);
      c.material.uniforms.u_activeRatio.value *= this.activeRatio;
      c.position.x = (t - 1) * -1.5;
      c.position.z = (t - 1) * 2 - (1 - this.activeRatio) * 2;
      c.rotation.y = (t - 1) * -0.3 + a;
      c.rotation.x = (t - 1) * -0.4 + n;
      c.visible = true;
      this.sharedUniforms.u_glitchOffset.value = Math.random() * 1000;
      this.sharedUniforms.u_glitchStrength.value = Math.random();
      this.container.visible = this.isActive;
    }
  }
}
const aboutHeroFaces = new AboutHeroFaces();
const fragmentShader$1 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_colorBurn;uniform float u_colorBurnAlpha;uniform vec3 u_colorDodge;uniform float u_colorDodgeAlpha;varying vec2 v_uv;vec3 colorDodge(in vec3 src,in vec3 dst){return mix(step(0.,src)*(min(vec3(1.),dst/(1.-src))),vec3(1.),step(1.,dst));}vec3 colorBurn(in vec3 src,in vec3 dst){return mix(step(0.,src)*(1.-min(vec3(1.),(1.-dst)/src)),vec3(1.),step(1.,dst));}void main(){vec4 texture=texture2D(u_texture,v_uv);vec3 colorBurn=mix(texture.rgb,colorBurn(u_colorBurn,texture.rgb),u_colorBurnAlpha);vec3 colorDodge=mix(texture.rgb,colorDodge(u_colorDodge,texture.rgb),u_colorDodgeAlpha);texture.rgb=mix(colorBurn,colorDodge,texture.rgb);gl_FragColor=texture;}`;
let _sceneColorBurn = new Color("#00f0ff");
let _sceneColorDodge = new Color("#005aff");
let _sceneColorBurnAlpha = 0.15;
let _sceneColorDodgeAlpha = 0.12;
let _hudColorBurn = new Color("#79a8ff");
let _hudColorDodge = new Color("#a5ff44");
let _hudColorBurnAlpha = 1;
let _hudColorDodgeAlpha = 0.7;
class AboutPageHeroEfx extends PostEffect {
  colorBurn = new Color("#000");
  colorDodge = new Color("#000");
  hudRatio = 1;
  isActive = true;
  renderOrder = 20;
  randSimplex1Ds = [];
  init(e) {
    Object.assign(this, e);
    super.init();
    this.material = fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_colorBurn: {
          value: this.colorBurn
        },
        u_colorBurnAlpha: {
          value: 1
        },
        u_colorDodge: {
          value: this.colorDodge
        },
        u_colorDodgeAlpha: {
          value: 1
        }
      },
      fragmentShader: fragmentShader$1
    });
  }
  needsRender() {
    return this.isActive;
  }
  render(e, t = false) {
    let r = this.material.uniforms;
    this.colorBurn.copy(_sceneColorBurn).lerp(_hudColorBurn, this.hudRatio);
    this.colorDodge.copy(_sceneColorDodge).lerp(_hudColorDodge, this.hudRatio);
    r.u_colorBurnAlpha.value = math.mix(_sceneColorBurnAlpha, _hudColorBurnAlpha, this.hudRatio * this.hudRatio);
    r.u_colorDodgeAlpha.value = math.mix(_sceneColorDodgeAlpha, _hudColorDodgeAlpha, this.hudRatio * this.hudRatio);
    super.render(e, t);
  }
}
const aboutPageHeroEfx = new AboutPageHeroEfx();
const vert$2 = `#define GLSLIFY 1
attribute vec3 instancePos;attribute vec4 instanceRands;attribute float instanceDensity;uniform float u_time;uniform float u_showRatio;varying vec2 v_uv;varying vec2 v_charUv;varying vec3 v_worldPosition;varying vec4 v_instanceRands;varying float v_opacity;void main(){float charCount=mix(50.,100.,instanceRands.y);vec3 pos=position;v_uv=uv;pos.xy*=vec2(1.,6./5.*charCount);v_charUv=vec2(1.-position.x,position.y*charCount)+vec2(.5,0.);v_charUv.y-=u_time*mix(2.,10.,instanceRands.x);pos=pos*0.75+instancePos;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.);v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_instanceRands=instanceRands;v_opacity=mix(.5,1.,instanceDensity)*u_showRatio;}`;
const frag$5 = `#define GLSLIFY 1
uniform sampler2D u_letterTexture;uniform float u_time;varying vec2 v_charUv;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec4 v_instanceRands;varying float v_opacity;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash43(vec3 p){vec4 p4=fract(vec4(p.xyzx)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){float fade=1.-linearStep(15.,66.,v_worldPosition.z);float MAX_CHAR=42.;float charIdx=floor(mod(v_charUv.y,MAX_CHAR));float charTime=u_time*mix(1.,2.,v_instanceRands.y+hash43(vec3(charIdx,-100.,v_instanceRands.z)).x);vec4 charRands=hash43(vec3(charIdx,v_instanceRands.w,floor(charTime*-2.)));charIdx=mod(charIdx+floor(charRands.x*MAX_CHAR),MAX_CHAR);vec2 charUv=vec2((v_charUv.x+charIdx)/MAX_CHAR,mod(v_charUv.y,1.));float shade=texture2D(u_letterTexture,charUv).r;gl_FragColor=vec4(shade)*charRands.w*charRands.y*v_opacity;gl_FragColor*=smoothstep(0.5,0.35,abs(v_uv.y-.5))*(0.5+fade*0.5)*(0.3+v_instanceRands.z*1.25)*smoothstep(100.,150.,mod(v_charUv.y-200.*v_instanceRands.y,200.));gl_FragColor.a*=3.;}`;
class AboutHeroLetters {
  container = new Object3D();
  rt;
  blurRt;
  sharedUniforms = {};
  mesh;
  meshList = [];
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/letter_placements.buf", {
      onLoad: this._onGeometryLoad.bind(this)
    });
  }
  _onGeometryLoad(e) {
    let t = new PlaneGeometry(1, 1).translate(0, 0.5, 0).rotateY(Math.PI);
    let r = e.attributes.position.count;
    let n = Math.floor(r / 4);
    let a = new ShaderMaterial({
      uniforms: Object.assign({
        u_time: properties.sharedUniforms.u_time,
        u_showRatio: aboutHeroFaces.sharedUniforms.u_showRatio
      }, aboutHero.sharedUniforms),
      depthTest: false,
      depthWrite: false,
      vertexShader: vert$2,
      fragmentShader: frag$5,
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    });
    for (let l = 0; l < 4; l++) {
      let c = new InstancedBufferGeometry();
      for (let p in t.attributes) {
        c.setAttribute(p, t.attributes[p]);
      }
      c.setIndex(t.index);
      let u = new Float32Array(r * 4);
      for (let p = 0; p < n; p++) {
        u[p * 4 + 0] = Math.random();
        u[p * 4 + 1] = Math.random();
        u[p * 4 + 2] = Math.random();
        u[p * 4 + 3] = Math.random();
      }
      c.setAttribute("instanceRands", new InstancedBufferAttribute(u, 4));
      let f = n * l;
      c.setAttribute("instancePos", new InstancedBufferAttribute(e.attributes.position.array.slice(f * 3, (f + n) * 3), 3));
      c.setAttribute("instanceDensity", new InstancedBufferAttribute(e.attributes.density.array.slice(f, f + n), 1));
      this.meshList[l] = new Mesh(c, a);
    }
    this.rt = fboHelper.createRenderTarget(1, 1);
    this.blurRt = fboHelper.createRenderTarget(1, 1);
    this.mesh = new Mesh(new PlaneGeometry(2, 2), fboHelper.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: this.rt.texture
        }
      },
      depthTest: false,
      depthWrite: false,
      transparent: true,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    }));
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 10;
    this.container.add(this.mesh);
    this.mesh.onBeforeRender = this._onBeforeRender.bind(this);
  }
  init() {}
  _onBeforeRender() {
    if (properties.width != this.rt.width || properties.height != this.rt.height) {
      this.rt.setSize(properties.width, properties.height);
    }
    let e = properties.renderer;
    let t = e.getRenderTarget();
    let r = fboHelper.getColorState();
    e.setClearColor(0, 0);
    e.setRenderTarget(this.rt);
    e.clear();
    e.autoClear = false;
    fboHelper.renderMesh(this.meshList[0], this.rt, properties.camera);
    blur.blur(16, 0.5, this.rt, this.blurRt, this.rt);
    fboHelper.renderMesh(this.meshList[1], this.rt, properties.camera);
    blur.blur(8, 0.5, this.rt, this.blurRt, this.rt);
    fboHelper.renderMesh(this.meshList[2], this.rt, properties.camera);
    blur.blur(4, 0.5, this.rt, this.blurRt, this.rt);
    fboHelper.renderMesh(this.meshList[3], this.rt, properties.camera);
    e.setRenderTarget(t);
    fboHelper.setColorState(r);
  }
  update(e) {}
}
const aboutHeroLetters = new AboutHeroLetters();