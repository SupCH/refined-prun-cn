import native from './native.js';
import rng from './rng.js';
import { unsafeStringify } from './stringify.js';
function v4(options, buf, offset) {
  if (native.randomUUID && true && !options) {
    return native.randomUUID();
  }
  options = options || {};
  const rnds = options.random ?? options.rng?.() ?? rng();
  if (rnds.length < 16) {
    throw new Error('Random bytes length must be >= 16');
  }
  rnds[6] = (rnds[6] & 15) | 64;
  rnds[8] = (rnds[8] & 63) | 128;
  return unsafeStringify(rnds);
}
export { v4 as default };
