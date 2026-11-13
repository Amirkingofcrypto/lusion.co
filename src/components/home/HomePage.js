/**
 * ============================================================================
 * Lusion Modular Component: 19-home-page
 * File: src/components/home/HomePage.js
 * Description: HomePageAudios & HomePage Component
 * Original Engine Lines: 40335 - 40507
 * ============================================================================
 */
class HomePageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1, 0);
      if (!this.hasInit) {
        this.domHomeReelCta = document.getElementById("home-reel-cta");
        this.domHomeReelVideoWatchBtn = document.getElementById("home-reel-video-watch-btn");
        this.domHomeFeaturedCta = document.getElementById("home-featured-cta");
        this.domVideoOverlayPlayBtn = document.getElementById("video-overlay__play-btn");
        this.domVideoOverlayMuteBtn = document.getElementById("video-overlay__mute-btn");
        this.domProjectItems = Array.from(document.querySelectorAll("#home .project-item"));
        audios.addHoverClickEvents(this.domHomeReelCta);
        audios.addHoverClickEvents(this.domHomeReelVideoWatchBtn);
        audios.addHoverClickEvents(this.domHomeFeaturedCta);
        audios.addHoverClickEvents(this.domVideoOverlayPlayBtn);
        audios.addHoverClickEvents(this.domVideoOverlayMuteBtn);
        this.domProjectItems.forEach(e => audios.addHoverClickEvents(e));
        this.hasInit = true;
      }
    }
  }
  update() {
    if (!settings.USE_AUDIO) {
      return;
    }
    const {
      astronautDropRatio: e,
      blackFrameInRatio: t,
      blackTunnelRatio: r,
      whiteTunnelRatio: n
    } = goalTunnels;
    if (t > 0.5 && r === 0) {
      _brokenGlassStep = 0;
      audios.fadeBgMusic("cinematic_2", 0.5);
      audios.items.cinematic_2.setFilterFrequencyViaRatio(0);
      _brokenGlassStep = 0;
    } else if (r > 0 && n === 0) {
      audios.fadeBgMusic("cinematic_3", 0.5);
      _brokenGlassStep = 0;
      audios.items.cinematic_3.setFilterFrequencyViaRatio(math.fit(goalTunnels.freezeRatio, 0.25, 1, 0, 0.5));
    } else if (n > 0 && e === 0) {
      audios.fadeBgMusic("cinematic_2", 0.5);
      audios.items.cinematic_2.setFilterFrequencyViaRatio(1);
    } else if (n > 0 && e <= 0.8) {
      audios.fadeBgMusic("cinematic_2", 0.5);
      audios.items.cinematic_2.setFilterFrequencyViaRatio(0);
    } else if (n > 0 && e > 0.8) {
      audios.fadeBgMusic("generic_end", 1);
    } else {
      _brokenGlassStep = 0;
      audios.fadeBgMusic("generic", 1);
    }
    if (e === 0) {
      _brokenGlassStep = 1;
    } else {
      if (_brokenGlassStep == 1) {
        audios.items.glass_broken.play();
      }
      _brokenGlassStep = 2;
    }
  }
}
const homePageAudios = new HomePageAudios();
class HomePage extends Page {
  path = "";
  id = "home";
  hasEndVisual = false;
  updateAudio = false;
  endSectionActiveThreshold = 2.5;
  preInit() {
    let e = this.domContainer;
    homeHeroSection.preInit(e);
    homeReelSection.preInit(e);
    homeFeaturedSection.preInit(e);
    homeGoalSection.preInit(e);
  }
  init() {
    homeHeroSection.init();
    homeReelSection.init();
    homeFeaturedSection.init();
    homeGoalSection.init();
    super.init();
  }
  hasProject(e) {
    return homeFeaturedSection.projectItemList.hasProject(e);
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    this.updateAudio = true;
    homeFeaturedSection.projectItemList.selectedId = null;
    let n = e.pathNodes[1];
    if (e.target === projectPage && this.hasProject(n) && this.isFirstShown) {
      this.useGenericTransition = false;
      this.showDuration = 1.5;
      scrollManager.scrollToPixel(homeFeaturedSection.projectItemList.getProjectItemTop(n) - properties.viewportHeight * 0.25, true);
      homeFeaturedSection.projectItemList.selectedId = n;
    } else {
      this.showDuration = 1;
    }
    homeHeroSection.initEvent();
    homePageAudios.init();
    super.show(e, t, r);
  }
  hide(e, t, r) {
    this.updateAudio = false;
    this.useGenericTransition = true;
    homeFeaturedSection.projectItemList.selectedId = null;
    if (t.target === projectPage && this.hasProject(t.pathNodes[1])) {
      this.useGenericTransition = false;
      this.hideDuration = 1.5;
      homeFeaturedSection.projectItemList.selectedId = t.pathNodes[1];
    } else {
      this.hideDuration = 1;
    }
    homeHeroSection.hide();
    super.hide(e, t, r);
  }
  resize(e, t) {
    homeHeroSection.resize(e, t);
    homeReelSection.resize(e, t);
    homeFeaturedSection.resize(e, t);
    homeGoalSection.resize(e, t);
  }
  update(e) {
    if (this.hasInitialized) {
      super.update(e);
      homeHeroSection.update(e);
      homeReelSection.update(e);
      homeFeaturedSection.update(e);
      homeGoalSection.update(e);
      if (pagesManager.scrollTargetPage == this) {
        let t = true;
        let r = false;
        let n = false;
        if (scrollManager.getDomRange(homeGoalSection.domContainer).screenRatio == 1) {
          properties.bgColor.setStyle(properties.blackColorHex);
          t = false;
          r = true;
        } else {
          properties.bgColor.setStyle(properties.offWhiteColorHex);
          t = true;
          r = false;
        }
        if (homeGoalSection.uiBgColorNeedsOverride) {
          n = false;
          if (homeGoalSection.isUIBgBlack) {
            t = false;
            r = true;
          } else {
            t = true;
            r = false;
          }
        }
        if (footerSection.getDomRange().ratio > -0.1) {
          t = true;
          r = false;
          n = false;
        }
        document.documentElement.classList.toggle("is-black-bg", r);
        document.documentElement.classList.toggle("is-white-bg", t);
        document.documentElement.classList.toggle("is-blue-bg", n);
      }
      if (this.updateAudio) {
        homePageAudios.update(e);
      }
    }
  }
}
const homePage = new HomePage();
const getLightUvShader = `#define GLSLIFY 1
uniform vec2 u_lightShadowTextureTexelSize;vec2 getLightUv(vec3 lightToWorld){float flatYScale=1.5;vec2 flatUv=normalize(lightToWorld*vec3(1.,flatYScale,1.)).xz;vec2 dir=abs(normalize(flatUv));flatUv=(flatUv*(dir.y>dir.x ? 1./dir.y : 1./dir.x)*0.5+0.5)*vec2(1.,0.5);float isTop=lightToWorld.y>0.0 ? 1.0 : 0.0;float halfTexelY=u_lightShadowTextureTexelSize.y*0.5;flatUv.y=clamp(0.+isTop*halfTexelY,0.5-(1.-isTop)*halfTexelY,flatUv.y);return flatUv+vec2(0.,isTop*.5);}`;
