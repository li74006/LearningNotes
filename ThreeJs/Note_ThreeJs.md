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

> renderer.setPixelRatio ( value : number ) : undefined
> Sets device pixel ratio. This is usually used for HiDPI device to prevent blurring output canvas.

本节代码：

```js
import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
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

// create scene
const scene = new THREE.Scene();

// create red cube
const geometry = new THREE.BoxGeometry(1, 1, 1);
const material = new THREE.MeshBasicMaterial({ color: "red" });
const mesh = new THREE.Mesh(geometry, material);

scene.add(mesh);

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
```

### P9 : Geometries

new THREE.Geometry() 已经被移除了，但通过学习其之前的使用方法了解到，其原理是通过在空间中构造 3 个点并推入一个 vertices 数组中，再将每个点的 index 添加到 new THREE.Face3 并将其 push 进 faces 中，这样 Geometry 中就形成了一个面，Geometry 中可以同时添加许多面，从而构建出一个复杂的几何对象。

### P10 : Debug_UI

可供使用的 UI 库：

1. dat.GUI;
   > H > 隐藏/显示 gui 控制面板。
   > 可用`gui.hide()`默认隐藏 gui 控制面板。
   > 可用`const gui = new GUI({closed:true, width: 400})`默认 gui 面板是折叠状态。
2. control-panel;
3. ControlKit;
4. Gufiy;
5. Oui;

本节代码：

```js
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

// create scene
const scene = new THREE.Scene();

// create red cube
const geometry = new THREE.BoxGeometry(1, 1, 1, 2, 2, 2); // 后三个参数是 x y z 轴向的面的分割次数
// const geometry = new THREE.BufferGeometry(); // Geometry 已经被移除了，以后自定义点的几何图形就用 buffer 吧
const material = new THREE.MeshBasicMaterial({
  color: geoParameters.color,
  // wireframe: true, // 显示透视线框
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
```

### P11 : Textures(纹理)

就相当于把图片覆盖在几何对象的表面上。

本节代码：

```js
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
const metalnessTexture = textureLoader.load("./public/textures/door/metalness.jpg");
const roughnessTexture = textureLoader.load("./public/textures/door/roughness.jpg");

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
```

### P12 : Materials

bookmark : 2023-02-19 P12 听到 9:30。
bookmark : 2023-02-21 P12 听到 36:09。
bookmark : 2023-02-19 P12 听到 60:00。

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";
import { AlphaFormat, PointLight } from "./three.module.js";

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

const doorColorTexture = textureLoader.load("./public/textures/door/color.jpg");
const doorAlphaTexture = textureLoader.load("./public/textures/door/alpha.jpg");
const doorNormalTexture = textureLoader.load("./public/textures/door/normal.jpg");
const doorAmbientOcclusionTexture = textureLoader.load(
  "./public/textures/door/ambientOcclusion.jpg"
);
const doorHeightTexture = textureLoader.load("./public/textures/door/height.jpg");
const doorMetalnessTexture = textureLoader.load("./public/textures/door/metalness.jpg");
const doorRoughnessTexture = textureLoader.load("./public/textures/door/roughness.jpg");
const matcapTexture = textureLoader.load("./public/textures/matcaps/3.png");
const gradientTexture = textureLoader.load("./public/textures/gradients/5.jpg");
gradientTexture.minFilter = THREE.NearestFilter;
gradientTexture.magFilter = THREE.NearestFilter;
gradientTexture.generateMipmaps = false;

const enviormentMapTexture = cubeTextureLoader.load([
  "./public/textures/environmentMaps/0/px.jpg",
  "./public/textures/environmentMaps/0/py.jpg",
  "./public/textures/environmentMaps/0/pz.jpg",
  "./public/textures/environmentMaps/0/nx.jpg",
  "./public/textures/environmentMaps/0/ny.jpg",
  "./public/textures/environmentMaps/0/nz.jpg",
]);

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
// material.map = doorColorTexture;
// material.aoMap = doorAmbientOcclusionTexture; // Ambient Occlusion 环境遮挡
// material.aoMapIntensity = 1; // intensity 强度
// material.displacementMap = doorHeightTexture; // displacement 位移
// material.displacementScale = 0.05; // 位移缩放
// material.metalnessMap = doorMetalnessTexture;
// material.roughnessMap = doorRoughnessTexture;
// material.normalMap = doorNormalTexture;
// material.normalScale.set(0.5, 0.5);
// material.transparent = true;
// material.alphaMap = doorAlphaTexture;
// material.color = new THREE.Color("gold");
material.envMap = enviormentMapTexture;

gui.add(material, "metalness").min(0).max(1).step(0.0001);
gui.add(material, "roughness").min(0).max(1).step(0.0001);
gui.add(material, "displacementScale").min(0).max(1).step(0.0001);

/**
 * objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 64, 64), material); // THREE.SphereBufferGeometry has been renamed to THREE.SphereGeometry.
sphere.position.x = -1.5;
sphere.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(sphere.geometry.attributes.uv.array, 2)
);

const plane = new THREE.Mesh(new THREE.PlaneGeometry(1, 1, 100, 100), material); // THREE.PlaneBufferGeometry has been renamed to THREE.PlaneGeometry.
plane.geometry.setAttribute(
  "uv2",
  new THREE.BufferAttribute(plane.geometry.attributes.uv.array, 2)
);

const torus = new THREE.Mesh(
  new THREE.TorusGeometry(0.3, 0.2, 64, 128), // THREE.TorusBufferGeometry has been renamed to THREE.TorusGeometry.
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
  // sphere.rotation.x = elapsedTime * 0.2;
  // plane.rotation.x = elapsedTime * 0.2;
  // torus.rotation.x = elapsedTime * 0.2;

  // sphere.rotation.y = elapsedTime * 0.2;
  // plane.rotation.y = elapsedTime * 0.2;
  // torus.rotation.y = elapsedTime * 0.2;

  // update controls
  controls.update(); // 要实时更新控制器，否则控制器无效

  // update renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
```

bookmark : 2023-02-22 P12 完成。

### P13 : 3D Text

本节代码：

```js
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
const matcapTexture = textureLoader.load("./public/textures/matcaps/7.png");

/**
 * textures
 */

/**
 * fonts
 */
