const VIDEO_LIST = {
  MAIN_VIDEO_REEL: 761102167
};
class VideoOverlay {
  domVideoContainer;
  domVideoCursor;
  domVideoCursorSvg;
  isOpened = false;
  openedRatio = 0;
  domVideoCursorDirection = -1;
  domVideoCursorActive = false;
  domVideoCursorActiveRatio = 0;
  domVideoCursorRotateRatio = 0;
  domVideoCursorExtraRotationMotion = new SecondOrderDynamics(0, 1, 0.8, 1.2);
  hoverScaleFactor = 1;
  isVideoMuted = false;
  isControlsHover = false;
  isVideoPlaying = false;
  isVideoReady = false;
  videoPercentageWatched = 0;
  videoDuration = 0;
  videoWidth = 1920;
  videoHeight = 1080;
  hasInitalited = false;
  isProjectPage = false;
  preInit() {
    if (this.hasInitalited) {
      return;
    }
    this.domVideoContainer = document.querySelector("#video-overlay");
    this.domVideoCursor = document.querySelector("#video-overlay-cursor");
    this.domVideoCursorSvg = document.querySelector("#video-overlay-cursor-svg");
    this.domVimeoEntryPoint = document.querySelector("#video-overlay__vimeo-video");
    this.domVideoPlayBtn = document.querySelector("#video-overlay__play-btn");
    this.domVideoMuteBtn = document.querySelector("#video-overlay__mute-btn");
    this.domVideoProgress = document.querySelector("#video-overlay__progress-container");
    this.domVideoProgressActive = document.querySelector("#video-overlay__progress-active");
    this.domMobileCloseButton = document.querySelector("#video-overlay__mobile-close-btn");
    this.domVideoProgress.onmouseenter = () => this.isControlsHover = true;
    this.domVideoProgress.onmouseleave = () => this.isControlsHover = false;
    this.domVideoPlayBtn.onmouseenter = () => this.isControlsHover = true;
    this.domVideoPlayBtn.onmouseleave = () => this.isControlsHover = false;
    this.domVideoMuteBtn.onmouseenter = () => this.isControlsHover = true;
    this.domVideoMuteBtn.onmouseleave = () => this.isControlsHover = false;
    const e = {
      id: VIDEO_LIST.MAIN_VIDEO_REEL,
      width: "100%",
      height: "100%",
      responsive: true,
      title: false,
      controls: false,
      byline: false,
      end_screen: {
        type: "empty"
      }
    };
    this.videoPlayer = new Player("video-overlay__vimeo-video", e);
    this.videoPlayer.element.style.pointerEvents = "none";
    this.videoPlayer.setCurrentTime(0);
    this.videoPlayer.getVideoWidth().then(t => this.videoWidth = t);
    this.videoPlayer.getVideoHeight().then(t => this.videoHeight = t);
    this.videoPlayer.getDuration().then(t => this.videoDuration = t);
    this.videoPlayer.on("ended", function (t) {
      this.close();
    });
    this.domVideoContainer.addEventListener("click", () => {
      if (properties.width > 812) {
        this.close();
      }
    });
    this.domMobileCloseButton.addEventListener("click", () => {
      this.close();
    });
    this.videoPlayer.on("ended", () => {
      this.close();
    });
    this.videoPlayer.on("ended", () => {});
    this.videoPlayer.on("timeupdate", t => {
      this.videoPercentageWatched = t.percent;
      this.domVideoProgressActive.style.width = `${t.percent * 100}%`;
      if (t.percent > 0.996) {
        this.close();
      }
    });
    this.domVideoPlayBtn.onclick = t => {
      t.stopPropagation();
      if (this.isVideoPlaying) {
        this.videoPlayer.pause();
        this.isVideoPlaying = false;
      } else {
        this.videoPlayer.play();
        this.isVideoPlaying = true;
      }
      this.domVideoPlayBtn.innerHTML = this.isVideoPlaying ? "Play" : "Pause";
    };
    this.domVideoMuteBtn.onclick = t => {
      t.stopPropagation();
      if (this.isVideoMuted) {
        this.videoPlayer.setVolume(1);
        this.isVideoMuted = false;
      } else {
        this.videoPlayer.setVolume(0);
        this.isVideoMuted = true;
      }
      this.domVideoMuteBtn.innerHTML = this.isVideoMuted ? "Unmute" : "Mute";
    };
    this.domVideoProgress.onclick = t => {
      t.stopPropagation();
      if (this.domVideoProgressBCR.width === 0) {
        this.domVideoProgressBCR = this.domVideoProgress.getBoundingClientRect();
      }
      const r = (t.clientX - this.domVideoProgressBCR.x) / this.domVideoProgressBCR.width;
      this.videoPlayer.pause();
      this.videoPlayer.setCurrentTime(this.videoDuration * r).then(() => {
        this.videoPlayer.play();
      }).catch(n => {
        this.videoPlayer.play();
      });
    };
    this.hasInitalited = true;
  }
  initAndPlayVideo(e = VIDEO_LIST.MAIN_VIDEO_REEL, t = false) {
    this.isProjectPage = t;
    this.isVideoReady = false;
    this.videoPlayer.loadVideo(e).then(() => {
      this.videoPlayer.setCurrentTime(0);
      this.videoPlayer.getVideoWidth().then(r => this.videoWidth = r);
      this.videoPlayer.getVideoHeight().then(r => this.videoHeight = r);
      this.videoPlayer.getDuration().then(r => this.videoDuration = r);
      this.isVideoReady = true;
      this.open();
    });
  }
  init() {
    this.domVideoContainer.style.opacity = 0;
    this.domVideoContainer.style.display = "none";
  }
  resize() {
    if (!this.hasInitalited) {
      return;
    }
    const e = this.domVideoContainer.style.display;
    this.domVideoContainer.style.display = "block";
    const t = properties.viewportWidth / properties.viewportHeight;
    const r = this.videoWidth / this.videoHeight;
    if (this.isProjectPage) {
      this.domVimeoEntryPoint.classList.add("is-project-view");
      this.domVideoContainer.classList.add("is-project-view");
      this.domVimeoEntryPoint.style.removeProperty("width");
      this.domVimeoEntryPoint.style.removeProperty("height");
      this.domVimeoEntryPoint.style.transform = "translateZ(0)";
      const a = this.domVimeoEntryPoint.getBoundingClientRect().width / r;
      this.domVimeoEntryPoint.style.bottom = this.domVimeoEntryPoint.style.top = (properties.viewportHeight - a) * 0.5 + "px";
      this.videoPlayer.element.style.width = "100%";
      this.videoPlayer.element.style.height = "100%";
    } else {
      this.domVimeoEntryPoint.classList.remove("is-project-view");
      this.domVideoContainer.classList.remove("is-project-view");
      const n = Math.max(1, t / r);
      this.domVimeoEntryPoint.style.width = `${properties.viewportWidth}px`;
      this.domVimeoEntryPoint.style.height = `${properties.viewportHeight}px`;
      this.domVimeoEntryPoint.style.transform = `scale(${n})`;
      this.videoPlayer.element.style.width = `${properties.viewportWidth}px`;
      this.videoPlayer.element.style.height = `${properties.viewportHeight}px`;
    }
    this.domVideoProgressBCR = this.domVideoProgress.getBoundingClientRect();
    this.domVideoContainer.style.display = e;
  }
  update(e) {
    if (!this.hasInitalited || (this.openedRatio = math.saturate(this.openedRatio + (this.isOpened ? e : -e) * 2), this.domVideoContainer.style.opacity = ease.quadInOut(this.openedRatio), this.domVideoContainer.style.display = this.openedRatio > 0 ? "block" : "none", settings.USE_AUDIO && (audios.groups.music.volume = 1 - this.openedRatio), this.needsReset && this.openedRatio === 0 && (this.needsReset = false), this.openedRatio === 0)) {
      return;
    }
    let t = input.easedMouseDynamics.default.value.x;
    let r = input.easedMouseDynamics.default.value.y;
    let n = (t * 0.5 + 0.5) * properties.viewportWidth;
    let a = (0.5 - r * 0.5) * properties.viewportHeight;
    if (properties.useMobileLayout) {
      this.domVideoCursor.style.display = "none";
    } else {
      this.domVideoCursorActiveRatio = math.saturate(this.domVideoCursorActiveRatio + e * 1.5);
      this.domVideoCursorDirection = n > 0 ? 1 : -1;
      this.hoverScaleFactor = math.saturate(this.hoverScaleFactor + e * 4 * (this.isControlsHover ? -1 : 1));
      this.domVideoCursor.style.display = "flex";
      let l = n;
      let c = a;
      let u = math.fit(this.hoverScaleFactor, 0, 1, 0.2, 1) * Math.min(2.5, input.easedMouseDynamics.default.valueVel.length() / 5 + 1) * ease.backOut(this.domVideoCursorActiveRatio) * math.fit(this.openedRatio, 0.5, 1, 0, 1, ease.lusion);
      this.domVideoCursor.style.transform = `translate3d(${l}px, ${c}px,0) translate3d(-50%, -50%, 0) scale(${u})`;
      this.domVideoCursorRotateRatio = math.saturate(this.domVideoCursorRotateRatio + (this.domVideoCursorDirection > 0 ? e * 3 : e * -3));
      this.domVideoCursorExtraRotationMotion.update(e, math.clamp(input.easedMouseDynamics.default.valueVel.y * -this.domVideoCursorDirection, -1, 1));
      let f = ease.backInOut(this.domVideoCursorRotateRatio);
      this.domVideoCursorSvg.style.transform = `scale(${ease.quadInOut(this.hoverScaleFactor)}) rotate(${f * 180 + this.domVideoCursorExtraRotationMotion.value * 75}deg)`;
    }
  }
  open() {
    this.isOpened = true;
    setTimeout(() => {
      this.videoPlayer.play().then(() => {
        this.resize();
        this.isVideoPlaying = true;
      });
    }, 500);
  }
  close() {
    if (this.isVideoReady) {
      this.isOpened = false;
      this.videoPlayer.pause().then(() => {
        this.videoPlayer.setCurrentTime(0).then(() => {});
        this.needsReset = true;
        this.isVideoPlaying = false;
        this.isProjectPage = false;
      });
    }
  }
}
const videoOverlay = new VideoOverlay();