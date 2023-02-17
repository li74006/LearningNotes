## Blender Note

### Shortcut

> 小键盘 1-9 可以进行正、俯、侧等角度切换。

> 没有小键盘，就在 edit > preferences > input > keyboard > check [Emulate Numpad] 或者点击右上角 ±x、y、z。

> Crtl + Alt + Q 三视图 + 透视图旋转。

> N 弹 sidebar。

bookmark : 2022-12-12 3.1 节完成

> Alt + G 重置 grab（抓取）
> Alt + R 重置 rotate
> Alt + S 重置 scale
> 注意：要先选中要重置的对象。

> 查看某个对象的便捷，右侧 Object Properties 中，选择 Viewport Display，勾选 Bounds（边界框）。

bookmark : 2022-12-16 3.2 节完成

> X 健 确认后删除
> 选中一个对象，按 G 进行抓取，按 x, y, z 对齐锁定坐标轴移动。
> Ctrl + C/V 原位复制。
> Shift + D 复制后直接进入 Grab 模式。

> 右键某个对象 > sanp > Selection to Cursor 将其定位到 Cursor(游标)。
> 右键某个对象 > sanp > Cursor to Selected 将 Cursor 定位到选取对象的 Origin（原点）。
> 上边栏 Sanp（磁铁图标）> Vertex(顶点) 就可以将选中的对象在 Grab 过程中自动吸附到其它对象顶点。
> 右键某个对象 > Set Origin 对原点进行重新定位。
> 选中某个对象 > Tab 编辑该对象（进入该对象的编辑模式）。
> Shift + C 游标居中并查看全部。

> 顶点：Vertex，线：edge，面：face。

> 长按左边工具栏，可展开其子工具。

> 加选：Shift，减选：Ctrl，全选：A。

bookmark : 2022-12-16 5.3 节完成

### P14 : 面操作

> 勾选右上角 Overlays 弹出面板中的 3D Cursor，展视或隐藏游标。
> 进入某个对象的编辑模式后，按上面的 Vertex, Edge, Face 展开更多的方法对点线面进行编辑。
> 编辑模式下按 X，对选择的点线面进行删除操作。
> 选择一个面 > 右键 > Subdivide 可对面进行细分。

bookmark : 2022-12-17 6.1 节完成（跟倩倩看了水之道，然后回来还发烧了，38.5°C，抗原测了不是阳性，嗓子有破喉咙感觉，头微痛，不知道明天会咋样哈哈哈哈。

### P18 : 挤出（Extrude）面（快捷键 E）

### P19 : 内插面（Inset Faces 快捷键 I）

> 按 i > 选择某个面 > 同样可以做内插面

### P20 : 尖分面（Poke Faces）

> 右键某个面 > Poke Faces > 会给该面添加一个中心点，然后从中心点向该面所有边的交点连线。
> 右键某个面 > Triangulate Faces > 对该面进行三角化分割。
> 选择多个面 > 右键 > Dissolve Faces > 将这几个面进行融并。

bookmark : 2022-12-29 6.4 节完成

### P21 : 面的切割（Knife 快捷键 K）

> 选择要切割的点时，按 Shift 自动吸附某一边的中点。
> 选完后， 按 Enter 确认切割。

> 选多个面 > 整体切割：Bisect（横贯）。

### P22 : 法向

> 右上角按钮区 > 展开 Overlays 下拉菜单 > Normals 设置展视点、线、面的法向线及其长度。

> 右上角按钮区 > 展开 Overlays 下拉菜单 > Geometry（几何图形）> 勾选 Face Orientation（方向） > 着色显示正反面。

> 右上角按钮区 > 展开 Shading 下拉菜单 > 勾选 Backface Culling（背景剔除）> 从背景方向向外看的时候就会透明显示。

> 左上角菜单区域 > Mesh > Normals > Flip（翻转）> 把选定面的正反面翻转

bookmark : 2022-12-30 6.6 节完成

### P23 : 填充面（快捷键 F）

> 将要填充区域的边都选中 > 左上角菜单区 Face > Fill。
>
> 将要填充区域的边都选中 > 左上角菜单区 Face > Grid Fill（栅格填充，仅支持偶数边）。

### P24 : X-Ray 透视

> 右上角按钮去 > Toggle（切换） X-Ray。

### P25 : 练习 窗户

> 挤出面快捷键 E
> 内插面快捷键 I
> Edit > Adjust Last Operation 调整上一步，快捷键 F9。
> 右上角按钮区 > Shading > Cavity(形腔) > 增强立体视觉效果。

### P26 : 边的细分、滑移

