// 创建通知权限请求横幅
function createNotificationBanner() {
  console.log('[Notification Banner] Creating permission request banner');

  const banner = document.createElement('div');
  banner.id = 'refined-prun-notification-banner';
  banner.style.cssText = `
    position: fixed;
    top: 50px;
    left: 0;
    right: 0;
    background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
    color: white;
    padding: 12px 20px;
    display: flex;
    align-items: center;
    gap: 15px;
    box-shadow: 0 2px 8px rgba(0,0,0,0.2);
    z-index: 9999;
    font-family: system-ui, -apple-system, sans-serif;
    animation: slideDown 0.3s ease-out;
  `;

  banner.innerHTML = `
    <div style="font-size: 24px;">🔔</div>
    <div style="flex: 1;">
      <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">启用船只通知</div>
      <div style="font-size: 12px; opacity: 0.9;">点击允许后，船只出发和到达时会收到系统通知</div>
    </div>
    <div style="display: flex; gap: 10px;">
      <button class="dismiss-btn" style="
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        background: rgba(255,255,255,0.2);
        color: white;
      ">稍后</button>
      <button class="enable-btn" style="
        padding: 8px 16px;
        border: none;
        border-radius: 4px;
        cursor: pointer;
        font-size: 13px;
        background: white;
        color: #667eea;
        font-weight: bold;
      ">启用通知</button>
    </div>
  `;

  // 添加动画样式
  const style = document.createElement('style');
  style.textContent = `
    @keyframes slideDown {
      from {
        transform: translateY(-100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
  `;
  document.head.appendChild(style);

  // "稍后"按钮事件
  const dismissBtn = banner.querySelector('.dismiss-btn');
  dismissBtn.addEventListener('click', () => {
    console.log('[Notification Banner] User clicked "Later"');
    banner.style.animation = 'slideDown 0.3s ease-out reverse';
    setTimeout(() => {
      banner.remove();
    }, 300);
    localStorage.setItem('rprun-notification-banner-dismissed', 'true');
  });

  // "启用通知"按钮事件
  const enableBtn = banner.querySelector('.enable-btn');
  enableBtn.addEventListener('click', async () => {
    console.log('[Notification Banner] User clicked "Enable Notifications"');
    try {
      const permission = await Notification.requestPermission();
      console.log('[Notification Banner] Permission result:', permission);

      if (permission === 'granted') {
        // 成功授权，显示成功消息并移除横幅
        banner.querySelector('div[style*="flex: 1"]').innerHTML = `
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">✅ 通知已启用</div>
          <div style="font-size: 12px; opacity: 0.9;">您将在船只出发和到达时收到系统通知</div>
        `;
        banner.querySelector('.dismiss-btn').style.display = 'none';
        banner.querySelector('.enable-btn').style.display = 'none';

        setTimeout(() => {
          banner.style.animation = 'slideDown 0.3s ease-out reverse';
          setTimeout(() => {
            banner.remove();
          }, 300);
        }, 2000);
      } else if (permission === 'denied') {
        // 用户拒绝
        console.warn('[Notification Banner] User denied notification permission');
        banner.querySelector('div[style*="flex: 1"]').innerHTML = `
          <div style="font-weight: bold; font-size: 14px; margin-bottom: 4px;">⚠️ 通知权限被拒绝</div>
          <div style="font-size: 12px; opacity: 0.9;">您可以在浏览器设置中手动启用通知权限</div>
        `;
        banner.querySelector('.dismiss-btn').textContent = '关闭';
        banner.querySelector('.enable-btn').style.display = 'none';
      }
    } catch (error) {
      console.error('[Notification Banner] Error requesting permission:', error);
    }
  });

  document.body.appendChild(banner);
  console.log('[Notification Banner] Banner displayed');
}

function init() {
  console.log('[Notification Banner] Initializing notification permission banner feature');

  // 检查是否支持通知
  if (!('Notification' in window)) {
    console.warn('[Notification Banner] Browser does not support notifications');
    return;
  }

  // 检查权限状态
  if (Notification.permission !== 'default') {
    console.log(
      '[Notification Banner] Notification permission already set:',
      Notification.permission,
    );
    return;
  }

  // 检查用户是否已关闭横幅
  const dismissed = localStorage.getItem('rprun-notification-banner-dismissed');
  if (dismissed === 'true') {
    console.log('[Notification Banner] Banner was dismissed by user');
    return;
  }

  // 等待页面加载完成后显示横幅
  setTimeout(() => {
    createNotificationBanner();
  }, 1500);
}

features.add(
  import.meta.url,
  init,
  'Shows a banner to request notification permissions with user interaction.',
);
