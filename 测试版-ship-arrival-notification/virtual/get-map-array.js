function getMapArray(map, key) {
  let array = map.get(key);
  if (array === void 0) {
    array = [];
    map.set(key, array);
  }
  return array;
}
export { getMapArray as default };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZ2V0LW1hcC1hcnJheS5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2dldC1tYXAtYXJyYXkudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGRlZmF1bHQgZnVuY3Rpb24gZ2V0TWFwQXJyYXk8VCwgSz4obWFwOiBNYXA8VCwgS1tdPiwga2V5OiBUKSB7XG4gIGxldCBhcnJheSA9IG1hcC5nZXQoa2V5KTtcbiAgaWYgKGFycmF5ID09PSB1bmRlZmluZWQpIHtcbiAgICBhcnJheSA9IFtdO1xuICAgIG1hcC5zZXQoa2V5LCBhcnJheSk7XG4gIH1cbiAgcmV0dXJuIGFycmF5O1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiJBQUFBLFNBQXdCLFlBQWtCLEtBQWtCLEtBQVE7QUFDbEUsTUFBSSxRQUFRLElBQUksSUFBSSxHQUFHO0FBQ3ZCLE1BQUksVUFBVSxRQUFXO0FBQ3ZCLFlBQVEsQ0FBQTtBQUNSLFFBQUksSUFBSSxLQUFLLEtBQUs7QUFBQSxFQUNwQjtBQUNBLFNBQU87QUFDVDsifQ==
