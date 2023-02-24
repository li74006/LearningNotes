// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";
import { FontLoader } from "./FontLoader.js";
import { TextGeometry } from "./TextGeometry.js";

/**
 * gui
 */
const gui = new dat.GUI();

// scene
const scene = new THREE.Scene();

/**
 * textureLoader
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();
const matcapTexture = textureLoader.load("./public/textures/matcaps/8.png");

/**
 * textures
 */

/**
 * material
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.4;

/**
 * axes helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * objects
 */

const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material); // THREE.SphereBufferGeometry has been renamed to THREE.SphereGeometry.
sphere.position.x = -1.5;

const plane = new THREE.Mesh(new THREE.BoxGeometry(0.7, 0.7, 0.7), material); // THREE.PlaneBufferGeometry has been renamed to THREE.PlaneGeometry.
const ground = new THREE.Mesh(
  new THREE.PlaneGeometry(6, 6, 100, 100),
  material
);
ground.rotation.x = Math.PI * -0.5;
ground.position.y = -1.5;

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128), // THREE.TorusBufferGeometry has been renamed to THREE.TorusGeometry.
  material
);
torus.position.x = 1.5;

scene.add(sphere, plane, torus, ground);

/**
 * lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.5);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0x00fffc, 0.3);
directionalLight.position.set(1, 0.25, 0);
scene.add(directionalLight);

const hemisphereLight = new THREE.HemisphereLight(0xff0000, 0x0000ff, 0.3); // 用于蓝天绿草的环境光效
scene.add(hemisphereLight);

const pointLight = new THREE.PointLight(0xff9000, 0.5, 10, 2);
pointLight.position.set(1, -0.5, 1);
scene.add(pointLight);

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 5, 1, 1);
scene.add(rectAreaLight);

// set sizes
const sizes = {
  // 获取 window 宽高为全屏显示做准备
  width: window.innerWidth,
  height: window.innerHeight,
};

// 监听 window 尺寸变化，更新相机 aspect 并重新渲染
window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // 在 window 尺寸更新后，更新 camera aspect 并重新渲染，确保窗口更新后画面更新
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();

  // update renderer
  renderer.setSize(sizes.width, sizes.height);
  renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2)); // 获取显示器像素比率并将其限制屏幕像素比率在 2 以内，放在该位置可以使页面在扩展显示器间拖动时，实时监测显示器像素比率
});

// camera

const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

// create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // 键值跟变量名相同的时候可以省略变量名
});

// controls
const controls = new OrbitControls(camera, canvas); // 给 camera 和 canvas 添加 轨道控制 类型的 controls
controls.enableDamping = true; // 给控制器开启阻尼

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

let clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime(); // elapsed：经过时间

  sphere.rotation.x = elapsedTime * 0.2;
  plane.rotation.x = elapsedTime * 0.2;
  torus.rotation.x = elapsedTime * 0.2;

  sphere.rotation.y = elapsedTime * 0.2;
  plane.rotation.y = elapsedTime * 0.2;
  torus.rotation.y = elapsedTime * 0.2;

  // update controls
  controls.update(); // 要实时更新控制器，否则控制器无效

  // update renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
