import mimicFunction from './index10.js';
const calledFunctions = /* @__PURE__ */ new WeakMap();
const onetime = (function_, options = {}) => {
  if (typeof function_ !== 'function') {
    throw new TypeError('Expected a function');
  }
  let returnValue;
  let callCount = 0;
  const functionName = function_.displayName || function_.name || '<anonymous>';
  const onetime2 = function (...arguments_) {
    calledFunctions.set(onetime2, ++callCount);
    if (callCount === 1) {
      returnValue = function_.apply(this, arguments_);
      function_ = void 0;
    } else if (options.throw === true) {
      throw new Error(`Function \`${functionName}\` can only be called once`);
    }
    return returnValue;
  };
  mimicFunction(onetime2, function_);
  calledFunctions.set(onetime2, callCount);
  return onetime2;
};
onetime.callCount = function_ => {
  if (!calledFunctions.has(function_)) {
    throw new Error(
      `The given function \`${function_.name}\` is not wrapped by the \`onetime\` package`,
    );
  }
  return calledFunctions.get(function_);
};
export { onetime as default };
