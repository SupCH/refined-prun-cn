import { isRef, isReactive, isProxy, toRaw } from './reactivity.esm-bundler.js';
function deepToRaw(sourceObj) {
  const objectIterator = input => {
    if (Array.isArray(input)) {
      return input.map(item => objectIterator(item));
    }
    if (isRef(input) || isReactive(input) || isProxy(input)) {
      return objectIterator(toRaw(input));
    }
    if (input && typeof input === 'object') {
      return Object.keys(input).reduce((acc, key) => {
        acc[key] = objectIterator(input[key]);
        return acc;
      }, {});
    }
    return input;
  };
  return objectIterator(sourceObj);
}
export { deepToRaw };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGVlcC10by1yYXcuanMiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy91dGlscy9kZWVwLXRvLXJhdy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyIvKiBlc2xpbnQtZGlzYWJsZSBAdHlwZXNjcmlwdC1lc2xpbnQvbm8tZXhwbGljaXQtYW55ICovXG5leHBvcnQgZnVuY3Rpb24gZGVlcFRvUmF3PFQgZXh0ZW5kcyBSZWNvcmQ8c3RyaW5nLCBhbnk+Pihzb3VyY2VPYmo6IFQpOiBUIHtcbiAgY29uc3Qgb2JqZWN0SXRlcmF0b3IgPSAoaW5wdXQ6IGFueSk6IGFueSA9PiB7XG4gICAgaWYgKEFycmF5LmlzQXJyYXkoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gaW5wdXQubWFwKGl0ZW0gPT4gb2JqZWN0SXRlcmF0b3IoaXRlbSkpO1xuICAgIH1cbiAgICBpZiAoaXNSZWYoaW5wdXQpIHx8IGlzUmVhY3RpdmUoaW5wdXQpIHx8IGlzUHJveHkoaW5wdXQpKSB7XG4gICAgICByZXR1cm4gb2JqZWN0SXRlcmF0b3IodG9SYXcoaW5wdXQpKTtcbiAgICB9XG4gICAgaWYgKGlucHV0ICYmIHR5cGVvZiBpbnB1dCA9PT0gJ29iamVjdCcpIHtcbiAgICAgIHJldHVybiBPYmplY3Qua2V5cyhpbnB1dCkucmVkdWNlKChhY2MsIGtleSkgPT4ge1xuICAgICAgICBhY2Nba2V5IGFzIGtleW9mIHR5cGVvZiBhY2NdID0gb2JqZWN0SXRlcmF0b3IoaW5wdXRba2V5XSk7XG4gICAgICAgIHJldHVybiBhY2M7XG4gICAgICB9LCB7fSBhcyBUKTtcbiAgICB9XG4gICAgcmV0dXJuIGlucHV0O1xuICB9O1xuXG4gIHJldHVybiBvYmplY3RJdGVyYXRvcihzb3VyY2VPYmopO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7QUFDTyxTQUFBLFVBQUEsV0FBQTtBQUNMLFFBQUEsaUJBQUEsQ0FBQSxVQUFBO0FBQ0UsUUFBQSxNQUFBLFFBQUEsS0FBQSxHQUFBO0FBQ0UsYUFBQSxNQUFBLElBQUEsQ0FBQSxTQUFBLGVBQUEsSUFBQSxDQUFBO0FBQUEsSUFBNkM7QUFFL0MsUUFBQSxNQUFBLEtBQUEsS0FBQSxXQUFBLEtBQUEsS0FBQSxRQUFBLEtBQUEsR0FBQTtBQUNFLGFBQUEsZUFBQSxNQUFBLEtBQUEsQ0FBQTtBQUFBLElBQWtDO0FBRXBDLFFBQUEsU0FBQSxPQUFBLFVBQUEsVUFBQTtBQUNFLGFBQUEsT0FBQSxLQUFBLEtBQUEsRUFBQSxPQUFBLENBQUEsS0FBQSxRQUFBO0FBQ0UsWUFBQSxHQUFBLElBQUEsZUFBQSxNQUFBLEdBQUEsQ0FBQTtBQUNBLGVBQUE7QUFBQSxNQUFPLEdBQUEsQ0FBQSxDQUFBO0FBQUEsSUFDQztBQUVaLFdBQUE7QUFBQSxFQUFPO0FBR1QsU0FBQSxlQUFBLFNBQUE7QUFDRjsifQ==
