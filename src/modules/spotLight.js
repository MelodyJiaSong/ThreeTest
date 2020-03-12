import * as THREE from 'three'

//lightDir = new THREE.PointLight(0xffffff, 1, 100);
var lightDir = new THREE.SpotLight(0xffffff, 1, 100);
lightDir.castShadow = true;
lightDir.shadow.mapSize.width = 2048;  // default
lightDir.shadow.mapSize.height = 1024; // default
lightDir.shadow.camera.near = 0.5;    // default
lightDir.shadow.camera.far = 10;

export default lightDir;