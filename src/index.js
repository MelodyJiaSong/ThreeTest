
import * as THREE from 'three'

import { ARButton } from 'three/examples/jsm/webxr/ARButton.js';
import CoffeeBeanLoader from './modelLoaders/coffeeBeanLoader';
import ChocolateLoader from './modelLoaders/chocolateLoader';
import KirbyLoader from './modelLoaders/kirbyLoader';
import MilkboxLoader from './modelLoaders/milkboxLoader';
import renderer from './renderer';
import './css/main.css';
import reticle from './modules/reticle';
import spotLight from './modules/spotLight';
import mesh from './modules/mesh';
;(async () => {

let [coffeeBean, chocolate, kirby, milkbox] = await Promise.all([CoffeeBeanLoader, ChocolateLoader, KirbyLoader, MilkboxLoader]);

const container = document.createElement('div');
document.body.appendChild(container);
container.appendChild(renderer.domElement);
document.body.appendChild(ARButton.createButton(renderer, { requiredFeatures: ['hit-test'] }));

const camera = new THREE.PerspectiveCamera(70, window.innerWidth / window.innerHeight, 0.01, 20);
const scene = new THREE.Scene();

const light = new THREE.HemisphereLight(0xffffff, 0xbbbbff, 3);
light.position.set(0.5, 1, 0.25);


var controller = renderer.xr.getController(0);
controller.addEventListener('select', onSelect);
controller.addEventListener('selectstart', onSelectStart);

scene.add(light);
scene.add(spotLight);
scene.add(controller);
scene.add(reticle);
scene.add(mesh);

var hitTestSource;
var hitTestSourceRequested = false;
var alreadyShowing = false;

var raycaster = new THREE.Raycaster();
var tempMatrix = new THREE.Matrix4();

window.addEventListener('resize', onWindowResize, false);
renderer.setAnimationLoop(render);

function onSelect() {
    if (reticle.visible) {
        scene.add(kirby);
        scene.add(chocolate);
        scene.add(milkbox);
        scene.add(coffeeBean);
        alreadyShowing = true;
    }
}

function onSelectStart(event) {
    var controller = event.target;
    var intersections = getIntersections(controller);
    if (intersections.length > 0) {
        var intersection = intersections[0];
        tempMatrix.getInverse(controller.matrixWorld);
        var object = intersection.object;
        doAction(object);
        controller.userData.selected = object;
    }
}

function getIntersections(controller) {
    tempMatrix.identity().extractRotation(controller.matrixWorld);
    raycaster.ray.origin.setFromMatrixPosition(controller.matrixWorld);
    raycaster.ray.direction.set(0, 0, - 1).applyMatrix4(tempMatrix);
    return raycaster.intersectObjects([chocolate.node, coffeeBean.node, milkbox.node]);
}

function onWindowResize() {
    camera.aspect = window.innerWidth / window.innerHeight;
    camera.updateProjectionMatrix();
    renderer.setSize(window.innerWidth, window.innerHeight);
}


function render(timestamp, frame) {
    if (frame) {
        var referenceSpace = renderer.xr.getReferenceSpace();
        var session = renderer.xr.getSession();
        if (hitTestSourceRequested === false) {
            session.requestReferenceSpace('viewer').then(function (referenceSpace) {
                session.requestHitTestSource({ space: referenceSpace }).then(function (source) {
                    hitTestSource = source;
                });
            });
            hitTestSourceRequested = true;
        }
        if (hitTestSource) {
            var hitTestResults = frame.getHitTestResults(hitTestSource);
            if (hitTestResults.length && !alreadyShowing) {
                var hit = hitTestResults[0];
                reticle.visible = true;
                reticle.matrix.fromArray(hit.getPose(referenceSpace).transform.matrix);
            } else {
                reticle.visible = false;
            }
        }
    }
    renderer.render(scene, camera);
}

})();