# Guru Maps Map Style & WYSIWYG Studio (所见即所得编辑器)

本项目是 [Guru Maps](https://gurumaps.app) 离线矢量地图的样式库，并配备了一套**纯前端、开箱即用的“所见即所得 (WYSIWYG)”可视化地图样式编辑器**。

---

## 🚀 快速启动可视化编辑器

编辑器基于全球公开免费的 OpenStreetMap 矢量瓦片驱动，**无需准备任何本地瓦片数据**，开箱即用：

### Windows 用户：
直接双击运行根目录下的：
```cmd
start_editor.bat
```

### macOS / Linux / 命令行用户：
终端运行：
```bash
python3 run_editor.py
```
> 运行后会自动启动本地服务并在默认浏览器打开 `http://localhost:8080/editor/index.html`。

---

## ✨ 编辑器核心功能

1. **实时所见即所得预览**：
   - 在左侧调节颜色滑块（陆地背景、江河水系、森林草地、高速公路、户外徒步道等），右侧矢量地图毫秒级更新。
2. **多套高品质预设方案**：
   - 🏛️ **官方经典 (Default Classic)**：原版基础配色
   - 🌲 **户外探险 (Outdoor High-Contrast)**：高饱和度植被与小道，极高野外可读性
   - 🌑 **暗黑越野 (Dark Tactical)**：OLED 纯黑底色，荧光色夜骑路线
   - 📜 **复古羊皮纸 (Vintage Parchment)**：手绘探险家典雅质感
   - 🌊 **北欧极简 (Nordic Clean)**：高雅马卡龙配色
3. **户外特化增强开关**：
   - 🥾 **徒步小路增强**：一键加粗山间小径（Path）与机耕路（Track），解决野外小路看不清的痛点。
   - 🏙️ **城市降噪模式**：淡化建筑与杂乱商业块，突出山水与主路网。
4. **一键打包导出**：
   - 命名后点击「一键导出 .style 压缩包」，浏览器在前端自动生成符合官方规范的完整样式包（如 `CustomOutdoor.style.zip`），解压后直接拖入手机即可生效。

---

## 📱 手机端导入指南

### iOS (iPhone / iPad):
1. 解压下载的 `.zip` 得到 `xxx.style` 文件夹。
2. 电脑连接手机（访达 / iTunes）或通过“文件”App，将文件夹移入：  
   `我的 iPhone -> Guru Maps` 目录下。
3. 打开 Guru Maps 点击图层按钮，直接勾选你的新样式！

### Android:
1. 解压下载的 `.zip` 得到 `xxx.style` 文件夹。
2. 用文件管理器复制到：  
   `Android/data/com.galileo_app.maps/files/` 目录下。
3. 打开 Guru Maps 图层设置启用。
