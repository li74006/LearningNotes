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
  #define PI 3.1415926535897932384626433832795

  varying vec2 vUv;

  float random(vec2 st){
    return fract(sin(dot(st.xy, vec2(12.9898,78.233))) * 43758.5453123);
  }

  vec2 rotate(vec2 uv, float rotation, vec2 mid)
  {
    return vec2(
      cos(rotation) * (uv.x - mid.x) + sin(rotation) * (uv.y - mid.y) + mid.x,
      cos(rotation) * (uv.y - mid.y) - sin(rotation) * (uv.x - mid.x) + mid.y
    );
  }
  
  void main(){
    // float strength = vUv.x;
    // float strength = vUv.y;
    // float strength = 1.0 - vUv.x;
    // float strength = vUv.y * 10.0;
    // float strength = mod(vUv.y * 10.0, 1.0); // mod 求余函数

    // float strength = mod(vUv.y * 10.0, 1.0);
    // strength = step(0.5, strength); // step 大于 0.5 就是 1，小于就是 0
    // strength = step(0.8, strength);

    // float strength = step(0.8, mod(vUv.y * 10.0, 1.0));
    // strength += step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength -= step(0.8, mod(vUv.x * 10.0, 1.0));
    // strength *= step(0.8, mod(vUv.x * 10.0, 1.0));
    
    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0, 1.0));
    // barY *= step(0.8, mod(vUv.x * 10.0, 1.0));

    // float barX = step(0.4, mod(vUv.x * 10.0, 1.0));
    // float barY = step(0.4, mod(vUv.y * 10.0, 1.0));
    // barX *= step(0.8, mod(vUv.y * 10.0 + 0.2, 1.0));
    // barY *= step(0.8, mod(vUv.x * 10.0 + 0.2, 1.0));
    // float strength = barX + barY;

    // float strength = abs(vUv.x - 0.5); // abs 绝对值

    // float strength = min(abs(vUv.x - 0.5), abs(vUv.y - 0.5));
    // float strength = max(abs(vUv.x - 0.5), abs(vUv.y - 0.5));

    // float strength = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));

    // float square1 = step(0.2, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float square2 = 1.0 - step(0.25, max(abs(vUv.x - 0.5), abs(vUv.y - 0.5)));
    // float strength = square1 * square2;

    // float strength = floor(vUv.x * 10.0) / 10.0; 
    // strength *= floor(vUv.y * 10.0) / 10.0; 

    // float strength = random(vUv);

    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.y * 10.0) / 10.0);
    // float strength = random(gridUv);
    // vec2 gridUv = vec2(floor(vUv.x * 10.0) / 10.0, floor(vUv.x * 5.0 + vUv.y * 10.0) / 10.0);
    // float strength = random(gridUv);

    // float strength = length(vUv);
    // float strength = length(vUv - 0.5);
    // float strength = 1.0 - length(vUv - 0.5);
    // float strength = distance(vUv, vec2(0.5, 0.5));
    // float strength = 0.015 / distance(vUv, vec2(0.5));
    // float strength = 0.015 / distance(vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25), vec2(0.5));

    // float lightX = 0.015 / distance(vec2(vUv.x * 0.1 + 0.45, vUv.y * 0.5 + 0.25), vec2(0.5));
    // float lightY = 0.015 / distance(vec2(vUv.y * 0.1 + 0.45, vUv.x * 0.5 + 0.25), vec2(0.5));
    // float strength = lightX * lightY;

    // vec2 rotatedUv = rotate(vUv, PI * 0.25, vec2(0.5));
    // float strength = 0.15 / (distance(vec2(rotatedUv.x, (rotatedUv.y - 0.5) * 5.0 + 0.5), vec2(0.5)));
    // strength *= 0.15 / (distance(vec2(rotatedUv.y, (rotatedUv.x - 0.5) * 5.0 + 0.5), vec2(0.5)));

    // float strength = step(0.25, distance(vUv, vec2(0.5)));
    // float strength = abs(distance(vUv, vec2(0.5)) - 0.25);
    // float strength = step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - 0.25));
    // float strength = 1.0 - step(0.01, abs(distance(vec2(vUv.x, vUv.y + sin(vUv.x * 30.0) * 0.1), vec2(0.5)) - 0.25));












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
