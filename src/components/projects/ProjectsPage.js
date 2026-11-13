/**
 * ============================================================================
 * Lusion Modular Component: 25-projects-page
 * File: src/components/projects/ProjectsPage.js
 * Description: ProjectsMainSection, ProjectsPageAudios & ProjectsPage Component
 * Original Engine Lines: 45684 - 45867
 * ============================================================================
 */
class ProjectsMainSection {
  domContainer;
  domTitle;
  projectItemList;
  time = 0;
  _needsReset = true;
  preInit(e) {
    this.domContainer = e.querySelector("#projects-main");
    this.projectItemList = new ProjectItemList(projectsPage, e.querySelector(".project-list"));
    this.domItems = e.querySelectorAll(".project-item");
    this.domTitle = e.querySelector("#projects-main-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitleProjectNumber = e.querySelector("#projects-main-title-project-number");
    this.domTitleProjectArrow = e.querySelector("#projects-main-title-project-arrow");
  }
  init() {}
  hasProject(e) {
    return this.projectItemList.hasProject(e);
  }
  resize(e, t) {
    this._splitText();
    this.projectItemList.resize(e, t);
  }
  update(e) {
    if (scrollManager.getDomRange(this.domContainer).isActive) {
      if (this._needsReset) {
        this._reset();
      }
      let r = scrollManager.getDomRange(this.domTitle);
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      if (r.screenRatio > -1) {
        this.domTitle._animating = true;
      }
      if (properties.useMobileLayout) {
        this.domTitleProjectArrow.style.transform = "scale(1)";
      } else {
        this.domTitle._splitted.chars.forEach((a, l) => {
          let c = math.fit(this.domTitle._time * 1.5 - l / 20 - 0.2, 0, 1, 100, 0, ease.lusion);
          let u = math.fit(this.domTitle._time * 1.5 - l / 20 - 0.2, 0, 1, 30, 0, ease.lusion);
          a.style.transform = `translate3d(0, ${c}%, 0) rotate(${u}deg)`;
        });
        this.domTitleProjectNumber._splitted.chars.forEach((a, l) => {
          let c = math.fit(this.domTitle._time - l / 20 - 0.5, 0, 1, 100, 0, ease.lusion);
          a.style.transform = `translate3d(0, ${c}%, 0)`;
        });
        let n = ease.elasticOut(math.saturate(this.domTitle._time - 0.6));
        this.domTitleProjectArrow.style.transform = `scale(${n})`;
      }
    } else {
      this._needsReset = true;
    }
    this.projectItemList.zoomRatio = math.fit(projectsPage.activeRatio, 0, 0.75, 1, 0);
    this.projectItemList.update(e);
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      if (properties.useMobileLayout) {
        if (this.domTitle._splitted.chars) {
          this.domTitle._splitted.chars.forEach(e => {
            e.style.transform = "translate3d(0, 0, 0)";
          });
        }
        if (this.domTitleProjectNumber._splitted.chars) {
          this.domTitleProjectNumber._splitted.chars.forEach(e => {
            e.style.transform = "translate3d(0, 0, 0)";
          });
        }
        this.domTitleProjectArrow.style.transform = "scale(1)";
      } else {
        this.domTitle._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitleProjectNumber._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitleProjectArrow.style.transform = "scale(0)";
      }
    }
  }
  _splitText() {
    if (properties.useMobileLayout) {
      if (this.domTitle._splitted) {
        this.domTitle._splitted.revert();
      }
      if (this.domTitleProjectNumber._splitted) {
        this.domTitleProjectNumber._splitted.revert();
      }
    } else {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "chars"
      });
      this.domTitleProjectNumber._splitted = new SplitType(this.domTitleProjectNumber, {
        types: "chars"
      });
    }
  }
}
const projectsMainSection = new ProjectsMainSection();
class ProjectsPageAudios {
  hasInit = false;
  constructor() {}
  init() {
    if (settings.USE_AUDIO) {
      audios.fadeBgMusic("generic", 1);
      if (!this.hasInit) {
        this.domProjectItems = Array.from(document.querySelectorAll("#projects .project-item"));
        this.domProjectItems.forEach(e => {
          audios.addHoverClickEvents(e);
        });
        this.hasInit = true;
      }
    }
  }
  update() {
    settings.USE_AUDIO;
  }
}
const projectsPageAudios = new ProjectsPageAudios();
class ProjectsPage extends Page {
  path = "projects";
  id = "projects";
  endVisualUseTextured = true;
  preInit() {
    let e = this.domContainer;
    projectsMainSection.preInit(e);
  }
  init() {
    projectsMainSection.init();
  }
  hasProject(e) {
    return projectsMainSection.projectItemList.hasProject(e);
  }
  show(e, t, r) {
    this.useGenericTransition = true;
    projectsMainSection.projectItemList.selectedId = null;
    let n = e.pathNodes[1];
    if (e.target === projectPage && this.hasProject(n) && this.isFirstShown) {
      this.useGenericTransition = false;
      this.showDuration = 1.5;
      scrollManager.scrollToPixel(projectsMainSection.projectItemList.getProjectItemTop(n) - properties.viewportHeight * 0.25, true);
      projectsMainSection.projectItemList.selectedId = n;
    } else {
      this.showDuration = 1;
    }
    projectsPageAudios.init();
    super.show(e, t, r);
  }
  hide(e, t, r) {
    this.useGenericTransition = true;
    projectsMainSection.projectItemList.selectedId = null;
    if (t.target === projectPage && this.hasProject(t.pathNodes[1])) {
      this.useGenericTransition = false;
      this.hideDuration = 1.5;
      projectsMainSection.projectItemList.selectedId = t.pathNodes[1];
    } else {
      this.hideDuration = 1;
    }
    super.hide(e, t, r);
  }
  resize(e, t) {
    projectsMainSection.resize(e, t);
  }
  update(e) {
    super.update(e);
    if (this.hasInitialized) {
      projectsMainSection.update(e);
      if (pagesManager.scrollTargetPage == this) {
        properties.bgColor.setStyle(properties.offWhiteColorHex);
        let t = true;
        let r = false;
        let n = false;
        document.documentElement.classList.toggle("is-black-bg", r);
        document.documentElement.classList.toggle("is-white-bg", t);
        document.documentElement.classList.toggle("is-blue-bg", n);
      }
      projectsPageAudios.update(e);
    }
  }
}
const projectsPage = new ProjectsPage();
