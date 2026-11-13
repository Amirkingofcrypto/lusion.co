/**
 * ============================================================================
 * Lusion Modular Component: 05-home-balloons
 * File: src/components/home/HomeBalloons.js
 * Description: HomeBalloonsBackground, HomeBalloonsBody, HomeBalloonsPhysics, HomeBalloons (3D Crosses Hero Scene) & Visuals
 * Original Engine Lines: 29212 - 29905
 * ============================================================================
 */
class HomeBalloonsBackground {
  container = new Object3D();
  mesh = null;
  activeRatio = 0;
  clipOffset = new Vector2();
  clipScale = new Vector2(1, 1);
  constructor() {}
  preInit() {}
  init() {
    let e = new BufferGeometry();
    e.setAttribute("position", new BufferAttribute(new Float32Array([0.5, -0.5, 0, 0.5, 0.5, 0, -0.5, 0.5, 0, -1, 1, 0, 1, 1, 0, 1, -1, 0, -1, -1, 0, -0.5, -0.5, 0, 1, -1, 1, -1, -1, 1, 1, 1, 1, -1, 1, 1]), 3));
    e.setIndex(new BufferAttribute(new Uint16Array([3, 2, 7, 8, 9, 11, 11, 10, 8, 0, 5, 7, 0, 1, 5, 1, 4, 5, 1, 2, 4, 2, 3, 4, 5, 6, 7, 6, 3, 7]), 1));
    this.mesh = new Mesh(e, new ShaderMaterial({
      uniforms: Object.assign({
        u_color0: {
          value: new Color("#141515")
        },
        u_color1: {
          value: new Color("#141515")
        },
        u_colorPaint: {
          value: new Color("#1a2ffb")
        },
        u_aspect: {
          value: 1
        },
        u_smooth: {
          value: new Vector2(0, 1)
        },
        u_clipScale: {
          value: this.clipScale
        },
        u_clipOffset: {
          value: this.clipOffset
        },
        u_time: {
          value: 0
        },
        u_activeRatio: {
          value: 0
        },
        u_resolution: {
          value: new Vector2()
        },
        u_screenPaintTexture: screenPaint.sharedUniforms.u_currPaintTexture
      }, blueNoise.sharedUniforms),
      vertexShader: vert$k,
      fragmentShader: frag$o,
      side: BackSide
    }));
    this.mesh.material.defines.NEIGHBOUR_COUNT = homeBalloons.NEIGHBOUR_COUNT + 1;
    this.mesh.frustumCulled = false;
    this.mesh.renderOrder = -1000;
    this.container.add(this.mesh);
  }
  resize(e, t) {}
  update(e) {
    if (this.mesh) {
      this.mesh.material.uniforms.u_activeRatio.value = this.activeRatio;
      this.mesh.material.uniforms.u_time.value += e * 0.2;
      this.mesh.material.uniforms.u_aspect.value = properties.width / properties.height;
      this.mesh.material.uniforms.u_resolution.value.copy(properties.sharedUniforms.u_resolution.value);
      this.mesh.material.uniforms.u_color0.value.set(COLORS$1[properties.balloonsColorIndex]);
    }
  }
}
const homeBalloonsBackground = new HomeBalloonsBackground();