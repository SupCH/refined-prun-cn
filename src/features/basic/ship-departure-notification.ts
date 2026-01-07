import { onApiMessage } from '@src/infrastructure/prun-api/data/api-messages';
import { shipsStore } from '@src/infrastructure/prun-api/data/ships';
import { getEntityNameFromAddress } from '@src/infrastructure/prun-api/data/addresses';

// 存储已经通知过的出发事件，避免重复通知
const notifiedDepartures = new Set<string>();

function handleShipDeparture(flight: PrunApi.Flight) {
  // 避免重复通知
  if (notifiedDepartures.has(flight.id)) {
    console.log('[Ship Departure] Already notified for this flight, skipping');
    return;
  }
  notifiedDepartures.add(flight.id);

  console.log('[Ship Departure] Ship departure detected:', {
    flightId: flight.id,
    shipId: flight.shipId,
    origin: flight.origin,
    destination: flight.destination,
  });

  // 获取船只信息
  const ship = shipsStore.getById(flight.shipId);
  const registration = ship?.registration ?? '未知船只';

  // 获取起点和终点名称
  const origin = getEntityNameFromAddress(flight.origin) ?? '未知起点';
  const destination = getEntityNameFromAddress(flight.destination) ?? '未知终点';

  // 计算飞行时间
  const flightDuration = flight.arrival.timestamp - flight.departure.timestamp;
  const hours = Math.floor(flightDuration / 3600000);
  const minutes = Math.floor((flightDuration % 3600000) / 60000);

  // 格式化到达时间
  const arrivalTime = new Date(flight.arrival.timestamp);
  const formattedTime = arrivalTime.toLocaleString('zh-CN', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
  });

  console.log('[Ship Departure] Flight details:', {
    registration,
    origin,
    destination,
    flightDuration,
    hours,
    minutes,
    formattedTime,
  });

  // 发送系统通知
  sendDepartureNotification(registration, origin, destination, hours, minutes, formattedTime);
}

function sendDepartureNotification(
  registration: string,
  origin: string,
  destination: string,
  hours: number,
  minutes: number,
  formattedTime: string,
) {
  // 检查通知权限
  if (!('Notification' in window)) {
    console.warn('[Ship Departure] Browser does not support notifications');
    return;
  }

  console.log('[Ship Departure] Notification permission status:', Notification.permission);

  // 请求通知权限（如果尚未授予）
  if (Notification.permission === 'granted') {
    createDepartureNotification(registration, origin, destination, hours, minutes, formattedTime);
  } else if (Notification.permission !== 'denied') {
    console.log('[Ship Departure] Requesting notification permission...');
    Notification.requestPermission().then(permission => {
      console.log('[Ship Departure] Permission result:', permission);
      if (permission === 'granted') {
        createDepartureNotification(
          registration,
          origin,
          destination,
          hours,
          minutes,
          formattedTime,
        );
      }
    });
  } else {
    console.warn('[Ship Departure] Notification permission denied by user');
  }
}

function createDepartureNotification(
  registration: string,
  origin: string,
  destination: string,
  hours: number,
  minutes: number,
  formattedTime: string,
) {
  const title = '🚀 船只已出发';

  // 格式化飞行时间
  let durationText = '';
  if (hours > 0) {
    durationText = `${hours}小时${minutes}分钟`;
  } else {
    durationText = `${minutes}分钟`;
  }

  const body =
    `船只 ${registration}\n` +
    `从 ${origin} 前往 ${destination}\n` +
    `预计飞行时间：${durationText}\n` +
    `预计到达：${formattedTime}`;

  console.log('[Ship Departure] Creating notification:', { title, body });

  const notification = new Notification(title, {
    body,
    icon: chrome.runtime.getURL('icons/icon128.png'),
    badge: chrome.runtime.getURL('icons/icon128.png'),
    requireInteraction: false,
    silent: false,
  });

  console.log('[Ship Departure] Notification created successfully');

  // 点击通知时聚焦到游戏窗口
  notification.onclick = () => {
    window.focus();
    notification.close();
  };

  // 自动关闭通知
  setTimeout(() => {
    notification.close();
  }, 15000); // 15秒后自动关闭（比到达通知稍长，因为信息更多）
}

function init() {
  console.log('[Ship Departure] Initializing ship departure notification feature');

  // 监听飞行开始事件
  onApiMessage({
    SHIP_FLIGHT_FLIGHT(data: PrunApi.Flight) {
      handleShipDeparture(data);
    },
  });
}

features.add(
  import.meta.url,
  init,
  'Sends system notification when ship departs, showing flight duration and ETA.',
);
