function prepare() {
  if (document.documentElement.classList.contains('refined-prun')) {
    return;
  }
  const observer = new MutationObserver(() => serializeScripts());
  observer.observe(document, { childList: true, subtree: true });
  const serializeScripts = () => {
    for (const s of Array.from(document.head?.getElementsByTagName('script') ?? [])) {
      if (s.src.includes('apex.prosperousuniverse.com')) {
        s.textContent = s.src;
        s.src = '';
        observer.disconnect();
      }
    }
  };
  serializeScripts();
}
prepare();