const fontLoader = new FontLoader();
fontLoader.load("./helvetiker_regular.typeface.json", (font) => {
  const textGeometry = new TextGeometry("Hello lanlan", {
    font,
    size: 0.5,
    height: 0.2,
    surveSegments: 5,
    bevelEnabled: true,
    bevelThickness: 0.03,
    bevelSize: 0.02,
    bevelOffset: 0,
    bevelSegment: 4,
  });

  // 将文字居中
  // textGeometry.computeBoundingBox();
  // textGeometry.translate(
  //   -(textGeometry.boundingBox.max.x - 0.02) * 0.5, // x y 都减去 bevelSize
  //   -(textGeometry.boundingBox.max.y - 0.02) * 0.5,
  //   -(textGeometry.boundingBox.max.z - 0.03) * 0.5 // z 减去 bevelThickness
  // ); // 将文字最外面包裹的 boundingBox 最大 x y z 都挪动一半
  // 或
  textGeometry.center(); // 就可以解决掉上面的一大堆问题

  // const textMaterial = new THREE.MeshBasicMaterial({ wireframe: true });
  const material = new THREE.MeshMatcapMaterial({ matcap: matcapTexture });

  const text = new THREE.Mesh(textGeometry, material);
  scene.add(text);

  const donutGeometry = new THREE.TorusGeometry(0.3, 0.2, 20, 45);

  for (let i = 0; i < 500; i++) {
    const donut = new THREE.Mesh(donutGeometry, material);
    donut.position.x = (Math.random() - 0.5) * 100;
    donut.position.y = (Math.random() - 0.5) * 100;
    donut.position.z = (Math.random() - 0.5) * 100;
    donut.rotation.x = Math.PI * Math.random();
    donut.rotation.y = Math.PI * Math.random();
    donut.rotation.z = Math.PI * Math.random();
    const scale = Math.random();
    donut.scale.set(scale, scale, scale);
    scene.add(donut);
  }
});

/**
 * axes helper
 */
// const axesHelper = new THREE.AxesHelper();
// scene.add(axesHelper);

/**
 * objects
 */

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

  // update controls
  controls.update(); // 要实时更新控制器，否则控制器无效

  // update renderer
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
```

bookmark : 2023-02-23 P13 完成。

### P14 : Live (用的 Vercel)

### P15 : Lights

bookmark : 2023-02-24 P15 听到 21:00。

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";
import { RectAreaLightHelper } from "./RectAreaLightHelper.js";

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
const ground = new THREE.Mesh(new THREE.PlaneGeometry(6, 6, 100, 100), material);
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

const rectAreaLight = new THREE.RectAreaLight(0x4e00ff, 2, 3, 6);
rectAreaLight.position.set(-1.5, 0, 1.5);
rectAreaLight.lookAt(new THREE.Vector3());
scene.add(rectAreaLight);

const spotLight = new THREE.SpotLight(0x78ff00, 0.5, 10, Math.PI * 0.1, 0.25, 1);
spotLight.position.set(0, 2, 3);
scene.add(spotLight);
spotLight.target.position.x = -0.75;
scene.add(spotLight.target);

// light helper
const hemisphereLightHelper = new THREE.HemisphereLightHelper(hemisphereLight, 0.1);
scene.add(hemisphereLightHelper);

const spotLightHelper = new THREE.SpotLightHelper(spotLight);
scene.add(spotLightHelper);

const rectAreaLightHelper = new RectAreaLightHelper(rectAreaLight);
scene.add(rectAreaLightHelper);

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
```

### P16 : Shadows

bookmark : 2023-02-27 P16 听到 42:35。

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const bakedShadow = textureLoader.load("./public/textures/shadows/bakedShadow.jpg");

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
 * Lights
 */
// Ambient light
const ambientLight = new THREE.AmbientLight(0xffffff, 0.3);
gui.add(ambientLight, "intensity").min(0).max(1).step(0.001);
scene.add(ambientLight);

// Directional light
const directionalLight = new THREE.DirectionalLight(0xffffff, 0.4);
directionalLight.position.set(2, 2, -1);
gui.add(directionalLight, "intensity").min(0).max(1).step(0.001);
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001);
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001);
scene.add(directionalLight);

directionalLight.castShadow = true; // 方向光启用阴影投射
directionalLight.shadow.mapSize.width = 1024;
directionalLight.shadow.mapSize.height = 1024;
directionalLight.shadow.camera.top = 2;
directionalLight.shadow.camera.right = 2;
directionalLight.shadow.camera.bottom = -2;
directionalLight.shadow.camera.left = -2;
directionalLight.shadow.camera.near = 1;
directionalLight.shadow.camera.far = 6;
// directionalLight.shadow.radius = 10;

const directionalLightCameraHelper = new THREE.CameraHelper(
  directionalLight.shadow.camera
);
directionalLightCameraHelper.visible = false;
scene.add(directionalLightCameraHelper);

// Spot Light
const spotLight = new THREE.SpotLight(0xffffff, 0.4, 10, Math.PI * 0.3);
spotLight.castShadow = true;
spotLight.shadow.mapSize.width = 1024;
spotLight.shadow.mapSize.height = 1024;
spotLight.shadow.fav = 30;
spotLight.shadow.near = 1;
spotLight.shadow.far = 6;
spotLight.position.set(0, 2, 2);
scene.add(spotLight);
scene.add(spotLight.target);

const spotLightCameraHelper = new THREE.CameraHelper(spotLight.shadow.camera);
spotLightCameraHelper.visible = false;
scene.add(spotLightCameraHelper);

// Point Light
const pointLight = new THREE.PointLight(0xffffff, 0.3);
pointLight.castShadow = true;
pointLight.shadow.mapSize.width = 1024;
pointLight.shadow.mapSize.height = 1024;
pointLight.shadow.camera.near = 0.1;
pointLight.shadow.camera.far = 5;

pointLight.position.set(-1, 1, 0);
scene.add(pointLight);

const pointLightCameraHelper = new THREE.CameraHelper(pointLight.shadow.camera);
pointLightCameraHelper.visible = false;
scene.add(pointLightCameraHelper);

/**
 * Materials
 */
const material = new THREE.MeshStandardMaterial();
material.roughness = 0.7;
gui.add(material, "metalness").min(0).max(1).step(0.001);
gui.add(material, "roughness").min(0).max(1).step(0.001);

/**
 * Objects
 */
const sphere = new THREE.Mesh(new THREE.SphereGeometry(0.5, 32, 32), material);
sphere.castShadow = true; // 启用阴影投射

const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(5, 5),
  new THREE.MeshBasicMaterial({ map: bakedShadow })
);
plane.rotation.x = -Math.PI * 0.5;
plane.position.y = -0.5;
plane.receiveShadow = true; // 启用阴影接收

scene.add(sphere, plane);

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 1;
camera.position.y = 1;
camera.position.z = 2;
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

renderer.shadowMap.enabled = true; // 启用渲染器阴影处理
renderer.shadowMap.type = THREE.PCFSoftShadowMap; // 当使用这种 shadowMap 时，shadow.radius 不起作用

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

最后一种阴影感觉不是特别真实所以没有加入进去。

### P17 : Haunted House

bookmark : 2023-02-28 P17 听完。二月的最后一天，三月就学就干就行！！！🤑

### P18 : Particles

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("./public/textures/particles/2.png");

/**
 * Particles
 */

// Geometry
const particlesGeometry = new THREE.BufferGeometry(1, 32, 32);
const count = 5000;

const positions = new Float32Array(count * 3);
const colors = new Float32Array(count * 3);
for (let i = 0; i < count * 3; i++) {
  positions[i] = (Math.random() - 0.5) * 10;
  colors[i] = Math.random();
}

particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
particlesGeometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));

const cube = new THREE.Mesh(
  new THREE.BoxGeometry(1, 1, 1),
  new THREE.MeshBasicMaterial()
);
scene.add(cube);

