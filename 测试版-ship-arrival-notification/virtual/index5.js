import { userData } from './user-data.js';
import en from './en.js';
import zh from './zh.js';
const messages = {
  en,
  zh,
};
function t(path, ...args) {
  const lang = userData.settings.language || (navigator.language.startsWith('zh') ? 'zh' : 'zh');
  const keys = path.split('.');
  let value = messages[lang];
  for (const key of keys) {
    if (value && value[key]) {
      value = value[key];
    } else {
      value = messages.en;
      for (const k of keys) {
        if (value && value[k]) {
          value = value[k];
        } else {
          return path;
        }
      }
      break;
    }
  }
  if (typeof value === 'string') {
    return value.replace(/{(\d+)}/g, (match, index) => {
      return typeof args[index] !== 'undefined' ? args[index] : match;
    });
  }
  return path;
}
export { t };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiaW5kZXg1LmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvaW5mcmFzdHJ1Y3R1cmUvaTE4bi9pbmRleC50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyB1c2VyRGF0YSB9IGZyb20gJ0BzcmMvc3RvcmUvdXNlci1kYXRhJztcbmltcG9ydCBlbiBmcm9tICcuL2VuJztcbmltcG9ydCB6aCBmcm9tICcuL3poJztcblxuY29uc3QgbWVzc2FnZXMgPSB7XG4gIGVuLFxuICB6aCxcbn07XG5cbmV4cG9ydCB0eXBlIExhbmd1YWdlID0ga2V5b2YgdHlwZW9mIG1lc3NhZ2VzO1xuXG5leHBvcnQgZnVuY3Rpb24gdChwYXRoOiBzdHJpbmcsIC4uLmFyZ3M6IGFueVtdKTogc3RyaW5nIHtcbiAgY29uc3QgbGFuZyA9XG4gICAgKHVzZXJEYXRhLnNldHRpbmdzIGFzIGFueSkubGFuZ3VhZ2UgfHwgKG5hdmlnYXRvci5sYW5ndWFnZS5zdGFydHNXaXRoKCd6aCcpID8gJ3poJyA6ICd6aCcpOyAvLyDmmoLml7blvLrliLbpu5jorqTkuLogemgg6L+b6KGM5rWL6K+VXG4gIGNvbnN0IGtleXMgPSBwYXRoLnNwbGl0KCcuJyk7XG4gIGxldCB2YWx1ZTogYW55ID0gKG1lc3NhZ2VzIGFzIGFueSlbbGFuZ107XG5cbiAgZm9yIChjb25zdCBrZXkgb2Yga2V5cykge1xuICAgIGlmICh2YWx1ZSAmJiB2YWx1ZVtrZXldKSB7XG4gICAgICB2YWx1ZSA9IHZhbHVlW2tleV07XG4gICAgfSBlbHNlIHtcbiAgICAgIC8vIEZhbGxiYWNrIHRvIEVuZ2xpc2hcbiAgICAgIHZhbHVlID0gbWVzc2FnZXMuZW4gYXMgYW55O1xuICAgICAgZm9yIChjb25zdCBrIG9mIGtleXMpIHtcbiAgICAgICAgaWYgKHZhbHVlICYmIHZhbHVlW2tdKSB7XG4gICAgICAgICAgdmFsdWUgPSB2YWx1ZVtrXTtcbiAgICAgICAgfSBlbHNlIHtcbiAgICAgICAgICByZXR1cm4gcGF0aDtcbiAgICAgICAgfVxuICAgICAgfVxuICAgICAgYnJlYWs7XG4gICAgfVxuICB9XG5cbiAgaWYgKHR5cGVvZiB2YWx1ZSA9PT0gJ3N0cmluZycpIHtcbiAgICByZXR1cm4gdmFsdWUucmVwbGFjZSgveyhcXGQrKX0vZywgKG1hdGNoLCBpbmRleCkgPT4ge1xuICAgICAgcmV0dXJuIHR5cGVvZiBhcmdzW2luZGV4XSAhPT0gJ3VuZGVmaW5lZCcgPyBhcmdzW2luZGV4XSA6IG1hdGNoO1xuICAgIH0pO1xuICB9XG5cbiAgcmV0dXJuIHBhdGg7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBSUEsTUFBTSxXQUFXO0FBQUEsRUFDZjtBQUFBLEVBQ0E7QUFDRjtBQUlPLFNBQVMsRUFBRSxTQUFpQixNQUFxQjtBQUN0RCxRQUFNLE9BQ0gsU0FBUyxTQUFpQixhQUFhLFVBQVUsU0FBUyxXQUFXLElBQUksSUFBSSxPQUFPO0FBQ3ZGLFFBQU0sT0FBTyxLQUFLLE1BQU0sR0FBRztBQUMzQixNQUFJLFFBQWMsU0FBaUIsSUFBSTtBQUV2QyxhQUFXLE9BQU8sTUFBTTtBQUN0QixRQUFJLFNBQVMsTUFBTSxHQUFHLEdBQUc7QUFDdkIsY0FBUSxNQUFNLEdBQUc7QUFBQSxJQUNuQixPQUFPO0FBRUwsY0FBUSxTQUFTO0FBQ2pCLGlCQUFXLEtBQUssTUFBTTtBQUNwQixZQUFJLFNBQVMsTUFBTSxDQUFDLEdBQUc7QUFDckIsa0JBQVEsTUFBTSxDQUFDO0FBQUEsUUFDakIsT0FBTztBQUNMLGlCQUFPO0FBQUEsUUFDVDtBQUFBLE1BQ0Y7QUFDQTtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsTUFBSSxPQUFPLFVBQVUsVUFBVTtBQUM3QixXQUFPLE1BQU0sUUFBUSxZQUFZLENBQUMsT0FBTyxVQUFVO0FBQ2pELGFBQU8sT0FBTyxLQUFLLEtBQUssTUFBTSxjQUFjLEtBQUssS0FBSyxJQUFJO0FBQUEsSUFDNUQsQ0FBQztBQUFBLEVBQ0g7QUFFQSxTQUFPO0FBQ1Q7In0=
