/**
 * ============================================================================
 * Lusion Modular Configuration (lusion.config.js)
 * ============================================================================
 * Controls 3D scene elements, hero shapes, and modular sections without
 * altering the authentic Lusion WebGL engine.
 */
window.LusionConfig = window.LusionConfig || {
  hero: {
    // Set to false to remove/hide the 3D cross shapes inside the Hero scene
    show3DShapes: true,
    enablePhysics: true
  },
  sections: {
    hero: true,
    reel: true,
    featured: true,
    goalTunnel: true,
    endSection: true,
    footer: true
  },
  setHeroShapes(visible) {
    this.hero.show3DShapes = Boolean(visible);
    if (window.LusionModules && window.LusionModules.home && window.LusionModules.home.balloons) {
      const b = window.LusionModules.home.balloons;
      const show = Boolean(visible);
      for (let i = 0; i < b.balloonList.length; i++) {
        if (b.balloonList[i].mesh) b.balloonList[i].mesh.visible = show;
        if (b.balloonList[i].meshBack) b.balloonList[i].meshBack.visible = show;
      }
      for (let i = 0; i < b.prePassMeshList.length; i++) {
        if (b.prePassMeshList[i]) b.prePassMeshList[i].visible = show;
      }
    }
  }
};
