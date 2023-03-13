import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { EffectComposer } from "./EffectComposer.js";
import { RenderPass } from "./RenderPass.js";
import { DotScreenPass } from "./DotScreenPass.js";
import { GlitchPass } from "./GlitchPass.js";
import { ShaderPass } from "./ShaderPass.js";
import { RGBShiftShader } from "./RGBShiftShader.js";
import { GammaCorrectionShader } from "./GammaCorrectionShader.js";
import { SMAAPass } from "./SMAAPass.js";

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
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const textureLoader = new THREE.TextureLoader();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 2.5;
      child.material.needsUpdate = true;
      child.castShadow = true;
      child.receiveShadow = true;
    }
  });
};

/**
 * Environment map
 */
const environmentMap = cubeTextureLoader.load([
  "./public/textures/environmentMaps/0/px.jpg",
  "./public/textures/environmentMaps/0/nx.jpg",
  "./public/textures/environmentMaps/0/py.jpg",
  "./public/textures/environmentMaps/0/ny.jpg",
  "./public/textures/environmentMaps/0/pz.jpg",
  "./public/textures/environmentMaps/0/nz.jpg",
]);
environmentMap.encoding = THREE.sRGBEncoding;

scene.background = environmentMap;
scene.environment = environmentMap;

/**
 * Models
 */
gltfLoader.load(
  "./public/models/DamagedHelmet/glTF/DamagedHelmet.gltf",
  (gltf) => {
    gltf.scene.scale.set(2, 2, 2);
    gltf.scene.rotation.y = Math.PI * 0.5;
    scene.add(gltf.scene);

    updateAllMaterials();
  }
);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 3, -2.25);
scene.add(directionalLight);

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

  // Update effect composer
  effectComposer.setSize(sizes.width, sizes.height);
  effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
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
camera.position.set(4, 1, -4);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFShadowMap;
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 1.5;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

console.log(renderer.capabilities);

/**
 * Post processing
 */
// Render target
const renderTarget = new THREE.WebGLRenderTarget(800, 600, {
  // const renderTarget = new THREE.WebGLMultisampleRenderTarget(800, 600, {
  // 使用 WebGlMultisampleRenderTarget 确保使用 composer pass 后能够抗锯齿，但现在它已经被移除了··· WebGLMultisampleRenderTarget has been removed. To use multisampling as before, use WebGLRenderTarget and set the new samples property to a value greater 0.
  minFilter: THREE.LinearFilter,
  magFilter: THREE.LinearFilter,
  format: THREE.RGBAFormat,
  encoding: THREE.sRGBEncoding,
});

// Composer
const effectComposer = new EffectComposer(renderer, renderTarget);
effectComposer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
effectComposer.setSize(sizes.width, sizes.height);

// Passes
const renderPass = new RenderPass(scene, camera);
effectComposer.addPass(renderPass);

const gammaCorrection = new ShaderPass(GammaCorrectionShader); // 需要先加 gamma 校正，否则 sRGB Encoding 无效，https://github.com/mrdoob/three.js/issues/24843
effectComposer.addPass(gammaCorrection);

const dotScreenPass = new DotScreenPass();
dotScreenPass.enabled = true;
effectComposer.addPass(dotScreenPass);

const glitchPass = new GlitchPass();
glitchPass.enabled = false;
effectComposer.addPass(glitchPass);

const rgbShiftShader = new ShaderPass(RGBShiftShader);
rgbShiftShader.enabled = true;
effectComposer.addPass(rgbShiftShader);

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  // renderer.render(scene, camera);

  // Update EffectComposer
  effectComposer.render();

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
