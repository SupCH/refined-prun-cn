function downloadJson(obj, fileName, options) {
  const jsonString = JSON.stringify(obj);
  const blob = new Blob([jsonString], { type: 'application/json' });
  const link = document.createElement('a');
  link.download = fileName;
  link.href = URL.createObjectURL(blob);
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
function uploadJson(callback) {
  const input = document.createElement('input');
  input.type = 'file';
  input.accept = '.json';
  input.style.display = 'none';
  document.body.appendChild(input);
  input.addEventListener('change', () => {
    const file = input.files?.[0];
    if (file && file.type === 'application/json') {
      const reader = new FileReader();
      reader.onload = e => {
        try {
          const result = e.target.result;
          if (typeof result === 'string') {
            const json = JSON.parse(result);
            callback(json);
          } else {
            alert('Invalid JSON file.');
          }
        } catch (error) {
          console.error('Error parsing JSON:', error);
          alert('Invalid JSON file.');
        }
      };
      reader.readAsText(file);
    } else {
      alert('Please upload a valid JSON file.');
    }
    document.body.removeChild(input);
  });
  input.click();
}
export { downloadJson, uploadJson };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoianNvbi1maWxlLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvdXRpbHMvanNvbi1maWxlLnRzIl0sInNvdXJjZXNDb250ZW50IjpbImV4cG9ydCBmdW5jdGlvbiBkb3dubG9hZEpzb24ob2JqOiBvYmplY3QsIGZpbGVOYW1lOiBzdHJpbmcsIG9wdGlvbnM/OiB7IHByZXR0eT86IGJvb2xlYW4gfSkge1xuICBjb25zdCBqc29uU3RyaW5nID0gb3B0aW9ucz8ucHJldHR5ID8gSlNPTi5zdHJpbmdpZnkob2JqLCBudWxsLCAyKSA6IEpTT04uc3RyaW5naWZ5KG9iaik7XG4gIGNvbnN0IGJsb2IgPSBuZXcgQmxvYihbanNvblN0cmluZ10sIHsgdHlwZTogJ2FwcGxpY2F0aW9uL2pzb24nIH0pO1xuICBjb25zdCBsaW5rID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnYScpO1xuICBsaW5rLmRvd25sb2FkID0gZmlsZU5hbWU7XG4gIGxpbmsuaHJlZiA9IFVSTC5jcmVhdGVPYmplY3RVUkwoYmxvYik7XG4gIGRvY3VtZW50LmJvZHkuYXBwZW5kQ2hpbGQobGluayk7XG4gIGxpbmsuY2xpY2soKTtcbiAgZG9jdW1lbnQuYm9keS5yZW1vdmVDaGlsZChsaW5rKTtcbn1cblxuLy8gZXNsaW50LWRpc2FibGUtbmV4dC1saW5lIEB0eXBlc2NyaXB0LWVzbGludC9uby1leHBsaWNpdC1hbnlcbmV4cG9ydCBmdW5jdGlvbiB1cGxvYWRKc29uKGNhbGxiYWNrOiAoanNvbjogYW55KSA9PiB2b2lkKSB7XG4gIGNvbnN0IGlucHV0ID0gZG9jdW1lbnQuY3JlYXRlRWxlbWVudCgnaW5wdXQnKTtcbiAgaW5wdXQudHlwZSA9ICdmaWxlJztcbiAgaW5wdXQuYWNjZXB0ID0gJy5qc29uJztcbiAgaW5wdXQuc3R5bGUuZGlzcGxheSA9ICdub25lJztcbiAgZG9jdW1lbnQuYm9keS5hcHBlbmRDaGlsZChpbnB1dCk7XG5cbiAgaW5wdXQuYWRkRXZlbnRMaXN0ZW5lcignY2hhbmdlJywgKCkgPT4ge1xuICAgIGNvbnN0IGZpbGUgPSBpbnB1dC5maWxlcz8uWzBdO1xuXG4gICAgaWYgKGZpbGUgJiYgZmlsZS50eXBlID09PSAnYXBwbGljYXRpb24vanNvbicpIHtcbiAgICAgIGNvbnN0IHJlYWRlciA9IG5ldyBGaWxlUmVhZGVyKCk7XG4gICAgICByZWFkZXIub25sb2FkID0gZSA9PiB7XG4gICAgICAgIHRyeSB7XG4gICAgICAgICAgY29uc3QgcmVzdWx0ID0gZS50YXJnZXQhLnJlc3VsdDtcbiAgICAgICAgICBpZiAodHlwZW9mIHJlc3VsdCA9PT0gJ3N0cmluZycpIHtcbiAgICAgICAgICAgIGNvbnN0IGpzb24gPSBKU09OLnBhcnNlKHJlc3VsdCk7XG4gICAgICAgICAgICBjYWxsYmFjayhqc29uKTtcbiAgICAgICAgICB9IGVsc2Uge1xuICAgICAgICAgICAgYWxlcnQoJ0ludmFsaWQgSlNPTiBmaWxlLicpO1xuICAgICAgICAgIH1cbiAgICAgICAgfSBjYXRjaCAoZXJyb3IpIHtcbiAgICAgICAgICBjb25zb2xlLmVycm9yKCdFcnJvciBwYXJzaW5nIEpTT046JywgZXJyb3IpO1xuICAgICAgICAgIGFsZXJ0KCdJbnZhbGlkIEpTT04gZmlsZS4nKTtcbiAgICAgICAgfVxuICAgICAgfTtcbiAgICAgIHJlYWRlci5yZWFkQXNUZXh0KGZpbGUpO1xuICAgIH0gZWxzZSB7XG4gICAgICBhbGVydCgnUGxlYXNlIHVwbG9hZCBhIHZhbGlkIEpTT04gZmlsZS4nKTtcbiAgICB9XG5cbiAgICBkb2N1bWVudC5ib2R5LnJlbW92ZUNoaWxkKGlucHV0KTtcbiAgfSk7XG4gIGlucHV0LmNsaWNrKCk7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQU8sU0FBUyxhQUFhLEtBQWEsVUFBa0IsU0FBZ0M7QUFDMUYsUUFBTSxhQUE4RCxLQUFLLFVBQVUsR0FBRztBQUN0RixRQUFNLE9BQU8sSUFBSSxLQUFLLENBQUMsVUFBVSxHQUFHLEVBQUUsTUFBTSxvQkFBb0I7QUFDaEUsUUFBTSxPQUFPLFNBQVMsY0FBYyxHQUFHO0FBQ3ZDLE9BQUssV0FBVztBQUNoQixPQUFLLE9BQU8sSUFBSSxnQkFBZ0IsSUFBSTtBQUNwQyxXQUFTLEtBQUssWUFBWSxJQUFJO0FBQzlCLE9BQUssTUFBQTtBQUNMLFdBQVMsS0FBSyxZQUFZLElBQUk7QUFDaEM7QUFHTyxTQUFTLFdBQVcsVUFBK0I7QUFDeEQsUUFBTSxRQUFRLFNBQVMsY0FBYyxPQUFPO0FBQzVDLFFBQU0sT0FBTztBQUNiLFFBQU0sU0FBUztBQUNmLFFBQU0sTUFBTSxVQUFVO0FBQ3RCLFdBQVMsS0FBSyxZQUFZLEtBQUs7QUFFL0IsUUFBTSxpQkFBaUIsVUFBVSxNQUFNO0FBQ3JDLFVBQU0sT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUU1QixRQUFJLFFBQVEsS0FBSyxTQUFTLG9CQUFvQjtBQUM1QyxZQUFNLFNBQVMsSUFBSSxXQUFBO0FBQ25CLGFBQU8sU0FBUyxDQUFBLE1BQUs7QUFDbkIsWUFBSTtBQUNGLGdCQUFNLFNBQVMsRUFBRSxPQUFRO0FBQ3pCLGNBQUksT0FBTyxXQUFXLFVBQVU7QUFDOUIsa0JBQU0sT0FBTyxLQUFLLE1BQU0sTUFBTTtBQUM5QixxQkFBUyxJQUFJO0FBQUEsVUFDZixPQUFPO0FBQ0wsa0JBQU0sb0JBQW9CO0FBQUEsVUFDNUI7QUFBQSxRQUNGLFNBQVMsT0FBTztBQUNkLGtCQUFRLE1BQU0sdUJBQXVCLEtBQUs7QUFDMUMsZ0JBQU0sb0JBQW9CO0FBQUEsUUFDNUI7QUFBQSxNQUNGO0FBQ0EsYUFBTyxXQUFXLElBQUk7QUFBQSxJQUN4QixPQUFPO0FBQ0wsWUFBTSxrQ0FBa0M7QUFBQSxJQUMxQztBQUVBLGFBQVMsS0FBSyxZQUFZLEtBQUs7QUFBQSxFQUNqQyxDQUFDO0FBQ0QsUUFBTSxNQUFBO0FBQ1I7In0=
