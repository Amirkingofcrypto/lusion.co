const blitVert = `#define GLSLIFY 1
attribute vec2 position;varying vec2 v_uv;void main(){v_uv=position*0.5+0.5;gl_Position=vec4(position,0.0,1.0);}`;
const blitFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;varying vec2 v_uv;void main(){gl_FragColor=texture2D(u_texture,v_uv);}`;
const uvBlitVert = `#define GLSLIFY 1
attribute vec2 position;attribute vec2 uv;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=vec4(position,0.0,1.0);}`;
const clearFrag = `#define GLSLIFY 1
uniform vec4 u_color;varying vec2 v_uv;void main(){gl_FragColor=u_color;}`;
const debugVert = `#define GLSLIFY 1
attribute vec3 position;attribute vec2 uv;uniform vec4 u_transform;varying vec2 v_uv;void main(){v_uv=uv;gl_Position=vec4(position.xy*u_transform.zw+u_transform.xy,0.0,1.0);}`;
class FboHelper {
  isWebGL2;
  renderer;
  quadGeom;
  triGeom;
  floatType;
  precisionPrefix;
  precisionPrefix2;
  vertexShader;
  _scene;
  _camera;
  _tri;
  copyMaterial;
  uvCopyMaterial;
  clearMaterial;
  _debugScene;
  _debugMesh;
  _debugMaterial;
  init(e, t) {
    this.renderer = e;
    this.floatType = t;
    this.isWebGL2 = this.renderer.capabilities.isWebGL2;
    this._scene = new Scene();
    this._camera = new Camera();
    this._camera.position.z = 1;
    this.triGeom = new BufferGeometry();
    this.triGeom.setAttribute("position", new BufferAttribute(new Float32Array([-1, -1, 0, 4, -1, 0, -1, 4, 0]), 3));
    this.quadGeom = new PlaneGeometry(2, 2);
    this._tri = new Mesh(this.triGeom);
    this._tri.frustumCulled = false;
    this._scene.add(this._tri);
    this.precisionPrefix = `precision ${this.renderer.capabilities.precision} float;
