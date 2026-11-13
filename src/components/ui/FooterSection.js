/**
 * ============================================================================
 * Lusion Modular Component: 14-footer-section
 * File: src/components/ui/FooterSection.js
 * Description: NewsletterForm & FooterSection Component
 * Original Engine Lines: 37243 - 37509
 * ============================================================================
 */
class NewletterForm {
  isSendingTheNewletterRequest = false;
  domNewsletterForm;
  domNewsletterMessage;
  constructor(e, t, r) {
    this.domNewsletterForm = e;
    this.domNewsletterButton = t;
    this.domNewsletterMessage = r;
    this.domNewsletterForm.addEventListener("submit", this._onFormSubmit.bind(this));
  }
  _onFormSubmit(e) {
    e.preventDefault();
    if (this.isSendingTheNewletterRequest) {
      return;
    }
    this.domNewsletterMessage.classList.remove("error");
    this.domNewsletterMessage.innerHTML = "";
    const t = e.target;
    const n = new FormData(t).get("EMAIL");
    if (!validateEmail(n)) {
      this.domNewsletterMessage.classList.add("error");
      this.domNewsletterMessage.innerHTML = "The email is not valid!";
      return;
    }
    this.isSendingTheNewletterRequest = true;
    this.domNewsletterButton.disabled = true;
    const a = getAjaxUrl(MAILCHIMP_URL) + "&" + toQueryString({
      EMAIL: n
    });
    jsonp$1(a, {
      param: "c"
    }, (l, c) => {
      if (l) {
        this.domNewsletterMessage.classList.add("error");
        this.domNewsletterMessage.innerHTML = "Something went wrong, try again";
      } else if (c.result !== "success") {
        this.domNewsletterMessage.classList.add("error");
        this.domNewsletterMessage.innerHTML = "Something went wrong, try again";
      } else {
        this.domNewsletterMessage.innerHTML = "Almost there! Check your email box!";
        t.reset();
        setTimeout(() => {
          this.domNewsletterMessage.innerHTML = "";
        }, 3000);
      }
      this.isSendingTheNewletterRequest = false;
      this.domNewsletterButton.disabled = false;
    });
  }
}
class FooterSection {
  domContainer;
  offsetY = 0;
  _needsReset = true;
  preInit() {
    this.domContainer = document.getElementById("footer-section");
    this.domContactAddress = document.getElementById("footer-contact-address");
    this.domContactAddress._words = [];
    this.domContactSocials = document.getElementById("footer-contact-socials");
    this.domContactSocials._words = [];
    this.domContactEnquires = document.getElementById("footer-contact-enquires");
    this.domContactEnquires._words = [];
    this.domContactBusiness = document.getElementById("footer-contact-business");
    this.domContactBusiness._words = [];
    this.domNewsletterHeader = document.getElementById("footer-newsletter-header");
    this.domNewsletterHeader._words = [];
    this.domNewsletterForm = document.getElementById("footer-newsletter-form");
    this.domNewsletterMessage = document.getElementById("footer-newsletter-feedback-message");
    this.domNewsletterInput = document.getElementById("footer-newsletter-input");
    this.domNewsletterInput._time = 0;
    this.domNewsletterInput._animating = false;
    this.domNewsletterBg = document.getElementById("footer-newsletter-bg");
    this.domNewsletterButton = document.getElementById("footer-newsletter-input-arrow");
    this.domFooterBottom = document.getElementById("footer-bottom");
    this.domFooterBottom._time = 0;
    this.domFooterBottom._animating = false;
    this.domFooterMiddle = document.getElementById("footer-middle");
    this.domFooterBottomLabs = document.getElementById("footer-bottom-labs");
    this.domFooterBottomCopyright = document.getElementById("footer-bottom-copyright");
    this.domFooterBottomTagline = document.getElementById("footer-bottom-tagline");
    this.domFooterBottomUp = document.getElementById("footer-bottom-up");
    this.domFooterBottomUp._time = 0;
    this.domAddressLines = Array.from(document.querySelectorAll(".footer-address-line"));
    this.domSocialsLines = Array.from(document.querySelectorAll(".footer-socials-line"));
    this.domEnquiresLines = [document.getElementById("footer-enquires-header"), document.getElementById("footer-enquires-link")];
    this.domBusinessLines = [document.getElementById("footer-business-header"), document.getElementById("footer-business-link")];
    this.domNewsletterLines = Array.from(document.querySelectorAll(".footer-newsletter-line"));
    this.middleContainers = [this.domContactAddress, this.domContactSocials, this.domContactEnquires, this.domContactBusiness, this.domNewsletterHeader];
    this.bottomContainers = [this.domFooterBottomCopyright, this.domFooterBottomLabs, this.domFooterBottomTagline, this.domFooterBottomUp];
  }
  init() {
    this.formManager = new NewletterForm(this.domNewsletterForm, this.domNewsletterButton, this.domNewsletterMessage);
    this.domFooterBottomUp.addEventListener("click", this._onDomUpBtnClick.bind(this));
    this._splitText();
  }
  resize(e, t) {
    let r = Array.from(this.domContactAddress.querySelectorAll(".footer-address-line-wrapper"));
    let n = this.domContactAddress.getBoundingClientRect();
    for (let a = 0; a < r.length; a++) {
      let l = r[a];
      let c = l.getBoundingClientRect();
      l.style.setProperty("--delta-x", n.right - c.right + "px");
    }
  }
  getDomRange() {
    return scrollManager.getDomRange(this.domContainer);
  }
  update(e) {
    let t = this.getDomRange();
    if (t.isActive) {
      if (this._needsReset) {
        this._reset();
      }
      if (t.screenRatio > -0.1) {
        document.documentElement.classList.add("is-footer-in");
      } else {
        document.documentElement.classList.remove("is-footer-in");
      }
      if (properties.useMobileLayout) {
        for (let l = 0; l < this.middleContainers.length; l++) {
          let c = this.middleContainers[l];
          for (let u = 0; u < c._words.length; u++) {
            let f = c._words[u];
            for (let p = 0; p < f.length; p++) {
              let g = f[p];
              let v = 0;
              g.style.transform = `translate3d(0, ${v}em, 0)`;
            }
          }
        }
      } else {
        for (let l = 0; l < this.middleContainers.length; l++) {
          let c = this.middleContainers[l];
          let u = scrollManager.getDomRange(c);
          c._time = math.clamp(c._time + (c._animating ? e : -e), 0, Infinity);
          for (let f = 0; f < c._words.length; f++) {
            let p = c._words[f];
            for (let g = 0; g < p.length; g++) {
              let v = p[g];
              let _ = math.fit(c._time - f / 10, 0, 1, 1.5, 0, ease.lusion);
              v.style.transform = `translate3d(0, ${_}em, 0)`;
            }
          }
          if (u.screenRatio > -1) {
            c._animating = true;
          } else {
            c._animating = false;
          }
        }
      }
      let n = scrollManager.getDomRange(this.domNewsletterInput);
      this.domNewsletterInput._time = math.saturate(this.domNewsletterInput._time + (this.domNewsletterInput._animating ? e : -e));
      if (n.screenRatio > -1) {
        this.domNewsletterInput._animating = true;
        this.domNewsletterInput.classList.add("--active");
      } else {
        this.domNewsletterInput._animating = false;
        this.domNewsletterInput.classList.remove("--active");
      }
      if (properties.useMobileLayout) {
        this.domNewsletterBg.style.transform = "scale3d(1, 1, 1)";
        this.domNewsletterButton.style.transform = "scale(1)";
      } else {
        this.domNewsletterBg.style.transform = `scale3d(${math.fit(this.domNewsletterInput._time, 0, 1, 0, 1, ease.lusion)}, 1, 1)`;
        this.domNewsletterButton.style.transform = `scale(${math.fit(this.domNewsletterInput._time - 0.8, 0, 0.2, 0, 1, ease.lusion)})`;
      }
      let a = scrollManager.getDomRange(this.domFooterBottom);
      this.domFooterBottom._time = math.saturate(this.domFooterBottom._time + (this.domFooterBottom._animating ? e * 1 : -e * 1));
      if (a.screenRatio > -1) {
        this.domFooterBottom._animating = true;
      } else {
        this.domFooterBottom._animating = false;
      }
      if (!properties.useMobileLayout) {
        for (let l = 0; l < this.bottomContainers.length; l++) {
          let c = this.bottomContainers[l];
          if (l === this.bottomContainers.length - 1) {
            let u = math.fit(this.domFooterBottom._time - 0.3, 0, 0.3, 0, 1, ease.lusion);
            c.style.transform = `scale(${u})`;
          } else {
            for (let u = 0; u < c._splitted.words.length; u++) {
              let f = c._splitted.words[u];
              let p = math.fit(this.domFooterBottom._time - l / 10 - u / 10, 0, 0.6, 100, 0, ease.lusion);
              f.style.transform = `translate3d(0, ${p}%, 0)`;
            }
          }
        }
      }
    } else {
      this._needsReset = true;
    }
  }
  _splitText() {
    for (let t = 0; t < this.bottomContainers.length; t++) {
      let r = this.bottomContainers[t];
      r._splitted = new SplitType(r, {
        types: "words"
      });
    }
    let e = [{
      lines: this.domAddressLines,
      parent: this.domContactAddress
    }, {
      lines: this.domSocialsLines,
      parent: this.domContactSocials
    }, {
      lines: this.domEnquiresLines,
      parent: this.domContactEnquires
    }, {
      lines: this.domBusinessLines,
      parent: this.domContactBusiness
    }, {
      lines: this.domNewsletterLines,
      parent: this.domNewsletterHeader
    }];
    for (let t = 0; t < this.bottomContainers.length; t++) {
      let r = this.bottomContainers[t];
      r._splitted = new SplitType(r, {
        types: "words"
      });
    }
    for (let t = 0; t < e.length; t++) {
      let r = e[t].lines;
      let n = e[t].parent;
      for (let a = 0; a < r.length; a++) {
        let l = r[a];
        this._createWrapper(l, n);
      }
    }
  }
  _createWrapper(e, t) {
    let r = new SplitType(e, {
      types: "words"
    });
    let n = document.createElement("div");
    n.classList.add(e.classList[0] ? e.classList[0] + "-wrapper" : e.id + "-wrapper");
    n.style.position = "relative";
    n.style.overflow = "hidden";
    n.style.display = "flex";
    n.style.flexDirection = "column";
    n.append(e);
    t.appendChild(n);
    t._words.push(r.words);
    t._time = 0;
    t._animating = false;
    n._topWords = r.words;
  }
  _reset() {
    this._needsReset = false;
    for (let e = 0; e < this.middleContainers.length; e++) {
      let t = this.middleContainers[e];
      t._time = 0;
      for (let r = 0; r < t._words.length; r++) {
        let n = t._words[r];
        for (let a = 0; a < n.length; a++) {
          let l = n[a];
          l.style.transform = "translate3d(0, 0, 0)";
        }
      }
      t._animating = false;
    }
  }
  _onDomUpBtnClick() {
    scrollManager.scrollToPixel(0);
  }
}
const footerSection = new FooterSection();
