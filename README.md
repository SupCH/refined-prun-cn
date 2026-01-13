# Refined PrUn 中文汉化版

[![GitHub release (latest by date)](https://img.shields.io/github/v/release/SupCH/refined-prun-cn?style=flat-square)](https://github.com/SupCH/refined-prun-cn/releases)
[![GitHub license](https://img.shields.io/github/license/SupCH/refined-prun-cn?style=flat-square)](https://github.com/SupCH/refined-prun-cn/blob/main/LICENSE)
[![GitHub repo size](https://img.shields.io/github/repo-size/SupCH/refined-prun-cn?style=flat-square)](https://github.com/SupCH/refined-prun-cn)
[![GitHub contributors](https://img.shields.io/github/contributors/SupCH/refined-prun-cn?style=flat-square)](https://github.com/SupCH/refined-prun-cn/graphs/contributors)


## 🎯 核心价值

**本扩展专为《星海远航》(Prosperous Universe) 游戏玩家设计**，提供：
- ✅ **完整中文汉化**：100% 界面和功能描述中文化
- 📊 **智能数据分析**：物资消耗监控(BURN)、财务报表生成(FINBS)
- 🤖 **自动化工具**：自定义动作包系统(ACT)，一键执行复杂操作
- 🎨 **界面优化**：100+ 微功能改进，提升游戏体验

> **适用网站**: https://apex.prosperousuniverse.com  
> **目标用户**: Prosperous Universe 游戏玩家  
> **核心优势**: 唯一的中文本地化 + 深度功能增强版本

---

**Refined PrUn** 是一款专为科幻经济模拟游戏 **Prosperous Universe (PrUn)** 设计的浏览器增强插件。本版本为**完全汉化版**，实现了 100% 的功能描述及界面汉化。

> **原项目地址**：[refined-prun/refined-prun](https://github.com/refined-prun/refined-prun)  
> 本项目为中文汉化版，在原版基础上进行了完整的中文翻译，并新增了实用功能。

## ✨ 汉化版特性
- **全量汉化**：地毯式翻译了 80+ 个微功能开关及 26 个 XIT 自定义命令。
- **深度适配**：针对财务报表（资产负债表、损益表）、物资监控（BURN）、自动化脚本（ACT）等核心模块进行了语义化翻译。
- **一键部署**：默认开启中文语言，安装即用。
- **多平台支持**：支持 Chrome, Edge 和 Firefox，并提供完整的应用商店上架指引。

## 🆕 版本更新（v1.3.0）

### 商店上架准备与合规性
- **隐私权政策**：新增中英文双语[隐私权政策](file:///d:/Tools/browser-extensions/refined-prun/PRIVACY_POLICY.md)，符合 Chrome/Edge 商店合规要求。
- **审核指南**：新增 [Edge 商店测试指南](file:///d:/Tools/browser-extensions/refined-prun/EDGE_STORE_TESTING_GUIDE.md)，协助审核人员快速理解项目价值。
- **发布手册**：整理了 [Chrome](file:///d:/Tools/browser-extensions/refined-prun/CHROME_STORE_PUBLISH.md) 及 [Edge](file:///d:/Tools/browser-extensions/refined-prun/EDGE_STORE_PUBLISH.md) 商店发布完整流程。

### 🆕 新增功能（v1.2.0 / v1.1.0）

### 快速购买增强 (Quick Purchase)
- **价格显示**：直接在列表中显示单价和预估总价。
- **价格补全**：新增"生成价格加载指令"功能，可通过 `CXPO` 指令批量获取缺失的价格数据。
- **指令精准**：采用 `CXPO <物品>.<交易所>` 格式，精准打开对应交易所订单。
- **体验优化**：本地仓库优先展示，按钮样式统一。


### BURN 快速购买基础
- **站点选择**：可选择特定基地生成购买计划（仅采购该基地需要的材料）
- **天数自定义**：可自定义补给天数（默认 14 天）
- **材料分类**：自动区分消耗品和原材料，清晰展示

### ACT 完整汉化
- **界面全中文**：动作包列表、编辑器、执行器全部汉化
- **表单汉化**：添加/编辑动作表单（Type, Name, Material Group 等）已翻译
- **执行状态汉化**：所有按钮、状态消息、提示文本均已中文化

### Bug 修复
- **空值防护**：修复 CX Buy 动作在缺少交易所仓库数据时的崩溃问题
- **材料组验证**：添加防御性检查，避免未定义材料组导致的错误


## 🚀 核心功能
- **XIT BURN**：实时监控所有基地的物资消耗，显示剩余天数。
- **XIT FIN/FINBS**：自动生成公司资产负债表，追踪现金流与资产价值。
- **XIT ACT**：创建并执行自动化动作包（转账、购买、加油等）。
- **UI 优化**：包括图标美化、合同进度直观显示、搜索增强等 100 余项改进。


## 📦 安装

### 从应用商店安装（推荐）

| 浏览器 | 商店链接 |
|--------|----------|
| Chrome | [Chrome Web Store](https://chromewebstore.google.com/detail/gobccillghkhdcmhcdgcbdgmklbaegla) |
| Edge | [Edge Add-ons](https://microsoftedge.microsoft.com/addons/detail/zhcnrefinedprun/cgpmjmdhfanffbgagpcemapomhfhppab) |
| Firefox | [Firefox Add-ons](https://addons.mozilla.org/zh-CN/firefox/addon/refined-prun-cn/) |

### 手动安装 (Chrome / Edge / Firefox)
1. 下载本仓库 [Releases](https://github.com/SupCH/refined-prun-cn/releases) 中对应浏览器的压缩包：
   - Chrome: `(Chrome)(zh-cn)refined-prun.zip`
   - Edge: `(Edge)(zh-cn)refined-prun.zip`
   - Firefox: `(Firefox)(zh-cn)refined-prun.zip`
2. 解压压缩包到本地文件夹。
3. **Chrome / Edge**: 
   - 打开扩展页面 (`chrome://extensions/`)，开启 **“开发者模式”**。
   - 点击 **“加载解压的扩展程序”**，选择解压后的文件夹。
4. **Firefox**:
   - 在地址栏输入 `about:debugging#/runtime/this-firefox`。
   - 点击 **“临时载入附加组件...”**，选择解压文件夹中的 `manifest.json` 文件。

## 🛠️ 开发与构建

本项目已建立自动化多平台构建系统。

1. **环境准备**：
   - 克隆代码：`git clone https://github.com/SupCH/refined-prun-cn.git`
   - 安装依赖：`pnpm install`

2. **构建命令**：
   - **全平台构建并打包**：`pnpm run package:all` (生成所有平台的 .zip 文件)
   - **Chrome 构建**：`pnpm run build:chrome`
   - **Firefox 构建**：`pnpm run build:firefox`
   - **Edge 构建**：`pnpm run build:edge`
   - **本地开发构建** (带 sourcemap)：`pnpm run build:local`

3. **配置文件**：
   - 基础清单：`manifest.base.json`
   - 翻译文件：`src/infrastructure/i18n/zh.ts`
   - 构建脚本：`scripts/` 目录

---

## 🛠 Submission Instructions for Firefox Reviewers

This extension is built from source code using TypeScript and Vite. Reviewers can reproduce the build as follows:

### Prerequisites:
- **Node.js**: version `22.x` or higher (tested with `22.15.0`)
- **Package Manager**: `pnpm` (version `9.x`)

### Build Instructions:
1. Extract the source code archive.
2. Open a terminal in the root directory of the extracted source.
3. Install dependencies:
   ```bash
   pnpm install
   ```
4. Build the Firefox extension:
   ```bash
   pnpm run build:firefox
   ```
5. The built extension (including the `manifest.json`) will be located in the `dist/firefox/` directory.

### Build Scripts:
- The build process is orchestrated by `vite` and `scripts/build-all.ts`.
- `manifest.base.json` is used as the template for the final `manifest.json`.

---

Made with ♥ by [SupCH](https://github.com/SupCH) and [refined-prun](https://github.com/refined-prun/refined-prun) contributors.

## ⚖️ 许可
本项目基于原作者 [Razenpok](https://github.com/refined-prun/refined-prun) 的开源项目二次开发，遵循 MIT 开源协议。