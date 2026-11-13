const ImageItem = properties.loader.ITEM_CLASSES.image;
class TextureItem extends ImageItem {
  constructor(e, t) {
    let r = t.content || new Texture(new Image());
    t.content = r.image;
    r.size = new Vector2();
    r.minFilter = t.minFilter || LinearMipMapLinearFilter;
    switch (r.minFilter) {
      case NearestMipMapNearestFilter:
      case NearestMipMapLinearFilter:
      case LinearMipMapNearestFilter:
      case LinearMipMapLinearFilter:
        r.generateMipmaps = true;
        r.anisotropy = t.anisotropy || properties.renderer.capabilities.getMaxAnisotropy();
        break;
      default:
        r.generateMipmaps = false;
    }
    r.flipY = t.flipY === undefined ? true : t.flipY;
    if (t.wrap) {
      r.wrapS = r.wrapT = t.wrap;
    } else {
      if (t.wrapS) {
        r.wrapS = t.wrapS;
      }
      if (t.wrapT) {
        r.wrapT = t.wrapT;
      }
    }
    super(e, t);
    this.content = r;
  }
  retrieve() {
    return false;
  }
  load() {
    this.isStartLoaded = true;
    let e = this.content.image;
    e.onload = this.boundOnLoad;
    e.src = this.url;
  }
  _onLoad() {
    delete this.content.image.onload;
    this.width = this.content.image.width;
    this.height = this.content.image.height;
    this.content.size.set(this.width, this.height);
    this.content.needsUpdate = true;
    taskManager.add(this.content);
    if (this.onPost) {
      this.onPost.call(this, this.content, this.onPostLoadingSignal);
    } else {
      this._onLoadComplete();
    }
  }
}
TextureItem.type = "texture";
TextureItem.extensions = [];
const AnyItem$1 = properties.loader.ITEM_CLASSES.any;
class ThreeLoaderItem extends AnyItem$1 {
  constructor(e, t) {
    t.loadFunc = () => {};
    t.hasLoading = t.hasLoading === undefined ? true : t.hasLoading;
    super(e, t);
    if (!t.loader && console) {
      (console.error || console.log)("loader is required.");
    }
    this.loadFunc = this._loadFunc.bind(this);
  }
  _loadFunc(e, t, r) {
    this.loader.load(e, this._onLoaderLoad.bind(this, t), this._onLoaderLoading.bind(this, r), n => {
      console.warn("ThreeLoader error: " + e, n);
      t(null);
    });
  }
  _onLoaderLoad(e, t) {
    this.content = t;
    e(t);
  }
  _onLoaderLoading(e, t) {
    e.dispatch(t.loaded / t.total);
  }
}
ThreeLoaderItem.type = "three-loader";
ThreeLoaderItem.extensions = [];
const shader = `#define GLSLIFY 1
uniform vec2 u_glPositionOffset;vec4 glPositionOffset(vec4 glPosition){return glPosition+vec4(u_glPositionOffset*glPosition.w,0.0,0.0);}`;
class GlPositionOffset {
  offset = new Vector2();
  sharedUniforms = {
    u_glPositionOffset: {
      value: null
    }
  };
  init() {
    this.sharedUniforms.u_glPositionOffset.value = this.offset;
    shaderHelper.addChunk("glPositionOffset", shader);
  }
  setOffset(e, t) {
    return this.offset.set(e, t);
  }
}
const glPositionOffset = new GlPositionOffset();
class Support {
  isSupported() {
    properties._isSupportedDevice = true;
    properties._isSupportedBrowser = (browser$1.isChrome || browser$1.isSafari || browser$1.isEdge || browser$1.isFirefox || browser$1.isOpera) && !browser$1.isIE;
    properties._isSupportedWebGL = this.checkSupportWebGL();
    return properties._isSupportedWebGL;
  }
  checkSupportWebGL() {
    if (!(properties.canvas instanceof HTMLCanvasElement)) {
      return false;
    }
    if (settings.USE_WEBGL2 && window.WebGL2RenderingContext) {
      try {
        properties.gl = properties.canvas.getContext("webgl2", properties.webglOpts);
        settings.RENDER_TARGET_FLOAT_TYPE = HalfFloatType;
        settings.DATA_FLOAT_TYPE = FloatType;
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    settings.USE_WEBGL2 = false;
    if (window.WebGLRenderingContext) {
      try {
        let e = properties.gl = properties.canvas.getContext("webgl", properties.webglOpts) || properties.canvas.getContext("experimental-webgl", properties.webglOpts);
        if ((e.getExtension("OES_texture_float") || e.getExtension("OES_texture_half_float")) && e.getParameter(e.MAX_VERTEX_TEXTURE_IMAGE_UNITS)) {
          settings.RENDER_TARGET_FLOAT_TYPE = browser$1.isIOS || e.getExtension("OES_texture_half_float") ? HalfFloatType : FloatType;
          settings.DATA_FLOAT_TYPE = FloatType;
        } else {
          settings.USE_FLOAT_PACKING = true;
          settings.RENDER_TARGET_FLOAT_TYPE = settings.DATA_FLOAT_TYPE = UnsignedByteType;
          return false;
        }
        return true;
      } catch (e) {
        console.error(e);
        return false;
      }
    }
    return false;
  }
}
const support = new Support();
const textureBicubicShader = `#define GLSLIFY 1
vec4 cubic(float v){vec4 n=vec4(1.0,2.0,3.0,4.0)-v;vec4 s=n*n*n;float x=s.x;float y=s.y-4.0*s.x;float z=s.z-4.0*s.y+6.0*s.x;float w=6.0-x-y-z;return vec4(x,y,z,w);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,offset.xz);vec4 sample1=texture2D(t,offset.yz);vec4 sample2=texture2D(t,offset.xw);vec4 sample3=texture2D(t,offset.yw);float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}vec4 textureBicubic(sampler2D t,vec2 texCoords,vec2 textureSize,vec4 clampRect){vec2 invTexSize=1.0/textureSize;texCoords=texCoords*textureSize-0.5;vec2 fxy=fract(texCoords);texCoords-=fxy;vec4 xcubic=cubic(fxy.x);vec4 ycubic=cubic(fxy.y);vec4 c=texCoords.xxyy+vec2(-0.5,1.5).xyxy;vec4 s=vec4(xcubic.xz+xcubic.yw,ycubic.xz+ycubic.yw);vec4 offset=c+vec4(xcubic.yw,ycubic.yw)/s;offset*=invTexSize.xxyy;vec4 sample0=texture2D(t,clamp(offset.xz,clampRect.xy,clampRect.zw));vec4 sample1=texture2D(t,clamp(offset.yz,clampRect.xy,clampRect.zw));vec4 sample2=texture2D(t,clamp(offset.xw,clampRect.xy,clampRect.zw));vec4 sample3=texture2D(t,clamp(offset.yw,clampRect.xy,clampRect.zw));float sx=s.x/(s.x+s.y);float sy=s.z/(s.z+s.w);return mix(mix(sample3,sample2,sx),mix(sample1,sample0,sx),sy);}`;