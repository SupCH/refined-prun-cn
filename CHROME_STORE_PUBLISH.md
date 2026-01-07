# Chrome 商店发布材料

## 隐私权规范说明（必填项）

### 1. 单一用途说明（Single Purpose Justification）
**中文版本：**
本扩展的唯一目的是增强 Prosperous Universe 游戏体验。所有功能均围绕游戏界面优化、数据可视化和自动化操作展开，不涉及任何与游戏无关的用途。

**English Version:**
This extension serves a single purpose: to enhance the Prosperous Universe gaming experience. All features focus on UI improvements, data visualization, and workflow automation within the game, with no unrelated functionality.

---

### 2. 远程代码使用理由（Remote Code Justification）
**中文版本：**
本扩展**不使用**任何远程托管的代码。所有脚本均打包在扩展安装包内，无外部依赖或动态脚本加载。

**English Version:**
This extension does **NOT** use remotely hosted code. All scripts are bundled within the extension package with no external dependencies or dynamic code loading.

---

### 3. 主机权限使用理由（Host Permissions Justification）
**中文版本：**
本扩展需要访问 `https://apex.prosperousuniverse.com/*` 的权限，以便：
- 解析并优化游戏界面 DOM 结构
- 拦截并增强游戏内 API 响应数据（如财务报表、物资消耗统计）
- 注入自定义 UI 组件和功能增强脚本

所有操作均限定在游戏官方域名下，绝不访问其他网站。

**English Version:**
This extension requires access to `https://apex.prosperousuniverse.com/*` to:
- Parse and optimize the game's DOM structure
- Intercept and enhance in-game API responses (e.g., financial reports, supply tracking)
- Inject custom UI components and enhancement scripts

All operations are strictly limited to the official game domain with no access to other websites.

---

### 4. storage 权限使用理由（Storage Permission Justification）
**中文版本：**
本扩展使用 `storage` 权限来保存用户的个性化设置，包括：
- 功能开关状态（80+ 可配置选项）
- 自定义动作包配置（XIT ACT）
- 界面布局偏好和语言选择

所有数据仅存储在用户本地浏览器中，不会上传到任何服务器。

**English Version:**
This extension uses the `storage` permission to persist user preferences, including:
- Feature toggle states (80+ configurable options)
- Custom action package configurations (XIT ACT)
- UI layout preferences and language settings

All data is stored locally in the user's browser and is never uploaded to any server.

---

## 数据获取方式说明

本扩展通过以下方式获取和处理数据：

**技术实现**：
1. **WebSocket 和 XMLHttpRequest 代理**：通过 JavaScript Proxy 拦截游戏自身的网络通信
2. **DOM 解析**：直接从游戏页面的 HTML 结构中提取数据
3. **Content Script**：在页面上下文中运行，访问游戏的全局对象和函数
4. **本地存储**：使用 `chrome.storage` API 保存用户设置

**不使用**：
- ❌ `chrome.webRequest` API（所有数据拦截通过 JavaScript Proxy 实现）
- ❌ `chrome.notifications` API（使用标准 Web Notifications API）
- ❌ 后台服务器（所有数据处理都在本地浏览器中完成）
- ❌ 跨站跟踪（仅访问游戏官方域名）

---

### 5. 数据使用合规性确认（Data Usage Compliance）
**中文版本：**
本扩展遵守 Chrome 开发者计划政策，承诺：
- 不收集用户个人信息
- 不将用户数据传输至第三方服务器
- 所有数据处理均在本地完成
- 仅访问用户明确授权的游戏域名

**English Version:**
This extension complies with Chrome Developer Program Policies by:
- Not collecting any personal user information
- Not transmitting user data to third-party servers
- Processing all data locally
- Only accessing explicitly authorized game domains

---

## 其他发布要求

### 6. 详细说明（至少 25 个字符）
已在之前提供的中英双语说明中满足（约 800+ 字符）。

### 7. 联系电子邮件
需要您在 Chrome Web Store 开发者后台的"账号"标签页中：
1. 输入您的联系邮箱
2. 点击验证链接完成验证

### 8. 屏幕截图要求
建议提供 3-5 张展示核心功能的截图：
- XIT BURN 物资监控界面
- XIT FINBS 财务报表界面
- XIT ACT 自动化动作包界面
- 设置面板展示 80+ 功能开关
- 优化后的游戏主界面

截图尺寸：1280x800 或 640x400（Chrome 商店推荐）

### 9. 图标要求
确保项目根目录下的 `icons/` 文件夹中包含以下尺寸的图标：
- 128x128 (必需)
- 48x48
- 32x32
- 16x16

---

## 快速操作清单

✅ 1. 将上述"隐私权规范说明"部分的内容复制到 Chrome 商店对应的文本框中  
✅ 2. 在"账号"标签页添加并验证联系邮箱  
✅ 3. 上传至少 1 张屏幕截图  
✅ 4. 确认图标文件存在  
✅ 5. 勾选数据使用合规性确认框  
✅ 6. 保存草稿并提交审核  
