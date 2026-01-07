# Edge Store 审核人员测试指南
# Testing Guide for Edge Store Reviewers

---

## 📋 扩展概述 / Extension Overview

### 中文说明

**扩展名称**: (zh-cn)refined-prun  
**目标用户**: Prosperous Universe 游戏玩家  
**核心价值**: 为科幻经济模拟游戏提供中文本地化和功能增强

本扩展是一款**专用游戏增强工具**，仅在游戏官方网站 `https://apex.prosperousuniverse.com` 上工作。这是设计行为，而非缺陷。

### English Description

**Extension Name**: (zh-cn)refined-prun  
**Target Users**: Prosperous Universe game players  
**Core Value**: Chinese localization and feature enhancements for the sci-fi economy simulation game

This extension is a **dedicated gaming enhancement tool** that only operates on the official game website `https://apex.prosperousuniverse.com`. This is intentional design, not a defect.

---

## 🎯 扩展的价值主张 / Value Proposition

### Why This Extension Exists

**Problem it solves:**
- Prosperous Universe is a complex browser-based economy game with NO official Chinese support
- Players need advanced data visualization tools for supply chain management
- Repetitive operations need automation to improve efficiency

**What this extension provides:**
1. ✅ **Complete Chinese Localization** (100% UI translation)
2. 📊 **Supply Monitoring (BURN)**: Real-time tracking of material consumption across all bases
3. 💰 **Financial Reports (FINBS)**: Auto-generated balance sheets and P&L statements
4. 🤖 **Automation System (ACT)**: Custom action packages for repetitive tasks
5. 🎨 **100+ UI Enhancements**: Icon improvements, contract progress indicators, search enhancements

### Target Audience

- **Primary**: Chinese-speaking Prosperous Universe players
- **Secondary**: Any player wanting enhanced data visualization and automation

---

## 🧪 如何测试本扩展 / How to Test This Extension

### ⚠️ IMPORTANT: Prerequisites

> [!WARNING]
> This extension **ONLY** works on `https://apex.prosperousuniverse.com/*`
> 
> You will NOT see any extension features on:
> - The Edge new tab page
> - google.com or any other website
> - The game's marketing website (prosperousuniverse.com without `apex.` subdomain)

**To test this extension, you MUST:**
1. Visit the game website: https://apex.prosperousuniverse.com
2. The game requires account registration (free trial available)
3. Extension features activate after the game interface loads

### Testing Steps

#### Step 1: Install the Extension
1. Load the unpacked extension in Edge
2. Confirm the extension icon appears in the toolbar

#### Step 2: Navigate to the Game
1. Open a new tab and visit: `https://apex.prosperousuniverse.com`
2. If you don't have an account, you can create a free trial account
3. Wait for the game interface to fully load

#### Step 3: Verify Chinese Localization
1. Once in the game, observe that UI elements are translated to Chinese
2. Look for feature toggles in the settings panel (应该有 80+ 功能开关)
3. Verify that command help text displays in Chinese

#### Step 4: Test Core Features

**Test BURN (Supply Monitoring):**
1. In the game's command input (usually labeled "XIT" or similar), type: `BURN`
2. Expected result: A panel showing material consumption across all player bases
3. Data should display in Chinese with "remaining days" calculations

**Test FINBS (Financial Reports):**
1. In the command input, type: `FINBS`
2. Expected result: Auto-generated balance sheet with assets, liabilities, and equity
3. Should display in Chinese with formatted financial data

**Test ACT (Automation):**
1. In the command input, type: `ACT`
2. Expected result: Action package management interface
3. UI should be fully in Chinese with options to create/edit/execute automation scripts

#### Step 5: Verify UI Enhancements
1. Navigate through different game screens
2. Observe improved icons, contract progress bars, and visual enhancements
3. Check that the game interface remains functional and stable

---

## 🔍 功能可用性说明 / Feature Availability Explanation

### Why the extension appears "inactive" on other websites

This is **intentional and correct behavior**:

