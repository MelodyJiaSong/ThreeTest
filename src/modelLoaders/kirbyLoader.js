import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import EnvironmentMapLoader from './environmentMapLoader';
import reticle from '../modules/reticle';

var promise = new Promise(async (resolve, reject)=>{
 
    var loader = new GLTFLoader().setPath('models/gltf/Kirby/');
    console.log('kirby loading...');
    loader.load('scene.gltf',async function (gltf) {
        var envMap = await EnvironmentMapLoader;
        let kirby = gltf.scene;
        kirby.traverse(function (node) {
            if (node.isMesh || node.isLight) node.castShadow = true;
    
        });
        kirby.traverse(function (node) {
            if (node.material && (node.material.isMeshStandardMaterial ||
                (node.material.isShaderMaterial && node.material.envMap !== undefined))) {
    
                node.material.envMap = envMap;
                node.material.envMapIntensity = 1.5;
            }
        });
        kirby.position.setFromMatrixPosition(reticle.matrix);
        kirby.scale.set(0.05, 0.05, 0.05);
        resolve(kirby);
        console.log('kirby loaded');
    });
});
export default promise;