function getBrowserVersion() {
  const userAgent = navigator.userAgent;
  let browserName;
  let fullVersion;
  if (userAgent.indexOf('Firefox') > -1) {
    browserName = 'Firefox';
    fullVersion = userAgent.substring(userAgent.indexOf('Firefox') + 8);
  } else if (userAgent.indexOf('Opera') > -1 || userAgent.indexOf('OPR') > -1) {
    browserName = 'Opera';
    fullVersion = userAgent.substring(userAgent.indexOf('Opera') + 6);
    if (userAgent.indexOf('OPR') > -1) {
      fullVersion = userAgent.substring(userAgent.indexOf('OPR') + 4);
    }
  } else if (userAgent.indexOf('Trident') > -1) {
    browserName = 'Microsoft Internet Explorer';
    fullVersion = userAgent.substring(userAgent.indexOf('rv:') + 3);
  } else if (userAgent.indexOf('Edge') > -1) {
    browserName = 'Microsoft Edge';
    fullVersion = userAgent.substring(userAgent.indexOf('Edge') + 5);
  } else if (userAgent.indexOf('Chrome') > -1) {
    browserName = 'Chrome';
    fullVersion = userAgent.substring(userAgent.indexOf('Chrome') + 7);
  } else if (userAgent.indexOf('Safari') > -1) {
    browserName = 'Safari';
    fullVersion = userAgent.substring(userAgent.indexOf('Safari') + 7);
    if (userAgent.indexOf('Version') > -1) {
      fullVersion = userAgent.substring(userAgent.indexOf('Version') + 8);
    }
  } else {
    browserName = 'Unknown';
    fullVersion = 'Unknown';
  }
  if (fullVersion.indexOf(' ') > -1) {
    fullVersion = fullVersion.substring(0, fullVersion.indexOf(' '));
  }
  if (fullVersion.indexOf(';') > -1) {
    fullVersion = fullVersion.substring(0, fullVersion.indexOf(';'));
  }
  if (fullVersion.indexOf(')') > -1) {
    fullVersion = fullVersion.substring(0, fullVersion.indexOf(')'));
  }
  return `${browserName} ${fullVersion}`;
}
export { getBrowserVersion as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYnJvd3Nlci12ZXJzaW9uLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvYnJvd3Nlci12ZXJzaW9uLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBkZWZhdWx0IGZ1bmN0aW9uIGdldEJyb3dzZXJWZXJzaW9uKCkge1xuICBjb25zdCB1c2VyQWdlbnQgPSBuYXZpZ2F0b3IudXNlckFnZW50O1xuICBsZXQgYnJvd3Nlck5hbWU6IHN0cmluZztcbiAgbGV0IGZ1bGxWZXJzaW9uOiBzdHJpbmc7XG5cbiAgLy8gRGV0ZWN0IGJyb3dzZXIgbmFtZSBhbmQgdmVyc2lvblxuICBpZiAodXNlckFnZW50LmluZGV4T2YoJ0ZpcmVmb3gnKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSAnRmlyZWZveCc7XG4gICAgZnVsbFZlcnNpb24gPSB1c2VyQWdlbnQuc3Vic3RyaW5nKHVzZXJBZ2VudC5pbmRleE9mKCdGaXJlZm94JykgKyA4KTtcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSA+IC0xIHx8IHVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSAnT3BlcmEnO1xuICAgIGZ1bGxWZXJzaW9uID0gdXNlckFnZW50LnN1YnN0cmluZyh1c2VyQWdlbnQuaW5kZXhPZignT3BlcmEnKSArIDYpO1xuICAgIGlmICh1c2VyQWdlbnQuaW5kZXhPZignT1BSJykgPiAtMSkge1xuICAgICAgZnVsbFZlcnNpb24gPSB1c2VyQWdlbnQuc3Vic3RyaW5nKHVzZXJBZ2VudC5pbmRleE9mKCdPUFInKSArIDQpO1xuICAgIH1cbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignVHJpZGVudCcpID4gLTEpIHtcbiAgICAvLyBGb3IgSW50ZXJuZXQgRXhwbG9yZXJcbiAgICBicm93c2VyTmFtZSA9ICdNaWNyb3NvZnQgSW50ZXJuZXQgRXhwbG9yZXInO1xuICAgIGZ1bGxWZXJzaW9uID0gdXNlckFnZW50LnN1YnN0cmluZyh1c2VyQWdlbnQuaW5kZXhPZigncnY6JykgKyAzKTtcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignRWRnZScpID4gLTEpIHtcbiAgICBicm93c2VyTmFtZSA9ICdNaWNyb3NvZnQgRWRnZSc7XG4gICAgZnVsbFZlcnNpb24gPSB1c2VyQWdlbnQuc3Vic3RyaW5nKHVzZXJBZ2VudC5pbmRleE9mKCdFZGdlJykgKyA1KTtcbiAgfSBlbHNlIGlmICh1c2VyQWdlbnQuaW5kZXhPZignQ2hyb21lJykgPiAtMSkge1xuICAgIGJyb3dzZXJOYW1lID0gJ0Nocm9tZSc7XG4gICAgZnVsbFZlcnNpb24gPSB1c2VyQWdlbnQuc3Vic3RyaW5nKHVzZXJBZ2VudC5pbmRleE9mKCdDaHJvbWUnKSArIDcpO1xuICB9IGVsc2UgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdTYWZhcmknKSA+IC0xKSB7XG4gICAgYnJvd3Nlck5hbWUgPSAnU2FmYXJpJztcbiAgICBmdWxsVmVyc2lvbiA9IHVzZXJBZ2VudC5zdWJzdHJpbmcodXNlckFnZW50LmluZGV4T2YoJ1NhZmFyaScpICsgNyk7XG4gICAgaWYgKHVzZXJBZ2VudC5pbmRleE9mKCdWZXJzaW9uJykgPiAtMSkge1xuICAgICAgZnVsbFZlcnNpb24gPSB1c2VyQWdlbnQuc3Vic3RyaW5nKHVzZXJBZ2VudC5pbmRleE9mKCdWZXJzaW9uJykgKyA4KTtcbiAgICB9XG4gIH0gZWxzZSB7XG4gICAgYnJvd3Nlck5hbWUgPSAnVW5rbm93bic7XG4gICAgZnVsbFZlcnNpb24gPSAnVW5rbm93bic7XG4gIH1cblxuICAvLyBUcmltIHRoZSB2ZXJzaW9uIHN0cmluZ1xuICBpZiAoZnVsbFZlcnNpb24uaW5kZXhPZignICcpID4gLTEpIHtcbiAgICBmdWxsVmVyc2lvbiA9IGZ1bGxWZXJzaW9uLnN1YnN0cmluZygwLCBmdWxsVmVyc2lvbi5pbmRleE9mKCcgJykpO1xuICB9XG4gIGlmIChmdWxsVmVyc2lvbi5pbmRleE9mKCc7JykgPiAtMSkge1xuICAgIGZ1bGxWZXJzaW9uID0gZnVsbFZlcnNpb24uc3Vic3RyaW5nKDAsIGZ1bGxWZXJzaW9uLmluZGV4T2YoJzsnKSk7XG4gIH1cbiAgaWYgKGZ1bGxWZXJzaW9uLmluZGV4T2YoJyknKSA+IC0xKSB7XG4gICAgZnVsbFZlcnNpb24gPSBmdWxsVmVyc2lvbi5zdWJzdHJpbmcoMCwgZnVsbFZlcnNpb24uaW5kZXhPZignKScpKTtcbiAgfVxuXG4gIHJldHVybiBgJHticm93c2VyTmFtZX0gJHtmdWxsVmVyc2lvbn1gO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQXdCLG9CQUFvQjtBQUMxQyxRQUFNLFlBQVksVUFBVTtBQUM1QixNQUFJO0FBQ0osTUFBSTtBQUdKLE1BQUksVUFBVSxRQUFRLFNBQVMsSUFBSSxJQUFJO0FBQ3JDLGtCQUFjO0FBQ2Qsa0JBQWMsVUFBVSxVQUFVLFVBQVUsUUFBUSxTQUFTLElBQUksQ0FBQztBQUFBLEVBQ3BFLFdBQVcsVUFBVSxRQUFRLE9BQU8sSUFBSSxNQUFNLFVBQVUsUUFBUSxLQUFLLElBQUksSUFBSTtBQUMzRSxrQkFBYztBQUNkLGtCQUFjLFVBQVUsVUFBVSxVQUFVLFFBQVEsT0FBTyxJQUFJLENBQUM7QUFDaEUsUUFBSSxVQUFVLFFBQVEsS0FBSyxJQUFJLElBQUk7QUFDakMsb0JBQWMsVUFBVSxVQUFVLFVBQVUsUUFBUSxLQUFLLElBQUksQ0FBQztBQUFBLElBQ2hFO0FBQUEsRUFDRixXQUFXLFVBQVUsUUFBUSxTQUFTLElBQUksSUFBSTtBQUU1QyxrQkFBYztBQUNkLGtCQUFjLFVBQVUsVUFBVSxVQUFVLFFBQVEsS0FBSyxJQUFJLENBQUM7QUFBQSxFQUNoRSxXQUFXLFVBQVUsUUFBUSxNQUFNLElBQUksSUFBSTtBQUN6QyxrQkFBYztBQUNkLGtCQUFjLFVBQVUsVUFBVSxVQUFVLFFBQVEsTUFBTSxJQUFJLENBQUM7QUFBQSxFQUNqRSxXQUFXLFVBQVUsUUFBUSxRQUFRLElBQUksSUFBSTtBQUMzQyxrQkFBYztBQUNkLGtCQUFjLFVBQVUsVUFBVSxVQUFVLFFBQVEsUUFBUSxJQUFJLENBQUM7QUFBQSxFQUNuRSxXQUFXLFVBQVUsUUFBUSxRQUFRLElBQUksSUFBSTtBQUMzQyxrQkFBYztBQUNkLGtCQUFjLFVBQVUsVUFBVSxVQUFVLFFBQVEsUUFBUSxJQUFJLENBQUM7QUFDakUsUUFBSSxVQUFVLFFBQVEsU0FBUyxJQUFJLElBQUk7QUFDckMsb0JBQWMsVUFBVSxVQUFVLFVBQVUsUUFBUSxTQUFTLElBQUksQ0FBQztBQUFBLElBQ3BFO0FBQUEsRUFDRixPQUFPO0FBQ0wsa0JBQWM7QUFDZCxrQkFBYztBQUFBLEVBQ2hCO0FBR0EsTUFBSSxZQUFZLFFBQVEsR0FBRyxJQUFJLElBQUk7QUFDakMsa0JBQWMsWUFBWSxVQUFVLEdBQUcsWUFBWSxRQUFRLEdBQUcsQ0FBQztBQUFBLEVBQ2pFO0FBQ0EsTUFBSSxZQUFZLFFBQVEsR0FBRyxJQUFJLElBQUk7QUFDakMsa0JBQWMsWUFBWSxVQUFVLEdBQUcsWUFBWSxRQUFRLEdBQUcsQ0FBQztBQUFBLEVBQ2pFO0FBQ0EsTUFBSSxZQUFZLFFBQVEsR0FBRyxJQUFJLElBQUk7QUFDakMsa0JBQWMsWUFBWSxVQUFVLEdBQUcsWUFBWSxRQUFRLEdBQUcsQ0FBQztBQUFBLEVBQ2pFO0FBRUEsU0FBTyxHQUFHLFdBQVcsSUFBSSxXQUFXO0FBQ3RDOyJ9
