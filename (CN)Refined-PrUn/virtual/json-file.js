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
