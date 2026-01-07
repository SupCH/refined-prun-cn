# Edge 商店发布材料
# Edge Store Publishing Materials

本文档提供 Microsoft Edge Add-ons 商店发布所需的所有材料和说明。

---

## 📋 商店列表信息 / Store Listing Information

### 扩展名称 / Extension Name
```
(zh-cn)refined-prun
```

### 简短描述 / Short Description (80 字符以内 / under 80 characters)
```
为 Prosperous Universe 提供中文汉化和 100+ 实用功能增强
```

或英文版本：
```
PrUn Chinese localization & 100+ productivity features
```

### 详细描述 / Detailed Description

#### 中文版本 (推荐用于中文市场)

```
# Refined PrUn 中文增强版

为科幻经济模拟游戏 **Prosperous Universe (PrUn)** 提供完整中文本地化和深度功能增强的浏览器扩展。

## ✨ 核心功能

### 🌏 完整中文汉化
- 100% 界面和功能描述中文化
- 覆盖 80+ 微功能开关
- 包含 26 个自定义 XIT 命令的中文帮助

### 📊 智能数据分析
- **BURN (物资监控)**: 实时追踪所有基地的材料消耗，显示剩余天数
- **FINBS (财务报表)**: 自动生成资产负债表、损益表和现金流分析
- **数据可视化**: 清晰的图表和进度指示器

### 🤖 自动化工具
- **ACT (动作包系统)**: 创建自定义自动化脚本
- **一键执行**: 批量处理转账、购买、补给等重复操作
- **智能控制**: 支持手动/自动模式切换

### 🎨 界面优化
- 100+ UI 增强改进
- 图标美化和视觉优化
- 合同进度直观显示
- 搜索功能增强

## 🎯 适用对象

- Prosperous Universe 游戏玩家（尤其是中文玩家）
- 需要高效管理复杂供应链的玩家
- 寻求数据可视化和自动化工具的玩家

## 🔒 隐私与安全

- ✅ 不收集任何个人信息
- ✅ 所有数据本地处理，不上传服务器
- ✅ 仅访问游戏官方域名 (apex.prosperousuniverse.com)
- ✅ 开源代码，透明可审计

## 📝 使用说明

1. 安装扩展
2. 访问 https://apex.prosperousuniverse.com
3. 登录游戏账号
4. 开始使用增强功能！

在游戏命令输入框中输入 `BURN`、`FINBS` 或 `ACT` 即可使用核心功能。

## 🔗 相关链接

- GitHub 仓库: https://github.com/SupCH/refined-prun-cn
- 原始项目: https://github.com/refined-prun/refined-prun
- 隐私政策: https://refined-prun-privacy.pages.dev/

---

**注意**: 本扩展仅在 Prosperous Universe 游戏网站上工作，这是设计行为。
```

#### 英文版本 (For English-speaking markets)

```
# Refined PrUn - Chinese Enhanced Edition

A comprehensive browser extension providing complete Chinese localization and advanced feature enhancements for **Prosperous Universe (PrUn)**, the sci-fi economy simulation game.

## ✨ Core Features

### 🌏 Complete Chinese Localization
- 100% UI and feature description translation
- Covers 80+ feature toggles
- Includes Chinese help for 26 custom XIT commands

### 📊 Intelligent Data Analytics
- **BURN (Supply Monitoring)**: Real-time tracking of material consumption across all bases with countdown timers
- **FINBS (Financial Reports)**: Auto-generated balance sheets, P&L statements, and cash flow analysis
- **Data Visualization**: Clear charts and progress indicators

### 🤖 Automation Tools
- **ACT (Action Package System)**: Create custom automation scripts
- **One-Click Execution**: Batch process transfers, purchases, refueling, and repetitive tasks
- **Smart Control**: Support for manual/automatic mode switching

### 🎨 UI Enhancements
- 100+ UI improvement tweaks
- Icon beautification and visual optimization
- Intuitive contract progress display
- Enhanced search functionality

## 🎯 Target Audience

- Prosperous Universe game players (especially Chinese-speaking players)
- Players managing complex supply chains efficiently
- Players seeking data visualization and automation tools

## 🔒 Privacy & Security

- ✅ Does NOT collect any personal information
- ✅ All data processed locally, never uploaded to servers
- ✅ Only accesses official game domain (apex.prosperousuniverse.com)
- ✅ Open-source code, transparent and auditable

## 📝 How to Use

1. Install the extension
2. Visit https://apex.prosperousuniverse.com
3. Log in to your game account
4. Start using enhanced features!

Type `BURN`, `FINBS`, or `ACT` in the game's command input to access core features.

## 🔗 Related Links

- GitHub Repository: https://github.com/SupCH/refined-prun-cn
- Original Project: https://github.com/refined-prun/refined-prun
- Privacy Policy: https://refined-prun-privacy.pages.dev/

---

**Note**: This extension only operates on the Prosperous Universe game website by design.
```

