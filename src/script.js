import './style.css';
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

// all maps
const maps = {
    mercury: {
        map: new THREE.TextureLoader().load('./mercury/mercury_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader().load('./mercury/mercury_bump_map.jpg')
    },
    venus: {
        map: new THREE.TextureLoader().load('./venus/venus_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader().load('./venus/venus_bump_map.jpg')
    },
    earth: {
        map: new THREE.TextureLoader().load('./earth/earth_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader().load('./earth/earth_bump_map.jpg')
    },
    moon: {
        map: new THREE.TextureLoader().load('./moon/moon_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader().load('./moon/moon_bump_map.jpg')
    },
    mars: {
        map: new THREE.TextureLoader().load('./mars/mars_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader().load('./mars/mars_bump_map.jpg')
    },
    jupiter: {
        map: new THREE.TextureLoader().load('./jupiter/jupiter_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader()
    },
    neptune: {
        map: new THREE.TextureLoader().load('./neptune/neptune_texture_map.jpg'),
        bumpMap: new THREE.TextureLoader()
    }
}

// Sizes
const sizes = {
    width: window.innerWidth,
    height: window.innerHeight
}

window.addEventListener('resize', () => {
    // Update sizes
    sizes.width = window.innerWidth;
    sizes.height = window.innerHeight;

    // Update camera
    camera.aspect = sizes.width / sizes.height;
    camera.updateProjectionMatrix();

    // Update renderer
    renderer.setSize(sizes.width, sizes.height);
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
});

// Canvas
const canvas = document.querySelector('canvas.webgl');

// Scene
const scene = new THREE.Scene();

// Objects
const planet_geometry = new THREE.SphereGeometry(1, 64, 64);

// Materials
const material = new THREE.MeshStandardMaterial({
    map: maps.earth.map,
    bumpMap: maps.earth.bumpMap,
    bumpScale: 0.005,
});

// Mesh
const sphere = new THREE.Mesh(planet_geometry, material);
scene.add(sphere);

// Camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 0;
camera.position.y = 0;
camera.position.z = 2;
scene.add(camera);

// Lights
const pointLight = new THREE.PointLight(0xffffff, 0.1);
pointLight.position.set(14, 10, 12);
pointLight.intensity = 1;
camera.add(pointLight);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;
controls.dampingFactor = 0.1;

// Renderer
const renderer = new THREE.WebGLRenderer({
    canvas: canvas,
    alpha: true
})
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

document.querySelector('select').addEventListener('change', () => {
    
    const planet = document.querySelector('select').value;
    sphere.material.map = maps[planet].map;
    sphere.material.bumpMap = maps[planet].bumpMap;
});

// Animate
const clock = new THREE.Clock()

const tick = () => {

    // Update objects
    sphere.rotation.y = 0.1 * clock.getElapsedTime();

    // Update Orbital Controls
    controls.update();

    // Render
    renderer.render(scene, camera);

    // Call tick again on the next frame
    window.requestAnimationFrame(tick);
}

tick();
