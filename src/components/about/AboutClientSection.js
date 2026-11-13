/**
 * ============================================================================
 * Lusion Modular Component: 23-about-client-section
 * File: src/components/about/AboutClientSection.js
 * Description: AboutClientSection, SVGParser & PostUfx
 * Original Engine Lines: 43186 - 45148
 * ============================================================================
 */
class AboutClientSection {
  _needsReset = true;
  isSectionWasActive = false;
  preInit(e) {
    this.domContainer = e.querySelector("#about-clients");
    this.domTitle = e.querySelector("#about-clients-title");
    this.domTitle._time = 0;
    this.domTitle._animating = false;
    this.domTitle._words = [];
    this.domDesc = e.querySelector("#about-clients-desc");
    this.domDesc._time = 0;
    this.domDesc._animating = false;
    this.domCarousel = e.querySelector("#about-clients-carousel");
    this.domCarouselLines = Array.from(this.domCarousel.querySelectorAll(".about-clients-carousel-line"));
    this.domCarouselLinesWrapper = [];
  }
  init() {
    this._createCarousel();
  }
  resize(e, t) {
    this._splitText();
    for (let r = 0; r < this.domCarouselLines.length; r++) {
      let n = this.domCarouselLines[r];
      let a = this.domCarouselLinesWrapper[r];
      a._width = n.getBoundingClientRect().width;
    }
  }
  update(e) {
    let r = scrollManager.getDomRange(this.domContainer).isActive;
    let n = scrollManager.scrollViewDelta;
    let a = scrollManager.getDomRange(this.domTitle);
    let l = scrollManager.getDomRange(this.domDesc);
    if (r) {
      if (this._needsReset) {
        this._reset();
      }
      this.domTitle._time = math.clamp(this.domTitle._time + (this.domTitle._animating ? e : -e), 0, 1 + this.domTitle._words.length / TITLE_STAGGER);
      this.domDesc._time = math.clamp(this.domDesc._time + (this.domDesc._animating ? e : -e), 0, 1 + this.domDesc._splitted.words.length / DESCRIPTION_STAGGER);
      if (a.screenRatio > -1) {
        this.domTitle._animating = true;
        if (properties.useMobileLayout) {
          this.domTitle._words.forEach(c => {
            c.forEach(u => {
              u.style.transform = "translate3d(0, 0, 0)";
            });
          });
        } else {
          this.domTitle._words.forEach((c, u) => {
            c.forEach((f, p) => {
              let g = math.saturate(this.domTitle._time - u / 20);
              let v = ease.expoOut(g);
              f.style.transform = `translate3d(0, ${(1 - v) * 100 - (4 - p) * 100 * v}%, 0)`;
            });
          });
        }
      }
      if (l.screenRatio > -1) {
        this.domDesc._animating = true;
        this.domDesc._splitted.words.forEach((c, u) => {
          let f = properties.viewportWidth >= settings.MOBILE_WIDTH ? ease.lusion(this.domDesc._time - u / DESCRIPTION_STAGGER) : 1;
          let p = properties.viewportWidth >= settings.MOBILE_WIDTH ? math.fit(this.domDesc._time - u / DESCRIPTION_STAGGER, 0, 1, 100, 0, ease.lusion) : 0;
          c.style.transform = `translate3d(0, ${p}%, 0)`;
          c.style.opacity = f;
        });
      }
      for (let c = 0; c < this.domCarouselLinesWrapper.length; c++) {
        let u = this.domCarouselLinesWrapper[c];
        let f = c % 2;
        u._time += e * input.lastScrollYDirection * (100 + f * 35) + n * (100 + f * 35);
        let p = -math.loop(u._time, 0, u._width);
        u.style.transform = `translateX(${p}px)`;
      }
    } else {
      this._needsReset = true;
    }
    this.isSectionWasActive = r;
  }
  _createCarousel() {
    this.domCarouselLines.forEach(e => {
      const t = document.createElement("div");
      t.classList.add("about-clients-carousel-line-wrapper");
      const r = e.cloneNode(true);
      const n = e.cloneNode(true);
      t.append(r, n, e);
      this.domCarousel.append(t);
      t._time = 0;
      this.domCarouselLinesWrapper.push(t);
    });
  }
  _splitText() {
    this.domTitleWordList = [];
    this.domTitle._splitted = new SplitType(this.domTitle, {
      types: "words",
      wordClass: "about-clients-title-word"
    });
    this.domTitle._splitted.words.forEach((e, t) => {
      const r = [];
      const n = e.parentNode;
      const a = document.createElement("div");
      a.style.position = "relative";
      a.style.overflow = "hidden";
      a.classList.add("about-clients-title-word-wrapper");
      a.style.display = "flex";
      a.style.flexDirection = "column";
      e.remove();
      this.domTitleWordList.push(a);
      for (let l = 0; l < 3; l++) {
        const c = e.cloneNode(true);
        c.style.transform = "translate3d(0, 100%, 0)";
        a.append(c);
        r.push(c);
        this.domTitle._words[t] = r;
      }
      n.append(a);
      e.remove();
    });
    this.domDesc._splitted = new SplitType(this.domDesc, {
      types: "words",
      wordClass: "about-clients-desc-text-word"
    });
  }
  _reset() {
    if (this.domTitle._splitted) {
      this._needsReset = false;
      this.domTitle._time = 0;
      this.domTitle._animating = false;
      this.domTitle._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
      });
      this.domDesc._time = 0;
      this.domDesc._animating = false;
      this.domDesc._splitted.words.forEach(e => {
        e.style.transform = "translate3d(0, 100%, 0)";
        e.style.opacity = 0;
      });
    }
  }
}
const aboutClientSection = new AboutClientSection();