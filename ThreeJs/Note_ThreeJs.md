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

本节代码

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

本节代码

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
  // mesh.rotation.y = elapsedTime;
  // mesh.rotation.y = elapsedTime * Math.PI * 2;
  camera.position.y = Math.sin(elapsedTime);

  // camera.lookAt(mesh.position); // 让相机摄像头始终朝向对象的中心拍摄。

  // render
  renderer.render(scene, camera);

  window.requestAnimationFrame(tick); // window.requestAnimationFrame() 告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。回调函数执行次数通常是每秒 60 次，但在大多数遵循 W3C 建议的浏览器中，回调函数执行次数通常与浏览器屏幕刷新次数相匹配。https://developer.mozilla.org/zh-CN/docs/Web/API/Window/requestAnimationFrame
};

tick();
```
