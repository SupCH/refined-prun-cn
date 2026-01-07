const withNativeArrayBuffer = typeof ArrayBuffer === 'function';
const isView = obj => {
  return typeof ArrayBuffer.isView === 'function'
    ? ArrayBuffer.isView(obj)
    : obj.buffer instanceof ArrayBuffer;
};
const toString = Object.prototype.toString;
const withNativeBlob =
  typeof Blob === 'function' ||
  (typeof Blob !== 'undefined' && toString.call(Blob) === '[object BlobConstructor]');
const withNativeFile =
  typeof File === 'function' ||
  (typeof File !== 'undefined' && toString.call(File) === '[object FileConstructor]');
function isBinary(obj) {
  return (
    (withNativeArrayBuffer && (obj instanceof ArrayBuffer || isView(obj))) ||
    (withNativeBlob && obj instanceof Blob) ||
    (withNativeFile && obj instanceof File)
  );
}
function hasBinary(obj, toJSON) {
  if (!obj || typeof obj !== 'object') {
    return false;
  }
  if (Array.isArray(obj)) {
    for (let i = 0, l = obj.length; i < l; i++) {
      if (hasBinary(obj[i])) {
        return true;
      }
    }
    return false;
  }
  if (isBinary(obj)) {
    return true;
  }
  if (obj.toJSON && typeof obj.toJSON === 'function' && arguments.length === 1) {
    return hasBinary(obj.toJSON(), true);
  }
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && hasBinary(obj[key])) {
      return true;
    }
  }
  return false;
}
export { hasBinary, isBinary };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaXMtYmluYXJ5LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9ub2RlX21vZHVsZXMvLnBucG0vc29ja2V0LmlvLXBhcnNlckA0LjIuNC9ub2RlX21vZHVsZXMvc29ja2V0LmlvLXBhcnNlci9idWlsZC9lc20vaXMtYmluYXJ5LmpzIl0sInNvdXJjZXNDb250ZW50IjpbImNvbnN0IHdpdGhOYXRpdmVBcnJheUJ1ZmZlciA9IHR5cGVvZiBBcnJheUJ1ZmZlciA9PT0gXCJmdW5jdGlvblwiO1xuY29uc3QgaXNWaWV3ID0gKG9iaikgPT4ge1xuICAgIHJldHVybiB0eXBlb2YgQXJyYXlCdWZmZXIuaXNWaWV3ID09PSBcImZ1bmN0aW9uXCJcbiAgICAgICAgPyBBcnJheUJ1ZmZlci5pc1ZpZXcob2JqKVxuICAgICAgICA6IG9iai5idWZmZXIgaW5zdGFuY2VvZiBBcnJheUJ1ZmZlcjtcbn07XG5jb25zdCB0b1N0cmluZyA9IE9iamVjdC5wcm90b3R5cGUudG9TdHJpbmc7XG5jb25zdCB3aXRoTmF0aXZlQmxvYiA9IHR5cGVvZiBCbG9iID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEJsb2IgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChCbG9iKSA9PT0gXCJbb2JqZWN0IEJsb2JDb25zdHJ1Y3Rvcl1cIik7XG5jb25zdCB3aXRoTmF0aXZlRmlsZSA9IHR5cGVvZiBGaWxlID09PSBcImZ1bmN0aW9uXCIgfHxcbiAgICAodHlwZW9mIEZpbGUgIT09IFwidW5kZWZpbmVkXCIgJiZcbiAgICAgICAgdG9TdHJpbmcuY2FsbChGaWxlKSA9PT0gXCJbb2JqZWN0IEZpbGVDb25zdHJ1Y3Rvcl1cIik7XG4vKipcbiAqIFJldHVybnMgdHJ1ZSBpZiBvYmogaXMgYSBCdWZmZXIsIGFuIEFycmF5QnVmZmVyLCBhIEJsb2Igb3IgYSBGaWxlLlxuICpcbiAqIEBwcml2YXRlXG4gKi9cbmV4cG9ydCBmdW5jdGlvbiBpc0JpbmFyeShvYmopIHtcbiAgICByZXR1cm4gKCh3aXRoTmF0aXZlQXJyYXlCdWZmZXIgJiYgKG9iaiBpbnN0YW5jZW9mIEFycmF5QnVmZmVyIHx8IGlzVmlldyhvYmopKSkgfHxcbiAgICAgICAgKHdpdGhOYXRpdmVCbG9iICYmIG9iaiBpbnN0YW5jZW9mIEJsb2IpIHx8XG4gICAgICAgICh3aXRoTmF0aXZlRmlsZSAmJiBvYmogaW5zdGFuY2VvZiBGaWxlKSk7XG59XG5leHBvcnQgZnVuY3Rpb24gaGFzQmluYXJ5KG9iaiwgdG9KU09OKSB7XG4gICAgaWYgKCFvYmogfHwgdHlwZW9mIG9iaiAhPT0gXCJvYmplY3RcIikge1xuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChBcnJheS5pc0FycmF5KG9iaikpIHtcbiAgICAgICAgZm9yIChsZXQgaSA9IDAsIGwgPSBvYmoubGVuZ3RoOyBpIDwgbDsgaSsrKSB7XG4gICAgICAgICAgICBpZiAoaGFzQmluYXJ5KG9ialtpXSkpIHtcbiAgICAgICAgICAgICAgICByZXR1cm4gdHJ1ZTtcbiAgICAgICAgICAgIH1cbiAgICAgICAgfVxuICAgICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICAgIGlmIChpc0JpbmFyeShvYmopKSB7XG4gICAgICAgIHJldHVybiB0cnVlO1xuICAgIH1cbiAgICBpZiAob2JqLnRvSlNPTiAmJlxuICAgICAgICB0eXBlb2Ygb2JqLnRvSlNPTiA9PT0gXCJmdW5jdGlvblwiICYmXG4gICAgICAgIGFyZ3VtZW50cy5sZW5ndGggPT09IDEpIHtcbiAgICAgICAgcmV0dXJuIGhhc0JpbmFyeShvYmoudG9KU09OKCksIHRydWUpO1xuICAgIH1cbiAgICBmb3IgKGNvbnN0IGtleSBpbiBvYmopIHtcbiAgICAgICAgaWYgKE9iamVjdC5wcm90b3R5cGUuaGFzT3duUHJvcGVydHkuY2FsbChvYmosIGtleSkgJiYgaGFzQmluYXJ5KG9ialtrZXldKSkge1xuICAgICAgICAgICAgcmV0dXJuIHRydWU7XG4gICAgICAgIH1cbiAgICB9XG4gICAgcmV0dXJuIGZhbHNlO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLE1BQU0sd0JBQXdCLE9BQU8sZ0JBQWdCO0FBQ3JELE1BQU0sU0FBUyxDQUFDLFFBQVE7QUFDcEIsU0FBTyxPQUFPLFlBQVksV0FBVyxhQUMvQixZQUFZLE9BQU8sR0FBRyxJQUN0QixJQUFJLGtCQUFrQjtBQUNoQztBQUNBLE1BQU0sV0FBVyxPQUFPLFVBQVU7QUFDbEMsTUFBTSxpQkFBaUIsT0FBTyxTQUFTLGNBQ2xDLE9BQU8sU0FBUyxlQUNiLFNBQVMsS0FBSyxJQUFJLE1BQU07QUFDaEMsTUFBTSxpQkFBaUIsT0FBTyxTQUFTLGNBQ2xDLE9BQU8sU0FBUyxlQUNiLFNBQVMsS0FBSyxJQUFJLE1BQU07QUFNekIsU0FBUyxTQUFTLEtBQUs7QUFDMUIsU0FBUywwQkFBMEIsZUFBZSxlQUFlLE9BQU8sR0FBRyxNQUN0RSxrQkFBa0IsZUFBZSxRQUNqQyxrQkFBa0IsZUFBZTtBQUMxQztBQUNPLFNBQVMsVUFBVSxLQUFLLFFBQVE7QUFDbkMsTUFBSSxDQUFDLE9BQU8sT0FBTyxRQUFRLFVBQVU7QUFDakMsV0FBTztBQUFBLEVBQ1g7QUFDQSxNQUFJLE1BQU0sUUFBUSxHQUFHLEdBQUc7QUFDcEIsYUFBUyxJQUFJLEdBQUcsSUFBSSxJQUFJLFFBQVEsSUFBSSxHQUFHLEtBQUs7QUFDeEMsVUFBSSxVQUFVLElBQUksQ0FBQyxDQUFDLEdBQUc7QUFDbkIsZUFBTztBQUFBLE1BQ1g7QUFBQSxJQUNKO0FBQ0EsV0FBTztBQUFBLEVBQ1g7QUFDQSxNQUFJLFNBQVMsR0FBRyxHQUFHO0FBQ2YsV0FBTztBQUFBLEVBQ1g7QUFDQSxNQUFJLElBQUksVUFDSixPQUFPLElBQUksV0FBVyxjQUN0QixVQUFVLFdBQVcsR0FBRztBQUN4QixXQUFPLFVBQVUsSUFBSSxPQUFNLEdBQUksSUFBSTtBQUFBLEVBQ3ZDO0FBQ0EsYUFBVyxPQUFPLEtBQUs7QUFDbkIsUUFBSSxPQUFPLFVBQVUsZUFBZSxLQUFLLEtBQUssR0FBRyxLQUFLLFVBQVUsSUFBSSxHQUFHLENBQUMsR0FBRztBQUN2RSxhQUFPO0FBQUEsSUFDWDtBQUFBLEVBQ0o7QUFDQSxTQUFPO0FBQ1g7IiwieF9nb29nbGVfaWdub3JlTGlzdCI6WzBdfQ==
