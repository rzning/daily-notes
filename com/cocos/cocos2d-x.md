Cocos2d-x
=========

![cocos2d-x-logo](https://cocos2d-x.org/images/logo.png)

Cocos2d-x 是一套成熟的开源跨平台游戏开发框架。
引擎提供了图形渲染、GUI、音频、网络、物理、用户输入等丰富的功能，被广泛应用于游戏开发及交互式应用的构建。
其核心采用 C++ 编写，支持使用 C++、Lua 或 JavaScript 进行开发。
Cocos2d-x 适配 iOS、Android、HTML5、Windows 和 Mac 系统，功能侧重于原生移动平台，并向 3D 领域延伸扩展。

仓库

- <https://github.com/cocos2d/cocos2d-x>

网址

- <https://cocos2d-x.org/>
- <https://www.cocos.com/cocos2dx>

文档

- <https://docs.cocos2d-x.org/cocos2d-x/zh/>
- <https://docs.cocos.com/cocos2d-x/manual/zh/>

API

- <https://docs.cocos2d-x.org/api-ref/>

---


# 基本概念

游戏引擎通常会包含渲染器，2D/3D 图形元素，碰撞检测，物理引擎，声音，控制器支持，动画等部分。

概念 | 描述
-|-
导演（Director） | Cocos2d-x 使用导演的概念，这个导演和电影制作过程中的导演一样！导演控制电影制作流程，指导团队完成各项任务。一个常见的 Director 任务是控制场景替换和转换。 Director 是一个共享的单例对象，可以在代码中的任何地方调用。
场景（Scene） | 在游戏开发过程中，你可能需要一个主菜单，几个关卡和一个结束场景。如何组织所有这些分开的部分？使用场景（Scene）！
场景图（Scene Graph） | 场景图是一种安排场景内对象的数据结构，它把场景内所有的节点（Node）都包含在一个树（tree）上。
精灵（Sprite） | 精灵是您在屏幕上移动的对象，它能被控制。在游戏中不是所有的图形对象是精灵，如果你能控制它，它才是一个精灵（Sprite），如果无法控制，则只是一个节点（Node）。
图集（Sprite Sheet） | 图集是通过专门的工具将多张图片合并成一张大图，并通过 plist 等格式的文件索引的资源，使用图集比使用多个独立图像占用的磁盘空间更少，还会有更好的性能。
锚点（Anchor Point） | 锚点确定了精灵对象在计算坐标位置的一个基准点，这个点是精灵内部的点，锚点影响精灵的缩放（scale）、旋转（rotation）、倾斜（skew）等，不影响颜色（color）、透明度（opacity）。锚点使用的坐标系以左下角为原点 (0, 0)，所有的节点对象的默认锚点是 (0.5, 0.5)。
动作（Action） | 动作可以让精灵在场景中移动，如从一个点移动到另外一个点。也可以创建一个动作序列（Sequence），让精灵按照这个序列做连续的动作。
序列（Sequence） | 序列就是多个动作按照特定顺序的一个排列。
节点关系 | 节点关系，是被附属和附属的关系，如果两个节点被添加到一个父子关系中，那么父节点的属性变化会被自动应用到子节点中。

# 基本功能

## Sprite

精灵是一个 2D 图像，可以通过更改其属性（包括旋转、位置、缩放、颜色等）进行动画或转换。

1. 使用图片创建精灵

```cpp
auto mySprite = Sprite::create("mysprite.png");
```

2. 使用矩形（Rect）裁剪

```cpp
auto mySprite = Sprite::create("mysprite.png", Rect(0,0,40,40));
```

3. 设置锚点（Anchor Point）

```cpp
mySprite->setAnchorPoint(0.5, 0.5);
```

4. 定位到特定位置（Position）

```cpp
mySprite->setPosition(Vec2(100, 200));
```

5. 进行旋转（Rotation）

```cpp
mySprite->setRotation(60.0f);
```

6. 进行缩放（Scale）

```cpp
mySprite->setScale(2.0);
mySprite->setScaleX(2.0);
mySprite->setScaleY(2.0);
```

7. 进行倾斜（Skew）

```cpp
mySprite->setSkewX(20.0f);
mySprite->setSkewY(20.0f);
```

8. 设置颜色（Color）

```cpp
mySprite->setColor(Color3B::WHITE);
mySprite->setColor(Color3B(255, 255, 255));
```

9. 设置透明度（Opacity）

```cpp
// 255 代表完全不透明，0 代表完全透明。
mySprite->setOpacity(30);
```

10. 创建多边形精灵（Polygon Sprite）

```cpp
auto pinfo = AutoPolygon::generatePolygon("filename.png");
auto sprite = Sprite::create(pinfo);
```

## Action

1. 移动（Move）

```cpp
// 将精灵移动到指定位置（时间，位置）
auto moveTo = MoveTo::create(2, Vec2(50, 0));
mySprite->runAction(moveTo);
// 对精灵进行相对位置移动（时间，位置）
auto moveBy = MoveBy::create(2, Vec2(50, 0));
mySprite->runAction(moveBy);
```

2. 旋转（Rotate）

```cpp
// 旋转到指定角度（时间，角度）
auto rotateTo = RotateTo::create(2.0f, 40.0f);
mySprite->runAction(rotateTo);
// 顺时针旋转指定角度（时间，角度）
auto rotateBy = RotateBy::create(2.0f, 40.0f);
mySprite->runAction(rotateBy);
```

3. 缩放（Scale）

```cpp
// 缩放（时间，缩放系数）
auto scaleBy = ScaleBy::create(2.0f, 3.0f);
mySprite->runAction(scaleBy);
// 缩放（时间，X 轴系数，Y 轴系数）
auto scaleBy = ScaleBy::create(2.0f, 3.0f, 3.0f);
mySprite->runAction(scaleBy);
// 缩放到指定大小（时间，特定倍数）
auto scaleTo = ScaleTo::create(2.0f, 3.0f);
mySprite->runAction(scaleTo);
// 缩放到指定大小（时间，X 轴倍数，Y 轴倍数）
auto scaleTo = ScaleTo::create(2.0f, 3.0f, 3.0f);
mySprite->runAction(scaleTo);
```

4. 淡入淡出（Fade In/Out）

```cpp
// 淡入（时间） - 透明 => 不透明
auto fadeIn = FadeIn::create(1.0f);
mySprite->runAction(fadeIn);
// 淡出（时间） - 不透明 => 透明
auto fadeOut = FadeOut::create(2.0f);
mySprite->runAction(fadeOut);
```

5. 着色（Tint）

6. 帧动画（Animate）

7. 缓速运动（Easing）

8. 序列（Sequence）

9. 混合序列（Spawn）

10. 动作克隆（Clone）

11. 动作倒转（Reverse）

## Scene

场景是一个容器，包含游戏中的各个元素，如精灵，标签，节点对象。它负责着游戏的运行逻辑，以帧为单位渲染内容。

1. 创建场景

```cpp
auto myScene = Scene::create();
```

一个示例

```cpp
// 获取导演实例
auto dirs = Director::getInstance();
// 获取可视区域大小
Size visibleSize = dirs->getVisibleSize();

// 创建场景
auto myScene = Scene::create();

// 设置标签
auto label1 = Label::createWithTTF("My Game", "Marker Felt.ttf", 36);
label1->setPosition(Vec2(visibleSize.width / 2, visibleSize.height / 2));

// 将标签添加到场景
myScene->addChild(label1);

// 创建精灵
auto sprite1 = Sprite::create("mysprite.png");
sprite1->setPosition(Vec2(100, 100));

// 将精灵添加到场景
myScene->addChild(sprite1);
```

2. 场景切换

## UI Components

1. 标签（Label）

2. 菜单（Menu）

3. 按钮（Button）

4. 复选框（Checkbox）

5. 进度条（Loading Bar）

6. 滑动条（Slider）

7. 文本框（Text Field）


# 进阶内容

# 环境与工具
