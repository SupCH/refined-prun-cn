import { userData } from './user-data.js';
import dayjs from './dayjs.min.js';
import { isPresent } from './is-present.js';
import { computed } from './runtime-core.esm-bundler.js';
import { shallowReactive } from './reactivity.esm-bundler.js';
const updateInterval = dayjs.duration(15, 'minutes').asMilliseconds();
async function fetchPrices() {
  setTimeout(fetchPrices, updateInterval);
  const url = 'https://refined-prun.github.io/refined-prices/all.json';
  const response = await fetch(url);
  const tickersInfo = await response.json();
  const prices = /* @__PURE__ */ new Map();
  const tickers = /* @__PURE__ */ new Set();
  for (const tickerInfo of tickersInfo) {
    const code = tickerInfo.ExchangeCode;
    let cxPrices = prices.get(code);
    if (!cxPrices) {
      cxPrices = /* @__PURE__ */ new Map();
      prices.set(code, cxPrices);
    }
    const ticker = tickerInfo.MaterialTicker;
    cxPrices.set(ticker, tickerInfo);
    tickers.add(ticker);
  }
  const universe = /* @__PURE__ */ new Map();
  prices.set('UNIVERSE', universe);
  for (const ticker of tickers.values()) {
    const tickerInfos = Array.from(prices.values()).map(x => x.get(ticker));
    const tickerInfo = {
      MaterialTicker: ticker,
      ExchangeCode: 'UNIVERSE',
      MMBuy: weightedAverage(tickerInfos, x => x.MMBuy),
      MMSell: weightedAverage(tickerInfos, x => x.MMSell),
      PriceAverage: weightedAverage(tickerInfos, x => x.PriceAverage),
      Ask: weightedAverage(tickerInfos, x => x.Ask),
      Bid: weightedAverage(tickerInfos, x => x.Bid),
      VWAP7D: weightedAverage(
        tickerInfos,
        x => x.VWAP7D,
        x => x.Traded7D,
      ),
      VWAP30D: weightedAverage(
        tickerInfos,
        x => x.VWAP30D,
        x => x.Traded30D,
      ),
    };
    universe.set(ticker, tickerInfo);
  }
  cxStore.age = Date.now();
  cxStore.prices = prices;
  cxStore.fetched = true;
}
function weightedAverage(items, value, weight) {
  let sum = null;
  let weights = null;
  for (const item of items) {
    if (item === void 0) {
      continue;
    }
    const itemValue = value(item);
    const itemWeight = weight ? weight(item) : 1;
    if (!isPresent(itemValue) || !isPresent(itemWeight)) {
      continue;
    }
    sum = (sum ?? 0) + itemValue * itemWeight;
    weights = (weights ?? 0) + itemWeight;
  }
  if (!isPresent(sum) || !isPresent(weights)) {
    return null;
  }
  return sum / weights;
}
const ignored = computed(() => new Set(userData.settings.financial.ignoredMaterials.split(',')));
const mmMaterials = computed(() => new Set(userData.settings.financial.mmMaterials.split(',')));
function getPrice(ticker) {
  if (!ticker) {
    return void 0;
  }
  const upper = ticker.toUpperCase();
  if (ignored.value.has(upper)) {
    return 0;
  }
  if (!cxStore.fetched) {
    return void 0;
  }
  const pricing = userData.settings.pricing;
  const exchange = cxStore.prices.get(pricing.exchange);
  if (!exchange) {
    return void 0;
  }
  if (mmMaterials.value.has(upper)) {
    return exchange.get(ticker)?.MMBuy ?? 0;
  }
  const tickerInfo = exchange.get(ticker);
  if (!tickerInfo) {
    return 0;
  }
  switch (pricing.method) {
    case 'ASK':
      return tickerInfo.Ask ?? 0;
    case 'BID':
      return tickerInfo.Bid ?? 0;
    case 'AVG':
      return tickerInfo.PriceAverage ?? 0;
    case 'VWAP7D':
      return tickerInfo.VWAP7D ?? 0;
    case 'VWAP30D':
      return tickerInfo.VWAP30D ?? 0;
    case 'DEFAULT':
      return (
        tickerInfo.VWAP7D ??
        tickerInfo.VWAP30D ??
        tickerInfo.PriceAverage ??
        tickerInfo.Ask ??
        tickerInfo.Bid ??
        0
      );
  }
  return void 0;
}
function getMaterialPrice(material) {
  return getPrice(material.ticker);
}
function calcMaterialAmountPrice(amount) {
  const price = getMaterialPrice(amount.material);
  return price !== void 0 ? price * amount.amount : void 0;
}
function sumMaterialAmountPrice(amounts) {
  if (!amounts) {
    return void 0;
  }
  let result = 0;
  for (const item of amounts) {
    const price = calcMaterialAmountPrice(item);
    if (price === void 0) {
      return void 0;
    }
    result += price;
  }
  return result;
}
const cxStore = shallowReactive({
  prices: void 0,
  age: 0,
  fetched: false,
});
export {
  calcMaterialAmountPrice,
  cxStore,
  fetchPrices,
  getMaterialPrice,
  getPrice,
  sumMaterialAmountPrice,
};