// Material
const particlesMaterial = new THREE.PointsMaterial({
  size: 0.2,
  sizeAttenuation: true, // Attenuation 衰减
  transparent: true,
  alphaMap: particleTexture,
  // color: "orange",
  // alphaTest: 0.1, // 相当于改变对黑度的渲染度，数值越大，对黑度小的像素越不会渲染
  // depthTest: false, // 关闭深度检测，但是如果场景中有其他元素会产生 bug，但是可以用作传送门效果~
  depthWrite: false,
  blending: THREE.AdditiveBlending, // 粒子重叠部分，颜色会混合
  vertexColors: true,
});

// Points
const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  // particles.rotation.y = elapsedTime * 0.01;
  for (let i = 0; i < count; i++) {
    const i3 = i * 3;
    const x = particlesGeometry.attributes.position.array[i3];
    const y = particlesGeometry.attributes.position.array[i3 + 1];
    const z = particlesGeometry.attributes.position.array[i3 + 2];
    particlesGeometry.attributes.position.array[i3 + 1] = Math.sin(
      elapsedTime * 0.8 + x + z // 设想一下每排点到 x y 或 z 轴的单独距离基本都是一样的，从而每排点升降的补偿值都基本一样，从而产生波浪效果
    );
  }
  particlesGeometry.attributes.position.needsUpdate = true; // 要开启位置更新，才能显示动画

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-02 P18 听完，波浪产生的原因也想明白了！(๑•̀ㅂ•́)و✧

### P19 : Galaxy Generator

bookmark : 2023-03-02 P19 听了十多分钟，那边渲染 Beach，结果就崩溃了，回家！

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const particleTexture = textureLoader.load("./public/textures/particles/2.png");

/**
 * Galaxy
 */
let parameters = {};
parameters.count = 100000;
parameters.size = 0.01;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.2;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

// Geometry
const generateGalaxy = () => {
  if (points) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);

  const colorInside = new THREE.Color(parameters.insideColor);
  const colorOutside = new THREE.Color(parameters.outsideColor);

  geometry = new THREE.BufferGeometry();

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    const radius = Math.random() * parameters.radius;

    const spinAngle = radius * parameters.spin;
    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    positions[i3] = Math.cos(branchAngle + spinAngle) * radius + randomX;
    positions[i3 + 1] = randomY;
    positions[i3 + 2] = Math.sin(branchAngle + spinAngle) * radius + randomZ;

    const mixedColor = colorInside.clone();
    mixedColor.lerp(colorOutside, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;
  }

  geometry.setAttribute(
    "position",
    new THREE.BufferAttribute(positions, 3) // 3 代表每个顶点有多少数值
  );
  geometry.setAttribute(
    "color",
    new THREE.BufferAttribute(colors, 3) // 3 代表每个顶点有多少数值
  );

  // materials
  material = new THREE.PointsMaterial({
    size: parameters.size,
    sizeAttenuation: true,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,
  });

  points = new THREE.Points(geometry, material);
  scene.add(points);
};

generateGalaxy();

gui
  .add(parameters, "count")
  .min(100)
  .max(100000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "size")
  .min(0.001)
  .max(0.1)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.add(parameters, "radius").min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameters, "branches").min(1).max(30).step(1).onFinishChange(generateGalaxy);
gui.add(parameters, "spin").min(-5).max(5).step(0.05).onFinishChange(generateGalaxy);
gui.add(parameters, "randomness").min(0).max(2).step(0.01).onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(0)
  .max(10)
  .step(0.01)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

// Points

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-03 0:36 P19 听完。卧槽都是数据公式，真的想不明白了，明天地铁就看公式琢磨吧 🤣

### P20 : Raycaster

本届代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

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
 * Objects
 */
const object1 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object1.position.x = -2;

const object2 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);

const object3 = new THREE.Mesh(
  new THREE.SphereGeometry(0.5, 16, 16),
  new THREE.MeshBasicMaterial({ color: "#ff0000" })
);
object3.position.x = 2;

scene.add(object1, object2, object3);

/**
 * Raycaster
 */
const raycaster = new THREE.Raycaster();

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
 * Mouse
 */
const mouse = new THREE.Vector2();
window.addEventListener("mousemove", (e) => {
  mouse.x = (e.clientX / sizes.width) * 2 - 1;
  mouse.y = -(e.clientY / sizes.height) * 2 + 1;
});

window.addEventListener("click", () => {
  if (currentIntersect) {
    if (currentIntersect.object === object1) {
      console.log("click obj1");
    } else if (currentIntersect.object === object2) {
      console.log("click obj2");
    } else if (currentIntersect.object === object3) {
      console.log("click obj3");
    }
  }
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 3;
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
const clock = new THREE.Clock();

let currentIntersect = null;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  object1.position.y = Math.sin(elapsedTime * 0.3) * 1.5;
  object2.position.y = Math.cos(elapsedTime * 0.3) * 1.5;
  object3.position.y = Math.sin(elapsedTime * 0.3) * 1.5;

  raycaster.setFromCamera(mouse, camera);

  // const rayOrigin = new THREE.Vector3(-3, 0, 0);
  // const rayDirection = new THREE.Vector3(1, 0, 0);
  // rayDirection.normalize();
  // raycaster.set(rayOrigin, rayDirection);

  const objectsToTest = [object1, object2, object3];
  const intersects = raycaster.intersectObjects(objectsToTest);

  if (intersects.length) {
    if (currentIntersect === null) {
      console.log("mouse enter");
    }
    currentIntersect = intersects[0];
  } else {
    if (currentIntersect) {
      console.log("mouse leave");
    }
    currentIntersect = null;
  }

  for (const obj of objectsToTest) {
    obj.material.color.set("#ff0000");
  }

  for (const intersect of intersects) {
    intersect.object.material.color.set("#0000ff");
  }

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-03 P20 完成。这节主要就是射线照射到物体，并判断是否照射到，迷糊 💀

### P21 : Scroll Based Animatiom

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI();

let parameters = {};
parameters.color = "#ffeded";

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Objects
 */
// const cube = new THREE.Mesh(
//   new THREE.BoxGeometry(),
//   new THREE.MeshBasicMaterial({
//     color: "red",
//   })
// );

// Materials
const textureLoader = new THREE.TextureLoader();
const gradientTexture = textureLoader.load("./public/textures/gradients/3.jpg");
gradientTexture.magFilter = THREE.NearestFilter;

const material = new THREE.MeshToonMaterial({
  color: parameters.color,
  gradientMap: gradientTexture,
});

const objectsDistance = 4;

const mesh1 = new THREE.Mesh(new THREE.TorusGeometry(1, 0.4, 16, 60), material);
const mesh2 = new THREE.Mesh(new THREE.ConeGeometry(1, 2, 32), material);
const mesh3 = new THREE.Mesh(new THREE.TorusKnotGeometry(0.8, 0.35, 100, 16), material);

mesh2.position.y = -objectsDistance * 1;
mesh3.position.y = -objectsDistance * 2;

mesh1.position.x = 2;
mesh2.position.x = -2;
mesh3.position.x = 2;

scene.add(mesh1, mesh2, mesh3);

const sectionMeshs = [mesh1, mesh2, mesh3];

const particlesCount = 2000;
const positions = new Float32Array(particlesCount * 3);

for (let i = 0; i < particlesCount; i++) {
  positions[i * 3] = (Math.random() - 0.5) * 10;
  positions[i * 3 + 1] =
    objectsDistance * 0.5 - Math.random() * objectsDistance * sectionMeshs.length;
  positions[i * 3 + 2] = (Math.random() - 0.5) * 10;
}

const particlesGeometry = new THREE.BufferGeometry();
particlesGeometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));

