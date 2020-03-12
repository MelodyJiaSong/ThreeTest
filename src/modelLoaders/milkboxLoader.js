import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import reticle from '../modules/reticle';
export default new Promise((resolve, reject)=>{
    var loader = new GLTFLoader().setPath('models/gltf/Milkbox/');
    console.log('milkbox loading...');
    loader.load('scene.gltf', function (gltf) {
        let milkbox = gltf.scene;
        milkbox.traverse(function (node) {
            if (node.isMesh || node.isLight) node.castShadow = true;
            if (node.isMesh) {
                milkbox.node = node;
            }
        });
        milkbox.position.setFromMatrixPosition(reticle.matrix);
        milkbox.position.z += 0;
        milkbox.position.x += 0;
        milkbox.position.y += 1.5;
        milkbox.scale.set(3, 3, 3);
        resolve(milkbox);
        console.log('milkbox loaded');
    });
});


