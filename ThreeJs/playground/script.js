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
const portalMaterial = new THREE.ShaderMaterial({
  uniforms: {
    uTime: { value: 0 },
    uColorOuter: { value: new THREE.Color("#7bd93e") },
    uColorInner: { value: new THREE.Color("#48ac28") },
  },

  vertexShader: `
  varying vec2 vUv;

  void main(){
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectionPosition = projectionMatrix * viewPosition;
  
      gl_Position = projectionPosition;
  
      vUv = uv;
  }
  `,

  fragmentShader: `
  uniform float uTime;
  uniform vec3 uColorOuter;
  uniform vec3 uColorInner;

  varying vec2 vUv;

  vec4 permute(vec4 x){ return mod(((x*34.0)+1.0)*x, 289.0); }
  vec4 taylorInvSqrt(vec4 r){ return 1.79284291400159 - 0.85373472095314 * r; }
  vec3 fade(vec3 t) { return t*t*t*(t*(t*6.0-15.0)+10.0); }

  float cnoise(vec3 P){
    vec3 Pi0 = floor(P); // Integer part for indexing
    vec3 Pi1 = Pi0 + vec3(1.0); // Integer part + 1
    Pi0 = mod(Pi0, 289.0);
    Pi1 = mod(Pi1, 289.0);
    vec3 Pf0 = fract(P); // Fractional part for interpolation
    vec3 Pf1 = Pf0 - vec3(1.0); // Fractional part - 1.0
    vec4 ix = vec4(Pi0.x, Pi1.x, Pi0.x, Pi1.x);
    vec4 iy = vec4(Pi0.yy, Pi1.yy);
    vec4 iz0 = Pi0.zzzz;
    vec4 iz1 = Pi1.zzzz;

    vec4 ixy = permute(permute(ix) + iy);
    vec4 ixy0 = permute(ixy + iz0);
    vec4 ixy1 = permute(ixy + iz1);

    vec4 gx0 = ixy0 / 7.0;
    vec4 gy0 = fract(floor(gx0) / 7.0) - 0.5;
    gx0 = fract(gx0);
    vec4 gz0 = vec4(0.5) - abs(gx0) - abs(gy0);
    vec4 sz0 = step(gz0, vec4(0.0));
    gx0 -= sz0 * (step(0.0, gx0) - 0.5);
    gy0 -= sz0 * (step(0.0, gy0) - 0.5);

    vec4 gx1 = ixy1 / 7.0;
    vec4 gy1 = fract(floor(gx1) / 7.0) - 0.5;
    gx1 = fract(gx1);
    vec4 gz1 = vec4(0.5) - abs(gx1) - abs(gy1);
    vec4 sz1 = step(gz1, vec4(0.0));
    gx1 -= sz1 * (step(0.0, gx1) - 0.5);
    gy1 -= sz1 * (step(0.0, gy1) - 0.5);

    vec3 g000 = vec3(gx0.x,gy0.x,gz0.x);
    vec3 g100 = vec3(gx0.y,gy0.y,gz0.y);
    vec3 g010 = vec3(gx0.z,gy0.z,gz0.z);
    vec3 g110 = vec3(gx0.w,gy0.w,gz0.w);
    vec3 g001 = vec3(gx1.x,gy1.x,gz1.x);
    vec3 g101 = vec3(gx1.y,gy1.y,gz1.y);
    vec3 g011 = vec3(gx1.z,gy1.z,gz1.z);
    vec3 g111 = vec3(gx1.w,gy1.w,gz1.w);

    vec4 norm0 = taylorInvSqrt(vec4(dot(g000, g000), dot(g010, g010), dot(g100, g100), dot(g110, g110)));
    g000 *= norm0.x;
    g010 *= norm0.y;
    g100 *= norm0.z;
    g110 *= norm0.w;
    vec4 norm1 = taylorInvSqrt(vec4(dot(g001, g001), dot(g011, g011), dot(g101, g101), dot(g111, g111)));
    g001 *= norm1.x;
    g011 *= norm1.y;
    g101 *= norm1.z;
    g111 *= norm1.w;

    float n000 = dot(g000, Pf0);
    float n100 = dot(g100, vec3(Pf1.x, Pf0.yz));
    float n010 = dot(g010, vec3(Pf0.x, Pf1.y, Pf0.z));
    float n110 = dot(g110, vec3(Pf1.xy, Pf0.z));
    float n001 = dot(g001, vec3(Pf0.xy, Pf1.z));
    float n101 = dot(g101, vec3(Pf1.x, Pf0.y, Pf1.z));
    float n011 = dot(g011, vec3(Pf0.x, Pf1.yz));
    float n111 = dot(g111, Pf1);

    vec3 fade_xyz = fade(Pf0);
    vec4 n_z = mix(vec4(n000, n100, n010, n110), vec4(n001, n101, n011, n111), fade_xyz.z);
    vec2 n_yz = mix(n_z.xy, n_z.zw, fade_xyz.y);
    float n_xyz = mix(n_yz.x, n_yz.y, fade_xyz.x); 

    return 2.2 * n_xyz;
  }

  void main(){

    vec2 displacedUv = vUv + cnoise(vec3(vUv * 5.0, uTime * 0.1));

    float strength = cnoise(vec3(displacedUv * 5.0, uTime * 0.2));

    float outerGlow = distance(vUv, vec2(0.5)) * 5.0 - 1.4;
    strength += sin(outerGlow) * 1.0 ;

    strength += step(-0.1, strength) * 0.9;

    // strength = clamp(strength, 0.0, 1.0);

    vec3 color = mix(uColorOuter, uColorInner, strength);

    gl_FragColor = vec4(color, 1.0);
  }
  `,
});

debugObject.portalColorOuter = "#7bd93e";
debugObject.portalColorInner = "#48ac28";

gui.addColor(debugObject, "portalColorOuter").onChange(() => {
  portalMaterial.uniforms.uColorInner.value.set(debugObject.portalColorOuter);
});
gui.addColor(debugObject, "portalColorInner").onChange(() => {
  portalMaterial.uniforms.uColorOuter.value.set(debugObject.portalColorInner);
});

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
  uniforms: {
    uPixelRatio: { value: Math.min(window.devicePixelRatio, 2) },
    uSize: { value: 200 },
    uTime: { value: 0 },
  },

  vertexShader: `
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

  fragmentShader: `
  void main(){
    float distanceToCenter = distance(gl_PointCoord, vec2(0.5));
    float strength = 0.05 / distanceToCenter - 0.05 * 2.0;

    gl_FragColor = vec4(1.0, 1.0, 1.0, strength);
  }
  `,
});
const fireflies = new THREE.Points(fireflyGeometry, fireflyMaterial);
scene.add(fireflies);

gui.add(fireflyMaterial.uniforms.uSize, "value").min(0).max(200).step(1).name("firefleSize");

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
  portalMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
