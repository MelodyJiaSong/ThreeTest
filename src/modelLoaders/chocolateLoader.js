import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EnvironmentMapLoader from './environmentMapLoader';
import reticle from '../modules/reticle';

export default new Promise(async (resolve, reject)=>{
    
    var loader = new GLTFLoader().setPath('models/gltf/Chocolate/');
    console.log('chocolate loading...');
    loader.load('scene.gltf', async function (gltf) {
        var envMap = await EnvironmentMapLoader;
        var chocolate = gltf.scene;
        chocolate.traverse(function (node) {
            if (node.isMesh || node.isLight) node.castShadow = true;
            if (node.isMesh) {
                chocolate.node = node;
            }
        });
        chocolate.traverse(function (node) {
            if (node.material && (node.material.isMeshStandardMaterial ||
                (node.material.isShaderMaterial && node.material.envMap !== undefined))) {
    
                node.material.envMap = envMap;
                node.material.envMapIntensity = 1.5;
            }
        });

        chocolate.position.setFromMatrixPosition(reticle.matrix);
        chocolate.position.z += 0;
        chocolate.position.x += 0;
        chocolate.position.y += 1.5;
        chocolate.scale.set(0.0005, 0.0005, 0.0005);

        resolve(chocolate);
        console.log('chocolate loaded');
    });
});