`;
    this.precisionPrefix2 = `precision ${this.renderer.capabilities.precision} float;
			precision ${this.renderer.capabilities.precision} int;
			#define IS_WEBGL2 true
		`;
    if (this.isWebGL2) {
      this.vertexPrefix = `${this.precisionPrefix2}
				precision mediump sampler2DArray;
				#define attribute in
				#define varying out
				#define texture2D texture
			`;
      this.fragmentPrefix = `${this.precisionPrefix2}
				#define varying in
				out highp vec4 pc_fragColor;
				#define gl_FragColor pc_fragColor
				#define gl_FragDepthEXT gl_FragDepth
				#define texture2D texture
				#define textureCube texture
				#define texture2DProj textureProj
				#define texture2DLodEXT textureLod
				#define texture2DProjLodEXT textureProjLod
				#define textureCubeLodEXT textureLod
				#define texture2DGradEXT textureGrad
				#define texture2DProjGradEXT textureProjGrad
				#define textureCubeGradEXT textureGrad
			`;
    } else {
      this.vertexPrefix = this.precisionPrefix;
      this.fragmentPrefix = this.precisionPrefix;
    }
    this.renderer.getContext().getExtension("OES_standard_derivatives");
    this.vertexShader = this.isWebGL2 ? this.precisionPrefix2 + blitVert : this.precisionPrefix + blitVert;
    this.copyMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        }
      },
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending
    });
    this.uvCopyMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        }
      },
      vertexShader: uvBlitVert,
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      glslVersion: this.isWebGL2 ? GLSL3 : GLSL1
    });
    this.clearMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_color: {
          value: new Vector4(1, 1, 1, 1)
        }
      },
      fragmentShader: clearFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending
    });
    const r = new PlaneGeometry(1, 1);
    r.translate(0.5, -0.5, 0);
    this._debugMaterial = this.createRawShaderMaterial({
      uniforms: {
        u_texture: {
          value: null
        },
        u_transform: {
          value: new Vector4(0, 0, 1, 1)
        }
      },
      vertexShader: debugVert,
      fragmentShader: blitFrag,
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      glslVersion: this.isWebGL2 ? GLSL3 : GLSL1
    });
    this._debugMesh = new Mesh(r, this._debugMaterial);
    this._debugScene = new Scene();
    this._debugScene.frustumCulled = false;
    this._debugScene.add(this._debugMesh);
  }
  copy(e, t) {
    const r = this.copyMaterial;
    if (r) {
      r.uniforms.u_texture.value = e;
      this.render(r, t);
    }
  }
  uvCopy(e, t) {
    const r = this.uvCopyMaterial;
    if (r) {
      r.uniforms.u_texture.value = e;
      this.render(r, t);
    }
  }
  render(e, t) {
    if (this._tri && this.renderer && this._scene && this._camera) {
      this._tri.material = e;
      if (t) {
        this.renderer.setRenderTarget(t);
      }
      this.renderer.render(this._scene, this._camera);
    }
  }
  renderGeometry(e, t, r) {
    if (this._tri && this.triGeom) {
      this._tri.geometry = e;
      this.render(t, r);
      this._tri.geometry = this.triGeom;
    }
  }
  renderMesh(e, t, r = this._camera) {
    if (this._tri && this.renderer && this._scene && r) {
      this._tri.visible = false;
      this._scene.add(e);
      if (t) {
        this.renderer.setRenderTarget(t || null);
      }
      this.renderer.render(this._scene, r);
      if (t) {
        this.renderer.setRenderTarget(null);
      }
      this._scene.remove(e);
      this._tri.visible = true;
    }
  }
  debugTo(e, t, r, n, a) {
    if (!this.renderer || !this._debugMaterial || !this._debugScene || !this._camera) {
      return;
    }
    t = t || e.width || e.image.width;
    r = r || e.height || e.image.height;
    n = n || 0;
    a = a || 0;
    const l = this.renderer.getSize(new Vector2());
    n = n / l.width * 2 - 1;
    a = 1 - a / l.height * 2;
    t = t / l.width * 2;
    r = r / l.height * 2;
    this._debugMaterial.uniforms.u_texture.value = e;
    this._debugMaterial.uniforms.u_transform.value.set(n, a, t, r);
    const c = this.getColorState();
    this.renderer.autoClearColor = false;
    this.renderer.setRenderTarget(null);
    this.renderer.render(this._debugScene, this._camera);
    this.setColorState(c);
  }
  parseDefines(e) {
    let t = "";
    for (const r in e) {
      const n = e[r];
      if (n === true) {
        t += `#define ${r}
`;
      } else {
        t += `#define ${r} ${n}
