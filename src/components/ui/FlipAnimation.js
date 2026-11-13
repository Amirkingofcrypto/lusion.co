const vert = `#define GLSLIFY 1
attribute vec2 instancedPos;attribute vec2 instancedInfo;uniform vec2 u_tankOffset;uniform vec2 u_tankSize;uniform vec2 u_tankActualSize;uniform vec2 u_renderScale;uniform float u_radius;uniform float u_opacity;
#include <ufxVert>
#ifdef IS_TEXTURE
attribute vec4 instanceColorShape;varying vec3 v_color;varying vec3 v_colorMix;varying vec2 v_uv;
#endif
void main(){float angle=instancedInfo.x;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);vec3 basePos=vec3((instancedPos-u_tankOffset)/u_tankActualSize-vec2(.5),0.0);basePos.y=-basePos.y;basePos.xy*=u_renderScale*2.;float particleSize=1.;
#ifdef IS_TEXTURE
float colorFract=fract(instanceColorShape.w/3.);v_color=instanceColorShape.rgb;v_colorMix=vec3(colorFract<0.25 ? 1. : 0.,abs(colorFract-.5)<0.25 ? 1. : 0.,colorFract>0.75 ? 1. : 0.);v_uv=uv;v_uv.x=(v_uv.x+floor(instanceColorShape.w/3.))/8.;
#else
particleSize+=min(1.,abs(instancedInfo.y)*0.01);
#endif
vec3 screenPos=getScreenPosition(basePos);screenPos.xy+=(m*position.xy)*u_radius*particleSize*u_renderScale.x*2.*u_opacity;gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);}`;
const frag$3 = `#define GLSLIFY 1
#ifdef IS_TEXTURE
uniform sampler2D u_texture;varying vec3 v_color;varying vec3 v_colorMix;varying vec2 v_uv;
#else
uniform vec3 u_color;
#endif
void main(){
#ifdef IS_TEXTURE
float a=dot(v_colorMix,texture2D(u_texture,v_uv).rgb);gl_FragColor=vec4(v_color,a);
#else
gl_FragColor=vec4(u_color,1.);
#endif
}`;
let COLORS = ["#ff383c", "#0029ff", "#bb2bff", "#1eff5d", "#cfff0f", "#d6e4ec", "#bbcbda", "#7a8d9b", "#262229"];
class FlipAnimation {
  PRESSURE_ITERATION = 60;
  NUM_PARTICLES_ITERS = 4;
  OVER_RELAXATION = 1;
  FLIP_RATIO = 0;
  mesh;
  meshList = [];
  top = 0;
  height = 0;
  gravity = 0;
  isActive = false;
  needsReset = false;
  hasDown = false;
  prevViewportWidth = 0;
  prevViewportHeight = 0;
  opacity = 1;
  colorHex;
  container = new Object3D();
  shapedContainer = new Object3D();
  texturedContainer = new Object3D();
  prevUseTextured = null;
  useTextured = true;
  sharedUniforms = {
    u_tankOffset: {
      value: new Vector2()
    },
    u_tankSize: {
      value: new Vector2()
    },
    u_tankActualSize: {
      value: new Vector2()
    },
    u_radius: {
      value: 0
    },
    u_opacity: {
      value: 0
    },
    u_renderScale: {
      value: new Vector2()
    },
    u_color: {
      value: new Color("#1A2FFB")
    },
    u_texture: {
      value: null
    }
  };
  preInit() {
    let e = [];
    for (let n = 0; n < COLORS.length; n++) {
      COLORS[n] = new Color(COLORS[n]);
    }
    let t = new BufferGeometry();
    t.setAttribute("position", new BufferAttribute(new Float32Array([0.0714286, -0.5, 0, -0.0714286, -0.5, 0, 0.5, -0.0714286, 0, 0.0714286, -0.0714286, 0, -0.0714286, -0.0714286, 0, -0.5, -0.0714286, 0, 0.5, 0.0714286, 0, 0.0714286, 0.0714286, 0, -0.0714286, 0.0714286, 0, -0.5, 0.0714286, 0, 0.0714286, 0.5, 0, -0.0714286, 0.5, 0]), 3));
    t.setIndex(new BufferAttribute(new Uint8Array([4, 5, 9, 0, 4, 3, 8, 7, 3, 7, 2, 3, 7, 6, 2, 11, 10, 7, 7, 8, 11, 3, 4, 8, 0, 1, 4, 4, 9, 8]), 1));
    e.push(t);
    e.push(new PlaneGeometry(0.8, 0.8));
    e.push(new CircleGeometry(0.4, 10));
    e.push(new CircleGeometry(0.5, 3));
    e.push(new PlaneGeometry(1.6, 1.6));
    let r = properties.loader.add(settings.TEXTURE_PATH + "flip_texture.png", {
      type: "texture"
    }).content;
    this.sharedUniforms.u_texture.value = r;
    for (let n = 0; n < e.length; n++) {
      let a = e[n];
      let l = new InstancedBufferGeometry();
      for (let u in a.attributes) {
        l.setAttribute(u, a.attributes[u]);
      }
      l.index = a.index;
      let c = new UfxMesh({
        geometry: l,
        material: new ShaderMaterial({
          uniforms: this.sharedUniforms,
          vertexShader: vert,
          fragmentShader: frag$3,
          depthWrite: false,
          depthTest: false,
          side: DoubleSide
        })
      });
      c.material.extensions.derivatives = true;
      c.frustumCulled = false;
      if (n < e.length - 1) {
        this.shapedContainer.add(c);
      } else {
        this.texturedContainer.add(c);
        c.material.defines.IS_TEXTURE = true;
        c.material.transparent = true;
      }
      this.meshList.push(c);
    }
    this.container.add(this.shapedContainer);
    this.container.add(this.texturedContainer);
    pageExtraSections.postUfxContainer.add(this.container);
  }
  init() {}
  reInitTank() {
    let e = properties.viewportWidth;
    let t = properties.viewportHeight;
    scrollManager.syncDom();
    this.capturedOffsetY = -scrollManager.scrollPixel + endSection.offsetY;
    let r = document.querySelector("#end-section-outer").getBoundingClientRect().top - this.capturedOffsetY;
    let n = document.querySelector("#end-section-outer").getBoundingClientRect().bottom - this.capturedOffsetY;
    let a = this.prevViewportWidth != e || this.prevViewportHeight != t || !flipSim.hasInitialized || this.prevUseTextured !== this.useTextured;
    this.prevUseTextured = this.useTextured;
    if (a) {
      this.prevViewportWidth = properties.viewportWidth;
      this.prevViewportHeight = properties.viewportHeight;
    }
    var l = 2;
    var c = l * t / e;
    let u = this.useTextured ? 0.4 : 1;
    var f = Math.ceil(math.fit(e, 320, 2560, 20, 90) * u);
    var p = this.tankWidth = l * 1;
    var g = this.tankHeight = c * 1;
    var v = p / f;
    var _ = 1;
    this.gravity = Math.ceil(math.fit(e, 320, 2560, -15, -3)) * (this.useTextured ? 1.5 : 1);
    var T = v * 0.2;
    var M = Math.ceil(math.fit(e, 320, 2560, 20, 80) * u);
    var S = Math.ceil(M * t / e);
    var b = Math.ceil(M * S / (this.meshList.length - 1)) * (this.meshList.length - 1);
    if (a) {
      flipSim.init(_, p, g, v, T, b);
    }
    this.sharedUniforms.u_tankOffset.value.set(flipSim.h, flipSim.h);
    this.sharedUniforms.u_tankSize.value.set(p, g);
    this.sharedUniforms.u_tankActualSize.value.set(flipSim.tankInnerWidth, flipSim.tankInnerHeight);
    this.sharedUniforms.u_radius.value = T;
    this.sharedUniforms.u_renderScale.value.set(e / p, e / p * flipSim.tankInnerHeight / flipSim.tankInnerWidth);
    let C = r + n >> 1;
    let w = e;
    let R = flipSim.tankInnerHeight / flipSim.tankInnerWidth * w;
    r = C - R / 2;
    n = C + R / 2;
    this.top = r;
    this.height = R;
    let E = flipSim.particlePosOut.length / 2;
    let I = Math.floor(E / (this.meshList.length - 1));
    let F = 0;
    for (let k = 0; k < this.meshList.length; k++) {
      let L = this.meshList[k];
      if (a) {
        let D;
        if (k < this.meshList.length - 1) {
          D = new InstancedInterleavedBuffer(flipSim.particlePosOut, 2, 4);
          L.geometry.setAttribute("instancedPos", new InterleavedBufferAttribute(D, 2, F * 2));
          L.geometry.attributes.instancedPos.usage = DynamicDrawUsage;
          D.count /= 4;
          D = new InstancedInterleavedBuffer(flipSim.particleInfo, 2, 4);
          L.geometry.setAttribute("instancedInfo", new InterleavedBufferAttribute(D, 2, F * 2));
          L.geometry.attributes.instancedInfo.usage = DynamicDrawUsage;
          D.count /= 4;
          F += I;
        } else {
          L.geometry.setAttribute("instancedPos", new InstancedBufferAttribute(flipSim.particlePosOut, 2));
          L.geometry.attributes.instancedPos.usage = DynamicDrawUsage;
          L.geometry.setAttribute("instancedInfo", new InstancedBufferAttribute(flipSim.particleInfo, 2));
          L.geometry.attributes.instancedInfo.usage = DynamicDrawUsage;
          let ne = flipSim.particlePosOut.length / 2;
          let re = new Float32Array(ne * 4);
          for (let ce = 0, z = 0; ce < ne; ce++, z += 4) {
            let j = ce % 45;
            j = j < 5 ? j : 5 + (j - 5) % 4;
            let X = COLORS[j];
            re[z + 0] = X.r;
            re[z + 1] = X.g;
            re[z + 2] = X.b;
            re[z + 3] = ~~(ce / 23) % 23;
          }
          L.geometry.setAttribute("instanceColorShape", new InstancedBufferAttribute(re, 4));
        }
        L.geometry._maxInstanceCount = flipSim.maxParticles;
      }
      L.syncRect(0, r + this.capturedOffsetY, e, R, this.capturedOffsetY);
    }
    if (a && !this.useTextured) {
      let k = document.querySelector("#end-bottom");
      flipSim.addColliderRect(this.convertDomRectToTankRect(k.getBoundingClientRect()), -1, -1, -1, -1);
    }
    this.hasDown = false;
  }
  resize() {
    if (this.isActive && this.meshList.length > 0) {
      this.reInitTank();
    } else {
      this.needsReset = true;
    }
    this.hasDown = false;
  }
  convertDomRectToTankRect(e) {
    let t = this.convertPixelXYToTankXY(e.left, e.bottom);
    let r = this.convertPixelSizeToTankSize(e.width, e.height);
    return {
      x: t.x,
      y: t.y,
      w: r.w,
      h: r.h
    };
  }
  convertPixelSizeToTankSize(e, t) {
    return {
      w: e / properties.viewportWidth * flipSim.tankInnerWidth,
      h: t / this.height * flipSim.tankInnerHeight
    };
  }
  convertPixelXYToTankXY(e, t) {
    let r = this.convertPixelSizeToTankSize(math.clamp(e, 0, properties.viewportWidth - 1), math.clamp(this.top + this.height - t - scrollManager.scrollPixel + endSection.offsetY, 0, properties.viewportHeight - 1));
    return {
      x: r.w + flipSim.h,
      y: r.h + flipSim.h
    };
  }
  update(e) {
    if (this.isActive) {
      if (this.needsReset || this.prevUseTextured !== this.useTextured) {
        this.needsReset = false;
        this.reInitTank();
      }
      if (properties.hasInitialized) {
        if (this.useTextured) {
          this.shapedContainer.visible = false;
          this.texturedContainer.visible = true;
        } else {
          this.shapedContainer.visible = true;
          this.texturedContainer.visible = false;
        }
        let t = -scrollManager.scrollPixel + endSection.offsetY;
        this.sharedUniforms.u_color.value.setStyle(this.colorHex);
        this.sharedUniforms.u_opacity.value = this.opacity;
        if (this.meshList[0].testViewport(t)) {
          e = Math.max(1 / 120, e);
          let r = true;
          let n = true;
          let a = this.convertPixelXYToTankXY(input.prevMousePixelXY.x, input.prevMousePixelXY.y);
          let l = this.convertPixelXYToTankXY(input.mousePixelXY.x, input.mousePixelXY.y);
          let c = l.x;
          let u = l.y;
          let f = (l.x - a.x) / e;
          let p = (l.y - a.y) / e;
          let g = 150 / properties.viewportWidth * (properties.useMobileLayout ? input.isDown ? 0.35 : 0 : math.fit(Math.sqrt(f * f + p * p), 0, 2, 0.2, 1));
          if (input.isDown && !properties.useMobileLayout) {
            c = -1000;
            u = -1000;
            this.hasDown = true;
            flipSim.isFlushing = true;
            flipSim.emitterPosA.copy(this.convertPixelXYToTankXY(input.prevMousePixelXY.x, input.prevMousePixelXY.y));
            flipSim.emitterPosB.copy(this.convertPixelXYToTankXY(input.mousePixelXY.x, input.mousePixelXY.y));
          } else {
            if (!this.hasDown) {
              flipSim.emitterPosA.copy(flipSim.emitterPosB.set(1, this.tankHeight * 0.5, 0));
            }
            flipSim.isFlushing = false;
          }
          flipSim.simulate(e, this.gravity, this.FLIP_RATIO, this.PRESSURE_ITERATION, this.NUM_PARTICLES_ITERS, this.OVER_RELAXATION, r, n, c, u, g, f, p);
          for (let v = 0; v < this.meshList.length; v++) {
            let _ = this.meshList[v];
            _.geometry.attributes.instancedPos.needsUpdate = true;
            _.geometry.attributes.instancedInfo.needsUpdate = true;
            _.update(t);
            _.visible = true;
          }
        } else {
          for (let r = 0; r < this.meshList.length; r++) {
            let n = this.meshList[r];
            n.visible = false;
          }
        }
      }
    } else {
      this.needsReset = true;
      for (let t = 0; t < this.meshList.length; t++) {
        let r = this.meshList[t];
        r.visible = false;
      }
    }
  }
}
const flipAnimation = new FlipAnimation();