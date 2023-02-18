// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

// 按 F 全屏
window.addEventListener(
  "keydown",
  (e) => {
    // const fullScreenElement = document.fullscreenElement || document.webkitFullScreenElement; // 为了 safari 适配
    if (e && e.key === "f") {
      if (!document.fullscreenElement) {
        canvas.requestFullscreen();
      } else {
        document.exitFullscreen();
      }
    }
  },
  true
);

// debug --- create dat.gui
const gui = new dat.GUI();
// gui.hide(); // 可默认 gui 面板隐藏
const geoParameters = {
  color: 0xffffff,
  spin: () => {
    gsap.to(mesh.rotation, {
      duration: 1,
      y: mesh.rotation.y + Math.PI * 0.5,
    });
  },
};

/**
 * textures
 */
// // 使用传统方式加载纹理
// const image = new Image();
// const textures = new THREE.Texture(image);
// image.onload = () => {
//   textures.needsUpdate = true; // 图片加载后更新图片
// };
// image.src = "./public/textures/door/color.jpg";

/* 使用 three.js api 加载纹理 */
const loadingManager = new THREE.LoadingManager(); // 先 new 加载管理器

loadingManager.onStart = () => {
  console.log("loadingManager: loading started");
};
loadingManager.onLoad = () => {
  console.log("loadingManager: loading finished");
};
loadingManager.onProgress = () => {
  console.log("loadingManager: loading progressing");
};
loadingManager.onError = () => {
  console.log("loadingManager: loading error");
};

const textureLoader = new THREE.TextureLoader(loadingManager); // 再使用 TextureLoader

// const colorTexture = textureLoader.load('/textures/checkerboard-1024x1024.png')
// const colorTexture = textureLoader.load('/textures/checkerboard-2x2.png')
const colorTexture = textureLoader.load(
  "./public/textures/minecraft.png",
  () => {
    console.log("textureLoader: loading finished");
  },
  () => {
    console.log("textureLoader: loading progressing");
  },
  () => {
    console.log("textureLoader: loading error");
  }
);
colorTexture.wrapS = THREE.MirroredRepeatWrapping;
colorTexture.wrapT = THREE.MirroredRepeatWrapping;
// colorTexture.repeat.x = 2
// colorTexture.repeat.y = 3
// colorTexture.offset.x = 0.5
// colorTexture.offset.y = 0.5
// colorTexture.rotation = Math.PI * 0.25
// colorTexture.center.x = 0.5
// colorTexture.center.y = 0.5
colorTexture.generateMipmaps = false;
colorTexture.minFilter = THREE.NearestFilter;
colorTexture.magFilter = THREE.NearestFilter;

const alphaTexture = textureLoader.load("./public/textures/door/alpha.jpg");
const heightTexture = textureLoader.load("./public/textures/door/height.jpg");
const normalTexture = textureLoader.load("./public/textures/door/normal.jpg");
const ambientOcclusionTexture = textureLoader.load(
  "./public/textures/door/ambientOcclusion.jpg"
);
const metalnessTexture = textureLoader.load(
  "./public/textures/door/metalness.jpg"
);
const roughnessTexture = textureLoader.load(
  "./public/textures/door/roughness.jpg"
);

// create scene
const scene = new THREE.Scene();

// create red cube
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); // 后三个参数是 x y z 轴向的面的分割次数
// const geometry = new THREE.BufferGeometry(); // Geometry 已经被移除了，以后自定义点的几何图形就用 buffer 吧
const material = new THREE.MeshBasicMaterial({
  map: colorTexture,
});
const mesh = new THREE.Mesh(geometry, material);
scene.add(mesh);

// debug --- set gui
gui.add(mesh.position, "y", -3, 3, 0.01).name(" Y 轴移动"); // gui.add(object, property, [min], [max], [step]) ⇒ Controller
gui.add(mesh, "visible");
gui.add(material, "wireframe");
gui.addColor(geoParameters, "color").onChange(() => {
  material.color.set(geoParameters.color); // 再 gui 中调整颜色后，对 material 重新着色
});
gui.add(geoParameters, "spin");

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

// create camera
// PerspectiveCamera
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

const tick = () => {
  // update controls
  controls.update(); // 要实时更新控制器，否则控制器无效

  // update renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