const particlesMaterial = new THREE.PointsMaterial({
  color: parameters.color,
  sizeAttenuation: true,
  size: 0.03,
});

const particles = new THREE.Points(particlesGeometry, particlesMaterial);
scene.add(particles);
/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 1);
directionalLight.position.set(1, 1, 0);
scene.add(directionalLight);

/**
 * gui
 */
gui.addColor(parameters, "color").onChange(() => {
  material.color.set(parameters.color);
  particlesMaterial.color.set(parameters.color);
});

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
 * Scroll
 */
let scrollY = window.scrollY;
let currentSection = 0;

window.addEventListener("scroll", () => {
  scrollY = window.scrollY;

  const newSection = Math.round(scrollY / sizes.height);
  if (newSection !== currentSection) {
    currentSection = newSection;
    gsap.to(sectionMeshs[currentSection].rotation, {
      duration: 1.5,
      ease: "power2.inOut",
      x: "+=6",
      y: "+=3",
      z: "+=1.5",
    });
  }
});

/**
 * Cursor
 */
const cursor = {};
cursor.x = 0;
cursor.y = 0;
window.addEventListener("mousemove", (e) => {
  cursor.x = e.clientX / sizes.width - 0.5;
  cursor.y = e.clientY / sizes.height - 0.5;
});

/**
 * Camera
 */
const cameraGroup = new THREE.Group();
scene.add(cameraGroup);
// Base camera
const camera = new THREE.PerspectiveCamera(35, sizes.width / sizes.height, 0.1, 100);
camera.position.z = 6;
cameraGroup.add(camera);

// Controls
// const controls = new OrbitControls(camera, canvas);
// controls.enableDamping = true;

/**
 * Renderer
 */
const renderer = new THREE.WebGLRenderer({
  canvas: canvas,
  alpha: true, // canvas 背景色变为透明
});
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

let previousTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - previousTime;
  previousTime = elapsedTime; // 解决不同屏幕刷新率不同导致的 easing 速度不一致问题

  camera.position.y = (-scrollY / sizes.height) * objectsDistance;

  const parallaxX = cursor.x * 0.3;
  const parallaxY = -cursor.y * 0.3;
  cameraGroup.position.y += (parallaxY - cameraGroup.position.y) * deltaTime;
  cameraGroup.position.x += (parallaxX - cameraGroup.position.x) * deltaTime;

  for (const mesh of sectionMeshs) {
    mesh.rotation.x += deltaTime * 0.1;
    mesh.rotation.y += deltaTime * 0.12;
  }

  // Update controls
  // controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-03 P21 完成。

### P21 : Physics

3D physics libraries

1. Ammo.js
2. Cannon.js
3. Oimo.js

3D physics libraries

1. Matter.js
2. P2.js
3. Planck.js
4. Box2D.js

bookmark : 2023-03-04 P22 听到 30min，操过点了，没 push 到今天！！！

Physijs 这个库也行。
Cannon-es 是 Cannon.js 的 folk，可以接着用~

bookmark : 2023-03-05 P22 终于听完了，快了，就快熬出头了！👺

### P23 : Imported Models

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";
import { DRACOLoader } from "./DRACOLoader.js";

/**
 * Debug
 */
/**
 * Debug
 */
const gui = new dat.GUI();

/**
 * Base
 */
// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Models
 */
const dracoLoader = new DRACOLoader();
dracoLoader.setDecoderPath("./public/draco");

const gltfLoader = new GLTFLoader();
gltfLoader.setDRACOLoader(dracoLoader); // 大文件时使用 draco 提高性能

let mixer = null;

gltfLoader.load("./public/models/Fox/glTF/Fox.gltf", (gltf) => {
  console.log(gltf);
  // scene.add(gltf.scene.children[0]);
  // for (const child of gltf.scene.children) {
  //   scene.add(child);
  // }

  // scene.add(...gltf.scene.children);

  mixer = new THREE.AnimationMixer(gltf.scene);
  const action = mixer.clipAction(gltf.animations[0]);
  action.play();

  gltf.scene.scale.set(0.025, 0.025, 0.025);
  scene.add(gltf.scene);
});

/**
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

const environmentMapTexture = cubeTextureLoader.load([
  "./public/textures/environmentMaps/0/px.jpg",
  "./public/textures/environmentMaps/0/nx.jpg",
  "./public/textures/environmentMaps/0/py.jpg",
  "./public/textures/environmentMaps/0/ny.jpg",
  "./public/textures/environmentMaps/0/pz.jpg",
  "./public/textures/environmentMaps/0/nz.jpg",
]);

/**
 * Floor
 */
const floor = new THREE.Mesh(
  new THREE.PlaneGeometry(10, 10),
  new THREE.MeshStandardMaterial({
    color: "#777777",
    metalness: 0.3,
    roughness: 0.4,
    envMap: environmentMapTexture,
    envMapIntensity: 0.5,
  })
);
floor.receiveShadow = true;
floor.rotation.x = -Math.PI * 0.5;
scene.add(floor);

/**
 * Lights
 */
const ambientLight = new THREE.AmbientLight(0xffffff, 0.7);
scene.add(ambientLight);

const directionalLight = new THREE.DirectionalLight(0xffffff, 0.2);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.camera.left = -7;
directionalLight.shadow.camera.top = 7;
directionalLight.shadow.camera.right = 7;
directionalLight.shadow.camera.bottom = -7;
directionalLight.position.set(5, 5, 5);
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
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(-3, 3, 3);
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
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();
let oldElapsedTime = 0;

const tick = () => {
  const elapsedTime = clock.getElapsedTime();
  const deltaTime = elapsedTime - oldElapsedTime;
  oldElapsedTime = elapsedTime;

  // Update mixer
  if (mixer !== null) {
    mixer.update(deltaTime);
  }

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-06 P23 听完。

### P24 : Create Model with Blender

详细讲了再 blender 中，模型导出为 .gltf 的各种选项。

### P25 : Realistic Render

outputEncoding 属性控制输出渲染编码，默认为 THREE.LinearEncoding，真实渲染中要用 THREE.sRGBEncoding。

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";

/**
 * Loaders
 */
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Base
 */
// Debug
const gui = new dat.GUI();
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      // child.material.envMap = environmentMap
      child.material.envMapIntensity = debugObject.envMapIntensity;
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
  "public/textures/environmentMaps/0/px.jpg",
  "public/textures/environmentMaps/0/nx.jpg",
  "public/textures/environmentMaps/0/py.jpg",
  "public/textures/environmentMaps/0/ny.jpg",
  "public/textures/environmentMaps/0/pz.jpg",
  "public/textures/environmentMaps/0/nz.jpg",
]);

environmentMap.encoding = THREE.sRGBEncoding;

scene.background = environmentMap;
scene.environment = environmentMap;

debugObject.envMapIntensity = 2.5;
gui
  .add(debugObject, "envMapIntensity")
  .min(0)
  .max(10)
  .step(0.001)
  .onChange(updateAllMaterials);

