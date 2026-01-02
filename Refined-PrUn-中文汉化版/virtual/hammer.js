import { getDefaultExportFromCjs } from './commonjsHelpers.js';
import { __require as requireHammer } from './hammer2.js';
var hammerExports = requireHammer();
const Hammer = /* @__PURE__ */ getDefaultExportFromCjs(hammerExports);
export { Hammer as default };
