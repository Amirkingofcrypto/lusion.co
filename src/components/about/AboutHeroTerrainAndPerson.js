class AboutHeroRocks {
  ROCK_PIECE_COUNT = 16;
  FRAME_COUNT = 120;
  FPS = 60;
  COUNT = browser$1.isMobile ? 48 : 64;
  container = new Object3D();
  meshList = [];
  shadowMeshList = [];
  meshAnimationUniformList = [];
  meshInstanceUniformsList = [];
  meshInstanceAttributesList = [];
  time = 0;
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_animationTextureSize: {
      value: new Vector2(this.ROCK_PIECE_COUNT, this.FRAME_COUNT)
    },
    u_time: {
      value: 0
    },
    u_globalTime: {
      value: 0
    },
    u_scale: {
      value: 0
    },
    u_lightPosition: light.sharedUniforms.u_lightPosition,
    u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor
  };
  preInit() {
    properties.loader.add(settings.TEXTURE_PATH + "about/rocks.webp", {
      type: "texture",
      onLoad: e => {
        let t = fboHelper.createRawShaderMaterial({
          uniforms: Object.assign({
            u_texture: {
              value: e
            }
          }, aboutHeroScatter.sharedUniforms),
          fragmentShader: `
						uniform sampler2D u_texture;
						varying vec2 v_uv;
						void main () {
							vec2 uv = v_uv * 0.5;
							gl_FragColor = vec4(
								texture2D(u_texture, uv).g,
								texture2D(u_texture, uv + vec2(.5, 0.)).g,
								texture2D(u_texture, uv + vec2(0., .5)).g,
								texture2D(u_texture, uv + vec2(.5, .5)).g
							);
						}`
        });
        let r = fboHelper.createRenderTarget(512, 512);
        r.texture.minFitler = LinearMipmapLinearFilter;
        r.texture.generateMipmaps = true;
        fboHelper.render(t, r);
        this.sharedUniforms.u_texture.value = r.texture;
        t.dispose();
        e.dispose();
      }
    }).content;
    for (let e = 0; e < 4; e++) {
      this.meshAnimationUniformList[e] = {
        u_posRandTexture: {
          value: null
        },
        u_orientTexture: {
          value: null
        }
      };
      this.meshInstanceUniformsList[e] = Object.assign({
        u_textureChannelMixer: {
          value: new Vector4(+(e == 0), +(e == 1), +(e == 2), +(e == 3))
        }
      }, this.meshAnimationUniformList[e], this.sharedUniforms, aboutHero.sharedUniforms, light.sharedUniforms, aboutHeroScatter.sharedUniforms);
      let t = new Float32Array(this.COUNT);
      let r = new Float32Array(this.COUNT * 4);
      for (let n = 0; n < this.COUNT; n++) {
        t[n] = e + n * 4;
        r[n * 4 + 0] = Math.random();
        r[n * 4 + 1] = Math.random();
        r[n * 4 + 2] = Math.random();
        r[n * 4 + 3] = Math.random();
      }
      this.meshInstanceAttributesList[e] = {
        instanceId: new InstancedBufferAttribute(t, 1),
        instanceRands: new InstancedBufferAttribute(r, 4)
      };
      properties.loader.add(settings.MODEL_PATH + "about/rock_" + e + ".buf", {
        onLoad: this._onRockLoad.bind(this, e, false)
      });
      properties.loader.add(settings.MODEL_PATH + "about/rock_" + e + "_low.buf", {
        onLoad: this._onRockLoad.bind(this, e, true)
      });
      properties.loader.add(settings.MODEL_PATH + "about/rock_animation_" + e + ".buf", {
        onLoad: this._onRockAnimationLoad.bind(this, e)
      });
    }
  }
  loadRock(e) {}
  _onRockLoad(e, t, r) {
    let n = new InstancedBufferGeometry();
    for (let c in r.attributes) {
      n.setAttribute(c, r.attributes[c]);
    }
    n.index = r.index;
    let a = this.meshInstanceAttributesList[e];
    n.setAttribute("instanceId", a.instanceId);
    n.setAttribute("instanceRands", a.instanceRands);
    let l = new Mesh(n, new ShaderMaterial({
      uniforms: this.meshInstanceUniformsList[e],
      vertexShader: vert$8,
      fragmentShader: frag$c
    }));
    l.frustumCulled = false;
    if (t) {
      this.shadowMeshList[e] = l;
      l.material.defines.IS_SHADOW = true;
      l.material.fragmentShader = lightShadowMapFrag;
      l.material.side = DoubleSide;
    } else {
      this.meshList[e] = l;
    }
  }
  _onRockAnimationLoad(e, t) {
    let r = t.attributes.position.array;
    let n = t.attributes.orient.array;
    let a = new Float32Array(r.length / 3 * 4);
    let l = [];
    for (let c = 0, u = 0, f = 0; u < r.length; c++, u += 3, f += 4) {
      a[f] = r[u];
      a[f + 1] = r[u + 1];
      a[f + 2] = r[u + 2];
      if (c < this.ROCK_PIECE_COUNT) {
        l[c] = Math.random();
      }
      a[f + 3] = l[c % this.ROCK_PIECE_COUNT];
    }
    this.meshAnimationUniformList[e].u_posRandTexture.value = fboHelper.createDataTexture(a, this.ROCK_PIECE_COUNT, this.FRAME_COUNT, true, true);
    this.meshAnimationUniformList[e].u_orientTexture.value = fboHelper.createDataTexture(n, this.ROCK_PIECE_COUNT, this.FRAME_COUNT, true, true);
  }
  init() {
    for (let e = 0; e < 4; e++) {
      this.container.add(this.meshList[e]);
    }
  }
  update(e) {
    if (properties.hasInitialized) {
      sim.sharedUniforms.u_noiseStableFactor.value;
      this.time += e;
      this.sharedUniforms.u_time.value = this.time;
      this.sharedUniforms.u_globalTime.value = properties.time;
      this.sharedUniforms.u_scale.value = math.fit(aboutHero.introRatio, 0, 0.2, 0, 1);
      for (let t = 0; t < 4; t++) {
        light.renderMesh(this.shadowMeshList[t]);
      }
    }
  }
}
const aboutHeroRocks = new AboutHeroRocks();
const frag$b = `#define GLSLIFY 1
uniform sampler2D u_prevTexture;uniform sampler2D u_lightShadowTexture;uniform vec3 u_lightPosition;uniform vec2 u_blueNoiseOffset;uniform float u_lightShadowMaxDistance;uniform float u_radius;uniform float u_texelSize;varying vec2 v_uv;
#include <getLightUv>
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+u_blueNoiseOffset);vec2 uvDir=normalize(v_uv-0.5);vec2 uv=v_uv-uvDir*u_texelSize;vec3 worldPosition=vec3(uv*2.0-1.0,0.0).xzy*u_radius;worldPosition.z*=-1.0;vec3 lightToWorld=worldPosition-u_lightPosition;float distToLight=length(lightToWorld);float expandRatio=linearStep(u_lightPosition.y,14.,distToLight);vec3 lightSampleStep=((vec3(lightToWorld.x,0.0,lightToWorld.z)*(1.0-expandRatio*0.75)+(blueNoise-0.5)*expandRatio*4.)*25.0*expandRatio*expandRatio)/float(LIGHT_SHADOW_SAMPLE_COUNT)*-mix(0.06,0.1,expandRatio);vec3 lightToWorldPos=lightToWorld+lightSampleStep*blueNoise.y;float accum=0.0;for(int i=0;i<LIGHT_SHADOW_SAMPLE_COUNT;i++){float selfDist=min(1.0,length(lightToWorldPos)/u_lightShadowMaxDistance);vec2 lightShadowUv=getLightUv(lightToWorldPos);float dist=texture2D(u_lightShadowTexture,lightShadowUv).r;float delta=selfDist-dist;accum+=delta>0. ? min(delta*delta*20.,1.): 1.0;lightToWorldPos+=lightSampleStep;}float shadowMask=accum/float(LIGHT_SHADOW_SAMPLE_COUNT);shadowMask=mix(shadowMask,1.0,expandRatio);shadowMask=pow(shadowMask,6.);float prevShadowMask=texture2D(u_prevTexture,v_uv).r;gl_FragColor=vec4(mix(prevShadowMask,shadowMask,shadowMask>prevShadowMask ? 0.5 : 0.2));}`;
const groundVert = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;void main(){vec3 pos=position;vec4 mvPosition=modelViewMatrix*vec4(position,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(position,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=position;
#include <aboutHeroVisualFinal_vert>
}`;
const groundFrag = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform sampler2D u_texture;uniform sampler2D u_groundShadowTexture;uniform vec3 u_color;uniform vec3 u_bgColor;uniform vec3 u_lightPosition;uniform float u_fogA;uniform float u_fogB;uniform float u_sceneRatio;uniform float u_hudRatio;uniform float u_noiseStableFactor;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 applyFog(in vec3 rgb,in float distance,in vec3 rayOri,in vec3 rayDir){float a=u_fogA;float b=u_fogB;float fogAmount=(a/b)*exp(-rayOri.y*b)*(1.0-exp(-distance*rayDir.y*b))/rayDir.y;return mix(rgb,u_bgColor,fogAmount);}vec2 dHdxy_fwd(){vec2 dSTdx=dFdx(v_uv);vec2 dSTdy=dFdy(v_uv);float scale=0.1;float Hll=scale*texture2D(u_texture,v_uv).b;float dBx=scale*texture2D(u_texture,v_uv+dSTdx).b-Hll;float dBy=scale*texture2D(u_texture,v_uv+dSTdy).b-Hll;return vec2(dBx,dBy);}vec3 perturbNormalArb(vec3 surf_pos,vec3 surf_norm,vec2 dHdxy,float faceDirection){vec3 vSigmaX=dFdx(surf_pos.xyz);vec3 vSigmaY=dFdy(surf_pos.xyz);vec3 vN=surf_norm;vec3 R1=cross(vSigmaY,vN);vec3 R2=cross(vN,vSigmaX);float fDet=dot(vSigmaX,R1)*faceDirection;vec3 vGrad=sign(fDet)*(dHdxy.x*R1+dHdxy.y*R2);return normalize(abs(fDet)*surf_norm-vGrad);}
#include <getScatter>
#include <getBlueNoise>
void main(){vec3 blueNoise=getBlueNoise(gl_FragCoord.xy+vec2(48.,31.));vec3 mixedTexture=texture2D(u_texture,v_uv).rgb;float shadow=mixedTexture.r;float light=clamp(mixedTexture.g,0.1,1.0);float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec3 normal=normalize(v_viewNormal)*faceDirection;normal=perturbNormalArb(-v_viewPosition,normal,dHdxy_fwd(),faceDirection);vec3 N=inverseTransformDirection(normal,viewMatrix);vec3 L=normalize(u_lightPosition-v_worldPosition);vec3 V=normalize(cameraPosition-v_worldPosition);vec3 reflection=normalize(reflect(-V,N));float NdL=clamp(dot(N,L),0.001,1.0);float NdV=clamp(abs(dot(N,V)),0.001,1.0);vec3 lightToWorld=v_worldPosition-u_lightPosition;float distToLight=length(lightToWorld);float attenutation=1.0/(0.05+(0.025-0.005*u_noiseStableFactor)*distToLight*distToLight);float dist=1.0-pow(2.0*length(v_uv-0.5),2.0);float rockShadows=texture2D(u_groundShadowTexture,(vec2(v_localPosition.x,-v_localPosition.z)+(blueNoise.xy-.5)*0.1)*0.0425+0.5).r;float spec=dot(reflect(V,N),L)*linearStep(0.9,0.0,N.y)*4.;gl_FragColor.rgb=vec3(light+attenutation*spec);gl_FragColor.rgb*=shadow*(0.5+rockShadows*0.5)*(1.+spec);gl_FragColor.rgb=applyFog(gl_FragColor.rgb,length(cameraPosition-v_worldPosition),cameraPosition,-V);gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
gl_FragColor.r=mix(gl_FragColor.r,shadow*(1.-abs(N.y)),u_hudRatio);gl_FragColor.r*=u_sceneRatio;gl_FragColor.g-=blueNoise.z*0.004;gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.a=spec*shadow;}`;
class AboutHeroGround {
  container = new Object3D();
  geometry = null;
  mesh = null;
  texture = null;
  RADIUS = 12;
  SIZE = 768;
  sharedUniforms = {
    u_groundShadowTexture: {
      value: null
    }
  };
  prevRenderTarget = null;
  currRenderTarget = null;
  blurCacheRenderTarget = null;
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/terrain.buf", {
      onLoad: e => this.geometry = e
    });
    this.texture = properties.loader.load(settings.TEXTURE_PATH + "about/terrain_shadow_light_height.webp", {
      type: "texture",
      flipY: true,
      minFilter: LinearFilter
    }).content;
  }
  init() {
    this.prevRenderTarget = fboHelper.createRenderTarget(this.SIZE, this.SIZE);
    this.currRenderTarget = this.prevRenderTarget.clone();
    this.blurCacheRenderTarget = this.prevRenderTarget.clone();
    this.mesh = new Mesh(new CircleGeometry(1.1, 128), fboHelper.createRawShaderMaterial({
      uniforms: Object.assign({
        u_prevTexture: {
          value: null
        },
        u_radius: {
          value: this.RADIUS
        },
        u_texelSize: {
          value: 1 / this.SIZE
        },
        u_blueNoiseOffset: {
          value: new Vector2()
        }
      }, light.sharedUniforms, blueNoise.sharedUniforms),
      fragmentShader: frag$b
    }));
    this.mesh.material.defines.LIGHT_SHADOW_SAMPLE_COUNT = 8;
    if (!this.geometry) {
      this.geometry = new BufferGeometry();
    }
    this.groundMesh = new Mesh(this.geometry, new ShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: this.texture
        },
        u_groundShadowTexture: {
          value: this.currRenderTarget.texture
        },
        u_color: {
          value: new Color()
        },
        u_bgColor: {
          value: new Color()
        },
        u_noiseStableFactor: sim.sharedUniforms.u_noiseStableFactor,
        u_fogA: {
          value: 0.03
        },
        u_fogB: {
          value: 0.285
        }
      }, light.sharedUniforms, aboutHeroScatter.sharedUniforms, blueNoise.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: groundVert,
      fragmentShader: groundFrag
    }));
    this.groundMesh.material.extensions.derivatives = true;
    this.container.add(this.groundMesh);
    fboHelper.clearColor(1, 1, 1, 1, this.currRenderTarget);
  }
  update(e) {
    let t = this.prevRenderTarget;
    this.prevRenderTarget = this.currRenderTarget;
    this.currRenderTarget = t;
    let r = properties.renderer;
    let n = fboHelper.getColorState();
    let a = r.getRenderTarget();
    r.setRenderTarget(this.currRenderTarget);
    r.setClearColor(16777215, 1);
    this.mesh.material.uniforms.u_blueNoiseOffset.value.set(~~(Math.random() * 128), ~~(Math.random() * 128));
    this.mesh.material.uniforms.u_prevTexture.value = this.prevRenderTarget.texture;
    fboHelper.renderMesh(this.mesh, this.currRenderTarget);
    r.setRenderTarget(a);
    fboHelper.setColorState(n);
    sim.sharedUniforms.u_noiseStableFactor.value;
    this.groundMesh.material.uniforms.u_groundShadowTexture.value = this.currRenderTarget.texture;
    this.groundMesh.material.uniforms.u_bgColor.value.copy(properties.bgColor);
    this.groundMesh.material.uniforms.u_color.value.set("#fff");
  }
}
const aboutHeroGround = new AboutHeroGround();
const vert$7 = `#define GLSLIFY 1
attribute float t;attribute float totalLength;attribute float lineId;varying float v_t;varying float v_totalLength;varying float v_thicknessRatio;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying vec3 v_worldPosition;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){v_t=t;v_totalLength=totalLength;float yIndex=floor(position.y+.5);v_thicknessRatio=step(mod(yIndex,4.),0.5);vec3 pos=position+normal*mix(0.04,0.1,v_thicknessRatio);vec3 nor=normalize(normalMatrix*normal);v_viewNormal=nor;v_worldNormal=inverseTransformDirection(nor,viewMatrix);v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;gl_Position=projectionMatrix*modelViewMatrix*vec4(pos,1.0);gl_Position.z-=0.1/gl_Position.w;}`;
const frag$a = `#define GLSLIFY 1
uniform float u_time;uniform float u_hudRatio;varying float v_t;varying float v_totalLength;varying float v_thicknessRatio;varying vec3 v_viewNormal;varying vec3 v_worldNormal;varying vec3 v_worldPosition;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}vec2 fade(vec2 t){return t*t*t*(t*(t*6.0-15.0)+10.0);}float pnoise(vec2 P,vec2 rep){vec4 Pi=floor(P.xyxy)+vec4(0.0,0.0,1.0,1.0);vec4 Pf=fract(P.xyxy)-vec4(0.0,0.0,1.0,1.0);Pi=mod(Pi,rep.xyxy);Pi=mod289(Pi);vec4 ix=Pi.xzxz;vec4 iy=Pi.yyww;vec4 fx=Pf.xzxz;vec4 fy=Pf.yyww;vec4 i=permute(permute(ix)+iy);vec4 gx=fract(i*(1.0/41.0))*2.0-1.0;vec4 gy=abs(gx)-0.5;vec4 tx=floor(gx+0.5);gx=gx-tx;vec2 g00=vec2(gx.x,gy.x);vec2 g10=vec2(gx.y,gy.y);vec2 g01=vec2(gx.z,gy.z);vec2 g11=vec2(gx.w,gy.w);vec4 norm=taylorInvSqrt(vec4(dot(g00,g00),dot(g01,g01),dot(g10,g10),dot(g11,g11)));g00*=norm.x;g01*=norm.y;g10*=norm.z;g11*=norm.w;float n00=dot(g00,vec2(fx.x,fy.x));float n10=dot(g10,vec2(fx.y,fy.y));float n01=dot(g01,vec2(fx.z,fy.z));float n11=dot(g11,vec2(fx.w,fy.w));vec2 fade_xy=fade(Pf.xy);vec2 n_x=mix(vec2(n00,n01),vec2(n10,n11),fade_xy.x);float n_xy=mix(n_x.x,n_x.y,fade_xy.y);return 2.3*n_xy;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){float t=mod(v_t-u_time*2.,v_totalLength);float noiseScale=0.25;float n=pnoise(vec2(t*noiseScale,0.),vec2(v_totalLength*noiseScale,100.));float shade=mix(0.3+smoothstep(0.,0.-fwidth(n),n)*0.6,1.,v_thicknessRatio);shade*=linearStep(50.,-20.,v_worldPosition.z);gl_FragColor=vec4(shade,0.,0.,1.)*step(v_totalLength-v_t,v_totalLength*u_hudRatio);gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.r*=.85;}`;
let SEGMENT_COUNT = 3;
let THREHSOLDS = [60, 245, 806, 966, 991, 1026, 1191, 1853, 2061, 3111, 4279, 4309, 4338, 5265, 5316, 5447, 5475, 6407, 6445, 7116, 7235, 7349, 7934, 8555, 8583, 8614, 9154, 9640, 9688, 10163, 10420, 10645, 10895, 11074, 11286, 11453, 11596, 11628, 11740, 11799, 11832];
let v0 = new Vector3();
new Vector3();
new Vector3();
class AboutHeroLines {
  container = new Object3D();
  time = 0;
  sharedUniforms = {};
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/terrain_lines.buf", {
      onLoad: this._onLineLoad.bind(this)
    });
  }
  _onLineLoad(e) {
    let t = e.attributes.position.array;
    let r = THREHSOLDS.length;
    let n = t.length / 3;
    let a = new Float32Array(n * SEGMENT_COUNT * 3);
    let l = new Float32Array(n * SEGMENT_COUNT * 3);
    let c = new Float32Array(n * SEGMENT_COUNT);
    let u = new Float32Array(n * SEGMENT_COUNT);
    let f = new Uint8Array(n * SEGMENT_COUNT);
    let p = new Uint16Array((n - r) * 6 * SEGMENT_COUNT);
    let g = new Vector3();
    let v = new Vector3();
    let _ = new Vector3();
    let T = new Vector3();
    let M = new Vector3();
    let S = new Vector3();
    let b = new Quaternion();
    let C = new Vector3();
    let w = 0;
    let R = 0;
    let E = 0;
    for (let k = 0; k < THREHSOLDS.length; k++) {
      let L = k == 0 ? 0 : THREHSOLDS[k - 1];
      let D = THREHSOLDS[k];
      _.fromArray(t, L * 3);
      v.copy(_);
      M.set(0, 1, 0);
      let ne = 0;
      for (let z = L; z < D; z++) {
        let j = z * 3;
        g.copy(v);
        v.copy(_);
        if (z < D - 1) {
          _.fromArray(t, j + 3);
        }
        T.subVectors(_, g).normalize();
        S.crossVectors(M, T).normalize();
        b.setFromAxisAngle(T, Math.PI * 2 / SEGMENT_COUNT);
        C.copy(M);
        ne += v0.copy(v).sub(g).length();
        for (let X = 0; X < SEGMENT_COUNT; X++) {
          C.applyQuaternion(b);
          a[R + 0] = v.x;
          a[R + 1] = v.y;
          a[R + 2] = v.z;
          l[R + 0] = C.x;
          l[R + 1] = C.y;
          l[R + 2] = C.z;
          c[w] = ne;
          f[w] = k;
          if (z < D - 1) {
            let Z = X == SEGMENT_COUNT - 1 ? 1 - SEGMENT_COUNT : 1;
            p[E++] = w;
            p[E++] = w + Z;
            p[E++] = w + SEGMENT_COUNT;
            p[E++] = w + Z;
            p[E++] = w + SEGMENT_COUNT + Z;
            p[E++] = w + SEGMENT_COUNT;
          }
          w++;
          R += 3;
        }
      }
      let re = SEGMENT_COUNT * (D - L);
      w -= re;
      let ce = w + re;
      for (; w < ce; w++) {
        u[w] = ne;
      }
    }
    let I = new BufferGeometry();
    I.setAttribute("position", new BufferAttribute(a, 3));
    I.setAttribute("normal", new BufferAttribute(l, 3));
    I.setAttribute("t", new BufferAttribute(c, 1));
    I.setAttribute("totalLength", new BufferAttribute(u, 1));
    I.setAttribute("lineId", new BufferAttribute(f, 1));
    I.setIndex(new BufferAttribute(p, 1));
    let F = new ShaderMaterial({
      uniforms: Object.assign({
        u_time: properties.sharedUniforms.u_time
      }, aboutHero.sharedUniforms),
      vertexShader: vert$7,
      fragmentShader: frag$a,
      blending: CustomBlending,
      blendEquation: MaxEquation,
      blendSrc: OneFactor,
      blendDst: OneFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: OneFactor,
      blendDstAlpha: OneFactor
    });
    F.extensions.derivatives = true;
    this.mesh = new Mesh(I, F);
    this.mesh.renderOrder = 15;
    this.container.add(this.mesh);
  }
  init() {}
  update(e) {}
}
const aboutHeroLines = new AboutHeroLines();
const vert$6 = `#define GLSLIFY 1
attribute vec2 boneIndices;attribute vec2 boneWeights;uniform vec3 u_bonePoses[BONE_COUNT];uniform vec4 u_boneOrients[BONE_COUNT];varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_depth;vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}vec3 qrotate(vec4 q,vec3 v){return v+2.0*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec3 pos=vec3(0.0);vec3 nor=vec3(0.0);vec3 bonePos;vec4 boneOrient;bonePos=u_bonePoses[int(boneIndices.x)];boneOrient=u_boneOrients[int(boneIndices.x)];pos+=(qrotate(boneOrient,position)+bonePos)*boneWeights.x;nor+=qrotate(boneOrient,normal)*boneWeights.x;bonePos=u_bonePoses[int(boneIndices.y)];boneOrient=u_boneOrients[int(boneIndices.y)];pos+=(qrotate(boneOrient,position)+bonePos)*boneWeights.y;nor+=qrotate(boneOrient,normal)*boneWeights.y;vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(nor,viewMatrix);v_uv=uv;
#include <aboutHeroVisualFinal_vert>
}`;
const frag$9 = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_lightPosition;uniform vec3 u_lightMixer;uniform float u_sceneRatio;uniform float u_hudRatio;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec2 v_uv;varying float v_depth;float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
void main(){vec3 worldNormal=normalize(v_worldNormal);vec3 worldToLight=u_lightPosition-v_worldPosition;float worldToLightDist=length(worldToLight);worldToLight/=worldToLightDist;vec3 cameraToWorld=normalize(v_worldPosition-cameraPosition);vec4 map=texture2D(u_texture,v_uv);float light=dot(u_lightMixer,map.rgb);light=pow(light,1.25);float baseShade=map.a;vec3 color=vec3(baseShade*light);gl_FragColor=vec4(color,0.);gl_FragColor.rgb+=getScatter(cameraPosition,v_worldPosition);
#include <aboutHeroVisualFinal_frag>
gl_FragColor.r*=u_sceneRatio*(1.-u_hudRatio);}`;
const shadowVert = `#define GLSLIFY 1
varying vec2 v_uv;void main(){v_uv=uv;gl_Position=projectionMatrix*modelViewMatrix*vec4(position,1.0);}`;
const shadowFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec3 u_lightMixer;varying vec2 v_uv;
#include <getBlueNoise>
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(3.,36.));vec3 map3=texture2D(u_texture,v_uv).xyz;float light1=dot(u_lightMixer,map3);float light2=dot(u_lightMixer.gbr,map3);float light=mix(light1,light2,blueNoises.x);light=light*light*.3+.7;gl_FragColor=vec4(light,1.,1.,0.);}`;
let _v1$2 = new Vector3();
let _v2$1 = new Vector3();
let _q1$1 = new Quaternion();
let _q2 = new Quaternion();
class aboutHeroPerson {
  BONE_COUNT = 54;
  FPS = 60;
  container = new Object3D();
  geometry = null;
  mesh = null;
  texture = null;
  shadowMesh = null;
  shadowTexture = null;
  time = 0;
  frameCount = 0;
  bonePosAnimationData;
  boneOrientAnimationData;
  bonePoses = new Float32Array(this.BONE_COUNT * 3);
  boneOrients = new Float32Array(this.BONE_COUNT * 4);
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_lightMixer: {
      value: new Vector3(1, 0, 0)
    }
  };
  preInit() {
    properties.loader.load(settings.TEXTURE_PATH + "about/person_light.webp", {
      type: "texture",
      onLoad: e => {
        this.lightTexture = e;
        this._onTextureLoad(e);
      }
    }).content;
    properties.loader.load(settings.TEXTURE_PATH + "about/person.webp", {
      type: "texture",
      onLoad: e => {
        this.texture = e;
        this._onTextureLoad(e);
      }
    }).content;
    this.shadowTexture = properties.loader.load(settings.TEXTURE_PATH + "about/ground_person_shadow.webp", {
      type: "texture"
    }).content;
    properties.loader.add(settings.MODEL_PATH + "about/person.buf", {
      onLoad: e => {
        this._onModelLoad(e);
      }
    });
    properties.loader.add(settings.MODEL_PATH + "about/person_idle.buf", {
      onLoad: e => {
        this._onAnimationLoad(e);
      }
    });
  }
  _onTextureLoad() {
    if (this.lightTexture && this.texture) {
      let e = fboHelper.createRenderTarget(this.lightTexture.image.width, this.lightTexture.image.height);
      e.texture.minFilter = LinearMipMapNearestFilter;
      e.texture.generateMipmaps = false;
      this.sharedUniforms.u_texture.value = e.texture;
      fboHelper.copy(textureHelper.transparentTexture, e);
      textureHelper.mixChannels(this.lightTexture, e, 0, 1, 2, -1);
      e.texture.generateMipmaps = true;
      textureHelper.mixChannels(this.texture, e, -1, -1, -1, 0);
      this.texture.dispose();
      this.lightTexture.dispose();
      this.texture = null;
      this.lightTexture = null;
    }
  }
  _onModelLoad(e) {
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: Object.assign({
        u_texture: this.sharedUniforms.u_texture,
        u_lightMixer: this.sharedUniforms.u_lightMixer,
        u_bonePoses: {
          value: this.bonePoses
        },
        u_boneOrients: {
          value: this.boneOrients
        }
      }, light.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: vert$6,
      fragmentShader: frag$9
    }));
    this.mesh.material.defines.BONE_COUNT = this.BONE_COUNT;
    this.container.add(this.mesh);
  }
  _onAnimationLoad(e) {
    this.bonePosAnimationData = e.attributes.position.array;
    this.boneOrientAnimationData = e.attributes.orient.array;
    this.frameCount = this.bonePosAnimationData.length / (this.BONE_COUNT * 3);
  }
  init() {
    this.shadowMesh = new Mesh(new PlaneGeometry(1.5, 1.5), new ShaderMaterial({
      uniforms: Object.assign({
        u_texture: {
          value: this.shadowTexture
        },
        u_lightMixer: this.sharedUniforms.u_lightMixer
      }, blueNoise.sharedUniforms),
      vertexShader: shadowVert,
      fragmentShader: shadowFrag,
      blending: MultiplyBlending
    }));
    this.shadowMesh.renderOrder = 10;
    this.shadowMesh.position.y = 0.01;
    this.shadowMesh.rotation.x = -Math.PI / 2;
    this.container.add(this.shadowMesh);
  }
  update(e) {
    if (this.mesh && this.frameCount) {
      this.time += e * 0.5;
      let t = this.time * this.FPS % this.frameCount;
      let r = Math.floor(t);
      let n = Math.ceil(t) % this.frameCount;
      let a = t - r;
      let l = r * this.BONE_COUNT;
      let c = n * this.BONE_COUNT;
      let u = this.frameCount / 3;
      this.sharedUniforms.u_lightMixer.value.set(math.fit(t, u * 2, this.frameCount, 0, 1) + math.fit(t, 0, u, 1, 0), math.fit(t, 0, u, 0, 1) * math.fit(t, u, u * 2, 1, 0), math.fit(t, u, u * 2, 0, 1) * math.fit(t, u * 2, this.frameCount, 1, 0));
      for (let f = 0; f < this.BONE_COUNT; f++) {
        _v1$2.fromArray(this.bonePosAnimationData, (l + f) * 3).lerp(_v2$1.fromArray(this.bonePosAnimationData, (c + f) * 3), a).toArray(this.bonePoses, f * 3);
        _q1$1.fromArray(this.boneOrientAnimationData, (l + f) * 4).slerp(_q2.fromArray(this.boneOrientAnimationData, (c + f) * 4), a).toArray(this.boneOrients, f * 4);
      }
    }
  }
}
const aboutHeroPerson$1 = new aboutHeroPerson();
const aboutHeroVisualFinalVert = `#define GLSLIFY 1
float viewZ=(modelViewMatrix*vec4(pos,1.0)).z;float near=1.;float far=100.0;v_depth=1.0-(viewZ+near)/(near-far);`;
const aboutHeroVisualFinalFrag = `#define GLSLIFY 1
gl_FragColor.r=gl_FragColor.r;gl_FragColor.g=v_depth;gl_FragColor.b=1.0;`;
const vert$5 = `#define GLSLIFY 1
varying vec3 v_worldPosition;varying vec2 v_uv;varying float v_depth;varying float v_instanceId;varying float v_opacity;attribute float a_instanceId;attribute vec3 a_instancePos;attribute vec3 a_instanceRands;uniform float u_introTime;uniform float u_sceneRatio;uniform float u_hudRatio;vec4 mod289(vec4 x){return x-floor(x*(1.0/289.0))*289.0;}float mod289(float x){return x-floor(x*(1.0/289.0))*289.0;}vec4 permute(vec4 x){return mod289(((x*34.0)+1.0)*x);}float permute(float x){return mod289(((x*34.0)+1.0)*x);}vec4 taylorInvSqrt(vec4 r){return 1.79284291400159-0.85373472095314*r;}float taylorInvSqrt(float r){return 1.79284291400159-0.85373472095314*r;}vec4 grad4(float j,vec4 ip){const vec4 ones=vec4(1.0,1.0,1.0,-1.0);vec4 p,s;p.xyz=floor(fract(vec3(j)*ip.xyz)*7.0)*ip.z-1.0;p.w=1.5-dot(abs(p.xyz),ones.xyz);s=vec4(lessThan(p,vec4(0.0)));p.xyz=p.xyz+(s.xyz*2.0-1.0)*s.www;return p;}
#define F4 0.309016994374947451
vec4 simplexNoiseDerivatives(vec4 v_0){const vec4 C=vec4(0.138196601125011,0.276393202250021,0.414589803375032,-0.447213595499958);vec4 i=floor(v_0+dot(v_0,vec4(F4)));vec4 x0=v_0-i+dot(i,C.xxxx);vec4 i0;vec3 isX=step(x0.yzw,x0.xxx);vec3 isYZ=step(x0.zww,x0.yyz);i0.x=isX.x+isX.y+isX.z;i0.yzw=1.0-isX;i0.y+=isYZ.x+isYZ.y;i0.zw+=1.0-isYZ.xy;i0.z+=isYZ.z;i0.w+=1.0-isYZ.z;vec4 i3=clamp(i0,0.0,1.0);vec4 i2=clamp(i0-1.0,0.0,1.0);vec4 i1=clamp(i0-2.0,0.0,1.0);vec4 x1=x0-i1+C.xxxx;vec4 x2=x0-i2+C.yyyy;vec4 x3=x0-i3+C.zzzz;vec4 x4=x0+C.wwww;i=mod289(i);float j0=permute(permute(permute(permute(i.w)+i.z)+i.y)+i.x);vec4 j1=permute(permute(permute(permute(i.w+vec4(i1.w,i2.w,i3.w,1.0))+i.z+vec4(i1.z,i2.z,i3.z,1.0))+i.y+vec4(i1.y,i2.y,i3.y,1.0))+i.x+vec4(i1.x,i2.x,i3.x,1.0));vec4 ip=vec4(1.0/294.0,1.0/49.0,1.0/7.0,0.0);vec4 p0=grad4(j0,ip);vec4 p1=grad4(j1.x,ip);vec4 p2=grad4(j1.y,ip);vec4 p3=grad4(j1.z,ip);vec4 p4=grad4(j1.w,ip);vec4 norm=taylorInvSqrt(vec4(dot(p0,p0),dot(p1,p1),dot(p2,p2),dot(p3,p3)));p0*=norm.x;p1*=norm.y;p2*=norm.z;p3*=norm.w;p4*=taylorInvSqrt(dot(p4,p4));vec3 values0=vec3(dot(p0,x0),dot(p1,x1),dot(p2,x2));vec2 values1=vec2(dot(p3,x3),dot(p4,x4));vec3 m0=max(0.5-vec3(dot(x0,x0),dot(x1,x1),dot(x2,x2)),0.0);vec2 m1=max(0.5-vec2(dot(x3,x3),dot(x4,x4)),0.0);vec3 temp0=-6.0*m0*m0*values0;vec2 temp1=-6.0*m1*m1*values1;vec3 mmm0=m0*m0*m0;vec2 mmm1=m1*m1*m1;float dx=temp0[0]*x0.x+temp0[1]*x1.x+temp0[2]*x2.x+temp1[0]*x3.x+temp1[1]*x4.x+mmm0[0]*p0.x+mmm0[1]*p1.x+mmm0[2]*p2.x+mmm1[0]*p3.x+mmm1[1]*p4.x;float dy=temp0[0]*x0.y+temp0[1]*x1.y+temp0[2]*x2.y+temp1[0]*x3.y+temp1[1]*x4.y+mmm0[0]*p0.y+mmm0[1]*p1.y+mmm0[2]*p2.y+mmm1[0]*p3.y+mmm1[1]*p4.y;float dz=temp0[0]*x0.z+temp0[1]*x1.z+temp0[2]*x2.z+temp1[0]*x3.z+temp1[1]*x4.z+mmm0[0]*p0.z+mmm0[1]*p1.z+mmm0[2]*p2.z+mmm1[0]*p3.z+mmm1[1]*p4.z;float dw=temp0[0]*x0.w+temp0[1]*x1.w+temp0[2]*x2.w+temp1[0]*x3.w+temp1[1]*x4.w+mmm0[0]*p0.w+mmm0[1]*p1.w+mmm0[2]*p2.w+mmm1[0]*p3.w+mmm1[1]*p4.w;return vec4(dx,dy,dz,dw)*49.0;}vec2 rotate(vec2 v,float a){float s=sin(a);float c=cos(a);mat2 m=mat2(c,s,-s,c);return m*v;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){vec3 localPos=position;localPos.xy=rotate(localPos.xy,a_instanceRands.y*6.28+sign(-a_instancePos.x)*u_introTime*mix(0.03,0.15,a_instanceRands.z));vec3 pos=(9.0+2.0*a_instanceRands.x)*localPos;vec3 noise=simplexNoiseDerivatives(vec4((a_instancePos+pos)*0.5,u_introTime*0.075)).yzw;float cycle=fract((0.08+0.08*a_instanceRands.x)*u_introTime+a_instanceRands.z);vec3 instancePos=a_instancePos+vec3(cycle*(a_instancePos.x*0.75+sign(a_instancePos.x)*0.25),0.0,0.0)+noise*vec3(0.35,0.2,0.1);instancePos.y-=linearStep(4.,1.,abs(instancePos.x))*1.+0.5;pos+=instancePos;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_uv=uv;v_instanceId=a_instanceId;float d=(modelViewMatrix*vec4(instancePos,1.0)).z;v_opacity=smoothstep(1.,3.,-d)*u_sceneRatio*(1.-u_hudRatio)*linearStep(0.,0.25,cycle)*linearStep(1.,0.75,cycle)*mix(1.,0.75,a_instanceRands.x);if(v_opacity<0.004){gl_Position.z=2.*gl_Position.w;}
#include <aboutHeroVisualFinal_vert>
}`;
const frag$8 = `#define GLSLIFY 1
varying vec3 v_worldPosition;varying vec2 v_uv;varying float v_depth;varying float v_instanceId;varying float v_opacity;uniform sampler2D u_currSceneTexture;uniform sampler2D u_fogTexture;uniform vec2 u_resolution;uniform vec3 u_lightPosition;uniform float u_noiseStableFactor;uniform float u_time;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
#include <getBlueNoise>
#include <getScatter>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}void main(){float faceDirection=gl_FrontFacing ? 1.0 :-1.0;vec2 screenPaintUv=gl_FragCoord.xy/u_resolution;vec2 fogMap=texture2D(u_fogTexture,v_uv).rg;vec4 currScene=texture2D(u_currSceneTexture,screenPaintUv);float depth=v_depth-fogMap.y*0.02;float depthMask=fogMap.x*1.35-fogMap.y*0.15;gl_FragColor.r=depthMask*v_opacity;gl_FragColor.gb=currScene.gb;gl_FragColor.a=exp(-length(v_worldPosition+vec3(0.,0.,-max(0.,fogMap.y-0.25)*10.+5.)-vec3(0.,0.,0.))*(0.22-fogMap.x*0.2))*fogMap.y*linearStep(0.0,0.035,depth-currScene.g)*v_opacity*0.45;}`;
class AboutHeroFog {
  container = new Object3D();
  geometry = null;
  material = null;
  mesh = null;
  texture = null;
  cacheRT = null;
  INSTANCES_COUNT = 32;
  preInit() {
    this.texture = properties.loader.add(settings.TEXTURE_PATH + "about/fog.png", {
      type: "texture"
    }).content;
  }
  init() {
    let e = math.getSeedRandomFn("fog96");
    this.cacheRT = fboHelper.createRenderTarget(1, 1);
    const t = new PlaneGeometry(1, 1, 3, 3);
    this.geometry = new InstancedBufferGeometry();
    for (let l in t.attributes) {
      this.geometry.setAttribute(l, t.attributes[l]);
    }
    this.geometry.setIndex(t.index);
    const r = new Float32Array(this.INSTANCES_COUNT);
    const n = new Float32Array(this.INSTANCES_COUNT * 3);
    const a = new Float32Array(this.INSTANCES_COUNT * 3);
    for (let l = 0, c = 0; l < this.INSTANCES_COUNT; l++) {
      r[l] = l;
      n[c] = (e() * 2 - 1) * 12;
      n[c + 1] = -0.25 + e() * 0.5;
      n[c + 2] = (1 - l / (this.INSTANCES_COUNT - 1) * 2) * 12;
      a[c] = e() * 2 - 1;
      a[c + 1] = e() * 2 - 1;
      a[c + 2] = e() * 2 - 1;
      c += 3;
    }
    this.geometry.setAttribute("a_instanceId", new InstancedBufferAttribute(r, 1));
    this.geometry.setAttribute("a_instancePos", new InstancedBufferAttribute(n, 3));
    this.geometry.setAttribute("a_instanceRands", new InstancedBufferAttribute(a, 3));
    this.material = new ShaderMaterial({
      uniforms: Object.assign({
        u_fogTexture: {
          value: this.texture
        },
        u_currSceneTexture: {
          value: this.cacheRT.texture
        },
        u_lightPosition: light.sharedUniforms.u_lightPosition,
        u_resolution: properties.sharedUniforms.u_resolution
      }, blueNoise.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: vert$5,
      fragmentShader: frag$8,
      side: DoubleSide,
      depthWrite: false,
      blending: CustomBlending,
      blendEquation: AddEquation,
      blendSrc: SrcAlphaFactor,
      blendDst: OneMinusSrcAlphaFactor,
      blendEquationAlpha: AddEquation,
      blendSrcAlpha: ZeroFactor,
      blendDstAlpha: OneFactor
    });
    this.mesh = new Mesh(this.geometry, this.material);
    this.mesh.renderOrder = 20;
    this.mesh.frustumCulled = false;
    this.mesh.onBeforeRender = this.onBeforeRender.bind(this);
    this.container.add(this.mesh);
  }
  onBeforeRender() {
    let e = fboHelper.renderer;
    let t = e.getRenderTarget();
    fboHelper.clearMultisampleRenderTargetState();
    fboHelper.copy(t.texture, this.cacheRT);
    e.setRenderTarget(t);
  }
  resize(e, t) {
    this.cacheRT.setSize(e, t);
  }
  update(e) {}
}
const aboutHeroFog = new AboutHeroFog();
const vert$4 = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform vec3 u_lightPosition;void main(){vec3 pos=position;vec4 mvPosition=modelViewMatrix*vec4(pos,1.);gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.)).xyz;v_viewNormal=normalMatrix*normal;v_viewPosition=-mvPosition.xyz;v_uv=uv;v_localPosition=position;gl_Position.z=1.*(gl_Position.w);}`;
const frag$7 = `#define GLSLIFY 1
varying vec3 v_viewPosition;varying vec3 v_worldPosition;varying vec3 v_viewNormal;varying vec2 v_uv;varying vec3 v_localPosition;varying float v_depth;uniform vec3 u_bgColor;uniform vec3 u_lightPosition;uniform vec2 u_resolution;uniform sampler2D u_currSceneTexture;uniform float u_sceneRatio;uniform float u_hudRatio;
#define PI 3.141592653589793
#define PI2 6.283185307179586
#define PI_HALF 1.5707963267948966
#define RECIPROCAL_PI 0.3183098861837907
#define RECIPROCAL_PI2 0.15915494309189535
#define saturate( a ) clamp( a, 0.0, 1.0 )
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#include <getScatter>
#include <getBlueNoise>
void main(){vec3 noise=getBlueNoise(gl_FragCoord.xy+vec2(57.,27.));gl_FragColor.r=getScatter(cameraPosition,v_worldPosition);gl_FragColor.r*=u_sceneRatio*(1.-u_hudRatio);gl_FragColor.g=1.;gl_FragColor.b=linearStep(15.,66.,v_worldPosition.z);gl_FragColor.a=0.;gl_FragColor.r+=noise.r*0.004;}`;
class AboutHeroHalo {
  container = new Object3D();
  mesh = null;
  preInit() {
    properties.loader.add(settings.MODEL_PATH + "about/bg_box.buf", {
      onLoad: this._onGeometryLoad.bind(this)
    });
  }
  _onGeometryLoad(e) {
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: Object.assign({
        u_resolution: properties.sharedUniforms.u_resolution
      }, light.sharedUniforms, blueNoise.sharedUniforms, aboutHeroScatter.sharedUniforms, aboutHero.sharedUniforms),
      vertexShader: vert$4,
      fragmentShader: frag$7
    }));
    this.mesh.renderOrder = 10;
    this.container.add(this.mesh);
  }
  init() {}
  resize(e, t) {}
  update(e) {}
}
const aboutHeroHalo = new AboutHeroHalo();