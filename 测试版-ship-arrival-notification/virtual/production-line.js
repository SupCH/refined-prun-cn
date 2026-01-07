function calcCompletionDate(line, order) {
  if (!order.duration) {
    return void 0;
  }
  if (order.completion) {
    return order.completion.timestamp;
  }
  const capacity = line.capacity;
  if (capacity === 0) {
    return void 0;
  }
  const queue = [];
  for (const lineOrder of line.orders) {
    if (!lineOrder.duration) {
      return void 0;
    }
    if (lineOrder.completion) {
      queue.push(lineOrder.completion.timestamp);
    } else if (queue.length < capacity) {
      queue.push(Date.now() + lineOrder.duration.millis);
    } else {
      queue.sort();
      queue.push(queue.shift() + lineOrder.duration.millis);
    }
    if (lineOrder === order) {
      return queue.pop();
    }
  }
  return void 0;
}
export { calcCompletionDate };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvZHVjdGlvbi1saW5lLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvY29yZS9wcm9kdWN0aW9uLWxpbmUudHMiXSwic291cmNlc0NvbnRlbnQiOlsiZXhwb3J0IGZ1bmN0aW9uIGNhbGNDb21wbGV0aW9uRGF0ZShsaW5lOiBQcnVuQXBpLlByb2R1Y3Rpb25MaW5lLCBvcmRlcjogUHJ1bkFwaS5Qcm9kdWN0aW9uT3JkZXIpIHtcbiAgaWYgKCFvcmRlci5kdXJhdGlvbikge1xuICAgIHJldHVybiB1bmRlZmluZWQ7XG4gIH1cblxuICBpZiAob3JkZXIuY29tcGxldGlvbikge1xuICAgIHJldHVybiBvcmRlci5jb21wbGV0aW9uLnRpbWVzdGFtcDtcbiAgfVxuXG4gIGNvbnN0IGNhcGFjaXR5ID0gbGluZS5jYXBhY2l0eTtcbiAgaWYgKGNhcGFjaXR5ID09PSAwKSB7XG4gICAgcmV0dXJuIHVuZGVmaW5lZDtcbiAgfVxuICBjb25zdCBxdWV1ZTogbnVtYmVyW10gPSBbXTtcblxuICBmb3IgKGNvbnN0IGxpbmVPcmRlciBvZiBsaW5lLm9yZGVycykge1xuICAgIGlmICghbGluZU9yZGVyLmR1cmF0aW9uKSB7XG4gICAgICByZXR1cm4gdW5kZWZpbmVkO1xuICAgIH1cbiAgICBpZiAobGluZU9yZGVyLmNvbXBsZXRpb24pIHtcbiAgICAgIC8vIE9yZGVyIGhhcyBzdGFydGVkXG4gICAgICBxdWV1ZS5wdXNoKGxpbmVPcmRlci5jb21wbGV0aW9uLnRpbWVzdGFtcCk7XG4gICAgfSBlbHNlIGlmIChxdWV1ZS5sZW5ndGggPCBjYXBhY2l0eSkge1xuICAgICAgLy8gT3JkZXIgaGFzIG5vdCBzdGFydGVkIGJ1dCB0aGVyZSdzIGNhcGFjaXR5IHRvIHN0YXJ0IGl0XG4gICAgICBxdWV1ZS5wdXNoKERhdGUubm93KCkgKyBsaW5lT3JkZXIuZHVyYXRpb24ubWlsbGlzKTtcbiAgICB9IGVsc2Uge1xuICAgICAgLy8gT3JkZXIgaGFzIG5vdCBzdGFydGVkXG4gICAgICBxdWV1ZS5zb3J0KCk7XG4gICAgICBxdWV1ZS5wdXNoKHF1ZXVlLnNoaWZ0KCkhICsgbGluZU9yZGVyLmR1cmF0aW9uLm1pbGxpcyk7XG4gICAgfVxuICAgIGlmIChsaW5lT3JkZXIgPT09IG9yZGVyKSB7XG4gICAgICByZXR1cm4gcXVldWUucG9wKCk7XG4gICAgfVxuICB9XG5cbiAgcmV0dXJuIHVuZGVmaW5lZDtcbn1cbiJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiQUFBTyxTQUFTLG1CQUFtQixNQUE4QixPQUFnQztBQUMvRixNQUFJLENBQUMsTUFBTSxVQUFVO0FBQ25CLFdBQU87QUFBQSxFQUNUO0FBRUEsTUFBSSxNQUFNLFlBQVk7QUFDcEIsV0FBTyxNQUFNLFdBQVc7QUFBQSxFQUMxQjtBQUVBLFFBQU0sV0FBVyxLQUFLO0FBQ3RCLE1BQUksYUFBYSxHQUFHO0FBQ2xCLFdBQU87QUFBQSxFQUNUO0FBQ0EsUUFBTSxRQUFrQixDQUFBO0FBRXhCLGFBQVcsYUFBYSxLQUFLLFFBQVE7QUFDbkMsUUFBSSxDQUFDLFVBQVUsVUFBVTtBQUN2QixhQUFPO0FBQUEsSUFDVDtBQUNBLFFBQUksVUFBVSxZQUFZO0FBRXhCLFlBQU0sS0FBSyxVQUFVLFdBQVcsU0FBUztBQUFBLElBQzNDLFdBQVcsTUFBTSxTQUFTLFVBQVU7QUFFbEMsWUFBTSxLQUFLLEtBQUssSUFBQSxJQUFRLFVBQVUsU0FBUyxNQUFNO0FBQUEsSUFDbkQsT0FBTztBQUVMLFlBQU0sS0FBQTtBQUNOLFlBQU0sS0FBSyxNQUFNLE1BQUEsSUFBVyxVQUFVLFNBQVMsTUFBTTtBQUFBLElBQ3ZEO0FBQ0EsUUFBSSxjQUFjLE9BQU87QUFDdkIsYUFBTyxNQUFNLElBQUE7QUFBQSxJQUNmO0FBQUEsRUFDRjtBQUVBLFNBQU87QUFDVDsifQ==
