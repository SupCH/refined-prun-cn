async function fetchJson(url) {
  return await (await fetch(url)).json();
}
export { fetchJson };
