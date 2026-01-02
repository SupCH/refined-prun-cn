import { decodePayload, encodePayload } from './index11.js';
import { PacketType, Decoder, Encoder } from './index12.js';
import { castArray } from './cast-array.js';
function socketIOMiddleware(middleware) {
  const addEventListener = WebSocket.prototype.addEventListener;
  window.WebSocket = new Proxy(WebSocket, {
    construct(target, args) {
      const ws = new target(...args);
      return new Proxy(ws, {
        set(target2, prop, value) {
          if (prop === 'onmessage') {
            middleware.dispatchClientMessage.value = message => {
              value(new MessageEvent('message', { data: encodeMessage(message) }));
            };
            target2.onmessage = e => {
              const data = processMessage(e.data, middleware);
              if (data !== e.data) {
                e = new Proxy(e, {
                  get(target3, prop2) {
                    if (prop2 === 'data') {
                      return data;
                    }
                    return Reflect.get(target3, prop2);
                  },
                });
              }
              value(e);
            };
            return true;
          }
          return Reflect.set(target2, prop, value);
        },
        get(target2, prop) {
          if (prop === 'addEventListener') {
            return addEventListener.bind(target2);
          }
          const value = Reflect.get(target2, prop);
          if (typeof value === 'function') {
            return value.bind(target2);
          }
          return value;
        },
      });
    },
  });
  WebSocket.prototype.addEventListener = function (type, listener, options) {
    return this.addEventListener(type, listener, options);
  };
  window.XMLHttpRequest = new Proxy(XMLHttpRequest, {
    construct(target) {
      const xhr = new target();
      let data = '';
      return new Proxy(xhr, {
        get(target2, prop) {
          if (prop === 'responseText' && data) {
            return data;
          }
          const value = Reflect.get(target2, prop);
          if (typeof value === 'function') {
            return value.bind(target2);
          }
          return value;
        },
        set(target2, prop, value) {
          if (prop === 'onreadystatechange') {
            target2.onreadystatechange = () => {
              if (target2.readyState === 4 && target2.status === 200) {
                data = processMessage(target2.responseText, middleware);
              }
              value();
            };
            return true;
          }
          return Reflect.set(target2, prop, value);
        },
      });
    },
  });
}
function processMessage(data, middleware) {
  const engineIOPackets = decodePayload(data);
  let rewriteMessage = false;
  for (const engineIOPacket of engineIOPackets) {
    if (engineIOPacket.type !== 'message') {
      continue;
    }
    const decoder = new Decoder();
    decoder.on('decoded', decodedPacket => {
      const data2 = decodedPacket.data;
      if (decodedPacket.type === 0) {
        try {
          middleware.onOpen();
        } catch (error) {
          console.error(error);
        }
        return;
      }
      const payload = data2[1];
      if (decodedPacket.type !== 2 || data2[0] !== 'event' || payload === void 0) {
        return;
      }
      let rewrite;
      try {
        rewrite = middleware.onMessage(payload);
      } catch (error) {
        console.error(error);
        rewrite = false;
      }
      if (rewrite) {
        engineIOPacket.data = encodeSIOPacket(decodedPacket);
        rewriteMessage = true;
      }
    });
    decoder.add(engineIOPacket.data);
  }
  return rewriteMessage ? encodeEIOPacket(engineIOPackets) : data;
}
function encodeMessage(message) {
  return encodeEIOPacket({
    type: 'message',
    data: encodeSIOPacket({
      type: PacketType.EVENT,
      nsp: '/',
      data: ['event', message],
    }),
  });
}
function encodeSIOPacket(packet) {
  const encoder = new Encoder();
  return encoder.encode(packet)[0];
}
function encodeEIOPacket(packet) {
  let data;
  encodePayload(castArray(packet), newData => {
    data = newData;
  });
  return data;
}
export { socketIOMiddleware as default };
