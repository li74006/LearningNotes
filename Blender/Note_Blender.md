# Blender Note

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

bookmark : 2022-1-12 7.6 节完成，下午再来 3 节，今天的任务就完成了。

### P32 : 桥接循环边

> 选择两组边数相同的循环边 > 上方选项条 Edge > Bridge Edge Loops
> 选择两个面后也可以使用 Bridge Edge Loops

### P33 : 练习 旋钮

> 选择循环面后 > Select > Checker Deselect > 可以对循环面间隔选取并设置间隔数等。

bookmark : 2022-1-13 7.8 节完成。

### P34 : 顶点的移动

> 选取某个点进行 Move 操作进行移动即可 > 当该面不平行于 Global 坐标系时，可以将上方工具条 Orientation（方向）选择为 Normal 即可。

### P35 ：顶点滑移

> 左边工具条 > Vertex Slide/Shift + V > 滑移即可。

### P36 : 顶点合并

> 右上角工具条 > Overlays > 勾选 Statistics（统计），左上角会出现统计信息。
> bookmark : 2022-1-13 8.6 01:00min。
