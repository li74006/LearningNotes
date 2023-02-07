## Three.JS

### P3 : Basic Scene

4 lements to get started

1. Scene contain objects;
2. Some objects;
3. A camera;
4. A renderer.

```js
// create scene
const scene = new THREE.Scene();

// create red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// set sizes
const sizes = {
  width: 800,
  height: 600,
};

// create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

// create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // 键值跟变量名相同的时候可以省略变量名
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
```

### P4 : Webpack

### P5 : Transform Objects

4 properities to transform objects:

1. positions;
2. scale;
3. rotation;
4. quaternion(四元).

mesh.position.x = 1;

> .x // 默认向右移动。
> .y // 默认向上移动。
> .z // 默认向前移动。
> .set(x, y, z) // 同时设置三个坐标值。
> .length() // 对象中心点距空间中心的距离。
> .lengthTo( camera ) // 对象中心点距 camera 的距离。
> .normalize() // Convert this vector to a unit vector - that is, sets it equal to a vector with the same direction as this one, but length 1.
>
> > 只要将其放在渲染前都能执行。

```js
// 添加辅助坐标系
const axesHelper = new THREE.AxesHelper(3); // 可以填入辅助坐标系坐标轴长度，默认为 1 单位。
scene.add(axesHelper);

// scale
mesh.scale.x = 1;
mesh.scale.y = 1;
mesh.scale.z = 1;
mesh.scale.set(x, y, z); // 与 mesh.position 同理。

// rotation
mesh.rotation.reorder("XYZ"); // 改变 x y z 轴的旋转顺序。
mesh.rotation.x = Math.PI * 0.5;
mesh.rotation.y = Math.PI * 0.25; // 注意：rotation 旋转时，该对象的坐标系也会同时跟着旋转，延 x 轴旋转后，y 轴的位置也会同时旋转。

// 将 camera 看向某个对象的几何中心
camera.lookAt(mesh.position);

// 创建 组
const group = new THREE.Group();
scene.add(group); // 把 组 添加的场景中。
// 同样可以对 group 使用 .position .scale .rotation 等。
```

本节代码 :

```js
// create scene
const scene = new THREE.Scene();

// create red cube
const cube1 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "red" })
);
const cube2 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: "blue" })
);
const cube3 = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial({ color: 0x00ff00 })
);

const group = new THREE.Group();
group.add(cube1, cube2, cube3);

cube1.position.x = 1;
cube2.position.y = 1.5;
cube3.position.x = -1;
group.position.y = -0.5;

scene.add(group);

// add axesHelper
const axesHelper = new THREE.AxesHelper(2);
scene.add(axesHelper);

// set sizes
const sizes = {
  width: 800,
  height: 600,
};

// create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

// create renderer
const canvas = document.querySelector(".webgl");
console.log(canvas);
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // 键值跟变量名相同的时候可以省略变量名
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);
```

### P6 : Animations

本节代码 :

```js
// create scene
const scene = new THREE.Scene();

// create red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

// set sizes
const sizes = {
  width: 800,
  height: 600,
};

// create camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height);

camera.position.z = 3;
scene.add(camera);

// create renderer
const canvas = document.querySelector(".webgl");
const renderer = new THREE.WebGLRenderer({
  canvas: canvas, // 键值跟变量名相同的时候可以省略变量名
});

renderer.setSize(sizes.width, sizes.height);
renderer.render(scene, camera);

// 解决显示器刷新率不同导致的转速不同问题
// // 方法一 ：time
// let time = Date.now();

// 方法二 ：clock
let clock = new THREE.Clock();

// 使用 gsap 添加动画
// gsap.to(mesh.position, { duration: 1, delay: 1, x: 2 });
// gsap.to(mesh.position, { duration: 1, delay: 2, x: 0 });

// animation

const tick = () => {
  // // 方法一 ：time
  // const currentTime = Date.now(); // 当前帧的时间戳
  // const deltaTime = currentTime - time; // 当前帧与上一帧的时间差，这是为了解决在不统刷新率的显示器上，能让对象保持相同的转速。

  // time = currentTime; // 更新上一帧的时间戳
  // console.log(deltaTime);

  // // update objects
  // mesh.rotation.y += 0.001 * deltaTime;

  // 方法二 ：clock
  const elapsedTime = clock.getElapsedTime(); // elapsed：经过时间

  // update objects
  mesh.rotation.y = elapsedTime;
  // mesh.rotation.y = elapsedTime * Math.PI * 2;
  // camera.position.y = Math.sin(elapsedTime);
  // camera.position.x = Math.cos(elapsedTime);

  // camera.lookAt(mesh.position); // 让相机摄像头始终朝向对象的中心拍摄。

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
```

### P7 : Cameras

Cameras :

1. ArrayCamera : can be used in order to efficiently render a scene with a predefined set of cameras.
2. StereoCamera(立体摄像机) : Dual PerspectiveCameras used for effects such as 3D Anaglyph or Parallax Barrier.
3. CubeCamera : Creates 6 cameras that render to a WebGLCubeRenderTarget.
4. OrthographicCamera : In this projection mode, an object's size in the rendered image stays constant regardless of its distance from the camera.
5. PerspectiveCamera : This projection mode is designed to mimic the way the human eye sees. It is the most common projection mode used for rendering a 3D scene.

> PerspectiveCamera( fov : Number, aspect : Number, near : Number, far : Number )
> fov — Camera frustum vertical field of view.
> aspect — Camera frustum aspect ratio.
> near — Camera frustum near plane.
> far — Camera frustum far plane.

> OrthographicCamera( left : Number, right : Number, top : Number, bottom : Number, near : Number, far : Number )
> left — Camera frustum left plane.
> right — Camera frustum right plane.
> top — Camera frustum top plane.
> bottom — Camera frustum bottom plane.
> near — Camera frustum near plane.
> far — Camera frustum far plane.

Controls :

1. FlyControls : enables a navigation similar to fly modes in DCC tools like Blender.
2. FirstPersonControls : This class is an alternative implementation of FlyControls.
3. PointerLockControls : The implementation of this class is based on the Pointer Lock API. PointerLockControls is a perfect choice for first person 3D games.
4. OrbitControl : Orbit controls allow the camera to orbit around a target.
5. TrackballControls : TrackballControls is similar to OrbitControls. However, it does not maintain a constant camera up vector. That means if the camera orbits over the “north” and “south” poles, it does not flip to stay "right side up".
6. TransformControls : This class can be used to transform objects in 3D space by adapting a similar interaction model of DCC tools like Blender.

本节代码 :

```js
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
  width: 800,
  height: 600,
};

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
```

### P8 : Fullscreen and Resizing
