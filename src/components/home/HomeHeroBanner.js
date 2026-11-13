/**
 * ============================================================================
 * Lusion Modular Component: HomeHeroBanner
 * File: src/components/home/HomeHeroBanner.js
 * Description: Portfolio hero banner image & animated typewriter overlay
 * ============================================================================
 */
class HomeHeroBanner {
  _timer = null;
  _mountedContainer = null;

  mount(container) {
    const cfg = window.LUSION_CONFIG && window.LUSION_CONFIG.heroBanner;
    if (!cfg || !cfg.enabled || !container) return;
    if (this._mountedContainer === container && container.querySelector(".hero-banner-wrap")) {
      return;
    }
    this._mountedContainer = container;
    this.unmount();

    const wrap = document.createElement("div");
    wrap.className = "hero-banner-wrap";

    const img = document.createElement("img");
    img.className = "hero-banner-img";
    img.src = cfg.image;
    img.alt = "Portfolio Hero";
    img.decoding = "async";

    const scrim = document.createElement("div");
    scrim.className = "hero-banner-scrim";

    const content = document.createElement("div");
    content.className = "hero-banner-content";

    const eyebrow = document.createElement("div");
    eyebrow.className = "hero-banner-eyebrow";
    eyebrow.textContent = cfg.eyebrow || "";

    const headline = document.createElement("div");
    headline.className = "hero-banner-headline";

    const prefixSpan = document.createElement("span");
    prefixSpan.className = "hero-banner-prefix";
    prefixSpan.textContent = cfg.prefix || "";

    const typedSpan = document.createElement("span");
    typedSpan.className = "hero-banner-typed";

    const cursorSpan = document.createElement("span");
    cursorSpan.className = "hero-banner-cursor";
    cursorSpan.textContent = "|";

    headline.appendChild(prefixSpan);
    headline.appendChild(typedSpan);
    headline.appendChild(cursorSpan);

    const tagsWrap = document.createElement("div");
    tagsWrap.className = "hero-banner-tags";
    (cfg.tags || []).forEach(tag => {
      const pill = document.createElement("span");
      pill.className = "hero-banner-tag";
      pill.textContent = tag;
      tagsWrap.appendChild(pill);
    });

    content.appendChild(eyebrow);
    content.appendChild(headline);
    content.appendChild(tagsWrap);

    wrap.appendChild(img);
    wrap.appendChild(scrim);
    wrap.appendChild(content);
    container.appendChild(wrap);

    this._startTypewriter(typedSpan, cfg);
  }

  _startTypewriter(el, cfg) {
    const phrases = (cfg.phrases && cfg.phrases.length) ? cfg.phrases : ["interactive experiences."];
    const typeMs = cfg.typingSpeedMs || 52;
    const delMs = cfg.deletingSpeedMs || 28;
    const pauseMs = cfg.pauseMs || 1800;

    let phraseIdx = 0;
    let charIdx = 0;
    let deleting = false;

    const tick = () => {
      if (!el.isConnected) return;
      const current = phrases[phraseIdx];
      if (!deleting) {
        charIdx++;
        el.textContent = current.slice(0, charIdx);
        if (charIdx >= current.length) {
          deleting = true;
          this._timer = setTimeout(tick, pauseMs);
          return;
        }
        this._timer = setTimeout(tick, typeMs);
      } else {
        charIdx--;
        el.textContent = current.slice(0, Math.max(0, charIdx));
        if (charIdx <= 0) {
          deleting = false;
          phraseIdx = (phraseIdx + 1) % phrases.length;
          this._timer = setTimeout(tick, 320);
          return;
        }
        this._timer = setTimeout(tick, delMs);
      }
    };
    tick();
  }

  unmount() {
    if (this._timer) {
      clearTimeout(this._timer);
      this._timer = null;
    }
  }
}
const homeHeroBanner = new HomeHeroBanner();
