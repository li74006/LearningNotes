// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";
import { PointLight } from "./three.module.js";

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

const doorColorTexture = textureLoader.load("./public/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./public/textures/door/alpha.jpg");
const matcapTexture = textureLoader.load("./public/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./public/textures/gradients/5.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./public/textures/door/ambientOcclusion.jpg"
);
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

/**
 * textures
 */
// const material = new THREE.MeshBasicMaterial();
// material.map = doorColorTexture;
// // material.color.set("pink"); // 或 material.color = new THREE.Color('pink')
// // material.opacity = 0.5; // 必须和 transparent 一起用才有效果
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.side = THREE.DoubleSide; // 或 THREE.BackSide

// const material = new THREE.MeshNormalMaterial(); // 用来显示每个面的法向，从而判断关照反射等效果产生哪些影响
// // material.wireframe = true;
// // material.flatShading = true;

// const material = new THREE.MeshMatcapMaterial();  // matcap 材质捕获
// material.matcap = matcapTexture;

// const material = new THREE.MeshDepthMaterial(); // 相机距离对象越近，对象越白，反之越黑

// const material = new THREE.MeshLambertMaterial();

// const material = new THREE.MeshPhongMaterial();
// material.shininess = 1000; // 效果类似于表面粗糙度，数值越大越光滑
// material.specular = new THREE.Color(0xff0000); // 修改材质反光颜色

// const material = new THREE.MeshToonMaterial(); // 卡通效果
// material.gradientMap = gradientTexture;

const material = new THREE.MeshStandardMaterial();
material.metalness = 0.4;
material.roughness = 0.2;
material.map = doorColorTexture;
material.aoMap = doorAmbientOcclusionTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);

/**
 * objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 16, 16), material); // THREE.SphereBufferGeometry has been renamed to THREE.SphereGeometry.
sphere.position.x = -1.5;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1), material); // THREE.PlaneBufferGeometry has been renamed to THREE.PlaneGeometry.
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 16, 32), // THREE.TorusBufferGeometry has been renamed to THREE.TorusGeometry.
  material
);
torus.position.x = 1.5;
torus.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(torus.geometry.attributes.uv.array, 2)
);

scene.add(sphere, plane, torus);

/**
 * lights
 */

const ambientLight = new THREE.AmbientLight(0xffffff, 0.5); // ambient 环境（应该就是环境光的意思）
scene.add(ambientLight);

const pointLight = new THREE.PointLight(0xffffff, 0.5);
pointLight.position.x = 2;
pointLight.position.y = 3;
pointLight.position.z = 4;
scene.add(pointLight);

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

  // update objects
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
