/**
 * ============================================================================
 * Lusion Modular Component: 04-task-page-stage-efx
 * File: src/core/StageAndEffects.js
 * Description: Task, TaskManager, Page Base Class, Ease, Stage3D, Blur, ShaderHelper, BlueNoise & ScreenPaint
 * Original Engine Lines: 28063 - 29211
 * ============================================================================
 */
class Task {
  _completeCount = 0;
  _completeTotal = 0;
  constructor(e) {
    if (Array.isArray(e)) {
      this.run = this.createMultiCallbackFunc(e);
    } else {
      this.run = this.createCallbackFunc(e);
    }
  }
  get isCompleted() {
    return this._completeCount == this._completeTotal;
  }
  run() {}
  createMultiCallbackFunc(e) {
    let t = [];
    for (let r = 0; r < e.length; r++) {
      t.push(this.createCallbackFunc(e[r]));
    }
    return function () {
      for (let r = 0; r < t.length; r++) {
        t[r]();
      }
    };
  }
  _onComplete() {
    this._completeCount++;
  }
  createCallbackFunc(e) {
    if (!e) {
      return () => {};
    }
    let t;
    this._completeTotal++;
    if (e.isRawShaderMaterial || e.isShaderMaterial) {
      t = this.createShaderMaterialFunc(e);
    } else if (e.isObject3D) {
      t = this.createCompileSceneFunc(e);
    } else if (e.isTexture) {
      t = this.createInitTextureFunc(e);
    } else {
      t = e.bind(this, this._onComplete);
    }
    return t;
  }
  createShaderMaterialFunc(e) {
    return function () {
      fboHelper._tri.material = e;
      let t = false;
      const r = () => {
        if (!t) {
          t = true;
          this._onComplete();
        }
      };
      setTimeout(r, 1500);
      try {
        properties.renderer.compileAsync(fboHelper._tri, properties.camera).then(r).catch(n => {
          console.warn("compileAsync shader err:", n);
          r();
        });
      } catch (n) {
        console.warn("compileAsync shader sync err:", n);
        r();
      }
    };
  }
  createCompileSceneFunc(e) {
    return function () {
      e.traverse(r => {
        r._tmpVisible = r.visible;
        r.visible = true;
      });
      let t = e.visible;
      e.visible = true;
      let r = false;
      const n = () => {
        if (!r) {
          r = true;
          e.traverse(a => {
            a.visible = a._tmpVisible;
          });
          e.visible = t;
          this._onComplete();
        }
      };
      setTimeout(n, 1500);
      try {
        properties.renderer.compileAsync(e, properties.camera).then(n).catch(a => {
          console.warn("compileAsync scene err:", a);
          n();
        });
      } catch (a) {
        console.warn("compileAsync scene sync err:", a);
        n();
      }
    };
  }
  createInitTextureFunc(e) {
    return function () {
      properties.renderer.initTexture(e);
      this._onComplete();
    };
  }
}
class TaskManager {
  percent = 1;
  taskList = [];
  _activeTaskList = [];
  _activeTaskIndex = 0;
  _needsStart = false;
  onCompleted = new MinSignal$2();
  start() {
    this._needsStart = true;
    this.percent = 0;
  }
  _start() {
    this._needsStart = false;
    this._activeTaskList = this.taskList.splice(0, this.taskList.length);
    this._activeTaskIndex = 0;
  }
  add(e) {
    if (!settings.SKIP_ANIMATION) {
      this.taskList.push(new Task(e));
    }
  }
  update() {
    if (this._needsStart) {
      this._start();
    }
    if (this._activeTaskList.length) {
      let e = this._activeTaskList[this._activeTaskIndex];
      if (e && !e.isCompleted) {
        this._activeTaskIndex++;
        this.percent = this._activeTaskIndex / this._activeTaskList.length;
        e.run();
      }
    } else {
      let e = this.percent;
      this.percent = 1;
      if (e < 1) {
        this.onCompleted.dispatch();
      }
    }
  }
}
const taskManager = new TaskManager();