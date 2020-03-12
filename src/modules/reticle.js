
import * as THREE from 'three'
var reticle  = new THREE.Mesh(
    new THREE.RingBufferGeometry(0.05, 0.1, 15).rotateX(- Math.PI / 2),
    new THREE.MeshBasicMaterial()
);
reticle.matrixAutoUpdate = false;
reticle.visible = false;

export default reticle;