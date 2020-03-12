
import * as THREE from 'three'
import reticle from './reticle';
var geometry = new THREE.PlaneGeometry(10, 10);
var material = new THREE.ShadowMaterial({ side: THREE.DoubleSide });
material.opacity = 0.3;
var mesh = new THREE.Mesh(geometry, material);
mesh.position.setFromMatrixPosition(reticle.matrix);
mesh.rotation.x = Math.PI / 2;
mesh.scale.set(0.3, 0.3, 0.3);
mesh.castShadow = false;
mesh.receiveShadow = true;
export default mesh;