> 选择某条边 > 右键 Subdivide > 细分该边。
> 选择某条边 > Edge > Edge Slide > 滑移该边。

### P27 : 边的删除、溶解

> 选中某边 > X > Dissolve Edges > 融并边。

bookmark : 2022-12-30 7.2 节完成

### P28 : 边线倒角（Bevel）

> 选择某条边 > 左侧工具条 > Belve > 可以修改微调面板各项参数修改倒角样式。

> 鼠标悬停在左侧工具条 > F1 > 自动打开官方文档（或者直接右键某个工具，点 Online Manual 也行）

bookmark : 2022-12-31 7.3 节完成

### P29 : 环切（Loop Cut）

> 自动是吸附中间位置，也可以按住鼠标拖动环切线位置。

### P30 : 循环边（Loop Edge）、并排边（Ring Edge）

> Alt + 鼠标左键，快速选中循环边。
> Ctrl + Alt + 鼠标左键，快速选中并排边。
> 循环面的选择同上。
> 可以在选中循环边的基础上，进行 "法向收缩" 或 "切变" 等操作。
> 选中某条循环边 > 顶部工具条 Edge > Offset Edge Slide > 以选中的循环边为中线，对称复制出两条循环边并可以手动拖拽其平移距离。
> 删除循环边 > 在选中后 > X > Dissolve Edge（融并边）。

### P31 : 四边形的优势

bookmark : 2023-1-12 7.6 节完成，下午再来 3 节，今天的任务就完成了。

### P32 : 桥接循环边

> 选择两组边数相同的循环边 > 上方选项条 Edge > Bridge Edge Loops
> 选择两个面后也可以使用 Bridge Edge Loops

### P33 : 练习 旋钮

> 选择循环面后 > Select > Checker Deselect > 可以对循环面间隔选取并设置间隔数等。

bookmark : 2023-1-13 7.8 节完成。

### P34 : 顶点的移动

> 选取某个点进行 Move 操作进行移动即可 > 当该面不平行于 Global 坐标系时，可以将上方工具条 Orientation（方向）选择为 Normal 即可。

### P35 ：顶点滑移

> 左边工具条 > Vertex Slide/Shift + V > 滑移即可。

### P36 : 顶点合并

> 右上角工具条 > Overlays > 勾选 Statistics（统计），左上角会出现统计信息。

bookmark : 2023-1-13 8.4 01:00min。

> Edit > Preference > Editors > Status Bar > Show > Scene Statistics > 会将场景的统计数据在右下角状态栏显示。
> 选中某些顶点 > 右键/M > Merge Vertices > At Center。
> A > 全选所有点 > 右键/M > Merge Vertices > By Distance > 可对间距小于一定距离的点进行融合。
> 右上角工具栏 > 点击 Auto Merge Vertices/勾选 Options 中 Auto Merge 并设置距离 > 当两点间距离小于一定值时将自动融合。

bookmark : 2023-1-16 8.4 节完成。

### P37 : 连接顶点

> 选中顶点 > 右键 > New Edge/Face from Vertices(快捷键 F) > 会连接两个顶点，但是连接后的线是独立于平面的，不会对该面进行分割。
> 选中顶点 > 右键 > Connect Vertices Path(快捷键 J) > 顶点连接后的路径会分割平面。
> 选中顶点 > X > Dissolve Vertices > 会融并顶点周围的线面。

### P38 : 衰减编辑（Proportional Edit）

> 选中点、线或面 > 点击顶部工具条开启 Proportional Editing > 再选择左侧移动工具，移动过程中对象间连接会比较圆滑 > 移动过程中滚动滚轮，可以调整衰减影响的范围。

bookmark : 2023-1-17 8.6 节完成。

### P39 : 补听 P37 顶点倒角

> 选定某点 > 倒角即可。
> 可以在 Preference 中 Add-ons 搜索想要的插件如 Looptools 等对对象进行快速编辑。

### P40 : 练习瓶子

### P41 : 练习郁金香

> Shift + D（复制）。

### P42 : Extra Objects 插件

在 Perference 中添加即可。

bookmark : 2023-1-17 9.1 节完成。

### P43 : 各种形状

### P44 : 练习五角星

> X > Collapse Edges & Faces > 塌陷边与面

bookmark : 2023-1-18 9.3 节完成。

### P45 : 添加形状

> 编辑模式下，添加对象，添加的对象将会和当前对象成为一整个对象。

### P46 : 模型的合并

> 选中对象 > 右键 Jion/Ctrl + J > 将几个对象合并。

### P47 : 拆分与分离

