import { userData } from './user-data.js';
import en from './en.js';
import zh from './zh.js';
const messages = {
  en,
  zh,
};
function t(path, ...args) {
  const lang = userData.settings.language || (navigator.language.startsWith('zh') ? 'zh' : 'zh');
  const keys = path.split('.');
  let value = messages[lang];
  for (const key of keys) {
    if (value && value[key]) {
      value = value[key];
    } else {
      value = messages.en;
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
export { t };
