class HomeFeaturedSection {
  domContainer;
  domTitle;
  domDisclaimer;
  domCta;
  projectItemList;
  time = 0;
  _needsReset = true;
  preInit(e) {
    this.domContainer = e.querySelector("#home-featured");
    this.projectItemList = new ProjectItemList(homePage, e.querySelector(".project-list"));
    this.domItems = e.querySelectorAll(".project-item");
    this.domTitle = e.querySelector("#home-featured-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domDisclaimer = e.querySelector("#home-featured-disclaimer");
    this.domDisclaimer._time = 0;
    this.domDisclaimer._animating = false;
    this.domCta = e.querySelector("#home-featured-cta");
    this.domCta._time = 0;
    this.domCta._animating = false;
  }
  init() {}
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
      let n = scrollManager.getDomRange(this.domDisclaimer);
      let a = scrollManager.getDomRange(this.domCta);
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 2);
      this.domDisclaimer._time = math.clamp(this.domDisclaimer._time + (this.domDisclaimer._animating ? e : -e), 0, 2);
      this.domCta._time = math.clamp(this.domCta._time + (this.domCta._animating ? e : -e), 0, 1);
      if (r.screenRatio > -1) {
        this.domTitle._animating = true;
        if (!properties.useMobileLayout) {
          this.domTitle._splitted.chars.forEach((l, c) => {
            let u = math.fit(this.domTitle._time * 1.5 - c / 20, 0, 1, 1, 0, ease.lusion);
            let f = math.fit(this.domTitle._time * 1.5 - c / 20, 0, 1, 10, 0, ease.lusion);
            l.style.transform = `translate3d(0, ${u}em, 0) rotate(${f}deg)`;
          });
        }
      }
      if (n.screenRatio > -1) {
        this.domDisclaimer._animating = true;
        if (!properties.useMobileLayout) {
          this.domDisclaimer._splitted.lines.forEach((l, c) => {
            let u = math.fit(this.domDisclaimer._time * 1 - c / 20, 0, 1, 100, 0, ease.lusion);
            l.style.transform = `translate3d(0, ${u}%, 0)`;
          });
        }
      }
      if (a.screenRatio > -1) {
        if (properties.useMobileLayout) {
          this.domCta.style.transform = "translate3d(0, 0, 0) rotate(0deg)";
          this.domCta.style.opacity = 1;
        } else {
          this.domCta._animating = true;
          this.domCta.style.transform = `translate3d(0, ${math.fit(this.domCta._time, 0, 1, 150, 0, ease.lusion)}%, 0) rotate(${math.fit(this.domCta._time, 0, 1, 10, 0, ease.lusion)}deg)`;
          this.domCta.style.opacity = ease.lusion(this.domCta._time);
        }
      }
    } else {
      this._needsReset = true;
    }
    this.projectItemList.zoomRatio = math.fit(homePage.activeRatio, 0, 0.75, 1, 0);
    this.projectItemList.update(e);
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domDisclaimer._time = 0;
      this.domDisclaimer._animating = false;
      this.domCta._time = 0;
      this.domCta._animating = false;
      if (!properties.useMobileLayout) {
        this.domDisclaimer._splitted.lines.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
        this.domTitle._splitted.chars.forEach(e => {
          e.style.transform = "translate3d(0, 100%, 0)";
        });
      }
    }
  }
  _splitText() {
    if (properties.useMobileLayout) {
      if (this.domTitle._splitted) {
        this.domTitle._splitted.revert();
      }
      if (this.domDisclaimer._splitted) {
        this.domDisclaimer._splitted.revert();
      }
    } else {
      this.domTitle._splitted = new SplitType(this.domTitle, {
        types: "words, chars"
      });
      this.domDisclaimer._splitted = new SplitType(this.domDisclaimer, {
        types: "lines"
      });
      this.domDisclaimer._splitted.lines.forEach(e => {
        let t = document.createElement("div");
        t.style.position = "relative";
        t.style.overflow = "hidden";
        t.append(e);
        this.domDisclaimer.append(t);
      });
    }
  }
}
const homeFeaturedSection = new HomeFeaturedSection();
const channelMixerFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec4 u_channelMixerR;uniform vec4 u_channelMixerG;uniform vec4 u_channelMixerB;uniform vec4 u_channelMixerA;varying vec2 v_uv;void main(){vec4 color=texture2D(u_texture,v_uv);gl_FragColor=vec4(dot(color,u_channelMixerR),dot(color,u_channelMixerG),dot(color,u_channelMixerB),dot(color,u_channelMixerA));}`;