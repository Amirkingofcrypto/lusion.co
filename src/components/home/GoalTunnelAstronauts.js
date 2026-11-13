/**
 * ============================================================================
 * Lusion Modular Component: 13-goal-tunnel-objects
 * File: src/components/home/GoalTunnelObjects.js
 * Description: GoalTunnelAstronauts, GoalWhiteTunnel, Ufx, PreUfx & GoalTunnelGlass
 * Original Engine Lines: 35816 - 37242
 * ============================================================================
 */
class GoalTunnelAstronauts {
  container = new Object3D();
  materials = {};
  meshes = {};
  cloneMeshes = {};
  CLONES_COUNT = 4;
  TOTAL_COUNT = 5;
  transformObjectList = [];
  partIdList = ["helmet", "helmet_glass", "glove_shoes", "wearpack", "card"];
  textureTypeList = ["arm", "base", "nor"];
  textures = {};
  textureUniforms = {};
  extraCameraViewportOffsetX = 0;
  extraCameraViewportOffsetY = 0;
  instancePosAttribute;
  instanceOrientAttribute;
  instanceAnimationFrameFromToBlend1Attribute;
  instanceAnimationFrameFromToBlend2Attribute;
  instanceClonePosAttribute;
  instanceCloneOrientAttribute;
  instanceCloneAnimationFrameFromToBlend1Attribute;
  instanceCloneAnimationFrameFromToBlend2Attribute;
  _cameraNeedsSync = false;
  sharedUniforms = {
    u_time: properties.sharedUniforms.u_time,
    u_animationPositionTexture: {
      value: null
    },
    u_animationOrientTexture: {
      value: null
    },
    u_animationTextureSize: {
      value: new Vector2(0, 0)
    },
    u_frameCount: {
      value: null
    },
    u_lut: {
      value: null
    },
    u_bgColor: {
      value: new Color()
    },
    u_showRatio: {
      value: 0
    },
    u_loopLinearBlend: {
      value: 0
    },
    u_ambientColor: {
      value: new Color("#566d80")
    }
  };
  whiteTunnelUniforms = {
    u_matcapTexture: {
      value: null
    },
    u_frameOutRatio: {
      value: 0
    },
    u_whiteTunnelRatio: {
      value: 0
    },
    u_faceLedLight: {
      value: 0
    },
    u_faceLedColor: {
      value: new Color("#aaaafb")
    },
    u_tintColor: {
      value: new Color()
    },
    u_cardPosition: {
      value: new Vector3()
    },
    u_sunPosition: {
      value: new Vector3(-20, 0, 22)
    },
    u_envTexture: {
      value: null
    }
  };
  blackTunnelUniforms = {
    u_matcapTexture: {
      value: null
    },
    u_frameIn: {
      value: 0
    },
    u_blackTunnelRatio: {
      value: 0
    },
    u_endRatio: {
      value: 0
    },
    u_blackTunnelTexture: {
      value: null
    },
    u_sunFactor: {
      value: 1
    },
    u_sunPosition: {
      value: new Vector3(-20, 0, 22)
    },
    u_blackTunnelTransformRatio: goalBlackTunnel.sharedUniforms.u_blackTunnelTransformRatio,
    u_envTexture: {
      value: null
    },
    u_offsetZ: goalBlackTunnel.sharedUniforms.u_offsetZ,
    u_sunFadeColor: {
      value: new Color("#bbb")
    }
  };
  cloneUniforms = {
    u_alpha: {
      value: 0
    }
  };
  BONE_COUNT = 53;
  frameCount = -1;
  showRatio = 1;
  clonesShowRatio = 0;
  cardNoise = new Simple1DNoise();
  renderTarget = null;
  interRenderTarget = null;
  textureSize = null;
  isCardActive = false;
  cardTextureSize = new Vector2(5, 23);
  cardTime = 0;
  preInit() {
    this.TOTAL_COUNT = this.CLONES_COUNT + 1;
    shaderHelper.addChunk("astronautCommon", astronautCommon);
    shaderHelper.addChunk("astronautCommon_pars", astronautCommonPars);
    this.camera = new PerspectiveCamera();
    for (let e = 0; e < this.TOTAL_COUNT; e++) {
      let t = new Object3D();
      t.position.set(Math.random(), Math.random(), Math.random()).subScalar(0.5).normalize().multiplyScalar(Math.pow(Math.random(), 1 / 3) * 4);
      t.position.z += 15;
      t.rotation.set(Math.random() * Math.PI / 2, Math.random() * Math.PI / 2, Math.random() * Math.PI / 2);
      t.userData.timeShift = e === 0 ? 0 : Math.random() * 2;
      t.userData.cloneTimeShift = Math.random();
      t.userData.rotation = new Euler();
      t.userData.motion = new BrownianMotion();
      t.userData.motion._positionFrequency = 0.2;
      t.userData.motion._rotationFrequency = 0.6;
      t.userData.motion._positionAmplitude = 14;
      t.userData.motion._rotationAmplitude = 8.3;
      t.userData.positionDynamic = new SecondOrderDynamics(new Vector3(), 1, 0.65, 1.3);
      t.userData.rotationDynamic = new SecondOrderDynamics(new Vector3(), 1, 0.85, 1.1);
      t.userData.pauseLoopTime = 0;
      t.userData.animationTime = 0;
      t.userData.deltaTimeMultiplier = 1;
      this.transformObjectList.push(t);
    }
    this.instancePosAttribute = new InstancedBufferAttribute(new Float32Array(3), 3);
    this.instancePosAttribute.usage = DynamicDrawUsage;
    this.instanceOrientAttribute = new InstancedBufferAttribute(new Float32Array(4), 4);
    this.instanceOrientAttribute.usage = DynamicDrawUsage;
    this.instanceAnimationFrameFromToBlend1Attribute = new InstancedBufferAttribute(new Float32Array(3), 3);
    this.instanceAnimationFrameFromToBlend1Attribute.usage = DynamicDrawUsage;
    this.instanceAnimationFrameFromToBlend2Attribute = new InstancedBufferAttribute(new Float32Array(3), 3);
    this.instanceAnimationFrameFromToBlend2Attribute.usage = DynamicDrawUsage;
    this.instanceClonePosAttribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 3), 3);
    this.instanceClonePosAttribute.usage = DynamicDrawUsage;
    this.instanceCloneOrientAttribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 4), 4);
    this.instanceCloneOrientAttribute.usage = DynamicDrawUsage;
    this.instanceCloneAnimationFrameFromToBlend1Attribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 3), 3);
    this.instanceCloneAnimationFrameFromToBlend1Attribute.usage = DynamicDrawUsage;
    this.instanceCloneAnimationFrameFromToBlend2Attribute = new InstancedBufferAttribute(new Float32Array(this.CLONES_COUNT * 3), 3);
    this.instanceCloneAnimationFrameFromToBlend2Attribute.usage = DynamicDrawUsage;
    this.textures.card = properties.loader.add(settings.TEXTURE_PATH + "tunnels/astronaut/face.png", {
      type: "texture",
      minFilter: NearestFilter
    }).content;
    this.textures.card.magFilter = NearestFilter;
    this.textures.led = this._initLedTexture();
    for (let e = 0; e < this.partIdList.length; e++) {
      let t = this.partIdList[e];
      this.textureUniforms[t + "_armb"] = {
        value: null
      };
      this.textureUniforms[t + "_nor"] = {
        value: null
      };
      for (let r = 0; r < this.textureTypeList.length; r++) {
        let n = this.textureTypeList[r];
        if (t != "helmet_glass" && t !== "card") {
          properties.loader.add(settings.TEXTURE_PATH + "tunnels/astronaut/astronaut_" + t + "_" + n + ".webp", {
            type: "texture",
            onLoad: this._onTextureLoad.bind(this, t, n)
          });
        }
      }
      if (t === "card") {
        let r = new PlaneGeometry(0.2, 0.15).translate(0, 1.68, 0.1);
        r.setAttribute("boneIndices", new BufferAttribute(new Uint8Array([0, 0, 0, 0, 0, 0, 0, 0]), 2));
        r.setAttribute("boneWeights", new BufferAttribute(new Float32Array([1, 0, 1, 0, 1, 0, 1, 0]), 2));
        r.setAttribute("tangent", new BufferAttribute(new Float32Array([0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1, 0, 0, 0, 1]), 4));
        this._onGeometryLoad("card", r);
      } else {
        properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_" + t + ".buf", {
          onLoad: r => {
            this._onGeometryLoad(t, r, true);
            this._onGeometryLoad(t, r, false);
          }
        });
      }
    }
    properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_in_animation.buf", {
      onLoad: e => this.inAnimation = e
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_out_animation.buf", {
      onLoad: e => this.outAnimation = e
    });
    this.whiteTunnelUniforms.u_envTexture.value = this.blackTunnelUniforms.u_envTexture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/earth.webp", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    this.blackTunnelUniforms.u_matcapTexture.value = this.whiteTunnelUniforms.u_matcapTexture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/white_matcap.jpg", {
      type: "texture",
      minFilter: LinearFilter
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/astronaut_animations.buf", {
      onLoad: e => {
        this._onAnimationLoad(e);
      }
    });
    this.initGui();
  }
  _initLedTexture() {
    let e = document.createElement("canvas");
    e.width = e.height = 11;
    let t = e.getContext("2d");
    t.fillStyle = "#000";
    t.fillRect(0, 0, 11, 11);
    t.fillStyle = "#f00";
    t.fillRect(1, 1, 3, 9);
    t.fillStyle = "#0f0";
    t.fillRect(4, 1, 3, 9);
    t.fillStyle = "#00f";
    t.fillRect(7, 1, 3, 9);
    let r = new Texture(e);
    r.needsUpdate = true;
    r.minFilter = LinearFilter;
    return r;
  }
  initGui() {
    settings.LOOK_DEV_MODE;
  }
  _onTextureLoad(e, t, r) {
    this.textures[e + "_" + t] = r;
    if (t == "arm" || t == "base") {
      let n = this.textures[e + "_arm"];
      let a = this.textures[e + "_base"];
      if (n && a) {
        let l = fboHelper.createRenderTarget(n.image.width, n.image.height, false, false);
        this.textures[e + "_arm"] = this.textures[e + "_base"] = null;
        fboHelper.copy(textureHelper.transparentTexture, l);
        textureHelper.mixChannels(n, l, 0, 1, 2, -1);
        textureHelper.mixChannels(a, l, -1, -1, -1, 0);
        n.dispose();
        a.dispose();
        this.textureUniforms[e + "_armb"].value = l.texture;
      }
    } else {
      this.textureUniforms[e + "_" + t].value = r;
    }
  }
  _onGeometryLoad(e, t, r) {
    let n = new InstancedBufferGeometry();
    for (let p in t.attributes) {
      n.attributes[p] = t.attributes[p];
    }
    let a = e;
    if (e == "helmet_glass" || e == "card") {
      a = "helmet";
    }
    n.index = t.index;
    n.setAttribute("instancePos", this[`instance${r ? "Clone" : ""}PosAttribute`]);
    n.setAttribute("instanceOrient", this[`instance${r ? "Clone" : ""}OrientAttribute`]);
    n.setAttribute("instanceAnimationFrameFromToBlend1", this[`instance${r ? "Clone" : ""}AnimationFrameFromToBlend1Attribute`]);
    n.setAttribute("instanceAnimationFrameFromToBlend2", this[`instance${r ? "Clone" : ""}AnimationFrameFromToBlend2Attribute`]);
    let l;
    if (!r) {
      const p = Object.assign({}, this.whiteTunnelUniforms, this.sharedUniforms);
      p.u_armbTexture = this.textureUniforms[a + "_armb"];
      p.u_norTexture = this.textureUniforms[a + "_nor"];
      l = new ShaderMaterial({
        uniforms: p,
        vertexShader: vert$g,
        fragmentShader: e == "card" ? fragCard : fragWhite,
        side: DoubleSide,
        transparent: true,
        blending: NoBlending
      });
      l.defines.BONE_COUNT = this.BONE_COUNT;
      l.defines.IS_WHITE = true;
      l.name = "whiteTunnelMaterial";
      if (e == "helmet_glass") {
        l.defines.IS_HELMET_GLASS = true;
      }
      if (e == "card") {
        l.uniforms = Object.assign({
          u_cardLedTexture: {
            value: this.textures.led
          },
          u_cardTexture: {
            value: this.textures.card
          },
          u_cardColor: {
            value: new Color("#ddddff")
          },
          u_cardUvOffset: {
            value: new Vector2(0, 0)
          },
          u_cardTextureSize: {
            value: this.cardTextureSize
          },
          u_cardOpacity: {
            value: 1
          }
        }, this.sharedUniforms);
        l.depthTest = false;
        l.depthWrite = false;
        l.blending = CustomBlending;
        l.blendEquation = AddEquation;
        l.blendSrc = OneFactor;
        l.blendDst = OneFactor;
        l.blendEquationAlpha = AddEquation;
        l.blendSrcAlpha = OneFactor;
        l.blendDstAlpha = OneFactor;
      }
    }
    const c = Object.assign({}, this.blackTunnelUniforms, this.sharedUniforms, r ? this.cloneUniforms : {});
    c.u_armbTexture = this.textureUniforms[a + "_armb"];
    c.u_norTexture = this.textureUniforms[a + "_nor"];
    const u = new ShaderMaterial({
      uniforms: c,
      vertexShader: vert$g,
      fragmentShader: fragBlack,
      transparent: true
    });
    if (r) {
      u.blending = CustomBlending;
      u.blendEquation = AddEquation;
      u.blendSrc = OneFactor;
      u.blendDst = OneFactor;
      u.depthTest = false;
      u.side = DoubleSide;
    } else {
      u.blending = NoBlending;
      u.side = DoubleSide;
    }
    u.defines.BONE_COUNT = this.BONE_COUNT;
    u.defines.IS_BLACK = true;
    u.defines.IS_CLONE = r;
    u.name = "blackTunnelMaterial";
    if (l) {
      taskManager.add(l);
    }
    if (u) {
      taskManager.add(u);
    }
    const f = new Mesh(n, this.blackTunnelMaterial);
    if (r) {
      f.renderOrder = 1000;
    } else {
      f.onBeforeRender = this._onBeforeRender.bind(this);
      f.onAfterRender = this._onAfterRender.bind(this);
    }
    f.renderOrder = e == "card" ? 100 : 0;
    f.frustumCulled = false;
    this.container.add(f);
    if (r) {
      f.material = u;
      this.cloneMeshes[e] = f;
    } else {
      this.meshes[e] = f;
      this.materials[e] = {
        white: l,
        black: u
      };
    }
  }
  _onBeforeRender(e, t, r) {
    if (this.container.parent == homePage.preUfxContainer) {
      let n = cameraControls._camera;
      _matrixWorld$1.copy(r.matrixWorld);
      r.matrixWorld.copy(n.matrixWorld);
      _matrixWorldInverse$1.copy(r.matrixWorldInverse);
      r.matrixWorldInverse.copy(n.matrixWorldInverse);
      _projectionMatrix$1.copy(r.projectionMatrix);
      if (this._cameraNeedsSync && (this._cameraNeedsSync = false, _perspectiveCamera.fov = n.fov, _perspectiveCamera.near = n.near, _perspectiveCamera.far = n.far, _perspectiveCamera.filmOffset = n.filmOffset, _perspectiveCamera.coordinateSystem = n.coordinateSystem, _perspectiveCamera.filmGauge = n.filmGauge, _perspectiveCamera.aspect = n.aspect, n.view)) {
        _perspectiveCamera.view = _perspectiveCamera.view || {};
        for (let a in n.view) {
          _perspectiveCamera.view[a] = n.view[a];
        }
        _perspectiveCamera.view.offsetX += this.extraCameraViewportOffsetX;
        _perspectiveCamera.view.offsetY += this.extraCameraViewportOffsetY;
        _perspectiveCamera.updateProjectionMatrix();
      }
      r.projectionMatrix.copy(_perspectiveCamera.projectionMatrix);
    }
  }
  _onAfterRender(e, t, r) {
    if (this.container.parent == homePage.preUfxContainer) {
      r.matrixWorld.copy(_matrixWorld$1);
      r.matrixWorldInverse.copy(_matrixWorldInverse$1);
      r.projectionMatrix.copy(_projectionMatrix$1);
    }
  }
  _onAnimationLoad(e) {
    let t = e.attributes.position.array;
    let r = e.attributes.orient.array;
    let n = t.length / 3;
    this.frameCount = n / this.BONE_COUNT;
    let a = Math.ceil(Math.sqrt(n));
    let l = Math.ceil(n / a);
    let c = a * l;
    let u = new Float32Array(c * 4);
    let f = new Float32Array(c * 4);
    for (let p = 0, g = 0, v = 0; p < n; p++, g += 3, v += 4) {
      u[v + 0] = t[g + 0];
      u[v + 1] = t[g + 1];
      u[v + 2] = t[g + 2];
      u[v + 3] = 1;
      f[v + 0] = r[v + 0];
      f[v + 1] = r[v + 1];
      f[v + 2] = r[v + 2];
      f[v + 3] = r[v + 3];
    }
    this.sharedUniforms.u_animationPositionTexture.value = fboHelper.createDataTexture(u, a, l, true, true);
    this.sharedUniforms.u_animationPositionTexture.value.flipY = false;
    this.sharedUniforms.u_animationOrientTexture.value = fboHelper.createDataTexture(f, a, l, true, true);
    this.sharedUniforms.u_animationOrientTexture.value.flipY = false;
    this.sharedUniforms.u_animationTextureSize.value.set(a, l);
    this.sharedUniforms.u_frameCount.value = this.frameCount;
  }
  init() {
    this.renderTarget = fboHelper.createRenderTarget(1, 1);
    this.interRenderTarget = fboHelper.createRenderTarget(1, 1);
  }
  resize(e, t) {
    if (!this.renderTarget) {
      return;
    }
    let r = 0.5;
    e = Math.ceil(e * r / 2) * 2;
    t = Math.ceil(t * r / 2) * 2;
    e = math.powerTwoFloor(e);
    t = math.powerTwoFloor(t);
    this.renderTarget.setSize(e, t);
    this.interRenderTarget.setSize(e, t);
  }
  updateTransforms(e) {
    const t = this.transformObjectList[0];
    const {
      whiteFrameRatio: r,
      whiteTunnelRatio: n,
      blackTitleRatio: a,
      isBlackTunnelActive: l,
      blackTunnelRatio: c,
      isBlackTitleActive: u,
      isWhiteTunnelActive: f,
      astronautDropRatio: p
    } = goalTunnels;
    for (let g = 0; g < this.TOTAL_COUNT; g++) {
      let v = this.transformObjectList[g];
      v.scale.setScalar(1);
      v.position.set(0, 0, 0);
      v.rotation.set(0, 0, 0);
      if (g === 0) {
        let _ = 100;
        let T;
        let M;
        if (f) {
          T = this.outAnimation.attributes;
          if (n < 1) {
            M = math.fit(n, 0, 1, 0, 79);
          } else {
            M = math.fit(p, 0, 1, 79, 99);
          }
        } else {
          T = this.inAnimation.attributes;
          M = _ * ease.cubicIn(a);
        }
        let S = T.position.array;
        let b = T.orient.array;
        let C = Math.min(Math.floor(M), _ - 1);
        let w = Math.min(Math.ceil(M), _ - 1);
        let R = M - C;
        _p0.fromArray(S, C * 3);
        _p1.fromArray(S, w * 3);
        _p0.lerp(_p1, R);
        v.position.copy(_p0);
        _q0$1.fromArray(b, C * 4);
        _q1$2.fromArray(b, w * 4);
        _q0$1.slerp(_q1$2, R);
        v.rotation.setFromQuaternion(_q0$1);
        v.position.y -= (properties.useMobileLayout ? 0 : 0.4) * ease.backInOut(p);
        v.updateMatrix();
        let E = v.userData.motion;
        E._positionFrequency = 0.2;
        E._rotationFrequency = 0.15;
        E._positionAmplitude = 0;
        E._rotationAmplitude = 0;
        if (l) {
          let I = c;
          E._positionFrequency = 0.2 + I * 0.5;
          E._rotationFrequency = 0.15;
          E._positionAmplitude = I * 5;
          E._rotationAmplitude = I * 60;
        }
        if (f) {
          E._positionFrequency = math.fit(r, 0, 0.45, 0.5, 0.2);
          E._rotationFrequency = math.fit(r, 0, 0.45, 0.4, 0.15);
          E._positionAmplitude = math.fit(r, 0, 0.75, 5, 0);
          E._rotationAmplitude = math.fit(r, 0, 0.75, 15, 0);
        }
        E.update(e);
        v.userData.positionDynamic.update(e, E._position);
        _v0$1.copy(E._euler);
        v.userData.rotationDynamic.update(e, _v0$1);
        _e0.x = v.userData.rotationDynamic.value.x;
        _e0.y = v.userData.rotationDynamic.value.y;
        _e0.z = v.userData.rotationDynamic.value.z;
        v.userData.deltaTimeMultiplier = 1 + Math.min(3.5, v.userData.positionDynamic.valueVel.length() * 0.2 + v.userData.rotationDynamic.valueVel.length() * 0.2);
        _v1$4.set(1, 1, 1);
        E._matrix.compose(v.userData.positionDynamic.value, _q0$1.setFromEuler(_e0), _v1$4);
        _m0.copy(v.matrix);
        _m0.multiply(E._matrix);
        _m0.decompose(_v0$1, _q0$1, _v1$4);
      } else if (u || f) {
        v.scale.setScalar(0);
        v.updateMatrix();
        _m0.copy(v.matrix).decompose(_v0$1, _q0$1, _v1$4);
      } else {
        v.position.copy(t.position);
        v.rotation.copy(t.rotation);
        v.updateMatrix();
        v.userData.motion._positionFrequency = 0.2;
        v.userData.motion._rotationFrequency = 0.6;
        v.userData.motion._positionAmplitude = 12;
        v.userData.motion._rotationAmplitude = 10;
        v.userData.motion.update(e);
        _m0.copy(v.matrix);
        _m0.multiply(v.userData.motion._matrix);
        _m0.decompose(_v0$1, _q0$1, _v1$4);
        _v1$4.fromArray(this.instancePosAttribute.array, 0);
        _q1$2.fromArray(this.instanceOrientAttribute.array, 0);
        let _ = g / (this.CLONES_COUNT - 1);
        let T = math.fit(this.clonesShowRatio, _ * 0.3, 0.7 + _ * 0.3, 1, 0, ease.sineInOut);
        _v0$1.lerp(_v1$4, T);
      }
      if (g === 0) {
        _v0$1.toArray(this.instancePosAttribute.array, 0);
        _q0$1.toArray(this.instanceOrientAttribute.array, 0);
      } else {
        _v0$1.toArray(this.instanceClonePosAttribute.array, (g - 1) * 3);
        _q0$1.toArray(this.instanceCloneOrientAttribute.array, (g - 1) * 4);
      }
    }
    this.instancePosAttribute.needsUpdate = true;
    this.instanceOrientAttribute.needsUpdate = true;
    this.instanceClonePosAttribute.needsUpdate = true;
    this.instanceCloneOrientAttribute.needsUpdate = true;
  }
  updateAnimation(e) {
    const {
      blackTitleRatio: t,
      astronautDropRatio: r,
      whiteFrameOutRatio: n
    } = goalTunnels;
    let a = true;
    let l;
    let c;
    let u;
    let f;
    let p;
    let g = math.fit(r, 0, 0.1, 0, 1) * math.fit(r, 0.9, 1, 1, 0);
    let v = math.fit(n + r, 0.9, 2, 90, 139, ease.quartIn);
    u = Math.floor(v);
    f = Math.ceil(v);
    p = v - u;
    this.sharedUniforms.u_loopLinearBlend.value = g;
    const _ = math.fit(r, 0.9, 1, 0, 1, ease.cubicIn);
    this.isCardActive = _ > 0;
    for (let T = 0; T < this.TOTAL_COUNT; T++) {
      const M = this.transformObjectList[T];
      let S = 1;
      let b = this.materials.card.white.uniforms;
      if (r < 0.5) {
        M.userData.pauseLoopTime = 0;
        S = math.smoothstep(-0.3, 1, t) * 0.75;
        l = 0;
        c = 89;
        b.u_cardOpacity.value = 0;
      } else {
        S = math.fit(r, 0.9, 1, 0, 1);
        l = 140;
        c = 287;
        let k = math.clamp(0.5 + Math.max(0, this.cardNoise.getFbm(properties.time * 8, 3) + 0.5) * 4, 0, 2);
        b.u_cardOpacity.value = k * _;
        if (r < 1) {
          M.userData.pauseLoopTime = Math.max(0, M.userData.pauseLoopTime);
          a = false;
        } else {
          M.userData.pauseLoopTime = 0;
        }
      }
      if (M.userData.pauseLoopTime == 0) {
        M.userData.animationTime += e * S * M.userData.deltaTimeMultiplier;
      }
      if (g == 1) {
        M.userData.animationTime = 0;
      }
      let C = M.userData.timeShift;
      if (T === 0) {
        M.userData.cloneTimeShift = -1;
      } else {
        M.userData.cloneTimeShift += e * 0.2;
        M.userData.cloneTimeShift %= 1;
        C = math.mix(0, C, this.clonesShowRatio);
      }
      let w = C + M.userData.animationTime;
      let R = c - l + 1;
      let E = w * 60 % R;
      let I = Math.floor(E);
      let F = (I + 1) % R + l;
      I += l;
      if (F < I) {
        if (!a) {
          F = I = l;
          M.userData.animationTime = -C;
          M.userData.pauseLoopTime = Infinity;
        }
      }
      if (T === 0) {
        this.instanceAnimationFrameFromToBlend1Attribute.array[0] = I;
        this.instanceAnimationFrameFromToBlend1Attribute.array[1] = F;
        this.instanceAnimationFrameFromToBlend1Attribute.array[2] = E % 1;
        this.instanceAnimationFrameFromToBlend2Attribute.array[0] = u;
        this.instanceAnimationFrameFromToBlend2Attribute.array[1] = f;
        this.instanceAnimationFrameFromToBlend2Attribute.array[2] = p;
      } else {
        this.instanceCloneAnimationFrameFromToBlend1Attribute.array[(T - 1) * 3 + 0] = I;
        this.instanceCloneAnimationFrameFromToBlend1Attribute.array[(T - 1) * 3 + 1] = F;
        this.instanceCloneAnimationFrameFromToBlend1Attribute.array[(T - 1) * 3 + 2] = E % 1;
        this.instanceCloneAnimationFrameFromToBlend2Attribute.array[(T - 1) * 3 + 0] = u;
        this.instanceCloneAnimationFrameFromToBlend2Attribute.array[(T - 1) * 3 + 1] = f;
        this.instanceCloneAnimationFrameFromToBlend2Attribute.array[(T - 1) * 3 + 2] = p;
      }
    }
    this.instanceAnimationFrameFromToBlend1Attribute.needsUpdate = true;
    this.instanceAnimationFrameFromToBlend2Attribute.needsUpdate = true;
    this.instanceCloneAnimationFrameFromToBlend1Attribute.needsUpdate = true;
    this.instanceCloneAnimationFrameFromToBlend2Attribute.needsUpdate = true;
  }
  updateCard(e) {
    this.cardTime = this.isCardActive ? this.cardTime + e : 0;
    const t = this.cardTextureSize.x;
    const r = this.cardTextureSize.y;
    const n = Math.floor(this.cardTime * 10 % (t * (r + 1)));
    const a = n / (t * (r + 1));
    const l = math.linearStep(0, 0.15, a) * math.linearStep(1, 0.9, a);
    this.whiteTunnelUniforms.u_faceLedLight.value = l;
    this.materials.card.white.uniforms.u_cardUvOffset.value.set(n % t / t, (r - Math.floor(n / t)) / r);
  }
  update(e) {
    const {
      blackFrameInRatio: t,
      whiteFrameBreakRatio: r,
      whiteTunnelRatio: n,
      whiteFrameRatio: a,
      blackTunnelRatio: l,
      whiteTunnelAstronautRatio: c,
      isBlackTunnelActive: u,
      isWhiteTunnelActive: f,
      astronautDropRatio: p,
      blackTitleRatio: g
    } = goalTunnels;
    if (u) {
      fboHelper.copy(goalBlackTunnel.feedbackRenderTarget.texture, this.renderTarget);
      blur.blur(16, 0.5, this.renderTarget, this.interRenderTarget);
      blur.blur(4, 0.5, this.renderTarget, this.interRenderTarget);
    }
    this.showRatio = f ? math.smoothstep(0, 0.15, c) : 1;
    this.clonesShowRatio = math.smoothstep(0.2, 0.4, l);
    this.partIdList.forEach(v => {
      this.meshes[v].material = this.materials[v][f ? "white" : "black"];
      if (this.cloneMeshes[v]) {
        this.cloneMeshes[v].visible = !f && this.clonesShowRatio > 0;
      }
    });
    this.meshes.card.visible = p >= 0.95;
    this.sharedUniforms.u_bgColor.value.copy(properties.bgColor);
    this.sharedUniforms.u_showRatio.value = this.showRatio;
    this.blackTunnelUniforms.u_frameIn.value = t;
    this.blackTunnelUniforms.u_sunFactor.value = u ? 1 - math.smoothstep(0.1, 0.2, l) : 1;
    this.blackTunnelUniforms.u_blackTunnelTexture.value = this.renderTarget.texture;
    this.blackTunnelUniforms.u_blackTunnelRatio.value = u ? math.smoothstep(0.1, 0.3, l) : 0;
    this.blackTunnelUniforms.u_endRatio.value = u ? math.smoothstep(0.65, 0.9, l) : 0;
    this.whiteTunnelUniforms.u_frameOutRatio.value = r;
    this.whiteTunnelUniforms.u_whiteTunnelRatio.value = n;
    this.whiteTunnelUniforms.u_tintColor.value.setStyle("#2533c2").multiplyScalar(math.fit(p, 1, 0, 0.2, 1) * (r > 0 ? 1 : 0));
    this.cloneUniforms.u_alpha.value = this.clonesShowRatio;
    this.updateTransforms(e);
    this.updateAnimation(e);
    this.updateCard(e);
    this._cameraNeedsSync = true;
    this.whiteTunnelUniforms.u_cardPosition.value.copy(this.transformObjectList[0].position);
    this.whiteTunnelUniforms.u_cardPosition.value.y += 0.9;
  }
}
const goalTunnelAstronauts = new GoalTunnelAstronauts();