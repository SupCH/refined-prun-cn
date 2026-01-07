import mimicFunction from './index11.js';
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
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXg3LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vb25ldGltZUA3LjAuMC9ub2RlX21vZHVsZXMvb25ldGltZS9pbmRleC5qcyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgbWltaWNGdW5jdGlvbiBmcm9tICdtaW1pYy1mdW5jdGlvbic7XG5cbmNvbnN0IGNhbGxlZEZ1bmN0aW9ucyA9IG5ldyBXZWFrTWFwKCk7XG5cbmNvbnN0IG9uZXRpbWUgPSAoZnVuY3Rpb25fLCBvcHRpb25zID0ge30pID0+IHtcblx0aWYgKHR5cGVvZiBmdW5jdGlvbl8gIT09ICdmdW5jdGlvbicpIHtcblx0XHR0aHJvdyBuZXcgVHlwZUVycm9yKCdFeHBlY3RlZCBhIGZ1bmN0aW9uJyk7XG5cdH1cblxuXHRsZXQgcmV0dXJuVmFsdWU7XG5cdGxldCBjYWxsQ291bnQgPSAwO1xuXHRjb25zdCBmdW5jdGlvbk5hbWUgPSBmdW5jdGlvbl8uZGlzcGxheU5hbWUgfHwgZnVuY3Rpb25fLm5hbWUgfHwgJzxhbm9ueW1vdXM+JztcblxuXHRjb25zdCBvbmV0aW1lID0gZnVuY3Rpb24gKC4uLmFyZ3VtZW50c18pIHtcblx0XHRjYWxsZWRGdW5jdGlvbnMuc2V0KG9uZXRpbWUsICsrY2FsbENvdW50KTtcblxuXHRcdGlmIChjYWxsQ291bnQgPT09IDEpIHtcblx0XHRcdHJldHVyblZhbHVlID0gZnVuY3Rpb25fLmFwcGx5KHRoaXMsIGFyZ3VtZW50c18pO1xuXHRcdFx0ZnVuY3Rpb25fID0gdW5kZWZpbmVkO1xuXHRcdH0gZWxzZSBpZiAob3B0aW9ucy50aHJvdyA9PT0gdHJ1ZSkge1xuXHRcdFx0dGhyb3cgbmV3IEVycm9yKGBGdW5jdGlvbiBcXGAke2Z1bmN0aW9uTmFtZX1cXGAgY2FuIG9ubHkgYmUgY2FsbGVkIG9uY2VgKTtcblx0XHR9XG5cblx0XHRyZXR1cm4gcmV0dXJuVmFsdWU7XG5cdH07XG5cblx0bWltaWNGdW5jdGlvbihvbmV0aW1lLCBmdW5jdGlvbl8pO1xuXHRjYWxsZWRGdW5jdGlvbnMuc2V0KG9uZXRpbWUsIGNhbGxDb3VudCk7XG5cblx0cmV0dXJuIG9uZXRpbWU7XG59O1xuXG5vbmV0aW1lLmNhbGxDb3VudCA9IGZ1bmN0aW9uXyA9PiB7XG5cdGlmICghY2FsbGVkRnVuY3Rpb25zLmhhcyhmdW5jdGlvbl8pKSB7XG5cdFx0dGhyb3cgbmV3IEVycm9yKGBUaGUgZ2l2ZW4gZnVuY3Rpb24gXFxgJHtmdW5jdGlvbl8ubmFtZX1cXGAgaXMgbm90IHdyYXBwZWQgYnkgdGhlIFxcYG9uZXRpbWVcXGAgcGFja2FnZWApO1xuXHR9XG5cblx0cmV0dXJuIGNhbGxlZEZ1bmN0aW9ucy5nZXQoZnVuY3Rpb25fKTtcbn07XG5cbmV4cG9ydCBkZWZhdWx0IG9uZXRpbWU7XG4iXSwibmFtZXMiOlsib25ldGltZSJdLCJtYXBwaW5ncyI6IjtBQUVBLE1BQU0sa0JBQWtCLG9CQUFJLFFBQU87QUFFOUIsTUFBQyxVQUFVLENBQUMsV0FBVyxVQUFVLE9BQU87QUFDNUMsTUFBSSxPQUFPLGNBQWMsWUFBWTtBQUNwQyxVQUFNLElBQUksVUFBVSxxQkFBcUI7QUFBQSxFQUMxQztBQUVBLE1BQUk7QUFDSixNQUFJLFlBQVk7QUFDaEIsUUFBTSxlQUFlLFVBQVUsZUFBZSxVQUFVLFFBQVE7QUFFaEUsUUFBTUEsV0FBVSxZQUFhLFlBQVk7QUFDeEMsb0JBQWdCLElBQUlBLFVBQVMsRUFBRSxTQUFTO0FBRXhDLFFBQUksY0FBYyxHQUFHO0FBQ3BCLG9CQUFjLFVBQVUsTUFBTSxNQUFNLFVBQVU7QUFDOUMsa0JBQVk7QUFBQSxJQUNiLFdBQVcsUUFBUSxVQUFVLE1BQU07QUFDbEMsWUFBTSxJQUFJLE1BQU0sY0FBYyxZQUFZLDRCQUE0QjtBQUFBLElBQ3ZFO0FBRUEsV0FBTztBQUFBLEVBQ1I7QUFFQSxnQkFBY0EsVUFBUyxTQUFTO0FBQ2hDLGtCQUFnQixJQUFJQSxVQUFTLFNBQVM7QUFFdEMsU0FBT0E7QUFDUjtBQUVBLFFBQVEsWUFBWSxlQUFhO0FBQ2hDLE1BQUksQ0FBQyxnQkFBZ0IsSUFBSSxTQUFTLEdBQUc7QUFDcEMsVUFBTSxJQUFJLE1BQU0sd0JBQXdCLFVBQVUsSUFBSSw4Q0FBOEM7QUFBQSxFQUNyRztBQUVBLFNBQU8sZ0JBQWdCLElBQUksU0FBUztBQUNyQzsiLCJ4X2dvb2dsZV9pZ25vcmVMaXN0IjpbMF19
