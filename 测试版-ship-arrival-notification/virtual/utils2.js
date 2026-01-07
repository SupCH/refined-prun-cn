import { cxobStore } from './cxob.js';
import { isFiniteOrder } from './orders.js';
function fillAmount(cxTicker, amount, priceLimit) {
  const orderBook = cxobStore.getByTicker(cxTicker);
  if (!orderBook) {
    return void 0;
  }
  const filled = {
    amount: 0,
    priceLimit: 0,
    cost: 0,
  };
  const orders = orderBook.sellingOrders.slice().sort((a, b) => a.limit.amount - b.limit.amount);
  for (const order of orders) {
    const orderPrice = order.limit.amount;
    if (priceLimit < orderPrice) {
      break;
    }
    const orderAmount = isFiniteOrder(order) ? order.amount : Infinity;
    const remaining = amount - filled.amount;
    const filledByOrder = Math.min(remaining, orderAmount);
    filled.priceLimit = orderPrice;
    filled.amount += filledByOrder;
    filled.cost += filledByOrder * orderPrice;
    if (filled.amount === amount) {
      break;
    }
  }
  return filled;
}
export { fillAmount };
//# sourceMappingURL=data:application/json;charset=utf-8;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoidXRpbHMyLmpzIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvZmVhdHVyZXMvWElUL0FDVC9hY3Rpb25zL2N4LWJ1eS91dGlscy50cyJdLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQgeyBjeG9iU3RvcmUgfSBmcm9tICdAc3JjL2luZnJhc3RydWN0dXJlL3BydW4tYXBpL2RhdGEvY3hvYic7XG5pbXBvcnQgeyBpc0Zpbml0ZU9yZGVyIH0gZnJvbSAnQHNyYy9jb3JlL29yZGVycyc7XG5cbmV4cG9ydCBmdW5jdGlvbiBmaWxsQW1vdW50KGN4VGlja2VyOiBzdHJpbmcsIGFtb3VudDogbnVtYmVyLCBwcmljZUxpbWl0OiBudW1iZXIpIHtcbiAgY29uc3Qgb3JkZXJCb29rID0gY3hvYlN0b3JlLmdldEJ5VGlja2VyKGN4VGlja2VyKTtcbiAgaWYgKCFvcmRlckJvb2spIHtcbiAgICByZXR1cm4gdW5kZWZpbmVkO1xuICB9XG5cbiAgY29uc3QgZmlsbGVkID0ge1xuICAgIGFtb3VudDogMCxcbiAgICBwcmljZUxpbWl0OiAwLFxuICAgIGNvc3Q6IDAsXG4gIH07XG4gIGNvbnN0IG9yZGVycyA9IG9yZGVyQm9vay5zZWxsaW5nT3JkZXJzLnNsaWNlKCkuc29ydCgoYSwgYikgPT4gYS5saW1pdC5hbW91bnQgLSBiLmxpbWl0LmFtb3VudCk7XG4gIGZvciAoY29uc3Qgb3JkZXIgb2Ygb3JkZXJzKSB7XG4gICAgY29uc3Qgb3JkZXJQcmljZSA9IG9yZGVyLmxpbWl0LmFtb3VudDtcbiAgICBpZiAocHJpY2VMaW1pdCA8IG9yZGVyUHJpY2UpIHtcbiAgICAgIGJyZWFrO1xuICAgIH1cbiAgICBjb25zdCBvcmRlckFtb3VudCA9IGlzRmluaXRlT3JkZXIob3JkZXIpID8gb3JkZXIuYW1vdW50IDogSW5maW5pdHk7XG4gICAgY29uc3QgcmVtYWluaW5nID0gYW1vdW50IC0gZmlsbGVkLmFtb3VudDtcbiAgICBjb25zdCBmaWxsZWRCeU9yZGVyID0gTWF0aC5taW4ocmVtYWluaW5nLCBvcmRlckFtb3VudCk7XG4gICAgZmlsbGVkLnByaWNlTGltaXQgPSBvcmRlclByaWNlO1xuICAgIGZpbGxlZC5hbW91bnQgKz0gZmlsbGVkQnlPcmRlcjtcbiAgICBmaWxsZWQuY29zdCArPSBmaWxsZWRCeU9yZGVyICogb3JkZXJQcmljZTtcbiAgICBpZiAoZmlsbGVkLmFtb3VudCA9PT0gYW1vdW50KSB7XG4gICAgICBicmVhaztcbiAgICB9XG4gIH1cblxuICByZXR1cm4gZmlsbGVkO1xufVxuIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBR08sU0FBUyxXQUFXLFVBQWtCLFFBQWdCLFlBQW9CO0FBQy9FLFFBQU0sWUFBWSxVQUFVLFlBQVksUUFBUTtBQUNoRCxNQUFJLENBQUMsV0FBVztBQUNkLFdBQU87QUFBQSxFQUNUO0FBRUEsUUFBTSxTQUFTO0FBQUEsSUFDYixRQUFRO0FBQUEsSUFDUixZQUFZO0FBQUEsSUFDWixNQUFNO0FBQUEsRUFBQTtBQUVSLFFBQU0sU0FBUyxVQUFVLGNBQWMsTUFBQSxFQUFRLEtBQUssQ0FBQyxHQUFHLE1BQU0sRUFBRSxNQUFNLFNBQVMsRUFBRSxNQUFNLE1BQU07QUFDN0YsYUFBVyxTQUFTLFFBQVE7QUFDMUIsVUFBTSxhQUFhLE1BQU0sTUFBTTtBQUMvQixRQUFJLGFBQWEsWUFBWTtBQUMzQjtBQUFBLElBQ0Y7QUFDQSxVQUFNLGNBQWMsY0FBYyxLQUFLLElBQUksTUFBTSxTQUFTO0FBQzFELFVBQU0sWUFBWSxTQUFTLE9BQU87QUFDbEMsVUFBTSxnQkFBZ0IsS0FBSyxJQUFJLFdBQVcsV0FBVztBQUNyRCxXQUFPLGFBQWE7QUFDcEIsV0FBTyxVQUFVO0FBQ2pCLFdBQU8sUUFBUSxnQkFBZ0I7QUFDL0IsUUFBSSxPQUFPLFdBQVcsUUFBUTtBQUM1QjtBQUFBLElBQ0Y7QUFBQSxFQUNGO0FBRUEsU0FBTztBQUNUOyJ9
