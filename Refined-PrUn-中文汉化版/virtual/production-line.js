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