> 编辑模式下 > 选中某个面 > 右键 Split > 将其拆分出来。
> 编辑模式下 > 选中要分离的对象 > 右键 Separate > 将选中的对象与当前对象分离。

### P48 : Bool Tool 插件

> 选中两个对象 > N > 右边标签栏 Edit > 编辑 Bool Tool。

bookmark : 2023-1-19 10.4 节完成。

### P49 : 练习 糖果小屋

bookmark : 2023-1-20 10.5 节完成。

### P50 : 曲线（Curve）

> Add > Curve > Bezier（贝塞尔曲线）
> 选中曲线 > 右键 > Convert To > Mesh > 即可进行网格操作。

### P51 : 控制点

> 选中 Bezier 曲线进入编辑模式 > 长按左侧工具条 Select Box > Tweak > 可直接选取曲线上的点进行移动编辑。

### P52 : 编辑曲线

> 可以全选曲线上的点 > 右键 Subdivied > 在曲线上添加多个点精细编辑曲线。
> 可以选中曲线上某个点 > 按 E 进行挤出。
> 选中曲线上某个点 > 按 X 进行删除。
> 选中曲线上某个控制点 > 按 V 选择控制柄类型 ：
>
> 1. 自由 ：两个控制柄都可以自由移动；
> 2. 对齐 ：两个控制柄对齐移动；
> 3. 矢量 ：两个点间会以直线连接；
> 4. 自动 ：会根据两个端点自动设置。
>    某个控制点的左右控制柄可以单独设置类型。

bookmark : 2023-1-21 11.3 节完成。

### P53 : 钢笔工具

> 选中曲线 > 左侧工具条 Curve Pen（钢笔工具）> 编辑曲线。
> 钢笔工具下 > Ctrl + Mouse Left > 删除控制点。
> 可双击控制点切换其类型。

bookmark : 2023-1-22 11.4 节完成。

### P54 : 曲线的更多操作

> 延申一条曲线可以使用 E 挤出或者 Curve Pen。
> 闭合一条曲线 > 选中两个点 > F。
> 拆分一条曲线 > 选中曲线中两个点 > 右键 Spilt/Y > G 将其移走。
> 查看曲线的法向 > 右上角 Overlays > 勾选最下方 Display Normals
> 曲线编辑模式下 > 上方工具条 > Sagment > Switch Direction > 切换曲线的法线方向。

bookmark : 2023-1-23 11.5 节完成。

### P55 : 参考图

> 上方工具条 > Add > Image > Reference/Background > 添加参考图 > 操作参考图：G 移动、S 缩放、R 旋转。
> 右下角参考图属性 > 可对其设置透明度等。

### P56 : 更多曲线形状

### P57 : 曲线与网格

bookmark : 2023-1-23 11.8 节完成。

### P58 : 曲线倒角

> 选中曲线 > 右下角对象数据属性选择 曲线 > Geometry > Bevel > Depth > 将曲线倒角为管道。

bookmark : 2023-1-24 12.1 节完成。

### P59 : 曲线倒角的参数

> 编辑模式下选中曲线上的点 > N > 操作右侧弹出面板的数据编辑曲线。

### P60 : 曲线的横截面

### P61 : 圆环的倒角

bookmark : 2023-1-25 12.4 节完成。

### P62 : 路径曲线

> Add > Curve > Nurbs Curve > 添加路径曲线。

### P63 : 练习梦幻水母

### P64 : 练习古战场

> 批量选择点后 > H > 隐藏顶点 > 可以在衰变编辑时保持其他位置不受影响 > Alt + H 重新显示隐藏的点。

bookmark : 2023-1-27 12.7 节完成。

### P65 : 本章节为 基础补充，全部内容在网盘中，但是收费 10 元

### P66 : 修改器

> 右下角 > Modifier Properties > Add Modifier

### P67 : 实时预览

### P68 : 应用修改（快捷键：Alt + A，应用后无法被恢复）

bookmark : 2023-1-29 14.3 节完成。

### P69 : 阵列修改器

### P70 : 多个修改器

### P71 : 偏移量（Offset）

### P72 : 练习 楼梯栏杆

bookmark : 2023-1-29 15.4 15:31。

### P73 : 镜像修改器

### P74 : 练习 苏香雪的扇子

### P75 : 练习 纸飞机

### P76 : 布尔修改器

### P77 : 集合布尔

### P78 : 练习 烤面包机

bookmark : 2023-1-30 17.3 节完成。

### P79 : 线框修改器

bookmark : 2023-1-30 18.1 节完成。