```json
// From manifest.json
"content_scripts": [{
    "matches": ["https://apex.prosperousuniverse.com/*"]
}]
```

The extension uses `content_scripts` that are **explicitly scoped** to the game domain. This is a security and performance best practice:

- ✅ Prevents unnecessary resource consumption on unrelated websites
- ✅ Protects user privacy by limiting host permissions
- ✅ Follows Chrome/Edge extension development guidelines

### How to verify the extension is working

**Indicators of successful installation:**

1. **Extension Icon**: Should appear in Edge toolbar
2. **On Game Website**: 
   - Console should show extension initialization logs (if dev tools are open)
   - UI should display Chinese translations
   - XIT commands should respond with enhanced features
3. **Extension Settings**: Right-click extension icon → should show options/settings

---

## 📸 功能演示 / Feature Demonstration

### Expected Visual Indicators

When properly installed and active on the game website, you should see:

| Feature | Visual Indicator |
|---------|-----------------|
| Chinese Localization | All UI text in Chinese characters |
| BURN Command | Material consumption table with countdown timers |
| FINBS Command | Balance sheet with assets/liabilities breakdown |
| ACT Command | Action package editor with Chinese labels |
| UI Enhancements | Enhanced icons, progress bars, tooltips |

### Screenshots Reference

For visual reference of expected functionality, please see:
- `docs/` folder in the source code (if available)
- GitHub repository: https://github.com/SupCH/refined-prun-cn
- Original project screenshots (English version): https://github.com/refined-prun/refined-prun

---

## ❓ 常见问题 / Frequently Asked Questions

### Q1: I don't see ANY features after installing. Is it broken?

**A**: The extension only activates on `https://apex.prosperousuniverse.com/*`. Please:
1. Confirm you're on the correct website (check the URL)
2. Refresh the page after installing the extension
3. Check browser console for any error messages

### Q2: Do I need a game account to test this?

**A**: Yes, the game features are only accessible after logging in. However:
- You can create a free trial account
- Basic UI enhancements (icons, layout) are visible without an active game session
- Some features require in-game data to display properly

### Q3: Why does the extension request `webRequest` permission?

**A**: The extension uses `webRequest` to:
- Intercept game API responses for financial data extraction (FINBS)
- Monitor supply consumption data (BURN)
- Enhance data loading performance

All network monitoring is **strictly limited** to the game domain.

### Q4: Is this extension safe?

**A**: Yes. The extension:
- ✅ Does NOT collect any personal user information
- ✅ Does NOT transmit data to external servers
- ✅ Only accesses the game website (no other domains)
- ✅ All data processing happens locally in the browser
- ✅ Open source code available on GitHub

### Q5: How can I verify the extension is installed correctly?

**A**: 
1. Visit `edge://extensions/` and confirm the extension is enabled
2. Navigate to `https://apex.prosperousuniverse.com`
3. Open browser DevTools Console (F12)
4. Look for messages starting with `[Refined PrUn]` (indicates successful initialization)

---

## 📞 联系与支持 / Contact & Support

**Developer**: SupCH  
**GitHub**: https://github.com/SupCH/refined-prun-cn  
**Original Project**: https://github.com/refined-prun/refined-prun  

For review-related questions, please contact via:
- GitHub Issues: https://github.com/SupCH/refined-prun-cn/issues
- Developer email: (provided in Edge Partner Center)

---

## ✅ 审核检查清单 / Review Checklist

To confirm proper functionality, please verify:

- [ ] Extension installs without errors
- [ ] Extension only requests necessary permissions (`storage`, `webRequest`)
- [ ] Extension only activates on `https://apex.prosperousuniverse.com/*`
- [ ] Chinese UI translations are visible on the game website
- [ ] At least one XIT command (BURN/FINBS/ACT) executes successfully
- [ ] Extension does not modify behavior on non-game websites
- [ ] No console errors when navigating the game interface

---

**Thank you for reviewing this extension!** 🙏

If you have any questions about testing or functionality, please feel free to reach out through the Edge Partner Center messaging system.
