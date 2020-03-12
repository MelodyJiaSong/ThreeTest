import renderer from '../renderer';
import * as THREE from 'three'
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';

 var promise = new Promise((resolve, reject)=>{
    var pmremGenerator = new THREE.PMREMGenerator(renderer);
    console.log('env loading...');
    new RGBELoader()
        .setDataType(THREE.UnsignedByteType)
        .setPath('textures/equirectangular/')
        .load('venice_sunset_1k.hdr', function (texture) {
    
            const envMap = pmremGenerator.fromEquirectangular(texture).texture;
            resolve(envMap);
            console.log('env loaded');
        });
});
export default promise;

