import * as THREE from 'three';
import { OrbitControls } from 'three/addons/controls/OrbitControls.js';

// create canvas
const canvas = document.getElementById('canvas');

// create scene
const scene = new THREE.Scene();
scene.background = new THREE.Color("F0F0F0");

// create camera
const camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);
camera.position.z = 5;

// create objects
const geometry = new THREE.DodecahedronGeometry();
const dodecahedronMaterial = new THREE.MeshToonMaterial({ color: "#468585" });
const dodecahedronMesh = new THREE.Mesh(geometry, dodecahedronMaterial);

const boxGeometry = new THREE.BoxGeometry(2, 0.1, 2);
const boxMaterial = new THREE.MeshToonMaterial({ color: "#678948", gradientMap: "threeTone" });
const boxMesh = new THREE.Mesh(boxGeometry, boxMaterial);
boxMesh.position.y = -1.5;

// create light
const light = new THREE.SpotLight("#678948", 100);
light.position.set(-2, -1, 1);

// add objects to scene
scene.add(dodecahedronMesh);
scene.add(boxMesh);
scene.add(light);

// create renderer
const renderer = new THREE.WebGLRenderer({ canvas });
renderer.setSize(window.innerWidth, window.innerHeight);
renderer.setPixelRatio(window.devicePixelRatio);

// make objects interactive
const controls = new OrbitControls(camera, renderer.domElement);
controls.enableDamping = true;
controls.dampingFactor = 0.05;
controls.enableZoom = true;
controls.enablePan = true;

// animate objects
function animate() {
  requestAnimationFrame(animate);
  
  dodecahedronMesh.rotation.x += 0.01;
  dodecahedronMesh.rotation.y += 0.01;

  boxMesh.rotation.y += 0.005;

  controls.update();
  renderer.render(scene, camera);
}

animate();