---

## 🔐 隐私权规范说明 / Privacy Policy Compliance

### 1. 单一用途说明 / Single Purpose Justification

**中文版本：**
```
本扩展的唯一目的是增强 Prosperous Universe 游戏体验。所有功能均围绕游戏界面优化、数据可视化和自动化操作展开,不涉及任何与游戏无关的用途。
```

**English Version:**
```
This extension serves a single purpose: to enhance the Prosperous Universe gaming experience. All features focus on UI improvements, data visualization, and workflow automation within the game, with no unrelated functionality.
```

### 2. 远程代码使用理由 / Remote Code Justification

**中文版本：**
```
本扩展**不使用**任何远程托管的代码。所有脚本均打包在扩展安装包内，无外部依赖或动态脚本加载。
```

**English Version:**
```
This extension does **NOT** use remotely hosted code. All scripts are bundled within the extension package with no external dependencies or dynamic code loading.
```

### 3. 主机权限使用理由 / Host Permissions Justification

**中文版本：**
```
本扩展需要访问 `https://apex.prosperousuniverse.com/*` 的权限，以便：
- 解析并优化游戏界面 DOM 结构
- 拦截并增强游戏内 API 响应数据（如财务报表、物资消耗统计）
- 注入自定义 UI 组件和功能增强脚本

所有操作均限定在游戏官方域名下，绝不访问其他网站。
```

**English Version:**
```
This extension requires access to `https://apex.prosperousuniverse.com/*` to:
- Parse and optimize the game's DOM structure
- Intercept and enhance in-game API responses (e.g., financial reports, supply tracking)
- Inject custom UI components and enhancement scripts

All operations are strictly limited to the official game domain with no access to other websites.
```

### 4. storage 权限使用理由 / Storage Permission Justification

**中文版本：**
```
本扩展使用 `storage` 权限来保存用户的个性化设置，包括：
- 功能开关状态（80+ 可配置选项）
- 自定义动作包配置（XIT ACT）
- 界面布局偏好和语言选择

所有数据仅存储在用户本地浏览器中，不会上传到任何服务器。
```

**English Version:**
```
This extension uses the `storage` permission to persist user preferences, including:
- Feature toggle states (80+ configurable options)
- Custom action package configurations (XIT ACT)
- UI layout preferences and language settings

All data is stored locally in the user's browser and is never uploaded to any server.
```

### 5. webRequest 权限使用理由 / webRequest Permission Justification

**中文版本：**
```
本扩展使用 `webRequest` 权限来监听游戏 API 请求，以便：
- 实时捕获财务数据并生成资产负债表（XIT FINBS）
- 追踪物资消耗并计算剩余天数（XIT BURN）
- 优化数据加载流程，提升响应速度

扩展仅监听游戏官方 API 请求，不会干扰或拦截其他网络流量。
```

**English Version:**
```
This extension uses the `webRequest` permission to monitor game API requests in order to:
- Capture financial data in real-time for balance sheet generation (XIT FINBS)
- Track supply consumption and calculate remaining days (XIT BURN)
- Optimize data loading workflows for improved responsiveness

The extension only monitors official game API requests and does not interfere with other network traffic.
```

### 6. 数据使用合规性确认 / Data Usage Compliance

**中文版本：**
```
本扩展遵守 Microsoft Edge 开发者计划政策，承诺：
- 不收集用户个人信息
- 不将用户数据传输至第三方服务器
- 所有数据处理均在本地完成
- 仅访问用户明确授权的游戏域名
```

**English Version:**
```
This extension complies with Microsoft Edge Developer Program Policies by:
- Not collecting any personal user information
- Not transmitting user data to third-party servers
- Processing all data locally
- Only accessing explicitly authorized game domains
```

---

## 📨 给审核团队的说明 / Notes to Reviewers

### 关于功能测试 / About Functionality Testing

> [!IMPORTANT]
> **请参阅详细测试指南**: `EDGE_STORE_TESTING_GUIDE.md`
> 
> **Please refer to the detailed testing guide**: `EDGE_STORE_TESTING_GUIDE.md`

本扩展是**专用游戏增强工具**，仅在 `https://apex.prosperousuniverse.com/*` 上工作。这是**设计行为**，而非缺陷。

This extension is a **dedicated gaming enhancement tool** that only operates on `https://apex.prosperousuniverse.com/*`. This is **intentional design**, not a defect.

### 测试核心功能的快速步骤 / Quick Steps to Test Core Features

1. ✅ 安装扩展 / Install the extension
2. ✅ 访问游戏网站 / Visit the game website: https://apex.prosperousuniverse.com
3. ✅ 注册免费试用账号（如需要）/ Register a free trial account (if needed)
4. ✅ 在游戏命令输入框输入以下命令 / Type these commands in the game's input box:
   - `BURN` - 查看物资监控 / View supply monitoring
   - `FINBS` - 查看财务报表 / View financial reports
   - `ACT` - 查看自动化工具 / View automation tools