`;
      }
    }
    return t;
  }
  clearColor(e, t, r, n, a) {
    if (this.clearMaterial) {
      this.clearMaterial.uniforms.u_color.value.set(e, t, r, n);
      this.render(this.clearMaterial, a);
    }
  }
  getColorState() {
    if (!this.renderer) {
      return {
        autoClear: true,
        autoClearColor: true,
        autoClearStencil: true,
        autoClearDepth: true,
        clearColor: 0,
        clearAlpha: 1
      };
    }
    const e = new Color();
    this.renderer.getClearColor(e);
    return {
      autoClear: this.renderer.autoClear,
      autoClearColor: this.renderer.autoClearColor,
      autoClearStencil: this.renderer.autoClearStencil,
      autoClearDepth: this.renderer.autoClearDepth,
      clearColor: e.getHex(),
      clearAlpha: this.renderer.getClearAlpha()
    };
  }
  setColorState(e) {
    if (this.renderer) {
      this.renderer.setClearColor(e.clearColor, e.clearAlpha);
      this.renderer.autoClear = e.autoClear;
      this.renderer.autoClearColor = e.autoClearColor;
      this.renderer.autoClearStencil = e.autoClearStencil;
      this.renderer.autoClearDepth = e.autoClearDepth;
    }
  }
  createRawShaderMaterial(e) {
    e = Object.assign({
      depthTest: false,
      depthWrite: false,
      blending: NoBlending,
      vertexShader: blitVert,
      fragmentShader: blitFrag,
      derivatives: false
    }, e);
    e.vertexShader = (e.vertexShaderPrefix ? e.vertexShaderPrefix : e.derivatives ? this.vertexPrefix : this.vertexPrefix) + e.vertexShader;
    e.fragmentShader = (e.fragmentShaderPrefix ? e.fragmentShaderPrefix : e.derivatives ? this.fragmentPrefix : this.fragmentPrefix) + e.fragmentShader;
    delete e.vertexShaderPrefix;
    delete e.fragmentShaderPrefix;
    delete e.derivatives;
    e.glslVersion = this.isWebGL2 ? GLSL3 : GLSL1;
    let t = new RawShaderMaterial(e);
    taskManager.add(t);
    return t;
  }
  createDataTexture(e, t, r, n = false, a = true) {
    let l = new DataTexture(e, t, r, RGBAFormat, n ? FloatType : UnsignedByteType, UVMapping, ClampToEdgeWrapping, ClampToEdgeWrapping, a ? NearestFilter : LinearFilter, a ? NearestFilter : LinearFilter, 0);
    l.needsUpdate = true;
    return l;
  }
  createRenderTarget(e, t, r = false, n = false, a = 0) {
    return new WebGLRenderTarget(e, t, {
      wrapS: ClampToEdgeWrapping,
      wrapT: ClampToEdgeWrapping,
      magFilter: r ? NearestFilter : LinearFilter,
      minFilter: r ? NearestFilter : LinearFilter,
      type: typeof n == "boolean" ? n ? this.floatType : UnsignedByteType : n,
      anisotropy: 0,
      colorSpace: NoColorSpace,
      depthBuffer: false,
      stencilBuffer: false,
      samples: browser$1.isSupportMSAA ? a : 0
    });
  }
  createMultisampleRenderTarget(e, t, r = false, n = false, a = 8) {
    if (!this.renderer || !this.isWebGL2 || !browser$1.isSupportMSAA) {
      return this.createRenderTarget(e, t, r, n);
    } else {
      return new WebGLRenderTarget(e, t, {
        wrapS: ClampToEdgeWrapping,
        wrapT: ClampToEdgeWrapping,
        magFilter: r ? NearestFilter : LinearFilter,
        minFilter: r ? NearestFilter : LinearFilter,
        type: n ? this.floatType : UnsignedByteType,
        anisotropy: 0,
        colorSpace: NoColorSpace,
        depthBuffer: false,
        stencilBuffer: false,
        samples: a
      });
    }
  }
  clearMultisampleRenderTargetState(e) {
    e = e || this.renderer.getRenderTarget();
    if (e && e.samples > 0) {
      const t = this.renderer.properties.get(e);
      let r = this.renderer.getContext();
      r.bindFramebuffer(r.READ_FRAMEBUFFER, t.__webglMultisampledFramebuffer);
      r.bindFramebuffer(r.DRAW_FRAMEBUFFER, t.__webglFramebuffer);
      const n = e.width;
      const a = e.height;
      let l = r.COLOR_BUFFER_BIT;
      if (e.depthBuffer) {
        l |= r.DEPTH_BUFFER_BIT;
      }
      if (e.stencilBuffer) {
        l |= r.STENCIL_BUFFER_BIT;
      }
      r.blitFramebuffer(0, 0, n, a, 0, 0, n, a, l, r.NEAREST);
      r.bindFramebuffer(r.FRAMEBUFFER, t.__webglMultisampledFramebuffer);
    }
  }
}
const fboHelper = new FboHelper();