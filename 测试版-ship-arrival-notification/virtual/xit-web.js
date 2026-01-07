import { isValidUrl } from './is-valid-url.js';
import { prunBtoa } from './base64.js';
function correctXitWeb(parts) {
  if (parts.length !== 3) {
    return;
  }
  const isXitWeb = parts[0].toUpperCase() === 'XIT' && parts[1].toUpperCase() === 'WEB';
  if (!isXitWeb) {
    return;
  }
  let url = parts[2];
  if (!isValidUrl(url)) {
    if (url.startsWith('http://') || url.startsWith('https://')) {
      return;
    }
    url = 'https://' + url;
    if (!isValidUrl(url)) {
      return;
    }
  }
  parts[2] =
    prunBtoa(url)
      .match(/.{1,200}/g)
      ?.join(' ') || '';
}
export { correctXitWeb };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoieGl0LXdlYi5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2ZlYXR1cmVzL2Jhc2ljL2NvcnJlY3QtY29tbWFuZHMveGl0LXdlYi50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBpc1ZhbGlkVXJsIH0gZnJvbSAnQHNyYy91dGlscy9pcy12YWxpZC11cmwnO1xuaW1wb3J0IHsgcHJ1bkJ0b2EgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tdWkvYmFzZTY0JztcblxuZXhwb3J0IGZ1bmN0aW9uIGNvcnJlY3RYaXRXZWIocGFydHM6IHN0cmluZ1tdKSB7XG4gIGlmIChwYXJ0cy5sZW5ndGggIT09IDMpIHtcbiAgICByZXR1cm47XG4gIH1cblxuICBjb25zdCBpc1hpdFdlYiA9IHBhcnRzWzBdLnRvVXBwZXJDYXNlKCkgPT09ICdYSVQnICYmIHBhcnRzWzFdLnRvVXBwZXJDYXNlKCkgPT09ICdXRUInO1xuICBpZiAoIWlzWGl0V2ViKSB7XG4gICAgcmV0dXJuO1xuICB9XG5cbiAgbGV0IHVybCA9IHBhcnRzWzJdO1xuICBpZiAoIWlzVmFsaWRVcmwodXJsKSkge1xuICAgIGlmICh1cmwuc3RhcnRzV2l0aCgnaHR0cDovLycpIHx8IHVybC5zdGFydHNXaXRoKCdodHRwczovLycpKSB7XG4gICAgICByZXR1cm47XG4gICAgfVxuXG4gICAgdXJsID0gJ2h0dHBzOi8vJyArIHVybDtcbiAgICBpZiAoIWlzVmFsaWRVcmwodXJsKSkge1xuICAgICAgcmV0dXJuO1xuICAgIH1cbiAgfVxuXG4gIHBhcnRzWzJdID1cbiAgICBwcnVuQnRvYSh1cmwpXG4gICAgICAubWF0Y2goLy57MSwyMDB9L2cpXG4gICAgICA/LmpvaW4oJyAnKSB8fCAnJztcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOztBQUdPLFNBQVMsY0FBYyxPQUFpQjtBQUM3QyxNQUFJLE1BQU0sV0FBVyxHQUFHO0FBQ3RCO0FBQUEsRUFDRjtBQUVBLFFBQU0sV0FBVyxNQUFNLENBQUMsRUFBRSxZQUFBLE1BQWtCLFNBQVMsTUFBTSxDQUFDLEVBQUUsWUFBQSxNQUFrQjtBQUNoRixNQUFJLENBQUMsVUFBVTtBQUNiO0FBQUEsRUFDRjtBQUVBLE1BQUksTUFBTSxNQUFNLENBQUM7QUFDakIsTUFBSSxDQUFDLFdBQVcsR0FBRyxHQUFHO0FBQ3BCLFFBQUksSUFBSSxXQUFXLFNBQVMsS0FBSyxJQUFJLFdBQVcsVUFBVSxHQUFHO0FBQzNEO0FBQUEsSUFDRjtBQUVBLFVBQU0sYUFBYTtBQUNuQixRQUFJLENBQUMsV0FBVyxHQUFHLEdBQUc7QUFDcEI7QUFBQSxJQUNGO0FBQUEsRUFDRjtBQUVBLFFBQU0sQ0FBQyxJQUNMLFNBQVMsR0FBRyxFQUNULE1BQU0sV0FBVyxHQUNoQixLQUFLLEdBQUcsS0FBSztBQUNyQjsifQ==
