import { isValidUrl } from './is-valid-url.js';
import { prunBtoa } from './base64.js';
function correctXitWeb(parts) {
  if (parts.length !== 3) {
    return;
  }
  const isXitWeb = parts[0].toUpperCase() === 'XIT' && parts[1].toUpperCase() === 'WEB';
  if (!isXitWeb) {
    return;
  }
  let url = parts[2];
  if (!isValidUrl(url)) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return;
    }
    url = 'https://' + url;
    if (!isValidUrl(url)) {
      return;
    }
  }
  parts[2] =
    prunBtoa(url)
      .match(/.{1,200}/g)
      ?.join(' ') || '';
}
export { correctXitWeb };