### P80 : 菱形网面

> 选中细分网格下所有的边 > 菜单栏 Edge > Un-Subdivide > 将 Iterations 设为 1 即可。
> 圆柱体先对其进行环切 > Un-Subdivide 即可。

### P81 : 练习 笔筒

### P82 : 表面细分修改器

> Modifier Property > Add Modifier > Subdivision Surface

bookmark : 2023-1-31 19.1 节完成。

### P83 : 细分与卡线

### P84 : 边线折痕

> 细分前选择某些边线 > 右键 Edge Crease (Shift + E) > 再对该对象进行细分操作时，该折痕边倒角就没那么平滑了。
> 修改后可使用 N 调出面板 > Item > Mean Crease 对折痕边进行调整。

### P85 : 三角面与多边面

bookmark : 2023-1-31 19.4 节完成。

### P86 : 练习 花瓶

> 使用修改器中的 Solidify > 将面实体化出一定体积。

### P87 : 练习 水杯

### P88 : 几何节点修改器（又放网盘里收费了卧槽）

### P89 : 曲线修改器

### P90 : 曲线修改器细节

### P91 : 半径与倾斜

> 曲线的半径 控制重合物体的粗细。
> 曲线的倾斜 控制重合物体的扭转。

### P92 : 练习 锁链

bookmark : 2023-2-1 21.4 节完成。

### P93 : 练习 藤曼

### P94 : 练习 阳台

### P95 : 创建晶格（Lattice）

> Add > Lattice > 添加晶格，并在右侧参数工具条 Object Data Properities 对其进行设置。

> 对点都可以使用衰减编辑。

### P96 : 晶格修改器

### P97 : 练习 空间扭曲

### P98 : 材质

### P99 : 关联材质

> 先 Shift 多选 需要关联材质的对象 > 再加选 被关联材质的对象 > Ctrl + L > 实现批量关联材质。

### P100 : 更多材质操作

> 复制材质。
> 右上角对象列表区域点击 Display Mode > Blender File > 查看所有的材质文件。
> 保存后，没有被使用的材质会被清除。

### P101 : 多个材质

> 编辑模式下 > Ctrl + L > 选中关联项。
> 编辑模式下选中对象的某些面 > 选中某个材质后 > Assign > 对其单独设置材质。

### P102、103 : 着色器（Shader）

> BSDF > 双向散射分布函数。
> 下方编辑器窗口左上角 Editor Type > Shader Editor > 打开着色器编辑器。

### P104 : 练习 木纹与玻璃

bookmark : 2023-2-2 25.1 节完成。

### P105 : 纹理

> Shader Editor > Add > Texture > Image Texture > Open > 选择一张图片即可。

### P106 : UV 编辑器

> 切换到 UV Editing 工作区进行操作。

### P107 : UV 坐标

> 可以在 UV 工作区中旋转对应的面，该面的贴图会单独变换，如果全选该对象再旋转某个面，该面的贴周围的贴图会扭曲旋转。

### P108 : UV 映射

### P109 : UV 展开（Unwarp)

### P110 : 纹理绘制

> 上方菜单栏 > UV > Export UV Layout > 按照布局在 PS 等软件绘制贴图即可。

### P111 : 自动展开 UV

> A 全选对象 > Smart UV Project > 进行自动展开。

### P112 : 手动 UV 展开

> 编辑模式下选中某些边 > UV > Mark Seam > A 全选 > Unwarp 即可展开。
> 选中某条 Seam > UV > Clear Seam 即可清除该条缝合边。

### P113 : 布局调整

> 选择某个面后 > L > 选中与该面相邻的孤岛。

### P114 : UV 对齐

> 选中 展开图 中某些点 > UV/右键 > Align > 沿 x y 轴对这些点进行对齐等操作。
> 选中某个展开图 > 磁铁工具 > 顶点吸附对齐。
> 选中展开图某个面 > 右键 > Follow Active Quads > 把该孤岛中其他面都按该面的形状进行展开。
> 选中孤岛中某些面 > 右键 > Split 对其进行拆分。
> 选中孤岛中某些点 > 右键 > Stitch 对其按照临近点进行缝合。

bookmark : 2023-2-3 26.6 节完成。

### P115 : 练习 弯曲文字

### P116 : 导出模型（又放网盘里了 MD！）

### P117-138 : 细节补充

> Z > 切换着色方式。
> , > 切换坐标系。
> . > 切换基准点。
> Shift + S > 吸附。

