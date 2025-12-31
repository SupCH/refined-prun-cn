# Refined PrUn 中文汉化版

**Refined PrUn** 是一款专为科幻经济模拟游戏 **Prosperous Universe (PrUn)** 设计的浏览器增强插件。本版本为**完全汉化版**，实现了 100% 的功能描述及界面汉化。

## ✨ 汉化版特性
- **全量汉化**：地毯式翻译了 80+ 个微功能开关及 26 个 XIT 自定义命令。
- **深度适配**：针对财务报表（资产负债表、损益表）、物资监控（BURN）、自动化脚本（ACT）等核心模块进行了语义化翻译。
- **一键部署**：默认开启中文语言，安装即用。

## 🚀 核心功能
- **XIT BURN**：实时监控所有基地的物资消耗，显示剩余天数。
- **XIT FIN/FINBS**：自动生成公司资产负债表，追踪现金流与资产价值。
- **XIT ACT**：创建并执行自动化动作包（转账、购买、加油等）。
- **UI 优化**：包括图标美化、合同进度直观显示、搜索增强等 100 余项改进。

## 📦 安装教程

### 1. Chrome / Edge / 浏览器 (推荐)
1. 下载本仓库 [Releases](https://github.com/SupCH/refined-prun-cn/releases) 中的 `Refined-PrUn-中文汉化版.zip`。
2. 解压压缩包到本地文件夹。
3. 打开浏览器扩展页面 (`chrome://extensions/`)。
4. 开启右上角的 **“开发者模式”**。
5. 点击 **“加载解压的扩展程序”**，选择解压后的 `dist` 文件夹。

### 2. Firefox 浏览器
1. 在地址栏输入 `about:debugging#/runtime/this-firefox`。
2. 点击右上角的 **“临时载入附加组件...”**。
3. 选择解压文件夹中的 `manifest.json` 文件。
   *(注意：临时载入在浏览器重启后会失效)*

## 🛠️ 开发与构建
如果你想自行修改或编译：
1. 克隆代码：`git clone https://github.com/SupCH/refined-prun-cn.git`
2. 安装依赖：`pnpm install`
3. 执行构建：`pnpm build`
4. 翻译文件位于：`src/infrastructure/i18n/zh.ts`

## ⚖️ 许可
本项目基于原作者 [Razenpok](https://github.com/refined-prun/refined-prun) 的开源项目二次开发，遵循 MIT 开源协议。