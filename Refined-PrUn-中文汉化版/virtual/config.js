const script = document.getElementById('refined-prun-js');
const config = JSON.parse(script.textContent);
script.textContent = null;
export { config as default };
