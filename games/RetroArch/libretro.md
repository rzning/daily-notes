# LibRETRO

![Libretro logo](https://www.libretro.com/wp-content/uploads/2013/10/copy-libretro_final_thumb.png)

- [Home – Libretro](https://www.libretro.com/index.php/home-2/)
- [API – Libretro](https://www.libretro.com/index.php/api/)
- [Libretro · GitHub](https://github.com/libretro)
- [RetroArch Web Player](https://web.libretro.com/)

Libretro – A crossplatform application API, powering the crossplatform gaming platform RetroArch

Libretro 是一个简单的 API，允许创建游戏和模拟器。

Libretro 是一个简单但功能强大的开发接口，允许轻松创建模拟器、游戏和多媒体应用程序，可以直接插入任何 Libretro 兼容的前端。

## RetroArch

![RetroArch Logo](https://www.retroarch.com/images/logo.png)

RetroArch 是模拟器、游戏引擎和媒体播放器的前端。

RetroArch 是 libretro API 的官方参考前端。

- <https://www.retroarch.com/>
- <https://github.com/libretro/RetroArch>

### 核心 Cores

RetroArch 是一个模块化程序，可以在其框架内运行模拟器和游戏，就好像它们是“插件”一样。

这些插件被称为“核心”，你需要在 RetroArch 中安装它们才能使用它们。

这些内核也可以用于实现 Libretro 应用程序编程接口 (API) 的其他程序中。

### 着色器 Shaders

着色器是有效的图像过滤器，可以大大提高老游戏的渲染效果。

它们还可以用来复制老式 CRT 显示器的外观和感觉。

你甚至可以堆叠它们来创造你自己的效果。可能性是无限的。

着色器是小程序，它们是用特定的编程语言编写的。RetroArch 支持以下 3 种语言:

- CG
  - 旧的，弃用的格式。如果 RetroArch 在没有 Cg 运行时支持的情况下构建，可能无法使用。
- GLSL
  - OpenGL 可用的着色器格式。广泛的平台，包括手机和平板电脑。
- Slang
  - 新的和推荐的着色器格式，如果可用。兼容 Vulkan, Direct3D 10/11/12, OpenGL Core, WiiU 和 Metal 渲染器。
