const vert$f = `#define GLSLIFY 1
attribute float piece;uniform sampler2D u_positionTexture;uniform sampler2D u_orientTexture;uniform vec2 u_textureSize;uniform float u_frameFrom;uniform float u_frameTo;uniform float u_frameRatio;uniform float u_fragmentScale;varying vec3 v_viewPosition;varying vec3 v_localDir;vec3 qrotate(vec4 q,vec3 v){return v+2.*cross(q.xyz,cross(q.xyz,v)+q.w*v);}void main(){vec4 animationUvs=(vec4(piece,u_frameFrom,piece,u_frameTo)+.5)/u_textureSize.xyxy;vec3 piecePosFrom=texture2D(u_positionTexture,animationUvs.xy).xyz;vec4 pieceOrientFrom=texture2D(u_orientTexture,animationUvs.xy);vec3 piecePosTo=texture2D(u_positionTexture,animationUvs.zw).xyz;vec4 pieceOrientTo=texture2D(u_orientTexture,animationUvs.zw);float radius=length(position)*u_fragmentScale;vec3 dir=position/radius;vec3 posFrom=qrotate(pieceOrientFrom,dir);vec3 posTo=qrotate(pieceOrientTo,dir);v_localDir=normalize(mix(posFrom,posTo,u_frameRatio));vec3 pos=v_localDir*radius+mix(piecePosFrom,piecePosTo,u_frameRatio);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;gl_Position=projectionMatrix*mvPosition;}`;
const frag$j = `#define GLSLIFY 1
uniform sampler2D u_backgroundTexture;uniform vec2 u_resolution;varying vec3 v_viewPosition;varying vec3 v_localDir;vec3 hue2RGBSmooth(in float hue){vec3 rgb=clamp(abs(mod(hue*6.0+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0);return rgb*rgb*(3.0-2.0*rgb);}void main(){vec3 fdx=dFdx(v_viewPosition);vec3 fdy=dFdy(v_viewPosition);vec3 viewNormal=normalize(cross(fdx,fdy));float alpha=abs(1.-viewNormal.z);vec3 localDir=normalize(v_localDir);vec2 uv=gl_FragCoord.xy/u_resolution.xy;vec3 bgColor=texture2D(u_backgroundTexture,uv).rgb;vec2 refl=reflect(normalize(v_viewPosition),viewNormal).xy;vec2 uvOffset=refl.xy*0.2*vec2(u_resolution.x/u_resolution.y,1.);vec3 color=texture2D(u_backgroundTexture,uv+uvOffset).rgb;color+=clamp(abs(mod((alpha)*8.+vec3(0.0,4.0,2.0),6.0)-3.0)-1.0,0.0,1.0)*(1.-alpha)*(1.-bgColor);gl_FragColor=vec4(color,alpha);}`;
class Ufx extends PostEffect {
  scene = new Scene();
  camera = new PerspectiveCamera(60, 1);
  frameIdx = -1;
  sectionLayer = new Object3D();
  projectDetailsLayer = new Object3D();
  sharedUniforms = {
    u_fromTexture: {
      value: null
    }
  };
  init() {}
  setPostprocessing(e) {
    let t = this.camera;
    let r = properties.viewportWidth;
    let n = properties.viewportHeight;
    t.position.set(r / 2, -n / 2, n / (Math.tan(t.fov * Math.PI / 360) * 2));
    t.aspect = r / n;
    t.far = t.position.z * 2;
    t.near = t.far / 1000;
    t.updateProjectionMatrix();
  }
  render(e, t = false) {
    let r = fboHelper.getColorState();
    let n = properties.renderer;
    fboHelper.copy(e.fromTexture, e.sceneRenderTarget);
    n.setRenderTarget(e.sceneRenderTarget);
    fboHelper.renderer.autoClear = false;
    fboHelper.renderer.autoClearColor = false;
    fboHelper.renderer.autoClearStencil = true;
    fboHelper.renderer.autoClearDepth = true;
    fboHelper.renderer.clear(false, true, true);
    n.render(this.scene, this.camera);
    n.setRenderTarget(null);
    let a = t ? null : e.toRenderTarget;
    fboHelper.copy(e.sceneTexture, a);
    fboHelper.setColorState(r);
    e.swap();
  }
}
class PreUfx extends Ufx {
  renderOrder = 50;
}
const preUfx = new PreUfx();
let _matrixWorld = new Matrix4();
let _matrixWorldInverse = new Matrix4();
let _projectionMatrix = new Matrix4();
let _q$1 = new Quaternion();
let _v1$3 = new Vector3();
class GoalTunnelGlass {
  PIECE_COUNT = 946;
  domFrameHeight = 1;
  domFrameRotation = 0;
  domFrameScale = 1;
  fragmentScale = 1;
  container;
  mesh;
  _geometry;
  ratio = 0;
  frameCount = 0;
  sharedUniforms = {
    u_positionTexture: {
      value: null
    },
    u_orientTexture: {
      value: null
    },
    u_textureSize: {
      value: new Vector2(0, 0)
    },
    u_frameFrom: {
      value: 0
    },
    u_frameTo: {
      value: 0
    },
    u_frameRatio: {
      value: 0
    },
    u_fragmentScale: {
      value: 0
    }
  };
  preInit() {
    this.container = new Object3D();
    properties.loader.add(settings.MODEL_PATH + "tunnels/broken_glass.buf", {
      onLoad: e => {
        this._onModelLoad(e);
      }
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/broken_glass_animation.buf", {
      onLoad: e => {
        this._onAnimationLoad(e);
      }
    });
  }
  _onModelLoad(e) {
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: {
        u_backgroundTexture: properties.postprocessing.sharedUniforms.u_fromTexture,
        u_resolution: properties.sharedUniforms.u_resolution,
        u_positionTexture: this.sharedUniforms.u_positionTexture,
        u_orientTexture: this.sharedUniforms.u_orientTexture,
        u_textureSize: this.sharedUniforms.u_textureSize,
        u_frameFrom: this.sharedUniforms.u_frameFrom,
        u_frameTo: this.sharedUniforms.u_frameTo,
        u_frameRatio: this.sharedUniforms.u_frameRatio,
        u_fragmentScale: this.sharedUniforms.u_fragmentScale
      },
      vertexShader: vert$f,
      fragmentShader: frag$j,
      transparent: true,
      extensions: {
        derivatives: true
      }
    }));
    this.mesh.visible = false;
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = 1000;
    this.container.add(this.mesh);
    this.mesh.onBeforeRender = this._onBeforeRender.bind(this);
    this.mesh.onAfterRender = this._onAfterRender.bind(this);
  }
  _onBeforeRender(e, t, r) {
    let n = cameraControls._camera;
    _matrixWorld.copy(r.matrixWorld);
    r.matrixWorld.copy(n.matrixWorld);
    _matrixWorldInverse.copy(r.matrixWorldInverse);
    r.matrixWorldInverse.copy(n.matrixWorldInverse);
    _projectionMatrix.copy(r.projectionMatrix);
    r.projectionMatrix.copy(n.projectionMatrix);
  }
  _onAfterRender(e, t, r) {
    if (this.container.parent == homePage.preUfxContainer) {
      r.matrixWorld.copy(_matrixWorld);
      r.matrixWorldInverse.copy(_matrixWorldInverse);
      r.projectionMatrix.copy(_projectionMatrix);
    }
  }
  _onAnimationLoad(e) {
    let t = e.attributes.position.array;
    let r = new Float32Array(t.length / 3 * 4);
    let n = this.frameCount = t.length / (this.PIECE_COUNT * 3);
    this.sharedUniforms.u_textureSize.value.set(this.PIECE_COUNT, n);
    for (let a = 0, l = 0; a < t.length; a += 3, l += 4) {
      r[l + 0] = t[a + 0];
      r[l + 1] = t[a + 1];
      r[l + 2] = t[a + 2];
      r[l + 3] = 0;
    }
    this.sharedUniforms.u_positionTexture.value = fboHelper.createDataTexture(r, this.PIECE_COUNT, n, true, true);
    this.sharedUniforms.u_orientTexture.value = fboHelper.createDataTexture(e.attributes.orient.array, this.PIECE_COUNT, n, true, true);
  }
  init() {
    if (this.mesh) {
      taskManager.add(this.mesh);
    }
  }
  resize(e, t) {}
  update(e) {
    if (this.mesh && this.container.visible) {
      if (this.ratio > 0) {
        let t = cameraControls._camera;
        this.mesh.position.copy(t.position);
        this.mesh.quaternion.copy(t.quaternion);
        this.mesh.translateZ(-goalTunnels.EndCameraDepthToFrame);
        let r = Math.tan(t.fov * math.DEG2RAD / 2) * goalTunnels.EndCameraDepthToFrame * 2;
        let n = this.domFrameHeight / properties.viewportHeight;
        n *= r * this.domFrameScale;
        _q$1.setFromAxisAngle(_v1$3.set(0, 0, 1), -this.domFrameRotation);
        this.mesh.quaternion.multiply(_q$1);
        this.mesh.scale.setScalar(n);
        let a = this.ratio * (this.frameCount - 1);
        let l = Math.floor(a);
        let c = Math.min(l + 1, this.frameCount - 1);
        let u = a - l;
        this.sharedUniforms.u_frameFrom.value = l;
        this.sharedUniforms.u_frameTo.value = c;
        this.sharedUniforms.u_frameRatio.value = u;
        this.sharedUniforms.u_fragmentScale.value = this.fragmentScale;
        this.mesh.visible = true;
      } else {
        this.mesh.visible = false;
      }
    }
  }
}
const goalTunnelGlass = new GoalTunnelGlass();