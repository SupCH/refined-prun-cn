import { userData } from '@src/store/user-data';
import en from './en';
import zh from './zh';

const messages = {
  en,
  zh,
};

export type Language = keyof typeof messages;

export function t(path: string, ...args: any[]): string {
  const lang =
    (userData.settings as any).language || (navigator.language.startsWith('zh') ? 'zh' : 'zh'); // 暂时强制默认为 zh 进行测试
  const keys = path.split('.');
  let value: any = (messages as any)[lang];

  for (const key of keys) {
    if (value && value[key]) {
      value = value[key];
    } else {
      // Fallback to English
      value = messages.en as any;
      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          return path;
        }
      }
      break;
    }
  }

  if (typeof value === 'string') {
    return value.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }

  return path;
}
