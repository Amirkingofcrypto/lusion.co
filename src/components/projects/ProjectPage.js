class ProjectPageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1);
      if (!this.hasInit) {
        this.domProjectLaunchCta = document.getElementById("project-details-launch-cta");
        audios.addHoverClickEvents(this.domProjectLaunchCta);
        this.hasInit = true;
      }
    }
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectPageAudios = new ProjectPageAudios();
class ProjectPage extends Page {
  path = /projects\/([^\/]+)$/;
  id = "project";
  hasExtraPages = false;
  bypassShowingLoading = true;
  contentShowRatio = 0;
  nextProjectRatio = 0;
  prevNonProjectPath = null;
  preInit() {
    this._hideShownTween = new Tween(this, this._onContentShowComplete.bind(this));
    let e = this.domContainer;
    projectDetailsSection.preInit(e);
    videoOverlay.preInit();
  }
  preInitContent(e) {
    projectDetailsSection.preInitContent(e);
  }
  init() {
    projectDetailsSection.init();
    videoOverlay.init();
    super.init();
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    this._showPageTween.kill();
    let n = t.pathNodes[1];
    this.hideRatio = 0;
    header.forceWhite = true;
    header.domRightMenuBtn.style.background = "#fff";
    header.domContainer.classList.add("--is-projects");
    projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "auto";
    if (e.target && e.target !== this) {
      this.prevNonProjectPath = e.path;
    }
    this._onShowCompleteCallback = r;
    if (e.target === t.target) {
      this.useGenericTransition = false;
      projectDetailsSection.updatePreviewUI(n, false);
      projectDetailsSection.update(0, true);
      this._showPageTween.onComplete = this._onNextProjectComplete.bind(this);
      this._showPageTween.fromTo(1, {
        nextProjectRatio: 0
      }, {
        nextProjectRatio: 1
      });
    } else {
      if (e.target && e.target.hasProject(n)) {
        this.useGenericTransition = false;
      }
      projectDetailsSection.show(n);
      this._showPageTween.onComplete = r;
      this._showPageTween.fromTo(this.showDuration, {
        showRatio: 0,
        contentShowRatio: 0
      }, {
        showRatio: 1,
        contentShowRatio: 1
      });
    }
    projectPageAudios.init();
  }
  hide(e, t, r) {
    this.useGenericTransition = true;
    header.domRightMenuBtn.style.removeProperty("background");
    header.domContainer.classList.remove("--is-projects");
    projectDetailsSection.domHeaderBackBtn.style.pointerEvents = "none";
    if (e.target === t.target) {
      this.useGenericTransition = false;
      this.hideRatio = 1;
      r();
    } else {
      let n = e.pathNodes[1];
      if (t.target.hasProject(n) && t.target.isFirstShown) {
        this.useGenericTransition = false;
      }
      super.hide(e, t, () => {
        header.domContainer.style.removeProperty("color");
        header.forceWhite = false;
        for (let a in projectDetailsSection.projectDetailsData) {
          a.replace(/^color(.+)/g, (l, c) => {
            c = c.replace(/([a-z\xE0-\xFF])([A-Z\xC0\xDF])/g, (u, f, p) => f + "-" + p).toLowerCase();
            properties.domRoot.style.removeProperty("--project-details-" + c);
            properties.domRoot.style.removeProperty("--header-color");
            properties.domRoot.style.removeProperty("--header-text-color");
          });
        }
        r();
      });
    }
  }
  resize(e, t) {
    if (this.hasInitialized) {
      projectDetailsSection.resize(e, t);
    }
  }
  update(e) {
    super.update(e);
    if (this.hasInitialized) {
      if (properties.smaa) {
        properties.smaa.enabled = false;
      }
      projectDetailsSection.update(e);
      projectPageAudios.update(e);
    }
  }
  _onContentShowComplete() {
    this._onShowCompleteCallback();
  }
  _onNextProjectComplete() {
    this._hideShownTween.kill();
    let e = pagesManager.currRoute.pathNodes[1];
    this.nextProjectRatio = 0;
    this.contentShowRatio = 0;
    projectDetailsSection.show(e);
    this._hideShownTween.fromTo(1.5, {
      contentShowRatio: 0
    }, {
      contentShowRatio: 1
    });
  }
}
const projectPage = new ProjectPage();
let _brokenGlassStep = 0;