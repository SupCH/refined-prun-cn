import { PACKET_TYPES } from './commons.js';
const withNativeBlob =
  typeof Blob === 'function' ||
  (typeof Blob !== 'undefined' &&
    Object.prototype.toString.call(Blob) === '[object BlobConstructor]');
const withNativeArrayBuffer = typeof ArrayBuffer === 'function';
const isView = obj => {
  return typeof ArrayBuffer.isView === 'function'
    ? ArrayBuffer.isView(obj)
    : obj && obj.buffer instanceof ArrayBuffer;
};
const encodePacket = ({ type, data }, supportsBinary, callback) => {
  if (withNativeBlob && data instanceof Blob) {
    {
      return encodeBlobAsBase64(data, callback);
    }
  } else if (withNativeArrayBuffer && (data instanceof ArrayBuffer || isView(data))) {
    {
      return encodeBlobAsBase64(new Blob([data]), callback);
    }
  }
  return callback(PACKET_TYPES[type] + (data || ''));
};
const encodeBlobAsBase64 = (data, callback) => {
  const fileReader = new FileReader();
  fileReader.onload = function () {
    const content = fileReader.result.split(',')[1];
    callback('b' + (content || ''));
  };
  return fileReader.readAsDataURL(data);
};
export { encodePacket };
