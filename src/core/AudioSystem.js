class AudioGroup {
  id = "";
  children = [];
  volume = 1;
  init(e) {
    Object.assign(this, e);
  }
  update(e) {
    e *= this.volume;
    this.children.forEach(t => {
      t.setFinalVolume(e);
    });
  }
  add(e) {
    if (!this.children.includes(e)) {
      this.children.push(e);
    }
  }
  remove(e) {
    if (this.children.includes(e)) {
      this.children.splice(this.children.indexOf(e), 1);
    }
  }
  play() {
    this.children.forEach(e => e.play());
  }
  stop() {
    this.children.forEach(e => e.stop());
  }
}
const LOW_PASS_FREQ = 300;
const MAX_FREQ = 22050;
class AudioItem {
  autoplay = false;
  elem = null;
  id = "";
  url = "";
  fileSize = 100;
  isMutable = false;
  isPositional = false;
  isLoopable = false;
  isPreload = true;
  onInitialized = new MinSignal$2();
  onEnded = new MinSignal$2();
  onPlayed = new MinSignal$2();
  volume = 1;
  audioObject = null;
  hasInitialized = false;
  container = null;
  refDistance = 1;
  _buffer = null;
  _originalOnEnd = null;
  needsFilter = false;
  fadeTime = 0;
  fadeDuration = 1;
  isFadingIn = false;
  isFadingOut = false;
  isSfx = false;
  preInit(e) {
    Object.assign(this, e);
    if (this.isPositional) {
      this.container = new Object3D();
    }
  }
  init(e) {
    if (this.hasInitialized !== true) {
      this.hasInitialized = true;
      this.audioObject = this.isPositional ? new PositionalAudio(e) : new Audio$1(e);
      if (this.isPositional) {
        this.container.add(this.audioObject);
      }
      this._originalOnEnd = this.audioObject.onEnded.bind(this.audioObject);
      this.audioObject.onEnded = this.onEnd.bind(this);
      if (this.isPositional) {
        this.setRefDistance(this.refDistance);
      }
      if (this.isElem && !this.elem) {
        this.elem = document.createElement("audio");
        if (settings.LOCAL_AUDIO_PATH !== settings.AUDIO_PATH) {
          this.elem.crossOrigin = "anonymous";
        }
        this.elem.src = this.url;
      }
      if (this.needsFilter) {
        const t = this.audioObject.context;
        this.biquadFilter = t.createBiquadFilter();
        this.biquadFilter.type = "lowpass";
        this.biquadFilter.frequency.value = MAX_FREQ;
        this.audioObject.setFilter(this.biquadFilter);
      }
      if (this.elem) {
        this.elem.loop = this.isLoopable;
        this.audioObject.setMediaElementSource(this.elem);
        this.elem.addEventListener("ended", this.onEnd.bind(this));
        if (this.autoplay) {
          this.play();
        }
      } else {
        this.audioObject.setLoop(this.isLoopable);
        if (this._buffer) {
          this.decodeAudioData();
        }
      }
      this.onInitialized.dispatch(this);
    }
  }
  load(e) {
    if (this.elem) {
      this.elem.src = this.url;
    } else {
      const t = this.isPreload ? "add" : "load";
      properties.loader[t](this.url, {
        weight: this.fileSize,
        type: "xhr",
        responseType: "arraybuffer",
        hasLoading: true,
        onLoad: r => {
          this._buffer = r;
          if (this.hasInitialized) {
            this.decodeAudioData();
          }
          if (e) {
            e();
          }
        }
      });
    }
  }
  setFinalVolume(e) {
    this.audioObject?.setVolume(e * this.volume);
  }
  activateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(LOW_PASS_FREQ, e.currentTime + 0.5);
    }
  }
  deactivateFilter() {
    if (this.needsFilter && this.biquadFilter) {
      const e = this.audioObject.context;
      this.biquadFilter.frequency.linearRampToValueAtTime(MAX_FREQ, e.currentTime + 0.5);
    }
  }
  setFilterFrequency(e = MAX_FREQ) {
    if (this.needsFilter && this.biquadFilter) {
      this.audioObject.context;
      this.biquadFilter.frequency.value = e;
    }
  }
  setFilterFrequencyViaRatio(e = 1) {
    this.setFilterFrequency(math.fit(e, 0, 1, MAX_FREQ, LOW_PASS_FREQ, ease.expoOut));
  }
  setPositionObjectParent(e) {
    if (this.hasInitialized) {
      if (e) {
        e.add(this.audioObject);
      } else if (this.audioObject.parent) {
        this.audioObject.parent.remove(this.audioObject);
      }
    } else {
      this.positionObjectParent = e;
    }
  }
  decodeAudioData() {
    const e = this._buffer.slice(0);
    AudioContext.getContext().decodeAudioData(e, r => {
      this.audioObject.setBuffer(r);
      if (this.autoplay) {
        this.play();
      }
    });
  }
  onEnd() {
    if (this._originalOnEnd) {
      this._originalOnEnd();
    }
    this.onEnded.dispatch(this);
  }
  play() {
    if (!this.isSfx) {
      this.autoplay = true;
    }
    if (this.audioObject && !this.audioObject.isPlaying) {
      if (this.elem) {
        this.elem.play();
        this.elem.currentTime = 0.01;
        this.audioObject.isPlaying = true;
      } else {
        this.audioObject.play();
      }
      this.onPlayed.dispatch(this);
    }
  }
  stop() {
    this.autoplay = false;
    if (this.audioObject && this.audioObject.isPlaying) {
      if (this.elem) {
        this.elem.pause();
        this.audioObject.isPlaying = false;
      } else {
        this.audioObject.stop();
      }
      this.onEnded.dispatch(this);
    }
  }
  setRefDistance(e) {
    this.refDistance = e;
    if (this.isPositional && this.audioObject) {
      this.audioObject.setRefDistance(this.refDistance);
    }
  }
  setFadeIn(e = 1) {
    this.fadeTime = 0;
    this.fadeDuration = e;
    this.isFadingIn = true;
    this.isFadingOut = false;
    this.play();
  }
  setFadeOut(e = 1) {
    this.fadeTime = e;
    this.fadeDuration = e;
    this.isFadingIn = false;
    this.isFadingOut = true;
  }
  update(e) {
    if (!this.isFadingOut && !this.isFadingIn) {
      return;
    }
    if (this.isFadingOut) {
      this.fadeTime -= e;
    }
    if (this.isFadingIn) {
      this.fadeTime += e;
    }
    const t = math.saturate(this.fadeTime / this.fadeDuration);
    this.volume = t;
    if (this.isFadingOut && t === 0) {
      this.stop();
      this.isFadingOut = false;
    }
    if (this.isFadingIn && t === 1) {
      this.isFadingIn = false;
    }
  }
}
class GlobalAudios {
  hasInit = false;
  constructor() {}
  init() {
    this.domRightTalkBtn = document.getElementById("header-right-talk-btn");
    this.domRightSoundBtn = document.getElementById("header-right-sound-btn");
    this.domRightMenuBtn = document.getElementById("header-right-menu-btn");
    this.domHeaderProjectBack = document.getElementById("header-center-project-back-btn");
    this.domMenuLabLink = document.getElementById("header-menu-labs");
    this.domEndSectionTitleLink = document.getElementById("end-section-title-link");
    this.domFooterBottomUp = document.getElementById("footer-bottom-up");
    this.domFooterEnquiresLink = document.getElementById("footer-enquires-link");
    this.domFooterBusinessLink = document.getElementById("footer-business-link");
    this.domFooterBottomLabs = document.getElementById("footer-bottom-labs");
    this.domMenuLinks = Array.from(document.querySelectorAll("#header-menu-links .header-menu-link"));
    this.domFooterSocialsLinks = Array.from(document.querySelectorAll(".footer-socials-line-wrapper"));
    audios.addHoverClickEvents(this.domRightTalkBtn);
    audios.addHoverClickEvents(this.domRightSoundBtn);
    audios.addHoverClickEvents(this.domRightMenuBtn);
    audios.addHoverClickEvents(this.domHeaderProjectBack);
    audios.addHoverClickEvents(this.domMenuLabLink);
    audios.addHoverClickEvents(this.domEndSectionTitleLink);
    audios.addHoverClickEvents(this.domFooterBottomUp);
    audios.addHoverClickEvents(this.domFooterEnquiresLink);
    audios.addHoverClickEvents(this.domFooterBusinessLink);
    audios.addHoverClickEvents(this.domFooterBottomLabs);
    this.domMenuLinks.forEach(e => audios.addHoverClickEvents(e));
    this.domFooterSocialsLinks.forEach(e => audios.addHoverClickEvents(e));
    this.hasInit = true;
  }
  update() {}
}
const globalAudios = new GlobalAudios();
let SKIP_AUDIO = !settings.USE_AUDIO;
class Audios {
  groups = {};
  items = {};
  isActive = true;
  volume = 0;
  listener = null;
  _boundOnBodyClick = null;
  _onBodyClicked = new MinSignal$2();
  _onRolloverCount = -1;
  _onClickCount = -1;
  _onFocusCount = -1;
  prevBgMusicId = null;
  currBgMusicId = null;
  wasActive = false;
  _counts = {};
  _maxes = {};
  preInit() {
    if (!SKIP_AUDIO) {
      this._boundOnBodyClick = () => this._onBodyClick();
      input.onDowned.add(this._boundOnBodyClick);
      for (let e in AUDIO_DATA) {
        let t = new AudioGroup();
        let r = AUDIO_DATA[e];
        t.init({
          id: e,
          volume: 1
        });
        this.groups[e] = t;
        let n = r.length;
        while (n--) {
          let a = r[n];
          let l = this._parseCountText(a.id);
          let c = l.text;
          if (l.count > 0) {
            for (let u = 1; u < l.count; u++) {
              let f = Object.assign({}, a);
              f.id = l.text + "_" + u;
              r.push(f);
            }
            this._counts[c] = -1;
            this._maxes[c] = l.count;
            a.id = l.text + "_0";
          }
        }
        r.forEach(a => {
          let l = new AudioItem();
          let c = a.id;
          let u = c + a.ext;
          a.url = settings.AUDIO_PATH + u;
          l.preInit(a);
          l.load(() => {});
          this.items[c] = l;
          this.groups[e].add(l);
        });
      }
    }
  }
  _parseCountText(e) {
    let t = 0;
    e.replace(/(.+)_\[(\d)\]/, (r, n, a, l) => {
      e = n;
      t = parseInt(a, 10);
    });
    return {
      text: e,
      count: t
    };
  }
  init() {
    if (!SKIP_AUDIO) {
      this.getListener(e => {
        for (let t in this.items) {
          this.items[t].init(e);
        }
      });
      globalAudios.init();
    }
  }
  on() {
    this.isActive = true;
  }
  off() {
    this.isActive = false;
  }
  toggle() {
    this.isActive = !this.isActive;
  }
  pause() {
    this.wasActive = this.isActive;
  }
  resume() {}
  getListener(e) {
    if (!SKIP_AUDIO) {
      if (this.listener) {
        e(this.listener);
      } else {
        this._onBodyClicked.add(e);
      }
    }
  }
  _onBodyClick() {
    if (!SKIP_AUDIO) {
      input.onDowned.remove(this._boundOnBodyClick);
      this.listener = new AudioListener();
      this._onBodyClicked.dispatch(this.listener);
      properties.camera.add(this.listener);
    }
  }
  addHoverClickEvents(e) {
    if (!SKIP_AUDIO) {
      this.addHoverEvent(e);
      this.addClickEvent(e);
    }
  }
  addHoverEvent(e, t = "hover") {
    if (!SKIP_AUDIO) {
      e.addEventListener("mouseenter", () => {
        this.countPlay(t);
      });
    }
  }
  addClickEvent(e, t = "click") {
    if (!SKIP_AUDIO) {
      input.onClicked.add(() => {
        if (input.hasThroughElem(e, t)) {
          this.countPlay(t);
        }
      });
    }
  }
  countPlay(e) {
    if (SKIP_AUDIO) {
      return;
    }
    let t = this._counts[e];
    let r = this._maxes[e];
    t = this._counts[e] = (t + 1) % r;
    this.items[e + "_" + t].play();
  }
  fadeBgMusic(e, t = 1, r = undefined) {
    if (!SKIP_AUDIO) {
      if (this.currBgMusicId !== e) {
        this.prevBgMusicId = this.currBgMusicId;
        this.currBgMusicId = e;
        if (r === undefined) {
          r = t;
        }
        this.items[this.prevBgMusicId]?.setFadeOut(r);
        this.items[this.currBgMusicId]?.setFadeIn(t);
      }
    }
  }
  update(e) {
    if (!SKIP_AUDIO && (globalAudios.update(e), this.listener)) {
      this.volume = math.saturate(this.volume + (this.isActive ? 1 : -1) * e);
      for (let t in this.items) {
        this.items[t].update(e);
      }
      for (let t in this.groups) {
        this.groups[t].update(this.volume);
      }
    }
  }
}
const audios = new Audios();