5. ✅ 观察界面中文化效果 / Observe Chinese localization

### 为什么在其他网站上看不到扩展？ / Why is the extension "invisible" on other websites?

这是安全和性能最佳实践：

This follows security and performance best practices:

```json
// manifest.json 配置 / Configuration
"content_scripts": [{
    "matches": ["https://apex.prosperousuniverse.com/*"]
}]
```

- ✅ 防止在无关网站上消耗资源 / Prevents resource consumption on unrelated websites
- ✅ 保护用户隐私，限制主机权限 / Protects user privacy by limiting host permissions
- ✅ 遵循 Edge 扩展开发指南 / Follows Edge extension development guidelines

---

## 📸 屏幕截图要求 / Screenshot Requirements

建议提供 3-5 张展示核心功能的截图 / Recommend 3-5 screenshots showcasing core features:

1. **BURN 物资监控界面** / BURN Supply Monitoring Interface
2. **FINBS 财务报表界面** / FINBS Financial Reports Interface
3. **ACT 自动化动作包界面** / ACT Automation Interface
4. **设置面板（展示 80+ 功能开关）** / Settings Panel (showing 80+ feature toggles)
5. **优化后的游戏主界面** / Enhanced Game Main Interface

截图尺寸 / Screenshot dimensions: **1280x800** 或 / or **640x400** (Edge 商店推荐 / Edge store recommended)

---

## 🎨 图标要求 / Icon Requirements

确保项目根目录下的 `public/icons/` 文件夹中包含以下尺寸的图标：

Ensure the `public/icons/` folder contains icons in the following sizes:

- ✅ **128x128** (必需 / Required)
- ✅ **48x48**
- ✅ **32x32**
- ✅ **16x16**

---

## ✅ 发布操作清单 / Publishing Checklist

### 必填项 / Required Items

- [x] 扩展名称 / Extension Name
- [ ] 简短描述（80 字符内）/ Short Description (under 80 characters)
- [ ] 详细描述（至少 25 字符）/ Detailed Description (at least 25 characters)
- [ ] 隐私政策 URL / Privacy Policy URL: `https://refined-prun-privacy.pages.dev/`
- [ ] 至少 1 张屏幕截图 / At least 1 screenshot
- [ ] 图标文件（128x128）/ Icon file (128x128)
- [ ] 联系电子邮件验证 / Contact email verification
- [ ] 分类选择 / Category selection: **娱乐 / Entertainment** 或 / or **生产力 / Productivity**

### 隐私权规范确认 / Privacy Compliance Confirmation

- [ ] 单一用途说明 / Single Purpose Justification
- [ ] 远程代码使用说明 / Remote Code Justification
- [ ] 主机权限使用理由 / Host Permissions Justification
- [ ] storage 权限使用理由 / Storage Permission Justification
- [ ] webRequest 权限使用理由 / webRequest Permission Justification
- [ ] 数据使用合规性确认 / Data Usage Compliance

### 审核团队说明 / Notes to Reviewers

- [ ] 将 `EDGE_STORE_TESTING_GUIDE.md` 内容复制到"审核备注"栏 / Copy `EDGE_STORE_TESTING_GUIDE.md` content to "Notes for Reviewers"
- [ ] 说明扩展仅在游戏网站工作是设计行为 / Explain that the extension only working on the game website is intentional
- [ ] 提供测试步骤和预期结果 / Provide testing steps and expected results

---

## 🚀 提交流程 / Submission Process

1. **登录 Edge 合作伙伴中心** / Log in to Edge Partner Center
   - https://partner.microsoft.com/dashboard/microsoftedge/overview

2. **上传扩展包** / Upload Extension Package
   - 使用 `(Edge)(zh-cn)refined-prun.zip`

3. **填写商店列表信息** / Fill in Store Listing Information
   - 复制上述"商店列表信息"部分的内容

4. **填写隐私权规范** / Fill in Privacy Compliance
   - 复制上述"隐私权规范说明"部分的内容

5. **添加审核备注** / Add Notes for Reviewers
   - 粘贴 `EDGE_STORE_TESTING_GUIDE.md` 的关键内容
   - 特别说明扩展的适用范围和测试方法

6. **提交审核** / Submit for Review

7. **等待反馈** / Wait for Feedback
   - 通常 3-7 个工作日 / Usually 3-7 business days

---

## 📞 联系与支持 / Contact & Support

**开发者 / Developer**: SupCH  
**GitHub**: https://github.com/SupCH/refined-prun-cn  
**原始项目 / Original Project**: https://github.com/refined-prun/refined-prun  

如有任何疑问，请通过 Edge 合作伙伴中心消息系统联系。

For any questions, please contact via the Edge Partner Center messaging system.