/**
 * Models
 */
gltfLoader.load("./public/models/FlightHelmet/glTF/FlightHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(10, 10, 10);
  gltf.scene.position.set(0, -4, 0);
  gltf.scene.rotation.y = Math.PI * 0.5;
  scene.add(gltf.scene);

  gui
    .add(gltf.scene.rotation, "y")
    .min(-Math.PI)
    .max(Math.PI)
    .step(0.001)
    .name("rotation");

  updateAllMaterials();
});

// gltfLoader.load(
//     '/models/hamburger.glb',
//     (gltf) =>
//     {
//         gltf.scene.scale.set(0.3, 0.3, 0.3)
//         gltf.scene.position.set(0, - 1, 0)
//         scene.add(gltf.scene)

//         updateAllMaterials()
//     }
// )

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 3, -2.25);
scene.add(directionalLight);

gui.add(directionalLight, "intensity").min(0).max(10).step(0.001).name("lightIntensity");
gui.add(directionalLight.position, "x").min(-5).max(5).step(0.001).name("lightX");
gui.add(directionalLight.position, "y").min(-5).max(5).step(0.001).name("lightY");
gui.add(directionalLight.position, "z").min(-5).max(5).step(0.001).name("lightZ");

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
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
renderer.physicallyCorrectLights = true;
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMapping = THREE.ReinhardToneMapping;
renderer.toneMappingExposure = 3;
renderer.shadowMap.enabled = true;
renderer.shadowMap.type = THREE.PCFSoftShadowMap;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

gui
  .add(renderer, "toneMapping", {
    No: THREE.NoToneMapping,
    Linear: THREE.LinearToneMapping,
    Reinhard: THREE.ReinhardToneMapping,
    Cineon: THREE.CineonToneMapping,
    ACESFilmic: THREE.ACESFilmicToneMapping,
  })
  .onFinishChange(() => {
    renderer.toneMapping = Number(renderer.toneMapping);
    updateAllMaterials();
  });
gui.add(renderer, "toneMappingExposure").min(0).max(10).step(0.001);

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
```

bookmark : 2023-03-07 P25 听完，这个真听迷糊了。

### P26 : Code Structuring for Bigger Projects

本节代码：

```js
import Experience from "./Experience/Experience.js";
const experience = new Experience(document.querySelector("canvas.webgl"));
```

bookmark : 2023-03-08 P26 终于听完了卧槽，终于听完了！！！加油啊！！！🤑

### P27 : Shaders

vec4 的第四个参数跟透视有关，有个专业术语叫 homogeneous coordinates.

本节代码：

```js
// import * as THREE from "./three.module.js"; // 在 js 中引入这个好使，在 html 中引入 three.js/three.min.js 好使
import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

// import testVertexShader from "./Shaders/vertex.glsl";
// import testFragmentShader from "./Shaders/fragment.glsl";

// console.log(testFragmentShader);

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
 * Textures
 */
const textureLoader = new THREE.TextureLoader();
const flagTexture = textureLoader.load("./public/textures/flag/flag.png");

/**
 * Test mesh
 */
// Geometry
const geometry = new THREE.PlaneGeometry(1, 1, 32, 32);

const count = geometry.attributes.position.count;
const randoms = new Float32Array(count);

for (let i = 0; i < count; i++) {
  randoms[i] = Math.random();
}

geometry.setAttribute("aRandom", new THREE.BufferAttribute(randoms, 1));

// Material
const material = new THREE.RawShaderMaterial({
  vertexShader: `
  uniform mat4 projectionMatrix;
  uniform mat4 viewMatrix;
  uniform mat4 modelMatrix;
  uniform vec2 uFrequency;
  uniform float uTime;

  attribute vec3 position;
  attribute float aRandom;
  attribute vec2 uv;

  varying float vRandom;
  varying vec2 vUv;
  varying float vElevation;

  void main(){
    // gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position, 1.0);

    vec4 modelPosition = modelMatrix * vec4(position,1.0);

    float elevation =  sin(modelPosition.x * uFrequency.x - uTime) * 0.1;
    elevation += sin(modelPosition.y * uFrequency.y + uTime) * 0.1;

    modelPosition.z += elevation;
    modelPosition.z += aRandom * 0.1;

    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectedPosition = projectionMatrix * viewPosition;

    gl_Position = projectedPosition;

    vRandom = aRandom;
    vUv = uv;
    vElevation = elevation;
  }
  `,
  fragmentShader: `
  precision mediump float;

  uniform vec3 uColor;
  uniform sampler2D uTexture; // sampler2D 是 texture 的 type

  varying float vRandom;
  varying vec2 vUv;
  varying float vElevation;

  void main(){
    vec4 textureColor = texture2D(uTexture, vUv);
    textureColor.xyz *= vElevation * 3.0 + 1.0;
    gl_FragColor =textureColor;
  }
  `,
  wireframe: true,
  uniforms: {
    uFrequency: { value: new THREE.Vector2(10, 5) },
    uTime: { value: 0 },
    uColor: { value: new THREE.Color("orange") },
    uTexture: { value: flagTexture },
  },
});

gui
  .add(material.uniforms.uFrequency.value, "x")
  .min(0)
  .max(30)
  .step(0.01)
  .name("frequencyX");
gui
  .add(material.uniforms.uFrequency.value, "y")
  .min(0)
  .max(30)
  .step(0.01)
  .name("frequencyY");

// Mesh
const mesh = new THREE.Mesh(geometry, material);
mesh.scale.y = 0.8;
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update materials
  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-10 P27 着色器听完了！就干就行！

# P28 : Shader Patterns

本节代码：

