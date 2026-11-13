/**
 * ============================================================================
 * Lusion Modular Configuration
 * File: src/config/lusion.config.js
 * ============================================================================
 */
window.LUSION_CONFIG = {
  hero: {
    show3DShapes: false,
    enablePhysics: true
  },
  heroBanner: {
    enabled: true,
    image: "/amir/assets/images/hero-banner.jpg",
    eyebrow: "PORTFOLIO // CREATIVE DEVELOPER",
    prefix: "I craft ",
    phrases: [
      "interactive 3D web experiences.",
      "immersive brand storytelling.",
      "high-craft digital products.",
      "motion-driven interfaces.",
      "memorable web worlds."
    ],
    tags: ["3D & WebGL", "Motion Design", "Creative Dev"],
    typingSpeedMs: 52,
    deletingSpeedMs: 28,
    pauseMs: 1800
  },
  sections: {
    hero: true,
    reel: true,
    featured: true,
    goalTunnel: true,
    endSection: true,
    footer: true
  }
};

window.setHeroShapes = function (visible) {
  window.LUSION_CONFIG.hero.show3DShapes = !!visible;
  if (typeof homeBalloons !== "undefined" && homeBalloons.balloonList) {
    for (let i = 0; i < homeBalloons.balloonList.length; i++) {
      const b = homeBalloons.balloonList[i];
      if (b.mesh) b.mesh.visible = !!visible;
      if (b.meshBack) b.meshBack.visible = !!visible;
      if (homeBalloons.prePassMeshList && homeBalloons.prePassMeshList[i]) {
        homeBalloons.prePassMeshList[i].visible = !!visible;
      }
    }
  }
};
