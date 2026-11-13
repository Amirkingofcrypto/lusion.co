const blockVert = `#define GLSLIFY 1
attribute float a_instanceId;uniform float u_time;uniform float u_ratio;uniform float u_ratioInverse;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;vec3 deform(in vec3 pos){float origZ=pos.z;float blockCount=float(BLOCK_COUNT);float ratio=mix(.1,1.,u_ratioInverse);float lengthRatio=-pos.z/blockCount;float scalar=mix(0.25,ratio,lengthRatio);pos.x*=1.0+scalar*0.5*sin(lengthRatio*6.283184);pos.y*=1.0+scalar*0.5*cos(lengthRatio*6.283184+3.1415926);float angleRatio=smoothstep(0.25,1.,u_ratioInverse);float angle=(angleRatio+angleRatio*lengthRatio*lengthRatio*1.)*-6.283184;float s=sin(angle);float c=cos(angle);mat2 m=mat2(c,-s,s,c);pos.xy=m*pos.xy;pos.y+=ratio*sin(ratio*lengthRatio*3.141592*4.)*0.25;pos.z-=(cos(ratio*1.5+(1.0-ratio)*lengthRatio*3.141592*0.5)*0.5+0.5-1.0)*blockCount;pos.z*=1.0+16.0*(ratio*lengthRatio*lengthRatio)+2.0*ratio*(sin(8.0*lengthRatio)*0.5+0.5);pos.z*=(1.-ratio*ratio*ratio)*0.9+0.1;pos.z+=blockCount/4.;return pos*15.;}vec3 inverseTransformDirection(in vec3 dir,in mat4 matrix){return normalize((vec4(dir,0.0)*matrix).xyz);}void main(){float blockCount=float(BLOCK_COUNT);vec3 pos=position;pos.z-=a_instanceId;pos.z/=blockCount;float lengthRatio=-pos.z;pos.z*=blockCount;v_localPosition=pos;v_lengthRatio=lengthRatio;vec3 nor=deform(pos+normal*0.01);pos=deform(pos);nor=normalize(nor-pos);vec4 mvPosition=modelViewMatrix*vec4(pos,1.0);v_viewPosition=mvPosition.xyz;v_fog=-0.005*mvPosition.z/mvPosition.w;gl_Position=projectionMatrix*mvPosition;v_worldPosition=(modelMatrix*vec4(pos,1.0)).xyz;v_worldNormal=inverseTransformDirection(normalMatrix*nor,viewMatrix);v_uv=uv;}`;
const blockFrag = `#define GLSLIFY 1
uniform sampler2D u_texture;uniform float u_ratioInverse;uniform vec3 u_fbm;varying vec3 v_localPosition;varying vec2 v_uv;varying vec3 v_worldPosition;varying vec3 v_worldNormal;varying vec3 v_viewPosition;varying float v_lengthRatio;varying float v_fog;uniform float u_time;float sphOcclusion(in vec3 pos,in vec3 nor,in vec4 sph){vec3 di=sph.xyz-pos;float l=length(di);float nl=dot(nor,di/l);float h=l/sph.w;float h2=h*h;float k2=1.0-h2*nl*nl;return max(0.0,nl)/h2;}float linearStep(float edge0,float edge1,float x){return clamp((x-edge0)/(edge1-edge0),0.0,1.0);}vec4 hash(vec4 p4){p4=fract(p4*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}vec3 voronoi(const in vec4 x){vec4 p=floor(x);vec4 f=fract(x);float id=0.0;vec2 res=vec2(100.0);for(int l=-1;l<=1;l++){for(int k=-1;k<=1;k++){for(int j=-1;j<=1;j++){for(int i=-1;i<=1;i++){vec4 b=vec4(float(i),float(j),float(k),float(l));vec4 r=vec4(b)-f+hash(p+b);float d=dot(r,r);float cond=max(sign(res.x-d),0.0);float nCond=1.0-cond;float cond2=nCond*max(sign(res.y-d),0.0);float nCond2=1.0-cond2;id=(dot(p+b,vec4(1.0,57.0,113.0,421.))*cond)+(id*nCond);res=vec2(d,res.x)*cond+res*nCond;res.y=cond2*d+nCond2*res.y;}}}}return vec3(sqrt(res),abs(id));}vec4 hash(float p){vec4 p4=fract(vec4(p)*vec4(.1031,.1030,.0973,.1099));p4+=dot(p4,p4.wzxy+33.33);return fract((p4.xxyz+p4.yzzw)*p4.zywx);}void main(){vec4 sph=vec4(u_fbm.x*2.,u_fbm.y*2.+1.,0.,2.5);vec3 worldNormal=normalize(v_worldNormal);float ao=1.-sphOcclusion(v_worldPosition,worldNormal,sph)*2.*smoothstep(0.8,0.5,u_ratioInverse);float shade=texture2D(u_texture,v_uv).r;float brightness=pow(v_lengthRatio,5.);float t=u_ratioInverse*-2.+u_time*0.2;vec3 vn=voronoi(vec4(v_localPosition*2.+vec3(0.,0.,-t*0.5),t*0.25));vec4 rnd=hash(vn.z);float threshold=0.05+rnd.x*0.1;float r=abs(vn.x-.5)*(1.75+rnd.y*0.5);float pattern=max(0.,1.-smoothstep(threshold-fwidth(r),threshold,r));vec3 color=mix(vec3(0.102,0.184,0.984),vec3(1.),pattern);color*=(.35+shade)*ao;color+=brightness;gl_FragColor=vec4(color,shade+brightness);gl_FragColor.rgb=mix(gl_FragColor.rgb,vec3(1.0),smoothstep(0.8,1.0,u_ratioInverse)*0.5);gl_FragColor.a*=ao*mix(1.,0.15,pattern);gl_FragColor+=linearStep(-10.,-11.,v_localPosition.z);}`;
class GoalWhiteTunnel {
  container = new Object3D();
  baseMesh;
  wallMesh;
  BLOCK_COUNT = 16;
  TEXTURE_SIZE = 1024;
  prevRatio = 0;
  pt0 = new Vector3();
  pt1 = new Vector3();
  pt2 = new Vector3();
  sharedUniforms = {
    u_texture: {
      value: null
    },
    u_ratioInverse: {
      value: 0
    },
    u_fbm: {
      value: null
    }
  };
  preInit() {
    this.fbm = new BrownianMotion();
    this.fbm._positionAmplitude = 2;
    this.fbm._positionFrequency = 1;
    this.sharedUniforms.u_fbm.value = this.fbm._position;
    this.sharedUniforms.u_texture.value = properties.loader.add(settings.TEXTURE_PATH + "tunnels/white_block.webp", {
      type: "texture"
    }).content;
    properties.loader.add(settings.MODEL_PATH + "tunnels/tunnel_block_base.buf", {
      onLoad: t => this._onTunnelBlockLoad(t, false)
    });
    properties.loader.add(settings.MODEL_PATH + "tunnels/tunnel_block_wall.buf", {
      onLoad: t => this._onTunnelBlockLoad(t, true)
    });
    let e = new Mesh(new SphereGeometry(7.5, 32, 24), new MeshNormalMaterial());
    e.position.z = 0;
  }
  _onTunnelBlockLoad(e, t) {
    let r = new InstancedBufferGeometry();
    for (let c in e.attributes) {
      r.setAttribute(c, e.attributes[c]);
    }
    r.setIndex(e.index);
    let n = new Float32Array(this.BLOCK_COUNT);
    for (let c = 0; c < this.BLOCK_COUNT; c++) {
      n[c] = c;
    }
    r.setAttribute("a_instanceId", new InstancedBufferAttribute(n, 1));
    let a = {
      u_ratio: goalTunnels.sharedUniforms.u_whiteTunnelRatio,
      u_texture: this.sharedUniforms.u_texture,
      u_ratioInverse: this.sharedUniforms.u_ratioInverse,
      u_fbm: this.sharedUniforms.u_fbm,
      u_time: goalTunnels.sharedUniforms.u_tunnelTime
    };
    let l = new Mesh(r, new ShaderMaterial({
      uniforms: a,
      vertexShader: blockVert,
      fragmentShader: blockFrag,
      extensions: {
        derivatives: true
      }
    }));
    l.material.defines.BLOCK_COUNT = this.BLOCK_COUNT;
    l.frustumCulled = false;
    if (t) {
      this.wallMesh = l;
      l.material.defines.IS_WALL = true;
    } else {
      this.baseMesh = l;
    }
    this.container.add(l);
  }
  init() {}
  resize(e, t) {}
  update(e) {
    this.sharedUniforms.u_ratioInverse.value = 1 - goalTunnels.whiteTunnelRatio;
    goalTunnels.properties.cameraDollyZoomFovOffset = math.fit(goalTunnels.whiteTunnelRatio, 0, 1, 60, 0);
    let t = goalTunnels.whiteTunnelRatio - this.prevRatio;
    goalTunnelEfx.offsetPostion.z = math.clamp(-t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.9, 500, 0, ease.sineOut), -1, 1);
    goalTunnelEfx.offsetRotation.z = math.clamp(-t * math.fit(goalTunnels.whiteTunnelRatio, 0, 0.8, 45, 0, ease.sineOut), -1, 1);
    this.fbm.update(e);
    goalTunnelEfx.amount = math.fit(goalTunnels.whiteTunnelRatio, 0.75, 1, 1, 0);
    this.prevRatio = goalTunnels.whiteTunnelRatio;
  }
}
const goalWhiteTunnel = new GoalWhiteTunnel();