import { alertsStore } from '@src/infrastructure/prun-api/data/alerts';
import { getEntityNameFromAddress } from '@src/infrastructure/prun-api/data/addresses';

// 存储已经通知过的船只到达事件，避免重复通知
const notifiedFlights = new Set<string>();

function handleShipArrival(alert: PrunApi.Alert) {
  // 避免重复通知
  if (notifiedFlights.has(alert.id)) {
    console.log('[Ship Notification] Already notified for this flight, skipping');
    return;
  }
  notifiedFlights.add(alert.id);

  console.log('[Ship Notification] Ship arrival detected!', { id: alert.id, alert });

  // 提取船只注册号
  const registration = alert.data.find(x => x.key === 'registration')?.value as string;
  if (!registration) {
    console.warn('[Ship Notification] No registration found in alert data');
    return;
  }

  // 提取目的地信息
  const destinationData = alert.data.find(x => x.key === 'destination')?.value as {
    address: PrunApi.Address;
  };
  const destination = destinationData
    ? (getEntityNameFromAddress(destinationData.address) ?? '未知目的地')
    : '未知目的地';

  console.log('[Ship Notification] Sending notification for:', { registration, destination });

  // 发送系统通知
  sendShipArrivalNotification(registration, destination);
}

function sendShipArrivalNotification(registration: string, destination: string) {
  // 检查通知权限
  if (!('Notification' in window)) {
    console.warn('[Ship Notification] Browser does not support notifications');
    return;
  }

  console.log('[Ship Notification] Notification permission status:', Notification.permission);

  // 请求通知权限（如果尚未授予）
  if (Notification.permission === 'granted') {
    createNotification(registration, destination);
  } else if (Notification.permission !== 'denied') {
    console.log('[Ship Notification] Requesting notification permission...');
    Notification.requestPermission().then(permission => {
      console.log('[Ship Notification] Permission result:', permission);
      if (permission === 'granted') {
        createNotification(registration, destination);
      }
    });
  } else {
    console.warn('[Ship Notification] Notification permission denied by user');
  }
}

function createNotification(registration: string, destination: string) {
  const title = '🚀 船只已到达港口';
  const body = `船只 ${registration} 已抵达 ${destination}`;

  console.log('[Ship Notification] Creating notification:', { title, body });

  const notification = new Notification(title, {
    body,
  });

  console.log('[Ship Notification] Notification created successfully');

  // 点击通知时聚焦到游戏窗口
  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  // 自动关闭通知
  setTimeout(() => {
    notification.close();
  }, 10000); // 10秒后自动关闭
}

function init() {
  console.log('[Ship Notification] Initializing ship arrival notification feature');

  // 初始化时，先将所有现有的 SHIP_FLIGHT_ENDED 警报标记为已通知，避免历史记录触发通知
  const existingAlerts = alertsStore.all.value;
  if (existingAlerts) {
    for (const alert of existingAlerts) {
      if (alert.type === 'SHIP_FLIGHT_ENDED') {
        notifiedFlights.add(alert.id);
      }
    }
    console.log(
      '[Ship Notification] Marked',
      notifiedFlights.size,
      'existing arrivals as notified',
    );
  }

  // 监听所有新增的警报
  watchEffect(() => {
    const alerts = alertsStore.all.value;
    if (!alerts) {
      return;
    }
    console.log('[Ship Notification] Alerts updated, count:', alerts.length);

    for (const alert of alerts) {
      if (alert.type === 'SHIP_FLIGHT_ENDED') {
        handleShipArrival(alert);
      }
    }
  });

  // 扩展加载时检查并请求通知权限
  if ('Notification' in window && Notification.permission === 'default') {
    console.log('[Ship Notification] Requesting notification permission on init...');
    // 延迟 2 秒后请求权限，避免在页面刚加载时弹出
    setTimeout(() => {
      Notification.requestPermission().then(permission => {
        console.log('[Ship Notification] Initial permission request result:', permission);
      });
    }, 2000);
  }
}

features.add(import.meta.url, init, 'Sends system notification when ship arrives at destination.');