```js
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

  //	Classic Perlin 2D Noise 
  //	by Stefan Gustavson
  //
  vec2 fade(vec2 t) {return t*t*t*(t*(t*6.0-15.0)+10.0);}

  vec4 permute(vec4 x){return mod(((x*34.0)+1.0)*x, 289.0);}

  float cnoise(vec2 P){
    vec4 Pi = floor(P.xyxy) + vec4(0.0, 0.0, 1.0, 1.0);
    vec4 Pf = fract(P.xyxy) - vec4(0.0, 0.0, 1.0, 1.0);
    Pi = mod(Pi, 289.0); // To avoid truncation effects in permutation
    vec4 ix = Pi.xzxz;
    vec4 iy = Pi.yyww;
    vec4 fx = Pf.xzxz;
    vec4 fy = Pf.yyww;
    vec4 i = permute(permute(ix) + iy);
    vec4 gx = 2.0 * fract(i * 0.0243902439) - 1.0; // 1/41 = 0.024...
    vec4 gy = abs(gx) - 0.5;
    vec4 tx = floor(gx + 0.5);
    gx = gx - tx;
    vec2 g00 = vec2(gx.x,gy.x);
    vec2 g10 = vec2(gx.y,gy.y);
    vec2 g01 = vec2(gx.z,gy.z);
    vec2 g11 = vec2(gx.w,gy.w);
    vec4 norm = 1.79284291400159 - 0.85373472095314 * 
      vec4(dot(g00, g00), dot(g01, g01), dot(g10, g10), dot(g11, g11));
    g00 *= norm.x;
    g01 *= norm.y;
    g10 *= norm.z;
    g11 *= norm.w;
    float n00 = dot(g00, vec2(fx.x, fy.x));
    float n10 = dot(g10, vec2(fx.y, fy.y));
    float n01 = dot(g01, vec2(fx.z, fy.z));
    float n11 = dot(g11, vec2(fx.w, fy.w));
    vec2 fade_xy = fade(Pf.xy);
    vec2 n_x = mix(vec2(n00, n01), vec2(n10, n11), fade_xy.x);
    float n_xy = mix(n_x.x, n_x.y, fade_xy.y);
    return 2.3 * n_xy;
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
    // strength = clamp(strength, 0.0, 1.0); // 修复线条交点颜色叠加问题
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
    // float strength = 1.0 - step(0.01, abs(distance(vec2(vUv.x + sin(vUv.y * 30.0) * 0.1, vUv.y + sin(vUv.x * 30.0) * 0.1), vec2(0.5)) - 0.25));
    // float strength = 1.0 - step(0.01, abs(distance(vec2(vUv.x + sin(vUv.y * 100.0) * 0.1, vUv.y + sin(vUv.x * 100.0) * 0.1), vec2(0.5)) - 0.25));

    // float angle = atan(vUv.x, vUv.y);
    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // angle *= 30.0;
    // angle = mod(angle, 1.0);
    // float strength = angle;

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float strength = sin(angle * 100.0);

    // float angle = atan(vUv.x - 0.5, vUv.y - 0.5);
    // angle /= PI * 2.0;
    // angle += 0.5;
    // float sinusoid = sin(angle * 100.0);
    // float radius = 0.25 + sinusoid * 0.02;
    // float strength = 1.0 - step(0.01, abs(distance(vUv, vec2(0.5)) - radius));

    // float strength = cnoise(vUv * 10.0);
    // float strength = step(0.0, cnoise(vUv * 10.0));
    // float strength = 1.0 - abs(cnoise(vUv * 10.0));
    // float strength = sin(cnoise(vUv * 10.0) * 20.0);
    float strength = step(0.9, sin(cnoise(vUv * 10.0) * 20.0));

    // Colored version
    vec3 blackColor = vec3(0.0);
    vec3 uvColor = vec3(vUv, 0.5);
    vec3 mixedColor = mix(blackColor, uvColor, strength);
    gl_FragColor = vec4(mixedColor, 1.0);

    // gl_FragColor = vec4(strength, strength, strength, 1.0);
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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
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
```

bookmark : 2023-03-11 P28 听完！'

### P29 : Ragging Sea

本节代码：

```js
import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

/**
 * Base
 */
// Debug
const gui = new dat.GUI({ width: 340 });
const debugObject = {};

// Canvas
const canvas = document.querySelector("canvas.webgl");

// Scene
const scene = new THREE.Scene();

/**
 * Water
 */
// Geometry
// const waterGeometry = new THREE.PlaneGeometry(2, 2, 256, 256);
const waterGeometry = new THREE.TorusGeometry(0.3, 0.2, 90, 90);

// Color
debugObject.depthColor = "#186691";
debugObject.surfaceColor = "#9bd8ff";

// Material
const waterMaterial = new THREE.ShaderMaterial({
  vertexShader: `
  uniform float uTime;
  uniform float uBigWavesElevation;
  uniform vec2 uBigWavesFreguency;
  uniform float uBigWavesSpeed;

  uniform float uSmallWavesElevation;
  uniform float uSmallWavesFrequency;
  uniform float uSmallWavesSpeed;
  uniform float uSmallWavesIterations;

  varying float vElevation;

  // Classic Perlin 3D Noise 
  // by Stefan Gustavson
  //
  vec4 permute(vec4 x)
  {
      return mod(((x*34.0)+1.0)*x, 289.0);
  }
  vec4 taylorInvSqrt(vec4 r)
  {
      return 1.79284291400159 - 0.85373472095314 * r;
  }
  vec3 fade(vec3 t)
  {
      return t*t*t*(t*(t*6.0-15.0)+10.0);
  }

  float cnoise(vec3 P)
  {
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
    vec4 modelPosition = modelMatrix * vec4(position, 1.0);

    // Elevation
    float elevation = sin(modelPosition.x * uBigWavesFreguency.x + uTime * uBigWavesSpeed) *
                      sin(modelPosition.z * uBigWavesFreguency.y + uTime * uBigWavesSpeed) *
                      uBigWavesElevation;
                      
    for(float i = 1.0; i <= uSmallWavesIterations; i++){
    elevation -= abs(cnoise(vec3(modelPosition.xz * uSmallWavesFrequency * i, uTime * uSmallWavesSpeed)) * uSmallWavesElevation / i);
    }
    modelPosition.y += elevation;
    
    vec4 viewPosition = viewMatrix * modelPosition;
    vec4 projectPosition = projectionMatrix * viewPosition;

    gl_Position = projectPosition;

    // Varrings
    vElevation = elevation;
  }
  `,

  fragmentShader: `
  uniform vec3 uSurfaceColor;
  uniform vec3 uDepthColor;
  uniform float uColorOffset;
  uniform float uColorMultiplier;

  varying float vElevation;

  void main(){
    float mixStrength = (vElevation + uColorOffset) * uColorMultiplier;
    vec3 color = mix(uDepthColor, uSurfaceColor, mixStrength);
    gl_FragColor = vec4(color, 1.0);
  }
  `,

  uniforms: {
    uTime: { value: 0 },

    uBigWavesElevation: { value: 0.2 },
    uBigWavesFreguency: { value: new THREE.Vector2(4, 1.5) },
    uBigWavesSpeed: { value: 0.75 },

    uSmallWavesElevation: { value: 0.15 },
    uSmallWavesFrequency: { value: 2 },
    uSmallWavesSpeed: { value: 0.2 },
    uSmallWavesIterations: { value: 4 },

    uSurfaceColor: { value: new THREE.Color(debugObject.surfaceColor) },
    uDepthColor: { value: new THREE.Color(debugObject.depthColor) },
    uColorOffset: { value: 0.08 },
    uColorMultiplier: { value: 5 },
  },

  wireframe: true,
});

// Debug
gui
  .add(waterMaterial.uniforms.uBigWavesElevation, "value")
  .min(0)
  .max(1)
  .step(0.01)
  .name("uBigWavesElevation");
gui
  .add(waterMaterial.uniforms.uBigWavesFreguency.value, "x")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uBigWavesFreguencyX");
gui
  .add(waterMaterial.uniforms.uBigWavesFreguency.value, "y")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uBigWavesFreguencyY");
gui
  .add(waterMaterial.uniforms.uBigWavesSpeed, "value")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uBigWavesSpeed");
gui
  .addColor(debugObject, "surfaceColor")
  .name("surfaceColor")
  .onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObject.surfaceColor);
  });
gui
  .addColor(debugObject, "depthColor")
  .name("depthColor")
  .onChange(() => {
    waterMaterial.uniforms.uDepthColor.value.set(debugObject.depthColor);
  });
gui
  .add(waterMaterial.uniforms.uColorOffset, "value")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uColorOffset");
gui
  .add(waterMaterial.uniforms.uColorMultiplier, "value")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uColorMultiplier");
gui
  .add(waterMaterial.uniforms.uSmallWavesElevation, "value")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uSmallWavesElevation");
gui
  .add(waterMaterial.uniforms.uSmallWavesFrequency, "value")
  .min(0)
  .max(30)
  .step(0.01)
  .name("uSmallWavesFrequency");
gui
  .add(waterMaterial.uniforms.uSmallWavesIterations, "value")
  .min(0)
  .max(6)
  .step(1)
  .name("uSmallWavesIterations");
gui
  .add(waterMaterial.uniforms.uSmallWavesSpeed, "value")
  .min(0)
  .max(10)
  .step(0.01)
  .name("uSmallWavesSpeed");

// Mesh
const water = new THREE.Mesh(waterGeometry, waterMaterial);
water.rotation.x = -Math.PI * 0.5;
scene.add(water);

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.set(1, 1, 1);
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
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update water wave
  waterMaterial.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-12 P29 听完！来吧汹涌的海，Dive Down！！！🤿🌊

### P30 : Animate Galaxy

本节代码：

```js
import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";

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
 * Galaxy
 */
