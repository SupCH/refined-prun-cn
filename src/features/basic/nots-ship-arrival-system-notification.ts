import { getPrunId } from '@src/infrastructure/prun-ui/attributes';
import { alertsStore } from '@src/infrastructure/prun-api/data/alerts';
import { getEntityNameFromAddress } from '@src/infrastructure/prun-api/data/addresses';

// 存储已经通知过的船只到达事件，避免重复通知
const notifiedFlights = new Set<string>();

function onTileReady(tile: PrunTile) {
  subscribe($$(tile.anchor, C.AlertListItem.container), processNotification);
}

async function processNotification(container: HTMLElement) {
  const id = getPrunId(container);
  const alert = alertsStore.getById(id);

  if (alert?.type !== 'SHIP_FLIGHT_ENDED') {
    return;
  }

  // 避免重复通知
  if (notifiedFlights.has(id)) {
    return;
  }
  notifiedFlights.add(id);

  // 提取船只注册号
  const registration = alert.data.find(x => x.key === 'registration')?.value as string;
  if (!registration) {
    return;
  }

  // 提取目的地信息
  const destinationData = alert.data.find(x => x.key === 'destination')?.value as {
    address: PrunApi.Address;
  };
  const destination = destinationData
    ? getEntityNameFromAddress(destinationData.address)
    : '未知目的地';

  // 发送系统通知
  sendShipArrivalNotification(registration, destination);
}

function sendShipArrivalNotification(registration: string, destination: string) {
  // 检查通知权限
  if (!('Notification' in window)) {
    console.warn('此浏览器不支持系统通知');
    return;
  }

  // 请求通知权限（如果尚未授予）
  if (Notification.permission === 'granted') {
    createNotification(registration, destination);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission().then(permission => {
      if (permission === 'granted') {
        createNotification(registration, destination);
      }
    });
  }
}

function createNotification(registration: string, destination: string) {
  const title = '🚀 船只已到达港口';
  const body = `船只 ${registration} 已抵达 ${destination}`;

  const notification = new Notification(title, {
    body,
    icon: chrome.runtime.getURL('icons/icon128.png'),
    badge: chrome.runtime.getURL('icons/icon128.png'),
    requireInteraction: false,
    silent: false,
  });

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
  tiles.observe('NOTS', onTileReady);
}

features.add(
  import.meta.url,
  init,
  'NOTS: Sends system notification when ship arrives at destination.',
);
