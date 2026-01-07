// 游戏风格的通知权限横幅
function createGameStyleBanner() {
  console.log('[Notification Banner] Creating game-style notification banner');

  const banner = document.createElement('div');
  banner.id = 'refined-prun-notification-banner';
  banner.style.cssText = `
    position: fixed;
    top: 60px;
    left: 50%;
    transform: translateX(-50%);
    width: 500px;
    background: rgba(25, 30, 40, 0.95);
    border: 2px solid #4a90e2;
    border-radius: 4px;
    box-shadow: 0 4px 12px rgba(0,0,0,0.4);
    z-index: 99999;
    font-family: 'Courier New', monospace;
    animation: slideDown 0.4s ease-out;
  `;

  banner.innerHTML = `
    <div style="padding: 16px;">
      <div style="display: flex; align-items: center; gap: 12px; margin-bottom: 12px;">
        <span style="font-size: 24px;">🚀</span>
        <div style="flex: 1;">
          <div style="color: #4a90e2; font-weight: bold; font-size: 14px; margin-bottom: 4px;">
            [ SHIP NOTIFICATION SYSTEM ]
          </div>
          <div style="color: #8a9aa9; font-size: 12px;">
            系统检测到通知功能未启用
          </div>
        </div>
        <button class="close-btn" style="
          background: transparent;
          border: 1px solid #666;
          color: #999;
          padding: 4px 8px;
          cursor: pointer;
          font-size: 18px;
          border-radius: 3px;
        ">×</button>
      </div>
      
      <div style="background: rgba(0,0,0,0.3); padding: 12px; border-radius: 3px; margin-bottom: 12px;">
        <div style="color: #ddd; font-size: 13px; line-height: 1.6;">
          <div style="margin-bottom: 8px; color: #ffa726;">
            ⚠️ 通知权限未授予或系统通知被禁用
          </div>
          <div style="margin-bottom: 4px;">启用后可接收船只出发/到达提醒：</div>
          <div style="padding-left: 12px; color: #8a9aa9; font-size: 12px;">
            1. 点击地址栏左侧的 🔒 锁图标<br>
            2. 找到"通知"权限选项<br>
            3. 改为"允许"<br>
            4. 刷新页面
          </div>
        </div>
      </div>
      
      <div style="display: flex; gap: 8px; justify-content: flex-end;">
        <button class="dismiss-btn" style="
          background: rgba(255,255,255,0.1);
          border: 1px solid #666;
          color: #ddd;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 12px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        ">[ 稍后提醒 ]</button>
        <button class="close-permanent-btn" style="
          background: rgba(74, 144, 226, 0.2);
          border: 1px solid #4a90e2;
          color: #4a90e2;
          padding: 8px 16px;
          cursor: pointer;
          font-size: 12px;
          border-radius: 3px;
          font-family: 'Courier New', monospace;
        ">[ 不再提示 ]</button>
      </div>
    </div>
  `;

  // 添加动画
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        transform: translate(-50%, -100%);
        opacity: 0;
      }
      to {
        transform: translate(-50%, 0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // 关闭按钮
  const closeBtn = banner.querySelector('.close-btn') as HTMLButtonElement;
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      banner.style.animation = 'slideDown 0.3s ease-out reverse';
      setTimeout(() => banner.remove(), 300);
    });
  }

  // "稍后提醒"按钮
  const dismissBtn = banner.querySelector('.dismiss-btn') as HTMLButtonElement;
  if (dismissBtn) {
    dismissBtn.addEventListener('click', () => {
      console.log('[Notification Banner] User clicked "Dismiss"');
      banner.style.animation = 'slideDown 0.3s ease-out reverse';
      setTimeout(() => banner.remove(), 300);
      // 不保存到 localStorage，下次刷新还会显示
    });
  }

  // "不再提示"按钮
  const closePermanentBtn = banner.querySelector('.close-permanent-btn') as HTMLButtonElement;
  if (closePermanentBtn) {
    closePermanentBtn.addEventListener('click', () => {
      console.log('[Notification Banner] User clicked "Do not show again"');
      banner.style.animation = 'slideDown 0.3s ease-out reverse';
      setTimeout(() => banner.remove(), 300);
      localStorage.setItem('rprun-notification-banner-dismissed', 'true');
    });
  }

  document.body.appendChild(banner);
  console.log('[Notification Banner] Game-style banner displayed');
}

function init() {
  console.log('[Notification Banner] Initializing notification permission banner feature');

  // 检查是否支持通知
  if (!('Notification' in window)) {
    console.warn('[Notification Banner] Browser does not support notifications');
    return;
  }

  // 检查权限状态
  if (Notification.permission === 'granted') {
    console.log('[Notification Banner] Notification permission already granted');
    return;
  }

  // 检查用户是否已永久关闭横幅
  const dismissed = localStorage.getItem('rprun-notification-banner-dismissed');
  if (dismissed === 'true') {
    console.log('[Notification Banner] Banner was permanently dismissed by user');
    return;
  }

  // 等待页面加载完成后显示横幅
  setTimeout(() => {
    createGameStyleBanner();
  }, 2000);
}

features.add(
  import.meta.url,
  init,
  'Shows a game-styled banner to guide users to enable notification permissions.',
);
