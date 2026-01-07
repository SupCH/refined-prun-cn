// Popup 页面的权限请求逻辑
document.addEventListener('DOMContentLoaded', function () {
  const enableBtn = document.getElementById('enableBtn');
  const statusDiv = document.getElementById('status');

  // 检查当前权限状态
  checkPermissionStatus();

  // 点击按钮请求权限
  enableBtn.addEventListener('click', async function () {
    console.log('[Popup] User clicked enable button');
    statusDiv.style.display = 'block';
    statusDiv.className = 'status';
    statusDiv.textContent = '正在请求权限...';
    enableBtn.disabled = true;

    try {
      console.log('[Popup] Requesting notification permission...');
      const permission = await Notification.requestPermission();
      console.log('[Popup] Permission result:', permission);

      if (permission === 'granted') {
        statusDiv.className = 'status success';
        statusDiv.textContent = '✅ 通知已启用！船只出发和到达时会收到提醒。';
        enableBtn.textContent = '已启用';
        enableBtn.disabled = true;

        // 发送测试通知
        setTimeout(() => {
          new Notification('🚀 通知已启用', {
            body: '您将在船只出发和到达时收到提醒！',
            icon: chrome.runtime.getURL('icons/icon128.png'),
          });
        }, 500);
      } else if (permission === 'denied') {
        statusDiv.className = 'status error';
        statusDiv.textContent = '⚠️ 通知权限被拒绝。请在浏览器设置中允许通知。';
        enableBtn.disabled = false;
      } else {
        statusDiv.className = 'status';
        statusDiv.textContent = '未授予权限。';
        enableBtn.disabled = false;
      }
    } catch (error) {
      console.error('[Popup] Error requesting permission:', error);
      statusDiv.className = 'status error';
      statusDiv.textContent = '❌ 请求权限时出错：' + error.message;
      enableBtn.disabled = false;
    }
  });

  function checkPermissionStatus() {
    if ('Notification' in window) {
      const permission = Notification.permission;
      console.log('[Popup] Current permission:', permission);

      if (permission === 'granted') {
        statusDiv.style.display = 'block';
        statusDiv.className = 'status success';
        statusDiv.textContent = '✅ 通知已启用';
        enableBtn.textContent = '已启用';
        enableBtn.disabled = true;
      } else if (permission === 'denied') {
        statusDiv.style.display = 'block';
        statusDiv.className = 'status error';
        statusDiv.textContent = '⚠️ 通知权限被拒绝';
      }
    } else {
      statusDiv.style.display = 'block';
      statusDiv.className = 'status error';
      statusDiv.textContent = '❌ 浏览器不支持通知';
      enableBtn.disabled = true;
    }
  }
});
