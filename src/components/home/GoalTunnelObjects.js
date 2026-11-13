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
const blockVert = `#define GLSLIFY 1
attribute float a_instanceId;uniform float u_time;uniform float u_ratio;uniform float u_ratioInverse;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;vec3 deform(in vec3 pos){float origZ=pos.z;float blockCount=float(BLOCK_COUNT);float ratio=mix(.1,1.,u_ratioInverse);float lengthRatio=-pos.z/blockCount;float scalar=mix(0.25,ratio,lengthRatio);pos.x*=1.0+scalar*0.5*sin(lengthRatio*6.283184);pos.y*=1.0+scalar*0.5*cos(lengthRatio*6.283184+3.1415926);float angleRatio=smoothstep(0.25,1.,u_ratioInverse);float angle=(angleRatio+angleRatio*lengthRatio*lengthRatio*1.)*-6.283184;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);pos.xy=m*pos.xy;pos.y+=ratio*sin(ratio*lengthRatio*3.141592*4.)*0.25;pos.z-=(cos(ratio*1.5+(1.0-ratio)*lengthRatio*3.141592*0.5)*0.5+0.5-1.0)*blockCount;pos.z*=1.0+16.0*(ratio*lengthRatio*lengthRatio)+2.0*ratio*(sin(8.0*lengthRatio)*0.5+0.5);pos.z*=(1.-ratio*ratio*ratio)*0.9+0.1;pos.z+=blockCount/4.;return pos*15.;}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){float blockCount=float(BLOCK_COUNT);vec3 pos=position;pos.z-=a_instanceId;pos.z/=blockCount;float lengthRatio=-pos.z;pos.z*=blockCount;v_localPosition=pos;v_lengthRatio=lengthRatio;vec3 nor=deform(pos+normal*0.01);pos=deform(pos);nor=normalize(nor-pos);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;v_fog=-0.005*mvPosition.z/mvPosition.w;gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;}`;
const blockFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_ratioInverse;uniform vec3 u_fbm;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;uniform float u_time;float sphOcclusion(in vec3 pos,in vec3 nor,in vec4 sph){vec3 di=sph.xyz-pos;float l=length(di);float nl=dot(nor,di/l);float h=l/sph.w;float h2=h*h;float k2=1.0-h2*nl*nl;return max(0.0,nl)/h2;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 voronoi(const in vec4 x){vec4 p=floor(x);vec4 f=fract(x);float id=0.0;vec2 res=vec2(100.0);for(int l=-1;l<=1;l++){for(int k=-1;k<=1;k++){for(int j=-1;j<=1;j++){for(int i=-1;i<=1;i++){vec4 b=vec4(float(i),float(j),float(k),float(l));vec4 r=vec4(b)-f+hash(p+b);float d=dot(r,r);float cond=max(sign(res.x-d),0.0);float nCond=1.0-cond;float cond2=nCond*max(sign(res.y-d),0.0);float nCond2=1.0-cond2;id=(dot(p+b,vec4(1.0,57.0,113.0,421.))*cond)+(id*nCond);res=vec2(d,res.x)*cond+res*nCond;res.y=cond2*d+nCond2*res.y;}}}}return vec3(sqrt(res),abs(id));}vec4 hash(float p){vec4 p4=fract(vec4(p)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 sph=vec4(u_fbm.x*2.,u_fbm.y*2.+1.,0.,2.5);vec3 worldNormal=normalize(v_worldNormal);float ao=1.-sphOcclusion(v_worldPosition,worldNormal,sph)*2.*smoothstep(0.8,0.5,u_ratioInverse);float shade=texture2D(u_texture,v_uv).r;float brightness=pow(v_lengthRatio,5.);float t=u_ratioInverse*-2.+u_time*0.2;vec3 vn=voronoi(vec4(v_localPosition*2.+vec3(0.,0.,-t*0.5),t*0.25));vec4 rnd=hash(vn.z);float threshold=0.05+rnd.x*0.1;float r=abs(vn.x-.5)*(1.75+rnd.y*0.5);float pattern=max(0.,1.-smoothstep(threshold-fwidth(r),threshold,r));vec3 color=mix(vec3(0.102,0.184,0.984),vec3(1.),pattern);color*=(.35+shade)*ao;color+=brightness;gl_FragColor=vec4(color,shade+brightness);gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(1.0),smoothstep(0.8,1.0,u_ratioInverse)*0.5);gl_FragColor.a*=ao*mix(1.,0.15,pattern);gl_FragColor+=linearStep(-10.,-11.,v_localPosition.z);}`;
class GoalWhiteTunnel {
  container = new Object3D();
  baseMesh;
  wallMesh;
  BLOCK_COUNT = 16;
  TEXTURE_SIZE = 1024;
  prevRatio = 0;
  pt0 = new Vector3();
  pt1 = new Vector3();
  pt2 = new Vector3();
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_ratioInverse: {
      value: 0
    },
    u_fbm: {
      value: null
    }
  };
  preInit() {
    this.fbm = new BrownianMotion();
    this.fbm._positionAmplitude = 2;
    this.fbm._positionFrequency = 1;
    this.sharedUniforms.u_fbm.value = this.fbm._position;
    this.sharedUniforms.u_texture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/white_block.webp", {
      type: "texture"
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/tunnel_block_base.buf", {
      onLoad: t => this._onTunnelBlockLoad(t, false)
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/tunnel_block_wall.buf", {
      onLoad: t => this._onTunnelBlockLoad(t, true)
    });
    let e = new Mesh(new SphereGeometry(7.5, 32, 24), new MeshNormalMaterial());
    e.position.z = 0;
  }
  _onTunnelBlockLoad(e, t) {
    let r = new InstancedBufferGeometry();
    for (let c in e.attributes) {
      r.setAttribute(c, e.attributes[c]);
    }
    r.setIndex(e.index);
    let n = new Float32Array(this.BLOCK_COUNT);
    for (let c = 0; c < this.BLOCK_COUNT; c++) {
      n[c] = c;
    }
    r.setAttribute("a_instanceId", new InstancedBufferAttribute(n, 1));
    let a = {
      u_ratio: goalTunnels.sharedUniforms.u_whiteTunnelRatio,
      u_texture: this.sharedUniforms.u_texture,
      u_ratioInverse: this.sharedUniforms.u_ratioInverse,
      u_fbm: this.sharedUniforms.u_fbm,
      u_time: goalTunnels.sharedUniforms.u_tunnelTime
    };
    let l = new Mesh(r, new ShaderMaterial({
      uniforms: a,
      vertexShader: blockVert,
      fragmentShader: blockFrag,
      extensions: {
        derivatives: true
      }
    }));
    l.material.defines.BLOCK_COUNT = this.BLOCK_COUNT;
    l.frustumCulled = false;
    if (t) {
      this.wallMesh = l;
      l.material.defines.IS_WALL = true;
    } else {
      this.baseMesh = l;
    }
    this.container.add(l);
  }
  init() {}
  resize(e, t) {}
  update(e) {
    this.sharedUniforms.u_ratioInverse.value = 1 - goalTunnels.whiteTunnelRatio;
    goalTunnels.properties.cameraDollyZoomFovOffset = math.fit(goalTunnels.whiteTunnelRatio, 0, 1, 60, 0);
    let t = goalTunnels.whiteTunnelRatio - this.prevRatio;
    goalTunnelEfx.offsetPostion.z = math.clamp(-t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.9, 500, 0, ease.sineOut), -1, 1);
    goalTunnelEfx.offsetRotation.z = math.clamp(-t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.8, 45, 0, ease.sineOut), -1, 1);
    this.fbm.update(e);
    goalTunnelEfx.amount = math.fit(goalTunnels.whiteTunnelRatio, 0.75, 1, 1, 0);
    this.prevRatio = goalTunnels.whiteTunnelRatio;
  }
}
const goalWhiteTunnel = new GoalWhiteTunnel();
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
const validateEmail = o => o.match(/^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
var toQuerystring_min = {
  exports: {}
};
(function (o, e) {
  (function (t, r) {
    o.exports = r();
  })(commonjsGlobal$1, function () {
    return (() => {
      var t = {
        d: (p, g) => {
          for (var v in g) {
            if (t.o(g, v) && !t.o(p, v)) {
              Object.defineProperty(p, v, {
                enumerable: true,
                get: g[v]
              });
            }
          }
        },
        o: (p, g) => Object.prototype.hasOwnProperty.call(p, g),
        r: p => {
          if (typeof Symbol !== "undefined" && Symbol.toStringTag) {
            Object.defineProperty(p, Symbol.toStringTag, {
              value: "Module"
            });
          }
          Object.defineProperty(p, "__esModule", {
            value: true
          });
        }
      };
      var r = {};
      function n(p) {
        n = typeof Symbol == "function" && typeof Symbol.iterator == "symbol" ? function (g) {
          return typeof g;
        } : function (g) {
          if (g && typeof Symbol == "function" && g.constructor === Symbol && g !== Symbol.prototype) {
            return "symbol";
          } else {
            return typeof g;
          }
        };
        return n(p);
      }
      t.r(r);
      t.d(r, {
        default: () => f
      });
      var a = encodeURIComponent;
      function l(p, g, v, _, T) {
        var M = _ && T.arrayPrefix || "";
        if (n(g) === "object") {
          var S = `${p}${M}${v && "]"}[`;
          return `${u(g, `${v}${S}`, T)}`;
        }
        if (v && v.length) {
          return `${v}${p}]${M}=${a(g)}`;
        } else {
          return `${p}${M}=${a(g)}`;
        }
      }
      function c(p, g, v, _) {
        return g.map(function (T) {
          return l(p, T, v, true, _);
        }).join("&");
      }
      function u(p, g = "", v = {}) {
        return (Array.isArray(p) ? p.map(function (_, T) {
          return l(`${T}`, _, g, true, v);
        }) : Object.keys(p).filter(function (_) {
          return p[_] !== undefined;
        }).map(function (_) {
          if (p[_] && Array.isArray(p[_])) {
            return c(`${_}`, p[_], g, v);
          } else {
            return l(_, p[_], g, false, v);
          }
        })).join("&").replace(/%20/g, "+");
      }
      const f = u;
      return r;
    })();
  });
})(toQuerystring_min);
var toQuerystring_minExports = toQuerystring_min.exports;
const toQueryString = getDefaultExportFromCjs(toQuerystring_minExports);
var browser = {
  exports: {}
};
var debug$1 = {
  exports: {}
};
var s = 1000;
var m = s * 60;
var h = m * 60;
var d = h * 24;
var y = d * 365.25;
function ms(o, e) {
  e = e || {};
  var t = typeof o;
  if (t === "string" && o.length > 0) {
    return parse(o);
  }
  if (t === "number" && isNaN(o) === false) {
    if (e.long) {
      return fmtLong(o);
    } else {
      return fmtShort(o);
    }
  }
  throw new Error("val is not a non-empty string or a valid number. val=" + JSON.stringify(o));
}
function parse(o) {
  o = String(o);
  if (!(o.length > 100)) {
    var e = /^((?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|years?|yrs?|y)?$/i.exec(o);
    if (e) {
      var t = parseFloat(e[1]);
      var r = (e[2] || "ms").toLowerCase();
      switch (r) {
        case "years":
        case "year":
        case "yrs":
        case "yr":
        case "y":
          return t * y;
        case "days":
        case "day":
        case "d":
          return t * d;
        case "hours":
        case "hour":
        case "hrs":
        case "hr":
        case "h":
          return t * h;
        case "minutes":
        case "minute":
        case "mins":
        case "min":
        case "m":
          return t * m;
        case "seconds":
        case "second":
        case "secs":
        case "sec":
        case "s":
          return t * s;
        case "milliseconds":
        case "millisecond":
        case "msecs":
        case "msec":
        case "ms":
          return t;
        default:
          return;
      }
    }
  }
}
function fmtShort(o) {
  if (o >= d) {
    return Math.round(o / d) + "d";
  } else if (o >= h) {
    return Math.round(o / h) + "h";
  } else if (o >= m) {
    return Math.round(o / m) + "m";
  } else if (o >= s) {
    return Math.round(o / s) + "s";
  } else {
    return o + "ms";
  }
}
function fmtLong(o) {
  return plural(o, d, "day") || plural(o, h, "hour") || plural(o, m, "minute") || plural(o, s, "second") || o + " ms";
}
function plural(o, e, t) {
  if (!(o < e)) {
    if (o < e * 1.5) {
      return Math.floor(o / e) + " " + t;
    } else {
      return Math.ceil(o / e) + " " + t + "s";
    }
  }
}
(function (o, e) {
  e = o.exports = n.debug = n.default = n;
  e.coerce = u;
  e.disable = l;
  e.enable = a;
  e.enabled = c;
  e.humanize = ms;
  e.names = [];
  e.skips = [];
  e.formatters = {};
  var t;
  function r(f) {
    var p = 0;
    var g;
    for (g in f) {
      p = (p << 5) - p + f.charCodeAt(g);
      p |= 0;
    }
    return e.colors[Math.abs(p) % e.colors.length];
  }
  function n(f) {
    function p() {
      if (p.enabled) {
        var g = p;
        var v = +new Date();
        var _ = v - (t || v);
        g.diff = _;
        g.prev = t;
        g.curr = v;
        t = v;
        for (var T = new Array(arguments.length), M = 0; M < T.length; M++) {
          T[M] = arguments[M];
        }
        T[0] = e.coerce(T[0]);
        if (typeof T[0] != "string") {
          T.unshift("%O");
        }
        var S = 0;
        T[0] = T[0].replace(/%([a-zA-Z%])/g, function (C, w) {
          if (C === "%%") {
            return C;
          }
          S++;
          var R = e.formatters[w];
          if (typeof R == "function") {
            var E = T[S];
            C = R.call(g, E);
            T.splice(S, 1);
            S--;
          }
          return C;
        });
        e.formatArgs.call(g, T);
        var b = p.log || e.log || console.log.bind(console);
        b.apply(g, T);
      }
    }
    p.namespace = f;
    p.enabled = e.enabled(f);
    p.useColors = e.useColors();
    p.color = r(f);
    if (typeof e.init == "function") {
      e.init(p);
    }
    return p;
  }
  function a(f) {
    e.save(f);
    e.names = [];
    e.skips = [];
    var p = (typeof f == "string" ? f : "").split(/[\s,]+/);
    for (var g = p.length, v = 0; v < g; v++) {
      if (p[v]) {
        f = p[v].replace(/\*/g, ".*?");
        if (f[0] === "-") {
          e.skips.push(new RegExp("^" + f.substr(1) + "$"));
        } else {
          e.names.push(new RegExp("^" + f + "$"));
        }
      }
    }
  }
  function l() {
    e.enable("");
  }
  function c(f) {
    var p;
    var g;
    p = 0;
    g = e.skips.length;
    for (; p < g; p++) {
      if (e.skips[p].test(f)) {
        return false;
      }
    }
    p = 0;
    g = e.names.length;
    for (; p < g; p++) {
      if (e.names[p].test(f)) {
        return true;
      }
    }
    return false;
  }
  function u(f) {
    if (f instanceof Error) {
      return f.stack || f.message;
    } else {
      return f;
    }
  }
})(debug$1, debug$1.exports);
var debugExports = debug$1.exports;
(function (o, e) {
  var t = {};
  e = o.exports = debugExports;
  e.log = a;
  e.formatArgs = n;
  e.save = l;
  e.load = c;
  e.useColors = r;
  e.storage = typeof chrome !== "undefined" && typeof chrome.storage !== "undefined" ? chrome.storage.local : u();
  e.colors = ["lightseagreen", "forestgreen", "goldenrod", "dodgerblue", "darkorchid", "crimson"];
  function r() {
    if (typeof window !== "undefined" && window.process && window.process.type === "renderer") {
      return true;
    } else {
      return typeof document !== "undefined" && document.documentElement && document.documentElement.style && document.documentElement.style.WebkitAppearance || typeof window !== "undefined" && window.console && (window.console.firebug || window.console.exception && window.console.table) || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/) && parseInt(RegExp.$1, 10) >= 31 || typeof navigator !== "undefined" && navigator.userAgent && navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/);
    }
  }
  e.formatters.j = function (f) {
    try {
      return JSON.stringify(f);
    } catch (p) {
      return "[UnexpectedJSONParseError]: " + p.message;
    }
  };
  function n(f) {
    var p = this.useColors;
    f[0] = (p ? "%c" : "") + this.namespace + (p ? " %c" : " ") + f[0] + (p ? "%c " : " ") + "+" + e.humanize(this.diff);
    if (p) {
      var g = "color: " + this.color;
      f.splice(1, 0, g, "color: inherit");
      var v = 0;
      var _ = 0;
      f[0].replace(/%[a-zA-Z%]/g, function (T) {
        if (T !== "%%") {
          v++;
          if (T === "%c") {
            _ = v;
          }
        }
      });
      f.splice(_, 0, g);
    }
  }
  function a() {
    return typeof console == "object" && console.log && Function.prototype.apply.call(console.log, console, arguments);
  }
  function l(f) {
    try {
      if (f == null) {
        e.storage.removeItem("debug");
      } else {
        e.storage.debug = f;
      }
    } catch {}
  }
  function c() {
    var f;
    try {
      f = e.storage.debug;
    } catch {}
    if (!f && typeof process !== "undefined" && "env" in process) {
      f = t.DEBUG;
    }
    return f;
  }
  e.enable(c());
  function u() {
    try {
      return window.localStorage;
    } catch {}
  }
})(browser, browser.exports);
var browserExports = browser.exports;
var debug = browserExports("jsonp");
var jsonp_1 = jsonp;
var count = 0;
function noop() {}
function jsonp(o, e, t) {
  if (typeof e == "function") {
    t = e;
    e = {};
  }
  e ||= {};
  var r = e.prefix || "__jp";
  var n = e.name || r + count++;
  var a = e.param || "callback";
  var l = e.timeout ?? 60000;
  var c = encodeURIComponent;
  var u = document.getElementsByTagName("script")[0] || document.head;
  var f;
  var p;
  if (l) {
    p = setTimeout(function () {
      g();
      if (t) {
        t(new Error("Timeout"));
      }
    }, l);
  }
  function g() {
    if (f.parentNode) {
      f.parentNode.removeChild(f);
    }
    window[n] = noop;
    if (p) {
      clearTimeout(p);
    }
  }
  function v() {
    if (window[n]) {
      g();
    }
  }
  window[n] = function (_) {
    debug("jsonp got", _);
    g();
    if (t) {
      t(null, _);
    }
  };
  o += (~o.indexOf("?") ? "&" : "?") + a + "=" + c(n);
  o = o.replace("?&", "?");
  debug("jsonp req \"%s\"", o);
  f = document.createElement("script");
  f.src = o;
  u.parentNode.insertBefore(f, u);
  return v;
}
const jsonp$1 = getDefaultExportFromCjs(jsonp_1);
const MAILCHIMP_URL = "https://lusion.us20.list-manage.com/subscribe/post?u=ea813c53ac6d7a0b76f2e36a1&amp;id=44b41b41bf&amp;v_id=4233&amp;f_id=001e18e7f0";
const getAjaxUrl = o => o.replace("/post?", "/post-json?");
