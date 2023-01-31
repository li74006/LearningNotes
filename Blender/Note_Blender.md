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

# P38 : 衰减编辑（Proportional Edit）

> 选中点、线或面 > 点击顶部工具条开启 Proportional Editing > 再选择左侧移动工具，移动过程中对象间连接会比较圆滑 > 移动过程中滚动滚轮，可以调整衰减影响的范围。

bookmark : 2023-1-17 8.6 节完成。

# P39 : 补听 P37 顶点倒角

> 选定某点 > 倒角即可。
> 可以在 Preference 中 Add-ons 搜索想要的插件如 Looptools 等对对象进行快速编辑。

# P40 : 练习瓶子

# P41 : 练习郁金香

> Shift + D（复制）。

# P42 : Extra Objects 插件

在 Perference 中添加即可。

bookmark : 2023-1-17 9.1 节完成。

# P43 : 各种形状

# P44 : 练习五角星

> X > Collapse Edges & Faces > 塌陷边与面

bookmark : 2023-1-18 9.3 节完成。

# P45 : 添加形状

> 编辑模式下，添加对象，添加的对象将会和当前对象成为一整个对象。

# P46 : 模型的合并

> 选中对象 > 右键 Jion/Ctrl + J > 将几个对象合并。

# P47 : 拆分与分离

> 编辑模式下 > 选中某个面 > 右键 Split > 将其拆分出来。
> 编辑模式下 > 选中要分离的对象 > 右键 Separate > 将选中的对象与当前对象分离。

# P48 : Bool Tool 插件

> 选中两个对象 > N > 右边标签栏 Edit > 编辑 Bool Tool。

bookmark : 2023-1-19 10.4 节完成。

# P49 : 练习 糖果小屋

bookmark : 2023-1-20 10.5 节完成。

# P50 : 曲线（Curve）

> Add > Curve > Bezier（贝塞尔曲线）
> 选中曲线 > 右键 > Convert To > Mesh > 即可进行网格操作。

# P51 : 控制点

> 选中 Bezier 曲线进入编辑模式 > 长按左侧工具条 Select Box > Tweak > 可直接选取曲线上的点进行移动编辑。

# P52 : 编辑曲线

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

# P53 : 钢笔工具

> 选中曲线 > 左侧工具条 Curve Pen（钢笔工具）> 编辑曲线。
> 钢笔工具下 > Ctrl + Mouse Left > 删除控制点。
> 可双击控制点切换其类型。

bookmark : 2023-1-22 11.4 节完成。

# P54 : 曲线的更多操作

> 延申一条曲线可以使用 E 挤出或者 Curve Pen。
> 闭合一条曲线 > 选中两个点 > F。
> 拆分一条曲线 > 选中曲线中两个点 > 右键 Spilt/Y > G 将其移走。
> 查看曲线的法向 > 右上角 Overlays > 勾选最下方 Display Normals
> 曲线编辑模式下 > 上方工具条 > Sagment > Switch Direction > 切换曲线的法线方向。

bookmark : 2023-1-23 11.5 节完成。

# P55 : 参考图

> 上方工具条 > Add > Image > Reference/Background > 添加参考图 > 操作参考图：G 移动、S 缩放、R 旋转。
> 右下角参考图属性 > 可对其设置透明度等。

# P56 : 更多曲线形状

# P57 : 曲线与网格

bookmark : 2023-1-23 11.8 节完成。

# P58 : 曲线倒角

> 选中曲线 > 右下角对象数据属性选择 曲线 > Geometry > Bevel > Depth > 将曲线倒角为管道。

bookmark : 2023-1-24 12.1 节完成。

# P59 : 曲线倒角的参数

> 编辑模式下选中曲线上的点 > N > 操作右侧弹出面板的数据编辑曲线。

# P60 : 曲线的横截面

# P61 : 圆环的倒角

bookmark : 2023-1-25 12.4 节完成。

# P62 : 路径曲线

> Add > Curve > Nurbs Curve > 添加路径曲线。

# P63 : 练习梦幻水母

# P64 : 练习古战场

> 批量选择点后 > H > 隐藏顶点 > 可以在衰变编辑时保持其他位置不受影响 > Alt + H 重新显示隐藏的点。

bookmark : 2023-1-27 12.7 节完成。

# P65 : 本章节为 基础补充，全部内容在网盘中，但是收费 10 元

# P66 : 修改器

> 右下角 > Modifier Properties > Add Modifier

# P67 : 实时预览

# P68 : 应用修改（快捷键：Alt + A，应用后无法被恢复）

bookmark : 2023-1-29 14.3 节完成。

# P69 : 阵列修改器

# P70 : 多个修改器

# P71 : 偏移量（Offset）

# P72 : 练习 楼梯栏杆

bookmark : 2023-1-29 15.4 15:31。

# P73 : 镜像修改器

# P74 : 练习 苏香雪的扇子

# P75 : 练习 纸飞机

# P76 : 布尔修改器

# P77 : 集合布尔

# P78 : 练习 烤面包机

bookmark : 2023-1-30 17.3 节完成。

# P79 : 线框修改器

bookmark : 2023-1-30 18.1 节完成。

# P80 : 菱形网面

> 选中细分网格下所有的边 > 菜单栏 Edge > Un-Subdivide > 将 Iterations 设为 1 即可。
> 圆柱体先对其进行环切 > Un-Subdivide 即可。

# P81 : 练习 笔筒

# P82 : 表面细分修改器

> Modifier Property > Add Modifier > Subdivision Surface

bookmark : 2023-1-31 19.1 节完成。