const parameters = {};
parameters.count = 200000;
parameters.size = 0.005;
parameters.radius = 5;
parameters.branches = 3;
parameters.spin = 1;
parameters.randomness = 0.5;
parameters.randomnessPower = 3;
parameters.insideColor = "#ff6030";
parameters.outsideColor = "#1b3984";

let geometry = null;
let material = null;
let points = null;

const generateGalaxy = () => {
  if (points !== null) {
    geometry.dispose();
    material.dispose();
    scene.remove(points);
  }

  /**
   * Geometry
   */
  geometry = new THREE.BufferGeometry();

  const positions = new Float32Array(parameters.count * 3);
  const colors = new Float32Array(parameters.count * 3);
  const scales = new Float32Array(parameters.count * 1);
  const randomness = new Float32Array(parameters.count * 3);

  const insideColor = new THREE.Color(parameters.insideColor);
  const outsideColor = new THREE.Color(parameters.outsideColor);

  for (let i = 0; i < parameters.count; i++) {
    const i3 = i * 3;

    // Position
    const radius = Math.random() * parameters.radius;

    const branchAngle = ((i % parameters.branches) / parameters.branches) * Math.PI * 2;

    const randomX =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomY =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;
    const randomZ =
      Math.pow(Math.random(), parameters.randomnessPower) *
      (Math.random() < 0.5 ? 1 : -1) *
      parameters.randomness *
      radius;

    // positions[i3] = Math.cos(branchAngle) * radius + randomX;
    // positions[i3 + 1] = randomY;
    // positions[i3 + 2] = Math.sin(branchAngle) * radius + randomZ;

    positions[i3] = Math.cos(branchAngle) * radius;
    positions[i3 + 1] = 0;
    positions[i3 + 2] = Math.sin(branchAngle) * radius;

    randomness[i3 + 1] = randomX;
    randomness[i3 + 2] = randomY;
    randomness[i3 + 3] = randomZ;

    // Color
    const mixedColor = insideColor.clone();
    mixedColor.lerp(outsideColor, radius / parameters.radius);

    colors[i3] = mixedColor.r;
    colors[i3 + 1] = mixedColor.g;
    colors[i3 + 2] = mixedColor.b;

    // Scale
    scales[i] = Math.random();
  }

  geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
  geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
  geometry.setAttribute("aScale", new THREE.BufferAttribute(scales, 1));
  geometry.setAttribute("aRandomness", new THREE.BufferAttribute(randomness, 3));

  /**
   * Material
   */
  material = new THREE.ShaderMaterial({
    depthWrite: false,
    blending: THREE.AdditiveBlending,
    vertexColors: true,

    vertexShader: `
    uniform float uTime;
    uniform float uSize;

    attribute float aScale;
    attribute vec3 aRandomness;

    varying vec3 vColor;

    void main(){
      vec4 modelPosition = modelMatrix * vec4(position, 1.0);
      
      float angle = atan(modelPosition.x, modelPosition.z);
      float distanceToCenter = length(modelPosition.xz);
      float angleOffset = (1.0 / distanceToCenter) * uTime * 0.2;
      angle += angleOffset;
      modelPosition.x = cos(angle) * distanceToCenter;
      modelPosition.z = sin(angle) * distanceToCenter;

      modelPosition.xyz += aRandomness;

      vec4 viewPosition = viewMatrix * modelPosition;
      vec4 projectedPosition = projectionMatrix * viewPosition;

      gl_Position = projectedPosition;

      // Size
      gl_PointSize =  uSize * aScale;
      gl_PointSize *= (1.0 / - viewPosition.z);

      vColor = color;
    }
    `,

    fragmentShader: `
    varying vec3 vColor;

    void main(){
      // float strength = distance(gl_PointCoord, vec2(0.5));
      // strength = step(0.5, strength);
      // strength = 1.0 -strength;

      // float strength = distance(gl_PointCoord, vec2(0.5));
      // strength *= 2.0;
      // strength = 1.0 - strength;

      float strength = distance(gl_PointCoord, vec2(0.5));
      strength = 1.0 - strength;
      strength = pow(strength, 10.0);

      vec3 color = mix(vec3(0.0), vColor, strength);

      gl_FragColor = vec4(color, 1.0);


    }
    `,

    uniforms: {
      uTime: { value: 0 },
      uSize: { value: 30 * renderer.getPixelRatio() },
    },
  });

  /**
   * Points
   */
  points = new THREE.Points(geometry, material);
  scene.add(points);
};

gui
  .add(parameters, "count")
  .min(100)
  .max(1000000)
  .step(100)
  .onFinishChange(generateGalaxy);
gui.add(parameters, "radius").min(0.01).max(20).step(0.01).onFinishChange(generateGalaxy);
gui.add(parameters, "branches").min(2).max(20).step(1).onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomness")
  .min(0)
  .max(2)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui
  .add(parameters, "randomnessPower")
  .min(1)
  .max(10)
  .step(0.001)
  .onFinishChange(generateGalaxy);
gui.addColor(parameters, "insideColor").onFinishChange(generateGalaxy);
gui.addColor(parameters, "outsideColor").onFinishChange(generateGalaxy);

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
camera.position.x = 3;
camera.position.y = 3;
camera.position.z = 3;
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

generateGalaxy();

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Updater material
  material.uniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-12 P30 听完！倩倩就特么犯神经病天天，气的我把电脑砸了！

### P31 : Modified Materials

本节代码：

