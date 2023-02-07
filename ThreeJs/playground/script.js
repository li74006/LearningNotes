import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

// Cursor 获取鼠标位置，实现在鼠标移动时转动相机位置
const cursor = {
  x: 0,
  y: 0,
};
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

// create scene
const scene = new THREE.Scene();

// create red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// set sizes
const sizes = {
  width: window.innerWidth,
  height: window.innerHeight,
};

window.addEventListener("resize", () => {
  sizes.width = window.innerWidth;
  sizes.height = window.innerHeight;

  // 更新相机 aspect 并重新渲染，确保窗口更新后画面更新
  camera.aspect = sizes.width / sizes.height;
  camera.updateProjectionMatrix();
  renderer.setSize(sizes.width, sizes.height);
});
// create camera
// PerspectiveCamera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

// OrthographicCamera
// const aspectRatio = sizes.width / sizes.height; // 使用画布的宽高比，纠正 OrthographicCamera 对对象的压缩问题。
// const camera = new THREE.OrthographicCamera(
//   -1 * aspectRatio,
//   1 * aspectRatio,
//   1,
//   -1,
//   0.1,
//   100
// );

// camera.position.x = 2;
// camera.position.y = 2;
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

// clock
let clock = new THREE.Clock();

const tick = () => {
  // clock
  const elapsedTime = clock.getElapsedTime(); // elapsed：经过时间

  // update objects
  // mesh.rotation.y = elapsedTime;

  // update camera 让相机转圈对物体进行拍摄
  // camera.position.x = cursor.x * 3;
  // camera.position.y = -cursor.y * 3;
  // camera.position.x = Math.sin(cursor.x * Math.PI * 2) * 3;
  // camera.position.z = Math.cos(cursor.x * Math.PI * 2) * 3;
  // camera.position.y = cursor.y * 5;

  // camera.lookAt(mesh.position); // 让相机摄像头始终朝向对象的中心拍摄。

  // update controls
  controls.update(); // 要实时更新控制器，否则控制器无效

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