> G > G > 顶点/边线 滑移。
> S > Shift + Z > xy 平面内缩放。
> R > Z > 90。
> R > R。
> E > X/Y/Z。
> E > S > 挤出并缩放。
> Alt + E > 展开挤出的二级菜单。
> 挤出时 > Ctrl + 右键 > 挤出只光标。
> Ctrl + B > 倒角，同时滚动滚轮可以调节倒角段数。
> Ctrl + Shift + B > 顶点倒角。
> Ctrl + R > 环切。
> K > 切割。

> Alt + Shift + 左键 > 多选循环边。
> Ctrl + Alt + Shift + 左键 > 多选并排边/面。
> Ctrl + Shift + 左键 > 最短路径选择。
> Ctrl + I > 反选。
> C > 刷选 > 回车/Esc 退出刷选。
> Ctrl +/- > 扩展/减少 选区。

bookmark : 2023-2-3 P120 节完成。

> 选中对象后 > 小键盘区 . > 使该物体到视图中心显示。
> Shift + 右键 > 将游标定位到鼠标位置。
> Alt + Z > 切换 X-Ray.
> 对想要的功能右键点击 > Add To Quick Favorites > Q > 打开快速收藏勾选。
> Ctrl + 1/2/3 > 快捷使用 1/2/3 级细分修改器。

bookmark : 2023-2-4 P124 节完成。
bookmark : 2023-2-5 P130 节完成。
bookmark : 2023-2-6 P138 节完成，啊发的基础篇全部听完。下一步，找每日练习项目，每天都练一个。

## 各种可爱的项目练习

### E1 : [Cute Mushroom](https://www.youtube.com/watch?v=Ar0aLdXhEK0&list=PLfEBMMMIwZRPrsgEvUU_tNvWrBzrDUqoM&index=11&t=6s)

> Shift + A > 快速 Add。
> 按住 Ctrl + 右键 > 快速挤出。
> Ctrl + 2 > 快速细分。
> 选中某循环边 > Shift + S > Cursor to Selected。
> S + Z + Z > 沿对象的法向快速缩放。
> 顶部工具条 Snapping > Face Project > 勾选 Align Rotation to Target 和 Project Individual Elements > 选中某个对象 > 先按 G 再，按住 Ctrl 移动对象 > 选中的对象会沿着其他对象的表面移动并自适应其表面方向。
> Alt + D > 复制某个对象的 link。
> 全选对象 > Shift + 左键 > 选中其中的某个对象作为 Base > Ctrl + P > 将其设置为一整个对象。
> G > Shift + Z > 限制移动的对象再 x y 平面内移动。

bookmark : 2023-2-6 E1 看到 6:00，真的是每一分钟都是新的知识啊 🤣。

> 按住 Shift + S > 快速移动游标。
> Ctrl + R > 快速环切 > 同时滚动滚轮可以增加环切段数 > 先点左键确认环切方向，再点右键自动环切到默认位置。
> 编辑模式下 > 启用右上角 Auto Merge Vertices > 自动融合顶点。
> 选中某个顶点 > G + G > 沿着某条边滑动顶点。
> 选中某些对象 > Ctrl + J > 会将他们组成为单独的对象。
> 修改器使用的先后会影响修改的效果！
> 选中相机 > View > Align View > Align Active Camera to View 或快捷键 Ctrl + Alt + Numpad 0 > 将相机自动调整到当前视角。
> Output Properties > 可以修改相机视野尺寸。
> 选中一个对象（这里选中的是添加的地面）> Ctrl 多选 Camera > N 打开 Item 面板 > 右键 Rotation：Z > Copy Single to Selected > 将选中的对象转到与 Camera 视角相同。

bookmark : 2023-2-11 E1 看完，还把渲染图发了朋友圈，开心 ~ 😊

### E2 : [Fox](https://www.youtube.com/watch?v=aMRRNC1J6tU&list=PLfEBMMMIwZRPrsgEvUU_tNvWrBzrDUqoM&index=26&t=13s)

> 选中循环点 > Mesh > Transform > To Sphere > 左右移动鼠标，将选中的循环点变为圆形。
> 选中循环边 > S > 根据其轴向输入 X 或 Y > 沿其轴向缩放 > 0（沿着 0 度 缩放）> 相当于旋转至垂直其轴向，并使得循环点都移动至同意平面。
> E > S > 相当于收缩挤出。
> 选中循环点 > M > At Center > 将其融并到中心。

bookmark : 2023-2-12 E2 看到 9:30 ~

> 选中相机 > G + Z + Z > 拉远/拉进 相机。

bookmark : 2023-2-17 E2 完成 ~ 真是每个建模师的技法都不一样啊 🤣。
