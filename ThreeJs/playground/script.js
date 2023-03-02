// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("./public/textures/particles/2.png");

/**
 * Galaxy
 */
let parameters = {};
parameters.count = 1000;
parameters.size = 0.02;

// Geometry
const generateGalaxy = () => {
  const positions = new Float32Array(parameters.count * 3);
  const geometry = new THREE.BufferGeometry();
  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;
    positions[i3] = Math.random();
    positions[i3 + 1] = Math.random();
    positions[i3 + 2] = Math.random();
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3) // 3 代表每个顶点有多少数值
  );

  // materials
  const material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
  });
};

generateGalaxy();
// Material

// Points

/**
 * Sizes
 */
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
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

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(
  75,
  sizes.width / sizes.height,
  0.1,
  100
);
camera.position.z = 3;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
