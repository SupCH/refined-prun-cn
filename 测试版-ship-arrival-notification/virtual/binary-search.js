function binarySearch(value, items, selector) {
  let low = 0;
  let high = items.length;
  while (low < high) {
    const mid = Math.floor((low + high) / 2);
    if (selector(items[mid]) < value) {
      low = mid + 1;
    } else {
      high = mid;
    }
  }
  return low;
}
export { binarySearch };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiYmluYXJ5LXNlYXJjaC5qcyIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3V0aWxzL2JpbmFyeS1zZWFyY2gudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGJpbmFyeVNlYXJjaDxUPih2YWx1ZTogbnVtYmVyLCBpdGVtczogVFtdLCBzZWxlY3RvcjogKGl0ZW06IFQpID0+IG51bWJlcikge1xuICBsZXQgbG93ID0gMDtcbiAgbGV0IGhpZ2ggPSBpdGVtcy5sZW5ndGg7XG5cbiAgd2hpbGUgKGxvdyA8IGhpZ2gpIHtcbiAgICBjb25zdCBtaWQgPSBNYXRoLmZsb29yKChsb3cgKyBoaWdoKSAvIDIpO1xuICAgIGlmIChzZWxlY3RvcihpdGVtc1ttaWRdKSA8IHZhbHVlKSB7XG4gICAgICBsb3cgPSBtaWQgKyAxO1xuICAgIH0gZWxzZSB7XG4gICAgICBoaWdoID0gbWlkO1xuICAgIH1cbiAgfVxuXG4gIHJldHVybiBsb3c7XG59XG4iXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IkFBQU8sU0FBUyxhQUFnQixPQUFlLE9BQVksVUFBK0I7QUFDeEYsTUFBSSxNQUFNO0FBQ1YsTUFBSSxPQUFPLE1BQU07QUFFakIsU0FBTyxNQUFNLE1BQU07QUFDakIsVUFBTSxNQUFNLEtBQUssT0FBTyxNQUFNLFFBQVEsQ0FBQztBQUN2QyxRQUFJLFNBQVMsTUFBTSxHQUFHLENBQUMsSUFBSSxPQUFPO0FBQ2hDLFlBQU0sTUFBTTtBQUFBLElBQ2QsT0FBTztBQUNMLGFBQU87QUFBQSxJQUNUO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDsifQ==