```js
import * as THREE from "./three.module.js";
import { OrbitControls } from "./OrbitControls.js";
import { GLTFLoader } from "./GLTFLoader.js";

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
const textureLoader = new THREE.TextureLoader();
const gltfLoader = new GLTFLoader();
const cubeTextureLoader = new THREE.CubeTextureLoader();

/**
 * Update all materials
 */
const updateAllMaterials = () => {
  scene.traverse((child) => {
    if (
      child instanceof THREE.Mesh &&
      child.material instanceof THREE.MeshStandardMaterial
    ) {
      child.material.envMapIntensity = 1;
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
 * Material
 */

// Textures
const mapTexture = textureLoader.load("./public/models/LeePerrySmith/color.jpg");
mapTexture.encoding = THREE.sRGBEncoding;

const normalTexture = textureLoader.load("./public/models/LeePerrySmith/normal.jpg");

// Material
const material = new THREE.MeshStandardMaterial({
  map: mapTexture,
  normalMap: normalTexture,
});

const depthMaterial = new THREE.MeshDepthMaterial({
  depthPacking: THREE.RGBADepthPacking,
});

const customUniforms = {
  uTime: { value: 0 },
};

material.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;

  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle) {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
        `
  );

  shader.vertexShader = shader.vertexShader.replace(
    "#include <beginnormal_vertex>",
    `
            #include <beginnormal_vertex>

            float angle = (sin(position.y + uTime)) * 0.4;
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            objectNormal.xz = rotateMatrix * objectNormal.xz;
        `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
            #include <begin_vertex>

            transformed.xz = rotateMatrix * transformed.xz;
        `
  );
};

depthMaterial.onBeforeCompile = (shader) => {
  shader.uniforms.uTime = customUniforms.uTime;
  shader.vertexShader = shader.vertexShader.replace(
    "#include <common>",
    `
            #include <common>

            uniform float uTime;

            mat2 get2dRotateMatrix(float _angle) {
                return mat2(cos(_angle), - sin(_angle), sin(_angle), cos(_angle));
            }
        `
  );
  shader.vertexShader = shader.vertexShader.replace(
    "#include <begin_vertex>",
    `
            #include <begin_vertex>

            float angle = (sin(position.y + uTime)) * 0.4;
            mat2 rotateMatrix = get2dRotateMatrix(angle);

            transformed.xz = rotateMatrix * transformed.xz;
        `
  );
};

/**
 * Models
 */
gltfLoader.load("./public/models/LeePerrySmith/LeePerrySmith.glb", (gltf) => {
  // Model
  const mesh = gltf.scene.children[0];
  mesh.rotation.y = Math.PI * 0.5;
  mesh.material = material; // Update the material
  mesh.customDepthMaterial = depthMaterial; // Update the depth material
  scene.add(mesh);

  // Update materials
  updateAllMaterials();
});

/**
 * Plane
 */
const plane = new THREE.Mesh(
  new THREE.PlaneGeometry(15, 15, 15),
  new THREE.MeshStandardMaterial()
);
plane.rotation.y = Math.PI;
plane.position.y = -5;
plane.position.z = 5;
scene.add(plane);

/**
 * Lights
 */
const directionalLight = new THREE.DirectionalLight("#ffffff", 3);
directionalLight.castShadow = true;
directionalLight.shadow.mapSize.set(1024, 1024);
directionalLight.shadow.camera.far = 15;
directionalLight.shadow.normalBias = 0.05;
directionalLight.position.set(0.25, 2, -2.25);
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
});

/**
 * Camera
 */
// Base camera
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
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
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 1;
renderer.setSize(sizes.width, sizes.height);
renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));

/**
 * Animate
 */
const clock = new THREE.Clock();

const tick = () => {
  const elapsedTime = clock.getElapsedTime();

  // Update material
  customUniforms.uTime.value = elapsedTime;

  // Update controls
  controls.update();

  // Render
  renderer.render(scene, camera);

  // Call tick again on the next frame
  window.requestAnimationFrame(tick);
};

tick();
```

bookmark : 2023-03-13 P31 听完。

### P32 : Post Processsing (后期)

本节代码：

```js
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
import { UnrealBloomPass } from "./UnrealBloomPass.js";
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
gltfLoader.load("./public/models/DamagedHelmet/glTF/DamagedHelmet.gltf", (gltf) => {
  gltf.scene.scale.set(2, 2, 2);
  gltf.scene.rotation.y = Math.PI * 0.5;
  scene.add(gltf.scene);

  updateAllMaterials();
});

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
const camera = new THREE.PerspectiveCamera(75, sizes.width / sizes.height, 0.1, 100);
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

// Antialias pass
if (renderer.getPixelRatio() === 1 && !renderer.capabilities.isWebGL2) {
  const smaaPass = new SMAAPass();
  effectComposer.addPass(smaaPass);

  console.log("Using SMAA");
}

// Unreal Bloom pass
const unrealBloomPass = new UnrealBloomPass();
unrealBloomPass.enabled = false;
effectComposer.addPass(unrealBloomPass);

unrealBloomPass.strength = 0.3;
unrealBloomPass.radius = 1;
unrealBloomPass.threshold = 0.6;

gui.add(unrealBloomPass, "enabled");
gui.add(unrealBloomPass, "strength").min(0).max(2).step(0.001);
gui.add(unrealBloomPass, "radius").min(0).max(2).step(0.001);
gui.add(unrealBloomPass, "threshold").min(0).max(1).step(0.001);

// Tin pass
const TintShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTint: { value: null },
  },
  vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
  fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform vec3 uTint;

        varying vec2 vUv;

        void main()
        {
            vec4 color = texture2D(tDiffuse, vUv);
            color.rgb += uTint;

            gl_FragColor = color;
        }
    `,
};

const tintPass = new ShaderPass(TintShader);
tintPass.material.uniforms.uTint.value = new THREE.Vector3();
effectComposer.addPass(tintPass);

gui
  .add(tintPass.material.uniforms.uTint.value, "x")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("red");
gui
  .add(tintPass.material.uniforms.uTint.value, "y")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("green");
gui
  .add(tintPass.material.uniforms.uTint.value, "z")
  .min(-1)
  .max(1)
  .step(0.001)
  .name("blue");

// Displacement pass
const DisplacementShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: null },
    uNormalMap: { value: null },
  },
  vertexShader: `
        varying vec2 vUv;

        void main()
        {
            gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);

            vUv = uv;
        }
    `,
  fragmentShader: `
        uniform sampler2D tDiffuse;
        uniform float uTime;
        uniform sampler2D uNormalMap;

        varying vec2 vUv;

        void main()
        {
            vec3 normalColor = texture2D(uNormalMap, vUv).xyz * 2.0 - 1.0;
            vec2 newUv = vUv + normalColor.xy * 0.1;
            vec4 color = texture2D(tDiffuse, newUv);

            vec3 lightDirection = normalize(vec3(- 1.0, 1.0, 0.0));
            float lightness = clamp(dot(normalColor, lightDirection), 0.0, 1.0);
            color.rgb += lightness * 2.0;

            gl_FragColor = color;
        }
    `,
};

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
```

bookmark : 2023-03-14 P32 听完。

### P33 : Performance Tips

Draw calls : A draw call represents a single draw from a texture to the display. Ideally, we want to have the least amount of draw calls possible. Now as you get started and add game objects to the scene that render individual sprites, each one of these is going to take up a single draw call.

bookmark : 2023-03-15 P33 听完。

### P34 : Intro and Loading Progress

bookmark : 2023-03-15 P34 听到 21min。
bookmark : 2023-03-16 P34 听完。

### P35 : Mixing HTML and Three.js

### P36 : Creating a Sence in Blender
bookmark : 2023-03-18 P36 听完。