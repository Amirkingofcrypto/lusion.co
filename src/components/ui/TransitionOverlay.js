/**
 * ============================================================================
 * Lusion Modular Component: 28-transition-page-manager
 * File: src/components/ui/TransitionAndPageManager.js
 * Description: TransitionOverlay & PageManager
 * Original Engine Lines: 47617 - 47993
 * ============================================================================
 */
class TransitionOverlay {
  contentShowRatio = 0;
  contentHideRatio = 1;
  loadBarRatio = 0;
  lineTransformRatio = 0;
  showTextRatio = 0;
  waitTextRatio = 0;
  hideTextRatio = 1;
  pixelWidth = 0;
  needsShowText = false;
  needsHideText = false;
  loadingTextAnimation = 0;
  onShowTextCompleted = new MinSignal$2();
  onHideTextCompleted = new MinSignal$2();
  init() {
    this.canvas = document.getElementById("transition-overlay");
    this.ctx = this.canvas.getContext("2d");
  }
  resize(e, t) {
    e += 2;
    t += 2;
    this.canvas.width = e * settings.DPR;
    this.canvas.height = t * settings.DPR;
    this.canvas.style.width = e + "px";
    this.canvas.style.height = t + "px";
    this.pixelWidth = ~~Math.min(42, properties.viewportWidth / 30);
  }
  isReadyToHide() {}
  get activeRatio() {
    return Math.min(1 - this.contentShowRatio, this.contentHideRatio);
  }
  update(e) {
    if (this.activeRatio > 0) {
      let t = properties.viewportWidth + 2;
      let r = properties.viewportHeight + 2;
      let n = this.pixelWidth;
      let a = this.loadBarRatio;
      let l = this.lineTransformRatio;
      let c = Math.sqrt(t * t + r * r) / n;
      let u = this.ctx;
      u.save();
      u.scale(settings.DPR, settings.DPR);
      u.fillStyle = "#000";
      u.fillRect(0, 0, t, r);
      let f = ease.expoInOut(1 - this.activeRatio);
      let p = (1 + f * c) * n;
      u.translate(t * 0.5, r * 0.5);
      u.rotate(f * (this.contentShowRatio == 0 ? -1 : 1));
      u.translate(n * f * c, -n * 0.5 * f * c);
      u.scale(p, p);
      if (l == 0) {
        u.fillStyle = "#333";
        u.fillRect(-2.5, -0.5, 5, 1);
        u.fillStyle = "#fff";
        u.fillRect(-2.5, -0.5, a * 5, 1);
      } else {
        u.fillStyle = "#fff";
        if (this.needsShowText) {
          this.showTextRatio = this.showTextRatio + e * 1.25;
          if (this.showTextRatio >= 1) {
            this.showTextRatio = 1;
            this.needsShowText = false;
            this.onShowTextCompleted.dispatch();
          }
        }
        if (this.showTextRatio == 1) {
          this.waitTextRatio = Math.min(1, this.waitTextRatio + e * 3);
          if (this.waitTextRatio == 1 && this.needsHideText && taskManager.percent == 1) {
            this.hideTextRatio = this.hideTextRatio + e * 1.25;
            if (this.hideTextRatio >= 1) {
              this.hideTextRatio = 1;
              this.needsHideText = false;
              this.onHideTextCompleted.dispatch();
            }
          }
        }
        let g = this.showTextRatio;
        let v = this.hideTextRatio;
        let _ = math.fit(Math.min(g, 1 - v), 0, 0.5, 1, 0.2, ease.expoInOut);
        let T = (ease.expoInOut(g) + ease.expoInOut(v)) * -15;
        if (g > 0 && v < 1) {
          u.scale(_, _);
          u.translate(-l, l * 1.5);
          u.translate(T, 0);
          u.save();
          u.translate(-1.5, -4.5);
          u.beginPath();
          for (let M = 0, S = LOADING_RECTS.length / 4, b = 0; M < S; M++, b += 4) {
            u.fillStyle = "#fff";
            let C = LOADING_RECTS[b + 0];
            let w = LOADING_RECTS[b + 1];
            let R = LOADING_RECTS[b + 2];
            let E = LOADING_RECTS[b + 3];
            let I = M / (S - 1);
            let F = math.fit(g, I * 0.5, 0.5 + I * 0.5, 0, 1, ease.expoIn) * math.fit(v, I * 0.5, 0.5 + I * 0.5, 1, 0, ease.expoOut);
            if (g < 1) {
              if (M < 2) {
                F = 1;
              }
            } else if (M >= S - 2) {
              F = 1;
            }
            u.rect(C + (1 - F) * R * 0.5, w + (1 - F) * E * 0.5, R * F, E * F);
          }
          u.closePath();
          u.fill();
          u.restore();
        } else {
          // Creative Pixel-Assembling AMIR Preloader
          const AMIR_GRID = [
            " ███  █   █ ███ ████ ",
            "█   █ ██ ██  █  █   █",
            "█████ █ █ █  █  ████ ",
            "█   █ █   █  █  █  █ ",
            "█   █ █   █ ███ █   █"
          ];
          const cell = 0.24;
          const cols = 21;
          const rows = 5;
          const totalW = cols * cell;
          const totalH = rows * cell;
          const assemble = ease.expoOut(Math.min(1, Math.max(0, l)));
          const scatter = 1 - assemble;
          u.save();
          u.globalAlpha = 1 - f;
          let idx = 0;
          for (let ry = 0; ry < rows; ry++) {
            for (let cx = 0; cx < cols; cx++) {
              if (AMIR_GRID[ry][cx] !== "█") continue;
              idx++;
              // Deterministic pseudo-random scatter offset per pixel
              const ang = idx * 2.3999632;
              const dist = (1.6 + (idx % 5) * 0.55) * scatter;
              const px = -totalW * 0.5 + cx * cell + Math.cos(ang) * dist;
              const py = -totalH * 0.5 + ry * cell + Math.sin(ang) * dist;
              const s = cell * (0.86 + 0.14 * assemble);
              u.fillStyle = "#ffffff";
              u.fillRect(px, py, s, s);
            }
          }
          u.restore();
        }
      }
      u.restore();
      this.canvas.style.display = "block";
    } else {
      this.canvas.style.display = "none";
    }
  }
}
const transitionOverlay = new TransitionOverlay();
