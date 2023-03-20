import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { DRACOLoader } from "./DRACOLoader.js";

/**
 * Base
 */
// Debug
const debugObject = {};
const gui = new dat.GUI({
  width: 400,
});

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Loaders
 */
// Texture loader
const textureLoader = new THREE.TextureLoader();

// Draco loader
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./public/draco/");

// GLTF loader
const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader);

/**
 * Testures
 */
const bakedTexture = textureLoader.load("./public/models/Portal/baked.jpg");
bakedTexture.flipY = false; // 禁用 loader 的 texture 翻转，否则贴图位置不对
bakedTexture.encoding = THREE.sRGBEncoding; // 使用 sRGB 编码方式，确保结果跟 blender 渲染出的效果一样

/**
 * Materials
 */

// Baked Material
const bakedMaterial = new THREE.MeshBasicMaterial({ map: bakedTexture });

// Lamp material
const lampMaterial = new THREE.MeshBasicMaterial({ color: 0xffffe5 });

// Portal material
const portalMaterial = new THREE.MeshBasicMaterial({ color: 0xff00ff });

/**
 * Objects
 */
gltfLoader.load("./public/models/Portal/Portal.glb", (gltf) => {
  gltf.scene.traverse((child) => {
    child.material = bakedMaterial;
  });

  // 找出 左右灯柱玻璃 和 传送门，为其单独设置发光材质,但是我的 blender 导出的 左右路灯就是 children 的 children，不知道为啥
  // const lampLeft = gltf.scene.children.find((child) => child.name === "lampLeft");
  // const lampRight = gltf.scene.children.find((child) => child.name === "lampRight");
  const portal = gltf.scene.children.find((child) => child.name === "portal");

  portal.material = portalMaterial;

  scene.add(gltf.scene);
});

// fireflies
const fireflyGeometry = new THREE.BufferGeometry();
const fireflyCount = 30;
const fireflyPositionArray = new Float32Array(fireflyCount * 3);
const fireflyScaleArray = new Float32Array(fireflyCount);

for (let i = 0; i < fireflyCount; i++) {
  fireflyPositionArray[i * 3 + 0] = (Math.random() - 0.5) * 4;
  fireflyPositionArray[i * 3 + 1] = Math.random() * 1.5;
  fireflyPositionArray[i * 3 + 2] = (Math.random() - 0.5) * 4;

  fireflyScaleArray[i] = Math.random();
}

fireflyGeometry.setAttribute("position", new THREE.BufferAttribute(fireflyPositionArray, 3));
fireflyGeometry.setAttribute("aScale", new THREE.BufferAttribute(fireflyScaleArray, 1));

const fireflyMaterial = new THREE.ShaderMaterial({ 
  depthWrite: false, // 不会产生粒子之间的遮挡 bug
  blending: THREE.AdditiveBlending,
  transparent: true,
  uniforms:{
    uPixelRatio:{ value:Math.min(window.devicePixelRatio, 2 )},
    uSize: { value: 200},
    uTime: {value: 0}
  },

  vertexShader:`
  uniform float uPixelRatio;
  uniform float uSize;
  uniform float uTime;

  attribute float aScale;

  void main(){
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);
    modelPosition.y += sin(uTime + modelPosition.x) * aScale * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectionPosition = projectionMatrix * viewPosition;

    gl_Position = projectionPosition;
    gl_PointSize = uSize * aScale * uPixelRatio ; // uPixelRatio 确保不同屏幕间 firefly 大小一致，aScale 随机每个 firefly 大小
    gl_PointSize *= -(1.0 / viewPosition.z);
  }
  `,

  fragmentShader:`
  void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.05 * 2.0;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
  }
  `
});
const fireflies = new THREE.Points(fireflyGeometry, fireflyMaterial);
scene.add(fireflies);

gui.add(fireflyMaterial.uniforms.uSize, 'value').min(0).max(200).step(1).name('firefleSize')

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

  // Update fireflies 保证切换屏幕后，即使 pixeRatio 变化，firefly 大小也能保持一致
  fireflyMaterial.uniforms.uPixelRatio.value = Math.min(window.devicePixelRatio, 2);
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(45, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 4;
camera.position.y = 2;
camera.position.z = 4;
scene.add(camera);

// Controls
const controls = new OrbitControls(camera, canvas);
controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  antialias: true,
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
renderer.outputEncoding = THREE.sRGBEncoding; // 保证渲染器的输出编码方式也是 sRGB

debugObject.clearColor = "#20357a";
renderer.setClearColor(debugObject.clearColor);
gui.addColor(debugObject, "clearColor").onChange(() => {
  renderer.setClearColor(debugObject.clearColor);
});

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update uTime
  fireflyMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
