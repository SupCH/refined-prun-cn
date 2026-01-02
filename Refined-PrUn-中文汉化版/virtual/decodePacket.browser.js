import { PACKET_TYPES_REVERSE, ERROR_PACKET } from './commons.js';
import { decode } from './base64-arraybuffer.js';
const withNativeArrayBuffer = typeof ArrayBuffer === 'function';
const decodePacket = (encodedPacket, binaryType) => {
  if (typeof encodedPacket !== 'string') {
    return {
      type: 'message',
      data: mapBinary(encodedPacket, binaryType),
    };
  }
  const type = encodedPacket.charAt(0);
  if (type === 'b') {
    return {
      type: 'message',
      data: decodeBase64Packet(encodedPacket.substring(1), binaryType),
    };
  }
  const packetType = PACKET_TYPES_REVERSE[type];
  if (!packetType) {
    return ERROR_PACKET;
  }
  return encodedPacket.length > 1
    ? {
        type: PACKET_TYPES_REVERSE[type],
        data: encodedPacket.substring(1),
      }
    : {
        type: PACKET_TYPES_REVERSE[type],
      };
};
const decodeBase64Packet = (data, binaryType) => {
  if (withNativeArrayBuffer) {
    const decoded = decode(data);
    return mapBinary(decoded, binaryType);
  } else {
    return { base64: true, data };
  }
};
const mapBinary = (data, binaryType) => {
  switch (binaryType) {
    case 'blob':
      if (data instanceof Blob) {
        return data;
      } else {
        return new Blob([data]);
      }
    case 'arraybuffer':
    default:
      if (data instanceof ArrayBuffer) {
        return data;
      } else {
        return data.buffer;
      }
  }
};
export { decodePacket };
