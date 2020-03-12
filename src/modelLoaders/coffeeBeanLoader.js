import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import reticle from '../modules/reticle';
export default new Promise((resolve, reject)=>{
    const coffeeBeanloader = new GLTFLoader().setPath('models/gltf/CoffeeBeans/');
    console.log('coffeebean loading...');
    coffeeBeanloader.load('scene.gltf', function (gltf) {
        const coffeeBeans = gltf.scene;
        coffeeBeans.traverse(function (node) {
            if (node.isMesh || node.isLight) node.castShadow = true;
            if (node.isMesh) {
                coffeeBeans.node = node;
            }
        });
        coffeeBeans.position.setFromMatrixPosition(reticle.matrix);
        coffeeBeans.position.z += 0;
        coffeeBeans.position.x += 0;
        coffeeBeans.position.y += 2;
        coffeeBeans.scale.set(5, 5, 5);
        resolve(coffeeBeans);
        console.log('coffeebean loaded');
    });
});
