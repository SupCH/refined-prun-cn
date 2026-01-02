function subscribe(generator, callback) {
  (async () => {
    for await (const item of generator) {
      callback(item);
    }
  })().catch(e => console.error(e));
}
export { subscribe };
