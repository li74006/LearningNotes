// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
// import testVertexShader from "./Shaders/test/vertex.glsl";
// import testFragmentShader from "./Shaders/test/fragment.glsl";

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
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);
console.log(geometry.attributes);

// Material
const material = new THREE.ShaderMaterial({
  vertexShader: `
  varying vec2 vUv;

  void main(){
    gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

    vUv = uv;
  }
  `,
  fragmentShader: `
  varying vec2 vUv;
  
  void main(){
    // float strength = vUv.x;
    // float strength = vUv.y;
    // float strength = 1.0 - vUv.x;
    // float strength = vUv.y * 10.0;
    // float strength = mod(vUv.y * 10.0, 1.0); 

    // float strength = mod(vUv.y * 10.0, 1.0); 
    // strength = step(0.5, strength);
    // strength = step(0.8, strength);

    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength -= step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.x * 10.0, 1.0));
    
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // barY *= step(0.8, mod(vUv.x * 10.0, 1.0));

    float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
    barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    barY *= step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));

    float strength = barX + barY;



    gl_FragColor = vec4(strength, strength, strength, 1.0);
  }
  `,
  side: THREE.DoubleSide,
});

// Mesh
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

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
camera.position.set(0.25, -0.25, 1);
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
const tick = () => {
  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
