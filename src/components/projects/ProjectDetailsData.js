/**
 * ============================================================================
 * Lusion Modular Component: 18-project-details-page
 * File: src/components/projects/ProjectDetailsPage.js
 * Description: ProjectDetailsData, UfxTextMesh, ProjectDetailsItem, ProjectDetailsItems, ProjectDetailsSection & ProjectPage
 * Original Engine Lines: 39337 - 40334
 * ============================================================================
 */
class ProjectDetailsData {
  id = "";
  title = "";
  desc = "";
  ctaTitle = "";
  ctaUrl = "";
  colorBg = "#000";
  colorBtnBg = "#000";
  colorBtnBgHover = "#000";
  colorBtnText = "#000";
  colorBtnTextHover = "#000";
  colorHighlight = "#000";
  colorIconBg = "#000";
  colorIconColor = "#000";
  colorText = "#000";
  shadow = 0;
  nextColorBg = "#000";
  nextColorText = "#000";
  nextId = "";
  nextTitle = "";
  nextShadow = 0;
  domServiceSideListItems;
  domLinkSideListItems;
  itemDataList = [];
  constructor(e, t) {
    this.id = e;
    this.title = t.querySelector("#project-details-title").innerHTML;
    this.desc = t.querySelector("#project-details-desc").innerHTML;
    this.ctaTitle = t.querySelector("#project-details-launch-cta-text").textContent;
    this.ctaUrl = t.querySelector("#project-details-launch-cta").href;
    let r = {
      ...t.querySelector("#project-details").dataset
    };
    this.colorBg = r.colorBg;
    this.colorBtnBg = r.colorBtnBg;
    this.colorBtnBgHover = r.colorBtnBgHover;
    this.colorBtnText = r.colorBtnText;
    this.colorBtnTextHover = r.colorBtnTextHover;
    this.colorHighlight = r.colorHighlight;
    this.colorIconBg = r.colorIconBg;
    this.colorIconColor = r.colorIconColor;
    this.colorText = r.colorText;
    this.shadow = parseFloat(r.shadow);
    (this.domServiceSideListItems = Array.from(t.querySelectorAll("#project-details-side-list-services > *"))).forEach(l => {
      l.remove();
    });
    (this.domLinkSideListItems = Array.from(t.querySelectorAll("#project-details-side-list-links > *"))).forEach(l => {
      l.remove();
    });
    let n = Array.from(t.querySelectorAll(".project-details-item"));
    for (let l = 0; l < n.length; l++) {
      let c = n[l];
      let u = {
        ...c.dataset
      };
      if (c.classList.contains("is-text")) {
        u.content = c.querySelector(".project-details-item-text").textContent;
      } else {
        u.width = parseFloat(u.width);
        u.height = parseFloat(u.height);
        u.parallax = parseFloat(u.parallax || 1);
        u.fullscreen = u.fullscreen !== undefined;
      }
      this.itemDataList.push(u);
      c.remove();
    }
    let a = {
      ...t.querySelector("#project-details-preview").dataset
    };
    this.nextColorBg = a.nextColorBg;
    this.nextColorText = a.nextColorText;
    this.nextId = a.nextId;
    this.nextShadow = parseFloat(a.nextShadow);
    this.nextTitle = t.querySelector("#project-details-preview-title").textContent;
  }
}
class UfxTextMesh extends UfxMesh {
  constructor(e = {}) {
    super(e);
    if (!this.refDom) {
      console.error("UfxTextMesh: refDom is not defined");
    }
    this.material.uniforms.u_texture = {
      value: textureHelper.transparentTexture
    };
    this.canvas = document.createElement("canvas");
  }
  syncText() {
    let e = domHelper.getLinesFromText(this.refDom);
    let t = this.refDom.getBoundingClientRect();
    let r = this.canvas;
    let n = r.getContext("2d");
    let a = getComputedStyle(this.refDom);
    let l = parseFloat(a.getPropertyValue("padding-left"));
    let c = Math.floor(parseFloat(a.getPropertyValue("font-size")));
    let u = a.getPropertyValue("font-style");
    let f = a.getPropertyValue("font-weight");
    let p = a.getPropertyValue("font-family");
    let g = Math.ceil(t.width);
    let v = Math.ceil(t.height);
    r.width = Math.ceil(g * properties.webglDPR);
    r.height = Math.ceil(v * properties.webglDPR);
    let _ = parseFloat(a.getPropertyValue("line-height"));
    n.save();
    n.scale(properties.webglDPR, properties.webglDPR);
    n.fillStyle = "#000";
    n.fillRect(0, 0, g, v);
    n.font = u + " " + f + " " + c + "px " + p;
    let T = 0;
    let M = [];
    for (let C = 0; C < e.length; C++) {
      let w = Math.ceil(n.measureText(e[C]).width + 1);
      M.push(w);
      T += w;
    }
    let S = 0;
    let b;
    b = _ * 0.15;
    for (let C = 0; C < e.length; C++) {
      let w = l;
      let R = C * _ + b;
      let E = M[C];
      let I = n.createLinearGradient(w, 0, w + E, 0);
      I.addColorStop(0, "rgb(" + Math.round(S / T * 255) + ", 0, 0)");
      S += E;
      I.addColorStop(1, "rgb(" + Math.round(S / T * 255) + ", 0, 0)");
      n.fillStyle = I;
      n.fillRect(w, R, E, _);
    }
    n.globalCompositeOperation = "lighter";
    n.fillStyle = "#0f0";
    b = _ * 0.8;
    for (let C = 0; C < e.length; C++) {
      let w = l;
      let R = C * _ + b;
      n.fillText(e[C], w, R);
    }
    n.restore();
    if (this.texture) {
      this.texture.dispose();
    }
    this.texture = new Texture(this.canvas);
    this.texture.minFilter = LinearFilter;
    this.texture.magFilter = LinearFilter;
    this.material.uniforms.u_texture.value = this.texture;
    this.texture.needsUpdate = true;
  }
}
const vert$a = `#define GLSLIFY 1
#include <ufxVert>
varying vec2 v_uv;void main(){vec3 basePos=getBasePosition(position);vec3 screenPos=getScreenPosition(basePos);gl_Position=projectionMatrix*modelViewMatrix*vec4(screenPos,1.0);v_uv=padUv(uv);}`;
const frag$e = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform vec2 u_domXY;uniform vec2 u_domWH;uniform float u_opacity;uniform float u_parallax;uniform float u_time;uniform float u_dpr;uniform sampler2D u_screenPaintTexture;uniform vec2 u_resolution;uniform vec2 u_screenRTSize;uniform float u_activeRatio;uniform vec3 u_highlightColor;uniform vec3 u_bgColor;uniform vec2 u_mouseXY;uniform float u_borderRadius;uniform float u_parallaxRatio;uniform float u_isFullscreen;uniform int u_isVertical;varying vec2 v_uv;
#include <getBlueNoise>
float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}
#ifdef IS_TEXT
uniform vec3 u_textColor;uniform float u_textRatio;
#else
uniform float u_readyRatio;float sdRoundedBox(in vec2 p,in vec2 b,in vec4 r){r.xy=(p.x>0.0)?r.xy : r.zw;r.x=(p.y>0.0)?r.x  : r.y;vec2 q=abs(p)-b+r.x;return min(max(q.x,q.y),0.0)+length(max(q,0.0))-r.x;}float getRoundedCornerMask(vec2 uv,vec4 radius){float d=sdRoundedBox((uv-.5)*u_domWH,u_domWH*0.5*mix(0.6,1.,max(u_isFullscreen,u_activeRatio)),radius.yzwx);return smoothstep(0.,0.-fwidth(d),d);}
#endif
void main(){vec3 blueNoises=getBlueNoise(gl_FragCoord.xy+vec2(43.,12.));
#ifdef IS_TEXT
vec4 image=texture2D(u_texture,v_uv);vec3 color=u_textColor;float mask=smoothstep(u_textRatio,u_textRatio-.5/255.,image.r*255./256.);float imageAlpha=image.g;color=mix(u_bgColor,color,(0.2+mask*0.8));
#else
vec2 uv=v_uv;uv-=0.5;uv*=mix(0.6,1.,u_activeRatio);if(u_isVertical==1){uv.y*=u_parallaxRatio;uv.y+=u_parallax*(1.-u_parallaxRatio);}else{uv.x*=u_parallaxRatio;uv.x+=u_parallax*(1.-u_parallaxRatio);}uv+=0.5;vec3 color=texture2D(u_texture,uv).rgb;float imageAlpha=getRoundedCornerMask(v_uv,vec4(u_borderRadius));color=mix(u_highlightColor,color,u_readyRatio);
#endif
imageAlpha*=u_opacity;gl_FragColor=vec4(color,imageAlpha);}`;