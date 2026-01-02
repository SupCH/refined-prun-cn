import duration from './duration.js';
import relativeTime from './relativeTime.js';
import isoWeek from './isoWeek.js';
import dayjs from './dayjs.min.js';
import { ref } from './reactivity.esm-bundler.js';
import { computed } from './runtime-core.esm-bundler.js';
dayjs.extend(duration);
dayjs.extend(relativeTime);
dayjs.extend(isoWeek);
const eachSecond = ref(0);
setInterval(() => eachSecond.value++, 1e3);
const eachMinute = ref(0);
setInterval(() => eachMinute.value++, 6e4);
const dayjsEachSecond = computed(() => live(dayjs(), eachSecond));
const timestampEachSecond = computed(() => live(Date.now(), eachSecond));
const timestampEachMinute = computed(() => live(Date.now(), eachMinute));
function live(value, tick) {
  tick.value;
  return value;
}
export { dayjsEachSecond, timestampEachMinute, timestampEachSecond };
