/**
 * ============================================================================
 * Lusion Modular Component: 30-loaders-support
 * File: src/core/LoadersAndSupport.js
 * Description: BufItem, EXRLoader, EXRItem, TextureItem, ThreeLoaderItem, GlPositionOffset & Support
 * Original Engine Lines: 49316 - 51303
 * ============================================================================
 */
class BufItem extends XHRItem {
  constructor(e, t) {
    super(e, {
      ...t,
      responseType: "arraybuffer"
    });
  }
  retrieve() {
    return false;
  }
  _onLoad() {
    if (!this.content) {
      const e = this.xmlhttp.response;
      let t = new Uint32Array(e, 0, 1)[0];
      let r = JSON.parse(String.fromCharCode.apply(null, new Uint8Array(e, 4, t)));
      let n = r.vertexCount;
      let a = r.indexCount;
      let l = 4 + t;
      let c = new BufferGeometry();
      let u = r.attributes;
      let f = false;
      let p = {};
      for (let _ = 0, T = u.length; _ < T; _++) {
        let M = u[_];
        let S = M.id;
        let b = S === "indices" ? a : n;
        let C = M.componentSize;
        let w = window[M.storageType];
        let R = new w(e, l, b * C);
        let E = w.BYTES_PER_ELEMENT;
        let I;
        if (M.needsPack) {
          let F = M.packedComponents;
          let k = F.length;
          let L = M.storageType.indexOf("Int") === 0;
          let D = 1 << E * 8;
          let ne = L ? D * 0.5 : 0;
          let re = 1 / D;
          I = new Float32Array(b * C);
          for (let ce = 0, z = 0; ce < b; ce++) {
            for (let j = 0; j < k; j++) {
              let X = F[j];
              I[z] = (R[z] + ne) * re * X.delta + X.from;
              z++;
            }
          }
        } else {
          p[S] = l;
          I = R;
        }
        if (S === "normal") {
          f = true;
        }
        if (S === "indices") {
          c.setIndex(new BufferAttribute(I, 1));
        } else {
          c.setAttribute(S, new BufferAttribute(I, C));
        }
        l += b * C * E;
      }
      let g = r.meshType;
      let v = [];
      if (r.sceneData) {
        let _ = r.sceneData;
        let T = new Object3D();
        let M = [];
        let S = g === "Mesh" ? 3 : g === "LineSegments" ? 2 : 1;
        for (let b = 0, C = _.length; b < C; b++) {
          let w = _[b];
          let R;
          if (w.vertexCount == 0) {
            R = new Object3D();
          } else {
            let E = new BufferGeometry();
            let I = c.index;
            let F = I.array;
            let k = F.constructor;
            let L = k.BYTES_PER_ELEMENT;
            E.setIndex(new BufferAttribute(new F.constructor(F.buffer, w.faceIndex * I.itemSize * L * S + (p.indices || 0), w.faceCount * I.itemSize * S), I.itemSize));
            for (let D = 0, ne = E.index.array.length; D < ne; D++) {
              E.index.array[D] -= w.vertexIndex;
            }
            for (let D in c.attributes) {
              I = c.attributes[D];
              F = I.array;
              k = F.constructor;
              L = k.BYTES_PER_ELEMENT;
              E.setAttribute(D, new BufferAttribute(new F.constructor(F.buffer, w.vertexIndex * I.itemSize * L + (p[D] || 0), w.vertexCount * I.itemSize), I.itemSize));
            }
            if (g === "Mesh") {
              R = new Mesh(E, new MeshNormalMaterial({
                flatShading: !f
              }));
            } else if (g === "LineSegments") {
              R = new LineSegments(E, new LineBasicMaterial());
            } else {
              R = new Points(E, new PointsMaterial({
                sizeAttenuation: false,
                size: 2
              }));
            }
            M.push(R);
          }
          if (w.parentIndex > -1) {
            v[w.parentIndex].add(R);
          } else {
            T.add(R);
          }
          R.position.fromArray(w.position);
          R.quaternion.fromArray(w.quaternion);
          R.scale.fromArray(w.scale);
          R.name = w.name;
          R.userData.material = w.material;
          v[b] = R;
        }
        c.userData.meshList = M;
        c.userData.sceneObject = T;
      }
      this.content = c;
    }
    this.xmlhttp = undefined;
    super._onLoad(this);
  }
}
BufItem.type = "buf";
BufItem.extensions = ["buf"];
BufItem.responseType = "arraybuffer"; /*!
                                      fflate - fast JavaScript compression/decompression
                                      <https://101arrowz.github.io/fflate>
                                      Licensed under MIT. https://github.com/101arrowz/fflate/blob/master/LICENSE
                                      version 0.6.9
                                      */